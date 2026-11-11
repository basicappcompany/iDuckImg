import { useEffect, useMemo, useState } from 'preact/hooks';
import { dedupeNames, formatBytes, percentChange } from '../lib/files';
import type { FileResult } from '../engine/types';

interface Props {
  /** Original files, same order the batch was submitted in. */
  inputs: readonly File[];
  results: readonly FileResult[];
}

function useObjectUrls(blobs: readonly Blob[]): string[] {
  const urls = useMemo(() => blobs.map((b) => URL.createObjectURL(b)), [blobs]);
  useEffect(() => () => urls.forEach((u) => URL.revokeObjectURL(u)), [urls]);
  return urls;
}

/** Per-file download with before/after sizes, plus one ZIP for batches. */
export default function DownloadPanel({ inputs, results }: Props) {
  const rows = useMemo(
    () =>
      results.flatMap((r) =>
        r.status === 'done' ? r.outputs.map((output) => ({ result: r, output })) : [],
      ),
    [results],
  );
  const urls = useObjectUrls(useMemo(() => rows.map((r) => r.output.blob), [rows]));
  const [zipping, setZipping] = useState(false);
  const failed = results.filter((r) => r.status === 'error');

  const downloadZip = async () => {
    setZipping(true);
    try {
      const { default: JSZip } = await import('jszip');
      const zip = new JSZip();
      const names = dedupeNames(rows.map((r) => r.output.name));
      rows.forEach((r, i) => zip.file(names[i]!, r.output.blob));
      const blob = await zip.generateAsync({ type: 'blob', compression: 'STORE' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'iduckimg-files.zip';
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
    } finally {
      setZipping(false);
    }
  };

  if (rows.length === 0 && failed.length === 0) return null;

  return (
    <section aria-label="Results" class="rounded-2xl bg-white p-5 shadow-sm">
      <ul class="divide-y divide-pond-600/10">
        {rows.map(({ result, output }, i) => {
          const before = inputs[result.index]?.size ?? 0;
          const after = output.blob.size;
          const change = percentChange(before, after);
          return (
            <li key={`${result.index}-${output.name}`} class="flex items-center justify-between gap-3 py-3">
              <div class="min-w-0">
                <p class="truncate font-medium">{output.name}</p>
                <p class="text-sm text-pond-900/70">
                  {formatBytes(before)} to {formatBytes(after)}
                  {before > 0 && ` (${change > 0 ? '+' : ''}${change}%)`}
                </p>
              </div>
              <a
                href={urls[i] ?? ''}
                download={output.name}
                class="shrink-0 rounded-lg bg-pond-600 px-4 py-2 font-semibold text-white hover:bg-pond-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pond-600"
              >
                Download
              </a>
            </li>
          );
        })}
      </ul>
      {failed.length > 0 && (
        <ul role="alert" class="mt-3 text-sm text-red-700">
          {failed.map((r) => (
            <li key={r.index}>
              {r.fileName}: {r.error ?? 'could not be processed'}
            </li>
          ))}
        </ul>
      )}
      {rows.length > 1 && (
        <button
          type="button"
          onClick={downloadZip}
          disabled={zipping}
          class="mt-4 w-full rounded-lg bg-duck-500 px-5 py-3 font-semibold text-pond-900 hover:bg-duck-400 disabled:opacity-60"
        >
          {zipping ? 'Preparing ZIP...' : `Download all (${rows.length}) as ZIP`}
        </button>
      )}
    </section>
  );
}
