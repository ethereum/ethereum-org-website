---
title: Die Beacon Chain
description: "Erfahren Sie mehr über die Beacon Chain – das Upgrade, das Proof-of-Stake bei Ethereum eingeführt hat."
lang: de
template: upgrade
image: /images/upgrades/core.png
alt: 
summaryPoint1: "Die Beacon Chain führte Proof-of-Stake in das Ethereum-Ökosystem ein."
summaryPoint2: "Sie wurde im September 2022 mit der ursprünglichen Ethereum-Proof-of-Work-Chain zusammengeführt."
summaryPoint3: "Die Beacon Chain führte die Konsenslogik und das Block-Gossip-Protokoll ein, die nun Ethereum sichern."
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Die Beacon Chain wurde am 1. Dezember 2020 veröffentlicht und formalisierte Proof-of-Stake als Konsensmechanismus von Ethereum mit dem The Merge-Upgrade am 15. September 2022.
</UpgradeStatus>

## Was ist die Beacon Chain? {#what-is-the-beacon-chain}

Die Beacon Chain ist der Name der ursprünglichen Proof-of-Stake-Blockchain, die 2020 gestartet wurde. Sie wurde entwickelt, um sicherzustellen, dass die Proof-of-Stake-Konsenslogik solide und nachhaltig ist, bevor sie im [Ethereum](/)-Mainnet aktiviert wird. Daher lief sie parallel zum ursprünglichen Proof-of-Work-Ethereum. Die Beacon Chain war eine Chain aus „leeren“ Blöcken, aber das Abschalten von Proof-of-Work und das Einschalten von Proof-of-Stake bei Ethereum erforderte, die Beacon Chain anzuweisen, Transaktionsdaten von Ausführungs-Clients zu akzeptieren, sie in Blöcke zu bündeln und sie dann mithilfe eines auf Proof-of-Stake basierenden Konsensmechanismus in einer Blockchain zu organisieren. Im selben Moment schalteten die ursprünglichen Ethereum-Clients ihr Mining, ihre Blockverbreitung und ihre Konsenslogik ab und übergaben all dies an die Beacon Chain. Dieses Ereignis wurde als [The Merge](/roadmap/merge/) bekannt. Sobald The Merge stattfand, gab es keine zwei Blockchains mehr. Stattdessen gab es nur noch ein Proof-of-Stake-Ethereum, das nun zwei verschiedene Clients pro Blockchain-Knoten erfordert. Die Beacon Chain ist nun die Konsensebene, ein Peer-to-Peer-Netzwerk von Konsens-Clients, das Block-Gossip und Konsenslogik handhabt, während die ursprünglichen Clients die Ausführungsebene bilden, die für das Verbreiten und Ausführen von Transaktionen sowie die Verwaltung des Zustands von Ethereum verantwortlich ist. Die beiden Ebenen können über die Engine-API miteinander kommunizieren.

## Was macht die Beacon Chain? {#what-does-the-beacon-chain-do}

