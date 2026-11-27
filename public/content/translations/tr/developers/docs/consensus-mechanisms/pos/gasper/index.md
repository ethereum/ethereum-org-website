---
title: Gasper
description: "Gasper Hisse Kanıtı (PoS) mekanizmasının bir açıklaması."
lang: tr
---

Gasper, Casper the Friendly Finality Gadget (Casper FFG) ve LMD-GHOST çatallanma seçimi algoritmasının birleşimidir. Bu bileşenler birlikte, Hisse Kanıtı (PoS) Ethereum'u güvence altına alan mutabakat mekanizmasını oluşturur. Casper, ağa yeni katılanların kurallı zinciri eşzamanladıklarından emin olabilmeleri için belirli blokları "kesinleşmiş" durumuna yükselten mekanizmadır. Çatallanma seçimi algoritması, blokzincirde çatallanmalar meydana geldiğinde düğümlerin doğru olanı kolayca seçebilmesini sağlamak için birikmiş oyları kullanır.

**Not:** Casper FFG'nin orijinal tanımı, Gasper'a dahil edilmesi için biraz güncellenmiştir. Bu sayfada güncellenmiş sürümü ele alıyoruz.

## Ön Koşullar {#prerequisites}

Bu materyali anlamak için [Hisse Kanıtı (PoS)](/developers/docs/consensus-mechanisms/pos/) hakkındaki giriş sayfasını okumak gereklidir.

## Gasper'ın rolü {#role-of-gasper}

Gasper, düğümlerin blok teklif etme veya doğrulama konusunda tembel veya dürüst olmayan davranışlar sergilemeleri durumunda yok edilebilecek bir güvenlik teminatı olarak Ether sağladığı bir Hisse Kanıtı (PoS) blokzincirinin üzerinde yer alır. Gasper; doğrulayıcıların nasıl ödüllendirileceğini ve cezalandırılacağını, hangi blokların kabul edilip reddedileceğini ve blokzincirin hangi çatallanması üzerine inşa edileceğini tanımlayan mekanizmadır.

## Kesinlik nedir? {#what-is-finality}

Kesinlik, belirli blokların bir özelliğidir ve kritik bir mutabakat hatası olmadığı ve bir saldırgan stake edilen toplam Ether'in en az 1/3'ünü yok etmediği sürece geri alınamayacakları anlamına gelir. Kesinleşmiş bloklar, blokzincirin emin olduğu bilgiler olarak düşünülebilir. Bir bloğun kesinleşmesi için iki adımlı bir yükseltme prosedüründen geçmesi gerekir:

1. Stake edilen toplam Ether'in üçte ikisi, o bloğun kurallı zincire dahil edilmesi lehinde oy kullanmış olmalıdır. Bu koşul, bloğu "gerekçelendirilmiş" durumuna yükseltir. Gerekçelendirilmiş blokların geri alınması pek olası değildir, ancak belirli koşullar altında geri alınabilirler.
2. Gerekçelendirilmiş bir bloğun üzerine başka bir blok gerekçelendirildiğinde, "kesinleşmiş" durumuna yükseltilir. Bir bloğu kesinleştirmek, bloğu kurallı zincire dahil etme taahhüdüdür. Bir saldırgan milyonlarca Ether'i (milyarlarca ABD doları) yok etmedikçe geri alınamaz.

