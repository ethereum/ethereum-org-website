---
title: Die Zusammenführung
description: Erfahren Sie mehr über die Zusammenführung, wenn das Ethereum-Mainnet mit dem durch die Beacon Chain koordinierten Proof-of-Stake-System verbunden wird.
lang: de
template: upgrade
image: ../../../../../assets/upgrades/merge.png
summaryPoint1: Letztendlich wird das derzeitige Ethereum-Mainnet mit dem Proof-of-Stake-System der Bacon Chain zusammengeführt.
summaryPoint2: Das markiert das Ende des Proof-of-Work für Ethereum sowie den vollständigen Übergang zu Proof-of-Stake.
summaryPoint3: Geplant ist die Zusammenführung vor der Einführung der Shard Chains.
summaryPoint4: Zuvor wurde dieser Vorgang als „das Andocken“ bezeichnet.
---

<UpgradeStatus dateKey="page-upgrades-merge-date">
  Dieses Upgrade stellt den offiziellen Übergang zum Proof-of-Stake-Konsens dar. Damit entfällt das energieintensive Mining. Stattdessen wird das Netzwerk durch den Einsatz von Staked Ether gesichert. Ein wirklich spannender Schritt zur Verwirklichung der <a href="/upgrades/vision/">Ethereum-Vision</a>: mehr Skalierbarkeit, Sicherheit und Nachhaltigkeit.
</UpgradeStatus>

## Was ist die Zusammenführung? {#what-is-the-docking}

Wichtig ist, zu erwähnen, dass die [Beacon Chain](/upgrades/beacon-chain/) anfangs getrennt vom [Mainnet](/glossary/#mainnet), also der der Chain, die wir heute verwenden, eingeführt wurde. Das Ethereum-Mainnet wird weiterhin durch [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/) gesichert, auch wenn die Beacon Chain parallel dazu mit [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) läuft. Die Zusammenführung ist der Moment, in dem diese beiden Systeme endlich zusammenkommen.

Stelle dir Ethereum als Raumschiff vor, das noch nicht ganz für seine interstellare Reise bereit ist. Mit der Beacon Chain hat die Community einen neuen Motor und einen gehärteten Rumpf gebaut. Wenn die Zeit reif ist, wird das aktuelle Schiff an das neue System andocken und zu einem Schiff verschmelzen, das bereit ist, einige Lichtjahre zurückzulegen und das Universum zu erobern.

## Die Fusion mit dem Mainnet {#docking-mainnet}

Wenn es soweit ist, wird das Ethereum-Mainnet mit der Beacon Chain „verschmelzen“ und ein eigener Shard werden, der Proof-of-Stake statt [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/) verwendet.

Mainnet wird es sowohl ermöglichen, Smart Contracts ins Proof-of-Stake-System einzubringen, als auch die gesamte Geschichte und den aktuellen Zustand von Ethereum, um einen flüssigen Übergang für alle Besitzer und Nutzer von ETH zu garantieren.

## Nach der Zusammenführung {#after-the-merge}

Mit dem Ende von Proof-of-Work für Ethereum beginnt eine neue Ära eines nachhaltigeren, umweltfreundlicheren Ethereum. An diesem Punkt hat Ethereum einen weiteren Schritt auf dem Weg, das volle Potenzial, Sicherheit und Nachhaltigkeit zu erreichen, geschafft, wie in der [Ethereum-Vision](/upgrades/vision/) beschrieben.

Es ist wichtig, zu erwähnen, dass Einfachheit ein Ziel der Zusammenführung ist, um den Übergang von Proof-of-Work zu Proof-of-Stake zu beschleunigen. Die Entwickler konzentrieren ihre Bemühungen auf diesen Übergang und verzichten zunächst auf zusätzliche Funktionen, die die Erreichung dieses Ziels verzögern könnten.

**Das bedeutet, dass einige Funktionen erst nach Abschluss der Zusammenführung implementiert werden können. Dazu gehört zum Beispiel die Möglichkeit, staked ETH wieder entnehmen zu können.** Geplant ist ein „Bereinigungs“-Upgrade, um auf diese Aspekte einzugehen. Dieses Upgrade wird voraussichtlich kurz nach dem Abschluss der Zusammenführung erfolgen.

## Beziehung zwischen den Upgrades {#relationship-between-upgrades}

Die Ethereum-Upgrades sind alle auf eine Weise miteinander verbunden. Sehen wir uns nun an, welche Verbindung zwischen der Zusammenführung und anderen Upgrades besteht.

### Die Zusammenführung und die Beacon Chain {#docking-and-beacon-chain}

Nach Abschluss der Zusammenführung wird Stakern die Validierung des Ethereum-Mainnets zugewiesen. [Mining](/developers/docs/consensus-mechanisms/pow/mining/) wird nicht mehr erforderlich sein, sodass die Miner aller Voraussicht nach ihre verdienten Ether im Rahmen des Proof-of-Stake-Systems ins Staking einbringen werden.

<ButtonLink to="/upgrades/beacon-chain/">
  Die Beacon Chain
</ButtonLink>

### Die Zusammenführung und die anschließende Bereinigung {#merge-and-post-merge-cleanup}

Unmittelbar nach der Zusammenführung werden einige Funktionen wie z. B. die Auszahlung von staked ETH noch nicht direkt unterstützt. Diese Funktionalität soll kurz nach der Zusammenführung über ein separates Upgrade bereitgestellt werden.

Bleiben Sie auf dem Laufenden mit dem [EF-Forschungs- und Entwicklungsblog](https://blog.ethereum.org/category/research-and-development/). Für Neugierige: Erfahren Sie mehr darüber, [ was nach der Zusammenführung passiert](https://youtu.be/7ggwLccuN5s?t=101), präsentiert von Vitalik an der ETHGlobal-Veranstaltung im April 2021.

### Die Zusammenführung und die Shard Chains {#docking-and-shard-chains}

Ursprünglich war geplant, vor der Zusammenführung an Shard Chains zu arbeiten, um die Skalierbarkeit zu verbessern. Mit dem Boom der [Layer-2-Skalierungslösungen](/developers/docs/scaling/#layer-2-scaling), hat sich die Priorität jedoch auf die Umwandlung von Proof-of-Work zu Proof-of-Stake, über die Zusammenführung, verschoben.

Hier wird eine fortlaufende Bewertung der Gemeinschaft geben, ob ggf. mehrere Runden von Shard Chains erforderlich werden, um eine unbegrenzte Skalierbarkeit zu ermöglichen.

<ButtonLink to="/upgrades/sharding/">
  Shard Chains
</ButtonLink>

## Mehr erfahren {#read-more}

<MergeArticleList />
