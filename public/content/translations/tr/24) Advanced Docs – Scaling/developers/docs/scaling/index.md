---
title: Ölçeklendirme
description: Ethereum topluluğu tarafından geliştirilmekte olan farklı ölçekleme seçeneklerine giriş.
lang: tr
sidebarDepth: 3
---

## Ölçeklendirmeye genel bakış {#scaling-overview}

Ethereum kullanan kişi sayısı arttıkça blok zinciri belirli kapasite sınırlamalarına ulaştı. Bu durum, ağı kullanma maliyetini artırarak "ölçeklendirme çözümlerine" yönelik bir ihtiyaç doğurdu. Benzer hedeflere ulaşmak için farklı yaklaşımlar benimseyen, araştırılan, test edilen ve uygulanan çok sayıda çözüm vardır.

Ölçeklenebilirliğin ana hedefi, merkeziyetsizlikten veya güvenlikten ödün vermeden işlem hızını (daha hızlı kesinlik) ve işlem verimini (saniye başına daha fazla sayıda işlem) artırmaktır ([Ethereum'un vizyonu](/roadmap/vision/) hakkında daha fazla bilgi). Katman 1 Ethereum blok zincirinde yüksek talep, daha yavaş işlemlere ve elverişsiz [gaz fiyatlarına](/developers/docs/gas/) yol açar. Ethereum'un anlamlı ve toplu olarak benimsenmesi için ağ kapasitesini hız ve verim açısından artırmak çok önemlidir.

Hız ve verim önemli olsa da, bu hedefleri mümkün kılan ölçeklendirme çözümlerinin merkeziyetsiz ve güvenli kalması çok önemlidir. Düğüm operatörleri için giriş engelini düşük tutmak, merkezi ve güvenli olmayan bilgi işlem gücüne doğru ilerlemeyi önlemede kritik önem arz eder.

Kavramsal olarak, ölçeklendirmeyi ilk olarak zincir üstünde veya zincir dışında ölçeklendirme olarak sınıflandırıyoruz.

## Ön Koşullar {#prerequisites}

Tüm temel konuları kapsamlı olarak anlamanız gerekmektedir. Bu teknoloji henüz pek kullanılmadığı için ve araştırılmaya ve geliştirilmeye devam edildiğinden, ölçeklendirme çözümlerinin uygulanması ileri seviye bilgi gerektirir.

## Zincir üstünde ölçeklendirme {#on-chain-scaling}

Zincir üstünde ölçeklendirme yöntemi, Ethereum protokolünde değişiklik yapılmasını gerektirir (katman 1 [Ana Ağ](/glossary/#mainnet)). Uzun bir süredir blokzinciri parçalamanın Ethereum'u ölçeklendirmesi bekleniyordu. Süreç, blokzincirin çeşitli ayrık parçalara (shard adı verilen) ayrılmasını ve bu parçaların doğrulayıcı alt kümeleri tarafından onaylanmasını içerecekti. Ancak katman-2 toplamalarıyla ölçeklendirmenin birincil ölçeklendirme tekniği olmasıyla beraber bu durum değişti. Bu, toplama kullanımlarının kullanıcılar için ucuz hale getirilmesi amaçlanarak daha ucuz bir veri biçiminin Ethereum bloklarına eklenmesiyle destekleniyor.

### Parçalama {#sharding}

Parçalama, veritabanını bölmek için kullanılan işlemdir. Böylelikle doğrulayıcı alt kümeleri, tüm Ethereum ağını takip etmektense belirli bazı parçaları takip etmekten sorumlu olurlar. Parçalama aslında uzun süredir Ethereum [yol haritasında](/roadmap/) yer alıyordu ve Birleşim'den önce hisse ispatına gönderilmesi amaçlanmıştı. Bununla birlikte, [katman 2 toplamalarının](#layer-2-scaling) hızlı gelişimi ve [Danksharding'in](/roadmap/danksharding)(doğrulayıcılar tarafından çok verimli bir şekilde doğrulanabilen Ethereum bloklarına toplama verisi damlacıkları ekleme) icat edilmesi, Ethereum topluluğunun parçalama yoluyla ölçeklendirme yerine toplama merkezli ölçeklendirmeyi tercih etmesine yol açtı. Bu aynı zamanda da Ethereum'un mutabakat mantığının sade kalmasına da yardımcı olacaktır.

## Zincir dışında ölçeklendirme {#off-chain-scaling}

Zincir dışı çözümler, katman 1 Ana Ağ'dan ayrı olarak uygulanır; mevcut Ethereum protokolünde herhangi bir değişiklik gerektirmezler. "Katman 2" çözümleri olarak bilinen bazı çözümler, güvenliklerini doğrudan [iyimser toplamalar](/developers/docs/scaling/optimistic-rollups/), [sıfır bilgi toplamaları](/developers/docs/scaling/zk-rollups/) veya [özel kanallar](/developers/docs/scaling/state-channels/) gibi katman 1 Ethereum mutabakatından alır. Diğer çözümler, [yan zincirler](#sidechains) [validium'lar](#validium) veya [plazma zincirleri](#plasma) gibi güvenliklerini Ana Ağ'dan ayrı olarak türeten çeşitli biçimlerde yeni zincirlerin oluşturulmasını içerir. Bu çözümler Ana Ağ ile iletişim kurar, ancak çeşitli hedeflere ulaşmak için güvenliklerini farklı şekilde elde eder.

### Katman 2 ölçeklendirme {#layer-2-scaling}

Bu zincir dışı çözümler kategorisi, güvenliğini Ana Ağ Ethereum'dan alır.

Katman 2, Ana Ağ'ın sağlam merkeziyetsiz güvenlik modelinden yararlanırken, işlemleri Ethereum Ana Ağı'ndan (katman 1) yöneterek uygulamanızı ölçeklendirmeye yardımcı olmak üzere tasarlanmış çözümler için kullanılan toplu bir terimdir. Ağ meşgulken işlem hızı düşer ve belirli türdeki merkeziyetsiz uygulamalar için kullanıcı deneyimi olumsuz etkilenir. Ağ yoğunluğu arttıkça işlem göndericiler birbirleriyle rekabete girerek gaz ücretlerinin artmasına neden olurlar. Bu, Ethereum'u kullanmayı çok pahalı hâle getirebilir.

Katman 2 çözümlerinin çoğu düğüm, doğrulayıcı, operatör, sıralayıcı veya blok üreticileri gibi bir sunucu veya sunucu kümesi etrafında toplanır. Uygulamaya bağlı olarak bu katman 2 düğümleri, onları kullanan kişiler, işletmeler veya kuruluşlar veya bir 3. taraf operatör veya büyük bir grup kişi tarafından (Ana Ağ'a benzer şekilde) çalıştırılabilir. Genel olarak konuşursak, işlemler doğrudan katman 1'e (Ana ağ) gönderilmek yerine bu katman 2 düğümlerine gönderilir. Bazı çözümlerde katman 2 örneği daha sonra bunları katman 1'e bağlamadan önce gruplara ayırır, ardından bunlar katman 1 tarafından sabitlenir ve değiştirilemez. Bunun nasıl yapıldığına ilişkin ayrıntılar, farklı katman 2 teknolojileri ve uygulamaları arasında önemli ölçüde farklılık gösterir.

Belirli bir katman 2 örneği açık olabilir ve birçok uygulama tarafından paylaşılabilir veya bir proje tarafından dağıtılabilir ve yalnızca uygulamalarını desteklemeye adanmış olabilir.

#### Katman 2 neden gerekli? {#why-is-layer-2-needed}

- Saniye başına artan işlem, kullanıcı deneyimini büyük ölçüde iyileştirir ve Mainnet Ethereum'daki ağ tıkanıklığını azaltır.
- İşlemler, Mainnet Ethereum'da tek bir işlemde toplanır ve Ethereum'u tüm dünyadaki insanlar için daha kapsayıcı ve erişilebilir hâle getiren kullanıcılar için gaz ücretlerini azaltır.
- Ölçeklendirme ile ilgili hiçbir gelişme güvenlik veya merkeziyetsizlikten taviz vermemelidir: Katman 2 çözümleri Ethereum'u olduğu hâliyle geliştirir.
- Ölçekli varlıklarla çalışırken kendi verimlilik setlerini kullanan uygulamaya özel katman 2 ağları bulunuyor.

[Katman 2 hakkında daha fazla bilgi](/layer-2/).

#### Toplamalar {#rollups}

Toplamalar, işlem yürütmesini katman 1 dışında gerçekleştirir ve ardından veriler, mutabakata varılan katman 1'e gönderilir. Bu, işlem verileri katman 1 bloklarına dahil edildiğinden toplamaların yerel Ethereum güvenliği ile güvence altına alınmasına olanak tanır.

Farklı güvenlik modellerine sahip iki tür toplama vardır:

- **İyimser toplamalar**: İşlemlerin varsayılan olarak geçerli olduğunu varsayar ve yalnızca bir meydan okuma ile karşılaşıldığında [**dolandırıcılık kanıtı**](/glossary/#fraud-proof) aracılığıyla hesaplama çalıştırır. [İyimser toplamalar üzerine daha fazla bilgi](/developers/docs/scaling/optimistic-rollups/).
- **Sıfır bilgi toplamaları**: Zincir dışı hesaplamalar çalıştırır ve zincire bir [**doğruluk ispatı**](/glossary/#validity-proof) gönderir. [Sıfır bilgi toplamaları üzerine daha fazla bilgi](/developers/docs/scaling/zk-rollups/).

#### Durum kanalları {#channels}

Özel kanallar, katılımcıların zincir dışında hızlı ve özgürce işlem yapmalarını sağlamak için çoklu imza sözleşmelerini kullanır ve ardından Ana ağ ile kesinliği belirler. Bu, ağ tıkanıklığını, ücretleri ve gecikmeleri en aza indirger. Mevcut kanal türleri, özel kanallar ve ödeme kanalları olarak iki türdedir.

[Özel kanallar](/developers/docs/scaling/state-channels/) hakkında daha fazla bilgi.

### Yan zincirler {#sidechains}

Bir yan zincir, Ana Ağ'a paralel olarak çalışan bağımsız bir Ethereum Sanal Makinesi uyumlu blokzinciridir. Bunlar, iki yönlü köprüler aracılığıyla Ethereum ile uyumludur ve kendi seçtikleri mutabakat kuralları ve blok parametreleri altında çalışırlar.

[Yan zincirler](/developers/docs/scaling/sidechains/) hakkında daha fazla bilgi.

### Plazma {#plasma}

Plazma zinciri, ana Ethereum zincirine bağlı olan ve uyuşmazlıkları çözüme kavuşturmak için sahtecilik kanıtlarını ([iyimser toplamalar](/developers/docs/scaling/optimistic-rollups/) gibi) kullanan ayrı bir blokzincirdir.

[Plazma](/developers/docs/scaling/plasma/) hakkında daha fazla bilgi.

### Validium {#validium}

Bir Validium zinciri, sıfır bilgi toplamaları gibi doğruluk ispatlarını kullanır, ancak veriler ana katman 1 Ethereum zincirinde depolanmaz. Bu, her bir Validium zinciri başına saniyede 10 bin işlem yapılabilmesine ve birden çok zincirin paralel olarak çalışabilmesine olanak sağlar.

[Validium](/developers/docs/scaling/validium/) hakkında daha fazla bilgi.

## Neden bu kadar çok ölçeklendirme çözümüne ihtiyaç var? {#why-do-we-need-these}

- Birden çok çözüm, ağın herhangi bir bölümündeki genel tıkanıklığı azaltmaya yardımcı olabilir ve ayrıca tek hata noktalarını da önler.
- Bütün, parçalarının toplamından daha büyüktür. Farklı çözümler var olabilir ve uyum içinde çalışabilir, bu da gelecekteki işlem hızı ve verimi üzerinde üstel bir etkiye izin verir.
- Tüm çözümler, Ethereum mutabakat algoritmasının doğrudan kullanılmasını gerektirmez ve alternatifler, aksi takdirde elde edilmesi zor olacak faydalar sunabilir.
- [Ethereum vizyonunu](/roadmap/vision/) gerçekleştirmek için tek bir ölçeklendirme çözümü yeterli değildir.

## Görsel olarak öğrenmeyi mi tercih ediyorsunuz? {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_Videodaki açıklamanın "Katman 2" terimini tüm zincir dışı ölçeklendirme çözümlerini ifade etmek için kullandığına dikkat edin: Biz "Katman 2"yi, güvenliğini katman 1 Ana ağ mutabakatından alan zincir dışı bir çözüm olarak ayırıyoruz._

<YouTube id="7pWxCklcNsU" />

## Daha fazla bilgi {#further-reading}

- [Toplama merkezli bir Ethereum yol haritası](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Ethereum için Katman 2 ölçeklendirme çözümlerinde güncel analitikler](https://www.l2beat.com/)
- [Ethereum katman 2 Ölçeklendirme Çözümlerini Değerlendirme: Bir Karşılaştırma Çerçevesi](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Toplamalar için Tamamlanmamış Bir Kılavuz](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [Ethereum destekli ZK-Toplamaları: Dünya Liderleri](https://hackmd.io/@canti/rkUT0BD8K)
- [İyimser Toplamalar ile ZK Toplamalarının Karşılaştırması](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Sıfır Bilgi Blok Zinciri Ölçeklendirilebilirliği](https://ethworks.io/assets/download/zero-knowledge-blockchain-scaling-ethworks.pdf)
- [Toplamalar + veri parçalarının, yüksek ölçeklenebilirlik için tek sürdürülebilir çözüm olma nedeni](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [Hangi tür Katman 3'ler kulağa mantıklı geliyor?](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [Veri Kullanılabilirliği veya: Toplamalar Endişelenmeyi Bırakıp Ethereum'u Sevmeyi Nasıl Öğrendi?](https://ethereum2077.substack.com/p/data-availability-in-ethereum-rollups)

_Size yardımcı olan bir topluluk kaynağı biliyor musunuz? Bu sayfayı düzenleyin ve ekleyin!_
