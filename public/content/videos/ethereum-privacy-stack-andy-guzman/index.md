---
title: "The Ethereum privacy stack: private reads, networking, and the hidden leak"
description: "Andy Guzman explains how metadata leaks when wallets read data from Ethereum, and how the privacy roadmap's private reads and networking research closes the access-layer leak."
lang: en
youtubeId: "tvAqDJXCBaA"
uploadDate: 2026-02-16
duration: "0:27:00"
educationLevel: intermediate
topic:
  - "privacy"
  - "roadmap-and-priorities"
format: presentation
author: EthBoulder
breadcrumb: "Ethereum Privacy Stack"
---

A talk by **Andy Guzman**, lead of the Privacy Stewards of Ethereum (PSE) team at the Ethereum Foundation, at EthBoulder 2026. He exposes a major blind spot in Ethereum privacy: even users who never sign a transaction leak detailed behavioral data through everyday queries. He introduces the Ethereum privacy stack, covering private reads (PIR), traffic privacy (onion routing and mixnets), and performance work like unified binary trees and ZK-verifiable state.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=tvAqDJXCBaA) published by EthBoulder. It has been lightly edited for readability.*

#### The fictional RPC provider letter (0:12) {#the-fictional-rpc-provider-letter-012}

Hey everyone, I'm Andy, and I wanted to introduce a topic that is not often discussed in the Ethereum ecosystem and is extremely important. As you might have noticed from the slide and the introduction, it's related to privacy, and how we are underprotected without even noticing.

Let me start with a letter that someone wrote to you.

"Dear valuable user, thank you for the 847 queries you made this month. We really enjoyed getting to know you. We know that you hold ETH across three different wallets. We know that you checked the price of ETH 94 times last Tuesday. It was a very rough day for everyone, so no judgment. You also checked the BTC price, which is interesting, because you don't hold any Bitcoin. Are you thinking of diversifying? That will stay between us, and of course our analytics partners. You are also watching two Uniswap pools very closely, and you checked your Aave health factor 14 times last week. You might want to relax, or just add some collateral. On Thursday you checked it three times within 12 minutes, and you were very worried. You looked at four different ENS names, so either you're starting a new project or you're having an identity crisis. And you always go quiet between 11 p.m. and 7 a.m. Mountain time."

#### How you leak data without signing transactions (1:34) {#how-you-leak-data-without-signing-transactions-134}

"So we're fairly confident that you're based in Boulder, or close. You never signed a single transaction through us. You never had to. Your curiosity told us everything. Warmly, your RPC provider."

Of course this is a fictitious letter, but it describes something we really do leak every day. Even if you're not doing a single transaction or any onchain action, you're basically telling everything to any analytics company that would love to get their hands on that data and your behaviors.

#### Private writes vs private reads (2:07) {#private-writes-vs-private-reads-207}

So what is really going on right now in the privacy world? I see that we put a lot of emphasis on onchain privacy, or what we at PSE call private writes: all the actions that you do onchain. And it makes sense, right? Those actions get recorded forever and transmitted around the world, so it does make sense to not leak your address with a specific action. We also put a lot of emphasis on tooling: data sources, proofs, DSLs, and languages we can use to give developers more tools to express and build stronger apps that have more privacy onchain.

But I want to argue in this presentation that we don't put nearly enough attention and effort into these other domains: what we call private reads, because whenever you query data from a blockchain you're leaking a lot of information, and private networking, because even before anything arrives onchain, all your traffic is leaking.

To get slightly more technical: all the RPC calls, like eth_getBalance, eth_call, and eth_getLogs, are requests in plain text that go to RPC providers and get correlated with your IP.

#### Why more activity increases profiling risk (3:20) {#why-more-activity-increases-profiling-risk-320}

With this information, it becomes very easy to profile people, to segment them, and to model behaviors. And this can be used against you. As you would imagine, information is power, and the more information people have about you and your behavior, the more power they have over you.

