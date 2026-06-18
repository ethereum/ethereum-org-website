---
title: Come scrivere e distribuire un NFT (Parte 1/3 della serie di tutorial sugli NFT)
description: Questo tutorial è la Parte 1 di una serie sugli NFT che ti guiderà passo dopo passo su come scrivere e distribuire uno smart contract per un Token Non Fungibile (token ERC-721) utilizzando Ethereum e l'Inter Planetary File System (IPFS).
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "smart contract"]
skill: beginner
breadcrumb: Scrivere e distribuire un NFT
lang: it
published: 2021-04-22
---

Con gli NFT che portano la blockchain sotto gli occhi del pubblico, ora è un'ottima opportunità per comprendere tu stesso l'entusiasmo pubblicando il tuo contratto NFT (token ERC-721) sulla blockchain di Ethereum!

Alchemy è estremamente orgogliosa di alimentare i più grandi nomi nello spazio degli NFT, tra cui Makersplace (che ha recentemente stabilito un record di vendita di opere d'arte digitali da Christie's per 69 milioni di dollari), Dapper Labs (creatori di NBA Top Shot e Crypto Kitties), OpenSea (il più grande marketplace di NFT al mondo), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable e altri ancora.

In questo tutorial, ti guideremo attraverso la creazione e la distribuzione di uno smart contract ERC-721 sulla rete di test Sepolia utilizzando [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) e [Alchemy](https://alchemy.com/signup/eth) (non preoccuparti se non capisci ancora cosa significhi tutto questo: lo spiegheremo!).

Nella Parte 2 di questo tutorial vedremo come possiamo usare il nostro smart contract per coniare un NFT, e nella Parte 3 spiegheremo come visualizzare il tuo NFT su MetaMask.

E naturalmente, se hai domande in qualsiasi momento, non esitare a contattarci nel [Discord di Alchemy](https://discord.gg/gWuC7zB) o visita la [documentazione dell'API per NFT di Alchemy](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)!

## Passaggio 1: Connettersi alla rete Ethereum {#connect-to-ethereum}

Ci sono molti modi per fare richieste alla blockchain di Ethereum, ma per semplificare le cose, useremo un account gratuito su [Alchemy](https://alchemy.com/signup/eth), una piattaforma per sviluppatori blockchain e API che ci consente di comunicare con la catena di Ethereum senza dover eseguire i nostri nodi.

In questo tutorial, sfrutteremo anche gli strumenti per sviluppatori di Alchemy per il monitoraggio e l'analisi per capire cosa succede internamente nella distribuzione del nostro smart contract. Se non hai già un account Alchemy, puoi registrarti gratuitamente [qui](https://alchemy.com/signup/eth).

## Passaggio 2: Creare la tua app (e la chiave API) {#make-api-key}

Una volta creato un account Alchemy, puoi generare una chiave API creando un'app. Questo ci consentirà di fare richieste alla testnet Sepolia. Dai un'occhiata a [questa guida](https://docs.alchemyapi.io/guides/choosing-a-network) se sei curioso di saperne di più sulle testnet.

1. Vai alla pagina "Create App" nella tua Dashboard di Alchemy passando il mouse su "Apps" nella barra di navigazione e cliccando su "Create App"

![Create your app](./create-your-app.png)

2. Dai un nome alla tua app (noi abbiamo scelto "My First NFT!"), offri una breve descrizione, seleziona "Ethereum" per la Chain e scegli "Sepolia" per la tua rete. Dopo The Merge le altre testnet sono state deprecate.

![Configure and publish your app](./alchemy-explorer-sepolia.png)

3. Clicca su "Create app" e il gioco è fatto! La tua app dovrebbe apparire nella tabella sottostante.

## Passaggio 3: Creare un account Ethereum (indirizzo) {#create-eth-address}

Abbiamo bisogno di un account Ethereum per inviare e ricevere transazioni. Per questo tutorial, useremo MetaMask, un portafoglio virtuale nel browser utilizzato per gestire l'indirizzo del tuo account Ethereum. Se vuoi capire meglio come funzionano le transazioni su Ethereum, dai un'occhiata a [questa pagina](/developers/docs/transactions/) della Fondazione Ethereum.

Puoi scaricare e creare un account MetaMask gratuitamente [qui](https://metamask.io/download). Quando crei un account, o se ne hai già uno, assicurati di passare alla "Sepolia Test Network" in alto a destra (in modo da non avere a che fare con denaro reale).

![Set Sepolia as your network](./metamask-goerli.png)

## Passaggio 4: Aggiungere ether da un faucet {#step-4-add-ether-from-a-faucet}

Per distribuire il nostro smart contract sulla testnet, avremo bisogno di alcuni ETH finti. Per ottenere ETH puoi andare al [faucet di Sepolia](https://sepoliafaucet.com/) ospitato da Alchemy, accedere e inserire l'indirizzo del tuo account, cliccare su "Send Me ETH". Dovresti vedere gli ETH nel tuo account MetaMask subito dopo!

## Passaggio 5: Controllare il tuo saldo {#check-balance}

Per ricontrollare che il nostro saldo sia lì, facciamo una richiesta [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) utilizzando lo [strumento composer di Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Questo restituirà la quantità di ETH nel nostro portafoglio. Dopo aver inserito l'indirizzo del tuo account MetaMask e cliccato su "Send Request", dovresti vedere una risposta come questa:

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **Nota** Questo risultato è in Wei, non in ETH. Il Wei è usato come la più piccola denominazione di ether. La conversione da Wei a ETH è 1 eth = 10<sup>18</sup> Wei. Quindi se convertiamo 0xde0b6b3a7640000 in decimale otteniamo 1\*10<sup>18</sup> Wei, che equivale a 1 ETH.

Fiuuu! I nostri soldi finti ci sono tutti.

## Passaggio 6: Inizializzare il nostro progetto {#initialize-project}

Per prima cosa, dovremo creare una cartella per il nostro progetto. Vai alla tua riga di comando e digita:

    mkdir my-nft
    cd my-nft

Ora che siamo all'interno della cartella del nostro progetto, useremo npm init per inizializzare il progetto. Se non hai già installato npm, segui [queste istruzioni](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (avremo bisogno anche di [Node.js](https://nodejs.org/en/download/), quindi scarica anche quello!).

    npm init

Non importa molto come rispondi alle domande di installazione; ecco come abbiamo fatto noi come riferimento:

```json
    package name: (my-nft)
    version: (1.0.0)
    description: My first NFT!
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
      "description": "My first NFT!",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }
```

Approva il package.json e siamo pronti a partire!

## Passaggio 7: Installare [Hardhat](https://hardhat.org/getting-started/#overview) {#install-hardhat}

Hardhat è un ambiente di sviluppo per compilare, distribuire, testare ed eseguire il debug del tuo software Ethereum. Aiuta gli sviluppatori durante la creazione di smart contract e applicazioni decentralizzate (dapp) localmente prima della distribuzione sulla catena live.

All'interno del nostro progetto my-nft esegui:

    npm install --save-dev hardhat

Dai un'occhiata a questa pagina per maggiori dettagli sulle [istruzioni di installazione](https://hardhat.org/getting-started/#overview).

## Passaggio 8: Creare il progetto Hardhat {#create-hardhat-project}

All'interno della cartella del nostro progetto esegui:

    npx hardhat

Dovresti quindi vedere un messaggio di benvenuto e l'opzione per selezionare cosa vuoi fare. Seleziona "create an empty hardhat.config.js":

    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Welcome to Hardhat v2.0.11 👷‍
    ? What do you want to do? …
    Create a sample project
    ❯ Create an empty hardhat.config.js
    Quit

Questo genererà per noi un file hardhat.config.js che è dove specificheremo tutta la configurazione per il nostro progetto (al passaggio 13).

## Passaggio 9: Aggiungere le cartelle del progetto {#add-project-folders}

Per mantenere organizzato il nostro progetto, creeremo due nuove cartelle. Vai alla directory principale del tuo progetto nella riga di comando e digita:

    mkdir contracts
    mkdir scripts

- contracts/ è dove conserveremo il codice del nostro smart contract NFT

- scripts/ è dove conserveremo gli script per distribuire e interagire con il nostro smart contract

## Passaggio 10: Scrivere il nostro contratto {#write-contract}

Ora che il nostro ambiente è configurato, passiamo a cose più entusiasmanti: _scrivere il codice del nostro smart contract!_

Apri il progetto my-nft nel tuo editor preferito (a noi piace [VSCode](https://code.visualstudio.com/)). Gli smart contract sono scritti in un linguaggio chiamato Solidity, che è quello che useremo per scrivere il nostro smart contract MyNFT.sol.‌

1. Vai alla cartella `contracts` e crea un nuovo file chiamato MyNFT.sol

2. Di seguito è riportato il codice del nostro smart contract NFT, che abbiamo basato sull'implementazione ERC-721 della libreria [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721). Copia e incolla i contenuti sottostanti nel tuo file MyNFT.sol.

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

3. Poiché stiamo ereditando classi dalla libreria di contratti OpenZeppelin, nella tua riga di comando esegui `npm install @openzeppelin/contracts^4.0.0` per installare la libreria nella nostra cartella.

Quindi, cosa _fa_ esattamente questo codice? Analizziamolo riga per riga.

All'inizio del nostro smart contract, importiamo tre classi di smart contract di [OpenZeppelin](https://openzeppelin.com/):

- @openzeppelin/contracts/token/ERC721/ERC721.sol contiene l'implementazione dello standard ERC-721, che il nostro smart contract NFT erediterà. (Per essere un NFT valido, il tuo smart contract deve implementare tutti i metodi dello standard ERC-721). Per saperne di più sulle funzioni ERC-721 ereditate, dai un'occhiata alla definizione dell'interfaccia [qui](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/utils/Counters.sol fornisce contatori che possono essere solo incrementati o decrementati di uno. Il nostro smart contract utilizza un contatore per tenere traccia del numero totale di NFT coniati e impostare l'ID univoco sul nostro nuovo NFT. (A ogni NFT coniato utilizzando uno smart contract deve essere assegnato un ID univoco: qui il nostro ID univoco è semplicemente determinato dal numero totale di NFT esistenti. Ad esempio, il primo NFT che coniamo con il nostro smart contract ha un ID pari a "1", il nostro secondo NFT ha un ID pari a "2", ecc.)

- @openzeppelin/contracts/access/Ownable.sol imposta il [controllo degli accessi](https://docs.openzeppelin.com/contracts/3.x/access-control) sul nostro smart contract, in modo che solo il proprietario dello smart contract (tu) possa coniare NFT. (Nota, includere il controllo degli accessi è interamente una preferenza. Se desideri che chiunque possa coniare un NFT utilizzando il tuo smart contract, rimuovi la parola Ownable alla riga 10 e onlyOwner alla riga 17).

Dopo le nostre istruzioni di importazione, abbiamo il nostro smart contract NFT personalizzato, che è sorprendentemente breve: contiene solo un contatore, un costruttore e una singola funzione! Questo grazie ai nostri contratti OpenZeppelin ereditati, che implementano la maggior parte dei metodi di cui abbiamo bisogno per creare un NFT, come `ownerOf` che restituisce il proprietario dell'NFT, e `transferFrom`, che trasferisce la proprietà dell'NFT da un account a un altro.

Nel nostro costruttore ERC-721, noterai che passiamo 2 stringhe, "MyNFT" e "NFT". La prima variabile è il nome dello smart contract e la seconda è il suo simbolo. Puoi nominare ciascuna di queste variabili come preferisci!

Infine, abbiamo la nostra funzione `mintNFT(address recipient, string memory tokenURI)` che ci permette di coniare un NFT! Noterai che questa funzione accetta due variabili:

- `address recipient` specifica l'indirizzo che riceverà il tuo NFT appena coniato

- `string memory tokenURI` è una stringa che dovrebbe risolversi in un documento JSON che descrive i metadati dell'NFT. I metadati di un NFT sono in realtà ciò che gli dà vita, consentendogli di avere proprietà configurabili, come un nome, una descrizione, un'immagine e altri attributi. Nella parte 2 di questo tutorial, descriveremo come configurare questi metadati.

`mintNFT` chiama alcuni metodi dalla libreria ERC-721 ereditata e alla fine restituisce un numero che rappresenta l'ID dell'NFT appena coniato.

## Passaggio 11: Connettere MetaMask e Alchemy al tuo progetto {#connect-metamask-and-alchemy}

Ora che abbiamo creato un portafoglio MetaMask, un account Alchemy e scritto il nostro smart contract, è il momento di connettere i tre.

Ogni transazione inviata dal tuo portafoglio virtuale richiede una firma utilizzando la tua chiave privata univoca. Per fornire al nostro programma questa autorizzazione, possiamo archiviare in modo sicuro la nostra chiave privata (e la chiave API di Alchemy) in un file di ambiente.

Per saperne di più sull'invio di transazioni, dai un'occhiata a [questo tutorial](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) sull'invio di transazioni utilizzando Web3.

Per prima cosa, installa il pacchetto dotenv nella directory del tuo progetto:

    npm install dotenv --save

Quindi, crea un file `.env` nella directory principale del nostro progetto e aggiungi la tua chiave privata di MetaMask e l'URL HTTP dell'API di Alchemy.

- Segui [queste istruzioni](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) per esportare la tua chiave privata da MetaMask

- Vedi sotto per ottenere l'URL HTTP dell'API di Alchemy e copialo negli appunti

![Copy your Alchemy API URL](./copy-alchemy-api-url.gif)

Il tuo `.env` dovrebbe ora apparire così:

    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"

Per connetterli effettivamente al nostro codice, faremo riferimento a queste variabili nel nostro file hardhat.config.js al passaggio 13.

<EnvWarningBanner />

## Passaggio 12: Installare Ethers.js {#install-ethers}

Ethers.js è una libreria che semplifica l'interazione e l'esecuzione di richieste a Ethereum avvolgendo i [metodi JSON-RPC standard](/developers/docs/apis/json-rpc/) con metodi più intuitivi.

Hardhat rende facilissimo integrare [Plugin](https://hardhat.org/plugins/) per strumenti aggiuntivi e funzionalità estese. Sfrutteremo il [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) per la distribuzione del contratto ([Ethers.js](https://github.com/ethers-io/ethers.js/) ha alcuni metodi di distribuzione del contratto estremamente puliti).

Nella directory del tuo progetto digita:

    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0

Richiederemo anche ethers nel nostro hardhat.config.js nel passaggio successivo.

## Passaggio 13: Aggiornare hardhat.config.js {#update-hardhat-config}

Finora abbiamo aggiunto diverse dipendenze e plugin, ora dobbiamo aggiornare hardhat.config.js in modo che il nostro progetto li conosca tutti.

Aggiorna il tuo hardhat.config.js in modo che appaia così:

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

## Passaggio 14: Compilare il nostro contratto {#compile-contract}

Per assicurarci che tutto funzioni finora, compiliamo il nostro contratto. L'attività di compilazione è una delle attività integrate di Hardhat.

Dalla riga di comando esegui:

    npx hardhat compile

Potresti ricevere un avviso relativo all'identificatore di licenza SPDX non fornito nel file sorgente, ma non c'è bisogno di preoccuparsi: si spera che tutto il resto sembri a posto! In caso contrario, puoi sempre inviare un messaggio nel [Discord di Alchemy](https://discord.gg/u72VCg3).

## Passaggio 15: Scrivere il nostro script di distribuzione {#write-deploy}

Ora che il nostro contratto è scritto e il nostro file di configurazione è pronto, è il momento di scrivere il nostro script di distribuzione del contratto.

Vai alla cartella `scripts/` e crea un nuovo file chiamato `deploy.js`, aggiungendovi i seguenti contenuti:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Avvia la distribuzione, restituendo una promise che si risolve in un oggetto contratto
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("Contract deployed to address:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat fa un lavoro straordinario nello spiegare cosa fa ciascuna di queste righe di codice nel suo [tutorial sui contratti](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), abbiamo adottato le loro spiegazioni qui.

    const MyNFT = await ethers.getContractFactory("MyNFT");

Una ContractFactory in Ethers.js è un'astrazione utilizzata per distribuire nuovi smart contract, quindi MyNFT qui è una fabbrica per le istanze del nostro contratto NFT. Quando si utilizza il plugin hardhat-ethers, le istanze ContractFactory e Contract sono connesse al primo firmatario per impostazione predefinita.

    const myNFT = await MyNFT.deploy();

Chiamare deploy() su una ContractFactory avvierà la distribuzione e restituirà una Promise che si risolve in un Contract. Questo è l'oggetto che ha un metodo per ciascuna delle funzioni del nostro smart contract.

## Passaggio 16: Distribuire il nostro contratto {#deploy-contract}

Siamo finalmente pronti per distribuire il nostro smart contract! Torna alla radice della directory del tuo progetto e nella riga di comando esegui:

    npx hardhat --network sepolia run scripts/deploy.js

Dovresti quindi vedere qualcosa del genere:

    Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650

Se andiamo su [Etherscan di Sepolia](https://sepolia.etherscan.io/) e cerchiamo l'indirizzo del nostro contratto, dovremmo essere in grado di vedere che è stato distribuito con successo. Se non riesci a vederlo immediatamente, attendi un po' poiché potrebbe volerci del tempo. La transazione apparirà più o meno così:

![View your transaction address on Etherscan](./etherscan-sepoila-contract-creation.png)

L'indirizzo From dovrebbe corrispondere all'indirizzo del tuo account MetaMask e l'indirizzo To indicherà "Contract Creation". Se clicchiamo sulla transazione, vedremo l'indirizzo del nostro contratto nel campo To:

![View your contract address on Etherscan](./etherscan-sepolia-tx-details.png)

Sìììì! Hai appena distribuito il tuo smart contract NFT sulla catena (testnet) di Ethereum!

Per capire cosa succede internamente, andiamo alla scheda Explorer nella nostra [dashboard di Alchemy](https://dashboard.alchemyapi.io/explorer). Se hai più app Alchemy, assicurati di filtrare per app e selezionare "MyNFT".

![View calls made “under the hood” with Alchemy’s Explorer Dashboard](./alchemy-explorer-goerli.png)

Qui vedrai una manciata di chiamate JSON-RPC che Hardhat/Ethers ha effettuato internamente per noi quando abbiamo chiamato la funzione .deploy(). Due importanti da segnalare qui sono [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction), che è la richiesta per scrivere effettivamente il nostro smart contract sulla catena Sepolia, ed [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash) che è una richiesta per leggere informazioni sulla nostra transazione dato l'hash (un pattern tipico quando si inviano transazioni). Per saperne di più sull'invio di transazioni, dai un'occhiata a questo tutorial sull'[invio di transazioni utilizzando Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

Questo è tutto per la Parte 1 di questo tutorial. Nella [Parte 2, interagirai effettivamente con il nostro smart contract coniando un NFT](/developers/tutorials/how-to-mint-an-nft/), e nella [Parte 3 ti mostreremo come visualizzare il tuo NFT nel tuo portafoglio Ethereum](/developers/tutorials/how-to-view-nft-in-metamask/)!