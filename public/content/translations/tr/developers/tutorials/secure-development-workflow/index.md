---
title: "Akıllı sözleşme güvenlik kontrol listesi"
description: "Güvenli akıllı sözleşmeler yazmak için önerilen bir iş akışı"
author: "Trailofbits"
tags:
  - akıllı sözleşmeler
  - güvenlik
  - solidity
skill: intermediate
breadcrumb: "Güvenlik kontrol listesi"
lang: tr
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## Akıllı sözleşme geliştirme kontrol listesi {#smart-contract-development-checklist}

Akıllı sözleşmelerinizi yazarken izlemenizi önerdiğimiz üst düzey bir süreç aşağıda verilmiştir.

Bilinen güvenlik sorunlarını kontrol edin:

- Sözleşmelerinizi [Slither](https://github.com/crytic/slither) ile inceleyin. Yaygın güvenlik açıkları için 100'den fazla yerleşik algılayıcıya sahiptir. Yeni kod içeren her check-in'de çalıştırın ve temiz bir rapor aldığından emin olun (veya belirli sorunları susturmak için önceliklendirme (triage) modunu kullanın).
- Güvenlik sorunlarının pull request'lerde ortaya çıkması için Slither'ı CI'da, örneğin GitHub'da [slither-action](https://github.com/crytic/slither-action) ile çalıştırın.

Sözleşmenizin özel özelliklerini göz önünde bulundurun:

- Sözleşmeleriniz yükseltilebilir mi? Yükseltilebilirlik kodunuzu [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) ile kusurlara karşı inceleyin. Yükseltmelerin ters gidebileceği 17 yolu belgelendirdik.
- Sözleşmeleriniz ERC'lere uyduğunu iddia ediyor mu? Onları [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance) ile kontrol edin. Bu araç, altı yaygın spesifikasyondan sapmaları anında tespit eder.
- 3. taraf token'lar ile entegrasyon yapıyor musunuz? Harici sözleşmelere güvenmeden önce [token entegrasyon kontrol listemizi](/developers/tutorials/token-integration-checklist/) inceleyin.

Kodunuzun kritik güvenlik özelliklerini görsel olarak inceleyin:

- Slither'ın [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) yazdırıcısını inceleyin. Yanlışlıkla gölgeleme (shadowing) ve C3 doğrusallaştırma (linearization) sorunlarından kaçının.
- Slither'ın [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) yazdırıcısını inceleyin. İşlev görünürlüğünü ve erişim kontrollerini raporlar.
- Slither'ın [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) yazdırıcısını inceleyin. Durum değişkenleri üzerindeki erişim kontrollerini raporlar.

Kritik güvenlik özelliklerini belgelendirin ve bunları değerlendirmek için otomatik test oluşturucuları kullanın:

- [Kodunuz için güvenlik özelliklerini belgelendirmeyi](/developers/tutorials/guide-to-smart-contract-security-tools/) öğrenin. Başlangıçta zordur, ancak iyi bir sonuç elde etmek için en önemli tek aktivitedir. Ayrıca bu eğitimdeki gelişmiş tekniklerden herhangi birini kullanmak için bir ön koşuldur.
- [Echidna](https://github.com/crytic/echidna) ve [Medusa](https://github.com/crytic/medusa) gibi fuzzer'lar ve [hevm](https://hevm.dev/) gibi sembolik yürütme araçlarıyla kullanmak üzere Solidity'de güvenlik özelliklerini tanımlayın. Durum makinenize, erişim kontrollerinize, aritmetik işlemlerinize, harici etkileşimlerinize ve standartlara uygunluğa odaklanın.
- [Slither'ın Python API'si](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/) ile güvenlik özelliklerini tanımlayın. Kalıtım, değişken bağımlılıkları, erişim kontrolleri ve diğer yapısal sorunlara odaklanın.
- Ekibinizdeki herkesin testlerin geçtiğini kolayca görebilmesi için özellik testlerinizi CI'daki (örneğin, GitHub Actions) her commit'te çalıştırın. Başarısız testler birleştirmeleri (merge) engelleyebilir.

Son olarak, otomatik araçların kolayca bulamayacağı sorunlara karşı dikkatli olun:

- Gizlilik eksikliği: havuzda sıraya girdiklerinde diğer herkes işlemlerinizi görebilir
- Front running işlemleri
- Kriptografik işlemler
- Harici DeFi bileşenleriyle riskli etkileşimler

## Yardım isteyin {#ask-for-help}

[Ethereum ofis saatleri](https://meetings.hubspot.com/trailofbits/office-hours) her Salı öğleden sonra gerçekleşir. Bu 1 saatlik, birebir oturumlar, bize güvenlikle ilgili sorularınızı sormak, araçlarımızı kullanarak sorun gidermek ve mevcut yaklaşımınız hakkında uzmanlardan geri bildirim almak için bir fırsattır. Bu kılavuzu tamamlamanıza yardımcı olacağız.

Slack kanalımıza katılın: [Empire Hacking](https://slack.empirehacking.nyc/). Herhangi bir sorunuz olursa #crytic ve #ethereum kanallarında her zaman ulaşılabiliriz.
