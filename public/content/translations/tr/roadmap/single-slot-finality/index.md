---
title: Tek slot kesinliği
description: Tek slot kesinliğinin açıklaması
lang: tr
---

Bir [Ethereum](/) bloğunun kesinleşmesi yaklaşık 15 dakika sürer. Ancak, Ethereum'un mutabakat mekanizmasının blokları daha verimli bir şekilde doğrulamasını sağlayabilir ve kesinlik süresini önemli ölçüde azaltabiliriz. On beş dakika beklemek yerine, bloklar aynı slot içinde teklif edilebilir ve kesinleşebilir. Bu kavram **tek slot kesinliği (SSF)** olarak bilinir.

## Kesinlik nedir? {#what-is-finality}

Ethereum'un Hisse Kanıtı (PoS) tabanlı mutabakat mekanizmasında kesinlik, stake edilmiş toplam ETH'nin en az %33'ü yakılmadan bir bloğun Blokzincir'den değiştirilemeyeceği veya kaldırılamayacağı garantisini ifade eder. Bu 'kripto-ekonomik' bir güvenliktir çünkü güven, zincirin sırasını veya içeriğini değiştirmenin getirdiği ve herhangi bir rasyonel ekonomik aktörün bunu denemesini engelleyecek son derece yüksek maliyetten kaynaklanır.

## Neden daha hızlı bir kesinlik hedefleniyor? {#why-aim-for-quicker-finality}

Mevcut kesinlik süresinin çok uzun olduğu ortaya çıkmıştır. Çoğu kullanıcı kesinlik için 15 dakika beklemek istemez ve yüksek işlem kapasitesi isteyebilecek uygulamalar ve borsalar için işlemlerinin kalıcı olduğundan emin olmak adına bu kadar uzun süre beklemek zorunda kalmak elverişsizdir. Bir bloğun teklifi ile kesinleşmesi arasında bir gecikme olması, bir saldırganın belirli blokları sansürlemek veya MEV elde etmek için kullanabileceği kısa yeniden düzenlemeler (reorg) için de bir fırsat yaratır. Blokları aşamalı olarak yükseltmekle ilgilenen mekanizma da oldukça karmaşıktır ve güvenlik açıklarını kapatmak için birkaç kez yamalanmıştır; bu da onu Ethereum kod tabanında ince hataların ortaya çıkma olasılığının daha yüksek olduğu kısımlardan biri haline getirmektedir. Tüm bu sorunlar, kesinlik süresinin tek bir slota indirilmesiyle ortadan kaldırılabilir.

## Merkeziyetsizlik / zaman / ek yük ödünleşimi {#the-decentralization-time-overhead-tradeoff}

Kesinlik garantisi yeni bir bloğun anında sahip olduğu bir özellik değildir; yeni bir bloğun kesinleşmesi zaman alır. Bunun nedeni, ağda stake edilmiş toplam ETH'nin en az 2/3'ünü temsil eden doğrulayıcıların, bloğun kesinleşmiş sayılması için bloğa oy vermesi ("onay" vermesi) gerekmesidir. Ağdaki her doğrulayıcı düğüm, bir bloğun bu 2/3 eşiğine ulaşıp ulaşmadığını bilmek için diğer düğümlerden gelen onayları işlemek zorundadır.

Kesinleşmeye ulaşmak için izin verilen süre ne kadar kısa olursa, onay işleminin daha hızlı yapılması gerektiğinden her düğümde o kadar fazla hesaplama gücü gerekir. Ayrıca, ağda ne kadar çok doğrulayıcı düğüm varsa, her blok için o kadar çok onayın işlenmesi gerekir ve bu da gereken işlem gücünü artırır. Gereken işlem gücü ne kadar fazla olursa, her bir doğrulayıcı düğümü çalıştırmak için daha pahalı donanımlara ihtiyaç duyulduğundan o kadar az kişi katılabilir. Bloklar arasındaki süreyi artırmak her düğümde gereken hesaplama gücünü azaltır ancak onaylar daha yavaş işlendiği için kesinlik süresini de uzatır.

Bu nedenle, ek yük (hesaplama gücü), merkeziyetsizlik (zinciri doğrulamaya katılabilecek düğüm sayısı) ve kesinlik süresi arasında bir ödünleşim vardır. İdeal sistem minimum hesaplama gücünü, maksimum merkeziyetsizliği ve minimum kesinlik süresini dengeler.

Ethereum'un mevcut mutabakat mekanizması bu üç parametreyi şu şekilde dengelemiştir:

- **Minimum stake miktarını 32 ETH olarak belirlemek**. Bu, bireysel düğümler tarafından işlenmesi gereken doğrulayıcı onaylarının sayısına bir üst sınır ve dolayısıyla her düğüm için hesaplama gereksinimlerine bir üst sınır koyar.
- **Kesinlik süresini ~15 dakika olarak belirlemek**. Bu, normal ev bilgisayarlarında çalışan doğrulayıcıların her blok için onayları güvenli bir şekilde işlemesi için yeterli zaman sağlar.

