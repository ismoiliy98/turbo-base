import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { defineConfig, loadEnv } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const port = Number.parseInt(loadEnv(mode, process.cwd(), '').PORT, 10);

  return {
    plugins: [tsConfigPaths(), tanstackStart({ target: 'bun' })],
    css: { postcss: { plugins: [tailwindcss(), autoprefixer()] } },
    server: { port },
  };
});
