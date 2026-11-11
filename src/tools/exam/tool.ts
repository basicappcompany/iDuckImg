import { WorkerHandle, progressProxy } from '../../engine/worker-handle';
import type { OutputFile, ToolDefinition } from '../../engine/types';
import { HEIC_ACCEPTS, detectInputFormat } from '../image-format';
import type { ExamWorkerApi } from './worker';
import { outputName, type ExamOptions } from './options';

export const EXAM_TOOL_ACCEPTS = ['image/jpeg', 'image/png', 'image/webp', ...HEIC_ACCEPTS] as const;

const handle = new WorkerHandle<ExamWorkerApi>(
  () => new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' }),
);

export const examTool: ToolDefinition<ExamOptions> = {
  id: 'exam-photo',
  accepts: EXAM_TOOL_ACCEPTS,
  defaultOptions: { size: null, fit: 'crop', minKb: null, maxKb: 50, label: 'exam' },
  async run(file, options, ctx): Promise<OutputFile[]> {
    const input = detectInputFormat(file);
    if (!input) throw new Error('Unsupported image type. Use JPG, PNG, WebP or HEIC.');
    const buffer = await file.arrayBuffer();
    const result = await handle.call((api) => api.fit(buffer, input, options, progressProxy(ctx.onProgress)), ctx.signal);
    return [
      {
        name: outputName(file.name, options.label),
        blob: new Blob([result.buffer], { type: 'image/jpeg' }),
        width: result.width,
        height: result.height,
      },
    ];
  },
};
