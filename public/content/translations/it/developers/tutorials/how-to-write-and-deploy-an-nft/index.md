---
title: Come scrivere e distribuire un NFT (Parte 1/3 della serie di guide sugli NFT)
description: "Questo tutorial è la Parte 1 di una serie sui NFT che ti guiderà passo dopo passo alla scrittura e distribuzione del contratto intelligente di un Token Non Fungibile (token ERC-721) usando Ethereum e l'InterPlanetary File System (IPFS)."
author: "Sumi Mudgil"
tags: [ "ERC-721", "Alchemy", "Solidity", "Smart Contract" ]
skill: beginner
lang: it
published: 2021-04-22
---

Ora che gli NFT rendono nota la blockchain al grande pubblico, si presenta un'eccellente opportunità per comprendere questo interesse, pubblicando il tuo NFT (Token ERC-721) sulla blockchain di Ethereum!

Alchemy è estremamente orgogliosa di supportare i più grandi nomi nello spazio degli NFT, tra cui Makersplace (ha recentemente toccato un record nella vendita di opere d'arte digitali a Christie, per 69 milioni di dollari), Dapper Labs (creatori di NBA Top Shot e Crypto Kitties), OpenSea (il più grande mercato di NFT al mondo), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable e altri.

In questa guida, illustreremo la creazione e la distribuzione di un contratto intelligente ERC-721 sulla rete di test di Sepolia usando [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) e [Alchemy](https://alchemy.com/signup/eth) (non preoccuparti se non hai ancora capito cosa significa, te lo spiegheremo!).

Nella Parte 2 di questo tutorial affronteremo come possiamo usare il nostro contratto intelligente per coniare un NFT e nella Parte 3 spiegheremo come visualizzare il tuo NFT su MetaMask.

E, naturalmente, se hai domande in qualsiasi momento, non esitare a contattarci sul [Discord di Alchemy](https://discord.gg/gWuC7zB) o a visitare la [documentazione dell'API NFT di Alchemy](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)!

## Fase 1: Connettiti alla rete Ethereum {#connect-to-ethereum}

Ci sono molti modi per effettuare richieste alla blockchain di Ethereum, ma per semplificare le cose, useremo un account gratuito su [Alchemy](https://alchemy.com/signup/eth), una piattaforma di sviluppo blockchain e API che ci permette di comunicare con la chain di Ethereum senza dover gestire i nostri nodi.

In questo tutorial, approfitteremo anche degli strumenti per monitoraggio e analisi per sviluppatori messi a disposizione da Alchemy per comprendere cosa succede dietro le quinte quando distribuiamo il nostro contratto intelligente. Se non hai già un account Alchemy, puoi iscriverti gratuitamente [qui](https://alchemy.com/signup/eth).

## Fase 2: Crea la tua app (e la chiave API) {#make-api-key}

Una volta creato un conto di Alchemy, puoi generare una chiave API creando un'app. Questo ci consentirà di effettuare richieste alla rete di prova di Sepolia. Consulta [questa guida](https://docs.alchemyapi.io/guides/choosing-a-network) se sei curioso di saperne di più sulle reti di test.

1. Naviga fino alla pagina "Create App" nella tua Dashboard di Alchemy passando il puntatore del mouse su "Apps" nella barra di navigazione e cliccando su "Create App"

![Crea la tua app](./create-your-app.png)

2. Dai un nome alla tua app (abbiamo scelto "My First NFT!"), inserisci una breve descrizione, seleziona “Ethereum” per la chain, e scegli “Sepolia" per la tua rete. Le altre reti di prova sono diventate obsolete in seguito alla fusione.

![Configura e pubblica la tua app](./alchemy-explorer-sepolia.png)

3. Clicca “Crea app” ed è tutto! La tua app dovrebbe apparire nella tabella seguente.

## Fase 3: Crea un account Ethereum (indirizzo) {#create-eth-address}

Per inviare e ricevere le transazioni, necessitiamo di un conto di Ethereum. Per questo tutorial, utilizzeremo MetaMask, un portafoglio virtuale nel browser, utilizzato per gestire l'indirizzo del tuo conto di Ethereum. Se vuoi saperne di più su come funzionano le transazioni su Ethereum, consulta [questa pagina](/developers/docs/transactions/) della Ethereum Foundation.

Puoi scaricare e creare un account MetaMask gratuitamente [qui](https://metamask.io/download). Quando crei un account, o se ne possiedi già uno, assicurati di passare alla "Rete di prova di Sepolia" in alto a destra (così da non avere a che fare con denaro reale).

![Imposta Sepolia come tua rete](./metamask-goerli.png)

## Fase 4: Aggiungi ether da un Faucet {#step-4-add-ether-from-a-faucet}

Per poter distribuire il nostro contratto intelligente alla rete di prova, avremo bisogno di degli ETH finti. Per ottenere ETH, vai al [Sepolia Faucet](https://sepoliafaucet.com/) ospitato da Alchemy, accedi, inserisci l'indirizzo del tuo account e fai clic su “Inviami ETH”. Subito dopo, dovresti vedere gli ETH nel tuo conto di MetaMask!

## Fase 5: Controlla il tuo saldo {#check-balance}

Per verificare che il nostro saldo sia presente, effettuiamo una richiesta [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) utilizzando lo [strumento composer di Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Questo restituirà l'importo di ETH nel nostro portafoglio. Dopo aver inserito l'indirizzo del tuo conto di MetaMask e aver cliccato "Invia Richiesta", dovresti visualizzare una risposta simile alla seguente:

    ```
    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`
    ```

> **Nota**: questo risultato è in wei, non in ETH. Wei è usato come taglio più piccolo dell'ether. La conversione da wei a ETH è: 1 eth = 10<sup>18</sup> wei. Quindi se convertiamo 0xde0b6b3a7640000 in decimali, otteniamo 1\*10<sup>18</sup> wei, pari a 1 ETH.

Meno male! I nostri soldi finti ci sono tutti.

## Fase 6: Inizializza il nostro progetto {#initialize-project}

Prima, dovremo creare una cartella per il nostro progetto. Vai alla riga di comando e digita:

    ```
    mkdir my-nft
    cd my-nft
    ```

Ora che siamo nella cartella del nostro progetto, useremo npm init per inizializzare il progetto. Se non hai ancora installato npm, segui [queste istruzioni](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (avremo bisogno anche di [Node.js](https://nodejs.org/en/download/), quindi scarica anche quello!).

    ```
    npm init
    ```

Non è importante come rispondi alle domande d'installazione; a titolo di esempio, ecco le nostre risposte:

```json
    package name: (my-nft)
    version: (1.0.0)
    description: Il mio primo NFT!
    entry point: (index.js)
    test command:
    git repository:
    keywords:
    author:
    license: (ISC)
    About to write to /Users/thesuperb1/Desktop/my-nft/package.json:

    {
      "name": "my-nft",
      "version": "1.0.0",
      "description": "Il mio primo NFT!",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }
```

Approva il package.json, e siamo pronti!

## Fase 7: Installa [Hardhat](https://hardhat.org/getting-started/#overview) {#install-hardhat}

Hardhat è un ambiente di sviluppo per compilare, distribuire, testare ed effettuare il debug del tuo software di Ethereum. Aiuta gli sviluppatori nella costruzione di contratti intelligenti e dapp localmente, prima di distribuirli alla catena.

Nel nostro progetto my-nft esegui:

    ```
    npm install --save-dev hardhat
    ```

Consulta questa pagina per maggiori dettagli sulle [istruzioni di installazione](https://hardhat.org/getting-started/#overview).

## Fase 8: Crea un progetto Hardhat {#create-hardhat-project}

Nella cartella del nostro progetto esegui:

    ```
    npx hardhat
    ```

Dovresti poi vedere un messaggio di benvenuto e l'opzione per selezionare cosa desideri fare. Seleziona “crea un hardhat.config.js vuoto”:

    ```
    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Benvenuto in Hardhat v2.0.11 👷‍
    ? Cosa vuoi fare? …
    Crea un progetto di esempio
    ❯ Crea un hardhat.config.js vuoto
    Esci
    ```

Questo genererà un file hardhat.config.js, in cui specificheremo tutta la configurazione per il nostro progetto (alla fase 13).

## Fase 9: Aggiungi le cartelle di progetto {#add-project-folders}

Per mantenere organizzato il nostro progetto, creeremo due nuove cartelle. Vai alla cartella di root del tuo progetto nella tua riga di comando e digita:

    ```
    mkdir contracts
    mkdir scripts
    ```

- contracts/ è dove manterremo il codice del contratto intelligente del nostro NFT

- scripts/ è dove manterremo gli script per distribuire e interagire con il nostro contratto intelligente

## Fase 10: Scrivi il nostro contratto {#write-contract}

Ora che il nostro ambiente è configurato, passiamo a cose più entusiasmanti: _scrivere il codice del nostro contratto intelligente!_

Apri il progetto my-nft nel tuo editor preferito (a noi piace [VSCode](https://code.visualstudio.com/)). I contratti intelligenti sono scritti in un linguaggio detto Solidity, che useremo per scrivere il nostro contratto intelligente MyNFT.sol.

1. Vai alla cartella `contracts` e crea un nuovo file chiamato MyNFT.sol

2. Di seguito è riportato il codice del nostro contratto intelligente NFT, che si basa sull'implementazione ERC-721 della libreria di [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721).  Copia e incolla i seguenti contenuti nel tuo file MyNFT.sol.

   ```solidity
   //Contratto basato su [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/utils/Counters.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       using Counters for Counters.Counter;
       Counters.Counter private _tokenIds;

       constructor() ERC721("MyNFT", "NFT") {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           _tokenIds.increment();

           uint256 newItemId = _tokenIds.current();
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. Poiché stiamo ereditando le classi dalla libreria di contratti OpenZeppelin, nella riga di comando esegui `npm install @openzeppelin/contracts^4.0.0` per installare la libreria nella nostra cartella.

Quindi, cosa _fa_ esattamente questo codice? Analizziamolo, riga dopo riga.

Nella parte superiore del nostro contratto intelligente, importiamo tre classi di contratto intelligente di [OpenZeppelin](https://openzeppelin.com/):

- @openzeppelin/contracts/token/ERC721/ERC721.sol contiene l'implementazione dello standard ERC-721, che il contratto intelligente del nostro NFT erediterà. (Per essere un NFT valido, il tuo contratto intelligente deve implementare tutti i metodi dello standard ERC-721.) Per saperne di più sulle funzioni ERC-721 ereditate, consulta la definizione dell'interfaccia [qui](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/utils/Counters.sol fornisce contatori che possono esser solo incrementati o diminuiti di unità alla volta. Il nostro contratto intelligente usa un contatore per tener traccia del numero totale di NFT coniati e impostare l'ID univoco sul nostro nuovo NFT. (A ogni NFT coniato usando un contratto intelligente, dev'esser assegnato un ID univoco, qui il nostro ID univoco è determinato solo dal numero totale di NFT esistenti. Ad esempio, il primo NFT che coniamo con il nostro contratto intelligente ha un ID di "1," il nostro secondo NFT ha un ID di "2," ecc.)

- `@openzeppelin/contracts/access/Ownable.sol` imposta il [controllo degli accessi](https://docs.openzeppelin.com/contracts/3.x/access-control) sul nostro contratto intelligente, in modo che solo il proprietario del contratto intelligente (tu) possa coniare NFT. (Nota, prevedere il controllo dell'accesso è totalmente facoltativo. Se volessi che tutti potessero coniare un NFT usando il tuo contratto intelligente, dovresti rimuovere la parola Ownable alla riga 10 e onlyOwner alla riga 17.)

Dopo le nostre dichiarazioni d'importazione, abbiamo il contratto intelligente del nostro NFT personalizzato, che è sorprendentemente corto: contiene solo un contatore, un costruttore e una funzione singola! Questo è possibile grazie ai nostri contratti OpenZeppelin ereditati, che implementano la maggior parte dei metodi necessari per creare un NFT, come `ownerOf`, che restituisce il proprietario dell'NFT, e `transferFrom`, che trasferisce la proprietà dell'NFT da un account a un altro.

Nel nostro costruttore ERC-721, noterai che passiamo 2 stringhe, “MyNFT” e “NFT.” La prima variabile è il nome del contratto intelligente e la seconda è il suo simbolo. Puoi assegnare a ciascuna di queste variabili il nome che desideri!

Infine, abbiamo la nostra funzione `mintNFT(address recipient, string memory tokenURI)` che ci permette di coniare un NFT! Noterai che questa funzione usa due variabili:

- `address recipient` specifica l'indirizzo che riceverà il tuo NFT appena coniato.

- `string memory tokenURI` è una stringa che dovrebbe risolversi in un documento JSON che descrive i metadati dell'NFT. I metadati di un NFT sono davvero ciò che lo porta in vita, consentendogli di avere proprietà configurabili, quali nome, descrizione, immagine e altri attributi. Nella parte 2 di questo tutorial, descriveremo come configurare questi metadati.

`mintNFT` chiama alcuni metodi dalla libreria ERC-721 ereditata e, infine, restituisce un numero che rappresenta l'ID dell'NFT appena coniato.

## Fase 11: Collega MetaMask e Alchemy al tuo progetto {#connect-metamask-and-alchemy}

Ora che abbiamo creato un portafoglio di MetaMask, un conto di Alchemy e scritto il nostro contratto intelligente, è il momento di collegarli.

Ogni transazione inviata dal tuo portafoglio virtuale richiede una firma tramite la tua chiave privata unica. Per fornire al nostro programma quest'autorizzazione, possiamo memorizzare in sicurezza la nostra chiave privata (e la chiave API di Alchemy) in un file ambientale.

Per saperne di più sull'invio di transazioni, consulta [questa guida](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) sull'invio di transazioni tramite web3.

Prima, installa il pacchetto dotenv nella cartella del tuo progetto:

    ```
    npm install dotenv --save
    ```

Quindi, crea un file `.env` nella directory principale del nostro progetto e aggiungici la tua chiave privata di MetaMask e l'URL dell'API HTTP di Alchemy.

- Segui [queste istruzioni](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) per esportare la tua chiave privata da MetaMask.

- Vedi di seguito come ottenere l'URL dell'API di Alchemy HTTP e copialo negli appunti

![Copia l'URL della tua API di Alchemy](./copy-alchemy-api-url.gif)

Il tuo file `.env` dovrebbe ora apparire così:

    ```
    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"
    ```

Per connetterli realmente al nostro codice, faremo riferimento a queste variabili nel nostro file hardhat.config.js nella fase 13.

<EnvWarningBanner />

## Fase 12: Installa Ethers.js {#install-ethers}

Ethers.js è una libreria che semplifica l'interazione e l'invio di richieste a Ethereum, eseguendo il wrapping dei [metodi JSON-RPC standard](/developers/docs/apis/json-rpc/) con metodi più intuitivi.

Hardhat rende semplicissima l'integrazione di [Plugin](https://hardhat.org/plugins/) per strumenti aggiuntivi e funzionalità estese. Approfitteremo del [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) per la distribuzione dei contratti ([Ethers.js](https://github.com/ethers-io/ethers.js/) ha dei metodi di distribuzione dei contratti molto puliti).

Nella cartella del tuo progetto digita:

    ```
    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0
    ```

Avremo bisogno di ethers anche nel nostro hardhat.config.js nella prossima fase.

## Fase 13: Aggiorna hardhat.config.js {#update-hardhat-config}

Finora abbiamo aggiunto diverse dipendenze e plugin, ora dobbiamo aggiornare hardhat.config.js in modo che il nostro progetto li riconosca tutti.

Aggiorna il tuo hardhat.config.js affinché appaia così:

```js
    /**
    * @type import('hardhat/config').HardhatUserConfig
    */
    require('dotenv').config();
    require("@nomiclabs/hardhat-ethers");
    const { API_URL, PRIVATE_KEY } = process.env;
    module.exports = {
       solidity: "0.8.1",
       defaultNetwork: "sepolia",
       networks: {
          hardhat: {},
          sepolia: {
             url: API_URL,
             accounts: [`0x${PRIVATE_KEY}`]
          }
       },
    }
```

## Fase 14: Compila il nostro contratto {#compile-contract}

Per assicurarti che tutto funzioni fino a questo punto, compila il contratto. L'attività di compilazione è una delle attività integrate di hardhat.

Dalla riga di comando esegui:

    ```
    npx hardhat compile
    ```

Potresti ottenere un avviso sull'assenza nel file sorgente dell'identificativo della licenza SPDX, ma non preoccupartene, tutto il resto dovrebbe funzionare! In caso contrario, puoi sempre inviare un messaggio nel [discord di Alchemy](https://discord.gg/u72VCg3).

## Fase 15: Scrivi il nostro script di distribuzione {#write-deploy}

Ora che il nostro contratto è scritto e il nostro file di configurazione è pronto, è il momento di scrivere lo script di distribuzione del contratto.

Vai alla cartella `scripts/` e crea un nuovo file chiamato `deploy.js`, aggiungendovi i seguenti contenuti:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Avvia la distribuzione, restituendo una promise che si risolve in un oggetto contratto
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("Contratto distribuito all'indirizzo:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat spiega molto bene cosa fa ciascuna di queste righe di codice nella sua [Guida ai contratti](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), e qui abbiamo adottato le sue spiegazioni.

    ```
    const MyNFT = await ethers.getContractFactory("MyNFT");
    ```

Un ContractFactory su ethers.js è un'astrazione usata per distribuire nuovi contratti intelligenti, quindi MyNFT qui è una fabbrica di istanze del nostro contratto NFT. Usando il plugin hardhat-ethers, le istanze ContractFactory e Contract sono connesse di default al primo firmatario.

    ```
    const myNFT = await MyNFT.deploy();
    ```

Chiamare deploy() su un ContractFactory avvierà la distribuzione e restituirà una promessa che si risolverà in un contratto. Questo è l'oggetto che ha un metodo per ciascuna delle funzioni del nostro smart contract.

## Fase 16: Distribuisci il nostro contratto {#deploy-contract}

Siamo finalmente pronti a distribuire il nostro smart contract! Torna alla root della cartella del tuo progetto e nella riga di comando esegui:

    ```
    npx hardhat --network sepolia run scripts/deploy.js
    ```

Vorrai poi vedere qualcosa del genere:

    ```
    Contratto distribuito all'indirizzo: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
    ```

Se andiamo su [Sepolia Etherscan](https://sepolia.etherscan.io/) e cerchiamo l'indirizzo del nostro contratto, dovremmo essere in grado di vedere che è stato distribuito con successo. Se non riesci a vederlo immediatamente, attendi alcuni istanti poiché potrebbe essere necessario un po' di tempo. La transazione somiglierà a questa:

![Visualizza l'indirizzo della tua transazione su Etherscan](./etherscan-sepoila-contract-creation.png)

L'indirizzo "Da" dovrebbe corrispondere all'indirizzo del tuo account di MetaMask mentre l'indirizzo "A" sarà: “Creazione del contratto”. Se facciamo clic sulla transazione, vediamo l'indirizzo del nostro contratto nel campo "A":

![Visualizza l'indirizzo del tuo contratto su Etherscan](./etherscan-sepolia-tx-details.png)

Sììììììììììì! Hai appena distribuito il tuo contratto intelligente NFT alla catena (testnet) di Ethereum!

Per capire cosa sta succedendo dietro le quinte, vai alla scheda Explorer nella nostra [dashboard di Alchemy](https://dashboard.alchemyapi.io/explorer). Se hai diverse app di Alchemy, assicurati di filtrare per app e selezionare "MyNFT".

![Visualizza le chiamate effettuate “dietro le quinte” con la dashboard Explorer di Alchemy](./alchemy-explorer-goerli.png)

Qui vedrai numerose chiamate a JSON-RPC che Hardhat/Ethers ha effettuato per noi quando abbiamo chiamato la funzione .deploy(). Due funzioni importanti da menzionare sono [`eth_sendRawTransaction`](/developers/docs/apis/json-rpc/#eth_sendrawtransaction), che è la richiesta di scrivere effettivamente il nostro contratto intelligente sulla chain di Sepolia, e [`eth_getTransactionByHash`](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash), che è una richiesta di leggere le informazioni sulla nostra transazione dato l'hash (un modello tipico quando si inviano transazioni). Per saperne di più sull'invio di transazioni, consulta questa guida su come [inviare transazioni usando Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

È tutto per la parte 1 di questo tutorial. Nella [parte 2, interagiremo con il nostro contratto intelligente coniando un NFT](/developers/tutorials/how-to-mint-an-nft/) e, nella [parte 3, ti mostreremo come visualizzare il tuo NFT nel tuo portafoglio Ethereum](/developers/tutorials/how-to-view-nft-in-metamask/)!
