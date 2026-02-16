---
title: "ethers.js Kullanarak Jeton Gönderme"
description: "Yeni başlayanlar için ethers.js kullanarak jeton gönderme rehberi."
author: Kim YongJun
tags: ["ETHERS.JS", "ERC-20", "TOKENS"]
skill: beginner
lang: tr
published: 2021-04-06
---

## ethers.js(5.0) Kullanarak Jeton Gönderin {#send-token}

### Bu Eğitimde Şunları Öğreneceksiniz {#you-learn-about}

- ethers.js içe aktarımı
- Jeton transferi
- Gaz fiyatını ağ trafiği durumuna göre ayarlama

### Başlarken {#to-get-started}

Başlamak için önce ethers.js kütüphanesini javascript'imize aktarmalıyız
ethers.js(5.0) dahil

### Yükleme {#install-ethersjs}

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

1. **`contract_address`**: Jeton sözleşme adresi (aktarmak istediğiniz jeton, ether olmadığında sözleşme adresi gereklidir)
2. **`send_token_amount`**: Alıcıya göndermek istediğiniz jeton miktarı
3. **`to_address`**: Alıcının adresi
4. **`send_account`**: Göndericinin adresi
5. **`private_key`**: İşlemi imzalamak ve jetonları fiilen aktarmak için göndericinin özel anahtarı

## Not {#notice}

`sendTransaction()` bunu dahili olarak yaptığı için `signTransaction(tx)` kaldırılmıştır.

## Gönderme Prosedürleri {#procedure}

### 1. Ağa bağlanma (test ağı) {#connect-to-network}

#### Sağlayıcıyı Ayarla (Infura) {#set-provider}

Ropsten test ağına bağlanma

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. Cüzdan oluştur {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. Cüzdanı Ağa Bağla {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. Mevcut gaz ücretini al {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // gasPrice
```

### 5. İşlemi Tanımla {#define-transaction}

Aşağıda tanımlanan bu değişkenler, send_token() komutuna bağlıdır

### İşlem parametreleri {#transaction-params}

1. **`send_account`**: jeton göndericisinin adresi
2. **`to_address`**: jeton alıcısının adresi
3. **`send_token_amount`**: gönderilecek jeton miktarı
4. **`gas_limit`**: gaz limiti
5. **`gas_price`**: gaz ücreti

[Nasıl kullanılacağını görmek için aşağıya bakınız](#how-to-use)

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

### 6. Aktarım {#transfer}

```javascript
walletSigner.sendTransaction(tx).then((transaction) => {
  console.dir(transaction)
  alert("Gönderim tamamlandı!")
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

![başarıyla tamamlanmış işlemin görüntüsü](./successful-transaction.png)

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
      // genel jeton gönderimi
      let contract = new ethers.Contract(
        contract_address,
        send_abi,
        walletSigner
      )

      // Kaç tane jeton?
      let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
      console.log(`numberOfTokens: ${numberOfTokens}`)

      // Jetonları gönder
      contract.transfer(to_address, numberOfTokens).then((transferResult) => {
        console.dir(transferResult)
        alert("jeton gönderildi")
      })
    } // ether gönderimi
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
          alert("Gönderim tamamlandı!")
        })
      } catch (error) {
        alert("gönderim başarısız oldu!!")
      }
    }
  })
}
```
