---
title: "数据可用性"
description: "以太坊中与数据可用性相关的问题和解决方案概述"
lang: zh
---

“不要信任，要验证”是以太坊中的一句常见格言。其核心理念是，你的节点可以通过执行从对等节点接收到的区块中的所有交易，来独立验证其接收到的信息是否正确，从而确保提议的更改与节点独立计算的更改完全匹配。这意味着节点不必信任区块发送者是诚实的。如果数据丢失，这是不可能实现的。

<strong>数据可用性</strong>是指用户确信验证区块所需的数据确实可供所有网络参与者使用。对于[以太坊](/)一层网络 (l1) 上的全节点来说，这相对简单；全节点会下载每个区块中所有数据的副本——数据_必须_可用才能进行下载。丢失数据的区块将被丢弃，而不是被添加到区块链中。这就是“链上数据可用性”，也是单体区块链的一个特征。全节点不会被欺骗去接受无效交易，因为它们会亲自下载并执行每一笔交易。然而，对于模块化区块链、二层网络 (l2) 汇总和轻客户端来说，数据可用性的情况更为复杂，需要一些更复杂的验证程序。

## 先决条件 {#prerequisites}

你应该对[区块链基础知识](/developers/docs/intro-to-ethereum/)有很好的了解，尤其是[共识机制](/developers/docs/consensus-mechanisms/)。本页面还假设读者熟悉[区块](/developers/docs/blocks/)、[交易](/developers/docs/transactions/)、[节点](/developers/docs/nodes-and-clients/)、[扩容解决方案](/developers/docs/scaling/)以及其他相关主题。

## 数据可用性问题 {#the-data-availability-problem}

数据可用性问题是指需要向整个网络证明，正在添加到区块链的某些交易数据的摘要形式确实代表了一组有效的交易，但这样做又不能要求所有节点下载所有数据。完整的交易数据对于独立验证区块是必要的，但要求所有节点下载所有交易数据是扩容的障碍。数据可用性问题的解决方案旨在提供充分的保证，确保完整的交易数据已提供给那些不亲自下载和存储数据的网络参与者进行验证。

[轻节点](/developers/docs/nodes-and-clients/light-clients)和[二层网络 (l2) 汇总](/developers/docs/scaling)是网络参与者的重要例子，它们需要强大的数据可用性保证，但无法亲自下载和处理交易数据。避免下载交易数据正是轻节点之所以“轻”的原因，也是使汇总成为有效扩容解决方案的关键。

数据可用性也是未来[“无状态”](/roadmap/statelessness)以太坊客户端的一个关键问题，这些客户端不需要为了验证区块而下载和存储状态数据。无状态客户端仍然需要确信数据在_某个地方_是可用的，并且已经被正确处理。

## 数据可用性解决方案 {#data-availability-solutions}

### 数据可用性采样 (DAS) {#data-availability-sampling}

数据可用性采样 (DAS) 是网络检查数据是否可用的一种方式，而不会给任何单个节点带来太大压力。每个节点（包括非质押节点）都会下载总数据中随机选择的一小部分子集。成功下载样本可以高度确信所有数据都是可用的。这依赖于数据纠删码，它使用冗余信息扩展给定的数据集（其实现方式是在数据上拟合一个称为_多项式_的函数，并在额外的点上计算该多项式）。这允许在必要时从冗余数据中恢复原始数据。这种数据创建的一个结果是，如果_任何_原始数据不可用，_一半_的扩展数据将会丢失！每个节点下载的数据样本量可以进行调整，以便_如果_实际可用的数据少于一半，每个客户端采样的至少一个数据片段_极有_可能会丢失。

