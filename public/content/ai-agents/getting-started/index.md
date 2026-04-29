---
title: Getting started with AI agents
description: A developer on-ramp for building AI agents on Ethereum, from wallet creation to framework connection
lang: en
faqItems:
  - question: "How do I build my first AI agent on Ethereum?"
    answer: "Start with four steps: (1) Create a smart account wallet using an SDK like ZeroDev, Safe, or another ERC-4337 compatible provider, (2) fund it with testnet ETH from a Sepolia faucet, (3) connect an agent framework like GOAT or ElizaOS that provides the LLM interface and tool orchestration, and (4) configure session key spending policies as guardrails. The Getting started guide walks through each step with working code."
  - question: "Should I deploy on testnet or mainnet?"
    answer: "Start on Sepolia testnet. Testnet ETH has no real value, so experimentation carries no financial risk. Move to mainnet only after your session key policies, spending limits, and human-in-the-loop escalation logic are tested and verified. When you do move to mainnet, consider deploying on a Layer 2 network for lower transaction costs."
---

# Getting started with AI agents {#getting-started}

This guide walks through the four steps required to deploy your first autonomous agent on Ethereum: creating a smart account wallet, funding it, connecting an agent framework, and configuring spending guardrails. Each step links to dedicated pages for deeper implementation guidance.

<VideoWatch slug="ai-agents-ethereum-vito-rivabella" />

Before going further, it is worth understanding why this stack differs from standard Ethereum development. When a human signs a transaction, they act as a natural safety checkpoint. An autonomous agent does not. 

**Giving an agent an unconstrained private key is equivalent to giving it unlimited spending authority**—a single hallucination, a logic error, or a prompt injection can drain an account. The patterns below are designed to prevent that.

## Prerequisites {#prerequisites}

Before you start, have the following ready.

