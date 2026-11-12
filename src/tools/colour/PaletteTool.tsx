import { useEffect, useRef, useState } from "preact/hooks";
import FileDropzone from "../../components/FileDropzone";
import OptionsPanel, { Field } from "../../components/OptionsPanel";
import { copyText } from "../../lib/clipboard";
import { readableText } from "../../lib/colour";
import {
  MAX_COLOURS,
  MIN_COLOURS,
  extractPalette,
  paletteAsCss,
  paletteAsList,
  type PaletteColour,
  type PixelData,
} from "../../lib/palette";
import { fill, useUi } from '../../i18n/ui';

/** Colours are found on a small copy of the picture, which is fast and just as accurate to the eye. */
const SAMPLE_SIDE = 200;
const ACCEPTS = ["image/jpeg", "image/png", "image/webp"] as const;

export default function PaletteTool() {
  const ui = useUi();
  const [file, setFile] = useState<File | null>(null);
  const [count, setCount] = useState(6);
  const [pixels, setPixels] = useState<PixelData | null>(null);
  const [problem, setProblem] = useState("");
  const [note, setNote] = useState("");
  const thumb = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setPixels(null);
    setProblem("");
    setNote("");
    if (!file) return;
    let cancelled = false;
    createImageBitmap(file)
      .then((bitmap) => {
        if (cancelled) return bitmap.close();
        const scale = Math.min(
          1,
          SAMPLE_SIDE / Math.max(bitmap.width, bitmap.height),
        );
        const w = Math.max(1, Math.round(bitmap.width * scale));
        const h = Math.max(1, Math.round(bitmap.height * scale));
        const el = document.createElement("canvas");
        el.width = w;
        el.height = h;
        const ctx = el.getContext("2d", { willReadFrequently: true });
        ctx?.drawImage(bitmap, 0, 0, w, h);
        const data = ctx?.getImageData(0, 0, w, h);
        const small = thumb.current;
        if (small && data) {
          small.width = w;
          small.height = h;
          small.getContext("2d")?.putImageData(data, 0, 0);
        }
        bitmap.close();
        if (data) setPixels({ data: data.data, width: w, height: h });
      })
      .catch(() => setProblem("That picture could not be opened."));
    return () => {
      cancelled = true;
    };
  }, [file]);

  const colours: PaletteColour[] = pixels ? extractPalette(pixels, count) : [];

  const copy = async (text: string, message: string) =>
    setNote(
      (await copyText(text))
        ? message
        : "Could not copy. Select the text and copy it yourself.",
    );

  return (
    <div class="grid gap-5">
      <FileDropzone
        accepts={ACCEPTS}
        multiple={false}
        onFiles={(f) => setFile(f[0] ?? null)}
      />
      {file && <p class="text-sm">{fill(ui.selectedOne, { n: 1 })}</p>}
      {problem && (
        <p role="alert" class="text-sm font-bold text-danger">
          {problem}
        </p>
      )}

      {file && (
        <div class="grid gap-5">
          <div class="card mx-auto overflow-hidden" aria-label="Your picture">
            <canvas
              ref={thumb}
              class="block max-h-60 max-w-full"
              role="img"
              aria-label="Your picture"
            />
          </div>

          <OptionsPanel title="Palette">
            <Field id="pal-count" label={`Number of colours: ${count}`}>
              <input
                id="pal-count"
                type="range"
                min={MIN_COLOURS}
                max={MAX_COLOURS}
                step={1}
                value={count}
                onInput={(e) =>
                  setCount(Number((e.currentTarget as HTMLInputElement).value))
                }
              />
            </Field>
          </OptionsPanel>

          {colours.length === 0 && pixels && (
            <p class="text-sm font-bold">
              This picture has no solid colour to read. It may be fully
              see-through.
            </p>
          )}

          {colours.length > 0 && (
            <section aria-label="Palette colours" class="grid gap-4">
              <ul class="card-grid" data-testid="swatches">
                {colours.map((c) => (
                  <li>
                    <button
                      type="button"
                      class="card card-link grid h-full w-full gap-1 p-3 text-left"
                      aria-label={`Copy ${c.hex.toUpperCase()}`}
                      onClick={() =>
                        copy(
                          c.hex.toUpperCase(),
                          `Copied ${c.hex.toUpperCase()}.`,
                        )
                      }
                    >
                      <span
                        class="grid h-16 place-items-center rounded-lg border-2 border-line text-sm font-black"
                        style={{
                          background: c.hex,
                          color: readableText(c.rgb),
                        }}
                      >
                        {Math.round(c.share * 100)}%
                      </span>
                      <span class="font-mono font-black" data-hex>
                        {c.hex.toUpperCase()}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <div class="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  class="btn btn-sm"
                  onClick={() =>
                    copy(
                      paletteAsList(colours).toUpperCase(),
                      "Copied the list.",
                    )
                  }
                >
                  Copy all as a list
                </button>
                <button
                  type="button"
                  class="btn btn-sm"
                  onClick={() => copy(paletteAsCss(colours), "Copied the CSS.")}
                >
                  Copy as CSS variables
                </button>
                <span role="status" class="text-sm font-bold">
                  {note}
                </span>
              </div>
              <p class="text-xs text-muted">
                The percentage is how much of the picture each colour covers.
                Click a colour to copy its code.
              </p>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
