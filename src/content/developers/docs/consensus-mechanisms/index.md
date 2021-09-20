---
title: Consensus mechanisms
description: An explanation of consensus protocols in distributed systems and the role they play in Ethereum.
lang: en
sidebar: true
incomplete: true
---

When it comes to blockchains like Ethereum, which are in essence distributed databases, the nodes of the network must be able to reach agreement on the current state of the system. This is achieved using consensus mechanisms.

Although not a part of building a dapp, understanding consensus mechanisms will help explain things that are relevant to you and your users' experience, like gas prices and transaction times.

## Prerequisites {#prerequisites}

To better understand this page, we recommend you first read our [introduction to Ethereum](/developers/docs/intro-to-ethereum/).

## What is a consensus mechanism? {#what-is-a-consensus-mechanism}

Consensus mechanisms (also known as consensus protocols or consensus algorithms) allow distributed systems (networks of computers) to work together and stay secure.

For decades, these mechanisms have been used to establish consensus among database nodes, application servers, and other enterprise infrastructure. In recent years, new consensus protocols have been invented to allow cryptoeconomic systems, such as Ethereum, to agree on the state of the network.

A consensus mechanism in a cryptoeconomic system also helps prevent certain kinds of economic attacks. In theory, an attacker can compromise consensus by controlling 51% of the network. Consensus mechanisms are designed to make this "51% attack" unfeasible. Different mechanisms are engineered to solve this security problem differently.

<!-- ### Consensus -->

<!-- Formal requirements for a consensus protocol may include: -->

<!-- - Agreement: All correct processes must agree on the same value. -->
<!-- - Weak validity: For each correct process, its output must be the input of some correct process. -->
<!-- - Strong validity: If all correct processes receive the same input value, then they must all output that value. -->
<!-- - Termination: All processes must eventually decide on an output value -->

<!-- ### Fault tolerance -->
<!-- TODO explain how protocols must be fault tolerant -->

## Types of consensus mechanisms {#types-of-consensus-mechanisms}

<!-- TODO -->
<!-- Why do different consensus protocols exist? -->
<!-- What are the tradeoffs of each? -->

### Proof of work {#proof-of-work}

Ethereum, like Bitcoin, currently uses a proof-of-work (PoW) consensus protocol.

#### Block creation {#pow-block-creation}

Proof of work is done by [miners](/developers/docs/consensus-mechanisms/pow/mining/), who compete to create new blocks full of processed transactions. The winner shares the new block with the rest of the network and earns some freshly minted ETH. The race is won by whosever computer can solve a math puzzle fastest – this produces the cryptographic link between the current block and the block that went before. Solving this puzzle is the work in "proof-of-work".

#### Security {#pow-security}

The network is kept secure by the fact that you'd need 51% of the network's computing power to defraud the chain. This would require such huge investments in equipment and energy, you're likely to spend more than you'd gain.

More on [proof-of-work (PoW)](/developers/docs/consensus-mechanisms/pow/)

### Proof of stake {#proof-of-stake}

Ethereum has plans to upgrade to a [proof-of-stake (PoS)](/developers/docs/consensus-mechanisms/pos/) consensus protocol.

#### Block creation {#pos-block-creation}

Proof of stake is done by validators who have staked ETH to participate in the system. A validator is chosen at random to create new blocks, share them with the network and earn rewards. Instead of needing to do intense computational work, you simply need to have staked your ETH in the network. This is what incentivises healthy network behaviour.

#### Security {#pos-security}

A proof-of-stake system is kept secure by the fact that you'd need 51% of the total staked ETH to defraud the chain. And that your stake is slashed for malicious behaviour.

More on [proof of stake](/developers/docs/consensus-mechanisms/pos/)

### Sybil Resistance & Chain Selection

Now technically, both proof-of-work (PoW) and proof-of-stake (PoS) are not consensus protocols by themselves, but they are often referred to as such for simplicity. PoW and PoS are actually Sybil resistance mechanisms and block author selectors, they are a way to decide who is the author of the latest block. It's this mechanism combined with at least a chain selection rule that makes up a true consensus mechanism.

**Sybil resistance** is a measure of how a protocol fares against a [Sybil attack](https://en.wikipedia.org/wiki/Sybil_attack). Sybil attacks are when one user or group pretends to be many users. Resistance to this type of attack is essential for a decentralized blockchain, and enables miners and validators to be rewarded equally based on resources put in. PoW and PoS protect against this by making users expend a lot of energy or put up a lot of collateral respectively, making it really hard for one to pretend to be many.

A **chain selection rule** is used to decide which chain is the "correct" chain. Ethereum and Bitcoin currently use the "longest chain" rule, which means that whichever blockchain is the longest will be the one the rest of the nodes accept as valid and work with. This is determined by the chains total cumulative PoW difficulty.

The combination of PoW and longest chain rule is known as "Nakamoto Consensus."

Eth2 (the [beacon chain](/eth2/beacon-chain/)) uses a consensus mechanism called [Casper the Friendly Finality Gadget](https://arxiv.org/abs/1710.09437), which is PoS based.

## Further Reading {#further-reading}

- [What is Nakamoto Consensus? Complete Beginner’s Guide](https://blockonomi.com/nakamoto-consensus/)
- [On the Security and Performance of Proof of Work Blockchains](https://eprint.iacr.org/2016/555.pdf)

_Know of a community resource that helped you? Edit this page and add it!_

## Related Topics {#related-topics}

- [Proof of work](/developers/docs/consensus-mechanisms/pow/)
- [Mining](/developers/docs/consensus-mechanisms/pow/mining/)
- [Proof of stake](/developers/docs/consensus-mechanisms/pos/)
