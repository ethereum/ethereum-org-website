---
title: "EigenLayer: permissionless feature addition to Ethereum"
description: "Sreeram Kannan presents EigenLayer's approach to permissionless feature addition on Ethereum."
lang: en
youtubeId: "-V-fG4J1N_M"
uploadDate: 2023-02-10
duration: "0:24:11"
educationLevel: advanced
topic:
  - "restaking"
  - "eigenlayer"
  - "security"
format: presentation
author: a16z crypto
breadcrumb: "EigenLayer"
---

A research talk by **Sreeram Kannan** (University of Washington / EigenLayer) at an a16z crypto research event, explaining how EigenLayer aims to enable permissionless innovation on Ethereum by allowing stakers to commit the same staked capital to additional slashing conditions in exchange for providing new services like oracles, bridges, data availability layers, and alternative execution environments.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=-V-fG4J1N_M) published by a16z crypto. It has been lightly edited for readability.*

#### Introduction (0:00) {#introduction-000}

Today I'm going to talk about one of the products that we're building, which is also an idea called EigenLayer. We call EigenLayer the restaking collective, but what it does is enable anybody to add new features to Ethereum.

As Tim introduced, I'm an associate professor at the University of Washington in Seattle, where we've been working on blockchains, consensus, and other areas over the last four and a half years. Over the last year, I've been founding the startup EigenLayer Labs. We've done a lot of work on consensus protocols — we had a paper called "Everything is a Race" which analyzes conditions under which proof of work, proof of stake, and proof of space longest-chain-type protocols are secure. We built on top of some of that understanding — for example, a paper called Prism, which is a proof-of-work protocol with very low latency. We also did work called PoSAT on how to create a dynamically available proof-of-stake protocol, where your protocol continues to work under variable participation.

#### When are blockchains accountable (1:31) {#when-are-blockchains-accountable-131}

We also explored when blockchains are accountable. One heuristic is that when you have quorums and signatures, if a group of stakers double-sign on a block, those blockchains are accountable. But there are subtleties — for example, a protocol like Algorand, which also uses quorums, is not accountable because it relies on timing assumptions where you can create safety violations by not speaking anything.

#### Multi-resource consensus (2:11) {#multi-resource-consensus-211}

The two most recent works are on multi-resource consensus — suppose you want to build a protocol that uses proof of stake, proof of space, and proof of work all combined into one protocol. You want it to work even if a majority of proof-of-work miners are malicious, as long as a very small fraction of proof-of-stake miners are honest. We've characterized the trade-off regions across multiple resources.

We also worked on peer-to-peer topology design — how do you make sure that in a blockchain's peer-to-peer network, the consensus protocol respects the ordering of messages? One of the things happening rampantly in blockchains is front-running. To prevent non-targeted front-running — where you just want to go ahead of everybody else because you have a price advantage — we have a paper called Themis which gives the blockchain a native first-in-first-out property.

On top of consensus, there are scaling solutions like sharding. We had a couple of papers — Coded Merkle Tree and Free2Shard — on that.

One thing we found as a major friction in blockchain is that the rate of innovation at the core layers — at consensus, sharding, or peer-to-peer — is way lower than the rate of innovation at the application layer. Applications are permissionlessly deployable — anybody can deploy an application on top of an existing blockchain like Ethereum. Whereas core protocol upgrades are permissioned in a very deep sense. This has stalled our space quite a bit.

#### Decoupling trust and innovation (8:30) {#decoupling-trust-and-innovation-830}

Taking the story back to 2008–2009: Bitcoin pioneered decentralized trust through proof-of-work mining. On top of mining, there's a consensus protocol — longest chain or heaviest chain — which decides the valid chain. On top of that, Bitcoin Script sets the execution semantics. So we have a trust layer at the base, a consensus layer on top, and an execution layer on top of that.

But Bitcoin was also an application-specific blockchain — designed for one application: the exchange of Bitcoin among clients. Going back to 2011, any new application that needed to be built on a blockchain needed its own trust network. For example, somebody wanted to build a decentralized domain name system called Namecoin. Bitcoin's scripting layer didn't give you enough programmability, so you had to create a new scripting layer and a new trust network. There was no way to share trust between Namecoin and Bitcoin.

The core idea built by Ethereum was the decoupling of trust and innovation. They took the Bitcoin scripting layer and replaced it with a general-purpose Turing-complete programming layer — the Ethereum Virtual Machine. This was a small technical upgrade in a basic sense, but what it created was modularity of trust. Now anybody can come and build decentralized applications on top of the system. The person who built ENS did not have anything to do with the trust network. The trust of the Ethereum network became a module that can be supplied to any distributed application.

#### Open innovation (10:23) {#open-innovation-1023}

This led to a massive acceleration of the pseudonymous economy. Anybody creating these applications — they are not themselves trusted, they're just bringing innovation. You come up with an idea, you can be a nobody, you don't need to be trusted, you just write your code, put it up on Ethereum, and everybody trusts that Ethereum will continue to execute the conditions as stated.

