import { useEffect, useMemo, useState } from 'preact/hooks';
import FileDropzone from '../../components/FileDropzone';
import OptionsPanel from '../../components/OptionsPanel';
import ProgressBar from '../../components/ProgressBar';
import DownloadPanel from '../../components/DownloadPanel';
import { useToolRunner } from '../../engine/useToolRunner';
import { rotateTool } from './tool';
import {
  defaultRotateOptions,
  flipHorizontal,
  flipVertical,
  isIdentity,
  previewTransform,
  rotateLeft,
  rotateRight,
  type RotateOptions,
} from './options';

const buttonClass =
  'btn btn-sm';

export default function RotateTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [options, setOptions] = useState<RotateOptions>(rotateTool.defaultOptions);
  const runner = useToolRunner(rotateTool);
  const running = runner.state === 'running';

  const previewUrl = useMemo(() => (files[0] ? URL.createObjectURL(files[0]) : null), [files[0]]);
  useEffect(() => () => (previewUrl ? URL.revokeObjectURL(previewUrl) : undefined), [previewUrl]);

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
  const change = (next: RotateOptions) => {
    runner.reset();
    setOptions(next);
  };

  return (
    <div class="grid gap-5">
      <FileDropzone accepts={rotateTool.accepts} onFiles={addFiles} disabled={running} />

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
                setOptions(defaultRotateOptions);
              }}
            >
              Clear
            </button>
          </p>

          {previewUrl && (
            <div
              class="card mx-auto flex h-64 w-64 items-center justify-center overflow-hidden"
              aria-label="Preview of the first image"
            >
              <img
                src={previewUrl}
                alt="Preview"
                class="max-h-full max-w-full transition-transform"
                style={{ transform: previewTransform(options) }}
              />
            </div>
          )}

          <OptionsPanel title="Rotate and flip">
            <div class="flex flex-wrap gap-3">
              <button type="button" class={buttonClass} disabled={running} onClick={() => change(rotateLeft(options))}>
                Rotate left
              </button>
              <button type="button" class={buttonClass} disabled={running} onClick={() => change(rotateRight(options))}>
                Rotate right
              </button>
              <button type="button" class={buttonClass} disabled={running} onClick={() => change(flipHorizontal(options))}>
                Flip horizontal
              </button>
              <button type="button" class={buttonClass} disabled={running} onClick={() => change(flipVertical(options))}>
                Flip vertical
              </button>
              <button
                type="button"
                class={buttonClass}
                disabled={running || isIdentity(options)}
                onClick={() => change(defaultRotateOptions)}
              >
                Reset
              </button>
            </div>
            <p class="text-xs text-muted">
              The preview shows the first image. The same change is applied to every image. JPG and WebP are
              saved again at high quality, so the file size can change slightly.
            </p>
          </OptionsPanel>

          <div class="flex gap-3">
            <button
              type="button"
              disabled={running || isIdentity(options)}
              onClick={() => runner.run(files, options)}
              class="btn btn-primary btn-lg"
            >
              {running ? 'Working...' : 'Apply'}
            </button>
            {running && (
              <button
                type="button"
                onClick={runner.cancel}
                class="btn btn-lg"
              >
                Cancel
              </button>
            )}
          </div>
        </>
      )}

      {running && <ProgressBar value={overall} label="Working" />}
      {runner.state !== 'idle' && <DownloadPanel inputs={files} results={runner.results} />}
    </div>
  );
}
