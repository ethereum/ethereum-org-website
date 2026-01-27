---
title: Ölçeklendirme
description: Ethereum topluluğu tarafından geliştirilmekte olan farklı ölçekleme seçeneklerine giriş.
lang: tr
sidebarDepth: 3
---

## Ölçeklendirmeye genel bakış {#scaling-overview}

Ethereum kullanan kişi sayısı arttıkça blok zinciri belirli kapasite sınırlamalarına ulaştı. Bu durum, ağı kullanma maliyetini artırarak "ölçeklendirme çözümlerine" yönelik bir ihtiyaç doğurdu. Benzer hedeflere ulaşmak için farklı yaklaşımlar benimseyen, araştırılan, test edilen ve uygulanan çok sayıda çözüm vardır.

Ölçeklenebilirliğin ana hedefi, merkeziyetsizlikten veya güvenlikten ödün vermeden işlem hızını (daha hızlı kesinlik) ve işlem hacmini (saniye başına daha yüksek işlem sayısı) artırmaktır. Katman 1 Ethereum blokzincirinde yüksek talep, daha yavaş işlemlere ve elverişsiz [gaz fiyatlarına](/developers/docs/gas/) yol açar. Ethereum'un anlamlı ve toplu olarak benimsenmesi için ağ kapasitesini hız ve verim açısından artırmak çok önemlidir.

Hız ve verim önemli olsa da, bu hedefleri mümkün kılan ölçeklendirme çözümlerinin merkeziyetsiz ve güvenli kalması çok önemlidir. Düğüm operatörleri için giriş engelini düşük tutmak, merkezi ve güvenli olmayan bilgi işlem gücüne doğru ilerlemeyi önlemede kritik önem arz eder.

Kavramsal olarak, ölçeklendirmeyi ilk olarak zincir üstü ölçeklendirme veya zincir dışı ölçeklendirme olarak sınıflandırıyoruz.

## Ön Koşullar {#prerequisites}

Tüm temel konuları kapsamlı olarak anlamanız gerekmektedir. Bu teknoloji henüz pek kullanılmadığı için ve araştırılmaya ve geliştirilmeye devam edildiğinden, ölçeklendirme çözümlerinin uygulanması ileri seviye bilgi gerektirir.

## Zincir üstü ölçeklendirme {#onchain-scaling}

