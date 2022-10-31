---
title: Ölçeklendirme
description: Ethereum topluluğu tarafından geliştirilmekte olan farklı ölçekleme seçeneklerine giriş.
lang: tr
sidebarDepth: 3
---

## Ölçeklendirmeye genel bakış {#scaling-overview}

Ethereum kullanan kişi sayısı arttıkça blok zinciri belirli kapasite sınırlamalarına ulaştı. Bu durum, ağı kullanma maliyetini artırarak "ölçeklendirme çözümlerine" yönelik bir ihtiyaç doğurdu. Benzer hedeflere ulaşmak için farklı yaklaşımlar benimseyen, araştırılan, test edilen ve uygulanan çok sayıda çözüm vardır.

Ölçeklenebilirliğin ana hedefi, merkeziyetsizlikten veya güvenlikten ödün vermeden işlem hızını (daha hızlı kesinlik) ve işlem verimini (saniye başına yüksek işlem) artırmaktır ([Ethereum'un vizyonu](/upgrades/vision/) hakkında daha fazla bilgi). Katman 1 Ethereum blok zincirinde yüksek talep, daha yavaş işlemlere ve elverişsiz [gaz fiyatlarına](/developers/docs/gas/) yol açar. Ethereum'un anlamlı ve toplu olarak benimsenmesi için ağ kapasitesini hız ve verim açısından artırmak çok önemlidir.

Hız ve verim önemli olsa da, bu hedefleri mümkün kılan ölçeklendirme çözümlerinin merkeziyetsiz ve güvenli kalması çok önemlidir. Düğüm operatörleri için giriş engelini düşük tutmak, merkezi ve güvenli olmayan bilgi işlem gücüne doğru ilerlemeyi önlemede kritik önem arz eder.

Kavramsal olarak, ölçeklendirmeyi ilk olarak zincir üstünde veya zincir dışında ölçeklendirme olarak sınıflandırıyoruz.

## Ön Koşullar {#prerequisites}

Tüm temel konuları kapsamlı olarak anlamanız gerekmektedir. Bu teknoloji henüz pek kullanılmadığı için ve araştırılmaya ve geliştirilmeye devam edildiğinden, ölçeklendirme çözümlerinin uygulanması ileri seviye bilgi gerektirir.

## Zincir üstünde ölçeklendirme {#on-chain-scaling}

Bu ölçeklendirme yöntemi, Ethereum protokolünde değişiklik yapılmasını gerektirir (katman 1 [Mainnet](/glossary/#mainnet)). Parçalama, şu anda bu ölçeklendirme yönteminin ana odak noktasıdır.

### Parçalama {#sharding}

Parçalama, yükü yaymak için bir veri tabanını yatay olarak bölme işlemidir. Ethereum bağlamında parçalama, "parça" olarak bilinen yeni zincirler oluşturarak ağ tıkanıklığını azaltır ve saniye başına işlem kapasitesini artırır. Bu, aynı zamanda doğrulayıcıların ağdaki işlemlerin tamamını işleme zorunluluğunu ortadan kaldırarak tüm doğrulayıcıların yükünü azaltır.

[Parçalama](/upgrades/sharding/) hakkında daha fazla bilgi.

## Zincir dışında ölçeklendirme {#off-chain-scaling}

Zincir dışı çözümler, katman 1 Mainnet'ten ayrı olarak uygulanır: Mevcut Ethereum protokolünde herhangi bir değişiklik gerektirmezler. "Katman 2" çözümleri olarak bilinen bazı çözümler, güvenliklerini doğrudan [iyimser toplamalar](/developers/docs/scaling/optimistic-rollups/), [sıfır bilgi toplamaları](/developers/docs/scaling/zk-rollups/) veya [durum kanalları](/developers/docs/scaling/state-channels/) gibi katman 1 Ethereum mutabakatından alır. Diğer çözümler, [yan zincirler](#sidechains) veya [plazma zincirleri](#plasma) gibi, güvenliklerini Mainnet'ten ayrı olarak türeten çeşitli biçimlerde yeni zincirlerin oluşturulmasını içerir. Bu çözümler Mainnet ile iletişim kurar, ancak çeşitli hedeflere ulaşmak için güvenliklerini farklı şekilde elde eder.

### Katman 2 ölçeklendirme {#layer-2-scaling}

Bu zincir dışı çözümler kategorisi, güvenliğini Mainnet Ethereum'dan alır.

Katman 2, Mainnet'in sağlam merkeziyetsiz güvenlik modelinden yararlanırken, Ethereum Mainnet'ten (katman 1) işlemleri yöneterek uygulamanızı ölçeklendirmeye yardımcı olmak için tasarlanmış çözümler için kullanılan toplu bir terimdir. Ağ meşgulken işlem hızı düşer ve belirli türdeki dapp'ler için kullanıcı deneyimi olumsuz etkilenir. Ve ağ yoğunluğu arttıkça işlem yapmak isteyenler birbirlerinden daha fazla işlem ücreti sunarak işlem ücretlerinin artmasına neden olurlar. Bu, Ethereum'u kullanmayı çok pahalı hâle getirebilir.

Katman 2 çözümlerinin çoğu düğüm, doğrulayıcı, operatör, sıralayıcı veya blok üreticileri gibi sunucu veya sunucu kümeleri etrafında toplanır. Uygulamaya bağlı olarak, bu katman 2 düğümleri, onları kullanan kişiler, işletmeler veya kuruluşlar veya bir 3. taraf operatör veya büyük bir grup kişi tarafından (Mainnet'e benzer şekilde) çalıştırılabilir. Genel olarak konuşursak, işlemler doğrudan katman 1'e (Mainnet) gönderilmek yerine bu katman 2 düğümlerine gönderilir. Bazı çözümlerde, katman 2 örneği daha sonra bu işlemleri katman 1'e bağlamadan önce gruplara ayırır, ardından bu işlemler katman 1 tarafından sabitlenir ve değiştirilemez. Bu sürece ilişkin ayrıntılar, farklı katman 2 teknolojileri ve uygulamaları arasında önemli ölçüde farklılık gösterir.

Belirli bir katman 2 örneği açık olabilir ve birçok uygulama tarafından paylaşılabilir veya bir proje tarafından kullanılarak yalnızca uygulamalarını desteklemeye adanmış olabilir.

#### Katman 2 çözümleri neden gerekli? {#why-is-layer-2-needed}

- Saniye başına artan işlem, kullanıcı deneyimini büyük ölçüde iyileştirir ve Mainnet Ethereum'daki ağ tıkanıklığını azaltır.
- İşlemler, Mainnet Ethereum'da tek bir işlemde toplanır ve Ethereum'u tüm dünyadaki insanlar için daha kapsayıcı ve erişilebilir hâle getiren kullanıcılar için gaz ücretlerini azaltır.
- Ölçeklendirme ile ilgili hiçbir gelişme güvenlik veya merkeziyetsizlikten taviz vermemelidir: Katman 2 çözümleri Ethereum'u olduğu hâliyle geliştirir.
- Ölçekli varlıklarla çalışırken kendi verimlilik setlerini kullanan uygulamaya özel katman 2 ağları bulunuyor.

#### Toplamalar {#rollups}

Toplamalar, işlem yürütmesini katman 1 dışında gerçekleştirir ve ardından veriler, mutabakata varılan katman 1'e gönderilir. İşlem verileri katman 1 bloklarına dahil edildiğinden bu, toplamaların yerel Ethereum güvenliği ile güvence altına alınmasına izin verir.

Farklı güvenlik modellerine sahip iki tür toplama vardır:

- **İyimser toplamalar**: İşlemlerin varsayılan olarak geçerli olduğunu varsayar ve yalnızca bir meydan okuma ile karşılaşıldığında [**dolandırıcılık kanıtı**](/glossary/#fraud-proof) aracılığıyla hesaplama çalıştırır. [İyimser toplamalar üzerine daha fazla bilgi](/developers/docs/scaling/optimistic-rollups/).
- **Sıfır bilgi toplamaları**: Zincir dışı hesaplamalar çalıştırır ve zincire bir [**doğruluk ispatı**](/glossary/#validity-proof) gönderir. [Sıfır bilgi toplamaları üzerine daha fazla bilgi](/developers/docs/scaling/zk-rollups/).

#### Durum kanalları {#channels}

Durum kanalları, katılımcıların zincir dışında hızlı ve özgürce işlem yapmalarını sağlamak için çoklu imza sözleşmelerini kullanır ve ardından Mainnet ile kesinliği kararlaştırır. Bu, ağ tıkanıklığını, ücretleri ve gecikmeleri en aza indirger. Şu andaki durum kanalları ve ödeme kanalları olarak iki tür kanal bulunur.

[Durum kanalları](/developers/docs/scaling/state-channels/) hakkında daha fazla bilgi.

### Yan zincirler {#sidechains}

Bir yan zincir, Mainnet'e paralel olarak çalışan bağımsız bir Ethereum Sanal Makinesi uyumlu blok zinciridir. Bunlar, iki yönlü köprüler aracılığıyla Ethereum ile uyumludur ve kendi seçtikleri mutabakat kuralları ve blok parametreleri altında çalışırlar.

[Yan zincirler](/developers/docs/scaling/sidechains/) hakkında daha fazla bilgi.

### Plazma {#plasma}

Plazma zinciri, ana Ethereum zincirine bağlı olan ve anlaşmazlıkları tahkim etmek için dolandırıcılık kanıtlarını ([iyimser toplamalar](/developers/docs/scaling/optimistic-rollups/) gibi) kullanan ayrı bir blok zinciridir.

[Plazma](/developers/docs/scaling/plasma/) hakkında daha fazla bilgi.

### Validium {#validium}

Bir Validium zinciri, sıfır bilgi toplamaları gibi doğruluk ispatlarını kullanır, ancak veriler ana katman 1 Ethereum zincirinde depolanmaz. Bu, her bir Validium zinciri başına saniyede 10 bin işlem yapılabilmesini ve birden çok zincirle birlikte paralel olarak çalışabilmesine olanak sağlar.

[Validium](/developers/docs/scaling/validium/) hakkında daha fazla bilgi.

## Neden bu kadar çok ölçeklendirme çözümüne ihtiyaç var? {#why-do-we-need-these}

- Birden çok çözüm, ağın herhangi bir bölümündeki genel tıkanıklığı azaltmaya yardımcı olabilir ve ayrıca tek hata noktalarını da önler.
- Bütün, parçalarının toplamından daha büyüktür. Farklı çözümler var olabilir ve uyum içinde çalışabilir, bu da gelecekteki işlem hızı ve verimi üzerinde üstel bir etkiye izin verir.
- Tüm çözümler, Ethereum mutabakat algoritmasının doğrudan kullanılmasını gerektirmez ve alternatifler, aksi takdirde elde edilmesi zor olacak faydalar sunabilir.
- [Ethereum vizyonunu](/upgrades/vision/) gerçekleştirmek için tek bir ölçeklendirme çözümü yeterli değildir.

## Görsel olarak öğrenmeyi mi tercih ediyorsunuz? {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_Videodaki açıklamanın "Katman 2" terimini tüm zincir dışı ölçeklendirme çözümlerini ifade etmek için kullandığına dikkat edin: Biz "Katman 2"yi, güvenliğini katman 1 Mainnet mutabakatından alan zincir dışı bir çözüm olarak ayırıyoruz._

<YouTube id="7pWxCklcNsU" />

## Daha fazla okuma {#further-reading}

- [A rollup-centric Ethereum roadmap](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Ethereum için Katman 2 ölçeklendirme çözümlerinde güncel analitikler](https://www.l2beat.com/)
- [Ethereum katman 2 Ölçeklendirme Çözümlerini Değerlendirme: Bir Karşılaştırma Çerçevesi](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Toplamalar için Tamamlanmamış Bir Kılavuz](https://vitalik.ca/general/2021/01/05/rollup.html)
- [Ethereum destekli ZK-Toplamaları: Dünya Liderleri](https://hackmd.io/@canti/rkUT0BD8K)
- [İyimser Toplamalar ile ZK Toplamalarının Karşılaştırması](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Sıfır Bilgi Blok Zinciri Ölçeklendirilebilirliği](https://ethworks.io/assets/download/zero-knowledge-blockchain-scaling-ethworks.pdf)
- [Toplamalar + veri parçalarının, yüksek ölçeklenebilirlik için tek sürdürülebilir çözüm olma nedeni](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_
