---
title: 佩克特拉
metaTitle: Prague-Electra (佩克特拉)
description: 了解佩克特拉协议升级
lang: zh
authors: ["Nixo", "马里奥·哈维尔"]
---

佩克特拉网络升级紧随 [Dencun](/roadmap/dencun/) 之后，为以太坊的执行层和共识层带来了变化。缩写名称佩克特拉 (Pectra) 是 Prague 和 Electra 的组合，它们分别是执行层和共识层规范更改的名称。这些变化共同为 [以太坊](/) 用户、开发者和验证者带来了许多改进。

此次升级已于 **2025 年 5 月 7 日 10:05 (UTC)** 在以太坊主网的时段 `364032` 成功激活。

<Alert variant="update">
<AlertContent>
<AlertDescription>
佩克特拉升级只是以太坊长期发展目标中的一步。了解更多关于[协议路线图](/roadmap/)和[以往升级](/ethereum-forks/)的信息。
</AlertDescription>
</AlertContent>
</Alert>

## 佩克特拉的改进 {#new-improvements}

佩克特拉带来了以往任何升级中数量最多的 [EIP](https://eips.ethereum.org/)！其中有许多微小的变化，但也有一些重要的新功能。完整的更改列表和技术细节可以在包含的各个 EIP 中找到。

### 外部拥有账户 (EOA) 代码 {#7702}

[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) 代表了向广泛的[账户抽象](/roadmap/account-abstraction/)迈出的重要一步。借助此功能，用户可以设置其地址（[EOA](/glossary/#eoa)）以通过智能合约进行扩展。该 EIP 引入了一种具有特定功能的新型交易——允许地址所有者签署授权，将其地址设置为模拟选定的智能合约。 

通过此 EIP，用户可以选择使用可编程钱包，这些钱包支持交易捆绑、无 Gas 交易以及为替代恢复方案提供自定义资产访问等新功能。这种混合方法将 EOA 的简单性与基于合约的账户的可编程性结合在一起。 

在[此处](/roadmap/pectra/7702/)深入了解 7702

### 增加最大有效余额 {#7251}

目前验证者的有效余额正好是 32 ETH。这是参与共识所需的最低金额，但同时也是单个验证者可以质押的最大金额。

[EIP-7251](https://eips.ethereum.org/EIPS/eip-7251) 将最大可能的有效余额提高到 2048 ETH，这意味着单个验证者现在可以质押 32 到 2048 ETH。质押者现在可以选择任意数量的 ETH 进行质押，而不是 32 的倍数，并且可以从高于最低限额的每 1 ETH 中获得奖励。例如，如果验证者的余额随着奖励增加到 33 ETH，则额外的 1 ETH 也被视为有效余额的一部分并获得奖励。

但是，为验证者提供更好的奖励系统只是这项改进的一部分好处。[质押者](/staking/)运行多个验证者现在可以将它们聚合为一个验证者，这使得操作更加容易并减少了网络开销。因为信标链中的每个验证者在每个时段都会提交一个签名，所以带宽需求会随着验证者数量的增加和大量签名的传播而增长。聚合验证者将减轻网络负载并开启新的扩展选项，同时保持相同的经济安全性。

在[此处](/roadmap/pectra/maxeb/)深入了解 MaxEB

### 斑点吞吐量增加 {#7691}

斑点为二层网络 (L2) 提供[数据可用性](/developers/docs/data-availability/#data-availability-and-layer-2-rollups)。它们是在[上一次网络升级](/roadmap/dencun/)中引入的。 

目前，网络的目标是每个区块平均 3 个斑点，最多 6 个斑点。通过 [EIP-7691](https://eips.ethereum.org/EIPS/eip-7691)，平均斑点数量将增加到 6 个，每个区块最多 9 个，从而增加以太坊汇总的容量。该 EIP 有助于在 [PeerDAS](https://eips.ethereum.org/EIPS/eip-7594) 实现更高的斑点数量之前起到过渡作用。

### 增加调用数据成本 {#7623}

在[登昆升级中引入斑点](/roadmap/danksharding)之前，二层网络 (L2) 使用[调用数据](/developers/docs/data-availability/blockchain-data-storage-strategies/#calldata)将其数据存储在以太坊中。斑点和调用数据都会影响以太坊的带宽使用。虽然大多数区块只使用极少量的调用数据，但同时包含许多斑点的数据密集型区块可能会对以太坊的 P2P 网络造成损害。 

为了解决这个问题，[EIP-7623](https://eips.ethereum.org/EIPS/eip-7623) 提高了调用数据的定价，但仅针对数据密集型交易。这限制了最坏情况下的区块大小，激励二层网络 (L2) 仅使用斑点，并使超过 99% 的交易不受影响。

### 执行层可触发退出 {#7002}

目前，退出验证者并[提取质押的 ETH](/staking/withdrawals/) 是一项共识层操作，需要一个活跃的验证者密钥，即验证者用于执行证明等活跃职责的同一个 BLS 密钥。提款凭证是一个独立的冷密钥，用于接收退出的质押，但不能触发退出。质押者退出的唯一方法是使用活跃的验证者密钥签名，向信标链网络发送一条特殊消息。在提款凭证和验证者密钥由不同实体持有或验证者密钥丢失的情况下，这会受到限制。

[EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) 引入了一个新合约，可用于使用执行层提款凭证触发退出。质押者将能够通过调用这个特殊合约中的函数来退出其验证者，而完全不需要其验证者签名密钥或访问信标链。重要的是，在链上启用验证者提款，使得质押协议能够减少对节点运营商的信任假设。

### 链上验证者存款 {#6110}

验证者存款目前由 [eth1data 轮询](https://eth2book.info/capella/part2/deposits-withdrawals/deposit-processing/)处理，这是信标链上的一个函数，用于从执行层获取数据。这在某种程度上是合并之前的技术债务，当时信标链是一个独立的网络，必须考虑工作量证明 (PoW) 的重组问题。 

[EIP-6110](https://eips.ethereum.org/EIPS/eip-6110) 是一种将存款从执行层传递到共识层的新方法，它允许即时处理并降低了实现的复杂性。这是一种更安全的处理合并后以太坊原生存款的方法。它还有助于协议适应未来的发展，因为它不需要历史存款来引导节点，这对于历史数据过期是必要的。

### BLS12-381 的预编译合约 {#2537}

预编译合约是一组直接内置于以太坊虚拟机 ([EVM](/developers/docs/evm/)) 中的特殊智能合约。与常规合约不同，预编译合约不是由用户部署的，而是客户端实现本身的一部分，使用其原生语言（例如 Go、Java 等，而不是 Solidity）编写。预编译合约用于广泛使用和标准化的功能，例如密码学操作。智能合约开发者可以像调用常规合约一样调用预编译合约，但具有更高的安全性和效率。

[EIP-2537](https://eips.ethereum.org/EIPS/eip-2537) 为 [BLS12-381](https://hackmd.io/@benjaminion/bls12-381) 上的曲线操作添加了新的预编译合约。由于其实用的特性，这种椭圆曲线在加密货币生态系统中得到了广泛应用。更具体地说，它已被以太坊的共识层采用，供验证者使用。

新的预编译合约使每个开发者都能轻松、高效且安全地使用此曲线执行密码学操作，例如验证签名。依赖于此曲线的链上应用程序可以通过依赖预编译合约而不是某些自定义合约，变得更加节省 Gas 且更加安全。这主要适用于希望在 EVM 内部推断验证者的应用程序，例如质押池、[再质押](/restaking/)、轻客户端、跨链桥以及零知识应用。

### 从状态提供历史区块哈希 {#2935}

EVM 目前提供 `BLOCKHASH` 操作码，使合约开发者能够直接在执行层中检索区块的哈希。然而，这仅限于最近的 256 个区块，并且在未来可能会对无状态客户端造成问题。

[EIP-2935](https://eips.ethereum.org/EIPS/eip-2935) 创建了一个新的系统合约，可以将最近的 8192 个区块哈希作为存储槽提供。这有助于协议适应未来的无状态执行，并在采用 Verkle 树时变得更加高效。然而，除此之外，汇总可以立即从中受益，因为它们可以直接使用更长的历史窗口查询该合约。

### 将委员会索引移出证明 {#7549}

信标链共识基于验证者对最新区块和已最终确定的时段进行投票。证明包含 3 个元素，其中 2 个是投票，第 3 个是委员会索引值。

[EIP-7549](https://eips.ethereum.org/EIPS/eip-7549) 将此索引移出已签名的证明消息，这使得验证和聚合共识投票变得更加容易。这将提高每个共识客户端的效率，并能为证明以太坊共识的零知识电路带来显著的性能提升。

### 将斑点调度添加到执行层 (EL) 配置文件 {#7840}

[EIP-7840](https://eips.ethereum.org/EIPS/eip-7840) 是一个简单的更改，它向执行层客户端配置添加了一个新字段。它配置了区块数量，支持动态设置每个区块的目标和最大斑点数量以及 blob 费用调整。通过直接定义的配置，客户端可以避免通过引擎 API 交换此信息的复杂性。

<Alert variant="update">
<AlertContent>
<AlertDescription>
要了解更多关于佩克特拉如何具体影响您作为以太坊用户、开发者或验证者的信息，请查看<a href="https://epf.wiki/#/wiki/pectra-faq">佩克特拉常见问题解答</a>。
</AlertDescription>
</AlertContent>
</Alert>

## 此次升级是否会影响所有以太坊节点和验证者？ {#client-impact}

是的，佩克特拉升级需要同时更新[执行客户端和共识客户端](/developers/docs/nodes-and-clients/)。所有主要的以太坊客户端都将发布支持该硬分叉的版本，并将其标记为高优先级。为了在升级后保持与以太坊网络的同步，节点运营商必须确保他们运行的是受支持的客户端版本。请注意，有关客户端发布的信息具有时效性，用户应参考最新更新以获取最新详情。

## 硬分叉后如何转换 ETH？ {#scam-alert}

- **您的 ETH 无需任何操作**：在以太坊佩克特拉升级之后，您无需转换或升级您的 ETH。您的账户余额将保持不变，并且您目前持有的 ETH 在硬分叉后仍将以现有形式可用。
- **谨防诈骗！** <Emoji text="⚠️" /> **任何指示您“升级” ETH 的人都是在试图诈骗您。**关于此次升级，您不需要做任何事情。您的资产将完全不受影响。请记住，保持信息灵通是防范诈骗的最佳方法。

[了解更多关于识别和避免诈骗的信息](/security/)

## 更喜欢视觉学习？ {#visual-learner}

<VideoWatch slug="pectra-upgrade-overview" />

_佩克特拉升级包含哪些内容？ - Christine Kim_

<VideoWatch slug="pectra-what-stakers-need-to-know" />

_以太坊佩克特拉升级：质押者需要知道什么 — Blockdaemon_

## 延伸阅读 {#further-reading}

- [以太坊路线图](/roadmap/)
- [佩克特拉常见问题解答](https://epf.wiki/#/wiki/pectra-faq)
- [Pectra.wtf 信息页面](https://pectra.wtf)
- [佩克特拉如何提升质押者体验](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [EIP-7702 信息页面](https://eip7702.io/)
- [佩克特拉开发者网络 (devnets)](https://github.com/ethereum/pm/blob/master/Network-Upgrade-Archive/Pectra/pectra-pm.md)