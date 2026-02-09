import React, { useState, useEffect } from 'react';
// FIX: Import Variants type from framer-motion to correctly type animation variants.
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: string[];
  startIndex: number;
  onClose: () => void;
}

// FIX: Explicitly type with Variants to resolve TypeScript error.
const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// FIX: Explicitly type with Variants to resolve TypeScript error with the 'ease' property.
const imageVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { scale: 0.8, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
};

const Lightbox: React.FC<LightboxProps> = ({ images, startIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [images.length, onClose]);


  return (
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      aria-modal="true"
      role="dialog"
    >
      {/* Close Button */}
      <button 
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
        aria-label="Cerrar galería"
      >
        <X size={32} />
      </button>

      {/* Prev Button */}
      <button
        onClick={prevImage}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all z-10"
        aria-label="Imagen anterior"
      >
        <ChevronLeft size={32} />
      </button>
      
      {/* Image Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            alt={`Imagen ${currentIndex + 1} de ${images.length}`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
          />
        </AnimatePresence>
      </div>

      {/* Next Button */}
      <button
        onClick={nextImage}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all z-10"
        aria-label="Siguiente imagen"
      >
        <ChevronRight size={32} />
      </button>

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
        {currentIndex + 1} / {images.length}
      </div>

    </motion.div>
  );
};

export default Lightbox;