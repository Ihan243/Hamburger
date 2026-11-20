import { foodImage, foodImageSrcSet } from '../utils/imageAssets.js';

import React from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
const points = [
 { title: 'PREPARACIÓN AL MOMENTO', body: 'Cada porción entra a la freidora y a la plancha al instante para llegar crujiente y caliente directamente a tu mesa.' },
 { title: 'PORCIONES GENEROSAS', body: 'Platos contundentes con abundante papa, cortes parrilleros y trozos crocantes pensados para compartir.' },
 { title: 'INGREDIENTES SELECCIONADOS', body: 'Papas doradas, embutidos parrilleros ahumados y pollo broaster marinado con receta de la casa.' },
 { title: 'VARIEDAD DE SALSAS Y CREMAS', body: 'Cremas caseras y salsas como chimichurri, agridulce y picante para acompañar cada pedido.' }
];
export default function WhyDifferentSection() {
 const { t } = useLanguage();
 return <section id="diferencia" className="ref-difference" aria-labelledby="ref-difference-title">
  <div className="ref-difference-inner">
   <h2 className="ref-section-title" id="ref-difference-title">{t('¿POR QUÉ SOMOS DIFERENTES?')}</h2>
   <p className="ref-difference-subtitle">{t('Calidad real, sin atajos y con sabor que se nota en cada bocado.')}</p>
   <div className="ref-difference-grid">
    <div className="ref-difference-points left">{points.slice(0,2).map(p => <div className="ref-difference-point" key={p.title}>
     <h3>{t(p.title)}<span aria-hidden="true"> ↗</span></h3><p>{t(p.body)}</p>
    </div>)}</div>
    <figure className="ref-difference-photo">
     <img src={foodImage} alt={t('Papas crujientes y salsas de la casa')} loading="lazy" decoding="async" width="480" height="640"/>
    </figure>
    <div className="ref-difference-points right">{points.slice(2).map(p => <div className="ref-difference-point" key={p.title}>
     <h3><span aria-hidden="true">↖ </span>{t(p.title)}</h3><p>{t(p.body)}</p>
    </div>)}</div>
   </div>
   <a href="#carta" className="ref-button-light">{t('Explora la Carta')}</a>
  </div>
 </section>;
}
