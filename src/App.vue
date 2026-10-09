<script setup lang="ts">
import { useAudioTuner } from './composables/useAudioTuner'

const { state, initTuner } = useAudioTuner()
</script>

<template>
  <main>
    <h1>Guitar tuner</h1>
    
    <div v-if="!state.isListening">
      <button @click="initTuner">Mic permission</button>
    </div>
    
    <div v-else>
        <p>Current pitch: {{ state.currentPitch }}</p>
        <p>Closest note: {{ state.closestNote }}</p>
        <p>Cents off: {{ state.centsOff }}</p>
    </div>
  </main>
</template>