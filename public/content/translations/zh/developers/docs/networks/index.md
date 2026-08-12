---
title: "网络"
description: "以太坊网络概述，以及在哪里获取测试网以太币 (ETH) 以测试你的应用。"
lang: zh
---

[以太坊](/)网络是使用以太坊协议进行通信的互联计算机组。只有一个以太坊主网，但可以出于测试和开发目的创建符合相同协议规则的独立网络。有许多符合该协议但不相互交互的独立“网络”。你甚至可以在自己的计算机上本地启动一个网络，用于测试你的智能合约和 Web3 应用。

你的以太坊账户可以在不同的网络中使用，但你的账户余额和交易历史记录不会从以太坊主网结转。出于测试目的，了解哪些网络可用以及如何获取测试网 ETH 进行测试非常有用。通常，出于安全考虑，不建议在测试网上重复使用主网账户，反之亦然。

## 先决条件 {#prerequisites}

在阅读有关不同网络的内容之前，你应该了解[以太坊基础知识](/developers/docs/intro-to-ethereum/)，因为测试网将为你提供一个廉价、安全的以太坊版本来进行测试。

## 公共网络 {#public-networks}

世界上任何有互联网连接的人都可以访问公共网络。任何人都可以在公共区块链上读取或创建交易，并验证正在执行的交易。对等节点之间的共识决定了交易的包含和网络的状态。

### 以太坊主网 {#ethereum-mainnet}

主网是主要的公共以太坊生产区块链，实际价值的交易发生在这个分布式账本上。

当人们和交易所讨论 ETH 价格时，他们谈论的是主网 ETH。

### 以太坊测试网 {#ethereum-testnets}

除了主网之外，还有公共测试网。这些是协议开发者或智能合约开发者使用的网络，用于在部署到主网之前，在类似生产的环境中测试协议升级以及潜在的智能合约。可以将其视为生产服务器与预发布服务器的类比。

在部署到主网之前，你应该在测试网上测试你编写的任何合约代码。在与现有智能合约集成的去中心化应用 (dapp) 中，大多数项目都在测试网上部署了副本。

大多数测试网最初使用的是许可型权威证明共识机制。这意味着选择少数节点来验证交易并创建新区块——在此过程中质押它们的身份。或者，一些测试网采用开放的权益证明 (PoS) 共识机制，每个人都可以像在以太坊主网一样测试运行验证者。

测试网上的 ETH 本应没有实际价值；然而，对于某些变得稀缺或难以获得的测试网 ETH，已经出现了市场。由于你需要 ETH 才能真正与以太坊交互（即使在测试网上），大多数人从水龙头免费获取测试网 ETH。大多数水龙头都是 Web 应用，你可以在其中输入一个地址，请求将 ETH 发送到该地址。

#### 我应该使用哪个测试网？ {#which-testnet-should-i-use}

客户端开发者目前维护的两个公共测试网是 Sepolia 和 Hoodi。Sepolia 是供合约和应用开发者测试其应用的网络。Hoodi 网络让协议开发者测试网络升级，并让质押者测试运行验证者。

#### Sepolia {#sepolia}

**Sepolia 是推荐用于应用开发的默认测试网**。Sepolia 网络使用由客户端和测试团队控制的许可型验证者集。

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

Hoodi 是一个用于测试验证和质押的测试网。Hoodi 网络向希望运行测试网验证者的用户开放。因此，希望在协议升级部署到主网之前对其进行测试的质押者应该使用 Hoodi。

- 开放的验证者集，质押者可以测试网络升级
- 庞大的状态，有助于测试复杂的智能合约交互
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

Ephemery 是一种独特的测试网，每个月都会完全重置。执行和共识状态每 28 天恢复到创世状态，这意味着在测试网上发生的任何事情都是短暂的。这使其成为短期测试、快速节点引导和不需要持久性的“hello world”类应用的理想选择。

- 始终保持全新状态，适合验证者和应用的短期测试
- 仅包含基本合约集
- 开放的验证者集，易于获取大量资金
- 节点要求最低，同步最快，平均小于 5GB

##### 资源

