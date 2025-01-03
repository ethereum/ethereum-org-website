---
title: JavaScript'ten bir akıllı sözleşme çağırmak
description: Dai token'ı örneğini kullanarak JavaScript'ten bir akıllı sözleşme fonksiyonu nasıl çağrılır
author: jdourlens
tags:
  - "İşlemler"
  - "ön yüz"
  - "JavaScript"
  - "web3.js"
skill: beginner
lang: tr
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Bu öğreticide, JavaScript'ten bir [akıllı sözleşme](/developers/docs/smart-contracts/) fonksiyonunun nasıl çağrılacağını göreceğiz. İlk önce bir akıllı sözleşmenin durumunu okuyoruz (örneğin bir ERC20 sahibinin bakiyesi), ardından bir token transferi yaparak blok zincirinin durumunu değiştireceğiz. [Blok zinciri ile etkileşim kurmak için bir JavaScript ortamı kurmaya](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) önceden aşina olmalısınız.

Bu örnekler için DAI token'ını ele alacağız, test amacıyla ganache-cli kullanarak blok zincirini çatallayacağız ve zaten çok fazla DAI içeren bir adresin kilidini açacağız:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

Akıllı bir sözleşmeyle etkileşim kurmak için bir adrese ve ABI'ye ihtiyacımız olacak:

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

Bu proje için, sadece `balanceOf` ve `transfer` fonksiyonunu korumak için tam ERC20 ABI'den bazı şeyleri çıkardık, ancak [eksiksiz ERC20 ABI'ye buradan](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/) ulaşabilirsiniz.

Daha sonra akıllı sözleşmemizi somutlaştırmamız gerekiyor:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

Ayrıca iki adres kuracağız:

- transferi alacak olan ve
- zaten kilidini açtığımız, gönderecek olan:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

Sonraki bölümde, her iki adresin de tuttuğu mevcut token miktarını almak için `balanceOf` fonksiyonunu çağıracağız.

## Call: Bir akıllı sözleşmeden değer okuma {#call-reading-value-from-a-smart-contract}

İlk satır bir "sabit" yöntemi getirecek ve akıllı sözleşme yöntemini herhangi bir işlem göndermeden EVM'de çalıştıracaktır. Bunun için bir adresin ERC20 bakiyesini okuyacağız. [ERC20 token'ları hakkındaki makalemizi okuyun](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

ABI'yi sağladığınız somutlaştırılmış akıllı sözleşme yöntemlerine aşağıdaki şekilde erişebilirsiniz: `yourContract.methods.methodname`. `call` fonksiyonunu kullanarak fonksiyonu yürütmenin sonucunu alacaksınız.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occurred", err)
    return
  }
  console.log("The balance is: ", res)
})
```

DAI ERC20'nin 18 ondalık basamağa sahip olduğunu unutmayın; bu, doğru miktarı elde etmek için 18 sıfırı kaldırmanız gerektiği anlamına gelir. uint256, JavaScript büyük sayısal değerleri işlemediğinden dizgi olarak döndürülür. [JS'de büyük sayılarla nasıl başa çıkacağınızdan emin değilseniz, bignumber.js hakkındaki öğreticimize bakın](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## Send: Akıllı sözleşme fonksiyonuna bir işlem gönderme {#send-sending-a-transaction-to-a-smart-contract-function}

İkinci örnek için, ikinci adresimize 10 DAI göndermek için DAI akıllı sözleşmesinin transfer fonksiyonunu çağıracağız. Transfer fonksiyonu 2 parametreyi kabul eder: alıcı adres ve transfer edilcek token miktarı:

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("An error occurred", err)
      return
    }
    console.log("Hash of the transaction: " + res)
  })
```

Çağırma fonksiyonu, blok zincirine kazılacak işlemin hash değerini döndürür. Ethereum'da işlem hash değerleri tahmin edilebilirdir: Bu sayede işlem yapılmadan önce işlemin hash değerini alabiliriz ([hash değerinin nasıl hesaplandığını buradan öğrenebilirsiniz](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

Fonksiyon yalnızca işlemi blok zincirine gönderdiğinden, ne zaman çıkarıldığını ve blok zincirine dahil edildiğini öğrenene kadar sonucu göremeyiz. Bir sonraki öğreticide, [bir işlemin hash değerini öğrenerek işlemin blok zincirinde yürütülmesinin nasıl bekleneceğini](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) öğreneceğiz.
