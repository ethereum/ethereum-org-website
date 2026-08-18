---
title: Confidential systems for organizations
metaTitle: Confidential systems for organizations | ethereum.org
description: Explore privacy architecture for organizational Ethereum systems, including selective disclosure, proofs, confidential execution, and key management.
lang: en
template: static
sidebarDepth: 2
image: /images/eth.png
alt: Ethereum logo
---

Organizations need to protect commercial information, personal data, and sensitive relationships. Start by deciding what must be proven, what must remain confidential, and who should choose disclosure.

## Start from the information flow {#start-from-the-information-flow}

Identify people affected, facts that must be proven, confidential information, who may request disclosure, consequences of provider failure, and a person’s ability to exit without publishing unnecessary data.

## Privacy is not the opposite of accountability {#privacy-is-not-the-opposite-of-accountability}

Selective disclosure can prove eligibility, authorization, or a policy check without exposing an entire identity, transaction history, or business relationship.

## Architectural approaches {#architectural-approaches}

- **Offchain data and onchain proofs** can reduce public exposure but create data-availability, integrity, and operator-trust questions.
- **Selective disclosure and zero-knowledge proofs** prove a condition without revealing data; issuers, revocation, and user experience still matter.
- **Confidential execution or encrypted data** limit who reads information, but key management and recovery assumptions must be explicit.
- **Privacy-preserving transactions** protect amounts, participants, or links; assess the detailed threat model, not only a label.

## What to weigh {#what-to-weigh}

Privacy mechanisms differ in maturity, cost, liquidity effects, regulatory context, and talent requirements. Privacy should protect users as well as institutions; compliance should aim for proportionate, bounded disclosure.

For specialist privacy patterns, technical building blocks, and jurisdictional context, see [EthSystems](https://ethsystems.org/).
