import { useState } from 'preact/hooks';
import FileDropzone from '../../components/FileDropzone';
import OptionsPanel, { Field } from '../../components/OptionsPanel';
import ProgressBar from '../../components/ProgressBar';
import DownloadPanel from '../../components/DownloadPanel';
import { useToolRunner } from '../../engine/useToolRunner';
import { convertTool } from './tool';
import { losesTransparency, type ConvertOptions } from './options';
import { bare, fill, useText, useUi } from '../../i18n/ui';
import { CONVERT_TEXT } from '../../i18n/tools/convert';

const inputClass = 'input w-full';

export default function ConvertTool({ initial }: { initial?: Partial<ConvertOptions> } = {}) {
  const ui = useUi();
  const t = useText(CONVERT_TEXT);
  const [files, setFiles] = useState<File[]>([]);
  const [options, setOptions] = useState<ConvertOptions>({ ...convertTool.defaultOptions, ...initial });
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
            {fill(files.length === 1 ? ui.selectedOne : ui.selectedMany, { n: files.length })}{' '}
            <button
              type="button"
              class="link"
              disabled={running}
              onClick={() => {
                runner.reset();
                setFiles([]);
              }}
            >
              {ui.clear}
            </button>
          </p>

          <OptionsPanel title={t.title}>
            <Field
              id="target"
              label={t.format}
              {...(losesTransparency(options.target)
                ? { hint: t.noAlpha }
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
                <option value="pdf">{t.pdfOption}</option>
              </select>
            </Field>

            {lossy && (
              <Field id="quality" label={fill(t.quality, { n: options.quality })} hint={t.qualityHint}>
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
              <Field id="pdfPage" label={t.pageSize}>
                <select
                  id="pdfPage"
                  class={inputClass}
                  value={options.pdfPage}
                  disabled={running}
                  onChange={(e) => set({ pdfPage: e.currentTarget.value as ConvertOptions['pdfPage'] })}
                >
                  <option value="fit">{t.fit}</option>
                  <option value="a4">{t.a4}</option>
                </select>
              </Field>
            )}
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

      {running && <ProgressBar value={overall} label={bare(t.running)} />}
      {runner.state !== 'idle' && <DownloadPanel inputs={files} results={runner.results} />}
    </div>
  );
}
