import { useEffect, useRef, useState } from 'preact/hooks';
import SimpleToolShell from '../../components/SimpleToolShell';
import OptionsPanel, { Field } from '../../components/OptionsPanel';
import { blurTool } from './tool';
import {
  MAX_REGIONS,
  applyEffect,
  clampRegion,
  regionFromCorners,
  regionToPixels,
  type BlurOptions,
  type CoverColour,
  type Effect,
  type Region,
} from './options';

const PREVIEW_WIDTH = 640;

const pct = (n: number) => Math.round(n * 1000) / 10;

export default function BlurTool() {
  const [options, setOptions] = useState<BlurOptions>(blurTool.defaultOptions);

  return (
    <SimpleToolShell
      tool={blurTool}
      options={options}
      canRun={options.regions.length > 0}
      runLabel={options.effect === 'cover' ? 'Hide the boxes' : options.effect === 'pixelate' ? 'Pixelate the boxes' : 'Blur the boxes'}
      missing="Draw at least one box on the picture to continue."
    >
      {({ files, running, reset }) => {
        const set = (patch: Partial<BlurOptions>) => {
          reset();
          setOptions((prev) => ({ ...prev, ...patch }));
        };
        return <Panels file={files[0]!} count={files.length} running={running} options={options} set={set} />;
      }}
    </SimpleToolShell>
  );
}

