---
title: Keys in proof-of-stake Ethereum
description: An explanation of keys used in Ethereum since the transition to proof-of-stake.
lang: en
sidebar: true
---

Ethereum secures user's assets using public-private key cryptography. The public key is used as the basis for an Ethereum address - that is, it is visible to the general public and used as a unique identifier. The private (or 'secret') key should only ever be accessible to an account owner. The private key is used to 'sign' transactions and data so that it can be cryptographically proven that some actionw as approved by the holder of a specific private key.

Ethereum's keys are generated using [elliptic-curve cryptography](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography).

However, when Ethereum switched from [proof-of-work](/developers/docs/consensus-mechanisms/pow) to [proof-of-stake](/developers/docs/consensus-mechanisms/pos) a new type of key was added to Ethereum. The original keys still work exactly the same as before - there were no changes to the elliptic-curve based keys securing accounts. However, for users that wanted to participate in proof-of-stake by staking ETH and running validators, a new type of key was needed. This need arose from scalability challenges associated with many messages passign between large numbers of validators that required a cryptographic method that could easily be aggregated to reduce the amount of communication required for the network to come to consensus.

This new type of key uses the Boneh-Lyn-Shacham, [BLS](https://en.wikipedia.org/wiki/Boneh%E2%80%93Lynn%E2%80%93Shacham), signature scheme. This scheme enables very efficient aggregation of signatures but also allows reverse engineering of the individual validator keys that were aggregated - ideal for managing actions between validators.

## The two types of validator key {#two-types-of-key}

Before the switch to proof-of-stake, Ethereum users only had a single elliptic-curve based private key that they used to access their funds. With the introduction of proof-of-stake, users that wished to be solo stakers also required a **validator key** and a **withdrawal key**.

### The validator key {#validator-key}

The validator signing key consists of two elements:

- Validator **private** key
- Validator **public** key

The purpose of the validator private key is to actively sign on-chain operations such as block proposals and attestations. Therefore these keys have to be held in a hot wallet.

This flexibility has the advantage to move validator signing keys very quickly from one device to another, however, if they have gotten lost or stolen, a thief may be able to **act maliciously** in the following ways:

- Get the validator slashed) by:
  - Being a proposer and signing two different beacon blocks for the same slot
  - Being an attester and signing an attestation that "surrounds" another one.
  - Being an attester and signing two different attestations having the same target.
- Force a voluntary exit, which stops the validator from staking, and grants access to its ETH balance to the withdrawal key owner.

The **validator public key** is included in the _deposit data_ which allows Ethereum to identify the validator.

### The withdrawal key {#withdrawal-key}

The withdrawal key will be required to move the validator balance after this is enabled in the upcoming Shanghai upgrade. Just like the validator keys, the withdrawal keys also consist of two components:

- Withdrawal **private** key
- Withdrawal **public** key

Losing this key means losing access to the validator balance. However, the validator can still sign attestations and blocks since these actions require the validator private key, but there is little to no incentive to do so if the keys are lost.

Separating out the validator keys from the Ethereum account keys enables multiple validators to be run by a single user.

![validator key schematic](validator-key-schematic.png)

## Deriving keys from other keys {#deriving-keys-from-keys}

If every 32 ETH staked required a new set of 2 completely independent keys to be created, key management would quickly become unwieldy especially for users running multiple validators. To get around this problem, multiple validator keys can be derived from a single common secret. Storing that single secret allows access to multiple validator keys.

[Mnemonics](https://en.bitcoinwiki.org/wiki/Mnemonic_phrase) and paths are a well-known feature that users often encounter when [they access](https://ethereum.stackexchange.com/questions/19055/what-is-the-difference-between-m-44-60-0-0-and-m-44-60-0) their hardware wallets. The mnemonic is a sequence of words that act as an initial seed for a private key. When combined with additional data, the mnemonic is used to generate a hash known as the 'master key'. This can be thought of as the root of a tree. Branches from this root can then be drived using a heirarchical path, so that child nodes can exist as combinations of their parent node's hash and their index in the tree.

These paths have the following structure which will be familiar to users who have interacted with hardware wallets:

```
m/44'/60'/0'/0`
```

The slashes in this path separate components of the private key as follows:

```
master_key / purpose / coin_type / account / change / address_index
```

This logic enables a user to attach as many validators to a single **withdrawal key** as they want, because the root of the tree can be common and differentiation can happen at the branches. The user can **derive any number of keys** from the Mnemonic phrase.

```
      [m / 0]
     /
    /
[m] - [m / 1]
    \
     \
      [m / 2]
```

Each branch is separated by a `/` so `m/2` means start with the master key and follow branch 2. In the schematic below a single mnemonic phrase is used to store three withdrawal keys, each with two associated validators.

![validator key logic](multiple-keys.png)

## Further Reading {#further-reading}

[Ethereum Foundation blog post by Carl Beekhuizen](https://blog.ethereum.org/2020/05/21/keys/)

[EIP-2333 BLS12-381 key generation](https://eips.ethereum.org/EIPS/eip-2333)
