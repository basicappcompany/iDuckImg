import type { GuideText } from './types';

/** Turkish text of guides 1 to 8 (see src/lib/guides-a.ts). */
export const trGuidesA: Record<string, GuideText> = {
  'how-to-compress-an-image': {
    title: `Kaliteden ödün vermeden görsel nasıl sıkıştırılır`,
    seoTitle: `Görsel Kalite Kaybı Olmadan Nasıl Sıkıştırılır (Ücretsiz)`,
    description: `JPG, PNG ve WebP dosyalarını tarayıcınızda küçültün. Kaliteyi seçin, önce ve sonra boyutlarını görün, indirin. Yükleme yok, kayıt yok.`,
    intro: `Bir görseli sıkıştırmak için Görselleri sıkıştır aracına bırakın, kaliteyi 75 civarında tutun ve "Sıkıştır" düğmesine basın. Fotoğraflar çoğunlukla gözle görülür bir fark olmadan epey küçülür ve görsel cihazınızdan hiç çıkmaz.`,
    steps: [
      `Görselleri sıkıştır aracını açın ve JPG, PNG veya WebP dosyalarınızı bırakın ya da panodan yapıştırın.`,
      `Kaliteyi ayarlayın. Yaklaşık 75, fotoğrafın aynı görünmesini sağlarken dosyayı epey küçültür.`,
      `"Sıkıştır" düğmesine basın ve her dosyanın yanındaki önceki ve sonraki boyuta bakın.`,
      `Her dosyayı ayrı ayrı veya hepsini tek bir ZIP olarak indirin.`,
    ],
    sections: [
      {
        h: `Her dosya türünde ne değişir`,
        p: [
          `JPG ve WebP, ayarlanabilir bir kaliteyle sıkıştırılır; yani düşük sayı daha küçük dosya ve biraz daha az ayrıntı demektir. Telefon fotoğrafları çoğu zaman 3 ila 8 MB'dır ve bunun büyük bölümü gözle görülür bir fark olmadan atılabilir.`,
          `PNG farklıdır. Hiçbir şey kaybedilmeden optimize edilir; görsel birebir aynı kalır ama kazanç daha azdır. PNG aslında bir fotoğrafsa, JPG'ye veya WebP'ye çevirmek çok daha fazla yer kazandırır.`,
        ],
      },
      {
        h: `Tam bir boyut gerekiyorsa`,
        p: [
          `Formlar sık sık fotoğrafın belirli bir kilobayt sayısının altında olmasını ister. Bunun için Görselleri yeniden boyutlandır aracındaki hedef dosya boyutu kutusunu kullanın veya 100 KB'a sıkıştırma gibi hazır bir sayfa açın. Araç farklı kalite düzeylerini dener ve sığan en iyisini tutar.`,
          `Bir dosya daha fazla küçültülemiyorsa, daha kötü bir sürüm yerine özgün dosyayı geri alırsınız.`,
        ],
      },
    ],
    faq: [
      { q: `Görseli sıkıştırmak kalitesini düşürür mü?`, a: `JPG ve WebP, kalite düştükçe az miktarda ayrıntı kaybeder; 75 civarında değişiklik zor fark edilir. PNG hiçbir kayıp olmadan optimize edilir.` },
      { q: `Görselimi sıkıştırırken yüklenmiş olur mu?`, a: `Hayır. İş tarayıcınızda, kendi cihazınızda yapılır; dosya hiçbir yere gönderilmez.` },
      { q: `Birçok görseli aynı anda sıkıştırabilir miyim?`, a: `Evet. İstediğiniz kadar ekleyin ve hepsini ZIP olarak birlikte indirin.` },
    ],
  },
  'how-to-resize-an-image': {
    title: `Görsel piksel, yüzde veya dosya boyutuna göre nasıl yeniden boyutlandırılır`,
    seoTitle: `Görsel Yeniden Boyutlandırma: Piksel, Yüzde veya KB`,
    description: `Bir görseli tam piksel boyutuna, yüzdeye veya KB cinsinden hedef dosya boyutuna getirin. Oranı korur, tarayıcınızda çalışır, yükleme yok.`,
    intro: `Bir görseli yeniden boyutlandırmak için Görselleri yeniden boyutlandır aracına bırakın, piksel cinsinden genişlik veya yükseklik yazın ya da bir yüzde seçin ve "Yeniden boyutlandır" düğmesine basın. Bir kutuyu boş bırakırsanız diğeri hesaplanır, böylece görsel bozulmaz.`,
    steps: [
      `Görselleri yeniden boyutlandır aracını açın ve JPG, PNG veya WebP dosyalarınızı bırakın.`,
      `Genişlik, yükseklik veya yüzde yazın. Oranı korumak için bir kutuyu boş bırakın.`,
      `Bir form dosya boyutu istiyorsa KB cinsinden bir hedef yazın, örneğin 100.`,
      `"Yeniden boyutlandır" düğmesine basın ve sonucu veya tüm dosyaları ZIP olarak indirin.`,
    ],
    sections: [
      {
        h: `Piksel mi, yüzde mi, kilobayt mı?`,
        p: [
          `Piksel, 1200 x 800 gibi bir boyut isteyen yerler içindir. Sadece küçültmek istiyorsanız yüzde daha hızlıdır, örneğin yüzde 50. KB cinsinden hedef, yükleme sınırları içindir; araç sığan en iyi kaliteyi bulur.`,
          `Hedef boyut JPG ve WebP için çalışır. Hedef boyut verilen bir PNG, WebP olarak kaydedilir; çünkü PNG kayıpsızdır ve kaliteyi boyutla takas edemez.`,
        ],
      },
      {
        h: `Hedef çok küçükse`,
        p: [
          `İstediğiniz boyuta seçtiğiniz piksel boyutunda ulaşılamıyorsa, yanlış bir dosya yerine bir mesaj görürsünüz. Daha az piksel deneyin, sonra hedefi yeniden deneyin.`,
          `Bir görseli büyütmek ayrıntı eklemez. Görsel yalnızca genişletilir ve yumuşak görünebilir; bu yüzden küçültmek güvenli yöndür.`,
        ],
      },
    ],
    faq: [
      { q: `Görseli bozmadan nasıl yeniden boyutlandırırım?`, a: `Yalnızca genişliği veya yalnızca yüksekliği doldurun. Diğer kenar, özgün orandan hesaplanır.`},
      { q: `Tam 100 KB'a yeniden boyutlandırabilir miyim?`, a: `Evet. Hedef boyut olarak 100 yazın. Araç bunun altına sığan en yüksek kaliteyi seçer ya da ulaşamazsa size söyler.` },
      { q: `Yeniden boyutlandırmak fotoğrafımı yükler mi?`, a: `Hayır. Tarayıcınızda çalışır ve dosya cihazınızda kalır.` },
    ],
  },
  'how-to-crop-an-image': {
    title: `Görsel istediğiniz alana tam olarak nasıl kırpılır`,
    seoTitle: `Görsel Nasıl Kırpılır: Sürükleyin, Oran veya Tam Piksel`,
    description: `Bir kutu sürükleyerek, 1:1 veya 16:9 gibi bir oranı sabitleyerek ya da tam piksel yazarak görseli kırpın. Ücretsiz, tarayıcınızda, yükleme yok.`,
    intro: `Bir görseli kırpmak için Görselleri kırp aracına bırakın, kutuyu tutmak istediğiniz bölümün üzerine sürükleyin ve "Kırp" düğmesine basın. Oranları sabitlemek için 1:1 veya 16:9 gibi bir şekil seçin ya da tam piksel yazın.`,
    steps: [
      `Görselleri kırp aracını açın ve bir JPG, PNG veya WebP görsel bırakın.`,
      `Kutuyu ve tutamaçlarını istediğiniz bölümün üzerine sürükleyin. Gerekirse 1:1 veya 16:9 gibi bir oran seçin.`,
      `Ya da tam kırpma için sol, üst, genişlik ve yüksekliği piksel olarak yazın.`,
      `"Kırp" düğmesine basın ve sonucu indirin.`,
    ],
    sections: [
      {
        h: `Oran seçmek`,
        p: [
          `Oran, kutuyu taşırken ve boyutlandırırken sabit bir şekilde tutar. Kare profil fotoğrafı için 1:1, video küçük resimleri ve slaytlar için 16:9, fotoğraf baskıları için 4:3 veya 3:2 kullanın.`,
          `Bir yerin hangi şekli istediğinden emin değilseniz, en-boy oranı hesaplayıcı genişlik ve yüksekliği bir orana çevirir.`,
        ],
      },
      {
        h: `Fare olmadan hassas kontrol`,
        p: [
          `Kutuyu ok tuşlarıyla taşıyabilir ve tam değerler yazabilirsiniz; bu, sürüklemenin zor olduğu telefonda da işe yarar. Kırpılan görsel özgün biçimini korur.`,
          `Kırpma, indirdiğiniz dosyada dış alanı kalıcı olarak kaldırır; bu yüzden geri istemeniz ihtimaline karşı özgün dosyanızı saklayın. Araç bıraktığınız dosyaya hiç dokunmadığı için her zaman ondan yeniden başlayıp farklı bir kutu deneyebilirsiniz.`,
        ],
      },
    ],
    faq: [
      { q: `Kareye nasıl kırparım?`, a: `1:1 şeklini seçin ve kutuyu istediğiniz bölümün üzerine getirin. Kutu, boyutlandırırken kare kalır.` },
      { q: `Tam piksel olarak kırpabilir miyim?`, a: `Evet. Sol, üst, genişlik ve yüksekliği piksel olarak yazın.` },
      { q: `Kırpmak kaliteyi düşürür mü?`, a: `Tuttuğunuz pikseller değişmez. JPG ve WebP yüksek kalitede yeniden kaydedilir, PNG ise kayıpsız kalır.` },
    ],
  },
  'how-to-add-a-watermark-to-a-photo': {
    title: `Fotoğrafa metin filigranı nasıl eklenir`,
    seoTitle: `Fotoğrafa Metin Filigranı Ekleme (Ücretsiz, Yükleme Yok)`,
    description: `Görsellere adınızı veya bir telif hakkı satırı ekleyin. Konum, boyut, opaklık ve rengi seçin ya da görselin her yerine tekrarlayın. Tarayıcınızda.`,
    intro: `Bir fotoğrafa filigran eklemek için Filigran ekle aracına bırakın, metninizi yazın, nereye geleceğini seçin ve "Filigran ekle" düğmesine basın. Bir köşeye koyabilir veya tüm görselin üzerine tekrarlayabilirsiniz.`,
    steps: [
      `Filigran ekle aracını açın ve JPG, PNG veya WebP görsellerinizi bırakın.`,
      `Metninizi yazın, örneğin adınızı veya bir telif hakkı satırını.`,
      `Konumu, boyutu, opaklığı ve rengi seçin. Önizleme siz değiştirdikçe güncellenir.`,
      `"Filigran ekle" düğmesine basın ve her dosyayı veya hepsini ZIP olarak indirin.`,
    ],
    sections: [
      {
        h: `Okunaklı ama çirkin olmayan bir filigran`,
        p: [
          `Boyut, görsel genişliğinin bir yüzdesidir; bu yüzden filigran küçük bir fotoğrafta da büyük bir fotoğrafta da aynı görünür. Zıt renkteki yumuşak bir kenar, beyaz metnin açık alanlarda, siyah metnin koyu alanlarda okunaklı kalmasını sağlar.`,
          `Yaklaşık yüzde 60 opaklık iyi bir başlangıçtır. Filigran görselle yarışıyorsa düşürün, mutlaka görülmesi gerekiyorsa yükseltin.`,
        ],
      },
      {
        h: `Filigran neler yapabilir, neler yapamaz`,
        p: [
          `Görünür bir filigran kopyalamayı caydırır ama engellemez. Kararlı biri onu kırpabilir veya düzenleyip çıkarabilir. Ortaya yakın koymak ya da görselin her yerine tekrarlamak bunu zorlaştırır.`,
          `Eklediğiniz her görsele aynı filigran uygulanır ve JPG ile WebP yüksek kalitede yeniden kaydedilir.`,
        ],
      },
    ],
    faq: [
      { q: `Birçok fotoğrafa aynı anda filigran ekleyebilir miyim?`, a: `Evet. Hepsini ekleyin, ilkinin önizlemesine bakın; her görsele aynı göreli boyutta aynı filigran eklenir.` },
      { q: `Biri filigranımı kaldırabilir mi?`, a: `Kararlı biri onu kırpabilir veya düzenleyip çıkarabilir. Tüm görsele tekrarlanan bir filigranı kaldırmak, köşedeki bir filigrandan daha zordur.` },
      { q: `Metin yerine logo kullanabilir miyim?`, a: `Evet, PNG, JPG veya WebP görseli aynı şekilde yerleştiren Görsellere logo ekle aracıyla.` },
    ],
  },
  'how-to-add-a-logo-to-a-photo': {
    title: `Fotoğrafa logonuzu nasıl koyarsınız`,
    seoTitle: `Fotoğrafa veya Görsele Logo Ekleme (Ücretsiz, Yükleme Yok)`,
    description: `Logonuzu bir görsele veya birçoğuna ekleyin. Konumu, boyutu ve opaklığı seçin ya da görselin her yerine tekrarlayın. Tarayıcınızda çalışır.`,
    intro: `Bir fotoğrafa logo eklemek için görseli Görsellere logo ekle aracına bırakın, logo dosyanızı seçin, nereye geleceğini belirleyin ve "Logo ekle" düğmesine basın. Saydam arka planlı bir PNG logo en iyi sonucu verir.`,
    steps: [
      `Görsellere logo ekle aracını açın ve JPG, PNG veya WebP görsellerinizi bırakın.`,
      `Logo dosyanızı seçin. Saydam arka planlı bir PNG en temiz sonucu verir.`,
      `Dokuz konumdan birini seçin ya da tekrarlayın, sonra boyutu ve opaklığı ayarlayın.`,
      `"Logo ekle" düğmesine basın ve dosyaları veya hepsini ZIP olarak indirin.`,
    ],
    sections: [
      {
        h: `Temiz bir logo elde etmek`,
        p: [
          `JPG bir logo beyaz kutusunu korur, bu yüzden fotoğrafın üzerinde beyaz bir dikdörtgen olarak görünür. Bunun yerine logonuzu saydam arka planlı bir PNG veya WebP olarak dışa aktarın.`,
          `SVG logolar henüz desteklenmiyor; çünkü tarayıcı onları arka plandaki çalışanda çizemez. Önce büyük boyutlu bir PNG dışa aktarın.`,
        ],
      },
      {
        h: `Boyut ve yerleşim`,
        p: [
          `Logo kendi oranını korur ve boyutu görsel genişliğinin bir yüzdesidir; bu yüzden bir toplu işteki her fotoğrafta aynı görünür. Sığmayacak kadar büyük olursa kesilmek yerine küçültülür.`,
          `Sakin bir marka işareti için köşeyi, kaldırılmasını zorlaştırmak istediğinizde ise ortayı veya tekrar seçeneğini kullanın.`,
        ],
      },
      {
        h: `Profesyonel bir sonuç için ipuçları`,
        p: [
          `Logoyu küçük ve tutarlı tutun. Görsel genişliğinin yaklaşık yüzde 10 ila 20'si genellikle yeterlidir ve her fotoğrafta aynı köşeyi kullanmak bir seti bütünlüklü gösterir.`,
          `Büyük bir toplu işe başlamadan önce önizlemeyi açık bir fotoğrafta ve koyu bir fotoğrafta kontrol edin. Logo bunlardan birinde kayboluyorsa opaklığı yükseltin ya da kullanmadan önce logoya açık renkli bir dış çizgi ekleyin.`,
        ],
      },
    ],
    faq: [
      { q: `Hangi logo dosyaları çalışır?`, a: `PNG, JPG ve WebP. Saydam bir PNG veya WebP en iyi sonucu verir. SVG henüz desteklenmiyor.` },
      { q: `Logom veya fotoğrafım yükleniyor mu?`, a: `Hayır. İkisi de tarayıcınızda birleştirilir ve cihazınızda kalır.` },
      { q: `Logoyu birçok fotoğrafa koyabilir miyim?`, a: `Evet. Aynı logo her görsele aynı göreli boyutta eklenir.` },
    ],
  },
  'how-to-resize-a-photo-and-signature-for-an-exam-form': {
    title: `Sınav formu için fotoğraf ve imza nasıl yeniden boyutlandırılır`,
    seoTitle: `Sınav Formu için Fotoğraf ve İmza Boyutlandırma (KB ve px)`,
    description: `Fotoğraf, imza veya baş parmak izini, resmi duyurulardaki gereksinimlere göre bir sınav formunun istediği tam piksel ve KB değerine getirin.`,
    intro: `Bir sınav formu için fotoğrafı yeniden boyutlandırmak üzere Sınav için fotoğraf ve imza boyutlandırma aracında sınavınızı ve belgeyi seçin, görselinizi bırakın ve "Make my file" düğmesine basın. Tam piksel boyutunda ve izin verilen KB aralığında bir JPG alırsınız.`,
    steps: [
      `Sınav için fotoğraf ve imza boyutlandırma aracını açın, sınavınızı ve belgeyi seçin; örneğin "Photograph" veya "Signature".`,
      `Gösterilen gereksinimleri kontrol edin. Her birinde resmi duyuruya bir bağlantı ve onu okuduğumuz tarih vardır.`,
      `Fotoğrafınızı veya taramanızı bırakın. iPhone'dan HEIC fotoğraflar da çalışır.`,
      `"Make my file" düğmesine basın, listedeki boyuta bakın ve JPG'yi indirin.`,
    ],
    sections: [
      {
        h: `Hangi sınavlar kapsanıyor`,
        p: [
          `Şu anda araçta IBPS PO/MT (fotoğraf, imza, sol baş parmak izi ve el yazısı beyan) ile SSC CGL 2026 imzası var. Her sayı resmi bir duyurudan gelir ve her hazır ayar kaynağını ve onu ne zaman okuduğumuzu gösterir.`,
          `Sınavınız listede yoksa "Other exam" seçeneğini seçin ve kendi duyurunuzdaki genişlik, yükseklik ve KB sınırlarını yazın.`,
        ],
      },
      {
        h: `Her zaman kendi duyurunuzu kontrol edin`,
        p: [
          `Sınav kuralları dönemden döneme değişir; bu yüzden yüklemeden önce sayıları güncel duyurunuzla karşılaştırın. Araç, okunduğu duyuru kadar günceldir.`,
          `Görsel, tam piksel boyutuna göre kesilir veya doldurulur, sonra üst sınırın altına sığan en iyi kalitede kaydedilir. Basit bir görsel alt sınırın altında çıkarsa, ona ulaşması için dosyaya zararsız dolgu verisi eklenir. Görselin kendisi değişmez.`,
        ],
      },
    ],
    faq: [
      { q: `Boyutlar resmi mi?`, a: `Evet, resmi duyurulardan kopyalanmıştır; her hazır ayar belgeye bağlanır ve onu ne zaman okuduğumuzu söyler. Kendi döneminiz için duyuruyu da kontrol edin.` },
      { q: `Sınavım listede yoksa ne olur?`, a: `"Other exam" seçeneğini seçin ve duyurunuzdaki piksel boyutunu ve KB aralığını girin.` },
      { q: `Fotoğrafım yükleniyor mu?`, a: `Hayır. Tarayıcınızda yeniden boyutlandırılır ve cihazınızdan hiç çıkmaz.` },
    ],
  },
  'how-to-convert-images-between-jpg-png-webp-and-heic': {
    title: `Görseller JPG, PNG, WebP ve HEIC arasında nasıl dönüştürülür`,
    seoTitle: `Görsel Dönüştürme: JPG, PNG, WebP, HEIC ve PDF (Ücretsiz)`,
    description: `iPhone HEIC fotoğraflarını açın, JPG, PNG ve WebP arasında geçiş yapın veya PDF oluşturun. Tarayıcınızda çalışır, yükleme ve kayıt yok.`,
    intro: `Bir görseli dönüştürmek için Görselleri dönüştür aracına bırakın, biçim olarak JPG, PNG, WebP veya PDF seçin ve "Dönüştür" düğmesine basın. iPhone'dan HEIC fotoğraflar ile AVIF, SVG, GIF ve BMP dosyaları da girdi olarak açılır.`,
    steps: [
      `Görselleri dönüştür aracını açın ve dosyalarınızı bırakın. Birçoğunu aynı anda ekleyebilirsiniz.`,
      `Çıktı biçimini seçin: JPG, PNG, WebP veya PDF.`,
      `"Dönüştür" düğmesine basın.`,
      `Her dosyayı ayrı ayrı veya hepsini tek bir ZIP olarak indirin.`,
    ],
    sections: [
      {
        h: `Hangi biçimi seçmeli`,
        p: [
          `JPG, fotoğraflar için güvenli seçimdir ve yükleme formları dahil her yerde açılır. PNG keskin kenarları ve saydam arka planları korur, bu yüzden logolara ve ekran görüntülerine uygundur. WebP genellikle ikisinden de küçüktür ve her güncel tarayıcıda çalışır.`,
          `JPG saydam olamaz; bu yüzden JPG'ye dönüştürürken saydam alan beyazla doldurulur.`,
        ],
      },
      {
        h: `HEIC, AVIF, SVG, GIF ve BMP`,
        p: [
          `iPhone'lar fotoğrafları HEIC olarak kaydeder; birçok uygulama ve site bunu açamaz. JPG'ye dönüştürün, her yerde çalışsın. İlk HEIC dosyası yaklaşık 2 MB'lık bir çözücü yükler, bu yüzden başlaması biraz sürebilir. HEIC yalnızca girdi içindir.`,
          `GIF yalnızca ilk karesini korur, SVG uzun kenarında en az 1024 piksel olacak şekilde çizilir ve AVIF'i açabilen bir tarayıcı gerekir. Bunlar önce tarayıcınızda PNG'ye çevrilir.`,
        ],
      },
    ],
    faq: [
      { q: `HEIC'i JPG'ye nasıl dönüştürürüm?`, a: `HEIC dosyasını araca bırakın, biçimi JPG'de bırakın ve "Dönüştür" düğmesine basın. Tarayıcınızda çalışır.` },
      { q: `Dönüştürmek kaliteyi düşürür mü?`, a: `PNG kayıpsızdır. JPG ve WebP kayıplıdır ama yüksek kalitede kaydedilir; bu yüzden bir fotoğrafta değişiklik zor fark edilir.` },
      { q: `PDF oluşturabilir miyim?`, a: `Evet, PDF'i seçin; her görsel için bir PDF alırsınız. Birkaç görseli tek bir PDF'e koymak için Görselleri PDF'te birleştir aracını kullanın.` },
    ],
  },
  'how-to-combine-images-into-one-pdf': {
    title: `Görseller tek bir PDF'te nasıl birleştirilir`,
    seoTitle: `Görselleri Tek PDF'te Birleştirme (Ücretsiz, Sayfa Sırası)`,
    description: `Birkaç JPG, PNG veya WebP görseli tek bir PDF'e koyun, sayfa sırasını ve A4 ya da görsel boyutunda sayfaları seçin. Tarayıcınızda çalışır.`,
    intro: `Görselleri tek bir PDF'te birleştirmek için bunları Görselleri PDF'te birleştir aracına bırakın, "Yukarı" ve "Aşağı" ile sıraya koyun, sayfa stilini seçin ve "PDF oluştur" düğmesine basın. Her görsel bir sayfa olur.`,
    steps: [
      `Görselleri PDF'te birleştir aracını açın ve görsellerinizi bırakın. İstediğiniz zaman daha fazlasını ekleyebilirsiniz.`,
      `"Yukarı" ve "Aşağı" ile istediğiniz sıraya koyun, gerekmeyenleri kaldırın.`,
      `Kenar boşluklu A4'ü ya da her görselin boyutuna uyan sayfaları seçin.`,
      `"PDF oluştur" düğmesine basın ve dosyayı indirin.`,
    ],
    sections: [
      {
        h: `A4 sayfalar veya görsel boyutunda sayfalar`,
        p: [
          `Kenar boşluklu A4, PDF'i yazdıracağınız veya belge olarak göndereceğiniz durumlarda en iyisidir; çünkü her sayfa aynı boyuttadır. Görsel boyutuna uyan sayfalar, görseller farklı şekillerdeyse ve beyaz boşluk istemiyorsanız daha iyidir.`,
          `Görseller esnetilmez. Sayfaya sığacak şekilde ölçeklenir ve ortalanır.`,
        ],
      },
      {
        h: `PDF'i küçük tutmak`,
        p: [
          `PDF, içine koyulan görseller kadar küçük olur. E-postayla göndermek için fazla büyükse önce görselleri sıkıştırın, sonra birleştirin.`,
          `Saydam bir alan sayfada beyaz görünür. Hepsi için tek PDF yerine görsel başına ayrı bir PDF istiyorsanız, Görselleri dönüştür aracını biçim olarak PDF ile kullanın.`,
        ],
      },
      {
        h: `Derli toplu bir PDF için ipuçları`,
        p: [
          `Yan yatık fotoğrafları önce Döndür ve çevir aracıyla döndürün; böylece her sayfa dik olur. Sayfaları sonradan düzeltmektense görselleri düzeltmek çok daha kolaydır.`,
          `Dosyalarınıza sıralanacak şekilde ad verin, sonra "PDF oluştur" düğmesine basmadan önce listedeki sırayı kontrol edin. Sayfalar listeyi yukarıdan aşağıya izler.`,
        ],
      },
    ],
    faq: [
      { q: `Sayfa sırasını değiştirebilir miyim?`, a: `Evet. Her görselin yanındaki "Yukarı" ve "Aşağı" düğmelerini kullanın, gerekmeyenleri kaldırın.` },
      { q: `iPhone fotoğraflarıyla çalışır mı?`, a: `Evet. HEIC fotoğraflar girdi olarak açılır ve PDF'e konur.` },
      { q: `Görsellerim yükleniyor mu?`, a: `Hayır. PDF tarayıcınızda oluşturulur ve cihazınızdan hiç çıkmaz.` },
    ],
  },
};
