---
title: "The game of reorgs in proof of stake Ethereum"
description: "Caspar Schwarz-Schilling presents research on block reorganization attacks in proof of stake Ethereum, covering attack vectors, defense mechanisms, and the protocol-level mitigations in place."
lang: en
youtubeId: "xcPxwhrg3Ao"
uploadDate: 2022-11-29
duration: "0:18:41"
educationLevel: advanced
topic:
  - "consensus"
  - "pos"
  - "security"
format: presentation
author: LisCon
breadcrumb: "PoS Reorgs"
---

This presentation explores the types of block reorganizations possible in proof of stake Ethereum and the mitigations designed to prevent them. Caspar Schwarz-Schilling, a researcher at the Ethereum Foundation's Robust Incentives Group, walks through the mechanics of ex-post and ex-ante reorgs, comparing the security landscape between proof of work and proof of stake.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=xcPxwhrg3Ao) published by LisCon. It has been lightly edited for readability.*

#### Introduction and background (0:03) {#introduction-and-background-003}

So welcome. Today I'm going to talk about the reorgs that are possible in proof-of-stake Ethereum.

I recently joined the Ethereum Foundation, in particular the Robust Incentives Group. Basically we're a research team focused on anything incentives. I'm going to keep this short — this talk is packed and you can find most of our work on GitHub.

#### Two types of reorgs (0:44) {#two-types-of-reorgs-044}

Today I want to talk about reorgs, and in particular I want to sketch out two different types of reorgs that are possible in the realm of proof-of-stake Ethereum.

On the one hand we have **ex-post reorgs** and on the other hand **ex-ante reorgs**. Forgive me the slightly pretentious Latin naming, but it does the trick.

Ex-post reorgs are kind of what we usually think of when we talk about reorgs. The adversary sees a block — if it's valuable they might want to try and reorg it. So on the diagram here we see that block N+1 is the block that the attacker wants to reorg out, and by building on the same parent block N, if it works, block N+3 is then built on block N+2. That's business as usual.

Now ex-ante reorgs are slightly different. The idea is the attacker needs to start the attack before even knowing what block they're going to reorg out. How does that roughly work? On a very high level, block N+1 is built on top of N but not immediately released. The honest nodes don't even know that N+1 exists and so they will keep building on N. Then through some mechanism N+1 gets released and N+3 may see N+1 is leading and build on top of it, such that N+2 is actually reorged out.

You may wonder why would you even want to do this kind of reorg. Well, there's still MEV to be captured. If you're lucky, block N+2 has a lot of MEV — you can capture that by just copy-pasting whatever that block is. Worst case, you have basically two slots worth of transactions to listen to.

#### Ex-post reorgs in proof of work (2:49) {#ex-post-reorgs-in-proof-of-work-249}

Before diving into ex-ante reorgs, which is the main topic of this talk, let me briefly recap ex-post reorgs and especially start with the proof-of-work context.

Basically it's a recap of the blog post by the usual suspects — Georgios and Vitalik. Just go ahead and read it, it's great.

In a nutshell, in proof of work Ethereum, ex-post reorgs are hard but they're not unfeasible. A 10% miner has a relatively good chance of mining some blocks in a row, and if the incentive is high enough — think there's one block with 100 ETH worth of MEV to capture — then maybe a one percent success rate may actually be enough to make it worthwhile trying to reorganize.

#### Ex-post reorgs in proof of stake (3:39) {#ex-post-reorgs-in-proof-of-stake-339}

In proof of stake it's a completely different ball game. We're talking about an absurd amount of stake required. I'm gonna walk you through how one might go about it to just emphasize how ridiculously difficult it is.

Maybe some basics first. Time in proof-of-stake Ethereum progresses in slots. Each slot is 12 seconds long. In each slot there are two roles: you have a proposer — exactly one proposer — and a committee of thousands of attesters that are supposed to attest to the blocks they hear on the P2P layer. They determine the head of the chain by running the fork choice, which is basically a function that takes in the block tree as input and gives you the head of the chain.

You're supposed to attest to blocks if you hear a valid block, or four seconds into a slot — whatever comes first. So if for some reason the proposer of block N+1 is offline and there's no block four seconds into the slot, you attest to block N. If you hear it on time, you attest to block N+1. Simple.

All these attestations give weight to the blocks, and this weight is used by the fork choice to determine what the latest head is.

Now let's walk through a one-block reorg. At the beginning, everything is business as usual — everyone attests to block N, even the attacker. Then N+1 is built on top of N, and because the attacker doesn't want to give weight to the block they're trying to reorg out, they instead attest to block N. Block N is gaining a lot of weight because the attacker has two-thirds of the committee — which means they need to control roughly speaking two-thirds of the entire stake.

One-third of the honest people attested to N+1, two-thirds to N. Now comes block N+2 — obviously the attacker builds it on N, and attests to their own block. From the view of the honest validators, N+1 is still leading in terms of weight because both N+1 and N+2 inherit the entire weight of block N, but N+1 also has this one-third of attestations which N+2 is lacking.

If we tally this up — block N+1 has attestations worth one-third plus one-third, giving two-thirds, and block N+2 also has two-thirds. For simplicity let's assume the tiebreak goes in favor of the attacker. Then N+3 will see N+2 as leading and build on top of it.

