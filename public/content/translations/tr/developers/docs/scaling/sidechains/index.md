---
title: Yan zincirler
description: "Şu anda Ethereum topluluğu tarafından kullanılan bir ölçeklendirme çözümü olarak yan zincirlere giriş."
lang: tr
sidebarDepth: 3
---

Yan zincir, Ethereum'dan bağımsız çalışan ve Ethereum Ana Ağı'na bir köprü ile bağlı olan ayrı bir blokzincirdir. Yan zincirler, ayrı blok parametrelerine ve genellikle işlemlerin verimli işlenmesi için tasarlanmış [mutabakat algoritmalarına](/developers/docs/consensus-mechanisms/) sahip olabilirler. Ethereum'un güvenlik özelliklerini taşımadığı için yan zincir kullanmanın artıları ve eksileri vardır. [Katman 2 ölçeklendirme çözümlerinin](/layer-2/) aksine, yan zincirler durum değişikliklerini ve işlem verilerini Ethereum Ana Ağı'na geri göndermezler.

Yan zincirler ayrıca yüksek verim elde etmek için bir miktar merkeziyetsizlik veya güvenlikten de ödün verir ([ölçeklenebilirlik üçlemi](https://vitalik.eth.limo/general/2021/05/23/scaling.html)). Ancak Ethereum, merkeziyetsizlik ve güvenlikten ödün vermeden ölçeklenmeye kararlıdır.

## Yan zincirler nasıl çalışır? {#how-do-sidechains-work}
Yan zincirler farklı geçmişleri, geliştirme yol haritaları ve tasarım hassasiyetleri olan bağımsız blokzincirlerdir. Yan zincir görünüşte Ethereum ile benzerlikler taşısa da birkaç ayırıcı özelliği vardır.

### Mutabakat algoritmaları {#consensus-algorithms}

Yan zincirleri özel yapan niteliklerden biri (yani Ethereum'dan farklı) kullandığı mutabakat algoritmasıdır. Yan zincirler mutabakat konusunda Ethereum'a dayanmadıkları için kendi ihtiyaçlarını karşılayan alternatif mutabakat protokollerini seçebilirler. Yan zincirler tarafından kullanılan bazı mutabakat algoritmaları şunlardır:

- [Otorite İspatı](/developers/docs/consensus-mechanisms/poa/)
- [Delege edilmiş hisse ispatı](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [Bizans hata toleransı](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained).

Ethereum gibi yan zincirler de işlemleri doğrulayan ve işleyen, bloklar üreten ve blokzincir durumunu depolayan doğrulama düğümlerine sahiptir. Doğrulayıcılar, mutabakatı ağ genelinde sürdürmek ve kötü niyetli saldırılara karşı korumakla yükümlüdür.

#### Blok parametreleri {#block-parameters}

Ethereum, [blok sürelerine](/developers/docs/blocks/#block-time) (yani, yeni bloklar üretmek için gereken süre) ve [blok boyutlarına](/developers/docs/blocks/#block-size) (yani, gaz cinsinden ifade edilen blok başına içerilen veri miktarı) sınırlar koyar. Bunun aksine yan zincirler, yüksek verimlilik, hızlı işlemler ve düşük ücret için genelde daha hızlı blok süreleri ve daha yüksek gaz limitleri gibi farklı parametreler kullanır.

Bunun bazı faydaları olsa da, ağın merkeziyetsizliği ve güvenliği açısından önemli sonuçları da vardır. Hızlı blok süreleri ve büyük blok boyutları gibi blok parametreleri, tam bir düğümü çalıştırmanın zorluğunu arttırır ve zincirin güvenliğinden birkaç "süper düğümü" sorumlu bırakır. Böyle bir senaryoda, doğrulayıcı danışıklı dövüşü veya zincirin kötü niyetli bir şekilde ele geçirilmesi olasılığı artar.

Blokzincirlerin merkeziyetsizliğe zarar vermeden ölçeklendirme yapması bir düğüm çalıştırmanın herkese açık olması gerekir; özel donanıma sahip taraflarla sınırlı olmamalıdır. Bu yüzden Ethereum ağında herkesin [tam bir düğüm çalıştırabilmesini](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node) sağlamak için çalışmalar devam etmektedir.

### EVM uyumluluğu {#evm-compatibility}

Bazı yan zincirler EVM uyumludur ve [Ethereum Sanal Makinesi (EVM)](/developers/docs/evm/) için geliştirilmiş sözleşmeleri yürütebilir. EVM uyumlu yan zincirler [Solidity dilinde yazılmış](/developers/docs/smart-contracts/languages/) akıllı sözleşmelerin yanı sıra diğer EVM akıllı sözleşme dillerini de destekler; bu da Ethereum Ana Ağı için yazılmış akıllı sözleşmelerin EVM uyumlu yan zincirlerde de çalışacağı anlamına gelir.

Bu, [merkeziyetsiz uygulamanızı](/developers/docs/dapps/) bir yan zincirde kullanmak istiyorsanız, [akıllı sözleşmenizi](/developers/docs/smart-contracts/) bu yan zincire dağıtmanızın yeterli olduğu anlamına gelir. Tıpkı Ana Ağ gibi görünür, hissettirir ve davranır; Solidity'de sözleşmeler yazarsınız ve zincirle RPC yan zincirleri aracılığıyla etkileşime girersiniz.

Yan zincirler EVM uyumlu olduğundan, Ethereum'a özgü merkeziyetsiz uygulamalar için kullanışlı bir [ölçeklendirme çözümü](/developers/docs/scaling/) olarak kabul edilirler. Merkeziyetsiz uygulamanız yan zincirdeyken kullanıcılar, özellikle de Ana Ağ tıkanmışsa daha düşük gaz ücretleri ve daha hızlı işlemlerden faydalanabilir.

Ancak önceden açıklandığı üzere, yan zincir kullanmanın önemli avantajları ve dezavantajları vardır. Her yan zincir kendi güvenliğinden sorumludur ve Ethereum'un güvenlik özelliklerini kullanmaz. Bu, kullanıcılarınızı etkileyebilecek ya da fonlarını riske atabilecek kötü niyetli davranış ihtimalini arttırır.

### Varlık hareketi {#asset-movement}

Ayrı bir blokzincirin Ethereum Ana Ağı'na bir yan zincir olması için varlıkların Ethereum Ana Ağı'na/Ağı'ndan transferlerini kolaylaştırma yeteneği olmalıdır. Bu Ethereum ile birlikte çalışabilirlik özelliği, bir blokzincir köprüsü kullanılarak elde edilir. [Köprüler](/bridges/), aralarındaki fon transferini kontrol etmek için Ethereum Ana Ağı'na ve bir yan zincire dağıtılmış akıllı sözleşmeleri kullanır.

Köprüler, kullanıcıların Ethereum ve yan zincir arasında fon taşımalarına yardımcı olsa da, varlıklar fiziksel olarak iki zincir arasında taşınmaz. Bunun yerine, zincirler arası değer aktarımı için genelde basım ve yakım içeren mekanizmalar kullanılır. [Köprülerin nasıl çalıştığı](/developers/docs/bridges/#how-do-bridges-work) hakkında daha fazlası.

## Yan zincirlerin avantajları ve dezavantajları {#pros-and-cons-of-sidechains}

| Artıları                                                                                                                                                                        | Eksileri                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Yan zincirlerin temelini oluşturan teknoloji köklüdür ve kapsamlı araştırmalar ile tasarım iyileştirmelerinden yararlanır.                                      | Yan zincirler, ölçeklenebilirliğe karşılık merkeziyetsizlik ve güven gerektirmezlikten bir miktar feragat eder.                                                                 |
| Yan zincirler genel hesaplamayı destekler ve EVM uyumluluğu sunar (yan zincirler Ethereum'a özgü merkeziyetsiz uygulamaları çalıştırabilir). | Yan zincirler, ayrı bir mutabakat mekanizması kullanır ve Ethereum'un güvenlik garantilerinden yararlanamaz.                                                                    |
| Yan zincirler, işlemleri etkin bir şekilde işlemek ve kullanıcılar için işlem ücretlerini azaltmak için farklı mutabakat modelleri kullanır.                    | Yan zincirler daha yüksek güven varsayımları gerektirir (örn. kötü niyetli yan zincir doğruyucularının bir çoğunluğu sahtekarlık yapabilir). |
| EVM uyumlu yan zincirler, merkeziyetsiz uygulamaların ekosistemlerini genişletmelerine izin verirler.                                                           |                                                                                                                                                                                                 |

### Yan Zincirleri Kullanın {#use-sidechains}

Merkeziyetsiz uygulamalarınıza entegre edebileceğiniz yan zincirlere ilişkin uygulamalar sağlayan birden çok proje mevcuttur:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain (eski adıyla xDai)](https://www.gnosischain.com/)
- [Loom Network](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## Daha fazla kaynak {#further-reading}

- [Yan Zincirler Aracılığıyla Ethereum Merkeziyetsiz Uygulamalarını Ölçeklendirme](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _8 Şubat 2018 - Georgios Konstantopoulos_

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_
