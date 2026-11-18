import React, { useEffect, useMemo, useRef, useState } from 'react';
import '../styles/digital-catalog.css';
import {
  ArrowLeft, Check, ClipboardCopy, Minus, Plus, Search,
  ShoppingBag, Trash2, X
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { menuCategories, menuItems } from '../data/menuData';
import { businessInfo } from '../data/businessInfo';
import { foodImage, foodImageSrcSet } from '../utils/imageAssets.js';

const money = amount => 'US$ ' + Number(amount).toFixed(2);
const categories = [
  { id: 'toda', label: 'Toda la carta' },
  { id: 'salchipapas', label: 'Salchipapas y bowls' },
  { id: 'broaster', label: 'Pollo y especiales' },
  { id: 'crunch', label: 'Alitas y crunch' },
  { id: 'boxes', label: 'Combos y boxes' },
  { id: 'bebidas', label: 'Bebidas' }
];
const sauces = ['BBQ', 'Chimichurri', 'Picante'];
const needsSauce = item => ['alitas-crocantes', 'boneless-pechuga'].includes(item.id);
const canChooseSauce = item => needsSauce(item) ||
  ['tenders-crocantes', 'broaster-clasico', 'broaster-clasico-xl'].includes(item.id);
const isDrink = item => item.categories.includes('bebidas');
const normalize = value => value.normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '').toLowerCase();

function ProductCard({ item, quantity, onQuantity, onAdd, onCustomize }) {
  const drink = isDrink(item);
  return (
    <article className="dc-product">
      <div className={'dc-product-visual' + (drink ? ' is-drink' : '')}>
        {drink ? (
          <div className="dc-drink-art" aria-label="Fotografía pendiente">
            <span role="img" aria-label="Bebida">🥤</span>
            <small>Foto próximamente</small>
          </div>
        ) : (
          <>
            <img src={foodImage} srcSet={foodImageSrcSet}
              sizes="(max-width: 600px) 90vw, (max-width: 1050px) 45vw, 26vw"
              loading="lazy" decoding="async" width="420" height="300"
              alt={'Fotografía representativa de papas y comida callejera; no es una foto específica de ' + item.title}/>
            <span className="dc-photo-disclaimer">Imagen ilustrativa</span>
          </>
        )}
        {item.badge && <span className="dc-product-badge">{item.badge}</span>}
      </div>
      <div className="dc-product-body">
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
        <div className="dc-card-bottom">
          <strong>{money(item.price)}</strong>
          <div className="dc-card-controls">
            <div className="dc-quantity" aria-label={'Cantidad de ' + item.title}>
              <button type="button" onClick={() => onQuantity(item.id, -1)}
                aria-label={'Reducir cantidad de ' + item.title}
                disabled={quantity <= 1}><Minus size={14}/></button>
              <span aria-live="polite">{quantity}</span>
              <button type="button" onClick={() => onQuantity(item.id, 1)}
                aria-label={'Aumentar cantidad de ' + item.title}><Plus size={14}/></button>
            </div>
            <button type="button" className="dc-add-btn"
              onClick={() => onAdd(item, quantity)}>
              <Plus size={15} /> AGREGAR
            </button>
          </div>
        </div>
        <button className="dc-customize-link" type="button"
          onClick={() => onCustomize(item, quantity)}>
          Personalizar / notas para cocina
        </button>
      </div>
    </article>
  );
}

