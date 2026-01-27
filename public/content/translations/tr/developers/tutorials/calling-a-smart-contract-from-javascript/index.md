---
title: JavaScript'ten bir akıllı sözleşme çağırmak
description: Dai jetonu örneğini kullanarak JavaScript'ten bir akıllı sözleşme işlevi nasıl çağrılır
author: jdourlens
tags: [ "işlemler", "ön uç", "JavaScript", "web3.js" ]
skill: beginner
lang: tr
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Bu öğreticide, JavaScript'ten bir [akıllı sözleşme](/developers/docs/smart-contracts/) işlevinin nasıl çağrılacağını göreceğiz. İlk olarak bir akıllı sözleşmenin durumunu okuyacağız (örneğin bir ERC20 sahibinin bakiyesi), ardından bir jeton transferi yaparak blokzincirin durumunu değiştireceğiz. [Blokzincir ile etkileşim kurmak için bir JS ortamı kurma](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) konusuna zaten aşina olmalısınız.

Bu örnek için DAI jetonu ile oynayacağız, test amacıyla ganache-cli kullanarak blokzinciri çatallayacağız ve halihazırda çok fazla DAI'si olan bir adresin kilidini açacağız:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[INFURA ANAHTARINIZ] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

Bir akıllı sözleşme ile etkileşim kurmak için adresine ve ABI'sine ihtiyacımız olacak:

```js
const ERC20TransferABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
]

const DAI_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f"
```

Bu proje için, yalnızca `balanceOf` ve `transfer` işlevini tutmak üzere ERC20 ABI'sinin tamamını çıkardık, ancak [tam ERC20 ABI'sini burada](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/) bulabilirsiniz.

Daha sonra akıllı sözleşmemizin bir örneğini oluşturmamız gerekiyor:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

Ayrıca iki adres ayarlayacağız:

- transferi alacak olan ve
- zaten kilidini açtığımız, gönderecek olan:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

Sonraki bölümde, her iki adresin de sahip olduğu mevcut jeton miktarını almak için `balanceOf` işlevini çağıracağız.

## Çağrı: Akıllı sözleşmeden değer okuma {#call-reading-value-from-a-smart-contract}

İlk örnek, "sabit" bir metodu çağıracak ve akıllı sözleşme metodunu herhangi bir işlem göndermeden EVM'de yürütecektir. Bunun için bir adresin ERC20 bakiyesini okuyacağız. [ERC20 jetonları hakkındaki makalemizi okuyun](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

ABI'sini sağladığınız, örneği oluşturulmuş bir akıllı sözleşmenin metotlarına şu şekilde erişebilirsiniz: `yourContract.methods.methodname`. `call` işlevini kullanarak, işlevi yürütmenin sonucunu alırsınız.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("Bir hata oluştu", err)
    return
  }
  console.log("Bakiye: ", res)
})
```

DAI ERC20'nin 18 ondalık basamağa sahip olduğunu unutmayın; bu, doğru miktarı elde etmek için 18 sıfırı kaldırmanız gerektiği anlamına gelir. JavaScript büyük sayısal değerleri işlemediğinden `uint256` değerleri dizge olarak döndürülür. JS'de büyük sayılarla nasıl başa çıkacağınızdan emin değilseniz, [bignumber.js hakkındaki öğreticimize göz atın](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## Gönderme: Bir akıllı sözleşme işlevine işlem gönderme {#send-sending-a-transaction-to-a-smart-contract-function}

İkinci örnek için, ikinci adresimize 10 DAI göndermek üzere DAI akıllı sözleşmesinin transfer işlevini çağıracağız. Transfer işlevi iki parametre kabul eder: alıcı adresi ve transfer edilecek jeton miktarı:

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("Bir hata oluştu", err)
      return
    }
    console.log("İşlemin karması: " + res)
  })
```

Çağrı işlevi, blokzincire kazılacak olan işlemin karmasını döndürür. Ethereum'da, işlem karmaları tahmin edilebilirdir - bu sayede, bir işlemin karmasını daha yürütülmeden alabiliriz ([karmaların nasıl hesaplandığını buradan öğrenin](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

İşlev, işlemi yalnızca blokzincire gönderdiğinden, ne zaman kazıldığını ve blokzincire dahil edildiğini bilene kadar sonucu göremeyiz. Sonraki öğreticide, [karmasını bilerek bir işlemin blokzincirde yürütülmesini nasıl bekleyeceğimizi](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) öğreneceğiz.
