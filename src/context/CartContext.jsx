import React, { createContext, useContext, useState, useEffect } from 'react';
import { businessInfo } from '../data/businessInfo';

const CartContext = createContext();

export function CartProvider({ children }) {
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

  const openCart = () => { setIsCatalogOpen(false); setIsCartOpen(true); };
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => { setIsCatalogOpen(false); setIsCartOpen(prev => !prev); };
  const openCatalog = () => { setIsCartOpen(false); setIsCatalogOpen(true); };
  const closeCatalog = () => setIsCatalogOpen(false);

  const addToCart = (product, quantity = 1, note = '', custom = {}) => {
    const details = Object.entries(custom).filter(([, value]) => Boolean(value));
    const variant = note.trim() || details.length
      ? '::' + JSON.stringify({ note: note.trim(), details })
      : '';
    const lineId = String(product.id || product.title) + variant;
    setCart(prev => {
      const index = prev.findIndex(item => item.id === lineId);
      if (index !== -1) {
        return prev.map((item, i) => i === index
          ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, {
        id: lineId,
        productId: product.id,
        title: product.title,
        price: product.price,
        desc: product.desc,
        quantity,
        notes: note.trim(),
        customizations: Object.fromEntries(details)
      }];
    });
    // Ordering inside the full catalog must not open a second cart modal.
    if (!isCatalogOpen) openCart();
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

    let message = '¡Hola La Patata! 🍟 Quisiera consultar por este pedido:\\n\\n';
    for (const item of cart) {
      const subtotal = item.price * item.quantity;
      message += `• ${item.quantity}x ${item.title} — US$ ${subtotal.toFixed(2)}\\n`;
      const details = Object.entries(item.customizations || {})
        .map(([key, value]) => `${key}: ${value}`).join(', ');
      if (details) message += `  Opciones: ${details}\\n`;
      if (item.notes) message += `  Nota: ${item.notes}\\n`;
    }
    message += `\\nTotal estimado: US$ ${totalPrice.toFixed(2)} (USD)`;
    message += `\\nModalidad: ${mode}`;
    message += `\\nPreferencia de pago: ${payment} (sujeta a confirmación)`;
    if (name) message += `\\nCliente: ${name}`;
    if (address && mode === 'Entrega a domicilio') message += `\\nDirección: ${address}`;
    if (table && mode === 'En mesa') message += `\\nMesa: ${table}`;
    if (notes) message += `\\nObservaciones: ${notes}`;
    message += '\\n\\nPrecios de referencia. Disponibilidad y total por confirmar con el restaurante.';
    return message;
  };

  const generateWhatsAppCheckout = (customInfo = {}) => {
    if (!cart.length || !businessInfo.whatsappNumber) return false;
    const phone = businessInfo.whatsappNumber.replace(/\\D/g, '');
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
