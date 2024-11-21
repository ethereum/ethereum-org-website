---
title: Validium
description: 介绍 Validium - 以太坊社区目前使用的一种扩容解决方案。
lang: zh
sidebarDepth: 3
---

Validium 是一种[扩容解决方案](/developers/docs/scaling/)，使用[零知识卷叠](/developers/docs/scaling/zk-rollups/)等有效性证明来执行交易的完整性，但它不在以太坊主网上存储交易数据。 虽然链下数据可用性是一种折衷方案，但它可以显著提升可扩展性（Validium 每秒可以处理[约 9000 笔交易，甚至更多](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)）。

## 前提条件 {#prerequisites}

你应该已经阅读并理解关于[以太坊扩容](/developers/docs/scaling/)和[二层网络](/layer-2)的页面。

## 什么是 Validium？ {#what-is-validium}

Validium 是使用链下数据可用性和计算的扩展解决方案，旨在通过在以太坊主网外处理交易来提高吞吐量。 与零知识卷叠（ZK 卷叠）一样，Validium 发布[零知识证明](/glossary/#zk-proof)以便在以太坊上验证链下交易。 这样可以防止无效的状态转换并增强 Validium 链的安全保障。

这些“有效性证明”可以有 ZK-SNARK（零知识简洁非交互式知识论证）或 ZK-STARK（零知识可扩展透明知识论证）等形式。 更多关于[零知识证明](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)的信息。

属于 Validium 用户的资金由以太坊上的智能合约控制。 恰如零知识卷叠一样，Validium 几乎可以提供即时提款；在主网上验证提款请求的有效性证明后，用户可以通过提供[默克尔证明](/developers/tutorials/merkle-proofs-for-offline-data-integrity/)提取资金。 默克尔证明验证用户的提款交易是否包含在经过验证的交易批次中，从而允许链上合约处理提款。

但是，Validium 用户可以冻结他们的资金并限制提款。 如果 Validium 链上的数据可用性管理器不给用户提供链下状态数据，就会发生这种情况。 如果无法访问交易数据，用户将无法计算证明资金所有权和执行提款所需的默克尔证明。

这是 Validium 和零知识卷叠之间的主要区别，它们在数据可用性范围内的位置不同。 两种解决方案处理数据存储的方式不同，这会对安全性和去信任产生影响。

## Validium 如何与以太坊交互？ {#how-do-validiums-interact-with-ethereum}

Validium 是建立在现有以太坊链上的扩容协议。 虽然它在链下执行交易，但 Validium 链由部署在主网上的一系列智能合约管理，包括：

1. **验证者合约**：验证者合约验证 Validium 运营商在进行状态更新时所提交证明的有效性。 该合约包括证明链下交易正确性的有效性证明和验证链下交易数据存在的数据可用性证明。

2. **主合约**：主合约存储区块生产者提交的状态承诺（默克尔根），并在链上验证有效性证明后更新 Validium 的状态。 该合约还处理 Validium 链上的存款和提款。

Validium 还依赖以太坊主链实现：

### 结算 {#settlement}

在父链验证其有效性之前，无法完全确认在 Validium 上执行的交易。 所有在 Validium 上进行的业务最终都必须在主网上结算。 以太坊区块链还为 Validium 用户提供了“结算保障”，这意味着一旦提交到链上，链下交易就不能逆转或改变。

### 安全性 {#security}

作为结算层的以太坊也保证 Validium 上状态转换的有效性。 在 Validium 链上执行的链下交易通过以太坊基础层上的智能合约进行验证。

如果链上验证者合约断定证明无效，则交易被拒绝。 这意味着运营商必须满足以太坊协议执行的有效性条件，然后才能更新 Validium 的状态。

## Validium 如何运作？ {#how-does-validium-work}

### 交易 {#transactions}

用户向运营商提交交易，运营商是负责在 Validium 链上执行交易的节点。 一些 Validium 可能采用单个运营商来执行链，或者依靠[权益证明 (PoS)](/developers/docs/consensus-mechanisms/pos/) 机制轮换运营商。

运营商将交易聚合成一个批次并发送到证明线路进行证明。 证明线路接受交易批次（及其他相关数据）作为输入，并输出验证操作正确执行的有效性证明。

### 状态承诺 {#state-commitments}

Validium 的状态被哈希处理成默克尔树，其根存储在以太坊的主合约中。 默克尔根又称为状态根，作为对 Validium 上当前帐户状态和余额的加密承诺。

要执行状态更新，运营商必须（在执行交易后）计算一个新的状态根并将提交给链上合约。 如果有效性证明得到证实，提出的状态被接受，Validium 切换到新的状态根。

### 存款和提款 {#deposits-and-withdrawals}

用户通过在链上合约中存入以太币（或任何与以太坊意见征求兼容的代币），将资金从以太坊转移到 Validium。 该合约将存款事件转发到链下 Validium，并向用户在 Validium 上的地址存入与其存款相同的金额。 运营商还将此存款交易添加到新批次中。

要将资金转移回主网，Validium 用户发起提款交易并将其提交给运营商，后者验证提款请求并将其包含在批次中。 在用户能够退出系统前，他们在 Validium 链上的资产也被销毁。 一旦与该批次相关的有效性证明得到验证，用户就可以调用主合约来提取剩余的初始存款。

作为一种抗审查机制，Validium 协议允许用户直接退出 Validium 合约，无需通过运营商。 在这种情况下，用户需要向验证者合约提供默克尔证明，证明帐户包含在状态根中。 如果证明被接受，用户可以调用主合约的提款函数，从 Validium 中提取他们的资金。

### 批量提交 {#batch-submission}

执行一批交易后，运营商向验证者合约提交相关有效性证明，并向主合约提出新的状态根。 如果证明是有效的，则主合约更新 Validium 的状态并最终确定批次中交易的结果。

与零知识卷叠不同，Validium 上的区块生产者不需要发布交易批次的交易数据（仅发布区块头）。 这使得 Validium 成为一个纯粹的链下扩容协议，而不是在以太坊主链（例如 `calldata`）上发布状态数据的“混合”扩容协议（即[二层网络](/layer-2/)）。

### 数据可用性 {#data-availability}

如上所述，Validium 利用一个链下数据可用性模型，运营商通过该模型将所有交易数据存储在以太坊主网之外。 Validium 的低链上数据足迹提升了可扩展性（吞吐量不受以太坊数据处理能力的限制），并降低了用户费用（发布 `calldata` 的成本降低）。

然而，链下数据可用性带来了一个问题：创建或验证默克尔证明所需的数据可能不可用。 这意味着如果运营商采取恶意行为，用户可能无法从链上合约中提取资金。

各种 Validium 解决方案试图通过以去中心化的方式存储状态数据来解决这个问题。 即，强制区块生产者将底层数据发送给“数据可用性管理器”，这些管理器负责存储链下数据并在用户请求时提供给用户。

Validium 中的数据可用性管理器通过签署每个 Validium 批次来证明链下交易数据的可用性。 这些签名构成了一种“可用性证明”，链上验证者合约在批准状态更新之前对其进行检查。

Validium 的数据可用性管理方法不同。 一些依赖受信任方存储状态数据，而另一些则使用随机指定的验证者。

#### 数据可用性委员会 (DAC) {#data-availability-committee}

为了保证链下数据的可用性，一些 Validium 解决方案指定了一组受信任的实体（统称为数据可用性委员会 (DAC)）来存储状态副本并提供数据可用性证明。 由于成员较少，数据可用性委员会更容易实施并且需要较少的协调。

但是，用户必须信任数据可用性委员会，才能在需要时（例如用于生成默克尔证明）获得数据。 数据可用性委员会的成员有可能[被恶意行为者入侵](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view)，然后会扣留链下数据。

[更多关于 Validium 中数据可用性委员会的信息](https://medium.com/starkware/data-availability-e5564c416424)。

#### 绑定数据可用性 {#bonded-data-availability}

其他 Validium 要求负责存储离线数据的参与者在承担其角色之前在智能合约中质押（即锁定）代币。 这种质押作为“保证金”，保证数据可用性管理者之间采取的诚实行为并减少信任假设。 如果这些参与者不能证明数据的可用性，那么保证金就会被惩没。

在绑定数据可用性方案中，任何人在提供要求的质押后，都可以指定其保存链下数据。 这扩大了合格数据可用性管理者池，削弱了对数据可用性委员会 (DAC) 造成影响的中心化。 更重要的是，这种方法依赖于加密经济激励措施防止恶意活动，这比指定受信任方在 Validium 中保护离线数据要安全得多。

[更多关于 Validium 中绑定数据可用性的信息](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)。

## Volitions 和 Validium {#volitions-and-validium}

Validium 提供了诸多好处，但也进行了折衷（最值得注意的是数据可用性）。 但是，与许多扩容解决方案一样，Validium 适合特定的用例，这就是 Volitions 方案出现的原因。

Volitions 结合了零知识卷叠和 Validium 链，它允许用户在两种扩容解决方案之间切换。 使用 Volitions，用户可以利用 Validium 的链下数据可用性进行某些交易，同时可以在需要时自由地切换到链上数据可用性解决方案（零知识卷叠）。 这实质上使用户可以根据他们的独特情况自由地进行权衡取舍。

去中心化交易所 (DEX) 可能更喜欢使用 Validium 的可扩展和私有基础设施进行大额交易。 它还可以为需要零知识卷叠更高安全性保证和去信任性的用户使用零知识卷叠。

## Validium 和以太坊虚拟机的兼容性 {#validiums-and-evm-compatibility}

与零知识卷叠一样，Validium 最适合简单的应用，例如代币交换和支付。 鉴于在零知识证明线路中证明[以太坊虚拟机](/developers/docs/evm/)指令的开销很大，因此在 Validium 之间很难为通用计算和智能合约执行提供支持。

一些 Validium 项目试图通过编译与以太坊虚拟机兼容的语言（例如 Solidity、Vyper）来生成针对高效证明而优化的自定义字节码，从而回避这个问题。 这种方法的一个缺点是零知识证明友好的新的虚拟机可能不支持重要的以太坊虚拟机操作码，而且开发者必须直接用高级语言编写才能获得最佳体验。 这带来了更多问题：它迫使开发者使用全新的开发堆栈构建去中心化应用程序，并破坏了与当前以太坊基础设施的兼容性。

然而，一些团队正在尝试针对零知识证明线路优化现有以太坊虚拟机操作码。 这将导致零知识以太坊虚拟机 (zkEVM) 的开发，这是一种与以太坊虚拟机兼容的虚拟机，可生成验证程序是否正确执行的证明。 使用零知识以太坊虚拟机，Validium 链可以在链下执行智能合约并提交有效性证明，以便在以太坊上验证链下计算（无需重新执行）。

[更多关于零知识以太坊虚拟机的信息](https://www.alchemy.com/overviews/zkevm)。

## Validium 如何扩展以太坊？ {#scaling-ethereum-with-validiums}

### 1. 链下数据存储 {#off-chain-data-storage}

二层网络扩容项目（例如乐观卷叠和零知识卷叠）通过将部分交易数据发布到一层网络，牺牲了纯链下扩容协议（例如 [Plasma](/developers/docs/scaling/plasma/)）的无限可扩展性来换取安全性。 然而，这意味着卷叠的可扩展性属性受到以太坊主网上数据带宽的限制（因此，[数据分片](/roadmap/danksharding/)提议要提高以太坊的数据存储容量）。

Validium 实现了可扩展性，它将所有交易数据保存在链下并且在将状态更新传送到以太坊主链时仅发布状态承诺（和有效性证明）。 然而，有效性证明的存在为 Validium 提供了比其他纯链下扩容解决方案（包括 Plasma 和[侧链](/developers/docs/scaling/sidechains/)）更高的安全保障。 通过减少以太坊在验证链下交易之前必须处理的数据量，Validium 设计极大地提升了主网上的吞吐量。

### 2. 递归证明 {#recursive-proofs}

递归证明是一种有效性证明，它验证其他证明的有效性。 这些“证明的证明”的生成方式如下：通过以递归方式聚合多个证明直到创建一个可验证所有先前证明的最终证明，即递归证明。 递归证明通过增加每个有效性证明可以验证的交易数量来提升区块链处理速度。

通常，Validium 运营商提交到以太坊作验证用途的每个有效性证明都会验证单个区块的完整性。 而一个递归证明可用来同时确认几个 Validium 区块的有效性 — 这是可能的，因为证明线路能够以递归方式将几个区块证明聚合成一个最终证明。 如果链上验证者合约接受递归证明，则所有底层区块都会立即最终确定。

## Validium 的优缺点 {#pros-and-cons-of-validium}

| 优点                                 | 缺点                                                        |
| ---------------------------------- | --------------------------------------------------------- |
| 有效性证明强制验证链下交易的完整性，并阻止运营商最终定无效状态更新。 | 生成有效性证明需要使用专用硬件，这会带来中心化风险。                                |
| 提高用户的资本效率（将资金提取回以太坊时不会出现延迟）        | 对通用计算/智能合约的支持有限；开发需要专门语言。                                 |
| 在高价值应用中，不容易受到基于欺诈证明的系统所面临的某些经济攻击。  | 生成零知识证明需要强大的算力；对于低吞吐量的应用不具有成本效益。                          |
| 通过不将调用数据发布到以太坊主网来降低用户的燃料费用。        | 较慢的主观最终确定性时间（生成零知识证明需要 10-30 分钟），但完全最终确定性要快一些，因为没有争议时间延迟。 |
| 适用于特定用例，例如优先考虑交易隐私和可扩展性的交易或区块链游戏。  | 可以防止用户提取资金，因为生成所有权的默克尔证明需要链下数据始终可用。                       |
| 链下数据可用性提升了吞吐量并增强了可扩展性。             | 安全模型依赖于信任假设和加密经济激励措施，与完全依赖加密安全机制的零知识卷叠不同。                 |

### 使用 Validium/Volitions {#use-validium-and-volitions}

许多项目提供 Validium 和 Volitions 实现，你可以将它们集成到自己的去中心化应用程序中：

**StarkWare StarkEx** - _StarkEx 是基于有效性证明的以太坊二层网络 (L2) 可扩展性解决方案。 它可以在零知识卷叠或 Validium 数据可用性模式下运行。_

- [相关文档](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [网站](https://starkware.co/starkex/)

**Matter Labs zkPorter**- _zkPorter 是一个二层扩容协议，它用一种结合了零知识卷叠和分片观点的混合方法来处理数据可用性。 它支持任意多个分片，每个分片都有自己的数据可用性策略。_

- [博客](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [相关文档](https://docs.zksync.io/zk-stack/concepts/data-availability)
- [网站](https://zksync.io/)

## 延伸阅读 {#further-reading}

- [Validium 和二层 2 x 2 矩阵 — 第 99 期](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [零知识卷叠与 Validium](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [Volition 与新兴数据可用性范围](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [Rollups、Validium 和 Volitions：了解最热门的以太坊扩容解决方案](https://www.defipulse.com/blog/rollups-validiums-and-volitions-learn-about-the-hottest-ethereum-scaling-solutions)
