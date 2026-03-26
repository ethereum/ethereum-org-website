---
title: "The next Ethereum upgrade: blobspace 101"
description: "Domothy explains blobspace — the new data availability layer introduced by the Dencun upgrade — covering how blob transactions work, why they matter for Ethereum scaling, and what comes next for data availability."
---

This deep-dive interview covers everything you need to know about Ethereum's new blob space resource, introduced with EIP-4844 (proto-danksharding). Ethereum Foundation researcher Domothy joins David Hoffman and Ryan Sean Adams on Bankless to explain the history of the rollup-centric roadmap, the technical mechanics of blobs, and the economic implications of separating block space from blob space.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=dFjyUY3e53Q) published by Bankless. It has been lightly edited for readability.*

#### Introduction (0:03)

**Ryan:** Welcome to Bankless, where we explore the frontier of internet money and internet finance. This is how to get started, how to get better, how to front-run the opportunity.

You know how we say blockchain sells blocks? Well soon Ethereum is going to be selling more than just blocks — it's going to be selling blobs too. That's right. Blobs. We're just a few months out from the biggest Ethereum release since the Merge, and I think no one has fully mapped out the implications of this, but it's going to be huge.

Ethereum is getting a new product to sell — it's called blob space, in addition to block space. The cost of transactions on layer 2s is about to drop towards zero. The economics of ETH gas and the burn are about to change forever. We're calling this upgrade the blob space upgrade — EIP-4844, proto-danksharding.

We want to cover today everything that you need to know about blob space with Ethereum researcher Domothy.

A few takeaways: number one, we go through what blob space is. Number two, we go through the history — how we actually got here with this rollup-centric roadmap. Number three, we go through the economics — what this means for Ethereum's economics, for ETH value accrual.

**David:** If there's any sector of conversation that you and I really love, it's the intersection of cryptography and economics. We've talked about EIP-4844 and proto-danksharding before, but we've never done the aggressive head-first dive down the rabbit hole and come out the other side of economics. We have technically scaled data availability at a technical level, but how does that connect to the market side of Ethereum?

The two marketplaces — the one marketplace that is now being fractured into two — block space and blob space — are now two different independent markets being contained inside of an Ethereum block. What does that mean for ETH? What does that mean for the marketplaces that arise around these things?

#### What is blob space? (8:35)

**Ryan:** Before we get into the history, Dom, can I just ask a very simple question — is blob space just block space for layer 2s?

**Dom:** Pretty much, yes. All the data that layer 2s need to commit on-chain are going to go into these blobs, which is the new resource on layer 1. The layer 1 doesn't know what's inside these blobs — it's just there to prove that the layer 2 committed it so that no one can cheat.

**Ryan:** So blob space is just block space for layer 2s. Right now layer 2s are actually using Ethereum block space instead of blob space. What we're doing with EIP-4844 is partitioning off this new resource called blob space and making that cheap and very available for rollups, so now they can start consuming more blob space than they do block space.

#### From execution sharding to the rollup-centric roadmap (9:41)

**Ryan:** Dom, in order to fully understand how we got here, it's worthwhile going back in time. At one point, Ethereum's rollup-centric roadmap was not a thing — we had this thing called execution sharding which we never actually got.

**Dom:** In the research space, it was always assumed that the solution to scaling a blockchain was going to be some form of sharding. When we were at proof of work, it didn't really work to split the blockchain into 64 or 1024 mini-blockchains because each blockchain would have a very small fraction of the overall security. So the plan was always proof of stake first, then this magical split into mini-blockchains running in parallel where each validator is randomly shuffled. That was the general idea for execution sharding — to flip the scalability trilemma on its head.

Sharding is a concept from computer science and database management — it's a lot of smaller shards of the blockchain getting much more scalability in parallel. But it turns out it's pretty hard to do that safely with execution sharding, and it was a very debated area of research until rollups came along.

Around 2019, we discovered that full execution-layer sharding was going to be really hard and might overly complicate the protocol. That was around when the whole East 2.0 plan was to have one big upgrade with proof of stake, sharding, and everything. Going from the stone age of Ethereum to sci-fi Ethereum in one single upgrade — and it turns out that's hard to do.

It was split into phases: first launch a beacon chain, then figure out how to merge it with the current execution layer, then phase one with data sharding — no execution, just smaller blockchains containing data — and then figure out execution sharding later.

#### Why rollups won (20:34)

**Dom:** Rollups inherit the security of L1, which is a very quick tagline. The way it works is you have the layer 1 contract that bridges assets between Ethereum and rollups. This smart contract can and should ideally be immutable and not upgradable. Layer 1 enforces constraints on what these layer 2 blockchains can commit, so they can't steal assets. If they censor, you can still rely on the layer 1 contract to enforce withdrawing your assets or forcing a transaction to go through.

This is why Dankrad said recently that his definition of an Ethereum rollup is a rollup that posts its data on Ethereum. If it doesn't do that, it's something else — maybe we use the term validium. Layer 2s that have data availability off-chain have more trust assumptions. If you want to exit your assets, you need to get the data from somewhere, and if it's not Ethereum itself, you have to rely on someone else.

**Ryan:** There's a quote from Vitalik in your article: "It seems very plausible to me that when full execution sharding finally comes, essentially no one will care about it. Everyone will have already adapted to a rollup-centric world, and by that point it will be easier to continue down that path than try to bring everyone back to the base chain." Basically we could do the complex thing and scale layer 1 execution, but all that would really achieve is that rollup sequencers would be like "oh cool, more data" and barely touch the execution that we took so long to shard.

**Dom:** The idea is that rollups can afford to do sacrifices that layer 1 can't do. We can't achieve the scale and order of magnitude that rollups can, even if we shard execution at layer 1. Scaling execution implies scaling data — but not the other way around.

#### How blob space works for rollups (41:20)

**David:** From the point of view of a rollup, it doesn't really matter that it's blob space versus block space — it's just data for them. Is there anything they need to do on their side to activate it?

**Dom:** After EIP-4844, they'll have to update to support blobs and stop posting everything on layer 1 in the expensive call-data section of blocks.

**David:** Is there anything that rollups lose by using blob space versus block space?

**Dom:** It's just as good and even better for them because it's cheaper and more plentiful.

**David:** Can I put a transaction in blob space? Can I send some ETH in a blob?

**Dom:** Nothing prevents you — it's a permissionless system. It's tailored for rollups, but you can put any data inside layer 1 blobs as you please. It's up to you if you want to pay for that.

**Ryan:** I'm predicting that there will be some NFT project where the JPEGs are inside blobs at first because blobs are going to be pretty cheap.
