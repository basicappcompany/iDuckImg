import { useEffect, useRef, useState } from 'preact/hooks';
import FileDropzone from '../../components/FileDropzone';
import OptionsPanel, { Field } from '../../components/OptionsPanel';
import ProgressBar from '../../components/ProgressBar';
import DownloadPanel from '../../components/DownloadPanel';
import { useToolRunner } from '../../engine/useToolRunner';
import { watermarkTool } from './tool';
import { drawWatermark } from './draw';
import { MAX_TEXT_LENGTH, WATERMARK_POSITIONS, cleanText, type WatermarkOptions, type WatermarkPosition } from './options';
import { fill, useText, useUi } from '../../i18n/ui';
import { WATERMARK_TEXT } from '../../i18n/tools/watermark';
import { POSITION_TEXT } from '../../i18n/tools/positions';

const PREVIEW_WIDTH = 560;

export default function WatermarkTool() {
  const ui = useUi();
  const t = useText(WATERMARK_TEXT);
  const pos = useText(POSITION_TEXT);
  const [files, setFiles] = useState<File[]>([]);
  const [options, setOptions] = useState<WatermarkOptions>(watermarkTool.defaultOptions);
  const runner = useToolRunner(watermarkTool);
  const running = runner.state === 'running';
  const canvas = useRef<HTMLCanvasElement>(null);
  const picture = useRef<ImageBitmap | null>(null);
  const [previewReady, setPreviewReady] = useState(0);
  const set = (patch: Partial<WatermarkOptions>) => {
    runner.reset();
    setOptions((prev) => ({ ...prev, ...patch }));
  };

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

  // Load the first picture once for the preview. The preview uses the same drawing code as the real result.
  const first = files[0];
  useEffect(() => {
    let cancelled = false;
    picture.current?.close();
    picture.current = null;
    if (!first) {
      setPreviewReady((n) => n + 1);
      return;
    }
    createImageBitmap(first)
      .then((bitmap) => {
        if (cancelled) return bitmap.close();
        picture.current = bitmap;
        setPreviewReady((n) => n + 1);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [first]);

  useEffect(() => {
    const el = canvas.current;
    const bitmap = picture.current;
    if (!el || !bitmap) return;
    const scale = Math.min(1, PREVIEW_WIDTH / bitmap.width);
    el.width = Math.max(1, Math.round(bitmap.width * scale));
    el.height = Math.max(1, Math.round(bitmap.height * scale));
    const ctx = el.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, el.width, el.height);
    ctx.drawImage(bitmap, 0, 0, el.width, el.height);
    drawWatermark(ctx, el.width, el.height, options);
  }, [options, previewReady]);

  const hasText = cleanText(options.text).length > 0;
  const lossy = true;

  return (
    <div class="grid gap-5">
      <FileDropzone accepts={watermarkTool.accepts} onFiles={addFiles} disabled={running} />

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

          <div class="card mx-auto overflow-hidden" aria-label={t.previewAria}>
            <canvas ref={canvas} class="block max-h-[28rem] max-w-full" role="img" aria-label={t.canvasAria} />
          </div>

          <OptionsPanel title={t.title}>
            <Field id="wm-text" label={t.text} hint={fill(t.hint, { max: MAX_TEXT_LENGTH })}>
              <input
                id="wm-text"
                type="text"
                class="input w-full"
                maxLength={MAX_TEXT_LENGTH}
                value={options.text}
                disabled={running}
                placeholder={t.placeholder}
                onInput={(e) => set({ text: (e.currentTarget as HTMLInputElement).value })}
              />
            </Field>

            <Field id="wm-position" label={t.position}>
              <select
                id="wm-position"
                class="input w-full"
                value={options.position}
                disabled={running}
                onChange={(e) => set({ position: (e.currentTarget as HTMLSelectElement).value as WatermarkPosition })}
              >
                {WATERMARK_POSITIONS.map((p) => (
                  <option value={p.id}>{pos[p.id]}</option>
                ))}
              </select>
            </Field>

            <div class="grid gap-4 sm:grid-cols-2">
              <Field id="wm-size" label={fill(t.size, { n: options.sizePct })}>
                <input
                  id="wm-size"
                  type="range"
                  min={2}
                  max={20}
                  step={1}
                  value={options.sizePct}
                  disabled={running}
                  onInput={(e) => set({ sizePct: Number((e.currentTarget as HTMLInputElement).value) })}
                />
              </Field>
              <Field id="wm-opacity" label={fill(t.opacity, { n: options.opacity })}>
                <input
                  id="wm-opacity"
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={options.opacity}
                  disabled={running}
                  onInput={(e) => set({ opacity: Number((e.currentTarget as HTMLInputElement).value) })}
                />
              </Field>
            </div>

            <Field id="wm-color" label={t.colour}>
              <select
                id="wm-color"
                class="input w-full"
                value={options.color}
                disabled={running}
                onChange={(e) => set({ color: (e.currentTarget as HTMLSelectElement).value as 'white' | 'black' })}
              >
                <option value="white">{t.white}</option>
                <option value="black">{t.black}</option>
              </select>
            </Field>
            {lossy && (
              <p class="text-xs text-muted">
                {t.note}
              </p>
            )}
          </OptionsPanel>

          <div class="flex gap-3">
            <button
              type="button"
              disabled={running || !hasText}
              onClick={() => runner.run(files, options)}
              class="btn btn-primary btn-lg"
            >
              {running ? ui.working : t.run}
            </button>
            {running && (
              <button type="button" onClick={runner.cancel} class="btn btn-lg">
                {ui.cancel}
              </button>
            )}
          </div>
          {!hasText && <p class="text-sm text-muted">{t.missing}</p>}
        </>
      )}

      {running && <ProgressBar value={overall} label="Working" />}
      {runner.state !== 'idle' && <DownloadPanel inputs={files} results={runner.results} />}
    </div>
  );
}
