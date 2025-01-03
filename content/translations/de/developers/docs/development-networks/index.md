---
title: Entwicklungsnetzwerke
description: Eine Übersicht über Entwicklungsnetzwerke und die zur Erstellung von Ethereum-Anwendungen verfügbaren Tools
lang: de
---

Wenn Sie eine Ethereum-Anwendung mit Smart Contracts erstellen, möchten Sie sie vermutlich in einem lokalen Netzwerk ausführen, um die Funktionsweise vor der Bereitstellung zu prüfen.

So, wie Sie einen lokalen Server auf Ihrem Computer für die Webentwicklung laufen lassen können, können Sie über ein Entwicklungsnetzwerk eine lokale Blockchain-Instanz für den Test Ihrer dApp erstellen. Diese Ethereum-Entwicklungsnetze bieten Funktionen, die eine wesentlich schnellere Iteration ermöglichen als ein öffentliches Testnetz (zum Beispiel müssen Sie sich nicht mit dem Erwerb von ETH von einem Testnet-Faucet beschäftigen).

## Voraussetzungen {#prerequisites}

Sie sollten mit den [Grundlagen des Ethereum-Stacks](/developers/docs/ethereum-stack/) und den [Ethereum-Netzwerken](/developers/docs/networks/) vertraut sein, bevor Sie sich mit Entwicklungsnetzwerken beschäftigen.

## Was ist ein Entwicklungsnetzwerk? {#what-is-a-development-network}

Entwicklungsnetzwerke sind im Wesentlichen Ethereum-Kunden (Implementierungen von Ethereum), die speziell für die lokale Entwicklung konzipiert wurden.

**Warum nicht einfach einen Ethereum-Knoten lokal betreiben?**

Sie _könnten_ [einen Knoten betreiben](/developers/docs/nodes-and-clients/#running-your-own-node), da jedoch Entwicklungsnetzwerke speziell für die Entwicklung erstellt werden, sind sie oft mit praktischen Funktionen ausgestattet wie:

- Seeding deterministisch mit Daten für die lokale Blockchain durchführen (z. B. Konten mit ETH-Guthaben)
- Sofortige Erzeugung von Blöcken mit jeder empfangenen Transaktion, in der richtigen Reihenfolge und ohne Verzögerung
- Verbesserte Debugging- und Protokollierungsfunktionen

## Verfügbare Tools {#available-projects}

**Hinweis**: Die meisten [Entwicklerframeworks](/developers/docs/frameworks/) enthalten ein integriertes Entwicklungsnetzwerk. Wir empfehlen Ihnen, mit einem Framework für die Einrichtung [Ihrer lokalen Entwicklungsumgebung](/developers/local-environment/) zu beginnen.

### Hardhat Network {#hardhat-network}

Ein lokales Ethereum-Netzwerk, das für die Entwicklung konzipiert ist. Die können darin Ihre Contracts bereitstellen, Tests durchführen und Ihren Code debuggen.

Hardhat Network beinhaltet Hardhat, eine Ethereum-Entwicklungsumgebung für Profis.

- [Website](https://hardhat.org/)
- [GitHub](https://github.com/nomiclabs/hardhat)

### Lokale Beacon Chains {#local-beacon-chains}

Einige Konsensclients verfügen über integrierte Tools, um lokale Beacon Chains zu Testzwecken zu erstellen. Anleitungen für Lighthouse, Nimbus und Lodestar sind verfügbar:

- [Lokales Testnetz unter Verwendung von Lodestar](https://chainsafe.github.io/lodestar/usage/local/)
- [Lokales Testnetz unter Verwendung von Lighthouse](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)
- [Lokales Testnetz unter Verwendung von Nimbus](https://github.com/status-im/nimbus-eth1/blob/master/fluffy/docs/local_testnet.md)

### Öffentliche Ethereum Test-Chains {#public-beacon-testchains}

Es gibt auch zwei öffentliche Testimplementierungen von Ethereum: Goerli und Sepolia. Das empfohlene Testnetz mit langfristiger Unterstützung ist Goerli, auf dem potenziell jeder validieren kann. Bei Sepolia handelt es sich um eine neuere, kleinere Chain, die ebenfalls auf absehbare Zeit gewartet werden soll und deren Validatoren ausgewählt sind (d. h. es gibt keinen offnen Zugang zu neuen Validatoren in diesem Testnetz). Die Ropsten Chain wird voraussichtlich im 4. Quartal 2022 und die Rinkeby Chain im 2. und 3. Quartal 2023 veraltet sein.

- [Goerli Staking Launchpad](https://goerli.launchpad.ethereum.org/)
- [Ropsten, Rinkeby & Kiln, Ankündigung der Abschaltung](https://blog.ethereum.org/2022/06/21/testnet-deprecation)

### Kurtosis Ethereum-Paket {#kurtosis}

Kurtosis ist ein Build-System für Multi-Container-Testumgebungen, das es Entwicklern ermöglicht, lokal reproduzierbare Instanzen von Blockchain-Netzwerken zu erstellen.

Das Ethereum-Kurtosis-Paket kann verwendet werden, um schnell ein parameterisierbares, hochskalierbares und privates Ethereum-Testnetz über Docker oder Kubernetes einzurichten. Das Paket unterstützt alle wichtigen Clients der Ausführungs- und Konsensebene. Kurtosis verwaltet gekonnt alle lokalen Portzuweisungen und Dienstverbindungen für ein repräsentatives Netzwerk, das in Validierungs- und Test-Workflows im Zusammenhang mit der Ethereum-Kerninfrastruktur verwendet wird.

- [Ethereum Netzwerk-Paket](https://github.com/kurtosis-tech/ethereum-package)
- [Website](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [Dokumentation](https://docs.kurtosis.com/)

## Weiterführende Informationen {#further-reading}

_Sie kennen Community-Resourcen die Ihnen geholfen haben? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_

## Verwandte Themen {#related-topics}

- [Entwicklungs-Frameworks](/developers/docs/frameworks/)
- [Eine lokale Entwicklungsumgebung einrichten](/developers/local-environment/)
