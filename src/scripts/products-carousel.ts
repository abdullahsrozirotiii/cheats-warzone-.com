import { createCarousel } from '@starwind-ui/runtime/carousel';

function getCarouselRoot(wrap: HTMLElement): HTMLElement | null {
  return wrap.querySelector<HTMLElement>('[data-sw-carousel]');
}

function getControl(
  wrap: HTMLElement,
  root: HTMLElement,
  kind: 'previous' | 'next',
): HTMLButtonElement | null {
  const attr = kind === 'previous' ? 'data-sw-carousel-previous' : 'data-sw-carousel-next';
  const slot = kind === 'previous' ? 'carousel-previous' : 'carousel-next';
  return (
    root.querySelector<HTMLButtonElement>(`[${attr}]`) ??
    root.querySelector<HTMLButtonElement>(`[data-slot="${slot}"]`) ??
    wrap.querySelector<HTMLButtonElement>(`[${attr}]`) ??
    wrap.querySelector<HTMLButtonElement>(`[data-slot="${slot}"]`)
  );
}

function applyArrowState(button: HTMLButtonElement | null, show: boolean) {
  if (!button) return;
  button.classList.toggle('is-visible', show);
  if (show) {
    button.removeAttribute('hidden');
    button.removeAttribute('aria-hidden');
  } else {
    button.setAttribute('hidden', '');
    button.setAttribute('aria-hidden', 'true');
  }
}

function syncProductsCarousel(wrap: HTMLElement, root: HTMLElement) {
  const carousel = createCarousel(root);
  const prev = getControl(wrap, root, 'previous');
  const next = getControl(wrap, root, 'next');
  const canPrev = carousel.canScrollPrev();
  const canNext = carousel.canScrollNext();

  applyArrowState(prev, canPrev);
  applyArrowState(next, canNext);
}

function bindProductsCarousel(wrap: HTMLElement) {
  const carouselRoot = getCarouselRoot(wrap);
  if (!carouselRoot) return;

  const onUpdate = () => syncProductsCarousel(wrap, carouselRoot);

  const wireControl = (kind: 'previous' | 'next') => {
    const control = getControl(wrap, carouselRoot, kind);
    control?.addEventListener('click', () => {
      window.requestAnimationFrame(onUpdate);
      window.setTimeout(onUpdate, 120);
    });
  };

  try {
    const carousel = createCarousel(carouselRoot);
    onUpdate();
    carousel.api.on('select', onUpdate);
    carousel.api.on('init', onUpdate);
    carousel.api.on('reInit', onUpdate);
    carousel.api.on('settle', onUpdate);
    wireControl('previous');
    wireControl('next');
    window.setTimeout(onUpdate, 0);
    window.setTimeout(onUpdate, 150);
  } catch {
    window.setTimeout(onUpdate, 50);
  }
}

export function initProductsCarousels(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-products-carousel]').forEach((wrap) => {
    if (wrap.dataset.productsCarouselBound === 'true') return;
    wrap.dataset.productsCarouselBound = 'true';
    bindProductsCarousel(wrap);
  });
}

function whenNearViewport(el: Element, cb: () => void) {
  if (typeof IntersectionObserver === 'undefined') {
    cb();
    return;
  }

  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return;
      io.disconnect();
      cb();
    },
    { rootMargin: '200px 0px' },
  );
  io.observe(el);
}

export function setupProductsCarousel() {
  const bindAll = () => {
    document.querySelectorAll<HTMLElement>('[data-products-carousel]').forEach((wrap) => {
      if (wrap.dataset.productsCarouselScheduled === 'true') return;
      wrap.dataset.productsCarouselScheduled = 'true';
      whenNearViewport(wrap, () => initProductsCarousels(wrap));
    });
  };

  bindAll();
  document.addEventListener('astro:page-load', bindAll);
  document.addEventListener('astro:after-swap', bindAll);
}
