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

Sie _könnten_ [einen Node](/developers/docs/nodes-and-clients/#running-your-own-node) betreiben (wie Geth, Erigon oder Nethermind), da aber Entwicklungsnetze speziell für die Entwicklung konzipiert werden, sind sie oft mit praktischen Funktionen ausgestattet wie die folgenden:

- Seeding deterministisch mit Daten für die lokale Blockchain durchführen (z. B. Konten mit ETH-Guthaben)
- Blöcke sofort mit jeder erhaltenen Transaktion in der Reihenfolge und ohne Verzögerung abbauen
- Verbesserte Debugging- und Protokollierungsfunktionen

## Verfügbare Tools {#available-projects}

**Hinweis**: Die meisten [Entwicklerframeworks](/developers/docs/frameworks/) enthalten ein integriertes Entwicklungsnetzwerk. Wir empfehlen Ihnen, mit einem Framework für die Einrichtung [Ihrer lokalen Entwicklungsumgebung](/developers/local-environment/) zu beginnen.

### Ganache {#ganache}

Führen Sie kurzerhand eine persönliche Ethereum-Blockchain aus, die Sie zum Ausführen von Tests und Befehlen und zur Prüfung des Status verwenden können, während Sie die Funktionsweise der Chain kontrollieren.

Ganache bietet sowohl eine Desktop-Anwendung (Ganache UI), als auch ein Befehlszeilentool (`ganache-cli`). Es ist Teil der Truffel-Toolsuite.

- [Website](https://www.trufflesuite.com/ganache)
- [GitHub](https://github.com/trufflesuite/ganache)
- [Dokumentation](https://www.trufflesuite.com/docs/ganache/overview)

### Hardhat Network {#hardhat-network}

Ein lokales Ethereum-Netzwerk, das für die Entwicklung konzipiert ist. Die können darin Ihre Contracts bereitstellen, Tests durchführen und Ihren Code debuggen.

Hardhat Network beinhaltet Hardhat, eine Ethereum-Entwicklungsumgebung für Profis.

- [Website](https://hardhat.org/)
- [GitHub](https://github.com/nomiclabs/hardhat)

## Weiterführende Informationen {#further-reading}

_Kennen Sie eine Community-Ressource die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu._

## Verwandte Themen {#related-topics}

- [Entwicklungs-Frameworks](/developers/docs/frameworks/)
- [Eine lokale Entwicklungsumgebung einrichten](/developers/local-environment/)
