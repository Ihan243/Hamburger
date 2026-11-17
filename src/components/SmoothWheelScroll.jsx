import { useEffect } from 'react';

/**
 * Inertial wheel scrolling on desktop.
 *
 * Normal browser scrolling remains available for touch, trackpad gestures
 * that are predominantly horizontal, keyboard, anchor navigation, nested
 * scrollable elements, zoom, and reduced-motion preferences.
 *
 * Important: this interpolates the *actual window scrollTop*. Decorative
 * parallax alone does not make a mouse-wheel movement feel smooth.
 */
const limit = (value, min, max) => Math.max(min, Math.min(max, value));
const isEditable = element =>
  element?.closest?.('input, textarea, select, [contenteditable="true"], [role="dialog"]');

function hasNestedScroll(target, deltaY) {
  let element = target instanceof Element ? target : target?.parentElement;
  while (element && element !== document.documentElement && element !== document.body) {
    const style = window.getComputedStyle(element);
    if (
      /auto|scroll|overlay/.test(style.overflowY) &&
      element.scrollHeight > element.clientHeight + 2
    ) {
      const roomDown = element.scrollTop + element.clientHeight < element.scrollHeight - 2;
      const roomUp = element.scrollTop > 2;
      if ((deltaY > 0 && roomDown) || (deltaY < 0 && roomUp)) return true;
    }
    element = element.parentElement;
  }
  return false;
}

export default function SmoothWheelScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia('(hover: hover) and (pointer: fine)');

    let desired = window.scrollY;
    let position = desired;
    let frame = 0;
    let lastTime = 0;
    let lastWrite = desired;
    let smoothRunning = false;

    const maxY = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const stop = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      smoothRunning = false;
    };

    const sync = () => {
      stop();
      desired = window.scrollY;
      position = desired;
      lastWrite = position;
    };

    const step = timestamp => {
      frame = 0;
      if (reduced.matches || !desktop.matches) {
        sync();
        return;
      }
      const dt = lastTime ? Math.min(48, timestamp - lastTime) : 16.67;
      lastTime = timestamp;
      desired = limit(desired, 0, maxY());
      // Short trailing motion responds immediately without a floating/delayed feel.
      // About 90ms response constant, frame-rate independent.
      const ease = 1 - Math.exp(-dt / 90);
      position += (desired - position) * ease;

      if (Math.abs(desired - position) < .45) position = desired;
      lastWrite = position;
      window.scrollTo({ top: position, behavior: 'instant' });

      if (Math.abs(desired - position) > .45) {
        frame = window.requestAnimationFrame(step);
      } else {
        smoothRunning = false;
        lastTime = 0;
      }
    };

    const wheel = event => {
      if (!desktop.matches || reduced.matches || !event.cancelable) return;
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.deltaY === 0 || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (isEditable(event.target)) return;
      if (event.target?.closest?.('[data-native-scroll], [data-purpose="mascot-widget"]')) return;

      const unit = event.deltaMode === 1 ? 16 :
        event.deltaMode === 2 ? window.innerHeight : 1;
      const distance = event.deltaY * unit;
      if (hasNestedScroll(event.target, distance)) return;

      // Normalized wheel input preserves both short trackpad moves and
      // longer wheel notches, without the enormous distance jumps of
      // simply multiplying every scroll delta.
      const advance = limit(distance, -570, 570);
      if (!smoothRunning) {
        position = window.scrollY;
        desired = position;
        lastWrite = position;
      }
      const next = limit(desired + advance, 0, maxY());
      if (next === desired && !smoothRunning) return;

      event.preventDefault();
      desired = next;
      if (!smoothRunning) {
        smoothRunning = true;
        lastTime = 0;
        frame = window.requestAnimationFrame(step);
      }
    };

    const onScroll = () => {
      if (smoothRunning && Math.abs(window.scrollY - lastWrite) < 5) return;
      // A scrollbar drag, keyboard command, browser restore, or anchor
      // navigates normally and takes precedence over wheel inertia.
      sync();
    };
    const onAnchor = event => {
      if (event.target?.closest?.('a[href^="#"], a[href^="/#"]')) sync();
    };
    const onVisibility = () => {
      if (document.hidden) sync();
    };
    const onMotionChange = () => sync();

    window.addEventListener('wheel', wheel, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', sync, { passive: true });
    document.addEventListener('click', onAnchor, true);
    document.addEventListener('visibilitychange', onVisibility);
    reduced.addEventListener?.('change', onMotionChange);
    desktop.addEventListener?.('change', onMotionChange);
    return () => {
      stop();
      window.removeEventListener('wheel', wheel);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', sync);
      document.removeEventListener('click', onAnchor, true);
      document.removeEventListener('visibilitychange', onVisibility);
      reduced.removeEventListener?.('change', onMotionChange);
      desktop.removeEventListener?.('change', onMotionChange);
    };
  }, []);
  return null;
}
