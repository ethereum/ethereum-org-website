---
title: "ethers.jsを使用したトークンの送金"
description: "ethers.jsを使用してトークンを送金するための初心者向けガイド。"
author: "キム・ヨンジュン"
tags: ["ETHERS.JS", "ERC-20", "トークン"]
skill: beginner
breadcrumb: "トークンの送金"
lang: ja
published: 2021-04-06
---

## ethers.js(5.0)を使用したトークンの送金 {#send-token}

### このチュートリアルで学べること {#you-learn-about}

- ethers.jsのインポート
- トークンの送金
- ネットワークのトラフィック状況に応じたガス価格の設定

### はじめに {#to-get-started}

はじめるにあたり、まず ethers.js ライブラリを JavaScript にインポートする必要があります。
ethers.js v5 をインクルードします。
### インストール {#install-ethersjs}

```shell
/home/ricmoo> npm install --save ethers
```

ブラウザでのES6

```html
<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"
  // ここにコードを記述してください...
</script>
```

ブラウザでのES3(UMD)

```html
<script
  src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
  type="application/javascript"
></script>
```

### パラメータ {#param}

1. **`contract_address`**: トークンのコントラクトアドレス (送金したいトークンがイーサではない場合、コントラクトアドレスが必要です)
2. **`send_token_amount`**: 受信者に送金したい金額
3. **`to_address`**: 受信者のアドレス
4. **`send_account`**: 送信者のアドレス
5. **`private_key`**: トランザクションに署名し、実際にトークンを送金するための送信者の秘密鍵

## 注意 {#notice}

`sendTransaction()` が内部で処理を行うため、`signTransaction(tx)` は削除されています。

## 送金手順 {#procedure}

### 1. ネットワーク (テストネット) への接続 {#connect-to-network}

#### プロバイダの設定 (Infura) {#set-provider}

ロプステンテストネットへの接続

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. ウォレットの作成 {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. ウォレットをネットワークに接続 {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. 現在のガス価格の取得 {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // ガス価格
```

### 5. トランザクションの定義 {#define-transaction}

以下で定義されている変数は、`send_token()` に依存しています。

### トランザクションパラメータ {#transaction-params}

1. **`send_account`**: トークン送信者のアドレス
2. **`to_address`**: トークン受信者のアドレス
3. **`send_token_amount`**: 送金するトークンの量
4. **`gas_limit`**: ガス・リミット
5. **`gas_price`**: ガス価格

[使用方法については以下を参照してください](#how-to-use)

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

### 6. 送金 {#transfer}

```javascript
walletSigner.sendTransaction(tx).then((transaction) => {
  console.dir(transaction)
  alert("Send finished!")
})
```

## 使用方法 {#how-to-use}

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
      // 一般的なトークンの送信
      let contract = new ethers.Contract(
        contract_address,
        send_abi,
        walletSigner
      )

      // トークンの数は？
      let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
      console.log(`numberOfTokens: ${numberOfTokens}`)

      // トークンを送信
      contract.transfer(to_address, numberOfTokens).then((transferResult) => {
        console.dir(transferResult)
        alert("sent token")
      })
    } // イーサの送信
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
