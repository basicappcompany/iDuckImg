/** Where a text, watermark or logo goes: the ten position names, shared by those three tools (machine translations). */
export type PositionText = Record<
  'top-left' | 'top-center' | 'top-right' | 'middle-left' | 'center' | 'middle-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'tile',
  string
>;

const row = (...v: string[]): PositionText => ({
  'top-left': v[0]!,
  'top-center': v[1]!,
  'top-right': v[2]!,
  'middle-left': v[3]!,
  center: v[4]!,
  'middle-right': v[5]!,
  'bottom-left': v[6]!,
  'bottom-center': v[7]!,
  'bottom-right': v[8]!,
  tile: v[9]!,
});

export const POSITION_TEXT: Readonly<Record<string, PositionText>> & { en: PositionText } = {
  en: row('Top left', 'Top centre', 'Top right', 'Middle left', 'Centre', 'Middle right', 'Bottom left', 'Bottom centre', 'Bottom right', 'Repeat across the picture'),
  hi: row('ऊपर बाएँ', 'ऊपर बीच में', 'ऊपर दाएँ', 'बीच में बाएँ', 'बीच में', 'बीच में दाएँ', 'नीचे बाएँ', 'नीचे बीच में', 'नीचे दाएँ', 'पूरी तस्वीर पर दोहराएँ'),
  bn: row('উপরে বাঁয়ে', 'উপরে মাঝখানে', 'উপরে ডানে', 'মাঝে বাঁয়ে', 'মাঝখানে', 'মাঝে ডানে', 'নিচে বাঁয়ে', 'নিচে মাঝখানে', 'নিচে ডানে', 'পুরো ছবিতে বারবার'),
  'pt-BR': row('Superior esquerdo', 'Superior central', 'Superior direito', 'Meio à esquerda', 'Centro', 'Meio à direita', 'Inferior esquerdo', 'Inferior central', 'Inferior direito', 'Repetir pela imagem'),
  id: row('Kiri atas', 'Tengah atas', 'Kanan atas', 'Tengah kiri', 'Tengah', 'Tengah kanan', 'Kiri bawah', 'Tengah bawah', 'Kanan bawah', 'Ulangi di seluruh gambar'),
  ru: row('Вверху слева', 'Вверху по центру', 'Вверху справа', 'Посередине слева', 'По центру', 'Посередине справа', 'Внизу слева', 'Внизу по центру', 'Внизу справа', 'Повторять по всему изображению'),
  de: row('Oben links', 'Oben Mitte', 'Oben rechts', 'Mitte links', 'Mitte', 'Mitte rechts', 'Unten links', 'Unten Mitte', 'Unten rechts', 'Über das ganze Bild wiederholen'),
  es: row('Arriba a la izquierda', 'Arriba al centro', 'Arriba a la derecha', 'Centro a la izquierda', 'Centro', 'Centro a la derecha', 'Abajo a la izquierda', 'Abajo al centro', 'Abajo a la derecha', 'Repetir por toda la imagen'),
  fr: row('En haut à gauche', 'En haut au centre', 'En haut à droite', 'Au milieu à gauche', 'Au centre', 'Au milieu à droite', 'En bas à gauche', 'En bas au centre', 'En bas à droite', 'Répéter sur toute l’image'),
  tr: row('Sol üst', 'Üst orta', 'Sağ üst', 'Orta sol', 'Orta', 'Orta sağ', 'Sol alt', 'Alt orta', 'Sağ alt', 'Görselin her yerinde tekrarla'),
};
