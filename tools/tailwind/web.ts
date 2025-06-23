import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

import base from './base';

export default {
  content: [...base.content, '../../packages/ui/src/**/*.{ts,tsx}'],
  presets: [base],
  plugins: [animate],
  theme: {},
} satisfies Config;
