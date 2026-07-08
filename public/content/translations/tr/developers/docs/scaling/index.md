---
title: "Ölçeklendirme"
description: "Ethereum topluluğu tarafından şu anda geliştirilmekte olan farklı ölçeklendirme seçeneklerine bir giriş."
lang: tr
sidebarDepth: 3
---

## Ölçeklendirmeye genel bakış {#scaling-overview}

[Ethereum](/) kullanan kişi sayısı arttıkça, Blokzincir belirli kapasite sınırlarına ulaştı. Bu durum, ağı kullanma maliyetini artırarak "ölçeklendirme çözümleri" ihtiyacını doğurdu. Benzer hedeflere ulaşmak için farklı yaklaşımlar benimseyen, araştırılan, test edilen ve uygulanan birden fazla çözüm bulunmaktadır.

Ölçeklenebilirliğin temel amacı, merkeziyetsizlikten veya güvenlikten ödün vermeden işlem hızını (daha hızlı kesinlik) ve işlem kapasitesini (saniyede daha yüksek işlem sayısı) artırmaktır. Katman 1 (l1) Ethereum Blokzincirinde yüksek talep, daha yavaş işlemlere ve sürdürülemez [Gaz fiyatlarına](/developers/docs/gas/) yol açar. Ağ kapasitesini hız ve işlem kapasitesi açısından artırmak, Ethereum'un anlamlı ve kitlesel benimsenmesi için temeldir.

Hız ve işlem kapasitesi önemli olsa da, bu hedefleri mümkün kılan ölçeklendirme çözümlerinin merkeziyetsiz ve güvenli kalması esastır. Düğüm operatörleri için giriş engelini düşük tutmak, merkezi ve güvensiz bilgi işlem gücüne doğru bir ilerlemeyi önlemede kritik öneme sahiptir.

Kavramsal olarak ölçeklendirmeyi ilk olarak zincir içi ölçeklendirme veya zincir dışı ölçeklendirme olarak sınıflandırıyoruz.

## Ön Koşullar {#prerequisites}

Tüm temel konuları iyi anlamış olmalısınız. Teknoloji daha az test edildiğinden ve araştırılmaya ve geliştirilmeye devam ettiğinden, ölçeklendirme çözümlerini uygulamak ileri düzey bir konudur.

## Zincir içi ölçeklendirme {#onchain-scaling}

