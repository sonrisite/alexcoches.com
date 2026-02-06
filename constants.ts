import { Car } from './types';

// Helper to format currency
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
};

// Helper to format numbers (km)
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('es-ES').format(num);
};

export const MOCK_CARS: Car[] = [
  {
    id: '1',
    make: 'Smart',
    model: 'Fortwo #3',
    year: 2014,
    price: 5500,
    km: 141000,
    fuel: 'Gasolina',
    transmission: 'Automática',
    power: 69,
    color: 'Blanco',
    bodyType: 'Urbano',
    images: [
      '/images/smart-fortwo/1.webp',
      '/images/smart-fortwo/2.webp',
      '/images/smart-fortwo/3.webp',
      '/images/smart-fortwo/4.webp',
      '/images/smart-fortwo/5.webp',
      '/images/smart-fortwo/6.webp',
      '/images/smart-fortwo/7.webp',
      '/images/smart-fortwo/8.webp',
    ],
    description: '¡El rey de la ciudad! Smart Fortwo (gen. 451) con fiable motor Mercedes. Estado impecable, ideal para moverte con agilidad y aparcar en cualquier sitio. Incluye 1 año de garantía, ITV hasta 2027 y ¡IVA deducible! Una oportunidad única.'
  },
  {
    id: '2',
    make: 'Renault',
    model: 'Megane',
    year: 2019,
    price: 7500,
    km: 225000,
    fuel: 'Gasolina',
    transmission: 'Manual',
    power: 132,
    color: 'Blanco',
    bodyType: 'Compacto',
    images: [
      '/images/renault-megane/1.webp',
      '/images/renault-megane/2.webp',
      '/images/renault-megane/3.webp',
      '/images/renault-megane/4.webp',
      '/images/renault-megane/5.webp',
      '/images/renault-megane/6.webp',
      '/images/renault-megane/7.webp',
      '/images/renault-megane/8.webp',
      '/images/renault-megane/9.webp',
      '/images/renault-megane/10.webp',
      '/images/renault-megane/11.webp',
      '/images/renault-megane/12.webp',
    ],
    description: 'Vehículo de un único propietario, con un mantenimiento exhaustivo que incluye la revisión de la cadena de distribución. Se encuentra en un estado excelente, prácticamente como nuevo. Ideal para quien busca fiabilidad y un coche bien cuidado a un precio competitivo.'
  },
  {
    id: '3',
    make: 'Seat',
    model: 'Altea',
    year: 2012,
    price: 5850,
    km: 165000,
    fuel: 'Gasolina',
    transmission: 'Manual',
    power: 125,
    color: 'Gris Plata',
    bodyType: 'Monovolumen',
    images: [
      '/images/seat-altea/1.webp',
      '/images/seat-altea/2.webp',
      '/images/seat-altea/3.webp',
      '/images/seat-altea/4.webp',
      '/images/seat-altea/5.webp',
      '/images/seat-altea/6.webp',
      '/images/seat-altea/7.webp',
      '/images/seat-altea/8.webp',
      '/images/seat-altea/9.webp',
      '/images/seat-altea/10.webp',
      '/images/seat-altea/11.webp',
      '/images/seat-altea/12.webp',
    ],
    description: 'Monovolumen seminuevo en excelente estado. Se entrega con una garantía completa de 1 año y una revisión exhaustiva recién realizada. Equipado con un fiable motor con cadena de distribución. Un vehículo espacioso y versátil, ideal para familias. ¡Un auténtico cochazo!'
  },
  {
    id: '4',
    make: 'Mercedes-Benz',
    model: 'Clase CLA',
    year: 2009,
    price: 14900,
    km: 145000,
    fuel: 'Gasolina',
    transmission: 'Automática',
    power: 156,
    color: 'Blanco',
    bodyType: 'Sedán',
    images: [
      '/images/mercedes-cla/1.webp',
      '/images/mercedes-cla/2.webp',
      '/images/mercedes-cla/3.webp',
      '/images/mercedes-cla/4.webp',
      '/images/mercedes-cla/5.webp',
      '/images/mercedes-cla/6.webp',
      '/images/mercedes-cla/7.webp',
      '/images/mercedes-cla/8.webp',
      '/images/mercedes-cla/9.webp',
      '/images/mercedes-cla/10.webp',
    ],
    description: 'Impecable Mercedes-Benz Clase CLA de un único propietario, cuidado con esmero y guardado siempre en garaje. Combina elegancia y deportividad con su cambio automático. Se entrega con 1 año de garantía para tu total tranquilidad.'
  },
  {
    id: '5',
    make: 'Smart',
    model: 'Fortwo #1',
    year: 2009,
    price: 3750,
    km: 132000,
    fuel: 'Gasolina',
    transmission: 'Automática',
    power: 69,
    color: 'Negro',
    bodyType: 'Urbano',
    images: [
      '/images/smart-fortwo-1/1.webp',
      '/images/smart-fortwo-1/2.webp',
      '/images/smart-fortwo-1/3.webp',
      '/images/smart-fortwo-1/4.webp',
      '/images/smart-fortwo-1/5.webp',
      '/images/smart-fortwo-1/6.webp',
      '/images/smart-fortwo-1/7.webp',
      '/images/smart-fortwo-1/8.webp',
      '/images/smart-fortwo-1/9.webp',
      '/images/smart-fortwo-1/10.webp',
    ],
    description: 'Smart con el fiable motor Mercedes, en un estado de conservación excelente. Perfecto para la ciudad por su agilidad y facilidad de aparcamiento. Se entrega con 1 año de garantía y la revisión recién hecha.'
  }
];

export const COMPANY_PHONE = "+34647606425";
export const COMPANY_WHATSAPP = "34647606425";