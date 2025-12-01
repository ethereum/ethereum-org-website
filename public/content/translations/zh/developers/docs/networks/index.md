---
title: 网络
description: 概述以太坊网络以及在何处获得测试网络的以太币来测试你的应用程序。
lang: zh
---

以太坊网络是一组使用以太坊协议进行通信的互联计算机。 以太坊只有一个主网，但可以创建符合相同协议规则的独立网络用于测试和开发。 有许多独立的“网络”遵循该协议，但彼此之间没有交互。 你甚至可以在自己的计算机上本地启动一个以太坊网络，以测试你的智能合约和 web3 应用程序。

以太坊帐户可在不同的网络上使用，但是帐户余额和交易历史记录不会结转到以太坊主网以外。 进行测试时，了解哪些网络可用以及如何获取可以试用的测试网以太币是很有用的。 一般来说，出于安全考虑，不建议在测试网上重复使用主网帐户，反之亦然。

## 前提条件 {#prerequisites}

你应该先了解[以太坊基础知识](/developers/docs/intro-to-ethereum/)，然后再深入研究不同的网络，因为测试网络将提供一种低廉、安全的以太坊供你试用。

## 公共网络 {#public-networks}

每个人都能通过互联网连接到公共网络。 任何人都可以在公共区块链上读取或创造交易，并且可以验证已经执行的交易。 对等节点间的共识决定交易的添加和网络状态。

### 以太坊主网 {#ethereum-mainnet}

主网是指主要的以太坊生态区块链，所有具有实际价值的交易都发生在该链的分散账本中。

大众和交易所涉及的 ETH 价格是主网的 ETH。

### 以太坊测试网 {#ethereum-testnets}

除了主网外，还有公开的测试网。 这是一种模拟生态环境的网络，协议开发者或智能合约开发者可以使用它们测试尚未部署在主网上的协议升级和智能合约。 你可以把它看作生产与装配服务器的模拟。

在部署到主网之前，你应该在测试网测试编写的任何合约代码。 在与现有智能合约集成的去中心化应用程序中，大多数项目将副本部署到测试网。

大多数测试网最初都使用需要许可的权威证明共识机制。 这意味着会选择少量节点来验证交易并创建新区块——在此过程中将他们的身份进行抵押。 或者，有些测试网采用开放的权益证明共识机制，每个人都可以测试运行验证者，就跟以太坊主网一样。

测试网上的以太币被认为是没有实际价值的；然而，针对已变得稀少或难以获得的特定类型测试网以太币，仍存在一些交易市场。 由于实际中与以太坊（甚至在测试网上）进行交互时需要使用以太币，所以大多数人从水龙头免费获取测试网以太币。 大多数水龙头是网络应用程序，你可以给它输入一个请求发送以太币的地址。

#### 我应该使用哪个测试网？

客户端开发者目前维护的两个公共测试网是 Sepolia 和 Hoodi。 Sepolia 是一个供合约和应用程序开发者测试其应用程序的网络。 Hoodi 网络允许协议开发者测试网络升级，同时让质押者测试运行验证节点。

#### Sepolia {#sepolia}

**Sepolia 是应用程序开发时推荐使用的默认测试网**。 Sepolia 网络采用经授权的验证者组，该验证者组由客户端团队和测试团队共同控制。

##### 资源

