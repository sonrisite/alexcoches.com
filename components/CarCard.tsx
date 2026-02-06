import React, { useState, useEffect } from 'react';
// FIX: Import Variants type from framer-motion
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Fuel, Gauge, Calendar, ArrowRight } from 'lucide-react';
import { Car } from '../types';
import { formatPrice, formatNumber } from '../constants';

interface CarCardProps {
  car: Car;
  index: number;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animación suave de entrada solo cuando aparece en el viewport
  // FIX: Explicitly type cardVariants with Variants to resolve TypeScript error with the 'ease' property.
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: "easeOut" } 
    }
  };

  return (
    <motion.div 
      variants={cardVariants} 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="h-full"
    >
      <Link to={`/car/${car.id}`} className="block h-full">
        <motion.div
          className="group relative bg-white rounded-3xl overflow-hidden shadow-sm h-full border border-zinc-100 flex flex-col transition-all duration-300"
          // Elevación solo en escritorio
          whileHover={!isMobile ? { 
            y: -8, 
            boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.1)",
            borderColor: "rgba(0,0,0,0.08)"
          } : {}}
        >
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
            <motion.img
              src={car.images[0]}
              alt={`${car.make} ${car.model}`}
              className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              // Escala solo en escritorio
              whileHover={!isMobile ? { scale: 1.08 } : {}}
              transition={{ duration: 0.6 }}
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
            />
            
            {/* Price Tag */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg z-10">
              <span className="block text-xl font-extrabold text-zinc-900 tracking-tight">
                {formatPrice(car.price)}
              </span>
            </div>

            {/* Year Tag */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black text-white border border-white/10 uppercase tracking-widest">
              {car.year}
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-grow">
            <div className="flex-grow">
              <h3 className="text-xl md:text-2xl font-black text-zinc-900 leading-tight mb-1">
                {car.model}
              </h3>
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">{car.make}</p>
              
              <p className="text-zinc-500 text-xs md:text-sm mb-5 line-clamp-2 leading-relaxed">
                {car.description}
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-3 gap-1 pt-4 border-t border-zinc-50 text-zinc-500 mb-4">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1 mb-0.5">
                  <Gauge size={12} className="text-zinc-300" />
                  <span className="text-[9px] font-bold uppercase tracking-tighter text-zinc-400">Km</span>
                </div>
                <span className="text-xs font-black text-zinc-800">{formatNumber(car.km)}</span>
              </div>
              <div className="flex flex-col items-start border-x border-zinc-50 px-2">
                <div className="flex items-center gap-1 mb-0.5">
                  <Fuel size={12} className="text-zinc-300" />
                  <span className="text-[9px] font-bold uppercase tracking-tighter text-zinc-400">Motor</span>
                </div>
                <span className="text-xs font-black text-zinc-800">{car.fuel}</span>
              </div>
              <div className="flex flex-col items-start pl-2">
                <div className="flex items-center gap-1 mb-0.5">
                  <Calendar size={12} className="text-zinc-300" />
                  <span className="text-[9px] font-bold uppercase tracking-tighter text-zinc-400">Año</span>
                </div>
                <span className="text-xs font-black text-zinc-800">{car.year}</span>
              </div>
            </div>

            {/* Button Container - Simplificado para móvil */}
            <div className="h-11 w-full relative overflow-hidden rounded-xl bg-black text-white flex items-center justify-center gap-2 font-bold text-xs transition-colors active:bg-zinc-800 md:bg-zinc-50 md:text-zinc-400 md:font-medium">
               
               {/* En escritorio (md) mostramos el efecto de intercambio */}
               <div className="hidden md:flex absolute inset-0 items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
                  Más información
               </div>

               <div className="hidden md:flex absolute inset-0 bg-black text-white items-center justify-center gap-2 font-bold translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  Ver Detalles <ArrowRight size={14} />
               </div>

               {/* En móvil mostramos el estado final directamente para mejor rendimiento */}
               <div className="flex md:hidden items-center justify-center gap-2">
                  Ver Detalles <ArrowRight size={14} />
               </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default CarCard;