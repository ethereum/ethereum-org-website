---
title: ethereum.org çeviri rehberi
metaTitle: Çeviri Programı sıkça sorulan sorular (SSS)
lang: tr
description: ethereum.org Çeviri Programı hakkında sıkça sorulan sorular
---

Çeviri Programında yeniyseniz ve katılmakta tereddüt ediyorsanız, başlamanıza yardımcı olabilecek bazı SSS'leri burada bulabilirsiniz. En yaygın soruların yanıtlarını bulmak için bu rehberi kullanın.

## ethereum.org'u çevirdiğim için ücret alabilir miyim? {#compensation}

ethereum.org açık kaynaklı bir web sitesidir, yani herkes dahil olabilir ve katkıda bulunabilir.

ethereum.org Çeviri Programı bunun bir uzantısıdır ve benzer bir felsefe göz önünde bulundurularak düzenlenmiştir.

Çeviri Programının amacı, konuştukları dilden bağımsız olarak Ethereum içeriğini herkes için erişilebilir kılmaktır. Ayrıca iki dil bilen herkesin Ethereum ekosistemine dahil olmasına ve erişilebilir bir şekilde katkıda bulunmasına olanak tanır.

Bu nedenle Çeviri Programı açık ve gönüllülük esasına dayalıdır ve katılım ücrete tabi değildir. Çevirmenlere çevirdikleri kelime sayısına göre ödeme yapsaydık, Çeviri Programına yalnızca yeterli çeviri deneyimi olanları (profesyonel çevirmenleri) davet edebilirdik. Bu durum Çeviri Programını dışlayıcı hale getirir ve belirlenen hedeflere, özellikle de herkesin katılmasına ve ekosisteme dahil olmasına izin verme hedefine ulaşmamızı engellerdi.

