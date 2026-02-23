import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-[30vh] md:min-h-[40vh] w-full overflow-hidden flex items-center justify-center bg-black pt-16 md:pt-20">
      {/* Background with focused car image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1920&auto=format&fit=crop"
          alt="Coches de Ocasión"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
      </div>

      {/* Ultra-Compact Content */}
      <motion.div 
        className="relative z-10 text-center px-4 max-w-5xl mx-auto py-6 md:py-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2">
          Encuentra tu próximo <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-200">
            coche ideal
          </span>
        </h1>
        
        <p className="text-sm md:text-lg text-zinc-500 max-w-xl mx-auto font-medium">
          Calidad certificada y transparencia total.
        </p>
      </motion.div>
    </div>
  );
};

export default Hero;