---
title: Scaling Ethereum
description: High level overview of how Ethereum will scale in the future via faster, cheaper transactions.
lang: en
image: ../../../assets/eth.png
alt: "Ethereum roadmap"
template: roadmap
---

Ethereum is scaled using rollups. Rollups batch transactions together offchain and send the result to Ethereum. Today, users have to rely on centralized operators to manage rollups honestly. At the same time, the data rollups post to Ethereum is too expensive, imposing a limit on the cost savings that rollups can create for users. To solve these problems, cheap data blobs will be added to Ethereum blocks specifically for rollups, and rollup infrastructure will be decentralized across a wider community of operators. This will allow Ethereum to fully scale without sacrificing decentralization.

<InfoBanner>
  <h4 style="margin-top: 0">Transaction costs</h4>

  <ul style="margin-bottom: 0">
    <li>Today’s rollups are <strong>3-8x</strong> cheaper than Ethereum layer 1</li>
    <li>ZK-rollups will soon lower fees by <strong>40-100x</strong></li>
    <li>Upcoming changes to Ethereum will provide another <strong>100-1000x</strong> of scaling</li>
    <li style="margin-bottom: 0">Users will benefit from transactions <strong>costing less than $0.001</strong></li>
  </ul>
</InfoBanner>

Rollups are already scaling Ethereum. A rich ecosystem of rollup projects is enabling users to transact quickly and cheaply, with a range of security guarantees. However, they are not currently fully decentralized - they run with a set of "training wheels" that must eventually be removed. The way data is handled on Ethereum is not very rollup-friendly - it is too expensive for rollups to post large volumes of data to Ethereum. Read on to discover how these issues will be resolved to allow rollups to scale Ethereum.

## Decentralizing rollups {#decentralizing-rollups}

Rollups have been bootstrapped using centralized sequencers (computers that do all the transaction processing and aggregation before submitting them to Ethereum). This is vulnerable to censorship, because the sequencer operators can be sanctioned, bribed or otherwise compromised. At the same time, [rollups vary](https://l2beat.com) in the way they validate incoming data. The best way is for "provers" to submit fraud proofs or validity proofs, but not all rollups are there yet. Even those rollups that do use validity/fraud proofs use a small pool of known provers. Therefore, the next critical step in scaling Ethereum is to distribute responsibility for running sequencers and provers across more people.

<ButtonLink variant="outline-color" to="/developers/docs/scaling"> Read about rollups</ButtonLink>

## Managing huge rollup data {#managing-rollup-data}

Rollups collect large numbers of transactions, execute them and post the results to Ethereum. This generates a lot of data that needs to be available so that someone other than the rollup operator can execute the transactions and verify the correctness or raise a challenge. Currently, this data is stored on Ethereum permanently, which is expensive. Over 90% of the transaction costs paid by users on rollups is due to this data storage. However, this data can be moved into a new type of storage, known as blob storage, that is sent along with blocks. Blobs are cheaper because they are not permanent; they are deleted once they are no longer useful (1-3 months). Adding these blob transactions to Ethereum is part of an upgrade known as “Proto-Danksharding”, and it is expected to be shipped relatively soon - perhaps in late 2023.

After blob transactions have become part of the Ethereum protocol, it will be possible to add many blobs to Ethereum blocks. This will be another substantial scale-up to Ethereum’s throughput and scale-down in transaction costs. This second stage of expanding blob data is complicated because it requires new methods for checking rollup data is available on the network, and relies on validators separating their block building and block proposal responsibilities. It also requires a way to cryptographically prove that validators have verified small subsets of the blob data.

This second step is known as “Danksharding”. It is likely several years away from being fully implemented, and it relies on other developments such as new network designs that enable efficiently confirm that data is available by randomly sampling a few kilobytes at a time, known as **data availability sampling (DAS)**.

**Further reading**

- [Read about Danksharding](/roadmap/danksharding/)
- [Read about proposer-builder separation](/roadmap/pbs)
- [Read about data availability sampling](/developers/docs/data-availability)
