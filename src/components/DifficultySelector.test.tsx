import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DifficultySelector } from './DifficultySelector';

describe('DifficultySelector', () => {
  const mockOnSelectDifficulty = vi.fn();

  beforeEach(() => {
    mockOnSelectDifficulty.mockClear();
  });

  it('should render the title and description', () => {
    render(<DifficultySelector onSelectDifficulty={mockOnSelectDifficulty} />);

    expect(screen.getByText('Binoctal Hexadecimal')).toBeInTheDocument();
    expect(
      screen.getByText(/Master number base conversions/)
    ).toBeInTheDocument();
    expect(screen.getByText('Choose your difficulty:')).toBeInTheDocument();
  });

  it('should render all difficulty buttons', () => {
    render(<DifficultySelector onSelectDifficulty={mockOnSelectDifficulty} />);

    expect(screen.getByText('Easy')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Hard')).toBeInTheDocument();

    expect(screen.getByText('0-25')).toBeInTheDocument();
    expect(screen.getByText('0-100')).toBeInTheDocument();
    expect(screen.getByText('0-1000')).toBeInTheDocument();
  });

  it('should call onSelectDifficulty when a difficulty button is clicked', () => {
    render(<DifficultySelector onSelectDifficulty={mockOnSelectDifficulty} />);

    fireEvent.click(screen.getByText('Easy'));
    expect(mockOnSelectDifficulty).toHaveBeenCalledWith('Easy');

    fireEvent.click(screen.getByText('Medium'));
    expect(mockOnSelectDifficulty).toHaveBeenCalledWith('Medium');

    fireEvent.click(screen.getByText('Hard'));
    expect(mockOnSelectDifficulty).toHaveBeenCalledWith('Hard');

    expect(mockOnSelectDifficulty).toHaveBeenCalledTimes(3);
  });

  it('should not show play again section by default', () => {
    render(<DifficultySelector onSelectDifficulty={mockOnSelectDifficulty} />);

    expect(screen.queryByText('Game Over!')).not.toBeInTheDocument();
    expect(screen.queryByText('Play again?')).not.toBeInTheDocument();
  });

  it('should show play again section when showPlayAgain is true', () => {
    render(
      <DifficultySelector
        onSelectDifficulty={mockOnSelectDifficulty}
        showPlayAgain={true}
        score={15}
      />
    );

    expect(screen.getByText('Game Over!')).toBeInTheDocument();
    expect(screen.getByText('Your final score:')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('Play again?')).toBeInTheDocument();
  });

  it('should hide initial difficulty selection text when showing play again', () => {
    render(
      <DifficultySelector
        onSelectDifficulty={mockOnSelectDifficulty}
        showPlayAgain={true}
        score={5}
      />
    );

    expect(
      screen.queryByText('Choose your difficulty:')
    ).not.toBeInTheDocument();
  });

  it('should display score correctly in play again mode', () => {
    render(
      <DifficultySelector
        onSelectDifficulty={mockOnSelectDifficulty}
        showPlayAgain={true}
        score={42}
      />
    );

    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('should still allow difficulty selection in play again mode', () => {
    render(
      <DifficultySelector
        onSelectDifficulty={mockOnSelectDifficulty}
        showPlayAgain={true}
        score={10}
      />
    );

    fireEvent.click(screen.getByText('Hard'));
    expect(mockOnSelectDifficulty).toHaveBeenCalledWith('Hard');
  });

  it('should handle score of 0 correctly', () => {
    render(
      <DifficultySelector
        onSelectDifficulty={mockOnSelectDifficulty}
        showPlayAgain={true}
        score={0}
      />
    );

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should have proper accessibility structure', () => {
    render(<DifficultySelector onSelectDifficulty={mockOnSelectDifficulty} />);

    const easyButton = screen.getByRole('button', { name: /Easy/ });
    const mediumButton = screen.getByRole('button', { name: /Medium/ });
    const hardButton = screen.getByRole('button', { name: /Hard/ });

    expect(easyButton).toBeInTheDocument();
    expect(mediumButton).toBeInTheDocument();
    expect(hardButton).toBeInTheDocument();

    expect(easyButton).not.toBeDisabled();
    expect(mediumButton).not.toBeDisabled();
    expect(hardButton).not.toBeDisabled();
  });
});