**A funded development environment.** You need [Node.js (v18+)](https://nodejs.org) and a package manager (npm, yarn, or pnpm). If you are new to Ethereum development, read the resources in [the Developers hub](/developers/) for context and resources about building on the network, and the [AI agents: Why Ethereum](/ai-agents/ethereum/) hub page for the specific capabilities your agent will use.

**An LLM API key.** Your agent framework needs access to a language model to drive its reasoning loop. The examples on this page use the OpenAI API, but any provider supported by the Vercel AI SDK (Anthropic, Google, Mistral, and others) works the same way. Set your key in your environment before running any code.

**Infrastructure API keys.** Account abstraction requires a bundler (to relay UserOperations) and optionally a Paymaster (to sponsor gas). [ZeroDev](https://zerodev.app/), [Pimlico](https://www.pimlico.io/), and [Alchemy](https://www.alchemy.com/) all offer free testnet tiers. Create a project and collect your RPC endpoints now.

Create a `.env` file at the root of your project and populate it before running any of the examples below:

```bash
# .env
OPENAI_API_KEY=sk-...
ZERODEV_PROJECT_ID=your-project-id
BUNDLER_RPC=https://rpc.zerodev.app/api/v2/bundler/<your-project-id>
PAYMASTER_RPC=https://rpc.zerodev.app/api/v2/paymaster/<your-project-id>
```

**A framework decision.** An agent framework handles the language model interface, tool orchestration, and the logic loop that drives your agent. The choice you make here shapes which wallet SDK integrates most naturally. 
*See [AI agents: Frameworks](/ai-agents/frameworks/) for a full comparison.* 

Popular options with native Ethereum support include:
- **[ElizaOS](https://elizaos.github.io/eliza/)** — Plugin-based, TypeScript, EVM plugin for smart account support.
- **[GOAT](https://ohmygoat.dev/)** — TypeScript, 200+ protocol plugins, compatible with all major EVM wallet SDKs.
- **[Rig](https://rig.rs/)** — Rust, high-performance, suited to agents with latency constraints.
- **[GAME](https://docs.game.virtuals.io/)** — Hook-based agent commerce framework (ACP v2.0) for the Virtuals Protocol ecosystem on Base. Not a general-purpose EVM framework.

If you are undecided, ElizaOS and GOAT are generally considered the most beginner-friendly for developers coming from a web3 background.

<Alert variant="warning" className="my-8">
<AlertContent>
<p className="mt-0"><strong>Warning!</strong></p>
<p className="mt-2">Before connecting any third-party plugin or protocol adapter to your agent, review what permissions each tool requests. A malicious or misconfigured plugin can instruct your agent to interact with unintended contracts. Only include plugins from sources you have audited or that are widely reviewed in the ecosystem.</p>
</AlertContent>
</Alert>

## Step 1: Create an agent wallet {#create-wallet}

**Do not give your agent a raw externally owned account (EOA) private key.** 

EOAs have no native concept of spending limits or allowlists. Under account abstraction standards (primarily [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337) and [EIP-7702](/roadmap/pectra/7702/)), you can instead deploy a **smart account** that enforces your agent's operational policy at the contract level. Use ERC-4337 when deploying a new agent from scratch (new contract address, maximum flexibility). Use EIP-7702 when upgrading an existing EOA without migrating assets. For a full comparison of both standards, session key policies, and production key management, see [AI agents: Wallets](/ai-agents/wallets/).

For a new agent deployment, an ERC-4337 smart account is the standard starting point.

### Deploying a smart account with ZeroDev {#zerodev-setup}

Deploying a smart account means creating a contract on Ethereum that your agent uses as its signing and spending address. Unlike a standard private key wallet, this contract enforces the policies you configure at the protocol level. This example uses ZeroDev because its Kernel account natively supports composable permission plugins well-suited to agent deployments. For a complete technical reference on smart account options and production key management, see [AI agents: Wallets](/ai-agents/wallets/).

[ZeroDev](https://zerodev.app/) provides the Kernel smart account, which uses composable permission plugins suited to agent deployments.

```bash
npm install @zerodev/sdk @zerodev/ecdsa-validator @zerodev/permissions viem
```

The key pattern is **owner-agent key separation**: the agent generates a local key pair and sends only its public address to the account owner. The owner configures a [session key](/ai-agents/wallets/#session-keys) (a policy-bounded signing credential) and hands it back to the agent. The agent never sees the master private key. Step 4 shows how to attach policies to the agent's key; the `account`, `agentSigner`, and `publicClient` defined here are referenced there.

```typescript
import { createKernelAccount, createKernelAccountClient } from "@zerodev/sdk"
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator"
import { ENTRYPOINT_ADDRESS_V07 } from "permissionless"
import { createPublicClient, http } from "viem"
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts"
import { sepolia } from "viem/chains"

// Shared public client — used in this step and in Step 4
export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(process.env.BUNDLER_RPC),
})

const ENTRY_POINT_ADDRESS = ENTRYPOINT_ADDRESS_V07
// This example targets EntryPoint v0.7 — v0.8 and v0.9 are also live.
// Verify the version your SDK and bundler target before production use.

// Agent generates its own key — the public address goes to the owner
export const agentPrivateKey = generatePrivateKey()
export const agentSigner = privateKeyToAccount(agentPrivateKey)

// Owner creates the Kernel account with the agent's key as the sudo signer
// In production, the owner's key (not the agent's) controls the sudo validator.
// This simplified example uses the agent key directly for testnet exploration.
export const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
  signer: agentSigner,
  entryPoint: ENTRY_POINT_ADDRESS,
})

export const account = await createKernelAccount(publicClient, {
  plugins: { sudo: ecdsaValidator },
  entryPoint: ENTRY_POINT_ADDRESS,
})

console.log("Smart account deployed at:", account.address)
```

For a complete walkthrough of the production owner/agent key handoff pattern, see [AI agents: Wallets](/ai-agents/wallets/).

### Alternatives {#wallet-alternatives}

If your project has different requirements, such as existing multi-signature governance, cross-chain operations, or a preference for hosted compliance guardrails, the following smart account implementations are also production-ready:

- **Safe (Allowance Module)** — Recommended for DAO treasury delegation. Decouples agent spending from the core multi-signature threshold.
- **Biconomy (Nexus / Smart Sessions)** — Best for agents that must operate across multiple chains with a single authorization payload.
- **Coinbase Agentic Wallets** — Turnkey deployment with built-in compliance checks on the Base network. **Note:** this is a hosted, custodial product—Coinbase infrastructure manages the private key, not your application. It trades self-sovereignty for rapid deployment and regulatory guardrails.

## Step 2: Fund your wallet {#fund-wallet}

Your agent's smart account needs ETH to pay for gas and to fulfill any onchain operations it runs. During development and learning, fund a testnet account rather than a Mainnet account. Testnet ETH has no real value, which means experimentation and mistakes carry no financial risk. 

The addresses in this section refer to your **agent's smart account address** (the contract address printed in Step 1), not the owner's externally owned account (EOA).

### Testnet (recommended starting point) {#testnet-funding}

<Alert variant="warning" className="my-8">
<AlertContent>
<p className="mt-0"><strong>Local testing with Anvil/Hardhat</strong></p>
<p className="mt-2">If you test your agent against a local blockchain node (like Anvil), be aware that LLMs can discover and use privileged debug methods (for example, `anvil_setBalance`) to "cheat" simulations rather than executing proper contract logic. To prevent this, route your agent's RPC calls through a restrictive proxy (like Veto) that blocks non-standard JSON-RPC methods. See the [AI agents: Wallets](/ai-agents/wallets/) for more on local testing security.</p>
</AlertContent>
</Alert>

Sepolia and Holesky closely mirror Mainnet behavior for contract execution purposes and are the standard development environments. (Holesky is the primary staking testnet and has different validator dynamics; for agent use cases that only involve smart contract interactions, this distinction does not matter.)

Sepolia is the recommended starting network. Use these faucets to fund your smart account address:

- **[pk910 Sepolia Faucet](https://sepolia-faucet.pk910.de/)** — Community-run, proof-of-work, no account required.
- **[Alchemy Sepolia Faucet](https://www.alchemy.com/faucets/ethereum-sepolia)** — Requires a free Alchemy account.
- **[sepoliafaucet.com](https://sepoliafaucet.com/)** — Requires an Alchemy account; may have rate limits during high demand.
- **[Google Cloud Web3 Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)** — No account required; most reliable rate limits.

For Holesky: [holesky-faucet.pk910.de](https://holesky-faucet.pk910.de/) (proof-of-work, takes several minutes) or the [Google Cloud Holesky faucet](https://cloud.google.com/application/web3/faucet/ethereum/holesky).

Request funds to your **smart account address** (printed by the Step 1 `console.log`), not to the owner's EOA. The smart account is what your agent uses to transact.

### Gas abstraction with Paymasters {#paymasters}

Rather than requiring your agent to hold ETH for gas, you can use a **Paymaster**,a contract that sponsors gas fees on behalf of the smart account. This simplifies agent operations significantly: the agent does not need to monitor its ETH balance or manage top-ups.

For step-by-step guidance on configuring a Paymaster alongside your smart account, including production-key management and testnet setup, see the [AI agents: Wallets](/ai-agents/wallets/#paymasters) page.

```typescript
import { createZeroDevPaymasterClient } from "@zerodev/sdk"

const paymasterClient = createZeroDevPaymasterClient({
  chain: sepolia,
  transport: http(ZERODEV_RPC),
})

const kernelClient = createKernelAccountClient({
  account,
  chain: sepolia,
  bundlerTransport: http(BUNDLER_RPC),
  paymaster: {
    getPaymasterData: (userOperation) =>
      paymasterClient.sponsorUserOperation({ userOperation }),
  },
})
```
A Paymaster is a smart contract that pays gas fees on behalf of your agent's account, removing the need for the agent to maintain an ETH balance for each operation. Paymasters are available on testnets through [ZeroDev](https://zerodev.app/), [Biconomy](https://www.biconomy.io/), and [Pimlico](https://www.pimlico.io/). On Mainnet, gas sponsorship is typically funded by your application budget. On Mainnet, gas sponsorship is funded from your application budget and configured through the same providers.

### L2 funding for low-cost development {#l2-funding}

Ethereum [Layer 2 networks](/ai-agents/l2s/) offer transaction fees low enough to support high-frequency agent-to-agent operations. Use them for cost-sensitive workflows.

To move testnet funds to an L2, use a community bridge such as [Across Protocol](https://across.to) (fastest, lowest fees) or [Hop Protocol](https://hop.exchange). You can also explore the full range of available bridges and L2s through the [Ethereum app explorer](/applications/).

See [AI agents: Layer 2s](/ai-agents/l2s/) for a breakdown of L2 characteristics by cost profile, privacy options, and ecosystem fit.

## Step 3: Connect a framework {#connect-framework}

Once your smart account is deployed and funded, pass it to your agent framework. Every framework exposes Ethereum operations, like balance checks, transfers, and contract calls, as structured tool definitions that the language model can invoke.

The framework's reasoning loop decides when to call them. Your smart account's session key policies govern what can actually execute onchain.

Two setup patterns are most common:

- **Wallet adapter pattern** — used by GOAT and ElizaOS. You wrap your `kernelClient` in a wallet adapter, generate a `tools` object from it, and pass that object directly to the LLM call.
- **Plugin pattern** — used by ElizaOS. Ethereum functionality is registered as a named plugin on the agent instance, and the framework handles tool routing internally.

### GOAT: recommended starting point {#goat-quickstart}

[GOAT](https://ohmygoat.dev/) is the recommended framework for EVM agent deployments. It provides 200+ pre-built protocol plugins and is compatible with the Vercel AI SDK. Install and wire it to the `kernelClient` from Step 1:

GOAT is used in the examples on this page because it requires the least configuration for developers who are new to agent deployments on EVM networks.

If you have already chosen a different framework, the pattern is the same. See [AI agents: Frameworks](/ai-agents/frameworks/) for setup guides specific to ElizaOS, Rig, and GAME.

```bash
npm install @goat-sdk/adapter-vercel-ai @goat-sdk/wallet-evm @goat-sdk/wallet-viem @goat-sdk/plugin-erc20
```

```typescript
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai"
import { sendETH } from "@goat-sdk/wallet-evm"
import { erc20 } from "@goat-sdk/plugin-erc20"
import { viem } from "@goat-sdk/wallet-viem"

// kernelClient from Step 1 is a viem-compatible wallet client
const tools = await getOnChainTools({
  wallet: viem(kernelClient),
  plugins: [
    sendETH(),
    erc20({ tokens: [USDC] }),
  ],
})

// Pass tools to your LLM call
const result = await generateText({
  model: openai("gpt-4o"),
  tools,
  prompt: "Check my ETH balance and send 0.001 ETH to vitalik.eth",
})
```

The `tools` object exposes every plugin operation as a typed function the language model can invoke. Your session key policy (set in Step 4) governs which of those operations can actually execute onchain.

For installation, adapter wiring, and working integration guides for ElizaOS, Rig, and GAME, see [AI agents: Frameworks](/ai-agents/frameworks/).

## Step 4: Set guardrails {#set-guardrails}

With a connected framework, your agent can sign and submit transactions. Before moving to any production-like environment, configure hard limits on what it is allowed to do. **This step is not optional.** An unconstrained agent with signing authority and no spending policy is a single logic error or prompt injection away from draining its account.

**Session keys** are the primary mechanism. A session key is a time-bounded, policy-bounded signing credential that authorizes the agent to act within a defined scope without exposing the master private key. 

A well-structured session key policy specifies a maximum spend per transaction, a rolling time-window budget, a contract allowlist, and a validity window. If the key is compromised, the blast radius is limited to those parameters—the smart contract will reject any UserOperation that violates them regardless of what the LLM instructs. 

[ERC-7715](https://eips.ethereum.org/EIPS/eip-7715) formalizes the wallet-level API for requesting these scoped permissions; it is in draft and being adopted by major smart wallet providers.

**Pre-execution simulation** is required before submitting any `writeContract` call. 

Simulation catches reverts, bad parameters, and policy violations before they cost gas or damage state. An agent that skips simulation is an agent that will eventually drain funds on a failed transaction.

Always simulate first:

```typescript
const simulation = await publicClient.simulateContract({
  address: contractAddress,
  abi: contractABI,
  functionName: "transfer",
  args: [recipient, amount],
  account: account.address,
})

if (!simulation.result) {
  throw new Error("Simulation failed — not executing")
}

// Execute only after simulation success
const hash = await kernelClient.writeContract(simulation.request)
```

Together, session key hard limits and application-layer rate limiting form a layered defense: the smart contract rejects policy violations at the protocol level, while your application catches anomalous spend patterns before they reach the contract.

**Soft rate limiting** adds an application-layer budget on top of session key hard limits:

```typescript
class AgentRateLimiter {
  private hourlySpend = 0
  private readonly hourlyLimit = parseEther("0.1") // 0.1 ETH per hour

  async checkAndRecord(txValue: bigint): Promise<void> {
    this.hourlySpend += Number(txValue)
    if (this.hourlySpend > Number(this.hourlyLimit)) {
      await this.pauseAndAlert("Hourly spend limit reached")
      throw new Error("Rate limit exceeded")
    }
  }

  private async pauseAndAlert(reason: string): Promise<void> {
    // Notify human operator and pause the agent
  }
}
```

**Human-in-the-loop escalation** handles the cases session key policies cannot. Operations directed at unknown addresses, amounts approaching the daily budget ceiling, or any policy change itself should pause execution and require a human decision before submitting. See [AI agents: Wallets — Human-in-the-loop escalation](/ai-agents/wallets/#hitl) for implementation patterns, including framework-specific hooks for the Vercel AI SDK and LangGraph.

For SDK-level implementation, including full session key code for ZeroDev, Safe, and Biconomy, multi-chain authorization payloads, and production key management patterns, see [AI agents: Wallets](/ai-agents/wallets/).

At this point you have a smart account deployed on Sepolia, a funded agent address, a framework connected to that account through GOAT, and a session key policy enforcing hard spending limits. That combination, including controlled identity, scoped authority, and a structured reasoning loop, is the minimum foundation for a production-ready autonomous agent on Ethereum. From here, head to [AI agents: Frameworks](/ai-agents/frameworks/) for deeper integration guides, or browse the sections below to explore wallets, verification, payments, and the wider ecosystem.

## Frequently asked questions {#faq}

<ExpandableCard title="How do I build my first AI agent on Ethereum?">

Start with four steps: (1) Create a smart account wallet using an SDK like ZeroDev, Safe, or another ERC-4337 compatible provider, (2) fund it with testnet ETH from a Sepolia faucet, (3) connect an agent framework like GOAT or ElizaOS that provides the LLM interface and tool orchestration, and (4) configure session key spending policies as guardrails. The Getting started guide walks through each step with working code.

</ExpandableCard>

<ExpandableCard title="Should I deploy on testnet or mainnet?">

Start on Sepolia testnet. Testnet ETH has no real value, so experimentation carries no financial risk. Move to mainnet only after your session key policies, spending limits, and human-in-the-loop escalation logic are tested and verified. When you do move to mainnet, consider deploying on a [Layer 2](/ai-agents/l2s/) network for lower transaction costs.

</ExpandableCard>

## Further reading {#further-reading}

- [AI Agents in Cryptocurrency: Architecture, Integration, and Best Practices](https://medium.com/@gwrx2005/ai-agents-in-cryptocurrency-architecture-integration-and-best-practices-a107429bf780) - A comprehensive overview of AI agents in cryptocurrency, covering their architecture, integration with blockchain, and best practices. 
- [When AI Meets Blockchain: A Guide to Securing the Next Frontier](https://quantstamp.com/blog/when-ai-meets-blockchain-a-guide-to-securing-the-next-frontier) - Exploring the security vulnerabilities introduced by integrating autonomous AI agents into blockchain ecosystems, and outlining mitigation strategies developers can use to safeguard. 

## Continue exploring the AI agents builder hub {#continue-exploring} 

### Start here {#start-here}

- [Why Ethereum](/ai-agents/ethereum/) — The technical case for using Ethereum as the settlement and coordination layer for AI agents.

### Core building blocks {#core-building-blocks}

- [Agent wallets](/ai-agents/wallets/) — Smart accounts, session keys, hardware trust layers, and the patterns for giving an agent safe spending authority.
- [Frameworks](/ai-agents/frameworks/) — A directory of agent frameworks with Ethereum support and guidance on when to use each.
- [Verification](/ai-agents/verification/) — zkML, TEEs, and onchain attestations: how to prove an agent behaved as claimed.
- [Payments](/ai-agents/payments/) — Machine-to-machine micropayments, streaming payments, and stablecoin rails for autonomous agent commerce.
- [Identity](/ai-agents/identity/) — Agent identity standards (ERC-8004), reputation systems, and proof-of-personhood mechanisms.

### Ecosystem and tooling {#ecosystem-and-tooling}

- [Use cases](/ai-agents/use-cases/) — What agents are doing on Ethereum today: DeFi automation, data markets, governance participation, and more.
- [Layer 2s](/ai-agents/l2s/) — How to choose an L2 for your agent based on cost, throughput, privacy, and ecosystem fit.
