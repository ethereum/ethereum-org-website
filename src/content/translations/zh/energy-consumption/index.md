---
title: 以太坊能源消耗
description: 了解以太坊能源消耗所需的基本信息。
lang: zh
---

# 以太坊能源消耗 {#introduction}

以太坊是一个绿色区块链。 它使用[权益证明](/developers/docs/consensus-mechanisms/pos)共识机制，可以在低功率设备上运行，并且不需要大量计算即可参与。 以太坊的权益证明机制通过使用质押的 ETH 来保护网络，而不是像[工作量证明](/developers/docs/consensus-mechanisms/pos)那样消耗能量。 切换到权益证明意味着以太坊网络消耗的能量相对较小 - 大约为 0.01 TWh/年。

## 权益证明能源消耗 {#proof-of-stake-energy}

以太坊的能源消耗大致等于为网络上的每个节点运行一台普通笔记本电脑的成本。

许多文章估算了“每笔交易”的能源消耗，以便将区块链与其他行业进行比较。 这样做的好处是易于理解。 然而，基于交易的估算可能会产生误导，因为提议和验证一个区块所需的能量与其中的交易数量无关。 如果按每个交易单位的能源消耗计算，意味着交易越少能源消耗越少，反之亦然，但事实并非如此。 每笔交易估算值高度依赖于区块链的交易吞吐量是如何定义的，并且可以通过调整这个定义来使值看起来更大或更小。

例如，在以太坊，交易吞吐量不仅是基础层的交易吞吐量，还有所有“[二层网络](/layer-2/)”卷叠的交易吞吐量总和。但二层网络卷叠的交易吞吐量通常不包含在计算中，因此计算出来的值会大幅减少。 这就是为什么跨平台比较每笔交易能源消耗的工具具有误导性的原因之一。

更重要的是整个网络的整体能源消耗和碳足迹。 通过这些值，我们可以检查网络为其用户和整个社会提供了什么，并更全面地评估该能源消耗是否合理。 另外，如果按照每笔交易去衡量，意味着网络的价值仅来自其在帐户之间传输加密货币中所发挥的作用，并且忽略了诚实的成本效益分析。

