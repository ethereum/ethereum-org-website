---
title: Gas 与费用
metaTitle: "以太坊 Gas 与费用：技术概述"
description: 了解以太坊 gas 费、其计算方式以及它们在网络安全和交易处理中的作用。
lang: zh
---

Gas 对[以太坊](/)网络至关重要。它是允许网络运行的燃料，就像汽车需要汽油才能行驶一样。

## 前提条件 {#prerequisites}

为了更好地理解本页面，我们建议您首先阅读有关[交易](/developers/docs/transactions/)和 [EVM](/developers/docs/evm/) 的内容。

## 什么是 Gas？ {#what-is-gas}

Gas 是指衡量在以太坊网络上执行特定操作所需计算工作量的单位。

由于每笔以太坊交易都需要计算资源来执行，因此必须为这些资源付费，以确保以太坊不会受到垃圾信息的攻击，并且不会陷入无限的计算循环。计算的付款以 gas 费的形式进行。

gas 费是**执行某项操作所消耗的 Gas 数量乘以单位 Gas 的成本**。无论交易成功还是失败，都必须支付该费用。

![A diagram showing where gas is needed in EVM operations](./gas.png)
_图表改编自 [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

gas 费必须以以太坊的原生货币以太币 (ETH) 支付。Gas 价格通常以 Gwei 报价，Gwei 是 ETH 的一种面额。每个 Gwei 等于十亿分之一 ETH（0.000000001 ETH 或 10<sup>-9</sup> ETH）。

例如，您可以说您的 Gas 成本为 1 Gwei，而不是说您的 Gas 成本为 0.000000001 以太币。

“Gwei”一词是“giga-wei”的缩写，意思是“十亿 Wei”。一 Gwei 等于十亿 Wei。Wei 本身（以 [b-money](https://www.investopedia.com/terms/b/bmoney.asp) 的创造者[戴伟](https://wikipedia.org/wiki/Wei_Dai)的名字命名）是 ETH 的最小单位。

## gas 费是如何计算的？ {#how-are-gas-fees-calculated}

您可以在提交交易时设置您愿意支付的 Gas 数量。通过提供一定数量的 Gas，您正在竞标将您的交易包含在下一个区块中。如果您提供的太少，验证者不太可能选择包含您的交易，这意味着您的交易可能会延迟执行或根本不执行。如果您提供的太多，您可能会浪费一些 ETH。那么，您怎么知道该支付多少呢？

您支付的总 Gas 分为两部分：`base fee` 和 `priority fee`（优先费）。

`base fee` 由协议设置——您必须至少支付此金额才能使您的交易被视为有效。`priority fee` 是您添加到基础费用中的优先费，以使您的交易对验证者具有吸引力，从而使他们选择将其包含在下一个区块中。

仅支付 `base fee` 的交易在技术上是有效的，但不太可能被包含在内，因为它没有向验证者提供任何激励来选择它而不是其他交易。“正确的”`priority` 费用由您发送交易时的网络使用情况决定——如果需求量很大，那么您可能需要将 `priority` 费用设置得更高，但当需求较少时，您可以支付较少。

例如，假设 Jordan 必须向 Taylor 支付 1 ETH。一次 ETH 转账需要 21,000 单位的 Gas，基础费用为 10 Gwei。Jordan 包含了 2 Gwei 的优先费。

现在总费用将等于：

`units of gas used * (base fee + priority fee)`

其中 `base fee` 是由协议设置的值，而 `priority fee` 是由用户设置的作为给验证者的优先费的值。

例如，`21,000 * (10 + 2) = 252,000 gwei` (0.000252 ETH)。

当 Jordan 发送资金时，将从 Jordan 的账户中扣除 1.000252 ETH。Taylor 将收到 1.0000 ETH。验证者收到 0.000042 ETH 的优先费。0.00021 ETH 的 `base fee` 被销毁。

### 基础费用 {#base-fee}

每个区块都有一个基础费用，作为底价。为了有资格被包含在区块中，提供的每单位 Gas 价格必须至少等于基础费用。基础费用的计算独立于当前区块，而是由它之前的区块决定，这使得交易费对用户来说更具可预测性。当区块被创建时，这个**基础费用会被“销毁”**，将其从流通中移除。

基础费用通过一个公式计算，该公式将前一个区块的大小（所有交易消耗的 Gas 量）与目标大小（gas 上限的一半）进行比较。如果目标区块大小分别高于或低于目标值，基础费用每个区块最多增加或减少 12.5%。这种指数级增长使得区块大小无限期保持在高位在经济上是不可行的。

| 区块号 | 包含的 Gas | 费用增加 | 当前基础费用 |
| ------------ | -----------: | -----------: | ---------------: |
| 1            |          18M |           0% |         100 gwei |
| 2            |          36M |           0% |         100 gwei |
| 3            |          36M |        12.5% |       112.5 gwei |
| 4            |          36M |        12.5% |       126.6 gwei |
| 5            |          36M |        12.5% |       142.4 gwei |
| 6            |          36M |        12.5% |       160.2 gwei |
| 7            |          36M |        12.5% |       180.2 gwei |
| 8            |          36M |        12.5% |       202.7 gwei |

在上表中，演示了一个使用 3600 万作为 gas 上限的示例。按照这个示例，要在第 9 号区块上创建交易，钱包将明确告知用户，添加到下一个区块的**最大基础费用**为 `current base fee * 112.5%` 或 `202.7 gwei * 112.5% = 228.1 gwei`。

同样重要的是要注意，由于在满区块之前基础费用增加的速度，我们不太可能看到满区块的长时间激增。

| 区块号 | 包含的 Gas | 费用增加 | 当前基础费用 |
| ------------ | -----------: | -----------: | ---------------: |
| 30           |          36M |        12.5% |      2705.6 gwei |
| ...          |          ... |        12.5% |              ... |
| 50           |          36M |        12.5% |     28531.3 gwei |
| ...          |          ... |        12.5% |              ... |
| 100          |          36M |        12.5% |  10302608.6 gwei |

### 优先费 {#priority-fee}

优先费激励验证者最大化区块中的交易数量，仅受区块 gas 上限的约束。如果没有优先费，理性的验证者可以包含更少——甚至零笔——交易，而不会受到任何直接的执行层或共识层惩罚，因为质押奖励与区块中有多少笔交易无关。此外，优先费允许用户在同一个区块内出价高于其他人以获得优先权，从而有效地发出紧急信号。

### 最大费用 {#maxfee}

为了在网络上执行交易，用户可以指定他们愿意为执行交易支付的最大限额。这个可选参数被称为 `maxFeePerGas`。要执行交易，最大费用必须超过基础费用和优先费的总和。交易发送者将获得最大费用与基础费用和优先费总和之间差额的退款。

### 区块大小 {#block-size}

每个区块的目标大小为当前 gas 上限的一半，但区块的大小将根据网络需求增加或减少，直到达到区块限制（目标区块大小的 2 倍）。协议通过_试探（tâtonnement）_过程在目标处实现均衡的平均区块大小。这意味着如果区块大小大于目标区块大小，协议将增加下一个区块的基础费用。同样，如果区块大小小于目标区块大小，协议将降低基础费用。

基础费用调整的幅度与当前区块大小偏离目标的程度成正比。这是一个线性计算，从空区块的 -12.5%、目标大小的 0%，一直到达到 gas 上限的区块的 +12.5%。gas 上限可以随着时间的推移根据验证者的信号以及通过网络升级而波动。您可以[在此处查看 gas 上限随时间的变化](https://eth.blockscout.com/stats/averageGasLimit?interval=threeMonths)。

[更多关于区块的信息](/developers/docs/blocks/)

### 在实践中计算 gas 费 {#calculating-fees-in-practice}

您可以明确说明您愿意支付多少费用来执行您的交易。然而，大多数钱包提供商会自动设置推荐的交易费（基础费用 + 推荐的优先费），以减少给用户带来的复杂性负担。

## 为什么存在 gas 费？ {#why-do-gas-fees-exist}

简而言之，gas 费有助于保持以太坊网络的安全。通过要求对网络上执行的每次计算收取费用，我们防止了恶意行为者向网络发送垃圾信息。为了避免代码中出现意外或恶意的无限循环或其他计算浪费，每笔交易都需要设置其可以使用的代码执行计算步骤的限制。计算的基本单位是“Gas”。

尽管交易包含一个限制，但交易中未使用的任何 Gas 都会退还给用户（例如，退还 `max fee - (base fee + tip)`）。

![Diagram showing how unused gas is refunded](../transactions/gas-tx.png)
_图表改编自 [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## 什么是 gas 上限？ {#what-is-gas-limit}

gas 上限是指您愿意在一笔交易中消耗的最大 Gas 量。涉及[智能合约](/developers/docs/smart-contracts/)的更复杂交易需要更多的计算工作，因此它们需要比简单支付更高的 gas 上限。标准的 ETH 转账需要 21,000 单位 Gas 的 gas 上限。

例如，如果您为简单的 ETH 转账设置 50,000 的 gas 上限，EVM 将消耗 21,000，您将收回剩余的 29,000。但是，如果您指定的 Gas 太少，例如，简单 ETH 转账的 gas 上限为 20,000，则交易将在验证阶段失败。它将在被包含在区块中之前被拒绝，并且不会消耗任何 Gas。另一方面，如果交易在执行期间耗尽了 Gas（例如，智能合约中途用完了所有 Gas），EVM 将回退任何更改，但提供的所有 Gas 仍将因已执行的工作而被消耗。

## 为什么 gas 费会变得这么高？ {#why-can-gas-fees-get-so-high}

高昂的 gas 费是由于以太坊的受欢迎程度。如果需求太大，用户必须提供更高的优先费金额，以试图在出价上超过其他用户的交易。更高的优先费可以使您的交易更有可能进入下一个区块。此外，更复杂的智能合约应用可能会执行大量操作来支持其功能，从而使它们消耗大量 Gas。

## 降低 Gas 成本的举措 {#initiatives-to-reduce-gas-costs}

以太坊[可扩展性升级](/roadmap/)最终应解决一些 gas 费问题，这反过来将使平台能够每秒处理数千笔交易并在全球范围内扩展。

二层网络 (l2) 扩容是大幅改善 Gas 成本、用户体验和可扩展性的主要举措。

[更多关于二层网络 (l2) 扩容的信息](/developers/docs/scaling/#layer-2-scaling)

## 监控 gas 费 {#monitoring-gas-fees}

如果您想监控 Gas 价格，以便以更低的成本发送您的 ETH，您可以使用许多不同的工具，例如：

- [Etherscan](https://etherscan.io/gastracker) _交易 Gas 价格估算器_
- [Blockscout](https://eth.blockscout.com/gas-tracker) _开源交易 Gas 价格估算器_
- [ETH Gas Tracker](https://www.ethgastracker.com/) _监控和跟踪以太坊及二层网络 (l2) Gas 价格，以降低交易费并节省资金_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Gas 估算 Chrome 扩展程序，支持 Type 0 传统交易和 Type 2 EIP-1559 交易。_
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _以您的当地货币计算主网、Arbitrum 和 Polygon 上不同交易类型的 gas 费。_

## 相关工具 {#related-tools}

- [Blocknative 的 Gas 平台](https://www.blocknative.com/gas) _由 Blocknative 的全球内存池数据平台提供支持的 Gas 估算 API_
- [Gas Network](https://gas.network) 链上 Gas 预言机。支持 35 条以上的链。

## 延伸阅读 {#further-reading}

- [以太坊 Gas 详解](https://defiprime.com/gas)
- [降低智能合约的 Gas 消耗](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [面向开发者的 Gas 优化策略](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [EIP-1559 文档](https://eips.ethereum.org/EIPS/eip-1559)。
- [Tim Beiko 的 EIP-1559 资源](https://hackmd.io/@timbeiko/1559-resources)
- [EIP-1559：将机制与模因分离](https://web.archive.org/web/20241126205908/https://research.2077.xyz/eip-1559-separating-mechanisms-from-memes)