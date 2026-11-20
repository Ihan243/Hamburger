import React, { useEffect, useRef, useState } from 'react';
const herculesPhoto = `${import.meta.env.BASE_URL}images/hercules-dog-cutout.webp`;
import { businessInfo } from '../data/businessInfo';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../i18n/LanguageContext.jsx';

const promos = [
  { id: 'inicio', text: '¡Un antojito para hoy? ¡Pídeme aquí! 😋', link: '#carta', action: 'Ver menú' },
  { id: 'nosotros', text: '¿Conoces nuestras papas con actitud? 🍟', link: '#diferencia', action: 'Descúbrelas' },
  { id: 'especialidades', text: '¡Estas especialidades están irresistibles! ⭐', link: '#especialidades', action: 'Explorar' },
  { id: 'carta', text: 'Te ayudo a elegir tu antojito. 🐶', link: '#carta', action: 'Ver carta' },
  { id: 'galeria', text: '¡Mira el sabor en acción! 📸', link: '#galeria', action: 'Ver galería' },
  { id: 'delivery', text: '¿Ya tienes hambre? Arma tu pedido. 🍟', link: '#carta', action: 'Ver menú' }
];

const quickAction = id => {
  if (id === 'promos') return { href: '#carta', label: 'Ver combos en la carta' };
  if (id === 'top') return { href: '#especialidades', label: 'Ver especialidades' };
  if (id === 'horario') return { href: '#contacto', label: 'Información de contacto' };
  if (id === 'delivery') return { href: '#carta', label: 'Explorar la carta' };
  return { href: '#carta', label: 'Ver menú' };
};

