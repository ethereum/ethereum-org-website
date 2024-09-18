---
title: Akıllı sözleşme güvenlik kontrol listesi
description: Güvenli akıllı sözleşmeler yazmak için önerilen bir iş akışı
author: "Trailofbits"
tags:
  - "akıllı sözleşmeler"
  - "güvenlik"
  - "katılık"
skill: intermediate
lang: tr
published: 2020-09-07
source: Güvenli sözleşmeler oluşturmak
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## Akıllı sözleşme geliştirme kontrol listesi {#smart-contract-development-checklist}

İşte akıllı sözleşmelerinizi yazarken izlemenizi önerdiğimiz üst düzey bir süreç.

Bilinen güvenlik sorunlarını kontrol edin:

- [Slither](https://github.com/crytic/slither) ile sözleşmelerinizi gözden geçirin. Yaygın güvenlik açıkları için 40'tan fazla yerleşik algılayıcıya sahiptir. Her girişte yeni kodla çalıştırın ve temiz bir rapor aldığından emin olun (veya belirli sorunları susturmak için önceliklendirme modunu kullanın).
- [Crytic](https://crytic.io/) ile sözleşmelerinizi gözden geçirin. Slither'ın kontrol etmediği 50 sorunu kontrol eder. Crytic, GitHub'daki Çekme Taleplerinde güvenlik sorunlarını kolayca ortaya çıkararak ekibinizin de kendi içinde güncel kalmasına yardımcı olabilir.

Sözleşmenizin özel özelliklerini göz önünde bulundurun:

- Sözleşmeleriniz yükseltilebilir mi? Açıkları bulunan yükseltilebilirlik kodunuzu [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) veya [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/) ile gözden geçirin. Yükseltmenin sıkıntı çıkarabileceği 17 yolu belgeledik.
- Sözleşmeleriniz ERC'lere uygun olduğunu iddia ediyor mu? Onları [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance) ile kontrol edin. Bu araç, altı ortak özellikten sapmaları anında tanımlar.
- 3. taraf token'ları ile entegre oluyor musunuz? Harici sözleşmelere bağlı kalmadan önce [token entegrasyon kontrol listemizi](/developers/tutorials/token-integration-checklist/) gözden geçirin.

Kodunuzun kritik güvenlik özelliklerini görsel olarak inceleyin:

- Slither'ın [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) yazıcısını gözden geçirin. İstenmeyen gölgeleme ve C3 doğrusallaştırma sorunlarından kaçının.
- Slither'ın [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) yazıcısını gözden geçirin. Fonksiyon görünürlüğünü ve erişim kontrollerini raporlar.
- Slither'ın [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) yazıcısını gözden geçirin. Durum değişkenlerinde erişim kontrollerini raporlar.

Kritik güvenlik özelliklerini belgeleyin ve bunları değerlendirmek için otomatik test oluşturucuları kullanın:

- [Kodunuz için güvenlik özelliklerini belgelemeyi](/developers/tutorials/guide-to-smart-contract-security-tools/) öğrenin. İlki kadar zordur, ancak iyi bir sonuç elde etmek için en önemli aktivitedir. Ayrıca bu öğreticideki gelişmiş tekniklerden herhangi birini kullanmak için bir ön koşuldur.
- [Echidna](https://github.com/crytic/echidna) ve [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html) ile kullanım için Solidity'de güvenlik özelliklerini tanımlayın. Durum makinenize, erişim kontrollerine, aritmetik işlemlere, harici etkileşimlere ve standart uygunluğuna odaklanın.
- [Slither'ın Python API'sı](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/) ile güvenlik özelliklerini belgeleyin. Kalıtım, değişken bağımlılıklar, erişim kontrolleri ve diğer yapısal konulara odaklanın.
- [Crytic](https://crytic.io) ile her taahhüt için özellik testlerinizi çalıştırın. Crytic, güvenlik özelliği testlerini kullanabilir ve değerlendirebilir, böylece ekibinizdeki herkes GitHub'dan geçtiklerini kolayca görebilir. Başarısız olan testler taahhütleri bloke edebilir.

Son olarak, otomatik araçların kolayca bulamayacağı sorunlara dikkat edin:

- Gizlilik eksikliği: Herkes havuzda sıraya girerken işlemlerinizi görebilir
- Front running işlemleri
- Kriptografik operasyonlar
- Harici DeFi bileşenleriyle riskli etkileşimler

## Yardım isteyin {#ask-for-help}

[Ethereum office hours](https://calendly.com/dan-trailofbits/ethereum-office-hours), (çalışma asatleri) her salı öğleden sonra gerçekleştirilir. Bu 1 saatlik 1'e 1 oturumlar, güvenlikle ilgili tüm sorularınızı bize sorma, araçlarımızı kullanarak sorun giderme ve mevcut yaklaşımınız hakkında uzmanlardan geri bildirim alma fırsatıdır. Bu rehberi tamamlamanıza yardımcı olacağız.

Slack'imize katılın: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw). Herhangi bir sorunuz olursa #crytic ve #ethereum kanallarında her zaman yanınızdayız.
