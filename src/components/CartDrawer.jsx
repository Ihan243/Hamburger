import React, { useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { businessInfo } from '../data/businessInfo';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
    customerName,
    setCustomerName,
    deliveryAddress,
    setDeliveryAddress,
    orderNotes,
    setOrderNotes,
    generateWhatsAppCheckout
  } = useCart();

  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!isCartOpen) return undefined;
    const previous = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });

    const onKey = event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeCart();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = [...panelRef.current.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled])'
      )].filter(el => el.getClientRects().length);
      if (!focusable.length) return;
      if (event.shiftKey && document.activeElement === focusable[0]) {
        event.preventDefault();
        focusable[focusable.length - 1].focus();
      } else if (!event.shiftKey && document.activeElement === focusable[focusable.length - 1]) {
        event.preventDefault();
        focusable[0].focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      if (previous instanceof HTMLElement && previous.isConnected)
        previous.focus({ preventScroll: true });
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={closeCart}
      />

      {/* Slide-over panel */}
      <aside ref={panelRef}
        className="cart-panel fixed top-0 right-0 h-full w-full max-w-md bg-brand-purpleCard border-l-2 border-brand-yellow z-50 flex flex-col shadow-2xl animate-slideLeft"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-heading"
      >
        {/* Cart Header */}
        <div className="p-5 bg-brand-purple border-b border-brand-purpleMuted flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍟</span>
            <div>
              <h3 id="cart-heading" className="font-street text-2xl text-white">TU PEDIDO</h3>
              <p className="text-[11px] text-brand-yellow font-bold uppercase tracking-wider">Papas con Actitud</p>
            </div>
          </div>
          <button 
            onClick={closeCart}
            ref={closeRef}
            className="text-brand-graySub hover:text-white p-2 text-xl font-bold transition-colors"
            aria-label="Cerrar pedido"
          >
            ✕
          </button>
        </div>

        {/* Cart Items List Container */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-20 text-brand-graySub">
              <span className="text-5xl block mb-3 opacity-40">🛒</span>
              <h4 className="font-street text-xl text-white">Tu bolsa está vacía</h4>
              <p className="text-xs mt-1">Añade tus salchipapas, alitas y bebidas favoritas para empezar.</p>
              <button 
                onClick={closeCart}
                className="mt-6 inline-block bg-brand-yellow text-brand-purple font-street text-sm uppercase px-5 py-2.5 rounded-xl"
              >
                Ver Menú 🍟
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs text-brand-graySub pb-1 border-b border-brand-purpleMuted/40">
                <span>{cart.length} {cart.length === 1 ? 'producto' : 'productos'}</span>
                <button 
                  onClick={clearCart}
                  className="text-brand-orange hover:underline font-bold"
                >
                  Vaciar bolsa
                </button>
              </div>

              {cart.map((item) => (
                <div 
                  key={item.id}
                  className="bg-brand-purple p-3.5 rounded-2xl border border-brand-purpleMuted flex items-center justify-between gap-3 shadow-sm"
                >
                  <div className="flex-1 min-w-0">
                    <h5 className="font-street text-base text-white truncate">{item.title}</h5>
                    <p className="text-[11px] text-brand-yellow font-bold">
                      US$ {item.price.toFixed(2)} c/u
                    </p>
                    {item.notes && (
                      <p className="text-[10px] text-brand-graySub italic mt-0.5">Nota: {item.notes}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 bg-brand-purpleMuted px-2 py-1 rounded-xl">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      aria-label={`Quitar una unidad de ${item.title}`}
                      className="cart-qty-btn w-6 h-6 rounded-lg bg-brand-purpleCard text-white hover:text-brand-yellow flex items-center justify-center font-bold text-sm transition"
                    >
                      -
                    </button>
                    <span className="text-xs font-black text-white px-1 min-w-[16px] text-center">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      aria-label={`Añadir una unidad de ${item.title}`}
                      className="cart-qty-btn w-6 h-6 rounded-lg bg-brand-purpleCard text-white hover:text-brand-yellow flex items-center justify-center font-bold text-sm transition"
                    >
                      +
                    </button>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Eliminar ${item.title} del carrito`}
                    className="cart-remove-btn text-brand-graySub hover:text-red-400 p-1 text-xs"
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </div>
              ))}

              {/* Customer details for delivery */}
              <div className="mt-4 p-3.5 bg-brand-purple/70 rounded-2xl border border-brand-purpleMuted/60 space-y-2.5">
                <p className="text-[11px] font-bold text-brand-yellow uppercase tracking-wider">Datos para el delivery (opcional):</p>
                <div>
                  <input 
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Tu nombre (ej. Carlos)" aria-label="Nombre del cliente"
                    className="w-full bg-brand-purpleDeep border border-brand-purpleMuted rounded-xl px-3 py-2 text-xs text-white placeholder-brand-graySub focus:outline-none focus:border-brand-yellow"
                  />
                </div>
                <div>
                  <input 
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Dirección o referencia en CDMX" aria-label="Dirección de entrega"
                    className="w-full bg-brand-purpleDeep border border-brand-purpleMuted rounded-xl px-3 py-2 text-xs text-white placeholder-brand-graySub focus:outline-none focus:border-brand-yellow"
                  />
                </div>
                <div>
                  <input 
                    type="text"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Indicaciones (ej. salsas aparte, sin mayonesa)" aria-label="Indicaciones del pedido"
                    className="w-full bg-brand-purpleDeep border border-brand-purpleMuted rounded-xl px-3 py-2 text-xs text-white placeholder-brand-graySub focus:outline-none focus:border-brand-yellow"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Cart Footer & WhatsApp Checkout */}
        <div className="p-5 bg-brand-purple border-t border-brand-purpleMuted space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-brand-graySub font-bold">Subtotal estimado:</span>
            <span className="font-street text-3xl text-brand-yellow">
              US$ {totalPrice.toFixed(2)}
            </span>
          </div>

          <button 
            disabled={cart.length === 0 || !businessInfo.whatsappNumber}
            onClick={() => generateWhatsAppCheckout()}
            className="w-full bg-brand-yellow hover:bg-brand-yellowDark disabled:opacity-50 disabled:cursor-not-allowed text-brand-purple font-street text-xl py-3.5 rounded-2xl uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <span>{businessInfo.whatsappNumber ? 'Pedir por WhatsApp' : 'Pedidos por WhatsApp próximamente'}</span>
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path>
            </svg>
          </button>
          <p className="text-[10px] text-center text-brand-graySub">
            {businessInfo.whatsappNumber ? 'Se enviará el pedido al WhatsApp configurado.' : 'Puedes armar tu carrito. Falta configurar el contacto de CDMX.'}
          </p>
        </div>
      </aside>
    </div>
  );
}
