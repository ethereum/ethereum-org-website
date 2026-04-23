---
title: Ethereum for AI agents
description: How Ethereum's core properties enable AI agent infrastructure, from onchain ownership and verifiable execution to programmable guardrails and machine payments
lang: en
---
# Ethereum for AI agents {#ethereum-for-ai-agents}

AI agents operate across many platforms and networks. This page covers what builders need to understand about building on [Ethereum](/): the specific **technical capabilities** the network provides for autonomous agents, and the **architectural tradeoffs** to weigh before committing to that stack.

**Not every agent deployment belongs on a blockchain like Ethereum.** Agents that are purely read-only, that operate entirely offchain, or that can accept a trusted operator model **may not require the overhead of onchain settlement**. 

However, when an agent requires **trustless coordination**, the capabilities below allow agents to **control non-custodial assets, verify their own execution, and interoperate permissionlessly** with open protocols. The capabilities that Ethereum's agent standards provide **replace the need for a trusted operator with code that counterparties can independently verify**.

## Onchain ownership {#onchain-ownership}

An [AI agent's wallet](/ai-agents/wallets/) and its digital assets exist independently on Ethereum. **No unauthorized third party, operator, platform, or cloud provider can unilaterally revoke or freeze them**, because **ownership is enforced by the network itself** rather than by a company's terms of service. 

The wallet's controller (whoever holds the keys or owns the smart contract account) retains full authority over those assets. Constraining what the agent itself can spend is a separate concern (covered in the [Programmable guardrails](#programmable-guardrails) section below).

Assets an agent earns, receives as payment, or accumulates during operation are **governed by smart contract code that both the agent's developer and its counterparties can read and verify**. Rules about what the agent can spend and where are **not a policy document on Ethereum; they are executable code** deployed to a network that no single entity operates.

Network-enforced ownership is consequential for [agent deployments](/ai-agents/use-cases/). An autonomous agent integrated into a centralized platform is **only as stable as that platform's continued support and goodwill**. An agent whose treasury and rules live onchain **retains those properties regardless of the agent operator's status**.

## Verifiable execution {#verifiable-execution}

An AI agent running offchain is, **by default, opaque**. Users and counterparties have **no way to confirm that the model producing the agent's outputs is the model it claims to be, or that it ran without tampering**.

Today, two primary technical paths make agent behavior verifiable on Ethereum.

### Zero-knowledge machine learning (zkML) {#zkml}

Developers can generate a **cryptographic proof demonstrating that a specific model produced a specific output from a specific input**. This proof can be **verified onchain by a smart contract before the contract acts on the agent's output**. 

ZkML proves **correct computation, not factual accuracy**. While a model can still produce a wrong answer, zkML provides a **tamper-resistant record that the model executed its logic consistently**. 

Production-ready zkML tooling exists today for bounded models (decision trees, compact classifiers, fraud detectors). Generating and verifying proofs for large language models remains computationally prohibitive for most production deployments and is an active area of research. The [AI agents: Verification](/ai-agents/verification/) page covers available tools, maturity levels, and implementation guidance.

### Trusted Execution Environments (TEEs) {#tees}

A TEE **partitions a processor into a secure, isolated region that the host operating system and cloud provider cannot access**. Agent private keys and signing operations run inside this enclave. 

The hardware generates a **cryptographic attestation proving that a specific, unmodified piece of code** (the agent's logic and its policy enforcer) is actively running in the enclave. This attestation can be **published onchain as a verifiable claim about the agent's integrity**. 

Technologies include AWS Nitro Enclaves, Intel TDX, and AMD SEV, integrated via platforms such as [Phala Network](https://phala.network/) and [Turnkey](https://turnkey.com/). 

**Trust assumption:** TEE security depends on the manufacturing integrity and signing infrastructure of the hardware vendor. Published vulnerabilities in SGX, including [Foreshadow](https://foreshadowattack.eu/) and [Plundervolt](https://plundervolt.com/), have demonstrated that hardware-level flaws can break isolation guarantees. Builders choosing TEEs are trusting the hardware supply chain as well as the software running inside the enclave.

### Implementation {#implementation}

Smart contracts can verify both types of proofs (zkML and TEEs) **before releasing funds or executing other consequential actions**, creating a **chain of verifiable behavior from model inference to onchain settlement**.

See [AI Agents: Verification](/ai-agents/verification/) for implementation details on both approaches.

## Programmable guardrails {#programmable-guardrails}

A fundamental risk in deploying autonomous agents is that they hold signing authority over funds. **Giving an agent an unconstrained private key is equivalent to giving it unlimited spending authority**; a **hallucination, a prompt injection, or a logic error** can drain an account.

Ethereum's [account abstraction](/roadmap/account-abstraction/) standards—primarily [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337) and [EIP-7702](/roadmap/pectra/7702/) (live on Ethereum Mainnet since the Pectra upgrade, May 2025)—allow developers to replace raw private key control with programmable smart contract wallets, which enforce spending limits, allowlists, and session keys at the contract level. 

**Session keys** are the primary mechanism for delegating scoped authority under either standard. 

Rather than sharing a master private key with an agent, a developer or user generates a restricted session key that embeds the agent's operational policy, including:
- A maximum spend per transaction and per time window
- An allowlist of contracts the agent may interact with
- A validity window after which the session key automatically expires

Major smart wallet SDKs including ZeroDev (Kernel) and Safe (Allowance Module) have built production-grade session key infrastructure for autonomous agent deployments.

For SDK-level implementation guidance and a detailed technical breakdown of these standards for programmable guardrails, see the [AI agent wallets](/ai-agents/wallets/) page.

## Agent identity and reputation {#agent-identity}

When an agent interacts with a user or with another agent, the counterparty needs a way to **verify what the agent is and what authority it holds**. Centralized identity registries address this by **requiring trust in the registry operator**. Onchain identity standards address it by making registrations **publicly verifiable and censorship-resistant**.

**[The Trustless Agents Standard, ERC-8004](https://eips.ethereum.org/EIPS/eip-8004)** is live on Ethereum Mainnet and 20+ chains since January 29, 2026. It introduces a portable, onchain agent identifier that can be deployed across multiple networks. It provides three registries: an identity registry for agent discovery (`0x8004A169FB4a3325136EB29fA0ceB6D2e539a432`), a reputation registry for onchain feedback signals (`0x8004BAa17C55a88189AE136b182e5fdA19dE9b63`), and a validation registry for requesting cryptographic verification of agent outputs via zkML verifiers or TEE oracles. Applications can look up an agent's declared capabilities before interacting with it; the validation registry provides the hooks for requesting cryptographic proof that specific outputs meet defined standards.

Paired with **onchain reputation systems and agent attestation mechanisms**, agent identity standards on Ethereum form the **trust layer that allows agents to participate in more complex multi-agent workflows**.

See [AI Agents: Identity](/ai-agents/identity/) for a full treatment.

## Open composability {#open-composability}

Because Ethereum's protocol layer is permissionless, **an agent can interact with any deployed smart contract**, including decentralized exchanges, lending protocols, prediction markets, data markets, and governance contracts, **without requesting access from the protocol operator**.

Permissionless access to any deployed smart contract means an agent can execute a **complex workflow in a single atomic transaction**: approve a token transfer, execute a swap on a decentralized exchange, deposit the output to a yield protocol, and record the result to an attestation registry. **If any step fails, the entire transaction reverts**. This atomicity property is **not available through standard application programming interfaces (APIs) between centralized services**.

Composability also means that **agent logic can build on existing audited infrastructure rather than re-implementing it**. **Security properties inherited from established Ethereum protocols carry over to the agent's operations**.

## Scalable payments {#scalable-payments}

Autonomous agents need to pay for compute resources, data feeds, and other agent services without human intervention. Standard financial rails require corporate entities and bank accounts&mdash;barriers that autonomous code cannot cross. 

Ethereum provides a native, permissionless financial rail for machines. Agents can hold and spend stablecoins natively. Emerging standards like the **[x402 protocol](https://www.x402.org/)** for machine-to-machine payments build on Ethereum's native stablecoin infrastructure by providing a machine-readable flow: an agent requests a resource, receives an HTTP 402 invoice, and instantly signs a micropayment using EIP-3009 (which USDC implements natively) to gain access. x402 tooling is currently most mature on Base; builders deploying on other L2s should verify support before committing to x402 as their payment architecture.

Ethereum Layer 2 networks make these machine payments **economically viable**. **L2 transaction fees of $0.001–$0.003 per operation** are low enough to support **high-frequency, sub-cent agent-to-agent payments at scale**, with settlement backed by [Ethereum's security model](/what-is-the-ethereum-network/#staking).

Low-friction machine micropayments, combined with onchain agent identity, enable **self-sustaining agent architectures on Ethereum**. Agents can **independently acquire compute, pay for data, and monetize their own outputs**.

See [AI agents: Payments](/ai-agents/payments/) and [AI agents: Layer 2s](/ai-agents/l2s/) for a detailed technical breakdown of machine payment protocols and implementation guidance.

## The L2 ecosystem {#the-l2-ecosystem}

Ethereum Mainnet provides the **canonical security and settlement layer**. Ethereum Layer 2 networks extend this by offering **specialized execution environments, with performance and cost profiles tailored to different agent workflows**, like:
- **High-frequency agents**, like those executing many small DeFi operations, benefit from L2s with low per-transaction fees and high throughput.
- **Privacy-sensitive agents**, like those handling user data or confidential model inputs, may prefer L2s with built-in confidential compute options.
- **Cross-chain agents**, like those coordinating across multiple protocols, can use L2 bridging infrastructure and cross-chain messaging.

Because all Ethereum L2s ultimately settle to Mainnet, an agent's **onchain assets and identity remain anchored to Ethereum's security guarantees**,  regardless of which L2 it operates on.

See [Layer 2s](/ai-agents/l2s/) for a breakdown of L2 characteristics relevant to agent deployments.

## Further reading {#further-reading}

- [The promise and challenges of crypto + AI applications](https://vitalik.eth.limo/general/2024/01/30/cryptoai.html) — Vitalik Buterin
- [Autonomous agents on blockchains: standards, execution models, and trust boundaries](https://arxiv.org/abs/2601.04583) — arXiv
- [5 Ways Blockchains Help AI Agents](https://a16zcrypto.com/posts/article/5-ways-blockchains-help-ai-agents/) — a16z
- [Account abstraction (ERC-4337)](https://ethereum.org/en/roadmap/account-abstraction/) — ethereum.org
- [EIP-7702: Smart account delegation for existing wallets](https://ethereum.org/en/roadmap/pectra/7702/) — ethereum.org
- [ERC-8004: Trustless agent identity standard](https://eips.ethereum.org/EIPS/eip-8004) — Ethereum Improvement Proposals
- [x402: Machine-to-machine payment protocol](https://docs.x402.org/)

## Continue exploring the AI agents builder hub {#continue-exploring}

### Foundation {#foundation}

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