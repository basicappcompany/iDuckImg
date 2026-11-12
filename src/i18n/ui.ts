import { useEffect, useState } from 'preact/hooks';

/**
 * The words the shared tool controls use: the drop zone, the file count, Clear, Cancel, the progress
 * label and the download panel. Every tool shows these, so translating them translates the part of
 * every tool a visitor sees first. The controls that belong to one tool (its options, its run button)
 * are still English, and the quick answers on each page quote those English button names.
 *
 * This is kept apart from the page dictionaries on purpose: these strings ship to the browser with
 * every tool, so the file stays small and holds nothing else. All nine translations are machine-made.
 */
export interface UiText {
  dropMany: string;
  dropOne: string;
  paste: string;
  /** {formats} is the list of extra formats, such as "BMP, GIF, SVG and AVIF". */
  alsoTakes: string;
  reading: string;
  chooseMany: string;
  chooseOne: string;
  takePhoto: string;
  /** {names} is a comma separated list of file names. */
  skippedOne: string;
  skippedMany: string;
  couldNotRead: string;
  selectedOne: string;
  selectedMany: string;
  clear: string;
  working: string;
  cancel: string;
  download: string;
  /** {n} is the number of files. */
  downloadAll: string;
  preparingZip: string;
  /** {before} and {after} are sizes such as "1.2 MB". */
  sizes: string;
  couldNotProcess: string;
}

const en: UiText = {
  dropMany: 'Drop images here',
  dropOne: 'Drop an image here',
  paste: 'or paste from your clipboard',
  alsoTakes: 'Also takes {formats}. They are turned into PNG first (a GIF keeps its first frame).',
  reading: 'Reading your pictures...',
  chooseMany: 'Choose files',
  chooseOne: 'Choose file',
  takePhoto: 'Take photo',
  skippedOne: 'Skipped unsupported file: {names}',
  skippedMany: 'Skipped unsupported files: {names}',
  couldNotRead: 'could not be read',
  selectedOne: '{n} image selected.',
  selectedMany: '{n} images selected.',
  clear: 'Clear',
  working: 'Working...',
  cancel: 'Cancel',
  download: 'Download',
  downloadAll: 'Download all ({n}) as ZIP',
  preparingZip: 'Preparing ZIP...',
  sizes: '{before} to {after}',
  couldNotProcess: 'could not be processed',
};

const hi: UiText = {
  dropMany: 'इमेज यहाँ छोड़ें',
  dropOne: 'इमेज यहाँ छोड़ें',
  paste: 'या क्लिपबोर्ड से पेस्ट करें',
  alsoTakes: '{formats} भी चलते हैं। इन्हें पहले PNG में बदला जाता है (GIF का पहला फ्रेम रखा जाता है)।',
  reading: 'आपकी तस्वीरें पढ़ी जा रही हैं...',
  chooseMany: 'फ़ाइलें चुनें',
  chooseOne: 'फ़ाइल चुनें',
  takePhoto: 'फ़ोटो लें',
  skippedOne: 'असमर्थित फ़ाइल छोड़ दी गई: {names}',
  skippedMany: 'असमर्थित फ़ाइलें छोड़ दी गईं: {names}',
  couldNotRead: 'पढ़ी नहीं जा सकी',
  selectedOne: 'चुनी गई इमेज: {n}।',
  selectedMany: 'चुनी गई इमेज: {n}।',
  clear: 'हटाएँ',
  working: 'काम चल रहा है...',
  cancel: 'रद्द करें',
  download: 'डाउनलोड',
  downloadAll: 'सभी ({n}) ZIP में डाउनलोड करें',
  preparingZip: 'ZIP तैयार हो रही है...',
  sizes: '{before} → {after}',
  couldNotProcess: 'प्रोसेस नहीं हो सकी',
};

const bn: UiText = {
  dropMany: 'ইমেজ এখানে ছাড়ুন',
  dropOne: 'ইমেজ এখানে ছাড়ুন',
  paste: 'অথবা ক্লিপবোর্ড থেকে পেস্ট করুন',
  alsoTakes: '{formats} ও চলে। এগুলো আগে PNG-তে বদলানো হয় (GIF-এর প্রথম ফ্রেম রাখা হয়)।',
  reading: 'আপনার ছবি পড়া হচ্ছে...',
  chooseMany: 'ফাইল বেছে নিন',
  chooseOne: 'ফাইল বেছে নিন',
  takePhoto: 'ছবি তুলুন',
  skippedOne: 'অসমর্থিত ফাইল বাদ দেওয়া হয়েছে: {names}',
  skippedMany: 'অসমর্থিত ফাইল বাদ দেওয়া হয়েছে: {names}',
  couldNotRead: 'পড়া যায়নি',
  selectedOne: 'বেছে নেওয়া ইমেজ: {n}।',
  selectedMany: 'বেছে নেওয়া ইমেজ: {n}।',
  clear: 'মুছুন',
  working: 'কাজ চলছে...',
  cancel: 'বাতিল',
  download: 'ডাউনলোড',
  downloadAll: 'সব ({n}) ZIP হিসেবে ডাউনলোড করুন',
  preparingZip: 'ZIP তৈরি হচ্ছে...',
  sizes: '{before} → {after}',
  couldNotProcess: 'প্রসেস করা যায়নি',
};

