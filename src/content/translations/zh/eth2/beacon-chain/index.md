---
title: 信标链
description: 了解信标链——以太坊的第一次重大Eth2升级。
lang: zh
template: eth2
sidebar: true
image: ../../../../../assets/eth2/core.png
summaryPoints:
  [
    "信标链没有改变我们目前使用的以太坊。",
    "它将协调整个网络。",
    "它向以太坊生态系统中引入了权益证明共识机制（PoS）。",
    "你可以认为这是技术路线图上的‘第0阶段’。",
  ]
---

<UpgradeStatus isShipped date="发货了！">
    信标链于UTC时间12月1日中午启动。 要了解更多信息，<a href="https://beaconscan.com/">浏览这里</a>。 如果您想要参与验证该信标链，您可以<a href="/eth2/staking/">质押您的 ETH</a>。
</UpgradeStatus>

## 信标链是做什么的？ {#what-does-the-beacon-chain-do}

信标链将处理或协调[分片](/eth2/shard-chains/)和[质押者](/eth2/staking/)的扩展网络。 但它不会像今天的[以太坊主网](/glossary/#mainnet)一样。 它无法处理帐户或智能合约。

信标链的角色将随着时间的推移而改变，但它是[我们正在努力实现的安全、可持续和可扩展的以太坊的](/eth2/vision/)基础组件。

## 信标链的特点 {#beacon-chain-features}

### Staking（质押）介绍 {#introducing-staking}

信标链将在以太坊中引入[权益证明共识机制（PoS）](/developers/docs/consensus-mechanisms/pos/)。 这是你帮助保证以太坊安全的一个新方式。 可以把它看作一种让以太坊生态更健康的公共产品，并且在此过程能让您获得更多 ETH。 在实际操作中，它将需要您质押 ETH，以便激活验证者软件。 作为验证者，您将处理交易并在链中创建新的区块。

质押和成为验证者比 [挖矿](/developers/docs/mining/) (当前以太坊网络获得保障的方式) 更容易。 从长远来看，这将有助于使以太坊更加安全。 参与网络的人更多，网络就更加去中心化，因此面临攻击时也将更安全。

<InfoBanner emoji=":money_bag:">
如果你有兴趣成为验证者并帮助保护信标链， 点击<a href="/eth2/staking/">了解更多关于质押</a>的信息。
</InfoBanner>

这也是 Eth2 第二次升级的一个重要变化:： [分片链](/eth2/shard-chains/)。

### 设置分片链 {#setting-up-for-shard-chains}

分片链将是 Eth2 的第二次升级。 分片链通过将网络扩展为 64 条区块链来增大网络容量并提升交易速度。 由于分片链要求质押以确保其安全运行，因此引入分片链是信标链的关键第一步。

最终，信标链还将负责随机分配质押者来验证分片链。 这是让质押者们难以串通并控制分片的关键机制。 该[几率小于万亿分之一](https://medium.com/@chihchengliang/minimum-committee-size-explained-67047111fa20)。

## 升级之间的关系 {#relationship-between-upgrades}

Eth2 升级的各部分相互关联。 所以我们来回顾一下信标链对其他升级的影响。

### 主网和信标链 {#mainnet-and-beacon-chain}

最初，信标链与当前的以太坊主网将分别独立运行。 但最终它们将进行连接。 计划是将主网对接(dock)到由信标链控制和协调的权益证明共识机制系统(POS)中。

<ButtonLink to="/eth2/merge/">对接</ButtonLink>

### 分片和信标链 {#shards-and-beacon-chain}

只有在权益证明共识机制（POS）存在的情况下，分片链才能安全进入以太坊生态系统。 信标链将引进质押，为随后的分片链升级铺平道路。

<ButtonLink to="/eth2/shard-chains/">分片链</ButtonLink>

<Divider />

## 与信标链交互 {#interact-with-beacon-chain}

<Eth2BeaconChainActions />
