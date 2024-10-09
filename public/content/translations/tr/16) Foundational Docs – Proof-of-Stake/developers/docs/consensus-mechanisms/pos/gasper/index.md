---
title: Gasper
description: Gasper hisse kanıtı sisteminin bir açıklaması.
lang: tr
---

Gasper, Casper the Friendly Finality Gadget'ın (Casper-FFG) ve LMD-GHOST çatal seçim algoritmasının bir birleşimidir. Bu bileşenler birlikte, hisse kanıtı Ethereum'u güvence altına alan konsensus mekanizmasını oluşturur. Casper, ağa yeni girenlerin kurallı zinciri senkronize ettiklerinden emin olabilmeleri için belirli blokları "sonlandırılmış" hale getiren mekanizmadır. Çatal seçim algoritması, blok zincirinde çatallar oluştuğunda düğümlerin doğru olanı kolayca seçebilmesini sağlamak için birikmiş oyları kullanır.

**Not** Casper-FFG'nin orijinal tanımının Gasper'a dahil edilmek üzere biraz güncellendiğini unutmayın. Bu sayfada, güncellenmiş versiyonu göz önünde bulunduruyoruz.

## Ön koşullar

Bu materyalin anlaşılması adına [hisse kanıtı sistemi](/developers/docs/consensus-mechanisms/pos/) üzerine olan giriş sayfasının okunması gereklidir.

## Gasper'in rolü {#role-of-gasper}

Gasper, düğümlerin, blok önermede veya onaylamada tembel veya dürüst olmamaları durumunda yok edilebilecek bir güvenlik depozitosu olarak ether sağladığı bir hisse kanıtı blok zincirinin tepesinde oturuyor. Gasper, doğrulayıcıların nasıl ödüllendirileceğini ve cezalandırılacağını belirleyen, hangi blokların kabul edilip reddedileceğine ve blok zincirinin hangi çatalının üzerine inşa edileceğine karar veren mekanizmadır.

## Kesinlik nedir? {#what-is-finality}

Nihailik, belirli blokların bir özelliğidir, yani kritik bir konsensus başarısızlığı olmadıkça ve bir saldırgan toplam stake edilen etherin en az 1/3'ünü yok etmedikçe geri döndürülemezler. Sonlandırılmış bloklar, blok zincirinin kesin olduğu bilgiler olarak düşünülebilir. Bir bloğun sonlandırılabilmesi için bir bloğun iki aşamalı bir yükseltme prosedüründen geçmesi gerekir:

1. Stake edilen toplam etherin üçte ikisi, o bloğun kanonik zincire dahil edilmesi lehinde oy vermiş olmalıdır. Bu koşul bloğu ''meşru'' konuma yükseltir. Meşru blokların geri çevrilmesi çok olası olmamakla beraber belirli koşullar altında mümkündür.
2. Başka bir blok hali hazırda meşru olan bir bloğun üzerinde meşrulaştırıldığında, o blok nihailik kazanmıştır. Bir bloğu sonlandırmak, bloğu kurallı zincire dahil etme taahhüdüdür. Bir saldırgan milyonlarca etheri (milyarlarca $USD) yok etmedikçe geri alınamaz.

Bu blok yükseltmeleri her yuvada gerçekleşmez. Bunun yerine, yalnızca dönem-sınır blokları gerekçelendirilebilir ve sonlandırılabilir. Bu bloklar, ''kontrol noktası'' olarak bilinir. Sürüm yükseltilirken, kontrol noktaları çifter şekilde değerlendirir. ''Üstün çoğunluk bağlantısı'' iki başarılı kontrol noktası arasında (yani oy hakkına sahip stakelenmiş ether toplamının üçte ikisi tarafından kontrol noktası B'nin, kontrol noktası A'nın geçerli soyundan geldiğinin kabul edildiği) daha güncel olmayan kontrol noktasının nihayileştirilmesi ve güncel olan bloğun meşrulaştırılması adına bulunmak zorundadır.

Kesinlik, bir bloğun kurallı olduğuna dair üçte ikilik bir anlaşma gerektirdiğinden, bir saldırgan aşağıdakiler olmadan alternatif bir nihai zincir oluşturamaz:

1. Stake edilen toplam etherin üçte ikisine sahip olmak veya onu manipüle etmek.
2. Stake edilmiş ether toplamının üçte ikisinin yok edilmesi.

İlk koşul, bir zinciri sonlandırmak için stake edilen etherin üçte ikisinin gerekli olması nedeniyle ortaya çıkar. İkinci koşul ortaya çıkar, çünkü toplam hissenin üçte ikisi her iki çatal lehine oy vermişse, üçte biri her ikisine de oy vermiş olmalıdır. Çift oylama, azami ölçüde cezalandırılacak ve toplam bahsin üçte biri yok edilecek olan bir kesinti koşuludur. Mayıs 2022 itibariyle, bunun için bir saldırganın yaklaşık 10 milyar $ değerinde ether yakması gerekiyor. Gasper'da blokları doğrulayan ve sonlandıran algoritma, [Casper Dostu Kesinlik Aygıtının (Casper-FFG)](https://arxiv.org/pdf/1710.09437.pdf) biraz değiştirilmiş bir şeklidir.