Katkıda bulunanlarımızın Ethereum ekosisteminde başarılı olmalarını sağlamak için her türlü çabayı gösteriyoruz; [POAP'ler sunmak](/contributing/translation-program/acknowledgements/#poap) ve bir [çevirmen sertifikası](/contributing/translation-program/acknowledgements/#certificate) vermenin yanı sıra [Çeviri Liderlik Tabloları](/contributing/translation-program/acknowledgements/) düzenlemek ve [tüm çevirmenlerimizi sitede listelemek](/contributing/translation-program/contributors/) gibi birçok parasal olmayan teşvik mevcuttur.

## `<HTML tags>` içeren dizgileri nasıl çeviririm? {#tags}

Her dizgi saf metin biçiminde yazılmaz. HTML etiketleri (`<0>`, `</0>`) gibi karışık betiklerden oluşan bazı dizgiler vardır. Bu genellikle bir cümlenin ortasındaki köprüler veya alternatif stiller içindir.

- Etiketlerin içindeki metni çevirin ancak etiketlerin kendisini çevirmeyin. `<` ve `>` içindeki hiçbir şey çevrilmemeli veya kaldırılmamalıdır.
- Dizgiyi güvende tutmak için sol alttaki "Copy Source" (Kaynağı Kopyala) düğmesine tıklamanızı öneririz. Bu, orijinal dizgiyi kopyalayacak ve metin kutusuna yapıştıracaktır. Bu, etiketlerin nerede olduğunu netleştirmenizi sağlar ve hatalardan kaçınmanıza yardımcı olur.

![Crowdin interface with copy source button highlighted](./html-tag-strings.png)

Kendi dilinizde daha doğal hale getirmek için etiketlerin dizgi içindeki konumunu değiştirebilirsiniz; sadece etiketin tamamını taşıdığınızdan emin olun.

Etiketler ve kod parçacıklarıyla çalışma hakkında daha derinlemesine bilgi için lütfen [ethereum.org Çeviri Stil Rehberi](/contributing/translation-program/translators-guide/#dealing-with-tags)'ne başvurun.

## Dizgiler nerede bulunur? {#strings}

Genellikle yalnızca kaynak dizgiler, doğru bir çeviri sağlamanız için yeterli olmayabilir.

- Daha fazla bilgi için "screenshots" (ekran görüntüleri) ve "context" (bağlam) bölümlerine göz atın. Kaynak dizgi bölümünde, dizgiyi bağlam içinde nasıl kullandığımızı gösterecek olan ekli ekran görüntüsünü göreceksiniz.
- Hâlâ emin değilseniz, "comment section" (yorum bölümü) kısmında bir işaret bırakın. [Nasıl yorum bırakacağınızdan emin değil misiniz?](#comment)

![Showing how context can be provided for a string with a screenshot](./source-string.png)

![An example screenshot added for context](./source-string-2.png)

## Nasıl yorum bırakabilir veya soru sorabilirim? Bir sorunu veya yazım hatalarını bildirmek istiyorum... {#comment}

Dikkat edilmesi gereken belirli bir dizgi hakkında işaret bırakmak isterseniz, yorum göndermekten çekinmeyin.

- Sağ üst çubuğun ikinci düğmesine tıklayın. Gizli sekme sağınızda görünecektir. Yeni bir yorum bırakın ve alttaki "Issue" (Sorun) onay kutusuna tıklayın. Açılır menüden seçeneklerden birini seçerek sorunun türünü belirtebilirsiniz.
- Gönderildikten sonra ekibimize bildirilecektir. Sorunu düzelteceğiz ve yorumunuza yanıt verip sorunu kapatarak sizi bilgilendireceğiz.
- Yanlış bir çeviri bildirirseniz, çeviri ve önerdiğiniz alternatif bir sonraki inceleme sırasında anadili olan biri tarafından incelenecektir.

![Showing how to make comments and issues](./comment-issue.png)

## Çeviri Belleği (TM) nedir? {#translation-memory}

Çeviri Belleği (TM), ethereum.org genelinde daha önce çevrilmiş tüm dizgileri depolayan bir Crowdin özelliğidir. Bir dizgi çevrildiğinde, otomatik olarak proje TM'mize kaydedilir. Bu, zamandan tasarruf etmenize yardımcı olacak yararlı bir araç olabilir!

- "TM and MT Suggestions" (TM ve MT Önerileri) bölümüne bakın; diğer çevirmenlerin aynı veya benzer dizgiyi nasıl çevirdiğini göreceksiniz. Eşleşme oranı yüksek bir öneri bulursanız, üzerine tıklayarak çeviriye başvurmaktan çekinmeyin.
- Listede hiçbir şey yoksa, daha önce yapılmış çeviriler için TM'de arama yapabilir ve tutarlılık için bunları yeniden kullanabilirsiniz.

![A screenshot of the translation memory](./translation-memory.png)

## Crowdin sözlüğünü nasıl kullanırım? {#glossary}

Ethereum terminolojisi, genellikle yeni teknoloji terimleri henüz birçok dilde yerelleştirilmemiş olacağından, çeviri çalışmamızın bir diğer önemli parçasıdır. Ayrıca, farklı bağlamlarda farklı anlamlara gelen terimler de vardır. [Ethereum terminolojisini çevirme hakkında daha fazlası](#terminology)

Crowdin sözlüğü, terimlerin ve tanımların netleştirilmesi için en iyi yerdir. Sözlüğe başvurmanın iki yolu vardır.

- İlk olarak, kaynak dizgide altı çizili bir terim bulduğunuzda, farenizi üzerine getirerek kısa bir tanımını görebilirsiniz.

![An example glossary definition](./glossary-definition.png)

- İkinci olarak, size tanıdık gelmeyen ancak altı çizili olmayan bir terim görürseniz, sözlük sekmesinde (sağ sütunun üçüncü düğmesi) arama yapabilirsiniz. Projede sık kullanılan ve belirli terimlerin açıklamalarını bulacaksınız.

![A screenshot showing where to find the glossary tab in Crowdin](./glossary-tab.png)

- Hâlâ bulamıyorsanız, bu yeni bir terim ekleme şansınızdır! Bir arama motorunda aramanızı ve açıklamayı sözlüğe eklemenizi teşvik ediyoruz. Diğer çevirmenlerin terimi daha iyi anlamalarına büyük yardımı olacaktır.

![A screenshot showing how to add a glossary term to Crowdin](./add-glossary-term.png)

### Terminoloji çeviri politikası {#terminology}

_İsimler (markalar, şirketler, kişiler) ve yeni teknoloji terimleri (İşaret zinciri, parça zincirleri vb.) için_

Ethereum, yakın zamanda türetilmiş birçok yeni terim sunar. Kendi dillerinde resmi bir çevirisi olmadığı için bazı terimler çevirmenden çevirmene farklılık gösterecektir. Bu tür tutarsızlıklar yanlış anlamalara neden olabilir ve okunabilirliği azaltabilir.

Dilsel çeşitlilik ve her dildeki farklı standartlaştırmalar nedeniyle, desteklenen tüm dillerde uyarlanabilecek birleşik bir terminoloji çeviri politikası oluşturmak neredeyse imkansız olmuştur.

Dikkatli bir değerlendirmeden sonra, en sık kullanılan terminolojiyi siz çevirmenlere bırakma kararına vardık.

Size tanıdık gelmeyen bir terim bulduğunuzda önerimiz şudur:

- [Terimler sözlüğüne](#glossary) başvurun, diğer çevirmenlerin daha önce nasıl çevirdiğini bulabilirsiniz. Daha önce çevrilen terimin uygun olmadığını düşünüyorsanız, Crowdin Sözlüğüne yeni bir terim ekleyerek çevirinizi geri yüklemekten çekinmeyin.
- Sözlükte böyle bir önceki çeviri yoksa, terimin topluluğunuzda gerçekte nasıl kullanıldığını gösteren bir arama motorunda veya medya makalesinde aramanızı teşvik ediyoruz.
- Hiçbir referans bulamazsanız, sezgilerinize güvenmekten ve dilinize yeni bir çeviri önermekten çekinmeyin!
- Bunu yapma konusunda kendinize daha az güveniyorsanız, terimi çevirmeden bırakın. Bazen İngilizce terimler, doğru tanımları sunmada fazlasıyla yeterlidir.

Çeviri gereksiz kafa karışıklığına ve SEO zorluklarına neden olabileceğinden marka, şirket ve personel isimlerini çevirmeden bırakmanızı öneririz.

## İnceleme süreci nasıl işler? {#review-process}

Çevirilerimizde belirli bir kalite ve tutarlılık düzeyi sağlamak için, küresel çapta en büyük dil hizmeti sağlayıcılarından biri olan [Acolad](https://www.acolad.com/) ile çalışıyoruz. Acolad'ın 20.000 profesyonel dilbilimcisi vardır, bu da ihtiyacımız olan her dil ve içerik türü için profesyonel incelemeciler sağlayabilecekleri anlamına gelir.

İnceleme süreci basittir; bir içerik seti %100 çevrildiğinde, o içerik grubu için bir inceleme siparişi veririz. İnceleme süreci doğrudan Crowdin'de gerçekleşir. İnceleme tamamlandıktan sonra web sitesini çevrilmiş içerikle güncelleriz.

## Kendi dilimde nasıl içerik eklerim? {#adding-foreign-language-content}

Şu anda, İngilizce olmayan tüm içerikler doğrudan İngilizce kaynak içerikten çevrilmektedir ve İngilizce'de bulunmayan hiçbir içerik diğer dillere eklenemez.

ethereum.org için yeni içerik önermek isterseniz, GitHub'da [bir sorun oluşturabilirsiniz](https://github.com/ethereum/ethereum-org-website/issues). Eklenirse, içerik İngilizce olarak yazılacak ve Crowdin kullanılarak diğer dillere çevrilecektir.

Yakın gelecekte İngilizce dışındaki içerik eklemeleri için destek eklemeyi planlıyoruz.

## İletişime geçin {#contact}

Tüm bunları okuduğunuz için teşekkür ederiz. Umarız bu, programımıza katılmanıza yardımcı olur. Sorular sormak ve diğer çevirmenlerle işbirliği yapmak için [Discord çeviri kanalımıza](https://discord.gg/ethereum-org) katılmaktan veya translations@ethereum.org adresinden bize ulaşmaktan çekinmeyin!