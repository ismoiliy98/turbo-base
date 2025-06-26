import type { SUPPORTED_ARCHS, SUPPORTED_PLATFORMS } from './constants';

export type SupportedPlatform = (typeof SUPPORTED_PLATFORMS)[number];
export type SupportedArch = (typeof SUPPORTED_ARCHS)[number];
export type Target = `bun-${SupportedPlatform}-${SupportedArch}`;
export type LinuxTarget = `bun-linux-${SupportedArch}`;
export type LinuxMuslTarget = `${LinuxTarget}-musl`;
export type SupportedTarget = Target | LinuxMuslTarget;

export interface BaseCompilerOptions {
  readonly entry: string;
  readonly outFilePrefix: string;
  readonly outDir: string;
  readonly minify: boolean;
  readonly sourcemap: boolean;
  readonly bytecode: boolean;
}

export interface CompilerOptions extends Partial<BaseCompilerOptions> {
  readonly entry: string;
  readonly targets?: readonly SupportedTarget[];
  readonly maxConcurrency?: number;
  readonly cleanOutDir?: boolean;
}

export interface CompilationResult {
  readonly target: SupportedTarget;
  readonly success: boolean;
  readonly error?: string;
  readonly duration: number;
  readonly outFile: string;
}

export interface CompilerResult {
  readonly success: boolean;
  readonly results: readonly CompilationResult[];
  readonly totalDuration: number;
  readonly successCount: number;
  readonly failureCount: number;
}

export interface CompilerStats {
  readonly totalTargets: number;
  readonly completedTargets: number;
  readonly successfulTargets: number;
  readonly failedTargets: number;
  readonly averageDuration: number;
  readonly totalDuration: number;
}
