import { useState, useEffect, useRef } from 'react';
import './App.css';

// Traditional Lotería cards with their names and traditional calls
const loteriaCards = [
  { id: 1, name: 'El Sol', emoji: '☀️', call: 'El sol que nos da vida' },
  { id: 2, name: 'La Luna', emoji: '🌙', call: 'La luna que alumbra de noche' },
  { id: 3, name: 'El Corazón', emoji: '❤️', call: 'El corazón que late de amor' },
  { id: 4, name: 'La Estrella', emoji: '⭐', call: 'La estrella que guía a los reyes' },
  { id: 5, name: 'El Gallo', emoji: '🐓', call: 'El gallo que canta al amanecer' },
  { id: 6, name: 'El Diablito', emoji: '👹', call: 'El diablito que siempre está jugando' },
  { id: 7, name: 'La Dama', emoji: '👗', call: 'La dama elegante y refinada' },
  { id: 8, name: 'El Catrín', emoji: '🎩', call: 'El catrín que va a la moda' },
  { id: 9, name: 'El Paraguas', emoji: '☔', call: 'El paraguas para la lluvia' },
  { id: 10, name: 'La Sirena', emoji: '🧜‍♀️', call: 'La sirena que canta en el mar' },
  { id: 11, name: 'La Escalera', emoji: '🪜', call: 'La escalera para subir alto' },
  { id: 12, name: 'El Barril', emoji: '🍷', call: 'El barril lleno de vino' },
  { id: 13, name: 'El Árbol', emoji: '🌳', call: 'El árbol que da sombra' },
  { id: 14, name: 'El Melón', emoji: '🍈', call: 'El melón dulce y fresco' },
  { id: 15, name: 'El Valiente', emoji: '💪', call: 'El valiente que no tiene miedo' },
  { id: 16, name: 'El Gorrito', emoji: '🎓', call: 'El gorrito del graduado' },
];

