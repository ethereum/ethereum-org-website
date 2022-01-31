---
title: 信标链
description: 了解信标链——以太坊的第一次重大Eth2升级。
lang: zh
template: upgrade
sidebar: true
image: ../../../../../assets/upgrades/core.png
summaryPoint1: 信标链对我们今天使用的以太坊没有任何变化。
summaryPoint2: 它将协调网络。
summaryPoint3: 它为以太坊生态系统提供了利害关系证明。
summaryPoint4: 你可能会在技术路径图上知道这是“阶段0。
---

<UpgradeStatus isShipped dateKey="page-upgrades-beacon-date">
    信标链于 2020 年 12 月 1 日中午 (UTC) 启动。 要了解更多信息，<a href="https://beaconscan.com/">浏览这里</a>。 如果您想要参与验证该信标链，您可以<a href="/staking/">质押您的 ETH</a>。
</UpgradeStatus>

## 信标链是做什么的？ {#what-does-the-beacon-chain-do}

信标链将处理或协调[分片](/upgrades/shard-chains/)和[质押者](/staking/)的扩展网络。 但它与今天的[以太坊主网](/glossary/#mainnet)不同。 它无法处理帐户或智能合约。

信标链的角色将随着时间的推移而改变，但它是[我们正在努力实现的安全、可持续和可扩展的以太坊的](/upgrades/vision/)基础组件。

## 信标链的特点 {#beacon-chain-features}

### Staking（质押）介绍 {#introducing-staking}

信标链将在以太坊中引入[权益证明共识机制（PoS）](/developers/docs/consensus-mechanisms/pos/)。 这是你帮助保证以太坊安全的一个新方式。 可以把它看作一种让以太坊生态更健康的公共产品，并且在此过程能让您获得更多 ETH。 在实际操作中，它将需要您质押 ETH，以便激活验证者软件。 作为验证者，您将处理交易并在链中创建新的区块。

质押和成为验证者比 [挖矿](/developers/docs/mining/) (当前以太坊网络获得保障的方式) 更容易。 从长远来看，这将有助于使以太坊更加安全。 参与网络的人更多，网络就更加去中心化，因此面临攻击时也将更安全。

<InfoBanner emoji=":money_bag:">
如果你有兴趣成为验证者并帮助保护信标链， 点击<a href="/staking/">了解更多关于质押</a>的信息。
</InfoBanner>

这也是另一次 Eth2 升级的重要变化：[分片链](/upgrades/shard-chains/)。

### 设置分片链 {#setting-up-for-shard-chains}

主网与信标链合并后，下一次升级将在权益证明网络中引入分片链。 这些“分片”将通过将网络扩展到 64 个区块链来增加网络的容量并提高交易速度。 由于分片链要求质押以确保其安全运行，因此引入分片链是信标链的关键第一步。

最终，信标链还将负责随机分配质押者来验证分片链。 这是让质押者们难以串通并控制分片的关键机制。 该[几率小于万亿分之一](https://medium.com/@chihchengliang/minimum-committee-size-explained-67047111fa20)。

## 升级之间的关系 {#relationship-between-upgrades}

Eth2 升级的各部分相互关联。 所以我们来回顾一下信标链对其他升级的影响。

### 主网和信标链 {#mainnet-and-beacon-chain}

按照最初的设计，信标链与当前的以太坊主网独立运行。 但最终会相互连接。 该计划是将主网“合并”到由信标链控制和协调的权益证明系统中。

<ButtonLink to="/upgrades/merge/">合并</ButtonLink>

### 分片和信标链 {#shards-and-beacon-chain}

分片链只有在已建立权益证明共识机制的情况下才能安全进入以太坊生态系统。 信标链将引入权益质押，为后续的分片链升级奠定基础。

<ButtonLink to="/upgrades/shard-chains/">分片链</ButtonLink>

<Divider />

## 与信标链交互 {#interact-with-beacon-chain}

<BeaconChainActions />
