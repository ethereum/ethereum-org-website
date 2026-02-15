---
title: AI agents
metaTitle: AI agents | AI agents on Ethereum
description: An overview of AI agents on Ethereum
lang: en
template: use-cases
emoji: ":robot:"
sidebarDepth: 2
image: /images/ai-agents/hero-image.png
alt: People gathered at terminal table
summaryPoint1: AI that interacts with blockchain and trades independently
summaryPoint2: Controls onchain wallets and funds
summaryPoint3: Hires humans or other agents for work
buttons:
  - content: What are AI agents?
    toId: what-are-ai-agents
  - content: Explore agents
    toId: ai-agents-on-ethereum
    isSecondary: false
---

Imagine navigating Ethereum with an AI assistant that studies onchain market trends 24/7, answers questions, and even executes transactions on your behalf. Welcome to the world of AI Agents—intelligent systems designed to simplify your digital life.

On Ethereum, we’re seeing innovations of AI agents ranging from virtual influencers and autonomous content creators to real-time market analysis platforms, empowering users by delivering insights, entertainment, and operational efficiency.

## What are AI agents? {#what-are-ai-agents}

AI agents are software programs that use artificial intelligence to perform tasks or make own decisions. They learn from data, adapt to changes, and handle complex tasks. They operate non-stop and can instantly detect opportunities.

### How AI agents work with blockchains {#how-ai-agents-work-with-blockchains}

In traditional finance, AI agents often operate in centralized environments with limited data inputs. This hinders their ability to learn or manage assets autonomously.

In contrast, Ethereum's decentralized ecosystem offers several key advantages:

- <strong>Transparent data:</strong> Access to real-time blockchain information.
- <strong>True asset ownership:</strong> Digital assets are fully owned by AI agents.
- <strong>Robust onchain functionality:</strong> Enables AI Agents to execute transactions, interact with smart contracts, provide liquidity, and collaborate across protocols.

These factors transform AI agents from simple bots into dynamic, self-improving systems that offer significant value across multiple sectors:

<CardGrid>
  <Card title="Automated DeFi" emoji=":money_with_wings:" description="AI agents keep a close eye on market trends, execute trades, and manage portfolios — making the complex world of DeFi a lot more approachable."/>
  <Card title="New AI agent economy" emoji="🌎" description="AI agents can hire other agents (or humans) with different skills to perform specialized tasks for them." />
  <Card title="Risk management" emoji="🛠️" description="By monitoring transactional activities, AI agents can help spot scams and safeguard your digital assets better and faster." />
</CardGrid>

## Verifiable AI {#verifiable-ai}

AI agents running offchain often behave like "black boxes"—their reasoning, inputs, and outputs can’t be independently verified. Ethereum changes that. By anchoring agent behavior onchain, developers can build agents that are _trustless_, _transparent_, and _economically autonomous_. The actions of such agents can be audited, constrained, and proven.

### Verifiable inference {#verifiable-inference}

AI inference traditionally happens offchain, where execution is cheap but model execution is opaque. On Ethereum, developers can pair agents with verifiable computation using several techniques:

