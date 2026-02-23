import { createRouter as createTanStackRouter } from '@tanstack/react-router';

import NotFound from '~/components/error/not-found';
import { routeTree } from '~/routeTree.gen';

export function createRouter() {
  const router = createTanStackRouter({
    defaultNotFoundComponent: NotFound,
    routeTree,
    scrollRestoration: true,
  });
  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
