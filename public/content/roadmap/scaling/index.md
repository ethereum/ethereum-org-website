---
title: Scaling Ethereum
description: Rollups batch transactions together offchain, reducing costs for the user. Blobs, added with Proto-Danksharding and expanded with PeerDAS, make the data rollups post to Ethereum much cheaper.
lang: en
image: /images/roadmap/roadmap-transactions.png
alt: "Ethereum roadmap"
template: roadmap
---

Ethereum is scaled using [layer 2s](/layer-2/learn/#how-does-layer-2-work) (also known as rollups), which batch transactions together and send the output to Ethereum. Even though rollups are up to eight times less expensive than Ethereum Mainnet, it's possible to optimize rollups further to reduce costs for end users. Rollups also rely on some centralized components that developers can remove as the rollups mature.

## Making data cheaper {#making-data-cheaper}

Rollups collect large numbers of transactions, execute them and submit the results to Ethereum. This generates a lot of data that needs to be openly available so that anyone can execute the transactions for themselves and verify that the rollup operator was honest. If someone finds a discrepancy, they can raise a challenge.

### Proto-Danksharding {#proto-danksharding}

Rollup data has historically been stored on Ethereum permanently, which is expensive. Over 90% of the transaction cost users pay on rollups is due to this data storage. To reduce transaction costs, we can move the data into a new temporary 'blob' storage. Blobs are cheaper because they are not permanent; they get deleted from Ethereum once they are no longer needed. Storing rollup data long-term becomes the responsibility of the people that need it, such as rollup operators, exchanges, indexing services etc. Adding blob transactions to Ethereum is part of an upgrade known as "Proto-Danksharding".

With Proto-Danksharding, it is possible to add many blobs to Ethereum blocks. This enables another substantial (>100x) scale-up to Ethereum’s throughput and scale-down to transaction costs.

### Danksharding {#danksharding}

The second stage of expanding blob data is complicated because it requires new methods for checking rollup data is available on the network and relies on [validators](/glossary/#validator) separating their [block](/glossary/#block) building and block proposal responsibilities. It also requires a way to cryptographically prove that validators have verified small subsets of the blob data.

This second step is known as ["Danksharding"](/roadmap/danksharding/). A first form of [data availability sampling (DAS)](/developers/docs/data-availability), which lets the network confirm that data is available by randomly sampling a few kilobytes at a time, went live as [PeerDAS](/roadmap/fusaka/peerdas/) in December 2025. [Separating block building and block proposal](/roadmap/pbs) is scheduled for the Glamsterdam upgrade.

<ButtonLink variant="outline" href="/roadmap/danksharding/">More on Danksharding</ButtonLink>

## Decentralizing rollups {#decentralizing-rollups}

[Rollups](/layer-2) are already scaling Ethereum. A [rich ecosystem of rollup projects](https://l2beat.com/scaling/tvs) is enabling users to transact quickly and cheaply, with a range of security guarantees. However, rollups have been bootstrapped using centralized sequencers (computers that do all the transaction processing and aggregation before submitting them to Ethereum). This is vulnerable to censorship, because the sequencer operators can be sanctioned, bribed or otherwise compromised. At the same time, [rollups vary](https://l2beat.com/scaling/summary) in the way they validate incoming data. The best way is for "provers" to submit [fraud proofs](/glossary/#fraud-proof) or validity proofs, but not all rollups are there yet. Even those rollups that do use validity/fraud proofs use a small pool of known provers. Therefore, the next critical step in scaling Ethereum is to distribute responsibility for running sequencers and provers across more people.

<ButtonLink variant="outline" href="/developers/docs/scaling/">More on rollups</ButtonLink>

## Scaling Ethereum Mainnet with zkEVMs {#zkevm}

Rollups are not the only path to scale. Today every [validator](/glossary/#validator) re-executes every transaction in every block, which limits how much Ethereum Mainnet can process without raising hardware requirements. With a zkEVM, a single prover executes the block and generates a [zero-knowledge proof](/zero-knowledge-proofs/) that the execution was correct, and validators check that proof instead. Checking a proof is far cheaper than re-executing, so Mainnet can process more transactions without pushing validators onto expensive hardware.

<ButtonLink variant="outline" href="/roadmap/zkevm/">More on zkEVM</ButtonLink>

## Current progress {#current-progress}

Proto-Danksharding was successfully implemented as part of the Cancun-Deneb ("Dencun") network upgrade in March 2024. Since its implementation, rollups have begun utilizing blob storage, resulting in reduced transaction costs for users and millions of transactions processed in blobs.

PeerDAS, a first form of DAS (Data Availability Sampling), went live with the Fusaka upgrade on December 3, 2025. Two blob-parameter-only (BPO) forks then raised blob capacity: BPO1 on December 9, 2025 (target 10, max 15) and BPO2 on January 7, 2026 (target 14, max 21). Work on full Danksharding continues, and enshrined PBS (Proposer-Builder Separation) is scheduled for the [Glamsterdam upgrade](/roadmap/glamsterdam/#epbs). Decentralizing rollup infrastructure is a gradual process - there are many different rollups that are building slightly different systems and will fully decentralize at different rates.

[More on the Dencun network upgrade and its impact](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />
