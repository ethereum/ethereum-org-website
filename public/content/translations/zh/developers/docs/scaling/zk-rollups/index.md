---
title: 零知识汇总
description: 零知识汇总简介——以太坊社区使用的一种扩容解决方案。
lang: zh
---

零知识汇总 (ZK-rollup) 是二层网络 (l2) [扩容解决方案](/developers/docs/scaling/)，通过将计算和状态存储转移到链下，来提高[以太坊](/)主网的吞吐量。ZK-rollup 可以批量处理数千笔交易，然后仅将一些最少的摘要数据发布到主网。该摘要数据定义了应对以太坊状态进行的更改，以及证明这些更改正确无误的一些密码学证明。

## 先决条件 {#prerequisites}

你应该已经阅读并理解了关于[以太坊扩容](/developers/docs/scaling/)和[二层网络 (l2)](/layer-2)的页面。

## 什么是零知识汇总？ {#what-are-zk-rollups}

**零知识汇总 (ZK-rollup)** 将交易捆绑（或“汇总”）成批次并在链下执行。链下计算减少了必须发布到区块链的数据量。ZK-rollup 运营商提交代表批次中所有交易所需更改的摘要，而不是单独发送每笔交易。他们还生成[有效性证明](/glossary/#validity-proof)来证明其更改的正确性。

ZK-rollup 的状态由部署在以太坊网络上的智能合约维护。要更新此状态，ZK-rollup 节点必须提交有效性证明以供验证。如前所述，有效性证明是一种密码学保证，证明 Rollup 提议的状态更改确实是执行给定批次交易的结果。这意味着 ZK-rollup 只需要提供有效性证明即可在以太坊上最终确定交易，而不是像[乐观汇总 (optimistic rollup)](/developers/docs/scaling/optimistic-rollups/) 那样将所有交易数据发布到链上。

将资金从 ZK-rollup 转移到以太坊时没有延迟，因为一旦 ZK-rollup 合约验证了有效性证明，就会执行退出交易。相反，从乐观汇总中提款会受到延迟，以允许任何人使用[欺诈证明](/glossary/#fraud-proof)对退出交易提出挑战。

ZK-rollup 将交易作为 `calldata` 写入以太坊。`calldata` 是存储包含在对智能合约函数的外部调用中的数据的地方。`calldata` 中的信息发布在区块链上，允许任何人独立重建 Rollup 的状态。ZK-rollup 使用压缩技术来减少交易数据——例如，账户由索引而不是地址表示，这节省了 28 字节的数据。链上数据发布是 Rollup 的一项重大成本，因此数据压缩可以降低用户的费用。

## ZK-rollup 如何与以太坊交互？ {#zk-rollups-and-ethereum}

ZK-rollup 链是一种在以太坊区块链之上运行的链下协议，由链上以太坊智能合约管理。ZK-rollup 在主网之外执行交易，但定期将链下交易批次提交给链上 Rollup 合约。该交易记录是不可变的，就像以太坊区块链一样，并构成了 ZK-rollup 链。

ZK-rollup 的核心架构由以下组件构成：

1. **链上合约**：如前所述，ZK-rollup 协议由运行在以太坊上的智能合约控制。这包括存储 Rollup 区块、跟踪存款和监控状态更新的主合约。另一个链上合约（验证者合约）验证区块生产者提交的零知识证明。因此，以太坊充当 ZK-rollup 的基础层或“一层网络 (l1)”。

2. **链下虚拟机 (VM)**：虽然 ZK-rollup 协议存在于以太坊上，但交易执行和状态存储发生在一个独立于 [EVM](/developers/docs/evm/) 的单独虚拟机上。这个链下虚拟机是 ZK-rollup 上交易的执行环境，并充当 ZK-rollup 协议的次级层或“二层网络 (l2)”。在以太坊主网上验证的有效性证明保证了链下虚拟机中状态转换的正确性。

ZK-rollup 是“混合扩容解决方案”——独立运行但从以太坊获得安全性的链下协议。具体来说，以太坊网络强制执行 ZK-rollup 上状态更新的有效性，并保证 Rollup 状态每次更新背后的数据可用性。因此，ZK-rollup 比纯链下扩容解决方案安全得多，例如负责自身安全属性的[侧链](/developers/docs/scaling/sidechains/)，或者同样使用有效性证明在以太坊上验证交易但将交易数据存储在其他地方的 [validium](/developers/docs/scaling/validium/)。

ZK-rollup 依赖以太坊主协议来实现以下功能：

### 数据可用性 {#data-availability}

ZK-rollup 将链下处理的每笔交易的状态数据发布到以太坊。借助这些数据，个人或企业可以重现 Rollup 的状态并自行验证该链。以太坊将这些数据作为 `calldata` 提供给网络的所有参与者。

ZK-rollup 不需要将大量交易数据发布到链上，因为有效性证明已经验证了状态转换的真实性。尽管如此，将数据存储在链上仍然很重要，因为它允许对 L2 链的状态进行无需许可的独立验证，这反过来又允许任何人提交批量交易，从而防止恶意运营商审查或冻结该链。

用户与 Rollup 交互需要链上数据。如果没有访问状态数据的权限，用户将无法查询其账户余额或发起依赖于状态信息的交易（例如提款）。

### 交易最终性 {#transaction-finality}

以太坊充当 ZK-rollup 的结算层：只有当 L1 合约接受有效性证明时，L2 交易才算已最终确定。这消除了恶意运营商破坏链（例如窃取 Rollup 资金）的风险，因为每笔交易都必须在主网上获得批准。此外，以太坊保证用户操作一旦在 L1 上最终确定就无法撤销。

### 抗审查性 {#censorship-resistance}

大多数 ZK-rollup 使用“超级节点”（运营商）来执行交易、生成批次并将区块提交到 L1。虽然这确保了效率，但它增加了审查的风险：恶意的 ZK-rollup 运营商可以通过拒绝将用户的交易包含在批次中来审查用户。

作为一项安全措施，如果用户认为自己受到运营商的审查，ZK-rollup 允许用户直接向主网上的 Rollup 合约提交交易。这允许用户强制从 ZK-rollup 退出到以太坊，而无需依赖运营商的许可。

## ZK-rollup 是如何工作的？ {#how-do-zk-rollups-work}

### 交易 {#transactions}

ZK-rollup 中的用户签署交易并提交给 L2 运营商进行处理并包含在下一个批次中。在某些情况下，运营商是一个中心化实体，称为定序器，负责执行交易、将它们聚合成批次并提交给 L1。该系统中的定序器是唯一被允许生成 L2 区块并将 Rollup 交易添加到 ZK-rollup 合约的实体。

其他 ZK-rollup 可能会通过使用[权益证明 (PoS)](/developers/docs/consensus-mechanisms/pos/) 验证者集来轮换运营商角色。潜在的运营商在 Rollup 合约中存入资金，每次质押的规模会影响质押者被选中生成下一个 Rollup 批次的机会。如果运营商恶意行事，其质押可能会被罚没，这激励他们发布有效的区块。

#### ZK-rollup 如何在以太坊上发布交易数据 {#how-zk-rollups-publish-transaction-data-on-ethereum}

如前所述，交易数据作为 `calldata` 发布在以太坊上。`calldata` 是智能合约中的一个数据区域，用于将参数传递给函数，其行为类似于[内存](/developers/docs/smart-contracts/anatomy/#memory)。虽然 `calldata` 不作为以太坊状态的一部分存储，但它作为以太坊链的[历史日志](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs)的一部分保留在链上。`calldata` 不影响以太坊的状态，使其成为在链上存储数据的一种廉价方式。

`calldata` 关键字通常标识交易正在调用的智能合约方法，并以任意字节序列的形式保存该方法的输入。ZK-rollup 使用 `calldata` 在链上发布压缩的交易数据；Rollup 运营商只需通过调用 Rollup 合约中所需的函数来添加新批次，并将压缩数据作为函数参数传递。这有助于降低用户的成本，因为很大一部分 Rollup 费用用于在链上存储交易数据。

### 状态承诺 {#state-commitments}

ZK-rollup 的状态（包括 L2 账户和余额）表示为[默克尔树](/whitepaper/#merkle-trees)。默克尔树根（默克尔根）的密码学哈希存储在链上合约中，允许 Rollup 协议跟踪 ZK-rollup 状态的更改。

在执行一组新交易后，Rollup 转换到新状态。发起状态转换的运营商需要计算新的状态根并提交给链上合约。如果与批次关联的有效性证明通过了验证者合约的身份验证，则新的默克尔根将成为 ZK-rollup 的规范状态根。

除了计算状态根之外，ZK-rollup 运营商还创建一个批次根——包含批次中所有交易的默克尔树的根。提交新批次时，Rollup 合约会存储批次根，允许用户证明某笔交易（例如提款请求）包含在该批次中。用户必须提供交易详细信息、批次根以及显示包含路径的[默克尔证明](/developers/tutorials/merkle-proofs-for-offline-data-integrity/)。

### 有效性证明 {#validity-proofs}

ZK-rollup 运营商提交给 L1 合约的新状态根是 Rollup 状态更新的结果。假设 Alice 向 Bob 发送 10 个代币，运营商只需将 Alice 的余额减少 10，并将 Bob 的余额增加 10。然后，运营商对更新后的账户数据进行哈希处理，重建 Rollup 的默克尔树，并将新的默克尔根提交给链上合约。

但是，在运营商证明新的默克尔根是由对 Rollup 状态的正确更新产生之前，Rollup 合约不会自动接受提议的状态承诺。ZK-rollup 运营商通过生成有效性证明（一种验证批量交易正确性的简洁密码学承诺）来做到这一点。

有效性证明允许各方在不透露陈述本身的情况下证明陈述的正确性——因此，它们也被称为零知识证明。ZK-rollup 使用有效性证明来确认链下状态转换的正确性，而无需在以太坊上重新执行交易。这些证明可以采用 [zk-SNARK](https://arxiv.org/abs/2202.06877)（零知识简洁非交互式知识论证）或 [ZK-STARK](https://eprint.iacr.org/2018/046)（零知识可扩展透明知识论证）的形式。

SNARK 和 STARK 都有助于证明 ZK-rollup 中链下计算的完整性，尽管每种证明类型都有其独特的特征。

**zk-SNARK**

为了使 zk-SNARK 协议发挥作用，必须创建公共参考字符串 (CRS)：CRS 为证明和验证有效性证明提供公共参数。证明系统的安全性取决于 CRS 设置；如果用于创建公共参数的信息落入恶意行为者手中，他们可能能够生成虚假的有效性证明。

一些 ZK-rollup 试图通过使用涉及受信任个人的[多方计算仪式 (MPC)](https://zkproof.org/2021/06/30/setup-ceremonies/amp/) 来解决这个问题，从而为 zk-SNARK 电路生成公共参数。每一方都贡献一些随机性（称为“有毒废物”）来构建 CRS，他们必须立即销毁这些随机性。

使用可信设置是因为它们增加了 CRS 设置的安全性。只要有一位诚实的参与者销毁了他们的输入，zk-SNARK 系统的安全性就能得到保证。尽管如此，这种方法需要信任参与者会删除他们采样的随机性，并且不会破坏系统的安全保证。

撇开信任假设不谈，zk-SNARK 因其较小的证明大小和恒定时间的验证而广受欢迎。由于 L1 上的证明验证构成了运营 ZK-rollup 的较大成本，L2 使用 zk-SNARK 生成可以在主网上快速且廉价地验证的证明。

**ZK-STARK**

与 zk-SNARK 一样，ZK-STARK 证明链下计算的有效性而不透露输入。然而，由于其可扩展性和透明度，ZK-STARK 被认为是对 zk-SNARK 的改进。

ZK-STARK 是“透明的”，因为它们可以在没有公共参考字符串 (CRS) 的可信设置的情况下工作。相反，ZK-STARK 依赖于公开可验证的随机性来设置用于生成和验证证明的参数。

ZK-STARK 还提供了更高的可扩展性，因为证明和验证有效性证明所需的时间与底层计算的复杂性呈*拟线性*增长。对于 zk-SNARK，证明和验证时间与底层计算的大小呈*线性*扩展。这意味着当涉及大型数据集时，ZK-STARK 在证明和验证方面所需的时间少于 zk-SNARK，使其适用于高容量应用。

ZK-STARK 也能抵御量子计算机的攻击，而 zk-SNARK 中使用的椭圆曲线密码学 (ECC) 被广泛认为容易受到量子计算攻击。ZK-STARK 的缺点是它们产生的证明尺寸更大，在以太坊上验证的成本更高。

#### 有效性证明在 ZK-rollup 中是如何工作的？ {#validity-proofs-in-zk-rollups}

##### 证明生成 {#entries-and-exits}

在接受交易之前，运营商将执行常规检查。这包括确认：

- 发送者和接收者账户是状态树的一部分。
- 发送者有足够的资金来处理交易。
- 交易正确且与 Rollup 上发送者的公钥匹配。
- 发送者的随机数正确，等等。

一旦 ZK-rollup 节点有足够的交易，它就会将它们聚合成一个批次，并为证明电路编译输入，以编译成简洁的 ZK 证明。这包括：

- 包含批次中所有交易的默克尔树根。
- 交易的默克尔证明，以证明包含在该批次中。
- 交易中每个发送者-接收者对的默克尔证明，以证明这些账户是 Rollup 状态树的一部分。
- 一组中间状态根，源自为每笔交易应用状态更新（即减少发送者账户和增加接收者账户）后更新状态根。

证明电路通过“循环”遍历每笔交易并执行运营商在处理交易之前完成的相同检查来计算有效性证明。首先，它使用提供的默克尔证明验证发送者的账户是现有状态根的一部分。然后它减少发送者的余额，增加其随机数，对更新后的账户数据进行哈希处理，并将其与默克尔证明结合以生成新的默克尔根。

这个默克尔根反映了 ZK-rollup 状态的唯一变化：发送者余额和随机数的变化。这是可能的，因为用于证明账户存在的默克尔证明被用来推导新的状态根。

证明电路对接收者的账户执行相同的过程。它检查接收者的账户是否存在于中间状态根下（使用默克尔证明），增加其余额，重新对账户数据进行哈希处理，并将其与默克尔证明结合以生成新的状态根。

该过程对每笔交易重复进行；每个“循环”通过更新发送者的账户创建一个新的状态根，并通过更新接收者的账户创建一个随后的新根。如前所述，对状态根的每次更新都代表 Rollup 状态树的一部分发生变化。

ZK 证明电路遍历整个交易批次，验证在最后一笔交易执行后产生最终状态根的更新序列。计算出的最后一个默克尔根成为 ZK-rollup 最新的规范状态根。

##### 证明验证 {#zk-rollups-and-evm-compatibility}

在证明电路验证状态更新的正确性之后，L2 运营商将计算出的有效性证明提交给 L1 上的验证者合约。合约的验证电路验证证明的有效性，并检查构成证明一部分的公共输入：

- **前状态根**：ZK-rollup 的旧状态根（即在执行批量交易之前），反映了 L2 链最后已知的有效状态。

- **后状态根**：ZK-rollup 的新状态根（即在执行批量交易之后），反映了 L2 链的最新状态。后状态根是在证明电路中应用状态更新后得出的最终根。

- **批次根**：批次的默克尔根，通过对批次中的交易进行*默克尔化*并对树的根进行哈希处理得出。

- **交易输入**：与作为提交批次一部分执行的交易相关联的数据。

如果证明满足电路（即它是有效的），这意味着存在一系列有效的交易，将 Rollup 从先前的状态（由前状态根进行密码学指纹识别）转换到新状态（由后状态根进行密码学指纹识别）。如果前状态根与存储在 Rollup 合约中的根匹配，并且证明有效，则 Rollup 合约从证明中获取后状态根并更新其状态树以反映 Rollup 更改后的状态。

### 进入和退出 {#how-do-zk-rollup-fees-work}

用户通过在部署在 L1 链上的 Rollup 合约中存入代币来进入 ZK-rollup。该交易会排队，因为只有运营商才能向 Rollup 合约提交交易。

如果待处理的存款队列开始填满，ZK-rollup 运营商将获取存款交易并将它们提交给 Rollup 合约。一旦用户的资金进入 Rollup，他们就可以通过将交易发送给运营商进行处理来开始交易。用户可以通过对其账户数据进行哈希处理，将哈希发送到 Rollup 合约，并提供默克尔证明以针对当前状态根进行验证，从而验证 Rollup 上的余额。

从 ZK-rollup 提款到 L1 非常简单。用户通过将其在 Rollup 上的资产发送到指定账户进行销毁来发起退出交易。如果运营商将该交易包含在下一个批次中，用户可以向链上合约提交提款请求。此提款请求将包括以下内容：

- 证明用户向销毁账户的交易包含在交易批次中的默克尔证明

- 交易数据

- 批次根

- 接收存入资金的 L1 地址

Rollup 合约对交易数据进行哈希处理，检查批次根是否存在，并使用默克尔证明检查交易哈希是否是批次根的一部分。之后，合约执行退出交易并将资金发送到用户在 L1 上选择的地址。

## ZK-rollup 和 EVM 兼容性 {#scaling-ethereum-with-zk-rollups}

与乐观汇总不同，ZK-rollup 并不容易与[以太坊虚拟机 (EVM)](/developers/docs/evm/) 兼容。在电路中证明通用 EVM 计算比证明简单计算（如前面描述的代币转账）更困难且更耗费资源。

然而，[零知识技术的进步](https://hackmd.io/@yezhang/S1_KMMbGt#Why-possible-now)正在重新点燃人们对将 EVM 计算封装在零知识证明中的兴趣。这些努力旨在创建一个零知识 EVM (zkEVM) 实现，该实现可以有效地验证程序执行的正确性。zkEVM 重新创建现有的 EVM 操作码以在电路中进行证明/验证，从而允许执行智能合约。

像 EVM 一样，zkEVM 在对某些输入执行计算后在状态之间转换。区别在于 zkEVM 还创建零知识证明来验证程序执行中每一步的正确性。有效性证明可以验证涉及虚拟机状态（内存、堆栈、存储）的操作以及计算本身（即，操作是否调用了正确的操作码并正确执行了它们？）的正确性。

引入兼容 EVM 的 ZK-rollup 有望帮助开发者利用零知识证明的可扩展性和安全保证。更重要的是，与原生以太坊基础设施的兼容性意味着开发者可以使用熟悉（且经过实战检验）的工具和语言构建对 ZK 友好的去中心化应用 (dapp)。

## ZK-rollup 费用是如何运作的？ {#transaction-data-compression}

用户在 ZK-rollup 上为交易支付多少费用取决于 gas 费，就像在以太坊主网上一样。然而，gas 费在 L2 上的运作方式不同，并受以下成本的影响：

1. **状态写入**：写入以太坊状态（即在以太坊区块链上提交交易）有固定成本。ZK-rollup 通过批量处理交易并将固定成本分摊给多个用户来降低此成本。

2. **数据发布**：ZK-rollup 将每笔交易的状态数据作为 `calldata` 发布到以太坊。`calldata` 成本目前受 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) 管辖，该提案规定 `calldata` 的非零字节成本为 16 Gas，零字节成本为 4 Gas。每笔交易支付的成本受其需要在链上发布多少 `calldata` 的影响。

3. **L2 运营商费用**：这是支付给 Rollup 运营商的金额，作为处理交易产生的计算成本的补偿，很像以太坊主网上的[交易“优先费（小费）”](/developers/docs/gas/#how-are-gas-fees-calculated)。

4. **证明生成和验证**：ZK-rollup 运营商必须为交易批次生成有效性证明，这是资源密集型的。在主网上验证零知识证明也需要消耗 Gas（约 500,000 Gas）。

除了批量处理交易外，ZK-rollup 还通过压缩交易数据来降低用户的费用。你可以[查看实时概览](https://l2fees.info/)，了解使用以太坊 ZK-rollup 的成本。

## ZK-rollup 如何扩展以太坊？ {#recursive-proofs}

### 交易数据压缩 {#zk-rollups-pros-and-cons}

ZK-rollup 通过将计算转移到链下来扩展以太坊基础层的吞吐量，但扩容的真正推动力来自压缩交易数据。以太坊的[区块大小](/developers/docs/blocks/#block-size)限制了每个区块可以容纳的数据量，进而限制了每个区块处理的交易数量。通过压缩与交易相关的数据，ZK-rollup 显著增加了每个区块处理的交易数量。

ZK-rollup 可以比乐观汇总更好地压缩交易数据，因为它们不必发布验证每笔交易所需的所有数据。它们只需发布重建 Rollup 上账户和余额最新状态所需的最少数据。

### 递归证明 {#zk-video}

零知识证明的一个优点是证明可以验证其他证明。例如，单个 zk-SNARK 可以验证其他 zk-SNARK。这种“证明的证明”被称为递归证明，并极大地提高了 ZK-rollup 的吞吐量。

目前，有效性证明是逐块生成的，并提交给 L1 合约进行验证。然而，验证单区块证明限制了 ZK-rollup 可以实现的吞吐量，因为当运营商提交证明时只能最终确定一个区块。

然而，递归证明使得用一个有效性证明最终确定几个区块成为可能。这是因为证明电路递归地聚合多个区块证明，直到创建一个最终证明。L2 运营商提交此递归证明，如果合约接受它，所有相关区块将立即被最终确定。借助递归证明，可以定期在以太坊上最终确定的 ZK-rollup 交易数量增加了。

### ZK-rollup 的优缺点 {#zkevm-projects}

| 优点                                                                                                                                                                                                   | 缺点                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 有效性证明确保链下交易的正确性，并防止运营商执行无效的状态转换。                                                                           | 与计算和验证有效性证明相关的成本很高，并且会增加 Rollup 用户的费用。                                                                            |
| 提供更快的交易最终性，因为一旦在 L1 上验证了有效性证明，状态更新就会获得批准。                                                                                                                             | 由于零知识技术的复杂性，构建兼容 EVM 的 ZK-rollup 很困难。                                                                                                    |
| 依靠无须信任的密码学机制来保证安全，而不是像[乐观汇总](/developers/docs/scaling/optimistic-rollups/#optimistic-pros-and-cons)那样依赖受激励参与者的诚实。 | 生成有效性证明需要专门的硬件，这可能会助长少数几方对链的中心化控制。                                                                    |
| 在 L1 上存储恢复链下状态所需的数据，这保证了安全性、抗审查性和去中心化。                                                                       | 中心化运营商（定序器）可以影响交易的排序。                                                                                                                     |
| 用户受益于更高的资本效率，并且可以毫无延迟地从 L2 提取资金。                                                                                                           | 硬件要求可能会减少能够强制链取得进展的参与者数量，从而增加恶意运营商冻结 Rollup 状态和审查用户的风险。 |
| 不依赖于活跃度假设，用户不必验证链来保护他们的资金。                                                                                              | 某些证明系统（例如 zk-SNARK）需要可信设置，如果处理不当，可能会危及 ZK-rollup 的安全模型。                                                     |
| 更好的数据压缩有助于降低在以太坊上发布 `calldata` 的成本，并最大限度地减少用户的 Rollup 费用。                                                                             |                                                                                                                                                                                                    |

### ZK-rollup 的直观解释 {#further-reading-on-zk-rollups}

观看 Finematics 解释 ZK-rollup：

<VideoWatch slug="rollups-scaling-strategy" startTime="406" />


## 谁在致力于 zkEVM？ {#tutorials}

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>L2 与 L1 的 zkEVM</AlertTitle>
<AlertDescription>
以下项目使用 zkEVM 技术构建二层网络 (l2) Rollup。还有关于将 zkEVM 用于[L1 区块验证](/roadmap/zkevm/)的研究，这将使验证者能够在不重新执行交易的情况下验证以太坊区块。
</AlertDescription>
</AlertContent>
</Alert>

致力于 zkEVM 的项目包括：

- **[zkEVM](https://github.com/privacy-scaling-explorations/zkevm-specs)** - *zkEVM 是一个由以太坊基金会资助的项目，旨在开发兼容 EVM 的 ZK-rollup 以及为以太坊区块生成有效性证明的机制。*

- **[Polygon zkEVM](https://polygon.technology/solutions/polygon-zkevm)** - *是以太坊主网上的去中心化 ZK-rollup，致力于开发零知识以太坊虚拟机 (zkEVM)，以透明的方式执行以太坊交易，包括具有零知识证明验证的智能合约。*

- **[Scroll](https://scroll.io/blog/zkEVM)** - *Scroll 是一家技术驱动型公司，致力于为以太坊构建原生的 zkEVM 二层网络 (l2) 解决方案。*

- **[Taiko](https://taiko.xyz)** - *Taiko 是一个去中心化、等效于以太坊的 ZK-rollup（[类型 1 ZK-EVM](https://vitalik.eth.limo/general/2022/08/04/zkevm.html)）。*

- **[ZKsync](https://docs.zksync.io/)** - *ZKsync Era 是由 Matter Labs 构建的兼容 EVM 的 ZK-rollup，由其自己的 zkEVM 提供支持。*

- **[Starknet](https://starkware.co/starknet/)** - *Starknet 是由 StarkWare 构建的兼容 EVM 的二层网络 (l2) 扩容解决方案。*

- **[Morph](https://www.morphl2.io/)** - *Morph 是一种混合 Rollup 扩容解决方案，利用 ZK 证明来解决二层网络 (l2) 状态挑战问题。*

- **[Linea](https://linea.build)** - *Linea 是由 ConsenSys 构建的等效于以太坊的 zkEVM 二层网络 (l2)，与以太坊生态系统完全一致。*

## 关于 ZK-rollup 的进一步阅读

- [什么是零知识汇总？](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [什么是零知识汇总？](https://alchemy.com/blog/zero-knowledge-rollups)
- [以太坊 Rollup 实用指南](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [STARK 与 SNARK](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
- [什么是 zkEVM？](https://www.alchemy.com/overviews/zkevm)
- [ZK-EVM 类型：等效于以太坊、等效于 EVM、类型 1、类型 4 以及其他晦涩的流行语](https://taiko.mirror.xyz/j6KgY8zbGTlTnHRFGW6ZLVPuT0IV0_KmgowgStpA0K4)
- [zkEVM 简介](https://hackmd.io/@yezhang/S1_KMMbGt)
- [什么是 ZK-EVM L2？](https://linea.mirror.xyz/qD18IaQ4BROn_Y40EBMTUTdJHYghUtdECscSWyMvm8M)
- [Awesome-zkEVM 资源](https://github.com/LuozhuZhang/awesome-zkevm)
- [zk-SNARK 的内部工作原理](https://vitalik.eth.limo/general/2017/02/01/zk_snarks.html)
- [SNARK 是如何实现的？](https://vitalik.eth.limo/general/2021/01/26/snarks.html)

## 教程：以太坊上的隐私与零知识

- [使用零知识实现秘密状态](/developers/tutorials/secret-state/) _– 如何使用 ZK 证明和链下服务器组件在链上维护秘密游戏状态。_
- [使用隐身地址](/developers/tutorials/stealth-addr/) _– ERC-5564 隐身地址如何使用密码学密钥派生实现匿名 ETH 转账。_
- [使用以太坊进行 Web2 身份验证](/developers/tutorials/ethereum-for-web2-auth/) _– 如何将以太坊钱包签名与基于 SAML 的 Web2 身份验证系统集成。_