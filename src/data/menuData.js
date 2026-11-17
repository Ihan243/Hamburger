export const menuCategories = [
  { id: 'all', label: '★ Lo Más Pedido' },
  { id: 'salchipapas', label: 'Salchipapas & Bowls' },
  { id: 'broaster', label: 'Pollo Broaster' },
  { id: 'crunch', label: 'Alitas & Crunch' },
  { id: 'boxes', label: 'Boxes & Barco' },
  { id: 'bebidas', label: 'Bebidas' },
  { id: 'toda', label: 'Toda la Carta' }
];

export const specialties = [
  {
    id: 'salchi-patata',
    title: 'SALCHI PATATA',
    price: 7.32,
    desc: 'Papas fritas nativas + hot dog + chorizo parrillero ahumado + trozos crujientes de pollo broaster.',
    badge: 'Identidad de la Casa',
    image: `${import.meta.env.BASE_URL}images/salchipapa-dish.png`,
    featured: false
  },
  {
    id: 'salchi-fest',
    title: 'SALCHI FEST XL',
    price: 8.20,
    desc: 'Papas fritas + hot dog + chorizo parrillero + trozos de pollo broaster + espectacular volcán de queso fundido.',
    badge: '★ La Más Pedida',
    image: `${import.meta.env.BASE_URL}images/salchipapa-dish.png`,
    featured: true
  },
  {
    id: 'broaster-clasico-xl',
    title: 'BROASTER CLÁSICO XL',
    price: 7.03,
    desc: 'Pollo broaster marinado crocante con receta de la casa, porción contundente de papas fritas nativas y cremas caseras.',
    badge: 'Porción Generosa',
    image: `${import.meta.env.BASE_URL}images/salchipapa-dish.png`,
    featured: false
  }
];

export const boatDish = {
  id: 'barco-la-patata',
  title: 'BARCO LA PATATA',
  subtitle: '⛵ EXPERIENCIA MONUMENTAL · 60 CM',
  price: 33.67,
  desc: 'Servido en un auténtico barco plano de madera de ~60 cm. La experiencia insuperable para cumpleaños, bajonas épicas y reuniones: ~800g papas nativas crujientes, 6 piezas broaster, 12 alitas en salsas, 8 boneless, 4 tenders, 1 porción salchipapa clásica y pocillos de salsas de la casa.',
  categories: ['boxes', 'all']
};

