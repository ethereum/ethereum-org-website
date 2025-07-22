---
title: 权威证明 (PoA)
description: 权威证明共识协议的解释及其在区块链生态系统中的作用。
lang: zh
---

**权威证明 (PoA)** 是一种基于信誉的共识算法，它是[权益证明](/developers/docs/consensus-mechanisms/pos/)的一个修改版本。 主要应用于私有链、测试网以及本地开发网络。 权威证明是一种基于信誉的共识算法，它与权益证明中基于质押的机制不同，要求信任一组经授权的签名者来生成区块。

## 前提条件 {#prerequisites}

为了更好地理解本页内容，建议您先阅读有关[交易](/developers/docs/transactions/)、[区块](/developers/docs/blocks/)和[共识机制](/developers/docs/consensus-mechanisms/)的相关信息。

## 什么是权威证明 (PoA)？ {#what-is-poa}

权威证明是\*\*[权益证明](/developers/docs/consensus-mechanisms/pos/)的一个修改版本，它是一种基于信誉的共识算法，而不是权益证明中基于质押的机制。 权威证明最早由 Gavin Wood 于 2017 年提出，这种共识机制主要用于私有链、测试网和本地开发网络，因为它不像工作量证明那样需要高质量的资源，还通过让一小部分节点存储区块链数据并生成区块，克服了权益证明存在的可扩展性问题。

