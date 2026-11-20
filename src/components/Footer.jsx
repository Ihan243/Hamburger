import React from 'react';
import { businessInfo } from '../data/businessInfo';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-purpleDeep border-t border-brand-purpleMuted text-brand-graySub pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Logo SVG */}
          <svg className="h-12 w-auto" viewBox="0 0 320 70" fill="none" xmlns="http://www.w3.org/2000/svg">
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

          <p className="max-w-md text-xs sm:text-sm text-brand-cream/70">
            <strong className="text-brand-yellow">{t('Papas con Actitud')}</strong> {t('· Convertimos las papas en protagonistas con combinaciones creativas y opciones únicas en Ciudad de México.')}
          </p>

          {/* Navigation Anchors */}
          <div className="flex flex-wrap justify-center gap-6 text-xs font-bold text-brand-cream/80">
            <a href="#" className="hover:text-brand-yellow transition">{t('Inicio')}</a>
            <a href="#nosotros" className="hover:text-brand-yellow transition">{t('Nosotros')}</a>
            <a href="#especialidades" className="hover:text-brand-yellow transition">{t('Especialidades')}</a>
            <a href="#carta" className="hover:text-brand-yellow transition">{t('Menú')}</a>
            <a href="#diferencia" className="hover:text-brand-yellow transition">{t('Diferencia')}</a>
            <a href="#galeria" className="hover:text-brand-yellow transition">{t('Galería')}</a>
            <a href="#contacto" className="hover:text-brand-yellow transition">{t('Contacto')}</a>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-black uppercase tracking-wider">
            {[
              ['Instagram', businessInfo.social.instagram],
              ['TikTok', businessInfo.social.tiktok],
              ['Facebook', businessInfo.social.facebook],
              ['WhatsApp', businessInfo.whatsappUrl],
            ].filter(([, href]) => Boolean(href)).map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="bg-brand-purpleMuted hover:bg-brand-yellow hover:text-brand-purple text-brand-cream px-3 py-1.5 rounded-lg transition">
                {label}
              </a>
            ))}
          </div>
          {/* Legal Disclaimer */}
          <div className="pt-6 border-t border-brand-purpleMuted/40 text-[11px] text-brand-graySub space-y-1">
            <p>© {currentYear} LA PATATA STREET FOOD. {t('Todos los derechos reservados.')}</p>
            <p className="text-brand-yellow/70">{t('Ciudad de México, México • Dirección y datos de contacto por confirmar.')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
