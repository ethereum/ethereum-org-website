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

In contrast to [rollups](/developers/docs/scaling/zk-rollups/), [plasmas](/developers/docs/scaling/plasma) use the Ethereum mainnet for integrity, but not availability. In this article, we write an application that acts like a plasma, with Ethereum guaranteeing integrity (nobody can make unauthorized changes), but not availability (there is a centralized component that can go down and disable the whole system).

The application we write here is a privacy preserving bank. Different addresses have accounts with balances, and they can send money (ETH) to other accounts. The bank posts hashes of the state (accounts and their balances) and transactions, but keeps the actual balances offchain where they can stay private.

## Design

This is not a production-ready system, but a teaching tool. As such, it is written with a number of simplifying assumptions.

- Fixed account pool. There is a specific number of accounts, which belong to predetermined addresses. This makes for a much simpler system because it is difficult to handle variable size data structures in zero knowledge proofs. For a production-ready system, we can use the [Merkle root](https://ethereum.org/en/developers/tutorials/merkle-proofs-for-offline-data-integrity/) as the state hash and provide Merkle proofs for the balances we need.

- Memory storage. On a production system we need to write all the account balances to disk to preserve them in case of a restart. Here it's OK if the information is simply lost.

### Zero-knowledge proofs

At a very basic level, a zero-knowledge proof shows that the prover knows some data, *Data<sub>private</sub>* such that there is a relationship *Relationship* between some public data,*Data<sub>public</sub>*, and *Data<sub>private</sub>. The verifier knows *Relationship* and *Data<sub>public</sub>*.

To preserve privacy, we need the state and the transaction to both be private. But to ensure integrity, we need the [cryptographic hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function) of states and transactions to be public.

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

This system requires two components: One is a *server* that receives transactions, processes them, and posts hashes to the chain along with the zero knowledge proofs. The second is a *smart contract* that stores the hashes and verifies the zero knowledge proofs to ensure state transitions are legitimate.

### Data and control flows

These are the ways that the various components communicate on this system.

#### Transfers

1. A web browser submits a signed transaction asking for a transfer from the signer's account to a different account.

2. The server verifies that the transaction is valid:
   - The signer has an account in the bank with a sufficient balance.
   - The recipient has an account in the bank.

3. The server calculates the new state by subtracting the transferred amount from the signer's balance and adding it to the recipient's balance.

4. The server calculates a zero-knowledge proof that the state change is a valid one.

5. The server submits a transaction that includes:
   - The old state hash
   - The new state hash
   - The transaction hash (so the trasaction sender can know it has been processed)
   - The zero knowledge proof that proves the transition to the new state is valid

6. The smart contract verifies the zero knowledge proof.

7. If the zero knowledge proof checks out, the smart contract performs several actions:
   - Update the current state hash to the new state hash
   - Emit a log entry 

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