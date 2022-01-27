---
title: Client diversity
description: A high level explanation of the importance of Ethereum client diversity.
lang: en
sidebar: true
sidebarDepth: 2
---


The behaviour of an Ethereum node is controlled by the client software it runs. There are several production-level Ethereum clients, each one developed and maintained in different languages by separate teams. The clients are built to a common spec that ensures the clients seamlessly communicate with each other and have the same functionality and provide an equivalent user experience. Multiple clients exist because the development community has decided to build multiple implementations as a way to strengthen the network. However, at the moment the distribution of clients across nodes is not even enough to realise this network fortification to its full potential. Ideally, users divide roughly equally across the various clients to bring as much client diversity as possible to the network.

## Prerequisites {#prerequisites}

If you don't already have an understanding of what nodes and clients are, check out [Nodes and clients](/developers/docs/nodes-and-clients/). The Beacon Chain is explained [here](/src/content/eth2/beacon-chain/index.md). Execution and consensus layers are defined in the [glossary](/src/content/glossary/index.md).

## Current client diversity {#current-client-diversity}

![Pie chart showing client diversity](../client-diversity.jpg)
_Diagram data from [ethernodes.org](ethernodes.org) and [Michael Sproul](https://github.com/sigp/blockprint)_

The two pie charts above show snapshots of the current client diversity for the execution and consensus layers (at time of writing in January 2022). The execution layer is overwhelmingly dominated by [Geth](https://geth.ethereum.org/), with [Open Ethereum](https://openethereum.github.io/) a distant second, [Erigon](https://github.com/ledgerwatch/erigon) third and [Nethermind](https://nethermind.io/) fourth, with other clients comprising less than 1 % of the network. The most commonly used client on the consensus layer - [Prysm](https://prysmaticlabs.com/#projects) - is not as dominant as Geth but still represents over 60% of the network. [Lighthouse](https://lighthouse.sigmaprime.io/) and [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) make up ~20% and ~14% respectively, and other clients are rarely used.

The execution layer data were obtained from [Ethernodes](https://ethernodes.org) on 23/01/22. Data for consensus clients was obtained from [Michael Sproul](https://github.com/sigp/blockprint). Consensus client data is more difficult to obtain because the Beacon Chain clients do not always have unambiguous traces that can be used to identify them. The data was generated using a classification algorithm that sometimes confuses some of the minority clients (see [here](https://twitter.com/sproulM_/status/1440512518242197516) for more details). In the diagram above, these ambiguous classifications are treated with an either/or label (e.g. Nimbus/Teku). Nevertheless, it is clear that the majority of the network is running Prysm. The data is a snapshot over a fixed set of blocks (in this case Beacon blocks in slots 2048001 to 2164916) and Prysm's dominance has sometimes been higher, exceeding 68%. Despite only being snapshots, the values in the diagram provide a good general sense of the current state of client diversity.

Up to date client diversity data for the consensus layer is now available at https://clientdiversity.org/.

## Why is client diversity important? {#client-diversity-importance}

Having many independently developed and maintained clients is vital for the health of a decentralized network. Let's explore the reasons why.

A bug in an individual client is less of a risk to the network when representing a minority of Ethereum nodes. With a roughly even distribution of nodes across many clients, the likelihood of most clients suffering from a shared issue is small, and as a result, the network is more robust.

Client diversity also offers resilience to attacks. For example, an attack that [tricks a particular client](https://twitter.com/vdWijden/status/1437712249926393858) onto a particular branch of the chain is unlikely to be successful because other clients are unlikely to be exploitable in the same way and the canonical chain remains uncorrupted. Low client diversity increases the risk associated with a hack on the dominant client.

Ethereum has had 100% uptime since the network began. After the merge, the risks caused by poor client diversity become more alarming. A critical bug in a consensus client with over 33% of the Ethereum nodes could prevent the Beacon Chain from finalizing, causing Ethereum to go offline. Worse still, a critical bug in a client with a two-thirds majority could cause the chain to [incorrectly split and finalize](https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/), leading to a large set of validators getting stuck on an invalid chain. If they want to rejoin the correct chain, these validators face slashing or a slow and expensive voluntary withdrawal and reactivation. The magnitude of a slashing scales with the number of culpable nodes with a two-thirds majority slashed maximally (32 ETH).

Although these are unlikely scenarios, the risk associated with them can be mitigated by evening out the distribution of clients across the active nodes. Ideally, no consensus client would ever have more than 33% share of the total nodes.

There is also a human cost to having majority clients. It puts excess strain and responsibility on a small development team. The lesser the client diversity, the greater the burden of responsibility for the developers maintaining the majority client. Spreading this responsibility across multiple teams is good for both the health of Ethereum's network of nodes and its network of people.

## Use a minority client {use-minority-client}

Addressing client diversity requires more than individual users to choose minority clients - it requires mining/validator pools and institutions like the major dapps and exchanges to switch clients too. However, all users can do their part in redressing the current imbalance and normalising the use of all the available Ethereum software. After the merge, all node operators will be required to run an execution client and a consensus client. Choosing combinations of the clients suggested below will help increase client diversity.

### Execution clients {#execution-clients}

[Besu](https://www.hyperledger.org/use/besu)

[Nethermind](https://downloads.nethermind.io/)

[Erigon](https://github.com/ledgerwatch/erigon)

[CoreGeth](https://core-geth.org/)

### Consensus clients {#consensus-clients}

[Nimbus](https://nimbus.team/)

[Lighthouse](https://github.com/sigp/lighthouse)

[Teku](https://consensys.net/knowledge-base/ethereum-2/teku/)

and soon [Lodestar](https://github.com/ChainSafe/lodestar)

Technical users can help accelerate this process by writing more tutorials and documentation for minority clients and encouraging their node-operating peers to migrate away from the dominant clients. There are guides for switching to a minority consensus client available at [clientdiversity.org](https://clientdiversity.org/).

## Further reading {#further-reading}

- [List of Ethereum node services](https://ethereumnodes.com/)
- [Importance of client diversity](https://our.status.im/the-importance-of-client-diversity/)
- ["Five Why's" of the client diversity problem](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [Ethereum Diversity and How to Solve For It (Youtube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## Related topics {#related-topics}

- [Nodes and clients](/developers/docs/nodes-and-clients/)
