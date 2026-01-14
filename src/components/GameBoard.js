import React from 'react';
import Card from './Card';
import '../App.css';

/**
 * GameBoard Component
 * 
 * Displays the 4x4 grid of Lotería cards for the player
 * 
 * @param {Array} playerBoard - Array of card objects
 * @param {Array} markedPositions - Array of marked card indices
 * @param {Function} onCardClick - Callback when card is clicked
 * @param {string} language - Current language ('es' or 'en')
 */
const GameBoard = ({ playerBoard, markedPositions, onCardClick, language }) => {
  return (
    <div className="player-board">
      <h3>{language === 'es' ? 'Tu Tablero' : 'Your Board'}</h3>
      <div className="board-grid" data-testid="game-board">
        {playerBoard.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            isMarked={markedPositions.includes(index)}
            onClick={() => onCardClick(card, index)}
            dataTestId="loteria-card"
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;