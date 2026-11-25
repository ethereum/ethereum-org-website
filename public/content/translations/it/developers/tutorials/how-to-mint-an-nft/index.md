---
title: Come coniare un NFT (Parte 2/3 della serie di tutorial sugli NFT)
description: Questo tutorial descrive come coniare un token non fungibile (NFT) sulla blockchain di Ethereum utilizzando il nostro smart contract, Hardhat ed ethers.js.
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "smart contract"]
skill: beginner
breadcrumb: Coniare un NFT
lang: it
published: 2021-04-22
---

Il "conio di un token non fungibile (NFT)" è l'atto di pubblicare un'istanza unica del tuo token ERC-721 sulla blockchain. Utilizzando il nostro smart contract dalla [Parte 1 di questa serie di tutorial sugli NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/), mettiamo in pratica le nostre competenze nel Web3 e coniamo un NFT. Alla fine di questo tutorial, sarai in grado di coniare tutti gli NFT che il tuo cuore (e il tuo portafoglio) desidera!

Iniziamo!

## Passaggio 1: Controlla la tua configurazione {#install-web3}

Se hai seguito il primo tutorial sulla creazione del tuo smart contract per token non fungibili (NFT), hai già tutto ciò di cui hai bisogno: un progetto Hardhat 3 con il [plugin Ethers](https://hardhat.org/docs/plugins/hardhat-ethers) ed [ethers.js](https://docs.ethers.org/v6/), una libreria utilizzata per facilitare la creazione di richieste alla blockchain di [Ethereum](/). Scriveremo il nostro codice di conio come script di Hardhat, in modo che riutilizzi le impostazioni della rete Sepolia e i valori `API_URL` e `PRIVATE_KEY` della Parte 1: non c'è nient'altro da installare.

## Passaggio 2: Crea un file `mint-nft.js` {#create-mintnftjs}

All'interno della tua directory degli script, crea un file `mint-nft.js` e aggiungi le seguenti righe di codice:

```js
import { network } from "hardhat"

const { ethers } = await network.create()
```

Come nel nostro script di distribuzione, `network.create()` si connette alla rete che scegli con `--network` quando esegui lo script, e ci fornisce un oggetto `ethers` per essa.

## Passaggio 3: Ottieni l'ABI del tuo contratto {#contract-abi}

L'Interfaccia binaria dell'applicazione (ABI) del nostro contratto è l'interfaccia per interagire con il nostro smart contract. Puoi saperne di più sulle [ABI dei contratti](/glossary/#abi). Hardhat genera automaticamente un'ABI per noi quando compila il contratto e la salva nel file `artifacts/contracts/MyNFT.sol/MyNFT.json`. Il plugin Ethers di Hardhat la legge da lì per noi quando creiamo l'istanza del nostro contratto nel passaggio 5, quindi non abbiamo bisogno di caricarla noi stessi.

Se vuoi vedere l'ABI puoi stamparla nella tua console. Dalla directory principale del tuo progetto, esegui:

```sh
node -p "JSON.stringify(require('./artifacts/contracts/MyNFT.sol/MyNFT.json').abi)"
```

## Passaggio 4: Configura i metadati per il tuo NFT usando IPFS {#config-meta}

Se ricordi dal nostro tutorial nella Parte 1, la funzione `mintNFT` del nostro smart contract accetta un parametro tokenURI che dovrebbe risolversi in un documento JSON che descrive i metadati del token non fungibile (NFT): questo è ciò che dà davvero vita all'NFT, consentendogli di avere proprietà configurabili, come un nome, una descrizione, un'immagine e altri attributi.

> _L'Interplanetary File System (IPFS) è un protocollo decentralizzato e una rete peer-to-peer per l'archiviazione e la condivisione di dati in un file system distribuito._

Utilizzeremo Pinata, una comoda interfaccia di programmazione delle applicazioni (API) e toolkit per IPFS, per archiviare la risorsa e i metadati del nostro NFT per assicurarci che il nostro NFT sia veramente decentralizzato. Se non hai un account Pinata, registrati per un account gratuito [qui](https://app.pinata.cloud) e completa i passaggi per verificare la tua email.

Una volta creato un account:

- Vai alla [pagina Files](https://app.pinata.cloud/ipfs/files) e fai clic sul pulsante "Add" (Aggiungi) nell'angolo in alto a destra della pagina.

- Carica un'immagine su Pinata: questa sarà la risorsa immagine per il tuo NFT. Sentiti libero di dare alla risorsa il nome che preferisci. Assicurati di caricarla sull'IPFS pubblico: i file sull'[IPFS privato](https://docs.pinata.cloud/files/private-ipfs) non possono essere recuperati dai portafogli e dai marketplace che mostrano il tuo NFT.

- Dopo il caricamento, vedrai il file elencato nella pagina Files insieme al suo CID (identificatore di contenuto). Copia il CID. Puoi visualizzare il tuo caricamento su: `https://gateway.pinata.cloud/ipfs/<CID>`, oppure tramite il gateway dedicato elencato sotto "Gateways" nella barra laterale di Pinata. Puoi trovare l'immagine che abbiamo usato su IPFS [qui](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5), per esempio.

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

Sentiti libero di modificare i dati nel json. Puoi rimuovere o aggiungere elementi alla sezione degli attributi. La cosa più importante è assicurarsi che il campo dell'immagine punti alla posizione della tua immagine IPFS, nel formato `ipfs://<image-CID>`, altrimenti il tuo NFT includerà la foto di un cane (molto carino!).

Una volta terminata la modifica del file JSON, salvalo e caricalo su Pinata, seguendo gli stessi passaggi che abbiamo fatto per caricare l'immagine. Copia anche il CID di `nft-metadata.json`; ne avremo bisogno nel passaggio 9.

## Passaggio 5: Crea un'istanza del tuo contratto {#instance-contract}

Ora, per interagire con il nostro contratto, dobbiamo crearne un'istanza nel nostro codice. Per farlo avremo bisogno dell'indirizzo del nostro contratto, che il nostro script di distribuzione ha stampato nella Parte 1. Puoi anche trovarlo su [Etherscan](https://sepolia.etherscan.io/) o [Blockscout](https://eth-sepolia.blockscout.com/) cercando l'indirizzo che hai usato per distribuire il contratto.

![Visualizza l'indirizzo del tuo contratto su Etherscan](./view-contract-etherscan.png)

Nell'esempio sopra, l'indirizzo del nostro contratto è 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Successivamente utilizzeremo il metodo `getContractAt` del plugin Ethers di Hardhat per creare il nostro contratto usando il suo nome (che gli dice quale Interfaccia binaria dell'applicazione (ABI) usare) e il suo indirizzo. Nel tuo file `mint-nft.js`, aggiungi quanto segue, sostituendo l'indirizzo con il tuo:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)
```

## Passaggio 6: Controlla il file `.env` {#update-env}

Ogni transazione che inviamo deve essere firmata con la chiave privata del tuo account. Se hai completato la parte 1 del tutorial, il nostro file `.env` dovrebbe già avere questo aspetto:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Non c'è bisogno di aggiungere il tuo indirizzo pubblico: ethers lo ricava dalla chiave privata.

## Passaggio 7: Crea la tua transazione {#create-txn}

Innanzitutto, definiamo una funzione chiamata `mintNFT(tokenURI)` e creiamo la nostra transazione facendo quanto segue:

1. Ottieni l'account da cui inviamo la transazione. `ethers.getSigners()` restituisce gli account configurati per la rete, che su Sepolia è l'account la cui chiave privata si trova in `.env`. Poiché `mintNFT` è `onlyOwner`, questo deve essere lo stesso account che ha distribuito il contratto.

1. Chiama la funzione `mintNFT` sull'istanza del nostro contratto, con il nostro indirizzo come destinatario e l'URI dei metadati. Questo è il calcolo che desideriamo eseguire in questa transazione, che in questo caso è il conio di un token non fungibile (NFT).

Non hai bisogno di calcolare da solo il nonce (il numero di transazioni inviate dal tuo indirizzo, che previene gli attacchi di replay), il limite di gas o le commissioni: ethers li recupera o li stima prima di inviare la transazione.

Il tuo file `mint-nft.js` ora dovrebbe avere questo aspetto:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  // Invia la transazione. ethers compila il nonce, il limite di gas e le commissioni per noi.
  const tx = await nftContract.mintNFT(signer.address, tokenURI)
}
```

## Passaggio 8: Firma la transazione {#sign-txn}

Poiché la rete è configurata con la nostra chiave privata, ethers firma automaticamente la transazione con essa prima di inviarla.

La chiamata a `mintNFT` restituisce un valore una volta che la transazione è stata inviata e ci fornisce l'hash della transazione, che possiamo usare per assicurarci che la nostra transazione sia stata minata e non sia stata scartata dalla rete. `tx.wait()` attende quindi finché la transazione non viene inclusa in un blocco. Abbiamo anche aggiunto un controllo degli errori in modo da sapere se la nostra transazione è andata a buon fine.

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // Invia la transazione. ethers compila il nonce, il limite di gas e le commissioni per noi.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // Attendi che la transazione venga inclusa in un blocco
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}
```

## Passaggio 9: Chiama `mintNFT` ed esegui `mint-nft.js` {#call-mintnft-fn}

Ricordi il file `nft-metadata.json` che hai caricato su Pinata? Ottieni il suo CID da Pinata e passa `ipfs://<metadata-CID>` come parametro alla funzione `mintNFT`. I portafogli e i marketplace risolvono gli URI `ipfs://` tramite un gateway IPFS di loro scelta, in modo che il tuo token non fungibile (NFT) non dipenda da un singolo gateway.

> Ricontrolla che il CID che hai copiato si colleghi al tuo **nft-metadata.json** caricando `https://gateway.pinata.cloud/ipfs/<metadata-CID>` in una finestra separata. La pagina dovrebbe essere simile allo screenshot qui sotto:

![La tua pagina dovrebbe mostrare i metadati json](./metadataJSON.png)_La tua pagina dovrebbe mostrare i metadati json_

Nel complesso, il tuo codice dovrebbe avere un aspetto simile a questo:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // Invia la transazione. ethers compila il nonce, il limite di gas e le commissioni per noi.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // Attendi che la transazione venga inclusa in un blocco
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}

await mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Ora, esegui lo script su Sepolia per coniare il tuo NFT:

```sh
npx hardhat run scripts/mint-nft.js --network sepolia
```

Dopo qualche secondo, dovresti vedere una risposta come questa nel tuo terminale:

```text
The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
Your NFT was minted in block <block number>
```

Per vedere i dettagli della tua transazione, cerca il suo hash su [Etherscan](https://sepolia.etherscan.io/) o [Blockscout](https://eth-sepolia.blockscout.com/).

![Visualizza l'hash della transazione del tuo NFT su Etherscan](./view-nft-etherscan.png)_Visualizza l'hash della transazione del tuo NFT su Etherscan_

E questo è tutto! Ora hai distribuito E coniato un NFT sulla blockchain di Ethereum <Emoji text=":money_mouth_face:" size={1} />

Usando `mint-nft.js` puoi coniare tutti gli NFT che il tuo cuore (e il tuo portafoglio) desidera! Assicurati solo di passare un nuovo tokenURI che descriva i metadati dell'NFT (altrimenti, finirai solo per crearne un mucchio identico con ID diversi).

Presumibilmente, ti piacerebbe poter sfoggiare il tuo NFT nel tuo portafoglio, quindi assicurati di dare un'occhiata alla [Parte 3: Come visualizzare il tuo NFT nel tuo portafoglio](/developers/tutorials/how-to-view-nft-in-metamask/)!
