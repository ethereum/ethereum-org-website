---
title: Yan Zincirler
description: "Ethereum topluluğu tarafından halihazırda kullanılan bir ölçeklendirme çözümü olarak yan zincirlere giriş."
lang: tr
sidebarDepth: 3
---

Bir yan zincir, [Ethereum](/)'dan bağımsız çalışan ve Ethereum Ana Ağı'na iki yönlü bir köprü ile bağlanan ayrı bir blokzincirdir. Yan zincirler, genellikle işlemlerin verimli bir şekilde işlenmesi için tasarlanmış ayrı blok parametrelerine ve [mutabakat algoritmalarına](/developers/docs/consensus-mechanisms/) sahip olabilir. Ancak, Ethereum'un güvenlik özelliklerini devralmadıkları için bir yan zincir kullanmak bazı ödünler vermeyi gerektirir. [Katman 2 (l2) ölçeklendirme çözümlerinin](/layer-2/) aksine, yan zincirler durum değişikliklerini ve işlem verilerini Ethereum Ana Ağı'na geri göndermez.

Yan zincirler ayrıca yüksek işlem kapasitesi elde etmek için bir miktar merkeziyetsizlikten veya güvenlikten fedakarlık eder ([ölçeklenebilirlik üçlemi](https://vitalik.eth.limo/general/2021/05/23/scaling.html)). Ancak Ethereum, merkeziyetsizlik ve güvenlikten ödün vermeden ölçeklenmeye kararlıdır.

## Yan zincirler nasıl çalışır? {#how-do-sidechains-work}

Yan zincirler; farklı geçmişlere, geliştirme yol haritalarına ve tasarım hususlarına sahip bağımsız blokzincirlerdir. Bir yan zincir Ethereum ile yüzeysel bazı benzerlikler paylaşsa da, çeşitli ayırt edici özelliklere sahiptir.

### Mutabakat algoritmaları {#consensus-algorithms}

Yan zincirleri benzersiz (yani Ethereum'dan farklı) kılan özelliklerden biri, kullanılan mutabakat algoritmasıdır. Yan zincirler mutabakat için Ethereum'a güvenmez ve ihtiyaçlarına uygun alternatif mutabakat protokolleri seçebilirler. Yan zincirlerde kullanılan mutabakat algoritmalarından bazı örnekler şunlardır:

- [Yetki kanıtı](/developers/docs/consensus-mechanisms/poa/)
- [Temsili hisse kanıtı](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [Bizans hata toleransı](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained).

Ethereum gibi, yan zincirlerin de işlemleri doğrulayan ve işleyen, bloklar üreten ve blokzincir durumunu depolayan doğrulayıcı düğümleri vardır. Doğrulayıcılar ayrıca ağ genelinde mutabakatı sürdürmekten ve ağı kötü niyetli saldırılara karşı güvence altına almaktan sorumludur.

#### Blok parametreleri {#block-parameters}

Ethereum, [blok sürelerine](/developers/docs/blocks/#block-time) (yani yeni bloklar üretmek için geçen süre) ve [blok boyutlarına](/developers/docs/blocks/#block-size) (yani blok başına gaz cinsinden ifade edilen veri miktarı) sınırlar koyar. Aksine, yan zincirler yüksek işlem kapasitesi, hızlı işlemler ve düşük ücretler elde etmek için genellikle daha hızlı blok süreleri ve daha yüksek gaz limitleri gibi farklı parametreler benimser.

Bunun bazı faydaları olsa da, ağın merkeziyetsizliği ve güvenliği açısından kritik sonuçları vardır. Hızlı blok süreleri ve büyük blok boyutları gibi blok parametreleri, tam düğüm çalıştırmanın zorluğunu artırır ve zinciri güvence altına alma sorumluluğunu birkaç "süper düğüme" bırakır. Böyle bir senaryoda, doğrulayıcıların gizli anlaşma yapma veya zincirin kötü niyetli bir şekilde ele geçirilme olasılığı artar.

Blokzincirlerin merkeziyetsizliğe zarar vermeden ölçeklenebilmesi için, bir düğüm çalıştırmak sadece özel donanıma sahip taraflara değil, herkese açık olmalıdır. Bu nedenle, herkesin Ethereum ağında [tam düğüm çalıştırabilmesini](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node) sağlamak için çalışmalar devam etmektedir.

### EVM uyumluluğu {#evm-compatibility}

Bazı yan zincirler EVM uyumludur ve [Ethereum Sanal Makinesi (EVM)](/developers/docs/evm/) için geliştirilen sözleşmeleri yürütebilir. EVM uyumlu yan zincirler, diğer EVM akıllı sözleşme dillerinin yanı sıra [Solidity ile yazılmış](/developers/docs/smart-contracts/languages/) akıllı sözleşmeleri de destekler; bu da Ethereum Ana Ağı için yazılmış akıllı sözleşmelerin EVM uyumlu yan zincirlerde de çalışacağı anlamına gelir.

Bu, [merkeziyetsiz uygulamanızı (dapp)](/developers/docs/dapps/) bir yan zincirde kullanmak isterseniz, tek yapmanız gerekenin [akıllı sözleşmenizi](/developers/docs/smart-contracts/) bu yan zincire dağıtmak olduğu anlamına gelir. Tıpkı Ana Ağ gibi görünür, hissettirir ve davranır; sözleşmeleri Solidity'de yazar ve yan zincirlerin RPC'si aracılığıyla zincirle etkileşime girersiniz.

Yan zincirler EVM uyumlu oldukları için, Ethereum'a özgü dapp'ler için faydalı bir [ölçeklendirme çözümü](/developers/docs/scaling/) olarak kabul edilirler. Dapp'inizin bir yan zincirde olmasıyla, özellikle Ana Ağ tıkalıysa, kullanıcılar daha düşük gaz ücretlerinden ve daha hızlı işlemlerden yararlanabilirler.

Ancak, daha önce açıklandığı gibi, bir yan zincir kullanmak önemli ödünler vermeyi gerektirir. Her yan zincir kendi güvenliğinden sorumludur ve Ethereum'un güvenlik özelliklerini devralmaz. Bu, kullanıcılarınızı etkileyebilecek veya fonlarını riske atabilecek kötü niyetli davranış olasılığını artırır.

### Varlık hareketi {#asset-movement}

Ayrı bir blokzincirin Ethereum Ana Ağı'na bir yan zincir olabilmesi için, Ethereum Ana Ağı'na ve Ana Ağ'dan varlık transferini kolaylaştırma yeteneğine sahip olması gerekir. Ethereum ile bu birlikte çalışabilirlik, bir blokzincir köprüsü kullanılarak elde edilir. [Köprüler](/bridges/), aralarındaki fon köprülemesini kontrol etmek için Ethereum Ana Ağı'na ve bir yan zincire dağıtılmış akıllı sözleşmeleri kullanır.

Köprüler, kullanıcıların Ethereum ve yan zincir arasında fon taşımasına yardımcı olsa da, varlıklar iki zincir arasında fiziksel olarak taşınmaz. Bunun yerine, zincirler arasında değer aktarımı için genellikle basım ve yakım içeren mekanizmalar kullanılır. [Köprülerin nasıl çalıştığı](/developers/docs/bridges/#how-do-bridges-work) hakkında daha fazla bilgi.

## Yan zincirlerin artıları ve eksileri {#pros-and-cons-of-sidechains}

| Artıları                                                                                                                        | Eksileri                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Yan zincirlerin temelini oluşturan teknoloji köklüdür ve kapsamlı araştırmalardan ve tasarımdaki iyileştirmelerden yararlanır. | Yan zincirler, ölçeklenebilirlik için bir miktar merkeziyetsizlikten ve güven gereksinimsizliğinden ödün verir.                          |
| Yan zincirler genel hesaplamayı destekler ve EVM uyumluluğu sunar (Ethereum'a özgü dapp'leri çalıştırabilirler).                    | Bir yan zincir ayrı bir mutabakat mekanizması kullanır ve Ethereum'un güvenlik garantilerinden yararlanmaz.         |
| Yan zincirler, işlemleri verimli bir şekilde işlemek ve kullanıcılar için işlem ücretlerini düşürmek amacıyla farklı mutabakat modelleri kullanır.         | Yan zincirler daha yüksek güven varsayımları gerektirir (örneğin, kötü niyetli yan zincir doğrulayıcılarından oluşan bir çoğunluk dolandırıcılık yapabilir). |
| EVM uyumlu yan zincirler, dapp'lerin ekosistemlerini genişletmelerine olanak tanır.                                                            |                                                                                                                  |

### Yan Zincirleri Kullanın {#use-sidechains}

Birden fazla proje, dapp'lerinize entegre edebileceğiniz yan zincir uygulamaları sunar:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain (eski adıyla xDai)](https://www.gnosischain.com/)
- [Loom Network](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## Daha fazla bilgi {#further-reading}

- [Yan Zincirler aracılığıyla Ethereum dapp'lerini Ölçeklendirme](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _8 Şub 2018 - Georgios Konstantopoulos_

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve ekleyin!_