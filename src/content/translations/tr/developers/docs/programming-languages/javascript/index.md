---
title: JavaScript Geliştiricileri için Ethereum
description: JavaScript tabanlı projeler ve araçlarla nasıl Ethereum için geliştireceğinizi öğrenin.
lang: tr
---

JavaScript, Ethereum ekosistemindeki en popüler diller arasındadır. Hatta Ethereum'u mümkün olduğunca JavaScript'e taşımaya adanmış bir [ekip](https://github.com/ethereumjs) bulunuyor.

Yığının her seviyesinde JavaScript (veya benzer bir şey) yazma [fırsatları bulunur](/developers/docs/ethereum-stack/).

## Ethereum ile etkileşime gir {#interact-with-ethereum}

### JavaScript API kütüphaneleri {#javascript-api-libraries}

Eğer blok zincirini sorgulamak için JavaScript yazmak isterseniz, işlemleri göndermenin ve daha fazlasını yapmanın en uygun yolu bir [JavaScript API kütüphanesi kullanmaktır](/developers/docs/apis/javascript/). Bu API'ler, geliştiricilerin [ Ethereum ağındaki düğümlerle](/developers/docs/nodes-and-clients/) kolayca etkileşim kurmasına olanak tanır.

Bu kütüphaneleri Ethereum'daki akıllı sözleşmelerle etkileşim kurmak için kullanabilirsiniz, böylece önceden var olan sözleşmelerle etkileşim kurmak için JavaScript'i kullandığınız merkeziyetsiz bir uygulama oluşturmak mümkündür.

**Göz atın**

- [Web3.js](https://web3js.readthedocs.io/)
- [Ethers.js](https://docs.ethers.io/) _– JavaScript ve TypeScript'te Ethereum cüzdan uygulamasına yardımcı araçları içerir._

### Akıllı sözleşmeler {#smart-contracts}

Kendi akıllı sözleşmenizi yazmak isteyen bir JavaScript geliştiricisiyseniz, [Solidity'ye](https://solidity.readthedocs.io) aşina olmak isteyebilirsiniz. Bu en popüler akıllı sözleşme dilidir ve sözdizimsel olarak JavaScript'e benzer, bu da öğrenmeyi kolaylaştırabilir.

[Akıllı sözleşmeler](/developers/docs/smart-contracts/) hakkında daha fazla bilgi.

## Protokolü anlamak {#understand-the-protocol}

### Ethereum sanal makinesi {#the-ethereum-virtual-machine}

[Ethereum'un sanal makinesinin](/developers/docs/evm/) bir JavaScript uygulaması bulunuyor. Bu uygulama, en güncel çatallanma kurallarını destekler. Çatallanma kuralları, planlanan yükseltmelerin bir sonucu olarak EVM'de yapılan değişiklikleri ifade eder.

Daha iyi anlamak için kontrol edebileceğiniz çeşitli JavaScript paketlerine ayrılmıştır:

- Hesaplar
- Bloklar
- Blok zincirinin kendisi
- İşlemler
- Ve daha fazlası...

Bu, "bir hesabın veri yapısının ne olduğu" gibi şeyleri anlamanıza yardımcı olacaktır.

Kodu okumayı tercih ediyorsanız, JavaScript belgelerimizi okumak sizin için harika bir alternatif olabilir.

**Şu monorepo'ya (tek depo) göz atın:**  
[`ethereumjs`](https://github.com/ethereumjs/ethereumjs-vm)

### Düğümler ve istemciler {#nodes-and-clients}

Geliştirme aşamasında bir Ethereumjs istemcisi bulunuyor. Bu, anladığınız bir dilde Ethereum istemcilerinin nasıl çalıştığını incelemenizi sağlayacaktır.

**Şu istemciye göz atın:**  
[`ethereumjs-client`](https://github.com/ethereumjs/ethereumjs-client)

## Diğer projeler {#other-projects}

Ethereum JavaScript alanında aşağıdakiler de dahil olmak üzere pek çok başka şey oluyor:

- cüzdan yardımcı programlarının kütüphaneleri.
- Ethereum anahtarları oluşturmak, bunları içe ve dışa aktarmak için araçlar.
- Ethereum sarı kağıdında açıklanan `merkle-patricia-tree` veri yapısının bir uygulaması.

[EthereumJS deposunda](https://github.com/ethereumjs) en çok ilginizi çeken şeyleri inceleyin

## Daha fazla bilgi {#further-reading}

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_
