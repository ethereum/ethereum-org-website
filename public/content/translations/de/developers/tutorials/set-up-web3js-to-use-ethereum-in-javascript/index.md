---
title: Einrichtung von web3.js zur Verwendung der Ethereum-Blockchain in JavaScript
description: Erfahren Sie, wie Sie die web3.js-Bibliothek einrichten und konfigurieren, um von JavaScript-Anwendungen aus mit der Ethereum-Blockchain zu interagieren.
author: "jdourlens"
tags: [ "web3.js", "javascript" ]
skill: beginner
lang: de
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

In diesem Tutorial erfahren Sie, wie Sie die ersten Schritte mit [web3.js](https://web3js.readthedocs.io/) machen, um mit der Ethereum-Blockchain zu interagieren. Web3.js kann sowohl in Frontends als auch in Backends verwendet werden, um Daten aus der Blockchain zu lesen, Transaktionen durchzuführen und sogar Smart Contracts bereitzustellen.

Der erste Schritt ist, web3.js in Ihr Projekt einzubinden. Um es auf einer Webseite zu verwenden, können Sie die Bibliothek direkt über ein CDN wie JSDeliver importieren.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

Wenn Sie es vorziehen, die Bibliothek für die Verwendung in Ihrem Backend oder einem Frontend-Projekt mit Build-Prozess zu installieren, können Sie sie mit npm installieren:

```bash
npm install web3 --save
```

Um Web3.js in ein Node.js-Skript oder ein Browserify-Frontend-Projekt zu importieren, können Sie dann die folgende JavaScript-Zeile verwenden:

```js
const Web3 = require("web3")
```

Da wir die Bibliothek nun in das Projekt eingebunden haben, müssen wir sie initialisieren. Ihr Projekt muss in der Lage sein, mit der Blockchain zu kommunizieren. Die meisten Ethereum-Bibliotheken kommunizieren über RPC-Calls mit einem [Node](/developers/docs/nodes-and-clients/). Um unseren Web3-Provider zu initiieren, instanziieren wir eine Web3-Instanz und übergeben dem Konstruktor die URL des Providers. Wenn Sie einen Node oder eine [auf Ihrem Computer laufende Ganache-Instanz](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/) haben, sieht es so aus:

```js
const web3 = new Web3("http://localhost:8545")
```

Wenn Sie direkt auf einen gehosteten Node zugreifen möchten, finden Sie Optionen unter [Nodes-as-a-Service](/developers/docs/nodes-and-clients/nodes-as-a-service).

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

Um zu testen, ob wir unsere Web3-Instanz korrekt konfiguriert haben, versuchen wir, die aktuellste Blocknummer mit der Funktion `getBlockNumber` abzurufen. Diese Funktion akzeptiert einen Callback als Parameter und gibt die Blocknummer als Integer zurück.

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

Wenn Sie dieses Programm ausführen, wird einfach die aktuellste Blocknummer ausgegeben: die Spitze der Blockchain. Sie können auch `await/async`-Funktionsaufrufe verwenden, um die Verschachtelung von Callbacks in Ihrem Code zu vermeiden:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

Sie finden alle auf der Web3-Instanz verfügbaren Funktionen in der [offiziellen web3.js-Dokumentation](https://docs.web3js.org/).

Die meisten Web3-Bibliotheken sind asynchron, da die Bibliothek im Hintergrund JSON-RPC-Aufrufe an den Node durchführt, der das Ergebnis zurücksendet.

<Divider />

Wenn Sie im Browser arbeiten, injizieren einige Wallets direkt eine Web3-Instanz. Sie sollten versuchen, diese wann immer möglich zu verwenden, insbesondere, wenn Sie mit der Ethereum-Adresse des Benutzers interagieren möchten, um Transaktionen durchzuführen.

Hier ist das Snippet, um zu erkennen, ob eine MetaMask-Wallet verfügbar ist, und um sie gegebenenfalls zu aktivieren. Dies ermöglicht Ihnen später, das Guthaben des Benutzers zu lesen und es ihm zu ermöglichen, Transaktionen zu validieren, die er auf der Ethereum-Blockchain durchführen soll:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // Bei Bedarf Zugriff auf das Konto anfordern
    await window.ethereum.enable()
    // Konten sind jetzt zugänglich
  } catch (error) {
    // Benutzer hat den Kontozugriff verweigert...
  }
}
```

Es gibt Alternativen zu web3.js wie [Ethers.js](https://docs.ethers.io/), die ebenfalls häufig verwendet werden. Im nächsten Tutorial sehen wir uns an, [wie Sie einfach neue eingehende Blöcke auf der Blockchain überwachen und sehen können, was sie enthalten](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/).
