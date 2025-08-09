import { describe, it, expect } from 'vitest';
import {
  convertToBase,
  convertFromBase,
  isValidBaseInput,
} from './baseConversion';
import { Base } from '@/types';

describe('baseConversion', () => {
  describe('convertToBase', () => {
    it('should convert decimal to binary', () => {
      expect(convertToBase(0, 2)).toBe('0');
      expect(convertToBase(1, 2)).toBe('1');
      expect(convertToBase(5, 2)).toBe('101');
      expect(convertToBase(15, 2)).toBe('1111');
      expect(convertToBase(255, 2)).toBe('11111111');
    });

    it('should convert decimal to octal', () => {
      expect(convertToBase(0, 8)).toBe('0');
      expect(convertToBase(7, 8)).toBe('7');
      expect(convertToBase(8, 8)).toBe('10');
      expect(convertToBase(64, 8)).toBe('100');
      expect(convertToBase(255, 8)).toBe('377');
    });

    it('should convert decimal to decimal', () => {
      expect(convertToBase(0, 10)).toBe('0');
      expect(convertToBase(42, 10)).toBe('42');
      expect(convertToBase(255, 10)).toBe('255');
      expect(convertToBase(1000, 10)).toBe('1000');
    });

    it('should convert decimal to hexadecimal', () => {
      expect(convertToBase(0, 16)).toBe('0');
      expect(convertToBase(10, 16)).toBe('A');
      expect(convertToBase(15, 16)).toBe('F');
      expect(convertToBase(16, 16)).toBe('10');
      expect(convertToBase(255, 16)).toBe('FF');
      expect(convertToBase(256, 16)).toBe('100');
    });

    it('should handle edge cases', () => {
      expect(convertToBase(0, 2)).toBe('0');
      expect(convertToBase(0, 8)).toBe('0');
      expect(convertToBase(0, 10)).toBe('0');
      expect(convertToBase(0, 16)).toBe('0');
    });
  });

  describe('convertFromBase', () => {
    it('should convert binary to decimal', () => {
      expect(convertFromBase('0', 2)).toBe(0);
      expect(convertFromBase('1', 2)).toBe(1);
      expect(convertFromBase('101', 2)).toBe(5);
      expect(convertFromBase('1111', 2)).toBe(15);
      expect(convertFromBase('11111111', 2)).toBe(255);
    });

    it('should convert octal to decimal', () => {
      expect(convertFromBase('0', 8)).toBe(0);
      expect(convertFromBase('7', 8)).toBe(7);
      expect(convertFromBase('10', 8)).toBe(8);
      expect(convertFromBase('100', 8)).toBe(64);
      expect(convertFromBase('377', 8)).toBe(255);
    });

    it('should convert decimal to decimal', () => {
      expect(convertFromBase('0', 10)).toBe(0);
      expect(convertFromBase('42', 10)).toBe(42);
      expect(convertFromBase('255', 10)).toBe(255);
      expect(convertFromBase('1000', 10)).toBe(1000);
    });

    it('should convert hexadecimal to decimal', () => {
      expect(convertFromBase('0', 16)).toBe(0);
      expect(convertFromBase('A', 16)).toBe(10);
      expect(convertFromBase('a', 16)).toBe(10);
      expect(convertFromBase('F', 16)).toBe(15);
      expect(convertFromBase('f', 16)).toBe(15);
      expect(convertFromBase('10', 16)).toBe(16);
      expect(convertFromBase('FF', 16)).toBe(255);
      expect(convertFromBase('ff', 16)).toBe(255);
      expect(convertFromBase('100', 16)).toBe(256);
    });

    it('should handle whitespace', () => {
      expect(convertFromBase(' 101 ', 2)).toBe(5);
      expect(convertFromBase('\t FF \n', 16)).toBe(255);
    });

    it('should return null for invalid input', () => {
      expect(convertFromBase('', 2)).toBe(null);
      expect(convertFromBase('   ', 2)).toBe(null);
      expect(convertFromBase('2', 2)).toBe(null);
      expect(convertFromBase('8', 8)).toBe(null);
      expect(convertFromBase('G', 16)).toBe(null);
      expect(convertFromBase('invalid', 10)).toBe(null);
    });
  });

  describe('isValidBaseInput', () => {
    it('should validate binary input', () => {
      expect(isValidBaseInput('0', 2)).toBe(true);
      expect(isValidBaseInput('1', 2)).toBe(true);
      expect(isValidBaseInput('101', 2)).toBe(true);
      expect(isValidBaseInput('1010101', 2)).toBe(true);

      expect(isValidBaseInput('2', 2)).toBe(false);
      expect(isValidBaseInput('102', 2)).toBe(false);
      expect(isValidBaseInput('a', 2)).toBe(false);
      expect(isValidBaseInput('', 2)).toBe(false);
      expect(isValidBaseInput('   ', 2)).toBe(false);
    });

    it('should validate octal input', () => {
      expect(isValidBaseInput('0', 8)).toBe(true);
      expect(isValidBaseInput('7', 8)).toBe(true);
      expect(isValidBaseInput('1234567', 8)).toBe(true);
      expect(isValidBaseInput('0123', 8)).toBe(true);

      expect(isValidBaseInput('8', 8)).toBe(false);
      expect(isValidBaseInput('9', 8)).toBe(false);
      expect(isValidBaseInput('128', 8)).toBe(false);
      expect(isValidBaseInput('a', 8)).toBe(false);
      expect(isValidBaseInput('', 8)).toBe(false);
    });

    it('should validate decimal input', () => {
      expect(isValidBaseInput('0', 10)).toBe(true);
      expect(isValidBaseInput('9', 10)).toBe(true);
      expect(isValidBaseInput('123456789', 10)).toBe(true);
      expect(isValidBaseInput('1000', 10)).toBe(true);

      expect(isValidBaseInput('a', 10)).toBe(false);
      expect(isValidBaseInput('10a', 10)).toBe(false);
      expect(isValidBaseInput('', 10)).toBe(false);
    });

    it('should validate hexadecimal input', () => {
      expect(isValidBaseInput('0', 16)).toBe(true);
      expect(isValidBaseInput('9', 16)).toBe(true);
      expect(isValidBaseInput('A', 16)).toBe(true);
      expect(isValidBaseInput('F', 16)).toBe(true);
      expect(isValidBaseInput('a', 16)).toBe(true);
      expect(isValidBaseInput('f', 16)).toBe(true);
      expect(isValidBaseInput('123ABCDEF', 16)).toBe(true);
      expect(isValidBaseInput('deadbeef', 16)).toBe(true);
      expect(isValidBaseInput('DEADBEEF', 16)).toBe(true);
      expect(isValidBaseInput('FF', 16)).toBe(true);

      expect(isValidBaseInput('G', 16)).toBe(false);
      expect(isValidBaseInput('g', 16)).toBe(false);
      expect(isValidBaseInput('1G', 16)).toBe(false);
      expect(isValidBaseInput('', 16)).toBe(false);
    });

    it('should handle whitespace in validation', () => {
      expect(isValidBaseInput(' 101 ', 2)).toBe(true);
      expect(isValidBaseInput('\tFF\n', 16)).toBe(true);
    });
  });

  describe('round trip conversions', () => {
    const testCases: { number: number; base: Base }[] = [
      { number: 0, base: 2 },
      { number: 1, base: 2 },
      { number: 15, base: 2 },
      { number: 255, base: 2 },
      { number: 0, base: 8 },
      { number: 7, base: 8 },
      { number: 64, base: 8 },
      { number: 255, base: 8 },
      { number: 0, base: 10 },
      { number: 42, base: 10 },
      { number: 1000, base: 10 },
      { number: 0, base: 16 },
      { number: 15, base: 16 },
      { number: 255, base: 16 },
      { number: 256, base: 16 },
    ];

    testCases.forEach(({ number, base }) => {
      it(`should round trip number ${String(number)} in base ${String(base)}`, () => {
        const converted = convertToBase(number, base);
        const backConverted = convertFromBase(converted, base);
        expect(backConverted).toBe(number);
      });
    });
  });
});
