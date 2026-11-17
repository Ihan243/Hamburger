import React from 'react';
import { businessInfo } from '../data/businessInfo';

export default function GallerySection() {
  return (
    <section className="py-20 lg:py-28 bg-brand-purpleDeep border-t border-brand-purpleMuted/50" id="galeria">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-street text-5xl sm:text-7xl text-white tracking-wide uppercase">
            LA PATATA <span className="text-brand-yellow">EN ACCIÓN</span>
          </h2>
          <p className="mt-2 text-brand-graySub text-sm sm:text-base">
            Descubre nuestra propuesta de street food en Ciudad de México. Muy pronto compartiremos novedades en redes.
          </p>
        </div>

        {/* Social & Community Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {/* Interactive Community Instagram Card */}
          <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-500 text-brand-purpleDeep rounded-3xl p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 text-white/10 text-9xl font-black select-none pointer-events-none">@</div>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-6">
                <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </div>
              <h3 className="font-street text-2xl uppercase tracking-wider text-brand-purpleDeep">
                ÚNETE A LA COMUNIDAD
              </h3>
              <p className="font-street text-xl text-white tracking-widest mt-1">{businessInfo.social.instagramUser || "CDMX · Próximamente"}</p>
              <p className="text-xs font-semibold text-brand-purpleDeep/80 mt-2">
                Mantente atento a nuestras próximas novedades, menú y lanzamientos.
              </p>
            </div>
            <a 
              href={businessInfo.social.instagram || '#contacto'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-6 bg-brand-purple hover:bg-brand-purpleDeep text-brand-yellow font-black text-xs uppercase tracking-wider py-3 px-4 rounded-xl text-center shadow-lg transition"
            >
              {businessInfo.social.instagram ? 'Seguir en Instagram →' : 'Próximamente en redes →'}
            </a>
          </div>

          {/* Gallery Card 2 */}
          <div className="relative group rounded-3xl overflow-hidden border border-brand-purpleMuted/80 shadow-xl min-h-[300px]">
            <img 
              src={`${import.meta.env.BASE_URL}images/salchipapa-dish.png`} 
              alt="Papas doradas al estilo La Patata servidas al momento" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-purpleDeep via-transparent to-transparent opacity-80"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-black uppercase text-brand-yellow tracking-widest bg-brand-purple/80 px-2 py-0.5 rounded">
                Ciudad de México
              </span>
              <p className="text-sm font-bold text-white mt-1">Sabor callejero auténtico</p>
            </div>
          </div>

          {/* Gallery Card 3 (Mascot Hércules) */}
          <div className="relative group rounded-3xl overflow-hidden border border-brand-purpleMuted/80 shadow-xl min-h-[300px] bg-brand-purpleCard flex items-center justify-center p-3">
            <img 
              src={`${import.meta.env.BASE_URL}images/hercules-mascot.png`} 
              alt="Hércules la mascota de La Patata invitando a probar las papas" 
              className="w-full h-full object-contain rounded-2xl group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-brand-purple/90 backdrop-blur-sm p-3 rounded-xl border border-brand-yellow/30">
              <p className="text-xs font-bold text-brand-yellow font-street">HÉRCULES</p>
              <p className="text-[11px] text-brand-cream/80">"Las papas aquí son las verdaderas protagonistas"</p>
            </div>
          </div>

          {/* Gallery Card 4 */}
          <div className="relative group rounded-3xl overflow-hidden border border-brand-purpleMuted/80 shadow-xl min-h-[300px]">
            <img 
              src={`${import.meta.env.BASE_URL}images/salchipapa-dish.png`} 
              alt="Sabor callejero en Ciudad de México" 
              className="w-full h-full object-cover filter contrast-125 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-purpleDeep via-transparent to-transparent opacity-80"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-black uppercase text-brand-yellow tracking-widest bg-brand-purple/80 px-2 py-0.5 rounded">
                #PapasConActitud
              </span>
              <p className="text-sm font-bold text-white mt-1">Directo de la sartén a tu boca</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
