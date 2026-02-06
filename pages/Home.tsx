import React, { useState, useMemo } from 'react';
import Hero from '../components/Hero';
import CarCard from '../components/CarCard';
import FAQ from '../components/FAQ';
import { MOCK_CARS, formatNumber } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

// Calculate initial filter bounds dynamically
const allPrices = MOCK_CARS.map(car => car.price);
const allKms = MOCK_CARS.map(car => car.km);
const allYears = MOCK_CARS.map(car => car.year);

const initialMinPrice = allPrices.length > 0 ? Math.min(...allPrices) : 0;
const initialMaxPrice = allPrices.length > 0 ? Math.max(...allPrices) : 100000;
const initialMaxKm = allKms.length > 0 ? Math.max(...allKms) : 250000;
const initialMinYear = allYears.length > 0 ? Math.min(...allYears) : 2000;
const initialMaxYear = allYears.length > 0 ? Math.max(...allYears) : new Date().getFullYear();


const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMake, setSelectedMake] = useState('Todas');
  const [selectedTransmission, setSelectedTransmission] = useState('Todas');
  const [selectedFuel, setSelectedFuel] = useState('Todas');
  const [maxPrice, setMaxPrice] = useState<number>(initialMaxPrice);
  const [maxKm, setMaxKm] = useState<number>(initialMaxKm);
  const [minYear, setMinYear] = useState<number>(initialMinYear);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique values for the filters
  const uniqueMakes = useMemo(() => {
    return ['Todas', ...new Set(MOCK_CARS.map(car => car.make))].sort();
  }, []);

  const uniqueFuels = useMemo(() => {
    return ['Todas', ...new Set(MOCK_CARS.map(car => car.fuel))].sort();
  }, []);

  const uniqueTransmissions = useMemo(() => {
    return ['Todas', ...new Set(MOCK_CARS.map(car => car.transmission))].sort();
  }, []);

  // Filtering logic
  const filteredCars = useMemo(() => {
    return MOCK_CARS.filter(car => {
      const matchesSearch = 
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.make.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMake = selectedMake === 'Todas' || car.make === selectedMake;
      const matchesTransmission = selectedTransmission === 'Todas' || car.transmission === selectedTransmission;
      const matchesFuel = selectedFuel === 'Todas' || car.fuel === selectedFuel;
      const matchesPrice = car.price <= maxPrice;
      const matchesKm = car.km <= maxKm;
      const matchesYear = car.year >= minYear;
      
      return matchesSearch && matchesMake && matchesTransmission && matchesFuel && matchesPrice && matchesKm && matchesYear;
    });
  }, [searchTerm, selectedMake, selectedTransmission, selectedFuel, maxPrice, maxKm, minYear]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedMake !== 'Todas') count++;
    if (selectedTransmission !== 'Todas') count++;
    if (selectedFuel !== 'Todas') count++;
    if (maxPrice < initialMaxPrice) count++;
    if (maxKm < initialMaxKm) count++;
    if (minYear > initialMinYear) count++;
    return count;
  }, [selectedMake, selectedTransmission, selectedFuel, maxPrice, maxKm, minYear]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedMake('Todas');
    setSelectedTransmission('Todas');
    setSelectedFuel('Todas');
    setMaxPrice(initialMaxPrice);
    setMaxKm(initialMaxKm);
    setMinYear(initialMinYear);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Hero />
      
      <section id="catalogo" className="py-6 md:py-8 bg-zinc-50 relative min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Main Search & Filter Toggle - Ultra Compact */}
          <div className="bg-white p-2 md:p-2.5 rounded-2xl shadow-xl border border-zinc-100 -mt-8 md:-mt-10 mb-6 md:mb-8 relative z-20 max-w-4xl mx-auto transition-all duration-300">
            <div className="flex flex-col md:flex-row gap-2 items-stretch md:items-center">
              
              {/* Primary Search Bar */}
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={15} />
                <input 
                  type="text"
                  placeholder="Modelo o marca..."
                  className="w-full pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-1 focus:ring-black outline-none transition-all text-zinc-900 text-sm font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Toggle Filters Button */}
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center justify-center gap-2 px-4 py-1.5 rounded-xl font-bold transition-all cursor-pointer border text-xs h-[36px] ${
                  showFilters || activeFiltersCount > 0 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-300 shadow-sm'
                }`}
              >
                <Filter size={13} />
                <span>Filtros</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-white text-black text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-black">
                    {activeFiltersCount}
                  </span>
                )}
                {showFilters ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>

            {/* Collapsible Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-4 pb-2 border-t border-zinc-50 mt-2">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter ml-1">Marca</label>
                      <select 
                        className="w-full px-2 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-900 text-xs cursor-pointer appearance-none"
                        value={selectedMake}
                        onChange={(e) => setSelectedMake(e.target.value)}
                      >
                        {uniqueMakes.map(make => (
                          <option key={make} value={make}>{make}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter ml-1">Cambio</label>
                      <select 
                        className="w-full px-2 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-900 text-xs cursor-pointer appearance-none"
                        value={selectedTransmission}
                        onChange={(e) => setSelectedTransmission(e.target.value)}
                      >
                        {uniqueTransmissions.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter ml-1">Combustible</label>
                      <select 
                        className="w-full px-2 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-900 text-xs cursor-pointer appearance-none"
                        value={selectedFuel}
                        onChange={(e) => setSelectedFuel(e.target.value)}
                      >
                        {uniqueFuels.map(f => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center px-1">
                        <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">Precio máx.</label>
                        <span className="text-[9px] font-bold text-black">{maxPrice.toLocaleString()}€</span>
                      </div>
                      <input 
                        type="range"
                        min={initialMinPrice}
                        max={initialMaxPrice}
                        step="500"
                        className="w-full h-1 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-black"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center px-1">
                        <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">Km máx.</label>
                        <span className="text-[9px] font-bold text-black">{formatNumber(maxKm)} km</span>
                      </div>
                      <input 
                        type="range"
                        min="0"
                        max={initialMaxKm}
                        step="5000"
                        className="w-full h-1 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-black"
                        value={maxKm}
                        onChange={(e) => setMaxKm(parseInt(e.target.value))}
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center px-1">
                        <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">Año mín.</label>
                        <span className="text-[9px] font-bold text-black">{minYear}</span>
                      </div>
                      <input 
                        type="range"
                        min={initialMinYear}
                        max={initialMaxYear}
                        step="1"
                        className="w-full h-1 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-black"
                        value={minYear}
                        onChange={(e) => setMinYear(parseInt(e.target.value))}
                      />
                    </div>

                    <div className="flex gap-2 items-end col-span-full justify-end pt-2">
                      <button 
                        onClick={clearFilters}
                        className="px-2 py-1 text-zinc-400 hover:text-black transition-all text-[9px] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <X size={10} /> Limpiar filtros
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Catalog Header - Smaller & Cleaner */}
          <div className="mb-6 flex items-center gap-3">
            <h2 className="text-xl md:text-2xl font-black text-zinc-900 tracking-tight">
              Stock disponible
            </h2>
            <span className="px-2 py-0.5 bg-zinc-100 text-zinc-500 border border-zinc-200 rounded-full text-[9px] font-bold uppercase tracking-wider">
              {filteredCars.length} unidades
            </span>
          </div>

          {filteredCars.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={`${searchTerm}-${selectedMake}-${selectedTransmission}-${selectedFuel}-${maxPrice}-${maxKm}-${minYear}`}
            >
              {filteredCars.map((car, index) => (
                <CarCard key={car.id} car={car} index={index} />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-zinc-100">
              <div className="inline-flex p-6 rounded-full bg-zinc-50 text-zinc-200 mb-4">
                <Search size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-black text-zinc-900">Sin resultados</h3>
              <p className="text-zinc-500 text-xs mt-2">Prueba a ajustar tus filtros.</p>
            </div>
          )}
          
        </div>
      </section>

      <FAQ />
    </div>
  );
};

export default Home;