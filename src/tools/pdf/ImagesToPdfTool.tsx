import { useEffect, useMemo, useState } from 'preact/hooks';
import FileDropzone from '../../components/FileDropzone';
import OptionsPanel, { Field } from '../../components/OptionsPanel';
import ProgressBar from '../../components/ProgressBar';
import DownloadPanel from '../../components/DownloadPanel';
import { useToolRunner } from '../../engine/useToolRunner';
import { formatBytes } from '../../lib/files';
import { moveItem, removeAt } from '../../lib/list';
import { imagesToPdfTool, type ImagesToPdfOptions } from './tool';
import { bare, fill, useText, useUi } from '../../i18n/ui';
import { PDF_TEXT } from '../../i18n/tools/pdf';

const smallButton =
  'btn btn-sm';

export default function ImagesToPdfTool() {
  const ui = useUi();
  const t = useText(PDF_TEXT);
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
          <section aria-label={t.pagesLabel} class="card p-5">
            <div class="mb-2 flex items-center justify-between">
              <p class="font-semibold">
                {fill(files.length === 1 ? t.pageOne : t.pageMany, { n: files.length })} ({formatBytes(totalBytes)})
              </p>
              <button
                type="button"
                class="link text-sm"
                disabled={running}
                onClick={() => update([])}
              >
                {ui.clear}
              </button>
            </div>
            <ol class="divide-y divide-line/20">
              {files.map((file, i) => (
                <li key={`${file.name}-${file.size}-${i}`} class="flex items-center gap-3 py-2">
                  <span class="w-6 text-sm text-muted">{i + 1}</span>
                  <img src={thumbs[i] ?? ''} alt="" class="h-12 w-12 rounded object-cover" />
                  <span class="min-w-0 flex-1 truncate text-sm" title={file.name}>
                    {file.name}
                  </span>
                  <button
                    type="button"
                    class={smallButton}
                    disabled={running || i === 0}
                    aria-label={fill(t.moveUp, { name: file.name })}
                    onClick={() => update(moveItem(files, i, i - 1))}
                  >
                    {t.up}
                  </button>
                  <button
                    type="button"
                    class={smallButton}
                    disabled={running || i === files.length - 1}
                    aria-label={fill(t.moveDown, { name: file.name })}
                    onClick={() => update(moveItem(files, i, i + 1))}
                  >
                    {t.down}
                  </button>
                  <button
                    type="button"
                    class={smallButton}
                    disabled={running}
                    aria-label={fill(t.removeFile, { name: file.name })}
                    onClick={() => update(removeAt(files, i))}
                  >
                    {t.remove}
                  </button>
                </li>
              ))}
            </ol>
          </section>

          <OptionsPanel title={t.title}>
            <Field id="pdfPage" label={t.pageSize}>
              <select
                id="pdfPage"
                class="input w-full"
                value={options.pdfPage}
                disabled={running}
                onChange={(e) => {
                  runner.reset();
                  setOptions({ pdfPage: e.currentTarget.value as ImagesToPdfOptions['pdfPage'] });
                }}
              >
                <option value="a4">{t.a4}</option>
                <option value="fit">{t.fit}</option>
              </select>
            </Field>
          </OptionsPanel>

          <div class="flex gap-3">
            <button
              type="button"
              disabled={running}
              onClick={() => runner.run(files, options)}
              class="btn btn-primary btn-lg"
            >
              {running ? t.running : t.run}
            </button>
            {running && (
              <button
                type="button"
                onClick={runner.cancel}
                class="btn btn-lg"
              >
                {ui.cancel}
              </button>
            )}
          </div>
        </>
      )}

      {running && <ProgressBar value={runner.progress[0] ?? 0} label={bare(t.running)} />}
      {runner.state !== 'idle' && <DownloadPanel inputs={files} results={runner.results} beforeBytes={totalBytes} />}
    </div>
  );
}
