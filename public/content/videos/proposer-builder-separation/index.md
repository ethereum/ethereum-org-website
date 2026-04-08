---
title: "Beyond the Ethereum protocol: proposer-builder separation"
description: "A presentation on proposer-builder separation (PBS), a design pattern that separates the roles of block building and block proposing in Ethereum."
lang: en
youtubeId: "u8XvkTrjITs"
uploadDate: 2024-02-05
duration: "0:22:47"
educationLevel: advanced
topic:
  - "roadmap"
  - "pbs"
  - "mev"
format: presentation
author: CBER Forum
breadcrumb: "PBS Explained"
---

This presentation explains how Ethereum's block production has evolved from a simple model into a sophisticated supply chain involving validators, builders, searchers, and relays. Barnabé Monnot from the Ethereum Foundation walks through why proposer-builder separation exists, how MEV-Boost relays mediate the relationship between proposers and builders, and what in-protocol solutions are being explored to reduce trust dependencies and improve censorship resistance, MEV distribution, and validator decentralization.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=u8XvkTrjITs) published by CBER Forum. It has been lightly edited for readability.*

#### Introduction (0:00) {#introduction-000}

My name is Barnabé Monnot. I'm going to be talking a bit about what's happening outside of the protocol, and in particular the concept of proposer-builder separation and how it's operated with relays and a lot of off-chain infrastructure.

I like to think of the protocol as an abstract object that has certain powers. One of the powers that the protocol has is it's able to give rights to certain participants. We've seen in the previous talk that the protocol empowers validators to perform consensus duties, but it's not the only thing they do — we also have to pack blocks with transactions. We call that the execution duties, and that's what I want to focus on in this talk.

#### Why validators use builders (0:46) {#why-validators-use-builders-046}

What's interesting is even though the protocol is the one that originates these rights and gives them to the validators, what we observe in practice is that many validators choose not to exercise the right themselves. They choose to give the right to someone else to perform it on their behalf. And with "someone else" we know them in Ethereum as builders.

So what we observe is that even though validators continue to make these consensus duties themselves, they decide to pass along the execution duties to builders. It's actually a pretty significant market. Today about 90% of blocks are built by external builders, and that has been the case since about December 2022 — three months after the Merge. The median payment from builder to validator is about $120 per block. There's a million dollars paid out daily, and every 12 seconds there is the possibility for this market to come to some kind of agreement between one proposer and one builder.

Today I want to discuss why validators use builders, where that relationship comes from — I'm going to introduce a bit about MEV and searchers along the way — then I'll tell you how this relationship is mediated, and I'll talk about the relays which exist today and in-protocol solutions that we're thinking about. I also want to zoom out a little, because it's easy to see these pictures and think "oh this is very frightening, what about decentralization?" I want to give you a sense that these are tradeoffs that are being made, but in my opinion are made in the right direction.

#### The naive model and MEV (3:04) {#the-naive-model-and-mev-304}

You can think of a naive model of block production where the validator is selected according to a leader selection process, and they have to make a block containing a list of transactions from the mempool. In the most naive model, you really only have two parties — a validator listening to the mempool, and when it's their turn to make a block, they take out the transactions that pay the most fees and add them in, usually using not very sophisticated packing algorithms.

What has been observed quite dramatically in the last five years is that this gives a lot of power to the producer — in particular the power of last look. They see what users want to do, for instance they see that the user wants to swap something, and they can use that information to extract profit for themselves.

In the best case this profit comes from natural market function such as arbitrage. In the worst case it can come directly from the user's pocket, as in the case of sandwich attacks. For example, a user makes a swap order for token A against token B on some market like Uniswap. That transaction will create a price imbalance with another market deployed on the same chain. The producer can see the pending transaction and insert their own transaction that makes a swap in the other direction on a different market, pocketing the arbitrage along the way.

This really gives a lot of power to the producer and makes the position of being the block producer extremely valuable. This producer privilege is something we now call **maximal extractable value (MEV)**.

#### The role of searchers (5:43) {#the-role-of-searchers-543}

In practice, the producers may not know where the value is. You can have somewhat unsophisticated block producers — as mentioned, anybody can become a validator as long as they have sufficient capital and are able to run a node. In practice, I might not know how to do arbitrage or anything about financial markets. What I would want is for somebody to tell me where these opportunities are — a market of people competing to tell me what the best thing to do is as the block producer.

These entities that are very good at finding opportunities, we call them **searchers**. They surface opportunities to the block producer. The searcher might observe a user making a swap, either through the public mempool or through dark pools or private channels, and then communicate to the validator: "There is a swap happening — if you pack this swap along with this arbitrage into a bundle of atomic transactions and include this bundle, then you can make money from the arbitrage." You'll have many searchers competing to convince the block producer.

This model works well in practice if the searcher trusts the producer to keep the bundle atomic. You might have heard recently of an attack on Ethereum that cost $25 million to a bunch of sandwichers — the root cause was that the attacker managed to break the atomicity of bundles, receiving the contents and trying to reorganize and modify them. That's a very important property that really only holds as long as the producer can be trusted not to break this atomicity.

#### Why we need builders (8:16) {#why-we-need-builders-816}

