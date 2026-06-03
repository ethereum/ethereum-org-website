---
title: The agent economy
description: How AI agents pay for services, get paid for work, discover and trust other agents, and hire through escrowed jobs using x402, ERC-8004, and ERC-8183 on Ethereum
lang: en
template: ai-agents
sidebarDepth: 2
image: /images/ai-agents/hero-image.png
alt: The agent economy on Ethereum
summaryPoints:
  - "x402 machine payments for APIs, data, and agent services"
  - "ERC-8004 identity and reputation for agent discovery and trust"
  - "ERC-8183 escrowed jobs for trustless agent-to-agent hiring"
---

<!--
## OLD CONTENT FROM PAYMENTS

**Standard financial infrastructure was designed for humans and corporations.** Bank accounts require legal entities. Payment APIs require API keys tied to user accounts. OAuth tokens require a human to authorize them. An autonomous agent cannot hold a bank account, and requiring human approval for every API call defeats the purpose of autonomy.

Ethereum provides a native payment rail that autonomous code can use directly. Agents can hold stablecoins without a bank account, and emerging protocols like x402 give any API endpoint a machine-readable way to request and receive payment in a single HTTP exchange.

---

## How x402 works {#how-x402-works}

The HTTP 402 status code was reserved in the original HTTP/1.0 specification in 1996 with the description "Payment Required." The code existed on paper, but was never put into use. There was no universal micropayment infrastructure that could fulfill it. Early attempts to build one (DigiCash, Millicent, and similar 1990s micropayment systems) required proprietary software and centralized intermediaries, and none achieved adoption. The code sat unused for nearly 30 years.

