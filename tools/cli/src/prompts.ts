import { checkbox, Separator } from '@inquirer/prompts';

import { SUPPORTED_PLATFORMS } from './constants';
import type { SupportedTarget } from './types';
import { getCurrentPlatformTarget, getTargetsByPlatform } from './utils';

type Choice<T> = Exclude<
  Parameters<typeof checkbox<T>>[0]['choices'][number],
  string
>;

async function formatTargetName(target: SupportedTarget) {
  const isCurrent = (await getCurrentPlatformTarget()) === target;
  const parts = target.split('-');

  if (parts.length < 3 || parts[0] !== 'bun') {
    throw new Error(`Invalid target format: ${target}`);
  }

  const [, platform, arch, ...rest] = parts;
  const formattedPlatform =
    platform.charAt(0).toUpperCase() + platform.slice(1).toLowerCase();
  const formattedArch = arch.replace(/[a-z]/g, (char) => char.toUpperCase());
  const currentPrefix = isCurrent ? '[current] ' : '';
  const muslSuffix = rest.includes('musl') ? ' (musl)' : '';

  return `${currentPrefix}${formattedPlatform} ${formattedArch}${muslSuffix}`;
}

async function mapTargetsToChoices() {
  const choices: Choice<SupportedTarget>[] = [];

  for (const platform of SUPPORTED_PLATFORMS) {
    choices.push(
      new Separator(
        platform.charAt(0).toUpperCase() + platform.slice(1).toLowerCase()
      )
    );

    for (const target of getTargetsByPlatform(platform)) {
      const formattedName = await formatTargetName(target);
      choices.push({ name: formattedName, value: target });
    }
  }

  return choices;
}

export async function getPreferredTargets() {
  const choices = await mapTargetsToChoices();

  try {
    return await checkbox<SupportedTarget>({
      choices,
      loop: false,
      message: 'Select targets to compile for',
      pageSize: Math.min(choices.length, 10),
      required: true,
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'ExitPromptError') {
      throw new Error('At least one target has to be provided!');
    }

    throw error;
  }
}
