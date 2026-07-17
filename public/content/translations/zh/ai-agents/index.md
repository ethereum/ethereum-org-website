---
title: "AI 代理"
metaTitle: "AI 代理 | 以太坊上的 AI 代理"
description: "以太坊上的 AI 代理概述"
lang: zh
template: use-cases
sidebarDepth: 2
image: /images/ai-agents/hero-image.png
alt: "聚集在终端桌旁的人们"
summaryPoints:
  - "与区块链交互并独立交易的 AI"
  - "控制链上钱包和资金"
  - "雇佣人类或其他代理进行工作"
buttons:
  - content: 什么是 AI 代理？
    toId: what-are-ai-agents
  - content: 探索代理
    toId: ai-agents-on-ethereum
    isSecondary: false
---

想象一下，在以太坊上有一位 AI 助手，它全天候 24 小时研究链上市场趋势、回答问题，甚至代表你执行交易。欢迎来到 AI 代理的世界——旨在简化你数字生活的智能系统。

在以太坊上，我们看到了 AI 代理的创新，从虚拟网红和自主内容创作者到实时市场分析平台，通过提供洞察、娱乐和运营效率来赋能用户。

## 什么是 AI 代理？ {#what-are-ai-agents}

AI 代理是使用人工智能执行任务或自主做出决策的软件程序。它们从数据中学习，适应变化，并处理复杂的任务。它们不间断地运行，并能立即发现机会。

### AI 代理如何与区块链协同工作 {#how-ai-agents-work-with-blockchains}

在传统金融中，AI 代理通常在数据输入有限的中心化环境中运行。这阻碍了它们自主学习或管理资产的能力。

相比之下，以太坊的去中心化生态系统提供了几个关键优势：

- <strong>透明的数据：</strong> 访问实时区块链信息。
- <strong>真正的资产所有权：</strong> 数字资产完全由 AI 代理拥有。
- <strong>强大的链上功能：</strong> 使 AI 代理能够执行交易、与智能合约交互、提供流动性并在不同协议之间协作。

这些因素将 AI 代理从简单的机器人转变为动态的、自我完善的系统，在多个领域提供巨大价值：

<Grid>
  <Card title="自动化 DeFi" emoji=":money_with_wings:" description="AI 代理密切关注市场趋势、执行交易并管理投资组合——让复杂的 DeFi 世界变得更加容易上手。"/>
  <Card title="全新 AI 代理经济" emoji="🌎" description="AI 代理可以雇佣具备不同技能的其他代理（或人类）来为其执行专业任务。" />
  <Card title="风险管理" emoji="🛠️" description="通过监控交易活动，AI 代理可以帮助识别骗局，从而更好、更快地保护您的数字资产。" />
</Grid>

## 可验证的 AI {#verifiable-ai}

在链下运行的 AI 代理通常表现得像“黑匣子”——它们的推理、输入和输出无法被独立验证。以太坊改变了这一点。通过将代理行为锚定在链上，开发者可以构建_无需信任_、_透明_且_经济自主_的代理。此类代理的操作可以被审计、约束和证明。

### 可验证推理 {#verifiable-inference}

AI 推理传统上发生在链下，那里的执行成本低廉，但模型执行是不透明的。在以太坊上，开发者可以使用几种技术将代理与可验证计算结合起来：

