import { useState } from 'preact/hooks';
import FileDropzone from '../../components/FileDropzone';
import OptionsPanel, { Field } from '../../components/OptionsPanel';
import ProgressBar from '../../components/ProgressBar';
import DownloadPanel from '../../components/DownloadPanel';
import { useToolRunner } from '../../engine/useToolRunner';
import { convertTool } from './tool';
import { losesTransparency, type ConvertOptions } from './options';

const inputClass = 'rounded-lg border border-pond-600/40 bg-white p-2 w-full';

export default function ConvertTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [options, setOptions] = useState<ConvertOptions>(convertTool.defaultOptions);
  const runner = useToolRunner(convertTool);
  const running = runner.state === 'running';
  const set = (patch: Partial<ConvertOptions>) => setOptions((prev) => ({ ...prev, ...patch }));

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

  const lossy = options.target === 'jpeg' || options.target === 'webp';

  return (
    <div class="grid gap-5">
      <FileDropzone accepts={convertTool.accepts} onFiles={addFiles} disabled={running} />

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

          <OptionsPanel title="Convert to">
            <Field
              id="target"
              label="Format"
              {...(losesTransparency(options.target)
                ? { hint: 'JPG has no transparency, so transparent areas become white.' }
                : {})}
            >
              <select
                id="target"
                class={inputClass}
                value={options.target}
                disabled={running}
                onChange={(e) => set({ target: e.currentTarget.value as ConvertOptions['target'] })}
              >
                <option value="jpeg">JPG</option>
                <option value="png">PNG</option>
                <option value="webp">WebP</option>
                <option value="pdf">PDF (one page per image)</option>
              </select>
            </Field>

            {lossy && (
              <Field id="quality" label={`Quality: ${options.quality}`} hint="Higher keeps more detail and makes a bigger file.">
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

            {options.target === 'pdf' && (
              <Field id="pdfPage" label="Page size">
                <select
                  id="pdfPage"
                  class={inputClass}
                  value={options.pdfPage}
                  disabled={running}
                  onChange={(e) => set({ pdfPage: e.currentTarget.value as ConvertOptions['pdfPage'] })}
                >
                  <option value="fit">Same size as the image</option>
                  <option value="a4">A4 with margins</option>
                </select>
              </Field>
            )}
          </OptionsPanel>

          <div class="flex gap-3">
            <button
              type="button"
              disabled={running}
              onClick={() => runner.run(files, options)}
              class="rounded-lg bg-pond-600 px-6 py-3 font-semibold text-white hover:bg-pond-900 disabled:opacity-60"
            >
              {running ? 'Converting...' : 'Convert'}
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

      {running && <ProgressBar value={overall} label="Converting" />}
      {runner.state !== 'idle' && <DownloadPanel inputs={files} results={runner.results} />}
    </div>
  );
}
