import Elysia from 'elysia';

export default new Elysia({ name: 'service:ping' }).decorate('pingService', {
  ping() {
    return 'pong' as const;
  },
});
