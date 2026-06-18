---
title: "再质押"
metaTitle: "什么是再质押？ | 再质押的优势与用途"
description: "使用已质押的 ETH 来保护其他去中心化服务并赚取额外奖励。"
lang: zh
template: use-cases
image: /images/use-cases/restaking.png
alt: "以太坊上再质押的视觉展示。"
sidebarDepth: 2
summaryPoints:
  - "使用已质押的 ETH 来保护其他去中心化服务并赚取额外奖励。"
buttons:
  - content: 什么是再质押？
    toId: what-is-restaking
  - content: 它是如何运作的？
    toId: how-does-restaking-work
    isSecondary: false
---

以太坊网络全年无休地保护着价值数十亿美元的资产。它是如何做到的？

世界各地的人们将[以太币 (ETH)](/what-is-ether/)锁定（或“质押”）在智能合约中，以运行处理以太坊交易并保护以太坊网络的软件。作为回报，他们会获得更多 ETH 奖励。

再质押是一项为[质押者](/staking/)构建的技术，旨在将这种安全性扩展到其他服务、应用程序或网络。作为回报，他们可以赚取额外的再质押奖励。然而，这也使他们质押的 ETH 面临更多风险。

**18 分钟了解再质押**

<VideoWatch slug="restaking-explained" />

## 什么是再质押？ {#what-is-restaking}

再质押是指质押者使用其已经质押的 ETH 来保护其他去中心化服务。作为回报，再质押者除了获得常规的 ETH 质押奖励外，还可以从这些其他服务中获得额外奖励。

由再质押保护的去中心化服务被称为“主动验证服务 (AVS)”。
就像许多 ETH 质押者运行以太坊验证软件一样，许多再质押者也运行专门的 AVS 软件。

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>温馨提示</strong>
  <p className="mt-2">虽然“主动验证服务 (AVS)”是最常见的名称，但不同的再质押平台可能会使用其他名称来称呼它们帮助保护的去中心化服务，例如“自主验证服务 (Autonomously Validated Services)”、“分布式安全服务 (Distributed Secure Services)”或“网络 (Networks)”。</p>
</AlertDescription>
</AlertContent>
</Alert>

## 质押与再质押 {#staking-vs-restaking}

| 质押 | 再质押 |
| ------------------------------ | ------------------------------------------------- |
| 赚取 ETH 奖励 | 赚取 ETH 奖励 + AVS 奖励 |
| 保护以太坊网络 | 保护以太坊网络 + AVS |
| 无最低 ETH 限制 | 无最低 ETH 限制 |
| 风险水平低 | 风险水平从低到高不等 |
| 提款时间取决于队列 | 提款时间取决于队列 + 解绑期 |

## 为什么我们需要再质押？ {#why-do-we-need-restaking}

想象两个世界：一个有再质押，另一个没有。

 <TabbedSection />

在这个拥有再质押的世界里，AVS 和质押者都能从相互发现并用安全性换取额外奖励中受益。

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>再质押的额外好处</strong>
  <p className="mt-2">AVS 可以将所有资源投入到构建和营销其服务中，而不必因去中心化和安全性而分心。</p>
</AlertDescription>
</AlertContent>
</Alert>

## 再质押是如何运作的？ {#how-does-restaking-work}

再质押涉及多个实体——每个实体都扮演着重要的角色。

| **术语** | **描述** |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **再质押平台** | 再质押平台是连接 AVS、ETH 质押者和运营商的服务。它们为质押者构建去中心化应用程序以再质押其 ETH，并建立市场让质押者、AVS 和运营商能够相互发现。 |
| **原生再质押者** | 通过运行自己的以太坊验证者来质押 ETH 的人，可以将其质押的 ETH 连接到再质押平台（包括 EigenLayer 等），从而在 ETH 验证者奖励之上赚取再质押奖励。 |
| **流动性再质押者** | 通过第三方流动性质押提供商（如 Lido 或 Rocket Pool）质押 ETH 的人，会获得代表其已质押 ETH 的流动性质押代币 (LST)。他们可以再质押这些 LST 以赚取再质押奖励，同时保持其原始 ETH 的质押状态。 |
| **运营商** | 运营商运行 AVS 的再质押软件，执行每个 AVS 所需的验证任务。运营商通常是保证正常运行时间和性能等指标的专业服务提供商。与非运营商再质押者一样，运营商使用已质押的 ETH 来保护 AVS，但运营商也会获得额外奖励作为其工作的回报。 |
| **AVS** | 这些是去中心化服务——如价格预言机、代币桥和数据系统——它们从再质押者那里获得安全性，并提供代币奖励作为回报。 |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>温馨提示</strong>
  <p className="mt-2">原生和流动性再质押者通常将其质押的 ETH 委托给运营商，而不是自己运行软件来保护 AVS。</p>
  <p className="mt-2">这样他们就不必担心 AVS 复杂的技术要求，尽管他们获得的奖励率低于运营商。</p>
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
 <p className="mt-0"><strong>名称误区提示</strong>
  <p className="mt-2">有些人将“再质押”与去中心化金融 (DeFi) 中借贷 LST 混为一谈。两者都让已质押的 ETH 发挥作用，但再质押意味着保护 AVS，而不仅仅是在 LST 上赚取收益。</p>