Most people don't realize this. Most people will say, okay, well, it doesn't really matter because this is not critical information. Or they might think: the more activity there is, the more protected I will be. This is entirely not true, and counterintuitive. For onchain actions, wherever there are anonymity sets, it does help: the more users, the more privacy, and the easier it is to blend in. But with reads it's the opposite, because queries are not interchangeable. The more activity you transmit, the more actions you take, the richer the correlation surface and the easier it is to build a profile of your actions.

So whenever there's DeFi mania or NFT craziness, people become more sloppy. OpSec, of course, gets thrown out of the window, and it becomes much, much easier to deanonymize people based on the activity patterns most people fall into.

#### Introducing the Ethereum privacy stack (4:43) {#introducing-the-ethereum-privacy-stack-443}

I want to start with the landscape: where should we attack, what's needed, and who's working on what. This talk will go into some more technical topics and some more high-level conceptual ones, so everyone can take some value out of it.

I want to present what I call the Ethereum privacy stack, or the layers of the Ethereum privacy stack, and I think this is useful to reason about. If we really want privacy, we don't only need privacy onchain; we also need privacy in all these layers of the stack, similar to the lifecycle of a transaction, or the OSI model and its technology layers. I would argue we could create a standard, or some sort of ecosystem-wide acknowledgment, that these layers exist. Maybe this is not the final form, but I think it's arguably already useful.

#### Layer by layer: where you leak (5:41) {#layer-by-layer-where-you-leak-541}

The top is the application layer. Whenever you visit a website, of course, you're leaking what you're visiting, and people can start profiling: anonymity sets, credentials, linking your IP to what you're visiting, even if you don't do anything.

The next one is the wallet layer. Whenever you take an action, you don't only leak information to the app layer but also to the gateways. Wallets right now are very complex, they integrate with many other systems and services, and you leak a lot more information than you imagine. Even if you just open your wallet and it queries the price of ETH or your balance, you're leaking everything.

Then you have the gateways: the RPCs, the proxies, the relayers. You leak more metadata again. Then what people would imagine as the onchain element, which is whenever things are queried on the EVM, like the state or execution patterns. For example, querying the balance of something, or the state of a smart contract. And finally consensus, where all the validators are. Depending on whether you're writing onchain or reading onchain, you might also touch the mempool.

And there's another vertical, which is what we call networking, which is transversal, cutting across all these layers. For example: right now you visit a website and the server knows your IP. But what if you visited that website through Tor or another anonymous network? You would know the IP address of the website, but they wouldn't know yours. And what if that website is hosted in a country that recently started censoring all crypto things? That website and company would also want to hide their IP, and would want to hide their domain behind an onion domain.

Those are the types of things that make sense: we need to go layer by layer, hardening everything, analyzing through the lens of a very disruptive attacker who wants to censor everything. Even if we don't do it, and we say we live in a good enough state, this information gets recorded now and will be hosted forever by a lot of people you don't even know, companies that start selling your data. Eventually, in five years, somebody might ban crypto and say, "anybody who used Uniswap in the last five years, I'm the IRS, I'm going to start knocking and get you to jail," or whatever. These dystopian scenarios happen in different countries around the world right now.

#### Private reads and private networking (8:24) {#private-reads-and-private-networking-824}

Okay, so we have the Ethereum privacy stack. Where should we focus? In this presentation I want to talk about these two areas. Private reads: whenever you access state from onchain, you touch all these layers, from the app, let's say I want to query the price of ETH, to the wallet, to the gateways, to a node that is running Ethereum and the EVM, and then back. Basically an RPC provider or an indexer. And private networking, which is all the actions that happen on the networking layer. This is what we want to harden.

#### Three pillars: data, traffic, performance (9:05) {#three-pillars-data-traffic-performance-905}