Bu blok yükseltmeleri her slotta gerçekleşmez. Bunun yerine, yalnızca dönem sınırı blokları gerekçelendirilebilir ve kesinleşebilir. Bu bloklar "kontrol noktaları" olarak bilinir. Yükseltme, kontrol noktası çiftlerini dikkate alır. Daha eski kontrol noktasını kesinleşmiş ve daha yeni bloğu gerekçelendirilmiş durumuna yükseltmek için birbirini izleyen iki kontrol noktası arasında bir "süper çoğunluk bağlantısı" bulunmalıdır (yani, stake edilen toplam Ether'in üçte ikisinin B kontrol noktasının A kontrol noktasının doğru soyundan geldiğine dair oy kullanması).

<GasperFinalityDiagram />

Kesinlik, bir bloğun kurallı olduğuna dair üçte ikilik bir anlaşma gerektirdiğinden, bir saldırgan şunları yapmadan alternatif bir kesinleşmiş zincir oluşturamaz:

1. Stake edilen toplam Ether'in üçte ikisine sahip olmak veya bunları manipüle etmek.
2. Stake edilen toplam Ether'in en az üçte birini yok etmek.

İlk koşul, bir zinciri kesinleştirmek için stake edilen Ether'in üçte ikisinin gerekmesinden kaynaklanır. İkinci koşul ise, toplam stake'in üçte ikisi her iki çatallanma lehine oy kullandıysa, üçte birinin her ikisine de oy vermiş olması gerektiğinden ortaya çıkar. Çifte oy kullanma, maksimum düzeyde cezalandırılacak bir kesinti koşuludur ve toplam stake'in üçte biri yok edilir. Kasım 2026 itibarıyla, stake edilen yaklaşık 44,4 milyon ETH ile bu, bir saldırganın yaklaşık 1.700 ABD doları ETH fiyatıyla yaklaşık 25 milyar ABD doları olan yaklaşık 14,8 milyon ETH kaybedeceği anlamına gelir. Gasper'da blokları gerekçelendiren ve kesinleştiren algoritma, [Casper the Friendly Finality Gadget (Casper FFG)](https://arxiv.org/pdf/1710.09437.pdf)'nin biraz değiştirilmiş bir şeklidir.

### Teşvikler ve Kesintiler {#incentives-and-slashing}

Doğrulayıcılar, blokları dürüstçe teklif ettikleri ve doğruladıkları için ödüllendirilirler. Ether ödül olarak verilir ve stake'lerine eklenir. Öte yandan, çağrıldıklarında orada olmayan ve harekete geçmeyen doğrulayıcılar bu ödülleri kaçırır ve bazen mevcut stake'lerinin küçük bir kısmını kaybederler. Ancak, çevrimdışı olmanın cezaları küçüktür ve çoğu durumda kaçırılan ödüllerin fırsat maliyetlerine eşittir. Bununla birlikte, aynı slot için birden fazla blok teklif etmek, aynı slot için birden fazla bloğu onaylamak veya önceki kontrol noktası oylarıyla çelişmek gibi bazı doğrulayıcı eylemlerinin yanlışlıkla yapılması çok zordur ve kötü niyete işaret eder. Bunlar daha sert cezalandırılan "kesintiye tabi" davranışlardır; kesinti, doğrulayıcının stake'inin bir kısmının yok edilmesi ve doğrulayıcının doğrulayıcılar ağından çıkarılmasıyla sonuçlanır. Bu süreç 36 gün sürer. 1. Günde, doğrulayıcının etkin bakiyesinin 1/4096'sı kadar küçük bir başlangıç cezası vardır. Ardından, kesintiye uğrayan doğrulayıcının Ether'i çıkış dönemi boyunca yavaş yavaş tükenir, ancak 18. Günde bir "korelasyon cezası" alırlar; bu ceza, aynı zamanlarda daha fazla doğrulayıcı kesintiye uğradığında daha büyüktür. Maksimum ceza tüm stake'tir. Bu ödüller ve cezalar, dürüst doğrulayıcıları teşvik etmek ve ağa yönelik saldırıları caydırmak için tasarlanmıştır.

### Hareketsizlik Sızıntısı {#inactivity-leak}

Gasper, güvenliğin yanı sıra "makul canlılık" da sağlar. Bu, stake edilen toplam Ether'in üçte ikisi dürüstçe oy kullandığı ve protokolü takip ettiği sürece, zincirin diğer faaliyetlerden (saldırılar, gecikme sorunları veya kesintiler gibi) bağımsız olarak kesinleşebileceği koşuludur. Başka bir deyişle, zincirin kesinleşmesini önlemek için stake edilen toplam Ether'in üçte birinin bir şekilde tehlikeye atılması gerekir. Gasper'da, canlılık hatasına karşı "hareketsizlik sızıntısı" olarak bilinen ek bir savunma hattı vardır. Bu mekanizma, zincir dört dönemden daha uzun süre kesinleşemediğinde devreye girer. Çoğunluk zincirini aktif olarak onaylamayan doğrulayıcıların stake'leri, çoğunluk toplam stake'in üçte ikisini yeniden kazanana kadar yavaş yavaş tüketilir ve böylece canlılık hatalarının yalnızca geçici olması sağlanır.

### Çatallanma seçimi {#fork-choice}

Casper FFG'nin orijinal tanımı, şu kuralı dayatan bir çatallanma seçimi algoritması içeriyordu: `follow the chain containing the justified checkpoint that has the greatest height` burada yükseklik, başlangıç bloğundan olan en büyük mesafe olarak tanımlanır. Gasper'da, orijinal çatallanma seçimi kuralı kullanımdan kaldırılarak LMD-GHOST adı verilen daha karmaşık bir algoritma tercih edilmiştir. Normal koşullar altında bir çatallanma seçimi kuralının gereksiz olduğunu anlamak önemlidir; her slot için tek bir blok teklifçisi vardır ve dürüst doğrulayıcılar bunu onaylar. Yalnızca büyük ağ asenkronizasyonu durumlarında veya dürüst olmayan bir blok teklifçisi belirsiz davrandığında bir çatallanma seçimi algoritması gereklidir. Ancak bu durumlar ortaya çıktığında, çatallanma seçimi algoritması doğru zinciri güvence altına alan kritik bir savunmadır.

LMD-GHOST, "latest message-driven greedy heaviest observed sub-tree" (en son mesaj odaklı açgözlü en ağır gözlemlenen alt ağaç) anlamına gelir. Bu, en büyük birikmiş onay ağırlığına sahip çatallanmayı kurallı olan olarak seçen (açgözlü en ağır alt ağaç) ve bir doğrulayıcıdan birden fazla mesaj alınırsa yalnızca en sonuncusunun dikkate alındığı (en son mesaj odaklı) bir algoritmayı tanımlamanın jargon ağırlıklı bir yoludur. En ağır bloğu kurallı zincirine eklemeden önce, her doğrulayıcı bu kuralı kullanarak her bloğu değerlendirir.

## Daha Fazla Okuma {#further-reading}

- [Gasper: GHOST ve Casper'ı Birleştirmek](https://arxiv.org/pdf/2003.03052.pdf)
- [Casper the Friendly Finality Gadget](https://arxiv.org/pdf/1710.09437.pdf)
