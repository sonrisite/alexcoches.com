import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CarDetail from './pages/CarDetail';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black text-zinc-50 font-sans selection:bg-indigo-500 selection:text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/car/:id" element={<CarDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;