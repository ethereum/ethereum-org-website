---
title: Evaluating onchain market infrastructure
metaTitle: Evaluating onchain market infrastructure | ethereum.org
description: A framework for evaluating Ethereum-based markets, including protocol, asset, custody, operational, and governance risks.
lang: en
template: static
sidebarDepth: 2
image: /images/eth.png
heroImage: /images/enterprise-eth.png
heroImageWidth: 2263
heroImageHeight: 1433
alt: Ethereum logo
---

Onchain markets use smart contracts to coordinate functions such as exchange, lending, borrowing, collateral management, and settlement. Open standards can make systems interoperable. They can also connect risks that would otherwise remain separate.

## What is different {#what-is-different}

<Grid>
  <Card title="Shared components" description="Assets and applications can interact through common interfaces rather than a new bilateral integration for every participant." emoji="↔" />
  <Card title="Programmable rules" description="Contract logic can automate actions, but authority, upgrade paths, and available remedies remain design choices." emoji="{}" />
  <Card title="Continuous operation" description="Systems can operate beyond local business hours. Monitoring, incident response, and responsible user support still matter." emoji="24" />
  <Card title="Verifiable state" description="Participants can inspect relevant onchain state, aiding auditability while introducing privacy and strategic-information concerns." emoji="◌" />
</Grid>

## A responsible evaluation checklist {#a-responsible-evaluation-checklist}

- **Protocol design:** What does the contract do? Is code public? Who can upgrade, pause, or govern it?
- **Asset and market risk:** What collateral, liquidity, price data, liquidation rules, and dependencies are involved?
- **Counterparty and custody risk:** Who holds keys and controls permissions? What is the exit route?
- **Operational risk:** What must be monitored, reconciled, and communicated in an incident?
- **Legal and policy context:** Which obligations apply to the organization and its users?

<Callout title="Composability needs boundaries" description="Map dependencies before connecting to them. Define authority boundaries and a way to disengage from a component without trapping users or assets." />

## Composability needs boundaries {#composability-needs-boundaries}

Map dependencies before connecting to them. Define authority boundaries and a way to disengage from a component without trapping users or assets.

Continue with [decentralized finance](/defi/) or [operating resilient Ethereum systems](/enterprise/operational-resilience/).
