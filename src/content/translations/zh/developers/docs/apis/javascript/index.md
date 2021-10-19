---
title: JavaScript 应用编程接口库
description: 以太坊 JavaScript 应用程序接口 (API) 的介绍，使您能够从您的应用程序中与区块链进行交互。
lang: zh
sidebar: true
---

为了使软件应用程序能够与以太坊区块链进行交互（例如：读取区块链数据或发送交易信息到网络），软件必须连接到以太坊节点。

因此，每个以太坊客户端都遵循 JSON-RPC 规范，以此有一个统一的端口可供应用程序们执行。

如果您想要用 JavaScript 连接到一个以太坊节点， 可以使用原生 JavaScript，不过生态系统中存在一些方便的库，使得这个事情变得更加容易。 通过这些库，开发者可以写下直观易懂甚至单行的代码就能初始化与以太坊的互动（背后使用 JSON RPC 请求）。

## 前置要求 {#prerequisites}

除了了解 JavaScript 外，了解[以太坊堆栈](/developers/docs/ethereum-stack/)和[以太坊 客户端](/developers/docs/nodes-and-clients/)也许是有帮助的。

## 为什么要使用库？ {#why-use-a-library}

这些库降低了大多数与一个以太坊节点交互的复杂度。 它们还提供实用的函数（例如：将 ETH 转化为 Gwei），而作为开发者，您可以花费更少的时间来处理以太坊客户端的复杂问题，从而将更多的时间集中于处理您的应用程序的独特功能。

## 库的可用功能 {#library-features}

### 连接到以太坊节点 {#connect-to-ethereum-nodes}

使用提供器，这些库允许您连接到以太坊并读取它的数据，不管是通过 JSON-RPC、INFURA、Etherscan、Alchemy 还是 Metamask。

**Ether 示例**

```js
// 一个 Web3Provider 包含了标准的 Web3 提供者(provider)，这个提供者
//相当于将 Metamask 作为一个以太坊窗口注入到每个页面中。
const provider = new ethers.providers.eb3Provider(window.eferum)

// Metamask 插件同时可以签署每一笔交易
// 从而更改区块链中的状态。
// 为此，我们需要帐户签名者...
const signer = provider.getSigner()
```

**Web3js 示例**

```js
var web3 = new Web3("http://localhost:8545")
// 或
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// 更改提供者
web3.setProvider("ws://localhost:8546")
// 或
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// 在 node.js 中使用 IPC 提供者
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Etherum/geth). pc", net// mac os path
// 或
var web3 = new Web3(
  new Web3.providers. pcProvider("/Users/myuser/Library/Etherum/geth.ipc", net"
) // mac os path
// 在 windows 操作系统上的路径是 "\\\\pipe\\geth.ipc"
// 在 linux 上的路径是 "/users/myuser/.efer/geth.ipc"
```

一旦设置，您将能够查询区块链的以下内容：

- 区块高度
- gas 评估
- 智能合约事件
- 网络 ID
- 以及更多...

<!--- #### Try it

