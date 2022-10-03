---
title: Plasma 扩容解决方案
description: 这是一篇来源于以太坊社区的关于使用 plasma 来实现扩容解决方案的介绍文章
lang: zh
incomplete: true
sidebarDepth: 3
---

Plasma 是一条独立的区块链，锚定至以太坊主链，并使用欺诈证明（如[乐观卷叠](/developers/docs/scaling/optimistic-rollups/)）来仲裁争议。 这些链有时被称为 "子"链，因为它们本质上是父链以太坊区块链的较小复制。 Merkle 树能够创建这些链的无限堆栈，可以从父链（包括主网）上分流带宽。 它们通过[欺诈证明](/glossary/#fraud-proof)来确保安全性，每条子链都有自己的区块验证机制。

## 先决条件 {#prerequisites}

您应对所有基础性课题有很好的了解，并且对[以太坊扩容](/developers/docs/scaling/)有深入的了解。 实现诸如 Plasma 之类的扩展解决方案是一个高阶主题，因为该技术没有经过多少实战测试，而且还在继续研究和开发。

## 优点和缺点 {#pros-and-cons}

| 优点                                                                             | 缺点                                                                                                      |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| 高吞吐量，每笔交易成本较低。                                                     | 不支持通用计算。 只支持特定逻辑的基本通证转账、兑换和几种其他交易类型。                                   |
| 适用于任意用户之间的交易（如果两者都建立在 Plasma 链上，则每对用户都没有开销）。 | 需要定期监视（有效性要求）或者委托其他人监视网络，从而确保你的资金安全。                                  |
|                                                                                  | 依靠一个或多个运营者来存储数据，并根据其需求提供数据。                                                    |
|                                                                                  | 为了等待挑战期，提款会延迟几天。 对于可替换的资产，这可以由流动性提供者来缓解，但需要支付相关的资本成本。 |

### 使用 Plasma {#use-plasma}

多个项目使用了 Plasma 技术，你可以将其整合到你的去中心化应用程序中。

- [OMG 网络](https://omg.network/)
- [ Polygon](https://polygon.technology/)（原 Matic 网络）
- [Gluon](https://gluon.network/)
- [LeapDAO](https://ipfs.leapdao.org/)

## 延伸阅读 {#further-reading}

- [Plasma 上的 EthHub](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/plasma/)
- [学习 Plasma](https://www.learnplasma.org/en/)

_您知道有什么社区资源帮助过您吗？ 编辑并添加本页面！_
