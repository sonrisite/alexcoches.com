import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Parallax effect: moves the background image slower than scroll
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  // Subtle scale effect on scroll
  const scale = useTransform(scrollY, [0, 1000], [1, 1.2]);
  // Fade out slightly as you scroll
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black"
    >
      {/* Parallax Background Image - Changed to a more generic but nice car image */}
      <motion.div
        style={{ y, scale, opacity }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1920&auto=format&fit=crop"
          alt="Coches de Ocasión"
          className="w-full h-full object-cover opacity-60"
        />
        
        {/* Cinematic Layering */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 drop-shadow-2xl">
          Tu próximo coche <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-200 animate-gradient">
            al mejor precio
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-zinc-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-lg text-shadow-sm">
          Turismos, SUVs y familiares. Revisados, garantizados y listos para ti.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <motion.button
            onClick={() => scrollToSection('catalogo')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] cursor-pointer"
          >
            Ver Stock Disponible
          </motion.button>
          
          <motion.button
            onClick={() => scrollToSection('contacto')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-transparent border-2 border-zinc-500 text-white rounded-full font-bold text-lg hover:bg-white/10 hover:border-white transition-colors backdrop-blur-sm cursor-pointer"
          >
            Consultar Financiación
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;