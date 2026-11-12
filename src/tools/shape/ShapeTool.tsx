import { useEffect, useMemo, useState } from 'preact/hooks';
import SimpleToolShell from '../../components/SimpleToolShell';
import OptionsPanel, { Field } from '../../components/OptionsPanel';
import { shapeTool } from './tool';
import { clampRadiusPct, type Shape, type ShapeOptions } from './options';

export default function ShapeTool() {
  const [options, setOptions] = useState<ShapeOptions>(shapeTool.defaultOptions);

  return (
    <SimpleToolShell tool={shapeTool} options={options} canRun runLabel="Make it round">
      {({ files, running, reset }) => {
        const set = (patch: Partial<ShapeOptions>) => {
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
  options: ShapeOptions;
  set: (patch: Partial<ShapeOptions>) => void;
}) {
  const url = useMemo(() => URL.createObjectURL(file), [file]);
  useEffect(() => () => URL.revokeObjectURL(url), [url]);
  // The preview uses the same idea as the result: a circle is a square crop with a 50% radius.
  const radius = options.shape === 'circle' ? '50%' : `${clampRadiusPct(options.radiusPct)}%`;
  const square = options.shape === 'circle';

  return (
    <>
      <div
        class="mx-auto flex h-64 w-64 items-center justify-center rounded-xl border-2 border-dashed border-line bg-soft"
        aria-label="Preview of the first image"
      >
        <img
          src={url}
          alt="Preview"
          class={square ? 'h-56 w-56 object-cover' : 'max-h-56 max-w-56'}
          style={{ borderRadius: radius }}
        />
      </div>

      <OptionsPanel title="Shape">
        <Field id="shape-kind" label="Shape" hint="A circle keeps the middle square of the picture.">
          <select
            id="shape-kind"
            class="input w-full"
            value={options.shape}
            disabled={running}
            onChange={(e) => set({ shape: (e.currentTarget as HTMLSelectElement).value as Shape })}
          >
            <option value="circle">Circle (profile picture)</option>
            <option value="rounded">Rounded corners</option>
          </select>
        </Field>
        {options.shape === 'rounded' && (
          <Field id="shape-radius" label={`Corner size: ${options.radiusPct}% of the shorter side`}>
            <input
              id="shape-radius"
              type="range"
              min={0}
              max={50}
              step={1}
              value={options.radiusPct}
              disabled={running}
              onInput={(e) => set({ radiusPct: Number((e.currentTarget as HTMLInputElement).value) })}
            />
          </Field>
        )}
        <p class="text-xs text-muted">
          The result is a PNG, so the corners are see-through. The preview shows the first image; the same shape is
          applied to every image.
        </p>
      </OptionsPanel>
    </>
  );
}
