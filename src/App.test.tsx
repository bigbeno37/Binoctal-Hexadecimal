import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock the game logic for predictable behavior
vi.mock('@/utils/gameLogic', () => ({
  generateNewQuestion: vi.fn(() => ({
    number: 15,
    fromBase: 10,
    toBase: 16,
  })),
}));

describe('App Integration Tests', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllTimers();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should start with difficulty selection screen', () => {
    render(<App />);

    expect(screen.getByText('Binoctal Hexadecimal')).toBeInTheDocument();
    expect(screen.getByText('Choose your difficulty:')).toBeInTheDocument();
    expect(screen.getByText('Easy')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Hard')).toBeInTheDocument();
  });

  it('should navigate from difficulty selection to game screen', async () => {
    render(<App />);

    await user.click(screen.getByText('Easy'));

    await waitFor(() => {
      expect(screen.getByText('60')).toBeInTheDocument(); // Timer
      expect(screen.getByText('15')).toBeInTheDocument(); // Number
      expect(screen.getByText('Score: 0')).toBeInTheDocument();
    });

    expect(
      screen.queryByText('Choose your difficulty:')
    ).not.toBeInTheDocument();
  });

  it('should complete a full game flow with correct answer', async () => {
    render(<App />);

    // Start game
    await user.click(screen.getByText('Medium'));

    await waitFor(() => {
      expect(screen.getByText('60')).toBeInTheDocument();
    });

    // Answer question correctly
    const input = screen.getByPlaceholderText('Enter hexadecimal value');
    await user.type(input, 'F');
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(screen.getByText('Score: 1')).toBeInTheDocument();
    });

    // End game by running out of time
    vi.advanceTimersByTime(60000);

    await waitFor(() => {
      expect(screen.getByText('Game Over!')).toBeInTheDocument();
      expect(screen.getByText('Your final score:')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument(); // Final score
      expect(screen.getByText('Play again?')).toBeInTheDocument();
    });
  });

  it('should handle game over with zero score', async () => {
    render(<App />);

    await user.click(screen.getByText('Hard'));

    await waitFor(() => {
      expect(screen.getByText('60')).toBeInTheDocument();
    });

    // Don't answer any questions, just let timer run out
    vi.advanceTimersByTime(60000);

    await waitFor(() => {
      expect(screen.getByText('Game Over!')).toBeInTheDocument();
      expect(screen.getByText('0')).toBeInTheDocument(); // Final score
    });
  });

  it('should allow playing again after game over', async () => {
    render(<App />);

    // Complete first game
    await user.click(screen.getByText('Easy'));

    await waitFor(() => {
      expect(screen.getByText('60')).toBeInTheDocument();
    });

    vi.advanceTimersByTime(60000);

    await waitFor(() => {
      expect(screen.getByText('Game Over!')).toBeInTheDocument();
    });

    // Start new game
    await user.click(screen.getByText('Medium'));

    await waitFor(() => {
      expect(screen.getByText('60')).toBeInTheDocument(); // Timer reset
      expect(screen.getByText('Score: 0')).toBeInTheDocument(); // Score reset
    });

    expect(screen.queryByText('Game Over!')).not.toBeInTheDocument();
  });

  it('should handle incorrect answers during gameplay', async () => {
    render(<App />);

    await user.click(screen.getByText('Easy'));

    await waitFor(() => {
      expect(screen.getByText('60')).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText('Enter hexadecimal value');

    // Give incorrect answer
    await user.type(input, '10');
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(input).toHaveClass('border-red-500');
    });

    // Score should remain 0
    expect(screen.getByText('Score: 0')).toBeInTheDocument();
  });

  it('should maintain game state correctly between questions', async () => {
    render(<App />);

    await user.click(screen.getByText('Medium'));

    await waitFor(() => {
      expect(screen.getByText('60')).toBeInTheDocument();
    });

    // Answer first question correctly
    const input = screen.getByPlaceholderText('Enter hexadecimal value');
    await user.type(input, 'F');
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(screen.getByText('Score: 1')).toBeInTheDocument();
    });

    // Wait for next question to appear
    vi.advanceTimersByTime(1000);

    await waitFor(() => {
      expect((input as HTMLInputElement).value).toBe(''); // Input should be cleared
    });

    // Timer should still be running (less than 60 but greater than 0)
    vi.advanceTimersByTime(5000);
    expect(screen.getByText('54')).toBeInTheDocument();
  });

  it('should prevent game interaction when timer reaches zero', async () => {
    render(<App />);

    await user.click(screen.getByText('Easy'));

    await waitFor(() => {
      expect(screen.getByText('60')).toBeInTheDocument();
    });

    // Let timer run out
    vi.advanceTimersByTime(60000);

    await waitFor(() => {
      const input = screen.queryByPlaceholderText('Enter hexadecimal value');
      const submitButton = screen.queryByText('Submit');

      // Game should be over, so these elements should not be interactive
      if (input) expect(input).toBeDisabled();
      if (submitButton) expect(submitButton).toBeDisabled();
    });
  });

  it('should display different difficulty ranges correctly', async () => {
    render(<App />);

    expect(screen.getByText('0-25')).toBeInTheDocument(); // Easy
    expect(screen.getByText('0-100')).toBeInTheDocument(); // Medium
    expect(screen.getByText('0-1000')).toBeInTheDocument(); // Hard

    await user.click(screen.getByText('Hard'));

    // Should navigate to game screen regardless of difficulty
    await waitFor(() => {
      expect(screen.getByText('60')).toBeInTheDocument();
    });
  });
});