Die Beacon Chain ist der Name für einen Ledger von Konten, der das Netzwerk der Ethereum-[Staker](/staking/) leitete und koordinierte, bevor diese Staker begannen, echte Ethereum-Blöcke zu validieren. Sie verarbeitet jedoch keine Transaktionen oder handhabt Smart Contract-Interaktionen, da dies in der Ausführungsebene geschieht.
Die Beacon Chain ist für Dinge wie die Handhabung von Blöcken und Bestätigungen, die Ausführung des Fork-Choice-Algorithmus und die Verwaltung von Belohnungen und Strafen verantwortlich.
Lesen Sie mehr auf unserer [Seite zur Blockchain-Knoten-Architektur](/developers/docs/nodes-and-clients/node-architecture/#node-comparison).

## Auswirkungen der Beacon Chain {#beacon-chain-features}

### Einführung von Staking {#introducing-staking}

Die Beacon Chain führte [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) bei Ethereum ein. Dies hält Ethereum sicher und bringt den Validatoren dabei mehr ETH ein. In der Praxis beinhaltet Staking den Einsatz von ETH, um die Validator-Software zu aktivieren. Als Staker führen Sie die Software aus, die neue Blöcke in der Chain erstellt und validiert.

Staking erfüllt einen ähnlichen Zweck wie früher das [Mining](/developers/docs/consensus-mechanisms/pow/mining/), unterscheidet sich jedoch in vielerlei Hinsicht. Mining erforderte große Vorabausgaben in Form von leistungsstarker Hardware und Energieverbrauch, was zu Skaleneffekten führte und die Zentralisierung förderte. Beim Mining gab es auch keine Anforderung, Vermögenswerte als Sicherheit zu sperren, was die Fähigkeit des Protokolls einschränkte, böswillige Akteure nach einem Angriff zu bestrafen.

Der Übergang zu Proof-of-Stake machte Ethereum im Vergleich zu Proof-of-Work deutlich sicherer und dezentralisierter. Je mehr Menschen am Netzwerk teilnehmen, desto dezentralisierter und sicherer vor Angriffen wird es.


<Alert variant="update">
<AlertEmoji text=":money_bag:"/>
<AlertContent>
<AlertDescription>
  Wenn Sie daran interessiert sind, ein Validator zu werden und dabei zu helfen, Ethereum zu sichern, [erfahren Sie mehr über Staking](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

### Vorbereitung auf Sharding {#setting-up-for-sharding}

Seit die Beacon Chain mit dem ursprünglichen Ethereum-Mainnet zusammengeführt wurde, begann die Ethereum-Community, sich mit der Skalierung des Netzwerks zu befassen.

Proof-of-Stake hat den Vorteil, dass es zu jedem Zeitpunkt ein Register aller zugelassenen Block-Produzenten gibt, von denen jeder ETH als Einsatz hinterlegt hat. Dieses Register schafft die Voraussetzungen für die Fähigkeit, nach dem Prinzip „Teile und herrsche“ spezifische Netzwerkverantwortlichkeiten zuverlässig aufzuteilen.

Diese Verantwortung steht im Gegensatz zu Proof-of-Work, bei dem Miner keine Verpflichtung gegenüber dem Netzwerk haben und das Mining jederzeit ohne Konsequenzen einstellen und ihre Blockchain-Knoten-Software dauerhaft abschalten könnten. Es gibt auch kein Register bekannter Block-Vorschlagender und keine zuverlässige Möglichkeit, Netzwerkverantwortlichkeiten sicher aufzuteilen.

[Mehr zu Sharding](/roadmap/danksharding/)

## Beziehung zwischen den Upgrades {#relationship-between-upgrades}

Die Ethereum-Upgrades hängen alle in gewisser Weise miteinander zusammen. Lassen Sie uns also zusammenfassen, wie sich die Beacon Chain auf die anderen Upgrades auswirkt.

### Beacon Chain und The Merge {#merge-and-beacon-chain}

Zunächst existierte die Beacon Chain getrennt vom Ethereum-Mainnet, aber sie wurden 2022 zusammengeführt.

<ButtonLink href="/roadmap/merge/">
  The Merge
</ButtonLink>

### Shards und die Beacon Chain {#shards-and-beacon-chain}

Sharding kann nur dann sicher in das Ethereum-Ökosystem integriert werden, wenn ein Proof-of-Stake-Konsensmechanismus vorhanden ist. Die Beacon Chain führte Staking ein, das mit dem Mainnet „verschmolz“ und den Weg für Sharding ebnete, um Ethereum weiter zu skalieren.

<ButtonLink href="/roadmap/danksharding/">
  Shard-Chains
</ButtonLink>

## Weiterführende Literatur {#further-reading}

- [Mehr zur Blockchain-Knoten-Architektur](/developers/docs/nodes-and-clients/node-architecture)
- [Mehr zu Proof-of-Stake](/developers/docs/consensus-mechanisms/pos)