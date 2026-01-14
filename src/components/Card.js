import React from 'react';
import '../App.css';

/**
 * Card Component
 * 
 * Individual Lotería card with emoji, name, and marking functionality
 * 
 * @param {Object} card - Card object with id, name, emoji
 * @param {boolean} isMarked - Whether card is marked
 * @param {Function} onClick - Click handler
 * @param {string} dataTestId - Test ID for testing
 */
const Card = ({ card, isMarked, onClick, dataTestId }) => {
  return (
    <div
      className={`card ${isMarked ? 'marked' : ''}`}
      onClick={onClick}
      data-testid={dataTestId}
      role="button"
      tabIndex="0"
      aria-label={`${card.name} ${isMarked ? '(marked)' : ''}`}
    >
      <div className="card-emoji">{card.emoji}</div>
      <div className="card-name">{card.name}</div>
      {isMarked && <div className="marker">🟢</div>}
    </div>
  );
};

export default Card;