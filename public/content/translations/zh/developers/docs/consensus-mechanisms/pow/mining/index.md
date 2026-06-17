---
title: 挖矿
description: 解释以太坊上的挖矿是如何运作的。
lang: zh
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
工作量证明 (PoW) 不再是以太坊的共识机制，这意味着挖矿已被关闭。相反，[以太坊](/)现在由质押 ETH 的验证者来保护。你今天就可以开始质押你的 ETH。了解更多关于<a href='/roadmap/merge/'>合并</a>、<a href='/developers/docs/consensus-mechanisms/pos/'>权益证明 (PoS)</a>和<a href='/staking/'>质押</a>的信息。本页面仅供历史参考。
</AlertDescription>
</AlertContent>
</Alert>

## 前提条件 {#prerequisites}

为了更好地理解本页面，我们建议你首先阅读有关[交易](/developers/docs/transactions/)、[区块](/developers/docs/blocks/)和[工作量证明 (PoW)](/developers/docs/consensus-mechanisms/pow/)的内容。

## 什么是以太坊挖矿？ {#what-is-ethereum-mining}

挖矿是在以太坊现已弃用的工作量证明架构中，创建交易区块并将其添加到以太坊区块链的过程。

“挖矿”一词源于将加密货币比作黄金的说法。黄金或贵金属是稀缺的，数字代币也是如此，在工作量证明系统中增加总量的唯一方法就是通过挖矿。在工作量证明以太坊中，唯一的发行方式就是通过挖矿。然而，与黄金或贵金属不同的是，以太坊挖矿也是通过在区块链中创建、验证、发布和传播区块来保护网络安全的方式。

挖出以太币 = 保护网络

挖矿是任何工作量证明区块链的命脉。在过渡到权益证明之前，以太坊矿工（运行软件的计算机）利用他们的时间和计算能力来处理交易并生成区块。

## 为什么需要矿工？ {#why-do-miners-exist}

在像以太坊这样的去中心化系统中，我们需要确保每个人都对交易的顺序达成一致。矿工通过解决计算上困难的难题来生成区块，从而帮助实现这一点，并保护网络免受攻击。

[更多关于工作量证明的信息](/developers/docs/consensus-mechanisms/pow/)

以前，任何人都可以使用自己的计算机在以太坊网络上挖矿。然而，并非所有人都能通过挖以太币 (ETH) 获利。在大多数情况下，矿工必须购买专用的计算机硬件，并能获得廉价的能源。普通计算机不太可能赚取足够的区块奖励来支付相关的挖矿成本。

### 挖矿成本 {#cost-of-mining}

- 构建和维护矿机所需硬件的潜在成本
- 为矿机供电的电费
- 如果你在矿池中挖矿，这些矿池通常会对矿池生成的每个区块收取固定百分比的费用
- 支持矿机的设备的潜在成本（通风、能源监控、电线等）

要进一步探索挖矿的盈利能力，请使用挖矿计算器，例如 [Etherscan](https://etherscan.io/ether-mining-calculator) 提供的计算器。

## 以太坊交易是如何被挖出的 {#how-ethereum-transactions-were-mined}

下文概述了在以太坊工作量证明中交易是如何被挖出的。关于以太坊权益证明中此过程的类似描述，请参见[此处](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos)。

1. 用户编写[交易](/developers/docs/transactions/)请求，并使用某个[账户](/developers/docs/accounts/)的私钥对其进行签名。
2. 用户从某个[节点](/developers/docs/nodes-and-clients/)将交易请求广播到整个以太坊网络。
3. 在得知新的交易请求后，以太坊网络中的每个节点都会将该请求添加到其本地内存池中，内存池是它们已得知但尚未在区块中提交到区块链的所有交易请求的列表。
4. 在某个时刻，挖矿节点将几十或几百个交易请求聚合成一个潜在的[区块](/developers/docs/blocks/)，其方式是在保持低于区块 Gas 上限的同时，最大化它们赚取的[交易费](/developers/docs/gas/)。然后，挖矿节点会：
   1. 验证每个交易请求的有效性（即，没有人试图从他们未提供签名的账户中转出以太币，请求格式没有错误等），然后执行请求的代码，改变其本地 EVM 副本的状态。矿工将每个此类交易请求的交易费奖励给自己的账户。
   2. 一旦区块中的所有交易请求都在本地 EVM 副本上得到验证和执行，就开始为潜在区块生成工作量证明“合法性证书”的过程。
5. 最终，某个矿工将完成为包含我们特定交易请求的区块生成证书。然后，该矿工广播完成的区块，其中包括证书和声称的新 EVM 状态的校验和。
6. 其他节点得知新区块。它们验证证书，自己执行区块上的所有交易（包括我们的用户最初广播的交易），并验证在执行所有交易后其新 EVM 状态的校验和是否与矿工区块声称的状态校验和相匹配。只有这样，这些节点才会将此区块附加到其区块链的尾部，并接受新的 EVM 状态为规范状态。
7. 每个节点从其未完成交易请求的本地内存池中移除新区块中的所有交易。
8. 加入网络的新节点按顺序下载所有区块，包括包含我们关注的交易的区块。它们初始化一个本地 EVM 副本（从空白状态的 EVM 开始），然后在本地 EVM 副本上执行每个区块中的每笔交易，并在此过程中验证每个区块的状态校验和。

每笔交易只被挖出（包含在新区块中并首次传播）一次，但在推进规范 EVM 状态的过程中，由每个参与者执行和验证。这突显了区块链的核心信条之一：**不要信任，要验证**。

## 叔块 {#ommer-blocks}

工作量证明上的区块挖矿是概率性的，这意味着有时由于网络延迟，两个有效的区块会同时发布。在这种情况下，协议必须确定最长（因此也是最“有效”）的链，同时通过对未被包含的有效提议区块进行部分奖励，来确保对矿工的公平性。这鼓励了网络的进一步去中心化，因为可能面临更大延迟的较小矿工仍然可以通过[叔块](/glossary/#ommer)奖励产生回报。

术语“ommer”是父区块的同级区块的首选性别中立术语，但有时也被称为“uncle”（叔块）。**自从以太坊转向权益证明以来，不再挖出叔块**，因为在每个时隙中只选举一名提议者。你可以通过查看已挖出叔块的[历史图表](https://ycharts.com/indicators/ethereum_uncle_rate)来了解这一变化。

## 可视化演示 {#a-visual-demo}

观看 Austin 为你演示挖矿和工作量证明区块链。

<VideoWatch slug="blockchain-eth-build" />

## 挖矿算法 {#mining-algorithm}

以太坊主网只使用过一种挖矿算法——[“Ethash”](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/)。Ethash 是一种名为 [“Dagger-Hashimoto”](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/) 的原始研发算法的继任者。

[更多关于挖矿算法的信息](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/)。

## 相关主题 {#related-topics}

- [Gas](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [工作量证明 (PoW)](/developers/docs/consensus-mechanisms/pow/)