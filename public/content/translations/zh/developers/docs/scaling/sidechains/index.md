---
title: "侧链"
description: "介绍以太坊社区目前使用的扩容解决方案——侧链。"
lang: zh
sidebarDepth: 3
---

侧链是一条独立的区块链，独立于[以太坊](/)运行，并通过双向跨链桥与以太坊主网相连。侧链可以有独立的区块参数和[共识算法](/developers/docs/consensus-mechanisms/)，这些通常是为了高效处理交易而设计的。然而，使用侧链需要做出权衡，因为它们不继承以太坊的安全属性。与[二层网络 (l2) 扩容解决方案](/layer-2/)不同，侧链不会将状态变化和交易数据发布回以太坊主网。

侧链还会牺牲一定程度的去中心化或安全性来实现高吞吐量（[可扩展性三难困境](https://vitalik.eth.limo/general/2021/05/23/scaling.html)）。然而，以太坊致力于在不妥协去中心化和安全性的前提下进行扩容。

## 侧链如何工作？ {#how-do-sidechains-work}

侧链是独立的区块链，具有不同的历史、开发路线图和设计考量。虽然侧链在表面上可能与以太坊有一些相似之处，但它具有几个显著的特征。

### 共识算法 {#consensus-algorithms}

使侧链独一无二（即不同于以太坊）的特性之一是所使用的共识算法。侧链不依赖以太坊达成共识，并且可以选择适合其需求的替代共识协议。侧链上使用的共识算法的一些示例包括：

- [权威证明](/developers/docs/consensus-mechanisms/poa/)
- [委托权益证明](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [拜占庭容错](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained)。

像以太坊一样，侧链也有验证节点，用于验证和处理交易、生成区块并存储区块链状态。验证者还负责维护整个网络的共识，并保护其免受恶意攻击。

#### 区块参数 {#block-parameters}

以太坊对[出块时间](/developers/docs/blocks/#block-time)（即生成新区块所需的时间）和[区块大小](/developers/docs/blocks/#block-size)（即每个区块包含的数据量，以 Gas 计）设置了限制。相反，侧链通常采用不同的参数，例如更快的出块时间和更高的 Gas 限制，以实现高吞吐量、快速交易和低费用。

虽然这有一些好处，但它对网络的去中心化和安全性有重大影响。诸如快速出块时间和较大区块大小等区块参数增加了运行全节点的难度——使得少数“超级节点”负责保护链的安全。在这种情况下，验证者串通或恶意接管链的可能性就会增加。

为了使区块链在不损害去中心化的情况下进行扩容，运行节点必须向所有人开放——而不一定需要拥有专用硬件的各方。这就是为什么目前正在努力确保每个人都能在以太坊网络上[运行全节点](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node)。

### EVM 兼容性 {#evm-compatibility}

一些侧链兼容 EVM，能够执行为[以太坊虚拟机 (EVM)](/developers/docs/evm/) 开发的合约。兼容 EVM 的侧链支持[用 Solidity 编写](/developers/docs/smart-contracts/languages/)的智能合约，以及其他 EVM 智能合约语言，这意味着为以太坊主网编写的智能合约也将在兼容 EVM 的侧链上运行。

这意味着如果你想在侧链上使用你的[去中心化应用 (dapp)](/developers/docs/dapps/)，只需将你的[智能合约](/developers/docs/smart-contracts/)部署到这条侧链上即可。它的外观、感觉和行为就像主网一样——你用 Solidity 编写合约，并通过侧链的 RPC 与链进行交互。

因为侧链兼容 EVM，它们被认为是以太坊原生 dapp 的有用[扩容解决方案](/developers/docs/scaling/)。将你的 dapp 部署在侧链上，用户可以享受更低的 Gas 费用和更快的交易，尤其是在主网拥堵的情况下。

然而，如前所述，使用侧链涉及重大的权衡。每条侧链都对其自身的安全性负责，并且不继承以太坊的安全属性。这增加了恶意行为的可能性，可能会影响你的用户或使他们的资金面临风险。

### 资产转移 {#asset-movement}

为了使一条独立的区块链成为以太坊主网的侧链，它需要具备促进资产在以太坊主网之间转账的能力。这种与以太坊的互操作性是通过区块链跨链桥实现的。[跨链桥](/bridges/)使用部署在以太坊主网和侧链上的智能合约来控制它们之间的资金跨链。

虽然跨链桥帮助用户在以太坊和侧链之间转移资金，但资产并没有在两条链之间进行物理移动。相反，通常涉及铸造和销毁的机制被用于跨链转移价值。了解更多关于[跨链桥如何工作](/developers/docs/bridges/#how-do-bridges-work)的信息。

## 侧链的优缺点 {#pros-and-cons-of-sidechains}

| 优点                                                                                                                        | 缺点                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| 支撑侧链的技术已经很成熟，并受益于广泛的研究和设计改进。 | 侧链为了可扩展性牺牲了一定程度的去中心化和去信任化。                          |
| 侧链支持通用计算并提供 EVM 兼容性（它们可以运行以太坊原生 dapp）。                    | 侧链使用独立的共识机制，无法受益于以太坊的安全保证。         |
| 侧链使用不同的共识模型来高效处理交易并降低用户的交易费用。         | 侧链需要更高的信任假设（例如，达到法定人数的恶意侧链验证者可以实施欺诈）。 |
| 兼容 EVM 的侧链允许 dapp 扩展其生态系统。                                                            |                                                                                                                  |

### 使用侧链 {#use-sidechains}

多个项目提供了侧链的实现，你可以将它们集成到你的 dapp 中：

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain（前身为 xDai）](https://www.gnosischain.com/)
- [Loom Network](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## 延伸阅读 {#further-reading}

- [通过侧链扩展以太坊 dapp](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _2018 年 2 月 8 日 - Georgios Konstantopoulos_

_知道对你有帮助的社区资源吗？编辑本页面并添加它！_