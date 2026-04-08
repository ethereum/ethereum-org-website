---
title: "Ethereum institutional privacy now"
description: "A panel at the Web3Privacy Now event during Devconnect 2025, featuring experts discussing real-world institutional privacy needs on Ethereum, from compliance to ZK proofs."
lang: en
youtubeId: "cZqlg4W1Els"
uploadDate: 2025-11-22
duration: "0:30:50"
educationLevel: advanced
topic:
  - "privacy-and-security"
  - "privacy"
format: panel
author: Web3Privacy Now
breadcrumb: "Institutional Privacy"
---

A panel at the Web3Privacy Now event during Devconnect 2025, moderated by **Oskar Thorin** (IPTF/EF), featuring **Zach Obront** (Etherealize), **Amzah** (ABN Amro), **Eugenio** (European Blockchain Association), and **François** (Polygon Miden) discussing real-world institutional privacy needs on Ethereum, from regulatory compliance to zero-knowledge proofs for institutional DeFi.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=cZqlg4W1Els) published by Web3Privacy Now. It has been lightly edited for readability.*

#### Introduction to Institutional Privacy Task Force (0:03) {#introduction-to-institutional-privacy-task-force-003}

**Oskar Thorin:** Hello. Can you guys hear me? All right. Cool. So we'll first do a very short intro talk — like a 3 to 5 minute talk — and then that will lead into the panel. This is an abbreviated talk. The previous panel talked a lot about compliance and privacy and so on. I gave a previous talk at Cyban Congress that also touched on this, and there will be a longer version of this talk at DeFi Day later today. But what I want to talk about is institutional privacy on Ethereum.

My name is Oskar and I'm the IPTF lead at Ethereum Foundation. It stands for Institutional Privacy Task Force. And why does institutional privacy matter? It matters for a few reasons. I think one big reason is that if you look at these massive financial institutions that exist, we're talking about trillions of dollars in monetary flow. It used to be that regulation was the biggest blocker for them moving onchain. But what's happened in the last few years now is actually privacy is the biggest blocker for them.

So what's the leverage and impact here? I think even just moving 1% of traditional finance funds to Ethereum would have a massive impact in terms of the impact Ethereum can have on privacy. And just having a single institution onboarded here also touches on millions of users, right? This is not hypothetical. There are institutions that are already onchain, and there's multiple things happening over the next year or so here. The time for this is now, in terms of institutions moving onchain with privacy built in.

A single large institution here can have a massive impact on which ecosystem eventually wins — whether it's Ethereum or more private versions. Why do they want Ethereum? There's a few reasons. Things like liquidity, censorship resistance, 10-year uptime, and it being a selling point in terms of settlement. There are other alternatives as well, but they have different limitations. 

In order for Ethereum to onboard these institutions, they need to address these privacy concerns. What we're trying to do at the Institutional Privacy Task Force is onboard institutions onto Ethereum and make sure their privacy goals are met. We do things like workshops, trying to demystify the space and make sure we can address institutional needs when it comes to privacy specifically. The first artifact we have is this institutional privacy map — we talk to massive institutions, understand their business use cases and requirements, open source as much as possible, and then talk to vendors in the space to connect institutions to the solution space. 

#### Panel Introductions and Institutional Problems (5:00) {#panel-introductions-and-institutional-problems-500}

**Oskar Thorin:** Sorry it was a bit fast, but hopefully understandable. So this panel has a lot of experts across research, policy, and engineering, and we'll talk about institutional privacy. 

Just a brief introduction: We have Eugenio, who's the Head of Growth at the European Blockchain Association. We have Zach Obront, CEO of Etherealize, where he's building institutional products and underlying privacy primitives. We have Amzah, who spent most of his career in financial risk management before getting deeply involved in Ethereum, and is now bridging traditional controls with Ethereum native markets. And finally, we have François, a senior staff protocol engineer at Polygon Miden, focused on zero-knowledge proof systems.

To get started, in one sentence or maybe a few sentences, what institutional problems are you working on that actually require privacy on public rails rather than just a traditional database or private chain? Maybe we can start with François.

**François:** Yeah, of course you can always build on a private blockchain, but today we believe that institutions want to access global liquidity that is offered by Ethereum while at the same time retaining what they have from the traditional finance world, which is a degree of privacy that allows them to trade with global liquidity without making the entirety of their trades public. For us, that's why it's important both to build privacy in, but also to build on Ethereum.

**Eugenio:** Well, maybe I can take this from a different perspective — from a standards perspective. In the standards process, there is a very important concept for institutions, which is the trust anchor. Essentially every institution has a big offchain environment, toward which they anchor liability into society for everybody using their services. One part of the big problem in creating blockchain-based services for institutions is how to create an efficient system to bridge the trust anchor into the onchain world, and then how to embed cryptographic techniques to ensure that data is processed in a minimal, but auditable and verifiable manner.

**Zach Obront:** Cool. So at Etherealize, we're focused on upgrading some of the deep inner workings of the financial markets, specifically credit markets. So I'll tackle it from two directions. One is *why privacy?* Right now, all of these markets run on bilateral agreements. There are two parties. They are very used to the idea that the exact information that needs to leak, leaks, and nothing else. And so the only way they would consider public blockchains is with that level of privacy met. 

