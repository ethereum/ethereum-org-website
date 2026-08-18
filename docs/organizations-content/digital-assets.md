# Designing digital asset systems

**Route:** `/enterprise/digital-assets`

## Hero

**H1:** Designing digital asset systems

Digital assets can represent a unit of value, a claim, a membership right, or a
record connected to something offchain. Ethereum can make selected rules for
issuance, transfer, settlement, and servicing programmable. It does not make
the underlying legal claim, reserves, redemption, or user protections disappear.

## What to design

### The claim

State exactly what the token represents, who owes what to whom, and which
offchain record prevails if the two diverge.

### The lifecycle

Design issuance, eligibility, transfer restrictions, corporate actions,
redemption, and winding down before launch. A token contract is part of a
larger operating system.

### Control and custody

Make administrative powers explicit. Who can issue, freeze, upgrade, pause, or
recover assets? How do users hold keys or delegate custody? What happens if a
key, wallet, issuer, custodian, or L2 fails?

### Privacy and interoperability

Decide which information should be public and what needs selective disclosure.
Open standards can increase compatibility, but also expand the risk surface.

## A simple system map

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

## What to weigh

- A token does not create liquidity, enforceability, or a market by itself.
- Administrative controls change a holder’s practical rights and must be
  proportionate and visible.
- Treat the contract, keys, attestations, bridges, and offchain claim as one
  security system.

## Explore next

[Stablecoins](/stablecoins/) explains stablecoin concepts for general audiences.
[Choosing an Ethereum architecture](/enterprise/architecture/) explains where a
system can run.
