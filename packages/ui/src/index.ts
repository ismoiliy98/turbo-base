import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pxToRem(px: number) {
  const { fontSize } = window.getComputedStyle(window.document.documentElement);
  const parsedFontSize = Number.parseFloat(fontSize ?? '16');

  return `${px / parsedFontSize}rem`;
}

export function remToPx(rem: number) {
  const { fontSize } = window.getComputedStyle(window.document.documentElement);
  const parsedFontSize = Number.parseFloat(fontSize ?? '16');

  return rem * parsedFontSize;
}
