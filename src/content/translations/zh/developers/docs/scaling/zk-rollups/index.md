---
title: 零知识卷叠
description: 零知识卷叠介绍
lang: zh
---

## 先决条件 {#prerequisites}

您应对所有基础性课题有很好的了解，并且对[以太坊扩容](/developers/docs/scaling/)有深入的了解。 实现诸如 rollup 之类的扩容解决方案是一个高阶主题，因为该技术没有经过多少实战测试，还在继续研发。

在寻找更适合初学者的资源？ 请参阅我们的[第二层简介](/layer-2/)。

## 零知识卷叠 {#zk-rollups}

**零知识卷叠**将打包数百个链下交易（或“卷叠”）并生成加密证明。 这些证明可以采用 SNARK（简洁的非交互式知识论证）或 STARK（可扩展的透明知识论证）的形式。 SNARK 和 STARK 均称为有效性证明并会发布到第一层。

零知识卷叠智能合约会在第二层维护所有转账的状态，而且这个状态只能用有效性证明来更新。 这意味着零知识卷叠只需要有效性证明，而不是所有交易数据。 使用零知识卷叠验证区块会更快、更便宜，原因在于其包含的数据更少。

使用零知识卷叠，当资金从第二层转移到第一层时不会有任何延迟，因为零知识卷叠智能合约接受的有效性证明已经验证了资金。

零知识卷叠处于第二层，可以优化以进一步减小交易的大小。 例如，帐户用索引而不是地址表示，这就把交易从 32 个字节减少到只有 4 个字节。 此外，交易也会以 `calldata` 形式写入以太坊，进而减少燃料消耗。

### 优点和缺点 {#zk-pros-and-cons}

| 优点                                                                               | 缺点                                                                 |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| 完成时间更快，因为一旦证据被送到主链上，状态即时验证。                             | 一些没有 EVM 支持。                                                  |
| 不太容易受到 [Optimistic rollup](#optimistic-pros-and-cons) 可能会受到的经济攻击。 | 有效性证明的计算量很大 -- 对于链上活动很少的应用来说，不值得这样做。 |
| 安全和去中心化，因为恢复状态所需的数据储存在第一层。                               | 运营者可以影响交易顺序                                               |

### 零知识卷叠的直观解释 {#zk-video}

观看 Finematics 解说零知识卷叠：

<YouTube id="7pWxCklcNsU" start="406" />

### 使用零知识卷叠 {#use-zk-rollups}

零知识卷叠有多种实现方式，您可以将其整合到您的去中心化应用程序中。

<RollupProductDevDoc rollupType="zk" />

**零知识卷叠相关阅读**

- [什么是零知识 Rollup？](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [EthHub 上关于零知识卷叠的介绍](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/zk-rollups/)
- [简洁的非交互式知识论证”对比“可扩展的透明知识论证](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
