---
title: Account abstraction
description: An overview of Ethereum's plans to make user accounts simpler and safer
lang: en
summaryPoints:
  - Account abstraction makes it much easier to build smart contract wallets
  - Smart contract wallets make it much easier to manage access to Ethereum accounts
  - Lost and exposed keys can be recovered using multiple backups
---

# Account abstraction {#account-abstraction}

Most existing users interact with Ethereum using **[externally owned accounts (EOAs)](/glossary/#eoa)**. This limits how users can interact with Ethereum. For example, it makes it difficult to do batches of transactions and requires users to always keep an ETH balance to pay transaction fees.

Account abstraction is a way to solve these problems by allowing users to flexibly program more security and better user experiences into their accounts. This can happen by [upgrading EOAs](https://eips.ethereum.org/EIPS/eip-7702) (EIP-7702) so they can be controlled by smart contracts. There is also another path involving adding a [second, separate transaction system](https://eips.ethereum.org/EIPS/eip-4337) (EIP-4337) to run in parallel to the existing protocol. Regardless of the route, the outcome is access to Ethereum via smart contract wallets, either natively supported as part of the existing protocol or via an add-on transaction network.

Smart contract wallets unlock many benefits for the user, including:

- define your own flexible security rules
- recover your account if you lose the keys
- share your account security across trusted devices or individuals
- pay someone else's gas, or have someone else pay yours
- batch transactions together (e.g., approve and execute a swap in one go)
- more opportunities for dapps and wallet developers to innovate on user experiences

These benefits are not natively supported today because only externally-owned accounts ([EOAs](/glossary/#eoa)) can start transactions. EOAs are simply public-private key pairs. They work like this:

- if you have the private key you can do _anything_ within the rules of the Ethereum Virtual Machine (EVM)
- if you do not have the private key you can do _nothing_.

If you lose your keys they can't be recovered, and stolen keys give thieves instant access to all the funds in an account.

Smart contract wallets are the solution to these problems, but today they are difficult to program because in the end, any logic they implement has to be translated into a set of EOA transactions before they can be processed by Ethereum. Account abstraction enables smart contracts to initiate transactions themselves, so that any logic that the user wishes to implement can be coded into the smart contract wallet itself and executed on Ethereum.

Ultimately, account abstraction improves support for smart contract wallets, making them easier to build and safer to use. With account abstraction, users can enjoy all the benefits of Ethereum without needing to understand the underlying technology.

## Beyond seed phrases {#beyond-seed-phrases}

Today's accounts are secured using private keys that are calculated from seed phrases. Anyone with access to a seed phrase can easily discover the private key protecting an account and gain access to all the assets it protects. If a private key and seed phrase are lost, the assets are permanently inaccessible. Securing these seed phrases is awkward, even for expert users, and seed phrase phishing is one of the most common scams.

Account abstraction solves this by using a smart contract to hold assets and authorize transactions. Smart contracts can include custom logic tailored for maximum security and usability. Users still use private keys to control access, but with enhanced safety measures.

For example, backup keys can be added to a wallet, enabling key replacement if the primary key is compromised. Each key can be secured differently or distributed among trusted individuals, significantly increasing security. Additional wallet rules can mitigate damage from key exposure, such as requiring multiple signatures for high-value transactions or restricting transactions to trusted addresses.

## Better user experience {#better-user-experience}

Account abstraction greatly enhances the user experience and security by supporting smart contract wallets at the protocol level. Developers can innovate freely, improving transaction bundling for speed and efficiency. Simple swaps can become one-click operations, significantly improving ease of use.

Gas management improves considerably. Applications can pay users' gas fees or allow payment in tokens other than ETH, eliminating the need to maintain an ETH balance.

## How will account abstraction be implemented? {#how-will-aa-be-implemented}

Currently, smart contract wallets are challenging to implement as they rely on complex code wrapping standard transactions. Ethereum can change this by allowing smart contracts to directly initiate transactions, embedding logic in Ethereum smart contracts rather than relying on external relayers.

### EIP-4337: Account abstraction without protocol changes

EIP-4337 enables native smart contract wallet support without modifying Ethereum's core protocol. It introduces `UserOperation` objects collected into transaction bundles by validators, simplifying wallet development. The EIP-4337 EntryPoint contract was deployed to Ethereum Mainnet on 1st March 2023 and has facilitated the creation of over 26 million smart wallets and 170 million UserOperations.

## Current progress {#current-progress}

As part of Ethereum's Pectra upgrade, EIP-7702 is scheduled for May 7, 2025. EIP-4337 has been widely adopted, [with over 26 million smart accounts deployed and more than 170 million UserOperations processed](https://www.bundlebear.com/overview/all).

## Further reading {#further-reading}

- [erc4337.io](https://www.erc4337.io/)
- [EIP-4337 documentation](https://eips.ethereum.org/EIPS/eip-4337)
- [EIP-7702 documentation](https://eips.ethereum.org/EIPS/eip-7702)
- [ERC-4337 adoption dashboard](https://www.bundlebear.com/overview/all)
- [Vitalik's "Road to Account Abstraction"](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Vitalik's blog on social recovery wallets](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Awesome Account Abstraction](https://github.com/4337Mafia/awesome-account-abstraction)
