---
title: Entwicklungsnetzwerke
description: "Ein Überblick über Entwicklungsnetzwerke und die verfügbaren Tools zur Erstellung von Ethereum-Anwendungen."
lang: de
---

Wenn Sie eine [Ethereum](/)-Anwendung mit Smart Contracts erstellen, sollten Sie diese in einem lokalen Netzwerk ausführen, um zu sehen, wie sie funktioniert, bevor Sie sie bereitstellen.

Ähnlich wie Sie für die Webentwicklung einen lokalen Server auf Ihrem Computer ausführen würden, können Sie ein Entwicklungsnetzwerk verwenden, um eine lokale Blockchain-Instanz zum Testen Ihrer Dezentralen Anwendung (Dapp) zu erstellen. Diese Ethereum-Entwicklungsnetzwerke bieten Funktionen, die eine viel schnellere Iteration ermöglichen als ein öffentliches Testnetz (Sie müssen sich beispielsweise nicht darum kümmern, ETH von einem Testnet-Faucet zu erhalten).

## Voraussetzungen {#prerequisites}

Sie sollten die [Grundlagen des Ethereum-Stacks](/developers/docs/ethereum-stack/) und der [Ethereum-Netzwerke](/developers/docs/networks/) verstehen, bevor Sie sich mit Entwicklungsnetzwerken befassen.

## Was ist ein Entwicklungsnetzwerk? {#what-is-a-development-network}

Entwicklungsnetzwerke sind im Wesentlichen Ethereum-Clients (Implementierungen von Ethereum), die speziell für die lokale Entwicklung konzipiert wurden.

**Warum nicht einfach einen Standard-Ethereum-Knoten lokal ausführen?**

Sie _könnten_ [einen Knoten ausführen](/developers/docs/nodes-and-clients/#running-your-own-node), aber da Entwicklungsnetzwerke speziell für die Entwicklung entwickelt wurden, sind sie oft mit praktischen Funktionen ausgestattet, wie zum Beispiel:

- Deterministisches Befüllen Ihrer lokalen Blockchain mit Daten (z. B. Konten mit ETH-Guthaben)
- Sofortiges Produzieren von Blöcken mit jeder empfangenen Transaktion, in der richtigen Reihenfolge und ohne Verzögerung
- Erweiterte Debugging- und Protokollierungsfunktionen

## Verfügbare Tools {#available-projects}

**Hinweis**: Die meisten [Entwicklungs-Frameworks](/developers/docs/frameworks/) enthalten ein integriertes Entwicklungsnetzwerk. Wir empfehlen, mit einem Framework zu beginnen, um [Ihre lokale Entwicklungsumgebung einzurichten](/developers/local-environment/).

### Hardhat-Netzwerk {#hardhat-network}

Ein lokales Ethereum-Netzwerk, das für die Entwicklung konzipiert ist. Es ermöglicht Ihnen, Ihre Verträge bereitzustellen, Ihre Tests auszuführen und Ihren Code zu debuggen.

Das Hardhat-Netzwerk ist in Hardhat integriert, einer Ethereum-Entwicklungsumgebung für Profis.

- [Website](https://hardhat.org/)
- [GitHub](https://github.com/NomicFoundation/hardhat)

### Lokale Beacon-Chains {#local-beacon-chains}

Einige Konsens-Clients verfügen über integrierte Tools zum Starten lokaler Beacon-Chains zu Testzwecken. Anleitungen für Lighthouse, Nimbus und Lodestar sind verfügbar:

- [Lokales Testnetz mit Lodestar](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [Lokales Testnetz mit Lighthouse](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### Öffentliche Ethereum-Test-Chains {#public-beacon-testchains}

Es gibt auch zwei gepflegte öffentliche Test-Implementierungen von Ethereum: Sepolia und Hoodi. Das empfohlene Testnetz mit Langzeitunterstützung ist Hoodi, auf dem jeder frei validieren kann. Sepolia verwendet ein erlaubnispflichtiges Validator-Set, was bedeutet, dass es keinen allgemeinen Zugang für neue Validatoren in diesem Testnetz gibt.

- [Hoodi Staking Launchpad](https://hoodi.launchpad.ethereum.org/)

### Kurtosis Ethereum-Paket {#kurtosis}

Kurtosis ist ein Build-System für Multi-Container-Testumgebungen, das es Entwicklern ermöglicht, lokal reproduzierbare Instanzen von Blockchain-Netzwerken zu starten.

Das Ethereum-Kurtosis-Paket kann verwendet werden, um schnell ein parametrisierbares, hochskalierbares und privates Ethereum-Testnetz über Docker oder Kubernetes zu instanziieren. Das Paket unterstützt alle wichtigen Clients der Ausführungsschicht (EL) und Konsensschicht (CL). Kurtosis handhabt elegant alle lokalen Port-Zuweisungen und Dienstverbindungen für ein repräsentatives Netzwerk, das in Validierungs- und Test-Workflows im Zusammenhang mit der Ethereum-Kerninfrastruktur verwendet werden soll.

- [Ethereum-Netzwerkpaket](https://github.com/kurtosis-tech/ethereum-package)
- [Website](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [Dokumentation](https://docs.kurtosis.com/)

## Weiterführende Literatur {#further-reading}

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_

## Verwandte Themen {#related-topics}

- [Entwicklungs-Frameworks](/developers/docs/frameworks/)
- [Eine lokale Entwicklungsumgebung einrichten](/developers/local-environment/)

## Tutorials: Entwicklungsnetzwerke & Testumgebungen auf Ethereum {#tutorials}

- [Entwickeln und Testen von Dapps mit einem lokalen Multi-Client-Ethereum-Testnetz](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– Wie man ein lokales Multi-Client-Ethereum-Testnetz mit Kurtosis für die Dapp-Entwicklung und das Testen startet._