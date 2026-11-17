import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { menuCategories, menuItems, boatDish } from '../data/menuData';
import { businessInfo } from '../data/businessInfo';

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return menuItems.filter(item => {
      const matchesCategory =
        activeCategory === 'toda' ||
        item.categories.includes(activeCategory);

      const matchesSearch = 
        q === '' || 
        item.title.toLowerCase().includes(q) || 
        item.desc.toLowerCase().includes(q) ||
        (item.tags && item.tags.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section className="py-20 lg:py-28 bg-brand-purpleDeep relative" id="carta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/30 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider badge-tilt-left">
            ¡Irresistible!
          </span>
          <h2 className="font-street text-5xl sm:text-7xl lg:text-8xl text-white tracking-wide uppercase mt-2">
            SABOR QUE <br /><span className="text-brand-yellow">HABLA FUERTE</span>
          </h2>
          <h3 className="font-street text-3xl sm:text-4xl text-brand-cream/90 mt-1 uppercase">
            NUESTRA CARTA
          </h3>
          <p className="text-brand-graySub text-sm sm:text-base mt-2">
            Precios de referencia en dólares estadounidenses (USD). Selecciona tus favoritos o busca directo.
          </p>
        </div>

        {/* Real-time Search Input */}
        <div className="mt-10 max-w-2xl mx-auto relative">
          <div className="relative flex items-center">
            <svg className="absolute left-4 w-5 h-5 text-brand-graySub pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar en la carta (ej. alitas, picante, wrap, bowl, box)..." 
              className="w-full bg-brand-purpleCard border-2 border-brand-purpleMuted focus:border-brand-yellow text-white pl-12 pr-10 py-3.5 rounded-2xl text-sm placeholder-brand-graySub focus:outline-none focus:ring-0 transition-all shadow-inner"
            />
            {searchQuery.length > 0 && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 text-brand-graySub hover:text-white text-lg"
                title="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-4xl mx-auto">
          {menuCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-sm ${
                  isActive
                    ? 'bg-brand-yellow text-brand-purple'
                    : 'bg-brand-purpleCard text-brand-cream/80 hover:text-white border border-brand-purpleMuted'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* INSIGNIA MONUMENTAL EXPERIENCE BANNER: BARCO LA PATATA */}
        {(activeCategory === 'all' || activeCategory === 'boxes' || activeCategory === 'toda') && !searchQuery && (
          <div className="mt-12 bg-gradient-to-r from-brand-purpleMuted via-brand-purpleCard to-brand-purpleDeep border-2 border-brand-yellow/80 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="inline-block bg-brand-yellow text-brand-purple font-black text-[11px] px-3 py-1 rounded-md uppercase tracking-wider">
                  {boatDish.subtitle}
                </span>
                <h3 className="font-street text-4xl sm:text-5xl text-white">{boatDish.title}</h3>
                <p className="text-brand-cream/85 text-sm sm:text-base leading-relaxed">
                  {boatDish.desc}
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center lg:items-end justify-center gap-4">
                <div className="text-center lg:text-right">
                  <span className="text-xs uppercase text-brand-graySub block">Precio Monumental</span>
                  <span className="font-street text-4xl sm:text-5xl text-brand-yellow">US$ {boatDish.price.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => addToCart(boatDish)}
                  className="w-full sm:w-auto bg-brand-yellow hover:bg-brand-yellowDark text-brand-purple font-street text-lg px-6 py-3.5 rounded-xl uppercase tracking-wider shadow-lg transition-transform active:scale-95"
                >
                  Pedir Barco Insignia ⛵
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Menu Items Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <article 
              key={item.id}
              className="bg-brand-purpleCard border border-brand-purpleMuted/80 hover:border-brand-yellow rounded-2xl p-5 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-street text-xl text-white group-hover:text-brand-yellow transition-colors">
                    {item.title}
                  </h4>
                  <span className="font-street text-xl text-brand-yellow whitespace-nowrap">
                    US$ {item.price.toFixed(2)}
                  </span>
                </div>
                
                {item.badge && (
                  <span className={`inline-block text-[10px] font-black px-2 py-0.5 rounded tracking-wide mt-1 uppercase ${
                    item.badgeType === 'orange' ? 'bg-brand-orange text-white' :
                    item.badgeType === 'yellow' ? 'bg-brand-yellow text-brand-purple' :
                    'bg-brand-purpleMuted text-brand-yellow'
                  }`}>
                    {item.badge}
                  </span>
                )}

                <p className="text-xs text-brand-cream/70 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <button 
                onClick={() => addToCart(item)}
                className="mt-4 w-full bg-brand-purpleMuted hover:bg-brand-yellow hover:text-brand-purple text-brand-cream text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 active:scale-95"
              >
                <span>+ Agregar al Pedido</span>
              </button>
            </article>
          ))}
        </div>

        {/* No Results Message */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-brand-purpleCard rounded-3xl border border-brand-purpleMuted mt-8">
            <span className="text-4xl">🐶🍟</span>
            <h4 className="font-street text-2xl text-white mt-3">No encontramos ese plato</h4>
            <p className="text-sm text-brand-graySub max-w-md mx-auto mt-1">
              Prueba buscando con otra palabra como "broaster", "alitas", "wrap" o consúltale directamente a Hércules.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('toda'); }}
              className="mt-5 inline-flex items-center gap-2 bg-brand-yellow text-brand-purple px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider"
            >
              Ver toda la carta →
            </button>
          </div>
        )}

        {/* Quick WhatsApp CTA Bar */}
        <div className="mt-12 bg-brand-yellow text-brand-purple p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div>
            <h4 className="font-street text-2xl uppercase">¿Quieres hacer tu pedido al instante?</h4>
            <p className="text-xs sm:text-sm font-bold text-brand-purple/80">Precios en USD. Los pedidos para CDMX se habilitarán próximamente.</p>
          </div>
          <a 
            href={businessInfo.social.digitalMenu || '#contacto'} 
            target={businessInfo.social.digitalMenu ? "_blank" : undefined}
            rel={businessInfo.social.digitalMenu ? "noopener noreferrer" : undefined}
            className="w-full sm:w-auto bg-brand-purple hover:bg-brand-purpleDeep text-brand-yellow font-street text-lg px-7 py-3 rounded-xl uppercase tracking-wider text-center transition shadow-md"
          >
            {businessInfo.social.digitalMenu ? 'Ver Carta Digital & Pedir →' : 'Ver información de contacto →'}
          </a>
        </div>
      </div>
    </section>
  );
}
