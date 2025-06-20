import { env } from '@yolk-oss/elysia-env';
import { t } from 'elysia';

export default env({
  HOST: t.String({ default: '0.0.0.0' }),
  PORT: t.Number({ default: 3000 }),
});
