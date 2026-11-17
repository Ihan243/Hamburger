import { useEffect } from 'react';

const clamp = (x, min = 0, max = 1) => Math.min(max, Math.max(min, x));
const round = (value, decimals = 2) => value.toFixed(decimals);

/**
 * Scroll-scrubbed editorial layers. Scroll itself stays native and accessible:
 * one passive scroll listener, a single RAF easing loop and transform-only CSS.
 * Card sliders have their own transforms, which this module never touches.
 */
export default function ScrollCinematics() {
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches) return undefined;
    const sections = [
      { selector: '.hero-reference', name: 'hero' },
      { selector: '.ref-about', name: 'about' },
      { selector: '.spec-section', name: 'specialties' },
      { selector: '.ref-menu-section', name: 'menu' },
      { selector: '.reference-big-marquee', name: 'marquee' },
      { selector: '.ref-difference', name: 'difference' },
      { selector: '.gallery-loop-section', name: 'gallery' },
      { selector: '.closing-section', name: 'closing' }
    ]
      .map(({ selector, name }) => ({
        name,
        element: document.querySelector(selector),
        value: 0,
        target: 0
      }))
      .filter(item => item.element);

    if (!sections.length) return undefined;
    let frame = 0;
    let previousFrame = 0;
    let previousScroll = window.scrollY;
    let velocityTarget = 0;
    let velocity = 0;
    let alive = true;

    const getTarget = item => {
      const r = item.element.getBoundingClientRect();
      const h = Math.max(1, window.innerHeight);
      if (item.name === 'hero' && window.innerWidth >= 900) {
        // More than one viewport of scrolling makes the opening composition
        // linger before its torn-paper transition takes over.
        const pinDistance = Math.max(1, r.height - h);
        return clamp((82 - r.top) / pinDistance);
      }
      return clamp((h - r.top) / Math.max(1, h + r.height));
    };

    const apply = (item, p) => {
      const el = item.element;
      if (item.name === 'hero') {
        el.style.setProperty('--cinematic-title-y', round(-65 * p) + 'px');
        el.style.setProperty('--cinematic-title-scale', round(1 + p * .075, 4));
        el.style.setProperty('--cinematic-food-y', round(-110 * p) + 'px');
        el.style.setProperty('--cinematic-food-scale', round(1 + p * .16, 4));
        el.style.setProperty('--cinematic-stickers-y', round(-90 * p) + 'px');
        el.style.setProperty('--cinematic-hero-bottom-opacity', round(clamp(1 - p * 1.8), 3));
      } else {
        // A short vertical camera glide, but applied to nested scene wrappers.
        // Outer sections remain normal-flow so anchor navigation still works.
        el.style.setProperty('--cinematic-scene-y', round((.5 - p) * 42) + 'px');
        el.style.setProperty('--cinematic-scene-scale', round(.965 + p * .06, 4));
        el.style.setProperty('--cinematic-scene-light', round(p * 100, 1) + '%');
      }
    };

    const draw = timestamp => {
      frame = 0;
      if (!alive) return;
      const dt = previousFrame ? Math.min(50, timestamp - previousFrame) : 16;
      previousFrame = timestamp;
      // Framerate-independent interpolation: an inertial camera, not a
      // linear one-to-one CSS transition.
      const alpha = 1 - Math.exp(-dt / 130);
      let moving = false;
      for (const item of sections) {
        item.target = getTarget(item);
        const difference = item.target - item.value;
        if (Math.abs(difference) > .0006) {
          item.value += difference * alpha;
          moving = true;
        } else {
          item.value = item.target;
        }
        apply(item, item.value);
      }

      velocity += (velocityTarget - velocity) * (1 - Math.exp(-dt / 95));
      velocityTarget *= Math.exp(-dt / 100);
      if (Math.abs(velocity) > .1 || Math.abs(velocityTarget) > .1) moving = true;
      document.documentElement.style.setProperty(
        '--cinematic-scroll-drift', round(clamp(velocity * .34, -42, 42)) + 'px'
      );

      if (moving) frame = window.requestAnimationFrame(draw);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(draw);
    };
    const onScroll = () => {
      const y = window.scrollY;
      velocityTarget = clamp((y - previousScroll) * 3.2, -125, 125);
      previousScroll = y;
      schedule();
    };
    const onResize = () => schedule();
    const onMotionChange = () => {
      if (!motion.matches) return;
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      for (const item of sections) {
        const keys = item.name === 'hero'
          ? ['--cinematic-title-y', '--cinematic-title-scale', '--cinematic-food-y',
             '--cinematic-food-scale', '--cinematic-stickers-y', '--cinematic-hero-bottom-opacity']
          : ['--cinematic-scene-y', '--cinematic-scene-scale', '--cinematic-scene-light'];
        keys.forEach(key => item.element.style.removeProperty(key));
      }
      document.documentElement.style.removeProperty('--cinematic-scroll-drift');
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    motion.addEventListener?.('change', onMotionChange);
    schedule();
    return () => {
      alive = false;
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      motion.removeEventListener?.('change', onMotionChange);
      onMotionChange();
    };
  }, []);
  return null;
}
