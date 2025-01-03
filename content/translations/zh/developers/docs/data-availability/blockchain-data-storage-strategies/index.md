---
title: 区块链数据存储策略
description: 有几种使用区块链储存数据的方式。 本文将比较不同的策略、它们的费用和权衡，以及安全使用策略的要求。
lang: zh
---

有多种通过区块链储存信息的方式，不论是直接在区块链上储存，或是用区块链保护信息安全：

- EIP-4844 二进制大对象
- 调用数据
- 具有一层网络机制的链下
- 合约“代码”
- 事件
- 以太坊虚拟机存储

使用方法的选择基于几个标准：

- 信息来源。 调用数据中的信息不能直接来自区块链本身。
- 信息目的地。 Calldata 仅在其发起的交易中可用。 链上完全无法访问事件。
- 能够接受多少麻烦？ 相比在浏览器内运行的应用程序中的轻客户端，运行全节点的计算机能够执行更多处理。
- 是否有必要使来自每个节点的信息易于访问？
- 安全要求。

## 安全要求 {#security-requirements}

一般情况下，信息安全由三个属性组成：

- _保密性_，使未经授权的实体无法读取信息。 这在许多情况下很重要，但在这里不重要。 _区块链上没有秘密_。 区块链因任何人都能验证状态转换而得以运作，所以，直接使用区块链来储存秘密是不可行的。 有几种方法可以在区块链上储存保密信息，但它们都依赖一些链下组成部分来储存至少一个密钥。

