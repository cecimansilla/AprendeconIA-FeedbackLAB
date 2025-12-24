
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BrandLogo } from '../App';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between p-10 text-center animate-in fade-in duration-1000">
      <div className="w-full text-gray-300 text-[10px] font-extrabold uppercase tracking-[0.3em] pt-8">
        Feedback Lab Experience
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-14">
        {/* Logo Link to Website */}
        <a 
          href="https://www.cecimansilla.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative group transition-transform hover:scale-105 active:scale-95"
        >
          <div className="absolute -inset-10 bg-[#FF007A]/10 blur-3xl rounded-full animate-pulse"></div>
          <BrandLogo className="w-40 h-40" />
        </a>

        <div className="space-y-8 max-w-sm">
          <h1 className="text-6xl font-[900] leading-[1.05] tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF8A00] via-[#FF007A] to-[#7000FF]">
              Bienvenido a
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF007A] via-[#7000FF] to-[#0085FF]">
              Feedback Lab
            </span>
          </h1>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Tu espacio personal para crecer</h2>
            <p className="text-gray-500 font-medium leading-relaxed px-6 text-lg">
              Prepara feedback estructurado y empático en total confidencialidad.
            </p>
          </div>

          <div className="inline-flex items-center space-x-2.5 px-6 py-2.5 bg-gray-50 rounded-full border border-gray-100 shadow-sm">
            <svg className="w-4 h-4 text-[#FF007A]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">Personal y confidencial</span>
          </div>
        </div>
      </div>

      <div className="w-full space-y-5 pb-10">
        <button 
          onClick={() => navigate('/')}
          className="group w-full bg-gradient-to-r from-[#FF8A00] via-[#FF007A] to-[#7000FF] text-white font-bold py-6 rounded-[2rem] shadow-2xl shadow-pink-100 flex items-center justify-center space-x-3 transition-all duration-300 hover:brightness-110 active:scale-95"
        >
          <span className="text-lg tracking-tight">Comenzar mi viaje</span>
          <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>

        <a 
          href="https://www.cecimansilla.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-gray-400 font-bold text-sm tracking-tight hover:text-[#FF007A] transition-colors"
        >
          Conoce a Ceci Mansilla
        </a>
      </div>
    </div>
  );
};

export default Welcome;
