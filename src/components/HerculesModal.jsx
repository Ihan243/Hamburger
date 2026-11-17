import { mascotImage } from '../utils/imageAssets.js';
import React, { useState, useEffect, useRef } from 'react';
import { businessInfo } from '../data/businessInfo';

const sectionPromos = [
  { id: 'inicio', text: '¡Papas con actitud! 🍟', link: '#carta', action: 'Ver carta' },
  { id: 'nosotros', text: 'Conoce lo que nos hace diferentes 🐶', link: '#diferencia', action: 'Descubrir' },
  { id: 'especialidades', text: '¡Explora las especialidades! ⭐', link: '#especialidades', action: 'Ver platos' },
  { id: 'carta', text: 'Busca tu antojo en la carta 🍟', link: '#carta', action: 'Explorar' },
  { id: 'galeria', text: '¡Mira La Patata en acción! 📸', link: '#galeria', action: 'Ver galería' },
  { id: 'delivery', text: 'Arma tu pedido con precios USD 🛍️', link: '#carta', action: 'Ver menú' }
];

export default function HerculesModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [currentPromo, setCurrentPromo] = useState(sectionPromos[0]);
  const pendingReplies = useRef([]);
  const [messages, setMessages] = useState([
    {
      sender: 'hercules',
      text: businessInfo.mascot.initialGreeting
    }
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      // Update the single friendly bubble with the currently viewed section.
      const visible = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (!visible.length) return;
      const promo = sectionPromos.find(item => item.id === visible[0].target.id);
      if (promo) setCurrentPromo(promo);
    }, { rootMargin: '-18% 0px -46% 0px', threshold: [0, 0.1, 0.3] });
    sectionPromos.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = event => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  useEffect(() => () => pendingReplies.current.forEach(clearTimeout), []);

  const handleAskFaq = (faq) => {
    // Add user question
    const newMessages = [
      ...messages,
      { sender: 'user', text: faq.label }
    ];
    setMessages(newMessages);

    // Simulate Hercules response
    const timeout = window.setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: 'hercules', text: faq.answer }
      ]);
      pendingReplies.current = pendingReplies.current.filter(id => id !== timeout);
    }, 300);
    pendingReplies.current.push(timeout);
  };

  return (
    <>
      {/* Floating Mascot Trigger */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end" data-purpose="mascot-widget">
        {/* Speech Greeting Bubble */}
        {showBubble && !isOpen && (
          <div className="hercules-promo-bubble hidden sm:flex items-center gap-2 bg-brand-yellow text-brand-purple px-4 py-2 rounded-2xl rounded-br-none shadow-2xl mb-2 text-xs font-bold border-2 border-brand-purple" aria-live="polite">
            <span>{currentPromo.text} <a href={currentPromo.link} className="underline underline-offset-2 ml-1">{currentPromo.action} ↗</a></span>
            <button 
              onClick={() => setShowBubble(false)}
              aria-label="Cerrar mensaje de Hércules"
              className="text-brand-purple hover:text-red-700 ml-1 font-black"
            >
              ×
            </button>
          </div>
        )}

        {/* Mascot Round Floating Button */}
        <button 
          onClick={() => setIsOpen(true)}
          aria-label="Hablar con Hércules" 
          className="relative group p-1 bg-brand-yellow rounded-full shadow-2xl border-2 border-brand-purpleDeep hover:scale-110 transition-transform active:scale-95 focus:outline-none"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-brand-purple">
            <img 
              src={mascotImage} 
              alt="Hércules mascota asistente" decoding="async" width="64" height="64" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="absolute -top-1 -left-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-brand-purple"></span>
          </span>
        </button>
      </div>

      {/* Hercules Interactive Chat Assistant Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="hercules-title" data-native-scroll>
          <div className="bg-brand-purpleCard border-2 border-brand-yellow w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scaleUp">
            {/* Modal Header */}
            <div className="bg-brand-purple p-4 border-b border-brand-purpleMuted flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={mascotImage} 
                  alt="Hércules" decoding="async" width="48" height="48" 
                  className="w-12 h-12 rounded-full border border-brand-yellow object-cover"
                />
                <div>
                  <h3 id="hercules-title" className="font-street text-xl text-brand-yellow leading-tight">HÉRCULES</h3>
                  <p className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    {businessInfo.mascot.title}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar asistente"
                className="text-brand-graySub hover:text-white p-2 text-xl font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body / Dialogue */}
            <div className="p-4 overflow-y-auto space-y-3 text-xs flex-1 max-h-[400px]">
              {messages.map((msg, index) => {
                if (msg.sender === 'user') {
                  return (
                    <div 
                      key={index}
                      className="bg-brand-yellow text-brand-purple p-2.5 rounded-2xl rounded-tr-none font-bold text-[11px] self-end ml-auto max-w-[80%]"
                    >
                      {msg.text}
                    </div>
                  );
                }
                return (
                  <div 
                    key={index}
                    className="bg-brand-purpleMuted p-3 rounded-2xl rounded-tl-none border border-brand-purpleMuted text-brand-cream leading-relaxed"
                  >
                    🐶 <strong>Hércules:</strong> {msg.text}
                  </div>
                );
              })}

              <p className="text-[11px] font-bold text-brand-yellow pt-2">
                Toca cualquier pregunta rápida para responderte al instante:
              </p>
            </div>

            {/* Quick Action Question Chips */}
            <div className="p-3 bg-brand-purple/70 border-t border-brand-purpleMuted flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                {businessInfo.mascot.faqs.map((faq) => (
                  <button 
                    key={faq.id}
                    onClick={() => handleAskFaq(faq)}
                    className="text-left bg-brand-purpleMuted hover:bg-brand-yellow hover:text-brand-purple text-brand-cream/90 p-2 rounded-xl text-[11px] font-bold transition"
                  >
                    {faq.label}
                  </button>
                ))}
              </div>

              <a 
                href={businessInfo.whatsappUrl || '#contacto'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full text-center bg-brand-yellow hover:bg-brand-yellowDark text-brand-purple py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition"
              >
                {businessInfo.whatsappUrl ? 'Hablar por WhatsApp →' : 'Información de contacto →'}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
