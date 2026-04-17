---
title: "Ethereum in 30 minutes by Vitalik Buterin"
description: "Vitalik Buterin on Ethereum's evolution as a decentralized world computer, covering proof of stake, layer 2 scaling, account abstraction, and the road ahead."
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

**Vitalik Buterin**, founder of Ethereum, opens Devcon SEA with a comprehensive overview of Ethereum's evolution as a decentralized world computer. Vitalik covers proof of stake, layer 2 scaling, client diversity, and the applications defining where the Ethereum ecosystem is heading next.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=ei3tDRMjw6k) published by Ethereum Foundation. It has been lightly edited for readability.*

#### Introduction (0:02) {#introduction-002}

Great, so Ethereum in 30 minutes. This is a presentation that I've given at basically every single Devcon since launch. What's interesting is how as Ethereum the ecosystem changes, and as Ethereum the protocol changes, as the times change, the contents also end up changing quite a bit. If you go back to the equivalent of this from 2015, you'll hear a lot about uncle blocks. Of course, uncle blocks are a feature of proof of work. Now we have proof of stake, and so we don't have uncle blocks anymore. Ethereum also of course now has layer 2s, and back then this would not contain layer 2s at all. Now we know layer 2s are half the story. Ethereum is above all an evolving ecosystem, and the contents of this are going to keep changing as the technology changes, and also as the emphasis of the ecosystem changes from building basic infrastructure to putting a huge amount of focus on applications.

So what is Ethereum? First, Ethereum is the world computer. Who here remembers Ethereum being the world computer? This is the place where I'm supposed to put that meme where there's the guy with the gun in space saying "always has been", but I never understood why giving someone such an amazing and beautiful revelation is supposed to come at the same time as shooting them in space 20,000 kilometers away from home. So I'm not going to do that today. Ethereum is the world computer. It always has been, always will be.

In addition to this, Ethereum is an incredibly large and diverse onchain economy. Fortunately, Josh right before me made an incredibly good presentation talking about all of the different aspects of the economy. Ethereum is also an incredibly large and diverse global community. Ethereum is many things. I think I'm probably supposed to put up a flashing sign saying "ETH is money" as well, but Ethereum is a lot of things.

How does the world computer work? The way that I think about this is layer one is the trust machine, and layer two is the GPU. The layer one of Ethereum, that is the core Ethereum blockchain, is the anchor that keeps the rest of the ecosystem safe and holds the rest of the ecosystem together. Layer one is the reason why layer 2s are able to trustlessly talk to each other. At least once everything upgrades to Stage 2, you will be able to take an asset, issue it on Optimism, and then move it and hold it inside of a smart contract on Arbitrum, and do so with zero counterparty risk. Layer one is not there to be ultra fast; it is not there to do a million transactions per second. Layer one is first and foremost there to be decentralized, to be robust, and to be something that is dependable.

Layer two is the GPU. Layer two is all of you in the room who are part of any single layer 2. Who here is part of a layer 2? Yay. Who here has used a layer 2? Who here has used layer 1? Good, we're all users here. There's lots of these different GPUs, and Ethereum the world computer is able to hold together because each and every one of these GPUs is connected to the trust machine through optimistic proof systems, zero-knowledge proofs, SNARKs, STARKs, plonk, or whatever the buzzwords are. All of these systems ensure that layer one is able to trustlessly verify what is going on inside of the layer 2s, and layer 2s also are able to trustlessly read what is happening on layer one.

#### Decentralization and diversity (5:11) {#decentralization-and-diversity-511}

There's an important interplay between these two components, and together they make up the Ethereum that is here today. What is the L1? It's a chain. It runs proof of stake. It doesn't break. What does this mean? Ethereum L1 is a chain that has existed altogether for more than nine years now, and it's existed in its current proof of stake form for a little bit over two years. One of the really important things for a base layer to have is clear evidence that you're building on a base layer that is decentralized, open, robust, and likely to keep those traits going forward into the future. 

One part of that is being slow to change. You don't want a system that is suddenly going to wake up on a Tuesday, have new management, and then decide it's totally going to start deleting a whole bunch of applications, change its entire model, push the fees up by a factor of 10, or do other things without warning. Another part of decentralization and resilience is recovery. Whenever a problem arises, actually being able to recover from it and improve the qualities of the layer one over time.

If we look at a chart of Bitcoin proof of work mining pools versus Ethereum proof of stake staking pools, I'm deliberately being generous here, because before the merge, Ethereum proof of work decentralization was even more concentrated. What we see on the Ethereum proof of stake side is a pretty diverse set of staking pools. If you zoom into Lido, it has somewhere a little bit under 30%, but Lido is not one actor. It's a DAO. Technically the deposits are split between 40 different node operators approximately. It's reasonable to think of it as being somewhere between one actor and 40 actors. 

Then we have "unidentified". Unidentified is not an actor, just like the "any" key on your keyboard is not actually a key. We actually don't know what it is. There's probably lots of solo stakers, small business stakers, and various tiny staking pools. Ethereum L1 today actually has a surprisingly high degree of decentralization in its proof of stake design, and this is a property that has only gotten better over time.

