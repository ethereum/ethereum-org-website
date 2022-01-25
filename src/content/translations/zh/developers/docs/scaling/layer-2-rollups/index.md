---
title: 第二层 Rollup
description: 目前以太坊社区正在开发的不同扩容方案简介。
lang: zh
sidebar: true
incomplete: true
sidebarDepth: 3
---

第二层是一种集体术语，用于通过处理以太坊主网（第一层）的交易，同时利用内联网的强大分散安全模式，帮助扩大您的应用范围。 当网络繁忙时，交易速度会受到影响，这可能使某些类型的 dapp 用户体验变差。 而且，随着网络越来越繁忙，由于交易发送者的目标是超越对方的出价，Gas 价格也随之上升。 这可能会让使用以太坊的成本非常高。

## 前提条件 {#prerequisites}

您应该很好地了解所有基本主题，并且对 [Ethereum scale](/developers/docs/scaling/) 有高级别的理解。 实现诸如 rollup 之类的扩容解决方案是一个高阶主题，因为该技术没有经过多少实战测试，还在继续研发。

## 为什么需要第二层？ {#why-is-layer-2-needed}

- 一些用例，如区块链游戏，在目前的交易时间内其实没有意义
- 使用区块链应用可能会过于昂贵
- 关于可扩容性的任何更新都不应以分散安全性为代价 - 第二层建立在以太坊的基础上。

## Rollup {#rollups}

Rollip 是在主链外执行交易*执行*的解决方案，但在第一层上发布*数据*。 作为第一层上的交易*数据*，rollup 受第一层保护。 继承第一层的安全属性，同时在第一层之外运行执行程序是 rollup 的一个关键特征。

Rollup 的三个简化特性是：

1. 交易*执行程序*在第一层外
2. 数据或交易证明在一层网络上
3. 第一层的 rollup 智能合约，可以通过使用第一层的交易数据在第二层强制执行正确的交易执行程序

Rollup 要求“运营者”在 Rollup 合约中质押一笔保证金。 这将激励运营者正确地验证和执行交易。

**可用于：**

- 减少手续费
- 公开参与
- 快速的交易吞吐量

有两种具有不同安全模式的 rollup：

