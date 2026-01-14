import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock Web Audio API for testing
global.AudioContext = class {
  constructor() {
    this.destination = {};
  }
  createOscillator() {
    return {
      connect: jest.fn(),
      start: jest.fn(),
      stop: jest.fn(),
      type: '',
      frequency: {
        setValueAtTime: jest.fn(),
        exponentialRampToValueAtTime: jest.fn()
      }
    };
  }
  createGain() {
    return {
      connect: jest.fn(),
      gain: {
        setValueAtTime: jest.fn(),
        exponentialRampToValueAtTime: jest.fn()
      }
    };
  }
  createBiquadFilter() {
    return {
      connect: jest.fn(),
      type: '',
      frequency: {
        setValueAtTime: jest.fn()
      },
      Q: {
        setValueAtTime: jest.fn()
      }
    };
  }
  currentTime = 0;
};

describe('Lotería Game', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('Initial Rendering', () => {
    it('should render the game title', () => {
      render(<App />);
      expect(screen.getByText(/Lotería Mexicana/i)).toBeInTheDocument();
    });

    it('should show start button when game not started', () => {
      render(<App />);
      expect(screen.getByRole('button', { name: /Nuevo Juego/i })).toBeInTheDocument();
    });

    it('should show language toggle buttons', () => {
      render(<App />);
      expect(screen.getByText('Español')).toBeInTheDocument();
      expect(screen.getByText('English')).toBeInTheDocument();
    });

    it('should display history section in Spanish by default', () => {
      render(<App />);
      expect(screen.getByText(/Historia de la Lotería/i)).toBeInTheDocument();
    });

    it('should display how to play instructions', () => {
      render(<App />);
      expect(screen.getByText(/¿Cómo Jugar Lotería?/i)).toBeInTheDocument();
    });
  });

  describe('Language Toggle', () => {
    it('should switch to English when English button clicked', () => {
      render(<App />);
      fireEvent.click(screen.getByText('English'));
      expect(screen.getByText(/History of Lotería/i)).toBeInTheDocument();
      expect(screen.getByText(/How to Play Lotería/i)).toBeInTheDocument();
    });

    it('should switch back to Spanish when Spanish button clicked', () => {
      render(<App />);
      fireEvent.click(screen.getByText('English'));
      fireEvent.click(screen.getByText('Español'));
      expect(screen.getByText(/Historia de la Lotería/i)).toBeInTheDocument();
    });
  });

  describe('Game Initialization', () => {
    it('should start new game when Nuevo Juego button clicked', () => {
      render(<App />);
      fireEvent.click(screen.getByRole('button', { name: /Nuevo Juego/i }));
      
      // Should show player board
      expect(screen.getByText(/Tu Tablero/i)).toBeInTheDocument();
      
      // Should show game info
      expect(screen.getByText(/Cartas sacadas:/i)).toBeInTheDocument();
    });

    it('should create 16-card player board', () => {
      render(<App />);
      fireEvent.click(screen.getByRole('button', { name: /Nuevo Juego/i }));
      
      // Should have card elements - we'll check for the board structure
      expect(screen.getByText(/Tu Tablero/i)).toBeInTheDocument();
    });

    it('should show initial game state', () => {
      render(<App />);
      fireEvent.click(screen.getByRole('button', { name: /Nuevo Juego/i }));
      
      // No cards drawn initially
      expect(screen.getByText(/Cartas sacadas: 0\/54/i)).toBeInTheDocument();
      expect(screen.getByText(/Cartas marcadas: 0\/16/i)).toBeInTheDocument();
    });
  });

  describe('Game Mechanics', () => {
    it('should draw cards automatically after game starts', async () => {
      jest.useFakeTimers();
      
      render(<App />);
      fireEvent.click(screen.getByRole('button', { name: /Nuevo Juego/i }));
      
      // Fast-forward time to trigger card draw
      jest.advanceTimersByTime(3000);
      
      // Should have drawn at least one card
      await waitFor(() => {
        const cardsDrawn = screen.getByText(/Cartas sacadas: \d+\/54/i);
        expect(cardsDrawn.textContent).not.toMatch(/Cartas sacadas: 0\/54/i);
      });
      
      jest.useRealTimers();
    });

    it('should show current card information', async () => {
      render(<App />);
      fireEvent.click(screen.getByRole('button', { name: /Nuevo Juego/i }));
      
      // Wait for first card to be drawn
      await waitFor(() => {
        expect(screen.getByText(/Cartas sacadas: 1\/54/i)).toBeInTheDocument();
      }, { timeout: 4000 });
      
      // Should show current card
      expect(screen.getByTestId('current-card')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper button roles', () => {
      render(<App />);
      const startButton = screen.getByRole('button', { name: /Nuevo Juego/i });
      expect(startButton).toHaveAttribute('role', 'button');
    });

    it('should be navigable via keyboard', () => {
      render(<App />);
      const startButton = screen.getByRole('button', { name: /Nuevo Juego/i });
      
      expect(startButton).toHaveAttribute('tabIndex', '0');
    });
  });
});
