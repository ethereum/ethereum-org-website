---
title: "The next great wallet will be private"
description: "Your wallet sees every address you hold, every dApp you connect to, and every request you make. That same position lets it protect all of it. A practical look at the privacy tools, defaults, and unshipped ideas that will define the next generation of Ethereum wallets."
author: "Elliott Alexander"
team: ""
tags:
  - "privacy"
  - "wallets"
  - "zero-knowledge proofs"
published: 2026-07-02
image: /images/developers/blog/latest-post-header-1.png
breadcrumb: "Next great wallet"
lang: en
---

Take a snapshot of two minutes you spend on your wallet. You open the app, glance at your balance, connect to a dApp you've been meaning to try, approve the transaction it puts in front of you, and send a friend the ETH you owe them from lunch.

Nothing about it feels observed. No one asked for your name. You close the app and get on with your day.

Now let's count what actually leaked. On launch, before you'd done anything, a stack of analytics services learned your IP address and that you use this wallet. The server your wallet reads the chain through saw every address you hold, polled from one IP—your full portfolio, neatly grouped for whoever keeps the logs. The dApp got your active address, which is all anyone needs to look up its entire history. And the payment to your friend is a permanent public record joining your wallet to theirs.

Every one of those leaks passed through the same piece of software. The wallet loaded the analytics, chose that server, handed over the address, built the transaction. But the same position cuts both ways: the layer that sees everything is also the layer that can protect everything.

Many wallets have business models predicated upon the collection of this information, but there are ways to do this without putting users at risk. Some of what it takes is sitting on the shelf, working and ignored. Some of it nobody has figured out yet. Both halves are the opportunity, and whoever takes them on is building the next great wallet.

## What your wallet gives away onchain {#what-your-wallet-gives-away-onchain}

Start onchain, with what's public no matter which wallet you use. An address carries no name, and that single fact does a lot of comforting. But every payment you've received, every contract you've touched, the size of your balance at this moment, and the full list of everyone you've ever transacted with sits in the open, free for anyone to query. Pseudonymity just means it's filed under a placeholder instead of your name.

The standard defense is spreading your activity across several addresses, and most experienced users do. It helps less than it may seem. Fund two addresses from the same source, or let them pay each other once, and to anyone running cluster analysis they collapse into a single entity.

