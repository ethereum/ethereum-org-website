---
title: 使用 ethers.js 发送代币
description: 使用 ethers.js 发送代币的初学者入门指南。
author: Kim YongJun
tags:
  - "ETHERS.JS"
  - "ERC-20"
  - "代币"
skill: beginner
lang: zh
published: 2021-04-06
---

## 使用 ethers.js(5.0) 发送代币 {#send-token}

### 在本教程中，您将学习如何： {#you-learn-about}

- 导入 ethers.js
- 进行代币转账
- 根据网络流量情况设置燃料价格

### 入门指南 {#to-get-started}

开始前，我们必须先将 ethers.js 库导入我们的 javascript 中 包括 ethers.js(5.0)

### 安装 {#install-ethersjs}

```shell
/home/ricmoo> npm install --save ethers
```

浏览器版 ES6

```html
<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"
  // Your code here...
</script>
```

浏览器版 ES3(UMD)

```html
<script
  src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
  type="application/javascript"
></script>
```

### 参数 {#param}

1. **`contract_address`**：代币合约地址（您想要转账的代币不是以太币时所需的合约地址）
2. **`send_token_amount`**：您想要发送给接收人的金额
3. **`to_address`**：接收人的地址
4. **`end_account`**：发送人的地址
5. **`private_ke`**：发送者签署交易和实际进行代币转账的私钥

## 注意 {#notice}

`signTransaction(tx)` 已删除，因为 `sendTransaction()` 在内部执行。

## 发送程序 {#procedure}

### 1. 连接到网络（测试网） {#connect-to-network}

#### 设置提供商 (Infura) {#set-provider}

连接到 Ropsten 测试网

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. 创建钱包 {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. 连接钱包到网络 {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. 获取当前燃料价格 {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // gasPrice
```

### 5. 定义交易 {#define-transaction}

以下定义的变量取决于 `send_token()`

### 交易参数 {#transaction-params}

1. **`send_accoun`**：代币发送人的地址
2. **`to_address`**：代币接收人的地址
3. **`send_token_amount`**：您想要发送给接收人的金额
4. **`gas_limit`**：燃料限制
5. **`gas_limit`**：燃料价格

[请参阅下文了解如何使用](#how-to-use)

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

### 6. 转账 {#transfer}

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

![交易成功界面](./successful-transaction.png)

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
