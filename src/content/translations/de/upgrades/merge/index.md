---
title: Die Zusammenführung
description: Lerne mehr über die Fusion - wenn das Ethereum-Mainnet mit dem durch die Beacon Chain koordinierten proof-of-stake-System verbunden wird.
lang: de
template: upgrade
sidebar: true
image: ../../../../../assets/upgrades/merge.png
summaryPoint1: Letztlich wird das aktuelle Ethereum Mainnet mit dem beacon chain koordiniertem proof-of-stake system "fusioniert".
summaryPoint2: Dies vermerkt das Ende von proof-of-work in Ethereum und zugleich den Start, zu einem vollen Übergang in proof-of-stake.
summaryPoint3: Dies ist geplant, um der Veröffentlichung von shard chains zuvorzukommen.
summaryPoint4: Welches wir zuvor als "die Kupplung" bezeichneten.
---

<UpgradeStatus dateKey="page-upgrades-merge-date">
  Dieses Upgrade stellt den offiziellen Wechsel zum proof-of-stake-Konsens dar. Dadurch entfällt das energieintensive Mining, stattdessen wird das Netzwerk durch den Einsatz von Staked Ether gesichert. Ein wirklich spannender Schritt zur Verwirklichung der <a href="/upgrades/vision/">Eth2-Vision</a> - mehr Skalierbarkeit, Sicherheit und Nachhaltigkeit.
</UpgradeStatus>

## Was ist die Verkuppelung? {#what-is-the-docking}

Es ist wichtig, sich daran zu erinnern, dass die [Beacon Chain](/upgrades/beacon-chain/) ursprünglich getrennt vom [Mainnet](/glossary/#mainnet) - der Chain, die wir heute verwenden - eingeführt wurde. Das Ethereum Mainnet wird weiterhin durch [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/) gesichert, auch wenn die Beacon Chain parallel dazu mit [proof-of-stake](/developers/docs/consensus-mechanisms/pos/) läuft. Die Verkupplung ist der Moment, in dem diese beiden Systeme endlich zusammenkommen.

Stelle dir Ethereum als Raumschiff vor, das noch nicht ganz für seine interstellare Reise bereit ist. Mit der Beacon Chain hat die Community einen neuen Motor und einen gehärteten Rumpf gebaut. Wenn die Zeit reif ist, wird das aktuelle Schiff an das neue System andocken und zu einem Schiff verschmelzen, das bereit ist, einige Lichtjahre zurückzulegen und das Universum zu erobern.

## Die Fusion mit dem Mainnet {#docking-mainnet}

Wenn es soweit ist, wird das Ethereum Mainnet mit der Beacon Chain "verschmelzen" und ein eigener Shard werden, der proof-of-stake statt [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/) verwendet.

Mainnet wird es sowohl ermöglichen, Smart Contracts ins proof-of-stake-System einzubringen, als auch die gesamte Geschichte und den aktuellen Zustand von Ethereum, um einen flüssigen Übergang für alle Besitzer und Nutzer von ETH zu garantieren.

## Nach der Verkupplung {#after-the-merge}

Dies bedeutet das Ende von Proof-of-Work für Ethereum und beginnt die neue Ära eines nachhaltigeren, umweltfreundlicheren Ethereum. An diesem Punkt wird Ethereum der in [Eth2 vision](/upgrades/vision/) beschriebenen vollen Skalierung, Sicherheit und Nachhaltigkeit einen Schritt näher sein.

Es ist wichtig zu erwähnen, dass ein Ziel der Verkupplung die Unkompliziertheit ist, um den Übergang von Proof-of-Work zu proof-of-stake zu beschleunigen. Die Entwickler konzentrieren ihre Bemühungen auf diesen Übergang und verzichten zunächst auf zusätzliche Funktionen, die dieses Ziel verzögern könnten.

**Das bedeutet, dass einige Funktionen, wie z.B. die Möglichkeit, ETH-Einsätze zurückzuziehen, noch etwas länger warten müssen, bis die Verkupplung abgeschlossen ist.** Geplant ist ein "Cleanup"-Upgrade nach dem Merge, um diese Funktionen zu verbessern, was voraussichtlich sehr bald nach Abschluss des Merges geschehen wird.

## Beziehung zwischen den Upgrades {#relationship-between-upgrades}

Die Eth2-Upgrades sind alle miteinander verknüpft. Fassen wir also noch einmal zusammen, wie die Verkupplung mit den anderen Upgrades zusammenhängt.

### Der Verkupplung und die Beacon Chain {#docking-and-beacon-chain}

Sobald die Verkupplung erfolgt ist, werden Staker eingesetzt, um das Ethereum Mainnet zu validieren. [Mining](/developers/docs/consensus-mechanisms/pow/mining/) wird nicht mehr erforderlich sein, sodass die Miner aller Voraussicht nach ihre verdienten Ether ins Staking im Rahmen des proof-of-stake-Systems einbringen werden.

<ButtonLink to="/upgrades/beacon-chain/">Die Beacon Chain</ButtonLink>

### Die Verkupplung und die Bereinigung nach der Verkupplung {#merge-and-post-merge-cleanup}

Unmittelbar nach der Zusammenführung werden einige Funktionen wie z. B. die Auszahlung von staked ETH noch nicht direkt unterstützt. Dies soll kurz nach der Fusion mit einem separaten Upgrade folgen.

Bleiben Sie auf dem Laufenden mit dem [EF Research and Development Blog](https://blog.ethereum.org/category/research-and-development/). Für Neugierige: Erfahren Sie mehr darüber, [ was nach der Verkupplung passiert](https://youtu.be/7ggwLccuN5s?t=101), präsentiert von Vitalik an der ETHGlobal Veranstaltung im April 2021.

### Die Verkupplung und die Shard Chains {#docking-and-shard-chains}

Ursprünglich war geplant, vor der Verkupplung an Shard Chains zu arbeiten, um die Skalierbarkeit zu verbessern. Mit dem Boom der [Layer-2-Skalierungslösungen](/developers/docs/scaling/#layer-2-scaling) hat sich die Priorität jedoch auf die Umwandlung von Proof-of-Work in proof-of-stake über die Verkupplung verlagert.

Dies wird eine fortlaufende Bewertung der Gemeinschaft hinsichtlich der Notwendigkeit von möglicherweise mehreren Runden von Shard Chains sein, um eine unbegrenzte Skalierbarkeit zu ermöglichen.

<ButtonLink to="/upgrades/shard-chains/">Shard Chains</ButtonLink>
