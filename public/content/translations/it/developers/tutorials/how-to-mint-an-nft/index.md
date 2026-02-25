---
title: Come coniare un NFT (Parte 2/3 della serie di tutorial sugli NFT)
description: Questo tutorial descrive come coniare un NFT sulla blockchain di Ethereum usando il nostro contratto intelligente e Web3.
author: "Sumi Mudgil"
tags: [ "ERC-721", "alchemy", "Solidity", "smart contract" ]
skill: beginner
lang: it
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): 69 milioni di dollari
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): 11 milioni di dollari
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): 6 milioni di dollari

Tutti loro hanno coniato i propri NFT utilizzando la potente API di Alchemy. In questo tutorial ti insegneremo come fare lo stesso in \<10 minuti.

"Coniare un NFT" è l'atto di pubblicare un'istanza unica del tuo token ERC-721 sulla blockchain. Usando il nostro contratto intelligente dalla [Parte 1 di questa serie di tutorial sugli NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/), dimostriamo le nostre abilità con Web3 e coniamo un NFT. Alla fine di questo tutorial, potrai coniare tutti gli NFT che desideri (e che può permettersi il tuo portafoglio)!

Iniziamo!

## Fase 1: Installare Web3 {#install-web3}

Se hai seguito il primo tutorial sulla creazione del tuo contratto intelligente di NFT, hai già esperienza con Ethers.js. Web3 è simile a Ethers, trattandosi di una libreria usata per effettuare più facilmente richieste alla blockchain di Ethereum. In questo tutorial useremo [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3), una libreria Web3 migliorata che offre tentativi automatici e un solido supporto a WebSocket.

Nella cartella principale del tuo progetto, esegui:

```
npm install @alch/alchemy-web3
```

## Fase 2: Crea un file `mint-nft.js` {#create-mintnftjs}

Nella tua cartella degli script, crea un file `mint-nft.js` e aggiungi le seguenti righe di codice:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Fase 3: Prendi l'ABI del tuo contratto {#contract-abi}

L'ABI (Application Binary Interface) del nostro contratto è l'interfaccia per interagire con il nostro contratto intelligente. Puoi saperne di più sugli ABI dei contratti [qui](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is). Hardhat genera automaticamente un'ABI per noi e la salva nel file `MyNFT.json`. Per poterla usare, dovremo analizzarne i contenuti aggiungendo le seguenti righe di codice al nostro file `mint-nft.js`:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Se vuoi vedere l'ABI, puoi stamparla nella tua console:

```js
console.log(JSON.stringify(contract.abi))
```

Per eseguire `mint-nft.js` e vedere la tua ABI stampata sulla console, vai al tuo terminale ed esegui:

```js
node scripts/mint-nft.js
```

## Fase 4: Configura i metadati del tuo NFT usando IPFS {#config-meta}

Se ricordi dal nostro tutorial nella Parte 1, la funzione del nostro contratto intelligente `mintNFT` riceve un parametro tokenURI, che dovrebbe risolversi in un documento JSON che descrive i metadati dell'NFT, ed è questo che porta realmente in vita l'NFT, consentendogli di avere proprietà configurabili, quali nome, descrizione, immagine e altri attributi.

> _L'Interplanetary File System (IPFS) è un protocollo decentralizzato e una rete peer-to-peer per l'archiviazione e la condivisione di dati in un file system distribuito._

