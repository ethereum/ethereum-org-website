---
title: "布拉格-埃莱特拉（Pectra）"
description: "了解 Pectra 协议升级"
lang: zh
---

# Pectra{#pectra}

Pectra 网络升级在 [Dencun](/roadmap/dencun/) 之后进行，为以太坊的执行层和共识层都带来了变更。 缩写名称Pectra是“Prague”和“Electra”这两个词的结合，它们分别代表执行层和共识层规范的变化。 总之，这些变化为以太坊用户、开发人员和验证者带来了许多改进。

此次升级已于以太坊主网时段 `364032` 成功激活，具体时间为 **2025年5月7日 10:05（UTC）**。

<Alert variant="update">
<AlertContent>
<AlertDescription>
Pectra 升级只是以太坊长期发展目标中的其中一环。 了解更多关于[协议路线图](/roadmap/)和[之前升级](/ethereum-forks/)的信息。
</AlertDescription>
</AlertContent>
</Alert>

## Pectra 的改进 {#new-improvements}

Pectra 带来了迄今为止所有升级中数量最多的 [EIP](https://eips.ethereum.org/)！ 有些细微的变化，但也有一些重要的新功能。 完整的更改列表及技术细节可在各自包含的EIP中查阅。

### EOA帐户代码{#7702}

[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) 标志着向广泛实现 [账户抽象](/roadmap/account-abstraction/) 迈出的重要一步。 通过此功能，用户可以将自己的([EOA](/glossary/#eoa)) 地址扩展为智能合约。 EIP 引入了一种具有特定功能的新型交易——允许地址拥有者授权，将其地址设置为模拟选定的智能合约。

通过此EIP，用户可以选择可编程钱包，该钱包支持交易打包、无gas交易以及为多种钱包恢复方案提供的自定义资产访问等新功能。 这种混合方法将 EOA 的简单性与基于合约的账户的可编程性相结合。

阅读关于7702的深度解析点击[这里](/roadmap/pectra/7702/)

### 提高有效质押最高账户余额 {#7251}

验证者目前有效质押的金额正好是32ETH。 这是参与共识所需的最低金额，同时也是单个验证者可以质押的最高金额。

[EIP-7251](https://eips.ethereum.org/EIPS/eip-7251) 将单笔有效质押金额的最大值提升至 2048 ETH，这意味着单个验证者现在可以质押 最低32 至 2048 ETH 之间的任意数额。 也就是说，质押者不再需要多笔质押32的倍数，他们可以选择质押任意数量的ETH，并且每超过最低要求的1 ETH就可以获得奖励。 例如，如果验证者的质押余额随着奖励增加至33 ETH，额外的1 ETH也被视为有效质押的一部分并获得奖励。

为验证者带来更优化的奖励机制仅仅是这一改进的一部分。 运行多个验证器的 [质押者](/staking/) 现在可以将它们聚合为一个验证器，从而简化操作并减少网络开销。 这是因为 Beacon Chain 中的每个验证者在每个周期都需提交一个签名，因此随着验证者的增多和需要传播的签名数量的增加，带宽需求也会随之增长。 因此， 聚合验证者将减轻网络负载，并在维持网络相同的经济安全性的同时，为新的扩展开启可能性。

阅读关于maxEB的深度解析，请点击[此处](/roadmap/pectra/maxeb/)

### Blob 吞吐量提升{#7691}

Blobs 为 L2 提供 [数据可用性](/developers/docs/data-availability/#data-availability-and-layer-2-rollups)。 它们是在[上一次网络升级](/roadmap/dencun/)中被引入的。

目前，网络的目标是每个区块平均处理3个Blob，最多可处理6个Blob。 随着 [EIP-7691](https://eips.ethereum.org/EIPS/eip-7691)的引入，平均每个区块的Blob数量将增加到6个，最多可达到9个区块，从而提升以太坊Rollup的容量。 该EIP有助于填补这一空白，直到[PeerDAS](https://eips.ethereum.org/EIPS/eip-7594)的引入，实现更高的Blob数量。

### 增加calldata成本 {#7623}

在[Dencun升级中的blobs](/roadmap/danksharding)引入之前，L2网络一直使用[calldata](/developers/docs/data-availability/blockchain-data-storage-strategies/#calldata)来存储其在以太坊上的数据。 Blob 和 calldata 都会影响以太坊的带宽使用情况。 虽然大多数区块仅使用最少量的calldata，但包含许多 blob 的数据密集型区块可能会对以太坊的 p2p 网络造成危害。

为了解决这个问题，[EIP-7623](https://eips.ethereum.org/EIPS/eip-7623) 提高了calldata价格，但仅影响数据密集型交易。 这限制了区块变得过于庞大，激励 L2 仅使用 blobs，从而保证99% 以上的交易不受影响。

### 执行层的可触发退出机制{#7002}

目前，一个验证者退出并 [提取质押的ETH](/staking/withdrawals/) 是一个共识层操作，要求拥有一个活跃的验证者密钥，这个密钥是验证者用来执行如证明等活跃任务的相同的BLS 密钥。 提取凭证是一个独立的冷存储密钥，用于接收已退出的质押资金，但无法触发退出操作。 质押者退出的唯一方式是向信标链网络（Beacon Chain）发送来自活跃验证者密钥签名的特殊消息。 在下面两种情况里这种机制存在局限性：当提币凭证和验证密钥由不同实体持有，或验证密钥丢失时。

[EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) 引入了一种新合约，可以用来通过执行层的提取凭证触发退出。 质押者无需使用验证者签名密钥或访问信标链，即可通过调用该特殊合约中的函数退出其验证者角色。 重要的是，启用链上验证者提币功能，使得质押协议能够对节点运营商降低信任假设。

### 链上验证者质押{#6110}

验证者质押目前通过[eth1data poll](https://eth2book.info/capella/part2/deposits-withdrawals/deposit-processing/)进行处理，该功能位于信标链上（ Beacon Chain），用于从执行层获取数据。 这有点像是合并（The Merge）之前遗留下来的技术逻辑。那时信标链（Beacon Chain）还是一个独立的网络，不得不考虑工作量证明（PoW）链上的重组问题。

[EIP-6110](https://eips.ethereum.org/EIPS/eip-6110) 是一种将质押从执行层传递到共识层的新方法，它能够实现即时处理并降低实施的复杂性。 这是一种更安全地处理以太坊合并后原生质押的方式。 EIP-6110 的机制让节点不必依赖历史存款记录来启动，这对于实现历史数据过期（history expiry）是必要的，为以太坊协议提供未来适应性。

### BLS12-381 的预编译{#2537}

预编译是直接内置于以太坊虚拟机（[EVM](/developers/docs/evm/)）的一组特殊的智能合约。 与普通合约不同，预编译合约不是由用户部署的，而是由以太坊客户端直接实现，使用客户端的原生语言编写（例如 Go、Java 等，而不是 Solidity）。 预编译合约用于执行使用广泛且标准化的功能，例如加密运算。 智能合约开发者可以像调用普通合约一样调用预编译合约，优势在于：效率更高，安全性更高。

[EIP-2537](https://eips.ethereum.org/EIPS/eip-2537) 为 [BLS12-381](https://hackmd.io/@benjaminion/bls12-381) 上的曲线运算新增了预编译合约。 由于其实用特性，椭圆曲线方案（BLS12-381）在加密生态系统中已经得到了广泛的应用。 实际上， 以太坊已选择 BLS12-381 作为其共识层的主要签名方案，供验证者使用。

新的预编译功能使每位开发者都能轻松、高效且安全地使用该曲线进行加密操作，例如在验证签名中。 依赖该曲线的链上应用可以通过使用预编译合约，而不是自定义合约，变得更加节省 Gas 并提高安全性。 这主要适用于希望在 EVM 内部对验证者进行推理的应用程序，例如质押池、[再质押](/restaking/)、轻客户端、链桥以及零知识应用。

### 从状态中读取历史区块哈希值{#2935}

目前EVM 通过提供了 BLOCKHASH 操作码，使合约开发者能够直接在执行层中获取某个区块的哈希值。 然而，这一功能仅限于最近的 256 个区块，对于未来的无状态客户端(不保存完整状态的轻量化客户端）来说可能会带来问题。

[EIP-2935](https://eips.ethereum.org/EIPS/eip-2935)创建了一个新的系统合约，可以将最近 8192 个区块哈希作为存储槽提供。 这有助于确保协议在未来能够实现无状态执行，并且在采用 verkle tries 时会变得更加高效。 除此之外，Rollups 可以立刻从中受益，因为它们可以直接通过合约查询更长时间跨度的历史数据。

### 将委员会索引移出认证 {#7549}

信标链共识基于验证者对最新区块和最终周期的投票。 该认证包含三个要素，其中两个是投票，第三个是委员会索引值。

[EIP-7549](https://eips.ethereum.org/EIPS/eip-7549) 将此索引移出已签名的认证消息，这使得验证和聚合共识投票更加容易。 这将使每个共识客户端的效率得到提升，并为验证以太坊共识的零知识电路带来显著的性能提升。

### 将 blob 添加到执行层的（ EL) 配置文件 {#7840}

[EIP-7840](https://eips.ethereum.org/EIPS/eip-7840) 是一个简单的更改，它为执行层客户端配置添加了一个新字段。 可以配置区块数量，允许动态设置每个区块的目标blob和最大 blob 数量，以及 blob 手续费调整。 通过直接定义配置参数，客户端无需再通过Engine API(以太坊的一种协议接口)交换此类信息， 简化了操作。

<Alert variant="update">
<AlertContent>
<AlertDescription>
要了解 Pectra 对以太坊用户、开发者或验证者的具体影响，请查阅<a href="https://epf.wiki/#/wiki/pectra-faq">Pectra 常见问题解答</a>。
</AlertDescription>
</AlertContent>
</Alert>

## 这次升级会影响所有以太坊节点和验证者吗？ {#client-impact}

是的，Pectra 升级需要更新[执行客户端和共识客户端](/developers/docs/nodes-and-clients/)。 所有主要以太坊客户端都将发布支持硬分叉的版本，并将其列为优先级。 为了在升级后与以太坊网络保持同步，节点运营者必须确保正在运行支持的客户端版本。 请注意，关于客户端发布的信息具有时效性，用户应参考最新更新以获取最新详情。

## 硬分叉后如何转换以太币？ {#scam-alert}

- **您的 ETH 无需采取任何行动**：以太坊 Pectra 升级后，无需转换或升级您的 ETH。 硬分叉后，你的帐户余额不会改变，你目前持有的以太币仍将以其现有的形式保持可用。
- **当心诈骗！** <Emoji text="⚠️" />**任何引导你对以太币进行“升级”的人都是骗子**。你不需要进行任何与此升级有关的操作。 你的资产不会受到任何影响。 请记住，随时了解动态是防御诈骗的最佳手段。

[更多关于识别和规避诈骗的信息](/security/)

## 更愿意通过视频学习？ {#visual-learner}

<YouTube id="ufIDBCgdGwY" />

_Pectra 升级将包含哪些内容？ - Christine Kim_

<YouTube id="_UpAFpC7X6Y" />

_以太坊Pectra升级：质押者需要了解的内容 — Blockdaemon_

## 扩展阅读{#further-reading}

- [以太坊路线图](/roadmap/)
- [Pectra 常见问题解答](https://epf.wiki/#/wiki/pectra-faq)
- [Pectra.wtf 信息页面](https://pectra.wtf)
- [Pectra 如何提升质押者体验](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [EIP7702 信息页面](https://eip7702.io/)
- [Pectra 开发者测试网络](https://github.com/ethereum/pm/blob/master/Pectra/pectra-pm.md)
