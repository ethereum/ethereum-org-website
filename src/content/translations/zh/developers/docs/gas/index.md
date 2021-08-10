---
title: Gas 和费用
description:
lang: zh
sidebar: true
incomplete: true
---

Gas 对以太坊网络至关重要。 正是这种燃料使它能够运行，正如车辆需要汽油一样。

## 前置要求 {#prerequisites}

为了帮助你更好地理解这个页面，我们建议你先阅读[帐户](/developers/docs/accounts/)和我们的 [以太坊简介](/developers/docs/intro-to-ethereum/)。

## 什么是 Gas？ {#what-is-gas}

Gas 是指在以太坊网络上执行特定操作所需的计算工作量。

由于每笔以太坊交易都需要计算资源才能执行，每笔交易都需要付费。 在这个方面上，Gas 是指在以太坊成功进行交易所需的费用。

![显示 EVM 操作所需 Gas 的图表](./gas.png) _图表来自 [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

本质上，Gas 费用是以太坊的货币以太 (ETH) 支付的。 Gas 价格以 Gwei 标明，Gwei 本身就是 ETH 的一个单位――每个 Gwei 等于 0.000000001 ETH (10<sup>-9</sup> ETH)。 例如，您可以说您的 Gas 成本为 1 Gwei，而不是说您的 Gas 成本为 0.000000001 以太。

这个视频简要概述了 Gas 的存在及其原因：

<iframe width="100%" height="315" src="https://www.youtube.com/embed/AJvzNICwcwc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

## 为什么存在 Gas 费用呢？ {#why-do-gas-fees-exist}

简而言之，Gas 费用有助于确保以太坊网络的安全。 在网络上执行的每次计算都需要收费，我们可以防止参与者对网络造成垃圾信息。 为了防止代码中意外或恶意的无限循环或其他计算浪费，每个交易都需要设置一个限制，以限制它可以使用多少代码执行的计算步骤。 基本计算单位是“gas”。

尽管交易包含限制，但交易中没有使用的任何 Gas 都将退还给用户。

![未使用的 Gas 退款情况图](../transactions/gas-tx.png) _图表来自 [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## 延伸阅读 {#further-reading}

- [理解以太坊 Gas、区块和收费市场](https://medium.com/@eric.conner/understanding-ethereum-gas-blocks-and-the-fee-market-d5e268bf0a0e)
- [以太坊 Gas 详解](https://defiprime.com/gas)

## 相关工具 {#related-tools}

- [ETH Gas 站](https://ethgasstation.info/) _以太坊即时 Gas 费用查看_
- [以太坊 Gas 追踪器](https://etherscan.io/gastracker) _交易 Gas 费计算器_
- [Bloxy Gas 分析站](https://stat.bloxy.info/superset/dashboard/gas/?standalone=true) _以太坊网络 Gas 统计_

## 相关主题 {#related-topics}

- [采矿](/developers/docs/consensus-mechanisms/pow/mining/)
