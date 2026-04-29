---
title: AI agent frameworks
description: A directory of agent frameworks with Ethereum integration, including GOAT, ElizaOS, Rig, Olas, GAME, and LangChain, with a decision guide for choosing between them
lang: en
faqItems:
  - question: "Which agent framework should I use?"
    answer: "For maximum EVM protocol coverage (200+ plugins), evaluate GOAT. For multi-platform social agents (Discord, Twitter, Telegram), evaluate ElizaOS. For Rust and latency-sensitive agents, evaluate Rig. For autonomous services with onchain coordination, evaluate Olas. For game-native or no-code deployments in the Virtuals ecosystem, evaluate GAME. For the widest Python ecosystem and LLM community, evaluate LangChain paired with GOAT's LangChain adapter. See the Frameworks decision guide for a full comparison."
  - question: "What is the difference between GOAT and ElizaOS?"
    answer: "GOAT is a protocol-first framework: it provides 200+ pre-built EVM protocol plugins (Uniswap, Aave, Compound, and more) and is directly compatible with the Vercel AI SDK. ElizaOS is a character-first framework: it excels at persistent identity and memory across social platforms (Discord, Twitter, Telegram, Farcaster) while also supporting onchain operations through its EVM plugin. Use GOAT when your agent is primarily a DeFi or protocol operator. Use ElizaOS when your agent needs to maintain a social presence."
---

# AI agent frameworks {#ai-agent-frameworks}

An agent framework handles three responsibilities: **the language model interface, tool orchestration, and the reasoning loop** that drives your agent between steps. The framework you choose shapes which wallet SDK integrates most naturally, what deployment patterns are available to you, and how your agent manages state across calls.

This page covers a selection of commonly-used frameworks with active Ethereum integration, with a decision guide and integration notes for each.

## Framework directory {#framework-directory}

