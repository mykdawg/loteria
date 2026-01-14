import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameBoard from '../../components/GameBoard';

describe('GameBoard Component', () => {
  const mockPlayerBoard = [
    { id: 1, name: 'El Sol', emoji: '☀️' },
    { id: 2, name: 'La Luna', emoji: '🌙' },
  ];

  it('should render game board title in Spanish', () => {
    render(
      <GameBoard 
        playerBoard={mockPlayerBoard}
        markedPositions={[]}
        onCardClick={() => {}}
        language="es"
      />
    );
    
    expect(screen.getByText('Tu Tablero')).toBeInTheDocument();
  });

  it('should render game board title in English', () => {
    render(
      <GameBoard 
        playerBoard={mockPlayerBoard}
        markedPositions={[]}
        onCardClick={() => {}}
        language="en"
      />
    );
    
    expect(screen.getByText('Your Board')).toBeInTheDocument();
  });

  it('should render correct number of cards', () => {
    render(
      <GameBoard 
        playerBoard={mockPlayerBoard}
        markedPositions={[]}
        onCardClick={() => {}}
        language="es"
      />
    );
    
    const cards = screen.getAllByTestId('loteria-card');
    expect(cards.length).toBe(mockPlayerBoard.length);
  });

  it('should have game board test ID', () => {
    render(
      <GameBoard 
        playerBoard={mockPlayerBoard}
        markedPositions={[]}
        onCardClick={() => {}}
        language="es"
      />
    );
    
    expect(screen.getByTestId('game-board')).toBeInTheDocument();
  });
});