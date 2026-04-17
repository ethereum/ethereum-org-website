---
title: "Ethereum's evolution: Fusaka, Glamsterdam, and beyond"
description: "Preston Van Loon on Ethereum's upcoming protocol upgrades, covering the Fusaka and Glamsterdam roadmap milestones and the long-term evolution of the protocol."
lang: en
youtubeId: "GgKveVMLnoo"
uploadDate: 2025-03-01
duration: "0:21:34"
educationLevel: intermediate
topic:
  - "roadmap-and-priorities"
  - "roadmap"
  - "upgrades"
format: presentation
author: ETHDenver
breadcrumb: "Ethereum Evolution"
---

A presentation by **Preston Van Loon** of Offchain Labs and Prysm, delivered at ETHDenver. Preston covers Ethereum's recent upgrade velocity and what's ahead for the network, including Pectra, Fusaka, PeerDAS, Glamsterdam, FOCIL, shorter slot times, and faster finality.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=GgKveVMLnoo) published by ETHDenver. It has been lightly edited for readability.*

#### Introduction (0:07) {#introduction-007}

**Host:** All right, everybody. Moving right along. We're going to talk about Ethereum's evolution with Preston Van Loon. Take it away.

**Preston Van Loon:** All right. Thank you. GM — you know it's GM anytime, day or night, whether or not it's morning. So I see GM all day and night. I want to talk about Ethereum's evolution, so let's get started.

There's a narrative you've probably heard before: Ethereum is too slow to ship. I know you've heard it. I've heard it. You've heard it many times. People would say, "When merge? Can't the devs do something? Other chains are moving fast. Why is Ethereum moving so slow?" I'm here to tell you that narrative is dead.

I work on the Prysm consensus client. It's one of the key components of the Ethereum beacon chain. And I was in the trenches for the most recent updates — for Pectra, Fusaka. From what I saw on the inside, this was not some slow-moving bureaucracy that people have claimed for Ethereum for many years. It was actually a high-velocity, well-executed machine delivering some of the biggest upgrades we've seen ever in Ethereum's history.

#### Shipping three upgrades in one year (1:18) {#shipping-three-upgrades-in-one-year-118}

What we shipped in 2025 were three major updates in one year. First, Pectra in May of 2025. This introduced native account abstraction, an increase to the validator max effective balance allowing for consolidations, and ten more EIPs. In May, this was the biggest upgrade in terms of EIPs that Ethereum had ever seen.

But then just seven months later, we shipped Fusaka — an even bigger upgrade in terms of EIPs. This one had thirteen, with an innovation called PeerDAS, which is really exciting. But just six days later, we upgraded again with a BPO1 fork, and BPO2 followed shortly after that, increasing Ethereum's blob capacity.

This is a testament to Ethereum shipping. This is a collaboration between five or six consensus clients, five execution clients, many researchers — over a hundred people involved in Ethereum's core development — and they're all shipping in coordination at the same time.

#### PeerDAS scaling (2:22) {#peerdas-scaling-222}

Let's take a look at the headliner for Fusaka: PeerDAS. PeerDAS is a very awesome scaling solution. Prior to PeerDAS, we had Pectra, and with Pectra you had to — as a node operator or validator — download every blob that came with a block. This was targeting six blobs per block. Everyone had to download it, and that's really a scaling bottleneck. If you want to increase that, you're asking node operators to proportionally increase their bandwidth usage for blobs.

Now with Fusaka, we have blobs that are erasure-coded and asking validators to only custody a portion of that. You only need to custody one-eighth of the blobs. And with any 50% of the blobs, you can reconstruct the whole thing. So with this spread out over the network, it makes sure that data is available and that there's less of a burden on solo stakers. This is giving us an immediate almost 90% network bandwidth reduction in blob usage.

Looking at the numbers: for Pectra, we had a target of six and a max of nine blobs with a gas limit of 36 million. We consider this the baseline for blob usage — that was 768 kilobytes per block. Now, in between Pectra and Fusaka, we had an out-of-band upgrade where the gas limit was increased. This was an onchain governance process where validators simply voted on what they thought the block limit should be — it went from 36 to 45 million. And then later in the year we got to Fusaka, which didn't change the blob target or maximum but again increased the gas limit.

And then we got that large decrease in bandwidth where each block with a target of six blobs is now only 96 kilobytes of blob data that a validator had to store. Then again with BPO1, the blob-parameter-only fork, we increased the target to 10 and the max to 15. BPO2, which happened just a month later, went to 14 and 21 — which is double what we had in Pectra, but still 71% less bandwidth usage on blobs for solo stakers.

#### What's coming in Glamsterdam (4:30) {#whats-coming-in-glamsterdam-430}

What's coming next in Glamsterdam? There are three really key things and one that's still active research.

The first one is ePBS — enshrined proposer-builder separation. The way block production is done today, a lot of people are outsourcing their opportunity to build a block through MEV-Boost to very sophisticated builders. That's the majority of the network. The problem is that you have to trust a relay, and there's a lot of trust that the builder will actually put forward the block they had bid on. ePBS introduces an in-protocol mechanism so there's much less trust, and it's a very clean implementation of the same idea.

The next thing we have is block-level access lists. This is a cool innovation where each block will come with a list that says where in the state it was reading or writing data. What that means is you can process blocks in parallel. Today you have to process blocks sequentially. If you want to process block 10, you have to first process 9 and 8 and so on. Now, if you have a collection of blocks and none of them are conflicting with state access information, you can process all eight of them in parallel. Maybe you have eight cores — that makes Ethereum more efficient and faster to process blocks.

