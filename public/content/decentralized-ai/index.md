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
summaryPoint2: AI-assisted wallets and agents that execute onchain transactions on your behalf
summaryPoint3: A foundation for new approaches to proving whether digital media is real or AI-generated
---

Most AI today runs inside **centralized servers owned by a handful of companies**. Users have **no way to verify what the AI is actually doing with their data**, who can change its behavior, or when service might be cut off.

[Ethereum](/) provides **open, permissionless infrastructure** that developers can use to build AI applications. As a **programmable network that no single party operates**, Ethereum provides a foundation for building AI tools that **anyone can verify, that no single entity controls, and that cannot be arbitrarily shut down or altered**.

The Ethereum network offers an open layer for **settlement, coordination, verification, and digital identity**, that AI systems can use without depending on centralized intermediaries.

<Alert variant="info" className="my-8">
<AlertContent>
<p className="mt-0"><strong>Are you a builder?</strong></p>
<p className="mt-2">If you want to deploy AI applications and agents on Ethereum, check out the <a href="/ai-agents/">builder hub for AI infrastructure</a>.</p>
</AlertContent>
</Alert>


## What makes AI on Ethereum different? {#what-makes-ai-on-ethereum-different}

AI applications built on Ethereum **inherit properties that centralized AI platforms cannot offer**. AI systems built on Ethereum can provide features like **verifiable guarantees and auditable records** instead of relying on a single company to manage data and maintain access. 

As a blockchain that can provide structural guarantees, Ethereum allows these AI applications to inherit core properties, like:
- **Censorship-resistance:** No single entity can shut down or modify the AI models and agent infrastructure running on a decentralized network.
- **Open-source:** Publicly auditable code lets users and researchers independently verify what an application does, rather than taking a vendor's word for it.
- **Privacy:** Cryptographic techniques like [zero-knowledge proofs](/zero-knowledge-proofs/) allow applications on Ethereum to process user data without exposing it to third parties. AI implementations can use secure hardware enclaves or zero-knowledge proofs to keep user inputs confidential, even from the infrastructure running the AI. These privacy approaches are not automatic for all Ethereum applications and depend on the specific design choices made by developers.
- **Secure:** Records of agent actions are stored onchain, creating a tamper-resistant audit trail of every authorized transaction.

<VideoWatch slug="dacc-decentralized-ai-devcon" />

## Digital authenticity {#digital-authenticity}

Generative AI can now produce **photorealistic images, video, and voice that are difficult to distinguish from authentic media**. **Proving that a piece of content is genuine is a growing challenge**. 

Ethereum provides tools that **shift the paradigm from "believe what you see" to "verify what you see."** 

