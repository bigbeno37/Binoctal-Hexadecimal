import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check } from 'lucide-react';
import { GameState, Difficulty, BASE_NAMES } from '@/types';
import {
  convertToBase,
  convertFromBase,
  isValidBaseInput,
} from '@/utils/baseConversion';
import { generateNewQuestion } from '@/utils/gameLogic';
import { cn } from '@/lib/utils';

interface GameScreenProps {
  difficulty: Difficulty;
  onGameEnd: (score: number) => void;
}

export function GameScreen({ difficulty, onGameEnd }: GameScreenProps) {
  const [gameState, setGameState] = useState<GameState>(() => {
    const question = generateNewQuestion(difficulty);
    return {
      difficulty,
      currentNumber: question.number,
      currentBase: question.fromBase,
      targetBase: question.toBase,
      timeLeft: 60,
      score: 0,
      gameActive: true,
      showResult: 'none',
    };
  });

  const [userInput, setUserInput] = useState('');
  const [showCorrectAnimation, setShowCorrectAnimation] = useState(false);
  const [showIncorrectAnimation, setShowIncorrectAnimation] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (gameState.gameActive && gameState.timeLeft > 0) {
      const timer = setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }));
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    } else if (gameState.timeLeft === 0) {
      setGameState(prev => ({ ...prev, gameActive: false }));
      setTimeout(() => {
        onGameEnd(gameState.score);
      }, 0);
    }
  }, [gameState.timeLeft, gameState.gameActive, gameState.score, onGameEnd]);

  const generateNextQuestion = () => {
    const question = generateNewQuestion(difficulty);
    setGameState(prev => ({
      ...prev,
      currentNumber: question.number,
      currentBase: question.fromBase,
      targetBase: question.toBase,
      showResult: 'none',
    }));
    setUserInput('');
  };

  const handleSubmit = () => {
    if (!userInput.trim() || !gameState.gameActive) return;

    if (!isValidBaseInput(userInput, gameState.targetBase)) {
      setShowIncorrectAnimation(true);
      setTimeout(() => {
        setShowIncorrectAnimation(false);
      }, 500);
      return;
    }

    const userAnswer = convertFromBase(userInput, gameState.targetBase);
    const isCorrect = userAnswer === gameState.currentNumber;

    if (isCorrect) {
      setGameState(prev => ({ ...prev, score: prev.score + 1 }));
      setShowCorrectAnimation(true);

      setTimeout(() => {
        setShowCorrectAnimation(false);
        generateNextQuestion();
      }, 1000);
    } else {
      setShowIncorrectAnimation(true);
      setTimeout(() => {
        setShowIncorrectAnimation(false);
      }, 500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameState.currentNumber]);

  const displayedNumber = convertToBase(
    gameState.currentNumber,
    gameState.currentBase
  );
  const targetBaseName = BASE_NAMES[gameState.targetBase];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-purple-600 mb-4">
            {Math.max(0, gameState.timeLeft)}
          </div>
          <div className="text-lg text-gray-600">seconds remaining</div>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 border-2 border-purple-200 relative overflow-hidden">
          {showCorrectAnimation && (
            <div className="absolute inset-0 bg-green-100 animate-fade-in rounded-xl flex items-center justify-center">
              <Check className="w-24 h-24 text-green-600" />
            </div>
          )}

          <div className="text-center space-y-6">
            <div className="relative">
              <div className="text-6xl font-mono font-bold text-gray-800 mb-2">
                {displayedNumber}
              </div>
              <div className="absolute -bottom-2 right-4 text-sm text-gray-500 font-semibold">
                base {gameState.currentBase}
              </div>
            </div>

            <div className="text-xl text-gray-700">
              What is this number in base{' '}
              <span className="font-bold text-purple-600">
                {gameState.targetBase}
              </span>
              ?<br />
              <span className="text-base text-gray-500">
                ({targetBaseName})
              </span>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Input
                  ref={inputRef}
                  value={userInput}
                  onChange={e => {
                    setUserInput(e.target.value.toUpperCase());
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={`Enter ${targetBaseName} value`}
                  className={cn(
                    'text-center text-2xl font-mono w-64 h-12',
                    showIncorrectAnimation && 'bg-red-100 border-4 border-red-500 animate-shake'
                  )}
                  disabled={!gameState.gameActive}
                />
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!gameState.gameActive || !userInput.trim()}
                size="lg"
                className="w-32"
              >
                Submit
              </Button>
            </div>

            <div className="text-sm text-gray-600">
              Score:{' '}
              <span className="font-bold text-purple-600">
                {gameState.score}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
