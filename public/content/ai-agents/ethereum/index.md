---
title: Why Ethereum for AI agents
description: "Why Ethereum is used as the settlement and coordination layer for AI agents: onchain ownership, verifiable execution, programmable guardrails, and permissionless payments"
lang: en
template: ai-agents
sidebarDepth: 2
image: /images/ai-agents/hero-image.png
alt: Why Ethereum for AI agents
summaryPoints:
  - "Mature smart accounts and onchain agent identity"
  - "Programmable guardrails and session keys for bounded autonomy"
  - "Permissionless access to DeFi, payments, and identity"
---

AI agents operate across many platforms and networks. This page covers what builders need to understand about building on [Ethereum](/): the specific **technical capabilities** the network provides for autonomous agents, and the **architectural tradeoffs** to weigh before committing to that stack.

**Not every agent deployment belongs on a blockchain like Ethereum.** Agents that are purely read-only, that operate entirely offchain, or that can accept a trusted operator model **may not require the overhead of onchain settlement**.

However, when an agent requires **trustless coordination**, the capabilities below allow agents to **control non-custodial assets, verify their own execution, and interoperate permissionlessly** with open protocols. The capabilities that Ethereum's agent standards provide **replace the need for a trusted operator with code that counterparties can independently verify**.

## Onchain ownership {#onchain-ownership}

