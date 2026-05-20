---
title: Build AI agents on Ethereum
metaTitle: AI agent builder hub | ethereum.org
description: A developer hub for building AI agents on Ethereum. Covers wallets, verifiable computation, machine payments, agent identity, and the L2 ecosystem.
lang: en
template: ai-agents
sidebarDepth: 2
image: /images/ai-agents/hero-image.png
alt: Developer working with AI agent architecture on Ethereum
summaryPoints:
  - "Programmable wallets with spending limits and session keys"
  - "Verifiable behavior via zkML proofs and TEE attestations"
  - "Machine-to-machine payments using stablecoins and open protocols"
buttons:
  - content: Getting started
    href: /ai-agents/getting-started/
  - content: Browse the hub
    toId: ai-agent-builder-hub-sections
    isSecondary: true
---

AI agents are software programs that observe their environment, make decisions, and take actions, including sending transactions, paying for services, and interacting with smart contracts, without requiring human input on every step.

Ethereum provides the infrastructure these agents need: programmable wallets that enforce spending limits, verifiable computation that proves an agent followed its rules, open payment rails for machine-to-machine commerce, and a permissionless identity layer that any application can verify. These are **not properties that a centralized server can replicate**, because they depend on a network that no single party controls.

This builder hub is the starting point for developers building production AI agents on Ethereum.

<Alert className="my-8">
<AlertContent>
**New to AI on Ethereum?**

If you want to learn how AI and Ethereum work together as a use case, visit the [Decentralized AI](/decentralized-ai/) overview page.
</AlertContent>
</Alert>

## AI agents vs AI bots {#ai-agents-vs-bots}

|                      | AI agents                                                                      | AI bots                                        |
| -------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------- |
| **Decision-making**  | Autonomous; adapts to new inputs and conditions                                | Rule-based; executes fixed, pre-programmed logic |
| **Learning**         | Can update behavior from real-time data and feedback                           | Operates on pre-trained data or hardcoded rules  |
| **Onchain identity** | Holds a programmable wallet, can sign and send transactions                    | Typically reads data; does not hold assets       |
| **Composability**    | Can discover and interact with any open protocol                                | Limited to the APIs it was explicitly integrated with |
| **Guardrails**       | Enforced by smart contract logic (spending limits, session keys, allowlists)   | Enforced by the operator's server configuration  |
| **Verification**     | Behavior can be proven onchain via zkML or TEE attestations                    | Behavior is attested only by the operator        |

See [AI agents: Why Ethereum](/ai-agents/ethereum/) to learn more about the technical case for using Ethereum as the settlement and coordination layer for AI agents.

## What the AI agent builder hub covers {#what-the-ai-agent-hub-covers}

Ethereum provides a unique set of technical foundations for deploying production AI agents. 

The AI agent builder hub covers each of these core building blocks in depth:

<CardGrid>
  <HubCard
    emoji=":closed_lock_with_key:"
    title="Programmable wallets"
    description="Agents can hold and transfer digital assets directly. A smart account functions as the agent's onchain identity and treasury, with spending limits, allowlists, and session keys enforced at the contract level."
    href="/ai-agents/wallets/"
    ctaLabel="See Agent wallets"
  />
  <HubCard
    emoji=":mag:"
    title="Verifiable inference"
    description="An agent running offchain is a black box. By anchoring key decisions to onchain proofs via zkML or TEEs, developers can give counterparties a way to confirm that the agent followed its stated logic."
    href="/ai-agents/verification/"
    ctaLabel="See Verification"
  />
  <HubCard
    emoji=":money_with_wings:"
    title="Machine payments"
    description="Autonomous agents need to pay for compute and data without human intervention. Stablecoins and open protocols like x402 provide a programmable settlement layer for agent commerce."
    href="/ai-agents/payments/"
    ctaLabel="See Payments"
  />
  <HubCard
    emoji=":bust_in_silhouette:"
    title="Agent identity"
    description="When agents interact with humans or other agents, counterparties need a way to verify what an agent is and what its track record is using onchain registries like ERC-8004."
    href="/ai-agents/identity/"
    ctaLabel="See Identity"
  />
