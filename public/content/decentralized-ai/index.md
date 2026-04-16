---
title: Decentralized AI
description: How Ethereum provides the trust and settlement layer for scalable, verifiable artificial intelligence
lang: en
template: use-cases
emoji: ":robot:"
sidebarDepth: 2
image: /images/ai-agents/hero-image.png
alt: Decentralized AI on Ethereum
summaryPoint1: Verifiable AI using zero-knowledge cryptography and onchain attestations
summaryPoint2: Autonomous AI agents that hold funds and execute onchain transactions
summaryPoint3: Censorship-resistant, open-source, private, and secure AI infrastructure
---

<Alert variant="info">
<AlertContent>
<p className="mt-0"><strong>Are you a developer?</strong></p>
<p className="mt-2">If you want to build artificial intelligence and AI agents on Ethereum, view the <a href="/ai-agents/">builder hub for AI infrastructure</a>.</p>
</AlertContent>
</Alert>

Most AI today runs inside centralized servers owned by a handful of companies. Users have no way to verify what the AI is actually doing with their data, who can change its behavior, or when service might be cut off.

[Ethereum](/) provides open, permissionless infrastructure that AI applications can use as a foundation. A programmable network that no single party operates makes it possible to build AI tools that anyone can verify, that no single company controls, and that cannot be arbitrarily shut down or altered. Ethereum's transparent foundation unlocks open infrastructure for settlement, coordination, and onchain identity, that AI systems can use without depending on centralized intermediaries.

## What makes AI on Ethereum different? {#what-makes-ai-on-ethereum-different}

AI applications built on Ethereum inherit properties that centralized AI platforms cannot offer:

- **Censorship-resistant:** No single company or government can shut down or modify the AI models and agent infrastructure running on a decentralized network.
- **Open-source:** Publicly auditable code lets users and researchers independently verify what an application does, rather than taking a vendor's word for it.
- **Private:** Cyptographic techniques like [zero-knowledge proofs](/zero-knowledge-proofs/) allow applications on Ethereum to process user data without exposing it to third parties. AI implementations can use secure hardware enclaves or zero-knowledge proofs to keep user inputs confidential, even from the infrastructure running the AI. These privacy approaches are not automatic for all Ethereum applications and depend on the specific design choices made by developers.
- **Secure:** Records of agent actions are stored onchain, creating a tamper-resistant audit trail of every authorized transaction.

## Verifiable AI and digital authenticity {#verifiable-ai-and-digital-authenticity}

Generative AI can now produce photorealistic images, video, and voice that are difficult to distinguish from authentic media. Proving that a piece of content is genuine, or that an AI model behaved as claimed, is a growing challenge. 

Ethereum provides two tools that shift "believe what you see" to "verify what you see": zero-knowledge proofs and onchain attestations.

**Zero-knowledge machine learning (zkML)** lets developers prove that a specific AI model produced a specific output from a specific input, without revealing the model's internal data or the user's private information. This proof is recorded onchain so anyone can verify it. 

One important limitation: zkML confirms that the computation ran correctly, not that the result is factually accurate. An AI model can still produce a wrong answer; zkML only guarantees that it followed its own logic consistently.

Onchain **attestations** are a complementary approach. The Ethereum Attestation Service (EAS) allows any issuer, whether a media organization, a developer, or an institution, to publish a signed, tamper-resistant claim about a piece of content or an AI agent's identity. These records are verifiable by anyone and cannot be altered after the fact.