From the other direction, *why be on a public blockchain?* These are complex markets with parties who don't necessarily trust each other and need to rely on regulation across countries. Having a source of truth at the center of those markets is a huge advantage that you can't do without a public blockchain. Right now they're kind of at a standstill saying "There's this upgrade potential, but we can't do it without the privacy we need." We're trying to bring those things together.

**Amzah:** Yeah. So I work for ABN Amro, which is a big Dutch bank. We have 5 million retail customers. So we're not actually building something right now specifically in privacy, but what's coming up now is for example a digital identity wallet. Usually how that works is data is stored in a centralized database and then you connect with an outside provider or a third party, but that's of course not really safe. So we're already starting to think about how we can use ZK-proofs, for example, so we could have selective disclosure with outside parties. In that sense, we can protect our customer information and also let them connect with the broader Web3 environment.

#### Concrete Workflows and Storage (10:07) {#concrete-workflows-and-storage-1007}

**Oskar Thorin:** Okay, great. If you pick one concrete flow that you might care about — like maybe some bond issues, trade, or treasury payment — who can see what exactly at what step, and what is stored onchain versus offchain? Maybe starting with François.

**François:** A great way of approaching this is to approach it from the point of view of wanting to trade with a DEX on Uniswap. The nice thing is that we can offer on Miden something that offers full anonymity. We have anonymous accounts that trade with each other through notes. It's a mix of the account model and the UTXO model. 

If you're trading with a venue, that venue will want to be public. As a DEX, you want to republish prices every time you've interacted with somebody. So you are emitting notes into a batch. As the user, there's nothing onchain except for what the venue might be able to decrypt. The venue performs your trade and emits notes on the exit. Those notes can then be claimed by accounts that can be fully private. So you retain full anonymity when it comes to the users — with the exception of the venue that has decided to reveal some information publicly. On top of that, we build compliance flows, which include auditability workflows and view-key policies that allow market engineering at the local level.

**Eugenio:** Well, maybe I can take it more from a functional perspective. Generally every issuance or distribution flow for institutional services has three key pillars. The first one is identity and trust, which is connected to the onboarding flow for investors, KYC/KYB processes, and so on.

The second one is policy enforcement. The account collects all the information from this offchain environment and generates a trigger to a statement of executions on the blockchain. In this context, privacy-preserving techniques can make an efficient distribution. For instance, an offering that can only be distributed to certain types of investors associated with certain types of accounts.

The third pillar is reporting. This is associated with the onboarding and the trade operations onchain. The glue of all these services is how we extract from onchain data attestations the data points we actually need offchain to provide traditional reporting for our clients at the end.

**Zach Obront:** The answer to this is very different depending on which flow, right? This is one of the challenges in this space — it's hard to have general principles. One example of a flow is a big loan where an interest payment is made, and a ton of lenders get split out. The expectation is that no one should know about that. There's no regulation around it. It's allowed to be totally private, and we want to be able to support that end of the spectrum. 

On the other end, maybe there is a trade of positions between lenders, and there are expectations that certain administrative parties could see that the trade happened, but not the price. Maybe others can see all the details. We've built everything around this flexible model where we don't want to be hardcoding compliance rules. We want to say a user or application can determine that for themselves. We have the ability to enforce rules around regulators or administrative bodies being able to see things, or even providing aggregated data to associations.

**Amzah:** Yeah. I mostly agree with what Zach said. In the past, when institutions thought about privacy, they would just start a private chain where maybe 20 banks participate and only they are able to see what's in there. But actually, it's much more nuanced. It depends on the use case, what type of flows, and what the regulator needs to know. You can put balance information onchain in a more aggregated form using proof of reserves, for example.

#### Non-Negotiable Requirements (15:26) {#non-negotiable-requirements-1526}

**Oskar Thorin:** Eugenio and Amzah, from banks, venues, and regulators, what are some non-negotiable requirements that you keep hearing over and over again? Like audit trails, KYC rules, or reporting requirements?

**Eugenio:** I would say accountability when it comes to the onboarding process, and compliance associated with reporting. For me, it's about framing concrete business requirements into technical structures. The devil is in the details — whether your user is an application or an investor creates a different process flow for your ecosystem. The goal should be to build this system efficiently, otherwise we will be blocked from adoption. This is why account infrastructure on Ethereum is evolving in a very cool way.

**Amzah:** Yeah, no real addition to that. 

**François:** Our co-founder spends weeks with customers in the institutional space, and the top-level demand that comes up is "control." Who sees what, when, and for what reason. And then you devolve those conversations into details and they become insanely customized. To us, this is great because the traditional finance world has spent decades building their accounting practices and AML/CTF flows. They are very specific about that control. So we're building those capabilities at the protocol layer and supporting customers in their journey.

#### Trade-offs and Global Liquidity (18:10) {#trade-offs-and-global-liquidity-1810}

