---
title: Improving user experience
description: High level overview of how Ethereum will scale in the future
lang: en
image: ../../../assets/enterprise-eth.png
alt: "Ethereum roadmap"
template: roadmap
---

It is still too complex to use Ethereum for most people - key management, wallets, transactions etc are too technical compared to using a bank. The full benefits of running an Ethereum node remain out of reach for the majority of users because there are technical and hardware requirements and it requires some degree of motivation to engage with Ethereum and learn the foundational principles. This situation is fine for technically-minded Ethereum enthusiasts but it will prevent Ethereum being used day-to-day by the general public. To encourage mass adoption, Ethereum must drastically lower its barriers to entry - users must get the benefits of decentralized, permissionless and censorship resistant access to Ethereum but it must be as frictionless as using a traditional web2 app. Read on to discover some of the changes that will be implemented to allow the barriers-to-entry to be broken down:

## Beyond seed phrases {#no-more-seed-phrases}

Ethereum accounts are protected by a pair of keys that are used to identify accounts (public key) and sign messages (private key). A private key works like a master password that allows complete access to an Ethereum account - allowing funds to be moved. This is not a normal mode of operation for people more familiar with banks and web2 companies who manage accounts on a users behalf after retrieving and storing their personal data. In order for Ethereum to reach mass adoption without relying on centralized third-parties, there must be a very easy, frictionless way for a user to custody their own assets and keep control of their own data, but without having to understand public-private key cryptography and key management.

The solution to this is using smart contract wallets to interact with Ethereum. This creates powerful new opportunities for fraud detection and defense, upgradeability and social recovery that allows lost keys to be recovered. Although smart contract wallets exist today, they are awkward to build because they are not very well supported by the Ethereum protocol. Adding the necessary support will lead to great security and useability benefits for ordinary users.

<ButtonLink variant="outline-color" to="/roadmap/account-abstraction/">Read about account abstraction</ButtonLink>

## Nodes for everyone

Users that run their own nodes do not have to trust third parties to provide them truthful data, and they can interact quickly, privately and permissionlessly with the Ethereum blockchain. However, right now running a node requires some technical knowledge and substantial disk space,meaning many people choose to trust intermediaries instead. There are several upgrades that will make running nodes far easier and far less resource intensive. The way data is stored will be changed to use a more space-efficient structure known as a Verkle Tree. Also, with history expiry, Ethereum nodes will not need to store their own copy of the Ethereum state data, drastically reducing hard disk space requirements. Light nodes will offer many of the benefits of running a full node but able to run easily on mobile phones or inside simple browser apps.

<ButtonLink variant="outline-color" to="/roadmap/verkle-trees/">Read about Verkle trees</ButtonLink>

With these upgrades, the barriers to running a node are reduced to effectively zero. Users will benefit from secure, permissionless access to Ethereum without having to sacrifice noticeable disk space or CPU on their computer or mobile phone, and will not have to rely on third parties for data or network access when they use apps.
