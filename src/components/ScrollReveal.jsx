import { useLayoutEffect } from 'react';

/**
 * Native, one-time left-to-right reveal for editorial content.
 * - 18% IntersectionObserver threshold, with no scroll handlers.
 * - 100ms stagger in grouped items (capped to avoid lengthy waits).
 * - Uses the CSS 'translate' property so interactive transforms are preserved.
 * - Dynamic menu/product cards are registered by a single MutationObserver.
 * - Initial viewport and reduced-motion content remain visible.
 */
const groups = [
  { selector: '.ref-polaroid-collage' },
  { selector: '.ref-about-copy > h2, .ref-about-copy > p, .ref-about-copy > a',
    group: '.ref-about-copy' },
  { selector: '.spec-intro > .spec-kicker, .spec-intro > .ref-section-title',
    group: '.spec-intro' },
  { selector: '.spec-card', group: '.spec-track' },
  { selector: '.spec-products-heading > *', group: '.spec-products-heading' },
  { selector: '.spec-product', group: '.spec-products-group' },
  { selector: '.spec-products-end > *', group: '.spec-products-end' },
  { selector: '.spec-section-end > *', group: '.spec-section-end' },
  { selector: '.ref-menu-panel-header > *, .ref-menu-search, .ref-menu-filters',
    group: '.ref-menu-panel' },
  { selector: '.ref-menu-group-heading, .ref-menu-line', group: '.ref-menu-col' },
  { selector: '.ref-menu-order-box, .ref-menu-footer-note, .ref-menu-empty',
    group: '.ref-menu-panel' },
  { selector: '.ref-difference-inner > .ref-section-title, .ref-difference-subtitle',
    group: '.ref-difference-inner' },
  { selector: '.ref-difference-point', group: '.ref-difference-grid' },
  { selector: '.ref-difference-photo', delay: 200 },
  { selector: '.ref-difference-inner > .ref-button-light', delay: 250 },
  { selector: '.gallery-loop-heading > *', group: '.gallery-loop-heading' },
  { selector: '.gallery-image-tile, .gallery-social-tile', group: '.gallery-loop-group' },
  { selector: '.gallery-loop-bottom > *', group: '.gallery-loop-bottom' },
  { selector: '.closing-lead > *', group: '.closing-lead' },
  { selector: '.closing-contact-title > *', group: '.closing-contact-title' },
  { selector: '.closing-contact-grid > div', group: '.closing-contact-grid' },
  { selector: '.closing-bottom > *', group: '.closing-bottom' },
  { selector: 'footer > div > div > *', group: 'footer > div > div' }
];

const MIN_VISIBLE_RATIO = 0.18;
const STAGGER_MS = 100;
const MAX_STAGGER_STEPS = 5;

export default function ScrollReveal() {
  useLayoutEffect(() => {
    const root = document.querySelector('#root');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!root || motion.matches || !('IntersectionObserver' in window)) return;

    const registered = new WeakSet();
    const pending = new Set();
    const reveal = element => {
      element.classList.remove('scroll-reveal-pending');
      element.classList.add('scroll-reveal-visible');
      pending.delete(element);
    };

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.intersectionRatio < MIN_VISIBLE_RATIO) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { threshold: [0, MIN_VISIBLE_RATIO], rootMargin: '0px 0px -4% 0px' }
    );

    const register = () => {
      for (const { selector, group, delay = 0 } of groups) {
        const items = root.querySelectorAll(selector);
        for (const item of items) {
          // Looping marquees duplicate their first set; don't animate copies.
          if (registered.has(item) || item.closest('[aria-hidden="true"]')) continue;
          registered.add(item);
          item.dataset.scrollReveal = 'slide';

          if (group) {
            const container = item.closest(group);
            if (container) {
              const siblings = [...container.querySelectorAll(selector)]
                .filter(node => !node.closest('[aria-hidden="true"]'));
              const order = siblings.indexOf(item);
              item.style.setProperty('--scroll-reveal-delay',
                Math.min(Math.max(0, order), MAX_STAGGER_STEPS) * STAGGER_MS + 'ms');
            }
          } else if (delay) {
            item.style.setProperty('--scroll-reveal-delay', delay + 'ms');
          }

          // Avoid a flash for content already on screen, including restored
          // scroll positions and direct links to a section.
          const rect = item.getBoundingClientRect();
          const visibleWidth = Math.max(0,
            Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0));
          const visibleHorizontally = rect.width > 0 &&
            visibleWidth / rect.width >= MIN_VISIBLE_RATIO;
          const alreadyVisible = rect.top < window.innerHeight * .82 &&
            rect.bottom > 0 && visibleHorizontally;

          if (alreadyVisible) {
            reveal(item);
          } else {
            // StrictMode may run effect cleanup + setup twice. Reset the old
            // visible class before re-arming the pending entrance.
            item.classList.remove('scroll-reveal-visible');
            item.classList.add('scroll-reveal-pending');
            pending.add(item);
            observer.observe(item);
          }
        }
      }
    };

    register();
    const mutations = typeof MutationObserver === 'undefined'
      ? null : new MutationObserver(records => {
        if (records.some(record => record.addedNodes.length)) register();
      });
    mutations?.observe(root, { childList: true, subtree: true });

    const onMotionChange = () => {
      if (!motion.matches) return;
      for (const element of pending) {
        observer.unobserve(element);
        reveal(element);
      }
    };
    motion.addEventListener?.('change', onMotionChange);

    return () => {
      observer.disconnect();
      mutations?.disconnect();
      motion.removeEventListener?.('change', onMotionChange);
      for (const element of pending) reveal(element);
    };
  }, []);

  return null;
}
