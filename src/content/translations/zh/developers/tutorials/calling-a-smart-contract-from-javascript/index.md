---
title: 通过JavaScript调用智能合约
description: 以DAI通证为例展示如何通过JavaScript调用智能合约函数
author: jdourlens
tags:
  - "交易"
  - "前端"
  - "JavaScript"
  - "web3.js"
skill: beginner
lang: zh
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

在本教程中，我们将会看到如何通过 JavaScript 调用[智能合约](/developers/docs/smart-contracts/)。 首先读取智能合约的状态（例如：ERC20 持有者的余额），然后通过通证转账修改区块链的状态。 您首先需要了解[设置 JS 环境与区块链交互](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/)。

在本例中，我们将使用 DAI 通证，基于测试目的，我们将使用 ganache-cli 分叉区块链并解锁一个已经拥有很多 DAI 的地址。

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

要与智能合约交互，我们需要它的地址和 ABI：

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

对于此项目，我们剥离完整的 ERC20 ABI ，仅保留`balanceOf`和`transfer`函数，不过您可以在这里获取完整的[ERC20 ABI](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/)。

然后我们需要实例化我们的智能合约：

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

我们还会设置两个地址：

- 一个接受转账
- 一个已经解锁并将发送

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

在下一部分中，我们会调用 `balance Of` 函数来检索当前的代币数量，此时这两个地址的代币数量都被冻结。

## 调用：从智能合约读取值 {#call-reading-value-from-a-smart-contract}

第一个例子，将调用“常量（constant）”方法并且在 EVM 中执行这个智能合约方法，并不发送任何交易。 为此我们将读取一个地址的 ECR20 余额。 [阅读关于 ECR20 代币的文章](/developers/tutorials/understand-the-erc-20-token-smart-contract/)。

您可以访问为其提供 ABI 的实例化智能合约方法，如下所示：`yourContract.methods.methodname`。 通过使用`call`函数，您可以接收执行函数的结果。

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occured", err)
    return
  }
  console.log("The balance is: ", res)
})
```

请记住，DAI ERC20 有 18 位小数，这意味着您需要移除 18 个零才能获得正确的数额。 uint256 将以字符串形式返回，因为 Javascript 不处理大数值。 如果不确定，请了解我们关于 bignumber.js 的教程[如何在 JS 中处理大数](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/)。

## 发送：将交易发送给智能合约函数 {#send-sending-a-transaction-to-a-smart-contract-function}

对于第二个示例，我们将调用 DAI 智能合约的 transfer 函数，发送 10 个 DAI 到第二个地址。 transfer 函数接受两个参数：收件人地址和转账代币的数量：

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("An error occured", err)
      return
    }
    console.log("Hash of the transaction: " + res)
  })
```

调用函数返回将被在区块链中挖矿(mine) 的交易的哈希。 在以太坊中，交易哈希是可以预测的 - 这里是我们在执行前获得交易哈希值的方法([了解如何计算哈希](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction))。

因为该函数只向区块链提交交易，除非通过挖矿并包含在区块链中，否则我们无法看到结果。 在下一个教程中，我们将学习[如何通过了解其哈希值来等待一个交易在区块链上的执行](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/)。