| Framework | Language | Ethereum support | Best for |
| :--- | :--- | :--- | :--- |
| **[GOAT](https://ohmygoat.dev/)** | TypeScript | Native — 200+ protocol plugins | Production EVM agents, DeFi automation |
| **[ElizaOS](https://elizaos.github.io/eliza/)** | TypeScript | Plugin-based (EVM plugin, v2+) | Multi-platform social agents |
| **[Rig](https://rig.rs/)** | Rust | Via alloy / ethers-rs crates | High-performance, latency-sensitive agents |
| **[Olas](https://olas.network/)** | Python | Native — Pearl app store, onchain registry | Autonomous services with onchain coordination |
| **[GAME](https://docs.game.virtuals.io/)** | TypeScript / no-code | ACP v2.0 hook contracts (Base Mainnet) | Autonomous game agents, Virtuals ecosystem — ecosystem-specific, not general-purpose EVM |
| **[LangChain](https://python.langchain.com/)** | Python / TypeScript | Via GOAT's LangChain adapter or Web3 tools | General-purpose agents, largest community — use GOAT alongside LangChain for EVM tool coverage |

<Alert variant="warning" className="my-8">
<AlertContent>
<p className="mt-0"><strong>Maturity note</strong></p>
<p className="mt-2">This ecosystem evolves quickly. Package names, API surfaces, and EVM plugin versions can change between minor releases. Always verify integration patterns against each framework's official documentation before building.</p>
</AlertContent>
</Alert>

## Which framework should I choose? {#choosing-a-framework}

| If you need... | Use |
| :--- | :--- |
| Maximum EVM protocol coverage, 200+ pre-built plugins | **GOAT** |
| Multi-chain social agent (Discord, Twitter, Telegram) | **ElizaOS** |
| Rust runtime, type safety, or latency under 100ms | **Rig** |
| Autonomous agent services with onchain coordination | **Olas** |
| No-code or game-native deployment within the Virtuals ecosystem | **GAME** |
| Python ecosystem and widest LLM/tool community. Pair with GOAT's LangChain adapter for EVM | **LangChain** |

The examples on this page use **GOAT** because it provides 200+ pre-built EVM protocol plugins, is directly compatible with the Vercel AI SDK, and publishes native adapters for LangChain and LlamaIndex, making it a practical starting point for both TypeScript and Python-based pipelines.

Any of the frameworks above will work; choose based on your language and deployment requirements. Before connecting any of them to a wallet, consider how your agent system will distribute signing authority across agents. The patterns in the next section cover this for most production deployments.

## Multi-agent orchestration patterns {#orchestration-patterns}

The three patterns below cover most production multi-agent deployments.

### Coordinator and specialists {#coordinator-specialists}

The most common pattern for complex workflows:

```
CoordinatorAgent
├── ResearchAgent   (read-only, no keys)
├── AnalysisAgent   (computation, no keys)
└── ExecutorAgent   (holds session key, HITL approval above threshold)
```

In this pattern, **only the Executor holds signing authority**. Stateless specialists can be restarted or replaced without key rotation. For how to implement the human-in-the-loop (HITL) escalation logic, including the `onStepFinish` hook and durable pause patterns. See [Human-in-the-loop escalation](/ai-agents/wallets/#hitl) in the agent wallets guide.

### Shared-state coordination (onchain) {#shared-state-onchain}

A traditional shared database requires a trusted central coordinator, a single operator all agents agree to rely on. When agents are operated by different parties, or when no single operator should have privileged write access, a smart contract provides neutral shared state instead. 

All agents read from and write to the same onchain state, eliminating race conditions and producing a tamper-proof audit trail any party can verify. Use this pattern when multiple independent agents must coordinate over a shared resource and you need a canonical, censorship-resistant record that no single operator controls.

### Event-driven pipeline {#event-driven-pipeline}

Use this pattern when your agent system needs to react to onchain signals, like new blocks, price movements, or governance proposals, rather than run on a fixed schedule. Agents are chained in a linear sequence, each responsible for a single stage, so the signing authority stays contained in a single Executor at the end of the pipeline.

```
TriggerAgent  →  watches events or prices
     ↓
QueueAgent    →  manages task queue
     ↓
ExecutorAgent →  executes within rate limits and session key policy
     ↓
AuditAgent    →  verifies and logs result
```

## GOAT with the Vercel AI SDK {#goat-vercel-ai}

GOAT is the recommended starting point for production EVM agent deployments. It provides 200+ pre-built protocol plugins and is directly compatible with the Vercel AI SDK.

**Best for:** Production EVM agents that need broad DeFi protocol coverage out of the box, or TypeScript and Python teams that want a single framework compatible with the Vercel AI SDK, LangChain, and LlamaIndex.

<Alert variant="info" className="my-8">
<AlertContent>
<p className="mt-0"><strong>Package names</strong></p>
<p className="mt-2">GOAT adapter package names follow the pattern <code>@goat-sdk/adapter-[ai-sdk-name]</code>. Verify current package names against the <a href="https://github.com/goat-sdk/goat">GOAT repository</a> before installing.</p>
</AlertContent>
</Alert>

Install the required packages:

```bash
npm install @goat-sdk/core @goat-sdk/wallet-viem @goat-sdk/plugin-erc20 @goat-sdk/adapter-vercel-ai ai @ai-sdk/openai
```

The following example wires GOAT to the Vercel AI SDK. The model receives the onchain tools, and the session key policies in the smart account govern what can actually execute onchain.

```typescript
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai"
import { viem } from "@goat-sdk/wallet-viem"
import { erc20, USDC } from "@goat-sdk/plugin-erc20"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Pass your smart account client (kernelClient from the wallets guide) to GOAT.
const tools = await getOnChainTools({
  wallet: viem(kernelClient),
  plugins: [erc20({ tokens: [USDC] })],
})

// The model decides when and how to call the tools.
// Session key policies in the smart account govern what can actually execute onchain.
const { text } = await generateText({
  model: openai("gpt-4o"),
  tools,
  maxSteps: 5,
  prompt: "Check the USDC balance of my smart account and report the amount.",
})
```

`maxSteps` limits how many tool-call rounds the model may take before returning. Setting a low value on first integration is an important guardrail against runaway reasoning loops.

Beyond the ERC-20 plugin used in this example, GOAT provides 200+ protocol plugins covering Uniswap, Aave, Curve, Compound, 1inch, and more. See the [GOAT plugin registry](https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins) for the full list.

## ElizaOS {#elizaos}

ElizaOS is a plugin-based framework suited to multi-platform social agents that operate across Discord, Twitter, Telegram, and Farcaster while retaining persistent character and memory.

**Best for:** Agents that need persistent identity and memory across multiple social platforms while also performing onchain transactions.

**Ethereum integration:** The [`@elizaos/plugin-evm`](https://github.com/elizaOS/eliza/tree/main/packages/plugin-evm) plugin provides EVM chain support including smart account integration.

Install the required packages:

```bash
npm install @elizaos/core @elizaos/plugin-evm
```

Register the EVM plugin on your agent instance, passing your smart account client so the plugin can route transactions through it. The following pattern wires a `kernelClient` (from the [wallets guide](/ai-agents/wallets/)) into the ElizaOS agent at initialization.

```typescript
import { createAgent } from "@elizaos/core"
import { evmPlugin } from "@elizaos/plugin-evm"

const agent = await createAgent({
  character: myCharacter,
  plugins: [
    evmPlugin({
      walletClient: kernelClient, // smart account client from the wallets guide
    }),
  ],
})
```

Once registered, ElizaOS routes any onchain tool calls through the EVM plugin, which uses your wallet client to sign and submit transactions. See the [ElizaOS documentation](https://elizaos.github.io/eliza/docs/api/) for the current character configuration API and plugin lifecycle hooks.

## Rig {#rig}

Rig is a Rust-based framework suited to agents where latency and type safety are the primary constraints, like high-frequency trading agents, data pipeline agents, and performance-sensitive deployments.

**Best for:** Agents with latency constraints below 100ms, or teams that require Rust's ownership model and type safety guarantees for production infrastructure. Note that riglr, Rig's Ethereum extension, is under active development. Verify crate versions before production use.

**Ethereum integration:** Rig connects to Ethereum through **riglr** (pronounced "riggler"), its blockchain-specific extension. riglr provides the [`riglr-evm-tools`](https://github.com/riglr/riglr) crate, which wraps the [`alloy`](https://github.com/alloy-rs/alloy) library for type-safe transaction construction and signing. 

Add both to your `Cargo.toml`:

```toml
[dependencies]
rig-core = "0.5"
riglr = "0.1"
alloy = { version = "0.9", features = ["full"] }
tokio = { version = "1", features = ["full"] }
```

<Alert variant="info" className="my-8">
<AlertContent>
<p className="mt-0"><strong>Verify crate versions</strong></p>
<p className="mt-2">riglr is under active development. Confirm current crate names and versions against the <a href="https://github.com/riglr/riglr">riglr repository</a> before adding them to your project.</p>
</AlertContent>
</Alert>

riglr's `#[tool]` procedural macro generates the JSON schema for each tool directly from the Rust function signature and doc-comment, eliminating manual schema boilerplate. The `SignerContext` pattern keeps the wallet signing authority isolated from tool execution logic; the agent code never has direct access to the private key, enforcing key separation at the type system level.

The following illustrates both patterns. The stub body marks where the real alloy provider call goes; replace it with your actual chain query or transaction logic:

```rust
#[riglr::tool]
/// Returns the ETH balance of the given address in wei.
async fn get_eth_balance(address: String) -> Result<String, riglr::ToolError> {
    // alloy provider call executes within a SignerContext — key never exposed to tool logic
    Ok("balance_in_wei".to_string())
}
```

## Olas {#olas}

Olas provides a framework for autonomous agent services with onchain coordination. Agents are registered in an onchain registry, and the Pearl app store provides a deployment environment for autonomous services.

**Best for:** Long-running autonomous services that need onchain coordination, particularly in prediction markets, DAO tooling, and data pipelines. Note that Olas is a purpose-built ecosystem, not a general-purpose EVM development framework.

**Ethereum integration:** Native. Olas agents coordinate through onchain state and hold assets directly. The protocol provides built-in mechanisms for funding, registering, and managing autonomous services. For agents that participate in autonomous economic loops, like discovering services, paying for data, and posting reputation feedback, see [AI agents: Payments](/ai-agents/payments/).

Install the required packages and scaffold a new service:

```bash
pip install open-autonomy
autonomy init
```

Unlike the SDK-based frameworks above, an Olas service is defined as a finite state machine (FSM) skill across multiple files. The `autonomy init` command scaffolds this structure. See the [Olas documentation](https://docs.autonolas.network/) for the full service development workflow.

## GAME {#game}

GAME (Generative Autonomous Multimodal Entities) is a framework by Virtuals Protocol designed for autonomous game agents, interactive non-player characters (NPCs), and tokenized AI entities. It targets consumer entertainment and agent commerce on Base Mainnet rather than general-purpose EVM development.

**Best for:** Interactive NPCs, tokenized AI agents operating within the Virtuals ecosystem, and no-code agent deployments on Base. GAME is not suited to general Ethereum development. If you need EVM protocol access beyond the Virtuals ecosystem, use GOAT or ElizaOS instead.

**Ethereum integration:** GAME uses the **Agent Commerce Protocol (ACP) v2.0**, a hook-based architecture where commercial agreements between agents are executed through deployed hook contracts (such as `FundTransferHook`) on Base Mainnet. Agents do not interact with raw EVM transaction APIs. GAME abstracts that complexity through its internal provider layer. Access is available via the managed GAME Cloud interface (no-code) or the open-source SDK for custom integrations.

Install the required packages:

```bash
npm install @virtuals-protocol/game
```

See the [GAME SDK documentation](https://docs.game.virtuals.io/) for the current API for registering workers (tool-calling agents) and configuring hook contracts within your deployment.

## Production guardrails {#production-guardrails}

<Alert variant="info" className="my-8">
<AlertContent>
<p className="mt-0"><strong>Required before going to Mainnet</strong></p>
<p className="mt-2">Regardless of which framework you choose, apply pre-execution simulation, session key spending limits, and application-layer rate limiting before any production deployment. These patterns are documented with full implementation code in <a href="/ai-agents/getting-started/#set-guardrails">Getting started: Set guardrails</a>.</p>
</AlertContent>
</Alert>

## Frequently asked questions {#faq}

<ExpandableCard title="Which agent framework should I use?">

For maximum EVM protocol coverage (200+ plugins), evaluate **GOAT**. For multi-platform social agents (Discord, Twitter, Telegram), evaluate **ElizaOS**. For Rust and latency-sensitive agents, evaluate **Rig**. For autonomous services with onchain coordination, evaluate **Olas**. For game-native or no-code deployments in the Virtuals ecosystem, evaluate **GAME**. For the widest Python ecosystem and LLM community, evaluate **LangChain** paired with GOAT's LangChain adapter. See the [Frameworks decision guide](#choosing-a-framework) for a full comparison.

</ExpandableCard>

<ExpandableCard title="What is the difference between GOAT and ElizaOS?">

GOAT is a protocol-first framework: it provides 200+ pre-built EVM protocol plugins (Uniswap, Aave, Compound, and more) and is directly compatible with the Vercel AI SDK. ElizaOS is a character-first framework: it excels at persistent identity and memory across social platforms (Discord, Twitter, Telegram, Farcaster) while also supporting onchain operations through its EVM plugin. Use GOAT when your agent is primarily a DeFi or protocol operator. Use ElizaOS when your agent needs to maintain a social presence.

</ExpandableCard>

## Further reading {#further-reading}

- [GOAT quickstarts](https://github.com/goat-sdk/goat/tree/main/typescript/examples) — Full end-to-end examples wiring GOAT to different frameworks and wallet types
- [LangGraph](https://langchain-ai.github.io/langgraph/) — Durable agent state and `interrupt_before` / `interrupt_after` patterns for human-in-the-loop workflows
- [Create an AI agent that can transfer and swap tokens using ElizaOS](https://metamask.io/news/create-an-ai-agent-that-can-transfer-and-swap-tokens-using-elizaos) — MetaMask guide covering how to create an AI agent that can transfer and swap tokens. 
- [AI Agent Framework Security: LangChain, LangGraph, CrewAI & More](https://blog.securelayer7.net/ai-agent-frameworks/) — Common vulnerability patterns in agent frameworks, with real-world exploit examples and mitigation strategies for production deployments.

## Continue exploring the AI agents builder hub {#continue-exploring} 

### Start here {#start-here}

- [Why Ethereum](/ai-agents/ethereum/) — The technical case for using Ethereum as the settlement and coordination layer for AI agents.
- [Getting started](/ai-agents/getting-started/) — Fund an agent wallet, pick a framework, and deploy your first autonomous transaction.

### Core building blocks {#core-building-blocks}

- [Agent wallets](/ai-agents/wallets/) — Smart accounts, session keys, hardware trust layers, and the patterns for giving an agent safe spending authority.
- [Verification](/ai-agents/verification/) — zkML, TEEs, and onchain attestations: how to prove an agent behaved as claimed.
- [Payments](/ai-agents/payments/) — Machine-to-machine micropayments, streaming payments, and stablecoin rails for autonomous agent commerce.
- [Identity](/ai-agents/identity/) — Agent identity standards (ERC-8004), reputation systems, and proof-of-personhood mechanisms.

### Ecosystem and tooling {#ecosystem-and-tooling}

- [Use cases](/ai-agents/use-cases/) — What agents are doing on Ethereum today: DeFi automation, data markets, governance participation, and more.
- [Layer 2s](/ai-agents/l2s/) — How to choose an L2 for your agent based on cost, throughput, privacy, and ecosystem fit.
