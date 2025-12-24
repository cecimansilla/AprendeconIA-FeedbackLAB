
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Architect from './components/Architect';
import CoachView from './components/CoachView';
import Welcome from './components/Welcome';
import Simulator from './components/Simulator';
import { FeedbackDraft } from './types';

// Logo Component to reuse SVG based on provided image
export const BrandLogo = ({ className = "w-10 h-10" }) => (
  <div className={`${className} relative`}>
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
      <defs>
        <linearGradient id="apple-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#0085FF' }} />
          <stop offset="50%" style={{ stopColor: '#FF007A' }} />
          <stop offset="100%" style={{ stopColor: '#FF8A00' }} />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#apple-grad)" />
      <path 
        d="M25 55 L 50 35 L 75 55 M35 70 L 50 60 L 65 70" 
        fill="none" 
        stroke="white" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M50 22 A 28 28 0 1 0 22 50" 
        fill="none" 
        stroke="white" 
        strokeWidth="4" 
        strokeLinecap="round"
      />
    </svg>
  </div>
);

const Navigation = () => {
  const location = useLocation();
  
  // Don't show navigation on the Welcome screen
  if (location.pathname === '/welcome') return null;

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-8 py-4 flex justify-around items-center z-50 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.04)]">
      <Link to="/" className={`flex flex-col items-center space-y-1.5 transition-all duration-300 ${isActive('/') ? 'text-[#FF007A] scale-110' : 'text-gray-400 hover:text-gray-600'}`}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        <span className="text-[10px] font-bold tracking-tight uppercase">Inicio</span>
      </Link>
      <Link to="/architect" className={`flex flex-col items-center space-y-1.5 transition-all duration-300 ${isActive('/architect') || isActive('/coach') || isActive('/simulator') ? 'text-[#7000FF] scale-110' : 'text-gray-400 hover:text-gray-600'}`}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
        <span className="text-[10px] font-bold tracking-tight uppercase">Preparar</span>
      </Link>
    </nav>
  );
};

const Header = () => {
  const location = useLocation();
  if (location.pathname === '/welcome') return null;

  return (
    <header className="px-8 pt-14 pb-6 flex justify-between items-center bg-white/70 backdrop-blur-xl sticky top-0 z-40">
      <a 
        href="https://www.cecimansilla.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center space-x-3 group transition-transform active:scale-95"
      >
        <BrandLogo className="w-12 h-12 transition-transform group-hover:scale-105" />
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-gray-900 leading-none group-hover:text-[#FF007A] transition-colors">Feedback Lab</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">por Ceci Mansilla</p>
        </div>
      </a>
      <div className="flex flex-col items-end">
        <span className="text-[10px] font-extrabold text-[#7000FF] uppercase tracking-widest bg-purple-50 px-2 py-0.5 rounded-full">Pro</span>
      </div>
    </header>
  );
};

const AppRoutes = () => {
  const [currentDraft, setCurrentDraft] = useState<FeedbackDraft | null>(null);

  return (
    <Routes>
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/architect" element={<Architect onDraftComplete={(draft) => setCurrentDraft(draft)} />} />
      <Route path="/coach" element={<CoachView draft={currentDraft} />} />
      <Route path="/simulator" element={<Simulator draft={currentDraft} />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="max-w-md mx-auto bg-white min-h-screen pb-32 shadow-2xl overflow-hidden relative">
        <Header />
        <main className="relative">
          <AppRoutes />
        </main>
        <Navigation />
      </div>
    </Router>
  );
};

export default App;
