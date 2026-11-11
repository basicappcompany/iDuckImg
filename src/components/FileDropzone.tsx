import { useEffect, useRef, useState } from 'preact/hooks';
import { partitionFiles } from '../lib/files';

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
  const galleryRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const handle = (list: FileList | readonly File[] | null | undefined) => {
    if (disabled || !list || list.length === 0) return;
    const { accepted, rejected: bad } = partitionFiles(Array.from(list), accepts);
    setRejected(bad.map((f) => f.name));
    const chosen = multiple ? accepted : accepted.slice(0, 1);
    if (chosen.length > 0) onFiles(chosen);
  };

  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => handle(event.clipboardData?.files);
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  });

  const accept = accepts.join(',');

  return (
    <div>
      <div
        class={`rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
          dragging ? 'border-pond-600 bg-duck-400/20' : 'border-pond-600/40 bg-white'
        } ${disabled ? 'opacity-50' : ''}`}
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
        <p class="text-lg font-semibold">Drop {multiple ? 'images' : 'an image'} here</p>
        <p class="mt-1 text-sm text-pond-900/70">or paste from your clipboard</p>
        <div class="mt-4 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            disabled={disabled}
            onClick={() => galleryRef.current?.click()}
            class="rounded-lg bg-pond-600 px-5 py-3 font-semibold text-white hover:bg-pond-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pond-600"
          >
            Choose {multiple ? 'files' : 'file'}
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={() => cameraRef.current?.click()}
            class="rounded-lg border border-pond-600 px-5 py-3 font-semibold text-pond-600 hover:bg-duck-400/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pond-600 md:hidden"
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
      {rejected.length > 0 && (
        <p role="alert" class="mt-2 text-sm text-red-700">
          Skipped unsupported {rejected.length === 1 ? 'file' : 'files'}: {rejected.join(', ')}
        </p>
      )}
    </div>
  );
}
