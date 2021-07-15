export type SupportedBases = 2 | 8 | 10 | 16;

export type NumberWithBase = {
    number: number,
    base: SupportedBases
};

export const convertToBase = (number: number, base: number) => number.toString(base);