function CartSummary({ cart, totalPrice, totalItems, updateQuantity, removeFromCart,
  clearCart, customerName, setCustomerName, deliveryAddress, setDeliveryAddress,
  orderNotes, setOrderNotes, mode, setMode, payment, setPayment, table, setTable,
  copyOrder, generateWhatsAppCheckout, copied, busy }) {
  return (
    <>
      <div className="dc-summary-head">
        <span>PEDIDO ONLINE · USD</span>
        <h2>Tu Pedido <b>({totalItems})</b></h2>
      </div>
      <div className="dc-summary-scroll">
        {cart.length === 0 ? (
          <div className="dc-summary-empty">
            <div aria-hidden="true"><ShoppingBag size={30}/></div>
            <h3>El carrito está vacío</h3>
            <p>Selecciona platos de la carta para añadirlos a tu pedido.</p>
          </div>
        ) : (
          <>
            <div className="dc-summary-tools">
              <span>{totalItems} {totalItems === 1 ? 'producto' : 'productos'}</span>
              <button type="button" onClick={clearCart}><Trash2 size={14}/> Vaciar</button>
            </div>
            <ul className="dc-selected-lines">
              {cart.map(item => <li key={item.id} className="dc-selected-line">
                <div className="dc-selected-info">
                  <h3>{item.title}</h3>
                  {Object.entries(item.customizations || {}).map(([key, value]) =>
                    <small key={key}>{key}: {value}</small>
                  )}
                  {item.notes && <small>Nota: {item.notes}</small>}
                  <strong>{money(item.price * item.quantity)}</strong>
                </div>
                <div className="dc-selected-actions">
                  <div className="dc-quantity">
                    <button type="button" onClick={() => updateQuantity(item.id, -1)}
                      aria-label={'Quitar una unidad de ' + item.title}><Minus size={14}/></button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, 1)}
                      aria-label={'Añadir una unidad de ' + item.title}><Plus size={14}/></button>
                  </div>
                  <button type="button" className="dc-remove" onClick={() => removeFromCart(item.id)}
                    aria-label={'Eliminar ' + item.title}><X size={16}/></button>
                </div>
              </li>)}
            </ul>
            <fieldset className="dc-form-options">
              <legend>Datos del pedido</legend>
              <label>Modalidad
                <select value={mode} onChange={event => setMode(event.target.value)}>
                  <option>Entrega a domicilio</option>
                  <option>Recoger en local</option>
                  <option>En mesa</option>
                </select>
              </label>
              <label>Nombre (opcional)
                <input value={customerName} onChange={e => setCustomerName(e.target.value)}
                  placeholder="Tu nombre" maxLength={90} autoComplete="name"/>
              </label>
              {mode === 'Entrega a domicilio' &&
                <label>Dirección o referencia
                  <input value={deliveryAddress} onChange={e => setDeliveryAddress(e.target.value)}
                    placeholder="Dirección de entrega en CDMX" maxLength={200}/>
                </label>
              }
              {mode === 'En mesa' &&
                <label>Número o referencia de mesa
                  <input value={table} onChange={e => setTable(e.target.value)}
                    placeholder="Mesa (si aplica)" maxLength={35}/>
                </label>
              }
              <label>Preferencia de pago
                <select value={payment} onChange={event => setPayment(event.target.value)}>
                  <option>A confirmar con el local</option>
                  <option>Efectivo (sujeto a disponibilidad)</option>
                  <option>Tarjeta (sujeto a disponibilidad)</option>
                </select>
              </label>
              <label>Indicaciones generales
                <textarea rows={2} value={orderNotes}
                  onChange={e => setOrderNotes(e.target.value)} maxLength={500}
                  placeholder="Ej. sin mayonesa, indicaciones para cocina"/>
              </label>
            </fieldset>
          </>
        )}
      </div>
      <footer className="dc-summary-footer">
        <div className="dc-subtotal"><span>Subtotal ({totalItems} ítems)</span><strong>{money(totalPrice)}</strong></div>
        <div className="dc-total"><span>Total estimado</span><strong>{money(totalPrice)}</strong></div>
        {businessInfo.whatsappNumber ? (
          <button type="button" className="dc-checkout" disabled={cart.length === 0 || busy}
            onClick={() => generateWhatsAppCheckout({ mode, payment, table })}>
            <ShoppingBag size={17}/> Preparar mensaje en WhatsApp
          </button>
        ) : (
          <button type="button" className="dc-checkout" disabled={cart.length === 0 || busy}
            onClick={copyOrder}>
            {copied ? <Check size={17}/> : <ClipboardCopy size={17}/>}
            {copied ? 'Resumen copiado' : 'Copiar resumen del pedido'}
          </button>
        )}
        <p className="dc-checkout-notice">
          {businessInfo.whatsappNumber
            ? 'El pedido se envía para consulta y requiere confirmación del restaurante. No se cobra en línea.'
            : 'El contacto del restaurante aún no está configurado. Copiar el resumen no envía ni confirma el pedido. No se realizan cobros.'}
        </p>
      </footer>
    </>
  );
}

