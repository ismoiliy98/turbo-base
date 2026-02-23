import type { PathLike } from 'node:fs';
import { exists, mkdir, rm } from 'node:fs/promises';
import { consola } from 'consola';

import { SUPPORTED_ARCHS, SUPPORTED_PLATFORMS } from './constants';
import type {
  LinuxMuslTarget,
  SupportedArch,
  SupportedPlatform,
  SupportedTarget,
  Target,
} from './types';

function _getAvailableTargets(): readonly SupportedTarget[] {
  const baseTargets: Target[] = [];
  const muslTargets: LinuxMuslTarget[] = [];

  for (const platform of SUPPORTED_PLATFORMS) {
    for (const arch of SUPPORTED_ARCHS) {
      const target = `bun-${platform}-${arch}` as Target;
      baseTargets.push(target);

      if (platform === 'linux') {
        muslTargets.push(`${target}-musl` as LinuxMuslTarget);
      }
    }
  }

  return [...baseTargets, ...muslTargets] as const;
}

const AVAILABLE_TARGETS = _getAvailableTargets();

export function getAvailableTargets() {
  return AVAILABLE_TARGETS;
}

export function isValidTarget(target: string): target is SupportedTarget {
  return AVAILABLE_TARGETS.includes(target as SupportedTarget);
}

export function getTargetsByPlatform(platform: SupportedPlatform) {
  return AVAILABLE_TARGETS.filter((target) => target.includes(platform));
}

export function getTargetsByArch(arch: SupportedArch) {
  return AVAILABLE_TARGETS.filter((target) => target.includes(arch));
}

export function getMuslTargets() {
  return AVAILABLE_TARGETS.filter((target) =>
    target.endsWith('-musl')
  ) as LinuxMuslTarget[];
}

export function getStandardTargets() {
  return AVAILABLE_TARGETS.filter(
    (target) => !target.endsWith('-musl')
  ) as Target[];
}

export async function isMusl() {
  if (process.platform !== 'linux') {
    return false;
  }

  try {
    const { stderr, stdout } = await Bun.$`ldd --version`.nothrow().quiet();
    return `${stderr}${stdout}`.toLowerCase().includes('musl');
  } catch {
    return false;
  }
}

export async function getCurrentPlatformTarget() {
  const { platform, arch } = process;

  if (
    !SUPPORTED_PLATFORMS.includes(platform as SupportedPlatform) ||
    !SUPPORTED_ARCHS.includes(arch as SupportedArch)
  ) {
    throw new Error(`Unsupported platform/arch: ${platform}-${arch}`);
  }

  let targetName = `bun-${platform}-${arch}`;

  if (platform === 'linux' && (await isMusl())) {
    targetName += '-musl';
  }

  if (isValidTarget(targetName)) {
    return targetName;
  }

  throw new Error(`Generated target is not supported: ${targetName}`);
}

export async function cleanDir(dir: PathLike, throwOnError = false) {
  consola.info(`Cleaning ${dir} directory...`);

  try {
    if (await exists(dir)) {
      await rm(dir, { force: true, recursive: true });
    }
  } catch (error) {
    consola.warn(`Failed to clean ${dir}:`, error);

    if (throwOnError) {
      throw error;
    }
  }
}

export async function ensureDir(dir: PathLike): Promise<void> {
  try {
    await mkdir(dir, { recursive: true });
  } catch (error) {
    throw new Error(`Failed to create directory ${dir}: ${error}`);
  }
}
