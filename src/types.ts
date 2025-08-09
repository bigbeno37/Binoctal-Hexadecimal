export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Base = 2 | 8 | 10 | 16;

export interface GameState {
  difficulty: Difficulty | null;
  currentNumber: number;
  currentBase: Base;
  targetBase: Base;
  timeLeft: number;
  score: number;
  gameActive: boolean;
  showResult: 'none' | 'correct' | 'incorrect';
}

export interface DifficultyConfig {
  name: Difficulty;
  range: [number, number];
}

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  Easy: { name: 'Easy', range: [0, 25] },
  Medium: { name: 'Medium', range: [0, 100] },
  Hard: { name: 'Hard', range: [0, 1000] },
};

export const BASES: Base[] = [2, 8, 10, 16];

export const BASE_NAMES: Record<Base, string> = {
  2: 'binary',
  8: 'octal',
  10: 'decimal',
  16: 'hexadecimal',
};
