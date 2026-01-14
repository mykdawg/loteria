import React from 'react';
import '../App.css';

/**
 * CurrentCard Component
 * 
 * Displays the currently drawn card with its name and traditional call
 * 
 * @param {Object} card - Current card object
 */
const CurrentCard = ({ card }) => {
  if (!card) return null;

  return (
    <div className="current-card" data-testid="current-card">
      <div>
        <div className="card-emoji">{card.emoji}</div>
        <h3>{card.name}</h3>
        <p><em>{card.call}</em></p>
      </div>
    </div>
  );
};

export default CurrentCard;