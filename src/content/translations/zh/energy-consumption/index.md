---
title: 以太坊能源消耗
description: 了解以太坊能源消耗所需的基本信息。
lang: zh
---

# 以太坊的能源消耗 {#proof-of-stake-energy}

以太坊是一个绿色区块链。 它采用[权益证明](/developers/docs/consensus-mechanisms/pos)共识机制，利用以太币而非[能源来保护以太坊网络](/developers/docs/consensus-mechanisms/pow)。 采用权益证明机制后，以太坊全球网络的年耗电量仅为[大约 0.0026 亿千瓦时](https://carbon-ratings.com/eth-report-2022)。

[CCRI（加密碳评级机构）](https://carbon-ratings.com)已对以太坊网络的电力消耗和碳足迹进行了自下而上的估算（[请查看报告](https://carbon-ratings.com/eth-report-2022)）。 他们测量了各种不同节点的耗电量，这些节点具有各种硬件和客户端软件配置。 得出的结果是，在进行分析时（2022 年 9 月），网络的年耗电量估算值为 **2.601 兆瓦时**（0.0026 亿千瓦时），这相当于 **870 吨二氧化碳当量**的年碳排放量（应用了地区特定碳强度因子）。

<EnergyConsumptionChart />

上图显示了各个行业的估算年能源消耗，以亿千瓦时/年为单位（检索于 2022 年 6 月）。 请注意，图中显示的估算值来自公开来源，下表中有这些来源的链接。 CEBCI 指剑桥比特币耗电量指数。 这些数值仅作说明用途，不代表官方估算值、承诺或预测。

为了更深入地了解以太坊能源消耗，我们可以比较其他行业的年估算值，这让我们能够更好地了解 0.0026 亿千瓦时到底是多还是少。 上图中汇总了这些数据，详细信息见下表：

|                        | 年化能源消耗（亿千瓦时） | 和权益证明以太坊比较 | 来源                                                                                                                                            |
| :--------------------- | :----------------------: | :------------------: | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 黄金开采（最大估算值） |           240            |      92,000 倍       | [来源](https://www.kitco.com/news/2021-05-17/Gold-s-energy-consumption-doubles-that-of-bitcoin-Galaxy-Digital.html)                             |
| 黄金开采（最小估算值） |           130            |      50,000 倍       | [来源](https://ccaf.io/cbeci/index/comparisons)                                                                                                 |
| 比特币（最大估算值）   |           130            |      50,000 倍       | [来源](https://digiconomist.net/bitcoin-energy-consumption)                                                                                     |
| 比特币（最小估算值）   |           100            |      38,000 倍       | [来源](https://ccaf.io/cbeci/index/comparisons)                                                                                                 |
| YouTube                |           244            |      94,000 倍       | [来源](https://thefactsource.com/how-much-electricity-does-youtube-use/)                                                                        |
| 全球数据中心           |           200            |      78,000 倍       | [来源](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                       |
| Netflix（最小估算值）  |           0.45           |        175 倍        | [来源](https://s22.q4cdn.com/959853165/files/doc_downloads/2020/02/0220_Netflix_EnvironmentalSocialGovernanceReport_FINAL.pdf)                  |
| Netflix（最大估算值）  |            94            |      36,000 倍       | [来源](https://theshiftproject.org/en/article/unsustainable-use-online-video/)                                                                  |
| PayPal                 |           0.26           |        100 倍        | [来源](https://app.impaakt.com/analyses/paypal-consumed-264100-mwh-of-energy-in-2020-24-from-non-renewable-sources-27261)                       |
| 美国游戏行业           |            34            |      13,000 倍       | [来源](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential) |
| 工作量证明以太坊       |            78            |      30,000 倍       | [来源](https://digiconomist.net/ethereum-energy-consumption)                                                                                    |
| 权益证明以太坊         |          0.0026          |         1 倍         | [来源](https://carbon-ratings.com/eth-report-2022)                                                                                              |

YouTube 的能源消耗估算值已按频道和单个视频细分。 [这些估算值](https://thefactsource.com/how-much-electricity-does-youtube-use/)表明，2019 年人们在 YouTube 上观看《江南 Style》时消耗的能源要比权益证明以太坊一年使用的能源多出 175 余倍。

获得准确的能源消耗估算值比较复杂，尤其是被衡量对象有着复杂的供应链或部署细节影响效率时。 例如，我们列入了黄金开采能源消耗的最大和最小估算值，这两个估算值相差约 90 亿千瓦时。 Netflix 的能源消耗估算值因信息来源不同而差异巨大。 他们自己报告的估算值比独立机构的估算值小大约 20 倍 - 在 [Carbon Brief](https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix) 上对这种情况的原因进行了一些讨论。 类似地，YouTube 能源消耗估算值大约为 [244 亿千瓦时/年](https://thefactsource.com/how-much-electricity-does-youtube-use/)，尽管能源消耗很大程度上取决于流式传输视频的设备类型以及数据中心等底层基础设施的能源效率。而且这些参数的适当值很难估计，因此存在着很大的不确定性。

上图还将比特币和使用工作量证明时的以太坊进行了比较。 比特币的能源消耗估算值因来源而差异巨大，这个话题引起了很多微妙的[争论](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/)，不仅涉及能源消耗量，还涉及能源来源和相关伦理问题。

许多文章估算了区块链中“每笔交易”的能源消耗。 然而，这种估算可能会产生误导，因为提出和验证一个区块所需的能源与区块中的交易数量无关。 如果以每笔交易为单位计算能源消耗，意味着交易越少能源消耗越少，反之亦然，但事实并非如此。 而且，每笔交易的能源消耗估算值高度依赖于区块链的交易吞吐量是如何定义的，并且可以通过调整这个定义来使估算值看起来更大或更小。

例如，在以太坊上，交易吞吐量不仅是基础层的交易吞吐量，还有所有“[二层网络](/layer-2/)”卷叠的交易吞吐量总和。 二层网络的交易吞吐量总和通常未包含在计算中，但可以解释排序者使用的额外能源（少量）以及他们处理的交易数量（大量）可能会大幅降低每笔交易的能源消耗估算值。 这就是跨平台比较每笔交易的能源消耗可能造成误导的原因之一。

## 以太坊的碳债务 {#carbon-debt}

以太坊目前的能源消耗非常低，但并非总是如此。 以太坊最初采用工作量证明机制，其环境成本远远高于目前的权益证明机制。

创立伊始，以太坊就计划实施权益证明共识机制，但要实施这种共识机制而不牺牲安全性和去中心化，需要多年的重点研究和开发。 因此，我们使用了工作量证明机制启动以太坊网络。 工作量证明机制要求矿工使用计算硬件进行值计算，而这个过程中会消耗能源。 以太坊的总能源消耗在 2022 年 2 月加密牛市最兴旺期间达到峰值，略低于 94 亿千瓦时/年。 在即将过渡到权益证明之前，以太坊能源消耗接近[ 78 亿千瓦时/年](https://digiconomist.net/ethereum-energy-consumption)，与乌兹别克斯坦相当，碳排放量和阿塞拜疆不相上下（33 兆吨/年）。

![以太坊合并前后能源消耗比较。 左边是 330 米高的埃菲尔铁塔，右边是放大镜下 4 厘米高的塑料玩具人偶。](energy_consumption_pre_post_merge.png)

加密碳评级机构研究了以太坊从工作量证明转为权益证明所产生的影响。 年化耗电量减少了 **99.988 %** 以上。 同样，以太坊的碳足迹减少了大约 **99.992 %**（从 11,016,000 吨减少到 870 吨二氧化碳当量）。 打个比方，这相当于排放量从埃菲尔铁塔的高度减少到小塑料玩具人偶的身高，如上图所示。 因此，保护网络的环境成本大大降低。 同时，人们也认为以太坊网络的安全性得到了加强。

## 绿色应用层 {#green-applications}

以太坊的能源消耗非常低，与此同时，以太坊上也出现了大量、不断增长且高度活跃的**再生金融 (ReFi)** 社区。 再生金融应用程序使用去中心化金融组件来构建具有积极外部影响，从而使环境受益的金融应用程序。 再生金融是更广泛的[“solarpunk”](https://en.wikipedia.org/wiki/Solarpunk)运动的一部分，这项运动与以太坊高度契合，旨在将技术进步和环境管理结合起来。 以太坊具有去中心化、无需许可和可组合的特性，这使其成为再生金融和 solarpunk 社区的理想基础层。

Web3 原生公共物品融资平台，如 [Gitcoin](https://gitcoin.co) 就运行气候轮，从而推动以太坊应用层上的环境意识建设。 通过这些（以及其他，例如[去中心化科学](/desci/)）倡议的开发，以太坊正在成为一项对环境和社会有益的技术。

<InfoBanner emoji=":evergreen_tree:">
  如果你认为本页尚有可改进之处，请提出问题或拉取请求。 本页面上的统计数据是基于公开数据的估算值 - 它们不代表 ethereum.org 团队或以太坊基金会的官方声明或承诺。 
</InfoBanner>

## 延伸阅读 {#further-reading}

- [白宫关于工作量证明区块链的报告](https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [以太坊的能源消耗](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)
- [以太坊的排放：自下而上的估算](https://kylemcdonald.github.io/ethereum-emissions/) _ Kyle McDonald_
- [以太坊能源消耗指标](https://digiconomist.net/ethereum-energy-consumption/) – _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) — _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [合并 - 对以太坊网络电力消耗和碳足迹的影响](https://carbon-ratings.com/eth-report-2022) - _CCRI_。

## 相关主题 {#related-topics}

- [以太坊愿景](/roadmap/vision/)
- [信标链](/upgrades/beacon-chain)
- [合并](/upgrades/merge/)
- [分片](/upgrades/beacon-chain/)
