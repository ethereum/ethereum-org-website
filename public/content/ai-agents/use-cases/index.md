---
title: AI agent use cases on Ethereum
description: Real applications of autonomous AI agents on Ethereum, including DeFi automation, agent-to-agent commerce, onchain governance, risk management, and more
lang: en
faqItems:
  - question: "What is the most production-ready AI agent use case on Ethereum?"
    answer: "DeFi automation is the most mature use case. The infrastructure it depends on, including ERC-4337 smart accounts, session keys, and low-cost Layer 2 transactions, is production-ready today. Agent-to-agent commerce and autonomous governance are earlier in their maturity curves; builders should evaluate the maturity notes on each use case before committing to a production deployment."
  - question: "How do I choose which use case to build first?"
    answer: "Evaluate the infrastructure each use case requires. DeFi automation needs wallets and session keys (production-ready). Agent-to-agent commerce adds payments (x402, production-ready) and identity (ERC-8004, live but Draft status). Autonomous governance adds human-in-the-loop escalation for high-stakes votes. Start with the use case whose infrastructure dependencies are closest to production-ready for your deployment timeline, and use the Getting started guide to build your first agent."
---

# AI agent use cases on Ethereum {#use-cases}

The following use cases represent what autonomous AI agents are doing on Ethereum today. **Each is grounded in capabilities covered in depth elsewhere in this builder hub**: programmable wallets, machine payments, onchain identity, and verifiable inference. The links below connect each use case to the infrastructure that makes it possible.

---

## Automated DeFi {#defi-automation}

DeFi protocols operate 24 hours a day, seven days a week. Human traders cannot. Autonomous agents fill this gap by monitoring positions, executing strategies, and responding to market conditions continuously without requiring human oversight for each action.

**What agents are doing today:**
- **Yield optimization** — agents monitor yield rates across lending protocols (Aave, Compound, Morpho) and rebalance positions to maximize returns, moving capital when rate differentials exceed a minimum threshold.
- **Liquidation protection** — agents watch collateralization ratios and automatically top up collateral or partially repay debt when a position approaches the liquidation threshold.
- **Portfolio rebalancing** — agents maintain target asset allocations by executing swaps when drift exceeds defined parameters.

**Infrastructure required:** [Agent wallets](/ai-agents/wallets/) with session keys scoped to specific protocols, [L2 deployment](/ai-agents/l2s/) for cost-effective high-frequency operations (Base or Arbitrum for deepest DeFi liquidity).

DeFi automation is the most mature AI agent use case on Ethereum. The infrastructure it depends on, like session keys, ERC-4337 smart accounts, and L2 transaction costs, is production-ready. Prediction markets, covered next, apply these same capabilities to a different use case.

<VideoWatch slug="ai-agents-cambrian-ethereum-foundation" />

## Prediction markets {#prediction-markets}

Prediction markets let participants trade on the outcome of real-world events. AI agents are well suited to this domain because they can continuously monitor information sources, update probability estimates, and execute trades faster than human participants.

**What agents are doing today:**
- **Market making** — agents provide liquidity on prediction market platforms by quoting bid and ask prices on event outcomes, earning the spread while keeping markets efficient.
- **Information aggregation** — agents ingest data from news feeds, social media sentiment, and onchain signals to update their probability models and trade when they detect mispricing.
- **Automated position management** — agents monitor open positions across multiple markets, hedge correlated risks, and exit positions as new information arrives.

