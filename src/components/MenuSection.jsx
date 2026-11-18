import React, { useMemo, useState } from 'react';
import { useCart } from '../context/CartContext';
import { menuCategories, menuItems } from '../data/menuData';

const featuredLeftIds = [
  'salchi-fest', 'broaster-clasico', 'salchi-patata',
  'alitas-crocantes', 'wrap-especial'
];
const featuredRightIds = ['box-hercules', 'limonada-frozen'];
const byId = new Map(menuItems.map(item => [item.id, item]));
const featuredLeft = featuredLeftIds.map(id => byId.get(id)).filter(Boolean);
const featuredRight = featuredRightIds.map(id => byId.get(id)).filter(Boolean);

function MenuLine({ item, onAdd }) {
  return (
    <li className="ref-menu-line">
      <button
        className="ref-menu-item-button"
        type="button"
        onClick={() => onAdd(item)}
        aria-label={`Agregar ${item.title} al pedido por US$ ${item.price.toFixed(2)}`}
        title={`Agregar ${item.title} al carrito`}
      >
        <span className="ref-menu-item-main">
          <span className="ref-menu-name">
            {item.title}
            {item.id === 'salchi-fest' && <small>¡BOMBA!</small>}
          </span>
          <span className="ref-menu-description">{item.desc}</span>
        </span>
        <span className="ref-price-rule" aria-hidden="true" />
        <span className="ref-menu-price">US$ {item.price.toFixed(2)}</span>
        <span className="ref-menu-plus" aria-hidden="true">+</span>
      </button>
    </li>
  );
}

function MenuColumn({ title, subtitle, items, onAdd }) {
  return (
    <div className="ref-menu-col">
      <div className="ref-menu-group-heading">
        <h3>{title}</h3>
        {subtitle && <span>{subtitle}</span>}
      </div>
      <ul>
        {items.map(item => (
          <MenuLine key={item.id} item={item} onAdd={onAdd} />
        ))}
      </ul>
    </div>
  );
}

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart, openCatalog } = useCart();

  const featured = activeCategory === 'all' && !searchQuery.trim();

  const visible = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase('es');
    return menuItems.filter(item => {
      const matchesCategory =
        Boolean(query) || activeCategory === 'toda' ||
        item.categories.includes(activeCategory);
      const searchable = [
        item.title, item.desc, item.tags || ''
      ].join(' ').toLocaleLowerCase('es');
      return matchesCategory && (!query || searchable.includes(query));
    });
  }, [searchQuery, activeCategory]);

  const split = Math.ceil(visible.length / 2);
  const left = featured ? featuredLeft : visible.slice(0, split);
  const right = featured ? featuredRight : visible.slice(split);
  const hasResults = featured || visible.length > 0;

  return (
    <section id="carta" className="ref-menu-section menu-reference" aria-labelledby="ref-menu-title">
      <div className="ref-menu-panel">
        <header className="ref-menu-panel-header">
          <h2 id="ref-menu-title">NUESTRA CARTA</h2>
          <p>La calidad que te ofrecemos <span>· Precios en USD</span></p>
        </header>

        <label className="ref-menu-search">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="7" />
            <path d="m16 16 5 5" />
          </svg>
          <input
            type="search"
            value={searchQuery}
            onChange={event => setSearchQuery(event.target.value)}
            placeholder="Buscar en la carta (ej. alitas, picante, wrap, bowl, boxes...)"
            aria-label="Buscar productos en la carta"
          />
        </label>

        <div className="ref-menu-filters" role="group" aria-label="Categorías de la carta">
          {menuCategories.map(category => (
            <button
              type="button"
              key={category.id}
              className={activeCategory === category.id ? 'active' : ''}
              aria-pressed={activeCategory === category.id}
              onClick={() => { setActiveCategory(category.id); setSearchQuery(''); }}
            >
              {category.label}
            </button>
          ))}
        </div>

        <span className="sr-only" role="status" aria-live="polite">
          {featured ? 'Mostrando los favoritos de la casa' :
            `${visible.length} productos encontrados`}
        </span>

        {hasResults ? (
          <div className="ref-menu-columns">
            <MenuColumn
              title={featured ? 'LOS FAVORITOS DEL PÚBLICO' : 'NUESTRA SELECCIÓN'}
              items={left}
              onAdd={addToCart}
            />
            <div className="ref-menu-col-right">
              {right.length > 0 && (
                <MenuColumn
                  title={featured ? 'COMBO ESTRELLA' : 'MÁS PARA DISFRUTAR'}
                  subtitle={featured ? 'PARA COMPARTIR' : undefined}
                  items={right}
                  onAdd={addToCart}
                />
              )}
              <aside className="ref-menu-order-box">
                <h3>¿Quieres hacer tu pedido? Hazlo aquí</h3>
                <button type="button" onClick={openCatalog}>
                  Ver Carta Digital &amp; Pedir <span aria-hidden="true">→</span>
                </button>
              </aside>
            </div>
          </div>
        ) : (
          <div className="ref-menu-empty">
            <p>No encontramos productos con esa búsqueda.</p>
            <button type="button" onClick={() => {
              setSearchQuery('');
              setActiveCategory('toda');
            }}>Ver toda la carta</button>
          </div>
        )}
        <p className="ref-menu-footer-note">
          Precios de referencia en USD. Selecciona un platillo para añadirlo a tu pedido.
        </p>
      </div>
    </section>
  );
}