Zincir üstü ölçeklendirme, Ethereum protokolünde (katman 1 [Ana Ağ](/glossary/#mainnet)) değişiklikler yapılmasını gerektirir. Uzun bir süredir blokzinciri parçalamanın Ethereum'u ölçeklendirmesi bekleniyordu. Süreç, blokzincirin çeşitli ayrık parçalara (shard adı verilen) ayrılmasını ve bu parçaların doğrulayıcı alt kümeleri tarafından onaylanmasını içerecekti. Ancak katman-2 toplamalarıyla ölçeklendirmenin birincil ölçeklendirme tekniği olmasıyla beraber bu durum değişti. Bu, toplama kullanımlarının kullanıcılar için ucuz hale getirilmesi amaçlanarak daha ucuz bir veri biçiminin Ethereum bloklarına eklenmesiyle destekleniyor.

### Parçalama {#sharding}

Parçalama, veritabanını bölmek için kullanılan işlemdir. Böylelikle doğrulayıcı alt kümeleri, tüm Ethereum ağını takip etmektense belirli bazı parçaları takip etmekten sorumlu olurlar. Parçalama uzun süredir Ethereum [yol haritasında](/roadmap/) yer alıyordu ve bir zamanlar Hisse İspatı'na geçiş için Birleşme'den önce gönderilmesi amaçlanmıştı. Ancak, [katman 2 toplamalarının](#layer-2-scaling) hızlı gelişimi ve [Danksharding](/roadmap/danksharding) (doğrulayıcılar tarafından çok verimli bir şekilde doğrulanabilen Ethereum bloklarına toplama verisi blobları ekleme) icadı, Ethereum topluluğunun parçalama yoluyla ölçeklendirme yerine toplama merkezli ölçeklendirmeyi tercih etmesine yol açtı. Bu aynı zamanda da Ethereum'un mutabakat mantığının sade kalmasına da yardımcı olacaktır.

## Zincir dışı ölçeklendirme {#offchain-scaling}

Zincir dışı çözümler, katman 1 Ana Ağ'dan ayrı olarak uygulanır - mevcut Ethereum protokolünde herhangi bir değişiklik gerektirmezler. "Katman 2" çözümleri olarak bilinen bazı çözümler, güvenliklerini doğrudan katman 1 Ethereum mutabakatından alır; [iyimser toplamalar](/developers/docs/scaling/optimistic-rollups/), [sıfır bilgi toplamaları](/developers/docs/scaling/zk-rollups/) veya [durum kanalları](/developers/docs/scaling/state-channels/) gibi. Diğer çözümler, güvenliklerini Ana Ağ'dan ayrı olarak alan [yan zincirler](#sidechains), [validium'lar](#validium) veya [plasma zincirleri](#plasma) gibi çeşitli biçimlerde yeni zincirlerin oluşturulmasını içerir. Bu çözümler Ana Ağ ile iletişim kurar ancak çeşitli hedeflere ulaşmak için güvenliklerini farklı şekilde elde ederler.

### Katman 2 ölçeklendirme {#layer-2-scaling}

Bu zincir dışı çözüm kategorisi, güvenliğini Ana Ağ Ethereum'dan alır.

Katman 2, Ana Ağ'ın sağlam merkeziyetsiz güvenlik modelinden yararlanırken, işlemleri Ethereum Ana Ağı'ndan (katman 1) yöneterek uygulamanızı ölçeklendirmeye yardımcı olmak üzere tasarlanmış çözümler için kullanılan toplu bir terimdir. Ağ meşgulken işlem hızı düşer ve belirli türdeki merkeziyetsiz uygulamalar için kullanıcı deneyimi olumsuz etkilenir. Ağ yoğunluğu arttıkça işlem göndericiler birbirleriyle rekabete girerek gaz ücretlerinin artmasına neden olurlar. Bu, Ethereum'u kullanmayı çok pahalı hâle getirebilir.

Katman 2 çözümlerinin çoğu düğüm, doğrulayıcı, operatör, sıralayıcı veya blok üreticileri gibi bir sunucu veya sunucu kümesi etrafında toplanır. Uygulamaya bağlı olarak bu katman 2 düğümleri, onları kullanan kişiler, işletmeler veya kuruluşlar veya bir 3. taraf operatör veya büyük bir grup kişi tarafından (Ana Ağ'a benzer şekilde) çalıştırılabilir. Genel olarak konuşursak, işlemler doğrudan katman 1'e (Ana ağ) gönderilmek yerine bu katman 2 düğümlerine gönderilir. Bazı çözümlerde katman 2 örneği, bunları katman 1'e sabitlemeden önce gruplar halinde toplar, ardından katman 1 tarafından güvence altına alınır ve değiştirilemezler. Bunun nasıl yapıldığına ilişkin ayrıntılar, farklı katman 2 teknolojileri ve uygulamaları arasında önemli ölçüde farklılık gösterir.

Belirli bir katman 2 örneği açık olabilir ve birçok uygulama tarafından paylaşılabilir veya bir proje tarafından dağıtılabilir ve yalnızca uygulamalarını desteklemeye adanmış olabilir.

#### Katman 2 neden gerekli? {#why-is-layer-2-needed}

- Saniye başına artan işlem, kullanıcı deneyimini büyük ölçüde iyileştirir ve Mainnet Ethereum'daki ağ tıkanıklığını azaltır.
- İşlemler, Ana Ağ Ethereum'a tek bir işlemde toplanarak kullanıcılar için gaz ücretlerini düşürür ve Ethereum'u her yerdeki insanlar için daha kapsayıcı ve erişilebilir hâle getirir.
- Ölçeklendirme ile ilgili hiçbir gelişme güvenlik veya merkeziyetsizlikten taviz vermemelidir: Katman 2 çözümleri Ethereum'u olduğu hâliyle geliştirir.
- Varlıklarla büyük ölçekte çalışırken kendi verimliliklerini getiren uygulamaya özel katman 2 ağları vardır.

[Katman 2 hakkında daha fazla bilgi](/layer-2/)

#### Toplamalar {#rollups}

Toplamalar, işlem yürütmesini katman 1 dışında gerçekleştirir ve ardından veriler, konsensusa varılan, katman 1'e gönderilir. Bu, işlem verileri katman 1 bloklarına dahil edildiğinden toplamaların yerel Ethereum güvenliği ile güvence altına alınmasına olanak tanır.

Farklı güvenlik modellerine sahip iki tür toplama vardır:

- **İyimser toplamalar**: işlemlerin varsayılan olarak geçerli olduğunu varsayar ve yalnızca bir itiraz durumunda bir [**sahtekarlık kanıtı**](/glossary/#fraud-proof) aracılığıyla hesaplama çalıştırır. [İyimser toplamalar hakkında daha fazla bilgi](/developers/docs/scaling/optimistic-rollups/).
- **Sıfır bilgi toplamaları**: hesaplamayı zincir dışı çalıştırır ve zincire bir [**geçerlilik kanıtı**](/glossary/#validity-proof) gönderir. [Sıfır bilgi toplamaları hakkında daha fazla bilgi](/developers/docs/scaling/zk-rollups/).

#### Durum kanalları {#channels}

Durum kanalları, katılımcıların zincir dışı hızlı ve özgürce işlem yapmalarını sağlamak için çoklu imza (multisig) sözleşmelerini kullanır ve ardından Ana Ağ ile kesinliği belirler. Bu, ağ tıkanıklığını, ücretleri ve gecikmeleri en aza indirger. Mevcut kanal türleri, özel kanallar ve ödeme kanalları olarak iki türdedir.

[Durum kanalları](/developers/docs/scaling/state-channels/) hakkında daha fazla bilgi edinin.

### Yan zincirler {#sidechains}

Bir yan zincir, Ana Ağ'a paralel olarak çalışan bağımsız bir EVM uyumlu blokzinciridir. Bunlar, iki yönlü köprüler aracılığıyla Ethereum ile uyumludur ve kendi seçtikleri mutabakat kuralları ve blok parametreleri altında çalışırlar.

[Yan zincirler](/developers/docs/scaling/sidechains/) hakkında daha fazla bilgi edinin.

### Plasma {#plasma}

Bir plasma zinciri, ana Ethereum zincirine sabitlenmiş ayrı bir blokzinciridir ve anlaşmazlıklara hakemlik etmek için ( [iyimser toplamalar](/developers/docs/scaling/optimistic-rollups/) gibi) sahtekarlık kanıtlarını kullanır.

[Plasma](/developers/docs/scaling/plasma/) hakkında daha fazla bilgi edinin.

### Validium {#validium}

Bir Validium zinciri, sıfır bilgi toplamaları gibi doğruluk ispatlarını kullanır, ancak veriler ana katman 1 Ethereum zincirinde depolanmaz. Bu, her bir Validium zinciri başına saniyede 10 bin işlem yapılabilmesine ve birden çok zincirin paralel olarak çalışabilmesine olanak sağlar.

[Validium](/developers/docs/scaling/validium/) hakkında daha fazla bilgi edinin.

## Neden bu kadar çok ölçeklendirme çözümüne ihtiyaç var? {#why-do-we-need-these}

- Birden çok çözüm, ağın herhangi bir bölümündeki genel tıkanıklığı azaltmaya yardımcı olabilir ve ayrıca tekil hata noktalarını önler.
- Bütün, parçalarının toplamından daha büyüktür. Farklı çözümler var olabilir ve uyum içinde çalışabilir, bu da gelecekteki işlem hızı ve verimi üzerinde üstel bir etkiye izin verir.
- Tüm çözümler, Ethereum mutabakat algoritmasının doğrudan kullanılmasını gerektirmez ve alternatifler, aksi takdirde elde edilmesi zor olacak faydalar sunabilir.

## Görerek öğrenmeyi mi tercih ediyorsunuz? {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_Videodaki açıklamanın "Katman 2" terimini tüm zincir dışı ölçeklendirme çözümlerini ifade etmek için kullandığını, bizim ise "Katman 2"yi güvenliğini katman 1 Ana Ağ mutabakatı aracılığıyla sağlayan zincir dışı bir çözüm olarak ayırdığımızı unutmayın._

<YouTube id="7pWxCklcNsU" />

## Daha fazla kaynak {#further-reading}

- [Toplama merkezli bir Ethereum yol haritası](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Ethereum için Katman 2 ölçeklendirme çözümleri hakkında güncel analizler](https://www.l2beat.com/)
- [Ethereum Katman 2 Ölçeklendirme Çözümlerini Değerlendirme: Bir Karşılaştırma Çerçevesi](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Toplamalar İçin Eksik Bir Kılavuz](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [Ethereum Destekli ZK Toplamaları: Dünya Liderleri](https://hackmd.io/@canti/rkUT0BD8K)
- [İyimser Toplamalar ve ZK Toplamalar Karşılaştırması](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Toplamalar + veri parçaları neden yüksek ölçeklenebilirlik için tek sürdürülebilir çözümdür?](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [Ne tür Katman 3'ler mantıklıdır?](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [Data Availability Or: How Rollups Learned To Stop Worrying And Love Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [Ethereum Toplamaları için Pratik Kılavuz](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_
