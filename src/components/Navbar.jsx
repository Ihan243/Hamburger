import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { businessInfo } from '../data/businessInfo';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  const navLinks = [
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Especialidades', href: '#especialidades' },
    { label: 'Menú', href: '#carta' },
    { label: 'Diferencia', href: '#diferencia' },
    { label: 'Galería', href: '#galeria' },
    { label: 'Contacto', href: '#contacto' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-brand-purple/95 backdrop-blur-street border-b border-brand-purpleMuted/70 transition-all duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a 
          href="#" 
          aria-label="La Patata Street Food Home" 
          className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-yellow rounded-lg p-1 group"
        >
          <div className="flex items-center gap-2.5">
            <svg className="h-10 sm:h-12 w-auto transition-transform group-hover:scale-105" viewBox="0 0 320 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(10, 8)">
                <path d="M12 24 L22 48 L32 24 Z" fill="#E11D48"></path>
                <path d="M14 24 L22 48 L30 24 Z" fill="#F15A32"></path>
                <rect fill="#FFC83D" height="20" rx="1.5" transform="rotate(-12 17 18)" width="4.5" x="15" y="8"></rect>
                <rect fill="#FFE082" height="24" rx="1.5" width="4.5" x="20" y="4"></rect>
                <rect fill="#FFB300" height="22" rx="1.5" transform="rotate(10 27 17)" width="4.5" x="25" y="6"></rect>
                <rect fill="#FFD54F" height="16" rx="1.5" transform="rotate(-20 13 20)" width="4" x="11" y="12"></rect>
                <rect fill="#FFA000" height="17" rx="1.5" transform="rotate(18 31 18)" width="4" x="29" y="10"></rect>
              </g>
              <text fill="#FFFFFF" fontFamily="'Anton', 'Impact', sans-serif" fontSize="34" fontWeight="900" letterSpacing="1.5" x="62" y="38">LA PATATA</text>
              <rect fill="#FFC83D" height="12" rx="2" width="138" x="63" y="44"></rect>
              <text fill="#241622" fontFamily="'DM Sans', 'Inter', sans-serif" fontSize="9" fontWeight="800" letterSpacing="2.5" x="66" y="53.5">STREET FOOD</text>
              <text fill="#FFC83D" fontFamily="'DM Sans', sans-serif" fontSize="8" fontWeight="700" letterSpacing="1" x="208" y="53">CDMX</text>
            </svg>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-7 text-sm font-bold tracking-wide">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-brand-cream/80 hover:text-brand-yellow transition-colors font-medium tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Cart Drawer Trigger Button */}
          <button
            onClick={openCart}
            aria-label="Abrir Carrito"
            className="relative bg-brand-purpleMuted/80 hover:bg-brand-purpleMuted text-brand-cream p-2.5 rounded-full border border-brand-purpleMuted transition-all active:scale-95 group"
          >
            <svg className="w-5 h-5 group-hover:text-brand-yellow transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-yellow text-brand-purple font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-purpleDeep shadow-md animate-bounce">
                {totalItems}
              </span>
            )}
          </button>

          {/* Pedir WhatsApp Button */}
          <a
            href={businessInfo.whatsappUrl || "#carta"}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-brand-yellow hover:bg-brand-yellowDark text-brand-purple font-black text-xs uppercase tracking-wider px-4 py-2.5 rounded-full transition-transform active:scale-95 shadow-lg"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path>
            </svg>
            {businessInfo.whatsappUrl ? 'Pedir por WhatsApp' : 'Ver menú'}
          </a>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Abrir menú de navegación"
            className="md:hidden text-brand-cream hover:text-brand-yellow p-2 rounded-lg"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-purpleCard border-b border-brand-purpleMuted px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleLinkClick}
              className="block py-2 text-brand-cream hover:text-brand-yellow font-bold text-sm tracking-wide"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href={businessInfo.whatsappUrl || "#carta"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center inline-block bg-brand-yellow text-brand-purple py-3 rounded-xl font-black uppercase text-sm tracking-wider shadow"
            >
              {businessInfo.whatsappUrl ? '{businessInfo.whatsappUrl ? 'Pedir por WhatsApp' : 'Ver menú'} →' : 'Ver menú →'}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
