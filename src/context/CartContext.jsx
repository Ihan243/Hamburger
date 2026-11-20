import React, { createContext, useContext, useState, useEffect } from 'react';
import { businessInfo } from '../data/businessInfo';
import { useLanguage } from '../i18n/LanguageContext.jsx';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { language, t, option, product: localize } = useLanguage();
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('la_patata_cart_usd_v1');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [catalogCartRequested, setCatalogCartRequested] = useState(false);
  const [pendingCustomization, setPendingCustomization] = useState(null);
  const [orderNotes, setOrderNotes] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('la_patata_cart_usd_v1', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // The original header cart now opens the same integrated digital catalog.
  const openCart = () => { setIsCartOpen(false); setCatalogCartRequested(true); setIsCatalogOpen(true); };
  const closeCart = () => { setIsCartOpen(false); setCatalogCartRequested(false); };
  const toggleCart = openCart;
  const openCatalog = () => {
    setIsCartOpen(false); setPendingCustomization(null);
    setCatalogCartRequested(false); setIsCatalogOpen(true);
  };
  const closeCatalog = () => {
    setIsCatalogOpen(false); setPendingCustomization(null);
    setCatalogCartRequested(false);
  };
  const requestCustomization = (product, quantity = 1) => {
    setIsCartOpen(false);
    setCatalogCartRequested(false);
    setPendingCustomization({ product, quantity });
    setIsCatalogOpen(true);
  };
  const clearPendingCustomization = () => setPendingCustomization(null);
  const clearCatalogCartRequest = () => setCatalogCartRequested(false);

  // Line keys include all selected options, so two different customizations
  // remain distinct while identical ones merge into a single cart line.
  const buildCartLine = (product, quantity, note, custom) => {
    const cleanNotes = String(note || '').trim();
    const cleaned = Object.fromEntries(
      Object.entries(custom || {})
        .filter(([, value]) => value != null && String(value).trim())
        .sort(([a], [b]) => a.localeCompare(b))
    );
    const variant = cleanNotes || Object.keys(cleaned).length
      ? '::' + JSON.stringify({ notes: cleanNotes, custom: cleaned })
      : '';
    return {
      id: String(product.id || product.productId || product.title) + variant,
      productId: product.id || product.productId,
      title: product.title,
      desc: product.desc,
      price: Number(product.price) || 0,
      quantity: Math.max(1, Math.min(50, quantity)),
      notes: cleanNotes,
      customizations: cleaned
    };
  };

  const addToCart = (product, quantity = 1, note = '', custom = {}) => {
    const entry = buildCartLine(product, quantity, note, custom);
    setCart(prev => {
      const duplicate = prev.find(line => line.id === entry.id);
      return duplicate
        ? prev.map(line => line.id === entry.id
            ? { ...line, quantity: Math.min(50, line.quantity + entry.quantity) }
            : line)
        : [...prev, entry];
    });
  };

  const replaceCartLine = (previousId, product, quantity = 1, note = '', custom = {}) => {
    const entry = buildCartLine(product, quantity, note, custom);
    setCart(prev => {
      const withoutOld = prev.filter(line => line.id !== previousId);
      const duplicate = withoutOld.find(line => line.id === entry.id);
      return duplicate
        ? withoutOld.map(line => line.id === entry.id
            ? { ...line, quantity: Math.min(50, line.quantity + entry.quantity) }
            : line)
        : [...withoutOld, entry];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const formatOrderMessage = (customInfo = {}) => {
    const name = customInfo.name || customerName;
    const address = customInfo.address || deliveryAddress;
    const notes = customInfo.notes || orderNotes;
    const mode = customInfo.mode || 'Por confirmar';
    const payment = customInfo.payment || 'A confirmar con el local';
    const table = customInfo.table || '';

    let message = language === 'en'
      ? 'Hi La Patata! 🍟 I would like to ask about this order:\n\n'
      : '¡Hola La Patata! 🍟 Quisiera consultar por este pedido:\n\n';
    for (const item of cart) {
      const subtotal = item.price * item.quantity;
      message += `•  ${item.quantity}x ${localize(item).title} — US$ ${subtotal.toFixed(2)}\n`;
      const details = Object.entries(item.customizations || {})
        .map(([key, value]) => `${t(key)}: ${String(value).split(', ').map(option).join(', ')}`).join(', ');
      if (details) message += `  ${language === 'en' ? 'Options' : 'Opciones'}: ${details}\n`;
      if (item.notes) message += `  ${language === 'en' ? 'Note' : 'Nota'}: ${item.notes}\n`;
      if (item.customizations?.Extras) {
        message += language === 'en'
          ? '  Notice: extra charges are not included and must be confirmed.\n'
          : '  Aviso: los recargos de extras no están incluidos y deben confirmarse.\n';
      }
    }
    message += `\n${language === 'en' ? 'Estimated total' : 'Total estimado'}: US$ ${totalPrice.toFixed(2)} (USD)`;
    message += `\n${language === 'en' ? 'Order type' : 'Modalidad'}: ${t(mode)}`;
    message += `\n${language === 'en' ? 'Payment preference' : 'Preferencia de pago'}: ${t(payment)} ${language === 'en' ? '(subject to confirmation)' : '(sujeta a confirmación)'}`;
    if (name) message += `\n${language === 'en' ? 'Customer' : 'Cliente'}: ${name}`;
    if (address && mode === 'Entrega a domicilio') message += `\n${language === 'en' ? 'Address' : 'Dirección'}: ${address}`;
    if (table && mode === 'En mesa') message += `\n${language === 'en' ? 'Table' : 'Mesa'}: ${table}`;
    if (notes) message += `\n${language === 'en' ? 'Instructions' : 'Observaciones'}: ${notes}`;
    message += language === 'en'
      ? '\n\nReference prices in USD, excluding any unconfirmed extra charges. Availability and final total must be confirmed with the restaurant.'
      : '\n\nPrecios de referencia en USD, sin recargos de extras no confirmados. Disponibilidad y total final por confirmar con el restaurante.';
    return message;
  };

  const generateWhatsAppCheckout = (customInfo = {}) => {
    if (!cart.length || !businessInfo.whatsappNumber) return false;
    const phone = businessInfo.whatsappNumber.replace(/\D/g, '');
    if (!phone) return false;
    const message = formatOrderMessage(customInfo);
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    return true;
  };

  return (
    <CartContext.Provider value={{
      cart,
      isCartOpen,
      isCatalogOpen,
      catalogCartRequested,
      pendingCustomization,
      clearPendingCustomization,
      clearCatalogCartRequest,
      requestCustomization,
      replaceCartLine,
      openCatalog,
      closeCatalog,
      openCart,
      closeCart,
      toggleCart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      totalItems,
      totalPrice,
      orderNotes,
      setOrderNotes,
      customerName,
      setCustomerName,
      deliveryAddress,
      setDeliveryAddress,
      generateWhatsAppCheckout,
      formatOrderMessage
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
