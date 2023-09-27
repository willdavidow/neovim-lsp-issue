import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';

function cn(...input: ClassValue[]) {
  return twMerge(clsx(input));
}

export { clsx, cn };
