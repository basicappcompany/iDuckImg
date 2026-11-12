import { useState } from 'preact/hooks';
import FileDropzone from '../../components/FileDropzone';
import OptionsPanel, { Field } from '../../components/OptionsPanel';
import ProgressBar from '../../components/ProgressBar';
import DownloadPanel from '../../components/DownloadPanel';
import { useToolRunner } from '../../engine/useToolRunner';
import { compressTool } from './tool';
import type { CompressOptions } from './options';
import { bare, fill, useText, useUi } from '../../i18n/ui';
import { COMPRESS_TEXT } from '../../i18n/tools/compress';

export default function CompressTool({ initial }: { initial?: Partial<CompressOptions> } = {}) {
  const ui = useUi();
  const t = useText(COMPRESS_TEXT);
  const [files, setFiles] = useState<File[]>([]);
  const [options, setOptions] = useState<CompressOptions>({ ...compressTool.defaultOptions, ...initial });
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
              id="quality"
              label={fill(t.quality, { n: options.quality })}
              hint={t.qualityHint}
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
            <Field id="format" label={t.format}>
              <select
                id="format"
                class="input"
                value={options.format}
                disabled={running}
                onChange={(e) =>
                  setOptions({ ...options, format: e.currentTarget.value as CompressOptions['format'] })
                }
              >
                <option value="same">{t.keep}</option>
                <option value="webp">{t.webp}</option>
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

      {running && <ProgressBar value={overall} label={bare(t.running)} />}
      {runner.state !== 'idle' && <DownloadPanel inputs={files} results={runner.results} />}
    </div>
  );
}
