import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import Chips from './Chips';
import { Field } from './OptionsPanel';
import { copyText } from '../lib/clipboard';
import {
  FEEDBACK_API,
  FEEDBACK_EMAIL,
  TURNSTILE_SITE_KEY,
  FEEDBACK_KINDS,
  REQUEST_KINDS,
  buildMailto,
  checkFeedback,
  checkRequest,
  composeFeedback,
  composeRequest,
  plainText,
  type FeedbackKind,
  type RequestKind,
} from '../lib/contact';

type Props = { mode: 'feedback' } | { mode: 'request' };

interface TurnstileApi {
  render(el: HTMLElement, options: Record<string, unknown>): string;
  reset(id?: string): void;
  remove(id: string): void;
}
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

/**
 * Feedback and feature requests. With a Turnstile key set, "Send" posts the message to
 * /api/feedback, which emails it; if that fails the visitor can still open their own mail app
 * with the message ready or copy it. Without a key, only those two ways are offered.
 */
export default function FeedbackForm(props: Props) {
  const isRequest = props.mode === 'request';
  const [feedbackKind, setFeedbackKind] = useState<FeedbackKind>('better');
  const [requestKind, setRequestKind] = useState<RequestKind>('new');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{ kind: 'info' | 'error'; text: string } | null>(null);
  const [touched, setTouched] = useState(false);
  const auto = TURNSTILE_SITE_KEY !== '';
  const [token, setToken] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [website, setWebsite] = useState('');
  const widget = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  useEffect(() => {
    if (!auto || !widget.current) return;
    const el = widget.current;
    const render = () => {
      if (!window.turnstile || widgetId.current !== null) return;
      widgetId.current = window.turnstile.render(el, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (t: string) => setToken(t),
        'expired-callback': () => setToken(''),
        'error-callback': () => setToken(''),
      });
    };
    if (window.turnstile) render();
    else {
      const s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      s.async = true;
      s.onload = render;
      document.head.append(s);
    }
    return () => {
      if (widgetId.current !== null) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [auto]);

  const problem = isRequest ? checkRequest(title, message, email) : checkFeedback(message, email);

  const draft = useMemo(() => {
    const page = typeof location === 'undefined' ? '' : `${location.origin}${location.pathname}`;
    const userAgent = typeof navigator === 'undefined' ? '' : navigator.userAgent;
    return isRequest
      ? composeRequest({ kind: requestKind, title, details: message, email })
      : composeFeedback({ kind: feedbackKind, message, email, page, userAgent });
  }, [isRequest, requestKind, feedbackKind, title, message, email]);

  const mail = useMemo(() => buildMailto(draft), [draft]);

  const send = (e: MouseEvent) => {
    setTouched(true);
    if (problem) {
      e.preventDefault();
      setStatus({ kind: 'error', text: problem });
      return;
    }
    setStatus({
      kind: 'info',
      text: mail.truncated
        ? `Your email app should open, but this message is long so it was shortened there. Use "Copy instead" to send the full text to ${FEEDBACK_EMAIL}.`
        : `Your email app should open with the message ready. If nothing opened, use "Copy instead" and paste it into an email to ${FEEDBACK_EMAIL}.`,
    });
  };

  const submit = async () => {
    setTouched(true);
    setDone(false);
    if (problem) {
      setStatus({ kind: 'error', text: problem });
      return;
    }
    if (token === '') {
      setStatus({ kind: 'error', text: 'Please wait a moment for the check that you are not a robot, then press send again.' });
      return;
    }
    setBusy(true);
    setStatus({ kind: 'info', text: 'Sending…' });
    const page = typeof location === 'undefined' ? '' : `${location.origin}${location.pathname}`;
    try {
      const res = await fetch(FEEDBACK_API, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          mode: props.mode,
          kind: isRequest ? requestKind : feedbackKind,
          title,
          message,
          email,
          page,
          userAgent: feedbackKind === 'broke' && !isRequest ? navigator.userAgent : '',
          token,
          website,
        }),
      });
      const out = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && out.ok) {
        setDone(true);
        setTitle('');
        setMessage('');
        setStatus({ kind: 'info', text: 'Sent. Thank you! We read every message.' });
      } else {
        setStatus({ kind: 'error', text: `${out.error ?? 'It could not be sent.'} You can still use "Open in my email app" or "Copy instead" below.` });
      }
    } catch {
      setStatus({ kind: 'error', text: 'It could not be sent (are you offline?). You can still use "Open in my email app" or "Copy instead" below.' });
    } finally {
      setBusy(false);
      setToken('');
      if (widgetId.current !== null) window.turnstile?.reset(widgetId.current);
    }
  };

  const copy = async () => {
    setTouched(true);
    if (problem) {
      setStatus({ kind: 'error', text: problem });
      return;
    }
    const ok = await copyText(plainText(draft));
    setStatus(
      ok
        ? { kind: 'info', text: `Copied. Paste it into an email to ${FEEDBACK_EMAIL}.` }
        : { kind: 'error', text: 'Could not copy automatically. Open "See the message" below, select the text and copy it yourself.' },
    );
  };

  return (
    <form class="card grid gap-5 p-5" onSubmit={(e) => e.preventDefault()} noValidate>
      <div class="grid gap-2">
        <span class="text-sm font-bold" id="kind-label">
          {isRequest ? 'What do you want?' : 'What kind of message is it?'}
        </span>
        {isRequest ? (
          <Chips label="What do you want?" options={REQUEST_KINDS} value={requestKind} onChange={setRequestKind} />
        ) : (
          <Chips label="What kind of message is it?" options={FEEDBACK_KINDS} value={feedbackKind} onChange={setFeedbackKind} />
        )}
      </div>

      {isRequest && (
        <Field id="fb-title" label="Short title">
          <input
            id="fb-title"
            class="input"
            maxLength={120}
            placeholder="e.g. Add a watermark tool"
            value={title}
            onInput={(e) => setTitle(e.currentTarget.value)}
          />
        </Field>
      )}

      <Field
        id="fb-message"
        label={isRequest ? 'What would you use it for?' : 'Your message'}
        hint={isRequest ? 'A real example makes it much easier to build the right thing.' : 'The more detail, the easier it is to help.'}
      >
        <textarea
          id="fb-message"
          class="input min-h-32"
          maxLength={4000}
          placeholder={isRequest ? 'I often need to...' : 'Write here...'}
          value={message}
          onInput={(e) => setMessage(e.currentTarget.value)}
        />
      </Field>

      <Field id="fb-email" label="Your email (optional)" hint="Only so we can reply. It goes in the message you send, and nowhere else.">
        <input
          id="fb-email"
          type="email"
          class="input"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onInput={(e) => setEmail(e.currentTarget.value)}
        />
      </Field>

      {auto && (
        <>
          {/* A field only a bot fills in. People never see it or tab to it. */}
          <div aria-hidden="true" style="position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden">
            <label>
              Website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onInput={(e) => setWebsite(e.currentTarget.value)} />
            </label>
          </div>
          <div ref={widget} data-testid="turnstile" />
        </>
      )}

      <div class="flex flex-wrap gap-3">
        {auto && (
          <button type="button" class="btn btn-primary btn-lg" disabled={busy || done} data-testid="send-now" onClick={submit}>
            <span aria-hidden="true">{isRequest ? '💡' : '📮'}</span>
            {busy ? 'Sending…' : isRequest ? 'Send request' : 'Send feedback'}
          </button>
        )}
        <a
          class={auto ? 'btn btn-lg' : 'btn btn-primary btn-lg'}
          href={problem ? '#' : mail.href}
          aria-disabled={problem ? 'true' : 'false'}
          data-testid={auto ? 'send-mail' : 'send'}
          onClick={send}
        >
          <span aria-hidden="true">{auto ? '✉️' : isRequest ? '💡' : '📮'}</span>
          {auto ? 'Open in my email app' : isRequest ? 'Send request' : 'Send feedback'}
        </a>
        <button type="button" class="btn btn-lg" onClick={copy}>
          {isRequest ? 'Copy instead' : 'Copy message instead'}
        </button>
      </div>

      <p role={status?.kind === 'error' ? 'alert' : 'status'} class={`text-sm ${status?.kind === 'error' ? 'font-bold text-danger' : ''}`} data-testid="status">
        {status?.text ?? (touched && problem ? problem : '')}
      </p>

      <details class="text-sm">
        <summary class="cursor-pointer font-bold">See the message</summary>
        <p class="mt-2 text-muted">
          {auto
            ? 'This is what Send will email to us, and what "Open in my email app" fills in. Nothing is sent until you press a button.'
            : 'This is exactly what your email app will open with. Nothing is sent until you press send there.'}
        </p>
        <textarea class="input mt-2 min-h-40 font-mono text-xs" readOnly aria-label="The message that will be sent" value={plainText(draft)} />
      </details>
    </form>
  );
}
