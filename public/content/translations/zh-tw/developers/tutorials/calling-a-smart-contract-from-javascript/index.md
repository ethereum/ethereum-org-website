---
title: 從 JavaScript 呼叫智能合約
description: 如何使用 JavaScript 呼叫智能合約函式：以 Dai 代幣為例
author: jdourlens
tags: [ "交易", "前端", "JavaScript", "web3.js" ]
skill: beginner
lang: zh-tw
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

在本教學中，我們將了解如何從 JavaScript 呼叫[智能合約](/developers/docs/smart-contracts/)函式。 首先，我們會讀取智能合約的狀態 (例如 ERC20 持有者的餘額)，然後透過代幣傳送來修改區塊鏈的狀態。 您應該已經熟悉如何[設定 JS 環境來與區塊鏈互動](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/)。

在本範例中，我們將使用 DAI 代幣。為了測試，我們將使用 ganache-cli 來分叉區塊鏈，並解鎖一個已持有大量 DAI 的地址：

```bash
ganache-cli -f https://mainnet.infura.io/v3/[您的 INFURA 金鑰] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
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

在這個專案中，我們刪減了完整的 ERC20 ABI，只保留 `balanceOf` 和 `transfer` 函式，但您可以在[此處找到完整的 ERC20 ABI](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/)。

接著我們需要實例化我們的智能合約：

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

我們也將設定兩個地址：

- 接收傳送的地址，以及
- 我們已解鎖、將用來傳送的地址：

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

在下個部分，我們將呼叫 `balanceOf` 函式，以擷取兩個地址目前持有的代幣數量。

## 呼叫：從智能合約讀取數值 {#call-reading-value-from-a-smart-contract}

第一個範例將呼叫一個「常數」(constant) 方法，並在以太坊虛擬機 (EVM) 中執行其智能合約方法，而不會傳送任何交易。 為此，我們將讀取一個地址的 ERC20 餘額。 [閱讀我們關於 ERC20 代幣的文章](/developers/tutorials/understand-the-erc-20-token-smart-contract/)。

您可以存取已實例化的智能合約方法，只要您已提供其 ABI，方式如下：`yourContract.methods.methodname`。 使用 `call` 函式，您將會收到執行函式的結果。

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("發生錯誤", err)
    return
  }
  console.log("餘額為：", res)
})
```

請記住，DAI ERC20 有 18 位小數，這意味著您需要去掉 18 個零才能得到正確的金額。 由於 JavaScript 無法處理大數值，`uint256` 會以字串的形式傳回。 如果您不確定[如何在 JS 中處理大數值，請查看我們關於 bignumber.js 的教學](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/)。

## 傳送：傳送交易至智能合約函式 {#send-sending-a-transaction-to-a-smart-contract-function}

在第二個範例中，我們將呼叫 DAI 智能合約的 `transfer` 函式，傳送 10 個 DAI 到我們的第二個地址。 `transfer` 函式接受兩個參數：接收方地址以及要傳送的代幣數量：

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("發生錯誤", err)
      return
    }
    console.log("交易哈希：" + res)
  })
```

此函式呼叫會傳回交易的哈希，該交易將被挖出並納入區塊鏈。 在以太坊上，交易哈希是可預測的——這就是我們能在交易執行前就取得其哈希的原因 ([在此了解哈希如何計算](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction))。

由於該函式只是將交易提交到區塊鏈，我們要等到它被挖出並納入區塊鏈後，才能看到結果。 在下一個教學中，我們將學習[如何根據交易哈希，等待交易在區塊鏈上被執行](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/)。