const ptBR: UiText = {
  dropMany: 'Solte as imagens aqui',
  dropOne: 'Solte uma imagem aqui',
  paste: 'ou cole da área de transferência',
  alsoTakes: 'Também aceita {formats}. Eles são convertidos em PNG primeiro (um GIF mantém o primeiro quadro).',
  reading: 'Lendo suas imagens...',
  chooseMany: 'Escolher arquivos',
  chooseOne: 'Escolher arquivo',
  takePhoto: 'Tirar foto',
  skippedOne: 'Arquivo não compatível ignorado: {names}',
  skippedMany: 'Arquivos não compatíveis ignorados: {names}',
  couldNotRead: 'não pôde ser lido',
  selectedOne: '{n} imagem selecionada.',
  selectedMany: '{n} imagens selecionadas.',
  clear: 'Limpar',
  working: 'Trabalhando...',
  cancel: 'Cancelar',
  download: 'Baixar',
  downloadAll: 'Baixar todos ({n}) em ZIP',
  preparingZip: 'Preparando o ZIP...',
  sizes: '{before} → {after}',
  couldNotProcess: 'não pôde ser processado',
};

const id: UiText = {
  dropMany: 'Letakkan gambar di sini',
  dropOne: 'Letakkan gambar di sini',
  paste: 'atau tempel dari clipboard',
  alsoTakes: 'Juga menerima {formats}. Semuanya diubah dulu menjadi PNG (GIF hanya memakai bingkai pertama).',
  reading: 'Membaca gambar Anda...',
  chooseMany: 'Pilih file',
  chooseOne: 'Pilih file',
  takePhoto: 'Ambil foto',
  skippedOne: 'File tidak didukung dilewati: {names}',
  skippedMany: 'File tidak didukung dilewati: {names}',
  couldNotRead: 'tidak bisa dibaca',
  selectedOne: '{n} gambar dipilih.',
  selectedMany: '{n} gambar dipilih.',
  clear: 'Hapus',
  working: 'Sedang bekerja...',
  cancel: 'Batal',
  download: 'Unduh',
  downloadAll: 'Unduh semua ({n}) sebagai ZIP',
  preparingZip: 'Menyiapkan ZIP...',
  sizes: '{before} → {after}',
  couldNotProcess: 'tidak bisa diproses',
};

const ru: UiText = {
  dropMany: 'Перетащите изображения сюда',
  dropOne: 'Перетащите изображение сюда',
  paste: 'или вставьте из буфера обмена',
  alsoTakes: 'Также принимаются {formats}. Сначала они преобразуются в PNG (у GIF берётся первый кадр).',
  reading: 'Читаем ваши изображения...',
  chooseMany: 'Выбрать файлы',
  chooseOne: 'Выбрать файл',
  takePhoto: 'Сделать фото',
  skippedOne: 'Неподдерживаемый файл пропущен: {names}',
  skippedMany: 'Неподдерживаемые файлы пропущены: {names}',
  couldNotRead: 'не удалось прочитать',
  selectedOne: 'Выбрано изображений: {n}.',
  selectedMany: 'Выбрано изображений: {n}.',
  clear: 'Очистить',
  working: 'Идёт работа...',
  cancel: 'Отмена',
  download: 'Скачать',
  downloadAll: 'Скачать всё ({n}) в ZIP',
  preparingZip: 'Готовим ZIP...',
  sizes: '{before} → {after}',
  couldNotProcess: 'не удалось обработать',
};

const de: UiText = {
  dropMany: 'Bilder hier ablegen',
  dropOne: 'Bild hier ablegen',
  paste: 'oder aus der Zwischenablage einfügen',
  alsoTakes: 'Auch {formats} werden angenommen. Sie werden zuerst in PNG umgewandelt (bei GIF bleibt das erste Bild).',
  reading: 'Ihre Bilder werden gelesen...',
  chooseMany: 'Dateien auswählen',
  chooseOne: 'Datei auswählen',
  takePhoto: 'Foto aufnehmen',
  skippedOne: 'Nicht unterstützte Datei übersprungen: {names}',
  skippedMany: 'Nicht unterstützte Dateien übersprungen: {names}',
  couldNotRead: 'konnte nicht gelesen werden',
  selectedOne: '{n} Bild ausgewählt.',
  selectedMany: '{n} Bilder ausgewählt.',
  clear: 'Leeren',
  working: 'Arbeite...',
  cancel: 'Abbrechen',
  download: 'Herunterladen',
  downloadAll: 'Alle ({n}) als ZIP herunterladen',
  preparingZip: 'ZIP wird vorbereitet...',
  sizes: '{before} → {after}',
  couldNotProcess: 'konnte nicht verarbeitet werden',
};

