import { describe, expect, it } from 'vitest';
import { FEEDBACK_EMAIL } from '../../src/lib/contact';
import { buildMime, encodeHeader, handleFeedback, parsePayload, validate, type Deps, type Mail } from '../../src/lib/feedback-api';

const good = { mode: 'feedback', kind: 'broke', message: 'The crop box jumps', email: 'me@example.com', page: 'https://iduckimg.com/crop-image/', userAgent: 'UA/1', token: 'tok', website: '' };

function setup(over: Partial<Deps> = {}) {
  const sent: Mail[] = [];
  const deps: Deps = { to: 'inbox@example.test', verify: async (t) => t === 'tok', send: async (m) => void sent.push(m), ...over };
  const call = (body: unknown, init: RequestInit = {}) =>
    handleFeedback(
      new Request('https://iduckimg.com/api/feedback', { method: 'POST', body: typeof body === 'string' ? body : JSON.stringify(body), headers: { origin: 'https://iduckimg.com' }, ...init }),
      deps,
    );
  return { sent, call };
}

describe('handleFeedback', () => {
  it('emails a good message once, to the configured inbox, with the visitor as reply-to', async () => {
    const { sent, call } = setup();
    const res = await call(good);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(sent).toHaveLength(1);
    expect(sent[0]).toMatchObject({ from: FEEDBACK_EMAIL, to: 'inbox@example.test', replyTo: 'me@example.com', subject: 'iDuckImg feedback: Something broke' });
    expect(sent[0]!.body).toContain('The crop box jumps');
    expect(sent[0]!.body).toContain('Page: https://iduckimg.com/crop-image/');
  });

  it('sends a request with its title in the subject', async () => {
    const { sent, call } = setup();
    await call({ mode: 'request', kind: 'new', title: 'Add QR codes', message: 'For flyers', token: 'tok' });
    expect(sent[0]!.subject).toBe('iDuckImg request: Add QR codes');
    expect(sent[0]!.replyTo).toBeNull();
  });

  it('says sent but sends nothing when the hidden field is filled (a bot)', async () => {
    const { sent, call } = setup();
    const res = await call({ ...good, website: 'http://spam' });
    expect(res.status).toBe(200);
    expect(sent).toHaveLength(0);
  });

  it('refuses when the robot check fails', async () => {
    const { sent, call } = setup();
    const res = await call({ ...good, token: 'bad' });
    expect(res.status).toBe(403);
    expect(sent).toHaveLength(0);
  });

  it('checks the message itself, in words the visitor can use', async () => {
    const { sent, call } = setup();
    const res = await call({ ...good, message: '   ' });
    expect(res.status).toBe(400);
    expect(((await res.json()) as { error: string }).error).toBe('Write a message first.');
    expect((await call({ ...good, email: 'nope' })).status).toBe(400);
    expect((await call({ ...good, kind: 'made-up' })).status).toBe(400);
    expect(sent).toHaveLength(0);
  });

  it('rejects other methods, other origins, junk and oversized bodies', async () => {
    const { sent, call } = setup();
    expect((await call(good, { method: 'PUT' })).status).toBe(405);
    expect((await call(good, { headers: { origin: 'https://evil.example' } })).status).toBe(403);
    expect((await call('not json')).status).toBe(400);
    expect((await call('[1,2]')).status).toBe(400);
    expect((await call({ ...good, pad: 'x'.repeat(13_000) })).status).toBe(413);
    expect(sent).toHaveLength(0);
  });

  it('reports a mail failure without leaking details', async () => {
    const { call } = setup({ send: async () => Promise.reject(new Error('secret internals')) });
    const res = await call(good);
    expect(res.status).toBe(502);
    expect(JSON.stringify(await res.json())).not.toContain('secret internals');
  });
});

describe('payload', () => {
  it('cuts fields to their limits and needs a mode', () => {
    expect(parsePayload({ mode: 'other' })).toBeNull();
    expect(parsePayload({ mode: 'feedback', message: 'x'.repeat(9000) })!.message).toHaveLength(4000);
    expect(validate(parsePayload({ ...good })!)).toBeNull();
  });
});

describe('buildMime', () => {
  const mail: Mail = { from: FEEDBACK_EMAIL, to: 'inbox@example.test', replyTo: 'me@example.com', subject: 'iDuckImg feedback: x', body: 'Hello 日本語 🦆\n\nline 2' };
  const decode = (m: string) => {
    const [head, body] = m.split('\r\n\r\n') as [string, string];
    return { head, body: new TextDecoder().decode(Uint8Array.from(atob(body.replace(/\r\n/g, '')), (c) => c.charCodeAt(0))) };
  };

  it('has the headers a mail server needs and a body that survives any language', () => {
    const m = buildMime(mail, 'abc', new Date('2026-11-13T10:00:00Z'));
    const { head, body } = decode(m);
    expect(head).toContain(`From: iDuckImg <${FEEDBACK_EMAIL}>`);
    expect(head).toContain('To: inbox@example.test');
    expect(head).toContain('Reply-To: me@example.com');
    expect(head).toContain('Message-ID: <abc@iduckimg.com>');
    expect(head).toContain('Content-Type: text/plain; charset=UTF-8');
    expect(body).toBe(mail.body);
  });

  it('cannot be given extra headers through a line break', () => {
    const m = buildMime({ ...mail, subject: 'hi\r\nBcc: spy@example.com', replyTo: 'a@b.co\r\nBcc: spy@example.com' }, 'id', new Date(0));
    const head = m.split('\r\n\r\n')[0]!;
    expect(head.split('\r\n').some((l) => l.startsWith('Bcc:'))).toBe(false);
  });

  it('encodes a non-ASCII subject and leaves a plain one alone', () => {
    expect(encodeHeader('plain subject')).toBe('plain subject');
    expect(encodeHeader('日本語').startsWith('=?UTF-8?B?')).toBe(true);
  });
});
