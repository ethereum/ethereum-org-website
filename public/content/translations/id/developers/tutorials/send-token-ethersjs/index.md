---
title: Mengirimkan Token Menggunakan ethers.js
description: Panduan yang ramah pemula untuk mengirimkan token menggunakan ethers.js.
author: Kim YongJun
tags:
  - "ETHERS.JS"
  - "ERC-20"
  - "TOKEN"
skill: beginner
lang: id
published: 2021-04-06
---

## Kirimkan Token Menggunakan ethers.js(5.0) {#send-token}

### Dalam Tutorial Ini, Anda Akan Belajar Cara {#you-learn-about}

- Mengimpor ethers.js
- Mentransfer token
- Menetapkan harga gas sesuai dengan kondisi lalu lintas jaringan

### Untuk Memulai {#to-get-started}

Untuk memulai, kita harus terlebih dahulu mengimpor pustaka ethers.js ke dalam Include ethers.js(5.0) javascript kita

### Menginstal {#install-ethersjs}

```shell
/home/ricmoo> npm install --save ethers
```

ES6 di Peramban

```html
<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"
  // Your code here...
</script>
```

ES3 (UMD) di Peramban

```html
<script
  src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
  type="application/javascript"
></script>
```

### Parameter {#param}

1. **`contract_address`**: Akun kontrak token (akun kontrak diperlukan ketika token yang ingin Anda transfer bukan merupakan ether)
2. **`send_token_amount`**: Jumlah yang ingin Anda kirimkan ke penerima
3. **`to_address`**: Alamat penerima
4. **`send_account`**: Alamat pengirim
5. **`private_key`**: Kunci pribadi dari pengirim untuk menandatangani transaksi dan benar-benar mentransfer token

## Pemberitahuan {#notice}

`signTransaction(tx)` dihilangkan karena `sendTransaction()` dilakukan secara internal.

## Prosedur Mengirim {#procedure}

### 1. Hubungkan ke jaringan (jaringan percobaan) {#connect-to-network}

#### Tetapkan Penyedia (Infura) {#set-provider}

Hubungkan ke jaringan percobaan Ropsten

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. Buat dompet {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. Hubungkan Dompet ke net {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. Dapatkan harga gas saat ini {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // gasPrice
```

### 5. Tentukan Transaksi {#define-transaction}

Variabel-variabel ini yang ditentukan di bawah bergantung pada `send_token()`

### Parameter transaksi {#transaction-params}

1. **`send_account`**: alamat pengirim token
2. **`to_address`**: alamat penerima token
3. **`send_token_amount`**: jumlah token yang akan dikirim
4. **`gas_limit`**: batas gas
5. **`gas_price`**: harga gas

[Lihat di bawah untuk cara mengggunakan](#how-to-use)

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

## Cara menggunakannya {#how-to-use}

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

### Sukses! {#success}

![gambar transaksi berhasil](./successful-transaction.png)

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
