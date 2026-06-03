---
title: "AI agents will replace dApps"
description: "jacobc.eth, former head of product at MetaMask, argues that the dApp model has reached its total addressable market and that AI agents with EIP-7702 smart accounts, EIP-7715 permissions, and ERC-8004 registries represent the next user interface layer for Ethereum."
lang: en
youtubeId: "napbOFIbO-I"
uploadDate: 2026-04-02
duration: "0:22:57"
educationLevel: intermediate
topic:
  - "ai"
  - "agents"
  - "wallets"
  - "use-cases"
format: talk
author: EthCC
breadcrumb: "AI agents will replace dApps"
---

**jacobc.eth**, former head of product and lead of operations at MetaMask, presents at EthCC on why the dApp model for using Ethereum has fundamentally saturated and how AI agents — powered by EIP-7702, EIP-7715 permissions, and ERC-8004 registries — represent the next interface layer.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=napbOFIbO-I) published by EthCC. It has been lightly edited for readability.*

#### The dApp model is saturated (0:09) {#dapp-model-saturated}

The thesis is that the dApp model — using a browser extension to inject JavaScript into websites — has reached its total addressable market. The 2022 peak was essentially the ceiling for this paradigm. If you go back 10 years and look at the use cases discussed at Devcon, almost none delivered what the Ethereum community believed they would. User adoption is declining even as asset prices have risen. This looks like the Linux adoption curve: Linux won infrastructure hegemony — the entire web runs on it — but never broke through to the user layer. The user layer was ceded to proprietary, centralized technology.

#### Why agents are different now (4:30) {#why-agents-different}

Several technologies have converged to make AI agents viable as an interface layer. EIP-7702 and the Pectra upgrade allow EOA accounts to upgrade to smart accounts, solving the inertia problem — existing liquidity is now upgradable. EIP-7715 and EIP-7710 provide delegation and permission frameworks so agents can get scoped authority from the user's existing wallet. ERC-8004 and ERC-8083 create registries for verified AI agents and verified contracts. And language models are now good enough to handle complex onchain tasks.

#### A general-purpose agent for Ethereum (7:00) {#general-purpose-agent}

The product built on these primitives (Coinfellow) is a mobile-first, chat-based interface that can access any DeFi contract or execute any onchain action through a single conversational interface. The dApp layer never translated to mobile — if you look at the stats of browser-extension-based wallets, the mobile experience simply does not work for dApps. An agentic interface changes this: a user can say "swap some USDC for ETH" and the agent handles routing, presents a swap UI element within the chat context, and executes the transaction.

#### Smart suggestions and automation (10:30) {#smart-suggestions}

Beyond executing individual commands, the agent can monitor wallet positions proactively. It can suggest that a lending position is approaching liquidation and offer to add collateral. A user can say "sell all my meme coins to buy more ETH" and the agent identifies the relevant tokens, confirms them, and executes the batch swap. These interactions stay within a familiar mobile-first interface rather than requiring navigation across multiple dApp frontends.

#### EIP-7710 delegations and smart accounts (14:00) {#eip-7710-delegations}

The product uses two approaches: EIP-7710/7715 delegations from existing wallets, and MetaMask Smart Account Kit for deploying new embeddable smart accounts. Delegations give the agent scoped permissions to automate specific actions — the user retains full control and can revoke at any time. The MetaMask smart account can be deployed directly within the agent interface for users who do not already have a wallet.

#### Self-sovereign agentic environments (17:00) {#self-sovereign-environments}

Security requires more than onchain permission scoping. The model itself must run in a trusted execution environment that is self-sovereign. Users need assurance that the model running is the model they consented to, and that the agentic environment is controlled by the user rather than by a centralized operator. Creating a new layer of custodial centralization would represent a profound security risk.

#### Agentic onboarding (19:30) {#agentic-onboarding}

The onboarding flow demonstrates the full stack: sign up with an existing wallet or deploy a new smart wallet through SSO credentials. The agent gets context on the wallet's holdings and starts making smart move suggestions — identifying assets not earning yield, positions that could be optimized, and opportunities for discovery. The system prompts are designed to be transparent and verifiable, not opaque marketing funnels.

#### The future of Ethereum UX (21:00) {#future-ethereum-ux}

The goal is to shift Ethereum's adoption curve from the Linux trajectory — infrastructure dominance but user-layer failure — to one that maintains the cypherpunk values of the ecosystem while being accessible to mainstream audiences. AI agents, backed by smart account permissions and self-sovereign execution environments, provide the path to get there.
