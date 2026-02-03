---
title: "再质押"
metaTitle: "什么是再质押？ | 再质押的好处和用途"
description: "使用已质押的 ETH 保护其他去中心化服务并赚取额外奖励。"
lang: zh
template: use-cases
emoji: ":recycle:"
image: /images/use-cases/restaking.png
alt: "以太坊上再质押的可视化表示。"
sidebarDepth: 2
summaryPoint1: "使用已质押的 ETH 保护其他去中心化服务并赚取额外奖励。"
buttons:
  - content: 什么是再质押？
    toId: what-is-restaking
  - content: 工作原理
    toId: how-does-restaking-work
    isSecondary: false
---

以太坊网络全年无休地保护着价值数十亿美元的资产。 如何实现？

世界各地的人们将[以太币 (ETH)](/eth/) 锁定（或“质押”）在智能合约中，以运行处理以太坊交易和保护以太坊网络的软件。 作为回报，他们会获得更多 ETH 作为奖励。

再质押是一项为[质押者](/staking/)打造的技术，可将这种安全性扩展到其他服务、应用程序或网络。 作为回报，他们可以获得额外的再质押奖励。 但是，他们也让已质押的 ETH 面临更大的风险。

**18 分钟解释再质押**

<YouTube id="rOJo7VwPh7I" />

## 什么是再质押？ {#what-is-restaking}

再质押是指质押者使用已经质押的 ETH 来保护其他去中心化服务。 作为回报，再质押者除了获得常规的 ETH 质押奖励外，还可以从这些其他服务中获得额外奖励。

通过再质押保护的去中心化服务被称为“主动验证服务”(AVS)。
就像许多 ETH 质押者运行以太坊验证软件一样，许多再质押者也运行专门的 AVS 软件。

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>最好知道</strong></p>
  <p className="mt-2">虽然“主动验证服务”(AVS) 是最常见的名称，但不同的再质押平台可能会对其帮助保护的去中心化服务使用其他名称，例如“自主验证服务”、“分布式安全服务”或“网络”。</p>
</AlertDescription>
</AlertContent>
</Alert>

## 质押与再质押 {#staking-vs-restaking}

| 质押         | 再质押                |
| ---------- | ------------------ |
| 赚取 ETH 奖励  | 赚取 ETH 奖励 + AVS 奖励 |
| 保护以太坊网络    | 保护以太坊网络 + AVS      |
| 无最低 ETH 要求 | 无最低 ETH 要求         |
| 低风险等级      | 低至高风险等级            |
| 提款时间取决于队列  | 提款时间取决于队列 + 解除绑定期  |

## 为什么我们需要再质押？ {#why-do-we-need-restaking}

想象两个世界：一个有再质押，一个没有。

 <TabbedSection />

在这个有再质押的世界中，AVS 和质押者都受益于能够找到彼此并用安全性换取额外奖励。

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>再质押的额外好处</strong></p>
  <p className="mt-2">AVS 可以将所有资源投入到构建和营销其服务中，而不会因去中心化和安全性问题而分心。</p>
</AlertDescription>
</AlertContent>
</Alert>

## 再质押如何运作？ {#how-does-restaking-work}

再质押涉及多个实体——每个实体都扮演着重要的角色。

| **术语**      | **描述**                                                                                                                                  |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **再质押平台**   | 再质押平台是一种连接 AVS、ETH 质押者和运营商的服务。 他们为质押者构建去中心化应用程序以再质押其 ETH，并构建市场让质押者、AVS 和运营商可以找到彼此。                                                      |
| **原生再质押者**  | 通过运行自己的以太坊验证者来质押 ETH 的人可以将其已质押的 ETH 连接到再质押平台（包括 EigenLayer 等），从而在 ETH 验证者奖励之外赚取再质押奖励。                                                   |
|             |                                                                                                                                         |
| **流动性再质押者** | 通过第三方流动性质押提供商（如 Lido 或 Rocket Pool）质押其 ETH 的人会获得代表其已质押 ETH 的流动性质押代币 (LST)。 他们可以再质押这些 LST 来赚取再质押奖励，同时保持其原始 ETH 的质押状态。 |
|             |                                                                                                                                         |
| **运营商**     | 运营商运行 AVS 的再质押软件，执行每个 AVS 所需的验证任务。 运营商通常是专业的服务提供商，可保证正常运行时间和性能等。 与非运营商再质押者一样，运营商使用已质押的 ETH 来保护 AVS，但运营商还会因其工作而获得额外奖励。                   |
|             |                                                                                                                                         |
| **AVS**     | 这些是去中心化服务——例如价格预言机、代币链桥和数据系统——它们从再质押者那里获得安全性，并作为回报提供代币奖励。                                                                               |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>最好知道</strong></p>
  <p className="mt-2">原生和流动性再质押者通常将其已质押的 ETH 委托给运营商，而不是自己运行软件来保护 AVS。</p>
  <p className="mt-2">这样他们就不必担心 AVS 提出的复杂技术要求，尽管他们获得的奖励率低于运营商。</p>
