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

<Callout title="Map the whole operating system" description="An application depends on people, keys, contracts, data sources, wallets, bridges, providers, governance, processes, and communication—not on code alone." />

## Operating areas {#operating-areas}

<Grid>
  <Card title="Contracts" description="Minimize complexity, test thoroughly, review independently, and make upgrade authority legible." emoji="01" />
  <Card title="Keys and custody" description="Decide who controls assets and permissions, and how recovery, rotation, and compromise are handled." emoji="02" />
  <Card title="Dependencies" description="Map providers, oracles, bridges, relayers, and sequencers; plan for replacement or failure." emoji="03" />
  <Card title="Operations" description="Establish monitoring, runbooks, disclosures, and narrow, time-bounded emergency authority before launch." emoji="04" />
  <Card title="Governance" description="Minimize power over core user rights and explain who can change what." emoji="05" />
</Grid>

## Prepare for failure, not just launch {#prepare-for-failure-not-just-launch}

Monitor system health and authority changes. Practice incident response. Communicate clearly with affected users and share learnings after an incident.

For ecosystem-wide security challenges and research, see [Trillion-Dollar Security](/reports/trillion-dollar-security/).
