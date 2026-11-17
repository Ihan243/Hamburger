import React from 'react';
import { businessInfo } from '../data/businessInfo';
import { menuItems } from '../data/menuData';

const foodPhoto = `${import.meta.env.BASE_URL}images/salchipapa-dish.png`;
const mascotPhoto = `${import.meta.env.BASE_URL}images/hercules-mascot.png`;
const gallery = [
  { id: 'gallery-1', title: 'Papas con actitud', image: foodPhoto, style: 'zoom' },
  { id: 'gallery-2', title: 'Salchi Fest', image: foodPhoto, style: 'warm' },
  { id: 'gallery-3', title: 'El guardián del sabor', image: mascotPhoto, style: 'mascot' },
  { id: 'gallery-4', title: 'Preparación al momento', image: foodPhoto, style: 'wide' },
  { id: 'gallery-5', title: 'Cremas de la casa', image: foodPhoto, style: 'cool' },
  { id: 'gallery-6', title: 'Sabor callejero', image: foodPhoto, style: 'angled' },
];

export default function GallerySection() {
  return (
    <section id="galeria" className="gallery-loop-section" aria-labelledby="gallery-heading">
      <div className="gallery-wave" aria-hidden="true" />
      <div className="gallery-loop-heading">
        <span className="spec-kicker">LA PATATA · STREET FOOD</span>
        <h2 id="gallery-heading" className="ref-section-title">LA PATATA EN ACCIÓN</h2>
        <p>Descubre nuestra carta y el sabor que nos inspira. Próximamente en Ciudad de México.</p>
      </div>
      <div className="gallery-loop-window" aria-label="Galería de imágenes en movimiento">
        <div className="gallery-loop-track">
          {[0, 1].map(copy => (
            <div className="gallery-loop-group" key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
              <article className="gallery-social-tile">
                <span aria-hidden="true">◎</span>
                <h3>ÚNETE A LA<br />COMUNIDAD</h3>
                <p>{businessInfo.social.instagramUser || 'CDMX · PRÓXIMAMENTE'}</p>
                {businessInfo.social.instagram
                  ? <a href={businessInfo.social.instagram} target="_blank" rel="noopener noreferrer"
                      tabIndex={copy === 1 ? -1 : undefined}>Seguir en Instagram →</a>
                  : <a href="#contacto" tabIndex={copy === 1 ? -1 : undefined}>Conócenos →</a>}
              </article>
              {gallery.map((item) => (
                <article className={'gallery-image-tile gallery-' + item.style} key={item.id}>
                  <img src={item.image} alt={copy === 0 ? item.title : ''}
                    loading="lazy" />
                  <p>{item.title}</p>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="gallery-loop-bottom">
        <span>✦ PRODUCTOS PREPARADOS AL MOMENTO ✦</span>
        <a href="#delivery">PEDIDOS Y CONTACTO ↗</a>
      </div>
    </section>
  );
}
