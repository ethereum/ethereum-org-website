---
title: Andocken von Mainnet mit Eth2
description: Lerne mehr über das Andocken - wenn das Ethereum-Mainnet mit dem durch die Beacon Chain koordinierten Proof-of-Stake-System verbunden wird.
lang: de
template: eth2
sidebar: true
image: ../../../../../assets/eth2/merge.png
summaryPoints:
  [
    'Letztendlich wird das aktuelle Ethereum-Mainnet mit den restlichen Eth2-Upgrades "andocken".',
    'Das Andocken stellt den Zusammenschluss des "Eth1"-Mainnet mit der Eth2-Beacon Chain und dem Sharding-System dar.',
    "Dies markiert das Ende von Proof-of-Work für Ethereum und den vollständigen Übergang zu Proof-of-Stake.",
    'Im technischen Entwicklungsplan ist damit die "Phase 1,5" gemeint.',
  ]
---

<UpgradeStatus date="~Q1/Q2 2022">
    Dieses Upgrade erfolgt im Anschluss an die Implementierung von Shard Chains. Es stellt den Moment dar, in dem die <a href="/eth2/vision/">Eth2-Vision</a> Realität wird – ein durch Staking außerordentlich skalierbares, sicheres und nachhaltiges Netzwerk.
</UpgradeStatus>

## Was ist mit Andocken gemeint? {#what-is-the-docking}

Es ist wichtig, zu verstehen, dass die Eth2-Upgrades zuerst unabhängig und separat vom heutigen [Mainnet](/glossary/#mainnet) eingeführt und umgesetzt werden. Das Ethereum-Mainnet wird unverändert mittels [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/) gesichert, auch während die [Beacon Chain](/eth2/beacon-chain/) und ihre [Shard Chains](/eth2/shard-chains/) parallel dazu operieren und dazu [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos/) anwenden. Mit Andocken ist der Moment gemeint, an dem diese beiden Systeme zusammengeführt werden.

Stelle dir Ethereum als Raumschiff vor, das noch nicht ganz für seine interstellare Reise bereit ist. Mit der Beacon Chain und Shard Chains hat die Community einen neuen Motor und einen gestählten Rumpf konstruiert. Wenn es an der Zeit ist, werden diese neuen Systeme an das Raumschiff angedockt, werden ein Teil davon; bereit, um Lichtjahre in die Zukunft zu springen.

## Andocken ans Mainnet {#docking-mainnet}

Wenn alles bereit ist, wird das Ethereum-Mainnet an die Beacon Chain "angedockt" und zu seinem eigenen Shard werden, die statt [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/) das Proof-of Stake-Verfahren anwendet.

Mainnet wird es sowohl ermöglichen, Smart Contracts ins Proof-of-Stake-System einzubringen, als auch die gesamte Geschichte und den aktuellen Zustand von Ethereum, um einen flüssigen Übergang für alle Besitzer und Nutzer von ETH zu garantieren.

<!-- ### Improving Mainnet

Before Mainnet docks with the new eth2 system, it’s probably worthwhile sorting some of the issues that are in flight – often referred to as Ethereum1.x.

These include Improvements for

- **End users**: like [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) which changes the way users bid for blockspace. In other words, making transaction fees more efficient for end users.
- **Client runners**: making running clients more sustainable by capping disk space requirements.
- **Developers**: upgrading the EVM to be more flexible.

Plus many more.

[More on Ethereum1.x](/en/learn/#eth-1x)

These improvements all have a place in Eth2 so it’s likely that their progress may affect the timing of the docking. -->

## Nach dem Andocken {#after-the-docking}

Dies bedeutet das Ende von Proof-of-Work für Ethereum und beginnt die neue Ära eines nachhaltigeren, umweltfreundlicheren Ethereum. Von da an wird Ethereum gemäß der [Eth2-Vision](/eth2/vision/) skalierbarer, sicherer und nachhaltiger sein.

## Beziehung zwischen den Upgrades {#relationship-between-upgrades}

Die Eth2-Upgrades stehen allesamt in Verbindung zueinander. Zusammenfassend steht das Andocken wie folgt in Verbindung zu den anderen Upgrades:

### Andocken und die Beacon Chain {#docking-and-beacon-chain}

Sobald das Andocken erfolgt, werden Staker zugewiesen, um das Ethereum-Mainnet zu validieren. Genau wie bei den Shard Chains. [Mining](/developers/docs/consensus-mechanisms/pow/mining/) wird nicht mehr erforderlich sein, sodass die Miner aller Voraussicht nach ihre verdienten Ether ins Staking im Rahmen des Proof-of-Stake-Systems einbringen werden.

<ButtonLink to="/eth2/beacon-chain/">Die Beacon Chain</ButtonLink>

### Andocken und Shard Chains {#docking-and-shard-chains}

Da das Mainnet zu einem Shard werden wird, ist die erfolgreiche Implemetierung der Shard Chains für dieses Upgrade von entscheidender Bedeutung. Dieser Übergang wird vermutlich Stein des Anstoßes dafür sein, ob sich die Community dafür entscheidet, ob bzgl. des Sharding ein zweites Upgrade nötig ist. Solch ein Upgrade würde dann weitere Shards wie das Mainnet erstellen. Diese würden nicht nur weitere Daten liefern, sondern auch Transaktionen und Smart Contracts bearbeiten.

<ButtonLink to="/eth2/shard-chains/">Shard Chains</ButtonLink>