Ethereum changes the underlying condition that made 402 impractical. **Stablecoins are programmable money that any server can receive without a bank account or payment processor**, and ERC-3009 makes it possible to authorize a payment with a single cryptographic signature, with no prior approval transaction required. The [x402 standard for internet-native payments](https://www.x402.org/) wires those primitives directly into HTTP: a server can now request payment and an agent can pay in a single exchange, using infrastructure that neither party needs to trust the other to operate.

**The x402 protocol extends the HTTP 402 ("Payment Required") status code into a complete machine-to-machine payment flow.** The protocol is built by Coinbase and the x402 Foundation and is production-ready as of Q1 2026.

### The payment flow {#payment-flow}

```
1. Agent requests a resource
   GET https://api.example.com/data/feeds/latest

2. Server returns HTTP 402 with payment terms
   {
     "scheme": "exact",
     "network": "eip155:8453",          ← Base chain
     "maxAmountRequired": "1000",        ← 1000 USDC (6 decimals)
     "asset": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",  ← USDC on Base
     "payTo": "0xServer...",
     "extra": { "name": "Premium Data Feed", "description": "..." }
   }

3. Agent signs an ERC-3009 payment authorization
   USDC natively implements ERC-3009 (transferWithAuthorization),
   which allows a signed authorization to be used directly —
   no prior approve() transaction required.

4. Agent retries the request with the payment header
   X-PAYMENT: <base64-encoded signed authorization>

5. Server verifies the signature and delivers the resource
```

The agent pays for **exactly what it uses, per request**, with no subscription, no account, and no human involvement after initial wallet funding.

### Why ERC-3009 matters {#eip-3009}

**[ERC-3009: Transfer With Authorization](https://eips.ethereum.org/EIPS/eip-3009) is the technical primitive that makes x402 practical.** It allows a token transfer to be authorized with a cryptographic signature rather than a separate `approve()` transaction. Stablecoins like USDC implement ERC-3009 natively, which means:

- No gas cost for an approval step before payment
- Payment authorization and resource access happen in a single round-trip
- The authorization can be scoped to a specific recipient, amount, and validity window, reducing overpayment risk

## Ecosystem status {#ecosystem-status}

| Metric                      | Status (early 2026)                                                                                                                                                                        |
| :-------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Protocol version**        | Production-ready                                                                                                                                                                           |
| **Enterprise integrations** | Google Cloud, Stripe, Cloudflare                                                                                                                                                           |
| **SDKs**                    | TypeScript (`@x402/fetch`), Python (`x402`), Go (`github.com/coinbase/x402/go`), Java                                                                                                      |
| **ERC-8004 integration**    | x402 payment receipts can be logged to the ERC-8004 AI agent reputation registry (Learn about ERC-8004 and onchain agent identity on the [AI agents: Identity](/ai-agents/identity/) page) |

## Integration guide {#integration-guide}

### Agent-side: paying for a resource {#agent-side}

The [`@x402/fetch` TypeScript SDK](https://www.npmjs.com/package/@x402/fetch) handles the full payment flow transparently. The example below installs the SDK and demonstrates how an agent signs and pays for a resource in a single call.

If the server returns a standard 200, the request passes through without payment. If it returns a 402, the SDK parses the payment terms, signs the ERC-3009 authorization, and retries automatically.

```bash
npm install @x402/fetch viem
```

```typescript
import { wrapFetchWithPayment } from "@x402/fetch"
import { privateKeyToAccount } from "viem/accounts"
import { createWalletClient, http } from "viem"
import { base } from "viem/chains"

// Use your agent's session key or dedicated payment key here.
// Never use the controlling account key for routine payments — use a dedicated session key.
const agentKey = privateKeyToAccount(process.env.AGENT_PAYMENT_KEY as `0x${string}`)
const walletClient = createWalletClient({
  account: agentKey,
  chain: base,
  transport: http(),
})

// wrapFetchWithPayment wraps the standard fetch API.
// If the server returns a 402, it signs and pays automatically.
const x402Fetch = wrapFetchWithPayment(fetch, walletClient)

const response = await x402Fetch("https://api.example.com/data/feeds/latest")
const data = await response.json()
```

### Server-side: accepting payments {#server-side}

Any API endpoint can accept x402 payments by adding the x402 middleware. The example below protects a single Express route with a 1 USDC fee. Payment signature verification is not handled by the merchant server directly; **the middleware forwards the payment header to a Facilitator** (Coinbase and AltLayer operate public Facilitator nodes; self-hosting is also supported) that verifies the cryptographic signature, executes the onchain settlement, and confirms validity before the middleware releases the resource.

```typescript
import { withPaymentRequired } from "@x402/express"

// Protect an Express route with a 1 USDC fee
app.get(
  "/data/feeds/latest",
  withPaymentRequired({
    amount: "1000000", // 1 USDC (6 decimals)
    asset: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC on Base
    network: "eip155:8453",
  }),
  (req, res) => {
    res.json({ feed: getLatestFeed() })
  }
)
```

See the [x402 documentation](https://docs.x402.org/) for middleware implementations for other frameworks (Fastify, Next.js, Hono).

## The autonomous economic loop {#autonomous-loop}

x402 and [ERC-8004](https://eips.ethereum.org/EIPS/eip-8004) together enable a fully autonomous agent-to-agent economy: an agent discovers a service provider via the Identity Registry, checks its reputation, pays via x402, receives the output, and posts feedback, **all without human involvement** after initial wallet funding. The reputation system creates accountability without a central authority: agents that deliver poor outputs accumulate negative feedback signals that other agents can query before deciding to pay.

For the full protocol stack diagram and step-by-step loop, see [AI agents: Identity — The protocol stack](/ai-agents/identity/#protocol-stack).

<VideoWatch slug="ai-ethereum-erc8004-x402-botconomy" />

Agent deployments do not need to use USDC specifically; it is a straightforward example for this guide. The stablecoin rail selection section below explains which assets are compatible with the x402 flow and why.

## Stablecoin rail selection {#stablecoin-rail}

x402 supports any ERC-20 token on EVM chains via two transfer methods, selected automatically based on the token's capabilities:

- **ERC-3009** (`transferWithAuthorization`) — the preferred path. A single off-chain signature authorizes the transfer with no prior on-chain approval step. USDC implements ERC-3009 natively.
- **Permit2** — the universal fallback for any ERC-20 without ERC-3009 support. Requires a one-time on-chain approval to the Permit2 contract, after which payments are signature-based and gasless. The facilitator sponsors gas for both methods.

| Stablecoin | Transfer method | Notes                                                   |
| :--------- | :-------------- | :------------------------------------------------------ |
| USDC       | ERC-3009        | Preferred — single signature, no approval step          |
| USDT       | Permit2         | One-time on-chain approval required; then gasless       |
| DAI        | Permit2         | One-time on-chain approval required; then gasless       |
| Any ERC-20 | Permit2         | x402 supports any token a facilitator chooses to accept |

<Alert>
<AlertContent>
For supported tokens, contract addresses, and transfer method requirements per network, see the [x402 network and token support documentation](https://docs.x402.org/core-concepts/network-and-token-support).
</AlertContent>
</Alert>

## Choosing a payment model {#payment-models}

x402 is optimized for **discrete, per-request micropayments** — each HTTP call generates an independent on-chain settlement. This works well for permissionless API access, one-off agent tasks, and deployments where agent and server have no prior relationship.

For agents making high-frequency calls to a single provider — continuous data streams, inference endpoints polled dozens of times per minute, or long-running collaborative tasks — settling every request on-chain becomes inefficient. These workloads suit a session-based model better.

**Stripe's [Machine Payments Protocol (MPP)](https://stripe.com/payments/mpp)** is the primary production alternative for streaming use cases. MPP establishes an authenticated payment session, aggregates micro-transactions off-chain using Shared Payment Tokens (SPTs), and settles in bulk at session end. It supports stablecoin, fiat, and corporate card rails within the same session, and includes enterprise compliance tooling (fraud controls, tax reporting) built in.

|                          | x402                                             | Stripe MPP                                     |
| :----------------------- | :----------------------------------------------- | :--------------------------------------------- |
| **Settlement**           | Per-request, on-chain                            | Session-based, off-chain aggregation           |
| **Best for**             | Discrete micropayments, permissionless APIs      | High-frequency streaming, long-running tasks   |
| **Payment rails**        | Any ERC-20 (EVM), SPL (Solana), SEP-41 (Stellar) | Stablecoin, fiat, corporate card               |
| **Permissionless**       | Yes — no account required                        | No — requires Stripe account                   |
| **Compliance**           | None built in                                    | Enterprise fraud, tax, and reporting tooling   |
| **Onchain transparency** | Every payment settled onchain                    | Aggregated; onchain only at session settlement |

For a detailed architectural comparison, see [x402 vs. Stripe MPP: choosing payment infrastructure for AI agents](https://workos.com/blog/x402-vs-stripe-mpp-how-to-choose-payment-infrastructure-for-ai-agents-and-mcp-tools-in-2026).

## Payments FAQ {#payments-faq}

<ExpandableCard title="What is x402?">

x402 is a machine-to-machine payment protocol built on the HTTP 402 status code. An agent requests a resource, the server returns a 402 with payment terms (stablecoin, amount, address), the agent signs an **'ERC-3009: Transfer With Authorization' payment authorization**, and retries the request with the payment header. The server verifies the signature and delivers the resource. No account, no subscription, no human approval. Production-ready since Q1 2026.

</ExpandableCard>

## Payments further reading {#payments-further-reading}

- [ERC-3009: Transfer with authorization](https://eips.ethereum.org/EIPS/eip-3009) — Full specification for the signature-based token transfer primitive that makes gasless, single-round-trip payments possible in x402
- [x402 vs. Stripe MPP: choosing payment infrastructure for AI agents](https://workos.com/blog/x402-vs-stripe-mpp-how-to-choose-payment-infrastructure-for-ai-agents-and-mcp-tools-in-2026) — Architectural comparison of discrete vs. session-based payment models for high-frequency and streaming agent workloads
- [x402 documentation](https://docs.x402.org/) — x402.org
- [Agentic Payments and Crypto's Emerging Role in the AI Economy](https://www.galaxy.com/insights/research/x402-ai-agents-crypto-payments) — How standards like x402 aim to make AI agents full-fledged economic actors, and the potential to power non-crypto applications.

---

## OLD CONTENT FROM IDENTITY

When an autonomous agent interacts with another agent or a human counterparty, the counterparty needs to answer three questions: Is this agent who it says it is? What can it do? Has it behaved reliably in the past?

Centralized identity directories answer these questions by asking all parties to trust the directory operator. That trust assumption is fragile: **the operator can be captured, shut down, or selectively deny access**.

Onchain identity standards on Ethereum address the same problem by making registrations publicly verifiable and censorship-resistant. Any application can query the registry, and **no single party controls who can register or who gets responses**.

**ERC-8004** is the Trustless Agents Standard, deployed on Ethereum Mainnet and 20+ chains since January 29, 2026. It provides the identity infrastructure for the emerging agent economy.

<Alert variant="warning">
<AlertContent>
<AlertTitle>
Draft standard in active adoption
</AlertTitle>
<AlertDescription>
ERC-8004 carries an official status of _Draft_ on the Ethereum Improvement Proposals site. The contracts are deployed and live in production, but the interface specification may change as the standard progresses toward Final. Until the standard is finalized, pin your integration to a specific contract address and ABI version rather than assuming forward compatibility. Monitor the [Ethereum Magicians discussion thread](https://ethereum-magicians.org/t/erc-8004-trustless-agents/25098) for interface changes.
</AlertDescription>
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

| Metric                           | Status (early 2026)                                                                                           |
| :------------------------------- | :------------------------------------------------------------------------------------------------------------ |
| **Standard status**              | Draft (in active adoption — see maturity note above)                                                          |
| **Identity Registry deployed**   | January 29, 2026                                                                                              |
| **Reputation Registry deployed** | January 29, 2026                                                                                              |
| **Validation Registry**          | Not yet deployed — specification in active community discussion                                               |
| **Networks**                     | Ethereum Mainnet, Base, Arbitrum, Optimism, Polygon, BNB Chain, Celo, Monad, and 12+ others                   |
| **Same addresses across chains** | Yes — deterministic deployment                                                                                |
| **Feedback entries**             | 20,000+                                                                                                       |
| **Primary network by activity**  | Base (73.6% of feedback)                                                                                      |
| **Co-authors**                   | Marco De Rossi (MetaMask), Davide Crapis (Ethereum Foundation), Jordan Ellis (Google), Erik Reppel (Coinbase) |

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

<VideoWatch slug="agent-reputation-delegation-daos" />

## How to register an agent {#how-to-register}

ERC-8004 registration uses the same addresses across all supported chains.

The registration process involves:

1. **Choose your network** — view all current supported networks [on the 8004 site](https://www.8004.org/build), and all deployed 8004 contracts across chains in the [official 8004 contract repository](https://github.com/erc-8004/erc-8004-contracts).
2. **Call the Identity Registry** — invoke the `register` function with your agent's address, capability declarations, and metadata URI.
3. **Fund the reputation registry** — initial feedback can be submitted by early users or test integrations to establish a starting reputation signal.
4. **Integrate the validation registry** _(optional — not yet deployed)_ — once live, this step applies if your use case requires cryptographic output verification. See the [Validation Registry section above](#validation-registry) for current status.

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

## Identity FAQ {#identity-faq}

<ExpandableCard title="What is ERC-8004?">

ERC-8004 is the Trustless Agents Standard, live on Ethereum Mainnet and 20+ chains since January 29, 2026. It provides three onchain registries: an **Identity Registry** (agent discovery), a **Reputation Registry** (onchain feedback signals), and a **Validation Registry** (hooks for cryptographic verification of agent outputs, not yet deployed). The standard uses the same contract addresses across all supported chains via deterministic deployment.

</ExpandableCard>

<ExpandableCard title="Is ERC-8004 finalized?">

No. ERC-8004 carries an official EIP status of **Draft**. The contracts are deployed and live in production on 20+ chains, but the interface specification may change as the standard progresses toward Final. Until it is finalized, **pin your integration to a specific contract address and ABI version** rather than assuming forward compatibility. Monitor the [Ethereum Magicians discussion thread](https://ethereum-magicians.org/t/erc-8004-trustless-agents/25098) for interface changes.

</ExpandableCard>

## Identity further reading {#identity-further-reading}

- [ERC-8004 Ethereum Magicians thread](https://ethereum-magicians.org/t/erc-8004-trustless-agents/25098) — The active discussion thread where interface changes are proposed and debated. Monitor this for breaking changes before each release.
- [Introduction to ERC-8004: The Trust Layer for AI Agents](https://ai.ethereum.foundation/blog/intro-erc-8004) — Understand what ERC-8004 is, the problem it solves, and how the core registries work together.
- [ERC-8004 best practices](https://github.com/erc-8004/best-practices) — Official guidance repository with dedicated guides for registration and reputation and feedback patterns, plus the draft spec as a reference.
- [The Identity Problem in Agentic Commerce: How ENS Can Enable Trust for AI Agents](https://ens.domains/blog/post/ens-ai-agent-erc8004) — Explainer on the need for AI Agent identity onchain, plus how ENS names can be used alongside ERC-8004 for agent identities.

**Ecosystem tools**

- [8004scan](https://8004scan.io/) — Browse registered agents, submit feedback, and view reputation leaderboards.
- [Agentscan](https://agentscan.info/) — Multi-chain ERC-8004 explorer with OASF taxonomy classifications, reputation scores, and onchain activity across 21+ networks.
- [8004agents.ai](https://8004agents.ai/) — Multi-chain agent directory with reputation scores, validation status, and ecosystem news.
- [trust8004](https://www.trust8004.xyz/) — Agent scanner focused on comparing combined identity and reputation trust signals, with endpoint verification, across chains.

---

## OLD CONTENT FROM VERIFICATION (zkML and audit trail sections — relevant to validation leg)

## Zero-knowledge machine learning (zkML) {#zkml}

[Zero-knowledge](/zero-knowledge-proofs/) machine learning generates a **cryptographic proof** demonstrating that a specific model produced a specific output from a specific input. The proof can be **verified onchain by a smart contract**, and the proof verification does not require access to the model weights or input data.

**What zkML proves:** Correct computation. A zkML proof guarantees that the stated model executed the stated logic on the stated input and produced the stated output. It does not guarantee that the output is factually accurate, only that it was produced consistently.

**What zkML does not prove:** Factual accuracy, absence of hallucination, or correctness of the model's reasoning. An agent can still produce a wrong answer and provide a valid zkML proof of that wrong answer. zkML proves that the model ran, not that the model was right.

This distinction matters for how zkML is used in practice. It is most valuable for **proving policy compliance** ("the agent only called the trade function when its classifier output exceeded 0.95 confidence") rather than for validating the underlying reasoning.

### zkML tools and maturity {#zkml-tools}

The following tools have production-ready APIs and are suitable for builder integration as of early 2026:

| Tool                                             | Description                                                                                          | Maturity                                                         |
| :----------------------------------------------- | :--------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------- |
| **[EZKL](https://ezkl.xyz/)**                    | Converts ONNX models to ZK circuits; CLI and Python SDK; GPU-accelerated with CUDA kernel support    | Production-ready — audited, deployed in adversarial environments |
| **[Risc Zero](https://dev.risczero.com/)**       | General-purpose ZK proofs via zkVM; supports arbitrary Rust programs with onchain verifier contracts | Production-ready (post-1.0 release)                              |
| **[SP1 (Succinct)](https://docs.succinct.xyz/)** | ZK proving system for RISC-V programs; multilinear polynomial-based proof system                     | Production-ready (SP1 Hypercube, launched mainnet Feb 2026)      |

**Emerging tools:** [DeepProve (Lagrange)](https://lagrange.dev/deepprove) has demonstrated transformer-scale proving (GPT-2) but is not yet generally available. [Jolt (a16z)](https://jolt.a16zcrypto.com/) added native zero-knowledge privacy support in March 2026 but remains in alpha. Neither is recommended for production agent deployments today.

**Performance envelope (2026):** Proof generation takes **1–5 seconds for bounded models** (decision trees, compact classifiers, fraud detectors) with GPU-accelerated proving infrastructure. Larger models (transformer-scale) require **10–60+ seconds** depending on model size and proving hardware. These timelines are not suitable for real-time inference. Use zkML for **batch verification or asynchronous proof submission** — scenarios where the proof can be generated after the inference and submitted onchain before a dependent action executes.

### The EZKL workflow {#ezkl-workflow}

EZKL is the most accessible starting point for zkML integration. It takes an ONNX model file and produces a proof circuit that can be verified onchain.

The following CLI sequence converts an ONNX model into a ZK circuit, generates a proof for a specific inference run, and verifies the proof locally. The output is a proof file that can be submitted to the Solidity verifier contract that EZKL also generates.

```bash
pip install ezkl

# Step 1: Generate settings for your model
ezkl gen-settings -M model.onnx

# Step 2: Calibrate for your expected input distribution
ezkl calibrate-settings -M model.onnx -D input.json

# Step 3: Compile the model to a ZK circuit
ezkl compile-circuit -M model.onnx

# Step 4: Trusted setup (run once per circuit)
ezkl setup -M model.onnx --srs-path ptau.ptau

# Step 5: Generate a proof for a specific inference
ezkl prove -M model.onnx -D input.json

# Step 6: Verify the proof
ezkl verify
```

A smart contract can call the generated **Solidity verifier** before releasing funds or taking any action contingent on the model's output. The following section describes the practical scenarios where that verification adds the most value.

### Practical use cases for zkML {#zkml-use-cases}

**Policy compliance gating:** A DeFi agent proves that its classifier exceeded a confidence threshold before the treasury contract allows a withdrawal. The contract verifies the proof; if it fails or is absent, the withdrawal reverts.

**Fraud detection:** A fraud detection model runs offchain and generates a zkML proof for each transaction it approves. The proof is posted onchain as a **permanent, auditable record** that the transaction passed the model's risk check at that moment.

**Model upgrade governance:** A DAO governing an AI-powered protocol can require zkML proofs that a proposed model produces equivalent outputs to the current model on a defined test set, providing **cryptographic evidence before a governance vote**.

## Onchain immutability as an audit trail {#audit-trail}

Both zkML proofs and TEE attestations can be posted onchain, creating a **permanent, tamper-resistant audit trail**. A smart contract that records proof hashes with timestamps provides:

- **Historical accountability** — anyone can verify that a specific agent output was proven or attested at a specific point in time.
- **Dispute resolution** — if an agent's behavior is later disputed, the onchain record provides evidence that the behavior was consistent with the declared model.
- **Composability** — other smart contracts can read the proof record and condition their own behavior on whether an agent has a current valid proof.

The [ERC-8004 Validation Registry](/ai-agents/identity/#validation-registry) is designed to formalize this pattern by routing verification requests to delegated verifier contracts and recording results onchain. The Validation Registry specification is **not yet finalized**; see the [AI agents: Identity](/ai-agents/identity/) page for current status. The audit trail patterns described above can be implemented independently of ERC-8004 using custom verifier contracts.

## Verification FAQ {#verification-faq}

<ExpandableCard title="What is zkML and why does it matter for AI agents?">

**Zero-knowledge machine learning (zkML)** generates a cryptographic proof that a specific model ran a specific computation and produced a specific output. A smart contract can verify this proof before releasing funds or executing a consequential action, allowing the contract to condition behavior on the agent's reasoning, not just its assertion. Today zkML is production-viable for bounded models (decision trees, classifiers). Large language model inference remains too slow for real-time use but is improving rapidly.

</ExpandableCard>

<ExpandableCard title="How do I verify what my AI agent did?">

Three mechanisms: (1) **Onchain transaction history** — every transaction signed by the agent is permanently recorded on the L2 and settled to Mainnet. (2) **ERC-8004 Reputation Registry** — other parties can post feedback about the agent's behavior. (3) **zkML proofs or TEE attestations** — for cases where you need to prove that a specific model produced a specific output. Most production agents today rely on onchain transaction history for auditing. zkML is used when you need cryptographic proof of policy compliance.

</ExpandableCard>

## Verification further reading {#verification-further-reading}

- [The promise and challenges of crypto + AI applications](https://vitalik.eth.limo/general/2024/01/30/cryptoai.html) — Vitalik Buterin's foundational analysis of where cryptographic verification adds value to AI systems and where it does not.
- [The Definitive Guide to ZKML (2025)](https://blog.icme.io/the-definitive-guide-to-zkml-2025/) — Comprehensive technical overview of the zkML landscape, covering proving infrastructure evolution, tool comparisons, and performance benchmarks from 2023 to 2025.
- [Agent identity (ERC-8004)](/ai-agents/identity/) — The onchain agent identity standard, including the Validation Registry design that will route verification requests to delegated verifier contracts once finalized.

-->
