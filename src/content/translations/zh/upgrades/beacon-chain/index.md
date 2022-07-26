---
title: 信标链
description: 了解信标链 - 引入权益证明的以太坊升级。
lang: zh
template: upgrade
sidebar: true
image: ../../../../../assets/upgrades/core.png
summaryPoint1: 信标链对我们今天使用的以太坊没有造成任何变化。
summaryPoint2: 它将作为共识层协调网络。
summaryPoint3: 它为以太坊生态系统提供了权益证明。
summaryPoint4: 您可能知道，它在技术路线图上属于“阶段 0”。
---

<UpgradeStatus isShipped dateKey="page-upgrades-beacon-date">
    信标链于 2020 年 12 月 1 日中午标准时间 (UTC) 启动。 要了解更多信息，<a href="https://beaconscan.com/">请浏览此处</a>。 如需参与验证该信标链，您可以<a href="/staking/">质押您的以太币</a>。
</UpgradeStatus>

## 信标链有什么作用？ {#what-does-the-beacon-chain-do}

信标链将处理或协调[分片](/upgrades/sharding/)和[质押人](/staking/)的扩展网络。 但它会与今天的[以太坊主网](/glossary/#mainnet)不同。 它无法处理帐户或智能合约。

信标链的角色将随着时间的推移而改变，但它是[我们正在努力实现的安全、可持续和可扩展以太坊的](/upgrades/vision/)基础组件。

## 信标链的特点 {#beacon-chain-features}

### 质押介绍 {#introducing-staking}

信标链将在以太坊中引入[权益证明共识机制 (PoS)](/developers/docs/consensus-mechanisms/pos/)。 这是您帮助维护以太坊安全的一个新方式。 该机制可以看成是一种让以太坊生态更健康的公共产品，并且在此过程中能让您获得更多以太币。 在实际操作中，它将需要您质押以太币，以便激活验证者软件。 作为验证者，您将处理交易并在链中创建新的区块。

质押和成为验证者比[挖矿](/developers/docs/mining/)（当前保护以太坊网络安全的方式）更容易。 从长远来看，人们希望这能帮助提高以太坊的安全性。 参与该网络的人越多，网络就会变得越分散，面临攻击时也越安全。

<InfoBanner emoji=":money_bag:">
如果您有兴趣成为验证者并帮助保护信标链，请点击<a href="/staking/">了解关于质押的更多信息</a>。
</InfoBanner>

引入该机制这一重要变化也有助于实现另一个升级：[分片链](/upgrades/sharding/)。

### 设置分片链 {#setting-up-for-shard-chains}

主网与信标链合并后，下一个升级便是在权益证明网络中引入分片链。 这些“分片”将通过将网络扩展到 64 个区块链来增加网络的容量并提高交易速度。 由于分片链要求质押才能安全运行，因此信标链是引入分片链重要的第一步。

最终，信标链还将负责随机分配质押人来验证分片链。 这是让质押人难以串通并控制分片的关键机制。 该[几率小于万亿分之一](https://medium.com/@chihchengliang/minimum-committee-size-explained-67047111fa20)。

## 升级之间的关系 {#relationship-between-upgrades}

以太坊所有升级都是有点关联的。 所以我们来回顾一下信标链对其他升级的影响。

### 主网和信标链 {#mainnet-and-beacon-chain}

按照最初的设计，信标链与当前的以太坊主网独立运行。 但最终会相互连接。 该计划是将主网“合并”到由信标链控制和协调的权益证明系统中。

<ButtonLink to="/upgrades/merge/">
    合并
</ButtonLink>

### 分片和信标链 {#shards-and-beacon-chain}

分片链只有在已建立权益证明共识机制的情况下才能安全进入以太坊生态系统。 信标链将引入权益质押，为后续的分片链升级奠定基础。

<ButtonLink to="/upgrades/sharding/">
    分片链
</ButtonLink>

<Divider />

## 与信标链交互 {#interact-with-beacon-chain}

<BeaconChainActions />
