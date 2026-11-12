import { useState } from 'preact/hooks';
import FileDropzone from '../../components/FileDropzone';
import OptionsPanel, { Field } from '../../components/OptionsPanel';
import ProgressBar from '../../components/ProgressBar';
import DownloadPanel from '../../components/DownloadPanel';
import { useToolRunner } from '../../engine/useToolRunner';
import { resizeTool } from './tool';
import type { ResizeOptions } from './options';

const inputClass = 'input w-full';

function toNumber(value: string): number | null {
  if (value.trim() === '') return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export default function ResizeTool({ initial }: { initial?: Partial<ResizeOptions> } = {}) {
  const [files, setFiles] = useState<File[]>([]);
  const [options, setOptions] = useState<ResizeOptions>({ ...resizeTool.defaultOptions, ...initial });
  const runner = useToolRunner(resizeTool);
  const running = runner.state === 'running';
  const set = (patch: Partial<ResizeOptions>) => setOptions((prev) => ({ ...prev, ...patch }));

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

  const pngWithTarget = options.format === 'png' && Boolean(options.targetKb);

  return (
    <div class="grid gap-5">
      <FileDropzone accepts={resizeTool.accepts} onFiles={addFiles} disabled={running} />

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

          <OptionsPanel title="Size">
            <Field id="mode" label="Resize">
              <select
                id="mode"
                class={inputClass}
                value={options.mode}
                disabled={running}
                onChange={(e) => set({ mode: e.currentTarget.value as ResizeOptions['mode'] })}
              >
                <option value="pixels">By width and height (pixels)</option>
                <option value="percent">By percentage</option>
              </select>
            </Field>

            {options.mode === 'pixels' ? (
              <>
                <div class="grid grid-cols-2 gap-4">
                  <Field id="width" label="Width (px)">
                    <input
                      id="width"
                      type="number"
                      min={1}
                      inputMode="numeric"
                      class={inputClass}
                      value={options.width ?? ''}
                      disabled={running}
                      onInput={(e) => set({ width: toNumber(e.currentTarget.value) })}
                    />
                  </Field>
                  <Field id="height" label="Height (px)">
                    <input
                      id="height"
                      type="number"
                      min={1}
                      inputMode="numeric"
                      class={inputClass}
                      value={options.height ?? ''}
                      disabled={running}
                      onInput={(e) => set({ height: toNumber(e.currentTarget.value) })}
                    />
                  </Field>
                </div>
                <label class="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={options.keepAspect}
                    disabled={running}
                    onChange={(e) => set({ keepAspect: e.currentTarget.checked })}
                  />
                  Keep proportions (leave one box empty to set it automatically)
                </label>
              </>
            ) : (
              <Field id="percent" label={`Scale: ${options.percent}%`}>
                <input
                  id="percent"
                  type="number"
                  min={1}
                  max={1000}
                  inputMode="numeric"
                  class={inputClass}
                  value={options.percent}
                  disabled={running}
                  onInput={(e) => set({ percent: toNumber(e.currentTarget.value) ?? 0 })}
                />
              </Field>
            )}
          </OptionsPanel>

          <OptionsPanel title="File size and format">
            <Field
              id="target"
              label="Target file size (KB, optional)"
              hint="We find the best quality that fits under this size. Works for JPG and WebP. A PNG input becomes WebP."
            >
              <input
                id="target"
                type="number"
                min={1}
                inputMode="numeric"
                placeholder="e.g. 100"
                class={inputClass}
                value={options.targetKb ?? ''}
                disabled={running}
                onInput={(e) => set({ targetKb: toNumber(e.currentTarget.value) })}
              />
            </Field>
            <Field id="format" label="Output format">
              <select
                id="format"
                class={inputClass}
                value={options.format}
                disabled={running}
                onChange={(e) => set({ format: e.currentTarget.value as ResizeOptions['format'] })}
              >
                <option value="same">Keep original format</option>
                <option value="jpeg">JPG</option>
                <option value="webp">WebP</option>
                <option value="png">PNG</option>
              </select>
            </Field>
            {pngWithTarget && (
              <p role="alert" class="text-sm text-danger font-bold">
                PNG is lossless, so a target size cannot be met. Choose JPG or WebP, or clear the target.
              </p>
            )}
            {!options.targetKb && (
              <Field
                id="quality"
                label={`Quality: ${options.quality}`}
                hint="Applies to JPG and WebP. PNG is always lossless."
              >
                <input
                  id="quality"
                  type="range"
                  min={10}
                  max={100}
                  value={options.quality}
                  disabled={running}
                  onInput={(e) => set({ quality: Number(e.currentTarget.value) })}
                />
              </Field>
            )}
          </OptionsPanel>

          <div class="flex gap-3">
            <button
              type="button"
              disabled={running || pngWithTarget}
              onClick={() => runner.run(files, options)}
              class="btn btn-primary btn-lg"
            >
              {running ? 'Resizing...' : 'Resize'}
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

      {running && <ProgressBar value={overall} label="Resizing" />}
      {runner.state !== 'idle' && <DownloadPanel inputs={files} results={runner.results} />}
    </div>
  );
}
