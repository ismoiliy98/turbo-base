import { createRootRoute } from '@tanstack/react-router';

import { RootComponent } from '~/components/root';
import { getThemeServerFn } from '~/lib/theme';

export const Route = createRootRoute({
  component: RootComponent,
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { content: 'width=device-width, initial-scale=1', name: 'viewport' },
      { title: 'Turbo Base | Web' },
    ],
  }),
  loader: () => getThemeServerFn(),
});
