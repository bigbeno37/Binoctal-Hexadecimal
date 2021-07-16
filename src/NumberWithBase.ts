export type SupportedBases = 2 | 8 | 10 | 16;

export const getSupportedBases = (): SupportedBases[] => [2, 8, 10, 16];

export type NumberWithBase = {
    number: string,
    base: SupportedBases
};

export const convertFromBase10ToNewBase = (number: number, base: number) => number.toString(base);