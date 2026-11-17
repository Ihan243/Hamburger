import React from 'react';
import { businessInfo } from '../data/businessInfo';

export default function ContactSection() {
  return (
    <section className="py-20 lg:py-28 bg-brand-purpleCard border-t border-brand-purpleMuted/60" id="contacto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-brand-yellow font-black text-xs uppercase tracking-widest bg-brand-purpleMuted px-4 py-1.5 rounded-full inline-block mb-3">Ubícanos</span>
          <h2 className="font-street text-5xl sm:text-6xl text-white tracking-wide uppercase">HABLEMOS</h2>
          <p className="text-brand-graySub text-sm sm:text-base mt-2">Estamos preparando los detalles de nuestra presencia en Ciudad de México.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-brand-purple p-7 rounded-3xl border border-brand-purpleMuted text-center flex flex-col items-center">
            <span className="text-3xl mb-3">📍</span>
            <h3 className="font-street text-lg text-white uppercase tracking-wider">Ubicación</h3>
            <p className="text-sm text-brand-cream/90 mt-3">{businessInfo.address}</p>
            <p className="text-xs text-brand-yellow mt-2">{businessInfo.locationNote}</p>
          </div>
          <div className="bg-brand-purple p-7 rounded-3xl border border-brand-purpleMuted text-center flex flex-col items-center">
            <span className="text-3xl mb-3">🕒</span>
            <h3 className="font-street text-lg text-white uppercase tracking-wider">Horario</h3>
            <p className="text-sm text-brand-cream/90 mt-3">{businessInfo.schedule}</p>
            <p className="text-xs text-brand-graySub mt-2">Publicaremos los horarios al confirmarlos.</p>
          </div>
          <div className="bg-brand-purple p-7 rounded-3xl border border-brand-purpleMuted text-center flex flex-col items-center">
            <span className="text-3xl mb-3">📞</span>
            <h3 className="font-street text-lg text-white uppercase tracking-wider">Pedidos y contacto</h3>
            {businessInfo.whatsappUrl ? (
              <a href={businessInfo.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-yellow font-bold mt-3 hover:underline">Escribir por WhatsApp →</a>
            ) : (
              <p className="text-sm text-brand-cream/90 mt-3">WhatsApp local próximamente</p>
            )}
            {businessInfo.email && (
              <a href={`mailto:${businessInfo.email}`} className="mt-2 text-xs text-brand-yellow">{businessInfo.email}</a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