- **Optimistic rollup**：假设交易在默认情况下有效，并且在遇到挑战的情况下只通过[**欺诈证明**](/glossary/#fraud-proof)运行计算
- **零知识 rollup**：在链下运行计算并向链上提交[**有效性证明**](/glossary/#validity-proof)

### Optimistic rollup {#optimistic-rollups}

Optimistic rollup 与第二层的以太坊主链同步进行。 它们可以提供可扩容性方面的改进，因为它们默认不做任何计算。 相反，它们会在一笔交易之后向主网提议新的状态或公证（notarise）交易。

通过 Optimistic rollup，交易以 `calldata` 的形式写入以太坊主网，通过减少 gas 消耗进一步优化。

由于计算是使用以太坊 Optimistic rollup 缓慢而昂贵的部分，Optimistic rollup 可以提供高达 10-100 倍的可扩容性，具体取决于交易。 在引入 [分片](/upgrades/shard-chains) 后，这个数字将会增加，因为如果交易有争议，将会有更多的数据。

#### 对交易提出异议 {#disputing-transactions}

Optimistic rollup 并不实际计算交易，所以需要有一个机制来确保交易是合法的，而不是欺诈性的。 这就是欺诈证明的作用。 如果有人注意到有欺诈性交易，rollup 将执行防欺诈并运行交易的计算，使用可用的状态数据。 这意味着您的交易确认等待时间可能比 ZK Rollup 更长，因为它可能受到质疑。

![显示以太坊中的 Optimistic rollup 中发生欺诈性交易时的图表](../../../../../developers/docs/scaling/layer-2-rollups/optimistic-rollups.png)

你需要运行欺诈证明计算的 gas 甚至可以报销。 来自 Optimism 的 Ben Jones 介绍了现有的联系制度。

"_任何可能采取您必须证明是欺诈性行动来保证您的资金的人，都要求您缴纳保证金。 这基本上等同于您拿了一些 ETH，将其锁起来，然后说 "嘿，我保证说实话"... 如果我不说实话，欺诈被证实，这笔钱就会被没收。 这笔钱不仅有一部分会被没收，而且还有一部分将支付人们做欺诈证明所花的 gas_。

您可以看到奖惩：参与者因欺诈而受到惩罚，但会因提供欺诈证明而获得奖励。

#### 优点和缺点 {#optimistic-pros-and-cons}

| 优点                                                                                    | 缺点                                         |
| --------------------------------------------------------------------------------------- | -------------------------------------------- |
| 您能在以太坊一层做的任何事情，都能用 Optimistic rollup 做，因为它兼容 EVM 和 Solidity。 | 由于潜在的欺诈挑战，链上交易的等待时间很长。 |
| 所有交易数据都存储在第一层链上，这意味着它是安全和分散的。                              | 运营者可以影响交易顺序。                     |

#### Optimistic rollup 的直观解释 {#optimistic-video}

观看 Finematics 解释 optimistic rollup：

<YouTube id="7pWxCklcNsU" start="263" />

#### 使用 Optimistic rollup {#use-optimistic-rollups}

存在多种 Optimistic rollup 的实现，你可以将其整合到你的 dapp 中。

- [Arbitrum](https://arbitrum.io/)
- [Optimism](https://optimism.io/)
- [Boba](https://boba.network/)
- [Fuel Network](https://fuel.sh/)
- [Cartesi](https://cartesi.io/)

### ZK Rollup {#zk-rollups}

**零知识 rollup (ZK-rollup)** 将数百个链下交易捆绑或"卷起"，生成一个加密证明，称为 SNARK（简洁的非交互式知识论证）。 这称为有效性证明，并且会公布在第一层。

ZK-rollup 智能合约在第二层维护所有转账的状态，这个状态只能用有效性证明来更新。 这意味着 ZK-rollup 只需要有效性证明，而不是所有交易数据。 使用 ZK-rollup 验证一个区块会更快、更便宜，因为包含的数据更少。

通过 ZK-rollup，当资金从第二层转移到第一层时不会有任何延迟，因为 ZK-rollup 智能合约接受的有效性证明已经验证了资金。

ZK-rollup 处于第二层，可以优化以进一步减小交易的大小。 例如，一个帐户由一个索引而不是一个地址来表示，这就把一个交易从 32 个字节减少到只有 4 个字节。 交易也作为 calldata 写入以太坊，减少 gas 消耗。

#### 优点和缺点 {#zk-pros-and-cons}

| 优点                                                                               | 缺点                                                                |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| 完成时间更快，因为一旦证据被送到主链上，状态即时验证。                             | 一些没有 EVM 支持。                                                 |
| 不太容易受到[ Optimistic rollup ](#optimistic-pros-and-cons)可能会受到的经济攻击。 | 有效性证明的计算量很大 - 对于链上活动很少的应用来说，不值得这样做。 |
| 安全和去中心化，因为恢复状态所需的数据储存在第一层。                               | 运营者可以影响交易顺序。 顺序                                       |

#### ZK-rollup 的直观解释 {#zk-video}

观看 Finematics 解释 ZK-rollup：

<YouTube id="7pWxCklcNsU" start="406" />

#### 使用 ZK-rollup {#use-zk-rollups}

存在多种 ZK-rollup 的实现方式，您可以整合到您的 dapp 中。

- [Loopring](https://loopring.org/#/)
- [Starkware](https://starkware.co/)
- [Matter Labs zkSync](https://zksync.io/)
- [Aztec 2.0](https://aztec.network/)
- [Polygon Hermez](https://hermez.io/)
- [zkTube](https://zktube.io/)

## 混合解决方案 {#hybrid-solutions}

混合技术结合了多种第二层技术的最佳部分，并可能提供可配置的折衷方案。

### 使用混合解决方案 {#use-hybrid-solutions}

- [Offchain Labs Arbitrum SCSC](https://offchainlabs.com/arbitrum.pdf)
- [Celer](https://www.celer.network/)

## 延伸阅读 {#further-reading}

- [Rollup 不完全指南](https://vitalik.ca/general/2021/01/05/rollup.html)
- [Optimistic Rollup vs ZK Rollup](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [零知识区块链的可扩容性](https://ethworks.io/assets/download/zero-knowledge-blockchain-scaling-ethworks.pdf)

**ZK-rollup**

- [什么是零知识 Rollup？](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [Zk-rollup 上的 EthHub](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/zk-rollups/)

**Optimistic rollup**

- [关于 Optimistic Rollup，你所需要知道的一切](https://research.paradigm.xyz/rollups)
- [Optimistic rollup 上的 EthHub](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/optimistic_rollups/)
- [Arbitrum 指南](https://newsletter.banklesshq.com/p/the-essential-guide-to-arbitrum)
- [Optimistic Rollup 究竟是如何起作用的？](https://research.paradigm.xyz/optimism)
- [深入研究 OVM](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)

**混合解决方案**

- [为 Celer 在以太坊上的 Coherent 二层平台添加混合 PoS-Rollup 侧链](https://medium.com/celer-network/adding-hybrid-pos-rollup-sidechain-to-celers-coherent-layer-2-platform-d1d3067fe593)

**相关视频**

- [Rollups - 以太坊最终扩容方案？ ](https://youtu.be/7pWxCklcNsU)

_知道更多的帮助过你的社区资源吗？ 编辑并添加本页面！_
