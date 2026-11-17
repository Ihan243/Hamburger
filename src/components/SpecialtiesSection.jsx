import React, { useEffect, useRef, useState } from 'react';
import { useCart } from '../context/CartContext';
import { specialties, menuItems } from '../data/menuData';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const limit = (value, min, max) => Math.max(min, Math.min(max, value));
const products = menuItems.filter(item =>
  item.categories.includes('broaster') ||
  item.categories.includes('crunch') ||
  item.categories.includes('boxes')
).slice(0, 8);

function ProductLoop({ onAdd }) {
  return (
    <div className="spec-products-enter">
      <div className="spec-products-heading">
        <div>
          <span className="spec-kicker">LA EXPERIENCIA CONTINÚA</span>
          <h3>DESCUBRE MÁS <em>ANTOJOS</em></h3>
        </div>
        <p>Desliza la mirada: más sabores para compartir, en una galería sin fin.</p>
      </div>
      <div className="spec-products-viewport" aria-label="Galería continua de productos">
        <div className="spec-products-track">
          {[0, 1].map(copy => (
            <div className="spec-products-group" key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
              {products.map((product, index) => (
                <article className="spec-product" key={product.id}>
                  <div className={'spec-product-photo spec-product-photo-' + (index % 4)}>
                    <img src={import.meta.env.BASE_URL + 'images/salchipapa-dish.png'}
                      alt={copy === 0 ? 'Fotografía ilustrativa de nuestra carta de street food' : ''}
                      loading="lazy" />
                  </div>
                  <div className="spec-product-details">
                    <h4>{product.title}</h4>
                    <span>US$ {product.price.toFixed(2)}</span>
                  </div>
                  {copy === 0 && (
                    <button type="button" onClick={() => onAdd(product)}
                      aria-label={'Añadir ' + product.title + ' al carrito'}>+ Añadir</button>
                  )}
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="spec-products-end">
        <span>HECHO AL MOMENTO · CON ACTITUD</span>
        <a href="#carta">VER LA CARTA COMPLETA <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  );
}

export default function SpecialtiesSection() {
  const { addToCart } = useCart();
  const [active, setActive] = useState(1);
  const [locked, setLocked] = useState(false);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);
  const selectedRef = useRef(1);
  const lockedRef = useRef(false);
  const currentRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef(null);

  const centerOffset = index => {
    const viewport = viewportRef.current;
    const card = cardsRef.current[index];
    if (!viewport || !card) return 0;
    return viewport.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2);
  };

  const applyOffset = offset => {
    if (!trackRef.current) return;
    trackRef.current.style.transform = 'translate3d(' + offset.toFixed(2) + 'px, 0, 0)';
  };

  const select = index => {
    if (index < 0 || index >= specialties.length) return;
    lockedRef.current = true;
    setLocked(true);
    selectedRef.current = index;
    setActive(index);
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    const offset = centerOffset(index);
    currentRef.current = offset;
    targetRef.current = offset;
    if (trackRef.current) {
      trackRef.current.style.transition = reducedMotion()
        ? 'none'
        : 'transform 750ms cubic-bezier(0.22, 1, 0.36, 1)';
    }
    applyOffset(offset);
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const prefersReduced = reducedMotion();

    const updateTarget = () => {
      if (lockedRef.current) return;
      const bounds = viewport.getBoundingClientRect();
      // Derive horizontal travel from the carousel's vertical position, not from
      // the expanding product strip. This avoids layout feedback/jumping.
      const range = window.innerHeight * 0.70 + bounds.height;
      const progress = limit((window.innerHeight * 0.76 - bounds.top) / range, 0, 1);
      targetRef.current = centerOffset(0) +
        (centerOffset(specialties.length - 1) - centerOffset(0)) * progress;
      const index = limit(Math.round(progress * (specialties.length - 1)), 0, specialties.length - 1);
      if (selectedRef.current !== index) {
        selectedRef.current = index;
        setActive(index);
      }
    };

    const animate = () => {
      rafRef.current = null;
      if (lockedRef.current) return;
      const delta = targetRef.current - currentRef.current;
      currentRef.current += delta * 0.12; // eased, slightly trailing "drag" feel
      if (Math.abs(delta) < 0.3) currentRef.current = targetRef.current;
      applyOffset(currentRef.current);
      if (Math.abs(targetRef.current - currentRef.current) > 0.3) {
        rafRef.current = window.requestAnimationFrame(animate);
      }
    };

    const onScroll = () => {
      if (lockedRef.current || prefersReduced) return;
      updateTarget();
      if (rafRef.current === null) rafRef.current = window.requestAnimationFrame(animate);
    };

    const onResize = () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      track.style.transition = 'none';
      if (lockedRef.current || prefersReduced) {
        const offset = centerOffset(selectedRef.current);
        targetRef.current = offset;
        currentRef.current = offset;
        applyOffset(offset);
      } else {
        updateTarget();
        currentRef.current = targetRef.current;
        applyOffset(currentRef.current);
      }
    };

    // Begin with the middle dish centered, then let scroll take control.
    const initialOffset = centerOffset(1);
    currentRef.current = initialOffset;
    targetRef.current = initialOffset;
    applyOffset(initialOffset);
    if (!prefersReduced) {
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
    window.addEventListener('resize', onResize);
    const observer = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(onResize) : null;
    observer?.observe(viewport);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      observer?.disconnect();
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section id="especialidades" className={'spec-section ref-cream-section ' +
      (locked ? 'spec-is-locked' : '')} aria-labelledby="specialties-title">
      <div className="spec-intro">
        <span className="spec-kicker">NUESTROS FAVORITOS · 01 / 03</span>
        <h2 id="specialties-title" className="ref-section-title">
          ESPECIALIDADES<br />DE LA CASA
        </h2>
        <p>Elige una especialidad para verla al centro. La selección detiene la
          animación; al llegar al tercer plato encontrarás más productos.</p>
      </div>

      <div className="spec-window" ref={viewportRef}>
        <div className="spec-track" ref={trackRef}>
          {specialties.map((dish, index) => (
            <article key={dish.id} ref={node => { cardsRef.current[index] = node; }}
              className={'spec-card ' + (index === active ? 'spec-card-active' : 'spec-card-idle')}>
              <button type="button" className="spec-choose" onClick={() => select(index)}
                aria-pressed={index === active} aria-label={'Centrar ' + dish.title}>
                <span className="spec-image-wrap">
                  <img className="spec-spinning-image" src={dish.image} alt={dish.title}
                    loading="lazy" />
                  <span className="spec-index">0{index + 1}</span>
                </span>
                <span className="spec-card-title">{dish.title}</span>
              </button>
              <p>{dish.desc}</p>
              <div className="spec-card-bottom">
                <span>US$ {dish.price.toFixed(2)}</span>
                <button type="button" className="spec-add" onClick={() => addToCart(dish)}
                  aria-label={'Añadir ' + dish.title + ' al carrito'}>Agregar +</button>
              </div>
            </article>
          ))}
        </div>
        <div className="spec-fade spec-fade-left" aria-hidden="true" />
        <div className="spec-fade spec-fade-right" aria-hidden="true" />
      </div>

      <div className="spec-controls">
        <button type="button" className="spec-arrow" onClick={() => select(limit(active - 1, 0, 2))}
          disabled={active === 0} aria-label="Especialidad anterior">‹</button>
        <div className="spec-dots" role="group" aria-label="Seleccionar especialidad">
          {specialties.map((dish, index) => (
            <button key={dish.id} type="button" onClick={() => select(index)}
              aria-label={'Seleccionar ' + dish.title}
              aria-pressed={index === active} className={index === active ? 'active' : ''} />
          ))}
        </div>
        <button type="button" className="spec-arrow" onClick={() => select(limit(active + 1, 0, 2))}
          disabled={active === 2} aria-label="Siguiente especialidad">›</button>
      </div>

      <div className="spec-current-label" aria-live="polite">
        {locked ? 'SELECCIÓN FIJADA' : 'DESLIZA CON EL SCROLL'} <span>·</span>
        <strong>{specialties[active].title}</strong>
      </div>

      {active === 2 && <ProductLoop onAdd={addToCart} />}

      <div className="spec-section-end">
        <span className="spec-kicker">TRES FAVORITOS. INFINITAS GANAS.</span>
        <a href="#carta">Explorar toda la carta <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