Useremo Pinata, una comoda API e un pratico toolkit di IPFS per archiviare le risorse e i metadati del nostro NFT e per garantire che il nostro NFT sia veramente decentralizzato. Se non hai un account Pinata, creane uno gratuito [qui](https://app.pinata.cloud) e completa i passaggi per verificare la tua e-mail.

Una volta creato un account:

- Vai alla pagina "File" e fai clic sul pulsante blu "Carica" in alto a sinistra nella pagina.

- Carica un'immagine su Pinata: sarà la risorsa immagine del tuo NFT. Puoi dare alla risorsa il nome che desideri

- Dopo il caricamento, vedrai le informazioni del file nella tabella sulla pagina "File". Vedrai anche una colonna CID. Puoi copiare il CID facendo clic sul pulsante di copia accanto. Puoi visualizzare il file caricato su: `https://gateway.pinata.cloud/ipfs/<CID>`. Ad esempio, puoi trovare l'immagine che abbiamo usato su IPFS [qui](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5).

Per chi impara più facilmente con supporti visivi, i passaggi precedenti sono riassunti qui:

![Come caricare la tua immagine su Pinata](./instructionsPinata.gif)

Ora caricheremo un altro documento su Pinata. Ma prima, dobbiamo crearlo!

Nella tua cartella radice, crea un nuovo file chiamato `nft-metadata.json` e aggiungi il seguente codice json:

```json
{
  "attributes": [
    {
      "trait_type": "Razza",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Colore occhi",
      "value": "Moka"
    }
  ],
  "description": "Il cucciolo più adorabile e sensibile del mondo.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

Puoi modificare liberamente i dati nel file json. Puoi rimuovere attributi o aggiungerne di nuovi. Soprattutto, assicurati che il campo dell'immagine punti alla posizione della tua immagine IPFS, altrimenti il tuo NFT includerà una foto di un ( carinissimo!) cane.

Una volta finito di modificare il file JSON, salvalo e caricalo su Pinata, seguendo gli stessi passaggi di caricamento dell'immagine.

![Come caricare il file nft-metadata.json su Pinata](./uploadPinata.gif)

## Fase 5: Crea un'istanza del tuo contratto {#instance-contract}

Ora, per interagire con il nostro contratto, dobbiamo crearne un'istanza nel nostro codice. Per farlo, avremo bisogno dell'indirizzo del nostro contratto, che possiamo ottenere dalla distribuzione o da [Blockscout](https://eth-sepolia.blockscout.com/) cercando l'indirizzo che hai usato per distribuire il contratto.

![Visualizza l'indirizzo del tuo contratto su Etherscan](./view-contract-etherscan.png)

Nell'esempio precedente, l'indirizzo del nostro contratto è 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Successivamente, useremo il [metodo contract](https://docs.web3js.org/api/web3-eth-contract/class/Contract) di Web3 per creare il nostro contratto usando l'ABI e l'indirizzo. Nel tuo file `mint-nft.js`, aggiungi quanto segue:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Fase 6: Aggiorna il file `.env` {#update-env}

Ora, per creare e inviare transazioni alla catena di Ethereum, useremo l'indirizzo pubblico del tuo account Ethereum per ottenere il nonce dell'account (lo spiegheremo più avanti).

Aggiungi la tua chiave pubblica al tuo file `.env`; se hai completato la parte 1 del tutorial, il nostro file `.env` dovrebbe ora avere questo aspetto:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Fase 7: Crea la tua transazione {#create-txn}

Prima di tutto, definiamo una funzione denominata `mintNFT(tokenData)` e creiamo la nostra transazione nel modo seguente:

1. Prendi i tuoi _PRIVATE_KEY_ e _PUBLIC_KEY_ dal file `.env`.

2. Successivamente, dovremo ricavare il nonce dell'account. La specifica del nonce è usata per tracciare il numero di transazioni inviate dal tuo indirizzo, di cui necessitiamo per motivi di sicurezza e per impedire gli [attacchi di riproduzione](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Per ottenere il numero di transazioni inviate dal tuo indirizzo, usiamo [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).

3. Infine, configureremo la nostra transazione con le seguenti informazioni:

- `'from': PUBLIC_KEY` — L'origine della nostra transazione è il nostro indirizzo pubblico

- `'to': contractAddress` — Il contratto con cui vogliamo interagire e a cui vogliamo inviare la transazione

- `'nonce': nonce` — Il nonce dell'account con il numero di transazioni inviate dal nostro indirizzo

- `'gas': estimatedGas` — Il gas stimato necessario per completare la transazione

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — Il calcolo che vogliamo eseguire in questa transazione, che in questo caso è il conio di un NFT

Il tuo file `mint-nft.js` dovrebbe ora avere questo aspetto:

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

## Fase 8: Firma la transazione {#sign-txn}

Ora che abbiamo creato la nostra transazione, dobbiamo firmarla per poterla inviare. Qui è dove useremo la nostra chiave privata.

`web3.eth.sendSignedTransaction` ci darà l'hash della transazione, che possiamo usare per assicurarci che la nostra transazione sia stata minata e non sia stata scartata dalla rete. Noterai che nella sezione di firma della transazione abbiamo aggiunto dei controlli degli errori, per poter sapere se la nostra transazione è andata a buon fine.

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
              "L'hash della tua transazione è: ",
              hash,
              "\nControlla il Mempool di Alchemy per visualizzare lo stato della tua transazione!"
            )
          } else {
            console.log(
              "Qualcosa è andato storto durante l'invio della transazione:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise non riuscita:", err)
    })
}
```

## Fase 9: Chiama `mintNFT` ed esegui `node mint-nft.js` {#call-mintnft-fn}

Ricordi il file `metadata.json` che hai caricato su Pinata? Ottieni il suo codice hash da Pinata e passalo come parametro alla funzione `mintNFT` `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

Ecco come ottenere il codice hash:

![Come ottenere il codice hash dei metadati del tuo NFT su Pinata](./metadataPinata.gif)_Come ottenere il codice hash dei metadati del tuo NFT su Pinata_

> Verifica che il codice hash che hai copiato rimandi al tuo file **metadata.json** caricando `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` in una finestra separata. La pagina dovrebbe avere un aspetto simile allo screenshot qui sotto:

![La tua pagina dovrebbe visualizzare i metadati json](./metadataJSON.png)_La tua pagina dovrebbe visualizzare i metadati json_

Nel complesso, il tuo codice dovrebbe avere questo aspetto:

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
              "L'hash della tua transazione è: ",
              hash,
              "\nControlla il Mempool di Alchemy per visualizzare lo stato della tua transazione!"
            )
          } else {
            console.log(
              "Qualcosa è andato storto durante l'invio della transazione:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise non riuscita:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Ora, esegui `node scripts/mint-nft.js` per distribuire il tuo NFT. Dopo qualche secondo, dovresti vedere una risposta come questa nel tuo terminale:

    ```
    L'hash della tua transazione è: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
    
    Controlla il Mempool di Alchemy per visualizzare lo stato della tua transazione!
    ```

Successivamente, visita il [mempool di Alchemy](https://dashboard.alchemyapi.io/mempool) per vedere lo stato della tua transazione (se è in sospeso, minata o è stata scartata dalla rete). Se la transazione è stata scartata, è utile anche controllare su [Blockscout](https://eth-sepolia.blockscout.com/) e cercare l'hash della transazione.

![Visualizza l'hash della transazione del tuo NFT su Etherscan](./view-nft-etherscan.png)_Visualizza l'hash della transazione del tuo NFT su Etherscan_

Ecco fatto! Hai distribuito E coniato un NFT sulla blockchain di Ethereum <Emoji text=":money_mouth_face:" size={1} />

Utilizzando `mint-nft.js`, puoi coniare quanti NFT il tuo cuore (e portafoglio) desidera! Basta che ti accerti di passare un nuovo tokenURI che descriva i metadati dell'NFT (altrimenti, finirai per crearne tanti identici con ID differenti).

Probabilmente vorrai poter mostrare il tuo NFT nel portafoglio, quindi assicurati di consultare la [Parte 3: Come visualizzare il tuo NFT nel tuo portafoglio](/developers/tutorials/how-to-view-nft-in-metamask/)!
