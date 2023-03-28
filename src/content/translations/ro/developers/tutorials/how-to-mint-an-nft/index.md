---
title: Cum să emitem un NFT (Partea 2/3 din seria de tutoriale despre NFT-uri)
description: Acest tutorial descrie cum se emite un NFT pe blockchain-ul Ethereum folosind contractul nostru inteligent și Web3.
author: "Sumi Mudgil"
tags:
  - "NFT-uri"
  - "ERC-721"
  - "Alchemy"
  - "Solidity"
  - "contractele inteligente"
skill: beginner
lang: ro
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): 69 de milioane de dolari [3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): 11 milioane de dolari [Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): 6 milioane de dolari

Toți și-au emis NFT-urile folosind puternicul API al Alchemy. În acest tutorial vă vom învăța cum să faceți același lucru în <10 minute.

„Emiterea unui NFT” este actul de a publica o instanță unică a tokenului dvs. ERC-721 pe blockchain. Utilizând contractul nostru inteligent din [Partea 1 a acestei serii de tutoriale despre NFT-uri](/developers/tutorials/how-to-write-and-deploy-an-nft/), haideți să ne adaptăm aptitudinile pentru web3 și să emitem un NFT. La sfârșitul acestui tutorial veți fi capabili să bateți cât de multe NFT-uri vă dorește inima (și portofelul)!

Să începem!

## Etapa 1: Instalarea web3 {#install-web3}

Dacă ați urmat primul tutorial privind crearea contractului inteligent NFT, aveţi deja experienţă în utilizarea Ethers.js. Web3 este similar cu Ethers, întrucât este o bibliotecă utilizată pentru a facilita crearea de cereri către blockchain-ul Ethereum. În acest tutorial vom folosi [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3), o bibliotecă Web3 îmbunătățită, care oferă reîncercări automate și o compatibilitate robustă cu WebSocket.

În directorul principal al proiectului dvs., rulați:

```
npm install @alch/alchemy-web3
```

## Etapa 2: Crearea unui fișier mint-nft.js {#create-mintnftjs}

