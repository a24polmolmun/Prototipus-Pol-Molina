
<script setup>
import { ref } from 'vue';
import GameEngine from './GameEngine.vue';
import communicationManager from '../services/communicationManager';

// Estat per controlar quina vista es mostra
const vistaActual = ref('salaEspera'); // 'salaEspera', 'lobby', 'joc'

// Estat per a la connexió
const nomJugador = ref('');
const jugadors = ref([]);

// Connectar al servidor i gestionar les fases
function connectarAlServidor() {
  if (!nomJugador.value.trim()) {
    alert('Has d’introduir un nom!');
    return;
  }

  // Connectem via communicationManager
  communicationManager.connect(nomJugador.value);

  // Quan rebem la llista de jugadors
  communicationManager.onUpdatePlayerList((jugadorsActualitzats) => {
    jugadors.value = jugadorsActualitzats;
    console.log('Jugadors actualitzats:', jugadors.value);
  });

  // Un cop connectat, canviem a la vista de lobby
  vistaActual.value = 'lobby';
}
</script>



<template>
  <main>
    <!-- VISTA 1: SALA D'ESPERA -->
    <div v-if="vistaActual === 'salaEspera'" class="vista-container">
      <h1>Type Racer Royale</h1>
      <input type="text" v-model="nomJugador" placeholder="Introdueix el teu nom" />
      <button @click="connectarAlServidor">Entra al Lobby</button>
    </div>

    <!-- VISTA 2: LOBBY -->
    <div v-else-if="vistaActual === 'lobby'" class="vista-container">
      <h2>Jugadors Connectats</h2>
      <ul>
        <li v-for="jugador in jugadors" :key="jugador.id">{{ jugador.name }}</li>
      </ul>
      <button @click="vistaActual = 'joc'">Comença a Jugar!</button>
    </div>

    <!-- VISTA 3: JOC -->
    <div v-else-if="vistaActual === 'joc'" class="vista-container">
      <GameEngine />
    </div>
  </main>
</template>

