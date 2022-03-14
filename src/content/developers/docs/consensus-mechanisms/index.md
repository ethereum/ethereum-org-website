---
title: Consensus mechanisms
description: An explanation of consensus protocols in distributed systems and the role they play in Ethereum.
lang: en
sidebar: true
incomplete: true
---

When it comes to blockchains like Ethereum, which are, in essence, distributed databases, the network's nodes must reach an agreement on the network's current state. This agreement is achieved using consensus mechanisms.

Although consensus mechanisms aren't directly related to building a dapp, understanding them will illuminate concepts relevant to you and your users' experience, like gas prices and transaction times.

## Prerequisites {#prerequisites}

To better understand this page, we recommend you first read our [introduction to Ethereum](/developers/docs/intro-to-ethereum/).

## Dictation as a consensus metaphor 

Before digging a bit deeper on consensus mechanisms, I believe that it is important to make a recap to understand how the previously described fundamental abstractions and concepts are relating one another.

To connect all the elements at play, think about a dictation exercise, like the ones you did as a child in elementary school.
For the sake of this example, say that you were distracted, and you did not write down some passage from the teacher’s dictation exercise. You would raise your hand and ask about that passage you missed, and your classmates will be able to tell you in a unanimous way the exact passage you missed.

The teacher -> the consensus mechanism, 
you and your classmates -> the nodes, 
the pages of your notebook in which you are writing -> the blocks, 
and the sentences you are writing -> pieces of data in the blocks.

Let us imagine now that you want to make a prank and you want to modify a previous passage from the dictation exercise, if you are alone, it would be very hard as you must edit everyone’s pages in their notebooks to change the class consensus. 

If you are a little bit advanced, you might be asking, how does the teacher get sentences?
To keep up with the example, we can say that such sentences are given by the "teacher’s helper". Teacher helper -> Validator/Miner.

## What is consensus? {#what-is-consensus}

By consensus, we mean that a general agreement has been reached. Consider a group of people going to the cinema. If there is not a disagreement on a proposed choice of film, then a consensus is achieved. In the extreme case the group will eventually split.

In regards to blockchain, the process is formalized, and reaching consensus means that at least 51% of the nodes on the network agree on the next global state of the network.

## What is a consensus mechanism? {#what-is-a-consensus-mechanism}

Consensus mechanisms (also known as consensus protocols or consensus algorithms) allow distributed systems (networks of computers) to work together and stay secure.

For decades, these mechanisms have been used to establish consensus among database nodes, application servers, and other enterprise infrastructure. In recent years, new consensus mechanisms have been invented to allow cryptoeconomic systems, such as Ethereum, to agree on the state of the network.

A consensus mechanism in a cryptoeconomic system also helps prevent certain kinds of economic attacks. In theory, an attacker can compromise consensus by controlling 51% of the network. Consensus mechanisms are designed to make this "51% attack" unfeasible. Different mechanisms are engineered to solve this security problem in different ways.

<YouTube id="dylgwcPH4EA" />

## Types of consensus mechanisms {#types-of-consensus-mechanisms}

### Proof-of-work {#proof-of-work}

Ethereum, like Bitcoin, currently uses a **proof-of-work (PoW)** consensus protocol.

#### Block creation {#pow-block-creation}

Proof-of-work is done by [miners](/developers/docs/consensus-mechanisms/pow/mining/), who compete to create new blocks full of processed transactions. The winner shares the new block with the rest of the network and earns some freshly minted ETH. The race is won by whosever computer can solve a math puzzle fastest – this produces the cryptographic link between the current block and the block that went before. Solving this puzzle is the work in "proof-of-work".

#### Security {#pow-security}

The network is kept secure by the fact that you'd need 51% of the network's computing power to defraud the chain. This would require such huge investments in equipment and energy; you're likely to spend more than you'd gain.

More on [proof-of-work](/developers/docs/consensus-mechanisms/pow/)

### Proof-of-stake {#proof-of-stake}

Ethereum has plans to upgrade to a **proof-of-stake (PoS)** consensus protocol.

#### Block creation {#pos-block-creation}

Proof-of-stake is done by validators who have staked ETH to participate in the system. A validator is chosen at random to create new blocks, share them with the network and earn rewards. Instead of needing to do intense computational work, you simply need to have staked your ETH in the network. This is what incentivises healthy network behaviour.

#### Security {#pos-security}

A proof-of-stake system is kept secure by the fact that you'd need 51% of the total staked ETH to defraud the chain. And that your stake is slashed for malicious behaviour.

More on [proof-of-stake](/developers/docs/consensus-mechanisms/pos/)

### A visual guide {#types-of-consensus-video}

Watch more on the different types of consensus mechanisms used on Ethereum:

<YouTube id="ojxfbN78WFQ" />

### Sybil resistance & chain selection {#sybil-chain}

Now technically, proof-of-work and proof-of-stake are not consensus protocols by themselves, but they are often referred to as such for simplicity. They are actually Sybil resistance mechanisms and block author selectors; they are a way to decide who is the author of the latest block. It's this Sybil resistance mechanism combined with a chain selection rule that makes up a true consensus mechanism.

**Sybil resistance** measures how a protocol fares against a [Sybil attack](https://wikipedia.org/wiki/Sybil_attack). Sybil attacks are when one user or group pretends to be many users. Resistance to this type of attack is essential for a decentralized blockchain and enables miners and validators to be rewarded equally based on resources put in. Proof-of-work and proof-of-stake protect against this by making users expend a lot of energy or put up a lot of collateral. These protections are an economic deterrent to Sybil attacks.

A **chain selection rule** is used to decide which chain is the "correct" chain. Ethereum and Bitcoin currently use the "longest chain" rule, which means that whichever blockchain is the longest will be the one the rest of the nodes accept as valid and work with. For proof-of-work chains, the longest chain is determined by the chain's total cumulative proof-of-work difficulty.

The combination of proof-of-work and longest chain rule is known as "Nakamoto Consensus."

The [Beacon Chain](/upgrades/beacon-chain/) uses a consensus mechanism called [Casper the Friendly Finality Gadget](https://arxiv.org/abs/1710.09437), which is proof-of-stake based.

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
