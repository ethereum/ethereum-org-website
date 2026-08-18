---
title: Open infrastructure for organizations
metaTitle: Open infrastructure for organizations | ethereum.org
description: Understand how Ethereum changes the trust boundary for systems shared by organizations, and where a conventional system is a better fit.
lang: en
template: static
sidebarDepth: 2
image: /images/eth.png
heroImage: /images/infrastructure_transparent.png
heroImageWidth: 1687
heroImageHeight: 1365
alt: Ethereum logo
---

Most infrastructure decisions are decisions about control: who can change the terms, stop access, inspect activity, or make a system disappear. Ethereum is a shared base layer whose rules are public and whose operation does not depend on a single company or institution.

## What changes when the base layer is shared {#what-changes-when-the-base-layer-is-shared}

### Censorship resistance {#censorship-resistance}

No actor should be able to selectively exclude valid use or break core functionality. Your application may still depend on providers and operators; those dependencies should have credible alternatives and exit paths.

### Open source and free access {#open-source-and-free-access}

The software and standards can be inspected, implemented, and replaced. This does not make every application open source, but it gives organizations a way to avoid treating a single vendor as the permanent source of truth.

### Privacy {#privacy}

Ethereum’s base layer is public, so privacy needs deliberate design. The goal is not secrecy for its own sake, but meaningful control over what a person or organization discloses and to whom.

### Security {#security}

Security is the ability to verify that a system does what it claims and no more. It depends on the protocol and also on contracts, keys, data sources, providers, operations, and governance.

## Choose the smallest trust boundary that fits {#choose-the-smallest-trust-boundary-that-fits}

| Need | Direction | Trade-off |
| --- | --- | --- |
| Shared settlement and durable ownership | Ethereum Mainnet | Strong base-layer independence; public data and variable fees need planning. |
| Lower-cost execution | Existing L2 | Better execution characteristics; assess governance, data availability, and exits. |
| Tailored workflow | Custom L2 or application layer | More control, but more operational and interoperability responsibility. |
| One trusted operator | Conventional system | Simpler, but the operator remains the trust boundary. |

## What this does not solve {#what-this-does-not-solve}

Ethereum does not remove the need for legal analysis, product design, user support, secure key management, or accountable governance. It changes which parts of the system need to be trusted.
