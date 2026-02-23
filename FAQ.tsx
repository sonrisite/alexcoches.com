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
      question: "¿Cuántos dueños ha tenido el coche?",
      answer: "Nuestra selección de vehículos destaca por su trazabilidad. La mayoría de nuestros coches han tenido un solo propietario, y como máximo dos, lo que garantiza un mejor cuidado y conocimiento de su historial."
    },
    {
      question: "¿El coche tiene garantía?",
      answer: "Sí, por ley todos nuestros vehículos cuentan con un año de garantía incluido. Además, para tu total tranquilidad, ofrecemos la posibilidad de ampliarla de forma personalizada."
    },
    {
      question: "¿En qué estado se entregan los coches?",
      answer: "La seguridad es nuestra prioridad. Cada unidad se entrega tras superar una exhaustiva revisión mecánica donde realizamos una puesta a punto completa para que no tengas que preocuparte por nada."
    },
    {
      question: "¿Ofrecéis opciones de financiación?",
      answer: "¡Por supuesto! Queremos facilitarte la compra, por lo que existe la posibilidad de financiar el vehículo con condiciones adaptadas a tus necesidades. Consulta con nosotros para obtener un estudio a tu medida."
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