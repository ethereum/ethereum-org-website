---
title: Statelessness and history expiry
description: Explanation of history expiry and stateless Ethereum
---

The ability to run Ethereum nodes on modest hardware is critical for true decentralization. This is because running a node gives users the ability to verify information by performing cryptographic checks on their own local copy of the Ethereum blockchain rather than trusting a third party to feed them data. Running a node allows users to submit transactions directly to the Ethereum peer-to-peer network rather than having to trust an intermediary. Decentralization is not possible if these benefits are only available to users with expensive hardware. Instead, nodes should be able to run with extremely modest processing and memory requirements so that they can run on mobile phones, micro-computers or unnoticeably on a home computer.

Today, high disk space requirements is the main barrier preventing universal access to nodes. This is primarily due to the need to store large chunks of Ethereum's state data. This state data contains critical information required to correctly process new blocks and transactions. At the time of writing, a fast 2TB SD is recommended for running a full Ethereum node. For a node that does not prune any older data, the storage requirement grows at around 14GB/week, and archive nodes that store all data since genesis are approaching 12 TB.

Cheaper hard drives can be used to store older data but those are too slow to keep up with incoming blocks. Keeping the current storage models for clients while making data cheaper and easier to store is only a temporary and partial solution to the problem because Ethereum's state growth is 'unbounded', meaning that storage requirements can only ever increase, and technological improvements will always have to keep pace with continual state growth. Instead, clients must find new ways to verify blocks and transactions that doesn't rely on looking up data from local databases. This is referred to as going "stateless".

## Types of statelessness {#types-of-statelessness}

Statelessness is a bit of a misnomer because it does not mean the concept of "state" is eliminated, it just means clients outsource responsibility for maintaining state data to other entities rather than storing it themselves. There are degrees of statelessness, from fully stateful (storing all necessary state) to completely stateless (stores no state). The Ethereum roadmap contains several potential upgrades that push clients along the statelessness spectrum to varying degrees.

### History Expiry {#state-expiry}

History expiry refers to clients pruning away older data that they are unlikely to need, so that they only store a small amount of historical data, dropping older data when new data arrives. There are two reasons clients require historical data: syncing and serving data requests. Originally, clients had to sync from the genesis block, verifying that each successive block is correct all the way to the head of the chain. Today, clients use "weak subjectivity checkpoints" to bootstrap their way to the head of the chain. These checkpoints are trusted started points, like having a genesis block close to the present rather than the very start of Ethereum. This means clients can drop all information prior to the most recent weak subjectivity checkpoint without losing the ability to sync to the head of the chain. Clients currently serve requests (arriving via JSON-RPC) for historical data by grabbing it from their local databases. However, with history expiry this will not be possible if the requested data has been pruned. Serving this historical data is where some innovative solutions are required.

One option is that clients request historical data from peers using a solution such as the Portal Network. The Portal Network is an in-development peer-to-peer network for serving historical data where each node stores a small piece of Ethereum's history such that the entire history exists distributed across the network. Requests are served by seeking out peers storing the relevant dataand requesting it from them. Alternatively, since it is generally apps that require access to historical data, it can become their responsibility to store it. There may also be enough altruistic actors in the Ethereum space that would be willing to maintain historical archives. It could be a DAO that spins up to manage historical data storage, or ideally it will be a combination of all these options. These providers could serve the data in many ways, such as on a torrent, FTP, Filecoin or IPFS.

History expiry is somewhat controversial because so far Ethereum has always implicitly guaranteed the availability of any historical data. A full sync from genesis has always been possible as standard, even if it relies on rebuilding some older data from snapshots. History expiry moves the responsibility for providing this guarantee outside of the Ethereum core protocol. This could introduce new censorship risks if it is centralized organizations that end up stepping in to provide historical data.

EIP-4444 is not yet ready to ship, but it is under active discussion. Interestingly, the challenges with EIP-4444 are not so much technical, but mostly community management. In order for this to ship, there needs to be community buy-in that inludes not only agreement but also commitments to store and serve historical data from trustworthy entities.

**Note that history expiry is NOT state expiry**. It doesn't fundamentally change how Ethereum nodes handle state data, it just changes how historical data is accessed. It is related to state expiry only insofar as it reduces the disk requirements for running a node.

Watch [Alex Stokes explain EIP-4444](https://youtu.be/SfDC_qUZaos)
Read the [EIP-4444 specification](https://eips.ethereum.org/EIPS/eip-4444)

### Weak statelessness {#weak-statelessness}

### Strong statelessness {#strong-statelessness}

Vitalik’s AMA on History Expiry
State expiry – Fix the whole “pay once, have your data stored forever” problem regarding the state
The idea is to automatically expire unused portions of the state and only keeping a verkle tree root that users can use to revive expired state should they need it
Vitalik’s AMA on State Expiry
Relies on:
Base state expiry spec — How we actually do it, see a potential roadmap (and other options)
Address space extension — Increase the size of addresses from 20 bytes to 32 bytes to protect against collisions and add data about the state’s period
Application analysis — Figure out how it might break current applications/contracts and how they can adapt

Weak statelessness, state expiry, strong statelessness
