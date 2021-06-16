---
title: What is a decentralized internet?
description: An intro to decentralization on the web
lang: en
emoji: ":world_map:"
sidebar: true
sidebarDepth: 2
summaryPoints:
  [
    "Decentralization is a design principle.",
    "Ethereum is built on, benefits from, and pursues decentralization.",
    "Decentralized and centralized systems can and do coexist.",
  ]
---

## What's decentralization? {#what-is-decentralization}

Decentralization is a way to create systems in which no individual or group can unilaterally make major decisions, especially not when it hurts the other participants. You can use this principle to build things in the fields of finance, architecture, art, communications, government, and — you guessed it — computer science.

In basic terms: Nobody is in charge, but things still work. Rules without rulers.

For example, no one person controls the Ethereum network. It works based on the rules set out in the code/protocol which no single person has the authority to change. In contrast, Amazon Web Services could decide to stop providing server space to any of its clients upon suspected violation of any of a number of terms in its draconian and mutable user-agreement contract.

In any case, here are some of the characteristics that decentralized systems might have:

- **Resistant to censorship**: Reduced ability to unilaterally control what gets published.
- **High security**: Open systems are built to resist inevitable bad actors.
- **Permissionless participation**: Very basic criteria for participation, often outside of the control of the system (i.e. access to an internet connection).
- **Pseudonymity or anonymity**: Participants in the system can usually interact without exposing their identities.
- **Community control**: The people who use, operate, and maintain the system all have significant input.
- **Rules that everyone can see**: Everyone can audit the system (open source). People can copy the rules, modify them, and start new systems (free).
- **Deterministic**: The rules produce the same outcome given the same input.
- **Public records**: A history of how the system has operated is held by multiple participants.

