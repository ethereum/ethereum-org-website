---
title: Çeviri Programı sıkça sorulan sorular (SSS)
lang: tr
description: Ethereum.org Çeviri Programı hakkında sık sorulan sorular
---

# Ethereum.org çeviri rehberi {#translating-ethereum-guide}

Çeviri Programında yeniyseniz ve başlamakta tereddüt ediyorsanız, başlamanıza yardımcı olabilecek bazı SSS'ler burada bulunuyor. En yaygın soruların cevaplarını bulmak için bu rehberi kullanın.

## Ethereum.org'u çevirdiğim için ücret alabilir miyim? {#compensation}

Ethereum.org açık kaynaklı bir web sitesidir; bu, herkesin dahil olup katkıda bulunabileceği anlamına gelir.

Ethereum.org Çeviri Programı, bunun bir uzantısıdır ve benzer bir felsefe göz önünde bulundurularak düzenlenmiştir.

Çeviri Programının amacı, Ethereum içeriğini, konuştukları dillerden bağımsız olarak herkes için erişilebilir kılmaktır. Ayrıca, iki dil bilen herhangi bir kişinin Ethereum ekosistemine dahil olmasına ve erişilebilir bir şekilde katkıda bulunmasına olanak tanır.

Bu nedenle Çeviri Programı açık ve gönüllü olup katılım ücrete tabi değildir. Çevirmenlere çevirdikleri kelime sayısı kadar ücret verseydik, sadece yeterli çeviri tecrübesi olanları (profesyonel çevirmenleri) Çeviri Programına davet edebilirdik. Bu, Çeviri Programını dışlayıcı hâle getirir ve belirtilen hedeflere, özellikle de herkesin katılmasına ve ekosisteme dahil olmasına izin vermemize engel olacaktır.

