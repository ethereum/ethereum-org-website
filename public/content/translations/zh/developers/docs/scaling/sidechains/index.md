---
title: 侧链
description: 介绍侧链 —— 以太坊社区目前正在使用的一种扩容方案。
lang: zh
sidebarDepth: 3
---

侧链是独立于以太坊运行的独立区块链，通过双向桥梁与以太坊主网连接。 侧链可以有单独的区块参数和[共识算法](/developers/docs/consensus-mechanisms/)，它们通常是为高效处理交易而设计的。 但是，使用侧链需要权衡取舍，因为它们未继承以太坊的安全属性。 与[二层网络扩容解决方案](/layer-2/)不同，侧链不会将状态变化和交易数据发布到以太坊主网。

侧链还在一定程度上牺牲了去中心化或安全性来实现高吞吐量（[可扩展性三难困境](https://vitalik.eth.limo/general/2021/05/23/scaling.html)）。 然而，正如其升级[愿景声明](/roadmap/vision/)中所述，以太坊致力于在不影响去中心化和安全性的情况下扩容。

## 侧链如何运作？ {#how-do-sidechains-work}

侧链是独立的区块链，具有不同的历史记录、开发路线图和设计考虑。 虽然和以太坊在表面上可能有一些相似之处，但侧链有几个独特的特征。

### 共识算法 {#consensus-algorithms}

使侧链独一无二（即不同于以太坊）的特点之一是使用了共识算法。 侧链不依赖以太坊达成共识，并可以选择适合其需求的替代共识协议。 侧链上使用的共识算法的一些示例包括：

- [权威证明](https://wikipedia.org/wiki/Proof_of_authority)
- [委托权益证明](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [拜占庭容错算法](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained)。

与以太坊一样，侧链也有验证并处理交易、生成区块以及存储区块链状态的验证节点。 验证者还负责维护整个网络的共识，并保护网络免受恶意攻击。

#### 区块参数 {#block-parameters}

以太坊对[出块时间](/developers/docs/blocks/#block-time)（即产生新区块所需的时间）和[区块大小](/developers/docs/blocks/#block-size)（即以燃料为计量单位的每个区块包含的数据量）设置了限制。 相反，侧链通常采用不同的参数，例如更快的出块时间和更高的燃料限制，以实现高吞吐量、快速交易和低费用。

虽然这样做有一些好处，但会对网络去中心化和安全性产生严重影响。 较快的出区块时间和较大的区块大小这样的区块参数，增加了运行全节点的难度，让一些“超级节点”负责保护区块链的安全。 在这种情况下，验证者串通或恶意接管区块链的可能性增加。

为了使区块链在不损害去中心化的情况下扩容，必须所有人都可以运行节点，而不一定限于拥有专用硬件的各方。 这就是我们一直都在努力确保每个人都能在以太坊网络上[运行全节点](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node)的原因。

### 以太坊虚拟机兼容性 {#evm-compatibility}

一些侧链与以太坊虚拟机兼容，并且能够执行为[以太坊虚拟机 (EVM) ](/developers/docs/evm/)开发的合约。 兼容以太坊虚拟机的侧链支持用 [Solidity 编写](/developers/docs/smart-contracts/languages/)的智能合约，也支持其他以太坊虚拟机智能合约语言，这意味着为以太坊主网编写的智能合约也将在兼容以太坊虚拟机的侧链上有效。

这意味着，如果想在侧链上使用你的[去中心化应用程序](/developers/docs/dapps/)，只需将你的[智能合约](/developers/docs/smart-contracts/)部署到该侧链即可。 侧链的外观、给人的感受和行为与主链相似，你仍然用 Solidity 编写合约，并通过侧链远程过程调用与侧链交互。

由于侧链与以太坊虚拟机兼容，因而被视为对以太坊原生去中心化应用程序有效的[扩容解决方案](/developers/docs/scaling/)。 去中心化应用程序部署到侧链上后，用户可以获得更低的燃料费用和更快的交易速度，尤其是在主网拥塞的情况下。

然而，正如前文所述，使用侧链需认真权衡其利弊。 每个侧链负责其自身安全性，没有继承以太坊的安全属性。 这增加了发生恶意行为的可能性，可能会影响到你的用户或使他们的资金面临风险。

### 资产转移 {#asset-movement}

为了使一条独立区块链成为以太坊主网的侧链，区块链必须能支持资产在它与以太坊主网之间转移。 这种与以太坊的互操作性是使用区块链桥梁实现的。 [桥梁](/bridges/)使用部署在以太坊主网和侧链上的智能合约控制两者之间的资金桥接。

虽然桥梁可以帮助用户在以太坊和侧链之间转移资金，但实体资产不会在两条链之间移动。 而是采用通常与铸币和销毁相关的机制跨链转移价值。 更多关于[桥梁如何运作](/developers/docs/bridges/#how-do-bridges-work)的信息。

## 侧链的优缺点 {#pros-and-cons-of-sidechains}

| 优点                                         | 缺点                                   |
| ------------------------------------------ | ------------------------------------ |
| 支撑侧链的技术是成熟的，并得益于广泛的研究和设计的改进。               | 侧链在一定程度上牺牲了去中心化和去信任以换取可扩展性。          |
| 侧链支持通用计算并提供以太坊虚拟机兼容性（它们可以运行以太坊原生去中心化应用程序）。 | 侧链使用单独的共识机制，并且没有从以太坊的安全保障中受益。        |
| 侧链使用不同的共识模型，为用户高效处理交易并降低交易费。               | 侧链需要更高的信任假设（例如，恶意侧链验证者达到一定人数可以进行欺诈）。 |
| 与以太坊虚拟机兼容的侧链允许去中心化应用程序扩展其生态系统。             |                                      |

### 使用侧链 {#use-sidechains}

许多项目提供侧链实现，你可以将它们集成到自己的去中心化应用程序中：

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain（原 xDai）](https://www.gnosischain.com/)
- [Loom Network](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## 延伸阅读 {#further-reading}

- [通过侧链扩展以太坊去中心化应用程序](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _2018 年 2 月 8 日 - Georgios Konstantopoulos_

_还有哪些社区资源对你有所帮助？ 请编辑本页面并添加！_
