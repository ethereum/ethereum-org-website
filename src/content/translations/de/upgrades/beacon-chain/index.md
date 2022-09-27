---
title: Die Beacon Chain
description: Informieren Sie sich über die Beacon Chain – das Upgrade, mit dem Proof-of-Stake für Ethereum eingeführt wurde
lang: de
template: upgrade
image: ../../../../../assets/upgrades/core.png
summaryPoint1: Die Beacon Chain ändert nichts an Ethereum, das wir heute verwenden.
summaryPoint2: Sie wird die Koordination im Netzwerk übernehmen und dabei als Konsensuslayer dienen.
summaryPoint3: Mit der Bacon Chain wurde Proof-of-Stake in das Ethereum Ökosystem eingeführt.
summaryPoint4: Sie kennen das möglicherweise als „Phase 0“ in technischen Dokumentationen.
---

<UpgradeStatus isShipped dateKey="page-upgrades-beacon-date">
    Die Beacon Chain wurde am 1. Dezember 2020 zur Mittagszeit der koordinierten Weltzeit eingeführt. Um mehr zu erfahren, schauen Sie sich die <a href="https://beaconscan.com/">Daten</a> an. Wenn Sie auch beim Validieren von Transaktionen auf der Beacon Chain unterstützen möchten, können Sie <a href="/staking/">Ihre ETH staken</a>.
</UpgradeStatus>

## Welche Funktion hat die Beacon Chain? {#what-does-the-beacon-chain-do}

Die Beacon Chain übernimmt die Koordination und Verknüpfung des Netzwerks der [Shards](/upgrades/sharding/) und [Staker](/staking/). Aber sie ist nicht mit dem [Ethereum-Mainnet](/glossary/#mainnet) von heute vergleichbar, da sie keine Konten oder Smart Contracts verarbeitet.

Mit der Zeit können sich Aufgabe und Rolle der Beacon Chain zwar verändern, sie ist jedoch ein fundamentaler Baustein für das [sichere, nachhaltige und skalierbare Ethereum der Zukunft](/upgrades/vision/).

## Eigenschaften der Beacon Chain {#beacon-chain-features}

### Einführung ins Staking {#introducing-staking}

Die Beacon Chain wird [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) für Ethereum einführen. Dies eröffnet neue Möglichkeiten für die Beteiligung an der Sicherheit des Ethereum-Netzwerks. Man kann es sich als frei verfügbares Gut vorstellen, das Ethereum vitaler macht und Ihnen dabei im Prozess einige ETH einbringt. In der Praxis bedeutet das, ETH einzusetzen, um die Validierungssoftware zu aktivieren. Als Validator verarbeiten Sie Transaktionen auf der Blockchain und beteiligen sich an der Erstellung neuer Blöcke.

Das Staking als Validator ist einfacher, als das [Mining](/developers/docs/mining/) (wie das Netzwerk momentan gesichert wird). Langfristig besteht die Hoffnung darin, Ethereum durch Staking noch sicherer zu machen. Je mehr Leute sich aktiv am Netzwerk beteiligen, desto dezentraler und damit robuster und sicherer ist Ethereum gegen potenzielle Angriffe.

<InfoBanner emoji=":money_bag:">
Wenn Sie Interesse haben, die Beacon Chain als Validator sicherer zu machen, <a href="/staking/">können Sie hier mehr über das Staking</a> lernen.
</InfoBanner>

Das ist auch eine wichtige Änderung für ein anderes Upgrade: [Shard Chains](/upgrades/sharding/).

### Vorbereitung für Shard Chains {#setting-up-for-shard-chains}

Nachdem das Mainnet mit der Beacon Chain verschmolzen ist, wird das nächste Upgrade die Shard Chains in das Proof-of-Stake-Netzwerk einbringen. Diese "Shards" werden die Kapazität des Netzwerks erhöhen und die Transaktionsgeschwindigkeit verbessern, indem das Netzwerk auf 64 Blockchains erweitert wird. Die Beacon Chain ist ein erster wichtiger Schritt für die Einführung von Shard Chains, da diese Staking zum sicheren Gebrauch benötigen.

Letztlich wird die Beacon Chain durch ein Zufallsprinzip auch dafür sorgen, dass Staker zum Validieren der einzelnen Shard Chains zugewiesen werden. Dies ist der Schlüssel, um die unerlaubte Zusammenarbeit von Stakern zur Übernahme eines Shards zu erschweren. Um genau zu sein reduziert es die Wahrscheinlichkeit [auf 1 zu eine Billion](https://medium.com/@chihchengliang/minimum-committee-size-explained-67047111fa20).

## Beziehung zwischen den Upgrades {#relationship-between-upgrades}

Die Ethereum-Upgrades sind alle auf eine Weise miteinander verbunden. Zusammenfassend wirkt sich die Beacon Chain auf weitere Upgrades wie folgt aus:

### Mainnet und die Beacon Chain {#mainnet-and-beacon-chain}

Die Beacon Chain wird zunächst getrennt vom Ethereum-Mainnet existieren, welches wir derzeit nutzen. Letztlich werden jedoch beide verbunden sein. Der Plan ist, das Mainnet mit dem Proof-of-Stake-System zu "verschmelzen", das von der Beacon Chain kontrolliert und koordiniert wird.

<ButtonLink to="/upgrades/merge/">
    Die Zusammenführung
</ButtonLink>

### Shards und die Beacon Chain {#shards-and-beacon-chain}

Shard Chains können nur dann sicher ins Ethereum-Netzwerk eingeführt werden, wenn ein funktionierender Proof-of-Stake-Konsensmechanismus bereits etabliert ist. Mit der Beacon Chain wird Staking eingeführt, wodurch der Weg für das Shard Chains-Upgrade geebnet wird.

<ButtonLink to="/upgrades/sharding/">
    Shard Chains
</ButtonLink>

<Divider />

## Interaktion mit der Beacon Chain {#interact-with-beacon-chain}

<BeaconChainActions />
