import type { GuideText } from './types';

/** Indonesian: guides 18 to 25. */
export const idGuidesC: Record<string, GuideText> = {
  'how-to-calculate-an-aspect-ratio': {
    title: 'Cara menghitung rasio aspek',
    seoTitle: 'Cara Menghitung Rasio Aspek (16:9, 4:3, 1:1)',
    description: 'Temukan rasio aspek dari lebar dan tinggi apa pun, atau hitung tinggi atau lebar yang sesuai untuk sebuah rasio. Kalkulator gratis dengan rasio umum.',
    intro:
      'Untuk menghitung rasio aspek, bagi lebar dan tinggi dengan faktor persekutuan terbesarnya. 1920 kali 1080 adalah 16:9. Kalkulator rasio aspek melakukannya untuk Anda, dan juga menemukan sisi yang belum diketahui saat Anda ingin mempertahankan rasio.',
    steps: [
      'Buka Kalkulator rasio aspek lalu ketik lebar dan tinggi dalam piksel. Rasio paling sederhana akan muncul.',
      'Untuk mengubah ukuran ke suatu rasio, pilih salah satunya seperti 16:9, 4:3, atau 1:1, atau ketik rasio Anda sendiri.',
      'Ketik lebar baru dan tingginya mengikuti, atau ketik tinggi dan lebarnya mengikuti.',
      'Pakai angka-angka itu di alat Ubah ukuran gambar atau Potong gambar.',
    ],
    sections: [
      {
        h: 'Rasio umum dan kegunaannya',
        p: [
          'Persegi 1:1 dipakai untuk foto profil. 16:9 untuk video dan sebagian besar layar, 4:3 untuk layar lama dan banyak kamera, dan 3:2 untuk kamera SLR serta cetak 4 kali 6 inci. 9:16 untuk stories dan video pendek, dan 4:5 untuk posting potret Instagram.',
          'Kalkulator mencantumkannya beserta kegunaannya, sehingga Anda bisa memilih yang diminta suatu tempat.',
        ],
      },
      {
        h: 'Saat ukuran hanya mendekati sebuah rasio',
        p: [
          'Beberapa ukuran hampir, tetapi tidak persis, sama dengan rasio umum. 1366 kali 768 adalah 683:384, yang selisihnya hanya sepersekian persen dari 16:9. Kalkulator menampilkan keduanya agar Anda tahu bahwa ukurannya dekat, bukan persis.',
          'Tinggi dan lebar dibulatkan ke piksel utuh saat Anda mengubah ukuran ke suatu rasio.',
        ],
      },
    ],
    faq: [
      { q: 'Berapa rasio aspek 1920 x 1080?', a: '16:9. Bagi keduanya dengan 120, faktor persekutuan terbesarnya, dan Anda mendapat 16 dan 9.' },
      { q: 'Bagaimana cara mempertahankan rasio saat mengubah ukuran?', a: 'Pilih rasionya lalu ketik lebar baru. Tinggi dihitung sebagai lebar dikali tinggi rasio dibagi lebar rasio.' },
      { q: 'Apakah ini mengubah gambar saya?', a: 'Tidak. Ini kalkulator dan tidak memakai file apa pun.' },
    ],
  },
  'how-to-adjust-the-colours-of-a-photo': {
    title: 'Cara mengatur kecerahan, kontras, dan warna, atau membuat foto hitam putih',
    seoTitle: 'Cara Membuat Foto Hitam Putih atau Mengatur Kecerahan',
    description: 'Ubah kecerahan, kontras, dan kekuatan warna, atau terapkan hitam putih, sepia, atau negatif. Pratinjau langsung, di browser, tanpa unggah.',
    intro:
      'Untuk membuat foto hitam putih, letakkan foto di alat Atur warna dan filter, pilih filter "Black and white" lalu tekan "Apply". Alat yang sama mengubah kecerahan, kontras, dan kekuatan warna, dengan pratinjau langsung.',
    steps: [
      'Buka alat Atur warna dan filter lalu letakkan gambar Anda.',
      'Geser penggeser "Brightness", "Contrast", dan "Colour strength", atau pilih filter seperti "Black and white".',
      'Periksa pratinjau langsungnya, dan gunakan "Reset" jika Anda ingin mulai lagi.',
      'Tekan "Apply" lalu unduh file, atau semuanya dalam satu ZIP.',
    ],
    sections: [
      {
        h: 'Fungsi tiap kontrol',
        p: [
          'Kecerahan membuat semuanya lebih terang atau lebih gelap. Kontras mendorong area terang dan gelap lebih jauh atau lebih dekat. Kekuatan warna menaikkan warna, atau menurunkannya hingga abu-abu, dan filter memberi hitam putih, sepia (cokelat hangat ala foto lama), atau negatif.',
          'Kecerahan dan kontras diterapkan lebih dulu, lalu kekuatan warna, kemudian filter. Geser dengan langkah kecil, karena perubahan besar meratakan atau menghilangkan detail.',
        ],
      },
      {
        h: 'Kelompok gambar dan jenis file',
        p: [
          'Perubahan yang sama diterapkan ke setiap gambar yang Anda tambahkan, jadi satu folder penuh bisa dijadikan hitam putih sekaligus. Pratinjau menampilkan gambar pertama.',
          'Area transparan pada PNG tetap transparan. Setiap gambar disimpan dalam formatnya sendiri, dan JPG serta WebP disimpan lagi dengan kualitas tinggi.',
        ],
      },
      {
        h: 'Tips',
        p: [
          'Ubah satu penggeser sekali waktu dan perhatikan pratinjau. Mudah sekali menaikkan kecerahan dan kontras bersamaan sampai detail hilang di bagian paling terang dan paling gelap.',
          'Untuk foto hitam putih yang lebih bertenaga, pilih "Black and white" lalu tambahkan sedikit kontras. Untuk tampilan foto lama, sepia dengan kecerahan sedikit lebih rendah bekerja dengan baik.',
        ],
      },
    ],
    faq: [
      { q: 'Bagaimana cara membuat gambar hitam putih?', a: 'Pilih filter "Black and white" lalu tekan "Apply". Menggeser "Colour strength" sampai habis ke bawah memberi hasil yang mirip.' },
      { q: 'Bagaimana cara mencerahkan foto yang gelap?', a: 'Geser "Brightness" ke kanan, dan tambahkan sedikit kontras jika tampak datar.' },
      { q: 'Apakah gambar saya diunggah?', a: 'Tidak. Perubahan dibuat di browser Anda.' },
    ],
  },
  'how-to-add-a-border-to-a-picture': {
    title: 'Cara menambahkan bingkai atau garis tepi pada gambar',
    seoTitle: 'Cara Menambah Bingkai atau Garis Tepi pada Gambar',
    description: 'Beri garis tepi putih, hitam, atau berwarna di sekeliling gambar apa pun, atau yang tembus pandang. Pilih ketebalan dan lihat pratinjau. Di browser.',
    intro:
      'Untuk menambah bingkai pada gambar, letakkan gambar di alat Tambah bingkai atau garis tepi, atur ketebalan, pilih warna, lalu tekan "Add border". Bingkai berada di sekeliling gambar, jadi tidak ada yang terpotong dan hasilnya sedikit lebih besar.',
    steps: [
      'Buka alat Tambah bingkai atau garis tepi lalu letakkan gambar Anda.',
      'Atur seberapa tebal bingkainya.',
      'Pilih putih, hitam, kuning, transparan, atau ketik kode warna Anda sendiri seperti #1e90ff.',
      'Periksa pratinjau, tekan "Add border" lalu unduh hasilnya.',
    ],
    sections: [
      {
        h: 'Ketebalan yang ikut menyesuaikan',
        p: [
          'Ketebalan dihitung sebagai bagian dari sisi gambar yang lebih pendek, jadi bingkai tampak sama pada foto kecil maupun besar dalam satu kelompok.',
          'Karena bingkai ditambahkan di sisi luar, gambar mempertahankan seluruh isinya. Ini berbeda dari menggambar di atas tepinya, yang akan menutupi sebagian gambar.',
        ],
      },
      {
        h: 'Bingkai tembus pandang',
        p: [
          'Bingkai transparan memerlukan format yang mendukung transparansi, jadi JPG menjadi PNG saat Anda memilihnya. Gambar lain mempertahankan formatnya sendiri.',
          'Jika Anda mengetik kode warna yang tidak valid, halaman memberi tahu Anda, bukan menebak. Gunakan bentuk #1e90ff atau #fa0.',
        ],
      },
      {
        h: 'Tips',
        p: [
          'Bingkai putih tipis, sekitar 2 sampai 4 persen, memberi tampilan cetak atau galeri yang bersih. Bingkai yang lebih tebal dengan warna mencolok cocok sebagai pigura untuk posting media sosial.',
          'Jika Anda akan mencetak gambar, ingat bahwa bingkai membuat file lebih besar daripada aslinya, jadi periksa ukuran akhirnya terhadap kertas atau pigura yang Anda bayangkan.',
        ],
      },
    ],
    faq: [
      { q: 'Bagaimana cara menambah bingkai putih pada foto?', a: 'Letakkan fotonya, biarkan warna di "White", atur ketebalan lalu tekan "Add border".' },
      { q: 'Apakah bingkai menutupi gambar saya?', a: 'Tidak. Bingkai ditambahkan di sisi luar, jadi gambar tetap utuh dan hasilnya lebih besar.' },
      { q: 'Bisakah bingkainya tembus pandang?', a: 'Bisa. Pilih "Transparent". Hasilnya PNG, karena JPG tidak bisa tembus pandang.' },
    ],
  },
  'how-to-get-a-hex-color-from-an-image': {
    title: 'Cara mendapatkan kode warna HEX dari gambar',
    seoTitle: 'Cara Mendapatkan Kode Warna HEX dari Gambar (Pemilih Warna)',
    description: 'Klik gambar mana pun untuk mendapat warna tepatnya dalam HEX, RGB, dan HSL dengan salin sekali klik. Bisa juga dengan keyboard. Di browser.',
    intro:
      'Untuk mendapatkan kode HEX sebuah warna pada gambar, letakkan gambar di Pemilih warna dari gambar, gerakkan kursor di atas gambar untuk melihat pratinjau warna, lalu klik untuk memilihnya. Kode HEX, RGB, dan HSL muncul, masing-masing dengan tombol "Copy".',
    steps: [
      'Buka Pemilih warna dari gambar lalu letakkan sebuah gambar.',
      'Gerakkan kursor di atas gambar untuk melihat pratinjau warna di bawah penunjuk.',
      'Klik atau ketuk untuk memilihnya, lalu tekan "Copy" di samping kode yang Anda perlukan.',
      'Pilih warna sebanyak yang Anda mau. Sepuluh terakhir tetap ada di bawah agar Anda bisa kembali ke sana.',
    ],
    sections: [
      {
        h: 'HEX, RGB, dan HSL',
        p: [
          'Ketiganya adalah tiga cara menulis warna yang sama. HEX adalah kode pendek yang dipakai di halaman web, seperti #1E90FF. RGB memberi jumlah merah, hijau, dan biru dari 0 sampai 255, dan HSL memberi rona, saturasi, dan kecerahan, yang lebih mudah disesuaikan dengan tangan.',
          'Panel menampilkan ketiganya, jadi Anda bisa menempelkan yang diminta alat desain atau stylesheet Anda.',
        ],
      },
      {
        h: 'Mendapatkan warna yang andal',
        p: [
          'Sebuah foto tersusun dari jutaan piksel yang sedikit berbeda, jadi dua titik yang tampak sama bisa berbeda beberapa tingkat. Klik beberapa tempat, atau gunakan alat palet untuk menemukan warna utamanya.',
          'Tanpa mouse, klik gambar sekali, lalu gunakan tombol panah untuk bergerak dan Enter untuk memilih. Jika sebuah piksel tembus pandang, halaman menyebutkannya, karena apa yang Anda lihat di layar juga bergantung pada apa yang ada di belakangnya.',
        ],
      },
    ],
    faq: [
      { q: 'Bagaimana cara menemukan kode HEX sebuah warna pada gambar?', a: 'Letakkan gambarnya, klik warnanya lalu salin kode HEX yang muncul.' },
      { q: 'Mengapa piksel yang berdekatan memberi kode berbeda?', a: 'Foto mengandung variasi kecil. Klik beberapa titik atau gunakan alat palet untuk melihat warna utamanya.' },
      { q: 'Apakah gambar saya diunggah?', a: 'Tidak. Warnanya dibaca di browser Anda.' },
    ],
  },
  'how-to-get-a-color-palette-from-an-image': {
    title: 'Cara mendapatkan palet warna dari gambar',
    seoTitle: 'Cara Mendapatkan Palet Warna dari Gambar (Kode HEX, CSS)',
    description: 'Ambil warna utama dari gambar beserta kode HEX dan seberapa luas gambar yang ditutupi masing-masing. Salin sebagai daftar atau variabel CSS.',
    intro:
      'Untuk mendapatkan palet warna dari gambar, letakkan gambar di Pembuat palet warna. Warna utama muncul sebagai sampel dengan kode HEX dan bagian gambar yang ditutupi masing-masing, dan Anda bisa menyalinnya sebagai daftar atau CSS.',
    steps: [
      'Buka Pembuat palet warna lalu letakkan sebuah gambar.',
      'Warna utama muncul seketika. Gunakan penggeser untuk meminta lebih sedikit atau lebih banyak, dari 2 sampai 12.',
      'Klik sebuah sampel untuk menyalin kode HEX-nya.',
      'Atau salin seluruh palet sebagai daftar atau sebagai variabel CSS.',
    ],
    sections: [
      {
        h: 'Bagaimana warna dipilih',
        p: [
          'Piksel yang mirip dikelompokkan dan setiap kelompok dirata-ratakan menjadi satu warna, sehingga warna yang memenuhi sebagian besar gambar muncul paling awal. Persentase pada sampel menunjukkan seberapa luas gambar yang ditutupi kelompok itu.',
          'Piksel yang sepenuhnya atau sebagian besar tembus pandang diabaikan, jadi logo di atas latar transparan memberi warna logo, bukan warna gelap yang kosong.',
        ],
      },
      {
        h: 'Memakai palet',
        p: [
          'Salin sebagai variabel CSS menghasilkan custom property seperti --colour-1 yang bisa langsung Anda tempel ke stylesheet. Daftar biasa praktis untuk catatan atau alat desain.',
          'Jika gambar punya lebih sedikit warna berbeda daripada yang Anda minta, Anda hanya mendapat warna yang ada. Logo tiga warna memberi tiga sampel, bukan dua belas. Untuk satu warna yang tepat, gunakan pemilih warna.',
        ],
      },
      {
        h: 'Tips',
        p: [
          'Gunakan gambar dengan suasana yang Anda inginkan. Palet hanya sebagus gambar asalnya, dan foto matahari terbenam memberi warna yang sangat berbeda dari foto produk.',
          'Ambil dua atau tiga warna dari palet, bukan semuanya. Kebanyakan desain paling baik dengan satu warna utama, satu aksen, dan satu netral, dan persentasenya menunjukkan warna mana yang paling layak dipilih.',
        ],
      },
    ],
    faq: [
      { q: 'Berapa banyak warna yang bisa saya dapat?', a: 'Dari 2 sampai 12. Enam adalah awal yang baik untuk palet merek atau desain.' },
      { q: 'Bisakah saya memakai palet ini di situs web saya?', a: 'Bisa. Salin sebagai variabel CSS dan tempel hasilnya ke stylesheet Anda.' },
      { q: 'Apakah gambar saya diunggah?', a: 'Tidak. Warnanya dihitung di browser Anda.' },
    ],
  },
  'how-to-convert-an-image-to-base64': {
    title: 'Cara mengonversi gambar ke Base64 (dan sebaliknya)',
    seoTitle: 'Cara Mengonversi Gambar ke Base64 dan Mendekodenya Kembali',
    description: 'Ubah gambar menjadi data URI Base64 untuk HTML atau CSS, atau tempel Base64 dan dapatkan gambarnya kembali. Di browser, tanpa unggah.',
    intro:
      'Untuk mengonversi gambar ke Base64, letakkan gambar di alat Gambar ke Base64 lalu salin hasilnya. Bawaannya adalah data URI yang bisa Anda tempel ke HTML atau CSS. Untuk kembali, pilih "Base64 to image", tempel teksnya, dan unduh gambarnya.',
    steps: [
      'Buka alat Gambar ke Base64 lalu pilih "Image to Base64".',
      'Letakkan gambarnya. File asli di-encode apa adanya, jadi SVG tetap SVG.',
      'Pilih format yang Anda perlukan: data URI, Base64 biasa, latar CSS, atau tag gambar HTML, lalu tekan "Copy".',
      'Untuk men-decode, pilih "Base64 to image", tempel teksnya, lalu unduh gambarnya.',
    ],
    sections: [
      {
        h: 'Kapan Base64 adalah ide yang bagus',
        p: [
          'Base64 menulis byte sebuah file sebagai teks biasa, jadi gambar kecil bisa berada di dalam halaman web, stylesheet, atau email tanpa file terpisah. Teksnya sekitar sepertiga lebih panjang daripada file.',
          'Cocok untuk gambar kecil seperti ikon dan logo. Untuk foto besar teksnya menjadi sangat panjang dan file gambar biasa dimuat lebih cepat, jadi alat ini memperingatkan Anda di atas 100 KB.',
        ],
      },
      {
        h: 'Menempelkan Base64 kembali',
        p: [
          'Anda bisa menempelkan data URI lengkap atau hanya karakter Base64-nya. Alat ini membaca jenis gambar dari datanya sendiri (PNG, JPG, GIF, WebP, BMP, AVIF, SVG, atau ICO) dan lebih memercayainya daripada label yang salah.',
          'Jika teks terpotong saat disalin, atau bukan gambar, Anda mendapat pesan sederhana yang menyatakannya, bukan unduhan yang rusak.',
        ],
      },
    ],
    faq: [
      { q: 'Apa itu data URI?', a: 'Cara menaruh file di dalam alamat web. Diawali data:, jenis file, dan ;base64, diikuti teks Base64.' },
      { q: 'Mengapa teks Base64 lebih besar daripada filenya?', a: 'Base64 memakai empat karakter teks untuk setiap tiga byte, jadi teksnya sekitar 33 persen lebih panjang.' },
      { q: 'Apakah gambar saya diunggah?', a: 'Tidak. Encode dan decode terjadi di browser Anda.' },
    ],
  },
  'how-to-make-a-favicon': {
    title: 'Cara membuat favicon untuk situs web Anda',
    seoTitle: 'Cara Membuat Favicon (favicon.ico, PNG, Apple Touch Icon)',
    description: 'Buat favicon.ico, PNG 16 dan 32 piksel, ikon Apple touch, dan ikon Android dari satu gambar, lengkap dengan kode untuk ditempel di halaman Anda.',
    intro:
      'Untuk membuat favicon, letakkan satu gambar di Pembuat favicon lalu tekan "Make favicons". Anda mendapat favicon.ico, PNG 16 dan 32 piksel, ikon Apple touch, dan dua ikon Android, dengan kode untuk ditempel di halaman Anda.',
    steps: [
      'Buka Pembuat favicon lalu letakkan satu gambar. Gambar persegi 512 piksel atau lebih memberi hasil terbaik.',
      'Jika bukan persegi, pilih untuk memotongnya menjadi persegi dari tengah, atau pertahankan seluruhnya dengan bilah tembus pandang.',
      'Tekan "Make favicons" lalu unduh file, atau semuanya dalam satu ZIP.',
      'Taruh file di folder root situs Anda dan tempel kode yang ditampilkan ke bagian head halaman Anda.',
    ],
    sections: [
      {
        h: 'Apa yang Anda dapat',
        p: [
          'favicon.ico menyimpan versi 16, 32, dan 48 piksel dalam satu file. favicon-16x16.png dan favicon-32x32.png untuk tab browser, apple-touch-icon.png (180 piksel) untuk iPhone dan iPad, dan ikon 192 serta 512 piksel untuk Android dan aplikasi web yang bisa dipasang.',
          'Pratinjau menampilkan ikon Anda pada 16, 32, dan 64 piksel agar Anda bisa memeriksanya sebelum mengunduh.',
        ],
      },
      {
        h: 'Membuatnya tampak bagus saat kecil',
        p: [
          'Favicon sangat kecil, jadi bentuk sederhana dengan warna kuat paling mudah terbaca. Gambar yang detail menjadi kabur pada 16 piksel, jadi mulailah dari logo sederhana atau satu huruf.',
          'Gambar yang lebih kecil dari 512 piksel diperbesar untuk ikon terbesar dan bisa tampak buram, dan halaman memberi tahu Anda saat itu terjadi. Latar tembus pandang tetap dipertahankan.',
        ],
      },
    ],
    faq: [
      { q: 'File apa yang dibutuhkan situs web untuk favicon?', a: 'Sebuah favicon.ico, PNG 16 dan 32 piksel untuk tab, ikon Apple touch 180 piksel, dan ikon 192 serta 512 piksel untuk Android. Alat ini membuat semuanya.' },
      { q: 'Berapa ukuran gambar yang sebaiknya saya pakai?', a: 'Persegi dan minimal 512 kali 512 piksel. Gambar yang lebih kecil tetap bisa, tetapi ikon besarnya tampak buram.' },
      { q: 'Apakah favicon.ico itu benar-benar file ICO?', a: 'Ya. Berisi ikon 16, 32, dan 48 piksel dalam file ICO standar.' },
    ],
  },
  'are-online-image-tools-safe': {
    title: 'Apakah alat gambar online aman? Cara memeriksa alat Anda',
    seoTitle: 'Apakah Alat Gambar Online Aman? Cara Memeriksanya',
    description: 'Banyak alat gambar online mengunggah foto Anda ke server. Begini cara mengetahuinya, memeriksanya dalam dua menit, dan apa yang dilakukan iDuckImg.',
    intro:
      'Alat gambar online hanya sepribadi tempat ia bekerja. Banyak yang mengirim foto Anda ke server; iDuckImg bekerja di browser Anda, jadi file tetap di perangkat Anda. Anda bisa memeriksanya sendiri di tab Network browser.',
    steps: [
      'Buka halaman alatnya, lalu buka developer tools browser Anda (F12) dan pilih tab Network.',
      'Bersihkan daftarnya, lalu letakkan gambar di alat dan jalankan.',
      'Cari permintaan besar yang membawa gambar Anda, biasanya tampil sebagai POST atau PUT. Alat yang bekerja di perangkat Anda tidak menampilkan satu pun.',
      'Baca kebijakan privasi alat mana pun yang Anda pakai, dan periksa apa yang dikatakannya tentang apa yang disimpan dan untuk berapa lama.',
    ],
    sections: [
      {
        h: 'Mengapa ini penting',
        p: [
          'Sebuah foto bisa berisi wajah, dokumen, nomor rumah, dan detail tersembunyi seperti tempat persis foto diambil. Mengunggahnya berarti menyerahkan salinan kepada pihak lain, dan Anda tidak bisa melihat apa yang terjadi selanjutnya.',
          'Alat yang bekerja di browser menghindari hal itu, karena file Anda diproses oleh perangkat Anda sendiri dan tidak pernah dikirim. Alat seperti ini juga cenderung lebih cepat, karena tidak ada unggah atau unduh.',
        ],
      },
      {
        h: 'Apa yang dilakukan iDuckImg',
        p: [
          'Setiap alat iDuckImg berjalan di browser Anda. Gambar Anda tidak diunggah, tidak ada pendaftaran, dan tidak ada watermark yang ditambahkan. Halaman memuat kode dan file-nya sendiri dari situs yang sama, dan untuk beberapa format seperti HEIC, dekoder dari situs yang sama. Halaman tidak membuat permintaan ke perusahaan lain.',
          'Tetap layak dilakukan: hapus data lokasi tersembunyi sebelum membagikan foto, dan gunakan "Cover", bukan blur ringan, untuk menyembunyikan apa pun yang bersifat pribadi. Alat Hapus data EXIF dan Buramkan atau sembunyikan bagian gambar mengerjakan hal itu di perangkat Anda.',
        ],
      },
    ],
    faq: [
      { q: 'Bagaimana saya tahu apakah sebuah alat mengunggah foto saya?', a: 'Buka tab Network di developer tools browser, jalankan alatnya, dan cari permintaan besar yang membawa gambar Anda. Jika tidak ada, pekerjaannya terjadi di perangkat Anda.' },
      { q: 'Apakah iDuckImg mengunggah gambar saya?', a: 'Tidak. Setiap alat berjalan di browser Anda dan file Anda tetap di perangkat Anda.' },
      { q: 'Apakah aman membagikan foto setelah mengeditnya?', a: 'Hapus dulu data lokasi dan kamera yang tersembunyi, dan sembunyikan apa pun yang bersifat pribadi di dalam gambar itu sendiri dengan penutup solid.' },
    ],
  },
};
