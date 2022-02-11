---
title: 采矿
description: 关于挖矿在以太坊中如何工作以及如何帮助保持以太坊安全和去中心化的解释。
lang: zh
sidebar: true
incomplete: true
---

## 前置要求 {#prerequisites}

为了更好地了解此页面，推荐先阅读 [交易](/developers/docs/transactions/)、[区块](/developers/docs/blocks/)和[工作量证明](/developers/docs/consensus-mechanisms/pow/)。

## 以太坊挖矿是什么？ {#what-is-ethereum-mining}

挖矿是一个创造区块来添加转账到以太坊区块链上的过程。

与比特币一样，以太坊目前使用的是[工作量证明（PoW）](/developers/docs/consensus-mechanisms/pow/)作为共识机制。 挖矿是工作量证明的本质。 以太坊矿工――运行软件的计算机，利用他们的时间和算力，处理交易和生产模块。

<InfoBanner emoji=":wave:">
   权益证明将在未来一年内取代挖矿和工作量证明。 您可以从今天开始权益质押 ETH。 <a href="/staking/">关于权益质押的更多信息</a>    
</InfoBanner>

## 为什么存在矿工？ {#why-do-miners-exist}

像以太坊这样的去中心化系统，我们需要确保每个人同意交易的顺序。 矿工通过解决计算难题来解决这一问题，以产生区块，从而使网络免受攻击，从而帮助实现了这一目标。

[工作量证明的更多信息](/developers/docs/consensus-mechanisms/pow/)

## 谁可以成为以太坊上的矿工？ {#who-can-become-a-miner}

从技术上讲，任何人都可以使用自己电脑在以太坊网络上挖矿。 然而，并非每个人都能以挖到以太币 (ETH)。 在大多数情况下，为了盈利，矿工必须购买专门的计算机硬件。 虽然确实任何人都可以在他们的电脑上运行挖矿软件，但一般的电脑不太可能赚取足够的区块奖励来支付挖矿的相关费用。

### 挖矿成本 {#cost-of-mining}

- 建造和维护矿机所需硬件的潜在成本
- 矿机的电力成本
- 如果您已加入矿池，矿池通常对其产生的每个区块收取固定比例的费用
- 支持矿机的潜在成本（通风、能源监测、电线等）

要进一步探索挖矿利润，请使用挖矿收益计算器，例如 [Etherscan](https://etherscan.io/ether-mining-calculator) 提供的挖矿收益计算器。

## 如何开采以太坊交易 {#how-ethereum-transactions-are-mined}

1. 用户编写和通过一些[帐户](/developers/docs/accounts/)私钥来签署[交易](/developers/docs/transactions/)请求。
2. 用户通过一些[节点](/developers/docs/nodes-and-clients/)将自己的交易请求广播到整个以太坊网络。
3. 在听到新的转账请求时，每个以太坊网络节点会添加这笔交易到本地的内存池，这些内存池包括他们收到的没有被添加到区块链以承认的所有转账请求。
4. 在这个时候，一个挖矿节点将几十或上百个交易请求汇总到潜在[区块](/developers/docs/blocks/)中，从而尽量多收取[交易](/developers/docs/gas/)手续费，同时保证不超出区块 gas 限制。 采矿节点将：
   1. 验证每个交易请求的有效性（例如没有人试图将以太币从他们没有签名的帐户中转移出来，请求是否有格式错误等），然后执行请求的本地代码，改变本地副本 EVM 的状态。 矿工获得每个交易请求的转账的手续费到他们的帐户。
   2. 一旦在本地 EVM 副本上验证并执行了块中的所有转账请求，就开始为潜在块生成工作证明“合法性证书”。
5. 最终，矿工将完成为包含我们特定交易请求的区块生成的证书。 然后，矿工广播完成的区块，其中包括证书和校验新 EVM 状态。
6. 其他节点将收到新的区块。 他们将验证证书，执行区块上所有的转账（包括最初由用户广播的交易），然后校验新 EVM 状态，之后执行所有满足 EVM 校验和的转账。 只有这样，这些节点才会将该块附加到区块链的尾部，并接受新的 EVM 状态作为新的规范状态。
7. 每个节点将从其未完成的本地内存池的转账请求中删除新区块中已经存在的转账请求。
8. 加入网络的新节点将按顺序下载所有块，包括未被打包的交易块。 初始化本地 EVM 副本（作为空白状态的 EVM 开始），在本地 EVM 副本上执行每个块中的每个转账，校验各块的校验和。

每个交易都只会被开采（包含在新区块中并首次传播）一次，但在推进规范 EVM 状态的过程中由每个参与者执行和验证。 这凸显出区块链的核心思想之一：**不信任，请校验**。

## 直观演示 {#a-visual-demo}

<YouTube id="zcX7OJ-L8XQ" />

## 延伸阅读 {#further-reading}

- [挖矿是什么意思？](https://docs.ethhub.io/using-ethereum/mining/) _EthHub_

## 相关工具 {#related-tools}

- [顶级以太坊矿工](https://etherscan.io/stat/miner?range=7&blocktype=blocks)
- [Etherscan 挖矿收益计算器](https://etherscan.io/ether-mining-calculator)
- [Minerstar 挖矿收益计算器](https://minerstat.com/coin/ETH)

## 相关主题 {#related-topics}

- [Gas](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [工作量证明](/developers/docs/consensus-mechanisms/pow/)
