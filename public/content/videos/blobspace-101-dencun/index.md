---
title: "The next Ethereum upgrade: blobspace 101"
description: "Domothy explains blobspace, the new data availability layer introduced by Ethereum's Dencun upgrade, covering how blob transactions work, why they matter for Ethereum scaling, and what comes next for data availability."
lang: en
youtubeId: "dFjyUY3e53Q"
uploadDate: 2024-02-27
duration: "1:02:31"
educationLevel: intermediate
topic:
  - "scaling"
  - "blobs"
  - "dencun"
  - "upgrades"
format: interview
author: Bankless
breadcrumb: "Blobspace 101"
---

This interview covers Ethereum's blob space resource, introduced with [EIP-4844 (proto-danksharding)](https://www.eip4844.com/). Ethereum researcher Domothy joins David Hoffman and Ryan Sean Adams on the Bankless podcast to explain the history of the rollup-centric roadmap, the technical mechanics of blobs, and the economic implications of separating block space from blob space.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=dFjyUY3e53Q) published by Bankless. It has been lightly edited for readability.*

#### Introduction to blob space (0:00) {#introduction-to-blob-space-000}

**Ryan Sean Adams:** Welcome to Bankless, where we explore the frontier of internet money and internet finance. This is how to get started, how to get better, how to front-run the opportunity. I'm here with David Hoffman, and we're here to help you become more bankless. You know how we say blockchains sell blocks? Well, soon Ethereum is going to be selling more than just blocks — it's going to be selling blobs too.

**David Hoffman:** That's right, blobs. So we're just a few months out from the biggest Ethereum release since The Merge, and I think no one has fully mapped out the implications of this, but it's going to be huge. Ethereum is getting a new product to sell. It's called blob space, and that is in addition to block space. The cost of transactions on layer 2s is about to drop towards zero. The economics of ETH gas and the burn are about to change forever. We're calling this upgrade the blob space upgrade, EIP-4844, proto-danksharding. We want to cover everything that you need to know about blob space.

**Ryan Sean Adams:** A few takeaways here. Number one, we go through what blob space is. Number two, we go through the history of how we actually got here — this rollup-centric roadmap. Number three, we go through the economics. What does this mean for Ethereum's economics, for ETH value accrual, for ETH the asset? David, why was this episode significant to you?

**David Hoffman:** I think if there's any sector of conversation that you and I really just love, it's the intersection of cryptography and economics — like numbers and economic manifestations. I love playing these protocols.

**Ryan Sean Adams:** Yeah, that's our love language.

**David Hoffman:** We've talked about EIP-4844, we've talked about proto-danksharding. Those are the same things. We've defined it a handful of times in a number of different capacities. But we've never done the aggressive head-first dive down the rabbit hole and come out the other side answering the economics side. So we have technically scaled data availability at a technical level — that is a protocol improvement. But how does that connect to the market side of Ethereum? The one marketplace is now being fractured into two: block space and blob space are now two different independent markets that are contained inside an Ethereum block.

What does that mean for Ether? What does that mean for the marketplaces that arise around these things? How does the equilibrium of the supply and demand of each push and pull on each other? What does this do for layer 2 scalability? What does this do for economic use cases on top of layer 2s? We're going to start with the basics, but then we're going to poke out the other end of the rabbit hole into the economic side of this conversation.

Let's bring in our guest, Dom, also known as Domothy. He is a researcher at the Ethereum Foundation working on research and development of key Ethereum upgrades coming down the pipe, including EIP-4844 (the subject of today), full danksharding, and MEV burn.

#### The history of the rollup-centric roadmap (10:00) {#the-history-of-the-rollup-centric-roadmap-1000}

**Ryan Sean Adams:** So Dom, to fully understand how we got to blob space, I think it's worthwhile going back down memory lane to understand the fullness of the Ethereum roadmap, because it came to a very logical conclusion of blobs and blob space. Can you take us back? Because at one point in time, Ethereum's rollup-centric roadmap was not a thing. We had this thing called execution sharding, which we never actually got. Where in the history of Ethereum's roadmap is appropriate to really understand the full context of blob space?

**Domothy:** Sure. Even before Ethereum launched, there were already thoughts about how to scale it because everyone knew even back then that a single blockchain with every node running everything would not be enough. So initially there was a bunch of different ideas for sharding. The first attempt to actually spec it out was sharding with execution where you basically have, let's say, 64 different independent chains and they try to cross-communicate. It turns out that's hard to do — there's a lot of complexity involved.

