// Configuración visible al cliente. Los recargos de extras siguen pendientes
// de confirmación por el restaurante; NO se suman al total estimado.
export const creamOptions = [
  'Mayonesa', 'Kétchup', 'Mostaza', 'Tártara', 'Ají Pollero',
  'Golf', 'Aceituna', 'Rocoto Carretillero', 'Chimichurri'
];

export const extraOptions = [
  { id: 'queso', name: 'Porción de Queso', price: null },
  { id: 'huevo', name: 'Huevo Frito Montado', price: null },
  { id: 'salchicha', name: 'Salchicha Frankfurter Extra', price: null },
  { id: 'chorizo', name: 'Chorizo Parrillero Extra', price: null },
  { id: 'tocino', name: 'Tocino Ahumado Extra', price: null },
  { id: 'tender', name: 'Tender de Pollo Extra', price: null }
];

export const sauces = ['BBQ', 'Chimichurri', 'Picante'];

export const isDrink = item => item?.categories?.includes('bebidas') || false;

export const needsSauce = item =>
  ['alitas-crocantes', 'boneless-pechuga'].includes(item?.id);

export const canChooseSauce = item =>
  needsSauce(item) || ['tenders-crocantes','broaster-clasico','broaster-clasico-xl'].includes(item?.id);

export const canChooseCreams = item => item && !isDrink(item);

export const canChooseExtras = item =>
  item && !isDrink(item) && !item.categories?.includes('boxes');
