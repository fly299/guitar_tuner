import type { Note } from '../types/tuner'

export const standardTuning: Note[] = [
  { name: 'E2', frequency: 82.41 },
  { name: 'A2', frequency: 110.00 },
  { name: 'D3', frequency: 146.83 },
  { name: 'G3', frequency: 196.00 },
  { name: 'B3', frequency: 246.94 },
  { name: 'E4', frequency: 329.63 }
]

export function getClosestNote(frequency: number): Note{
  return standardTuning.reduce((prev, curr) => Math.abs(curr.frequency - frequency) < Math.abs(prev.frequency - frequency) ? curr : prev)
}

export function getCentsOffPitch(frequency: number, noteFrequency:number): number {
    return Math.floor(1200 * Math.log2(frequency / noteFrequency))
}