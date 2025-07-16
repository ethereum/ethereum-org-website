---
title: 挖矿算法
description: 以太坊挖矿所用的算法的详细介绍
lang: zh
---

<InfoBanner emoji=":wave:">
工作量证明不再是以太坊共识机制的基础，这意味着挖矿已终结。 取而代之的是，以太坊将由质押了以太币的验证者保护。 你可以立即开始质押以太币。 阅读更多关于<a href='/roadmap/merge/'>合并</a>、<a href='/developers/docs/consensus-mechanisms/pos/'>权益证明</a>和<a href='/staking/'>质押</a>的信息。 此页面仅为满足对历史的兴趣。
</InfoBanner>

以太坊挖矿使用过一种称为 Ethash 的算法。 该算法的基本思想是，矿工尝试使用蛮力计算找到一个随机数输入，使得生成的哈希小于一个取决于计算难度的阈值。 此难度级别可以动态调整，从而允许定期进行区块生产。

## 前提条件 {#prerequisites}

为了更好地理解本页内容，推荐你先阅读[工作量证明共识](/developers/docs/consensus-mechanisms/pow)和[挖矿](/developers/docs/consensus-mechanisms/pow/mining)。

## Dagger Hashimoto {#dagger-hashimoto}

Dagger Hashimoto 是以太坊挖矿的先导研究算法，现已被 Ethash 取代。 它是两种不同算法：Dagger 和 Hashimoto的融合。 它只是一个研究实现，并在以太坊主网启动时被 Ethash 取代。

[Dagger](http://www.hashcash.org/papers/dagger.html) 会生成一个[有向无环图](https://en.wikipedia.org/wiki/Directed_acyclic_graph)，将共同取哈希值的内容随机划分。 其核心原理是，每个随机数只取总数据树的一小部分。 挖矿禁止为每个随机数重新计算子树，因此需要总存储树，但若为验证某个随机数的价值，则可以重新计算。 Dagger 的设计目的是替代诸如Scrypt的已有算法。后者是“内存困难算法”，但当它们的内存困难程度增加到可信的安全水平时将很难验证。 然而，Dagger 容易受到共享内存硬件加速的影响，因此我们放弃了这种算法，转而采用了其他研究途径。

[Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf) 算法通过实现输入/输出密集的特性(即，内存读取速度是挖矿过程中的限制因素)来增加对专用集成电路的抵抗性。 理论上来说使用内存比使用计算能力更容易；已有价值数十亿美元的经费投入被用于研究针对不同应用场景的内存优化，通常涉及近随机访问模式(即“随机存取存储器”)。 因此，现有的内存对评价算法效率的能力更接近最优。 Hashimoto 使用区块链作为数据源，同时满足上述第 (1) 和第 (3) 条。

Dagger-Hashimoto 是在 Dagger 和 Hashimoto 的基础上改进而来的以太币挖矿算法。 Dagger Hashimoto 和 Hashimoto 的差别在于，Dagger Hashimoto 的数据来源并非是区块链，而是自定义生成的数据集，这些数据集将基于所有 N 区块上的区块数据进行更新。 这些数据集采用 Dagger 算法生成，可为轻量级客户端的验证算法高效计算特定于每个随机数的子集。 Dagger Hashimoto 算法和 Dagger 算法的差别在于，与原来的 Dagger 不同，用于查询区块的数据集只是暂时的，只会偶尔更新（例如每周更新一次）。 这意味着生成数据集的工作量接近于零，所以 Sergio Lerner 关于共享内存加速的论据变得微不足道。

有关 [Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto) 的更多信息。

## Ethash {#ethash}

Ethash 是在现已弃用的工作量证明架构下，实际用于真正的以太坊主网的挖矿算法。 Ethash 实际上是为 Dagger Hashimoto 算法进行重要更新后的一个特殊版本命名的新名称，但它仍然继承了其前身的基本原理。 以太坊主网只采用过 Ethash——Dagger Hashimoto 是挖矿算法的研发版本，在以太坊主网开始挖矿前被取代。

[有关 Ethash 的更多信息](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash)。

## 延伸阅读 {#further-reading}

_还有哪些社区资源对你有所帮助？ 请编辑本页面并添加！_
