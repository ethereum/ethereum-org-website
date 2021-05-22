---
title: Proof-of-work (PoW)
description: An explanation of the proof-of-work consensus protocol and its role in Ethereum.
lang: en
sidebar: true
incomplete: true
---

Ethereum, like Bitcoin, currently uses a consensus protocol called [Proof-of-work (PoW)](https://en.wikipedia.org/wiki/Proof_of_work). This allows the nodes of the Ethereum network to agree on the state of all information recorded on the Ethereum blockchain, and prevents certain kinds of economic attacks.

Over the next few years, proof-of-work will be phased out in favour of [proof of stake](/developers/docs/consensus-mechanisms/pos). This will also phase out mining from Ethereum. For more details on timing, check the progress of the [Eth2 merge upgrade](/eth2/merge/).

## Prerequisites {#prerequisites}

To better understand this page, we recommend you first read up on [transactions](/developers/docs/transactions/) and [blocks](/developers/docs/blocks/).

## What is proof-of-Work (PoW)? {#what-is-pow}

Proof of Work (PoW) is the mechanism that allows the decentralized Ethereum network to come to consensus, or agree on things like account balances and the order of transactions. This prevents users "double spending" their coins and ensures that the Ethereum chain is incredibly difficult to attack or overwrite.

## Proof-of-work and mining {#pow-and-mining}

Proof-of-work is the underlying algorithm that sets the difficulty and rules for the work miners do. Mining is the "work" itself. It's the act of adding valid blocks to the chain. This is important because the chain's length helps the network spot the valid Ethereum chain and understand Ethereum's current state. The more "work" done, the longer the chain, and the higher the block number, the more certain the network can be of the current state of things.

[More on mining](/developers/docs/consensus-mechanisms/pow/mining/)

## How does Ethereum's proof-of-work work? {#how-it-works}

Ethereum transactions are processed into blocks. Each block has a:

- block difficulty – for example: 3,324,092,183,262,715
- mixHash – for example: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonce – for example: `0xd3ee432b4fb3d26b`

This block data is directly related to PoW.

### The work in proof of work {#the-work}

The proof-of-work protocol, known as Ethash, requires miners to go through an intense race of trial and error to find the nonce for a block. Only blocks with a valid nonce can be added to the chain.

When racing to create a block, a miner will repeatedly put a dataset, that you can only get from downloading and running the full chain (as a miner does), through a mathematical function. This is to generate a mixHash that is below a target nonce, as dictated by the block difficulty. The best way to do this is through trial and error.

The difficulty determines the target for the hash. The lower the target, the smaller the set of valid hashes. Once generated, this is incredibly easy for other miners and clients to verify. Even if one transaction was to change, the hash would be completely different, signalling fraud.

Hashing makes fraud easy to spot. But PoW as a process is also a big deterrent to attacking the chain.

### Proof-of-work and security {#security}

Miners are incentivised to do this work on the main Ethereum chain. There is little incentive for a subset of miners to start their own chain – it undermines the system. Blockchains rely on having a single state as a source of truth. And users will always choose the longest or "heaviest" chain.

The objective of PoW is to extend the chain. The longest chain is most believable as the valid one because it's had the most computational work done on it. Within Ethereum's PoW system it's nearly impossible to create new blocks that erase transactions or create fake ones, or maintain a second chain. That's because a malicious miner would need to always be solving the block nonce faster than everyone else.

To consistently create malicious, yet valid, blocks, you'd need over 51% of the network mining power to beat everyone else. You'd need a lot of computing power to be able to do this amount of "work". And the energy spend might even outweigh the gains you'd make in an attack.

### Proof-of-work economics {#economics}

PoW is also responsible for issuing new currency into the system and incentivising miners to do the work.

Miners who successfully create a block are rewarded in 2 freshly minted ETH and all the transaction fees within the block. A miner may also get 1.75ETH for an uncle block. This is a valid block, created simultaneously to the successful block, by another miner. This usually happens due to network latency.

## Finality {#finality}

In distributed networks, a transaction has "finality" when it's part of a block that can't change.

Because miners work in a decentralized way, it's possible for two valid blocks to be mined at the same time. This creates a temporary fork. Eventually one chain will become the accepted chain once a subsequent block has been mined and added, making it longer.

But to complicate things further, transactions that were rejected on the temporary fork may have been included in the accepted chain. This means it could get reversed. So finality refers to the time you should wait before considering a transaction irreversible. For Ethereum the recommended time is 6 blocks or just over 1 minute. Following that you can say with relative confidence that the transaction has been a success. Of course, you can wait longer for even greater assurances.

This is something to bear in mind when designing dapps, as it would be a poor user experience to misrepresent transaction information to your users. Especially if the transaction is high value.

Remember, this timing doesn't include the wait times for having a transaction picked up by a miner.

## Pros and cons {#pros-and-cons}

| Pros                                                                                                                                                                                                               | Cons                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| PoW is neutral. You don't need ETH to get started and block rewards allow you to go from 0ETH to a positive balance. With [proof of stake](/developers/docs/consensus-mechanisms/pos/) you need ETH to start with. | PoW uses up so much energy that it's bad for the environment.                                                                                |
| PoW is a tried and tested consensus mechanism that has kept Bitcoin and Ethereum secure and decentralized for many years.                                                                                          | If you want to mine, you need such specialized equipment that it's a big investment to start.                                                 |
| Compared to proof-of-stake it's relatively easy to implement.                                                                                                                                                      | Due to increasing computation needed, mining pools could potentially dominate the mining game, leading to centralization and security risks. |

## Compared to proof of stake {#compared-to-pos}

At a high level, proof-of-stake has the same end goal as proof-of-work: to help the decentralized network reach consensus, securely. But it has some differences in process and personnel:

- PoS switches out the importance of computational power for staked ETH.
- PoS replaces miners with validators. Validators stake their ETH to activate the ability to create new blocks.
- Validators don't compete to create blocks, instead they are chosen at random by an algorithm.
- Finality is clearer: at certain checkpoints, if 2/3 validators agree on the state of the block it is considered final. Validators must bet their entire stake on this, so if they try to collude down the line, they'll lose their entire stake.

[More on proof of stake](/developers/docs/consensus-mechanisms/pos/)

## Further Reading {#further-reading}

- [Majority attack](https://en.bitcoin.it/wiki/Majority_attack)
- [On settlement finality](https://blog.ethereum.org/2016/05/09/on-settlement-finality/)

## Related Topics {#related-topics}

- [Mining](/developers/docs/consensus-mechanisms/pow/mining/)
- [Proof of stake](/developers/docs/consensus-mechanisms/pos/)
