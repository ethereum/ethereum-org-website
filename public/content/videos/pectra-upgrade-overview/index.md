---
title: "What's going into the Pectra upgrade?"
description: "Christine Kim on Ethereum's Pectra upgrade, covering the EIPs included in the upgrade, what they change about the protocol, and why they matter for users, developers, and validators."
lang: en
youtubeId: "ufIDBCgdGwY"
uploadDate: 2024-11-14
duration: "0:20:46"
educationLevel: intermediate
topic:
  - "roadmap"
  - "pectra"
  - "upgrades"
format: presentation
author: Ethereum Foundation
breadcrumb: "Pectra Overview"
---

A presentation by **Christine Kim** at Devcon SEA covering the EIPs included in Ethereum's Pectra upgrade, what they change about the protocol, when mainnet activation is expected, and which EIPs were removed from scope.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=ufIDBCgdGwY) published by Ethereum Foundation. It has been lightly edited for readability.*

#### Introduction (0:00) {#introduction-000}

We're going to talk about all the EIPs that are going into the Pectra upgrade. Quick disclaimer before I start: everything I'm about to say is all informational — for informational purposes — and should not be construed as financial or investment advice.

#### When is Pectra mainnet (0:23) {#when-is-pectra-mainnet-023}

Before we get into what's going into Pectra, the question that I get asked the most is "when is Pectra going on mainnet?" So I'm just going to get that out of the way so we can get into the technical stuff.

This is a very tentative timeline analysis. When people ask me when Pectra is going to happen, I say it's too early to tell — because it's true. Pectra is still in very early stages of its development. Specifications are changing, and the scope of Pectra hasn't really truly been finalized quite yet.

Through this process, one of the things you can learn is how upgrades get developed, how upgrades get tested, and eventually how they make it onto mainnet. Initially, developers decide on a couple of EIPs to include in an upgrade, and then they implement those EIPs onto private developer-focused testnets called devnets. Developers have already launched a couple of devnets for Pectra, so these EIPs have already undergone a couple of rounds of implementation. Developers have noticed edge cases and bugs that they want to fix, and they iterate on these EIPs by launching new devnets. Devnet 4 was launched last month in October.

This doesn't usually happen, but developers — very specially for this entire conference and for everybody in the audience — launched the first public Pectra testnet this month. It's called Mekong, so you can go and interact with some of the EIPs that are going to be in Pectra early on. It's based on devnet 4 specifications, but please note that those specifications are changing.

There is a list of specification changes to the EIPs that developers already want to include into Pectra devnet 5 — things like BLS precompile repricing, and a new EIP that hasn't been implemented into devnet 4 but developers are aiming to implement for devnet 5 or a future upgrade. So Pectra specifications are changing. I foresee multiple more devnets still to go before specifications can really be frozen.

The other part that's really important for the Pectra upgrade in its progress to mainnet is for the scope to be finalized — for all of the EIPs going into Pectra to be decided upon. There is one EIP — it's not really an EIP yet — but it's the blob capacity increase that developers have not yet formally included into Pectra, but it seems as though they're likely to include some kind of blob capacity increase because they have recently included an EIP which introduces a mechanism to update the blob gas target and blob gas max dynamically through the consensus layer, rather than having those parameters hard-coded in the execution layer and the consensus layer.

Once the scope is finalized, you start testing whatever new EIPs you've implemented — the full scope of the Pectra upgrade — and battle-test it on a couple more devnets. I envision maybe until devnet 6 or 7. And then once the Pectra specifications are frozen and ready to go — all the edge cases that developers can find on devnets have been found — they will then release the Pectra upgrade onto public Ethereum testnets. There are two right now: Sepolia and Holesky.

Historically, developers have budgeted about two weeks between public testnet upgrades. In rare occasions, developers shrunk that timeline down to just one week between testnets, but because of the size of Pectra, I imagine developers will want to take the full time. I'm budgeting roughly about a month for Sepolia and Holesky, and after that is when you can finally have the mainnet activation.

Given all of the information I know right now and the progress developers have made so far on Pectra, my best analysis and guess is that Pectra mainnet will realistically happen next April 2025. Again, this is very tentative because a lot can change. Development happens on a week-to-week basis — developers are on these ACD calls talking about this bug they didn't expect in this EIP or this new EIP they want to add into Pectra.

