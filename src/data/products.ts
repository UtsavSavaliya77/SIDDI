import catalog from './products.json';
import type { ApplicationArea, Product, ProductFinish } from '../types';

export const FINISHES = catalog.finishes as ProductFinish[];
const downloadedDemoImages: Record<string, Record<string, string>> = {
  'door-handles-knobs': {
    'matte-black': '/Handle.jpg',
    'brushed-brass': '/brass-door-handle.jpg',
    'satin-steel': '/Handles.jpg',
    'polished-chrome': '/Handles.jpg',
    gunmetal: '/Knobs.jpg',
    'antique-bronze': '/Handles.jpg',
  },
  'door-hardware-accessories': {
    'matte-black': '/Flush Button.jpg',
    'brushed-brass': '/brass-door-handle.jpg',
    'satin-steel': '/Handles.jpg',
    'polished-chrome': '/Handles.jpg',
    gunmetal: '/Knobs.jpg',
    'antique-bronze': '/Handles.jpg',
  },
  'bathroom-accessories': {
    'matte-black': '/Matte Black Faucet.jpg',
    'brushed-brass': '/Brushed Gold Basin Faucet.jpg',
    'satin-steel': '/Bathroom Accessory Kit.jpg',
    'polished-chrome': '/Bathroom Accessory Kit.jpg',
    gunmetal: '/Matte Black Faucet.jpg',
    'antique-bronze': '/Brushed Gold Basin Faucet.jpg',
  },
  'towel-rails-holders': {
    'matte-black': '/bathroom kit.jpg',
    'brushed-brass': '/Bathroom Accessory Kit.jpg',
    'satin-steel': '/Bathroom Accessory Kit.jpg',
    'polished-chrome': '/Bathroom Accessory Kit.jpg',
    gunmetal: '/bathroom kit.jpg',
    'antique-bronze': '/Bathroom Accessory Kit.jpg',
  },
  'hooks-utility': {
    'matte-black': '/bathroom kit.jpg',
    'brushed-brass': '/Bathroom Accessory Kit.jpg',
    'satin-steel': '/Bathroom Accessory Kit.jpg',
    'polished-chrome': '/Bathroom Accessory Kit.jpg',
    gunmetal: '/bathroom kit.jpg',
    'antique-bronze': '/Bathroom Accessory Kit.jpg',
  },
  'architectural-hardware': {
    'matte-black': '/Handle.jpg',
    'brushed-brass': '/brass-door-handle.jpg',
    'satin-steel': '/Handles.jpg',
    'polished-chrome': '/Handles.jpg',
    gunmetal: '/Knobs.jpg',
    'antique-bronze': '/Handles.jpg',
  },
};

export const DEMO_PRODUCTS = (catalog.products as Product[]).map((product) => {
  const categoryImages = downloadedDemoImages[product.categorySlug] ?? downloadedDemoImages['door-handles-knobs'];
  const imagesByFinish = Object.fromEntries(product.finishes.map((finish) => [
    finish.id,
    product.imagesByFinish?.[finish.id] ?? categoryImages[finish.id] ?? product.images[0] ?? '/brass-door-handle.jpg',
  ]));

  return {
    ...product,
    imagesByFinish,
    images: product.images.length ? product.images : [...new Set(Object.values(imagesByFinish))],
  };
});
export const APPLICATION_AREAS = catalog.applications as ApplicationArea[];
