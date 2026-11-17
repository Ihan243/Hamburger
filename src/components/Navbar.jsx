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
  const { totalItems, openCart } = useCart();
  const close = () => setMobileOpen(false);
  return (
    <header className="nav-reference">
      <nav className="nav-reference-inner" aria-label="Navegación principal">
        <a className="nav-reference-brand" href="#inicio" onClick={close} aria-label="La Patata, volver al inicio">
          <img
            src={`${import.meta.env.BASE_URL}images/logo.png`}
            alt=""
            aria-hidden="true"
            width="34"
            height="38"
          />
          <span>LA PATATA</span>
        </a>

        <div className="nav-reference-links" aria-label="Secciones">
          {links.map(link => (
            <a href={link.href} key={link.href} title={link.title}>{link.label}</a>
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
        {links.map(link => <a href={link.href} key={link.href} onClick={close}>{link.label}</a>)}
        <a href="#contacto" onClick={close}>Contacto</a>
      </div>
    </header>
  );
}
