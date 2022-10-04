---
title: Validium
description: 介绍 Validium - 以太坊社区目前使用的一种扩容解决方案。
lang: zh
incomplete: true
sidebarDepth: 3
---

使用 [zk-rollups](/developers/docs/scaling/zk-rollups/)等有效性证明，但数据不存储在第一层以太坊主链上。 这可能导致每个 validium 链每秒有 1 万次易，并且多个链可并行运行。

## 先决条件 {#prerequisites}

您应对所有基础性课题有很好的了解，并且对[以太坊扩容](/developers/docs/scaling/)有深入的了解。 实施 Validium 等扩容解决方案是一个先进的课题，因为这种技术没有经过充分的实践检验，仍将继续进行研发。

## 优点和缺点 {#pros-and-cons}

| 优点                                                             | 缺点                                                                                                      |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| 没有提款延迟（链上/跨链转账没有延迟）；因此，资本效益更高。      | 对一般计算/智能合约的支持有限；需要专用语言。                                                             |
| 在高价值应用程序中，不容易受到可防欺诈系统所面临的某些经济攻击。 | 生成 ZK 证明需要很高的计算能力；对于低吞吐量的应用程序来说不具成本效益。                                  |
|                                                                  | 主观终结时间较慢（生成 ZK 证明的时间为 10-30 分钟）（但由于没有争议时间延迟，所以到完全终结的时间较快）。 |
|                                                                  | 生成证明需要链下数据在任何时候都可用。                                                                    |

### 使用 Validium {#use-validium}

多个项目提供 Validium 的部署，您可以整合到您的去中心化应用中：

- [Starkware](https://starkware.co/)
- [Matter Labs zkPorter](https://matter-labs.io/)

## 延伸阅读 {#further-reading}

- [Validium 和二层 2 x 2 矩阵，第 99 期](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)

_您知道有什么社区资源帮助过您吗？ 编辑并添加本页面！_
