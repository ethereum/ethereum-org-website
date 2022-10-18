---
title: ERC-777 Token Standard
description:
lang: en
---

## Introduction? {#introduction}

ERC-777 is a fungible token standard improving the existing [ERC-20](/developers/docs/standards/tokens/erc-20/) standard.

## Prerequisites {#prerequisites}

To better understand this page, we recommend you first read about [ERC-20](/developers/docs/standards/tokens/erc-20/).

## What improvements does ERC-777 propose over ERC-20? {#-erc-777-vs-erc-20}

The ERC-777 provides the following improvements over ERC-20.

### Hooks {#hooks}

Hooks are a function described in the code of a smart contract. Hooks get called when tokens are sent or received through the contract. This allows a smart contract to react to incoming or outgoing tokens.

The hooks are registered and discovered using the [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820) standard.

#### Why are hooks great? {#why-are-hooks-great}

1. Hooks allow sending tokens to a contract and notifying the contract in a single transaction, unlike [ERC-20](https://eips.ethereum.org/EIPS/eip-20), which requires a double call (`approve`/`transferFrom`) to achieve this.
2. Contracts that have not registered hooks are incompatible with ERC-777. The sending contract will abort the transaction when the receiving contract has not registered a hook. This prevents accidental transfers to non-ERC-777 smart contracts.
3. Hooks can reject transactions.

### Decimals {#decimals}

The standard also solves the confusion around `decimals` caused in ERC-20. This clarity improves the developer experience.

### Backwards compatibility with ERC-20 {#backwards-compatibility-with-erc-20}

ERC-777 contracts can be interacted with as if they were ERC-20 contracts.

## Further Reading {#further-reading}

[EIP-777: Token Standard](https://eips.ethereum.org/EIPS/eip-777)