What do you do if a producer is untrusted? Post-Merge in Ethereum, we have solo stakers — about 6% of the network — who we don't know. The searchers won't really want to send bundles to these block proposers because it's a bit too dangerous.

So the design that was arrived at is: instead of having searchers communicate bundles which the producer includes in their block, we'll just make the whole block for you. That way you can just blindly sign the block — you don't need to know what's in there, you trust that the builder is giving you a good block.

Now you have this even deeper chain: the validator at one end, the user at the other, and in between this whole chain of intermediaries that continues to get denser over time. The builder does the execution part while the validator does consensus.

#### How MEV-Boost relays work (13:01) {#how-mev-boost-relays-work-1301}

Let's say you're a proposer and you want to get into this market. This block production service is a classical fair exchange problem — two parties trying to come to an agreement but they don't trust one another. Classic literature tells you that you can't do fair exchange without a trusted third party.

What we use today as the trusted third party is what we call a **relay** — the MEV-Boost relay. MEV-Boost is the name of the protocol that mediates interactions between builders and validators. The relay sits in the middle to ensure that the agreement comes to terms from both sides.

The relay has a couple of roles. First, it needs to validate the payload of a builder — the relay sees in the clear the block that the builder is making and can check that it's valid and can be proposed to the network. There's a variation called the optimistic relay, where the relay doesn't immediately check validity but asks the builder for collateral in case the block is eventually invalid.

Second, the builders are making bids trying to compete to become the builder selected by the validator. The relay acts as a bid forwarder, sending the bids to the validator. Then in the last step, once the validator chooses one of the bids from the relay — and the validator can connect to as many relays as they want — they sign it, still without knowing what the block contents are, and send back the signed bid to the relay. Given this signed bid, the relay can release the block to the network.

The economics of relays are complicated. Some are free, kind of like public goods. Others have developed revenue models — the Ultrasound relay, for example, has a "bid adjustment" where they take the difference between the best bid and the second best as revenue.

#### Trust and the relay (17:01) {#trust-and-the-relay-1701}

The relay is the trusted third party in the system. Say a relay serves an invalid block — people will immediately see it because it's signed, and they'll very quickly disconnect from that relay. You can even gossip some kind of fault proof. Within five blocks, if the relay doesn't perform well, people will stop trusting it and just disconnect.

So it is based on trust, but with the assumption it can be replaced somewhat quickly. The relays aren't validators — they don't necessarily have stake and they don't have to have anything to do with Ethereum. It might be people we know and love today, but tomorrow it could be anyone.

#### Enshrining PBS in the protocol (20:01) {#enshrining-pbs-in-the-protocol-2001}

We're trying to eliminate the relay's trusted third-party status. We have a trusted third party that we like in Ethereum — and it's Ethereum itself. You can design in-protocol solutions that try to essentially enshrine the role of the relay and make the dependency on it optional.

Right now, the Ethereum protocol sees part of what the validators are doing but is completely blind to the network of builders. We're trying to push it to have the Ethereum protocol become the trusted third party in the interaction between proposer and builder — in that sense, we don't need to rely on the relay anymore.

#### Constraining builders, amplifying decentralization (22:05) {#constraining-builders-amplifying-decentralization-2205}

The big picture is important. At every layer there seem to be different games happening and different players taking money from one another — is this traditional finance all over again? I want to argue that these tradeoffs are not coming from a bad place. They try to lean into properties of these systems that we think are helpful to scale them and make them more useful.

Vitalik talked about a fundamental asymmetry of services that a blockchain might offer. Consensus requires a very large decentralized set of people keeping check. But some services really require one person to do the job well and for everyone else to verify that the job was done well. We only need one builder to make a block, and then everybody can verify it's valid.

Today there are clearly three dominant builders: Beaver Build, Titan, and rsync Builder. Is that a good state of things? Not really — we can do better. But is it realistic to imagine we'll have as many builders as validators? Probably not.

What we really want is this thin layer of validators constraining and leveraging the fact that there are high-powered parties in the middle that can perform tasks that don't require honest majority assumptions.

Some ideas for constraining builders:

- **Inclusion lists** — where the validator tells the builder "you have to include these transactions in your block"
- **Partial block building** — breaking up the full block so the builder doesn't have monopoly over all the space
- **Reducing third-party dependencies** — enshrining the relay role in the protocol

To amplify validator decentralization:

- **Attester-proposer separation** — instead of making the validator the block producer by default, choosing a different set of people to become block producers and unbundling the roles
- **Improved staking mechanisms** — the staking in Ethereum is a bit rudimentary today and can be improved

#### Questions and closing (27:03) {#questions-and-closing-2703}

A question from the audience: in the traditional finance world, settlement time is being reduced from two days to one day. Would reducing the settlement time from 12 seconds to a shorter interval deal with some of the front-running problems?

People are talking about this — they call it **pre-confirmations**. The idea is you send your transaction and somebody tells you "you're in, at this price, on that state." The thing is, you can't settle faster than the protocol is running. You can't get faster finality settlement than 12 minutes. You can't move faster than the block time.

Shortening the block time is hard because we want to keep the validator layer as decentralized as possible, and shortening it just increases the hardware requirements.
