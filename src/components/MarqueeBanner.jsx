import React from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';

const rowOne = [
  'PAPAS CON ACTITUD', '🍟', 'PAPAS CON ACTITUD', '🥗',
  'SABOR CALLEJERO', '✨'
];
const rowTwo = [
  'ABIERTO AL SABOR', '🌙', 'MÁS QUE SALCHIPAPAS', '🍟',
  'COMBINACIONES ÚNICAS', '🔥'
];

function MovingLine({ items, reverse = false }) {
  const { t } = useLanguage();
  return (
    <div className={'reference-giant-line' + (reverse ? ' reference-giant-line-reverse' : '')}
      aria-label={items.filter(v => v.length > 3).map(t).join(' · ')}>
      <div className="reference-giant-scrub"><div className="reference-giant-track">
        {[0, 1].map(copy => (
          <div className="reference-giant-group" key={copy} aria-hidden={copy === 1}>
            {items.map((item, i) => (
              <span key={i} className={item.length <= 3 ? 'reference-giant-emoji' : ''}>
                {t(item)}
              </span>
            ))}
          </div>
        ))}
      </div></div>
    </div>
  );
}

export default function MarqueeBanner() {
  return (
    <section className="reference-big-marquee" aria-label="Papas con actitud y sabor callejero">
      <MovingLine items={rowOne} />
      <MovingLine items={rowTwo} reverse />
    </section>
  );
}
