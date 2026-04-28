---
title: "Agent reputation, delegation, and the return of DAOs"
description: "Francesco Andreoli and James Young explore ERC-8004 agent identity, EIP-7710 onchain delegation, and how permission frameworks and reputation systems are reshaping agent infrastructure and DAO governance at ETHBoulder."
lang: en
youtubeId: "3lGkTCYKuV0"
uploadDate: 2026-02-16
duration: "0:31:52"
educationLevel: intermediate
topic:
  - "ai"
  - "agents"
  - "identity"
  - "governance"
format: panel
author: EthBoulder
breadcrumb: "Agent reputation and delegation"
---

**Francesco Andreoli** and **James Young** (Collab.Land) present at ETHBoulder on the intersection of AI agents, onchain permissions, and the future of DAO governance. The session covers ERC-8004 agent identity, EIP-7710 delegation, and how smart contract-level permissions can secure agent operations while enabling new forms of decentralized coordination.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=3lGkTCYKuV0) published by EthBoulder. It has been lightly edited for readability.*

#### Where we are in the agentic economy (0:12) {#agentic-economy-status}

We are in the very early stages — roughly the 2.5% innovator phase. The agentic economy has progressed from speculation to practical testing, but the infrastructure is not yet fully ready. Wallets are one of the strongest use cases because today's wallet interfaces — browser extensions, mobile apps — were designed for humans, not for agents that interact through APIs and endpoints. Agents need different infrastructure.

#### ERC-8004 and agent identity (3:30) {#erc-8004-agent-identity}

ERC-8004 is one of the primary standards attempting to build a social reputation layer for agents. Without identity standards, there is no way to attest to an agent's track record. During the early Eliza agent wave, around 250 Eliza forks launched doing similar things. On the consumer side, this was dangerous because there was no way to verify which agents had a legitimate track record. ERC-8004 provides the registry infrastructure for agents to register capabilities and accumulate reputation signals.

#### Discovery, trust, commerce, and payments (6:00) {#discovery-trust-commerce}

The agentic economy is progressing through phases: discovery, trust, commerce, and payments. We are primarily in the discovery and trust phase. Trust requires building social reputation and profiling agents with standardized frameworks. x402 provides standardized payment infrastructure for the commerce phase — enabling agents to transact with each other using established protocols rather than custom integrations.

#### EIP-7710 and the Delegator toolkit (10:30) {#eip-7710-delegator}

EIP-7710 operates at the smart contract level, enabling onchain delegation and permission management. The Delegator framework includes three components: delegation itself, a caveat enforcer (think of it as a safe for permissions — defining what an agent can and cannot do), and a delegation manager that orchestrates the permission flow. Crucially, these permissions are enforced at the smart contract level, not in a prompt or an MD file that can be overwritten through prompt injection.

#### Permission use cases (15:00) {#permission-use-cases}

Practical examples include the EA Red Balloon experiment at ECC, where participants could delegate ownership to find a red balloon to another user address, with rewards distributed automatically at the smart contract level. All caveats were defined onchain. Other use cases include crowdfunded cooking classes (Propel at Devcon), agent-sponsored gas payments, account recovery, trust automation, and subscription streams — all enforced through onchain permissions rather than application-layer trust.

#### Collab.Land and agent governance (19:00) {#collabland-agent-governance}

James Young from Collab.Land discusses how the smart account kit and EIP-7710 permissions apply to DAO governance. Agents can participate in governance processes — reading proposals, evaluating alignment, casting votes — but the permission framework ensures they operate within boundaries set by token holders. The combination of agent identity (ERC-8004) and delegation (EIP-7710) creates a foundation where agents can act as delegates with verifiable authority and revocable permissions.

#### The private key problem (23:00) {#private-key-problem}

The biggest risk in the current agent ecosystem is prompt-engineered private key extraction. People are backing up agent configurations to GitHub repositories, and attackers can prompt-engineer agents to read the repository and extract the private key. Onchain permissions solve this: even if an agent is compromised, the smart contract enforces what it can and cannot do. The delegation framework makes these constraints cryptographic rather than trust-based.

#### Recap and next steps (28:00) {#recap-next-steps}

The session concludes with a recap: the agentic economy is early but progressing rapidly. ERC-8004 provides the identity and reputation layer. EIP-7710 and the Delegator toolkit provide onchain permission enforcement. Together, they enable agents to operate with verifiable authority and revocable permissions — a prerequisite for scaling agent-to-agent commerce and DAO governance safely.
