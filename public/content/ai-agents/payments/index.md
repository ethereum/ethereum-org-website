---
title: Machine payments with x402
description: How AI agents pay for compute, data, and API calls using the x402 protocol on Ethereum and layer 2 networks
lang: en
template: ai-agents
emoji: ":money_with_wings:"
sidebarDepth: 2
image: /images/ai-agents/hero-image.png
alt: Machine payments with x402 on Ethereum
summaryPoints:
  - "Per-request machine-to-machine payments via HTTP 402"
  - "Pay-per-use, with no accounts, subscriptions, or human approval"
  - "Production-ready, with adoption across cloud and payments providers"
---

# Machine payments with x402 {#machine-payments}

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

| Metric | Status (early 2026) |
| :--- | :--- |
| **Protocol version** | Production-ready |
| **Enterprise integrations** | Google Cloud, Stripe, Cloudflare |
| **SDKs** | TypeScript (`@x402/fetch`), Python (`x402`), Go (`github.com/coinbase/x402/go`), Java |
| **ERC-8004 integration** | x402 payment receipts can be logged to the ERC-8004 AI agent reputation registry (Learn about ERC-8004 and onchain agent identity on the [AI agents: Identity](/ai-agents/identity/) page) |

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

| Stablecoin | Transfer method | Notes |
| :--- | :--- | :--- |
| USDC | ERC-3009 | Preferred — single signature, no approval step |
| USDT | Permit2 | One-time on-chain approval required; then gasless |
| DAI | Permit2 | One-time on-chain approval required; then gasless |
| Any ERC-20 | Permit2 | x402 supports any token a facilitator chooses to accept |

<Alert variant="info" className="my-8">
<AlertContent>
<p className="mt-0">For supported tokens, contract addresses, and transfer method requirements per network, see the <a href="https://docs.x402.org/core-concepts/network-and-token-support">x402 network and token support documentation</a>.</p>
</AlertContent>
</Alert>

## Choosing a payment model {#payment-models}

x402 is optimized for **discrete, per-request micropayments** — each HTTP call generates an independent on-chain settlement. This works well for permissionless API access, one-off agent tasks, and deployments where agent and server have no prior relationship.

For agents making high-frequency calls to a single provider — continuous data streams, inference endpoints polled dozens of times per minute, or long-running collaborative tasks — settling every request on-chain becomes inefficient. These workloads suit a session-based model better.

**Stripe's [Machine Payments Protocol (MPP)](https://stripe.com/payments/mpp)** is the primary production alternative for streaming use cases. MPP establishes an authenticated payment session, aggregates micro-transactions off-chain using Shared Payment Tokens (SPTs), and settles in bulk at session end. It supports stablecoin, fiat, and corporate card rails within the same session, and includes enterprise compliance tooling (fraud controls, tax reporting) built in.

| | x402 | Stripe MPP |
| :--- | :--- | :--- |
| **Settlement** | Per-request, on-chain | Session-based, off-chain aggregation |
| **Best for** | Discrete micropayments, permissionless APIs | High-frequency streaming, long-running tasks |
| **Payment rails** | Any ERC-20 (EVM), SPL (Solana), SEP-41 (Stellar) | Stablecoin, fiat, corporate card |
| **Permissionless** | Yes — no account required | No — requires Stripe account |
| **Compliance** | None built in | Enterprise fraud, tax, and reporting tooling |
| **Onchain transparency** | Every payment settled onchain | Aggregated; onchain only at session settlement |

For a detailed architectural comparison, see [x402 vs. Stripe MPP: choosing payment infrastructure for AI agents](https://workos.com/blog/x402-vs-stripe-mpp-how-to-choose-payment-infrastructure-for-ai-agents-and-mcp-tools-in-2026).

---

## Frequently asked questions {#faq}

<ExpandableCard title="What is x402?">

x402 is a machine-to-machine payment protocol built on the HTTP 402 status code. An agent requests a resource, the server returns a 402 with payment terms (stablecoin, amount, address), the agent signs an **'ERC-3009: Transfer With Authorization' payment authorization**, and retries the request with the payment header. The server verifies the signature and delivers the resource. No account, no subscription, no human approval. Production-ready since Q1 2026.

</ExpandableCard>

## Further reading {#further-reading}

- [ERC-3009: Transfer with authorization](https://eips.ethereum.org/EIPS/eip-3009) — Full specification for the signature-based token transfer primitive that makes gasless, single-round-trip payments possible in x402
- [x402 vs. Stripe MPP: choosing payment infrastructure for AI agents](https://workos.com/blog/x402-vs-stripe-mpp-how-to-choose-payment-infrastructure-for-ai-agents-and-mcp-tools-in-2026) — Architectural comparison of discrete vs. session-based payment models for high-frequency and streaming agent workloads
- [x402 documentation](https://docs.x402.org/) — x402.org
- [Agentic Payments and Crypto’s Emerging Role in the AI Economy](https://www.galaxy.com/insights/research/x402-ai-agents-crypto-payments) — How standards like x402 aim to make AI agents full-fledged economic actors, and the potential to power non-crypto applications.

