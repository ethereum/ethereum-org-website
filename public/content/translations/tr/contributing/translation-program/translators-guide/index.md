---
title: Çevirmen rehberi
lang: tr
description: Ethereum.org çevirmenleri için talimatlar ve ipuçları
---

# Ethereum.org Çeviri Stili Rehberi {#style-guide}

Ethereum.org çeviri stili rehberi, web sitesini yerelleştirmemize yardımcı olan çevirmenler için en önemli yönergelerden, talimatlardan ve ipuçlarından bazılarını içerir.

Bu belge, genel bir rehber görevi görür ve herhangi bir dile özgü değildir.

Herhangi bir sorunuz, öneriniz veya geri bildiriminiz varsa lütfen translations@ethereum.org adresinden bize ulaşın, Crowdin'de @ethdotorg'a bir mesaj gönderin veya #translations kanalından bize mesaj gönderebileceğiniz veya ekip üyelerinden herhangi birine ulaşabileceğiniz [Discord](https://discord.gg/ethereum-org)'umuza katılın.

## Crowdin kullanma {#using-crowdin}

[Çeviri Programı sayfasında](/contributing/translation-program/#how-to-translate) Crowdin'de projeye nasıl katılacağınıza ve Crowdin çevrimiçi düzenleyicisinin nasıl kullanılacağına ilişkin temel talimatları bulabilirsiniz.

Crowdin hakkında daha fazla bilgi edinmek ve gelişmiş özelliklerinden bazılarını kullanmak istiyorsanız, [Crowdin bilgi bankası](https://support.crowdin.com/online-editor/) birçok kapsamlı kılavuz ve tüm Crowdin işlevlerine genel bakış içerir.

## Mesajın özünü yakalama {#capturing-the-essence}

Ethereum.org içeriğini çevirirken, kelimenin tam anlamıyla çeviri yapmaktan kaçının.

Çevirilerin, mesajın özünü yakalaması önemlidir. Bu, belirli ifadeleri yeniden ifade etmek veya içeriği kelimesi kelimesine tercüme etmek yerine açıklayıcı çeviriler kullanmak anlamına gelebilir.

Farklı dillerin farklı gramer kuralları, kuralları ve kelime sırası vardır. Çeviri yaparken, zayıf cümle yapısına ve okunabilirliğe yol açabileceği için lütfen cümlelerin hedef dillerde nasıl yapılandırıldığına dikkat edin ve İngilizce kaynağı kelimenin tam anlamıyla çevirmekten kaçının.

Kaynak metni kelimesi kelimesine tercüme etmek yerine, tüm cümleyi okumanız ve onu hedef dilin kurallarına uyacak şekilde uyarlamanız tavsiye edilir.

## Resmi ve günlük dil {#formal-vs-informal}

Her zaman, kibar ve tüm ziyaretçiler için uygun olan resmi hitap biçimini kullanırız.

Resmi hitap biçimini kullanmak, günlük veya saldırgan görünmekten kaçınmamızı sağlar ve ziyaretçinin yaşı ve cinsiyeti ne olursa olsun işe yarar.

Hint-Avrupa ve Afro-Asya dillerinin çoğu, eril ve dişil kelimeler arasında ayrım yapan cinsiyete özgü ikinci şahıs zamirlerini kullanır. Kullanıcıya hitap ederken veya iyelik zamirlerini kullanırken, resmi hitap şekli genellikle nasıl tanımlandıklarına bakılmaksızın uygulanabilir ve tutarlı olduğundan, ziyaretçinin cinsiyetini varsaymaktan kaçınabiliriz.

## Basit ve net kelime haznesi ve anlam {#simple-vocabulary}

Amacımız, web sitesindeki içeriği mümkün olduğunca çok kişi için anlaşılır kılmaktır.

Çoğu durumda bu, kolayca anlaşılabilir kısa ve basit kelimeler kullanılarak kolayca başarılabilir. Kendi dilinizde aynı anlama sahip belirli bir kelimenin birden fazla olası çevirisi varsa, en iyi seçenek çoğu zaman anlamı açıkça yansıtan en kısa kelimedir.

## Yazım sistemi {#writing-system}

Ethereum.org, Latince'ye alternatif yazma sistemleri (veya komut dosyaları yazma) kullanarak birçok dilde kullanılabilir.

İçeriğin tamamı dilinize uygun yazı sistemi kullanılarak çevrilmeli ve Latin karakterleri kullanılarak yazılmış herhangi bir kelime içermemelidir.

İçeriği çevirirken çevirilerin tutarlı olmasına ve Latince karakter içermemesine dikkat etmelisiniz.

Yaygın bir yanılgı, Ethereum'un her zaman Latince yazılması gerektiğidir. Bu çoğunlukla yanlıştır, lütfen kendi dilinize özgü Ethereum yazımını kullanın (örn. Çince'de 以太坊, Arapça'da إيثيريوم, vb.).

**Yukarıdakiler, özel isimlerin kural olarak tercüme edilmemesi gereken diller için geçerli değildir.**

## Sayfa meta verilerini çevirme {#translating-metadata}

Bazı sayfalar sayfada "başlık", "dil", "açıklama", "kenar çubuğu" vb. gibi meta veriler içerir.

Crowdin'e yeni sayfalar yüklerken çevirmenlerin asla çevirmemesi gereken içeriği gizleriz, bu da çevirmenlerin Crowdin'de görebildiği tüm meta verilerin çevrilmesi gerektiği anlamına gelir.

Lütfen kaynak metnin "en" olduğu dizeleri çevirirken özellikle dikkatli olun. Bu, sayfanın mevcut olduğu dili temsil eder ve [dilinizin ISO dil koduna çevrilmesi gerekir](https://www.andiamo.co.uk/resources/iso-language-codes/). Bu dizgiler her zaman hedef dile özgü yazı dizisi değil, Latin karakterler kullanılarak çevrilmelidir.

Hangi dil kodunu kullanacağınızdan emin değilseniz, Crowdin'deki çeviri belleğini kontrol edebilir veya Crowdin çevrimiçi düzenleyicideki sayfanın URL'sinde kendi dilinizin dil kodunu bulabilirsiniz.

En çok konuşulan diller için bazı dil kodları örnekleri:

- Arapça - ar
- Çince (Basitleştirilmiş) - zh
- Fransızca - fr
- Hintçe - hi
- İspanyolca - es

## Harici makalelerin başlıkları {#external-articles}

Bazı dizgiler, harici makalelerin başlıklarını içerir. Geliştirici belgesi sayfalarımızın çoğu, daha fazla okuma için harici makalelere yönlendiren bağlantılar içerir. Sayfayı kendi dillerinde görüntüleyen ziyaretçiler için daha tutarlı bir kullanıcı deneyimi sağlamak için makalenin dilinden bağımsız olarak makale başlıklarını içeren dizgilerin çevrilmesi gerekir.

Bu dizgilerin çevirmenler için nasıl göründüğüne ve bunların nasıl tanımlanacağına ilişkin bazı örnekleri aşağıda bulabilirsiniz (makalelere yönlendiren bağlantılar çoğunlukla bu sayfaların alt kısmında, "Daha fazla bilgi" bölümünde bulunabilir):

![Sidebar.png'deki makale başlıkları](./article-titles-in-sidebar.png) ![editor.png'deki makale başlıkları](./article-titles-in-editor.png)

## Crowdin uyarıları {#crowdin-warnings}

Crowdin, çevirmenleri hata yapmak üzereyken uyaran yerleşik bir özelliğe sahiptir. Çevrilmemesi gereken öğeleri çevirirseniz, kaynaktan bir etiket eklemeyi, birkaç ardışık boşluk eklemeyi, son noktalama işaretlerini koymayı vb. unutursanız, Crowdin çevirinizi kaydetmeden önce sizi bu konuda otomatik olarak uyaracaktır. Bunun gibi bir uyarı görürseniz lütfen geri dönün ve önerilen çeviriyi tekrar kontrol edin.

**Bu uyarıları asla göz ardı etmeyin, çünkü bunlar genellikle bir şeylerin yanlış olduğu veya çevirinin kaynak metnin önemli bir bölümünün eksik olduğu anlamına gelir.**

Çevirinize bir etiket eklemeyi unuttuğunuzda verilen bir Crowdin uyarısı örneği: ![Bir Crowdin uyarısı örneği](./crowdin-warning-example.png)

## Etiketler ve kod parçacıkları hakkında yapılacaklar {#dealing-with-tags}

Kaynak içeriğin çoğu, Crowdin düzenleyicisinde sarı renkle vurgulanan etiketler ve değişkenler içerir. Bunlar, farklı fonksiyonlar gerçekleştirir ve bunlara doğru bir şekilde yaklaşılmalıdır.

**Crowdin ayarları**

Etiket yönetimini kolaylaştırmak ve onları doğrudan kaynağından kopyalamak için Crowdin düzenleyicisinden ayarlarınızı değiştirmenizi öneririz.

1. Açık ayarlar ![Düzenleyicide ayarları açma](./editor-settings.png)

2. "HTML etiketlerini görüntüleme" bölümüne inin

3. "Sakla" öğesini seçin ![Lütfen "Gizle" öğesini seçin](./hide-tags.png)

4. "Kaydet" öğesine tıklayın

Bu seçeneği seçtikten sonra tüm etiket metni artık gösterilmez ve onun yerine bir sayı gösterilir. Tercüme yaparken bu etikete tıkladığınızda, aynı etiket tercüme alanına doğrudan kopyalanır.

**Bağlantılar**

Ethereum.org veya diğer web sitelerindeki sayfalara yönlendiren tam bağlantılar görebilirsiniz.

Bunlar kaynakla aynı olmalı; değiştirilmemeli veya tercüme edilmemelidir. Bir bağlantıyı çevirirseniz veya hatta ters eğik çizgi (/) gibi sadece bir kısmını kaldırarak herhangi bir şekilde değiştirirseniz, çalışmayan ve kullanılamaz bağlantılar ortaya çıkacaktır.

Bağlantılar için yapılacak en iyi şey, üzerlerine tıklayarak veya "Kaynağı Kopyala" düğmesini (Alt+C) kullanarak onları doğrudan kaynaktan kopyalamaktır.

![Link örneği.png](./example-of-link.png)

Bağlantılar, kaynak metinde etiketler biçiminde de görünür (örn. <0> </0>). Etiketin üzerine geldiğinizde, düzenleyici tam içeriğini gösterir: Bazen bu etiketler bağlantıları temsil eder.

Bağlantıları kaynaktan kopyalamak ve sıralarını değiştirmemek çok önemlidir.

Etiketlerin sırası değiştirilirse temsil ettikleri bağlantı çalışmaz.

![Etiketlerin içinde link örnekleri.png](./example-of-links-inside-tags.png)

**Etiketler ve değişkenler**

Kaynak metin, her zaman kaynaktan kopyalanması ve asla değiştirilmemesi gereken birçok farklı türde etiket içerir. Yukarıdakine benzer şekilde, bu etiketlerin çevirideki sırası da kaynakla aynı kalmalıdır.

Etiketler her zaman bir açma ve kapatma etiketi içerir. Çoğu durumda, açma ve kapatma etiketleri arasındaki metin çevrilmelidir.

Örnek: `<strong x-id="1">`Decentralized`</strong>`

`<strong x-id="1">` - _Metni kalın yapan açma etiketi_

Decentralized - _Çevrilebilir metin_

`</strong>` - _Kapatma etiketi_

!["strong" etiketlerinin örneği.png](./example-of-strong-tags.png)

Kod parçacıkları, çevrilmemesi gereken kodlar içerdiğinden diğer etiketlerden biraz farklı bir şekilde ele alınmalıdır.

Örnek: `<code>`nonce`</code>`

`<code>` - _Bir kod parçacığı içeren açma etiketi_

nonce - _Çevrilmemesi gereken metin_

`</code>` - _Kapatma etiketi_

![Kod parçacıklarının örneği.png](./example-of-code-snippets.png)

Kaynak metin, yalnızca sayıları içeren kısaltılmış etiketler de içerir; yani, bunların fonksiyonu hemen anlaşılabilir olmayabilir. Tam olarak hangi fonksiyonu yerine getirdiklerini görmek için imleci bu etiketlerin üzerine götürebilirsiniz.

Aşağıdaki örnekte, imleç üzerine götürüldüğünde <0> etiketin `<code>` öğesini temsil ettiğini ve bir kod parçacığı içerdiğini görebilirsiniz; bu nedenle, bu etiketlerin içindeki içerik çevrilmemelidir.

![Belirsiz etiketlerin örneği.png](./example-of-ambiguous-tags.png)

## Kısa vs. eksiksiz hâller/kısatmalar {#short-vs-full-forms}

Web sitesinde kullanılan birçok kısaltma vardır, örn. dapps, NFT, DAO, DeFi vb. Bu kısaltmalar genellikle İngilizce olarak kullanılır ve web sitesini ziyaret edenlerin çoğu bunlara aşinadır.

Genellikle diğer dillerde yerleşik çevirileri olmadığı için bu ve benzeri terimleri ele almanın en iyi yolu, tam hâlinin açıklayıcı bir çevirisini sağlamak ve İngilizce kısaltmasını parantez içinde eklemektir.

Çoğu insan bunlara aşina olmayacağından ve yerelleştirilmiş hâlleri çoğu ziyaretçi için pek anlamlı olmayacağından bu kısaltmaları çevirmeyin.

Dapps kısaltmasının nasıl çevrilmesi gerektiğine dair örnek:

- Merkeziyetsiz uygulamalar (dapps) → _Tercüme edilmiş tam metin (parantez içinde İngilizce kısaltması)_

## Yerleşmiş çevirileri olmayan terimler {#terms-without-established-translations}

Bazı terimlerin diğer dillerde yerleşmiş çevirileri bulunmayabilir ve bu terimler, orijinal İngilizce hâliyle yaygın olarak biliniyor olabilir. Proof-of-work, proof-of-stake, Beacon Chain, staking vb. nispeten yeni olan terimler buna örnek gösterilebilir.

İngilizce versiyonu diğer dillerde de yaygın olarak kullanıldığından bu terimleri çevirmek kulağa doğal gelmese de çevrilmeleri şiddetle tavsiye edilir.

Bunları çevirirken yaratıcı ve açıklayıcı çeviriler kullanmaktan çekinmeyin veya gerekirse düz bir şekilde tam anlamıyla çevirin.

**Bazı terimleri İngilizce bırakmak yerine çoğu terimin çevrilmesinin nedeni, Ethereum ve ilgili teknolojileri daha fazla insan kullanmaya başladıkça, bu yeni terminolojinin gelecekte daha yaygın hâle geleceği gerçeğidir. Dünyanın her yerinden daha fazla insanı bu alana dahil etmek istiyorsak, kendimiz oluşturmamız gerekse bile mümkün olduğunca çok dilde anlaşılır terminoloji sağlamamız gerekir.**

## Butonlar ve CTA'lar {#buttons-and-ctas}

Web sitesi, diğer içeriklerden farklı şekilde çevrilmesi gereken çok sayıda düğme içerir.

Düğme metni, çoğu dizeyle bağlantılı bağlam ekran görüntülerini görüntüleyerek veya düzenleyicideki "düğme" ifadesini içeren bağlamı kontrol ederek anlaşılabilir.

Biçimlendirme uyumsuzluklarını önlemek için düğmelerin çevirileri mümkün olduğunca kısa olmalıdır. Ek olarak, düğme çevirileri emir kipi hâlinde olmalıdır, yani bir komut veya istek içermelidir.

![Bir düğme nasıl bulunur.png](./how-to-find-a-button.png)

## Kapsayıcılık için çeviri {#translating-for-inclusivity}

Ethereum.org'un ziyaretçileri, dünyanın farklı bölgelerindendir ve farklı geçmişlere sahiptir. Bu nedenle web sitesindeki dil; tarafsız, herkese açık ve kapsayıcı olmalıdır.

Cinsiyetsiz ifadeler bunun önemli bir parçasıdır. Bu, resmi hitap biçimini kullanarak ve çevirilerde cinsiyete özgü sözcüklerden kaçınarak kolayca başarılabilir.

Kapsayıcılığın başka bir biçimi; herhangi bir ülkeye, ırka veya bölgeye özgü olmayan küresel bir kullanıcı kitlesine yönelik çeviri yapmaya çalışmaktır.

Son olarak üslup, tüm kullanıcılara ve her yaşa uygun olmalıdır.

## Dile özel çeviriler {#language-specific-translations}

Çeviri yaparken kaynaktan kopyalamak yerine kendi dilinizde kullanılan dil bilgisi kurallarına, kabullere ve biçimlendirmeye uymak önemlidir. Kaynak metin, İngilizce dil bilgisi kural ve kabullerine uygundur; bu kural ve kabuller, diğer birçok dil için geçerli değildir.

Dilinizin kurallarını bilmeli ve buna göre çeviri yapmalısınız. Yardıma ihtiyacınız olduğunda bize ulaşırsanız ve bu öğelerin kendi dilinizde nasıl kullanılması gerektiğine dair bazı kaynaklar bulmanıza yardımcı olabiliriz.

Özellikle nelere dikkat edilmesi gerektiğine dair bazı örnekler:

### Noktalama, biçimlendirme {#punctuation-and-formatting}

**Büyük/Küçük Harf**

- Farklı dillerde büyük/küçük harf kullanımında büyük farklılıklar bulunur.
- İngilizce'de; başlıklarda ve adlarda, aylarda ve günlerde, dil adlarında, tatillerde vb. tüm sözcüklerin büyük harfle yazılması yaygındır. Diğer birçok dilde, farklı büyük harf kullanım kurallarına sahip oldukları için bu durum dil bilgisi açısından yanlıştır.
- Bazı dillerde, İngilizce'de büyük harfle yazılmayan şahıs zamirlerinin, isimlerin ve belirli sıfatların büyük harfle yazılmasıyla ilgili kurallar da vardır.

**Boşluklar**

- İmla kuralları, her dil için boşluk kullanımını tanımlar. Boşluklar her yerde kullanıldığından, bu kurallar en belirgin olanlardan bazılarıdır ve boşluklar en yanlış çevrilen öğelerden bazılarıdır.
- İngilizce ve diğer diller arasındaki boşluk bırakma ilgili bazı yaygın farklılıklar:
  - Ölçü birimlerinden ve para birimlerinden önceki boşluk (ör. USD, EUR, kB, MB)
  - Derece işaretlerinden önceki boşluk (örneğin, °C, ℉)
  - Bazı noktalama işaretlerinden önce boşluk, özellikle üç nokta (…)
  - Taksimlerden (/) önce ve sonra boşluk

**Listeler**

- Her dilin liste yazmak için çeşitli ve karmaşık kuralları vardır. Bunlar İngilizceden önemli ölçüde farklı olabilir.
- Bazı dillerde, her yeni satırın ilk kelimesi büyük harfle yazılmalı, bazılarında ise yeni satırlar küçük harflerle başlamalıdır. Ayrıca birçok dilde, her satırın uzunluğuna bağlı olarak, listelerde büyük harf kullanımıyla ilgili farklı kurallar vardır.
- Aynısı satır öğelerinin noktalama işaretleri için de geçerlidir. Listelerdeki son noktalama işaretleri, dile bağlı olarak nokta (**.**), virgül (**,**) veya noktalı virgül (**;**) olabilir.

**Tırnak işaretleri**

- Diller birçok farklı tırnak işareti kullanır. İngilizce tırnak işaretlerini kaynaktan basitçe kopyalamak çoğu zaman yanlıştır.
- En yaygın tırnak işareti türlerinden bazıları şunlardır:
  - „örnek metin“
  - ‚örnek metin’
  - »örnek metin«
  - “örnek metin”
  - ‘örnek metin’
  - «örnek metin»

**Kısa çizgiler ve tireler**

- İngilizce'de kısa çizgi (-) sözcükleri veya bir sözcüğün farklı bölümlerini birleştirmek için kullanılırken tire (–) bir aralığı veya duraklamayı belirtmek için kullanılır.
- Birçok dilde, dikkat edilmesi gereken kısa çizgi ve tire kullanımı için farklı kurallar vardır.

### Biçimler {#formats}

**Sayılar**

- Farklı dillerde sayıların yazılmasındaki temel fark, ondalık ve binler için kullanılan ayırıcıdır. Binlerce kişi için bu nokta, virgül veya boşluk olabilir. Benzer şekilde, bazı diller ondalık nokta kullanırken, diğerleri ondalık virgül kullanır.
  - Büyük sayılara bazı örnekler:
    - İngilizce – **1,000.50**
    - İspanyolca – **1.000,50**
    - Fransızca – **1 000,50**
- Sayıları çevirirken dikkat edilmesi gereken bir diğer önemli nokta da yüzde işaretidir. Farklı şekillerde yazılabilir: **100%**, **100 %** veya **%100**.
- Son olarak, dile bağlı olarak negatif sayılar farklı şekilde görüntülenebilir: -100, 100-, (100) veya [100].

**Tarihler**

- Tarihleri çevirirken, dile bağlı olarak bir takım hususlar ve farklılıklar vardır. Bunlara tarih biçimi, ayırıcı, büyük harf kullanımı ve baştaki sıfırlar dahildir. Tam uzunluktaki ve sayısal tarihler arasında da farklılıklar vardır.
  - Farklı tarih biçimlerine bazı örnekler:
    - Birleşik Krallık İngilizcesi (gg/aa/yyyy) - 1 Ocak 2022
    - Amerikan İngilizcesi (aa/gg/yyyy) - Ocak 1, 2022
    - Çince (yyyy-aa-gg) – 2022 年 1 月 1 日
    - French (gg/aa/yyyy) – 1er janvier 2022
    - Italian (gg/aa/yyyy) – 1º gennaio 2022
    - German (gg/aa/yyyy) – 1. Ocak 2022

**Para birimleri**

- Farklı biçimler, kurallar ve dönüşümler nedeniyle para birimlerini çevirmek zor olabilir. Genel bir kural olarak, lütfen para birimlerini kaynakla aynı tutun. Okuyucunun yararına parantez içinde yerel para biriminizi ve dönüşümünüzü ekleyebilirsiniz.
- Farklı dillerde para birimleri yazmanın temel farklılıkları arasında sembol yerleşimi, ondalık virgül ve ondalık nokta, boşluk ve kısaltmalar ve semboller yer alır.
  - Sembol yerleştirmesi: $100 veya 100$
  - Ondalık virgül ve ondalık nokta: 100,50$ veya 100.50$
  - Boşluklar: $100 veya 100 $
  - Kısaltmalar vs. semboller: 100 $ veya 100 USD

**Ölçü birimleri**

- Genel bir kural olarak, lütfen ölçü birimlerini kaynağa uygun şekilde koruyun. Ülkeniz farklı bir sistem kullanıyorsa, dönüştürmeyi parantez içinde ekleyebilirsiniz.
- Ölçü birimlerinin yerelleştirilmesinin yanı sıra, dillerin bu birimlere yaklaşımlarındaki farklılıkları da not etmek önemlidir. Temel fark, dile bağlı olarak farklı olabilen sayı ve birim arasındaki boşluktur. Bunun örnekleri arasında 100 kB'ye karşı 100 kB veya 50ºF'ye karşı 50 ºF yer alır.

## Sonuç {#conclusion}

Ethereum.org'u çevirmek, Ethereum'un farklı yönlerini öğrenmek için harika bir fırsattır.

Çeviri yaparken acele etmemeye çalışın. Rahat olun ve eğlenin!

Çeviri Programına dahil olduğunuz ve web sitesini daha geniş bir kitleye ulaştırmamıza yardımcı olduğunuz için teşekkür ederiz. Ethereum topluluğu küreseldir ve bunun bir parçası olduğunuz için mutluyuz!
