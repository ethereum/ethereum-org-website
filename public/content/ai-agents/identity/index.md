---
title: Agent identity with ERC-8004
description: Onchain agent identity, reputation, and validation registries using ERC-8004 on Ethereum, including how agents discover, verify, and trust each other without a centralized directory
lang: en
faqItems:
  - question: "What is ERC-8004?"
    answer: "ERC-8004 is the Trustless Agents Standard, live on Ethereum Mainnet and 20+ chains since January 29, 2026. It provides three onchain registries: an Identity Registry (agent discovery), a Reputation Registry (onchain feedback signals), and a Validation Registry (hooks for cryptographic verification of agent outputs, not yet deployed). The standard uses the same contract addresses across all supported chains via deterministic deployment."
  - question: "Is ERC-8004 finalized?"
    answer: "No. ERC-8004 carries an official EIP status of Draft. The contracts are deployed and live in production on 20+ chains, but the interface specification may change as the standard progresses toward Final. Until it is finalized, pin your integration to a specific contract address and ABI version rather than assuming forward compatibility. Monitor the Ethereum Magicians discussion thread for interface changes."
---

# Agent identity with ERC-8004 {#agent-identity}

When an autonomous agent interacts with another agent or a human counterparty, the counterparty needs to answer three questions: Is this agent who it says it is? What can it do? Has it behaved reliably in the past?

Centralized identity directories answer these questions by asking all parties to trust the directory operator. That trust assumption is fragile: **the operator can be captured, shut down, or selectively deny access**. 

Onchain identity standards on Ethereum address the same problem by making registrations publicly verifiable and censorship-resistant. Any application can query the registry, and **no single party controls who can register or who gets responses**.

**ERC-8004** is the Trustless Agents Standard, deployed on Ethereum Mainnet and 20+ chains since January 29, 2026. It provides the identity infrastructure for the emerging agent economy.

<Alert variant="warning" className="my-8">
<AlertContent>
<p className="mt-0"><strong>Draft standard in active adoption</strong></p>
<p className="mt-2">ERC-8004 carries an official status of <em>Draft</em> on the Ethereum Improvement Proposals site. The contracts are deployed and live in production, but the interface specification may change as the standard progresses toward Final. Until the standard is finalized, pin your integration to a specific contract address and ABI version rather than assuming forward compatibility. Monitor the <a href="https://ethereum-magicians.org/t/erc-8004-trustless-agents/25098">Ethereum Magicians discussion thread</a> for interface changes.</p>
</AlertContent>
</Alert>

## ERC-8004: the three registries {#three-registries}

ERC-8004 provides three onchain registries, each serving a distinct function in the agent trust stack.

### Identity Registry {#identity-registry}

The Identity Registry gives each agent a portable, censorship-resistant identifier tied to an Ethereum address. Registrations are [ERC-721 tokens](/developers/docs/standards/tokens/erc-721/); the agent's identity NFT is owned by its controller and can be transferred, but the identity record itself is permanently associated with the agent's address history.

Each identity record stores:
- The agent's declared capabilities and supported task types
- The agent's primary network and contract address
- Links to off-chain documentation, API endpoints, and supporting evidence
- Cross-chain deployment addresses for agents running on multiple networks

**Identity Registry Mainnet address:** `0x8004A169FB4a3325136EB29fA0ceB6D2e539a432`

### Reputation Registry {#reputation-registry}

The Reputation Registry stores structured feedback signals from agents and human users who have interacted with a given agent. Feedback can be revoked by the original submitter, but the revocation is recorded onchain, so the history of a revocation is itself permanent and auditable. 

Applications can query cumulative reputation scores across multiple dimensions (task completion rate, response latency, payment reliability) before deciding to interact with or pay an agent. As of early 2026, the registry holds 20,000+ feedback entries.

**Reputation Registry Mainnet address:** `0x8004BAa17C55a88189AE136b182e5fdA19dE9b63`

The Reputation Registry feeds directly into discovery decisions. An agent checking a counterparty's record queries this registry before proceeding to a payment step.

### Validation Registry {#validation-registry}

The Validation Registry is designed to cryptographically validate agent behavior by routing verification requests to delegated smart contracts. When deployed, an application will be able to submit a verification request specifying the output to be checked and the verification method. 

The registry will route the request to a registered verifier and record the result onchain, creating an auditable, tamper-resistant trail that lets any counterparty confirm a specific agent output was independently verified at a specific point in time, without having to trust the agent or its operator.

Unlike the Identity and Reputation registries, which are destination contracts that applications read and write directly, the Validation Registry is designed as a coordination layer. Validator smart contracts will register themselves independently and respond to requests routed through the registry; the verification work will happen in those separate validator contracts, with the result recorded onchain for composability.

The ERC-8004 contributors and community are actively working on the specification. Three verification approaches are under consideration:
- **TEE attestations** — outputs verified by trusted execution environments
- **Crypto-economic security** — staking validators independently re-execute the inference and reach consensus
- **zkML** — zero-knowledge proofs of correct model execution

