import { createRootRoute } from '@tanstack/react-router';
import { RootComponent } from '~/components/root';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      { title: 'Turbo Base | Web' },
    ],
  }),
  component: RootComponent,
});
