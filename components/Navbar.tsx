import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const scrollToContact = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-black/90 backdrop-blur-md shadow-lg border-b border-zinc-800'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Requires 'logo.png' in the public folder */}
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="ALEXCOCHES" 
              className="h-10 md:h-14 w-auto object-contain transition-transform hover:scale-105"
            />
          </Link>

          {/* Desktop Links - Minimalist (Only Contact) */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={scrollToContact}
              className="bg-white hover:bg-zinc-200 text-black px-6 py-2.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg cursor-pointer"
            >
              Contacto
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-zinc-300 hover:text-white p-2"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800 absolute w-full shadow-2xl">
          <div className="px-4 pt-4 pb-6 space-y-2 flex justify-center">
            <button
              onClick={scrollToContact}
              className="w-full bg-white text-black px-5 py-3 rounded-lg font-bold text-center"
            >
              Contacto
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;