The third thing is gas repricing. There have been benchmarks through this EIP that showed some opcodes were overpriced, some were underpriced. Now we're going to update the fees you pay for each opcode to reflect reality, making Ethereum more secure and more efficient.

#### The evolving role of L2s (6:14) {#the-evolving-role-of-l2s-614}

There's one thing I want to talk about that Vitalik mentioned recently. He said in a tweet a couple of weeks ago that the original vision of L2s and their role in Ethereum no longer makes sense. It got a lot of headlines, and I think a lot of people took the wrong takeaway from this.

Let me tell you what it means from someone on the inside. Ethereum is scaling faster than expected. Fees are lower than ever. I never thought I would be paying gas fees less than one gwei on mainnet, but here we are. Blobs are bountiful — we have plenty. We're scaling blobs faster than expected. And even L2 fees are really low.

So the idea that we need general-purpose L2s — that is, L2s that are simply the same EVM we have on the L1, just copy and paste it a bunch of times and all they do is go faster — that's not the vision anymore. These L2s will thrive with specialization. Some of them will target things like privacy, gaming, specifics in DeFi, or extensions of the EVM. But if they're simply a clone copy of the L1, they're not part of the roadmap where we initially envisioned this kind of sharded paradigm through L2s.

#### FOCIL: protocol-level censorship resistance (7:25) {#focil-protocol-level-censorship-resistance-725}

Beyond Glamsterdam, there are three really cool things in active development and research. The first one is FOCIL — Fork-Choice Enforced Inclusion Lists.

The problem it aims to solve is that block builders have a choice. They get to decide what transactions get included in the block. They may prefer some or not prefer others — maybe it's for an MEV advantage, maybe it's regulatory pressure. But in any case, they're able to censor transactions as they wish, and there's nothing anyone can do about it.

FOCIL changes the power dynamic. Instead of saying block builders can choose all the transactions in a block, there's a random committee that selects — based on their local heuristics — some transactions that they believe must be included in the next block. It's not all of the transactions in the next block. Builders still have a lot of freedom, but there's a subset that they must include. The block proposer will take this short list — maybe eight or so transactions — and put it at the end of the block, and they get executed with the block.

This is enforced through fork choice. Validators that see a block will not attest to it unless it has an inclusion list appended at the bottom. If they see one without the list, they'll consider that block invalid and just ignore it — they won't propagate it, they won't vote on it. This is still active research with some parameters still being decided, but the direction is clear: Ethereum is going to include censorship resistance at the protocol level.

#### Shorter slot times (9:24) {#shorter-slot-times-924}

The next really exciting one is shorter slot times. With Hegata — the fork after Glamsterdam — we're considering whether we can include shorter slot times or quick slots. That's not to say we jump all the way to six-second slots or even faster, but building the rails to make that possible.

It sounds really simple — like, "let's just go faster." But you have to think about network propagation, validator attestation duties where they have a limited amount of time to perform, and then there's the economics. When I first experimented with this, I just changed the 12 to a 6 and suddenly everybody was making twice as much issuance — twice as much money — which is not really the intention behind shorter slot times. It's about going faster but keeping all things equal. So it's a very complex thing, but it has the possibility to get there in the endgame incrementally.

#### Faster finality (10:20) {#faster-finality-1020}

The third thing is faster finality. This is really important because Ethereum finalizes every two epochs — every 13 minutes — and there are applications that really depend on asking the question: is my transaction permanent? If the transaction has not been in a finalized epoch, then the answer is no — there is a small chance that it could be reorged away and the transaction needs to be submitted again.

Now, if we have fast finality, things like exchanges, bridges, or any application can be assured that a transaction is final. First, instead of two epochs for finality, let's do it in one. Then we can say instead of epochs that are 32 slots long, let's shorten them to four slots. Now, if you couple this with six-second slot times, you're talking about finality in less than 30 seconds. That's a really cool endgame.

#### The north star (11:15) {#the-north-star-1115}

All this is built into the north star, where we say the L1 is fast with finalization in seconds. How do we get there? First, we start with PeerDAS — that's already shipped. That's given us a scalable layer for data availability. Next, we have Glamsterdam, mostly including ePBS, which is a clean implementation for proposer-builder separation and makes things like FOCIL more impactful. FOCIL comes in with censorship resistance, which is very harmonious with ePBS. With quicker slots, faster slot times make faster finality even more impactful. Then we get to this end goal where we really do have fast transactions that are finalized in seconds.

#### Closing (12:02) {#closing-1202}

I want you to picture what life is like in two years. It's kind of hard to think because crypto moves so fast. This might be a reality in just two years: four or six-second transaction confirmation times; finality measured in seconds, not minutes; protocol-level enforcement for censorship resistance; protections against post-quantum cryptography; and L2s competing on features and new innovations, not just going faster. All this while still retaining the virtue that you can use a consumer-grade laptop or hardware to run a full node at home. Ethereum is accessible and remains accessible for everybody into the future.

The takeaway I want you to have is: the narrative I presented to you in the beginning — there's truly no evidence to support it. Ethereum is shipping fast. In just one year, there were three upgrades. And in the next 24 months, there are even more things coming, and they'll be coming even faster.

These are not just fantasy five-year timelines. These are actual things with concrete proposals being developed right now. There are things in devnet right now. There are people working as we speak on these implementations. If you're building on Ethereum today, you're building on the most actively developed blockchain in the world.

I'm Preston Van Loon, Ethereum core developer. I work on the Prysm team at Offchain Labs. If you want to get involved, the best way to stay in tune with what's happening in Ethereum is to help build it yourself. Come talk to me afterwards. Come look at the Prysm repo or any of the consensus spec or execution spec repos — we'd really love your contributions. Thank you.
