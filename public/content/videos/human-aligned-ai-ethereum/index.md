---
title: "Human-aligned AI on Ethereum"
description: "Shady El Damaty, co-founder of human.tech, explores how to design AI agents that augment human capability without compromising user sovereignty, covering humanbound keys, delegation primitives, and wallet-as-protocol architecture."
lang: en
youtubeId: "pLSA_9Ntnjc"
uploadDate: 2026-01-20
duration: "0:19:35"
educationLevel: intermediate
topic:
  - "ai"
  - "agents"
  - "wallets"
  - "identity"
format: talk
author: human tech by Holonym
breadcrumb: "Human-aligned AI on Ethereum"
---

**Shady El Damaty**, co-founder of human.tech, presents at DevConnect Buenos Aires on what it means to build human-aligned AI on Ethereum. The talk addresses the fundamental tension between agent autonomy and human control, and proposes new Ethereum primitives — humanbound keys, scoped delegation, and two-party MPC — to resolve it.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=pLSA_9Ntnjc) published by human tech by Holonym. It has been lightly edited for readability.*

#### The private key problem (0:06) {#private-key-problem}

When AI agents start transacting onchain — signing transactions and moving value — whose private keys are they using? The cypherpunks of the 1970s and 1980s told us never to give up our private keys. Today, every onchain agent requires full custody of a private key to do anything useful. A multisig with an AI signer is a primitive workaround, but it does not scale. Once we give agents our keys, they own the wallet. If the acceleration thesis is correct, human agency is at risk.

This creates an unstoppable-force-meets-immovable-object situation: agents need autonomy to be useful, but humans need control. Ethereum treats every signature identically — it has no way to distinguish human from bot, cannot enforce rights or roles, and cannot tell whether an action was authorized or delegated. That is a blind spot for bringing AI into crypto.

#### Designing for human alignment (4:30) {#designing-human-alignment}

Human-aligned AI on Ethereum means giving agents autonomy but within boundaries enforced by cryptography, not by trust in a custodian or trusted execution environment. Functionally, this means creating a system where the human is the root authority, the agent is a co-pilot, and the wallet enforces safety rules around both.

#### Humanbound keys (6:15) {#humanbound-keys}

New primitives are needed. Humanbound keys are cryptographic keys derived from human attributes using a verifiable oblivious pseudorandom function. This allows biometrics or a threshold combination of human attributes to create a key that uniquely belongs to an individual. This controller key should never reveal personal data, should enable permission delegation, and should be non-transferable — preventing a scenario where AI agents pass the Turing test and buy human keys on the open market.

#### Delegation and capabilities (8:20) {#delegation-capabilities}

If a humanbound key exists, the remaining piece is delegation. Agents should hold capabilities, not keys. Capabilities are defined by delegating specific permissions: spending limits per day, signing only specific payload patterns, restricting transactions to whitelisted accounts, or requiring human approval above certain risk thresholds. What starts as a mechanism for safe agent operation may also end up improving security and user experience for humans.

#### Two-party MPC architecture (10:45) {#two-party-mpc}

One architectural solution is two-party multi-party computation (2PC MPC). The user's key is split into two shares. One share stays with the user; the other resides in an MPC network with predefined policies. If a transaction exceeds a risk threshold — say, sending $1.3 billion — the system requires a passkey notification, Google Authenticator, and a magic link before proceeding. Revocability is critical: the human can shut down the agent at any point by revoking their key share.

#### Wallets and AI as a unified interface (13:30) {#wallets-ai-unified}

Bringing these pieces together, wallets and AI become a singular interface into crypto. AI acts as an embedded co-pilot within the wallet. Agents can help draft transactions, find optimal routing, monitor positions, and execute automations safely. But in no case should agents own a private key or bypass constraints — either explicitly, by proxy, by imitating a human, or by purchasing another human's key.

#### What Ethereum needs (15:30) {#what-ethereum-needs}

Ethereum currently lacks several capabilities for this vision: no way to tell at the protocol level whether a transaction came from a person or a bot, no way to determine whether a delegated action occurred onchain, and no way to enforce wallet-level policy constraints. Projects like the Universal Profiles key share manager are making progress. The wallet-as-protocol framework (wp.build) provides humanbound key generation, 2PC MPC for split trust, scoped delegation, and stateless integration for dApps.

#### Ethereum as human-aligned AI infrastructure (18:00) {#ethereum-human-aligned}

The path forward: humans define and hold the controller keys, agents become co-pilots, MPC bridges the gap until more of this can move onchain, and Ethereum becomes the backbone of human-aligned AI infrastructure.
