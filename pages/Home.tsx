import React, { useRef } from 'react';
import Hero from '../components/Hero';
import CarCard from '../components/CarCard';
import { MOCK_CARS } from '../constants';
import { motion, useScroll, useTransform } from 'framer-motion';

const Home: React.FC = () => {
  const containerRef = useRef(null);
  
  // Smoother scroll progress mapping
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Faster stagger for snappier feel
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Hero />
      
      <section id="catalogo" className="py-24 bg-white relative overflow-hidden" ref={containerRef}>
        
        {/* Parallax Background - Z-index 0 to stay behind */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <motion.div 
            style={{ y: y1 }}
            className="absolute top-0 -left-64 w-[500px] h-[500px] bg-zinc-100 rounded-full blur-[100px] opacity-60 mix-blend-multiply" 
          />
          <motion.div 
            style={{ y: y2 }}
            className="absolute bottom-0 -right-64 w-[600px] h-[600px] bg-zinc-200 rounded-full blur-[120px] opacity-60 mix-blend-multiply" 
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-zinc-900 mb-6 tracking-tight">
                Vehículos Destacados
              </h2>
            </motion.div>

            <motion.div 
              className="h-1.5 w-32 bg-black mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "circOut" }}
            />

            <motion.p 
              className="mt-6 text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Explora nuestra variedad de coches. Desde utilitarios eficientes hasta berlinas familiares, todos con garantía.
            </motion.p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -100px 0px" }} // Trigger earlier to avoid blank space
          >
            {MOCK_CARS.map((car, index) => (
              <CarCard key={car.id} car={car} index={index} />
            ))}
          </motion.div>
          
        </div>
      </section>
    </div>
  );
};

export default Home;