在实施[完整丹克分片](/roadmap/danksharding/#what-is-danksharding)之后，DAS 将用于确保 Rollup 运营商使其交易数据可用。以太坊节点将使用上述冗余方案对斑点中提供的交易数据进行随机采样，以确保所有数据都存在。同样的技术也可以用来确保区块生产者使其所有数据可用，以保护轻客户端的安全。类似地，在[提议者-构建者分离 (PBS)](/roadmap/pbs)机制下，只有区块构建者才需要处理整个区块——其他验证者将使用数据可用性采样进行验证。

### 数据可用性委员会 {#data-availability-committees}

数据可用性委员会 (DAC) 是提供或证明数据可用性的受信任方。DAC 可以替代 DAS，[或与 DAS 结合使用](https://hackmd.io/@vbuterin/sharding_proposal#Why-not-use-just-committees-and-not-DAS)。委员会带来的安全保证取决于具体的设置。例如，以太坊使用随机采样的验证者子集来证明轻节点的数据可用性。

一些 Validium 也使用 DAC。DAC 是一组受信任的节点，它们在链下存储数据副本。在发生争议时，DAC 需要提供数据。DAC 成员还会在链上发布证明，以证明所述数据确实可用。一些 Validium 用权益证明 (PoS) 验证者系统取代了 DAC。在这里，任何人都可以成为验证者并在链下存储数据。但是，他们必须提供“保证金”，该保证金存放在智能合约中。如果发生恶意行为，例如验证者隐瞒数据，保证金可能会被罚没。权益证明数据可用性委员会比常规 DAC 安全得多，因为它们直接激励诚实行为。

## 数据可用性与轻节点 {#data-availability-and-light-nodes}

[轻节点](/developers/docs/nodes-and-clients/light-clients)需要验证它们接收到的区块头的正确性，而无需下载区块数据。这种轻量级的代价是无法像全节点那样通过在本地重新执行交易来独立验证区块头。

以太坊轻节点信任被分配到_同步委员会_的 512 个验证者的随机集合。同步委员会充当 DAC，使用密码学签名向轻客户端发出信号，表明区块头中的数据是正确的。同步委员会每天都会刷新。每个区块头都会提醒轻节点预期哪些验证者会签署_下一个_区块，因此它们不会被欺骗去信任假冒真实同步委员会的恶意群体。

然而，如果攻击者以某种方式_确实_设法将恶意区块头传递给轻客户端，并使它们相信该区块头是由诚实的同步委员会签署的，会发生什么？在这种情况下，攻击者可以包含无效交易，而轻客户端会盲目接受它们，因为它们不会独立检查区块头中总结的所有状态更改。为了防止这种情况，轻客户端可以使用欺诈证明。

这些欺诈证明的工作方式是，全节点在看到网络中传播的无效状态转换时，可以快速生成一小段数据，证明提议的状态转换不可能由给定的一组交易产生，并将该数据广播给对等节点。轻节点可以获取这些欺诈证明，并使用它们来丢弃不良区块头，确保它们与全节点保持在同一条诚实链上。

这依赖于全节点能够访问完整的交易数据。广播不良区块头且未能使交易数据可用的攻击者，将能够阻止全节点生成欺诈证明。全节点可能能够发出关于不良区块的警告，但它们无法用证明来支持其警告，因为没有提供可用于生成证明的数据！

解决这个数据可用性问题的方案是 DAS。轻节点下载完整状态数据的非常小的随机块，并使用这些样本来验证完整的数据集是否可用。在下载 N 个随机块后错误地假设完整数据可用性的实际可能性是可以计算的（[对于 100 个块，概率为 10^-30](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html)，即极不可能）。

即使在这种情况下，隐瞒仅仅几个字节的攻击也可能被发出随机数据请求的客户端所忽视。纠删码通过重建可用于检查提议状态更改的丢失的小块数据来解决这个问题。然后可以使用重建的数据构建欺诈证明，防止轻节点接受不良区块头。

**注意：** DAS 和欺诈证明尚未在权益证明以太坊轻客户端中实现，但它们已在路线图上，最有可能采用基于 zk-SNARK 的证明形式。今天的轻客户端依赖于一种 DAC 形式：它们验证同步委员会的身份，然后信任它们接收到的已签名区块头。

## 数据可用性与二层网络 (l2) 汇总 {#data-availability-and-layer-2-rollups}

[二层网络 (l2) 扩容解决方案](/layer-2/)（例如[汇总](/glossary/#rollups)）通过在链下处理交易来降低交易成本并提高以太坊的吞吐量。Rollup 交易被压缩并分批发布到以太坊上。批次在以太坊上的一笔交易中代表了数千笔单独的链下交易。这减少了基础层的拥堵，并降低了用户的费用。

然而，只有当提议的状态更改能够被独立验证并确认为应用所有单独链下交易的结果时，才有可能信任发布到以太坊的“摘要”交易。如果 Rollup 运营商不提供用于此验证的交易数据，那么他们可能会向以太坊发送不正确的数据。

[乐观汇总 (Optimistic Rollup)](/developers/docs/scaling/optimistic-rollups/) 将压缩的交易数据发布到以太坊，并等待一段时间（通常为 7 天），以允许独立验证者检查数据。如果有人发现问题，他们可以生成欺诈证明并用它来挑战 Rollup。这将导致链回滚并忽略无效区块。只有在数据可用的情况下，这才有可能实现。目前，乐观汇总有两种方式将交易数据发布到一层网络 (l1)。一些 Rollup 将数据作为 `CALLDATA` 永久可用，它永久存在于链上。随着 EIP-4844 的实施，一些 Rollup 转而将其交易数据发布到更便宜的斑点存储中。这不是永久存储。独立验证者必须在数据从以太坊一层网络 (l1) 删除之前的约 18 天内查询斑点并提出挑战。以太坊协议仅在那个短暂的固定窗口期内保证数据可用性。在此之后，它将成为以太坊生态系统中其他实体的责任。任何节点都可以使用 DAS 验证数据可用性，即通过下载斑点数据的小型随机样本。

[零知识 (ZK) 汇总](/developers/docs/scaling/zk-rollups)不需要发布交易数据，因为[零知识有效性证明](/glossary/#zk-proof)保证了状态转换的正确性。然而，数据可用性仍然是一个问题，因为如果没有访问其状态数据，我们就无法保证 ZK-rollup 的功能（或与其交互）。例如，如果运营商隐瞒有关 Rollup 状态的详细信息，用户就无法知道他们的余额。此外，他们无法使用新添加区块中包含的信息执行状态更新。

## 数据可用性与数据可检索性 {#data-availability-vs-data-retrievability}

数据可用性不同于数据可检索性。数据可用性是确保全节点能够访问并验证与特定区块相关的完整交易集。这并不一定意味着数据永远可访问。

数据可检索性是节点从区块链中检索_历史信息_的能力。验证新区块不需要这些历史数据，只有在从创世区块同步全节点或处理特定的历史请求时才需要它。

核心以太坊协议主要关注数据可用性，而不是数据可检索性。数据可检索性可以由第三方运行的少量归档节点提供，或者可以使用去中心化的文件存储（如[波特尔网络](https://www.ethportal.net/)）分布在整个网络中。

## 延伸阅读 {#further-reading}

- [什么是数据可用性？](https://medium.com/blockchain-capital-blog/wtf-is-data-availability-80c2c95ded0f)
- [什么是数据可用性？](https://coinmarketcap.com/academy/article/what-is-data-availability)
- [数据可用性检查入门](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html)
- [分片 + DAS 提案的解释](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [关于数据可用性和纠删码的说明](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding#can-an-attacker-not-circumvent-this-scheme-by-releasing-a-full-unavailable-block-but-then-only-releasing-individual-bits-of-data-as-clients-query-for-them)
- [数据可用性委员会。](https://medium.com/starkware/data-availability-e5564c416424)
- [权益证明数据可用性委员会。](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [数据可检索性问题的解决方案](https://notes.ethereum.org/@vbuterin/data_sharding_roadmap#Who-would-store-historical-data-under-sharding)
- [数据可用性，或者：Rollup 如何学会停止担忧并爱上以太坊](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [EIP-7623：增加调用数据成本](https://web.archive.org/web/20250515194659/https://research.2077.xyz/eip-7623-increase-calldata-cost)