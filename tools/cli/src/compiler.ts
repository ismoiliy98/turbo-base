import { exists } from 'node:fs/promises';
import { join } from 'node:path';
import { consola } from 'consola';
import { defu } from 'defu';
import { MAX_CONCURRENCY } from './constants';
import { getPreferredTargets } from './prompts';
import type {
  BaseCompilerOptions,
  CompilationResult,
  CompilerOptions,
  CompilerResult,
  SupportedTarget,
} from './types';
import { cleanDir, ensureDir, isValidTarget } from './utils';

const COMPILER_DEFAULT_OPTIONS = {
  outFilePrefix: '',
  outDir: 'dist',
  minify: false,
  sourcemap: false,
  bytecode: false,
  maxConcurrency: Math.min(4, MAX_CONCURRENCY),
} as const satisfies Partial<CompilerOptions>;

function getOutfilePath(outFilePrefix: string, target: string, outDir: string) {
  const filename = `${outFilePrefix ? `${outFilePrefix}-` : ''}${target}`;
  return join(outDir, filename);
}

async function parseCompilerOptions(opts: CompilerOptions) {
  if (!opts.entry?.trim()) {
    throw new Error('Entry file path is required and cannot be empty');
  }

  if (
    opts.maxConcurrency &&
    (opts.maxConcurrency < 1 || opts.maxConcurrency > MAX_CONCURRENCY)
  ) {
    throw new Error(`maxConcurrency must be between 1 and ${MAX_CONCURRENCY}`);
  }

  if (!(await exists(opts.entry))) {
    throw new Error(`Entry file not found: ${opts.entry}`);
  }

  let targets = opts.targets?.filter((target) => isValidTarget(target));

  if (!targets?.length) {
    targets = await getPreferredTargets();
  }

  return defu({ ...opts, targets }, COMPILER_DEFAULT_OPTIONS);
}

export async function compile(opts: CompilerOptions): Promise<CompilerResult> {
  try {
    const computedOpts = await parseCompilerOptions(opts);
    const { targets, maxConcurrency, cleanOutDir, ...baseOpts } = computedOpts;

    if (cleanOutDir) {
      await cleanDir(baseOpts.outDir);
    }

    await ensureDir(baseOpts.outDir);

    consola.start('Compiling the project...');
    consola.info('Targeting platforms:');
    consola.box(targets.join('\n'));
    consola.info('Compilation options:');
    consola.box(
      [
        `Minification:         ${baseOpts.minify ? 'enabled' : 'disabled'}`,
        `Bytecode generation:  ${baseOpts.bytecode ? 'enabled' : 'disabled'}`,
        `Sourcemap:            ${baseOpts.sourcemap ? 'enabled' : 'disabled'}`,
      ].join('\n')
    );

    const startTime = performance.now();
    const results = await compileTargets(targets, maxConcurrency, baseOpts);
    const totalDuration = Math.ceil(performance.now() - startTime);
    const successCount = results.filter((r) => r.success).length;
    const failureCount = results.length - successCount;
    const success = failureCount === 0;

    reportResults(results, totalDuration);

    return { success, results, totalDuration, successCount, failureCount };
  } catch (error) {
    consola.error('Compilation failed:', error);
    throw error;
  }
}

async function compileTargets(
  targets: readonly SupportedTarget[],
  maxConcurrency: number,
  opts: BaseCompilerOptions
) {
  const results: CompilationResult[] = new Array(targets.length);
  let targetIndex = 0;
  let completedCount = 0;

  const workers = Array.from({ length: maxConcurrency }, async () => {
    while (targetIndex < targets.length) {
      const currentIndex = targetIndex++;
      const target = targets[currentIndex];

      try {
        results[currentIndex] = await compileTarget(target, opts);
      } catch (error) {
        results[currentIndex] = {
          target,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          duration: 0,
          outFile: getOutfilePath(opts.outFilePrefix, target, opts.outDir),
        };
      }

      consola.info(`Completed: ${++completedCount}/${targets.length} targets`);
    }
  });

  return Promise.all(workers).then(() => results);
}

async function compileTarget(
  target: SupportedTarget,
  opts: BaseCompilerOptions
): Promise<CompilationResult> {
  const { entry, outFilePrefix, outDir, minify, sourcemap, bytecode } = opts;
  const startTime = performance.now();
  const outFile = getOutfilePath(outFilePrefix, target, outDir);

  try {
    const args = [
      'build',
      '--compile',
      '--target',
      target,
      '--outfile',
      outFile,
      ...(minify ? ['--minify'] : []),
      ...(sourcemap ? ['--sourcemap'] : []),
      ...(bytecode ? ['--bytecode'] : []),
      entry,
    ];

    const result = await Bun.$`bun ${args}`.quiet();
    const duration = Math.ceil(performance.now() - startTime);

    if (result.exitCode !== 0) {
      const errorMessage = result.stderr.toString().trim() || 'Unknown error';
      throw new Error(`Exit code ${result.exitCode}: ${errorMessage}`);
    }

    return { target, success: true, duration, outFile };
  } catch (error) {
    const duration = Math.ceil(performance.now() - startTime);
    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === 'string'
          ? error
          : 'Unknown error';

    return { target, success: false, error: errorMessage, duration, outFile };
  }
}

function reportResults(results: CompilationResult[], totalDuration: number) {
  const [successes, failures] = results.reduce(
    (acc, result) => {
      acc[result.success ? 0 : 1].push(result);
      return acc;
    },
    [[], []] as [CompilationResult[], CompilationResult[]]
  );

  if (failures.length > 0) {
    consola.info(`Compilation completed with ${failures.length} failure(s):`);

    for (const failure of failures) {
      consola.error(`${failure.target}: ${failure.error}`);
    }
  }

  if (successes.length > 0) {
    consola.info(`Successfully compiled ${successes.length} target(s):`);

    for (const success of successes) {
      consola.success(
        `${success.target} (${success.duration}ms) → ${success.outFile}`
      );
    }
  }

  consola.info(`Total compilation time: ${totalDuration}ms`);
}
