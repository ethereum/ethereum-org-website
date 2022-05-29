---
title: Decentralized Identity 
description: An overview of decentralized identity on Ethereum
lang: en
template: use-cases
emoji: ":id:"
sidebar: true
sidebarDepth: 2
summaryPoint1: Centralized identity systems are fragmented, poorly secured, and offer minimal privacy protection
summaryPoint2: Decentralized identity increases personal control of one's identity information.
summaryPoint3: Decentralized ID projects built on Ethereum can revolutionize identity management. 
---


## What is identity {#what-is-identity}

Identity means an individual's sense of self, defined by unique characteristics. Identity refers to being an _individual_, i.e., a distinct human entity. Identity could also refer to other non-human entities, such as an organization or authority.

## What are identifiers? {#what-are-identifiers}

An identifier is a piece of information that helps build a person's identity. Common identifiers include: 

- Name
- Social security number/tax ID number 
- Mobile number 
- Date and place of birth
- Digital identification credentials, e.g., email addresses, usernames, avatars

It is important to understand that in these traditional examples of identifiers that _issuance_ and _control_ over these identifiers are maintained by a central agency. For example, legal names require permission from a government for issuance or before being changed, and changes to your social media handle require permission from the platform. 

## What are attestations? {#what-are-attestations}
 
An attestation is a claim made by one entity about another entity. If you live in the United States, the driver's license issued to you by the Department of Motor Vehicles (one entity) attests that you (another entity) are legally allowed to drive a car.

Attestations are different from identifiers. An attestation _contains_ identifiers to reference a particular identity, and makes a claim about an attribute related to this identity. So, your driver's license has identifiers (name, date of birth, address) but is also the attestation about your legal right to drive.

## What are decentralized identifiers? {#what-are-decentralized-identifiers}

Traditional identifiers like your legal name or email address rely on third parties—governments and email providers. Decentralized identifiers (DIDs) are different—they aren't issued, managed, or controlled by any central entity.

Decentralized identifiers are issued, held, and controlled by individuals. An [Ethereum account](/developers/docs/accounts/) is an example of a decentralized identifier. You can create as many accounts as you want without permission from anyone and without the need to store them in a central registry.

