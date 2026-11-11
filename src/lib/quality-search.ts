export interface QualitySearchResult {
  quality: number;
  bytes: number;
  /** True if the result is at or under the target. */
  met: boolean;
}

export interface QualitySearchOptions {
  min?: number;
  max?: number;
  /** Stop after this many encodes. 7 is enough to resolve 5..95 to a single step. */
  maxIterations?: number;
  /** Called after each encode with the fraction of iterations used. */
  onStep?: (fraction: number) => void;
}

/**
 * Binary search for the highest quality whose encoded size is at or under targetBytes.
 * `sizeAt` encodes at a quality and returns the byte size. If even the minimum quality is too
 * big, returns the minimum with met = false so the caller can report it.
 */
export async function findQualityForTarget(
  sizeAt: (quality: number) => Promise<number>,
  targetBytes: number,
  { min = 5, max = 95, maxIterations = 7, onStep }: QualitySearchOptions = {},
): Promise<QualitySearchResult> {
  let lo = min;
  let hi = max;
  let best: QualitySearchResult | null = null;
  let iterations = 0;

  // Best case first: if the top quality already fits, there is nothing to search.
  const topBytes = await sizeAt(hi);
  iterations++;
  onStep?.(iterations / (maxIterations + 1));
  if (topBytes <= targetBytes) return { quality: hi, bytes: topBytes, met: true };

  while (lo <= hi && iterations <= maxIterations) {
    const mid = Math.floor((lo + hi) / 2);
    const bytes = await sizeAt(mid);
    iterations++;
    onStep?.(iterations / (maxIterations + 1));
    if (bytes <= targetBytes) {
      if (!best || mid > best.quality) best = { quality: mid, bytes, met: true };
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  if (best) return best;

  const floorBytes = await sizeAt(min);
  return { quality: min, bytes: floorBytes, met: floorBytes <= targetBytes };
}
