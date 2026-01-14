import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../../components/Card';

describe('Card Component', () => {
  const mockCard = {
    id: 1,
    name: 'El Sol',
    emoji: '☀️',
    call: 'El sol que nos da vida'
  };

  it('should render card with emoji and name', () => {
    render(<Card card={mockCard} isMarked={false} onClick={() => {}} dataTestId="loteria-card" />);
    
    expect(screen.getByText('☀️')).toBeInTheDocument();
    expect(screen.getByText('El Sol')).toBeInTheDocument();
  });

  it('should show marker when isMarked is true', () => {
    render(<Card card={mockCard} isMarked={true} onClick={() => {}} dataTestId="loteria-card" />);
    
    expect(screen.getByText('🟢')).toBeInTheDocument();
  });

  it('should not show marker when isMarked is false', () => {
    render(<Card card={mockCard} isMarked={false} onClick={() => {}} dataTestId="loteria-card" />);
    
    expect(screen.queryByText('🟢')).not.toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const mockOnClick = jest.fn();
    render(<Card card={mockCard} isMarked={false} onClick={mockOnClick} dataTestId="loteria-card" />);
    
    fireEvent.click(screen.getByTestId('loteria-card'));
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('should have proper accessibility attributes', () => {
    render(<Card card={mockCard} isMarked={false} onClick={() => {}} dataTestId="loteria-card" />);
    
    const cardElement = screen.getByTestId('loteria-card');
    expect(cardElement).toHaveAttribute('role', 'button');
    expect(cardElement).toHaveAttribute('tabIndex', '0');
    expect(cardElement).toHaveAttribute('aria-label', 'El Sol ');
  });

  it('should have marked class when isMarked is true', () => {
    render(<Card card={mockCard} isMarked={true} onClick={() => {}} dataTestId="loteria-card" />);
    
    const cardElement = screen.getByTestId('loteria-card');
    expect(cardElement).toHaveClass('marked');
  });

  it('should not have marked class when isMarked is false', () => {
    render(<Card card={mockCard} isMarked={false} onClick={() => {}} dataTestId="loteria-card" />);
    
    const cardElement = screen.getByTestId('loteria-card');
    expect(cardElement).not.toHaveClass('marked');
  });
});