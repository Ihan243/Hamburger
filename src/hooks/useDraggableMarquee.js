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
  const pausedRef = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const m = motion.current;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let before = 0;
    const measure = () => {
      m.width = groupRef.current?.getBoundingClientRect().width || 0;
    };
    measure();
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    if (groupRef.current) ro?.observe(groupRef.current);
    window.addEventListener('resize', measure);
    const intersection = typeof IntersectionObserver === 'undefined' ? null
      : new IntersectionObserver(entries => {
          m.active = !!entries[0]?.isIntersecting;
        }, { rootMargin: '150px' });
    if (viewportRef.current) intersection?.observe(viewportRef.current);

    const step = timestamp => {
      const dt = before ? Math.min((timestamp - before) / 1000, 0.05) : 0;
      before = timestamp;
      if (m.active && !m.dragging && !m.hovering && !pausedRef.current && !media.matches) {
        m.velocity += (-speed - m.velocity) * Math.min(1, dt * 3);
        m.x += m.velocity * dt;
      }
      if (m.width && trackRef.current) {
        // Four identical copies cover the viewport during wrapping in either direction.
        let x = m.x % m.width;
        if (x > 0) x -= m.width;
        trackRef.current.style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0)';
      }
      frame = window.requestAnimationFrame(step);
    };
    frame = window.requestAnimationFrame(step);
    return () => {
      window.cancelAnimationFrame(frame);
      ro?.disconnect();
      intersection?.disconnect();
      window.removeEventListener('resize', measure);
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
    if (didDrag) {
      suppressClick.current = true;
      window.setTimeout(() => { suppressClick.current = false; }, 0);
    }
  };
  const togglePaused = () => {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
  };

  return {
    viewportRef, trackRef, groupRef, dragging, paused, togglePaused,
    bind: {
      onPointerDown, onPointerMove, onPointerUp: end, onPointerCancel: end,
      onPointerEnter: event => {
        if (event.pointerType === 'mouse') motion.current.hovering = true;
      },
      onPointerLeave: event => {
        if (event.pointerType === 'mouse') motion.current.hovering = false;
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
