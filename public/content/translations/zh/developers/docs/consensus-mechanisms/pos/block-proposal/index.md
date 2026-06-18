---
title: 区块提议
description: 解释在以太坊权益证明中如何提议区块。
lang: zh
---

区块是区块链的基本单位。区块是在节点之间传递、达成共识并添加到每个节点数据库的离散信息单元。本页面将解释它们是如何产生的。

## 前提条件 {#prerequisites}

区块提议是权益证明 (PoS) 协议的一部分。为了帮助理解本页面，我们建议你阅读有关[权益证明](/developers/docs/consensus-mechanisms/pos/)和[区块架构](/developers/docs/blocks/)的内容。

## 谁产生区块？ {#who-produces-blocks}

验证者账户提议区块。验证者账户由节点操作员管理，他们运行验证者软件作为其执行客户端和共识客户端的一部分，并且已经向存款合约存入了至少 32 个 ETH。然而，每个验证者只是偶尔负责提议区块。[以太坊](/)以时隙和时段来衡量时间。每个时隙为 12 秒，32 个时隙（6.4 分钟）组成一个时段。每个时隙都是在以太坊上添加新区块的机会。

### 随机选择 {#random-selection}

在每个时隙中，会伪随机地选择一个验证者来提议区块。区块链中不存在真正的随机性，因为如果每个节点都生成真正的随机数，它们就无法达成共识。相反，其目的是使验证者选择过程不可预测。以太坊上的随机性是通过一种名为 RANDAO 的算法实现的，该算法将来自区块提议者的哈希与每个区块更新的种子混合在一起。该值用于从总验证者集中选择特定的验证者。验证者的选择会提前两个时段固定下来，以此作为防止某些类型的种子操纵的保护措施。

尽管验证者在每个时隙都会向 RANDAO 添加数据，但全局 RANDAO 值每个时段仅更新一次。为了计算下一个区块提议者的索引，RANDAO 值与时隙编号混合，从而在每个时隙中给出一个唯一值。单个验证者被选中的概率并非简单的 `1/N`（其中 `N` = 活跃验证者总数）。相反，它是根据每个验证者的有效 ETH 余额进行加权的。最大有效余额为 32 个 ETH（这意味着 `balance < 32 ETH` 的权重低于 `balance == 32 ETH`，但 `balance > 32 ETH` 的权重不会高于 `balance == 32 ETH`）。

每个时隙只选择一个区块提议者。在正常情况下，单个区块生产者在其专用时隙中创建并发布单个区块。为同一个时隙创建两个区块是一种可罚没的违规行为，通常被称为“双签”。

## 区块是如何创建的？ {#how-is-a-block-created}

区块提议者需要广播一个签名的信标区块，该区块根据其本地运行的分叉选择算法的视图，构建在链的最新头部之上。分叉选择算法应用上一个时隙遗留下来的任何排队证明，然后找到其历史记录中累积证明权重最大的区块。该区块就是提议者创建的新区块的父区块。

区块提议者通过从其本地数据库和链视图中收集数据来创建区块。区块的内容如下面的代码片段所示：

```rust
class BeaconBlockBody(Container):
    randao_reveal: BLSSignature
    eth1_data: Eth1Data
    graffiti: Bytes32
    proposer_slashings: List[ProposerSlashing, MAX_PROPOSER_SLASHINGS]
    attester_slashings: List[AttesterSlashing, MAX_ATTESTER_SLASHINGS]
    attestations: List[Attestation, MAX_ATTESTATIONS]
    deposits: List[Deposit, MAX_DEPOSITS]
    voluntary_exits: List[SignedVoluntaryExit, MAX_VOLUNTARY_EXITS]
    sync_aggregate: SyncAggregate
    execution_payload: ExecutionPayload
```

`randao_reveal` 字段采用一个可验证的随机值，该值由区块提议者通过对当前时段编号进行签名来创建。`eth1_data` 是对区块提议者关于存款合约视图的投票，包括存款默克尔树的根以及使新存款能够被验证的存款总数。`graffiti` 是一个可选字段，可用于向区块添加消息。`proposer_slashings` 和 `attester_slashings` 字段包含根据提议者的链视图，某些验证者犯下可罚没违规行为的证明。`deposits` 是区块提议者已知的新验证者存款列表，而 `voluntary_exits` 是区块提议者在共识层八卦网络上听说的希望退出的验证者列表。`sync_aggregate` 是一个向量，显示哪些验证者之前被分配到同步委员会（为轻客户端数据提供服务的验证者子集）并参与了数据签名。

`execution_payload` 使得有关交易的信息能够在执行客户端和共识客户端之间传递。`execution_payload` 是嵌套在信标区块内的一块执行数据。`execution_payload` 内的字段反映了以太坊黄皮书中概述的区块结构，不同之处在于没有叔块 (ommers)，并且存在 `prev_randao` 代替了 `difficulty`。执行客户端可以访问其在自己的八卦网络上听说的本地交易池。这些交易在本地执行，以生成称为后状态 (post-state) 的更新状态树。这些交易作为名为 `transactions` 的列表包含在 `execution_payload` 中，而后状态则提供在 `state-root` 字段中。

所有这些数据都被收集在一个信标区块中，进行签名，并广播给区块提议者的对等节点，后者再将其传播给他们的对等节点，依此类推。

阅读更多关于[区块剖析](/developers/docs/blocks)的内容。

## 区块会发生什么？ {#what-happens-to-blocks}

区块被添加到区块提议者的本地数据库中，并通过共识层八卦网络广播给对等节点。当验证者收到区块时，它会验证其中的数据，包括检查区块是否具有正确的父区块、是否对应于正确的时隙、提议者索引是否符合预期、RANDAO 揭示是否有效以及提议者是否未被罚没。`execution_payload` 被解包，验证者的执行客户端重新执行列表中的交易，以检查提议的状态更改。假设区块通过了所有这些检查，每个验证者都会将该区块添加到自己的规范链中。然后，该过程在下一个时隙中重新开始。

## 区块奖励 {#block-rewards}

区块提议者会因其工作获得报酬。有一个 `base_reward`，它是根据活跃验证者的数量及其有效余额计算得出的函数。然后，区块提议者会为区块中包含的每个有效证明获得一小部分 `base_reward`；证明该区块的验证者越多，区块提议者的奖励就越大。举报应被罚没的验证者也会获得奖励，每罚没一个验证者，奖励等于 `1/512 * effective balance`。

[更多关于奖励和惩罚的内容](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)

## 进一步阅读 {#further-reading}

- [区块简介](/developers/docs/blocks/)
- [权益证明简介](/developers/docs/consensus-mechanisms/pos/)
- [以太坊共识规范](https://github.com/ethereum/consensus-specs)
- [Gasper 简介](/developers/docs/consensus-mechanisms/pos/gasper/)
- [升级以太坊](https://eth2book.info/)