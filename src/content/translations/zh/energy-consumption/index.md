---
title: 以太坊能源消耗
description: 了解以太坊能源消耗所需的基本信息。
lang: zh
---

# 以太坊的能源消耗 {#proof-of-stake-energy}

以太坊是一个绿色区块链。 以太坊的[权益证明](/developers/docs/consensus-mechanisms/pos)共识机制，使用以太币而不是[能源](/developers/docs/consensus-mechanisms/pow)来保护网络安全。 整个以太坊全球网络的能源消耗约为 [0.0026 亿千瓦时/年](https://carbon-ratings.com/eth-report-2022)。

以太坊的能耗估算值来自[加密碳评级机构 (CCRI)](https://carbon-ratings.com) 的一项研究。 该机构对以太坊的耗电量与碳足迹进行了自下而上的估算（[查看报告](https://carbon-ratings.com/eth-report-2022)）。 他们测量了具有各种硬件和客户端软件配置的各种不同节点的耗电量。 以太坊网络的年耗电量估算值为 **2,601 兆瓦时**（0.0026 亿千瓦时），相当于应用了区域特定碳强度因子的 **870 吨二氧化碳当量**的年碳排放量。 该估算值随节点加入和退出网络变化 - 可通过使用[剑桥区块链网络可持续性指数](https://ccaf.io/cbnsi/ethereum)提供的连续 7 天的平均估算值进行跟踪（请注意他们使用的估算方式略有不同 - 详细信息请参见其网站）。

为全面了解以太坊的能源消耗，我们可以比较某些其他行业的能源消耗年化估算值。 这将有助于我们更好地理解以太坊能源消耗估算值是高还是低。

<EnergyConsumptionChart />

上面的图表显示了以太坊和其他一些行业的年化能源消耗估算值，单位为亿千瓦时/年。 所有估算值均来自可在 2023 年 5 月获取的公开信息，下表列出了数据来源的链接：

|                        | 年化能源消耗（亿千瓦时） | 和权益证明以太坊比较 | 来源                                                                                                                                                                            |
| :--------------------- | :----------------------: | :------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 全球数据中心           |           200            |      77,000 倍       | [来源](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                                                       |
| 黄金开采（最小估算值） |           131            |      50,000 倍       | [来源](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                                                                                 |
| 比特币（最大估算值）   |           131            |      50,000 倍       | [来源](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                                                                                 |
| 工作量证明以太坊       |            78            |      30,000 倍       | [来源](https://digiconomist.net/ethereum-energy-consumption)                                                                                                                    |
| YouTube（仅直接能耗）  |            12            |       4600 倍        | [来源](https://www.gstatic.com/gumdrop/sustainability/google-2020-environmental-report.pdf)                                                                                     |
| 美国游戏行业           |            34            |      13,000 倍       | [来源](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                                 |
| Netflix（最小估算值）  |          0.451           |        173 倍        | [来源](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal                 |           0.26           |        100 倍        | [来源](https://app.impaakt.com/analyses/paypal-consumed-264100-mwh-of-energy-in-2020-24-from-non-renewable-sources-27261)                                                       |
| AirBnB                 |           0.02           |         8 倍         | [来源](<https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf>)                                                           |
| 权益证明以太坊         |          0.0026          |         1 倍         | [来源](https://carbon-ratings.com/eth-report-2022)                                                                                                                              |

准确估算能源消耗比较复杂，尤其是当衡量对象有着复杂的供应链或部署细节且影响到其效率时。 以 Netflix 或者 Youtube 为例。 他们的能源消耗估算存在差异，取决于他们是只包括用于维护系统和向用户交付内容的能耗（_直接能耗_），还是也包括制作内容、运营公司、投放广告等方面所需的能耗（_间接能耗_）。 间接能耗还可能包括在电视、电脑和移动设备等终端用户设备上观看内容所需的能源，而这些能耗又取决于使用的设备。

[Carbon Brief](https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix) 上有一些针对该问题的讨论。 在上表中，报告的 Netflix 估算值包括他们自己报告的*直接*和*间接*能耗。 Youtube 只提供了其*直接*能耗的估算值，大约为 [12 亿千瓦时/年](https://www.gstatic.com/gumdrop/sustainability/google-2020-environmental-report.pdf)。

上面的表格与图表还包括与比特币及工作量证明以太坊的对比。 需要注意的是，工作量证明网络的能耗并不是静态的，它每天都在变化。 工作量证明以太坊的估算值是即将[合并](/roadmap/merge/)为权益证明网络之前的数值，是由 [Digiconomist](https://digiconomist.net/ethereum-energy-consumption) 预测的。 其他来源，如[剑桥区块链网络可持续发展指数](https://ccaf.io/cbnsi/ethereum/1)估计其能源消耗要低得多（接近 20 亿千瓦时/年）。 比特币的能源消耗估算在各个来源之间也存在很大差异，这一话题引发了许多大同小异的[争论](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/)，涉及到的不仅仅是消耗的能源数量，还包括能源来源和相关伦理问题。 能源消耗不一定与环境足迹精确对应，因为不同的项目可能使用不同的能源，例如更小或更大比例的可再生能源。 例如，[剑桥比特币耗电量指数](https://ccaf.io/cbnsi/cbeci/comparisons)指出，理论上讲，天然气燃除或在输配电过程中损失的电力就可以满足比特币网络的能源需求。 以太坊的可持续性路线是用一种环保替代方案取代比特币网络中的高能耗部分。

可以在[剑桥区块链网络可持续性指数网站](https://ccaf.io/cbnsi/ethereum)上查看多个不同行业的能源消耗和一氧化碳排放估算值。

## 每笔交易的能耗估算值 {#per-transaction-estimates}

许多文章估算了区块链中“每笔交易”的能源消耗。 然而，这种估算可能会产生误导，因为提出和验证区块所需的能源与区块中的交易数量无关。 如果以每笔交易为单位计算能源消耗，意味着交易越少能源消耗越少，反之亦然，但事实并非如此。 而且，每笔交易的能源消耗估算值高度依赖于区块链的交易吞吐量是如何定义的，并且可以通过调整这个定义来使估算值看起来更大或更小。

例如，在以太坊上，交易吞吐量不仅是基础层的交易吞吐量，还包括所有“[二层网络](/layer-2/)”卷叠的交易吞吐量总和。 二层网络的交易吞吐量总和通常未包含在计算中，但可以解释排序者使用的额外能源（少量）以及他们处理的交易数量（大量）可能会大幅降低每笔交易的能源消耗估算值。 这就是跨平台比较每笔交易的能源消耗可能造成误导的原因之一。

## 以太坊的碳债务 {#carbon-debt}

以太坊目前的能源消耗非常低，但并非总是如此。 以太坊最初采用工作量证明机制，其环境成本远远高于目前的权益证明机制。

创立伊始，以太坊就计划实施权益证明共识机制，但要实施这种共识机制而不牺牲安全性和去中心化，需要多年的重点研究和开发。 因此，使用了工作量证明机制来启动网络。 工作量证明机制要求矿工使用计算硬件进行值计算，而这个过程中会消耗能源。

![合并前后以太坊能源消耗比较，左侧 330 米高的埃菲尔铁塔表示以太坊合并前的高能耗，右侧 4 厘米高的乐高小人代表以太坊合并后大幅降低的能耗](energy_consumption_pre_post_merge.png)

CCRI 估计，以太坊的年化耗电量会因合并减少 **99.988% ** 以上。 同样，以太坊的碳足迹减少了大约 **99.992%**（二氧化碳当量从 11,016,000 吨减少到 870 吨）。 比较而言，排放减少量就如同从埃菲尔铁塔的高度下降到小塑料玩偶一般巨大，如上图所示。 因此，保护网络的环境成本大大降低。 同时，据信网络安全也得到改善。

## 绿色应用程序层 {#green-applications}

尽管以太坊的能源消耗非常低，但以太坊上也出现了大量不断增长且高度活跃的[**再生金融 (ReFi)**](/refi/) 社区。 再生金融应用程序使用去中心化金融组件来构建具有积极外部影响，从而使环境受益的金融应用程序。 再生金融是更广泛的[“太阳朋克”](https://en.wikipedia.org/wiki/Solarpunk)运动的一部分，这项运动与以太坊高度契合，旨在将技术进步和环境管理结合起来。 以太坊具有去中心化、无需许可和可组合的特性，这使其成为再生金融和太阳朋克社区的理想基础层。

Web3 原生公共物品融资平台，如 [Gitcoin](https://gitcoin.co) 举行气候进程，推动在以太坊应用程序层上形成环境意识。 通过制定这些计划（以及其他，例如[去中心化科研](/desci/)），以太坊正在成为一项对环境和社会有益的技术。

<InfoBanner emoji=":evergreen_tree:">
  如果你认为本页尚有可改进之处，请提出问题或拉取请求。 本页面上的统计数据是基于公开数据的估算值 - 它们不代表 ethereum.org 团队或以太坊基金会的官方声明或承诺。
</InfoBanner>

## 延伸阅读 {#further-reading}

- [剑桥区块链网络可持续性指数](https://ccaf.io/cbnsi/ethereum)
- [白宫关于工作量证明区块链的报告](https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [以太坊排放量：一种自下而上的估算方法](https://kylemcdonald.github.io/ethereum-emissions/) - _Kyle McDonald_
- [以太坊能源消耗指数](https://digiconomist.net/ethereum-energy-consumption/) - _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) - _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [合并 - 对以太坊网络电力消耗和碳足迹的影响](https://carbon-ratings.com/eth-report-2022) - _CCRI_。
- [以太坊的能源消耗](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## 相关主题 {#related-topics}

- [以太坊愿景](/roadmap/vision/)
- [信标链](/roadmap/beacon-chain)
- [合并](/roadmap/merge/)
