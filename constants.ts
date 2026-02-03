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
    make: 'Seat',
    model: 'Ibiza FR',
    year: 2021,
    price: 15900,
    km: 45000,
    fuel: 'Gasolina',
    transmission: 'Manual',
    power: 110,
    color: 'Rojo Desire',
    bodyType: 'Compacto',
    images: [
      'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1200&auto=format&fit=crop', // Red Car
      'https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=1200&auto=format&fit=crop', // Side
      'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=1200&auto=format&fit=crop', // Interior
    ],
    description: 'El compañero perfecto para la ciudad y carretera. Acabado FR deportivo, pantalla táctil con Apple CarPlay/Android Auto, faros Full LED y un consumo muy contenido. Ideal para el día a día.',
  },
  {
    id: '2',
    make: 'Toyota',
    model: 'Corolla Hybrid',
    year: 2022,
    price: 21500,
    km: 32000,
    fuel: 'Híbrido',
    transmission: 'Automática',
    power: 122,
    color: 'Blanco Perlado',
    bodyType: 'Compacto',
    images: [
      'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=1200&auto=format&fit=crop', // White Car
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=1200&auto=format&fit=crop', // Interior
      'https://images.unsplash.com/photo-1489824904134-891ab64532f1?q=80&w=1200&auto=format&fit=crop', // Another view
    ],
    description: 'Etiqueta ECO. Toyota Corolla Híbrido en estado impecable. Ahorra combustible sin renunciar al confort. Cámara trasera, control de crucero adaptativo y garantía oficial vigente.',
  },
  {
    id: '3',
    make: 'Peugeot',
    model: '3008 GT-Line',
    year: 2020,
    price: 24900,
    km: 58000,
    fuel: 'Diesel',
    transmission: 'Automática',
    power: 130,
    color: 'Gris Platinum',
    bodyType: 'SUV',
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop', // Grey Car
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1200&auto=format&fit=crop', // Side
      'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1200&auto=format&fit=crop', // Interior
    ],
    description: 'SUV moderno y espacioso. Acabado GT-Line con i-Cockpit digital, tapicería mixta piel/tela y techo panorámico. Motor diesel muy eficiente para viajes largos con toda la familia.',
  },
  {
    id: '4',
    make: 'BMW',
    model: 'Serie 3 320d',
    year: 2019,
    price: 28900,
    km: 85000,
    fuel: 'Diesel',
    transmission: 'Automática',
    power: 190,
    color: 'Azul Portimao',
    bodyType: 'Berlina',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980adade?q=80&w=1200&auto=format&fit=crop', // Blue BMW
      'https://images.unsplash.com/photo-1556189250-72ba954e9664?q=80&w=1200&auto=format&fit=crop', // Rear/Side
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1200&auto=format&fit=crop', // Interior
    ],
    description: 'Elegancia y deportividad. BMW Serie 3 con paquete M completo. Navegador profesional, asistentes a la conducción y un motor robusto y potente. Un coche premium a un precio accesible.',
  },
  {
    id: '5',
    make: 'Ford',
    model: 'Puma ST-Line',
    year: 2023,
    price: 22500,
    km: 12000,
    fuel: 'Gasolina',
    transmission: 'Manual',
    power: 125,
    color: 'Gris Magnetic',
    bodyType: 'SUV Compacto',
    images: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop', // Dark sporty car
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop', // Interior
      'https://images.unsplash.com/photo-1581659714859-f26830727c62?q=80&w=1200&auto=format&fit=crop', // Side
    ],
    description: 'Prácticamente nuevo (Km 0). Ford Puma con tecnología Mild-Hybrid (Etiqueta ECO). Maletero con MegaBox, cuadro digital y diseño deportivo ST-Line. Oportunidad única.',
  }
];

export const COMPANY_PHONE = "+34600123456";
export const COMPANY_WHATSAPP = "34600123456";