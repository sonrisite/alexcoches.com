import React from 'react';

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  offerPrice?: number;
  km: number;
  fuel: 'Gasolina' | 'Diesel' | 'Híbrido' | 'Eléctrico';
  transmission: 'Automática' | 'Manual';
  power: number; // CV
  color: string;
  bodyType: string;
  images: string[];
  description: string;
}

export type IconProps = React.SVGProps<SVGSVGElement>;