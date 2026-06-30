---
title: "Ethereum'u geleceğe hazırlamak ve kripto kuantum güvenliği"
description: "Bu güncellemeler, gelecekte ne olursa olsun Ethereum'u dayanıklı, merkeziyetsiz bir temel katman olarak sağlamlaştırır."
lang: tr
image: /images/roadmap/roadmap-future.png
alt: "Ethereum yol haritası"
template: roadmap
summaryPoints:
  - Kuantum sonrası kriptografi, kuantum bilişim ilerledikçe Ethereum'un gelişmiş donanım tehditlerine karşı hayatta kalabilmesini sağlar
  - Protokol sadeleştirmesi, Ethereum'un bakımını, denetimini ve güvenliğini kolaylaştırır
  - Son güncellemeler halihazırda anlamlı verimlilik iyileştirmeleri sağladı
---

Yol haritasının bazı kısımları şu anda Ethereum'u ölçeklendirmek veya güvenliğini sağlamakla ilgili değildir. Bunlar Ethereum'u **gelecekte de istikrarlı ve güvenilir** kılmakla ilgilidir. Bu, yeni tür tehditlere hazırlanmak ve protokolden gereksiz karmaşıklığı kaldırmak anlamına gelir.

## Kuantum direnci {#quantum-resistance}

