---
title: "Ethereum in 30 minutes by Vitalik Buterin"
description: "Vitalik Buterin opens Devcon SEA with a comprehensive overview of Ethereum's evolution as a decentralized world computer, covering proof of stake, layer 2 scaling, account abstraction, and the road ahead."
lang: en
youtubeId: "ei3tDRMjw6k"
uploadDate: 2024-11-12
duration: "0:31:05"
educationLevel: intermediate
topic:
  - "how-ethereum-works"
  - "ethereum"
format: presentation
author: Ethereum Foundation
breadcrumb: "Ethereum in 30 Minutes"
---

**Vitalik Buterin**, founder of Ethereum, opens Devcon SEA with a comprehensive overview of Ethereum's evolution as a decentralized "world computer" — covering proof of stake, layer 2 scaling, client diversity, and the applications defining where the ecosystem is heading next.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=ei3tDRMjw6k) published by Ethereum Foundation. It has been lightly edited for readability.*

### The evolving "Ethereum in 30 minutes" talk (0:16)

This is a presentation that I've given at basically every single Devcon since launch. But what's interesting is how as Ethereum the ecosystem changes and as Ethereum the protocol changes, the contents also end up changing quite a bit. If you go back to the equivalent of this from 2015, you'll hear a lot about uncle blocks — uncle blocks are a feature of proof of work. We have proof of stake now and so we don't have uncle blocks anymore.

Ethereum also now has layer 2s, and back then this talk would not contain layer 2s at all. As we know now, layer 2s are half the story. Ethereum is above all an evolving ecosystem, and the contents of this are going to keep changing as the technology changes and also as the emphasis of the ecosystem changes from building basic infrastructure to now also putting a huge amount of focus on applications.

### What is Ethereum (1:30)

So what is Ethereum? First, Ethereum is the world computer. You're supposed to put up a flashing sign saying "ETH is money" as well, but Ethereum is a lot of things. It's a blockchain — a chain of blocks — but the key innovation is that in addition to having a ledger that tracks who has how many coins, Ethereum also has a general-purpose virtual machine. The Ethereum Virtual Machine, or EVM, can run any computation. Once you have accounts that hold coins and the ability to run programs, you can create smart contracts — programs that hold money and define rules for how that money can move.

Anyone in the world can send a transaction to interact with a smart contract. There is no gatekeeper. That's a really, really powerful concept, and the applications that have come from this are enormous — from tokens to decentralized exchanges to lending protocols to DAOs. We actually don't know the full set of applications that will come from this. Every few years something new that nobody expected emerges and becomes huge.

### Proof of stake and security (6:00)

Ethereum switched to its current proof of stake form a little bit over two years ago. One of the really important things for a base layer to have is strong security guarantees. With proof of stake, you want high participation — you want a lot of validators staking and participating in the consensus process. And we have that. The staking participation rate has been consistently high.

Proof of stake has these nice properties around finality. Once a block is finalized — meaning that two-thirds of validators have signed off on it — reverting it would require at least one-third of all staked ETH to be slashed. That creates a very high economic cost to attack the network. This is fundamentally different from proof of work, where the cost of attack is the ongoing cost of renting hash power.

### Client diversity (9:00)

The ecosystem has actually gotten a lot better with client diversity. About five years ago, Ethereum was basically just Geth. When you have an ecosystem dominated by one client, that's a big risk. If that client has a bug, the whole network could go down.

Now we have multiple viable clients — Geth, Nethermind, Besu, Erigon on the execution layer, and several consensus clients. If one client goes below half because of a client bug, well, actually your neither chain is going to finalize and so you're going to detect that and you're going to be on standby. The important thing is that no single client failure can take down the entire network. This is a massive improvement in resilience.

### Light verification (15:00)

Staking is becoming more accessible. There's ideas around things like ObolSquad staking. There's options around creating more ways for people to participate.

There's also a project called Helios which is doing a form of light verification of the chain. Light verification is not perfect — it still follows the consensus — and it does not give you the full security guarantees that running a full node does. But it's much better than just blindly trusting an API endpoint. It lets you verify that the data you're receiving is consistent with what the consensus has agreed on.

### Layer 1 applications and Layer 2 scaling (20:00)

Various applications — all kinds of things in every category. People hold assets on layer 1. Lots of high-value applications naturally gravitate there. ENS, major DeFi protocols, high-value NFTs — these all benefit from the security of the base layer.