Researchers have applied these tools to real problems: 
- **[Roc Camera](https://roc.camera/)** lets users capture photos that are cryptographically signed at the moment of capture, producing a verifiable record that the image is authentic and unaltered. 
- The **[ZK Microphone](https://ethglobal.com/showcase/zk-microphone-8161v)** project, developed at ETHGlobal Paris, applies the same principle to audio: a hardware secure enclave signs a recording at capture, and a zero-knowledge proof then verifies that any edited version is mathematically derived from the original—proving authenticity while allowing legitimate edits.  
- At the infrastructure level, **[Lagrange's DeepProve](https://lagrange.dev/blog/deepprove-zkml)** library provides zkML tooling capable of verifying machine learning computations at scale. 
- **[Modulus Labs](https://modulus.xyz)** [generated a complete zero-knowledge proof of a 1.5 billion parameter language model](https://medium.com/@CountableMagic/chapter-14-the-worlds-1st-on-chain-llm-7e389189f85e) verified onchain on Ethereum, demonstrating that large-model verification is technically achievable.

## Automated decentralized finance (DeFi) {#automated-decentralized-finance-defi}

Managing crypto assets manually across multiple protocols is time-consuming and technically complex. AI applications built on Ethereum can handle these tasks continuously, using transparent onchain data that is available to everyone equally.

Ecosystems that illustrate what this looks like in practice include: 
- **[Olas (Autonolas)](https://olas.network/)** is an open network where developers contribute autonomous agent modules that handle tasks like portfolio management, liquidity tracking, and governance participation. By early 2026, [agents on the Olas network were processing over five million transactions](https://olas.network/timeline) across integrated chains. 
- **[Wayfinder](https://reports.tiger-research.com/p/wayfinder-eng)** is a multi-agent system that routes proposed actions through a simulation environment before committing them to the blockchain, allowing the system to verify outcomes and catch errors before funds move.

<CardGrid>
  <Card title="Market analysis and execution" description="AI agents monitor real-time market conditions and execute trading strategies across multiple protocols, operating continuously without manual input." />
  <Card title="Risk management" description="AI systems analyze transactional patterns offchain to detect anomalous activity and known threat signatures, then surface alerts or enforce protective rules through onchain guardrails." />
  <Card title="Portfolio optimization" description="AI agents evaluate liquidity conditions, yield rates, and gas costs across protocols in real time, identifying opportunities that would be impractical to track manually." />
</CardGrid>

## Intent-based smart wallets {#intent-based-smart-wallets}

Most crypto wallets on Ethereum require users to understand technical transaction details before interacting with them (efforts like the [Clear Signing Initiative](https://clearsigning.org/) aim to solve this across the wallet landscape) AI-assisted wallets have the potential to change this by letting users describe what they want in plain language, and handling the technical steps automatically.

Intent-centric wallet designs position the wallet not as a passive key store, but as an assistant that acts on a user's behalf.

A user can tell their AI wallet assistant to rebalance a portfolio or execute a swap (this is possible using account abstraction frameworks like ERC-4337 and EIP-7702, introduced in the May 2025 Pectra upgrade). The AI assistant converts that request into a transaction sequence and executes it. The user stays in control by setting guardrails in advance: spending limits, approved applications, and time boundaries. The AI can only act within those boundaries. Once the task is done, or the time limit expires, those permissions are automatically revoked.

In this model, the user's main private key is never exposed to the AI. This design makes it possible to delegate specific onchain tasks to software without putting the entire wallet at risk.

<Alert variant="warning">
<AlertContent>
<p className="mt-0"><strong>Before using AI wallet tools</strong></p>
<p className="mt-2">AI-powered wallet interfaces are still maturing technology. Risks include smart contract vulnerabilities in the session key infrastructure, agent errors from model hallucinations, and phishing sites impersonating legitimate wallet assistants. Only use audited applications, review the permissions granted to any agent, and verify all transactions before signing.</p>
</AlertContent>
</Alert>

### Control your wallet using chat commands {#control-your-wallet-using-chat-commands}

Some applications let users manage their crypto directly through a chat interface, using plain text instead of transaction forms.

<AiAgentProductLists list="chat" />

<Alert variant="info">
<AlertContent>
<p className="mt-0"><strong>Good to know</strong></p>
<p className="mt-2">Artificial intelligence agents and related execution tools are still in early development. The applications listed above vary in maturity and audit status. Always verify the source and permissions of any tool before connecting a wallet.</p>
</AlertContent>
</Alert>

## Further reading {#further-reading}

### Verifiable AI and attestations {#further-reading-verifiable-ai}

- [Ethereum Attestation Service (EAS)](https://attest.org/)
- [Roc Camera: Verifiable photo authenticity](https://roc.camera/)
- [ZK Microphone: Verifiable audio from hardware signing](https://ethglobal.com/showcase/zk-microphone-8161v) — ETHGlobal
- [Lagrange DeepProve: zkML at scale](https://lagrange.dev/blog/deepprove-zkml) — Lagrange Labs
- [An introduction to zero-knowledge machine learning (zkML)](https://world.org/blog/engineering/intro-to-zkml) — Worldcoin Engineering

### Autonomous agents and DeFi {#further-reading-ai-agents}

- [Olas (Autonolas): Open network for autonomous agents](https://olas.network/)
- [ERC-8004: Trustless agent identity standard](https://eips.ethereum.org/EIPS/eip-8004) — Ethereum Improvement Proposals
- [x402: Machine-to-machine payment protocol](https://docs.x402.org/)

### Confidential compute and AI inference {#further-reading-infrastructure}

- [Phala Network: Confidential compute for AI](https://phala.com/)
- [Ritual: Bringing AI inference onchain](https://ritual.net/)
- [TEEs Secured by Ethereum](https://phala.com/posts/TEEs-Secured-by-Ethereum) — Phala

