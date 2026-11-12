import { useState } from 'preact/hooks';
import FileDropzone from '../../components/FileDropzone';
import ProgressBar from '../../components/ProgressBar';
import DownloadPanel from '../../components/DownloadPanel';
import { useToolRunner } from '../../engine/useToolRunner';
import { exifTool } from './tool';
import { bare, fill, useText, useUi } from '../../i18n/ui';
import { EXIF_TEXT } from '../../i18n/tools/exif';

export default function ExifTool() {
  const ui = useUi();
  const t = useText(EXIF_TEXT);
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
            <p class="font-semibold">{t.what}</p>
            <ul class="mt-2 list-disc pl-5">
              <li>{t.removed}</li>
              <li>{t.kept}</li>
            </ul>
          </div>

          <div class="flex gap-3">
            <button
              type="button"
              disabled={running}
              onClick={() => runner.run(files, exifTool.defaultOptions)}
              class="btn btn-primary btn-lg"
            >
              {running ? t.running : t.run}
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

      {running && <ProgressBar value={overall} label={bare(t.running)} />}
      {runner.state !== 'idle' && <DownloadPanel inputs={files} results={runner.results} />}
    </div>
  );
}
