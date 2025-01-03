---
title: JavaScript'te Ethereum blok zincirini kullanmak için web3.js'yi kurun
description: Solidity dilini kullanarak bir token'la etkileşmek için bir akıllı sözleşme nasıl kullanılır
author: "jdourlens"
tags:
  - "web3.js"
  - "javascript"
skill: beginner
lang: tr
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Bu öğreticide, Ethereum blok zinciri ile etkileşime geçmek için [web3.js](https://web3js.readthedocs.io/) ile nasıl başlayacağımızı göreceğiz. Web3.js, blok zincirinden veri okumak veya işlem yapmak ve hatta akıllı sözleşmeleri dağıtmak için hem ön uçlarda hem de arka uçlarda kullanılabilir.

İlk adım, projenize web3.js'yi dahil etmektir. Bir web sayfasında kullanmak için, JSDeliver gibi bir CDN kullanarak kütüphaneyi doğrudan içe aktarabilirsiniz.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

Arka ucunuzda kullanmak üzere kütüphaneyi veya derleme kullanan bir ön uç projesini kurmayı tercih ederseniz, onu npm kullanarak kurabilirsiniz:

```bash
npm install web3 --save
```

Ardından Web3.js'yi bir Node.js komut dosyasına veya Browserify ön uç projesine içe aktarmak için aşağıdaki JavaScript satırını kullanabilirsiniz:

```js
const Web3 = require("web3")
```

Şimdi projeye kütüphaneyi dahil ettiğimize göre, onu başlatmamız gerekiyor. Projenizin blok zinciri ile iletişim kurabilmesi gerekiyor. Çoğu Ethereum kütüphanesi bir [düğüm](/developers/docs/nodes-and-clients/) ile RPC çağrıları aracılığıyla iletişim kurar. Web3 sağlayıcımızı başlatmak için, sağlayıcının URL'sini yapıcı olarak geçen bir Web3 örneğini başlatacağız. Eğer bir düğümünüz veya [bilgisayarınızda çalışan bir ganache örneği](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/) varsa şu şekilde gözükecektir:

```js
const web3 = new Web3("http://localhost:8545")
```

Barındırılan bir düğüme doğrudan erişmek isterseniz, bununla ilgili seçenekleri [bir hizmet olarak düğümler](/developers/docs/nodes-and-clients/nodes-as-a-service) içinde bulabilirsiniz.

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

Web3 örneğimizi doğru şekilde yapılandırdığımızı test etmek için `getBlockNumber` fonksiyonunu kullanarak en son blok numarasını almaya çalışacağız. Bu fonksiyon parametre olarak bir geri aramayı kabul eder ve blok numarasını bir tamsayı olarak döndürür.

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

Bu programı çalıştırırsanız, sadece en son blok numarasını yazdıracaktır: blok zincirinin tepesi. Kodunuzda iç içe geri aramaları önlemek için `await/async` fonksiyon çağrılarını da kullanabilirsiniz:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

Web3 örneğinde kullanılabilen tüm fonksiyonları, [resmi web3.js belgelerinde](https://docs.web3js.org/) görebilirsiniz.

Web3 kütüphanelerinin çoğu eşzamansızdır çünkü arka planda kütüphane, sonucu geri gönderen düğüme JSON RPC çağrıları yapar.

<Divider />

Tarayıcıda çalışıyorsanız, bazı cüzdanlar doğrudan bir Web3 örneği enjekte eder ve özellikle işlem yapmak için kullanıcının Ethereum adresiyle etkileşim kurmayı planlıyorsanız, mümkün olduğunda onu kullanmaya çalışmalısınız.

İşte bir MetaMask cüzdanının mevcut olup olmadığını tespit etmek ve varsa onu etkinleştirmeye çalışmak için bir parçacık. Daha sonra, kullanıcının bakiyesini okumanıza ve Ethereum blok zincirinde yapmak istediğiniz işlemleri doğrulamalarına olanak tanır:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // Request account access if needed
    await window.ethereum.enable()
    // Accounts now exposed
  } catch (error) {
    // User denied account access...
  }
}
```

[Ethers.js](https://docs.ethers.io/) gibi web3.js alternatifleri de mevcuttur ve sıklıkla kullanılır. Bir sonraki öğreticide, [blok zincirindeki yeni gelen blokları kolayca nasıl dinleyeceğinizi ve neler içerdiklerini görmeyi öğreneceğiz](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/).
