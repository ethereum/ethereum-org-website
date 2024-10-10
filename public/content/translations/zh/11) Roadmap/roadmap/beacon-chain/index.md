---
title: 信标链
description: 了解信标链 - 引入权益证明的以太坊升级。
lang: zh
template: upgrade
image: /images/upgrades/core.png
alt:
summaryPoint1: 信标链为以太坊生态系统引入了权益证明机制。
summaryPoint2: 信标链于 2022 年 9 月与原有的以太坊工作量证明链合并。
summaryPoint3: 信标链引入了共识逻辑和区块广播协议，为当前的以太坊保驾护航。
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  信标链于 2020 年 12 月 1 日上线，并且在 2022 年 9 月 15 日完成合并升级，将权益证明正式确定为太坊的共识机制。
</UpgradeStatus>

## 什么是信标链？ {#what-is-the-beacon-chain}

信标链是 2020 年推出的原始权益证明区块链的名称。 它的创立是为了在以太坊主网上运行权益证明共识逻辑之前确保该逻辑是可靠且可持续的。 因此，它与原有的工作量证明以太坊一起运行。 信标链是一个由“空”区块组成的链，但在以太坊上停止工作量证明并启动权益证明，需要指示信标链接受来自执行客户端的交易数据，将它们打包到区块，再将区块组织到一条运行权益证明共识机制的区块链上。 与此同时，原有的以太坊客户端停止挖矿、区块传播及旧的共识逻辑，并将这一切转交给信标链。 这一事件称为[合并](/roadmap/merge/)。 在合并发生后，就不再有两个区块链。 相反，只有一个权益证明以太坊，现在每个节点需要两个不同的客户端。 信标链现在是共识层，一个处理区块消息和共识逻辑的共识客户端的点对点网络，而原始客户端形成执行层，负责传播消息和执行交易，以及管理以太坊的状态。 这两层可以使用引擎应用程序接口相互通信。

## 信标链有什么作用？ {#what-does-the-beacon-chain-do}

信标链是在以太坊[质押人](/staking/)开始验证真实的以太坊区块之前管理和协调以太坊质押人网络的帐户账本的名称。 它不处理交易或智能合约交互，因为这些任务在执行层完成。 信标链负责处理区块和证明、运行分叉选择算法以及管理奖励和惩罚等。 要了解更多内容，请参阅我们的[节点架构页面](/developers/docs/nodes-and-clients/node-architecture/#node-comparison)。

## 信标链的影响 {#beacon-chain-features}

### 质押介绍 {#introducing-staking}

信标链将[权益证明机制](/developers/docs/consensus-mechanisms/pos/)引入以太坊。 这保证了以太坊的安全，并在此过程中让验证者获得更多以太币。 在实际操作中，质押将需要质押以太币，以激活验证者软件。 作为质押人，你运行该软件并在链中创建和验证新区块。

质押的目的和以前的[挖矿](/developers/docs/consensus-mechanisms/pow/mining/)相似，但又在很多方面不同。 挖矿的前期支出庞大，需要投入强大的硬件和消耗大量能源，从而产生规模经济并促进集中化。 挖矿也没有提出任何将资产锁定作为抵押品的要求，这限制了被攻击后协议惩罚不良行为者的能力。

和工作量证明相比，过渡到权益证明让以太坊的安全性与去中心化得到显著提升。 参与该网络的人越多，网络去中心化程度越高，面临攻击时也越安全。

采用权益证明共识机制为[我们现在拥有的安全、环保和可扩展的以太坊](/roadmap/vision/)奠定了基础。

<InfoBanner emoji=":money_bag:">
  如果你有兴趣成为验证者并帮助保护以太坊，请点击此处<a href="/staking/">了解更多关于质押的信息</a>。
</InfoBanner>

### 设置分片 {#setting-up-for-sharding}

在信标链与最初的以太坊主网合并后，以太坊社区开始寻求扩展该网络。

权益证明的优势是，在任何给定时间都有全部已批准的区块生产者的记录，每个区块生产者都质押了以太币。 这个记录不但为分开治理奠定了基础，还可靠地划分了具体的网络责任。

这种责任与工作量证明形成对比，在工作量证明中，矿工对网络没有义务，可以立即停止挖矿并永久关闭其节点而不会受到任何影响。 而且，也没有已知区块提议者的记录，并且没有可靠的方法安全地划分网络责任。

[有关分片的更多信息](/roadmap/danksharding/)

## 升级间的关系 {#relationship-between-upgrades}

以太坊的所有升级都存在一些关联。 所以我们来回顾一下信标链对其他升级的影响。

### 信标链和合并 {#merge-and-beacon-chain}

最初，信标链与以太坊主网相互独立，但两者在 2022 合并。

<ButtonLink href="/roadmap/merge/">
  合并
</ButtonLink>

### 分片和信标链 {#shards-and-beacon-chain}

只有在已建立权益证明共识机制的情况下，分片才能安全进入以太坊生态系统。 信标链引入了质押，它与主网“合并”，为分片铺平了道路，以帮助进一步扩展以太坊。

<ButtonLink href="/roadmap/danksharding/">
  分片链
</ButtonLink>

## 延伸阅读

- [有关以太坊未来升级的更多信息](/roadmap/vision)
- [有关节点架构的更多信息](/developers/docs/nodes-and-clients/node-architecture)
- [更多关于关权益证明的信息](/developers/docs/consensus-mechanisms/pos)
