import type { ComponentChildren } from 'preact';

interface PanelProps {
  title?: string;
  children: ComponentChildren;
}

/** Groups a tool's controls. Children are usually <Field>s. */
export function OptionsPanel({ title = 'Options', children }: PanelProps) {
  return (
    <fieldset class="rounded-2xl bg-white p-5 shadow-sm">
      <legend class="px-2 font-semibold">{title}</legend>
      <div class="grid gap-4">{children}</div>
    </fieldset>
  );
}

interface FieldProps {
  id: string;
  label: string;
  hint?: string;
  children: ComponentChildren;
}

/** A labelled control. Give the inner input the same `id`. */
export function Field({ id, label, hint, children }: FieldProps) {
  return (
    <div class="grid gap-1">
      <label for={id} class="text-sm font-medium">
        {label}
      </label>
      {children}
      {hint && <p class="text-xs text-pond-900/70">{hint}</p>}
    </div>
  );
}

export default OptionsPanel;