- [网站](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### 水龙头

- [QuickNode Sepolia 水龙头](https://faucet.quicknode.com/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [PoW 水龙头](https://sepolia-faucet.pk910.de/)
- [Alchemy Sepolia 水龙头](https://www.alchemy.com/faucets/ethereum-sepolia)
- [Infura Sepolia 水龙头](https://www.infura.io/faucet)
- [Chainstack Sepolia 水龙头](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [以太坊生态水龙头](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [Google Cloud Web3 Sepolia 水龙头](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)

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
- [Blockscout](https://hoodi.cloud.blockscout.com/)

##### 水龙头

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
- [Pk910 工作量证明水龙头](https://ephemery-faucet.pk910.de/)

#### Holesky {#holesky}

Holesky 测试网将于 [2025 年 9 月弃用](https://blog.ethereum.org/en/2025/03/18/hoodi-holesky)。 质押运营商和基础设施提供商应该使用 Hoodi 进行验证者测试。

##### 资源

- [网站](https://holesky.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/holesky)
- [Otterscan](https://holesky.otterscan.io/)
- [Etherscan](https://holesky.etherscan.io/)
- [Blockscout](https://eth-holesky.blockscout.com/)

##### 水龙头

- [QuickNode Holesky 水龙头](https://faucet.quicknode.com/ethereum/holesky)
- [PoW 水龙头](https://holesky-faucet.pk910.de/)
- [Alchemy Holesky 水龙头](https://www.alchemy.com/faucets/ethereum-holesky)
- [Chainstack Holesky 水龙头](https://faucet.chainstack.com/holesky-testnet-faucet)
- [以太坊生态水龙头](https://www.ethereum-ecosystem.com/faucets/ethereum-holesky)
- [Google Cloud Web3 Holesky 水龙头](https://cloud.google.com/application/web3/faucet/ethereum/holesky)

要在 Hoodi 测试网上启动验证者，请使用 [Hoodi 启动板](https://hoodi.launchpad.ethereum.org/en/)。

### 二层网络测试网 {#layer-2-testnets}

[二层网络 (L2)](/layer-2/) 是一种统称，用来描述一系列特定的以太坊扩容解决方案。 二层网络是一条扩展以太坊并继承以太坊安全保障的独立区块链。 二层网络测试网通常与公共以太坊测试网紧密关联。

#### Arbitrum Sepolia {#arbitrum-sepolia}

[Arbitrum](https://arbitrum.io/) 测试网。

##### 资源

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### 水龙头

- [Chainlink 水龙头](https://faucets.chain.link/arbitrum-sepolia)
- [Alchemy 水龙头](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [QuickNode Arbitrum Sepolia 水龙头](https://faucet.quicknode.com/arbitrum/sepolia)
- [Alchemy Arbitrum Sepolia 水龙头](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Chainlink Arbitrum Sepolia 水龙头](https://faucets.chain.link/arbitrum-sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

[Optimism](https://www.optimism.io/) 测试网。

##### 资源

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### 水龙头

- [Chainlink 水龙头](https://faucets.chain.link/optimism-sepolia)
- [Alchemy 水龙头](https://www.alchemy.com/faucets/optimism-sepolia)
- [测试网水龙头](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia {#starknet-sepolia}

[Starknet](https://www.starknet.io) 的测试网。

##### 资源

- [Starkscan](https://sepolia.starkscan.co/)

##### 水龙头

- [Alchemy 水龙头](https://www.alchemy.com/faucets/starknet-sepolia)
- [Starknet 水龙头](https://starknet-faucet.vercel.app/)
- [Blast Starknet Sepolia 水龙头](https://blastapi.io/faucets/starknet-sepolia-eth)

## 私有网络 {#private-networks}

如果以太坊网络的节点未连接到公共网络（ 主网或测试网），则以太坊网络就是私有网络。 在这种情况下，私有仅指保留或隔离，而不是保护或安全。

### 开发网络 {#development-networks}

要开发以太坊应用程序，你需要在私有网络上运行该应用程序以了解它的运行情况，然后再进行部署。 如同在自己的计算机上创建用于 Web 开发的本地服务器，你可以创建本地区块链实例来测试你的去中心化应用程序。 这样，迭代将比公共测试网快很多。

有一些项目和工具专门协助这方面的工作。 进一步了解[开发网络](/developers/docs/development-networks/)。

### 联盟网络 {#consortium-networks}

共识过程由一组预定义的受信任节点控制。 例如，在由知名学术机构组成的私有网络中，每个学术机构管理一个节点，并且区块由网络中的签名者阈值进行验证。

如果说公共以太坊网络像公共互联网，那么联盟网络就像私有内部网。

## 相关工具 {#related-tools}

- [区块链列表](https://chainlist.org/) _ 以太坊虚拟机网络的列表，可将钱包和提供商连接到相应的链 ID 和网络 ID_
- [基于以太坊虚拟机的链](https://github.com/ethereum-lists/chains) _向区块链列表提供支持的 GitHub 链元数据存储库_

## 延伸阅读 {#further-reading}

- [提议：可预测的以太坊测试网生命周期](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [以太坊测试网的演变](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
