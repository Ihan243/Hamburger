import React from 'react';

export default function MarqueeBanner({ variant = 'yellow' }) {
  if (variant === 'purple') {
    return (
      <div className="bg-brand-purpleCard text-brand-yellow font-street text-lg sm:text-xl py-2.5 overflow-hidden whitespace-nowrap border-y border-brand-purpleMuted relative z-20" data-purpose="ticker-strip-accent">
        <div className="inline-flex animate-marquee-reverse gap-8">
          <span>⚡ MÁS QUE SALCHIPAPAS</span>
          <span>•</span>
          <span>COMBINACIONES ÚNICAS</span>
          <span>•</span>
          <span>PRESENTACIONES CREATIVAS</span>
          <span>•</span>
          <span>SABOR CALLEJERO EN CDMX</span>
          <span>•</span>
          <span>STREET FOOD CON ACTITUD</span>
          <span>•</span>
          <span>SALSAS ARTESANALES ILIMITADAS</span>
          <span>⚡</span>
          <span>MÁS QUE SALCHIPAPAS</span>
          <span>•</span>
          <span>COMBINACIONES ÚNICAS</span>
          <span>•</span>
          <span>PRESENTACIONES CREATIVAS</span>
          <span>•</span>
          <span>SABOR CALLEJERO EN CDMX</span>
          <span>•</span>
          <span>STREET FOOD CON ACTITUD</span>
          <span>•</span>
          <span>SALSAS ARTESANALES ILIMITADAS</span>
          <span>⚡</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-yellow text-brand-purpleDeep font-street text-xl sm:text-2xl py-3 overflow-hidden whitespace-nowrap border-y-2 border-brand-purple relative z-20" data-purpose="ticker-strip">
      <div className="inline-flex animate-marquee-slow gap-8">
        <span>★ PAPAS CON ACTITUD</span>
        <span>•</span>
        <span>LAS VERDADERAS PROTAGONISTAS</span>
        <span>•</span>
        <span>STREET FOOD CDMX</span>
        <span>•</span>
        <span>FRITURA AL MINUTO</span>
        <span>•</span>
        <span>SABOR CALLEJERO 100% ARTESANAL</span>
        <span>•</span>
        <span>CREMAS CASERAS DE LA CASA</span>
        <span>★</span>
        <span>PAPAS CON ACTITUD</span>
        <span>•</span>
        <span>LAS VERDADERAS PROTAGONISTAS</span>
        <span>•</span>
        <span>STREET FOOD CDMX</span>
        <span>•</span>
        <span>FRITURA AL MINUTO</span>
        <span>•</span>
        <span>SABOR CALLEJERO 100% ARTESANAL</span>
        <span>•</span>
        <span>CREMAS CASERAS DE LA CASA</span>
        <span>★</span>
      </div>
    </div>
  );
}
