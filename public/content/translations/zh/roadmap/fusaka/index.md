---
title: Fulu-Osaka (Fusaka)
description: "了解 Fusaka 协议升级"
lang: zh
---

# Fusaka <Emoji text="🦓" /> {#fusaka}

**备受期待的以太坊 Fusaka 升级已于 2025 年 12 月 3 日上线**

Fusaka 网络升级将在 [Pectra](/roadmap/pectra/) 升级后进行，将引入更多新功能并改进每位以太坊用户和开发者的体验。 该名称由执行层升级 Osaka 和以 Fulu 星命名的共识层版本组成。 以太坊的两个部分均获得升级，推动以太坊的扩容、安全性和用户体验迈向未来。

<Alert variant="update">
<AlertContent>
<AlertDescription>
Fusaka 升级只是以太坊长期发展目标中的其中一环。 了解有关[协议路线图](/roadmap/)和[以往升级](/ethereum-forks/)的更多信息。
</AlertDescription>
</AlertContent>
</Alert>

## Fusaka 的改进 {#improvements-in-fusaka}

### 扩容 blob {#scale-blobs}

#### 点对点数据可用性采样 (PeerDAS) {#peerdas}

这是 Fusaka 分叉的_重头戏_，是本次升级中添加的主要功能。 二层网络目前将数据以 blob 形式发布到以太坊，blob 是专为二层网络创建的临时数据类型1. 在 Fusaka 之前，每个全节点都必须存储每个 blob 来确保数据存在。 由于 blob 吞吐量的增加，必须下载所有这些数据变得资源密集且难以维持。

