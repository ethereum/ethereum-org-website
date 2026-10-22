---
title: Come scrivere e distribuire un NFT (Parte 1/3 della serie di tutorial sugli NFT)
description: "Questo tutorial è la Parte 1 di una serie sugli NFT che ti guiderà passo dopo passo su come scrivere e distribuire uno smart contract per un Token Non Fungibile (token ERC-721) utilizzando Ethereum e l'Inter Planetary File System (IPFS)."
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "smart contract"]
skill: beginner
breadcrumb: Scrivere e distribuire un NFT
lang: it
published: 2021-04-22
---

Con i token non fungibili (NFT) che portano la blockchain sotto i riflettori del pubblico, ora è un'ottima opportunità per capire tu stesso l'entusiasmo pubblicando il tuo contratto per NFT (token ERC-721) sulla blockchain di Ethereum!

In questo tutorial, ti guideremo attraverso la creazione e la distribuzione di uno smart contract ERC-721 sulla testnet di Sepolia utilizzando [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) e [Alchemy](https://alchemy.com/signup/eth) (non preoccuparti se non capisci ancora cosa significhi tutto questo: lo spiegheremo!).

Nella Parte 2 di questo tutorial vedremo come possiamo usare il nostro smart contract per coniare un NFT e nella Parte 3 spiegheremo come visualizzare il tuo NFT su MetaMask.

E naturalmente, se hai domande in qualsiasi momento, non esitare a contattarci sul [Discord di Alchemy](https://discord.gg/gWuC7zB) o visita la [documentazione dell'interfaccia di programmazione delle applicazioni (API) per NFT di Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)!

## Passaggio 1: Connettersi alla rete Ethereum {#connect-to-ethereum}

Ci sono molti modi per fare richieste alla blockchain di Ethereum, ma per semplificare le cose, useremo un account gratuito su [Alchemy](https://alchemy.com/signup/eth), una piattaforma per sviluppatori blockchain e API che ci consente di comunicare con la catena di Ethereum senza dover eseguire i nostri nodi.

In questo tutorial, sfrutteremo anche gli strumenti per sviluppatori di Alchemy per il monitoraggio e l'analisi per capire cosa succede internamente nella distribuzione del nostro smart contract. Se non hai già un account Alchemy, puoi registrarti gratuitamente [qui](https://alchemy.com/signup/eth).

## Passaggio 2: Creare la tua app (e la chiave API) {#make-api-key}

Una volta creato un account Alchemy, puoi generare una chiave dell'interfaccia di programmazione delle applicazioni (API) creando un'app. Questo ci permetterà di fare richieste alla testnet di Sepolia. Dai un'occhiata a [questa guida](https://www.alchemy.com/docs/choosing-a-web3-network) se sei curioso di saperne di più sulle testnet.

1. Vai alla pagina "Create new app" nella tua dashboard di Alchemy selezionando "Select an app" nella barra di navigazione e cliccando su "Create new app"

![Crea la tua app](./alchemy-create-new-app.png)

2. Dai un nome alla tua app (noi abbiamo scelto "My First NFT!"), offri una breve descrizione e scegli un caso d'uso. Successivamente, cerca "Ethereum" e seleziona la rete. Useremo Sepolia, la testnet consigliata per lo sviluppo di applicazioni (vedi [Reti Ethereum](/developers/docs/networks/#ethereum-testnets)).

3. Clicca su "Next" per procedere, poi su "Create app" e il gioco è fatto! La tua app dovrebbe apparire nel menu a discesa della barra di navigazione, con una chiave API disponibile per essere copiata.

## Passaggio 3: Creare un account Ethereum (indirizzo) {#create-eth-address}

Abbiamo bisogno di un account Ethereum per inviare e ricevere transazioni. Per questo tutorial, useremo MetaMask, un portafoglio virtuale nel browser utilizzato per gestire l'indirizzo del tuo account Ethereum. Se vuoi capire meglio come funzionano le transazioni su Ethereum, dai un'occhiata a [questa pagina](/developers/docs/transactions/) della Fondazione Ethereum.

Puoi scaricare e creare un account MetaMask gratuitamente [qui](https://metamask.io/download). Quando crei un account, o se ne hai già uno, assicurati di passare alla testnet "Sepolia" utilizzando il menu di selezione della rete (in modo da non avere a che fare con denaro reale). Se non vedi Sepolia nell'elenco, apri il menu nell'angolo in alto a destra, seleziona "Networks" e attiva "Show test networks" (vedi la [guida di MetaMask alla visualizzazione delle testnet](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)).

![Imposta Sepolia come tua rete](./metamask-sepolia.png)

## Passaggio 4: Aggiungere ether da un faucet {#step-4-add-ether-from-a-faucet}

Per distribuire il nostro smart contract sulla testnet, avremo bisogno di alcuni ETH finti. Per ottenere ETH di Sepolia, scegli uno dei faucet elencati nei [dettagli della rete Sepolia](/developers/docs/networks/#sepolia) e inserisci l'indirizzo del tuo account. Se uno non funziona, provane un altro poiché a volte possono esaurirsi e alcuni hanno regole di idoneità: ad esempio, il [faucet Sepolia di Alchemy](https://www.alchemy.com/faucets/ethereum-sepolia) richiede che l'indirizzo ricevente detenga almeno 0.001 ETH sulla Mainnet di Ethereum. Dovresti vedere gli ETH nel tuo account MetaMask poco dopo!

## Passaggio 5: Controllare il tuo saldo {#check-balance}

Per verificare che il nostro saldo sia presente, facciamo una richiesta [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) utilizzando lo [strumento sandbox di Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Questo restituirà la quantità di ETH nel nostro portafoglio. Dopo aver inserito l'indirizzo del tuo account MetaMask e cliccato su "Send Request", dovresti vedere una risposta come questa:

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **Nota** Questo risultato è in Wei, non in ETH. Il Wei è utilizzato come la denominazione più piccola di ether. La conversione da Wei a ETH è 1 eth = 10<sup>18</sup> Wei. Quindi, se convertiamo 0xde0b6b3a7640000 in decimale, otteniamo 1\*10<sup>18</sup> Wei, che equivale a 1 ETH.

Fiuu! I nostri soldi finti ci sono tutti.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```
## Passaggio 6: Inizializzare il nostro progetto {#initialize-project}

Per prima cosa, dovremo creare una cartella per il nostro progetto. Vai alla riga di comando e digita:

```sh
mkdir my-nft
cd my-nft
```

Ora che siamo all'interno della cartella del nostro progetto, useremo npm init per inizializzare il progetto. Se non hai ancora installato npm, segui [le istruzioni di installazione di Node.js](https://nodejs.org/en/download/) (avremo bisogno di Node.js e npm per questo tutorial).

```sh
npm init
```

Non importa molto come rispondi alle domande di installazione; ecco come abbiamo fatto noi come riferimento:

```text
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

Approva il package.json. Hardhat 3, che installeremo successivamente, supporta solo progetti con moduli ES, quindi contrassegna il progetto come tale:

```sh
npm pkg set type=module
```

E siamo pronti per partire!

## Passaggio 7: Installare [Hardhat](https://hardhat.org/docs/getting-started) {#install-hardhat}

Hardhat è un ambiente di sviluppo per compilare, distribuire, testare ed eseguire il debug del tuo software Ethereum. Aiuta gli sviluppatori nella creazione di smart contract e applicazioni decentralizzate (dapp) localmente prima di distribuirli sulla catena live.

Hardhat 3 richiede Node.js v22.13.0 o versioni successive. All'interno del nostro progetto my-nft esegui:

```sh
npm install --save-dev hardhat
```

Dai un'occhiata a questa pagina per maggiori dettagli sulle [istruzioni di installazione](https://hardhat.org/docs/getting-started).

## Passaggio 8: Creare il progetto Hardhat {#create-hardhat-project}

Eseguire `npx hardhat --init` genererebbe un progetto di esempio completo, ma per questo tutorial imposteremo le cose a mano in modo che tu possa vederne ogni pezzo. Nella radice della cartella del tuo progetto, crea un file chiamato `hardhat.config.js` con i seguenti contenuti:

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

Qui è dove specificheremo tutta la configurazione per il nostro progetto (al passaggio 13). Per ora, dice solo ad Hardhat quale versione del compilatore Solidity utilizzare.

## Passaggio 9: Aggiungere le cartelle del progetto {#add-project-folders}

Per mantenere organizzato il nostro progetto, creeremo due nuove cartelle. Vai alla directory principale del tuo progetto nella riga di comando e digita:

```sh
mkdir contracts
mkdir scripts
```

- contracts/ è dove conserveremo il codice del nostro smart contract per NFT

- scripts/ è dove conserveremo gli script per distribuire e interagire con il nostro smart contract

## Passaggio 10: Scrivere il nostro contratto {#write-contract}

Ora che il nostro ambiente è configurato, passiamo a cose più entusiasmanti: _scrivere il codice del nostro smart contract!_

Apri il progetto my-nft nel tuo editor preferito (a noi piace [VSCode](https://code.visualstudio.com/)). Gli smart contract sono scritti in un linguaggio chiamato Solidity, che è quello che useremo per scrivere il nostro smart contract MyNFT.sol.‌

1. Vai alla cartella `contracts` e crea un nuovo file chiamato MyNFT.sol

2. Di seguito è riportato il codice del nostro smart contract per NFT, che abbiamo basato sull'implementazione ERC-721 della libreria [OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/erc721). Copia e incolla i contenuti sottostanti nel tuo file MyNFT.sol.

   ```solidity
   // Contratto basato su https://docs.openzeppelin.com/contracts/5.x/erc721
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.24;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       uint256 private _nextTokenId;

       constructor(address initialOwner)
           ERC721("MyNFT", "NFT")
           Ownable(initialOwner)
       {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           uint256 newItemId = ++_nextTokenId;
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. Poiché stiamo ereditando classi dalla libreria di contratti OpenZeppelin, nella riga di comando esegui `npm install @openzeppelin/contracts` per installare la libreria nella nostra cartella. Questo tutorial utilizza OpenZeppelin Contracts 5.x, che richiede Solidity 0.8.24 o versioni successive.

Quindi, cosa _fa_ esattamente questo codice? Analizziamolo riga per riga.

All'inizio del nostro smart contract, importiamo tre classi di smart contract di [OpenZeppelin](https://openzeppelin.com/):

- @openzeppelin/contracts/token/ERC721/ERC721.sol contiene l'implementazione dello standard ERC-721, che il nostro smart contract per NFT erediterà. (Per essere un NFT valido, il tuo smart contract deve implementare tutti i metodi dello standard ERC-721.) Per saperne di più sulle funzioni ERC-721 ereditate, dai un'occhiata alla definizione dell'interfaccia [qui](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/access/Ownable.sol imposta il [controllo degli accessi](https://docs.openzeppelin.com/contracts/5.x/access-control) sul nostro smart contract, in modo che solo il proprietario dello smart contract (tu) possa coniare NFT. Il proprietario è l'indirizzo `initialOwner` passato al costruttore. (Nota: includere il controllo degli accessi è interamente una preferenza. Se desideri che chiunque possa coniare un NFT utilizzando il tuo smart contract, rimuovi `Ownable` e `Ownable(initialOwner)` dalla definizione del contratto e dal costruttore, e `onlyOwner` dalla funzione `mintNFT`.)

- @openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol estende ERC-721 in modo che ogni token possa memorizzare il proprio URI dei metadati, che impostiamo durante il conio.

Dopo le nostre istruzioni di importazione, abbiamo il nostro smart contract per NFT personalizzato, che è sorprendentemente breve: contiene solo un contatore, un costruttore e una singola funzione! Questo grazie ai nostri contratti OpenZeppelin ereditati, che implementano la maggior parte dei metodi di cui abbiamo bisogno per creare un NFT, come `ownerOf` che restituisce il proprietario dell'NFT e `transferFrom`, che trasferisce la proprietà dell'NFT da un account a un altro.

Il contatore, `_nextTokenId`, tiene traccia del numero totale di NFT coniati e imposta l'ID univoco sul nostro nuovo NFT. (A ogni NFT coniato utilizzando uno smart contract deve essere assegnato un ID univoco: qui il nostro ID univoco è semplicemente determinato dal numero totale di NFT esistenti. `++_nextTokenId` incrementa il contatore prima che venga utilizzato, quindi il primo NFT che coniamo con il nostro smart contract ha un ID pari a "1", il nostro secondo NFT ha un ID pari a "2", ecc.)

Nel nostro costruttore ERC-721, noterai che passiamo 2 stringhe, "MyNFT" e "NFT". La prima variabile è il nome dello smart contract e la seconda è il suo simbolo. Puoi nominare ciascuna di queste variabili come preferisci!

Infine, abbiamo la nostra funzione `mintNFT(address recipient, string memory tokenURI)` che ci permette di coniare un NFT! Noterai che questa funzione accetta due variabili:

- `address recipient` specifica l'indirizzo che riceverà il tuo NFT appena coniato

- `string memory tokenURI` è una stringa che dovrebbe risolversi in un documento JSON che descrive i metadati dell'NFT. I metadati di un NFT sono in realtà ciò che gli dà vita, consentendogli di avere proprietà configurabili, come un nome, una descrizione, un'immagine e altri attributi. Nella parte 2 di questo tutorial, descriveremo come configurare questi metadati.

`mintNFT` chiama alcuni metodi dalla libreria ERC-721 ereditata e, in definitiva, restituisce un numero che rappresenta l'ID dell'NFT appena coniato.

## Passaggio 11: Connettere MetaMask e Alchemy al tuo progetto {#connect-metamask-and-alchemy}

Ora che abbiamo creato un portafoglio MetaMask, un account Alchemy e scritto il nostro smart contract, è il momento di connettere i tre.

Ogni transazione inviata dal tuo portafoglio virtuale richiede una firma utilizzando la tua chiave privata univoca. Per fornire al nostro programma questa autorizzazione, possiamo archiviare in modo sicuro la nostra chiave privata (e la chiave dell'interfaccia di programmazione delle applicazioni (API) di Alchemy) in un file di ambiente.

Per saperne di più sull'invio di transazioni, dai un'occhiata alla [documentazione sulle transazioni](/developers/docs/transactions/).

Crea un file `.env` nella directory principale del nostro progetto e aggiungi la tua chiave privata di MetaMask e l'URL HTTP dell'API di Alchemy.

- Segui [queste istruzioni](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) per esportare la tua chiave privata da MetaMask

- Vedi sotto per ottenere l'URL HTTP dell'API di Alchemy e copiarlo negli appunti

![Copia l'URL della tua API di Alchemy](./copy-alchemy-api-url.mp4#842x480)

Il tuo `.env` dovrebbe ora apparire così:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Per connetterli effettivamente al nostro codice, faremo riferimento a queste variabili nel nostro file hardhat.config.js al passaggio 13. Node.js può leggere i file `.env` da solo, quindi non c'è alcun pacchetto aggiuntivo da installare.

<EnvWarningBanner />

## Passaggio 12: Installare Ethers.js {#install-ethers}

Ethers.js è una libreria che semplifica l'interazione e l'effettuazione di richieste a Ethereum avvolgendo i [metodi JSON-RPC standard](/developers/docs/apis/json-rpc/) con metodi più intuitivi per l'utente.

Hardhat rende semplicissimo integrare [Plugin](https://hardhat.org/docs/plugins/official-plugins) per strumenti aggiuntivi e funzionalità estese. Sfrutteremo il [plugin Ethers](https://hardhat.org/docs/plugins/hardhat-ethers) per la distribuzione dei contratti ([Ethers.js](https://docs.ethers.org/v6/) ha dei metodi di distribuzione dei contratti estremamente puliti).

Nella directory del tuo progetto digita:

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

Aggiungeremo anche il plugin al nostro hardhat.config.js nel passaggio successivo.

## Passaggio 13: Aggiornare hardhat.config.js {#update-hardhat-config}

Finora abbiamo aggiunto diverse dipendenze e plugin, ora dobbiamo aggiornare hardhat.config.js in modo che il nostro progetto li riconosca tutti.

Aggiorna il tuo hardhat.config.js in modo che appaia così:

```js
import { existsSync } from "node:fs"
import hardhatEthers from "@nomicfoundation/hardhat-ethers"
import { configVariable, defineConfig } from "hardhat/config"

// Carica API_URL e PRIVATE_KEY dal file .env in process.env, se esiste
if (existsSync(".env")) process.loadEnvFile()

export default defineConfig({
  plugins: [hardhatEthers],
  solidity: "0.8.34",
  networks: {
    sepolia: {
      type: "http",
      url: configVariable("API_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
})
```

`configVariable` dice ad Hardhat di leggere ogni valore da una variabile d'ambiente solo quando è necessario, in modo che comandi come `compile` funzionino anche prima che i valori siano impostati. Se preferisci non conservare la tua chiave privata in un file di testo normale, Hardhat può anche leggere le [variabili di configurazione da un keystore crittografato](https://hardhat.org/docs/guides/configuration-variables).

## Passaggio 14: Compilare il nostro contratto {#compile-contract}

Per assicurarci che tutto funzioni finora, compiliamo il nostro contratto. L'attività compile è una delle attività integrate di Hardhat.

Dalla riga di comando esegui:

```sh
npx hardhat compile
```

La prima volta che compili, Hardhat scarica il compilatore Solidity. Dovresti quindi vedere qualcosa come `Compiled 1 Solidity file with solc 0.8.34`. In caso contrario, puoi sempre inviare un messaggio sul [Discord di Alchemy](https://discord.gg/gWuC7zB).

## Passaggio 15: Scrivere il nostro script di distribuzione {#write-deploy}

Ora che il nostro contratto è stato scritto e il nostro file di configurazione è pronto, è il momento di scrivere il nostro script di distribuzione del contratto.

Vai alla cartella `scripts/` e crea un nuovo file chiamato `deploy.js`, aggiungendovi i seguenti contenuti:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const [deployer] = await ethers.getSigners()
const MyNFT = await ethers.getContractFactory("MyNFT")

// Avvia la distribuzione, restituendo una promise che si risolve in un oggetto contratto
const myNFT = await MyNFT.deploy(deployer.address)
await myNFT.waitForDeployment()
console.log("Contract deployed to address:", await myNFT.getAddress())
```

Esaminiamo cosa fa ciascuna di queste righe di codice.

```js
const { ethers } = await network.create()
```

In Hardhat 3, uno script apre esplicitamente una connessione a una rete. `network.create()` si connette alla rete che scegli con l'opzione `--network` quando esegui lo script, e il plugin `hardhat-ethers` aggiunge un oggetto `ethers` a quella connessione.

```js
const [deployer] = await ethers.getSigners()
```

`getSigners()` restituisce gli account configurati per la rete. Su Sepolia, questo è l'account la cui chiave privata hai inserito in `.env`. Passiamo il suo indirizzo al costruttore in modo che tu diventi il proprietario del contratto.

```js
const MyNFT = await ethers.getContractFactory("MyNFT")
```

Una ContractFactory in Ethers.js è un'astrazione utilizzata per distribuire nuovi smart contract, quindi MyNFT qui è una fabbrica per le istanze del nostro contratto per NFT. Quando si utilizza il plugin hardhat-ethers, le istanze di ContractFactory e Contract sono connesse al primo firmatario per impostazione predefinita.

```js
const myNFT = await MyNFT.deploy(deployer.address)
```

Chiamare deploy() su una ContractFactory avvierà la distribuzione e restituirà una Promise che si risolve in un Contract. Questo è l'oggetto che ha un metodo per ciascuna delle funzioni del nostro smart contract. Gli argomenti che passi a deploy() vanno al costruttore del contratto, in questo caso l'indirizzo `initialOwner`.

`waitForDeployment()` attende finché la transazione di distribuzione non viene inclusa in un blocco, e `getAddress()` restituisce l'indirizzo del nuovo contratto. Consulta la [documentazione sui contratti di Ethers.js](https://docs.ethers.org/v6/api/contract/) per maggiori dettagli.

## Passaggio 16: Distribuire il nostro contratto {#deploy-contract}

Siamo finalmente pronti per distribuire il nostro smart contract! Torna alla radice della directory del tuo progetto e nella riga di comando esegui:

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

Dovresti quindi vedere qualcosa del genere:

```text
Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
```

Se andiamo su [Etherscan di Sepolia](https://sepolia.etherscan.io/) e cerchiamo l'indirizzo del nostro contratto, dovremmo riuscire a vedere che è stato distribuito con successo. Se non riesci a vederlo immediatamente, attendi un po' poiché potrebbe volerci del tempo. La transazione avrà un aspetto simile a questo:

![Visualizza l'indirizzo della tua transazione su Etherscan](./etherscan-sepoila-contract-creation.png)

L'indirizzo From (Da) dovrebbe corrispondere all'indirizzo del tuo account MetaMask e l'indirizzo To (A) indicherà "Contract Creation" (Creazione contratto). Se clicchiamo sulla transazione, vedremo l'indirizzo del nostro contratto nel campo To:

![Visualizza l'indirizzo del tuo contratto su Etherscan](./etherscan-sepolia-tx-details.png)

Evvai! Hai appena distribuito il tuo smart contract per NFT sulla catena (testnet) di Ethereum!

Per capire cosa sta succedendo internamente, puoi guardare le richieste ricevute dalla tua app nella tua [dashboard di Alchemy](https://dashboard.alchemy.com/).

Lì vedrai una manciata di chiamate JSON-RPC che Hardhat/Ethers hanno effettuato internamente per noi quando abbiamo chiamato la funzione .deploy(). Due chiamate importanti da segnalare qui sono [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth-sendrawtransaction), che è la richiesta per scrivere effettivamente il nostro smart contract sulla catena di Sepolia, ed [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash) che è una richiesta per leggere informazioni sulla nostra transazione dato l'hash (un pattern tipico quando si inviano transazioni). Per saperne di più sull'invio di transazioni, dai un'occhiata alla [documentazione sulle transazioni](/developers/docs/transactions/).

Questo è tutto per la Parte 1 di questo tutorial. Nella [Parte 2, interagirai effettivamente con il nostro smart contract coniando un NFT](/developers/tutorials/how-to-mint-an-nft/), e nella [Parte 3 ti mostreremo come visualizzare il tuo NFT nel tuo portafoglio Ethereum](/developers/tutorials/how-to-view-nft-in-metamask/)!
