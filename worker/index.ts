/**
 * Cloudflare Worker for iduckimg.com/api/feedback. It sits in front of the static site for that one
 * path: it checks Cloudflare Turnstile, then emails the message through Email Routing's send_email
 * binding (free; it can only deliver to a verified address). All the logic is in
 * src/lib/feedback-api.ts, which has the unit tests. Nothing is stored.
 *
 * Secrets (set with `wrangler secret put`, never in the repo): TURNSTILE_SECRET, FORWARD_TO.
 */
import { EmailMessage } from 'cloudflare:email';
import { buildMime, handleFeedback, type Deps } from '../src/lib/feedback-api';

interface Env {
  EMAIL: { send(message: EmailMessage): Promise<void> };
  TURNSTILE_SECRET: string;
  FORWARD_TO: string;
}

async function verifyTurnstile(secret: string, token: string, ip: string | null): Promise<boolean> {
  if (token === '') return false;
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
    const out = (await res.json()) as { success?: boolean };
    return out.success === true;
  } catch {
    return false;
  }
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const deps: Deps = {
      to: env.FORWARD_TO,
      verify: (token, ip) => verifyTurnstile(env.TURNSTILE_SECRET, token, ip),
      send: async (mail) => {
        const raw = buildMime(mail, crypto.randomUUID(), new Date());
        await env.EMAIL.send(new EmailMessage(mail.from, mail.to, raw));
      },
    };
    return handleFeedback(req, deps);
  },
};
