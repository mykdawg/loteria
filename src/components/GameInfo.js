import React from 'react';
import '../App.css';

/**
 * GameInfo Component
 * 
 * Displays game statistics (cards drawn, cards marked)
 * 
 * @param {number} cardsDrawn - Number of cards drawn
 * @param {number} cardsMarked - Number of cards marked
 * @param {string} language - Current language
 */
const GameInfo = ({ cardsDrawn, cardsMarked, language }) => {
  return (
    <div className="game-info">
      {language === 'es' ? (
        <>
          <p>Cartas sacadas: {cardsDrawn}/54</p>
          <p>Cartas marcadas: {cardsMarked}/16</p>
        </>
      ) : (
        <>
          <p>Cards drawn: {cardsDrawn}/54</p>
          <p>Cards marked: {cardsMarked}/16</p>
        </>
      )}
    </div>
  );
};

export default GameInfo;