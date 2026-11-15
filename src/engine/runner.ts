import { isAbortError, type CombinedToolDefinition, type FileResult, type ToolDefinition } from './types';

/** A visitor-readable message for a failure. A missing OffscreenCanvas means an old browser (Safari before 16.4, for example). */
export function describeError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  if (/OffscreenCanvas/.test(message)) {
    return 'This browser is too old to run this tool. Please update it: Safari 16.4 or later, or a current Chrome, Edge or Firefox.';
  }
  return message;
}

export interface BatchCallbacks {
  /** Called whenever any file's result changes. Receives a fresh copy. */
  onUpdate?: (results: FileResult[]) => void;
  /** Progress of the file currently running, 0 to 1. */
  onFileProgress?: (index: number, fraction: number) => void;
}

/**
 * Run a tool over a batch of files one at a time (keeps memory low on phones).
 * One failing file never stops the batch. Cancelling marks unfinished files as cancelled.
 */
export async function runBatch<Options>(
  tool: ToolDefinition<Options>,
  files: readonly File[],
  options: Options,
  signal: AbortSignal,
  callbacks: BatchCallbacks = {},
): Promise<FileResult[]> {
  const results: FileResult[] = files.map((file, index) => ({
    index,
    fileName: file.name,
    status: 'queued',
    outputs: [],
  }));
  const emit = () => callbacks.onUpdate?.(results.map((r) => ({ ...r })));
  emit();

  for (const [index, file] of files.entries()) {
    const result = results[index]!;
    if (signal.aborted) {
      result.status = 'cancelled';
      continue;
    }
    result.status = 'running';
    emit();
    try {
      result.outputs = await tool.run(file, options, {
        signal,
        onProgress: (fraction) => callbacks.onFileProgress?.(index, clamp01(fraction)),
      });
      result.status = 'done';
    } catch (error) {
      if (signal.aborted || isAbortError(error)) {
        result.status = 'cancelled';
      } else {
        result.status = 'error';
        result.error = describeError(error);
      }
    }
    emit();
  }

  emit();
  return results;
}

/**
 * Run a combined tool: all files in, one job. Reports a single result (index 0). The result's
 * file name is the first output's name so the UI has something to show on failure too.
 */
export async function runCombined<Options>(
  tool: CombinedToolDefinition<Options>,
  files: readonly File[],
  options: Options,
  signal: AbortSignal,
  callbacks: BatchCallbacks = {},
): Promise<FileResult[]> {
  const result: FileResult = { index: 0, fileName: tool.id, status: 'running', outputs: [] };
  const emit = () => callbacks.onUpdate?.([{ ...result }]);
  if (signal.aborted) {
    result.status = 'cancelled';
    emit();
    return [result];
  }
  emit();
  try {
    result.outputs = await tool.runAll(files, options, {
      signal,
      onProgress: (fraction) => callbacks.onFileProgress?.(0, clamp01(fraction)),
    });
    result.fileName = result.outputs[0]?.name ?? tool.id;
    result.status = 'done';
  } catch (error) {
    if (signal.aborted || isAbortError(error)) {
      result.status = 'cancelled';
    } else {
      result.status = 'error';
      result.error = describeError(error);
    }
  }
  emit();
  return [result];
}

function clamp01(n: number): number {
  return Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : 0;
}
