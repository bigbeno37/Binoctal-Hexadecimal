import { useState } from 'react';
import { DifficultySelector } from '@/components/DifficultySelector';
import { GameScreen } from '@/components/GameScreen';
import { Difficulty } from '@/types';

function App() {
  const [currentScreen, setCurrentScreen] = useState<
    'difficulty' | 'game' | 'gameOver'
  >('difficulty');
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty | null>(null);
  const [finalScore, setFinalScore] = useState(0);

  const handleSelectDifficulty = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    setCurrentScreen('game');
  };

  const handleGameEnd = (score: number) => {
    setFinalScore(score);
    setCurrentScreen('gameOver');
  };

  const handlePlayAgain = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    setCurrentScreen('game');
  };

  if (currentScreen === 'difficulty') {
    return <DifficultySelector onSelectDifficulty={handleSelectDifficulty} />;
  }

  if (currentScreen === 'game' && selectedDifficulty) {
    return (
      <GameScreen difficulty={selectedDifficulty} onGameEnd={handleGameEnd} />
    );
  }

  if (currentScreen === 'gameOver') {
    return (
      <DifficultySelector
        onSelectDifficulty={handlePlayAgain}
        showPlayAgain={true}
        score={finalScore}
      />
    );
  }

  return null;
}

export default App;