Onchain **attestations** are a primary approach to this problem. The [Ethereum Attestation Service (EAS)](https://attest.org/) allows any issuer, whether a media organization, a developer, or an institution, to **publish a signed, tamper-resistant claim** about a piece of content or an AI agent's identity on the Ethereum blockchain. The attestation records are **verifiable by anyone and cannot be altered after-the-fact**.


<Alert variant="info" className="my-8">
<AlertContent>
<p className="mt-0"><strong>Early blockchain media authenticity proofs</strong></p>
<p className="mt-2">Using blockchain-based attestations as a verification layer to combat deepfakes is not a new concept. In 2019, the News Provenance Project, a collaboration between the BBC, The New York Times, and The Wall Street Journal, explored the use of blockchain technology to verify the authenticity of photos and more shared on social media platforms. Their [proof of concept](https://www.newsprovenanceproject.com/proof-of-concept) demonstrated how blockchain technology could be used to track the origin and modification history of digital media as it's shared across the web. 
Today, anyone can build such verification systems using Ethereum's globally-verifiable, open-source tooling.</p>
</AlertContent>
</Alert> 

Researchers are already applying these cryptographic tools to verify real-world media on Ethereum: 
- **[Roc Camera](https://roc.camera/)** lets users capture photos that are cryptographically signed at the moment of capture. It then registers these cryptographic proofs onchain using the Ethereum Attestation Service (EAS) on Base (an Ethereum [Layer 2](/layer-2/) network), producing a verifiable record that the image is authentic and unaltered. 
- The **[ZK Microphone](https://ethglobal.com/showcase/zk-microphone-8161v)** project, developed at the ETHGlobal Paris hackathon, applies the same principle to audio. A hardware secure enclave signs a recording at capture. When the audio is legitimately edited, the software generates a zero-knowledge proof proving the edit was mathematically derived from the original hardware-signed file. This proof is then published to Ethereum via an onchain attestation, allowing anyone to verify the audio's provenance without exposing the underlying recording.  

## Intent-based wallets using AI {#ai-intent-based-ai-wallets}

Most [wallets](/wallets/) on Ethereum require users to understand technical transaction details before interacting with them (efforts like the [Clear Signing Initiative](https://clearsigning.org/) aim to solve this across the wallet landscape). 

AI-assisted wallets have the potential to support **an easier transaction experience by letting users describe what they want in plain language**, then handling the technical steps automatically.

<Alert variant="warning" className="my-8">
<AlertContent>
<p className="mt-0"><strong>Before using AI wallet tools</strong></p>
<p className="mt-2">AI-powered wallet interfaces are still maturing technology. Risks include smart contract vulnerabilities in the session key infrastructure, agent errors from model hallucinations, and phishing sites impersonating legitimate wallet assistants. Only use audited applications, review the permissions granted to any agent, and verify all transactions before signing.</p>
</AlertContent>
</Alert>

Intent-centric wallet designs position the wallet **not as a passive key store, but as an assistant that acts on a user's behalf**. Instead of manually signing every transaction, a user can tell their AI wallet assistant to **rebalance a portfolio or execute a swap**. The AI converts the request into a transaction sequence and **executes it automatically**. 

Crucially, **the user's main private key should never be exposed to the AI**. Using Ethereum's [account abstraction](/account-abstraction/) frameworks, the user stays in control by issuing **highly restricted session keys**. The keys act as **temporary permissions for the AI to execute transactions with strict guardrails**, like spending limits, approved applications, and time boundaries. 

The AI can only act within those predefined rules, and **once the task is done, the permissions expire**. These boundaries make it possible to **delegate complex onchain tasks to software without putting the entire wallet at risk**.

### Chat-based AI wallet control {#chat-based-wallet-control}

Some applications let users manage their crypto directly through a chat interface, using plain text instead of transaction forms. For example, instead of navigating complex decentralized exchange interfaces, a user can simply type, "Swap 100 USDC for ETH."

Behind the scenes, the AI assistant **translates this natural language request into the technical steps required**, calculates the optimal routing, and presents the final transaction for the user to review. AI-enabled wallets can also **simulate the transaction before it is executed**, translating complex smart contract bytecode into **human-readable warnings** if the interaction appears suspicious or interacts with known phishing infrastructure.

## Automated decentralized finance (DeFi) {#automated-decentralized-finance-defi}

Managing crypto assets manually across multiple protocols is **time-consuming and technically complex**. AI applications built on Ethereum can **handle these tasks continuously**, and can also be built to use **transparent onchain data that is available to everyone equally**.

<CardGrid>
  <Card title="Market analysis and execution" description="AI agents can monitor real-time market conditions and execute trading strategies, operating continuously without manual input." />
  <Card title="Risk management" description="AI agents can analyze transactional patterns offchain to detect anomalous activity and known threat signatures, then surface alerts or enforce protective rules through onchain guardrails." />
  <Card title="Portfolio optimization" description="AI agents can evaluate liquidity conditions, yield rates, and gas costs across apps and networks in real time, identifying opportunities that would be time-consuming to track manually." />
</CardGrid>

Ecosystems like [Olas](https://olas.network/) illustrate what this looks like in practice. Olas uses a suite of smart contracts on Ethereum and its Layer 2s to **coordinate an open network where developers contribute autonomous agent modules** for portfolio management, liquidity tracking, and governance participation. By early 2026, [agents on the Olas network were processing over five million transactions](https://olas.network/timeline) across these integrated chains. 

Another example is [Wayfinder](https://wayfinder.ai), a multi-agent system that **routes proposed actions through a simulation environment before committing them** to Ethereum or L2 networks. This allows the system to **verify outcomes and catch errors before executing the actual DeFi transactions onchain**.

Explore autonomous agents and AI assistants built on Ethereum:
<AiAgentProductLists list="chat" />

<Alert variant="info" className="my-8">
<AlertContent>
<p className="mt-0"><strong>Good to know</strong></p>
<p className="mt-2">Artificial intelligence agents and related execution tools are still in early development. The applications listed above vary in maturity and audit status. Always verify the source and permissions of any tool before connecting your wallet.</p>
</AlertContent>
</Alert>

## Verifiable AI computation {#verifiable-ai-computation}

Knowing that a piece of media is authentic is only part of the challenge. As AI tools are increasingly able to execute multi-step tasks on behalf of users, users also need a way to **prove that an AI model actually behaved as claimed**.

**Zero-knowledge machine learning (zkML)** lets developers prove that a specific AI model produced a specific output from a specific input, without revealing the model's internal data or the user's private information. This proof is recorded onchain so anyone can verify it. 

**One important limitation:** zkML confirms that the **computation ran correctly, not that the result is factually accurate**. An AI model can still produce a wrong answer. zkML only guarantees that it followed its own logic consistently.

Projects are actively building the infrastructure to make this verification possible at scale:
- At the infrastructure level, **[Lagrange's DeepProve](https://lagrange.dev/blog/deepprove-zkml)** library provides zkML tooling capable of verifying machine learning computations at scale. 
- **[Modulus Labs](https://world.org/blog/announcements/tools-for-humanity-acquires-modulus-labs)** generated a complete [zero-knowledge proof of a 1.5 billion parameter language model](https://medium.com/@CountableMagic/chapter-14-the-worlds-1st-on-chain-llm-7e389189f85e) verified onchain on Ethereum, demonstrating that large-model verification is technically achievable.
- In production, **[Worldcoin (World ID)](https://world.org/)** uses zero-knowledge machine learning to allow users to verify their biometric data locally on their device. This proves their unique human identity without exposing the underlying biometric data to the network or protocol.

Beyond cryptographic verification, the Ethereum ecosystem also supports **decentralized platforms focused on private AI inference**. For example, **[Venice AI](https://venice.ai/)** is a generative AI assistant that uses an Ethereum Layer 2 network for access control and settlement. By **routing encrypted prompts to a distributed network of independent GPU providers**, it offers a **censorship-resistant alternative to centralized AI platforms** and utilizes a **local-first approach** to keep user data private.

<VideoWatch slug="human-aligned-ai-ethereum" />

## Standardizing the agent economy {#standardizing-the-agent-economy}

Because Ethereum provides a secure, programmable foundation, developers can build **shared standards that allow AI systems to interact safely**. These standards are the **building blocks of a new machine-to-machine economy**. For example, standards for agent identity ([ERC-8004](https://eips.ethereum.org/EIPS/eip-8004)) let applications **verify an AI assistant's reputation and permissions**, ensuring it only takes actions you have explicitly authorized. Paired with machine-to-machine payment protocols ([x402](https://www.x402.org/)), agents can **automatically pay each other for data or services**. 

For everyday users, applications built on these Ethereum standards unlock new models like **seamless micropayments**; for example, paying a **fraction of a cent to read a single article** on a news site instead of needing a monthly subscription.

To learn how to build AI applications on these standards, visit the [builder hub for AI agents](/ai-agents/).

## Further reading {#further-reading}

### Verifiable AI and attestations {#further-reading-verifiable-ai}

- [The promise and challenges of crypto + AI applications](https://vitalik.eth.limo/general/2024/01/30/cryptoai.html) — Vitalik Buterin
- [Zero-knowledge proofs](https://ethereum.org/en/zero-knowledge-proofs/) — ethereum.org
- [Ethereum Attestation Service (EAS) Documentation](https://docs.attest.org/docs/welcome)
- [An introduction to zero-knowledge machine learning (zkML)](https://world.org/blog/engineering/intro-to-zkml) — Worldcoin Engineering

### Autonomous agents and DeFi {#further-reading-ai-agents}

- [Account Abstraction (ERC-4337)](https://ethereum.org/en/roadmap/account-abstraction/) — ethereum.org
- [ERC-8004: Trustless agent identity standard](https://eips.ethereum.org/EIPS/eip-8004) — Ethereum Improvement Proposals
- [x402: Machine-to-machine payment protocol](https://docs.x402.org/) 

### Confidential compute and AI inference {#further-reading-infrastructure}

- [TEEs Secured by Ethereum](https://phala.com/posts/TEEs-Secured-by-Ethereum) — Phala
- [A Beginner's Guide to Fully Homomorphic Encryption](https://fhe.org/) — FHE.org
- [Confidential Computing Consortium: Technical Overview](https://confidentialcomputing.io/about/) — The Linux Foundation
