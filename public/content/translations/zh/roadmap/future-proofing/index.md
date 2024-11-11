---
title: 打造面向未来的以太坊
description: 无论未来会发生什么，这些升级都可以增强以太坊，使其成为可以适应未来需求的有韧性、去中心化的基础层。
lang: zh
image: /images/roadmap/roadmap-future.png
alt: "以太坊路线图"
template: roadmap
---

路线图的部分内容并不是对于以太坊的短期扩展或保护而言必不可少，但可以为以太坊长期稳定性和可靠性奠定基础。

## 量子抗性 {#quantum-resistance}

当量子计算成为现实时，一些目前用于保护以太坊安全的[加密技术](/glossary/#cryptography)将会受到威胁。 尽管量子计算机可能还需要几十年才能对现代加密技术构成真正的威胁，但以太坊的构建方式要保证以太坊在未来几个世纪内都保持安全。 这意味着要尽快使[以太坊具备量子抗性](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/)。

以太坊开发者面临的挑战是，当前的[权益证明](/glossary/#pos)协议依赖于一种称为 BLS 的非常高效的签名方案对有效[区块](/glossary/#block)的投票进行聚合。 这种签名方案会被量子计算机破解，但是具有量子抗性的替代方案没有那么高效。

在以太坊的多个地方使用的、用于生成密码学密钥的[“KZG”承诺方案](/roadmap/danksharding/#what-is-kzg)面临量子计算时存在漏洞。 目前，这个问题是通过“可信设置”来规避的，即多个用户生成的随机性无法被量子计算机逆向工程。 然而，理想的解决方案就是采用量子安全加密技术。 可以替代 BLS 方案的高效方法主要有两种：[基于 STARK ](https://hackmd.io/@vbuterin/stark_aggregation)和[基于点阵的](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175)签名方案。 **这些方案仍处在研究和原型开发阶段**。

<ButtonLink variant="outline-color" href="/roadmap/danksharding#what-is-kzg"> 阅读了解 KZG 和可信设置的相关内容。</ButtonLink>

## 简化以太坊，提高以太坊效率 {#simpler-more-efficient-ethereum}

复杂性会导致出现可以被攻击者利用的错误或漏洞。 因此，路线图的一部分是简化以太坊，并删除那些在各种升级后留存但不再需要或可以改进的代码。 更精简、更简单的代码库更容易被开发者维护和推理。

我们将对[以太坊虚拟机 (EVM)](/developers/docs/evm)进行多项更新，使其更简单和更高效。 其中包括[删除 SELFDESTRUCT 操作码](https://hackmd.io/@vbuterin/selfdestruct)，该命令很少使用、不再需要，并且在某些情况下使用可能会带来危险，特别是当与以太坊存储模型的其他未来升级结合时。 [以太坊客户端](/glossary/#consensus-client)仍然支持一些旧的交易类型，这些类型现在完全可以被删除。 [燃料费](/glossary/#gas)的计算方式也可以改进，并且可以引入更高效的算法来支持一些加密操作。

同样，现有以太坊客户端的其他部分也可以进行更新。 例如，目前执行和共识客户端使用不同类型的数据压缩。 当整个网络统一压缩方案时，客户端之间共享数据将变得更加简单直观。

## 当前进展 {#current-progress}

打造面向未来的以太坊所需的大部分升级**仍处于研究阶段，并且可能需要数年时间**才能实现。 诸如删除 SELFDESTRUCT 和统一执行执行和共识客户端中所用压缩方案之类的升级，可能会比抗量子加密更快推出。

**延伸阅读**

- [燃料](/developers/docs/gas)
- [EVM 以太坊虚拟机](/developers/docs/evm)
- [数据结构](/developers/docs/data-structures-and-encoding)
