---
title: Naming smart contracts
description: Best practices for naming Ethereum smart contracts with ENS
lang: en
---

Smart contracts are a cornerstone of Ethereum's decentralized infrastructure, enabling autonomous applications and protocols. But even as contract capabilities evolve, users and developers still rely on raw hexadecimal addresses to identify and reference these contracts.

Naming smart contracts with [Ethereum Name Service (ENS)](https://ens.domains/) improves user experience by eliminating hexadecimal contract addresses and reduces risk from attacks such as address poisoning and spoofing attacks. This guide explains why naming smart contracts matters, how it can be implemented, and tools available such as [Enscribe](https://www.enscribe.xyz) to simplify the process and help developers adopt the practice.

## Why Name Smart Contracts? {#why-name-contracts}

### Human-Readable Identifiers

Instead of interacting with opaque contract addresses like `0x8f8e...f9e3`, developers and users can use human-readable names like `v2.myapp.eth`. This simplifies smart contract interactions.

This is made possible by the [Ethereum Name Service](https://ens.domains/) which provides a decentralized naming service for Ethereum addresses. This is analogous to how the Domain Name Service (DNS) enables users of the internet to access network addresses using a name such as www.ethereum.org instead of via an IP address such as `104.18.176.152`.

### Improved Security and Trust

Named contracts help reduce accidental transactions to the wrong address. They also help users identify contracts tied to specific apps or brands. This adds a layer of reputational trust, especially when names are attached to well-known parent domains like `uniswap.eth`. 

Due to the 42 character length of Ethereum address, it's very hard for users to identify small changes in addresses, where a couple of characters have been modified. For instance an address such as `0x58068646C148E313CB414E85d2Fe89dDc3426870` would normally betruncated to `0x580...870` by user-facing applicataions such as wallets. A user is unlikely to notice a malicious address where a couple of characters have been altered. 

This type of technique is employed by address spoofing and poisoning attacks where users are led to believe they are interacting with or sending funds to the correct address, when in fact the address simply resembles the correct address, but isn't the same.

ENS names for wallets and contracts protect against these types of attacks. Although like DNS spoofing attacks, ENS spoofing attacks can still be harboured. However, a user is more likely to notice a mis-spelling in an ENS name, then a small modification to a hexadecimal address.

### Better UX for Wallets and Explorers

When a smart contract has been configured with an ENS name, it is possible for apps such as wallets and blockchain explorers to display ENS names for smart contracts, instead of hexadecimal addresses. This provides a significant UX uplift for users. 

For instance, when interacting with an app such as Uniswap, users will typically see that the app they are interacting with is hosted on the website `uniswap.org`, but they would be presented with a hexadecimal contract address if Uniswap has not named their smart contracts with ENS. If the contract is named, instead they could see `v4.contracts.uniswap.eth` which is far more useful.

## Naming at Deployment vs. Post-Deployment {#when-to-name}

There are two points at which smart contracts can be named:

- **At Deployment Time** – assigning an ENS name to the contract as it is deployed.
- **After Deployment** – mapping an existing contract address to a new ENS name.

Both approaches rely on having owner or manager access to an ENS domain so they can create and set ENS records.

## How ENS Naming Works for Contracts {#how-ens-naming-works}

ENS names are stored on-chain and resolve to Ethereum addresses via ENS resolvers. To name a smart contract:

1. Register or control a parent ENS domain (e.g. `myapp.eth`)
2. Create a subdomain (e.g. `v1.myapp.eth`)
3. Set the `address` record of the subdomain to the contract address
4. Set the contract's reverse record to the ENS to allow the name to be found via its address

ENS names are hierarchical and support unlimited subnames. Setting these records typically involves interacting with the ENS registry and public resolver contracts.

## Tools for Naming Contracts {#tools}

There are two approaches to naming smart contracts. Either using the [ENS App](https://app.ens.domains) with some manual steps, or using [Enscribe](https://www.enscribe.xyz). These are outlined below.

### Manual ENS Setup

Using the [ENS App](https://app.ens.domains/), developers can manually create subnames and set forward address records. However, they cannot set a primary name for a smart contract by setting the reverse record for the name via the ENS App. Manual steps must be taken which are covered in the [ENS docs](https://docs.ens.domains/web/naming-contracts/).

### Enscribe

[Enscribe](https://www.enscribe.xyz) simplifies smart contract naming with ENS, and enhances user trust in smart contracts. It provides:

- **Atomic deployment and naming**: Assign an ENS name when deploying a new contract
- **Post-deployment naming**: Attach names to already-deployed contracts
- **Multi-chain support**: Works across Ethereum and L2 networks where ENS is supported
- **Contract verification data**: Includes contract verification data pulled from multiple sources to increase trust for users

Enscribe supports ENS names provided by users, or its own domains if the user doesn't have an ENS name.

You can access the [Enscribe App](https://app.enscribe.xyz) to start naming and viewing smart contracts.


## Best Practices {#best-practices}

- **Use clear, versioned names** like `v1.myapp.eth` to make contract upgrades transparent
- **Set reverse records** to link contracts to ENS names for visibility in apps such as wallets and blockchain exploreres.
- **Monitor expiries closely** if you want to prevent accidental changes in ownership
- **Verify contract source** so users can trust that the named contract behaves as expected

## Future of Contract Naming {#future}

Contract naming is becoming a best practice for dapp development, similar to how domain names replaced IP addresses on the web. As more infrastructure such as wallets, explorers and dashboards integrate ENS resolution for contracts, named contracts will improve safety and reduce errors across the ecosystem.

By making smart contracts easier to recognize and reason about, naming helps bridge the gap between users and apps on Ethereum, improving both safety and UX for users.

---

## Further Reading

- [Naming Smart Contracts with ENS](https://docs.ens.domains/web/naming-contracts/)
- [Naming Smart Contracts with Enscribe](https://www.enscribe.xyz/docs).
