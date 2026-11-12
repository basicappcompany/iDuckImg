import type { GuideText } from './types';

/** Indonesian: guides 9 to 17. */
export const idGuidesB: Record<string, GuideText> = {
  'how-to-rotate-or-flip-an-image': {
    title: 'Cara memutar atau membalik gambar',
    seoTitle: 'Cara Memutar atau Membalik Gambar Online (Gratis)',
    description: 'Putar gambar 90, 180, atau 270 derajat, atau cerminkan secara horizontal atau vertikal. Untuk JPG, PNG, dan WebP, di browser Anda.',
    intro:
      'Untuk memutar gambar, letakkan gambar di alat Putar dan balik, tekan tombol putar ke kiri atau ke kanan sampai pratinjau tampak benar, lalu tekan "Terapkan". Tombol yang sama juga mencerminkan gambar secara horizontal atau vertikal.',
    steps: [
      'Buka alat Putar dan balik, lalu letakkan file JPG, PNG, atau WebP Anda.',
      'Gunakan tombol untuk memutar ke kiri atau ke kanan, atau untuk membalik. Pratinjau menampilkan hasilnya.',
      'Tekan "Terapkan".',
      'Unduh setiap file, atau semuanya dalam satu ZIP.',
    ],
    sections: [
      {
        h: 'Putar atau balik: pilih yang mana?',
        p: [
          'Memutar mengubah arah seluruh gambar sebesar 90, 180, atau 270 derajat, yang memperbaiki foto yang muncul miring atau terbalik. Membalik mencerminkan gambar, dan itulah cara memperbaiki teks yang terbaca terbalik dari kamera selfie.',
          'Anda bisa menggabungkan keduanya. Putar dulu, lalu balik, dan perhatikan pratinjau sampai tampak benar.',
        ],
      },
      {
        h: 'Banyak gambar sekaligus',
        p: [
          'Perubahan yang sama diterapkan ke setiap gambar yang Anda tambahkan, jadi satu kelompok foto miring bisa diperbaiki sekaligus. PNG tetap tanpa kehilangan kualitas. JPG dan WebP disimpan lagi dengan kualitas tinggi.',
          'Periksa pratinjau lebih dulu: pratinjau hanya menampilkan gambar pertama, jadi satu kelompok sebaiknya berisi gambar yang memerlukan putaran yang sama.',
        ],
      },
      {
        h: 'Tips',
        p: [
          'Jika hanya sebagian foto Anda yang miring, putar yang itu dalam satu kelompok dan sisanya dalam kelompok lain. Satu kelompok hanya mendapat satu perubahan, jadi gambar yang berbeda perlu dijalankan terpisah.',
          'Simpan file asli Anda. Memutar 90 derajat bisa dibatalkan, tetapi menyimpan JPG lagi selalu mengubahnya sedikit sekali, jadi sebaiknya jangan diulang berkali-kali.',
        ],
      },
    ],
    faq: [
      { q: 'Bagaimana cara memutar foto yang miring?', a: 'Letakkan fotonya, tekan putar ke kiri atau ke kanan sampai tegak, lalu tekan "Terapkan" dan unduh.' },
      { q: 'Apa bedanya memutar dan membalik?', a: 'Memutar mengubah arah gambar. Membalik mencerminkannya, seperti melihatnya di cermin.' },
      { q: 'Apakah memutar menurunkan kualitas?', a: 'PNG tetap tanpa kehilangan kualitas. JPG dan WebP disimpan lagi dengan kualitas tinggi, jadi perubahannya sangat kecil.' },
    ],
  },
  'how-to-remove-location-and-exif-data-from-a-photo': {
    title: 'Cara menghapus lokasi dan data EXIF dari foto',
    seoTitle: 'Cara Menghapus Data EXIF dan Lokasi GPS dari Foto',
    description: 'Hapus lokasi, tanggal, dan detail kamera tersembunyi dari foto sebelum dibagikan. Diproses di browser, dan gambar tidak dikompres ulang.',
    intro:
      'Untuk menghapus data EXIF dari foto, letakkan foto di alat Hapus data EXIF lalu tekan "Hapus metadata". Lokasi GPS, tanggal, dan detail kamera yang tersembunyi dihapus, dan gambarnya sendiri tidak dikompres ulang.',
    steps: [
      'Buka alat Hapus data EXIF, lalu letakkan foto JPG, PNG, atau WebP Anda.',
      'Tekan "Hapus metadata".',
      'Unduh setiap file yang sudah bersih, atau semuanya dalam satu ZIP.',
      'Jika mau, periksa hasilnya: di Windows, klik kanan file, pilih Properties, lalu buka tab Details.',
    ],
    sections: [
      {
        h: 'Apa yang tersembunyi di dalam foto',
        p: [
          'Ponsel dan kamera menulis detail tambahan ke dalam file: tempat persis foto diambil, tanggal dan waktu, serta model perangkat. Siapa pun yang mendapat file aslinya bisa membacanya, meskipun gambarnya sendiri tidak menampilkan hal pribadi.',
          'Banyak situs media sosial menghapus sebagian dari ini sendiri, tetapi tidak semuanya, dan foto yang dikirim lewat email atau chat biasanya tiba tanpa perubahan. Membersihkannya lebih dulu adalah kebiasaan yang aman.',
        ],
      },
      {
        h: 'Apa yang tidak disembunyikan alat ini',
        p: [
          'Menghapus metadata tidak mengubah isi gambar. Papan nama jalan, nomor rumah, atau wajah tetap terlihat. Untuk menyembunyikan bagian dari gambar itu sendiri, gunakan alat Buramkan atau sembunyikan bagian gambar.',
          'Karena data JPG tidak dikompres ulang, gambar tampak persis seperti sebelumnya dan file hanya sedikit lebih kecil.',
        ],
      },
      {
        h: 'Tips',
        p: [
          'Bersihkan foto sebelum mengirimnya, bukan sesudahnya. Gambar yang sudah Anda posting atau kirim lewat email tidak bisa ditarik kembali, tetapi yang berikutnya bisa dikirim dalam keadaan bersih.',
          'Tangkapan layar biasanya tidak membawa lokasi, jadi aman untuk membagikan gambar sebuah layar. Foto dari kamera ponsel adalah yang layak dibersihkan, terutama foto yang diambil di rumah.',
        ],
      },
    ],
    faq: [
      { q: 'Apa itu data EXIF?', a: 'Informasi yang tersimpan di dalam file foto: di mana foto diambil, kapan, serta dengan perangkat dan pengaturan apa.' },
      { q: 'Apakah menghapus EXIF mengubah gambar?', a: 'Tidak. Gambar tidak dikompres ulang, jadi tampak persis sama.' },
      { q: 'Apakah foto saya diunggah?', a: 'Tidak. Data dihapus di browser dan file tidak pernah meninggalkan perangkat Anda.' },
    ],
  },
  'how-to-make-a-round-profile-picture': {
    title: 'Cara membuat foto profil bulat',
    seoTitle: 'Cara Membuat Foto Profil Bulat (Potong Lingkaran, Gratis)',
    description: 'Potong foto apa pun menjadi lingkaran, atau cukup bulatkan sudutnya, lalu simpan sebagai PNG dengan sudut transparan. Gratis, di browser.',
    intro:
      'Untuk membuat foto profil bulat, letakkan foto di alat Potong lingkaran dan sudut membulat, pilih "Circle" lalu tekan "Make it round". Anda mendapat PNG dengan sudut tembus pandang, yang mempertahankan persegi tengah dari foto Anda.',
    steps: [
      'Buka alat Potong lingkaran dan sudut membulat, lalu letakkan gambar Anda.',
      'Pilih "Circle", atau "Rounded corners" jika Anda hanya ingin tepi yang lembut.',
      'Tekan "Make it round".',
      'Unduh PNG-nya.',
    ],
    sections: [
      {
        h: 'Mengapa hasilnya PNG',
        p: [
          'Gambar bulat memerlukan sudut tembus pandang, dan JPG tidak bisa tembus pandang. PNG bisa, jadi hasilnya selalu PNG. Taruh di atas latar berwarna dan bentuk bulatnya tetap terjaga.',
          'Sebagian besar kotak foto profil memotong menjadi lingkaran untuk Anda. Alat ini berguna saat Anda membutuhkan gambar bulat itu sebagai file tersendiri.',
        ],
      },
      {
        h: 'Menempatkan wajah di bingkai',
        p: [
          'Lingkaran mempertahankan persegi tengah dari foto. Jika wajah berada di satu sisi, potong gambar dulu agar wajah ada di tengah, lalu bulatkan.',
          'Alat Potong gambar dengan bentuk 1:1 melakukannya dalam satu langkah.',
        ],
      },
      {
        h: 'Tips',
        p: [
          'Mulailah dari gambar yang lebarnya minimal beberapa ratus piksel. Gambar bulat sering ditampilkan kecil, tetapi tepi yang tajam memerlukan cukup banyak piksel sejak awal.',
          'Sisakan ruang di sekitar wajah. Lingkaran memotong sudut-sudutnya, jadi pemotongan yang terlalu rapat pada kepala bisa memangkas rambut atau dagu.',
        ],
      },
    ],
    faq: [
      { q: 'Bisakah saya membuat gambar lingkaran dengan latar transparan?', a: 'Bisa. Sudut di luar lingkaran tembus pandang pada PNG yang Anda unduh.' },
      { q: 'Bagaimana jika foto saya tidak persegi?', a: 'Lingkaran memakai persegi tengah dari gambar. Potong dulu jika Anda menginginkan bagian lain.' },
      { q: 'Apakah gambar saya diunggah?', a: 'Tidak. Gambar diproses di browser dan tetap di perangkat Anda.' },
    ],
  },
  'how-to-split-an-image-into-a-grid': {
    title: 'Cara memecah gambar menjadi kotak-kotak',
    seoTitle: 'Cara Memecah Gambar Menjadi Grid (Instagram, Puzzle)',
    description: 'Potong gambar menjadi baris dan kolom sama besar untuk posting grid atau puzzle, hingga 10 kali 10, lalu unduh ubinnya dalam ZIP. Di browser.',
    intro:
      'Untuk memecah gambar menjadi grid, letakkan gambar di alat Pecah gambar menjadi kotak-kotak, pilih jumlah baris dan kolom yang Anda inginkan, lalu tekan tombolnya. Setiap ubin disimpan sebagai gambar tersendiri, dan semuanya bisa diunduh dalam satu ZIP.',
    steps: [
      'Buka alat Pecah gambar menjadi kotak-kotak, lalu letakkan gambar Anda.',
      'Pilih jumlah baris dan kolom, hingga 10 kali 10.',
      'Tekan tombol "Split".',
      'Unduh ubinnya, atau semuanya dalam satu ZIP.',
    ],
    sections: [
      {
        h: 'Posting grid dan puzzle',
        p: [
          'Untuk grid media sosial, posting ubin dalam urutan yang benar agar menyambung di profil. Pecahan 3 kali 1 menghasilkan panorama lebar dalam tiga posting, dan 3 kali 3 menghasilkan sembilan persegi.',
          'Ubin dinamai menurut baris dan kolom, misalnya photo-r1-c2.jpg, sehingga Anda tahu potongan mana yang ditaruh di mana.',
        ],
      },
      {
        h: 'Tidak ada piksel yang hilang',
        p: [
          'Setiap piksel gambar masuk ke tepat satu ubin, jadi potongannya bisa disatukan kembali tanpa ada yang hilang atau ganda. Jika ukurannya tidak terbagi rata, ubin berbeda paling banyak satu piksel.',
          'Ubin mempertahankan format gambar. Buat dulu gambar berbentuk seperti yang Anda inginkan, karena gambar yang tinggi menghasilkan ubin yang tinggi.',
        ],
      },
      {
        h: 'Tips',
        p: [
          'Potong dulu gambar ke bentuk yang tepat. Grid 3 kali 3 paling bagus dari gambar persegi, dan panorama 3 kali 1 dari gambar lebar dengan lebar tiga kali tingginya.',
          'Unggah ubin dalam urutan terbalik jika situsnya menampilkan posting terbaru lebih dulu, agar menyambung dengan benar di profil. Periksa tampilannya di ponsel sebelum Anda membagikannya.',
        ],
      },
    ],
    faq: [
      { q: 'Bagaimana cara memecah foto untuk grid Instagram?', a: 'Pilih baris dan kolom yang cocok dengan grid Anda, misalnya 3 kali 3, lalu posting ubinnya secara berurutan.' },
      { q: 'Berapa banyak ubin yang bisa dibuat?', a: 'Hingga 10 baris dan 10 kolom.' },
      { q: 'Bagaimana ubin dinamai?', a: 'Menurut baris dan kolom, seperti name-r1-c1.jpg, sehingga Anda bisa mengurutkannya kembali.' },
    ],
  },
  'how-to-add-text-to-a-picture': {
    title: 'Cara menambahkan teks ke gambar',
    seoTitle: 'Cara Menambah Teks ke Gambar atau Foto Online (Gratis)',
    description: 'Tulis keterangan atau judul di atas gambar. Pilih posisi, ukuran, dan warna, dengan panel opsional di belakang teks. Diproses di browser.',
    intro:
      'Untuk menambah teks ke gambar, letakkan gambar di alat Tambah teks ke gambar, ketik hingga lima baris, pilih posisinya, atur ukuran dan warna, lalu tekan "Tambah teks". Panel gelap atau terang di belakang teks menjaganya tetap terbaca pada foto yang ramai.',
    steps: [
      'Buka alat Tambah teks ke gambar, lalu letakkan gambar Anda.',
      'Ketik teks Anda, hingga lima baris.',
      'Pilih salah satu dari sembilan posisi, ukuran, dan warna. Tambahkan "Panel gelap" atau "Panel terang" jika latarnya ramai.',
      'Tekan "Tambah teks" lalu unduh hasilnya.',
    ],
    sections: [
      {
        h: 'Membuat teks mudah dibaca',
        p: [
          'Teks di atas foto sulit dibaca jika latarnya punya area terang dan gelap. Panel opsional menaruh pita polos di belakang kata-kata, yang mengatasinya tanpa mengubah gambar.',
          'Ukuran dihitung sebagai bagian dari lebar gambar, jadi keterangan tampak sama di gambar kecil maupun besar.',
        ],
      },
      {
        h: 'Batas yang perlu diketahui',
        p: [
          'Anda bisa menambahkan hingga lima baris dengan masing-masing hingga 60 karakter. Untuk teks yang lebih panjang, buat gambarnya lebih besar atau pakai beberapa gambar.',
          'Pratinjau menampilkan gambar pertama, dan teks yang sama dipasang di setiap gambar yang Anda tambahkan.',
        ],
      },
      {
        h: 'Tips',
        p: [
          'Buat tetap singkat. Teks besar dan singkat terbaca di ponsel, dan ukurannya menyesuaikan gambar, jadi judul pendek biasanya tampak lebih baik daripada keterangan panjang.',
          'Pilih warna yang paling kontras dengan area di belakang teks, atau aktifkan panel. Periksa pratinjau pada ukuran kecil, karena begitulah kebanyakan orang akan melihatnya.',
        ],
      },
    ],
    faq: [
      { q: 'Berapa baris yang bisa saya tambahkan?', a: 'Hingga lima baris, masing-masing hingga 60 karakter.' },
      { q: 'Bisakah saya menaruh teks di banyak gambar?', a: 'Bisa. Teks yang sama dipasang di setiap gambar, dan Anda bisa mengunduh semuanya bersama.' },
      { q: 'Apakah gambar saya diunggah?', a: 'Tidak. Teks digambar di browser Anda.' },
    ],
  },
  'how-to-turn-a-photo-into-pixel-art': {
    title: 'Cara mengubah foto menjadi pixel art',
    seoTitle: 'Cara Mengubah Foto Menjadi Pixel Art (Gratis, di Browser)',
    description: 'Buat pixel art berpiksel besar dari foto apa pun. Pilih seberapa besar pikselnya dan berapa warna yang dipertahankan. Disimpan sebagai PNG.',
    intro:
      'Untuk mengubah foto menjadi pixel art, letakkan foto di Pembuat pixel art, geser penggeser untuk memilih berapa banyak piksel besar ke samping, lalu tekan "Make pixel art". Semakin sedikit piksel ke samping, semakin kasar hasilnya, dan hasilnya berupa PNG.',
    steps: [
      'Buka Pembuat pixel art, lalu letakkan gambar Anda.',
      'Geser penggeser untuk mengatur berapa banyak piksel besar ke samping. Lebih sedikit berarti lebih kasar.',
      'Jika mau, pilih "Retro" atau "Very few colours" untuk tampilan ala konsol game.',
      'Tekan "Make pixel art" lalu unduh PNG-nya.',
    ],
    sections: [
      {
        h: 'Menemukan tingkat kekasaran yang pas',
        p: [
          'Wajah paling bagus pada sekitar 32 sampai 64 piksel ke samping. Pemandangan tampak bagus dengan lebih banyak. Setiap piksel besar adalah warna rata-rata dari satu blok persegi pada foto.',
          'Pratinjau memakai kode yang sama dengan file yang disimpan, jadi apa yang Anda lihat adalah apa yang Anda dapat.',
        ],
      },
      {
        h: 'Membatasi warna',
        p: [
          '"Retro" mempertahankan enam gradasi untuk setiap warna dan "Very few colours" mempertahankan tiga, yang menghasilkan tampilan datar ala game. Pertahankan warna asli jika Anda ingin pikselnya tetap menyerupai fotonya.',
          'Hasilnya berupa PNG dengan ukuran sama seperti gambar Anda, karena JPG akan mengaburkan tepi tajam setiap piksel besar.',
        ],
      },
      {
        h: 'Tips',
        p: [
          'Mulailah dengan foto yang sederhana dan kontras tinggi. Wajah dengan latar polos jauh lebih tahan terhadap piksel besar daripada pemandangan jalan yang ramai.',
          'Coba beberapa pengaturan dan bandingkan. Beralih dari 48 ke 32 piksel ke samping mengubah tampilan secara besar, dan warna "Retro" bisa mengubah foto biasa menjadi tampak seperti layar game.',
        ],
      },
    ],
    faq: [
      { q: 'Mengapa hasilnya PNG?', a: 'PNG mempertahankan tepi tajam setiap piksel besar. JPG akan mengaburkannya.' },
      { q: 'Berapa piksel yang sebaiknya dipakai untuk wajah?', a: 'Sekitar 32 sampai 64 ke samping biasanya bekerja dengan baik.' },
      { q: 'Apakah gambar mempertahankan ukurannya?', a: 'Ya. Hasilnya berukuran sama dengan aslinya.' },
    ],
  },
  'how-to-merge-images-side-by-side': {
    title: 'Cara menggabungkan gambar berdampingan atau bertumpuk',
    seoTitle: 'Cara Menggabungkan Gambar Berdampingan atau Bertumpuk',
    description: 'Satukan dua gambar atau lebih menjadi satu, dalam baris atau kolom, dengan celah dan latar opsional. Disimpan sebagai PNG, JPG, atau WebP.',
    intro:
      'Untuk menggabungkan gambar, letakkan dua atau lebih di alat Gabungkan gambar berdampingan, atur urutannya, pilih berdampingan atau bertumpuk, lalu tekan "Join pictures". Gambar diskalakan ke tinggi atau lebar yang sama agar tidak ada yang dilarkan.',
    steps: [
      'Buka alat Gabungkan gambar berdampingan, lalu letakkan dua gambar atau lebih.',
      'Atur urutannya dengan "Up" dan "Down", dan hapus yang tidak Anda inginkan.',
      'Pilih berdampingan atau bertumpuk, celah di antaranya, dan latarnya.',
      'Tekan "Join pictures" lalu unduh hasilnya sebagai PNG, JPG, atau WebP.',
    ],
    sections: [
      {
        h: 'Menyamakan ukuran',
        p: [
          'Secara bawaan setiap gambar diskalakan ke tinggi terkecil yang sama (untuk baris) atau lebar terkecil yang sama (untuk kolom), jadi tidak ada gambar yang diperbesar hingga buram. Jika Anda lebih suka mempertahankan setiap gambar pada ukurannya sendiri, pilih opsi itu dan gambar akan diletakkan di tengah.',
          'Celah dan warna latar putih, hitam, atau transparan menyempurnakan tampilannya. Pilih transparan untuk PNG atau WebP.',
        ],
      },
      {
        h: 'Batas ukuran',
        p: [
          'Hasil di atas 100 megapiksel ditolak dengan pesan yang jelas, karena ponsel tidak akan sanggup menampungnya. Gunakan gambar yang lebih sedikit atau lebih kecil dalam kasus itu.',
          'Foto sebelum dan sesudah cocok sebagai satu baris berisi dua. Tumpukan tinggi tangkapan layar cocok sebagai kolom.',
        ],
      },
      {
        h: 'Tips',
        p: [
          'Potong dulu gambar Anda ke bentuk yang mirip. Gambar dengan tinggi sama sejajar rapi dalam satu baris, dan alat tidak perlu memperkecil apa pun.',
          'Gunakan celah kecil dan latar putih untuk sebelum dan sesudah yang bersih. Tanpa celah untuk panorama mulus dari gambar yang memang dimaksudkan menyambung.',
        ],
      },
    ],
    faq: [
      { q: 'Bagaimana cara menaruh dua foto berdampingan?', a: 'Letakkan keduanya, pilih berdampingan, lalu tekan "Join pictures".' },
      { q: 'Apakah gambar saya akan dilarkan?', a: 'Tidak. Gambar diskalakan ke tinggi atau lebar yang sama dengan proporsi tetap terjaga.' },
      { q: 'Bisakah saya mengubah urutannya?', a: 'Bisa. Gunakan "Up" dan "Down" pada setiap gambar di daftar.' },
    ],
  },
  'how-to-blur-or-hide-part-of-an-image': {
    title: 'Cara memburamkan atau menyembunyikan bagian gambar',
    seoTitle: 'Cara Memburamkan atau Menyembunyikan Bagian Gambar',
    description: 'Seret kotak ke atas nama, nomor, atau wajah lalu buramkan, pikselkan, atau tutup. Berjalan di browser, jadi aslinya tidak meninggalkan perangkat.',
    intro:
      'Untuk menyembunyikan bagian gambar, letakkan gambar di alat Buramkan atau sembunyikan bagian gambar, seret kotak ke atas nama, nomor, atau wajah, pilih "Blur", "Pixelate", atau "Cover", lalu tekan tombolnya. "Cover" adalah pilihan paling aman untuk apa pun yang sensitif.',
    steps: [
      'Buka alat Buramkan atau sembunyikan bagian gambar, lalu letakkan gambar Anda.',
      'Seret kotak ke setiap area yang ingin disembunyikan. Anda bisa menambah sebanyak yang diperlukan.',
      'Pilih "Blur", "Pixelate", atau "Cover" dengan warna solid.',
      'Tekan tombolnya lalu unduh gambar yang baru.',
    ],
    sections: [
      {
        h: 'Blur, pixelate, atau cover?',
        p: [
          'Blur ringan bisa membuat teks tetap terbaca sebagian, dan orang yang bertekad terkadang bisa memulihkan angka dari blur atau pikselasi yang lemah. "Cover" mengecat blok solid, yang tidak menyisakan apa pun untuk dipulihkan.',
          'Gunakan "Cover" untuk nomor kartu, nomor rekening, dan apa pun yang bersifat pribadi. Gunakan blur untuk wajah dan latar saat tampilan lebih penting daripada keamanan.',
        ],
      },
      {
        h: 'Kotak yang presisi dan banyak gambar',
        p: [
          'Setiap kotak juga punya isian angka untuk posisinya dalam persen, yang bekerja tanpa mouse dan memungkinkan Anda menggesernya dengan tepat. Pratinjau langsung memakai kode yang sama dengan file yang disimpan.',
          'Jika Anda meletakkan beberapa gambar, kotak yang sama berlaku untuk semuanya, yang cocok untuk tangkapan layar dengan tata letak yang sama. File asli Anda tidak pernah diubah.',
        ],
      },
      {
        h: 'Tips',
        p: [
          'Buat kotak sedikit lebih besar daripada yang Anda sembunyikan. Tepi huruf dan wajah menonjol keluar, dan kotak yang terlalu rapat bisa menyisakan sedikit bagian yang terlihat.',
          'Setelah menyimpan, buka gambar baru dan perbesar. Jika Anda masih bisa membaca atau mengenali sesuatu, jalankan lagi dengan "Cover". Dan ingat bahwa data lokasi tersembunyi terpisah dari apa yang terlihat, jadi bersihkan itu juga.',
        ],
      },
    ],
    faq: [
      { q: 'Apakah blur cukup untuk menyembunyikan nomor kartu?', a: 'Tidak. Blur ringan bisa terbaca sebagian. Gunakan "Cover", yang mengecat blok solid.' },
      { q: 'Bisakah saya menyembunyikan beberapa area?', a: 'Bisa. Tambahkan sebanyak kotak yang Anda perlukan.' },
      { q: 'Apakah gambar saya diunggah?', a: 'Tidak. Efeknya diterapkan di browser dan aslinya tetap di perangkat Anda.' },
    ],
  },
  'how-to-convert-pixels-to-cm-and-inches': {
    title: 'Cara mengonversi piksel ke sentimeter dan inci',
    seoTitle: 'Cara Mengonversi Piksel ke cm, mm, dan Inci (dengan DPI)',
    description: 'Hitung ukuran gambar di atas kertas dari piksel dan DPI-nya, atau berapa piksel yang dibutuhkan A4. Kalkulator gratis dengan ukuran kertas umum.',
    intro:
      'Untuk mengonversi piksel ke sentimeter, bagi piksel dengan DPI untuk mendapat inci, lalu kalikan 2,54. Pada 300 DPI, 1 cm sekitar 118 piksel, dan Konverter piksel, cm, dan inci menghitungnya untuk panjang dan resolusi apa pun.',
    steps: [
      'Buka Konverter piksel, cm, dan inci lalu ketik panjang yang Anda punya.',
      'Pilih satuannya: piksel, sentimeter, milimeter, atau inci.',
      'Pilih resolusi dalam DPI. Gunakan 300 untuk cetak foto dan 72 atau 96 untuk layar.',
      'Baca panjang yang sama dalam setiap satuan, beserta ukuran piksel kertas yang umum.',
    ],
    sections: [
      {
        h: 'Mengapa DPI penting',
        p: [
          'Piksel tidak punya ukuran fisik dengan sendirinya. 1200 piksel yang sama lebarnya 4 inci pada 300 DPI dan sekitar 16,7 inci pada 72 DPI. DPI menyatakan berapa banyak piksel yang muat dalam satu inci.',
          'Untuk mencetak, 300 DPI adalah target yang lazim untuk foto. 150 DPI cukup untuk draf, dan layar hanya peduli pada jumlah piksel.',
        ],
      },
      {
        h: 'Ukuran umum dalam piksel',
        p: [
          'Pada 300 DPI halaman A4 berukuran 2480 kali 3508 piksel, dan cetak foto 4 kali 6 inci berukuran 1200 kali 1800 piksel. Tabel di halaman menampilkan A4, A5, A3, US Letter, dan pas foto pada DPI yang Anda pilih.',
          'Mengubah pengaturan DPI sebuah file tidak mengubah pikselnya. Untuk mengubah ukuran sebenarnya dari gambar, gunakan alat Ubah ukuran gambar.',
        ],
      },
    ],
    faq: [
      { q: 'Berapa piksel 1 cm?', a: 'Pada 300 DPI sekitar 118 piksel, dan pada 96 DPI sekitar 38 piksel. Rumusnya: piksel = cm dibagi 2,54, dikali DPI.' },
      { q: 'Berapa piksel satu halaman A4?', a: 'Pada 300 DPI, A4 berukuran 2480 kali 3508 piksel. Pada 150 DPI ukurannya 1240 kali 1754.' },
      { q: 'Apakah ini mengubah gambar saya?', a: 'Tidak. Ini hanya kalkulator dan tidak memakai file apa pun.' },
    ],
  },
};