It was split up into different phases. First, we're going to launch a Beacon Chain, then figure out how to actually merge it with the current execution layer. Then we'll do Phase One, which is just data sharding — so no execution, just smaller blockchains containing data. And then figure out how to do execution sharding. It was a lot of figuring it out as we go, but safely so we don't do something we regret later and break the entire blockchain, because there's so much economic activity on it.

**David Hoffman:** To provide detail on execution sharding — it's the shuffling of validators randomly across distinct shards of the blockchain, with each shard essentially being its own mini-blockchain running in parallel to the Beacon Chain. It sounds a little bit like what we have today with rollups, but the difference here is that the shards of Ethereum are actually a part of the layer 1 protocol. The layer 1 protocol determines what the shards are, whereas rollups are disjointed. Originally, it was going to be 64 of these shards operated, managed, and produced by the Ethereum layer 1 protocol. Am I articulating this correctly?

**Domothy:** Exactly. Getting execution scaling this way is more indirect with rollups and data sharding, but it's kind of like a cheat code from a research perspective because Ethereum layer 1 has much fewer things to do and worry about. The rest is offloaded to rollups, which in my view is better than the original plan. In the original plan of state-sponsored shards, everything is the same — same blockchain, same EVM, same trade-offs. Now instead of that, you can have rollups competing against each other to get the best environment and trade-offs. If you prefer super speed over super security, you can go on a different rollup. You have choices, innovation, and competition at layer 2.

**Ryan Sean Adams:** Let's touch upon the modular world Ethereum is in. There's the consensus layer, the data availability layer, and the execution layer. The consensus layer defines what's true — the order of the blocks. The data availability layer is what happened — the data layer. The outside layer is execution, where the activity is happening right now. Originally, Ethereum combined all three of those on the main chain.

Now what we're doing with the rollup-centric roadmap is we're sharding out execution from the main chain into these rollups. But in order for rollups to be secured fully with similar guarantees as Ethereum mainnet, they have to post their data back to the Ethereum mainnet. When they do that, it currently costs block space, and it costs a lot of money. The reason for proto-danksharding (EIP-4844) is the economics change in a very rollup-favorable way. Dom, anything to add there?

**Domothy:** I'd just add that right now data availability is more implicit and it boils down to trustless verification. We want everyone to be able to verify the chain by themselves and not have to have a "trust me bro" third party in the middle. That's the bottleneck. You need to be able to verify everything, which implicitly means you need to have the data available to you to check the state transitions.

Back in late 2020, people realized rollups were starting to become incredibly good and popular, and they solved our execution scaling issue without the need for execution sharding. By going with an ecosystem of rollups rather than trying to be some layer 1 maximalist, rollups can make their own trade-offs, spin up their own blockchains, and experiment with novel things. Ethereum handles the verification — that's the core of what a blockchain is.

#### What is blob space? (30:00) {#what-is-blob-space-3000}

**Ryan Sean Adams:** Now take us to the current state, Dom. We have many rollups using Ethereum layer 1 block space, paying high gas fees to post their state data so anyone can verify it. So, Dom, what is a blob?

**Domothy:** A blob is just a piece of data — specifically a large, raw array of numbers essentially. A blob on Ethereum right now is a fixed size of about 128 kilobytes. It is just raw data attached to a transaction, known as a blob-carrying transaction, that you submit to layer 1.

The crucial design constraint here is that the Ethereum layer 1 EVM (Ethereum Virtual Machine) — the execution engine — does not have access to the data inside the blob. In standard blocks, data like call data involves the system looking at what functions are being called, what money is being moved, and verifying the state changes. The EVM accesses all of that. But if layer 2 scaling involves posting the data of rollups precisely so that an *off-chain* verifier can do the computation, then Ethereum *layer 1* functionally doesn't need to actually look at it and execute it.

It's essentially a sealed package. The layer 1 takes it, guarantees that everyone has access to look inside if they want to physically download it, but the main Ethereum processing execution layer itself doesn't actively read and compute the data. Because it isn't reading and computing the data in the EVM, it requires radically fewer processing resources from nodes. That's why it's so much cheaper.

**David Hoffman:** So to summarize: Block space cares about computation, state execution, and storage of logic. Blob space cares exclusively about data availability. Layer 1 doesn't care who posts what in these blobs; all it cares about is receiving these blobs and holding them for the designated availability window so that interested parties (like rollup sequencers and users) can pull them, verify that the data wasn't maliciously withheld, and move on.

**Domothy:** Exactly. And another critical property of blobs is that they are automatically pruned after a period of time — currently around 18 days. The reason they're pruned is that to guarantee trustless verification, individuals only need that data available to prove finality and consensus over the rollup state within a specific window of challenge. You don't need a thousand nodes holding blobs from two years ago to verify your transaction today. When the window expires, you won't get it from an Ethereum node anymore; you get it from history providers, indexers, or the rollup's native block explorers. Storage on Ethereum is insanely expensive forever. Dropping the storage requirement allows us to scale blob throughput without destroying node operators' hard drives.

