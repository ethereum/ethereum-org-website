---
title: Data Structures
description: A definition of the rlp encoding in Ethereum's execution layer.
lang: en
sidebar: true
sidebarDepth: 2
---

The Ethereum platform creates, stores and transfers large volumes of data. It is critical that this data is formatted in ways that are standardized and memory efficient so that nodes can be run on relatively modest consumer-grade hardware. To achieve this, there are several specific data structures that are used on the Ethereum stack.

## Prerequisites {#prerequisites}

It is useful to have a good understanding of the ethereum blockchain and client software. Familiarity with the networking layer would also be useful. This is quite low level information about how the Ethereum protocol is designed. A reasonable understanding of the Ethereum whitepaper is recommended.

## Data Structures {#data-structures}

### Patricia merkle trees {#patricia-merkle-tries}

Patricia Merkle Tries are structures that encode key-value pairs into a deterministic trie. These are used extensively across Ethereum's execution layer. More information can be found [here](developers/docs/data-structures/patricia-merkle-trie)

### Recursive Length Prefix

Recursive-length prefix is a serialization method used extensively across Ethereum's execution layer. Detailed information about RLP can be found [here](developers/docs/data-structures/rlp).

### Simple Serialize

Simple serialize is the dominant serialization format on Ethereum's consensus layer because it is very compatible with Merklelization. A deeper explanation of SSZ serialization, merklelization and proofs can be found [here](developers/docs/data-structures/ssz).
