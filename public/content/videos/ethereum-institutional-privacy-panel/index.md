---
title: "Ethereum institutional privacy now"
description: "A panel at the Ethereum Privacy Stack event during Devconnect 2025, featuring experts from Etherealize, Aztec, and 21Shares discussing real-world institutional privacy needs on Ethereum — from compliance to ZK proofs."
lang: en
youtubeId: "cZqlg4W1Els"
uploadDate: 2025-11-22
duration: "0:30:50"
educationLevel: advanced
topic:
  - "privacy-and-security"
  - "privacy"
format: panel
author: Ethereum Privacy Stack
breadcrumb: "Institutional Privacy"
---

A panel at the Ethereum Privacy Stack event during Devconnect 2025, moderated by **Oskar Thorin** (IPTF/EF), featuring **Zach Obront** (Etherealize), **Amzah Moelim**, **Francesco**, and **Murilo** discussing real-world institutional privacy needs on Ethereum — from regulatory compliance to zero-knowledge proofs for institutional DeFi.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=cZqlg4W1Els) published by Ethereum Privacy Stack. It has been lightly edited for readability.*

### Why institutional privacy matters (0:00)

**Oskar Thorin:** Welcome to this panel on Ethereum institutional privacy. The question of which ecosystem eventually wins — whether it's Ethereum or more private-by-default chains — depends a lot on how we enable privacy for institutions. Let's get started. In a few sentences, what institutional problems are you working on that actually require privacy on Ethereum?

### The institutional problem set (3:00)

**Zach Obront:** When we say "institutional" and when we say "privacy," both are extremely broad terms. The intersection of those makes for very different use cases. Some institutions care about plugging into liquidity, where privacy is about protecting trading strategies. Others are use cases where they don't care that the rest of the world exists at all — it's just that this is a better way to do things internally. The key is that institutions cannot operate on a fully transparent blockchain. When you're managing billions of dollars, your trading strategies, portfolio positions, and client information can't be visible to the world. It's not just a preference — it's a legal requirement.

**Amzah:** For us, it's really important that privacy solutions are customizable. In the beginning you had "blockchain is public" or "everything is private" — but that's not a one-size-fits-all solution. For each use case you need certain tradeoffs, certain changes. What's also most important for us is regulatory compliance. The banking sector is one of the most heavily regulated areas, especially in Europe. If something isn't correct regarding privacy, it doesn't fly with the regulator. You cannot go further — you may have fines.

### ZK proofs for selective disclosure (8:00)

**Murilo:** That's of course not really safe in the current transparent model. So we're already starting to think about how we can use ZK proofs for selective disclosure. You can prove that you're compliant with regulations, that your KYC is valid, that your transaction meets certain criteria — all without revealing the underlying data to the public blockchain. The idea is to offer, at the protocol level, the control that institutions will install between their apps, their endpoints, and their counterparties.

### Composability and privacy (12:00)

**Oskar Thorin:** How do you think about composability? You want private transactions to be composable with the broader DeFi ecosystem. But composability and privacy are in tension — the more you interact with public protocols, the more metadata you leak.

**Francesco:** One of the things that will matter most is building complex use cases which serve financial or institutional clients and which can combine apps, institutional clients, and layer 1. On the policy side, I think it will matter a lot for the community to start thinking about Ethereum as an integrated ecosystem and integrated system.

### The compliance mapping problem (16:00)

**Zach Obront:** I think it would move us forward a lot to get clarity on the specific situations we're trying to solve for and how different they are. Part of that is on the technical blockchain and privacy side. Part of it is also from institutions — there hasn't been the need for compliance requirements to be categorized and made concrete as much as we'd like. The push to really map and be clear about the different requirements and how they fit together — to turn this into a protocol that can support them — would level up our ability to build. Right now it's a fragmented world more run by lawyers, and it hasn't been hardened the way we'd want.

### Educating regulators (20:00)

**Amzah:** The good thing is that over the past seven years, the tech came a long way. Zero-knowledge proofs, fully homomorphic encryption — there's been massive development. One of the most important things to improve is education for regulators and institutions, because they've probably heard about zero-knowledge proofs, but they don't really know how they work. You can say, "It's really safe, it's a real proof," but they don't understand why it's a correct proof and why they should trust it. For a majority of regulators, everything is still from a legal point of view — something written in contracts. When something goes wrong, who can we call? If there's no one to call, that's a difficult perception.

### Building blocks for acceleration (24:00)

**Oskar Thorin:** Let me give you each a minute. What's one building block — technical, operational, or policy — that would meaningfully accelerate institutional adoption? If we meet again in 2026, what do you think is realistic?

**Zach Obront:** Getting clarity on the specific situations we're solving for. Even the point about plugging into liquidity — there are use cases we're focused on that are about building infrastructure underneath things. It's not always about connecting to the broader DeFi world.

**Amzah:** Education. The technology has matured massively, but regulators and institutions still don't understand ZK proofs and why they should trust them.

**Francesco:** From the technology side, ZK proving — real-time proving and aggregation — because this enables us to tackle operational problems and build complex use cases. From the business perspective, I'd like to see more engaging collaboration between projects so that applications can start having access to global liquidity.

### Closing: the village it takes (28:00)

**Murilo:** As we plan, we'll have launched the mainnet of Maiden in the spring. Beyond that, my view is that we should be on our way to full decentralization. But it will take a village. The core thing I want to see is more engagement. We have this idea that privacy is at odds with compliance — that's not really true, but the reality is that it will take a lot of work to marry the two together.

Even before compliance: let's agree we'd like not to have so many bad actors in the places where we trade. The actual threat resistance and the compromises we need to make to build extremely secure protocols need to go further. We also want institutions that help us shape the kind of markets they want, because we know this will be messy and peculiar to their needs.

**Murilo:** We've recently landed precompiles on Maiden, and the really cool thing is that this opens verification of flows involving machine learning. We've been talking about looking at transactions, allowlisting, blocklisting, amounts, the travel rule. That's cool. If you're an extreme nerd like me, you really want to do machine learning on proofs.

**Oskar Thorin:** I want to thank all the panelists. We heard some very interesting perspectives — technology, policy, institution engineering. We just scratched the surface. Thank you.