function Panels({
  file,
  count,
  running,
  options,
  set,
}: {
  file: File;
  count: number;
  running: boolean;
  options: BlurOptions;
  set: (patch: Partial<BlurOptions>) => void;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const [bitmap, setBitmap] = useState<ImageBitmap | null>(null);
  const [draft, setDraft] = useState<Region | null>(null);
  const start = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    let cancelled = false;
    createImageBitmap(file)
      .then((b) => {
        if (cancelled) b.close();
        else setBitmap(b);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [file]);

  // The preview runs the same effect code as the result, on a smaller copy of the picture.
  useEffect(() => {
    const el = canvas.current;
    if (!el || !bitmap) return;
    const scale = Math.min(1, PREVIEW_WIDTH / bitmap.width);
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));
    el.width = w;
    el.height = h;
    const ctx = el.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    ctx.drawImage(bitmap, 0, 0, w, h);
    if (options.regions.length === 0) return;
    const img = ctx.getImageData(0, 0, w, h);
    for (const r of options.regions) applyEffect(img, regionToPixels(r, w, h), options.effect, options.strength, options.cover);
    ctx.putImageData(img, 0, 0);
  }, [bitmap, options.regions, options.effect, options.strength, options.cover]);

  const point = (e: PointerEvent) => {
    const box = overlay.current!.getBoundingClientRect();
    return {
      x: Math.min(1, Math.max(0, (e.clientX - box.left) / box.width)),
      y: Math.min(1, Math.max(0, (e.clientY - box.top) / box.height)),
    };
  };
  const addRegion = (r: Region) => {
    if (options.regions.length >= MAX_REGIONS) return;
    set({ regions: [...options.regions, clampRegion(r)] });
  };
  const changeRegion = (i: number, patch: Partial<Region>) =>
    set({ regions: options.regions.map((r, k) => (k === i ? clampRegion({ ...r, ...patch }) : r)) });

  return (
    <>
      <div class="card mx-auto w-fit max-w-full overflow-hidden" aria-label="Picture to edit">
        <div class="relative">
          <canvas ref={canvas} class="block max-h-[32rem] max-w-full" role="img" aria-label="Picture with the boxes applied" />
          <div
            ref={overlay}
            data-testid="draw-surface"
            class="absolute inset-0 cursor-crosshair"
            style={{ touchAction: 'none' }}
            onPointerDown={(e) => {
              if (running) return;
              (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
              start.current = point(e);
              setDraft(null);
            }}
            onPointerMove={(e) => {
              if (!start.current) return;
              const p = point(e);
              setDraft(regionFromCorners(start.current.x, start.current.y, p.x, p.y));
            }}
            onPointerUp={(e) => {
              if (!start.current) return;
              const p = point(e);
              const r = regionFromCorners(start.current.x, start.current.y, p.x, p.y);
              start.current = null;
              setDraft(null);
              // A click without a drag does nothing; a real drag adds a box.
              if (Math.abs(p.x - r.x) + Math.abs(p.y - r.y) > 0.01) addRegion(r);
            }}
          >
            {options.regions.map((r, i) => (
              <div
                key={i}
                class="pointer-events-none absolute border-2 border-duck"
                style={{ left: `${r.x * 100}%`, top: `${r.y * 100}%`, width: `${r.width * 100}%`, height: `${r.height * 100}%`, boxShadow: '0 0 0 1px #000' }}
              >
                <span class="absolute -left-0.5 -top-6 rounded bg-duck px-1.5 text-xs font-black text-duckink">{i + 1}</span>
              </div>
            ))}
            {draft && (
              <div
                class="pointer-events-none absolute border-2 border-dashed border-duck"
                style={{ left: `${draft.x * 100}%`, top: `${draft.y * 100}%`, width: `${draft.width * 100}%`, height: `${draft.height * 100}%`, boxShadow: '0 0 0 1px #000' }}
              />
            )}
          </div>
        </div>
      </div>
      <p class="text-center text-sm text-muted">Drag on the picture to draw a box over what you want to hide.</p>

      <OptionsPanel title="Boxes">
        {options.regions.length === 0 ? (
          <p class="text-sm text-muted">No boxes yet. Drag on the picture, or add one here and type its position.</p>
        ) : (
          <ul class="grid gap-3">
            {options.regions.map((r, i) => (
              <li key={i} class="grid gap-2 rounded-xl border-2 border-line p-3">
                <div class="flex items-center justify-between">
                  <span class="font-black">Box {i + 1}</span>
                  <button type="button" class="btn btn-sm" disabled={running} aria-label={`Remove box ${i + 1}`} onClick={() => set({ regions: options.regions.filter((_, k) => k !== i) })}>
                    Remove
                  </button>
                </div>
                <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {(
                    [
                      ['x', 'Left (%)'],
                      ['y', 'Top (%)'],
                      ['width', 'Width (%)'],
                      ['height', 'Height (%)'],
                    ] as const
                  ).map(([key, label]) => (
                    <label key={key} class="grid gap-1 text-xs font-bold">
                      <span>
                        {label}
                        <span class="sr-only"> of box {i + 1}</span>
                      </span>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        step={0.5}
                        class="input w-full"
                        value={pct(r[key])}
                        disabled={running}
                        aria-label={`Box ${i + 1} ${label}`}
                        onInput={(e) => changeRegion(i, { [key]: Number((e.currentTarget as HTMLInputElement).value) / 100 })}
                      />
                    </label>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
        <div>
          <button
            type="button"
            class="btn btn-sm"
            disabled={running || options.regions.length >= MAX_REGIONS}
            onClick={() => addRegion({ x: 0.35, y: 0.4, width: 0.3, height: 0.2 })}
          >
            Add a box in the middle
          </button>
        </div>
      </OptionsPanel>

      <OptionsPanel title="Effect">
        <div class="grid gap-4 sm:grid-cols-2">
          <Field id="bl-effect" label="What to do with the boxes">
            <select id="bl-effect" class="input w-full" value={options.effect} disabled={running} onChange={(e) => set({ effect: (e.currentTarget as HTMLSelectElement).value as Effect })}>
              <option value="blur">Blur</option>
              <option value="pixelate">Pixelate</option>
              <option value="cover">Cover with a solid color</option>
            </select>
          </Field>
          {options.effect === 'cover' ? (
            <Field id="bl-cover" label="Color">
              <select id="bl-cover" class="input w-full" value={options.cover} disabled={running} onChange={(e) => set({ cover: (e.currentTarget as HTMLSelectElement).value as CoverColour })}>
                <option value="black">Black</option>
                <option value="white">White</option>
              </select>
            </Field>
          ) : (
            <Field id="bl-strength" label={`Strength: ${options.strength}`}>
              <input id="bl-strength" type="range" min={5} max={100} step={5} value={options.strength} disabled={running} onInput={(e) => set({ strength: Number((e.currentTarget as HTMLInputElement).value) })} />
            </Field>
          )}
        </div>
        <p class="text-xs text-muted">
          For names, numbers or faces that must stay private, use Cover or a high strength: a light blur can sometimes be
          partly read. The saved picture is a new file and the original is not changed.
          {count > 1 ? ` The same boxes are applied to all ${count} pictures; the preview shows the first.` : ''}
        </p>
      </OptionsPanel>
    </>
  );
}