- [**zkML（零知识机器学习）**](https://opengradient.medium.com/a-gentle-introduction-to-zkml-8049a0e10a04)让代理能够证明模型被正确执行，而无需泄露模型或输入
- [**TEE（可信执行环境）证明**](https://en.wikipedia.org/wiki/Trusted_execution_environment)允许基于硬件的证明，证明代理运行了特定的模型或代码路径
- <strong>链上不可变性</strong>确保这些证明和认证可以被任何合约或代理引用、重放和信任

## 使用 x402 进行支付和商业活动 {#x402}

部署在以太坊和 L2 上的 [x402 协议](https://www.x402.org/)为代理提供了一种原生的方式来支付资源并在无需人工干预的情况下进行经济互动。代理可以：

- 使用稳定币支付计算、数据和 API 调用费用
- 请求或验证来自其他代理或服务的证明
- 参与代理间的商业活动，买卖计算、数据或模型输出

x402 将以太坊转变为自主代理的可编程经济层，实现按需付费的交互，而不是依赖账户、订阅或中心化计费。

### 代理金融安全 {#agentic-finance-security}

自主代理需要护栏。以太坊在钱包和合约层面提供了这些保护：

- [智能账户 (EIP-4337)](https://eips.ethereum.org/EIPS/eip-4337)让开发者能够强制执行支出限制、白名单、会话密钥和细粒度权限
- 智能合约中的编程约束可以限制代理被允许执行的操作
- 基于推理的限制（例如，在执行高风险操作之前需要 zkML 证明）增加了另一层安全性

这些控制措施使得部署不受无限制约束的自主代理成为可能。

### 链上注册表：ERC-8004 {#erc-8004}

[ERC-8004](https://eips.ethereum.org/EIPS/eip-8004) 定义了用于代理身份、声誉和验证的链上注册表。它由来自梅塔马斯克、以太坊基金会、Google 和 Coinbase 的贡献者共同编写，已部署在包括以太坊主网、Base、Polygon、Arbitrum 等在内的 16 个网络上。

它提供：

- 一个**身份注册表**，用于可移植、抗审查的代理标识符
- 一个**声誉注册表**，用于跨应用程序的标准化反馈信号
- 一个**验证注册表**，用于请求独立验证（zkML、TEE、质押重新执行）

ERC-8004 使代理更容易在完全去中心化的环境中相互发现、验证和交易。

## 以太坊上的 AI 代理 {#ai-agents-on-ethereum}

我们才刚刚开始探索 AI 代理的全部潜力，而许多项目已经开始利用 AI 和区块链之间的协同效应——特别是在透明度和货币化方面。

<AiAgentProductLists list="ai-agents" />

<strong>Luna 首次作为播客嘉宾亮相</strong>

<VideoWatch slug="ai-agents-interview-luna" />

## 代理控制的钱包 {#agent-controlled-wallets}

像 Luna 或 AIXBT 这样的代理控制着它们自己的链上钱包（[AIXBT 的钱包](https://clusters.xyz/aixbt)，[Luna 的钱包](https://zapper.xyz/account/0x0d177181e3763b20d47dc3a72dd584368bd8bf43)），使它们能够打赏粉丝并参与经济活动。

在 Luna 的 X 社交活动 #LunaMuralChallenge 期间，Luna 通过她的 Base 钱包选出并奖励了获胜者——这标志着<strong>AI 首次为了加密货币奖励而雇佣人类</strong>。

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<p className="mt-0"><strong>须知</strong></p>
<p className="mt-2">AI 代理及相关工具仍处于早期开发阶段，具有很强的实验性——请谨慎使用。</p>
</AlertContent>
</Alert>

## 使用聊天命令控制你的钱包 {#control-your-wallet-using-chat-commands}

你可以跳过去中心化金融 (DeFi) 复杂的界面，用简单的聊天命令管理你的加密货币。

这种直观的方法使交易更快、更容易，并且不易出错，例如将资金发送到错误的地址或支付过高的费用。

<AiAgentProductLists list="chat" />

## AI 代理与 AI 机器人 {#ai-agents-vs-ai-bots}

AI 代理和 AI 机器人之间的区别有时会令人困惑，因为两者都根据输入执行自动化操作。

- AI 机器人就像自动化助手——它们遵循特定的、预先编程的指令来执行日常任务。
- AI 代理更像是智能伴侣——它们从经验中学习，适应新信息，并自主做出决策。

|                     | AI 代理                                                              | AI 机器人                                     |
| ------------------- | ---------------------------------------------------------------------- | ------------------------------------------- |
| **交互**    | 复杂、适应性强、自主                                         | 简单、预定义范围、硬编码        |
| **学习**        | 持续学习，能够实时实验并适应新数据 | 基于预训练数据或固定规则运行 |
| **任务完成** | 旨在实现更广泛的目标                                     | 仅专注于特定任务              |

## 深入了解 {#dive-deeper}

<AiAgentProductLists list="dive-deeper" />

## 你可以构建自己的 AI 代理 {#you-can-build-your-own-ai-agent}

<BuildYourOwnAIAgent />