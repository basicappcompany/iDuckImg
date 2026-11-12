import { useEffect, useRef, useState } from 'preact/hooks';
import SimpleToolShell from '../../components/SimpleToolShell';
import OptionsPanel, { Field } from '../../components/OptionsPanel';
import { copyText } from '../../lib/clipboard';
import { faviconTool } from './tool';
import { HEAD_SNIPPET, fitSquare, willEnlarge, type FaviconFit, type FaviconOptions } from './options';

const PREVIEW_SIZES = [16, 32, 64] as const;

export default function FaviconTool() {
  const [options, setOptions] = useState<FaviconOptions>(faviconTool.defaultOptions);

  return (
    <SimpleToolShell tool={faviconTool} options={options} canRun runLabel="Make favicons" single>
      {({ files, running, reset }) => {
        const set = (patch: Partial<FaviconOptions>) => {
          reset();
          setOptions((prev) => ({ ...prev, ...patch }));
        };
        return <Panels file={files[0]!} running={running} options={options} set={set} />;
      }}
    </SimpleToolShell>
  );
}

function Preview({ bitmap, size, fit }: { bitmap: ImageBitmap; size: number; fit: FaviconFit }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext('2d');
    if (!el || !ctx) return;
    ctx.clearRect(0, 0, size, size);
    ctx.imageSmoothingQuality = 'high';
    const { from, to } = fitSquare(bitmap.width, bitmap.height, size, fit);
    ctx.drawImage(bitmap, from.x, from.y, from.width, from.height, to.x, to.y, to.width, to.height);
  }, [bitmap, size, fit]);
  return (
    <figure class="grid justify-items-center gap-1">
      <canvas
        ref={canvas}
        width={size}
        height={size}
        role="img"
        aria-label={`Icon at ${size} pixels`}
        style={{ background: 'repeating-conic-gradient(#ddd 0% 25%, #fff 0% 50%) 50% / 8px 8px', border: '2px solid var(--d-line)' }}
      />
      <figcaption class="text-xs text-muted">
        {size} px
      </figcaption>
    </figure>
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
  options: FaviconOptions;
  set: (patch: Partial<FaviconOptions>) => void;
}) {
  const [bitmap, setBitmap] = useState<ImageBitmap | null>(null);
  const [copied, setCopied] = useState<'yes' | 'no' | ''>('');

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

  const copy = async () => setCopied((await copyText(HEAD_SNIPPET)) ? 'yes' : 'no');

  return (
    <>
      {bitmap && (
        <div class="card flex flex-wrap items-end justify-center gap-6 p-5" aria-label="Preview of the icons">
          {PREVIEW_SIZES.map((s) => (
            <Preview bitmap={bitmap} size={s} fit={options.fit} />
          ))}
        </div>
      )}

      <OptionsPanel title="Favicon">
        <Field id="fav-fit" label="If the picture is not square" hint="Icons are square.">
          <select
            id="fav-fit"
            class="input w-full"
            value={options.fit}
            disabled={running}
            onChange={(e) => set({ fit: (e.currentTarget as HTMLSelectElement).value as FaviconFit })}
          >
            <option value="crop">Cut it to a square from the middle</option>
            <option value="pad">Keep all of it, with see-through bars</option>
          </select>
        </Field>
        {bitmap && willEnlarge(bitmap.width, bitmap.height, options.fit) && (
          <p class="text-sm font-bold">
            Your picture is smaller than 512 px, so the biggest icons are enlarged and may look soft. A square picture of
            512 px or more works best.
          </p>
        )}
        <p class="text-xs text-muted">
          You get favicon.ico (16, 32 and 48 px together), favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png
          (180 px) and two Android icons (192 and 512 px). The preview shows the first picture.
        </p>
      </OptionsPanel>

      <section aria-label="Code for your page" class="card p-5">
        <h2 class="text-lg font-black">Add this to the head of your page</h2>
        <p class="mt-1 text-sm text-muted">Put the files in the root folder of your site, then paste these lines.</p>
        <pre class="mt-3 overflow-x-auto rounded-lg border-2 border-line bg-soft p-3 text-xs"><code>{HEAD_SNIPPET}</code></pre>
        <div class="mt-3 flex items-center gap-3">
          <button type="button" class="btn btn-sm" onClick={copy}>
            Copy the code
          </button>
          <span role="status" class="text-sm font-bold">
            {copied === 'yes' ? 'Copied.' : copied === 'no' ? 'Could not copy. Select the text and copy it yourself.' : ''}
          </span>
        </div>
      </section>
    </>
  );
}
