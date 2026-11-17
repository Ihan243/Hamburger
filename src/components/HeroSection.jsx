import React from 'react';
import { useCart } from '../context/CartContext';
import { specialties } from '../data/menuData';

export default function HeroSection() {
  const { addToCart } = useCart();

  const heroDish = specialties.find(item => item.id === 'salchi-fest');
  const handleAddHeroDish = () => addToCart(heroDish);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-24 bg-gradient-to-b from-brand-purple via-brand-purpleDeep to-brand-purpleDeep" data-purpose="hero-section">
      {/* Background Ambient Glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-brand-yellow/15 blur-[140px] pointer-events-none rounded-full"></div>
      <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-brand-orange/15 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Stickers / Tags row */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 bg-brand-yellow text-brand-purple text-xs font-black px-3.5 py-1 rounded-full badge-tilt-left uppercase tracking-wider shadow-lg">
            🍟 ¡Papas!
          </span>
          <span className="inline-flex items-center gap-1.5 bg-brand-orange text-white text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-lg">
            🔥 Crujiente
          </span>
          <span className="inline-flex items-center gap-1.5 bg-brand-purpleCard border border-brand-yellow text-brand-yellow text-xs font-black px-3.5 py-1 rounded-full badge-tilt-right uppercase tracking-wider shadow-lg">
            ✨ ¡Sabor!
          </span>
        </div>

        {/* Massive Street Food Title */}
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="font-street text-6xl sm:text-8xl md:text-9xl lg:text-[135px] leading-none tracking-tight uppercase select-none text-white drop-shadow-2xl">
            ENVUELTO <br />
            <span className="text-brand-yellow inline-block relative">
              EN SABOR
              {/* Flame SVG Accent */}
              <svg className="absolute -top-2 -right-6 sm:-right-10 w-8 h-8 sm:w-12 sm:h-12 text-brand-orange animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2c-.6 0-1 .4-1 1 0 2.2-1.3 4-3 5-1.7 1-3 3-3 6 0 4.4 3.6 8 8 8s8-3.6 8-8c0-3.3-1.6-5.8-3.5-7.5-.4-.4-1.1-.3-1.4.2-.3.5-.2 1.1.2 1.5 1.5 1.4 2.7 3.3 2.7 5.8 0 3.3-2.7 6-6 6s-6-2.7-6-6c0-2.3.9-3.7 2.4-4.6 2.3-1.4 3.6-3.8 3.6-6.4 0-.6-.4-1-1-1z"></path>
              </svg>
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-lg sm:text-2xl text-brand-cream/90 font-medium max-w-2xl mx-auto">
            Convertimos las papas en las <strong className="text-brand-yellow font-extrabold underline decoration-brand-yellow decoration-4 underline-offset-4">verdaderas protagonistas</strong>.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
            <a 
              href="#carta" 
              className="bg-brand-yellow hover:bg-brand-yellowDark text-brand-purple font-street text-xl tracking-wider px-8 py-4 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              Ver Menú 🍟
            </a>
            <a 
              href="#contacto" 
              className="bg-brand-purpleCard hover:bg-brand-purpleMuted border-2 border-brand-cream/20 text-brand-cream font-street text-xl tracking-wider px-8 py-4 rounded-2xl transition-all hover:border-brand-yellow hover:scale-105 active:scale-95"
            >
              Ubícanos 📍
            </a>
          </div>
        </div>

        {/* Hero Featured Dish Showcase */}
        <div className="mt-12 sm:mt-16 max-w-2xl mx-auto relative flex justify-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-brand-yellow/20 rounded-full blur-2xl animate-pulse-glow"></div>
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[440px] md:h-[440px] rounded-full p-2.5 bg-gradient-to-tr from-brand-yellow via-brand-orange to-brand-purpleMuted shadow-2xl transition-transform duration-700 hover:rotate-3">
              <img 
                src={`${import.meta.env.BASE_URL}images/salchipapa-dish.png`} 
                alt="Plato estrella Salchi Fest con papas nativas doradas, chorizo parrillero y queso fundido"
                className="w-full h-full object-cover rounded-full shadow-inner border-4 border-brand-purpleDeep"
                loading="eager"
              />
            </div>

            {/* Floating Interactive Badge on Hero Image */}
            <div className="absolute -bottom-4 right-4 sm:right-8 bg-brand-purple border-2 border-brand-yellow rounded-2xl p-3 sm:p-4 shadow-2xl flex items-center gap-3 backdrop-blur-md badge-tilt-right">
              <div className="bg-brand-yellow text-brand-purple font-black w-10 h-10 rounded-xl flex items-center justify-center text-lg">
                ★
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-brand-graySub uppercase tracking-wider">Favorito indiscutible</p>
                <h4 className="font-street text-lg sm:text-xl text-brand-yellow leading-none">SALCHI FEST XL</h4>
                <p className="text-xs font-extrabold text-white mt-0.5">US$ {heroDish.price.toFixed(2)}</p>
              </div>
              <button 
                onClick={handleAddHeroDish}
                title="Añadir al pedido"
                className="ml-2 bg-brand-yellow text-brand-purple hover:bg-brand-yellowDark p-2 rounded-xl transition-all active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
