---
title: "后端 API 库"
description: "介绍以太坊客户端 API，让你能够从应用程序与区块链进行交互。"
lang: zh
---

为了让软件应用程序与 [以太坊](/) 区块链进行交互（即读取区块链数据和/或向网络发送交易），它必须连接到一个以太坊节点。

为此，每个以太坊客户端都实现了 [JSON-RPC](/developers/docs/apis/json-rpc/) 规范，因此应用程序可以依赖一组统一的[方法](/developers/docs/apis/json-rpc/#json-rpc-methods)。

如果你想使用特定的编程语言连接以太坊节点，生态系统中有许多便捷的库可以使这变得更加容易。借助这些库，开发者可以编写直观的单行方法来初始化 JSON-RPC 请求（在底层），从而与以太坊进行交互。

## 前提条件 {#prerequisites}

了解[以太坊技术栈](/developers/docs/ethereum-stack/)和[以太坊客户端](/developers/docs/nodes-and-clients/)可能会有所帮助。

## 为什么要使用库？ {#why-use-a-library}

这些库抽象了直接与以太坊节点交互的许多复杂性。它们还提供实用函数（例如，将 ETH 转换为 Gwei），因此作为开发者，你可以花更少的时间处理以太坊客户端的复杂细节，而将更多时间集中在应用程序的独特功能上。

## 可用的库 {#available-libraries}

### 基础设施和节点服务 {#infrastructure-and-node-services}

**Alchemy -** **_以太坊开发平台。_**

- [alchemy.com](https://www.alchemy.com/)
- [文档](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)
  
**All That Node -** **_节点即服务 (Node-as-a-Service)。_**

- [All That Node.com](https://www.allthatnode.com/)
- [文档](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Bware Labs 提供的 Blast -** **_用于以太坊主网和测试网的去中心化 API。_**

- [blastapi.io](https://blastapi.io/)
- [文档](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_提供更高效、更快速的 RPC 服务_**

- [blockpi.io](https://blockpi.io/)
- [文档](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare 以太坊网关。**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - 区块浏览器和交易 API**
- [文档](https://docs.etherscan.io/)

**Blockscout - 开源区块浏览器**
- [文档](https://docs.blockscout.com/)

**GetBlock -** **_用于 Web3 开发的区块链即服务 (Blockchain-as-a-service)_**

- [GetBlock.io](https://getblock.io/)
- [文档](https://docs.getblock.io/)

**Infura -** **_以太坊 API 即服务。_**

- [infura.io](https://infura.io)
- [文档](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _高性价比的 EVM JSON-RPC 提供商_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [文档](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _全节点和区块浏览器。_**

- [NOWNodes.io](https://nownodes.io/)
- [文档](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_区块链基础设施即服务。_**

- [quicknode.com](https://quicknode.com)
- [文档](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_由开源软件提供支持的以太坊和以太坊经典 API 即服务。_**

- [rivet.cloud](https://rivet.cloud)
- [文档](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_以速度为导向的以太坊节点，提供 JSON-RPC/WebSockets API。_**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [文档](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### 开发工具 {#development-tools}

**ethers-kt -** **_用于基于 EVM 的区块链的异步、高性能 Kotlin/Java/Android 库。_**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [示例](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_用于区块链的开源 .NET 集成库。_**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [文档](https://docs.nethereum.com/docs/getting-started/welcome/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Python 工具 -** **_通过 Python 进行以太坊交互的各种库。_**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [Web3.py GitHub](https://github.com/ethereum/web3.py)
- [Web3.py 聊天](https://gitter.im/ethereum/web3.py)

**Tatum -** **_终极区块链开发平台。_**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [文档](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**Web3j -** **_用于以太坊的 Java/Android/Kotlin/Scala 集成库。_**

- [GitHub](https://github.com/web3j/web3j)
- [文档](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### 区块链服务 {#blockchain-services}

**BlockCypher -** **_以太坊 Web API。_**

- [blockcypher.com](https://www.blockcypher.com/)
- [文档](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_用于以太坊的一站式 Web3 数据基础设施。_**

- [chainbase.com](https://chainbase.com/)
- [文档](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_弹性且专用的以太坊节点即服务。_**

- [chainstack.com](https://chainstack.com)
- [文档](https://docs.chainstack.com/)
- [以太坊 API 参考](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node -** **_区块链基础设施 API。_**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [文档](https://docs.cdp.coinbase.com/)

**Figment 提供的 DataHub -** **_支持以太坊主网和测试网的 Web3 API 服务。_**

- [DataHub](https://www.figment.io/)
- [文档](https://docs.figment.io/)

**Moralis -** **_企业级 EVM API 提供商。_**

- [moralis.io](https://moralis.io)
- [文档](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [论坛](https://forum.moralis.io/)

**NFTPort -** **_以太坊数据和铸造 API。_**

- [nftport.xyz](https://www.nftport.xyz/)
- [文档](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_通用的多加密货币区块链 API 平台。_**

- [services.tokenview.io](https://services.tokenview.io/)
- [文档](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_提供简单可靠的以太坊区块链 API 访问。_**

- [Watchdata](https://watchdata.io/)
- [文档](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Codex -** **_跨数十条链的实时、丰富的区块链数据 API。_**

- [codex.io](https://www.codex.io/)
- [文档](https://docs.codex.io)
- [浏览器](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Discord](https://discord.com/invite/mFpUhT3vAq)

**Covalent -** **_支持 200 多条链的丰富区块链 API。_**

- [covalenthq.com](https://www.covalenthq.com/)
- [文档](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)


## 延伸阅读 {#further-reading}

_知道对你有帮助的社区资源吗？编辑本页面并添加它！_

## 相关主题 {#related-topics}

- [节点和客户端](/developers/docs/nodes-and-clients/)
- [开发框架](/developers/docs/frameworks/)

## 相关教程 {#related-tutorials}

- [设置 Web3.js 以在 JavaScript 中使用以太坊区块链](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– 在项目中设置 Web3.js 的说明。_
- [从 JavaScript 调用智能合约](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– 使用 DAI 代币，了解如何使用 JavaScript 调用合约函数。_