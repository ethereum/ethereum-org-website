---
title: 后端应用程序接口库
description: 以太坊客户端应用程序接口的介绍，使你能够从你的应用程序中与区块链进行交互。
lang: zh
---

为了使软件应用程序能够与以太坊区块链进行交互（例如：读取区块链数据或发送交易信息到网络），软件必须连接到以太坊节点。

为此，每个以太坊客户端都执行[JSON-RPC](/developers/docs/apis/json-rpc/)规范，以使应用程序可以依赖统一的[方法](/developers/docs/apis/json-rpc/#json-rpc-methods)集。

如果你想使用特定的编程语言去连接以太坊的节点，你可自行选择，但是在社区中已有几个方便的库，可以更方便地实现应用程序与以太坊的连接。 通过这些库，开发者可以方便地写下直观的一行函数来初始化（后端的）JSON RPC 请求并用于与以太坊进行交互。

## 前置要求 {#prerequisites}

了解[以太坊堆栈](/developers/docs/ethereum-stack/)和[以太坊客户端](/developers/docs/nodes-and-clients/)可能会对你有所帮助。

## 为什么要使用库？ {#why-use-a-library}

这些库降低了与一个以太坊节点交互的复杂性。 它们还提供实用的函数（例如：将 ETH 转化为 Gwei），而作为开发者，你可以花费更少的时间来处理以太坊客户端的复杂问题，从而将更多的时间集中于处理你的应用程序的独特功能。

## 可用的库 {#available-libraries}

### 基础设施和节点服务 {#infrastructure-and-node-services}

**Alchemy -** **_以太坊开发平台_**

- [alchemy.com](https://www.alchemy.com/)
- [相关文档](https://docs.alchemy.com/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**All That Node -** **_节点即服务。_**

- [All That Node.com](https://www.allthatnode.com/)
- [相关文档](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast by Bware Labs -** **_面向以太坊主网和测试网的去中心化应用程序接口。_**

- [blastapi.io](https://blastapi.io/)
- [相关文档](https://docs.blastapi.io)
- [Discord](https://discord.gg/bwarelabs)

**BlockPi -** **_提供更高效、更快速的 RPC 服务_**

- [blockpi.io](https://blockpi.io/)
- [相关文档](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare 以太坊网关。**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - 区块浏览器和交易应用程序接口**
- [相关文档](https://docs.etherscan.io/)

**GetBlock -** **_ 用于 Web3 开发的区块链即服务_**

- [GetBlock.io](https://getblock.io/)
- [相关文档](https://getblock.io/docs/)

**Infura -** **_以太坊应用程序接口即服务。_**

- [infura.io](https://infura.io)
- [相关文档](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _经济高效的以太坊虚拟机 JSON-RPC 供应商_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [相关文档](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _全节点和全区块浏览器。_**

- [NOWNodes.io](https://nownodes.io/)
- [相关文档](https://documenter.getpostman.com/view/13630829/TVmFkLwy#intro)

**QuickNode -** **_区块链基础设施即服务。_**

- [quicknode.com](https://quicknode.com)
- [相关文档](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_由开源软件提供支持的以太坊和以太坊经典应用程序接口即服务。_**

- [rivet.cloud](https://rivet.cloud)
- [相关文档](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_注重速度的以太坊节点即 JSON-RPC/WebSockets 应用程序接口。_**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [相关文档](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### 开发工具 {#development-tools}

**Ethers-kt - ****_ 面向基于以太坊虚拟机区块链的高性能异步 Kotlin/Java/Android 库。_**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [示例](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_面向区块链的开源 .NET 集成库。_**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [相关文档](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Python 工具 -** **_通过 Python 和以太坊交互的各种库。_**

- [py.ethereum.org](https://python.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py 聊天](https://gitter.im/ethereum/web3.py)

**QuikNode -** **_终极区块链开发平台。_**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [相关文档](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j -** **_面向以太坊的 Java/Android/Kotlin/Scala 集成库。_**

- [GitHub](https://github.com/web3j/web3j)
- [相关文档](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### 区块链服务 {#blockchain-services}

**BlockCypher -** **_以太坊 Web 应用程序接口。_**

- [blockcypher.com](https://www.blockcypher.com/)
- [相关文档](https://www.blockcypher.com/dev/ethereum/)

**公链 -** **_以太坊的一体化 web3 数据基础设施。_**

- [chainbase.com](https://chainbase.com/)
- [相关文档](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_共享及专用的以太坊节点即服务。_**

- [chainstack.com](https://chainstack.com)
- [相关文档](https://docs.chainbase.com/docs)
- [以太坊应用程序接口参考](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase 云节点 -** **_区块链基础设施应用程序接口。_**

- [Coinbase 云节点](https://www.coinbase.com/cloud)
- [相关文档](https://docs.cloud.coinbase.com/)

**Figment 数据中心 -** **_以太坊主网和测试网的 Web3 应用程序接口服务。_**

- [数据中心](https://www.figment.io/)
- [相关文档](https://docs.figment.io/)

**Moralis -** **_企业级以太坊虚拟机应用程序接口提供商。_**

- [moralis.io](https://moralis.io)
- [相关文档](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [论坛](https://forum.moralis.io/)

**NFTPort -** **_以太坊数据和铸币应用程序接口。_**

- [nftport.xyz](https://www.nftport.xyz/)
- [相关文档](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_ 通用多重加密区块链应用程序接口平台。_**

- [services.tokenview.io](https://services.tokenview.io/)
- [相关文档](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_提供对以太坊区块链简单可靠的API访问。_**

- [Watchdata](https://watchdata.io/)
- [相关文档](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Covalent - ****_适用于 200 多条链的丰富区块链应用程序接口。_**

- [covalenthq.com](https://www.covalenthq.com/)
- [相关文档](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)


## 延伸阅读 {#further-reading}

_还有哪些社区资源对你有所帮助？ 请编辑本页面并添加！_

## 相关主题 {#related-topics}

- [节点和客户端](/developers/docs/nodes-and-clients/)
- [开发框架](/developers/docs/frameworks/)

## 相关教程 {#related-tutorials}

- [设置 Web3js 以在 JavaScript 中使用以太坊区块链](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– 在项目中设置 web3.js 的说明。_
- [在 JavaScript 中调用智能合约](/developers/tutorials/calling-a-smart-contract-from-javascript/) _使用 DAI 代币，从而借助 JavaScript 调用合约函数。_
