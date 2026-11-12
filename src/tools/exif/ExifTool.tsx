import { useState } from 'preact/hooks';
import FileDropzone from '../../components/FileDropzone';
import ProgressBar from '../../components/ProgressBar';
import DownloadPanel from '../../components/DownloadPanel';
import { useToolRunner } from '../../engine/useToolRunner';
import { exifTool } from './tool';
import { fill, useUi } from '../../i18n/ui';

export default function ExifTool() {
  const ui = useUi();
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
            {fill(files.length === 1 ? ui.selectedOne : ui.selectedMany, { n: files.length })}{' '}
            <button
              type="button"
              class="link"
              disabled={running}
              onClick={() => {
                runner.reset();
                setFiles([]);
              }}
            >
              {ui.clear}
            </button>
          </p>

          <div class="card p-5 text-sm">
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
              class="btn btn-primary btn-lg"
            >
              {running ? 'Removing...' : 'Remove metadata'}
            </button>
            {running && (
              <button
                type="button"
                onClick={runner.cancel}
                class="btn btn-lg"
              >
                {ui.cancel}
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
