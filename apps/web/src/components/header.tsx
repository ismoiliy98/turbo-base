import { ThemeToggle } from '@pkg/ui/theme';
import { useTheme } from '~/components/theme-provider';

export function Header() {
  const { setTheme, theme } = useTheme();

  return (
    <header>
      <ThemeToggle
        onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
    </header>
  );
}