#### Execution layer EIPs (6:23) {#execution-layer-eips-623}

Let's move on to the meat of this talk — what is going into the Pectra upgrade. There are ten EIPs going into Pectra, and four of them are focused on the execution layer.

**EIP-2537** is a new precompile into the EVM — BLS12-381 curve operations. This is a new cryptographic signature scheme that smart contract developers have been asking for for a very long time. This EIP was created in 2020, and at the time dapp developers were saying they really wanted it because it would give certain dapps that rely on zero-knowledge cryptography stronger privacy guarantees, potentially increased security and scalability. BLS signatures are also the aggregation that happens on the consensus layer for validator attestations. This EIP is a long time coming. One of the concerns is: are there still apps waiting for the BLS precompile, and are they going to use it when it goes live? But if you're in this audience and didn't know that the BLS precompile is finally coming — it's coming.

**EIP-2935** — serve historical block hashes from state. This one introduces a change to the execution layer such that proofs of historical blocks can be generated from the state. It has some near-term benefits for light client syncing and for smart contracts that may want to utilize data about the state of a prior block directly through the EVM — you can't actually do that right now. But those near-term benefits aren't the main reason this EIP was included into Pectra. The primary reason is that it's a prerequisite for Verkle — the major overhaul to Ethereum's state data structure. Developers had thought that transition was going to happen right after Pectra, but Verkle is not going to go into Fusaka. They've punted it out to another upgrade, but this stepping stone has already been checked off the list.

**EIP-7685** — general-purpose execution layer requests. This EIP doesn't really introduce new features to Ethereum — it's an EIP to support other EIPs in Pectra. In Pectra, there are a couple of EIPs where the execution layer will be able to pass way more messages — different kinds of messages — to the consensus layer that it couldn't before. Smart contracts on the execution layer will be able to trigger validator withdrawals, consolidations, and deposits. Rather than implementing these new communication channels all in a separate, unique fashion, this EIP creates a generalized structure — a generalized bus — to house these requests. It will be easier to test, easier to implement across clients, and easier to standardize, especially if developers want to introduce new types of execution-layer-triggerable requests.

**EIP-7702** — set code for externally owned accounts. A new transaction type is coming into Ethereum. This transaction type will temporarily allow an EOA to have greater flexibility, enabling features like transaction batching, sponsored transactions, conditional transactions, and delegated security. You might be thinking, "is this the account abstraction vision coming alive on Ethereum?" No, it's not — it's a baby step. It's an early step to see what the real roadmap to true native account abstraction could look like on Ethereum. There was quite a bit of debate in terms of how developers should take that first step, and a lot of controversy around this one getting in and its design — but it's in.

#### Consensus layer EIPs (12:00) {#consensus-layer-eips-1200}

There are six others — these are consensus layer EIPs.

**EIP-7742** — uncouple blob count between the consensus layer and the execution layer. This is the most recent EIP to be included into Pectra. Currently, the blob capacity is hard-coded into the execution layer and the consensus layer in all the different clients. Updating that hard-coding isn't as easy as some may think. Creating a mechanism to dynamically set the blob capacity through the consensus layer will ensure that in the future developers can easily change the blob capacity of Ethereum, and that such an upgrade only requires consensus layer changes — not changes to both layers.

**EIP-6110** — supply validator deposits onchain. The Merge happened and Ethereum is more mature as a proof-of-stake blockchain. Certain security assumptions can be relaxed now. This EIP removes an additional round of voting that happens on the consensus layer side every time you deposit 32 ETH on the deposit contract, ensuring all deposit validation happens on the execution layer. This has benefits for validator UX — it will shrink the time between when you deposit your 32 ETH and when you see the validator actually activated on the beacon chain.

**EIP-7002** — execution-layer-triggerable withdrawals. This is very good for staking pools. Right now, if you want to fully withdraw a validator, the node operator that operates that validator needs to use their withdrawal key to fully exit the validator. Through this EIP, smart contracts will be able to initiate those full withdrawals. It's a trust assumption you can now remove from staking pools — the likes of Lido, Rocket Pool, and other smart-contract-based staking pools can now trigger full withdrawals of validators if they wish.

