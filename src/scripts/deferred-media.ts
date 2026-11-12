/** Load muted loop videos after first paint / when visible — never blocks LCP. */
function bindHeroVideoToggle(video: HTMLVideoElement) {
  const root = video.closest('[data-hero-video]');
  if (!root) return;
  const btn = root.querySelector<HTMLButtonElement>('[data-hero-video-toggle]');
  if (!btn) return;
  const playIcon = root.querySelector<HTMLElement>('[data-hero-video-icon="play"]');
  const pauseIcon = root.querySelector<HTMLElement>('[data-hero-video-icon="pause"]');

  const sync = () => {
    const playing = !video.paused && !video.ended;
    btn.setAttribute('aria-label', playing ? 'Pause video' : 'Play video');
    btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
    playIcon?.classList.toggle('hidden', playing);
    pauseIcon?.classList.toggle('hidden', !playing);
  };

  btn.addEventListener('click', () => {
    if (video.paused || video.ended) void video.play().catch(() => {});
    else video.pause();
  });
  video.addEventListener('play', sync);
  video.addEventListener('pause', sync);
  video.addEventListener('ended', sync);
  sync();
}

export function initDeferredVideos() {
  const nodes = document.querySelectorAll<HTMLVideoElement>('video[data-deferred-video]');
  if (nodes.length === 0) return;

  const canLoad = (video: HTMLVideoElement) => {
    const minWidth = Number(video.getAttribute('data-deferred-min-width') || 0);
    if (minWidth > 0 && window.innerWidth < minWidth) return false;
    return true;
  };

  const loadVideo = (video: HTMLVideoElement) => {
    if (video.dataset.loaded === '1' || !canLoad(video)) return;
    const primary = video.getAttribute('data-deferred-video');
    const fallback = video.getAttribute('data-deferred-fallback');
    if (!primary) return;

    // Prefer a single source — never attach WebM + MP4 together (avoids dual download).
    const canWebm = Boolean(video.canPlayType('video/webm'));
    let chosen = primary;
    let type = 'video/mp4';

    if (/\.webm$/i.test(primary)) {
      if (canWebm) {
        chosen = primary;
        type = 'video/webm';
      } else if (fallback) {
        chosen = fallback;
        type = 'video/mp4';
      }
    } else if (fallback && /\.webm$/i.test(fallback) && canWebm) {
      chosen = fallback;
      type = 'video/webm';
    } else {
      chosen = primary;
      type = 'video/mp4';
    }

    const source = document.createElement('source');
    source.src = chosen;
    source.type = type;
    try {
      video.currentTime = 0;
    } catch {}
    video.appendChild(source);
    video.dataset.loaded = '1';
    video.autoplay = false;
    video.load();
    bindHeroVideoToggle(video);
  };

  const schedule = (video: HTMLVideoElement) => {
    const run = () => loadVideo(video);
    // Poster paints first — wait for idle so LCP/CSS/fonts win the network.
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(run, { timeout: 3500 });
    } else {
      window.setTimeout(run, 1800);
    }
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const video = entry.target as HTMLVideoElement;
          io.unobserve(video);
          schedule(video);
        }
      },
      { rootMargin: '80px 0px' },
    );
    nodes.forEach((video) => {
      if (!canLoad(video)) {
        window
          .matchMedia(`(min-width: ${video.getAttribute('data-deferred-min-width')}px)`)
          .addEventListener(
            'change',
            (event) => {
              if (event.matches) schedule(video);
            },
            { once: true },
          );
        return;
      }
      io.observe(video);
    });
  } else {
    nodes.forEach(schedule);
  }
}
