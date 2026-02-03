import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="mb-4">
      <button
        onClick={onClick}
        className={`w-full p-6 flex items-center justify-between text-left focus:outline-none transition-all duration-300 rounded-2xl border ${
          isOpen 
            ? 'bg-white border-zinc-300 shadow-md' 
            : 'bg-zinc-100/50 border-transparent hover:bg-zinc-100'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-lg transition-colors ${isOpen ? 'bg-black text-white' : 'bg-zinc-200 text-zinc-500'}`}>
            <HelpCircle size={20} />
          </div>
          <span className={`text-lg font-bold tracking-tight transition-colors ${isOpen ? 'text-black' : 'text-zinc-700'}`}>
            {question}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "circOut" }}
          className={isOpen ? 'text-black' : 'text-zinc-400'}
        >
          <ChevronDown size={24} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-16 pb-8 pt-4 text-zinc-600 leading-relaxed text-lg border-x border-b border-zinc-100 rounded-b-2xl -mt-2 bg-white/50">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "¿Qué garantía tienen vuestros coches?",
      answer: "Todos nuestros vehículos incluyen una garantía mecánica completa de un mínimo de 12 meses. Además, cada coche pasa por una revisión de más de 100 puntos críticos antes de su entrega para tu total tranquilidad."
    },
    {
      question: "¿Aceptáis mi coche actual como parte de pago?",
      answer: "¡Por supuesto! Tasamos tu vehículo en el acto de forma gratuita. El valor obtenido se descontará directamente del precio de tu nuevo coche, facilitando así el cambio de vehículo."
    },
    {
      question: "¿Realizáis envíos a toda España?",
      answer: "Sí, ofrecemos servicio de entrega a domicilio en toda la península. Consulta con nuestro equipo las condiciones y plazos según tu ubicación."
    },
    {
      question: "¿Los kilómetros de los coches son reales?",
      answer: "Absolutamente. Certificamos por contrato el kilometraje y la ausencia de daños estructurales en todos nuestros vehículos. La transparencia es la base de AlexCoches."
    }
  ];

  return (
    <section className="py-24 bg-white relative z-10 border-t border-zinc-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 text-zinc-600 text-sm font-bold uppercase tracking-widest mb-6"
          >
            <MessageSquare size={14} /> Soporte y Ayuda
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-zinc-900 mb-4 tracking-tight">
            Preguntas Frecuentes
          </h2>
          <p className="text-zinc-500 text-lg font-medium">
            Todo lo que necesitas saber antes de estrenar tu nuevo coche.
          </p>
        </div>

        <div className="relative">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
        
        <div className="mt-16 p-8 rounded-3xl bg-zinc-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold mb-1">¿Aún tienes alguna duda?</h4>
            <p className="text-zinc-400">Nuestro equipo está listo para ayudarte en lo que necesites.</p>
          </div>
          <button 
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer"
          >
            Contactar ahora
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;