import { useEffect, useRef, useState } from 'preact/hooks';
import SimpleToolShell from '../../components/SimpleToolShell';
import OptionsPanel, { Field } from '../../components/OptionsPanel';
import { fill, useText } from '../../i18n/ui';
import { TEXT_TEXT } from '../../i18n/tools/text';
import { POSITION_TEXT } from '../../i18n/tools/positions';
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
  const t = useText(TEXT_TEXT);
  const [options, setOptions] = useState<TextOptions>(textTool.defaultOptions);

  return (
    <SimpleToolShell
      tool={textTool}
      options={options}
      canRun={cleanLines(options.text).length > 0}
      runLabel={t.run}
      missing={t.missing}
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
  const t = useText(TEXT_TEXT);
  const pos = useText(POSITION_TEXT);
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
      <div class="card mx-auto overflow-hidden" aria-label={t.previewAria}>
        <canvas ref={canvas} class="block max-h-[28rem] max-w-full" role="img" aria-label={t.canvasAria} />
      </div>

      <OptionsPanel title={t.title}>
        <Field id="tx-text" label={t.text} hint={fill(t.hint, { lines: MAX_LINES, chars: MAX_LINE_LENGTH })}>
          <textarea
            id="tx-text"
            class="input w-full"
            rows={3}
            value={options.text}
            disabled={running}
            placeholder={t.placeholder}
            onInput={(e) => set({ text: (e.currentTarget as HTMLTextAreaElement).value })}
          />
        </Field>

        <div class="grid gap-4 sm:grid-cols-2">
          <Field id="tx-position" label={t.position}>
            <select
              id="tx-position"
              class="input w-full"
              value={options.position}
              disabled={running}
              onChange={(e) => set({ position: (e.currentTarget as HTMLSelectElement).value as TextPosition })}
            >
              {TEXT_POSITIONS.map((p) => (
                <option value={p.id}>{pos[p.id]}</option>
              ))}
            </select>
          </Field>
          <Field id="tx-size" label={fill(t.size, { n: options.sizePct })}>
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
          <Field id="tx-colour" label={t.colour}>
            <select
              id="tx-colour"
              class="input w-full"
              value={options.colour}
              disabled={running}
              onChange={(e) => set({ colour: (e.currentTarget as HTMLSelectElement).value as TextColour })}
            >
              <option value="white">{t.white}</option>
              <option value="black">{t.black}</option>
              <option value="yellow">{t.yellow}</option>
              <option value="red">{t.red}</option>
            </select>
          </Field>
          <Field id="tx-box" label={t.box}>
            <select
              id="tx-box"
              class="input w-full"
              value={options.box}
              disabled={running}
              onChange={(e) => set({ box: (e.currentTarget as HTMLSelectElement).value as TextBox })}
            >
              <option value="dark">{t.dark}</option>
              <option value="light">{t.light}</option>
              <option value="none">{t.none}</option>
            </select>
          </Field>
        </div>
        <p class="text-xs text-muted">
          {t.note}
        </p>
      </OptionsPanel>
    </>
  );
}
