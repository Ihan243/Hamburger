
import React, { useMemo, useState } from 'react';
import { useCart } from '../context/CartContext';
import { menuCategories, menuItems, boatDish } from '../data/menuData';

function MenuLine({ item, onAdd }) {
 return <li className="ref-menu-line">
  <button className="ref-menu-item-button" type="button" onClick={() => onAdd(item)} title={'Agregar ' + item.title + ' al carrito'}>
   <span className="ref-menu-item-main">
    <span className="ref-menu-name">{item.title}{item.badge && <small>{item.badge}</small>}</span>
    <span className="ref-menu-description">{item.desc}</span>
   </span>
   <span className="ref-price-rule" aria-hidden="true"/>
   <span className="ref-menu-price">US$ {item.price.toFixed(2)}</span>
   <span className="ref-menu-plus" aria-hidden="true">+</span>
  </button>
 </li>;
}

export default function MenuSection() {
 const [activeCategory, setActiveCategory] = useState('all');
 const [searchQuery, setSearchQuery] = useState('');
 const { addToCart, openCart } = useCart();
 const visible = useMemo(() => {
  const query = searchQuery.trim().toLocaleLowerCase('es');
  return menuItems.filter(item => {
   const categoryMatches = !!query || activeCategory === 'toda' || item.categories.includes(activeCategory);
   const searchText = (item.title + ' ' + item.desc + ' ' + (item.tags || '')).toLocaleLowerCase('es');
   return categoryMatches && (!query || searchText.includes(query));
  });
 }, [searchQuery, activeCategory]);
 const featured = activeCategory === 'all' && !searchQuery;
 const split = featured ? 5 : Math.ceil(visible.length / 2);
 const left = visible.slice(0, split);
 const right = visible.slice(split);
 return <section id="carta" className="ref-menu-section" aria-labelledby="ref-menu-title">
  <div className="ref-menu-heading">
   <span className="ref-sticker">¡Irresistible!</span>
   <h2 id="ref-menu-title" className="ref-section-title">SABOR QUE<br/>HABLA FUERTE<span className="ref-star" aria-hidden="true">★</span></h2>
  </div>
  <div className="ref-menu-panel">
   <div className="ref-menu-panel-header"><h3>NUESTRA CARTA</h3><p>La calidad que te ofrecemos · Precios en USD</p></div>
   <label className="ref-menu-search">
    <span aria-hidden="true">⌕</span>
    <input type="search" value={searchQuery} onChange={event => setSearchQuery(event.target.value)}
     placeholder="Buscar en la carta (ej. alitas, picante, wrap, bowl, boxes…)" aria-label="Buscar productos del menú"/>
   </label>
   <div className="ref-menu-filters" role="group" aria-label="Categorías del menú">
    {menuCategories.map(category => <button type="button" key={category.id}
     className={activeCategory === category.id ? 'active' : ''}
     onClick={() => setActiveCategory(category.id)} aria-pressed={activeCategory === category.id}>{category.label}</button>)}
   </div>
   {visible.length ? <div className="ref-menu-columns">
    <div className="ref-menu-col">
     <div className="ref-menu-group-heading"><h4>{featured ? 'LOS FAVORITOS DEL PÚBLICO' : 'NUESTRA SELECCIÓN'}</h4></div>
     <ul>{left.map(item => <MenuLine key={item.id} item={item} onAdd={addToCart}/>)}</ul>
    </div>
    <div className="ref-menu-col">
     <div className="ref-menu-group-heading">
      <h4>{featured ? 'COMBO ESTRELLA' : 'MÁS PARA DISFRUTAR'}</h4>
      {featured && <span>PARA COMPARTIR</span>}
     </div>
     <ul>{right.map(item => <MenuLine key={item.id} item={item} onAdd={addToCart}/>)}</ul>
     <div className="ref-menu-order-box">
      <h4>¿Quieres hacer tu pedido? ¡Hazlo aquí!</h4>
      <p>Agrega productos desde la carta. Los pedidos por WhatsApp se activarán al configurar el contacto del local.</p>
      <button type="button" onClick={openCart}>Ver Carta Digital &amp; Pedir →</button>
     </div>
    </div>
   </div> : <div className="ref-menu-empty">
    <p>No encontramos productos con esa búsqueda.</p>
    <button type="button" onClick={() => {setSearchQuery('');setActiveCategory('toda');}}>Ver toda la carta</button>
   </div>}
   <div className="ref-boat-footnote">
    <span>★ EXPERIENCIA MONUMENTAL</span><strong>{boatDish.title} — US$ {boatDish.price.toFixed(2)}</strong>
    <button type="button" onClick={() => addToCart(boatDish)}>Agregar el barco +</button>
   </div>
  </div>
 </section>;
}
