import { useEffect, useMemo, useState } from 'preact/hooks';
import FileDropzone from '../../components/FileDropzone';
import OptionsPanel, { Field } from '../../components/OptionsPanel';
import ProgressBar from '../../components/ProgressBar';
import DownloadPanel from '../../components/DownloadPanel';
import { useToolRunner } from '../../engine/useToolRunner';
import { formatBytes } from '../../lib/files';
import { moveItem, removeAt } from '../../lib/list';
import { imagesToPdfTool, type ImagesToPdfOptions } from './tool';

const smallButton =
  'rounded-lg border border-pond-600 px-3 py-1 text-sm font-semibold text-pond-600 hover:bg-duck-400/20 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pond-600';

export default function ImagesToPdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [options, setOptions] = useState<ImagesToPdfOptions>(imagesToPdfTool.defaultOptions);
  const runner = useToolRunner(imagesToPdfTool);
  const running = runner.state === 'running';

  const thumbs = useMemo(() => files.map((f) => URL.createObjectURL(f)), [files]);
  useEffect(() => () => thumbs.forEach((u) => URL.revokeObjectURL(u)), [thumbs]);

  const totalBytes = files.reduce((sum, f) => sum + f.size, 0);
  const update = (next: File[]) => {
    runner.reset();
    setFiles(next);
  };

  return (
    <div class="grid gap-5">
      <FileDropzone accepts={imagesToPdfTool.accepts} onFiles={(added) => update([...files, ...added])} disabled={running} />

      {files.length > 0 && (
        <>
          <section aria-label="Pages" class="rounded-2xl bg-white p-5 shadow-sm">
            <div class="mb-2 flex items-center justify-between">
              <p class="font-semibold">
                {files.length} {files.length === 1 ? 'page' : 'pages'} ({formatBytes(totalBytes)})
              </p>
              <button
                type="button"
                class="text-sm font-medium text-pond-600 underline"
                disabled={running}
                onClick={() => update([])}
              >
                Clear
              </button>
            </div>
            <ol class="divide-y divide-pond-600/10">
              {files.map((file, i) => (
                <li key={`${file.name}-${file.size}-${i}`} class="flex items-center gap-3 py-2">
                  <span class="w-6 text-sm text-pond-900/70">{i + 1}</span>
                  <img src={thumbs[i] ?? ''} alt="" class="h-12 w-12 rounded object-cover" />
                  <span class="min-w-0 flex-1 truncate text-sm" title={file.name}>
                    {file.name}
                  </span>
                  <button
                    type="button"
                    class={smallButton}
                    disabled={running || i === 0}
                    aria-label={`Move ${file.name} up`}
                    onClick={() => update(moveItem(files, i, i - 1))}
                  >
                    Up
                  </button>
                  <button
                    type="button"
                    class={smallButton}
                    disabled={running || i === files.length - 1}
                    aria-label={`Move ${file.name} down`}
                    onClick={() => update(moveItem(files, i, i + 1))}
                  >
                    Down
                  </button>
                  <button
                    type="button"
                    class={smallButton}
                    disabled={running}
                    aria-label={`Remove ${file.name}`}
                    onClick={() => update(removeAt(files, i))}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ol>
          </section>

          <OptionsPanel title="PDF">
            <Field id="pdfPage" label="Page size">
              <select
                id="pdfPage"
                class="w-full rounded-lg border border-pond-600/40 bg-white p-2"
                value={options.pdfPage}
                disabled={running}
                onChange={(e) => {
                  runner.reset();
                  setOptions({ pdfPage: e.currentTarget.value as ImagesToPdfOptions['pdfPage'] });
                }}
              >
                <option value="a4">A4 with margins</option>
                <option value="fit">Each page the size of its image</option>
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
              {running ? 'Creating PDF...' : 'Create PDF'}
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

      {running && <ProgressBar value={runner.progress[0] ?? 0} label="Creating PDF" />}
      {runner.state !== 'idle' && <DownloadPanel inputs={files} results={runner.results} beforeBytes={totalBytes} />}
    </div>
  );
}
