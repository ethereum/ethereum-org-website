---
title: "ethers.jsを使用してトークンを送信する"
description: "ethers.jsを使用してトークンを送信するための初心者向けガイド。"
author: Kim YongJun
tags: [ "ETHERS.JS", "ERC-20", "トークン" ]
skill: beginner
lang: ja
published: 2021-04-06
---

## ethers.js(5.0)を使用したトークンの送信 {#send-token}

### このチュートリアルで学ぶこと {#you-learn-about}

- ethers.jsのインポート
- トークンの転送
- ネットワークの混雑状況に応じたガス代の設定

### はじめに {#to-get-started}

始めるには、まずethers.jsライブラリをJavaScriptにインポートする必要があります。
ethers.js(5.0)をインクルードします。

### インストール {#install-ethersjs}

```shell
/home/ricmoo> npm install --save ethers
```

ブラウザでES6を使用するには次のようにします。

```html
<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"
  // ここにコードを記述...
</script>
```

ブラウザでES3(UMD)を使用するには次のようにします。

```html
<script
  src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
  type="application/javascript"
></script>
```

### パラメータ {#param}

1. **`contract_address`**: トークンのコントラクトアドレス(転送したいトークンがイーサでない場合は、コントラクトアドレスが必要となります)
2. **`send_token_amount`**: 受取人に送る量
3. **`to_address`**: 受取人のアドレス
4. **`send_account`**: 送信者のアドレス
5. **`private_key`**: トランザクションに署名し、実際にトークンを転送するための送信者の秘密鍵

## 注意 {#notice}

`signTransaction(tx)`は、`sendTransaction()`の内部で実行されるため削除されました。

## 送信手順 {#procedure}

### 1. ネットワークに接続 (テストネット) {#connect-to-network}

#### プロバイダーの設定 (Infura) {#set-provider}

Ropstenテストネットに接続します。

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
window.ethersProvider.getGasPrice() // gasPrice
```

### 5. トランザクションの定義 {#define-transaction}

以下で定義されている変数は、`send_token()`に依存します。

### トランザクションパラメータ {#transaction-params}

1. **`send_account`**: トークン送信者のアドレス
2. **`to_address`**: トークンの受取人のアドレス
3. **`send_token_amount`**: 送信するトークンの量
4. **`gas_limit`**: ガスリミット
5. **`gas_price`**: ガス価格

[使用方法については、以下を参照してください](#how-to-use)

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

### 6. 転送 {#transfer}

```javascript
walletSigner.sendTransaction(tx).then((transaction) => {
  console.dir(transaction)
  alert("送信完了！")
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

### 成功しました！ {#success}

![トランザクションが正常に完了した画像](./successful-transaction.png)

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
      // 一般的なトークン送信
      let contract = new ethers.Contract(
        contract_address,
        send_abi,
        walletSigner
      )

      // トークンの数量
      let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
      console.log(`numberOfTokens: ${numberOfTokens}`)

      // トークンを送信
      contract.transfer(to_address, numberOfTokens).then((transferResult) => {
        console.dir(transferResult)
        alert("トークンを送信しました")
      })
    } // ether送信
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
          alert("送信完了！")
        })
      } catch (error) {
        alert("送信に失敗しました！！")
      }
    }
  })
}
```