One property that actually has gotten a lot better is client diversity. Ethereum about five years ago was basically just Geth. When you have an ecosystem that is dominated by one client, that itself becomes a central point of failure. Who here remembers the 2016 DoS attacks? You wake up at 5:17 AM, get a military-style wake-up call, go down to the war room, and someone discovered a bug in the client. The entire chain stops. We fix it, and then two or three days later someone finds another bug. That keeps going on for a whole month until eventually we have to hard fork. But during that period, the ability for Ethereum to have two different clients — at the time they were Geth and Parity — basically saved the chain. There were times when a bug would hit Geth but not Parity, and times when a bug would hit Parity but not Geth. Ethereum gained a lot from having multiple software implementations, and this is something that as of 2024 is probably at the best it's ever been in Ethereum's history.

#### Multiple clients and robustness (10:40) {#multiple-clients-and-robustness-1040}

If we look at consensus clients, which handle the proof of stake part of Ethereum, and execution clients, which handle the EVM part of Ethereum, we can see the single client with the highest market share is Geth, which is somewhere around 50%. What happens if there is a bug in any Ethereum client literally today, right now? Check if Ethereum is still running. I'm going to guess it is — I'd bet 99.99% on PolyMarket. 

Case one: What happens if the client is Geth? That's the worst case. If the client is Geth and there's a bug, realistically the chain splits in half. One half follows Geth, one half follows the other clients, but on both sides, the chain stops finalizing. To finalize, you need two-thirds. If you have less than two-thirds, blocks keep getting created, but the chain stops finalizing. If you are a user, an application, or a business waiting for confirmation on some transaction, you're going to detect that neither chain is finalizing, and you're going to be on standby. What's realistically going to happen is core devs get on high alert, figure out which client actually has the bug, and the bug gets fixed. The one time this happened in Ethereum — fun fact, I actually sent the transaction that did it myself back in 2016 — basically everything was fixed within 12 hours. 

That's the worst case. Every other case, basically if Prysm or Lighthouse have a bug, all that happens is that Ethereum stops finalizing for about a day at most, and then it basically just goes back to normal. With any other client, you're not going to notice anything at all. In terms of practical decentralization, having multiple clients is extremely helpful. It diversifies the power and control over the Ethereum ecosystem, especially in any kind of contentious situation. If some kind of DAO fork type incident happened again, and one development team made an unpopular choice, users would be very easily able to switch to other clients and route completely around them. 

This is not practical in a single-client ecosystem. Having a diverse multi-client ecosystem is difficult to achieve. Aside from Ethereum, no other chain has really achieved anything close to this. Even outside of Ethereum, like web browsers — web browsers are supposed to be an open standard. The reality is that 80% plus runs on some fork of WebKit, and the rest runs on Firefox, which is valiantly trying to hold its own. Ethereum has managed to buck this trend.

Two years ago, this chart was worse. Ethereum's decentralization is not only able to not get worse, but it's also able to actively respond to problems and aggressively push to make them better over time. If you're building an application that you need to exist 5 or 10 years from now, properties like these are exactly what you would be looking for. 

If you have 32 ETH, or less if you join a pool, there are more and more really interesting pool options appearing — like Obol squad staking, which allows you to create smaller pools with your friends. There are lots of different ways for you to become a staker, and if you do, you become part of this network of nodes securing the Ethereum blockchain.

#### Node verification and scale (15:06) {#node-verification-and-scale-1506}

I guess this is how the foundation propaganda describes it — it has a cute elephant. So good cheers for the elephant! You too can join the network and help secure it. Even if you're not a staker, you can also run an Ethereum node on your computer and voluntarily verify the chain. 

I guess these days nobody even has desktops that look like this. I shoved "desktop computer" into Stable Diffusion 3.5 and it put this out, so that's the computer you get. But you can run an Ethereum node on your computer to verify the chain. This is really important because if you have users verifying the chain, then even a majority or super-majority of the stakers acting together are not able to change the rules on people without everything breaking. The Ethereum rules can only change through a hard fork that is agreed upon through wide community consensus. 

I think this is one of those things that's really valuable to preserve. Among blockchain ecosystems, it's basically Bitcoin and Ethereum that really have a strong culture of trying to make it possible and keeping improving people's ability to verify the chain. There are a lot of protocol upgrades coming with the precise goal of making it even easier. 

Tomorrow you will be able to run a node without requiring more than a small amount of storage using stateless clients. This is the "Verge" part of the roadmap. We also have light clients. There's a project called Helios doing a form of light verification. Light verification isn't perfect, but it does mean you do not have to trust an RPC node to tell you information about the chain. The longer-term future is we want to SNARK the whole chain. Once we SNARK the whole chain, you will be able to verify the Ethereum rules on extremely large or tiny hardware. 

Staking with less ETH is also a very active research requirement. 32 ETH is still high. I would like for people to be stakers with 1 ETH. There are different ways to do this, like Orbit, or making aggregation improvements. Overall, a lot of protocol improvements are coming specifically to make staking and running a node easier and more accessible.

