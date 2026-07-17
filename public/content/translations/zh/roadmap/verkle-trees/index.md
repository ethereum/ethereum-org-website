---
title: 沃克尔树
description: 关于沃克尔树及其将如何用于升级以太坊的高级概述
lang: zh
summaryPoints:
  - 了解什么是沃克尔树
  - 了解为什么沃克尔树对以太坊来说是一次有用的升级
---

沃克尔树（Verkle trees，由“向量承诺 (Vector commitment)”和“默克尔树 (Merkle Trees)”组合而成的词）是一种数据结构，可用于升级[以太坊](/)节点，使其能够停止存储大量状态数据，同时又不会失去验证区块的能力。

## 无状态 {#statelessness}

沃克尔树是迈向无状态以太坊客户端的关键一步。无状态客户端是指无需存储整个状态数据库即可验证传入区块的客户端。无状态客户端不使用其本地的以太坊状态副本来验证区块，而是使用随区块到达的状态数据的“见证数据”。见证数据是执行特定一组交易所需的状态数据的各个片段的集合，以及证明该见证数据确实是完整数据一部分的密码学证明。见证数据被用来*代替*状态数据库。为了实现这一点，见证数据需要非常小，以便它们能够及时在网络中安全广播，让验证者在一个 12 秒的时隙内处理它们。当前的状态数据结构并不合适，因为见证数据太大了。沃克尔树通过实现小型见证数据解决了这个问题，消除了无状态客户端的主要障碍之一。

<ExpandableCard title="为什么我们需要无状态客户端？" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

以太坊客户端目前使用一种称为帕特里夏默克尔树 (Patricia Merkle Trie) 的数据结构来存储其状态数据。有关各个账户的信息作为叶子节点存储在树上，并且成对的叶子节点被反复哈希，直到只剩下一个哈希。这个最终的哈希被称为“根”。为了验证区块，以太坊客户端执行区块中的所有交易并更新其本地状态树。如果本地树的根与区块提议者提供的根相同，则该区块被认为是有效的，因为区块提议者和验证节点所做计算的任何差异都会导致根哈希完全不同。这样做的问题在于，验证区块链需要每个客户端存储头部区块和几个历史区块的整个状态树（Geth 中的默认设置是保留头部之后 128 个区块的状态数据）。这要求客户端拥有大量的磁盘空间，这是在廉价、低功耗硬件上运行全节点的障碍。解决这个问题的方法是将状态树更新为更高效的结构（沃克尔树），该结构可以使用数据的微小“见证数据”进行汇总，从而可以共享见证数据而不是完整的状态数据。将状态数据重新格式化为沃克尔树是向无状态客户端过渡的垫脚石。

</ExpandableCard>

## 什么是见证数据，为什么我们需要它们？ {#what-is-a-witness}

验证区块意味着重新执行区块中包含的交易，将更改应用于以太坊的状态树，并计算新的根哈希。已验证的区块是指其计算出的状态根哈希与区块提供的状态根哈希相同的区块（因为这意味着区块提议者确实执行了他们声称执行的计算）。在当今的以太坊客户端中，更新状态需要访问整个状态树，这是一个必须在本地存储的大型数据结构。见证数据仅包含执行区块中交易所需的状态数据片段。然后，验证者只能使用这些片段来验证区块提议者是否已执行区块交易并正确更新了状态。然而，这意味着见证数据需要在以太坊网络上的对等节点之间足够快地传输，以便每个节点在一个 12 秒的时隙内安全地接收和处理。如果见证数据太大，某些节点可能需要太长时间才能下载它并跟上链的进度。这是一种中心化力量，因为这意味着只有拥有快速互联网连接的节点才能参与验证区块。有了沃克尔树，就不需要将状态存储在硬盘上了；验证区块所需的*一切*都包含在区块本身中。不幸的是，从默克尔树生成的见证数据太大，无法支持无状态客户端。

## 为什么沃克尔树能实现更小的见证数据？ {#why-do-verkle-trees-enable-smaller-witnesses}