- _完整性_，使信息保持正确，并且无法被未授权的实体或以未授权的方式改变（例如，在缺少 'Transfer' 事件的情况下转移 [ERC-20 代币](https://eips.ethereum.org/EIPS/eip-20#events)）。 在区块链上，每个节点都会验证每个状态更改，从而确保了完整性。

- _可用性_，使信息可供任何已获授权的实体使用。 在区块链上，这常常通过使信息对每个[全节点](https://ethereum.org/developers/docs/nodes-and-clients#full-node)可用来实现。

这里的不同解决方案全都具有出色的完整性，因为哈希被发布在一层网络上。 但是，它们的可用性保证确实有所不同。

## 前提条件 {#prerequisites}

你应该充分理解[区块链基础知识](/developers/docs/intro-to-ethereum/)。 本页面还假设读者熟悉[区块](/developers/docs/blocks/)、[交易](/developers/docs/transactions/)和其他相关主题。

## EIP-4844 二进制大对象 {#eip-4844-blobs}

从 [Dencun 硬分叉](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/beacon-chain.md)开始，以太坊区块链包含了 [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844)，这为以太坊数据二进制大对象增加了有限的生命期（最初约为 [18 天](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration)）。 这些二进制大对象与[执行燃料](/developers/docs/gas)分开定价，尽管它们使用类似的机制。 它们是一种发布临时数据的低成本方式。

EIP-4844 二进制大对象的主要使用案例是供卷叠发布其交易。 [乐观卷叠](/developers/docs/scaling/optimistic-rollups)需要在其区块链上发布交易。 那些交易必须在[质询期](https://docs.optimism.io/connect/resources/glossary#challenge-period)内对所有人可用，以便在卷叠[排序者](https://docs.optimism.io/connect/resources/glossary#sequencer)发布错误的状态根时，[验证者](https://docs.optimism.io/connect/resources/glossary#validator)能够修复错误。

然而，一旦质询期结束并且状态根被最终确定，了解这些交易的目的就只剩下复制链的当前状态。 该状态也能从链节点获得，并且需要的处理要少得多。 因此，交易信息仍应保留在一些地方，比如[区块浏览器](/developers/docs/data-and-analytics/block-explorers)，但无需偿付以太坊提供的抗审查水平。

[零知识卷叠](/developers/docs/scaling/zk-rollups/#data-availability)也会发布其交易数据，以便其他节点能够复制现有状态并验证有效性证明，但这同样也是一个短期要求。

撰写本文时，在 EIP-4844 上发布的每个字节需要花费 1 wei（10<sup>-18</sup> 个以太币），相较于[任何交易（包括发布二进制大对象的交易在内）都会花费的 21,000 执行燃料](https://eth.blockscout.com/tx/0xf6cfaf0431c73dd1d96369a5e6707d64f463ccf477a4131265397f1d81466929?tab=index)，该费用微不足道。 你可以在 [blobscan.com](https://blobscan.com/blocks) 上查看当前 EIP-4844 价格。

在以下地址可以查看一些知名卷叠发布的二进制大对象。

| 卷叠                                   | 邮箱地址                                                                                                                    |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://blobscan.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://blobscan.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://blobscan.com/address/0xFF00000000000000000000000000000000008453) |

## 调用数据 {#calldata}

调用数据是指作为交易一部分发送的字节。 它作为区块链永久记录的一部分，被储存在包含该交易的区块中。

这是将数据永久放在区块链上最便宜的方法。 每个字节的费用为 4 执行燃料（如果字节为 0） 或 16 执行燃料（如果字节为任意其他值）。 如果数据经过压缩（这是标准做法），则每个字节的值几乎相等，所以每个字节的平均费用约为 15.95 燃料。

撰写本文时的价格为 12 Gwei/燃料（2300 美元/以太币），这意味着每个字节的费用约为 45 美分。 由于这是 EIP-4844 之前最便宜的方法，卷叠使用此方法来储存交易信息，这些交易信息必须在[缺陷质询期](https://docs.optimism.io/stack/protocol/overview#fault-proofs)内可用，但无需直接在链上访问。

在以下地址可以查看一些知名卷叠发布的交易。

| 卷叠                                   | 邮箱地址                                                                                                                          |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://eth.blockscout.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000008453) |

## 具有一层网络机制的链下 {#offchain-with-l1-mechs}

根据你的安全权衡，将信息放在其他位置并使用一种可确保数据在需要时可用的机制，或许是可以接受的做法。 要实现这一点，有两个要求:

1. 将一个数据的[哈希](https://en.wikipedia.org/wiki/Cryptographic_hash_function)发布在区块链上，这被称为“_输入承诺_”。 这可以是单个 32 字节的单词，因此并不昂贵。 只要输入承诺可用，完整性就能得到保证，因为不可能找到任何其他数据具有相同的哈希值。 因此，提供错误的数据会被检测出来。

2. 拥有一种确保可用性的机制。 例如，在 [Redstone](https://redstone.xyz/docs/what-is-redstone) 中，任何节点都能提交可用性质询。 如果排序者未能在截止时间前在链上回应，输入承诺就会被丢弃，因此信息会被视为从未被发布过

这对于乐观卷叠来说是可接受的，因为我们已经依赖于拥有至少一名诚实的验证者来验证状态根。 这样的诚实验证者还将确保拥有处理区块所需的数据，并在链下信息不可用时提出可用性质询。 这种乐观卷叠被称为 [plasma](/developers/docs/scaling/plasma/)。

## 合约代码 {#contract-code}

那些只需写入一次便永远不会被覆盖，并且需要在链上可用的信息可作为合约代码储存。 这意味着我们会创建一个带有数据的“智能合约”，然后使用 [`EXTCODECOPY`](https://www.evm.codes/#3c?fork=shanghai) 来读取信息。 这样做的优势是复制代码相对便宜。

除了内存扩展的费用之外，`EXTCODECOPY` 在首次访问合约时（当它处于“冷”状态时）还需要花费 2600 燃料，后续从相同合约进行复制需要 100 燃料 + 3 燃料/32 字节单词。 与调用数据的花费（15.95 燃料每字节）相比，200 字节以上的数据使用合约代码会更便宜。 基于[内存扩展成本公式](https://www.evm.codes/about#memoryexpansion)，只要你需要的内存不大于 4MB，内存扩展的花费就会低于添加调用数据。

当然，这只是“_读取_”数据的花费。 创建合约的花费约为 32,000 燃料 + 200 燃料/字节。 这个方法只有在相同信息需要被不同交易多次读取时才是经济的。

合约代码可以是无意义的，只要不以 `0xEF` 开头。 以 `0xEF` 开头的合约会被解释为[以太坊对象格式](https://notes.ethereum.org/@ipsilon/evm-object-format-overview)，该格式有更加严格的要求。

## 事件 {#events}

[事件](https://docs.alchemy.com/docs/solidity-events)由智能合约触发，并由链下软件读取。
它们的优势是链下代码可以侦听事件。 成本为[燃料](https://www.evm.codes/#a0?fork=cancun)，375 燃料 + 8 燃料/数据字节。 在 12 Gwei/燃料和 2300 美元/以太币的情况下，该费用相当于 1 美分 + 22 美分/千字节。

## 存储 {#storage}

智能合约能够访问[永久存储](https://docs.alchemy.com/docs/smart-contract-storage-layout#what-is-storage-memory)。 但这非常昂贵。 将一个 32 字节的单词写入一个先前为空的储存时隙会[花费 22,100 燃料](https://www.evm.codes/#55?fork=cancun)。 在 12 Gwei/燃料和 2300 美元/以太币的情况下，该费用相当于 61 美分/写入操作，即 19.5 美元/千字节。

这是以太坊上最昂贵的存储方式。

## 总结 {#summary}

下表总结了各种选项、它们的优势与劣势。

| 存储类型            | 数据来源  | 可用性保证                                                                                                          | 链上可用性          | 其他限制                     |
| --------------- | ----- | -------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------ |
| EIP-4844 二进制大对象 | 链下    | 由以太坊保证 [18 天](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration) | 仅哈希可用          |                          |
| 调用数据            | 链下    | 由以太坊永久保证（区块链的一部分）                                                                                              | 只有被写入合约时于该交易可用 |                          |
| 具有一层网络机制的链下     | 链下    | 在质询期内由“一名诚实的验证者”保证                                                                                             | 仅哈希可用          | 仅在质询期内由质询机制提供保证          |
| 合约代码            | 链上或链下 | 由以太坊永久保证（区块链的一部分）                                                                                              | 是              | 写入到一个不以 `0xEF` 开头的“随机”地址 |
| 事件              | 链上    | 由以太坊永久保证（区块链的一部分）                                                                                              | 否              |                          |
| 存储              | 链上    | 由以太坊永久保证（区块链的一部分，并保持当前状态直至被覆盖）                                                                                 | 是              |                          |
