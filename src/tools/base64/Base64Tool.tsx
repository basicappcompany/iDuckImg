import { useEffect, useState } from 'preact/hooks';
import FileDropzone from '../../components/FileDropzone';
import { Field } from '../../components/OptionsPanel';
import { formatBytes } from '../../lib/files';
import { copyText } from '../../lib/clipboard';
import { OUTPUT_STYLES, formatOutput, parseBase64Image, sniffMime, type OutputStyle, type ParsedImage } from '../../lib/base64';

type Mode = 'encode' | 'decode';

/** Any picture, kept exactly as it is: an SVG stays an SVG, so this tool does not convert files on drop. */
const ANY_IMAGE = ['image/*', '.svg', '.avif', '.bmp', '.ico'] as const;

/** Past this many bytes the text gets long enough to be a poor fit for a web page. */
const BIG = 100 * 1024;

export default function Base64Tool() {
  const [mode, setMode] = useState<Mode>('encode');
  return (
    <div class="grid gap-5">
      <div class="flex gap-2" role="group" aria-label="Direction">
        <button type="button" class="chip" aria-pressed={mode === 'encode'} data-active={mode === 'encode'} onClick={() => setMode('encode')}>
          Image to Base64
        </button>
        <button type="button" class="chip" aria-pressed={mode === 'decode'} data-active={mode === 'decode'} onClick={() => setMode('decode')}>
          Base64 to image
        </button>
      </div>
      {mode === 'encode' ? <Encode /> : <Decode />}
    </div>
  );
}

function Encode() {
  const [file, setFile] = useState<File | null>(null);
  const [bytes, setBytes] = useState<Uint8Array | null>(null);
  const [style, setStyle] = useState<OutputStyle>('datauri');
  const [problem, setProblem] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    setBytes(null);
    setProblem('');
    setNote('');
    if (!file) return;
    let cancelled = false;
    file
      .arrayBuffer()
      .then((buf) => {
        if (!cancelled) setBytes(new Uint8Array(buf));
      })
      .catch(() => setProblem('That file could not be read.'));
    return () => {
      cancelled = true;
    };
  }, [file]);

  const mime = file && bytes ? (file.type.startsWith('image/') ? file.type : (sniffMime(bytes) ?? 'application/octet-stream')) : '';
  const text = bytes && mime ? formatOutput(bytes, mime, style) : '';

  const download = () => {
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(file?.name ?? 'image').replace(/\.[^.]+$/, '')}-base64.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div class="grid gap-5">
      <FileDropzone accepts={ANY_IMAGE} multiple={false} onFiles={(f) => setFile(f[0] ?? null)} />
      {file && <p class="text-sm">1 image selected.</p>}
      {problem && (
        <p role="alert" class="text-sm font-bold text-danger">
          {problem}
        </p>
      )}
      {file && bytes && (
        <section aria-label="Base64 result" class="card grid gap-4 p-5">
          <p class="text-sm">
            <strong>{file.name}</strong> is {formatBytes(bytes.length)}. As text it is {formatBytes(text.length)} (Base64 adds about a third).
          </p>
          {bytes.length > BIG && (
            <p class="text-sm font-bold">
              This picture is large, so the text is very long. Base64 suits small images such as icons; for a big photo a normal image file loads faster.
            </p>
          )}
          <Field id="b64-style" label="Format">
            <select id="b64-style" class="input w-full" value={style} onChange={(e) => setStyle((e.currentTarget as HTMLSelectElement).value as OutputStyle)}>
              {OUTPUT_STYLES.map((s) => (
                <option value={s.id}>{s.label}</option>
              ))}
            </select>
          </Field>
          <Field id="b64-out" label="Result">
            <textarea id="b64-out" class="input h-40 w-full font-mono text-xs" readOnly value={text} onFocus={(e) => (e.currentTarget as HTMLTextAreaElement).select()} />
          </Field>
          <div class="flex flex-wrap items-center gap-3">
            <button
              type="button"
              class="btn btn-primary"
              onClick={async () => setNote((await copyText(text)) ? 'Copied.' : 'Could not copy. Select the text and copy it yourself.')}
            >
              Copy
            </button>
            <button type="button" class="btn" onClick={download}>
              Download as .txt
            </button>
            <span role="status" class="text-sm font-bold">
              {note}
            </span>
          </div>
        </section>
      )}
    </div>
  );
}

function Decode() {
  const [text, setText] = useState('');
  const [parsed, setParsed] = useState<ParsedImage | null>(null);
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (text.trim() === '') {
      setParsed(null);
      return;
    }
    setParsed(parseBase64Image(text));
  }, [text]);

  useEffect(() => {
    if (!parsed || !parsed.ok) {
      setUrl('');
      return;
    }
    const u = URL.createObjectURL(new Blob([new Uint8Array(parsed.bytes)], { type: parsed.mime }));
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [parsed]);

  return (
    <div class="grid gap-5">
      <section class="card grid gap-3 p-5" aria-label="Paste Base64">
        <Field id="b64-in" label="Base64 text" hint="A data URI (data:image/png;base64,...) or just the Base64 characters.">
          <textarea
            id="b64-in"
            class="input h-40 w-full font-mono text-xs"
            spellcheck={false}
            value={text}
            onInput={(e) => setText((e.currentTarget as HTMLTextAreaElement).value)}
          />
        </Field>
        {parsed && !parsed.ok && (
          <p role="alert" class="text-sm font-bold text-danger">
            {parsed.error}
          </p>
        )}
      </section>
      {parsed && parsed.ok && url && (
        <section aria-label="Decoded picture" class="card grid justify-items-start gap-3 p-5">
          <div
            class="overflow-hidden rounded-lg border-2 border-line"
            style={{ background: 'repeating-conic-gradient(#ddd 0% 25%, #fff 0% 50%) 50% / 16px 16px' }}
          >
            <img src={url} alt="The decoded picture" class="block max-h-80 max-w-full" />
          </div>
          <p class="text-sm">
            {parsed.mime}, {formatBytes(parsed.bytes.length)}
          </p>
          <a href={url} download={`image.${parsed.ext}`} class="btn btn-primary">
            Download image.{parsed.ext}
          </a>
        </section>
      )}
    </div>
  );
}