Ethereum, ağı güvende tutmak ve kullanıcı fonlarını korumak için [kriptografi](/glossary/#cryptography) kullanır. Sonunda, bu kriptografik yöntemlerden bazıları, belirli matematiksel problemleri klasik makinelerden katlanarak daha hızlı çözebilen **kuantum bilgisayarlara karşı savunmasız** hale gelecektir.

**Bugün hiçbir kuantum bilgisayar Ethereum'un kriptografisini kıramaz.** Gerekli donanım henüz geniş ölçekte mevcut değildir. Ancak son araştırmalar, aradaki farkın beklenenden daha hızlı kapandığını gösteriyor. Mart 2026'da Google Quantum AI, 256 bit eliptik eğri kriptografisini (Ethereum'un hesap imzaları için kullandığı tür) kırmanın, önceki tahminlerden yaklaşık 20 kat daha az olan kabaca 1.200 mantıksal kübit gerektirebileceğini tahmin eden bir makale yayınladı. Google, kendi sistemlerini kuantum güvenli kriptografiye geçirmek için 2029'u dahili bir son tarih olarak belirledi.

Kriptografik geçişleri güvenli bir şekilde planlamak ve yürütmek yıllar alır. Ethereum'un güvenlik modeli onlarca yıl sürecek şekilde tasarlandığından, kuantum sonrası hazırlık, ana akım manşetlere çıkmadan önce Ethereum'un yol haritasındaydı. Ağ hazırlığı, acil bir duruma tepki olarak değil, sorunsuz bir geçiş sağlamak için şu anda yapılıyor.

### Risk altında olan nedir? {#what-is-at-risk}

Ethereum kriptografisinin kuantum sonrası güncellemeler gerektiren dört temel alanı belirlenmiştir:

1. **Mutabakat imzaları (BLS)**: [Doğrulayıcılar](/glossary/#validator), geçerli [bloklara](/glossary/#block) oy vermek için BLS imzalarını kullanır. Bir kuantum bilgisayar bu imzaları taklit edebilir.
2. **Veri kullanılabilirliği (KZG taahhütleri)**: Ethereum'un ölçeklenmesine yardımcı olan [taahhüt şemaları](/roadmap/danksharding/#what-is-kzg), kuantum saldırılarına karşı savunmasız olan matematiğe (özellikle eliptik eğri eşleştirmesine) dayanır.
3. **Hesap imzaları (ECDSA)**: Bireysel Ethereum hesaplarını koruyan imza şeması. Bir hesap bir işlem gönderdiğinde, açık anahtarı zincir içi olarak açığa çıkar. Bir kuantum bilgisayar, bu açığa çıkan açık anahtardan özel anahtarı türetebilir ve potansiyel olarak fonların çalınmasına izin verebilir.
4. **Uygulama katmanı ZK-ispatları**: Toplamalar ve diğer uygulamalar tarafından kullanılan sıfır bilgi ispatı sistemleri, kuantum bilgisayarların zayıflatabileceği kriptografik varsayımlara dayanır.

<ExpandableCard title="Kuantum bilgisayarlar bugün ETH'mi çalabilir mi?" eventCategory="/roadmap/future-proofing" eventName="clicked can quantum computers steal my ETH today?">

Hayır. Bugün hiçbir kuantum bilgisayar Ethereum'un kriptografisini kıramaz. Bu sayfada açıklanan çalışmalar aktif bir tehdide yanıt değil, geleceğe yönelik bir hazırlıktır. Kuantum sonrası cüzdanlar kullanıma sunulduğunda, cüzdan yazılımı geçiş sürecinde size rehberlik edecektir. Şimdilik yapmanız gereken hiçbir şey yok.

</ExpandableCard>

Ethereum, şu anda Blokzincir ekosisteminde kuantum tehditlerine karşı en proaktif savunucudur. Ethereum Vakfı, Ocak 2026'da özel bir **Kuantum Sonrası Güvenlik ekibi** kurdu ve aktif çalışmalar birden fazla istemci ekibi ile araştırma grubuna yayılmış durumdadır. EF Kuantum Sonrası ekibinin çalışmaları [pq.ethereum.org](https://pq.ethereum.org) adresinden herkese açık olarak takip edilmektedir.

Aktif çalışmalar şunları içerir:

- **Hash tabanlı imzalar (leanXMSS)**: Kuantum bilgisayarların verimli bir şekilde kıramayacağı hash fonksiyonları üzerine inşa edilmiş, doğrulayıcı imzaları için kuantum güvenli bir alternatif.
- **Minimal zkVM (leanVM)**: Kuantum güvenli imzalar şu anda kullanılan imzalardan daha büyük olduğu için leanXMSS, minimal bir zkVM (leanVM) ile eşleştirilir. Bu motor, kuantum güvenli imzaları verimli bir şekilde bir araya getirerek verileri 250 kat sıkıştırır, böylece ağ geçişten sonra da hızlı kalır.
- **Haftalık birlikte çalışabilirlik testleri**: 10'dan fazla istemci ekibi düzenli kuantum sonrası geliştirici ağlarına (devnet) katılır.
- **Veri kullanılabilirliği:** Büyük miktarda ağ verisini işlemek için kullanılan temel kriptografiyi yükseltmek, Ethereum'un gelecekteki kuantum güvenlik açıklarını riske atmadan hızlı ve uygun maliyetli kalmasını sağlayacaktır.
- **Poseidon Ödülü**: Hash tabanlı kriptografik ilkellerdeki iyileştirmeleri hedefleyen 1 milyon dolarlık bir araştırma ödülü.
- **NIST standartları**: ABD Ulusal Standartlar ve Teknoloji Enstitüsü, Ağustos 2024'te üç kuantum sonrası kriptografi standardını (ML-KEM, ML-DSA, SLH-DSA) kesinleştirdi. Ethereum'un çalışmaları bu temeller üzerine inşa edilmektedir.

Geçiş stratejisinin önemli bir parçası, yerel [hesap soyutlama](/roadmap/account-abstraction/) özelliğini tanıtan **EIP-8141**'dir. Bu, bireysel hesapların kendi imza doğrulamalarını seçmelerine olanak tanır; bu da kullanıcıların **protokol çapında tek bir geçişi beklemeden** kuantum güvenli imzalara geçebilecekleri anlamına gelir. EIP-8141, Hegotá sert çatallanması (2026'nın ikinci yarısı için planlanıyor) için değerlendirilmektedir.

Ethereum Vakfı, temel kuantum sonrası altyapının yaklaşık 2029 yılına kadar tamamlanmasını hedefleyen yapılandırılmış çatallanma kilometre taşlarını ana hatlarıyla belirlemiştir. Bunlar planlama hedefleridir, garanti edilen taahhütler değildir.

<ButtonLink variant="outline" href="/roadmap/future-proofing/quantum-resistance/">Kuantum direnci hakkında daha fazlası</ButtonLink>
## Daha basit ve daha verimli Ethereum {#simpler-more-efficient-ethereum}

Karmaşıklık, hatalar ve güvenlik açıkları için fırsatlar yaratır. Yol haritasının bir kısmı, protokolün bakımını, denetimini ve üzerinde düşünülmesini kolaylaştırmak için **Ethereum'u basitleştirmeye ve teknik borcu ortadan kaldırmaya** odaklanmaktadır.

### Neler sunuldu {#what-has-been-delivered}

Son zamanlardaki birkaç güncelleme Ethereum'u daha basit ve daha verimli hale getirdi:

- **[Pectra (Mayıs 2025)](/roadmap/pectra/)**: Harici olarak sahip olunan hesapların geçici olarak akıllı sözleşme koduna yetki devretmesine olanak tanıyan ve tam [hesap soyutlama](/roadmap/account-abstraction/) yolunda bir atlama taşı olan EIP-7702'yi tanıttı. Ayrıca BLS12-381 ön derlemesini (EIP-2537), zincir içi para yatırma işlemlerini (EIP-6110), EVM'de geçmiş blok hash erişimini (EIP-2935) ekledi ve doğrulayıcılar için maksimum efektif bakiyeyi artırdı (EIP-7251).
- **[Fusaka (Aralık 2025)](/roadmap/fusaka/)**: Veri kullanılabilirliği iş yükünü ağa dağıtan eşler arası bir veri kullanılabilirliği örnekleme sistemi olan PeerDAS'ı (EIP-7594) devreye aldı. Ayrıca blob parametrelerini artırarak [toplamalar](/glossary/#rollups) için veri işlem kapasitesini genişletti.
- **[Dencun (Mart 2024)](/roadmap/dencun/)**: Daha ucuz Rollup verileri için blob işlemlerini (EIP-4844) tanıttı ve uzun süredir devam eden bir karmaşıklık kaynağını ortadan kaldırmak için `SELFDESTRUCT`'yi (EIP-6780) kısıtladı.
- **[London (Ağustos 2021)](/ethereum-forks/#london)**: Daha öngörülebilir işlem maliyetleri için bir taban ücret ve yakım mekanizması sunan EIP-1559 ile [gaz](/glossary/#gas) fiyatlandırmasını elden geçirdi.

### Devam edenler {#what-is-in-progress}

- **[Glamsterdam (2026'nın ilk yarısı için planlanıyor)](/roadmap/glamsterdam/)**: Dahil edilmesi düşünülenler: yerleşik teklifçi-oluşturucu ayrımı (EIP-7732), blok düzeyinde erişim listeleri (EIP-7928) ve maliyetleri gerçek kaynak kullanımıyla daha iyi uyumlu hale getirmek için gazın yeniden fiyatlandırılması.
- **Hegotá (2026'nın ikinci yarısı için planlanıyor)**: Dahil edilmesi düşünülenler: Mevcut veri yapısını durumsuz istemcilere olanak tanıyan daha verimli bir yapıyla değiştiren [Verkle Ağaçları](/roadmap/verkle-trees/). Ayrıca EIP-8141 (yerel hesap soyutlama) için de hedeflenmektedir.
- **Devam eden**: [EVM](/developers/docs/evm/)'yi basitleştirme, istemci uygulamalarını uyumlu hale getirme ve kullanımdan kaldırılan özellikleri aşamalı olarak sonlandırma çabaları Ethereum geliştirme topluluğu genelinde devam etmektedir.

## Mevcut ilerleme {#current-progress}

2026'nın başları itibarıyla:

**Sadeleştirme ve verimlilik**: Pectra ve Fusaka, hesap esnekliği, veri kullanılabilirliği ve doğrulayıcı operasyonlarında gerçek iyileştirmeler sağladı. Glamsterdam ve Hegotá, dış bağımlılıkları ortadan kaldırırken ağı daha dayanıklı ve verimli hale getirmeye yönelik net hedeflerle aktif olarak geliştirilmektedir.

**Kuantum sonrası kriptografi**: Aktif araştırmalar ve erken uygulamalar devam etmektedir. Ekosistem, Ethereum Vakfı'nın özel Kuantum Sonrası ekibi tarafından yapılan araştırmalara ek olarak, araştırma ödüllerini finanse etmiş ve birden fazla istemci genelinde haftalık birlikte çalışabilirlik geliştirici ağları (devnet) yürütmektedir. Yapılandırılmış çatallanma kilometre taşları tamamlanma için yaklaşık 2029'u hedeflerken, erken araştırmalar kuantum sonrası yürütmenin bugün uygulanabilir olduğunu gösteren somut kanıt noktaları üretmektedir.

**Hesap soyutlama ve imza çevikliği**: EIP-7702, Pectra'da yayınlandı. Hegotá için değerlendirilen EIP-8141, hesapların herhangi bir imza şemasını kullanmasına izin vererek kullanıcılara tam protokol geçişi tamamlanmadan önce kuantum güvenli imzaları benimsemeleri için bir yol sunacaktır.

Bu çalışmanın hiçbir kısmı bitmiş değildir. Zaman çizelgeleri hedeftir, garanti değildir. Ancak aktif geliştirmenin kapsamı ve hızı, Ethereum'u uzun vadede güvenli ve verimli tutmaya yönelik açık bir taahhüdü temsil etmektedir.

**Daha fazla okuma**

- [Ethereum'da kuantum sonrası kriptografi](/roadmap/future-proofing/quantum-resistance/)
- [strawmap.org](https://strawmap.org/) - _EV Mimarisi_
- [pq.ethereum.org](https://pq.ethereum.org)
- [Gaz](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Veri yapıları](/developers/docs/data-structures-and-encoding/)
