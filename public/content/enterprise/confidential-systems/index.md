---
title: Confidential systems for organizations
metaTitle: Confidential systems for organizations | ethereum.org
description: Explore privacy architecture for organizational Ethereum systems, including selective disclosure, proofs, confidential execution, and key management.
lang: en
template: static
sidebarDepth: 2
image: /images/eth.png
heroImage: /images/enterprise.png
heroImageWidth: 309
heroImageHeight: 297
alt: Ethereum logo
---

Organizations need to protect commercial information, personal data, and sensitive relationships. Start by deciding what must be proven, what must remain confidential, and who should choose disclosure.

## Start from the information flow {#start-from-the-information-flow}

Identify people affected, facts that must be proven, confidential information, who may request disclosure, consequences of provider failure, and a person’s ability to exit without publishing unnecessary data.

<Grid>
  <Card title="What must be proven?" description="Separate the fact a counterparty needs to verify from the data they do not need to receive." emoji="01" />
  <Card title="Who controls disclosure?" description="Make the disclosure decision and the circumstances in which it can change explicit." emoji="02" />
  <Card title="What survives failure?" description="Test whether people can recover records and exercise their rights without publishing unnecessary data." emoji="03" />
</Grid>

## Privacy is not the opposite of accountability {#privacy-is-not-the-opposite-of-accountability}

Selective disclosure can prove eligibility, authorization, or a policy check without exposing an entire identity, transaction history, or business relationship.

## Architectural approaches {#architectural-approaches}

<Grid>
  <Card title="Offchain data + onchain proofs" description="Can reduce public exposure, while introducing data-availability, integrity, and operator-trust questions." emoji="A" />
  <Card title="Selective disclosure + proofs" description="Can prove a condition without revealing data; issuers, revocation, and user experience still matter." emoji="B" />
  <Card title="Confidential execution" description="Can limit who reads information, while making key management and recovery assumptions critical." emoji="C" />
  <Card title="Privacy-preserving transactions" description="Can protect amounts, participants, or links; assess a detailed threat model, not a label." emoji="D" />
</Grid>

## What to weigh {#what-to-weigh}

Privacy mechanisms differ in maturity, cost, liquidity effects, regulatory context, and talent requirements. Privacy should protect users as well as institutions; compliance should aim for proportionate, bounded disclosure.

For specialist privacy patterns, technical building blocks, and jurisdictional context, see [EthSystems](https://ethsystems.org/).
