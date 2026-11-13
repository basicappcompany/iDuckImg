/**
 * The server side of the feedback and request forms. It is plain code with its dependencies passed
 * in, so the unit tests run it without Cloudflare. worker/index.ts wires it to Cloudflare Turnstile
 * and Email Routing. Nothing is stored: a message is checked, emailed once and forgotten.
 */
import {
  FEEDBACK_EMAIL,
  FEEDBACK_KINDS,
  REQUEST_KINDS,
  SITE_URL,
  checkFeedback,
  checkRequest,
  composeFeedback,
  composeRequest,
  type Draft,
  type FeedbackKind,
  type RequestKind,
} from './contact';

/** What the form sends. `website` is a hidden field only a bot fills in. */
export interface ApiPayload {
  mode: 'feedback' | 'request';
  kind: string;
  title?: string;
  message: string;
  email?: string;
  page?: string;
  userAgent?: string;
  token: string;
  website?: string;
}

export interface Mail {
  from: string;
  to: string;
  replyTo: string | null;
  subject: string;
  body: string;
}

export interface Deps {
  /** True when Cloudflare Turnstile accepts the token. */
  verify(token: string, ip: string | null): Promise<boolean>;
  /** Hands the message to the mail service. Throws if it could not be sent. */
  send(mail: Mail): Promise<void>;
  /** Where the message is delivered (set as a secret, so it is not in the code). */
  to: string;
}

export const MAX_BODY_BYTES = 12_000;
const ALLOWED_ORIGINS = new Set([SITE_URL, 'https://www.iduckimg.com']);

const json = (status: number, body: { ok: boolean; error?: string }): Response =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

const text = (v: unknown, max: number): string => (typeof v === 'string' ? v.slice(0, max) : '');

/** Reads the request body into a payload, or null if it is not one. */
export function parsePayload(raw: unknown): ApiPayload | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const r = raw as Record<string, unknown>;
  if (r.mode !== 'feedback' && r.mode !== 'request') return null;
  return {
    mode: r.mode,
    kind: text(r.kind, 20),
    title: text(r.title, 120),
    message: text(r.message, 4000),
    email: text(r.email, 200),
    page: text(r.page, 300),
    userAgent: text(r.userAgent, 300),
    token: text(r.token, 2048),
    website: text(r.website, 200),
  };
}

/** The problem with a payload (in words for the visitor), or null if it can be sent. */
export function validate(p: ApiPayload): string | null {
  const email = p.email ?? '';
  if (p.mode === 'request') {
    if (!REQUEST_KINDS.some((k) => k.id === p.kind)) return 'Choose what kind of request it is.';
    return checkRequest(p.title ?? '', p.message, email);
  }
  if (!FEEDBACK_KINDS.some((k) => k.id === p.kind)) return 'Choose what kind of message it is.';
  return checkFeedback(p.message, email);
}

/** Builds the draft the same way the form does, so the email looks the same as the mailto one. */
export function toDraft(p: ApiPayload): Draft {
  return p.mode === 'request'
    ? composeRequest({ kind: p.kind as RequestKind, title: p.title ?? '', details: p.message, email: p.email ?? '' })
    : composeFeedback({ kind: p.kind as FeedbackKind, message: p.message, email: p.email ?? '', page: p.page ?? '', userAgent: p.userAgent ?? '' });
}

export async function handleFeedback(req: Request, deps: Deps): Promise<Response> {
  if (req.method !== 'POST') return json(405, { ok: false, error: 'Use POST.' });
  const origin = req.headers.get('origin');
  if (origin !== null && !ALLOWED_ORIGINS.has(origin)) return json(403, { ok: false, error: 'Not allowed from this site.' });
  if (Number(req.headers.get('content-length') ?? 0) > MAX_BODY_BYTES) return json(413, { ok: false, error: 'That message is too long.' });

  let raw: unknown;
  try {
    const body = await req.text();
    if (body.length > MAX_BODY_BYTES) return json(413, { ok: false, error: 'That message is too long.' });
    raw = JSON.parse(body);
  } catch {
    return json(400, { ok: false, error: 'That did not look like a message.' });
  }
  const p = parsePayload(raw);
  if (!p) return json(400, { ok: false, error: 'That did not look like a message.' });

  // A bot filled the hidden field. Say "sent" so it learns nothing, and send nothing.
  if (p.website) return json(200, { ok: true });

  const problem = validate(p);
  if (problem) return json(400, { ok: false, error: problem });

  const human = await deps.verify(p.token, req.headers.get('cf-connecting-ip'));
  if (!human) return json(403, { ok: false, error: 'The check that you are not a robot failed. Reload the page and try again.' });

  const draft = toDraft(p);
  const replyTo = (p.email ?? '').trim();
  try {
    await deps.send({ from: FEEDBACK_EMAIL, to: deps.to, replyTo: replyTo === '' ? null : replyTo, subject: draft.subject, body: draft.body });
  } catch {
    return json(502, { ok: false, error: 'The message could not be sent right now.' });
  }
  return json(200, { ok: true });
}

// --- Building the raw email -------------------------------------------------------------------

/** A header value with line breaks removed, so nothing a visitor types can add another header. */
const oneLine = (s: string): string => s.replace(/[\r\n]+/g, ' ').trim();

function toBase64(s: string): string {
  const bytes = new TextEncoder().encode(s);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

/** A header value that may hold any character (RFC 2047), or as it is when it is plain ASCII. */
export function encodeHeader(s: string): string {
  const v = oneLine(s);
  return /^[\x20-\x7e]*$/.test(v) ? v : `=?UTF-8?B?${toBase64(v)}?=`;
}

const wrap76 = (s: string): string => s.replace(/.{1,76}/g, '$&\r\n').trimEnd();

/** The full text of an email: plain text, UTF-8, base64 so any language survives. */
export function buildMime(mail: Mail, messageId: string, date: Date): string {
  const headers = [
    `From: iDuckImg <${mail.from}>`,
    `To: ${oneLine(mail.to)}`,
    ...(mail.replyTo ? [`Reply-To: ${oneLine(mail.replyTo)}`] : []),
    `Subject: ${encodeHeader(mail.subject)}`,
    `Date: ${date.toUTCString()}`,
    `Message-ID: <${messageId}@iduckimg.com>`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
  ];
  return `${headers.join('\r\n')}\r\n\r\n${wrap76(toBase64(mail.body))}\r\n`;
}
