/** The words on the Remove metadata tool: what happens, and the run button, in the ten languages (machine translations). */
export interface ExifText {
  what: string;
  removed: string;
  kept: string;
  run: string;
  running: string;
}

export const EXIF_TEXT: Readonly<Record<string, ExifText>> & { en: ExifText } = {
  en: {
    what: 'What happens',
    removed: 'Removed: camera and phone details, date and time, GPS location, XMP, IPTC and comments.',
    kept: 'The picture is not recompressed, so quality and size stay the same. The exception is a JPG that is stored sideways and relies on a rotation tag: it is saved again so it stays upright.',
    run: 'Remove metadata',
    running: 'Removing...',
  },
  hi: {
    what: 'क्या होता है',
    removed: 'हटाया जाता है: कैमरा और फ़ोन का ब्योरा, तारीख़ और समय, GPS लोकेशन, XMP, IPTC और टिप्पणियाँ।',
    kept: 'तस्वीर दोबारा कंप्रेस नहीं होती, इसलिए क्वालिटी और साइज़ वही रहते हैं। अपवाद वह JPG है जो आड़ी सेव है और रोटेशन टैग पर निर्भर है: उसे दोबारा सेव किया जाता है ताकि वह सीधी रहे।',
    run: 'मेटाडेटा हटाएँ',
    running: 'हटाया जा रहा है...',
  },
  bn: {
    what: 'কী ঘটে',
    removed: 'সরানো হয়: ক্যামেরা ও ফোনের তথ্য, তারিখ ও সময়, GPS অবস্থান, XMP, IPTC এবং মন্তব্য।',
    kept: 'ছবি আবার কমপ্রেস হয় না, তাই কোয়ালিটি ও আকার একই থাকে। ব্যতিক্রম: কাত করে সেভ করা এবং রোটেশন ট্যাগের ওপর নির্ভর করা JPG; সেটি আবার সেভ হয় যাতে সোজা থাকে।',
    run: 'মেটাডেটা সরান',
    running: 'সরানো হচ্ছে...',
  },
  'pt-BR': {
    what: 'O que acontece',
    removed: 'Removidos: dados da câmera e do celular, data e hora, localização GPS, XMP, IPTC e comentários.',
    kept: 'A imagem não é recomprimida, então qualidade e tamanho permanecem iguais. A exceção é um JPG guardado de lado que depende de uma marca de rotação: ele é salvo de novo para ficar na posição certa.',
    run: 'Remover metadados',
    running: 'Removendo...',
  },
  id: {
    what: 'Apa yang terjadi',
    removed: 'Dihapus: detail kamera dan ponsel, tanggal dan waktu, lokasi GPS, XMP, IPTC, dan komentar.',
    kept: 'Gambar tidak dikompresi ulang, jadi kualitas dan ukuran tetap sama. Pengecualiannya adalah JPG yang tersimpan miring dan bergantung pada tag rotasi: JPG itu disimpan lagi agar tetap tegak.',
    run: 'Hapus metadata',
    running: 'Menghapus...',
  },
  ru: {
    what: 'Что происходит',
    removed: 'Удаляются: данные камеры и телефона, дата и время, GPS-координаты, XMP, IPTC и комментарии.',
    kept: 'Изображение не пересжимается, поэтому качество и размер остаются прежними. Исключение — JPG, сохранённый «на боку» и зависящий от тега поворота: его сохраняют заново, чтобы он остался прямым.',
    run: 'Удалить метаданные',
    running: 'Удаляем...',
  },
  de: {
    what: 'Was passiert',
    removed: 'Entfernt werden: Kamera- und Handydaten, Datum und Uhrzeit, GPS-Standort, XMP, IPTC und Kommentare.',
    kept: 'Das Bild wird nicht neu komprimiert, Qualität und Größe bleiben also gleich. Die Ausnahme ist ein JPG, das quer gespeichert ist und auf einem Drehungs-Tag beruht: Es wird neu gespeichert, damit es aufrecht bleibt.',
    run: 'Metadaten entfernen',
    running: 'Wird entfernt...',
  },
  es: {
    what: 'Qué ocurre',
    removed: 'Se elimina: datos de la cámara y del teléfono, fecha y hora, ubicación GPS, XMP, IPTC y comentarios.',
    kept: 'La imagen no se vuelve a comprimir, así que la calidad y el tamaño no cambian. La excepción es un JPG guardado de lado que depende de una etiqueta de rotación: se guarda de nuevo para que quede derecho.',
    run: 'Quitar metadatos',
    running: 'Quitando...',
  },
  fr: {
    what: 'Ce qui se passe',
    removed: 'Supprimés : détails de l’appareil photo et du téléphone, date et heure, position GPS, XMP, IPTC et commentaires.',
    kept: 'L’image n’est pas recompressée : qualité et taille restent identiques. L’exception est un JPG enregistré de côté qui dépend d’une balise de rotation : il est réenregistré pour rester à l’endroit.',
    run: 'Supprimer les métadonnées',
    running: 'Suppression...',
  },
  tr: {
    what: 'Ne olur',
    removed: 'Kaldırılanlar: kamera ve telefon bilgileri, tarih ve saat, GPS konumu, XMP, IPTC ve yorumlar.',
    kept: 'Görsel yeniden sıkıştırılmaz, bu yüzden kalite ve boyut aynı kalır. İstisna, yan yatık kaydedilmiş ve döndürme etiketine dayanan JPG’dir: dik kalması için yeniden kaydedilir.',
    run: 'Meta verileri kaldır',
    running: 'Kaldırılıyor...',
  },
};
