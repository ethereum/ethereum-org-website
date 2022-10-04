---
title: Validium
description: Şu anda Ethereum topluluğu tarafından kullanılan bir ölçeklendirme çözümü olarak Validium'a giriş.
lang: tr
incomplete: true
sidebarDepth: 3
---

[ZK-rolluplar](/developers/docs/scaling/zk-rollups/) gibi doğruluk ispatlarını kullanırlar fakat veri, Ethereum katman 1 zincirinde depolanmaz. Bu, her bir validium zinciri başına saniyede 10 bin işlem yapılabilmesini ve birden çok zincirle birlikte paralel olarak çalışabilmesine olanak sağlar.

## Ön koşullar {#prerequisites}

Temeli oluşturan tüm konuları iyi anlamalı ve [Ethereum ölçeklendirilmesi](/developers/docs/scaling/) konusunda ileri düzeyde bilgiye sahip olmalısınız. Validium gibi ölçeklendirme çözümlerini yürürlüğe koymak teknoloji az test edildiği, araştırıldığı ve geliştirildiği için ileri seviye bir konudur.

## Artıları ve eksileri {#pros-and-cons}

| Artıları                                                                                                                                            | Eksileri                                                                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Para çekme gecikmesi yok (zincir/zincirler arası işlem gecikmesi yok); sonuç olarak daha fazla sermaye verimliliği sunar.                           | Genel hesaplama/akıllı sözleşmeler için sınırlı destek sunarlar; özelleşmiş diller gerekir.                                                                       |
| Yüksek değere sahip uygulamalarda kullanılan, dolandırıcılık kanıtı bazlı sistemler gibi belirli ekonomik saldırılara karşı savunmasız değillerdir. | ZK kanıtları oluşturmak için gereken yüksek hesaplama gücü; düşük verimli uygulamalar için uygun maliyetli değildir.                                              |
|                                                                                                                                                     | Daha yavaş öznel kesinlik süresi (bir ZK kanıtı oluşturmak için 10-30 dakika) (ancak anlaşmazlık süresi gecikmesi olmadığı için tam kesinliğe daha hızlı ulaşır). |
|                                                                                                                                                     | Bir kanıt oluşturmak, zincir dışı verilerin her zaman erişilebilir olmasını gerektirir.                                                                           |

### Validium'u kullanın {#use-validium}

Birçok proje, dapp'lerinize entegre edebileceğiniz Validium uygulamalarını sağlar:

- [Starkware](https://starkware.co/)
- [Matter Labs zkPorter](https://matter-labs.io/)

## Daha fazla bilgi {#further-reading}

- [Validium ve Katman 2 Yan Yana — Issue No. 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_
