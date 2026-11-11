import * as Comlink from 'comlink';
import { AbortError } from './types';

/**
 * Owns one lazily created Web Worker so WASM codecs initialise once and are reused
 * across a batch. Aborting terminates the worker (the only way to stop WASM mid-run);
 * the next call transparently creates a fresh one.
 */
export class WorkerHandle<Api extends object> {
  private worker: Worker | null = null;
  private remote: Comlink.Remote<Api> | null = null;

  constructor(private readonly create: () => Worker) {}

  async call<R>(
    fn: (api: Comlink.Remote<Api>) => Promise<R>,
    signal: AbortSignal,
  ): Promise<R> {
    if (signal.aborted) throw new AbortError();
    if (!this.worker || !this.remote) {
      this.worker = this.create();
      this.remote = Comlink.wrap<Api>(this.worker);
    }
    const remote = this.remote;

    let onAbort: (() => void) | undefined;
    const aborted = new Promise<never>((_, reject) => {
      onAbort = () => {
        this.terminate();
        reject(new AbortError());
      };
      signal.addEventListener('abort', onAbort, { once: true });
    });

    try {
      return await Promise.race([fn(remote), aborted]);
    } finally {
      if (onAbort) signal.removeEventListener('abort', onAbort);
    }
  }

  terminate(): void {
    this.worker?.terminate();
    this.worker = null;
    this.remote = null;
  }
}

/** Wrap a progress callback so it can be passed into a worker call. */
export function progressProxy(onProgress: (fraction: number) => void) {
  return Comlink.proxy(onProgress);
}
