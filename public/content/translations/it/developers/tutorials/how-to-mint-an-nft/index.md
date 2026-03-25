---
title: Come coniare un NFT (Parte 2/3 della serie di tutorial sugli NFT)
description: Questo tutorial descrive come coniare un NFT sulla blockchain di Ethereum usando il nostro contratto intelligente e Web3.
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "contratti intelligenti"]
skill: beginner
breadcrumb: Coniare un NFT
lang: it
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): 69 milioni di dollari
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): 11 milioni di dollari
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): 6 milioni di dollari

Tutti loro hanno coniato i propri NFT usando la potente API di Alchemy. In questo tutorial, ti insegneremo come fare lo stesso in \<10 minuti.

"Coniare un NFT" è l'atto di pubblicare un'istanza unica del tuo token ERC-721 sulla blockchain. Usando il nostro contratto intelligente dalla [Parte 1 di questa serie di tutorial sugli NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/), mettiamo in mostra le nostre abilità con Web3 e coniamo un NFT. Alla fine di questo tutorial, sarai in grado di coniare tutti gli NFT che il tuo cuore (e il tuo portafoglio) desidera!

Iniziamo!

## Passaggio 1: Installare Web3 {#install-web3}

Se hai seguito il primo tutorial sulla creazione del tuo contratto intelligente per NFT, hai già esperienza nell'uso di Ethers.js. Web3 è simile a Ethers, in quanto è una libreria usata per facilitare la creazione di richieste alla blockchain di [Ethereum](/). In questo tutorial useremo [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3), che è una libreria Web3 migliorata che offre tentativi automatici e un solido supporto per WebSocket.

Nella directory principale del tuo progetto esegui:

```
npm install @alch/alchemy-web3
```

## Passaggio 2: Creare un file `mint-nft.js` {#create-mintnftjs}

