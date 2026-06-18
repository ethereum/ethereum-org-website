---
title: "去中心化应用 (dapp) 技术简介"
description:
lang: zh
---

去中心化应用 (dapp) 是构建在去中心化网络上的应用程序，它结合了[智能合约](/developers/docs/smart-contracts/)和前端用户界面。在[以太坊](/)上，智能合约是公开透明的（就像开放的 API 一样），因此你的 dapp 甚至可以包含其他人编写的智能合约。

## 先决条件 {#prerequisites}

在学习去中心化应用 (dapp) 之前，你应该先了解[区块链基础知识](/developers/docs/intro-to-ethereum/)，并阅读有关以太坊网络及其去中心化特性的内容。

## 去中心化应用 (dapp) 的定义 {#definition-of-a-dapp}

去中心化应用 (dapp) 的后端代码运行在去中心化的点对点网络上。相比之下，传统应用程序的后端代码则运行在中心化服务器上。

dapp 可以使用任何语言编写前端代码和用户界面（就像传统应用程序一样）来调用其后端。此外，它的前端可以托管在 [IPFS](https://ipfs.io/) 等去中心化存储上。

- **去中心化的** - dapp 运行在以太坊上，这是一个开放的公共去中心化平台，没有任何个人或团体可以控制它
- **确定性** - 无论在何种环境下执行，dapp 都会执行相同的功能
- **图灵完备** - 只要有足够的资源，dapp 可以执行任何操作
- **隔离性** - dapp 在被称为以太坊虚拟机的虚拟环境中执行，因此如果智能合约存在漏洞，也不会妨碍区块链网络的正常运行

### 关于智能合约 {#on-smart-contracts}

要介绍去中心化应用 (dapp)，我们需要先介绍智能合约——姑且称之为 dapp 的后端。如需详细了解，请前往我们的[智能合约](/developers/docs/smart-contracts/)部分。

智能合约是存在于以太坊区块链上并完全按照编程运行的代码。一旦智能合约部署到网络上，你就无法更改它们。dapp 之所以是去中心化的，是因为它们由写入合约的逻辑控制，而不是由个人或公司控制。这也意味着你需要非常仔细地设计合约并进行彻底的测试。

## 去中心化应用 (dapp) 开发的优势 {#benefits-of-dapp-development}

- **零停机时间** – 一旦智能合约部署在区块链上，整个网络将始终能够为希望与合约交互的客户端提供服务。因此，恶意行为者无法针对单个 dapp 发起拒绝服务攻击。
- **隐私** – 你无需提供真实世界的身份即可部署 dapp 或与之交互。
- **抗审查性** – 网络上没有任何单一实体可以阻止用户提交交易、部署 dapp 或从区块链读取数据。
- **完整的数据完整性** – 借助密码学原语，存储在区块链上的数据是不可变的且无可争议的。恶意行为者无法伪造已经公开的交易或其他数据。
- **无须信任的计算/可验证的行为** – 智能合约可以被分析，并保证以可预测的方式执行，而无须信任中央机构。这在传统模型中是不可能的；例如，当我们使用网上银行系统时，我们必须相信金融机构不会滥用我们的财务数据、篡改记录或遭到黑客攻击。

## 去中心化应用 (dapp) 开发的缺点 {#drawbacks-of-dapp-development}

- **维护** – dapp 可能更难维护，因为发布到区块链的代码和数据更难修改。一旦部署，开发人员很难对他们的 dapp（或 dapp 存储的底层数据）进行更新，即使在旧版本中发现了错误或安全风险。
- **性能开销** – 存在巨大的性能开销，并且扩展非常困难。为了达到以太坊所追求的安全、完整、透明和可靠的水平，每个节点都会运行并存储每笔交易。除此之外，权益证明 (PoS) 共识也需要时间。
- **网络拥堵** – 当一个 dapp 使用过多的计算资源时，整个网络都会发生拥堵。目前，网络每秒只能处理大约 10-15 笔交易；如果发送交易的速度快于此速度，未确认交易池可能会迅速膨胀。
- **用户体验** – 设计用户友好的体验可能更加困难，因为普通最终用户可能会发现，设置以真正安全的方式与区块链交互所需的工具栈过于困难。
- **中心化** – 构建在以太坊基础层之上的用户友好和开发者友好的解决方案最终可能看起来仍然像中心化服务。例如，此类服务可能会在服务器端存储密钥或其他敏感信息，使用中心化服务器提供前端服务，或者在写入区块链之前在中心化服务器上运行重要的业务逻辑。中心化消除了区块链相对于传统模型的许多（如果不是全部）优势。

## 更喜欢通过视频学习？ {#visual-learner}

<VideoWatch slug="what-is-a-dapp" />

## 创建去中心化应用 (dapp) 的工具 {#dapp-tools}

**Scaffold-ETH _- 使用适应你智能合约的前端快速体验 Solidity。_**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [示例 dapp](https://punkwallet.io/)

**Create Eth App _- 使用一条命令创建由以太坊驱动的应用程序。_**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _- 从 [ABI](/glossary/#abi) 生成 dapp 前端的自由和开源软件 (FOSS) 工具。_**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _- 供以太坊开发者测试其节点，并在浏览器中编写和调试 RPC 调用的自由和开源软件 (FOSS) 工具。_**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _- 提供各种语言的 SDK、智能合约、工具以及用于 Web3 开发的基础设施。_**

- [主页](https://thirdweb.com/)
- [文档](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _- 企业级 Web3 开发平台，用于部署智能合约、启用信用卡和跨链支付，并使用 API 创建、分发、销售、存储和编辑 NFT。_**

- [crossmint.com](https://www.crossmint.com)
- [文档](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## 延伸阅读 {#further-reading}

- [探索去中心化应用 (dapp)](/apps)
- [Web 3.0 应用程序的架构](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [2021 年去中心化应用指南](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [什么是去中心化应用？](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_
- [热门 dapp](https://www.alchemy.com/dapps) - _Alchemy_

_知道对你有帮助的社区资源吗？编辑本页面并添加它！_

## 相关主题 {#related-topics}

- [以太坊技术栈简介](/developers/docs/ethereum-stack/)
- [开发框架](/developers/docs/frameworks/)

## 教程：在以太坊上构建应用程序和前端 {#tutorials}

- [尤尼斯瓦普-v2 合约演练](/developers/tutorials/uniswap-v2-annotated-code/) _– 尤尼斯瓦普 v2 核心合约的带注释演练，解释了自动做市商 (AMM) 的工作原理。_
- [为你的合约构建用户界面](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) _– 如何构建一个连接到你的智能合约的现代 React + Wagmi 前端。_
- [面向初学者的 Hello World 智能合约 – 全栈](/developers/tutorials/hello-world-smart-contract-fullstack/) _– 端到端教程：为一个简单的智能合约编写、部署并构建前端。_
- [Web3 应用程序的服务器组件和代理](/developers/tutorials/server-components/) _– 如何编写监听区块链事件并以交易响应的 TypeScript 服务器组件。_
- [用于去中心化用户界面的 IPFS](/developers/tutorials/ipfs-decentralized-ui/) _– 如何将你的 dapp 前端托管在 IPFS 上以实现抗审查性。_