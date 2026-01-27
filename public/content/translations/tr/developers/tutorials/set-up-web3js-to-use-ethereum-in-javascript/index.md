---
title: "JavaScript'te Ethereum blok zincirini kullanmak için web3.js'yi kurun"
description: "JavaScript uygulamalarından Ethereum blokzinciri ile etkileşim kurmak için web3.js kütüphanesini nasıl kurup yapılandıracağınızı öğrenin."
author: "jdourlens"
tags: [ "web3.js", "javascript" ]
skill: beginner
lang: tr
published: 11.04.2020
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Bu öğreticide, Ethereum blokzinciri ile etkileşime geçmek için [web3.js](https://web3js.readthedocs.io/) ile nasıl başlayacağımızı göreceğiz. Web3.js, blokzincirden veri okumak veya işlem yapmak ve hatta akıllı sözleşmeleri dağıtmak için hem ön uçlarda hem de arka uçlarda kullanılabilir.

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

Artık kütüphaneyi projeye dahil ettiğimize göre onu başlatmamız gerekiyor. Projenizin blokzinciri ile iletişim kurabilmesi gerekiyor. Çoğu Ethereum kütüphanesi, RPC çağrıları aracılığıyla bir [düğüm](/developers/docs/nodes-and-clients/) ile iletişim kurar. Web3 sağlayıcımızı başlatmak için, kurucuya sağlayıcının URL'sini vererek bir Web3 örneği oluşturacağız. Bilgisayarınızda çalışan bir düğümünüz veya [ganache örneğiniz](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/) varsa, şuna benzer görünecektir:

```js
const web3 = new Web3("http://localhost:8545")
```

Barındırılan bir düğüme doğrudan erişmek isterseniz, [hizmet olarak düğümler](/developers/docs/nodes-and-clients/nodes-as-a-service) sayfasında seçenekleri bulabilirsiniz.

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

Bu programı çalıştırırsanız, en son blok numarasını yazdıracaktır: blokzincirinin en üstünü. Kodunuzda iç içe geri aramaları önlemek için `await/async` fonksiyon çağrılarını da kullanabilirsiniz:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

Web3 örneğinde kullanılabilen tüm fonksiyonları [resmi web3.js belgelerinde](https://docs.web3js.org/) görebilirsiniz.

Çoğu Web3 kütüphanesi eşzamansızdır çünkü arka planda kütüphane, sonucu geri gönderen düğüme JSON-RPC çağrıları yapar.

<Divider />

Tarayıcıda çalışıyorsanız, bazı cüzdanlar doğrudan bir Web3 örneği enjekte eder ve özellikle işlem yapmak için kullanıcının Ethereum adresiyle etkileşim kurmayı planlıyorsanız, mümkün olduğunca kullanmaya çalışmalısınız.

Bir MetaMask cüzdanının mevcut olup olmadığını tespit etmek ve varsa etkinleştirmeye çalışmak için gereken kod parçacığı aşağıdadır. Bu, daha sonra kullanıcının bakiyesini okumanıza ve Ethereum blokzincirinde yapmalarını istediğiniz işlemleri doğrulamalarına olanak tanır:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // Gerekirse hesap erişimi isteyin
    await window.ethereum.enable()
    // Hesaplar artık kullanıma açık
  } catch (error) {
    // Kullanıcı hesap erişimini reddetti...
  }
}
```

[Ethers.js](https://docs.ethers.io/) gibi web3.js alternatifleri de mevcuttur ve yaygın olarak kullanılmaktadır. Bir sonraki öğreticide, [blokzincirine gelen yeni blokları kolayca nasıl dinleyeceğimizi ve ne içerdiklerini nasıl göreceğimizi](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/) göreceğiz.
