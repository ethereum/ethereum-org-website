---
title: 与智能合约交互
description: 了解如何读取和写入已部署在以太坊上的智能合约。
lang: zh
---

你并不总是需要编写和部署自己的智能合约。作为开发者，大多数时候你会希望与其他人已经部署到以太坊网络上的智能合约进行交互。

本页面介绍了与智能合约交互的两种基本方式——**读取**数据和**写入**数据——以及执行这两种操作所需的工具。

## 前提条件 {#prerequisites}

你应该了解：

- [智能合约的工作原理](/developers/docs/smart-contracts/)
- [以太坊账户及其如何签署交易](/developers/docs/accounts/)
- [什么是交易](/developers/docs/transactions/)

## 与智能合约交互的两种方式 {#two-ways}

与智能合约的交互分为两类：

### 从合约中读取 {#reading-from-a-contract}

读取是一种**免费**操作，它不会创建交易，也不会改变区块链上的任何状态。

当你从合约中读取时，你只是在查询已经存在的数据。例如：

- 检查 ERC-20 代币余额
- 从去中心化交易所读取当前价格
- 获取 NFT 的所有者

因为读取不会修改状态，所以它们不消耗 [Gas](/developers/docs/gas/)，任何人都可以执行而无需 ETH。

### 写入合约 {#writing-to-a-contract}

写入是一种**改变状态**的操作，需要发起交易并消耗 Gas。

当你向合约写入时，你正在触发一个修改区块链状态的函数。例如：

- 转移代币
- 在去中心化交易所兑换代币
- 铸造 NFT

写入始终需要：

1. 一个拥有足够 ETH 支付 Gas 费的[外部拥有账户 (EOA)](/developers/docs/accounts/#types-of-account)
2. 一笔由该账户私钥签名的交易
3. 交易被打包并包含在区块中

借助[账户抽象](/roadmap/account-abstraction/)，智能合约账户也可以发起写入操作，并且代付合约可以代表用户支付 Gas 费——因此并不严格要求必须拥有持有 ETH 的外部拥有账户 (EOA)。

## 了解合约 ABI {#understanding-contract-abis}

要与智能合约交互，你的应用程序需要知道合约能做*什么*。这就是**应用程序二进制接口 (ABI)** 发挥作用的地方。

ABI 是一个 JSON 文档，描述了：

- 合约暴露的每个函数（名称、输入、输出）
- 合约可以发出的每个事件
- 在与合约通信时如何编码和解码数据

可以将 ABI 视为合约的说明书——没有它，你的应用程序就不知道存在哪些函数或它们期望什么参数。

### 在哪里可以找到合约的 ABI {#where-to-find-abis}

- **Etherscan 上已验证的合约** - [Etherscan](https://etherscan.io) 会自动公开已验证源代码的 ABI
- **来自开发者** - 许多项目会在其文档或 npm 包中发布它们的 ABI
- **从源代码生成** - 如果你有 Solidity 源代码，你可以[编译它](/developers/docs/smart-contracts/compiling/)以生成 ABI

## 用于与合约交互的工具和库 {#tools-and-libraries}

开发者通常使用 JavaScript/TypeScript 库从 Web 应用、后端或脚本与合约进行交互。

### 客户端库 (JavaScript/TypeScript) {#client-libraries}

- **[Viem](https://viem.sh)** - 现代、轻量级的以太坊 TypeScript 接口，具有一流的类型安全性
- **[Ethers.js](https://docs.ethers.org/)** - 经过实战检验的以太坊区块链交互库
- **[Web3.js](https://web3js.org/)** - 最初的以太坊 JavaScript API

### 后端库 {#backend-libraries}

- **[Ethers.js](https://docs.ethers.org/)** - 也可在 Node.js 中用于服务器端脚本和机器人
- **[Web3.py](https://web3py.readthedocs.io/)** - 用于以太坊交互的 Python 库
- **[go-ethereum](https://geth.ethereum.org/docs/interact-with-geth)** - Geth 团队提供的官方 Go 库

### 示例：使用 Viem 读取代币余额 {#example-viem}

```ts
import { createPublicClient, http, formatUnits } from 'viem'
import { mainnet } from 'viem/chains'

// USDC 合约地址和 ABI（部分，用于 balanceOf）
const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const abi = [{
  name: 'balanceOf',
  type: 'function',
  stateMutability: 'view',
  inputs: [{ name: 'account', type: 'address' }],
  outputs: [{ name: '', type: 'uint256' }],
}] as const

const client = createPublicClient({ chain: mainnet, transport: http() })

const balance = await client.readContract({
  address: USDC,
  abi,
  functionName: 'balanceOf',
  args: ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'], // vitalik.eth
})

console.log(formatUnits(balance, 6)) // USDC 有 6 位小数
```

### 示例：使用 Ethers.js 发送交易 {#example-ethers}

```js
const { ethers } = require('ethers')

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

// ERC-20 转账 ABI
const abi = ['function transfer(address to, uint256 amount) returns (bool)']
const contract = new ethers.Contract(tokenAddress, abi, wallet)

const tx = await contract.transfer(recipient, ethers.parseUnits('10', 18))
await tx.wait() // 等待交易被打包
console.log(`Transferred! TX: ${tx.hash}`)
```

## 事件和日志 {#events-and-logs}

智能合约可以发出**事件**来发出某事已发生的信号。你的应用程序可以监听这些事件以进行实时响应。

```ts
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })

// 监听 USDC Transfer 事件
const unwatch = client.watchEvent({
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  onLogs: (logs) => console.log(logs),
})
```

## 模拟交易 {#simulating}

在发送交易之前，你可以**模拟**它以检查它是否会成功——并查看其返回值——而无需消耗 Gas。这对于及早发现错误和预览结果非常有用。

大多数客户端库通过 `eth_call` 支持此功能：

```ts
// 使用 Viem
const result = await client.simulateContract({
  address: contractAddress,
  abi,
  functionName: 'swap',
  args: [amountIn],
  account: userAddress,
})
```

## 钱包和签名 {#wallets-and-signing}

在去中心化应用 (dapp) 中，用户的钱包（如梅塔马斯克、Rainbow 或 WalletConnect）负责处理签名。你不需要直接管理私钥。

[钱包库和连接工具](/developers/docs/apis/javascript/)对此进行了抽象，因此你可以专注于构建应用程序逻辑。

## 相关教程 {#related-tutorials}

- [从 JavaScript 调用智能合约](/developers/tutorials/calling-a-smart-contract-from-javascript/)
- [使用 Web3.js 和 Alchemy 发送交易](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
- [如何在钱包中查看你的 NFT](/developers/tutorials/how-to-view-nft-in-metamask/)

## 延伸阅读 {#further-reading}

- [Viem 文档：读取和写入合约](https://viem.sh/docs/contract/readContract)
- [Ethers.js 文档：合约](https://docs.ethers.org/v6/api/contract/)
- [Solidity ABI 规范](https://docs.soliditylang.org/en/latest/abi-spec.html)
- [什么是 ABI？ - Alchemy](https://www.alchemy.com/overviews/what-is-an-abi)

## 相关主题 {#related-topics}

- [编译智能合约](/developers/docs/smart-contracts/compiling/)
- [部署智能合约](/developers/docs/smart-contracts/deploying/)
- [JavaScript API](/developers/docs/apis/javascript/)
- [后端 API](/developers/docs/apis/backend/)