---
title: Mining
description: An explanation of how mining works in Ethereum and how it helps keep Ethereum secure and decentralized.
lang: en
sidebar: true
incomplete: true
---

## Prerequisites {#prerequisites}

To better understand this page, we recommend you first read up on [transactions](/developers/docs/transactions/), [blocks](/developers/docs/blocks/) and [Proof of Work](/developers/docs/consensus-mechanisms/pow/).

## What is Ethereum mining? {#what-is-ethereum-mining}

Mining is the process of creating a block of transactions to be added to the Ethereum blockchain.

Ethereum, like Bitcoin, currently uses a [proof-of-work (PoW)](/developers/docs/consensus-mechanisms/pow/) consensus mechanism. Mining is the lifeblood of proof-of-work. Ethereum miners - computers running software - using their time and computation power to process transactions and produce blocks.

<InfoBanner emoji=":wave:">
   Proof-of-stake will replace mining and proof-of-work over the next few years. You can start staking your ETH today. <a href="/eth2/staking/">More on staking</a>    
</InfoBanner>

## Why do miners exist? {#why-do-miners-exist}

In decentralized systems like Ethereum, we need to ensure that everyone agrees on the order of transactions. Miners help this happen by solving computationally difficult puzzles in order to produce blocks, which serves as a way to secure the network from attacks.

[More on proof of work](/developers/docs/consensus-mechanisms/pow/)

## How Ethereum transactions are mined {#how-ethereum-transactions-are-mined}

1. A user writes and signs a [transaction](/developers/docs/transactions/) request with the private key of some [account](/developers/docs/accounts/).
2. The user broadcasts the transaction request to the entire Ethereum network from some [node](/developers/docs/nodes-and-clients/).
3. Upon hearing about the new transaction request, each node in the Ethereum network adds the request to their local mempool, a list of all transaction requests they’ve heard about that have not yet been committed to the blockchain in a block.
4. At some point, a mining node aggregates several dozen or hundred transaction requests into a potential [block](/developers/docs/blocks/), in a way that maximizes the [transaction fees](/developers/docs/gas/) they earn while still staying under the block gas limit. The mining node then:
   1. Verifies the validity of each transaction request (i.e. no one is trying to transfer ether out of an account they haven’t produced a signature for, the request is not malformed, etc.), and then executes the code of the request, altering the state of their local copy of the EVM. The miner awards the transaction fee for each such transaction request to their own account.
   2. Begins the process of producing the Proof-of-Work “certificate of legitimacy” for the potential block, once all transaction requests in the block have been verified and executed on the local EVM copy.
5. Eventually, a miner will finish producing a certificate for a block which includes our specific transaction request. The miner then broadcasts the completed block, which includes the certificate and a checksum of the claimed new EVM state.
6. Other nodes hear about the new block. They verify the certificate, execute all transactions on the block themselves (including the transaction originally broadcasted by our user), and verify that the checksum of their new EVM state after the execution of all transactions matches the checksum of the state claimed by the miner’s block. Only then do these nodes append this block to the tail of their blockchain, and accept the new EVM state as the canonical state.
7. Each node removes all transactions in the new block from their local mempool of unfulfilled transaction requests.
8. New nodes joining the network download all blocks in sequence, including the block containing our transaction of interest. They initialize a local EVM copy (which starts as a blank-state EVM), and then go through the process of executing every transaction in every block on top of their local EVM copy, verifying state checksums at each block along the way.

Every transaction is mined (included in a new block and propagated for the first time) once, but executed and verified by every participant in the process of advancing the canonical EVM state. This highlights one of the central mantras of blockchain: **Don’t trust, verify**.

## A visual demo {#a-visual-demo}

Watch Austin walk you through mining and the proof-of-work blockchain.

<iframe width="100%" height="315" src="https://www.youtube.com/embed/zcX7OJ-L8XQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Further Reading {#further-reading}

- [What does it mean to mine Ethereum?](https://docs.ethhub.io/using-ethereum/mining/) _EthHub_
- [How Ethereum Mining Works](https://www.coindesk.com/information/ethereum-mining-works) _Coindesk_

## Related Tools {#related-tools}

- [Top Ethereum miners](https://etherscan.io/stat/miner?range=7&blocktype=blocks)
- [Ethereum mining calculator](https://minerstat.com/coin/ETH)

## Related Topics {#related-topics}

- [Gas](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Proof of work](/developers/docs/consensus-mechanisms/pow/)
