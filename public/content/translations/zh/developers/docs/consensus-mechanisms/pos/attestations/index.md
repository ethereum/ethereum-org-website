---
title: "证明"
description: "以太坊权益证明机制中的证明简介。"
lang: zh
---

验证者需要在每个时段创建、签名并广播一个证明。本页面概述了这些证明的结构，以及它们在共识客户端之间是如何处理和通信的。

## 什么是证明？ {#what-is-an-attestation}

验证者在每个[时段](/glossary/#epoch)（6.4 分钟）向网络广播一个证明。该证明针对时段中的特定时隙。证明的目的是支持验证者对链的视图进行投票，特别是链的头部、最近的已证明检查点以及当前时段开始时的检查点（称为 `source` 和 `target` 检查点）。这些信息将所有参与的验证者结合起来，使网络能够就区块链的状态达成共识。

自[佩克特拉升级](/roadmap/pectra/)（[EIP-7549](https://eips.ethereum.org/EIPS/eip-7549)）以来，单个验证者的证明和聚合证明具有不同的格式。单个验证者的证明包含：

- `committee_index`：验证者在给定时隙中所属的委员会
- `attester_index`：验证者的索引
- `data`：与证明相关的详细信息，定义如下
- `signature`：验证者对 `data` 的 BLS 签名

证明验证者的首要任务是构建 `data`。`data` 包含以下信息：

- `slot`：证明所指的时隙编号
- `index`：自佩克特拉以来设置为 `0`。委员会在 `data` 外部标识（通过 `committee_index`，或在聚合中通过 `committee_bits`），以便来自不同委员会的投票具有相同的 `data` 并可以聚合在一起。在佩克特拉之前，此字段用于标识委员会
- `beacon_block_root`：验证者在链的头部看到的区块的根哈希（应用分叉选择算法的结果）
- `source`：最终性投票的一部分，指示验证者所看到的最近的已证明检查点
- `target`：最终性投票的一部分，指示验证者所看到的当前时段开始时的检查点（其第一个时隙的区块，如果该时隙为空，则为它之前的最新区块）

一旦构建了 `data`，验证者就会对其进行签名，并将证明广播到其委员会的[子网](#aggregated-attestation)。

### 聚合证明 {#aggregated-attestation}

为每个验证者在网络中传递这些数据会产生巨大的开销。因此，单个验证者的证明在被更广泛地广播之前，会在子网内进行聚合。这包括将签名聚合在一起，以便广播的证明包含共识 `data` 以及由同意该 `data` 的所有验证者的签名组合而成的单一签名。聚合证明包含：

- `aggregation_bits`：一个位列表，每个包含的委员会的每个成员占一位，其中位置映射到验证者在其委员会中的位置；值 (0/1) 指示是否包含了该验证者的签名
- `data`：每个包含的验证者签名的证明数据
- `signature`：聚合了包含的验证者签名的 BLS 签名
- `committee_bits`：`aggregation_bits` 涵盖了哪些委员会的成员

任何人都可以根据位被设置的验证者的组合公钥来检查聚合签名。

在每个时隙中，每个委员会大约有 16 名成员被选为其 `aggregators`（`TARGET_AGGREGATORS_PER_COMMITTEE`）。验证者通过自己对时隙编号的签名来了解自己是否被选中。聚合者收集他们在委员会子网上听到的所有与自己具有相同 `data` 的证明，并将它们组合起来，在 `aggregation_bits` 中记录每个证明的发送者。然后，聚合者将聚合结果广播到更广泛的网络。

当验证者被选为区块提议者时，他们会在新区块中包含来自最近时隙的聚合证明。自佩克特拉以来，提议者可以将来自共享相同 `data` 的不同委员会的聚合合并为一个证明，一个区块最多可以容纳 8 个这样的证明。

### 证明包含生命周期 {#attestation-inclusion-lifecycle}

1. 生成
2. 传播
3. 聚合
4. 传播
5. 包含

证明生命周期在下面的示意图中概述：

<AttestationsDiagram />

## 奖励 {#rewards}

验证者因提交证明而获得奖励。证明奖励取决于参与标志（来源、目标和头部）、基础奖励和参与率。

每个参与标志可以是真或假，具体取决于提交的证明及其包含延迟。

最好的情况是所有三个标志都为真，在这种情况下，验证者将获得（每个正确的标志）：

`reward += base reward * flag weight * flag attesting rate / 64`

标志证明率是通过比较给定标志的所有证明验证者的有效余额总和与总活跃有效余额来衡量的。

### 基础奖励 {#base-reward}

基础奖励是根据证明验证者的数量及其质押的以太币有效余额计算的：

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### 包含延迟 {#inclusion-delay}

当验证者对链的头部（`block n`）进行投票时，`block n+1` 尚未被提议。因此，证明自然会**晚一个区块**被包含，所以所有投票支持 `block n` 为链头部的证明都被包含在 `block n+1` 中，并且**包含延迟**为 1。包含延迟决定了证明获得哪些参与标志：

- `head`：仅当包含延迟恰好为 1 个时隙时
- `source`：如果包含延迟最多为 5 个时隙（一个时段中 32 个时隙的整数平方根）
- `target`：只要证明被包含（自 Deneb 升级以来，[EIP-7045](https://eips.ethereum.org/EIPS/eip-7045)）

因此，晚两个时隙包含的证明会失去其头部奖励，但仍能获得来源和目标奖励。

### 证明场景 {#attestation-scenarios}

#### 缺失投票验证者 {#missing-voting-validator}

证明可以包含在从其生成后的时隙到下一个时段结束的任何区块中。如果时段 0 的证明未包含在时段 0 期间的区块中，它仍然可以包含在时段 1 中，但包含延迟会更长。

#### 缺失聚合者 {#missing-aggregator}

每个委员会的目标是在每个时隙中拥有大约 16 个聚合者，因此缺少一个聚合者很少会阻止委员会的证明被聚合。另外，每个信标节点每次都会根据其节点 ID 选择**订阅两个子网，持续 256 个时段**，这使得每个子网都保持良好的连接。

#### 缺失区块提议者 {#missing-block-proposer}

请注意，在某些情况下，幸运的聚合者也可能成为区块提议者。如果由于区块提议者缺失而未包含证明，下一个区块提议者将获取聚合证明并将其包含在下一个区块中。但是，**包含延迟**将增加一。

## 延伸阅读 {#further-reading}

- [Vitalik 注释的共识规范中的证明](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [eth2book.info 中的证明](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)
- [Electra 共识规范中的证明](https://github.com/ethereum/consensus-specs/blob/master/specs/electra/beacon-chain.md#attestation)

_知道有什么社区资源对您有帮助吗？编辑本页面并添加它！_
