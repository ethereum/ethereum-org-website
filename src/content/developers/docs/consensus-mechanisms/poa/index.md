---
title: Proof-of-authority (PoA)
description: An explanation of the proof-of-authority consensus protocol and its role in blockchain ecosystem.
lang: en
---

proof-of-authority (PoA) the modified version of proof-of-stake and the most used consensus mechanism in testnet networks, it has several implementations with the most well known implementation clique.

## Prerequisites {#prerequisites}

To better understand this page, we recommend you first read up on [transactions](/developers/docs/transactions/), [blocks](/developers/docs/blocks/), and [consensus mechanisms](/developers/docs/consensus-mechanisms/).

## What is proof-of-authority (PoA)? {#what-is-poa}

Proof-of-Authority is a modified version of [proof-of-stake](/developers/docs/consensus-mechanisms/pos/) that is a reputation-based consensus algorithm instead of stake-based mechanism in POS. The term has been introduced for the first time in 2017 by Gavin Wood, and this consensus algorithm has been mostly used by private chains, testnets and local development networks, as it overcomes the need for high quality resources as POW does, and overcomes the scalability issues with POS by having small subset of nodes storing the blockchian and producing blocks.

The Proof-of-Authority simply requires to trust a subset of authorized signers that are set in the [genesis block](/glossary/#genesis-block), they have the same power in all situations as signers, no signer has exclusive privileges than others in the blockchain as you might think(unless new implementation follow this concept is introduced), the idea behind reputation staking is every authorized signer is well-known to everyone through things like KYC, or by having a well known org shouting they will be the only signer in their blockchain, this way if someone did something wrong, it can be detected who and what their identity is, i.e there will be no attacks on the consensus mechanism by anonymous signers.

The Proof-of-Authority has different implementations, but the ethereum standard implementation is clique that implements [eip-225](https://eips.ethereum.org/EIPS/eip-225), it has the most developer-friendly and easy to implement standard that all clients syncing types are supported, unlike a previously used implementation (Aura) that was implemented in openethereum, which fast,light syncing are not supported because smart contracts are used to store the authorized signers, clique instead only reuse obsoleted headers to solve the issues related to voting to add and remove signers.

## how it works {#how-it-works}

clique standard simply make a use of the obsolete headers: extradata that was used only for fun, miner became obsolete as there are no miners in POA, and nonce became also obsolete because the authorities the order of users transactions, extradata is used to store the authorized signers set, miner and nonce are used to vote for adding or removing signers from the network, where every epoch transition flushes all pending votes. The block proposal is selected sequentially for each block, but in fact any other authorized signer can propose block even if it's not his turn, but they have limit of signing only one block between K blocks when N are the authorized signers.

## PROOF-OF-AUTHORITY AND SECURITY {#poa-security}

### Attack vector: Malicious signer

It may happen that a malicious user gets added to the list of signers, or that a signer key/machine is compromised. In such a scenario the protocol needs to be able to defend itself against reorganizations and spamming. The proposed solution is that given a list of N authorized signers, any signer may only mint 1 block out of every K. This ensures that damage is limited, and the remainder of the miners can vote out the malicious user.

### Attack vector: Censoring signer

Another interesting attack vector is if a signer (or group of signers) attempts to censor out blocks that vote on removing them from the authorization list. To work around this, we restrict the allowed minting frequency of signers to 1 out of N/2. This ensures that malicious signers need to control at least 51% of signing accounts, at which case it’s game over anyway.

### Attack vector: Spamming signer

A final small attack vector is that of malicious signers injecting new vote proposals inside every block they mint. Since nodes need to tally up all votes to create the actual list of authorized signers, they need to track all votes through time. Without placing a limit on the vote window, this could grow slowly, yet unbounded. The solution is to place a ~~moving~~ window of W blocks after which votes are considered stale. ~~A sane window might be 1-2 epochs.~~ We’ll call this an epoch.

### Attack vector: Concurrent blocks

If the number of authorized signers are N, and we allow each signer to mint 1 block out of K, then at any point in time N-K+1 miners are allowed to mint. To avoid these racing for blocks, every signer would add a small random “offset” to the time it releases a new block. This ensures that small forks are rare, but occasionally still happen (as on the main net). If a signer is caught abusing it’s authority and causing chaos, it can be voted out.

## PROS AND CONS {#pros-and-cons}

| Pros                                                                                                                                                      | Cons                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scalable more than other popular mechanisms such POS and POW, as it's based on a limited number of block signers                                          | PoA networks typically have a relatively small number of validating nodes. This makes a PoA network more centralized.                                 |
| PoA blockchains are incredibly cheap to run and maintain                                                                                                  | becoming an authorized signer is typically out of reach for an ordinary person, because the blockchain requires entities with established reputation. |
| The transactions are confirmed very quick as it could reach less than 1 second because only limited number of signers are required to validate new blocks | malicious signers could reorg,double spend,censor transactions in the network, those attacks are mitigated but still possible                         |

## Further Reading {#further-reading}

- [EIP-225](https://eips.ethereum.org/EIPS/eip-225) _Clique standard_
- [proof of authority study](https://github.com/cryptoeconomics-study/website/blob/master/docs/sync/2.4-lecture.md) _Cryptoeconomics_
- [What is Proof of Authority](https://forum.openzeppelin.com/t/proof-of-authority/3577) _OpenZeppelin_
- [Proof of Authority Explained](https://academy.binance.com/en/articles/proof-of-authority-explained) _binance_
- [PoA in blockchain](https://medium.com/techskill-brew/proof-of-authority-or-poa-in-blockchain-part-11-blockchain-series-be15b3321cba)
- [Clique explained](https://medium.com/@Destiner/clique-cross-client-proof-of-authority-algorithm-for-ethereum-8b2a135201d)
- [deprecated PoA, Aura specification](https://openethereum.github.io/Chain-specification)
- [IBFT 2.0, another PoA implementation](https://besu.hyperledger.org/stable/private-networks/concepts/poa)

### Videos {#videos}

- [Visual explanation of Proof of Authority](https://youtu.be/Mj10HSEM5_8)

## Related Topics {#related-topics}

- [Proof-of-work](/developers/docs/consensus-mechanisms/pow/)
- [Proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