There are three pillars that I think are critical for us to achieve this. We want to hide and make private the data itself. We want to hide and make private the traffic itself. And then we want to make it performant, useful, practical, and cheap. This summarizes a lot of information about things going on in the ecosystem, but I think it's useful to paint the lay of the land and identify the leverage points where we can accelerate.

#### Hiding data: from proxies to PIR (9:39) {#hiding-data-from-proxies-to-pir-939}

So, data. What is it that we want to protect? We want to hide what information you're asking these servers for, and we want to hide the patterns of how you access this data. Not only the content but also the patterns.

There are different levels of technique. The first is nothing: you just leak everything. Whenever you connect your wallet, you tie your IP address to the contract you're querying, to a specific eth_getBalance for a specific address, and that's it. Even if you're using a privacy protocol, let's say Tornado Cash, and you want to query the state of the Merkle tree, you either have to download the whole tree, which is not very performant, or you leak which path and leaves you're querying, reducing your anonymity set. So even using a strong privacy protocol like Tornado Cash is not enough if you don't protect your networking and your data access patterns.

The next level is some sort of proxies or relays: a lot of machines that don't know where the request comes from and eventually retrieve the data. That's not very practical, and not very trustless.

Then you have TEEs, which are a step forward, and this is where some teams and companies are offering services. I think this is a good step forward but not enough, again because the cost of attacking and corrupting TEEs is dropping a lot. For certain critical use cases this is not enough; for many day-to-day ones it could be.

There are other teams working on OMAPs, oblivious map access patterns, and ORAM, Oblivious RAM. These are similar techniques that try to obfuscate which parts of the data set you're trying to access. Instead of saying "I want the balance from this ETH address," you're randomly accessing different things, so the server doesn't know.

And I would argue the endgame of these will be PIR, private information retrieval, which means the server doesn't know what you're querying and doesn't learn anything about it.

#### Private Information Retrieval explained (12:03) {#private-information-retrieval-explained-1203}

Private information retrieval is a super powerful technique in cryptography, and it's going to be used a lot. There are two variants: index PIR, which you can use if you have structured data under an index, and keyword PIR, where, as the name says, you query per keyword. It's very hard to have one scheme that works for everything.

Ethereum state is huge and very varied. Logs, I was learning yesterday, are append-only, but the account model is different: some state gets updated very frequently, some doesn't. Depending on how you slice and dice it, you can have megabytes, gigabytes, or terabytes of data, with very different access patterns.

#### A multi-agent PIR architecture (12:48) {#a-multi-agent-pir-architecture-1248}

The proposal we're working on within PSE, and here I'm going to talk conceptually and then about specific projects we're doing at PSE and other things I'm seeing in the ecosystem, is a multi-agent architecture. There's no single scheme that is perfect for all Ethereum state. But if we can slice the Ethereum state per type or per access pattern, we can find very good schemes for each of them.

What if we have a service that runs this multi-agent architecture, and depending on the type of queries and where they might be located in the Ethereum state, it runs one scheme or another? That already gets us very close to something that is feasible, production-capable, and offerable to the ecosystem. This will require something like a unified API, so that wallets, indexers, users, and dapp developers don't need to worry about which scheme is used and how to call it. You just have the standard API, and someone else worries about the implementation details.

We're already doing this and implementing two different schemes. We will open grants, and we're trying to coordinate more people in the ecosystem to tackle some of these and see which ones are most needed for Ethereum.

Here are a few numbers about different PIR schemes: throughputs, communication overhead, and so on. It's hard, because different apps have different access patterns. Some access a lot of receipts, some want to access more of the state, like Rotki, and some access more transactions, like Helios. There's no silver bullet, and most likely a mixed architecture will be helpful. We're also doing a systematization of knowledge, so if this is interesting to you, we can share it. And here are just some of the teams working in these areas. Forgive me if you are part of a team and I didn't include you; if somebody sees the recording and is missing, please let me know and I can start adding you.

