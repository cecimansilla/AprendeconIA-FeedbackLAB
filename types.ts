
export interface SBIEntry {
  situation: string;
  behavior: string;
  impact: string;
}

export type Tone = 'Directo'| 'Coaching' | 'Empático' | 'Deliberativo';

export type PersonaType = 'Defensivo' | 'Sensible' | 'Comprensivo' | 'Enojado';

export interface FeedbackDraft {
  id: string;
  recipientName: string;
  sbi: SBIEntry;
  tone: Tone;
  anticipatedReaction: string;
  generatedScript?: string;
  createdAt: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
