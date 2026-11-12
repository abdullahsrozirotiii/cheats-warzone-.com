// Applied during prerendering as well as requests; only the audited routes change.
export const auditPages: Record<string, { title?: string; h1?: string; keyword?: string; share?: boolean }> = {
  '/': { keyword: 'warzone cheats', share: true },
  '/warzone-blog/': {
    title: 'Guides – Warzone Blog Aimbot, ESP & PC Setup Advice',
    h1: 'Guides: Warzone Blog Aimbot, ESP & PC Setup Advice',
    keyword: 'guides',
    share: true,
  },
  '/warzone-about/': { title: 'About Warzone Cheats – Editorial & Testing Standards', keyword: 'warzone cheats', share: true },
  '/warzone-faq/': {
    title: 'Warzone Cheats FAQ – ESP, Aimbot & Pricing Help 2026',
    h1: 'Warzone Cheats FAQ – ESP, Aimbot & Pricing Help 2026',
    keyword: 'warzone',
    share: true,
  },
  '/warzone-blog/aimbot-fov/': { title: 'Aimbot FOV – Warzone Cheats Settings & Smoothness Guide', share: true },
  '/products/warzone-cheats/': {
    title: 'Warzone Cheats – Undetected Aimbot, ESP & Utilities',
    h1: 'Warzone Cheats — Aimbot, ESP & PC Modules',
    keyword: 'warzone cheats',
    share: true,
  },
  '/products/warzone-cheats/aimbot-esp/': {
    h1: 'Aimbot – Warzone Cheats, ESP, Wallhack & Humanizer',
    share: true,
  },
  '/warzone-forum/': { h1: 'Forums: Warzone Cheats Q&A, ESP, Aimbot & Patches', share: true },
  '/warzone-reviews/': {
    title: 'Warzone Cheats Reviews – PC Buyer Ratings 2026',
    h1: 'Warzone Cheats Reviews: PC buyer ratings',
    share: true,
  },
  '/warzone-support/': { h1: 'Warzone Cheats Support', share: true },
  '/warzone-blog/cheats-features/': { h1: 'Cheats – Warzone Modules: ESP, Wallhack & Aimbot Guide', share: true },
};

const plain = (html: string) => html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
const escape = (value: string) =>
  value.replace(/&(?!(?:amp|quot|lt|gt|#\d+);)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const anchorAlternatives: Record<string, string[]> = {
  home: ['Site overview', 'Return to homepage', 'Explore the homepage'],
  products: ['Browse PC modules', 'Product catalog', 'Compare module listings'],
  forum: ['Community discussions', 'Visit the discussion board', 'Browse forum topics'],
  support: ['Contact support', 'Get setup assistance', 'Support resources'],
  blog: ['Browse setup articles', 'Explore the guide archive', 'Read PC tutorials'],
  faq: ['Frequently asked questions', 'Read common questions', 'Explore FAQ topics'],
  reviews: ['Customer reviews hub', 'Read player ratings', 'Browse review scores'],
  'warzone cheats': [
    'Explore Warzone modules',
    'View PC feature details',
    'Warzone product overview',
    'Inspect the module listing',
  ],
  'product catalog': ['Browse the module catalog', 'Open the PC product hub'],
  'aimbot & esp listing': ['Open the aimbot and ESP page', 'View the elite module listing'],
  'elite warzone cheats': ['Open the elite PC listing', 'Browse elite module details'],
  'warzone cheats — aimbot, esp & hacks – undetected esp &': [
    'Undetected aimbot and ESP suite',
    'PC aimbot, ESP and hack modules',
  ],
  'preguntas frecuentes': ['Dudas habituales', 'Respuestas de la comunidad', 'Centro de ayuda FAQ'],
  'product page': [
    'View the module listing',
    'Check available PC features',
    'Read product configuration details',
    'Explore the live product notes',
    'Review the current module scope',
    'See product setup information',
    'Open the full feature listing',
    'Consult the product details',
  ],
  'console cheating guide': [
    'Read the console compatibility overview',
    'Compare console and PC scope',
    'Explore platform limitations',
    'Check the console setup explanation',
  ],
  'anti-cheat faq': [
    'Read Ricochet questions',
    'Review anti-cheat enforcement details',
    'Explore Ricochet risk explanations',
  ],
  'legacy codes explainer': [
    'Read the legacy code explanation',
    'Explore code search myths',
    'Compare codes with PC modules',
  ],
};

export function dedupeAnchors(html: string): string {
  const seen = new Set<string>();
  let section = 'Site navigation';
  let occurrence = 0;
  return html.replace(/<h[1-3]\b[^>]*>[\s\S]*?<\/h[1-3]>|<a\b[^>]*>[\s\S]*?<\/a>/gi, (tag) => {
    if (/^<h/i.test(tag)) {
      section = plain(tag);
      return tag;
    }
    if (/\bbrand-mark\b/.test(tag) || /\bbrand-mark__logo\b/.test(tag)) return tag;
    const href = tag.match(/\bhref="([^"]+)"/i)?.[1];
    if (!href || !href.startsWith('/') || href.startsWith('//')) return tag;
    const label = plain(tag).toLowerCase();
    if (!label) return tag;
    if (!seen.has(label)) {
      seen.add(label);
      return tag;
    }
    const alternative = anchorAlternatives[label]?.find((value) => !seen.has(value.toLowerCase()));
    if (alternative) {
      seen.add(alternative.toLowerCase());
      return tag.replace(/(<a\b[^>]*>)([\s\S]*?)(<\/a>)/i, (_all, open, content, close) => {
        const icons = content.match(/<svg\b[\s\S]*?<\/svg>/gi)?.join('') ?? '';
        const anchorOpen = /\bdata-no-localize\b/.test(open)
          ? open
          : open.replace(/<a\b/, '<a data-no-localize="true"');
        return `${anchorOpen}${icons}${escape(alternative)}${close}`;
      });
    }
    const destination = href.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') || 'homepage';
    const context = `${section}: ${destination}`;
    let suffix = context;
    while (seen.has(`${label} — ${suffix}`.toLowerCase())) suffix = `${context} (${++occurrence})`;
    seen.add(`${label} — ${suffix}`.toLowerCase());
    const anchorOpen = tag.match(/<a\b[^>]*>/i)?.[0] ?? '<a';
    const withFlag = /\bdata-no-localize\b/.test(anchorOpen)
      ? anchorOpen
      : anchorOpen.replace(/<a\b/, '<a data-no-localize="true"');
    return tag.replace(/<a\b[^>]*>/i, withFlag).replace(/<\/a>$/i, ` <span class="text-xs">— ${escape(suffix)}</span></a>`);
  });
}

export function auditMarkup(html: string, path: string, _locale = 'en'): string {
  const page = auditPages[path];
  if (page?.h1) html = html.replace(/(<h1\b[^>]*>)[\s\S]*?(<\/h1>)/i, `$1${escape(page.h1)}$2`);
  html = dedupeAnchors(html);
  return html;
}
