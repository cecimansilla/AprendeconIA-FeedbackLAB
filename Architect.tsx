
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FeedbackDraft, Tone } from '../types';

interface ArchitectProps {
  onDraftComplete: (draft: FeedbackDraft) => void;
}

const Architect: React.FC<ArchitectProps> = ({ onDraftComplete }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [situation, setSituation] = useState('');
  const [behavior, setBehavior] = useState('');
  const [impact, setImpact] = useState('');
  const [tone, setTone] = useState<Tone>('Empático');
  const [reaction, setReaction] = useState('Aceptación / Neutral');

  const handleSubmit = () => {
    if (!name || !situation || !behavior || !impact) {
      alert('Por favor completa todos los campos para que la IA pueda ayudarte mejor.');
      return;
    }

    const draft: FeedbackDraft = {
      id: Date.now().toString(),
      recipientName: name,
      sbi: { situation, behavior, impact },
      tone,
      anticipatedReaction: reaction,
      createdAt: Date.now(),
    };

    onDraftComplete(draft);
    navigate('/coach');
  };

  return (
    <div className="px-8 pt-4 space-y-10 animate-in slide-in-from-bottom-8 duration-700">
      <div className="space-y-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 leading-tight">Preparar Feedback</h2>
        <p className="text-gray-500 font-medium leading-relaxed">Completa los hechos observables para generar un guion profesional.</p>
      </div>

      <div className="space-y-8 pb-10">
        <div className="space-y-2">
          <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Para quién es</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#FF007A] rounded-2xl px-6 py-4 outline-none transition-all duration-300 font-bold text-gray-900 shadow-sm"
            placeholder="Nombre del colega"
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
               <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#FF007A]">Situación</label>
               <span className="text-[10px] text-gray-400 font-bold uppercase">Contexto</span>
            </div>
            <textarea 
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#FF007A] rounded-[1.5rem] px-6 py-5 text-sm font-medium outline-none transition-all duration-300 min-h-[100px] shadow-sm resize-none"
              placeholder="¿Cuándo y dónde ocurrió? Ej: En la reunión de equipo del martes..."
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
               <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#7000FF]">Comportamiento</label>
               <span className="text-[10px] text-gray-400 font-bold uppercase">Hecho</span>
            </div>
            <textarea 
              value={behavior}
              onChange={(e) => setBehavior(e.target.value)}
              className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#7000FF] rounded-[1.5rem] px-6 py-5 text-sm font-medium outline-none transition-all duration-300 min-h-[100px] shadow-sm resize-none"
              placeholder="¿Qué hizo específicamente? Ej: Interrumpiste tres veces la presentación de KPIs..."
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
               <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0085FF]">Impacto</label>
               <span className="text-[10px] text-gray-400 font-bold uppercase">Consecuencia</span>
            </div>
            <textarea 
              value={impact}
              onChange={(e) => setImpact(e.target.value)}
              className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#0085FF] rounded-[1.5rem] px-6 py-5 text-sm font-medium outline-none transition-all duration-300 min-h-[100px] shadow-sm resize-none"
              placeholder="¿Cuál fue el resultado? Ej: Perdimos el foco y el equipo se sintió frustrado..."
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-[11px] font-extrabold uppercase tracking-widest text-gray-400 text-center">Tono de la conversación</label>
          <div className="grid grid-cols-2 gap-3">
            {(['Directo', 'Coaching', 'Empático', 'Deliberativo'] as Tone[]).map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`py-4 rounded-2xl text-xs font-bold transition-all duration-300 border-2 ${tone === t ? 'bg-gradient-to-r from-[#FF007A] to-[#7000FF] text-white border-transparent shadow-xl shadow-pink-100 scale-105' : 'bg-white text-gray-500 border-gray-50 hover:border-gray-200'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-[#FF8A00] via-[#FF007A] to-[#7000FF] text-white font-bold py-6 rounded-3xl shadow-2xl shadow-pink-100 hover:brightness-110 active:scale-95 transition-all duration-300 flex items-center justify-center space-x-3"
        >
          <span className="text-lg">Generar con IA</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </button>
      </div>
    </div>
  );
};

export default Architect;
