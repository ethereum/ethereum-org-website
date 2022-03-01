---
title: Consensus mechanisms
description: An explanation of consensus protocols in distributed systems and the role they play in Ethereum.
lang: en
sidebar: true
incomplete: true
---

Blockchains, like Ethereum, are distributed databases. The network's nodes must reach an agreement on the network's current state. Users of the blockchain all want to write to the database at the same time. It's the job of a consensus protocol to coordinate the network to agree on the same decisions and arrive at the same state.

Although consensus mechanisms aren't directly related to building a dapp, understanding them will illuminate concepts relevant to you and your users' experience, like gas prices and transaction times.

## Prerequisites {#prerequisites}

To better understand this page, we recommend you first read our [introduction to Ethereum](/developers/docs/intro-to-ethereum/).

## What is consensus? {#what-is-consensus}

By consensus, we mean that a general agreement has been reached. Consider a group of people going to the cinema. If there is not a disagreement on a proposed choice of film, then a consensus is achieved. In the extreme case the group will eventually split.

## What is a consensus mechanism? {#what-is-a-consensus-mechanism}

Consensus mechanisms (also known as consensus protocols or consensus algorithms) allow distributed systems (networks of computers) to work together and stay secure.

For decades, these mechanisms have been used to establish consensus among database nodes, application servers, and other enterprise infrastructure. In recent years, new consensus mechanisms have been invented to allow cryptoeconomic systems, such as Ethereum, to agree on the state of the network.

A consensus mechanism in a cryptoeconomic system also helps prevent certain kinds of economic attacks. In Nakamoto consensus, an attacker can compromise the database (known as a "safety violation") by controlling 51% of the network hash power. Consensus mechanisms are designed to make this "51% attack" unfeasible. Different protocols are engineered to solve this security problem in different ways.

<YouTube id="dylgwcPH4EA" />

## Types of consensus mechanisms {#types-of-consensus-mechanisms}

### Nakamoto Consensus {#nakamoto-consensus}

Ethereum, like Bitcoin, currently uses the Nakamoto, or "Longest Chain", consensus protocol.

#### Block creation {#pow-block-creation}

Nakamoto consensus is done by [miners](/developers/docs/consensus-mechanisms/pow/mining/) who compete to create new blocks full of processed transactions. They do this through a process known as "proof-of-work" mining (PoW). In PoW, miners are creating random numbers, called a nonce, and plugging that into a hash function to see if they produce a hash which satisfies a condition difficult enough to show they've put work into solving the problem. Once discovered, the miner who found the nonce proposes a new block to the rest of the network. In this new block, the miner pays itself in ETH. If the network decides to continue to build on his block, it becomes part of the "canonical chain" and the miner has some freshly minted ETH.

The race is won by whosever computer can solve a math puzzle fastest – this produces the cryptographic link between the current block and the block that went before. Solving this puzzle puts the work in "proof-of-work".

#### Security {#pow-security}

The network is kept secure by the fact that you'd need 51% of the network's computing power to defraud the chain. This would require such huge investments in equipment and energy; you're likely to spend more than you'd gain.

More on [proof-of-work](/developers/docs/consensus-mechanisms/pow/)

### Casper FFG {#casper-ffg}

Ethereum has plans to upgrade to a **proof-of-stake (PoS)** consensus protocol.

#### Block creation {#pos-block-creation}

**Casper the Friendly Finality Gadget (Casper FFG)** is utilized by validators who have staked ETH to participate in the system. A validator is chosen at random to create a new block. This randomness constitutes the proposal mechanism that would otherwise be the "work" in proof-of-work for Nakamoto consensus. Once it's a validator's turn to propose a block, they share it with the network and earn rewards. Instead of needing to do intense computational work, they'd simply need to have staked their ETH in the network. This is what incentivizes healthy network behavior as the validator now has skin in the game.

#### Security {#pos-security}

A proof-of-stake system is kept secure by the fact that you'd need 34% of the total voting power in a committee to defraud the chain. Malicious behavior under proof-of-stake also result in staked ETH being slashed in proportion to the size of the attack.

More on [proof-of-stake](/developers/docs/consensus-mechanisms/pos/)

### A visual guide {#types-of-consensus-video}

Watch more on the different types of consensus protocols used on Ethereum:

<YouTube id="ojxfbN78WFQ" />

### Sybil resistance {#sybil-chain}

Have you ever seen a website that's being spammed by a ton of fake accounts? These fake accounts are run by bots which try to sell you something. To get around that, a lot of sites employ a system called "captchas". These captchas are difficult for computers to solve but easy for humans, preventing automation from making fake identities. Another way to prevent fake accounts is to force users to pay for a service. This payment associates a cost with automation, preventing armies of bots from taking over a site.

Blockchains have a form of captcha of their own. This process of preventing fake identities from taking over a network is called "Sybil resistance". Like captcha or premium accounts on a website, Sybil resistance mechanisms associate some kind of work or value to participating in the blockchain. This causes an innate investment in the success of the network.

**Sybil resistance** describes how a protocol fares against a [Sybil attack](https://en.wikipedia.org/wiki/Sybil_attack). Sybil attacks are when one user or group pretends to be many users. Resistance to this type of attack is essential for a decentralized blockchain and enables miners and validators to be rewarded equally based on resources put in. Proof-of-work and proof-of-stake protect against this by making users expend a lot of energy or put up a lot of collateral. These protections are an economic deterrent to Sybil attacks.

Proof-of-work and proof-of-stake are not consensus protocols by themselves, but since each blockchain needs some form of Sybil resistance, it's easy to conflate the two concepts. They actually are Sybil resistance mechanisms and block author selectors. They are a way to decide who is the author of the latest block. It's this Sybil resistance mechanism combined with proposal mechanism that makes up a truly decentralized consensus protocol.

### Proposal mechanism {#proposal-mechanism}

A proposal mechanism is what's used to determine the next block proposed on the network. In Nakamoto consensus, a person who mines a winning nonce gets the right to be the leader for the next block. They propose that block to the network. In Eth2, a random beacon decides the order of proposers from the list of available validators. In both cases, after a block is proposed, it's up to the next proposer to decide if they want to build on that block or on another block proposed in the case of competing proposals. This is what's known as the "chain selection rule".

### Chain selection rule {#chain-selection-rule}

A **chain selection rule** is used to decide which chain is the "correct" chain. Ethereum and Bitcoin use the "longest chain" rule, which means that whichever blockchain is the longest will be the one the rest of the nodes accept as valid and work with. For proof-of-work chains, the longest chain is determined by the chain's total cumulative proof-of-work difficulty.

The combination of proof-of-work and longest chain rule makes up Nakamoto consensus.

Eth2 (the [beacon chain](/eth2/beacon-chain/)) uses a consensus protocol called [Casper the Friendly Finality Gadget](https://arxiv.org/abs/1710.09437), which is proof-of-stake based.

## Further reading {#further-reading}

- [What Is a Blockchain Consensus Algorithm?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [What is Nakamoto Consensus? Complete Beginner’s Guide](https://blockonomi.com/nakamoto-consensus/)
- [How Does Casper work?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [On the Security and Performance of Proof of Work Blockchains](https://eprint.iacr.org/2016/555.pdf)

_Know of a community resource that helped you? Edit this page and add it!_

## Related topics {#related-topics}

- [Proof-of-work](/developers/docs/consensus-mechanisms/pow/)
- [Mining](/developers/docs/consensus-mechanisms/pow/mining/)
- [Proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
