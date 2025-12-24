
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FeedbackDraft, PersonaType, ChatMessage } from '../types';
import { createSimulationChat } from '../services/geminiService';

interface SimulatorProps {
  draft: FeedbackDraft | null;
}

const Simulator: React.FC<SimulatorProps> = ({ draft }) => {
  const navigate = useNavigate();
  const [persona, setPersona] = useState<PersonaType | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatSession, setChatSession] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!draft) {
      navigate('/architect');
    }
  }, [draft, navigate]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const startSimulation = (selectedPersona: PersonaType) => {
    setPersona(selectedPersona);
    const session = createSimulationChat(draft!, selectedPersona);
    setChatSession(session);
    setMessages([{ role: 'model', text: `Hola, soy ${draft?.recipientName}. Estoy listo para escucharte. ¿Qué querías decirme?` }]);
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading || !chatSession) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await chatSession.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'model', text: response.text || '...' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Lo siento, perdí el hilo de la conversación. ¿Podemos retomar?' }]);
    } finally {
      setLoading(false);
    }
  };

  if (!persona) {
    return (
      <div className="px-8 pt-4 space-y-10 animate-in fade-in duration-700">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Simulador de Empatía</h2>
          <p className="text-gray-500 font-medium leading-relaxed">¿Cómo crees que reaccionará {draft?.recipientName}? Elige una personalidad para practicar.</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {(['Defensivo', 'Sensible', 'Comprensivo', 'Enojado'] as PersonaType[]).map((p) => (
            <button
              key={p}
              onClick={() => startSimulation(p)}
              className="group bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-between text-left"
            >
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-gray-900">{p}</h3>
                <p className="text-xs text-gray-400 font-medium">Practica con alguien que se muestra {p.toLowerCase()}.</p>
              </div>
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-[#FF007A] group-hover:text-white transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[75vh] animate-in slide-in-from-bottom-8 duration-700">
      <div className="px-8 pb-4 flex items-center justify-between border-b border-gray-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-[#FF007A] to-[#7000FF] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-pink-100">
            {draft?.recipientName[0]}
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{draft?.recipientName}</h3>
            <p className="text-[10px] text-[#FF007A] font-extrabold uppercase tracking-widest">{persona}</p>
          </div>
        </div>
        <button onClick={() => setPersona(null)} className="text-xs font-bold text-gray-400 hover:text-gray-600">Cambiar</button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-5 py-4 rounded-[1.5rem] text-sm font-medium leading-relaxed ${
              m.role === 'user' 
                ? 'bg-gradient-to-r from-[#FF007A] to-[#7000FF] text-white rounded-tr-none shadow-md' 
                : 'bg-gray-100 text-gray-800 rounded-tl-none border border-gray-50'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-5 py-4 rounded-[1.5rem] rounded-tl-none flex space-x-1 items-center">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-8 pt-0">
        <form onSubmit={handleSend} className="relative group">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu feedback aquí..."
            className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#FF007A] rounded-[2rem] pl-6 pr-14 py-5 outline-none transition-all duration-300 font-medium text-gray-900 shadow-inner"
          />
          <button 
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-[#FF007A] to-[#7000FF] text-white rounded-full flex items-center justify-center shadow-lg disabled:opacity-30 disabled:grayscale transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9-7-9-7V19z" /></svg>
          </button>
        </form>
        <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest mt-4">Práctica en vivo • Feedback Lab</p>
      </div>
    </div>
  );
};

export default Simulator;