This remix tutorial will show you [how to query the blockchain using web3js](https://remix.ethereum.org/#optimize=false&evmVersion=null&version=soljson-v0.6.6+commit.6c089d02.js)
--->

### 钱包功能 {#wallet-functionality}

这些库给予开发者创建钱包的功能，用于管理密匙和对交易进行签署。

这里提供了一个 Ether 的例子

```js
// 从助记符创建一个钱包实例...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromMnemonic(mnemonic)

// ...或者从一个私有密匙中创建
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// 每个签署 API 都是一个异步操作地址
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// 每个钱包地址同时也可以是同步的
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// 内部加密组件
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// 钱包的助记符（mnemonic）
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// 注意：使用私有密匙创建的钱包没有
//       从助记符（被原生屏蔽）
walletPrivateKey.mnemonic
// null

// 签署一个信息
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// 签署一笔交易
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// 这个连接方法会返回一个新的连接到提供者的钱包实例
wallet = walletMnemonic.connect(provider)

// 查询以太坊网络
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// 发送 Ether
wallet.sendTransaction(tx)
```

[阅读完整文档](https://docs.ethers.io/v5/api/signer/#Wallet)

一旦设置，您将能够：

- 创建帐户
- 发送交易
- 签署交易
- 以及更多...

### 与智能合同交互的方法 {#interact-with-smart-contract-functions}

Javascript 客户端库可以让开发者的应用通过读取汇编合同的应用二进制接口 (ABI) 来调用智能合约函数。

ABI 本质上是基于 JSON 格式解释了合约的函数，并且允许您像普通 JavaScript 对象一样使用它。

以下是基于 Solidity 开发的智能合约：

```solidity
contract Test {
    uint a;
    address d = 0x12345678901234567890123456789012;

    function Test(uint testInt)  { a = testInt;}

    event Event(uint indexed b, bytes32 c);

    event Event2(uint indexed b, bytes32 c);

    function foo(uint b, bytes32 c) returns(address) {
        Event(b, c);
        return d;
    }
}
```

可能会产生类似下面的 JSON 数据：

```json
[{
    "type":"constructor",
    "payable":false,
    "stateMutability":"nonpayable"
    "inputs":[{"name":"testInt","type":"uint256"}],
  },{
    "type":"function",
    "name":"foo",
    "constant":false,
    "payable":false,
    "stateMutability":"nonpayable",
    "inputs":[{"name":"b","type":"uint256"}, {"name":"c","type":"bytes32"}],
    "outputs":[{"name":"","type":"address"}]
  },{
    "type":"event",
    "name":"Event",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"}, {"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
  },{
    "type":"event",
    "name":"Event2",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"},{"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
}]
```

这意味着你可以：

- 发送一笔交易到指定的智能合约上，并执行智能合约上的方法
- 调用方法去评估对 gas 的需求量。这个方法的执行是在以太坊虚拟机中执行的。
- 部署一个合约
- 以及更多...

<!--- #### Try it

This remix tutorial will show you [how to query a contract using web3js](https://remix.ethereum.org/#optimize=false&evmVersion=null&version=soljson-v0.6.6+commit.6c089d02.js)
--->

### 实用功能 {#utility-functions}

这些实用功能类似快捷键操作，可以让开发者在构建以太坊时更加简单些。

我们默认以太坊的价值单位是 Wei（以太坊的最小价值单位） 1 ETH = 1,000,000,000,000,000,000 WEI - 这意味着开发者们可以处理计量很大的数字。 使用 `web3.utils.toWei` 可以将 ether 转换为 Wei 。

在 Ether 中，它看起来像这样：

```js
// 获取帐户中的资产（通过地址或者 ENS 名）
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// 通常来说开发者可能会需要为用户格式化一下输出
// 用户更喜欢以 ether（而非 wei）表示的价值
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Web3js 实用功能](https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html#)
- [Ether 实用功能](https://docs.ethers.io/v5/api/utils/)

## 可用的库 {#available-libraries}

**Web3.js -** **_以太坊 JavaScript API。_**

- [相关文档](https://web3js.readthedocs.io/en/1.0/)
- [GitHub](https://github.com/ethereum/web3.js/)

**Ethers.js -** **_JavaScript 和 TypeScript 中完整的以太坊钱包实现和实用工具。_**

- [相关文档](https://docs.ethers.io/ethers.js/html/)
- [GitHub](https://github.com/ethers-io/ethers.js/)

**Graph -** **_用于为以太坊和 IPFS 数据建立索引并使用 GraphQL 对其进行查询的协议。_**

- [Graph](https://thegraph.com/)
- [Graph Explorer](https://thegraph.com/explorer/)
- [相关文档](https://thegraph.com/docs/)
- [GitHub](https://github.com/graphprotocol/)
- [Discord](https://thegraph.com/discord)

**Web3.js -** **_针对轻客户端优化的高级响应式 JS 库。_**

- [GitHub](https://github.com/openethereum/js-libs/tree/master/packages/light.js)

**Web3-wrapper -** **_ 可替代 Web3.js 的 Typescript。_**

- [相关文档](https://0x.org/docs/web3-wrapper#introduction)
- [GitHub](https://github.com/0xProject/0x-monorepo/tree/development/packages/web3-wrapper)

**Alchemyweb3 -** **_用于包裹 Web3.js 的库，带自动重试和增强 API。_**

- [相关文档](https://docs.alchemyapi.io/documentation/alchemy-web3)
- [GitHub](https://github.com/alchemyplatform/alchemy-web3)

## 延伸阅读 {#further-reading}

_你知道有什么社区资源帮助过你吗？ 编辑并添加本页面！_

## 相关主题 {#related-topics}

- [节点和客户端](/developers/docs/nodes-and-clients/)
- [开发框架](/developers/docs/frameworks/)

## 相关教程 {#related-tutorials}

- [设置 Web3js 并在 Javascript 中使用以太坊区块链](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _关于在您的项目中设置 web3.js 的说明。_
- [在 JavaScript 中调用智能合约](/developers/tutorials/calling-a-smart-contract-from-javascript/) _使用 DAI token，从而使用 JavaScript 调用合约函数。_
- [使用 web3 和 Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) 发送交易。 _- 一步步带你了解如何从后端发送一笔交易。_