</CardGrid>

## AI agent infrastructure today {#ecosystem-today}

The standards and protocols that power AI agents on Ethereum have crossed from research into production.

| Standard or protocol | Status |
| :--- | :--- |
| **EIP-7702** — Smart account delegation for existing EOAs | Live since the Pectra upgrade, May 2025 |
| **ERC-4337** — Smart account standard | Production EntryPoint deployments on all major networks (v0.7 widely adopted; v0.8, v0.9 also live) |
| **ERC-8004** — Onchain agent identity registry | Draft — in active adoption; live on 20+ chains since January 2026 |
| **x402** — Machine-to-machine HTTP payments | Production-ready since Q1 2026 |
| **L2 transaction cost** | $0.001–$0.003 per operation |

## AI agent builder hub sections {#ai-agent-builder-hub-sections}

### Start here {#start-here}

- [Why Ethereum](/ai-agents/ethereum/) — The technical case for using Ethereum as the settlement and coordination layer for AI agents.
- [Getting started](/ai-agents/getting-started/) — Fund an agent wallet, pick a framework, and deploy your first autonomous transaction.

### Core building blocks {#core-building-blocks}

- [Agent wallets](/ai-agents/wallets/) — Smart accounts, session keys, hardware trust layers, and the patterns for giving an agent safe spending authority.
- [Frameworks](/ai-agents/frameworks/) — A directory of agent frameworks with Ethereum support and guidance on when to use each.
- [Verification](/ai-agents/verification/) — zkML, TEEs, and onchain attestations: how to prove an agent behaved as claimed.
- [Payments](/ai-agents/payments/) — Machine-to-machine micropayments, streaming payments, and stablecoin rails for autonomous agent commerce.
- [Identity](/ai-agents/identity/) — Agent identity standards (ERC-8004), reputation systems, and proof-of-personhood mechanisms.

### Ecosystem and tooling {#ecosystem-and-tooling}

- [Use cases](/ai-agents/use-cases/) — What agents are doing on Ethereum today: DeFi automation, data markets, governance participation, and more.
- [Layer 2s](/ai-agents/l2s/) — How to choose an L2 for your agent based on cost, throughput, privacy, and ecosystem fit.

<Alert variant="warning" className="my-8">
<AlertContent>
**Maturity note**

AI agent infrastructure on Ethereum ranges from production-ready standards (ERC-4337, stablecoin payments) to actively experimental technology (zkML at scale, agent-to-agent commerce). Each sub-page in this hub flags the maturity level of the patterns it covers.
</AlertContent>
</Alert>

## Frequently asked questions {#faq}

<ExpandableCard title="What is an AI agent on Ethereum?">

An AI agent is an autonomous software program that uses a language model to reason about goals, decide what actions to take, and execute those actions in a loop without requiring human approval for each step. When that agent is connected to Ethereum, it can hold assets, sign transactions, interact with smart contracts, and participate in onchain protocols as a first-class participant. See [AI agents: Why Ethereum](/ai-agents/ethereum/) for the technical case for AI agents, or, to learn the basics of what people can do on Ethereum with AI, see [Decentralized AI](/decentralized-ai/).

</ExpandableCard>

<ExpandableCard title="How is an AI agent different from a bot?">

A bot follows fixed rules. Given input X, it always does Y. An AI agent uses a language model to reason about novel situations, form a plan, and take sequences of actions that may differ depending on context. Agents are capable of multi-step reasoning, adapting to unexpected conditions, and handling tasks they were not explicitly programmed for. The trade-off is that agent behavior is less predictable, which is why spending limits and session keys are essential. See the [AI agents: Getting started](/ai-agents/getting-started/) guide.

</ExpandableCard>

