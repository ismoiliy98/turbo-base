import Elysia from 'elysia';
import PingService from '#/ping/service';

export default new Elysia({ name: 'module:ping' }).group('/ping', (app) =>
  app.use(PingService).get('/', ({ pingService }) => pingService.ping())
);
