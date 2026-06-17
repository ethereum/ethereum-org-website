---
title: 从 JavaScript 调用智能合约
description: 如何使用 Dai 代币示例从 JavaScript 调用智能合约函数
author: jdourlens
tags: ["交易", "前端", "JavaScript", "web3.js"]
skill: beginner
breadcrumb: 从 JS 调用合约
lang: zh
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

在本教程中，我们将了解如何从 JavaScript 调用[智能合约](/developers/docs/smart-contracts/)函数。首先是读取智能合约的状态（例如，ERC-20 持有者的余额），然后我们将通过进行代币转账来修改区块链的状态。你应该已经熟悉[设置 JS 环境以与区块链进行交互](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/)。

在这个示例中，我们将使用 DAI 代币，出于测试目的，我们将使用 ganache-cli 分叉区块链，并解锁一个已经拥有大量 DAI 的地址：

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

要与智能合约进行交互，我们需要它的地址和 ABI：

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

对于这个项目，我们精简了完整的 ERC-20 ABI，只保留了 `balanceOf` 和 `transfer` 函数，但你可以[在这里找到完整的 ERC-20 ABI](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/)。

然后我们需要实例化我们的智能合约：

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

我们还将设置两个地址：

- 接收转账的地址，以及
- 我们已经解锁的发送转账的地址：

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

在下一部分中，我们将调用 `balanceOf` 函数来检索这两个地址当前持有的代币数量。

## 调用 (Call)：从智能合约读取值 {#call-reading-value-from-a-smart-contract}

第一个示例将调用一个“常量 (constant)”方法，并在 EVM 中执行其智能合约方法，而无需发送任何交易。为此，我们将读取一个地址的 ERC-20 余额。[阅读我们关于 ERC-20 代币的文章](/developers/tutorials/understand-the-erc-20-token-smart-contract/)。

你可以通过以下方式访问你为其提供了 ABI 的已实例化智能合约方法：`yourContract.methods.methodname`。通过使用 `call` 函数，你将收到执行该函数的结果。

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occurred", err)
    return
  }
  console.log("The balance is: ", res)
})
```

请记住，DAI ERC-20 有 18 位小数，这意味着你需要去掉 18 个零才能获得正确的金额。由于 JavaScript 无法处理大数值，因此 uint256 将作为字符串返回。如果你不确定[如何在 JS 中处理大数，请查看我们关于 bignumber.js 的教程](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/)。

## 发送 (Send)：向智能合约函数发送交易 {#send-sending-a-transaction-to-a-smart-contract-function}

对于第二个示例，我们将调用 DAI 智能合约的转账 (transfer) 函数，向我们的第二个地址发送 10 个 DAI。转账函数接受两个参数：接收者地址和要转账的代币数量：

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

调用函数会返回将被打包到区块链中的交易哈希。在以太坊上，交易哈希是可预测的——这就是为什么我们可以在交易执行之前获取它的哈希（[在此处了解哈希是如何计算的](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)）。

由于该函数仅将交易提交到区块链，因此在知道它何时被打包并包含在区块链中之前，我们无法看到结果。在下一个教程中，我们将学习[如何通过知道交易的哈希来等待其在区块链上执行](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/)。