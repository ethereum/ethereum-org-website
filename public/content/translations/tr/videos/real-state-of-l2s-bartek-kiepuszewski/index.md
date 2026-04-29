---
title: "Açılış Konuşması: L2'lerin GERÇEK durumu"
description: "Katman 2 çözümlerinin mevcut durumu üzerine bir konuşma; Rollup güvenlik vaatleri ile gerçeklik arasındaki uçurumu inceliyor ve gerçek merkeziyetsizliğe giden bir yol öneriyor."
lang: tr
youtubeId: "ik2JxmHDmyw"
uploadDate: 2024-11-13
duration: "0:26:15"
educationLevel: advanced
topic:
  - "scaling-and-layer-2"
  - "rollups"
  - "layer-2"
format: presentation
author: Ethereum Foundation
breadcrumb: "L2'lerin Durumu"
---

L2BEAT'in kurucusu **Bartek Kiepuszewski** tarafından Devcon SEA'de yapılan, katman 2 (l2) çözümlerinin mevcut durumunu, Rollup güvenlik vaatleri ile gerçeklik arasındaki uçurumu, yeni değerlendirme kategorilerini ve L2BEAT'in önümüzdeki yıl kanıt sistemlerini doğrulamak için önemli kaynaklar ayırma taahhüdünü inceleyen bir açılış konuşması.

