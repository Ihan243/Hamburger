import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const heroSlides = [
  { first: 'ENVUELTO', second: 'EN SABOR' },
  { first: 'PAPAS CON', second: 'ACTITUD' },
  { first: 'SABOR QUE', second: 'CONQUISTA' }
];

export default function HeroSection() {
  const [slide, setSlide] = useState(0);
  const { openCatalog } = useCart();
  const changeSlide = direction =>
    setSlide(current => (current + direction + heroSlides.length) % heroSlides.length);
  const photo = `${import.meta.env.BASE_URL}images/hero-platter-cutout.webp`;

  return (
    <section id="inicio" className="hero-reference" aria-labelledby="hero-reference-title">
      <div className="hero-reference-stage">
        <div className="hero-reference-stickers" aria-hidden="true">
          <span className="hero-sticker-papas">¡Papas!</span>
          <span className="hero-sticker-crunch">Crujiente</span>
          <span className="hero-sticker-sabor">¡Sabor!</span>
        </div>

        <h1 id="hero-reference-title" className="hero-reference-title" aria-live="polite">
          <span key={heroSlides[slide].first + '-a'}>{heroSlides[slide].first}</span>
          <span key={heroSlides[slide].second + '-b'}>{heroSlides[slide].second}</span>
        </h1>

        <button type="button" className="hero-reference-arrow hero-reference-arrow-left"
          onClick={() => changeSlide(-1)} aria-label="Frase anterior">‹</button>
        <button type="button" className="hero-reference-arrow hero-reference-arrow-right"
          onClick={() => changeSlide(1)} aria-label="Siguiente frase">›</button>

        <div className="hero-reference-food">
          <img
            src={photo}
            alt="Salchipapas con chorizo, queso y salsas de la casa"
            width="550"
            height="380"
            decoding="async"
            fetchPriority="high"
            draggable={false}
          />
        </div>
        <span className="hero-reference-emoji hero-reference-emoji-tasty" aria-hidden="true">🤤</span>
        <span className="hero-reference-emoji hero-reference-emoji-fire" aria-hidden="true">🔥</span>

        <div className="hero-reference-bottom">
          <p>Convertimos las papas en las <strong>verdaderas protagonistas.</strong></p>
          <div className="hero-reference-actions">
            <button type="button" onClick={openCatalog} className="hero-reference-button hero-reference-button-light" title="Abrir carta digital">
              Ver Menú
            </button>
            <a href="#contacto" className="hero-reference-button hero-reference-button-outline">
              Ubícanos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
