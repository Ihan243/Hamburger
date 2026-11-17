import React from 'react';
import { businessInfo } from '../data/businessInfo';

export default function ContactSection() {
  return (
    <section className="py-20 lg:py-28 bg-brand-purpleCard border-t border-brand-purpleMuted/60" id="contacto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-yellow font-black text-xs uppercase tracking-widest bg-brand-purpleMuted px-4 py-1.5 rounded-full inline-block mb-3">
            Ubícanos
          </span>
          <h2 className="font-street text-5xl sm:text-6xl text-white tracking-wide uppercase">
            HABLEMOS
          </h2>
          <p className="text-brand-graySub text-sm sm:text-base mt-2">
            Visítanos en nuestro local o contáctate directamente para eventos y pedidos grandes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Info Card 1: Dirección */}
          <div className="bg-brand-purple p-6 rounded-3xl border border-brand-purpleMuted/80 text-center flex flex-col items-center hover:border-brand-yellow/50 transition-all">
            <span className="text-3xl mb-3">📍</span>
            <h3 className="font-street text-lg text-white uppercase tracking-wider">Dirección</h3>
            <p className="text-xs text-brand-cream/80 mt-2 leading-relaxed">
              {businessInfo.address}
            </p>
            <a 
              href={businessInfo.mapsUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-4 text-xs font-bold text-brand-yellow hover:underline"
            >
              Ver en Google Maps →
            </a>
          </div>

          {/* Info Card 2: Horarios */}
          <div className="bg-brand-purple p-6 rounded-3xl border border-brand-purpleMuted/80 text-center flex flex-col items-center hover:border-brand-yellow/50 transition-all">
            <span className="text-3xl mb-3">🕒</span>
            <h3 className="font-street text-lg text-white uppercase tracking-wider">Horarios</h3>
            <p className="text-xs text-brand-cream/80 mt-2 leading-relaxed">
              Miércoles a Lunes:<br />
              <strong className="text-brand-yellow">6:00 PM – 1:00 AM</strong><br />
              <span className="text-brand-orange text-[11px]">(Martes cerrado)</span>
            </p>
          </div>

          {/* Info Card 3: Teléfono y WhatsApp */}
          <div className="bg-brand-purple p-6 rounded-3xl border border-brand-purpleMuted/80 text-center flex flex-col items-center hover:border-brand-yellow/50 transition-all">
            <span className="text-3xl mb-3">📞</span>
            <h3 className="font-street text-lg text-white uppercase tracking-wider">Teléfono &amp; WhatsApp</h3>
            <p className="text-xs text-brand-cream/80 mt-2 leading-relaxed">
              Línea oficial de pedidos:
            </p>
            <a 
              href={`tel:${businessInfo.phone.replace(/\s+/g, '')}`} 
              className="mt-1 text-sm font-bold text-brand-yellow hover:underline block font-mono"
            >
              {businessInfo.phone}
            </a>
            <a 
              href={businessInfo.whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-3 text-[11px] font-bold text-emerald-400 hover:underline"
            >
              Chatear por WhatsApp →
            </a>
          </div>

          {/* Info Card 4: Correo */}
          <div className="bg-brand-purple p-6 rounded-3xl border border-brand-purpleMuted/80 text-center flex flex-col items-center hover:border-brand-yellow/50 transition-all">
            <span className="text-3xl mb-3">✉️</span>
            <h3 className="font-street text-lg text-white uppercase tracking-wider">Correo Electrónico</h3>
            <p className="text-xs text-brand-cream/80 mt-2 leading-relaxed">
              Consultas, alianzas y proveedores:
            </p>
            <a 
              href={`mailto:${businessInfo.email}`} 
              className="mt-2 text-xs font-bold text-brand-yellow hover:underline"
            >
              {businessInfo.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
