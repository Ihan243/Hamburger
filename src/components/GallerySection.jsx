import { foodImage, foodImageSrcSet, mascotImage } from '../utils/imageAssets.js';
import React from 'react';
import { businessInfo } from '../data/businessInfo';
import useDraggableMarquee from '../hooks/useDraggableMarquee';

const dish = foodImage;
const mascot = mascotImage;
const cards = [
  { title: 'Papas con actitud', image: dish, style: 'zoom' },
  { title: 'Salchi Fest', image: dish, style: 'warm' },
  { title: 'El guardián del sabor', image: mascot, style: 'mascot' },
  { title: 'Preparación al momento', image: dish, style: 'wide' },
  { title: 'Cremas de la casa', image: dish, style: 'cool' },
  { title: 'Sabor callejero', image: dish, style: 'angled' }
];
export default function GallerySection() {
  const slider = useDraggableMarquee(35);
  return <section id="galeria" className="gallery-loop-section" aria-labelledby="gallery-heading">
    <div className="gallery-wave" aria-hidden="true"/>
    <div className="gallery-loop-heading">
      <span className="spec-kicker">LA PATATA · STREET FOOD</span>
      <h2 id="gallery-heading" className="ref-section-title">LA PATATA EN ACCIÓN</h2>
      <p>Arrastra las imágenes con el cursor o desliza con el dedo. Sin saltos ni cortes.</p>
      <button type="button" className="gallery-pause" onClick={slider.togglePaused}
        aria-pressed={slider.paused}>{slider.paused ? '▶ Reanudar galería' : 'Ⅱ Pausar galería'}</button>
    </div>
    <div className={'gallery-loop-window draggable-marquee' + (slider.dragging ? ' is-dragging' : '')}
      ref={slider.viewportRef} {...slider.bind}
      aria-label="Galería fotográfica continua, arrastrable con mouse o dedo">
      <div className="gallery-loop-track" ref={slider.trackRef}>
        {[0, 1].map(copy => <div className="gallery-loop-group" key={copy}
          ref={copy === 0 ? slider.groupRef : undefined}
          aria-hidden={copy === 0 ? undefined : true}>
          <article className="gallery-social-tile">
            <span aria-hidden="true">◎</span><h3>ÚNETE A LA<br/>COMUNIDAD</h3>
            <p>{businessInfo.social.instagramUser || 'CDMX · PRÓXIMAMENTE'}</p>
            <a href={businessInfo.social.instagram || '#contacto'}
              target={businessInfo.social.instagram ? '_blank' : undefined}
              rel={businessInfo.social.instagram ? 'noopener noreferrer' : undefined}
              tabIndex={copy === 0 ? undefined : -1}>
              {businessInfo.social.instagram ? 'Instagram ↗' : 'Conócenos ↗'}
            </a>
          </article>
          {cards.map((card, index) => <article className={'gallery-image-tile gallery-' + card.style}
            key={copy + '-' + index}>
            <img src={card.image} srcSet={card.image === foodImage ? foodImageSrcSet : undefined}
              sizes="(max-width: 768px) 190px, 250px" alt={copy === 0 ? card.title : ''}
              width="250" height="325" loading="lazy" decoding="async" draggable={false}/>
            <p>{card.title}</p>
          </article>)}
        </div>)}
      </div>
    </div>
    <div className="gallery-loop-bottom">
      <span>✦ PRODUCTOS PREPARADOS AL MOMENTO ✦</span>
      <a href="#delivery">PEDIDOS Y CONTACTO ↗</a>
    </div>
  </section>;
}
