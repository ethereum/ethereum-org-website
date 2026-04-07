---
title: "Ethereum's quantum plan: Justin Drake"
description: "An extended interview with Justin Drake, Ethereum Foundation researcher, covering Ethereum's post-quantum roadmap, the Lean Ethereum protocol, the shift from proof of work to proof of stake design philosophy, and with an honest discussion about AI existential risks."
lang: en
youtubeId: "wURmzLKhJco"
uploadDate: 2025-07-15
duration: "1:12:30"
educationLevel: advanced
topic:
  - "roadmap-and-priorities"
format: interview
author: Bankless
breadcrumb: "Justin Drake"
---

An extended interview with **Justin Drake**, Ethereum Foundation researcher, covering Ethereum's post-quantum roadmap, the Lean Ethereum vision, formal verification breakthroughs, and a candid discussion about AI existential risk — all through the lens of someone who has spent nearly a decade designing Ethereum's consensus layer.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=wURmzLKhJco) published by Bankless. It has been lightly edited for readability.*

### The Lean Ethereum vision (0:00)

**Host:** Justin, welcome back to the show. Let's start with the big picture. What is Lean Ethereum?

**Justin Drake:** So Lean Ethereum is the next major chapter of Ethereum research. The basic idea is that at this point in time, the architecture and design of Ethereum is roughly settled. What that means is that we can spend the next three or four years designing the entire protocol spec and optimizing it for long-term sustainability. And the natural tool for this job is formal verification using what's called a proof assistant.

So we chose Lean 4 as our proof assistant. Lean 4 is this amazing piece of technology — it's both a programming language and a mathematical proof system. You write your specification in Lean and then you prove properties about it. What you get at the end is a spec that is mathematically verified — you know that it's consistent, that it doesn't have certain classes of bugs.

### Formal verification and AI acceleration (5:00)

**Host:** How far along are we with Lean Ethereum?

**Justin Drake:** We're making really good progress. What's been incredible is how AI is accelerating the process. About a month ago, one of the key lemmas in hash-based SNARKs — the Polychocks-Spielman lemma — was formally verified in 8 hours and it cost $200. That's something that would have cost a hundred times more if a human were to do it and would have taken a hundred times longer.

And then there was the Fields Medal result, which only took 5 days to generate a 500-line proof. We're going to have all known mathematical theorems either checked and verified by AI, with all typos corrected, and for some small subset of theorems, we're going to discover that they're actually incorrect — there might be counterexamples.

### Post-quantum: the Starmap (10:00)

**Host:** Let's talk post-quantum. What's the state of things?

**Justin Drake:** So the post-quantum plan is what I call "The Starmap." There are different threats. The obvious one is Shor's algorithm breaking ECDSA — the elliptic curve signature scheme that Ethereum uses for transaction signing. So anyone who's ever made a transaction and exposed their public key is potentially vulnerable. Once a capable quantum computer exists, a quantum attacker could derive private keys from public keys and steal funds.

The approach is a multi-phase migration. We need to upgrade the signature schemes — from ECDSA to post-quantum alternatives like hash-based signatures. On the consensus layer, we're working with XMSS — Extended Merkle Signature Scheme. For the execution layer, it'll be lattice-based or hash-based approaches.

But the biggest challenge is migration. You have to take every existing account on Ethereum and make sure the owner upgrades to a post-quantum signature. If they don't take any action, the accounts remain vulnerable. Even dead accounts where the keys were lost are a problem — quantum computers could recover those keys, someone could take the funds, and that would undermine confidence in the entire system.

### The emergency hash approach (18:00)

**Justin Drake:** We have emergency approaches. If someone holds the private key, they most likely also hold the seed phrase. And the seed phrase is a preimage of the key generation process. So you can do an emergency transition where people ZK-prove that they hold the seed phrase that generated the public key. You lock the accounts until someone posts the proof. The risk is that people who generated keys directly without a seed phrase might never be able to recover their funds.

We need to get the entire ecosystem ready — wallets, operators, validators, everyone switching together. One part is doing the research and implementation. The other is doing the entire migration transition. The first part might be two to three years. Integration goes over another two to three years — unless people feel there's an emergency, which would accelerate everything.

### Timeline: shipping by 2029 (25:00)

**Justin Drake:** The goal is to ship the Starmap by 2029 — that's the post-quantum roadmap. We need to be strategically two to five years ahead of the quantum threat. And the financial markets are already getting anxious. When Jeff announces a 10% BTC de-allocation from an Asia portfolio citing quantum concerns, that's a signal. So we need to have solutions ready.

The good news is we're already two years into the work. The devnets are running. Post-quantum devnet 2 is active. There are workshops, meetings in Cambridge and Cologne, massive coordination. There's million-dollar bounties for the post-quantum roadmap. The Lean Ethereum Roadmap website tracks everything in detail.

### The three-layer spec (30:00)

**Justin Drake:** The spec will have three layers. LeanSpec — the formal mathematical specification. LeanEVM — the verified EVM. And LeanSE — the lean specification of the consensus layer. We're building verified implementations alongside the spec so that clients can adopt them directly.

### Defensive accelerationism and AI (45:00)

**Host:** I want to shift to something you've been talking about recently — AI risk.

**Justin Drake:** I've had an AI awakening in the last few months. To a large extent I was ignoring AI, partly because I was obsessed with blockchain stuff and partly because it was a toy not long ago. But through my work with formal verification and development, I'm seeing how powerful this stuff is. Programming is largely being solved. Scientific progress is next.

The way I see it: there are all these accelerationist companies. They're all pressing on the gas, and the car has no brakes, no seatbelt, no airbag. Today we can steer relatively comfortably at 100 miles per hour. Next year we'll be at 200 mph, then 300 mph. Eventually we're going to be driving irresponsibly fast and crash into a wall or drive off a cliff.

For me, working on Ethereum has taken a whole new meaning. Ethereum is about defensive accelerationism. I don't see other parts of society working on the braking system. It's all gas.

The good news is Ethereum has a lot of the thinking and tools that could provide solutions. From day one, we assume adversariality. We use cryptography that empowers the weak. We're trying to be decentralized, to give people sovereignty. It's possible that in the coming months and years, there'll be an awakening where society goes, "Oh, shit," and some of the smartest minds naturally come to Ethereum as part of a suite of solutions.

### The probability of doom (55:00)

**Host:** How do you personally deal with the possibility that humanity doesn't survive this transition?

**Justin Drake:** I'm relatively zen about it. I've reached a point where I'm happy to die. I've lived a very happy life.

**Host:** [Laughter.] That was not the answer I was expecting.

**Justin Drake:** I think you just need to keep hope. My probability of doom is now relatively high — I think it's more than 50%. But I don't want to say this out loud. I don't want to discourage myself or other people. We should be doing our best with what we have. The future is highly unpredictable. Even though my P(doom) went way up recently, this is a strong opinion weakly held. I want very smart people to come forward and tell me why I should not be so scared.

I've only been thinking about this for weeks and months. I'm just scratching the surface. The big wake-up call for me was Opus 4.5, where AI started making me genuinely more productive. Before that, it was net slowing me down.

**Host:** I appreciate your insight — approaching this with stoicism and agency, working on things that are meaningful to you. If humanity survives, we hope to do many more of these podcasts with you. It's always a treat to have you, Justin Drake. Thank you so much.

**Justin Drake:** Thank you.
