---
title: 使用Eth2对接主网
description: 了解对接 - 当以太坊主网加入信标链的协调权益证明系统时。
lang: zh
template: eth2
sidebar: true
image: ../../../../../assets/eth2/merge.png
summaryPoints:
  [
    "最终当前以太坊主网将“对接”其余的Eth2升级。",
    '对接将把"Eth1"主网与Eth2信标链和分片系统合并。',
    "这将标志着以太坊工作量证明的结束以及向权益证明的完全过渡。",
    "您可能会在技术路线图上知道这称为“阶段1.5”。",
  ]
---

<UpgradeStatus date="~Q1/Q2 2022">
    此升级将跟随分片链的到来进行。 但这是 <a href="/eth2/vision/">Eth2 愿景</a> 完全实现的时候——更多的可扩展性、安全性和可持续性，并支持整个网络。
</UpgradeStatus>

## 什么是对接？ {#what-is-the-docking}

重要的是要记住，最初其他 Eth2 升级是独立于我们今天使用的[主网](/glossary/#mainnet)发布的。 以太坊主网将继续使用[工作量证明](/developers/docs/consensus-mechanisms/pow/)保证安全性，即使在[信标链](/eth2/beacon-chain/)及其[分片链](/eth2/shard-chains/)使用[权益证明](/developers/docs/consensus-mechanisms/pos/)平行运行。 对接就是当这两个系统合并在一起时的情况。

想象一下，以太坊是一艘尚未做好星际航行准备的宇宙飞船。 通过信标链和分片链，社区建造了一个新的引擎和坚固的船体。 时间到了，现在的飞船将与这个新系统对接，这样它就能成为一艘飞船，准备好投入几光年的时间去探索宇宙了。

## 对接主网 {#docking-mainnet}

准备就绪后，以太坊主网将会与信标链“对接”，成为自己的分片，使用权益证明代替 [工作量证明](/developers/docs/consensus-mechanisms/pow/)。

主网将把运行智能合约的能力带入工作量证明系统。加上以太坊的完整历史和现状，以确保所有 ETH 持有人和使用者都能顺利过渡。

<!-- ### Improving mainnet

Before mainnet docks with the new eth2 system, it’s probably worthwhile sorting some of the issues that are in flight – often referred to as Ethereum1.x.

These include Improvements for

- **End users**: like [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) which changes the way users bid for blockspace. In other words, making transaction fees more efficient for end users.
- **Client runners**: making running clients more sustainable by capping disk space requirements.
- **Developers**: upgrading the EVM to be more flexible.

Plus many more.

[More on Ethereum1.x](/learn/#eth-1x)

These improvements all have a place in Eth2 so it’s likely that their progress may affect the timing of the docking. -->

## 对接之后 {#after-the-docking}

这将标志着以太坊工作证明的结束，并开始一个更可持续、生态友好的以太坊的时代。 此刻，以太坊将具有 [Eth2 愿景](/eth2/vision/) 所概述的规模、安全性和可持续性。

## 升级间的关系 {#relationship-between-upgrades}

Eth2 升级在某种程度上是相互关联的。 所以让我们回顾对接与其他升级的关系。

### 对接和信标链 {#docking-and-beacon-chain}

对接发生后，质押者将被指派来验证以太坊主网。 就像与分片链一样。 [挖矿](/developers/docs/consensus-mechanisms/pow/mining/)将不再需要，因此矿工很可能将其收入投资于新的证明质押系统。

<ButtonLink to="/eth2/beacon-chain/">信标链</ButtonLink>

### 对接和分片链 {#docking-and-shard-chains}

随着主网成为分片，分片链的成功实现对于这个升级至关重要。 在帮助社区决定是否推出第二次分片升级方面，这个过渡很可能会发挥重要作用。 这次升级将使其他的分片像主网一样：他们将能够处理交易和智能合约，而不仅仅是提供更多的数据。

<ButtonLink to="/eth2/shard-chains/">分片链</ButtonLink>