默克尔树的结构使得见证数据的大小非常大——大到无法在一个 12 秒的时隙内安全地在对等节点之间广播。这是因为见证数据是一条将保存在叶子节点中的数据连接到根哈希的路径。为了验证数据，不仅需要拥有连接每个叶子节点到根的所有中间哈希，还需要拥有所有的“兄弟”节点。证明中的每个节点都有一个兄弟节点，它与该兄弟节点一起被哈希以创建树上的下一个哈希。这是大量的数据。沃克尔树通过缩短树的叶子节点与其根之间的距离，并消除了提供兄弟节点以验证根哈希的需要，从而减小了见证数据的大小。通过使用强大的多项式承诺方案代替哈希式向量承诺，将获得更高的空间效率。多项式承诺允许见证数据具有固定大小，无论它证明了多少个叶子节点。

在多项式承诺方案下，见证数据具有可管理的大小，可以轻松地在点对点网络上传输。这使得客户端能够用最少的数据量验证每个区块中的状态变化。

<ExpandableCard title="沃克尔树究竟能减少多少见证数据大小？" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

见证数据的大小因其包含的叶子节点数量而异。假设见证数据涵盖 1000 个叶子节点，默克尔树的见证数据约为 3.5MB（假设树有 7 层）。沃克尔树中相同数据的见证数据（假设树有 4 层）约为 150 kB——**缩小了约 23 倍**。见证数据大小的这种减小将使无状态客户端的见证数据小到可以接受的程度。多项式见证数据的大小为 0.128 - 1 kB，具体取决于所使用的特定多项式承诺。

</ExpandableCard>

## 沃克尔树的结构是什么？ {#what-is-the-structure-of-a-verkle-tree}

沃克尔树是 `(key,value)` 键值对，其中键是 32 字节的元素，由 31 字节的*主干 (stem)* 和单字节的*后缀 (suffix)* 组成。这些键被组织成*扩展 (extension)* 节点和*内部 (inner)* 节点。扩展节点代表具有不同后缀的 256 个子节点的单个主干。内部节点也有 256 个子节点，但它们可以是其他扩展节点。沃克尔树和默克尔树结构之间的主要区别在于沃克尔树要平坦得多，这意味着连接叶子节点到根的中间节点更少，因此生成证明所需的数据也更少。

![Diagram of a Verkle tree data structure](./verkle.png)

[阅读更多关于沃克尔树结构的信息](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## 当前进展 {#current-progress}

沃克尔树测试网已经启动并运行，但客户端仍需要进行大量未完成的更新才能支持沃克尔树。你可以通过将合约部署到测试网或运行测试网客户端来帮助加快进度。

[观看 Guillaume Ballet 解释 Condrieu 沃克尔测试网](https://www.youtube.com/watch?v=cPLHFBeC0Vg)（请注意，Condrieu 测试网是工作量证明 (PoW) 网络，现已被 Verkle Gen Devnet 6 测试网取代）。

## 延伸阅读 {#further-reading}

- [实现无状态的沃克尔树 (Verkle Trees for Statelessness)](https://verkle.info/)
- [Dankrad Feist 在 PEEPanEIP 上解释沃克尔树](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [写给普通人的沃克尔树 (Verkle Trees For The Rest Of Us)](https://web.archive.org/web/20250124132255/https://research.2077.xyz/verkle-trees)
- [沃克尔证明剖析 (Anatomy of A Verkle Proof)](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)
- [Guillaume Ballet 在 ETHGlobal 上解释沃克尔树](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- [Guillaume Ballet 在 Devcon 6 上的演讲：“沃克尔树如何让以太坊变得精简而强大”](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Piper Merriam 在 ETHDenver 2020 上关于无状态客户端的演讲](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Dankrad Feist 在零知识播客上解释沃克尔树和无状态](https://zeroknowledge.fm/podcast/202/)
- [维塔利克·布特林谈沃克尔树](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist 谈沃克尔树](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [沃克尔树 EIP 文档](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)