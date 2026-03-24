---
title: "Ethereum für JavaScript-Entwickler"
description: "Erfahren Sie, wie Sie mit JavaScript-basierten Projekten und Tools für Ethereum entwickeln."
lang: de
---

JavaScript gehört zu den beliebtesten Sprachen im Ethereum-Ökosystem. Tatsächlich gibt es ein [Team](https://github.com/ethereumjs), das sich der Aufgabe widmet, so viel von Ethereum wie möglich in JavaScript umzusetzen.

Es gibt Möglichkeiten, JavaScript (oder etwas Ähnliches) auf [allen Ebenen des Stacks](/developers/docs/ethereum-stack/) zu schreiben.

## Mit Ethereum interagieren {#interact-with-ethereum}

### JavaScript-API-Bibliotheken {#javascript-api-libraries}

Wenn Sie JavaScript schreiben möchten, um die Blockchain abzufragen, Transaktionen zu senden und mehr, ist der bequemste Weg dafür die Verwendung einer [JavaScript-API-Bibliothek](/developers/docs/apis/javascript/). Diese APIs ermöglichen es Entwicklern, einfach mit den [Blockchain-Knoten im Ethereum-Netzwerk](/developers/docs/nodes-and-clients/) zu interagieren.

Sie können diese Bibliotheken verwenden, um mit Smart Contracts auf Ethereum zu interagieren. So ist es möglich, eine Dapp zu erstellen, bei der Sie nur JavaScript verwenden, um mit bereits bestehenden Verträgen zu interagieren.

**Sehen Sie sich Folgendes an:**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _enthält eine Ethereum-Wallet-Implementierung und Dienstprogramme in JavaScript und TypeScript._
- [viem](https://viem.sh) – _eine TypeScript-Schnittstelle für Ethereum, die zustandslose Low-Level-Primitive für die Interaktion mit Ethereum bereitstellt._
- [Drift](https://ryangoree.github.io/drift/) – _eine TypeScript-Meta-Bibliothek mit integriertem Caching, Hooks und Test-Mocks für eine mühelose Ethereum-Entwicklung über Web3-Bibliotheken hinweg._

### Smart Contracts {#smart-contracts}

Wenn Sie ein JavaScript-Entwickler sind und Ihren eigenen Smart Contract schreiben möchten, sollten Sie sich mit [Solidity](https://solidity.readthedocs.io) vertraut machen. Dies ist die beliebteste Smart-Contract-Sprache und sie ist syntaktisch ähnlich wie JavaScript, was das Erlernen erleichtern kann.

Mehr über [Smart Contracts](/developers/docs/smart-contracts/).

## Das Protokoll verstehen {#understand-the-protocol}

### Die Ethereum Virtual Machine {#the-ethereum-virtual-machine}

Es gibt eine JavaScript-Implementierung der [Ethereum Virtual Machine](/developers/docs/evm/). Sie unterstützt die neuesten Fork-Regeln. Fork-Regeln beziehen sich auf Änderungen an der EVM als Folge von geplanten Upgrades.

Sie ist in verschiedene JavaScript-Pakete aufgeteilt, die Sie sich ansehen können, um Folgendes besser zu verstehen:

- Konten
- Blöcke
- Die Blockchain selbst
- Transaktionen
- Und mehr ...

Dies wird Ihnen helfen, Dinge zu verstehen wie „Wie sieht die Datenstruktur eines Kontos aus?“.

Wenn Sie lieber Code lesen, könnte dieses JavaScript eine großartige Alternative zum Lesen unserer Dokumentation sein.

**Sehen Sie sich die EVM an**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### Blockchain-Knoten und Anwendungen {#nodes-and-clients}

Eine Ethereumjs-Anwendung befindet sich in aktiver Entwicklung, mit der Sie in einer Sprache, die Sie verstehen, nämlich JavaScript, untersuchen können, wie Ethereum-Anwendungen funktionieren!

**Sehen Sie sich die Anwendung an**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## Weitere Projekte {#other-projects}

Es gibt auch viele andere Dinge, die im Bereich Ethereum-JavaScript passieren, darunter:

- Bibliotheken für Wallet-Dienstprogramme.
- Tools zum Generieren, Importieren und Exportieren von Ethereum-Schlüsseln.
- eine Implementierung des `merkle-patricia-tree` – einer Datenstruktur, die im Ethereum Yellow Paper beschrieben wird.

Vertiefen Sie sich in das, was Sie am meisten interessiert, im [EthereumJS-Repo](https://github.com/ethereumjs).

## Weiterführende Literatur {#further-reading}

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_