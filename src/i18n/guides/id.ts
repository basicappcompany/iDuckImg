import type { GuideLocale } from './types';
import { idGuidesA } from './id-a';
import { idGuidesB } from './id-b';
import { idGuidesC } from './id-c';

/** Indonesian guide text: the page chrome and all 25 guides. */
export const idGuides: GuideLocale = {
  chrome: {
    home: 'Beranda',
    guides: 'Panduan cara',
    quickAnswer: 'Jawaban singkat',
    openTool: 'Buka {tool}',
    steps: 'Langkah-langkah',
    commonQuestions: 'Pertanyaan umum',
    writtenBy: 'Ditulis oleh Basic App Company. Terakhir diperiksa terhadap alatnya pada {date}. Alat ini berjalan di browser Anda, jadi gambar Anda tidak diunggah.',
    relatedGuides: 'Panduan terkait',
    allGuides: 'Semua panduan cara',
    hubTitle: 'Panduan gambar: kompres, ubah ukuran, konversi, dan lainnya',
    hubDescription:
      'Panduan cara yang singkat dan praktis untuk tugas gambar yang paling sering dicari: kompres, ubah ukuran, potong, konversi, watermark, hapus data tersembunyi, dan lainnya. Masing-masing menaut ke alat gratisnya.',
    hubBefore: 'Panduan ',
    hubMark: 'cara',
    hubAfter: ' untuk gambar',
    hubIntro:
      'Penjelasan singkat dan praktis untuk tugas gambar yang paling sering dicari. Masing-masing memberi jawaban lebih dulu, lalu langkah-langkahnya, dan menaut ke alat gratis yang bekerja di browser Anda.',
    hubListName: 'Panduan cara untuk gambar',
    hubListLabel: 'Panduan',
  },
  guides: { ...idGuidesA, ...idGuidesB, ...idGuidesC },
};
