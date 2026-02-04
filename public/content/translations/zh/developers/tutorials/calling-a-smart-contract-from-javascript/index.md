---
title: "通过 JavaScript 调用智能合约"
description: "以 DAI 代币为例，介绍如何通过 JavaScript 调用智能合约函数"
author: jdourlens
tags: [ "交易", "前端", "JavaScript", "web3.js" ]
skill: beginner
lang: zh
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

在本教程中，我们将了解如何通过 JavaScript 调用[智能合约](/developers/docs/smart-contracts/)函数。 首先是读取智能合约的状态（例如，ERC20 持有者的余额），然后我们将通过代币转账来修改区块链的状态。 你应该已经熟悉[如何设置 JS 环境来与区块链交互](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/)。

在本例中，我们将使用 DAI 代币。为了进行测试，我们将使用 ganache-cli 分叉区块链，并解锁一个已有很多 DAI 的地址：

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

在这个项目中，我们删除了完整的 ERC20 ABI，只保留了 `balanceOf` 和 `transfer` 函数，但你可以[在这里找到完整的 ERC20 ABI](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/)。

然后我们需要实例化智能合约：

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

我们还将设置两个地址：

- 接收转账的一方，以及
- 我们已解锁的、将发送转账的一方：

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

在下一部分中，我们将调用 `balanceOf` 函数来检索这两个地址当前持有的代币数量。

## 调用：从智能合约读取值 {#call-reading-value-from-a-smart-contract}

第一个示例将调用一个“常量”方法，并在 EVM 中执行其智能合约方法，而无需发送任何交易。 为此，我们将读取一个地址的 ERC20 余额。 [阅读我们关于 ERC20 代币的文章](/developers/tutorials/understand-the-erc-20-token-smart-contract/)。

你可以按如下方式访问你为其提供了 ABI 的实例化智能合约的方法：`yourContract.methods.methodname`。 通过使用 `call` 函数，你将收到执行该函数的结果。

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occurred", err)
    return
  }
  console.log("The balance is: ", res)
})
```

请记住，DAI ERC20 有 18 位小数，这意味着你需要去掉 18 个零才能得到正确的金额。 由于 JavaScript 不处理大数值，`uint256` 会作为字符串返回。 如果你不确定[如何在 JS 中处理大数，请查看我们关于 bignumber.js 的教程](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/)。

## 发送：向智能合约函数发送交易 {#send-sending-a-transaction-to-a-smart-contract-function}

在第二个示例中，我们将调用 DAI 智能合约的 `transfer` 函数，向我们的第二个地址发送 10 个 DAI。 `transfer` 函数接受两个参数：接收方地址和要转账的代币数量：

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

该函数调用返回交易的哈希，该交易将被挖矿并加入区块链。 在以太坊上，交易哈希是可预测的——因此我们可以在交易执行前就得到其哈希（[在此处了解如何计算哈希](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)）。

由于该函数只是将交易提交到区块链，因此只有当它被挖出并打包到区块链中时，我们才能看到结果。 在下一篇教程中，我们将学习[如何根据交易哈希等待其在区块链上执行](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/)。
