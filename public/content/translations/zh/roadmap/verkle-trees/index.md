---
title: 沃克尔树
description: 沃克尔树的简要描述以及将如何用于升级以太坊
lang: zh
summaryPoints:
  - 了解沃克尔树是什么
  - 理解为什么沃克尔树是以太坊的重要升级
---

# 沃克尔树 {#verkle-trees}

沃克尔树（"Vector commitment" 和 "Merkle Trees" 的组合）是一种数据结构，可用于升级以太坊节点，使其能够不再存储大量状态数据，同时不失去验证区块的能力。

## 无状态性 {#statelessness}

沃克尔树是实现无状态以太坊客户端的关键一步。 无状态客户端是指不需要为了验证传入的区块而存储整个状态数据库的客户端。 无状态客户端使用与区块一同传来的状态数据的“见证”来验证区块，而非使用以太坊状态数据的本地拷贝。 见证是执行一组特定交易所需的单个状态数据片段的集合，以及表明见证确实是完整数据的一部分的加密证据。 见证用于_替代_状态数据库。 要做到这一点，见证需要非常小，以便能够安全地在网络上广播并被验证者在 12 秒的时隙内处理。 当前的状态数据结构不合适，因为它形成的见证太大。 沃克尔树通过实现小型见证解决了这个问题，从而消除了无状态客户端的主要障碍之一。

<ExpandableCard title="我们为什么需要无状态客户端？" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

以太坊客户端目前使用一种名为默克尔帕特里夏树的数据结构来存储其状态数据。 单个帐户的信息被存储为该树的叶子，然后对这些叶子反复进行哈希处理，直到只剩下一个哈希值。 这个最终的哈希值被称为“根”。 为了验证区块，以太坊客户端需要执行区块中的所有交易并更新它们的本地状态树。 如果本地树的根与区块提议者提供的相同，则该区块被视为有效，因为区块提议者和验证节点进行的计算如有任何差异，都会导致根哈希值完全不同。 这样做的问题在于验证区块链要求每个客户端存储链头区块以及一些历史区块的整个状态树（Geth 中的默认设置是保存链头区块之后 128 个区块的状态数据）。 这要求客户端有非常大的磁盘空间，这成为在低成本、低功耗硬件上运行全节点的障碍。 一个解决方案是将状态树更新为一个更高效的结构（沃克尔树），该结构可以被概括为使用可以分享的小型数据“见证”来代替完整的状态数据。 将状态数据的形式改为沃克尔树是迈向无状态客户端的重要一步。

</ExpandableCard>

## 什么是见证？我们为什么需要它们？ {#what-is-a-witness}

验证区块意味着重新执行区块中包含的交易，将更改应用到以太坊的状态数，并计算新的根哈希值。 区块经过验证是指，计算出的状态根哈希值与随该区块提供的根哈希值相同（因为这意味着区块提议者确实进行了他们所说的计算）。 在当今的以太坊客户端中，更新状态需要访问整个状态数，而它是一个必须本地存储的非常大的数据结构。 见证只包含执行区块中的交易所需的状态数据片段。 验证者只能使用这些片段来验证区块提议者是否正确执行了区块交易并更新了状态。 然而，这意味着见证需要在以太坊网络的对等节点之间非常快速地传输，能够在 12 秒的时隙内被每个节点安全地接收和处理。 如果见证过大，一些节点可能需要很长时间才能下载并跟上区块链的进度。 这会推动中心化，因为它意味着只有拥有快速互联网连接的节点才能参与验证区块。 有了沃克尔树，就无需将状态存储在硬盘上；验证区块所需的_一切信息_都包含在区块本身中。 遗憾的是，默克尔树产生的见证过于庞大，无法支持无状态客户端。

## 为什么沃克尔树可以实现更小的见证？ {#why-do-verkle-trees-enable-smaller-witnesses}

默克尔树的结构使得见证非常大，无法在 12 秒的时隙内被安全地在对等节点之间广播。 这是因为见证是连接数据（保存在叶子中）和根哈希值的路径。 要验证数据，不仅需要有连接每个叶子和根节点的所有中间哈希值，还需要有所有“同级”节点。 证明中的每个节点都有一个同级节点，需要与之进行哈希运算以创建树上的下一个哈希值。 这需要大量数据。 沃克尔树缩短了树叶与树根之间的距离，并且不再要求为了验证根哈希值而提供同级节点，从而缩小了见证。 使用功能强大的多项式承诺方案替代哈希式的向量承诺，可以获得更高的空间效率。 多项式承诺允许固定大小的见证，无论它证明的叶子数量有多少。

在多项式承诺方案下，见证的大小是可控的，可以轻松在对等网络上传输。 这样，客户端就能以最小的数据量验证每个区块的状态变化。

<ExpandableCard title="沃克尔树具体能将见证缩小多少？" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

见证的大小取决于它所包含的叶子的数量。 假设见证包含 1000 片叶子，在默克尔树中见证大小约为 3.5MB（假设该树有 7 个层级）。 而在沃克尔树（假设该树有 4 个层级）中，相同数据的见证大小约为 150 kB - **小了约 23 倍**。 见证的缩小将使无状态客户端见证的大小达到可接受的程度。 根据使用的特定多项式承诺，多项式见证的大小为 0.128 -1 kB。

</ExpandableCard>

## 沃克尔树的结构是什么？ {#what-is-the-structure-of-a-verkle-tree}

沃克尔树是 `(key,value)` 对，其中键是 32 字节元素，由一个 31 字节的_词干_和一个单字节的_后缀_组成。 这些键分为_扩展_节点和_内部_节点。 扩展节点代表一个单一的词干，包含 256 个不同后缀的子节点。 内部节点也有 256 个子节点，但它们可以是其他扩展节点。 沃克尔树和默克尔树结构的主要区别在于，沃克尔树更扁平，这意味着连接叶子和根的中间节点更少，因此生成证明所需的数据也更少。

![](./verkle.png)

[阅读更多关于沃克尔树结构的信息](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## 当前进展 {#current-progress}

沃克尔树测试网已经启动并运行，但要支持沃克尔树，还需要对客户端进行大量更新。 你可以通过在测试网部署智能合约或运行测试网客户端来帮助加速这一进程。

[探索 Verkle Gen Devnet 2 测试网](https://verkle-gen-devnet-2.ethpandaops.io/)

[观看 Guillaume Ballet 讲解 Condrieu 沃克尔测试网](https://www.youtube.com/watch?v=cPLHFBeC0Vg)（注意，Condrieu 测试网采用工作量证明机制，现已被 Verkle Gen Devnet 2 测试网取代）。

## 延伸阅读 {#further-reading}

- [沃克尔树实现无状态](https://verkle.info/)
- [Dankrad Feist 在 PEEPanEIP 上关于沃克尔树的讲解](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Guillaume Ballet 在 ETHGlobal 上关于沃克尔树的讲解](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- [Guillaume Ballet 在 Devcon 6 上的演讲“沃克尔树如何让以太坊变得高效精简”](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Piper Merriam 在 2020 年 ETHDenver 大会上关于无状态客户端的讲解](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Dankrad Fiest 在 Zero Knowledge 播客上关于沃克尔树和无状态性的讲解](https://zeroknowledge.fm/episode-202-stateless-ethereum-verkle-tries-with-dankrad-feist/)
- [Vitalik Buterin 关于沃克尔树的讲解](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist 关于沃克尔树的讲解](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [沃克尔树的以太坊改进提案](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)