One way to model this: the base layers — the trust network, consensus, and virtual machine — are bundled into a trust network producing trust. The Ethereum blockchain is a producer of trust. The distributed applications are consumers of trust. The value exchange is: dapps get trust from Ethereum and in return pay fees back. Just like venture capital was the decoupling of capital and innovation, Ethereum decoupled trust and innovation.

But barriers to open innovation continue to persist. If I have an idea for how to upgrade the Ethereum consensus protocol — say it's 2019 and I came up with the Avalanche consensus protocol — there is no way to deploy it onto Ethereum. So what do I do? I go and create my own whole world. This is the era of alternative layer-1 blockchains — each with different consensus protocols, different virtual machines, but each having to build their own trust networks.

This picture looks exactly like the 2011 picture of Bitcoin and Namecoin. Innovations at the dapp level can simply build onto Ethereum, but innovations that go deeper and touch the heart of the stack have to create fragmented trust ecosystems.

Furthermore, Ethereum only supplies trust to the dapps for block-making — transaction ordering and transaction execution. That's all. If the dapps wanted trust on anything else — reading data from the internet, reading data from another blockchain, running a different execution engine, running a gaming engine, running an authentication system — they have to create their own trust network. Chainlink is a great example: it's an oracle protocol that helps fetch data from the internet into the blockchain, but Chainlink has its own trust network. Its trust is not borrowed from Ethereum stakers.

#### Microeconomic problem (16:28) {#microeconomic-problem-1628}

The microeconomic problem: if you're running a middleware — say, a data storage system — you have to create your own staking mechanism. You need high economic security, which means a lot of capital staked, and then you have the opportunity cost of capital. For example, you want $10 billion staked in your data storage layer. You have to pay a 5% or 10% annual rate on that capital in a non-speculative world. The dominant cost isn't the operational cost of storing data — it's the cost of feeding a massive economic capital base.

You look at any proof-of-stake ecosystem: 94% of rewards go to the person who holds the capital, and only 6% goes to the person who actually does the operations. So even if you come up with a breakthrough idea for reducing operational costs by 10×, the 94% remains unchanged. Your cost structure is capped by the cost of capital.

If you're a dapp, the microeconomic problem is that you're paying a very high fee to a large trust network like Ethereum, but you're limited by the weakest trust you're depending on. If you had an oracle or a bridge that's not as trusted, you could get exploited there. Your security is always the least common denominator.

#### Economic problem (19:52) {#economic-problem-1952}

For the core blockchain, if the core value proposition is to provision decentralized trust and make revenue on it, Ethereum is only able to provision decentralized trust on block-making — not on all the other things required to run a decentralized service. Islands of decentralized trust are being created by other middleware, and instead of revenue aligning and creating a massive trust network, revenue gets fragmented into smaller islands.

#### EigenLayer (20:44) {#eigenlayer-2044}

It's actually a ridiculously simple idea that solves all these problems at once.

EigenLayer is a mechanism to leverage an existing trust network to do other things it was not intended to do. Ethereum supplies trust on ordering and execution. EigenLayer is a series of smart contracts on Ethereum, and the core operative word is restaking.

What is restaking? In proof-of-stake Ethereum, several tens of billions of dollars are already staked in the beacon chain. EigenLayer is a mechanism by which stakers restake — they put the same capital at additional risk. They lock their stake in Ethereum, and the same stake gets committed to additional slashing conditions. Slashing is a mechanism by which your stake can be taken away, but now you add additional reasons by which you can be penalized, on top of the EigenLayer smart contracts.

The property we want: the same stake takes on additional risk. Additional risk on what? On providing any new services that have been built on top of EigenLayer — someone wants to build an oracle, a bridge, a data availability layer, a new consensus protocol. Any of these can be built on top of EigenLayer. If you're a staker opting in, you also specify which subset of services you're opting in to — and thereby gaining revenue while also taking on additional slashing risk.

#### How EigenLayer aligns the ecosystem (23:50) {#how-eigenlayer-aligns-the-ecosystem-2350}

For middleware: if a staker who's already staked in Ethereum opts in to also provide services on an oracle, they do not have an additional cost of capital. They've already staked on Ethereum and are earning APR. By opting into EigenLayer, the marginal cost of capital is either very small or theoretically zero. If you know that as an honest node you'll never get slashed, the risk is minimized. The equation becomes: is the operational cost justified by the revenue? The cost structure of middleware suddenly transforms from capital-limited to operational-cost-limited.

For dapps: especially popular services which many stakers opt into provide the same trust as Ethereum itself. If all stakers potentially opt in, you could get the core Ethereum trust on services that were not natively built into Ethereum.