Zincir içi ölçeklendirme, Ethereum Protokolünde (katman 1 (l1) [Ana Ağ](/glossary/#mainnet)) değişiklikler gerektirir. Uzun bir süre boyunca, Blokzinciri parçalara ayırmanın (sharding) Ethereum'u ölçeklendirmesi bekleniyordu. Bu, Blokzinciri Doğrulayıcı alt kümeleri tarafından doğrulanacak ayrı parçalara (parça zincirlerine) bölmeyi içerecekti. Ancak, katman 2 (l2) toplamaları ile ölçeklendirme, birincil ölçeklendirme tekniği olarak yerini almıştır. Bu, toplamaları kullanıcılar için ucuz hale getirmek üzere özel olarak tasarlanmış, Ethereum Bloklarına eklenen yeni ve daha ucuz bir veri formunun eklenmesiyle desteklenmektedir.

### Parçalama (Sharding) {#sharding}

Parçalama, bir veritabanını bölme işlemidir. Doğrulayıcı alt kümeleri, tüm Ethereum'u takip etmek yerine bireysel parça zincirlerinden sorumlu olacaktır. Parçalama uzun zamandır Ethereum [yol haritasındaydı](/roadmap/) ve bir zamanlar Hisse Kanıtı'na (PoS) geçiş olan Birleşme'den önce yayınlanması amaçlanmıştı. Ancak, [katman 2 (l2) toplamalarının](#layer-2-scaling) hızlı gelişimi ve [danksharding](/roadmap/danksharding)'in icadı (Doğrulayıcılar tarafından çok verimli bir şekilde doğrulanabilen Rollup verisi bloblarının Ethereum Bloklarına eklenmesi), Ethereum topluluğunun parçalama ile ölçeklendirme yerine Rollup merkezli ölçeklendirmeyi tercih etmesine yol açmıştır. Bu aynı zamanda Ethereum'un mutabakat mantığını daha basit tutmaya yardımcı olacaktır.

## Zincir dışı ölçeklendirme {#offchain-scaling}

Zincir dışı çözümler, katman 1 (l1) Ana Ağdan ayrı olarak uygulanır - mevcut Ethereum Protokolünde hiçbir değişiklik gerektirmezler. "Katman 2" çözümleri olarak bilinen bazı çözümler, güvenliklerini doğrudan katman 1 (l1) Ethereum mutabakatından alır; örneğin [iyimser toplamalar](/developers/docs/scaling/optimistic-rollups/), [sıfır bilgi toplamaları](/developers/docs/scaling/zk-rollups/) veya [durum kanalları](/developers/docs/scaling/state-channels/). Diğer çözümler, güvenliklerini Ana Ağdan ayrı olarak alan çeşitli biçimlerde yeni zincirlerin oluşturulmasını içerir; örneğin [yan zincirler](#sidechains), [Validium'lar](#validium) veya [Plasma zincirleri](#plasma). Bu çözümler Ana Ağ ile iletişim kurar ancak çeşitli hedeflere ulaşmak için güvenliklerini farklı şekilde sağlarlar.

### Katman 2 ölçeklendirmesi {#layer-2-scaling}

Bu zincir dışı çözüm kategorisi, güvenliğini Ethereum Ana Ağdan alır.

Katman 2 (l2), Ana Ağın sağlam merkeziyetsiz güvenlik modelinden yararlanırken işlemleri Ethereum Ana Ağı (katman 1) dışında yürüterek uygulamanızı ölçeklendirmeye yardımcı olmak için tasarlanmış çözümler için kullanılan ortak bir terimdir. Ağ meşgul olduğunda işlem hızı düşer ve bu da belirli merkeziyetsiz uygulama (dapp) türleri için kullanıcı deneyimini kötüleştirir. Ve ağ daha da meşgul hale geldikçe, işlemi gönderenler birbirlerinden daha yüksek teklif vermeyi amaçladıkları için Gaz fiyatları artar. Bu durum Ethereum kullanımını çok pahalı hale getirebilir.

Çoğu katman 2 (l2) çözümü, her biri bir Düğüm, Doğrulayıcı, operatör, sıralayıcı, Blok üreticisi veya benzer bir terim olarak adlandırılabilecek bir sunucu veya sunucu kümesi etrafında toplanmıştır. Uygulamaya bağlı olarak, bu katman 2 (l2) Düğümleri, onları kullanan bireyler, işletmeler veya kuruluşlar tarafından ya da 3. taraf bir operatör veya büyük bir birey grubu (Ana Ağa benzer şekilde) tarafından çalıştırılabilir. Genel olarak konuşursak, işlemler doğrudan katman 1'e (Ana Ağ) gönderilmek yerine bu katman 2 (l2) Düğümlerine gönderilir. Bazı çözümler için, katman 2 (l2) örneği daha sonra bunları katman 1'e (l1) sabitlemeden önce gruplar halinde toplar, ardından katman 1 (l1) tarafından güvence altına alınırlar ve değiştirilemezler. Bunun nasıl yapıldığının ayrıntıları, farklı katman 2 (l2) teknolojileri ve uygulamaları arasında önemli ölçüde farklılık gösterir.

Belirli bir katman 2 (l2) örneği açık olabilir ve birçok uygulama tarafından paylaşılabilir veya tek bir proje tarafından dağıtılabilir ve yalnızca kendi uygulamalarını desteklemeye adanmış olabilir.

#### Katman 2 neden gereklidir? {#why-is-layer-2-needed}

- Saniyedeki işlem sayısının artması kullanıcı deneyimini büyük ölçüde iyileştirir ve Ethereum Ana Ağındaki ağ tıkanıklığını azaltır.
- İşlemler, Ethereum Ana Ağına tek bir işlem olarak toplanır, bu da kullanıcılar için Gaz ücretlerini azaltır ve Ethereum'u her yerdeki insanlar için daha kapsayıcı ve erişilebilir hale getirir.
- Ölçeklenebilirlikteki herhangi bir güncelleme merkeziyetsizlik veya güvenlik pahasına olmamalıdır – katman 2 (l2) Ethereum'un üzerine inşa edilir.
- Varlıklarla büyük ölçekte çalışırken kendi verimliliklerini getiren uygulamaya özel katman 2 (l2) ağları vardır.

[Katman 2 hakkında daha fazlası](/layer-2/).

#### Toplamalar {#rollups}

Toplamalar, işlem yürütmesini katman 1 (l1) dışında gerçekleştirir ve ardından veriler, mutabakata varıldığı katman 1'e (l1) gönderilir. İşlem verileri katman 1 (l1) Bloklarına dahil edildiğinden, bu durum toplamaların yerel Ethereum güvenliği ile güvence altına alınmasını sağlar.

Farklı güvenlik modellerine sahip iki tür toplama vardır:

- **İyimser toplamalar**: işlemlerin varsayılan olarak geçerli olduğunu varsayar ve yalnızca bir itiraz durumunda bir [**sahtekarlık kanıtı**](/glossary/#fraud-proof) aracılığıyla hesaplama çalıştırır. [İyimser toplamalar hakkında daha fazlası](/developers/docs/scaling/optimistic-rollups/).
- **Sıfır bilgi toplamaları**: hesaplamayı zincir dışı çalıştırır ve Zincire bir [**geçerlilik kanıtı**](/glossary/#validity-proof) sunar. [Sıfır bilgi toplamaları hakkında daha fazlası](/developers/docs/scaling/zk-rollups/).

#### Durum kanalları {#channels}

Durum kanalları, katılımcıların zincir dışı hızlı ve özgürce işlem yapmalarını ve ardından Ana Ağ ile kesinliği sağlamalarını mümkün kılmak için çoklu imza Sözleşmelerini kullanır. Bu, ağ tıkanıklığını, ücretleri ve gecikmeleri en aza indirir. Şu anda iki tür kanal bulunmaktadır: durum kanalları ve ödeme kanalları.

[Durum kanalları](/developers/docs/scaling/state-channels/) hakkında daha fazla bilgi edinin.

### Yan zincirler {#sidechains}

Bir yan zincir, Ana Ağa paralel olarak çalışan bağımsız, EVM uyumlu bir Blokzincirdir. Bunlar, iki yönlü köprüler aracılığıyla Ethereum ile uyumludur ve kendi seçtikleri mutabakat kuralları ve Blok parametreleri altında çalışırlar.

[Yan zincirler](/developers/docs/scaling/sidechains/) hakkında daha fazla bilgi edinin.

### Plasma {#plasma}

Bir Plasma zinciri, ana Ethereum Zincirine sabitlenmiş ve anlaşmazlıkları çözmek için (tıpkı [iyimser toplamalar](/developers/docs/scaling/optimistic-rollups/) gibi) sahtekarlık kanıtlarını kullanan ayrı bir Blokzincirdir.

[Plasma](/developers/docs/scaling/plasma/) hakkında daha fazla bilgi edinin.

### Validium {#validium}

Bir Validium zinciri, sıfır bilgi toplamaları gibi geçerlilik kanıtları kullanır ancak veriler ana katman 1 (l1) Ethereum Zincirinde saklanmaz. Bu, Validium zinciri başına saniyede 10 bin işleme yol açabilir ve birden fazla zincir paralel olarak çalıştırılabilir.

[Validium](/developers/docs/scaling/validium/) hakkında daha fazla bilgi edinin.

## Neden bu kadar çok ölçeklendirme çözümüne ihtiyaç var? {#why-do-we-need-these}

- Birden fazla çözüm, ağın herhangi bir bölümündeki genel tıkanıklığı azaltmaya yardımcı olabilir ve ayrıca tekil hata noktalarını önleyebilir.
- Bütün, parçalarının toplamından daha büyüktür. Farklı çözümler bir arada var olabilir ve uyum içinde çalışabilir, bu da gelecekteki işlem hızı ve işlem kapasitesi üzerinde üstel bir etkiye olanak tanır.
- Tüm çözümler doğrudan Ethereum mutabakat algoritmasını kullanmayı gerektirmez ve alternatifler, aksi takdirde elde edilmesi zor olacak faydalar sunabilir.

## Görsel öğrenmeyi mi tercih ediyorsunuz? {#visual-learner}

<VideoWatch slug="layer-2-scaling-explained" />

_Videodaki açıklamanın tüm zincir dışı ölçeklendirme çözümlerine atıfta bulunmak için "Katman 2" terimini kullandığını, bizim ise "Katman 2"yi güvenliğini katman 1 (l1) Ana Ağ mutabakatı aracılığıyla alan bir zincir dışı çözüm olarak ayırdığımızı unutmayın._

<VideoWatch slug="rollups-scaling-strategy" />

## Daha fazla okuma {#further-reading}

- [Rollup merkezli bir Ethereum yol haritası](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Ethereum için Katman 2 ölçeklendirme çözümleri hakkında güncel analizler](https://www.l2beat.com/)
- [Ethereum katman 2 Ölçeklendirme Çözümlerini Değerlendirme: Bir Karşılaştırma Çerçevesi](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Eksik Bir Toplamalar (Rollups) Rehberi](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [Ethereum Destekli ZK-Rollup'lar: Dünya Liderleri](https://hackmd.io/@canti/rkUT0BD8K)
- [İyimser Toplamalar ve ZK Toplamaları](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Neden toplamalar + veri parçaları yüksek ölçeklenebilirlik için tek sürdürülebilir çözümdür](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [Ne tür Katman 3'ler mantıklıdır?](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [Veri Kullanılabilirliği Veya: Toplamalar Endişelenmeyi Bırakıp Ethereum'u Sevmeyi Nasıl Öğrendi](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [Ethereum Toplamaları İçin Pratik Rehber](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve ekleyin!_

## Eğitimler: Ethereum üzerinde ölçeklenebilir Katman 2'ler oluşturun {#tutorials}

- [Önbelleğe alabileceğiniz her şey](/developers/tutorials/all-you-can-cache/) _– Toplamalarda çağrı verisi maliyetlerini azaltmak için bir önbelleğe alma Sözleşmesi nasıl oluşturulur ve kullanılır._
- [Çağrı Verisi Optimizasyonu için Kısa ABI'ler](/developers/tutorials/short-abi/) _– Katman 2 (l2) işlemleri için çağrı verisi maliyetlerini azaltmak amacıyla daha kısa ABI'ler nasıl kullanılır._