function App() {
  const [playerBoard, setPlayerBoard] = useState([]);
  const [drawnCards, setDrawnCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [markedPositions, setMarkedPositions] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [language, setLanguage] = useState('es');

  // Start a new game
  const startNewGame = () => {
    // Create a player board with 16 random unique cards
    const shuffled = [...loteriaCards].sort(() => 0.5 - Math.random());
    const board = shuffled.slice(0, 16);
    
    setPlayerBoard(board);
    setDrawnCards([]);
    setCurrentCard(null);
    setMarkedPositions([]);
    setGameWon(false);
    setGameStarted(true);
  };

  // Draw a new card with traditional Mexican call
  const drawCard = () => {
    if (gameWon || !gameStarted) return;
    
    // Filter out already drawn cards
    const availableCards = loteriaCards.filter(card => 
      !drawnCards.some(drawn => drawn.id === card.id)
    );
    
    if (availableCards.length === 0) {
      // All cards have been drawn - game over
      return;
    }
    
    // Draw a random card
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const newCard = availableCards[randomIndex];
    
    setDrawnCards([...drawnCards, newCard]);
    setCurrentCard(newCard);
    
    // Play traditional card announcement sound
    playCardCallSound(newCard);
    
    // Check if this card is on the player's board
    const cardOnBoard = playerBoard.find(card => card.id === newCard.id);
    if (cardOnBoard) {
      // Find the position of this card on the board
      const position = playerBoard.indexOf(cardOnBoard);
      
      // Check if this position is already marked
      if (!markedPositions.includes(position)) {
        const newMarkedPositions = [...markedPositions, position];
        setMarkedPositions(newMarkedPositions);
        
        // Check for win condition (complete any row, column, or diagonal)
        checkForWin(newMarkedPositions);
      }
    }
  };

  // Play sound for card announcement - traditional Mexican cantor style
  const playCardCallSound = (card) => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create a traditional "cantor" announcement sound
      // Different sounds for different card types
      
      const now = audioContext.currentTime;
      
      // Base sound - like a quick maraca shake
      const maraca = audioContext.createOscillator();
      const maracaGain = audioContext.createGain();
      const maracaFilter = audioContext.createBiquadFilter();
      
      maraca.connect(maracaFilter);
      maracaFilter.connect(maracaGain);
      maracaGain.connect(audioContext.destination);
      
      maraca.type = 'whiteNoise';
      maracaFilter.type = 'bandpass';
      maracaFilter.frequency.setValueAtTime(3000, now);
      maracaFilter.Q.setValueAtTime(10, now);
      
      maracaGain.gain.setValueAtTime(0.05, now);
      maracaGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      
      maraca.start(now);
      maraca.stop(now + 0.2);
      
      // Card-specific sounds
      if (card.name.includes('El Sol') || card.name.includes('La Luna') || card.name.includes('La Estrella')) {
        // Celestial cards - twinkling sound
        const twinkle = audioContext.createOscillator();
        const twinkleGain = audioContext.createGain();
        twinkle.connect(twinkleGain);
        twinkleGain.connect(audioContext.destination);
        
        twinkle.type = 'sine';
        twinkle.frequency.setValueAtTime(2000, now + 0.1);
        twinkleGain.gain.setValueAtTime(0.03, now + 0.1);
        twinkleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        
        twinkle.start(now + 0.1);
        twinkle.stop(now + 0.3);
      } else if (card.name.includes('El Corazón')) {
        // Heart card - heartbeat sound
        const heartbeat = audioContext.createOscillator();
        const heartbeatGain = audioContext.createGain();
        heartbeat.connect(heartbeatGain);
        heartbeatGain.connect(audioContext.destination);
        
        heartbeat.type = 'sine';
        heartbeat.frequency.setValueAtTime(80, now + 0.1);
        heartbeatGain.gain.setValueAtTime(0.05, now + 0.1);
        heartbeatGain.gain.setValueAtTime(0, now + 0.15);
        heartbeatGain.gain.setValueAtTime(0.05, now + 0.2);
        heartbeatGain.gain.setValueAtTime(0, now + 0.25);
        
        heartbeat.start(now + 0.1);
        heartbeat.stop(now + 0.3);
      } else if (card.name.includes('El Gallo') || card.name.includes('El Pájaro')) {
        // Animal cards - bird-like sound
        const bird = audioContext.createOscillator();
        const birdGain = audioContext.createGain();
        bird.connect(birdGain);
        birdGain.connect(audioContext.destination);
        
        bird.type = 'triangle';
        bird.frequency.setValueAtTime(1500, now + 0.1);
        bird.frequency.exponentialRampToValueAtTime(2500, now + 0.15);
        birdGain.gain.setValueAtTime(0.04, now + 0.1);
        birdGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        
        bird.start(now + 0.1);
        bird.stop(now + 0.2);
      }
      
    } catch (error) {
      console.log("Card call sound not supported:", error);
    }
  };

  // Check if the player has won
  const checkForWin = (positions) => {
    const winningPatterns = [
      // Rows
      [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15],
      // Columns
      [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15],
      // Diagonals
      [0, 5, 10, 15], [3, 6, 9, 12]
    ];
    
    for (const pattern of winningPatterns) {
      const isWinning = pattern.every(pos => positions.includes(pos));
      if (isWinning) {
        setGameWon(true);
        playWinSound();
        return;
      }
    }
  };

  // Play victory sound - Authentic Mexican celebration with trumpets and traditional calls
  const playWinSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Traditional Mexican fanfare - inspired by mariachi trumpet flourishes
      // Create multiple oscillators for rich, festive sound
      
      // Main trumpet (lead melody)
      const trumpet1 = audioContext.createOscillator();
      const trumpetGain1 = audioContext.createGain();
      trumpet1.connect(trumpetGain1);
      trumpetGain1.connect(audioContext.destination);
      
      trumpet1.type = 'sawtooth';
      trumpet1.frequency.setValueAtTime(392, audioContext.currentTime); // G4
      
      // Trumpet fanfare pattern - rising then falling
      trumpet1.frequency.exponentialRampToValueAtTime(784, audioContext.currentTime + 0.3); // G5
      trumpet1.frequency.exponentialRampToValueAtTime(523.25, audioContext.currentTime + 0.6); // C5
      
      trumpetGain1.gain.setValueAtTime(0.05, audioContext.currentTime);
      trumpetGain1.gain.exponentialRampToValueAtTime(0.2, audioContext.currentTime + 0.1);
      trumpetGain1.gain.exponentialRampToValueAtTime(0.05, audioContext.currentTime + 0.7);
      
      trumpet1.start(audioContext.currentTime);
      trumpet1.stop(audioContext.currentTime + 0.8);
      
      // Second trumpet (harmony)
      const trumpet2 = audioContext.createOscillator();
      const trumpetGain2 = audioContext.createGain();
      trumpet2.connect(trumpetGain2);
      trumpetGain2.connect(audioContext.destination);
      
      trumpet2.type = 'sawtooth';
      trumpet2.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
      
      trumpet2.frequency.exponentialRampToValueAtTime(1046.5, audioContext.currentTime + 0.3); // C6
      trumpet2.frequency.exponentialRampToValueAtTime(659.25, audioContext.currentTime + 0.6); // E5
      
      trumpetGain2.gain.setValueAtTime(0.03, audioContext.currentTime);
      trumpetGain2.gain.exponentialRampToValueAtTime(0.15, audioContext.currentTime + 0.1);
      trumpetGain2.gain.exponentialRampToValueAtTime(0.03, audioContext.currentTime + 0.7);
      
      trumpet2.start(audioContext.currentTime + 0.1);
      trumpet2.stop(audioContext.currentTime + 0.9);
      
      // Add traditional Mexican percussion - like a quick guiro or tambourine
      const percussion = audioContext.createOscillator();
      const percussionGain = audioContext.createGain();
      const percussionFilter = audioContext.createBiquadFilter();
      
      percussion.connect(percussionFilter);
      percussionFilter.connect(percussionGain);
      percussionGain.connect(audioContext.destination);
      
      percussion.type = 'square';
      percussion.frequency.setValueAtTime(2000, audioContext.currentTime);
      percussionFilter.type = 'highpass';
      percussionFilter.frequency.setValueAtTime(5000, audioContext.currentTime);
      
      // Quick rhythmic pattern
      percussionGain.gain.setValueAtTime(0.1, audioContext.currentTime + 0.2);
      percussionGain.gain.setValueAtTime(0, audioContext.currentTime + 0.25);
      percussionGain.gain.setValueAtTime(0.1, audioContext.currentTime + 0.3);
      percussionGain.gain.setValueAtTime(0, audioContext.currentTime + 0.35);
      percussionGain.gain.setValueAtTime(0.1, audioContext.currentTime + 0.4);
      percussionGain.gain.setValueAtTime(0, audioContext.currentTime + 0.45);
      
      percussion.start(audioContext.currentTime);
      percussion.stop(audioContext.currentTime + 0.5);
      
      // Add a traditional "¡Lotería!" vocal effect using a synth voice
      setTimeout(() => {
        const vocal = audioContext.createOscillator();
        const vocalGain = audioContext.createGain();
        const vocalFilter = audioContext.createBiquadFilter();
        
        vocal.connect(vocalFilter);
        vocalFilter.connect(vocalGain);
        vocalGain.connect(audioContext.destination);
        
        vocal.type = 'triangle';
        vocalFilter.type = 'lowpass';
        vocalFilter.frequency.setValueAtTime(1000, audioContext.currentTime);
        
        // Create a "Lotería" melody pattern
        const now = audioContext.currentTime;
        vocal.frequency.setValueAtTime(659.25, now); // E5
        vocal.frequency.setValueAtTime(784, now + 0.1); // G5
        vocal.frequency.setValueAtTime(880, now + 0.2); // A5
        vocal.frequency.setValueAtTime(784, now + 0.3); // G5
        vocal.frequency.setValueAtTime(659.25, now + 0.4); // E5
        
        vocalGain.gain.setValueAtTime(0.15, now);
        vocalGain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        
        vocal.start(now);
        vocal.stop(now + 0.5);
      }, 300);
      
    } catch (error) {
      console.log("Enhanced audio playback not supported:", error);
      // Fallback to simple celebration sound
      const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YUAAAAA=');
      audio.play().catch(e => console.log("Fallback audio failed:", e));
    }
  };

  // Handle manual marking (if player clicks on a card)
  const handleCardClick = (card, position) => {
    if (gameWon || !gameStarted) return;
    
    // Check if this card has been drawn
    const isDrawn = drawnCards.some(drawn => drawn.id === card.id);
    
    if (isDrawn && !markedPositions.includes(position)) {
      const newMarkedPositions = [...markedPositions, position];
      setMarkedPositions(newMarkedPositions);
      checkForWin(newMarkedPositions);
    }
  };

  // Auto-draw cards every 3 seconds when game is started
  useEffect(() => {
    if (gameStarted && !gameWon) {
      const timer = setInterval(() => {
        drawCard();
      }, 3000);
      
      return () => clearInterval(timer);
    }
  }, [gameStarted, gameWon, drawnCards, markedPositions]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎲 Lotería Mexicana 🎲</h1>
        
        {!gameStarted ? (
          <div className="start-screen">
            <div className="language-tabs">
              <button className="language-tab active" onClick={() => setLanguage('es')} role="button" tabIndex="0">Español</button>
              <button className="language-tab" onClick={() => setLanguage('en')} role="button" tabIndex="0">English</button>
            </div>
            
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
            
             <button onClick={startNewGame} className="start-button" role="button" tabIndex="0">
              {language === 'es' ? 'Nuevo Juego' : 'New Game'}
            </button>
          </div>
        ) : (
          <div className="game-container">
            {gameWon ? (
                <div className="win-message">
                  <h2>¡Lotería! 🎉</h2>
                  {language === 'es' ? (
                    <p>¡Has ganado! Completa una línea de cartas.</p>
                  ) : (
                    <p>You won! You completed a line of cards.</p>
                  )}
                   <button onClick={startNewGame} role="button" tabIndex="0">
                    {language === 'es' ? 'Jugar de nuevo' : 'Play Again'}
                  </button>
                </div>
                

            ) : (
              <>
                 <div className="current-card" data-testid="current-card">
                  {currentCard && (
                    <div>
                      <div className="card-emoji">{currentCard.emoji}</div>
                      <h3>{currentCard.name}</h3>
                      <p><em>{currentCard.call}</em></p>
                    </div>
                  )}
                </div>
                
                <div className="player-board">
                  <h3>Tu Tablero</h3>
                  <div className="board-grid">
                    {playerBoard.map((card, index) => (
                       <div
                        key={card.id}
                        className={`card ${markedPositions.includes(index) ? 'marked' : ''}`}
                        onClick={() => handleCardClick(card, index)}
                        data-testid="loteria-card"
                        role="button"
                        tabIndex="0"
                      >
                        <div className="card-emoji">{card.emoji}</div>
                        <div className="card-name">{card.name}</div>
                        {markedPositions.includes(index) && (
                          <div className="marker">🟢</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="game-info">
                  {language === 'es' ? (
                    <>
                      <p>Cartas sacadas: {drawnCards.length}/54</p>
                      <p>Cartas marcadas: {markedPositions.length}/16</p>
                    </>
                  ) : (
                    <>
                      <p>Cards drawn: {drawnCards.length}/54</p>
                      <p>Cards marked: {markedPositions.length}/16</p>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
