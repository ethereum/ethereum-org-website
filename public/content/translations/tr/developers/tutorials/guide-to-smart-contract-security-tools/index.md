---
title: "Akıllı sözleşme güvenlik araçlarına yönelik bir kılavuz"
description: "Üç farklı test ve program analizi tekniğine genel bakış"
author: "Trailofbits"
lang: tr
tags: [ "katılık", "akıllı kontratlar", "güvenlik" ]
skill: intermediate
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

Üç farklı test ve program analizi tekniği kullanacağız:

- **[Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/) ile statik analiz.** Programın tüm yolları, farklı program gösterimleri (örn. kontrol akış grafiği) aracılığıyla aynı anda tahmin edilir ve analiz edilir.
- **[Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/) ile Bulandırma.** Kod, sahte rastgele işlem üretimi ile yürütülür. Bulandırıcı, belirli bir özelliği ihlal etmek için bir dizi işlem bulmaya çalışacaktır.
- **[Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/) ile sembolik yürütme.** Her yürütme yolunu, üzerinde kısıtlamaların kontrol edilebildiği matematiksel bir formüle çeviren resmi bir doğrulama tekniğidir.

Her tekniğin avantajları ve zorlukları vardır ve [belirli durumlarda](#determining-security-properties) faydalı olacaktır:

| Teknik           | Araç      | Kullanım                                | Hız       | Gözden kaçan hatalar | Yanlış Alarmlar |
| ---------------- | --------- | --------------------------------------- | --------- | -------------------- | --------------- |
| Statik Analiz    | Slither   | CLI ve komut dosyaları                  | saniyeler | Orta                 | Düşük           |
| Bulandırma       | Echidna   | Solidity özellikleri                    | dakika    | Düşük                | Yok             |
| Sembolik Yürütme | Manticore | Solidity özellikleri ve komut dosyaları | saat      | Yok\*                | Yok             |

\* tüm yollar zaman aşımı olmadan araştırılırsa

**Slither** sözleşmeleri saniyeler içinde analiz eder ancak statik analiz yanlış alarmlara neden olabilir ve karmaşık kontroller (örn. aritmetik kontroller) için daha az uygun olacaktır. Yerleşik algılayıcılara tek tuşla erişim için API aracılığıyla veya kullanıcı tanımlı kontroller için API aracılığıyla Slither'ı çalıştırın.

**Echidna**'nın birkaç dakika çalışması gerekir ve yalnızca doğru pozitifler üretecektir. Echidna, Solidity dilinde yazılmış, kullanıcı tarafından sağlanan güvenlik özelliklerini kontrol eder. Rastgele keşfe dayalı olduğu için hataları gözden kaçırabilir.

**Manticore** "en ağır" analizi gerçekleştirir. Echidna gibi, Manticore da kullanıcı tarafından sağlanan özellikleri doğrular. Çalışması daha fazla zaman alacaktır, ancak bir özelliğin geçerliliğini kanıtlayabilir ve yanlış alarmlar bildirmez.

## Önerilen iş akışı {#suggested-workflow}

Mevcut veya gelecekte eklenebilecek basit hataların olmadığından emin olmak için Slither'ın yerleşik algılayıcılarıyla başlayın. Kalıtım, değişken bağımlılıkları ve yapısal sorunlarla ilgili özellikleri kontrol etmek için Slither'ı kullanın. Kod tabanı büyüdükçe, durum makinesinin daha karmaşık özelliklerini test etmek için Echidna'yı kullanın. Bir fonksiyonun geçersiz kılınmasına karşı koruma gibi Solidity'de mevcut olmayan korumalar için özel denetimler geliştirmek üzere Slither'a geri dönün. Son olarak, aritmetik işlemler gibi kritik güvenlik özelliklerinin hedeflenmiş doğrulamasını gerçekleştirmek için Manticore'u kullanın.

- Sık karşılaşılan sorunları yakalamak için Slither'ın CLI'ını kullanın
- Sözleşmenizin üst düzey güvenlik özelliklerini test etmek için Echidna'yı kullanın
- Özel statik denetimler yazmak için Slither'ı kullanın
- Kritik güvenlik özelliklerinin derinlemesine güvencesini istediğinizde Manticore'u kullanın

**Birim testleri üzerine bir not**. Yüksek kaliteli yazılım oluşturmak için birim testleri gereklidir. Ancak bu teknikler, güvenlik kusurlarını bulmak için en uygun olanlar değildir. Bunlar genellikle kodun pozitif davranışlarını test etmek için kullanılır (yani kod normal bağlamda beklendiği gibi çalışır), güvenlik kusurları ise geliştiricilerin dikkate almadığı uç durumlarda bulunma eğilimindedir. Onlarca akıllı sözleşme güvenlik incelemesi üzerine yaptığımız çalışmada, müşterimizin kodunda bulduğumuz [güvenlik kusurlarının sayısı veya ciddiyeti üzerinde birim testi kapsamının hiçbir etkisi olmamıştır](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/).

## Güvenlik Özelliklerini Belirleme {#determining-security-properties}

Kodunuzu etkili bir şekilde test etmek ve doğrulamak için dikkat gerektiren alanları belirlemeniz gerekir. Güvenliğe ayırdığınız kaynaklar sınırlı olduğundan, çabanızı en iyi duruma getirmek için kod tabanınızın zayıf veya değerli kısımlarını belirlemek önemlidir. Tehdit modellemesi yardımcı olabilir. Şunları gözden geçirmeyi düşünün:

- [Hızlı Risk Değerlendirmeleri](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html) (zaman kısıtlı olduğunda tercih ettiğimiz yaklaşım)
- [Veri Merkezli Sistem Tehdit Modelleme Rehberi](https://csrc.nist.gov/pubs/sp/800/154/ipd) (diğer adıyla NIST 800-154)
- [Shostack tehdit modellemesi](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](https://wikipedia.org/wiki/STRIDE_\(security\)) / [DREAD](https://wikipedia.org/wiki/DREAD_\(risk_assessment_model\))
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [Onaylamaların Kullanımı](https://blog.regehr.org/archives/1091)

### Bileşenler {#components}

Neyi denetlemek istediğinizi bilmek, doğru aracı seçmenize de yardımcı olacaktır.

Akıllı sözleşmeler için sıklıkla geçerli olan geniş alanlar şunları içerir:

- **Durum makinesi.** Çoğu sözleşme bir durum makinesi olarak temsil edilebilir. Şunları kontrol etmeyi düşünün: (1) Hiçbir geçersiz duruma ulaşılamayacağı, (2) geçerli bir duruma ulaşılabileceği ve (3) hiçbir durumun sözleşmeyi tuzağa düşürmediği.

  - Echidna ve Manticore, durum makinesi belirtimlerini test etmek için tercih edilecek araçlardır.

- **Erişim denetimleri.** Sisteminizde ayrıcalıklı kullanıcılar (ör. bir sahip, denetleyiciler, ...) varsa her kullanıcının yalnızca izin verilen eylemleri gerçekleştirebildiğinden ve (2) hiçbir kullanıcının daha ayrıcalıklı bir kullanıcının eylemlerini engelleyemediğinden emin olmalısınız.

  - Slither, Echidna ve Manticore, erişim denetimlerinin doğruluğunu kontrol edebilir. Örneğin Slither, yalnızca beyaz listeye alınmış işlevlerde `onlyOwner` niteleyicisinin eksik olduğunu kontrol edebilir. Echidna ve Manticore, yalnızca sözleşme belirli bir duruma ulaştığında verilen bir izin gibi daha karmaşık erişim denetimleri için kullanışlıdır.

- **Aritmetik işlemler.** Aritmetik işlemlerin sağlamlığını kontrol etmek kritik öneme sahiptir. Her yerde `SafeMath` kullanmak, taşma/alt taşmayı önlemek için iyi bir adımdır ancak yuvarlama sorunları ve sözleşmeyi tuzağa düşüren kusurlar da dahil olmak üzere diğer aritmetik kusurları yine de göz önünde bulundurmalısınız.

  - Burada en iyi seçim Manticore'dur. Aritmetik, SMT çözücünün kapsamı dışındaysa Echidna kullanılabilir.

- **Kalıtım doğruluğu.** Solidity sözleşmeleri büyük ölçüde çoklu kalıtıma dayanır. `super` çağrısı eksik olan bir gölgeleme işlevi ve yanlış yorumlanmış C3 doğrusallaştırma sırası gibi hatalar kolayca yapılabilir.

  - Slither bu sorunların tespit edilmesini sağlayan araçtır.

- **Harici etkileşimler.** Sözleşmeler birbirleriyle etkileşime girer ve bazı harici sözleşmelere güvenilmemelidir. Örneğin, sözleşmeniz harici kâhinlere dayanıyorsa, mevcut kâhinlerin yarısı tehlikeye atıldığında güvende kalır mı?

  - Manticore ve Echidna, sözleşmelerinizle olan harici etkileşimleri test etmek için en iyi seçimdir. Manticore, harici sözleşmeleri taklit etmek için yerleşik bir mekanizmaya sahiptir.

- **Standartlara uygunluk.** Ethereum standartlarının (ör. ERC20) tasarımlarında geçmişten gelen kusurlar vardır. Üzerine inşa ettiğiniz standardın sınırlılıklarının farkında olun.
  - Slither, Echidna ve Manticore, belirli bir standarttan sapmaları tespit etmenize yardımcı olacaktır.

### Araç seçim rehberi {#tool-selection-cheatsheet}

| Bileşen               | Araçlar                     | Örnekler                                                                                                                                                                                                                                                                        |
| --------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Durum makinesi        | Echidna, Manticore          |                                                                                                                                                                                                                                                                                 |
| Erişim denetimi       | Slither, Echidna, Manticore | [Slither alıştırma 2](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise2.md), [Echidna alıştırma 2](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-2.md) |
| Aritmetik işlemler    | Manticore, Echidna          | [Echidna alıştırma 1](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-1.md), [Manticore alıştırmaları 1 - 3](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises)  |
| Kalıtım doğruluğu     | Slither                     | [Slither alıştırma 1](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise1.md)                                                                                                                                          |
| Harici etkileşimler   | Manticore, Echidna          |                                                                                                                                                                                                                                                                                 |
| Standartlara uygunluk | Slither, Echidna, Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance)                                                                                                                                                                                                         |

Hedeflerinize bağlı olarak diğer alanların da denetlenmesi gerekecektir, ancak bu genel odak alanları herhangi bir akıllı sözleşme sistemi için iyi bir başlangıçtır.

Halka açık denetimlerimiz, doğrulanmış veya test edilmiş özelliklerin örneklerini içerir. Gerçek dünyadaki güvenlik özelliklerini gözden geçirmek için aşağıdaki raporların `Otomatik Test ve Doğrulama` bölümlerini okumayı düşünün:

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)
