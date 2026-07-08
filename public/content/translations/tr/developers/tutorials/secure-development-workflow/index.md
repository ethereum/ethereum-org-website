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

İşte akıllı sözleşmelerinizi yazarken izlemenizi önerdiğimiz üst düzey bir süreç.

Bilinen güvenlik sorunlarını kontrol edin:

- Sözleşmelerinizi [Slither](https://github.com/crytic/slither) ile inceleyin. Yaygın güvenlik açıkları için 40'tan fazla yerleşik dedektöre sahiptir. Yeni kod içeren her kontrolde çalıştırın ve temiz bir rapor aldığından emin olun (veya belirli sorunları susturmak için önceliklendirme modunu kullanın).
- Sözleşmelerinizi [Crytic](https://crytic.io/) ile inceleyin. Slither'ın kontrol etmediği 50 sorunu kontrol eder. Crytic, GitHub'daki Çekme İsteklerinde güvenlik sorunlarını kolayca ortaya çıkararak ekibinizin birbirinden haberdar olmasına da yardımcı olabilir.

Sözleşmenizin özel özelliklerini göz önünde bulundurun:

- Sözleşmeleriniz yükseltilebilir mi? Yükseltilebilirlik kodunuzu kusurlara karşı [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) veya [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/) ile inceleyin. Yükseltmelerin ters gidebileceği 17 yolu belgeledik.
- Sözleşmeleriniz ERC'lere uyduğunu iddia ediyor mu? Onları [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance) ile kontrol edin. Bu araç, altı yaygın spesifikasyondan sapmaları anında tespit eder.
- 3. taraf token'lar ile entegrasyon yapıyor musunuz? Harici sözleşmelere güvenmeden önce [token entegrasyon kontrol listemizi](/developers/tutorials/token-integration-checklist/) inceleyin.

Kodunuzun kritik güvenlik özelliklerini görsel olarak inceleyin:

- Slither'ın [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) yazdırıcısını inceleyin. Yanlışlıkla gölgeleme (shadowing) ve C3 doğrusallaştırma sorunlarından kaçının.
- Slither'ın [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) yazdırıcısını inceleyin. İşlev görünürlüğünü ve erişim kontrollerini raporlar.
- Slither'ın [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) yazdırıcısını inceleyin. Durum değişkenleri üzerindeki erişim kontrollerini raporlar.

Kritik güvenlik özelliklerini belgeleyin ve bunları değerlendirmek için otomatik test oluşturucuları kullanın:

- [Kodunuz için güvenlik özelliklerini belgelemeyi](/developers/tutorials/guide-to-smart-contract-security-tools/) öğrenin. Başlangıçta zordur, ancak iyi bir sonuç elde etmek için en önemli tek aktivitedir. Ayrıca bu eğitimdeki gelişmiş tekniklerden herhangi birini kullanmak için bir ön koşuldur.
- [Echidna](https://github.com/crytic/echidna) ve [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html) ile kullanmak üzere Solidity'de güvenlik özelliklerini tanımlayın. Durum makinenize, erişim kontrollerine, aritmetik işlemlere, harici etkileşimlere ve standartlara uygunluğa odaklanın.
- [Slither'ın Python API'si](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/) ile güvenlik özelliklerini tanımlayın. Kalıtım, değişken bağımlılıkları, erişim kontrolleri ve diğer yapısal sorunlara odaklanın.
- Özellik testlerinizi her işlemede (commit) [Crytic](https://crytic.io) ile çalıştırın. Crytic, güvenlik özelliği testlerini tüketip değerlendirebilir, böylece ekibinizdeki herkes GitHub'da bunların geçtiğini kolayca görebilir. Başarısız olan testler işlemeleri engelleyebilir.

Son olarak, otomatik araçların kolayca bulamayacağı sorunlara karşı dikkatli olun:

- Gizlilik eksikliği: havuzda sıradayken diğer herkes işlemlerinizi görebilir
- Önden çalıştırma (front running) işlemleri
- Kriptografik işlemler
- Harici merkeziyetsiz finans (DeFi) bileşenleriyle riskli etkileşimler

## Yardım isteyin {#ask-for-help}

[Ethereum ofis saatleri](https://calendly.com/dan-trailofbits/office-hours) her Salı öğleden sonra gerçekleşir. Bu 1 saatlik, birebir oturumlar, bize güvenlikle ilgili sorularınızı sormak, araçlarımızı kullanarak sorun gidermek ve mevcut yaklaşımınız hakkında uzmanlardan geri bildirim almak için bir fırsattır. Bu kılavuzu tamamlamanıza yardımcı olacağız.

Slack kanalımıza katılın: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw). Herhangi bir sorunuz olursa #crytic ve #ethereum kanallarında her zaman ulaşılabiliriz.