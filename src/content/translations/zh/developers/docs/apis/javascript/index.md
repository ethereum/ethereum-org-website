---
title: JavaScript 应用编程接口库
description: 以太坊 JavaScript 应用程序接口的介绍，使您能够从您的应用程序中与区块链进行交互。
lang: zh
---

为了使软件应用程序能够与以太坊区块链进行交互（例如：读取区块链数据或发送交易信息到网络），软件必须连接到以太坊节点。

为此，每种以太坊客户端都实现了 [JSON-RPC](/developers/docs/apis/json-rpc/) 规范，因而应用程序可以依赖一组统一的[方法](/developers/docs/apis/json-rpc/#json-rpc-methods)。

如果您想要用 JavaScript 连接到一个以太坊节点， 可以使用原生 JavaScript，不过生态系统中存在一些方便的库，使得这个事情变得更加容易。 通过这些库，开发者可以写下直观易懂甚至单行的代码就能初始化与以太坊的互动（背后使用 JSON RPC 请求）。

请注意，自从[合并](/roadmap/merge/)以来，运行一个节点需要两个连接的以太坊软件 - 一个执行客户端和一个共识客户端。 请确保你的节点同时包含执行客户端和共识客户端。 如果你的节点不在本地计算机上（例如，你的节点在 AWS 实例上运行），请相应地更新教程中的 IP 地址。 有关更多信息，请参阅我们关于[运行节点](/developers/docs/nodes-and-clients/run-a-node/)的页面。

## 前提条件 {#prerequisites}

除了了解 JavaScript 外，了解[以太坊堆栈](/developers/docs/ethereum-stack/)和[以太坊客户端](/developers/docs/nodes-and-clients/)也许是有帮助的。

## 为什么要使用库？ {#why-use-a-library}

这些库降低了与一个以太坊节点直接交互的复杂性。 它们还提供实用功能（例如：将以太币转换为 Gwei），因此作为开发者，你可以花费更少的时间处理以太坊客户端的复杂问题，而将更多的时间集中于处理应用程序的独特功能。

## 库功能 {#library-features}

### 连接到以太坊节点 {#connect-to-ethereum-nodes}

使用提供程序，这些库允许你连接到以太坊并读取它的数据，不管是通过 JSON-RPC、INFURA、Etherscan、Alchemy 还是 Metamask。

**Ethers 示例**

```js
// A Web3Provider wraps a standard Web3 provider, which is
// what MetaMask injects as window.ethereum into each page
const provider = new ethers.providers.Web3Provider(window.ethereum)

// The MetaMask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// 为此，我们需要帐户签名者...
const signer = provider.getSigner()
```

**Web3js 示例**

```js
var web3 = new Web3("http://localhost:8545")
// or
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// change provider
web3.setProvider("ws://localhost:8546")
// or
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// Using the IPC provider in node.js
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // mac os path
// or
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // mac os path
// on windows the path is: "\\\\.\\pipe\\geth.ipc"
// on linux the path is: "/users/myuser/.ethereum/geth.ipc"
```

一旦设置，你将能够查询区块链的以下内容：

- 区块号
- 燃料估算
- 智能合约事件
- 网络 ID
- 以及更多...

### 钱包功能 {#wallet-functionality}

这些库为你提供了创建钱包、管理密匙和签署交易的功能。

这里提供了 Ethers 中的一个示例

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

一旦设置，你将能够：

- 创建帐户
- 发送交易
- 签署交易
- 以及更多...

### 与智能合约交互的方法 {#interact-with-smart-contract-functions}

JavaScript 客户端库允许你的应用程序通过读取已编译合约的应用程序二进制接口 (ABI) 来调用智能合约函数。

ABI 本质上是以 JSON 格式解释了合约的功能，并且允许你像普通 JavaScript 对象一样使用它。

以下 Solidity 合约：

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

将会产生以下 JSON 代码：

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
- 调用方法去评估对气体的需求量。这个方法的执行是在以太坊虚拟机中执行的。
- 部署一个合约
- 以及更多...

### 实用功能 {#utility-functions}

这些实用功能为你提供了方便的快捷操作，让以太坊的构建变得更轻松一些。

以太币的默认价值单位是 Wei。 1 个以太币 = 1,000,000,000,000,000,000 WEI – 这意味着你需要处理很多的数字。 使用 `web3.utils.toWei` 可以将以太币转换为 Wei。

在 ethers 中，它看起来是这样的：

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
- [Ethers 实用功能](https://docs.ethers.io/v5/api/utils/)

## 可用的库 {#available-libraries}

**Web3.js -** **_以太坊 JavaScript API。_**

- [相关文档](https://web3js.readthedocs.io/en/1.0/)
- [GitHub](https://github.com/ethereum/web3.js/)

**Ethers.js -** **_JavaScript 和 TypeScript 中完整的以太坊钱包实现和实用工具。_**

- [相关文档](https://docs.ethers.io/)
- [GitHub](https://github.com/ethers-io/ethers.js/)

**Graph -** **_用于为以太坊和星际文件系统数据建立索引并使用 GraphQL 对其进行查询的协议。_**

- [图表](https://thegraph.com/)
- [Graph Explorer](https://thegraph.com/explorer/)
- [相关文档](https://thegraph.com/docs/)
- [GitHub](https://github.com/graphprotocol/)
- [Discord](https://thegraph.com/discord)

**light.js -** **_针对轻客户端优化的高级响应式 JS 库。_**

- [GitHub](https://github.com/openethereum/js-libs/tree/master/packages/light.js)

**Web3-wrapper -** **_可替代 Web3.js 的 Typescript。_**

- [相关文档](https://0x.org/docs/web3-wrapper#introduction)
- [GitHub](https://github.com/0xProject/0x-monorepo/tree/development/packages/web3-wrapper)

**Alchemyweb3 -** **_Web3.js 的包装器，带自动重试和增强的应用程序接口。_**

- [相关文档](https://docs.alchemy.com/reference/api-overview)
- [GitHub](https://github.com/alchemyplatform/alchemy-web3)

**Alchemy 非同质化代币应用程序接口 -** **_ 用于提取非同质化代币数据的应用程序接口，包括所有权、元数据属性等数据。_**

- [相关文档](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
- [GitHub](https://github.com/alchemyplatform/alchemy-web3)

**viem -** **_以太坊的 TypeScript 接口。_**

- [相关文档](https://viem.sh)
- [Github](https://github.com/wagmi-dev/viem)

## 延伸阅读 {#further-reading}

_还有哪些社区资源对您有所帮助？ 编辑并添加本页面！_

## 相关主题 {#related-topics}

- [节点和客户端](/developers/docs/nodes-and-clients/)
- [开发框架](/developers/docs/frameworks/)

## 相关教程 {#related-tutorials}

- [设置 Web3js 以在 JavaScript 中使用以太坊区块链](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– 在项目中设置 web3.js 的说明。_
- [在 JavaScript 中调用智能合约](/developers/tutorials/calling-a-smart-contract-from-javascript/) _使用 DAI 代币，从而借助 JavaScript 调用合约函数。_
- [使用 Web3 和 Alchemy 发送交易](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– 从后端发送交易分步指南。_