[Digiconomist 为比特币和以太坊提供全网能源消耗和碳足迹](https://digiconomist.net/ethereum-energy-consumption)。 在撰写本文时，比特币每年消耗约 200 TWh 的能量并排放约 100 MT（百万吨）的碳，同时每年废弃的硬件大约产生 32,000 吨电器废物。 相比之下，保护以太坊的总能源消耗更接近 **0.01 TWh/年**。

![各行业能源消耗比较](./energy.png)

上图显示了以 TWh/年为单位的各个行业的估计年能源消耗(检索于 2022 年 6 月)。 _请注意，图中显示的估算值来自下文链接指向的公开来源。 这些估算值 仅作例证，不代表官方估算、承诺或预测。_

为了解以太坊能源消耗的实际情况，我们可以比较其他行业的年度估算值。 如果我们把以太坊看作一个将数字资产作为投资安全持有的平台，或许我们可以将其比作开采黄金，估计花费大约为 [240 TWh/年](https://www.kitco.com/news/2021-05-17/Gold-s-energy-consumption-doubles-that-of-bitcoin-Galaxy-Digital.html)。 作为一个数字支付平台，我们或许可以与 PayPal 相提并论（估计消耗大约 [0.26 TWh/年](https://app.impaakt.com/analyses/paypal-consumed-264100-mwh-of-energy-in-2020-24-from-non-renewable-sources-27261)）。 作为一个娱乐平台，我们或许可以将其与游戏行业进行比较，估计花费约为 [34 TW/年](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)。 Netflix 的能源消耗估计值在[约 0.45TWhr/年](https://s22.q4cdn.com/959853165/files/doc_downloads/2020/02/0220_Netflix_EnvironmentalSocialGovernanceReport_FINAL.pdf)（他们在 2019 年自己报告的估计值）和高达约 94 TWh/年（[Shift Project](https://theshiftproject.org/en/article/unsustainable-use-online-video/) 估计值）之间巨大变化- 在 [Carbon Brief](https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix) 上有一些关于这些估计值的假设的讨论。 或者，可以将以太坊与 Youtube 进行比较，后者估计花费约为 [244 TWh/年](https://thefactsource.com/how-much-electricity-does-youtube-use/)，尽管这些值在很大程度上取决于流式传输视频的设备类型以及数据中心等底层基础设施的能源效率。 YouTube 的能源消耗估算值已按频道和单个视频进行细分。 [这些估计](https://thefactsource.com/how-much-electricity-does-youtube-use/)表明，人们在 2019 年观看《江南 Style》时消耗的能量要比以太坊一年内使用的权益证明所消耗的能量多 45 倍。

## 绿色应用层 {#green-applications}

虽然以太坊的能源消耗非常低，但在以太坊上也有大量、不断增长且高度活跃的**再生金融 (ReFi)** 社区。 再生金融应用使用去中心化金融组件来构建具有积极外部影响，从而使环境受益的金融应用。 再生金融是更广泛的 [“solarpunk”](https://en.wikipedia.org/wiki/Solarpunk) 运动的一部分，该运动与以太坊紧密结合，旨在将技术进步和环境管理结合起来。 以太坊去中心化、无需许可和可组合的特性使其成为再生金融和 solarpunk 社区的理想基础层。 通过这些（以及其他，例如 [DeSci](/desci/)）的发展，以太坊正在成为一种对环境和社会有益的技术。

## 以太坊的碳债务 {#carbon-debt}

以太坊目前的能源消耗非常低，但并非总是如此。 以太坊在 2022 年第三季度开启了其权益证明共识机制。 然而，以太坊在 2014-2022 年间使用了工作量证明机制，这带来了更大的环境成本。

自成立以来，以太坊一直致力于实施权益证明共识机制，但在不牺牲安全性和去中心化的情况下做到这一点需要多年的重点研究和开发。 因此，使用了工作量证明机制来启动网络。 工作量证明共识要求矿工使用他们的计算硬件来解决难题，在这个过程中会消耗能量。 难题的解决证明矿工已消耗了能量，表明他们为添加到区块链的权利投入了现实世界的价值。 以太坊的总能耗在 2022 年 2 月加密牛市的顶峰期间达到峰值，略低于 94 TWh/年。 在转换为权益证明之前的夏天，能源消耗接近 60 TWh/年，与乌兹别克斯坦相当，碳排放量相当于阿塞拜疆（33 MT/年）。

工作量证明和权益证明都只是决定谁可以添加下一个区块的机制。 将工作量证明换成权益证明，其中投资的实际价值来自直接在智能合约中质押的 ETH，因此矿工无需消耗能量即可添加到区块链。 因此，保护网络的环境成本大大降低。

## 为什么权益证明比工作量证明更环保 {#why-pos-is-greener-than-pow}

工作量证明是保护网络的一种可靠方法。 在之前的工作量证明系统下，以太坊区块链上的交易由[矿工](/developers/docs/consensus-mechanisms/pow/mining)验证。 矿工将交易捆绑成有序的区块，并将它们添加到以太坊区块链中。 新区块会传播到所有其他独立运行交易的节点操作者，并验证它们是否有效。 任何不诚实都表现为不同节点之间的不一致。 诚实的区块被添加到区块链中，成为历史不可改变的一部分。 只有存在与采矿相关的成本，以及无法预测哪个特定节点将提交下个区块时，才允许任何矿工添加新区块。 通过实施工作量证明来满足这些条件。 为了有资格提交一个交易块，矿工必须第一个为计算成本高的难题提交解决方案。 为了成功控制区块链，不诚实的矿工必须通过投资足够的硬件和能源来超越大多数其他矿工，从而不断赢得工作量证明竞赛。

出于一些原因，这种网络保护机制存在一定问题。 首先，矿工将通过投资更强大的硬件来增加成功的几率，通过购买越来越耗电的挖矿设备为硬件装备竞赛创造条件。 这增加了网络的能源消耗并产生了硬件浪费。 其次，以太坊的工作量证明协议（在过渡到权益证明之前）的年总耗电量约等于芬兰的<sup>[^1]</sup>，碳足迹与瑞士<sup>[^1]</sup>相似。

权益证明使用验证者替代矿工。 验证者执行的功能与矿工相同，不同之处在于他们没有将资产以能源消耗的形式支出，而是将以太币作为抵押品以防止不诚实行为。 如果验证者行为不端，质押的以太币可能会被销毁，而更恶意的行为会受到更严厉的惩罚。 这强烈激励了积极和诚实的参与来保护网络，而不需要大量的能源消耗。 由于保护工作量证明网络所消耗的几乎所有能量都来自挖矿算法，因此切换到权益证明可以显著降低能源消耗。 在权益证明下投资更强大的硬件也没有任何好处，因此不存在装备竞赛条件，电子废物也更少。 以太坊验证者[可以在典型的笔记本电脑或低功耗设备上运行，例如<0>树莓派](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/user-guide/ethereum2.0.html)。

详细了解[以太坊如何实现权益证明](/developers/docs/consensus-mechanisms/pos)及其与工作量证明的比较。

<InfoBanner emoji=":evergreen_tree:">
  如果您认为这些数据不正确或可以更加精确，请提出问题或拉取请求。 这些是 ethereum.org 团队使用可公开访问的信息和当前以太坊路线图做出的估计。 这些说法并不代表以太坊基金会的正式承诺。 
</InfoBanner>

## 延伸阅读 {#further-reading}

- [举国之力，仅此而已](https://blog.ethereum.org/2021/05/18/country-power-no-more/) - _Carl Beekhuizen，2021 年 5 月 18 日_
- [以太坊的能源消耗](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)
- [以太坊的排放：自下而上的估算](https://kylemcdonald.github.io/ethereum-emissions/) _ Kyle McDonald_
- [以太坊能源消耗指标](https://digiconomist.net/ethereum-energy-consumption/) – _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) — _[@InsideTheSim](https://twitter.com/InsideTheSim)_

## 相关主题 {#related-topics}

- [以太坊愿景](/upgrades/vision/)
- [信标链](/upgrades/beacon-chain)
- [合并](/upgrades/merge/)
- [分片](/upgrades/beacon-chain/)