- [**zkML (zero-knowledge machine learning)**](https://opengradient.medium.com/a-gentle-introduction-to-zkml-8049a0e10a04) lets agents prove that a model was executed correctly without revealing the model or inputs
- [**TEE (trusted execution environment) attestations**](https://en.wikipedia.org/wiki/Trusted_execution_environment) allow hardware-backed proofs that an agent ran a specific model or code path
- **Onchain immutability** ensures these proofs and attestations can be referenced, replayed, and trusted by any contract or agent

## Payments, and commerce with x402 {#x402}

The [x402 protocol](https://www.x402.org/), deployed on Ethereum and L2s, gives agents a native way to pay for resources and interact economically without human intervention. Agents can:

- Pay for compute, data, and API calls using stablecoins
- Request or verify attestations from other agents or services
- Participate in agent-to-agent commerce, buying and selling compute, data, or model outputs

x402 turns Ethereum into a programmable economic layer for autonomous agents, enabling pay-per-use interactions instead of accounts, subscriptions, or centralized billing.

### Agentic finance security {#agentic-finance-security}

Autonomous agents need guardrails. Ethereum provides them at the wallet and contract level:

- [Smart accounts (EIP-4337)](https://eips.ethereum.org/EIPS/eip-4337) let developers enforce spending limits, whitelists, session keys, and granular permissions
- Programmed constraints in smart contracts can restrict what an agent is allowed to do
- Inference-based limits (e.g., requiring a zkML proof before executing a high-risk action) add another layer of safety

These controls enable the deployment of autonomous agents that are not unbounded.

### Onchain registries: ERC-8004 {#erc-8004}

[ERC-8004](https://eips.ethereum.org/EIPS/eip-8004) defines onchain registries for agent identity, reputation, and validation. Co-authored by contributors from MetaMask, Ethereum Foundation, Google, and Coinbase, it is deployed on 16 networks including Ethereum mainnet, Base, Polygon, Arbitrum, and others.

It provides:

- An **Identity Registry** for portable, censorship-resistant agent identifiers
- A **Reputation Registry** for standardized feedback signals across applications
- A **Validation Registry** for requesting independent verification (zkML, TEE, staked re-execution)

ERC-8004 makes it easier for agents to discover, verify, and transact with each other in a fully decentralized environment.

## AI agents on Ethereum {#ai-agents-on-ethereum}

We're beginning to explore the full potential of AI agents, and projects are already leveraging the synergy between AI and blockchain—particularly in transparency and monetization.

<AiAgentProductLists list="ai-agents" />

<strong>Luna's first appearance as a podcast guest</strong>

<YouTube id="ZCsOMxnIruA" />

## Agent-controlled wallets {#agent-controlled-wallets}

Agents like Luna or AIXBT control their own onchain wallet ([AIXBT's wallet](https://clusters.xyz/aixbt), [Luna's wallet](https://zapper.xyz/account/0x0d177181e3763b20d47dc3a72dd584368bd8bf43)) enabling them to tip fans and participate in economic activities.

During Luna's X social campaign #LunaMuralChallenge, Luna selected and rewarded the winners via her Base wallet — marking <strong>the first instance of an AI hiring humans for crypto reward</strong>.

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<p className="mt-0"><strong>Good to know</strong></p>
<p className="mt-2">AI agents and related tools are still in early development and very experimental—use with caution.</p>
</AlertContent>
</Alert>

## Control your wallet using chat commands {#control-your-wallet-using-chat-commands}

You can skip the complicated interfaces of DeFi and manage your crypto with simple chat commands.

This intuitive approach makes transactions faster, easier, and less prone to errors like sending funds to the wrong address or overpaying for fees.

<AiAgentProductLists list="chat" />

## AI agents vs AI bots {#ai-agents-vs-ai-bots}

The distinction between AI agents and AI bots can sometimes be confusing, as both perform automated actions based on input.

- AI bots are like automated assistants — They follow specific, pre-programmed instructions to perform routine tasks.
- AI agents are more like intelligent companions — They learn from experience, adapt to new information, and make decisions on their own.

|                     | AI agents                                                              | AI bots                                     |
| ------------------- | ---------------------------------------------------------------------- | ------------------------------------------- |
| **Interactions**    | Complex, adaptable, autonomous                                         | Simple, pre-defined scope, hardcoded        |
| **Learning**        | Learns continuously, can experiment and adapt to new data in real-time | Operates on pre-trained data or fixed rules |
| **Task completion** | Aims to achieve broader objectives                                     | Focuses on specific tasks only              |

## Dive deeper {#dive-deeper}

<AiAgentProductLists list="dive-deeper" />

## You can build your own AI agent {#you-can-build-your-own-ai-agent}

<BuildYourOwnAIAgent />
