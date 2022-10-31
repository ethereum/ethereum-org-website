---
title: Come coniare un NFT (Parte 2/3 della Serie di tutorial sugli NFT)
description: Questo tutorial descrive come coniare un NFT sulla Blockchain di Ethereum usando il nostro smart contract e Web3.
author: "Sumi Mudgil"
tags:
  - "NFT"
  - "ERC-721"
  - "Alchemy"
  - "Solidity"
  - "smart contract"
skill: beginner
lang: it
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): $69 milioni [3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): $11 milioni [Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): $6 milioni

Tutti hanno coniato i propri NFT usando la potente API di Alchemy. In questo tutorial ti insegneremo come fare lo stesso in meno di 10 minuti.

"Coniare un NFT" è l'atto di pubblicare un'istanza unica del tuo token ERC-721 sulla blockchain. Usando il nostro smart contract della [Parte 1 di questa serie di tutorial sugli NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/), sfruttiamo le nostre abilità di web3 e coniamo un NFT. Alla fine di questo tutorial, potrai coniare tutti gli NFT che desideri (e che può permettersi il tuo portafoglio)!

Iniziamo!

## Fase 1: installa Web3 {#install-web3}

Se hai seguito il primo tutorial sulla creazione del tuo smart contract di NFT, hai già esperienza nell'uso di Ethers.js. Web3 è simile a Ethers, trattandosi di una libreria usata per effettuare più facilmente richieste di creazione alla Blockchain di Ethereum. In questo tutorial, useremo [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3), una libreria web3 migliorata che offre tentativi automatici e robusto supporto a WebSocket.

Nella cartella home del tuo progetto, esegui:

```
npm install @alch/alchemy-web3
```

## Fase 2: crea un file mint-nft.js {#create-mintnftjs}

Nella tua cartella di script, crea un file mint-nft.js e aggiungi le seguenti righe di codice:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Fase 3: prendi l'ABI del tuo contratto {#contract-abi}

L'ABI (Application Binary Interface) del nostro contratto è l'interfaccia per interagire con il nostro smart contract. Puoi saperne di più sull'ABI dei contratti leggi [qui](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is). Hardhat genera automaticamente un'ABI e la salva nel file MyNFT.json. Per poterla usare, dovremo analizzare i contenuti aggiungendo le seguenti righe di codice al nostro file mint-nft.js:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Se vuoi vedere l'ABI, puoi stamparla nella tua console:

```js
console.log(JSON.stringify(contract.abi))
```

Per eseguire mint-nft.js e vedere l'ABI stampata alla console, vai alla console ed esegui

```js
node scripts/mint-nft.js
```

## Fase 4: configura i metadati del tuo NFT usando IPFS {#config-meta}

Se ricordi dal nostro tutorial nella Parte 1, la funzione del nostro smart contract mintNFT riceve un parametro tokenURI, che dovrebbe risolversi in un documento JSON che descrive i metadati dell'NFT, ed è questo che porta realmente in vita l'NFT, consentendogli di avere proprietà configurabili, quali nome, descrizione, immagine e altri attributi.

> _Il Planetary File System (IPFS) è un protocollo decentralizzato e una rete peer-to-peer per memorizzare e condividere i dati in un file di sistema distribuito._

