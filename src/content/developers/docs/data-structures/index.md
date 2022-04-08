---
title: Data structures
description: A definition of the rlp encoding in Ethereum's execution layer.
lang: en
sidebar: true
sidebarDepth: 2
---

Ethereum creates, stores and transfers large volumes of data. This data must get formatted in standardized and memory-efficient ways to allow anyone to [run a node](/run-a-node/) on relatively modest consumer-grade hardware. To achieve this, several specific data structures are used on the Ethereum stack.

## Prerequisites {#prerequisites}

You should understand the fundamentals of Ethereum and [client software]. Familiarity with the networking layer and [the Ethereum whitepaper](/whitepaper/) is recommended.

## Data structures {#data-structures}

### Patricia merkle trees {#patricia-merkle-tries}

Patricia Merkle Tries are structures that encode key-value pairs into a deterministic trie. These are used extensively across Ethereum's execution layer. More information can be found [here](developers/docs/data-structures/patricia-merkle-trie)

### Recursive Length Prefix

Recursive-length prefix is a serialization method used extensively across Ethereum's execution layer. Detailed information about RLP can be found [here](developers/docs/data-structures/rlp).

### Simple Serialize

Simple serialize is the dominant serialization format on Ethereum's consensus layer because it is very compatible with Merklelization. A deeper explanation of SSZ serialization, merklelization and proofs can be found [here](developers/docs/data-structures/ssz).