export default function DigitalCatalog() {
  const {
    isCatalogOpen, closeCatalog, addToCart, cart, totalItems, totalPrice,
    updateQuantity, removeFromCart, clearCart, customerName, setCustomerName,
    deliveryAddress, setDeliveryAddress, orderNotes, setOrderNotes,
    generateWhatsAppCheckout, formatOrderMessage
  } = useCart();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('toda');
  const [amounts, setAmounts] = useState({});
  const [selected, setSelected] = useState(null);
  const [sauce, setSauce] = useState('');
  const [spice, setSpice] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showMobileCart, setShowMobileCart] = useState(false);
  const [mode, setMode] = useState('Entrega a domicilio');
  const [payment, setPayment] = useState('A confirmar con el local');
  const [table, setTable] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState('');
  const closeRef = useRef(null);
  const customCloseRef = useRef(null);
  const rootRef = useRef(null);

  const filtered = useMemo(() => {
    const query = normalize(search.trim());
    return menuItems.filter(item => {
      const matchCategory = category === 'toda' || item.categories.includes(category);
      const searchText = normalize([item.title, item.desc, item.tags || ''].join(' '));
      return matchCategory && (!query || searchText.includes(query));
    });
  }, [category, search]);

  useEffect(() => {
    if (!isCatalogOpen) return undefined;
    const previous = document.activeElement;
    const existingOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });

    const key = e => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (selected) setSelected(null);
        else if (showMobileCart) setShowMobileCart(false);
        else closeCatalog();
        return;
      }
      if (e.key !== 'Tab') return;
      const scope = selected ? document.querySelector('.dc-customize-dialog')
        : showMobileCart && window.innerWidth <= 960
          ? document.querySelector('.dc-summary')
          : rootRef.current;
      if (!scope) return;
      const focus = [...scope.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])')]
        .filter(node => node.getClientRects().length > 0);
      if (!focus.length) return;
      const first = focus[0]; const last = focus[focus.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('keydown', key);
      document.body.style.overflow = existingOverflow;
      if (previous && previous.isConnected && previous.focus)
        previous.focus({ preventScroll: true });
    };
  }, [isCatalogOpen, selected, showMobileCart, closeCatalog]);

  useEffect(() => {
    if (selected) customCloseRef.current?.focus({ preventScroll: true });
  }, [selected]);

  const changeQuantity = (id, direction) => setAmounts(prev => ({
    ...prev, [id]: Math.max(1, Math.min(50, (prev[id] || 1) + direction))
  }));

  const openProduct = (item, qty = 1) => {
    setSelected(item);
    setSelectedQuantity(qty);
    setSauce('');
    setSpice('');
    setSpecialNotes('');
  };

  const addProduct = (item, quantity) => {
    if (needsSauce(item)) {
      openProduct(item, quantity);
    } else {
      addToCart(item, quantity);
    }
  };

  const confirmProduct = () => {
    if (!selected || (needsSauce(selected) && !sauce)) return;
    const customizations = {
      ...(sauce ? { Salsa: sauce } : {}),
      ...(spice ? { Picante: spice } : {})
    };
    addToCart(selected, selectedQuantity, specialNotes, customizations);
    setSelected(null);
  };

  useEffect(() => {
    setCopied(false);
  }, [cart, mode, payment, table, orderNotes, customerName, deliveryAddress]);

  const copyOrder = async () => {
    setCopyError('');
    if (!cart.length) return;
    try {
      await navigator.clipboard.writeText(formatOrderMessage({ mode, payment, table }));
      setCopied(true);
    } catch {
      setCopyError('No se pudo copiar automáticamente. Usa el navegador para permitir el portapapeles.');
    }
  };

  return (
    <div className="dc-overlay" ref={rootRef} role="dialog" aria-modal="true"
      aria-label="Carta digital completa de La Patata" data-native-scroll>
      <div className="dc-catalog-main">
        <header className="dc-topbar">
          <div className="dc-toprow">
            <button type="button" className="dc-back" ref={closeRef}
              onClick={closeCatalog} aria-label="Regresar al sitio">
              <ArrowLeft size={19}/> <span>Volver</span>
            </button>
            <div className="dc-brand">
              <h1>LA PATATA</h1>
              <p>¡Bienvenido a nuestra carta digital!</p>
            </div>
            <button type="button" className="dc-cart-shortcut"
              onClick={() => setShowMobileCart(true)} aria-label={'Ver carrito: ' + totalItems + ' productos'}>
              <ShoppingBag size={17}/> CARRITO <b>{totalItems}</b>
            </button>
          </div>
          <label className="dc-search">
            <Search size={18}/>
            <input type="search" placeholder="Buscar en la carta por plato o ingrediente..."
              aria-label="Buscar en la carta digital"
              value={search} onChange={event => setSearch(event.target.value)}/>
          </label>
        </header>
        <nav className="dc-category-strip" aria-label="Categorías de productos">
          {categories.map(cat => (
            <button type="button" key={cat.id} className={category === cat.id ? 'active' : ''}
              aria-pressed={category === cat.id} onClick={() => setCategory(cat.id)}>
              {cat.label}
            </button>
          ))}
        </nav>
        <div className="dc-products-scroll">
          <div className="dc-products-heading">
            <h2>Platos disponibles</h2>
            <span aria-live="polite">{filtered.length} opciones</span>
          </div>
          {filtered.length > 0 ? (
            <div className="dc-products-grid">
              {filtered.map(item => (
                <ProductCard key={item.id} item={item} quantity={amounts[item.id] || 1}
                  onQuantity={changeQuantity} onAdd={addProduct} onCustomize={openProduct}/>
              ))}
            </div>
          ) : (
            <div className="dc-no-results">
              <Search size={30} aria-hidden="true"/>
              <h2>No encontramos ese platillo</h2>
              <p>Prueba con otra palabra o vuelve a ver toda la carta.</p>
              <button type="button" onClick={() => {setSearch('');setCategory('toda');}}>
                Ver toda la carta
              </button>
            </div>
          )}
          <p className="dc-catalog-disclaimer">
            Catálogo de demostración · Fotografías ilustrativas · Precios de referencia en USD.
            Confirma disponibilidad y precios con el restaurante.
          </p>
        </div>
        <button type="button" className="dc-mobile-cart-bar" onClick={() => setShowMobileCart(true)}>
          <ShoppingBag size={20}/> Ver mi pedido ({totalItems}) <strong>{money(totalPrice)}</strong>
        </button>
      </div>
      {showMobileCart && <div className="dc-summary-backdrop" onClick={() => setShowMobileCart(false)} aria-hidden="true"/>}
      <aside className={'dc-summary' + (showMobileCart ? ' mobile-open' : '')}
        aria-label="Resumen del pedido" data-native-scroll>
        <button type="button" className="dc-summary-mobile-close"
          onClick={() => setShowMobileCart(false)} aria-label="Cerrar resumen del pedido">
          <ArrowLeft size={18}/> Volver a los platos
        </button>
        <CartSummary cart={cart} totalPrice={totalPrice} totalItems={totalItems}
          updateQuantity={updateQuantity} removeFromCart={removeFromCart} clearCart={clearCart}
          customerName={customerName} setCustomerName={setCustomerName}
          deliveryAddress={deliveryAddress} setDeliveryAddress={setDeliveryAddress}
          orderNotes={orderNotes} setOrderNotes={setOrderNotes}
          mode={mode} setMode={setMode} payment={payment} setPayment={setPayment}
          table={table} setTable={setTable} copyOrder={copyOrder}
          copied={copied} busy={false}
          generateWhatsAppCheckout={generateWhatsAppCheckout}/>
        {copyError && <div className="dc-copy-fallback" role="alert">
          <p>{copyError} Selecciona el texto y cópialo manualmente:</p>
          <textarea readOnly aria-label="Resumen del pedido para copiar"
            value={formatOrderMessage({ mode, payment, table })}
            onFocus={event => event.target.select()} rows={6}/>
        </div>}
      </aside>

      {selected && (
        <div className="dc-customize-backdrop">
          <div className="dc-customize-dialog" role="dialog" aria-modal="true"
            aria-labelledby="dc-customize-title">
            <header>
              <div><small>PERSONALIZA TU PEDIDO</small><h2 id="dc-customize-title">{selected.title}</h2></div>
              <button type="button" ref={customCloseRef}
                onClick={() => setSelected(null)} aria-label="Cerrar personalización"><X size={21}/></button>
            </header>
            <p>{selected.desc}</p>
            {canChooseSauce(selected) && (
              <label className="dc-option-label">
                Salsa {needsSauce(selected) ? '(obligatoria)' : '(opcional)'}
                <select value={sauce} onChange={event => setSauce(event.target.value)} required={needsSauce(selected)}>
                  <option value="">Seleccionar salsa</option>
                  {sauces.map(option => <option key={option}>{option}</option>)}
                </select>
              </label>
            )}
            {selected.id === 'broaster-spicy' && (
              <label className="dc-option-label">Nivel de picante (opcional)
                <select value={spice} onChange={e => setSpice(e.target.value)}>
                  <option value="">Al gusto de la casa</option>
                  <option>Suave</option><option>Medio</option><option>Fuerte</option>
                </select>
              </label>
            )}
            <label className="dc-option-label">Notas especiales para cocina (opcional)
              <textarea rows={3} maxLength={250}
                value={specialNotes} onChange={e => setSpecialNotes(e.target.value)}
                placeholder="Ej. salsa aparte, sin queso..."/>
            </label>
            <div className="dc-customize-bottom">
              <div className="dc-quantity">
                <button type="button" onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                  aria-label="Reducir cantidad"><Minus size={16}/></button>
                <span>{selectedQuantity}</span>
                <button type="button" onClick={() => setSelectedQuantity(Math.min(50, selectedQuantity + 1))}
                  aria-label="Aumentar cantidad"><Plus size={16}/></button>
              </div>
              <button type="button" className="dc-customize-confirm" onClick={confirmProduct}
                disabled={needsSauce(selected) && !sauce}>
                Añadir · {money(selected.price * selectedQuantity)}
              </button>
            </div>
            <small className="dc-customize-hint">Las opciones y notas se registran en el resumen; el restaurante debe confirmarlas.</small>
          </div>
        </div>
      )}
    </div>
  );
}
