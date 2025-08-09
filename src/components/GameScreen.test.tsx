import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GameScreen } from './GameScreen';

// Mock the game logic to have predictable behavior
vi.mock('@/utils/gameLogic', () => ({
  generateNewQuestion: vi.fn(() => ({
    number: 15,
    fromBase: 10,
    toBase: 16,
  })),
}));

describe('GameScreen', () => {
  const mockOnGameEnd = vi.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    mockOnGameEnd.mockClear();
    vi.clearAllTimers();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should render initial game state correctly', () => {
    render(<GameScreen difficulty="Easy" onGameEnd={mockOnGameEnd} />);

    expect(screen.getByText('60')).toBeInTheDocument(); // Timer
    expect(screen.getByText('seconds remaining')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument(); // Number
    expect(screen.getByText('base 10')).toBeInTheDocument();
    expect(screen.getByText(/What is this number in base/)).toBeInTheDocument();
    expect(screen.getByText('16')).toBeInTheDocument(); // Target base
    expect(screen.getByText('(hexadecimal)')).toBeInTheDocument();
    expect(screen.getByText('Score: 0')).toBeInTheDocument();
  });

  it('should accept correct answer and increase score', async () => {
    render(<GameScreen difficulty="Easy" onGameEnd={mockOnGameEnd} />);

    const input = screen.getByPlaceholderText('Enter hexadecimal value');
    const submitButton = screen.getByText('Submit');

    await user.type(input, 'F');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Score: 1')).toBeInTheDocument();
    });
  });

  it('should handle incorrect answer with animation', async () => {
    render(<GameScreen difficulty="Easy" onGameEnd={mockOnGameEnd} />);

    const input = screen.getByPlaceholderText('Enter hexadecimal value');

    await user.type(input, '10'); // Incorrect answer
    await user.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(input).toHaveClass('border-red-500');
      expect(input).toHaveClass('animate-shake');
    });

    expect(screen.getByText('Score: 0')).toBeInTheDocument();
  });

  it('should handle Enter key for submission', async () => {
    render(<GameScreen difficulty="Easy" onGameEnd={mockOnGameEnd} />);

    const input = screen.getByPlaceholderText('Enter hexadecimal value');

    await user.type(input, 'F');
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(screen.getByText('Score: 1')).toBeInTheDocument();
    });
  });

  it('should reject invalid base input', async () => {
    render(<GameScreen difficulty="Easy" onGameEnd={mockOnGameEnd} />);

    const input = screen.getByPlaceholderText('Enter hexadecimal value');

    await user.type(input, 'G'); // Invalid hex character
    await user.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(input).toHaveClass('border-red-500');
    });

    expect(screen.getByText('Score: 0')).toBeInTheDocument();
  });

  it('should disable input when game is not active', () => {
    render(<GameScreen difficulty="Easy" onGameEnd={mockOnGameEnd} />);

    // Fast forward to end the game
    vi.advanceTimersByTime(60000);

    const input = screen.getByPlaceholderText('Enter hexadecimal value');
    const submitButton = screen.getByText('Submit');

    expect(input).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });

  it('should call onGameEnd when timer reaches 0', async () => {
    render(<GameScreen difficulty="Easy" onGameEnd={mockOnGameEnd} />);

    vi.advanceTimersByTime(60000);

    await waitFor(() => {
      expect(mockOnGameEnd).toHaveBeenCalledWith(0);
    });
  });

  it('should update timer correctly', () => {
    render(<GameScreen difficulty="Easy" onGameEnd={mockOnGameEnd} />);

    expect(screen.getByText('60')).toBeInTheDocument();

    vi.advanceTimersByTime(1000);
    expect(screen.getByText('59')).toBeInTheDocument();

    vi.advanceTimersByTime(5000);
    expect(screen.getByText('54')).toBeInTheDocument();
  });

  it('should not allow negative timer values', () => {
    render(<GameScreen difficulty="Easy" onGameEnd={mockOnGameEnd} />);

    vi.advanceTimersByTime(65000);

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should convert user input to uppercase', async () => {
    render(<GameScreen difficulty="Easy" onGameEnd={mockOnGameEnd} />);

    const input = screen.getByPlaceholderText('Enter hexadecimal value');

    await user.type(input, 'f');

    expect((input as HTMLInputElement).value).toBe('F');
  });

  it('should show correct animation for correct answers', async () => {
    render(<GameScreen difficulty="Easy" onGameEnd={mockOnGameEnd} />);

    const input = screen.getByPlaceholderText('Enter hexadecimal value');

    await user.type(input, 'F');
    await user.click(screen.getByText('Submit'));

    await waitFor(() => {
      const checkIcon = document.querySelector('.lucide-check');
      expect(checkIcon).toBeInTheDocument();
    });
  });

  it('should clear input after correct answer', async () => {
    render(<GameScreen difficulty="Easy" onGameEnd={mockOnGameEnd} />);

    const input = screen.getByPlaceholderText('Enter hexadecimal value');

    await user.type(input, 'F');
    await user.click(screen.getByText('Submit'));

    // Wait for the animation and new question generation
    vi.advanceTimersByTime(1000);

    await waitFor(() => {
      expect((input as HTMLInputElement).value).toBe('');
    });
  });

  it('should maintain focus on input field', () => {
    render(<GameScreen difficulty="Easy" onGameEnd={mockOnGameEnd} />);

    const input = screen.getByPlaceholderText('Enter hexadecimal value');
    expect(input).toHaveFocus();
  });

  it('should not submit empty input', async () => {
    render(<GameScreen difficulty="Easy" onGameEnd={mockOnGameEnd} />);

    const submitButton = screen.getByText('Submit');
    expect(submitButton).toBeDisabled();

    await user.click(submitButton);
    expect(screen.getByText('Score: 0')).toBeInTheDocument();
  });

  it('should not submit whitespace-only input', async () => {
    render(<GameScreen difficulty="Easy" onGameEnd={mockOnGameEnd} />);

    const input = screen.getByPlaceholderText('Enter hexadecimal value');
    const submitButton = screen.getByText('Submit');

    await user.type(input, '   ');
    expect(submitButton).toBeDisabled();
  });
});
