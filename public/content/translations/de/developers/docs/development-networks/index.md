---
title: Entwicklungsnetzwerke
description: "Eine Übersicht über Entwicklungsnetzwerke und die verfügbaren Tools zur Unterstützung bei der Erstellung von Ethereum-Anwendungen."
lang: de
---

Wenn Sie eine [Ethereum](/)-Anwendung mit Smart Contracts erstellen, sollten Sie diese in einem lokalen Netzwerk ausführen, um zu sehen, wie sie funktioniert, bevor Sie sie bereitstellen.

Ähnlich wie Sie für die Webentwicklung einen lokalen Server auf Ihrem Computer ausführen, können Sie ein Entwicklungsnetzwerk verwenden, um eine lokale Blockchain-Instanz zum Testen Ihrer Dapp zu erstellen. Diese Ethereum-Entwicklungsnetzwerke bieten Funktionen, die eine viel schnellere Iteration ermöglichen als ein öffentliches Testnet (zum Beispiel müssen Sie sich nicht darum kümmern, ETH von einem Testnet-Faucet zu erhalten).

## Voraussetzungen {#prerequisites}

Sie sollten die [Grundlagen des Ethereum-Stacks](/developers/docs/ethereum-stack/) und der [Ethereum-Netzwerke](/developers/docs/networks/) verstehen, bevor Sie sich mit Entwicklungsnetzwerken befassen.

## Was ist ein Entwicklungsnetzwerk? {#what-is-a-development-network}

Entwicklungsnetzwerke sind im Wesentlichen Ethereum-Clients (Implementierungen von Ethereum), die speziell für die lokale Entwicklung konzipiert sind.

**Warum nicht einfach einen Standard-Ethereum-Blockchain-Knoten lokal ausführen?**

Sie _könnten_ [einen Blockchain-Knoten ausführen](/developers/docs/nodes-and-clients/#running-your-own-node), aber da Entwicklungsnetzwerke speziell für die Entwicklung entwickelt wurden, sind sie oft mit praktischen Funktionen ausgestattet, wie:

- Deterministisches Befüllen Ihrer lokalen Blockchain mit Daten (z. B. Konten mit ETH-Guthaben)
- Sofortiges Produzieren von Blöcken mit jeder empfangenen Transaktion, in der richtigen Reihenfolge und ohne Verzögerung
- Erweiterte Debugging- und Protokollierungsfunktionen

## Verfügbare Tools {#available-projects}

**Hinweis**: Die meisten [Entwicklungs-Frameworks](/developers/docs/frameworks/) enthalten ein integriertes Entwicklungsnetzwerk. Wir empfehlen, mit einem Framework zu beginnen, um [Ihre lokale Entwicklungsumgebung einzurichten](/developers/local-environment/).

### Hardhat Network {#hardhat-network}

Ein lokales Ethereum-Netzwerk, das für die Entwicklung konzipiert ist. Es ermöglicht Ihnen, Ihre Verträge bereitzustellen, Ihre Tests auszuführen und Ihren Code zu debuggen.

Hardhat Network ist in Hardhat integriert, einer Ethereum-Entwicklungsumgebung für Profis.

- [Website](https://hardhat.org/)
- [GitHub](https://github.com/NomicFoundation/hardhat)

### Lokale Beacon Chains {#local-beacon-chains}

Einige Konsens-Clients verfügen über integrierte Tools zum Starten lokaler Beacon Chains zu Testzwecken. Anleitungen für Lighthouse, Nimbus und Lodestar sind verfügbar:

- [Lokales Testnet mit Lodestar](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [Lokales Testnet mit Lighthouse](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### Öffentliche Ethereum-Test-Chains {#public-beacon-testchains}

Es gibt auch zwei gepflegte öffentliche Testimplementierungen von Ethereum: Sepolia und Hoodi. Das empfohlene Testnet mit langfristiger Unterstützung ist Hoodi, auf dem jeder frei validieren kann. Sepolia verwendet ein zugangsbeschränktes Validator-Set, was bedeutet, dass es keinen allgemeinen Zugang für neue Validatoren in diesem Testnet gibt.

- [Hoodi Staking Launchpad](https://hoodi.launchpad.ethereum.org/)

### Kurtosis Ethereum Package {#kurtosis}

Kurtosis ist ein Build-System für Multi-Container-Testumgebungen, das es Entwicklern ermöglicht, lokal reproduzierbare Instanzen von Blockchain-Netzwerken zu starten.

Das Ethereum-Kurtosis-Paket kann verwendet werden, um schnell ein parametrisierbares, hochskalierbares und privates Ethereum-Testnet über Docker oder Kubernetes zu instanziieren. Das Paket unterstützt alle wichtigen Ausführungsebene- (EL) und Konsensebene- (CL) Clients. Kurtosis verarbeitet elegant alle lokalen Port-Zuweisungen und Dienstverbindungen für ein repräsentatives Netzwerk, das in Validierungs- und Test-Workflows im Zusammenhang mit der Ethereum-Kerninfrastruktur verwendet werden soll.

- [Ethereum-Netzwerkpaket](https://github.com/kurtosis-tech/ethereum-package)
- [Website](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [Dokumentation](https://docs.kurtosis.com/)

## Weiterführende Literatur {#further-reading}

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_

## Verwandte Themen {#related-topics}

- [Entwicklungs-Frameworks](/developers/docs/frameworks/)
- [Einrichten einer lokalen Entwicklungsumgebung](/developers/local-environment/)

## Tutorials: Entwicklungsnetzwerke & Testumgebungen auf Ethereum {#tutorials}

- [Entwickeln und Testen von Dapps mit einem lokalen Multi-Client-Ethereum-Testnet](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– Wie man ein lokales Multi-Client-Ethereum-Testnet mit Kurtosis für die Entwicklung und das Testen von Dapps startet._