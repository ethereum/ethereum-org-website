---
title: Designing verifiable credential systems
metaTitle: Designing verifiable credential systems | ethereum.org
description: How organizations can design portable, privacy-preserving, and verifiable credential systems using Ethereum standards and tools.
lang: en
template: static
sidebarDepth: 2
image: /images/eth.png
alt: Ethereum logo
---

Organizations often need to verify a claim: eligibility, membership, a licence, an accreditation, or authority to act. Verifiable credentials can let someone prove a claim without requiring every verifier to query the issuer’s database or receive more personal information than necessary.

## The design problem {#the-design-problem}

The goal is not to put identity on a blockchain. It is to give people portable, verifiable claims while minimizing data collection and dependence on one provider.

## Core choices {#core-choices}

### Issuance and authority {#issuance-and-authority}

Who is allowed to issue a claim, and why should a verifier trust that issuer? Document the credential schema and authority model.

### Holder control {#holder-control}

Can the person or organization hold and present a credential independently? Can they choose what to disclose?

### Revocation and updates {#revocation-and-updates}

Credentials need a legible way to expire, be corrected, or be revoked without creating unnecessary tracking.

### Privacy and accessibility {#privacy-and-accessibility}

Use selective disclosure where possible. Do not assume that every holder has a smartphone, persistent internet connection, or the ability to manage keys.

## What to weigh {#what-to-weigh}

- An onchain anchor or proof does not make a claim true; it makes the claim and its history easier to verify.
- Identity systems can create power asymmetries. Design for the person whose information is at stake, not only the organization requesting it.
- A credential should remain verifiable if an issuer’s vendor changes or fails.

Continue with [decentralized identity](/decentralized-identity/) or [confidential systems](/enterprise/confidential-systems/).
