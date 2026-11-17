
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
const links = [
 { label: 'Nosotros', href: '#nosotros' }, { label: 'Menú', href: '#carta' },
 { label: 'Galería', href: '#galeria' }, { label: 'Delivery', href: '#delivery' }
];
export default function Navbar() {
 const [mobileOpen, setMobileOpen] = useState(false);
 const { totalItems, openCart } = useCart();
 return <header className="ref-navbar sticky top-0 z-40">
  <nav className="ref-nav-shell" aria-label="Navegación principal">
   <a href="#inicio" className="ref-brand" onClick={() => setMobileOpen(false)}>
    <span className="ref-brand-fries" aria-hidden="true">🍟</span><span>LA PATATA</span>
   </a>
   <div className="ref-nav-pill">
    {links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
   </div>
   <div className="ref-nav-actions">
    <button type="button" onClick={openCart} className="ref-cart-btn"
      aria-label={'Abrir carrito, ' + totalItems + ' productos'}>
     <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 7h13l-1.4 12H7.4L6 7Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>
     </svg>
     {totalItems > 0 && <span className="ref-cart-count">{totalItems}</span>}
    </button>
    <a className="ref-digital-menu-button" href="#carta" aria-label="Abrir carta digital de La Patata">📖 Carta digital</a>
    <a className="ref-contact-button" href="#contacto">Contacto</a>
    <button className="ref-hamburger" type="button" onClick={() => setMobileOpen(v => !v)}
      aria-label="Abrir navegación" aria-expanded={mobileOpen}>{mobileOpen ? '✕' : '☰'}</button>
   </div>
  </nav>
  {mobileOpen && <div className="ref-mobile-links">
   {links.map(link => <a href={link.href} key={link.href} onClick={() => setMobileOpen(false)}>{link.label}</a>)}
   <a href="#carta" onClick={() => setMobileOpen(false)}>📖 Carta digital</a>
   <a href="#contacto" onClick={() => setMobileOpen(false)}>Contacto</a>
  </div>}
 </header>;
}
