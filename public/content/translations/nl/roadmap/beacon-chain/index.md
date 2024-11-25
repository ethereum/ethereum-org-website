---
title: De Beacon Chain
description: Leer meer over de Beacon Chain - de upgrade die proof-of-stake Ethereum introduceerde.
lang: nl
template: upgrade
image: /images/upgrades/core.png
alt:
summaryPoint1: De Beacon Chain introduceerde proof-of-stake in het Ethereum-ecosysteem.
summaryPoint2: Het werd samengevoegd met de oorspronkelijke Ethereum proof-of-work-chain in september 2022.
summaryPoint3: De Beacon Chain introduceerde de consensuslogica en het block gossip protocol dat Ethereum nu beveiligt.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  De Beacon Chain werd op 1 december 2020 beschikbaar, en formaliseerde proof-of-stake als het consensusmechanisme van Ethereum met de samenvoegingsupgrade op 15 september 2022.
</UpgradeStatus>

## Wat is de Beacon Chain? {#what-is-the-beacon-chain}

De Beacon Chain is de naam van de originele proof-of-stake blockchain die werd gelanceerd in 2020. Het werd gecreëerd om ervoor te zorgen dat de proof-of-stake consensuslogica degelijk en duurzaam was voordat het op het hoofdnet van Ethereum werd gebruikt. Daarom functioneerde het parallel aan het originele proof-of-work Ethereum. De Beacon Chain was een chain van 'lege' blocks, maar het uitschakelen van proof-of-work en het inschakelen van proof-of-stake op Ethereum betekende dat de Beacon Chain geïnstrueerd moest worden om transactiegegevens van uitvoerende clients te accepteren, ze te bundelen in blocks en ze vervolgens te organiseren in een blockchain via een op proof-of-stake gebaseerd consensusmechanisme. Op hetzelfde moment schakelden de oorspronkelijke Ethereum-clients hun mining, block propagation en consensuslogica uit en droegen ze alles over aan de Beacon Chain. Deze gebeurtenis stond bekend als [de samenvoeging.](/roadmap/merge/). Zodra de samenvoeging had plaatsgevonden, waren er niet langer twee blockchains. Er was slechts één proof-of-stake Ethereum, dat nu twee verschillende clients per node vereist. De Beacon Chain is nu de consensuslaag, een peer-to-peer netwerk van consensusclients dat block gossip en consensuslogica verwerkt, terwijl de oorspronkelijke clients de uitvoeringslaag vormen, welke verantwoordelijk is voor gossiping en het uitvoeren van transacties, en het beheren van de status van Ethereum. De twee lagen kunnen met elkaar communiceren via de engine API.

## Wat doet de Beacon Chain? {#what-does-the-beacon-chain-do}

De naam Beacon Chain werd gegeven aan de ledger van accounts die het netwerk van Ethereum [stakers](/staking/) leidde en coördineerde voordat diezelfde stakers begonnen met het valideren van echte Ethereum-blocks. Het verwerkt echter geen transacties of interacties met smart contracts, aangezien dit wordt gedaan in de uitvoeringslaag. De Beacon Chain is verantwoordelijk voor zaken als het afhandelen van blocks en bevestigingen, het uitvoeren van het algoritme voor de forkkeuze en het regelen van beloningen en straffen. Ontdek meer op onze [node-architectuurpagina](/developers/docs/nodes-and-clients/node-architecture/#node-comparison).

## Impact Beacon Chain {#beacon-chain-features}

### Introductie van staking {#introducing-staking}

De Beacon Chain introduceerde [proof-of-stake](/developers/docs/consensus-mechanisms/pos/) aan Ethereum. Dit houdt Ethereum veilig en levert validators meer ETH op in het proces. In de praktijk komt staking neer op het staken van ETH om validatorsoftware te activeren. Als staker voert u de software uit die nieuwe blocks in de chain creëert en valideert.

Staking heeft hetzelfde doel als [mining](/developers/docs/consensus-mechanisms/pow/mining/), maar is in veel opzichten anders. Mining vereiste grote initiële uitgaven in de vorm van krachtige hardware en energieverbruik, wat schaalvoordelen opleverde en centralisatie bevorderde. Mining kwam ook niet met de eis om activa te vergrendelen als borg, waardoor de mogelijkheid van het protocol om slechte actoren te straffen na een aanval werd beperkt.

De overgang naar proof-of-stake maakte Ethereum aanzienlijk veiliger en gedecentraliseerder in vergelijking met proof-of-work. Hoe meer mensen deelnemen aan het netwerk, hoe meer gedecentraliseerd en veilig het wordt tegen aanvallen.

Bovendien is proof-of-stake gebruiken als consensusmechanisme een fundamenteel onderdeel voor het [veilige, milieuvriendelijke en schaalbare Ethereum van nu](/roadmap/vision/).

<InfoBanner emoji=":money_bag:">
  Wilt u een validator worden en de Beacon Chain beveiligen? <a href="/staking/">Ontdek dan hier meer over staking</a>.
</InfoBanner>

### Voorbereiden van sharding {#setting-up-for-sharding}

Sinds de Beacon Chain samengevoegd is met het originele hoofdnet van Ethereum, is de Ethereum-gemeenschap begonnen met het opschalen van het netwerk.

Proof-of-stake heeft het voordeel dat er een register is van alle goedgekeurde blockproducenten op elk gegeven moment, elk met een stake in ETH. Dit register maakt verdeel-en-heers mogelijk, maar verdeelt op een betrouwbare manier specifieke netwerkverantwoordelijkheden.

Deze verantwoordelijkheid staat in contrast met proof-of-work, waarbij miners geen verplichtingen hebben naar het netwerk toe, kunnen stoppen met minen en hun nodesoftware ogenblikkelijk en zonder gevolgen uitschakelen. Er is ook geen register van bekende blockvoorstellers en geen betrouwbare manier om netwerkverantwoordelijkheden veilig te verdelen.

[Meer over sharding](/roadmap/danksharding/)

## Verband tussen upgrades {#relationship-between-upgrades}

Alle Ethereum-upgrades zijn ietwat met elkaar verbonden. Laten we nu even samenvatten hoe de Beacon Chain de andere upgrades beïnvloedt.

### Beacon Chain en de samenvoeging {#merge-and-beacon-chain}

Aanvankelijk bestond The Beacon Chain apart van het hoofdnet van Ethereum, maar in 2022 werden ze samengevoegd.

<ButtonLink href="/roadmap/merge/">
  De samenvoeging
</ButtonLink>

### Shards en de Beacon Chain {#shards-and-beacon-chain}

Sharding kan alleen veilig zijn intrede doen in het Ethereum-ecosysteem met een proof-of-stake consensusmechanisme. De Beacon Chain introduceerde staking, wat 'samengevoegd' werd met het hoofdnet en zo het pad effende voor sharding om Ethereum verder te helpen opschalen.

<ButtonLink href="/roadmap/danksharding/">
  Shard-chains
</ButtonLink>

## Verder lezen

- [Meer over Ethereum's toekomstige upgrades](/roadmap/vision)
- [Meer over node-architectuur](/developers/docs/nodes-and-clients/node-architecture)
- [Meer over proof-of-stake](/developers/docs/consensus-mechanisms/pos)
