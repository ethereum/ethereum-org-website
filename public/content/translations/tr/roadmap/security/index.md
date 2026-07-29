---
title: Daha güvenli bir Ethereum
description: Ethereum'un yol haritası, protokolü kuantum çağına ve onlarca yıllık güvenilir operasyona hazırlarken bugün blok üretimini ve sansür direncini güçlendiriyor.
lang: tr
image: /images/roadmap/roadmap-security.png
alt: "Ethereum yol haritası"
template: roadmap
summaryPoints:
  - Protokole dahil edilmiş teklifçi-oluşturucu ayrımı ve dahil etme listeleri gibi yakın vadeli güçlendirme güncellemeleri aktif olarak geliştirilmektedir
  - Kuantum sonrası hazırlıklar, herhangi bir inandırıcı kuantum tehdidinden yıllar önce devam etmektedir
  - Protokolün basitleştirilmesi karmaşıklığı ortadan kaldırır ve Ethereum'un saldırı yüzeyini daraltır
---

Ethereum halihazırda oldukça güvenli, merkeziyetsiz bir [akıllı sözleşme](/glossary/#smart-contract) platformudur. Yol haritası, **ağı bugün güçlendirirken ancak yıllar sonra ortaya çıkabilecek tehditlere karşı hazırlayarak** onu onlarca yıl boyunca bu şekilde tutmayı amaçlamaktadır. Yakın vadeli güncellemeler [forkcast.org](https://forkcast.org) adresinden takip edilebilir ve daha uzun vadeli taslak yol haritası [strawmap.org](https://strawmap.org) adresinde yayınlanmaktadır.

<ExpandableCard title="Ethereum bugün güvenli mi?" eventCategory="/roadmap/security" eventName="clicked is ethereum secure today?">

Evet. Ethereum 2015'ten bu yana kesintisiz olarak çalışmaktadır. Bu sayfadaki iyileştirmeler, halihazırda güvenli olan bir ağı saldırması, sansürlemesi veya bozması daha zor hale getirmektedir.

</ExpandableCard>

## Güven gerektirmeyen blok oluşturma {#trustless-block-building}

Bugün çoğu Ethereum bloğu bir işbölümü yoluyla bir araya getirilmektedir: uzmanlaşmış oluşturucular yapabilecekleri en değerli bloğu inşa eder ve sırası gelen [doğrulayıcı](/glossary/#validator) en iyi teklifi sunar. Bu, profesyonel blok oluşturmanın [stake](/glossary/#staking)'i en büyük operatörler arasında yoğunlaştırmasını engeller, ancak 2022'den bu yana ağın doğrulayamadığı protokol dışı yazılımlara dayanmaktadır.

**Protokole dahil edilmiş teklifçi-oluşturucu ayrımı (ePBS veya EIP-7732)**, bu ayrımı protokole taşıyarak şu anda blokları oluşturucular ve doğrulayıcılar arasında aktaran üçüncü taraf aracılar olan aktarıcılara (relays) güvenme ihtiyacını ortadan kaldırır. ePBS, 2026 için hedeflenen yaklaşan [Glamsterdam](/roadmap/glamsterdam/) güncellemesinin öne çıkan özelliklerinden biridir. Henüz bir Ana Ağ tarihi belirlenmemiştir; istemci ekipleri bunu devnet'lerde (geçici test ağları) test etmektedir.

<ButtonLink variant="outline" href="/roadmap/pbs/">Teklifçi-oluşturucu ayrımı hakkında daha fazla bilgi</ButtonLink>

## Sansür direnci {#censorship-resistance}

Sansüre dirençli bir ağ, hiç kimsenin geçerli bir işlemin zincire ulaşmasını engelleyemeyeceği anlamına gelir. **Çatallanma seçimi ile zorunlu kılınan dahil etme listeleri (FOCIL veya EIP-7805)**, birçok doğrulayıcıya bir bloğun neleri içermesi gerektiği konusunda söz hakkı verir: blok oluşturucunun dahil etmesi gereken bekleyen işlemlerin listelerini yayınlarlar. Hiçbir aktör tek başına işleminizi sessizce dışarıda bırakamaz.

FOCIL, Glamsterdam'ı takip eden ve 2027 için hedeflenen Hegotá güncellemesinin mutabakat katmanındaki öne çıkan özelliğidir. ePBS ve FOCIL'in asla test edilmemiş tek bir kombinasyon olarak sunulmaması için kasıtlı olarak Glamsterdam'dan sonraya planlanmıştır. Bekleyen işlemlerin içeriklerini bir bloğa güvenli bir şekilde dahil edilene kadar gizleyecek olan şifrelenmiş mempool'lar (işlem havuzları) üzerine araştırmalar devam etmektedir.

## Daha hızlı kesinlik {#faster-finality}

Kullanıcılar için [kesinlik](/glossary/#finality), bir işlemin kalıcı hale geldiği ve onu geri almanın bir saldırgana muazzam miktarda stake edilmiş ETH'ye mal olacağı andır. Bugün kesinlik yaklaşık 15 dakika sürmektedir ve **araştırmacılar bunu önemli ölçüde kısaltmak istemektedir**. Çalışmalar tek slot kesinliği olarak başladı, üç slot kesinliğine evrildi ve şimdi Temmuz 2025'te tanıtılan Lean Ethereum programında tek turlu bir mutabakat protokolü olan Minimmit olarak devam etmektedir. Saniyeler içinde kesinlik, taslak yol haritasında kabaca 2029'u hedefleyen uzun vadeli bir kutup yıldızıdır. Bu aktif bir araştırma olmaya devam etmektedir ve henüz hiçbir kesinlik güncellemesi bir çatallanmaya atanmamıştır.

<ButtonLink variant="outline" href="/roadmap/single-slot-finality/">Daha hızlı kesinlik araştırmaları hakkında daha fazla bilgi</ButtonLink>

## Dirençli doğrulayıcılar {#resilient-validators}

Bir doğrulayıcı genellikle bir imzalama anahtarı tutan tek bir makinedir. **Dağıtık doğrulayıcı teknolojisi (DVT)**, bu tek makineyi anahtarı paylaşan ve birlikte imzalayan bir makineler komitesi ile değiştirir, böylece bir bilgisayarın arızalanması veya bir anahtarın çalınması doğrulayıcıyı çökertmez. DVT üretimde aktiftir ve staking operatörleri tarafından geniş ölçekte kullanılmaktadır. Ocak 2026'da Vitalik Buterin, DVT-lite adında basitleştirilmiş bir protokol düzeyinde varyant önerdi; bu, planlanmış bir çatallanması olmayan erken aşama bir tekliftir.

Ağ ayrıca [istemci çeşitliliği](/developers/docs/nodes-and-clients/client-diversity/) yoluyla da kendini korur: Ethereum bağımsız olarak oluşturulmuş birkaç yazılım uygulaması üzerinde çalışır, bu nedenle bir istemcideki bir hata ağın geri kalanını ayakta bırakır.

Daha önceki iki araştırma fikri olan görünüm birleştirme (view-merge) ve gizli lider seçimi, artık aktif yol haritası öğeleri değildir.

<ButtonLink variant="outline" href="/staking/dvt/">Dağıtık doğrulayıcı teknolojisi hakkında daha fazla bilgi</ButtonLink>

## Kuantum direnci {#quantum-resistance}

Ethereum, ağı güvende tutmak ve kullanıcı fonlarını korumak için [kriptografi](/glossary/#cryptography) kullanır. Sonunda, bu kriptografik yöntemlerden bazıları, belirli matematiksel problemleri klasik makinelerden katlanarak daha hızlı çözebilen **kuantum bilgisayarlara karşı savunmasız** hale gelecektir.

**Bugün hiçbir kuantum bilgisayar Ethereum'un kriptografisini kıramaz.** Gerekli donanım henüz yeterli ölçekte mevcut değildir. Ancak son araştırmalar, aradaki farkın daha önce beklenenden daha hızlı kapandığını göstermektedir. Mart 2026'da Google Quantum AI, 256 bitlik eliptik eğri kriptografisini (Ethereum'un hesap imzaları için kullandığı tür) kırmanın, önceki tahminlerden yaklaşık 20 kat daha az olan kabaca 1.200 mantıksal kübit gerektirebileceğini tahmin eden bir makale yayınladı.

Kriptografik geçişleri güvenli bir şekilde planlamak ve yürütmek yıllar alır, bu nedenle hazırlıklar donanım var olmadan çok önce, şimdi yapılmaktadır. Kuantum sonrası güncellemeler gerektirdiği belirlenen dört alan şunlardır: doğrulayıcı mutabakat imzaları (BLS), veri kullanılabilirliği için kullanılan taahhüt şemaları (KZG), hesap imzaları (ECDSA) ve [toplamalar](/glossary/#rollups) tarafından kullanılan sıfır bilgi ispatı (ZK-proof) sistemleri.

Ethereum Vakfı, Ocak 2026'da özel bir **Kuantum Sonrası Güvenlik ekibi** kurdu ve çalışmaları [pq.ethereum.org](https://pq.ethereum.org) adresinden herkese açık olarak takip edilmektedir. Aktif çalışmalar arasında, daha büyük kuantum güvenli imzaları verimli bir şekilde bir araya getiren minimal bir zkVM (leanVM) ile eşleştirilmiş hash tabanlı doğrulayıcı imzaları (leanXMSS) ve 10'dan fazla istemci ekibiyle haftalık birlikte çalışabilirlik devnet'leri yer almaktadır.

Geçiş stratejisinin önemli bir parçası, yerel [hesap soyutlama](/roadmap/account-abstraction/) getiren **EIP-8141**'dir. Bu, bireysel hesapların kendi imza doğrulamalarını seçmelerine olanak tanır, yani kullanıcılar protokol çapında tek bir geçişi beklemeden kuantum güvenli imzalara geçebilirler. EIP-8141, Hegotá güncellemesi için değerlendirilmektedir. Temel kuantum sonrası altyapı kilometre taşlarının yaklaşık 2029 yılına kadar tamamlanması hedeflenmektedir. Bunlar planlama hedefleridir ve değişebilir.

<ExpandableCard title="Kuantum bilgisayarlar bugün ETH'mi çalabilir mi?" eventCategory="/roadmap/security" eventName="clicked can quantum computers steal my ETH today?">

Hayır. Bugün hiçbir kuantum bilgisayar Ethereum'un kriptografisini kıramaz. Bu sayfada açıklanan çalışmalar, henüz yıllar uzakta olan bir tehdit için erken hazırlıklardır. Kuantum sonrası cüzdanlar kullanıma sunulduğunda, cüzdan yazılımı geçiş sürecinde size rehberlik edecektir. Şimdilik yapmanız gereken hiçbir şey yok.

</ExpandableCard>

<ButtonLink variant="outline" href="/roadmap/security/quantum-resistance/">Kuantum direnci hakkında daha fazla bilgi</ButtonLink>

## Daha basit ve daha verimli protokol {#simpler-and-more-efficient-protocol}

Karmaşıklık, hatalar ve güvenlik açıkları için fırsatlar yaratır. Yol haritasının bir kısmı, protokolün bakımını, denetimini ve üzerinde akıl yürütmeyi kolaylaştırmak için **Ethereum'u basitleştirmeye ve teknik borcu ortadan kaldırmaya** odaklanmaktadır. Daha basit bir protokol aynı zamanda saldırganlara inceleyebilecekleri daha az yüzey alanı sunar.

Şimdiye kadar sunulanlar:

- **[Pectra (Mayıs 2025)](/roadmap/pectra/)**: Dışarıdan sahipli hesapların geçici olarak akıllı sözleşme koduna yetki devretmesine olanak tanıyan ve tam hesap soyutlamaya doğru bir atlama taşı olan EIP-7702'yi tanıttı.
- **[Fusaka (Aralık 2025)](/roadmap/fusaka/)**: Veri kullanılabilirliği iş yükünü ağ genelinde dağıtan PeerDAS'ı (EIP-7594) devreye aldı. Ayrıca blob parametrelerini artırarak toplamalar için veri işlem kapasitesini genişletti.
- **[Dencun (Mart 2024)](/roadmap/dencun/)**: Daha ucuz Rollup verileri için blob işlemlerini (EIP-4844) tanıttı ve uzun süredir devam eden bir karmaşıklık kaynağını ortadan kaldırmak için `SELFDESTRUCT`'yi (EIP-6780) kısıtladı.
- **[Şapella (Nisan 2023)](/staking/withdrawals/)**: Doğrulayıcıların stake edilmiş ETH'leri çekmesine (EIP-4895) olanak tanıyarak [hisse kanıtı (PoS)](/glossary/#pos) staking'inin erken dönem kısıtlamalarından birini ortadan kaldırdı.
- **London (Ağustos 2021)**: EIP-1559 ile gaz fiyatlandırmasını elden geçirdi, daha öngörülebilir işlem maliyetleri için bir taban ücret ve yakım mekanizması getirdi.

Devam edenler:

- **Glamsterdam (2026 için hedefleniyor)**: Öne çıkan özellikler ePBS (EIP-7732) ve blok düzeyinde erişim listeleridir (EIP-7928), ayrıca gazın yeniden fiyatlandırılması da değerlendirilmektedir.
- **Hegotá (2027 için hedefleniyor)**: FOCIL (EIP-7805), mutabakat katmanında öne çıkan özelliktir. Dahil edilmesi düşünülenler: EIP-8141 (yerel hesap soyutlama).
- **Devam eden**: [EVM](/developers/docs/evm/)'yi basitleştirme, istemci uygulamalarını uyumlu hale getirme ve kullanımdan kaldırılan özellikleri aşamalı olarak sonlandırma çabaları istemci ekipleri genelinde devam etmektedir. Durumsuzluk (katılımcıların zinciri tüm verilerini depolamadan doğrulayabilmesi) üzerindeki çalışmalar, kuantum güvenli ikili hash ağaçları etrafında yeniden tasarlanmaktadır ve nihai yaklaşım henüz onaylanmamıştır.

## Mevcut ilerleme {#current-progress}

2026 ortası itibarıyla:

- **Blok oluşturma ve sansür direnci**: ePBS ve blok düzeyinde erişim listeleri Glamsterdam devnet'lerinde çalışmaktadır. FOCIL, 2027 için hedeflenen Hegotá için planlanmaktadır.
- **Kesinlik**: Minimmit ve daha geniş kapsamlı Lean Ethereum mutabakat çalışmaları, henüz bir çatallanma ataması olmaksızın aktif araştırmada kalmaya devam etmektedir.
- **Kuantum direnci**: Haftalık kuantum sonrası birlikte çalışabilirlik devnet'leri çalışmaktadır ve temel altyapı kilometre taşları yaklaşık 2029'u hedeflemektedir.
- **Basitleştirme**: Pectra ve Fusaka yayınlandı; Glamsterdam ve Hegotá bir sonraki temizlik turunu taşıyor.

Bu çalışmaların hiçbir kısmı tamamlanmamıştır ve tüm zaman çizelgeleri değişebilecek tahminlerdir.

## Daha fazla okuma {#further-reading}

- [Forkcast: Ethereum ağ güncelleme takipçisi](https://forkcast.org)
- [Strawmap: taslak bir Ethereum L1 yol haritası](https://strawmap.org) - _EF Architecture_
- [Kuantum Sonrası Ethereum](https://pq.ethereum.org) - _Ethereum Vakfı_
- [Lean Ethereum yol haritası takipçisi](https://leanroadmap.org) - _ReamLabs_
- [Hisse kanıtı ve kesinlik](/developers/docs/consensus-mechanisms/pos/#finality)
- [EVM](/developers/docs/evm/)