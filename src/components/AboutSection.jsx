
import React from 'react';
export default function AboutSection() {
 const img = import.meta.env.BASE_URL + 'images/salchipapa-dish.png';
 return <section id="nosotros" className="ref-about ref-cream-section" aria-labelledby="ref-about-title">
  <div className="ref-about-inner">
   <div className="ref-polaroid-collage" aria-label="Galería gastronómica">
    <div className="ref-polaroid ref-polaroid-a"><img src={img} alt="Papas preparadas al momento" loading="lazy"/></div>
    <div className="ref-polaroid ref-polaroid-b"><img src={img} alt="Salchipapas con queso y salsas" loading="lazy"/></div>
    <div className="ref-polaroid ref-polaroid-c"><img src={img} alt="Porción de papas para compartir" loading="lazy"/></div>
   </div>
   <div className="ref-about-copy">
    <h2 id="ref-about-title" className="ref-section-title">SOBRE<br/>NOSOTROS</h2>
    <p>En <strong>La Patata Street Food</strong> nos diferenciamos por convertir las papas en las verdaderas protagonistas, ofreciendo una variedad de combinaciones únicas y presentaciones creativas.</p>
    <p>Nuestra propuesta va mucho más allá de las salchipapas tradicionales: cada creación está pensada con identidad propia, fritura al minuto y cremas de la casa bajo nuestro sello: <strong>Papas con Actitud.</strong></p>
    <a href="#diferencia" className="ref-button-dark">Conoce la Diferencia</a>
   </div>
  </div>
 </section>;
}
