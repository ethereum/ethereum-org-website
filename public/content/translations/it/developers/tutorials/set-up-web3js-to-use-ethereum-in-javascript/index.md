---
title: Configura web3.js per usare la blockchain di Ethereum in JavaScript
description: Come usare uno Smart Contract per interagire con un token utilizzando il linguaggio Solidity
author: "jdourlens"
tags:
  - "web3.js"
  - "javascript"
skill: beginner
lang: it
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

In questo tutorial, vedremo come muovere i primi passi con [web3.js](https://web3js.readthedocs.io/) per interagire con la blockchain di Ethereum. Web3.js è utilizzabile sia in frontend che backend per leggere i dati dalla blockchain o effettuare transazioni e persino distribuire gli smart contract.

Per prima cosa occorre includere web3.js nel progetto. Per usarlo in una pagina web, puoi importare la libreria direttamente usando un CDN come JSDeliver.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

Se preferisci installare la libreria da usare nel progetto di backend o frontend che usa build, puoi usare npm:

```bash
npm install web3 --save
```

A questo punto, per importare Web3.js in uno script Node.js o un progetto frontend di Browserify, puoi usare la seguente riga di JavaScript:

```js
const Web3 = require("web3")
```

Ora che hai incluso la libreria nel progetto, dobbiamo inizializzarla. Il progetto deve poter comunicare con la blockchain. Gran parte delle librerie di Ethereum comunica con un [nodo](/developers/docs/nodes-and-clients/) tramite le chiamate RPC. Per avviare il nostro provider Web3, istanzieremo un'istanza di Web3 passando per il costruttore dell'URL del provider. Se hai un nodo o un'[istanza ganache in esecuzione sul tuo computer](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/), apparirà così:

```js
const web3 = new Web3("http://localhost:8545")
```

Se vorresti avere accesso diretto a un nodo ospitato, puoi trovare le opzioni su [nodi come servizi](/developers/docs/nodes-and-clients/nodes-as-a-service).

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

Per verificare di aver configurato correttamente la nostra istanza di Web3, proveremo a recuperare il numero dell'ultimo blocco usando la funzione `getBlockNumber`. Questa funzione accetta un callback come parametro e restituisce il numero del blocco come un intero.

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

Se viene eseguito, questo programma produrrà semplicemente il numero dell'ultimo blocco: la cima della blockchain. Puoi anche usare le chiamate della funzione `await/async` per evitare di annidare delle callback nel tuo codice:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

Puoi vedere tutte le funzioni disponibili sull'istanza di web3 nella [documentazione ufficiale di web3.js](https://docs.web3js.org/).

Gran parte delle librerie di Web3 sono asincrone perché, in background, la libreria effettua chiamate RPC di JSON al nodo, il quale restituisce il risultato.

<Divider />

Se lavori nel browser, alcuni portafogli iniettano direttamente un'istanza Web3 e dovresti provare a usarla appena possibile, specialmente se prevedi di interagire con l'indirizzo di Ethereum dell'utente per effettuare le transazioni.

Qui riportiamo il frammento che permette di rilevare se è disponibile un portafoglio di MetaMask e, in tal caso, provare ad abilitarlo. In seguito, ti consentirà di leggere il saldo dell'utente e abilitarlo per convalidare le transazioni che vorresti effettuasse sulla blockchain di Ethereum:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // Request account access if needed
    await window.ethereum.enable()
    // Accounts now exposed
  } catch (error) {
    // User denied account access...
  }
}
```

Alternative a web3.js come [Ethers.js](https://docs.ethers.io/) esistono e sono anche utilizzate comunemente. Nel prossimo tutorial vedremo [come ascoltare facilmente i nuovi blocchi in arrivo sulla blockchain e esaminarne il contenuto](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/).
