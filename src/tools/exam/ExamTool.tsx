import { useState } from 'preact/hooks';
import FileDropzone from '../../components/FileDropzone';
import OptionsPanel, { Field } from '../../components/OptionsPanel';
import ProgressBar from '../../components/ProgressBar';
import DownloadPanel from '../../components/DownloadPanel';
import { useToolRunner } from '../../engine/useToolRunner';
import { COUNTRY_ORDER, countryName } from '../../lib/country';
import { EXAMS, describeRequirements, type FitMode } from '../../lib/exam-presets';
import { examTool } from './tool';
import { checkOptions, presetOptions, type ExamOptions } from './options';
import { fill, useUi } from '../../i18n/ui';

const inputClass = 'input w-full';
const CUSTOM = 'custom';

function toNumber(value: string): number | null {
  if (value.trim() === '') return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

interface Custom {
  width: number | null;
  height: number | null;
  minKb: number | null;
  maxKb: number | null;
  fit: FitMode;
}

interface Props {
  /** Landing pages open with one exam and document already chosen. */
  initialExam?: string;
  initialDoc?: string;
  /** With initialExam 'custom': the numbers to start the "Other exam" form with (a page for a size or a minimum file size). */
  initialCustom?: Partial<Custom>;
}

export default function ExamTool({ initialExam, initialDoc, initialCustom }: Props = {}) {
  const ui = useUi();
  const start = initialExam === CUSTOM ? undefined : (EXAMS.find((e) => e.id === initialExam) ?? EXAMS[0]);
  const [files, setFiles] = useState<File[]>([]);
  const [examId, setExamId] = useState<string>(start?.id ?? CUSTOM);
  const [docId, setDocId] = useState<string>(start?.documents.find((d) => d.id === initialDoc)?.id ?? start?.documents[0]?.id ?? '');
  const [custom, setCustom] = useState<Custom>({ width: 200, height: 230, minKb: 20, maxKb: 50, fit: 'crop', ...initialCustom });
  const runner = useToolRunner(examTool);
  const running = runner.state === 'running';

  const exam = EXAMS.find((e) => e.id === examId);
  const doc = exam?.documents.find((d) => d.id === docId) ?? exam?.documents[0];

  let options: ExamOptions;
  if (exam && doc) {
    options = presetOptions(exam, doc);
  } else {
    const both = custom.width !== null && custom.height !== null;
    options = {
      size: both ? { width: custom.width!, height: custom.height! } : null,
      fit: custom.fit,
      minKb: custom.minKb,
      maxKb: custom.maxKb ?? 0,
      label: 'exam',
    };
  }
  const problems = exam ? [] : checkOptions(options);

  const done = runner.results.filter((r) => r.status === 'done' || r.status === 'error').length;
  const runningIndex = runner.results.findIndex((r) => r.status === 'running');
  const overall =
    runner.results.length === 0
      ? 0
      : (done + (runningIndex >= 0 ? (runner.progress[runningIndex] ?? 0) : 0)) / runner.results.length;

  const choose = (next: () => void) => {
    runner.reset();
    next();
  };

  return (
    <div class="grid gap-5">
      <OptionsPanel title="Which exam and document?">
        <Field id="exam" label="Exam">
          <select
            id="exam"
            class={inputClass}
            value={examId}
            disabled={running}
            onChange={(e) =>
              choose(() => {
                const id = e.currentTarget.value;
                setExamId(id);
                setDocId(EXAMS.find((x) => x.id === id)?.documents[0]?.id ?? '');
              })
            }
          >
            {COUNTRY_ORDER.map((code) => (
              <optgroup key={code} label={countryName(code)}>
                {EXAMS.filter((x) => x.country === code).map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.name}
                  </option>
                ))}
              </optgroup>
            ))}
            <option value={CUSTOM}>Other exam: enter the size myself</option>
          </select>
        </Field>

        {exam && (
          <Field id="doc" label="Document">
            <select
              id="doc"
              class={inputClass}
              value={doc?.id}
              disabled={running}
              onChange={(e) => choose(() => setDocId(e.currentTarget.value))}
            >
              {exam.documents.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </Field>
        )}
      </OptionsPanel>

      {exam && doc && (
        <section aria-label="Requirements" class="card p-5 text-sm">
          <p class="font-semibold">
            {exam.name}: {doc.name}
          </p>
          <p class="mt-1 text-base">{describeRequirements(doc)}</p>
          {doc.physical && <p class="mt-1">Printed size in the document: {doc.physical}</p>}
          {doc.note && <p class="mt-1">{doc.note}</p>}
          <ul class="mt-3 list-disc pl-5">
            {(exam.notes ?? []).map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <p class="mt-3 text-muted">
            Copied from{' '}
            <a class="link" href={exam.source.url} rel="noopener noreferrer" target="_blank">
              {exam.source.title}
            </a>
            , {exam.source.location}. Exam round: {exam.cycle}. We read it on {exam.source.retrieved}.
          </p>
          <p class="mt-2 font-medium">
            Exam rules change from year to year. Always check the notice for your own exam before you upload.
          </p>
        </section>
      )}

      {!exam && (
        <OptionsPanel title="Your requirements">
          <div class="grid grid-cols-2 gap-4">
            <Field id="cw" label="Width (px)" hint="Leave both empty to keep the picture size.">
              <input
                id="cw"
                type="number"
                min={1}
                class={inputClass}
                value={custom.width ?? ''}
                disabled={running}
                onInput={(e) => setCustom({ ...custom, width: toNumber(e.currentTarget.value) })}
              />
            </Field>
            <Field id="ch" label="Height (px)">
              <input
                id="ch"
                type="number"
                min={1}
                class={inputClass}
                value={custom.height ?? ''}
                disabled={running}
                onInput={(e) => setCustom({ ...custom, height: toNumber(e.currentTarget.value) })}
              />
            </Field>
            <Field id="cmin" label="Minimum size (KB)" hint="Optional.">
              <input
                id="cmin"
                type="number"
                min={1}
                class={inputClass}
                value={custom.minKb ?? ''}
                disabled={running}
                onInput={(e) => setCustom({ ...custom, minKb: toNumber(e.currentTarget.value) })}
              />
            </Field>
            <Field id="cmax" label="Maximum size (KB)">
              <input
                id="cmax"
                type="number"
                min={1}
                class={inputClass}
                value={custom.maxKb ?? ''}
                disabled={running}
                onInput={(e) => setCustom({ ...custom, maxKb: toNumber(e.currentTarget.value) })}
              />
            </Field>
          </div>
          <Field id="cfit" label="If the picture has a different shape">
            <select
              id="cfit"
              class={inputClass}
              value={custom.fit}
              disabled={running}
              onChange={(e) => setCustom({ ...custom, fit: e.currentTarget.value as FitMode })}
            >
              <option value="crop">Cut the edges to fill the size</option>
              <option value="pad">Keep everything, add white bars</option>
              <option value="stretch">Stretch to the size (distorts)</option>
            </select>
          </Field>
          {problems.length > 0 && (
            <p role="alert" class="text-sm text-danger font-bold">
              {problems[0]}
            </p>
          )}
        </OptionsPanel>
      )}

      <FileDropzone
        accepts={examTool.accepts}
        onFiles={(added) => choose(() => setFiles((prev) => [...prev, ...added]))}
        disabled={running}
      />

      {files.length > 0 && (
        <>
          <p class="text-sm">
            {fill(files.length === 1 ? ui.selectedOne : ui.selectedMany, { n: files.length })}{' '}
            <button
              type="button"
              class="link"
              disabled={running}
              onClick={() => choose(() => setFiles([]))}
            >
              {ui.clear}
            </button>
          </p>
          <div class="flex gap-3">
            <button
              type="button"
              disabled={running || problems.length > 0}
              onClick={() => runner.run(files, options)}
              class="btn btn-primary btn-lg"
            >
              {running ? ui.working : 'Make my file'}
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

      {running && <ProgressBar value={overall} label="Working" />}
      {runner.state !== 'idle' && <DownloadPanel inputs={files} results={runner.results} />}
    </div>
  );
}
