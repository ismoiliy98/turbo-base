export const SUPPORTED_PLATFORMS = [
  'linux',
  'darwin',
] as const satisfies NodeJS.Platform[];

export const SUPPORTED_ARCHS = [
  'x64',
  'arm64',
] as const satisfies NodeJS.Architecture[];

export const MAX_CONCURRENCY = 16;
