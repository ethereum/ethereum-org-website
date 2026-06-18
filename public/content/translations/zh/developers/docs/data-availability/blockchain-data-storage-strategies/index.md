---
title: 区块链数据存储策略
description: 有几种使用区块链存储数据的方法。本文将比较不同的策略、它们的成本和权衡，以及安全使用它们的要求。
lang: zh
---

有多种方法可以直接在区块链上存储信息，或者以由区块链保护的方式存储信息：

- EIP-4844 blob
- 调用数据 (calldata)
- 具有一层网络 (l1) 机制的链下存储
- 合约“代码”
- 事件
- EVM 存储

选择使用哪种方法基于几个标准：

- 信息的来源。调用数据中的信息不能直接来自区块链本身。
- 信息的目的地。调用数据仅在包含它的交易中可用。事件根本无法在链上访问。
- 可以接受多少麻烦？运行全节点的计算机比在浏览器中运行的应用程序中的轻客户端可以执行更多的处理。
- 是否有必要促进从每个节点轻松访问信息？
- 安全要求。

## 安全要求 {#security-requirements}

通常，信息安全包含三个属性：

- _机密性_，不允许未经授权的实体读取信息。这在许多情况下很重要，但在这里不适用。_区块链上没有秘密_。区块链之所以有效，是因为任何人都可以验证状态转换，因此不可能使用它们直接存储秘密。有多种方法可以在区块链上存储机密信息，但它们都依赖于某些链下组件来至少存储一个密钥。

