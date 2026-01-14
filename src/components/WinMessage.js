import React from 'react';
import '../App.css';

/**
 * WinMessage Component
 * 
 * Displays victory message when player wins
 * 
 * @param {string} language - Current language
 * @param {Function} onPlayAgain - Play again handler
 */
const WinMessage = ({ language, onPlayAgain }) => {
  return (
    <div className="win-message">
      <h2>¡Lotería! 🎉</h2>
      {language === 'es' ? (
        <p>¡Has ganado! Completa una línea de cartas.</p>
      ) : (
        <p>You won! You completed a line of cards.</p>
      )}
      <button onClick={onPlayAgain} role="button" tabIndex="0">
        {language === 'es' ? 'Jugar de nuevo' : 'Play Again'}
      </button>
    </div>
  );
};

export default WinMessage;