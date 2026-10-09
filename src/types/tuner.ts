export interface Note {
  name: string;
  frequency: number;
}

export interface TunerState {
  isListening: boolean;
  currentPitch: number; 
  closestNote: Note | null;
  centsOff: number;
}