通过[数据可用性采样](https://notes.ethereum.org/@fradamt/das-fork-choice)，每个节点不再必须存储所有 blob 数据，而是只负责 blob 数据的一个子集。 blob 均匀随机地分布在网络上的所有节点，每个全节点只需保存八分之一的数据，因此理论上能够实现八倍的扩容。 为确保数据可用性，任何数据片段均可通过现有数据的 50% 进行重建，所采用的方法能将数据错误或缺失概率降至密码学意义上可忽略的水平（约 10<sup>20</sup> 分之一到 10<sup>24</sup> 分之一）。

这在保持节点的硬件和带宽要求稳定的同时，实现了 blob 扩容，从而实现二层网络扩容并降低其费用。

[深入了解 PeerDAS](/roadmap/fusaka/peerdas/)

**资源**：

- [EIP-7594 技术规范](https://eips.ethereum.org/EIPS/eip-7594)
- [DappLion 谈 PeerDAS：当今以太坊的扩容之道 | ETHSofia 2024](https://youtu.be/bONWd1x2TjQ?t=328)
- [学术：以太坊 PeerDAS 文档 (PDF)](https://eprint.iacr.org/2024/1362.pdf)

#### 仅 Blob 参数分叉 {#blob-parameter-only-forks}

二层网络扩容以太坊——由于这些网络的增长，他们需要将更多数据发布到以太坊。 这意味着随着时间推移，以太坊将需要提高可用的 blob 数量。 尽管 PeerDAS 实现了 blob 数据的扩容，但这仍需要逐步安全地完成。

由于以太坊是在数千个独立节点上运行的代码，这些节点需要就相同的规则达成一致，因此我们不能像部署网站更新那样，简单地引入增加 blob 数量之类的更改。 任何规则的变更都必须是一次协调后的升级，其中每个节点、客户端和验证者软件都必须在同一个预定区块之前进行升级。

这些协调后的升级通常包括许多更改，需要许多测试并会花费许多时间。 为了更改适应二层网络不断变化的 blob 需求，blob 参数分叉引入一种机制来增加 blob 数量，而无需等待升级流程。

Blob 参数分叉能够由客户端进行设置，与 gas 限制等其他配置类似。 在以太坊主要升级之间，客户端可以同意增加`目标`和`最大` blob 数量，如 9 个和 12 个，随后节点运营者将更新以参与该小型分叉。 Blob 参数分叉可以随时进行配置。

在 Dencun 升级中首次向网络添加 blob 时，目标数量是 3。 在 Pectra 升级中，该数量增加到 6。在 Fusaka 升级之后，现在可以独立于这些主要网络升级，以可持续的速度增加该数量。

![图表显示每个区块的平均 blob 数量以及随着升级而增加的目标](./average-blob-count-per-block.webp)

图表来源：[Ethereum Blobs - @hildobby, Dune Analytics](https://dune.com/hildobby/blobs)

**资源**：[EIP-7892 技术规范](https://eips.ethereum.org/EIPS/eip-7892)

#### Blob 基本费用受到执行成本限制 {#blob-base-fee-bounded-by-execution-costs}

二层网络在发布数据时支付两笔费用：blob 费用和用于验证这些 blob 的执行 gas。 如果执行 gas 占主导地位，blob 费用拍卖可能会下降到 1 wei，并不再作为价格信号。

EIP-7918 为每个 blob 设定了一个比例底价。 当储备金高于名义 blob 基本费用时，费用调整算法会将该区块视为超出目标，并停止压低费用，允许其正常上涨。 因此：

- blob 费用市场始终对拥塞作出反应
- 二层网络至少要为它们强加给节点的计算支付一部分有意义的费用
- 执行层基本费用飙升不再会导致 blob 费用停留在 1 wei

**资源**：

- [EIP-7918 技术规范](https://eips.ethereum.org/EIPS/eip-7918)
- [故事书解说](https://notes.ethereum.org/@anderselowsson/AIG)

### 扩容 L1 {#scale-l1}

#### 历史记录到期和更简单的收据 {#history-expiry}

2025 年 7 月，以太坊执行客户端 [开始支持部分历史记录到期](https://blog.ethereum.org/2025/07/08/partial-history-exp)。 此举删除了比[合并](https://ethereum.org/roadmap/merge/)更早的历史记录，以便在以太坊不断增长的同时，减少节点运营者所需的磁盘空间。

该 EIP 位于“核心 EIP”之外的章节，因为该分叉实际上并未实现任何更改——它只是一个通知，即客户端团队必须在 Fusaka 升级前支持历史记录到期。 实际上，客户端可以随时实现这一点，但将其添加到升级中，可将其明确地列入待办事项列表，并使他们能够结合此功能测试 Fusaka 的更改。

**资源**：[EIP-7642 技术规范](https://eips.ethereum.org/EIPS/eip-7642)

#### 为MODEXP设置上限{#set-upper-bounds-for-modexp}

直到现在，MODEXP预编译合约几乎可以接受任意大小的数字。 这使其难以测试、易被滥用，并为客户端稳定性带来风险。 EIP-7823规定了明确的限制：每个输入数字最多为8192位（1024 字节）。 超过这个限制的输入会被拒绝，交易消耗的Gas会被燃烧掉，且不会产生任何状态变化。 这一限制完全满足现实世界的需求，同时排除了那些极端情况，这些极端情况曾让Gas限额计划和安全审查变得复杂。 这一改动在不影响用户或开发者体验的前提下，提升了安全性并增强了DoS保护。

**资源**：[EIP-7823 技术规范](https://eips.ethereum.org/EIPS/eip-7823)

#### 交易Gas上限{#transaction-gas-limit-cap}

EIP-[7825](https://eips.ethereum.org/EIPS/eip-7825)为每笔交易增加了 16,777,216（2²⁴）Gas 的上限。 这是主动的DoS防御措施，在提升区块gas上限的同时，依然通过限定单笔交易最坏情况成本来进行约束。 它使得节点的验证和传播更容易建模，从而让我们能够通过提高gas上限来应对扩容问题。

为什么正好是2^24gas？ 它比当前的区块gas上限要小得多，但足够支持真实合约部署和复杂的预编译操作，而且作为2的幂，便于在各客户端中实现。 这个新的最大交易大小与 Pectra 升级前的平均区块大小类似，因此对于以太坊上的任何操作来说，这是一个合理的限制。

**资源**：[EIP-7825 技术规范](https://eips.ethereum.org/EIPS/eip-7825)

#### `MODEXP` 燃料成本增加 {#modexp-gas-cost-increase}

MODEXP是一个预编译的内置函数，用于计算模指数运算,这是一种大数运算，常用于 RSA 签名验证和证明系统。 它允许智能合约直接执行这些计算，而无需自己去实现运算逻辑。

开发者和客户端团队认为，MODEXP是提高区块gas上限的主要障碍，因为当前的gas定价常常低估了某些输入所需的计算量。 这意味着一次使用MODEXP的交易可能会占用处理整个区块所需的大部分时间，从而导致网络变慢。

此 EIP 通过以下方式更改定价以匹配实际计算成本：

- 将最低费用从200gas提高到500gas，并在一般费用计算中取消EIP-2565提出的三分之一折扣
- 当指数输入很长时，成本会急剧增加。 如果指数（即作为第二个参数传递的“幂”数）长于32字节/256 位，则每个额外增加的字节其gas费用上升得更快
- 对较大的底数或模数也会额外收费。 另外两个数字（底数和模数）假设至少为 32 字节——如果其中任何一个更大，费用会按其大小成比例增加

通过将费用更准确地与实际处理时间匹配，MODEXP不再会导致区块验证时间过长。 这一改动是多项措施之一，旨在为未来安全地提高以太坊区块gas上限铺平道路。

**资源**：[EIP-7883 技术规范](https://eips.ethereum.org/EIPS/eip-7883)

#### 递归长度前缀 (RLP) 执行区块大小限制 {#rlp-execution-block-size-limit}

这为区块大小设定了上限——这是对通过网络_发送_的内容的限制，与燃料限制不同，后者限制的是区块内的_工作量_。 区块大小上限为 10 MiB，并为共识数据保留了少量余量 (2 MiB)，以便所有内容都能干净利落地适配和传播。 如果出现的区块大于该值，客户端将拒绝它。
这是必要的，因为非常大的区块需要更长的时间在网络中传播和验证，并可能产生共识问题或被滥用为 DoS 攻击媒介。 此外，共识层的 gossip 协议已经不会转发超过约 10 MiB 的区块，因此将执行层与该限制对齐，可以避免出现“一些节点看到，另一些节点丢弃”的奇怪情况。

细节：这是对 [RLP](/developers/docs/data-structures-and-encoding/rlp/) 编码的执行区块大小的限制。 总共 10 MiB，为信标区块框架保留了 2 MiB 的安全余量。 实际上，客户端定义

`MAX_BLOCK_SIZE = 10,485,760` 字节和

`SAFETY_MARGIN = 2,097,152` 字节，

并拒绝 RLP 有效负载超过以下限制的任何执行区块

`MAX_RLP_BLOCK_SIZE = MAX_BLOCK_SIZE − SAFETY_MARGIN`

其目标是限制最坏情况下的传播/验证时间，并与共识层 gossip 行为保持一致，从而在不改变燃料记账的前提下，降低重组/DoS 攻击风险。

**资源**：[EIP-7934 技术规范](https://eips.ethereum.org/EIPS/eip-7934)

#### 将默认燃料限制设置为 6000 万 {#set-default-gas-limit-to-60-million}

在2025年2月将 gas 上限从30M 提高到36M（随后又提升至 45M）之前，这个数值自合并（2022 年 9 月）以来一直未曾改变。 该EIP旨在将持续扩容作为优先事项。

EIP-7935提案协调执行层EL客户端团队，在Fusaka升级中将默认gas上限提高到当前45M以上。 这是一个信息类提案EIP，但它明确要求客户端在开发网络devnets上测试更高的上限，测试出一个安全值，并在其Fusaka版本中发布该数值。

开发网Devnet的规划目标是约60M的压力测试（使用合成负载填满区块）并进行逐步提升；研究表明，即使在极端情况下，真正的风险阈值在150M左右。 推出时应与交易gas上限限制（EIP-7825）配合测试，这样即使整体上限提高，也不会出现单笔交易占据主导的情况。

**资源**：[EIP-7935 技术规范](https://eips.ethereum.org/EIPS/eip-7935)

### 改善用户体验 {#improve-ux}

#### 确定性区块提议者预览{#deterministic-proposer-lookahead}

通过 EIP-7917，信标链将能够知道下一个时隙的区块提议者。 明确知道将要提议区块的验证者能够带来[预确定性](https://ethresear.ch/t/based-preconfirmations/17353)——与即将到来的提议者达成承诺以确保用户交易将被包含在其区块中，而无需等待实际的区块。

此功能有利于客户端实现和网络安全，因为它避免了验证者操纵提议者流程的边界情况。 预览机制还能降低实现的复杂度。

**资源**：[EIP-7917 技术规范](https://eips.ethereum.org/EIPS/eip-7917)

#### 计数前导零 (CLZ) 操作码 {#count-leading-zeros-opcode}

该功能添加了一个小型 EVM 指令，**计算前导零 (CLZ)**。 EVM 中的几乎所有内容都表示为 256 位值——这个新操作码返回前面有多少个零位。 这是许多指令集架构都具有的普通功能，因为它实现了更高效的算术运算。 实际上，这会把当前手工实现的逐位扫描bit scan合并为一步操作，通过找到第一个置位first set bit，扫描字节或解析位字段bitfields都变得更简单、更节省。 这个操作码消耗低、费用固定，并且经过基准测试，其性能与基本的加法操作相当。这样可以减少字节码长度，同时在完成相同工作的情况下节省gas。

**资源**：[EIP-7939 技术规范](https://eips.ethereum.org/EIPS/eip-7939)

#### 用于支持 secp256r1 曲线的预编译 {#secp256r1-precompile}

在固定地址 `0x100` 处引入一个内置的、通行密钥风格的 secp256r1 (P-256) 签名检查器，使用许多 L2 已经采用的相同调用格式并修复边缘情况，以便为这些环境编写的合约可以在 L1 上运行而无需更改。

用户体验升级！ 对于用户来说，这解锁了设备原生签名和通行密钥。 钱包可以直接利用 Apple Secure Enclave、Android 密钥库、硬件安全模块 (HSM) 和 FIDO2/WebAuthn——无需助记词，入门更顺畅，多重身份验证流程感觉就像现代应用程序一样。 这带来了更好的用户体验、更轻松的恢复以及与数十亿台设备已有的模式相匹配的账户抽象模式。

对于开发者来说，它接受 160 字节的输入并返回 32 字节的输出，从而可以轻松移植现有库和 L2 合约。 在底层，它包括无限远点和模比较检查，以消除棘手的边缘情况，而不会破坏有效的调用者。

**资源**：

- [EIP-7951 技术规范](https://eips.ethereum.org/EIPS/eip-7951)
- [关于 RIP-7212 的更多信息](https://www.alchemy.com/blog/what-is-rip-7212) _（请注意，EIP-7951 取代了 RIP-7212）_

### 元数据 {#meta}

#### `eth_config` JSON-RPC 方法 {#eth-config}

这是一个 JSON-RPC 调用，允许您询问节点正在运行什么分叉设置。 它返回三个快照：`current`、`next` 和 `last`，以便验证者和监控工具可以验证客户端是否为即将到来的分叉做好准备。

实际上，这是为了解决在 2025 年初 Pectra 分叉在 Holesky 测试网上线时发现的一个缺陷，当时轻微的配置错误导致了非最终确定状态。 这有助于测试团队和开发者确保主要分叉在从开发网迁移到测试网，以及从测试网迁移到主网时，能够按预期运行。

快照包括：`chainId`、`forkId`、计划的分叉激活时间、哪些预编译是活动的、预编译地址、系统合约依赖项以及分叉的 blob 时间表。

该 EIP 位于“核心 EIP”之外的章节，因为该分叉实际上并未实现任何更改——它只是一个通知，即客户端团队必须在 Fusaka 升级前实现此 JSON-RPC 方法。

**资源**：[EIP-7910 技术规范](https://eips.ethereum.org/EIPS/eip-7910)

## 常见问题 {#faq}

### 这次升级会影响所有以太坊节点和验证者吗？ {#does-this-upgrade-affect-all-ethereum-nodes-and-validators}

是的，Fusaka 升级需要同时更新[执行客户端和共识客户端](/developers/docs/nodes-and-clients/)。 所有主要以太坊客户端都将发布支持硬分叉的版本，并将其列为优先级。 你可以通过以下途径了解这些客户端版本的发布时间：客户端的GitHub库、它们的[Discord 频道](https://ethstaker.org/support)、[EthStaker Discord](https://dsc.gg/ethstaker)，或者订阅以太坊博客以获取协议更新。 为了在升级后与以太坊网络保持同步，节点运营者必须确保正在运行支持的客户端版本。 请注意，关于客户端发布的信息具有时效性，用户应参考最新更新以获取最新详情。

### 硬分叉后如何转换以太币？ {#how-can-eth-be-converted-after-the-hardfork}

- **不需要对你的 ETH 进行任何操作**：在以太坊 Fusaka 升级之后，无需转换或升级你的 ETH。 硬分叉后，你的帐户余额不会改变，你目前持有的以太币仍将以其现有的形式保持可用。
- **当心诈骗！** <Emoji text="⚠️" />**任何引导你对以太币进行“升级”的人都是骗子**。你不需要进行任何与此升级有关的操作。 你的资产不会受到任何影响。 请记住，随时了解动态是防御诈骗的最佳手段。

[更多关于识别和规避诈骗的信息](/security/)

### 为什么要用斑马？ <Emoji text="🦓" /> {#whats-with-the-zebras}

斑马是开发者为 Fusaka 选择的“吉祥物”，因为它的条纹反映了 PeerDAS 基于列的数据可用性采样，其中节点保管某些列子网，并从每个对等点时隙中采样其他一些列，以检查 blob 数据是否可用。

2022 年的合并[使用熊猫](https://x.com/hwwonx/status/1431970802040127498)作为吉祥物，以表示执行层和共识层的合并。 从那时起，每个分叉都非正式地选择了吉祥物，并在升级时以 ASCII 艺术的形式出现在客户端日志中。 这只是一种有趣的庆祝方式。

### L2 扩容方面有哪些改进？ {#what-improvements-are-included-for-l2-scaling}

[PeerDAS](/roadmap/fusaka/peerdas) 是该分叉的主要功能。 它实现了数据可用性采样 (DAS)，为 rollup 解锁了更大的可扩展性，理论上可将 blob 空间扩展到当前大小的 8 倍。 Blob 费用市场也将得到改进，以有效应对拥堵，并保证 L2 为 blob 对节点造成的计算和空间支付有意义的费用。

### BPO 分叉有何不同？ {#how-are-bpo-forks-different}

仅 Blob 参数分叉提供了一种机制，可以在 PeerDAS 激活后持续增加 blob 数量（目标和最大值），而无需等待完全协调的升级。 每次增加都被硬编码为在支持 Fusaka 的客户端版本中预先配置。

作为用户或验证者，您无需为每个 BPO 更新客户端，只需确保关注像 Fusaka 这样的主要硬分叉即可。 这与以前的做法相同，不需要采取特殊操作。仍然建议在升级和 BPO 期间监控您的客户端，并在主要版本之间也保持更新，因为修复或优化可能会跟随硬分叉。

### BPO 的时间表是怎样的？ {#what-is-the-bpo-schedule}

BPO 更新的确切时间表将随 Fusaka 的发布而确定。 关注[协议公告](https://blog.ethereum.org/category/protocol)和您的客户端的发布说明。

它可能看起来像这样：

- Fusaka 之前：目标 6，最大 9
- Fusaka 激活时：目标 6，最大 9
- BPO1，Fusaka 激活后几周：目标 10，最大 15，增加三分之二
- BPO2，BPO1 之后几周：目标 14，最大 21

### 这会降低以太坊（一层网络）上的费用吗？{#will-this-lower-gas}

这次升级不会降低一层网络的燃料费用，至少不会直接降低。 主要重点是为 rollup 数据提供更多的 blob 空间，从而降低二层网络上的费用。 这可能对一层网络的费用市场产生一些副作用，但预计不会有重大变化。

### 作为质押者，我需要为这次升级做什么？ {#as-a-staker-what-do-i-need-to-do-for-the-upgrade}

与每次网络升级一样，请确保将您的客户端更新到支持 Fusaka 的最新版本。 关注邮件列表和 [EF 博客上的协议公告](https://blog.ethereum.org/category/protocol)以获取有关版本发布的信息。
在 Fusaka 在主网上激活之前，您可以在测试网上运行验证者来验证您的设置。 Fusaka [在测试网上激活得更早](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement)，为您提供更多空间以确保一切正常并报告错误。 测试网分叉也会在邮件列表和博客中公布。

### “确定性提议者前瞻”(EIP-7917) 是否会影响验证者？ {#does-7917-affect-validators}

此更改不会改变您的验证者客户端的功能，但是，它将让您更深入地了解您未来的验证者职责。 请务必更新您的监控工具以跟上新功能。

### Fusaka 对节点和验证者的带宽要求有何影响？ {#how-does-fusaka-affect-bandwidth-requirements-for-nodes-and-validators}

PeerDAS 对节点传输 blob 数据的方式做出了重大改变。 所有数据都被分成称为列的片段，分布在 128 个子网上，节点只订阅其中一部分。 节点必须保管的子网列数量取决于其配置和连接的验证者数量。 实际的带宽要求将取决于网络中允许的 blob 数量和节点类型。 在 Fusaka 激活时，blob 目标与之前保持相同，但有了 PeerDAS，节点运营者可以看到他们的 blob 磁盘使用量和网络流量有所减少。 随着 BPO 在网络中配置更高的 blob 数量，必要的带宽将随每个 BPO 而增加。

即使在 Fusaka BPO 之后，节点要求仍在[建议的范围](https://eips.ethereum.org/EIPS/eip-7870)内。

#### 全节点 {#full-nodes}

没有任何验证者的常规节点将只订阅 4 个子网，为原始数据的 1/8 提供保管。 这意味着在 blob 数据量相同的情况下，下载它们的节点带宽将减少八分之一 (8)。 普通全节点的磁盘使用量和 blob 下载带宽可能会减少约 80%，仅为几 Mb。

#### 独立质押者 {#solo-stakers}

如果该节点用于验证者客户端，它就必须保管更多的列，因此需要处理更多的数据。 添加验证者后，节点至少订阅 8 个列子网，因此处理的数据是常规节点的两倍，但仍比 Fusaka 之前少。 如果验证者余额超过 287 ETH，将订阅越来越多的子网。

对于独立质押者来说，这意味着他们的磁盘使用量和下载带宽将减少约 50%。 然而，要在本地构建区块并将所有 blob 上传到网络，需要更高的上传带宽。 在 Fusaka 升级时，本地构建者将需要比以前高 2-3 倍的上行带宽。随着 BPO2 的目标 blob 数量达到 15/21，最终所需的上行带宽将需要高出约 5 倍，达到 100Mpbs。

#### 大型验证者 {#large-validators}

订阅的子网数量随着更多的余额和添加到节点的验证者而增长。 例如，大约 800 ETH 的余额，该节点保管 25 个列，将需要比以前多大约 30% 的下载带宽。 必要的上传带宽与常规节点类似，至少需要 100Mbps。

在 4096 ETH，即 2 个最大余额验证者时，节点将成为“超级节点”，保管所有列，因此下载和存储所有内容。 这些节点通过回传缺失数据来积极修复网络，但也需要更多的带宽和存储空间。 最终的 blob 目标比以前高 6 倍，超级节点将不得不额外存储约 600GB 的 blob 数据，并需要更快的持续下载带宽，约为 20Mbps。

[阅读有关预期要求的更多详细信息。](https://ethpandaops.io/posts/fusaka-bandwidth-estimation/#theoretical-requirements)

### 实现了哪些 EVM 更改？ {#what-evm-changes-are-implemented}

Fusaka 通过新的微小更改和功能巩固了 EVM。

- 为了在扩容时确保安全，单笔交易的最大大小将[限制为 1670 万](https://eips.ethereum.org/EIPS/eip-7825)单位燃料。
- [新的操作码计算前导零 (CLZ)](https://eips.ethereum.org/EIPS/eip-7939) 已添加到 EVM，将使智能合约语言能够更有效地执行某些操作。
- [`ModExp` 预编译的成本将增加](https://eips.ethereum.org/EIPS/eip-7883)——使用它的合约将收取更多的执行燃料。

### 新的 1600 万燃料限制对合约开发者有何影响？ {#how-does-new-16m-gas-limit-affects-contract-developers}

Fusaka 引入了对[单笔交易最大大小的限制，为 1670 万](https://eips.ethereum.org/EIPS/eip-7825) (2^24) 个燃料单位。 这大致相当于之前一个普通区块的大小，使其足以容纳会消耗整个区块的复杂交易。 此限制为客户端提供了保护，防止将来在区块燃料限制更高的情况下出现潜在的 DoS 攻击。 扩容的目标是使更多交易能够进入区块链，而不会让单笔交易消耗整个区块。

普通用户交易远未达到此限制。 某些边缘情况可能会受到此更改的影响，例如大型复杂的 DeFi 操作、大型智能合约部署或针对多个合约的批量交易。 这些交易将不得不被分成更小的交易或以其他方式进行优化。 在提交可能达到限制的交易之前，请使用模拟功能。

RPC 方法 `eth_call` 没有限制，将允许模拟比实际区块链限制更大的交易。 RPC 方法的实际限制可以由客户端运营者配置，以防止滥用。

### CLZ 对开发者意味着什么？ {#what-clz-means-for-developers}

像 Solidity 这样的 EVM 编译器将在底层实现并利用新的计数零函数。 如果新合约依赖于此类操作，可能会从燃料节省中受益。 关注智能合约语言的发布和功能公告，以获取有关潜在节省的文档。

### 对我现有的智能合约有任何更改吗？ {#what-clz-means-for-developers}

Fusaka 没有会破坏任何现有合约或改变其行为的直接影响。 对执行层引入的更改是为了向后兼容，但是，请始终关注边缘情况和潜在影响。

[随着 `ModExp` 预编译的成本增加](https://eips.ethereum.org/EIPS/eip-7883)，依赖它的合约将消耗更多的执行燃料。 如果您的合约严重依赖此功能，并且对用户来说变得更加昂贵，请重新考虑其利用方式。

如果执行您合约的交易可能达到类似大小，请考虑[新的 1670 万限制](https://eips.ethereum.org/EIPS/eip-7825)。

## 扩展阅读{#further-reading}

- [以太坊路线图](/roadmap/)
- [Forkcast: Fusaka](https://forkcast.org/upgrade/fusaka)
- [Fusaka Meta EIP](https://eips.ethereum.org/EIPS/eip-7607)
- [Fusaka 测试网博客公告](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement)
- [Bankless: Fusaka 和 Pectra 将为以太坊带来什么](https://www.bankless.com/read/what-fusaka-pectra-will-bring-ethereum)
- [Bankless：以太坊的下一步升级：Fusaka、Glamsterdam及未来，与 Preston Van Loon对谈](https://x.com/BanklessHQ/status/1956017743289020633?t=502)
- [Fusaka 文件](https://www.youtube.com/playlist?list=PL4cwHXAawZxpz-erUbKKUnnGoQNdF8s7Z)
- [PEEPanEIPs 解说](https://www.youtube.com/playlist?list=PL4cwHXAawZxoIenfk7OJry4rxcqX-eqBt)