Mevcut mekanizma tasarımıyla, kesinlik süresini azaltmak için ağdaki doğrulayıcı sayısını azaltmak veya her düğüm için donanım gereksinimlerini artırmak gerekir. Ancak, onayların işlenme biçiminde yapılabilecek ve her düğümdeki ek yükü artırmadan daha fazla onayın sayılmasına olanak tanıyabilecek iyileştirmeler vardır. Daha verimli işleme, kesinliğin iki dönem yerine tek bir slot içinde belirlenmesine olanak tanıyacaktır.

## SSF'ye giden yollar {#routes-to-ssf}

<ExpandableCard title= "Why can't we have SSF today?" eventCategory="/roadmap/single-slot-finality" eventName="clicked Why can't we hear SSF today?">

Mevcut mutabakat mekanizması, her doğrulayıcının bir bloğu doğrulamak için işlemesi gereken mesaj sayısını azaltmak amacıyla komiteler olarak bilinen birden fazla doğrulayıcıdan gelen onayları birleştirir. Her doğrulayıcının her dönemde (32 slot) onay verme fırsatı vardır, ancak her slotta yalnızca 'komite' olarak bilinen bir doğrulayıcı alt kümesi onay verir. Bunu, birkaç doğrulayıcının 'birleştirici' (aggregator) olarak seçildiği alt ağlara bölünerek yaparlar. Bu birleştiricilerin her biri, alt ağlarındaki diğer doğrulayıcılardan gördükleri tüm imzaları tek bir birleşik imzada birleştirir. En fazla sayıda bireysel katkıyı içeren birleştirici, birleşik imzasını blok teklifçisine iletir ve o da bunu diğer komitelerden gelen birleşik imzayla birlikte bloğa dahil eder.

Bu süreç, her doğrulayıcının her dönemde oy kullanması için yeterli kapasite sağlar, çünkü `32 slots * 64 committees * 256 validators per committee = 524,288 validators per epoch`. Bu yazının yazıldığı sırada (Şubat 2023) ~513.000 aktif doğrulayıcı bulunmaktadır.

Bu düzende, her doğrulayıcının bir bloğa oy vermesi ancak onaylarını tüm döneme dağıtmasıyla mümkündür. Bununla birlikte, mekanizmayı _her doğrulayıcının her slotta onay verme şansına sahip olacağı_ şekilde iyileştirmenin potansiyel yolları vardır.
</ExpandableCard>

Ethereum mutabakat mekanizması tasarlandığından bu yana, imza birleştirme düzeninin (BLS) başlangıçta düşünüldüğünden çok daha ölçeklenebilir olduğu bulunmuş, aynı zamanda istemcilerin imzaları işleme ve doğrulama yeteneği de gelişmiştir. Çok sayıda doğrulayıcıdan gelen onayları işlemenin aslında tek bir slot içinde mümkün olduğu ortaya çıkmıştır. Örneğin, her biri her slotta iki kez oy kullanan bir milyon doğrulayıcı ve 16 saniye olarak ayarlanan slot süreleri ile, düğümlerin slot içindeki 1 milyon onayın tamamını işleyebilmesi için imzaları saniyede en az 125.000 birleştirme hızında doğrulaması gerekecektir. Gerçekte, normal bir bilgisayarın bir imza doğrulaması yapması yaklaşık 500 nanosaniye sürer, bu da 125.000 doğrulamanın ~62,5 ms'de yapılabileceği anlamına gelir; bu da bir saniyelik eşiğin çok altındadır.

Örneğin, her slot için rastgele seçilmiş 125.000 doğrulayıcıdan oluşan süper komiteler oluşturularak daha fazla verimlilik kazanımı sağlanabilir. Sadece bu doğrulayıcılar bir bloğa oy verebilir ve bu nedenle bir bloğun kesinleşip kesinleşmeyeceğine sadece bu doğrulayıcı alt kümesi karar verir. Bunun iyi bir fikir olup olmadığı, topluluğun Ethereum'a yönelik başarılı bir saldırının ne kadar pahalı olmasını tercih edeceğine bağlıdır. Bunun nedeni, bir saldırganın stake edilmiş toplam Ether'in 2/3'ünü gerektirmek yerine, _o süper komitedeki_ stake edilmiş Ether'in 2/3'ü ile dürüst olmayan bir bloğu kesinleştirebilmesidir. Bu hala aktif bir araştırma alanıdır, ancak en başta süper komiteler gerektirecek kadar büyük bir doğrulayıcı seti için, bu alt komitelerden birine saldırmanın maliyetinin son derece yüksek olacağı makul görünmektedir (örneğin, saldırının ETH cinsinden maliyeti `2/3 * 125,000 * 32 = ~2.6 million ETH` olacaktır). Saldırı maliyeti, doğrulayıcı setinin boyutu artırılarak ayarlanabilir (örneğin, doğrulayıcı boyutunu saldırı maliyeti 1 milyon Ether, 4 milyon Ether, 10 milyon Ether vb. olacak şekilde ayarlamak). Toplulukta yapılan [ön anketler](https://youtu.be/ojBgyFl6-v4?t=755), 1-2 milyon Ether'in kabul edilebilir bir saldırı maliyeti olduğunu göstermektedir, bu da süper komite başına ~65.536 - 97.152 doğrulayıcı anlamına gelir.

