import React from 'react';

export default function AboutSection() {
  return (
    <section className="py-20 lg:py-28 bg-brand-purpleDeep relative border-b border-brand-purpleMuted/40" id="nosotros">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Street Photography Collage */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-4 bg-brand-yellow/10 rounded-3xl blur-2xl"></div>
            <div className="relative grid grid-cols-12 gap-4">
              {/* Main Photo */}
              <div className="col-span-8 overflow-hidden rounded-3xl border-2 border-brand-yellow/30 shadow-2xl group">
                <img 
                  src={`${import.meta.env.BASE_URL}images/salchipapa-dish.png`} 
                  alt="Proceso de bañado de cremas artesanales sobre papas crujientes" 
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Secondary Mascot & Brand Card */}
              <div className="col-span-4 flex flex-col gap-4">
                <div className="bg-brand-purpleCard border border-brand-purpleMuted p-4 rounded-3xl flex-1 flex flex-col justify-center items-center text-center">
                  <img 
                    src={`${import.meta.env.BASE_URL}images/hercules-mascot.png`} 
                    alt="Mascota oficial Hércules" 
                    className="w-24 h-24 object-cover rounded-2xl border-2 border-brand-yellow shadow-md"
                  />
                  <span className="mt-2 text-xs font-bold text-brand-yellow font-street">HÉRCULES</span>
                  <span className="text-[10px] text-brand-graySub uppercase">Guardián del Sabor</span>
                </div>
                <div className="bg-brand-yellow text-brand-purple p-4 rounded-3xl text-center shadow-lg">
                  <p className="font-street text-3xl leading-none">100%</p>
                  <p className="text-[11px] font-black uppercase tracking-tight mt-1">Papas Nativas Crujientes</p>
                </div>
              </div>
            </div>

            {/* Attitude Ribbon Sticker */}
            <div className="absolute -bottom-5 left-6 bg-brand-orange text-white font-street text-sm tracking-wider px-5 py-2 rounded-xl shadow-xl badge-tilt-left">
              🔥 RECETA DE LA CASA
            </div>
          </div>

          {/* Right: Brand Philosophy Editorial Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 bg-brand-purpleMuted text-brand-yellow text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-brand-yellow/20">
              Papas con Actitud
            </div>
            <h2 className="font-street text-5xl sm:text-6xl lg:text-7xl text-white tracking-wide uppercase leading-tight">
              SOBRE <br /><span className="text-brand-yellow">NOSOTROS</span>
            </h2>
            <p className="text-brand-cream/80 text-base sm:text-lg leading-relaxed">
              En <strong className="text-brand-yellow font-bold">La Patata Street Food</strong> nos diferenciamos por convertir las papas en las <span className="underline decoration-brand-yellow font-semibold">verdaderas protagonistas</span>, ofreciendo una variedad de combinaciones únicas y presentaciones creativas.
            </p>
            <p className="text-brand-cream/80 text-base sm:text-lg leading-relaxed">
              Nuestra propuesta va mucho más allá de las salchipapas tradicionales: cada creación está pensada con identidad propia, fritura al minuto y cremas de la casa bajo nuestro sello distintivo: <strong className="text-white bg-brand-purpleMuted px-2 py-0.5 rounded font-bold">Papas con Actitud</strong>.
            </p>

            {/* Core Values Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-brand-purpleCard border border-brand-purpleMuted/80 p-3 rounded-2xl text-center">
                <span className="text-2xl">⚡</span>
                <p className="font-bold text-xs text-brand-yellow mt-1">Fritura al Minuto</p>
              </div>
              <div className="bg-brand-purpleCard border border-brand-purpleMuted/80 p-3 rounded-2xl text-center">
                <span className="text-2xl">🥣</span>
                <p className="font-bold text-xs text-brand-yellow mt-1">Cremas de la Casa</p>
              </div>
              <div className="bg-brand-purpleCard border border-brand-purpleMuted/80 p-3 rounded-2xl text-center col-span-2 sm:col-span-1">
                <span className="text-2xl">🔥</span>
                <p className="font-bold text-xs text-brand-yellow mt-1">Cortes Parrilleros</p>
              </div>
            </div>

            <div className="pt-4">
              <a 
                href="#diferencia" 
                className="inline-flex items-center gap-3 bg-brand-purpleCard hover:bg-brand-purpleMuted text-brand-yellow font-bold px-7 py-3.5 rounded-2xl border-2 border-brand-yellow/30 hover:border-brand-yellow transition-all"
              >
                <span>Conoce la Diferencia</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