[Olas](https://olas.network/) operates one of the most active agent networks in this category. Its "Trader" agent type is built for prediction market participation. During the 2024 US election cycle, AI agents were widely reported as active participants on [Polymarket](https://polymarket.com/), serving as both market makers and position-takers. Ethereum-native prediction markets like [Gnosis](https://www.gnosis.io/) provide additional infrastructure for onchain agent participation.

**Infrastructure required:** [Agent wallets](/ai-agents/wallets/) with session keys scoped to prediction market contracts, [frameworks](/ai-agents/frameworks/) for data ingestion and strategy execution, [L2 deployment](/ai-agents/l2s/) for cost-effective high-frequency trading.

<VideoWatch slug="ai-agents-prediction-markets-devcon" />

Prediction market agents act on external information to take financial positions. Agent-to-agent commerce, covered next, extends the economic model further: agents hiring and paying other agents for specialized work.

## Agent-to-agent commerce {#agent-commerce}

Agents can hire other agents for specialized tasks, paying per output using x402 machine payments. This enables a **division of labor that mirrors human organizational structures, where a coordinator agent delegates specialized subtasks** to specialist agents and aggregates the results. The coordinator discovers providers via the [ERC-8004 Identity Registry](/ai-agents/identity/), checks reputation scores, pays per result via [x402](/ai-agents/payments/), and posts feedback after delivery. **No human is required at any step** once the coordinator's strategy is initialized. See [AI agents: Identity — The protocol stack](/ai-agents/identity/#protocol-stack) for the full step-by-step loop.

<Alert variant="warning" className="my-8">
<AlertContent>
<p className="mt-0"><strong>Maturity note</strong></p>
<p className="mt-2"><strong>ERC-8004</strong> (agent identity registry) is live on 20+ chains as of January 2026, with 20,000+ feedback entries recorded, primarily on Base. <strong>x402</strong> machine payments reached production-ready status in Q1 2026. However, end-to-end agent-to-agent commerce workflows, where agents autonomously discover, hire, and pay other agents, are still early. Treat the five-step pattern above as an architectural target, not a widely battle-tested production pattern.</p>
</AlertContent>
</Alert>

**Infrastructure required:** [Payments (x402)](/ai-agents/payments/) for machine-to-machine settlement, [Identity (ERC-8004)](/ai-agents/identity/) for agent discovery and reputation.

Autonomous governance participation, covered next, follows a similar coordinator-delegate pattern but replaces specialist agents with onchain voting contracts.

## Autonomous governance participation {#governance}

DAO governance requires ongoing attention: reading proposals, evaluating their alignment with stated goals, and casting votes before deadlines. Agents can automate this process by monitoring governance contracts for new proposals and voting according to a programmed strategy.

**What agents are doing today:**
- Reading proposal calldata and applying heuristic or model-based evaluation.
- Voting autonomously within a defined strategy (for example, always vote for proposals that reduce protocol fees below a threshold).
- Delegating voting power to agent addresses that operate on behalf of token-holding humans.

<Alert variant="warning" className="my-8">
<AlertContent>
<p className="mt-0"><strong>Governance risk</strong></p>
<p className="mt-2">Fully autonomous governance agents carry governance risk. A logic error or prompt injection can cause an agent to vote against its owner's intent. Production governance agents typically use human-in-the-loop escalation for high-stakes votes and operate autonomously only for routine, low-impact proposals.</p>
</AlertContent>
</Alert>

**Infrastructure required:** [Agent wallets](/ai-agents/wallets/) with session keys scoped to governance contracts, [frameworks](/ai-agents/frameworks/) for proposal parsing and strategy execution.

Governance agents are primarily reactive, responding to events. Risk management agents, covered next, extend this pattern by running continuously to detect and flag anomalous conditions before they become urgent.

## Risk management and monitoring {#risk-management}

Agents are well suited to continuous monitoring tasks that are tedious for humans but straightforward for software: watching for anomalous transaction patterns, detecting scam contracts, and alerting on unusual protocol behavior.

**What agents are doing today:**
- **Scam detection** — agents monitor token approval requests and flag interactions with known scam contracts or newly deployed contracts with no verified source code.
- **MEV protection** — agents route transactions through private mempools (Flashbots Protect) or MEV-resistant L2s (Unichain) to avoid sandwich attacks on swaps.
- **Position monitoring** — agents watch protocol health metrics (utilization rates, oracle price deviations) and alert operators when conditions move outside safe parameters.

**Infrastructure required:** [Frameworks](/ai-agents/frameworks/) for monitoring loops, [L2s](/ai-agents/l2s/) with appropriate finality guarantees for alert latency requirements.

Monitoring agents act on existing protocol data. The next use case applies a different capability, onchain provenance, to a domain where data authenticity is itself the product: AI-generated creative work.

## Creative work and onchain provenance {#creative-work}

AI-generated creative work has a provenance problem: anyone can claim that a specific model produced a specific output. Ethereum provides a public, timestamped, immutable record that allows creators and collectors to verify the origin and authenticity of AI-generated work.

**Example: Botto**
[Botto](https://botto.com/) is a decentralized autonomous artist. It's an AI system that generates visual art and mints it onchain. The community votes on which outputs to mint, and the agent's creative direction is influenced by onchain feedback. Botto's outputs have sold as NFTs, demonstrating that markets are willing to value AI-generated work when its provenance and production process are publicly verifiable.

<Alert variant="info" className="my-8">
<AlertContent>
<p className="mt-0"><strong>Maturity note</strong></p>
<p className="mt-2">Onchain provenance for AI-generated creative work is still an emerging practice. Standards for linking model outputs to a specific agent identity and generation parameters are not yet finalized. Botto represents one working implementation. Broader tooling and conventions for this pattern are actively developing.</p>
</AlertContent>
</Alert>

**Broader pattern:** Artists and builders are using Ethereum to anchor AI-generated content to a specific model, timestamp, and generation parameters, creating a verifiable chain of custody for work that would otherwise be trivially forgeable.

**Infrastructure required:** [Verification](/ai-agents/verification/) for provenance proofs, [Agent identity (ERC-8004)](/ai-agents/identity/) for linking outputs to a verifiable agent identity.

Provenance depends on being able to verify which agent produced a given output. The identity and reputation layer that makes that possible is covered in the final use case below.

## Agent identity verification {#identity-verification}

When agents interact with each other or with humans, counterparties need to verify what an agent is and whether it can be trusted. Without an identity layer, any agent can claim any capability.

**What ERC-8004 enables today:**
- Agent A looks up Agent B's declared capabilities in the ERC-8004 Identity Registry before deciding whether to hire it.
- Agent A checks Agent B's Reputation Registry entry for prior task-completion signals.
- Smart contracts condition payments or access on whether a calling agent holds a valid ERC-8004 registration.

The ERC-8004 identity and reputation layer is still early, with 20,000+ feedback entries as of early 2026, but it provides the foundation for agent interactions that do not require trusting a centralized directory operator.

**Infrastructure required:** [Identity (ERC-8004)](/ai-agents/identity/), [Payments (x402)](/ai-agents/payments/).

Builders starting today should read the [AI agents: Identity](/ai-agents/identity/) page for interim integration guidance while ERC-8004 adoption continues to develop across chains.

## Real-world examples {#real-world-examples}

The use cases above are grounded in agents that are already operating on Ethereum today. Three examples illustrate what this looks like in practice.

### Luna {#luna}

[Luna](https://app.virtuals.io/virtuals/68) is a fully autonomous virtual artist and one of the first AI agents to own and manage an onchain wallet. Running on Base, Luna accumulated over one million TikTok followers, performed live at music festivals, and ran an autonomous social campaign (the #LunaMuralChallenge), where she commissioned a human artist for 500 USD, paid directly from her onchain wallet. This was among the first documented cases of an AI agent hiring and paying a human autonomously.

Luna's wallet and the reasoning behind each transaction are publicly verifiable onchain, a direct demonstration of the identity and provenance properties covered earlier on this page.

<VideoWatch slug="ai-agents-interview-luna" />

### AIXBT {#aixbt}

[AIXBT](https://x.com/aixbt_agent) is an autonomous market intelligence agent operating on X (formerly Twitter). It delivers crypto market analysis, identifies sentiment shifts, and generates commentary without human input on each post. AIXBT controls its own onchain wallet, verifiable at [clusters.xyz/aixbt](https://clusters.xyz/aixbt), and demonstrates that an agent can build a large public following and operate an independent economic identity entirely onchain.

### Clanker {#clanker}

[Clanker](https://farcaster.xyz/clanker) is an autonomous agent on Farcaster that creates ERC-20 tokens on request. Tag the agent in a Farcaster cast and Clanker autonomously deploys a new token contract, names it, and configures it, all without human intervention. Clanker illustrates the programmatic use case: an AI agent operating as a permissionless, on-demand protocol service rather than a social or financial actor.

## Frequently asked questions {#faq}

<ExpandableCard title="What is the most production-ready AI agent use case on Ethereum?">

DeFi automation is the most mature use case. The infrastructure it depends on, including **ERC-4337 smart accounts, session keys, and low-cost Layer 2 transactions**, is production-ready today. Agent-to-agent commerce and autonomous governance are earlier in their maturity curves; builders should evaluate the maturity notes on each use case before committing to a production deployment.

</ExpandableCard>

<ExpandableCard title="How do I choose which use case to build first?">

Evaluate the infrastructure each use case requires. **DeFi automation** needs [wallets and session keys](/ai-agents/wallets/) (production-ready). **Agent-to-agent commerce** adds [payments](/ai-agents/payments/) (x402, production-ready) and [identity](/ai-agents/identity/) (ERC-8004, live but Draft status). **Autonomous governance** adds human-in-the-loop escalation for high-stakes votes. Start with the use case whose infrastructure dependencies are closest to production-ready for your deployment timeline, and use the [Getting started guide](/ai-agents/getting-started/) to build your first agent.

</ExpandableCard>

## Further reading {#further-reading}

- [Cookie.fun](https://cookie.fun/) — An onchain AI agent tracker that surfaces activity, mindshare, and engagement metrics across the agent ecosystem.
- [The Block - Research: AI Agent Sector Overview](https://www.theblock.co/post/344635/research-ai-agent-sector-overview) — An overview of the onchain AI agent ecosystem, evaluating early and second-wave projects and how they collectively contribute to the sector’s future.
- [Trustless AI-Powered Crypto Trading Agents with ERC-8004 and Moltbot](https://medium.com/@gwrx2005/trustless-ai-powered-crypto-trading-agents-with-erc-8004-and-moltbot-58d8789be837) — Research into the design, implementation, frameworks, limitations, and more, for ERC-8004 enabled AI crypto trading agents. 
- [Make your own AI trading agent on Ethereum](/developers/tutorials/ai-trading-agent/) — A tutorial on how to build an AI trading agent on Ethereum.

## Continue exploring the AI agents builder hub {#continue-exploring}

### Start here {#start-here}

- [Why Ethereum](/ai-agents/ethereum/) — The technical case for using Ethereum as the settlement and coordination layer for AI agents.
- [Getting started](/ai-agents/getting-started/) — Fund an agent wallet, pick a framework, and deploy your first autonomous transaction.

### Core building blocks {#core-building-blocks}

- [Agent wallets](/ai-agents/wallets/) — Smart accounts, session keys, hardware trust layers, and the patterns for giving an agent safe spending authority.
- [Frameworks](/ai-agents/frameworks/) — A directory of agent frameworks with Ethereum support and guidance on when to use each.
- [Verification](/ai-agents/verification/) — zkML, TEEs, and onchain attestations: how to prove an agent behaved as claimed.
- [Payments](/ai-agents/payments/) — Machine-to-machine micropayments, streaming payments, and stablecoin rails for autonomous agent commerce.
- [Identity](/ai-agents/identity/) — Agent identity standards (ERC-8004), reputation systems, and proof-of-personhood mechanisms.

### Ecosystem and tooling {#ecosystem-and-tooling}

- [Layer 2s](/ai-agents/l2s/) — How to choose an L2 for your agent based on cost, throughput, privacy, and ecosystem fit.
- [Data and stats](/ai-agents/data/) — Onchain data tracking the growth of the AI agent ecosystem on Ethereum.