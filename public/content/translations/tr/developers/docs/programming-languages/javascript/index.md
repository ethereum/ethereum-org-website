---
title: "JavaScript geliştiricileri için Ethereum"
description: "JavaScript tabanlı projeleri ve araçları kullanarak Ethereum için nasıl geliştirme yapacağınızı öğrenin."
lang: tr
---

JavaScript, temel protokol ilkellerinden üretim düzeyinde bir fikir birliği istemcisine kadar her şeyin JavaScript ve TypeScript uygulamalarının bulunduğu, Ethereum ekosistemindeki en popüler dillerden biridir.

[Yığının tüm seviyelerinde](/developers/docs/ethereum-stack/) JavaScript (veya ona yakın bir şey) yazma fırsatları vardır.

## Ethereum ile etkileşim kurun {#interact-with-ethereum}

### JavaScript API kütüphaneleri {#javascript-api-libraries}

Blokzinciri sorgulamak, işlemler göndermek ve daha fazlası için JavaScript yazmak istiyorsanız, bunu yapmanın en uygun yolu bir [JavaScript API kütüphanesi](/developers/docs/apis/javascript/) kullanmaktır. Bu API'ler, geliştiricilerin [Ethereum ağındaki düğümlerle](/developers/docs/nodes-and-clients/) kolayca etkileşim kurmasını sağlar.

Bu kütüphaneleri Ethereum üzerindeki akıllı sözleşmelerle etkileşim kurmak için kullanabilirsiniz, böylece önceden var olan sözleşmelerle etkileşim kurmak için sadece JavaScript kullandığınız bir merkeziyetsiz uygulama (dapp) oluşturmanız mümkündür.

**Göz atın**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _JavaScript ve TypeScript'te Ethereum cüzdan uygulaması ve araçlarını içerir._
- [viem](https://viem.sh) – _Ethereum ile etkileşim kurmak için düşük seviyeli durumsuz (stateless) ilkeller sağlayan Ethereum için bir TypeScript Arayüzü._
- [Drift](https://ryangoree.github.io/drift/) – _Web3 kütüphaneleri genelinde zahmetsiz Ethereum geliştirmesi için yerleşik önbelleğe alma, kancalar (hooks) ve test taklitleri (mocks) içeren bir TypeScript meta kütüphanesi._

### Akıllı sözleşmeler {#smart-contracts}

Eğer bir JavaScript geliştiricisiyseniz ve kendi akıllı sözleşmenizi yazmak istiyorsanız, [Solidity](https://solidity.readthedocs.io) ile tanışmak isteyebilirsiniz. Bu, en popüler akıllı sözleşme dilidir ve sözdizimsel olarak JavaScript'e benzer, bu da öğrenmesini kolaylaştırabilir.

[Akıllı sözleşmeler](/developers/docs/smart-contracts/) hakkında daha fazlası.

## Protokolü anlayın {#understand-the-protocol}

### Ethereum sanal makinesi {#the-ethereum-virtual-machine}

[Ethereum'un sanal makinesinin](/developers/docs/evm/) bir JavaScript uygulaması bulunmaktadır. En son çatallanma kurallarını destekler. Çatallanma kuralları, planlanan yükseltmelerin bir sonucu olarak EVM'de yapılan değişiklikleri ifade eder.

Daha iyi anlamak için inceleyebileceğiniz çeşitli JavaScript paketlerine ayrılmıştır:

- Hesaplar
- Bloklar
- Blokzincirin kendisi
- İşlemler
- Ve daha fazlası...

Bu, "bir hesabın veri yapısı nedir?" gibi şeyleri anlamanıza yardımcı olacaktır.

Eğer kod okumayı tercih ediyorsanız, bu JavaScript belgelerimizi okumaya harika bir alternatif olabilir.

**EVM'ye göz atın**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### Düğümler ve istemciler {#nodes-and-clients}

[Lodestar](https://lodestar.chainsafe.io/), TypeScript ile yazılmış ve ChainSafe tarafından sürdürülen, üretime hazır bir fikir birliği istemcisidir. Bir işaret düğümü ve doğrulayıcı istemcisi içerir ve Ethereum'un Hisse Kanıtı mutabakatının bildiğiniz bir dilde nasıl çalıştığını görmek için iyi bir yerdir.

**Lodestar'a göz atın**  
[`ChainSafe/lodestar`](https://github.com/ChainSafe/lodestar)

Yürütme tarafında, EthereumJS istemcisi kullanımdan kaldırılmış ve arşivlenmiştir, ancak kaynak kodu bir Ethereum istemcisinin JavaScript'te nasıl çalıştığını keşfetmek için hala mevcuttur.

**Arşivlenmiş istemciye göz atın**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/archive/client)

## Diğer projeler {#other-projects}

Ethereum JavaScript dünyasında ayrıca aşağıdakiler de dahil olmak üzere pek çok başka şey olmaktadır:

- cüzdan araçları kütüphaneleri.
- Ethereum anahtarları oluşturmak, içe ve dışa aktarmak için araçlar.
- Ethereum Sarı Bülten'inde ana hatları çizilen bir veri yapısı olan `merkle-patricia-tree` uygulaması.

[EthereumJS deposunda](https://github.com/ethereumjs) en çok ilginizi çeken şeyi inceleyin

## Daha fazla okuma {#further-reading}

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve ekleyin!_
