---
title: 共识机制
description: 解释分布式系统中的协商一致协议及其在以太坊中扮演的角色。
lang: zh
sidebar: true
incomplete: true
---

当涉及到像以太坊这样的区块链（本质上是分布式数据库）时，网络节点必须能够就系统的当前状态达成一致。 这是通过协商一致机制实现的。

虽然不是构建去中心化应用的一部分，但理解共识机制将有助于解释与您和用户体验相关的事情，如 gas 价格和交易时间。

## 前置要求 {#prerequisites}

为了让您更好地读懂本页面的内容，建议您先阅读：[以太坊（Ethereum）项目介绍](/developers/docs/intro-to-ethereum/)

## 什么是共识机制？ {#what-is-a-consensus-mechanism}

共识机制（也称为共识协议或共识算法）允许分布式系统（计算机网络）协同工作并保持安全。

几十年来，这些机制一直被用来在数据库节点、应用程序服务器和其他企业基础设施之间建立共识。 近年来，有人发明了新的共识算法协议，以使以太坊等加密经济系统能够就网络状态达成一致。

在加密经济体系中建立共识机制也有助于防止某些类型的经济攻击。 从理论上讲，攻击者可以通过控制 51% 的网络而损害共识。 共识机制旨在使这种“51% 攻击”不可行。 人们设计、实现了不同的机制，以不同的方式解决这个问题。

<!-- ### Consensus -->

<!-- Formal requirements for a consensus protocol may include: -->

<!-- - Agreement: All correct processes must agree on the same value. -->
<!-- - Weak validity: For each correct process, its output must be the input of some correct process. -->
<!-- - Strong validity: If all correct processes receive the same input value, then they must all output that value. -->
<!-- - Termination: All processes must eventually decide on an output value -->

<!-- ### Fault tolerance -->
<!-- TODO explain how protocols must be fault tolerant -->

## 共识机制常见类型 {#types-of-consensus-mechanisms}

<!-- TODO -->
<!-- Why do different consensus protocols exist? -->
<!-- What are the tradeoffs of each? -->

### 工作量证明 {#proof-of-work}

正如比特币，以太坊目前采用工作量证明 (PoW) 共识协议。

#### 创建区块 {#pow-block-creation}

工作量证明是通过[矿工们](/developers/docs/consensus-mechanisms/pow/mining/)来完成的，矿工们需要竞争创建最新的区块用于处理和完成交易。 胜利的矿工将与网络中的其他节点分享最新的区块，并且获得最新的以太币区块奖励。 谁的计算机能够最快解决数学难题将赢得这场比赛，这就产生了加密链接将现在的区块与以往的区块连接起来。 解决这个谜题是工作量证明中的工作。

#### 安全性 {#pow-security}

因为用户需要拥有超过网络中 51% 的算力才能够欺骗整条链，因此网络的安全得以保证。 这将需要巨大的设备和能源投入才能完成欺诈，欺诈所需的开支可能超过收益。

更多关于[工作量证明(PoW)](/developers/docs/consensus-mechanisms/pow/)

### 权益证明 {#proof-of-stake}

以太坊已经计划升级使用[权益证明(PoS)](/developers/docs/consensus-mechanisms/pos/)来达成共识协议。

#### 区块创建 {#pos-block-creation}

权益证明通过让验证者质押以太币从而参与到系统中。 系统将随机选择一位验证者来创建新的区块，并且将它们分享到网络从而获得出块奖励。 相较于需要用大量算力来完成计算，您只需要轻松地将您的以太币质押到网络。 这将有利于激励健康的网络行为。

#### 安全性 {#pos-security}

你需要 51% 的以太币来捣毁从而榨取这个证明质押系统的条链，所以这个验证系统相对来说比较安全。 同时您的权益将会因为您的恶意行为被扣除。

更多关于[权益证明(PoS)](/developers/docs/consensus-mechanisms/pos/)

## 进一步阅读 {#further-reading}

<!-- TODO -->

## 相关主题 {#related-topics}

- [工作量证明](/developers/docs/consensus-mechanisms/pow/)
- [采矿](/developers/docs/consensus-mechanisms/pow/mining/)
- [权益证明](/developers/docs/consensus-mechanisms/pos/)