Useremo Pinata, una comoda API di IPFS e strumento per memorizzare la nostra risorsa NFT e i metadati, per essere sicuri che il nostro NFT sia realmente decentralizzato. Se non hai un profilo di Pinata, registrane uno gratuito [qui](https://app.pinata.cloud) e completa i passaggi per verificare la tua email.

Una volta creato un profilo:

- Vai alla pagina "File" e clicca il pulsante "Carica" blu in alto a sinistra alla pagina.

- Carica un'immagine su Pinata, sarà la risorsa immagine del tuo NFT. Assegna alla risorsa il nome desideri

- Dopo il caricamento, vedrai le informazioni del file nella tabella sulla pagina dei File. Vedrai anche una colonna CID. Puoi copiare il CID cliccando il pulsante di copia accanto. Puoi visualizzare il tuo caricamento su: `https://gateway.pinata.cloud/ipfs/<CID>`. Puoi trovare l'immagine che abbiamo usato su IPFS [qui](https://gateway.pinata.cloud/ipfs/QmarPqdEuzh5RsWpyH2hZ3qSXBCzC5RyK3ZHnFkAsk7u2f), ad esempio.

Per chi preferisce un apprendimento "visivo", i passaggi sopra sono riassunti qui:

![Come caricare l'immagine su Pinata](https://gateway.pinata.cloud/ipfs/Qmcdt5VezYzAJDBc4qN5JbANy5paFg9iKDjq8YksRvZhtL)

Vogliamo caricare ora un altro documento su Pinata. Ma prima, dobbiamo crearlo!

Nella tua cartella di root, crea un nuovo file chiamato nft-metadata.json e aggiungi il seguente codice json:

```json
{
  "attributes": [
    {
      "trait_type": "Razza",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Colore occhio",
      "value": "Mocha"
    }
  ],
  "description": "Il cucciolo più adorabile e sensibile al mondo.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

Puoi modificare liberamente i dati nel json. Puoi rimuoverli o aggiungerli alla sezione degli attributi. Soprattutto, assicurati che il campo immagine punti alla posizione della tua immagine IPFS; altrimenti, il tuo NFT includerà la foto di un cane (molto carino!).

Una volta finito di modificare il file json, salvalo e caricalo su Pinata, seguendo gli stessi passaggi di caricamento dell'immagine.

![Come caricare il tuo nft-metadata.json su Pinata](./uploadPinata.gif)

## Fase 5: crea un'istanza del tuo contratto {#instance-contract}

Ora, per interagire con il nostro contratto, dobbiamo crearne un'istanza nel nostro codice. Per farlo, avremo bisogno dell'indirizzo del nostro contratto, che possiamo ottenere dalla distribuzione o da [Etherscan](https://ropsten.etherscan.io/), cercando l'indirizzo usato per distribuire il contratto.

![Visualizza l'indirizzo del tuo contratto su Etherscan](./viewContractEtherscan.png)

Nell'esempio precedente, l'indirizzo del nostro contratto è 0x81c587EB0fE773404c42c1d2666b5f557C470eED.

Poi useremo il [metodo di contratto](https://web3js.readthedocs.io/en/v1.2.0/web3-eth-contract.html?highlight=constructor#web3-eth-contract) di web3 per creare il nostro contratto usando l'ABI e l'indirizzo. Nel tuo file mint-nft.js, aggiungi quanto segue:

```js
const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Fase 6: aggiorna il file .env {#update-env}

Ora, per poter creare e inviare le transazioni alla catena di Ethereum, useremo l'indirizzo pubblico del tuo profilo di Ethereum per ottenere il nonce del profilo (spiegheremo in seguito).

Aggiungi la tua chiave pubblica al tuo file .env; se hai completato la parte 1 del tutorial, il nostro file .env dovrebbe somigliare a questo:

```js
API_URL = "https://eth-ropsten.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Fase 7: crea la tua transazione {#create-txn}

Prima di tutto, definiamo una funzione denominata `mintNFT(tokenData)` e creiamo la nostra transazione facendo quanto segue:

1. Prendi la tua _PRIVATE_KEY_ e _PUBLIC_KEY_ dal file `.env`.

1. Poi, dobbiamo trovare il nonce del profilo. La specifica di nonce è usata per tracciare il numero di transazioni inviate dal tuo indirizzo, di cui abbiamo bisogno per scopi di sicurezza e per prevenire gli [attacchi replay](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Per ottenere il numero di transazioni inviate dal tuo indirizzo, usiamo [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).

1. Infine, configureremo la nostra transazione con le seguenti informazioni:

- `'from': PUBLIC_KEY` — L'origine della nostra transazione è il nostro indirizzo pubblico

- `'to': contractAddress` — Il contratto con cui vogliamo interagire e a cui vogliamo inviare la transazione

- `'nonce': nonce` — Nonce dell'account con il numero di transazioni inviate dal nostro indirizzo

- `'gas': estimatedGas` — Il carburante stimato necessario per completare la transazione

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — Il calcolo che vogliamo eseguire in questa transazione, che in questo caso è il conio di un NFT

Il tuo file mint-nft.js dovrebbe somigliare a questo ora:

```js
   require('dotenv').config();
   const API_URL = process.env.API_URL;
   const PUBLIC_KEY = process.env.PUBLIC_KEY;
   const PRIVATE_KEY = process.env.PRIVATE_KEY;

   const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
   const web3 = createAlchemyWeb3(API_URL);

   const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
   const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED";
   const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

   async function mintNFT(tokenURI) {
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

   //the transaction
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```

## Fase 8: firma la transazione {#sign-txn}

Ora che abbiamo creato la nostra transazione, dobbiamo firmarla per inviarla. Ecco dove useremo la nostra chiave privata.

`web3.eth. endSignedTransaction` ci darà l'hash della transazione, che possiamo usare per assicurarci che la nostra transazione sia stata minata e non sia stata eliminata dalla rete. Noterai nella sezione di firma della transazione che abbiamo aggiunto dei controlli degli errori, per poter sapere se la nostra transazione è passata correttamente.

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}
```

## Fase 9: chiamare mintNFT ed eseguire il nodo mint-nft.js {#call-mintnft-fn}

Ricordi il metadata.json che hai caricato su Pinata? Ottieni il suo hashcode da Pinata e passa il seguente come un parametro alla funzione mintNFT `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

Ecco come ottenere l'hashcode:

![Come ottenere l'hashcode dei metadati del tuo NFT su Pinata](./metadataPinata.gif)_Come ottenere l'hashcode dei metadati del tuo NFT su Pinata_

> Ricontrolla che l'hashcode che hai copiato si colleghi al tuo **metadata.json**, caricando `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` in una finestra separata. La pagina dovrebbe somigliare al seguente screenshot:

![La tua pagina dovrebbe visualizzare i metadati in json](./metadataJSON.png)_La tua pagina deve mostrare i metadati in json_

Nel complesso, il tuo codice dovrebbe somigliare a questo:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Qualcosa è andato storto inviando la tua transazione:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promessa fallita:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Ora, esegui `scripts/mint-nft.js` per distribuire il tuo NFT. Dopo qualche secondo, dovresti vedere una risposta come questa nel tuo terminale:

    The hash of your transaction is: 0x10e5062309de0cd0be7edc92e8dbab191aa2791111c44274483fa766039e0e00

    Check Alchemy's Mempool to view the status of your transaction!

Vai quindi alla tua [mempool di Alchemy](https://dashboard.alchemyapi.io/mempool) per vedere lo stato della transazione (se è sospesa, minata o eliminata dalla rete). Se la tua transazione è stata eliminata, è utile controllare anche [Ropsten Etherscan](https://ropsten.etherscan.io/) e cercare l'hash della transazione.

![Visualizza l'hash della tua transazione NFT su Etherscan](./viewNFTEtherscan.png)_Visualizza l'hash della tua transazione NFT su Etherscan_

Ecco fatto! Hai ora distribuito E coniato con un NFT sulla Blockchain di Ethereum <Emoji text=":money_mouth_face:" size={1} />

Usando mint-nft.js puoi coniare tutti gli NFT che desideri (e che può permettersi il tuo portafoglio)! Basta che ti accerti di passare un nuovo tokenURI che descriva i metadati dell'NFT (altrimenti, finirai per crearne tanti identici con ID differenti).

Molto probabilmente vorrai visualizzare il tuo NFT nel tuo portafoglio, quindi assicurati di leggere la [Parte 3: come visualizzare il tuo NFT nel portafoglio](/developers/tutorials/how-to-view-nft-in-metamask/)!
