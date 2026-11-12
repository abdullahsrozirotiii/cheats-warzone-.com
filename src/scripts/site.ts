
function initNavHighlight() {
  const path = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';

  document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]').forEach((link) => {
    const href = link.getAttribute('href') ?? '';
    const linkPath = href.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';
    let isActive = false;

    if (linkPath === '/' || linkPath === `/${document.documentElement.lang}`) {
      isActive = path === linkPath;
    } else {
      isActive = path === linkPath || path.startsWith(`${linkPath}/`);
    }

    link.classList.toggle('is-active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function initInPageScroll() {
  document.querySelectorAll<HTMLElement>('[data-scroll-target]').forEach((el) => {
    el.addEventListener('click', (event) => {
      const id = el.getAttribute('data-scroll-target');
      if (!id) return;

      const target = document.getElementById(id);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      // Off-page (e.g. footer Feature overview on /warzone-blog/) → hard-navigate to href.
      const href = el.getAttribute('href');
      if (href && href.includes('#')) {
        event.preventDefault();
        window.location.assign(href);
      }
    });
  });

  // Honor hash targets after cross-page navigation (e.g. /#features).
  const hashId = window.location.hash.replace(/^#/, '');
  if (hashId) {
    const hashTarget = document.getElementById(hashId);
    if (hashTarget) {
      requestAnimationFrame(() => {
        hashTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }
}

function initSkipLink() {
  document.querySelectorAll<HTMLElement>('[data-skip-to-main]').forEach((button) => {
    button.addEventListener('click', () => {
      const main = document.getElementById('main-content');
      if (!main) return;

      main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: false });
      main.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function applyFaqItemVisibility(section: Element, topic: string) {
  const expanded = section.hasAttribute('data-faq-expanded');
  const items = section.querySelectorAll<HTMLElement>('[data-faq-item]');

  items.forEach((item) => {
    const itemTopic = item.getAttribute('data-faq-topic');
    const filterMatch = topic === 'all' || itemTopic === topic;
    const inOverflowList = Boolean(item.closest('[data-faq-overflow-list]'));
    const show = filterMatch && (expanded || !inOverflowList);
    item.toggleAttribute('data-hidden', !show);
  });
}

function initFaqShowMore() {
  document.querySelectorAll<HTMLButtonElement>('[data-faq-show-more]').forEach((btn) => {
    if (btn.hasAttribute('data-faq-bound')) return;
    btn.setAttribute('data-faq-bound', '');

    btn.addEventListener('click', () => {
      const section = btn.closest('[data-faq-section]');
      if (!section) return;

      section.setAttribute('data-faq-expanded', '');
      btn.closest('[data-faq-more-wrap]')?.remove();

      const activeChip = section.querySelector<HTMLButtonElement>('[data-faq-filter].is-active');
      const topic = activeChip?.getAttribute('data-faq-filter') ?? 'all';
      applyFaqItemVisibility(section, topic);
    });
  });
}

function initFaqFilters() {
  document.querySelectorAll('[data-faq-filters]').forEach((container) => {
    const section = container.closest('[data-faq-section]');
    if (!section) return;

    const chips = container.querySelectorAll<HTMLButtonElement>('[data-faq-filter]');

    chips.forEach((chip) => {
      if (chip.hasAttribute('data-faq-bound')) return;
      chip.setAttribute('data-faq-bound', '');

      chip.addEventListener('click', () => {
        const topic = chip.getAttribute('data-faq-filter') ?? 'all';
        chips.forEach((c) => c.classList.toggle('is-active', c === chip));
        applyFaqItemVisibility(section, topic);
      });
    });
  });
}

function initThemeMetaColor() {
  const metaTheme = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (!metaTheme) return;
  const sync = () => {
    metaTheme.content = document.documentElement.classList.contains('dark') ? '#7c3aed' : '#f8f5fc';
  };
  sync();
  new MutationObserver(sync).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
}

function initBlurUpImages() {
  document.querySelectorAll<HTMLImageElement>('[data-ri-full]').forEach((img) => {
    const root = img.closest('[data-ri]');
    if (!root) return;
    const mark = () => root.classList.add('is-loaded');
    if (img.complete && img.naturalWidth > 0) mark();
    else img.addEventListener('load', mark, { once: true });
  });
}

function initMobileNav() {
  document.querySelectorAll<HTMLDetailsElement>('details.mobile-nav').forEach((nav) => {
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.open = false;
      });
    });

    document.addEventListener('click', (event) => {
      if (!nav.open) return;
      const target = event.target;
      if (target instanceof Node && !nav.contains(target)) nav.open = false;
    });
  });
}

function bootSiteCore() {
  initMobileNav();
  initNavHighlight();
  initInPageScroll();
  initSkipLink();
}

function bootSiteIdle() {
  initFaqFilters();
  initFaqShowMore();
  initThemeMetaColor();
  initBlurUpImages();
}

function bootSite() {
  bootSiteCore();
  const scheduleIdle =
    typeof window.requestIdleCallback === 'function'
      ? (cb: () => void) => window.requestIdleCallback(cb, { timeout: 2000 })
      : (cb: () => void) => window.setTimeout(cb, 1);
  scheduleIdle(bootSiteIdle);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootSite);
} else {
  bootSite();
}

document.addEventListener('astro:after-swap', () => {
  initFaqFilters();
  initFaqShowMore();
});
