import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CLOUDINARY_BASE_URL } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    // Si ya estamos en la home, hacemos scroll hacia arriba
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md shadow-lg border-b border-zinc-800'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Redirige a la home y sube scroll */}
          <Link 
            to="/" 
            onClick={handleLogoClick}
            className="flex items-center cursor-pointer"
          >
            <img 
              src={`${CLOUDINARY_BASE_URL}logo.png`} 
              alt="ALEXCOCHES" 
              className="h-8 md:h-12 w-auto object-contain transition-transform hover:scale-105 active:scale-95"
            />
          </Link>

          {/* Contact Button - Always visible, direct access */}
          <div className="flex items-center">
            <button 
              onClick={scrollToContact}
              className="bg-white hover:bg-zinc-200 text-black px-4 py-1.5 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-black uppercase tracking-tight transition-all transform hover:scale-105 shadow-lg cursor-pointer active:scale-95"
            >
              Contacto
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;