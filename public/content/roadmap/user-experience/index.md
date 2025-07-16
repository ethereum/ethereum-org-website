---
title: Improving user experience
description: It is still too complex to use Ethereum for most people. To encourage mass adoption, Ethereum must drastically lower its barriers to entry - users must get the benefits of decentralized, permissionless and censorship resistant access to Ethereum but it must be as frictionless as using a traditional web2 app.
lang: en
image: /images/roadmap/roadmap-ux.png
alt: "Ethereum roadmap"
template: roadmap
---

**Using Ethereum needs to be simplified**; from managing [keys](/glossary/#key) and [wallets](/glossary/#wallet) to initiating transactions. To facilitate mass adoption, Ethereum must drastically increase the ease of use, allowing users to experience permissionless and censorship-resistant access to Ethereum with the frictionless experience of using [Web2](/glossary/#web2) apps.

## Beyond seed phrases {#no-more-seed-phrases}

Ethereum accounts are protected by a pair of keys used to identify accounts (public key) and sign messages (private key). A private key is like a master password; it allows complete access to an Ethereum account. This is a different way of operating for people more familiar with banks and Web2 apps which manage accounts on a user's behalf. For Ethereum to reach mass adoption without relying on centralized third parties, there must be a straightforward, frictionless way for a user to take custody of their assets and keep control of their data without having to understand public-private key cryptography and key management.

The solution to this is using [smart contract](/glossary/#smart-contract) wallets to interact with Ethereum. Smart contract wallets create ways to protect accounts if the keys are lost or stolen, opportunities for better fraud detection and defense, and allow wallets to get new functionality. Although smart contract wallets exist today, they are awkward to build because the Ethereum protocol needs to support them better. This additional support is known as account abstraction.

<ButtonLink variant="outline-color" href="/roadmap/account-abstraction/">More on account abstraction</ButtonLink>

## Nodes for everyone

Users running [nodes](/glossary/#node) do not have to trust third parties to provide them with data, and they can interact quickly, privately, and permissionlessly with the Ethereum [blockchain](/glossary/#blockchain). However, running a node right now requires technical knowledge and substantial disk space, meaning many people must trust intermediaries instead.

There are several upgrades that will make running nodes far easier and far less resource intensive. The way data is stored will be changed to use a more space-efficient structure known as a **Verkle Tree**. Also, with [statelessness](/roadmap/statelessness) or [data expiry](/roadmap/statelessness/#data-expiry), Ethereum nodes will not need to store a copy of the entire Ethereum state data, drastically reducing hard disk space requirements. [Light nodes](/developers/docs/nodes-and-clients/light-clients/) will offer many benefits of running a full node but can run easily on mobile phones or inside simple browser apps.

<ButtonLink variant="outline-color" href="/roadmap/verkle-trees/">Read about Verkle trees</ButtonLink>

With these upgrades, the barriers to running a node are reduced to effectively zero. Users will benefit from secure, permissionless access to Ethereum without having to sacrifice noticeable disk space or CPU on their computer or mobile phone, and will not have to rely on third parties for data or network access when they use apps.

## Current progress {#current-progress}

Smart contract wallets are already available, but more upgrades are required to make them as decentralized and permissionless as possible. EIP-4337 is a mature proposal that does not require any changes to Ethereum's protocol. The main smart contract required for EIP-4337 was **deployed in March 2023**.

**Full statelessness is still in the research phase** and is likely several years away from being implemented. There are several milestones on the road to full statelessness, including data expiry, that may be implemented sooner. Other roadmap items, such as [Verkle Trees](/roadmap/verkle-trees/) and [Proposer-builder separation](/roadmap/pbs/) need to be completed first.

Verkle tree testnets are already up and running, and the next phase is running Verkle-tree enabled clients on private, then public testnets. You can help accelerate progress by deploying contracts to the testnets or running testnet clients.
