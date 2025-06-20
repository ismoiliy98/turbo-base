import { consola } from 'consola';

const SUPPORTED_OS = ['linux', 'darwin'] as const;
const SUPPORTED_ARCH = ['x64', 'arm64'] as const;

const PLATFORMS = SUPPORTED_OS.flatMap((os) =>
  SUPPORTED_ARCH.map((arch) => `bun-${os}-${arch}` as const)
);
const PLATFORMS_WITH_MUSL = PLATFORMS.filter((platform) =>
  platform.includes('linux')
).map((platform) => `${platform}-musl` as const);

async function build() {
  consola.info('Cleaning up dist directory...');

  await Bun.$`git clean -xdf dist`.quiet();

  consola.start('Building project...');

  const buildPromises = [];
  const targets = [...PLATFORMS, ...PLATFORMS_WITH_MUSL];
  const startTick = performance.now();

  consola.info('Targeting platforms:');
  consola.box(targets.join('\n'));

  for (const platform of targets) {
    buildPromises.push(
      Bun.$`bun build --compile --minify --sourcemap --bytecode \
      --target ${platform} src/main.ts --outfile dist/${platform}`.quiet()
    );
  }

  await Promise.allSettled(buildPromises);

  const endTick = performance.now();
  const buildDurationMs = Math.ceil(endTick - startTick);

  consola.success(`Project built in ${buildDurationMs}ms`);
}

build().catch(consola.error);
