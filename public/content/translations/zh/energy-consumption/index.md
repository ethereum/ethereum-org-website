---
title: 以太坊的能源消耗
metaTitle: 以太坊能源消耗
description: 了解以太坊能源消耗所需的基本信息。
lang: zh
---

[以太坊](/)是一个绿色的区块链。以太坊的[权益证明 (PoS)](/developers/docs/consensus-mechanisms/pos)共识机制使用 ETH 而不是[能源来保护网络](/developers/docs/consensus-mechanisms/pow)。以太坊整个全球网络的能源消耗约为[每年 0.0026 太瓦时 (TWh)](https://carbon-ratings.com/eth-report-2022)。

以太坊的能源消耗估算来自 [CCRI（加密货币碳评级机构）](https://carbon-ratings.com)的一项研究。他们自下而上地估算了以太坊网络的电力消耗和碳足迹（[查看报告](https://carbon-ratings.com/eth-report-2022)）。他们测量了具有各种硬件和客户端软件配置的不同节点的电力消耗。应用特定地区的碳强度系数，该网络年电力消耗的估算值 **2,601 兆瓦时 (MWh)**（0.0026 太瓦时）相当于每年 **870 吨二氧化碳当量 (CO2e)** 的碳排放量。这个数值会随着节点加入和离开网络而变化——你可以使用[剑桥区块链网络可持续性指数](https://ccaf.io/cbnsi/ethereum)的 7 天滚动平均估算值来进行跟踪（请注意，他们使用的估算方法略有不同——详情见其网站）。

为了将以太坊的能源消耗置于具体背景中，我们可以比较其他一些产品和行业的年化估算值。这有助于我们更好地了解以太坊的估算值是高还是低。

<EnergyConsumptionChart />

上图显示了以太坊的估算能源消耗（太瓦时/年），并与其他几种产品和行业进行了比较。提供的估算值来源于 2023 年 7 月获取的公开信息，下表中提供了来源链接。

|                     | 年化能源消耗 (TWh) | 与 PoS 以太坊的比较 |                                                                                      来源                                                                                       |
| :------------------ | :---------------------------------: | :------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| 全球数据中心 |                 190                 |          73,000x           |                                    [来源](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                    |
| 比特币             |                 149                 |          53,000x           |                                                                 [来源](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| 黄金开采         |                 131                 |          50,000x           |                                                                 [来源](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| 美国游戏产业\*     |                 34                  |          13,000x           |                 [来源](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                 |
| PoW 以太坊        |                 21                  |           8,100x           |                                                                    [来源](https://ccaf.io/cbnsi/ethereum/1)                                                                     |
| 谷歌              |                 19                  |           7,300x           |                                           [来源](https://www.gstatic.com/gumdrop/sustainability/google-2022-environmental-report.pdf)                                           |
| 网飞             |                0.457                |            176x            | [来源](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| 贝宝              |                0.26                 |            100x            |                                 [来源](<https://s202.q4cdn.com/805890769/files/doc_downloads/global-impact/CDP_Climate_Change_PayPal-(1).pdf>)                                  |
| 爱彼迎              |                0.02                 |             8x             |                              [来源](<https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf>)                              |
| **PoS 以太坊**    |             **0.0026**              |           **1x**           |                                                               [来源](https://carbon-ratings.com/eth-report-2022)                                                                |

\*包括个人电脑、笔记本电脑和游戏机等终端用户设备。

获得准确的能源消耗估算值非常复杂，特别是当被测量的对象具有复杂的供应链或影响其效率的部署细节时。例如，网飞和谷歌的能源消耗估算值会有所不同，这取决于它们是仅包括用于维护其系统和向用户交付内容的能源（*直接消耗*），还是包括制作内容、运营公司办公室、做广告等所需的消耗（*间接消耗*）。间接消耗还可能包括在电视、电脑和手机等终端用户设备上消费内容所需的能源。

上述估算值并非完美的比较。计算在内的间接消耗量因来源而异，并且很少包括来自终端用户设备的能源。每个底层来源都包含有关测量内容的更多细节。

上方的表格和图表还包括与比特币和工作量证明 (PoW) 以太坊的比较。需要注意的是，工作量证明网络的能源消耗不是静态的，而是每天都在变化。不同来源的估算值也可能差异很大。这个话题引发了细致入微的[辩论](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/)，不仅涉及消耗的能源量，还涉及这些能源的来源以及相关的伦理问题。能源消耗并不一定精确对应于环境足迹，因为不同的项目可能使用不同的能源，包括比例不等的各种可再生能源。例如，[剑桥比特币电力消耗指数](https://ccaf.io/cbnsi/cbeci/comparisons)表明，比特币网络的需求理论上可以由天然气燃烧或在输配电过程中原本会损失的电力来提供。以太坊实现可持续发展的途径是用绿色替代方案取代网络中耗能的部分。

你可以在[剑桥区块链网络可持续性指数网站](https://ccaf.io/cbnsi/ethereum)上浏览许多行业的能源消耗和碳排放估算值。

## 单笔交易估算 {#per-transaction-estimates}

许多文章估算了区块链的“单笔交易”能源消耗。这可能会产生误导，因为提议和验证一个区块所需的能源与其中的交易数量无关。单笔交易的能源消耗单位意味着较少的交易会导致较小的能源消耗，反之亦然，但事实并非如此。此外，单笔交易的估算对区块链交易吞吐量的定义非常敏感，调整这个定义可能会被用来操纵数据，使数值看起来更大或更小。

例如，在以太坊上，交易吞吐量不仅是基础层的吞吐量，它还是其所有“[二层网络 (l2)](/layer-2/)”汇总 (Rollup) 交易吞吐量的总和。二层网络 (l2) 通常不包含在计算中，但如果考虑到排序器消耗的额外能源（很少）以及它们处理的交易数量（很多），可能会大幅降低单笔交易的估算值。这就是为什么跨平台比较单笔交易能源消耗可能会产生误导的原因之一。

## 以太坊的碳债务 {#carbon-debt}

以太坊的能源消耗非常低，但情况并非总是如此。以太坊最初使用的是工作量证明 (PoW)，其环境成本比当前的权益证明 (PoS) 机制要大得多。

从一开始，以太坊就计划实施基于权益证明的共识机制，但在不牺牲安全性和去中心化的前提下做到这一点，需要多年的专注研发。因此，最初使用了工作量证明机制来启动网络。工作量证明要求矿工使用他们的计算硬件来计算一个值，在此过程中会消耗能源。

![Comparing Ethereum's energy consumption pre- and post-Merge, using the Eiffel Tower (330 meters tall) on the left to symbolize the high energy consumption before The Merge, and a small 4 cm tall Lego figure on the right to represent the dramatic reduction in energy usage after The Merge](energy_consumption_pre_post_merge.png)

CCRI 估计，合并 (The Merge) 使以太坊的年化电力消耗减少了 **99.988%** 以上。同样，以太坊的碳足迹减少了约 **99.992%**（从 11,016,000 吨降至 870 吨二氧化碳当量）。客观地看，这种排放量的减少就像从埃菲尔铁塔的高度缩小到一个小塑料玩具人偶，如上图所示。因此，保护网络安全的环境成本大幅降低。同时，网络的安全性也被认为得到了提高。

## 绿色的应用层 {#green-applications}

虽然以太坊的能源消耗非常低，但在以太坊上也有一个庞大、不断增长且高度活跃的[**再生金融 (ReFi)**](/refi/)社区在进行建设。再生金融 (ReFi) 应用程序使用去中心化金融 (DeFi) 组件来构建具有造福环境的正外部性的金融应用程序。ReFi 是更广泛的[“太阳朋克 (solarpunk)”](https://en.wikipedia.org/wiki/Solarpunk)运动的一部分，该运动与以太坊密切相关，旨在将技术进步与环境管理结合起来。以太坊去中心化、无需许可和可组合的特性使其成为 ReFi 和太阳朋克社区理想的基础层。

Web3 原生公共物品融资平台（如 [Gitcoin](https://gitcoin.co)）开展气候轮融资，以刺激在以太坊应用层上进行具有环保意识的建设。通过这些倡议（以及其他倡议，例如[去中心化科学 (DeSci)](/desci/)）的发展，以太坊正在成为一种在环境和社会方面产生净正面影响的技术。

<Alert variant="update">
<AlertEmoji text=":evergreen_tree:" />
<AlertContent>
<AlertDescription>
  如果你认为此页面可以更准确，请提交 issue 或 PR。此页面上的统计数据是基于公开数据的估算值——它们不代表 ethereum.org 团队或以太坊基金会的官方声明或承诺。
</AlertDescription>
</AlertContent>
</Alert>

## 延伸阅读 {#further-reading}

- [剑桥区块链网络可持续性指数](https://ccaf.io/cbnsi/ethereum)
- [白宫关于工作量证明区块链的报告](https://web.archive.org/web/20221109005700/https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [以太坊排放量：自下而上的估算](https://kylemcdonald.github.io/ethereum-emissions/) - _Kyle McDonald_
- [以太坊能源消耗指数](https://digiconomist.net/ethereum-energy-consumption/) - _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) - _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [合并——对以太坊网络电力消耗和碳足迹的影响](https://carbon-ratings.com/eth-report-2022) - _CCRI_
- [以太坊的能源消耗](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## 相关主题 {#related-topics}

- [信标链](/roadmap/beacon-chain)
- [合并](/roadmap/merge/)