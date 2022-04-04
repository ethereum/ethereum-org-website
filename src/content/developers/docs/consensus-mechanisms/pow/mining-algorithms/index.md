---
title: Mining algorithms
description: A detailed look at the algorithms used for Ethereum mining.
lang: en
sidebar: true
incomplete: false
---

This section includes detailed information about two Etheruem mining algorithms: Dagger Hashamoto and Ethash. Dagger Hashamoto is no longer used to mine Ethereum. It was superceded by Ethash, an upgraded version of Dagger-Hashamoto, several years ago. However, it has historical significance and is included here because it was an important innovation in Ethereum's development. Proof-of-work mining itself will be deprecated in favour of proof-of-stake during the merge which is expected to happen in summer 2022. To understand the information in this page it is recommended to first read our introductory pages on [proof-of-work consensus](/pow) and [mining](/mining).

The basic idea of both algorithms is that the miner tries, using brute force computation, to find a nonce input so that the result is below a certain difficulty threshold. This difficulty threshold can be dynamically adjusted so block production proceeds with a regular tempo.

## Dagger Hashimoto {#dagger-hashimoto}

Dagger Hashamoto was a precursor research algorithm for Ethereum mining that was superceded by Ethash. It was an amalgamation of two separate algorithms: Dagger and Hashimoto.

[Dagger](http://www.hashcash.org/papers/dagger.html) involved the generation of a [Directed Acyclic Graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph), random slices of which were then hashed together. The core principle is that each individual nonce only requires a small portion of a large total data tree, and recomputing the subtree for each nonce is prohibitive for mining - hence the need to store the tree - but okay for a single nonce’s worth of verification. Dagger was meant to be an alternative to existing memory-hard algorithms like Scrypt, which are memory-hard but are also very hard to verify when their memory-hardness is increased to genuinely secure levels. However, Dagger was proven to be vulnerable to shared memory hardware acceleration and was then dropped in favor of other avenues of research.

[Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf) is an algorithm that adds ASIC-resistance by being i/o bound (i.e. making memory reads the limiting factor in the mining process). The theory is that RAM is in principle inherently a much more generic ingredient than computation, and billions of dollars of research already go into optimizing it for different use cases which often involve near-random access patterns (hence “random access memory”); hence, existing RAM is likely to be moderately close to optimal for evaluating the algorithm. Hashimoto uses the blockchain as a source of data, simultaneously satisfying (1) and (3) above.

Dagger-Hashimoto used amended versions of the Dagger and Hashimoto algorithmms. The difference between Dagger Hashimoto and Hashimoto is that, instead of using the blockchain as a data source, Dagger Hashimoto uses a custom-generated data set, which updates based on block data every N blocks. The data set is generated using the Dagger algorithm, allowing for the efficient calculation of a subset specific to every nonce for the light client verification algorithm. The difference between Dagger Hashimoto and Dagger is that, unlike in the original Dagger, the dataset used to query the block is semi-permanent, only being updated at occasional intervals (eg. once per week). This means that the portion of the effort that goes toward generating the dataset is close to zero, so Sergio Lerner’s arguments regarding shared memory speedups become negligible.

A detailed explanation is provided on our [Dagger-Hashamoto page](/developers/docs/consensus-mechanisms/pow/mining-algorithms/dagger-hashamoto).

## Ethash {#ethash}

Ethash is Ethereum's current mining algorithm. Ethash was effectively a new name given to a specific version of Dagger-Hashamoto after the algorithm had been updated in some fairly substantial ways, but still inheriting the fundamental principles of its predecessor.

A detailed explanation is available on our [Ethash page](/developers/docs/consensus-mechanisms/pow/mining-algorithms/ethash).
