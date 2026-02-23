import { type ElysiaSwaggerConfig, swagger } from '@elysiajs/swagger';
import { defu } from 'defu';

import { version } from '~/../package.json';

const DEFAULT_OPTIONS = {
  documentation: { info: { title: 'Turbo Base API Documentation', version } },
} satisfies ElysiaSwaggerConfig;

export function swaggerPlugin<Path extends string>(
  options?: ElysiaSwaggerConfig<Path>
) {
  return swagger(defu(options, DEFAULT_OPTIONS));
}
