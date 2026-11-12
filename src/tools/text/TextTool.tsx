import { useEffect, useRef, useState } from 'preact/hooks';
import SimpleToolShell from '../../components/SimpleToolShell';
import OptionsPanel, { Field } from '../../components/OptionsPanel';
import { textTool } from './tool';
import { drawText } from './draw';
import {
  MAX_LINES,
  MAX_LINE_LENGTH,
  TEXT_POSITIONS,
  cleanLines,
  type TextBox,
  type TextColour,
  type TextOptions,
  type TextPosition,
} from './options';

const PREVIEW_WIDTH = 560;

export default function TextTool() {
  const [options, setOptions] = useState<TextOptions>(textTool.defaultOptions);

  return (
    <SimpleToolShell
      tool={textTool}
      options={options}
      canRun={cleanLines(options.text).length > 0}
      runLabel="Add text"
      missing="Type the text to continue."
    >
      {({ files, running, reset }) => {
        const set = (patch: Partial<TextOptions>) => {
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
  options: TextOptions;
  set: (patch: Partial<TextOptions>) => void;
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

  useEffect(() => {
    const el = canvas.current;
    if (!el || !bitmap) return;
    const scale = Math.min(1, PREVIEW_WIDTH / bitmap.width);
    el.width = Math.max(1, Math.round(bitmap.width * scale));
    el.height = Math.max(1, Math.round(bitmap.height * scale));
    const ctx = el.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(bitmap, 0, 0, el.width, el.height);
    drawText(ctx, el.width, el.height, options);
  }, [bitmap, options]);

  return (
    <>
      <div class="card mx-auto overflow-hidden" aria-label="Preview of the first image">
        <canvas ref={canvas} class="block max-h-[28rem] max-w-full" role="img" aria-label="Preview with the text" />
      </div>

      <OptionsPanel title="Text">
        <Field id="tx-text" label="Text" hint={`Up to ${MAX_LINES} lines of ${MAX_LINE_LENGTH} characters. Press Enter for a new line.`}>
          <textarea
            id="tx-text"
            class="input w-full"
            rows={3}
            value={options.text}
            disabled={running}
            placeholder="Write something..."
            onInput={(e) => set({ text: (e.currentTarget as HTMLTextAreaElement).value })}
          />
        </Field>

        <div class="grid gap-4 sm:grid-cols-2">
          <Field id="tx-position" label="Position">
            <select
              id="tx-position"
              class="input w-full"
              value={options.position}
              disabled={running}
              onChange={(e) => set({ position: (e.currentTarget as HTMLSelectElement).value as TextPosition })}
            >
              {TEXT_POSITIONS.map((p) => (
                <option value={p.id}>{p.label}</option>
              ))}
            </select>
          </Field>
          <Field id="tx-size" label={`Size: ${options.sizePct}% of the width`}>
            <input
              id="tx-size"
              type="range"
              min={2}
              max={30}
              step={1}
              value={options.sizePct}
              disabled={running}
              onInput={(e) => set({ sizePct: Number((e.currentTarget as HTMLInputElement).value) })}
            />
          </Field>
          <Field id="tx-colour" label="Colour">
            <select
              id="tx-colour"
              class="input w-full"
              value={options.colour}
              disabled={running}
              onChange={(e) => set({ colour: (e.currentTarget as HTMLSelectElement).value as TextColour })}
            >
              <option value="white">White</option>
              <option value="black">Black</option>
              <option value="yellow">Yellow</option>
              <option value="red">Red</option>
            </select>
          </Field>
          <Field id="tx-box" label="Panel behind the text">
            <select
              id="tx-box"
              class="input w-full"
              value={options.box}
              disabled={running}
              onChange={(e) => set({ box: (e.currentTarget as HTMLSelectElement).value as TextBox })}
            >
              <option value="dark">Dark panel</option>
              <option value="light">Light panel</option>
              <option value="none">No panel</option>
            </select>
          </Field>
        </div>
        <p class="text-xs text-muted">
          The preview shows the first image; the same text goes on every image. JPG and WebP are saved again at high
          quality, so the file size can change slightly.
        </p>
      </OptionsPanel>
    </>
  );
}
