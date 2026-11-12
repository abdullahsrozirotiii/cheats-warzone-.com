import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { PREVIEW_X_ROBOTS_TAG, shouldSendPreviewNoindex } from './site-url.mjs';

const repoRoot = path.resolve(import.meta.dirname, '..');
const middlewareUrl = pathToFileURL(path.join(repoRoot, 'functions', '_middleware.js')).href;
const { onRequest } = await import(middlewareUrl);

const PREVIEW_HOST = 'feature-branch.cheats-warzone-com.pages.dev';

function mockNext(body = 'ok', contentType = 'text/html; charset=utf-8') {
  return async () =>
    new Response(body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
      },
    });
}

async function runMiddleware(url) {
  const request = new Request(url);
  return onRequest({ request, next: mockNext() });
}

async function runMiddlewareWithBody(url, body, contentType) {
  const request = new Request(url);
  return onRequest({ request, next: mockNext(body, contentType) });
}

function assertNoPreviewRobots(response, label) {
  const tag = response.headers.get('x-robots-tag');
  assert.equal(tag, null, `${label}: expected no X-Robots-Tag, got ${tag}`);
}

function assertPreviewRobots(response, label) {
  assert.equal(
    response.headers.get('x-robots-tag'),
    PREVIEW_X_ROBOTS_TAG,
    `${label}: X-Robots-Tag mismatch`,
  );
}

// Host detection unit checks
assert.equal(shouldSendPreviewNoindex('cheats-warzone.com'), false);
assert.equal(shouldSendPreviewNoindex(PREVIEW_HOST), true);
assert.equal(shouldSendPreviewNoindex('localhost'), false);
assert.equal(shouldSendPreviewNoindex('unknown.example.test'), true);

// Production apex
let res = await runMiddleware('https://cheats-warzone.com/');
assert.equal(res.status, 200);
assertNoPreviewRobots(res, 'production homepage');
assert.equal(res.headers.get('cache-control'), 'public, max-age=3600');

// www → apex (existing redirect)
res = await runMiddleware('https://www.cheats-warzone.com/');
assert.equal(res.status, 301);
assert.equal(res.headers.get('location'), 'https://cheats-warzone.com/');
assertNoPreviewRobots(res, 'www redirect');

// Preview hosts
res = await runMiddleware(`https://${PREVIEW_HOST}/`);
assertPreviewRobots(res, 'preview homepage');

res = await runMiddleware(`https://${PREVIEW_HOST}/warzone-blog/`);
assertPreviewRobots(res, 'preview blog');

res = await runMiddlewareWithBody(
  `https://${PREVIEW_HOST}/sitemap.xml`,
  '<?xml version="1.0"?><urlset/>',
  'application/xml; charset=utf-8',
);
assertPreviewRobots(res, 'preview sitemap.xml');

res = await runMiddlewareWithBody(
  `https://${PREVIEW_HOST}/robots.txt`,
  'User-agent: *\nAllow: /',
  'text/plain; charset=utf-8',
);
assertPreviewRobots(res, 'preview robots.txt');

res = await runMiddlewareWithBody(
  `https://${PREVIEW_HOST}/rss.xml`,
  '<?xml version="1.0"?><rss/>',
  'application/rss+xml; charset=utf-8',
);
assertPreviewRobots(res, 'preview rss.xml');

// Localhost
res = await runMiddleware('http://localhost:8788/');
assertNoPreviewRobots(res, 'localhost');

// Unknown hostname
res = await runMiddleware('https://staging.notourdomain.example/');
assertPreviewRobots(res, 'unknown hostname');

// Redirect behavior unchanged on preview (checkout still redirects)
res = await onRequest({
  request: new Request(`https://${PREVIEW_HOST}/go/warzone/`),
  next: mockNext(),
});
assert.equal(res.status, 302);
assert(res.headers.get('location')?.includes('zadeyo.com'));

console.log('preview-robots.test.mjs: all checks passed.');
