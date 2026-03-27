---
title: "Ethereum core governance explained"
description: "Nixo Rokish walks through how Ethereum's core protocol governance actually works — from client diversity and hard forks to the ACD call process, common misconceptions, devnets, and actionable paths for participation."
lang: en
youtubeId: "ghyY_cRqd54"
uploadDate: 2024-09-15
duration: "0:42:18"
educationLevel: intermediate
topic:
  - "governance"
  - "upgrades"
format: presentation
author: ETHBoulder
breadcrumb: "Core Governance"
---

A presentation by **Nixo Rokish** at ETHBoulder explaining Ethereum's core protocol governance — how hard forks get coordinated, common misconceptions about who controls Ethereum, and how to participate in the governance process.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=ghyY_cRqd54) published by ETHBoulder. It has been lightly edited for readability.*

### Intro and why governance matters (0:00)

I'm going to talk about how core protocol governance works on Ethereum. I want to touch on how it compares to other decentralized governance systems, why builders would care, and actionable paths for participation.

### What is Ethereum core governance? (0:42)

So what is core protocol governance? I run a node — I have a piece of hardware, a computer at my house where I run Ethereum software. When I set up this software, I had to choose the clients that were going to run it.

Ethereum is kind of unique in that it has multiple clients for client diversity. The point of that is if one client goes down — if there's a bug in a client — the whole network doesn't go down. There are other blockchains that have other clients, but Ethereum is the only one that's set up in a way that actually protects us against bugs. Solana has another client — I think it's called Firedancer — but it only has about 20% adoption. So if the majority client goes down, the chain goes down. We have seen other networks go down, and it is why Ethereum is the most resilient, secure blockchain.

### Why Ethereum's multi-client system matters (1:20)

The question becomes: how do you get changes into Ethereum when you have to coordinate with so many different clients?

### Hard fork vs soft fork explained (2:05)

First, we'll differentiate between a hard fork and a soft fork. A soft fork doesn't require the coordination that a hard fork does. Ethereum primarily works with hard forks. A hard fork is basically all the clients building a new version of Ethereum and deciding at some preconfigured time to launch this new version. It's still Ethereum, but it's got new features. All of the node operators like me — running nodes at home or professional operators — have to buy into that new version and upgrade their nodes to include that new software.

### How features get prioritized (3:00)

So how do they decide what features go into those hard forks? They have to agree on priorities — to allocate their time and resources, because they do have finite time and resources. They prioritize things like security patches, UX improvements, and other changes that the ecosystem needs.

### The EOF controversy and RISC-V discussion (4:08)

Recently, there was a big debate around EOF — the EVM Object Format — and an alternative proposal for RISC-V. This is a great example of how governance plays out in practice. Proposals get discussed openly, debated on calls, and the community weighs in through forums and research.

### Misconception 1: "Vitalik decides everything" (5:15)

A common misconception is that Vitalik Buterin decides everything about Ethereum. He does not. Vitalik is influential because he's thoughtful and has good ideas, but he doesn't have a veto. There's no mechanism for any single person to force changes through. Client teams are independent organizations that make their own decisions about what to implement.

### Misconception 2: "The EF controls everything" (6:00)

Similarly, people think the Ethereum Foundation controls everything. The EF funds many researchers and some client teams, but the client teams operate independently. The EF doesn't dictate what goes into forks. Multiple client teams from different organizations — Nethermind, Besu, Erigon, Prysm, Lighthouse, Teku, Lodestar, and others — all have to agree.

### Gas limit debate and community pressure (6:45)

The gas limit debate is a great example. The community has been pressuring for gas limit increases. This is something that validators, node operators, and the broader community have opinions on. It's not dictated top-down — it's an emergent decision across the network.

### Misconception 3: "It's all backroom deals" (8:31)

People think decisions happen in backroom deals. In reality, all the core developer calls are live-streamed on YouTube. Anyone can watch. There are summaries, speaker attributions, and recordings. These are some of the most transparent governance processes of any organization in the world.

### Who actually shows up to ACD calls (9:15)

Who shows up to All Core Developers calls? Client developers, researchers, EIP authors, and increasingly application developers and L2 teams who want their concerns heard. The calls are open and anyone can listen, though speaking is typically reserved for those with relevant context.

### How Ethereum governance actually works (10:29)

The step-by-step process works like this: someone identifies a need or has an idea. They write an EIP — an Ethereum Improvement Proposal. That EIP gets discussed on the Ethereum Magicians forum. If it gains traction, it gets brought to an ACD call for discussion. Client teams evaluate the proposal's technical merit, complexity, and priority relative to other work.

Once enough client teams agree a feature should be included in the next fork, it moves to the implementation phase. During this phase, each client team builds the feature into their codebase independently.

### Devnets, feature freeze, and testing process (12:50)

After implementation, the feature goes through devnets — feature-specific test networks. These devnets run all the features together to make sure everything works and nothing breaks. If something starts slowing things down or becomes too complex, features can still get kicked out at that point.

After a number of devnets — there could be 2 or 10 — the clients all decide the code is stable. They cut client releases, and then there's a 30-day period where the Ethereum Foundation security team puts out a bug bounty and contracts security audits.

At the end of that 30-day period, the fork launches onto testnets — like Holesky. These are where application developers can test their applications before the fork goes live. These run for a minimum of 14 days each. Once the permissionless testnet is stable, the mainnet date is chosen, followed by a 30-day buffer that L2s and protocols have requested in order to prepare.

### ACD call structure (14:15)

During this whole time there are public calls live-streamed on YouTube. The major ones are ACDE and ACDC — E is for execution layer (transactions, smart contract deployments, mempool management) and C is for consensus layer (validator management, slashing). Those alternate Thursdays. There's an ACD every single Thursday.

ACDT calls are more technical and nitty-gritty — clients talking about bugs or implementation details that need to be resolved about the fork they're currently working on. Right now, the next fork is Glamsterdam, so ACDT calls are dominated by EPBS and block-level access list discussions.

Then there are breakout calls where community members, researchers, and developers can say, "Hey, I need to discuss this particular topic in depth."

### Getting involved (23:00)

If you have a pain point you've identified, you can find a client developer who has a similar pain point. Well-capitalized organizations like Base would probably be willing to allocate resources to shipping or stewarding a feature through an Ethereum hard fork.

I'll leave you some resources. EthereumForked.org is where you can go and look at what's going into a fork and how it affects you — whether you're an application developer, wallet developer, or consensus layer client developer. The YouTube channel is where all the call recordings are uploaded. They're also embedded at forkcast.org/calls, where there are summaries and speaker attributions, so it's easier to navigate those calls. The EIP directory and the Ethereum Magicians forum are where you can talk to other people about potential solutions or EIPs you want to write.

That's it.
