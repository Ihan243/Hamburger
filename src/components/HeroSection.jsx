
import React from 'react';
import { useCart } from '../context/CartContext';
import { specialties } from '../data/menuData';
export default function HeroSection() {
 const { addToCart } = useCart();
 const featured = specialties.find(product => product.id === 'salchi-fest');
 const photo = import.meta.env.BASE_URL + 'images/salchipapa-dish.png';
 return <section id="inicio" className="ref-hero" aria-labelledby="ref-hero-title">
  <div className="ref-hero-stage">
   <div className="ref-hero-stickers" aria-hidden="true">
    <span>¡Papas!</span><span>Crujiente</span><span>¡Sabor!</span>
   </div>
   <h1 id="ref-hero-title" className="ref-hero-title">
    <span>ENVUELTO</span><span>EN SABOR</span>
   </h1>
   <div className="ref-hero-food">
    <img src={photo} alt="Salchipapas con salsas artesanales, chorizo y queso" fetchPriority="high"/>
   </div>
   <span className="ref-hero-emoji ref-hero-emoji-one" aria-hidden="true">🤤</span>
   <span className="ref-hero-emoji ref-hero-emoji-two" aria-hidden="true">🔥</span>
  </div>
  <div className="ref-hero-bottom">
   <p>Convertimos las papas en las <strong>verdaderas protagonistas.</strong></p>
   <div className="ref-hero-cta">
    <a href="#carta" className="ref-button-light">Ver Menú</a>
    <a href="#contacto" className="ref-button-outline">Ubícanos</a>
   </div>
   <button type="button" className="ref-hero-featured" onClick={() => addToCart(featured)}>
    ★ {featured.title} — US$ {featured.price.toFixed(2)} &nbsp; +
   </button>
  </div>
 </section>;
}
