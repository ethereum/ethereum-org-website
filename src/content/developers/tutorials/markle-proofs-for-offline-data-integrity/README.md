---
title: Merkle Proofs for Offline Data Integrity
description: Ensuring data integrity on chain for data that is stored, mostly, off chain
author: Ori Pomerantz
tags: ["merke", "integrity", "storage"]
skill: advanced
lang: en
sidebar: true
published: 2021-12-30
---

## Introduction

Ideally we'd like to store everything in Ethereum storage, which is stored across thousands of computers and has
extremely high availability (the data cannot be censored) and integrity (the data cannot be modified by in an
unauthorized manner), but storing a 32 byte word typically costs 20,000 gas. As I'm writing this, that cost is
equivalent to $6.60. At 21 cents a byte this is too expensive for most uses.

To solve this problem the Ethereum ecosystem developed [many alternative ways to store data in a decentralized 
fashion](https://ethereum.org/en/developers/docs/storage/). Usually they involve a tradeoff between availability
and price. However, integrity is usually assured.

In this article you learn **how** to ensure data integrity without storing the data on the blockchain, using
[merkle proofs](https://computersciencewiki.org/index.php/Merkle_proof). 

## How does it work?

In theory we could just store the hash of the data on chain, and send all the data in transactions that
require it. However, this is still too expensive. A byte of data to a transaction costs about 16 gas, 
currently about half a cent, or about $5 per kilobyte. At $5000 per megabyte, this is still too expensive
for many uses.

The solution is to repeatedly hash different subsets of the data, so for the data that you don't need to 
send you can just send a hash. You do this using a Merkle tree, a tree data structure where each node is a hash
of the nodes below it:

![Merkle Tree](tree.png)

The root hash is the only part that needs to be stored on chain. To prove a certain value, for example C, you
provide all the hashes that need to be combined with it to obtain the root: `D`, `H(A-B)`, and `H(E-H)`.

![Proof of the value of C](proof-c.png)


## Conclusion
