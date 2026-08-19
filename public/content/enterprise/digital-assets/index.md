---
title: Designing digital asset systems
metaTitle: Designing digital asset systems | ethereum.org
description: Questions for organizations designing digital assets on Ethereum, including claims, lifecycle, custody, controls, and privacy.
lang: en
template: static
sidebarDepth: 2
image: /images/eth.png
heroImage: /images/enterprise-eth.png
heroImageWidth: 2263
heroImageHeight: 1433
alt: Ethereum logo
---

Digital assets can represent a unit of value, a claim, a membership right, or a record connected to something offchain. Ethereum can make selected rules for issuance, transfer, settlement, and servicing programmable. It does not make the underlying legal claim, reserves, redemption, or user protections disappear.

## What to design {#what-to-design}

<Grid>
  <Card title="1. The claim" description="State exactly what the token represents, who owes what to whom, and which offchain record prevails if the two diverge." emoji="1" />
  <Card title="2. The lifecycle" description="Design issuance, eligibility, transfer restrictions, corporate actions, redemption, and winding down before launch. A token contract is part of a larger operating system." emoji="2" />
  <Card title="3. Control and custody" description="Make powers explicit: issue, freeze, upgrade, pause, recover. Decide how users hold keys or delegate custody, and what happens when a key, wallet, issuer, custodian, or L2 fails." emoji="3" />
  <Card title="4. Privacy and interoperability" description="Decide which information is public and what needs selective disclosure. Open standards can increase compatibility, but also expand the risk surface." emoji="4" />
</Grid>

## A simple system map {#a-simple-system-map}

```text
Legal / economic claim
        ↓
Issuer and servicing rules
        ↓
Token contract and open interfaces
        ↓
Network and settlement choice
        ↓
Wallet, custody, recovery, and disclosure experience
```

<Callout title="Design the whole system" description="The token contract, legal claim, keys, attestations, bridges, and offchain servicing form one system. Assess its rights and failure modes together." />

## What to weigh {#what-to-weigh}

- A token does not create liquidity, enforceability, or a market by itself.
- Administrative controls change a holder’s practical rights and must be proportionate and visible.
- Treat the contract, keys, attestations, bridges, and offchain claim as one security system.

Continue with [stablecoins](/stablecoins/) or [choosing an Ethereum architecture](/enterprise/architecture/).