</AlertDescription>
</AlertContent>
</Alert>

## 我能从再质押中赚多少钱？ {#how-much-can-i-make-from-restaking}

虽然 AVS 提供不同的收益率，但像 eETH 这样的流动性再质押代币 (LRT) 可以让您了解自己能赚多少钱。就像您通过质押 ETH 获得 stETH 等 LST 一样，您可以通过再质押 stETH 获得 eETH 等 LRT。这些代币可以赚取 ETH 质押和再质押奖励。

**认识到再质押的风险很重要。潜在的奖励可能很诱人，但它们并非没有风险。**

## 再质押有哪些风险？ {#what-are-the-risks-of-restaking}

| **风险** | **描述** |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **惩罚（或“罚没”）** | 就像 ETH 质押一样，如果再质押者/运营商离线、审查消息或试图破坏网络，他们的质押可能会被部分或全部罚没（销毁）。 |
| **中心化** | 如果少数运营商主导了大部分再质押，他们可能会对再质押者、AVS 甚至再质押平台产生巨大影响。 |
| **连锁反应** | 如果一个再质押者在保护多个 AVS 时被罚没，这可能会降低其他 AVS 的安全性，使它们变得脆弱。 |
| **资金的即时访问** | 提取再质押的 ETH 需要等待时间（或“解绑期”），因此您可能无法总是立即访问资金。 |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>以太坊联合创始人正在输入…</strong>
  <p className="mt-2">
    以太坊联合创始人维塔利克·布特林在 2021 年一篇名为<a href="https://vitalik.eth.limo/general/2023/05/21/dont_overload.html">《不要让共识超载》(Don't Overload Consensus)</a>的博客文章中警告了再质押的潜在风险。

</AlertDescription>
</AlertContent>
</Alert>

## 如何开始再质押？ {#how-to-get-started-with-restaking}

| 🫡 初学者 | 🤓 高级用户 |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 1. 在 Lido 或 Rocket Pool 等平台上质押 ETH 以获取 LST。 | 1. 作为以太坊上的验证者质押您的 ETH。 |
| 2. 使用这些 LST 在再质押服务上开始再质押。 | 2. 比较 EigenLayer、Symbiotic 等再质押服务。 |
| | 3. 按照说明将您的验证者连接到再质押智能合约。 |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>以太坊质押：</strong>它是如何运作的？
  <ButtonLink href="/staking/">
    了解更多
  </ButtonLink>
</AlertDescription>
</AlertContent>
</Alert>

## 进阶 {#advanced}

<VideoWatch slug="eigenlayer-permissionless-features" />

## 延伸阅读 {#further-reading}

1. [ethereum.org - ETH 质押指南](/staking/)
2. [Ledger 学院 - 什么是以太坊再质押？](https://www.ledger.com/academy/what-is-ethereum-restaking)
3. [ConsenSys - EigenLayer：去中心化以太坊再质押协议详解](https://consensys.io/blog/eigenlayer-decentralized-ethereum-restaking-protocol-explained)
4. [维塔利克·布特林 - 不要让以太坊的共识超载](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)
5. [Cointelegraph - 什么是 EigenLayer？以太坊再质押协议详解](https://cointelegraph.com/explained/what-is-eigenlayer-ethereums-restaking-protocol-explained)
6. [a16z crypto 研究 - EigenLayer：与 Sreeram Kannan 探讨为以太坊添加无需许可的功能](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [Junion - EigenLayer 详解：什么是再质押？](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [The Block - 再质押数据仪表板](https://www.theblock.co/data/decentralized-finance/restaking)