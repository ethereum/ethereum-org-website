---
title: L1 blok doğrulaması için zkEVM
description: Sıfır bilgi ispatlarının Ethereum blok yürütmesini nasıl doğrulayabileceğini, daha yüksek işlem kapasitesi ve daha düşük doğrulayıcı gereksinimlerini nasıl sağlayabileceğini öğrenin.
lang: tr
---

zkEVM, Ethereum blok yürütmesini doğrulamak için [sıfır bilgi ispatlarını](/zero-knowledge-proofs/) kullanan bir teknolojidir. Her [doğrulayıcının](/glossary/#validator) bir bloktaki tüm işlemleri yeniden yürütmesini gerektirmek yerine, ("kanıtlayıcı" adı verilen) tek bir uzmanlaşmış aktör bloğu yürütür ve yürütmenin doğru olduğuna dair kriptografik bir ispat üretir. Ardından herhangi bir düğüm bu ispatı doğrulayabilir; bu süreç, tüm işlemleri yeniden yürütmekten kat kat daha ucuzdur.

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>zkEVM toplamaları ile karıştırılmamalıdır</AlertTitle>
<AlertDescription>
Bu sayfa, Ethereum katman 1 (L1) blok yürütmesini doğrulamak için zkEVM kullanımını tartışmaktadır. Ethereum'u katman 2 (L2) çözümleri olarak ölçeklendirmek için ZK ispatlarını kullanan zkEVM toplamaları için [sıfır bilgi toplamaları](/developers/docs/scaling/zk-rollups/) bölümüne bakın.
</AlertDescription>
</AlertContent>
</Alert>

## Yeniden yürütme sorunu {#reexecution-problem}

Bugün Ethereum, "N'de N" doğrulama modelini kullanır: her doğrulayıcı, önerilen durum değişikliklerinin doğru olduğunu doğrulamak için her bloktaki her işlemi bağımsız olarak yeniden yürütmelidir. Bu yaklaşım maksimum düzeyde güven gerektirmeyen bir yapı sunsa da, temel bir darboğaz yaratır.

Sorun, Ethereum'un işlem kapasitesinin ortalama bir doğrulayıcının işleyebileceği ile sınırlı olmasıdır. [Gaz limitini](/glossary/#gas-limit) artırmak blok başına daha fazla işleme izin verir, ancak aynı zamanda doğrulayıcılar için donanım gereksinimlerini de artırır. Bu durum merkeziyetsizliği tehdit eder; eğer bir doğrulayıcı çalıştırmak pahalı donanımlar gerektirirse, ağı güvence altına almaya daha az kişi katılabilir.

zkEVM, bu ödünleşimden bir çıkış yolu sunar. "Herkes yeniden yürütür" modelinden "biri kanıtlar, herkes doğrular" modeline geçerek Ethereum, doğrulayıcı donanım gereksinimlerini artırmadan gaz limitini güvenli bir şekilde yükseltebilir.

## zkEVM L1 doğrulaması nasıl çalışır {#how-it-works}

zkEVM doğrulaması, blok doğrulamayı "N'de 1" modeline dönüştürür:

1. **Yürütme**: Bir kanıtlayıcı, bir bloktaki tüm işlemleri yürüterek her durum değişikliğini izler
2. **Kanıtlama**: Kanıtlayıcı, yürütmenin doğruluğunu onaylayan kriptografik bir ispat (bir [SNARK veya STARK](/zero-knowledge-proofs/#types-of-zero-knowledge-proofs)) üretir
3. **Doğrulama**: Doğrulayıcılar işlemleri yeniden yürütmek yerine ispatı doğrular; bu, tam bir yeniden yürütmeden çok daha ucuzdur

Güvenlik garantisi aynı kalır: yürütme yanlışsa, geçerli bir ispat üretilemez. Ancak şimdi, her düğümün pahalı hesaplamalar yapması yerine, bunu yalnızca kanıtlayıcı yapar ve doğrulama, gaz limitini kısıtlamayacak kadar ucuzdur.

### Tip 1 zkEVM'ler {#type-1-zkevm}

zkEVM'ler, Ethereum ile uyumluluklarına göre tiplere ayrılır:

- **Tip 1**: Tamamen Ethereum eşdeğeri. EVM'de hiçbir değişiklik yapılmaz, bu nedenle herhangi bir Ethereum bloğu tam olarak olduğu gibi kanıtlanabilir
- **Tip 2-4**: Kanıtlamayı kolaylaştırmak için EVM davranışını değiştirerek çeşitli ödünleşimler yapar

L1 doğrulaması için Tip 1 esastır. zkEVM, uç durumlar ve geçmiş bloklar dahil olmak üzere herhangi bir geçerli Ethereum bloğunu kanıtlayabilmelidir. Ethereum'un kesin davranışından herhangi bir sapma, mutabakat sorunları yaratacaktır.

Ethereum Vakfı'nın zkEVM araştırması, mevcut Ethereum yürütmesiyle tam uyumlu olan Tip 1 uygulamalarına odaklanmaktadır.

## Ethereum için faydaları {#benefits}

### Daha yüksek işlem kapasitesi {#higher-throughput}

Doğrulama ucuz olduğunda, gaz limiti güvenli bir şekilde artabilir. Bu, ağ kapasitesini genişletir ve yüksek talep dönemlerinde ücretlerin dengelenmesine yardımcı olur. Mevcut gaz limiti kısmen doğrulayıcı donanımı tarafından kısıtlanmaktadır; zkEVM bu kısıtlamayı ortadan kaldırır.

### Daha güçlü merkeziyetsizlik {#stronger-decentralization}

zkEVM doğrulaması ile doğrulayıcıların işlemleri yürütmek yerine yalnızca ispatları doğrulaması gerekir. Bu, bir doğrulayıcı çalıştırmak için gereken donanım gereksinimlerini önemli ölçüde düşürerek daha fazla kişinin ağı güvence altına almaya katılmasına olanak tanır. Daha fazla doğrulayıcı çeşitliliği, Ethereum'un sansür direncini ve dayanıklılığını güçlendirir.

Kanıtlamanın kendisinin, mevcut doğrulayıcı donanımından daha büyük, önemli hesaplama kaynakları gerektirdiğini unutmayın. Ancak, doğrulamanın aksine, kanıtlamanın aynı şekilde merkeziyetsiz olması gerekmez: blok başına yalnızca bir doğru ispat gereklidir ve herkes bunu hızlı bir şekilde doğrulayabilir. Kanıtlayıcı piyasaları, ispat toplama ve donanım hızlandırma üzerine yapılan araştırmalar, kanıtlamanın birkaç büyük operatör arasında yoğunlaşmak yerine rekabetçi ve erişilebilir kalmasını sağlamayı amaçlamaktadır.

### Öngörülebilir kesinlik {#predictable-finality}

İspat doğrulaması, blok karmaşıklığından bağımsız olarak sabit sürede çalışır. Bu, onay zamanlamasını daha öngörülebilir hale getirir ve doğrulayıcılar karmaşık blokları zamanında işlemekte zorlandığında ortaya çıkabilecek kaçırılmış onayları azaltır.

## Gerçek zamanlı kanıtlama zorlukları {#realtime-proving}

zkEVM L1 doğrulaması için temel zorluk hızdır. Ethereum blokları her 12 saniyede bir üretilir, bu da ispatların mutabakat için yararlı olabilmesi adına benzer bir zaman diliminde üretilmesi gerektiği anlamına gelir.

Mevcut zkEVM uygulamalarının tek bir bloğu kanıtlaması dakikalar ila saatler sürebilir. Araştırmalar bu açığı şunlar aracılığıyla kapatmaya odaklanmaktadır:

- **Paralelleştirme**: Kanıtlama işini birden fazla makineye dağıtmak
- **Özel donanım**: ZK kanıtlama için optimize edilmiş devreler ve donanımlar tasarlamak
- **Algoritmik iyileştirmeler**: Daha verimli ispat sistemleri ve devre tasarımları
- **Aşamalı kanıtlama**: İspatları işlemler yürütüldükten sonra değil, yürütülürken üretmek

## Mevcut araştırmalar ve uygulamalar {#current-research}

Ethereum Vakfı, zkEVM araştırmalarını [Privacy Stewards of Ethereum (PSE)](https://pse.dev/) ekibi aracılığıyla finanse etmektedir. Temel araştırma alanları şunları içerir:

- **Gerçek zamanlı kanıtlama**: 12 saniyelik slotlar içinde tam blok ispatları üretmek
- **İstemci entegrasyonu**: Yürütme istemcileri ve kanıtlayıcılar arasındaki arayüzleri standartlaştırmak
- **Ekonomik teşvikler**: Sürdürülebilir kanıtlayıcı piyasaları ve ücret yapıları tasarlamak

### Uygulama durumu {#implementations}

Ethereum blok kanıtlaması için çeşitli zkVM uygulamaları geliştirilmekte ve test edilmektedir:

| Uygulama | Mimari |
|----------------|--------------|
| [OpenVM](https://github.com/openvm-org/openvm) | rv32im |
| [RISC Zero](https://github.com/risc0/risc0) | rv32im |
| [Airbender](https://github.com/matter-labs/zksync-airbender) | rv32im |
| [Jolt](https://github.com/a16z/jolt) | rv32im |
| [Zisk](https://github.com/0xPolygonHermez/zisk) | rv64ima |

Bunlar, EVM baytkodunu yürütmek için RISC-V tabanlı sanal makineler kullanır ve ardından doğru yürütmenin ZK ispatlarını üretir. Güncel test sonuçları ve ilerleme, [Ethereum Vakfı'nın zkVM izleyicisinde](https://zkevm.ethereum.foundation/zkvm-tracker) takip edilmektedir.

## zkEVM diğer yükseltmelerle nasıl uyum sağlar {#related-upgrades}

zkEVM L1 doğrulaması, diğer birkaç Ethereum yol haritası öğesiyle bağlantılıdır:

- **[Verkle Ağaçları](/roadmap/verkle-trees/)**: Durumsuz doğrulama için daha küçük tanıklara olanak tanıyarak kanıtlayıcıların çalışması gereken verileri azaltır
- **[Durumsuzluk](/roadmap/statelessness/)**: zkEVM önemli bir kolaylaştırıcıdır; ZK yürütme ispatları ile düğümlerin blokları doğrulamak için tam duruma ihtiyacı yoktur
- **[Teklifçi-oluşturucu ayrımı (PBS)](/roadmap/pbs/)**: Blok oluşturucular potansiyel olarak ispat üretimini entegre edebilir veya ayrı bir kanıtlayıcı piyasası ortaya çıkabilir
- **[Tek Slot Kesinliği](/roadmap/single-slot-finality/)**: Daha hızlı ispat üretimi, kriptografik garantilerle tek slot kesinliğini sağlayabilir

<Alert variant="warning">
<AlertEmoji text="🧪" />
<AlertContent>
<AlertDescription>
zkEVM L1 doğrulaması aktif araştırma aşamasındadır ve henüz üretimdeki Ethereum istemcilerine entegre edilmemiştir.
</AlertDescription>
</AlertContent>
</Alert>

## Daha fazla bilgi {#further-reading}

- [zkEVM Foundation](https://zkevm.ethereum.foundation) - Resmi Ethereum Vakfı zkEVM araştırma merkezi
- [Ethproofs](https://ethproofs.org/) - Ethereum'u gerçek zamanlı olarak kanıtlama yarışını takip edin
- [zkevm.fyi](https://zkevm.fyi) - L1 için zkEVM üzerine teknik kitap
- [PSE zkEVM Specs](https://github.com/privacy-scaling-explorations/zkevm-specs) - Teknik özellikler
- [The Verge](https://vitalik.eth.limo/general/2024/10/23/futures4.html) - Vitalik'in doğrulama iyileştirmelerine genel bakışı
- [EF zkEVM Blog](https://zkevm.ethereum.foundation/blog) - EF ekibinden performans analizi