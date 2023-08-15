---
title: Configurați web3.js pentru a utiliza blockchain-ul Ethereum în JavaScript
description: Cum se utilizează un contract inteligent pentru a interacționa cu un token folosind limbajul Solidity
author: "jdourlens"
tags:
  - "web3.js"
  - "javascript"
skill: beginner
lang: ro
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

În acest tutorial vom învăța cum să începem folosirea [web3.js](https://web3js.readthedocs.io/) pentru a interacționa cu blockchain-ul Ethereum. Web3.js poate fi folosit atât în frontend-uri, cât și în backend-uri pentru a citi date din blockchain sau pentru a face tranzacții și chiar pentru a implementa contracte inteligente.

Prima etapă este să includeți web3.js în proiectul dvs. Pentru a-l utiliza într-o pagină web, puteți importa biblioteca direct folosind un CDN (content delivery network) cum ar fi „JSDeliver”.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

Dacă preferați să instalați biblioteca pentru a o folosi în backend sau într-un proiect frontend care folosește compilări (build), o puteți face folosind „npm”:

```bash
npm install web3 --save
```

Then to import Web3.js into a Node.js script or Browserify frontend project, you can use the following line of JavaScript:

```js
const Web3 = require("web3")
```

Acum că am inclus biblioteca în proiect, trebuie să o inițializăm. Your project needs to be able to communicate with the blockchain. Majoritatea bibliotecilor Ethereum comunică prin apeluri RPC cu un [nod](/developers/docs/nodes-and-clients/). To initiate our Web3 provider, we’ll instantiate a Web3 instance passing as the constructor the URL of the provider. Dacă aveți un nod sau o instanță „ganache” [ care rulează pe computerul dvs.](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/), va arăta astfel:

```js
const web3 = new Web3("http://localhost:8545")
```

If you’d like to directly access a hosted node you can use Infura or the free ones provided by [Cloudflare](https://cloudflare-eth.com/):

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

To test that we correctly configured our Web3 instance, we’ll try to retrieve the latest block number using the `getBlockNumber` function. This function accepts a callback as a parameter and returns the block number as an integer.

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

Dacă executați acest program, acesta va imprima pur și simplu ultimul număr de bloc: vârful blockchain-ului. You can also use `await/async` function calls to avoid nesting callbacks in your code:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

You can see all the functions available on the Web3 instance in [the official web3.js documentation](https://docs.web3js.org/).

Majoritatea bibliotecilor Web3 sunt asincrone, deoarece în fundal biblioteca face apeluri JSON RPC către nodul care trimite înapoi rezultatul.

<Divider />

If you are working in the browser, some wallets directly inject a Web3 instance and you should try to use it whenever possible especially if you plan to interact with the user’s Ethereum address to make transactions.

Here is the snippet to detect if a MetaMask wallet is available and try to enable it if it is. Vă va permite ulterior să citiți soldul utilizatorului, iar acestuia să valideze tranzacțiile pe care doriți să le efectueze pe blockchain-ul Ethereum:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // Request account access if needed
    await window.ethereum.enable()
    // Acccounts now exposed
  } catch (error) {
    // User denied account access...
  }
}
```

Există și alternative la utilizarea web3.js, cum ar fi [Ethers.js](https://docs.ethers.io/) dar noi ne vom axa toate tutorialele JavaScript pe web3.js, întrucât este biblioteca oficială pentru a interacționa cu Ethereum în browser. În următorul tutorial vom afla [cum să ascultăm cu ușurință noile blocuri primite pe blockchain și să vedem ce conțin acestea](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/).
