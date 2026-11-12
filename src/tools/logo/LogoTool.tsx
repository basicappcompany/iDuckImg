import { useEffect, useRef, useState } from 'preact/hooks';
import FileDropzone from '../../components/FileDropzone';
import OptionsPanel, { Field } from '../../components/OptionsPanel';
import ProgressBar from '../../components/ProgressBar';
import DownloadPanel from '../../components/DownloadPanel';
import { useToolRunner } from '../../engine/useToolRunner';
import { isAccepted } from '../../lib/files';
import { logoTool } from './tool';
import { drawLogo } from './draw';
import { LOGO_ACCEPTS, LOGO_POSITIONS, type LogoOptions } from './options';
import type { WatermarkPosition } from '../watermark/options';
import { fill, useUi } from '../../i18n/ui';

const PREVIEW_WIDTH = 560;

export default function LogoTool() {
  const ui = useUi();
  const [files, setFiles] = useState<File[]>([]);
  const [options, setOptions] = useState<LogoOptions>(logoTool.defaultOptions);
  const [logoError, setLogoError] = useState('');
  const runner = useToolRunner(logoTool);
  const running = runner.state === 'running';
  const canvas = useRef<HTMLCanvasElement>(null);
  const picture = useRef<ImageBitmap | null>(null);
  const logoBitmap = useRef<ImageBitmap | null>(null);
  const [previewReady, setPreviewReady] = useState(0);
  const set = (patch: Partial<LogoOptions>) => {
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

  const logo = options.logo;
  useEffect(() => {
    let cancelled = false;
    logoBitmap.current?.close();
    logoBitmap.current = null;
    if (!logo) {
      setPreviewReady((n) => n + 1);
      return;
    }
    createImageBitmap(logo)
      .then((bitmap) => {
        if (cancelled) return bitmap.close();
        logoBitmap.current = bitmap;
        setPreviewReady((n) => n + 1);
      })
      .catch(() => {
        if (!cancelled) setLogoError('That logo could not be read. Use a PNG, JPG or WebP picture.');
      });
    return () => {
      cancelled = true;
    };
  }, [logo]);

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
    if (logoBitmap.current) drawLogo(ctx, el.width, el.height, logoBitmap.current, options);
  }, [options, previewReady]);

  const chooseLogo = (event: Event) => {
    const input = event.currentTarget as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    if (!isAccepted(file, LOGO_ACCEPTS)) {
      setLogoError('Use a PNG, JPG or WebP picture for the logo. A PNG with a transparent background looks best.');
      return;
    }
    setLogoError('');
    set({ logo: file });
  };

  const hasLogo = options.logo !== null;

  return (
    <div class="grid gap-5">
      <FileDropzone accepts={logoTool.accepts} onFiles={addFiles} disabled={running} />

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

          <div class="card mx-auto overflow-hidden" aria-label="Preview of the first image">
            <canvas ref={canvas} class="block max-h-[28rem] max-w-full" role="img" aria-label="Preview with the logo" />
          </div>

          <OptionsPanel title="Logo">
            <Field
              id="logo-file"
              label="Your logo"
              hint="A PNG with a transparent background looks best. It stays on your device."
            >
              <input
                id="logo-file"
                type="file"
                accept={LOGO_ACCEPTS.join(',')}
                class="input w-full"
                disabled={running}
                onChange={chooseLogo}
              />
            </Field>
            {hasLogo && (
              <p class="text-sm">
                Logo: <strong>{options.logo instanceof File ? options.logo.name : 'chosen'}</strong>
              </p>
            )}
            {logoError && (
              <p role="alert" class="text-sm font-bold text-red-700">
                {logoError}
              </p>
            )}

            <Field id="logo-position" label="Position">
              <select
                id="logo-position"
                class="input w-full"
                value={options.position}
                disabled={running}
                onChange={(e) => set({ position: (e.currentTarget as HTMLSelectElement).value as WatermarkPosition })}
              >
                {LOGO_POSITIONS.map((p) => (
                  <option value={p.id}>{p.label}</option>
                ))}
              </select>
            </Field>

            <div class="grid gap-4 sm:grid-cols-2">
              <Field id="logo-size" label={`Size: ${options.sizePct}% of the width`}>
                <input
                  id="logo-size"
                  type="range"
                  min={5}
                  max={60}
                  step={1}
                  value={options.sizePct}
                  disabled={running}
                  onInput={(e) => set({ sizePct: Number((e.currentTarget as HTMLInputElement).value) })}
                />
              </Field>
              <Field id="logo-opacity" label={`Opacity: ${options.opacity}%`}>
                <input
                  id="logo-opacity"
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
            <p class="text-xs text-muted">
              The preview shows the first image; the same logo goes on every image at the same relative size. JPG and
              WebP are saved again at high quality, so the file size can change slightly. A logo discourages copying
              but can be cropped out, so it does not protect a picture.
            </p>
          </OptionsPanel>

          <div class="flex gap-3">
            <button
              type="button"
              disabled={running || !hasLogo}
              onClick={() => runner.run(files, options)}
              class="btn btn-primary btn-lg"
            >
              {running ? ui.working : 'Add logo'}
            </button>
            {running && (
              <button type="button" onClick={runner.cancel} class="btn btn-lg">
                {ui.cancel}
              </button>
            )}
          </div>
          {!hasLogo && <p class="text-sm text-muted">Choose your logo to continue.</p>}
        </>
      )}

      {running && <ProgressBar value={overall} label="Working" />}
      {runner.state !== 'idle' && <DownloadPanel inputs={files} results={runner.results} />}
    </div>
  );
}
