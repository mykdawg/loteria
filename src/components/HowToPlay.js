import React from 'react';
import '../App.css';

/**
 * HowToPlay Component
 * 
 * Displays game instructions in selected language
 * 
 * @param {string} language - Current language
 */
const HowToPlay = ({ language }) => {
  return (
    <div className="how-to-play">
      {language === 'es' ? (
        <div className="instructions-spanish">
          <h2>¿Cómo Jugar Lotería?</h2>
          <ol>
            <li>Haz clic en "Nuevo Juego" para comenzar</li>
            <li>El repartidor sacará cartas automáticamente cada 3 segundos</li>
            <li>Cuando saques una carta, busca su imagen en tu tablero</li>
            <li>Haz clic en la carta coincidente en tu tablero para marcarla</li>
            <li>El primer jugador en completar una línea (horizontal, vertical o diagonal) gana</li>
            <li>¡Grita "¡Lotería!" cuando completes una línea para ganar!</li>
          </ol>
          <p><strong>Objetivo:</strong> Completa una línea de 4 cartas en tu tablero antes que los demás jugadores.</p>
        </div>
      ) : (
        <div className="instructions-english">
          <h2>How to Play Lotería</h2>
          <ol>
            <li>Click "New Game" to start</li>
            <li>The dealer will automatically draw cards every 3 seconds</li>
            <li>When a card is drawn, look for its image on your board</li>
            <li>Click on the matching card on your board to mark it</li>
            <li>The first player to complete a line (horizontal, vertical, or diagonal) wins</li>
            <li>Shout "¡Lotería!" when you complete a line to win!</li>
          </ol>
          <p><strong>Objective:</strong> Complete a line of 4 cards on your board before other players.</p>
        </div>
      )}
    </div>
  );
};

export default HowToPlay;