It's also value-aligned to the core ecosystem. Stakers who staked on Ethereum get block rewards and transaction fees, but they can also get oracle fees, data availability fees, ordering fees — all things that were previously unavailable. The fact that there are additional sources of revenue for staking ETH increases the value of the token itself.

EigenLayer is a two-sided marketplace. One side is stakers opting in. The other side is middlewares and services built on top of EigenLayer opting in to use these stakers.

#### Over-leveraging and risk management (33:00) {#over-leveraging-and-risk-management-3300}

**Audience question:** What if the stake is being over-leveraged?

Let's say there are ten different dapps running their own chains, each with $1 million in value relying on the same $2 million staker quorum — that stake becomes over-leveraged. EigenLayer is also the risk management layer. We model this as a graph problem: each staker is a node, each service depends on a bunch of stakers, and there's a profit from corruption for each service. Then you calculate cuts on this graph to ensure the system is never over-leveraged.

If the system gets over-leveraged, fees go up, more people opt in, and the system becomes under-leveraged again. As more services start, yield opportunities go up, and more capital gets locked in — instead of 5% of ETH being staked, you might have 50%.

#### Block space economics (43:58) {#block-space-economics-4358}

Block space is determined by block limit — the maximum size that a block can accommodate. All blockchain systems have self-adjusting economics where as your block size approaches the block limit, prices start exploding.

Block limit is set by the weakest node's infrastructure. Ethereum's philosophy is to admit a home validator in Venezuela — maybe 1 megabyte per second. So that's how the block limit is set. But all the stakers running on Amazon Web Services have 10 gigabit connections — a 10,000× difference from the weakest node.

EigenLayer automatically solves this by creating a free market where these stakers can lend out their additional block space for other services. Someone could build another chain with 15 giga-gas per block instead of 15 million gas. You get something like 60% of Ethereum's security — and that's already good enough.

#### Staker heterogeneity (48:57) {#staker-heterogeneity-4857}

Staker heterogeneity extends beyond computational abilities. Stakers are highly heterogeneous in their risk and reward preferences. You and I may agree that we'll get slashed if we differ from a Coinbase API output, but for someone else that's completely unacceptable. This can never be normalized into a core protocol but can be externalized into an opt-in layer.

Stakers are also heterogeneous in reward preferences. In Ethereum, block space is a colorless quantity — all transactions are equal, and the only signal to distinguish them is price. It's very difficult to build a social network on top of Ethereum because every social network transaction competes with a DeFi transaction that's much more profitable on a transaction-by-transaction basis. Our solution: stakers opt into different sub-chains in which they have different reward preferences.

#### Democratic and agile innovation (51:01) {#democratic-and-agile-innovation-5101}

EigenLayer solves the problem of how to design a blockchain that is both democratic and agile in innovation. Ethereum is very democratically governed but also very slow to respond. All protocols today make a trade-off between agility and democratic governance. Ethereum plus EigenLayer gets the best of both worlds: a base layer that is democratic and slowly updated, on top of which EigenLayer allows people to build innovations that respond quickly to market demands in a completely permissionless way.

#### EigenDA and closing (52:56) {#eigenda-and-closing-5256}

We are exploring building bridges, event-driven automation, fair ordering services, side chains, and MEV integration — all on EigenLayer. EigenLayer is already live on internal testnets. We have already built the first use case: a hyper-scale data availability layer for Ethereum called EigenDA. It's a data availability layer that incorporates the best ideas in erasure coding and polynomial commitments. On our testnet, the rate at which you can write data is 12.4 megabytes per second — 10× larger than what Ethereum 2.0 is scheduled to ship.

The key insight is that with erasure coding, the total cost of storing a file does not depend on the number of nodes that opted in. But the price you can charge depends on the number of nodes because you're giving more economic security. There's a self-scaling economics where more and more nodes will opt in because they can charge a security premium without increasing operational cost. Erasure coding breaks the trade-off between scalability and decentralization — you get full decentralization and full scalability simultaneously.

#### Q&A highlights (58:00) {#qa-highlights-5800}

**On middleware audits:** Just like there is a smart contract audit ecosystem, we need middleware audit ecosystems. Smart contract audit serves users who are supposed to know nothing. Middleware audit serves stakers who are supposed to know something. If we can't get middleware audits to work, we should not really be trusting smart contract audits either.

**On risk:** The extreme example — all stake opted into an EigenLayer system where you could get slashed even without doing anything bad, and then you got slashed and the whole protocol is at risk. It's possible. But stakers are the ones losing their money, so they should be more careful in opting in. Making it easy for them to be careful is what we're focusing on.

**On L1 block space vs. sidechains:** You can run a very different system — like a Solana VM — on top of Ethereum's trust network. The slashing condition is simple: if you double-sign a block at the same depth, that's an onchain verifiable condition and you get slashed. The cost structure works because restakers have no additional cost of capital, and the difference between an EigenLayer sidechain and having your own chain is that you don't need a new token of value and you don't need to pay to maintain the cost of capital of that token.
