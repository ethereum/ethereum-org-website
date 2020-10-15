---
title: Blocks
description: An overview of blocks in the Ethereum blockchain – their data structure, why they're needed, and how they're made.
lang: en
sidebar: true
---

Blocks are batches of transactions with a hash of the previous block in the chain. This links blocks together (in a chain) because hashes are cryptographically derived from the block data. This prevents fraud, because one change in any block in history would invalidate all the following blocks as all subsequent hashes would change and everyone running the blockchain would notice.

## Prerequisites {#prerequisites}

Blocks are a very beginner-friendly topic. But to help you better understand this page, we recommend you first read [Accounts](/en/developers/docs/accounts/), [Transactions](/en/developers/docs/transactions/), and our [introduction to Ethereum](/en/developers/docs/intro-to-ethereum/).

<!--The content below was provided by Brian Gu with exception of "what's in a block"-->

## Why blocks? {#why-blocks}

To ensure that all participants on the Ethereum network maintain a synchronized state and agree on the precise history of transactions we batch transactions into blocks. This means dozens (or hundreds) of transactions are committed, agreed on, and synchronized on all at once.

By spacing out commits, we give all network participants enough time to come to consensus: even though transaction requests occur dozens of times per second, blocks on Ethereum are committed approximately once every fifteen seconds.

## How blocks work {#how-blocks-work}

To preserve the transaction history, blocks are strictly ordered (every new block created contains a reference to its parent block), and transactions within blocks are strictly ordered as well. Except in rare cases, at any given time, all participants on the network are in agreement on the exact number and history of blocks, and are working to batch the current live transaction requests into the next block.

Once a block is put together (mined) by some miner on the network, it is propagated to the rest of the network; all nodes add this block to the end of their blockchain, and mining continues. The exact block-assembly (mining) process and commitment/consensus process is currently specified by Ethereum’s “Proof-of-Work” protocol.

### A visual demo {#a-visual-demo}

<iframe width="100%" height="315" src="https://www.youtube.com/embed/_160oMzblY8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Proof of work protocol {#proof-of-work-protocol}

Proof of work means the following:

- Mining nodes have to spend a variable but substantial amount of energy, time, and computational power to produce a “certificate of legitimacy” for a block they propose to the network. This helps protect the network from spam/denial-of-service attacks, among other things\*, since certificates are expensive to produce.
- Other miners who hear about a new block with a valid certificate of legitimacy must\* accept the new block as the canonical next block on the blockchain.
- The exact amount of time needed for any given miner to produce this certificate is a random variable with high variance. This ensures that it is unlikely* that two miners produce validations for a proposed next block simultaneously; when a miner produces and propagates a certified new block, they can be almost certain that the block will be accepted by the network as the canonical next block on the blockchain, without conflict* (though there is a protocol for dealing with conflicts as well in the case that two chains of certified blocks are produced almost simultaneously).

[More on mining](/en/developers/docs/mining/)

## What's in a block? {#block-anatomy}

- Timestamp – the time when the block was mined.
- Block number – the length of the blockchain in blocks.
- Difficulty – the effort required to mine the block.
- A hash – a unique identifier for that block.
- A parent hash – the unique identifier for the block that came before (this is how blocks are linked in a chain).
- Transactions list – the transactions included in the block.
- State root – the entire state of the system: account balances, contract storage, contract code and account nonces are inside.

## Block size {#block-size}

A final important note is that blocks themselves are bounded in size. Each block has a block gas limit which is set by the network and the miners collectively: the total amount of gas expended by all transactions in the block must be less than the block gas limit. This is important because it ensures that blocks can’t be arbitrarily large. If blocks could be arbitrarily large, then less performant full nodes would gradually stop being able to keep up with the network due to space and speed requirements. The block gas limit at block 0 was initialized to 5,000; any miner who mines a new block can alter the gas limit by up to about 0.1% in either direction from the parent block gas limit. The gas limit as of November 2018 currently hovers around 8,000,000.

## Further reading {#further-reading}

_Know of a community resource that helped you? Edit this page and add it!_

## Related topics {#related-topics}

- [Mining](/en/developers/docs/mining/)
- [Transactions](/en/developers/docs/transactions/)
- [Gas](/en/developers/docs/gas/)
