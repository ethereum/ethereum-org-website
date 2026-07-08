---
title: "從 JavaScript 呼叫智能合約"
description: "如何使用 DAI 代幣範例從 JavaScript 呼叫智能合約函式"
author: jdourlens
tags: ["交易", "前端", "JavaScript", "web3.js"]
skill: beginner
breadcrumb: "從 JS 呼叫合約"
lang: zh-tw
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

在本教學中，我們將了解如何從 JavaScript 呼叫[智能合約](/developers/docs/smart-contracts/)函式。首先是讀取智能合約的狀態（例如 ERC-20 持有者的餘額），然後我們將透過進行代幣轉帳來修改區塊鏈的狀態。你應該已經熟悉[設定與區塊鏈互動的 JS 環境](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/)。

在這個範例中，我們將使用 DAI 代幣，為了測試目的，我們將使用 ganache-cli 分叉區塊鏈，並解鎖一個已經擁有大量 DAI 的地址：

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

要與智能合約互動，我們需要它的地址和 ABI：

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

在這個專案中，我們精簡了完整的 ERC-20 ABI，只保留 `balanceOf` 和 `transfer` 函式，但你可以在這裡找到[完整的 ERC-20 ABI](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/)。

接著我們需要實例化我們的智能合約：

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

我們還將設定兩個地址：

- 接收轉帳的地址，以及
- 我們已經解鎖並將發送轉帳的地址：

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

在下一部分中，我們將呼叫 `balanceOf` 函式來擷取這兩個地址目前持有的代幣數量。

## 呼叫：從智能合約讀取值 {#call-reading-value-from-a-smart-contract}

第一個範例將呼叫一個「常數 (constant)」方法，並在 EVM 中執行其智能合約方法，而無需發送任何交易。為此，我們將讀取一個地址的 ERC-20 餘額。[閱讀我們關於 ERC-20 代幣的文章](/developers/tutorials/understand-the-erc-20-token-smart-contract/)。

你可以透過以下方式存取已提供 ABI 的實例化智能合約方法：`yourContract.methods.methodname`。透過使用 `call` 函式，你將收到執行該函式的結果。

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occurred", err)
    return
  }
  console.log("The balance is: ", res)
})
```

請記住，DAI ERC-20 有 18 位小數，這意味著你需要移除 18 個零才能獲得正確的數量。由於 JavaScript 無法處理大數值，因此 uint256 會以字串形式回傳。如果你不確定[如何在 JS 中處理大數，請查看我們關於 bignumber.js 的教學](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/)。

## 發送：向智能合約函式發送交易 {#send-sending-a-transaction-to-a-smart-contract-function}

在第二個範例中，我們將呼叫 DAI 智能合約的轉帳函式，發送 10 DAI 到我們的第二個地址。轉帳函式接受兩個參數：接收者地址和要轉帳的代幣數量：

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

呼叫函式會回傳將被挖礦寫入區塊鏈的交易雜湊。在以太坊上，交易雜湊是可預測的——這就是為什麼我們可以在交易執行之前取得交易的雜湊（[在此了解雜湊是如何計算的](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)）。

由於該函式僅將交易提交到區塊鏈，在我們知道它何時被挖礦並包含在區塊鏈中之前，我們無法看到結果。在下一個教學中，我們將學習[如何透過知道交易的雜湊來等待交易在區塊鏈上執行](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/)。