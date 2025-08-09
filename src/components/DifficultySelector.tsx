import { Button } from '@/components/ui/button';
import { Difficulty, DIFFICULTY_CONFIGS } from '@/types';

interface DifficultySelectorProps {
  onSelectDifficulty: (difficulty: Difficulty) => void;
  showPlayAgain?: boolean;
  score?: number;
}

export function DifficultySelector({
  onSelectDifficulty,
  showPlayAgain = false,
  score,
}: DifficultySelectorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="text-center space-y-8">
        <div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Binoctal Hexadecimal
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Master number base conversions between binary, octal, decimal, and
            hexadecimal!
          </p>
        </div>

        {showPlayAgain && (
          <div className="mb-8 p-6 bg-white rounded-lg shadow-lg border-2 border-green-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Game Over!
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              Your final score:{' '}
              <span className="font-bold text-green-600">{score}</span>
            </p>
            <p className="text-lg text-gray-600">Play again?</p>
          </div>
        )}

        {!showPlayAgain && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Choose your difficulty:
            </h2>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {Object.values(DIFFICULTY_CONFIGS).map(config => (
            <Button
              key={config.name}
              onClick={() => {
                onSelectDifficulty(config.name);
              }}
              variant="outline"
              size="lg"
              className="w-48 h-16 text-lg font-semibold border-2 hover:scale-105 transition-all duration-200 bg-white hover:bg-blue-50"
            >
              <div className="text-center">
                <div className="font-bold">{config.name}</div>
                <div className="text-sm text-gray-500">
                  {config.range[0]}-{config.range[1]}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
