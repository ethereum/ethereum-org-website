---
title: "Ethereum für JavaScript-Entwickler"
description: "Lernen, wie Sie JavaScript-basierte Projekte und Tools für die Ethereum-Entwicklung nutzen können"
lang: de
---

JavaScript ist eine der beliebtesten Sprachen im Ethereum-Ökosystem. Tatsächlich gibt es ein [Team](https://github.com/ethereumjs), das sich dafür einsetzt, so viel von Ethereum wie möglich auf JavaScript zu bringen.

Es gibt Möglichkeiten, JavaScript (oder etwas Ähnliches) auf [allen Ebenen des Stacks](/developers/docs/ethereum-stack/) zu schreiben.

## Mit Ethereum interagieren {#interact-with-ethereum}

### JavaScript-API-Bibliotheken {#javascript-api-libraries}

Wenn du JavaScript schreiben möchtest, um die Blockchain abzufragen, Transaktionen zu senden und mehr, ist die Verwendung einer [JavaScript-API-Bibliothek](/developers/docs/apis/javascript/) der bequemste Weg. Diese APIs ermöglichen es Entwicklern, einfach mit den [Nodes im Ethereum-Netzwerk](/developers/docs/nodes-and-clients/) zu interagieren.

Sie können diese Bibliotheken verwenden, um mit Smart Contracts auf Ethereum zu interagieren. Das ermöglicht es, eine dApp für Fälle zu erstellen, in denen Sie nur JavaScript verwenden, um mit bereits bestehenden Verträgen zu interagieren.

**Ansehen**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _beinhaltet die Implementierung von Ethereum-Wallets und Utilities in JavaScript und TypeScript._
- [viem](https://viem.sh) – _eine TypeScript-Schnittstelle für Ethereum, die zustandslose Low-Level-Primitive für die Interaktion mit Ethereum bereitstellt._
- [Drift](https://ryangoree.github.io/drift/) – _eine TypeScript-Meta-Bibliothek mit integriertem Caching, Hooks und Test-Mocks für eine mühelose Ethereum-Entwicklung über Web3-Bibliotheken hinweg._

### Smart Contracts {#smart-contracts}

Wenn du ein JavaScript-Entwickler bist und deinen eigenen Smart Contract schreiben möchtest, solltest du dich mit [Solidity](https://solidity.readthedocs.io) vertraut machen. Das ist die am weitesten verbreitete Smart-Contract-Sprache. Sie ist syntaktisch ähnlich wie JavaScript und erleichtert damit das Lernen.

Mehr über [Smart Contracts](/developers/docs/smart-contracts/).

## Das Protokoll verstehen {#understand-the-protocol}

### Die Ethereum Virtual Machine {#the-ethereum-virtual-machine}

Es gibt eine JavaScript-Implementierung der [Ethereum Virtual Machine](/developers/docs/evm/). Sie unterstützt die neuesten Fork-Regeln. Fork-Regeln beziehen sich auf Änderungen, die durch geplante Upgrades an EVM vorgenommen wurden.

Aufteteilt wird sie in verschiedene JavaScript-Pakete. Die können Sie sich ansehen, um ein besseres Verständnis zu erlangen:

- Konten
- Blöcke
- Die Blockchain selbst
- Transaktionen
- Und mehr...

Auf diese Weise werden Fragen wie "Was ist die Datenstruktur eines Kontos?" leichter verständlich.

Wenn Sie sich lieber den geschriebenen Code durchlesen, ist dieses JavaScript eine gute Alternative, um sich all unsere Dokumente durchzulesen.

**Schau dir die EVM an**
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### Nodes und Clients {#nodes-and-clients}

Einer der Clients von Ethereum befindet sich derzeit in der aktiven Entwicklungsphase, sodass Sie einen Einblick in die Funktionsweise der Ethereum-Clients erhalten können, in einer Programmiersprache, die Sie verstehen: JavaScript!

**Schau dir den Client an**
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## Weitere Projekte {#other-projects}

Im Bereich Ethereum-JavaScript gibt es noch weitere Neuerungen, darunter:

- Bibliotheken mit Wallet-Dienstprogrammen
- Tools zum Erstellen, Importieren und Exportieren von Ethereum-Schlüsseln
- eine Implementierung des `merkle-patricia-tree` – eine Datenstruktur, die im Ethereum Yellow Paper beschrieben wird.

Tauche im [EthereumJS-Repo](https://github.com/ethereumjs) in das ein, was dich am meisten interessiert.

## Weiterführende Lektüre {#further-reading}

_Sie kennen Community-Resourcen die Ihnen geholfen haben? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_
