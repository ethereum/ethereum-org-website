---
title: 网络
description: 概述以太坊网络以及在何处获得测试网络的以太币来测试您的应用程序。
lang: zh
---

网络是指可在其中进行开发、测试或布置生产用例的各种不同以太坊环境。 以太坊是一种协议，因此可以有多个符合该协议且彼此不会影响的独立“网络”。

以太坊帐户可在不同的网络上使用，但是帐户余额和交易历史记录不会结转到以太坊主网以外。 进行测试时，了解哪些网络可用以及如何获取可以试用的测试网以太币是很有用的。

## 前置要求 {#prerequisites}

你应该先了解[以太坊基础知识](/developers/docs/intro-to-ethereum/)，然后再深入研究不同的网络，因为测试网络将提供一种低廉、安全的以太坊供你试用。

## 公共网络 {#public-networks}

每个人都能通过互联网连接到公共网络。 任何人都可以在公共区块链上读取或创造交易，并且可以验证已经执行的交易。 对等节点间的共识决定交易的添加和网络状态。

### 以太坊主网 {#ethereum-mainnet}

主网是指主要的以太坊生态区块链，所有具有实际价值的交易都发生在该链的分散账本中。

大众和交易所涉及的 ETH 价格是主网的 ETH。

### 以太坊测试网 {#ethereum-testnets}

除了主网外，还有公开的测试网。 这是一种模拟生态环境的网络，协议开发者或智能合约开发者可以使用它们测试尚未部署在主网上的协议升级和智能合约。 你可以把它看作生产与装配服务器的模拟。

在部署到主网之前，你应该在测试网测试编写的任何合约代码。 在与现有智能合约集成的去中心化应用程序中，大多数项目将副本部署到测试网。

大多数测试网使用权威证明的共识机制。 这意味着会选择少量节点来验证交易并创建新区块——在此过程中将他们的身份进行抵押。 测试网不鼓励工作量证明挖矿，这种挖矿可能会使它们容易受到攻击。

随着[合并](/upgrades/merge)临近，更多工作量证明和权威证明公共测试网正在向权益证明转变。 转换它们的共识机制可作为以太坊主网合并的预演。 Ropsten、Sepolia 和 Goerli 测试网预计将在 2022 年夏末成为权益证明网络，而 Goerli 测试网将得到长期维护。

测试网上的以太币没有实际价值；因此没有测试网以太币市场。 由于与以太坊进行实际交互需要使用以太币，因此大多数人从水龙头获取测试网以太币。 大多数水龙头是网络应用程序，你可以向其中输入一个地址并要求向该地址发送以太币。

#### Sepolia {#sepolia}

一个工作量证明测试网；这意味着它是以太坊最好的相似代表。 预计 Sepolia 将在 2022 年夏天进行合并，并转变为权益证明测试网。 目前还不能确定该测试网是否会得到长期维护。

