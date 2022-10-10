---
title: İyimser toplamalar
description: İyimser toplamalara giriş
lang: tr
---

## Ön koşullar {#prerequisites}

Temeli oluşturan tüm konuları iyi anlamalı ve [Ethereum ölçeklendirilmesi](/developers/docs/scaling/) konusunda ileri düzeyde bilgiye sahip olmalısınız. Toplamalar gibi ölçeklendirme çözümlerini uygulamak, teknoloji daha az savaşta test edildiğinden ve araştırılmaya ve geliştirilmeye devam ettiğinden ileri bir konudur.

Yeni başlayanlar için daha uygun bir kaynak mı arıyorsunuz? [Katman 2'ye giriş](/layer-2/) makalemize bakın.

## İyimser toplamalar {#optimistic-rollups}

İyimser toplamalar, katman 2'deki ana Ethereum zincirine paralel bir zeminde bulunur. Varsayılan olarak herhangi bir hesaplama yapmadıkları için ölçeklenebilirlikte iyileştirmeler sunabilirler. Bunun yerine bir işlemden sonra, yeni durumu Mainnet'e önerir veya işlemi "notere" tasdik ettirir.

İyimser toplamalarla, işlemler ana Ethereum zincirine `calldata` olarak yazılır ve gaz maliyetini azaltarak daha da optimize edilir.

Hesaplama, Ethereum kullanmanın yavaş ve pahalı kısmı olduğundan İyimser toplamalar, işleme bağlı olarak ölçeklenebilirlikte 10-100 kata kadar iyileştirme sunabilir. [Parça zincirlerin](/upgrades/sharding) kullanıma sunulmasıyla bu sayı daha da artacak çünkü bir işleme itiraz edildiğinde daha fazla veri mevcut olacak.

### İhtilaflı işlemler {#disputing-transactions}

İyimser toplamalar işlemi hesaplamaz, bu nedenle işlemlerin meşru ve hileli olmadığından emin olmak için bir mekanizma olması gerekir. Dolandırıcılık kanıtları da bu noktada devreye girer. Birisi hileli bir işlem fark ederse toplama, bir dolandırıcılık kanıtı yürütür ve mevcut durum verilerini kullanarak işlemin hesaplamasını çalıştırır. Bu, işlem sorgulanabileceğinden, işlem onayı için bir ZK-toplamasından daha uzun bekleme sürelerine sahip olabileceğiniz anlamına gelir.

![Ethereum'daki iyimser bir toplamada hileli bir işlem gerçekleştiğinde ne olduğunu gösteren diyagram](./optimistic-rollups.png)

Dolandırıcılık kanıtı hesaplamasını yapmak için ihtiyacınız olan gaz bile geri ödenir. Optimism'den Ben Jones, mevcut bağlama sistemini şöyle anlatıyor:

_Fonlarınızı güvence altına almak için sahtekârlık yaptığınızı kanıtlamanız gereken bir eylemde bulunabilecek herhangi biri, bir bono göndermenizi ister. Basitçe açıklamak gererkise biraz ETH alıp kitlersiniz ve "Hey, doğruyu söyleyeceğime söz veriyorum" dersiniz... Doğruyu söylemezsem ve sahtekârlık kanıtlanırsa bu para kesilecektir. Bu paranın bir kısmı kesilmekle kalmıyor, bir kısmı da insanların sahtekârlığı kanıtlamak için harcadıkları gazın bedelini öder_"

Böylece teşvikleri görebilirsiniz: katılımcılar dolandırıcılık yaptıkları için cezalandırılırlar ve sahtekârlığı kanıtladıkları için geri ödeme alırlar.

### Artıları ve eksileri {#optimistic-pros-and-cons}

| Artıları                                                                                                               | Eksileri                                                                                              |
| ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Ethereum katman 1'de yapabileceğiniz her şeyi, EVM ve Solidity uyumlu olduğu için İyimser toplamalarla yapabilirsiniz. | Potansiyel dolandırıcılık meydan okumaları nedeniyle zincir üstü işlemler için uzun bekleme süreleri. |
| Tüm işlem verileri, katman 1 zincirinde depolanır, bu da güvenli ve merkeziyetsiz olduğu anlamına gelir.               | Bir operatör, işlem sırasını etkileyebilir.                                                           |

### İyimser toplamaların görsel açıklaması {#optimistic-video}

Finematics'in iyimser toplamalar açıklamasını izleyin:

<YouTube id="7pWxCklcNsU" start="263" />

### İyimser toplamaları kullanın {#use-optimistic-rollups}

Dapp'lerinize entegre edebileceğiniz birden çok İyimser toplama uygulaması mevcuttur:

<RollupProductDevDoc rollupType="optimistic" />

**İyimser toplamalar hakkında bilgi**

- [Optimistik Toplama hakkında bilmeniz gereken her şey](https://research.paradigm.xyz/rollups)
- [EthHub'un iyimser toplamalar hakkındaki içerikleri](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/optimistic_rollups/)
- [Temel Arbitrum Rehberi](https://newsletter.banklesshq.com/p/the-essential-guide-to-arbitrum)
- [Optimism'in Toplaması aslında nasıl çalışıyor?](https://research.paradigm.xyz/optimism)
- [OVM Deep Dive](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
