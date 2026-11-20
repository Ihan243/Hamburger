import { foodImage, foodImageSrcSet } from '../utils/imageAssets.js';
import React from 'react';
import { businessInfo } from '../data/businessInfo';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function DeliveryCtaSection() {
  const { t } = useLanguage();
  const { openCatalog } = useCart();
  return (
    <section className="closing-section" id="delivery" aria-labelledby="closing-heading">
      <img className="closing-lazy-photo" src={foodImage} srcSet={foodImageSrcSet}
        sizes="100vw" alt="" loading="lazy" decoding="async" width="960" height="640"/>
      <div className="closing-overlay" />
      <div className="closing-content">
        <div className="closing-lead">
          <span className="spec-kicker">{t('CIUDAD DE MÉXICO · STREET FOOD')}</span>
          <h2 id="closing-heading" className="ref-section-title">
            {t('PIDE EL')}<br />{t('AUTÉNTICO')}<br />{t('SABOR')}<br /><span>{t('CALLEJERO')}</span>
          </h2>
          <button type="button" className="closing-order-btn" onClick={openCatalog}>
            {t('Haz tu pedido aquí ')}<span aria-hidden="true">→</span>
          </button>
          <p>{t('Arma tu carrito con precios de referencia en USD.')}</p>
          {businessInfo.whatsappUrl
            ? <a className="closing-whatsapp" href={businessInfo.whatsappUrl}
                target="_blank" rel="noopener noreferrer">{t('Escríbenos por WhatsApp ↗')}</a>
            : <span className="closing-unavailable">{t('Pedidos por WhatsApp próximamente')}</span>}
        </div>
        <div className="closing-contact" id="contacto">
          <div className="closing-contact-title">
            <span className="spec-kicker">{t('SIEMPRE CERCA DEL SABOR')}</span>
            <h3>{t('HABLEMOS')}</h3>
          </div>
          <div className="closing-contact-grid">
            <div><span aria-hidden="true">📍</span><h4>{t('Dirección')}</h4>
              <p>{t(businessInfo.address)}</p><small>{t(businessInfo.locationNote)}</small></div>
            <div><span aria-hidden="true">🕒</span><h4>{t('Horarios')}</h4>
              <p>{t(businessInfo.schedule)}</p></div>
            <div><span aria-hidden="true">☎</span><h4>{t('Teléfono y WhatsApp')}</h4>
              {businessInfo.phone
                ? <a href={'tel:' + businessInfo.phone.replace(/\s/g, '')}>{businessInfo.phone}</a>
                : <p>{t('Número por confirmar')}</p>}</div>
            <div><span aria-hidden="true">✉</span><h4>{t('Correo electrónico')}</h4>
              {businessInfo.email
                ? <a href={'mailto:' + businessInfo.email}>{businessInfo.email}</a>
                : <p>{t('Contacto por confirmar')}</p>}</div>
          </div>
        </div>
      </div>
      <div className="closing-bottom">
        <span>{t('LA PATATA · PAPAS CON ACTITUD')}</span>
        <a href="#inicio">{t('VOLVER ARRIBA ↑')}</a>
      </div>
    </section>
  );
}
