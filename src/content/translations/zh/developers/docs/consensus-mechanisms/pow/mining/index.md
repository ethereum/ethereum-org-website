---
title: 采矿
description: 关于挖矿在以太坊中如何工作以及如何帮助保持以太坊安全和去中心化的解释。
lang: zh
sidebar: true
incomplete: true
---

## 前置要求 {#prerequisites}

为了更好地了解此页面，推荐先阅读 [转账](/developers/docs/transactions/)，[区块](/developers/docs/blocks/) 和 [工作量证明](/developers/docs/consensus-mechanisms/pow/)。

## 以太坊挖矿是什么？ {#what-is-ethereum-mining}

挖矿是一个创造区块来添加转账到以太坊区块链上的过程。

与比特币一样，以太坊目前使用的是[工作量证明（PoW）](/developers/docs/consensus-mechanisms/pow/)作为共识机制。 挖矿是工作量证明的本质。 以太坊矿工――运行软件的计算机，利用他们的时间和计算能力，处理交易和生产模块。

## 为什么存在矿工？ {#why-do-miners-exist}

像以太坊这样的去中心化系统，我们需要确保每个人同意交易的顺序。 矿工通过解决计算难题来解决这一问题，以产生区块，从而使网络免受攻击，从而帮助实现了这一目标。

[工作量证明的更多信息](/developers/docs/consensus-mechanisms/pow/)

## 以太坊交易是如何开采的 {#how-ethereum-transactions-are-mined}

1. 一个用户编写和通过[帐户](/developers/docs/accounts/)私钥签名来请求一笔[转账](/developers/docs/transactions/)。
2. 用户通过一些[节点](/developers/docs/nodes-and-clients/)广播自己的转账请求到整个以太坊网络。
3. 在听到新的转账请求时，每个以太坊网络节点会添加这笔交易到本地的内存池，这些内存池包括他们收到的没有被添加到区块链以承认的所有转账请求。
4. 在这个时候，一个挖矿节点打包几十或上百个交易请求到一个未生成的[区块](/developers/docs/blocks/)，以一种最大化收取的[转账](/developers/docs/gas/)手续费的方式，同时仍然保持 gas 费限制之下。 采矿节点将：
   1. 验证每个交易请求的有效性（例如没有人试图将以太币从他们没有签名的帐户中转移出来，请求是否有格式错误等），然后执行请求的本地代码，改变本地副本 EVM 的状态。 矿工获得每个交易请求的转账的手续费到他们的帐户。
   2. 一旦在本地 EVM 副本上验证并执行了块中的所有转账请求，就开始为潜在块生成工作证明“合法性证书”。
5. 最终，矿工将完成为包含我们特定交易请求的区块生成的证书。 然后，矿工广播完成的区块，其中包括证书和校验新 EVM 状态。
6. 其他节点将收到新的区块。 他们将验证证书，执行区块上所有的转账（包括最初由用户广播的交易），然后校验新 EVM 状态，之后执行所有满足 EVM 校验和的转账。 只有这样，这些节点才会将该块附加到区块链的尾部，并接受新的 EVM 状态作为新的规范状态。
7. 每个节点将从其未完成的本地内存池的转账请求中删除新区块中已经存在的转账请求。
8. 加入网络的新节点将按顺序下载所有块，包括未被打包的交易块。 初始化本地 EVM 副本（作为空白状态的 EVM 开始），在本地 EVM 副本上执行每个块中的每个转账，校验各块的校验和。

每个交易都会只被开采（包含在一个新的区块中并首次传播）一次，但每一个参与者将会验证执行和验证标准 EVM 状态。 这突出显示了区块链的核心思想之一： **不信任，但校验**。

## 一个视觉演示 {#a-visual-demo}

观看 Austin 带你了解采矿和工作量证明区块链。

<iframe width="100%" height="315" src="https://www.youtube.com/embed/zcX7OJ-L8XQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

## 延伸阅读 {#further-reading}

- [挖矿是什么意思？](https://docs.ethhub.io/using-ethereum/mining/) _EthHub_

## 相关工具 {#related-tools}

- [领先以太坊矿工](https://etherscan.io/stat/miner?range=7&blocktype=blocks)
- [以太坊挖矿收益计算器](https://minerstat.com/coin/ETH)

## 相关主题 {#related-topics}

- [Gas](/developers/docs/gas/)
- [以太坊虚拟机（EVM）](/developers/docs/evm/)
- [工作量证明](/developers/docs/consensus-mechanisms/pow/)
