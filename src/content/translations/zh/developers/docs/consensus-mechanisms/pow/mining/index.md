---
title: 挖矿
description: 关于挖矿在以太坊中如何工作以及如何帮助保持以太坊安全和去中心化的解释。
lang: zh
---

<InfoBanner emoji=":wave:">
   权益证明将很快取代工作量证明成为以太坊的共识机制，这意味着挖矿将终止。 取而代之的是，以太坊将由质押了以太币的验证者保护。 你可以立即开始质押以太币。 详细了解<a href="/upgrades/merge/">合并</a>、<a href="/developers/docs/consensus-mechanisms/pos/">权益证明</a>和<a href="/staking/">质押</a>。    
</InfoBanner>

## 前置要求 {#prerequisites}

为了更好地了解此页面，推荐先阅读[交易](/developers/docs/transactions/)、[区块](/developers/docs/blocks/)和[工作量证明](/developers/docs/consensus-mechanisms/pow/)。

## 以太坊挖矿是什么？ {#what-is-ethereum-mining}

挖矿是一个创造区块来添加转账到以太坊区块链上的过程。

挖矿一词源于将加密货币比作黄金的比喻。 同黄金或贵金属一样，数字代币也是稀缺的，增加总量的唯一方法是挖矿。 这在以太坊中也是恰当的，以太坊启动后唯一的发行模式就是挖矿。 然而，与以上示例不同的是，挖矿也是一种保护网络安全的方法，它创建、验证、发布区块并把区块传播到区块链中。

以太币挖矿 = 保护网络安全

与比特币一样，以太坊目前使用[工作量证明 (PoW)](/developers/docs/consensus-mechanisms/pow/) 共识机制。 挖矿是工作量证明的命脉。 以太坊矿工（即运行软件的计算机）消耗他们的时间和算力处理交易并产生区块。

## 为什么存在矿工？ {#why-do-miners-exist}

在以太坊这样的去中心化系统中，需要确保每个人都同意交易的顺序。 矿工可以保证这一点，他们通过解决计算难题产生区块，并保护网络免受攻击。

[关于工作量证明的更多信息](/developers/docs/consensus-mechanisms/pow/)

## 谁可以成为以太坊上的矿工？ {#who-can-become-a-miner}

从技术上讲，任何人都可以使用自己电脑在以太坊网络上挖矿。 然而，并非每个人都能挖矿并实现以太币 (ETH) 获利。 大多数情况下，为了实现挖矿获利，矿工必须购买专用计算机硬件。 虽然确实任何人都可以在他们的电脑上运行挖矿软件，但普通电脑不太可能赚取足够的区块奖励来支付挖矿相关费用。

### 挖矿成本 {#cost-of-mining}

- 建造和维护矿机所需硬件的潜在成本
- 矿机的电力成本
- 如果您已加入矿池，矿池通常对其产生的每个区块收取固定比例的费用
- 支持矿机的潜在成本（通风、能源监测、电线等）

要进一步探索挖矿收益，请使用挖矿收益计算器，例如 [Etherscan](https://etherscan.io/ether-mining-calculator) 提供的挖矿收益计算器。

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

每个交易都只会被挖矿（首次包含在新区块中并传播）一次，但在推进规范以太坊虚拟机状态的过程中，每个参与者都会执行和验证交易。 这凸显出区块链的核心准则之一：**不信任，就验证**。

## 直观演示 {#a-visual-demo}

跟随 Austin 了解挖矿和工作量证明区块链。

<YouTube id="zcX7OJ-L8XQ" />

## 挖矿算法 {#mining-algorithm}

以太坊挖矿算法自问世以来经历了数次升级。 最初的算法“Dagger Hashimoto”的本质是提出一个大型、瞬时、随机产生的数据集，形成[有向无环图](https://en.wikipedia.org/wiki/Directed_acyclic_graph)（即 Dagger 算法）。矿工们试图解决针对数据集的特定约束，这在一定程度上取决于区块头哈希值。 这种算法是新颖的，因为它有很高的内存访问带宽要求，但可以使用普通处理器来运行，这使得这种算法对 GPU 友好，且不欢迎以专用集成电路为目标的硬件装备竞赛（会导致中心化风险）（更多有关[专用集成电路相关问题的信息](https://www.investopedia.com/investing/why-centralized-crypto-mining-growing-problem/)）。 在经过几次升级之后，该算法被重命名为"Etash"。 这次重命名发生在以太坊主网开始出现挖矿之前。 Dagger-Hashimoto 算法是一个雏形，这种研究性质的算法未在以太坊主网应用。

想了解更多有关这些挖矿算法的信息，请参阅我们的[挖矿算法页面](/developers/docs/consensus-mechanisms/pow/mining-algorithms/)。

## 延伸阅读 {#further-reading}

- [挖矿是什么意思？](https://docs.ethhub.io/using-ethereum/mining/) _EthHub_

## 相关工具 {#related-tools}

- [顶级以太坊矿工](https://etherscan.io/stat/miner?range=7&blocktype=blocks)
- [Etherscan 挖矿收益计算器](https://etherscan.io/ether-mining-calculator)
- [Minerstat 挖矿收益计算器](https://minerstat.com/coin/ETH)

## 相关主题 {#related-topics}

- [Gas](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [工作量证明](/developers/docs/consensus-mechanisms/pow/)