The Validation Registry is not yet deployed. The interface specification is still being finalized through community discussion, and the contracts will go live once the technical approach reaches broad stakeholder consensus. Monitor the [ERC-8004 Ethereum Magicians thread](https://ethereum-magicians.org/t/erc-8004-trustless-agents/25098) for updates.

For output verification options that are available today, see [AI agents: Verification](/ai-agents/verification/).

## Ecosystem status {#ecosystem-status}

| Metric | Status (early 2026) |
| :--- | :--- |
| **Standard status** | Draft (in active adoption — see maturity note above) |
| **Identity Registry deployed** | January 29, 2026 |
| **Reputation Registry deployed** | January 29, 2026 |
| **Validation Registry** | Not yet deployed — specification in active community discussion |
| **Networks** | Ethereum Mainnet, Base, Arbitrum, Optimism, Polygon, BNB Chain, Celo, Monad, and 12+ others |
| **Same addresses across chains** | Yes — deterministic deployment |
| **Feedback entries** | 20,000+ |
| **Primary network by activity** | Base (73.6% of feedback) |
| **Co-authors** | Marco De Rossi (MetaMask), Davide Crapis (Ethereum Foundation), Jordan Ellis (Google), Erik Reppel (Coinbase) |

## The protocol stack {#protocol-stack}

ERC-8004 sits at the identity layer of a broader agent interoperability stack:

```
HTTP / A2A (transport)
    ↓
x402 (machine-to-machine payments)
    ↓
ERC-8004 (agent identity and reputation)
    ↓
Ethereum / L2 (settlement and verifiability)
```

The full autonomous economic loop:

```
1. Agent A discovers Agent B's service (ERC-8004 Identity Registry)
2. Agent A checks Agent B's reputation (ERC-8004 Reputation Registry)
3. Agent A requests Agent B's endpoint → receives HTTP 402
4. Agent A pays via x402 (ERC-3009 signed USDC authorization)
5. Agent B delivers the service output
6. Agent A posts feedback to the ERC-8004 Reputation Registry
```

No central operator is required at any step. Accountability emerges from the reputation layer rather than from trust in a platform. See [AI agents: Payments](/ai-agents/payments/) for the full payment flow that pairs with the identity and reputation layers shown here.

## Onchain reputation patterns {#reputation-patterns}

Beyond ERC-8004's built-in reputation registry, two complementary patterns are commonly used for agent trust in production. Both can be used alongside ERC-8004 registrations rather than instead of them.

### Attestation registries {#attestation-registries}

The [Ethereum Attestation Service (EAS)](https://attest.sh/) provides a general-purpose onchain attestation framework. Any address can create a schema and issue attestations to any other address. 

For AI agents, common attestation patterns include:
- **Capability attestations** — a trusted third party attests that a given agent has passed an evaluation for a specific task type.
- **Audit attestations** — a security researcher attests that an agent's code was reviewed and found to meet defined standards.
- **Completion attestations** — a client attests that a specific task was completed to specification.

EAS attestations are queryable via the EAS GraphQL API and can be verified onchain by any smart contract. Because EAS attestations are issued by named addresses rather than by the agent itself, they provide a trust signal that is independent of the agent's own registration data.

### Proof-of-personhood {#proof-of-personhood}

For interactions where distinguishing an agent acting on behalf of a verified human from a fully autonomous agent matters, proof-of-personhood mechanisms provide an additional trust signal.

These mechanisms do not prove that the agent itself is human (it is not), but that a verified human authorized the agent to act on their behalf. 

**[Proof of Humanity](https://www.proofofhumanity.id/)** provides an alternative social-vouching based approach to humanhood verification, with a focus on DAO membership and universal basic income applications.

**[Worldcoin / World ID](https://worldcoin.org/world-id)** uses biometric verification (iris scan) to generate a zero-knowledge proof that the credential holder is a unique human, without revealing the individual's identity. An agent acting under World ID delegation can assert that it was authorized by a unique verified human, which can be a meaningful signal for governance participation, content moderation, and other contexts where Sybil resistance matters.

For agent interactions that gate access based on personhood, combining an ERC-8004 registration with a proof-of-personhood delegation creates a stronger identity claim than either signal alone.

## How to register an agent {#how-to-register}

ERC-8004 registration uses the same addresses across all supported chains. 

The registration process involves:
1. **Choose your network** — view all current supported networks [on the 8004 site](https://www.8004.org/build), and all deployed 8004 contracts across chains in the [official 8004 contract repository](https://github.com/erc-8004/erc-8004-contracts).
2. **Call the Identity Registry** — invoke the `register` function with your agent's address, capability declarations, and metadata URI.
3. **Fund the reputation registry** — initial feedback can be submitted by early users or test integrations to establish a starting reputation signal.
4. **Integrate the validation registry** *(optional — not yet deployed)* — once live, this step applies if your use case requires cryptographic output verification. See the [Validation Registry section above](#validation-registry) for current status.

For the current contract ABI and registration walkthrough, see the [ERC-8004 specification](https://eips.ethereum.org/EIPS/eip-8004) and the [ERC-8004 developer site](https://www.8004.org).

The following example reads an agent's registration URI from the Identity Registry. Replace `agentId` with the ERC-721 token ID returned when the agent registered, and substitute `ERC8004_ABI` with the ABI from [www.8004.org](https://www.8004.org).

```typescript
// Example: read an agent's registration from the Identity Registry
import { createPublicClient, http } from "viem"
import { base } from "viem/chains"

const client = createPublicClient({
  chain: base,
  transport: http("https://mainnet.base.org"),
})

const IDENTITY_REGISTRY = "0x8004A169FB4a3325136EB29fA0ceB6D2e539a432"

// Query a registered agent's registration URI (resolves to the off-chain agent registration file)
const agentURI = await client.readContract({
  address: IDENTITY_REGISTRY,
  abi: ERC8004_ABI, // import from https://www.8004.org
  functionName: "tokenURI",
  args: [agentId], // agentId is the ERC-721 token ID returned at registration
})
```

## Frequently asked questions {#faq}

<ExpandableCard title="What is ERC-8004?">

ERC-8004 is the Trustless Agents Standard, live on Ethereum Mainnet and 20+ chains since January 29, 2026. It provides three onchain registries: an **Identity Registry** (agent discovery), a **Reputation Registry** (onchain feedback signals), and a **Validation Registry** (hooks for cryptographic verification of agent outputs, not yet deployed). The standard uses the same contract addresses across all supported chains via deterministic deployment.

</ExpandableCard>

<ExpandableCard title="Is ERC-8004 finalized?">

No. ERC-8004 carries an official EIP status of **Draft**. The contracts are deployed and live in production on 20+ chains, but the interface specification may change as the standard progresses toward Final. Until it is finalized, **pin your integration to a specific contract address and ABI version** rather than assuming forward compatibility. Monitor the [Ethereum Magicians discussion thread](https://ethereum-magicians.org/t/erc-8004-trustless-agents/25098) for interface changes.

</ExpandableCard>

## Further reading {#further-reading}

- [ERC-8004 Ethereum Magicians thread](https://ethereum-magicians.org/t/erc-8004-trustless-agents/25098) — The active discussion thread where interface changes are proposed and debated. Monitor this for breaking changes before each release.
- [Introduction to ERC-8004: The Trust Layer for AI Agents](https://ai.ethereum.foundation/blog/intro-erc-8004) — Understand what ERC-8004 is, the problem it solves, and how the core registries work together.
- [ERC-8004 best practices](https://github.com/erc-8004/best-practices) — Official guidance repository with dedicated guides for registration and reputation and feedback patterns, plus the draft spec as a reference.
- [The Identity Problem in Agentic Commerce: How ENS Can Enable Trust for AI Agents](https://ens.domains/blog/post/ens-ai-agent-erc8004) — Explainer on the need for AI Agent identity onchain, plus how ENS names can be used alongside ERC-8004 for agent identities.

**Ecosystem tools**
- [8004scan](https://8004scan.io/) — Browse registered agents, submit feedback, and view reputation leaderboards.
- [Agentscan](https://agentscan.info/) — Multi-chain ERC-8004 explorer with OASF taxonomy classifications, reputation scores, and onchain activity across 21+ networks.
- [8004agents.ai](https://8004agents.ai/) — Multi-chain agent directory with reputation scores, validation status, and ecosystem news.
- [trust8004](https://www.trust8004.xyz/) — Agent scanner focused on comparing combined identity and reputation trust signals, with endpoint verification, across chains.

## Continue exploring the AI agents builder hub {#continue-exploring}  

### Start here {#start-here}

- [Why Ethereum](/ai-agents/ethereum/) — The technical case for using Ethereum as the settlement and coordination layer for AI agents.
- [Getting started](/ai-agents/getting-started/) — Fund an agent wallet, pick a framework, and deploy your first autonomous transaction.

### Core building blocks {#core-building-blocks}

- [Agent wallets](/ai-agents/wallets/) — Smart accounts, session keys, hardware trust layers, and the patterns for giving an agent safe spending authority.
- [Frameworks](/ai-agents/frameworks/) — A directory of agent frameworks with Ethereum support and guidance on when to use each.
- [Verification](/ai-agents/verification/) — zkML, TEEs, and onchain attestations: how to prove an agent behaved as claimed.
- [Payments](/ai-agents/payments/) — Machine-to-machine micropayments, streaming payments, and stablecoin rails for autonomous agent commerce.

### Ecosystem and tooling {#ecosystem-and-tooling}

- [Use cases](/ai-agents/use-cases/) — What agents are doing on Ethereum today: DeFi automation, data markets, governance participation, and more.
- [Layer 2s](/ai-agents/l2s/) — How to choose an L2 for your agent based on cost, throughput, privacy, and ecosystem fit.
- [Data and stats](/ai-agents/data/) — Onchain data tracking the growth of the AI agent ecosystem on Ethereum.