All'interno della tua directory degli script, crea un file `mint-nft.js` e aggiungi le seguenti righe di codice:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Passaggio 3: Ottenere l'ABI del tuo contratto {#contract-abi}

L'ABI (Application Binary Interface) del nostro contratto è l'interfaccia per interagire con il nostro contratto intelligente. Puoi saperne di più sulle ABI dei contratti [qui](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is). Hardhat genera automaticamente un'ABI per noi e la salva nel file `MyNFT.json`. Per poterla usare dovremo analizzarne i contenuti aggiungendo le seguenti righe di codice al nostro file `mint-nft.js`:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Se vuoi vedere l'ABI puoi stamparla nella tua console:

```js
console.log(JSON.stringify(contract.abi))
```

Per eseguire `mint-nft.js` e vedere la tua ABI stampata nella console, naviga nel tuo terminale ed esegui:

```js
node scripts/mint-nft.js
```

## Passaggio 4: Configurare i metadati per il tuo NFT usando IPFS {#config-meta}

Se ricordi dal nostro tutorial nella Parte 1, la nostra funzione del contratto intelligente `mintNFT` accetta un parametro tokenURI che dovrebbe risolversi in un documento JSON che descrive i metadati dell'NFT, che è in realtà ciò che dà vita all'NFT, permettendogli di avere proprietà configurabili, come un nome, una descrizione, un'immagine e altri attributi.

> _L'Interplanetary File System (IPFS) è un protocollo decentralizzato e una rete peer-to-peer per l'archiviazione e la condivisione di dati in un file system distribuito._

Useremo Pinata, una comoda API e toolkit IPFS, per archiviare la risorsa e i metadati del nostro NFT per assicurarci che il nostro NFT sia veramente decentralizzato. Se non hai un account Pinata, registrati per un account gratuito [qui](https://app.pinata.cloud) e completa i passaggi per verificare la tua email.

Una volta creato un account:

- Naviga alla pagina "Files" e clicca sul pulsante blu "Upload" in alto a sinistra della pagina.

- Carica un'immagine su Pinata: questa sarà la risorsa immagine per il tuo NFT. Sentiti libero di nominare la risorsa come preferisci

- Dopo il caricamento, vedrai le informazioni del file nella tabella sulla pagina "Files". Vedrai anche una colonna CID. Puoi copiare il CID cliccando sul pulsante di copia accanto ad esso. Puoi visualizzare il tuo caricamento su: `https://gateway.pinata.cloud/ipfs/<CID>`. Puoi trovare l'immagine che abbiamo usato su IPFS [qui](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5), per esempio.

Per chi apprende in modo più visivo, i passaggi precedenti sono riassunti qui:

![Come caricare la tua immagine su Pinata](./instructionsPinata.gif)

Ora, vorremo caricare un altro documento su Pinata. Ma prima di farlo, dobbiamo crearlo!

Nella tua directory principale, crea un nuovo file chiamato `nft-metadata.json` e aggiungi il seguente codice json:

```json
{
  "attributes": [
    {
      "trait_type": "Breed",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Eye color",
      "value": "Mocha"
    }
  ],
  "description": "The world's most adorable and sensitive pup.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

Sentiti libero di cambiare i dati nel json. Puoi rimuovere o aggiungere alla sezione degli attributi. La cosa più importante è assicurarsi che il campo dell'immagine punti alla posizione della tua immagine IPFS, altrimenti il tuo NFT includerà una foto di un cane (molto carino!).

Una volta terminata la modifica del file JSON, salvalo e caricalo su Pinata, seguendo gli stessi passaggi che abbiamo fatto per caricare l'immagine.

![Come caricare il tuo nft-metadata.json su Pinata](./uploadPinata.gif)

## Passaggio 5: Creare un'istanza del tuo contratto {#instance-contract}

Ora, per interagire con il nostro contratto, dobbiamo crearne un'istanza nel nostro codice. Per farlo avremo bisogno del nostro indirizzo del contratto che possiamo ottenere dalla distribuzione o da [Blockscout](https://eth-sepolia.blockscout.com/) cercando l'indirizzo che hai usato per distribuire il contratto.

![Visualizza l'indirizzo del tuo contratto su Etherscan](./view-contract-etherscan.png)

Nell'esempio sopra, il nostro indirizzo del contratto è 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Successivamente useremo il [metodo contract](https://docs.web3js.org/api/web3-eth-contract/class/Contract) di Web3 per creare il nostro contratto usando l'ABI e l'indirizzo. Nel tuo file `mint-nft.js`, aggiungi quanto segue:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Passaggio 6: Aggiornare il file `.env` {#update-env}

Ora, per creare e inviare transazioni alla catena di Ethereum, useremo l'indirizzo pubblico del tuo account Ethereum per ottenere il nonce dell'account (lo spiegheremo di seguito).

Aggiungi la tua chiave pubblica al tuo file `.env`: se hai completato la parte 1 del tutorial, il nostro file `.env` dovrebbe ora apparire così:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Passaggio 7: Creare la tua transazione {#create-txn}

Per prima cosa, definiamo una funzione chiamata `mintNFT(tokenData)` e creiamo la nostra transazione facendo quanto segue:

1. Prendi la tua _PRIVATE_KEY_ e _PUBLIC_KEY_ dal file `.env`.

1. Successivamente, dovremo capire il nonce dell'account. La specifica del nonce è usata per tenere traccia del numero di transazioni inviate dal tuo indirizzo, di cui abbiamo bisogno per motivi di sicurezza e per prevenire [attacchi di replay](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Per ottenere il numero di transazioni inviate dal tuo indirizzo, usiamo [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).

1. Infine imposteremo la nostra transazione con le seguenti informazioni:

- `'from': PUBLIC_KEY` — L'origine della nostra transazione è il nostro indirizzo pubblico

- `'to': contractAddress` — Il contratto con cui desideriamo interagire e a cui inviare la transazione

- `'nonce': nonce` — Il nonce dell'account con il numero di transazioni inviate dal nostro indirizzo

- `'gas': estimatedGas` — Il gas stimato necessario per completare la transazione

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — Il calcolo che desideriamo eseguire in questa transazione, che in questo caso è coniare un NFT

Il tuo file `mint-nft.js` dovrebbe apparire così ora:

```js
   require('dotenv').config();
   const API_URL = process.env.API_URL;
   const PUBLIC_KEY = process.env.PUBLIC_KEY;
   const PRIVATE_KEY = process.env.PRIVATE_KEY;

   const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
   const web3 = createAlchemyWeb3(API_URL);

   const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
   const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778";
   const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

   async function mintNFT(tokenURI) {
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); // ottieni l'ultimo nonce

   // la transazione
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```

## Passaggio 8: Firmare la transazione {#sign-txn}

Ora che abbiamo creato la nostra transazione, dobbiamo firmarla per poterla inviare. È qui che useremo la nostra chiave privata.

`web3.eth.sendSignedTransaction` ci darà l'hash della transazione, che possiamo usare per assicurarci che la nostra transazione sia stata minata e non sia stata scartata dalla rete. Noterai che nella sezione della firma della transazione, abbiamo aggiunto un controllo degli errori in modo da sapere se la nostra transazione è andata a buon fine.

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") // ottieni l'ultimo nonce

  // la transazione
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

## Passaggio 9: Chiamare `mintNFT` ed eseguire node `mint-nft.js` {#call-mintnft-fn}

Ricordi il `metadata.json` che hai caricato su Pinata? Ottieni il suo codice hash da Pinata e passa quanto segue come parametro alla funzione `mintNFT` `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

Ecco come ottenere il codice hash:

![Come ottenere il codice hash dei metadati del tuo nft su Pinata](./metadataPinata.gif)_Come ottenere il codice hash dei metadati del tuo nft su Pinata_

> Controlla due volte che il codice hash che hai copiato si colleghi al tuo **metadata.json** caricando `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` in una finestra separata. La pagina dovrebbe apparire simile allo screenshot qui sotto:

![La tua pagina dovrebbe visualizzare i metadati json](./metadataJSON.png)_La tua pagina dovrebbe visualizzare i metadati json_

Nel complesso, il tuo codice dovrebbe apparire più o meno così:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") // ottieni l'ultimo nonce

  // la transazione
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
      console.log("Promise failed:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Ora, esegui `node scripts/mint-nft.js` per distribuire il tuo NFT. Dopo un paio di secondi, dovresti vedere una risposta come questa nel tuo terminale:

    The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8

    Check Alchemy's Mempool to view the status of your transaction!

Successivamente, visita la tua [mempool di Alchemy](https://dashboard.alchemyapi.io/mempool) per vedere lo stato della tua transazione (se è in sospeso, minata o è stata scartata dalla rete). Se la tua transazione è stata scartata, è anche utile controllare [Blockscout](https://eth-sepolia.blockscout.com/) e cercare l'hash della tua transazione.

![Visualizza l'hash della transazione del tuo NFT su Etherscan](./view-nft-etherscan.png)_Visualizza l'hash della transazione del tuo NFT su Etherscan_

E questo è tutto! Ora hai distribuito E coniato un NFT sulla blockchain di Ethereum <Emoji text=":money_mouth_face:" size={1} />

Usando `mint-nft.js` puoi coniare tutti gli NFT che il tuo cuore (e il tuo portafoglio) desidera! Assicurati solo di passare un nuovo tokenURI che descrive i metadati dell'NFT (altrimenti, finirai solo per crearne un mucchio identici con ID diversi).

Presumibilmente, ti piacerebbe poter mostrare il tuo NFT nel tuo portafoglio, quindi assicurati di dare un'occhiata alla [Parte 3: Come visualizzare il tuo NFT nel tuo portafoglio](/developers/tutorials/how-to-view-nft-in-metamask/)!