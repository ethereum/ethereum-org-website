---
title: Designing digital asset systems
metaTitle: Designing digital asset systems | ethereum.org
description: Questions for organizations designing digital assets on Ethereum, including claims, lifecycle, custody, controls, and privacy.
lang: en
template: static
sidebarDepth: 2
image: /images/eth.png
alt: Ethereum logo
---

Digital assets can represent a unit of value, a claim, a membership right, or a record connected to something offchain. Ethereum can make selected rules for issuance, transfer, settlement, and servicing programmable. It does not make the underlying legal claim, reserves, redemption, or user protections disappear.

## What to design {#what-to-design}

### The claim {#the-claim}

State exactly what the token represents, who owes what to whom, and which offchain record prevails if the two diverge.

### The lifecycle {#the-lifecycle}

Design issuance, eligibility, transfer restrictions, corporate actions, redemption, and winding down before launch. A token contract is part of a larger operating system.

### Control and custody {#control-and-custody}

Make administrative powers explicit. Who can issue, freeze, upgrade, pause, or recover assets? How do users hold keys or delegate custody? What happens if a key, wallet, issuer, custodian, or L2 fails?

### Privacy and interoperability {#privacy-and-interoperability}

Decide which information should be public and what needs selective disclosure. Open standards can increase compatibility, but also expand the risk surface.

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

## What to weigh {#what-to-weigh}

- A token does not create liquidity, enforceability, or a market by itself.
- Administrative controls change a holder’s practical rights and must be proportionate and visible.
- Treat the contract, keys, attestations, bridges, and offchain claim as one security system.

Continue with [stablecoins](/stablecoins/) or [choosing an Ethereum architecture](/enterprise/architecture/).