An [AI agent's wallet](/ai-agents/wallets/) and its digital assets exist independently on Ethereum. **No unauthorized third party, operator, platform, or cloud provider can unilaterally revoke or freeze them**, because **ownership is enforced by the network itself** rather than by a company's terms of service.

The wallet's controller (whoever holds the keys or owns the smart contract account) retains full authority over those assets. Constraining what the agent itself can spend is a separate concern (covered in the [Programmable guardrails](#programmable-guardrails) section below).

Assets an agent earns, receives as payment, or accumulates during operation are **governed by smart contract code that both the agent's developer and its counterparties can read and verify**. Rules about what the agent can spend and where are **not a policy document on Ethereum; they are executable code** deployed to a network that no single entity operates.

Network-enforced ownership is consequential for [agent deployments](/ai-agents/use-cases/). An autonomous agent integrated into a centralized platform is **only as stable as that platform's continued support and goodwill**. An agent whose treasury and rules live onchain **retains those properties regardless of the agent operator's status**.

## Verifiable execution {#verifiable-execution}

An AI agent running offchain is, **by default, opaque**. Users and counterparties have **no way to confirm that the model producing the agent's outputs is the model it claims to be, or that it ran without tampering**. When an agent takes a consequential action, the only evidence it provides is its own assertion.

Ethereum provides two technical paths for making agent behavior verifiable. **Zero-knowledge machine learning (zkML)** generates a cryptographic proof that a specific model produced a specific output, which a smart contract can verify onchain before acting on the result. **Trusted Execution Environments (TEEs)** run agent logic inside hardware-isolated enclaves and produce attestations that the code executed without tampering. Both approaches allow smart contracts to **verify evidence of correct behavior before releasing funds or executing other consequential actions**.

Each path carries different tradeoffs in latency, trust assumptions, and model size constraints. See [AI agents: Verification](/ai-agents/verification/) for tool comparisons, maturity guidance, and implementation details.

## Programmable guardrails {#programmable-guardrails}

A fundamental risk in deploying autonomous agents is that they hold signing authority over funds. **Giving an agent an unconstrained private key is equivalent to giving it unlimited spending authority**; a **hallucination, a prompt injection, or a logic error** can drain an account.

Ethereum's [account abstraction](/roadmap/account-abstraction/) standards (primarily [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337) and [EIP-7702](/roadmap/pectra/7702/), live on Ethereum Mainnet since the Pectra upgrade, May 2025) allow developers to **replace raw private key control with programmable smart contract wallets**. These wallets enforce spending limits, contract allowlists, and time-bounded **session keys** at the contract level, so a compromised credential cannot drain the account beyond its scoped policy.

For a full comparison of ERC-4337 vs. EIP-7702, session key policy design, SDK implementation examples, and production key management patterns, see the [AI agents: Wallets](/ai-agents/wallets/) page.

## Agent identity and reputation {#agent-identity}

When an agent interacts with a user or with another agent, the counterparty needs a way to **verify what the agent is and what authority it holds**. Centralized identity registries address this by **requiring trust in the registry operator**. Onchain identity standards address it by making registrations **publicly verifiable and censorship-resistant**.

**[The Trustless Agents Standard, ERC-8004](https://eips.ethereum.org/EIPS/eip-8004)** is live on Ethereum Mainnet and 20+ chains since January 29, 2026. It provides **onchain registries for agent discovery, reputation tracking, and output validation**, forming the trust layer that allows agents to participate in complex multi-agent workflows without relying on a centralized directory operator.

For the full registry architecture, contract addresses, ecosystem status, and registration walkthrough, see [AI agents: Identity](/ai-agents/identity/).

## Open composability {#open-composability}

Because Ethereum's protocol layer is permissionless, **an agent can interact with any deployed smart contract**, including decentralized exchanges, lending protocols, prediction markets, data markets, and governance contracts, **without requesting access from the protocol operator**.

Permissionless access to any deployed smart contract means an agent can execute a **complex workflow in a single atomic transaction**: approve a token transfer, execute a swap on a decentralized exchange, deposit the output to a yield protocol, and record the result to an attestation registry. **If any step fails, the entire transaction reverts**. This atomicity property is **not available through standard application programming interfaces (APIs) between centralized services**.

Composability also means that **agent logic can build on existing audited infrastructure rather than re-implementing it**. **Security properties inherited from established Ethereum protocols carry over to the agent's operations**.

<VideoWatch slug="ai-agents-replace-dapps" />

## Scalable payments {#scalable-payments}

Autonomous agents need to pay for compute resources, data feeds, and other agent services without human intervention. Standard financial rails require corporate entities and bank accounts. These are barriers that autonomous code cannot cross.

Ethereum provides a **native, permissionless financial rail for machines**. Agents can hold and spend stablecoins without a bank account, and open protocols like **[x402](https://www.x402.org/)** give any API endpoint a machine-readable way to request and receive payment in a single HTTP exchange. Combined with low-cost [Layer 2](/ai-agents/l2s/) settlement, these primitives enable agents to **independently acquire compute, pay for data, and monetize their own outputs**.

For the full x402 payment flow, stablecoin rail selection, integration code, and alternative payment models, see [AI agents: Payments](/ai-agents/payments/).

## The L2 ecosystem {#the-l2-ecosystem}

Ethereum Mainnet provides the **canonical security and settlement layer**. [Layer 2 networks](/ai-agents/l2s/) extend it by offering **specialized execution environments** with lower fees, faster finality, and capabilities like TEE-based transaction ordering and concentrated agent tooling ecosystems. Because all L2s ultimately settle to Mainnet, an agent's assets and identity remain **anchored to Ethereum's security guarantees** regardless of which L2 it operates on.

See [AI agents: Layer 2s](/ai-agents/l2s/) for an evaluation framework, workload-type guidance, and deployment notes by rollup type.

<VideoWatch slug="decentralized-ai-ethereum-ethdenver" />

## Frequently asked questions {#faq}

<ExpandableCard title="Why would an AI agent use Ethereum instead of a centralized API?">

Centralized APIs require accounts, API keys, rate limits set by the provider, and trust that the provider will not change terms, throttle access, or shut down. Ethereum provides a global, permissionless API that any agent can call without registration. The same DeFi protocols, payment infrastructure, and identity registries are accessible to any address (human or machine) without gatekeeping.

</ExpandableCard>

<ExpandableCard title="What does Ethereum provide for AI agents that other blockchains may not?">

Three capabilities in combination: the deepest ecosystem of production smart contracts (most DeFi, most stablecoins, most tooling), the most mature smart account infrastructure (ERC-4337 with production EntryPoint deployments on all major networks, EIP-7702 live since May 2025), and a production-deployed onchain agent identity standard (ERC-8004, live January 29, 2026 — Draft status, in active adoption). Evaluate whether your agent requires all three before choosing a settlement layer.

</ExpandableCard>

## Further reading {#further-reading}

- [The promise and challenges of crypto + AI applications](https://vitalik.eth.limo/general/2024/01/30/cryptoai.html) — Vitalik Buterin
- [Autonomous agents on blockchains: standards, execution models, and trust boundaries](https://arxiv.org/abs/2601.04583) — arXiv
- [5 Ways Blockchains Help AI Agents](https://a16zcrypto.com/posts/article/5-ways-blockchains-help-ai-agents/) — a16z
- [Account abstraction (ERC-4337)](https://ethereum.org/en/roadmap/account-abstraction/) — ethereum.org
- [EIP-7702: Smart account delegation for existing wallets](https://ethereum.org/en/roadmap/pectra/7702/) — ethereum.org
- [ERC-8004: Trustless agent identity standard](https://eips.ethereum.org/EIPS/eip-8004) — Ethereum Improvement Proposals
- [x402: Machine-to-machine payment protocol](https://docs.x402.org/)

<!--
## OLD CONTENT FROM L2s

**Ethereum Mainnet provides the canonical security and settlement layer.** [Layer 2](/layer-2/) networks extend it by offering **specialized execution environments**, such as **[trusted execution environment (TEE)](/ai-agents/verification/#tees)-based transaction ordering**, alternative smart contract languages, and concentrated agent tooling ecosystems, alongside lower fees and faster finality. For many agent workloads, the choice of L2 is driven by the capabilities it provides, not just by cost.

All Ethereum L2s ultimately settle to Mainnet. An agent's assets, identity, and onchain records remain **anchored to Ethereum's security guarantees** regardless of which L2 it operates on.

Use the sections below to learn more about choosing an L2 based on your agent's specific workload requirements.

---

## Why L2s for AI agents {#why-l2s}

**L2s provide capabilities that Mainnet does not.** Each L2 makes different architectural tradeoffs, and those tradeoffs create execution environments suited to specific agent workloads:

- **Specialized execution environments** — TEE-based transaction ordering eliminates frontrunning. Rust smart contracts enable performance-critical agent logic. ZK rollup guarantees provide cryptographic finality.
- **Ecosystem concentration** — agent infrastructure (like [ERC-8004](/ai-agents/identity/) registrations, [x402](/ai-agents/payment/) integrations, [AgentKit](/ai-agents/build/core-services/) tooling) is concentrated on specific chains, reducing what you need to build from scratch
- **Faster finality** — 1–5 second block times versus Mainnet's 12 seconds allows agents to act on confirmed state more quickly
- **Lower transaction costs** — while Mainnet gas has dropped significantly, L2s generally remain cheaper for high-frequency workloads. An agent executing hundreds of operations per day still benefits from the cost difference at scale.

The evaluation framework below helps you match those properties to the right L2 for your workload.

## How to evaluate an L2 for your agent {#how-to-evaluate}

The Ethereum ecosystem has dozens of L2s, each with different architectural tradeoffs. Rather than comparing a fixed list, **evaluate any L2 against the criteria that matter for your agent's specific workload**.

[L2Beat](https://l2beat.com/scaling/summary) is a community resource that provides live, independent data on every Ethereum L2, including rollup type, trust assumptions, TVL, transaction costs, and risk analysis. Use it as your primary research tool when evaluating networks.

You can also browse the full [Ethereum layer 2 networks directory](/layer-2/networks/) to compare L2s by fees, TVL, and technology type.

### What to look for {#what-to-look-for}

| Criterion                   | Why it matters for agents                                                                                                                                                                                          | Where to check                                                   |
| :-------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------- |
| **Rollup type**             | Optimistic rollups are broadly EVM-compatible and deploy like Mainnet. ZK rollups may require specific compilers and have minor opcode differences.                                                                | [L2Beat risk analysis](https://l2beat.com/scaling/risk)          |
| **Block time**              | Agents acting on confirmed state need fast finality. Block times range from sub-second to several seconds across L2s.                                                                                              | Each L2's documentation                                          |
| **Agent tooling ecosystem** | Some L2s have concentrated communities building agent infrastructure (identity registries, payment protocol integrations, SDKs). Deploying where the tooling exists reduces what you build from scratch.           | L2 developer documentation, ecosystem directories                |
| **Withdrawal finality**     | Optimistic rollups have a challenge window (typically seven days) for withdrawals to Mainnet. ZK rollups reach cryptographic finality faster. This matters for agents that bridge assets frequently.               | [L2Beat finality dashboard](https://l2beat.com/scaling/finality) |
| **Trust assumptions**       | Each L2 makes different tradeoffs around sequencer centralization, data availability, and upgrade authority. An agent holding significant value should deploy on an L2 whose trust model matches the risk profile. | [L2Beat risk analysis](https://l2beat.com/scaling/risk)          |

## Choosing by workload type {#workload-types}

### High-frequency agents {#high-frequency}

Agents executing many small operations, like DeFi automation, data purchases via [x402 machine payments](/ai-agents/payments/), or frequent identity registry reads, need **fast block times**, **mature agent tooling**, and fees that remain viable at scale.

**What to prioritize:** Look for L2s with sub-2-second block times, active agent SDK communities, and low per-transaction costs. Check whether [agent identity infrastructure (ERC-8004)](/ai-agents/identity/) and payment protocol tooling (x402) are deployed on the network, since integrating with existing registries is significantly easier than bootstrapping your own.

### Privacy-sensitive agents {#privacy-sensitive}

Agents handling confidential model inputs, user data, or proprietary strategy require execution environments where **neither the cloud provider nor the node operator can observe the agent's inputs or logic**.

**TEEs are the primary mechanism.** Some L2s have built TEE properties directly into their sequencer architecture, for example, using TEE-based block ordering to provide MEV-resistant transaction sequencing, where transactions are ordered by time of arrival rather than by gas price. Time-of-arrival ordering eliminates frontrunning at the protocol level.

For agents that need to keep model weights or strategy private while still proving execution integrity, **hardware-based TEE infrastructure can be combined with any L2** for off-chain private computation with onchain settlement. See [AI agents: Verification](/ai-agents/verification/#tees) for implementation details.

### Cross-chain agents {#cross-chain}

Agents that coordinate across multiple protocols or chains need **reliable bridging infrastructure** and, in some cases, cross-chain messaging.

**Fast bridges** provide near-instant withdrawals from optimistic rollups without the standard 7-day challenge period. When evaluating bridges for agent operations, compare settlement speed, fee structure, and the number of supported chains.

**Security note:** Use official (canonical) bridges for large amounts. **Fast bridges add trust assumptions in exchange for speed.** Evaluate the specific trust model of any bridge your agent uses programmatically.

## Deployment notes by rollup type {#deployment-notes}

### Optimistic rollups {#optimistic-rollups}

Deploy exactly as you would on Mainnet. **Change only the RPC URL and chain ID**. Smart contracts, tooling, and wallet infrastructure work identically.

**Common gotchas across optimistic rollups:**

- Some optimistic rollups return the L1 block number from `block.number`, not the L2 block number. Use `block.timestamp` for time-based logic to avoid unexpected behavior.
- L2s with TEE-based transaction ordering sequence by arrival time, not gas price. On those networks, paying a priority fee above the base fee is wasted.

### ZK rollups {#zk-rollups}

ZK rollups may require **specific compiler tooling** and have minor EVM compatibility differences. Before deploying an agent on a ZK rollup:

- Check whether the L2 requires a custom Solidity compiler (for example, `zksolc`)
- Verify that any opcodes your contracts use are supported — some ZK rollups do not implement `EXTCODECOPY` or have different gas schedules for certain operations
- Note that some ZK rollups have **native account abstraction** built into the protocol, which means standard ERC-4337 patterns may differ slightly. See [AI agents: Wallets](/ai-agents/wallets/) for how these differences affect key management and session key design.

### Finding RPC endpoints and chain IDs {#rpc-endpoints}

Each L2 publishes its own RPC endpoints, chain IDs, and block explorer URLs in its official documentation. [Chainlist](https://chainlist.org) provides a searchable directory of all EVM-compatible networks with one-click wallet configuration.

<Alert variant="warning">
<AlertContent>
For production agent deployments, use a dedicated RPC provider rather than public endpoints. Public RPCs have rate limits and offer no uptime guarantees. Providers such as Alchemy, Infura, and QuickNode support most major L2s.
</AlertContent>
</Alert>

## Frequently asked questions {#faq}

<ExpandableCard title="Can AI agents use Ethereum L2s?">

Yes. All Ethereum L2s are compatible with standard EVM tooling. An agent that works on Mainnet will work on any Ethereum L2 with only an RPC URL and chain ID change. L2s are the recommended deployment environment for most agents due to lower transaction costs and specialized use case environments.

</ExpandableCard>

<ExpandableCard title="Why would an AI agent deploy on an L2 instead of Mainnet?">

L2s offer specialized execution environments that Mainnet does not provide. Some L2s use TEE-based transaction ordering to eliminate frontrunning. Others support Rust smart contracts alongside Solidity. Many have concentrated agent infrastructure, like identity registries and machine-to-machine payment tooling, that agents can use out of the box. L2s also offer faster block times and lower transaction costs, which matter for agents executing high-frequency workloads. The choice depends on which capabilities your agent needs, not just on cost.

</ExpandableCard>

<ExpandableCard title="What should a developer consider when choosing an L2 for an AI agent?">

The key factors include **transaction cost**, **finality speed**, **ecosystem support** for agent-specific standards, and **rollup type**. Transaction cost determines whether your agent's workload is economically viable. Finality speed affects how quickly an agent can act on confirmed state. Ecosystem support (available SDKs, identity and payment protocol integrations) affects how much you build from scratch. Rollup type, like optimistic versus ZK, affects smart contract compatibility and tooling requirements.

</ExpandableCard>

<ExpandableCard title="How does rollup finality affect AI agent design?">

Optimistic rollups have a challenge window (typically seven days) before withdrawals to Mainnet are final. For most agent operations that remain within a single L2, this does not affect day-to-day execution: transactions confirm in seconds. It becomes relevant when an agent needs to move assets across chains. ZK rollups reach cryptographic finality faster but may require specific compiler tooling and have minor EVM compatibility differences. Agents that bridge frequently should account for finality delay or use fast bridge protocols that accept the additional trust assumptions that come with speed.

</ExpandableCard>

## Further reading {#further-reading}

- [L2Beat](https://l2beat.com) — Security ratings, TVL, and risk analysis for all L2s; the authoritative reference for comparing rollup trust assumptions before committing to a deployment target.
- [growthepie](https://www.growthepie.com/) — Transaction data and cost explorer for all L2s and Mainnet.
- [Autonomous Agents on Blockchains: Standards, Execution Models, and Trust Boundaries](https://arxiv.org/html/2601.04583v1) — Reviewing current standards, execution models, and trust boundaries in autonomous agent research and development, including L2s for AI agent scaling, L2 selection criteria, security model considerations, and more.
- [Scaling Ethereum](/developers/docs/scaling/) — Technical overview of rollups, sidechains, and data availability solutions that underpin L2 architecture.
- [Layer 2 overview](/layer-2/) — ethereum.org introduction to how Ethereum scaling works, covering optimistic and ZK rollup mechanisms.

-->
