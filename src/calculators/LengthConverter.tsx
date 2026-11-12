import { useState } from 'preact/hooks';
import OptionsPanel, { Field } from '../components/OptionsPanel';
import {
  DEFAULT_DPI,
  DPI_CHOICES,
  PAPER_SIZES,
  UNITS,
  clampDpi,
  convertLength,
  formatNumber,
  paperInPixels,
  type Unit,
} from '../lib/units';

const toNumber = (text: string): number | null => {
  const n = Number(text);
  return text.trim() !== '' && Number.isFinite(n) && n >= 0 ? n : null;
};

export default function LengthConverter() {
  const [value, setValue] = useState('1920');
  const [unit, setUnit] = useState<Unit>('px');
  const [dpiChoice, setDpiChoice] = useState<string>(String(DEFAULT_DPI));
  const [customDpi, setCustomDpi] = useState('');

  const custom = dpiChoice === 'custom';
  const dpiNumber = custom ? toNumber(customDpi) : Number(dpiChoice);
  const dpi = dpiNumber && dpiNumber > 0 ? clampDpi(dpiNumber) : null;
  const n = toNumber(value);
  const result = n !== null && dpi !== null ? convertLength(n, unit, dpi) : null;

  return (
    <div class="grid gap-5">
      <OptionsPanel title="Convert a length">
        <div class="grid gap-4 sm:grid-cols-2">
          <Field id="len-value" label="Length">
            <input
              id="len-value"
              type="number"
              inputMode="decimal"
              min={0}
              step="any"
              class="input w-full"
              value={value}
              onInput={(e) => setValue((e.currentTarget as HTMLInputElement).value)}
            />
          </Field>
          <Field id="len-unit" label="Unit">
            <select id="len-unit" class="input w-full" value={unit} onChange={(e) => setUnit((e.currentTarget as HTMLSelectElement).value as Unit)}>
              {UNITS.map((u) => (
                <option value={u.id}>{u.label}</option>
              ))}
            </select>
          </Field>
        </div>
        <Field
          id="len-dpi"
          label="Resolution (DPI)"
          hint="Pixels per inch. 72 or 96 for screens, 300 for print photos, 600 for fine print."
        >
          <select id="len-dpi" class="input w-full" value={dpiChoice} onChange={(e) => setDpiChoice((e.currentTarget as HTMLSelectElement).value)}>
            {DPI_CHOICES.map((d) => (
              <option value={String(d)}>{d} DPI</option>
            ))}
            <option value="custom">Other</option>
          </select>
        </Field>
        {custom && (
          <Field id="len-dpi-custom" label="Your DPI">
            <input
              id="len-dpi-custom"
              type="number"
              inputMode="decimal"
              min={1}
              class="input w-full"
              value={customDpi}
              onInput={(e) => setCustomDpi((e.currentTarget as HTMLInputElement).value)}
            />
          </Field>
        )}
      </OptionsPanel>

      <section aria-label="Result" class="card p-5">
        {result ? (
          <dl class="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {UNITS.map((u) => (
              <div>
                <dt class="text-sm font-bold text-muted">{u.label}</dt>
                <dd class="text-2xl font-black" data-unit={u.id}>
                  {formatNumber(result[u.id])}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <p role="alert" class="text-sm font-bold text-danger">
            Type a length of 0 or more and a resolution above 0.
          </p>
        )}
      </section>

      {dpi !== null && (
        <section aria-label="Common sizes" class="card p-5">
          <h2 class="text-xl font-black">Common sizes at {formatNumber(dpi)} DPI</h2>
          <table class="mt-3 w-full text-left text-sm">
            <thead>
              <tr class="border-b-2 border-line/30">
                <th class="py-2 pr-3">Size</th>
                <th class="py-2">Pixels</th>
              </tr>
            </thead>
            <tbody>
              {PAPER_SIZES.map((p) => {
                const px = paperInPixels(p, dpi);
                return (
                  <tr class="border-b border-line/15">
                    <td class="py-2 pr-3">{p.name}</td>
                    <td class="py-2 font-bold">
                      {px.width} x {px.height} px
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}
