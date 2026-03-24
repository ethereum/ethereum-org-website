---
title: Mengirim Token Menggunakan ethers.js
description: Panduan ramah pemula untuk mengirim token menggunakan ethers.js.
author: Kim YongJun
tags: ["ETHERS.JS", "ERC-20", "TOKEN"]
skill: beginner
breadcrumb: "Kirim token"
lang: id
published: 2021-04-06
---

## Mengirim Token Menggunakan ethers.js(5.0) {#send-token}

### Dalam Tutorial Ini Anda Akan Mempelajari Cara {#you-learn-about}

- Mengimpor ethers.js
- Mentransfer token
- Mengatur harga gas sesuai dengan situasi lalu lintas jaringan

### Untuk Memulai {#to-get-started}

Untuk memulai, pertama-tama kita harus mengimpor pustaka ethers.js ke dalam javascript kita
Sertakan ethers.js(5.0)

### Menginstal {#install-ethersjs}

```shell
/home/ricmoo> npm install --save ethers
```

ES6 di Peramban

```html
<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"
  // Your code here... // Kode Anda di sini...
</script>
```

ES3(UMD) di Peramban

```html
<script
  src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
  type="application/javascript"
></script>
```

### Parameter {#param}

1. **`contract_address`**: Alamat kontrak token (alamat kontrak diperlukan ketika token yang ingin Anda transfer bukan ether)
2. **`send_token_amount`**: Jumlah yang ingin Anda kirim ke penerima
3. **`to_address`**: Alamat penerima
4. **`send_account`**: Alamat pengirim
5. **`private_key`**: Kunci pribadi pengirim untuk menandatangani transaksi dan benar-benar mentransfer token

## Catatan {#notice}

`signTransaction(tx)` dihapus karena `sendTransaction()` melakukannya secara internal.

## Prosedur Pengiriman {#procedure}

### 1. Terhubung ke jaringan (testnet) {#connect-to-network}

#### Mengatur Penyedia (Infura) {#set-provider}

Terhubung ke testnet Ropsten

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. Membuat dompet {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. Menghubungkan Dompet ke jaringan {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. Mendapatkan harga gas saat ini {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // gasPrice // gasPrice
```

### 5. Mendefinisikan Transaksi {#define-transaction}

Variabel-variabel yang didefinisikan di bawah ini bergantung pada `send_token()`

### Parameter transaksi {#transaction-params}

1. **`send_account`**: alamat pengirim token
2. **`to_address`**: alamat penerima token
3. **`send_token_amount`**: jumlah token yang akan dikirim
4. **`gas_limit`**: batas gas
5. **`gas_price`**: harga gas

[Lihat di bawah untuk cara menggunakannya](#how-to-use)

```javascript
const tx = {
  from: send_account,
  to: to_address,
  value: ethers.utils.parseEther(send_token_amount),
  nonce: window.ethersProvider.getTransactionCount(send_account, "latest"),
  gasLimit: ethers.utils.hexlify(gas_limit), // 100000 // 100000
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

### Berhasil! {#success}

![gambar transaksi berhasil dilakukan](./successful-transaction.png)

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
      // general token send // pengiriman token umum
      let contract = new ethers.Contract(
        contract_address,
        send_abi,
        walletSigner
      )

      // How many tokens? // Berapa banyak token?
      let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
      console.log(`numberOfTokens: ${numberOfTokens}`)

      // Send tokens // Kirim token
      contract.transfer(to_address, numberOfTokens).then((transferResult) => {
        console.dir(transferResult)
        alert("sent token")
      })
    } // ether send // pengiriman ether
    else {
      const tx = {
        from: send_account,
        to: to_address,
        value: ethers.utils.parseEther(send_token_amount),
        nonce: window.ethersProvider.getTransactionCount(
          send_account,
          "latest"
        ),
        gasLimit: ethers.utils.hexlify(gas_limit), // 100000 // 100000
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