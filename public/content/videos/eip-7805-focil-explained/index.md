---
title: "EIP-7805: Fork-choice enforced inclusion lists (FOCIL)"
description: "Ethereum researchers Thomas Thiery and Julian Ma walk through EIP-7805 (FOCIL), which uses aggregated local inclusion lists to guarantee that valid transactions cannot be censored by block builders."
lang: en
youtubeId: "cUGyLx-mf6I"
uploadDate: 2025-02-12
duration: "1:00:30"
educationLevel: advanced
topic:
  - "privacy"
  - "network-upgrades"
  - "roadmap-and-priorities"
format: presentation
author: ECH Institute
breadcrumb: "EIP-7805 (FOCIL)"
---

Episode 141 of **PEEPanEIP** by the Ethereum Cat Herders. Host Pooja Ranjan is joined by **Thomas Thiery** and **Julian Ma**, researchers in the Robust Incentives Group at the Ethereum Foundation and co-authors of [EIP-7805](https://eips.ethereum.org/EIPS/eip-7805), to explain Fork-choice enforced Inclusion Lists (FOCIL): why Ethereum needs protocol-level censorship resistance, how the mechanism works, and where implementation stands.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=cUGyLx-mf6I) published by the Ethereum Cat Herders. It has been lightly edited for readability.*

### Introduction (0:35) {#introduction-035}

**Pooja Ranjan:** Hello and welcome to PEEPanEIP, the one and only show where we dive deep into Ethereum Improvement Proposals and explore their impact on the ecosystem. This is episode 141, brought to you by the Ethereum Cat Herders. I'm your host, Pooja Ranjan, and today we are talking about EIP-7805, Fork-choice enforced Inclusion Lists.

Documented in November 2024, EIP-7805 is a standards track core proposal currently in draft status. This proposal aims to allow a committee of validators to force-include a set of transactions in every block. Co-authored by Thomas Thiery, Francesco D'Amato, Julian Ma, Barnabé Monnot, Terence Tsao, Jacob Kaufmann, and Jihoon Song, the proposal is in active discussion for a future upgrade.

In this episode, we'll explore the details of EIP-7805, its implications, and its potential impact on the Ethereum ecosystem. To talk more about the proposal, we are joined by Thomas Thiery and Julian Ma. Welcome to PEEPanEIP.

**Thomas Thiery:** Thanks for having us.

**Julian Ma:** Yeah, thank you so much for having us.

**Pooja Ranjan:** We are excited to learn about the overview of the proposal, where it stands today, and how soon we can see it on Ethereum mainnet. But before we get started, our community loves getting to know the researchers and developers behind the work. Could you share a bit about yourself, the project you are currently involved in, and your journey within the Ethereum ecosystem?

### Guest introductions (2:14) {#guest-introductions-214}

**Julian Ma:** Sure, I can start off. I'm Julian, a researcher at the Robust Incentives Group, just like Thomas, at the Ethereum Foundation. The Robust Incentives Group is concerned with the economics of the protocol very broadly. Some of us have been looking at transaction fee mechanisms, like EIP-1559, and others have been looking at consensus layer attacks, mostly ones motivated by economic incentives.

For me, I started off with an internship looking at base fee derivatives, and after that I joined full time. I've been working mostly on proposer-builder separation and MEV-related topics, and now I'm focusing on inclusion lists via FOCIL with this EIP, and looking forward to attester-proposer separation. I'd say I'm most excited about bringing research into production via this pipeline of starting with more theoretical work and bringing it towards an EIP that can hopefully be proposed and implemented within Ethereum.

**Thomas Thiery:** I'm Thomas. I also work at the Ethereum Foundation in the Robust Incentives Group, doing research. My background is actually a PhD in neuroscience, which was very different. But I got curious about blockchains and distributed systems, wanted to try something a bit different, and joined a crypto data company called Dune. I stayed there for a while, but then I missed doing research, and I was lucky enough to be able to join the EF and the Robust Incentives Group, which has been great so far.

I've worked on similar topics. MEV was quite big when I joined. Interestingly, my very first research posts were very small, but they were on inclusion delays and censorship resistance. I didn't really dive deep into it until more recently. For the last six months to a year I've been more active on the censorship resistance and inclusion side of things. It's been really nice to be able to start with research ideas, improve on previous ideas that were very interesting but didn't include some of the details we are going to talk about, come up with a proposal, and now have implementations and devnets that most of the people I've talked to think would be a good addition to Ethereum.

**Pooja Ranjan:** Thank you for sharing. It is always inspiring to learn the background of the developers. It is interesting to see that they are coming from different domains and ultimately contributing to the Ethereum ecosystem. I understand we do have a presentation here today. So without further ado, let's peep in.

### Presentation: goals of FOCIL (5:16) {#presentation-goals-of-focil-516}

**Julian Ma:** Perfect, thank you so much. I'd like to start off with a small presentation about how EIP-7805, or FOCIL, works and why exactly we want to do it. It's meant to start the conversation, so it won't be too in-depth, to leave some room for discussion afterwards.

The main goal of FOCIL is to increase the credible neutrality of Ethereum. FOCIL does so by removing the inclusion monopoly that currently a single proposer or block builder holds within a slot. Instead, FOCIL allows multiple validators to contribute to building a block by including transactions in each block.

The higher-level goal is to pursue a property that we call chain neutrality, which means any pending fee-paying transaction should be included if it's available and if there's room to include it onchain. We believe that if this property is sufficiently satisfied, then we increase Ethereum's credible neutrality.

### Why do we need FOCIL, and why now? (6:09) {#why-do-we-need-focil-and-why-now-609}

**Julian Ma:** Why do we need something like this? Currently almost all validators outsource block construction to MEV-Boost, which is an out-of-protocol market where builders bid for block construction rights. In this market there are only two entities that really dominate, and this means that 90% of blocks are built by only two entities.

We see here that Ethereum can't source its credible neutrality from local block building anymore. It once did. It started out by having proposers located all over the world, each building their blocks locally, meaning that all transactions were included. But now that block building is outsourced to these sophisticated entities, this isn't sufficient anymore. So it's necessary to implement more robust anti-censorship measures, and FOCIL is the best-known way to do so.

Why should we implement FOCIL now? You may think that builders are not censoring as much now, but they could start censoring at any point, whether for regulatory reasons or economic reasons. And economic censorship is definitely something not to be misunderstood. It's also good to introduce FOCIL when there's relatively little censorship, because then you introduce it as a baseline and as a default. All validators make inclusion lists regardless of their jurisdiction or economic incentives, and it causes little market instability. Whereas if you were to introduce FOCIL when all builders are censoring, perhaps it would be more difficult.

Then, based rollups are becoming more of a thing these days, and they will load-bear on Ethereum's block building. If we want to provide the sequencing that Ethereum has, it's necessary to have credible neutrality here via FOCIL.

And potentially FOCIL could help with scaling, depending on who you ask. Today Ethereum still sources its censorship resistance from local block building. If Ethereum can source censorship resistance from elsewhere, for example via FOCIL, then maybe we can increase the expectations that we have of block builders and allow, for example, more blobs. But potentially this could be done without FOCIL as well. Therefore, FOCIL has been proposed to be implemented in Fusaka.

### How FOCIL works (8:10) {#how-focil-works-810}

**Julian Ma:** Now I'll walk you through how FOCIL works. We'll start with the basics and go step by step until we have the full mechanism, and then explore how this full mechanism satisfies the properties that we want.

The basic idea of an inclusion list, which has been proposed by Mike Neuder before as well, is that there's a list of transactions that constrains the block in some way. So there's, for example, an inclusion list which includes transactions A and B, it's signed over by someone that's recognized by the protocol, and then these transactions must be included in some block. FOCIL doesn't change this. It builds upon it, and it's more about who creates this list and how this list is enforced.

So, who creates this list? This is the first step of how the FOCIL protocol works. Each slot, 16 validators are selected as inclusion list committee members. Each of these committee members observes the mempool and constructs their own inclusion list. An inclusion list should be around 8 kilobytes, or about 20 average transactions, meaning about 320 average transactions in total.

The second step is distributing these inclusion lists. The inclusion list committee members distribute their inclusion lists over the global topic, and they don't include them in a block themselves. They must do so before second 9 of the slot, at which time attesters freeze their view of local inclusion lists. As we'll see in the next step, attesters are the ones that actually enforce these inclusion lists, as the name suggests: fork-choice enforced inclusion lists. They freeze their view of which inclusion lists they'll enforce at second 9, and this prevents split-view attacks. The block producer still has a few extra seconds to observe inclusion lists and to ensure that it's not negatively affected by missing any inclusion lists, so the block producer has no risk in this setting.

Then we head over to the final step, which is enforcement. As I said, the enforcement is done via the fork choice. Attesters will only vote for a block if it satisfies the inclusion list condition. They do so by observing the inclusion lists that were sent on the global topic, making an aggregated list of transactions that they had seen in these inclusion lists, and then checking whether all of these transactions are in the block. If this check passes, they vote for the block. It could also be the case that not all transactions from the inclusion lists are in the block, but the block is full. In that case, attesters also vote for the block. So unless the block doesn't contain the transactions and isn't full, attesters vote for the block.

To recap the full mechanism: in each slot, 16 committee members are selected as inclusion list committee members. They observe the mempool and construct inclusion list objects that they distribute over the global topic before a deadline, in this case second 9. The builder observes these inclusion lists and includes all transactions that it has seen in its block. The attesters then check whether all the transactions that they had seen before second 9 in inclusion lists are indeed in the block. If this check passes, they vote for the block, and we move on to the next slot, where the same setup happens again.

### IL Boost and uncrowdability (11:07) {#il-boost-and-uncrowdability-1107}

**Julian Ma:** One of the big worries about inclusion lists, voiced for the previous EIP from Mike and during the development after that, is "IL Boost," or uncrowdability. It refers to the fact that inclusion list proposers might want to sell their rights to build an inclusion list. It's a very logical concern, because we see this happening with block construction: selling this right leads to a centralized market of sophisticated builders.

We argue that FOCIL is robust against these MEV-Boost-like markets, or IL Boost as they're colloquially known, because of the following properties. FOCIL doesn't guarantee any ordering of transactions. Regardless of where you put your transaction in your inclusion list, it will be ordered in whatever way the block builder sees fit. If you would, for example, include an arbitrage transaction in the list, it's highly unlikely that the builder will put your arbitrage transaction at the top of the block so that it will actually execute the arbitrage. Instead, the builder will probably do it themselves.

Moreover, private order flow is not possible. These inclusion lists are distributed over the global topic, so your transactions are public before the builder builds the block. It's not possible to have private order flow enter the block via an inclusion list.

Thirdly, there are multiple inclusion list proposers per slot. Even if there was something valuable to sell, all 16 inclusion list committee members have the same possibility to construct this inclusion list, so competition amongst those inclusion list proposers would drive the value down to zero.

And finally, these inclusion lists are created 3 seconds before the block producer acts. There are 3 seconds of extra information, which is usually extremely relevant for MEV types of transactions, that arrive after the inclusion list is committed to and before the block producer acts, meaning there is very little informational advantage. Actually, there's an informational disadvantage for those trying to use inclusion lists as a vehicle for MEV.

Because of these reasons, we believe that no individual inclusion list proposer has inclusion, ordering, or exclusion power, which is the fundamental definition of MEV. Therefore inclusion lists should not be subject to MEV.

### Summary of the presentation (13:09) {#summary-of-the-presentation-1309}

**Julian Ma:** To summarize this quick presentation: FOCIL allows multiple validators to contribute to block construction, preventing the inclusion monopoly of a single proposer and boosting Ethereum's credible neutrality. We believe that it's necessary to implement FOCIL now because there are currently only two dominant builders that could start censoring at any point, and this could be for economic reasons that they may benefit from. Block building could become more load-bearing because based rollups will want to use Ethereum's sequencing properties. FOCIL will launch far more smoothly when there are few censoring parties: first, because it means that it's a default for validators to build inclusion lists, and secondly, because it means that there's less market instability between builders that are censoring and builders that aren't. And finally, FOCIL could potentially help with scaling, which is maybe a subject that we can dive more into.

Thanks for the time to give this small presentation. I just wanted to show the QR code, which leads to the EIP, for people who are interested.

**Pooja Ranjan:** Thank you so much for this quick presentation and the overview of the proposal.

### Q&A: how does EIP-7805 differ from EIP-7547? (14:17) {#qa-how-does-eip-7805-differ-from-eip-7547-1417}

**Pooja Ranjan:** I would like to begin the Q&A section with the very first question, about the earlier proposal that was also mentioned in your presentation: proposal 7547, inclusion lists, by Mike Neuder. I want to understand the basic difference between that proposal and the FOCIL we have with 7805. You did partially touch in your presentation on IL Boost and uncrowdability. Would you want to maybe explain a little bit more about it?

**Julian Ma:** Perhaps Thomas is best suited to answer how 7805 differs from 7547, but I can say a little bit about it. First of all, FOCIL is for the same slot, whereas 7547 was for the next slot. The same-slot property makes some things easier, because it means the inclusion list doesn't have to be stored onchain.

With regards to the uncrowdability property, this is a very interesting and subtle one. Within 7547, which was a great proposal that our proposal builds on, the inclusion list is unconditionally appended at the bottom of the block and made by one person. This has a few different properties from ours. First of all, transactions are ordered. It could be that in the future it's very valuable to have bottom-of-block arbitrage, and in fact some of Thomas' research has highlighted that this could potentially be a valuable place. Having the rights to build the inclusion list means that you are the last person to act in the block, and for some cases this might be valuable. Secondly, it's made by one single person, so there's not this competing effect among inclusion list committee members. A committee of one person has the full right to include transactions at the bottom of the block, which might make it more valuable as well. Thirdly, there's this unconditional property, which means that regardless of what the block producer does, your transaction will be included onchain anyway. So it has a few extra guarantees, beyond the necessary minimum for inclusion, that might make it valuable to some extent.

**Thomas Thiery:** A big difference is also the number of inclusion list proposers we have. In the previous proposal, there was a mechanism by which the proposer of slot n makes the inclusion list that the proposer of slot n+1 needs to enforce. The two big things here: first, there is a one-slot delay, so the transactions in the inclusion list only have to be included in the next slot by the next proposer. And there is only one proposer that actually makes the inclusion list. With FOCIL we have 16. It makes a huge difference, because now we only need one out of the 16 IL committee members to be honest for the whole mechanism to work as intended. It multiplies your chances of actually having a good censorship-resistant mechanism, whereas before you relied on a single party.

And then some more technical details: there were some incompatibilities with account abstraction, and it was hard to deal with IL equivocation, meaning someone that sends two different inclusion lists. Block equivocation is a known thing and it's penalized by the protocol, but since everything went onchain in the previous proposal, you also had to deal with weird edge cases, and it wasn't very easy to accommodate them. With FOCIL, the inclusion lists don't go onchain. They're just broadcast over the P2P consensus layer network. It's a bit technical, but it does make a big difference in dealing with these edge cases caused by account abstraction, or attacks where you split the network into two views with IL equivocation.

**Pooja Ranjan:** Thank you so much. For people who would want to learn more about proposal 7547, we do have a recorded episode with Mike Neuder, episode 130 of PEEPanEIP, that provides a high-level overview. I always love to see competing proposals, because I know that is for the betterment of the ecosystem and the chain. I see in chat there are a few questions. Maybe I would like to invite Kataya to share her question.

### Does the proposer have to include all 16 lists? (19:05) {#does-the-proposer-have-to-include-all-16-lists-1905}

**Kataya:** Hello, thank you. My question was: does the block proposer get 16 inclusion lists, each from one committee member, and does it have to include all the transactions from these lists?

**Thomas Thiery:** Yeah, that's right. You take the union of all transactions across all lists, in our case 16 lists. You might have overlap, obviously, so you take the union and deduplicate, but yes, all transactions in all lists need to be included in the block for it to be considered valid by attesters.

**Pooja Ranjan:** The next question in the chat is by Justin. Justin, would you like to read your question for the guests?

### Private mempool transactions in inclusion lists (19:55) {#private-mempool-transactions-in-inclusion-lists-1955}

**Justin:** I've been asking so many questions. I wanted to ask what prevents putting a transaction from a private mempool into an inclusion list, and I think it was fairly answered. It sounds like that's totally fine, considering that the builder is essentially going to order them however they see fit anyway, and your transaction becomes public when it goes out on the IL as well. So I think that makes sense. Thank you.

**Thomas Thiery:** That was one consideration, like Julian mentioned. We really didn't want FOCIL and inclusion lists to be used for including MEV transactions, private order flow, or preconfirmations, because ultimately what we want is censorship resistance, and it's very easy for a mechanism to become a vehicle for including valuable transactions if you're not careful. The fact that when you include your transaction in an inclusion list it automatically becomes public, everyone can see it, it has no ordering guarantees, and it can be included by the builder anywhere in the block makes it not very well suited for valuable transactions.

So either you have a public transaction, and you might just submit it to the public mempool for it to be included in an inclusion list, or you have valuable private transactions, and then you wouldn't go through FOCIL, because there are better ways to do it. You would contact the builder directly and send it through private channels.

**Pooja Ranjan:** Thank you for sharing. I see the next question is by Ladislaus.

### FOCIL and scaling (21:41) {#focil-and-scaling-2141}

**Ladislaus:** Hi guys. This refers to the point you brought up in terms of FOCIL and scaling. I've seen some discussion lately, as we all have, on scaling Ethereum, and as you rightfully mentioned, there's this bottleneck of a few builders out there. I personally like to think of FOCIL as re-empowering local building, and I see it as a necessity to be enshrined in the protocol before we increase the bandwidth requirements, or node requirements in general. Maybe you can elaborate on how you think about this, and also potential other ways to scale, maybe without FOCIL, as you mentioned.

**Julian Ma:** Thank you for the question. First of all, the case for scaling via FOCIL. Currently 90% of validators outsource block construction via MEV-Boost, and these sophisticated entities obviously have more bandwidth than the minimum hardware requirements. They could, for example, include more blobs in their blocks without leading to any issues. An interesting thing, though, is that Ethereum relies on local block building for credible neutrality, or censorship resistance, because these two sophisticated entities aren't ones that Ethereum's censorship resistance can be built on.

So the Ethereum protocol must still be designed so that it's possible to do local block building, and in fact we design it so that it's not unprofitable compared to MEV-Boost. This is in the design of Ethereum, but in practice, of course, MEV-Boost is far more profitable: first because these sophisticated block builders have more involved algorithms, and secondly because they have a lot more private order flow. There was some research by Data Always recently showing that MEV-Boost blocks contain far more transactions. That alone leads to more profit.

Still, the protocol is designed so that there are no forces from within the protocol rules that make one validator less profitable than another. If we want to keep that rule, then FOCIL is necessary, because then local block builders can contribute to inclusion lists and thereby uphold censorship resistance. We could, however, also get rid of this rule and basically say that local block builders can include a certain number of blobs, but more sophisticated block builders could include more blobs, to the extent that local block builders wouldn't be able to handle that load while creating a block themselves. So if we want to keep the rule that the maximum is set to the lowest hardware requirements, then we need FOCIL. If we're fine with relaxing that rule, then potentially we don't need FOCIL for scaling.

**Thomas Thiery:** It's very similar, I guess, but right now on Ethereum we are in a weird position, because we rely on sophisticated builders to build most blocks, but those are not great for censorship resistance, because it's just two parties. If they decide to censor transactions or some addresses for some arbitrary reason, then basically we don't have censorship resistance or permissionlessness, which is also very important. It means they can censor or refrain any actors they want from participating onchain, which is very bad.

And the censorship resistance properties we keep are not amazing, right? Since most blocks are built by these two builders, you basically need to wait until one local block builder gets elected and proposes a block that includes all these transactions that are normally censored, which doesn't feel great. It means these users will need to wait 10, 12, I don't know, a lot of blocks until their transactions are actually included onchain.

So we really want to keep home stakers and local block builders, because they are the ones preserving censorship resistance. At the same time, today, even using them is not great, because you still have to wait a lot of time to have your transaction included if it's censored by the two builders. With FOCIL, you move to a world where the participants guaranteeing censorship resistance, the inclusion list committee members in our case, might be different from the people building the blocks. I think it opens up a very interesting landscape, because now we don't have to rely on the exact same participant to both build valuable blocks and contribute to censorship resistance. FOCIL can also be considered a first step in that important direction, because you have two very different duties, and today we ask the exact same validator nodes to do both, which is very much in tension.

**Pooja Ranjan:** Thank you so much. I think the next question is by Luis.

### Criteria for selecting transactions (26:46) {#criteria-for-selecting-transactions-2646}

**Luis Pinto:** I joined a few minutes after the start, but it looks to me like this is decentralizing transaction selection in the network as a whole. That's very good in my opinion; it fights against MEV and censorship. And I definitely like the part of having the attesters doing this job, because in the future they will have lower hardware requirements than the builders, even more so with statelessness and stateless clients. Since you will be able to run this with very low hardware, it makes things very decentralized. I guess the main challenge here is to define the criteria for the transaction selection of these inclusion lists, whether you go with priority fees or number of blobs; there are so many variables. Have you landed on a set of criteria that you're thinking of enforcing?

**Thomas Thiery:** That's a great question. It's twofold. The first one is very important, about trying to separate attesters from the people building or proposing the block. That's the whole attester-proposer separation (APS) line of research; Julian has worked quite a lot on this. We call it unbundling roles, so they match the duties of the protocol more closely. I wrote a post, which I just shared, about a possible separation, which is very much open, and I would love more input from people. In this post I make a separation between attesters, includers, which are the IL committee members now, and execution proposers, or builders. I think those are fundamentally different duties, and maybe we should have different roles for them.

Then, for the inclusion rule, it's a very good question. We did think quite a bit about it, and I think we landed on two things. The first one is that we want a diversity of rules. We don't want one single rule, for example ordering by descending priority fees for all clients, because then you can actually play games and try to reorder the mempool so that only your transactions are included in the ILs. But if you have a diversity of rules, including one rule that also takes into account the time a transaction has been pending in the mempool, and different clients implement different rules, all of the same flavor, mostly around priority fees and time pending in the mempool, then it's very, very hard to game, and it makes the protocol even more robust. It's also a good way, I think, to take advantage of the diversity of clients that we have on Ethereum today, and to let clients make opinionated choices. We have rules in mind, but we think clients can also choose the best rules for them. As long as not everyone has the exact same rule ordered by priority fees, we'll be fine.

**Luis Pinto:** Okay, so you're also distributing this criteria, letting the ones that build inclusion lists have their own criteria. Or is this going to be part of the protocol?

**Julian Ma:** The inclusion rule won't be part of the protocol. First of all, it's very hard to enforce, and secondly, it's actually better to not enforce anything. If we allow committee members to decide by themselves, or let the client teams act on their behalf, how they include transactions, then we create some robustness in the network. People with different preferences will include in different ways, which means it's harder to attack the system.

**Luis Pinto:** Okay, thank you.

### Compatibility with EIP-7702, ePBS, and PeerDAS (30:43) {#compatibility-with-eip-7702-epbs-and-peerdas-3043}

**Pooja Ranjan:** Thank you so much. As I understand, this proposal is already proposed for the upgrade after Pectra, Fusaka. And given Fusaka may or may not include some other EIPs which are in progress, I'm wondering what is the status of compatibility for FOCIL with respect to proposals such as 7702, which is for account abstraction, ePBS, and PeerDAS.

**Thomas Thiery:** Great question. We had a bit of an advantage here because of the history of inclusion lists. As we mentioned, 7547 was considered for inclusion and then rejected because of incompatibilities. So we were very careful about solving those before we made a new proposal, because we knew people were going to look at it with the same questions, which makes sense.

We are very confident, because we also talked with the account abstraction teams, and we talked a lot with Potuz and Terence. Terence has been helping us actively, and he's been working on both ePBS and FOCIL, so it was very easy for us to check whether that's compatible as well. I really don't think there are incompatibilities with any of the other EIPs. With ePBS, you have to be careful with the timing of things, because you separate the execution payload from the consensus block, so the whole slot timing changes, and now you also add the creation of ILs that need to be made before the payload is proposed. So you need to be careful about the timings, but if I remember correctly, from the last time we talked about it with both Potuz and Terence, there wasn't any crucial incompatibility at all. I think we are looking good when it comes to compatibility.

**Pooja Ranjan:** That is good to know. I noticed Jihoon also shared a HackMD, which we will add to the resources, for people who would want to learn more about the compatibility with ePBS specifically. And yes, I remember from the last conversation with Mike, I guess the proposal was not included because of the account abstraction incompatibility. So it's good to know that this has already been taken care of.

### FOCIL and multi-slot MEV (33:04) {#focil-and-multi-slot-mev-3304}

**Pooja Ranjan:** I was going through the documents and the details added to the FOCIL website, meetfocil.eth.limo, and learned about a term called multi-slot MEV. Julian also mentioned that MEV-Boost in general is profitable, despite the desire and the efforts made by devs to keep it at par. I wonder how FOCIL will prevent this.

**Julian Ma:** Thank you for your question. First, let me say something about FOCIL and MEV, and then we can move on to multi-slot MEV. FOCIL doesn't necessarily prevent MEV, and this is precisely because we want to unbundle the MEV parts and the inclusion parts. In our view it's important to do so, because otherwise you have these IL Boost sorts of markets pop up. By that reasoning, if the inclusion list could constrain the amount of MEV that's extractable, then building the inclusion list becomes very valuable, and people would spin up markets around it. Our design is really there to provide the minimum inclusion guarantee, meaning that it's not so valuable to be an inclusion list committee member, and there are 16 of them, meaning that there is no market of sophisticated producers.

Then, going on to multi-slot MEV: FOCIL alleviates some of the problems, but it doesn't go all the way. This is again because of this incompatibility between providing both censorship resistance and a solution to MEV. What FOCIL does is allow any transaction to be included as long as it pays the fees, which solves multi-slot MEV to some extent. Multi-slot MEV here is where a party is able to extract more MEV if it controls two blocks in a row.

FOCIL alleviates some of the problems because it allows you to insert your transaction. For example, if you need to insert a transaction liquidating bad debt on some position somewhere, you're able to do so even if the proposer tries to censor you and would extract MEV from you in the next block.

Why it doesn't solve all of the problems is because of adverse selection, an economic property where one person has more information than the other. One example of multi-slot MEV would be extracting arbitrage over two blocks, where the block builder doesn't extract arbitrage in the first block and does so in the second block. There are some theoretical results showing that this can be more profitable for the block builder than extracting arbitrage in both slots. You could think that FOCIL helps here, because arbitrageurs could in principle include their transaction in the inclusion list and thereby force some sort of arbitrage to happen. While this is the case, it's not incentive-compatible for arbitrageurs to submit their transaction to FOCIL, because there are still 3 seconds between their transaction being submitted and the block builder being able to act. If you're trying to do arbitrage and the price is constantly moving on some external market, you don't want to commit 3 seconds in advance, because you have far less information than the block builder, who acts later than you. The adverse selection comes into play because the builder has more information: it will let you win if it's bad for you, if the price on the external market has moved against you in those three extra seconds, and it will let itself win if it's better for itself to win.

So FOCIL solves the parts of multi-slot MEV where transactions don't suffer adverse selection. For transactions where there is adverse selection, it's slightly more complicated, but it alleviates the problem to some extent. In principle, it makes things better than they are now, but there's still a little bit of work to do.

**Pooja Ranjan:** Very well, thank you so much for sharing that. I understand there is a lot of research ongoing to address the MEV thing, so it's good to know that at least in principle it is going to help more than the present scenario.

### Trade-offs and challenges (36:44) {#trade-offs-and-challenges-3644}

**Pooja Ranjan:** I have one question related to what Thomas mentioned earlier about IL equivocation. I noticed that in the security considerations section of the proposal, there are quite a few points mentioned, like consensus liveness, IL equivocation, and payload construction. What would you consider the biggest trade-off, or something that may require more research and may prevent this proposal from getting into the next upgrade as is?

**Thomas Thiery:** To be honest, I think the section on security considerations was mostly a way to show that we have thought of and addressed concerns regarding security. It's more that than having open questions about security things that we don't know about. I don't think there are any big blockers or problems in terms of security considerations.

For the trade-offs: if you take a very narrow view, it's true that FOCIL adds some tasks to validators, both when they have to propose an inclusion list, and for attesters, when they have to check one more condition to make sure the block is valid according to the inclusion lists. It also adds a small task for the proposer, because now it needs to make sure its payload actually includes the transactions in the ILs. For me, that's the only trade-off, and those tasks are not heavy or sophisticated. An IL committee member just monitors the public mempool and includes transactions in a list that they send. It doesn't require any sort of skill or sophistication, which I think is nice. On the other hand, as we said, it might unlock some big scaling improvements and a better separation between participants and duties within the protocol.

I might be biased, but I don't see big trade-offs. I do think it sort of flips everything on its head when it comes to censorship resistance. Now you need only basically 15% of the network to be honest for all transactions, including ones that may be censored by builders, to be included in the next block, which is a very big improvement. I don't think you trade off a lot of things there, honestly.

**Pooja Ranjan:** It's good to know that. In most proposals we find that the security considerations section has either none or very little information, so it's good to know the research has been done on that part and we are aware of the possible security considerations. Glad to know it's not a blocker or a potential challenge for implementation and adoption in the future.

### Transaction fee mechanisms for inclusion lists (39:50) {#transaction-fee-mechanisms-for-inclusion-lists-3950}

**Pooja Ranjan:** I have a question about some open questions I found on the website itself, about the transaction fee mechanism. I wonder if there is any update, or if you would like to share more about the best way to charge fees and distribute these fees for inclusion in the inclusion list.

**Thomas Thiery:** We have an ongoing grant that's specifically looking at this and at incentive mechanisms to reward IL committee members. It's not easy. It's tricky, and no matter how you approach it, these are also very big changes. Changing fees on Ethereum, whether you change a fee, add one, or add new issuance, all of these are big changes that need a lot of consideration and care. But it is being explored, and ideas around distributing fees across, for example, committee members that include a transaction seem like decent ideas. It kind of has the properties we want, because we want to reward people for including transactions that others might not want to include. So we are thinking quite deeply about this, and we have an ongoing grant.

There is also a question of whether we ever want to give fees to IL committee members at all, because it's notably very hard to reward smaller participants that are distributed around the world. You don't want Sybil attacks, and you don't want big participants with a lot of stake to crowd out the IL committee set. How do you prevent that? That's very hard. So you have a lot of design considerations to take into account.

One of the takes I've had lately is: what if we add some cool features to FOCIL, like privacy, so you can't really know who proposed a given list of transactions? You know it was someone actually selected as an IL committee member, but you don't know exactly who proposed which list, so you can't link IL committee members to the set of transactions in their ILs. If we can have that, and let the IL committee role be sort of opt-in, then we would probably have honest participants in the protocol, relying on altruistic behavior, and maybe we wouldn't need to set up a fee mechanism at all. That's a very recent, opinionated take, and it's very much being explored right now. All of these are "future of FOCIL" discussions; they're not supposed to be included in the current EIP.

**Julian Ma:** Just to add on to that, that last part is also very important: EIP-7805 doesn't include any transaction fee mechanism, to make it simpler to implement. It's basically the smallest possible way that we can provide the censorship resistance properties, but it's very extendable. We are looking into that. Thomas has done quite a bit of work looking at separate transaction fees for includers and for proposers. Then, as Thomas mentioned, we have an ongoing grant with an awesome researcher at Nethermind who's looking into creating a transaction fee mechanism for FOCIL, and this is very promising. And finally, there's been work on a transaction fee mechanism for a variant of FOCIL called AUCIL, an auction-based inclusion list design proposed by Sarisht Wadhwa, Fan Zhang, and Kartik Nayak together with several of the FOCIL authors, which looks at ways to incentivize inclusion list committee members.

To Luis's point earlier, incentivizing is very much about how inclusion lists are created. It means the protocol wants to give a certain view of how inclusion list committee members should behave. Usually what this comes down to is that it wants certain participants to do different things. For example, it may order committee members and assign them certain transactions via a correlated equilibrium, in order to still have some different behavior between committee members. So it's not part of the current proposal, but we're definitely looking into it, and it fits within the line of FOCIL's extendability.

**Pooja Ranjan:** Oh, that's interesting. So we should be looking forward to some supplementary proposals in the future to enhance the current FOCIL features.

### Inclusion list size (44:16) {#inclusion-list-size-4416}

**Pooja Ranjan:** I have another question. I'm not sure if it should be part of the present proposal, but I'm curious to understand if there is any update on the IL size. Inclusion lists must likely be bounded in size to prevent excessive bandwidth usage. Do we have any further research or updates on how the optimal size of the inclusion list can be determined?

**Thomas Thiery:** We have a fixed size now in the spec, and it's been there for a while: 8 kilobytes. We put it in kilobytes because what FOCIL and ILs really consume is bandwidth, and that's pretty much it. If you take the median transaction size, we get to about 40 transactions per IL, and if all the transactions are unique, that's about 640 transactions that could be combined together across all 16 committee members.

I don't know if there is too much research to be done on the exact optimal size. What we went for: 16 times 8 kilobytes is basically the size of a blob, so it's not an enormous amount of bandwidth combined. And since the combination of transactions across ILs is larger than a block, I don't think we run into issues there.

For the future, you could increase the IL size, but you could also consider increasing the number of IL committee members. That allows you to have even more chances of getting one honest IL committee member if most of the network decides to start censoring. So that's also something we could do. For now, it seems like 16 would be completely fine and enough, but you can definitely play around with these parameters in the future if censorship gets very crazy, or if we need to take more action.

### Metrics to track adoption (46:39) {#metrics-to-track-adoption-4639}

**Pooja Ranjan:** Just a follow-up here: do you have any metrics in mind that we can keep track of to understand the adoption or the success of this proposal?

**Julian Ma:** That's a great question. Let me quickly answer and then hand the baton over to Thomas. Some easy metrics are just how many inclusion lists are proposed that are non-empty. And you could think of dashboards, like the ".pics" series from Toni Wahrstätter, where there's maybe more flavor, assigning some quality measure to these inclusion lists. In principle, though, only one person per slot needs to make a proper inclusion list in order to provide censorship resistance.

I think it's such an important point that it's important to implement FOCIL soon, because now we're in this magical regime where block builders aren't censoring too much and validators aren't censoring too much. I would say this is very fragile. Up until now, block builders have been censoring for a long time, and if we introduce FOCIL now, we have the possibility of making it a default that all of these validators adopt it and create inclusion lists that are meaningful. Because block builders aren't censoring, there's no market instability created here. If we wait until there is censorship among builders, then it's far harder to introduce FOCIL, and I would imagine all of the metrics that would be used to measure adoption would be far worse.

**Thomas Thiery:** One key metric to look at as well is literally the inclusion delay for public mempool transactions. You take all the transactions that are pending in the public mempool and you see how fast they get included. If FOCIL works, they will all be included in the next block. If they are not, that means a large proportion of validators is censoring. So the other metric we can look at is who is censoring, and what proportion of the network is censoring. We will have dashboards and very transparent metrics to keep track of this, because it's basically what FOCIL is supposed to do. If public transactions don't get included in the next block, that means a very large portion of the network is actually censoring these transactions.

**Pooja Ranjan:** Very interesting. So maybe it's something for researchers: a possible wishlist for upgrades, that dashboards and metrics trackers should be shared by developers for a proposal whenever it is included in a network upgrade.

### Client implementation status (49:11) {#client-implementation-status-4911}

**Pooja Ranjan:** As Julian mentioned, this proposal may need to be implemented as soon as possible. I'm curious to understand where we are on client implementation, because I remember in the last testnet call Paritosh mentioned adding some support with devnets. So where are we on that?

**Thomas Thiery:** We are doing quite well. First of all, it's been super nice to see how people took on the implementation part of FOCIL, because I'm not a dev, I'm a researcher. I've been working with devs from the beginning, but I'm not the one implementing things in clients.

The ones that spearheaded it, the three of them: we have Terence from Prysm, and Jihoon, who has been helping Terence a lot on Prysm but has also worked on Geth. So now we have a working devnet for Prysm and Geth, which is great, and there are a lot of tests going on. We are now also trying to get FOCIL shown and visible on the Dora explorer. Then you have Jacob, who has worked on Lighthouse and Reth, and I know some efforts are still going on there. Lodestar has been very active lately; I think they're very close to having a devnet working. We had some news from Nethermind today that they have a prototype, which is super nice. I feel like I'm forgetting some of them... Nimbus is joining as well, says Jihoon. That's really nice.

Overall, we are getting more and more devnets ready and live, local devnets, and more and more combinations between execution and consensus layer clients. There has been some really good progress, and it's nice to see, because we all know devs are quite busy now with Pectra coming, and already working on PeerDAS and other things. It's been really great to see how people on Ethereum overall care quite a lot about censorship resistance. Most of the teams I hadn't specifically reached out to just joined the effort and are now working towards devnets and testing.

**Pooja Ranjan:** Thank you for sharing that. I look forward to following the updates on the devnets. I'm not sure how many iterations of this devnet there will be, but I'm excited to see it coming up. I see Justin has a question here. Justin, please go ahead.

### FOCIL in Fusaka or Glamsterdam? (52:07) {#focil-in-fusaka-or-glamsterdam-5207}

**Justin:** Okay, buckle up for this one. You made a very good point that the best time to address censorship is before censorship happens, right? So: FOCIL in Fusaka, or can it wait for Glamsterdam? And which should I advocate for as a developer?

**Thomas Thiery:** We have opened the PR, and it was merged, with FOCIL being proposed for Fusaka. We think it should go into Fusaka. Part of the reasoning is that some clients have already started work on it, and they haven't encountered too many hurdles. It's not like other proposals that are much harder to implement and involve a lot more work. And it's not very contentious either. I don't think anyone is advocating against censorship resistance, and everyone sort of agrees it needs to be included as soon as possible. So I would go for Fusaka.

I don't know whether it can wait or not. Proposals and upgrades can always wait. I just want to avoid a world in which it's not as easy to implement these changes. Things can flip very quickly. As we saw, it went the other way around: a few months ago, one of the main builders just out of the blue stopped censoring. We asked why, and it was like, "yeah, we just decided not to." It was good in that case, because it was on the good side, but it can completely flip back, and then we could have the two builders censoring some transactions, and we would be back in a very bad place.

The other thing I want to mention, because I do think it's important: if we go towards some of the things we talked about, like APS, where you can actually separate attester and proposer with some of the designs we've worked on, we need to have FOCIL in before that, and we need to know FOCIL is working. We need FOCIL on mainnet for six months, a year, to actually be sure it's fulfilling its purpose, which is maintaining and improving the censorship resistance properties of Ethereum. So another urgency, to me at least, is that if we want to shield attesters from timing games and some other concerns we want to get to with APS, we need FOCIL in as soon as possible.

**Pooja Ranjan:** It's sad to see sometimes when proposals don't get selected for the next or nearest upgrade, but only so many proposals can be included in one upgrade. I really appreciate all the hard work being done behind the proposing of the proposal, the readiness of the proposal, as well as the testing that goes into it. So thank you so much for all the work you are doing for the Ethereum ecosystem.

### Rapid fire (55:18) {#rapid-fire-5518}

**Pooja Ranjan:** Before we wrap up, we do have a quick rapid fire round. The only condition is the answer should be one word or one sentence, and we'll try to do it on a timer, maybe 30 seconds each. If you are ready, let's go ahead and start with Julian. What's the hardest problem in blockchain research right now?

**Julian Ma:** I won't be too meme-y, so I'll answer it seriously. I'd say the hardest problem is the future of staking: what the future of staking means, what roles which providers of services provide, how they're compensated for it, and how they relate to each other.

**Pooja Ranjan:** What's one blockchain use case that hasn't been explored enough?

**Julian Ma:** I'd say FOCIL.

**Pooja Ranjan:** What's the biggest security risk for Ethereum today?

**Julian Ma:** I would honestly say censorship resistance is very critical here, because of things like multi-block MEV that could pose huge security risks, for example for L2s.

**Pooja Ranjan:** Should MEV be minimized, embraced, or something in between?

**Julian Ma:** I largely agree with the Flashbots take here, that it should be democratized, meaning that it should be maximized where this is necessary, and minimized at the application layer.

**Pooja Ranjan:** Is decentralization always worth the trade-offs?

**Julian Ma:** It's usually worth the trade-offs.

**Pooja Ranjan:** What's the biggest innovation Ethereum has brought to the world?

**Julian Ma:** Here I'd like to cite Mike Neuder's talk from Devcon on digital property rights. I'd say censorship-resistant digital property rights that are really changing the world.

**Pooja Ranjan:** Thank you so much, very well answered. My next set of questions are for Thomas. So, if Ethereum didn't exist, which blockchain would you be working on?

**Thomas Thiery:** I think I will be very meme-y, and Julian rugged me a bit because I thought he was going to do the same. The blockchain would be FOCIL.

**Pooja Ranjan:** What's the most overhyped use case for blockchain?

**Thomas Thiery:** No use case is worth hyping without FOCIL.

**Pooja Ranjan:** What's one thing Ethereum needs to improve as soon as possible?

**Thomas Thiery:** Censorship resistance, with FOCIL.

**Pooja Ranjan:** One word to describe decentralization?

**Thomas Thiery:** FOCIL.

**Pooja Ranjan:** Do you think Ethereum will fully solve scalability?

**Thomas Thiery:** Ethereum with FOCIL, yes.

**Pooja Ranjan:** Layer 1 scaling or layer 2 scaling, which wins?

**Thomas Thiery:** Infinite layers, all with FOCIL.

**Pooja Ranjan:** Very well done, thank you so much, Thomas. Thank you for answering all these questions. As we are wrapping up, I would like to give this opportunity to you: if you have any message for the community about the proposal, or for the Ethereum community in general.

### Messages to the community (58:08) {#messages-to-the-community-5808}

**Thomas Thiery:** Actually, that's a very important one, because we have active discussions all the time, and it's all public on the Discord. There was a push at the beginning to make it all public, and people are actually doing it, so I'm very glad. You can follow discussions and progress on the public Eth R&D Discord, on the inclusion-list channel. That's basically where all of it is happening right now. Then you can reach out to us on Twitter, Telegram, anywhere. Feel free.

The more people we talk to and get involved, the better the design will be and the better the implementation will be. So if you can help in any way, reach out and we'll be happy to help on all sides, even on the research side. It's even more suited, I guess, for us to work with people that want to work on the future of FOCIL. We mentioned privacy, we mentioned transaction fee mechanisms, and we are also going to focus a lot on FOCIL for blobs. All these things need people and research effort. If you're interested, reach out. Thanks a lot for having us, and thanks for all the work you do for Ethereum as well.

**Julian Ma:** Just to add on to that, I hope we made some people enthusiastic about FOCIL. If you are enthusiastic, please let us know. And if there are some questions that you still have, we'd be happy to answer them, and hopefully we can convince you that FOCIL is indeed the way to go. Thank you so much. It was really a pleasure to be here, and thank you for hosting the session. And also thanks to everyone for attending, of course.

### Closing words (59:52) {#closing-words-5952}

**Pooja Ranjan:** Thank you. That's a wrap. A huge thanks to Thomas and Julian for joining us today and sharing their insights on EIP-7805. Thanks to all participants; your questions are encouraging and informative. Thanks for tuning in. If you enjoyed this conversation, be sure to like, subscribe, and share this episode with your fellow Ethereum enthusiasts. We'll bring you more EIPs and research progress on PEEPanEIP. Until next time, keep purring with the knowledge and prowling through Ethereum with the Ethereum Cat Herders. Have a great rest of the day.
