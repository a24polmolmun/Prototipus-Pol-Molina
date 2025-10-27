// src/services/communicationManager.js
import { io } from 'socket.io-client';

// URL dinàmica
const URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:8080' 
    : 'http://a24polmolmun.daw.inspedralbes.cat:20873'; 

// Creem una única instància del socket per a tota l'aplicació
const socket = io(URL, { autoConnect: false });

// L’objecte que exportarem
const communicationManager = {
  connect(playerName) {
    socket.connect();
    socket.emit('setPlayerName', playerName);
  },

  // Escoltar actualització de la llista de jugadors
  onUpdatePlayerList(callback) {
    socket.on('updatePlayerList', callback);
  },

  // Escoltar altres esdeveniments del joc (per exemple inici de partida)
  onStartGame(callback) {
    socket.on('startGame', callback);
  },

  // Escoltar missatges d’error o notificacions del servidor
  onServerMessage(callback) {
    socket.on('serverMessage', callback);
  },

  // Enviar el progrés d’una paraula
  emitWordProgress(data) {
    socket.emit('wordProgress', data);
  },

  // Enviar que el jugador ha acabat la partida
  emitFinishGame(data) {
    socket.emit('finishGame', data);
  },

  // Enviar missatges generals al servidor
  emitMessage(eventName, payload) {
    socket.emit(eventName, payload);
  },

  disconnect() {
    socket.disconnect();
  },

  getSocketId() {
    return socket.id;
  },

  isConnected() {
    return socket.connected;
  }
};

export default communicationManager;
