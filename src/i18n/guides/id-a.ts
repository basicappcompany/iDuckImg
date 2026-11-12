import type { GuideText } from './types';

/** Indonesian: guides 1 to 8. */
export const idGuidesA: Record<string, GuideText> = {
  'how-to-compress-an-image': {
    title: 'Cara mengompres gambar tanpa mengurangi kualitas',
    seoTitle: 'Cara Mengompres Gambar Tanpa Mengurangi Kualitas',
    description: 'Perkecil file JPG, PNG, dan WebP di browser. Pilih kualitas, lihat ukuran sebelum dan sesudah, lalu unduh. Tanpa unggah, tanpa pendaftaran.',
    intro:
      'Untuk mengompres gambar, letakkan gambar di alat Kompres gambar, biarkan kualitas di sekitar 75, lalu tekan "Kompres". Ukuran foto biasanya menyusut jauh tanpa perubahan yang terlihat, dan gambar tidak pernah meninggalkan perangkat Anda.',
    steps: [
      'Buka alat Kompres gambar, lalu letakkan file JPG, PNG, atau WebP Anda, atau tempel dari clipboard.',
      'Atur kualitas. Sekitar 75 membuat foto tampak sama tetapi file jauh lebih kecil.',
      'Tekan "Kompres" dan lihat ukuran sebelum dan sesudah di samping setiap file.',
      'Unduh setiap file, atau semuanya sekaligus dalam satu ZIP.',
    ],
    sections: [
      {
        h: 'Apa yang berubah pada tiap jenis file',
        p: [
          'JPG dan WebP dikompres dengan kualitas yang bisa diatur, jadi angka yang lebih rendah berarti file lebih kecil dan detail sedikit berkurang. Foto dari ponsel sering berukuran 3 sampai 8 MB, dan sebagian besarnya bisa dibuang tanpa perbedaan yang terlihat.',
          'PNG berbeda. PNG dioptimalkan tanpa kehilangan apa pun, jadi gambarnya persis sama tetapi penghematannya lebih kecil. Jika PNG Anda adalah foto, mengonversinya ke JPG atau WebP akan menghemat jauh lebih banyak.',
        ],
      },
      {
        h: 'Jika Anda butuh ukuran yang tepat',
        p: [
          'Formulir sering mensyaratkan foto di bawah sekian kilobyte. Untuk itu, gunakan kotak target ukuran file di alat Ubah ukuran gambar, atau buka halaman siap pakai seperti Kompres gambar hingga 100 KB. Alat ini mencoba berbagai tingkat kualitas dan memilih yang terbaik yang masih muat.',
          'Jika sebuah file tidak bisa diperkecil lagi, Anda mendapat file aslinya kembali, bukan hasil yang lebih buruk.',
        ],
      },
    ],
    faq: [
      { q: 'Apakah mengompres gambar menurunkan kualitasnya?', a: 'JPG dan WebP kehilangan sedikit detail seiring turunnya kualitas, dan di sekitar 75 perubahannya sulit terlihat. PNG dioptimalkan tanpa kehilangan kualitas.' },
      { q: 'Apakah gambar saya diunggah saat dikompres?', a: 'Tidak. Prosesnya berjalan di browser pada perangkat Anda sendiri, jadi file tidak pernah dikirim ke mana pun.' },
      { q: 'Bisakah saya mengompres banyak gambar sekaligus?', a: 'Bisa. Tambahkan sebanyak yang Anda mau, lalu unduh bersama dalam satu ZIP.' },
    ],
  },
  'how-to-resize-an-image': {
    title: 'Cara mengubah ukuran gambar berdasarkan piksel, persen, atau ukuran file',
    seoTitle: 'Cara Mengubah Ukuran Gambar: Piksel, Persen, atau KB',
    description: 'Ubah gambar ke ukuran piksel tepat, persentase, atau target ukuran file dalam KB, di browser. Proporsi tetap terjaga. Tanpa unggah.',
    intro:
      'Untuk mengubah ukuran gambar, letakkan gambar di alat Ubah ukuran gambar, ketik lebar atau tinggi dalam piksel atau pilih persentase, lalu tekan "Ubah ukuran". Kosongkan satu kotak dan sisi lainnya dihitung otomatis agar gambar tidak melar.',
    steps: [
      'Buka alat Ubah ukuran gambar, lalu letakkan file JPG, PNG, atau WebP Anda.',
      'Ketik lebar, tinggi, atau persentase. Kosongkan satu kotak untuk menjaga proporsi.',
      'Jika formulir meminta ukuran file tertentu, ketik target dalam KB, misalnya 100.',
      'Tekan "Ubah ukuran" lalu unduh hasilnya, atau semua file dalam satu ZIP.',
    ],
    sections: [
      {
        h: 'Piksel, persen, atau kilobyte?',
        p: [
          'Piksel dipakai di tempat yang meminta ukuran seperti 1200 kali 800. Persentase lebih cepat jika Anda hanya ingin memperkecil, misalnya 50 persen. Target dalam KB untuk batas unggah, dan alat ini mencari kualitas terbaik yang masih muat.',
          'Target ukuran file bekerja untuk JPG dan WebP. PNG dengan target ukuran disimpan sebagai WebP, karena PNG tanpa kehilangan kualitas dan tidak bisa menukar kualitas dengan ukuran.',
        ],
      },
      {
        h: 'Saat target terlalu kecil',
        p: [
          'Jika ukuran yang Anda minta tidak tercapai pada ukuran piksel yang dipilih, Anda melihat pesan, bukan file yang salah. Coba kurangi jumlah piksel, lalu coba targetnya lagi.',
          'Memperbesar gambar tidak menambah detail. Gambar hanya ditarik lebih besar sehingga bisa tampak buram, itulah sebabnya memperkecil adalah arah yang aman.',
        ],
      },
    ],
    faq: [
      { q: 'Bagaimana cara mengubah ukuran tanpa melarkan gambar?', a: 'Isi hanya lebar atau hanya tinggi. Sisi lainnya dihitung dari proporsi aslinya.' },
      { q: 'Bisakah saya mengubah ukuran tepat menjadi 100 KB?', a: 'Bisa. Ketik 100 sebagai target ukuran. Alat ini memilih kualitas tertinggi yang masih di bawahnya, atau memberi tahu Anda jika tidak bisa.' },
      { q: 'Apakah mengubah ukuran mengunggah foto saya?', a: 'Tidak. Prosesnya berjalan di browser dan file tetap di perangkat Anda.' },
    ],
  },
  'how-to-crop-an-image': {
    title: 'Cara memotong gambar tepat pada area yang Anda inginkan',
    seoTitle: 'Cara Memotong Gambar: Seret, Rasio, atau Piksel Tepat',
    description: 'Potong gambar dengan menyeret kotak, mengunci rasio seperti 1:1 atau 16:9, atau mengetik piksel tepat. Gratis, di browser, tanpa unggah.',
    intro:
      'Untuk memotong gambar, letakkan gambar di alat Potong gambar, seret kotak ke bagian yang ingin dipertahankan, lalu tekan "Potong". Pilih bentuk seperti 1:1 atau 16:9 untuk mengunci proporsi, atau ketik piksel tepat.',
    steps: [
      'Buka alat Potong gambar, lalu letakkan gambar JPG, PNG, atau WebP.',
      'Seret kotak dan pegangannya ke bagian yang Anda inginkan. Pilih rasio seperti 1:1 atau 16:9 jika perlu.',
      'Atau ketik kiri, atas, lebar, dan tinggi dalam piksel untuk pemotongan yang tepat.',
      'Tekan "Potong" lalu unduh hasilnya.',
    ],
    sections: [
      {
        h: 'Memilih rasio',
        p: [
          'Rasio menjaga kotak tetap berbentuk sama saat Anda menggeser dan mengubah ukurannya. Gunakan 1:1 untuk foto profil persegi, 16:9 untuk thumbnail video dan slide, serta 4:3 atau 3:2 untuk cetak foto.',
          'Jika Anda tidak yakin bentuk apa yang diminta suatu tempat, kalkulator rasio aspek mengubah lebar dan tinggi menjadi rasio.',
        ],
      },
      {
        h: 'Kontrol halus tanpa mouse',
        p: [
          'Anda bisa menggeser kotak dengan tombol panah dan mengetik nilai yang tepat, yang juga berguna di ponsel saat menyeret terasa menyulitkan. Gambar hasil potongan tetap berformat sama dengan aslinya.',
          'Pemotongan membuang area di luar kotak secara permanen pada file yang Anda unduh, jadi simpan file asli jika mungkin Anda memerlukannya lagi. Karena alat ini tidak pernah mengubah file yang Anda letakkan, Anda selalu bisa mulai lagi dari file itu dan mencoba kotak yang berbeda.',
        ],
      },
    ],
    faq: [
      { q: 'Bagaimana cara memotong menjadi persegi?', a: 'Pilih bentuk 1:1 lalu geser kotak ke bagian yang Anda inginkan. Kotak tetap persegi saat Anda mengubah ukurannya.' },
      { q: 'Bisakah saya memotong dengan piksel tepat?', a: 'Bisa. Ketik kiri, atas, lebar, dan tinggi dalam piksel.' },
      { q: 'Apakah memotong menurunkan kualitas?', a: 'Piksel yang Anda pertahankan tidak berubah. JPG dan WebP disimpan lagi dengan kualitas tinggi, dan PNG tetap tanpa kehilangan kualitas.' },
    ],
  },
  'how-to-add-a-watermark-to-a-photo': {
    title: 'Cara menambahkan watermark teks ke foto',
    seoTitle: 'Cara Menambah Watermark Teks ke Foto (Gratis, Tanpa Unggah)',
    description: 'Beri nama atau baris hak cipta pada gambar. Pilih posisi, ukuran, opasitas, dan warna, atau ulangi di seluruh gambar. Diproses di browser.',
    intro:
      'Untuk memberi watermark pada foto, letakkan foto di alat Tambah watermark, ketik teks Anda, pilih posisinya, lalu tekan "Tambah tanda air". Anda bisa menaruhnya di sudut atau mengulanginya di seluruh gambar.',
    steps: [
      'Buka alat Tambah watermark, lalu letakkan gambar JPG, PNG, atau WebP Anda.',
      'Ketik teks Anda, misalnya nama atau baris hak cipta.',
      'Pilih posisi, ukuran, opasitas, dan warna. Pratinjau diperbarui saat Anda mengubahnya.',
      'Tekan "Tambah tanda air" lalu unduh setiap file, atau semuanya dalam satu ZIP.',
    ],
    sections: [
      {
        h: 'Agar terbaca tetapi tidak jelek',
        p: [
          'Ukuran dihitung sebagai bagian dari lebar gambar, jadi tanda tampak sama di foto kecil maupun besar. Tepi lembut dengan warna berlawanan menjaga teks putih tetap terbaca di area terang dan teks hitam di area gelap.',
          'Opasitas sekitar 60 persen adalah awal yang baik. Turunkan jika tanda bersaing dengan gambar, naikkan jika harus terlihat jelas.',
        ],
      },
      {
        h: 'Apa yang bisa dan tidak bisa dilakukan watermark',
        p: [
          'Watermark yang terlihat menghalangi penyalinan, tetapi tidak mencegahnya. Orang yang bertekad bisa memotong atau mengeditnya. Menaruhnya di dekat tengah, atau mengulanginya di seluruh gambar, membuatnya lebih sulit dihapus.',
          'Watermark yang sama dipasang pada setiap gambar yang Anda tambahkan, dan JPG serta WebP disimpan lagi dengan kualitas tinggi.',
        ],
      },
    ],
    faq: [
      { q: 'Bisakah saya memberi watermark pada banyak foto sekaligus?', a: 'Bisa. Tambahkan semuanya, periksa pratinjau gambar pertama, dan setiap gambar mendapat tanda yang sama dengan ukuran relatif yang sama.' },
      { q: 'Bisakah orang menghapus watermark saya?', a: 'Orang yang bertekad bisa memotong atau mengeditnya. Tanda yang diulang di seluruh gambar lebih sulit dihapus daripada tanda di sudut.' },
      { q: 'Bisakah saya memakai logo, bukan teks?', a: 'Bisa, dengan alat Tambah logo ke gambar, yang menempatkan gambar PNG, JPG, atau WebP dengan cara yang sama.' },
    ],
  },
  'how-to-add-a-logo-to-a-photo': {
    title: 'Cara memasang logo Anda pada foto',
    seoTitle: 'Cara Menambah Logo ke Foto atau Gambar (Gratis, Tanpa Unggah)',
    description: 'Pasang logo Anda pada satu atau banyak gambar. Pilih posisi, ukuran, dan opasitas, atau ulangi di seluruh gambar. Berjalan di browser.',
    intro:
      'Untuk menambah logo ke foto, letakkan gambar di alat Tambah logo ke gambar, pilih file logo, tentukan posisinya, lalu tekan "Tambah logo". Logo PNG dengan latar transparan memberi hasil terbaik.',
    steps: [
      'Buka alat Tambah logo ke gambar, lalu letakkan gambar JPG, PNG, atau WebP Anda.',
      'Pilih file logo Anda. PNG dengan latar transparan memberi hasil paling bersih.',
      'Pilih salah satu dari sembilan posisi, atau ulangi, lalu atur ukuran dan opasitas.',
      'Tekan "Tambah logo" lalu unduh file, atau semuanya dalam satu ZIP.',
    ],
    sections: [
      {
        h: 'Mendapatkan logo yang bersih',
        p: [
          'Logo JPG membawa kotak putihnya, jadi akan tampak sebagai persegi panjang putih di atas foto. Ekspor logo Anda sebagai PNG atau WebP dengan latar transparan.',
          'Logo SVG belum didukung, karena browser tidak bisa menggambarnya di worker latar belakang. Ekspor dulu PNG berukuran besar.',
        ],
      },
      {
        h: 'Ukuran dan penempatan',
        p: [
          'Logo mempertahankan proporsinya sendiri dan ukurannya dihitung sebagai bagian dari lebar gambar, jadi tampak sama di setiap foto dalam satu kelompok. Jika terlalu besar untuk muat, logo diperkecil, bukan terpotong.',
          'Gunakan sudut untuk tanda merek yang tenang, dan tengah atau opsi ulang jika Anda ingin logo lebih sulit dihapus.',
        ],
      },
      {
        h: 'Tips untuk hasil profesional',
        p: [
          'Buat logo tetap kecil dan konsisten. Sekitar 10 sampai 20 persen dari lebar gambar biasanya cukup, dan memakai sudut yang sama di setiap foto membuat satu set tampak serasi.',
          'Periksa pratinjau pada foto terang dan foto gelap sebelum menjalankan kelompok besar. Jika logo hilang di salah satunya, naikkan opasitas atau beri garis tepi terang pada logo sebelum dipakai.',
        ],
      },
    ],
    faq: [
      { q: 'File logo apa yang bisa dipakai?', a: 'PNG, JPG, dan WebP. PNG atau WebP transparan memberi hasil terbaik. SVG belum didukung.' },
      { q: 'Apakah logo atau foto saya diunggah?', a: 'Tidak. Keduanya digabungkan di browser dan tetap di perangkat Anda.' },
      { q: 'Bisakah saya memasang logo pada banyak foto?', a: 'Bisa. Logo yang sama dipasang pada setiap gambar dengan ukuran relatif yang sama.' },
    ],
  },
  'how-to-resize-a-photo-and-signature-for-an-exam-form': {
    title: 'Cara mengubah ukuran foto dan tanda tangan untuk formulir ujian',
    seoTitle: 'Ubah Ukuran Foto dan Tanda Tangan untuk Formulir Ujian',
    description: 'Siapkan foto, tanda tangan, atau cap jempol dengan piksel dan KB tepat sesuai formulir ujian, memakai persyaratan dari pengumuman resmi.',
    intro:
      'Untuk mengubah ukuran foto bagi formulir ujian, pilih ujian dan dokumennya di alat Ubah ukuran foto dan tanda tangan untuk ujian, letakkan gambar Anda, lalu tekan "Make my file". Anda mendapat JPG dengan ukuran piksel yang tepat dan di dalam rentang KB yang diizinkan.',
    steps: [
      'Buka alat Ubah ukuran foto dan tanda tangan untuk ujian, lalu pilih ujian Anda dan dokumennya, seperti "Photograph" atau "Signature".',
      'Periksa persyaratan yang ditampilkan. Masing-masing punya tautan ke pengumuman resmi dan tanggal kami membacanya.',
      'Letakkan foto atau hasil pindai Anda. Foto HEIC dari iPhone juga bisa.',
      'Tekan "Make my file", periksa ukurannya di daftar, lalu unduh JPG-nya.',
    ],
    sections: [
      {
        h: 'Ujian apa saja yang tercakup',
        p: [
          'Saat ini alat ini memiliki IBPS PO/MT (foto, tanda tangan, cap jempol kiri, dan pernyataan tulisan tangan) serta tanda tangan SSC CGL 2026. Setiap angka berasal dari pengumuman resmi, dan setiap preset menampilkan sumbernya serta kapan kami membacanya.',
          'Jika ujian Anda tidak terdaftar, pilih "Other exam" lalu ketik batas lebar, tinggi, dan KB dari pengumuman Anda sendiri.',
        ],
      },
      {
        h: 'Selalu periksa pengumuman Anda sendiri',
        p: [
          'Aturan ujian berubah dari satu periode ke periode lain, jadi bandingkan angkanya dengan pemberitahuan terbaru Anda sebelum mengunggah. Alat ini hanya sebaru pengumuman tempat angkanya dibaca.',
          'Gambar dipotong atau diberi bantalan hingga ukuran piksel yang tepat, lalu disimpan dengan kualitas terbaik yang masih di bawah batas maksimum. Jika gambar sederhana hasilnya di bawah batas minimum, data pengisi yang tidak berbahaya ditambahkan ke file agar mencapainya. Gambarnya sendiri tidak berubah.',
        ],
      },
    ],
    faq: [
      { q: 'Apakah ukurannya resmi?', a: 'Ya, ukuran disalin dari pengumuman resmi, dan setiap preset menautkan ke dokumennya serta menyebut kapan kami membacanya. Periksa juga pengumuman untuk periode Anda sendiri.' },
      { q: 'Bagaimana jika ujian saya tidak terdaftar?', a: 'Pilih "Other exam" dan masukkan ukuran piksel serta rentang KB dari pengumuman Anda.' },
      { q: 'Apakah foto saya diunggah?', a: 'Tidak. Ukurannya diubah di browser dan tidak pernah meninggalkan perangkat Anda.' },
    ],
  },
  'how-to-convert-images-between-jpg-png-webp-and-heic': {
    title: 'Cara mengonversi gambar antara JPG, PNG, WebP, dan HEIC',
    seoTitle: 'Cara Mengonversi Gambar: JPG, PNG, WebP, HEIC ke PDF',
    description: 'Buka foto HEIC iPhone, beralih antara JPG, PNG, dan WebP, atau buat PDF. Dikonversi di browser tanpa unggah dan tanpa pendaftaran.',
    intro:
      'Untuk mengonversi gambar, letakkan gambar di alat Konversi gambar, pilih JPG, PNG, WebP, atau PDF sebagai format, lalu tekan "Konversi". Foto HEIC dari iPhone, serta file AVIF, SVG, GIF, dan BMP, juga bisa dibuka sebagai masukan.',
    steps: [
      'Buka alat Konversi gambar dan letakkan file Anda. Anda bisa menambahkan banyak sekaligus.',
      'Pilih format keluaran: JPG, PNG, WebP, atau PDF.',
      'Tekan "Konversi".',
      'Unduh setiap file, atau semuanya dalam satu ZIP.',
    ],
    sections: [
      {
        h: 'Format mana yang dipilih',
        p: [
          'JPG adalah pilihan aman untuk foto dan terbuka di mana saja, termasuk formulir unggah. PNG mempertahankan tepi yang tajam dan latar tembus pandang, jadi cocok untuk logo dan tangkapan layar. WebP biasanya lebih kecil daripada keduanya dan bekerja di setiap browser terkini.',
          'JPG tidak bisa tembus pandang, jadi area transparan diisi putih saat Anda mengonversi ke JPG.',
        ],
      },
      {
        h: 'HEIC, AVIF, SVG, GIF, dan BMP',
        p: [
          'iPhone menyimpan foto sebagai HEIC, yang tidak bisa dibuka banyak aplikasi dan situs. Konversikan ke JPG dan foto bisa dibuka di mana saja. File HEIC pertama memuat dekoder sekitar 2 MB, jadi mungkin perlu sejenak untuk mulai. HEIC hanya untuk masukan.',
          'GIF hanya mempertahankan bingkai pertamanya, SVG digambar dengan sisi terpanjang minimal 1024 piksel, dan AVIF memerlukan browser yang bisa membukanya. Semuanya diubah dulu menjadi PNG, di browser Anda.',
        ],
      },
    ],
    faq: [
      { q: 'Bagaimana cara mengonversi HEIC ke JPG?', a: 'Letakkan file HEIC di alat, biarkan format tetap JPG, lalu tekan "Konversi". Prosesnya berjalan di browser Anda.' },
      { q: 'Apakah konversi menurunkan kualitas?', a: 'PNG tanpa kehilangan kualitas. JPG dan WebP memang kehilangan sedikit, tetapi disimpan dengan kualitas tinggi sehingga perubahannya sulit terlihat pada foto.' },
      { q: 'Bisakah saya membuat PDF?', a: 'Bisa, pilih PDF untuk mendapat satu PDF per gambar. Untuk memasukkan beberapa gambar ke satu PDF, gunakan Gabungkan gambar menjadi PDF.' },
    ],
  },
  'how-to-combine-images-into-one-pdf': {
    title: 'Cara menggabungkan gambar menjadi satu PDF',
    seoTitle: 'Cara Menggabungkan Gambar Menjadi Satu PDF (Atur Urutan)',
    description: 'Masukkan beberapa gambar JPG, PNG, atau WebP ke satu PDF, pilih urutan halaman dan halaman A4 atau seukuran gambar. Berjalan di browser.',
    intro:
      'Untuk menggabungkan gambar menjadi satu PDF, letakkan gambar di alat Gabungkan gambar menjadi PDF, atur urutannya dengan "Naik" dan "Turun", pilih gaya halaman, lalu tekan "Buat PDF". Setiap gambar menjadi satu halaman.',
    steps: [
      'Buka alat Gabungkan gambar menjadi PDF dan letakkan gambar Anda. Anda bisa menambah lagi kapan saja.',
      'Atur urutan sesuai keinginan dengan "Naik" dan "Turun", dan hapus yang tidak diperlukan.',
      'Pilih "A4 dengan margin", atau halaman yang seukuran setiap gambar.',
      'Tekan "Buat PDF" lalu unduh filenya.',
    ],
    sections: [
      {
        h: 'Halaman A4 atau halaman seukuran gambar',
        p: [
          'A4 dengan margin paling cocok jika PDF akan dicetak atau dikirim sebagai dokumen, karena setiap halaman berukuran sama. Halaman yang seukuran setiap gambar lebih baik jika gambar berbentuk berbeda-beda dan Anda tidak ingin ruang putih.',
          'Gambar tidak dilarkan. Gambar diskalakan agar muat di halaman dan diletakkan di tengah.',
        ],
      },
      {
        h: 'Menjaga PDF tetap kecil',
        p: [
          'Ukuran PDF hanya sekecil gambar yang dimasukkan ke dalamnya. Jika terlalu besar untuk dikirim lewat email, kompres gambarnya dulu, baru gabungkan.',
          'Area transparan tampil putih di halaman. Jika Anda ingin satu PDF terpisah per gambar, bukan satu untuk semuanya, gunakan alat Konversi gambar dengan PDF sebagai formatnya.',
        ],
      },
      {
        h: 'Tips untuk PDF yang rapi',
        p: [
          'Putar dulu foto yang miring dengan alat Putar dan balik, agar setiap halaman tegak. Jauh lebih mudah memperbaiki gambarnya daripada memperbaiki halamannya kemudian.',
          'Beri nama file agar terurut, lalu periksa urutannya di daftar sebelum menekan "Buat PDF". Halaman mengikuti daftar dari atas ke bawah.',
        ],
      },
    ],
    faq: [
      { q: 'Bisakah saya mengubah urutan halaman?', a: 'Bisa. Gunakan "Naik" dan "Turun" di samping setiap gambar, dan hapus yang tidak diperlukan.' },
      { q: 'Apakah bisa dipakai dengan foto iPhone?', a: 'Bisa. Foto HEIC dibuka sebagai masukan dan dimasukkan ke dalam PDF.' },
      { q: 'Apakah gambar saya diunggah?', a: 'Tidak. PDF dibuat di browser dan tidak pernah meninggalkan perangkat Anda.' },
    ],
  },
};
