import { useState } from 'preact/hooks';
import FileDropzone from '../../components/FileDropzone';
import OptionsPanel, { Field } from '../../components/OptionsPanel';
import ProgressBar from '../../components/ProgressBar';
import DownloadPanel from '../../components/DownloadPanel';
import { useToolRunner } from '../../engine/useToolRunner';
import { compressTool } from './tool';
import type { CompressOptions } from './options';

export default function CompressTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [options, setOptions] = useState<CompressOptions>(compressTool.defaultOptions);
  const runner = useToolRunner(compressTool);
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
      <FileDropzone accepts={compressTool.accepts} onFiles={addFiles} disabled={running} />

      {files.length > 0 && (
        <>
          <p class="text-sm">
            {files.length} {files.length === 1 ? 'image' : 'images'} selected.{' '}
            <button
              type="button"
              class="font-medium text-pond-600 underline"
              disabled={running}
              onClick={() => {
                runner.reset();
                setFiles([]);
              }}
            >
              Clear
            </button>
          </p>

          <OptionsPanel title="Compression">
            <Field
              id="quality"
              label={`Quality: ${options.quality}`}
              hint="Lower means a smaller file. 70 to 80 usually looks the same. Applies to JPG and WebP; PNG is always lossless."
            >
              <input
                id="quality"
                type="range"
                min={10}
                max={100}
                step={1}
                value={options.quality}
                disabled={running}
                onInput={(e) => setOptions({ ...options, quality: Number(e.currentTarget.value) })}
              />
            </Field>
            <Field id="format" label="Output format">
              <select
                id="format"
                class="rounded-lg border border-pond-600/40 bg-white p-2"
                value={options.format}
                disabled={running}
                onChange={(e) =>
                  setOptions({ ...options, format: e.currentTarget.value as CompressOptions['format'] })
                }
              >
                <option value="same">Keep original format</option>
                <option value="webp">Convert to WebP (smaller)</option>
              </select>
            </Field>
          </OptionsPanel>

          <div class="flex gap-3">
            <button
              type="button"
              disabled={running}
              onClick={() => runner.run(files, options)}
              class="rounded-lg bg-pond-600 px-6 py-3 font-semibold text-white hover:bg-pond-900 disabled:opacity-60"
            >
              {running ? 'Compressing...' : 'Compress'}
            </button>
            {running && (
              <button
                type="button"
                onClick={runner.cancel}
                class="rounded-lg border border-pond-600 px-6 py-3 font-semibold text-pond-600"
              >
                Cancel
              </button>
            )}
          </div>
        </>
      )}

      {running && <ProgressBar value={overall} label="Compressing" />}
      {runner.state !== 'idle' && <DownloadPanel inputs={files} results={runner.results} />}
    </div>
  );
}
