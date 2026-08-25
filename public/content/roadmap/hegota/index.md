---
title: Hegotá
metaTitle: Heze-Bogotá (Hegotá)
description: Learn about the Hegotá protocol upgrade
lang: en
template: upgrade
---

Hegotá is the [Ethereum](/) network upgrade expected to follow [Glamsterdam](/roadmap/glamsterdam/). It is named from the combination of "Bogotá" (execution layer upgrade, named after a previous Devcon location) and "Heze" (consensus layer upgrade, named after a star).

Hegotá is in early planning. Its headliner has been chosen, but the rest of the scope is still being decided, and no dates have been set.

## Headliner: FOCIL {#focil}

<EipTag upgrade="hegota" id={7805} />

Fork-choice enforced inclusion lists (FOCIL, or EIP-7805) is about [censorship resistance](/roadmap/security/#censorship-resistance): making sure that a valid transaction gets into a block even if the people building blocks would rather leave it out.

Today a single [validator](/glossary/#validator) builds each block and decides which transactions it contains. Anyone who can influence enough block builders can therefore delay a transaction, and a user has no way to force the issue other than waiting and hoping.

FOCIL spreads that decision across many validators. A committee each proposes a list of transactions that ought to be included, and the rules of the protocol oblige the block builder to honour those lists. Censoring a transaction stops being something one party can do alone.

## What else is in Hegotá {#scope}

Not decided yet. One further proposal is under consideration and around twenty more have been proposed, but only the headliner is scheduled. This page will stay short until the scope is settled — for the current state of the discussion, see the resources below.

## Further reading {#further-reading}

- [Forkcast: Hegotá](https://forkcast.org/upgrade/hegota) — live status of every proposal
- [Hegotá Meta EIP (EIP-8081)](https://eips.ethereum.org/EIPS/eip-8081)
- [EIP-7805 technical specification](https://eips.ethereum.org/EIPS/eip-7805)
- [Ethereum roadmap](/roadmap/)
