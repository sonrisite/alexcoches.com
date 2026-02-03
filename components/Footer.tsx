import React from 'react';
import { Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contacto" className="bg-black border-t border-zinc-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Brand Logo */}
        <div className="mb-10 transform hover:scale-105 transition-transform duration-500">
          <img 
            src="/logo.png" 
            alt="AlexCoches" 
            className="h-24 w-auto object-contain"
          />
        </div>

        {/* Slogan & Value Proposition */}
        <div className="max-w-2xl mx-auto mb-12 space-y-4">
          <h3 className="text-2xl md:text-3xl font-light text-white tracking-wide">
            Calidad y confianza, <br />
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-200">
              para todos los conductores.
            </span>
          </h3>
          <p className="text-zinc-500 text-lg leading-relaxed font-light">
            Encontramos el vehículo que necesitas, sea cual sea tu presupuesto.
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-4xl mb-16">
          <a 
            href="tel:+34600123456" 
            className="group flex-1 w-full md:w-auto flex items-center justify-center gap-3 text-zinc-400 hover:text-white transition-all duration-300 px-8 py-4 rounded-2xl bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700"
          >
            <div className="p-2 bg-black rounded-full border border-zinc-800 group-hover:border-zinc-600 transition-colors">
              <Phone size={20} className="text-zinc-300 group-hover:text-white" />
            </div>
            <span className="font-medium text-lg">+34 600 123 456</span>
          </a>

          <a 
            href="mailto:info@alexcoches.com" 
            className="group flex-1 w-full md:w-auto flex items-center justify-center gap-3 text-zinc-400 hover:text-white transition-all duration-300 px-8 py-4 rounded-2xl bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700"
          >
             <div className="p-2 bg-black rounded-full border border-zinc-800 group-hover:border-zinc-600 transition-colors">
              <Mail size={20} className="text-zinc-300 group-hover:text-white" />
            </div>
            <span className="font-medium text-lg">info@alexcoches.com</span>
          </a>
        </div>

        {/* Divider */}
        <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent mb-8"></div>

        {/* Copyright */}
        <div className="w-full">
          <p className="text-zinc-600 text-sm font-medium">
            &copy; {new Date().getFullYear()} AlexCoches. Todos los derechos reservados.
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;