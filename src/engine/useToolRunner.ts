import { useCallback, useRef, useState } from 'preact/hooks';
import { runBatch } from './runner';
import type { FileResult, ToolDefinition } from './types';

export type RunnerState = 'idle' | 'running' | 'finished';

/** Preact hook that drives a tool over a batch and exposes progress and cancel. */
export function useToolRunner<Options>(tool: ToolDefinition<Options>) {
  const [state, setState] = useState<RunnerState>('idle');
  const [results, setResults] = useState<FileResult[]>([]);
  const [progress, setProgress] = useState<Record<number, number>>({});
  const controller = useRef<AbortController | null>(null);

  const run = useCallback(
    async (files: readonly File[], options: Options) => {
      controller.current?.abort();
      const abort = new AbortController();
      controller.current = abort;
      setState('running');
      setProgress({});
      const final = await runBatch(tool, files, options, abort.signal, {
        onUpdate: setResults,
        onFileProgress: (index, fraction) =>
          setProgress((prev) => ({ ...prev, [index]: fraction })),
      });
      if (controller.current === abort) setState('finished');
      return final;
    },
    [tool],
  );

  const cancel = useCallback(() => controller.current?.abort(), []);

  const reset = useCallback(() => {
    controller.current?.abort();
    setState('idle');
    setResults([]);
    setProgress({});
  }, []);

  return { state, results, progress, run, cancel, reset };
}
