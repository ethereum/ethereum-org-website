---
title: 用于一层网络 (l1) 区块验证的 zkEVM
description: 了解零知识证明如何验证以太坊区块执行，从而实现更高的吞吐量并降低验证者硬件要求。
lang: zh
---

zkEVM 是一种使用[零知识证明](/zero-knowledge-proofs/)来验证以太坊区块执行的技术。它不需要每个[验证者](/glossary/#validator)重新执行区块中的所有交易，而是由一个专门的参与者（称为“证明者”）执行区块并生成密码学证明，以证明执行是正确的。然后，任何节点都可以验证此证明——这个过程比重新执行所有交易的成本要低几个数量级。

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>不要与 zkEVM 汇总混淆</AlertTitle>
<AlertDescription>
本页面讨论的是使用 zkEVM 验证以太坊一层网络 (l1) 区块执行。对于使用 ZK 证明作为二层网络 (l2) 解决方案来扩容以太坊的 zkEVM 汇总，请参阅[零知识汇总](/developers/docs/scaling/zk-rollups/)。
</AlertDescription>
</AlertContent>
</Alert>

## 重新执行问题 {#reexecution-problem}

如今，以太坊使用“N 分之 N”验证模型：每个验证者必须独立重新执行每个区块中的每笔交易，以验证提议的状态更改是否正确。虽然这种方法最大程度地实现了无须信任，但它也造成了根本性的瓶颈。

问题在于，以太坊的吞吐量受限于普通验证者的处理能力。提高 [gas 上限](/glossary/#gas-limit)将允许每个区块包含更多交易，但这也会提高对验证者的硬件要求。这威胁到了去中心化——如果运行验证者需要昂贵的硬件，那么能够参与保护网络安全的人就会减少。

zkEVM 提供了一种摆脱这种权衡的方法。通过从“每个人都重新执行”转变为“一人证明，所有人验证”，以太坊可以安全地提高 gas 上限，而无需提高验证者的硬件要求。

## zkEVM 一层网络 (l1) 验证的工作原理 {#how-it-works}

zkEVM 验证将区块验证转变为“N 分之 1”模型：

1. **执行**：证明者执行区块中的所有交易，跟踪每个状态更改
2. **证明**：证明者生成一个密码学证明（[SNARK 或 STARK](/zero-knowledge-proofs/#types-of-zero-knowledge-proofs)），以证明执行的正确性
3. **验证**：验证者验证证明而不是重新执行交易——这比完全重新执行要便宜得多

安全保证保持不变：如果执行不正确，则无法生成有效的证明。但现在，不再是每个节点都进行昂贵的计算，而是只有证明者进行计算——并且验证的成本足够低，不会对 gas 上限造成限制。

### 类型 1 zkEVM {#type-1-zkevm}

zkEVM 根据其与以太坊的兼容性分为不同类型：

- **类型 1**：完全等效于以太坊。不对 EVM 进行任何修改，因此可以完全按原样证明任何以太坊区块
- **类型 2-4**：做出各种权衡，修改 EVM 行为以使证明更容易

对于一层网络 (l1) 验证，类型 1 是必不可少的。zkEVM 必须能够证明任何有效的以太坊区块，包括边缘情况和历史区块。任何偏离以太坊确切行为的情况都会产生共识问题。

以太坊基金会的 zkEVM 研究侧重于与现有以太坊执行完全兼容的类型 1 实现。

## 对以太坊的好处 {#benefits}

### 更高的吞吐量 {#higher-throughput}

当验证成本较低时，可以安全地提高 gas 上限。这扩大了网络容量，并有助于在需求高峰期稳定费用。当前的 gas 上限部分受限于验证者硬件——zkEVM 消除了这一限制。

### 更强的去中心化 {#stronger-decentralization}

通过 zkEVM 验证，验证者只需验证证明，而无需执行交易。这极大地降低了运行验证者的硬件要求，使更多人能够参与保护网络安全。更大的验证者多样性增强了以太坊的抗审查性和弹性。

请注意，证明本身需要大量的计算资源，高于当前验证者硬件的要求。然而，与验证不同，证明不需要以同样的方式去中心化：每个区块只需要一个正确的证明，任何人都可以快速验证它。对证明者市场、证明聚合和硬件加速的研究旨在确保证明保持竞争力和可访问性，而不是集中在少数大型运营商手中。

### 可预测的最终性 {#predictable-finality}

无论区块复杂程度如何，证明验证都在恒定时间内运行。这使得证明时间更加可预测，并减少了当验证者难以按时处理复杂区块时可能发生的错过证明的情况。

## 实时证明挑战 {#realtime-proving}

zkEVM 一层网络 (l1) 验证的主要挑战是速度。以太坊区块每 12 秒生成一次，这意味着证明需要在类似的时间范围内生成，才能对共识有用。

当前的 zkEVM 实现可能需要几分钟到几个小时才能证明单个区块。研究重点是通过以下方式缩小这一差距：

- **并行化**：将证明工作分配到多台机器上
- **专用硬件**：设计针对 ZK 证明优化的电路和硬件
- **算法改进**：更高效的证明系统和电路设计
- **增量证明**：在交易执行时生成证明，而不是在执行之后

## 当前研究与实现 {#current-research}

以太坊基金会通过[以太坊隐私守护者 (PSE)](https://pse.dev/) 团队资助 zkEVM 研究。主要研究方向包括：

- **实时证明**：在 12 秒的时隙内生成完整的区块证明
- **客户端集成**：标准化执行客户端和证明者之间的接口
- **经济激励**：设计可持续的证明者市场和费用结构

### 实现状态 {#implementations}

目前正在开发和测试几种用于以太坊区块证明的 zkVM 实现：

| 实现 | 架构 |
|----------------|--------------|
| [OpenVM](https://github.com/openvm-org/openvm) | rv32im |
| [RISC Zero](https://github.com/risc0/risc0) | rv32im |
| [Airbender](https://github.com/matter-labs/zksync-airbender) | rv32im |
| [Jolt](https://github.com/a16z/jolt) | rv32im |
| [Zisk](https://github.com/0xPolygonHermez/zisk) | rv64ima |

这些实现使用基于 RISC-V 的虚拟机来执行 EVM 字节码，然后生成正确执行的 ZK 证明。最新的测试结果和进度在[以太坊基金会的 zkVM 跟踪器](https://zkevm.ethereum.foundation/zkvm-tracker)中进行跟踪。

## zkEVM 如何与其他升级相配合 {#related-upgrades}

zkEVM 一层网络 (l1) 验证与以太坊路线图中的其他几个项目相关联：

- **[沃克尔树](/roadmap/verkle-trees/)**：为无状态验证启用更小的见证数据，减少证明者需要处理的数据量
- **[无状态](/roadmap/statelessness/)**：zkEVM 是一个关键的促成因素——有了执行的 ZK 证明，节点不需要完整状态即可验证区块
- **[提议者-构建者分离 (PBS)](/roadmap/pbs/)**：区块构建者可能会集成证明生成，或者可能会出现一个独立的证明者市场
- **[单槽最终性](/roadmap/single-slot-finality/)**：更快的证明生成可以通过密码学保证实现单槽最终性

<Alert variant="warning">
<AlertEmoji text="🧪" />
<AlertContent>
<AlertDescription>
zkEVM 一层网络 (l1) 验证正处于积极研究阶段，尚未集成到生产环境的以太坊客户端中。
</AlertDescription>
</AlertContent>
</Alert>

## 延伸阅读 {#further-reading}

- [zkEVM Foundation](https://zkevm.ethereum.foundation) - 官方以太坊基金会 zkEVM 研究中心
- [Ethproofs](https://ethproofs.org/) - 跟踪实时证明以太坊的竞赛
- [zkevm.fyi](https://zkevm.fyi) - 关于一层网络 (l1) zkEVM 的技术书籍
- [PSE zkEVM 规范](https://github.com/privacy-scaling-explorations/zkevm-specs) - 技术规范
- [The Verge](https://vitalik.eth.limo/general/2024/10/23/futures4.html) - Vitalik 对验证改进的概述
- [以太坊基金会 zkEVM 博客](https://zkevm.ethereum.foundation/blog) - 来自以太坊基金会团队的性能分析