#### Hiding traffic: onion routing and Tor (15:22) {#hiding-traffic-onion-routing-and-tor-1522}

We covered data. The other big bucket is traffic. How do we hide traffic, and what do we want to hide? In very simple terms, we want to hide the client's and the server's IPs from each other, and from the rest of the world that might be snooping on traffic. We have different techniques: onion services, mixnets, VPNs, DC-nets, and there might be other classifications. I'm just going to talk about the first two.

Onion routing techniques encrypt in layers, and traffic gets decrypted in layers as well. People in between can never know the origin, some can never know the destination, and some never learn anything; they just act as routers.

The TL;DR is: what if all Ethereum ecosystem traffic could be routed through the Tor network, so to speak? There are other options too. We would help protect the sender's IP: your phone or your laptop would not be leaked when you're sending transactions or requesting information. And of course we would also protect the receiver, the server. Imagine that in Iran, China, North Korea, or Venezuela, somebody is trying to host a DeFi protocol or a service and it's censored by their country. This is an option that could protect their lives. It bypasses censorship and also hides traffic from ISPs, internet service providers, which we all know are tapped by intelligence agencies that snoop on everything.

The goal is to have a drop-in replacement: an SDK, so that wallets, dapp developers, and infrastructure providers don't need to worry about the implementation details. They just know that if they use this SDK, the traffic gets onionized, encrypted, and hardened.

There's a team I want to shout out, the Brume Wallet team, who started Echalote, an open source implementation of Tor for the web. This exists right now: there are Tor clients, but they're written in C, and they need to run in a special browser. What if I want to add this to MetaMask, or to the Kohaku wallet, or to Ambire, Rabby, and all the others? We need JavaScript SDKs, and that's what Echalote started.

Then, the Tor Project has a new implementation being developed called Arti, the next generation of their client. But we need an embedded Arti. Arti is Rust-based, and it needs to be compiled to WASM to be able to run in your browser, so you can import it really easily. We basically have a collaboration with the Tor team: calls every week, and some projects and partnerships together.

#### Mixnets for Ethereum (18:16) {#mixnets-for-ethereum-1816}

On the mixnet side, I want to give a shout-out to several teams approaching this: the Nym team; HOPR, also one of the first ones; VPNs like Gnosis VPN; and a couple of others that were new to me, like Anyone Protocol, and I think somebody from that team should be here in Denver, plus some other new ones. There are many teams working on mixnets, VPNs, and other approaches.

We want to see: what if we create a purpose-built mixnet for Ethereum, where we can route RPC traffic? Mixnets have strong guarantees, but they add a lot of latency. For some use cases that's fine: it doesn't matter if it takes a little bit longer, as long as you have privacy. But for things like DeFi and trading, it's extremely unlikely these will get adopted if they add latency. So, what's the fastest we can run with the highest privacy guarantees? Again, a shout-out to some of these teams, and if someone is working in these areas and I haven't added you, I would love to chat.

#### Performance: unified binary trees and GPU acceleration (19:28) {#performance-unified-binary-trees-and-gpu-acceleration-1928}

The last thing I want to talk about, the third pillar to make this a reality, is performance. We want these things to run fast and cheap. I have a principle: these things won't get adopted if the cost is higher than the benefit. Cost means user experience, time, and effort for the user, but also cost for the developers and the infrastructure: is this very expensive to run? We need to lower the cost as much as we can, and there are two high-level initiatives I can talk about.

One is UBT. Depending on how much you are involved in protocol EIPs, you might have heard of this. Right now we have the Merkle Patricia trie, which is useful, but not very useful for ZK and other types of cryptography. There is a proposal, EIP-7864, moving not to Verkle trees but to unified binary trees. This is much more efficient for querying state and then doing cryptographic operations like ZK on top.

We have a project doing a verifiable UBT: you add a sidecar to any Ethereum client, which, instead of running an MPT database, has a UBT state database, and then you prove that this transformation from MPT to UBT is valid using a zkVM. This is already very powerful. Once we manage to do this, light clients could use it to increase their performance, and things like PIR could run much faster.