Decentralization is a question of degrees. For a short and sweet explanation, check out this 2-minute video by [Andreas Antonopoulos](https://www.youtube.com/watch?v=NG4u55e3SYo). His RIPCORD analogy is a good rule of thumb for judging how open and decentralized a blockchain project really is. 

## Why is decentralization important? {#why-decentralize}

Centralized systems work, to a degree. Unfortunately, they are prone to some serious risks:

- Accidental failure (bad decisions by corporate leadership teams, software bugs)
- Attacks that generate more money than they cost to execute (bank robberies, hardware manufactured with hidden vulnerability)
- Powerful people who conspire against less-powerful people (censorship, exploitation, monopolies)

The international economic crisis in 2008 was the direct result of systematic exploitation and bad decision-making. Perhaps unsurprisingly, Bitcoin began to gain popularity in the aftermath as a decentralized alternative to traditional assets.

Decentralized systems reduce or eliminate many of the risks inherent in centralized ones. It depends on the exact architecture, but here are some examples of how:

- **Diversity**: Including diverse members and structural elements that (collectively) are unlikely to fail.
- **Dispersion**: Eliminating single points of failure and therefore increasing the cost of attacks.
- **Mutuality**: Creating networks in which corruption, collusion, and other bad actions would hurt the people trying to gain.
- **Distribution**: Distributing decision making power so that it would be difficult (or at least unprofitable) for an individual member or group of members to obtain control or undue influence.
- **Integrity**: Building networks of people who work towards principles of decentralization (as opposed to a network of people who, say, buy a large amount of a single currency when it is worth almost nothing and then proceed to exaggerate the benefits of their choice while bashing all other projects).
- **Resistance**: In general, building things that resist unwanted behavior instead of things that punish or mitigate it.

## Trust and consequences {#trust-in-decentralization}

We put a huge amount of trust in centralized institutions — banks, for example. However, as [history has repeatedly shown](https://en.wikipedia.org/wiki/List_of_banking_crises), our confidence is not always well-placed.

### What's going on behind the scenes? {#opacity}

Centralized institutions often display an opaque, easy-to-understand set of services to the public. Savings accounts, payment processing, and retail investment accounts are a few examples. A lot of complex things go on behind the scenes that you might not be aware of:

- Banks loan your money to other clients
- International payment processors make money in foreign exchange markets
- Exchanges/brokers give special deals to market-makers (some of whom might borrow money from you, directly or indirectly)

Centralized institutions and systems might be trustworthy, and they might not be. There is often simply no way of knowing.

You might not care what these institutions are doing as long as you get the services you want. That's fine, and you're probably in the majority. The problem is that, should you ever start to care, there's no way to see what's going on behind the scenes.

### No scenes to be behind {#transparency}

In Ethereum, these opaque intermediaries do not exist. Instead, you need to trust three things:

- The network
- The operations running on it
- The people on the other end of your transaction, in some cases

### The role of trust on Ethereum {#trust-ethereum}

Let's look at an example. Say you want to send people some ETH (the original currency of the Ethereum network). 

You need to trust that the network operators will continue to run their machines. You need to trust that the software will continue working. Finally, if the recipients are sending you something in exchange, you need to trust that they will fulfill their promise. You *don't* need to trust anyone to send the money. The network takes care of that in a provably predictable way.

That's just a simple example. Ethereum does much, much more than sending money from one person to another.

There are various types of smart contracts (blockchain computer programs) operating on Ethereum. These smart contracts automate many traditional financial services, such as escrow accounts, auctions, marketplaces, exchanges, and so on. The best part: You can perform all of these financial tasks without the need to trust a human intermediary.

Finally, "trust" is not really the right word when it comes to an open-source, blockchain-based decentralized computing system like Ethereum. It is a trustless network. This means that, for reasons we just went through, there is no counterparty risk — no third parties that could violate your contract.

### Defining "trustless" {#trustless}

Ethereum is trustless. Not because we don't trust it, but because we don't have to. You can look at any aspect of it — the transaction history, the machine architecture, the consensus algorithm, the smart contract code, the client software, etc. — and predict the outcome of any action you plan to take.

For example, you do not really have to trust that other people are running nodes. You could look at a blockchain analytics website, such as [Ethernodes](https://www.ethernodes.org/). You could also theoretically use your own node's [peer-to-peer discovery protocol](https://geth.ethereum.org/docs/interface/peer-to-peer) function.

In Ethereum's trustless system, you can choose who and what to trust based on logic. In other words, you can unequivocally prove that a process is trustworthy.

Can your centralized bank make the same claim to trustworthiness? Let's say you wanted to prove that your bank had enough money to cover a withdrawal. You would need to obtain something that Ethereum provides by default: a full, open record of every transaction ever executed. 

## Decentralization is everywhere {#decentralized-world}

You can find decentralized systems everywhere from ant colonies to blockchain projects. It's really nothing new. What's new — and super exciting — is the scale we're achieving with this seemingly basic form of organization.

Peer-to-peer systems are a classic internet example. Because users double as servers (providing computer power while using the services) these protocols are decentralized by default. Examples include BitTorrent and Skype. In fact, much of the underlying technology of the internet is based on [end-to-end networking](https://en.wikipedia.org/wiki/End-to-end_principle), an idea strongly related to peer-to-peer networks.

You could say that it still works this way, but that some of the "ends" have become extremely powerful and popular. In other words, rather than talking directly with the devices of our friends, family members, and random internet people (something that is completely possible through direct peer-to-peer or highly decentralized architectures), we all talk to social media servers.

## Decentralization in Ethereum {#ethereum-decentralized}

First things first: Nobody owns Ethereum. The [Ethereum Foundation](https://ethereum.foundation) provides support, but so do tons of other individuals and organizations.

Building on that, Ethereum is decentralized in many other important ways. People operate nodes across the world, there are many different client software options, and it interoperates (often via third-party [decentralized apps](https://ethereum.org/en/dapps/), or dapps) with a lot of other decentralized protocols. It is built to resist spammers, to provide clear consensus, and to be unprofitable (or at least proportionately expensive) to attack.

Ethereum is also _centralized_ in a very important way — there is an agreed-upon set of rules (in the form of computer code) that every node should follow. This allows the system to operate predictably. However, it bears mentioning that these rules are upgraded and maintained in a decentralized way.

### Smart contracts {#smart-contracts}

This logical centralization (the agreed mode of operation) allows the [Ethereum Virtual Machine](https://ethereum.org/en/glossary/#evm) to run smart contracts reliably. Smart contracts are computer programs that run on the EVM. They're essential parts of any Ethereum dapp. They provide the backbone for exchanges, escrow services, NFTs, and nearly anything else you can imagine.

Many dapps have a nice front-end user interface these days — a mobile app or a website, for example. However, some of those front-ends run on centralized servers or are served on centralized cloud companies.

The strength of smart contracts is that they keep running even if the servers hosting front-end portals go down. If the dapp you want to use has open-source code, you (or someone who knows how to do this) could potentially download the front-end and host your own instance on your own servers. The same goes for writing programs that interact with the smart contract. As long as Ethereum is working, it's likely most of the services will be available.

This level of resilience and resistance to attack is possible because of decentralization. Ethereum keeps running (and so do its smart contracts) even if there is a massive cloud provider outage, widespread censorship, or something else that breaks the popular user interface.

## Pros and cons of using Ethereum {#pros-cons}

Decentralization has a number of pros and cons, but they're mostly dependent on exact use cases. To make things more straightforward, let's use Ethereum as an example.

You'll notice that most of the cons of Ethereum come from it being a new technology, not from it being decentralized. New technologies are hard to use for one simple reason: You don't know how to use them yet.

Conversely, most of the pro-Ethereum arguments come directly from the fact that the network is decentralized. Your traditional financial institutions are unlikely to offer these benefits. In some cases, they simply can't. 

### Pros {#pros-of-ethereum}

- You have control over your funds.
- It would take a complex, coordinated, international attack of disproportionate cost to stop the Ethereum network from operating.
- You don't need permission to participate (no loan applications, for example). All you need is access to the network.
- Ethereum does not associate your activities with your personal identity (because it doesn't know who you are).
- Brute-force "identity theft" crimes can be extremely difficult because account credentials are cryptographically protected.
- You can issue transactions instantly from anywhere with an internet connection.
- You can check how everything works — and even participate directly in improving it.

### Cons {#cons-of-ethereum}

- Nobody but the recipient can help if you send your funds to the wrong address.
- You are responsible for account security and privacy practices: for keeping your [private keys](https://ethereum.org/en/glossary/#private-key) secure and keeping your personal information separate from your online activities.
- You will probably have to learn new information and behaviors.
- It is your responsibility to identify and comply with applicable laws.
- It can be difficult to know which contracts, information sources, and apps you should trust.

It basically comes down to whether controlling your money is worth your attention — whether obtaining a higher degree of freedom is worth learning something new. In the end, it's up to you to decide. 

However, know that there are a lot of smart people who are dedicating themselves to making this technology easier for you to use. There is less need for confirmation, problem-solving, and configuration every day. If a decentralized system is simply too technical for you right now, check it out again soon. It's getting simpler every day, from a user's perspective.

It also bears mentioning that you can be one of those smart people working on Ethereum. Perhaps the biggest pro-Ethereum argument out there is that your contributions matter. 

If you use a smart contract or transact on Ethereum, you're doing something to support the entire network. If you give feedback to a developer, asking for new features or reporting issues, that's even better. You can even contribute directly by documenting, translating, coding, or starting your own project.

### Basic Ethereum safety {#safety-ethereum}

Non-technical? Don't worry. The decentralized financial systems of the future will probably be easier to use than centralized finance is today. In the meantime, please take some basic steps to keep your funds safe when you're starting out on Ethereum:

- [Learn about how wallets work](https://ethereum.org/en/wallets/)
- Confirm (before interacting with a smart contract) that your wallet or exchange account can interact with smart contracts
- Triple-check destination addresses, even if you're sending things to yourself or to exchanges
- Send small test transactions before sending big amounts
- Understand the difference between pseudonymous and private (most blockchains are public, pseudonymous records)
- Above all else, do not share private keys or mnemonic phrases with others. Not even if they're trying to help. 

## Decentralized systems can be more efficient {#efficiency-in-decentralization}

Decentralized systems eliminate the need to trust third-party intermediaries. They return some control over your decisions. As a direct result of these two things, they can lower overhead. 

### Less to pay for {#operational-efficiency}

In short, decentralization cuts out the intermediary. When you (or the merchant selling you something, if you believe that merchants altruistically assume the costs of payment processing) pay a centralized credit card company a percentage of every purchase, you are paying for:

- The trusted position of the processor as a third party
- The point-of-sale infrastructure
- Growth of the processor's corporation
- Fat executive compensation packages
- The cost of executing the transaction

In Ethereum, you pay:

- The cost of running and securing the network (which network operators do at a profit)

### Less to shuffle around {#organizational-efficiency}

On Ethereum specifically, you pay what's called [gas](/glossary#gas). Gas is a pretty complex subject, but it boils down to being a network fee — at least from your perspective as a user. You pay more when your transactions use more network resources.

Payment processing fees from traditional services like Visa or Paypal derive from a labyrinthine mess of promotional rates, business partnerships, bulk discounts, regional interests, exchange rates, and arbitrary decisions by corporations. Ethereum gas fees derive from a transparent, community-defined set of rules that balances the interests of network operators and users. Once the rules are in place, they automatically execute the same way for every transaction.

## Ethereum is the perfect decentralized system! Right? {#challenges-to-ethereum}

So, Ethereum is a perfect, utopian decentralized computing system, right? Not so fast.

The network works, but it's still a work in progress. Also, like most decentralized systems, Ethereum prioritizes some forms of decentralization over others.

Becoming even more awesome is always on the agenda, though. Here are some things the community is working towards:

- **Increased [client diversity](/developers/docs/nodes-and-clients#advantages-of-different-implementations)**: Diverse software means less chance for a single bug or attack to cause a major problem.
- **Better geographical distribution of network operators (active participants in many different countries)**: Having nodes in many different places reduces the risk of government interference, outages from regional disasters, etc.
- **Distribution of ETH balances (already one of the most even distributions in crypto)**: Currency value is at risk for manipulation when the supply is largely controlled by a single entity or group of associated entities. In other words, a centralized group can decide how much is available. Increased distribution reduces this risk.
- **Increased cooperation between the Ethereum community and other decentralized projects**: Ethereum is at the infrastructure level for the decentralized web. Linking other projects and building more applications increases competition, but it also increases utility.
- **Better communication between network operators, users, and software developers**: Communication helps identify potential uses and resolve issues. Sometimes one group will have a perspective that the others did not consider.

## Not all crypto and blockchain projects are decentralized {#centralized-vs-decentralized}

"Blockchain/crypto" does not equal "decentralized". The fact is that most systems have aspects of centralization and decentralization. These design concepts can and do coexist.

So the question becomes what types of decentralization are practical? What types of centralization do we absolutely need? As mentioned above, Ethereum needs to have a central set of computing rules, or else the machine wouldn't know what to do.

Let's look at a couple of examples.

### Example 1: United States Dollar coins {#usd-on-ethereum}

For example, USDC is a United-States-Dollar-value cryptocurrency. It is "backed by fully reserved assets" (a phrase assumedly meant to communicate that it is fully backed by reserve assets). It is controlled in a relatively centralized way: via a permissioned consortium founded by two big corporations.

DAI is another dollar-value coin. DAI gets created when people deposit crypto assets in a program (a smart contract). That smart contract was developed by a group called [MakerDAO](https://makerdao.com/en/). People who hold the MKR asset get to vote on how the program behaves. It is far more decentralized than USDC.

These two currencies seem similar at first glance. However, both the architectures behind them and the implications of using them are super different.

- USDC has some ties to centralized institutions. As such, those institutions offer convenience perks that might appeal to inexperienced cryptocurrency users.
- DAI would be a good option for those who value decentralization and diversity in the cryptocurrency community, as DAI can be created by depositing a variety of different assets.

Both use cases are valid. So, the question really isn't which idea is better; it's which dollar coin is better for each use/user.

### Example 2: Currency exchanges {#exchanges}

There are centralized and decentralized crypto exchanges. Here's a table of how Uniswap, a decentralized exchange, compares to Coinbase, a centralized one.

| Uniswap                                                                                      | Coinbase                                                                                                                                                                      |
| -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| You send an asset to a contract. The contract executes your trade and returns another asset. | You must deposit your assets. You can then trade and withdraw once your deposit clears.                                                                                       |
| You must trust the smart contract to execute correctly.                                      | You must trust the exchange to hold your assets, execute your trades, secure your personal information, maintain adequate depth for withdrawals, and operate disinterestedly. |
| Users publicly provide paired liquidity. A smart contract uses the liquidity to fill orders. | Market makers enter into private deals with the exchange. The exchange executes orders.                                                                                       |
| Trading fees go to a development fund and liquidity provider payments.                       | Trading fees go to.... business stuff?                                                                                                                                        |
| Transaction fees depend on Ethereum network conditions.                                      | Transactions don't actually happen, so there are no transaction fees.                                                                                                         |
| Participants can help [make decisions](https://gov.uniswap.org) about the exchange.          | Decisions are made by corporate executives and shareholders.                                                                                                                  |
| You can trade any Ethereum-based assets (including assets pegged to Bitcoin, USD, etc.)      | You can trade in any asset the exchange decides to provide liquidity for.                                                                                                     |

## The history of decentralization {#history-of-decentralization}

In the early days of computer networking, things were relatively centralized. Computers were too expensive for most people. Institutions (and departments within institutions) ran their own services. The services were often redundant, proprietary, and incapable of smooth intercommunication. This was far from ideal.

Then came a collaboration between a Department of Defense lab and an Ivy League university. 

The results of this collaboration were the transmission control and internet protocols (TCP/IP), which were followed by several other core internet standards. These centralized logics led to massive decentralization in communications. 

Federated councils of institutions eventually progressed to nebulous networks of individual programmers and service providers. We now have a system where an astounding number of people have the hardware resources to develop, operate, and access services using basic, universal protocols.

But web activity is conglomerating under the control of a handful of states, advertisers, and infrastructure providers. Many are duplicating services, making it difficult for people to interoperate, and even forming cabalistic partnerships or engaging in aggressive corporate acquisition strategies.

As they continue to wall themselves off, they'll continue to become more and more useless. They'll return to the redundant, proprietary, non-communicative systems that made the internet necessary in the first place. 

### Past, present, and future {#future-of-decentralization}

Decentralization was a huge part of the internet's success. It's still around right now, baked right in — but it's under threat from centralizing forces that are building a less free, less interoperable system.

Despite those forces (and in part because of their inherent shortcomings), decentralization will play an important role in guiding the design of the future internet. Ethereum and other blockchain technologies will be a part of that design.

The need for decentralization is obvious. Whether it's for finance, commerce, gaming, social networking, or anything else, things are just better when we're in clear, open communication with each other — without any third-party intermediaries censoring, controlling, owning, impeding, or otherwise diminishing our experience.

## Supporting and exploring the decentralized web {#exploration}

Decentralized systems typically depend on individuals who run nodes. Are you an individual, by chance? If you have the basic hardware, you can run an Ethereum node at home. One of the best things you can do to support the ecosystem is [running one of the minority clients](https://blog.ethereum.org/2021/03/23/supporting-ethereums-client-ecosystem/).

What's in it for you? You will have a cool computer networking project and you'll be contributing to the speed and defense of the [Ethereum Virtual Machine](/glossary#evm). Once your node is secure, you can also use it as an Ethereum wallet (or for a number of other advanced applications). There are even several public testnets if you don't want to start out risking real money.

<ButtonLink to="/developers/docs/nodes-and-clients/run-a-node/">Start running a node</ButtonLink>

### Decentralized apps (dapps) {#dapps}

Decentralized apps are — wait for it — apps that follow decentralized design principles. There are a ton of these on Ethereum because the network allows for complex computing tasks, beyond sending coins from one address to another.

<ButtonLink to="/dapps/">Explore dapps</ButtonLink>

### Decentralized finance (defi) {#defi}

If you're sensing a pattern here, you're right: Defi is finance that follows decentralized design principles. Loans, securities, market indices, derivatives, even tokenized tokens — there's a lot out there.

<ButtonLink to="/defi/">Learn about defi</ButtonLink>

## More reading {#further-references}

- Learn about the [Ethereum Foundation](/foundation/), which, at the risk of being redundant, does _not_ own or operate Ethereum.
- Follow up with a major source for this article: [this blog post by a co-founder of Ethereum](https://medium.com/@VitalikButerin/the-meaning-of-decentralization-a0c92b76a274)
- Get the minutiae of how core [Ethereum development community](https://www.ethereumcatherders.com/) works, socially.
- Read the [Ethereum whitepaper](/whitepaper/).
- Check out this Nobel-Prize winning (centralized award, ironic, yes) economist's ideas about [common resource governance](<https://en.wikipedia.org/wiki/Elinor_Ostrom#Design_principles_for_Common_Pool_Resource_(CPR)_institution>).
- The [decentralized web](https://blockchainhub.net/web3-decentralized-web/) from a historical and technical perspective.

<!--

## Exploring the decentralized web {#decentralized-web}

There's a lot out there beyond Ethereum. Some systems might complement, serve, or empower this project, while others might declare (bombastically, usually) to be in competition. Hopefully, everyone succeeds.

Please note that decentralization is not a monolithic concept. There are different types and varying degrees of it. Overall, some of these projects are not as decentralized as others in certain respects.
### Storage (desto, maybe?) {#storage}

Blockchains like Etherereum's aren't the most efficient places for storing data. Luckily, there are various open protocols/paid services that provide decentralized, verifiable locations for your stuff:

- [IPFS](https://ipfs.io/)
- [Filecoin](https://filecoin.io/) (based in part on IPFS)
- [Storj](https://storj.io/)
- [Swarm](https://swarm.ethereum.org/) (also for encrypted messaging)

### File sharing {#filesharing}

- [BitTorrent](https://www.bittorrent.org/introduction.html). No, it's not just for music pirates.

### Other blockchains {#blockchains}

There are other blockchain-based projects out there doing different things (or the same things, but with different marketing approaches). If decentralization is a priority for you, please remember that "blockchain" does not equal "decentralized". A blockchain with a central point of failure (i.e. a single governing authority that can make unilateral decisions) would have many of the same risks as a centralized system.

### Other decentralized projects {#decentralized-projects}

- [Scuttlebot](https://scuttlebot.io/): Logging
- [YaCy](https://yacy.net): Search
- [Ethereum Naming Service](https://ens.domains/): Name registration
- [IPNS](https://docs.ipfs.io/concepts/ipns/): Name registration
- [Hyperledger](https://www.hyperledger.org/): Distributed ledger framework with Ethereum interoperability

-->
