---
title: 提出区块
description: 解释在权益证明以太坊中如何提议区块。
lang: zh
---

区块是区块链的基本单位。 区块是在节点之间传递、达成共识并添加到每个节点数据库中的离散的信息单元。 本页解释它们是如何产生的。

## 前提条件 {#prerequisites}

区块提议是权益证明协议的一部分。 为了帮助理解本页面，我们建议您阅读有关[权益证明](/developers/docs/consensus-mechanisms/pos/)和[区块架构](/developers/docs/blocks/)的内容。

## 谁产生区块？ {#who-produces-blocks}

验证者帐户提议区块。 验证者帐户由节点运营商管理，节点运营商运行验证者软件作为其执行和共识客户端的一部分，并且已经向存款合约中存入了至少 32 个以太币。 然而，每个验证者只是偶尔负责提议一个区块。 以太坊以时隙和时段来度量时间。 每个时隙是 12 秒，32 个时隙（6.4 分钟）组成一个时段。 每个时隙都是在以太坊上添加一个新区块的机会。

### 随机选择 {#random-selection}

在每个时隙以伪随机的方式选择一个验证者来提议区块。 在区块链中没有真正的随机性，因为如果每个节点生成真正的随机数，它们就无法达成共识。 相反，目的是使验证者的选择过程不可预测。 以太坊使用一种叫做 RANDAO 的算法来实现随机性，它将来自区块提议者的一个哈希与一个随每个区块更新的种子混合起来。 这个值用于所有验证者中选择一个特定的验证者。 验证者的选择提前两个时段固定，这是为了防范某些类型的种子操纵。

虽然验证者在每个时隙中都会向 RANDAO 添加内容，但全局 RANDAO 值仅在每个时段更新一次。 为了计算下一个区块提议者的索引，RANDAO 值在每个时隙与时隙号混合，以给出唯一的值。 单独验证者被选中的概率并不是简单的 `1/N`（其中 `N` = 活跃验证者的总数）。 相反，它是按照每个验证者的有效以太币余额进行加权的。 最大有效余额为 32 个以太币（这意味着 `balance < 32 ETH` 会产生低于 `balance == 32 ETH` 的权重，而 `balance > 32 ETH` 不会产生高于 `balance == 32 ETH` 的权重）。

每个时隙中只选择一个区块提议者。 在正常情况下，单个区块生产者会在他们专属的时隙中创建并发布单个区块。 为同一个时隙创建两个区块是一种可罚没的行为，通常被称为“模棱两可”。

## 区块是如何创建的？ {#how-is-a-block-created}

区块提议者预计会广播一个已签名的信标链区块，该区块建立在根据他们自己在本地运行的分叉选择算法所看到的最近链头之上。 分叉选择算法会应用上一个时隙留下的任何排队认证，然后在其历史记录中查找具有最大累积认证权重的区块。 该区块便是由提议者创建的新区块的父区块。

区块提议者通过从其自己的本地数据库和链视图中收集数据来创建区块。 区块的内容如下代码片段所示：

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

`randao_reveal` 字段取一个可验证的随机值，该值是区块提议者通过签署当前的时段编号创建的。 `eth1_data` 是就区块提议者对存款合约的看法进行的投票，包括存款默克尔树的根和使新存款能够被验证的总存款数。 `graffiti` 是一个可选字段，可以用来在区块中添加一条消息。 `proposer_slashings` 和 `attester_slashings` 字段包含了某些验证者根据区块提议者对链的看法已经犯下可罚没行为的证据。 `deposits` 是区块提议者所知道的新验证者存款的列表，`voluntary_exits` 是区块提议者从共识层广播网络上监听到的希望退出的验证者的列表。 `sync_aggregate` 是一个向量，显示哪些验证者之前被分配到一个同步委员会（服务于轻量客户端数据的验证者子集）并参与了数据签名。

`execution_payload` 使得关于交易的信息可以在执行和共识客户端之间传递。 `execution_payload` 是一个被嵌套在信标链区块内部的执行数据区块。 `execution_payload` 中的字段反映了以太坊黄皮书中概述的区块结构，只不过其中没有叔块，并且 `prev_randao` 取代了 `difficulty`。 执行客户端可以访问它在自己的广播网络上监听到的本地交易池。 这些交易在本地执行，以生成一个被称为“后状态”的更新的状态树。 这些交易被包括在 `execution_payload` 中名为 `transactions` 的列表中，后状态则在 `state-root` 字段中提供。

所有这些数据都被收集在一个信标链区块中，经过签名并广播给区块提议者的对等者，再由他们传播给他们的对等者，以此类推。

阅读更多关于[区块剖析](/developers/docs/blocks)的内容。

## 区块发生了什么？ {#what-happens-to-blocks}

区块被添加到区块提议者的本地数据库，并通过共识层广播网络广播给对等者。 当一个验证者接收到区块时，它会验证其中的数据，包括检查区块是否有正确的父区块、是否对应正确的时隙、提议者索引是否符合预期、RANDAO 揭示是否有效以及提议者是否被罚没。 `execution_payload` 被解包，验证者的执行客户端重新执行列表中的交易，以检查所提议的状态变化。 假设区块通过了所有这些检查，每个验证者将区块添加到自己的规范链中。 然后，在下一个时隙中重新开始这个过程。

## 区块奖励 {#block-rewards}

区块提议者会收到他们工作的报酬。 有一个 `base_reward`，它是根据活跃验证者的数量和他们的有效余额来计算的。 然后，区块提议者会收到区块中包含的每个有效认证的 `base_reward` 的一部分；认证区块的验证者越多，区块提议者获得的奖励就越高。 还有一个奖励是报告应该被罚没的验证者，数额等于每个被罚没的验证者的 `1/512 * effective balance`。

[关于奖励和惩罚的更多信息](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)

## 延伸阅读 {#further-reading}

- [区块简介](/developers/docs/blocks/)
- [权益证明简介](/developers/docs/consensus-mechanisms/pos/)
- [以太坊共识规范](www.github.com/ethereum/consensus-specs)
- [Gasper 简介](/developers/docs/consensus-mechanisms/pos/)
- [升级以太坊](https://eth2book.info/)
