---
title: "信标链"
description: "了解信标链——为以太坊引入权益证明 (PoS) 的升级。"
lang: zh
template: upgrade
image: /images/upgrades/core.png
alt: 
summaryPoints:
  - "信标链为以太坊生态系统引入了权益证明 (PoS)。"
  - "它于 2022 年 9 月与最初的以太坊工作量证明 (PoW) 链合并。"
  - "信标链引入了共识逻辑和区块广播协议，现在负责保障以太坊的安全。"
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  信标链于 2020 年 12 月 1 日发布，并在 2022 年 9 月 15 日的合并升级中正式将权益证明 (PoS) 确立为以太坊的共识机制。
</UpgradeStatus>

## 什么是信标链？ {#what-is-the-beacon-chain}

信标链是 2020 年启动的最初的权益证明 (PoS) 区块链的名称。创建它的目的是在[以太坊](/)主网 (Mainnet) 上启用权益证明共识逻辑之前，确保其健全且可持续。因此，它与最初的工作量证明 (PoW) 以太坊并行运行。信标链曾是一条由“空”区块组成的链，但在以太坊上关闭工作量证明并开启权益证明，需要指示信标链接受来自执行客户端的交易数据，将它们打包成区块，然后使用基于权益证明的共识机制将它们组织成区块链。与此同时，最初的以太坊客户端关闭了它们的挖矿、区块传播和共识逻辑，将这一切都交给了信标链。这一事件被称为[合并](/roadmap/merge/)。合并发生后，不再有两条区块链。取而代之的是只有一个权益证明以太坊，现在每个节点需要两个不同的客户端。信标链现在是共识层，这是一个由共识客户端组成的点对点网络，负责处理区块广播和共识逻辑，而最初的客户端构成了执行层，负责广播和执行交易，并管理以太坊的状态。这两层可以使用 Engine API 相互通信。

## 信标链的作用是什么？ {#what-does-the-beacon-chain-do}

信标链是一个账户账本的名称，在以太坊[质押者](/staking/)开始验证真实的以太坊区块之前，它负责管理和协调这些质押者的网络。不过，它不处理交易或智能合约交互，因为这些工作是在执行层完成的。
信标链负责处理区块和证明、运行分叉选择算法以及管理奖励和惩罚等事务。
在我们的[节点架构页面](/developers/docs/nodes-and-clients/node-architecture/#node-comparison)上了解更多信息。

## 信标链的影响 {#beacon-chain-features}

### 引入质押 {#introducing-staking}

信标链为以太坊引入了[权益证明 (PoS)](/developers/docs/consensus-mechanisms/pos/)。这保障了以太坊的安全，并在此过程中为验证者赚取更多 ETH。在实践中，质押涉及质押 ETH 以激活验证者软件。作为质押者，你运行的软件会在链中创建并验证新区块。

质押的目的与过去的[挖矿](/developers/docs/consensus-mechanisms/pow/mining/)相似，但在许多方面有所不同。挖矿需要以强大的硬件和能源消耗的形式进行大量的前期支出，从而导致规模经济并促进中心化。挖矿也没有锁定资产作为抵押品的要求，这限制了协议在攻击后惩罚恶意行为者的能力。

与工作量证明相比，向权益证明的过渡使以太坊变得更加安全和去中心化。参与网络的人越多，它就越去中心化，也就越能免受攻击。


<Alert variant="update">
<AlertEmoji text=":money_bag:"/>
<AlertContent>
<AlertDescription>
  如果你有兴趣成为验证者并帮助保障以太坊的安全，请[了解有关质押的更多信息](/staking/)。
</AlertDescription>
</AlertContent>
</Alert>

### 为分片做准备 {#setting-up-for-sharding}

自从信标链与最初的以太坊主网合并以来，以太坊社区开始着眼于扩展网络。

权益证明的优势在于，在任何给定时间都有一个所有已批准的区块生产者的注册表，每个生产者都质押了 ETH。该注册表为分而治之但可靠地分配特定网络职责的能力奠定了基础。

这种责任与工作量证明形成鲜明对比，在工作量证明中，矿工对网络没有任何义务，可以随时停止挖矿并永久关闭其节点软件，而不会产生任何后果。此外，也没有已知区块提议者的注册表，也没有可靠的方法来安全地分配网络职责。

[关于分片的更多信息](/roadmap/danksharding/)

## 升级之间的关系 {#relationship-between-upgrades}

以太坊的各项升级都在某种程度上相互关联。因此，让我们回顾一下信标链如何影响其他升级。

### 信标链与合并 {#merge-and-beacon-chain}

起初，信标链独立于以太坊主网存在，但它们在 2022 年进行了合并。

<ButtonLink href="/roadmap/merge/">
  合并
</ButtonLink>

### 分片与信标链 {#shards-and-beacon-chain}

只有在具备权益证明共识机制的情况下，分片才能安全地进入以太坊生态系统。信标链引入了质押，并与主网“合并”，为分片帮助进一步扩展以太坊铺平了道路。

<ButtonLink href="/roadmap/danksharding/">
  分片链
</ButtonLink>

## 延伸阅读 {#further-reading}

- [关于节点架构的更多信息](/developers/docs/nodes-and-clients/node-architecture)
- [关于权益证明的更多信息](/developers/docs/consensus-mechanisms/pos)