---
title: 合并
description: 了解“合并”- 当以太坊主网加入信标链协调的的权益证明系统时。
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
  此次升级代表以太坊正式转向权益证明共识。 能源密集型挖矿工作需求将消失，网络保护机制将通过质押以太币实现。 这是实现 <a href="/upgrades/vision/">Eth2 愿景</a> 过程中真正令人兴奋的一步 - 更安全，且可扩容性和可持续性更强。
</UpgradeStatus>

## 什么是合并？ {#what-is-the-docking}

切记，刚开始，[信标链](/upgrades/beacon-chain/)与我们现在使用的[主网](/glossary/#mainnet)分开提供。 以太坊主网继续受[工作量证明](/developers/docs/consensus-mechanisms/pow/)的保护，即使信标链使用[权益证明](/developers/docs/consensus-mechanisms/pos/)并行运行也同样如此。 “合并”是指两个系统最终结合在一起。

想象一下，以太坊是一艘尚未做好星际航行准备的宇宙飞船。 社区通过信标链搭建了一个新引擎和坚固外壳。 到时候，当前的飞船将与这个新系统对接，为一艘飞船，朝着遥远的未来和宇宙蓄势待发。

## 与主网合并 {#docking-mainnet}

准备好后，以太坊主网将与信标链“合并”，成为以太坊的分片链，使用权益证明[而非工作量证明](/developers/docs/consensus-mechanisms/pow/)。

主网将把运行智能合约的能力带入工作量证明系统。加上以太坊的完整历史和现状，以确保所有 ETH 持有人和使用者都能顺利过渡。

## 合并后 {#after-the-merge}

这将标志着以太坊工作量证明的消失，从此开始一个更可持续性更强、更加环保的以太坊时代。 现在，以太坊将朝着 [Eth2 愿景](/upgrades/vision/)中概述的全面规模、安全性和可持续性更进一步。

值得注意的是，实施合并仅是为了加快从工作量证明到权益证明的过渡。 开发者正集中精力进行过渡，并尽量减少可能推迟过渡的附加功能。

**这意味着一些功能（例如提取质押的 ETH）将不得不在完成合并后的一段时间内才能实现。**计划包含处理这些功能的合并后“清理”升级，预计在完成合并后很快实现。

## 升级间的关系 {#relationship-between-upgrades}

Eth2 的升级在某种程度上都相互关联。 因此，让我们回顾一下合并与其他升级事件的关系。

### 合并与信标链 {#docking-and-beacon-chain}

发生合并后，将指派质押人去验证以太坊主网。 [挖矿](/developers/docs/consensus-mechanisms/pow/mining/)将不再需要，因此矿工很可能将其收入投资于新的权益证明系统。

<ButtonLink to="/upgrades/beacon-chain/">信标链</ButtonLink>

### 合并与合并后清理 {#merge-and-post-merge-cleanup}

一旦合并，将不再支持提取质押 ETH 等功能。 这些计划在合并后不久进行单独升级。

随时了解 [EF 研发博客](https://blog.ethereum.org/category/research-and-development/)的最新信息。 如果好奇，请详细了解 [合并后会发生什么](https://youtu.be/7ggwLccuN5s?t=101)，由 Vitalik 在 2021 年 4 月的 ETHGlobal 活动中介绍。

### 合并和分片链 {#docking-and-shard-chains}

最初计划在合并之前处理分片链 - 以解决可扩容性问题。 然而，随着[第二层扩容解决方案](/developers/docs/scaling/#layer-2-scaling)的发展，优先事项已经转向通过合并将工作量证明转换为权益证明。

这需要社区持续评估，以确定是否需要潜在的多轮分片链来实现无尽的可扩容性。

<ButtonLink to="/upgrades/shard-chains/">分片链</ButtonLink>
