---
title: ethereum.org çeviri stil rehberi
metaTitle: Çevirmen rehberi
lang: tr
description: ethereum.org çevirmenleri için talimatlar ve ipuçları
---

ethereum.org çeviri stil rehberi, web sitesini yerelleştirmemize yardımcı olan çevirmenler için en önemli yönergelerden, talimatlardan ve ipuçlarından bazılarını içerir.

Bu belge genel bir rehber niteliğindedir ve herhangi bir dile özgü değildir.

Herhangi bir sorunuz, öneriniz veya geri bildiriminiz varsa, translations@ethereum.org adresinden bize ulaşmaktan, Crowdin'de @ethdotorg'a mesaj göndermekten veya #translations kanalında bize mesaj gönderebileceğiniz ya da ekip üyelerinden herhangi birine ulaşabileceğiniz [Discord'umuza katılmaktan](https://discord.gg/ethereum-org) çekinmeyin.

## Crowdin Kullanımı {#using-crowdin}

Crowdin'deki projeye nasıl katılacağınız ve Crowdin çevrimiçi düzenleyicisini nasıl kullanacağınızla ilgili temel talimatları [Çeviri Programı sayfasında](/contributing/translation-program/#how-to-translate) bulabilirsiniz.

Crowdin ve bazı gelişmiş özelliklerinin kullanımı hakkında daha fazla bilgi edinmek isterseniz, [Crowdin bilgi bankası](https://support.crowdin.com/online-editor/) tüm Crowdin işlevlerine dair birçok derinlemesine rehber ve genel bakış içerir.

## Mesajın özünü yakalamak {#capturing-the-essence}

ethereum.org içeriğini çevirirken kelimesi kelimesine çevirilerden kaçının.

Çevirilerin mesajın özünü yakalaması önemlidir. Bu, belirli ifadeleri yeniden ifade etmek veya içeriği kelimesi kelimesine çevirmek yerine açıklayıcı çeviriler kullanmak anlamına gelebilir.

Farklı dillerin farklı dilbilgisi kuralları, gelenekleri ve kelime dizilişleri vardır. Çeviri yaparken, lütfen hedef dillerde cümlelerin nasıl yapılandırıldığına dikkat edin ve zayıf cümle yapısına ve okunabilirliğe yol açabileceğinden İngilizce kaynağı kelimesi kelimesine çevirmekten kaçının.

Kaynak metni kelimesi kelimesine çevirmek yerine, tüm cümleyi okumanız ve hedef dilin kurallarına uyacak şekilde uyarlamanız önerilir.

## Resmi ve gayriresmi {#formal-vs-informal}

Her zaman kibar ve tüm ziyaretçiler için uygun olan resmi hitap şeklini kullanıyoruz.

Resmi hitap kullanmak, gayriresmi veya kırıcı görünmekten kaçınmamızı sağlar ve ziyaretçinin yaşı ve cinsiyeti ne olursa olsun işe yarar.

Çoğu Hint-Avrupa ve Afro-Asyatik dil, erkek ve dişi arasında ayrım yapan cinsiyete özgü ikinci tekil şahıs zamirleri kullanır. Kullanıcıya hitap ederken veya iyelik zamirleri kullanırken, resmi hitap şekli kendilerini nasıl tanımladıklarından bağımsız olarak genel olarak uygulanabilir ve tutarlı olduğundan, ziyaretçinin cinsiyetini varsaymaktan kaçınabiliriz.

## Basit ve net kelime dağarcığı ve anlam {#simple-vocabulary}

Amacımız, web sitesindeki içeriği mümkün olduğunca çok kişi için anlaşılır kılmaktır.

Çoğu durumda bu, kolayca anlaşılabilen kısa ve basit kelimeler kullanılarak kolayca başarılabilir. Dilinizde belirli bir kelime için aynı anlama gelen birden fazla olası çeviri varsa, en iyi seçenek genellikle anlamı açıkça yansıtan en kısa kelimedir.

## Yazı sistemi {#writing-system}

Ethereum.org, Latin alfabesine alternatif yazı sistemleri (veya alfabeler) kullanan çeşitli dillerde mevcuttur.

İçeriğin tamamı diliniz için doğru yazı sistemi kullanılarak çevrilmeli ve Latin karakterleri kullanılarak yazılmış herhangi bir kelime içermemelidir.

İçeriği çevirirken, çevirilerin tutarlı olduğundan ve herhangi bir Latin karakteri içermediğinden emin olmalısınız.

Yaygın bir yanılgı, Ethereum'un her zaman Latin alfabesiyle yazılması gerektiğidir. Bu çoğunlukla yanlıştır, lütfen Ethereum'un dilinize özgü yazılışını kullanın (örneğin, Çince'de 以太坊, Arapça'da إيثيريوم vb.).

**Yukarıdakiler, kural olarak özel isimlerin çevrilmemesi gereken diller için geçerli değildir.**

## Sayfa meta verilerini çevirme {#translating-metadata}

Bazı sayfalar, sayfada 'title', 'lang', 'description', 'sidebar' vb. gibi meta veriler içerir.

Crowdin'e yeni sayfalar yüklerken çevirmenlerin asla çevirmemesi gereken içeriği gizliyoruz, bu da Crowdin'de çevirmenlerin görebildiği tüm meta verilerin çevrilmesi gerektiği anlamına gelir.

Kaynak metnin 'en' olduğu herhangi bir dizeyi çevirirken lütfen özellikle dikkatli olun. Bu, sayfanın mevcut olduğu dili temsil eder ve [diliniz için ISO dil koduna](https://www.andiamo.co.uk/resources/iso-language-codes/) çevrilmelidir. Bu dizeler her zaman hedef dile özgü yazı sistemiyle değil, Latin karakterleri kullanılarak çevrilmelidir.

Hangi dil kodunu kullanacağınızdan emin değilseniz, Crowdin'deki çeviri belleğini kontrol edebilir veya Crowdin çevrimiçi düzenleyicisindeki sayfanın URL'sinde diliniz için dil kodunu bulabilirsiniz.

En çok konuşulan diller için bazı dil kodu örnekleri:

- Arapça - ar
- Basitleştirilmiş Çince - zh
- Fransızca - fr
- Hintçe - hi
- İspanyolca - es

## Harici makalelerin başlıkları {#external-articles}

Bazı dizeler harici makalelerin başlıklarını içerir. Geliştirici belgeleri sayfalarımızın çoğu, daha fazla okuma için harici makalelere bağlantılar içerir. Makalelerin başlıklarını içeren dizelerin, sayfayı kendi dillerinde görüntüleyen ziyaretçiler için daha tutarlı bir kullanıcı deneyimi sağlamak amacıyla, makalenin dilinden bağımsız olarak çevrilmesi gerekir.

Bu dizelerin çevirmenler için nasıl göründüğüne ve bunların nasıl tanımlanacağına dair bazı örnekleri aşağıda bulabilirsiniz (makalelere giden bağlantılar çoğunlukla bu sayfaların alt kısmında, 'Daha fazla okuma' bölümünde bulunabilir):

![Article titles in sidebar.png](./article-titles-in-sidebar.png)
![Article titles in editor.png](./article-titles-in-editor.png)

## Crowdin uyarıları {#crowdin-warnings}

Crowdin, çevirmenleri bir hata yapmak üzere olduklarında uyaran yerleşik bir özelliğe sahiptir. Kaynaktan bir etiketi eklemeyi unutursanız, çevrilmemesi gereken öğeleri çevirirseniz, art arda birkaç boşluk eklerseniz, son noktalama işaretini unutursanız vb. durumlarda Crowdin çevirinizi kaydetmeden önce sizi otomatik olarak uyaracaktır.
Böyle bir uyarı görürseniz, lütfen geri dönün ve önerilen çeviriyi iki kez kontrol edin.

**Bu uyarıları asla göz ardı etmeyin, çünkü bunlar genellikle bir şeylerin yanlış olduğu veya çeviride kaynak metnin önemli bir parçasının eksik olduğu anlamına gelir.**

Çevirinize bir etiket eklemeyi unuttuğunuzda ortaya çıkan bir Crowdin uyarısı örneği:
![Example of a Crowdin warning](./crowdin-warning-example.png)

## Etiketler ve kod parçacıklarıyla başa çıkmak {#dealing-with-tags}

Kaynak içeriğin büyük bir kısmı, Crowdin düzenleyicisinde sarı renkle vurgulanan etiketler ve değişkenler içerir. Bunlar farklı işlevlere hizmet eder ve bunlara doğru şekilde yaklaşılmalıdır.

**Crowdin ayarları**

Etiketleri yönetmeyi ve doğrudan kaynaktan kopyalamayı kolaylaştırmak için Crowdin düzenleyicisindeki ayarlarınızı değiştirmenizi öneririz.

1. Ayarları açın
   ![How to open settings in the editor](./editor-settings.png)

2. 'HTML tags displaying' (HTML etiketlerinin görüntülenmesi) bölümüne gidin

3. 'Hide' (Gizle) seçeneğini seçin
   ![Please select 'Hide'](./hide-tags.png)

4. 'Save' (Kaydet) düğmesine tıklayın

Bu seçeneği belirlediğinizde, tam etiket metni artık gösterilmeyecek ve yerine bir sayı gelecektir.
Çeviri yaparken, bu etikete tıklamak etiketin tam olarak aynısını çeviri alanına otomatik olarak kopyalayacaktır.

**Bağlantılar**

ethereum.org veya diğer web sitelerindeki sayfalara giden tam bağlantılar fark edebilirsiniz.

Bunlar kaynakla aynı olmalı ve değiştirilmemeli veya çevrilmemelidir. Bir bağlantıyı çevirirseniz veya eğik çizgi (/) gibi bir kısmını kaldırmak da dahil olmak üzere herhangi bir şekilde değiştirirseniz, bu durum bozuk ve kullanılamaz bağlantılara yol açacaktır.

Bağlantıları işlemenin en iyi yolu, üzerlerine tıklayarak veya 'Copy Source' (Kaynağı Kopyala) düğmesini (`Alt+C`) kullanarak onları doğrudan kaynaktan kopyalamaktır.

![Example of link.png](./example-of-link.png)

Bağlantılar ayrıca kaynak metinde etiketler şeklinde de görünür (ör. `<0>` `</0>`). Etiketin üzerine gelirseniz, düzenleyici tam içeriğini gösterecektir; bazen bu etiketler bağlantıları temsil eder.

Bağlantıları kaynaktan kopyalamak ve sıralarını değiştirmemek çok önemlidir.

Etiketlerin sırası değiştirilirse, temsil ettikleri bağlantı bozulacaktır.

![Example of links inside tags.png](./example-of-links-inside-tags.png)

**Etiketler ve değişkenler**

Kaynak metin, her zaman kaynaktan kopyalanması ve asla değiştirilmemesi gereken birçok farklı türde etiket içerir. Yukarıdakine benzer şekilde, bu etiketlerin çevirideki sırası da kaynakla aynı kalmalıdır.

Etiketler her zaman bir açılış ve kapanış etiketi içerir. Çoğu durumda, açılış ve kapanış etiketleri arasındaki metin çevrilmelidir.

Örnek: `<strong x-id="1">`Merkeziyetsiz`</strong>`

`<strong x-id="1">` - _Metni kalın yapan açılış etiketi_

Merkeziyetsiz - _Çevrilebilir metin_

`</strong>` - _Kapanış etiketi_

![Example of 'strong' tags.png](./example-of-strong-tags.png)

Çevrilmemesi gereken kodlar içerdiklerinden, kod parçacıklarına diğer etiketlerden biraz daha farklı yaklaşılmalıdır.

Örnek: `<code>`nonce`</code>`

`<code>` - _Bir kod parçacığı içeren açılış etiketi_

nonce - _Çevrilemeyen metin_

`</code>` - _Kapanış etiketi_

![Example of code snippets.png](./example-of-code-snippets.png)

Kaynak metin ayrıca yalnızca sayılar içeren kısaltılmış etiketler de içerir, bu da işlevlerinin hemen anlaşılamayacağı anlamına gelir. Tam olarak hangi işleve hizmet ettiklerini görmek için bu etiketlerin üzerine gelebilirsiniz.

Aşağıdaki örnekte, `<0>` etiketinin üzerine gelindiğinde bunun `<code>` etiketini temsil ettiğini ve bir kod parçacığı içerdiğini görebilirsiniz, bu nedenle bu etiketlerin içindeki içerik çevrilmemelidir.

![Example of ambiguous tags.png](./example-of-ambiguous-tags.png)

## Kısa ve tam formlar/kısaltmalar {#short-vs-full-forms}

Web sitesinde kullanılan birçok kısaltma vardır, ör. dapps, NFT, DAO, DeFi vb. Bu kısaltmalar İngilizcede yaygın olarak kullanılır ve web sitesini ziyaret edenlerin çoğu bunlara aşinadır.

Genellikle diğer dillerde yerleşik çevirileri olmadığından, bu ve benzeri terimlere yaklaşmanın en iyi yolu, tam formun açıklayıcı bir çevirisini sağlamak ve İngilizce kısaltmayı parantez içine eklemektir.

Çoğu kişi bunlara aşina olmayacağından ve yerelleştirilmiş sürümler çoğu ziyaretçi için pek bir anlam ifade etmeyeceğinden bu kısaltmaları çevirmeyin.

dapps kelimesinin nasıl çevrileceğine dair örnek:

- Merkeziyetsiz uygulamalar (dapps) → _Çevrilmiş tam form (Parantez içinde İngilizce kısaltma)_

## Yerleşik çevirisi olmayan terimler {#terms-without-established-translations}

Bazı terimlerin diğer dillerde yerleşik çevirileri olmayabilir ve orijinal İngilizce terimle yaygın olarak bilinirler. Bu tür terimler çoğunlukla İş Kanıtı (PoW), Hisse Kanıtı (PoS), İşaret zinciri, staking vb. gibi daha yeni kavramları içerir.

İngilizce sürüm diğer dillerde de yaygın olarak kullanıldığından, bu terimleri çevirmek kulağa doğal gelmese de, çevrilmeleri şiddetle tavsiye edilir.

Bunları çevirirken yaratıcı olmaktan, açıklayıcı çeviriler kullanmaktan veya sadece kelimesi kelimesine çevirmekten çekinmeyin.

**Bazılarını İngilizce bırakmak yerine çoğu terimin çevrilmesi gerektiğinin nedeni, daha fazla insan Ethereum ve ilgili teknolojileri kullanmaya başladıkça bu yeni terminolojinin gelecekte daha yaygın hale geleceği gerçeğidir. Dünyanın her yerinden daha fazla insanı bu alana dahil etmek istiyorsak, kendimiz yaratmamız gerekse bile, mümkün olduğunca çok dilde anlaşılır terminoloji sağlamalıyız.**

## Düğmeler ve Harekete Geçirici Mesajlar (CTA'lar) {#buttons-and-ctas}

Web sitesi, diğer içeriklerden farklı şekilde çevrilmesi gereken çok sayıda düğme içerir.

Düğme metni, çoğu dizeyle bağlantılı bağlam ekran görüntüleri görüntülenerek veya düzenleyicide ''button'' (düğme) ifadesini içeren bağlam kontrol edilerek tanımlanabilir.

Biçimlendirme uyuşmazlıklarını önlemek için düğmelerin çevirileri mümkün olduğunca kısa olmalıdır. Ek olarak, düğme çevirileri emir kipinde olmalıdır, yani bir komut veya istek sunmalıdır.

![How to find a button.png](./how-to-find-a-button.png)

## Kapsayıcılık için çeviri {#translating-for-inclusivity}

Ethereum.org ziyaretçileri dünyanın her yerinden ve farklı geçmişlerden gelmektedir. Bu nedenle web sitesindeki dil tarafsız, herkesi kucaklayan ve dışlayıcı olmayan bir dil olmalıdır.

Bunun önemli bir yönü cinsiyet tarafsızlığıdır. Bu, resmi hitap şekli kullanılarak ve çevirilerde cinsiyete özgü kelimelerden kaçınılarak kolayca başarılabilir.

Kapsayıcılığın bir başka biçimi de herhangi bir ülkeye, ırka veya bölgeye özgü olmayan, küresel bir kitle için çeviri yapmaya çalışmaktır.

Son olarak, dil tüm kitlelere ve yaşlara uygun olmalıdır.

## Dile özgü çeviriler {#language-specific-translations}

Çeviri yaparken, kaynaktan kopyalamak yerine dilinizde kullanılan dilbilgisi kurallarına, geleneklere ve biçimlendirmeye uymak önemlidir. Kaynak metin, diğer birçok dil için geçerli olmayan İngilizce dilbilgisi kurallarını ve geleneklerini izler.

Dilinizin kurallarının farkında olmalı ve buna göre çeviri yapmalısınız. Yardıma ihtiyacınız olursa bize ulaşın, bu öğelerin dilinizde nasıl kullanılması gerektiğine dair bazı kaynaklar bulmanıza yardımcı olalım.

Özellikle dikkat edilmesi gerekenlere dair bazı örnekler:

### Noktalama işaretleri, biçimlendirme {#punctuation-and-formatting}

**Büyük harf kullanımı**

- Farklı dillerde büyük harf kullanımında büyük farklılıklar vardır.
- İngilizcede başlıklar ve isimler, aylar ve günler, dil isimleri, tatiller vb. içindeki tüm kelimelerin ilk harfini büyük yazmak yaygındır. Diğer birçok dilde, farklı büyük harf kullanımı kuralları olduğundan bu dilbilgisi açısından yanlıştır.
- Bazı dillerde ayrıca İngilizcede büyük harfle yazılmayan şahıs zamirleri, isimler ve belirli sıfatların büyük harfle yazılmasıyla ilgili kurallar vardır.

**Boşluk bırakma**

- İmla kuralları her dil için boşluk kullanımını tanımlar. Boşluklar her yerde kullanıldığından, bu kurallar en belirgin olanlardan bazılarıdır ve boşluklar en çok yanlış çevrilen öğelerden bazılarıdır.
- İngilizce ve diğer diller arasında boşluk bırakma konusundaki bazı yaygın farklılıklar:
  - Ölçü birimleri ve para birimlerinden önce boşluk (ör. USD, EUR, kB, MB)
  - Derece işaretlerinden önce boşluk (ör. °C, ℉)
  - Bazı noktalama işaretlerinden, özellikle üç noktadan (…) önce boşluk
  - Eğik çizgilerden (/) önce ve sonra boşluk

**Listeler**

- Her dilin liste yazmak için çeşitli ve karmaşık bir dizi kuralı vardır. Bunlar İngilizceden önemli ölçüde farklı olabilir.
- Bazı dillerde her yeni satırın ilk kelimesinin büyük harfle başlaması gerekirken, diğerlerinde yeni satırlar küçük harflerle başlamalıdır. Birçok dilin ayrıca her satırın uzunluğuna bağlı olarak listelerde büyük harf kullanımıyla ilgili farklı kuralları vardır.
- Aynı durum satır öğelerinin noktalama işaretleri için de geçerlidir. Listelerdeki son noktalama işareti, dile bağlı olarak nokta (**.**), virgül (**,**) veya noktalı virgül (**;**) olabilir.

**Tırnak işaretleri**

- Diller birçok farklı tırnak işareti kullanır. İngilizce tırnak işaretlerini kaynaktan kopyalamak genellikle yanlıştır.
- En yaygın tırnak işareti türlerinden bazıları şunlardır:
  - „örnek metin“
  - ‚örnek metin’
  - »örnek metin«
  - “örnek metin”
  - ‘örnek metin’
  - «örnek metin»

**Kısa ve uzun çizgiler**

- İngilizcede kısa çizgi (-) kelimeleri veya bir kelimenin farklı kısımlarını birleştirmek için kullanılırken, uzun çizgi (–) bir aralığı veya duraklamayı belirtmek için kullanılır.
- Birçok dilin kısa ve uzun çizgilerin kullanımı için uyulması gereken farklı kuralları vardır.

### Biçimler {#formats}

**Sayılar**

- Farklı dillerde sayı yazımındaki temel fark, ondalık sayılar ve binler için kullanılan ayırıcıdır. Binler için bu bir nokta, virgül veya boşluk olabilir. Benzer şekilde, bazı diller ondalık nokta kullanırken diğerleri ondalık virgül kullanır.
  - Büyük sayılara bazı örnekler:
    - İngilizce – **1,000.50**
    - İspanyolca – **1.000,50**
    - Fransızca – **1 000,50**
- Sayıları çevirirken bir diğer önemli husus yüzde işaretidir. Farklı şekillerde yazılabilir: **100%**, **100 %** veya **%100**.
- Son olarak, negatif sayılar dile bağlı olarak farklı şekilde görüntülenebilir: -100, 100-, (100) veya [100].

**Tarihler**

- Tarihleri çevirirken, dile bağlı olarak bir dizi husus ve farklılık vardır. Bunlar arasında tarih biçimi, ayırıcı, büyük harf kullanımı ve baştaki sıfırlar bulunur. Tam uzunluktaki ve sayısal tarihler arasında da farklılıklar vardır.
  - Farklı tarih biçimlerine bazı örnekler:
    - İngilizce Birleşik Krallık (gg/aa/yyyy) – 1st January, 2022
    - İngilizce ABD (aa/gg/yyyy) – January 1st, 2022
    - Çince (yyyy-aa-gg) – 2022 年 1 月 1 日
    - Fransızca (gg/aa/yyyy) – 1er janvier 2022
    - İtalyanca (gg/aa/yyyy) – 1º gennaio 2022
    - Almanca (gg/aa/yyyy) – 1. Januar 2022

**Para birimleri**

- Farklı biçimler, gelenekler ve dönüştürmeler nedeniyle para birimlerini çevirmek zor olabilir. Genel bir kural olarak, lütfen para birimlerini kaynakla aynı tutun. Okuyucunun yararına yerel para biriminizi ve dönüştürmeyi parantez içine ekleyebilirsiniz.
- Farklı dillerde para birimlerinin yazımındaki temel farklılıklar arasında sembol yerleşimi, ondalık virgüllere karşı ondalık noktalar, boşluk bırakma ve kısaltmalara karşı semboller bulunur.
  - Sembol yerleşimi: $100 veya 100$
  - Ondalık virgüllere karşı ondalık noktalar: 100,50$ veya 100.50$
  - Boşluk bırakma: 100$ veya 100 $
  - Kısaltmalara karşı semboller: 100 $ veya 100 USD

**Ölçü birimleri**

- Genel bir kural olarak, lütfen ölçü birimlerini kaynağa uygun olarak tutun. Ülkeniz farklı bir sistem kullanıyorsa, dönüştürmeyi parantez içine ekleyebilirsiniz.
- Ölçü birimlerinin yerelleştirilmesinin yanı sıra, dillerin bu birimlere yaklaşımındaki farklılıkları da not etmek önemlidir. Temel fark, dile bağlı olarak değişebilen sayı ve birim arasındaki boşluktur. Bunun örnekleri arasında 100kB'ye karşı 100 kB veya 50ºF'ye karşı 50 ºF bulunur.

## Sonuç {#conclusion}

ethereum.org'u çevirmek, Ethereum'un farklı yönleri hakkında bilgi edinmek için harika bir fırsattır.

Çeviri yaparken acele etmemeye çalışın. Ağırdan alın ve eğlenin!

Çeviri Programına dahil olduğunuz ve web sitesini daha geniş bir kitle için erişilebilir hale getirmemize yardımcı olduğunuz için teşekkür ederiz. Ethereum topluluğu küreseldir ve sizin de bunun bir parçası olmanızdan mutluluk duyuyoruz!