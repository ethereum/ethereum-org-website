---
title: Validium
description: "介绍以太坊社区目前使用的扩容解决方案 Validium。"
lang: zh
sidebarDepth: 3
---

Validium 是一种[扩容解决方案](/developers/docs/scaling/)，它像 [ZK-rollup](/developers/docs/scaling/zk-rollups/) 一样使用有效性证明来强制执行交易的完整性，但不会将交易数据存储在[以太坊](/)主网上。虽然链下数据可用性带来了一些权衡，但它可以大幅提高可扩展性（Validium 每秒可以处理[约 9,000 笔或更多交易](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)）。

## 前提条件 {#prerequisites}

你应该已经阅读并理解了我们关于[以太坊扩容](/developers/docs/scaling/)和[二层网络 (l2)](/layer-2) 的页面。

## 什么是 Validium？ {#what-is-validium}

Validium 是一种扩容解决方案，它使用链下数据可用性和计算，旨在通过在以太坊主网之外处理交易来提高吞吐量。与零知识汇总 (ZK-rollup) 一样，Validium 发布[零知识证明](/glossary/#zk-proof)以在以太坊上验证链下交易。这可以防止无效的状态转换，并增强 Validium 链的安全保障。

这些“有效性证明”可以采用 ZK-SNARKs（零知识简洁非交互式知识论证）或 ZK-STARKs（零知识可扩展透明知识论证）的形式。了解更多关于[零知识证明](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)的信息。

属于 Validium 用户的资金由以太坊上的智能合约控制。Validium 提供近乎即时的提款，就像 ZK-rollup 一样；一旦提款请求的有效性证明在主网上得到验证，用户就可以通过提供[默克尔证明](/developers/tutorials/merkle-proofs-for-offline-data-integrity/)来提取资金。默克尔证明验证了用户的提款交易包含在已验证的交易批次中，从而允许链上合约处理提款。

然而，Validium 用户的资金可能会被冻结，提款也可能受到限制。如果 Validium 链上的数据可用性管理者向用户隐瞒链下状态数据，就会发生这种情况。如果没有访问交易数据的权限，用户就无法计算证明资金所有权和执行提款所需的默克尔证明。

这是 Validium 和 ZK-rollup 之间的主要区别——它们在数据可用性范围内的位置不同。这两种解决方案处理数据存储的方式不同，这对安全性和去信任化有影响。

## Validium 如何与以太坊交互？ {#how-do-validiums-interact-with-ethereum}

Validium 是构建在现有以太坊链之上的扩容协议。虽然它在链下执行交易，但 Validium 链由部署在主网上的智能合约集合管理，包括：

1. **验证者合约**：验证者合约在进行状态更新时，验证 Validium 运营商提交的证明的有效性。这包括证明链下交易正确性的有效性证明，以及验证链下交易数据存在的数据可用性证明。

2. **主合约**：主合约存储区块生产者提交的状态承诺（默克尔根），并在有效性证明在链上得到验证后更新 Validium 的状态。该合约还处理 Validium 链的存款和提款。

Validium 还依赖以太坊主链来实现以下功能：

### 结算 {#settlement}

在 Validium 上执行的交易在父链验证其有效性之前无法完全确认。在 Validium 上进行的所有业务最终都必须在主网上结算。以太坊区块链还为 Validium 用户提供“结算保证”，这意味着链下交易一旦提交到链上，就无法撤销或更改。

### 安全性 {#security}

以太坊作为结算层，也保证了 Validium 上状态转换的有效性。在 Validium 链上执行的链下交易通过以太坊基础层上的智能合约进行验证。

如果链上验证者合约认为证明无效，则交易将被拒绝。这意味着运营商在更新 Validium 的状态之前，必须满足以太坊协议强制执行的有效性条件。

## Validium 是如何工作的？ {#how-does-validium-work}

### 交易 {#transactions}

用户将交易提交给运营商，运营商是负责在 Validium 链上执行交易的节点。一些 Validium 可能会使用单一运营商来执行链，或者依赖[权益证明 (PoS)](/developers/docs/consensus-mechanisms/pos/) 机制来轮换运营商。

运营商将交易聚合成一个批次，并将其发送到证明电路进行证明。证明电路接受交易批次（以及其他相关数据）作为输入，并输出一个有效性证明，验证操作是否正确执行。

### 状态承诺 {#state-commitments}

Validium 的状态被哈希为一棵默克尔树，其根存储在以太坊的主合约中。默克尔根（也称为状态根）充当对 Validium 上账户和余额当前状态的密码学承诺。

要执行状态更新，运营商必须（在执行交易后）计算一个新的状态根，并将其提交给链上合约。如果有效性证明验证通过，则提议的状态被接受，Validium 切换到新的状态根。

### 存款和提款 {#deposits-and-withdrawals}

用户通过在链上合约中存入 ETH（或任何兼容 ERC 的代币），将资金从以太坊转移到 Validium。合约将存款事件中继到链下的 Validium，在链下，用户的地址将记入与其存款相等的金额。运营商还将此存款交易包含在一个新批次中。

要将资金转回主网，Validium 用户发起提款交易并将其提交给运营商，运营商验证提款请求并将其包含在一个批次中。用户在 Validium 链上的资产在退出系统之前也会被销毁。一旦与该批次相关的有效性证明得到验证，用户就可以调用主合约来提取其初始存款的剩余部分。

作为一种抗审查机制，Validium 协议允许用户直接从 Validium 合约中提款，而无需经过运营商。在这种情况下，用户需要向验证者合约提供默克尔证明，以证明账户包含在状态根中。如果证明被接受，用户可以调用主合约的提款功能，将其资金从 Validium 中退出。

### 批次提交 {#batch-submission}

在执行一批交易后，运营商将相关的有效性证明提交给验证者合约，并向主合约提议一个新的状态根。如果证明有效，主合约将更新 Validium 的状态，并最终确定该批次中交易的结果。

与 ZK-rollup 不同，Validium 上的区块生产者不需要发布交易批次的交易数据（仅发布区块头）。这使得 Validium 成为一种纯粹的链下扩容协议，而不是使用斑点数据、`calldata` 或两者结合在以太坊主链上发布状态数据的“混合”扩容协议（即[二层网络 (l2)](/layer-2/)）。

### 数据可用性 {#data-availability}

如前所述，Validium 利用链下数据可用性模型，运营商将所有交易数据存储在以太坊主网之外。Validium 较低的链上数据占用空间提高了可扩展性（吞吐量不受以太坊数据处理能力的限制），并降低了用户费用（在链上发布数据的成本较低）。

然而，链下数据可用性带来了一个问题：创建或验证默克尔证明所需的数据可能不可用。这意味着如果运营商恶意行事，用户可能无法从链上合约中提取资金。

各种 Validium 解决方案试图通过去中心化状态数据的存储来解决这个问题。这涉及强制区块生产者将底层数据发送给“数据可用性管理者”，这些管理者负责存储链下数据并在用户请求时提供数据。

Validium 中的数据可用性管理者通过对每个 Validium 批次进行签名，来证明链下交易数据的可用性。这些签名构成了一种“可用性证明”，链上验证者合约在批准状态更新之前会检查该证明。

Validium 在数据可用性管理的方法上有所不同。一些依赖受信任的各方来存储状态数据，而另一些则使用随机分配的验证者来执行此任务。

#### 数据可用性委员会 (DAC) {#data-availability-committee}

为了保证链下数据的可用性，一些 Validium 解决方案指定了一组受信任的实体，统称为数据可用性委员会 (DAC)，以存储状态副本并提供数据可用性证明。DAC 更容易实现，并且由于成员数量少，需要的协调也更少。

然而，用户必须信任 DAC 在需要时（例如，用于生成默克尔证明）提供数据。数据可用性委员会的成员有可能[被恶意行为者破坏](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view)，从而隐瞒链下数据。

[了解更多关于 Validium 中数据可用性委员会的信息](https://medium.com/starkware/data-availability-e5564c416424)。

#### 绑定数据可用性 {#bonded-data-availability}

其他 Validium 要求负责存储离线数据的参与者在承担其角色之前，在智能合约中质押（即锁定）代币。这种质押作为一种“保证金”，以保证数据可用性管理者之间的诚实行为，并减少信任假设。如果这些参与者未能证明数据可用性，保证金将被罚没。

在绑定数据可用性方案中，任何人只要提供所需的质押，就可以被分配来保存链下数据。这扩大了符合条件的数据可用性管理者的范围，减少了影响数据可用性委员会 (DAC) 的中心化问题。更重要的是，这种方法依赖于密码经济学激励来防止恶意活动，这比指定受信任的各方来保护 Validium 中的离线数据要安全得多。

[了解更多关于 Validium 中绑定数据可用性的信息](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)。

## Volition 和 Validium {#volitions-and-validium}

Validium 提供了许多好处，但也伴随着权衡（最显著的是数据可用性）。但是，与许多扩容解决方案一样，Validium 适用于特定的用例——这就是创建 Volition 的原因。

Volition 结合了 ZK-rollup 和 Validium 链，允许用户在这两种扩容解决方案之间切换。借助 Volition，用户可以在某些交易中利用 Validium 的链下数据可用性，同时保留在需要时切换到链上数据可用性解决方案 (ZK-rollup) 的自由。这本质上赋予了用户根据其独特情况自由选择权衡的权利。

去中心化交易所 (DEX) 可能更喜欢使用 Validium 的可扩展和私密基础设施进行高价值交易。它也可以为希望获得 ZK-rollup 更高安全保障和去信任化的用户使用 ZK-rollup。

## Validium 和 EVM 兼容性 {#validiums-and-evm-compatibility}

与 ZK-rollup 一样，Validium 主要适用于简单的应用，例如代币交换和支付。考虑到在零知识证明电路中证明 [EVM](/developers/docs/evm/) 指令的巨大开销，在 Validium 中支持通用计算和智能合约执行很难实现。

一些 Validium 项目试图通过将兼容 EVM 的语言（例如 Solidity、Vyper）编译为创建针对高效证明进行优化的自定义字节码来回避这个问题。这种方法的一个缺点是，新的对零知识证明友好的虚拟机可能不支持重要的 EVM 操作码，开发人员必须直接使用高级语言编写代码以获得最佳体验。这带来了更多问题：它迫使开发人员使用全新的开发堆栈来构建去中心化应用 (dapp)，并破坏了与当前以太坊基础设施的兼容性。

然而，一些团队正试图针对 ZK 证明电路优化现有的 EVM 操作码。这将促成零知识以太坊虚拟机 (zkEVM) 的开发，这是一种兼容 EVM 的虚拟机，可生成证明以验证程序执行的正确性。借助 zkEVM，Validium 链可以在链下执行智能合约，并提交有效性证明以在以太坊上验证链下计算（而无需重新执行）。

[了解更多关于 zkEVM 的信息](https://www.alchemy.com/overviews/zkevm)。

## Validium 如何扩展以太坊？ {#scaling-ethereum-with-validiums}

### 1. 链下数据存储 {#offchain-data-storage}

二层网络 (l2) 扩容项目（例如 Optimistic Rollup 和 ZK-rollup）通过在一层网络 (l1) 上发布一些交易数据，以纯链下扩容协议（例如 [Plasma](/developers/docs/scaling/plasma/)）的无限可扩展性换取安全性。但这意味着汇总的可扩展性属性受到以太坊主网数据带宽的限制（出于这个原因，[数据分片](/roadmap/danksharding/)提议提高以太坊的数据存储能力）。

Validium 通过将所有交易数据保留在链下，并且仅在将状态更新中继到以太坊主链时发布状态承诺（和有效性证明）来实现可扩展性。然而，有效性证明的存在赋予了 Validium 比其他纯链下扩容解决方案（包括 Plasma 和[侧链](/developers/docs/scaling/sidechains/)）更高的安全保障。通过减少以太坊在验证链下交易之前必须处理的数据量，Validium 的设计极大地扩展了主网的吞吐量。

### 2. 递归证明 {#recursive-proofs}

递归证明是验证其他证明有效性的有效性证明。这些“证明的证明”是通过递归聚合多个证明生成的，直到创建一个验证所有先前证明的最终证明。递归证明通过增加每个有效性证明可以验证的交易数量来扩展区块链处理速度。

通常，Validium 运营商提交给以太坊进行验证的每个有效性证明都会验证单个区块的完整性。而单个递归证明可用于同时确认几个 Validium 区块的有效性——这是可能的，因为证明电路可以递归地将几个区块证明聚合成一个最终证明。如果链上验证者合约接受递归证明，所有底层区块将立即被最终确定。

## Validium 的优缺点 {#pros-and-cons-of-validium}

| 优点                                                                                                                     | 缺点                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 有效性证明强制执行链下交易的完整性，并防止运营商最终确定无效的状态更新。 | 生成有效性证明需要特殊的硬件，这带来了中心化风险。                                                              |
| 提高用户的资金效率（将资金提取回以太坊没有延迟）。                                 | 对通用计算/智能合约的支持有限；开发需要专门的语言。                                             |
| 在高价值应用中，不易受到基于欺诈证明的系统所面临的某些经济攻击。                | 生成 ZK 证明需要高计算能力；对于低吞吐量应用来说不具成本效益。                                         |
| 通过不将调用数据发布到以太坊主网，降低了用户的 Gas 费用。                                                  | 主观最终性时间较慢（生成 ZK 证明需要 10-30 分钟），但达到完全最终性的速度更快，因为没有争议时间延迟。               |
| 适用于优先考虑交易隐私和可扩展性的特定用例，例如交易或区块链游戏。  | 用户可能会被阻止提取资金，因为生成所有权的默克尔证明需要链下数据始终可用。      |
| 链下数据可用性提供了更高水平的吞吐量并增加了可扩展性。                              | 安全模型依赖于信任假设和密码经济学激励，这与纯粹依赖密码学安全机制的 ZK-rollup 不同。 |

### 使用 Validium/Volition {#use-validium-and-volitions}

多个项目提供了 Validium 和 Volition 的实现，你可以将它们集成到你的 dapp 中：

**StarkWare StarkEx** - _StarkEx 是一个基于有效性证明的以太坊二层网络 (l2) 可扩展性解决方案。它可以在 ZK-Rollup 或 Validium 数据可用性模式下运行。_

- [文档](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [网站](https://starkware.co/starkex/)

**Matter Labs zkPorter** - _zkPorter 是一个二层网络扩容协议，它采用结合了 zkRollup 和分片思想的混合方法来解决数据可用性问题。它可以支持任意数量的分片，每个分片都有自己的数据可用性策略。_

- [博客](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [文档](https://docs.zksync.io/zksync-protocol/rollup/data-availability)
- [网站](https://zksync.io/)

## 延伸阅读 {#further-reading}

- [Validium 与二层网络二乘二矩阵 — 第 99 期](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [ZK-rollup 与 Validium](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [Volition 与新兴的数据可用性范围](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [以太坊汇总实用指南](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)