import type { GuideText } from './types';

/** Turkish text of guides 9 to 17 (see src/lib/guides-b.ts). */
export const trGuidesB: Record<string, GuideText> = {
  'how-to-rotate-or-flip-an-image': {
    title: `Görsel nasıl döndürülür veya çevrilir`,
    seoTitle: `Görsel Çevrimiçi Nasıl Döndürülür veya Çevrilir (Ücretsiz)`,
    description: `Bir görseli 90, 180 veya 270 derece döndürün ya da yatay veya dikey aynalayın. JPG, PNG ve WebP için çalışır, tarayıcınızda.`,
    intro: `Bir görseli döndürmek için Döndür ve çevir aracına bırakın, önizleme doğru görünene kadar sola veya sağa döndür düğmesine basın ve "Uygula" düğmesine basın. Aynı düğmeler görseli yatay veya dikey olarak da aynalar.`,
    steps: [
      `Döndür ve çevir aracını açın ve JPG, PNG veya WebP dosyalarınızı bırakın.`,
      `Sola veya sağa döndürmek ya da çevirmek için düğmeleri kullanın. Önizleme sonucu gösterir.`,
      `"Uygula" düğmesine basın.`,
      `Her dosyayı ayrı ayrı veya hepsini ZIP olarak indirin.`,
    ],
    sections: [
      {
        h: `Döndürmek mi, çevirmek mi?`,
        p: [
          `Döndürmek, tüm görseli 90, 180 veya 270 derece çevirir; yan yatık veya ters çıkan bir fotoğrafı düzeltir. Çevirmek ise görseli aynalar; ön kameradan çekilen ve ters okunan yazıyı böyle düzeltirsiniz.`,
          `İkisini birleştirebilirsiniz. Önce döndürün, sonra çevirin ve doğru görünene kadar önizlemeye bakın.`,
        ],
      },
      {
        h: `Birçok görsel aynı anda`,
        p: [
          `Aynı değişiklik eklediğiniz her görsele uygulanır; böylece bir sürü yan yatık fotoğraf tek seferde düzeltilebilir. PNG kayıpsız kalır. JPG ve WebP yüksek kalitede yeniden kaydedilir.`,
          `Önce önizlemeye bakın: yalnızca ilk görseli gösterir, bu yüzden toplu iş aynı döndürmeye ihtiyaç duyan görsellerden oluşmalıdır.`,
        ],
      },
      {
        h: `İpuçları`,
        p: [
          `Fotoğraflarınızın yalnızca bir kısmı yan yatıksa, onları bir toplu işte, geri kalanını başka bir toplu işte döndürün. Bir toplu iş tam olarak tek bir değişiklik alır; karışık görseller ayrı çalıştırmalar gerektirir.`,
          `Özgün dosyalarınızı saklayın. 90 derece döndürmek geri alınabilir, ama bir JPG'yi yeniden kaydetmek onu her zaman çok az değiştirir; bu yüzden birçok kez tekrarlamamak daha iyidir.`,
        ],
      },
    ],
    faq: [
      { q: `Yan yatık bir fotoğrafı nasıl döndürürüm?`, a: `Bırakın, dik olana kadar sola veya sağa döndür düğmesine basın, sonra "Uygula" düğmesine basıp indirin.` },
      { q: `Döndürmekle çevirmek arasındaki fark nedir?`, a: `Döndürmek görseli çevirir. Çevirmek ise onu, aynaya bakar gibi aynalar.` },
      { q: `Döndürmek kaliteyi düşürür mü?`, a: `PNG kayıpsız kalır. JPG ve WebP yüksek kalitede yeniden kaydedilir; bu yüzden herhangi bir değişiklik çok küçüktür.` },
    ],
  },
  'how-to-remove-location-and-exif-data-from-a-photo': {
    title: `Fotoğraftan konum ve EXIF verileri nasıl kaldırılır`,
    seoTitle: `Fotoğraftan EXIF ve GPS Konum Verileri Nasıl Kaldırılır`,
    description: `Paylaşmadan önce fotoğraftaki gizli konum, tarih ve kamera bilgilerini silin. Tarayıcınızda yapılır ve görsel yeniden sıkıştırılmaz.`,
    intro: `Bir fotoğraftan EXIF verilerini kaldırmak için EXIF verilerini kaldır aracına bırakın ve "Meta verileri kaldır" düğmesine basın. Gizli GPS konumu, tarih ve kamera bilgileri silinir; görselin kendisi yeniden sıkıştırılmaz.`,
    steps: [
      `EXIF verilerini kaldır aracını açın ve JPG, PNG veya WebP fotoğraflarınızı bırakın.`,
      `"Meta verileri kaldır" düğmesine basın.`,
      `Temizlenen her dosyayı ayrı ayrı veya hepsini ZIP olarak indirin.`,
      `İsterseniz sonucu kontrol edin: Windows'ta dosyaya sağ tıklayın, Özellikler'i seçin ve Ayrıntılar sekmesini açın.`,
    ],
    sections: [
      {
        h: `Bir fotoğrafın içinde neler saklıdır`,
        p: [
          `Telefonlar ve kameralar dosyaya ek bilgiler yazar: çekildiği tam yer, tarih ve saat ile cihaz modeli. Görselin kendisi özel bir şey göstermese bile, özgün dosyayı alan herkes bunları okuyabilir.`,
          `Birçok sosyal site bunların bir kısmını kendisi siler ama hepsi silmez; e-posta veya sohbetle gönderilen bir fotoğraf da genellikle değişmeden ulaşır. Önce temizlemek güvenli alışkanlıktır.`,
        ],
      },
      {
        h: `Bunun gizlemediği şeyler`,
        p: [
          `Meta verileri kaldırmak görselin içindekini değiştirmez. Bir sokak tabelası, bir kapı numarası veya bir yüz hâlâ görünür. Görselin kendisinin bir bölümünü gizlemek için Görselin bölümlerini bulanıklaştır veya gizle aracını kullanın.`,
          `JPG verisi yeniden sıkıştırılmadığı için görsel öncekiyle birebir aynı görünür ve dosya yalnızca biraz küçülür.`,
        ],
      },
      {
        h: `İpuçları`,
        p: [
          `Fotoğrafları göndermeden önce temizleyin, sonra değil. Zaten paylaştığınız veya e-postayla gönderdiğiniz bir görseli geri alamazsınız ama bir sonrakini temiz gönderebilirsiniz.`,
          `Ekran görüntüleri genellikle konum taşımaz; bu yüzden bir ekranın görüntüsünü paylaşmanın güvenli yoludur. Temizlemeye değer olanlar, özellikle evde çekilenler olmak üzere telefon kamerasıyla çekilen fotoğraflardır.`,
        ],
      },
    ],
    faq: [
      { q: `EXIF verisi nedir?`, a: `Bir fotoğraf dosyasının içinde saklanan bilgidir: nerede, ne zaman ve hangi cihaz ve ayarlarla çekildiği.` },
      { q: `EXIF'i kaldırmak görseli değiştirir mi?`, a: `Hayır. Görsel yeniden sıkıştırılmaz, bu yüzden birebir aynı görünür.` },
      { q: `Fotoğrafım yükleniyor mu?`, a: `Hayır. Veriler tarayıcınızda kaldırılır ve dosya cihazınızdan hiç çıkmaz.` },
    ],
  },
  'how-to-make-a-round-profile-picture': {
    title: `Yuvarlak profil fotoğrafı nasıl yapılır`,
    seoTitle: `Yuvarlak Profil Fotoğrafı Yapma (Daire Kırpma, Ücretsiz)`,
    description: `Herhangi bir fotoğrafı daire şeklinde kırpın ya da yalnızca köşeleri yuvarlayın ve saydam köşeli bir PNG olarak kaydedin. Ücretsiz, tarayıcınızda.`,
    intro: `Yuvarlak bir profil fotoğrafı yapmak için fotoğrafı Daire kırpma ve yuvarlak köşeler aracına bırakın, "Circle" seçin ve "Make it round" düğmesine basın. Fotoğrafınızın ortadaki karesini koruyan, saydam köşeli bir PNG alırsınız.`,
    steps: [
      `Daire kırpma ve yuvarlak köşeler aracını açın ve görselinizi bırakın.`,
      `"Circle" seçin ya da yalnızca yumuşak kenarlar istiyorsanız "Rounded corners" seçin.`,
      `"Make it round" düğmesine basın.`,
      `PNG'yi indirin.`,
    ],
    sections: [
      {
        h: `Sonuç neden PNG`,
        p: [
          `Yuvarlak bir görselin saydam köşelere ihtiyacı vardır ve JPG saydam olamaz. PNG olabilir; bu yüzden sonuç her zaman PNG'dir. Renkli bir arka plana koyarsanız yuvarlak şeklini korur.`,
          `Çoğu profil fotoğrafı kutusu görseli sizin yerinize daireye kırpar. Bu araç, yuvarlak görsele dosya olarak ihtiyaç duyduğunuzda işe yarar.`,
        ],
      },
      {
        h: `Yüzü çerçevelemek`,
        p: [
          `Daire, fotoğrafın ortadaki karesini korur. Yüz bir yana kaymışsa, önce görseli yüz ortada olacak şekilde kırpın, sonra yuvarlak yapın.`,
          `Görselleri kırp aracı 1:1 şekliyle bunu tek adımda yapar.`,
        ],
      },
      {
        h: `İpuçları`,
        p: [
          `En az birkaç yüz piksel genişliğinde bir görselle başlayın. Yuvarlak bir görsel çoğunlukla küçük gösterilir, ama keskin kenarlar için baştan yeterli piksel gerekir.`,
          `Yüzün çevresinde biraz boşluk bırakın. Daire köşeleri keser; bu yüzden baş etrafında sıkı bir kırpma saçı veya çeneyi kesmeyle sonuçlanabilir.`,
        ],
      },
    ],
    faq: [
      { q: `Saydam arka planlı dairesel bir görsel yapabilir miyim?`, a: `Evet. Dairenin dışındaki köşeler, indirdiğiniz PNG'de saydamdır.` },
      { q: `Fotoğrafım kare değilse ne olur?`, a: `Daire, görselin ortadaki karesini kullanır. Farklı bir bölüm istiyorsanız önce kırpın.` },
      { q: `Görselim yükleniyor mu?`, a: `Hayır. Tarayıcınızda işlenir ve cihazınızda kalır.` },
    ],
  },
  'how-to-split-an-image-into-a-grid': {
    title: `Görsel bir ızgara halinde karelere nasıl bölünür`,
    seoTitle: `Görseli Izgaraya Bölme (Instagram, Yapboz)`,
    description: `Izgara paylaşımı veya yapboz için bir görseli 10 x 10'a kadar eşit satır ve sütunlara kesin, kareleri ZIP olarak indirin. Tarayıcınızda.`,
    intro: `Bir görseli ızgaraya bölmek için Görseli ızgaraya böl aracına bırakın, kaç satır ve sütun istediğinizi seçin ve "Split" düğmesine basın. Her kare ayrı bir görsel olarak kaydedilir ve hepsini bir ZIP içinde indirebilirsiniz.`,
    steps: [
      `Görseli ızgaraya böl aracını açın ve görselinizi bırakın.`,
      `Satır ve sütun sayısını seçin; en fazla 10 x 10.`,
      `"Split" düğmesine basın.`,
      `Kareleri ayrı ayrı veya hepsini tek bir ZIP olarak indirin.`,
    ],
    sections: [
      {
        h: `Izgara paylaşımları ve yapbozlar`,
        p: [
          `Sosyal medya ızgarası için kareleri doğru sırayla paylaşın; böylece profilde birleşirler. 3 x 1 bölme, üç gönderide geniş bir panorama verir; 3 x 3 ise dokuz kare verir.`,
          `Kareler satır ve sütuna göre adlandırılır, örneğin photo-r1-c2.jpg; böylece hangi parçanın nereye gideceğini anlarsınız.`,
        ],
      },
      {
        h: `Hiç piksel kaybolmaz`,
        p: [
          `Görselin her pikseli tam olarak bir kareye düşer; bu yüzden parçalar eksik veya çift piksel olmadan yeniden birleşir. Boyut eşit bölünmüyorsa, kareler en fazla bir piksel farklıdır.`,
          `Kareler görselin biçimini korur. Önce görseli istediğiniz şekle getirin; çünkü uzun bir görsel uzun kareler verir.`,
        ],
      },
      {
        h: `İpuçları`,
        p: [
          `Görseli önce doğru şekle kırpın. 3 x 3 ızgara kare bir görselden, 3 x 1 panorama ise genişliği yüksekliğinin üç katı olan geniş bir görselden en iyi sonucu verir.`,
          `Site en yeni gönderiyi ilk gösteriyorsa kareleri ters sırayla yükleyin; böylece profilde doğru birleşirler. Paylaşmadan önce düzeni telefonunuzda kontrol edin.`,
        ],
      },
    ],
    faq: [
      { q: `Instagram ızgarası için fotoğrafı nasıl bölerim?`, a: `Izgaranıza uyan satır ve sütunları seçin, örneğin 3 x 3, sonra kareleri sırayla paylaşın.` },
      { q: `Kaç kare yapabilirim?`, a: `En fazla 10 satır ve 10 sütun.` },
      { q: `Kareler nasıl adlandırılır?`, a: `Satır ve sütuna göre, örneğin name-r1-c1.jpg; böylece onları yeniden sıraya koyabilirsiniz.` },
    ],
  },
  'how-to-add-text-to-a-picture': {
    title: `Görsele metin nasıl eklenir`,
    seoTitle: `Görsele veya Fotoğrafa Çevrimiçi Metin Ekleme (Ücretsiz)`,
    description: `Bir görselin üzerine alt yazı veya başlık yazın. Konumu, boyutu ve rengi seçin; isterseniz metnin arkasına bir panel ekleyin. Tarayıcınızda.`,
    intro: `Bir görsele metin eklemek için Görsele metin ekle aracına bırakın, en fazla beş satır yazın, nereye geleceğini seçin, boyutu ve rengi ayarlayın ve "Metin ekle" düğmesine basın. Metnin arkasındaki koyu veya açık bir panel, yoğun bir fotoğrafta okunaklılığı korur.`,
    steps: [
      `Görsele metin ekle aracını açın ve görselinizi bırakın.`,
      `Metninizi yazın; en fazla beş satır.`,
      `Dokuz konumdan birini, boyutu ve rengi seçin. Arka plan yoğunsa koyu veya açık bir panel ekleyin.`,
      `"Metin ekle" düğmesine basın ve sonucu indirin.`,
    ],
    sections: [
      {
        h: `Metni okunaklı yapmak`,
        p: [
          `Arka planda açık ve koyu alanlar olduğunda bir fotoğraftaki metni okumak zordur. İsteğe bağlı panel, sözcüklerin arkasına düz bir şerit koyar ve görseli değiştirmeden bunu çözer.`,
          `Boyut, görsel genişliğinin bir yüzdesidir; bu yüzden bir alt yazı küçük bir görselde de büyük bir görselde de aynı görünür.`,
        ],
      },
      {
        h: `Bilmeniz gereken sınırlar`,
        p: [
          `En fazla beş satır ekleyebilirsiniz ve her satır en fazla 60 karakter olabilir. Daha uzun metin için görseli büyütün veya birkaç görsel kullanın.`,
          `Önizleme ilk görseli gösterir ve eklediğiniz her görsele aynı metin gelir.`,
        ],
      },
      {
        h: `İpuçları`,
        p: [
          `Kısa tutun. Büyük ve kısa metin telefonda okunur ve boyut görselle birlikte ölçeklenir; bu yüzden kısa bir başlık genellikle uzun bir alt yazıdan daha iyi görünür.`,
          `Metnin arkasındaki alanla en çok kontrast oluşturan rengi seçin veya paneli açın. Önizlemeyi küçük boyutta kontrol edin; çünkü çoğu kişi onu öyle görecek.`,
        ],
      },
    ],
    faq: [
      { q: `Kaç satır ekleyebilirim?`, a: `En fazla beş satır; her biri en fazla 60 karakter.` },
      { q: `Birçok görsele metin koyabilir miyim?`, a: `Evet. Aynı metin her görsele gelir ve hepsini birlikte indirebilirsiniz.` },
      { q: `Görselim yükleniyor mu?`, a: `Hayır. Metin tarayıcınızda çizilir.` },
    ],
  },
  'how-to-turn-a-photo-into-pixel-art': {
    title: `Fotoğraf piksel sanatına nasıl çevrilir`,
    seoTitle: `Fotoğrafı Piksel Sanatına Çevirme (Ücretsiz, Tarayıcıda)`,
    description: `Herhangi bir fotoğraftan iri pikselli piksel sanatı yapın. Piksellerin boyutunu ve kaç renk kalacağını seçin. PNG olarak kaydedilir, yükleme yok.`,
    intro: `Bir fotoğrafı piksel sanatına çevirmek için Piksel sanatı oluşturucu aracına bırakın, kaydırıcıyla genişlik boyunca kaç büyük piksel olacağını ayarlayın ve "Make pixel art" düğmesine basın. Genişlik boyunca daha az piksel, daha iri bir sanat demektir ve sonuç bir PNG'dir.`,
    steps: [
      `Piksel sanatı oluşturucuyu açın ve görsellerinizi bırakın.`,
      `Kaydırıcıyla genişlik boyunca kaç büyük piksel olacağını ayarlayın. Daha az, daha irisi demektir.`,
      `İsterseniz oyun konsolu görünümü için "Retro" veya "Very few colours" seçin.`,
      `"Make pixel art" düğmesine basın ve PNG'yi indirin.`,
    ],
    sections: [
      {
        h: `Doğru iriliği bulmak`,
        p: [
          `Yüzler için en iyisi genişlik boyunca yaklaşık 32 ila 64 pikseldir. Manzaralar daha fazlasıyla güzel görünür. Her büyük piksel, fotoğrafın kare bir bloğunun ortalama rengidir.`,
          `Önizleme, kaydedilen dosyayla aynı kodu kullanır; yani gördüğünüz, elde ettiğinizdir.`,
        ],
      },
      {
        h: `Renkleri sınırlamak`,
        p: [
          `"Retro" her rengin altı tonunu, "Very few colours" ise üç tonunu tutar; bu da düz, oyun benzeri bir görünüm verir. Piksellerin hâlâ fotoğrafa benzemesini istiyorsanız özgün renkleri koruyun.`,
          `Sonuç, görselinizle aynı boyutta bir PNG'dir; çünkü JPG her büyük pikselin sert kenarlarını bulanıklaştırırdı.`,
        ],
      },
      {
        h: `İpuçları`,
        p: [
          `Basit, yüksek kontrastlı bir fotoğrafla başlayın. Düz bir arka plandaki yüz, yoğun bir sokak sahnesinden iri piksellere çok daha iyi dayanır.`,
          `Birkaç ayar deneyin ve karşılaştırın. Genişlik boyunca 48'den 32 piksele geçmek görünümü çok değiştirir ve "Retro" renkler normal bir fotoğrafı oyun ekranı gibi görünen bir şeye çevirebilir.`,
        ],
      },
    ],
    faq: [
      { q: `Sonuç neden PNG?`, a: `PNG, her büyük pikselin keskin kenarlarını korur. JPG onları bulanıklaştırırdı.` },
      { q: `Bir yüz için kaç piksel kullanmalıyım?`, a: `Genişlik boyunca yaklaşık 32 ila 64 genellikle iyi çalışır.` },
      { q: `Görsel boyutunu korur mu?`, a: `Evet. Sonuç, özgün görselle aynı boyuttadır.` },
    ],
  },
  'how-to-merge-images-side-by-side': {
    title: `Görseller yan yana veya üst üste nasıl birleştirilir`,
    seoTitle: `Görselleri Yan Yana veya Üst Üste Birleştirme (Ücretsiz)`,
    description: `İki veya daha fazla görseli satır ya da sütun halinde, isteğe bağlı boşluk ve arka planla tek görselde birleştirin. PNG, JPG veya WebP. Tarayıcınızda.`,
    intro: `Görselleri birleştirmek için iki veya daha fazlasını Görselleri yan yana birleştir aracına bırakın, sıraya koyun, yan yana veya üst üste seçin ve "Join pictures" düğmesine basın. Ortak bir yüksekliğe veya genişliğe ölçeklenirler; böylece hiçbiri büyütülüp esnetilmez.`,
    steps: [
      `Görselleri yan yana birleştir aracını açın ve iki veya daha fazla görsel bırakın.`,
      `"Yukarı" ve "Aşağı" ile sıraya koyun, istemediklerinizi kaldırın.`,
      `Yan yana veya üst üste seçeneğini, aralarındaki boşluğu ve arka planı seçin.`,
      `"Join pictures" düğmesine basın ve sonucu PNG, JPG veya WebP olarak indirin.`,
    ],
    sections: [
      {
        h: `Boyutları eşleştirmek`,
        p: [
          `Varsayılan olarak her görsel, en küçük ortak yüksekliğe (satır için) veya genişliğe (sütun için) ölçeklenir; böylece hiçbir görsel büyütülüp bulanık yapılmaz. Her görseli kendi boyutunda tutmayı tercih ederseniz o seçeneği seçin; görseller ortalanır.`,
          `Boşluk ve beyaz, siyah ya da saydam bir arka plan rengi görünümü tamamlar. Saydamı PNG veya WebP ile seçin.`,
        ],
      },
      {
        h: `Boyut sınırları`,
        p: [
          `100 megapikseli aşan bir sonuç, açık bir mesajla reddedilir; çünkü bir telefon onu tutamaz. Bu durumda daha az veya daha küçük görsel kullanın.`,
          `Öncesi ve sonrası fotoğrafları iki görselden oluşan bir satır olarak iyi çalışır. Uzun bir ekran görüntüsü yığını sütun olarak iyi çalışır.`,
        ],
      },
      {
        h: `İpuçları`,
        p: [
          `Görsellerinizi önce benzer şekillere kırpın. Aynı yüksekliğe sahip görseller satırda düzgünce hizalanır ve araç küçültecek bir şey bulamaz.`,
          `Temiz bir öncesi ve sonrası için küçük bir boşluk ve beyaz arka plan kullanın. Birleşmek üzere çekilmiş görsellerden kesintisiz bir panorama için boşluk bırakmayın.`,
        ],
      },
    ],
    faq: [
      { q: `İki fotoğrafı yan yana nasıl koyarım?`, a: `İkisini de bırakın, yan yana seçeneğini seçin ve "Join pictures" düğmesine basın.` },
      { q: `Görsellerim esnetilecek mi?`, a: `Hayır. Oranları korunarak ortak bir yüksekliğe veya genişliğe ölçeklenirler.` },
      { q: `Sırayı değiştirebilir miyim?`, a: `Evet. Listedeki her görselde "Yukarı" ve "Aşağı" düğmelerini kullanın.` },
    ],
  },
  'how-to-blur-or-hide-part-of-an-image': {
    title: `Görselin bir bölümü nasıl bulanıklaştırılır veya gizlenir`,
    seoTitle: `Görselin Bir Bölümünü Bulanıklaştırma veya Gizleme`,
    description: `Bir isim, numara veya yüzün üzerine kutular sürükleyip bulanıklaştırın, pikselleştirin veya kapatın. Tarayıcınızda çalışır; özgün görsel cihazınızdan çıkmaz.`,
    intro: `Bir görselin bir bölümünü gizlemek için Görselin bölümlerini bulanıklaştır veya gizle aracına bırakın, ismin, numaranın veya yüzün üzerine bir kutu sürükleyin, "Blur", "Pixelate" veya "Cover" seçin ve düğmeye basın. Hassas her şey için en güvenli seçenek "Cover"dır.`,
    steps: [
      `Görselin bölümlerini bulanıklaştır veya gizle aracını açın ve görselinizi bırakın.`,
      `Gizlenecek her alanın üzerine bir kutu sürükleyin. İhtiyacınız kadar ekleyebilirsiniz.`,
      `"Blur", "Pixelate" veya düz renkli "Cover" seçin.`,
      `Düğmeye basın ve yeni görseli indirin.`,
    ],
    sections: [
      {
        h: `Bulanıklaştırma mı, pikselleştirme mi, kapatma mı?`,
        p: [
          `Hafif bir bulanıklık metni kısmen okunur bırakabilir ve kararlı biri zayıf bir bulanıklıktan veya pikselleştirmeden bazen rakamları geri çıkarabilir. "Cover" düz bir blok boyar ve geri çıkarılacak bir şey bırakmaz.`,
          `Kart numaraları, hesap numaraları ve özel her şey için "Cover" kullanın. Güvenlikten çok görünümün önemli olduğu yüzler ve arka planlar için bulanıklık kullanın.`,
        ],
      },
      {
        h: `Hassas kutular ve birçok görsel`,
        p: [
          `Her kutunun ayrıca konumu için yüzde cinsinden sayı girişleri vardır; bunlar fare olmadan çalışır ve kutuyu tam olarak oynatmanızı sağlar. Canlı önizleme, kaydedilen dosyayla aynı kodu kullanır.`,
          `Birkaç görsel bırakırsanız aynı kutular hepsine uygulanır; bu, aynı düzene sahip ekran görüntülerine uygundur. Özgün dosyalarınız asla değiştirilmez.`,
        ],
      },
      {
        h: `İpuçları`,
        p: [
          `Kutuyu gizlediğiniz şeyden biraz daha büyük yapın. Harflerin ve yüzlerin kenarları dışarı taşar ve sıkı bir kutu ince bir şeridi görünür bırakabilir.`,
          `Kaydettikten sonra yeni görseli açıp yakınlaştırın. Hâlâ bir şey okuyabiliyor veya tanıyabiliyorsanız "Cover" ile yeniden çalıştırın. Ayrıca gizli konum verilerinin görünen içerikten ayrı olduğunu unutmayın; onu da temizleyin.`,
        ],
      },
    ],
    faq: [
      { q: `Kart numarasını gizlemek için bulanıklık yeterli mi?`, a: `Hayır. Hafif bir bulanıklık kısmen okunabilir kalabilir. Düz bir blok boyayan "Cover" kullanın.` },
      { q: `Birkaç alanı gizleyebilir miyim?`, a: `Evet. İhtiyacınız kadar kutu ekleyin.` },
      { q: `Görselim yükleniyor mu?`, a: `Hayır. Efekt tarayıcınızda uygulanır ve özgün görsel cihazınızda kalır.` },
    ],
  },
  'how-to-convert-pixels-to-cm-and-inches': {
    title: `Piksel santimetre ve inç'e nasıl dönüştürülür`,
    seoTitle: `Pikseli cm, mm ve İnç'e Çevirme (DPI ile)`,
    description: `Bir görselin pikselinden ve DPI'dan kağıtta ne kadar büyük olduğunu veya A4 için kaç piksel gerektiğini bulun. Yaygın kağıt boyutlu ücretsiz hesaplayıcı.`,
    intro: `Pikseli santimetreye çevirmek için pikseli DPI'ya bölerek inç elde edin, sonra 2,54 ile çarpın. 300 DPI'da 1 cm yaklaşık 118 pikseldir ve Piksel, cm ve inç dönüştürücü, herhangi bir uzunluk ve çözünürlük için hesabı yapar.`,
    steps: [
      `Piksel, cm ve inç dönüştürücüyü açın ve elinizdeki uzunluğu yazın.`,
      `Birimini seçin: piksel, santimetre, milimetre veya inç.`,
      `Çözünürlüğü DPI olarak seçin. Baskı fotoğrafları için 300, ekranlar için 72 veya 96 kullanın.`,
      `Aynı uzunluğu her birimde ve yaygın kağıtların piksel boyutlarını okuyun.`,
    ],
    sections: [
      {
        h: `DPI neden önemli`,
        p: [
          `Pikselin kendi başına fiziksel bir boyutu yoktur. Aynı 1200 piksel, 300 DPI'da 4 inç, 72 DPI'da yaklaşık 16,7 inç genişliğindedir. DPI, bir inçe kaç pikselin sığdığını söyler.`,
          `Baskı için fotoğraflarda olağan hedef 300 DPI'dır. 150 DPI taslaklar için yeterlidir ve ekranlar yalnızca piksel sayısına bakar.`,
        ],
      },
      {
        h: `Piksel cinsinden yaygın boyutlar`,
        p: [
          `300 DPI'da bir A4 sayfa 2480 x 3508 pikseldir ve 4 x 6 inç bir fotoğraf baskısı 1200 x 1800 pikseldir. Sayfadaki tablo, seçtiğiniz DPI'da A4, A5, A3, US Letter ve vesikalık fotoğrafları gösterir.`,
          `Bir dosyanın DPI ayarını değiştirmek piksellerini değiştirmez. Bir görselin gerçek boyutunu değiştirmek için Görselleri yeniden boyutlandır aracını kullanın.`,
        ],
      },
    ],
    faq: [
      { q: `1 cm kaç pikseldir?`, a: `300 DPI'da yaklaşık 118 piksel, 96 DPI'da yaklaşık 38 pikseldir. Formül: piksel = cm bölü 2,54, çarpı DPI.` },
      { q: `Bir A4 sayfa kaç pikseldir?`, a: `300 DPI'da A4, 2480 x 3508 pikseldir. 150 DPI'da 1240 x 1754'tür.` },
      { q: `Bu görselimi değiştirir mi?`, a: `Hayır. Yalnızca bir hesaplayıcıdır ve hiçbir dosya kullanmaz.` },
    ],
  },
};