### Teşvikler ve Cezalar {#incentives-and-slashing}

Doğrulayıcılar, blokları dürüstçe önerdikleri ve doğruladıkları için ödüllendirilir. Ether ödüllendirilir ve paylarına eklenir. Öte yandan, mevcut olmayan ve çağrıldıklarında harekete geçmeyen doğrulayıcılar bu ödülleri kaçırır ve bazen mevcut hisselerinin küçük bir kısmını kaybeder. Bununla birlikte, çevrimdışı olmanın cezaları küçüktür ve çoğu durumda, ödüllerin kaçırılmasının fırsat maliyetleri kadardır. Bununla birlikte, bazı doğrulayıcı eylemlerin yanlışlıkla yapılması çok zordur ve aynı yuva için birden çok blok önermek, aynı yuva için birden çok bloğa onay vermek veya önceki kontrol noktası oylarıyla çelişmek gibi bazı kötü niyetleri ifade eder. Bunlar, daha sert bir şekilde cezalandırılan "kesilebilir" davranışlardır—doğrulayıcının hissesinin bir kısmının yok edilmesi ve doğrulayıcının doğrulayıcı ağından çıkarılmasıyla sonuçlanır. Bu işlem 36 gün sürer. 1. Günde, 1 ETH'ye kadar bir başlangıç cezası vardır. Ardından, kesilen doğrulayıcının etheri çıkış periyodu boyunca yavaşça boşalır, ancak 18. Günde, aynı anda daha fazla doğrulayıcı kesildiğinde daha büyük olan bir "korelasyon cezası" alırlar. Maksimum ceza, tüm hisse miktarıdır. Bu ödüller ve cezalar, dürüst doğrulayıcıları teşvik etmek ve ağ üzerindeki saldırıları caydırmak için tasarlanmıştır.

### Hareketsizlik Sızıntısı {#inactivity-leak}

Gasper, güvenliğin yanı sıra "makul bir canlılık" da sağlar. Bu, toplam stake edilen etherin üçte ikisinin dürüstçe oy kullandığı ve protokolü takip ettiği sürece, zincirin başka herhangi bir aktiviteden (saldırılar, gecikme sorunları veya kesintiler gibi) bağımsız olarak sonuçlanabileceği koşuludur. Başka bir deyişle, zincirin sonlandırılmasını önlemek için toplam stake edilen etherin üçte birinin bir şekilde tehlikeye atılması gerekir. Gasper'da, "hareketsizlik sızıntısı" olarak bilinen bir canlılık hatasına karşı ek bir savunma hattı vardır. Bu mekanizma, zincir dört çağdan daha uzun bir süre boyunca tamamlanamadığında devreye girer. Çoğunluk zincirini aktif olarak onaylamayan doğrulayıcıların hisseleri, çoğunluk toplam hissenin üçte ikisini geri kazanana kadar kademeli olarak boşaltılır ve canlılık hatalarının yalnızca geçici olmasını sağlar.

### Çatal seçimi {#fork-choice}

Casper-FFG'nin orijinal tanımı, şu kuralı uygulayan bir çatal seçim algoritması içeriyordu: `en yüksek yüksekliğe sahip haklı kontrol noktasını içeren zinciri takip edin` burada yükseklik, genesis bloğundan en büyük mesafe olarak tanımlanır. Gasper'da, orijinal çatal seçim kuralı, LMD-GHOST adı verilen daha karmaşık bir algoritma lehine kullanımdan kaldırılmıştır. Normal koşullar altında, bir çatal seçim kuralının gereksiz olduğunu anlamak önemlidir - her yuva için tek bir blok öneren vardır ve dürüst doğrulayıcılar bunu onaylar. Yalnızca büyük ağ eşzamansızlığı durumlarında veya dürüst olmayan bir blok teklifçisi, bir çatal seçim algoritmasının gerekli olduğunu yanlış ifade ettiğinde olur. Ancak, bu durumlar ortaya çıktığında, çatal seçim algoritması doğru zinciri koruyan kritik bir savunmadır.

LMD-GHOST, "en son mesaj odaklı açgözlü en ağır gözlemlenen alt ağaç" anlamına gelir. Bu, kurallı (açgözlü en ağır alt ağaç) olarak birikmiş en büyük tasdik ağırlığına sahip çatalı seçen ve bir doğrulayıcıdan birden fazla mesaj alınırsa, yalnızca en yenisinin dikkate alındığı (en son-mesaj odaklı) bir algoritmayı tanımlamanın jargon ağırlıklı bir yoludur. Kurallı zincirine en ağır bloğu eklemeden önce, her doğrulayıcı bu kuralı kullanarak her bloğu değerlendirir.

## Daha Fazla Okuma {#further-reading}

- [Gasper: Ghost ile Casper'in birleşimi](https://arxiv.org/pdf/2003.03052.pdf)
- [Arkadaş Canlısı Kesinlik Aracı Casper](https://arxiv.org/pdf/1710.09437.pdf)
