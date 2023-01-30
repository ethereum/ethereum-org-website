---
title: Faster, cheaper transactions
description: High level overview of how Ethereumwill scale in the future
---

Fully scaling Ethereum will require a combination of rollups and adding blobs of data to blocks. Rollups batch together transactions to submit to Ethereum, increasing throughput and reducing costs. This does not require any change to Ethereum itself, since all the batching and preprocessing is done off-chain by rollup sequencers at "layer 2". Adding data blobs changes Ethereum itself by enabling it to act as a data layer for rollups.

```
Today’s rollups are **3-8x cheaper** than Ethereum layer 1. ZK-rollups will soon lower fees by **40-100x**.

Upcoming changes to Ethereum will provide another **100-1000x** of scaling.

Users will benefit from transactions costing < $0.001
```

Rollups are already scaling Ethereum. A rich ecosystem of rollup projects is enabling users to transact quickly and cheaply, with a range of security guarantees. However, they are not currently fully decentralized - they run with a set of "training wheels" that must eventually be removed. The way data is handled on Ethereum is not very rollup-friendly - it is too expensive for rollups to post large volumes of data to Ethereum. Read on to discover how these issues will be resolved to allow rollups to scale Ethereum.

## Decentralizing rollups

The current rollups have bootstrapped their development by relying on centralized sequencers - computers that do all the transaction processing and aggregation before submitting them to Ethereum. This is vulnerable to censorship, since the sequencers are owned by known entities that can be sanctioned, bribed or otherwise compromised. At the same time, [rollups vary](https://l2beat.com) in the way they validate state roots. Some rollups use zero-knowledge validity proofs or fraud proofs to validate the rollup state, other are not there yet. However, in most cases even those rollups that do use validity/fraud proofs use a small pool of known provers. Decentralizing both the sequencers and the provers is an important step in fully implementing a trustless scaling layer for Ethereum. Therefore, the next important step in the scaling roadmap is to remove these centralized points of failure and distribute responsibility for running sequencers and provers across more people.

Read more on [rollups](src/content/developers/docs/scaling)

## Managing huge rollup data

Rollups collect together large numbers of transactions, execute them and post the results to Ethereum. This generates a lot of data that needs to be available so that someone other than the rollup operator can execute the transactions and verify the correctness or raise a challenge. Currently, this data is stored on Ethereum permanently, which is expensive. Over 90% of the transaction costs paid by users on rollups is due to this data storage. However, this data can be moved into a new type of storage, known as blobs, that are sent along with blocks. They are deleted after some amount of time (1-3 months) once it is no longer useful. Adding these blob transactions to Ethereum is part of an upgrade known as “Proto-Danksharding” or EIP-4844, and it is expected to be shipped relatively soon - perhaps in late 2023.
After blob transactions have been added, it will be possible to add many blobs to Ethereum blocks. This will be another substantial scale-up to Ethereum’s throughput and scale-down in transaction costs. This second stage of expanding blob data is complicated because it requires new methods for checking rollup data is available on the network, and relies on validators separating their block building and block proposal responsibilities. It also requires a way to cryptographically prove that validators have verified small subsets of the blob data.

This second step is known as “Danksharding”. It is likely several years away from being fully implemented, and it relies on other developments such as new network designs that enable efficiently confirm that data is available by randomly sampling a few kilobytes at a time, known as **data availability sampling (DAS)**.

Read more on [Danksharding](/roadmap/danksharding/)
