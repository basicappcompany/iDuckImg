import { useEffect, useRef, useState } from 'preact/hooks';
import SimpleToolShell from '../../components/SimpleToolShell';
import OptionsPanel, { Field } from '../../components/OptionsPanel';
import { borderTool } from './tool';
import { drawFramed } from './draw';
import { MAX_PCT, MIN_PCT, SWATCHES, TRANSPARENT, borderedSize, clampPct, parseHex, type BorderOptions } from './options';

const PREVIEW_WIDTH = 520;

export default function BorderTool() {
  const [options, setOptions] = useState<BorderOptions>(borderTool.defaultOptions);

  return (
    <SimpleToolShell tool={borderTool} options={options} canRun runLabel="Add border">
      {({ files, running, reset }) => {
        const set = (patch: Partial<BorderOptions>) => {
          reset();
          setOptions((prev) => ({ ...prev, ...patch }));
        };
        return <Panels file={files[0]!} running={running} options={options} set={set} />;
      }}
    </SimpleToolShell>
  );
}

function Panels({
  file,
  running,
  options,
  set,
}: {
  file: File;
  running: boolean;
  options: BorderOptions;
  set: (patch: Partial<BorderOptions>) => void;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [bitmap, setBitmap] = useState<ImageBitmap | null>(null);
  const [hexText, setHexText] = useState('');
  const hexBad = hexText.trim() !== '' && parseHex(hexText) === null;

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

  // The preview draws with the same drawFramed() as the result, so the border looks the same.
  useEffect(() => {
    const el = canvas.current;
    if (!el || !bitmap) return;
    const scale = Math.min(1, PREVIEW_WIDTH / (bitmap.width * (1 + (2 * options.thicknessPct) / 100)));
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));
    const size = borderedSize(w, h, options.thicknessPct);
    el.width = size.width;
    el.height = size.height;
    const ctx = el.getContext('2d');
    if (!ctx) return;
    drawFramed(ctx, bitmap, w, h, options);
  }, [bitmap, options.thicknessPct, options.colour]);

  const swatch = SWATCHES.find((s) => s.value === options.colour);

  return (
    <>
      <div
        class="card mx-auto overflow-hidden"
        style={{ background: 'repeating-conic-gradient(#ddd 0% 25%, #fff 0% 50%) 50% / 16px 16px' }}
        aria-label="Preview of the first image"
      >
        <canvas ref={canvas} class="block max-h-96 max-w-full" role="img" aria-label="Preview with the border" />
      </div>

      <OptionsPanel title="Border">
        <Field id="bd-thickness" label={`Thickness: ${options.thicknessPct}% of the shorter side`}>
          <input
            id="bd-thickness"
            type="range"
            min={MIN_PCT}
            max={MAX_PCT}
            step={1}
            value={options.thicknessPct}
            disabled={running}
            onInput={(e) => set({ thicknessPct: clampPct(Number((e.currentTarget as HTMLInputElement).value)) })}
          />
        </Field>
        <Field id="bd-colour" label="Colour">
          <select
            id="bd-colour"
            class="input w-full"
            value={swatch ? swatch.value : 'custom'}
            disabled={running}
            onChange={(e) => {
              const v = (e.currentTarget as HTMLSelectElement).value;
              if (v !== 'custom') {
                setHexText('');
                set({ colour: v });
              }
            }}
          >
            {SWATCHES.map((s) => (
              <option value={s.value}>{s.label}</option>
            ))}
            <option value="custom">Other colour (type a code)</option>
          </select>
        </Field>
        <Field id="bd-hex" label="Colour code" hint="For example #1e90ff. Leave empty to use the colour above.">
          <input
            id="bd-hex"
            type="text"
            class="input w-full"
            placeholder="#1e90ff"
            maxLength={7}
            value={hexText}
            disabled={running}
            onInput={(e) => {
              const text = (e.currentTarget as HTMLInputElement).value;
              setHexText(text);
              const hex = parseHex(text);
              if (hex) set({ colour: hex });
            }}
          />
        </Field>
        {hexBad && (
          <p role="alert" class="text-sm font-bold text-danger">
            Use a colour code like #1e90ff or #fa0.
          </p>
        )}
        <p class="text-xs text-muted">
          The border is added around the picture, so the result is a little bigger than the original. A transparent
          border is saved as PNG (a JPG becomes a PNG). The preview shows the first image.
          {options.colour === TRANSPARENT && ' The grey squares in the preview show where it is see-through.'}
        </p>
      </OptionsPanel>
    </>
  );
}
