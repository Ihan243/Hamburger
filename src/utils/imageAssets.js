import { HAS_OPTIMIZED_IMAGES } from '../generated/assetVariants.js';
const root = import.meta.env.BASE_URL + 'images/';
export const foodImage = root + 'salchipapa-dish.' + (HAS_OPTIMIZED_IMAGES ? 'webp' : 'png');
export const mascotImage = root + 'hercules-mascot.' + (HAS_OPTIMIZED_IMAGES ? 'webp' : 'png');
export const foodImageSrcSet = HAS_OPTIMIZED_IMAGES
  ? root + 'salchipapa-dish-480.webp 480w, ' + root + 'salchipapa-dish.webp 960w'
  : undefined;
