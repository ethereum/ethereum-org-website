---
title: Sidechains
description: Eine Einführung in Sidechains als Skalierungslösung, die derzeit von der Ethereum-Community genutzt wird.
lang: de
incomplete: true
sidebarDepth: 3
---

Eine Sidechain ist eine separate Blockchain, die parallel zum Ethereum Mainnet läuft und unabhängig arbeitet. Sie hat seinen eigenen [Konsens-Algorithmus](/developers/docs/consensus-mechanisms/) (z.B. [Proof-of-Authority](https://wikipedia.org/wiki/Proof_of_authority), [Delegierter Proof-of-Stake](https://en.bitcoinwiki.org/wiki/DPoS), [Byzantinische Fehlertoleranz](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained)). Sie ist über eine zweiseitige Brücke mit dem Mainnet verbunden.

Was eine Sidechain besonders spannend macht, ist die Tatsache, dass die Kette genauso funktioniert wie die Hauptkette von Ethereum, da sie auf [dem EVM](/developers/docs/evm/) basiert. Sie nutzt nicht Ethereum, sie ist Ethereum. Das bedeutet, wenn Sie Ihre [dApp](/developers/docs/dapps/) auf einer Sidechain verwenden wollen, müssen Sie nur Ihren Code auf dieser Sidechain bereitstellen. Sie sieht aus, fühlt sich an und verhält sich wie Mainnet - Sie schreiben Verträge in Solidity und interagieren mit der Kette über die Web3 API.

## Voraussetzungen {#prerequisites}

Sie sollten ein gutes Grundwissen über alle grundlegenden Themen und ein umfassendes Verständnis der [Ethereum-Skalierung](/developers/docs/scaling/) haben.

## Vor- und Nachteile {#pros-and-cons}

| Vorteile                                               | Kontra                                                                                                                     |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| Technologie ist etabliert.                             | Weniger dezentralisiert.                                                                                                   |
| Unterstützt allgemeine Berechnung, ist EVM-Kompatibel. | Verwendet einen separaten Konsensmechanismus. Nicht durch Layer 1 gesichert (technisch gesehen ist es also nicht Layer 2). |
|                                                        | Ein Quorum von Sidechain Validatoren kann Betrug begehen.                                                                  |

### Sidechains verwenden {#use-sidechains}

Mehrere Projekte bieten Implementierungen von Sidechains, die Sie in Ihre dApps integrieren können:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis-Chain (ehemals xDai)](https://www.xdaichain.com/)

## Weiterführende Informationen {#further-reading}

- [Skalieren von Ethereum dApps durch Sidechains](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _Feb 8, 2018 - Georgios Konstantopoulos_

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_
