---
title: A more secure Ethereum
description: High level overview of how Ethereum's security will be upgraded in the future
---

The upgrade from proof-of-work to proof-of-stake was a big step for Ethereum security. Compared to proof-of-work Ethereum, it now costs a lot more to attack the chain and there are more defenses that can be invoked by the honest community. However, the upgrade is not completely finished. There are still several improvements to make to the protocol to make it even more secure and more performant.

## Withdrawals

The upgrade from proof-of-work to proof-of-stake began with Ethereum pioneers “staking” their ETH in a deposit contract. That ETH is used to protect the network. However, that ETH cannot yet be unlocked and returned to the users. Allowing ETH to be withdrawn is a critical part of the proof-of-stake upgrade. In addition to withdrawals being a critical component of a fully-functional proof-of-stake protocol, allowing withdrawals is also good for Ethereum security as it challenges the business model for liquid staking derivatives (LSDs) that can be a centralizing force on Ethereum.

Read more on [withdrawals](comingsoon)

## Defending against attacks

Even after withdrawals there are improvements that can be made to Ethereum's proof-of-stake protocol. One is known as [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) - a more secure fork-choice algorithm that makes certain sophisticated types of attack more difficult.

Also on the roadmap is accelerating how quickly blocks are finalized. Today, it takes about 15 minutes to finalize a block. This is the result of a trade-off that optimizes for decentralization - a sufficient number of attestations has to be collected in order to finalize a block and smaller times increase the rate at which each node has to process them, leading to greater hardware requirements. Allowing 15 minutes for finalization enables nodes to run comfortably on normal home computers. However, a 15 minute finalization time does not provide the best user experience and creates a window for sophisticated short-range reorg attacks. This problem can be solved using Single Slot Finality (SSF). The way attestations are organized now, the complete validator set attests once per epoch, not once per slot. Within each slot, validators that are due to attest are divided into committees whose signatures are aggregated into a single attestation. SSF can be delivered by doing more signature aggregation so that many more validators can attest in each slot, either by adding more validators to each committee or by adding additional aggregation layers. This will allow exchanges, dapps and users to see their transactions finalized in 6 seconds instead of 15 minutes and close the attack window.

Read more on [proof-of-stake](/developers/docs/consensus-mechanisms/pos) and [SSF](comingsoon)

## Defending against censorship

Another facet of security is promoting decentralization by preventing individuals or cartels from becoming too influential in securing the network. This includes building middleware that shares validator responsibilities across multiple nodes, giving more fault tolerance and preventing specific machines being single points of failure. Furthermore, staking pools can use distributed validator technology to split validator keys across multiple systems, rather than having single operators running multiple validators. This [promotes decentralization](https://medium.com/coinmonks/eth2-secret-shared-validators-85824df8cbc0) and makes it harder for dishonest pool operators to coordinate attacks. The overall idea is to derive security benefits by running validators as _communities_ rather than as individuals.

Censorship resistance is a critical issue for Ethereum. Implementing proposer-builder separation (PBS) is a roadmap item that will drastically improve Ethereum's in-protocol defenses against censorship. The idea is to isolate block production from block proposal, so that one validator creates a block and another broadcasts it out across the Ethereum network. This makes it much more difficult for block proposers to control which transactions are included in a block and the order they are executed. Block builders continually build blocks but cannot broadcast them. Instead, they try to maximize their block's profitability so that the block proposer selects their block to broadcast (a portion of the profit is paid as a proposer fee). In this system, the proposer would be blind to the actual transactions included and only selecting blocks based on their economic value, so they are far less able and economically disincentivized from censoring transations. PBS also provides protection against Denial of Service (DOS) attacks. This can be paired with _inclusion lists_ which are also on the roadmap. These are lists of transactions that the block proposer has in their view of the transaction mempool that they insist must be included in any block they accept from a block builder. This prevents block builders from omitting certain transactions from their blocks.

It is also possible to encrypt the transaction mempool so that neither block builders nor proposers know which specific transactions they are including in a block until it is already published, making censorship of certain transactions infeasible.

Read more on [PBS](comingsoon)

## Protecting validators

Denial of service resilience will also be improved to make Ethereum more secure. Although it is unlikely, it is possible that a sophisticated attacker could identify upcoming validators and spam them to prevent them from proposing blocks. Implementing Secret Leader Election (SLE) will protect against this type of attack by preventing block propoers from being knowable in advance. This works by continually shuffling a set of cryptographic commitments representing candidate block proposers and using their order to determine which validator is selected in such a way that only the validators themselves know their ordering in advance.
