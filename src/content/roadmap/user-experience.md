---
title: Improving user experience
description: High level overview of how Ethereumwill scale in the future
---

It is still too hard to use Ethereum for normal people - key management, wallets, transactions etc are too technical compared to using a bank. The full benefits of running an Ethereum node remain out of reach for the majority of users because there are technical and hardware requirements and it requires some degree of motivation to engage with Ethereum and learn the foundational principles. This situation is fine for technically-minded Ethereum enthusiasts but it will prevent Ethereum being used day-to-day by the general public. To encourage mass adoption, Ethereum must drastically lower its barriers to entry - users must get the benefits of decentralized, permissionless and censorship resistant access to Ethereum but it must be as frictionless as using a traditional web2 app. Read on to discover some of the changes that will be implemented to allow the barriers-to-entry to be broken down:

## No more seed phrases

Ethereum accounts are protected by a pair of keys that are used to identify accounts (public key) and sign messages (private key). A private key works like a master password that allows complete access to an Ethereum account - allowing funds to be moved. This is not a normal mode of operation for people more familiar with banks and web2 companies who manage accounts on a users behalf after retrieving and storing their personal data. In order for Ethereum to reach mass adoption without relying on centralized third-parties, there must be a very easy, frictionless way for a user to custody their own assets and keep control of their own data, but without having to understand public-private key cryptography and key management.

The solution to this is known as “account abstraction” and it works by turning a normal Ethereum account into a smart contract. This creates powerful new opportunities for fraud detection and defense, upgradeability and social recovery that allows lost keys to be recovered. This will lead to great security and useability benefits for ordinary users.

Read more on [Account Abstraction](comingsoon)

## Nodes for everyone

Running a node is the gold standard for decentralized, private, fast, permissionless access to Ethereum. However, right now running a node requires some technical knowledge and substantial disk space. There are several upgrades that will make running a node far less resource intensive. These include swapping out the way data is stored, using a much more space-efficient data structure known as a Verkle Tree. Also, Ethereum nods may only keep recent data in its own memory, relying on other decentralized storage options for historical data. This is known as state/history expiry. These upgrades will drastically lower the computational expense of running a full Ethereum node so that it can be a nearly invisible app running on a normal laptop.

Read more on [state expiry](comingsoon) and [Verkle Trees](comingsoon).

As well as making full nodes easier to run, light nodes will offer many of the benefits of running a full node but with extremely low hardware requirements. These nodes make some trust trade-offs compared to full nodes, but they will be able to run easily on mobile phones or even inside simple browser apps. Light nodes do currently exist but they need more development in order to become widely used.

Read more on [light clients](comingsoon).

With these upgrades, the technical and hardware barriers to running a node are reduced to effectively zero. Users wil benefit from secure, permissionless access to Ethereum without having to sacrifice noticeable disk space or CPU on their computer or mobile phone. and will not have to rely on third parties for network access when they use apps.
