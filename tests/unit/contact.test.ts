import { describe, expect, it } from 'vitest';
import {
  CONTACT_EMAIL,
  MAILTO_MAX_LENGTH,
  buildMailto,
  checkEmail,
  checkFeedback,
  checkRequest,
  composeFeedback,
  composeRequest,
  plainText,
} from '../../src/lib/contact';

/** Read a mailto link back the way a mail app does. */
function parse(href: string) {
  const url = new URL(href);
  return { to: decodeURIComponent(url.pathname), subject: url.searchParams.get('subject')!, body: url.searchParams.get('body')! };
}

describe('validation', () => {
  it('accepts an empty or normal reply address and rejects junk', () => {
    expect(checkEmail('')).toBeNull();
    expect(checkEmail('  ')).toBeNull();
    expect(checkEmail('me@example.com')).toBeNull();
    expect(checkEmail('me@example')).not.toBeNull();
    expect(checkEmail('not an email')).not.toBeNull();
  });
  it('feedback needs a message', () => {
    expect(checkFeedback('', '')).toMatch(/message/i);
    expect(checkFeedback('   \n ', '')).toMatch(/message/i);
    expect(checkFeedback('It broke', '')).toBeNull();
    expect(checkFeedback('It broke', 'bad')).toMatch(/email/i);
  });
  it('a request needs a title and details', () => {
    expect(checkRequest('', 'x', '')).toMatch(/title/i);
    expect(checkRequest('Idea', '', '')).toMatch(/use it for/i);
    expect(checkRequest('Idea', 'Because', '')).toBeNull();
  });
});

describe('composeFeedback', () => {
  it('names the kind in the subject and adds the page', () => {
    const d = composeFeedback({ kind: 'great', message: ' Loved it ', email: '', page: 'https://iduckimg.com/crop-image/' });
    expect(d.to).toBe(CONTACT_EMAIL);
    expect(d.subject).toBe('iDuckImg feedback: It worked great');
    expect(d.body).toBe('Loved it\n\n---\nPage: https://iduckimg.com/crop-image/');
  });
  it('adds the browser only when something broke, and the reply address only when given', () => {
    const base = { message: 'x', page: 'p', userAgent: 'UA/1' };
    expect(composeFeedback({ ...base, kind: 'broke', email: 'me@example.com' }).body).toContain('Browser: UA/1');
    expect(composeFeedback({ ...base, kind: 'broke', email: 'me@example.com' }).body).toContain('Reply to: me@example.com');
    expect(composeFeedback({ ...base, kind: 'better', email: '' }).body).not.toContain('Browser');
    expect(composeFeedback({ ...base, kind: 'better', email: '' }).body).not.toContain('Reply to');
  });
});

describe('composeRequest', () => {
  it('puts the title in the subject, tidied and capped, and the details in the body', () => {
    const d = composeRequest({ kind: 'new', title: '  Add   a\n watermark ', details: 'I need it', email: '' });
    expect(d.subject).toBe('iDuckImg request: Add a watermark');
    expect(d.body).toBe('I need it\n\n---\nKind: A new tool');
    expect(composeRequest({ kind: 'improve', title: 'x'.repeat(200), details: 'd', email: '' }).subject.length).toBeLessThanOrEqual(
      'iDuckImg request: '.length + 80,
    );
  });
});

describe('buildMailto', () => {
  it('round-trips text with symbols, line breaks and emoji', () => {
    const draft = { to: CONTACT_EMAIL, subject: 'A & B? #1 100% "ok"', body: 'Line 1\nLine 2 & more = <tags> ✓ 🦆 é 日本語\n\n---\nPage: https://x.y/z?a=1&b=2#h' };
    const { href, truncated } = buildMailto(draft);
    expect(truncated).toBe(false);
    expect(href.startsWith(`mailto:${CONTACT_EMAIL}?`)).toBe(true);
    const back = parse(href);
    expect(back.to).toBe(CONTACT_EMAIL);
    expect(back.subject).toBe(draft.subject);
    expect(back.body).toBe(draft.body.replace(/\n/g, '\r\n'));
  });

  it('encodes nothing that would end the link early', () => {
    const { href } = buildMailto({ to: CONTACT_EMAIL, subject: 's', body: 'a b&c=d?e#f\ng' });
    expect(href.slice(href.indexOf('?') + 1)).not.toMatch(/[ #]/);
    expect(href.split('&')).toHaveLength(2); // exactly subject and body
  });

  it('cuts a message that is too long and says so, never leaving a broken character', () => {
    const body = 'word '.repeat(2000) + '🦆'.repeat(500);
    const { href, truncated } = buildMailto({ to: CONTACT_EMAIL, subject: 'long', body });
    expect(truncated).toBe(true);
    expect(href.length).toBeLessThanOrEqual(MAILTO_MAX_LENGTH);
    const back = parse(href);
    expect(back.body).toContain('Use Copy instead'.toLowerCase().replace('use ', 'use ').replace('copy', 'Copy'));
    expect(() => decodeURIComponent(href)).not.toThrow(); // no half-cut emoji
    expect(back.body.startsWith('word word')).toBe(true);
  });

  it('keeps a message that just fits', () => {
    const body = 'a'.repeat(1500);
    expect(buildMailto({ to: CONTACT_EMAIL, subject: 's', body }).truncated).toBe(false);
  });

  it('handles a message made only of characters that expand when encoded', () => {
    const { href, truncated } = buildMailto({ to: CONTACT_EMAIL, subject: 's', body: '日'.repeat(2000) });
    expect(truncated).toBe(true);
    expect(href.length).toBeLessThanOrEqual(MAILTO_MAX_LENGTH);
  });
});

describe('plainText', () => {
  it('shows the address, subject and body, ready to paste into an email', () => {
    expect(plainText({ to: 'a@b.co', subject: 'S', body: 'B' })).toBe('To: a@b.co\nSubject: S\n\nB');
  });
});
