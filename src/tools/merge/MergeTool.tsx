import { useEffect, useMemo, useState } from 'preact/hooks';
import FileDropzone from '../../components/FileDropzone';
import OptionsPanel, { Field } from '../../components/OptionsPanel';
import ProgressBar from '../../components/ProgressBar';
import DownloadPanel from '../../components/DownloadPanel';
import { useToolRunner } from '../../engine/useToolRunner';
import { formatBytes } from '../../lib/files';
import { moveItem, removeAt } from '../../lib/list';
import { mergeTool } from './tool';
import { MAX_GAP, MIN_IMAGES, clampGap, type MergeBackground, type MergeDirection, type MergeFormat, type MergeMatch, type MergeOptions } from './options';

export default function MergeTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [options, setOptions] = useState<MergeOptions>(mergeTool.defaultOptions);
  const runner = useToolRunner(mergeTool);
  const running = runner.state === 'running';

  const thumbs = useMemo(() => files.map((f) => URL.createObjectURL(f)), [files]);
  useEffect(() => () => thumbs.forEach((u) => URL.revokeObjectURL(u)), [thumbs]);

  const totalBytes = files.reduce((sum, f) => sum + f.size, 0);
  const update = (next: File[]) => {
    runner.reset();
    setFiles(next);
  };
  const set = (patch: Partial<MergeOptions>) => {
    runner.reset();
    setOptions((prev) => ({ ...prev, ...patch }));
  };
  const enough = files.length >= MIN_IMAGES;
  const lossy = options.format !== 'png';

  return (
    <div class="grid gap-5">
      <FileDropzone accepts={mergeTool.accepts} onFiles={(added) => update([...files, ...added])} disabled={running} />

      {files.length > 0 && (
        <>
          <section aria-label="Pictures to join" class="card p-5">
            <div class="mb-2 flex items-center justify-between">
              <p class="font-semibold">
                {files.length} {files.length === 1 ? 'picture' : 'pictures'} ({formatBytes(totalBytes)})
              </p>
              <button type="button" class="link text-sm" disabled={running} onClick={() => update([])}>
                Clear
              </button>
            </div>
            <ol class="divide-y divide-line/20">
              {files.map((file, i) => (
                <li key={`${file.name}-${file.size}-${i}`} class="flex items-center gap-3 py-2">
                  <span class="w-6 text-sm text-muted">{i + 1}</span>
                  <img src={thumbs[i] ?? ''} alt="" class="h-12 w-12 rounded object-cover" />
                  <span class="min-w-0 flex-1 truncate text-sm" title={file.name}>
                    {file.name}
                  </span>
                  <button type="button" class="btn btn-sm" disabled={running || i === 0} aria-label={`Move ${file.name} up`} onClick={() => update(moveItem(files, i, i - 1))}>
                    Up
                  </button>
                  <button type="button" class="btn btn-sm" disabled={running || i === files.length - 1} aria-label={`Move ${file.name} down`} onClick={() => update(moveItem(files, i, i + 1))}>
                    Down
                  </button>
                  <button type="button" class="btn btn-sm" disabled={running} aria-label={`Remove ${file.name}`} onClick={() => update(removeAt(files, i))}>
                    Remove
                  </button>
                </li>
              ))}
            </ol>
          </section>

          <OptionsPanel title="Join">
            <div class="grid gap-4 sm:grid-cols-2">
              <Field id="mg-direction" label="Arrange">
                <select id="mg-direction" class="input w-full" value={options.direction} disabled={running} onChange={(e) => set({ direction: (e.currentTarget as HTMLSelectElement).value as MergeDirection })}>
                  <option value="row">Side by side (in a row)</option>
                  <option value="column">One under another (in a column)</option>
                </select>
              </Field>
              <Field id="mg-gap" label="Space between" hint={`0 to ${MAX_GAP} pixels`}>
                <input id="mg-gap" type="number" min={0} max={MAX_GAP} class="input w-full" value={options.gap} disabled={running} onInput={(e) => set({ gap: clampGap(Number((e.currentTarget as HTMLInputElement).value)) })} />
              </Field>
              <Field id="mg-match" label="Sizes">
                <select id="mg-match" class="input w-full" value={options.match} disabled={running} onChange={(e) => set({ match: (e.currentTarget as HTMLSelectElement).value as MergeMatch })}>
                  <option value="smallest">Make them all the same height or width</option>
                  <option value="none">Keep each at its own size</option>
                </select>
              </Field>
              <Field id="mg-bg" label="Background">
                <select id="mg-bg" class="input w-full" value={options.background} disabled={running} onChange={(e) => set({ background: (e.currentTarget as HTMLSelectElement).value as MergeBackground })}>
                  <option value="white">White</option>
                  <option value="black">Black</option>
                  <option value="transparent">Transparent (PNG or WebP)</option>
                </select>
              </Field>
              <Field id="mg-format" label="Save as">
                <select id="mg-format" class="input w-full" value={options.format} disabled={running} onChange={(e) => set({ format: (e.currentTarget as HTMLSelectElement).value as MergeFormat })}>
                  <option value="png">PNG (exact)</option>
                  <option value="jpeg">JPG (smaller)</option>
                  <option value="webp">WebP (smaller)</option>
                </select>
              </Field>
            </div>
            <p class="text-xs text-muted">
              Pictures are joined in the order shown; use Up and Down to change it. A transparent background becomes white
              in a JPG.{lossy ? ' JPG and WebP are saved at high quality.' : ''}
            </p>
          </OptionsPanel>

          <div class="flex gap-3">
            <button type="button" disabled={running || !enough} onClick={() => runner.run(files, options)} class="btn btn-primary btn-lg">
              {running ? 'Joining...' : 'Join pictures'}
            </button>
            {running && (
              <button type="button" onClick={runner.cancel} class="btn btn-lg">
                Cancel
              </button>
            )}
          </div>
          {!enough && <p class="text-sm text-muted">Add at least two pictures to join.</p>}
        </>
      )}

      {running && <ProgressBar value={runner.progress[0] ?? 0} label="Joining" />}
      {runner.state !== 'idle' && <DownloadPanel inputs={files} results={runner.results} beforeBytes={totalBytes} />}
    </div>
  );
}
