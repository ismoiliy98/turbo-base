import { Elysia } from 'elysia';
import { swaggerPlugin } from '~/libs/swagger';
import env from '~/utils/env';
import PingModule from '#/ping';

async function bootstrap() {
  const app = new Elysia()
    .use(env)
    .use(swaggerPlugin({ path: '/api/docs' }))
    .group('/api', (app) => app.use(PingModule));

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
