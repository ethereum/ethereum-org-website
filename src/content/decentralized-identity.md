---
title: Decentralized Identity 
description: An overview of decentralized identity on Ethereum
lang: en
template: use-cases
emoji: ":id:"
sidebar: true
sidebarDepth: 2
summaryPoint1: Current identity systems are fragmented, poorly secured, and offer minimal privacy protection
summaryPoint2: Decentralized identity increases personal control of one's identity. 
summaryPoint3: Decentralized ID projects built on Ethereum can revolutionize identity management. 
---

# Decentralized Identity on Ethereum {#ethereum-decentralized-identity}

Identity underpins virtually every aspect of our lives today. For instance, using services like social media, digital banking, or online shopping require providing ID information, such as a name or email address.

However, current identity-management systems are far from perfect. Not only does centralized control of identity information put sensitive data at risk, but it also causes a fragmented experience for users.

The effects of poor identity management can have worse consequences in the real world. Individuals who lack identity documentation cannot access financial services, secure employment, or buy property.

To solve these problems, we have decentralized identity systems built on public blockchains like Ethereum. Decentralized identity hands users control over their personal information, while making it easier for entities to issue, claim, and verify credentials.

## What is decentralized identity? {#what-is-decentralized-identity}

“Identity” means unique data that describes a particular individual, such as your name or date of birth. It can also refer to a collection of claims about an individual, like an academic certificate, driving license, or immunization passport.

Up until now, identity information has always been issued and controlled by centralized authorities. A government might issue you a national passport and store your ID information on a server. To verify this claim, a third party—say an employer—would need to contact the issuer (i.e., the government).

A decentralized identity framework, however, gives individuals greater control of personal identity. In this setup, *you* hold your ID information in a digital wallet and control access to credentials.

Claims information are stored on a distributed ledger, making them secure and unalterable. More importantly, claims can be verified via cryptographic proof—without needing to rely on any centralized issuer.

Closely related to the concept of decentralized identity is “self-sovereign identity” (SSI). Self-sovereign identity is grounded in the idea that individual data should be self-controlled, private, and portable.

## Why does decentralized identity matter? {#benefits-of-decentralized-identity}

### A comparison of decentralized and centralized identity systems {#decentralized-identity-vs-centralized-identity}

| Decentralized identity                                                                                                  | Centralized identity                                                                     |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Users retain full control of personally identifiable information (PII) and can revoke access to ID information.         | Centralized authorities (governments) and third-party services control the issuance, storage, and use of personal information. |
| Identity information is stored on the blockchain and accessible to users via digital wallets.                           | Identity information is stored in centralized databases and data centers.               |
| Low risk of identity theft due to cryptographic security.                                                               | Databases are easy targets for malicious actors and can lead to theft and exploitation of sensitive information. |
| Protects the privacy of personal information through zero-knowledge proofs.                                             | Centralized identity management systems often violate individual privacy.              |
| Reduces the cost of identity and access management.                                                                     | Companies must invest in costly KYC authentication, fraud detection, and compliance measures.|
| Encourages user convenience through seamless authentication.                                                            | Leads to a cumbersome and fragmented online experience.                                    |
| Promotes inclusion, as anyone with an Internet-connected phone can claim and share ID information.                      | Many individuals cannot access physical documentation, cutting them off from access to basic services. | 

## How does decentralized identity work? {#how-does-decentralized-identity-work}

Most decentralized identity solutions have the following objectives:

1. Encourage the provenance and accuracy of claims information stored on the public blockchain.

2. Facilitate a trustless and privacy-protecting method for verifying identity information.

3. Increase individual control over the sharing of personal information with third parties.

The decentralized identity framework works off the following components:

### Public Key Infrastructure (PKI) 

Public-key infrastructure, which underpins Ethereum, Bitcoin, and other cryptocurrencies, is crucial to decentralized identity. Public-key cryptography is an information security measure that generates a key pair (public and private key) for every entity.

