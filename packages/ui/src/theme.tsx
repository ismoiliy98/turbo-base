import { Moon, Sun } from 'lucide-react';
import type { ComponentProps } from 'react';

import { cn } from '@pkg/ui';

interface ThemeToggleProps extends ComponentProps<'div'> {
  onToggle: () => void;
}

export function ThemeToggle({ className, onToggle }: ThemeToggleProps) {
  return (
    <div
      className={cn(
        'flex h-8 w-16 cursor-pointer rounded-full border p-1 transition-all duration-300',
        'border-zinc-200 bg-white',
        'dark:border-zinc-800 dark:bg-zinc-950',
        className
      )}
      onClick={() => onToggle()}
      role="button"
      tabIndex={0}
    >
      <div className="flex w-full items-center justify-between">
        <div
          className={cn(
            'flex h-6 w-6 transform items-center justify-center rounded-full transition-transform duration-300',
            'translate-x-8 bg-primary/25',
            'dark:translate-x-0'
          )}
        >
          <Moon
            className="hidden h-4 w-4 text-white dark:block"
            strokeWidth={1.5}
          />
          <Sun
            className="block h-4 w-4 text-gray-700 dark:hidden"
            strokeWidth={1.5}
          />
        </div>
        <div
          className={cn(
            'flex h-6 w-6 transform items-center justify-center rounded-full transition-transform duration-300',
            '-translate-x-8',
            'dark:translate-x-0 dark:bg-transparent'
          )}
        >
          <Sun
            className="hidden h-4 w-4 text-gray-500 dark:block"
            strokeWidth={1.5}
          />
          <Moon
            className="block h-4 w-4 text-black dark:hidden"
            strokeWidth={1.5}
          />
        </div>
      </div>
    </div>
  );
}

export type Theme = 'dark' | 'light' | 'system';
export const DEFAULT_THEME: Theme = 'dark';
