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
import { fill, useText, useUi } from '../../i18n/ui';
import { ROTATE_TEXT } from '../../i18n/tools/rotate';

const buttonClass =
  'btn btn-sm';

export default function RotateTool() {
  const ui = useUi();
  const t = useText(ROTATE_TEXT);
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
            {fill(files.length === 1 ? ui.selectedOne : ui.selectedMany, { n: files.length })}{' '}
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
              {ui.clear}
            </button>
          </p>

          {previewUrl && (
            <div
              class="card mx-auto flex h-64 w-64 items-center justify-center overflow-hidden"
              aria-label={t.previewAria}
            >
              <img
                src={previewUrl}
                alt={t.alt}
                class="max-h-full max-w-full transition-transform"
                style={{ transform: previewTransform(options) }}
              />
            </div>
          )}

          <OptionsPanel title={t.title}>
            <div class="flex flex-wrap gap-3">
              <button type="button" class={buttonClass} disabled={running} onClick={() => change(rotateLeft(options))}>
                {t.left}
              </button>
              <button type="button" class={buttonClass} disabled={running} onClick={() => change(rotateRight(options))}>
                {t.right}
              </button>
              <button type="button" class={buttonClass} disabled={running} onClick={() => change(flipHorizontal(options))}>
                {t.flipH}
              </button>
              <button type="button" class={buttonClass} disabled={running} onClick={() => change(flipVertical(options))}>
                {t.flipV}
              </button>
              <button
                type="button"
                class={buttonClass}
                disabled={running || isIdentity(options)}
                onClick={() => change(defaultRotateOptions)}
              >
                {t.reset}
              </button>
            </div>
            <p class="text-xs text-muted">
              {t.note}
            </p>
          </OptionsPanel>

          <div class="flex gap-3">
            <button
              type="button"
              disabled={running || isIdentity(options)}
              onClick={() => runner.run(files, options)}
              class="btn btn-primary btn-lg"
            >
              {running ? ui.working : t.run}
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

      {running && <ProgressBar value={overall} label="Working" />}
      {runner.state !== 'idle' && <DownloadPanel inputs={files} results={runner.results} />}
    </div>
  );
}