The other aspect is GPU acceleration. We can run these things much faster if we optimize lower levels of the stack: GPU is one, or CPU acceleration as well. These things will probably run on servers, not on phones, so it's also very valuable to start exploring how we can create these lower-level libraries to run way faster.

Doing a recap so far: we have these five layers, and we want to cover these use cases. There are three pillars: data, traffic, and performance. For data we have proxies, TEEs, ORAMs, OMAPs, and PIR. For traffic we have mixnets, onion routing, and others. For performance we have UBT and GPU acceleration. If you want to read more, at least about the contributions PSE is making, you can go to pse.dev/research.

#### Measuring success (22:15) {#measuring-success-2215}

So what is success, and how can we measure it? Coming back to these layers: if I want to be able to claim that Ethereum is the most private chain, what is the endgame? I would need to feel comfortable that all these layers are extremely hardened. How would I measure it? I would expect more websites and dapp frontends to be hosted behind onion domains. I would love wallets to natively use anonymous routing, and gateways, RPC providers, and indexers as well. And I would measure a percentage.

The question is: of the current Ethereum ecosystem frontends, how many are hosted behind an onion domain? I would say extremely few, 1% if any. For me to feel good and say we did it, we would probably need more than 80% at all of these layers. How many wallets right now are routing traffic through anonymous routing techniques? Very, very few. Same with RPC providers: do these providers offer PIR? No. So for me, claiming success means the actors at all of these layers adopt these types of technologies, at least 80% of the teams, the traffic, or the queries.

#### Bitcoin's onion node comparison (23:39) {#bitcoins-onion-node-comparison-2339}

This is one thing we can be jealous of Bitcoin for. For all the critiques they get, this is a picture from November of last year: 64% of their reachable full nodes are hidden behind onion domains.

Can we do it ourselves? This is lower-level, consensus-level privacy, but could we say that our full nodes and validator nodes are behind an onion network or mixnets? I definitely think we should, and we are probably at less than 1%. We have other challenges that they don't have: we run much faster, and our consensus is different. But I would love to have dashboards like this and say more than 80% of wallets have adopted these types of technologies, and RPC providers, explorers, frontends, load balancers, and SDKs too. I would love for this list to grow.

#### Comparing Ethereum to Monero and Zcash (24:55) {#comparing-ethereum-to-monero-and-zcash-2455}

I took the liberty, last night and the night before, of starting to see how, through this lens of layers, the Ethereum ecosystem compares to things like Solana, Bitcoin, Zcash, and Monero. Things in yellow are opt-in techniques, and I think we're very good there. Things in blue are proposals, some of them protocol proposals. Things in green are enforced at the protocol layer.

Because of our 10-year history of being a public chain, I think it's going to be hard to catch up with Monero and Zcash in making privacy native. But I think we can do a really good job at getting opt-in adoption, and culturally and socially influencing teams and users to adopt more of these techniques. Bitcoin and Solana have their own challenges, and I think they'll be further behind, at least on these privacy things.

#### The challenge: the most private programmable ecosystem (25:50) {#the-challenge-the-most-private-programmable-ecosystem-2550}

My goal, and the goal I want to put in your mind, is for Ethereum to become the most private, permissionless, trustless, and programmable ecosystem in the world. We have other private payment chains, and that's great, they're very good, but I think they will have a much harder job becoming programmable and creating the ecosystem that we have created.

My challenge to you, and of course to me and my team, is to become, of the programmable ecosystems, the most permissionless, trustless, and private. We can't only focus on the onchain elements. We need to focus on all of these layers.

So if you're working on private reads, networking, PIR implementations, GPU acceleration, data structures, UBT, infrastructure, or validators, I would love to chat with you afterwards. Thank you very much. Ethereum is for privacy.
