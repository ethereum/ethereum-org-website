---
title: 丹克分片
description: 了解 Proto-Danksharding 和丹克分片（Danksharding）——这两个用于扩展以太坊的连续升级。
lang: zh
summaryPoints:
  - 丹克分片（Danksharding）是一个多阶段升级，旨在提高以太坊的可扩展性和容量。
  - 第一阶段 Proto-Danksharding 向区块添加数据斑点。
  - 数据斑点为汇总（Rollup）提供了一种更便宜的方式将数据发布到以太坊，这些成本可以以更低的交易费用形式传递给用户。
  - 随后，完整的丹克分片将把验证数据斑点的责任分散到节点子集中，进一步将以太坊扩展到每秒超过 100,000 笔交易。
---

**丹克分片（Danksharding）**是[以太坊](/)成为真正可扩展的区块链的方式，但要实现这一目标需要进行几次协议升级。**Proto-Danksharding** 是此过程中的一个中间步骤。两者的目标都是让用户在二层网络 (l2) 上的交易尽可能便宜，并应将以太坊扩展到每秒超过 100,000 笔交易。

## 什么是 Proto-Danksharding？ {#what-is-protodanksharding}

Proto-Danksharding，也称为 [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844)，是[汇总](/layer-2/#rollups)向区块添加更便宜数据的一种方式。这个名字来源于提出该想法的两位研究人员：Protolambda 和 Dankrad Feist。过去，由于汇总将其交易发布在 `CALLDATA` 中，它们在降低用户交易成本方面受到了限制。

这种方式非常昂贵，因为它由所有以太坊节点处理并永远存在于链上，尽管汇总只需要这些数据很短的时间。Proto-Danksharding 引入了可以发送并附加到区块的数据斑点。这些斑点中的数据无法被以太坊虚拟机（EVM）访问，并在固定时间段后自动删除（在撰写本文时设置为 4096 个时段，约 18 天）。这意味着汇总可以以更低的成本发送其数据，并将节省的成本以更便宜的交易形式传递给最终用户。

<ExpandableCard title="为什么斑点能让汇总变得更便宜？" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

汇总是通过在链下批量处理交易，然后将结果发布到以太坊来扩展以太坊的一种方式。Rollup 本质上由两部分组成：数据和执行检查。数据是 Rollup 正在处理的完整交易序列，以产生发布到以太坊的状态变化。执行检查是由某个诚实的参与者（“证明者”）重新执行这些交易，以确保提议的状态变化是正确的。为了执行执行检查，交易数据必须在足够长的时间内可用，以便任何人都可以下载和检查。这意味着 Rollup 定序器的任何不诚实行为都可以被证明者识别和挑战。然而，它不需要永远可用。

</ExpandableCard>

<ExpandableCard title="为什么可以删除斑点数据？" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

汇总在链上发布对其交易数据的承诺，并在数据斑点中提供实际数据。这意味着证明者可以检查承诺是否有效，或者挑战他们认为错误的数据。在节点级别，数据斑点保存在共识客户端中。共识客户端证明他们已经看到了数据，并且数据已经在网络中传播。如果数据被永久保存，这些客户端将会膨胀，并导致运行节点需要大量的硬件要求。相反，数据每 18 天会自动从节点中修剪。共识客户端的证明表明，证明者有充分的机会来验证数据。实际数据可以由 Rollup 运营商、用户或其他人存储在链下。

</ExpandableCard>

### 如何验证斑点数据？ {#how-are-blobs-verified}

汇总将它们执行的交易发布在数据斑点中。它们还发布对数据的“承诺”。它们通过将多项式函数拟合到数据来实现这一点。然后可以在各个点上评估此函数。例如，如果我们定义一个极其简单的函数 `f(x) = 2x-1`，那么我们可以对 `x = 1`、`x = 2`、`x = 3` 评估此函数，得到结果 `1, 3, 5`。证明者将相同的函数应用于数据，并在相同的点上对其进行评估。如果原始数据被更改，该函数将不相同，因此在每个点上评估的值也不相同。实际上，承诺和证明更加复杂，因为它们被包裹在密码学函数中。

### 什么是 KZG？ {#what-is-kzg}

KZG 代表 Kate-Zaverucha-Goldberg——这是一种将数据斑点缩减为小型[密码学“承诺”](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)方案的三位[原作者](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11)的名字。必须验证汇总提交的数据斑点，以确保汇总没有不当行为。这涉及证明者重新执行斑点中的交易，以检查承诺是否有效。这在概念上与执行客户端使用默克尔证明（Merkle proofs）检查一层网络 (l1) 上以太坊交易有效性的方式相同。KZG 是一种将多项式方程拟合到数据的替代证明。承诺在一些秘密数据点上评估多项式。证明者将在数据上拟合相同的多项式，并在相同的值上对其进行评估，检查结果是否相同。这是一种验证数据的方法，它与一些汇总以及最终以太坊协议的其他部分所使用的零知识技术兼容。

### 什么是 KZG 仪式？ {#what-is-a-kzg-ceremony}

KZG 仪式是以太坊社区的许多人共同生成一个可用于验证某些数据的秘密随机数字串的一种方式。非常重要的是，这个数字串不为人知，也不能被任何人重新创建。为了确保这一点，每个参与仪式的人都会收到前一个参与者传来的字符串。然后，他们创建一些新的随机值（例如，通过允许他们的浏览器测量鼠标的移动），并将其与前一个值混合。然后，他们将该值发送给下一个参与者，并从本地机器上销毁它。只要仪式中有一个人诚实地做到了这一点，最终的值对攻击者来说就是不可知的。

EIP-4844 KZG 仪式向公众开放，成千上万的人参与其中，添加了他们自己的熵（随机性）。总共有超过 140,000 次贡献，使其成为世界上同类仪式中规模最大的。要破坏这个仪式，100% 的参与者必须主动表现出不诚实。从参与者的角度来看，如果他们知道自己是诚实的，就没有必要信任任何人，因为他们知道自己保护了仪式（他们个人满足了 N 分之一诚实参与者的要求）。

<ExpandableCard title="KZG 仪式中的随机数有什么用？" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

当汇总在斑点中发布数据时，它们会提供一个在链上发布的“承诺”。这个承诺是在某些点上评估拟合数据的多项式的结果。这些点由 KZG 仪式中生成的随机数定义。然后，证明者可以在相同的点上评估多项式以验证数据——如果他们得出相同的值，则数据是正确的。

</ExpandableCard>

<ExpandableCard title="为什么 KZG 随机数据必须保密？" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

如果有人知道用于承诺的随机位置，他们很容易生成一个在这些特定点上拟合的新多项式（即“碰撞”）。这意味着他们可以在斑点中添加或删除数据，并且仍然提供有效的证明。为了防止这种情况，证明者并没有得到实际的秘密位置，而是收到了使用椭圆曲线包裹在密码学“黑匣子”中的位置。这些有效地打乱了值，使得原始值无法被逆向工程，但通过一些巧妙的代数，证明者和验证者仍然可以在它们代表的点上评估多项式。

</ExpandableCard>

<Alert variant="warning">
  丹克分片和 Proto-Danksharding 都不遵循旨在将区块链分成多个部分的传统“分片”模型。分片链不再是路线图的一部分。相反，丹克分片使用跨斑点的分布式数据采样来扩展以太坊。这在实现上要简单得多。这种模型有时被称为“数据分片”。
</Alert>

## 什么是丹克分片？ {#what-is-danksharding}

丹克分片是始于 Proto-Danksharding 的汇总扩展的全面实现。丹克分片将为以太坊带来大量空间，供汇总转储其压缩的交易数据。这意味着以太坊将能够轻松支持数百个独立的汇总，并使每秒数百万笔交易成为现实。

它的工作方式是将附加到区块的斑点从 Proto-Danksharding 中的六 (6) 个扩展到完整丹克分片中的 64 个。所需的其余更改都是对共识客户端运行方式的更新，以使它们能够处理新的大型斑点。其中一些更改已经出于独立于丹克分片的其他目的而列入路线图。例如，丹克分片要求已经实现了提议者-构建者分离 (PBS)。这是一项将构建区块和提议区块的任务分配给不同验证者的升级。同样，丹克分片需要数据可用性采样，但开发不存储太多历史数据的非常轻量级的客户端（“无状态客户端”）也需要它。

<ExpandableCard title="为什么丹克分片要求提议者-构建者分离？" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

需要提议者-构建者分离 (PBS) 以防止单个验证者必须为 32MB 的斑点数据生成昂贵的承诺和证明。这会给家庭质押者带来太大的压力，并要求他们投资更强大的硬件，这会损害去中心化。相反，专门的区块构建者承担这项昂贵的计算工作。然后，他们将自己的区块提供给区块提议者进行广播。区块提议者只需选择最有利可图的区块。任何人都可以廉价且快速地验证斑点，这意味着任何普通验证者都可以检查区块构建者是否表现诚实。这允许在不牺牲去中心化的情况下处理大型斑点。行为不端的区块构建者可以简单地被逐出网络并被罚没——其他人将取代他们的位置，因为区块构建是一项有利可图的活动。

</ExpandableCard>

<ExpandableCard title="为什么丹克分片要求数据可用性采样？" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

验证者需要数据可用性采样来快速有效地验证斑点数据。使用数据可用性采样，验证者可以非常确定斑点数据是可用的并且已正确承诺。每个验证者可以随机采样几个数据点并创建证明，这意味着没有验证者必须检查整个斑点。如果缺少任何数据，它将被快速识别并拒绝该斑点。

</ExpandableCard>

### 当前进展 {#current-progress}

完整的丹克分片还需要几年的时间。与此同时，KZG 仪式已经结束，贡献超过 140,000 次，并且 Proto-Danksharding 的 [EIP](https://eips.ethereum.org/EIPS/eip-4844) 已经成熟。该提案已在所有测试网中全面实施，并于 2024 年 3 月随 Cancun-Deneb（“Dencun”）网络升级在主网上线。

### 延伸阅读 {#further-reading}

- [Proto-Danksharding 笔记](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Dankrad 关于丹克分片的笔记](https://notes.ethereum.org/@dankrad/new_sharding)
- [Dankrad、Proto 和 Vitalik 讨论丹克分片](https://www.youtube.com/watch?v=N5p0TB77flM)
- [KZG 仪式](https://ceremony.ethereum.org/)
- [Carl Beekhuizen 在 Devcon 上关于可信设置的演讲](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [更多关于斑点数据可用性采样的信息](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dankrad Feist 谈 KZG 承诺和证明](https://youtu.be/8L2C6RDMV9Q)
- [KZG 多项式承诺](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)