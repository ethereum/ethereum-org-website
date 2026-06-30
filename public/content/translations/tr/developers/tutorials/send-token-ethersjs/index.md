---
title: "ethers.js Kullanarak Token Gönderme"
description: "ethers.js kullanarak token göndermeye yönelik başlangıç dostu rehber."
author: Kim YongJun
tags: ["ETHERS.JS", "ERC-20", "TOKENLAR"]
skill: beginner
breadcrumb: "Token gönder"
lang: tr
published: 2021-04-06
---

## ethers.js(5.0) Kullanarak Token Gönderme {#send-token}

### Bu Eğitimde Neler Öğreneceksiniz {#you-learn-about}

- ethers.js'yi içe aktarma
- Token transfer etme
- Ağ trafiği durumuna göre gas fiyatı belirleme

### Başlarken {#to-get-started}

Başlamak için öncelikle ethers.js kütüphanesini JavaScript'imize aktarmalıyız
ethers.js v5'i dahil edin
### Kurulum {#install-ethersjs}

```shell
/home/ricmoo> npm install --save ethers
```

Tarayıcıda ES6

```html
<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"
  // Kodunuz buraya...
</script>
```

Tarayıcıda ES3(UMD)

```html
<script
  src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
  type="application/javascript"
></script>
```

### Parametreler {#param}

1. **`contract_address`**: Token sözleşme adresi (transfer etmek istediğiniz token Ether değilse sözleşme adresi gereklidir)
2. **`send_token_amount`**: Alıcıya göndermek istediğiniz miktar
3. **`to_address`**: Alıcının adresi
4. **`send_account`**: Gönderenin adresi
5. **`private_key`**: İşlemi imzalamak ve token'ları fiilen transfer etmek için gönderenin özel anahtarı

## Not {#notice}

`sendTransaction()` bunu dahili olarak yaptığı için `signTransaction(tx)` kaldırılmıştır.

## Gönderme Prosedürleri {#procedure}

### 1. Ağa bağlanma (test ağı) {#connect-to-network}

#### Sağlayıcıyı Ayarlama (Infura) {#set-provider}

Ropsten test ağına bağlanma

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. Cüzdan oluşturma {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. Cüzdanı ağa bağlama {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. Mevcut gas fiyatını alma {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // gasPrice
```

### 5. İşlemi Tanımlama {#define-transaction}

Aşağıda tanımlanan bu değişkenler `send_token()`'e bağlıdır

### İşlem parametreleri {#transaction-params}

1. **`send_account`**: token göndereninin adresi
2. **`to_address`**: token alıcısının adresi
3. **`send_token_amount`**: gönderilecek token miktarı
4. **`gas_limit`**: gaz limiti
5. **`gas_price`**: gas fiyatı

[Nasıl kullanılacağını görmek için aşağıya bakın](#how-to-use)

```javascript
const tx = {
  from: send_account,
  to: to_address,
  value: ethers.utils.parseEther(send_token_amount),
  nonce: window.ethersProvider.getTransactionCount(send_account, "latest"),
  gasLimit: ethers.utils.hexlify(gas_limit), // 100000
  gasPrice: gas_price,
}
```

### 6. Transfer {#transfer}

```javascript
walletSigner.sendTransaction(tx).then((transaction) => {
  console.dir(transaction)
  alert("Send finished!")
})
```

## Nasıl kullanılır {#how-to-use}

```javascript
let private_key =
  "41559d28e936dc92104ff30691519693fc753ffbee6251a611b9aa1878f12a4d"
let send_token_amount = "1"
let to_address = "0x4c10D2734Fb76D3236E522509181CC3Ba8DE0e80"
let send_address = "0xda27a282B5B6c5229699891CfA6b900A716539E6"
let gas_limit = "0x100000"
let wallet = new ethers.Wallet(private_key)
let walletSigner = wallet.connect(window.ethersProvider)
let contract_address = ""
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")

send_token(
  contract_address,
  send_token_amount,
  to_address,
  send_address,
  private_key
)
```

### Başarılı! {#success}

![image of transaction done successfully](./successful-transaction.png)

## send_token() {#send-token-method}

```javascript
function send_token(
  contract_address,
  send_token_amount,
  to_address,
  send_account,
  private_key
) {
  let wallet = new ethers.Wallet(private_key)
  let walletSigner = wallet.connect(window.ethersProvider)

  window.ethersProvider.getGasPrice().then((currentGasPrice) => {
    let gas_price = ethers.utils.hexlify(parseInt(currentGasPrice))
    console.log(`gas_price: ${gas_price}`)

    if (contract_address) {
      // genel Token gönderimi
      let contract = new ethers.Contract(
        contract_address,
        send_abi,
        walletSigner
      )

      // Kaç Token?
      let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
      console.log(`numberOfTokens: ${numberOfTokens}`)

      // Token gönder
      contract.transfer(to_address, numberOfTokens).then((transferResult) => {
        console.dir(transferResult)
        alert("sent token")
      })
    } // Ether gönderimi
    else {
      const tx = {
        from: send_account,
        to: to_address,
        value: ethers.utils.parseEther(send_token_amount),
        nonce: window.ethersProvider.getTransactionCount(
          send_account,
          "latest"
        ),
        gasLimit: ethers.utils.hexlify(gas_limit), // 100000
        gasPrice: gas_price,
      }
      console.dir(tx)
      try {
        walletSigner.sendTransaction(tx).then((transaction) => {
          console.dir(transaction)
          alert("Send finished!")
        })
      } catch (error) {
        alert("failed to send!!")
      }
    }
  })
}
```