Decentralized identifiers are stored on distributed ledgers (blockchains) or peer-to-peer networks. This makes DIDs [globally unique, resolvable with high availability, and cryptographically verifiable](https://w3c-ccg.github.io/did-primer/). A decentralized identifier can be associated with different entities, including people, organizations, or government institutions.  

## What makes this possible? {#what-makes-decentralized-identifiers-possible} 

### 1. Public Key Infrastructure (PKI) {#public-key-infrastructure} 

Public-key infrastructure (PKI) is an information security measure that generates a [public key](/glossary/#public-key) and [private key](/glossary/#private-key) for an entity. Public-key cryptography is used in blockchain networks to authenticate user identities and prove ownership of digital assets. 

A DID, like an Ethereum account, will have a private key and a public key. While the private key is used for encrypting and signing messages, the public key authenticates the identity of the entity controlling a DID. PKI provides proofs needed to authenticate entities and prevent impersonation and use of fake identities.

### 2. Decentralized datastores {#decentralized-datastores}

A blockchain serves as a verifiable data registry: an open, trustless, and decentralized repository of information. The existence of public blockchains eliminates the need to store identifiers in centralized registries.

If anyone needs to confirm the validity of a decentralized identifier, they can look up the associated public key on the blockchain. This is different from traditional identifiers that require third parties to authenticate.

## How do decentralized identifiers and attestations enable decentralized identity? {#how-decentralized-identifiers-and-attestations-enable-decentralized-identity} 

Decentralized identity is the idea that identity-related information should be self-controlled, private, and portable, with decentralized identifiers and attestations being the primary building blocks.

In the context of decentralized identity, attestations (also known as [Verifiable Credentials](https://www.w3.org/TR/vc-data-model/)) are tamper-proof, cryptographically verifiable claims made by the issuer. Every attestation or Verifiable Credential an entity (e.g., an organization) issues is associated with their DID. 

Because DIDs are stored on the blockchain, anyone can verify the validity of an attestation by cross-checking the issuer's DID on Ethereum. Essentially, the Ethereum blockchain acts like a global directory that enables the verification of DIDs associated with certain entities.

Decentralized identifiers are the reason attestations are self-controlled and verifiable. Even if the issuer doesn't exist anymore, the holder always has proof of the attestation's provenance and validity. 

Decentralized identifiers are also crucial to protecting the privacy of personal information through decentralized identity. For instance, if an individual submits proof of an attestation (a driver's license), the verifying party doesn't need to check the validity of information in the proof. Instead, the verifier only needs cryptographic guarantees of the attestation's authenticity and the identity of the issuing organization to determine if the proof is valid. 

## Types of attestations in decentralized identity {#types-of-attestations-in-decentralized-identity}

How attestation information is stored and retrieved in an Ethereum-based identity ecosystem is different from traditional identity management. Here is an overview of the various approaches to issuing, storing, and verifying attestations in decentralized identity systems: 

### Off-chain attestations {#off-chain-attestations}

One concern with storing attestations on-chain is that they might contain information individuals want to keep private. The public nature of the Ethereum blockchain makes it unattractive to store such attestations. 

The solution is to issue attestations, held by users off-chain in digital wallets, but signed with the issuer's DID stored on-chain. These attestations are encoded as [JSON Web Tokens](https://en.wikipedia.org/wiki/JSON_Web_Token) and contain the issuer's digital signature—which allows for easy verification of off-chain claims.

Here's an hypothetical scenario to explain off-chain attestations:

1. A university (the issuer) generates an attestation (a digital academic certificate), signs with its keys, and issues it to Bob (the identity owner). 

2. Bob applies for a job and wants to prove his academic qualifications to an employer, so he shares the attestation from his mobile wallet. The company (the verifier) can then confirm the validity of the attestation by checking the issuer's DID (i.e., its public key on Ethereum). 

### Off-chain attestations with persistent access {#offchain-attestations-with-persistent-access}

Under this arrangement attestations are transformed into JSON files and stored off-chain (ideally on a [decentralized cloud storage](/developers/docs/storage/) platform, such as IPFS or Swarm). However, a hash of the JSON file is stored on-chain and linked to a DID via an on-chain registry. The associated DID could either be that of the issuer of the attestation or the recipient. 

This approach enables attestations to gain blockchain-based persistence, while keeping claims information encrypted and verifiable. It also allows for selective disclosure since the holder of the private key can decrypt the information. 

### On-chain attestations {#onchain-attestations}

On-chain attestations are held in [smart contracts](/developers/docs/smart-contracts/) on the Ethereum blockchain. The smart contract (acting as a registry) will map an attestation to a corresponding on-chain decentralized identifier (a public key).

Here's an example to show how on-chain attestations might work in practice:

1. A company (XYZ Corp) plans to sell ownership shares using a smart contract but only wants buyers that have completed a background check.

2. XYZ Corp can have the company performing background checks to issue on-chain attestations on Ethereum. This attestation certifies that an individual has passed the background check without exposing any personal information.

3. The smart contract selling shares can check the registry contract for the identities of screened buyers, making it possible for the smart contract to determine who is permitted to buy shares or not.

## Benefits of decentralized identity {#benefits-of-decentralized-identity} 

1. Decentralized identity increases increases individual control of identifying information. Decentralized identifiers and attestations can be verified without relying on centralized authorities and third-party services. 

2. Decentralized identity solutions facilitates a trustless, seamless, and privacy-protecting method for verifying and managing user identity. 

3. Decentralized identity harnesses blockchain technology, which creates trust between different parties and provides cryptographic guarantees to prove the validity of attestations.

4. Decentralized identity makes identity data portable. Users store attestations and identifiers in mobile wallet and can share with any party of their choice. Decentralized identifiers and attestations are not locked into the database of the issuing organization. 

## Decentralized identity use-cases {#decentralized-identity-use-cases}

Decentralized identity has many potential use-cases:

### 1. Universal logins {#universal-dapp-logins} 
[Decentralized applications](/dapps/) can issue attestations to users, which can be stored in an Ethereum wallet. An attestation in this case could be an an [NFT](/nft/) granting the holder access to an online community. 

A [Sign-In with Ethereum](https://login.xyz/) function would then enable servers to confirm the user's Ethereum account and fetch the required attestation from their account address. This means users can access the dapp without inputting passwords or sharing personal information.  

### 2. KYC authentication {#kyc-authentication}

Using many online services requires individuals to provide attestations and credentials, such as a driving license or national passport. But this approach is problematic because private user information can be compromised and service providers cannot verify the authenticity of the attestation. 

Decentralized identity allows companies to skip on conventional Know-Your-Customer (KYC) processes and authenticate user identities via Verifiable Credentials. This reduces the cost of identity management and prevents the use of fake documentation. 

### 3. Voting and online communities {#voting-and-online-communities}

Online voting and social media are two novel applications for decentralized identity. Online voting schemes are susceptible to manipulation, especially if malicious actors create false identities to vote. Asking individuals to present on-chain attestations can improve the integrity of online voting processes. 

Decentralized identity can help create online communities that are free of fake accounts. For example, each user might have to authenticate their identity using an on-chain identity system, like the Ethereum Name Service, reducing the possibility of bots.

## Use decentralized identity {#use-decentralized-identity}

There are many ambitious projects using Ethereum as a foundation for decentralized identity solutions:

- **[Ethereum Name Service (ENS)](https://ens.domains/)** - _A decentralized naming system for on-chain, machine-readable identifiers, like, Ethereum wallet addresses, content hashes, and metadata._
- **[SpruceID](https://www.spruceid.com/)** - _A decentralized identity project which allows users to control digital identity with Ethereum accounts and ENS profiles instead of relying on third-party services._*
- **[Proof of Humanity](https://www.proofofhumanity.id)** - _Proof of Humanity (or PoH) is a social identity verification system built on Ethereum._
- **[BrightID](https://www.brightid.org/)** - _A decentralized, open-source social identity network seeking to reform identity verification through the creation and analysis of a social graph._


## Further reading {#further-reading}

- [Blockchain Use Cases: Blockchain in Digital Identity](https://consensys.net/blockchain-use-cases/digital-identity/) by ConsenSys
- [What is Ethereum ERC725? Self-Sovereign Identity Management on the Blockchain](https://cryptoslate.com/what-is-erc725-self-sovereign-identity-management-on-the-blockchain/) by Sam Town
- [How Blockchain Could Solve the Problem of Digital Identity](https://time.com/6142810/proof-of-humanity/) by Andrew R. Chow
- [What Is Decentralized Identity And Why Should You Care?](https://web3.hashnode.com/what-is-decentralized-identity) by Emmanuel Awosika