</AlertDescription>
</AlertContent>
</Alert>

## 再质押有哪些例子？ {#what-are-some-examples-of-restaking}

虽然这是一个新颖的想法，但已经出现了一些项目来探索再质押的可能性。

<RestakingList/>

<br/>

<Alert variant="warning" className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>用词不当警示</strong></p>
  <p className="mt-2">有些人将“再质押”与在 DeFi 中借出和借入 LST 混淆。 两者都让已质押的 ETH 发挥作用，但再质押意味着保护 AVS，而不仅仅是在 LST 上赚取收益。</p>
</AlertDescription>
</AlertContent>
</Alert>

## 我可以通过再质押赚多少钱？ {#how-much-can-i-make-from-restaking}

虽然 AVS 提供不同的收益率，但像 eETH 这样的流动性再质押代币 (LRT) 可以让你了解你能赚多少钱。 就像你通过质押 ETH 获得 stETH 等 LST 一样，你也可以通过再质押 stETH 获得 eETH 等 LRT。 这些代币可以赚取 ETH 质押和再质押奖励。

**认识到再质押的风险很重要。 潜在的回报可能很诱人，但并非没有风险。**

## 再质押的风险有哪些？ {#what-are-the-risks-of-restaking}

| **风险**        | **描述**                                                    |
| ------------- | --------------------------------------------------------- |
| **罚款（或“惩罚”）** | 与 ETH 质押类似，如果再质押者/运营商离线、审查消息或试图破坏网络，他们的质押可能会被部分或全部惩罚（销毁）。 |
| **中心化**       | 如果少数运营商主导了大部分的再质押，他们可能会对再质押者、AVS 甚至再质押平台产生巨大影响。           |
| **连锁反应**      | 如果一个再质押者在保护多个 AVS 时受到惩罚，这可能会降低其他 AVS 的安全性，使它们变得易受攻击。      |
| **即时提取资金**    | 提取再质押的 ETH 有一个等待时间（或“解绑期”），因此您可能无法总是立即提取。                 |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>以太坊联合创始人正在输入...</strong></p>
  <p className="mt-2">
    以太坊联合创始人 Vitalik 在 2021 年一篇名为<a href="https://vitalik.eth.limo/general/2023/05/21/dont_overload.html">《不要让共识超载。》</a>的博客文章中警告了再质押的潜在风险
  </p>
</AlertDescription>
</AlertContent>
</Alert>

## 如何开始再质押？ {#how-to-get-started-with-restaking}

| 🫡 初学者                                                             | 🤓 高级用户                                                   |
| ------------------------------------------------------------------ | --------------------------------------------------------- |
| 1. 在 Lido 或 Rocket Pool 等平台上质押 ETH 以获取 LST。 | 1. 在以太坊上作为验证者质押您的 ETH。             |
| 2. 使用这些 LST 在再质押服务上开始再质押。                   | 2. 比较 EigenLayer、Symbiotic 等再质押服务。 |
|                                                                    | 3. 按照说明将您的验证者连接到再质押智能合约。           |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>以太坊质押：</strong>它是如何运作的？</p>
  <ButtonLink href="/staking/">
    了解更多
  </ButtonLink>
</AlertDescription>
</AlertContent>
</Alert>

## 高级 {#advanced}

<YouTube id="-V-fG4J1N_M" />

## 扩展阅读{#further-reading}

1. [ethereum.org - ETH 质押指南](https://ethereum.org/en/staking/)
2. [Ledger Academy - 以太坊再质押是什么？](https://www.ledger.com/academy/what-is-ethereum-restaking)
3. [Consensys - EigenLayer：去中心化以太坊再质押协议详解](https://consensys.io/blog/eigenlayer-decentralized-ethereum-restaking-protocol-explained)
4. [Vitalik Buterin - 不要让以太坊的共识超载](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)
5. [Cointelegraph - EigenLayer 是什么？ 以太坊再质押协议详解](https://cointelegraph.com/explained/what-is-eigenlayer-ethereums-restaking-protocol-explained)
6. [a16z crypto research - EigenLayer：为以太坊添加无许可功能（Sreeram Kannan 访谈）](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [Junion - EigenLayer 详解：什么是再质押？](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [The Block - 再质押数据仪表盘](https://www.theblock.co/data/decentralized-finance/restaking)
