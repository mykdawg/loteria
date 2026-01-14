import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LanguageToggle from '../../components/LanguageToggle';

describe('LanguageToggle Component', () => {
  it('should show Español button as active when language is es', () => {
    render(<LanguageToggle language="es" onLanguageChange={() => {}} />);
    
    const españolButton = screen.getByText('Español');
    expect(españolButton).toHaveClass('active');
  });

  it('should show English button as active when language is en', () => {
    render(<LanguageToggle language="en" onLanguageChange={() => {}} />);
    
    const englishButton = screen.getByText('English');
    expect(englishButton).toHaveClass('active');
  });

  it('should call onLanguageChange with "es" when Español clicked', () => {
    const mockOnLanguageChange = jest.fn();
    render(<LanguageToggle language="en" onLanguageChange={mockOnLanguageChange} />);
    
    fireEvent.click(screen.getByText('Español'));
    expect(mockOnLanguageChange).toHaveBeenCalledWith('es');
  });

  it('should call onLanguageChange with "en" when English clicked', () => {
    const mockOnLanguageChange = jest.fn();
    render(<LanguageToggle language="es" onLanguageChange={mockOnLanguageChange} />);
    
    fireEvent.click(screen.getByText('English'));
    expect(mockOnLanguageChange).toHaveBeenCalledWith('en');
  });

  it('should have proper accessibility attributes', () => {
    render(<LanguageToggle language="es" onLanguageChange={() => {}} />);
    
    const españolButton = screen.getByText('Español');
    const englishButton = screen.getByText('English');
    
    expect(españolButton).toHaveAttribute('role', 'button');
    expect(españolButton).toHaveAttribute('tabIndex', '0');
    expect(españolButton).toHaveAttribute('aria-label', 'Español');
    
    expect(englishButton).toHaveAttribute('role', 'button');
    expect(englishButton).toHaveAttribute('tabIndex', '0');
    expect(englishButton).toHaveAttribute('aria-label', 'English');
  });
});