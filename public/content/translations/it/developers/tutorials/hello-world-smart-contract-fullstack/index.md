---
title: Contratto intelligente Hello World per principianti - Fullstack
description: Tutorial introduttivo sulla scrittura e la distribuzione di un semplice contratto intelligente su Ethereum.
author: "nstrike2"
breadcrumb: Hello World fullstack
tags:
  [
    "Solidity",
    "Hardhat",
    "Alchemy",
    "contratti intelligenti",
    "distribuzione",
    "esploratore di blocchi",
    "frontend",
    "transazioni",
    "framework",
  ]
skill: beginner
lang: it
published: 2021-10-25
---

Questa guida fa per te se sei nuovo nello sviluppo su blockchain e non sai da dove iniziare o come distribuire e interagire con i contratti intelligenti. Ti guideremo attraverso la creazione e la distribuzione di un semplice contratto intelligente sulla rete di test di Goerli utilizzando [MetaMask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org) e [Alchemy](https://alchemy.com/eth).

Avrai bisogno di un account Alchemy per completare questo tutorial. [Registrati per un account gratuito](https://www.alchemy.com/).

Se hai domande in qualsiasi momento, non esitare a contattarci sul [Discord di Alchemy](https://discord.gg/gWuC7zB)!

## Parte 1 - Creare e distribuire il tuo contratto intelligente usando Hardhat {#part-1}

### Connettersi alla rete di Ethereum {#connect-to-the-ethereum-network}

Ci sono molti modi per effettuare richieste alla catena di Ethereum. Per semplicità, useremo un account gratuito su Alchemy, una piattaforma per sviluppatori blockchain e API che ci consente di comunicare con la catena di Ethereum senza eseguire un nodo noi stessi. Alchemy dispone anche di strumenti per sviluppatori per il monitoraggio e l'analisi; ne trarremo vantaggio in questo tutorial per capire cosa succede dietro le quinte nella distribuzione del nostro contratto intelligente.

### Creare la tua app e la chiave API {#create-your-app-and-api-key}

Una volta creato un account Alchemy, puoi generare una chiave API creando un'app. Questo ti consentirà di effettuare richieste alla rete di test di Goerli. Se non hai familiarità con le reti di test, puoi [leggere la guida di Alchemy sulla scelta di una rete](https://www.alchemy.com/docs/choosing-a-web3-network).

Nella dashboard di Alchemy, trova il menu a discesa **Apps** nella barra di navigazione e fai clic su **Create App**.

![Hello world create app](./hello-world-create-app.png)

Dai alla tua app il nome '_Hello World_' e scrivi una breve descrizione. Seleziona **Staging** come ambiente e **Goerli** come rete.

![create app view hello world](./create-app-view-hello-world.png)

_Nota: assicurati di selezionare **Goerli**, altrimenti questo tutorial non funzionerà._

Fai clic su **Create app**. La tua app apparirà nella tabella sottostante.

### Creare un account Ethereum {#create-an-ethereum-account}

Hai bisogno di un account Ethereum per inviare e ricevere transazioni. Useremo MetaMask, un portafoglio virtuale nel browser che consente agli utenti di gestire l'indirizzo del proprio account Ethereum.

Puoi scaricare e creare un account MetaMask gratuitamente [qui](https://metamask.io/download). Quando crei un account, o se ne hai già uno, assicurati di passare alla "Goerli Test Network" in alto a destra (in modo da non avere a che fare con denaro reale).

### Passaggio 4: Aggiungere ether da un rubinetto {#step-4-add-ether-from-a-faucet}

Per distribuire il tuo contratto intelligente sulla rete di test, avrai bisogno di alcuni ETH finti. Per ottenere ETH sulla rete Goerli, vai a un rubinetto Goerli e inserisci l'indirizzo del tuo account Goerli. Nota che i rubinetti Goerli possono essere un po' inaffidabili ultimamente - vedi la [pagina delle reti di test](/developers/docs/networks/#goerli) per un elenco di opzioni da provare:

_Nota: a causa della congestione della rete, questo potrebbe richiedere un po' di tempo._
``

### Passaggio 5: Controllare il tuo saldo {#step-5-check-your-balance}

Per ricontrollare che gli ETH siano nel tuo portafoglio, facciamo una richiesta [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) usando lo [strumento composer di Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Questo restituirà la quantità di ETH nel nostro portafoglio. Per saperne di più dai un'occhiata al [breve tutorial di Alchemy su come usare lo strumento composer](https://youtu.be/r6sjRxBZJuU).

Inserisci l'indirizzo del tuo account MetaMask e fai clic su **Send Request**. Vedrai una risposta simile al frammento di codice qui sotto.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _Nota: Questo risultato è in wei, non in ETH. Il wei è usato come la denominazione più piccola di ether._

Fiuu! I nostri soldi finti ci sono tutti.

### Passaggio 6: Inizializzare il nostro progetto {#step-6-initialize-our-project}

Per prima cosa, dovremo creare una cartella per il nostro progetto. Vai alla riga di comando e inserisci quanto segue.

```
mkdir hello-world
cd hello-world
```

Ora che siamo all'interno della cartella del nostro progetto, useremo `npm init` per inizializzare il progetto.

> Se non hai ancora installato npm, segui [queste istruzioni per installare Node.js e npm](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm).

Ai fini di questo tutorial, non importa come rispondi alle domande di inizializzazione. Ecco come abbiamo fatto noi come riferimento:

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

Approva il package.json e siamo pronti a partire!

### Passaggio 7: Scaricare Hardhat {#step-7-download-hardhat}

Hardhat è un ambiente di sviluppo per compilare, distribuire, testare ed eseguire il debug del tuo software Ethereum. Aiuta gli sviluppatori nella creazione di contratti intelligenti e dApp localmente prima di distribuirli sulla catena live.

All'interno del nostro progetto `hello-world` esegui:

```
npm install --save-dev hardhat
```

Dai un'occhiata a questa pagina per maggiori dettagli sulle [istruzioni di installazione](https://hardhat.org/getting-started/#overview).

### Passaggio 8: Creare il progetto Hardhat {#step-8-create-hardhat-project}

All'interno della cartella del nostro progetto `hello-world`, esegui:

```
npx hardhat
```

Dovresti quindi vedere un messaggio di benvenuto e l'opzione per selezionare cosa vuoi fare. Seleziona "create an empty hardhat.config.js":

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

Questo genererà un file `hardhat.config.js` nel progetto. Lo useremo più avanti nel tutorial per specificare la configurazione del nostro progetto.

### Passaggio 9: Aggiungere le cartelle del progetto {#step-9-add-project-folders}

Per mantenere il progetto organizzato, creiamo due nuove cartelle. Nella riga di comando, vai alla directory principale del tuo progetto `hello-world` e digita:

```
mkdir contracts
mkdir scripts
```

- `contracts/` è dove conserveremo il file di codice del nostro contratto intelligente hello world
- `scripts/` è dove conserveremo gli script per distribuire e interagire con il nostro contratto

### Passaggio 10: Scrivere il nostro contratto {#step-10-write-our-contract}

Potresti chiederti: quando scriveremo il codice? È arrivato il momento!

Apri il progetto hello-world nel tuo editor preferito. I contratti intelligenti sono scritti più comunemente in Solidity, che useremo per scrivere il nostro contratto intelligente.‌

1. Vai alla cartella `contracts` e crea un nuovo file chiamato `HelloWorld.sol`
2. Di seguito è riportato un contratto intelligente Hello World di esempio che useremo per questo tutorial. Copia i contenuti sottostanti nel file `HelloWorld.sol`.

_Nota: Assicurati di leggere i commenti per capire cosa fa questo contratto._

```
// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
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

Questo è un contratto intelligente di base che memorizza un messaggio al momento della creazione. Può essere aggiornato chiamando la funzione `update`.

### Passaggio 11: Connettere MetaMask e Alchemy al tuo progetto {#step-11-connect-metamask-alchemy-to-your-project}

Abbiamo creato un portafoglio MetaMask, un account Alchemy e scritto il nostro contratto intelligente, ora è il momento di connettere i tre.

Ogni transazione inviata dal tuo portafoglio richiede una firma utilizzando la tua chiave privata univoca. Per fornire al nostro programma questa autorizzazione, possiamo archiviare in modo sicuro la nostra chiave privata in un file di ambiente. Qui memorizzeremo anche una chiave API per Alchemy.

> Per saperne di più sull'invio di transazioni, dai un'occhiata a [questo tutorial](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project) sull'invio di transazioni usando web3.

Per prima cosa, installa il pacchetto dotenv nella directory del tuo progetto:

```
npm install dotenv --save
```

Quindi, crea un file `.env` nella directory principale del progetto. Aggiungi la tua chiave privata MetaMask e l'URL dell'API HTTP di Alchemy.

Il tuo file di ambiente deve essere chiamato `.env` o non verrà riconosciuto come file di ambiente.

Non chiamarlo `process.env` o `.env-custom` o in qualsiasi altro modo.

- Segui [queste istruzioni](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) per esportare la tua chiave privata
- Vedi sotto per ottenere l'URL dell'API HTTP di Alchemy

![Animated walkthrough of getting an Alchemy API key](./get-alchemy-api-key.gif)

Il tuo `.env` dovrebbe apparire così:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Per connetterli effettivamente al nostro codice, faremo riferimento a queste variabili nel nostro file `hardhat.config.js` al passaggio 13.

### Passaggio 12: Installare Ethers.js {#step-12-install-ethersjs}

Ethers.js è una libreria che semplifica l'interazione e l'effettuazione di richieste a Ethereum avvolgendo i [metodi JSON-RPC standard](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) con metodi più intuitivi per l'utente.

Hardhat ci consente di integrare [plugin](https://hardhat.org/plugins/) per strumenti aggiuntivi e funzionalità estese. Sfrutteremo il [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) per la distribuzione del contratto.

Nella directory del tuo progetto digita:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### Passaggio 13: Aggiornare hardhat.config.js {#step-13-update-hardhat-configjs}

Finora abbiamo aggiunto diverse dipendenze e plugin, ora dobbiamo aggiornare `hardhat.config.js` in modo che il nostro progetto li conosca tutti.

Aggiorna il tuo `hardhat.config.js` in modo che appaia così:

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

### Passaggio 14: Compilare il nostro contratto {#step-14-compile-our-contract}

Per assicurarci che tutto funzioni finora, compiliamo il nostro contratto. L'attività `compile` è una delle attività integrate di hardhat.

Dalla riga di comando esegui:

```bash
npx hardhat compile
```

Potresti ricevere un avviso su `SPDX license identifier not provided in source file`, ma non c'è bisogno di preoccuparsi di questo — si spera che tutto il resto sembri a posto! In caso contrario, puoi sempre inviare un messaggio nel [discord di Alchemy](https://discord.gg/u72VCg3).

### Passaggio 15: Scrivere il nostro script di distribuzione {#step-15-write-our-deploy-script}

Ora che il nostro contratto è stato scritto e il nostro file di configurazione è pronto, è il momento di scrivere il nostro script di distribuzione del contratto.

Vai alla cartella `scripts/` e crea un nuovo file chiamato `deploy.js`, aggiungendovi i seguenti contenuti:

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // Avvia il deployment, restituendo una promise che si risolve in un oggetto contratto
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

Hardhat fa un lavoro straordinario nello spiegare cosa fa ciascuna di queste righe di codice nel loro [tutorial sui Contratti](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), abbiamo adottato le loro spiegazioni qui.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

Una `ContractFactory` in ethers.js è un'astrazione utilizzata per distribuire nuovi contratti intelligenti, quindi `HelloWorld` qui è una [fabbrica](<https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)>) per le istanze del nostro contratto hello world. Quando si utilizza il plugin `hardhat-ethers`, le istanze `ContractFactory` e `Contract` sono connesse al primo firmatario (proprietario) per impostazione predefinita.

```javascript
const hello_world = await HelloWorld.deploy()
```

Chiamare `deploy()` su una `ContractFactory` avvierà la distribuzione e restituirà una `Promise` che si risolve in un oggetto `Contract`. Questo è l'oggetto che ha un metodo per ciascuna delle funzioni del nostro contratto intelligente.

### Passaggio 16: Distribuire il nostro contratto {#step-16-deploy-our-contract}

Siamo finalmente pronti per distribuire il nostro contratto intelligente! Vai alla riga di comando ed esegui:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

Dovresti quindi vedere qualcosa di simile a:

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**Per favore, salva questo indirizzo**. Lo useremo più avanti nel tutorial.

Se andiamo su [Goerli etherscan](https://goerli.etherscan.io) e cerchiamo l'indirizzo del nostro contratto, dovremmo essere in grado di vedere che è stato distribuito con successo. La transazione apparirà in questo modo:

![](./etherscan-contract.png)

L'indirizzo `From` dovrebbe corrispondere all'indirizzo del tuo account MetaMask e l'indirizzo `To` indicherà **Contract Creation**. Se facciamo clic sulla transazione, vedremo l'indirizzo del nostro contratto nel campo `To`.

![](./etherscan-transaction.png)

Congratulazioni! Hai appena distribuito un contratto intelligente su una rete di test di Ethereum.

Per capire cosa succede dietro le quinte, andiamo alla scheda Explorer nella nostra [dashboard di Alchemy](https://dashboard.alchemy.com/explorer). Se hai più app Alchemy, assicurati di filtrare per app e seleziona **Hello World**.

![](./hello-world-explorer.png)

Qui vedrai una manciata di metodi JSON-RPC che Hardhat/Ethers ha creato dietro le quinte per noi quando abbiamo chiamato la funzione `.deploy()`. Due metodi importanti qui sono [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), che è la richiesta di scrivere il nostro contratto sulla catena Goerli, e [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash), che è una richiesta per leggere informazioni sulla nostra transazione dato l'hash. Per saperne di più sull'invio di transazioni, dai un'occhiata al [nostro tutorial sull'invio di transazioni usando Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

## Parte 2: Interagire con il tuo contratto intelligente {#part-2-interact-with-your-smart-contract}

Ora che abbiamo distribuito con successo un contratto intelligente sulla rete Goerli, impariamo come interagirvi.

### Creare un file interact.js {#create-a-interactjs-file}

Questo è il file in cui scriveremo il nostro script di interazione. Utilizzeremo la libreria Ethers.js che hai installato in precedenza nella Parte 1.

All'interno della cartella `scripts/`, crea un nuovo file chiamato `interact.js` e aggiungi il seguente codice:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### Aggiornare il file .env {#update-your-env-file}

Utilizzeremo nuove variabili d'ambiente, quindi dobbiamo definirle nel file `.env` che [abbiamo creato in precedenza](#step-11-connect-metamask-&-alchemy-to-your-project).

Dovremo aggiungere una definizione per la nostra `API_KEY` di Alchemy e il `CONTRACT_ADDRESS` in cui è stato distribuito il tuo contratto intelligente.

Il tuo file `.env` dovrebbe avere un aspetto simile a questo:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### Ottenere l'ABI del contratto {#grab-your-contract-ABI}

L'[ABI (Application Binary Interface)](/glossary/#abi) del nostro contratto è l'interfaccia per interagire con il nostro contratto intelligente. Hardhat genera automaticamente un'ABI e la salva in `HelloWorld.json`. Per utilizzare l'ABI, dovremo analizzarne i contenuti aggiungendo le seguenti righe di codice al nostro file `interact.js`:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

Se vuoi vedere l'ABI puoi stamparla nella tua console:

```javascript
console.log(JSON.stringify(contract.abi))
```

Per vedere la tua ABI stampata nella console, vai al tuo terminale ed esegui:

```bash
npx hardhat run scripts/interact.js
```

### Creare un'istanza del tuo contratto {#create-an-instance-of-your-contract}

Per interagire con il nostro contratto, dobbiamo creare un'istanza del contratto nel nostro codice. Per farlo con Ethers.js, dovremo lavorare con tre concetti:

1. Provider: un provider di nodi che ti dà accesso in lettura e scrittura alla blockchain
2. Signer: rappresenta un account di Ethereum che può firmare transazioni
3. Contract: un oggetto Ethers.js che rappresenta un contratto specifico distribuito on-chain

Utilizzeremo l'ABI del contratto del passaggio precedente per creare la nostra istanza del contratto:

```javascript
// interact.js

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Contratto
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

Scopri di più su Provider, Signer e Contract nella [documentazione di ethers.js](https://docs.ethers.io/v5/).

### Leggere il messaggio di inizializzazione {#read-the-init-message}

Ricordi quando abbiamo distribuito il nostro contratto con `initMessage = "Hello world!"`? Ora leggeremo quel messaggio memorizzato nel nostro contratto intelligente e lo stamperemo nella console.

In JavaScript, le funzioni asincrone vengono utilizzate quando si interagisce con le reti. Per saperne di più sulle funzioni asincrone, [leggi questo articolo su Medium](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

Usa il codice sottostante per chiamare la funzione `message` nel nostro contratto intelligente e leggere il messaggio di inizializzazione:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```

Dopo aver eseguito il file usando `npx hardhat run scripts/interact.js` nel terminale, dovremmo vedere questa risposta:

```
The message is: Hello world!
```

Congratulazioni! Hai appena letto con successo i dati del contratto intelligente dalla blockchain di Ethereum, ottimo lavoro!

### Aggiornare il messaggio {#update-the-message}

Invece di leggere semplicemente il messaggio, possiamo anche aggiornare il messaggio salvato nel nostro contratto intelligente usando la funzione `update`! Fantastico, vero?

Per aggiornare il messaggio, possiamo chiamare direttamente la funzione `update` sul nostro oggetto Contract istanziato:

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

Nota che alla riga 11, effettuiamo una chiamata a `.wait()` sull'oggetto della transazione restituito. Questo assicura che il nostro script attenda che la transazione venga minata sulla blockchain prima di uscire dalla funzione. Se la chiamata `.wait()` non è inclusa, lo script potrebbe non vedere il valore `message` aggiornato nel contratto.

### Leggere il nuovo messaggio {#read-the-new-message}

Dovresti essere in grado di ripetere il [passaggio precedente](#read-the-init-message) per leggere il valore `message` aggiornato. Prenditi un momento e vedi se riesci ad apportare le modifiche necessarie per stampare quel nuovo valore!

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

// signer - tu
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// istanza del contratto
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

Ora esegui semplicemente lo script e dovresti essere in grado di vedere il vecchio messaggio, lo stato di aggiornamento e il nuovo messaggio stampati nel tuo terminale!

`npx hardhat run scripts/interact.js --network goerli`

```
The message is: Hello World!
Updating the message...
The new message is: This is the new message.
```

Durante l'esecuzione di quello script, potresti notare che il passaggio `Updating the message...` impiega un po' di tempo a caricarsi prima che venga caricato il nuovo messaggio. Ciò è dovuto al processo di mining; se sei curioso di tracciare le transazioni mentre vengono minate, visita la [mempool di Alchemy](https://dashboard.alchemyapi.io/mempool) per vedere lo stato di una transazione. Se la transazione viene scartata, è anche utile controllare [Goerli Etherscan](https://goerli.etherscan.io) e cercare l'hash della tua transazione.

## Parte 3: Pubblicare il tuo contratto intelligente su Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

Hai fatto tutto il duro lavoro per dare vita al tuo contratto intelligente; ora è il momento di condividerlo con il mondo!

Verificando il tuo contratto intelligente su Etherscan, chiunque può visualizzare il tuo codice sorgente e interagire con il tuo contratto intelligente. Iniziamo!

### Passaggio 1: Generare una chiave API sul tuo account Etherscan {#step-1-generate-an-api-key-on-your-etherscan-account}

Una chiave API di Etherscan è necessaria per verificare che tu possieda il contratto intelligente che stai cercando di pubblicare.

Se non hai già un account Etherscan, [registrati per un account](https://etherscan.io/register).

Una volta effettuato l'accesso, trova il tuo nome utente nella barra di navigazione, passaci sopra con il mouse e seleziona il pulsante **My profile**.

Nella pagina del tuo profilo, dovresti vedere una barra di navigazione laterale. Dalla barra di navigazione laterale, seleziona **API Keys**. Successivamente, premi il pulsante "Add" per creare una nuova chiave API, dai alla tua app il nome **hello-world** e premi il pulsante **Create New API Key**.

La tua nuova chiave API dovrebbe apparire nella tabella delle chiavi API. Copia la chiave API negli appunti.

Successivamente, dobbiamo aggiungere la chiave API di Etherscan al nostro file `.env`.

Dopo averla aggiunta, il tuo file `.env` dovrebbe apparire così:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Contratti intelligenti distribuiti con Hardhat {#hardhat-deployed-smart-contracts}

#### Installare hardhat-etherscan {#install-hardhat-etherscan}

Pubblicare il tuo contratto su Etherscan usando Hardhat è semplice. Per iniziare, dovrai prima installare il plugin `hardhat-etherscan`. `hardhat-etherscan` verificherà automaticamente il codice sorgente e l'ABI del contratto intelligente su Etherscan. Per aggiungerlo, nella directory `hello-world` esegui:

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
    // La tua chiave API per Etherscan
    // Ottienine una su https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Verificare il tuo contratto intelligente su Etherscan {#verify-your-smart-contract-on-etherscan}

Assicurati che tutti i file siano salvati e che tutte le variabili `.env` siano configurate correttamente.

Esegui l'attività `verify`, passando l'indirizzo del contratto e la rete in cui è distribuito:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

Assicurati che `DEPLOYED_CONTRACT_ADDRESS` sia l'indirizzo del tuo contratto intelligente distribuito sulla rete di test di Goerli. Inoltre, l'argomento finale (`'Hello World!'`) deve essere lo stesso valore stringa utilizzato [durante il passaggio di distribuzione nella parte 1](#write-our-deploy-script).

Se tutto va bene, vedrai il seguente messaggio nel tuo terminale:

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

Congratulazioni! Il codice del tuo contratto intelligente è su Etherscan!

### Dai un'occhiata al tuo contratto intelligente su Etherscan! {#check-out-your-smart-contract-on-etherscan}

Quando navighi al link fornito nel tuo terminale, dovresti essere in grado di vedere il codice del tuo contratto intelligente e l'ABI pubblicati su Etherscan!

**Evviva - ce l'hai fatta campione! Ora chiunque può chiamare o scrivere sul tuo contratto intelligente! Non vediamo l'ora di vedere cosa costruirai in futuro!**

## Parte 4 - Integrare il tuo contratto intelligente con il frontend {#part-4-integrating-your-smart-contract-with-the-frontend}

Alla fine di questo tutorial, saprai come:

- Connettere un portafoglio MetaMask alla tua dApp
- Leggere i dati dal tuo contratto intelligente usando l'API di [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Firmare le transazioni di Ethereum usando MetaMask

Per questa dApp, useremo [React](https://react.dev/) come nostro framework di frontend; tuttavia, è importante notare che non dedicheremo molto tempo ad analizzarne i fondamenti, poiché ci concentreremo principalmente sull'integrazione delle funzionalità Web3 nel nostro progetto.

Come prerequisito, dovresti avere una comprensione di livello base di React. In caso contrario, ti consigliamo di completare il [tutorial ufficiale di introduzione a React](https://react.dev/learn).

### Clonare i file di partenza {#clone-the-starter-files}

Per prima cosa, vai al [repository GitHub hello-world-part-four](https://github.com/alchemyplatform/hello-world-part-four-tutorial) per ottenere i file di partenza per questo progetto e clona questo repository sulla tua macchina locale.

Apri il repository clonato localmente. Nota che contiene due cartelle: `starter-files` e `completed`.

- `starter-files` - **lavoreremo in questa directory**, connetteremo l'interfaccia utente al tuo portafoglio Ethereum e al contratto intelligente che abbiamo pubblicato su Etherscan nella [Parte 3](#part-3).
- `completed` contiene l'intero tutorial completato e dovrebbe essere usato solo come riferimento se rimani bloccato.

Successivamente, apri la tua copia di `starter-files` nel tuo editor di codice preferito, e poi naviga nella cartella `src`.

Tutto il codice che scriveremo risiederà nella cartella `src`. Modificheremo il componente `HelloWorld.js` e i file JavaScript `util/interact.js` per dare al nostro progetto funzionalità Web3.

### Dai un'occhiata ai file di partenza {#check-out-the-starter-files}

Prima di iniziare a programmare, esploriamo cosa ci viene fornito nei file di partenza.

#### Avviare il tuo progetto React {#get-your-react-project-running}

Iniziamo eseguendo il progetto React nel nostro browser. Il bello di React è che una volta che abbiamo il nostro progetto in esecuzione nel browser, qualsiasi modifica salvata verrà aggiornata in tempo reale nel browser.

Per avviare il progetto, naviga nella directory principale della cartella `starter-files` ed esegui `npm install` nel tuo terminale per installare le dipendenze del progetto:

```bash
cd starter-files
npm install
```

Una volta terminata l'installazione, esegui `npm start` nel tuo terminale:

```bash
npm start
```

Così facendo dovrebbe aprirsi [http://localhost:3000/](http://localhost:3000/) nel tuo browser, dove vedrai il frontend del nostro progetto. Dovrebbe consistere in un campo \(un posto per aggiornare il messaggio memorizzato nel tuo contratto intelligente\), un pulsante "Connect Wallet" e un pulsante "Update".

Se provi a cliccare su uno dei due pulsanti, noterai che non funzionano: questo perché dobbiamo ancora programmare la loro funzionalità.

#### Il componente `HelloWorld.js` {#the-helloworld-js-component}

Torniamo nella cartella `src` nel nostro editor e apriamo il file `HelloWorld.js`. È importantissimo comprendere tutto ciò che si trova in questo file, poiché è il componente React principale su cui lavoreremo.

All'inizio di questo file, noterai che abbiamo diverse istruzioni di importazione necessarie per far funzionare il nostro progetto, tra cui la libreria React, gli hook useEffect e useState, alcuni elementi da `./util/interact.js` (li descriveremo più in dettaglio a breve!) e il logo di Alchemy.

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

// Variabili di stato
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("No connection to the network.")
const [newMessage, setNewMessage] = useState("")
```

Ecco cosa rappresenta ciascuna delle variabili:

- `walletAddress` - una stringa che memorizza l'indirizzo del portafoglio dell'utente
- `status` - una stringa che memorizza un messaggio utile che guida l'utente su come interagire con la dApp
- `message` - una stringa che memorizza il messaggio attuale nel contratto intelligente
- `newMessage` - una stringa che memorizza il nuovo messaggio che verrà scritto nel contratto intelligente

Dopo le variabili di stato, vedrai cinque funzioni non implementate: `useEffect`, `addSmartContractListener`, `addWalletListener`, `connectWalletPressed` e `onUpdatePressed`. Spiegheremo cosa fanno di seguito:

```javascript
// HelloWorld.js

// chiamato solo una volta
useEffect(async () => {
  // TODO: implementare
}, [])

function addSmartContractListener() {
  // TODO: implementare
}

function addWalletListener() {
  // TODO: implementare
}

const connectWalletPressed = async () => {
  // TODO: implementare
}

const onUpdatePressed = async () => {
  // TODO: implementare
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - questo è un hook di React che viene chiamato dopo il rendering del tuo componente. Poiché gli viene passata una prop array vuota `[]` \(vedi riga 4\), verrà chiamato solo al _primo_ rendering del componente. Qui caricheremo il messaggio attuale memorizzato nel nostro contratto intelligente, chiameremo i listener del nostro contratto intelligente e del portafoglio, e aggiorneremo la nostra interfaccia utente per riflettere se un portafoglio è già connesso.
- `addSmartContractListener` - questa funzione imposta un listener che osserverà l'evento `UpdatedMessages` del nostro contratto HelloWorld e aggiornerà la nostra interfaccia utente quando il messaggio viene modificato nel nostro contratto intelligente.
- `addWalletListener` - questa funzione imposta un listener che rileva i cambiamenti nello stato del portafoglio MetaMask dell'utente, come quando l'utente disconnette il proprio portafoglio o cambia indirizzo.
- `connectWalletPressed` - questa funzione verrà chiamata per connettere il portafoglio MetaMask dell'utente alla nostra dApp.
- `onUpdatePressed` - questa funzione verrà chiamata quando l'utente desidera aggiornare il messaggio memorizzato nel contratto intelligente.

Verso la fine di questo file, abbiamo l'interfaccia utente del nostro componente.

```javascript
// HelloWorld.js

// l'interfaccia utente del nostro componente
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

Se esamini attentamente questo codice, noterai dove usiamo le nostre varie variabili di stato nella nostra interfaccia utente:

- Alle righe 6-12, se il portafoglio dell'utente è connesso \(cioè, `walletAddress.length > 0`\), mostriamo una versione troncata del `walletAddress` dell'utente nel pulsante con ID "walletButton"; altrimenti dice semplicemente "Connect Wallet".
- Alla riga 17, mostriamo il messaggio attuale memorizzato nel contratto intelligente, che è catturato nella stringa `message`.
- Alle righe 23-26, usiamo un [componente controllato](https://legacy.reactjs.org/docs/forms.html#controlled-components) per aggiornare la nostra variabile di stato `newMessage` quando l'input nel campo di testo cambia.

Oltre alle nostre variabili di stato, vedrai anche che le funzioni `connectWalletPressed` e `onUpdatePressed` vengono chiamate quando si clicca rispettivamente sui pulsanti con ID `publishButton` e `walletButton`.

Infine, vediamo dove viene aggiunto questo componente `HelloWorld.js`.

Se vai al file `App.js`, che è il componente principale in React che funge da contenitore per tutti gli altri componenti, vedrai che il nostro componente `HelloWorld.js` è iniettato alla riga 7.

Ultimo ma non meno importante, diamo un'occhiata a un altro file fornito per te, il file `interact.js`.

#### Il file `interact.js` {#the-interact-js-file}

Poiché vogliamo attenerci al paradigma [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), vorremo un file separato che contenga tutte le nostre funzioni per gestire la logica, i dati e le regole della nostra dApp, per poi poter esportare quelle funzioni nel nostro frontend \(il nostro componente `HelloWorld.js`\).

👆🏽Questo è l'esatto scopo del nostro file `interact.js`!

Naviga nella cartella `util` nella tua directory `src`, e noterai che abbiamo incluso un file chiamato `interact.js` che conterrà tutte le nostre funzioni e variabili di interazione con il contratto intelligente e il portafoglio.

```javascript
// interact.js

// export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

Noterai all'inizio del file che abbiamo commentato l'oggetto `helloWorldContract`. Più avanti in questo tutorial, decommenteremo questo oggetto e istanzieremo il nostro contratto intelligente in questa variabile, che poi esporteremo nel nostro componente `HelloWorld.js`.

Le quattro funzioni non implementate dopo il nostro oggetto `helloWorldContract` fanno quanto segue:

- `loadCurrentMessage` - questa funzione gestisce la logica di caricamento del messaggio attuale memorizzato nel contratto intelligente. Effettuerà una chiamata di _lettura_ al contratto intelligente Hello World usando l'[API di Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).
- `connectWallet` - questa funzione connetterà il MetaMask dell'utente alla nostra dApp.
- `getCurrentWalletConnected` - questa funzione controllerà se un account Ethereum è già connesso alla nostra dApp al caricamento della pagina e aggiornerà la nostra interfaccia utente di conseguenza.
- `updateMessage` - questa funzione aggiornerà il messaggio memorizzato nel contratto intelligente. Effettuerà una chiamata di _scrittura_ al contratto intelligente Hello World, quindi il portafoglio MetaMask dell'utente dovrà firmare una transazione di Ethereum per aggiornare il messaggio.

Ora che abbiamo capito con cosa stiamo lavorando, scopriamo come leggere dal nostro contratto intelligente!

### Passaggio 3: Leggere dal tuo contratto intelligente {#step-3-read-from-your-smart-contract}

Per leggere dal tuo contratto intelligente, dovrai configurare con successo:

- Una connessione API alla catena di Ethereum
- Un'istanza caricata del tuo contratto intelligente
- Una funzione per chiamare la funzione del tuo contratto intelligente
- Un listener per osservare gli aggiornamenti quando i dati che stai leggendo dal contratto intelligente cambiano

Potrebbero sembrare molti passaggi, ma non preoccuparti! Ti guideremo su come eseguire ciascuno di essi passo dopo passo! :\)

#### Stabilire una connessione API alla catena di Ethereum {#establish-an-api-connection-to-the-ethereum-chain}

Ricordi come nella Parte 2 di questo tutorial, abbiamo usato la nostra [chiave di Alchemy Web3 per leggere dal nostro contratto intelligente](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library)? Avrai anche bisogno di una chiave di Alchemy Web3 nella tua dApp per leggere dalla catena.

Se non ce l'hai già, installa prima [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) navigando nella directory principale dei tuoi `starter-files` ed eseguendo quanto segue nel tuo terminale:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) è un wrapper attorno a [Web3.js](https://docs.web3js.org/), che fornisce metodi API migliorati e altri vantaggi cruciali per semplificarti la vita come sviluppatore web3. È progettato per richiedere una configurazione minima in modo da poter iniziare a usarlo subito nella tua app!

Quindi, installa il pacchetto [dotenv](https://www.npmjs.com/package/dotenv) nella directory del tuo progetto, in modo da avere un posto sicuro dove memorizzare la nostra chiave API dopo averla recuperata.

```text
npm install dotenv --save
```

Per la nostra dApp, **useremo la nostra chiave API Websockets** invece della nostra chiave API HTTP, poiché ci permetterà di impostare un listener che rileva quando il messaggio memorizzato nel contratto intelligente cambia.

Una volta che hai la tua chiave API, crea un file `.env` nella tua directory principale e aggiungi ad esso il tuo URL Websockets di Alchemy. Successivamente, il tuo file `.env` dovrebbe apparire così:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

Ora, siamo pronti per configurare il nostro endpoint di Alchemy Web3 nella nostra dApp! Torniamo al nostro `interact.js`, che è annidato all'interno della nostra cartella `util` e aggiungiamo il seguente codice all'inizio del file:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

// export const helloWorldContract;
```

Sopra, abbiamo prima importato la chiave di Alchemy dal nostro file `.env` e poi passato la nostra `alchemyKey` a `createAlchemyWeb3` per stabilire il nostro endpoint di Alchemy Web3.

Con questo endpoint pronto, è il momento di caricare il nostro contratto intelligente!

#### Caricare il tuo contratto intelligente Hello World {#loading-your-hello-world-smart-contract}

Per caricare il tuo contratto intelligente Hello World, avrai bisogno del suo indirizzo del contratto e dell'ABI, entrambi i quali possono essere trovati su Etherscan se hai completato la [Parte 3 di questo tutorial.](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)

#### Come ottenere l'ABI del tuo contratto da Etherscan {#how-to-get-your-contract-abi-from-etherscan}

Se hai saltato la Parte 3 di questo tutorial, puoi usare il contratto HelloWorld con indirizzo [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code). La sua ABI può essere trovata [qui](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).

Un'ABI del contratto è necessaria per specificare quale funzione invocherà un contratto, oltre a garantire che la funzione restituirà i dati nel formato che ti aspetti. Una volta copiata l'ABI del nostro contratto, salviamola come file JSON chiamato `contract-abi.json` nella tua directory `src`.

Il tuo contract-abi.json dovrebbe essere memorizzato nella tua cartella src.

Armati del nostro indirizzo del contratto, dell'ABI e dell'endpoint di Alchemy Web3, possiamo usare il [metodo contract](https://docs.web3js.org/api/web3-eth-contract/class/Contract) per caricare un'istanza del nostro contratto intelligente. Importa l'ABI del tuo contratto nel file `interact.js` e aggiungi l'indirizzo del tuo contratto.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

Ora possiamo finalmente decommentare la nostra variabile `helloWorldContract` e caricare il contratto intelligente usando il nostro endpoint di AlchemyWeb3:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Per riassumere, le prime 12 righe del tuo `interact.js` dovrebbero ora apparire così:

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

Ora che abbiamo caricato il nostro contratto, possiamo implementare la nostra funzione `loadCurrentMessage`!

#### Implementare `loadCurrentMessage` nel tuo file `interact.js` {#implementing-loadCurrentMessage-in-your-interact-js-file}

Questa funzione è semplicissima. Faremo una semplice chiamata web3 asincrona per leggere dal nostro contratto. La nostra funzione restituirà il messaggio memorizzato nel contratto intelligente:

Aggiorna `loadCurrentMessage` nel tuo file `interact.js` con quanto segue:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

Poiché vogliamo mostrare questo contratto intelligente nella nostra interfaccia utente, aggiorniamo la funzione `useEffect` nel nostro componente `HelloWorld.js` con quanto segue:

```javascript
// HelloWorld.js

// chiamato solo una volta
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

Nota, vogliamo che il nostro `loadCurrentMessage` venga chiamato solo una volta durante il primo rendering del componente. Presto implementeremo `addSmartContractListener` per aggiornare automaticamente l'interfaccia utente dopo che il messaggio nel contratto intelligente cambia.

Prima di immergerci nel nostro listener, diamo un'occhiata a ciò che abbiamo finora! Salva i tuoi file `HelloWorld.js` e `interact.js`, e poi vai su [http://localhost:3000/](http://localhost:3000/)

Noterai che il messaggio attuale non dice più "No connection to the network." Invece riflette il messaggio memorizzato nel contratto intelligente. Fantastico!

#### La tua interfaccia utente dovrebbe ora riflettere il messaggio memorizzato nel contratto intelligente {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

Ora, a proposito di quel listener...

#### Implementare `addSmartContractListener` {#implement-addsmartcontractlistener}

Se ripensi al file `HelloWorld.sol` che abbiamo scritto nella [Parte 1 di questa serie di tutorial](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract), ricorderai che c'è un evento del contratto intelligente chiamato `UpdatedMessages` che viene emesso dopo che la funzione `update` del nostro contratto intelligente viene invocata \(vedi righe 9 e 27\):

```javascript
// HelloWorld.sol

// Specifica la versione di Solidity, usando il versionamento semantico.
// Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// Definisce un contratto chiamato `HelloWorld`.
// Un contratto è una raccolta di funzioni e dati (il suo stato). Una volta distribuito, un contratto risiede a un indirizzo specifico sulla blockchain di Ethereum. Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Emesso quando viene chiamata la funzione di aggiornamento
   // Gli eventi degli smart contract sono un modo per il tuo contratto di comunicare che qualcosa è successo sulla blockchain al front-end della tua app, che può essere in 'ascolto' di determinati eventi e agire quando si verificano.
   event UpdatedMessages(string oldStr, string newStr);

   // Dichiara una variabile di stato `message` di tipo `string`.
   // Le variabili di stato sono variabili i cui valori sono memorizzati in modo permanente nell'archiviazione del contratto. La parola chiave `public` rende le variabili accessibili dall'esterno di un contratto e crea una funzione che altri contratti o client possono chiamare per accedere al valore.
   string public message;

   // Simile a molti linguaggi orientati agli oggetti basati su classi, un costruttore è una funzione speciale che viene eseguita solo alla creazione del contratto.
   // I costruttori sono usati per inizializzare i dati del contratto. Scopri di più:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accetta un argomento stringa `initMessage` e imposta il valore nella variabile di archiviazione `message` del contratto).
      message = initMessage;
   }

   // Una funzione pubblica che accetta un argomento stringa e aggiorna la variabile di archiviazione `message`.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Gli eventi del contratto intelligente sono un modo per il tuo contratto di comunicare che qualcosa è successo \(cioè, c'è stato un _evento_\) sulla blockchain alla tua applicazione front-end, che può essere in 'ascolto' di eventi specifici e agire quando si verificano.

La funzione `addSmartContractListener` ascolterà specificamente l'evento `UpdatedMessages` del nostro contratto intelligente Hello World e aggiornerà la nostra interfaccia utente per mostrare il nuovo messaggio.

Modifica `addSmartContractListener` con quanto segue:

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

- Se si verifica un errore quando l'evento viene emesso, si rifletterà nell'interfaccia utente tramite la nostra variabile di stato `status`.
- Altrimenti, useremo l'oggetto `data` restituito. `data.returnValues` è un array indicizzato a zero in cui il primo elemento nell'array memorizza il messaggio precedente e il secondo elemento memorizza quello aggiornato. Nel complesso, in caso di evento riuscito imposteremo la nostra stringa `message` al messaggio aggiornato, cancelleremo la stringa `newMessage` e aggiorneremo la nostra variabile di stato `status` per riflettere che un nuovo messaggio è stato pubblicato sul nostro contratto intelligente.

Infine, chiamiamo il nostro listener nella nostra funzione `useEffect` in modo che venga inizializzato al primo rendering del componente `HelloWorld.js`. Nel complesso, la tua funzione `useEffect` dovrebbe apparire così:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

Ora che siamo in grado di leggere dal nostro contratto intelligente, sarebbe fantastico capire anche come scriverci! Tuttavia, per scrivere sulla nostra dApp, dobbiamo prima avere un portafoglio Ethereum connesso ad essa.

Quindi, in seguito affronteremo la configurazione del nostro portafoglio Ethereum \(MetaMask\) e poi la sua connessione alla nostra dApp!

### Passaggio 4: Configurare il tuo portafoglio Ethereum {#step-4-set-up-your-ethereum-wallet}

Per scrivere qualsiasi cosa sulla catena di Ethereum, gli utenti devono firmare le transazioni usando le chiavi private del loro portafoglio virtuale. Per questo tutorial, useremo [MetaMask](https://metamask.io/), un portafoglio virtuale nel browser usato per gestire l'indirizzo del tuo account Ethereum, poiché rende questa firma della transazione facilissima per l'utente finale.

Se vuoi capire di più su come funzionano le transazioni su Ethereum, dai un'occhiata a [questa pagina](/developers/docs/transactions/) della fondazione Ethereum.

#### Scaricare MetaMask {#download-metamask}

Puoi scaricare e creare un account MetaMask gratuitamente [qui](https://metamask.io/download). Quando crei un account, o se hai già un account, assicurati di passare alla "Goerli Test Network" in alto a destra \(in modo da non avere a che fare con denaro reale\).

#### Aggiungere ether da un rubinetto {#add-ether-from-a-faucet}

Per firmare una transazione sulla blockchain di Ethereum, avremo bisogno di alcuni Eth finti. Per ottenere Eth puoi andare su [FaucETH](https://fauceth.komputing.org) e inserire l'indirizzo del tuo account Goerli, cliccare su "Request funds", poi selezionare "Ethereum Testnet Goerli" nel menu a discesa e infine cliccare di nuovo sul pulsante "Request funds". Dovresti vedere gli Eth nel tuo account MetaMask poco dopo!

#### Controllare il tuo saldo {#check-your-balance}

Per verificare che il nostro saldo sia presente, facciamo una richiesta [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) usando lo [strumento composer di Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Questo restituirà la quantità di Eth nel nostro portafoglio. Dopo aver inserito l'indirizzo del tuo account MetaMask e cliccato su "Send Request", dovresti vedere una risposta come questa:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**NOTA:** Questo risultato è in wei, non in eth. Il wei è usato come la più piccola denominazione di ether. La conversione da wei a eth è: 1 eth = 10¹⁸ wei. Quindi se convertiamo 0xde0b6b3a7640000 in decimale otteniamo 1\*10¹⁸ che equivale a 1 eth.

Fiuu! I nostri soldi finti ci sono tutti! 🤑

### Passaggio 5: Connettere MetaMask alla tua interfaccia utente {#step-5-connect-metamask-to-your-UI}

Ora che il nostro portafoglio MetaMask è configurato, connettiamo la nostra dApp ad esso!

#### La funzione `connectWallet` {#the-connectWallet-function}

Nel nostro file `interact.js`, implementiamo la funzione `connectWallet`, che potremo poi chiamare nel nostro componente `HelloWorld.js`.

Modifichiamo `connectWallet` con quanto segue:

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
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
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

Quindi cosa fa esattamente questo gigantesco blocco di codice?

Beh, per prima cosa, controlla se `window.ethereum` è abilitato nel tuo browser.

`window.ethereum` è un'API globale iniettata da MetaMask e da altri fornitori di portafogli che consente ai siti web di richiedere gli account Ethereum degli utenti. Se approvata, può leggere i dati dalle blockchain a cui l'utente è connesso e suggerire all'utente di firmare messaggi e transazioni. Dai un'occhiata alla [documentazione di MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) per maggiori informazioni!

Se `window.ethereum` _non è_ presente, significa che MetaMask non è installato. Questo fa sì che venga restituito un oggetto JSON, in cui l'`address` restituito è una stringa vuota e l'oggetto JSX `status` comunica che l'utente deve installare MetaMask.

Ora, se `window.ethereum` _è_ presente, è qui che le cose si fanno interessanti.

Usando un ciclo try/catch, proveremo a connetterci a MetaMask chiamando [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Chiamare questa funzione aprirà MetaMask nel browser, per cui all'utente verrà richiesto di connettere il proprio portafoglio alla tua dApp.

- Se l'utente sceglie di connettersi, `method: "eth_requestAccounts"` restituirà un array che contiene tutti gli indirizzi degli account dell'utente che si sono connessi alla dApp. Nel complesso, la nostra funzione `connectWallet` restituirà un oggetto JSON che contiene il _primo_ `address` in questo array \(vedi riga 9\) e un messaggio di `status` che invita l'utente a scrivere un messaggio al contratto intelligente.
- Se l'utente rifiuta la connessione, l'oggetto JSON conterrà una stringa vuota per l'`address` restituito e un messaggio di `status` che riflette che l'utente ha rifiutato la connessione.

Ora che abbiamo scritto questa funzione `connectWallet`, il passaggio successivo è chiamarla nel nostro componente `HelloWorld.js`.

#### Aggiungere la funzione `connectWallet` al tuo componente dell'interfaccia utente `HelloWorld.js` {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

Naviga alla funzione `connectWalletPressed` in `HelloWorld.js` e aggiornala con quanto segue:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Noti come la maggior parte delle nostre funzionalità sia astratta dal nostro componente `HelloWorld.js` dal file `interact.js`? Questo per rispettare il paradigma M-V-C!

In `connectWalletPressed`, facciamo semplicemente una chiamata await alla nostra funzione `connectWallet` importata e, usando la sua risposta, aggiorniamo le nostre variabili `status` e `walletAddress` tramite i loro hook di stato.

Ora, salviamo entrambi i file \(`HelloWorld.js` e `interact.js`\) e testiamo la nostra interfaccia utente finora.

Apri il tuo browser sulla pagina [http://localhost:3000/](http://localhost:3000/) e premi il pulsante "Connect Wallet" in alto a destra della pagina.

Se hai MetaMask installato, ti dovrebbe essere richiesto di connettere il tuo portafoglio alla tua dApp. Accetta l'invito a connetterti.

Dovresti vedere che il pulsante del portafoglio ora riflette che il tuo indirizzo è connesso! Siiii 🔥

Successivamente, prova ad aggiornare la pagina... questo è strano. Il nostro pulsante del portafoglio ci chiede di connettere MetaMask, anche se è già connesso...

Tuttavia, non temere! Possiamo facilmente risolvere il problema implementando `getCurrentWalletConnected`, che controllerà se un indirizzo è già connesso alla nostra dApp e aggiornerà la nostra interfaccia utente di conseguenza!

#### La funzione `getCurrentWalletConnected` {#the-getcurrentwalletconnected-function}

Aggiorna la tua funzione `getCurrentWalletConnected` nel file `interact.js` con quanto segue:

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
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
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

Questo codice è _molto_ simile alla funzione `connectWallet` che abbiamo appena scritto nel passaggio precedente.

La differenza principale è che invece di chiamare il metodo `eth_requestAccounts`, che apre MetaMask affinché l'utente connetta il proprio portafoglio, qui chiamiamo il metodo `eth_accounts`, che restituisce semplicemente un array contenente gli indirizzi MetaMask attualmente connessi alla nostra dApp.

Per vedere questa funzione in azione, chiamiamola nella nostra funzione `useEffect` del nostro componente `HelloWorld.js`:

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

Nota, usiamo la risposta della nostra chiamata a `getCurrentWalletConnected` per aggiornare le nostre variabili di stato `walletAddress` e `status`.

Ora che hai aggiunto questo codice, proviamo ad aggiornare la finestra del nostro browser.

Belloooo! Il pulsante dovrebbe dire che sei connesso e mostrare un'anteprima dell'indirizzo del tuo portafoglio connesso, anche dopo aver aggiornato!

#### Implementare `addWalletListener` {#implement-addwalletlistener}

Il passaggio finale nella configurazione del portafoglio della nostra dApp è l'implementazione del listener del portafoglio in modo che la nostra interfaccia utente si aggiorni quando lo stato del nostro portafoglio cambia, come quando l'utente si disconnette o cambia account.

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
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

Scommetto che a questo punto non hai nemmeno bisogno del nostro aiuto per capire cosa sta succedendo qui, ma per completezza, analizziamolo rapidamente:

- Per prima cosa, la nostra funzione controlla se `window.ethereum` è abilitato \(cioè, MetaMask è installato\).
  - Se non lo è, impostiamo semplicemente la nostra variabile di stato `status` su una stringa JSX che invita l'utente a installare MetaMask.
  - Se è abilitato, impostiamo il listener `window.ethereum.on("accountsChanged")` alla riga 3 che ascolta i cambiamenti di stato nel portafoglio MetaMask, che includono quando l'utente connette un account aggiuntivo alla dApp, cambia account o disconnette un account. Se c'è almeno un account connesso, la variabile di stato `walletAddress` viene aggiornata come il primo account nell'array `accounts` restituito dal listener. Altrimenti, `walletAddress` viene impostato come una stringa vuota.

Ultimo ma non meno importante, dobbiamo chiamarlo nella nostra funzione `useEffect`:

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

E questo è tutto! Abbiamo completato con successo la programmazione di tutte le funzionalità del nostro portafoglio! Ora passiamo al nostro ultimo compito: aggiornare il messaggio memorizzato nel nostro contratto intelligente!

### Passaggio 6: Implementare la funzione `updateMessage` {#step-6-implement-the-updateMessage-function}

Va bene ragazzi, siamo arrivati al rettilineo finale! In `updateMessage` del tuo file `interact.js`, faremo quanto segue:

1. Assicurarci che il messaggio che desideriamo pubblicare nel nostro contratto intelligente sia valido
2. Firmare la nostra transazione usando MetaMask
3. Chiamare questa funzione dal nostro componente frontend `HelloWorld.js`

Non ci vorrà molto; finiamo questa dApp!

#### Gestione degli errori di input {#input-error-handling}

Naturalmente, ha senso avere una sorta di gestione degli errori di input all'inizio della funzione.

Vorremo che la nostra funzione ritorni in anticipo se non c'è alcuna estensione MetaMask installata, non c'è alcun portafoglio connesso \(cioè, l'`address` passato è una stringa vuota\), o il `message` è una stringa vuota. Aggiungiamo la seguente gestione degli errori a `updateMessage`:

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

Ora che ha una corretta gestione degli errori di input, è il momento di firmare la transazione tramite MetaMask!

#### Firmare la nostra transazione {#signing-our-transaction}

Se hai già familiarità con le tradizionali transazioni Ethereum web3, il codice che scriveremo di seguito ti sarà molto familiare. Sotto il tuo codice di gestione degli errori di input, aggiungi quanto segue a `updateMessage`:

```javascript
// interact.js

// imposta i parametri della transazione
const transactionParameters = {
  to: contractAddress, // Obbligatorio tranne durante le pubblicazioni del contratto.
  from: address, // deve corrispondere all'indirizzo attivo dell'utente.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

// firma la transazione
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

Analizziamo cosa sta succedendo. Per prima cosa, impostiamo i parametri delle nostre transazioni, dove:

- `to` specifica l'indirizzo del destinatario \(il nostro contratto intelligente\)
- `from` specifica il firmatario della transazione, la variabile `address` che abbiamo passato alla nostra funzione
- `data` contiene la chiamata al metodo `update` del nostro contratto intelligente Hello World, ricevendo la nostra variabile stringa `message` come input

Quindi, facciamo una chiamata await, `window.ethereum.request`, in cui chiediamo a MetaMask di firmare la transazione. Nota, alle righe 11 e 12, stiamo specificando il nostro metodo eth, `eth_sendTransaction` e passando i nostri `transactionParameters`.

A questo punto, MetaMask si aprirà nel browser e chiederà all'utente di firmare o rifiutare la transazione.

- Se la transazione ha esito positivo, la funzione restituirà un oggetto JSON in cui la stringa JSX `status` invita l'utente a controllare Etherscan per maggiori informazioni sulla propria transazione.
- Se la transazione fallisce, la funzione restituirà un oggetto JSON in cui la stringa `status` trasmette il messaggio di errore.

Nel complesso, la nostra funzione `updateMessage` dovrebbe apparire così:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  // gestione degli errori di input
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

  // imposta i parametri della transazione
  const transactionParameters = {
    to: contractAddress, // Obbligatorio tranne durante le pubblicazioni del contratto.
    from: address, // deve corrispondere all'indirizzo attivo dell'utente.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  // firma la transazione
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

Ultimo ma non meno importante, dobbiamo connettere la nostra funzione `updateMessage` al nostro componente `HelloWorld.js`.

#### Connettere `updateMessage` al frontend `HelloWorld.js` {#connect-updatemessage-to-the-helloworld-js-frontend}

La nostra funzione `onUpdatePressed` dovrebbe fare una chiamata await alla funzione `updateMessage` importata e modificare la variabile di stato `status` per riflettere se la nostra transazione ha avuto successo o è fallita:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

È super pulito e semplice. E indovina un po'... LA TUA DAPP È COMPLETA!!!

Vai avanti e testa il pulsante **Update**!

### Crea la tua dApp personalizzata {#make-your-own-custom-dapp}

Wooooo, sei arrivato alla fine del tutorial! Per riassumere, hai imparato come:

- Connettere un portafoglio MetaMask al tuo progetto dApp
- Leggere i dati dal tuo contratto intelligente usando l'API di [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Firmare le transazioni di Ethereum usando MetaMask

Ora sei completamente equipaggiato per applicare le competenze di questo tutorial per costruire il tuo progetto dApp personalizzato! Come sempre, se hai domande, non esitare a contattarci per ricevere aiuto nel [Discord di Alchemy](https://discord.gg/gWuC7zB). 🧙‍♂️

Una volta completato questo tutorial, facci sapere com'è stata la tua esperienza o se hai dei feedback taggandoci su Twitter [@alchemyplatform](https://twitter.com/AlchemyPlatform)!