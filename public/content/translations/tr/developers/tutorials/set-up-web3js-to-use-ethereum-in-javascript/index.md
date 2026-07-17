---
title: "JavaScript'te Ethereum blokzincirini kullanmak için web3.js'i kurun"
description: "JavaScript uygulamalarından Ethereum blokzinciri ile etkileşime geçmek için web3.js kütüphanesini nasıl kuracağınızı ve yapılandıracağınızı öğrenin."
author: "jdourlens"
tags:
  - web3.js
  - javascript
skill: beginner
breadcrumb: web3.js kurulumu
lang: tr
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Bu eğitimde, Ethereum blokzinciri ile etkileşime geçmek için [web3.js](https://web3js.readthedocs.io/)'e nasıl başlayacağımızı göreceğiz. Web3.js, blokzincirden veri okumak, işlemler yapmak ve hatta akıllı sözleşmeler dağıtmak için hem ön uçlarda (frontend) hem de arka uçlarda (backend) kullanılabilir.

İlk adım, web3.js'i projenize dahil etmektir. Bir web sayfasında kullanmak için, JSDeliver gibi bir CDN kullanarak kütüphaneyi doğrudan içe aktarabilirsiniz.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

Kütüphaneyi arka ucunuzda veya derleme (build) kullanan bir ön uç projesinde kullanmak üzere kurmayı tercih ederseniz, npm kullanarak kurabilirsiniz:

```bash
npm install web3 --save
```

Ardından Web3.js'i bir Node.js betiğine veya Browserify ön uç projesine içe aktarmak için aşağıdaki JavaScript satırını kullanabilirsiniz:

```js
const Web3 = require("web3")
```

Kütüphaneyi projeye dahil ettiğimize göre artık onu başlatmamız gerekiyor. Projenizin blokzincir ile iletişim kurabilmesi gerekir. Çoğu Ethereum kütüphanesi, RPC çağrıları aracılığıyla bir [düğüm](/developers/docs/nodes-and-clients/) ile iletişim kurar. Web3 sağlayıcımızı başlatmak için, sağlayıcının URL'sini kurucu (constructor) olarak geçirerek bir Web3 örneği oluşturacağız. Bilgisayarınızda çalışan bir düğüm veya [ganache örneğiniz](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/) varsa, şu şekilde görünecektir:

```js
const web3 = new Web3("http://localhost:8545")
```

Barındırılan bir düğüme doğrudan erişmek isterseniz, [hizmet olarak düğümler](/developers/docs/nodes-and-clients/nodes-as-a-service) üzerinde seçenekler bulabilirsiniz.

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

Web3 örneğimizi doğru yapılandırdığımızı test etmek için, `getBlockNumber` işlevini kullanarak en son blok numarasını almayı deneyeceğiz. Bu işlev, parametre olarak bir geri arama (callback) kabul eder ve blok numarasını bir tam sayı olarak döndürür.

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

Bu programı çalıştırırsanız, basitçe en son blok numarasını yazdıracaktır: blokzincirin en üstü. Kodunuzda iç içe geçmiş geri aramalardan kaçınmak için `await/async` işlev çağrılarını da kullanabilirsiniz:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

Web3 örneğinde mevcut olan tüm işlevleri [resmi web3.js belgelerinde](https://docs.web3js.org/) görebilirsiniz.

Çoğu Web3 kütüphanesi eşzamansızdır (asynchronous) çünkü arka planda kütüphane, sonucu geri gönderen düğüme JSON-RPC çağrıları yapar.

<Divider />

Tarayıcıda çalışıyorsanız, bazı cüzdanlar doğrudan bir Web3 örneği enjekte eder ve özellikle işlem yapmak için kullanıcının Ethereum adresiyle etkileşime geçmeyi planlıyorsanız, mümkün olduğunca bunu kullanmaya çalışmalısınız.

İşte bir MetaMask cüzdanının mevcut olup olmadığını tespit eden ve mevcutsa onu etkinleştirmeye çalışan kod parçacığı. Bu daha sonra kullanıcının bakiyesini okumanıza ve Ethereum blokzincirinde yapmalarını istediğiniz işlemleri doğrulamalarına olanak tanıyacaktır:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // Gerekirse hesap erişimi talep et
    await window.ethereum.enable()
    // Hesaplar artık erişilebilir
  } catch (error) {
    // Kullanıcı hesap erişimini reddetti...
  }
}
```

web3.js'e alternatif olarak [Ethers.js](https://docs.ethers.io/) gibi seçenekler de mevcuttur ve yaygın olarak kullanılır. Bir sonraki eğitimde [blokzincirine yeni gelen blokları nasıl kolayca dinleyeceğimizi ve neleri içerdiklerini göreceğiz](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/).