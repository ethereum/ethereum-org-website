---
title: Configurare web3.js per usare la blockchain di Ethereum in JavaScript
description: Scopri come impostare e configurare la libreria web3.js per interagire con la blockchain di Ethereum dalle applicazioni JavaScript.
author: "jdourlens"
tags: ["web3.js", "JavaScript"]
skill: beginner
breadcrumb: configurazione di web3.js
lang: it
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

In questo tutorial, vedremo come iniziare con [web3.js](https://web3js.readthedocs.io/) per interagire con la blockchain di Ethereum. Web3.js può essere usato sia nei frontend che nei backend per leggere dati dalla blockchain o effettuare transazioni e persino distribuire contratti intelligenti.

Il primo passo è includere web3.js nel tuo progetto. Per usarlo in una pagina web, puoi importare la libreria direttamente usando una CDN come JSDeliver.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

Se preferisci installare la libreria per usarla nel tuo backend o in un progetto frontend che usa build, puoi installarla usando npm:

```bash
npm install web3 --save
```

Quindi, per importare Web3.js in uno script Node.js o in un progetto frontend Browserify, puoi usare la seguente riga di JavaScript:

```js
const Web3 = require("web3")
```

Ora che abbiamo incluso la libreria nel progetto, dobbiamo inizializzarla. Il tuo progetto deve essere in grado di comunicare con la blockchain. La maggior parte delle librerie di Ethereum comunica con un [nodo](/developers/docs/nodes-and-clients/) tramite chiamate RPC. Per avviare il nostro provider Web3, istanzieremo un'istanza Web3 passando come costruttore l'URL del provider. Se hai un nodo o [un'istanza ganache in esecuzione sul tuo computer](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/) apparirà così:

```js
const web3 = new Web3("http://localhost:8545")
```

Se desideri accedere direttamente a un nodo ospitato, puoi trovare delle opzioni su [nodi come servizio](/developers/docs/nodes-and-clients/nodes-as-a-service).

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

Per testare di aver configurato correttamente la nostra istanza Web3, proveremo a recuperare l'ultimo numero del blocco usando la funzione `getBlockNumber`. Questa funzione accetta un callback come parametro e restituisce il numero del blocco come intero.

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

Se esegui questo programma, stamperà semplicemente l'ultimo numero del blocco: la cima della blockchain. Puoi anche usare le chiamate di funzione `await/async` per evitare di annidare i callback nel tuo codice:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

Puoi vedere tutte le funzioni disponibili sull'istanza Web3 nella [documentazione ufficiale di web3.js](https://docs.web3js.org/).

La maggior parte delle librerie Web3 sono asincrone perché in background la libreria effettua chiamate JSON-RPC al nodo che restituisce il risultato.

<Divider />

Se stai lavorando nel browser, alcuni portafogli iniettano direttamente un'istanza Web3 e dovresti cercare di usarla ogni volta che è possibile, specialmente se prevedi di interagire con l'indirizzo Ethereum dell'utente per effettuare transazioni.

Ecco lo snippet per rilevare se un portafoglio MetaMask è disponibile e provare ad abilitarlo se lo è. In seguito ti permetterà di leggere il saldo dell'utente e di abilitarlo a convalidare le transazioni che vorresti fargli fare sulla blockchain di Ethereum:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // Richiedi l'accesso all'account se necessario
    await window.ethereum.enable()
    // Account ora esposti
  } catch (error) {
    // L'utente ha negato l'accesso all'account...
  }
}
```

Esistono alternative a web3.js come [Ethers.js](https://docs.ethers.io/) e sono anch'esse comunemente usate. Nel prossimo tutorial vedremo [come ascoltare facilmente i nuovi blocchi in arrivo sulla blockchain e vedere cosa contengono](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/).