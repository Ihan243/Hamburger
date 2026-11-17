import { useEffect, useRef, useState } from 'react';

// One continuous frame-based position for autoplay, drag and looping.
// A complete group's measured width is the seamless repeat period.
export default function useDraggableMarquee(speed = 42) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const groupRef = useRef(null);
  const motion = useRef({
    x: 0, velocity: -speed, width: 0, active: true,
    dragging: false, pointerId: null, x0: 0, y0: 0,
    lastX: 0, lastAt: 0, hovering: false
  });
  const suppressClick = useRef(false);
  const resumeRef = useRef(() => {});
  const pausedRef = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const m = motion.current;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let previous = 0;
    let alive = true;
    m.active = false;

    const measure = () => {
      m.width = groupRef.current?.getBoundingClientRect().width || 0;
    };
    const draw = () => {
      if (!m.width || !trackRef.current) return;
      // One full group is the exact seamless looping distance.
      let offset = m.x % m.width;
      if (offset > 0) offset -= m.width;
      trackRef.current.style.transform = 'translate3d(' + offset.toFixed(2) + 'px,0,0)';
    };

    const canRun = () =>
      alive && m.active && !document.hidden && !media.matches &&
      !pausedRef.current && !m.hovering && !m.dragging;

    const tick = now => {
      frame = 0;
      if (!canRun()) return;
      const dt = previous ? Math.min((now - previous) / 1000, .05) : 0;
      previous = now;
      m.velocity += (-speed - m.velocity) * Math.min(1, dt * 6);
      m.x += m.velocity * dt;
      draw();
      frame = requestAnimationFrame(tick);
    };

    const resume = () => {
      if (!canRun() || frame) return;
      previous = 0;
      frame = requestAnimationFrame(tick);
    };
    resumeRef.current = resume;
    measure();
    draw();

    const ro = typeof ResizeObserver === 'undefined' ? null
      : new ResizeObserver(() => { measure(); draw(); });
    if (groupRef.current) ro?.observe(groupRef.current);

    const intersection = typeof IntersectionObserver === 'undefined' ? null
      : new IntersectionObserver(([entry]) => {
          m.active = Boolean(entry?.isIntersecting);
          if (m.active) resume();
          else if (frame) { cancelAnimationFrame(frame); frame = 0; }
        }, { rootMargin: '100px' });
    if (viewportRef.current) intersection?.observe(viewportRef.current);
    else { m.active = true; resume(); }
    if (!intersection) { m.active = true; resume(); }

    const onVisibility = () => {
      if (document.hidden && frame) { cancelAnimationFrame(frame); frame = 0; }
      else resume();
    };
    document.addEventListener('visibilitychange', onVisibility);
    media.addEventListener?.('change', onVisibility);

    return () => {
      alive = false;
      if (frame) cancelAnimationFrame(frame);
      ro?.disconnect();
      intersection?.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      media.removeEventListener?.('change', onVisibility);
      resumeRef.current = () => {};
    };
  }, [speed]);

  const onPointerDown = event => {
    if (event.button !== 0 || event.target.closest('a,button,input')) return;
    const m = motion.current;
    if (m.pointerId !== null) return;
    m.pointerId = event.pointerId;
    m.x0 = event.clientX;
    m.y0 = event.clientY;
    m.lastX = event.clientX;
    m.lastAt = event.timeStamp;
    m.dragging = false;
  };
  const onPointerMove = event => {
    const m = motion.current;
    if (m.pointerId !== event.pointerId) return;
    const dxTotal = event.clientX - m.x0;
    const dyTotal = event.clientY - m.y0;
    if (!m.dragging) {
      if (Math.abs(dxTotal) < 8 || Math.abs(dxTotal) <= Math.abs(dyTotal)) return;
      m.dragging = true;
      m.velocity = 0;
      setDragging(true);
      event.currentTarget.setPointerCapture?.(event.pointerId);
    }
    const dx = event.clientX - m.lastX;
    const dt = Math.max(8, event.timeStamp - m.lastAt);
    m.x += dx;
    m.velocity = Math.max(-850, Math.min(850, dx / dt * 1000));
    m.lastX = event.clientX;
    m.lastAt = event.timeStamp;
    // Immediate visual response without waiting for an animation frame.
    if (m.width && trackRef.current) {
      let x = m.x % m.width;
      if (x > 0) x -= m.width;
      trackRef.current.style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0)';
    }
    event.preventDefault();
  };
  const end = event => {
    const m = motion.current;
    if (m.pointerId !== event.pointerId) return;
    const didDrag = m.dragging;
    m.pointerId = null;
    m.dragging = false;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    resumeRef.current();
    if (didDrag) {
      suppressClick.current = true;
      window.setTimeout(() => { suppressClick.current = false; }, 0);
    }
  };
  const togglePaused = () => {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
    if (!pausedRef.current) resumeRef.current();
  };

  return {
    viewportRef, trackRef, groupRef, dragging, paused, togglePaused,
    bind: {
      onPointerDown, onPointerMove, onPointerUp: end, onPointerCancel: end,
      onPointerEnter: event => {
        if (event.pointerType === 'mouse') motion.current.hovering = true;
      },
      onPointerLeave: event => {
        if (event.pointerType === 'mouse') {
          motion.current.hovering = false;
          resumeRef.current();
        }
      },
      onClickCapture: event => {
        if (!suppressClick.current) return;
        event.preventDefault();
        event.stopPropagation();
        suppressClick.current = false;
      },
      onDragStart: event => event.preventDefault()
    }
  };
}
