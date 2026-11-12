import type { GuideText } from './types';

/** Turkish text of guides 18 to 25 (see src/lib/guides-c.ts). */
export const trGuidesC: Record<string, GuideText> = {
  'how-to-calculate-an-aspect-ratio': {
    title: `En-boy oranı nasıl hesaplanır`,
    seoTitle: `En-Boy Oranı Nasıl Hesaplanır (16:9, 4:3, 1:1)`,
    description: `Herhangi bir genişlik ve yüksekliğin en-boy oranını bulun ya da bir oran için eşleşen yüksekliği veya genişliği hesaplayın. Yaygın oranlı ücretsiz hesaplayıcı.`,
    intro: `En-boy oranını hesaplamak için genişliği ve yüksekliği en büyük ortak bölenlerine bölün. 1920 x 1080, 16:9'dur. En-boy oranı hesaplayıcı bunu sizin için yapar ve bir oranı korumak istediğinizde eksik kenarı da bulur.`,
    steps: [
      `En-boy oranı hesaplayıcıyı açın ve piksel cinsinden bir genişlik ve yükseklik yazın. En sade oran görünür.`,
      `Bir orana göre yeniden boyutlandırmak için 16:9, 4:3 veya 1:1 gibi birini seçin ya da kendi oranınızı yazın.`,
      `Yeni genişliği yazın, yükseklik gelsin; ya da yüksekliği yazın, genişlik gelsin.`,
      `Bu sayıları Görselleri yeniden boyutlandır veya Görselleri kırp aracında kullanın.`,
    ],
    sections: [
      {
        h: `Yaygın oranlar ve nerelerde kullanıldıkları`,
        p: [
          `Kare 1:1, profil fotoğrafları için kullanılır. 16:9 video ve çoğu ekran içindir, 4:3 eski ekranlar ve birçok kamera içindir, 3:2 ise SLR kameralar ve 4 x 6 inç baskılar içindir. 9:16 hikâyeler ve kısa videolar, 4:5 ise Instagram dikey gönderileri içindir.`,
          `Hesaplayıcı bunları kullanım yerleriyle birlikte listeler; böylece bir yerin istediğini seçebilirsiniz.`,
        ],
      },
      {
        h: `Bir boyut yalnızca bir orana yakınsa`,
        p: [
          `Bazı boyutlar yaygın bir orana neredeyse eşittir ama tam eşit değildir. 1366 x 768, 683:384'tür ve 16:9'a yüzde birin çok küçük bir kesri kadar yakındır. Hesaplayıcı ikisini de gösterir; böylece tam değil, yakın olduğunu bilirsiniz.`,
          `Bir orana göre yeniden boyutlandırırken yükseklikler ve genişlikler tam piksele yuvarlanır.`,
        ],
      },
    ],
    faq: [
      { q: `1920 x 1080'in en-boy oranı nedir?`, a: `16:9. İkisini de en büyük ortak bölenleri olan 120'ye bölerseniz 16 ve 9 elde edersiniz.` },
      { q: `Yeniden boyutlandırırken oranı nasıl korurum?`, a: `Oranı seçin ve yeni genişliği yazın. Yükseklik, genişlik çarpı oranın yüksekliği bölü oranın genişliği olarak hesaplanır.` },
      { q: `Bu görselimi değiştirir mi?`, a: `Hayır. Bir hesaplayıcıdır ve hiçbir dosya kullanmaz.` },
    ],
  },
  'how-to-adjust-the-colours-of-a-photo': {
    title: `Parlaklık, kontrast ve renkler nasıl ayarlanır ya da fotoğraf nasıl siyah beyaz yapılır`,
    seoTitle: `Fotoğrafı Siyah Beyaz Yapma veya Parlaklığı Ayarlama`,
    description: `Parlaklığı, kontrastı ve renk gücünü değiştirin ya da siyah beyaz, sepya veya negatif uygulayın. Canlı önizleme, tarayıcınızda, yükleme yok.`,
    intro: `Bir fotoğrafı siyah beyaz yapmak için Renkleri ve filtreleri ayarla aracına bırakın, "Black and white" filtresini seçin ve "Apply" düğmesine basın. Aynı araç, canlı önizlemeyle parlaklığı, kontrastı ve renk gücünü de değiştirir.`,
    steps: [
      `Renkleri ve filtreleri ayarla aracını açın ve görsellerinizi bırakın.`,
      `"Brightness", "Contrast" ve "Colour strength" kaydırıcılarını oynatın ya da "Black and white" gibi bir filtre seçin.`,
      `Canlı önizlemeye bakın; baştan başlamak isterseniz "Reset" düğmesini kullanın.`,
      `"Apply" düğmesine basın ve dosyaları veya hepsini ZIP olarak indirin.`,
    ],
    sections: [
      {
        h: `Her kontrol ne yapar`,
        p: [
          `Parlaklık her şeyi daha açık veya daha koyu yapar. Kontrast, açık ve koyuyu birbirinden daha uzağa ya da daha yakına iter. Renk gücü renkleri artırır ya da griye doğru düşürür; filtreler ise siyah beyaz, sepya (sıcak, eski fotoğraf kahvesi) veya negatif verir.`,
          `Önce parlaklık ve kontrast, sonra renk gücü, sonra filtre uygulanır. Küçük adımlarla ilerleyin; çünkü büyük değişiklikler ayrıntıyı düzleştirir veya yakar.`,
        ],
      },
      {
        h: `Toplu işler ve dosya türleri`,
        p: [
          `Aynı değişiklikler eklediğiniz her görsele uygulanır; böylece bir klasörün tamamı aynı anda siyah beyaz yapılabilir. Önizleme ilk görseli gösterir.`,
          `Bir PNG'nin saydam alanları saydam kalır. Her görsel kendi biçiminde kaydedilir ve JPG ile WebP yüksek kalitede yeniden kaydedilir.`,
        ],
      },
      {
        h: `İpuçları`,
        p: [
          `Her seferinde tek bir kaydırıcıyı değiştirin ve önizlemeye bakın. Parlaklığı ve kontrastı birlikte, en açık ve en koyu bölümlerde ayrıntı kaybolana kadar zorlamak kolaydır.`,
          `Daha çarpıcı bir siyah beyaz fotoğraf için "Black and white" seçin, sonra biraz kontrast ekleyin. Eski fotoğraf havası için sepya ve biraz düşük parlaklık iyi sonuç verir.`,
        ],
      },
    ],
    faq: [
      { q: `Bir görseli siyah beyaz nasıl yaparım?`, a: `"Black and white" filtresini seçin ve "Apply" düğmesine basın. "Colour strength"i sonuna kadar aşağı çekmek de benzer bir sonuç verir.` },
      { q: `Karanlık bir fotoğrafı nasıl aydınlatırım?`, a: `"Brightness" kaydırıcısını sağa çekin; düz görünüyorsa biraz kontrast ekleyin.` },
      { q: `Görselim yükleniyor mu?`, a: `Hayır. Değişiklikler tarayıcınızda yapılır.` },
    ],
  },
  'how-to-add-a-border-to-a-picture': {
    title: `Görsele kenarlık veya çerçeve nasıl eklenir`,
    seoTitle: `Görsele Kenarlık veya Çerçeve Ekleme (Her Renk)`,
    description: `Herhangi bir görselin etrafına beyaz, siyah, renkli ya da saydam bir kenarlık koyun. Kalınlığı seçin ve önizlemeyi görün. Tarayıcınızda.`,
    intro: `Bir görsele kenarlık eklemek için Kenarlık veya çerçeve ekle aracına bırakın, kalınlığı ayarlayın, bir renk seçin ve "Add border" düğmesine basın. Kenarlık görselin etrafına gelir; bu yüzden hiçbir şey kesilmez ve sonuç biraz daha büyük olur.`,
    steps: [
      `Kenarlık veya çerçeve ekle aracını açın ve görsellerinizi bırakın.`,
      `Kenarlığın ne kadar kalın olacağını ayarlayın.`,
      `Beyaz, siyah, sarı, saydam seçin ya da #1e90ff gibi kendi renk kodunuzu yazın.`,
      `Önizlemeye bakın, "Add border" düğmesine basın ve sonucu indirin.`,
    ],
    sections: [
      {
        h: `Ölçeklenen kalınlık`,
        p: [
          `Kalınlık, görselin kısa kenarının bir yüzdesidir; bu yüzden kenarlık, aynı toplu işteki küçük bir fotoğrafta da büyük bir fotoğrafta da aynı görünür.`,
          `Kenarlık dışarıdan eklendiği için görsel tüm içeriğini korur. Bu, kenarın üzerine çizmekten farklıdır; o, içeriğin bir kısmını gizlerdi.`,
        ],
      },
      {
        h: `Saydam kenarlıklar`,
        p: [
          `Saydam bir kenarlık, saydamlığı destekleyen bir biçim gerektirir; bu yüzden JPG, bunu seçtiğinizde PNG olur. Diğer görseller kendi biçimini korur.`,
          `Geçerli olmayan bir renk kodu yazarsanız sayfa tahmin etmek yerine sizi uyarır. #1e90ff veya #fa0 biçimlerini kullanın.`,
        ],
      },
      {
        h: `İpuçları`,
        p: [
          `İnce bir beyaz kenarlık, yaklaşık yüzde 2 ila 4, temiz bir baskı ya da galeri görünümü verir. Cesur bir renkteki daha kalın bir kenarlık, sosyal medya gönderisi için çerçeve işi görür.`,
          `Görseli yazdıracaksanız kenarlığın dosyayı özgün hâlinden büyük yaptığını unutmayın; bu yüzden son boyutu aklınızdaki kağıt veya çerçeveyle karşılaştırın.`,
        ],
      },
    ],
    faq: [
      { q: `Bir fotoğrafa beyaz kenarlık nasıl eklerim?`, a: `Fotoğrafı bırakın, rengi "White" üzerinde tutun, kalınlığı ayarlayın ve "Add border" düğmesine basın.` },
      { q: `Kenarlık görselimi kaplar mı?`, a: `Hayır. Dışarıdan eklenir; bu yüzden görsel eksiksiz kalır ve sonuç daha büyüktür.` },
      { q: `Kenarlık saydam olabilir mi?`, a: `Evet. "Transparent" seçin. JPG saydam olamayacağı için sonuç bir PNG olur.` },
    ],
  },
  'how-to-get-a-hex-color-from-an-image': {
    title: `Görselden HEX renk kodu nasıl alınır`,
    seoTitle: `Görselden HEX Renk Kodu Alma (Renk Seçici)`,
    description: `Bir görsele tıklayıp tam rengi HEX, RGB ve HSL olarak tek tıkla kopyalayın. Klavyeyle de çalışır. Tarayıcınızda.`,
    intro: `Bir görseldeki rengin HEX kodunu almak için görseli Görselden renk seçici aracına bırakın, rengi önizlemek için görselin üzerinde gezinin ve seçmek için tıklayın. HEX, RGB ve HSL kodları, her birinin yanında "Copy" düğmesiyle görünür.`,
    steps: [
      `Görselden renk seçiciyi bir görsel aracından açın ve bir görsel bırakın.`,
      `İşaretçinin altındaki rengi önizlemek için görselin üzerinde gezinin.`,
      `Seçmek için tıklayın veya dokunun, sonra ihtiyacınız olan kodun yanındaki "Copy" düğmesine basın.`,
      `İstediğiniz kadar renk seçin. Son on renk aşağıda kalır; böylece onlara geri dönebilirsiniz.`,
    ],
    sections: [
      {
        h: `HEX, RGB ve HSL`,
        p: [
          `Bunlar aynı rengi yazmanın üç yoludur. HEX, web sayfalarında kullanılan, #1E90FF gibi kısa koddur. RGB kırmızı, yeşil ve mavi miktarlarını 0 ile 255 arasında verir; HSL ise ton, doygunluk ve açıklığı verir ve elle ayarlaması daha kolaydır.`,
          `Panel üçünü de gösterir; böylece tasarım aracınızın veya stil sayfanızın istediğini yapıştırabilirsiniz.`,
        ],
      },
      {
        h: `Güvenilir bir renk elde etmek`,
        p: [
          `Bir fotoğraf, birbirinden biraz farklı milyonlarca pikselden oluşur; bu yüzden aynı görünen iki nokta birkaç adım farklı olabilir. Birkaç yere tıklayın ya da bunun yerine ana renkleri bulmak için palet aracını kullanın.`,
          `Fare olmadan, görsele bir kez tıklayın, sonra taşımak için ok tuşlarını, seçmek için Enter'ı kullanın. Bir piksel saydamsa sayfa bunu söyler; çünkü ekranda gördüğünüz renk, arkasındakine de bağlıdır.`,
        ],
      },
    ],
    faq: [
      { q: `Bir görseldeki rengin HEX kodunu nasıl bulurum?`, a: `Görseli bırakın, renge tıklayın ve görünen HEX kodunu kopyalayın.` },
      { q: `Yakın pikseller neden farklı kodlar verir?`, a: `Fotoğraflarda küçük farklılıklar bulunur. Birkaç noktaya tıklayın ya da ana renkleri görmek için palet aracını kullanın.` },
      { q: `Görselim yükleniyor mu?`, a: `Hayır. Renk tarayıcınızda okunur.` },
    ],
  },
  'how-to-get-a-color-palette-from-an-image': {
    title: `Görselden renk paleti nasıl alınır`,
    seoTitle: `Görselden Renk Paleti Alma (HEX Kodları, CSS)`,
    description: `Bir görselin ana renklerini HEX kodlarıyla ve her birinin görselin ne kadarını kapladığıyla çıkarın. Liste veya CSS değişkenleri olarak kopyalayın.`,
    intro: `Bir görselden renk paleti almak için onu Renk paleti oluşturucu aracına bırakın. Ana renkler, HEX kodları ve her birinin görselin ne kadarını kapladığıyla birlikte renk örnekleri olarak görünür; bunları liste veya CSS olarak kopyalayabilirsiniz.`,
    steps: [
      `Renk paleti oluşturucuyu açın ve bir görsel bırakın.`,
      `Ana renkler hemen görünür. Kaydırıcıyla 2 ile 12 arasında daha az veya daha fazla renk isteyin.`,
      `HEX kodunu kopyalamak için bir renk örneğine tıklayın.`,
      `Ya da tüm paleti liste veya CSS değişkenleri olarak kopyalayın.`,
    ],
    sections: [
      {
        h: `Renkler nasıl seçilir`,
        p: [
          `Benzer pikseller gruplanır ve her grubun ortalaması tek bir renk olur; böylece görselin çoğunu dolduran renk ilk gelir. Bir renk örneğindeki yüzde, o grubun görselin ne kadarını kapladığını gösterir.`,
          `Tamamen veya büyük ölçüde saydam pikseller yok sayılır; bu yüzden saydam arka planlı bir logo, koyu bir boşluk rengini değil, logonun renklerini verir.`,
        ],
      },
      {
        h: `Paleti kullanmak`,
        p: [
          `CSS değişkenleri olarak kopyalamak, doğrudan bir stil sayfasına yapıştırabileceğiniz --colour-1 gibi özel özellikler verir. Düz liste, notlar veya bir tasarım aracı için kullanışlıdır.`,
          `Görselde istediğinizden az farklı renk varsa yalnızca sahip olduğu renkleri alırsınız. Üç renkli bir logo, on iki değil, üç renk örneği verir. Tek bir kesin renk için bunun yerine renk seçiciyi kullanın.`,
        ],
      },
      {
        h: `İpuçları`,
        p: [
          `İstediğiniz havaya sahip bir görsel kullanın. Bir palet, geldiği görsel kadar iyidir ve gün batımı fotoğrafı, ürün fotoğrafından çok farklı renkler verir.`,
          `Paletin hepsini değil, ikisini veya üçünü seçin. Çoğu tasarım bir ana renk, bir vurgu ve bir nötr renkle en iyi sonucu verir ve yüzdeler hangi renklerin en güçlü aday olduğunu gösterir.`,
        ],
      },
    ],
    faq: [
      { q: `Kaç renk alabilirim?`, a: `2 ile 12 arasında. Bir marka veya tasarım paleti için altı iyi bir başlangıçtır.` },
      { q: `Paleti web sitemde kullanabilir miyim?`, a: `Evet. CSS değişkenleri olarak kopyalayın ve sonucu stil sayfanıza yapıştırın.` },
      { q: `Görselim yükleniyor mu?`, a: `Hayır. Renkler tarayıcınızda hesaplanır.` },
    ],
  },
  'how-to-convert-an-image-to-base64': {
    title: `Görsel Base64'e (ve geri) nasıl dönüştürülür`,
    seoTitle: `Görseli Base64'e Çevirme ve Geri Çözme`,
    description: `Bir görseli HTML veya CSS için Base64 data URI'ye çevirin ya da Base64 yapıştırıp görseli geri alın. Tarayıcınızda yapılır, hiçbir şey yüklenmez.`,
    intro: `Bir görseli Base64'e çevirmek için Görselden Base64'e aracına bırakın ve sonucu kopyalayın. Varsayılan, HTML veya CSS'e yapıştırabileceğiniz bir data URI'dir. Geri dönmek için "Base64 to image" seçin, metni yapıştırın ve görseli indirin.`,
    steps: [
      `Görselden Base64'e aracını açın ve "Image to Base64" seçin.`,
      `Görseli bırakın. Özgün dosya olduğu gibi kodlanır; bu yüzden bir SVG, SVG olarak kalır.`,
      `İhtiyacınız olan biçimi seçin: data URI, düz Base64, CSS arka planı veya HTML görsel etiketi; sonra "Copy" düğmesine basın.`,
      `Çözmek için "Base64 to image" seçin, metni yapıştırın ve görseli indirin.`,
    ],
    sections: [
      {
        h: `Base64 ne zaman iyi bir fikirdir`,
        p: [
          `Base64, bir dosyanın baytlarını düz metin olarak yazar; böylece küçük bir görsel, ayrı bir dosya olmadan bir web sayfasının, stil sayfasının veya e-postanın içinde durabilir. Metin, dosyadan yaklaşık üçte bir daha uzundur.`,
          `Simgeler ve logolar gibi küçük görsellere uygundur. Büyük bir fotoğrafta metin çok uzar ve normal bir görsel dosyası daha hızlı yüklenir; bu yüzden araç 100 KB'ın üzerinde sizi uyarır.`,
        ],
      },
      {
        h: `Base64'ü geri yapıştırmak`,
        p: [
          `Tam bir data URI'yi veya yalnızca Base64 karakterlerini yapıştırabilirsiniz. Araç görsel türünü (PNG, JPG, GIF, WebP, BMP, AVIF, SVG veya ICO) verinin kendisinden okur ve yanlış bir etikete karşı buna güvenir.`,
          `Metin kopyalanırken kesildiyse ya da bir görsel değilse, bozuk bir indirme yerine bunu söyleyen sade bir mesaj alırsınız.`,
        ],
      },
    ],
    faq: [
      { q: `Data URI nedir?`, a: `Bir dosyayı web adresinin içine koymanın yoludur. data:, dosya türü ve ;base64, ile başlar; ardından Base64 metni gelir.` },
      { q: `Base64 metni neden dosyadan büyük?`, a: `Base64, her üç bayt için dört metin karakteri kullanır; bu yüzden metin yaklaşık yüzde 33 daha uzundur.` },
      { q: `Görselim yükleniyor mu?`, a: `Hayır. Kodlama ve çözme tarayıcınızda yapılır.` },
    ],
  },
  'how-to-make-a-favicon': {
    title: `Web siteniz için favicon nasıl yapılır`,
    seoTitle: `Favicon Yapma (favicon.ico, PNG, Apple Touch Simgesi)`,
    description: `Tek bir görselden favicon.ico, 16 ve 32 piksellik PNG'ler, bir Apple touch simgesi ve Android simgeleri yapın; sayfanıza yapıştıracağınız kodla birlikte.`,
    intro: `Favicon yapmak için tek bir görseli Favicon oluşturucuya bırakın ve "Make favicons" düğmesine basın. favicon.ico, 16 ve 32 piksellik PNG'ler, bir Apple touch simgesi ve iki Android simgesi alırsınız; sayfanıza yapıştıracağınız kodla birlikte.`,
    steps: [
      `Favicon oluşturucuyu açın ve tek bir görsel bırakın. 512 piksel veya daha büyük kare bir görsel en iyi sonucu verir.`,
      `Kare değilse, ortadan kareye kesmeyi ya da tamamını saydam şeritlerle korumayı seçin.`,
      `"Make favicons" düğmesine basın ve dosyaları veya hepsini ZIP olarak indirin.`,
      `Dosyaları sitenizin kök klasörüne koyun ve gösterilen kodu sayfalarınızın head bölümüne yapıştırın.`,
    ],
    sections: [
      {
        h: `Ne elde edersiniz`,
        p: [
          `favicon.ico, 16, 32 ve 48 piksellik sürümleri tek dosyada tutar. favicon-16x16.png ve favicon-32x32.png tarayıcı sekmeleri içindir, apple-touch-icon.png (180 piksel) iPhone ve iPad'ler içindir, 192 ve 512 piksellik simgeler ise Android ve kurulabilir web uygulamaları içindir.`,
          `Önizleme, simgenizi 16, 32 ve 64 pikselde gösterir; böylece indirmeden önce kontrol edebilirsiniz.`,
        ],
      },
      {
        h: `Küçükken iyi görünmesini sağlamak`,
        p: [
          `Favicon çok küçüktür; bu yüzden güçlü renkli basit bir şekil en iyi okunur. Ayrıntılı görseller 16 pikselde bulamaça döner; bu yüzden basit bir logodan veya tek bir harften başlayın.`,
          `512 pikselden küçük bir görsel en büyük simgeler için genişletilir ve yumuşak görünebilir; bu olduğunda sayfa size söyler. Saydam bir arka plan korunur.`,
        ],
      },
    ],
    faq: [
      { q: `Bir web sitesinin favicon için hangi dosyalara ihtiyacı var?`, a: `Bir favicon.ico, sekmeler için 16 ve 32 piksellik PNG'ler, 180 piksellik bir Apple touch simgesi ve Android için 192 ve 512 piksellik simgeler. Araç hepsini yapar.` },
      { q: `Görselim hangi boyutta olmalı?`, a: `Kare ve en az 512 x 512 piksel. Daha küçük görseller de çalışır ama büyük simgeler yumuşak görünür.` },
      { q: `favicon.ico gerçek bir ICO dosyası mı?`, a: `Evet. 16, 32 ve 48 piksellik simgeleri standart bir ICO dosyasında tutar.` },
    ],
  },
  'are-online-image-tools-safe': {
    title: `Çevrimiçi görsel araçları güvenli mi? Kendinizinkini nasıl kontrol edersiniz`,
    seoTitle: `Çevrimiçi Görsel Araçları Güvenli mi? Nasıl Kontrol Edilir`,
    description: `Birçok çevrimiçi görsel aracı fotoğrafınızı bir sunucuya yükler. Nasıl anlaşılır, iki dakikada nasıl kontrol edilir ve iDuckImg bunun yerine ne yapar.`,
    intro: `Çevrimiçi bir görsel aracı, işini yaptığı yer kadar gizlidir. Birçoğu fotoğrafınızı bir sunucuya gönderir; iDuckImg ise işi tarayıcınızda yapar, yani dosya cihazınızda kalır. Bunu tarayıcının Ağ sekmesinde kendiniz kontrol edebilirsiniz.`,
    steps: [
      `Araç sayfasını açın, sonra tarayıcı geliştirici araçlarını (F12) açın ve Ağ (Network) sekmesini seçin.`,
      `Listeyi temizleyin, sonra araca bir görsel bırakın ve çalıştırın.`,
      `Görselinizi taşıyan büyük istekleri arayın; genellikle POST veya PUT olarak görünür. Cihazınızda çalışan bir araçta hiçbiri görünmez.`,
      `Kullandığınız her aracın gizlilik politikasını okuyun ve neyi ne kadar süre sakladığını söylediğine bakın.`,
    ],
    sections: [
      {
        h: `Neden önemli`,
        p: [
          `Bir fotoğraf yüzler, belgeler, bir kapı numarası ve çekildiği tam yer gibi gizli ayrıntılar içerebilir. Yüklemek, bir kopyasını başkasına vermektir ve sonrasında ne olduğunu göremezsiniz.`,
          `Tarayıcınızda çalışan araçlar bunu önler; çünkü dosyanız kendi cihazınızda işlenir ve hiç gönderilmez. Yükleme veya indirme olmadığı için de genellikle daha hızlıdırlar.`,
        ],
      },
      {
        h: `iDuckImg ne yapar`,
        p: [
          `Her iDuckImg aracı tarayıcınızda çalışır. Görselleriniz yüklenmez, kayıt yoktur ve filigran eklenmez. Sayfa kendi kodunu ve dosyalarını aynı siteden yükler; HEIC gibi bazı biçimler için de aynı siteden bir çözücü yükler. Başka şirketlere hiçbir istek yapmaz.`,
          `Yine de yapmaya değer: bir fotoğrafı paylaşmadan önce gizli konum verilerini kaldırın ve özel her şeyi gizlemek için hafif bir bulanıklık yerine "Cover" kullanın. EXIF verilerini kaldır ile Görselin bölümlerini bulanıklaştır veya gizle araçları bu işleri cihazınızda yapar.`,
        ],
      },
    ],
    faq: [
      { q: `Bir aracın fotoğrafımı yükleyip yüklemediğini nasıl anlarım?`, a: `Tarayıcı geliştirici araçlarında Ağ sekmesini açın, aracı çalıştırın ve görselinizi taşıyan büyük bir istek arayın. Yoksa iş cihazınızda yapılmıştır.` },
      { q: `iDuckImg görsellerimi yüklüyor mu?`, a: `Hayır. Her araç tarayıcınızda çalışır ve dosyalarınız cihazınızda kalır.` },
      { q: `Bir fotoğrafı düzenledikten sonra paylaşmak güvenli mi?`, a: `Önce gizli konum ve kamera verilerini kaldırın, görselin kendisindeki özel her şeyi de düz bir kapatmayla gizleyin.` },
    ],
  },
};
