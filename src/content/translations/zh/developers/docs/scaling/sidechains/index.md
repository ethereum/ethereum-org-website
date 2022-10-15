---
title: 侧链
description: 这是一篇来源于以太坊社区的关于使用侧链来实现扩容解决方案的介绍文章
lang: zh
incomplete: true
sidebarDepth: 3
---

侧链是一个独立的区块链，与以太坊主网并行且独立地运行。 它有自己的[共识算法](/developers/docs/consensus-mechanisms/)（例如[权威证明](https://wikipedia.org/wiki/Proof_of_authority)、[委托权益证明](https://en.bitcoinwiki.org/wiki/DPoS)、[拜占庭容错](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained)）。 它通过双向主网来实现链接。

让人们对侧链感兴趣的是，它的工作环境和主链相同，因为同样基于 [EVM（以太坊虚拟机）](/developers/docs/evm/)。 它不使用以太坊，它自己就是以太坊。 这意味着如果想要在侧链上使用 [dapp](/developers/docs/dapps/) ，只需将它部署在侧链上。 它的外观、给人的感受和行为与主链相似，仍然通过 Solidity 写合约，并提供 Web3 API 完成互动。

## 先决条件 {#prerequisites}

您应该对所有基础有很好的理解，并对“[以太坊扩容](/developers/docs/scaling/). 有着一定的理解。

## 优点和缺点 {#pros-and-cons}

| 优点                     | 缺点                                                                    |
| ------------------------ | ----------------------------------------------------------------------- |
| 既有的技术。             | 不够去中心化。                                                          |
| 支持通用计算，EVM 兼容。 | 采用单独的共识机制。 未受一层保护（因此，从技术上而言，它不是第二层）。 |
|                          | 测链验证者达到一定数量可以进行欺诈。                                    |

### 使用侧链 {#use-sidechains}

多个项目提供侧链的实施，以便您集成至 dApp：

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain（原 xDai）](https://www.xdaichain.com/)

## 延伸阅读 {#further-reading}

- [侧链上的 EthHub](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/sidechains/)
- [Scaling Ethereum Dapps through Sidechains（通过侧链扩容以太坊 Dapp）](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _Feb 8, 2018 - Georgios Konstantopoulos_

_你知道有什么社区资源帮助过你吗？ 编辑并添加本页面！_