- [网站](https://sepolia.dev/)
- [GitHub](https://github.com/goerli/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)

##### Sepolia 水龙头

- [Sepolia 水龙头](https://faucet.sepolia.dev/)
- [FaucETH](https://fauceth.komputing.org)

#### Goerli {#goerli}

一个可以跨客户端使用的权威证明测试网，是应用程序开发者的理想测试网。 Goerli 将是以太坊主网合并前最后一个合并且过渡到权益证明共识机制的测试网。 预计 Goerli 合并将在 2022 年夏天进行。 Goerli 有望作为权益证明测试网得到长期维护。

- [网站](https://goerli.net/)
- [GitHub](https://github.com/goerli/testnet)
- [Etherscan](https://goerli.etherscan.io)

##### Goerli 水龙头

- [Goerli 水龙头](https://faucet.goerli.mudit.blog/)
- [Chainlink 水龙头](https://faucets.chain.link/)
- [Alchemy Goerli 水龙头](https://goerlifaucet.com/)

#### Ropsten*（已弃用）* {#ropsten}

_注意，[Ropsten 测试网已弃用](https://github.com/ethereum/pm/issues/460)并且将不再获得协议升级。 请考虑将你的应用程序迁移到 Sepolia 或 Goerli。_

Ropsten 是一个工作量证明测试网，它在 2022 年 5 月经历了合并，过渡到权益证明共识机制。 可通过 Ropsten 在合并后网络上测试应用程序，但预计它不会得到长期维护并且可能在 2023 年夏季之前弃用。

##### Ropsten 水龙头

- [FaucETH](https://fauceth.komputing.org)（无需社交帐户的多链水龙头）
- [Paradigm 水龙头](https://faucet.paradigm.xyz/)

#### Rinkeby*（已弃用）* {#rinkeby}

_注意：[Rinkeby 测试网已弃用](https://github.com/ethereum/pm/issues/460)并且将不再获得协议升级。 请考虑将你的应用程序迁移到 Sepolia 或 Goerli。_

一个权威证明测试网，面向运行旧版本 Geth 客户端的用户。

##### Rinkeby 水龙头

- [FaucETH](https://fauceth.komputing.org)（无需社交帐户的多链水龙头）
- [Alchemy 水龙头](https://RinkebyFaucet.com)
- [Chainlink 水龙头](https://faucets.chain.link/)
- [Paradigm 水龙头](https://faucet.paradigm.xyz/)
- [Rinkeby 水龙头](https://faucet.rinkeby.io/)

#### Kovan _（已弃用）_ {#kovan}

_注意：[Kovan 测试网已弃用](https://github.com/ethereum/pm/issues/460)并且将不再获得协议升级。 请考虑将你的应用程序迁移到 Sepolia 或 Goerli。_

一个元老级权威证明测试网，面向仍在运行 OpenEthereum 客户端的用户。

##### Kovan 水龙头

- [FaucETH](https://fauceth.komputing.org)（无需社交帐户的多链水龙头）
- [Chainlink 水龙头](https://faucets.chain.link/)
- [Paradigm 水龙头](https://faucet.paradigm.xyz/)

### 二层网络测试网 {#layer-2-testnets}

[二层网络 (L2)](/layer-2/) 是一种统称，用来描述一组特定的以太坊扩容解决方案。 二层网络是一条扩展以太坊并继承以太坊安全保障的独立区块链。 二层网络测试网通常与公共以太坊测试网紧密关联。

#### Arbitrum Rinkeby {#arbitrum-rinkeby}

[Arbitrum ](https://arbitrum.io/)测试网。

Arbitrum Rinkeby 水龙头：

- [FaucETH](https://fauceth.komputing.org)（无需社交帐户的多链水龙头）
- [Chainlink 水龙头](https://faucets.chain.link/)
- [Paradigm 水龙头](https://faucet.paradigm.xyz/)

#### Optimistic Kovan {#optimistic-kovan}

[Optimism](https://www.optimism.io/) 测试网。

Optimistic Kovan 水龙头：

- [FaucETH](https://fauceth.komputing.org)（无需社交帐户的多链水龙头）
- [Paradigm 水龙头](https://faucet.paradigm.xyz/)

## 私有网络 {#private-networks}

如果以太坊网络的节点未连接到公共网络（即 主网或测试网），则以太坊网络就是私有网络。 在这种情况下，私有仅指保留或隔离，而不是保护或安全。

### 开发网络 {#development-networks}

要开发以太坊应用程序，在部署前，你想在私有网络上运行它，以便了解它的运行情况。 如同在自己的电脑上创建用于 Web 开发的本地服务器，你可以创建本地区块链实例来测试你的去中心化应用程序。 这样，迭代将比公共测试网快很多。

有一些项目和工具专门协助这方面的工作。 进一步了解[开发网络](/developers/docs/development-networks/)。

### 联盟网络 {#consortium-networks}

共识过程由一组预定义的受信任节点控制。 例如，在由知名学术机构组成的私有网络中，每个学术机构管理一个节点，并且区块由网络中的签名者阈值进行验证。

如果公共以太坊网络像公共互联网，那么联盟网络就像私有内部网。

## 相关工具 {#related-tools}

- [Chainlist](https://chainlist.org/) _ 以太坊虚拟机网络的列表，可将钱包和提供者连接到相应的链 ID 和网络 ID_
- [基于以太坊虚拟机的链](https://github.com/ethereum-lists/chains) _给 Chainlist 提供支持的 GitHub 链元数据存储库_

## 延伸阅读 {#further-reading}

_还有哪些社区资源对你有所帮助？ 请编辑本页面并添加！_
