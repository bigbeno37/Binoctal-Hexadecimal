import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  generateRandomNumber,
  getRandomBase,
  getRandomBaseDifferentFrom,
  generateNewQuestion,
} from './gameLogic';
import { Difficulty, Base, BASES } from '@/types';

describe('gameLogic', () => {
  describe('generateRandomNumber', () => {
    it('should generate numbers within Easy difficulty range (0-25)', () => {
      for (let i = 0; i < 100; i++) {
        const number = generateRandomNumber('Easy');
        expect(number).toBeGreaterThanOrEqual(0);
        expect(number).toBeLessThanOrEqual(25);
      }
    });

    it('should generate numbers within Medium difficulty range (0-100)', () => {
      for (let i = 0; i < 100; i++) {
        const number = generateRandomNumber('Medium');
        expect(number).toBeGreaterThanOrEqual(0);
        expect(number).toBeLessThanOrEqual(100);
      }
    });

    it('should generate numbers within Hard difficulty range (0-1000)', () => {
      for (let i = 0; i < 100; i++) {
        const number = generateRandomNumber('Hard');
        expect(number).toBeGreaterThanOrEqual(0);
        expect(number).toBeLessThanOrEqual(1000);
      }
    });

    it('should generate different numbers on multiple calls', () => {
      const numbers = new Set();
      for (let i = 0; i < 50; i++) {
        numbers.add(generateRandomNumber('Hard'));
      }
      expect(numbers.size).toBeGreaterThan(1);
    });
  });

  describe('getRandomBase', () => {
    it('should return a valid base', () => {
      for (let i = 0; i < 50; i++) {
        const base = getRandomBase();
        expect(BASES).toContain(base);
      }
    });

    it('should return different bases on multiple calls', () => {
      const bases = new Set();
      for (let i = 0; i < 50; i++) {
        bases.add(getRandomBase());
      }
      expect(bases.size).toBeGreaterThan(1);
    });
  });

  describe('getRandomBaseDifferentFrom', () => {
    it('should never return the excluded base', () => {
      const excludeBase: Base = 10;
      for (let i = 0; i < 50; i++) {
        const base = getRandomBaseDifferentFrom(excludeBase);
        expect(base).not.toBe(excludeBase);
        expect(BASES).toContain(base);
      }
    });

    it('should work with all possible excluded bases', () => {
      BASES.forEach(excludeBase => {
        const base = getRandomBaseDifferentFrom(excludeBase);
        expect(base).not.toBe(excludeBase);
        expect(BASES).toContain(base);
      });
    });

    it('should return different bases when possible', () => {
      const excludeBase: Base = 2;
      const possibleBases = BASES.filter(base => base !== excludeBase);
      const returnedBases = new Set();

      for (let i = 0; i < 50; i++) {
        const base = getRandomBaseDifferentFrom(excludeBase);
        returnedBases.add(base);
      }

      expect(returnedBases.size).toBeGreaterThan(1);
      returnedBases.forEach(base => {
        expect(possibleBases).toContain(base);
      });
    });
  });

  describe('generateNewQuestion', () => {
    it('should generate questions with valid structure', () => {
      const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];

      difficulties.forEach(difficulty => {
        for (let i = 0; i < 10; i++) {
          const question = generateNewQuestion(difficulty);

          expect(question).toHaveProperty('number');
          expect(question).toHaveProperty('fromBase');
          expect(question).toHaveProperty('toBase');

          expect(typeof question.number).toBe('number');
          expect(BASES).toContain(question.fromBase);
          expect(BASES).toContain(question.toBase);
          expect(question.fromBase).not.toBe(question.toBase);
        }
      });
    });

    it('should respect difficulty number ranges', () => {
      const question = generateNewQuestion('Easy');
      expect(question.number).toBeGreaterThanOrEqual(0);
      expect(question.number).toBeLessThanOrEqual(25);
    });

    it('should always generate different from and to bases', () => {
      for (let i = 0; i < 50; i++) {
        const question = generateNewQuestion('Medium');
        expect(question.fromBase).not.toBe(question.toBase);
      }
    });
  });

  describe('deterministic behavior with mocked Math.random', () => {
    beforeEach(() => {
      vi.restoreAllMocks();
    });

    it('should generate predictable results with mocked random', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5);

      const question = generateNewQuestion('Easy');

      expect(question.number).toBe(13); // 0.5 * (25 - 0 + 1) + 0 = 13
      expect(question.fromBase).toBe(10); // BASES[0.5 * 4] = BASES[2] = 10

      vi.restoreAllMocks();
    });

    it('should handle edge cases in random number generation', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0);

      const question = generateNewQuestion('Hard');
      expect(question.number).toBe(0);
      expect(question.fromBase).toBe(2); // BASES[0]

      vi.restoreAllMocks();
    });

    it('should handle maximum values in random generation', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.999999);

      const question = generateNewQuestion('Easy');
      expect(question.number).toBe(25);

      vi.restoreAllMocks();
    });
  });
});
