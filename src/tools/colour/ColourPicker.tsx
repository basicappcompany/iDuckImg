import { useEffect, useRef, useState } from "preact/hooks";
import FileDropzone from "../../components/FileDropzone";
import { copyText } from "../../lib/clipboard";
import {
  formatHsl,
  formatRgb,
  readableText,
  rgbToHex,
  rgbToHsl,
  type Rgb,
} from "../../lib/colour";
import { fill, useUi } from '../../i18n/ui';

/** A very large picture is drawn smaller; picking a colour from it is the same to the eye. */
const MAX_SIDE = 1600;

interface Picked extends Rgb {
  /** 0 to 255. Under 255 the pixel is partly or fully see-through. */
  a: number;
}

const ACCEPTS = ["image/jpeg", "image/png", "image/webp"] as const;

function Value({ label, text }: { label: string; text: string }) {
  const [state, setState] = useState<"" | "yes" | "no">("");
  return (
    <div class="flex items-center justify-between gap-3 border-b border-line/15 py-2">
      <div class="min-w-0">
        <p class="text-xs font-bold uppercase tracking-wide text-muted">
          {label}
        </p>
        <p class="truncate font-mono text-lg font-black" data-value={label}>
          {text}
        </p>
      </div>
      <button
        type="button"
        class="btn btn-sm"
        aria-label={`Copy ${label}`}
        onClick={async () => {
          setState((await copyText(text)) ? "yes" : "no");
          setTimeout(() => setState(""), 1500);
        }}
      >
        {state === "yes" ? "Copied" : state === "no" ? "Not copied" : "Copy"}
      </button>
    </div>
  );
}

export default function ColourPicker() {
  const ui = useUi();
  const [file, setFile] = useState<File | null>(null);
  const [problem, setProblem] = useState("");
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [hover, setHover] = useState<Picked | null>(null);
  const [picked, setPicked] = useState<Picked | null>(null);
  const [history, setHistory] = useState<Picked[]>([]);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setReady(false);
    setHover(null);
    setPicked(null);
    setHistory([]);
    setCursor(null);
    setProblem("");
    if (!file) return;
    let cancelled = false;
    createImageBitmap(file)
      .then((bitmap) => {
        const el = canvas.current;
        const scale = Math.min(
          1,
          MAX_SIDE / Math.max(bitmap.width, bitmap.height),
        );
        if (cancelled || !el) return bitmap.close();
        el.width = Math.max(1, Math.round(bitmap.width * scale));
        el.height = Math.max(1, Math.round(bitmap.height * scale));
        el.getContext("2d", { willReadFrequently: true })?.drawImage(
          bitmap,
          0,
          0,
          el.width,
          el.height,
        );
        bitmap.close();
        setReady(true);
      })
      .catch(() => setProblem("That picture could not be opened."));
    return () => {
      cancelled = true;
    };
  }, [file]);

  const readAt = (x: number, y: number): Picked | null => {
    const el = canvas.current;
    const ctx = el?.getContext("2d", { willReadFrequently: true });
    if (!el || !ctx) return null;
    const cx = Math.min(el.width - 1, Math.max(0, Math.round(x)));
    const cy = Math.min(el.height - 1, Math.max(0, Math.round(y)));
    const [r, g, b, a] = ctx.getImageData(cx, cy, 1, 1).data;
    return { r: r!, g: g!, b: b!, a: a! };
  };

  const toCanvas = (e: PointerEvent) => {
    const el = canvas.current!;
    const box = el.getBoundingClientRect();
    return {
      x: ((e.clientX - box.left) / box.width) * el.width,
      y: ((e.clientY - box.top) / box.height) * el.height,
    };
  };

  const pick = (colour: Picked | null) => {
    if (!colour) return;
    setPicked(colour);
    setHistory((h) =>
      [
        colour,
        ...h.filter(
          (c) => rgbToHex(c) !== rgbToHex(colour) || c.a !== colour.a,
        ),
      ].slice(0, 10),
    );
  };

  const onKey = (e: KeyboardEvent) => {
    const el = canvas.current;
    if (!el) return;
    const step = e.shiftKey ? 10 : 1;
    const at = cursor ?? {
      x: Math.floor(el.width / 2),
      y: Math.floor(el.height / 2),
    };
    const next = { ...at };
    if (e.key === "ArrowLeft") next.x -= step;
    else if (e.key === "ArrowRight") next.x += step;
    else if (e.key === "ArrowUp") next.y -= step;
    else if (e.key === "ArrowDown") next.y += step;
    else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      pick(readAt(at.x, at.y));
      return;
    } else return;
    e.preventDefault();
    next.x = Math.min(el.width - 1, Math.max(0, next.x));
    next.y = Math.min(el.height - 1, Math.max(0, next.y));
    setCursor(next);
    setHover(readAt(next.x, next.y));
  };

  const shown = hover ?? picked;

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
        <div class="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div
            class="card overflow-hidden self-start"
            aria-label="Picture to pick from"
          >
            <canvas
              ref={canvas}
              class="block max-h-[34rem] max-w-full cursor-crosshair"
              style={{ touchAction: "none" }}
              role="img"
              tabIndex={0}
              aria-label="Picture. Click or tap to pick a color. With the keyboard, use the arrow keys to move and Enter to pick."
              data-testid="pick-surface"
              data-ready={ready ? "true" : "false"}
              onPointerMove={(e) =>
                ready && setHover(readAt(toCanvas(e).x, toCanvas(e).y))
              }
              onPointerLeave={() => setHover(null)}
              onPointerDown={(e) => {
                if (!ready) return;
                const p = toCanvas(e);
                setCursor(p);
                pick(readAt(p.x, p.y));
              }}
              onKeyDown={onKey}
            />
          </div>

          <section aria-label="Color" class="card p-5 self-start">
            {shown ? (
              <>
                <div
                  class="grid h-24 place-items-center rounded-lg border-2 border-line text-sm font-black"
                  style={{
                    background: rgbToHex(shown),
                    color: readableText(shown),
                  }}
                  data-testid="swatch"
                >
                  {hover && picked
                    ? "Previewing"
                    : picked
                      ? "Picked"
                      : "Previewing"}
                </div>
                {shown.a < 255 && (
                  <p class="mt-2 text-sm font-bold">
                    This pixel is {shown.a === 0 ? "fully" : "partly"}{" "}
                    see-through ({Math.round((shown.a / 255) * 100)}% solid).
                    The color shown is the color under the see-through part.
                  </p>
                )}
                <div class="mt-2">
                  <Value label="HEX" text={rgbToHex(shown).toUpperCase()} />
                  <Value label="RGB" text={formatRgb(shown)} />
                  <Value label="HSL" text={formatHsl(rgbToHsl(shown))} />
                </div>
                {hover && (
                  <p class="mt-2 text-xs text-muted">
                    Click to pick this color and keep it.
                  </p>
                )}
              </>
            ) : (
              <p class="text-sm text-muted">
                Move over the picture to preview a color, then click to pick
                it.
              </p>
            )}

            {history.length > 0 && (
              <div class="mt-4">
                <p class="text-xs font-bold uppercase tracking-wide text-muted">
                  Picked colors
                </p>
                <ul class="mt-2 flex flex-wrap gap-2">
                  {history.map((c) => (
                    <li>
                      <button
                        type="button"
                        class="h-9 w-9 rounded-lg border-2 border-line"
                        style={{ background: rgbToHex(c) }}
                        aria-label={`Show ${rgbToHex(c).toUpperCase()}`}
                        title={rgbToHex(c).toUpperCase()}
                        onClick={() => {
                          setHover(null);
                          setPicked(c);
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