În interiorul directorului dvs. de scripturi, creați un fișier mint-nft.js și adăugați următoarele linii de cod:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Etapa 3: Obţinerea ABI-ului contractului dvs. {#contract-abi}

ABI-ul contractului nostru (Application Binary Interface) („Interfața binară a aplicației”) este interfața de interacțiune cu contractul nostru inteligent. Puteți afla mai multe despre ABI-urile de contract [aici](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is). Hardhat ne generează automat un ABI și îl salvează în fișierul MyNFT.json. În vederea folosirii acestuia, va trebui să-i analizăm conținutul prin adăugarea următoarelor linii de cod în fișierul nostru mint-nft.js:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Dacă vreți să vedeți ABI-ul, îl puteți imprima în consolă:

```js
console.log(JSON.stringify(contract.abi))
```

Pentru a rula mint-nft.js și pentru a vedea ABI-ul imprimat în consolă, navigați în terminal și rulați

```js
node scripts/mint-nft.js
```

## Etapa 4: Configurarea metadatelor pentru NFT utilizând IPFS {#config-meta}

Dacă vă amintiți din tutorialul nostru din Partea 1, funcția noastră de contract inteligent mintNFT primește un parametru tokenURI care ar trebui să rezolve la un document JSON care descrie metadatele NFT-ului— și care este de fapt ceea ce dă viață NFT-ului, permițându-i să aibă proprietăți configurabile, cum ar fi un nume, o descriere, o imagine și alte atribute.

> _Interplanetary File System (IPFS) este un protocol descentralizat și o rețea peer-to-peer pentru stocarea și partajarea datelor într-un sistem de fișiere distribuit._

Vom folosi Pinata, un API și un set practic de instrumente IPFS, pentru a stoca activul și metadatele NFT, ca să ne asigurăm că NFT-ul nostru este cu adevărat descentralizat. Dacă nu aveți un cont Pinata, vă puteți crea unul gratuit [aici](https://app.pinata.cloud), apoi completați etapele de verificare a e-mail-ului.

Odată ce ați creat contul:

- Navigați la pagina „Files” („Fișiere”) și dați clic pe butonul albastru „Upload” („Încărcare”) din partea superioară stângă a paginii.

- Încărcați o imagine în pinata — aceasta va constitui activul de imagine pentru NFT-ul dvs. Puteți numi activul oricum doriți

- După încărcare, veți vedea informațiile despre fișier în tabelul de pe pagina Fișiere. Veți vedea şi o coloană CID. Puteți copia CID-ul dând clic pe butonul de copiere de lângă el. Puteți vizualiza fișierul încărcat la: `https://gateway.pinata.cloud/ipfs/<CID>`. Puteți găsi imaginea pe care am folosit-o pe IPFS [aici](https://gateway.pinata.cloud/ipfs/QmarPqdEuzh5RsWpyH2hZ3qSXBCzC5RyK3ZHnFkAsk7u2f), de exemplu.

Pentru cei care învață mai bine vizual, etapele de mai sus sunt rezumate aici:

![Cum să vă încărcați imaginea în Pinata](https://gateway.pinata.cloud/ipfs/Qmcdt5VezYzAJDBc4qN5JbANy5paFg9iKDjq8YksRvZhtL)

Acum vrem să încărcăm încă un document în Pinata. Dar mai întâi trebuie să îl creăm!

În directorul rădăcină, creați un nou fișier numit nft-metadata.json și adăugați următorul cod json:

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
  "image": "https://gateway.pinata.cloud/ipfs/QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

Dacă doriți, puteți să modificați datele din json. Puteți scoate sau adăuga elemente din secțiunea de atribute. Însă cel mai important este să verificați ca parametrul din secțiunea „image” să indice locația imaginii IPFS — dacă nu, NFT-ul dvs. va include o fotografie a unui câine (foarte simpatic!).

După ce ați terminat de editat fișierul json, salvați-l și încărcați-l în Pinata, urmând aceiași pași pe care i-am urmat pentru încărcarea imaginii.

![Cum să vă încărcați nft-metadata.json în Pinata](./uploadPinata.gif)

## Etapa 5: Crearea unei instanțe a contractului {#instance-contract}

În continuare, pentru a interacționa cu contractul nostru, trebuie să creăm o instanță a acestuia în codul nostru. Ca să facem acest lucru, vom avea nevoie de adresa contractului, care poate fi obținută fie din implementare, fie din [Etherscan](https://ropsten.etherscan.io/), căutând adresa pe care ați folosit-o pentru implementarea acestuia.

![Vizualizarea adresei dvs. de contract pe Etherscan](./viewContractEtherscan.png)

În exemplul de mai sus, adresa contractului nostru este 0x81c587EB0fE773404c42c1d2666b5f557C470eED.

Apoi vom utiliza [metoda contract](https://web3js.readthedocs.io/en/v1.2.0/web3-eth-contract.html?highlight=constructor#web3-eth-contract) web3 pentru a crea contractul, folosind „ABI” și „address”. În fișierul „mint-nft.js”, adăugați următoarele:

```js
const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Etapa 6: Actualizarea fișierului .env {#update-env}

Mai departe, pentru a crea și a trimite tranzacții în lanțul Ethereum, vom folosi adresa publică a contului dvs. Ethereum pentru a obține nonce-ul contului (vom explica mai jos).

Adăugați cheia dvs. publică la fișierul „.env” — dacă ați finalizat partea 1 a tutorialului, fișierul nostru „.env” ar trebui să arate acum așa:

```js
API_URL = "https://eth-ropsten.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Etapa 7: Crearea unei tranzacții {#create-txn}

În primul rând, să definim o funcție numită `minfNFT(tokenData)` și să creăm tranzacția noastră procedând astfel:

1. Obțineți _PRIVATE_KEY_ și _PUBLIC_KEY_ din fișierul „`.env`”.

1. Apoi trebuie să aflăm care este nonce-ul contului. Specificația nonce este utilizată pentru a monitoriza numărul de tranzacții trimise de la adresa dvs. — este necesară din motive de securitate și pentru a preveni [atacurile de reluare](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Pentru a obține numărul tranzacțiilor trimise de la adresa dvs., vom folosi [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).

1. În cele din urmă, vom configura tranzacția noastră cu următoarele informații:

- `'from': PUBLIC_KEY` — Originea tranzacției noastre este adresa noastră publică

- `'to': contractAddress` — Contractul cu care vrem să interacționăm și la care să trimitem tranzacția

- `nonce': nonce` — Nonce-ul contului cu numărul de tranzacții trimise de la adresa noastră

- `'gas': estimatedGas` — Valoarea estimată a gazului necesar pentru finalizarea tranzacției

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — Calculul pe care dorim să îl efectuăm în această tranzacție - care în acest caz este emiterea unui NFT

Fișierul dvs. mint-nft.js ar trebui să arate astfel acum:

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

## Etapa 8: Semnarea tranzacției {#sign-txn}

După ce ne-am creat tranzacția, trebuie să o semnăm pentru a o trimite. Aici urmează să folosim cheia noastră privată.

`web3.eth.sendSignedTransaction` ne va furniza hash-ul tranzacției, pe care îl putem folosi pentru a verifica dacă tranzacția noastră a fost minată și nu a fost abandonată de rețea. În secțiunea de semnare a tranzacției, am adăugat o verificare a erorilor, astfel încât să știm dacă tranzacția noastră a fost efectuată cu succes.

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

## Etapa 9: Apelarea mintNFT și rularea nodului contract-interact.js {#call-mintnft-fn}

Vă amintiți de „metadata.json” pe care ați încărcat-o în Pinata? Obțineți codul său hash din Pinata și treceți-l ca parametru la funcția mintNFT `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

Iată cum să obțineți codul hash:

![Cum să obțineți hashcode-ul metadatelor nft pe Pinata](./metadataPinata.gif)_Cum să obțineți codul hash al metadatelor nft pe Pinata_

> Verificați de două ori dacă hashcode-ul pe care l-ați copiat se leagă de **metadata.json** by loading `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` într-o fereastră separată. Pagina ar trebui să arate similar cu captura de ecran de mai jos:

![Pagina dvs. ar trebui să afișeze metadatele json](./metadataJSON.png)_Pagina dvs. ar trebui să afișeze metadatele json_

În ansamblu, codul dvs. ar trebui să arate cam așa:

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
      console.log("Promise failed:", err)
    })
}

mintNFT(
  "https://gateway.pinata.cloud/ipfs/QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP"
)
```

Acum rulați `node scripts/mint-nft.js` pentru a vă implementa NFT-ul. După câteva secunde, ar trebui să vedeți un răspuns ca acesta în terminalul dvs.:

    The hash of your transaction is: 0x10e5062309de0cd0be7edc92e8dbab191aa2791111c44274483fa766039e0e00

    Check Alchemy's Mempool to view the status of your transaction!

În continuare, vizitați [mempool-ul Alchemy](https://dashboard.alchemyapi.io/mempool) pentru a verifica starea tranzacției (dacă este în așteptare, minată sau abandonată de rețea). Dacă tranzacția dvs. a fost abandonată, este util să verificați și [Ropsten Etherscan](https://ropsten.etherscan.io/) pentru a căuta hash-ul tranzacției.

![Vizualizarea hash-ului tranzacției NFT pe Etherscan](./viewNFTEtherscan.png)_Vedeți hash-ul tranzacției NFT pe Etherscan_

Şi asta-i tot! Acum ați implementat și emis un NFT pe blockchain-ul Ethereum <Emoji text=":money_mouth_face:" size={1} />

Folosind „mint-nft.js”, puteți bate cât de multe NFT-uri vă dorește inima (și portofelul)! Doar aveţi grijă să introduceți un nou tokenURI care să descrie metadatele NFT-ului (altfel o să ajungeți să creați o grămadă de jetoane identice cu ID-uri diferite).

Fără îndoială că ați vrea să vă mândriţi cu NFT-ul din portofel — așa că nu uitați să consultați [Partea 3: Cum să vă vizualizați NFT-ul în portofel](/developers/tutorials/how-to-view-nft-in-metamask/)!
