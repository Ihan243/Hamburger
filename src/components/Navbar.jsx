import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const links = [
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Menú', href: '#carta', title: 'Abrir carta digital completa' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Delivery', href: '#delivery' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openCart, openCatalog } = useCart();
  const close = () => setMobileOpen(false);
  return (
    <header className="nav-reference">
      <nav className="nav-reference-inner" aria-label="Navegación principal">
        <a className="nav-reference-brand" href="#inicio" onClick={close} aria-label="La Patata, volver al inicio">
          <svg className="nav-reference-logo-mark" viewBox="0 0 56 65" aria-hidden="true" focusable="false" fill="none">
            <path d="M8 22L12 52Q27 62 44 52L48 22Q29 30 8 22Z" stroke="currentColor" strokeWidth="2.8" strokeLinejoin="round"/>
            <path d="M14 17L12 4L18 3L22 24M23 20L22 2L29 2L30 25M32 23L35 3L42 6L41 24M44 21L48 11L52 15L45 27" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            <path d="M17 32L19 48M27 35L28 52M37 32L35 49" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
          <span>LA PATATA</span>
        </a>

        <div className="nav-reference-links" aria-label="Secciones">
          {links.map(link => (
            <a href={link.href} key={link.href} title={link.title}
              onClick={link.label === 'Menú' ? event => { event.preventDefault(); openCatalog(); } : undefined}>{link.label}</a>
          ))}
        </div>

        <div className="nav-reference-actions">
          {totalItems > 0 && (
            <button type="button" className="nav-reference-cart" onClick={openCart}
              aria-label={`Abrir carrito: ${totalItems} productos`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 7h13l-1.4 12H7.4L6 7Z"/>
                <path d="M9 8V6a3 3 0 0 1 6 0v2"/>
              </svg>
              <span>{totalItems}</span>
            </button>
          )}
          <a href="#contacto" className="nav-reference-contact" onClick={close}>Contacto</a>
          <button type="button" className="nav-reference-menu-toggle"
            onClick={() => setMobileOpen(prev => !prev)}
            aria-label={mobileOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            aria-expanded={mobileOpen} aria-controls="nav-reference-mobile">
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>
      <div id="nav-reference-mobile" className={'nav-reference-mobile' + (mobileOpen ? ' is-open' : '')}>
        {links.map(link => <a href={link.href} key={link.href} onClick={event => {
          close();
          if (link.label === 'Menú') { event.preventDefault(); openCatalog(); }
        }}>{link.label}</a>)}
        <a href="#contacto" onClick={close}>Contacto</a>
      </div>
    </header>
  );
}
