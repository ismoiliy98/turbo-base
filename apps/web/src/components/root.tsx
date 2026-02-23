import '~/assets/tailwind.css';

import {
  HeadContent,
  Outlet,
  Scripts,
  useLoaderData,
} from '@tanstack/react-router';
import type { ReactNode } from 'react';

import { cn } from '@pkg/ui';

import { Header } from '~/components/header';
import { ThemeProvider, useTheme } from '~/components/theme-provider';

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const { theme } = useTheme();

  return (
    <html
      className={theme}
      lang="en"
      style={{ backgroundColor: theme === 'dark' ? '#333' : '#eee' }}
    >
      <head>
        <HeadContent />
      </head>
      <body
        className={cn(
          'root bg-background',
          'flex flex-col items-center gap-4',
          'size-full h-screen',
          'p-4',
          'font-regular tracking-wide antialiased'
        )}
      >
        <div
          className={cn(
            'bg-background/70 backdrop-blur-sm dark:bg-background/95',
            'rounded-xl border border-accent/10',
            'shadow-amber-950/10 shadow-lg',
            'size-full p-4'
          )}
        >
          <Header />
          <main className="flex size-full items-center justify-center">
            {children}
          </main>
        </div>
        <Scripts />
      </body>
    </html>
  );
}

export function RootComponent() {
  const theme = useLoaderData({ from: '__root__' });

  return (
    <ThemeProvider theme={theme}>
      <RootDocument>
        <Outlet />
      </RootDocument>
    </ThemeProvider>
  );
}
