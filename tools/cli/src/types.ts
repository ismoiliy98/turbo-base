import type { SUPPORTED_ARCHS, SUPPORTED_PLATFORMS } from './constants';

export type SupportedPlatform = (typeof SUPPORTED_PLATFORMS)[number];
export type SupportedArch = (typeof SUPPORTED_ARCHS)[number];
export type Target = `bun-${SupportedPlatform}-${SupportedArch}`;
export type LinuxTarget = `bun-linux-${SupportedArch}`;
export type LinuxMuslTarget = `${LinuxTarget}-musl`;
export type SupportedTarget = Target | LinuxMuslTarget;

export interface BaseCompilerOptions {
  readonly bytecode: boolean;
  readonly entry: string[];
  readonly minify: boolean;
  readonly outDir: string;
  readonly outFilePrefix: string;
  readonly sourcemap: boolean;
}

export interface CompilerOptions extends Partial<BaseCompilerOptions> {
  readonly cleanOutDir?: boolean;
  readonly entry: string[];
  readonly maxConcurrency?: number;
  readonly targets?: readonly SupportedTarget[];
}

export interface CompilationResult {
  readonly duration: number;
  readonly error?: string;
  readonly outFile: string;
  readonly success: boolean;
  readonly target: SupportedTarget;
}

export interface CompilerResult {
  readonly failureCount: number;
  readonly results: readonly CompilationResult[];
  readonly success: boolean;
  readonly successCount: number;
  readonly totalDuration: number;
}

export interface CompilerStats {
  readonly averageDuration: number;
  readonly completedTargets: number;
  readonly failedTargets: number;
  readonly successfulTargets: number;
  readonly totalDuration: number;
  readonly totalTargets: number;
}
