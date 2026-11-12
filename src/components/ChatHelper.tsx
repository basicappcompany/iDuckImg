import { useEffect, useRef, useState } from 'preact/hooks';
import { GREETING, STARTERS, respond, type HelperReply } from '../lib/helper';

interface Message {
  id: number;
  from: 'bot' | 'me';
  text: string;
  reply?: HelperReply;
}

function Duck() {
  return (
    <svg width="34" height="34" viewBox="0 0 64 64" aria-hidden="true" class="shrink-0">
      <g stroke="var(--d-line)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
        <path d="M8 40c0-8 6-12 14-12h6c-2-12 4-20 14-20s14 8 10 16l8 4-8 4c0 12-10 22-24 22-12 0-20-4-20-14z" fill="#ffd23f" />
        <path d="M44 24l11 4-11 4z" fill="#ff8a1f" />
        <path d="M18 40c4 6 14 6 18-2" fill="none" />
      </g>
      <circle cx="43" cy="19" r="2.6" fill="var(--d-ink)" />
    </svg>
  );
}

export default function ChatHelper() {
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: 'bot', text: GREETING }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const next = useRef(1);
  const end = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Only follow the conversation once it has started, so the greeting is not scrolled out of view.
    if (messages.length > 1 || typing) end.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [messages, typing]);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean || typing) return;
    setMessages((m) => [...m, { id: next.current++, from: 'me', text: clean }]);
    setInput('');
    setTyping(true);
    // A short pause so the answer feels like a reply, not a flash.
    timer.current = window.setTimeout(() => {
      const reply = respond(clean);
      setMessages((m) => [...m, { id: next.current++, from: 'bot', text: reply.text, reply }]);
      setTyping(false);
    }, 350);
  };

  return (
    <div class="grid gap-4">
      <div
        class="card grid max-h-[28rem] min-h-72 content-start gap-4 overflow-y-auto p-4"
        role="log"
        aria-live="polite"
        aria-label="Conversation with the helper"
      >
        {messages.map((m) => (
          <div key={m.id} class={`flex items-end gap-2 ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
            {m.from === 'bot' && <Duck />}
            <div
              class={`max-w-[88%] rounded-2xl border-2 border-line p-3 ${
                m.from === 'me' ? 'rounded-br-sm bg-duck font-bold text-duckink' : 'rounded-bl-sm bg-card'
              }`}
              style={{ boxShadow: '3px 3px 0 0 var(--d-shadow)' }}
            >
              <p class="leading-relaxed">{m.text}</p>
              {m.reply?.tools.map((t) => (
                <a key={t.slug} href={t.href} class="card card-link mt-3 block bg-soft p-3">
                  <span class="flex items-center gap-2 font-black">
                    <span aria-hidden="true">{t.emoji}</span>
                    {t.name}
                  </span>
                  <span class="mt-1 block text-sm text-muted">{t.summary}</span>
                  <span class="mt-2 inline-block text-sm font-black underline decoration-2 underline-offset-2">Open it</span>
                </a>
              ))}
              {m.reply && m.reply.links.length > 0 && (
                <div class="mt-3 flex flex-wrap gap-2">
                  {m.reply.links.map((l) => (
                    <a key={l.href} href={l.href} class="btn btn-sm">
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {typing && (
          <div class="flex items-end gap-2" aria-label="The helper is typing">
            <Duck />
            <div class="rounded-2xl rounded-bl-sm border-2 border-line bg-card px-4 py-2 font-black tracking-widest text-muted">• • •</div>
          </div>
        )}
        {messages.length < 3 && (
          <div class="flex flex-wrap gap-2 pl-10" role="group" aria-label="Things you can ask">
            {STARTERS.map((s) => (
              <button key={s} type="button" class="chip" onClick={() => send(s)}>
                {s}
              </button>
            ))}
          </div>
        )}
        <div ref={end} />
      </div>

      <form
        class="flex items-center gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <label class="sr-only" for="helper-input">
          Describe what you want to do
        </label>
        <input
          id="helper-input"
          type="text"
          class="input flex-1 !rounded-full px-5"
          placeholder="e.g. “make my photo under 100 KB”"
          autocomplete="off"
          value={input}
          onInput={(e) => setInput((e.currentTarget as HTMLInputElement).value)}
        />
        <button type="submit" class="btn btn-primary" disabled={!input.trim() || typing}>
          Send
        </button>
      </form>
      <p class="text-center text-sm text-muted">
        The helper matches your words to tools. It is not an AI and never sees your pictures.
      </p>
    </div>
  );
}
