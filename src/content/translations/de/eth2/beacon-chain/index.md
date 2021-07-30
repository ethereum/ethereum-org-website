---
title: Die Beacon Chain
description: Erfahre mehr über die Beacon Chain – das erste wesentliche Eth2-Upgrade für Ethereum.
lang: de
template: eth2
sidebar: true
image: ../../../../../assets/eth2/core.png
summaryPoints:
  [
    "Die Beacon Chain selbst ändert nichts an der heutigen Verwendung von Ethereum.",
    "Ihre Aufgabe wird die Koordination des Eth2-Netzwerks sein.",
    "Sie führt Proof-of-Stake ins Ethereum-System ein.",
    'In den verschiedenen technischen Entwicklungsstufen ist darunter die "Phase 0" gemeint.',
  ]
---

<UpgradeStatus isShipped date="Shipped!">
    Die Beacon Chain wurde am 1. Dezember um 12:00 UTC eingeführt. Um mehr zu erfahren, schau dir die <a href="https://beaconscan.com/">Daten</a> an. Wenn Du auch beim Validieren von Transaktionen auf der Beacon Chain helfen möchtest, kannst Du <a href="/eth2/staking/">Deine ETH staken</a>.
</UpgradeStatus>

## Welche Funktion hat die Beacon Chain? {#what-does-the-beacon-chain-do}

Die Beacon Chain übernimmt die Koordination und Verknüpfung des Netzwerks der [Shards](/eth2/shard-chains/) und [Stakers](/eth2/staking/). Sie ist allerdings nicht mit dem heutigen [Ethereum Mainnet](/glossary/#mainnet) vergleichbar, da sie keine Zustandsveränderungen von Konten oder Smart Contracts verarbeitet.

Mit der Zeit können sich Aufgabe und Rolle der Beacon Chain zwar verändern, sie ist jedoch ein fundamentaler Baustein für das [sichere, nachhaltige und skalierbare Ethereum der Zukunft](/eth2/vision/).

## Eigenschaften der Beacon Chain {#beacon-chain-features}

### Einführung ins Staking {#introducing-staking}

Die Beacon Chain wird [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) für Ethereum einführen. Dies eröffnet neue Möglichkeiten für die Beteiligung an der Sicherheit des Ethereum-Netzwerks. Man kann es sich als frei verfügbares Gut vorstellen, das Ethereum vitaler macht und dir dabei im Prozess einige ETH einbringt. In der Praxis bedeutet das, ETH einzusetzen, um die Validierungssoftware zu aktivieren. Als Validator verarbeitest du Transaktionen auf der Blockchain und beteiligst dich an der Erstellung neuer Blöcke.

Das Staking als Validator ist einfacher, als das [Mining](/developers/docs/mining/) (wie das Netzwerk momentan gesichert wird). Langfristig besteht die Hoffnung darin, Ethereum durch Staking noch sicherer zu machen. Je mehr Leute sich aktiv am Netzwerk beteiligen, desto dezentraler und damit robuster und sicherer ist Ethereum gegen potentielle Angriffe.

<InfoBanner emoji=":money_bag:">
Wenn du Interesse hast, die Beacon Chain als Validator sicherer zu machen, <a href="/eth2/staking/">kannst du hier mehr über das Staking</a> lernen.
</InfoBanner>

Staking ist auch eine ganz wesentliche Veränderung im Vorfeld des zweiten großen Eth2-Upgrades: [Shard Chains](/eth2/shard-chains/).

### Vorbereitung für Shard Chains {#setting-up-for-shard-chains}

Shard Chains werden das zweite Eth2-Upgrade sein. Durch die Erweiterung des Netzwerkes auf 64 Blockchains werden sie Netzwerkapazitäten und Verarbeitungsgeschwindigkeit erhöhen. Die Beacon Chain ist ein erster wichtiger Schritt für die Einführung von Shard Chains, da diese Staking zum sicheren Gebrauch benötigen.

Letztlich wird die Beacon Chain durch ein Zufallsprinzip auch dafür sorgen, dass Staker zum Validieren der einzelnen Shard Chains zugewiesen werden. Dies ist der Schlüssel, um die unerlaubte Zusammenarbeit von Stakern zur Übernahme eines Shards zu erschweren. Um genau zu sein reduziert es die Wahrscheinlichkeit [auf 1 zu eine Billion](https://medium.com/@chihchengliang/minimum-committee-size-explained-67047111fa20).

## Beziehung zwischen den Upgrades {#relationship-between-upgrades}

Die Eth2-Upgrades sind alle miteinander verknüpft. Zusammenfassend wirkt sich die Beacon Chain auf weitere Upgrades wie folgt aus:

### Mainnet und die Beacon Chain {#mainnet-and-beacon-chain}

Zu Beginn wird die Beacon Chain parallel und als separate Blockchain zum heutigen Ethereum-Mainnet existieren. Letztlich werden jedoch beide verbunden sein. Der Plan ist, das Mainnet an das Proof-of-Stake-System "anzudocken", welches von der Beacon Chain kontrolliert und koordiniert wird.

<ButtonLink to="/eth2/merge/">Das Andocken</ButtonLink>

### Shards und die Beacon Chain {#shards-and-beacon-chain}

Shard Chains können nur dann sicher ins Ethereum-Netzwerk eingeführt werden, wenn ein funktionierender Proof-of-Stake-Konsensmechanismus bereits etabliert ist. Mit der Beacon Chain wird Staking eingeführt, wodurch der Weg für das Shard Chains-Upgrade geebnet wird.

<ButtonLink to="/eth2/shard-chains/">Shard Chains</ButtonLink>

<Divider />

## Interaktion mit der Beacon Chain {#interact-with-beacon-chain}

<Eth2BeaconChainActions />