权威证明要求信任一组在[创世区块](/glossary/#genesis-block)中设定的授权签名者。 在多数最新实现中，所有授权签名者在决定链共识时都保留了同等的权力和特权。 信誉质押依据的理念是，每个授权验证者通过了解你的客户 (KYC) 流程等或通过让一家知名组织成为唯一验证者而为所有人所熟知；这样一来，如果验证者行为不当，他们的身份是已知的。

目前有多种权威证明实现，但标准以太坊实现是实现了 [EIP-225](https://eips.ethereum.org/EIPS/eip-225) 的 **Clique**。 Clique 对开发者友好，是一种易于实施的标准，支持所有客户端同步类型。 其他实现包括 [IBFT 2.0](https://besu.hyperledger.org/stable/private-networks/concepts/poa) 和 [Aura](https://openethereum.github.io/Chain-specification) 。

## 工作原理 {#how-it-works}

在权威证明中，选定一组授权签名者来创建新区块。 新的区块只能由这些基于信誉被挑选出来的签名者来创建。 每个签名者轮流获得机会，在特定时间范围内创建一个区块。 区块创建时间是固定的，签名者必须在该时间范围内创建一个区块。

在这种情况下，信誉并不是一个量化的东西，而是像微软和谷歌等知名企业的信誉一样。因此，受信任签名者的选择并非基于算法，而是类似于正常人类的信任行为。例如，微软在成百上千家初创企业之间创建了一个权威证明私有网络，并将自己设定为唯一受信任的签名者，但未来也可能添加谷歌等其他知名签名者。毫无疑问，这些初创企业会信任微软一直诚实地使用该网络。 这种方式解决了因不同目的而建立的不同小规模/私有网络的去中心化运作需求，同时减少了对矿工（会耗费大量电力和资源）的需求。 一些私有网络使用权威验证标准，例如 VeChain，而有些则对其进行了修改，例如 Binance 使用的[质押权威证明](https://academy.binance.com/en/glossary/proof-of-staked-authority-posa)便是权威证明和权益证明的定制修改版本。

投票过程由签名者自己完成。 每个签名者在创建新区块时，都会投票决定在其区块中增减签名者。 票数由节点进行统计，并根据票数是否达到特定阈值“SIGNER_LIMIT”来添加或移除签名者。

可能会出现发生小分叉的情况，区块的难度取决于是否轮到该区块签名。 “轮到”区块的难度为 2，“未轮到”区块的难度为 1。 在小分叉的情况下，大多数签名者“轮到”密封区块的链将会积累最大难度并获胜。

## 攻击矢量 {#attack-vectors}

### 恶意签名者 {#malicious-signers}

恶意用户可能会被添加到签名者列表中，或者签名密钥/机器可能被泄露。 在这种情况下，协议必须能够抵御重组和垃圾邮件攻击。 建议的解决方案是，在 N 个授权签名者的列表中，任何签名者只能铸造每 K 个区块中的 1 个区块。这可以确保损害有限，其余验证者可以投票淘汰恶意用户。

### 审查 {#censorship-attack}

另一个有趣的攻击矢量是，如果一个签名者（或一组签名者）试图审查投票将其从授权列表中删除的区块。 为解决这个问题，允许的签名者铸币频率被限制不超过每 N/2 次中的 1 次。 这就确保了恶意签名者至少需要控制 51% 的签名帐户，此时他们实际上就成为了链上新的真实性来源。

### 垃圾邮件 {#spam-attack}

另一个小型攻击矢量是恶意签名者在他们铸造的每个区块中注入新的投票提案。 由于节点需要统计所有投票以创建实际的授权签名者列表，因此它们必须记录一段时间内的所有投票。 如果不限制投票窗口，它可能会缓慢但无限制地增长。 解决方案是设置一个由 W 个区块组成的移动窗口，在此窗口过后，投票会被视为过时。 合理的窗口可能是 1-2 时段。

### 并发区块 {#concurrent-blocks}

在权威证明网络中，当有 N 个授权签名者时，每个签名者被允许铸造每 K 个区块中的 1 个区块，这意味着在任何给定时间点都有 N-K+1 个验证者被允许铸造区块。 为了防止这些验证者争抢区块，每个签名者应该在发布新区块的时间上增加一个小的随机“偏移量”。 尽管这个过程确保了小分叉很少见，但同主网一样，偶尔的分叉仍然可能发生。 如果发现某个签名者滥用权力并造成混乱，其他签名者可以投票将其淘汰。

例如，如果有 10 个授权签名者，每个签名者被允许创建每 20 个区块中的 1 个区块，那么在任何给定时间内，都有 11 个验证者可以创建区块。 为了防止他们竞相创建区块，每个签名者都会在发布新区块的时间上增加一个小的随机“偏移量”。 这减少了小分叉的发生，但同以太坊主网一样，仍允许偶尔分叉。 如果签名者滥用权力并造成混乱，就可能被投票淘汰出网络。

## 优点和缺点 {#pros-and-cons}

| 优点                                         | 缺点                                          |
| ------------------------------------------ | ------------------------------------------- |
| 与权益证明和权威证明等其他流行机制相比，可扩展性更强，因为它基于有限数量的区块签名者 | 权威证明网络的验证节点通常相对较少。 这使得权威证明网络更加中心化。          |
| 权威证明区块链的运行和维护成本极低                          | 由于区块链要求实体具有公认的信誉，因此成为授权签名者对于普通人来说通常是遥不可及的。  |
| 由于验证新区块只需要有限数量的签名者，因此交易确认速度非常快，可在 1 秒内完成。  | 恶意签名者可以重新组织、重复支出、审查网络中的交易，这些攻击已得到缓解，但仍有可能发生 |

## 扩展阅读{#further-reading}

- [EIP-225](https://eips.ethereum.org/EIPS/eip-225) _Clique 标准_
- [权威证明研究](https://github.com/cryptoeconomics-study/website/blob/master/docs/sync/2.4-lecture.md) _Cryptoeconomics_
- [什么是权威证明](https://forum.openzeppelin.com/t/proof-of-authority/3577) _OpenZeppelin_
- [权威证明解释](https://academy.binance.com/en/articles/proof-of-authority-explained) _binance_
- [区块链中的权威证明](https://medium.com/techskill-brew/proof-of-authority-or-poa-in-blockchain-part-11-blockchain-series-be15b3321cba)
- [Clique 解释](https://medium.com/@Destiner/clique-cross-client-proof-of-authority-algorithm-for-ethereum-8b2a135201d)
- [已废弃权威证明、Aura 规范](https://openethereum.github.io/Chain-specification)
- [IBFT 2.0，另一种权威证明实现](https://besu.hyperledger.org/stable/private-networks/concepts/poa)

### 更愿意通过视频学习？ {#visual-learner}

观看权威证明的直观解释：

<YouTube id="Mj10HSEM5_8" />

## 相关话题 {#related-topics}

- [工作量证明](/developers/docs/consensus-mechanisms/pow/)
- [权益证明](/developers/docs/consensus-mechanisms/pos/)
