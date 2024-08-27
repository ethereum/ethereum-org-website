---
title: Scaling Ethereum
description: Rollups batch transactions together off-chain, reducing costs for the user. However, the way rollups currently use data is too expensive, limiting how cheap transactions can be. Proto-Danksharding fixes this.
lang: en
image: /images/roadmap/roadmap-transactions.png
alt: "Ethereum roadmap"
template: roadmap
---

Ethereum is scaled using [layer 2s](/layer-2/#rollups) (also known as rollups), which batch transactions together and send the output to Ethereum. Even though rollups are up to eight times less expensive than Ethereum Mainnet, it's possible to optimize rollups further to reduce costs for end users. Rollups also rely on some centralized components that developers can remove as the rollups mature.

<InfoBanner mb={8} title="Transaction costs">
  <ul style={{ marginBottom: 0 }}>
    <li>Today’s rollups are <strong>~5-20x</strong> cheaper than Ethereum layer 1</li>
    <li>ZK-rollups will soon lower fees by <strong>~40-100x</strong></li>
    <li>Upcoming changes to Ethereum will provide another <strong>~100-1000x</strong> of scaling</li>
    <li style={{ marginBottom: 0 }}>Users should benefit from transactions <strong>costing less than $0.001</strong></li>
  </ul>
</InfoBanner>

## Making data cheaper {#making-data-cheaper}

Rollups collect large numbers of transactions, execute them and submit the results to Ethereum. This generates a lot of data that needs to be openly available so that anyone can execute the transactions for themselves and verify that the rollup operator was honest. If someone finds a discrepancy, they can raise a challenge.

### Proto-Danksharding {#proto-danksharding}

Rollup data has historically been stored on Ethereum permanently, which is expensive. Over 90% of the transaction cost users pay on rollups is due to this data storage. To reduce transaction costs, we can move the data into a new temporary 'blob' storage. Blobs are cheaper because they are not permanent; they get deleted from Ethereum once they are no longer needed. Storing rollup data long-term becomes the responsibility of the people that need it, such as rollup operators, exchanges, indexing services etc. Adding blob transactions to Ethereum is part of an upgrade known as "Proto-Danksharding".

With Proto-Danksharding, it is possible to add many blobs to Ethereum blocks. This enables another substantial (>100x) scale-up to Ethereum’s throughput and scale-down to transaction costs.

### Danksharding {#danksharding}

The second stage of expanding blob data is complicated because it requires new methods for checking rollup data is available on the network and relies on [validators](/glossary/#validator) separating their [block](/glossary/#block) building and block proposal responsibilities. It also requires a way to cryptographically prove that validators have verified small subsets of the blob data.

This second step is known as [“Danksharding”](/roadmap/danksharding/). **It is likely several years away** from being fully implemented. Danksharding relies on other developments such as [separating block building and block proposal](/roadmap/pbs) and new network designs that enable the network to efficiently confirm that data is available by randomly sampling a few kilobytes at a time, known as [data availability sampling (DAS)](/developers/docs/data-availability).

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">More on Danksharding</ButtonLink>

## Decentralizing rollups {#decentralizing-rollups}

[Rollups](/layer-2) are already scaling Ethereum. A [rich ecosystem of rollup projects](https://l2beat.com/scaling/tvl) is enabling users to transact quickly and cheaply, with a range of security guarantees. However, rollups have been bootstrapped using centralized sequencers (computers that do all the transaction processing and aggregation before submitting them to Ethereum). This is vulnerable to censorship, because the sequencer operators can be sanctioned, bribed or otherwise compromised. At the same time, [rollups vary](https://l2beat.com) in the way they validate incoming data. The best way is for "provers" to submit [fraud proofs](/glossary/#fraud-proof) or validity proofs, but not all rollups are there yet. Even those rollups that do use validity/fraud proofs use a small pool of known provers. Therefore, the next critical step in scaling Ethereum is to distribute responsibility for running sequencers and provers across more people.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">More on rollups</ButtonLink>

## Current progress {#current-progress}

Proto-Danksharding is the first of these roadmap items to be implemented as part of the Cancun-Deneb ("Dencun") network upgrade in March of 2024. 
**Full Danksharding is likely several years away**, as it relies upon several other roadmap items being completed first. Decentralizing rollup infrastructure is likely to be a gradual process - there are many different rollups that are building slightly different systems and will fully decentralize at different rates.

[More on the Dencun network upgrade](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />
