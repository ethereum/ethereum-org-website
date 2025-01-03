---
title: Danksharding
description: 了解 Proto-Danksharding 和 Danksharding - 用于扩展以太坊的两项连续升级。
lang: zh
summaryPoints:
  - Danksharding 是一项多阶段升级，旨在提高以太坊的可扩容性和容量。
  - Proto-Danksharding 是第一阶段，旨在将数据二进制大对象添加到区块中
  - 数据二进制大对象为卷叠提供了一种更经济地将数据发布到以太坊上的方式，这种成本节约可以通过更低的交易费使用户间接受益。
  - 随后，完整的 Danksharding 将验证数据二进制大对象的责任分散到节点子集，使以太坊进一步扩展到每秒处理超过 100,000 笔交易。
---

# Danksharding {#danksharding}

**Danksharding** 是让以太坊成为真正的可扩展区块链的方案，但要实现这个方案，需要进行一系列协议升级。 **Proto-Danksharding** 是这个过程中的一个中间步骤。 两者都是为了让用户在二层网络上的交易尽可能便宜，并将以太坊扩展到每秒处理 >100,000 次交易。

## 什么是 Proto-Danksharding？ {#what-is-protodanksharding}

Proto-Danksharding，也称为 [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844)，是一种让[卷叠](/layer-2/#rollups)以更经济的方式向区块添加数据的方法。 这一名称来自提出这个想法的两位研究人员：Protolambda 和 Dankrad Feist。 以往，卷叠在降低用户交易费用方面存在局限性，因为它们是将交易发布在 `CALLDATA` 中。

这是一种昂贵的方法，因为数据经过所有以太坊节点处理，并且永远存在于链上，即使卷叠只在很短的时间内需要这些数据。 Proto-Danksharding 引入了可以发送并附加到区块上的数据二进制大对象。 这些二进制大对象中的数据不可通过以太坊虚拟机访问，并且在固定的时间（在写入时设置为 4096 个时段，或大约 18 天）后会自动删除。 这意味着卷叠可以更经济的方式发送其数据，节省的费用会让终端用户的交易更加便宜。

<ExpandableCard title="为什么二进制大对象能让卷叠更经济？" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

卷叠是一种通过在链下批量处理交易然后将结果发布到以太坊来扩展以太坊的方法。 卷叠本质上由两部分组成：数据和执行检查。 数据是由卷叠处理的完整交易序列，用于产生要发布到以太坊的状态变化。 执行检查是由某个诚实的参与者（称为“证明者”）重新执行这些交易，以确保提出的状态变化是正确的。 为了进行执行检查，交易数据必须在足够长的时间内可用，以便任何人都可以下载和检查。 这意味着卷叠排序者的任何不诚实行为都可以被证明者发现和质疑。 但是，交易数据不需要永远可用。

</ExpandableCard>

<ExpandableCard title="为什么可以删除二进制大对象的数据？" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

卷叠将其交易数据承诺发布在链上，并且在数据二进制大对象中提供实际的数据。 这意味着证明者可以检查承诺是否有效或质疑他们认为错误的数据。 在节点层面，数据二进制大对象保存在共识客户端中。 共识客户端证明他们已经检查了数据，并且数据已经在网络中传播。 如果数据永远保留，这些客户端会变得臃肿并导致运行节点的硬件要求很高。 然而，数据每隔 18 天将从节点中自动删除。 共识客户端的认证表明，证明者有足够的机会来验证数据。 实际数据可以由卷叠运营商、用户或其他人在链下存储。

</ExpandableCard>

### 如何验证二进制大对象中的数据？ {#how-are-blobs-verified}

卷叠将其执行的交易发布在数据二进制大对象中。 它们也发布一个对数据的“承诺”。 为此，他们会对数据拟合一个多项式函数。 然后，这个函数可以在各个点计算。 例如，如果我们定义一个非常简单的函数 `f(x) = 2x-1`，那么可以在 `x = 1`、`x = 2`、`x = 3` 时计算这个函数，得到结果为 `1, 3, 5`。 证明者对数据应用相同的函数，并在相同的点计算。 如果原始数据被更改，函数就不会相同，因此在每个点计算出来的值也不会相同。 在实际操作中，承诺和证明会更加复杂，因为它们会被包裹在加密函数中。

### 什么是 KZG？ {#what-is-kzg}

KZG 代表 Kate-Zaverucha-Goldberg - 是三位[原创作者](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11)名字的缩写。他们提出了一项将数据二进制大对象缩减为小型[密码“承诺”](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)的方案。 卷叠提交的数据二进制大对象必须经过验证，以确保卷叠没有错误行为。 这需要证明者重新执行二进制大对象中的交易，以检查承诺是否有效。 从概念上讲，这与执行客户端使用默克尔证明检验一层网络上的以太坊交易是否有效的方式相同。 KZG 是一种将多项式方程拟合到数据上的替代证明。 "承诺"在某些保密数据点处计算多项式。 证明者将在数据上拟合相同的多项式，并使用相同的数值计算它，以检验结果是否相同。 这种验证数据的方式与零知识技术兼容，一些卷叠在使用零知识技术，最终以太坊协议的其他部分也会使用。

### 什么是 KZG 仪式？ {#what-is-a-kzg-ceremony}

KZG 仪式是指以太坊社区的许多人共同生成一个随机的私密数字字符串，用于验证一些数据的一种方式。 这个数字字符串必须是未知的，不能由任何人重新创建，这一点非常重要。 为了确保做到这一点，每个参加仪式的人都会收到前一位参与者发送的一个字符串。 然后，他们会创建一些新的随机值（例如：通过允许他们的浏览器测量鼠标的移动）并将这些值与前面的值混合在一起。 之后，他们将这个值发送给下一位参与者并将其在本地计算机中销毁。 在这个仪式中，只要有一个人诚实地执行了这一过程，攻击者就无法知道最终值是什么。

EIP-4844 KZG 仪式曾经公开过，成千上万的人参与其中，并添加了自己的熵（随机值）。 总计贡献超过 14 万次，成为此类型全世界最大的一次仪式。 如果想破坏这个仪式，那么必须 100% 的参与者都不诚实。 从参与者的角度来看，如果他们知道自己是诚实的，就不需要相信其他任何人，因为他们知道自己确保了仪式的安全性（他们个人满足了，N 个参与者至少有一个诚实的要求）。

<ExpandableCard title="KZG 仪式上的随机数是用来做什么的？" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

当卷叠在二进制大对象中发布数据时，它们提供了一个发布到链上的“承诺”。 该承诺是在特定点对数据计算多项式拟合的结果。 这些点是由 KZG 仪式上生成的随机数决定的。 然后，证明者可以在相同的点上对多项式进行计算以验证数据 - 如果得出相同的值，则数据是正确的。

</ExpandableCard>

<ExpandableCard title="为什么 KZG 的随机数据必须保密？" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

如果有人知道用于承诺的随机位置，就可以很容易地生成一个可在这些特定点上拟合的新多项式（即“碰撞”）。 这意味着他们可以在二进制大对象中添加或删除数据，并且仍然提供有效的证明。 为了防止这种情况的出现，他们不向证明者提供实际的私密位置，而是使用椭圆曲线将位置封装在加密“黑盒”中并提供给证明者。 这样做可以有效打乱值，使得原始值无法被逆向工程，但通过一些巧妙的代数，证明者和验证者仍然可以在它们所代表的点上计算多项式。

</ExpandableCard>

<InfoBanner isWarning mb={8}>
  Danksharding 和 Proto-Danksharding 都没有采用传统的旨在将区块链分成多个部分的“分片”模式。 分片链不再是路线图的一部分。 相反，Danksharding 使用跨数据块的分布式数据采样来扩展以太坊。 这实施起来要简单得多。 这种模式有时被称为“数据分片”。
</InfoBanner>

## 什么是 Danksharding？ {#what-is-danksharding}

Danksharding 全面实现了从 Proto-Danksharding 开始的卷叠扩展。 Danksharding 将为以太坊带来大量空间，以便卷叠堆放他们的压缩交易数据。 这意味着以太坊能够轻松支持数百个单独卷叠，并实现每秒处理数百万次交易。

它的实现方式是将附加到区块的二进制大对象从 Proto-Danksharding 阶段的 6 个增加至完整 Danksharding 时的 64 个。 所需的其余变更都是对共识客户端的运行方式进行更新，使它们能够处理新的较大二进制大对象。 其中的一些变更已经由于 Danksharding 之外的目的列入路线图。 例如，Danksharding 要求贯彻执行提议者与构建者分离的理念。 这一升级会将构建区块与提议区块的工作分开由不同的验证者完成。 同样，Danksharding 还要求进行数据可用性采样，但开发不存储大量历史数据的超轻量级客户端（“无状态客户端”）也要求这样做。

<ExpandableCard title="为什么 Danksharding 要求提议者与构建者分离？" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

要求提议者与构建者分离为了防止单个验证者需要为 32MB 的数据块数据生成昂贵的承诺和证明。 这会给家庭质押人造成太大的压力，要求他们投资购置更强大的硬件，这将不利于去中心化。 相反，这项昂贵的计算工作可以由专门的区块构建者负责。 之后，他们可以向区块提议者提供区块，以进行广播。 区块提议者只需要选择收益最高的区块即可。 任何人都能够以便宜快捷的方式验证数据块，这意味着所有普通验证者都可以检查区块构建者是否诚实。 这样一来，处理大型二进制大对象就不需要牺牲去中心化。 行为不端的区块构建者会被逐出网络并受到罚没 — 其他人会接替他们的位置，因为区块构建是收益很高的活动。

</ExpandableCard>

<ExpandableCard title="为什么 Danksharding 要求进行数据可用性采样？" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

要求进行数据可用性采样是为了让验证者快速、高效地验证二进制大对象数据。 通过数据可用性采样，验证者可以非常确定二进制大对象数据是否可用和正确提交。 每个验证者都可以随机在几个数据点采样并创建证明，这意味着验证者不必核对整个二进制大对象。 如果有数据丢失，可以快速识别并拒绝二进制大对象。

</ExpandableCard>

### 当前进展 {#current-progress}

完全实现 Danksharding 还需要几年时间。 与此同时，KZG 仪式在经过超过 14 万份贡献后结束，Proto-Danksharding 的 [EIP](https://eips.ethereum.org/EIPS/eip-4844) 也已成熟。 该提案已在所有测试网中全面实施，并于 2024 年 3 月随着 Cancun-Deneb（“Dencun”）网络升级在主网上线。

### 延伸阅读 {#further-reading}

- [Proto-Danksharding 说明](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Dankrad 关于 Danksharding 的说明](https://notes.ethereum.org/@dankrad/new_sharding)
- [Dankrad、Proto 和 Vitalik 关于 Danksharding 的讨论](https://www.youtube.com/watch?v=N5p0TB77flM)
- [KZG 仪式](https://ceremony.ethereum.org/)
- [Carl Beekhuizen 在以太坊开发者大会上关于可信设置的演讲](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [更多关于针对二进制大对象进行数据可用性采样的信息](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dankrad Feist 关于 KZG 承诺和证明的演讲](https://youtu.be/8L2C6RDMV9Q)
- [KZG 多项式承诺](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)
