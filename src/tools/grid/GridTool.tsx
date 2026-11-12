import { useEffect, useMemo, useState } from 'preact/hooks';
import SimpleToolShell from '../../components/SimpleToolShell';
import OptionsPanel, { Field } from '../../components/OptionsPanel';
import { gridTool } from './tool';
import { MAX_SIDE, clampCount, type GridOptions } from './options';

export default function GridTool() {
  const [options, setOptions] = useState<GridOptions>(gridTool.defaultOptions);
  const tiles = options.rows * options.cols;

  return (
    <SimpleToolShell
      tool={gridTool}
      options={options}
      canRun={tiles >= 2}
      runLabel={`Split into ${tiles} ${tiles === 1 ? 'tile' : 'tiles'}`}
      missing="Choose more than one row or column."
    >
      {({ files, running, reset }) => {
        const set = (patch: Partial<GridOptions>) => {
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
  options: GridOptions;
  set: (patch: Partial<GridOptions>) => void;
}) {
  const url = useMemo(() => URL.createObjectURL(file), [file]);
  useEffect(() => () => URL.revokeObjectURL(url), [url]);
  const rows = clampCount(options.rows);
  const cols = clampCount(options.cols);

  return (
    <>
      <div class="card relative mx-auto inline-block max-w-full overflow-hidden" aria-label="Preview of the first image">
        <img src={url} alt="Preview" class="block max-h-96 max-w-full" />
        {/* Grid lines drawn over the picture: the same cut lines the result uses. */}
        <div
          aria-hidden="true"
          class="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,.9) 2px, transparent 2px), linear-gradient(to bottom, rgba(255,255,255,.9) 2px, transparent 2px)',
            backgroundSize: `${100 / cols}% ${100 / rows}%`,
            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.4)',
            mixBlendMode: 'difference',
          }}
        />
      </div>

      <OptionsPanel title="Grid">
        <div class="grid gap-4 sm:grid-cols-2">
          <Field id="grid-rows" label="Rows" hint={`1 to ${MAX_SIDE}`}>
            <input
              id="grid-rows"
              type="number"
              min={1}
              max={MAX_SIDE}
              class="input w-full"
              value={options.rows}
              disabled={running}
              onInput={(e) => set({ rows: clampCount(Number((e.currentTarget as HTMLInputElement).value)) })}
            />
          </Field>
          <Field id="grid-cols" label="Columns" hint={`1 to ${MAX_SIDE}`}>
            <input
              id="grid-cols"
              type="number"
              min={1}
              max={MAX_SIDE}
              class="input w-full"
              value={options.cols}
              disabled={running}
              onInput={(e) => set({ cols: clampCount(Number((e.currentTarget as HTMLInputElement).value)) })}
            />
          </Field>
        </div>
        <p class="text-xs text-muted">
          Tiles are numbered row by row (r1-c1 is top left). For an Instagram grid, post them from the last tile to the
          first. JPG and WebP tiles are saved at high quality; PNG stays lossless.
        </p>
      </OptionsPanel>
    </>
  );
}
