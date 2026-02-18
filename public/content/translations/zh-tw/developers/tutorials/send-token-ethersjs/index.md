---
title: "使用 ethers.js 傳送代幣"
description: "使用 ethers.js 傳送代幣的初學者指南。"
author: Kim YongJun
tags: [ "ETHERS.JS", "ERC-20", "TOKENS" ]
skill: beginner
lang: zh-tw
published: 2021-04-06
---

## 使用 ethers.js (5.0) 傳送代幣 {#send-token}

### 在本教學中，您將學習如何 {#you-learn-about}

- 匯入 ethers.js
- 傳送代幣
- 根據網路流量情況設定 gas 價格

### 開始使用 {#to-get-started}

開始之前，我們必須先將 ethers.js 函式庫匯入 javascript 程式碼中
包含 ethers.js (5.0)

### 安裝 {#install-ethersjs}

```shell
/home/ricmoo> npm install --save ethers
```

瀏覽器中的 ES6

```html
<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"
  // 您的程式碼...
</script>
```

瀏覽器中的 ES3 (UMD)

```html
<script
  src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
  type="application/javascript"
></script>
```

### 參數 {#param}

1. **`contract_address`**：代幣合約地址（當您要傳送的代幣不是 ether 時，需要合約地址）
2. **`send_token_amount`**：您想傳送給接收者的代幣數量
3. **`to_address`**：接收者的地址
4. **`send_account`**：傳送者的地址
5. **`private_key`**：傳送者的私密金鑰，用以簽署交易並實際傳送代幣

## 注意事項 {#notice}

`signTransaction(tx)` 已被移除，因為 `sendTransaction()` 會在內部處理。

## 傳送程序 {#procedure}

### 1. 連線至網路 (測試網) {#connect-to-network}

#### 設定提供者 (Infura) {#set-provider}

連線至 Ropsten 測試網

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. 建立錢包 {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3 將錢包連線至網路 {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4 取得目前的 gas 價格 {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // gas 價格
```

### 5 定義交易 {#define-transaction}

下方定義的變數相依於 `send_token()`。

### 交易參數 {#transaction-params}

1. **`send_account`**：代幣傳送者的地址
2. **`to_address`**：代幣接收者的地址
3. **`send_token_amount`**：要傳送的代幣數量
4. **`gas_limit`**：gas 上限
5. **`gas_price`**：gas 價格

[關於如何使用，請參閱下方](#how-to-use)

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

### 6. 傳送 {#transfer}

```javascript
walletSigner.sendTransaction(tx).then((transaction) => {
  console.dir(transaction)
  alert("傳送完成！")
})
```

## 如何使用 {#how-to-use}

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

### 成功！ {#success}

![交易成功完成的圖片](./successful-transaction.png)

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
      // 一般代幣傳送
      let contract = new ethers.Contract(
        contract_address,
        send_abi,
        walletSigner
      )

      // 多少代幣？
      let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
      console.log(`numberOfTokens: ${numberOfTokens}`)

      // 傳送代幣
      contract.transfer(to_address, numberOfTokens).then((transferResult) => {
        console.dir(transferResult)
        alert("已傳送代幣")
      })
    } // ether 傳送
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
          alert("傳送完成！")
        })
      } catch (error) {
        alert("傳送失敗！！")
      }
    }
  })
}
```
