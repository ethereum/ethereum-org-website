---
title: 以太坊能源消耗
description: 你需要了解以太坊能源消耗的基本信息
lang: zh
sidebar: true
---

# 以太坊的能源消耗 {#introduction}

根据[工作量证明](/developers/docs/consensus-mechanisms/#proof-of-work)，以太坊当前的能源消耗太高，且不具可持续性。 在不牺牲安全和去中心化的情况下解决能源消耗问题是一项重大的技术挑战，多年来一直是研究和开发的重点。 让我们探索为什么构建以太坊会对环境产生很大的影响，以及网络即将升级为[权益证明](/developers/docs/consensus-mechanisms/pos)会如何有效地改变这一点。

## 能源保障网络 {#energy-secures-the-network}

以太坊区块链上的交易由[矿工](/developers/docs/consensus-mechanisms/pow/mining)进行验证。 矿工将交易捆绑在一起形成有序区块，并将它们添加到以太坊区块链中。 新区块会传播到所有其他独立管理交易的节点操作者，并验证它们是否有效。 任何不真实之处都会显示出不同节点之间的不一致。 最真实区块被添加到区块链，成为历史上不可或缺的一部分。

只有存在于采矿相关的成本，以及无法预测哪个特定节点将提交下个区块时，才允许任何矿工添加新区块。 为了满足这些条件，必须出示工作量证明。 要有资格提交交易区块，矿工必须比任何其他矿工更快地解决任意的计算难题。 解决此问题会使矿工之间产生竞争，并导致能源消耗成本。 要成功地欺骗区块链，不诚实的矿工就必须始终如一地赢得工作量证明竞赛，这很不可能实现，同时也很昂贵。

以太坊自创世块以来就一直使用工作量证明。 从工作量证明转为权益证明一直是以太坊的一项基本目标。 然而，开发一个符合以太坊安全性和去中心化核心原则的权益证明系统并非易事。 需要在密码学、密码经济学和机制设计方面进行大量研究和突破，才能实现转换。

## 工作量证明能源消耗 {#proof-of-work}

工作量证明是保护网络和对区块链强制实施真实更改的可靠方法，但由于一些原因，这种方法也存在问题。 由于开采区块的权利需要解决任意计算难题，矿工可以通过投资更强大的硬件来增加成功的几率。 这些诱因导致了矿工间的装备竞争，他们会购买越来越多耗电的采矿设备。 以太坊的工作量证明协议目前的年化功耗总量大约等于芬兰的年化功耗总量<sup>[^1]</sup>，而其碳足迹则与瑞士相似<sup>[^1]</sup>。

## 权益证明 {#proof-of-stake}

正在以 [**权益证明 (PoS)** 链](/upgrades/beacon-chain/)的形式为以太坊打造一个更加绿色的未来。 在[权益证明](/developers/docs/consensus-mechanisms/pos/)下，无需解决任意问题。 无需解决问题大大减少了保障网络安全所需的能源消耗。 矿工被执行相同功能的验证者所取代，区别在于他们没有以计算工作的形式预先花费他们的资产，而是将以太币作为抵押品来防止不诚实的行为。 如果验证者较为懒惰（在应该履行某些验证者职责时离线），他们质押的以太币可能会慢慢流失，而可证明的不诚实行为会导致质押资产遭受“惩罚”。 这有力地鼓励人们积极和诚实地参与到保障网络安全中。

类似于工作量证明，一个恶意实体将至少需要网络中以太币质押总量的 51% 来执行 [51% 攻击](/glossary/#51-attack)。 然而，使用工作量证明时，失败攻击的潜在损失仅仅是产生采矿所需哈希值的成本，而与之不同的是，使用权益证明时，攻击可能造成的损失是作为抵押品的全部以太币。 这种阻碍结构允许通过权益证明实现网络安全，同时消除了在任意计算上消耗能量的需要。 权益证明下的详细网络安全说明可在[这里](/developers/docs/consensus-mechanisms/pos/)和[这里](https://vitalik.ca/general/2017/12/31/pos_faq.html)找到。

## 合并 {#the-merge}

有一个名为[信标链](/upgrades/beacon-chain/)的功能性权益证明链自 2020 年 12 月以来一直在运行，该证明链展示了权益证明协议的可行性。 合并是指以太坊抛弃工作量证明，转而全面采用权益证明的时间点。 合并预计在 2022 年第 2/3 季度进行。 [关于合并的更多信息](/upgrades/merge/)。

## 权益证明能源消耗 {#proof-of-stake-energy}

除了建立对权益证明机制的信心外，信标链还使人们能够估计出以太坊在合并后的能源使用情况。 [最近的估计](https://blog.ethereum.org/2021/05/18/country-power-no-more/)表明，合并为权益证明可能会导致能源使用总量减少 99.5%，因为权益证明的能效比工作量证明高约 2000x。 以太坊的能源消耗大致相当于网络上每个节点运行家用计算机的费用。

![图片](energy_use_per_transaction.png)

<p style="text-align: center;"><small><i>根据 <a href="https://blog.ethereum.org/2021/05/18/country-power-no-more/" target="_blank" rel="noopener noreferrer">2021 年 5 月数据</a>图表中所用的 tx 估计工作量证明能耗，在撰写本文时，该来源建议能耗不超过 <a href="https://digiconomist.net/ethereum-energy-consumption" target="_blank" rel="noopener noreferrer">175.56 Kwh</a></i></small></p>

我们将这些数据与 Visa 等服务进行比较。 100,000 次 Visa 交易使用的能量为 149kWh<sup>[^2]</sup>。 假设已实施区块分片，以太坊当前的交易率（每秒 15 笔交易）将至少增加 64 倍（分片数量），不考虑汇总的额外优化。 对于分片后带汇总的以太坊，合并后的真实估计值为 [25,000 - 100,000](https://twitter.com/VitalikButerin/status/1312905884549300224?s=20) 次交易。 我们可以利用这一信息估计每 100,000 笔交易的最高和最低能源消耗。

- 每秒 25,000 笔交易。
- 完成 100,000 笔交易需要 `100,000 / 25,000 = 4` 秒。

我们还可以估算以太坊每秒钟的能源消耗，保守估计有 10,000 个活跃验证者正在保护网络（[信标链上有超过 250,000 名验证者](https://beaconscan.com/)，但许多验证者可以在单个节点上操作。 目前估计有 3,000-4,000 个节点，所以 10,000 个是合并后的保守估计）：

`1.44kWh 的每日用量 * 10,000 个网络节点 = 14,400kWh`/天。 每天有 86,400 秒，所以 `14,400/86,400=0.1666667 千瓦时`/秒。

如果我们将其乘以处理 100,000 次交易所需的时间：`0.1667 * 4 = 17.366666701 千瓦时`

这是 Visa 相同数量交易所用能耗的大约 0.4%，或者与以太坊当前的工作量证明网络相比，能源消耗减少为原来的约 1/225。

如果按照每秒最大交易次数重复计算，得出平均每秒消耗能量 0.1667 kWh，约为 Visa 能源消耗的 0.1%，或减少至其 1/894。

_注意：根据交易数量进行比较并不完全准确，因为以太坊的能源使用是以时间为基础的。 无论进行 1 次交易还是 1,000 次交易，以太坊的能源使用量在 1 分钟内都是相同的。_

_我们还必须要考虑到，以太坊不仅限于简单的金融交易，它还是一个为智能合约和去中心化应用程序构建的完整平台。_

## 更加绿色节能的以太坊 {#green-ethereum}

虽然从历史上看，以太坊的能源消耗一直很大，但开发人员在时间和能力上进行了大量的投资，从耗能区块验证转换为节能区块验证。 据 [Bankless](http://podcast.banklesshq.com/) 称，减少工作量证明能源消耗的最好办法就是简单地“关闭它”，这是以太坊承诺采取的办法。

<InfoBanner emoji=":evergreen_tree:">
  如果您认为这些数据不正确或可以更加精确，请提出问题或拉取请求。 这些是 ethereum.org 团队使用可公开访问的信息和当前以太坊路线图做出的估计。 这些说法并不代表以太坊基金会的正式承诺。 
</InfoBanner>

## 延伸阅读 {#further-reading}

- [举国之力，仅此而已](https://blog.ethereum.org/2021/05/18/country-power-no-more/)- _Carl Beekhuizen，2021 年 5 月 18 日_
- [以太坊的能源消耗](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)
- [以太坊排放：一种自下而上的估算方法](https://kylemcdonald.github.io/ethereum-emissions/) _ Kyle McDonald_
- [以太坊能源消耗指数](https://digiconomist.net/ethereum-energy-consumption/) – _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) — _[@InsideTheSim](https://twitter.com/InsideTheSim)_

## 相关主题 {#related-topics}

- [以太坊愿景](/upgrades/vision/)
- [信标链](/upgrades/beacon-chain)
- [合并](/upgrades/merge/)
- [区块分片](/upgrades/beacon-chain/)

### 脚注和来源 {#footnotes-and-sources}

#### 1. 以太坊工作量证明能源消耗 {#fn-1}

[按国家企业划分的能源消耗量。 以太坊（年化太瓦时）](https://digiconomist.net/ethereum-energy-consumption)

#### 2. Visa 能耗 {#fn-2}

[截至 2020 年，与 VISA 网络相比，比特币网络每笔交易的平均能耗，Statista](https://www.statista.com/statistics/881541/bitcoin-energy-consumption-transaction-comparison-visa/)

[Visa 2020 年第四季度财务报告](https://s1.q4cdn.com/050606653/files/doc_financials/2020/q4/Visa-Inc.-Q4-2020-Operational-Performance-Data.pdf)
