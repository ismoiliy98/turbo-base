import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

import base from './base';

export default {
  content: [...base.content, '../../packages/ui/src/**/*.{ts,tsx}'],
  plugins: [animate],
  presets: [base],
  theme: {},
} satisfies Config;
