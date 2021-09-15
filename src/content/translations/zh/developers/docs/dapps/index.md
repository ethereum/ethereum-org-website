---
title: dapp 介绍
description:
lang: zh
sidebar: true
---

去中心化应用（dapp）是构建在去中心化网络上的应用程序，它结合了[智能合约](/developers/docs/smart-contracts/)和前端用户界面。 请注意，以太坊智能合约具有可访问性和透明性——就像开放 API 一样 ——所以你的 dapp 里甚至可以包含其他人写过的智能合约。

## 基本要求 {#prerequisites}

在学习 dapp 之前，您应该了解[区块链基础知识](/developers/docs/intro-to-ethereum/)，并了解以太坊网络及其去中心化方式。

## dapp 的定义 {#definition-of-a-dapp}

一个 dapp 的后端代码在一个去中心化 P2P 网络上运行。 与此相对应的，是在中心化服务器上运行后端代码的应用程序。

dapp 可以用任何语言编写（就像是一个 app）。它有前端代码和用户界面，能调用其后端。 此外，它的前端可以托管在去中心化存储上，例如 [IPFS](https://ipfs.io/)。

- **去中心化** ，使其独立，没有人可以控制。
- **确定性** ，无论执行的环境如何，都执行相同的功能。
- **图灵完备**，只要有必要的资源，dapp 就可以执行任何操作。
- **隔离性**，它们在称为 EVM 的虚拟环境中执行。即使智能合约出现问题，也不会妨碍区块链网络的正常运行。

### 智能合约 {#on-smart-contracts}

要引入 dapp，我们需要引入智能合约 —— dapp 的后端，因为缺少更好的术语。 有关详细概述，请访问我们的[智能合约](/developers/docs/smart-contracts/)部分。

智能合约是一种在以太坊网络上的计算机程序，它严格按照事先编写的代码来运行。 一旦他们被部署到以太坊网络，就无法更改。 Dapps 可以是去中心化的，就是由于它们受智能合约的既定逻辑控制，而不是个人或公司。 这也意味着你需要非常仔细地设计合约，并进行全面测试。

<!--Benefits and implications provided by Brian Gu)-->

## Dapp 开发的好处 {#benefits-of-dapp-development}

- **零关机** – 一旦将某 dapp 的核心合约部署到区块链上，整个网络都能为那些希望与之互动的客户提供服务。 因此，恶意行为者无法针对单个 dapp 发起 DoS 攻击。
- **隐私** – 您不需要提供真实世界的身份来部署或与 dapp 进行交互。
- **抵制审查** – 网络上没有任何一个实体可以阻止用户提交交易、部署 dapp 或读取区块链上的数据。
- **数据完整性** – 由于采用了加密基元，存储在区块链上的数据是不可更改和无可争议的。 恶意行为者无法伪造已经公开的交易或其他数据。
- **无需信任关系的计算/可验证的行为** – 智能合约可以被分析，并保证以可预测的方式执行，而无需信任中央权威机构。 这在传统模式下是不存在的，比如我们使用网上银行系统时，我们要相信金融机构不会滥用我们的金融数据，不会篡改记录，也不会被黑客攻击。

## Dapp 开发的负面影响 {#implications-of-dapp-development}

<!-- - Transparency – transactions that trigger dapp functionality are public
- Open source
- Cost of storage – contracts are often only small percentages of the dapp. They are stored on-chain and this storage needs to be paid for, so it can be expensive.
 -->

- **维护** – dapp 可能更难维护，因为发布到区块链的代码和数据更难修改。 一旦部署了 dapp（或 dapp 存储的底层数据），开发者就很难对其进行更新——即使在旧版本中发现了 bug 或安全风险。
- **性能开销** – 存在巨大的性能开销，而且扩展更多的性能真的很难。 为了达到以太坊所追求的安全、完整、透明和可靠的水平，每个节点都会运行和存储每一笔交易。 除此之外，工作量证明也需要时间。 粗略计算，开销会达到目前标准计算的 1,000,000 倍左右。
- **网络拥堵** – 至少在当前的模型中，如果一个 dapp 使用了太多的计算资源，整个网络都会承担影响。 目前，该网络每秒只能处理约 10 笔交易；如果交易发送的速度超过这个速度，未确认的交易池会迅速膨胀。
- **用户体验** – 设计用户友好的体验可能更难。普通终端用户可能会发现，以真正安全的方式设置与区块链互动所需的工具栈太难了。

  - **中心化** – 建立在以太坊基础层之上的用户友好型和开发者友好型解决方案，最终可能会看起来像中心化服务一样：例如，这种服务可能会在服务器端存储密钥或其他敏感信息，使用中心化服务器为前端服务，或者在写入区块链之前，在中心化服务器上运行重要的业务逻辑。 这消除了区块链与传统模式相比的许多（并不是全部）优势。<!-- ## Types of dapp

- Involving money
- Involving money and something else
- Other, including decentralized autonomous organizations

---==crwdHRulesLBB_2_BBsuleRHdwrc==

The application has to be open-source, operate autonomously, and can not be controlled by any one entity.
All data and record must be cryptographically stored in a public, decentralized blockchain.
The app must use a cryptographic token, also referred to as an App Coin, to access the application.
Tokens must be generated in order to prove the value nodes that contribute to the application.

---==crwdHRulesLBB_2_BBsuleRHdwrc==
-->## Dapp 工具 {#dapp-tools}

**One Click Dapp** **_- FOSS 工具，用于从 ABI 生成 dapp 前端_**。

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/One-Click-Dapp/one-click-dApp)

**Etherflow** **_- FOSS 工具，供以太坊开发者测试他们的节点，并编写以及从浏览器调试 RPC 调用。_**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

## 延伸阅读 {#further-reading}

_你知道有什么社区资源帮助过你吗？ 编辑并添加本页面！_

## 相关主题 {#related-topics}

- [以太坊技术栈简介](/developers/docs/ethereum-stack/)
- [开发框架](/developers/docs/frameworks/)