- [网站](https://ephemery.dev/)
- [GitHub](https://github.com/ephemery-testnet/ephemery-resources)
- [社区聊天](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [信标链浏览器](https://beaconlight.ephemery.dev/)
- [检查点同步](https://checkpoint-sync.ephemery.ethpandaops.io)
- [启动板 (Launchpad)](https://launchpad.ephemery.dev/)

#### 水龙头 {#faucets}

- [Bordel 水龙头](https://faucet.bordel.wtf/)
- [Pk910 PoW 水龙头](https://ephemery-faucet.pk910.de/)

#### Holesky（已弃用） {#holesky}

Holesky 测试网已于 2025 年 9 月弃用。质押运营商和基础设施提供商应改用 Hoodi 进行验证者测试。

- [Holesky 测试网关闭公告](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _以太坊基金会博客，2025 年 9 月 1 日_
- [Holesky 和 Hoodi 测试网更新](https://blog.ethereum.org/2025/03/18/hoodi-holesky) - _以太坊基金会博客，2025 年 3 月 18 日_

### 二层网络 (l2) 测试网 {#layer-2-testnets}

[二层网络 (l2)](/layer-2/) 是描述一组特定以太坊扩容解决方案的统称。二层网络 (l2) 是一个独立的区块链，它扩展了以太坊并继承了以太坊的安全保证。二层网络 (l2) 测试网通常与公共以太坊测试网紧密耦合。

#### Arbitrum Sepolia {#arbitrum-sepolia}

[Arbitrum](https://arbitrum.io/) 的测试网。

##### 资源

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### 水龙头

- [Alchemy Arbitrum Sepolia 水龙头](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [切恩林克 Arbitrum Sepolia 水龙头](https://faucets.chain.link/arbitrum-sepolia)
- [ethfaucet.com Arbitrum Sepolia 水龙头](https://ethfaucet.com/networks/arbitrum)
- [QuickNode Arbitrum Sepolia 水龙头](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

[Optimism](https://www.optimism.io/) 的测试网。

##### 资源

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### 水龙头

- [Alchemy 水龙头](https://www.alchemy.com/faucets/optimism-sepolia)
- [切恩林克水龙头](https://faucets.chain.link/optimism-sepolia)
- [ethfaucet.com Optimism Sepolia 水龙头](https://ethfaucet.com/networks/optimism)
- [测试网水龙头](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia {#starknet-sepolia}

[Starknet](https://www.starknet.io) 的测试网。

##### 资源

- [Voyager Sepolia 浏览器](https://sepolia.voyager.online/)

##### 水龙头

- [Alchemy 水龙头](https://www.alchemy.com/faucets/starknet-sepolia)
- [Blast Starknet Sepolia 水龙头](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Starknet 水龙头](https://starknet-faucet.vercel.app/)

## 私有网络 {#private-networks}

如果以太坊网络的节点未连接到公共网络（即主网或测试网），则该网络为私有网络。在这种情况下，私有仅意味着保留或隔离，而不是受保护或安全。

### 开发网络 {#development-networks}

要开发以太坊应用，你会希望在部署之前在私有网络上运行它，以查看其工作情况。类似于你在计算机上为 Web 开发创建本地服务器，你可以创建一个本地区块链实例来测试你的去中心化应用 (dapp)。这允许比公共测试网更快的迭代。

有专门的项目和工具来协助完成这项工作。了解有关[开发网络](/developers/docs/development-networks/)的更多信息。

### 联盟网络 {#consortium-networks}

共识过程由一组预定义的受信任节点控制。例如，由已知学术机构组成的私有网络，每个机构管理一个节点，并且区块由网络内达到阈值数量的签名者进行验证。

如果公共以太坊网络就像公共互联网，那么联盟网络就像私有内联网。

## <Emoji text="🚉" /> 为什么以太坊测试网以地铁站命名？ {#why-naming}

许多以太坊测试网以现实世界中的地铁站或火车站命名。这种命名传统很早就开始了，反映了贡献者生活或工作过的全球城市。它具有象征意义、令人难忘且实用。就像测试网与以太坊主网隔离一样，地铁线路也与地面交通分开运行。

### <Emoji text="🚧" /> 常用和旧版测试网 {#common-and-legacy-testnets}

- **Sepolia** - 希腊雅典一个与地铁相连的街区。目前用于智能合约和去中心化应用 (dapp) 测试。
- **Hoodi** - 以印度班加罗尔的 Hoodi 地铁站命名。用于验证者和协议升级测试。
- **Goerli** _（已弃用）_ - 以德国柏林的 Görlitzer Bahnhof 命名。
- **Rinkeby** _（已弃用）_ - 以斯德哥尔摩一个有地铁站的郊区命名。
- **Ropsten** _（已弃用）_ - 指斯德哥尔摩的一个地区和前渡轮/地铁终点站。
- **Kovan** _（已弃用）_ - 以新加坡的一个地铁站命名。
- **Morden** _（已弃用）_ - 以伦敦的一个地铁站命名。以太坊的第一个公共测试网。

### <Emoji text="🧪" /> 其他专用测试网 {#other-testnets}

一些测试网是为短期或特定升级测试而创建的，不一定以地铁为主题：

- **Holesky** _（已弃用）_ - 以布拉格的 Holešovice 站命名。用于验证者测试；于 2025 年弃用。
- **Kiln**、**Zhejiang**、**Shandong**、**Prater**、**Pyrmont**、**Olympic** _（均已弃用）_ 和 **Ephemery** - 专为合并、上海等升级模拟或验证者实验而构建。有些名称是区域性或主题性的，而不是基于地铁的。

使用地铁站名称有助于开发者快速识别和记住测试网，而无需依赖数字链 ID。这也反映了以太坊的文化：实用、全球化和以人为本。

## 相关工具 {#related-tools}

- [Chainlist](https://chainlist.org/) _EVM 网络列表，用于将钱包和提供商连接到适当的链 ID 和网络 ID_
- [基于 EVM 的链](https://github.com/ethereum-lists/chains) _为 Chainlist 提供支持的链元数据的 GitHub 仓库_

## 延伸阅读 {#further-reading}

- [提案：可预测的以太坊测试网生命周期](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [以太坊测试网的演变](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
