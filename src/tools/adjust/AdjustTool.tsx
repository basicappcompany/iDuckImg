import { useEffect, useRef, useState } from 'preact/hooks';
import SimpleToolShell from '../../components/SimpleToolShell';
import OptionsPanel, { Field } from '../../components/OptionsPanel';
import { adjustTool } from './tool';
import { FILTERS, adjustPixels, defaultAdjustOptions, isUnchanged, type AdjustFilter, type AdjustOptions } from './options';

const PREVIEW_WIDTH = 520;

export default function AdjustTool() {
  const [options, setOptions] = useState<AdjustOptions>(adjustTool.defaultOptions);

  return (
    <SimpleToolShell
      tool={adjustTool}
      options={options}
      canRun={!isUnchanged(options)}
      runLabel="Apply"
      missing="Change a setting to continue."
    >
      {({ files, running, reset }) => {
        const set = (patch: Partial<AdjustOptions>) => {
          reset();
          setOptions((prev) => ({ ...prev, ...patch }));
        };
        return <Panels file={files[0]!} running={running} options={options} set={set} onReset={() => set({ ...defaultAdjustOptions })} />;
      }}
    </SimpleToolShell>
  );
}

function Slider({
  id,
  label,
  value,
  disabled,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  disabled: boolean;
  onChange: (n: number) => void;
}) {
  return (
    <Field id={id} label={`${label}: ${value}`}>
      <input
        id={id}
        type="range"
        min={-100}
        max={100}
        step={1}
        value={value}
        disabled={disabled}
        onInput={(e) => onChange(Number((e.currentTarget as HTMLInputElement).value))}
      />
    </Field>
  );
}

function Panels({
  file,
  running,
  options,
  set,
  onReset,
}: {
  file: File;
  running: boolean;
  options: AdjustOptions;
  set: (patch: Partial<AdjustOptions>) => void;
  onReset: () => void;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [bitmap, setBitmap] = useState<ImageBitmap | null>(null);

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

  // The preview runs the very same adjustPixels() as the result, on a smaller copy of the picture.
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
    const src = ctx.getImageData(0, 0, w, h);
    ctx.putImageData(new ImageData(adjustPixels(src, options), w, h), 0, 0);
  }, [bitmap, options]);

  return (
    <>
      <div class="card mx-auto overflow-hidden" aria-label="Preview of the first image">
        <canvas ref={canvas} class="block max-h-96 max-w-full" role="img" aria-label="Preview with the changes" />
      </div>

      <OptionsPanel title="Colors and filters">
        <Slider id="adj-brightness" label="Brightness" value={options.brightness} disabled={running} onChange={(n) => set({ brightness: n })} />
        <Slider id="adj-contrast" label="Contrast" value={options.contrast} disabled={running} onChange={(n) => set({ contrast: n })} />
        <Slider id="adj-saturation" label="Color strength" value={options.saturation} disabled={running} onChange={(n) => set({ saturation: n })} />
        <Field id="adj-filter" label="Filter">
          <select
            id="adj-filter"
            class="input w-full"
            value={options.filter}
            disabled={running}
            onChange={(e) => set({ filter: (e.currentTarget as HTMLSelectElement).value as AdjustFilter })}
          >
            {FILTERS.map((f) => (
              <option value={f.id}>{f.label}</option>
            ))}
          </select>
        </Field>
        <div>
          <button type="button" class="btn btn-sm" disabled={running || isUnchanged(options)} onClick={onReset}>
            Reset
          </button>
        </div>
        <p class="text-xs text-muted">
          The preview shows the first image; the same changes apply to every image. Pictures are saved in their own
          format. JPG and WebP are saved again at high quality, so the file size can change slightly.
        </p>
      </OptionsPanel>
    </>
  );
}
