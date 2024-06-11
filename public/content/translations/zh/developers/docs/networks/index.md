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

客户端开发者目前还在维护的两个公共测试网是 Sepolia 和 Goerli。 Sepolia 是一个供合约和应用程序开发者测试其应用程序的网络。 Goerli 网络是让协议开发者测试网络升级，并让质押人测试运行验证者。

#### Sepolia {#sepolia}

**Sepolia 是应用程序开发时推荐使用的默认测试网**。 Sepolia 网络使用一种需要许可的验证者设置。 它相对较新，即它的状态和历史记录都非常小。 这意味着网络可以快速同步，并且在其上运行节点需要的存储空间更少。 这对于希望快速启动节点并直接与网络交互的用户来讲，是非常有用的。

- 封闭式验证者设置，由客户端和测试团队控制
- 与其他测试网相比，新测试网部署的应用程序较少
- 同步速度快，运行节点需要的磁盘空间最小

##### 资源

- [网站](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan 区块浏览器](https://sepolia.etherscan.io)

##### 水龙头

- [QuickNode Sepolia 水龙头](https://faucet.quicknode.com/drip)
- [Grabteeth](https://grabteeth.xyz/)
- [PoW 水龙头](https://sepolia-faucet.pk910.de/)
- [Coinbase Wallet 水龙头 | Sepolia](https://coinbase.com/faucets/ethereum-sepolia-faucet)
- [Alchemy Sepolia 水龙头](https://sepoliafaucet.com/)
- [Infura Sepolia 水龙头](https://www.infura.io/faucet)
- [Chainstack Sepolia 水龙头](https://faucet.chainstack.com/sepolia-faucet)
- [Testnet Faucet | Sepolia](https://testnet-faucet.com/sepolia/)

#### Goerli _（长期支持）_ {#goerli}

_注意：[Goerli 测试网已弃用](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)，它将在 2023 年被 [Holesovice](https://github.com/eth-clients/holesovice) 取代。 请考虑把你的应用程序迁移至 Sepolia。_

Goerli 是用于测试验证和质押的测试网。 Goerli 网络对想要运行测试网验证者的用户开放。 因此，希望在部署到主网之前测试协议升级的质押人应该使用 Goerli。

- 开放式验证者设置，质押者可以测试网络升级
- 状态比较大，用于测试复杂的智能合约交互
- 同步时间更长，运行节点需要更多存储空间

##### 资源

- [网站](https://goerli.net/)
- [GitHub](https://github.com/eth-clients/goerli)
- [Etherscan 区块浏览器](https://goerli.etherscan.io)

##### 水龙头

- [QuickNode Goerli 水龙头](https://faucet.quicknode.com/drip)
- [Grabteeth](https://grabteeth.xyz/)
- [PoW 水龙头](https://goerli-faucet.pk910.de/)
- [Paradigm 水龙头](https://faucet.paradigm.xyz/)
- [Alchemy Goerli 水龙头](https://goerlifaucet.com/)
- [All That Node Goerli 水龙头](https://www.allthatnode.com/faucet/ethereum.dsrv)
- [Coinbase Wallet 水龙头 | Goerli](https://coinbase.com/faucets/ethereum-goerli-faucet)
- [Chainstack Goerli 水龙头](https://faucet.chainstack.com/goerli-faucet)

要在 Goerli 测试网上启动验证者，请使用 ethstaker 的 ["cheap goerli validator" 启动板](https://goerli.launchpad.ethstaker.cc/en/)。

### 二层网络测试网 {#layer-2-testnets}

[二层网络 (L2)](/layer-2/) 是一种统称，用来描述一系列特定的以太坊扩容解决方案。 二层网络是一条扩展以太坊并继承以太坊安全保障的独立区块链。 二层网络测试网通常与公共以太坊测试网紧密关联。

#### Arbitrum Goerli {#arbitrum-goerli}

[Arbitrum](https://arbitrum.io/) 测试网。

##### 水龙头

- [Chainlink 水龙头](https://faucets.chain.link/)

#### Optimistic Goerli {#optimistic-goerli}

[Optimism](https://www.optimism.io/) 测试网。

##### 水龙头

- [Paradigm 水龙头](https://faucet.paradigm.xyz/)
- [Coinbase Wallet 水龙头 | Optimism Goerli](https://coinbase.com/faucets/optimism-goerli-faucet)

#### Starknet Goerli {#starknet-goerli}

[Starknet](https://www.starknet.io) 的测试网。

##### 水龙头

- [Starknet 水龙头](https://faucet.goerli.starknet.io)

## 私有网络 {#private-networks}

如果以太坊网络的节点未连接到公共网络（ 主网或测试网），则以太坊网络就是私有网络。 在这种情况下，私有仅指保留或隔离，而不是保护或安全。

### 开发网络 {#development-networks}

要开发以太坊应用程序，你需要在私有网络上运行该应用程序以了解它的运行情况，然后再进行部署。 如同在自己的计算机上创建用于 Web 开发的本地服务器，你可以创建本地区块链实例来测试你的去中心化应用程序。 这样，迭代将比公共测试网快很多。

有一些项目和工具专门协助这方面的工作。 进一步了解[开发网络](/developers/docs/development-networks/)。

### 联盟网络 {#consortium-networks}

共识过程由一组预定义的受信任节点控制。 例如，在由知名学术机构组成的私有网络中，每个学术机构管理一个节点，并且区块由网络中的签名者阈值进行验证。

如果说公共以太坊网络像公共互联网，那么联盟网络就像私有内部网。

## 相关工具 {#related-tools}

- [Chainlist](https://chainlist.org/) _ 以太坊虚拟机网络的列表，可将钱包和提供者连接到相应的链 ID 和网络 ID_
- [基于以太坊虚拟机的链](https://github.com/ethereum-lists/chains) _给 Chainlist 提供支持的 GitHub 链元数据存储库_

## 延伸阅读 {#further-reading}

- [提案：可预测的以太坊测试网生命周期](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [以太坊测试网的演变](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