export const menuItems = [
  {
    id: 'salchi-fest',
    title: 'Salchi Fest',
    price: 8.20,
    categories: ['salchipapas', 'all'],
    badge: '¡Bomba Favorita!',
    badgeType: 'orange',
    desc: 'Papas fritas + hot dog + chorizo parrillero + trozos de pollo broaster + abundante queso fundido.',
    tags: 'salchi fest bomba queso fundido chorizo broaster salchipapa'
  },
  {
    id: 'broaster-clasico',
    title: 'Broaster Clásico',
    price: 5.27,
    categories: ['broaster', 'all'],
    badge: 'Clásico de Oro',
    badgeType: 'yellow',
    desc: 'Pollo broaster marinado crocante con papas fritas nativas con piel y cremas caseras.',
    tags: 'broaster clasico pollo papas cremas fritura'
  },
  {
    id: 'salchi-patata',
    title: 'Salchi Patata',
    price: 7.32,
    categories: ['salchipapas', 'all'],
    badge: 'Identidad de la Casa',
    badgeType: 'purple',
    desc: 'Papas fritas + hot dog frankfurter + chorizo parrillero ahumado + trozos crujientes de pollo broaster.',
    tags: 'salchi patata chorizo broaster frankfurter salchipapa'
  },
  {
    id: 'alitas-crocantes',
    title: 'Alitas Crocantes (6 pcs)',
    price: 6.15,
    categories: ['crunch', 'all'],
    badge: 'Salsas a Elección',
    badgeType: 'orange',
    desc: '6 unidades crujientes bañadas en tu salsa favorita (BBQ, chimichurri o picante) servidas con papas nativas.',
    tags: 'alitas crocantes salsas bbq bufalo chimichurri picante maracuya'
  },
  {
    id: 'wrap-especial',
    title: 'Wrap Especial',
    price: 5.27,
    categories: ['broaster', 'all'],
    badge: 'Recomendado',
    badgeType: 'yellow',
    desc: 'Tortilla suave + pulpa broaster deshuesada + delicioso queso derretido + tocino crocante ahumado.',
    tags: 'wrap especial queso tocino broaster tortilla'
  },
  {
    id: 'box-hercules',
    title: 'Box Hércules (Combo Estrella)',
    price: 18.15,
    categories: ['boxes', 'all'],
    badge: 'Para Compartir',
    badgeType: 'yellow',
    desc: '1 Wrap clásico + 4 tenders + 4 boneless + 8 alitas en salsa + papas fritas nativas + 1 Pepsi de 1L helada.',
    tags: 'box hercules combo familiar pepsi wrap tenders boneless alitas'
  },
  {
    id: 'barco-la-patata',
    title: 'Barco La Patata (~60cm)',
    price: 33.67,
    categories: ['boxes', 'all'],
    badge: 'Monumental 60cm',
    badgeType: 'orange',
    desc: 'Auténtico barco de madera de ~60 cm con ~800g papas nativas, 6 broaster, 12 alitas, 8 boneless, 4 tenders y salsas.',
    tags: 'barco la patata gigante fiesta amigos combo alitas broaster'
  },
  {
    id: 'broaster-clasico-xl',
    title: 'Broaster Clásico XL',
    price: 7.03,
    categories: ['broaster'],
    badge: 'Porción Generosa',
    badgeType: 'purple',
    desc: 'Pollo broaster marinado crocante con receta de la casa, porción contundente de papas fritas nativas y cremas caseras.',
    tags: 'broaster clasico xl gigante pollo papas'
  },
  {
    id: 'salchipapa-clasica',
    title: 'Salchipapa Clásica',
    price: 4.68,
    categories: ['salchipapas'],
    badge: null,
    desc: 'Base de papas nativas doradas al momento, hot dog frankfurter laminado y cremas caseras.',
    tags: 'salchipapa clasica papas doradas frankfurter tradicional'
  },
  {
    id: 'salchi-cheese',
    title: 'Salchi Cheese',
    price: 5.86,
    categories: ['salchipapas'],
    badge: 'Queso Extra',
    badgeType: 'yellow',
    desc: 'Papas fritas con piel, hot dog frankfurter y abundante manto de queso derretido por encima.',
    tags: 'salchi cheese queso derretido fundido queso'
  },
  {
    id: 'salchipollo-broaster',
    title: 'Salchipollo Broaster',
    price: 5.86,
    categories: ['salchipapas', 'broaster'],
    badge: null,
    desc: 'Papas fritas crujientes con hot dog y presa dorada y crocante de pollo broaster.',
    tags: 'salchipollo broaster presa dorada pollo salchipapa'
  },
  {
    id: 'arma-tu-bowl',
    title: 'Arma tu Bowl Personalizado',
    price: 4.39,
    categories: ['salchipapas'],
    badge: 'Crea el Tuyo',
    badgeType: 'purple',
    desc: 'Base: Papas fritas nativas + frankfurter laminado + cremas. Puedes agregarle hasta 14 adicionales.',
    tags: 'arma tu bowl personalizado papas toppings adicionales'
  },
  {
    id: 'broaster-spicy',
    title: 'Broaster Picante Spicy 🔥',
    price: 5.56,
    categories: ['broaster'],
    badge: 'Hot Street',
    badgeType: 'orange',
    desc: 'Piezas crocantes con marinado especial picante callejero + papas nativas con piel + cremas caseras.',
    tags: 'broaster picante spicy aji rocoto caliente fuego'
  },
  {
    id: 'boneless-pechuga',
    title: 'Boneless de Pechuga (6 unid)',
    price: 5.56,
    categories: ['crunch'],
    badge: null,
    desc: 'Bocados tiernos y sin hueso, bien empanizados y bañados en salsa artesanal a elección con papas.',
    tags: 'boneless pechuga salsa bbq chimichurri tenders'
  },
  {
    id: 'tenders-crocantes',
    title: 'Tenders Ultra Crocantes (3 unid)',
    price: 3.51,
    categories: ['crunch'],
    badge: null,
    desc: 'Filetes de pechuga crocantes empanizados servidos con porción de papas nativas y salsas caseras.',
    tags: 'tenders de pechuga filetes crocante pollo'
  },
  {
    id: 'box-chester',
    title: 'Box Chester',
    price: 12.88,
    categories: ['boxes'],
    badge: 'Combo Dúo',
    badgeType: 'yellow',
    desc: '4 piezas de pollo broaster + 4 alitas con salsa + porción generosa de papas + 1 Pepsi de 1 Litro.',
    tags: 'box chester combo piezas broaster alitas pepsi'
  },
  {
    id: 'limonada-frozen',
    title: 'Limonada Frozen',
    price: 2.64,
    categories: ['bebidas', 'all'],
    badge: 'Helada Frappé',
    badgeType: 'yellow',
    desc: 'Frappé helado ultra refrescante batido en licuadora al instante con limones frescos del norte.',
    tags: 'limonada frozen frappe refrescante bebidas helada'
  },
  {
    id: 'limonada-electrica',
    title: 'Limonada Eléctrica (Autor)',
    price: 2.93,
    categories: ['bebidas'],
    badge: 'Especial Azul',
    badgeType: 'purple',
    desc: 'Twist cítrico refrescante de la casa con un toque de jarabe azul sin alcohol.',
    tags: 'limonada electrica blue curacao bebidas azul'
  },
  {
    id: 'chicha-morada',
    title: 'Chicha Morada Tradicional',
    price: 2.05,
    categories: ['bebidas'],
    badge: '100% Artesanal',
    badgeType: 'purple',
    desc: 'Hervida con maíz morado, piña, manzana, membrillo y canela clavo. Receta auténtica casera.',
    tags: 'chicha morada tradicional casera bebidas maiz'
  },
  {
    id: 'gaseosa-500ml',
    title: 'Gaseosa Helada 500ml',
    price: 1.46,
    categories: ['bebidas'],
    badge: null,
    desc: 'Botella personal bien helada: Inca Kola, Pepsi, 7Up o Concordia.',
    tags: 'gaseosa inca kola pepsi soda bebida helada'
  }
];

export const galleryItems = [
  {
    title: "Sabor callejero auténtico",
    tag: "Ciudad de México",
    image: `${import.meta.env.BASE_URL}images/salchipapa-dish.png`
  },
  {
    title: "Hércules guardián del sabor",
    tag: "Mascota Oficial",
    image: `${import.meta.env.BASE_URL}images/hercules-mascot.png`
  },
  {
    title: "Directo de la sartén a tu boca",
    tag: "#PapasConActitud",
    image: `${import.meta.env.BASE_URL}images/salchipapa-dish.png`
  }
];
