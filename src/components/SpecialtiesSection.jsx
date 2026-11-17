import React from 'react';
import { useCart } from '../context/CartContext';
import { specialties } from '../data/menuData';

export default function SpecialtiesSection() {
  const { addToCart } = useCart();

  return (
    <section className="py-20 lg:py-28 bg-brand-purple relative border-b border-brand-purpleMuted/50 overflow-hidden" id="especialidades">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-yellow font-black text-xs uppercase tracking-widest bg-brand-purpleMuted px-4 py-1.5 rounded-full inline-block mb-3">
            Selección Magistral
          </span>
          <h2 className="font-street text-5xl sm:text-7xl text-white tracking-wide uppercase">
            ESPECIALIDADES <br /><span className="text-brand-yellow">DE LA CASA</span>
          </h2>
          <p className="mt-3 text-brand-graySub text-sm sm:text-base">
            Combinaciones callejeras para disfrutar en Ciudad de México. Diseñadas para devorar.
          </p>
        </div>

        {/* 3 Featured Specialties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 items-stretch">
          {specialties.map((item) => {
            const isFeatured = item.featured;
            return (
              <div 
                key={item.id}
                className={`bg-brand-purpleCard rounded-3xl p-6 transition-all duration-300 group flex flex-col items-center text-center shadow-xl relative ${
                  isFeatured 
                    ? 'border-2 border-brand-yellow md:-translate-y-4 shadow-2xl' 
                    : 'border border-brand-purpleMuted hover:border-brand-yellow'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-4 bg-brand-yellow text-brand-purple font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                    {item.badge}
                  </div>
                )}

                <div className={`relative rounded-full p-2 mb-6 transition-transform duration-500 group-hover:scale-105 ${
                  isFeatured 
                    ? 'w-56 h-56 sm:w-64 sm:h-64 bg-gradient-to-tr from-brand-yellow via-brand-orange to-brand-yellowLight' 
                    : 'w-52 h-52 sm:w-60 sm:h-60 bg-gradient-to-b from-brand-yellow/60 to-transparent'
                }`}>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover rounded-full shadow-lg"
                  />
                  <span className="absolute bottom-2 right-2 bg-brand-yellow text-brand-purple font-black text-xs sm:text-sm px-3.5 py-1.5 rounded-full shadow-md font-street">
                    US$ {item.price.toFixed(2)}
                  </span>
                </div>

                <h3 className={`font-street text-2xl sm:text-3xl tracking-wider transition-colors ${
                  isFeatured ? 'text-brand-yellow' : 'text-white group-hover:text-brand-yellow'
                }`}>
                  {item.title}
                </h3>

                <p className="text-brand-cream/70 text-sm mt-2 flex-grow">
                  {item.desc}
                </p>

                <button 
                  onClick={() => addToCart(item)}
                  className={`mt-5 w-full font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 ${
                    isFeatured 
                      ? 'bg-brand-yellow hover:bg-brand-yellowDark text-brand-purple font-black shadow-lg' 
                      : 'bg-brand-purpleMuted hover:bg-brand-yellow hover:text-brand-purple text-brand-cream'
                  }`}
                >
                  <span>Agregar al Pedido</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
