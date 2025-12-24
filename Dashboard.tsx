
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="px-8 py-6 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">Hola,</h2>
        <p className="text-lg text-gray-500 font-medium">Diseña tu próximo feedback hoy.</p>
      </div>

      {/* Main Choices Grid */}
      <div className="grid grid-cols-1 gap-6">
        <Link 
          to="/architect" 
          className="group block relative overflow-hidden bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500"
        >
          <div className="absolute -top-6 -right-6 p-12 opacity-[0.03] group-hover:scale-125 group-hover:rotate-6 transition-all duration-700">
            <svg className="w-48 h-48 text-[#FF007A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          </div>
          
          <div className="relative z-10 space-y-6">
            <div className="w-16 h-16 bg-orange-50/50 text-[#FF8A00] rounded-3xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Arquitecto</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                Transforma observaciones en conversaciones transformadoras usando el método <span className="text-[#FF007A] font-bold">SBI</span>.
              </p>
            </div>
            
            <div className="pt-2 flex items-center text-[#FF007A] font-extrabold text-sm uppercase tracking-widest">
              <span>Empezar ahora</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </div>
          </div>
        </Link>

        <Link 
          to="/simulator" 
          className="group block relative overflow-hidden bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500"
        >
          <div className="absolute -top-6 -right-6 p-12 opacity-[0.03] group-hover:scale-125 group-hover:rotate-6 transition-all duration-700">
            <svg className="w-48 h-48 text-[#7000FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          </div>
          
          <div className="relative z-10 space-y-6">
            <div className="w-16 h-16 bg-purple-50/50 text-[#7000FF] rounded-3xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Simulador</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                Practica la conversación con una IA que reacciona según la personalidad elegida.
              </p>
            </div>
            
            <div className="pt-2 flex items-center text-[#7000FF] font-extrabold text-sm uppercase tracking-widest">
              <span>Entrenar ahora</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </div>
          </div>
        </Link>
      </div>

      {/* Quote Section */}
      <div className="bg-gray-50/50 rounded-[2rem] p-8 border border-gray-100">
        <svg className="w-8 h-8 text-pink-100 mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.899 14.899 16.017 16 16.017L19 16.017C19.552 16.017 20 15.569 20 15.017L20 9.017C20 8.465 19.552 8.017 19 8.017L15 8.017C14.448 8.017 14 7.569 14 7.017L14 4.017C14 3.465 14.448 3.017 15 3.017L21 3.017C21.552 3.017 22 3.465 22 4.017L22 15.017C22 18.866 18.866 22 15.017 22L14.017 22L14.017 21ZM2.017 21L2.017 18C2.017 16.899 2.899 16.017 4 16.017L7 16.017C7.552 16.017 8 15.569 8 15.017L8 9.017C8 8.465 7.552 8.017 7 8.017L3 8.017C2.448 8.017 2 7.569 2 7.017L2 4.017C2 3.465 2.448 3.017 3 3.017L9 3.017C9.552 3.017 10 3.465 10 4.017L10 15.017C10 18.866 6.866 22 3.017 22L2.017 22L2.017 21Z" /></svg>
        <p className="italic text-gray-600 font-medium leading-relaxed">
          "El feedback bien entregado no es una crítica, es un regalo para el crecimiento profesional."
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
