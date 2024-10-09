---
title: 挖矿
description: 解释以太坊上挖矿的工作原理。
lang: zh
---

<InfoBanner emoji=":wave:">
工作量证明不再是以太坊共识机制的基础，这意味着挖矿已终结。 取而代之的是，以太坊将由质押了以太币的验证者保护。 你可以立即开始质押以太币。 阅读更多关于<a href='/roadmap/merge/'>合并</a>、<a href='/developers/docs/consensus-mechanisms/pos/'>权益证明</a>和<a href='/staking/'>质押</a>的信息。 此页面仅展示历史内容。
</InfoBanner>

## 前提条件 {#prerequisites}

为了更好地了解此页面，推荐先阅读[交易](/developers/docs/transactions/)、[区块](/developers/docs/blocks/)和[工作量证明](/developers/docs/consensus-mechanisms/pow/)。

## 以太坊挖矿是什么？ {#what-is-ethereum-mining}

挖矿是指创建要添加到以太坊区块链的交易块的过程，在以太坊现已弃用的工作量证明架构中进行。

挖矿一词源于将加密货币比作黄金的比喻。 黄金或贵金属很稀缺，数字代币也很稀缺，在工作量证明体系中，只能通过挖矿增加总量。 在工作量证明以太坊中，只能通过挖矿进行发行。 然而，与黄金或贵金属不同，以太坊挖矿也是一种通过在区块链中创建、验证、发布和传播区块来保护网络的方式。

以太币挖矿 = 保护网络安全

挖矿是任何工作量证明区块链的命脉。 在过渡到权益证明之前，以太坊矿工，即运行软件的计算机，利用它的时间和算力处理交易并产生区块。

## 为什么存在矿工？ {#why-do-miners-exist}

在以太坊这样的去中心化系统中，需要确保每个人都同意交易的顺序。 矿工通过解决计算难题来产生区块并保护网络免受攻击，从而帮助实现这一目标。

[关于工作量证明的更多信息](/developers/docs/consensus-mechanisms/pow/)

以前任何人都能使用他们的计算机在以太坊网络上挖矿。 然而，并非每个人都可以通过挖矿实现以太币 (ETH) 获利。 在大多数情况下，矿工必须购买专用计算机硬件，并且能够获得廉价能源。 普通计算机不太可能获得足够的区块奖励来支付相关的挖矿成本。

### 挖矿成本 {#cost-of-mining}

- 建造和维护矿机所需硬件的潜在成本
- 矿机的电力成本
- 如果你在矿池中挖矿，这些矿池通常对矿池生成的每个区块收取固定百分比的费用
- 支持矿机的潜在成本（通风、能源监测、电线等）

要进一步探索挖矿收益，请使用挖矿收益计算器，例如 [Etherscan](https://etherscan.io/ether-mining-calculator) 提供的挖矿收益计算器。

## 如何挖掘以太坊交易 {#how-ethereum-transactions-were-mined}

以下内容将简要介绍如何在以太坊工作量证明中挖掘交易。 在[这里](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos)可以找到对以太坊权益证明中该过程的类比介绍。

1. 用户编写和通过一些[帐户](/developers/docs/accounts/)私钥来签署[交易](/developers/docs/transactions/)请求。
2. 用户通过一些[节点](/developers/docs/nodes-and-clients/)将自己的交易请求广播到整个以太坊网络。
3. 在听到新的转账请求时，每个以太坊网络节点会添加这笔交易到本地的内存池，这些内存池包括他们收到的没有被添加到区块链以承认的所有转账请求。
4. 在这个时候，一个挖矿节点将几十或上百个交易请求汇总到潜在[区块](/developers/docs/blocks/)中，从而尽量多收取[交易](/developers/docs/gas/)手续费，同时保证不超出区块燃料限制。 采矿节点将：
   1. 验证每个交易请求的有效性（例如没有人试图将以太币从他们没有签名的帐户中转移出来，请求是否有格式错误等），然后执行请求的本地代码，改变本地副本 EVM 的状态。 矿工获得每个交易请求的转账的手续费到他们的帐户。
   2. 一旦在本地 EVM 副本上验证并执行了块中的所有转账请求，就开始为潜在块生成工作证明“合法性证书”。
5. 最终，矿工将完成为包含我们特定交易请求的区块生成的证书。 然后，矿工广播完成的区块，其中包括证书和校验新 EVM 状态。
6. 其他节点将收到新的区块。 他们将验证证书，执行区块上所有的转账（包括最初由用户广播的交易），然后校验新 EVM 状态，之后执行所有满足 EVM 校验和的转账。 只有这样，这些节点才会将该块附加到区块链的尾部，并接受新的 EVM 状态作为新的规范状态。
7. 每个节点将从其未完成的本地内存池的转账请求中删除新区块中已经存在的转账请求。
8. 加入网络的新节点将按顺序下载所有块，包括未被打包的交易块。 初始化本地 EVM 副本（作为空白状态的 EVM 开始），在本地 EVM 副本上执行每个块中的每个转账，校验各块的校验和。

每个交易都只会被挖掘（首次包含在新区块中并传播）一次，但在推进规范以太坊虚拟机状态的过程中，每个参与者都会执行和验证交易。 这凸显出区块链的核心准则之一：**不信任，就验证**。

## 叔块 {#ommer-blocks}

基于工作量证明的区块挖掘是概率性的，这意味着有时由于网络延迟而同时公布了两个有效的区块。 在这种情况下，协议必须确定最长链(因此大多数即是最“有效的”)，同时针对已提交但未被包含的有效区块，给予矿工部分奖励以确保公平。 这促使网络进一步去中心化，因为小矿工群体可能面临更大的延迟，但仍然可以通过[叔块](/glossary/#ommer)奖励获得收益。

对于父区块的同级区块来说，“ommer”一词不分性别，因而为首选，但有时也被称为“uncle”（叔）。 **因为以太坊切换到权益证明机制后，叔块就不会被挖掘了**，因为每个时隙中只选择了一名提议者。 通过查看被挖掘叔块的[历史图表](https://ycharts.com/indicators/ethereum_uncle_rate)，你可以看到这种变化。

## 直观演示 {#a-visual-demo}

跟随 Austin 了解挖矿和工作量证明区块链。

<YouTube id="zcX7OJ-L8XQ" />

## 挖矿算法 {#mining-algorithm}

以太坊主网只使用过一种挖矿算法：[“Ethash”](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/)。 Ethash 是一种初始研发算法[“Dagger-Hashimoto”](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/)的后续版本。

[有关挖矿算法的更多信息](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/)。

## 相关主题 {#related-topics}

- [燃料](/developers/docs/gas/)
- [以太坊虚拟机](/developers/docs/evm/)
- [工作量证明](/developers/docs/consensus-mechanisms/pow/)
