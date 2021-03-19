---
title: Introduction to dapps
description:
lang: en
sidebar: true
---

A decentralized application (dapp) is an application built on a decentralized network that combines a [smart contract](/en/developers/docs/smart-contracts/) and a frontend user interface. Note, in Ethereum smart-contracts are accessible and transparent – like open APIs – so your dapp can even include a smart contract that someone else has written.

## Prerequisites {#prerequisites}

Before learning about dapps, you should cover the [blockchain basics](/developers/docs/intro-to-ethereum/) and read about the Ethereum network and how it's decentralized.

## Definition of a dapp {#definition-of-a-dapp}

A dapp has its backend code running on a decentralized peer-to-peer network. Contrast this with an app where the backend code is running on centralized servers.

A dapp can have frontend code and user interfaces written in any language (just like an app) that can make calls to its backend. Furthermore, its frontend can be hosted on decentralized storage such as [IPFS](https://ipfs.io/).

- **Decentralized** means they are independent, and no one can control them as a group.
- **Deterministic** i.e., they perform the same function irrespective of the environment they are executed.
- **Turing complete**, which means given the required resources, the dapp can perform any action.
- **Isolated**, which means they are executed in a virtual environment known as Ethereum Virtual Machine so that if the smart contract happens to have a bug, it won’t hamper the normal functioning of the blockchain network.

### On smart contracts {#on-smart-contracts}

To introduce dapps, we need to introduce smart contracts – a dapp's backend for lack of a better term. For a detailed overview head to our section on [smart contracts](/en/developers/docs/smart-contracts/).

A smart contract is code that lives on the Ethereum blockchain and runs exactly as programmed. Once they are deployed on the network you can't change them. Dapps can be decentralized because they are controlled by the logic written into the contract, not an individual or company. This also means you need to design your contracts very carefully and test them thoroughly.

<!--Benefits and implications provided by Brian Gu)-->

## Benefits of dapp development {#benefits-of-dapp-development}

- **Zero downtime** – once the smart contract at the core of an app is deployed and on the blockchain, the network as a whole will always be able to serve clients looking to interact with the contract. Malicious actors therefore cannot launch denial-of-service attacks targeted towards individual dapps.
- **Privacy** – you don’t need to provide real-world identity to deploy or interact with a dapp.
- **Resistance to censorship** – no single entity on the network can block users from submitting transactions, deploying dapps, or reading data from the blockchain.
- **Complete data integrity** – data stored on the blockchain is immutable and indisputable, thanks to cryptographic primitives. Malicious actors cannot forge transactions or other data that has already been made public.
- **Trustless computation/verifiable behavior** – smart contracts can be analyzed and are guaranteed to execute in predictable ways, without the need to trust a central authority. This is not true in traditional models; for example, when we use online banking systems, we have to trust that financial institutions will not misuse our financial data, tamper with records, or get hacked.

## Implications of dapp development {#implications-of-dapp-development}

<!-- - Transparency – transactions that trigger dapp functionality are public
- Open source
- Cost of storage – contracts are often only small percentages of the dapp. They are stored on-chain and this storage needs to be paid for, so it can be expensive.
 -->

- **Maintenance** – dapps can be harder to maintain because code and data published to the blockchain is harder to modify. It’s hard for developers to make updates to their dapps (or the underlying data stored by a dapp) once they are deployed - even if bugs or security risks are identified in an old version.
- **Performance overhead** – there is a huge performance overhead, and scaling is really hard. To achieve the level of security, integrity, transparency, and reliability that Ethereum aspires to, every node runs and stores every transaction. On top of this, proof-of-work takes time as well. A back-of-the-envelope calculation puts the overhead at something like 1,000,000x that of standard computation currently.
- **Network congestion** – at least in the current model, if one dapp is using too many computational resources, the entire network gets backed up. Currently, the network is only able to process about 10-15 transactions per second; if transactions are being sent in faster than this, the pool of unconfirmed transactions can quickly balloon.
- **User experience** – it may be harder to engineer user-friendly experiences: The average end user might find it too difficult to set up a tool stack necessary to interact with the blockchain in a truly secure fashion.
- **Centralization** – User-friendly and developer-friendly solutions built on top of the base layer of Ethereum might end up looking like centralized services anyways: for example, such services may store keys or other sensitive information server-side, serve a frontend using a centralized server, or run important business logic on a centralized server before writing to the blockchain. This eliminates many (if not all) of the advantages of blockchain over the traditional model.

<!-- ## Types of dapp

- Involving money
- Involving money and something else
- Other, including decentralized autonomous organizations

---

The application has to be open-source, operate autonomously, and can not be controlled by any one entity.
All data and record must be cryptographically stored in a public, decentralized blockchain.
The app must use a cryptographic token, also referred to as an App Coin, to access the application.
Tokens must be generated in order to prove the value nodes that contribute to the application.

---
 -->

## Dapp tools {#dapp-tools}

**Rimble UI** **_- Adaptable components and design standards for decentralized applications._**

- [rimble.consensys.design](https://rimble.consensys.design)
- [GitHub](https://github.com/ConsenSys/rimble-ui)

**One Click Dapp** **_- FOSS tool for generating dapp frontends from an ABI._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/One-Click-Dapp/one-click-dApp)

**Etherflow** **_- FOSS tool for Ethereum developers to test their node, and compose & debug RPC calls from the browser._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

## Further reading {#further-reading}

_Know of a community resource that helped you? Edit this page and add it!_

## Related Topics {#related-topics}

- [Introduction to the Ethereum stack](/en/developers/docs/ethereum-stack/)
- [Development frameworks](/en/developers/docs/frameworks/)