#### Economics and full danksharding (55:00) {#economics-and-full-danksharding-5500}

**Ryan Sean Adams:** We know that 4844 is step one — what we call proto-danksharding. It establishes the blob format and the isolated fee market, but the actual target number of blobs per block is constrained initially to be quite safe. What does this look like scaling towards full danksharding?

**Domothy:** Right now, under EIP-4844, we're targeting essentially 3 blobs per block, with a hard maximum of 6. That limits the absolute maximum data throughput on layer 1 immediately following the upgrade to prevent any network stress while we see how the feature functions in continuous production.

Full danksharding scales this dramatically. It moves towards data availability sampling (DAS). With DAS, full nodes no longer need to individually download every single blob to verify the data was made available. They can statistically sample tiny pieces of the blob data. If the statistical sample proves available, the mathematical probability that an attacker is hiding data approaches effectively zero (like a one-in-a-billion chance). Once you don't require full download of the entire blob, you can scale the blob capacity into the double digits or higher per block.

**David Hoffman:** This creates a fractured fee market inside an Ethereum block. Right now, a layer 2 rollup has to compete with Uniswap and OpenSea traders for the same block space resources in an Ethereum block. But these are fundamentally different usage patterns. If there's an NFT mint going crazy on Ethereum L1, gas spikes, and layer 2 rollups trying to post their data state suddenly face skyrocketing business expenses just to do their necessary security duties.

With a two-dimensional fee market — essentially a separate isolated road for blobs to drive on — that NFT mint on Ethereum L1 spikes execution gas the same way, but it uses no blob space. The blobs remain entirely uncongested and effectively cost pennies. A multi-million-dollar NFT mint on the main chain has zero impact on the economic cost of finalizing transactions on Arbitrum or Optimism.

**Domothy:** Yes, they're entirely disconnected. And the reverse is true. If layer 2 throughput spikes immensely and thousands of rollups operate and congest the blob space, the resulting spike in blob base fees won't affect the cost of doing a simple transaction on Ethereum mainnet. The blob base fee operates exactly like EIP-1559 base fee, but on its own dimension. And to your earlier question about the burn — yes, the blob fee generates burned ETH to pay for the blob space data inclusion, totally separate from the block space base fee burn.

#### The future of Ethereum scalability (75:00) {#the-future-of-ethereum-scalability-7500}

**Ryan Sean Adams:** I want to get to what happens specifically at the release of 4844. Initially, there's obviously a very high expectation that when the blob capacity suddenly unlocks, there won't be enough rollup demand at that exact microsecond to fill it completely. Blob space will be almost comically cheap at launch. But isn't there the law of induced demand? If you have incredibly cheap resources, the applications that consume those resources explode in volume.

**Domothy:** The initial transition will drop layer 2 fees essentially to near zero, because all existing rollups currently competing for expensive block space will seamlessly transition to a nearly-empty massive pool of blob space. That's a massive and instantaneous margin expansion for layer 2 networks, which will be passed directly down to the users the moment they integrate their new proving logic with 4844.

But you're correct — cheap block space drives high-velocity application design. When you suddenly can build an onchain game that generates millions and millions of micro-state transitions for fractions of a penny because the data persistence overhead is gone, entirely new classifications of applications become economically viable that weren't under standard constraints.

This sets up an interesting economic dynamic in how ETH accrues value. If layer 2 transactions explode 10x or 100x because of newly possible applications running on near-free data availability, the aggregated volume will eventually start competing for blob space. Then the EIP-1559 blob base fee naturally rises until the market reaches equilibrium, creating a compounding continuous loop of burning ETH while expanding layer 2 utility.

**David Hoffman:** It represents the success and maturation of the rollup-centric roadmap. Ethereum the monolithic execution environment hit a wall where scaling throughput linearly destroyed its decentralization mandate. Rollups provided a way to bypass the execution bottleneck but were still tethered to the layer 1 data bottleneck. Blob space unlocks the data bottleneck in the same way rollups unlocked the execution bottleneck. When this upgrade ships, Ethereum transitions fully from processing single transactions to processing verified networks of execution.

**Ryan Sean Adams:** To sum up the timeline, EIP-4844 comes optimistically by the end of the year or early next year, and full danksharding follows in the subsequent development cycle. It truly is the infrastructure scaffolding required for Ethereum to onboard the planet, and we're so close to it operating in the real world. Dom, thank you for walking us through this massive unlock for the network.

**Domothy:** Thank you for having me.
