---
title: "网络"
description: "概述以太坊网络以及在何处获得测试网络的以太币来测试你的应用程序。"
lang: zh
---

以太坊网络是一组使用以太坊协议进行通信的互联计算机。 以太坊只有一个主网，但可以创建符合相同协议规则的独立网络用于测试和开发。 有许多独立的“网络”遵循该协议，但彼此之间没有交互。 你甚至可以在自己的计算机上本地启动一个以太坊网络，以测试你的智能合约和 web3 应用程序。

以太坊帐户可在不同的网络上使用，但是帐户余额和交易历史记录不会结转到以太坊主网以外。 进行测试时，了解哪些网络可用以及如何获取可以试用的测试网以太币是很有用的。 一般来说，出于安全考虑，不建议在测试网上重复使用主网帐户，反之亦然。

## 前提条件 {#prerequisites}

你应该先了解[以太坊基础知识](/developers/docs/intro-to-ethereum/)，然后再深入研究不同的网络，因为测试网将为你提供一个廉价、安全的以太坊版本来试用。

## 公共网络 {#public-networks}

每个人都能通过互联网连接到公共网络。 任何人都可以在公共区块链上读取或创造交易，并且可以验证已经执行的交易。 对等节点间的共识决定交易的添加和网络状态。

### 以太坊主网 {#ethereum-mainnet}

主网是指主要的以太坊生态区块链，所有具有实际价值的交易都发生在该链的分散账本中。

当人们和交易所讨论 ETH 价格时，他们谈论的是主网 ETH。

### 以太坊测试网 {#ethereum-testnets}

除了主网之外，还有公共测试网。 这些是协议开发者或智能合约开发者用来在部署到主网前，于类似生产的环境中测试协议升级以及潜在智能合约的网络。 你可以把它看作生产与装配服务器的模拟。

在部署到主网之前，你应该在测试网测试编写的任何合约代码。 在与现有智能合约集成的去中心化应用程序中，大多数项目将副本部署到测试网。

大多数测试网最初都使用需要许可的权威证明共识机制。 这意味着会选择少量节点来验证交易并创建新区块——在此过程中将他们的身份进行抵押。 或者，有些测试网采用开放的权益证明共识机制，每个人都可以测试运行验证者，就跟以太坊主网一样。

测试网上的以太币被认为是没有实际价值的；然而，针对已变得稀少或难以获得的特定类型测试网以太币，仍存在一些交易市场。 由于实际中与以太坊（甚至在测试网上）进行交互时需要使用以太币，所以大多数人从水龙头免费获取测试网以太币。 大多数水龙头是网络应用程序，你可以给它输入一个请求发送以太币的地址。

#### 我应该使用哪个测试网？

客户端开发者目前维护的两个公共测试网是 Sepolia 和 Hoodi。 Sepolia 是一个供合约和应用程序开发者测试其应用程序的网络。 Hoodi 网络允许协议开发者测试网络升级，同时让质押者测试运行验证节点。

#### Sepolia {#sepolia}

**Sepolia 是应用程序开发时推荐使用的默认测试网**。 Sepolia 网络使用一个许可式验证者集，由客户端与测试团队控制。

##### 资源

