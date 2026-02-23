import { useRouter } from '@tanstack/react-router';
import { createContext, type PropsWithChildren, use } from 'react';

import { DEFAULT_THEME, type Theme } from '@pkg/ui/theme';

import { setThemeServerFn } from '~/lib/theme';

type ThemeProviderState = { theme: Theme; setTheme: (val: Theme) => void };
type ThemeProviderProps = PropsWithChildren<{ theme: Theme }>;

const initialState: ThemeProviderState = {
  setTheme: (val: Theme) => setThemeServerFn({ data: val }),
  theme: DEFAULT_THEME,
};
const ThemeProviderContext = createContext(initialState);

export function ThemeProvider({ theme, ...props }: ThemeProviderProps) {
  const router = useRouter();

  function setTheme(data: Theme) {
    setThemeServerFn({ data }).then(() => router.invalidate());
  }

  return <ThemeProviderContext {...props} value={{ setTheme, theme }} />;
}

export function useTheme() {
  const context = use(ThemeProviderContext);

  if (!context) {
    throw new Error('useTheme called outside of ThemeProvider!');
  }

  return context;
}
