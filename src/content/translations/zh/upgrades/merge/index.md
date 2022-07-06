---
title: 合并
description: 了解“合并”：当以太坊主网加入信标链协调的的权益证明系统时。
lang: zh
template: upgrade
sidebar: true
image: ../../../../../assets/upgrades/merge.png
summaryPoint1: 最终，当前以太坊主网将与信标链权益证明系统“合并”。
summaryPoint2: 这将标志着以太坊工作证明的淘汰以及向权益证明的完全过渡。
summaryPoint3: 计划在推出分片链之前进行这项工作。
summaryPoint4: 我们以前将此称为“对接”。
---

<UpgradeStatus dateKey="page-upgrades-merge-date">
  此次升级代表以太坊正式转向权益证明共识。 能源密集型挖矿工作需求将消失，网络保护机制将通过质押以太币实现。 这是实现<a href="/upgrades/vision/">以太坊愿景</a>真正令人激动的一步，也就是“更高的可扩展性、安全性和可持续性”。
</UpgradeStatus>

## 什么是合并？ {#what-is-the-docking}

请务必记住，[信标链](/upgrades/beacon-chain/)最初是与[主网](/glossary/#mainnet)（我们今天所使用的链）分开上线的。 以太坊主网继续受[工作量证明](/developers/docs/consensus-mechanisms/pow/)的保护，即使信标链使用[权益证明](developers/docs/consensus-mechanisms/pos/)并行运行也同样如此。 “合并”是指这两个系统最终融合在一起。

想象一下，以太坊是一艘尚未做好星际航行准备的宇宙飞船。 社区通过信标链搭建了一个新引擎和坚固外壳。 到时候，当前的飞船将与这个新系统对接，结合为一艘飞船，朝着遥远的未来和宇宙蓄势待发。

## 与主网合并 {#docking-mainnet}

准备好后，以太坊主网将与信标链“合并”，成为以太坊的分片链，使用权益证明[而非工作量证明](/developers/docs/consensus-mechanisms/pow/)。

基于以太坊的历史与现状，主网将为权益证明系统带来执行智能合约的能力，向所有以太币持有人和使用者保证过渡顺利。

## 合并后 {#after-the-merge}

这将标志着以太坊工作量证明的结束，并开启一个更可持续、更环保的以太坊时代。 届时，以太坊将更接近实现其[以太坊愿景](/upgrades/vision/)中概述的全面性、安全性和可持续性。

值得注意的是，实施合并的目标是简单化，以加快从工作量证明到权益证明的过渡。 开发者正在将精力集中在这一过渡上，并尽量减少可能延迟实现这一目标的附加功能。

**这意味着，在合并完成后，一些功能（如提取质押的以太币）将需要稍微等待一段时间方会上线。**相关计划包括合并后用于处理这些功能的“清理”升级，预计在合并完成后很快执行。

## 升级间的关系 {#relationship-between-upgrades}

以太坊所有升级都是有点关联的。 因此，让我们概括一下合并如何与其它升级关联。

### 合并与信标链 {#docking-and-beacon-chain}

一旦发生合并，将分配质押人来验证以太坊主网。 届时将不再需要[挖矿](/developers/docs/consensus-mechanisms/pow/mining/)，因此矿工很可能会将他们的收入投入到在新的权益证明系统中进行质押。

<ButtonLink to="/upgrades/beacon-chain/">
  信标链
</ButtonLink>

### 合并与合并后清理 {#merge-and-post-merge-cleanup}

合并之后，一些功能（如撤回质押的以太币）尚不受支持。 计划在合并后不久对这些功能单独进行升级。

请随时了解[以太坊基金会研究和开发博客](https://blog.ethereum.org/category/research-and-development/)发布的最新信息。 如果感兴趣，请详细了解 Vitalik 在 2021 年 4 月的 ETHGlobal 活动中发表的演讲：[合并后会发生什么](https://youtu.be/7ggwLccuN5s?t=101)。

### 合并与分片链 {#docking-and-shard-chains}

最初，计划是在合并之前研究分片链，以解决可扩展性问题。 然而，随着[第二层扩容解决方案](/developers/docs/scaling/#layer-2-scaling)的盛行，工作重点已经转移到通过合并将工作量证明转换为权益证明。

这需要社区进行持续评估，以确定是否可能需要多轮分片链来实现无限的可扩展性。

<ButtonLink to="/upgrades/sharding/">
  分片链
</ButtonLink>

## 了解更多 {#read-more}

<MergeArticleList />