**EIP-7251** — increasing the maximum effective balance. This is really an issue. When developers were thinking about the beacon chain, they did not expect the validator set to grow so quickly — we're at about 1.2 or 1.3 million validators. There are a lot of active validators, a lot of messages being passed around on the networking layer, and it's too much. It's straining nodes, and left unchecked it would be a major problem for the health of Ethereum. EIP-7251 is designed to encourage validators to consolidate their ETH and have a maximum effective balance higher than 32 ETH, reducing the number of active validators on Ethereum.

**EIP-7549** — move committee index outside attestation. This is a restructuring and refactoring of the way attestations are aggregated to reduce the networking load on Ethereum and save node bandwidth. When developers were including this in Pectra, they thought it was a great change with wonderful benefits and an easy one — but in practice, it turned out to be a lot harder to implement than expected.

#### Summary (17:19) {#summary-1719}

Pectra is a mixed bag of updates. It's going to do three things: first, fix critical shortcomings of Ethereum as a proof-of-stake blockchain — think about MaxEB, that's a critical fix because the validator set size can continue to grow unchecked. Second, improve the user experience — the new transaction type, more flexible designs, some improvements for more trustless designs for staking pools. And third, increase Ethereum's data availability capacity — that hasn't been formally included into Pectra but seems likely.

#### EIPs removed from Pectra (18:02) {#eips-removed-from-pectra-1802}

Here are all the EIPs that were removed from Pectra. This is kind of a first-time thing for an upgrade to have so many EIPs removed.

**PeerDAS** — there was going to be a much bigger increase to data availability capacity in Pectra initially. PeerDAS would allow developers to increase the blob target of Ethereum by multiples more without greatly impacting the bandwidth consumption and computational requirements of running an Ethereum node. But it's still in research and development phase.

**EOF** — the EVM Object Format. These eleven code changes as a bundle are a major update to the Ethereum EVM. Both PeerDAS and EOF were really initially included in Pectra but were being tested on separate devnets. Developers thought they would require a lot more time to get ready for mainnet activation, and they did not want to delay the other Pectra EIPs. So they said PeerDAS and EOF clearly need more time — they'll push them to another upgrade and not hold back the other Pectra EIPs from mainnet.

These are now moved to Fusaka. Verkle was initially slated for Fusaka but has since been further delayed. EOF and PeerDAS are in Fusaka for now. There are other EIPs that developers will reconsider for inclusion in Fusaka — the SSZ transition, inclusion lists, changes to issuance, history expiry, ePBS, and account abstraction direction.

#### Q&A (22:02) {#qa-2202}

**Host:** When EOF?

**Christine Kim:** I literally just said the devs are going to try and put it into Fusaka. Do I think that it's likely? Probably not. Do I think that Fusaka is going to happen in 2025? Absolutely not. The amount of time it's taken to prepare Pectra — Fusaka will take a similar if not longer time.

**Host:** Is there an emergency path for increasing blob target between now and Pectra activation?

**Christine Kim:** No. The blob target is a hard-coded parameter in the execution layer and consensus layer. For blob capacity to change, developers need to do a hard fork. I do not think that there's any way for the blob capacity to increase between now and Pectra without a hard fork.

**Host:** Is the proposal to change the blob limit only or also the blob target?

**Christine Kim:** Great question. The most conservative increase is three to four — just changing the target, not changing the max at all. But that's not what layer 2 developers have asked for. There's a representative of the Base team — Coinbase's Base team — and he's been vying for more aggressive increases. He's shown data to suggest that the increase wouldn't negatively impact the decentralization of Ethereum. There's a conservative proposal to just change the target, and then there's a more ambitious proposal to change both the max and the target — like eight and four, or six and twelve. There are varying gradients.

**Host:** You urged people to be more involved in governance. How can the community get more involved?

**Christine Kim:** ETH Research and ETH Magicians are two really great discussion forums for upvoting certain EIPs and showing your support. The ACD calls are probably the most high-signal place — all you have to do is leave a comment on the ACD call agenda on GitHub and say this is an EIP you'd like to speak about or present. The moderator of the call is usually very agreeable to giving you the time. Don't take up too much time though — maybe five minutes to say your piece.
