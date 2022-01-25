---
title: 共识机制
description: 解释分布式系统中的协商一致协议及其在以太坊中扮演的角色。
lang: zh
sidebar: true
incomplete: true
---

当涉及到像以太坊这样的区块链（本质上是分布式数据库）时，网络节点必须能够就系统的当前状态达成一致。 这是通过协商一致机制实现的。

虽然共识机制与建立 dapp 并无直接关系，但理解两者将有助于阐明与您和您的用户体验相关的概念，如 gas 价格和交易时间。

## 前置要求 {#prerequisites}

为了让您更好地读懂本页面的内容，建议您先阅读：[以太坊（Ethereum）项目介绍](/developers/docs/intro-to-ethereum/)

## 什么是共识？ {#what-is-consensus}

我们所说的共识，是指达成了普遍协议。 考虑五人一起去电影院。 如果五人中有三人同意看同一部电影，就达成了多数人共识。

对于区块链，达成共识意味着网络上至少有 51% 的节点同意网络的下一个全球状态。

## 什么是共识机制？ {#what-is-a-consensus-mechanism}

共识机制（也称为共识协议或共识算法）允许分布式系统（计算机网络）协同工作并保持安全。

几十年来，我们一直采用这些机制在数据库节点、应用程序服务器和其他企业基础设施之间建立共识。 近年来，有人发明了新的共识机制，使以太坊等加密经济系统能够就网络状态达成一致。

在加密经济体系中建立共识机制也有助于防止某些类型的经济攻击。 从理论上讲，攻击者可以通过控制 51% 的网络而破坏共识。 共识机制旨在使这种“51% 攻击”不可行。 人们设计、实现了不同的机制，以不同的方式解决这个问题。

<YouTube id="dylgwcPH4EA" />

## 共识机制类型 {#types-of-consensus-mechanisms}

### 工作量证明 {#proof-of-work}

与比特币一样，以太坊目前使用**工作量证明 (PoW)** 作为共识机制。

#### 创建区块 {#pow-block-creation}

工作量证明通过[矿工们](/developers/docs/consensus-mechanisms/pow/mining/)完成，矿工们需要竞争创建最新区块以处理和完成交易。 获胜者将与网络中的其他节点分享最新区块，并且获得最新的以太币区块奖励。 谁的电脑能够最快解决数学难题，谁就能赢得这场比赛，这将现在的区块与以往的区块之间产生加密链接。 答案就是“工作量证明”中的工作。

#### 安全性 {#pow-security}

因为用户需要拥有超过网络中 51% 的算力才能够欺骗整条链，因此网络安全得以保证。 这将需要巨大的设备和能源投入，所需的开支甚至可能超过收益。

关于[工作量证明 (PoW) ](/developers/docs/consensus-mechanisms/pow/)的更多信息

### 权益证明 {#proof-of-stake}

以太坊已经计划升级使用**权益证明 (PoS)**来达成共识协议。

#### 区块创建 {#pos-block-creation}

权益证明通过让验证者质押 ETH 从而参与到系统中。 系统将随机选择一位验证者来创建新区块，并且将它们分享到网络中以获得奖励。 无需大量算力来完成计算，只需在网络中质押 ETH 即可。 这将有利于激励健康的网络行为。

#### 安全性 {#pos-security}

权益证明系统之所以安全，是因为需要 51% 质押 ETH 来欺骗整条链。 同时您的权益将会因为您的恶意行为被扣除。

关于[权益证明 (PoS)](/developers/docs/consensus-mechanisms/pos/) 的更多信息

### 直观指南 {#types-of-consensus-video}

观看有关以太坊上使用的不同类型共识机制的更多信息。

<YouTube id="ojxfbN78WFQ" />

### Sybil 抗性和链选择 {#sybil-chain}

现在，从技术上讲，工作量证明和权益证明本身并不是共识协议，但为了简单起见，它们通常被称为共识协议。 它们实际上是 Sybil 抗性机制，阻止作者做出选择；它们是决定谁是最新区块作者的一种方式。 这种 Sybil 抗性机制加上一个链选择规则，构成了真正共识机制。

**Sybil 抗性**可衡量一个协议如何抗衡 [Sybil 攻击](https://wikipedia.org/wiki/Sybil_attack)。 Sybil 攻击是指一个用户或团体假装成许多用户。 抵制这种攻击对去中心化的区块链至关重要，并使矿工和验证者能够在资源投入的基础上获得平等奖励。 通过让用户花费大量能源或提供大量抵押品，工作证明和权益证明可以防止这种情况。 这些保护措施是对 Sybil 攻击的经济威慑。

**链选择规则**可决定哪个链才是“正确”链。 以太坊和比特币目前使用“最长链”规则。这意味着，不论哪个区块链是最长的，都会被其他节点作为有效节点接受并协作。 对于工作量证明链，最长链由链上累积的工作量证明难度总额决定。

工作量证明机制和最长链规则结合称为“Nakamoto 共识”。

Eth2（[信标链](/upgrades/beacon-chain/)）使用了名为 [Casper Friendly Finality Gadget](https://arxiv.org/abs/1710.09437) 的共识机制，该机制基于权益证明 (PoS)。

## 延伸阅读 {#further-reading}

- [什么是区块链共识算法？](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [什么是 Nakamoto 共识？ 完整的初学者指南](https://blockonomi.com/nakamoto-consensus/)
- [Casper 的工作原理 ](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [关于工作量证明区块链的安全性和性能](https://eprint.iacr.org/2016/555.pdf)

_还有哪些社区资源对您有所帮助？ 请编辑本页面并添加！_

## 相关主题 {#related-topics}

- [工作量证明](/developers/docs/consensus-mechanisms/pow/)
- [挖矿](/developers/docs/consensus-mechanisms/pow/mining/)
- [权益证明](/developers/docs/consensus-mechanisms/pos/)
