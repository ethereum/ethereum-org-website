---
title: Contratto intelligente "Hello World" per principianti - full stack
description: Tutorial introduttivo su come scrivere e distribuire un semplice smart contract su Ethereum.
author: "nstrike2"
tags:
  - "solidity"
  - "hardhat"
  - "alchemy"
  - "contratti intelligenti"
  - "distribuzione"
  - "blockexplorer"
  - "frontend"
  - "transazioni"
skill: beginner
lang: it
published: 2021-10-25
---

Questa guida fa per te se hai appena iniziato con lo sviluppo sulla blockchain e non sai da dove cominciare o come distribuire e interagire con i contratti intelligenti. Esamineremo la creazione e la distribuzione di un semplice contratto intelligente sulla rete di prova di Goerli, utilizzando [MetaMask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org) e [Alchemy](https://alchemyapi.io/eth).

Per completare questo tutorial avrai bisogno di un conto di Alchemy. [Registrati per un conto gratuito](https://www.alchemy.com/).

Se in qualsiasi momento hai domande, non esitare a contattarci nel [Discord di Alchemy](https://discord.gg/gWuC7zB)!

## Parte 1- Crea e distribuisci il tuo contratto intelligente usando Hardhat {#part-1}

### Connettersi alla rete di Ethereum {#connect-to-the-ethereum-network}

Esistono molti modi per effettuare richieste alla catena di Ethereum. Per semplicità, ci serviremo di un conto gratuito su Alchemy, una piattaforma per sviluppatori di blockchain e API che ci consentirà di comunicare con la catena di Ethereum senza dover eseguire noi stessi un nodo. Alchemy offre anche strumenti di monitoraggio e analisi per gli sviluppatori di cui ci serviremo in questo tutorial per comprendere al meglio l'andamento della distribuzione del nostro contratto intelligente.

### Crea la tua app e la chiave API {#create-your-app-and-api-key}

Una volta creato un conto di Alchemy, puoi generare una chiave API creando un'app. Questo ti consentirà di effettuare richieste alla rete di prova di Goerli. Se non hai familiarità con le reti di prova puoi [leggere la guida di Alchemy alla scelta di una rete](https://docs.alchemyapi.io/guides/choosing-a-network).

Sul pannello di controllo di Alchemy, trova il menu a discesa delle **App** nella barra di navigazione e fai clic su su **Crea App**.

![Creare l'app Hello world](./hello-world-create-app.png)

Nomina la tua app '_Hello World_' e scrivi una breve descrizione. Seleziona **Staging** come tuo ambiente e **Goerli** come tua rete.

![Vista della creazione dell'app Hello world](./create-app-view-hello-world.png)

_Nota: assicurati di selezionare **Goerli**, altrimenti questo tutorial non funzionerà._

Fa i clic su **Crea app**. La tua app apparirà nella tabella sottostante.

### Crea un conto di Ethereum {#create-an-ethereum-account}

Per inviare e ricevere transazioni, hai bisogno di un account di Ethereum. Useremo MetaMask, un portafoglio virtuale nel browser che permette agli utenti di gestire l'indirizzo del proprio conto di Ethereum.

Puoi scaricare e creare gratuitamente un conto di MetaMask [qui](https://metamask.io/download.html). Quando crei un account, o se ne possiedi già uno, assicurati di passare alla "rete di prova di Goerli" in alto a destra (così da non avere a che fare con denaro reale).

### Fase 4: aggiungi ether da un Faucet {#step-4-add-ether-from-a-faucet}

Per distribuire il tuo contratto intelligente sulla rete di prova, avrai bisogno di alcuni ETH finti. Per ottenere ETH sulla rete di Goerli, vai ad un faucet di Goerli e immetti l'indirizzo del tuo conto di Goerli. Si noti che i faucet di Goerli ultimamente possono essere un po' inaffidabili - fare riferimento alla [pagina delle reti di prova](/developers/docs/networks/#goerli) per un elenco delle opzioni da provare:

_Nota: a causa della congestione della rete, questa operazione potrebbe richiedere del tempo_ ``

### Fase 5: controlla il saldo {#step-5-check-your-balance}

Per ricontrollare che gli ETH siano nel tuo portafoglio, facciamo una richiesta [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) usando lo [strumento compositore di Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Questo restituirà l'importo di ETH nel nostro portafoglio. Per saperne di più consultate [il breve tutorial di Alchemy su come usare lo strumento compositore](https://youtu.be/r6sjRxBZJuU).

Inserisci l'indirizzo del tuo conto di MetaMask e fai clic su **Invia richiesta**. Vedrai una risposta simile al pezzetto di codice qui sotto.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _Nota: questo risultato è in wei, non in ETH. Wei è usato come taglio più piccolo dell'ether._

Meno male! I nostri soldi finti ci sono tutti.

### Fase 6: inizializza il progetto {#step-6-initialize-our-project}

Per prima cosa dobbiamo creare una cartella per il nostro progetto. Passa alla tua riga di comando e inserisci quanto segue.

```
mkdir hello-world
cd hello-world
```

Ora che siamo nella cartella del nostro progetto, useremo `npm init` per inizializzare il progetto.

> Se non hai ancora installato npm, segui [queste istruzioni su come installare Node.js e npm](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm).

Ai fini di questo tutorial, non ha importanza a come rispondi alle domande di inizializzazione. Per tuo riferimento, ecco come abbiamo fatto:

```
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)

About to write to /Users/.../.../.../hello-world/package.json:

{
   "name": "hello-world",
   "version": "1.0.0",
   "description": "hello world smart contract",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

Approva il package.json e siamo pronti!

### Passo 7: scarica Hardhat {#step-7-download-hardhat}

Hardhat è un ambiente di sviluppo per compilare, distribuire, testare ed effettuare il debug del tuo software di Ethereum. Aiuta gli sviluppatori nella costruzione di contratti intelligenti e dapp localmente, prima di distribuirli alla catena.

Nel nostro progetto `hello-world` esegui:

```
npm install --save-dev hardhat
```

Dai un'occhiata a questa pagina per ulteriori dettagli sulle [istruzioni d'installazione](https://hardhat.org/getting-started/#overview).

### Fase 8: crea un progetto Hardhat {#step-8-create-hardhat-project}

All'interno della cartella di progetto `hello-world` esegui:

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

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Questo genererà un file `hardhat.config.js` nel progetto. Lo utilizzeremo più avanti nel tutorial per specificare la configurazione del nostro progetto.

### Fase 9: aggiungi le cartelle del progetto {#step-9-add-project-folders}

Per mantenere organizzato il nostro progetto, creiamo due nuove cartelle. Nella riga di comando, vai alla cartella di root del tuo progetto `hello-world` e digita:

```
mkdir contracts
mkdir scripts
```

- `contracts/` è dove manterremo il file del codice del nostro smart contract hello world
- `scripts/` è dove manterremo gli script per distribuire e interagire con il nostro contratto

### Fase 10: compila il nostro contratto {#step-10-write-our-contract}

Potresti chiederti: quando scriveremo del codice? È arrivato il momento!

Apri il progetto hello-world nel tuo editor preferito. La maggior parte dei contratti intelligenti è scritta in Solidity, che useremo per scrivere il nostro contratto intelligente

1. Vai alla cartella `contracts` e crea un nuovo file chiamato `HelloWorld.sol`
2. Di seguito, un esempio del contratto intelligente Hello World che utilizzeremo per questo tutorial. Copia il contenuto seguente in un file `HelloWorld.sol`.

_Nota: assicurati di leggere i commenti per comprendere cosa fa questo contratto._

```
// Specifica la versione di Solidity, utilizzando il controllo delle versioni semantico.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Defines a contract named `HelloWorld`.
// Un contratto è una raccolta di funzioni e dati (il suo stato). Una volta distribuito, un contratto risiede in un indirizzo specifico della blockchain Ethereum. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // Le variabili di stato sono variabili con valori memorizzati in modo permanente nello spazio di archiviazione (storage) del contratto. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // I costruttori sono utilizzati per inizializzare i dati del contratto. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Questo è un contratto intelligente di base che memorizza un messaggio al momento della creazione. Può essere aggiornato richiamando la funzione `update`.

### Fase 11: connetti MetaMask e Alchemy al tuo progetto {#step-11-connect-metamask-alchemy-to-your-project}

Abbiamo creato un portafoglio di MetaMask, un conto di Alchemy e scritto il nostro contratto intelligente; è arrivato il momento di collegarli.

Ogni transazione inviata dal tuo portafoglio richiede una firma tramite la tua chiave privata univoca. Per fornire al nostro programma quest'autorizzazione, possiamo memorizzare in sicurezza la nostra chiave privata in un file di ambiente. Qui memorizzeremo anche una chiave API per Alchemy.

> Per saperne di più sull'invio delle transazioni, dai un'occhiata a [questo tutorial](https://docs.alchemyapi.io/alchemy/tutorials/sending-transactions-using-web3-and-alchemy) sull'invio di transazioni usando web3.

Prima, installa il pacchetto dotenv nella cartella del tuo progetto:

```
npm install dotenv --save
```

Quindi, crea un file `.env` nella cartella di root del progetto. Aggiungi nel file la tua chiave privata di MetaMask e l'URL HTTP dell'API Alchemy.

Il tuo file di ambiente deve essere nominato `.env` o non verrà riconosciuto come un file di ambiente.

Non nominarlo `process.env` o `.env-custom` o in altro modo.

- Segui [queste istruzioni](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) per esportare la tua chiave privata
- Vedi sotto per ottenere l'URL dell'API di Alchemy HTTP

![](./get-alchemy-api-key.gif)

Il tuo `.env` dovrebbe somigliare a questo:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/tua-chiave-api"
PRIVATE_KEY = "tua-chiave-privata-metamask"
```

Per connetterli realmente al nostro codice, faremo riferimento a queste variabili nel nostro file `hardhat.config.js` nella fase 13.

### Fase 12: installa Ethers.js {#step-12-install-ethersjs}

Ethers.js è una libreria che rende più facile interagire ed effettuare richieste a Ethereum tramite wrapping dei <a href="https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc">metodi JSON-RPC standard</a> con altri metodi più facili da usare.

Hardhat ci permette di integrare i [plugin](https://hardhat.org/plugins/) per avere strumenti aggiuntivi e funzionalità estese. Sfrutteremo il [plugin di Ethers](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html) per la distribuzione del contratto.

Nella cartella del tuo progetto digita:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### Fase 13: aggiorna hardhat.config.js {#step-13-update-hardhat.configjs}

Finora abbiamo aggiunto diverse dipendenze e plugin, ora dobbiamo aggiornare `hardhat.config.js` in modo che il nostro progetto li riconosca tutti.

Aggiorna il tuo `hardhat.config.js` affinché somigli a questo:

```javascript
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")

const { API_URL, PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
}
```

### Fase 14: compila il contratto {#step-14-compile-our-contract}

Per assicurarti che tutto funzioni fino a questo punto, compila il contratto. L'attività di `compilazione` è una delle attività integrate di hardhat.

Dalla riga di comando esegui:

```bash
npx hardhat compile
```

Potresti ricevere un avviso `SPDX license identifier not provided in source file`, ma non ti preoccupare, si spera che tutto il resto funzioni! Altrimenti, puoi sempre inviare un messaggio nel [Discord di Alchemy](https://discord.gg/u72VCg3).

### Fase 15: scrivi lo script di distribuzione {#step-15-write-our-deploy-script}

Ora che il nostro contratto è scritto e il nostro file di configurazione è pronto, è il momento di scrivere lo script di distribuzione del contratto.

Vai alla cartella `script/` e crea un nuovo file chiamato `deploy.js`, aggiungendo i seguenti contenuti:

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // Start deployment, returning a promise that resolves to a contract object
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Contract deployed to address:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Nel suo [tutorial sui Contratti](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) hardhat spiega in modo eccellente cosa fa ognuna di queste righe di codice nel loro, quindi riportiamo qui le loro spiegazioni.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

Un `ContractFactory` su ethers.js è un'astrazione usata per distribuire nuovi contratti intelligenti, quindi `HelloWorld` qui è una [fabbrica](<https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)>) di istanze del nostro contratto hello world. Usando il plugin `hardhat-ethers`, le istanze `ContractFactory` e `Contract` sono connesse di default al primo firmatario (proprietario).

```javascript
const hello_world = await HelloWorld.deploy()
```

Chiamare `deploy()` su un `ContractFactory` avvierà la distribuzione e restituirà un `Promise` che si risolve in un oggetto `Contract`. Questo è l'oggetto che ha un metodo per ciascuna delle funzioni del nostro smart contract.

### Fase 16: distribuisci il contratto {#step-16-deploy-our-contract}

Siamo finalmente pronti a distribuire il nostro smart contract! Vai alla riga di comando ed esegui:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

Vorrai poi vedere qualcosa del genere:

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**Salva questo indirizzo**. Lo useremo più avanti nel tutorial.

Se andiamo all'[etherscan di Goerli](https://goerli.etherscan.io) e cerchiamo l'indirizzo del nostro contratto, dovremmo poter vedere che è stato distribuito correttamente. La transazione somiglierà a questa:

![](./etherscan-contract.png)

L'indirizzo `From` dovrebbe corrispondere all'indirizzo del tuo conto di MetaMask mentre l'indirizzo `To` riporterà la dicitura **Creazione del contratto**. Se facciamo clic sulla transazione vedremo l'indirizzo del contratto nel campo `To`.

![](./etherscan-transaction.png)

Congratulazioni! Hai appena distribuito un contratto intelligente su una rete di prova di Ethereum.

Per capire cosa sta succedendo, andiamo alla scheda Explorer nel nostro [dashboard di Alchemy](https://dashboard.alchemyapi.io/explorer). Se hai diverse app di Alchemy assicurati di filtrare per app e selezionare **Hello World**.

![](./hello-world-explorer.png)

Qui vedrai numerosi metodi JSON-RPC che Harhat/Ethers ha creato dietro le quinte per noi quando abbiamo chiamato la funzione `.deploy()`. Due metodi importanti sono [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), che è la richiesta per scrivere il nostro contratto sulla catena di Goeli, e [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash), che è una richiesta di leggere le informazioni sulla nostra transazione in base all'hash. Per saperne di più sull'invio di transazioni, dai un'occhiata al [nostro tutorial sull'invio di transazioni usando Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

## Parte 2: interagisci con il tuo contratto intelligente {#part-2-interact-with-your-smart-contract}

Adesso che abbiamo distribuito con successo un contratto intelligente nella rete di Goerli, impariamo come interagire con esso.

### Crea un file interact.js {#create-a-interactjs-file}

Questo è il file dove scriveremo il nostro script di interazione. Useremo la libreria Ethers.js che hai installato precedentemente nella Parte 1.

All'interno della cartella `scripts/`, crea un nuovo file chiamato `interact.js` e aggiungi il seguente codice:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### Aggiorna il tuo file .env {#update-your-env-file}

Useremo delle nuove variabili di ambiente, quindi dobbiamo definirle nel file `.env` che [abbiamo creato in precedenza](#step-11-connect-metamask-&-alchemy-to-your-project).

Dovremo aggiungere una definizione per la nostra `CHIAVE_API` di Alchemy e il `CONTRACT_ADDRESS` dove è stato distribuito il tuo contratto intelligente.

Il tuo file `.env` dovrebbe assomigliare a questo:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### Prendi l'ABI del tuo contratto {#grab-your-contract-ABI}

L'[ABI (Interfaccia Binaria dell'Applicazione)](/glossary/#abi) del nostro contratto è l'interfaccia per interagire con il nostro contratto intelligente. Hardhat genera automaticamente l'ABI e la salva in `HelloWorld.json`. Per usare l'ABI, dobbiamo analizzarne il contenuto aggiungendo le seguenti righe di codice al nostro file `interact.js`:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

Se vuoi vedere l'ABI, puoi stamparla nella tua console:

```javascript
console.log(JSON.stringify(contract.abi))
```

Per vedere l'ABI stampata alla console, vai al terminale ed esegui:

```bash
npx hardhat run scripts/interact.js
```

### Crea un'istanza del tuo contratto {#create-an-instance-of-your-contract}

Per interagire con il tuo contratto, dobbiamo creare un'istanza del contratto nel nostro codice. Per farlo con Ethers.js, dovremo lavorare con tre concetti:

1. Fornitore - un fornitore di nodi che consente l'accesso in lettura e scrittura alla blockchain
2. Firmatario - rappresenta un conto di Ethereum che può firmare transazioni
3. Contratto - un oggetto Ethers.js che rappresenta uno specifico contratto distribuito sulla catena

Utilizzeremo l'ABI del contratto della fase precedente per creare la nostra istanza del contratto:

```javascript
// interact.js

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Contract
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

Per saperne di più su fornitori, firmatari e contratti consultare la [documentazione di ethers.js](https://docs.ethers.io/v5/).

### Leggi il messaggio init {#read-the-init-message}

Ricordi quando abbiamo distribuito il nostro contratto con il `initMessage = "Hello world!"`? Ora andremo a leggere il messaggio memorizzato nel nostro contratto intelligente e a stamparlo nella console.

In JavaScript, quando si interagisce con le reti vengono usate funzioni asincrone. Per saperne di più sulle funzioni asincrone, [leggi questo articolo di Medium](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

Usa il codice qui sotto per chiamare la funzione `message` nel nostro contratto intelligente e leggere il messaggio init:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```

Dopo aver eseguito il file usando il comando `npx hardhat run scripts/interact.js` da terminale, dovremmo vedere questa risposta:

```
The message is: Hello world!
```

Congratulazioni! Hai appena letto con successo i dati dal contratto intelligente dalla blockchain Ethereum, complimenti!

### Aggiorna il messaggio {#update-the-message}

Invece di limitarci a leggere il messaggio, possiamo anche aggiornare il messaggio salvato nel nostro contratto intelligente usando la funzione `update`! Piuttosto forte, vero?

Per aggiornare il messaggio, possiamo chiamare direttamente la funzione `update` nel nostro oggetto Contratto instanziato:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("This is the new message.")
  await tx.wait()
}
main()
```

Da notare che alla riga 11, facciamo una chiamata a `.wait()` all'oggetto transazione restituito. Questo assicura che il nostro script aspetti che la transazione venga minata sulla blockchain prima di uscire dalla funzione. Se la chiamata `.wait()` non viene inclusa, lo script potrebbe non vedere il valore `message` aggiornato nel contratto.

### Leggi il nuovo messaggio {#read-the-new-message}

Ora dovresti essere capace di ripetere la [fase precedente](#read-the-init-message) per leggere il valore `message` aggiornato. Prenditi un momento e vedi se riesci ad apportare le modifiche necessarie per stampare il nuovo valore!

Se hai bisogno di un suggerimento, ecco come dovrebbe apparire il tuo file `interact.js` a questo punto:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// signer - you
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// contract instance
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("this is the new message")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("The new message is: " + newMessage)
}

main()
```

Adesso esegui solo script e dovresti essere in grado di vedere il vecchio messaggio, lo stato di aggiornamento e il nuovo messaggio stampato sul tuo terminale!

`npx hardhat run scripts/interact.js --network goerli`

```
The message is: Hello World!
Updating the message...
The new message is: This is the new message.
```

Durante l'esecuzione dello script, potresti notare che la fase `Updating the message...` richiede del tempo di caricamento prima che venga caricato il nuovo messaggio. Questo è dovuto al processo di mining; se sei curioso di tracciare le transazioni mentre vengono minate, visita la [mempool di Alchemy](https://dashboard.alchemyapi.io/mempool) per vedere lo stato di una transazione. Se la transazione viene eliminata, è sempre utile dare un'occhiata all'[Etherscan di Goerli](https://goerli.etherscan.io) e cercare l'hash della tua transazione.

## Parte 3: pubblica il tuo contratto intelligente su Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

Hai fatto tutto il lavoro duro per dare vita il tuo contratto intelligente, ora è arrivato il momento di condividerlo con il mondo!

Verificando il tuo contratto intelligente su Etherscan, chiunque può vedere il codice sorgente e interagire con il tuo contratto intelligente. Iniziamo!

### Fase 1: genera una chiave API nel tuo conto di Etherscan {#step-1-generate-an-api-key-on-your-etherscan-account}

La chiave API di Etherscan è necessaria per verificare che tu possieda il contratto intelligente che stai cercando di pubblicare.

Se non hai ancora un conto di Etherscan [registrati per avere un conto](https://etherscan.io/register).

Una volta effettuato l'accesso, cerca il tuo nome utente nella barra di navigazione, passaci sopra e seleziona il pulsante **Il mio profilo**.

Nella tua pagina del profilo, dovresti vedere una barra di navigazione laterale. Dalla barra di navigazione laterale, seleziona **Chiavi API**. Quindi, premi il pulsante "Aggiungi" per creare una nuova chiave API, dai un nome alla tua app **hello-world** e premi il pulsante **Crea una nuova chiave API**.

La tua nuova chiave API dovrebbe apparire nella tabella delle chiavi API. Copia la chiave API nei tuoi appunti.

Successivamente, dobbiamo aggiungere la chiave API di Etherscan al nostro file `.env`.

Dopo averla aggiunta, il file `.env` dovrebbe apparire così:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Contratti intelligenti distribuiti su Hardhat {#hardhat-deployed-smart-contracts}

#### Installa hardhat-etherscan {#install-hardhat-etherscan}

Pubblicare i tuoi contratti su Ethereum usando Hardhat è semplice. Per iniziare è necessario installare il plugin `hardhat-etherscan`. `hardhat-etherscan` verificherà automaticamente il codice sorgente e la ABI del contratto intelligente su Etherscan. Per aggiungerlo, esegui dalla cartella `hello-world`:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

Una volta installato, includi la seguente dichiarazione in cima al tuo `hardhat.config.js` e aggiungi le opzioni di configurazione di Etherscan:

```javascript
// hardhat.config.js

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")

const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Verifica il tuo contratto intelligente su Etherscan {#verify-your-smart-contract-on-etherscan}

Assicurati che tutti i file siano stati salvati e che tutte le variabili `.env` siano correttamente configurate.

Esegui l'attività `verify`, passando l'indirizzo del contratto e la rete dove è stato distribuito:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

Assicurati che `DEPLOYED_CONTRACT_ADDRESS` sia l'indirizzo del tuo contratto intelligente distribuito sulla rete di prova di Goerli. Inoltre, l'argomento finale (`'Hello World!'`) deve essere lo stesso valore di stringa usato [durante la fase di distribuzione nella parte 1](#write-our-deploy-script).

Se tutto va bene, nel tuo terminale vedrai il seguente messaggio:

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

Congratulazioni! Il codice del tuo contratto intelligente è su Etherscan!

### Dai un'occhiata al tuo contratto intelligente su Etherescan! {#check-out-your-smart-contract-on-etherscan}

Quando vai al link fornito nel tuo terminale, dovresti essere in grado di vedere il codice e l'ABI del tuo contratto intelligente pubblicati su Etherscan!

**Fantastico: ce l'hai fatta! Ora chiunque può chiamare o scrivere sul tuo contratto intelligente! Non vediamo l'ora di vedere cosa svilupperai in futuro!**

## Parte 4: integra il tuo contratto intelligente con il frontend {#part-4-integrating-your-smart-contract-with-the-frontend}

Alla fine di questo tutorial, saprai:

- Collegare un portafoglio di MetaMask alla tua dapp
- Leggere dati da un contratto intelligente usando le API [Web3 di Alchemy](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Firmare le transazioni di Ethereum usando MetaMask

Per questa dapp, useremo [React](https://reactjs.org/) come nostro framwork di frontend; tuttavia è importante notare che non dedicheremo molto tempo alla descrizione dei suoi fondamentali, poiché ci concentreremo principalmente sull'introduzione delle funzionalità web3 nel nostro progetto.

Come prerequisito, è necessario avere una comprensione di React a livello principiante. In caso contrario, suggeriamo di completare il [tutorial Introduzione a React](https://reactjs.org/tutorial/tutorial.html) ufficiale.

### Clonare i file iniziali {#clone-the-starter-files}

Per prima cosa, vai al [repository hello-world-part-four in Github](https://github.com/alchemyplatform/hello-world-part-four-tutorial) per ottenere i file iniziali per questo progetto e clona questo repository nella tua macchina in locale.

Apri il repository clonato localmente. Si noti che contiene due cartelle `starter-files` e `completed`.

- `starter-files`- **lavoreremo in questa cartella**, collegheremo l'interfaccia utente al tuo portafoglio di Ethereum e al contratto intelligente che abbiamo pubblicato nella [Parte 3](#part-3).
- `completed` contiene l'intero tutorial completato e deve essere usata solo come riferimento se ci si blocca.

Quindi, apri la tua copia di `starter-files` con il tuo editor di codice preferito, e poi vai alla cartella `src`.

Tutto il codice che scriveremo sarà sotto la cartella `src`. Modificheremo il componente `HelloWorld.js` e i file Javascript `util/interact.js` per dare al nostro progetto la funzionalità Web3.

### Dai un'occhiata ai file iniziali {#check-out-the-starter-files}

Prima di iniziare a programmare, diamo un'occhiata a ciò che ci viene fornito nei file iniziali.

#### Metti in funzione il tuo progetto di React {#get-your-react-project-running}

Iniziamo eseguendo il progetto di React nel browser. La bellezza di React è che una volta eseguito il nostro progetto nel browser, ogni modifica che salviamo sarà aggiornata dal vivo nel browser.

Per mettere il progetto in funzione, vai alla cartella di root della cartella `starter-files` ed esegui `npm install` nel terminale per installare le dipendenze del progetto:

```bash
cd starter-files
npm install
```

Una volta terminata l'installazione, esegui `npm start` nel terminale:

```bash
npm start
```

Così facendo, dovrebbe aprirsi [http://localhost:3000/](http://localhost:3000/) nel browser, dove vedrai il frontend per il nostro progetto. Dovrebbe consistere in un campo \(un posto per aggiornare il messaggio memorizzato nel tuo contratto intelligente\), il pulsante "Connetti portafoglio" e un pulsante "Aggiorna".

Se provi a fare clic su uno dei pulsanti, noterai che non funzionano - questo perché devi ancora programmarne la funzionalità.

#### Il componente `HelloWorld.js` {#the-helloworld-js-component}

Torniamo la cartella `src` nell'editor e apriamo il file `HelloWorld.js`. È davvero importante comprendere tutto il contenuto di questo file, che è il componente principale di React su cui lavoreremo.

All'inizio di questo file, noterai che abbiamo diverse dichiarazioni relative all'importazione che sono necessarie per far funzionare il nostro progetto, inclusa la libreria di React, gli hook useEffect ed useState, alcuni elementi da `./util/interact.js` (li descriveremo in dettaglio a breve!) e il logo di Alchemy.

```javascript
// HelloWorld.js

import React from "react"
import { useEffect, useState } from "react"
import {
  helloWorldContract,
  connectWallet,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
} from "./util/interact.js"

import alchemylogo from "./alchemylogo.svg"
```

Successivamente, abbiamo le nostre variabili di stato che aggiorneremo dopo eventi specifici.

```javascript
// HelloWorld.js

//State variables
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("No connection to the network.")
const [newMessage, setNewMessage] = useState("")
```

Ecco cosa rappresenta ciascuna variabile:

- `walletAddress` - una stringa che memorizza l'indirizzo del portafoglio dell'utente
- `status`- una stringa che memorizza un messaggio utile che guida l'utente su come interagire con la dapp
- `message` - una stringa che memorizza il messaggio corrente nel contratto intelligente
- `newMessage` - una stringa che memorizza il nuovo messaggio che verrà scritto nel contratto intelligente

Dopo le variabili di stato, vedrai cinque funzioni non implementate: `useEffect` ,`addSmartContractListener`, `addWalletListener` , `connectWalletPressed` e `onUpdatePressed`. Illustreremo cosa fanno qui di seguito:

```javascript
// HelloWorld.js

//called only once
useEffect(async () => {
  //TODO: implement
}, [])

function addSmartContractListener() {
  //TODO: implement
}

function addWalletListener() {
  //TODO: implement
}

const connectWalletPressed = async () => {
  //TODO: implement
}

const onUpdatePressed = async () => {
  //TODO: implement
}
```

- [`useEffect`](https://reactjs.org/docs/hooks-effect.html) - questo è un hook di React chiamato dopo il rendering del tuo componente. Poiché in essa viene passato un array vuoto `[]` \(vedi la riga 4\), sarà chiamata solo al _primo_ rendering del componente. Qui caricheremo il messaggio corrente memorizzato nel nostro contratto intelligente, chiameremo i listener del nostro contratto intelligente e del portafoglio e aggiorneremo la nostra interfaccia utente per riflettere se un portafoglio sia già connesso.
- `addSmartContractListener`- questa funzione configura un listener che osserverà l'evento `UpdatedMessages` del nostro contratto HelloWorld e aggiornerà la nostra interfaccia utente quando il messaggio è cambiato nel nostro contratto intelligente.
- `addWalletListener`- questa funzione configura un listener che rileva i cambiamenti nel portafoglio di MetaMask dell'utente, come quando un utente disconnette il suo portafoglio o cambia indirizzo.
- `connectWalletPressed`- questa funzione sarà chiamata per connettere il portafoglio di MetaMask dell'utente alla nostra dapp.
- `onUpdatePressed` - questa funzione sarà chiamata quando un utente vuole aggiornare il messaggio memorizzato nel contratto intelligente.

Vicino alla fine di questo file, abbiamo l'UI del nostro componente.

```javascript
// HelloWorld.js

//the UI of our component
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Current Message:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>New Message:</h2>

    <div>
      <input
        type="text"
        placeholder="Update the message in your smart contract."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Update
      </button>
    </div>
  </div>
)
```

Se analizzi questo codice con attenzione, noterai dove usiamo le varie variabili di stato nella nostra interfaccia utente:

- Nelle righe 6-12, se il portafoglio dell'utente è connesso \(ossia `walletAddress.length > 0`\), viene visualizzata una versione troncata del `walletAddress` dell'utente nel pulsante con ID "walletButton"; altrimenti si leggerà semplicemente "Connect Wallet".
- Nella riga 17, viene visualizzato il messaggio corrente memorizzato nel contratto intelligente, che è acquisito nella stringa `message`.
- Nelle righe 23-26, usiamo un [componente controllato](https://reactjs.org/docs/forms.html#controlled-components) per aggiornare la nostra variabile di stato `newMessage` quando l'input nel campo di testo cambia.

Oltre alle variabili di stato, vedrai anche che le funzioni `connectWalletPressed` e `onUpdatePressed` vengono chiamate rispettivamente quando si fa clic sui pulsanti con ID `publishButton` e `walletButton`.

Infine vediamo dove viene aggiunto questo componente `HelloWorld.js`.

Se vai al file `App.js`, che è il componente principale su React e che agisce come contenitore per tutti gli altri componenti, vedrai che il nostro componente `HelloWorld.js` è inserito alla riga 7.

Per ultimo, ma non meno importante, diamo un'occhiata ad un altro file fornito, il file `interact.js`.

#### Il file `interact.js` {#the-interact-js-file}

Poiché vogliamo rispettare il paradigma [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), vorremo un file separato che contiene tutte le nostre funzioni per gestire la logica, i dati e le regole della nostra dapp, ed essere quindi in grado di esportare queste funzioni al nostro frontend \(il nostro componente`HelloWorld.js`\).

👆🏽Questo è esattamente lo scopo del file `interact.js`!

Vai alla cartella `util`nella tua directory `src`, e noterai che abbiamo incluso un file chiamato `interact.js` che conterrà tutte le funzioni e le variabili per l'interazione con il nostro contratto intelligente e con il portafoglio.

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

Noterai che all'inizio del file abbiamo commentato l'oggetto `helloWorldContract`. Più avanti in questo tutorial, toglieremo il commento a questo oggetto e istanzieremo il nostro contratto intelligente in questa variabile, che esporteremo poi nel nostro componente `HelloWorld.js`.

Le quatto funzioni non implementate dopo il nostro oggetto `helloWorldContract` fanno quanto segue:

- `loadCurrentMessage` - questa funzione gestisce la logica di caricamento del messaggio corrente salvato nel contratto intelligente. Effettuerà una chiamata _read (leggi)_ al contratto intelligente Hello World usando l'[API Web3 di Alchemy](https://github.com/alchemyplatform/alchemy-web3).
- `connectWallet` - questa funzione connette il MetaMask dell'utente alla nostra dapp.
- `getCurrentWalletConnected` - questa funzione verificherà se un conto di Ethereum è già connesso alla nostra dapp durante il caricamento della pagina e aggiornerà l'interfaccia utente di conseguenza.
- `updateMessage` - questa funzione aggiornerà il messaggio memorizzato nel contratto intelligente. Effettuerà una chiamata di _scrittura_ al contratto intelligente Hello World, quindi il portafoglio di MetaMask dell'utente dovrà firmare una transazione di Ethereum per aggiornare il messaggio.

Ora che ci è chiaro con cosa stiamo lavorando, cerchiamo di capire come leggere il nostro contratto intelligente!

### Fase 3: leggi il tuo contratto intelligente {#step-3-read-from-your-smart-contract}

Per leggere il tuo contratto intelligente, dovrai configurare con successo:

- Una connessione API alla catena Ethereum
- Un'istanza caricata del tuo contratto intelligente
- Una funzione per chiamare la funzione del tuo contratto intelligente
- Un listener per rilevare gli aggiornamenti quando i dati letti dal contratto intelligente cambiano

Questo può sembrare un gran numero di passaggi, ma non preoccuparti! Ti spiegheremo come affrontarli passo dopo passo! :\)

#### Stabilire una connessione API alla catena Ethereum {#establish-an-api-connection-to-the-ethereum-chain}

Ricordi che nella seconda parte di questo tutorial abbiamo usato la nostra [chiave Web3 di Alchemy per leggere il nostro contratto intelligente](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library)? Ti servirà anche una chiave Web3 di Alchemy nella tua dapp per leggere dalla caena.

Se non lo hai già, installa [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) andando nella cartella di root dei tuoi `starter-files` ed eseguendo il seguente comando nel tuo terminale:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) è un wrapper intorno a[Web3.js](https://docs.web3js.org/) che fornisce metodi API migliorati e altri benefici fondamentale per semplificare la tua vita a uno sviluppatore web3. È progettato per richiedere una configurazione minima, così da poter iniziare a usarlo immediatamente nella tua app!

Quindi, installa il pacchetto [dotenv](https://www.npmjs.com/package/dotenv) nella cartella del tuo progetto, in modo da avere un posto sicuro per memorizzare la nostra chiave API dopo averla ottenuta.

```text
npm install dotenv --save
```

Per la nostra dapp, **useremo la nostra chiave API Websockets** invece della nostra chiave API HTTP, perché ci permetterà di configurare un listener che rilevi quando il messaggio memorizzato nel contratto intelligente cambia.

Una volta ottenuta la chiave API, crea un file `.env` nella tua cartella di root e aggiungici l'url di Alchemy Websockets. Successivamente, il tuo file `.env` dovrebbe avere il seguente aspetto:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

Ora siamo pronti a configurare il nostro endpoint Alchemy Web3 nella nostra dapp! Torniamo al nostro `interact.js`, che è contenuto nella cartella `util` e aggiungiamo il seguente codice all'inizio del file:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

Sopra, abbiamo prima importato la chiave Alchemy dal nostro file `.env` e poi passato la nostra `alchemyKey` a `createAlchemyWeb3` per stabilire il nostro endpoint di Alchemy Web3.

Con questo endpoint pronto, è il momento di caricare il nostro contratto intelligente!

#### Caricare il proprio contratto intelligente Hello World {#loading-your-hello-world-smart-contract}

Per caricare il tuo contratto intelligente Hello World, sono necessari l'indirizzo e l'ABI del contratto, entrambi reperibili su Etherscan se hai completato la [Parte 3 di questo tutorial.](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)

#### Come ottenere l'ABI del tuo contratto da Etherscan {#how-to-get-your-contract-abi-from-etherscan}

Se hai saltato la Parte 3 di questo tutorial, puoi usare il contratto HelloWorld con l'indirizzo [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code). La sua ABI si trova [qui](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).

L'ABI di un contratto serve per specificare quale funzione invocherà un contratto, oltre che per garantire che la funzione restituirà i dati nel formato previsto. Una volta copiata la ABI del nostro contratto, salviamola come file JSON chiamato `contract-abi.json` nella cartella `src`.

Il file contract-abi.json deve essere memorizzato nella cartella src.

Con l'indirizzo del contratto, l'ABI e l'endpoint di Alchemy Web3, possiamo usare il [metodo del contratto](https://docs.web3js.org/api/web3-eth-contract/class/Contract) per caricare un'istanza del nostro contratto intelligente. Importa la ABI del contratto nel file `interact.js` e aggiungi l'indirizzo del tuo contratto.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

Ora possiamo finalmente eliminare il commento dalla nostra variabile `helloWorldContract` e caricare il contratto intelligente usando il nostro endpoint di AlchemyWeb3:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Ricapitolando, le prime 12 righe del file `interact.js` dovrebbero avere questo aspetto:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"

export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Ora che il nostro contratto è stato caricato, possiamo implementare la nostra funzione `loadCurrentMessage`!

#### Implementare `loadCurrentMessage` nel proprio file `interact.js` {#implementing-loadCurrentMessage-in-your-interact-js-file}

Questa funzione è semplicissima. Faremo una semplice invocazione asincrona web3 per leggere dal nostro contratto. La nostra funzione restituirà il messaggio memorizzato nel contratto intelligente:

Aggiorna `loadCurrentMessage` nel tuo file `interact.js` come segue:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

Poiché vogliamo visualizzare questo contratto intelligente nella nostra interfaccia utente, aggiorniamo la funzione `useEffect` nel nostro componente `HelloWorld.js` come segue:

```javascript
// HelloWorld.js

//called only once
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

Si noti che vogliamo che il nostro `loadCurrentMessage` sia chiamato solo una volta durante il primo rendering del componente. Presto implementeremo `addSmartContractListener` per aggiornare automaticamente l'interfaccia utente dopo che il messaggio del contratto intelligente cambia.

Prima di addentrarci nel nostro listener, diamo un'occhiata a ciò che abbiamo finora! Salva i file `HelloWorld.js` e `interact.js`, quindi vai su [http://localhost:3000/](http://localhost:3000/)

Noterai che il messaggio corrente non dice più "Nessuna connessione alla rete". Riflette invece il messaggio memorizzato nel contratto intelligente. Pazzesco!

#### L'interfaccia utente dovrebbe ora riflettere il messaggio memorizzato nel contratto intelligente {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

Ora, parlando di quel listener...

#### Implementa `addSmartContractListener` {#implement-addsmartcontractlistener}

Se ripensi al file `HelloWorld.sol` che abbiamo scritto nella [Parte 1 di questa serie di tutorial](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract), ricorderai che c'è un evento del contratto intelligente chiamato `UpdatedMessages` che viene emesso dopo aver invocato la funzione `update` del nostro contratto intelligente \(vedi righe 9 e 27\):

```javascript
// HelloWorld.sol

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// Defines a contract named `HelloWorld`.
// Un contratto è una raccolta di funzioni e dati (il suo stato). Una volta distribuito, un contratto risiede in un indirizzo specifico della blockchain Ethereum. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // Le variabili di stato sono variabili con valori memorizzati in modo permanente nello spazio di archiviazione (storage) del contratto. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // I costruttori sono utilizzati per inizializzare i dati del contratto. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Gli eventi del contratto intelligente sono un modo per il contratto di comunicare che è successo qualcosa (cioè che c'è stato un _evento_) sulla blockchain alla tua applicazione front-end, che può essere "in ascolto" per eventi specifici e agire quando si verificano.

La funzione `addSmartContractListener` sarà in ascolto specificamente per l'evento `UpdatedMessages` del nostro contratto intelligente Hello World e aggiornerà l'interfaccia utente per visualizzare il nuovo messaggio.

Modifica `addSmartContractListener` come segue:

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 Your message has been updated!")
    }
  })
}
```

Analizziamo cosa succede quando il listener rileva un evento:

- Se si verifica un errore quando viene emesso l'evento, questo si rifletterà nell'interfaccia utente tramite la variabile di stato `status`.
- Altrimenti, si utilizzerà l'oggetto `data` restituito. `data.returnValues` è un array indicizzato a zero in cui il primo elemento dell'array memorizza il messaggio precedente e il secondo quello aggiornato. Complessivamente, in caso di evento concluso con successo, imposteremo la stringa `message` con il messaggio aggiornato, cancelleremo la stringa `newMessage` e aggiorneremo la variabile di stato `status` per rispecchiare il fatto che un nuovo messaggio è stato pubblicato sul nostro contratto intelligente.

Infine, chiamiamo il nostro listener nella funzione `useEffect`, in modo che venga inizializzato al primo rendering del componente `HelloWorld.js`. Complessivamente, la funzione `useEffect` dovrebbe avere questo aspetto:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

Ora che siamo in grado di leggere dal nostro contratto intelligente, sarebbe bello anche capire come scrivergli! Tuttavia, per scrivere alla nostra dapp, dobbiamo prima avere un portafoglio di Ethereum collegato ad essa.

Quindi, ora ci occuperemo di configurare il nostro portafoglio di Ethereum (MetaMask) e di collegarlo alla nostra dapp!

### Fase 4: configura il tuo portafoglio di Ethereum {#step-4-set-up-your-ethereum-wallet}

Per scrivere qualsiasi cosa nella catena di Ethereum, gli utenti devono firmare le transazioni utilizzando le chiavi private del proprio portafoglio virtuale. Per questo tutorial, utilizzeremo [MetaMask](https://metamask.io/), un portafoglio virtuale nel browser utilizzato per gestire l'indirizzo del conto di Ethereum, in quanto rende la firma delle transazioni molto semplice per l'utente finale.

Se vuoi capire di più su come funzionano le transazioni su Ethereum, dai un'occhiata a [questa pagina](/developers/docs/transactions/) della Ethereum Foundation.

#### Scarica MetaMask {#download-metamask}

Puoi scaricare e creare gratuitamente un conto di MetaMask [qui](https://metamask.io/download.html). Quando crei un conto, o se ne possiedi già uno, assicurati di passare alla "rete di prova di Goerli" in alto a destra \(così da non avere a che fare con denaro reale\).

#### Aggiungere ether da un Faucet {#add-ether-from-a-faucet}

Per firmare una transazione sulla blockchain di Ethereum, abbiamo bisogno di un po' di Eth finti. Per ottenere Eth puoi andare su [FaucETH](https://fauceth.komputing.org) e inserire l'indirizzo del tuo conto di Goerli, cliccare su "Richiedi fondi", quindi selezionare "Rete di prova di Ethereum di Goerli" nel menu a discesa e infine fare clic di nuovo su "Richiedi fondi". Poco dopo, dovresti vedere gli Eth nel tuo conto di MetaMask!

#### Verifica il tuo saldo {#check-your-balance}

Per ricontrollare che ci sia il saldo, facciamo una richiesta [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) usando lo [strumento compositore di Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Questo restituirà l'importo di Eth nel tuo portafoglio. Dopo aver inserito l'indirizzo del tuo conto di MetaMask e aver cliccato “Invia richiesta”, dovresti vedere una risposta come questa:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**NOTA:** Questo risultato è in wei non in eth. Wei è usato come taglio più piccolo dell'ether. La conversione da wei a eth è: 1 eth = 10¹⁸ wei. Quindi se convertiamo 0xde0b6b3a7640000 in decimali, otteniamo 1\*10¹⁸, pari a 1 eth.

Meno male! I nostri soldi finti ci sono tutti! 🤑

### Fase 5: connetti MetaMask alla tua interfaccia utente {#step-5-connect-metamask-to-your-UI}

Ora che il nostro portafoglio di MetaMask è configurato, connettiamo la nostra dapp!

#### La funzione `connectWallet` {#the-connectWallet-function}

Nel nostro file `interact.js`, implementiamo la funzione `connectWallet`, che poi potremo chiamare nel nostro componente `HelloWorld.js`.

Modifichiamo `connectWallet` come segue:

```javascript
// interact.js

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Cosa fa esattamente questo enorme blocco di codice?

Innanzitutto, controlla se `window.ethereum` sia abilitato nel browser.

`window.ethereum` è un'API globale, iniettata da MetaMask e altri fornitori di portafogli, che consente ai siti web di richiedere i conti di Ethereum degli utenti. Se approvato, può leggere i dati dalle blockchain a cui l'utente è connesso e suggerire all'utente di firmare messaggi e transazioni. Dai un'occhiata alla [documentazione di MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) per ulteriori informazioni!

Se `window.ethereum` _non è_ presente, significa che MetaMask non è installato. Verrà quindi restituito un oggetto JSON in cui l'`address` restituito è una stringa vuota e l'oggetto JSX di `status` indica che l'utente deve installare MetaMask.

Ora, se `window.ethereum` _è_ presente, le cose cominciano a farsi interessanti.

Usando una struttura try/catch, proveremo a connetterci a MetaMask chiamando [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Chiamare questa funzione aprirà MetaMask nel browser, dove sarà richiesto all'utente di connettere il proprio portafoglio alla tua dapp.

- Se l'utente sceglie di connettersi, il `method: "eth_requestAccounts"` restituirà un array contenente gli indirizzi di tutti gli account dell'utente connessi alla dapp. Nel complesso, la nostra funzione `connectWallet` restituirà un oggetto JSON contenente il _primo_ `address` in questo array \(vedi la riga 9\) e un messaggio di `status` che richiede all'utente di scrivere un messaggio nello smart contract.
- Se l'utente rifiuta la connessione, allora l'oggetto JSON conterrà una stringa vuota per l'`address` restituito e un messaggio di `status` che indica che l'utente ha rifiutato la connessione.

Ora che abbiamo scritto questa funzione `connectWallet`, il passo successivo è chiamarla nel nostro componente `HelloWorld.js`.

#### Aggiungi la funzione `connectWallet` al componente dell'interfaccia utente `HelloWorld.js` {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

Vai alla funzione `connectWalletPressed` in `HelloWorld.js` e aggiornala come segue:

```javascript
/ HelloWorld.js

const c= async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Nota come gran parte della nostra funzionalità è esterna al nostro componente `HelloWorld.js` dal file `interact.js`? Questo perché stiamo seguendo il modello M-V-C!

In `connectWalletPressed`, creiamo semplicemente una chiamata d'attesa alla nostra funzione `connectWallet` importata e, usando la sua risposta, aggiorniamo le nostre variabili `status` e `walletAddress` tramite i loro hook di stato.

Ora salviamo entrambi i file \(`HelloWorld.js` e `interact.js`\) e testiamo la nostra interfaccia utente.

Apri il browser sulla pagina [http://localhost:3000/](http://localhost:3000/) e premi il pulsante "Connetti portafoglio" in alto a destra della pagina.

Se hai MetaMask installato, ti dovrebbe essere richiesto di connettere il tuo portafoglio alla tua dapp. Accetta l'invito a connetterti.

Dovresti vedere che il pulsante del portafoglio ora mostra che il tuo indirizzo è connesso! Sììììì 🔥

Prova quindi a ricaricare la pagina... questo è strano. Il nostro pulsante del portafoglio ci sta richiedendo di connetterci a MetaMask, anche se è già connesso...

Tuttavia, non temere! Possiamo facilmente risolvere questo problema implementando `getCurrentWalletConnected`, che verificherà se un indirizzo è già connesso alla nostra dapp e aggiornerà l'interfaccia utente di conseguenza!

#### La funzione `getCurrentWalletConnected` {#the-getcurrentwalletconnected-function}

Aggiorna la funzione `getCurrentWalletConnected` nel file `interact.js` come segue:

```javascript
// interact.js

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Questo codice è _molto_ simile alla funzione `connectWallet` che abbiamo appena scritto nella fase precedente.

La differenza principale è che, invece di chiamare il metodo `eth_requestAccounts`, che apre MetaMask perché l'utente connetta il proprio portafoglio, qui chiamiamo il metodo `eth_accounts` che, semplicemente, restituisce un insieme contenente gli indirizzi di MetaMask correntemente connessi alla nostra dapp.

Per vedere questa funzione in azione, chiamiamola nella funzione `useEffect` del nostro componente `HelloWorld.js`:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Nota che stiamo usando la risposta alla nostra chiamata a `getCurrentWalletConnected` per aggiornare le nostre variabili di stato `walletAddress` e `status`.

Ora che abbiamo aggiunto questo codice, proviamo ad aggiornare la finestra del browser.

Bellooooo! Il pulsante dovrebbe dire che sei connesso e mostrare un'anteprima dell'indirizzo del tuo portafoglio connesso, anche dopo un refresh!

#### Implementa `addWalletListener` {#implement-addwalletlistener}

Il passaggio finale della configurazione del portafoglio della nostra dapp è implementare l'ascoltatore del portafoglio, così che la nostra UI si aggiorni al cambiamento dello stato del nostro portafoglio, ad esempio, quando l'utente si disconnette o cambia conto.

Nel tuo file `HelloWorld.js`, modifica la tua funzione `addWalletListener` come segue:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download.html`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

Scommetto che a questo punto non hai bisogno del nostro aiuto per capire cosa succede qui, ma per completezza di informazioni, vediamo di analizzare velocemente la situazione:

- Per prima cosa, la nostra funzione verifica se `window.ethereum` è abilitata \(cioè se MetaMask è installato\).
  - Se non lo è, impostiamo semplicemente la nostra variabile di stato `status`a una stringa JSX che richiede all'utente di installare MetaMask.
  - Se è abilitato, configuriamo l'ascoltatore `window.ethereum.on("accountsChanged")` alla riga 3, affinché ascolti i cambiamenti di stato nel portafoglio di MetaMask, tra cui, quando l'utente connette un ulteriore conto alla dapp, cambia conto, o ne disconnette uno. Se è connesso almeno un conto, la variabile di stato `walletAddress` è aggiornata come primo conto nell'insieme `accounts`, restituito dall'ascoltatore. Altrimenti, `walletAddress` è impostato come una stringa vuota.

Infine ma non meno importante, dobbiamo chiamare la funzione `useEffect`:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

E questo è tutto! Abbiamo completato con successo la programmazione di tutte le funzionalità del nostro portafoglio! Passiamo ora all'ultimo compito: aggiornare il messaggio memorizzato nel contratto intelligente!

### Fase 6: implementa la funzione `updateMessage` {#step-6-implement-the-updateMessage-function}

Bene, siamo in dirittura d'arrivo! Nel `updateMessage` del tuo file `interact.js`, faremo quanto segue:

1. Assicurarci che il messaggio che vogliamo pubblicare nel nostro contratto intelligente sia valido
2. Firmare la transazione usando MetaMask
3. Chiamare questa funzione dal componente del frontend `HelloWorld.js`

Non ci vorrà molto; finiamo questa dapp!

#### Gestione degli errori d'input {#input-error-handling}

Naturalmente, è utile avere una certa gestione degli errori di input all'inizio della funzione.

Vorremo che la nostra funzione ci faccia sapere subito se non c'è un'estensione MetaMask installata, se non c'è un portafoglio connesso \(ossia `address` passato è una stringa vuota\) o se `message` è una stringa vuota. Aggiungiamo la seguente gestione degli errori a `updateMessage`:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }
}
```

Ora che la gestione degli errori d'input è gestita correttamente, è tempo di firmare la transazione con MetaMask!

#### Firmare la transazione {#signing-our-transaction}

Se ti senti già a tuo agio con le transazioni web3 di Ethereum tradizionali, il codice che scriveremo in seguito ti risulterà molto familiare. Sotto il tuo codice di gestione degli errori di input, aggiungi quanto segue a `updateMessage`:

```javascript
// interact.js

//set up transaction parameters
const transactionParameters = {
  to: contractAddress, // Required except during contract publications.
  from: address, // must match user's active address.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//sign the transaction
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    status: (
      <span>
        ✅{" "}
        <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
          View the status of your transaction on Etherscan!
        </a>
        <br />
        ℹ️ Once the transaction is verified by the network, the message will be
        updated automatically.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

Analizziamo cosa sta accadendo. Per prima cosa importiamo i parametri delle transazioni, dove:

- `to` specifica l'indirizzo del destinatario \(il nostro smart contract\)
- `from` specifica il firmatario della transazione, la variabile `address` che abbiamo passato nella nostra funzione
- `data` contiene la chiamata al metodo `update` del nostro contratto intelligente Hello World, ricevendo la nostra variabile stringa `message` come input

Creiamo quindi una chiamata d'attesa, `window.ethereum.request` in cui chiediamo a MetaMask di firmare la transazione. Nota che, alle righe 11 e 12, stiamo specificando il nostro metodo eth, `eth_sendTransaction`, e passando i nostri `transactionParameters`.

A questo punto, MetaMask si aprirà nel browser e richiederà all'utente di firmare o rifiutare la transazione.

- Se la transazione va a buon fine, la funzione restituirà un oggetto JSON in cui la stringa JSX `status` richiede all'utente di controllare Etherscan per ulteriori informazioni sulla sua transazione.
- Se la transazione non va a buon fine, la funzione restituirà un oggetto JSON in cui la stringa `status` trasmette il messaggio d'errore.

Complessivamente, la nostra funzione `updateMessage` dovrebbe avere questo aspetto:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }

  //set up transaction parameters
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //sign the transaction
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    }
  } catch (error) {
    return {
      status: "😥 " + error.message,
    }
  }
}
```

Infine, ma non meno importante, dobbiamo connettere la nostra funzione`updateMessage` al nostro componente `HelloWorld.js`.

#### Connetti `updateMessage`al frontend `HelloWorld.js` {#connect-updatemessage-to-the-helloworld-js-frontend}

La nostra funzione `onUpdatePressed` dovrebbe effettuare una chiamata d'attesa alla funzione `updateMessage` importata e modificare la variabile di stato `status` per riflettere se la transazione è andata o meno a buon fine:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

È super chiaro e semplice. E indovina un po'... LA TUA DAPP È COMPLETA!!!

Prosegui e pova il pulsante **Aggiorna**!

### Crea la tua dapp personalizzata {#make-your-own-custom-dapp}

Fantastico, sei arrivato alla fine del tutorial! Per ricapitolare, hai imparato a:

- Collegare un portafoglio di MetaMask al tuo progetto dapp
- Leggere dati da un contratto intelligente usando le API [Web3 di Alchemy](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Firmare le transazioni di Ethereum usando MetaMask

Ora hai tutti gli strumenti applicare le competenze apprese in questo tutorial per costruire il tuo progetto dapp! Come sempre, se hai domande, non esitare a contattarci per chiedere aiuto sul [Discord di Alchemy](https://discord.gg/gWuC7zB). 🧙‍♂️

Una volta completato questo tutorial, facci sapere come è stata la tua esperienza o se hai qualche feedback taggandoci su Twitter [@alchemyplatform](https://twitter.com/AlchemyPlatform)!
