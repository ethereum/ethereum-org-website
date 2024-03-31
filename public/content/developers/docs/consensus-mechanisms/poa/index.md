---
title: Proof-of-authority (PoA)
description: An explanation of the proof-of-authority consensus protocol and its role in blockchain ecosystem.
lang: en
---

Proof-of-Authority is a reputation-based consensus algorithm that is a modified version of [proof-of-stake](/developers/docs/consensus-mechanisms/pos/). It is mostly used by private chains, testnets, and local development networks. PoA is a reputation-based consensus algorithm that requires trusting a set of authorized signers to produce blocks, instead of a stake-based mechanism in PoS.

## Prerequisites {#prerequisites}

To better understand this page, we recommend you first read up on [transactions](/developers/docs/transactions/), [blocks](/developers/docs/blocks/), and [consensus mechanisms](/developers/docs/consensus-mechanisms/).

## What is proof-of-authority (PoA)? {#what-is-poa}

Proof-of-Authority is a modified version of [proof-of-stake](/developers/docs/consensus-mechanisms/pos/) that is a reputation-based consensus algorithm instead of stake-based mechanism in POS. The term has been introduced for the first time in 2017 by Gavin Wood, and this consensus algorithm has been mostly used by private chains, testnets and local development networks, as it overcomes the need for high quality resources as POW does, and overcomes the scalability issues with POS by having small subset of nodes storing the blockchian and producing blocks.

Proof-of-authority requires trusting a set of authorized signers that are set in the [genesis block](/glossary/#genesis-block). In most current implementations, all authorized signers retain equal power and privileges when determining consensus of the chain. The idea behind reputation staking is every authorized validator is well-known to everyone through things like know-your customer (KYC), or by having a well-known organization being the only validator. This way if a validator does anything wrong, their identity is known.

Proof-of-authority has different implementations, but the standard Ethereum implementation is **clique**, which implements [EIP-225](https://eips.ethereum.org/EIPS/eip-225). Clique is developer-friendly and an easy-to-implement standard, supporting all client syncing types. Other implementations include [IBFT 2.0](https://besu.hyperledger.org/stable/private-networks/concepts/poa) and [Aura](https://openethereum.github.io/Chain-specification).

## How it works {#how-it-works}

In PoA, a set of authorized signers are selected to create new blocks. The signers are selected based on their reputation, and they are the only ones allowed to create new blocks. The signers are selected in a round-robin fashion, and each signer is allowed to create a block in a specific time frame. The block creation time is fixed, and the signers are required to create a block within that time frame.

The voting process is done by the signers themselves. Each signer votes for the addition or removal of a signer in their block when they create a new block. The votes are tallied up by the nodes, and the signers are added or removed based on the votes reaching a certain threshold `SIGNER_LIMIT`.

There may be a situation where small forks occur, the difficulty of a block depends on whether the block was signed in turn or out of turn. “In turn” blocks have difficulty 2, and “out of turn” blocks have difficulty 1. In the case of small forks, the chain with most of the signers sealing blocks “in turn” will accumulate the most difficulty and win.

## Attack vectors {#attack-vectors}

### Malicious signers {#malicious-signers}

It may happen that a malicious user gets added to the list of signers, or that a signing key/machine is compromised. In such a scenario the protocol needs to be able to defend itself against reorganizations and spamming. The proposed solution is that given a list of N authorized signers, any signer may only mint 1 block out of every K. This ensures that damage is limited, and the remainder of the miners can vote out the malicious user.

### Censoring signers {#censoring-signers}

Another interesting attack vector is if a signer (or group of signers) attempts to censor blocks that vote on removing them from the authorization list. To work around this, the allowed minting frequency of signers is restricted to 1 out of N/2. This ensures that malicious signers need to control at least 51% of signing accounts, at which point they would effectively become the new source-of-truth for the chain.

### Spamming signers {#spamming-signers}

Another small attack vector is malicious signers injecting new vote proposals inside every block they mint. Since nodes need to tally up all votes to create the actual list of authorized signers, they need to track all votes through time. Without placing a limit on the vote window, this could grow slowly, yet unbounded. The solution is to place a _moving_ window of W blocks after which votes are considered stale. _A reasonable window might be 1-2 epochs._

### Concurrent blocks {#concurrent-blocks}

In a Proof-of-Authority (PoA) network, if for example there are 10 authorized signers and each signer is allowed to create 1 block out of 20, then at any given time, 11 miners can create blocks. To prevent them from racing to create blocks, each signer adds a small random "offset" to the time they release a new block. This reduces the occurrence of small forks but still allows occasional forks, as seen on the Ethereum Mainnet. If a signer misuses their authority and causes disruptions, they can be voted out of the network.

## Pros and cons {#pros-and-cons}

| Pros                                                                                                                                                      | Cons                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scalable more than other popular mechanisms such POS and POW, as it's based on a limited number of block signers                                          | PoA networks typically have a relatively small number of validating nodes. This makes a PoA network more centralized.                                 |
| PoA blockchains are incredibly cheap to run and maintain                                                                                                  | becoming an authorized signer is typically out of reach for an ordinary person, because the blockchain requires entities with established reputation. |
| The transactions are confirmed very quick as it could reach less than 1 second because only limited number of signers are required to validate new blocks | malicious signers could reorg,double spend,censor transactions in the network, those attacks are mitigated but still possible                         |

## Further Reading {#further-reading}

- [EIP-225](https://eips.ethereum.org/EIPS/eip-225) _Clique standard_
- [Proof of authority study](https://github.com/cryptoeconomics-study/website/blob/master/docs/sync/2.4-lecture.md) _Cryptoeconomics_
- [What is Proof of Authority](https://forum.openzeppelin.com/t/proof-of-authority/3577) _OpenZeppelin_
- [Proof of Authority Explained](https://academy.binance.com/en/articles/proof-of-authority-explained) _binance_
- [PoA in blockchain](https://medium.com/techskill-brew/proof-of-authority-or-poa-in-blockchain-part-11-blockchain-series-be15b3321cba)
- [Clique explained](https://medium.com/@Destiner/clique-cross-client-proof-of-authority-algorithm-for-ethereum-8b2a135201d)
- [Deprecated PoA, Aura specification](https://openethereum.github.io/Chain-specification)
- [IBFT 2.0, another PoA implementation](https://besu.hyperledger.org/stable/private-networks/concepts/poa)

### More of a visual learner? {#visual-learner}

Watch a visual explanation of proof-of-authority:

<YouTube id="Mj10HSEM5_8" />

## Related Topics {#related-topics}

- [Proof-of-work](/developers/docs/consensus-mechanisms/pow/)
- [Proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
