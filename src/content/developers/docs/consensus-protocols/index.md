---
title: Consensus protocols
description: An explanation of consensus protocols in distributed systems and the role they play in Ethereum.
lang: en
sidebar: true
incomplete: true
---

A fundamental problem in distributed computing is to achieve overall system reliability while individual nodes of the network may be faulty, malicious or otherwise unreliable.

When it comes to blockchains like Ethereum, which are in essence distributed databases, the nodes of the network must be able to reach agreement on the current state of the system. This is achieved using consensus protocols.

## Prerequisites {#prerequisites}

To better understand this page, we recommend you first read our [introduction to Ethereum](/developers/docs/intro-to-ethereum/).

## What is a consensus protocol?

Consensus protocols (also known as consensus mechanisms or consensus algorithms) allow distributed systems (networks of computers) to work together.

For decades, consensus protocols have been used to establish consensus among database nodes, application servers, and other enterprise infrastructure. In recent years, new consensus protocols have been invented to allow cryptoeconomic systems, such as Ethereum, to agree on the state of the network.

Using a consensus protocol within Ethereum allows the nodes of the Ethereum network to agree on the state of all information recorded on the Ethereum blockchain, and prevents certain kinds of economic attacks.

<!-- ### Consensus -->

<!-- Formal requirements for a consensus protocol may include: -->

<!-- - Agreement: All correct processes must agree on the same value. -->
<!-- - Weak validity: For each correct process, its output must be the input of some correct process. -->
<!-- - Strong validity: If all correct processes receive the same input value, then they must all output that value. -->
<!-- - Termination: All processes must eventually decide on an output value -->

<!-- ### Fault tolerance -->
<!-- TODO explain how protocols must be fault tolerant -->

## Types of consensus protocols

<!-- TODO -->
<!-- Why do different consensus protocols exist? -->
<!-- What are the tradeoffs of each? -->

### Proof of work

Ethereum, like Bitcoin, currently uses a [proof-of-work (PoW)](/developers/docs/consensus-protocols/pow/) consensus protocol.

<!-- - In order to add blocks to the chain, miners compete to solve difficult puzzles using their computer processing power -->
<!-- - The first miner to solve each puzzle (and create a block) is given a reward for their work -->
<!-- - To prevent malicious blocks from being added, an actor must have 51% of more of the network's computing power -->

### Proof of stake

Ethereum has plans to upgrade to a [proof of stake (PoS)](/developers/docs/consensus-protocols/pos/) consensus protocol.

<!-- - In order to add blocks to the chain, block creators (validators) are chosen -->
<!-- - The first miner to solve each puzzle (and create a block) is given a reward for their work -->
<!-- - To prevent malicious blocks from being added, an actor must have 51% of more of the network's computing power -->

## Further Reading {#further-reading}

<!-- TODO -->

## Related Topics {#related-topics}

- [Proof of work](/developers/docs/consensus-protocols/pow/)
- [Mining](/developers/docs/consensus-protocols/pow/mining/)
- [Proof of stake](/developers/docs/consensus-protocols/pos/)
