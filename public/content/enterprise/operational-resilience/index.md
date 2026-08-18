---
title: Operating resilient Ethereum systems
metaTitle: Operating resilient Ethereum systems | ethereum.org
description: Plan for security and operational resilience across contracts, keys, providers, governance, and incident response in Ethereum systems.
lang: en
template: static
sidebarDepth: 2
image: /images/eth.png
heroImage: /images/trillion-dollar-security/hero.png
heroImageWidth: 3328
heroImageHeight: 1408
alt: Ethereum logo
---

Security is a system property, not a checkbox. An Ethereum application depends on people, key management, software, data sources, wallets, bridges, providers, processes, governance, and user communication.

## A secure system makes dependencies visible {#a-secure-system-makes-dependencies-visible}

Map each component, who controls it, how it can fail, and the capabilities that remain available after a failure. Reduce opaque dependency and preserve credible recovery and exit paths.

## Operating areas {#operating-areas}

- **Smart contracts:** minimize complexity, test thoroughly, review independently, and make upgrade authority legible.
- **Keys and custody:** decide who controls assets and permissions, and how recovery, rotation, and compromise are handled.
- **Third-party dependencies:** map providers, oracles, bridges, relayers, and sequencers; plan for replacement or failure.
- **Operations and incidents:** establish monitoring, runbooks, disclosures, and narrow, time-bounded emergency authority before launch.
- **Governance and upgrades:** minimize power over core user rights and explain who can change what.

## Prepare for failure, not just launch {#prepare-for-failure-not-just-launch}

Monitor system health and authority changes. Practice incident response. Communicate clearly with affected users and share learnings after an incident.

For ecosystem-wide security challenges and research, see [Trillion-Dollar Security](/reports/trillion-dollar-security/).
