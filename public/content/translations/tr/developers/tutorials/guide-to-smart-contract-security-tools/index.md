---
title: Akıllı sözleşme güvenlik araçlarına yönelik bir kılavuz
description: Üç farklı test ve program analizi tekniğine genel bakış
author: "Trailofbits"
lang: tr
tags:
  - "solidity"
  - "akıllı kontratlar"
  - "güvenlik"
skill: intermediate
published: 2020-09-07
source: Güvenli sözleşmeler oluşturmak
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

Üç farklı test ve program analizi tekniği kullanacağız:

- **Slither[ ile statik analiz](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). **Programın tüm yolları, farklı program sunumları (örn. control-flow-graph) aracılığıyla aynı anda tahmin edilir ve analiz edilir
- **[Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/) ile bulandırma.** Kod, işlemlerin sözde rastgele oluşumu ile yürütülür. Bulandırıcı, belirli bir özelliği ihlal etmek için bir dizi işlem bulmaya çalışacaktır.
- **[Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/) ile sembolik yürütme.** Her yürütme yolunu matematiksel bir formüle çeviren ve üzerinde en üst kısıtlamaların kontrol edilebileceği resmi bir doğrulama tekniği.

Her tekniğin avantajları ve yetersizlikleri vardır ve hepsi [belirli durumlarda](#determining-security-properties) faydalı olacaktır:

| Teknik           | Araç      | Kullanım                                | Hız       | Kaçırılan hatalar | Yanlış Alarmlar |
| ---------------- | --------- | --------------------------------------- | --------- | ----------------- | --------------- |
| Statik Analiz    | Slither   | CLI ve komut dosyaları                  | saniyeler | orta seviye       | düşük           |
| Bulandırma       | Echidna   | Solidity özellikleri                    | dakika    | düşük             | yok             |
| Sembolik Yürütme | Manticore | Solidity özellikleri ve komut dosyaları | saat      | yok\*             | yok             |

\* tüm yollar zaman aşımı olmadan araştırılırsa

**Slither**, sözleşmeleri saniyeler içinde analiz eder ancak statik analiz yanlış alarmlara neden olabilir ve karmaşık kontroller (örn. aritmetik kontroller) için daha az uygun olacaktır. Yerleşik algılayıcılara push-button erişimi için API aracılığıyla veya kullanıcı tanımlı kontroller için API aracılığıyla Slither'ı çalıştırın.

**Echidna**, birkaç dakika çalışmaya ihtiyaç duyar ve sadece doğru pozitifler üretir. Echidna Solidity'de yazılmış, kullanıcı tarafından sağlanan güvenlik özelliklerini kontrol eder. Rastgele keşfe dayalı olduğu için hataları kaçırabilir.

**Manticore** "en büyük ağırlık" analizini uygular. Echidna gibi, Manticore da kullanıcı tarafından sağlanan özellikleri doğrular. Çalıştırmak için daha fazla zamana ihtiyacı olacak ancak bir özelliğin geçerliliğini kanıtlayabilir ve yanlış alarmları bildirmez.

## Önerilen iş akışı {#suggested-workflow}

Şu anda hiçbir basit hatanın bulunmadığından veya daha sonra tanıtılacağından emin olmak için Slither'ın yerleşik algılayıcılarıyla başlayın. Kalıtım, değişken bağımlılıkları ve yapısal sorunlarla ilgili özellikleri kontrol etmek için Slither'ı kullanın. Kod tabanı büyüdükçe, durum makinesinin daha karmaşık özelliklerini test etmek için Echidna'yı kullanın. Geçersiz kılınan bir fonksiyona karşı koruma gibi, Solidity'de bulunmayan korumalar için özel kontroller geliştirmek için Slither'ı tekrar ziyaret edin. Son olarak, aritmetik işlemler gibi kritik güvenlik özelliklerinin hedefli doğrulamasını gerçekleştirmek için Manticore'u kullanın.

- Slither'ın CLI'sını yaygın sorunları yakalamak için kullanın
- Sözleşmenizin üst düzey güvenlik özelliklerini test etmek için Echidna'yı kullanın
- Özel statik kontrolleri yazmak için Slither kullanın
- Kritik güvenlik özelliklerinin derinlemesine güvencesini istediğinizde Manticore'u kullanın

**Birim testleri üzerine bir not**. Yüksek kaliteli yazılım oluşturmak için birim testleri gereklidir. Ancak, bu teknikler güvenlik açıklarını bulmak için en uygun teknikler değildir. Genellikle kodun olumlu davranışlarını test etmek için kullanılırlar (yani kod normal bağlamda beklendiği gibi çalışır), güvenlik kusurları ise geliştiricilerin dikkate almadığı uç durumlarda bulunma eğilimindedir. Düzinelerce akıllı sözleşme güvenlik incelemesini içeren çalışmamızda [birim test kapsamı, müşterimizin kodunda bulduğumuz güvenlik açıklarının sayısı veya ciddiyeti üzerinde hiçbir etkiye sahip değildi](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/).

## Güvenlik Özelliklerinin Belirlenmesi {#determining-security-properties}

Kodunuzu etkili bir şekilde test etmek ve doğrulamak için dikkat edilmesi gereken alanları belirlemelisiniz. Güvenlik için harcanan kaynaklarınız sınırlı olduğundan, çabanızı optimize etmek için kod tabanınızın zayıf veya yüksek değerli kısımlarının kapsamını belirlemek önemlidir. Tehdit modelleme yardımcı olabilir. Şunları incelemeyi düşünün:

- [Hızlı Risk Değerlendirmeleri](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html) (zaman kısıtlı olduğunda tercih ettiğimiz yaklaşım)
- [Veri Merkezli Sistem Tehdit Modelleme Kılavuzu](https://csrc.nist.gov/publications/detail/sp/800-154/draft) (diğer adıyla NIST 800-154)
- [Shostack iş parçacığı modellemesi](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](<https://wikipedia.org/wiki/STRIDE_(security)>) / [DREAD](<https://wikipedia.org/wiki/DREAD_(risk_assessment_model)>)
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [Teyitlerin Kullanımı](https://blog.regehr.org/archives/1091)

### Bileşenler {#components}

Neyi kontrol etmek istediğinizi bilmek, doğru aracı seçmenize de yardımcı olacaktır.

Akıllı sözleşmelerle sıklıkla ilgili olan geniş alanlar şunları içerir:

- **Durum makinesi.** Çoğu sözleşme bir durum makinesi olarak temsil edilebilir. (1) Hiçbir geçersiz duruma ulaşılıp ulaşılamayacağını, (2) durum, ulaşılabilir olduğu konusunda kesin olup olmadığını ve (3) herhangi bir durumun sözleşmeyi tuzağa düşürüp düşürmediğini kontrol edin.

  - Echidna ve Manticore, durum makinesi özelliklerini test etmek için tercih edilen araçlardır.

- **Erişim kontrolleri.** Sisteminizde ayrıcalıklı kullanıcılar varsa (örn. sahip, denetleyiciler vb.), (1) her kullanıcının yalnızca yetkilendirilmiş eylemleri gerçekleştirebildiğinden ve (2) hiçbir kullanıcının daha ayrıcalıklı bir kullanıcının eylemlerini engelleyemediğinden emin olmalısınız.

  - Slither, Echidna ve Manticore, doğru erişim kontrollerini kontrol edebilir. Örneğin Slither, yalnızca beyaz listeye alınan fonksiyonlarda onlyOwner niteleyicisinin bulunmadığını kontrol edebilir. Echidna ve Manticore, yalnızca sözleşme belirli bir duruma ulaştığında verilen izin gibi daha karmaşık erişim kontrolü için kullanışlıdır.

- **Aritmetik işlemler.** Aritmetik işlemlerin sağlamlığının kontrol edilmesi çok önemlidir. `SafeMath`'i her yerde kullanmak, taşmayı/yetersizlikleri önlemek için iyi bir adımdır ancak yine de yuvarlama sorunları ve sözleşmeyi tuzağa düşüren kusurlar dahil diğer aritmetik kusurları göz önünde bulundurmalısınız.

  - Manticore en iyi seçimdir. Aritmetik SMT çözücünün kapsamı dışındaysa Echidna kullanılabilir.

- **Kalıtım doğruluğu.** Solidity sözleşmeleri ağırlıklı olarak çoklu kalıtıma dayalıdır. Bir `super` çağrısının eksik olduğu gölgeleme fonksiyonu ve yanlış yorumlanmış c3 doğrusallaştırma sırası gibi hatalar kolayca ortaya çıkarılabilir.

  - Slither, bu sorunların tespit edilmesini sağlayan araçtır.

- **Harici etkileşimler.** Sözleşmeler birbirleriyle etkileşime girer ve bazı harici sözleşmelere güvenilmemelidir. Örneğin, sözleşmeniz harici kâhinlere dayalıysa, kullanılan kâhinlerin yarısının tehlikeye girmesi durumunda sözleşme güvende kalacak mı?

  - Manticore ve Echidna, sözleşmelerinizle harici etkileşimleri test etmek için en iyi seçimdir. Manticore, harici sözleşmeleri yoklamak için yerleşik bir mekanizmaya sahiptir.

- **Standart uyum.** Ethereum standartı tasarımlarının (örn. ERC20) geçmişlerinde bir çok hata bulunur. Üzerine inşa ettiğiniz standardın sınırlamalarının farkında olun.
  - Slither, Echidna ve Manticore, belirli bir standarttan sapmaları tespit etmenize yardımcı olacaktır.

### Araç seçimi kopya kağıdı {#tool-selection-cheatsheet}

| Bileşen                | Araçlar                     | Örnekler                                                                                                                                                                                                                                                          |
| ---------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Durum makinesi         | Echidna, Manticore          |                                                                                                                                                                                                                                                                   |
| Erişim kontrolü        | Slither, Echidna, Manticore | [Slither 2. alıştırma](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/slither/exercise2.md), [Echidna 2. alıştırma](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/Exercise-2.md)     |
| Aritmetik operasyonlar | Manticore, Echidna          | [Echidna 1. alıştırma](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/Exercise-1.md), [Manticore 1.-3. alıştırma](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises) |
| Kalıtım doğruluğu      | Slither                     | [Slither 1. alıştırma](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/slither/exercise1.md)                                                                                                                                     |
| Harici etkileşimler    | Manticore, Echidna          |                                                                                                                                                                                                                                                                   |
| Standart uyum          | Slither, Echidna, Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance)                                                                                                                                                                                           |

Hedeflerinize bağlı olarak diğer alanların kontrol edilmesi gerekecektir, ancak bu kaba taneli odak alanları, herhangi bir akıllı sözleşme sistemi için iyi bir başlangıçtır.

Herkese açık denetimlerimiz, doğrulanmış veya test edilmiş özelliklerin örneklerini içerir. Gerçek dünyadaki güvenlik özelliklerini incelemek için aşağıdaki raporların `Automated Testing and Verification` bölümlerini okuyun:

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)
