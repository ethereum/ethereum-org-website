---
title: Scaling Ethereum
description: Ethereum is scaled using rollups. Rollups batch transactions together offchain and send the result to Ethereum.
lang: en
image: ../../../assets/eth.png
alt: "Ethereum roadmap"
template: roadmap
---

Ethereum is scaling through [rollups](/layer-2/#rollups), which batch transactions together and send the output to Ethereum. Even though rollups are up to eight times less expensive than Ethereum Mainnet, it's possible to optimize rollups further to reduce costs for end users. Rollups also rely on some centralized components that developers can remove as the rollups mature.

<InfoBanner mb={8} title="Transaction costs">
  <ul style="margin-bottom: 0">
    <li>Today’s rollups are <strong>3-8x</strong> cheaper than Ethereum layer 1</li>
    <li>ZK-rollups will soon lower fees by <strong>40-100x</strong></li>
    <li>Upcoming changes to Ethereum will provide another <strong>100-1000x</strong> of scaling</li>
    <li style="margin-bottom: 0">Users will benefit from transactions <strong>costing less than $0.001</strong></li>
  </ul>
</InfoBanner>

## Managing huge rollup data {#managing-rollup-data}

Rollups collect large numbers of transactions, execute them and post the results to Ethereum. This generates a lot of data that needs to be available so that someone other than the rollup operator can execute the transactions and verify the correctness or raise a challenge.

### Proto-danksharding {#proto-danksharding}

Rollup data is stored on Ethereum permanently, which is expensive. Over 90% of the transaction cost users pay on rollups is due to this data storage. To reduce transaction costs, we can move the data into a new temporary 'blob' storage. Blobs are cheaper because they are not permanent; they get deleted once they are no longer needed. Adding blob transactions to Ethereum is part of an upgrade known as "Proto-Danksharding". It is expected to be shipped relatively soon—perhaps in late 2023.

After blob transactions have become part of the Ethereum protocol, it will be possible to add many blobs to Ethereum blocks. This will be another substantial scale-up to Ethereum’s throughput and scale-down in transaction costs.

### Danksharding {#danksharding}

The second stage of expanding blob data is complicated because it requires new methods for checking rollup data is available on the network and relies on validators separating their block building and block proposal responsibilities. It also requires a way to cryptographically prove that validators have verified small subsets of the blob data.

This second step is known as [“Danksharding”](/roadmap/danksharding/). It is likely several years away from being fully implemented. Danksharding relies on other developments such as [separating block building and block proposal](/roadmap/pbs) and new network designs that enable the network to efficiently confirm that data is available by randomly sampling a few kilobytes at a time, known as [data availability sampling (DAS)](/developers/docs/data-availability).

<ButtonLink variant="outline-color" to="/roadmap/danksharding/">More on Danksharding</ButtonLink>

## Decentralizing rollups {#decentralizing-rollups}

Rollups are already scaling Ethereum. A rich ecosystem of rollup projects is enabling users to transact quickly and cheaply, with a range of security guarantees. However, rollups have been bootstrapped using centralized sequencers (computers that do all the transaction processing and aggregation before submitting them to Ethereum). This is vulnerable to censorship, because the sequencer operators can be sanctioned, bribed or otherwise compromised. At the same time, [rollups vary](https://l2beat.com) in the way they validate incoming data. The best way is for "provers" to submit fraud proofs or validity proofs, but not all rollups are there yet. Even those rollups that do use validity/fraud proofs use a small pool of known provers. Therefore, the next critical step in scaling Ethereum is to distribute responsibility for running sequencers and provers across more people.

<ButtonLink variant="outline-color" to="/developers/docs/scaling/">More on rollups</ButtonLink>

## Current progress {#current-progress}

Proto-Danksharding is likely to be one of the earlier roadmap items to be implemented. The KZG ceremony required to set it up is already underway and several clients have implemented prototypes for handling blob data. Full Danksharding is likely several years away, as it relies upon several other roadmap items being completed first. Decentralizing rollup infrastructure is likely to be a gradual process - there are many different rollups that are building slightly different systems and will fully decentralize at different rates.
