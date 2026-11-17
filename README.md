# 🍟 LA PATATA | Street Food CDMX

Versión de demostración preparada para **Ciudad de México** con precios en **dólares estadounidenses (USD)**.

## Funcionalidades
- Menú interactivo, búsqueda y filtros por categoría.
- Carrito con cantidades, subtotal y persistencia en localStorage.
- Checkout preparado para WhatsApp (habilitable con un número local real).
- Asistente FAQ Hércules, galería y diseño responsive.
- Animaciones con soporte para movimiento reducido.
- Despliegue React + Vite en GitHub Pages.

## Precios de referencia
Los precios originales se convirtieron de PEN a USD usando **1 PEN = 0.2928 USD**, tasa aproximada de referencia, redondeada a dos decimales. Son precios de muestra pendientes de aprobación para operaciones reales.

## Configurar para operar
Editar `src/data/businessInfo.js` con WhatsApp local (solo dígitos, formato internacional), dirección, horario, correo, mapa y perfiles sociales. Sin teléfono confirmado el carrito permite preparar pedidos, pero no enviarlos al restaurante original en Perú.

## Desarrollo
```bash
npm ci
npm run dev
npm run build
npm run preview
```

Se retiran los HTML antiguos de `public/` para no interferir con el despliegue generado desde `index.html` de la raíz.

Tecnologías: React 19 · Vite 8 · Tailwind CSS 3 · GitHub Actions y Pages.
