---
title: Data structures and encoding
description: An overview of the fundamental Ethereum data structures.
lang: en
sidebarDepth: 2
---

Ethereum creates, stores and transfers large volumes of data. This data must get formatted in standardized and memory-efficient ways to allow anyone to [run a node](/run-a-node/) on relatively modest consumer-grade hardware. To achieve this, several specific data structures are used on the Ethereum stack.

## Prerequisites {#prerequisites}

You should understand the fundamentals of Ethereum and [client software](/developers/docs/nodes-and-clients/). Familiarity with the networking layer and [the Ethereum whitepaper](/whitepaper/) is recommended.

## Data structures {#data-structures}

### Patricia merkle tries {#patricia-merkle-tries}

Patricia Merkle Tries are structures that encode key-value pairs into a deterministic and cryptographically authenticated trie. These are used extensively across Ethereum's execution layer.

[More on Patricia Merkle Tries](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### Recursive Length Prefix {#recursive-length-prefix}

Recursive Length Prefix (RLP) is a serialization method used extensively across Ethereum's execution layer.

[More on RLP](/developers/docs/data-structures-and-encoding/rlp)

### Simple Serialize {#simple-serialize}

Simple Serialize (SSZ) is the dominant serialization format on Ethereum's consensus layer because of its compatibility with merklelization.

[More on SSZ](/developers/docs/data-structures-and-encoding/ssz)