What runs on the Ethereum L1? Some high-value applications. A lot of high-value DeFi runs on L1. ENS is currently on L1, though it's increasingly doing more with layer 2s. People hold assets on layer one. Furthermore, layer one manages block roots, state roots, and proof systems for layer 2s. It secures layer 2s. Layer one needs to be powerful enough to handle cross-layer operations, especially in the case where a layer 2 fails. The difference between a layer 2 and an independent chain is that even if your layer 2 is 51% attacked or the team shuts down, layer one still stands there to protect users. Users are able to prove their ownership and state inside of the layer 2 and migrate it back down to layer one. 

#### L2 speeds and roadmaps (20:33) {#l2-speeds-and-roadmaps-2033}

Recently, there was a live experiment with this. dYdX v3 shut down recently, and the L2Beat people wrote their own implementation of escape hatch software. Without any involvement from the dYdX team, users were able to take any assets they had inside of dYdX v3 and bring them back down to the Ethereum L1. Exiting a layer 2 without the team's involvement is not just theory, it is reality.

If L1 runs applications and protects the L2s, what do the L2s do? L2s provide speed and scale. This year, layer 2 fees have gone down from about 50 cents to less than 1 cent. Basically, for an incredibly wide class of applications, Ethereum has overnight gone from being basically unaffordable to being completely affordable. 

What about transaction inclusion times? Who here remembers the experience of sending a transaction and waiting some arbitrary number of minutes — like 10, 40, or 90 minutes — for it to get included? Who here remembers having this experience in Ethereum in the past 6 months? Ethereum has improved massively. During the proof of work era, the average block time in Bitcoin was 10 minutes, but in Ethereum the average block time is 12 seconds. However, there was an annoying phenomenon where if you got unlucky with the gas price, you'd have to wait 10 or 20 minutes. EIP-1559, which came in 2021, basically solved that. 

Then the merge. Because of an interesting quirk of mathematics, even though the average time between blocks only reduced from 13 seconds to 12 seconds, the average time between you sending a transaction and its inclusion reduced from a little bit more than 13 seconds to a little bit more than six seconds. Math problem for you: figure out why this is true. Post-merge, inclusion basically goes down to 6 to 30 seconds. Finally, with layer 2s, you have pre-confirmations, so layer 2s are fast enough to confirm your transaction within a couple hundred milliseconds. As a user, you get to be part of an application where lots of things are happening, and at the same time, your transaction fees continue to be cheap. 

The history of Ethereum: November 2013 was the whitepaper. July 2015 was the launch. Around 2018, Ethereum settled on its approximate design for proof of stake and data availability sampling. The original papers for data availability sampling and erasure coding I wrote back in 2017. 

#### Casper and rollup scaling (25:27) {#casper-and-rollup-scaling-2527}

If you dig into GitHub, you can search for the directory called `simple_casper` and find contracts written in Serpent. Who here remembers Serpent? Who here uses Serpent? I mean, I think Python is really beautiful, but if you want that, you should code in Vyper. Vyper is actually great and has kept improving quite a bit. Inside that repo in 2017, we attempted to do full abstraction and write the proof of stake logic directly as a smart contract. We launched a demo at 11:20 PM Bangkok time on December 31, 2017 — we wanted to get something out before New Year's — and the demo ended up breaking pretty quickly. It was early days.

Since then, it's not early days anymore. At the start of 2018, a massive effort started to build out the Ethereum proof of stake system and scaling system, which has since turned into the blobs we have today. In 2022 was the merge, switching from proof of work to proof of stake. In 2024, the "Surge" part one. If you look at the roadmap diagram, you'll see two milestones: basic rollup scaling and full rollup scaling. Basic rollup scaling means you need major layer 2s to hit Stage 1, and you need blobs to exist. By 2024, we actually hit that. The next step is having fully running data availability sampling and major L2s hitting Stage 2. I think that will happen sooner than people think.

There are still a lot of problems left to solve. We want upgrades to decentralization. Who here wants Ethereum to be centralized? Okay, one person wants Ethereum to be centralized. Censorship resistance — quantum resistance? Okay, one hand. Maybe you feel you need collapse in order for renewal to happen! But we need further upgrades to make sure decentralization, censorship resistance, and quantum resistance continue happening. 

We also need progressive ongoing upgrades to efficiency and scale. Layer 2 is going to scale extremely quickly, and its safety is going to improve over the next few years. I also expect progressive, cautious, but definite ongoing upgrades to layer one capacity. We need to do this to support L1 activity, and because L1 acts as a backstop. The maximum theoretical safe capacity of L2s is proportional to the capacity of L1. 

We're going to have upgrades to data availability sampling to increase the number of blobs Ethereum can support. As of about a week ago, Ethereum actually hit price discovery mode for blobs, meaning the number of blobs being used exactly equals the long-term target. Now we need to scale this number. 

We have scaled enough that a wide variety of applications are possible: ENS, consumer payments, social networks. One category I think is going to be extremely important over the next decade is mixed financial and non-financial applications — applications that make use of the power of finance, but ultimately to serve ends that go beyond financial goals. There are lots of very powerful applications here. We've spent a long time making the technology better, and we will continue doing this, but it is at the level where now is the time to build. Thank you. [Applause]
