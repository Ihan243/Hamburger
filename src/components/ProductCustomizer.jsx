import React, { useEffect, useRef, useState } from 'react';
import { Check, Minus, Plus, X } from 'lucide-react';
const platterCutout = `${import.meta.env.BASE_URL}images/hero-platter-cutout.webp`;
import {
  creamOptions, extraOptions, sauces, isDrink,
  needsSauce, canChooseCreams, canChooseExtras, canChooseSauce
} from '../data/productOptions.js';

const money = price => 'US$ ' + Number(price).toFixed(2);
const splitValues = value => String(value || '').split(',').map(x => x.trim()).filter(Boolean);

/**
 * Accessible product sheet shared by ADD and MODIFY.
 * Free creams are configurable. Extras have no published USD prices yet, and
 * are explicitly not included in the base-price estimate.
 */
export default function ProductCustomizer({ product, quantity = 1, editingLine = null, onClose, onSave }) {
  const [count, setCount] = useState(editingLine?.quantity || quantity);
  const [creams, setCreams] = useState(
    splitValues(editingLine?.customizations?.Cremas)
  );
  const [extras, setExtras] = useState(
    splitValues(editingLine?.customizations?.Extras)
  );
  const [sauce, setSauce] = useState(editingLine?.customizations?.Salsa || '');
  const [spice, setSpice] = useState(editingLine?.customizations?.Picante || '');
  const [notes, setNotes] = useState(editingLine?.notes || '');
  const closeButton = useRef(null);

  useEffect(() => {
    closeButton.current?.focus({ preventScroll: true });
  }, []);

  const chooseCream = name => {
    setCreams(prev => prev.includes(name)
      ? prev.filter(value => value !== name)
      : [...prev, name]
    );
  };
  const chooseExtra = name => setExtras(prev =>
    prev.includes(name) ? prev.filter(value => value !== name) : [...prev, name]
  );
  const allCreams = creams.length === creamOptions.length;
  const allowSubmit = !needsSauce(product) || Boolean(sauce);

  const save = () => {
    if (!allowSubmit) return;
    onSave({
      product,
      quantity: count,
      notes,
      customizations: {
        ...(canChooseCreams(product) ? { Cremas: creams.length ? creams.join(', ') : 'Ninguna' } : {}),
        ...(extras.length ? { Extras: extras.join(', ') } : {}),
        ...(sauce ? { Salsa: sauce } : {}),
        ...(spice ? { Picante: spice } : {})
      },
      editingId: editingLine?.id || null
    });
  };

  return (
    <div className="dc-customize-backdrop">
      <section className="dc-customize-dialog dc-customize-sheet" role="dialog"
        aria-modal="true" aria-labelledby="dc-customize-title" aria-describedby="dc-customize-description">
        <div className="dc-sheet-scroll">
          <div className="dc-sheet-hero">
            {isDrink(product) ? (
              <div className="dc-sheet-drink" aria-hidden="true">🥤</div>
            ) : (
              <img src={platterCutout}
                width="480" height="315"
                decoding="async" alt={'Imagen ilustrativa de comida callejera; no corresponde necesariamente a ' + product.title}/>
            )}
            <button type="button" className="dc-sheet-dismiss" ref={closeButton}
              aria-label="Cerrar personalización del producto" onClick={onClose}><X size={22}/></button>
            {!isDrink(product) &&
              <span className="dc-sheet-photo-note">Fotografía ilustrativa</span>}
          </div>
          <div className="dc-sheet-product-desc">
            <strong>{money(product.price)}</strong>
            <h2 id="dc-customize-title">{product.title}</h2>
            <p id="dc-customize-description">{product.desc}</p>
          </div>

          {canChooseCreams(product) && (
            <fieldset className="dc-sheet-section" aria-labelledby="dc-creams-title">
              <div className="dc-sheet-section-heading">
                <div>
                  <h3 id="dc-creams-title">¿Qué cremas vas a querer?</h3>
                  <p>Selecciona las cremas que deseas en esta porción.</p>
                </div>
                <div className="dc-sheet-text-controls">
                  <button type="button" aria-pressed={allCreams}
                    onClick={() => setCreams([...creamOptions])}>Todas</button>
                  <span aria-hidden="true">·</span>
                  <button type="button" aria-pressed={!creams.length}
                    onClick={() => setCreams([])}>Ninguna</button>
                </div>
              </div>
              <div className="dc-sheet-option-grid">
                {creamOptions.map(name => (
                  <label key={name} className={'dc-sheet-choice' + (creams.includes(name) ? ' selected' : '')}>
                    <span>{name}</span>
                    <input type="checkbox" checked={creams.includes(name)}
                      onChange={() => chooseCream(name)} aria-label={name}/>
                    <span className="dc-check-visual" aria-hidden="true">
                      {creams.includes(name) && <Check size={14}/>}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {canChooseSauce(product) && (
            <fieldset className="dc-sheet-section">
              <legend>Salsa {needsSauce(product) ? '(obligatoria)' : '(opcional)'}</legend>
              <p>Elige la salsa para acompañar este platillo.</p>
              <div className="dc-sheet-option-grid">
                {sauces.map(name => (
                  <label key={name} className={'dc-sheet-choice' + (sauce === name ? ' selected' : '')}>
                    <span>{name}</span>
                    <input type="radio" name="dc-sauce" value={name}
                      checked={sauce === name} onChange={() => setSauce(name)}/>
                    <span className="dc-check-visual" aria-hidden="true">
                      {sauce === name && <Check size={14}/>}
                    </span>
                  </label>
                ))}
              </div>
              {needsSauce(product) && !sauce && <small className="dc-sheet-required">Elige una salsa para continuar.</small>}
            </fieldset>
          )}

          {product.id === 'broaster-spicy' && (
            <fieldset className="dc-sheet-section">
              <legend>¿Qué tan picante? (Opcional)</legend>
              <div className="dc-sheet-option-grid">
                {['Suave', 'Medio', 'Fuerte'].map(name => (
                  <label key={name} className={'dc-sheet-choice' + (spice === name ? ' selected' : '')}>
                    <span>{name}</span><input type="radio" name="dc-spice" checked={spice === name}
                      onChange={() => setSpice(name)} />
                    <span className="dc-check-visual" aria-hidden="true">{spice === name && <Check size={14}/>}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {canChooseExtras(product) && (
            <fieldset className="dc-sheet-section">
              <legend>Adicionales / Extras <span>(Opcional)</span></legend>
              <p>Suman a tu plato y se cobran por separado. Tarifas en USD por confirmar.</p>
              <div className="dc-sheet-option-grid">
                {extraOptions.map(option => (
                  <label key={option.id} className={'dc-sheet-choice' + (extras.includes(option.name) ? ' selected' : '')}>
                    <span>{option.name}<small>Precio por confirmar</small></span>
                    <input type="checkbox" checked={extras.includes(option.name)}
                      onChange={() => chooseExtra(option.name)}/>
                    <span className="dc-check-visual" aria-hidden="true">
                      {extras.includes(option.name) && <Check size={14}/>}
                    </span>
                  </label>
                ))}
              </div>
              {extras.length > 0 && (
                <p className="dc-sheet-notice">Los extras seleccionados no están incluidos en el precio estimado. El restaurante debe confirmar su importe.</p>
              )}
            </fieldset>
          )}

          <div className="dc-sheet-section dc-sheet-notes">
            <label htmlFor="dc-product-notes">Notas especiales para cocina <span>(Opcional)</span></label>
            <p>Indicaciones adicionales para la preparación.</p>
            <textarea id="dc-product-notes" maxLength={250} rows={2}
              value={notes} onChange={event => setNotes(event.target.value)}
              placeholder="Ej.: bien crocantes, cremas aparte, sin queso..."/>
          </div>
        </div>

        <footer className="dc-sheet-bottom">
          <div className="dc-sheet-stepper" aria-label="Cantidad">
            <button type="button" aria-label="Disminuir cantidad" disabled={count <= 1}
              onClick={() => setCount(n => Math.max(1, n - 1))}><Minus size={18}/></button>
            <span aria-live="polite">{count}</span>
            <button type="button" aria-label="Aumentar cantidad" disabled={count >= 50}
              onClick={() => setCount(n => Math.min(50, n + 1))}><Plus size={18}/></button>
          </div>
          <button type="button" className="dc-sheet-submit" disabled={!allowSubmit}
            onClick={save}>
            <span>{editingLine ? 'GUARDAR CAMBIOS' : 'AGREGAR AL PEDIDO'}</span>
            <strong>{money(product.price * count)}</strong>
          </button>
        </footer>
      </section>
    </div>
  );
}