Layer 2s provide speed and scale. Layer 2 fees have gone down from about 50 cents to less than 1 cent this year. This is a massive change. It basically means that for an incredibly wide class of applications, Ethereum has overnight gone from being basically unaffordable to being completely affordable.

On transaction inclusion times — who remembers the experience of sending a transaction and then having to wait some arbitrary number of minutes — could be 10, could be 40, could be 90? Bitcoin's average block time is 10 minutes, often you have to wait up to an hour. In Ethereum, the average block time is 12 seconds. EIP-1559, which came in 2021, created a situation where you're able to reliably send a transaction and expect to see it included usually within one block.

And then the Merge — because of this interesting quirk of mathematics, even though the average time between blocks reduced only from 13 seconds to 12 seconds, the average time between sending a transaction and your transaction getting included in a block reduced from a little bit more than 13 seconds to about 6 seconds. Math problem: figure out why this is true — it's actually a really fun fact.

Layer 2s then push this further with preconfirmations and fast enough confirmation times to confirm your transaction within a couple hundred milliseconds.

### The escape hatch — L2 security in practice (22:00)

There's been a real live experiment of this. dYdX V3 shut down recently, and the L2BEAT people actually wrote their own implementation of escape hatch software. Without any involvement from the dYdX team, users are able to take any assets that they have inside of dYdX V3 and bring them back down to the Ethereum L1. The ability to move your assets out of the layer 2 and back to layer 1 if the layer 2 fails — without the layer 2 team's involvement — is not just theory, it is reality.

### History of Ethereum upgrades (24:00)

November 2013 — the white paper. July 2015 — the launch. Around 2018, Ethereum settled on its approximate design for proof of stake and data availability sampling. The original papers for data availability sampling and erasure coding — I wrote those back in 2017. We also settled on the Casper the Friendly Finality Gadget at the end of 2017.

Actually, if you really want, you can dig into it — search for "Simple Casper" and you can find contracts written in Serpent. Who remembers Serpent? Good. I mean, Python is really beautiful, but if you want that, you should code in Vyper. Vyper has actually kept improving quite a bit in the last couple of years.

In 2017, we actually attempted to do this full abstraction thing and even write the proof of stake logic directly as a smart contract. We launched a demo at like 11:20 PM Bangkok time on December 31st, 2017 — we wanted to get something out before New Year's. The demo broke pretty quickly, but it was early days.

EIP-1559 gave us reliable transaction inclusion. 2022 — the Merge, switching from proof of work to proof of stake. 2024 — The Surge, part one. If you look at the roadmap, the Surge section has two milestones: basic rollup scaling and full rollup scaling. Basic rollup scaling says you need major layer 2s to hit stage 1 and you need blobs to exist. In 2024, we actually hit that. The next step is having actual fully running data availability sampling and major layer 2s hitting stage 2. I think that will happen sooner than people expect, and it's up to the layer 2 teams to build this.

### The road ahead (27:00)

There are still a lot of problems left to solve. We want upgrades to decentralization. Who wants Ethereum to be decentralized? Who wants to censor Ethereum? A couple hands — OK. Quantum resistance — who wants Ethereum to break the first time a quantum computer comes out? One hand. Maybe you need collapse in order for renewal to happen, right?

Further upgrades to make sure that decentralization, censorship resistance, and quantum resistance continue happening. Progressive upgrades to efficiency and scale. Layer 2s are going to scale extremely quickly and their safety is going to improve quickly over the next few years. I also expect progressive, cautious, but definitely ongoing upgrades to layer 1 capacity in different forms.

One of the big reasons we need to do this: if something breaks on a layer 2, layer 1 still needs to be there as a backstop. The maximum theoretical safe capacity of L2s is proportional to the capacity of L1. As of about a week ago, Ethereum actually hit price discovery mode in terms of blobs — the number of blobs being used on Ethereum exactly equals the protocol's long-term target. Now we need to scale this number. Upgrades to data availability sampling are happening.

### Applications and the next decade (30:00)

We've now scaled enough that a wide variety of applications are possible — ENS, consumer payments, social. One category that I think is going to be extremely important over the next decade is mixed financial and non-financial applications — applications that make use of the power of finance but ultimately serve ends that go beyond financial goals. I think there's lots of very powerful applications here.

We've spent a long time making the technology better, and we'll continue doing this. But it is at the level where now is the time to build. Thank you.
