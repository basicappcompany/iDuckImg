/**
 * Pack PNG pictures into one .ico file. Every browser and Windows version that reads ICO today
 * reads PNG data inside it, so each image is stored as-is after a small directory. Pure bytes.
 */
export function buildIco(images: readonly { size: number; png: Uint8Array }[]): Uint8Array {
  const count = images.length;
  const headerSize = 6 + 16 * count;
  const total = headerSize + images.reduce((n, i) => n + i.png.length, 0);
  const out = new Uint8Array(total);
  const view = new DataView(out.buffer);
  view.setUint16(0, 0, true); // reserved
  view.setUint16(2, 1, true); // type 1 = icon
  view.setUint16(4, count, true);
  let offset = headerSize;
  images.forEach((image, i) => {
    const at = 6 + 16 * i;
    out[at] = image.size >= 256 ? 0 : image.size; // width, 0 means 256
    out[at + 1] = image.size >= 256 ? 0 : image.size; // height
    out[at + 2] = 0; // colours in the palette (none)
    out[at + 3] = 0; // reserved
    view.setUint16(at + 4, 1, true); // colour planes
    view.setUint16(at + 6, 32, true); // bits per pixel
    view.setUint32(at + 8, image.png.length, true);
    view.setUint32(at + 12, offset, true);
    out.set(image.png, offset);
    offset += image.png.length;
  });
  return out;
}
