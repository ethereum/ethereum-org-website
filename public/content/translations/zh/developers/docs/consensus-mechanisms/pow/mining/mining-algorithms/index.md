---
title: "挖矿算法"
description: "深入了解以太坊挖矿所使用的算法。"
lang: zh
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
工作量证明 (PoW) 不再是以太坊共识机制的基础，这意味着挖矿已被关闭。相反，以太坊现在由质押 ETH 的验证者来保护。你今天就可以开始质押你的 ETH。了解更多关于<a href='/roadmap/merge/'>合并</a>、<a href='/developers/docs/consensus-mechanisms/pos/'>权益证明 (PoS)</a>和<a href='/staking/'>质押</a>的信息。本页面仅供历史参考。
</AlertDescription>
</AlertContent>
</Alert>

以太坊挖矿曾使用一种名为 Ethash 的算法。该算法的基本思想是，矿工尝试使用暴力计算来找到一个随机数输入，使得生成的哈希小于由计算出的难度决定的阈值。这个难度级别可以动态调整，从而允许区块的生成以固定的时间间隔进行。

## 前提条件 {#prerequisites}

为了更好地理解本页面，我们建议你首先阅读有关[工作量证明 (PoW) 共识](/developers/docs/consensus-mechanisms/pow)和[挖矿](/developers/docs/consensus-mechanisms/pow/mining)的内容。

## Dagger Hashimoto {#dagger-hashimoto}

Dagger Hashimoto 是以太坊挖矿的早期研究算法，后来被 Ethash 取代。它是两种不同算法的结合体：Dagger 和 Hashimoto。它仅仅是一个研究实现，在以太坊主网启动时已被 Ethash 取代。

[Dagger](http://www.hashcash.org/papers/dagger.html) 涉及生成一个[有向无环图 (DAG)](https://en.wikipedia.org/wiki/Directed_acyclic_graph)，其随机切片会被一起进行哈希计算。其核心原理是，每个随机数只需要庞大总数据树的一小部分。为每个随机数重新计算子树对于挖矿来说成本过高——因此需要存储该树——但对于单个随机数的验证来说是可以接受的。Dagger 被设计为 Scrypt 等现有算法的替代方案，这些算法是内存困难型的，但当其内存困难度增加到真正安全的水平时，就很难进行验证。然而，Dagger 容易受到共享内存硬件加速的攻击，因此被放弃，转而进行其他方向的研究。

[Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf) 是一种通过受限于 I/O（即内存读取是挖矿过程中的限制因素）来增加抗 ASIC 特性的算法。其理论依据是，RAM 比计算资源更容易获得；数十亿美元的研究已经探讨了针对不同用例优化 RAM 的方法，这些用例通常涉及近乎随机的访问模式（因此称为“随机存取存储器”）。因此，现有的 RAM 可能相当接近评估该算法的最佳状态。Hashimoto 使用区块链作为数据源，同时满足了上述的 (1) 和 (3)。

Dagger-Hashimoto 使用了 Dagger 和 Hashimoto 算法的修改版本。Dagger Hashimoto 和 Hashimoto 之间的区别在于，Dagger Hashimoto 不使用区块链作为数据源，而是使用自定义生成的数据集，该数据集每 N 个区块根据区块数据进行更新。该数据集使用 Dagger 算法生成，允许为轻客户端验证算法高效地计算特定于每个随机数的子集。Dagger Hashimoto 和 Dagger 之间的区别在于，与原始 Dagger 不同，用于查询区块的数据集是半永久性的，仅在偶尔的间隔（例如，每周一次）进行更新。这意味着生成数据集的工作量占比接近于零，因此 Sergio Lerner 关于共享内存加速的论点变得可以忽略不计。

了解更多关于 [Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto) 的信息。

## Ethash {#ethash}

Ethash 是在现已弃用的工作量证明架构下，实际用于真实以太坊主网的挖矿算法。实际上，Ethash 是在算法进行重大更新后，赋予特定版本 Dagger-Hashimoto 的新名称，同时它仍然继承了其前身的基本原理。以太坊主网只使用过 Ethash——Dagger Hashimoto 是挖矿算法的研发版本，在以太坊主网开始挖矿之前就已被取代。

[了解更多关于 Ethash 的信息](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash)。

## 延伸阅读 {#further-reading}

_知道对你有帮助的社区资源吗？编辑本页面并添加它！_