Ancak, doğrulama gerçek darboğaz değildir; doğrulayıcı düğümleri asıl zorlayan şey imza birleştirmedir. İmza birleştirmeyi ölçeklendirmek muhtemelen her alt ağdaki doğrulayıcı sayısını artırmayı, alt ağ sayısını artırmayı veya ek birleştirme katmanları eklemeyi (yani komitelerin komitelerini uygulamayı) gerektirecektir. Çözümün bir parçası, blok oluşturmanın ve Rollup verileri için taahhütler üretmenin teklifçi-oluşturucu ayrımı (PBS) ve danksharding kapsamında uzmanlaşmış blok oluşturuculara dış kaynak olarak verilmesine benzer şekilde, uzmanlaşmış birleştiricilere izin vermek olabilir.

## SSF'de çatallanma seçimi kuralının rolü nedir? {#role-of-the-fork-choice-rule}

Günümüzün mutabakat mekanizması, kesinlik aracı (doğrulayıcıların 2/3'ünün belirli bir zinciri onaylayıp onaylamadığını belirleyen algoritma) ile çatallanma seçimi kuralı (birden fazla seçenek olduğunda hangi zincirin doğru olduğuna karar veren algoritma) arasındaki sıkı bir bağa dayanır. Çatallanma seçimi algoritması yalnızca son kesinleşmiş bloktan _sonraki_ blokları dikkate alır. SSF altında, kesinlik bloğun teklif edildiği aynı slotta gerçekleştiğinden, çatallanma seçimi kuralının dikkate alacağı herhangi bir blok olmayacaktır. Bu, SSF altında herhangi bir zamanda _ya_ çatallanma seçimi algoritmasının _ya da_ kesinlik aracının aktif olacağı anlamına gelir. Kesinlik aracı, doğrulayıcıların 2/3'ünün çevrimiçi olduğu ve dürüstçe onay verdiği blokları kesinleştirecektir. Eğer bir blok 2/3 eşiğini aşamazsa, hangi zincirin izleneceğini belirlemek için çatallanma seçimi kuralı devreye girecektir. Bu aynı zamanda, bazı ek nüanslarla da olsa, doğrulayıcıların 1/3'ünden fazlasının çevrimdışı olduğu bir zinciri kurtaran hareketsizlik sızıntısı mekanizmasını sürdürmek için bir fırsat yaratır.

## Çözülmemiş sorunlar {#outstanding-issues}

Alt ağ başına doğrulayıcı sayısını artırarak birleştirmeyi ölçeklendirmenin sorunu, eşler arası ağ üzerinde daha büyük bir yüke yol açmasıdır. Birleştirme katmanları eklemenin sorunu, mühendisliğinin oldukça karmaşık olması ve gecikme eklemesidir (yani, blok teklifçisinin tüm alt ağ birleştiricilerinden haber alması daha uzun sürebilir). Ayrıca, BLS imza birleştirmesiyle bile, ağda her slotta makul bir şekilde işlenebileceğinden daha fazla aktif doğrulayıcı olması senaryosuyla nasıl başa çıkılacağı net değildir. Potansiyel bir çözüm, tüm doğrulayıcıların her slotta onay vermesi ve SSF altında komitelerin olmaması nedeniyle, etkin bakiye üzerindeki 32 ETH sınırının tamamen kaldırılabileceğidir; bu da birden fazla doğrulayıcıyı yöneten operatörlerin stake'lerini birleştirip daha az sayıda çalıştırabileceği ve doğrulayıcı düğümlerin tüm doğrulayıcı setini hesaba katmak için işlemesi gereken mesaj sayısını azaltabileceği anlamına gelir. Bu, büyük staker'ların doğrulayıcılarını birleştirmeyi kabul etmesine dayanır. Ayrıca herhangi bir zamanda doğrulayıcı sayısına veya stake edilmiş ETH miktarına sabit bir sınır koymak da mümkündür. Ancak bu, hangi doğrulayıcıların katılmasına izin verileceğine ve hangilerine izin verilmeyeceğine karar vermek için bazı mekanizmalar gerektirir ki bu da istenmeyen ikincil etkiler yaratmaya müsaittir.

## Mevcut ilerleme {#current-progress}

SSF araştırma aşamasındadır. Birkaç yıl boyunca, muhtemelen [Verkle Ağaçları](/roadmap/verkle-trees/) ve [danksharding](/roadmap/danksharding/) gibi diğer önemli yükseltmelerden sonra kullanıma sunulması beklenmemektedir.

## Daha fazla bilgi {#further-reading}

- [EDCON 2022'de Vitalik'in SSF üzerine konuşması](https://www.youtube.com/watch?v=nPgUKNPWXNI)
- [Vitalik'in notları: Tek slot kesinliğine giden yollar](https://notes.ethereum.org/@vbuterin/single_slot_finality)