import { foodImage, foodImageSrcSet } from '../utils/imageAssets.js';
import React from 'react';

export default function AboutSection() {
  return (
    <section id="nosotros" className="ref-about ref-cream-section" aria-labelledby="ref-about-title">
      <div className="ref-about-inner">
        <div className="ref-polaroid-collage" aria-label="Fotografía de nuestras papas">
          <figure className="ref-polaroid ref-polaroid-featured">
            <img
              src={foodImage}
              srcSet={foodImageSrcSet}
              sizes="(max-width: 720px) 82vw, (max-width: 980px) 45vw, 530px"
              alt="Papas doradas con queso, toppings frescos y salsas de la casa"
              loading="lazy"
              decoding="async"
              width="960"
              height="720"
            />
          </figure>
          <span className="ref-about-photo-sticker" aria-hidden="true">
            PAPAS CON<br />ACTITUD <span>✦</span>
          </span>
          <span className="ref-about-photo-note" aria-hidden="true">HECHAS AL MOMENTO</span>
        </div>
        <div className="ref-about-copy">
          <h2 id="ref-about-title" className="ref-section-title">SOBRE<br />NOSOTROS</h2>
          <p>En <strong>La Patata Street Food</strong> nos diferenciamos por convertir las papas en las verdaderas protagonistas, ofreciendo una variedad de combinaciones únicas y presentaciones creativas.</p>
          <p>Nuestra propuesta va mucho más allá de las salchipapas tradicionales: cada creación está pensada con identidad propia, fritura al minuto y cremas de la casa bajo nuestro sello: <strong>Papas con Actitud.</strong></p>
          <a href="#diferencia" className="ref-button-dark">Conoce la Diferencia</a>
        </div>
      </div>
    </section>
  );
}
