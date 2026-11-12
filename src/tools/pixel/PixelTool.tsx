import { useEffect, useRef, useState } from 'preact/hooks';
import SimpleToolShell from '../../components/SimpleToolShell';
import OptionsPanel, { Field } from '../../components/OptionsPanel';
import { pixelTool } from './tool';
import { MAX_BLOCKS, MIN_BLOCKS, blockSize, clampBlocks, pixelate, type ColourSteps, type PixelOptions } from './options';

const PREVIEW_WIDTH = 480;

export default function PixelTool() {
  const [options, setOptions] = useState<PixelOptions>(pixelTool.defaultOptions);

  return (
    <SimpleToolShell tool={pixelTool} options={options} canRun runLabel="Make pixel art">
      {({ files, running, reset }) => {
        const set = (patch: Partial<PixelOptions>) => {
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
  options: PixelOptions;
  set: (patch: Partial<PixelOptions>) => void;
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

  // The preview runs the very same pixelate() as the result, on a smaller copy of the picture.
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
    const data = pixelate(src, blockSize(w, options.blocks), options.colours);
    ctx.putImageData(new ImageData(data, w, h), 0, 0);
  }, [bitmap, options.blocks, options.colours]);

  return (
    <>
      <div class="card mx-auto overflow-hidden" aria-label="Preview of the first image">
        <canvas ref={canvas} class="block max-h-96 max-w-full" role="img" aria-label="Pixel art preview" />
      </div>

      <OptionsPanel title="Pixel art">
        <Field id="px-blocks" label={`Big pixels across: ${options.blocks}`} hint="Fewer is chunkier.">
          <input
            id="px-blocks"
            type="range"
            min={MIN_BLOCKS}
            max={MAX_BLOCKS}
            step={2}
            value={options.blocks}
            disabled={running}
            onInput={(e) => set({ blocks: clampBlocks(Number((e.currentTarget as HTMLInputElement).value)) })}
          />
        </Field>
        <Field id="px-colours" label="Colors">
          <select
            id="px-colours"
            class="input w-full"
            value={options.colours}
            disabled={running}
            onChange={(e) => set({ colours: (e.currentTarget as HTMLSelectElement).value as ColourSteps })}
          >
            <option value="original">Keep the original colors</option>
            <option value="retro">Retro (6 shades of each color)</option>
            <option value="few">Very few colors (3 shades of each)</option>
          </select>
        </Field>
        <p class="text-xs text-muted">
          The result is a PNG at the same size as your picture, so the edges stay sharp. The preview shows the first image.
        </p>
      </OptionsPanel>
    </>
  );
}
