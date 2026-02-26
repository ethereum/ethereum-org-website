---
title: "去中心化应用程序技术介绍"
description:
lang: zh
---

去中心化应用程序 (dapp) 是在去中心化网络上构建的应用程序，它结合了[智能合约](/developers/docs/smart-contracts/)和前端用户界面。 请注意，就像开放 API 一样，以太坊智能合约具有可访问性和透明性，所以你的 dapp 里甚至可以包含其他人写过的智能合约。

## 前提条件 {#prerequisites}

在学习去中心化应用程序之前，您应该先了解[区块链基础知识](/developers/docs/intro-to-ethereum/)，并阅读有关以太坊网络及其去中心化方式的资料。

## 去中心化应用程序的定义 {#definition-of-a-dapp}

一个 dapp 的后端代码在一个去中心化 P2P 网络上运行。 与此相对应的，是在中心化服务器上运行后端代码的应用程序。

一个去中心化应用程序可以用任何语言编写前端代码和用户界面（就像一个应用程序一样），来调用其后端。 此外，其前端可以托管在 [IPFS](https://ipfs.io/) 等去中心化存储上。

- **去中心化** - 去中心化应用程序在以太坊上运行，这是一个开放的公共去中心化平台，没有任何个人或团体可以控制
- **确定性** - 无论在何种环境中执行，去中心化应用程序都会执行相同的功能
- **图灵完备** - 只要有必需的资源，去中心化应用程序就能执行任何操作
- **隔离性** - 去中心化应用程序在称为以太坊虚拟机的虚拟环境中执行，因此，即使智能合约存在漏洞，也不会妨碍区块链网络的正常运作

### 关于智能合约 {#on-smart-contracts}

要引入 dapp，我们需要引入智能合约 —— dapp 的后端，因为缺少更好的术语。 要了解详细概览，请前往我们的[智能合约](/developers/docs/smart-contracts/)部分。

智能合约是一种在以太坊网络上的计算机程序，它严格按照事先编写的代码来运行。 智能合约一旦部署到以太坊网络中，就无法更改。 Dapps 可以是去中心化的，就是由于它们受智能合约的既定逻辑控制，而不是个人或公司。 这也意味着你需要非常仔细地设计合约，并进行全面测试。

## 去中心化应用程序开发的好处 {#benefits-of-dapp-development}

- **零停机时间** – 一旦智能合约部署在区块链上，整个网络将始终能够为希望与合约交互的客户端提供服务。 因此，恶意参与者无法针对单个 dapp 发起 DoS 攻击。
- **隐私** – 您无需提供真实身份即可部署去中心化应用程序或与之交互。
- **抗审查** – 网络上没有任何单个实体可以阻止用户提交交易、部署去中心化应用程序或从区块链读取数据。
- **完整的数据完整性** – 得益于加密基元，存储在区块链上的数据是不可变且无可争议的。 恶意行为者无法伪造已经公开的交易或其他数据。
- **无需信任的计算/可验证的行为** – 智能合约可以被分析并保证以可预测的方式执行，而无需信任一个中心化的权威机构。 这在传统模式下并非如此；例如，当我们使用网上银行系统时，我们必须相信金融机构不会滥用我们的金融数据、篡改记录或遭到黑客攻击。

## 去中心化应用程序开发的缺点 {#drawbacks-of-dapp-development}

- **维护** – 去中心化应用程序可能更难维护，因为发布到区块链的代码和数据更难修改。 在部署后，开发人员很难对去中心化应用程序（或其存储的底层数据）进行更新，即使在旧版本中发现了漏洞或安全风险。
- **性能开销** – 存在巨大的性能开销，并且扩容非常困难。 为了达到以太坊所追求的安全、完整、透明和可靠的水平，每个节点都会运行和存储每一笔交易。 除此之外，达成权益证明共识也需要时间。
- **网络拥堵** – 当一个去中心化应用程序使用过多的计算资源时，整个网络都会堵塞。 目前，该网络每秒只能处理约 10-15 笔交易；如果交易发送的速度超过这个速度，未确认的交易池会迅速膨胀。
- **用户体验** – 设计用户友好的体验可能更难，因为普通最终用户可能会发现，要以真正安全的方式设置与区块链交互所需的工具栈非常困难。
- **中心化** – 无论如何，在以太坊基础层之上构建的用户友好型和开发者友好型解决方案，最终可能看起来都像中心化服务。 例如，这种服务可以在服务器端存储密钥或其他敏感信息，使用中心化服务器为前端服务，或在写到区块链之前在中心化服务器上运行重要的业务逻辑。 这消除了区块链与传统模式相比的许多（并不是全部）优势。

## 更愿意通过视频学习？ {#visual-learner}

<YouTube id="F50OrwV6Uk8" />

## 创建去中心化应用程序的工具 {#dapp-tools}

**Scaffold-ETH _- 使用能适应您的智能合约的前端，快速进行 Solidity 实验。_**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [示例去中心化应用程序](https://punkwallet.io/)

**Create Eth App _- 用一个命令创建以太坊驱动的应用程序。_**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _- 一款 FOSS 工具，用于从 [ABI](/glossary/#abi) 生成去中心化应用程序前端。_**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _- 供以太坊开发者测试节点，并在浏览器中编写和调试 RPC 调用的 FOSS 工具。_**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _- 为 Web3 开发提供各种语言的 SDK、智能合约、工具和基础设施。_**

- [主页](https://thirdweb.com/)
- [文档](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _- 企业级 Web3 开发平台，用于部署智能合约，支持信用卡和跨链支付，并使用 API 来创建、分发、销售、存储和编辑 NFT。_**

- [crossmint.com](https://www.crossmint.com)
- [文档](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## 扩展阅读{#further-reading}

- [探索去中心化应用程序](/apps)
- [Web 3.0 应用程序的架构](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [2021 年去中心化应用程序指南](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [什么是去中心化应用程序？](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_
- [热门去中心化应用程序](https://www.alchemy.com/dapps) - _Alchemy_

_你还知道哪些对你有帮助的社区资源？ 请编辑本页面并添加进来！_

## 相关主题 {#related-topics}

- [以太坊堆栈简介](/developers/docs/ethereum-stack/)
- [开发框架](/developers/docs/frameworks/)