- [网站](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### 水龙头

- [Alchemy Sepolia 水龙头](https://www.alchemy.com/faucets/ethereum-sepolia)
- [Chain Platform Sepolia 水龙头](https://faucet.chainplatform.co/faucets/ethereum-sepolia/)
- [Chainstack Sepolia 水龙头](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [以太坊生态系统水龙头](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [ethfaucet.com Sepolia 水龙头](https://ethfaucet.com/networks/ethereum)
- [Google Cloud Web3 Sepolia 水龙头](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Infura Sepolia 水龙头](https://www.infura.io/faucet)
- [PoW 水龙头](https://sepolia-faucet.pk910.de/)
- [QuickNode Sepolia 水龙头](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#hoodi}

Hoodi 是用于测试验证和质押的测试网。 Hoodi 网络对想要运行测试网验证者的用户开放。 因此，想在主网部署前测试协议升级的质押者应该使用 Hoodi网络。

- 开放式验证者组，质押者可以测试网络升级
- 大规模状态，用于测试复杂的智能合约交互
- 同步时间更长，运行节点需要更多存储空间

##### 资源

- [网站](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [浏览器](https://explorer.hoodi.ethpandaops.io/)
- [检查点同步](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### 水龙头

- [Chain Platform Hoodi 水龙头](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [Hoodi 水龙头](https://hoodi.ethpandaops.io/)
- [PoW 水龙头](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

Ephemery 是一种独特的测试网，每个月都会彻底重置。 执行和共识状态每 28 天回滚至创世状态，这意味着在测试网上发生的任何事情都是临时的。 这使其非常适合短期测试，节点快速启动以及开发无需数据持久性的 "hello world"（（入门级）应用程序。

- 始终新鲜的状态，适用于验证者和应用程序的短期测试
- 仅包含基本的合约集
- 开放验证者集，能够轻松访问大量资金
- 最低的节点要求和最快的同步速度，平均小于 5GB

##### 资源

- [网站](https://ephemery.dev/)
- [Github](https://github.com/ephemery-testnet/ephemery-resources)
- [社区聊天](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [信标浏览器](https://beaconlight.ephemery.dev/)
- [检查点同步](https://checkpoint-sync.ephemery.ethpandaops.io)
- [启动板](https://launchpad.ephemery.dev/)

#### 水龙头

- [Bordel 水龙头](https://faucet.bordel.wtf/)
- [Pk910 PoW 水龙头](https://ephemery-faucet.pk910.de/)

#### Holesky（已弃用）{#holesky}

Holesky 测试网将于 2025 年 9 月停用。 质押运营商和基础设施提供商应该使用 Hoodi 进行验证者测试。

- [Holesky 测试网关闭公告](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _以太坊基金会博客，2025 年 9 月 1 日_
- [Holesky 和 Hoodi 测试网更新](https://blog.ethereum.org/en/2025/03/18/hoodi-holesky) - _以太坊基金会博客，2025 年 3 月 18 日_

### 二层网络测试网 {#layer-2-testnets}

[二层网络 (L2)](/layer-2/) 是一种统称，用来描述一系列特定的以太坊扩容解决方案。 二层网络是一条扩展以太坊并继承以太坊安全保障的独立区块链。 二层网络测试网通常与公共以太坊测试网紧密关联。

#### Arbitrum Sepolia {#arbitrum-sepolia}

[Arbitrum](https://arbitrum.io/) 的测试网。

##### 资源

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### 水龙头

- [Alchemy Arbitrum Sepolia 水龙头](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Chainlink Arbitrum Sepolia 水龙头](https://faucets.chain.link/arbitrum-sepolia)
- [ethfaucet.com Arbitrum Sepolia 水龙头](https://ethfaucet.com/networks/arbitrum)
- [QuickNode Arbitrum Sepolia 水龙头](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

[Optimism](https://www.optimism.io/) 的测试网。

##### 资源

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### 水龙头

- [Alchemy 水龙头](https://www.alchemy.com/faucets/optimism-sepolia)
- [Chainlink 水龙头](https://faucets.chain.link/optimism-sepolia)
- [ethfaucet.com Optimism Sepolia 水龙头](https://ethfaucet.com/networks/optimism)
- [测试网水龙头](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia {#starknet-sepolia}

[Starknet](https://www.starknet.io) 的测试网。

##### 资源

- [Voyager Sepolia Scan](https://sepolia.voyager.online/)

##### 水龙头

- [Alchemy 水龙头](https://www.alchemy.com/faucets/starknet-sepolia)
- [Blast Starknet Sepolia 水龙头](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Starknet 水龙头](https://starknet-faucet.vercel.app/)

## 私有网络 {#private-networks}

如果一个以太坊网络的节点未连接到公共网络（即主网或测试网），那么它就是一个私有网络。 在这种情况下，私有仅指保留或隔离，而不是保护或安全。

### 开发网络 {#development-networks}

要开发以太坊应用程序，你需要在私有网络上运行该应用程序以了解它的运行情况，然后再进行部署。 如同在自己的计算机上创建用于 Web 开发的本地服务器，你可以创建本地区块链实例来测试你的去中心化应用程序。 这样，迭代将比公共测试网快很多。

有一些项目和工具专门协助这方面的工作。 了解有关[开发网络](/developers/docs/development-networks/)的更多信息。

### 联盟网络 {#consortium-networks}

共识过程由一组预定义的受信任节点控制。 例如，在由知名学术机构组成的私有网络中，每个学术机构管理一个节点，并且区块由网络中的签名者阈值进行验证。

如果说公共以太坊网络像公共互联网，那么联盟网络就像私有内部网。

## <Emoji text="🚉" /> 为什么以太坊测试网以地铁站命名？ {#why-naming}

许多以太坊测试网以现实世界中的地铁站或火车站命名。 这一命名传统很早就开始了，它反映了贡献者们生活或工作过的全球城市。 它具有象征意义，令人难忘且实用。 就像测试网与以太坊主网隔离一样，地铁线路也与地面交通分开运行。

### <Emoji text="🚧" /> 常用测试网和旧测试网 {#common-and-legacy-testnets}

- **Sepolia** - 希腊雅典一个与地铁相连的社区。 目前用于智能合约和去中心化应用程序测试。
- **Hoodi** - 以印度班加罗尔的 Hoodi 地铁站命名。 用于验证者和协议升级测试。
- **Goerli**_（已弃用）_ - 以德国柏林的 Görlitzer Bahnhof 命名。
- **Rinkeby**_（已弃用）_ - 以斯德哥尔摩一个有地铁站的郊区命名。
- **Ropsten**_（已弃用）_ - 指斯德哥尔摩的一个地区和前渡轮/地铁总站。
- **Kovan**_（已弃用）_ - 以新加坡的一个地铁站命名。
- **Morden**_（已弃用）_ - 以伦敦的一个地铁站命名。 以太坊的第一个公共测试网。

### <Emoji text="🧪" /> 其他专用测试网 {#other-testnets}

一些测试网是为短期或特定升级测试而创建的，不一定是以地铁为主题：

- **Holesky**_（已弃用）_ - 以布拉格的 Holešovice 站命名。 用于验证者测试；于 2025 年弃用。
- **Kiln**、**Zhejiang**、**Shandong**、**Prater**、**Pyrmont**、**Olympic**_（均已弃用）_和 **Ephemery** - 为“合并”、上海升级等升级模拟或验证者实验而专门构建。 一些名称是地域性或主题性的，而不是基于地铁站。

使用地铁站名称有助于开发者快速识别和记住测试网，而无需依赖数字链 ID。 这也反映了以太坊的文化：实用、全球化和以人为本。

## 相关工具 {#related-tools}

- [Chainlist](https://chainlist.org/) _EVM 网络列表，用于将钱包和提供商连接到相应的链 ID 和网络 ID_
- [基于 EVM 的链](https://github.com/ethereum-lists/chains) _为 Chainlist 提供支持的链元数据 GitHub 代码库_

## 扩展阅读{#further-reading}

- [提案：可预测的以太坊测试网生命周期](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [以太坊测试网的演变](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
