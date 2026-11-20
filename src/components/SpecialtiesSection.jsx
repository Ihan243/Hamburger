import { foodImage, foodImageSrcSet } from '../utils/imageAssets.js';
import React, { useEffect, useRef, useState } from 'react';
import { useCart } from '../context/CartContext';
import { specialties, menuItems } from '../data/menuData';
import useDraggableMarquee from '../hooks/useDraggableMarquee';

const clamp = (x, min, max) => Math.max(min, Math.min(max, x));
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const products = menuItems.filter(item =>
  item.categories.some(cat => ['broaster', 'crunch', 'boxes'].includes(cat))
).slice(0, 8);

function ProductLoop({ onAdd, onOpenCatalog }) {
  const slider = useDraggableMarquee(43);
  return <div className="spec-products-enter">
    <div className="spec-products-heading">
      <div><span className="spec-kicker">LA EXPERIENCIA CONTINÚA</span>
        <h3>DESCUBRE MÁS <em>ANTOJOS</em></h3></div>
      <div className="spec-loop-description">
        <p>Arrastra las tarjetas a ambos lados o deja que se deslicen sin fin.</p>
        <button type="button" className="spec-loop-toggle" onClick={slider.togglePaused}
          aria-pressed={slider.paused}>{slider.paused ? '▶ Reanudar' : 'Ⅱ Pausar'}</button>
      </div>
    </div>
    <div className={'spec-products-viewport draggable-marquee' + (slider.dragging ? ' is-dragging' : '')}
      ref={slider.viewportRef} {...slider.bind} aria-label="Galería de productos arrastrable">
      <div className="spec-products-track" ref={slider.trackRef}>
        {[0, 1].map(copy => <div className="spec-products-group" key={copy}
          ref={copy === 0 ? slider.groupRef : undefined}
          aria-hidden={copy === 0 ? undefined : true}>
          {products.map((item, index) => <article className="spec-product" key={copy + '-' + item.id}>
            <div className={'spec-product-photo spec-product-photo-' + (index % 4)}>
              <img src={foodImage} srcSet={foodImageSrcSet} sizes="(max-width: 768px) 190px, 225px"
                alt={copy === 0 ? 'Fotografía ilustrativa de comida callejera' : ''}
                draggable={false} loading="lazy" decoding="async" width="225" height="169" />
            </div>
            <div className="spec-product-details"><h4>{item.title}</h4>
              <span>US$ {item.price.toFixed(2)}</span></div>
            <button type="button" tabIndex={copy === 0 ? undefined : -1} onClick={() => onAdd(item)}>+ Añadir</button>
          </article>)}
        </div>)}
      </div>
    </div>
    <div className="spec-products-end"><span>HECHO AL MOMENTO · CON ACTITUD</span>
      <a href="#carta" onClick={event => { event.preventDefault(); onOpenCatalog(); }}>VER LA CARTA COMPLETA ↗</a></div>
  </div>;
}

