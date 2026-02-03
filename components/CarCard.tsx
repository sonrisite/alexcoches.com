import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Fuel, Gauge, Calendar, ArrowRight } from 'lucide-react';
import { Car } from '../types';
import { formatPrice, formatNumber } from '../constants';

interface CarCardProps {
  car: Car;
  index: number;
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50, 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 80, 
      damping: 15,
      mass: 1 
    }
  }
};

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div variants={cardVariants} className="h-full">
      <Link to={`/car/${car.id}`} className="block h-full perspective-1000">
        <motion.div
          className="group relative bg-white rounded-3xl overflow-hidden shadow-sm h-full border border-zinc-100 flex flex-col"
          whileHover={{ 
            y: -8, 
            shadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)",
            borderColor: "rgba(0,0,0,0.1)"
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Image Container with Placeholder Background */}
          <div className="relative aspect-[4/3] overflow-hidden bg-zinc-200">
            <motion.img
              src={car.images[0]}
              alt={`${car.make} ${car.model}`}
              className={`w-full h-full object-cover transition-opacity duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
            />
            
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Price Tag */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg z-10">
              <span className="block text-xl font-extrabold text-zinc-900 tracking-tight">
                {formatPrice(car.price)}
              </span>
            </div>

            {/* Year Tag */}
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-white border border-white/20">
              {car.year}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-grow relative">
            <div className="flex-grow">
              <h3 className="text-2xl font-black text-zinc-900 leading-tight mb-1 group-hover:text-indigo-600 transition-colors">
                {car.model}
              </h3>
              <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">{car.make}</p>
              
              <p className="text-zinc-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                {car.description}
              </p>
            </div>

            {/* Specs Grid */}
            <div className="flex justify-between items-center pt-4 border-t border-zinc-100 text-zinc-600 mb-2">
              <div className="flex items-center gap-1.5">
                <Gauge size={16} className="text-zinc-400" />
                <span className="text-xs font-bold">{formatNumber(car.km)} km</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Fuel size={16} className="text-zinc-400" />
                <span className="text-xs font-bold">{car.fuel}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={16} className="text-zinc-400" />
                <span className="text-xs font-bold">{car.year}</span>
              </div>
            </div>

            {/* Button Container */}
            <div className="h-12 w-full mt-2 relative overflow-hidden rounded-xl bg-zinc-50 group-hover:bg-zinc-100 transition-colors duration-300">
               {/* Default State */}
               <div className="absolute inset-0 flex items-center justify-center text-zinc-400 text-sm font-medium group-hover:opacity-0 transition-opacity duration-300">
                  Más información
               </div>

               {/* Hover State */}
               <div className="absolute inset-0 bg-black text-white flex items-center justify-center gap-2 font-bold text-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  Ver Detalles <ArrowRight size={16} />
               </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default CarCard;