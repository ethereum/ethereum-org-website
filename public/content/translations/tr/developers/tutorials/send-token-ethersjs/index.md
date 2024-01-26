---
title: Ethers.js Kullanarak Token Gönderimi
description: Yeni başlayanlar için Ethers.js kullanarak token gönderme rehberi.
author: Kim YongJun
tags:
  - "ETHERS.JS"
  - "ERC-20"
  - "TOKEN'LAR"
skill: beginner
lang: tr
published: 2021-04-06
---

## ethers.js(5.0) Kullanarak Token Gönderin {#send-token}

### Bu Eğitimde Şunların Nasıl Yapılacağını Öğreneceksiniz {#you-learn-about}

- Ethers.js içe aktarımı
- Token transferi
- Gaz fiyatını ağ trafiği durumuna göre ayarlama

### Başlamak İçin {#to-get-started}

Başlamak için önce ethers.js kitaplığını javascript'imize aktarmalıyız ethers.js(5.0) dahil

### Kurulum {#install-ethersjs}

```shell
/home/ricmoo> npm install --save ethers
```

Tarayıcıda ES6

```html
<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"
  // Your code here...
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

1. **`contract_address`**: Token sözleşme adresi (aktarmak istediğiniz token, ether olmadığında sözleşme adresi gereklidir)
2. **`send_token_amount`**: Alıcıya göndermek istediğiniz token miktarı
3. **`to_address`**: Alıcının adresi
4. **`send_account`**: Göndericinin adresi
5. **`private_key`**: İşlemi imzalamak ve token'ları tam olarak aktarmak için göndericinin özel anahtarı

## Uyarı {#notice}

`sendTransaction()` onu dahili olarak yaptığı için `signTransaction(tx)` kaldırılmıştır.

## Gönderim Prosedürleri {#procedure}

### 1. Ağa bağlan (test ağı) {#connect-to-network}

#### Sağlayıcı Ayarla (Infura) {#set-provider}

Ropsten test ağına bağlan

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. Cüzdan oluştur {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. Cüzdanı ağa bağla {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. Mevcut gaz ücretini al {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // gasPrice
```

### 5. İşlemi tanımla {#define-transaction}

Aşağıda tanımlanan bu değişkenler, `send_token()` komutuna bağlıdır

### İşlem parametreleri {#transaction-params}

1. **`send_account`**: token göndericisinin adresi
2. **`to_address`**: token alıcısının adresi
3. **`send_token_amount`**: gönderilecek token miktarı
4. **`gas_limit`**: gaz sınırı
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

![başarılı bir şekilde yapılan işlemin görüntüsü](./successful-transaction.png)

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
      // general token send
      let contract = new ethers.Contract(
        contract_address,
        send_abi,
        walletSigner
      )

      // How many tokens?
      let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
      console.log(`numberOfTokens: ${numberOfTokens}`)

      // Send tokens
      contract.transfer(to_address, numberOfTokens).then((transferResult) => {
        console.dir(transferResult)
        alert("sent token")
      })
    } // ether send
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
