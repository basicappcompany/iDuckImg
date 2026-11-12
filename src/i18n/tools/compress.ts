/** The words on the Compress tool: its options and run button, in the ten languages (machine translations). */
export interface CompressText {
  title: string;
  /** {n} is the quality number. */
  quality: string;
  qualityHint: string;
  format: string;
  keep: string;
  webp: string;
  /** The run button. The quick answer on the tool page quotes this word. */
  run: string;
  running: string;
}

export const COMPRESS_TEXT: Readonly<Record<string, CompressText>> & { en: CompressText } = {
  en: {
    title: 'Compression',
    quality: 'Quality: {n}',
    qualityHint: 'Lower means a smaller file. 70 to 80 usually looks the same. Applies to JPG and WebP; PNG is always lossless.',
    format: 'Output format',
    keep: 'Keep original format',
    webp: 'Convert to WebP (smaller)',
    run: 'Compress',
    running: 'Compressing...',
  },
  hi: {
    title: 'कंप्रेशन',
    quality: 'क्वालिटी: {n}',
    qualityHint: 'कम का मतलब छोटी फ़ाइल। 70 से 80 अक्सर एक जैसी दिखती है। JPG और WebP पर लागू; PNG हमेशा लॉसलेस रहता है।',
    format: 'आउटपुट फ़ॉर्मैट',
    keep: 'मूल फ़ॉर्मैट रखें',
    webp: 'WebP में बदलें (छोटी फ़ाइल)',
    run: 'कंप्रेस करें',
    running: 'कंप्रेस हो रही है...',
  },
  bn: {
    title: 'কমপ্রেশন',
    quality: 'কোয়ালিটি: {n}',
    qualityHint: 'কম মানে ছোট ফাইল। ৭০ থেকে ৮০ সাধারণত একই রকম দেখায়। JPG ও WebP-তে প্রযোজ্য; PNG সবসময় লসলেস।',
    format: 'আউটপুট ফরম্যাট',
    keep: 'মূল ফরম্যাট রাখুন',
    webp: 'WebP-তে বদলান (ছোট ফাইল)',
    run: 'কমপ্রেস করুন',
    running: 'কমপ্রেস হচ্ছে...',
  },
  'pt-BR': {
    title: 'Compressão',
    quality: 'Qualidade: {n}',
    qualityHint: 'Menor significa arquivo menor. De 70 a 80 geralmente parece igual. Vale para JPG e WebP; PNG é sempre sem perdas.',
    format: 'Formato de saída',
    keep: 'Manter o formato original',
    webp: 'Converter para WebP (menor)',
    run: 'Comprimir',
    running: 'Comprimindo...',
  },
  id: {
    title: 'Kompresi',
    quality: 'Kualitas: {n}',
    qualityHint: 'Lebih rendah berarti file lebih kecil. 70 sampai 80 biasanya terlihat sama. Berlaku untuk JPG dan WebP; PNG selalu tanpa kehilangan kualitas.',
    format: 'Format keluaran',
    keep: 'Pertahankan format asli',
    webp: 'Ubah ke WebP (lebih kecil)',
    run: 'Kompres',
    running: 'Mengompres...',
  },
  ru: {
    title: 'Сжатие',
    quality: 'Качество: {n}',
    qualityHint: 'Меньше значение — меньше файл. 70–80 обычно выглядит так же. Относится к JPG и WebP; PNG всегда без потерь.',
    format: 'Формат результата',
    keep: 'Оставить исходный формат',
    webp: 'Преобразовать в WebP (меньше)',
    run: 'Сжать',
    running: 'Сжимаем...',
  },
  de: {
    title: 'Komprimierung',
    quality: 'Qualität: {n}',
    qualityHint: 'Niedriger bedeutet eine kleinere Datei. 70 bis 80 sieht meist gleich aus. Gilt für JPG und WebP; PNG bleibt immer verlustfrei.',
    format: 'Ausgabeformat',
    keep: 'Originalformat beibehalten',
    webp: 'In WebP umwandeln (kleiner)',
    run: 'Komprimieren',
    running: 'Wird komprimiert...',
  },
  es: {
    title: 'Compresión',
    quality: 'Calidad: {n}',
    qualityHint: 'Menos significa un archivo más pequeño. De 70 a 80 suele verse igual. Se aplica a JPG y WebP; PNG siempre es sin pérdida.',
    format: 'Formato de salida',
    keep: 'Mantener el formato original',
    webp: 'Convertir a WebP (más pequeño)',
    run: 'Comprimir',
    running: 'Comprimiendo...',
  },
  fr: {
    title: 'Compression',
    quality: 'Qualité : {n}',
    qualityHint: 'Plus bas donne un fichier plus petit. 70 à 80 paraît souvent identique. S’applique au JPG et au WebP ; le PNG reste toujours sans perte.',
    format: 'Format de sortie',
    keep: 'Conserver le format d’origine',
    webp: 'Convertir en WebP (plus petit)',
    run: 'Compresser',
    running: 'Compression...',
  },
  tr: {
    title: 'Sıkıştırma',
    quality: 'Kalite: {n}',
    qualityHint: 'Düşük değer daha küçük dosya demektir. 70 ile 80 genellikle aynı görünür. JPG ve WebP için geçerlidir; PNG her zaman kayıpsızdır.',
    format: 'Çıktı biçimi',
    keep: 'Özgün biçimi koru',
    webp: 'WebP’ye çevir (daha küçük)',
    run: 'Sıkıştır',
    running: 'Sıkıştırılıyor...',
  },
};
