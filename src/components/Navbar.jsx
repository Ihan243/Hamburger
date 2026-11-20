import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../i18n/LanguageContext.jsx';

const links = [
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Menú', href: '#carta', title: 'Abrir carta digital completa' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Delivery', href: '#delivery' },
];

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openCart, openCatalog } = useCart();
  const close = () => setMobileOpen(false);
  return (
    <header className="nav-reference">
      <nav className="nav-reference-inner" aria-label={t('Navegación principal')}>
        <a className="nav-reference-brand" href="#inicio" onClick={close} aria-label={t('La Patata, volver al inicio')}>
          <svg className="nav-reference-logo-mark" viewBox="0 0 56 65" aria-hidden="true" focusable="false" fill="none">
            <path d="M8 22L12 52Q27 62 44 52L48 22Q29 30 8 22Z" stroke="currentColor" strokeWidth="2.8" strokeLinejoin="round"/>
            <path d="M14 17L12 4L18 3L22 24M23 20L22 2L29 2L30 25M32 23L35 3L42 6L41 24M44 21L48 11L52 15L45 27" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            <path d="M17 32L19 48M27 35L28 52M37 32L35 49" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
          <span>LA PATATA</span>
        </a>

        <div className="nav-reference-links" aria-label={t('Secciones')}>
          {links.map(link => (
            <a href={link.href} key={link.href} title={link.title ? t(link.title) : undefined}
              onClick={link.label === 'Menú' ? event => { event.preventDefault(); openCatalog(); } : undefined}>{t(link.label)}</a>
          ))}
        </div>

        <div className="nav-reference-actions">
          {totalItems > 0 && (
            <button type="button" className="nav-reference-cart" onClick={openCart}
              aria-label={(language === 'en' ? 'Open cart: ' : 'Abrir carrito: ') + totalItems + ' ' + t('productos')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 7h13l-1.4 12H7.4L6 7Z"/>
                <path d="M9 8V6a3 3 0 0 1 6 0v2"/>
              </svg>
              <span>{totalItems}</span>
            </button>
          )}
          <div className="nav-language-toggle" role="group" aria-label={language === 'en' ? 'Language' : 'Idioma'}>
            <button type="button" lang="es" aria-pressed={language === 'es'}
              className={language === 'es' ? 'is-active' : ''} onClick={() => setLanguage('es')}>ES</button>
            <span aria-hidden="true">/</span>
            <button type="button" lang="en" aria-pressed={language === 'en'}
              className={language === 'en' ? 'is-active' : ''} onClick={() => setLanguage('en')}>EN</button>
          </div>
          <a href="#contacto" className="nav-reference-contact" onClick={close}>{t('Contacto')}</a>
          <button type="button" className="nav-reference-menu-toggle"
            onClick={() => setMobileOpen(prev => !prev)}
            aria-label={t(mobileOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación')}
            aria-expanded={mobileOpen} aria-controls="nav-reference-mobile">
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>
      <div id="nav-reference-mobile" className={'nav-reference-mobile' + (mobileOpen ? ' is-open' : '')}>
        {links.map(link => <a href={link.href} key={link.href} onClick={event => {
          close();
          if (link.label === 'Menú') { event.preventDefault(); openCatalog(); }
        }}>{t(link.label)}</a>)}
        <a href="#contacto" onClick={close}>{t('Contacto')}</a>
      </div>
    </header>
  );
}
