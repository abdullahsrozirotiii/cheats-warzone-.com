export const HERO_AUTOPLAY_MS = 4800;
const DESKTOP_MQ = '(min-width: 1024px)';

type EmblaApi = {
  selectedScrollSnap: () => number;
  scrollTo: (n: number) => void;
  on: (event: string, cb: () => void) => void;
};

type AutoplayPlugin = {
  stop: () => void;
  play: () => void;
};

function restartProgress(progressEl: HTMLElement) {
  progressEl.classList.remove('is-running');
  // Double rAF restarts the composited scaleX animation without forced reflow.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      progressEl.classList.add('is-running');
    });
  });
}

function bindHeroDots(wrapper: HTMLElement, api: EmblaApi, autoplay: AutoplayPlugin) {
  const dotsRoot = wrapper.querySelector('[data-hero-embla-dots]');
  if (!dotsRoot) return;

  const dots = Array.from(dotsRoot.querySelectorAll<HTMLButtonElement>('[data-hero-embla-dot]'));

  const syncProgress = () => {
    const index = api.selectedScrollSnap();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    dots.forEach((dot, i) => {
      const progress = dot.querySelector<HTMLElement>('[data-hero-embla-progress]');
      if (!progress) return;

      progress.classList.remove('is-running');
      progress.classList.toggle('is-complete', i === index && reducedMotion);

      if (i === index && !reducedMotion) {
        restartProgress(progress);
      }
    });
  };

  const setActive = () => {
    const index = api.selectedScrollSnap();
    dots.forEach((dot, i) => {
      const active = i === index;
      dot.dataset.active = active ? 'true' : 'false';
      dot.setAttribute('aria-selected', active ? 'true' : 'false');
      dot.tabIndex = active ? 0 : -1;
    });
    syncProgress();
  };

  dots.forEach((dot) => {
    const index = Number(dot.getAttribute('data-hero-embla-dot'));
    dot.addEventListener('click', () => {
      api.scrollTo(index);
      autoplay.stop();
    });
  });

  api.on('select', setActive);
  api.on('reInit', setActive);
  setActive();
}

async function initHeroCarousels(root: ParentNode = document) {
  if (!window.matchMedia(DESKTOP_MQ).matches) return;

  const nodes = [...root.querySelectorAll<HTMLElement>('[data-hero-embla]')].filter(
    (node) => node.dataset.heroEmblaReady !== 'true',
  );
  if (!nodes.length) return;

  const [{ createCarousel }, { default: Autoplay }] = await Promise.all([
    import('@starwind-ui/runtime/carousel'),
    import('embla-carousel-autoplay'),
  ]);

  nodes.forEach((carouselRoot) => {
    carouselRoot.dataset.heroEmblaReady = 'true';

    const wrapper = carouselRoot.closest('[data-hero-embla-wrap]');
    if (!wrapper) return;

    const autoplay = Autoplay({
      delay: HERO_AUTOPLAY_MS,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    });

    const instance = createCarousel(carouselRoot, {
      opts: { loop: true, align: 'start', duration: 20 },
      plugins: [autoplay],
    });

    bindHeroDots(wrapper as HTMLElement, instance.api as EmblaApi, autoplay);

    const pauseWhenHidden = () => {
      if (document.hidden) autoplay.stop();
      else autoplay.play();
    };
    document.addEventListener('visibilitychange', pauseWhenHidden);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && !document.hidden) autoplay.play();
        else autoplay.stop();
      },
      { threshold: 0.35 },
    );
    io.observe(carouselRoot);
  });
}

export function setupHeroEmbla() {
  const run = () => {
    void initHeroCarousels();
  };

  run();

  window.matchMedia(DESKTOP_MQ).addEventListener('change', (event) => {
    if (event.matches) run();
  });

  document.addEventListener('astro:page-load', run);
}
