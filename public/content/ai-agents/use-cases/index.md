---
title: AI agent use cases on Ethereum
description: Real applications of autonomous AI agents on Ethereum — DeFi automation, agent-to-agent commerce, onchain governance, risk management, and more
lang: en
---

# AI agent use cases on Ethereum {#use-cases}

The following use cases represent what autonomous agents are doing on Ethereum today. Each is grounded in capabilities covered in depth elsewhere in this hub: programmable wallets, machine payments, onchain identity, and verifiable inference. The links below connect each use case to the infrastructure that makes it possible.

---

## Automated DeFi {#defi-automation}

DeFi protocols operate 24 hours a day, seven days a week. Human traders cannot. Autonomous agents fill this gap by monitoring positions, executing strategies, and responding to market conditions continuously without requiring human oversight for each action.

**What agents are doing today:**
- **Yield optimization** — agents monitor yield rates across lending protocols (Aave, Compound, Morpho) and rebalance positions to maximize returns, moving capital when rate differentials exceed a minimum threshold.
- **Liquidation protection** — agents watch collateralization ratios and automatically top up collateral or partially repay debt when a position approaches the liquidation threshold.
- **Portfolio rebalancing** — agents maintain target asset allocations by executing swaps when drift exceeds defined parameters.

**Infrastructure required:** [Agent wallets](/ai-agents/wallets/) with session keys scoped to specific protocols, [L2 deployment](/ai-agents/l2s/) for cost-effective high-frequency operations (Base or Arbitrum for deepest DeFi liquidity).

---

## Agent-to-agent commerce {#agent-commerce}

Agents can hire other agents for specialized tasks, paying per output using x402 machine payments. This enables a division of labor that mirrors human organizational structures — a coordinator agent delegates specialized subtasks to specialist agents and aggregates the results.

**Example pattern:**
1. A research coordinator agent identifies a data requirement.
2. It queries the ERC-8004 Identity Registry for agents declaring data retrieval capabilities.
3. It checks the Reputation Registry for agents with high task-completion scores.
4. It pays the selected specialist agent via x402 (USDC, per result).
5. It posts feedback to the ERC-8004 Reputation Registry after delivery.

No human is required at any step once the coordinator's strategy is initialized.

**Infrastructure required:** [Payments (x402)](/ai-agents/payments/) for machine-to-machine settlement, [Identity (ERC-8004)](/ai-agents/identity/) for agent discovery and reputation.

---

## Autonomous governance participation {#governance}

DAO governance requires ongoing attention: reading proposals, evaluating their alignment with stated goals, and casting votes before deadlines. Agents can automate this process by monitoring governance contracts for new proposals and voting according to a programmed strategy.

**What agents are doing today:**
- Reading proposal calldata and applying heuristic or model-based evaluation.
- Voting autonomously within a defined strategy (for example, always vote for proposals that reduce protocol fees below a threshold).
- Delegating voting power to agent addresses that operate on behalf of token-holding humans.

**Honest caveat:** Fully autonomous governance agents carry governance risk — a logic error or prompt injection can cause an agent to vote against its owner's intent. Production governance agents typically use human-in-the-loop escalation for high-stakes votes and operate autonomously only for routine, low-impact proposals.

**Infrastructure required:** [Agent wallets](/ai-agents/wallets/) with session keys scoped to governance contracts, [frameworks](/ai-agents/frameworks/) for proposal parsing and strategy execution.

---

## Risk management and monitoring {#risk-management}

Agents are well suited to continuous monitoring tasks that are tedious for humans but straightforward for software: watching for anomalous transaction patterns, detecting scam contracts, and alerting on unusual protocol behavior.

**What agents are doing today:**
- **Scam detection** — agents monitor token approval requests and flag interactions with known scam contracts or newly deployed contracts with no verified source code.
- **MEV protection** — agents route transactions through private mempools (Flashbots Protect) or MEV-resistant L2s (Unichain) to avoid sandwich attacks on swaps.
- **Position monitoring** — agents watch protocol health metrics (utilization rates, oracle price deviations) and alert operators when conditions move outside safe parameters.

**Infrastructure required:** [Frameworks](/ai-agents/frameworks/) for monitoring loops, [L2s](/ai-agents/l2s/) with appropriate finality guarantees for alert latency requirements.

---

## Creative work and onchain provenance {#creative-work}

AI-generated creative work has a provenance problem: anyone can claim that a specific model produced a specific output. Ethereum provides a public, timestamped, immutable record that allows creators and collectors to verify the origin and authenticity of AI-generated work.

**Example: Botto**
[Botto](https://botto.com/) is a decentralized autonomous artist — an AI system that generates visual art and mints it onchain. The community votes on which outputs to mint, and the agent's creative direction is influenced by onchain feedback. Botto's outputs have sold as NFTs, demonstrating that markets are willing to value AI-generated work when its provenance and production process are publicly verifiable.

**Broader pattern:** Artists and builders are using Ethereum to anchor AI-generated content to a specific model, timestamp, and generation parameters — creating a verifiable chain of custody for work that would otherwise be trivially forgeable.

**Infrastructure required:** [Verification](/ai-agents/verification/) for provenance proofs, [Agent identity (ERC-8004)](/ai-agents/identity/) for linking outputs to a verifiable agent identity.

---

## Agent identity verification {#identity-verification}

When agents interact with each other or with humans, counterparties need to verify what an agent is and whether it can be trusted. Without an identity layer, any agent can claim any capability.

**What ERC-8004 enables today:**
- Agent A looks up Agent B's declared capabilities in the ERC-8004 Identity Registry before deciding whether to hire it.
- Agent A checks Agent B's Reputation Registry entry for prior task-completion signals.
- Smart contracts condition payments or access on whether a calling agent holds a valid ERC-8004 registration.

This identity and reputation layer is still early — 20,000+ feedback entries as of early 2026, with Base accounting for most activity — but it provides the foundation for agent interactions that do not require trusting a centralized directory operator.

**Infrastructure required:** [Identity (ERC-8004)](/ai-agents/identity/), [Payments (x402)](/ai-agents/payments/).

---

## Further reading {#further-reading}

- [Getting started](/ai-agents/getting-started/) — Deploy your first autonomous agent on Ethereum.
- [Frameworks](/ai-agents/frameworks/) — The agent frameworks used to build these applications.
- [Data and stats](/ai-agents/data/) — Onchain metrics tracking the growth of the AI agent ecosystem.
- [FAQ](/ai-agents/faq/) — Answers to common questions about building AI agents on Ethereum.
