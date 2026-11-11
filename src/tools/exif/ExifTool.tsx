import { useState } from 'preact/hooks';
import FileDropzone from '../../components/FileDropzone';
import ProgressBar from '../../components/ProgressBar';
import DownloadPanel from '../../components/DownloadPanel';
import { useToolRunner } from '../../engine/useToolRunner';
import { exifTool } from './tool';

export default function ExifTool() {
  const [files, setFiles] = useState<File[]>([]);
  const runner = useToolRunner(exifTool);
  const running = runner.state === 'running';

  const done = runner.results.filter((r) => r.status === 'done' || r.status === 'error').length;
  const runningIndex = runner.results.findIndex((r) => r.status === 'running');
  const overall =
    runner.results.length === 0
      ? 0
      : (done + (runningIndex >= 0 ? (runner.progress[runningIndex] ?? 0) : 0)) / runner.results.length;

  const addFiles = (added: File[]) => {
    runner.reset();
    setFiles((prev) => [...prev, ...added]);
  };

  return (
    <div class="grid gap-5">
      <FileDropzone accepts={exifTool.accepts} onFiles={addFiles} disabled={running} />

      {files.length > 0 && (
        <>
          <p class="text-sm">
            {files.length} {files.length === 1 ? 'image' : 'images'} selected.{' '}
            <button
              type="button"
              class="font-medium text-pond-600 underline"
              disabled={running}
              onClick={() => {
                runner.reset();
                setFiles([]);
              }}
            >
              Clear
            </button>
          </p>

          <div class="rounded-2xl bg-white p-5 text-sm shadow-sm">
            <p class="font-semibold">What happens</p>
            <ul class="mt-2 list-disc pl-5">
              <li>Removed: camera and phone details, date and time, GPS location, XMP, IPTC and comments.</li>
              <li>
                The picture is not recompressed, so quality and size stay the same. The exception is a JPG that
                is stored sideways and relies on a rotation tag: it is saved again so it stays upright.
              </li>
            </ul>
          </div>

          <div class="flex gap-3">
            <button
              type="button"
              disabled={running}
              onClick={() => runner.run(files, exifTool.defaultOptions)}
              class="rounded-lg bg-pond-600 px-6 py-3 font-semibold text-white hover:bg-pond-900 disabled:opacity-60"
            >
              {running ? 'Removing...' : 'Remove metadata'}
            </button>
            {running && (
              <button
                type="button"
                onClick={runner.cancel}
                class="rounded-lg border border-pond-600 px-6 py-3 font-semibold text-pond-600"
              >
                Cancel
              </button>
            )}
          </div>
        </>
      )}

      {running && <ProgressBar value={overall} label="Removing metadata" />}
      {runner.state !== 'idle' && <DownloadPanel inputs={files} results={runner.results} />}
    </div>
  );
}
