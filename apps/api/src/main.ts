import { Elysia } from 'elysia';

import PingModule from '#/ping';
import { swaggerPlugin } from '~/libs/swagger';
import env from '~/utils/env';

async function bootstrap() {
  const app = new Elysia({ prefix: '/api' })
    .use(env)
    .use(swaggerPlugin({ path: '/docs' }))
    .use(PingModule);

  const { HOST: hostname, PORT: port } = app.decorator.env;

  app.listen({ hostname, port });

  console.log(`🦊 Elysia is running at ${hostname}:${port}`);

  return app;
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});

export type App = Awaited<ReturnType<typeof bootstrap>>;
