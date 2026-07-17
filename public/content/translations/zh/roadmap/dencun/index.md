---
title: 坎昆-Deneb (Dencun)
metaTitle: 坎昆-Deneb (Dencun) 常见问题解答
description: 关于坎昆-Deneb (Dencun) 网络升级的常见问题解答
lang: zh
---

坎昆-Deneb (Dencun) 是对以太坊网络的一次升级，它激活了 **Proto-Danksharding (EIP-4844)**，引入了临时数据**斑点**，从而为 [二层网络 (l2)](/glossary/#layer-2) Rollup 提供更便宜的存储。

一种新的交易类型使 Rollup 提供商能够以更具成本效益的方式将数据存储在所谓的“斑点”中。斑点保证在网络上可用约 18 天（更准确地说，是 4096 个[时段](/glossary/#epoch)）。在此期间之后，斑点将从网络中被修剪，但应用程序仍然可以使用证明来验证其数据的有效性。 

这显著降低了汇总的成本，限制了链的增长，并有助于在保持安全性和去中心化的节点运营商集合的同时支持更多用户。

## 我们预计汇总何时会因 Proto-Danksharding 而反映出更低的费用？ {#when}

- 此次升级在时段 269568 激活，时间为 **2024 年 3 月 13 日下午 13:55 (UTC)**
- 所有主要的 Rollup 提供商（如 Arbitrum 或 Optimism）都已表示，将在升级后立即支持斑点
- 各个 Rollup 支持的时间表可能会有所不同，因为每个提供商都必须更新其系统以利用新的斑点空间

## 硬分叉后如何转换 ETH？ {#scam-alert}

- **您的 ETH 无需执行任何操作**：在以太坊 Dencun 升级之后，无需转换或升级您的 ETH。您的账户余额将保持不变，并且您目前持有的 ETH 在硬分叉后仍将以其现有形式可供访问。
- **谨防诈骗！** <Emoji text="⚠️" /> **任何指示您“升级”您的 ETH 的人都是在试图诈骗您。** 关于此次升级，您无需执行任何操作。您的资产将完全不受影响。请记住，保持信息灵通是防范诈骗的最佳手段。

[了解更多关于识别和避免诈骗的信息](/security/)

## Dencun 网络升级解决了什么问题？ {#network-impact}

Dencun 主要通过**可负担的费用**解决**可扩展性**（处理更多用户和更多交易）问题，同时**保持网络的去中心化**。

以太坊社区一直采取“以 Rollup 为中心”的方法来实现其增长，将二层网络 (l2) 汇总作为安全支持更多用户的主要手段。

Rollup 网络在主网之外处理（或“执行”）交易，然后将结果的加密证明和/或压缩的交易数据发布回主网以进行记录。存储这些证明会产生费用（以 [Gas](/glossary/#gas) 的形式），在 Proto-Danksharding 之前，这些证明必须由所有网络节点运营商永久存储，这使其成为一项昂贵的任务。

Dencun 升级中引入的 Proto-Danksharding 为这些证明增加了更便宜的数据存储，仅要求节点运营商将这些数据存储约 18 天，之后可以安全地删除数据以防止硬件需求扩张。因为汇总通常有 7 天的提款期，只要斑点在此期间在 一层网络 (l1) 上可用，其安全模型就不会改变。18 天的修剪窗口为这一时期提供了充足的缓冲。

[了解更多关于扩展以太坊的信息](/roadmap/scaling/)

## 如何访问旧的斑点数据？ {#historical-access}

虽然常规的以太坊节点将始终保留网络的_当前状态_，但历史斑点数据可以在其引入约 18 天后被丢弃。在丢弃这些数据之前，以太坊确保它已提供给所有网络参与者，从而留出时间用于：

- 感兴趣的各方下载并存储数据。
- 完成所有 Rollup 挑战期。
- 最终确定 Rollup 交易。

出于各种原因，可能需要_历史_斑点数据，并且可以使用几种去中心化的协议来存储和访问这些数据：

- **第三方索引协议**（例如 The Graph）通过由加密经济机制激励的去中心化节点运营商网络来存储这些数据。
- **BitTorrent** 是一种去中心化协议，志愿者可以在其中保存这些数据并将其分发给其他人。
- **[以太坊波特尔网络](/developers/docs/networking-layer/portal-network/)** 旨在通过去中心化的节点运营商网络，以类似于 BitTorrent 的方式在参与者之间分发数据，从而提供对所有以太坊数据的访问。
- **个人用户**始终可以自由存储他们希望用于历史参考的任何数据的副本。
- **Rollup 提供商**受到激励去存储这些数据，以增强其 Rollup 的用户体验。
- **区块浏览器**通常运行归档节点，这些节点对所有这些信息进行索引和存储，以便于历史参考，用户可以通过 Web 界面进行访问。

需要注意的是，恢复历史状态在 **1-of-N 信任模型**上运行。这意味着您只需要来自_单个可信来源_的数据，即可使用网络的当前状态验证其正确性。

## 此次升级对更广泛的以太坊路线图有何贡献？ {#roadmap-impact}

Proto-Danksharding 为全面实施 [丹克分片](/roadmap/danksharding/) 奠定了基础。丹克分片旨在将 Rollup 数据的存储分布在各个节点运营商之间，因此每个运营商只需处理总数据的一小部分。这种分布将增加每个区块的数据斑点数量，这对于扩展以太坊以处理更多用户和交易至关重要。

这种可扩展性对于以可负担的费用和更高级的应用程序[在以太坊上支持数十亿用户](/roadmap/scaling/)，同时保持去中心化网络至关重要。如果没有这些变化，节点运营商的硬件需求将会升级，导致需要越来越昂贵的设备。这可能会将较小的运营商挤出市场，导致网络控制权集中在少数大型运营商手中，这将违背去中心化的原则。

## 此次升级是否会影响所有以太坊共识和验证者客户端？ {#client-impact}

是的，Proto-Danksharding (EIP-4844) 需要对执行客户端和共识客户端进行更新。所有主要的以太坊客户端都发布了支持该升级的版本。为了在升级后保持与以太坊网络的同步，节点运营商必须确保他们运行的是受支持的客户端版本。请注意，有关客户端发布的信息具有时效性，用户应参考最新更新以获取最新详细信息。[查看有关受支持客户端发布的详细信息](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement#client-releases)。

共识客户端处理_验证者_软件，这些软件均已更新以适应此次升级。

## 坎昆-Deneb (Dencun) 如何影响以太坊测试网？ {#testnet-impact}

- 开发者网络 (Devnets)、Sepolia 和 Holesky 都经历了 Dencun 升级，并且 Proto-Danksharding 已全面运行
- Rollup 开发人员可以使用这些网络进行 EIP-4844 测试
- 大多数用户将完全不受每个测试网的这一变化的影响

## 现在 二层网络 (l2) 上的所有交易都会使用临时斑点空间吗，还是您可以选择？ {#calldata-vs-blobs}

以太坊二层网络 (l2) 上的 Rollup 交易可以选择使用两种类型的数据存储：临时斑点空间或永久智能合约调用数据。斑点空间是一种经济的选择，以较低的成本提供临时存储。它保证了所有必要挑战期的数据可用性。另一方面，智能合约调用数据提供永久存储，但价格更昂贵。

使用斑点空间还是调用数据的决定主要由 Rollup 提供商做出。他们根据当前对斑点空间的需求做出此决定。如果斑点空间需求量大，汇总可能会选择调用数据，以确保及时发布数据。

虽然理论上用户可以选择他们首选的存储类型，但 Rollup 提供商通常会管理这种选择。向用户提供此选项会增加复杂性，特别是在具有成本效益的捆绑交易中。有关此选择的具体细节，用户应参考各个 Rollup 提供商提供的文档。

## 4844 会降低 一层网络 (l1) Gas 吗？ {#l1-fee-impact}

不会显著降低。引入了一个专门用于斑点空间的新 Gas 市场，供 Rollup 提供商使用。_虽然通过将 Rollup 数据卸载到斑点可能会降低 一层网络 (l1) 上的费用，但此次升级主要侧重于降低 二层网络 (l2) 费用。一层网络 (l1)（主网）上费用的降低可能会作为二阶效应在较小程度上发生。_

- 一层网络 (l1) Gas 的减少将与 Rollup 提供商对斑点数据的采用/使用成正比
- 由于与 Rollup 无关的活动，一层网络 (l1) Gas 可能会保持竞争力
- 采用斑点空间的汇总将需要更少的 一层网络 (l1) Gas，有助于在短期内推动 一层网络 (l1) Gas 费用下降
- 斑点空间仍然有限，因此如果区块内的斑点饱和/已满，那么汇总可能需要在此期间将其数据作为永久数据发布，这将推高 一层网络 (l1) 和 二层网络 (l2) 的 Gas 价格

## 这会降低其他 EVM 一层网络 (l1) 区块链上的费用吗？ {#alt-l1-fee-impact}

不会。Proto-Danksharding 的好处特定于将其证明存储在 一层网络 (l1)（主网）上的以太坊二层网络 (l2) 汇总。

仅仅兼容以太坊虚拟机 (EVM) 并不意味着网络会从此次升级中获得任何好处。独立于以太坊运行的网络（无论是否兼容 EVM）都不会将其数据存储在以太坊上，也不会从此次升级中获得任何好处。

[了解更多关于二层网络 (l2) 汇总的信息](/layer-2/)

## 更喜欢视觉学习？ {#visual-learner}

<VideoWatch slug="eip-4844-dencun-explained" />

_解锁以太坊的扩展，EIP-4844 — Finematics _

<VideoWatch slug="blobspace-101-dencun" />

_与 Domothy 一起了解斑点空间 101 — Bankless_

## 延伸阅读 {#further-reading}

- [EIP4844.com](https://www.eip4844.com/)
- [EIP-4844：分片斑点交易 (Proto-Danksharding)](https://eips.ethereum.org/EIPS/eip-4844)
- [Dencun 主网公告](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement) - _以太坊基金会博客_
- [以太坊漫游指南：Proto-Danksharding](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum/#proto-danksharding-eip-4844) - _Jon Charbonneau_
- [Proto-Danksharding 常见问题解答](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [深入解析 EIP-4844：坎昆升级的核心](https://medium.com/@ebunker.io/an-in-depth-explanation-of-eip-4844-the-core-of-the-cancun-upgrade-de7b13761d2c) - _Ebunker_
- [核心开发者更新 016](https://tim.mirror.xyz/HzH5MpK1dnw7qhBSmzCfdCIxpwpD6DpwlfxtaAwEFro) - _Tim Beiko_