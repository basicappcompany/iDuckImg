import { useEffect, useRef, useState } from 'preact/hooks';
import FileDropzone from '../../components/FileDropzone';
import OptionsPanel, { Field } from '../../components/OptionsPanel';
import ProgressBar from '../../components/ProgressBar';
import DownloadPanel from '../../components/DownloadPanel';
import { useToolRunner } from '../../engine/useToolRunner';
import { cropTool } from './tool';
import {
  ASPECTS,
  fitRectToAspect,
  fullRect,
  initialRect,
  moveRect,
  resizeRect,
  resolveAspect,
  screenToImageDelta,
  setRectField,
  type Bounds,
  type Handle,
  type Rect,
  type RectField,
} from './geometry';
import { bare, useText, useUi } from '../../i18n/ui';
import { CROP_TEXT } from '../../i18n/tools/crop';

const inputClass = 'input w-full';
const smallButton =
  'btn btn-sm';

/** Where each handle sits on the box, and the cursor that hints at its direction. */
const HANDLES: { id: Handle; style: string; cursor: string }[] = [
  { id: 'nw', style: 'left:0;top:0', cursor: 'nwse-resize' },
  { id: 'n', style: 'left:50%;top:0', cursor: 'ns-resize' },
  { id: 'ne', style: 'left:100%;top:0', cursor: 'nesw-resize' },
  { id: 'e', style: 'left:100%;top:50%', cursor: 'ew-resize' },
  { id: 'se', style: 'left:100%;top:100%', cursor: 'nwse-resize' },
  { id: 's', style: 'left:50%;top:100%', cursor: 'ns-resize' },
  { id: 'sw', style: 'left:0;top:100%', cursor: 'nesw-resize' },
  { id: 'w', style: 'left:0;top:50%', cursor: 'ew-resize' },
];

interface Drag {
  mode: Handle | 'move';
  startX: number;
  startY: number;
  start: Rect;
}

