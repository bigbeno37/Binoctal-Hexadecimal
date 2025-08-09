import { Difficulty, Base, BASES, DIFFICULTY_CONFIGS } from '@/types';

export function generateRandomNumber(difficulty: Difficulty): number {
  const [min, max] = DIFFICULTY_CONFIGS[difficulty].range;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomBase(): Base {
  return BASES[Math.floor(Math.random() * BASES.length)];
}

export function getRandomBaseDifferentFrom(excludeBase: Base): Base {
  const availableBases = BASES.filter(base => base !== excludeBase);
  return availableBases[Math.floor(Math.random() * availableBases.length)];
}

export function generateNewQuestion(difficulty: Difficulty) {
  const number = generateRandomNumber(difficulty);
  const fromBase = getRandomBase();
  const toBase = getRandomBaseDifferentFrom(fromBase);

  return {
    number,
    fromBase,
    toBase,
  };
}
