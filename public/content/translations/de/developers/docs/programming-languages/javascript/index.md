---
title: Ethereum für JavaScript-Entwickler
description: Lernen, wie Sie JavaScript-basierte Projekte und Tools für die Ethereum-Entwicklung nutzen können
lang: de
---

JavaScript ist eine der beliebtesten Sprachen im Ethereum-Ökosystem. Es gibt sogar ein [-Team](https://github.com/ethereumjs), das sich dafür einsetzt, so viel von Ethereum wie möglich auf JavaScript zu bringen.

Es gibt Möglichkeiten, JavaScript (oder etwas Ahnliches) auf [allen Ebenen des Stacks](/developers/docs/ethereum-stack/) zu schreiben.

## Mit Ethereum interagieren {#interact-with-ethereum}

### JavaScript-API-Bibliotheken {#javascript-api-libraries}

Wenn Sie mit JavaScript Abfragen für die Blockchain, das Senden von Transaktionen und weitere Aktionen vornehmen möchten, ist es am einfachsten, dafür eine [JavaScript-API-Bibliothek](/developers/docs/apis/javascript/) zu verwenden. Diese APIs ermöglichen Entwicklern die einfache Interaktion mit den [Nodes im Ethereum-Netzwerk](/developers/docs/nodes-and-clients/).

Sie können diese Bibliotheken verwenden, um mit Smart Contracts auf Ethereum zu interagieren. Das ermöglicht es, eine dApp für Fälle zu erstellen, in denen Sie nur JavaScript verwenden, um mit bereits bestehenden Verträgen zu interagieren.

**Wissenswertes**

- [Web3.js](https://web3js.readthedocs.io/)
- [Ethers.js](https://docs.ethers.io/) _– beinhaltet die Implementierung von Ethereum-Wallets und -Utilities in JavaScript und TypeScript._
- [Viem](https://viem.sh) – Eine TypeScript-Schnittstelle für Ethereum, die zustandslose Primitive auf unterer Ebene für die Interaktion mit Ethereum bereitstellt.

### Smart Contracts {#smart-contracts}

Wenn Sie ein JavaScript-Entwickler sind und Ihren eigenen Smart Contract schreiben möchten, sollten Sie sich mit [Solidity](https://solidity.readthedocs.io) vertraut machen. Das ist die am weitesten verbreitete Smart-Contract-Sprache. Sie ist syntaktisch ähnlich wie JavaScript und erleichtert damit das Lernen.

Mehr erfahren über [Smart Contracts](/developers/docs/smart-contracts/).

## Das Protokoll verstehen {#understand-the-protocol}

### Die Ethereum-Virtual Machine (EVM) {#the-ethereum-virtual-machine}

Es gibt eine JavaScript-Implementierung der [Ethereum-Virtual Machine (EVM)](/developers/docs/evm/). Sie unterstützt die neuesten Fork-Regeln. Fork-Regeln beziehen sich auf Änderungen, die durch geplante Upgrades an EVM vorgenommen wurden.

Aufteteilt wird sie in verschiedene JavaScript-Pakete. Die können Sie sich ansehen, um ein besseres Verständnis zu erlangen:

- Konten
- Blöcke
- Die Blockchain selbst
- Transaktionen
- Und mehr...

Auf diese Weise werden Fragen wie "Was ist die Datenstruktur eines Kontos?" leichter verständlich.

Wenn Sie sich lieber den geschriebenen Code durchlesen, ist dieses JavaScript eine gute Alternative, um sich all unsere Dokumente durchzulesen.

**Sehen Sie sich das monorepo an**  
[`ethereumjs`](https://github.com/ethereumjs/ethereumjs-vm)

### Knotenpunkte (Nodes) und Anwendungen (Clients) {#nodes-and-clients}

Einer der Clients von Ethereum befindet sich derzeit in der aktiven Entwicklungsphase, sodass Sie einen Einblick in die Funktionsweise der Ethereum-Clients erhalten können, in einer Programmiersprache, die Sie verstehen: JavaScript!

Früher wurde es auf unabhängigen [`Repositories`](https://github.com/ethereumjs/ethereumjs-client) aufgebaut, später wurde es jedoch als Paket in die Monorepo der virtuellen Maschine von Ethereum implementiert.

**Sehen Sie sich den Client**  
[`ethereumjs-client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client) an

## Andere Projekte {#other-projects}

Im Bereich Ethereum-JavaScript gibt es noch weitere Neuerungen, darunter:

- Bibliotheken mit Wallet-Dienstprogrammen
- Tools zum Erstellen, Importieren und Exportieren von Ethereum-Schlüsseln
- Eine Implementierung des `merkle-patricia-Baumes` – Eine Datenstruktur, die im Yellow-Paper von Ethereum skizziert wird.

Forschen Sie in dem Bereich, der Sie am meisten interessiert, im [EthereumJS-Repository](https://github.com/ethereumjs)

## Weiterführende Informationen {#further-reading}

_Sie kennen Community-Resourcen die Ihnen geholfen haben? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_
