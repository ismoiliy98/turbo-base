#!/usr/bin/env bun

import {
  Command,
  InvalidArgumentError,
  Option,
} from '@commander-js/extra-typings';

import { compile } from '../src/compiler';
import type { SupportedTarget } from '../src/types';
import { getAvailableTargets, getCurrentPlatformTarget } from '../src/utils';

const program = new Command('tool-cli');
const availableTargets = getAvailableTargets();

function intParser(value: string) {
  const parsedValue = Number.parseInt(value, 10);

  if (Number.isNaN(parsedValue)) {
    throw new InvalidArgumentError('Not a number.');
  }

  return parsedValue;
}

program
  .command('compile <entries...>')
  .description('Compile provided entries into bun single-file executable')
  .addOption(
    new Option('-t, --target <targets...>', 'Target platform')
      .conflicts('current')
      .choices(availableTargets)
      .default([] as SupportedTarget[])
  )
  .option('--current', 'Build for current platform')
  .option('--prefix <prefix>', 'Add prefix to compiled executable(s)')
  .option('--outdir <outdir>', 'Path to output directory')
  .option('--minify', "Enable bun's all minification flags")
  .option('--sourcemap', 'Compile with sourcemaps')
  .option('--bytecode', 'Use a bytecode cache for compiled executable')
  .option('--clean', 'Clean output directory before compiling')
  .addOption(
    new Option(
      '--concurrency <number>',
      'Max concurrent compilation processes when multiple targets specified'
    )
      .default(4)
      .argParser(intParser)
  )
  .action(async (entry, options) => {
    const targets: SupportedTarget[] = [];

    if (options.current) {
      const currentTarget = await getCurrentPlatformTarget();
      targets.push(currentTarget);
    } else {
      targets.push(...options.target);
    }

    await compile({
      bytecode: options.bytecode,
      cleanOutDir: options.clean,
      entry,
      maxConcurrency: options.concurrency,
      minify: options.minify,
      outDir: options.outdir,
      outFilePrefix: options.prefix,
      sourcemap: options.sourcemap,
      targets,
    });
  });

program.parse(process.argv);