Back in 2020, [a study](https://fc20.ifca.ai/preproceedings/31.pdf) of Ethereum's first four years could already cluster 17.9% of all active externally owned accounts, surfacing more than 340,000 entities controlling multiple addresses. That was six years and one AI boom ago. Your careful separation is a few steps away from being undone.

Sooner or later, the cluster gets tied to a real person. Register an ENS name that echoes your social handle, withdraw once from an exchange that holds your passport scan, or get paid by someone who keeps labeled addresses in a spreadsheet, and the cluster stops being abstract.

Data breaches do their part too—an email leaked alongside a home address, matched to an ENS name that looks like the email. None of this takes a subpoena or a specialist anymore. AI has turned sifting millions of records for one good match into a job that runs overnight, and the cost is on a steady decline.

## What your wallet gives away before you transact {#what-your-wallet-gives-away-before-you-transact}

The onchain trail at least required you to transact. The off-chain one starts earlier. In early 2026, a researcher [put thirteen popular wallets through a packet sniffer](https://www.theopensourcepress.com/crypto-wallet-ip-exposure-scorecard-2026/) on a clean device and recorded what each one did on first launch, before any account existed. The average wallet contacted about fourteen domains. The worst contacted 26 domains across 41 IP addresses, including balance-infrastructure calls to three separate providers, for a user who hadn't created a wallet yet. Another wallet in the test shipped a device-fingerprinting service alongside eight marketing-attribution subdomains.

All of it is ordinary consumer-app mainstays—analytics, crash reporting, marketing attribution—but this isn’t Candy Crush, it's an app whose pitch is self-sovereignty. The same test found [one wallet](https://cakewallet.com/) that sent nothing at all on first launch: zero packets, zero DNS requests. Nothing about a wallet requires the chatter.

Then there's the leak that never closes. Your wallet doesn't hold a copy of the chain; whenever it reads a balance or sends a transaction, it asks a server called an RPC (Remote Procedure Call) provider. Unless you run your own node, every request goes through one of these, and the default provider sees your full address list, your IP, and the timing of everything you do. Matching that IP to a subscriber name is a routine records request for a government.

When MetaMask's default provider [acknowledged in 2022](https://www.coindesk.com/business/2022/12/06/consensys-to-update-metamask-crypto-wallet-in-response-to-privacy-backlash) that it logged IPs alongside wallet addresses, the backlash pushed it to [cut retention to seven days](https://consensys.io/blog/consensys-data-retention-update). Credit where due, but that remedy is a policy, and the architecture underneath is unchanged: one server still receives every request you make. And a log like that doesn't have to be requested to do damage; it only has to exist. Databases get breached, sold, and quietly merged with others, and a log that meant nothing on its own can be connected to you years after it was written.

The thing to notice about this whole layer is that the user never sees any of it. Sending money at least puts a confirmation screen in front of you; the metadata has no screen. Nobody approves their address list traveling with their IP, and no signing prompt covers analytics.

These defaults came out of the standard consumer-app playbook—solid infrastructure, useful crash reports, growth metrics—applied without much thought to an app that holds people's money. Which is the encouraging part: every leak mentioned in this section traces back to a decision a wallet builder gets to make.

## Who's looking {#whos-looking}

Start with the onlookers you'd least want. Criminals have worked out that a public ledger doubles as a catalog of people whose savings can be taken by force. Wrench attacks—robberies where the key is extracted through violence or the threat of it—[jumped 75% in 2025](https://www.coindesk.com/markets/2026/02/02/crypto-crime-is-getting-violent-wrench-attacks-jumped-75-in-2026), and victims lost around [$101 million in the first four months of 2026](https://cointelegraph.com/news/europe-crypto-wrench-attacks-losses-101m-certik-report) alone. And the pattern has shifted toward what investigators call data-driven targeting, where attackers profile a victim's holdings onchain before they ever knock. In more than half of recent incidents they reached a spouse, a child, or a parent as leverage. A wallet balance that traces back to your front door is a standing invitation for criminals.

Then there are the onlookers with badges. A transparent ledger is a surveillance system no government has to build: a complete record of who paid whom, when, and how much, sitting in public, one subpoena-free query away. How much that should worry you depends on who governs you, and for millions of people the answer is a government that punishes a donation to the opposing party, a VPN subscription, or savings held in a currency the state can't print.

For those users, financial exposure is the threat model, and the wallet's defaults decide how exposed they are.

Both kinds of onlooker are getting the same upgrade. AI is making the watching cheaper every year, and everything ever written to the chain stays written, available to whatever new analysis technique comes next. None of this is an indictment of the public ledger; transparency is what lets anyone verify the chain. The exposure lives in the trail connecting the record to you—the funding patterns, the reused addresses, the server logs.

Wallets have left that trail in place so far because leaving it is the path of least resistance, for the software as much as for the user. It's also exactly the thing a wallet is positioned to dissolve.

## Why the wallet is where privacy gets fixed {#why-the-wallet-is-where-privacy-gets-fixed}

It's fair to ask why any of this is the wallet's job. There are [active explorations toward privacy](https://ethresear.ch/t/ethereum-privacy-the-road-to-self-sovereignty/22115) at Ethereum's base layer, and the protocol may eventually carry some of this weight. But the chain upgrades through hard forks, two a year at best, and the privacy-relevant changes will spread across several of them. That's a timeline measured in years and decided by a process that shouldn't be hurried.

Meanwhile, individuals are deciding right now whether it's safe to get paid onchain, to donate, to keep savings there. They need privacy that arrives faster than the Ethereum social consensus process and fork schedule can provide.

The app layer is the wrong shape for the problem. Even if every dApp shipped its own privacy feature, each could only protect activity inside its own walls, in its own way, with its own quirks and secrets for the user to manage. What exposes you is the connections running across all of them—the shared addresses, the funding trails, the links back to you—and those connections live in the space between apps. Solving privacy app by app means solving it everywhere except where the problem actually is. dApps are not where the real solution can live.

That leaves the wallet. It's the one piece of software that sees every dApp you connect to, every address you control, and every request you make. The same visibility that makes a leaky wallet so costly is what lets a careful one coordinate privacy across everything you do: choosing which address faces which app, routing reads so no one server gets the whole picture, carrying the bookkeeping that privacy protocols demand.

And those protocols are further along than most builders assume. [Railgun](https://railgun.org/) has processed more than [$5 billion in cumulative volume](https://dune.com/railgun_project/railgun) and holds around [$80 million today](https://defillama.com/protocol/railgun), stealth-address tooling like [Umbra](https://www.techflowpost.com/en-US/article/30477) has generated tens of thousands of one-time addresses, and by [one count](https://wublock.substack.com/p/ethereum-privacys-https-moment-from) more than 35 teams are pursuing over a dozen distinct approaches to private transfers.

None of this is mainstream yet, and pieces are genuinely missing. But the protocols work, real money moves through them, and what they lack is a place in the user's main flow. That is where a forward thinking wallet steps in.

## What a privacy-preserving wallet actually does {#what-a-privacy-preserving-wallet-actually-does}

Strip away the jargon and most privacy work is bookkeeping. Use a fresh address here, route the deposit through there, guard this note, wait before withdrawing, never let those two accounts touch. It's a discipline humans are bad at and software is built for, and today it sits almost entirely on the user.

A privacy-preserving wallet is one that does the bookkeeping itself instead of putting it on the user. The user decides what to do; the wallet makes sure doing it leaves no trail back to them.

Start with what's live. Shielded pools work today: Railgun keeps a private balance beside your public one, and once funds are inside, a payment out reveals nothing about your other holdings. The costs are real—higher fees than a plain transfer, proof generation measured in seconds, some reliance on relayers—but the protocol has carried billions in volume even with those tradeoffs.

Pair that with a habit no protocol is needed for: a fresh address for every counterparty. When the user connects to a new dApp, the wallet can offer a dedicated address for it, funded from the shielded balance, so the app sees an account with no history and no siblings. Stealth addresses ([ERC-5564](https://eips.ethereum.org/EIPS/eip-5564)) extend the same move to receiving payments. Mixers like [Tornado Cash](https://tornadocash.eth.limo/) and [Privacy Pools](https://privacypools.com/) do a simpler, narrower job: funds enter from one address and exit to another, with the link between the two severed. That's the tool for funding a fresh address no one can trace to you—and the missing piece is the wallet producing such an address on demand instead of leaving the ritual to the user. None of this waits on a hard fork or a research grant. It waits on a wallet willing to carry the bookkeeping on behalf of users.

The network side is mostly decisions. Shipping with zero third-party analytics is a choice, and at least one wallet on the market has already made it. On RPC exposure, most wallets already let you swap providers, so the optionality exists, tucked into a settings page that power users visit and everyone else never finds.

The unshipped move is separation: assign different providers to different addresses so no single server ever sees the full list, and put a proxy between wallet and provider so the IP and the addresses never travel together. A light client like [Helios](https://github.com/a16z/helios) or [Colibri](https://github.com/corpus-core/colibri-stateless) lets the wallet verify the answers it gets instead of taking them on faith. Each of these costs something in infrastructure, latency, or engineering time, but none of them requires new cryptography.

Then there's the frontier. Reading your balances today means revealing your address set to whoever serves the query, and the work to fix that is happening right now: Trusted Execution Environments paired with Oblivious RAM, private information retrieval, and light clients reaching toward fully private reads. None of it is settled enough to copy from a reference implementation yet, which is exactly what makes it ground worth claiming.

The write side has the same shape: peer-to-peer broadcast and mixnets would keep a transaction from carrying your IP to a server. The wallets that land these pieces first are the ones the rest of the field will be measured against.

Here's the bar, and notice it's a user-experience bar rather than a novel-cryptography one. Take the section this article opened with—launch, connect, approve, pay—and keep it recognizably that session. There will be tradeoffs; a proof takes seconds to generate, a shielded transfer costs more, and a new concept or two may need a name in the interface.

How small those differences feel is the craft of the integration, and it will separate the wallets that get this right from the ones that technically offer it but in ways that make life hard for users. What has to change completely: no analytics fire at launch, each new dApp meets an address with no history, and the payment to a friend reveals nothing about the accounts behind it.

Privacy that asks the user to become a different person never spreads. When it arrives inside an experience users already understand, it's just a better wallet.

## Ideas worth stealing {#ideas-worth-stealing}

Past the fundamentals sits a layer of features that, as far as I can tell, nobody has shipped. Just some ideas but each is the kind of thing that could make one wallet the obvious choice.

Start with timing. Anonymity sets need time to grow between steps, and your timestamps quietly disclose more than you'd think—when you're awake, what timezone you keep, which days you transact. A wallet could queue whatever isn't urgent and fire it at odd hours: the shielding deposit settles overnight, the funds sit ready by morning, and no rhythm of your life ever forms onchain.

Then the easy button. A user who shows up today is fully exposed—one well-used seed phrase, years of history behind it. Let them enter it, and the wallet drafts a migration plan for them to approve—this much into Railgun, this much into Privacy Pools, adjust the split as you like. Later, whenever funds are needed in the open, they surface ready and unexposed: a fresh address, an odd hour, an amount that doesn't echo what went in. And often there's no way out needed. Inside Railgun's ecosystem a user can transfer and trade without ever surfacing, saving the exit fees besides. A user who was an open book on Monday is unreadable by Friday, and all they did was approve a plan.

A wallet could also lint for privacy. The clustering heuristics in the first half of this article are public, so point them at the user's own pending transaction and warn before the signature: this payment will link these two accounts, this withdrawal matches your deposit to the cent. Wallets already simulate transactions to catch drained funds. Simulating what an onlooker learns is the same move aimed at a different risk.

And show people what the watcher already sees. A dashboard that runs cluster analysis across the user's own accounts turns an abstract threat into something users feel a need to act on: these five addresses are one entity to an observer, this account is clean, this ENS name connects the two. It also gives the easy button feature mentioned above its before-and-after.

## Action steps {#action-steps}

### For builders {#for-builders}

Every section of this article ends at the same place: a choice the wallet gets to make.

The way to make those choices is sensible defaults that the user can override, every one of them. Default to the private path, because the default is what most users will live with. But leave it open to user-led optionality, because a user who can't point their wallet at a different RPC server, or their own node, hasn't really been handed sovereignty.

You don't have to start from bare ground. The [Kohaku SDK](https://github.com/ethereum/kohaku) packages several of the primitives in this article—shielded balances, mixers, light clients—so a wallet can adopt them without rebuilding each protocol from scratch. The pieces are on the shelf. Some things matter long before anyone asks for them. Nobody saw masses petitioning for end-to-end encryption either; it shipped as a default, billions of people got it without noticing or caring, and now a messenger app without it feels broken and violating.

Money that can't be used to find you, profile you, or target you belongs in the same category. The wallet that treats it that way will be the next great one.

### For users {#for-users}

The wallet you use is the one you are promoting as a norm. Choose wallets that take your privacy and safety seriously. This may mean sacrificing the smoothest interface for the safest and most private one. Right now this probably means keeping up with the latest at [Walletbeat](https://www.walletbeat.fyi/), seeing which wallets are making a shift towards enabling user privacy, and taking the time to try them out.

## For further exploration {#for-further-exploration}

- [Wallet privacy scorecard](https://www.theopensourcepress.com/crypto-wallet-ip-exposure-scorecard-2026/) - First-launch network exposure of 13 wallets
- [ERC-5564: Stealth Addresses](https://eips.ethereum.org/EIPS/eip-5564)
- [Railgun](https://railgun.org/), [Privacy Pools](https://privacypools.com/), and [Tornado Cash](https://tornadocash.eth.limo/)
- [Helios](https://github.com/a16z/helios) and [Colibri](https://github.com/corpus-core/colibri-stateless) light clients
- [Kohaku](https://github.com/ethereum/kohaku) - Privacy SDK for wallet builders
- [Walletbeat](https://www.walletbeat.fyi/) - How existing wallets measure up
