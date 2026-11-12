import type { GuideLocale } from './types';
import { trGuidesA } from './tr-a';
import { trGuidesB } from './tr-b';
import { trGuidesC } from './tr-c';

/** Turkish guides: the page chrome and every guide's text. */
export const trGuides: GuideLocale = {
  chrome: {
    home: `Ana sayfa`,
    guides: `Nasıl yapılır rehberleri`,
    quickAnswer: `Kısa yanıt`,
    openTool: `{tool} aracını aç`,
    steps: `Adımlar`,
    commonQuestions: `Sık sorulan sorular`,
    writtenBy: `Basic App Company tarafından yazıldı. Araca göre en son {date} tarihinde kontrol edildi. Araç tarayıcınızda çalışır, bu yüzden görselleriniz yüklenmez.`,
    relatedGuides: `İlgili rehberler`,
    allGuides: `Tüm nasıl yapılır rehberleri`,
    hubTitle: `Görsel rehberleri: sıkıştırma, boyutlandırma, dönüştürme ve daha fazlası`,
    hubDescription: `İnsanların en çok aradığı görsel işleri için kısa, pratik rehberler: sıkıştırma, boyutlandırma, kırpma, dönüştürme, filigran, gizli verileri silme ve dahası. Her biri işi yapan ücretsiz araca bağlanır.`,
    hubBefore: `Görsel `,
    hubMark: `nasıl yapılır`,
    hubAfter: ` rehberleri`,
    hubIntro: `İnsanların en çok aradığı görsel işleri için kısa, pratik anlatımlar. Her biri önce yanıtı verir, sonra adımları sıralar ve işi tarayıcınızda yapan ücretsiz araca bağlanır.`,
    hubListName: `Görsel nasıl yapılır rehberleri`,
    hubListLabel: `Rehberler`,
  },
  guides: { ...trGuidesA, ...trGuidesB, ...trGuidesC },
};