*Bu transkript, Ethereum Vakfı tarafından yayımlanan [orijinal video transkriptinin](https://www.youtube.com/watch?v=ik2JxmHDmyw) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için üzerinde ufak düzenlemeler yapılmıştır.*

#### Giriş (0:00) {#introduction-000}

L2BEAT'in bir kurucusu olarak, piyasadaki hemen hemen her l2 ekibiyle çalışma gibi eşsiz bir fırsata sahibim ve onlarla bu alanın en başından beri, yani yaklaşık dört yıl öncesinden beri çalışıyoruz. Bu inanılmaz. Zaman çok hızlı akıp geçiyor. ZK (sıfır bilgi) teknolojisindeki ilk öncülerle çalıştık, adını Optimism olarak değiştiren Plasma Group ile çalıştık, Arbitrum ile çalıştık. Ve bu sahneden tüm bu ekiplere teşekkür etmek istiyorum, çünkü sizin desteğiniz olmasaydı kesinlikle burada olamazdık. L2BEAT olarak, topluluğun bize verdiği tüm destek için son derece minnettarız.

Öyleyse başardıklarımıza bir göz atalım. Her şeyden önce, neredeyse 50 Rollup ve 50'den fazla diğer l2'yi başlatmayı başardık. Bu inanılmaz bir başarı; bu çok fazla sistem demek ve önümüzdeki aylarda başlatılacak neredeyse bir o kadar daha sistemimiz var. Bu sistemlere çok fazla değer, çok fazla kilitlenmiş toplam değer (tvl) de koyduk ve grafiklere bakarsanız hepsinin sadece yukarı doğru gittiğini görürsünüz.

Mesele şu ki, tüm bu büyümeyle birlikte büyük bir sorumluluk da geliyor. Bu sistemleri kullanan son kullanıcıların, toplamalar Ethereum'un güvenliğini devraldığına inandıkları için bu toplamalar içine para koyduklarını anlamamız gerekiyor. Bence bu farkındalıkla birlikte güvenlik konusunda ciddileşmeye başlamalıyız.

#### Ethereum'u Ölçeklendirme (2:10) {#scaling-ethereum-210}

Ayrıca Ethereum'u ölçeklendirmeyi de başardık. Ethereum oldukça iyi gidiyordu, ancak talep karşısında gerçekten yavaşlamaya başladı ve ücretler çok yükseliyordu. Yani kesinlikle ölçekleniyoruz; bu sayılar da artıyor. Bu inanılmaz.

Ancak bir "ama" var. Biliyorsunuz arkadaşlar, her zaman bir "ama" vardır, değil mi? Ve ben sadece hepinize karşı dürüst olmak için buradayım. Bu alanın gerçekten ciddileşmesini istiyorum ve bu, başarısız olmamamızı, topluluğun beklentilerini boşa çıkarmamamızı sağlamak için desteğinizi isteme fırsatım. İnşa ettiğimiz şeyin güvenliği konusunda gerçekten ciddi olmaya başlamalıyız.

Çünkü biliyorsunuz, çok uzun zamandır destek tekerlekleri kullanıyoruz. Eğer destek tekerlekleri kullanan bir yetişkinseniz —ve tekrar ediyorum, dört yıl oldu— o zaman gerçekten olgunlaşmamışsınız demektir. Çocuksanız destek tekerlekleri kullanmanız sorun değildir. Yetişkinseniz destek tekerlekleri kullanmanız doğru değildir. Ve bence hepimizin bu konuda çekingen davranmayı bırakmasının zamanı geldi. Hepimiz sesimizi duyurmalıyız ve kral çıplak sendromundan muzdarip olmamalıyız.

#### Büyük "ama": eksik kanıt sistemleri (4:30) {#the-big-but-missing-proof-systems-430}

Peki bu büyük "ama" nedir? Öncelikle, günümüzdeki çoğu l2'nin bir kanıt sistemi yok, ki bu biraz şaşırtıcı çünkü StarkNet, zkSync, Aztec gibi ilk öncüler dört yıl önce ilk uygulamaya özel toplamalar başlattıklarında kanıt sistemlerine sahiplerdi. Yani evet, bugün tek bir düğmeye tıklayarak bir l2 başlatabilirsiniz. Ancak, bu gerçekten bir l2 mi? Bu gerçekten bir Rollup mı? Yaptığınız şey, çoklu imza ile güvence altına alınan bir şey başlatmak. Bunun yeterince iyi olduğunu düşünmüyorum.

Ekosistemin bugünkü durumu bu diyagramdaki gibi. Solda kanıt sistemi olan mevcut l2'leri görebilirsiniz. Sağda ise kanıt sistemi olmayan mevcut l2'leri görebilirsiniz. Ve bahse girerim ki yaklaşmakta olan l2'lerin büyük çoğunluğunun bir kanıt sistemi olmayacak. Bu, OP Mainnet ve Base hariç hemen hemen her bir OP Stack Zincirini içerecektir —ve bu arada onları tebrik ediyorum, şampiyon gibiler. Ancak, diğer tüm OP Stack Zincirlerinin basitçe bir kanıt sistemi yoktur.

Sağdaki bu grafik, bir kanıt sistemine sahip olan ancak aslında genellikle çok kısa izinli bir beyaz listenin arkasında bulunan tüm Orbit yığınlarını da içerecektir. Bazen bu beyaz liste sadece tek bir aktördür; durum teklif edici ile aynıdır. Temelde durum teklif edicidir ve kendilerine meydan okuyabilecek tek kişi onlardır. Yani, ne? Cidden mi.

#### Güvenlik konseyleri (6:00) {#security-councils-600}

Şu anda çoğu l2 güvenlik konseylerini kullanmıyor. Güvenlik konseyi derken neyi kastediyoruz? Bir güvenlik konseyi temel olarak en az sekiz katılımcıdan oluşan ve %75'lik bir mutabakat eşiği gerektiren bir çoklu imza yapısıdır. Yani bunu büyük bir çoklu imza olarak düşünebilirsiniz, ancak bu sadece boyutla ilgili değildir; katılımcıların coğrafi olarak merkeziyetsiz olmasını istememizle ilgilidir. Dün coğrafi çeşitlendirme ihtiyacı hakkında harika bir sunum duymuş olabilirsiniz. Bu yapılardan istediğimiz şey budur. Ve temel olarak, en önemlisi katılımcıların farklı şirketlerden ve farklı yargı bölgelerinden gelmesini istiyoruz. Bu son derece önemli ve size bunun nedenlerine dair bazı örnekler göstereceğim.

Güvenlik konseylerini bu güçlendirilmiş çoklu imza yapıları olarak düşünün. Arkalarında çok önemli bir sosyal katman var. Yani işlerin mevcut durumu bu ve yine söylüyorum, çok kötü. Sadece Arbitrum, Optimism, Polygon, zkSync'te güvenlik konseylerimiz var —ve StarkNet, Scroll ve ilginç bir şekilde Fuel'in bir güvenlik konseyi ile başlatıldığını biliyorum. Diğer herkes temel olarak çok küçük, dahili, genellikle özel bir çoklu imza kullanıyor ve açıkçası bu çoklu imza yapıları ile basit EOA'lar (Harici Sahipli Hesaplar) arasındaki farkı söylemek son derece zor.

#### Veri kullanılabilirliği güven varsayımları (7:25) {#data-availability-trust-assumptions-725}

Yanlış yaptığımız üçüncü büyük madde, Rollup olmayan çoğu l2'nin berbat veri kullanılabilirliği güven varsayımları ile kurulmuş olmasıdır. Ve "berbat" kelimesini kullanıyorum — A, çünkü hoşuma gidiyor ve B, çünkü gerçekten, gerçekten çok kötü.

Soldaki şu örneklere bakın: Arbitrum, StarkEx, Immutable X. Ancak, diğer hemen hemen herkes kelimenin tam anlamıyla veri kullanılabilirliğini bodrumlarındaki sunucularına veya her neyse oraya gönderiyor. Hiçbir fikrimiz yok. Kelimenin tam anlamıyla hiçbir fikrimiz yok. Mesele şu ki, gerçekten kötüler ve umurlarında değilmiş gibi görünüyor. Belki de kullanıcıların umurunda değildir, bilmiyoruz. Ancak bu verilere gerçekten bakmamız ve herkese, hey, bu bir veri kullanılabilirliği komitesi değil dememiz gerekiyor.

Bir veri kullanılabilirliği komitesi ilk olarak StarkEx uygulamaları için StarkWare ve Arbitrum tarafından oluşturuldu ve savunuldu. Ancak asıl mesele bu değildi; "Bodrumumda bir sunucum var, buna veri kullanılabilirliği komitesi diyebilirim" diyebilmeniz değildi. Bu uygulamanın amacı bu değildi.

Sonuç olarak, bunu söylediğim için üzgünüm ama şu anda çoğu l2'de izinli operatörler fonlarınızı çalabilir veya dondurabilir. Hepinizi bu konuda bilinçlendirmek için buradayız. Söylediğim için üzgünüm ama bu tutumu değiştirmemiz gerekiyor.

#### Kanıt sistemleri neden önemlidir (8:40) {#why-proof-systems-matter-840}

Kanıt sistemlerini neden önemsemeliyiz? Bize göre hepimizin çalışan bir kanıt sistemine sahip olması için en az üç iyi neden var.

Birincisi, tüm operatörlerin çökmesi durumunda izinsiz çıkış yapılmasına olanak tanır; ve herhangi bir nedenle çökebilirler. Oldukça yakın zamanda dYdX'in çökmesi gibi bir durum yaşadık. Kullanıcıları uyardılar, birçok kullanıcı çıkış yapmadı. Ancak, bir kanıt sisteminiz varsa, sistemi izinsiz bir şekilde birinin devralacağı şekilde yapabilirsiniz veya kullanıcıların fonlarını çıkarabilmeleri için bir kaçış mekanizması oluşturabilirsiniz. Bu son derece önemlidir. Bir kanıt sistemi olmadan bunu basitçe yapamazsınız; bu imkansızdır.

İkinci neden, güvenlik konseyinin güven varsayımları üzerinde gerçekten iyileştirme yapabilmenizdir —tabii ki bir tane olduğunu varsayarsak. Ve bunun nedeni oldukça nüanslıdır. Şimdi yapabileceğiniz şey şudur: kötü niyetli bir teklif edici durumu yerine —ve bu, bugün birçok OP Stack'te görebileceğiniz, kanıt sistemi olmayan standart İyimser rollup yapısını gösteren diyagramdır— durum kökünü geçersiz kılabilecek çok güçlü bir çoklu imza ve durum köklerini teklif eden bir teklif edici vardır. Eğer bu teklif kötü niyetliyse, tek yapmaları gereken güvenlik konseyi üyelerinin azınlığına görmezden gelmeleri için rüşvet vermektir; kötü niyetli bir şey yapmaları için değil, sadece hiçbir şey yapmamaları için, bu durumda kötü niyetli teklif gerçekten geçecek ve fonları çalacaklardır.

Bir kanıt sistemi sunduğunuzda, kötü niyetli teklif edici için durum çok daha zordur, çünkü artık güvenlik konseyinin **çoğunluğuna** rüşvet vermeleri gerekir. Sadece çoğunluğa rüşvet vermekle kalmazlar, aynı zamanda onlara gerçekten kötü niyetli bir şey yaptırmak zorundadırlar; sadece görmezden gelmelerini sağlamak değil. Bu çok farklı bir önermedir. Birinin görmezden gelmesini sağlamak, "Hey, sana 10 milyon dolar verirsem, sadece anahtarlarını kaybedersin veya uzun bir uluslararası uçuşa çıkarsın" demektir. Birine kötü niyetli bir şey yaptırmak isterseniz, bu tamamen farklı bir önermedir. Bunun, özellikle halka açık bir güvenlik konseyi ile güven varsayımları temelden değiştirdiğini düşünüyoruz.

Son olarak, kanıt sistemleri —eğer Aşama 2 iseniz— herhangi bir aracıyı tamamen ortadan kaldırmanıza olanak tanır. Bir güvenlik konseyine ihtiyacınız yoktur veya varsa bile sadece acil durumlar içindir. Dolayısıyla bunun aslında derin düzenleyici etkileri olabilir. l2'nizi en başından itibaren bir Aşama 2 sistemi olarak başlatmak isteyebilirsiniz. Bu mümkündür, ancak elbette bir kanıt sistemine sahip olmanız gerekir; ideal olarak birden fazlasına sahip olmak isteyebilirsiniz. Nethermind ekibinin lansmanda Aşama 2 olması amaçlanan bir Rollup inşa ettiğine dair son duyurusu gibi, bunu yapan sistemlerin bazı duyuruları zaten var.

#### Neden çoklu imza değil de güvenlik konseyleri (11:29) {#why-security-councils-not-multisigs-1129}

Bu kanıt sistemleri hakkındaydı. Peki, neden sadece basit çoklu imza değil de güvenlik konseyleri? Nedeni şu: çoklu imzaların çoklu imza olduğuna inanmayın. Nedeni budur; ta ki sizi bunların temelden çeşitlendirildiğine gerçekten ikna edebilecek bir sosyal katman olana kadar.

Tarihimizde birkaç büyük olay yaşadık. Çok merkeziyetsiz olduklarını iddia eden Multichain vardı ve hayır, öyle olmadıkları ortaya çıktı; ve bu gerçekten bağımsız olarak doğrulayamayacağınız bir iddiadır. Büyük bir saldırı mı, içeriden bir iş mi yoksa dolandırıcılık (rug pull) mı, emin değiliz.

Sonra Oasis ile bir durum yaşadık; bir Birleşik Krallık mahkemesi onlara başvurdu ve Protokol içinden bazı fonları çıkarmak için çoklu imza kullanmak zorunda kaldılar. Jeopolitik olarak çeşitlendirilmiş bir güvenlik konseyiniz olsaydı bunu yapmak imkansız olurdu, çünkü herkese gerçekten ulaşabilecek hiçbir mahkeme kararı yoktur.

Son olarak, oldukça yakın zamanda bir çoklu imza üzerine saldırı yaşadık. Bir saniyeliğine bile çoklu imzalara saldırılamayacağını düşünmeyin. Eninde sonunda hepsinden kurtulmak zorundayız.

Özetlemek gerekirse: güvenlik konseyi olmayan bir Aşama 0 Rollup'ınız varsa, temel olarak kötü niyetli bir operatör fonlarınızla ne isterse yapabilir. Güvenlik konseyi olan bir Aşama 0 Rollup iseniz, o zaman bir saldırganın güvenlik konseyi azınlığına rüşvet vermesi gerekir; belki yapması zor bir şeydir, ancak Rollup'ınızın bir kanıt sistemi varsa yapmanız gerekecek olan güvenlik konseyi çoğunluğuna rüşvet vermekten çok daha kolaydır. Ve son olarak, Aşama 2 iseniz kimse fonlarınızı çalamaz. Aşama 2'ye geçmenin vaadi budur.

#### Önerilen yeniden sınıflandırma (13:10) {#proposed-reclassification-1310}

Soru şu: projelerin gerçekten önemsemesi için doğru teşviklere sahip miyiz? Sorun şu ki, yapabileceğimiz tek şey —L2BEAT olarak biz ve Ethereum topluluğu olarak biz— sosyal baskı uygulamaktır. Vitalik, önümüzdeki yıldan itibaren yalnızca Aşama 1 olan l2'lerden açıkça bahsetmeyi planladığını söyledi. Hatta daha önce, Aşama 1 değillerse sistemleri toplamalar olarak adlandırmayacağını bile söylemişti.

Bu yüzden ne yapabileceğimizi merak ediyorduk. Şu anda toplamalar için aşamalarımız var. Validium ve optimium'lar için aşamalarımız yok. Uzun zamandır merak ediyorduk; belki kanıt sistemleri olan ancak henüz Aşama 1 olmayan sistemler için "Aşama 0+" sunabilirdik. Ancak aylarca süren tartışmalardan sonra karar verdik: hayır, büyüme zamanı geldi.

Topluluğa önerdiğimiz şey —ve bu topluluk geri bildirimi için foruma gidecek— şudur. İlk olarak, sistemler için ayrı bir kategori oluşturmak istiyoruz. Temel fark, Aşama 0 olmak için bir kanıt sistemine sahip olmanız gerekeceğidir. Örneğin, StarkNet bugün bu sınıflandırma altında Aşama 0 olacaktır. Kanıt sistemi olmayan tüm OP Stack Zincirleri —Base ve Optimism hariç— bu kategoriye girmeyecektir. Ve elbette, sistemlerin uyum sağlaması için zaman tanıyacağız. Bu ana kategoridir ve sistemlerin süper ligi gibi olmalıdır.

Sonra Ethereum veri kullanılabilirliği kullanmayan başka bir sistem kategoriniz var. Harici veri kullanılabilirliği ile birlikte gelen ek güven varsayımları kullanırlar. Onlara "alt-DA" diyoruz ancak Validium, optimium'lar ve oluşturabileceğiniz her türlü hibrit yapıyı içereceklerdir. Ancak, size makul veri kullanılabilirliği garantileri vermek zorundadırlar; bu sizin bodrum katınız olamaz. Bu makul büyüklükte bir veri kullanılabilirliği komitesi olmalıdır veya Celestia veya Avail kullanıyorsanız, köprü kullanmanız gerekir.

#### "Diğerleri" kategorisi ve L2BEAT'in taahhüdü (16:05) {#the-others-category-and-l2beats-pledge-1605}

Peki ya diğerleri? Onları üçüncü bir kategoriye koyacağız, ki buna —ve şimdi bu sistemleri nasıl adlandıracağımız konusunda topluluktan geri bildirim bekliyorum— çalışma adımız "diğerleri". Mesele şu ki, çoklu imza ile güvence altına alınıyorlar ve biz bu çoklu imzaları oldukları gibi ifşa edeceğiz. Kullanıcı arayüzümüzde yapmak istediğimiz şey bu.

Kullanıcı arayüzü kabaca şöyle görünecek: bu dökümü göreceksiniz; toplamalar, Validium ve optimium'lar ve diğerleri. Ve varsayılan sıralama kilitlenmiş toplam değer (tvl) ile değil, güvenliğe göre olacaktır. Kötü güvenlikle kilitlenmiş toplam değer (tvl) peşinde koşmayalım; bu gerçekten kötü sonuçlanacak.

Aşama 1 ve Aşama 2 projelerini destekleyeceğiz. Aşama 0 projelerine yarışmacı olarak bakacağız. "Diğerleri" için, onları listelemekten mutluluk duyarız; son derece özgürlükçü olacağız. Temel olarak Ethereum ile uyumlu olmanız ve açıkçası fonları taşımanıza izin veren bir köprü yapısına sahip olmanız yeterlidir. Ancak, güven varsayımları ve çoklu imzalara bakacağız ve yavaş ama emin adımlarla sistemlerin "diğerleri"nden Validium/optimium'a veya toplamalar kategorisine geçeceğini umuyoruz.

"Diğerleri" kategorisinin böyle görüneceğini düşünüyoruz; bu şu anki gerçek veriler, bir kanıt sistemi sunmazlarsa bu kategoriye girebilecek gerçek sistemler. Teklif edici kim, meydan okuyan kim ve yükseltici kim tam olarak göreceksiniz. İşin komik tarafı, bunu bugün L2BEAT'te görebilirsiniz; sadece bu bilgi detaylar sayfasında o kadar derinlere gizlenmiş ki, bahse girerim sadece araştırmacılar ve meraklılar kontrol ediyordur. Hepsi bugün mevcut. Ancak, verileri son kullanıcılara sunmak istiyoruz. Son kullanıcıların neler olup bittiğinin gerçekten farkında olmasını istiyoruz, böylece hepimiz inşa ettiğimiz sistemlerden sorumlu oluruz.

Sadece "Bir kanıt sistemim var" demek yeterli mi? Hayır. L2BEAT olarak topluluğa taahhüdümüz, önümüzdeki yıl bu kanıt sistemlerinin sağlam ve eksiksiz olduğundan emin olmak için gerçekten çok sıkı ve çok derinlemesine incelemeye önemli kaynaklar ayıracağımızdır. Hem ZK hem de iyimser olanları analiz edeceğiz. Kaynak koduna gireceğiz, güvenilir kurulum aşamanızı nasıl oluşturduğunuza bakacağız, devrelerinize bakacağız ve zincir içi olarak tam olarak neyin doğrulandığını göreceğiz. Güven varsayımları açıkça iletilebilmesi için her şeyi son derece şeffaf hale getirmek istiyoruz; ve daha da önemlisi, kanıt sisteminiz mantıksız derecede küçük bir beyaz listenin arkasına gizlenemez.

Araştırmacılar işe alıyoruz. Tüm bu işleri yapacağız. Bu bizim gelecek yıl için taahhüdümüz. Umarım gelecek yıl l2'lerin ve toplamalar yılı olur; ancak bu, tek bir düğmeye tıklayarak bir Rollup başlatmakla ilgili değildir. Mesele şu ki, iyi güvenliğe sahip bir sistem başlatabilmek istiyorsunuz. İdeal olarak Ethereum'dan mümkün olduğunca fazla güvenlik devralmak istersiniz. Buna ulaşmak için hepimizin yapması gereken çok iş var. Ancak yapmazsak, o zaman tek yaptığımız temel olarak binlerce güvensiz yan zincir oluşturmaktır. Topluluk olarak bunu istemediğimizi düşünüyorum.

#### Soru-Cevap (18:45) {#qa-1845}

**Sunucu:** Soru-Cevap bölümüne geçelim. Toplamalar için merkeziyetsiz bir sıralayıcı olması önemli mi, yoksa diğer güvenlik mekanizmaları yeterli mi?

**Bartek Kiepuszewski:** Bu çok iyi ve önemli bir soru. Göreceğimiz farklı tasarımlar olduğunu düşünüyorum. Sıralayıcı yapısını merkeziyetsizleştirmenin kullanıcı fonlarının güvenliği için son derece önemli olduğunu düşünmüyorum, ancak belirli durumlarda gerçek zamanlı sansür direnci için önemli olabilir. Vitalik açılış konuşmasında, gelecekte toplamalar yapılarının tabanlı (based) hale geldiğini —gerçek zamanlı sansür direnciyle mücadele etmek için Ethereum altyapısından yararlandığını— görebileceğimizi, MegaETH gibi diğerlerinin ise aslında çok merkezi bir sıralayıcı yapısına sahip olabileceğini ve yalnızca kaçış mekanizması yapısına güvenebileceğini söyledi. Hibrit yapılar görebiliriz. Tasarım alanının çok büyük olduğunu düşünüyorum ve şu anda L2BEAT'te ne olacağını ve bunun nasıl sonuçlanacağını gerçekten görmek istiyoruz.

**Sunucu:** TEE tabanlı kanıt sistemleri, donanım üreticisine güvenmeyi ima etseler bile Aşama 2 olarak kabul edilecek mi?

**Bartek Kiepuszewski:** Kısa cevap hayır, çünkü bugün gördüğümüz yapılarla, eğer SGX kullanıyorsanız, Intel bir kanıt sunabilir ve potansiyel olarak kimse gerçekten fark etmeden —ve Ethereum fark etmeden— istedikleri her şeyi engelleyebilir, çalabilir veya dondurabilirler. Ancak, güven gerektirmeyen, izinsiz TEE'ler oluşturmak için ortaya konan tüm çalışmalarla birlikte —bana bunun aslında son derece heyecan verici bir çalışma olduğu söyleniyor. Ancak kısa cevap: bugün için hayır.

**Sunucu:** Optimism neden Aşama 1 olarak sınıflandırılıyor? Değerlendirmeye göre öyle değiller; Vakıf teklif sürecini tamamen kontrol ediyor.

**Bartek Kiepuszewski:** Temel olarak tüm kriterleri karşılıyorlar. Bu gerçekten teklif süreciyle ilgili değil; fonları kimin kontrol ettiğiyle ilgili. Merkezi bir teklif edici yapısına sahip olabilirsiniz, ancak bir geri dönüş planı vardır. Eğer çökerlerse, o zaman tüm sistem daha izinsiz hale gelir. Güvenlik konseyinin rolünün ne olduğunu anlamanın önemli olduğunu düşünüyorum. Aşama 1 sistemlerinin, merkezi teklif edici durursa çıkış yapmanıza izin vermesini istiyoruz. Örneğin, dYdX ile teklif son derece merkeziydi, ancak durduklarında insanlar çıkış yapabildi. Yani mesele merkezi veya merkeziyetsiz olmanızla ilgili değil; mesele gerçekten izinsiz bir şekilde çıkış yapıp yapamayacağınızla ilgilidir.

Tüm kriterleri karşıladılar. Bu arada kriterleri geliştiriyorduk; kriterler taşa kazınmış bir şey değildir çünkü tüm bu sistemler gelişiyor, bu yüzden bizim de bu sistemlerle birlikte gelişmemiz gerekiyor. Kriterler biraz değişiyor olabilir ve hem Optimism hem de Arbitrum'a çok yakından bakıyoruz çünkü açıkça ikisi lider konumda. Girmeye vaktim olmayan birçok nüans var. Ancak sonsuza kadar bir aşama atamasına sahipmişsiniz gibi bir durum yok; eğer yeni bir bilgi varsa veya atlamış ya da kaçırmış olabileceğimiz bir şey varsa, bu atamayı kaybetmeniz oldukça olasıdır.

**Sunucu:** Projelerin Aşama 1'e doğru inşa etmemesinin temel nedenleri nelerdir?

**Bartek Kiepuszewski:** Karmaşıklık, zaman, maliyet, yetenek. Şaşırtıcı derecede maliyetli. Dediğim gibi, dört yıl önceki öncüler temel olarak inşa ediyorlardı; dYdX kelimenin tam anlamıyla ilk olmasa da ilk ZK (sıfır bilgi) Rollup yapılarından biriydi. Uygulamaya özeldi, ama yine de ilkti. Ve küçük nüanslar olmasaydı, Aşama 2 olurdu; gerçekten, Aşama 2 için gerektirdiğimiz yönetişim süreci başarısız oluyor. Ancak her halükarda, bu bir Aşama 2 sistemidir. Dört yıl önce inşa edildi, yani imkansız diye bir şey yok.

Bence bugün tüm toplamalar için bunu yapmayı son derece zorlaştıran şey, açıkçası, toplamalar yapılarının çoğunluğunun ekipler tarafından inşa edilmemesidir; hizmet olarak Rollup sağlayıcıları tarafından başlatılıyorlar ve onları gerçekten daha iyisini yapmaya teşvik etmemiz gerekiyor. Ve bu zor. Kimse bunun kolay olacağını söylemedi.