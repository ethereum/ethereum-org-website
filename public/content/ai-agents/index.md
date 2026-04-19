---
title: Build AI agents on Ethereum
metaTitle: AI agents on Ethereum | Builder hub
description: A developer hub for building AI agents on Ethereum. Covers wallets, verifiable computation, machine payments, agent identity, and the L2 ecosystem.
lang: en
template: use-cases
emoji: ":robot:"
sidebarDepth: 2
showDropdown: false
image: /images/ai-agents/hero-image.png
alt: Developer working with AI agent architecture on Ethereum
summaryPoint1: Deploy autonomous agents with programmable wallets, spending limits, and session keys
summaryPoint2: Verify agent behavior onchain using zero-knowledge machine learning (zkML) and trusted execution environments (TEEs)
summaryPoint3: Enable machine-to-machine payments and agent commerce with stablecoin rails and open payment protocols
buttons:
  - content: Getting started
    href: /ai-agents/getting-started/
  - content: Browse the hub
    toId: ai-agent-builder-hub-sections
    isSecondary: true
---

AI agents are software programs that observe their environment, make decisions, and take actions, including sending transactions, paying for services, and interacting with smart contracts, without requiring human input on every step.

Ethereum provides the infrastructure these agents need: programmable wallets that enforce spending limits, verifiable computation that proves an agent followed its rules, open payment rails for machine-to-machine commerce, and a permissionless identity layer that any application can verify. These are not properties that a centralized server can replicate, because they depend on a network that no single party controls.

This builder hub is the starting point for developers building production AI agents on Ethereum.

<Alert variant="info">
<AlertContent>
<p className="mt-0"><strong>New to AI on Ethereum?</strong></p>
<p className="mt-2">If you want to learn how AI and Ethereum work together as a use case, visit the <a href="/decentralized-ai/">Decentralized AI</a> overview page.</p>
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

See ["Why AI agents on Ethereum"](/ai-agents/ethereum/) to learn more about the technical case for using Ethereum as the settlement and coordination layer for AI agents.

## What the AI agent builder hub covers {#what-the-ai-agent-hub-covers}

Ethereum provides a unique set of technical foundations for deploying production AI agents. 

The AI agent builder hub covers each of these core building blocks in depth:

- **Programmable wallets**: Agents can hold and transfer digital assets directly. A [smart account](/account-abstraction/) functions as the agent's onchain identity and treasury, with spending limits, allowlists, and session keys enforced at the contract level. See [Agent wallets](/ai-agents/wallets/).
- **Verifiable inference**: An agent running offchain is a black box. By anchoring key decisions to onchain proofs via zkML or TEEs, developers can give counterparties a way to confirm that the agent followed its stated logic. See [Verification](/ai-agents/verification/).
- **Machine payments**: Autonomous agents need to pay for compute and data without human intervention. Stablecoins and open protocols like x402 provide a programmable settlement layer for agent commerce. See [Payments](/ai-agents/payments/).
- **Agent identity**: When agents interact with humans or other agents, counterparties need a way to verify what an agent is and what its track record is using onchain registries like ERC-8004. See [Identity](/ai-agents/identity/).

## AI agent infrastructure today {#ecosystem-today}

The standards and protocols that power AI agents on Ethereum have crossed from research into production.

| Standard or protocol | Status |
| :--- | :--- |
| **EIP-7702** — Smart account delegation for existing EOAs | Live since the Pectra upgrade, May 2025 |
| **ERC-4337** — Smart account standard | EntryPoint v0.7 live on mainnet |
| **ERC-8004** — Onchain agent identity registry | Live on 20+ chains since January 2026 |
| **x402** — Machine-to-machine HTTP payments | Production-ready since Q1 2026 |
| **L2 transaction cost** | $0.001–$0.003 per operation |

See [Data and stats](/ai-agents/data/) for onchain metrics tracking the growth of the AI agent ecosystem.

## AI agent builder hub sections {#ai-agent-builder-hub-sections}

### Foundation {#foundation}

- [Why Ethereum](/ai-agents/ethereum/) — The technical case for using Ethereum as the settlement and coordination layer for AI agents.
- [Getting started](/ai-agents/getting-started/) — Fund an agent wallet, pick a framework, and deploy your first autonomous transaction.
- [Use cases](/ai-agents/use-cases/) — What agents are doing on Ethereum today: DeFi automation, data markets, governance participation, and more.

### Core infrastructure {#core-infrastructure}

- [Agent wallets](/ai-agents/wallets/) — Smart accounts, session keys, hardware trust layers, and the patterns for giving an agent safe spending authority.
- [Verification](/ai-agents/verification/) — zkML, TEEs, and onchain attestations: how to prove an agent behaved as claimed.
- [Payments](/ai-agents/payments/) — Machine-to-machine micropayments, streaming payments, and stablecoin rails for autonomous agent commerce.
- [Identity](/ai-agents/identity/) — Agent identity standards (ERC-8004), reputation systems, and proof-of-personhood mechanisms.

### Ecosystem {#ecosystem}

- [Frameworks](/ai-agents/frameworks/) — A directory of agent frameworks with Ethereum support and guidance on when to use each.
- [Layer 2s](/ai-agents/l2s/) — How to choose an L2 for your agent based on cost, throughput, privacy, and ecosystem fit.
- [Data and stats](/ai-agents/data/) — Onchain data tracking the growth of the AI agent ecosystem on Ethereum.
- [FAQ](/ai-agents/faq/) — Answers to the most common technical questions about building AI agents on Ethereum.

<Alert variant="warning">
<AlertContent>
<p className="mt-0"><strong>Maturity note</strong></p>
<p className="mt-2">AI agent infrastructure on Ethereum ranges from production-ready standards (ERC-4337, stablecoin payments) to actively experimental technology (zkML at scale, agent-to-agent commerce). Each sub-page in this hub flags the maturity level of the patterns it covers.</p>
</AlertContent>
</Alert>

