import { useEffect } from 'react';

/**
 * A single delegated pointer listener provides the coordinates for localized
 * surface highlights. It does not render on pointer movement.
 */
const SURFACES = [
  '.spec-card',
  '.spec-product',
  '.ref-menu-panel',
  '.ref-menu-order-box',
  '.gallery-social-tile',
  '.closing-contact',
  '.ref-polaroid'
].join(', ');

export default function EditorialPointerGlow() {
  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!finePointer.matches) return;

    let lastEvent = null;
    let frame = 0;

    const render = () => {
      frame = 0;
      const element = lastEvent?.target?.closest?.(SURFACES);
      if (!element) return;
      const bounds = element.getBoundingClientRect();
      element.style.setProperty('--glow-x', (lastEvent.clientX - bounds.left) + 'px');
      element.style.setProperty('--glow-y', (lastEvent.clientY - bounds.top) + 'px');
    };

    const onMove = event => {
      lastEvent = event;
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
