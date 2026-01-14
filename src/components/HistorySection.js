import React from 'react';
import '../App.css';

/**
 * HistorySection Component
 * 
 * Displays cultural background about Lotería in selected language
 * 
 * @param {string} language - Current language
 */
const HistorySection = ({ language }) => {
  return (
    <div className="game-background">
      {language === 'es' ? (
        <div className="background-spanish">
          <h3>Historia de la Lotería</h3>
          <p>La Lotería es un juego tradicional mexicano que se remonta al siglo XVIII, inspirado en juegos europeos similares. Este juego de mesa, similar al bingo, se ha convertido en una parte esencial de la cultura mexicana y es disfrutado por personas de todas las edades.</p>
          <p>Originalmente traído por los españoles durante la colonización, el juego evolucionó para incluir imágenes y símbolos que representan la cultura, la vida cotidiana y el folclore mexicano. Cada carta tiene un nombre y una frase tradicional que el "cantador" anuncia durante el juego.</p>
          <p>La Lotería no es solo un juego, sino una tradición cultural que une a familias y amigos en celebraciones, ferias y reuniones sociales.</p>
        </div>
      ) : (
        <div className="background-english">
          <h3>History of Lotería</h3>
          <p>Lotería is a traditional Mexican game dating back to the 18th century, inspired by similar European games. This board game, similar to bingo, has become an essential part of Mexican culture and is enjoyed by people of all ages.</p>
          <p>Originally brought by the Spanish during colonization, the game evolved to include images and symbols representing Mexican culture, daily life, and folklore. Each card has a name and a traditional phrase that the "caller" announces during the game.</p>
          <p>Lotería is not just a game, but a cultural tradition that brings together families and friends at celebrations, fairs, and social gatherings.</p>
        </div>
      )}
    </div>
  );
};

export default HistorySection;