const es: UiText = {
  dropMany: 'Suelta las imágenes aquí',
  dropOne: 'Suelta una imagen aquí',
  paste: 'o pega desde el portapapeles',
  alsoTakes: 'También admite {formats}. Primero se convierten a PNG (un GIF conserva su primer fotograma).',
  reading: 'Leyendo tus imágenes...',
  chooseMany: 'Elegir archivos',
  chooseOne: 'Elegir archivo',
  takePhoto: 'Hacer foto',
  skippedOne: 'Archivo no admitido omitido: {names}',
  skippedMany: 'Archivos no admitidos omitidos: {names}',
  couldNotRead: 'no se pudo leer',
  selectedOne: '{n} imagen seleccionada.',
  selectedMany: '{n} imágenes seleccionadas.',
  clear: 'Borrar',
  working: 'Trabajando...',
  cancel: 'Cancelar',
  download: 'Descargar',
  downloadAll: 'Descargar todo ({n}) en ZIP',
  preparingZip: 'Preparando el ZIP...',
  sizes: '{before} → {after}',
  couldNotProcess: 'no se pudo procesar',
};

const fr: UiText = {
  dropMany: 'Déposez vos images ici',
  dropOne: 'Déposez une image ici',
  paste: 'ou collez depuis le presse-papiers',
  alsoTakes: 'Accepte aussi {formats}. Ils sont d’abord convertis en PNG (un GIF garde sa première image).',
  reading: 'Lecture de vos images...',
  chooseMany: 'Choisir des fichiers',
  chooseOne: 'Choisir un fichier',
  takePhoto: 'Prendre une photo',
  skippedOne: 'Fichier non pris en charge ignoré : {names}',
  skippedMany: 'Fichiers non pris en charge ignorés : {names}',
  couldNotRead: 'n’a pas pu être lu',
  selectedOne: '{n} image sélectionnée.',
  selectedMany: '{n} images sélectionnées.',
  clear: 'Effacer',
  working: 'Traitement...',
  cancel: 'Annuler',
  download: 'Télécharger',
  downloadAll: 'Tout télécharger ({n}) en ZIP',
  preparingZip: 'Préparation du ZIP...',
  sizes: '{before} → {after}',
  couldNotProcess: 'n’a pas pu être traité',
};

const tr: UiText = {
  dropMany: 'Görselleri buraya bırakın',
  dropOne: 'Görseli buraya bırakın',
  paste: 'veya panodan yapıştırın',
  alsoTakes: '{formats} da kabul edilir. Önce PNG’ye çevrilirler (GIF’in ilk karesi kullanılır).',
  reading: 'Görselleriniz okunuyor...',
  chooseMany: 'Dosya seç',
  chooseOne: 'Dosya seç',
  takePhoto: 'Fotoğraf çek',
  skippedOne: 'Desteklenmeyen dosya atlandı: {names}',
  skippedMany: 'Desteklenmeyen dosyalar atlandı: {names}',
  couldNotRead: 'okunamadı',
  selectedOne: '{n} görsel seçildi.',
  selectedMany: '{n} görsel seçildi.',
  clear: 'Temizle',
  working: 'Çalışıyor...',
  cancel: 'İptal',
  download: 'İndir',
  downloadAll: 'Hepsini ({n}) ZIP olarak indir',
  preparingZip: 'ZIP hazırlanıyor...',
  sizes: '{before} → {after}',
  couldNotProcess: 'işlenemedi',
};

export const UI_TEXT: Readonly<Record<string, UiText>> = { en, hi, bn, 'pt-BR': ptBR, id, ru, de, es, fr, tr };

/** Fill {placeholders}. Kept here so the small client bundle does not pull in the page dictionaries. */
export function fill(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (whole, key: string) => (key in values ? String(values[key]) : whole));
}

/** The language named on <html lang>, once mounted. The server and the first render are English. */
export function useLang(): string {
  const [code, setCode] = useState('en');
  useEffect(() => {
    const lang = document.documentElement.lang;
    if (lang && !lang.startsWith('en')) setCode(lang);
  }, []);
  return code;
}

/**
 * Pick a table by the page's language: `useText(COMPRESS_TEXT)`. The table needs an `en` entry; a language
 * without its own entry falls back to English. The server and the first render are English so hydration matches.
 */
export function useText<T>(table: Readonly<Record<string, T>> & { en: T }): T {
  const code = useLang();
  return table[code] ?? table.en;
}

/** "Compressing..." as a label without the trailing dots, for the progress bar. */
export function bare(text: string): string {
  return text.replace(/\.+$/, '');
}

/** The shared control text for the page's language. */
export function useUi(): UiText {
  return useText(UI_TEXT as Readonly<Record<string, UiText>> & { en: UiText });
}
