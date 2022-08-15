---
title: 网络
description: 概述以太坊网络以及在何处获得测试网络的以太币来测试您的应用程序。
lang: zh
sidebar: true
---

由于以太坊是一种协议，因此这意味着可以有多个独立的“网络”与该协议兼容，并且彼此之间不会相互作用。

网络不同于以太坊环境，后者可用于开发、测试或生产方案。 您的以太坊帐户将在不同的网络上运行，但是您的帐户余额和交易历史记录不会从以太坊主网中继承下来。 出于测试目的，了解哪些网络可用以及如何获取测试网路的以太币是很有用的，以便您可以试用它。

## 先决条件 {#prerequisites}

您需要在浏览不同的网络之前了解以太坊的基础知识，因为测试网络将会提供一个便捷且安全的以太坊版本供您使用。 尝试访问[以太坊简介](/developers/docs/intro-to-ethereum/)。

## 公共网络 {#public-networks}

每个人都能通过互联网连接到公共网络。 任何人都可以在公共区块链上读取或创造交易，并且可以验证已经执行的交易。 交易协议以及网络状态由网络上的同行共同决定。

### 主网 {#mainnet}

主网是指主要的以太坊生态区块链，所有具有实际价值的交易都发生在该链的分散账本中。

大众和交易所涉及的 ETH 价格是主网的 ETH。

### 测试网 {#testnets}

除了主网外，还有公开的测试网。 这是一种模拟生态环境的网络，协议开发者或智能合约开发者可以使用它们测试尚未部署在主网上的协议升级和智能合约。 你可以把它看作生产与装配服务器的模拟。

在部署到主网上之前，测试你在测试网上编写的任何合约代码通常很重要。 如果你正在构建与现有智能合约集成的 dapp，大多数项目都会将副本部署到你可以与之交互的测试箱中。

大多数测试网使用权威证明的共识机制。 这意味着会选择少量节点来验证交易并创建新区块——在此过程中将他们的身份进行抵押。 很难在工作量证明测试网上激励挖矿，这会使它容易受到攻击。

测试网上的以太币没有实际价值；因此测试网以太币没有市场。 由于与以太坊进行实际交互需要以太币，所以大多数人从水龙头获取测试网以太币。 大多数水龙头是网络应用程序，您可以给它输入一个您请求发送以太币的地址。

#### Arbitrum Rinkeby {#arbitrum-rinkeby}

[Arbitrum](https://arbitrum.io/)测试网。

##### Arbitrum Rinkeby 水龙头

- [FaucETH](https://fauceth.komputing.org)（不需要社交帐户的多链水龙头）
- [Chainlink 水龙头](https://faucets.chain.link/)
- [Paradigm 水龙头](https://faucet.paradigm.xyz/)

#### Görli {#goerli}

一个适用于多种客户端的权威证明 (PoA) 测试网。

##### Görli 水龙头

- [Görli 水龙头](https://faucet.goerli.mudit.blog/)
- [Chainlink 水龙头](https://faucets.chain.link/)
- [Alchemy Goerli 水龙头](https://goerlifaucet.com/)

#### Kintsugi {#kintsugi}

以太坊的合并测试网。

##### Kintsugi 水龙头

- [FaucETH](https://fauceth.komputing.org)（不需要社交帐户的多链水龙头）
- [Kintsugi 水龙头](https://faucet.kintsugi.themerge.dev/)

#### Kovan {#kovan}

权威证明 (PoA) 测试网，适用于运行 OpenEthereum 客户端的情况。

##### Kovan 水龙头

- [FaucETH](https://fauceth.komputing.org)（不需要社交帐户的多链水龙头）
- [Kovan 水龙头](https://faucet.kovan.network/)
- [Chainlink 水龙头](https://faucets.chain.link/)
- [Paradigm 水龙头](https://faucet.paradigm.xyz/)

#### Optimisic Kovan {#optimistic-kovan}

[Optimism](https://www.optimism.io/) 的测试网。

##### Optimistic Kovan 水龙头

- [FaucETH](https://fauceth.komputing.org)（不需要社交帐户的多链水龙头）
- [Paradigm 水龙头](https://faucet.paradigm.xyz/)

#### Rinkeby {#rinkeby}

权威证明 (PoA) 测试网，适用于运行 Geth 客户端的情况。

##### Rinkeby 水龙头

- [FaucETH](https://fauceth.komputing.org)（不需要社交帐户的多链水龙头）
- [Alchemy 水龙头](https://RinkebyFaucet.com)
- [Chainlink 水龙头](https://faucets.chain.link/)
- [Paradigm 水龙头](https://faucet.paradigm.xyz/)
- [Rinkeby 水龙头](https://faucet.rinkeby.io/)

#### Ropsten {#ropsten}

工作量证明测试网。 这意味着它是以太坊最好的对等代表形式。

##### Ropsten 水龙头

- [FaucETH](https://fauceth.komputing.org)（不需要社交帐户的多链水龙头）
- [Paradigm 水龙头](https://faucet.paradigm.xyz/)

## 私有网络 {#private-networks}

如果以太坊网络的节点未连接到公共网络（即主网和测试网）， 则以太坊网络是私有网络。 在这种情况下，私有仅指保留或隔离，而不是保护或安保。

### 开发网络 {#development-networks}

要开发以太坊应用程序，您需要在私有网络上运行它以了解它的工作方式，然后再部署。 与在计算机上创建本地服务器以便进行 Web 开发的方法类似，您可以创建本地区块链实例来测试您的去中心化应用程序。 这样，迭代将比公共测试网快很多。

有一些项目和工具专门协助这方面的工作。 了解关于[开发网络](/developers/docs/development-networks/)的更多信息。

### 联盟网络 {#consortium-networks}

共识过程由一组预定义的受信任节点控制。 例如，由知名学术机构组成的私有网络，每个学术机构管理一个节点，并且区块由网络中的签名者阈值进行验证。

如果公共以太坊网络类似于公共互联网，那么可以将联盟网络看作私有内部网。

## 相关工具 {#related-tools}

- [Chainlist](https://chainlist.org/) _EVM 网络列表，可以帮钱包和供应商连接到需要的链 ID 和网络 ID_。
- [基于以太坊虚拟机的链](https://github.com/ethereum-lists/chains) _给 Chainlist 提供支持的 GitHub 链元数据存储库_

## 延伸阅读 {#further-reading}

_还有哪些社区资源对您有所帮助？ 编辑本页面并添加它！_
