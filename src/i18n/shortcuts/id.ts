import type { ShortcutText } from './types';

export const id: ShortcutText = {
  chrome: {
    howToUse: `Cara menggunakan`,
    related: `Terkait`,
    quickTools: `Alat cepat`,
    community: `Komunitas`,
    alsoFrom: `Juga dari iDuck`,
    iduckpdf: `iDuckPDF: alat PDF`,
    communityPages: {
      roadmap: `Peta jalan`,
      request: `Minta fitur`,
      feedback: `Kirim masukan`,
      support: `Dukung iDuckImg`,
      settings: `Pengaturan`,
      about: `Tentang`,
    },
    groups: {
      compress: `Kompres dan ubah ukuran`,
      convert: `Ubah format`,
      other: `Buka format lain`,
      pdf: `Buat PDF`,
      forms: `Foto untuk formulir`,
      edit: `Edit cepat`,
    },
  },
  kb: {
    name: `Kompres gambar ke {kb} KB`,
    title: `Kompres gambar ke {kb} KB online gratis`,
    description: `Kecilkan foto JPG, PNG, atau WebP menjadi {kb} KB atau kurang, gratis di browser Anda. Tanpa unggah, tanpa daftar, tanpa tanda air.`,
    summary: `Kecilkan foto menjadi {kb} KB atau kurang, langsung di browser Anda.`,
    quick: `Untuk mengompres gambar ke {kb} KB, letakkan gambarnya lalu tekan "{run}": targetnya sudah diatur ke {kb} KB dan alat ini mencari kualitas tertinggi yang muat. Semuanya berjalan di perangkat Anda, jadi gambar tidak pernah diunggah.`,
    steps: [
      `Letakkan gambar JPG, PNG, atau WebP Anda, atau tempel dari clipboard.`,
      `Ukuran target sudah diatur ke {kb} KB dan ukuran piksel dipertahankan.`,
      `Tekan "{run}". Alat ini mencoba beberapa tingkat kualitas dan memilih yang terbaik yang muat.`,
      `Periksa ukuran hasil di daftar, lalu unduh.`,
    ],
    faqs: [
      {
        q: `Bagaimana membuat foto di bawah {kb} KB tanpa terlihat jelek?`,
        a: `Biarkan dulu ukuran pikselnya. Alat ini menurunkan kualitas JPG atau WebP sedikit demi sedikit sampai file berukuran {kb} KB atau kurang. Hanya jika itu belum cukup, lebar juga perlu dikurangi.`,
      },
      {
        q: `Apakah gambar saya diunggah ke suatu tempat?`,
        a: `Tidak. Kompresi berjalan di dalam tab browser Anda. File tidak dikirim ke server kami, jadi aman juga untuk foto dan dokumen pribadi.`,
      },
      {
        q: `Hasilnya lebih besar dari {kb} KB. Lalu bagaimana?`,
        a: `Gambar memiliki terlalu banyak piksel untuk {kb} KB dengan kualitas yang layak. Buka alat ubah ukuran, pilih lebar yang lebih kecil (misalnya 800 piksel), biarkan target tetap {kb} KB, lalu jalankan lagi.`,
      },
    ],
  },
  convert: {
    name: `{from} ke {to}`,
    h1: `Konverter {from} ke {to}`,
    title: `{from} ke {to}: konverter online gratis`,
    description: `Ubah {from} ke {to} gratis di browser Anda. Tanpa unggah, tanpa daftar, tanpa tanda air. Bisa di ponsel dan komputer.`,
    summary: `Ubah file {from} menjadi {to} dalam hitungan detik.`,
    quick: `Untuk mengubah {from} ke {to}, letakkan file {from} Anda, pastikan formatnya {to}, lalu tekan "{run}". {why} Semuanya terjadi di browser Anda, jadi tidak ada yang diunggah.`,
    steps: [
      `Letakkan file {from} Anda, atau ketuk area itu untuk memilihnya. Anda bisa menambahkan banyak sekaligus.`,
      `Format keluaran sudah diatur ke {to}.`,
      `Tekan "{run}".`,
      `Unduh tiap file, atau semuanya sekaligus dalam satu ZIP.`,
    ],
    faqs: [
      {
        q: `Amankah mengonversi gambar pribadi di sini?`,
        a: `Konversi berjalan di dalam browser Anda, jadi gambar tidak diunggah ke server kami.`,
      },
      {
        q: `Bisakah saya mengonversi banyak file sekaligus?`,
        a: `Bisa. Tambahkan sebanyak yang sanggup ditangani perangkat Anda, lalu unduh bersama dalam satu ZIP.`,
      },
    ],
  },
  why: {
    'heic-to-jpg': `HEIC adalah format bawaan iPhone, dan JPG bisa dibuka di semua perangkat dan situs web.`,
    'heic-to-png': `PNG mempertahankan setiap piksel persis apa adanya dan bisa dibuka di mana saja.`,
    'png-to-jpg': `File JPG biasanya jauh lebih kecil daripada PNG untuk foto.`,
    'jpg-to-png': `PNG tanpa kehilangan kualitas, jadi format yang aman untuk disunting dan disimpan ulang.`,
    'webp-to-jpg': `JPG bisa dibuka di semua program, sementara beberapa editor dan formulir masih menolak WebP.`,
    'webp-to-png': `PNG mempertahankan transparansi dan bisa dibuka di editor mana pun.`,
    'jpg-to-webp': `WebP biasanya 25 sampai 35 persen lebih kecil daripada JPG dengan kualitas serupa, sehingga halaman dimuat lebih cepat.`,
    'png-to-webp': `WebP jauh lebih kecil daripada PNG dan bisa mempertahankan transparansi.`,
    'jpg-to-pdf': `Setiap gambar menjadi satu halaman PDF, dengan ukuran halaman sama seperti gambarnya.`,
    'png-to-pdf': `Setiap gambar menjadi satu halaman PDF.`,
    'avif-to-jpg': `JPG bisa dibuka di mana saja, termasuk di formulir, editor, dan ponsel lama yang tidak bisa menampilkan AVIF.`,
    'avif-to-png': `PNG bisa dibuka di editor mana pun dan mempertahankan latar transparan.`,
    'svg-to-png': `PNG adalah gambar biasa yang diterima program, formulir, atau media sosial mana pun, dan mempertahankan latar transparan.`,
    'svg-to-jpg': `JPG adalah format foto yang kecil dan universal, dan SVG digambar tajam sebelum disimpan.`,
    'bmp-to-jpg': `BMP disimpan tanpa kompresi, jadi JPG biasanya hanya sebagian kecil dari ukurannya.`,
    'gif-to-png': `Anda mendapat gambar diam yang tajam dari GIF yang mempertahankan latar transparan.`,
  },
  exam: {
    name: `{short}: ukuran {what}`,
    title: `{short}: ukuran {what} dalam px dan KB`,
    description: `Ubah ukuran {what} Anda menjadi {req} untuk {short}, sesuai pengumuman resmi. Gratis, di browser Anda, tanpa unggah.`,
    summary: `Buat {what} {short} Anda menjadi {size}.`,
    quick: `Untuk mengubah ukuran {what} Anda untuk {short}, letakkan lalu tekan "{run}": alat ini sudah diatur ke {req}, seperti di pengumuman resmi. Semuanya berjalan di browser Anda, jadi gambar tidak pernah diunggah.`,
    steps: [
      `Letakkan {what} Anda, atau ketuk area itu untuk memilihnya. Foto HEIC dari iPhone juga bisa.`,
      `{exam} dan {doc} sudah dipilih, jadi ukurannya diatur ke {req}.`,
      `Tekan "{run}".`,
      `Periksa ukuran di daftar, unduh JPG-nya, lalu unggah ke formulir.`,
    ],
    faqs: [
      {
        q: `Berapa ukuran {what} untuk {short}?`,
        a: `{exam} meminta {req}. Ini berasal dari {source} ({location}).`,
      },
      {
        q: `Bagaimana file mencapai ukuran yang tepat?`,
        a: `File disesuaikan dengan ukuran itu lalu disimpan sebagai JPG dengan kualitas terbaik yang tetap di bawah batas maksimum. Semuanya terjadi di browser Anda, jadi gambar tidak pernah diunggah.`,
      },
      {
        q: `Apakah angka-angka ini masih berlaku?`,
        a: `Angka ini dibaca dari dokumen resmi pada {date}, untuk {cycle}. Periksa pengumuman Anda sendiri, karena ujian mengubah aturannya antarperiode.`,
      },
    ],
  },
  docs: { photo: `foto`, signature: `tanda tangan`, 'left-thumb': `cap ibu jari kiri`, declaration: `surat pernyataan` },
};
