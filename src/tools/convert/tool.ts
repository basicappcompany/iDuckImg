import { WorkerHandle, progressProxy } from '../../engine/worker-handle';
import type { OutputFile, ToolDefinition } from '../../engine/types';
import { detectInputFormat } from '../image-format';
import type { ConvertWorkerApi } from './worker';
import {
  CONVERT_ACCEPTS,
  defaultConvertOptions,
  mimeOfTarget,
  outputName,
  type ConvertOptions,
} from './options';

const handle = new WorkerHandle<ConvertWorkerApi>(
  () => new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' }),
);

export const convertTool: ToolDefinition<ConvertOptions> = {
  id: 'convert',
  accepts: CONVERT_ACCEPTS,
  defaultOptions: defaultConvertOptions,
  async run(file, options, ctx): Promise<OutputFile[]> {
    const input = detectInputFormat(file);
    if (!input) throw new Error('Unsupported image type. Use JPG, PNG, WebP or HEIC.');
    const buffer = await file.arrayBuffer();

    const result = await handle.call(
      (api) => api.convert(buffer, input, options, progressProxy(ctx.onProgress)),
      ctx.signal,
    );

    return [
      {
        name: outputName(file.name, options.target),
        blob: new Blob([result], { type: mimeOfTarget(options.target) }),
      },
    ];
  },
};
