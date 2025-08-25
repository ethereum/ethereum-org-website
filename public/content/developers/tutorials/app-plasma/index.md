---
title: Write your own app-specific zero knowledge plasma
description: In this tutorial, we build a semi-secret bank for deposits. The bank is a centralized component; it knows the balance of each user. However, this information is not stored onchain. Instead, the bank posts a hash of the state. Every time there is a transaction, the bank posts the new hash, along with a zero-knowledge proof that it has a (signed) transaction that changes the hash state to the new one. After reading this tutorial, you will understand not just how to use zero knowledge proofs, but also why you use them and how to do so securely.
author: Ori Pomerantz
tags: ["zero-knowledge", "server", "offchain"]
skill: advanced
lang: en
published: 2025-09-30
---

## Introduction

In contrast to [rollups](/developers/docs/scaling/zk-rollups/), [plasmas](/developers/docs/scaling/plasma) use the Ethereum mainnet for integrity, but not availability. 

WRITE MORE HERE


## Design

### Zero-knowledge proofs

At a very basic level, a zero-knowledge proof shows that the prover knows some data, *Data<sub>private</sub>* such that there is a relationship *Relationship* between *Data<sub>public</sub>* and *Data<sub>private</sub>. The verifier knows *P* and *Data<sub>public</sub>*.

To preserve privacy, we need the state (the accounts and their balances) and the transaction to both be private. But to ensure integrity, we need the [cryptographic hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function) of states and transactions to be public.

These are the fields in *Data<sub>public</sub>*:

- *Hash(State<sub>n</sub>)* the hash of the old state
- *Hash(State<sub>n+1</sub>)* the hash of the new state
- *Hash(Transaction)* the hash of the transaction that changes the state from *State<sub>n</sub>* to *State<sub>n+1</sub>*.

And these fields in *Data<sub>private</sub>*:

- *State<sub>n</sub>*, the old state
- *State<sub>n+1</sub>*, the new state
- *Transaction*, a transaction that changes from the old state to the new one.

The relationship checks several conditions:

- The public hashes are indeed the correct hashes for the private fields.
- The transaction, when applied to the old state, results in the new state.
- The transaction includes a valid signature, authorized to perform the action of the transactions.

Because of the properties of cryptographic hash functions, proving these conditions is enough to ensure integrity. 

### Components

#### Smart contracts

#### Server

### Data and control flows

#### Transfers

#### Deposits

#### Withdrawals

## Implementation

### Zero knowledge flows

### Server-side and client-side code

### Smart contracts

## Abuses by the centralized component

Integrity is easy, availability hard, confidentiality impossible

### Forced transactions

The server can ignore them, but only at the cost of a total block.

### Availability bonds

### Correspndent banks

## Conclusion