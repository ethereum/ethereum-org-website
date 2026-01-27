---
title: "Javascript geliştiricileri için Ethereum"
description: "JavaScript tabanlı projeler ve araçlarla nasıl Ethereum için geliştireceğinizi öğrenin."
lang: tr
---

JavaScript, Ethereum ekosistemindeki en popüler diller arasındadır. Aslında, Ethereum'u mümkün olduğunca JavaScript'e getirmeye adanmış bir [ekip](https://github.com/ethereumjs) var.

Yığının [her seviyesinde](/developers/docs/ethereum-stack/) JavaScript (veya benzeri bir şey) yazma fırsatları bulunur.

## Ethereum ile Etkileşim {#interact-with-ethereum}

### JavaScript API Kütüphaneleri {#javascript-api-libraries}

Blokzincirini sorgulamak, işlem göndermek ve daha fazlası için JavaScript yazmak isterseniz, bunu yapmanın en uygun yolu bir [JavaScript API kütüphanesi](/developers/docs/apis/javascript/) kullanmaktır. Bu API'ler, geliştiricilerin [Ethereum ağındaki düğümlerle](/developers/docs/nodes-and-clients/) kolayca etkileşim kurmasına olanak tanır.

Bu kütüphaneleri Ethereum'daki akıllı sözleşmelerle etkileşim kurmak için kullanabilirsiniz, böylece önceden var olan sözleşmelerle etkileşim kurmak için JavaScript'i kullandığınız merkeziyetsiz bir uygulama oluşturmak mümkündür.

**Göz atın**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _JavaScript ve TypeScript'te Ethereum cüzdanı uygulaması ve yardımcı programlarını içerir._
- [viem](https://viem.sh) – _Ethereum ile etkileşime geçmek için düşük seviyeli, durumsuz temeller sağlayan, Ethereum için bir TypeScript Arayüzü._
- [Drift](https://ryangoree.github.io/drift/) – _web3 kütüphaneleri genelinde zahmetsiz Ethereum geliştirmesi için yerleşik önbelleğe alma, kancalar ve test taklitleri içeren bir TypeScript meta kütüphanesi._

### Akıllı sözleşmeler {#smart-contracts}

Bir JavaScript geliştiricisiyseniz ve kendi akıllı sözleşmenizi yazmak istiyorsanız [Solidity](https://solidity.readthedocs.io) ile tanışmak isteyebilirsiniz. Bu en popüler akıllı sözleşme dilidir ve sözdizimsel olarak JavaScript'e benzer, bu da öğrenmeyi kolaylaştırabilir.

[Akıllı sözleşmeler](/developers/docs/smart-contracts/) hakkında daha fazlası.

## Protokolü Anlamak {#understand-the-protocol}

### Ethereum Sanal Makinesi {#the-ethereum-virtual-machine}

[Ethereum'un sanal makinesinin](/developers/docs/evm/) bir JavaScript uygulaması mevcuttur. Bu uygulama, en güncel çatallanma kurallarını destekler. Çatallanma kuralları, planlanan yükseltmelerin bir sonucu olarak EVM'de yapılan değişiklikleri ifade eder.

Daha iyi anlamak için kontrol edebileceğiniz çeşitli JavaScript paketlerine ayrılmıştır:

- Hesaplar
- Bloklar
- Blok zincirinin kendisi
- İşlemler
- Ve daha fazlası...

Bu, "bir hesabın veri yapısının ne olduğu" gibi şeyleri anlamanıza yardımcı olacaktır.

Kodu okumayı tercih ediyorsanız, JavaScript belgelerimizi okumak sizin için harika bir alternatif olabilir.

**EVM'ye göz atın**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### Düğümler ve İstemciler {#nodes-and-clients}

Ethereum istemcilerinin nasıl çalıştığını anladığınız bir dilde inceleyebileceğiniz bir Ethereumjs istemcisi geliştirilmektedir; JavaScript!

**İstemciye göz atın**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## Diğer Projeler {#other-projects}

Ethereum JavaScript alanında aşağıdakiler de dahil olmak üzere pek çok başka şey oluyor:

- cüzdan yardımcı programlarının kütüphaneleri.
- Ethereum anahtarları oluşturmak, bunları içe ve dışa aktarmak için araçlar.
- Ethereum sarı bülteninde ana hatları verilen `merkle-patricia-tree` veri yapısının bir uygulaması.

[EthereumJS deposunda](https://github.com/ethereumjs) en çok ilginizi çeken şeyleri inceleyin

## Daha fazla kaynak {#further-reading}

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_