export default function SpecialtiesSection() {
  const { requestCustomization, openCatalog } = useCart();
  const [active, setActive] = useState(1);
  const [locked, setLocked] = useState(false);
  const activeRef = useRef(1);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);
  const currentRef = useRef(0);
  const dragRef = useRef(null);
  const suppressRef = useRef(false);

  const center = index => {
    const viewport = viewportRef.current;
    const card = cardsRef.current[index];
    return viewport && card
      ? viewport.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2)
      : 0;
  };
  const paint = x => {
    if (trackRef.current) trackRef.current.style.transform =
      'translate3d(' + x.toFixed(2) + 'px,0,0)';
  };
  const highlight = index => {
    if (activeRef.current !== index) {
      activeRef.current = index;
      setActive(index);
    }
  };
  const select = index => {
    if (index < 0 || index >= specialties.length) return;
    setLocked(true);
    highlight(index);
    const track = trackRef.current;
    if (!track) return;
    // Preserve current rendered position, then interpolate into the exact center.
    track.style.transition = 'none';
    track.getBoundingClientRect();
    track.style.transition = reducedMotion()
      ? 'none' : 'transform 760ms cubic-bezier(0.22,1,0.36,1)';
    currentRef.current = center(index);
    paint(currentRef.current);
  };
  const closest = x => specialties.reduce((best, _, index) =>
    Math.abs(center(index) - x) < Math.abs(center(best) - x) ? index : best, 0);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    // Keep the selected card centered. Wheel/vertical scrolling never moves
    // or changes the selection; users can still click or drag the carousel.
    const updatePosition = () => {
      const next = center(activeRef.current);
      track.style.transition = 'none';
      currentRef.current = next;
      paint(next);
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    const observer = typeof ResizeObserver === 'undefined'
      ? null : new ResizeObserver(updatePosition);
    observer?.observe(viewport);

    return () => {
      window.removeEventListener('resize', updatePosition);
      observer?.disconnect();
    };
  }, []);

  const onPointerDown = e => {
    if (e.button !== 0 || e.target.closest('.spec-add')) return;
    dragRef.current = {
      id: e.pointerId, x0: e.clientX, y0: e.clientY,
      lastX: e.clientX, dragging: false
    };
  };
  const onPointerMove = e => {
    const drag = dragRef.current;
    if (!drag || drag.id !== e.pointerId) return;
    const deltaX = e.clientX - drag.x0;
    const deltaY = e.clientY - drag.y0;
    if (!drag.dragging) {
      if (Math.abs(deltaX) < 7 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
      drag.dragging = true;
        setLocked(true);
        // Use the DOM's interpolated position if there was a click animation in progress.
      const matrix = new DOMMatrixReadOnly(getComputedStyle(trackRef.current).transform);
      currentRef.current = matrix.m41;
      trackRef.current.style.transition = 'none';
      paint(currentRef.current);
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    currentRef.current = clamp(currentRef.current + e.clientX - drag.lastX, center(2), center(0));
    drag.lastX = e.clientX;
    paint(currentRef.current);
    highlight(closest(currentRef.current));
    e.preventDefault();
  };
  const endDrag = e => {
    const drag = dragRef.current;
    if (!drag || drag.id !== e.pointerId) return;
    dragRef.current = null;
    if (e.currentTarget.hasPointerCapture?.(e.pointerId))
      e.currentTarget.releasePointerCapture(e.pointerId);
    if (drag.dragging) {
      suppressRef.current = true;
      select(closest(currentRef.current));
      window.setTimeout(() => { suppressRef.current = false; }, 0);
    }
  };

  return <section id="especialidades" className={'spec-section ref-cream-section ' +
    (locked ? 'spec-is-locked' : '')} aria-labelledby="specialties-title">
    <div className="spec-intro">
      <span className="spec-kicker">NUESTROS FAVORITOS · 01 / 03</span>
      <h2 id="specialties-title" className="ref-section-title">ESPECIALIDADES<br />DE LA CASA</h2>
      <p>Arrastra los platos o haz clic para elegir el que quieres ver al centro.</p>
    </div>
    <div className="spec-window draggable-marquee" ref={viewportRef}
      onPointerDown={onPointerDown} onPointerMove={onPointerMove}
      onPointerUp={endDrag} onPointerCancel={endDrag}
      onClickCapture={e => { if (suppressRef.current) {
        e.preventDefault(); e.stopPropagation(); suppressRef.current = false; } }}
      onDragStart={e => e.preventDefault()}>
      <div className="spec-track" ref={trackRef}>
        {specialties.map((dish, index) => <article
          key={dish.id} ref={node => { cardsRef.current[index] = node; }}
          className={'spec-card ' + (active === index ? 'spec-card-active' : 'spec-card-idle')}>
          <button type="button" className="spec-choose" onClick={() => select(index)}
            aria-pressed={active === index} aria-label={'Centrar ' + dish.title}>
            <span className="spec-image-wrap">
              <img className="spec-spinning-image" src={dish.image} srcSet={foodImageSrcSet} sizes="(max-width: 768px) 270px, 310px" alt={dish.title} draggable={false}
                loading="lazy" decoding="async" />
              <span className="spec-index">0{index + 1}</span>
            </span>
            <span className="spec-card-title">{dish.title}</span>
          </button>
          <p>{dish.desc}</p>
          <div className="spec-card-bottom">
            <span>US$ {dish.price.toFixed(2)}</span>
            <button type="button" className="spec-add" onClick={() => requestCustomization(dish)}>Agregar +</button>
          </div>
        </article>)}
      </div>
      <div className="spec-fade spec-fade-left" aria-hidden="true"/>
      <div className="spec-fade spec-fade-right" aria-hidden="true"/>
    </div>
    <div className={'spec-loop-reveal' + (active === 2 ? ' spec-loop-visible' : '')}
      aria-hidden={active !== 2}>
      {active === 2 && <ProductLoop onAdd={requestCustomization} onOpenCatalog={openCatalog}/>}
    </div>
    <div className="spec-section-end">
      <span className="spec-kicker">TRES FAVORITOS. INFINITAS GANAS.</span>
      <a href="#carta">Explorar toda la carta ↗</a>
    </div>
  </section>;
}
