---
title: Akıllı sözleşme güvenlik araçları rehberi
description: Üç farklı test ve program analizi tekniğine genel bir bakış
author: "Trailofbits"
lang: tr
tags: ["solidity", "akıllı sözleşmeler", "güvenlik"]
skill: intermediate
breadcrumb: Güvenlik araçları
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

Üç farklı test ve program analizi tekniği kullanacağız:

- **[Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/) ile statik analiz.** Programın tüm yolları, farklı program sunumları (örn. kontrol akış grafiği) aracılığıyla aynı anda tahmin edilir ve analiz edilir.
- **[Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/) ile bulanıklaştırma (fuzzing).** Kod, sözde rastgele işlemler üretilerek çalıştırılır. Bulanıklaştırıcı (fuzzer), belirli bir özelliği ihlal edecek bir işlem dizisi bulmaya çalışacaktır.
- **[Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/) ile sembolik yürütme.** Her yürütme yolunu, üzerinde kısıtlamaların kontrol edilebileceği matematiksel bir formüle dönüştüren bir biçimsel doğrulama tekniğidir.

Her tekniğin avantajları ve dezavantajları vardır ve [belirli durumlarda](#determining-security-properties) faydalı olacaktır:

| Teknik | Araç | Kullanım | Hız | Gözden kaçan hatalar | Yanlış Alarmlar |
| ------------------ | --------- | ----------------------------- | ------- | ----------- | ------------ |
| Statik Analiz | Slither | CLI ve betikler | saniyeler | orta | düşük |
| Bulanıklaştırma | Echidna | Solidity özellikleri | dakikalar | düşük | hiç |
| Sembolik Yürütme | Manticore | Solidity özellikleri ve betikler | saatler | hiç\* | hiç |

\* tüm yollar zaman aşımına uğramadan keşfedilirse

**Slither**, sözleşmeleri saniyeler içinde analiz eder, ancak statik analiz yanlış alarmlara yol açabilir ve karmaşık kontroller (örn. aritmetik kontroller) için daha az uygun olacaktır. Yerleşik dedektörlere tek tıkla erişim sağlamak için veya kullanıcı tanımlı kontroller için Slither'ı API üzerinden çalıştırın.

**Echidna**'nın birkaç dakika çalışması gerekir ve yalnızca gerçek pozitifler üretecektir. Echidna, Solidity ile yazılmış, kullanıcı tarafından sağlanan güvenlik özelliklerini kontrol eder. Rastgele keşfe dayandığı için hataları gözden kaçırabilir.

**Manticore** "en ağır" analizi gerçekleştirir. Echidna gibi, Manticore da kullanıcı tarafından sağlanan özellikleri doğrular. Çalışması için daha fazla zamana ihtiyacı olacaktır, ancak bir özelliğin geçerliliğini kanıtlayabilir ve yanlış alarmlar bildirmez.

## Önerilen iş akışı {#suggested-workflow}

Şu anda hiçbir basit hatanın bulunmadığından veya daha sonra ortaya çıkmayacağından emin olmak için Slither'ın yerleşik dedektörleriyle başlayın. Kalıtım, değişken bağımlılıkları ve yapısal sorunlarla ilgili özellikleri kontrol etmek için Slither'ı kullanın. Kod tabanı büyüdükçe, durum makinesinin daha karmaşık özelliklerini test etmek için Echidna'yı kullanın. Bir işlevin geçersiz kılınmasına karşı koruma gibi Solidity'de bulunmayan korumalar için özel kontroller geliştirmek üzere Slither'ı tekrar ziyaret edin. Son olarak, aritmetik işlemler gibi kritik güvenlik özelliklerinin hedeflenmiş doğrulamasını gerçekleştirmek için Manticore'u kullanın.

- Yaygın sorunları yakalamak için Slither'ın CLI'ını kullanın
- Sözleşmenizin üst düzey güvenlik özelliklerini test etmek için Echidna'yı kullanın
- Özel statik kontroller yazmak için Slither'ı kullanın
- Kritik güvenlik özelliklerinin derinlemesine güvencesini istediğinizde Manticore'u kullanın

**Birim testleri üzerine bir not**. Birim testleri, yüksek kaliteli yazılımlar oluşturmak için gereklidir. Ancak bu teknikler, güvenlik açıklarını bulmak için en uygun olanlar değildir. Genellikle kodun olumlu davranışlarını test etmek için kullanılırlar (yani kod normal bağlamda beklendiği gibi çalışır), güvenlik açıkları ise genellikle geliştiricilerin dikkate almadığı uç durumlarda bulunma eğilimindedir. Düzinelerce akıllı sözleşme güvenlik incelemesi üzerine yaptığımız çalışmada, müşterimizin kodunda bulduğumuz [güvenlik açıklarının sayısı veya ciddiyeti üzerinde birim test kapsamının hiçbir etkisi olmadığını](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/) gördük.

## Güvenlik Özelliklerini Belirleme {#determining-security-properties}

Kodunuzu etkili bir şekilde test etmek ve doğrulamak için dikkat edilmesi gereken alanları belirlemelisiniz. Güvenliğe harcanan kaynaklarınız sınırlı olduğundan, çabanızı optimize etmek için kod tabanınızın zayıf veya yüksek değerli kısımlarını kapsamlandırmak önemlidir. Tehdit modellemesi yardımcı olabilir. Şunları incelemeyi düşünün:

- [Hızlı Risk Değerlendirmeleri](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html) (zaman kısıtlı olduğunda tercih ettiğimiz yaklaşım)
- [Veri Odaklı Sistem Tehdit Modellemesi Kılavuzu](https://csrc.nist.gov/pubs/sp/800/154/ipd) (diğer adıyla NIST 800-154)
- [Shostack tehdit modellemesi](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](<https://wikipedia.org/wiki/STRIDE_(security)>) / [DREAD](<https://wikipedia.org/wiki/DREAD_(risk_assessment_model)>)
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [İddiaların (Assertions) Kullanımı](https://blog.regehr.org/archives/1091)

### Bileşenler {#components}

Neyi kontrol etmek istediğinizi bilmek, doğru aracı seçmenize de yardımcı olacaktır.

Akıllı sözleşmeler için sıklıkla geçerli olan geniş alanlar şunları içerir:

- **Durum makinesi.** Çoğu sözleşme bir durum makinesi olarak temsil edilebilir. Şunları kontrol etmeyi düşünün: (1) Geçersiz hiçbir duruma ulaşılamaz, (2) bir durum geçerliyse ona ulaşılabilir ve (3) hiçbir durum sözleşmeyi tuzağa düşürmez.

  - Echidna ve Manticore, durum makinesi spesifikasyonlarını test etmek için tercih edilecek araçlardır.

- **Erişim kontrolleri.** Sisteminizde ayrıcalıklı kullanıcılar (örn. bir sahip, denetleyiciler, ...) varsa, (1) her kullanıcının yalnızca yetkili eylemleri gerçekleştirebildiğinden ve (2) hiçbir kullanıcının daha ayrıcalıklı bir kullanıcının eylemlerini engelleyemediğinden emin olmalısınız.

  - Slither, Echidna ve Manticore doğru erişim kontrollerini denetleyebilir. Örneğin Slither, yalnızca beyaz listedeki işlevlerin onlyOwner değiştiricisinden yoksun olduğunu kontrol edebilir. Echidna ve Manticore, yalnızca sözleşme belirli bir duruma ulaştığında verilen bir izin gibi daha karmaşık erişim kontrolleri için kullanışlıdır.

- **Aritmetik işlemler.** Aritmetik işlemlerin sağlamlığını kontrol etmek kritiktir. Her yerde `SafeMath` kullanmak taşma/alt taşmayı önlemek için iyi bir adımdır, ancak yine de yuvarlama sorunları ve sözleşmeyi tuzağa düşüren kusurlar dahil olmak üzere diğer aritmetik kusurları göz önünde bulundurmalısınız.

  - Manticore buradaki en iyi seçimdir. Aritmetik, SMT çözücü kapsamı dışındaysa Echidna kullanılabilir.

- **Kalıtım doğruluğu.** Solidity sözleşmeleri büyük ölçüde çoklu kalıtıma dayanır. `super` çağrısı eksik olan bir gölgeleme işlevi ve yanlış yorumlanmış c3 doğrusallaştırma sırası gibi hatalar kolayca ortaya çıkabilir.

  - Slither, bu sorunların tespit edilmesini sağlayan araçtır.

- **Dış etkileşimler.** Sözleşmeler birbirleriyle etkileşime girer ve bazı dış sözleşmelere güvenilmemelidir. Örneğin, sözleşmeniz dış kâhinlere (oracles) dayanıyorsa, mevcut kâhinlerin yarısı ele geçirilirse güvende kalacak mı?

  - Manticore ve Echidna, sözleşmelerinizle olan dış etkileşimleri test etmek için en iyi seçimdir. Manticore, dış sözleşmeleri taklit etmek (stub) için yerleşik bir mekanizmaya sahiptir.

- **Standartlara uygunluk.** Ethereum standartları (örn. ERC-20), tasarımlarında kusur geçmişine sahiptir. Üzerine inşa ettiğiniz standardın sınırlamalarının farkında olun.
  - Slither, Echidna ve Manticore, belirli bir standarttan sapmaları tespit etmenize yardımcı olacaktır.

### Araç seçimi kopya kağıdı {#tool-selection-cheatsheet}

| Bileşen | Araçlar | Örnekler |
| ----------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Durum makinesi | Echidna, Manticore |
| Erişim kontrolü | Slither, Echidna, Manticore | [Slither alıştırması 2](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise2.md), [Echidna alıştırması 2](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-2.md) |
| Aritmetik işlemler | Manticore, Echidna | [Echidna alıştırması 1](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-1.md), [Manticore alıştırmaları 1 - 3](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises) |
| Kalıtım doğruluğu | Slither | [Slither alıştırması 1](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise1.md) |
| Dış etkileşimler | Manticore, Echidna |
| Standartlara uygunluk | Slither, Echidna, Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance) |

Hedeflerinize bağlı olarak diğer alanların da kontrol edilmesi gerekecektir, ancak bu kaba taneli odak alanları herhangi bir akıllı sözleşme sistemi için iyi bir başlangıçtır.

Herkese açık denetimlerimiz, doğrulanmış veya test edilmiş özelliklerin örneklerini içerir. Gerçek dünyadaki güvenlik özelliklerini incelemek için aşağıdaki raporların `Automated Testing and Verification` bölümlerini okumayı düşünün:

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)