To give you an idea of how ridiculous these assumptions are — even if you had a 65% staker, to control two-thirds of the committee in any given slot you have a probability of 0.05%. This goes to show that the power of parallel attestations is real — ex-post reorgs are incredibly difficult, if not virtually impossible, in proof-of-stake Ethereum.

#### Ex-ante reorg attack mechanics (7:34) {#ex-ante-reorg-attack-mechanics-734}

Now I'm gonna talk about ex-ante reorgs. This attack is based on a paper by Neuder and others. We've recently improved this attack significantly. We also wrote up a paper on it and managed to upload it on arXiv just in time.

Also upfront — don't worry, there's mitigations. They will be merged before the Merge.

How does an ex-ante reorg attack work? Initially, block N — business as usual, everyone attests to it. Now you're the proposer of N+1. You propose it and attest to it privately with a single validator. Importantly, you keep it private — you don't release it and you don't propagate it on the P2P layer.

What happens is the honest people don't see block N+1, so they will attest to block N. That's the trick — you inherit that weight and you don't have to actually fight it.

Let's assume zero latency for the moment. In slot N+2, what we do as the attacker is release block N+1 and the private attestation all at the same time. The honest validators in slot N+2 need to attest to a block. From their view they see block N+2 and block N+1 with this one private attestation. If they run the fork choice they will find that block N+1 has more weight than block N+2, because N+1 has the private attestation which N+2 does not. Even all the honest validators will actually attest to block N+1. In N+3, trivially, N+1 will be viewed as the head of the chain.

#### Network latency and the attack (10:25) {#network-latency-and-the-attack-1025}

I assumed zero latency, which obviously isn't how it works. There is latency — it takes time to propagate blocks and messages on the P2P layer.

The way an attacker can still pull off this kind of attack is by having a lot of nodes on different locations on the P2P topology. When the honest proposer in slot N+2 proposes that block, you hear about it very early on in the propagation process. As a result, you can release your private block from all these different locations such that a majority will hear about block N+1 before they hear about block N+2 — meaning they see that block N+1 is leading in weight and will actually attest to it.

To re-emphasize what's happening here: we have a proposer with a singular attester managing to pull off a one-block reorg. Not ideal, to say the least.

#### Balancing strategies for longer reorgs (11:42) {#balancing-strategies-for-longer-reorgs-1142}

If you want to go fancy, you can pull off longer reorgs using a balancing strategy. The idea is to split the honest committee into different views of the chain.

You release your private block in such a way that roughly half of the honest nodes hear about your private block and attestation before they hear about block N+2 — so they attest to your block. The other half you want them to not hear your block before they attest to N+2.

Now you have half of the honest committee attesting to N+1 and the other half attesting to N+2. How does that help? The honest committee now cancels each other out, and you as the attacker don't even have to fight them — which is basically the attacker's dream come true.

Walking through the diagram: block N business as usual, block N+1 — same story, you don't release it. The honest validators attest to block N. Block N+2 comes up, you hear about it early, and you release block N+1 with one attestation — the "sway vote" — in such a way that half the honest committee sees it before and half after. Half vote for N+1, the other half for N+2. You actually want an off-by-one split such that N+2 has one attestation more, so N+3 builds on N+2 and keeps the reorg going.

To bring a two-block reorg to an end: block N+3 is proposed, you hear it early, you release block N+1 and your two remaining attestations, flooding the P2P layer so a majority of the honest people vote for block N+1 — such that it has more weight than block N+3 and N+4 is built on top of N+1.

If you think about it, it's relatively cheap to do these reorgs under these assumptions. Even if you don't have perfect splits, because the P2P layer is so big you have a probability distribution that you can target such that the attack cost grows in the square root of the committee size.

#### Proposer boost mitigation (15:17) {#proposer-boost-mitigation-1517}

Let's talk about the mitigation. What's the basic idea? We're going to give the proposer a bit more power. If a valid block arrives on time, let's boost the weight of this block for the duration of the slot. After that slot is done, we resume the usual LMD-GHOST score and it's business as usual.

So if block N+2 is proposed on time and it's valid, this block will have a boost — let's say 80% of the committee size. Now this cute little N+1 attestation from the attacker is not going to do the trick. No way.

The balancing stuff also doesn't work anymore because you have a 50/50 split but the boost always throws it in one direction. There's no way you can keep that 50/50 split.

The idea is that with this mitigation in place, the adversary's attestations have to compete with the boost to convince honest validators to vote according to their liking. This breaks balancing strategies and prohibits basically all reorgs altogether. Good news — there's an open PR, so basically it will be merged before the Merge.

#### Key takeaways (16:48) {#key-takeaways-1648}

Some key takeaways. I've talked about the differences between ex-post and ex-ante reorgs. I briefly sketched out the different landscapes for reorgs in proof of work versus proof of stake. I showed you how to pull off an ex-ante reorg but also importantly how to fix it.

If you're interested in this, there's a paper — much more detailed, more nuanced. Slides will be uploaded. Come talk to me if you're interested, and you can also find me on Twitter.

I hope this was interesting to you. Thanks very much.
