import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Phone, MessageCircle, Calendar, Gauge, Fuel, Zap, Settings, ArrowLeft } from 'lucide-react';
import { MOCK_CARS, formatPrice, formatNumber, COMPANY_PHONE, COMPANY_WHATSAPP } from '../constants';
import CarCard from '../components/CarCard';

const CarDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const car = MOCK_CARS.find(c => c.id === id);
  
  // Related cars (excluding current)
  const relatedCars = MOCK_CARS.filter(c => c.id !== id).slice(0, 3);

  useEffect(() => {
    // Reset scroll and index when entering page or changing car
    window.scrollTo(0, 0);
    setCurrentImageIndex(0);
  }, [id]);

  if (!car) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-zinc-900 mb-4">Coche no encontrado</h2>
          <button 
            onClick={() => navigate('/')}
            className="text-zinc-500 hover:text-black underline"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  const contactWhatsapp = `https://wa.me/${COMPANY_WHATSAPP}?text=Hola, estoy interesado en el ${car.make} ${car.model} (ID: ${car.id})`;

  return (
    <div className="min-h-screen bg-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-zinc-500 hover:text-black mb-6 transition-colors font-medium"
        >
          <ArrowLeft size={20} className="mr-2" />
          Volver al catálogo
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column: Gallery */}
          <div className="space-y-4">
            {/* Main Image Container */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-200 shadow-xl border border-zinc-200">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={currentImageIndex}
                  src={car.images[currentImageIndex]}
                  alt={`${car.make} ${car.model} view ${currentImageIndex + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </AnimatePresence>
              
              {/* Controls */}
              <button 
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-lg transition-all z-20 cursor-pointer"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-lg transition-all z-20 cursor-pointer"
              >
                <ChevronRight size={24} />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                {car.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-1.5 rounded-full transition-all shadow-sm cursor-pointer ${
                      idx === currentImageIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80 w-4'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-4">
              {car.images.map((img, idx) => (
                <ThumbnailButton 
                  key={`${car.id}-thumb-${idx}`}
                  src={img} 
                  isActive={idx === currentImageIndex}
                  onClick={() => setCurrentImageIndex(idx)}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Info & Specs */}
          <div>
            <div className="mb-2">
              <span className="text-zinc-600 font-bold tracking-wider text-sm border border-zinc-300 px-2 py-1 rounded uppercase">{car.make}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-4">{car.model}</h1>
            <div className="text-3xl font-bold text-zinc-900 mb-8 flex items-baseline gap-2">
              {formatPrice(car.price)}
              <span className="text-lg text-zinc-500 font-normal">Contado</span>
            </div>

            {/* Description */}
            <div className="mb-8 prose prose-zinc">
              <h3 className="text-xl font-bold text-zinc-900 mb-3">Descripción</h3>
              <p className="text-zinc-600 leading-relaxed">
                {car.description}
              </p>
            </div>

            {/* Quick Specs Grid - Light Theme */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 flex items-center space-x-3 hover:border-zinc-300 transition-colors">
                <Calendar className="text-zinc-800" size={20} />
                <div>
                  <p className="text-xs text-zinc-500 uppercase font-semibold">Año</p>
                  <p className="font-bold text-zinc-900">{car.year}</p>
                </div>
              </div>
              <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 flex items-center space-x-3 hover:border-zinc-300 transition-colors">
                <Gauge className="text-zinc-800" size={20} />
                <div>
                  <p className="text-xs text-zinc-500 uppercase font-semibold">Kilómetros</p>
                  <p className="font-bold text-zinc-900">{formatNumber(car.km)} km</p>
                </div>
              </div>
              <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 flex items-center space-x-3 hover:border-zinc-300 transition-colors">
                <Fuel className="text-zinc-800" size={20} />
                <div>
                  <p className="text-xs text-zinc-500 uppercase font-semibold">Combustible</p>
                  <p className="font-bold text-zinc-900">{car.fuel}</p>
                </div>
              </div>
              <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 flex items-center space-x-3 hover:border-zinc-300 transition-colors">
                <Settings className="text-zinc-800" size={20} />
                <div>
                  <p className="text-xs text-zinc-500 uppercase font-semibold">Cambio</p>
                  <p className="font-bold text-zinc-900">{car.transmission}</p>
                </div>
              </div>
              <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 flex items-center space-x-3 hover:border-zinc-300 transition-colors">
                <Zap className="text-zinc-800" size={20} />
                <div>
                  <p className="text-xs text-zinc-500 uppercase font-semibold">Potencia</p>
                  <p className="font-bold text-zinc-900">{car.power} CV</p>
                </div>
              </div>
              <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 flex items-center space-x-3 hover:border-zinc-300 transition-colors">
                <div className="w-5 h-5 rounded-full border border-zinc-300 shadow-sm" style={{ backgroundColor: car.color === 'Blanco' ? '#fff' : car.color === 'Negro' ? '#000' : '#888' }}></div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase font-semibold">Color</p>
                  <p className="font-bold text-zinc-900">{car.color}</p>
                </div>
              </div>
            </div>

            {/* Contact Buttons */}
            <div className="sticky bottom-4 z-20 flex flex-col sm:flex-row gap-4 bg-white/80 backdrop-blur-md p-4 sm:p-0 rounded-2xl sm:bg-transparent">
              <a 
                href={`tel:${COMPANY_PHONE}`}
                className="flex-1 bg-black hover:bg-zinc-800 text-white py-4 rounded-xl font-bold flex items-center justify-center transition-all shadow-lg hover:shadow-xl"
              >
                <Phone className="mr-2" />
                Llamar
              </a>
              <a 
                href={contactWhatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-white hover:bg-zinc-50 text-black py-4 rounded-xl font-bold flex items-center justify-center transition-all border border-zinc-300 shadow-md hover:shadow-lg"
              >
                <MessageCircle className="mr-2" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Related Cars */}
        <div className="border-t border-zinc-200 pt-16">
          <h2 className="text-2xl font-bold text-zinc-900 mb-8">También te podría interesar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedCars.map((relatedCar, idx) => (
              <CarCard key={relatedCar.id} car={relatedCar} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Internal Component for individual thumbnails to manage their own load state
const ThumbnailButton: React.FC<{ src: string; isActive: boolean; onClick: () => void }> = ({ src, isActive, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <button
      onClick={onClick}
      className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-zinc-200 ${
        isActive ? 'border-black opacity-100' : 'border-transparent opacity-70 hover:opacity-100'
      }`}
    >
      <img 
        src={src} 
        alt="thumbnail" 
        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      />
    </button>
  );
};

export default CarDetail;