import { useState } from 'preact/hooks';
import OptionsPanel, { Field } from '../components/OptionsPanel';
import { COMMON_RATIOS, heightFor, nearestCommon, parseRatio, simplifyRatio, widthFor, type Ratio } from '../lib/ratio';

const whole = (text: string): number | null => {
  const n = Number(text);
  return text.trim() !== '' && Number.isInteger(n) && n > 0 ? n : null;
};

export default function RatioCalculator() {
  // Part 1: find the ratio of a size.
  const [w, setW] = useState('1920');
  const [h, setH] = useState('1080');
  const width = whole(w);
  const height = whole(h);
  const simple = width !== null && height !== null ? simplifyRatio(width, height) : null;
  const common = width !== null && height !== null ? nearestCommon(width, height) : null;

  // Part 2: resize to a ratio.
  const [ratioText, setRatioText] = useState('16:9');
  const [newW, setNewW] = useState('1280');
  const [newH, setNewH] = useState('720');
  const ratio: Ratio | null = parseRatio(ratioText);

  const fromWidth = (text: string) => {
    setNewW(text);
    const n = whole(text);
    if (ratio && n !== null) setNewH(String(heightFor(n, ratio)));
  };
  const fromHeight = (text: string) => {
    setNewH(text);
    const n = whole(text);
    if (ratio && n !== null) setNewW(String(widthFor(n, ratio)));
  };
  const pickRatio = (text: string) => {
    setRatioText(text);
    const r = parseRatio(text);
    const n = whole(newW);
    if (r && n !== null) setNewH(String(heightFor(n, r)));
  };

  return (
    <div class="grid gap-5">
      <OptionsPanel title="Find the aspect ratio of a size">
        <div class="grid gap-4 sm:grid-cols-2">
          <Field id="ar-w" label="Width (px)">
            <input id="ar-w" type="number" inputMode="numeric" min={1} class="input w-full" value={w} onInput={(e) => setW((e.currentTarget as HTMLInputElement).value)} />
          </Field>
          <Field id="ar-h" label="Height (px)">
            <input id="ar-h" type="number" inputMode="numeric" min={1} class="input w-full" value={h} onInput={(e) => setH((e.currentTarget as HTMLInputElement).value)} />
          </Field>
        </div>
        <div aria-live="polite" class="card p-4" data-testid="ratio-result">
          {simple ? (
            <>
              <p class="text-3xl font-black">
                {simple.w}:{simple.h}
              </p>
              <p class="mt-1 text-sm text-muted">
                That is {(simple.w / simple.h).toFixed(3).replace(/0+$/, '').replace(/\.$/, '')} wide for every 1 high.
                {common && simple.w + ':' + simple.h !== common.label
                  ? ` It is very close to ${common.label} (${common.use}).`
                  : common
                    ? ` ${common.label} is used for ${common.use}.`
                    : ''}
              </p>
            </>
          ) : (
            <p role="alert" class="text-sm font-bold text-danger">
              Type a whole width and height above 0.
            </p>
          )}
        </div>
      </OptionsPanel>

      <OptionsPanel title="Resize to a ratio">
        <Field id="ar-ratio" label="Ratio" hint="Pick one, or type your own such as 16:9, 4/3 or 1.91:1.">
          <div class="flex flex-wrap gap-2">
            <input
              id="ar-ratio"
              type="text"
              class="input w-32"
              value={ratioText}
              onInput={(e) => pickRatio((e.currentTarget as HTMLInputElement).value)}
            />
            {COMMON_RATIOS.map((r) => (
              <button type="button" class="btn btn-sm" onClick={() => pickRatio(r.label)}>
                {r.label}
              </button>
            ))}
          </div>
        </Field>
        {!ratio && (
          <p role="alert" class="text-sm font-bold text-danger">
            Type a ratio like 16:9.
          </p>
        )}
        <div class="grid gap-4 sm:grid-cols-2">
          <Field id="ar-new-w" label="New width (px)">
            <input id="ar-new-w" type="number" inputMode="numeric" min={1} class="input w-full" value={newW} onInput={(e) => fromWidth((e.currentTarget as HTMLInputElement).value)} />
          </Field>
          <Field id="ar-new-h" label="New height (px)">
            <input id="ar-new-h" type="number" inputMode="numeric" min={1} class="input w-full" value={newH} onInput={(e) => fromHeight((e.currentTarget as HTMLInputElement).value)} />
          </Field>
        </div>
        <p class="text-xs text-muted">Change either side and the other follows, rounded to a whole pixel.</p>
      </OptionsPanel>
    </div>
  );
}
