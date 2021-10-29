---
title: Layer 2 Rollups
description: 以太坊社区近期几类不同的 layer 2 rollup 扩展方案介绍。
lang: cn
sidebar: true
incomplete: true
sidebarDepth: 3
---

Layer2是利用主网强大的去中心化安全模型，通过交易处理将应用程序脱离以太坊主网（Layer1）的解决方案统称。在网络繁忙时，受到影响的交易速度让用户在某些类型的Dapp上的体验变差。当网络变得更加繁忙时，交易发送者互相竞价的行为使得gas费用上涨，这让以太坊的使用变得极其昂贵。

## 前提条件 {#前提条件}

您应该对所有基础的话题有很好的理解，并对以太坊的扩展 [Ethereum scaling](/developers/docs/scaling/)有较高的理解。实施rollups等扩展方案是高级话题，因为该技术实战测试少且在持续研究和发展。

## layer 2 需要什么? {#layer 2 需要什么}

· 一些用例，例如与当前交易时间无关的区块链游戏

· 使用区块链应用程序可能不必要地昂贵

· 任何扩展的更新不应牺牲去中心化和安全 —— layer2 建立在以太坊之上

## Rollups {#rollups}

Rollups 是在以太坊主网（layer 1 ）外执行交易但把交易数据放在 layer 1 的解决方案。因为交易数据在 layer 1 ，rollups 被 layer 1 保护。继承 layer 1 安全属性的同时在 layer 1 外执行是 rollups 的定义特征。

Rollups 的三个简化属性：

1· 交易在 layer 1 外执行

·2 交易的数据或证明在 layer 1

3· layer 1 的智能合约能利用在 layer 1 的交易数据在 layer 2 强制执行正确的交易

Rollups 要求“操作员”在 rollup 合约中抵押，这激励操作员正确地验证和执行交易。

**有利于:**

· 减少用户费用

· 公开参与

· 高交易通量

有两类安全模型不同的 rollups ：

- **Optimistic rollups**: 假定交易默认有效，在遇到挑战时，通过欺诈证明运行计算
- **Zero-knowledge rollups**: 在链外运行计算并将有效的证明提交上链

### Optimistic rollups {#optimistic-rollups}

Optimistic rollups 在 layer 2 与以太坊主网平行，它们能提供扩展性的改进，因为它们在默认情况下不进行任何计算，而是在交易后向主网提交新的状态或交易的公证。

Optimistic rollups 将交易作为 calldata 写入以太坊主网，通过降低gas开销进一步优化交易。

计算作为使用以太坊过程中缓慢而昂贵的部分，Optimistic rollups 能够根据交易提供高达10-100倍的扩展性改进。随着分片链的引入，这个数字还会增加，因为当交易出现分歧时，更多的数据是可用的。

#### 交易分歧 {#交易分歧}

因为 Optimistic rollups 不计算交易，所以不需要有一个机制来确保交易是合法且无欺诈的，这也是欺诈证明出现的原因。如果有人注意到欺诈交易，rollup 会执行欺诈证明并使用可获得的状态数据运行交易计算，这意味着交易确认的等待时间比使用 ZK-rollup 模型时更长，因为交易可能受到挑战。

![Diagram showing what happens when a fraudulent transaction occurs in an Optimistic rollup in Ethereum](./optimistic-rollups.png)

运行欺诈证明计算所需的 gas 甚至可以报销。 Optimism 的 Ben Jones 将正在运行的粘合系统描述为：

“任何可能采取行动的人需要提供质押以通过证明欺诈确保资金安全。基本方式是锁定一些 ETH 并承诺说实话，如果说谎，则欺诈被证明，质押的资金受到消减。质押的资金的一部分不仅受到消减，还有一部分会用于支付人们在进行欺诈证明时的gas费用。”

因此，您可以看到的激励是：进行欺诈的参与者将受到惩罚，证明欺诈的参与者会获得报销。

#### 利与弊 {#optimistic-利与弊}

| 利                                                                                                             | 弊                                                                        |
| ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| 你可以用 Optimistic rollups 做任何你能在以太坊 layer 1 上做的事，因为它的 EVM （以太坊虚拟机） 跟 Solidity 兼容。 | 由于潜在的欺诈挑战，链上交易的等待时间很长。 |
| 所有的交易数据都存储在 layer 1 链上，这意味着它是安全且去中心化的。                     | 操作员可以影响交易顺序。                             |

#### optimistic rollups 的形象解释{#optimistic-视频}

查看 optimistic rollups 的详细解释:

<iframe width="100%" height="315px" src="https://www.youtube.com/embed/7pWxCklcNsU?start=263&end=406" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### 使用 Optimistic rollups {#使用-optimistic-rollups}

可以集成许多已存在的 Optimistic rollups 到您的 dapps ：

- [Arbitrum](https://arbitrum.io/)
- [Optimism](https://optimism.io/)
- [Boba](https://boba.network/)
- [Fuel Network](https://fuel.sh/)
- [Cartesi](https://cartesi.io/)

### Zero-knowledge rollups {#zk-rollups}

**Zero-knowledge rollups (ZK-rollups)** 捆绑上百个链下交易并产生加密证明，这被称作 SNARK（简洁的无交互知识论证）。这是 layer 1 上的有效证明。

ZK-rollups 智能合约维护所有 layer 2 上的传输状态，该状态仅能被有效证明更新，这意味着 ZK-rollups 仅需有效证明而不是所有交易数据。因为需要的数据更少，使用 ZK-rollups 验证一个区块更快且更便宜。

使用 ZK-rollup 将资金从 layer 2 转移到 layer 1 层是没有延迟的，因为 ZK-rollup 合约接受的有效证明已对资金进行了验证。

在 layer 2 ，可以通过优化 ZK-rollup 进一步减少交易大小。例如，使用索引而不是地址表示账户，可将交易从 32 字节减少到 4 字节。交易也会作为 calldata 写入以太坊以减少 gas。

#### 利与弊 {#zk-利与弊}

| 利                                                                                                              | 弊端                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 由于交易在被发到主链时被立刻验证，因此最终确认时间更快。            | 部分不支持 EVM （以太坊虚拟机）。                                                                          |
| 不易受到 Optimistic rollups 可能受到的经济攻击 [Optimistic rollups](#optimistic-pros-and-cons) 。 | 有效证明的计算量很大，这对不活跃的链上应用来说性价比不高。 |
| 因为状态恢复所需要的数据是存在 layer 1 链上的，因此它是安全且去中心化的。      | 操作员可以影响交易顺序。                                                      |

#### ZK-rollups 的形象解释 {#zk-视频}

查看 ZK-rollups 的详细解释:

<iframe width="100%" height="315px" src="https://www.youtube.com/embed/7pWxCklcNsU?start=406&end=568" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### 使用 ZK-rollups {#使用-zk-rollups}

可以集成许多已存在的 ZK-rollups 到您的 dapps ：

- [Loopring](https://loopring.org/#/)
- [Starkware](https://starkware.co/)
- [Matter Labs zkSync](https://zksync.io/)
- [Aztec 2.0](https://aztec.network/)
- [Polygon Hermez](https://hermez.io/)
- [zkTube](https://zktube.io/)

## 混合方案 {#混合方案}
存在结合多个 layer 2 技术有点多混合解决方案，可提供可配置的协调。

### 使用混合方案 {#使用-混合-方案}

- [Offchain Labs Arbitrum SCSC](https://offchainlabs.com/arbitrum.pdf)
- [Celer](https://www.celer.network/)

## 扩展阅读 {#扩展阅读}

- [An Incomplete Guide to Rollups](https://vitalik.ca/general/2021/01/05/rollup.html)
- [Optimistic Rollups vs ZK Rollups](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Zero-Knowledge Blockchain Scalability](https://ethworks.io/assets/download/zero-knowledge-blockchain-scaling-ethworks.pdf)

**ZK-rollups**

- [What Are Zero-Knowledge Rollups?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [EthHub on zk-rollups](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/zk-rollups/)

**Optimistic rollups**

- [Everything you need to know about Optimistic Rollup](https://research.paradigm.xyz/rollups)
- [EthHub on optimistic rollups](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/optimistic_rollups/)
- [The Essential Guide to Arbitrum](https://newsletter.banklesshq.com/p/the-essential-guide-to-arbitrum)
- [How does Optimism's Rollup really work?](https://research.paradigm.xyz/optimism)
- [OVM Deep Dive](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)

**混合方案**

- [Adding Hybrid PoS-Rollup Sidechain to Celer’s Coherent Layer-2 Platform on Ethereum](https://medium.com/celer-network/adding-hybrid-pos-rollup-sidechain-to-celers-coherent-layer-2-platform-d1d3067fe593)

**视频**

- [Rollups - The Ultimate Ethereum Scaling Strategy?](https://youtu.be/7pWxCklcNsU)

_Know of a community resource that helped you? Edit this page and add it!_
