import type { ShortcutText } from './types';

export const tr: ShortcutText = {
  chrome: {
    howToUse: `Nasıl kullanılır`,
    related: `İlgili`,
    quickTools: `Hızlı araçlar`,
    community: `Topluluk`,
    alsoFrom: `iDuck’tan daha`,
    iduckpdf: `iDuckPDF: PDF araçları`,
    communityPages: {
      roadmap: `Yol haritası`,
      request: `Özellik iste`,
      feedback: `Geri bildirim gönder`,
      support: `iDuckIMG’i destekle`,
      settings: `Ayarlar`,
      about: `Hakkında`,
    },
    groups: {
      compress: `Sıkıştır ve boyutlandır`,
      convert: `Biçim dönüştür`,
      other: `Diğer biçimleri aç`,
      pdf: `PDF oluştur`,
      forms: `Formlar için fotoğraflar`,
      edit: `Hızlı düzenlemeler`,
    },
  },
  kb: {
    name: `Görseli {kb} KB’a sıkıştır`,
    title: `Görseli {kb} KB’a sıkıştır, ücretsiz online`,
    description: `JPG, PNG veya WebP fotoğrafı {kb} KB veya altına indirin; ücretsiz ve tarayıcınızda. Yükleme yok, kayıt yok, filigran yok.`,
    summary: `Fotoğrafı doğrudan tarayıcınızda {kb} KB veya altına indirin.`,
    quick: `Bir görseli {kb} KB’a sıkıştırmak için görseli bırakın ve "{run}" düğmesine basın: hedef zaten {kb} KB olarak ayarlı ve araç sığan en yüksek kaliteyi bulur. Cihazınızda çalışır, bu yüzden görsel asla yüklenmez.`,
    steps: [
      `JPG, PNG veya WebP görselinizi bırakın ya da panodan yapıştırın.`,
      `Hedef boyut zaten {kb} KB olarak ayarlı ve piksel boyutu korunur.`,
      `"{run}" düğmesine basın. Araç farklı kalite düzeylerini dener ve sığan en iyisini tutar.`,
      `Listede sonucun boyutuna bakın, sonra indirin.`,
    ],
    faqs: [
      {
        q: `Fotoğrafı kötü görünmeden {kb} KB altına nasıl indiririm?`,
        a: `Önce piksel boyutuna dokunmayın. Araç, dosya {kb} KB veya altına inene kadar JPG ya da WebP kalitesini adım adım düşürür. Bu yetmezse genişliği de azaltmanız gerekir.`,
      },
      {
        q: `Görselim bir yere yükleniyor mu?`,
        a: `Hayır. Sıkıştırma tarayıcı sekmenizin içinde çalışır. Dosya sunucularımıza gönderilmez, bu yüzden özel fotoğraf ve belgeler için de uygundur.`,
      },
      {
        q: `Sonuç {kb} KB’tan büyük. Şimdi ne yapmalı?`,
        a: `Görselde, kabul edilebilir kalitede {kb} KB’a sığması için çok fazla piksel var. Yeniden boyutlandırma aracını açın, daha küçük bir genişlik seçin (örneğin 800 piksel), hedefi {kb} KB’ta tutun ve yeniden çalıştırın.`,
      },
    ],
  },
  convert: {
    name: `{from} → {to}`,
    h1: `{from} → {to} dönüştürücü`,
    title: `{from} → {to}: ücretsiz online dönüştürücü`,
    description: `{from} dosyalarını tarayıcınızda ücretsiz {to} biçimine çevirin. Yükleme yok, kayıt yok, filigran yok. Telefonda ve bilgisayarda çalışır.`,
    summary: `{from} dosyalarını birkaç saniyede {to} yapın.`,
    quick: `{from} dosyasını {to} biçimine çevirmek için {from} dosyalarınızı bırakın, biçimin {to} olduğundan emin olun ve "{run}" düğmesine basın. {why} Her şey tarayıcınızda olur, bu yüzden hiçbir şey yüklenmez.`,
    steps: [
      `{from} dosyalarınızı bırakın ya da seçmek için alana dokunun. Birçok dosyayı bir kerede ekleyebilirsiniz.`,
      `Çıktı biçimi zaten {to} olarak ayarlı.`,
      `"{run}" düğmesine basın.`,
      `Her dosyayı tek tek ya da hepsini tek bir ZIP olarak indirin.`,
    ],
    faqs: [
      {
        q: `Özel görselleri burada dönüştürmek güvenli mi?`,
        a: `Dönüştürme tarayıcınızın içinde çalışır, yani görseller sunucularımıza yüklenmez.`,
      },
      {
        q: `Birçok dosyayı bir kerede dönüştürebilir miyim?`,
        a: `Evet. Cihazınızın kaldırabildiği kadar dosya ekleyin ve hepsini birlikte ZIP olarak indirin.`,
      },
    ],
  },
  why: {
    'heic-to-jpg': `HEIC, iPhone’ların varsayılan biçimidir; JPG ise her cihazda ve web sitesinde açılır.`,
    'heic-to-png': `PNG her pikseli olduğu gibi korur ve her yerde açılır.`,
    'png-to-jpg': `Fotoğraflarda JPG dosyaları genellikle PNG’den çok daha küçüktür.`,
    'jpg-to-png': `PNG kayıpsızdır, bu yüzden düzenleyip yeniden kaydetmek için güvenli bir biçimdir.`,
    'webp-to-jpg': `JPG her programda açılır; bazı düzenleyiciler ve formlar ise hâlâ WebP’yi reddeder.`,
    'webp-to-png': `PNG saydamlığı korur ve her düzenleyicide açılır.`,
    'jpg-to-webp': `WebP, benzer kalitede genellikle JPG’den yüzde 25 ila 35 daha küçüktür ve sayfalar daha hızlı yüklenir.`,
    'png-to-webp': `WebP, PNG’den çok daha küçüktür ve saydamlığı koruyabilir.`,
    'jpg-to-pdf': `Her görsel bir PDF sayfası olur; sayfa, görselle aynı boyutta olur.`,
    'png-to-pdf': `Her görsel bir PDF sayfası olur.`,
    'avif-to-jpg': `JPG, AVIF gösteremeyen formlar, düzenleyiciler ve eski telefonlar dahil her yerde açılır.`,
    'avif-to-png': `PNG her düzenleyicide açılır ve saydam arka planı korur.`,
    'svg-to-png': `PNG, her program, form veya sosyal sitenin kabul ettiği sıradan bir görseldir ve saydam arka planı korur.`,
    'svg-to-jpg': `JPG küçük ve evrensel bir fotoğraf biçimidir; SVG kaydedilmeden önce keskin çizilir.`,
    'bmp-to-jpg': `BMP sıkıştırılmadan saklanır, bu yüzden JPG genellikle boyutunun küçük bir kısmı kadardır.`,
    'gif-to-png': `GIF’in saydam arka planı koruyan keskin bir sabit görselini alırsınız.`,
  },
  exam: {
    name: `{short}: {what} boyutu`,
    title: `{short}: {what} boyutu, px ve KB`,
    description: `{what} dosyanızı {short} için {req} boyutuna getirin. Resmî duyuruya göre. Ücretsiz, tarayıcınızda, yükleme yok.`,
    summary: `{short} {what} dosyanızı {size} boyutuna getirin.`,
    quick: `{short} için {what} dosyanızı yeniden boyutlandırmak üzere bırakın ve "{run}" düğmesine basın: araç zaten resmî duyurudaki gibi {req} olarak ayarlı. Tarayıcınızda çalışır, bu yüzden görsel asla yüklenmez.`,
    steps: [
      `{what} dosyanızı bırakın ya da seçmek için alana dokunun. iPhone’dan HEIC fotoğrafları da çalışır.`,
      `{exam} ve {doc} zaten seçili, bu yüzden boyut {req} olarak ayarlı.`,
      `"{run}" düğmesine basın.`,
      `Listede boyuta bakın, JPG’yi indirin ve forma yükleyin.`,
    ],
    faqs: [
      {
        q: `{short} için {what} boyutu ne olmalı?`,
        a: `{exam}, {req} ister. Bu, {source} ({location}) kaynağından gelir.`,
      },
      {
        q: `Dosya doğru boyuta nasıl ulaşır?`,
        a: `Boyuta uydurulur ve üst sınırın altında kalan en iyi kalitede JPG olarak kaydedilir. Her şey tarayıcınızda olur, bu yüzden görsel asla yüklenmez.`,
      },
      {
        q: `Bu rakamlar hâlâ güncel mi?`,
        a: `Rakamlar {date} tarihinde resmî belgeden okundu ({cycle} için). Kendi duyurunuzu kontrol edin, çünkü sınavlar kurallarını dönemler arasında değiştirir.`,
      },
    ],
  },
  docs: { photo: `fotoğraf`, signature: `imza`, 'left-thumb': `sol başparmak izi`, declaration: `beyan` },
};
