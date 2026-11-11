import { describe, expect, it } from 'vitest';
import { runBatch } from '../../src/engine/runner';
import { AbortError, type ToolDefinition } from '../../src/engine/types';

const file = (name: string) => new File(['x'], name);

function tool(
  run: ToolDefinition<{ fail?: string }>['run'],
): ToolDefinition<{ fail?: string }> {
  return { id: 't', accepts: ['image/png'], defaultOptions: {}, run };
}

describe('runBatch', () => {
  it('processes files sequentially and returns outputs', async () => {
    const order: string[] = [];
    const t = tool(async (f) => {
      order.push(`start ${f.name}`);
      await Promise.resolve();
      order.push(`end ${f.name}`);
      return [{ name: f.name, blob: new Blob(['o']) }];
    });
    const results = await runBatch(t, [file('a'), file('b')], {}, new AbortController().signal);
    expect(order).toEqual(['start a', 'end a', 'start b', 'end b']);
    expect(results.map((r) => r.status)).toEqual(['done', 'done']);
    expect(results[1]?.outputs[0]?.name).toBe('b');
  });

  it('keeps going after one file fails', async () => {
    const t = tool(async (f) => {
      if (f.name === 'bad') throw new Error('boom');
      return [{ name: f.name, blob: new Blob(['o']) }];
    });
    const results = await runBatch(t, [file('bad'), file('ok')], {}, new AbortController().signal);
    expect(results[0]).toMatchObject({ status: 'error', error: 'boom' });
    expect(results[1]?.status).toBe('done');
  });

  it('marks the running and remaining files cancelled when aborted', async () => {
    const controller = new AbortController();
    const t = tool(async (f) => {
      if (f.name === 'a') {
        controller.abort();
        throw new AbortError();
      }
      return [];
    });
    const results = await runBatch(t, [file('a'), file('b'), file('c')], {}, controller.signal);
    expect(results.map((r) => r.status)).toEqual(['cancelled', 'cancelled', 'cancelled']);
  });

  it('clamps and forwards progress', async () => {
    const seen: number[] = [];
    const t = tool(async (_f, _o, ctx) => {
      ctx.onProgress(-1);
      ctx.onProgress(0.5);
      ctx.onProgress(7);
      return [];
    });
    await runBatch(t, [file('a')], {}, new AbortController().signal, {
      onFileProgress: (_i, fraction) => seen.push(fraction),
    });
    expect(seen).toEqual([0, 0.5, 1]);
  });
});
