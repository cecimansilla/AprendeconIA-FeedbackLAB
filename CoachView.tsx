
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FeedbackDraft } from '../types';
import { generateFeedbackScript } from '../services/geminiService';

interface CoachViewProps {
  draft: FeedbackDraft | null;
}

const CoachView: React.FC<CoachViewProps> = ({ draft }) => {
  const navigate = useNavigate();
  const [script, setScript] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!draft) {
      navigate('/architect');
      return;
    }

    const fetchScript = async () => {
      try {
        setLoading(true);
        const result = await generateFeedbackScript(draft);
        setScript(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchScript();
  }, [draft, navigate]);

  if (loading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center px-10 space-y-8 animate-in fade-in duration-1000">
        <div className="relative">
          <div className="absolute inset-0 bg-[#FF007A]/10 blur-3xl rounded-full animate-pulse opacity-50"></div>
          <div className="relative w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center text-[#FF007A]">
             <svg className="w-12 h-12 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </div>
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold text-gray-900">Analizando con IA...</h3>
          <p className="text-gray-500 font-medium">Estructurando un guion empático y sin sesgos.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-10 pt-20 flex flex-col items-center text-center space-y-6">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
           <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        </div>
        <div className="space-y-2">
          <p className="text-red-600 font-bold text-lg">{error}</p>
          <p className="text-gray-500 text-sm">Parece que hubo un problema técnico. Inténtalo de nuevo.</p>
        </div>
        <button onClick={() => navigate('/architect')} className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold shadow-lg">Reintentar</button>
      </div>
    );
  }

  return (
    <div className="px-8 pb-10 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex items-center space-x-4">
        <button onClick={() => navigate('/architect')} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-2xl font-extrabold tracking-tight">Tu Coach Digital</h2>
      </div>

      <div className="bg-gradient-to-br from-[#1a1a1a] via-[#2a1a4a] to-[#0a0a0a] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-[0.1]">
           <div className="w-32 h-32 bg-gradient-to-br from-[#FF8A00] via-[#FF007A] to-[#7000FF] rounded-full blur-2xl"></div>
        </div>
        <div className="relative z-10 space-y-4">
          <p className="text-[10px] font-extrabold uppercase tracking-widest opacity-60">Feedback para</p>
          <h3 className="text-3xl font-extrabold tracking-tight">{draft?.recipientName}</h3>
          <div className="flex flex-wrap gap-3">
            <span className="bg-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border border-white/5">Tono: {draft?.tone}</span>
            <span className="bg-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border border-white/5">Modelo SBI</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] whitespace-pre-wrap text-gray-800 leading-relaxed font-medium text-[15px] italic">
        {script}
      </div>

      <div className="grid grid-cols-1 gap-4">
        <button 
          onClick={() => {
            navigator.clipboard.writeText(script);
            alert('Copiado al portapapeles. ¡Listo para tu conversación!');
          }}
          className="w-full bg-gray-50 text-gray-700 font-bold py-5 rounded-2xl flex items-center justify-center space-x-3 transition-colors hover:bg-gray-100"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
          <span>Copiar Guion</span>
        </button>
        <button 
          onClick={() => navigate('/')}
          className="w-full bg-gradient-to-r from-[#FF007A] to-[#7000FF] text-white font-bold py-5 rounded-2xl shadow-xl shadow-pink-100 flex items-center justify-center space-x-3 hover:brightness-110 active:scale-95 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
          <span>Finalizar Preparación</span>
        </button>
      </div>

      <div className="p-8 bg-pink-50/30 rounded-[2rem] border border-pink-50 flex items-start space-x-5">
         <div className="bg-gradient-to-br from-[#FF007A] to-[#7000FF] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold shadow-md shadow-pink-100">!</div>
         <div className="space-y-1">
           <h4 className="text-[11px] font-extrabold text-[#FF007A] uppercase tracking-widest">Consejo de Ceci</h4>
           <p className="text-sm text-gray-800 leading-relaxed">
             No olvides abrir un espacio de escucha genuina. Pregunta a <strong>{draft?.recipientName}</strong> qué piensa de la situación una vez termines de presentar tu punto.
           </p>
         </div>
      </div>
    </div>
  );
};

export default CoachView;