export default function HerculesModal() {
  const { t } = useLanguage();
  const { openCart, openCatalog, totalItems } = useCart();
  const [isOpen, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [activePromo, setActivePromo] = useState(promos[0]);
  const [answers, setAnswers] = useState([]);
  const openerRef = useRef(null);
  const closeRef = useRef(null);
  const dialogRef = useRef(null);
  const messageEndRef = useRef(null);
  const repliesShownRef = useRef(0);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (!visible.length) return;
      const found = promos.find(item => item.id === visible[0].target.id);
      if (found) setActivePromo(found);
    }, { threshold: [0, 0.2, 0.4], rootMargin: '-15% 0px -48% 0px' });

    promos.forEach(({ id }) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previouslyFocused = document.activeElement;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });

    const onKey = event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusables = [...dialogRef.current.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )].filter(el => el.getClientRects().length);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = oldOverflow;
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected)
        previouslyFocused.focus({ preventScroll: true });
      else openerRef.current?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || answers.length <= repliesShownRef.current) return;
    repliesShownRef.current = answers.length;
    messageEndRef.current?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
  }, [answers, isOpen]);

  const chooseFaq = faq => {
    // Keep the automatic reply immediate and deterministic: no artificial chat delay.
    setAnswers(old => [...old, { id: old.length + 1, faq }]);
  };

  const leaveFor = action => {
    setOpen(false);
    if (action === 'cart') openCart();
    if (action === 'catalog') openCatalog();
  };

  return (
    <>
      <div className={'hercules-launcher' + (isOpen ? ' hercules-launcher-open' : '') + (activePromo.id === 'carta' ? ' hercules-on-menu' : '')} data-purpose="mascot-widget">
        {showBubble && !isOpen && (
          <div className={'hercules-speech' + (activePromo.id === 'inicio' ? ' hercules-on-hero' : '')} role="status">
            <span>{t(activePromo.text)}</span>
            <button className="hercules-speech-dismiss" type="button"
              onClick={() => setShowBubble(false)} aria-label={t('Ocultar mensaje de Hércules')}>×</button>
          </div>
        )}
        <button ref={openerRef} type="button"
          className={'hercules-mascot-trigger' + (activePromo.id === 'inicio' ? ' hercules-on-hero' : '')}
          onClick={() => setOpen(true)}
          aria-label={t('Abrir asistente Hércules para consultar la carta')}
          aria-haspopup="dialog" aria-expanded={isOpen}>
          <img src={herculesPhoto} width="180" height="210"
            decoding="async" alt={t('Hércules, el perrito guardián del sabor')} />
          <span className="hercules-trigger-label" aria-hidden="true">{t('¿Te ayudo?')}</span>
        </button>
      </div>

      {isOpen && (
        <div className="hercules-overlay" data-native-scroll>
          <div className="hercules-backdrop" onClick={() => setOpen(false)}
            aria-hidden="true" />
          <div className="hercules-scene-mascot" aria-hidden="true">
            <img src={herculesPhoto} alt="" width="420" height="490" decoding="async" />
          </div>
          <section className="hercules-dialog" role="dialog" aria-modal="true"
            aria-labelledby="hercules-heading" aria-describedby="hercules-subtitle"
            ref={dialogRef}>
            <header className="hercules-chat-header">
              <div className="hercules-chat-avatar">
                <img src={herculesPhoto} alt="" width="56" height="56" decoding="async" />
              </div>
              <div className="hercules-chat-heading">
                <h2 id="hercules-heading">HÉRCULES</h2>
                <p id="hercules-subtitle">
                  <span>{t('El perro guardián del sabor')}</span>
                  <span className="hercules-online"><i aria-hidden="true" /> {t('¡En línea!')}</span>
                </p>
              </div>
              <button type="button" className="hercules-chat-close"
                ref={closeRef} onClick={() => setOpen(false)} aria-label={t('Cerrar chat con Hércules')}>
                <span aria-hidden="true">×</span>
              </button>
            </header>

            <div className="hercules-chat-scroll" data-native-scroll>
              <div className="hercules-chat-intro">
                <p>{t('¡Hola! Soy ')}<em>Hércules</em> 🐶🍟{t(', el perro guardián del sabor en ')}<em>La Patata</em>.</p>
                <p>{t('¡Aquí nuestras papas son las verdaderas protagonistas! Estoy listo para ayudarte a elegir tu combinación ideal, recomendarte las mejores ')}<em>{t('Papas con Actitud')}</em>{t(' o resolver cualquier duda.')}</p>
                <p className="hercules-intro-hint">{t('Elige una pregunta y te respondo al instante:')}</p>
              </div>

              <div className="hercules-quick-questions" aria-label={t('Preguntas frecuentes')}>
                {businessInfo.mascot.faqs.map(faq => (
                  <button key={faq.id} className="hercules-question"
                    type="button" onClick={() => chooseFaq(faq)}>
                    <span className="hercules-question-icon" aria-hidden="true">{faq.icon}</span>
                    <span className="hercules-question-label">{t(faq.label)}</span>
                  </button>
                ))}
              </div>

              {answers.length > 0 && (
                <div className="hercules-conversation" role="log" aria-label={t('Respuestas de Hércules')} aria-live="polite">
                  {answers.map(({ id, faq }) => (
                    <div className="hercules-answer-pair" key={id}>
                      <div className="hercules-user-message">{t(faq.label)}</div>
                      <div className="hercules-bot-message">
                        <span className="hercules-bot-name">🐶 Hércules</span>
                        <p>{t(faq.answer)}</p>
                        <a href={quickAction(faq.id).href} onClick={event => {
                          if (quickAction(faq.id).href === '#carta') {
                            event.preventDefault(); leaveFor('catalog');
                          } else { leaveFor(); }
                        }}>
                          {t(quickAction(faq.id).label)} <span aria-hidden="true">↗</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div ref={messageEndRef} />
              <footer className="hercules-chat-footer">
              <p>{t('¿Ya sabes qué se te antoja?')}</p>
              <div className="hercules-chat-ctas">
                <button type="button" className="hercules-cta-primary"
                  onClick={() => leaveFor('catalog')}>{t('🍟 Ver carta digital')}</button>
                <button className="hercules-cta-secondary" type="button"
                  onClick={() => leaveFor('cart')}>
                  {t('Mi pedido')}{totalItems > 0 ? ' (' + totalItems + ')' : ''} ↗
                </button>
              </div>
              {!businessInfo.whatsappNumber && (
                <small>{t('Pedidos por WhatsApp disponibles al confirmar el contacto del local.')}</small>
              )}
              </footer>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
