import { HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import '~/assets/tailwind.css';

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <main className="flex size-full min-h-screen flex-col items-center justify-center gap-4 bg-muted p-8">
          {children}
        </main>
        <Scripts />
      </body>
    </html>
  );
}

export function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}