**Oskar Thorin:** What are the main trade-offs that you're currently living with? Performance versus privacy, or global liquidity versus typing controls, or onchain transparency versus offchain records? Starting with Zach.

**Zach Obront:** Fortunately, we're in a market where speed is not the biggest priority. A lot of credit markets settle in weeks, so seconds are not the biggest thing on their minds. But the UX of privacy is very difficult. Blockchains are very good at maintaining this concept of queued state, handling if things change, and making sure transactions are ordered correctly. As we start queuing up private transactions, things get complicated. We have to figure out the best user experience that meshes with privacy, especially since people expect systems to be both private and easy to use.

**François:** I wanted to highlight the trade-offs that we *don't* have, thanks to Ethereum. Institutions really only want to enter markets if it's worth their time entering, which means they want a global market with network effects, deep liquidity, and many counterparties. Being a rollup on Ethereum, rather than a private chain or yet another L1, gives us access to that deep market.

Of course, there are complexities. We care a lot about that white-glove experience for an institution entering that market, so they can have their own conditions. One of the challenges is the balance between privacy and threat resistance. There are threat actors that exist in the Web3 world, and we want to get a better handle on that to offer a fantastic experience. We're approaching decentralization carefully — we know how to do it, but we'll do it at the moment it best serves the customers.

#### System Trust and Adoption Drivers (20:47) {#system-trust-and-adoption-drivers-2047}

**Oskar Thorin:** Eugenio, how do you make these solutions trusted and usable by institutions and governments?

**Eugenio:** Everything starts from trying to consider institutional services as integrated systems, where every part of the system does its own specific access rule. From data origination to data compression on Layer 2 and data decentralization on Layer 1. If we combine this system where the offchain environment holds the trust assumption of the institution, we can allocate different processes to Layer 2 and Layer 1.

**Oskar Thorin:** Amzah, how do you look at making systems trusted and usable?

**Amzah:** For us, it's really important that it's customizable. Blockchain is no longer just one use case where everything is fully public or fully private. It's not one-size-fits-all. What's also most important for us is to be regulatory compliant. The banking sector in Europe is heavily regulated, and if something isn't correct regarding privacy, it just doesn't fly with the regulators.

#### Looking Ahead to 2026 (23:15) {#looking-ahead-to-2026-2315}

**Oskar Thorin:** All right, we're almost at the end. What is one building block — technical, operational, or policy-wise — that you think would meaningfully accelerate institutional adoption? And if we meet again in 2026, what do you think is realistic that would have happened this year?

**Zach Obront:** I think "institutional" and "privacy" are currently very broad terms, and they intersect differently across use cases. Some care about plugging into liquid markets, while others just want better internal infrastructure. It would move us forward to get clarity into the specific situations we're trying to solve for. There hasn't been a deep categorizing of compliance requirements. Pushing to map those requirements and turning them into a protocol that supports them would level up our ability to build, rather than relying on a fragmented world run by lawyers.

**Amzah:** The tech has come a long way with zero-knowledge proofs and fully homomorphic encryption. I think one of the most important things to improve is education for regulators and institutions. They might have heard about zero-knowledge proofs, but they don't really know how they work. Majority of regulators still think from a legal point of view — if something breaks, who can we call? And if there's no one to call, that's a difficult perception for them.

**Eugenio:** On the technological side, ZK real-time proving and aggregation will really enable us to build complex use cases combining apps, institutional clients, and Layer 1. I also support what Amzah said about education. For 2026, I would like to see more collaborative engagement between projects so that applications can really start having access to global liquidity and global networks.

**François:** If we meet in a year, I would like to have launched the mainnet of Miden in the spring, so we can celebrate that. Beyond this, I would like us to be on our way to full decentralization. It will take a village. The core thing I want to see happen is more engagement. The idea that privacy is at odds with compliance isn't really true, but marrying the two takes work. We want institutions to help shape the kind of markets they want to see, because we know this is going to be messy and peculiar to their needs.

#### Closing Thoughts (28:05) {#closing-thoughts-2805}

**Oskar Thorin:** I just want to give each of you 10 to 20 seconds to mention something that happened this week or a quick plug before we finish.

**Amzah:** Three years ago, I was a volunteer helping at one of the first Devconnects. Seeing how people look at institutions now compared to then is a massive improvement.

**Zach Obront:** It's just amazing how much privacy is in the air this year. My background is in security, and there's a lack of security researchers who understand this stuff. Anyone at that intersection, I encourage you to go all in.

**Eugenio:** I'll pick data regulatory organization — I think there is much hope for ZKP in a compliant data domain, and the Ethereum interoperability layer will help bring institutions onchain.

**François:** It's very difficult as an engineer; usually you hear about a niche subject. We've landed precompiles on Miden recently, which opens the verification of flows that involve machine learning. If you're an extreme nerd like me, you really want to do machine learning and proofs of machine learning, and that's now a thing we can do.

**Oskar Thorin:** I want to thank all the panelists. We heard some very interesting perspectives across technology, policy, and engineering. We just scratched the surface, but I recommend you talk more if you're interested in this topic. Thank you.
