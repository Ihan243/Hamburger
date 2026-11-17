import React from 'react';

export default function HeroSection() {
  const photo = `${import.meta.env.BASE_URL}images/salchipapa-dish.png`;

  return (
    <section id="inicio" className="hero-reference" aria-labelledby="hero-reference-title">
      <div className="hero-reference-stage">
        <div className="hero-reference-stickers" aria-hidden="true">
          <span className="hero-sticker-papas">¡Papas!</span>
          <span className="hero-sticker-crunch">Crujiente</span>
          <span className="hero-sticker-sabor">¡Sabor!</span>
        </div>

        <h1 id="hero-reference-title" className="hero-reference-title">
          <span>ENVUELTO</span>
          <span>EN SABOR</span>
        </h1>

        <div className="hero-reference-food">
          <img
            src={photo}
            alt="Salchipapas con chorizo, queso y salsas de la casa"
            fetchPriority="high"
            draggable={false}
          />
        </div>
        <span className="hero-reference-emoji hero-reference-emoji-tasty" aria-hidden="true">🤤</span>
        <span className="hero-reference-emoji hero-reference-emoji-fire" aria-hidden="true">🔥</span>

        <div className="hero-reference-bottom">
          <p>Convertimos las papas en las <strong>verdaderas protagonistas.</strong></p>
          <div className="hero-reference-actions">
            <a href="#carta" className="hero-reference-button hero-reference-button-light" title="Abrir carta digital">
              Ver Menú
            </a>
            <a href="#contacto" className="hero-reference-button hero-reference-button-outline">
              Ubícanos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
