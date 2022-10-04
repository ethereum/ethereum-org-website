---
title: 共识机制
description: 解释分布式系统中的协商一致协议及其在以太坊中扮演的角色。
lang: zh
---

当涉及到像以太坊这样的区块链（本质上是分布式数据库）时，网络节点必须能够就系统的当前状态达成一致。 这是通过协商一致机制实现的。

虽然共识机制与建立 dapp 并无直接关系，但理解两者将有助于阐明与您和您的用户体验相关的概念，如 gas 价格和交易时间。

## 前置要求 {#prerequisites}

为了让您更好地读懂本页面的内容，建议您先阅读：[以太坊（Ethereum）项目介绍](/developers/docs/intro-to-ethereum/)

## 什么是共识？ {#what-is-consensus}

我们所说的共识，是指达成了普遍协议。 比如，一群人去看电影， 如果对电影的选择没有异议，那么共识就达成了。 在极端情况下，即没有对电影选择达成一致时，这群人就会分开。

对于区块链，达成共识意味着网络上至少有 51% 的节点同意网络的下一个全球状态。

## 什么是共识机制？ {#what-is-a-consensus-mechanism}

共识机制（也称为共识协议或共识算法）允许分布式系统（计算机网络）协同工作并保持安全。

共识协议和共识算法经常互换使用。 然而，协议和算法是不同的。 协议是标准中规定的一系列规则，用于约束系统及其许多功能组件如何运行和交互。 算法类似于如何解决问题或计算结果的准确方法。

几十年来，我们一直采用这些机制在数据库节点、应用程序服务器和其他企业基础设施之间建立共识。 近年来，新的共识机制出现，使以太坊等加密经济系统能够就网络状态达成一致。

加密经济体系中的共识机制也有助于防止某些类型的经济攻击。 从理论上讲，攻击者可以通过控制 51% 的网络来破坏共识。 共识机制旨在使这种“51% 攻击”难以实施。 人们设计了不同的机制，以不同的方式解决这种安全性问题。

<YouTube id="dylgwcPH4EA" />

## 共识机制类型 {#types-of-consensus-mechanisms}

### 工作量证明 {#proof-of-work}

与比特币一样，以太坊目前使用**工作量证明 (PoW)** 共识协议。

#### 创建区块 {#pow-block-creation}

工作量证明由[矿工](/developers/docs/consensus-mechanisms/pow/mining/)完成，矿工相互竞争创建装满已处理交易的新区块。 获胜者在网络中共享新区块，并赢得一些新铸造的以太币。 能够最快解决数学难题的计算机在比赛中获胜，这将在当前区块和之前的区块之间产生加密链接。 解决难题就是“工作量证明”中的工作。

#### 安全性 {#pow-security}

攻击者需要拥有网络中 51% 的算力才能够欺骗整条链，这保护了网络的安全。 由于需要巨大的设备和能源投入，很有可能付出大于收益，得不偿失。

更多有关[工作量证明 (PoW) ](/developers/docs/consensus-mechanisms/pow/)的信息

### 权益证明 {#proof-of-stake}

以太坊计划升级到采用**权益证明 (PoS)** 共识协议。

#### 区块创建 {#pos-block-creation}

权益证明由验证者完成，验证者通过质押以太币参与到系统中。 系统随机选择验证者来创建新区块，在网络上共享区块并获得奖励。 无需完成大量计算工作，只需在网络中质押以太币即可。 这将有利于激励健康的网络行为。

#### 安全性 {#pos-security}

攻击者需要拥有质押以太币总数的 51% 才能够欺骗整条链，这保护了权益证明系统的安全。 而且你的质押会因为你的恶意行为而被罚没。

更多有关[权益证明](/developers/docs/consensus-mechanisms/pos/)的信息

### 直观指南 {#types-of-consensus-video}

观看视频，详细了解以太坊上采用的不同类型共识机制：

<YouTube id="ojxfbN78WFQ" />

### Sybil 抗性和链选择 {#sybil-chain}

目前从技术上讲，工作量证明和权益证明本身并不是共识协议，但为了简单起见，它们通常被称为共识协议。 它们实际上是女巫攻击防御机制和区块生产者选择器；它们是决定最新区块生产者的一种方式。 正是这种女巫攻击防御机制加上链选择规则，构成了的真正共识机制。

**女巫攻击防御**衡量一种协议如何抗衡[女巫攻击](https://wikipedia.org/wiki/Sybil_attack)。 女巫攻击是指一个用户或团体假装成许多用户。 防御这种攻击对去中心化区块链至关重要，并使矿工和验证者能够在资源投入的基础上获得平等奖励。 通过让用户消耗大量能源或提供大量抵押品，工作量证明和权益证明可以防止这种攻击。 这些保护措施是对女巫攻击的经济威慑。

**链选择规则**用来决定哪条链才是“正确”的链。 以太坊和比特币目前使用“最长链”规则。这意味着，任何最长的区块链，都会被其他节点作为有效链接受并与之协作。 对于工作量证明链，最长链由链上累积的工作量证明总难度决定。

工作量证明和最长链规则结合起来称为“中本聪共识”。

[信标链](/upgrades/beacon-chain/)采用了称为[友好的最终确定性小工具 Casper](https://arxiv.org/abs/1710.09437) 的共识机制，该机制基于权益证明。

## 延伸阅读 {#further-reading}

- [什么是区块链共识算法？](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [什么是 Nakamoto 共识？ 完整的初学者指南](https://blockonomi.com/nakamoto-consensus/)
- [Casper 的工作原理](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [关于工作量证明区块链的安全性和性能](https://eprint.iacr.org/2016/555.pdf)
- [拜占庭问题](https://en.wikipedia.org/wiki/Byzantine_fault)

_还有哪些社区资源对你有所帮助？ 请编辑本页面以添加！_

## 相关主题 {#related-topics}

- [工作量证明](/developers/docs/consensus-mechanisms/pow/)
- [矿工](/developers/docs/consensus-mechanisms/pow/mining/)
- [权益证明](/developers/docs/consensus-mechanisms/pos/)
