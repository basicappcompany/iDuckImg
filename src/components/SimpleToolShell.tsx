import { useState } from 'preact/hooks';
import type { ComponentChildren } from 'preact';
import FileDropzone from './FileDropzone';
import ProgressBar from './ProgressBar';
import DownloadPanel from './DownloadPanel';
import { useToolRunner } from '../engine/useToolRunner';
import type { ToolDefinition } from '../engine/types';

interface Props<O> {
  tool: ToolDefinition<O>;
  options: O;
  /** False keeps the run button disabled, for example while a required text box is empty. */
  canRun: boolean;
  runLabel: string;
  /** Shown under a disabled run button, to say what is missing. */
  missing?: string;
  /** The preview and option panels. Call `reset` when an option changes so old results disappear. */
  children: (ctx: { files: File[]; running: boolean; reset: () => void }) => ComponentChildren;
}

/**
 * The frame shared by the simple one-picture-in, results-out tools: drop zone, file count, your
 * option panels, the run and cancel buttons, progress and downloads. Tools supply the middle.
 */
export default function SimpleToolShell<O>({ tool, options, canRun, runLabel, missing, children }: Props<O>) {
  const [files, setFiles] = useState<File[]>([]);
  const runner = useToolRunner(tool);
  const running = runner.state === 'running';

  const done = runner.results.filter((r) => r.status === 'done' || r.status === 'error').length;
  const runningIndex = runner.results.findIndex((r) => r.status === 'running');
  const overall =
    runner.results.length === 0
      ? 0
      : (done + (runningIndex >= 0 ? (runner.progress[runningIndex] ?? 0) : 0)) / runner.results.length;

  const addFiles = (added: File[]) => {
    runner.reset();
    setFiles((prev) => [...prev, ...added]);
  };

  return (
    <div class="grid gap-5">
      <FileDropzone accepts={tool.accepts} onFiles={addFiles} disabled={running} />

      {files.length > 0 && (
        <>
          <p class="text-sm">
            {files.length} {files.length === 1 ? 'image' : 'images'} selected.{' '}
            <button
              type="button"
              class="link"
              disabled={running}
              onClick={() => {
                runner.reset();
                setFiles([]);
              }}
            >
              Clear
            </button>
          </p>

          {children({ files, running, reset: runner.reset })}

          <div class="flex gap-3">
            <button
              type="button"
              disabled={running || !canRun}
              onClick={() => runner.run(files, options)}
              class="btn btn-primary btn-lg"
            >
              {running ? 'Working...' : runLabel}
            </button>
            {running && (
              <button type="button" onClick={runner.cancel} class="btn btn-lg">
                Cancel
              </button>
            )}
          </div>
          {!canRun && missing && <p class="text-sm text-muted">{missing}</p>}
        </>
      )}

      {running && <ProgressBar value={overall} label="Working" />}
      {runner.state !== 'idle' && <DownloadPanel inputs={files} results={runner.results} />}
    </div>
  );
}
