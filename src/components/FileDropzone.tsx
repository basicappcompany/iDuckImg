import { useEffect, useRef, useState } from 'preact/hooks';
import { partitionFiles } from '../lib/files';
import { EXTRA_ACCEPTS, EXTRA_LABELS, detectExtraFormat, takesPictures } from '../lib/extra-formats';
import { normalizeInput } from '../tools/shared/normalize';

interface Props {
  /** MIME types or extensions, e.g. ['image/jpeg', '.heic']. */
  accepts: readonly string[];
  onFiles: (files: File[]) => void;
  multiple?: boolean;
  disabled?: boolean;
}

/** Drop, click, paste (Ctrl/Cmd+V) or take a photo. Keyboard accessible. */
export default function FileDropzone({ accepts, onFiles, multiple = true, disabled = false }: Props) {
  const [dragging, setDragging] = useState(false);
  const [rejected, setRejected] = useState<string[]>([]);
  const [problems, setProblems] = useState<string[]>([]);
  const [converting, setConverting] = useState(false);
  // Tools that take ordinary pictures also take BMP, GIF, SVG and AVIF: those are turned into a PNG here.
  const withExtras = takesPictures(accepts);
  const allowed = withExtras ? [...accepts, ...EXTRA_ACCEPTS] : accepts;
  const galleryRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const handle = (list: FileList | readonly File[] | null | undefined) => {
    if (disabled || !list || list.length === 0) return;
    const { accepted, rejected: bad } = partitionFiles(Array.from(list), allowed);
    setRejected(bad.map((f) => f.name));
    setProblems([]);
    const chosen = multiple ? accepted : accepted.slice(0, 1);
    if (chosen.length === 0) return;
    // Only tools that take ordinary pictures convert BMP, GIF, SVG and AVIF. Others (Base64) keep the file as it is.
    if (!withExtras || !chosen.some((f) => detectExtraFormat(f))) {
      onFiles(chosen);
      return;
    }
    void convertThenAdd(chosen);
  };

  const convertThenAdd = async (chosen: File[]) => {
    setConverting(true);
    const ready: File[] = [];
    const failed: string[] = [];
    for (const file of chosen) {
      try {
        ready.push(await normalizeInput(file));
      } catch (error) {
        failed.push(`${file.name} ${error instanceof Error ? error.message : 'could not be read'}`);
      }
    }
    setConverting(false);
    setProblems(failed);
    if (ready.length > 0) onFiles(ready);
  };

  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => handle(event.clipboardData?.files);
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  });

  const accept = allowed.join(',');

  return (
    <div>
      <div
        class={`dropzone ${disabled ? 'opacity-50' : ''}`}
        data-dragging={dragging ? 'true' : 'false'}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handle(e.dataTransfer?.files);
        }}
      >
        <p class="text-xl font-black">Drop {multiple ? 'images' : 'an image'} here</p>
        <p class="mt-1 text-sm text-muted">or paste from your clipboard</p>
        {withExtras && (
          <p class="mt-1 text-xs text-muted">
            Also takes {EXTRA_LABELS}. They are turned into PNG first (a GIF keeps its first frame).
          </p>
        )}
        {converting && (
          <p role="status" class="mt-2 text-sm font-bold">
            Reading your pictures...
          </p>
        )}
        <div class="mt-4 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            disabled={disabled}
            onClick={() => galleryRef.current?.click()}
            class="btn btn-primary btn-lg"
          >
            Choose {multiple ? 'files' : 'file'}
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={() => cameraRef.current?.click()}
            class="btn btn-lg md:hidden"
          >
            Take photo
          </button>
        </div>
        <input
          ref={galleryRef}
          type="file"
          class="sr-only"
          accept={accept}
          multiple={multiple}
          tabIndex={-1}
          aria-label="Choose files"
          onChange={(e) => {
            handle(e.currentTarget.files);
            e.currentTarget.value = '';
          }}
        />
        <input
          ref={cameraRef}
          type="file"
          class="sr-only"
          accept="image/*"
          capture="environment"
          tabIndex={-1}
          aria-label="Take a photo"
          onChange={(e) => {
            handle(e.currentTarget.files);
            e.currentTarget.value = '';
          }}
        />
      </div>
      {problems.length > 0 && (
        <p role="alert" class="mt-2 text-sm font-bold text-danger">
          {problems.join('. ')}.
        </p>
      )}
      {rejected.length > 0 && (
        <p role="alert" class="mt-2 text-sm font-bold text-danger">
          Skipped unsupported {rejected.length === 1 ? 'file' : 'files'}: {rejected.join(', ')}
        </p>
      )}
    </div>
  );
}