Katkıda bulunanların Ethereum ekosisteminde başarılı olmalarını sağlamak için her türlü çabayı gösteriyoruz; [POAP'ler sunmak](/contributing/translation-program/acknowledgements/#poap), [çevirmen sertifikası](/contributing/translation-program/acknowledgements/#certificate) ve ayrıca [Çeviri Lider Tabloları](/contributing/translation-program/acknowledgements/) ve [sitede tüm çevirmenlerimizin listelenmesi](/contributing/translation-program/contributors/) gibi pek çok parasal olmayan teşvik mevcuttur.

## `<HTML tags>` bulunan dizgileri nasıl çevirebilirim? {#tags}

Her dizgi saf yazı biçiminde yazılmamıştır. HTML etiketleri gibi farklı karakterler bulunduran dizgiler mevcuttur (`<0>`, `</0>`). Bu, genelde hyperlink veya cümle ortasında alternatif stil yaratmak için kullanılır.

- Etiketlerin içindeki yazıları çevirin, fakat etiketleri çevirmeyin. `<` ve `>` işaretleri içerisindeki hiçbir şey çevrilmemeli ya da silinmemelidir.
- Dizgiyi güvende tutmak için sol alttaki "Copy Source" (Kaynağı Kopyala) düğmesine basmanızı öneririz. Bu, orijinal dizgiyi kopyalayıp metin kutusuna yapıştırır. Bui etiketlerin nerede olduğunu anlamayı sağlar ve hata yapmamaya yardımcı olur.

![Kaynağı kopyala düğmesinin vurgulandığı bir Crowdin ara yüzü](./html-tag-strings.png)

Dilinizde daha doğal olması için dizgideki etiketlerin yerlerini değiştirebilirsiniz: Sadece etiketin tamamının yerini değiştirdiğinize emin olun.

Etiketler ve kod parçacıklarıyla ilgili daha ayrıntılı bilgi için lütfen [ethereum.org Çeviri Stili Rehberine](/contributing/translation-program/translators-guide/#dealing-with-tags) bakın.

## Dizgiler nerede yaşar? {#strings}

Bazen kaynak dizgileri doğru bir çeviri sağlamanız için yeterli olmayabilir.

- Daha fazla bilgi için "ekran fotoğrafları"na ve "bağlam"a bakabilirsiniz. Kaynak dizgi kısmında size metini nasıl kullandığımızı gösteren bir ekran fotoğrafı göreceksiniz.
- Eğer hâlâ emin değilseniz, "yorum kısmı"nda işaret koyabilirsiniz. [Nasıl yorum bırakacağınızı bilmiyor musunuz?](#comment)

![Bir ekran görüntüsü ile bir dizginin bağlamının nasıl sağlanabileceğinin gösterimi](./source-string.png)

![Bağlam için eklenmiş örnek bir ekran görüntüsü](./source-string-2.png)

## Nasıl yorum bırakabilir veya soru sorabilirim? Bir sorun veya yazım hatası işaretlemek istiyorum... {#comment}

Dikkat gerektiren özel bir dizgiyi işaretlemek istiyorsanız, yorum yapmaktan çekinmeyin.

- Sağ üstteki çubuğun ikinci düğmesine tıklayın. Gizli sekme sağınızda görünecektir. Yeni bir yorum bırakın ve alttaki "Sorun" onay kutusuna tıklayın. Açılır menüden seçeneklerden birini seçerek sorununuzun türünü belirtebilirsiniz.
- Gönderildikten sonra ekibimize bildirilecektir. Sorunu neticelendirip sizi bilgilendireceğiz ve sorunu kapatacağız.
- Hatalı bir çeviri bildirirseniz, çeviri ve önerdiğiniz alternatif, bir sonraki inceleme sırasında anadili İngilizce olan bir kişi tarafından incelenecektir.

![Yorumların ve sorunların nasıl yapılacağının gösterimi](./comment-issue.png)

## Çeviri Belleği (ÇB) nedir? {#translation-memory}

Çeviri Belleği (ÇB), Crowdin'in önceden çevrilmiş tüm dizgileri [ethereum.org](http://ethereum.org/) üzerinde depolayan bir özelliğidir. Bir dizgi çevirildiğinde, otomatik olarak proje ÇB'mize kaydedilir. Bu, zaman kazanmanıza yardımcı olacak yararlı bir araç olabilir!

- "ÇB ve MÇ Önerileri" kısmına bakarak diğer çevirmenlerin aynı veya benzer bir dizgiyi nasıl çevirdiğini görebilirsiniz. Yüksek eşleşme oranı olan bir öneri bulursanız, tıklayarak çeviriden yararlanmaktan çekinmeyin.
- Listede herhangi bir şey yoksa, önceden yapılmış çeviriler için ÇB'yi arayabilir ve tutarlılık için bu çevirileri yeniden kullanabilirsiniz.

![Çeviri belleğinin ekran görüntüsü](./translation-memory.png)

## Crowdin sözlüğünü nasıl kullanırım? {#glossary}

Ethereum terminolojisi, yeni teknoloji terimleri genelde birçok dilde çevrilmediği için çeviri işimizin diğer önemli bir kısmıdır. Ayrıca, farklı bağlamlarda farklı anlamlar içeren bazı terimler bulunur. [Ethereum terminolojisi hakkında daha fazla bilgi](#terminology)

Crowdin sözlüğü, terim ve anlamların açıklanması için en iyi yerdir. Sözlüğe başvurmanın iki yolu vardır.

- İlk olarak, kaynak dizgide altı çizili bir terim bulursanız, fareyle üzerine gelebilir ve hakkında kısa bir tanımlama görebilirsiniz.

![Örnek bir sözlük tanımı](./glossary-definition.png)

- İkinci olarak, eğer size tanıdık gelmeyen ve altı çizili olmayan bir terim görürseniz, terimler sekmesinde (sağdaki sütunun üçüncü butonu) arattırabilirsiniz. Spesifik terimlerin açıklamalarını ve projede geçmişte kullanılmış olanları bulacaksınız.

![Crowdin'de terimler sekmesinin nerede bulunacağını gösteren bir ekran görüntüsü](./glossary-tab.png)

- Eğer hâlâ bulamıyorsanız, yeni bir terim ekleme şansınız var! Bir arama motorunda aramanızı ve açıklamasını sözlüğe eklemenizi öneririz. Çevirmenlerimizin terimi daha iyi anlaması için büyük yardımda bulunmuş olursunuz.

![Crowdin'e bir sözlük teriminin nasıl ekleneceğini gösteren ekran görüntüsü](./add-glossary-term.png)

### Terminoloji çeviri politikası {#terminology}

_İsimler için (markalar, şirketler, kişiler) ve yeni teknik terimler (İşaret Zinciri, parça zincirleri vb.)_

Ethereum, yakın zamanda ortaya çıkmış birçok yeni terim sunar. Kendi dillerinde resmi bir çeviri olmadığı için bazı terimler çevirmenden çevirmene değişecektir. Bu tür tutarsızlıklar, yanlış anlaşılmalara ve okunabilirliğin azalmasına sebep olabilir.

Dile göre değişen standardizasyonlar ve farklılıklardan dolayı, tüm desteklenen dillere adapte edilebilecek birleşik bir terminoloji çeviri politikası ortaya çıkarmak neredeyse imkansız hâle geldi.

Dikkatli bir değerlendirmenin sonucunda en sık kullanılan terminolojiyi siz çevirmenlere bırakma kararına vardık.

Size tanıdık olmayan bir kelimeyle karşılaştığınızda yapmanızı önerdiklerimiz:

- [Terimler sözlüğüne](#glossary) başvurun, diğer çevirmenlerin bu terimi daha önce nasıl çevirdiklerini bulabilirsiniz. Eğer terimin önceki çevirisinin alakasız olduğunu düşünüyorsanız, Crowdin sözlüğüne yeni terim ekleyerek çevirinizi onarmakta özgürsünüz.
- Eğer böyle bir çeviri hâlihazırda sözlükte yoksa sizi topluluğumuz tarafından aslında nasıl kullanıldığını gösteren bir arama motoru araması veya medya makalesinde aramaya teşvik ediyoruz.
- Eğer hiç referans bulamadıysanız kendi sezginize güvenmekte ve yeni bir çeviri önermekte özgürsünüz!
- Eğer bunu yapmaktan emin değilseniz, terimi çevirmeden bırakın. Bazen, İngilizce terimler doğru tanımı iletmek için fazlasıyla yeterli.

Çeviriler, SEO zorlukları ve gereksiz kafa karışıklığına sebep olabileceği için marka, şirket, ve personel isimlerini çevirmeden bırakmanızı öneririz.

## İnceleme süreci nasıl işliyor? {#review-process}

Çevirilerimizde belirli bir kalite ve tutarlılık düzeyi sağlamak için, dünyanın en büyük dil hizmeti sağlayıcılarından biri olan [Acolad](https://www.acolad.com/) ile çalışıyoruz. Acolad'in 20.000 profesyonel dil uzmanı vardır, bu da ihtiyaç duyduğumuz her dil ve içerik türü için profesyonel inceleyiciler sağlayabilecekleri anlamına gelir.

İnceleme süreci basittir; belirli bir [içerik grubu](/contributing/translation-program/content-buckets) %100 çevrildiğinde, o içerik grubu için bir inceleme siparişi veririz. İnceleme süreci doğrudan Crowdin'de gerçekleşir. İnceleme tamamlandıktan sonra, web sitesini çevrilmiş içerikle güncelleriz.

## Kendi dilimde nasıl içerik eklerim? {#adding-foreign-language-content}

Şu anda, İngilizce olmayan tüm içerik doğrudan İngilizce kaynak içerikten çevrilmektedir ve İngilizce'de olmayan herhangi bir içerik başka dillere eklenemez.

Ethereum.org için yeni içerik önermek için GitHub'da [konu açabilirsiniz](https://github.com/ethereum/ethereum-org-website/issues). Eklenmesi hâlinde içerik İngilizce yazılacak ve Crowdin kullanılarak diğer dillere çevrilecektir.

Yakın gelecekte İngilizce olmayan içerik eklenmesi için destek eklemeyi planlıyoruz.

## İletişime geçin {#contact}

Bunların hepsini okuduğunuz için teşekkürler. Umarız bu, programımıza katılmamıza yardımcı olmuştur. Soru sormak ve diğer çevirmenlerle işbirliği yapmak için [Discord translation channel](https://discord.gg/ethereum-org)'a katılmaktan çekinmeyin veya translations@ethereum.org adresinden bize ulaşın!
