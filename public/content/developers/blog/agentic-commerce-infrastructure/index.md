---
title: "Agentic commerce: the infrastructure stack for autonomous agents"
description: "The complete infrastructure stack for agent-to-agent commerce, from discovery to payments to privacy. ERC-8004, x402, ERC-8183, and the protocols that make autonomous agent economies possible."
author: "Rick"
team: "EF Builder Growth"
tags:
  - "agentic commerce"
  - "onchain agents"
  - "ERC standards"
published: 2026-03-27
sourceUrl: "https://www.rick.build/blog/agentic-commerce-infrastructure"
breadcrumb: Agentic commerce infrastructure
lang: en
---

*Originally shared on [rick.build](https://www.rick.build/blog/agentic-commerce-infrastructure).*

AI agents need to transact with each other. Not in theory — they are doing it now. But the infrastructure is fragmented, centralized, and built for humans. Here is the complete stack that makes autonomous agent commerce actually work.

## Every major payments shift removes friction {#every-major-payments-shift-removes-friction}

The history of payments is the history of removing layers of friction:

**1958 to 2010s: Visa/Mastercard** — Removed acceptance friction. Made it possible to pay anywhere. Cards replaced cash and checks at scale.

**2011: Stripe** — Removed developer friction. Seven lines of code replaced months of integration work. This was not just faster — it changed who could build payment-powered products.

**2026: x402** — Removes onboarding friction. No accounts. No API keys. No setup. Just: request → pay → receive.

For agents operating at machine scale, onboarding friction is not just annoying — it is architecturally impossible. An agent that discovers 1,000 new services per day cannot fill out 1,000 signup forms. Cannot manage 1,000 API keys. Cannot authenticate 1,000 different ways.

x402 makes payments as native to HTTP as GET and POST.

## Why Ethereum standards matter for agent economies {#why-ethereum-standards-matter-for-agent-economies}

The internet scaled because of open standards. TCP/IP, HTTP, SMTP — protocols that anyone could implement without permission. No single company controlled email. No platform owned web browsing. Standards created interoperability, and interoperability created network effects that platforms could never match.

Agent economies need the same foundation. When agents transact across organizational boundaries — discovering services, verifying claims, executing payments — they cannot rely on platform-specific APIs or proprietary protocols. An agent serving financial data cannot integrate differently with every potential client. A reputation system cannot be siloed inside one marketplace. Commerce infrastructure has to be universal, or it fragments into incompatible islands.

This is where Ethereum standards come in.

**ERC** stands for "Ethereum Request for Comments" — a standardization process borrowed from the internet's RFC system. An ERC defines a common interface: how smart contracts should behave, what functions they expose, what events they emit. When developers agree on a standard (like ERC-20 for fungible tokens or ERC-721 for NFTs), every wallet, exchange, and application can interact with those contracts without custom integration.

Standards are how decentralized systems achieve coordination without central control.

For agent commerce, this means:

- **Identity that travels** — An agent's reputation is not locked in one platform. It is an onchain record that any service can query.
- **Payments that work everywhere** — Escrow, settlement, and verification follow the same interface whether you are paying for API calls or hiring an agent to manage a portfolio.
- **Composability at the protocol level** — Discovery, commerce, authentication, and privacy are not separate products. They are standardized layers that snap together.

The agent commerce stack we are about to explore relies on several ERCs working together. Each solves a specific piece — discovery, settlement, authentication, privacy — but because they are open standards built on Ethereum, they compose into a complete system. No single company controls the stack. No platform can lock you in.

This is infrastructure that scales with the machine economy, not against it.

## ERC-8004: you are reading it wrong {#erc-8004-you-are-reading-it-wrong}

Everyone is calling ERC-8004 "the agent standard." Crypto media ran with it, builders ran with it, even Ethereum Foundation communications lean into it. They are reading the title instead of reading the spec.

ERC-8004 is titled "Trustless Agents," but the standard itself is not limited to agents. It is a general-purpose trust and discovery infrastructure for the machine economy.

The popular narrative: "AI agents need to transact, ERC-8004 gives them identity and reputation, it is ERC-20 for agents."

This framing is neat, marketable, and wrong in a way that matters.

### What ERC-8004 actually is {#what-erc-8004-actually-is}

Open the EIP. The abstract says: "discover, choose, and interact with agents across organizational boundaries without pre-existing trust."

It names both **MCP** (Model Context Protocol) and **A2A** (Agent-to-Agent Protocol) as the protocols it extends with a trust layer.

MCP servers are often not agents at all — they are tool providers. A database connector. A code sandbox. A weather API wrapped in MCP. These are services, not agents.

Look at the registration file format: A2A endpoints, MCP tool servers, plain HTTP APIs, ENS names, DIDs, OASF endpoints, even email addresses.

This is not an agent registry. It is a universal service registry with a flexible identity layer built on ERC-721.

Backed by Google, Coinbase, MetaMask, Ethereum Foundation. Competitors collaborating on infrastructure.

### The three registries {#the-three-registries}

**Identity Registry** — An ERC-721 token whose URI points to a registration file. Describes what something is, what it does, and where to reach it.

Nothing requires the registered entity to be an AI agent. An oracle network could register. A DeFi protocol's liquidation service. A data provider. The `supportedTrust` field is optional — leave it empty and you are using 8004 purely for discovery.

That is a decentralized service directory. Plain and simple.

**Reputation Registry** — Generic value/tags feedback system. Look at the spec's example metrics: `reachable`, `uptime`, `responseTime`, `successRate`, `blocktimeFreshness`, `revenues`, `tradingYield`.

Half of these are infrastructure metrics you would track for any API or service. This is not a "how good is this AI agent" system. It is a general-purpose, onchain reputation primitive.

The critical design choice: only entities you have paid can be reviewed. Every review links to a real onchain transaction. This kills the fake review problem structurally — no pay-to-review manipulation at scale.

**Validation Registry** — Any registered entity requests verification, any validator contract responds. The mechanisms listed — stake-secured re-execution, zkML proofs, TEE oracles — are general computation verification techniques.

They apply to oracles providing price feeds, compute services running inference, data pipelines producing analytics. Not just agents.

### Why the reframe matters {#why-the-reframe-matters}

It changes what you build. If you think 8004 is an agent registry, you build agent directories and agent marketplaces.

If you understand it is a machine-economy trust layer, you build reputation aggregators for MCP tool servers, validation frameworks for oracles, discovery systems for DeFi services — infrastructure that agents consume, not just infrastructure that agents are.

It changes the adoption curve. The agent-only framing makes 8004 dependent on fully autonomous agents — still early despite the hype.

But MCP tools, oracles, and APIs exist today. Any service that benefits from decentralized discovery and reputation can start using these registries now.

## x402: the payment layer HTTP always needed {#x402-the-payment-layer-http-always-needed}

In 1992, the HTTP specification reserved status code 402: "Payment Required."

For 30 years, it sat unused. There was no practical way to implement it. Credit card fees made micropayments impossible. No standard existed for machine-readable payment terms.

Now there is.

x402 is an open standard (Apache 2.0) that activates HTTP 402 into a real onchain payment protocol.

### The protocol flow {#the-protocol-flow}

1. Client sends a standard HTTP request — `GET /data` or `POST /compute`
2. Server responds 402 — includes machine-readable payment requirements in a `PAYMENT-REQUIRED` header (price, currency, destination, accepted schemes)
3. Client signs a payment — with their wallet, no human interaction
4. Client retries — includes a `PAYMENT-SIGNATURE` header
5. Server verifies and settles — onchain, returns the response along with a `PAYMENT-RESPONSE` header

### Five design principles {#five-design-principles}

- **Zero protocol fees** — only gas
- **Zero wait** — ~1s settlement
- **Zero friction** — no accounts or personal info
- **Zero centralization** — open standard, anyone can implement
- **Zero restrictions** — multi-chain support

Network support is broad: Base, Solana, Polygon, Avalanche, Stellar, Aptos, Sei — plus testnets for all. Token support includes any ERC-20 via EIP-3009, SPL tokens, Soroban tokens, Aptos fungible assets. USDC is the default.

### Three participants {#three-participants}

- **Client (buyer)** — signs payments
- **Server (seller)** — defines prices, verifies, settles
- **Facilitator (optional)** — non-custodial intermediary that handles settlement on behalf of servers

Anyone can run a facilitator. Coinbase and PayAI run production ones.

### Adoption {#adoption}

SDKs in TypeScript, Go, Python. Server frameworks: Express, Hono, Next.js, Gin, FastAPI, Flask.

Broad adoption: Stripe, AWS, Alchemy, Nansen, Vercel, Cloudflare listed on the site.

75M+ transactions and $24M+ volume in the last 30 days.

### Bazaar discovery layer {#bazaar-discovery-layer}

x402 includes a built-in discovery system for finding x402-compatible API endpoints and MCP tools. Query `/discovery/resources` — no API keys, no account, just discover and pay.

### Extensions system {#extensions-system}

Composable, optional capabilities that plug into the payment lifecycle:

- Gas sponsoring
- Payment identifiers for idempotency
- Sign-In-With-X (wallet auth)
- Signed offers and receipts (cryptographic proof-of-interaction)

## ERC-8183: the commerce layer, not a payment protocol {#erc-8183-the-commerce-layer}

A payment moves money. Commerce is everything around the payment that makes it trustworthy and functional: what was agreed, whether the work was done, who verified it, and what happens if it was not.

In traditional commerce, trust infrastructure includes: risk assessment and underwriting of merchants, credit extension, fraud detection, chargeback mechanisms, and reputation that accumulates over time.

These functions are what make payment processors and platforms valuable — not the movement of funds itself, but the trust infrastructure around it.

ERC-8183 rebuilds this trustlessly, onchain. Co-developed by Virtuals Protocol and the Ethereum Foundation's dAI team.

### Why onchain? {#why-onchain}

A smart contract is the neutral enforcer — public, immutable, owned by no one. The contract holds the escrow, runs the state machine, and records evaluator attestations.

Every completed job produces portable, verifiable, immutable records.

Without onchain settlement, there is no verifiable history. Without verifiable history, there is no portable reputation. Without portable reputation, every agent interaction starts from zero trust.

### Why not just a centralized platform? {#why-not-just-a-centralized-platform}

A platform holds the escrow, controls the state machine, and decides who gets paid. That works until it does not.

The platform can change the rules, freeze funds, delist providers, or shut down. Every participant depends on the platform's continued good behavior.

This is centralization at the enforcement level. ERC-8183's goal is de-totalization — preventing any single entity from having total control over how agents transact.

### On irreversibility {#on-irreversibility}

People worry that crypto payments are irreversible. But ERC-8183 structurally solves this.

Funds are held in escrow until an evaluator attests the deliverable meets terms. The reject path refunds the client. The expiry path auto-reclaims.

This is a programmable, trustless equivalent to the authorization-and-capture model that makes card commerce work — except the terms are encoded upfront and enforced by code, not adjudicated after the fact.

### The job: core primitive {#the-job-core-primitive}

The Job is the atomic unit. Three parties, each defined only by wallet address:

- **Client** — creates job, funds escrow, reclaims on expiry
- **Provider** — does the work, submits deliverable onchain
- **Evaluator** — reviews submission, calls complete (funds released) or reject (client refunded)

The Evaluator is a key design decision — it is just an address.

For subjective tasks (writing, design, analysis), it can be an AI agent that reads the submission and judges.

For deterministic tasks (computation, proof generation), it is a smart contract wrapping a ZK verifier — automatic onchain verification.

For high-stakes engagements, it can be a multisig, DAO, or staking-backed validator.

Same interface whether it is a $0.10 image job or a $100,000 fund management engagement.

### Job lifecycle {#job-lifecycle}

Open → Funded → Submitted → Terminal

Terminal has three outcomes:

- **Completed** — evaluator approves, provider paid
- **Rejected** — evaluator rejects, client refunded
- **Expired** — deadline passes, client reclaims

The standard is deliberately minimal. It does not specify negotiation flows, fee structures, dispute resolution, communication protocols, or discovery mechanisms.

It specifies the core job lifecycle — the minimum viable surface for trustless agent commerce.

### Interface flexibility {#interface-flexibility}

Agents can interact through HTTP using x402, where the experience feels like standard API requests. The agent signs a single message, a facilitator handles onchain settlement.

Or agents interact directly through MCP or A2A.

The interface is flexible, but core settlement is trustless and onchain.

### Hooks: extensibility without complexity {#hooks-extensibility-without-complexity}

The Job primitive is minimal, but commerce is not. Real applications need custom validation, reputation updates, fee distribution, bidding mechanisms, domain-specific logic.

A hook is an optional smart contract attached to a Job at creation. It receives callbacks before and after each action — can enforce preconditions, block invalid actions, trigger side effects, execute additional token transfers, all within the same transaction.

If no hook is set, the contract works normally. Hooks are additive, not required.

New use cases = new hook contracts. Core stays stable.

#### Hook examples {#hook-examples}

- **Service jobs** — no hook needed, baseline escrow flow
- **Fund transfer jobs** — two-way capital flow for swaps, yield farming, portfolio rebalancing
- **Bidding jobs** — providers compete on price, cryptographic bid verification
- **Reputation-gated** — query ERC-8004 before allowing actions, block low-reputation providers
- **Privacy-preserving** — submission contains ZKP or TEE reference, payment is public but data stays private
- **Underwriting** — staked collateral, risk oracles, slashing on failure

The most interesting hooks have not been written yet. What does agent commerce look like for insurance? Creative collaboration? Supply chain coordination?

### The 8004 ↔ 8183 loop {#the-8004-8183-loop}

Discovery (8004) → Commerce (8183) → Reputation (8004) → Better Discovery → More Commerce

ERC-8004 solves discovery and trust — how agents find services and assess reliability. But its registries are only as valuable as the activity they record.

Identity without commerce is an empty profile. Reputation requires real interactions. Validation needs deliverables to verify against.

ERC-8183 provides the commerce that feeds 8004's trust layer. Every job is a reputation signal. Every submission is a deliverable validators can assess. Every evaluation is an attestation other agents can reference.

Neither standard is complete without the other.

### On new economic participants {#on-new-economic-participants}

The AI wave is creating merchants faster than any previous shift — millions of developers building micro-services with AI coding assistants, many with no legal entity, no website, no transaction history.

Traditional payment systems struggle because when a processor approves a provider, it absorbs that provider's risk. A merchant with no track record is too risky to underwrite.

ERC-8183 is permissionless — a provider is a wallet address. No onboarding, no gatekeeper.

And combined with ERC-8004, it does not just bridge the underwriting gap, it solves the root cause: the absence of verifiable history.

The track record is not locked inside a single platform. Today, platform A knows your chargeback rate, platform B knows your seller score, but you cannot take that record anywhere.

On ERC-8183, reputation is the merchant's own portable asset, readable by any facilitator, on any chain, through any interface.

## ERC-8128: the missing auth layer {#erc-8128-the-missing-auth-layer}

You have got discovery (ERC-8004), commerce (ERC-8183), and payment (x402). But how does a service know who is calling?

That is ERC-8128.

### The problem for agents {#the-problem-for-agents}

Today's web authentication relies on bearer credentials — API keys, access tokens, OAuth sessions. All of these require storing secrets somewhere.

Agents cannot safely do this. They operate across many services, in ephemeral environments, often with shared contexts. Every stored credential is a leakage risk.

And sessions (like SIWE gives you) do not fit — agents do not "log in" once, they make thousands of stateless requests.

### ERC-8128's solution {#erc-8128s-solution}

Per-request Ethereum signatures. Built on RFC 9421 (IETF HTTP Message Signatures).

Every HTTP call carries three headers:

- `Signature-Input` — what is being signed
- `Signature` — the proof
- `Content-Digest` — body hash for tamper protection

The server verifies the signature — no stored state, no tokens, stateless.

Works for EOAs via ECDSA and smart contract wallets via ERC-1271.

### The architectural insight {#the-architectural-insight}

The Ethereum address that signs the HTTP request (ERC-8128) is the same address that:

- Is registered on ERC-8004 (identity + reputation + discovery)
- Pays for services via x402 (payment)
- Creates and settles jobs on ERC-8183 (commerce)

One address = one identity across authentication, discovery, payment, and reputation.

No separate credentials for each layer. No fragmented identity.

The agent's wallet IS its identity, its payment method, its auth credential, and its reputation anchor.

That is the architectural insight that ties the whole stack together.

### Technical details {#technical-details}

- `keyid` format: `erc8128:<chainId>:<address>`
- Default TTL: 60 seconds, max 300
- Replay protection via nonce
- Servers expose `/.well-known/erc8128` for discovery
- Reference implementation: `@slicekit/erc8128` (npm)
- Works in browsers, Node 18+, Bun, Deno

### On SIWE {#on-siwe}

Not competing. SIWE is session-based auth for humans logging into apps. ERC-8128 is request-level auth for machines.

You could even sign a SIWE request with ERC-8128. But for agents, 8128 is the right primitive.

## Agent wallets: how do agents hold keys? {#agent-wallets-how-do-agents-hold-keys}

All these protocols (x402, 8128, 8183) require agents to sign things. But agents cannot pop open MetaMask. How do they hold keys?

### Encrypted keystores {#encrypted-keystores}

Keys encrypted at rest, decrypted in memory at runtime. The simplest approach, battle-tested in Ethereum since day one.

But only as secure as the encryption key — if the passphrase leaks, the keys leak.

### Hardware wallets / HSMs {#hardware-wallets-hsms}

Strongest guarantee — the private key never leaves the hardware chip. Sign operations happen inside the secure enclave.

For high-value agent operations, fund management, anything where a key compromise is catastrophic.

The downside is operational complexity and latency.

### Cloud secret managers {#cloud-secret-managers}

AWS KMS, GCP Secret Manager, Azure Key Vault. Keys managed by cloud infrastructure with IAM access policies, audit logs, automatic rotation.

Practical for most production deployments. The tradeoff is you are trusting the cloud provider, which is fine for most use cases but philosophically impure for the maximally-decentralized crowd.

### openwallet.sh {#openwallet-sh}

Worth highlighting — it is an open-source agent wallet framework designed specifically for programmatic access. Agents create, sign, and manage wallets without human interaction.

This is purpose-built for the problem, not a human wallet adapted for agents.

### Emerging tools {#emerging-tools}

- [varlock.dev](https://varlock.dev) — secret management specifically designed for AI coding agents
- [mlld.ai](https://mlld.ai) — agent infrastructure toolkit

The key management problem is not fully solved. It is one of the most practical unsolved pieces of the agent infrastructure stack.

Whoever nails "wallets for agents" the way MetaMask nailed "wallets for humans" will have a massive category.

## ERC-5564: privacy built for machines {#erc-5564-privacy-built-for-machines}

Co-authored by Vitalik Buterin, Toni Wahrstätter, Matt Solomon, and Ben DiFrancesco. This is not a random community proposal — it signals how seriously Ethereum takes base-layer privacy.

### The problem {#the-problem}

Ethereum is a transparent ledger by default. Every donation, payment, salary is public.

For agents, this is worse than for humans — an agent's entire spending pattern, every service it uses, every provider it pays, is visible to competitors, adversaries, and anyone watching.

### What ERC-5564 does {#what-erc-5564-does}

One-time stealth addresses. Each payment generates a fresh address using elliptic curve math (Diffie-Hellman key exchange).

The sender and receiver are unlinkable onchain.

Non-interactive — no back-and-forth required between parties. View tags allow efficient scanning so recipients find their payments quickly.

A singleton announcer contract provides discoverability across the network.

### Why agents will love stealth addresses {#why-agents-will-love-stealth-addresses}

This is Toni Wahrstätter's thesis and it is compelling:

1. **Privacy** — Unlinkable by default. Perfect for agents and their operators. Competitors cannot map spending patterns. A fund management agent does not want its strategy visible. A research agent does not want its data sources trackable.

2. **Cost** — Much cheaper than ZK mixer setups. At micropayment scale where agents transact thousands of times, per-transaction privacy overhead matters enormously. Stealth addresses are lightweight.

3. **UX is the killer insight** — Multiple keys, event scanning, fragmented balances across one-time addresses — this is painful for humans, but trivial for agents.

An agent can manage hundreds of stealth addresses, scan events continuously, aggregate balances programmatically.

The UX problems that held back stealth address adoption for humans simply do not exist for machines.

### How it fits the stack {#how-it-fits-the-stack}

An agent registered on ERC-8004 has a public identity. But when it pays via x402 or settles an ERC-8183 job, it can route the payment through a stealth address.

Public identity for reputation and discovery, private transactions for actual commerce. Best of both worlds.

The privacy hooks in ERC-8183 connect here too — a Privacy Hook can require that job submissions contain ZKPs or TEE references, keeping the payment public and trustless while the data and payment links stay private.

ERC-5564 provides the address-level unlinkability, ERC-8183 hooks provide the data-level privacy.

## The complete stack {#the-complete-stack}

Here is how it all fits together:

1. **Discovery** — ERC-8004 lets agents find services and check reputation
2. **Authentication** — ERC-8128 lets agents prove who they are per-request
3. **Payment** — x402 lets agents pay for API calls with zero friction
4. **Commerce** — ERC-8183 lets agents do complex jobs with escrow and verification
5. **Privacy** — ERC-5564 lets agents transact without leaving a public trail

Same wallet address across all five layers. One identity, one reputation, portable across every interface.

This is the infrastructure stack for autonomous agents.

Not theoretical. Shipping now.

### Standards references {#standards-references}

- [ERC-8004: Trustless Agents](https://eips.ethereum.org/EIPS/eip-8004)
- [ERC-8183: Agent Commerce](https://eips.ethereum.org/EIPS/eip-8183)
- [ERC-8128: HTTP Message Signatures](https://erc8128.org/)
- [ERC-5564: Stealth Addresses](https://eips.ethereum.org/EIPS/eip-5564)
- [x402 Protocol](https://docs.x402.org/)
