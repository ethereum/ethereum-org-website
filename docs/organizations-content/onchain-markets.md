# Evaluating onchain market infrastructure

**Route:** `/enterprise/onchain-markets`

## Hero

**H1:** Evaluating onchain market infrastructure

Onchain markets use smart contracts to coordinate functions such as exchange,
lending, borrowing, collateral management, and settlement. Open standards can
make systems interoperable. They can also connect risks that would otherwise
remain separate.

## What is different

### Shared components

Assets and applications can interact through common interfaces rather than a
new bilateral integration for every participant.

### Programmable rules

Contract logic can automate actions, but the authority model, upgrade path, and
available remedies remain design choices.

### Continuous operation

Systems can operate beyond local business hours. That does not remove the need
for monitoring, incident response, or responsible user support.

### Verifiable state

Participants can inspect relevant onchain state, which can aid auditability but
also creates privacy and strategic-information concerns.

## A responsible evaluation checklist

- **Protocol design:** What does the contract do? Is code public? Who can
  upgrade, pause, or govern it?
- **Asset and market risk:** What collateral, liquidity, price data,
  liquidation rules, and dependencies are involved?
- **Counterparty and custody risk:** Who holds keys and controls permissions?
  What is the exit route?
- **Operational risk:** What must be monitored, reconciled, and communicated in
  an incident?
- **Legal and policy context:** Which obligations apply to the organization and
  its users?

## Composability needs boundaries

Map dependencies before connecting to them. Define authority boundaries and a
way to disengage from a component without trapping users or assets.

## Explore next

[Decentralized finance](/defi/) introduces DeFi for general audiences.
[Operating resilient Ethereum systems](/enterprise/operational-resilience/)
covers operational dependencies.
