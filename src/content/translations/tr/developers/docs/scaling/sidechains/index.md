---
title: Yan zincirler
description: Şu anda Ethereum topluluğu tarafından kullanılan bir ölçeklendirme çözümü olarak yan zincirlere giriş.
lang: tr
incomplete: true
sidebarDepth: 3
---

Yan zincir, Ethereum Mainnet'e paralel olarak çalışan ve bağımsız olarak çalışan ayrı bir blok zinciridir. Kendi [mutabakat algoritmasına](/developers/docs/consensus-mechanisms/) sahiptir (örn. [yetki ispatı](https://wikipedia.org/wiki/Proof_of_authority), [Delege edilmiş stake ispatı](https://en.bitcoinwiki.org/wiki/DPoS), [Bizans hata toleransı](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained)). Mainnet'e iki yönlü bir köprü ile bağlanır.

Yan zincirlere dair özellikle heyecan verici olan şey, [EVM](/developers/docs/evm/)'yi temel aldığı için zincirin ana Ethereum zinciriyle aynı şekilde çalışmasıdır. Ethereum kullanmaz, bizzat Ethereum'dur. Bu, [dapp](/developers/docs/dapps/)'inizi bir yan zincirde kullanmak istiyorsanız, yalnızca kodunuzu bu yan zincire dağıtmanız gerektiği anlamına gelir. Tıpkı Mainnet gibi görünür, hissettirir ve hareket eder: Solidity'de sözleşmeler yazarsınız ve Web3 API aracılığıyla zincirle etkileşime girersiniz.

## Ön koşullar {#prerequisites}

Temeli oluşturan tüm konuları iyi anlamalı ve [Ethereum ölçeklendirilmesi](/developers/docs/scaling/) konusunda ileri düzeyde bilgiye sahip olmalısınız.

## Artıları ve eksileri {#pros-and-cons}

| Artıları                                       | Eksileri                                                                                                      |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Yaygın olarak kullanılan teknoloji.            | Daha az merkeziyetsiz.                                                                                        |
| Genel hesaplamayı, EVM uyumluluğunu destekler. | Ayrı bir mutabakat mekanizması kullanır. Katman 1 tarafından korunmaz (yani teknik olarak katman 2 değildir). |
|                                                | Yan zincir doğrulayıcılarının çoğunluğu dolandırıcılık yapabilir.                                             |

### Yan zincirler kullanın {#use-sidechains}

Birden çok proje, dapp'lerinize entegre edebileceğiniz yan zincirlerin uygulamalarını sağlar:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain (eskiden xDai)](https://www.xdaichain.com/)

## Daha fazla bilgi {#further-reading}

- [EthHub'un yan zincirler hakkındaki içerikleri](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/sidechains/)
- [Ethereum Dapp'lerinin Yan Zincirler Üzerinden Ölçeklendirilmesi](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _8 Şubat 2018 - Georgios Konstantopoulos_

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_
