import { DEFAULT_THEME, type Theme } from '@pkg/ui/theme';
import { useRouter } from '@tanstack/react-router';
import { type PropsWithChildren, createContext, use } from 'react';
import { setThemeServerFn } from '~/lib/theme';

type ThemeProviderState = { theme: Theme; setTheme: (val: Theme) => void };
type ThemeProviderProps = PropsWithChildren<{ theme: Theme }>;

const initialState: ThemeProviderState = {
  theme: DEFAULT_THEME,
  setTheme: (val: Theme) => setThemeServerFn({ data: val }),
};
const ThemeProviderContext = createContext(initialState);

export function ThemeProvider({ theme, ...props }: ThemeProviderProps) {
  const router = useRouter();

  function setTheme(data: Theme) {
    setThemeServerFn({ data }).then(() => router.invalidate());
  }

  return <ThemeProviderContext {...props} value={{ theme, setTheme }} />;
}

export function useTheme() {
  const context = use(ThemeProviderContext);

  if (!context) {
    throw new Error('useTheme called outside of ThemeProvider!');
  }

  return context;
}
