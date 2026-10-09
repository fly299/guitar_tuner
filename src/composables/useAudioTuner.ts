import { reactive } from 'vue'
import { startAudio, audioContext, analyser } from '../audio/AudioContext'
import { autoCorrelate } from '../audio/PitchDetector'
import { getClosestNote, getCentsOffPitch } from '../audio/notes'
import type { TunerState } from '../types/tuner'

export function useAudioTuner() {
  const state = reactive<TunerState>({
    isListening: false,
    currentPitch: 0,
    closestNote: null,
    centsOff: 0
  })

  let animationFrameId: number

  const updatePitch = () => {
    if (!analyser || !audioContext) return

    const buffer = new Float32Array(analyser.fftSize)
    analyser.getFloatTimeDomainData(buffer)

    const pitch = autoCorrelate(buffer, audioContext.sampleRate)

    if (pitch !== -1) {
      state.currentPitch = pitch
      state.closestNote = getClosestNote(pitch)
      state.centsOff = getCentsOffPitch(pitch, state.closestNote.frequency)
    }

    animationFrameId = requestAnimationFrame(updatePitch)
  }

  const initTuner = async () => {
    const success = await startAudio()
    if (success) {
      state.isListening = true
      updatePitch()
    }
  }

  return { state, initTuner }
}