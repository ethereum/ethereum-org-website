---
title: Richten Sie web3.js ein, um die Ethereum-Blockchain in JavaScript zu verwenden
description: Erfahren Sie, wie Sie die web3.js-Bibliothek einrichten und konfigurieren, um aus JavaScript-Anwendungen mit der Ethereum-Blockchain zu interagieren.
author: "jdourlens"
tags: ["web3.js", "JavaScript"]
skill: beginner
breadcrumb: web3.js-Einrichtung
lang: de
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

In diesem Tutorial werden wir sehen, wie man mit [web3.js](https://web3js.readthedocs.io/) beginnt, um mit der Ethereum-Blockchain zu interagieren. Web3.js kann sowohl in Frontends als auch in Backends verwendet werden, um Daten aus der Blockchain zu lesen oder Transaktionen durchzuführen und sogar Smart Contracts bereitzustellen.

Der erste Schritt besteht darin, web3.js in Ihr Projekt aufzunehmen. Um es auf einer Webseite zu verwenden, können Sie die Bibliothek direkt über ein CDN wie JSDeliver importieren.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

Wenn Sie es vorziehen, die Bibliothek für die Verwendung in Ihrem Backend oder einem Frontend-Projekt, das Builds verwendet, zu installieren, können Sie sie über npm installieren:

```bash
npm install web3 --save
```

Um Web3.js dann in ein Node.js-Skript oder ein Browserify-Frontend-Projekt zu importieren, können Sie die folgende JavaScript-Zeile verwenden:

```js
const Web3 = require("web3")
```

Nachdem wir die Bibliothek in das Projekt aufgenommen haben, müssen wir sie initialisieren. Ihr Projekt muss in der Lage sein, mit der Blockchain zu kommunizieren. Die meisten Ethereum-Bibliotheken kommunizieren mit einem [Blockchain-Knoten](/developers/docs/nodes-and-clients/) über RPC-Aufrufe. Um unseren Web3-Anbieter (Provider) zu initiieren, instanziieren wir eine Web3-Instanz und übergeben dem Konstruktor die URL des Anbieters. Wenn Sie einen Blockchain-Knoten oder eine [Ganache-Instanz auf Ihrem Computer ausführen](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/), sieht das so aus:

```js
const web3 = new Web3("http://localhost:8545")
```

Wenn Sie direkt auf einen gehosteten Blockchain-Knoten zugreifen möchten, finden Sie Optionen unter [Blockchain-Knoten als Dienstleistung (Nodes as a Service)](/developers/docs/nodes-and-clients/nodes-as-a-service).

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

Um zu testen, ob wir unsere Web3-Instanz richtig konfiguriert haben, versuchen wir, die neueste Blocknummer mit der Funktion `getBlockNumber` abzurufen. Diese Funktion akzeptiert einen Callback als Parameter und gibt die Blocknummer als Ganzzahl zurück.

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

Wenn Sie dieses Programm ausführen, wird einfach die neueste Blocknummer ausgegeben: die Spitze der Blockchain. Sie können auch `await/async`-Funktionsaufrufe verwenden, um verschachtelte Callbacks in Ihrem Code zu vermeiden:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

Sie können alle auf der Web3-Instanz verfügbaren Funktionen in [der offiziellen web3.js-Dokumentation](https://docs.web3js.org/) einsehen.

Die meisten Web3-Bibliotheken sind asynchron, da die Bibliothek im Hintergrund JSON-RPC-Aufrufe an den Blockchain-Knoten durchführt, der das Ergebnis zurücksendet.

<Divider />

Wenn Sie im Browser arbeiten, injizieren einige Wallets direkt eine Web3-Instanz, und Sie sollten versuchen, diese wann immer möglich zu verwenden, insbesondere wenn Sie planen, mit der Ethereum-Adresse des Benutzers zu interagieren, um Transaktionen durchzuführen.

Hier ist das Snippet, um zu erkennen, ob ein MetaMask-Wallet verfügbar ist, und zu versuchen, es zu aktivieren, falls dies der Fall ist. Es wird Ihnen später ermöglichen, das Guthaben des Benutzers zu lesen und es ihm zu ermöglichen, Transaktionen zu validieren, die Sie ihn auf der Ethereum-Blockchain durchführen lassen möchten:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // Kontozugriff anfordern, falls nötig
    await window.ethereum.enable()
    // Konten sind nun offengelegt
  } catch (error) {
    // Benutzer hat den Kontozugriff verweigert...
  }
}
```

Alternativen zu web3.js wie [Ethers.js](https://docs.ethers.io/) existieren und werden ebenfalls häufig verwendet. Im nächsten Tutorial werden wir sehen, [wie man einfach auf neue eingehende Blöcke auf der Blockchain hört und sieht, was sie enthalten](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/).