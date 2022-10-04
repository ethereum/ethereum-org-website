---
title: Gas 和费用
description:
lang: zh
---

Gas 对以太坊网络至关重要。 正是这种燃料使它能够运行，正如车辆需要汽油一样。

## 前置要求 {#prerequisites}

为了更好地理解此页面，推荐先阅读[交易](/developers/docs/transactions/)和 [EVM](/developers/docs/evm/)。

## 什么是 Gas？ {#what-is-gas}

Gas 是指在以太坊网络上执行特定操作所需的计算工作量。

由于每笔以太坊交易都需要计算资源才能执行，每笔交易都需要付费。 在这个方面上，Gas 是指在以太坊成功进行交易所需的费用。

![显示 EVM 操作所需 Gas 的图表](./gas.png) _图表来自 [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

本质上，Gas 费用是以太坊的货币以太 (ETH) 支付的。 Gas 价格以 Gwei 标明，Gwei 本身就是 ETH 的一个单位――每个 Gwei 等于 0.000000001 ETH (10<sup>-9</sup> ETH)。 例如，您可以说您的 Gas 成本为 1 Gwei，而不是说您的 Gas 成本为 0.000000001 以太。 “gwei”一词本身表示“giga-wei”，等于 1,000,000,000 wei。 Wei 本身（以 [b-money](https://www.investopedia.com/terms/b/bmoney.asp) 的发明者 [Wei Dai](https://wikipedia.org/wiki/Wei_Dai) 命名）是 ETH 中最小的单位。

## 伦敦升级之前 {#pre-london}

以太坊网络交易费的计算方式在 2021 年 8 月的[伦敦升级](/history/#london)后发生了改变。 以下回顾了过去的工作方式：

假设 Alice 需要支付 1 ETH 给 Bob。 在交易中，gas 限额为 21,000 单位，gas 的价格是 200 gwei。

总费用为:`Gas 单位（限额） * Gas 单价` 例如 `21,000 * 200 = 4,200,000 gwei` 或者 0.0042 ETH

当 Alice 汇款时，将从 Alice 账户中扣除 1.0042 ETH。 Bob 将获得 1.0000 ETH。 矿工将得到 0.0042 ETH。

这个视频简要概述了 Gas 及其存在原因：

<YouTube id="AJvzNICwcwc" />

## 伦敦升级之后 {#post-london}

[伦敦升级](/history/#london) 于 2021 年 8 月 5 日 实施，目的是通过彻底改造以太坊的交易费用机制，使用户更容易预测以太坊的交易费用。 这一升级带来的更高一层的收益包括更好地估算交易费，通常会加快纳入交易，并通过燃烧一定比例的交易费来抵消 ETH 的发行。

从伦敦网络升级开始，每个区块都有基本费用，由网络根据区块空间需求来计算每单位 gas 最低价格。 由于交易费的基本费用会被燃烧掉，因此用户还要在其交易中设定一个小费（优先费）。 小费用于满足矿工执行和广播包含用户交易的区块，预计将由大多数钱包自动设置。

交易总费用的计算用如下所示：`Gas 单位（限额）*（基本费用 + 小费）`

假设 Jordan 需要向 Taylor 支付 1 ETH。 在交易中，矿工报酬限额为 21,000 单位，基本费用的价格是 100 gwei。 Jordan 支付了 10 gwei 作为小费。

使用上面的公式，我们可以计算 `21,000 * (100 + 10) = 2,310,000 gwei` 或 0.00231 ETH。

当 Jordan 发送钱时，将从 Jordan 账户中扣除 1.00231 ETH。 Taylor 将获得 1.0000 ETH。 矿工得到 0.00021 ETH。 0.0021 ETH 的基本费用被燃烧。

此外，Jordan 还可以为交易设定最高费用 (`maxFeePergas`)。 最高费用与实际收费之间的差额将归还给 Jordan。如：`退款 = 最高费用 -（基本费用 + 优先费）`。 Jordan 可以为执行交易费用设定一个最高金额，而不必担心在执行交易时“超额”支付基本费用。

### 区块大小 {#block-size}

在伦敦升级之前，以太坊有固定大小的区块。 在网络需求很高的时期，这些区块满负荷运行。 因此，用户常常不得不等待大量需求减少后才能被列入一个区块，这导致用户体验很差。

伦敦升级在以太坊中引入了大小可变区块。 每个区块的目标大小为 1500 万 gas，但区块的大小将根据网络需求增减。因此区块限制最多不超过 3000 万 gas（目标区块大小的 2 倍）。 该协议通过 _tâtonnement_ 的过程使区块大小平均达到 1,500 万。 这意味着如果区块大小超出目标区块大小，协议将增加以下区块的基本费用。 同样，如果区块大小低于目标区块大小，协议将减少基本费用。 基本费用的调整金额与当前区块大小和目标区块大小的差距成比例。 [关于区块的更多信息](/developers/docs/blocks/)。

### 基本费用 {#base-fee}

每个区块都有作为储备价格的基本费用。 要想有资格被列入区块，gas 费用报价必须至少等于基本费用。 基本费用独立于当前区块计算，是由区块之前的区块决定的，这使得用户更容易预测交易费用。 当区块被开采时，此基本费用将被“燃烧掉”，从循环中移除。

基本费用的计算公式是将上一个区块的大小（所有交易中使用的 gas 数量）与目标大小进行比较。 如果超过目标区块大小，区块的基本费用将最多增加 12.5%。 这种指数级增长使得区块大小无限期保持高位在经济上不可行。

| 区块编号 | 已包含 Gas | 费用增加 | 当前基本费用 |
| -------- | ---------: | -------: | -----------: |
| 1        |        15M |       0% |     100 gwei |
| 2        |        30M |       0% |     100 gwei |
| 3        |        30M |    12.5% |   112.5 gwei |
| 4        |        30M |    12.5% |   126.6 gwei |
| 5        |        30M |    12.5% |   142.4 gwei |
| 6        |        30M |    12.5% |   160.2 gwei |
| 7        |        30M |    12.5% |   180.2 gwei |
| 8        |        30M |    12.5% |   202.7 gwei |

相对于伦敦升级之前的 gas 拍卖市场，这种交易费机制的变化使费用更容易预测。 根据以上表格，在 9 号区块创建交易，钱包会让用户确切了解，要添加到下一个区块的**最大基本费用**等于`当前基本费用 * 112.5%`，即 `202.8 gwei * 112.5% = 228.1 gwei`。

还请注意，由于处理完整块的基本费用增加的速度，我们不太可能看到完整块的延长峰值。

| 区块编号 | 已包含 Gas | 费用增加 |    当前基本费用 |
| -------- | ---------: | -------: | --------------: |
| 30       |        30M |    12.5% |     2705.6 gwei |
| ...      |        ... |    12.5% |             ... |
| 50       |        30M |    12.5% |    28531.3 gwei |
| ...      |        ... |    12.5% |             ... |
| 100      |        30M |    12.5% | 10302608.6 gwei |

### 优先费（小费） {#priority-fee}

在伦敦升级之前，矿工将获得区块中所含交易的总 gas 费用。

随着新的基本费被燃烧，伦敦升级引入了优先费（小费），以激励矿工将交易纳入区块。 如果没有小费，矿工会发现开采空区块在经济上可行，因为他们会获得相同的区块奖励。 在常规情况下，一笔金额不大的小费给矿工提供了包含该交易的最低激励。 对于需要在同一区块中优先执行的交易，需要更高的小费来试图出价高于竞争交易。

### 最高费用 {#maxfee}

要在网络上执行交易，用户可以为他们愿意支付的交易执行费指定最高限额。 此可选参数称为 `maxFeePergas`。 为了执行交易，最高费用必须超过基本费用和小费的总和。 会为交易发送人退还最高费用与基本费用和小费总和之间的差额。

### 计算费用 {#calculating-fees}

伦敦升级带来的主要好处之一是提高用户在确定交易费用时的体验。 对于支持升级的钱包，钱包提供商将自动设置推荐的交易费（基本费用 + 推荐优先费），而不是明确说明您愿意支付多少费用来完成交易，以便降低用户的复杂程度。

## EIP-1559 {#eip-1559}

在伦敦升级中执行 [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md) 使得交易费机制比以前的 gas 竞价招标更加复杂，但优点是提高 gas 费用的可预测性，从而使交易费市场更加有效。 用户可以在提交交易时设定 `maxFeePergas`，表示他们愿意为执行交易支付多少费用，同时清楚该数额不会超过 gas 的市场价格 (`BaseFeePergas`)，并且获得减去小费后的剩余退款。

这个视频解释了 EIP-1559 及其带来的好处：

<YouTube id="MGemhK9t44Q" />

如果感兴趣，您可以阅读 [EIP-1559 规范](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md)。

更深层次的见解请参见 [EIP-1559 资源](https://hackmd.io/@timbeiko/1559-resources)。

## 为什么存在 Gas 费用？ {#why-do-gas-fees-exist}

简而言之，Gas 费用有助于确保以太坊网络的安全。 在网络上执行的每次计算都需要收费，这样可以防止参与者对网络造成垃圾信息。 为了防止代码中无意、恶意的无限循环或其他计算浪费，要求每个事务对代码可以执行的计算步骤设置一个限制。 基本计算单位是“gas”。

尽管交易中包含费用限制，但交易中未使用的 gas 将退还给用户（如：返还`最高费用 -（基本费用 + 小费）`）。

![未使用 Gas 退款情况图](../transactions/gas-tx.png) _图表来自 [Ethereum EVM 插图](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## 什么是 gas 限额？ {#what-is-gas-limit}

Gas 限额是指您愿意在交易中消耗的最大 gas 数量。 涉及[智能合约](/developers/docs/smart-contracts/)的更复杂交易需要更多的计算工作，因此相比较简单的支付，它们需要更高的 gas 限额。 标准的 ETH 转账一般要求 gas 限额为 21,000 单位。

例如，如果您对简单的 ETH 转账设置 50,000 gas 限额。EVM 将消耗 21,000，您将收到剩余的 29,000。 然而，如果您设置的 gas 太少，比如说，对于简单的 ETH 转账，gas 限额为 20,000。EVM 将消耗您 20,000 gas 试图实现交易，但不会完成。 然后，EVM 会恢复所有变化，但由于矿工已经完成了价值 20k gas 的工作，所以 gas 被消耗掉了。

## 为什么 gas 费会变得如此高？ {#why-can-gas-fees-get-so-high}

Gas 费高是由于以太坊广受欢迎。 在以太坊进行任何操作都需要消耗 gas，每个区块的 gas 空间有限。 这包括计算、存储或操作数据，或转移代币，每种消耗不同数量的“gas”单位。 随着 dapp 功能变得更加复杂，智能合约执行的操作数量也会增加。即每个交易在有限大小区块内占用更多空间。 如果需求太大，用户必须提供更高的小费来尝试超越其他用户的出价。 小费更高即更有可能让你的交易进入下一区块。

光靠 gas 价格并不能实际决定我们必须对特定交易支付的金额。 为了计算交易费，我们必须将交易费所使用的 gas 乘以 gwei。

## 减少 gas 成本的举措 {#initiatives-to-reduce-gas-costs}

以太坊[性能扩展的升级](/upgrades/)将会最终解决一些燃料成本问题，也会为以太坊平台处理每秒上千次的交易和全面升级做好准备。

第二层扩容是一项主要举措，可大大优化 gas 成本、用户体验和可扩展性。 [关于第二层扩容的更多信息](/developers/docs/scaling/#layer-2-scaling)。

## 降低 gas 成本的策略 {#strategies-for-you-to-reduce-gas-costs}

如果你希望降低以太币的燃料费用，可以设置小费来表明交易的优先级。 矿工将“处理”并执行每单位燃料小费更高的交易，因为他们可以保留你支付的小费；矿工不太愿意执行小费较低的交易。

如果想要监控燃料价格，从而以较少的费用发送以太币，你可以使用多种不同的工具，例如：

- [Etherscan](https://etherscan.io/gastracker) _交易 gas 价格估算器_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _支持类型 0 传统交易和类型 2 EIP-1559 交易的 gas 估算 Chrome 插件。_

- [ETH Gas Station](https://ethgasstation.info/) _以太坊 gas 市场面向消费者的指标_
- [Cryptoneur 燃料费计算器](https://www.cryptoneur.xyz/gas-fees-calculator) _按照您当地货币计算主网、Arbitrum 和 Polygon 上进行的各类交易的燃料费。_

## 相关工具 {#related-tools}

- [Bloxy Gas Analytics](https://stat.bloxy.info/superset/dashboard/gas/?standalone=true) _以太坊网络 gas 统计数据_
- [Blocknative’s Gas Platform](https://www.blocknative.com/gas) _由 Blocknative 的全局内存池数据平台提供支持的 Gas 估算 API_

## 延伸阅读 {#further-reading}

- [以太坊 Gas 详解](https://defiprime.com/gas)
- [以太坊价格上涨会导致使用费更贵吗？](https://docs.ethhub.io/questions-about-ethereum/is-ethereum-more-expensive-to-use-as-price-rises/)
- [减少智能合约的 gas 消耗](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [权益证明与工作量证明](https://blockgeeks.com/guides/proof-of-work-vs-proof-of-stake/)

## 相关主题 {#related-topics}

- [挖矿](/developers/docs/consensus-mechanisms/pow/mining/)
