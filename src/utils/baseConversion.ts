import { Base } from '@/types';

export function convertToBase(number: number, base: Base): string {
  if (base === 10) {
    return number.toString();
  }
  return number.toString(base).toUpperCase();
}

export function convertFromBase(value: string, fromBase: Base): number | null {
  try {
    const cleanValue = value.trim().toLowerCase();
    const parsed = parseInt(cleanValue, fromBase);
    if (isNaN(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function isValidBaseInput(value: string, base: Base): boolean {
  if (!value.trim()) return false;

  const validChars = getValidCharsForBase(base);
  const cleanValue = value.trim().toLowerCase();

  return cleanValue.split('').every(char => validChars.includes(char));
}

function getValidCharsForBase(base: Base): string[] {
  switch (base) {
    case 2:
      return ['0', '1'];
    case 8:
      return ['0', '1', '2', '3', '4', '5', '6', '7'];
    case 10:
      return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    case 16:
      return [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
      ];
    default:
      return [];
  }
}
