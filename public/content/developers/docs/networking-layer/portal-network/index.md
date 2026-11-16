---
title: The Portal Network
description: An overview of the Portal Network, a peer-to-peer network that keeps Ethereum's history available as clients stop storing all of it.
lang: en
---

[Ethereum](/) is a network made up of computers that run Ethereum client software. Each of these computers is called a 'node'. The client software allows a node to send and receive data on the Ethereum network, and verifies data against the Ethereum protocol rules. Nodes keep a lot of historical data in their disk storage and add to it when they receive new packets of information, known as blocks, from other nodes on the network. This is necessary for always checking that a node has information consistent with the rest of the network. This means running a node can require a lot of disk space. Some node operations can require a lot of RAM too.

Execution clients no longer have to keep all of that data. Since July 2025 they can drop the bodies and receipts of blocks from before [The Merge](/roadmap/merge/), and the Ethereum roadmap includes dropping more of the chain's history over time. That history still has to stay available to anyone who needs it, such as block explorers, indexers or a wallet looking up an old transaction.

The Portal Network keeps this history available by sharing it in small pieces across many nodes. No node has to store all of it, and a node can fetch any piece and check it against data it already holds, without trusting the node that sent it.

More on [nodes and clients](/developers/docs/nodes-and-clients/)

## Why do we need the Portal Network {#why-do-we-need-portal-network}

Ethereum nodes store their own full or partial copy of the Ethereum blockchain. This local copy is used to validate transactions and ensure the node is following the correct chain. This locally stored data allows nodes to independently verify that incoming data is valid and correct without needing to trust any other entity.

This local copy of the blockchain and associated state and receipt data takes up a lot of space on the node's hard disk. For example, a 4TB SSD is recommended for running a node using [Geth](https://geth.ethereum.org) paired to a consensus client. With full chain history, Geth occupies more than 1.8TB of disk space (as of September 2026), and that keeps growing with the chain.

This means running nodes can be expensive, because a large amount of disk space has to be dedicated to Ethereum. [History expiry](/roadmap/statelessness/#history-expiry) reduces it by letting clients delete old block data they don't need to follow the chain: since [partial history expiry](https://blog.ethereum.org/2025/07/08/partial-history-exp) in July 2025, execution clients can drop the bodies and receipts of every block before The Merge. [State expiry](/roadmap/statelessness/#state-expiry) and [statelessness](/roadmap/statelessness/) are further solutions that are still being researched.

Once nodes stop storing old history, they can no longer serve it to others. Archives, torrents and providers keep copies of it; the Portal Network spreads it across many nodes, so it stays available without relying on any one of them.

## How does the Portal Network work? {#how-does-portal-network-work}

Ethereum nodes have strict protocols that define how they communicate with each other. Execution clients communicate using a set of subprotocols known as [DevP2P](/developers/docs/networking-layer/#devp2p), while consensus clients use a different stack of subprotocols called [libP2P](/developers/docs/networking-layer/#libp2p). DevP2P lets a node request block bodies and receipts from its peers, but a peer that has dropped old history can't serve it. Apps and wallets can also get data from a node through the [JSON-RPC API](/developers/docs/apis/json-rpc/), but that relies on one node or provider storing the data and on trusting it to be honest.

The Portal Network is a separate peer-to-peer network built for sharing history. It runs on [discv5](https://github.com/ethereum/devp2p/blob/master/discv5/discv5.md), the node discovery protocol that consensus clients also use for finding peers, and organizes its nodes as a [distributed hash table (DHT)](https://en.wikipedia.org/wiki/Distributed_hash_table), similar to BitTorrent's. Every node has a node ID, and every piece of content, such as the receipts of one block, has a content ID in the same ID space, derived from its block number. Each node stores the content whose IDs are closest to its own ID, up to a distance it chooses, called its radius. To fetch a piece of content, a node asks the peers it knows that are closest to the content ID. Peers that don't have it answer with nodes that are closer still, until the request reaches a node that stores it.

<PortalHistoryDiagram />

A node never has to trust the data it receives. It keeps every block header, and each header commits to its block's transactions and receipts through roots such as `transactionsRoot` and `receiptsRoot`. The node checks a block body or a block's receipts against those roots before using them.

### The Portal Networks {#the-portal-networks}

The Portal Network was first designed as several subnetworks that would let lightweight clients follow the chain without trusting a full node: a beacon chain light client network, a state network, a transaction gossip network and a history network. In 2025, the specifications of all but one of them were moved to legacy, and development now focuses on the **History network**, which stores the bodies and receipts of past blocks for execution clients that keep every block header but have dropped the rest of the history.

## Portal Network clients {#client-diversity-as-default}

Several teams built Portal Network clients:

- [Nimbus Portal client](https://fluffy.guide) (formerly Fluffy): written in Nim, and the one still in active development
- [Trin](https://github.com/ethereum/trin): written in Rust, no longer maintained
- [Ultralight](https://github.com/ethereumjs/ultralight): written in TypeScript, with no updates since mid-2025
- [Shisui](https://github.com/zen-eth/shisui): written in Go, with no updates since mid-2025

## Further reading {#further-reading}

- [Portal Network specifications](https://github.com/ethereum/portal-network-specs)
- [Using the Portal Network protocol for history expiry](https://ethresear.ch/t/using-portal-network-protocol-for-history-expiry/22658)
- [Partial history expiry](https://blog.ethereum.org/2025/07/08/partial-history-exp)
- [The Portal Network (Piper Merriam at Devcon Bogota)](https://www.youtube.com/watch?v=0stc9jnQLXA)
- [The Portal Network discord](https://discord.gg/CFFnmE7Hbs)
- [The Portal Network website](https://www.ethportal.net/)
