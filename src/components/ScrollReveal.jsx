import { useEffect } from 'react';

/**
 * Progressive, one-time entrance animations.
 *
 * - One IntersectionObserver for the page (not one per card).
 * - A MutationObserver picks up menu results and optional product strips.
 * - Only elements below the fold start hidden; the hero is never touched.
 * - The active specialty cards and the draggable marquees use opacity-only
 *   reveals, preserving their existing transforms and JS drag animations.
 * - Without JavaScript or with reduced motion, content stays visible.
 */
const groups = [
  { selector: '.ref-polaroid-collage, .ref-about-copy', effect: 'rise', delay: 35 },
  { selector: '.spec-intro', effect: 'rise' },
  { selector: '.spec-card', effect: 'fade', group: '.spec-track', stagger: 35 },
  { selector: '.spec-controls, .spec-current-label', effect: 'rise', delay: 25 },
  { selector: '.spec-products-heading, .spec-products-end', effect: 'rise' },
  { selector: '.spec-product', effect: 'fade', group: '.spec-products-group', stagger: 28 },
  { selector: '.spec-section-end', effect: 'rise' },
  { selector: '.ref-menu-heading, .ref-menu-panel', effect: 'rise' },
  { selector: '.ref-menu-line', effect: 'rise', group: '.ref-menu-col ul', stagger: 55 },
  { selector: '.ref-menu-order-box, .ref-boat-footnote', effect: 'rise' },
  { selector: '.ref-difference-inner > .ref-section-title, .ref-difference-subtitle', effect: 'rise' },
  { selector: '.ref-difference-point', effect: 'rise', group: '.ref-difference-points', stagger: 40 },
  { selector: '.ref-difference-photo', effect: 'fade' },
  { selector: '.gallery-loop-heading, .gallery-loop-bottom', effect: 'rise' },
  { selector: '.gallery-image-tile, .gallery-social-tile', effect: 'fade', group: '.gallery-loop-group', stagger: 28 },
  { selector: '.closing-lead, .closing-contact, .closing-bottom', effect: 'rise' }
];

export default function ScrollReveal() {
  useEffect(() => {
    const main = document.querySelector('main');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!main || reducedMotion.matches || !('IntersectionObserver' in window)) return;

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
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.06, rootMargin: '0px 0px -5% 0px' }
    );

    const register = () => {
      for (const { selector, effect, group, stagger, delay } of groups) {
        const items = main.querySelectorAll(selector);
        for (const item of items) {
          if (registered.has(item)) continue;
          registered.add(item);
          item.dataset.scrollReveal = effect;

          if (group && stagger) {
            const parent = item.closest(group);
            if (parent) {
              const siblings = [...parent.querySelectorAll(selector)];
              const order = siblings.indexOf(item);
              item.style.setProperty('--scroll-reveal-delay', Math.min(Math.max(0, order), 6) * stagger + 'ms');
            }
          } else if (delay) {
            item.style.setProperty('--scroll-reveal-delay', delay + 'ms');
          }

          // Visible elements must never flash away on hydration or hash navigation.
          const box = item.getBoundingClientRect();
          if (box.top < window.innerHeight * .94 && box.bottom > 0) {
            item.classList.add('scroll-reveal-visible');
          } else {
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
    mutations?.observe(main, { childList: true, subtree: true });

    const onMotionChange = () => {
      if (!reducedMotion.matches) return;
      for (const element of pending) {
        observer.unobserve(element);
        reveal(element);
      }
    };
    reducedMotion.addEventListener?.('change', onMotionChange);

    return () => {
      observer.disconnect();
      mutations?.disconnect();
      reducedMotion.removeEventListener?.('change', onMotionChange);
      for (const element of pending) reveal(element);
    };
  }, []);

  return null;
}
