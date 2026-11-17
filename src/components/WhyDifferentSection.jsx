import React from 'react';

export default function WhyDifferentSection() {
  const pillars = [
    {
      num: '01',
      icon: '⏱️',
      title: 'PREPARACIÓN AL MOMENTO',
      desc: 'Cada porción entra a la freidora y a la plancha en el instante que pides para llegar crujiente y caliente directo a tu mesa.'
    },
    {
      num: '02',
      icon: '📦',
      title: 'PORCIONES GENEROSAS',
      desc: 'Platos contundentes bien taipá con abundante papa nativa, embutidos parrilleros y trozos crujientes pensados para saciar de verdad.'
    },
    {
      num: '03',
      icon: '🥔',
      title: 'INGREDIENTES SELECCIONADOS',
      desc: 'Papas con piel de textura dorada, embutidos parrilleros ahumados y pollo broaster marinado con receta secreta de la casa.'
    },
    {
      num: '04',
      icon: '🥣',
      title: 'VARIEDAD DE SALSAS Y CREMAS',
      desc: 'Cremas caseras y variedad de salsas como chimichurri parrillero, maracuyá agridulce y acevichada para acompañar cada pedido.'
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-brand-purple relative border-t border-brand-purpleMuted" id="diferencia">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-street text-5xl sm:text-7xl text-white tracking-wide uppercase">
            ¿POR QUÉ SOMOS <span className="text-brand-yellow">DIFERENTES?</span>
          </h2>
          <p className="mt-3 text-brand-graySub text-base sm:text-lg">
            Calidad real, sin atajos y con sabor que se nota en cada bocado.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <div 
              key={pillar.num}
              className="bg-brand-purpleCard border border-brand-purpleMuted/80 p-6 rounded-3xl relative hover:border-brand-yellow transition-all group"
            >
              <span className="font-street text-4xl text-brand-yellow/30 group-hover:text-brand-yellow/60 transition-colors absolute top-4 right-5">
                {pillar.num}
              </span>
              <div className="w-12 h-12 rounded-2xl bg-brand-yellow/10 flex items-center justify-center text-2xl text-brand-yellow mb-5">
                {pillar.icon}
              </div>
              <h3 className="font-street text-xl text-white uppercase tracking-wider">
                {pillar.title}
              </h3>
              <p className="text-xs text-brand-cream/70 mt-3 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-12 text-center">
          <a 
            href="#carta" 
            className="inline-flex items-center gap-2 bg-brand-yellow hover:bg-brand-yellowDark text-brand-purple font-street text-lg tracking-wider px-8 py-3.5 rounded-2xl shadow-xl transition-transform active:scale-95"
          >
            Explora la Carta Completa 🍟
          </a>
        </div>
      </div>
    </section>
  );
}
