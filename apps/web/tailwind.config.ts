import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

import baseConfig from '@tool/tailwind-config/web';

export default {
  content: [...baseConfig.content],
  presets: [baseConfig],
  theme: {
    extend: {
      fontFamily: {
        mono: ['var(--font-geist-mono)', ...fontFamily.mono],
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
      },
    },
  },
} satisfies Config;
