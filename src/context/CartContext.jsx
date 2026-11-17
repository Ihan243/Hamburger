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

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  const addToCart = (product, quantity = 1, note = '') => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          notes: note || next[existingIndex].notes
        };
        return next;
      }
      return [...prev, {
        id: product.id || product.title,
        title: product.title,
        price: product.price,
        desc: product.desc,
        quantity,
        notes: note
      }];
    });
    openCart();
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

  const generateWhatsAppCheckout = (customInfo = {}) => {
    if (cart.length === 0 || !businessInfo.whatsappNumber) return;

    const name = customInfo.name || customerName;
    const address = customInfo.address || deliveryAddress;
    const notes = customInfo.notes || orderNotes;

    let message = `¡Hola La Patata! 🍟 Quiero hacer el siguiente pedido:\n\n`;

    cart.forEach(item => {
      const itemSub = item.price * item.quantity;
      message += `• ${item.quantity}x ${item.title} — US$ ${itemSub.toFixed(2)}`;
      if (item.notes) {
        message += ` (Nota: ${item.notes})`;
      }
      message += `\n`;
    });

    message += `\n💰 *Total estimado: US$ ${totalPrice.toFixed(2)} (USD)*`;
    if (name) message += `\n👤 *Cliente:* ${name}`;
    if (address) message += `\n📍 *Dirección de entrega:* ${address}`;
    if (notes) message += `\n📝 *Observaciones:* ${notes}`;
    message += `\n\n🛵 _Pedido enviado desde la web oficial de La Patata Street Food_`;

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${businessInfo.whatsappNumber}?text=${encoded}`;
    window.open(url, '_blank');
  };

  return (
    <CartContext.Provider value={{
      cart,
      isCartOpen,
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
      generateWhatsAppCheckout
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