export default function CropTool() {
  const ui = useUi();
  const t = useText(CROP_TEXT);
  const aspectLabel = (id: string, fallback: string) =>
    id === 'free' ? t.aspectFree : id === 'original' ? t.aspectOriginal : id === '1:1' ? t.aspectSquare : id === '4:5' ? t.aspectPost : fallback;
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [bounds, setBounds] = useState<Bounds | null>(null);
  const [rect, setRect] = useState<Rect | null>(null);
  const [aspectId, setAspectId] = useState('free');
  const [loadError, setLoadError] = useState(false);
  const runner = useToolRunner(cropTool);
  const running = runner.state === 'running';
  const stage = useRef<HTMLDivElement>(null);
  const drag = useRef<Drag | null>(null);

  useEffect(() => () => (url ? URL.revokeObjectURL(url) : undefined), [url]);

  const aspect = bounds ? resolveAspect(ASPECTS.find((a) => a.id === aspectId) ?? ASPECTS[0]!, bounds) : null;

  const choose = (files: File[]) => {
    const next = files[0];
    if (!next) return;
    runner.reset();
    setFile(next);
    setBounds(null);
    setRect(null);
    setLoadError(false);
    setAspectId('free');
    setUrl(URL.createObjectURL(next));
  };

  const onImageLoad = (e: Event) => {
    const img = e.currentTarget as HTMLImageElement;
    const b = { width: img.naturalWidth, height: img.naturalHeight };
    setBounds(b);
    setRect(initialRect(b));
  };

  const edit = (next: Rect) => {
    runner.reset();
    setRect(next);
  };

  const begin = (mode: Drag['mode']) => (e: PointerEvent) => {
    if (!rect || running) return;
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { mode, startX: e.clientX, startY: e.clientY, start: rect };
  };

  const onMove = (e: PointerEvent) => {
    const d = drag.current;
    const el = stage.current;
    if (!d || !el || !bounds) return;
    const shown = el.getBoundingClientRect();
    const dx = screenToImageDelta(e.clientX - d.startX, shown.width, bounds.width);
    const dy = screenToImageDelta(e.clientY - d.startY, shown.height, bounds.height);
    edit(d.mode === 'move' ? moveRect(d.start, dx, dy, bounds) : resizeRect(d.start, d.mode, dx, dy, bounds, aspect));
  };

  const end = (e: PointerEvent) => {
    drag.current = null;
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  const onKey = (e: KeyboardEvent) => {
    if (!rect || !bounds || running) return;
    const step = e.shiftKey ? 10 : 1;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const m = moves[e.key];
    if (!m) return;
    e.preventDefault();
    edit(moveRect(rect, m[0], m[1], bounds));
  };

  const pickAspect = (id: string) => {
    setAspectId(id);
    if (!bounds || !rect) return;
    const ratio = resolveAspect(ASPECTS.find((a) => a.id === id) ?? ASPECTS[0]!, bounds);
    if (ratio !== null) edit(fitRectToAspect(rect, ratio, bounds));
  };

  const numeric = (field: RectField, label: string) => (
    <Field id={`crop-${field}`} label={label}>
      <input
        id={`crop-${field}`}
        type="number"
        inputMode="numeric"
        class={inputClass}
        value={rect ? rect[field] : ''}
        disabled={running || !rect}
        onInput={(e) => {
          if (!rect || !bounds) return;
          const v = Number(e.currentTarget.value);
          if (e.currentTarget.value !== '' && Number.isFinite(v)) edit(setRectField(rect, field, v, bounds, aspect));
        }}
      />
    </Field>
  );

  const pct = (n: number, of: number) => `${(n / of) * 100}%`;

  return (
    <div class="grid gap-5">
      <FileDropzone accepts={cropTool.accepts} onFiles={choose} multiple={false} disabled={running} />

      {file && url && (
        <>
          <p class="text-sm">
            {file.name}
            {bounds && ` (${bounds.width} x ${bounds.height} px)`}.{' '}
            <button
              type="button"
              class="link"
              disabled={running}
              onClick={() => {
                runner.reset();
                setFile(null);
                setUrl(null);
                setBounds(null);
                setRect(null);
              }}
            >
              {t.remove}
            </button>
          </p>

          {loadError && (
            <p role="alert" class="text-sm text-danger font-bold">
              {t.loadError}
            </p>
          )}

          <div class="card p-3">
            <div
              ref={stage}
              class="relative mx-auto inline-block max-w-full select-none overflow-hidden align-top"
              style={{ touchAction: 'none' }}
            >
              <img
                src={url}
                alt={t.alt}
                draggable={false}
                class="block h-auto max-w-full"
                onLoad={onImageLoad}
                onError={() => setLoadError(true)}
              />
              {rect && bounds && (
                <div
                  data-testid="crop-box"
                  tabIndex={0}
                  role="group"
                  aria-label={t.areaLabel}
                  class="absolute cursor-move border-2 border-white outline outline-1 outline-duckink"
                  style={{
                    left: pct(rect.x, bounds.width),
                    top: pct(rect.y, bounds.height),
                    width: pct(rect.width, bounds.width),
                    height: pct(rect.height, bounds.height),
                    boxShadow: '0 0 0 9999px rgba(0,0,0,0.55)',
                    touchAction: 'none',
                  }}
                  onPointerDown={begin('move')}
                  onPointerMove={onMove}
                  onPointerUp={end}
                  onPointerCancel={end}
                  onKeyDown={onKey}
                >
                  {HANDLES.map((h) => (
                    <div
                      key={h.id}
                      data-handle={h.id}
                      class="absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-md border-2 border-duckink bg-duck"
                      style={`${h.style};cursor:${h.cursor};touch-action:none`}
                      onPointerDown={begin(h.id)}
                      onPointerMove={onMove}
                      onPointerUp={end}
                      onPointerCancel={end}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <OptionsPanel title={t.boxTitle}>
            <Field id="crop-aspect" label={t.shape}>
              <select
                id="crop-aspect"
                class={inputClass}
                value={aspectId}
                disabled={running || !rect}
                onChange={(e) => pickAspect(e.currentTarget.value)}
              >
                {ASPECTS.map((a) => (
                  <option key={a.id} value={a.id}>
                    {aspectLabel(a.id, a.label)}
                  </option>
                ))}
              </select>
            </Field>
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {numeric('x', t.left)}
              {numeric('y', t.top)}
              {numeric('width', t.width)}
              {numeric('height', t.height)}
            </div>
            <div class="flex flex-wrap gap-3">
              <button
                type="button"
                class={smallButton}
                disabled={running || !bounds}
                onClick={() => bounds && edit(initialRect(bounds))}
              >
                {t.resetBox}
              </button>
              <button
                type="button"
                class={smallButton}
                disabled={running || !bounds}
                onClick={() => bounds && edit(aspect ? fitRectToAspect(fullRect(bounds), aspect, bounds) : fullRect(bounds))}
              >
                {t.whole}
              </button>
            </div>
            <p class="text-xs text-muted">
              {t.help}
            </p>
          </OptionsPanel>

          <div class="flex gap-3">
            <button
              type="button"
              disabled={running || !rect}
              onClick={() => rect && runner.run([file], { rect, quality: cropTool.defaultOptions.quality })}
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
      {runner.state !== 'idle' && file && <DownloadPanel inputs={[file]} results={runner.results} />}
    </div>
  );
}
