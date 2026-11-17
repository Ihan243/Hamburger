
import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { specialties } from '../data/menuData';
export default function SpecialtiesSection() {
 const { addToCart } = useCart();
 const [active, setActive] = useState(0);
 useEffect(() => {
   if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
   const timer = window.setInterval(() => setActive(current => (current + 1) % specialties.length), 4800);
   return () => window.clearInterval(timer);
 }, []);
 return <section id="especialidades" className="ref-specialties ref-cream-section" aria-labelledby="ref-specialties-title">
  <div className="ref-specialties-inner">
   <h2 id="ref-specialties-title" className="ref-section-title ref-specialties-title">ESPECIALIDADES<br/>DE LA CASA</h2>
   <div className="ref-specialty-grid">
    {specialties.map((dish, index) => <article key={dish.id} className={'ref-dish ' + (active === index ? 'ref-dish-active' : '')}>
      <button type="button" className="ref-dish-photo" onClick={() => setActive(index)} aria-label={'Destacar ' + dish.title}>
       <img src={dish.image} alt={dish.title} loading="lazy" className={'ref-rotating-dish ref-rotating-dish-' + index}/>
      </button>
      <h3>{dish.title}</h3>
      <p>{dish.desc}</p>
      <div className="ref-dish-footer">
       <span>US$ {dish.price.toFixed(2)}</span>
       <button type="button" onClick={() => addToCart(dish)}>Agregar +</button>
      </div>
    </article>)}
   </div>
   <div className="ref-specialty-dots" role="group" aria-label="Destacar especialidad">
    {specialties.map((dish, i) => <button type="button" key={dish.id}
     className={active === i ? 'is-active' : ''} onClick={() => setActive(i)}
     aria-label={'Destacar ' + dish.title} aria-pressed={active === i}/>)}
   </div>
  </div>
 </section>;
}
