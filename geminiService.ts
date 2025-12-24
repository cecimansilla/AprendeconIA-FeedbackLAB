
import { GoogleGenAI, Type } from "@google/genai";
import { FeedbackDraft, PersonaType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateFeedbackScript = async (draft: FeedbackDraft): Promise<string> => {
  const prompt = `
    Actúa como un Coach Profesional experto en Comunicación y Liderazgo. 
    Tu función es transformar las observaciones del usuario en un "Guion de Conversación" estructurado y profesional.
    
    ESTRICTA Y OBLIGATORIAMENTE debes seguir el método SBI (Situación-Comportamiento-Impacto).
    
    DATOS DEL CASO:
    - Destinatario: ${draft.recipientName}
    - Tono deseado: ${draft.tone}
    - Situación: ${draft.sbi.situation}
    - Comportamiento: ${draft.sbi.behavior}
    - Impacto: ${draft.sbi.impact}
    - Reacción anticipada: ${draft.anticipatedReaction}

    INSTRUCCIONES DE TONO:
    - Objetivo: Enfocado en la acción, no en la persona.
    - Constructivo: Orientado a la solución y al futuro.
    - Empático: Reconociendo que el feedback es una conversación.

    SALIDA REQUERIDA:
    La salida debe ser ÚNICAMENTE la sección "GUION DE CONVERSACIÓN", formateada en Markdown con negritas y saltos de línea claros.
    No incluyas ningún otro comentario, introducción, ni explicaciones sobre el método SBI.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "No se pudo generar el guion.";
  } catch (error) {
    console.error("Error generating feedback:", error);
    throw new Error("Error al conectar con el coach de IA.");
  }
};

export const createSimulationChat = (draft: FeedbackDraft, persona: PersonaType) => {
  const personaInstructions: Record<PersonaType, string> = {
    'Defensivo': 'Eres un empleado a la defensiva. Justificas todo, desvías la culpa y cuestionas la validez de los hechos presentados. No aceptas responsabilidad fácilmente.',
    'Sensible': 'Eres un empleado muy sensible y emotivo. Te tomas el feedback de forma personal, te sientes herido, muestras vulnerabilidad y puedes llegar a llorar o pedir disculpas en exceso.',
    'Comprensivo': 'Eres un empleado comprensivo y profesional. Escuchas activamente, aceptas tu responsabilidad y buscas formas de mejorar o solucionar el problema.',
    'Enojado': 'Eres un empleado enojado y hostil. Tu tono es desafiante, puedes ser sarcástico y sientes que el feedback es injusto o un ataque personal.'
  };

  const systemInstruction = `
    Actúa como ${draft.recipientName}, recibiendo feedback de tu superior.
    CONTEXTO DEL FEEDBACK (SBI):
    - Situación: ${draft.sbi.situation}
    - Comportamiento: ${draft.sbi.behavior}
    - Impacto: ${draft.sbi.impact}

    TU PERSONALIDAD ACTUAL: ${personaInstructions[persona]}
    
    REGLAS DE CONVERSACIÓN:
    1. Responde de forma realista según tu personalidad.
    2. Mantén tus respuestas cortas (máximo 2-3 oraciones).
    3. No salgas del personaje.
    4. Si el usuario te da el feedback, reacciona según tu tipo de personalidad asignado.
  `;

  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction,
    }
  });
};