While [public keys](https://ethereum.org/en/glossary/#public-key) can be shared widely, [private keys](https://ethereum.org/en/glossary/#private-key) are known only to the owner. PKI enables the authentication and encryption of information on the blockchain.

Public keys encrypt messages and prove that the holder of the corresponding private key sent the information. Private keys decrypt messages and protect information from unauthorized access.

### Decentralized datastores

Public blockchains serve as decentralized datastores for identity information (claims). Unlike a centralized database, information on a blockchain cannot be altered, stolen, or deleted.

Ethereum supports the decentralized identity framework by functioning as a "public claims registry" that allows for instant and trustless verification of claims.

That's because the blockchain stores the public keys of users. To know the sender and recipient of a message, we just need to find the associated public keys on Ethereum using a decentralized identity resolver.

### Decentralized identifiers (DIDs) 

The [World Wide Web Consortium (W3C) describes decentralized identifiers (DIDs)](https://www.w3.org/TR/did-core/) as "a new type of identifier that is globally unique, resolvable with high availability, and cryptographically verifiable." DIDs can be associated with different entities, including people, organizations, government institutions, or even IoT devices.

Each DID has a unique pair of private and public keys and is associated with claims data, commonly known as [verifiable credentials (VCs)](https://www.w3.org/TR/vc-data-model/). Verifiable credentials as tamper-proof, cryptographically verifiable claims made by an issuer.

### Smart contracts

Some decentralized identity systems built on Ethereum plan to use simple [smart contracts](https://ethereum.org/en/developers/docs/smart-contracts/) that allow users to manage blockchain-based IDs. An example is the proposed ERC-725 standard, a smart contract that can be controlled by multiple keys.

An identity smart contract allows entities to associate themselves with claims data. However, it would also give them the power to grant or revoke access to identity information.

Several identity-related standards have been proposed for Ethereum including:

- [ERC-1056](https://github.com/ethereum/EIPs/issues/1056)
- [ERC-1077/ERC-1078](https://medium.com/uport/erc1056-erc780-an-open-identity-and-claims-protocol-for-ethereum-aef7207bc744)
- [ERC-780](https://github.com/ethereum/EIPs/issues/780)
- [ERC-1484](https://github.com/ethereum/EIPs/issues/1495)
- [ERC-725/ERC-735](https://github.com/ethereum/EIPs/issues/725)

With that out of the way, here's a hypothetical demonstration of how decentralized identity might work in practice:

1. An issuer (a university) sends a credential (as a token) to your Ethereum wallet and signs the information with its private key.

2. To verify your identity, you share this credential with a third party (a company). Using a DID resolver, the company can find the associated public keys and prove the identity of the issuer (the university) and recipient (you).

3. In this setup, you wouldn't need to share the credential itself, just proof of its validity. This is because of zero-knowledge proof technology which allows us to authenticate information without revealing the information itself.

## Decentralized identity use-cases

Decentralized identity has many potential use-cases:

### Universal dApp logins

Using the information stored in their digital wallets, users can authenticate identity with different service providers without oversharing or duplicating ID information across platforms.

A [decentralized application](https://ethereum.org/en/dapps/) can issue verifiable credentials to users, allowing them access the platform once they connect their wallets. This eliminates the need for passwords, improving user experience and protecting individuals from ID thefts commonly executed through phishing attacks.

### KYC Authentication

Using many online services requires individuals to provide identity information, like a driving license. But this is problematic since a) Private user information can be compromised b) Companies cannot easily verify the authenticity of shared information.

With decentralized identity, companies can skip on burdensome KYC authentication and quickly verify user identities via decentralized identity utilities. And users don't have to exchange privacy for service access. A win-win for everyone.

### Voting and online communities

Online voting and social media are two novel applications for decentralized identity. Online voting schemes are susceptible to manipulation, especially if malicious actors create false identities to vote. Asking individuals to present verifiable credentials can improve the integrity of online voting processes.

Decentralized identity can enable the creation of online communities that are free fake accounts. Each user must authenticate their identity via a credential, reducing the possibility of bots overrunning social platforms.

### Decentralized identity applications on Ethereum

There are also many ambitious projects using Ethereum as a foundation for decentralized identity solutions:

- [3box](https://github.com/3box/3box#:~:text=The%203Box%20distributed%20user%20data,private%20data%20for%20Ethereum%20users.)
- [Jolocom](https://jolocom.io/)
- [Proof of Humanity](https://www.proofofhumanity.id/)
- [BrightID](https://www.brightid.org/)

## Further reading

- [Blockchain Use Cases: Blockchain in Digital Identity](https://consensys.net/blockchain-use-cases/digital-identity/) by ConsenSys
- [What is Ethereum ERC725? Self-Sovereign Identity Management on the Blockchain](https://cryptoslate.com/what-is-erc725-self-sovereign-identity-management-on-the-blockchain/) by Sam Town
- [How Blockchain Could Solve the Problem of Digital Identity](https://time.com/6142810/proof-of-humanity/) by Andrew R. Chow
- [Decentralized Identity Foundation blog](https://identity.foundation/)