- _完整性_，信息是正确的，不能被未经授权的实体或以未经授权的方式更改（例如，在没有 `Transfer` 事件的情况下转移 [ERC-20 代币](https://eips.ethereum.org/EIPS/eip-20#events)）。在区块链上，每个节点都会验证每个状态变化，从而确保完整性。

- _可用性_，信息可供任何授权实体使用。在区块链上，这通常通过使信息在每个[全节点](https://ethereum.org/developers/docs/nodes-and-clients/#full-node)上可用而实现。

这里的不同解决方案都具有极佳的完整性，因为哈希发布在一层网络 (l1) 上。然而，它们确实具有不同的可用性保证。

## 前提条件 {#prerequisites}

你应该对[区块链基础知识](/developers/docs/intro-to-ethereum/)有很好的了解。本页面还假设读者熟悉[区块](/developers/docs/blocks/)、[交易](/developers/docs/transactions/)以及其他相关主题。

## EIP-4844 blob {#eip-4844-blobs}

从 [Dencun 硬分叉](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/beacon-chain.md)开始，以太坊区块链包含了 [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844)，它为以太坊添加了生命周期有限（最初约为 [18 天](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/p2p-interface.md#configuration)）的数据 blob。这些 blob 的定价与[执行 Gas](/developers/docs/gas) 分开，尽管使用了类似的机制。它们是发布临时数据的一种廉价方式。

EIP-4844 blob 的主要用例是供汇总 (Rollup) 发布其交易。[乐观 Rollup](/developers/docs/scaling/optimistic-rollups) 需要在其区块链上发布交易。这些交易必须在[挑战期](https://docs.optimism.io/connect/resources/glossary#challenge-period)内对任何人可用，以便在 Rollup 的[定序器](https://docs.optimism.io/connect/resources/glossary#sequencer)发布了错误的状态根时，使[验证者](https://docs.optimism.io/connect/resources/glossary#validator)能够纠正错误。

然而，一旦挑战期过去并且状态根已最终确定，了解这些交易的剩余目的就是复制链的当前状态。这种状态也可以从链节点获取，且所需的处理要少得多。因此，交易信息仍应保存在一些地方，例如[区块浏览器](/developers/docs/data-and-analytics/block-explorers)，但没有必要为以太坊提供的抗审查级别付费。

[零知识 Rollup](/developers/docs/scaling/zk-rollups/#data-availability) 也发布其交易数据，以使其他节点能够复制现有状态并验证有效性证明，但这同样是一个短期需求。

在撰写本文时，在 EIP-4844 上发布的成本为每字节 1 Wei（10<sup>-18</sup> ETH），与[任何交易（包括发布 blob 的交易）花费的 21,000 执行 Gas](https://eth.blockscout.com/tx/0xf6cfaf0431c73dd1d96369a5e6707d64f463ccf477a4131265397f1d81466929?tab=index) 相比，这可以忽略不计。你可以在 [blobscan.com](https://blobscan.com/blocks) 上查看当前的 EIP-4844 价格。

以下是查看一些著名 Rollup 发布的 blob 的地址。

| Rollup                               | 邮箱地址                                                                                                         |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://blobscan.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://blobscan.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://blobscan.com/address/0xFF00000000000000000000000000000000008453) |

## 调用数据 {#calldata}

调用数据是指作为交易一部分发送的字节。它作为区块链永久记录的一部分，存储在包含该交易的区块中。

这是将数据永久放入区块链的最便宜的方法。每字节的成本为 4 执行 Gas（如果字节为零）或 16 Gas（任何其他值）。如果数据被压缩（这是标准做法），那么每个字节值出现的可能性是相等的，因此平均成本约为每字节 15.95 Gas。

在撰写本文时，价格为 12 Gwei/Gas 和 2300 美元/ETH，这意味着成本约为每千字节 45 美分。因为这是 EIP-4844 之前最便宜的方法，所以这是 Rollup 用于存储交易信息的方法，这些信息需要可用于[故障挑战](https://docs.optimism.io/stack/protocol/overview#fault-proofs)，但不需要直接在链上访问。

以下是查看一些著名 Rollup 发布的交易的地址。

| Rollup                               | 邮箱地址                                                                                                               |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://eth.blockscout.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000008453) |

## 具有一层网络 (l1) 机制的链下存储 {#offchain-with-l1-mechs}

根据你的安全权衡，将信息放在其他地方并使用一种机制来确保数据在需要时可用可能是可以接受的。要使其发挥作用，有两个要求：

1. 在区块链上发布数据的[哈希](https://en.wikipedia.org/wiki/Cryptographic_hash_function)，称为_输入承诺_。这可以是一个 32 字节的字，因此并不昂贵。只要输入承诺可用，完整性就能得到保证，因为找到任何其他哈希值相同的数据是不可行的。因此，如果提供了不正确的数据，就可以被检测出来。

2. 建立确保可用性的机制。例如，在 [Redstone](https://redstone.xyz/docs/what-is-redstone) 中，任何节点都可以提交可用性挑战。如果定序器未能在截止日期前在链上做出响应，则输入承诺将被丢弃，因此该信息被视为从未发布过。

这对于乐观 Rollup 来说是可以接受的，因为我们已经依赖于至少有一个诚实的验证者来验证状态根。这样一个诚实的验证者还将确保它拥有处理区块的数据，并在信息在链下不可用时发出可用性挑战。这种类型的乐观 Rollup 称为[等离子体](/developers/docs/scaling/plasma/)。

## 合约代码 {#contract-code}

只需写入一次、永远不会被覆盖且需要在链上可用的信息可以存储为合约代码。这意味着我们使用数据创建一个“智能合约”，然后使用 [`EXTCODECOPY`](https://www.evm.codes/#3c?fork=shanghai) 来读取信息。其优点是复制代码相对便宜。

除了内存扩展的成本外，`EXTCODECOPY` 首次访问合约（当它是“冷”访问时）花费 2600 Gas，随后从同一合约复制花费 100 Gas，外加每 32 字节字 3 Gas。与每字节花费 15.95 Gas 的调用数据相比，从大约 200 字节开始，这种方式更便宜。根据[内存扩展成本公式](https://www.evm.codes/about#memoryexpansion)，只要你不需要超过 4MB 的内存，内存扩展成本就小于添加调用数据的成本。

当然，这只是_读取_数据的成本。创建合约的成本约为 32,000 Gas + 200 Gas/字节。只有当需要在不同的交易中多次读取相同的信息时，这种方法才经济。

合约代码可以是无意义的，只要它不以 `0xEF` 开头即可。以 `0xEF` 开头的合约被解释为[以太坊对象格式](https://notes.ethereum.org/@ipsilon/evm-object-format-overview)，它有更严格的要求。

## 事件 {#events}

[事件](https://docs.alchemy.com/docs/solidity-events)由智能合约发出，并由链下软件读取。
它们的优点是链下代码可以监听事件。成本是 [Gas](https://www.evm.codes/#a0?fork=cancun)，375 加上每字节数据 8 Gas。在 12 Gwei/Gas 和 2300 美元/ETH 的情况下，这相当于 1 美分加上每千字节 22 美分。

## 存储 {#storage}

智能合约可以访问[持久存储](https://docs.alchemy.com/docs/smart-contract-storage-layout#what-is-storage-memory)。然而，它非常昂贵。将一个 32 字节的字写入以前为空的存储时隙可能[花费 22,100 Gas](https://www.evm.codes/#55?fork=cancun)。在 12 Gwei/Gas 和 2300 美元/ETH 的情况下，每次写入操作约为 61 美分，或每千字节 19.5 美元。

这是以太坊中最昂贵的存储形式。

## 总结 {#summary}

下表总结了不同的选项及其优缺点。

| 存储类型                | 数据来源      | 可用性保证                                                                                                             | 链上可用性                                             | 附加限制                                                  |
| --------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------- |
| EIP-4844 blob              | 链下            | 以太坊保证 [~18 天](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/p2p-interface.md#configuration) | 仅哈希可用                                           |                                                                         |
| 调用数据                    | 链下            | 以太坊永久保证（区块链的一部分）                                                                                | 仅当写入合约并在该交易中才可用 |
| 具有一层网络 (l1) 机制的链下存储 | 链下            | 挑战期间的“一个诚实验证者”保证                                                                        | 仅哈希                                                        | 由挑战机制保证，仅在挑战期间 |
| 合约代码               | 链上或链下 | 以太坊永久保证（区块链的一部分）                                                                                | 是                                                              | 写入“随机”地址，不能以 `0xEF` 开头                 |
| 事件                      | 链上             | 以太坊永久保证（区块链的一部分）                                                                                | 否                                                               |
| 存储                     | 链上             | 以太坊永久保证（区块链和当前状态的一部分，直到被覆盖）                                        | 是                                                              |