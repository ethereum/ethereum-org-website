---
title: "波特尔网络"
description: "波特尔网络概述，这是一个点对点网络，在客户端停止存储所有以太坊历史数据时，它能保持这些数据的可用性。"
lang: zh
---

[以太坊](/)是一个由运行以太坊客户端软件的计算机组成的网络。这些计算机中的每一台都被称为“节点”。客户端软件允许节点在以太坊网络上发送和接收数据，并根据以太坊协议规则验证数据。节点在其磁盘存储中保存大量历史数据，并在从网络上的其他节点接收到称为区块的新信息包时将其添加进去。这对于始终检查节点是否拥有与网络其余部分一致的信息是必要的。这意味着运行节点可能需要大量的磁盘空间。一些节点操作也可能需要大量的 RAM。

执行客户端不再需要保存所有这些数据。自 2025 年 7 月起，它们可以丢弃[合并](/roadmap/merge/)之前的区块体和收据，并且以太坊路线图包括随着时间的推移丢弃更多链的历史数据。这些历史数据仍然必须对任何需要它的人保持可用，例如区块浏览器、索引器或查找旧交易的钱包。

波特尔网络通过在许多节点之间共享小块数据来保持这些历史数据的可用性。没有节点必须存储所有数据，节点可以获取任何数据块并根据其已持有的数据进行检查，而无需信任发送该数据的节点。

更多关于[节点和客户端](/developers/docs/nodes-and-clients/)的信息

## 为什么我们需要波特尔网络 {#why-do-we-need-portal-network}

以太坊节点存储它们自己的以太坊区块链的完整或部分副本。这个本地副本用于验证交易并确保节点遵循正确的链。这种本地存储的数据允许节点独立验证传入的数据是否有效和正确，而无需信任任何其他实体。

区块链的本地副本以及相关的状态和收据数据占用了节点硬盘上的大量空间。例如，建议使用 4TB SSD 来运行与共识客户端配对的 [Go以太坊 (Geth)](https://geth.ethereum.org) 节点。如果包含完整的链历史数据，Geth 占用超过 1.8TB 的磁盘空间（截至 2026 年 9 月），并且随着链的增长而不断增加。

这意味着运行节点可能会很昂贵，因为必须为以太坊分配大量的磁盘空间。[历史数据过期](/roadmap/statelessness/#history-expiry)通过让客户端删除它们不需要用来跟随链的旧区块数据来减少这种开销：自 2025 年 7 月的[部分历史数据过期](https://blog.ethereum.org/2025/07/08/partial-history-exp)以来，执行客户端可以丢弃合并之前每个区块的区块体和收据。[状态过期](/roadmap/statelessness/#state-expiry)和[无状态](/roadmap/statelessness/)是仍在研究中的进一步解决方案。

一旦节点停止存储旧的历史数据，它们就无法再将其提供给其他节点。归档节点、种子和提供商会保留其副本；波特尔网络将其分布在许多节点上，因此它可以在不依赖任何单一节点的情况下保持可用。

## 波特尔网络是如何工作的？ {#how-does-portal-network-work}

以太坊节点有严格的协议来定义它们如何相互通信。执行客户端使用一组称为 [devp2p](/developers/docs/networking-layer/#devp2p) 的子协议进行通信，而共识客户端使用称为 [libp2p](/developers/docs/networking-layer/#libp2p) 的不同子协议栈。devp2p 允许节点向其对等节点请求区块体和收据，但已经丢弃旧历史数据的对等节点无法提供这些数据。应用程序和钱包也可以通过 [JSON-RPC 应用程序编程接口 (API)](/developers/docs/apis/json-rpc/) 从节点获取数据，但这依赖于存储数据的单一节点或提供商，并需要信任其是诚实的。

波特尔网络是一个独立的点对点网络，专为共享历史数据而构建。它运行在 [discv5](https://github.com/ethereum/devp2p/blob/master/discv5/discv5.md) 上，这是共识客户端也用于寻找对等节点的节点发现协议，并将其节点组织为[分布式哈希表 (DHT)](https://en.wikipedia.org/wiki/Distributed_hash_table)，类似于 BitTorrent 的机制。每个节点都有一个节点 ID，并且每条内容（例如一个区块的收据）在相同的 ID 空间中都有一个内容 ID，该 ID 派生自其区块号。每个节点存储其 ID 最接近自身 ID 的内容，直到它选择的距离（称为其半径）。为了获取一条内容，节点会向它所知道的距离该内容 ID 最近的对等节点发出请求。没有该内容的对等节点会回复距离更近的节点，直到请求到达存储该内容的节点。

<PortalHistoryDiagram />

节点永远不需要信任它接收到的数据。它保留每个区块头，并且每个区块头通过诸如 `transactionsRoot` 和 `receiptsRoot` 等根来承诺其区块的交易和收据。节点在使用区块体或区块的收据之前，会根据这些根对它们进行检查。

### 波特尔网络 {#the-portal-networks}

波特尔网络最初被设计为几个子网，这些子网将允许轻客户端在不信任全节点的情况下跟随链：信标链轻客户端网络、状态网络、交易广播网络和历史数据网络。在 2025 年，除了其中一个子网之外，所有其他子网的规范都被移至旧版，现在的开发重点是**历史数据网络**，它为保留每个区块头但丢弃了其余历史数据的执行客户端存储过去区块的区块体和收据。

## 波特尔网络客户端 {#client-diversity-as-default}

有几个团队构建了波特尔网络客户端：

- [尼姆巴斯 (Nimbus) 波特尔客户端](https://fluffy.guide)（前身为 Fluffy）：用 Nim 编写，是目前仍在积极开发中的客户端
- [Trin](https://github.com/ethereum/trin)：用 Rust 编写，已不再维护
- [Ultralight](https://github.com/ethereumjs/ultralight)：用 TypeScript 编写，自 2025 年中以来未更新
- [Shisui](https://github.com/zen-eth/shisui)：用 Go 编写，自 2025 年中以来未更新

## 延伸阅读 {#further-reading}

- [波特尔网络规范](https://github.com/ethereum/portal-network-specs)
- [使用波特尔网络协议实现历史数据过期](https://ethresear.ch/t/using-portal-network-protocol-for-history-expiry/22658)
- [部分历史数据过期](https://blog.ethereum.org/2025/07/08/partial-history-exp)
- [波特尔网络（Piper Merriam 在波哥大 Devcon 上的演讲）](https://www.youtube.com/watch?v=0stc9jnQLXA)
- [波特尔网络 Discord](https://discord.gg/CFFnmE7Hbs)
- [波特尔网络网站](https://www.ethportal.net/)
