---
title: Contratto intelligente "Hello World" per principianti - Full stack
description: Tutorial introduttivo su come scrivere e distribuire un semplice smart contract su Ethereum.
author: "nstrike2"
tags:
  [
    "Solidity",
    "hardhat",
    "alchemy",
    "smart contract",
    "distribuzione",
    "esploratore di blocchi",
    "frontend",
    "transazioni"
  ]
skill: beginner
lang: it
published: 2021-10-25
---

Questa guida fa per te se hai appena iniziato con lo sviluppo sulla blockchain e non sai da dove cominciare o come distribuire e interagire con i contratti intelligenti. Analizzeremo passo passo la creazione e la distribuzione di un semplice contratto intelligente sulla rete di test Goerli usando [MetaMask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org) e [Alchemy](https://alchemy.com/eth).

Per completare questo tutorial avrai bisogno di un account Alchemy. [Registrati per un account gratuito](https://www.alchemy.com/).

Se hai domande in qualsiasi momento, non esitare a contattarci sul [Discord di Alchemy](https://discord.gg/gWuC7zB)!

## Parte 1 - Crea e distribuisci il tuo contratto intelligente usando Hardhat {#part-1}

### Connettiti alla rete Ethereum {#connect-to-the-ethereum-network}

Esistono molti modi per effettuare richieste alla catena di Ethereum. Per semplicità, useremo un account gratuito su Alchemy, una piattaforma per sviluppatori di blockchain e API che ci consentirà di comunicare con la catena di Ethereum senza dover eseguire noi stessi un nodo. Alchemy offre anche strumenti di monitoraggio e analisi per gli sviluppatori, di cui ci serviremo in questo tutorial per comprendere al meglio cosa succede dietro le quinte nella distribuzione del nostro contratto intelligente.

### Crea la tua app e la tua chiave API {#create-your-app-and-api-key}

Una volta creato un account Alchemy, puoi generare una chiave API creando un'app. Questo ti consentirà di effettuare richieste alla rete di test Goerli. Se non hai familiarità con le reti di test, puoi [leggere la guida di Alchemy sulla scelta di una rete](https://www.alchemy.com/docs/choosing-a-web3-network).

Sulla dashboard di Alchemy, trova il menu a discesa **App** nella barra di navigazione e fai clic su **Crea App**.

![Crea app Hello world](./hello-world-create-app.png)

Assegna alla tua app il nome '_Hello World_' e scrivi una breve descrizione. Seleziona **Staging** come ambiente e **Goerli** come rete.

![visualizzazione crea app hello world](./create-app-view-hello-world.png)

_Nota: assicurati di selezionare **Goerli**, altrimenti questo tutorial non funzionerà._

Fai clic su **Crea app**. La tua app apparirà nella tabella sottostante.

### Crea un account Ethereum {#create-an-ethereum-account}

Per inviare e ricevere transazioni, hai bisogno di un account Ethereum. Useremo MetaMask, un portafoglio virtuale nel browser che consente agli utenti di gestire l'indirizzo del proprio account Ethereum.

Puoi scaricare e creare un account MetaMask gratuitamente [qui](https://metamask.io/download). Quando crei un account, o se ne hai già uno, assicurati di passare alla “Rete di test Goerli” in alto a destra (in modo da non usare soldi veri).

### Fase 4: Aggiungi ether da un Faucet {#step-4-add-ether-from-a-faucet}

Per distribuire il tuo contratto intelligente sulla rete di test, avrai bisogno di ETH finti. Per ottenere ETH sulla rete Goerli, vai a un faucet Goerli e inserisci l'indirizzo del tuo account Goerli. Nota che i faucet Goerli possono essere un po' inaffidabili di recente - consulta la [pagina delle reti di test](/developers/docs/networks/#goerli) per un elenco di opzioni da provare:

_Nota: a causa della congestione della rete, l'operazione potrebbe richiedere un po' di tempo._
``

### Passaggio 5: Controlla il tuo saldo {#step-5-check-your-balance}

Per verificare che gli ETH siano nel tuo portafoglio, effettuiamo una richiesta [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) utilizzando lo [strumento compositore di Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Questo restituirà l'importo di ETH nel nostro portafoglio. Per saperne di più, guarda il [breve tutorial di Alchemy su come usare lo strumento compositore](https://youtu.be/r6sjRxBZJuU).

Inserisci l'indirizzo del tuo account MetaMask e fai clic su **Invia richiesta**. Vedrai una risposta che assomiglia allo snippet di codice sottostante.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _Nota: questo risultato è in wei, non in ETH._ _Il wei è usato come la più piccola denominazione di ether._

Meno male! I nostri soldi finti ci sono tutti.

### Passaggio 6: Inizializza il nostro progetto {#step-6-initialize-our-project}

Per prima cosa, dovremo creare una cartella per il nostro progetto. Vai alla tua riga di comando e inserisci quanto segue.

```
mkdir hello-world
cd hello-world
```

Ora che siamo all'interno della nostra cartella del progetto, useremo `npm init` per inizializzare il progetto.

> Se non hai ancora installato npm, segui [queste istruzioni per installare Node.js e npm](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm).

Ai fini di questo tutorial, non importa come rispondi alle domande di inizializzazione. Ecco come abbiamo fatto, come riferimento:

```
package name: (hello-world)
version: (1.0.0)
description: contratto intelligente hello world
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)

Sto per scrivere su /Users/.../.../.../hello-world/package.json:

{
   "name": "hello-world",
   "version": "1.0.0",
   "description": "contratto intelligente hello world",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

Approva il file package.json e siamo pronti a partire!

### Passaggio 7: Scarica Hardhat {#step-7-download-hardhat}

Hardhat è un ambiente di sviluppo per compilare, distribuire, testare ed effettuare il debug del tuo software di Ethereum. Aiuta gli sviluppatori nella costruzione di contratti intelligenti e dapp localmente, prima di distribuirli alla catena.

All'interno del nostro progetto `hello-world`, esegui:

```
npm install --save-dev hardhat
```

Consulta questa pagina per maggiori dettagli sulle [istruzioni di installazione](https://hardhat.org/getting-started/#overview).

### Passaggio 8: Crea il progetto Hardhat {#step-8-create-hardhat-project}

All'interno della nostra cartella di progetto `hello-world`, esegui:

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

Cosa vuoi fare? …
Crea un progetto di esempio
❯ Crea un file hardhat.config.js vuoto
Esci
```

Questo genererà un file `hardhat.config.js` nel progetto. Lo useremo più avanti nel tutorial per specificare la configurazione del nostro progetto.

### Passaggio 9: Aggiungi cartelle di progetto {#step-9-add-project-folders}

Per mantenere il progetto organizzato, creiamo due nuove cartelle. Nella riga di comando, vai alla directory principale del tuo progetto `hello-world` e digita:

```
mkdir contracts
mkdir scripts
```

- `contracts/` è dove conserveremo il file del codice del nostro smart contract hello world
- `scripts/` è dove conserveremo gli script per distribuire e interagire con il nostro contratto

### Passaggio 10: Scrivi il nostro contratto {#step-10-write-our-contract}

Forse ti starai chiedendo: quando scriveremo del codice? È il momento!

Apri il progetto hello-world nel tuo editor preferito. I contratti intelligenti sono scritti più comunemente in Solidity, che useremo per scrivere il nostro contratto intelligente.‌

1. Vai alla cartella `contracts` e crea un nuovo file chiamato `HelloWorld.sol`
2. Di seguito è riportato un esempio di contratto intelligente Hello World che useremo per questo tutorial. Copia il contenuto qui sotto nel file `HelloWorld.sol`.

_Nota: assicurati di leggere i commenti per capire cosa fa questo contratto._

```
// Specifica la versione di Solidity, usando il versioning semantico.
// Per saperne di più: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Definisce un contratto chiamato `HelloWorld`.
// Un contratto è una raccolta di funzioni e dati (il suo stato). Una volta distribuito, un contratto risiede a un indirizzo specifico sulla blockchain di Ethereum. Per saperne di più: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emesso quando viene chiamata la funzione di aggiornamento
   //Gli eventi dei contratti intelligenti sono un modo per il tuo contratto di comunicare che qualcosa è accaduto sulla blockchain alla tua app front-end, che può essere 'in ascolto' di determinati eventi e agire di conseguenza.
   event UpdatedMessages(string oldStr, string newStr);

   // Dichiara una variabile di stato `message` di tipo `string`.
   // Le variabili di stato sono variabili i cui valori sono memorizzati in modo permanente nella memoria del contratto. La parola chiave `public` rende le variabili accessibili dall'esterno di un contratto e crea una funzione che altri contratti o client possono chiamare per accedere al valore.
   string public message;

   // Simile a molti linguaggi orientati agli oggetti basati su classi, un costruttore è una funzione speciale che viene eseguita solo alla creazione del contratto.
   // I costruttori sono usati per inizializzare i dati del contratto. Per saperne di più:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
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

Si tratta di un contratto intelligente di base che memorizza un messaggio al momento della creazione. Può essere aggiornato chiamando la funzione `update`.

### Passaggio 11: Collega MetaMask e Alchemy al tuo progetto {#step-11-connect-metamask-alchemy-to-your-project}

Abbiamo creato un portafoglio MetaMask, un conto Alchemy e scritto il nostro smart contract, ora è il momento di collegare i tre.

Ogni transazione inviata dal tuo portafoglio richiede una firma che utilizza la tua chiave privata univoca. Per fornire al nostro programma questa autorizzazione, possiamo archiviare in modo sicuro la nostra chiave privata in un file di ambiente. Qui memorizzeremo anche una chiave API per Alchemy.

> Per saperne di più sull'invio di transazioni, consulta [questo tutorial](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project) sull'invio di transazioni tramite web3.

Prima, installa il pacchetto dotenv nella cartella del tuo progetto:

```
npm install dotenv --save
```

Quindi, crea un file `.env` nella directory principale del progetto. Aggiungi la tua chiave privata MetaMask e l'URL dell'API HTTP di Alchemy.

Il tuo file di ambiente deve essere nominato `.env` o non sarà riconosciuto come tale.

Non nominarlo `process.env` o `.env-custom` o in qualsiasi altro modo.

- Segui [queste istruzioni](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) per esportare la tua chiave privata
- Vedi di seguito per ottenere l'URL dell'API HTTP di Alchemy

![](./get-alchemy-api-key.gif)

Il tuo file `.env` dovrebbe avere questo aspetto:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/tua-chiave-api"
PRIVATE_KEY = "tua-chiave-privata-metamask"
```

Per collegarli effettivamente al nostro codice, faremo riferimento a queste variabili nel nostro file `hardhat.config.js` nella fase 13.

### Fase 12: Installa Ethers.js {#step-12-install-ethersjs}

Ethers.js è una libreria che semplifica l'interazione e l'invio di richieste a Ethereum, incapsulando i [metodi JSON-RPC standard](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) con metodi più intuitivi.

Hardhat ci consente di integrare [plugin](https://hardhat.org/plugins/) per strumenti aggiuntivi e funzionalità estese. Sfrutteremo il [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) per la distribuzione del contratto.

Nella cartella del tuo progetto digita:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### Passaggio 13: Aggiorna hardhat.config.js {#step-13-update-hardhat-configjs}

Finora abbiamo aggiunto diverse dipendenze e plugin, ora dobbiamo aggiornare `hardhat.config.js` in modo che il nostro progetto li riconosca tutti.

Aggiorna il tuo `hardhat.config.js` perché abbia questo aspetto:

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

### Passaggio 14: Compila il nostro contratto {#step-14-compile-our-contract}

Per assicurarti che tutto funzioni fino a questo punto, compila il contratto. L'attività `compile` è una delle attività integrate di hardhat.

Dalla riga di comando esegui:

```bash
npx hardhat compile
```

Potresti ricevere un avviso su `SPDX license identifier not provided in source file`, ma non preoccuparti: si spera che tutto il resto vada bene! In caso contrario, puoi sempre inviare un messaggio nel [discord di Alchemy](https://discord.gg/u72VCg3).

### Passaggio 15: Scrivi il nostro script di distribuzione {#step-15-write-our-deploy-script}

Ora che il nostro contratto è scritto e il nostro file di configurazione è pronto, è il momento di scrivere lo script di distribuzione del contratto.

Vai alla cartella `scripts/` e crea un nuovo file chiamato `deploy.js`, aggiungendovi i seguenti contenuti:

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // Avvia la distribuzione, restituendo una promise che si risolve in un oggetto contratto
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Contratto distribuito all'indirizzo:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat spiega molto bene cosa fa ciascuna di queste righe di codice nella sua [Guida ai contratti](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), e qui abbiamo adottato le sue spiegazioni.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

Un `ContractFactory` in ethers.js è un'astrazione usata per distribuire nuovi contratti intelligenti, quindi `HelloWorld` qui è una [factory](https://en.wikipedia.org/wiki/Factory_\(object-oriented_programming\)) per le istanze del nostro contratto hello world. Quando si usa il plugin `hardhat-ethers`, le istanze `ContractFactory` e `Contract` sono collegate al primo firmatario (proprietario) per impostazione predefinita.

```javascript
const hello_world = await HelloWorld.deploy()
```

La chiamata di `deploy()` su un `ContractFactory` avvierà la distribuzione e restituirà una `Promise` che si risolve in un oggetto `Contract`. Questo è l'oggetto che ha un metodo per ciascuna delle funzioni del nostro smart contract.

### Fase 16: Distribuisci il nostro contratto {#step-16-deploy-our-contract}

Siamo finalmente pronti a distribuire il nostro smart contract! Vai alla riga di comando ed esegui:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

Vorrai poi vedere qualcosa del genere:

```bash
Contratto distribuito all'indirizzo: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**Salva questo indirizzo**. Lo useremo più avanti nel tutorial.

Se andiamo su [Goerli etherscan](https://goerli.etherscan.io) e cerchiamo l'indirizzo del nostro contratto, dovremmo essere in grado di vedere che è stato distribuito con successo. La transazione somiglierà a questa:

![](./etherscan-contract.png)

L'indirizzo `Da` dovrebbe corrispondere all'indirizzo del tuo account MetaMask e l'indirizzo `A` riporterà **Creazione del contratto**. Se facciamo clic sulla transazione, vedremo l'indirizzo del nostro contratto nel campo `A`.

![](./etherscan-transaction.png)

Congratulazioni! Hai appena distribuito un contratto intelligente su una rete di test di Ethereum.

Per capire cosa succede dietro le quinte, vai alla scheda Explorer nella tua [dashboard di Alchemy](https://dashboard.alchemy.com/explorer). Se hai più app Alchemy, assicurati di filtrare per app e seleziona **Hello World**.

![](./hello-world-explorer.png)

Qui vedrai una manciata di metodi JSON-RPC che Hardhat/Ethers hanno eseguito per noi dietro le quinte quando abbiamo chiamato la funzione `.deploy()`. Due metodi importanti qui sono [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), che è la richiesta di scrivere il nostro contratto sulla chain Goerli, e [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash), che è una richiesta di leggere informazioni sulla nostra transazione dato l'hash. Per saperne di più sull'invio di transazioni, consulta [il nostro tutorial sull'invio di transazioni con Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

## Parte 2: Interagisci con il tuo contratto intelligente {#part-2-interact-with-your-smart-contract}

Ora che abbiamo distribuito con successo un contratto intelligente sulla rete Goerli, impariamo a interagire con esso.

### Crea un file interact.js {#create-a-interactjs-file}

Questo è il file in cui scriveremo il nostro script di interazione. Useremo la libreria Ethers.js che hai installato in precedenza nella Parte 1.

All'interno della cartella `scripts/`, crea un nuovo file chiamato `interact.js` e aggiungi il seguente codice:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### Aggiorna il tuo file .env {#update-your-env-file}

Useremo nuove variabili d'ambiente, quindi dobbiamo definirle nel file `.env` che [abbiamo creato in precedenza](#step-11-connect-metamask-&-alchemy-to-your-project).

Dovremo aggiungere una definizione per la nostra `API_KEY` di Alchemy e il `CONTRACT_ADDRESS` dove è stato distribuito il tuo contratto intelligente.

Il tuo file `.env` dovrebbe avere un aspetto simile a questo:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<la-tua-chiave-api>"
API_KEY = "<la-tua-chiave-api>"
PRIVATE_KEY = "<la-tua-chiave-privata-metamask>"
CONTRACT_ADDRESS = "0x<l'indirizzo-del-tuo-contratto>"
```

### Recupera l'ABI del tuo contratto {#grab-your-contract-ABI}

L'[ABI (Application Binary Interface)](/glossary/#abi) del nostro contratto è l'interfaccia per interagire con il nostro contratto intelligente. Hardhat genera automaticamente un'ABI e la salva in `HelloWorld.json`. Per usare l'ABI, dovremo analizzarne il contenuto aggiungendo le seguenti righe di codice al nostro file `interact.js`:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

Se vuoi vedere l'ABI, puoi stamparla nella tua console:

```javascript
console.log(JSON.stringify(contract.abi))
```

Per vedere la tua ABI stampata sulla console, vai al tuo terminale ed esegui:

```bash
npx hardhat run scripts/interact.js
```

### Crea un'istanza del tuo contratto {#create-an-instance-of-your-contract}

Per interagire con il nostro contratto, dobbiamo creare un'istanza del contratto nel nostro codice. Per farlo con Ethers.js, dovremo lavorare con tre concetti:

1. Provider - un provider di nodi che ti dà accesso in lettura e scrittura alla blockchain
2. Signer - rappresenta un account Ethereum che può firmare transazioni
3. Contratto - un oggetto Ethers.js che rappresenta uno specifico contratto distribuito on-chain

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

// Contratto
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

Scopri di più su Provider, Signer e Contratti nella [documentazione di ethers.js](https://docs.ethers.io/v5/).

### Leggi il messaggio di inizializzazione {#read-the-init-message}

Ricordi quando abbiamo distribuito il nostro contratto con `initMessage = "Hello world!"`? Ora andremo a leggere il messaggio memorizzato nel nostro contratto intelligente e a stamparlo nella console.

In JavaScript, le funzioni asincrone vengono utilizzate quando si interagisce con le reti. Per saperne di più sulle funzioni asincrone, [leggi questo articolo su Medium](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

Usa il codice qui sotto per chiamare la funzione `message` nel nostro contratto intelligente e leggere il messaggio di inizializzazione:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("Il messaggio è: " + message)
}
main()
```

Dopo aver eseguito il file usando `npx hardhat run scripts/interact.js` nel terminale, dovremmo vedere questa risposta:

```
Il messaggio è: Hello world!
```

Congratulazioni! Hai appena letto con successo i dati del contratto intelligente dalla blockchain di Ethereum, complimenti!

### Aggiorna il messaggio {#update-the-message}

Invece di limitarci a leggere il messaggio, possiamo anche aggiornare il messaggio salvato nel nostro contratto intelligente usando la funzione `update`! Forte, vero?

Per aggiornare il messaggio, possiamo chiamare direttamente la funzione `update` nel nostro oggetto Contratto instanziato:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("Il messaggio è: " + message)

  console.log("Aggiornamento del messaggio...")
  const tx = await helloWorldContract.update("Questo è il nuovo messaggio.")
  await tx.wait()
}
main()
```

Nota che alla riga 11, facciamo una chiamata a `.wait()` sull'oggetto transazione restituito. Questo assicura che il nostro script aspetti che la transazione venga minata sulla blockchain prima di uscire dalla funzione. Se la chiamata `.wait()` non viene inclusa, lo script potrebbe non vedere il valore `message` aggiornato nel contratto.

### Leggi il nuovo messaggio {#read-the-new-message}

Dovresti essere in grado di ripetere il [passaggio precedente](#read-the-init-message) per leggere il valore `message` aggiornato. Prenditi un momento e vedi se riesci ad apportare le modifiche necessarie per stampare il nuovo valore!

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

// istanza del contratto
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("Il messaggio è: " + message)

  console.log("Aggiornamento del messaggio...")
  const tx = await helloWorldContract.update("questo è il nuovo messaggio")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("Il nuovo messaggio è: " + newMessage)
}

main()
```

Ora esegui lo script e dovresti essere in grado di vedere il vecchio messaggio, lo stato di aggiornamento e il nuovo messaggio stampato sul tuo terminale!

`npx hardhat run scripts/interact.js --network goerli`

```
Il messaggio è: Hello World!
Aggiornamento del messaggio...
Il nuovo messaggio è: Questo è il nuovo messaggio.
```

Durante l'esecuzione dello script, potresti notare che la fase `Aggiornamento del messaggio...` richiede del tempo di caricamento prima che venga caricato il nuovo messaggio. Questo è dovuto al processo di mining; se sei curioso di tracciare le transazioni mentre vengono minate, visita la [mempool di Alchemy](https://dashboard.alchemyapi.io/mempool) per vedere lo stato di una transazione. Se la transazione viene eliminata, è sempre utile dare un'occhiata all'[Etherscan di Goerli](https://goerli.etherscan.io) e cercare l'hash della tua transazione.

## Parte 3: Pubblica il tuo contratto intelligente su Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

Hai fatto tutto il duro lavoro per dare vita al tuo contratto intelligente, ora è arrivato il momento di condividerlo con il mondo!

Verificando il tuo contratto intelligente su Etherscan, chiunque può vedere il codice sorgente e interagire con il tuo contratto intelligente. Iniziamo!

### Passaggio 1: Genera una chiave API sul tuo account Etherscan {#step-1-generate-an-api-key-on-your-etherscan-account}

Una chiave API di Etherscan è necessaria per verificare che tu possieda il contratto intelligente che stai cercando di pubblicare.

Se non hai ancora un account Etherscan, [registrati per un account](https://etherscan.io/register).

Una volta effettuato l'accesso, trova il tuo nome utente nella barra di navigazione, passaci sopra e seleziona il pulsante **Il mio profilo**.

Nella tua pagina del profilo, dovresti vedere una barra di navigazione laterale. Dalla barra di navigazione laterale, seleziona **Chiavi API**. Quindi, premi il pulsante "Aggiungi" per creare una nuova chiave API, dai alla tua app il nome **hello-world** e premi il pulsante **Crea nuova chiave API**.

La tua nuova chiave API dovrebbe apparire nella tabella delle chiavi API. Copia la chiave API negli appunti.

Successivamente, dobbiamo aggiungere la chiave API di Etherscan al nostro file `.env`.

Dopo averla aggiunta, il tuo file `.env` dovrebbe apparire così:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/tua-chiave-api"
PUBLIC_KEY = "il-tuo-indirizzo-account-pubblico"
PRIVATE_KEY = "il-tuo-indirizzo-account-privato"
CONTRACT_ADDRESS = "il-tuo-indirizzo-contratto"
ETHERSCAN_API_KEY = "la-tua-chiave-etherscan"
```

### Contratti intelligenti distribuiti con Hardhat {#hardhat-deployed-smart-contracts}

#### Installa hardhat-etherscan {#install-hardhat-etherscan}

Pubblicare il tuo contratto su Etherscan usando Hardhat è semplice. Per iniziare dovrai prima installare il plugin `hardhat-etherscan`. `hardhat-etherscan` verificherà automaticamente il codice sorgente e l'ABI del contratto intelligente su Etherscan. Per aggiungerlo, esegui dalla directory `hello-world`:

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

#### Verifica il tuo contratto intelligente su Etherscan {#verify-your-smart-contract-on-etherscan}

Assicurati che tutti i file siano stati salvati e che tutte le variabili `.env` siano correttamente configurate.

Esegui l'attività `verify`, passando l'indirizzo del contratto e la rete dove è stato distribuito:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

Assicurati che `DEPLOYED_CONTRACT_ADDRESS` sia l'indirizzo del tuo contratto intelligente distribuito sulla rete di test Goerli. Inoltre, l'argomento finale (`'Hello World!'`) deve essere lo stesso valore di stringa usato [durante la fase di distribuzione nella parte 1](#write-our-deploy-script).

Se tutto va bene, nel tuo terminale vedrai il seguente messaggio:

```text
Codice sorgente inviato con successo per il contratto
contracts/HelloWorld.sol:HelloWorld all'indirizzo 0xdeployed-contract-address
per la verifica su Etherscan. In attesa del risultato della verifica...


Contratto HelloWorld verificato con successo su Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

Congratulazioni! Il codice del tuo contratto intelligente è su Etherscan!

### Dai un'occhiata al tuo contratto intelligente su Etherscan! {#check-out-your-smart-contract-on-etherscan}

Quando vai al link fornito nel tuo terminale, dovresti essere in grado di vedere il codice e l'ABI del tuo contratto intelligente pubblicati su Etherscan!

**Fantastico: ce l'hai fatta, campione! Ora chiunque può chiamare o scrivere sul tuo contratto intelligente! Non vediamo l'ora di vedere cosa svilupperai in futuro!**

## Parte 4 - Integrazione del tuo contratto intelligente con il frontend {#part-4-integrating-your-smart-contract-with-the-frontend}

Alla fine di questo tutorial, saprai come:

- Collegare un portafoglio MetaMask alla tua dApp
- Leggere i dati dal tuo contratto intelligente usando l'API [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Firmare le transazioni di Ethereum usando MetaMask

Per questa dApp, useremo [React](https://react.dev/) come nostro framework frontend; tuttavia, è importante notare che non dedicheremo molto tempo alla scomposizione dei suoi fondamenti, poiché ci concentreremo principalmente sull'introduzione delle funzionalità Web3 nel nostro progetto.

Come prerequisito, è necessario avere una comprensione di React a livello principiante. In caso contrario, ti consigliamo di completare il [tutorial ufficiale di introduzione a React](https://react.dev/learn).

### Clonare i file di base {#clone-the-starter-files}

Per prima cosa, vai al [repository GitHub hello-world-part-four](https://github.com/alchemyplatform/hello-world-part-four-tutorial) per ottenere i file di base per questo progetto e clona questo repository sulla tua macchina locale.

Apri il repository clonato localmente. Nota che contiene due cartelle: `starter-files` e `completed`.

- `starter-files`- **lavoreremo in questa directory**, collegheremo l'interfaccia utente al tuo portafoglio Ethereum e al contratto intelligente che abbiamo pubblicato su Etherscan nella [Parte 3](#part-3).
- `completed` contiene l'intero tutorial completato e deve essere usato solo come riferimento se ti blocchi.

Quindi, apri la tua copia di `starter-files` nel tuo editor di codice preferito, e poi vai alla cartella `src`.

Tutto il codice che scriveremo si troverà nella cartella `src`. Modificheremo il componente `HelloWorld.js` e i file JavaScript `util/interact.js` per dare al nostro progetto la funzionalità Web3.

### Controlla i file di base {#check-out-the-starter-files}

Prima di iniziare a programmare, esploriamo ciò che ci viene fornito nei file di base.

#### Avviare il progetto React {#get-your-react-project-running}

Iniziamo eseguendo il progetto di React nel browser. La bellezza di React è che una volta eseguito il nostro progetto nel browser, ogni modifica che salviamo sarà aggiornata dal vivo nel browser.

Per avviare il progetto, vai alla directory principale della cartella `starter-files` ed esegui `npm install` nel tuo terminale per installare le dipendenze del progetto:

```bash
cd starter-files
npm install
```

Una volta terminata l'installazione, esegui `npm start` nel tuo terminale:

```bash
npm start
```

Facendo ciò, si dovrebbe aprire [http://localhost:3000/](http://localhost:3000/) nel browser, dove vedrai il frontend del nostro progetto. Dovrebbe consistere in un campo (un posto per aggiornare il messaggio memorizzato nel tuo contratto intelligente), un pulsante "Connetti portafoglio" e un pulsante "Aggiorna".

Se provi a fare clic su uno dei pulsanti, noterai che non funzionano: questo perché dobbiamo ancora programmarne la funzionalità.

#### Il componente `HelloWorld.js` {#the-helloworld-js-component}

Torniamo alla cartella `src` nel nostro editor e apriamo il file `HelloWorld.js`. È davvero importante comprendere tutto il contenuto di questo file, che è il componente principale di React su cui lavoreremo.

All'inizio di questo file, noterai che abbiamo diverse dichiarazioni di importazione necessarie per far funzionare il nostro progetto, inclusa la libreria React, gli hook useEffect e useState, alcuni elementi da `./util/interact.js` (li descriveremo più in dettaglio a breve!) e il logo di Alchemy.

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

//Variabili di stato
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("Nessuna connessione alla rete.")
const [newMessage, setNewMessage] = useState("")
```

Ecco cosa rappresenta ciascuna variabile:

- `walletAddress`: una stringa che memorizza l'indirizzo del portafoglio dell'utente
- `status`- una stringa che memorizza un messaggio utile che guida l'utente su come interagire con la dApp
- `message` - una stringa che memorizza il messaggio corrente nel contratto intelligente
- `newMessage` - una stringa che memorizza il nuovo messaggio che verrà scritto nel contratto intelligente

Dopo le variabili di stato, vedrai cinque funzioni non implementate: `useEffect`, `addSmartContractListener`, `addWalletListener`, `connectWalletPressed` e `onUpdatePressed`. Spiegheremo cosa fanno qui di seguito:

```javascript
// HelloWorld.js

//chiamato solo una volta
useEffect(async () => {
  //TODO: implementa
}, [])

function addSmartContractListener() {
  //TODO: implementa
}

function addWalletListener() {
  //TODO: implementa
}

const connectWalletPressed = async () => {
  //TODO: implementa
}

const onUpdatePressed = async () => {
  //TODO: implementa
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html)- questo è un hook di React che viene chiamato dopo il rendering del tuo componente. Poiché ha una prop array vuoto `[]` passata ad esso (vedi riga 4), sarà chiamato solo al _primo_ rendering del componente. Qui caricheremo il messaggio corrente memorizzato nel nostro contratto intelligente, chiameremo i nostri listener di contratto intelligente e portafoglio e aggiorneremo la nostra interfaccia utente per riflettere se un portafoglio è già connesso.
- `addSmartContractListener` - questa funzione imposta un listener che osserverà l'evento `UpdatedMessages` del nostro contratto HelloWorld e aggiornerà la nostra interfaccia utente quando il messaggio viene modificato nel nostro contratto intelligente.
- `addWalletListener` - questa funzione imposta un listener che rileva i cambiamenti nello stato del portafoglio MetaMask dell'utente, come quando l'utente disconnette il suo portafoglio o cambia indirizzo.
- `connectWalletPressed`- questa funzione sarà chiamata per connettere il portafoglio MetaMask dell'utente alla nostra dApp.
- `onUpdatePressed` - questa funzione sarà chiamata quando l'utente vuole aggiornare il messaggio memorizzato nel contratto intelligente.

Vicino alla fine di questo file, abbiamo l'UI del nostro componente.

```javascript
// HelloWorld.js

//l'interfaccia utente del nostro componente
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connesso: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connetti Portafoglio</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Messaggio corrente:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>Nuovo messaggio:</h2>

    <div>
      <input
        type="text"
        placeholder="Aggiorna il messaggio nel tuo contratto intelligente."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Aggiorna
      </button>
</div>
 
</div>
)
```

Se analizzi questo codice con attenzione, noterai dove usiamo le nostre varie variabili di stato nell'interfaccia utente:

- Nelle righe 6-12, se il portafoglio dell'utente è connesso (cioè `walletAddress.length > 0`), visualizziamo una versione troncata del `walletAddress` dell'utente nel pulsante con ID "walletButton;" altrimenti dice semplicemente "Connetti Portafoglio".
- Alla riga 17, visualizziamo il messaggio corrente memorizzato nel contratto intelligente, che è catturato nella stringa `message`.
- Nelle righe 23-26, usiamo un [componente controllato](https://legacy.reactjs.org/docs/forms.html#controlled-components) per aggiornare la nostra variabile di stato `newMessage` quando l'input nel campo di testo cambia.

Oltre alle nostre variabili di stato, vedrai anche che le funzioni `connectWalletPressed` e `onUpdatePressed` vengono chiamate rispettivamente quando si fa clic sui pulsanti con ID `publishButton` e `walletButton`.

Infine, vediamo dove viene aggiunto questo componente `HelloWorld.js`.

Se vai al file `App.js`, che è il componente principale in React che agisce come contenitore per tutti gli altri componenti, vedrai che il nostro componente `HelloWorld.js` è inserito alla riga 7.

Infine, ma non meno importante, diamo un'occhiata a un altro file fornito per te, il file `interact.js`.

#### Il file `interact.js` {#the-interact-js-file}

Poiché vogliamo aderire al paradigma [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), vorremo un file separato che contenga tutte le nostre funzioni per gestire la logica, i dati e le regole della nostra dApp, e quindi essere in grado di esportare quelle funzioni nel nostro frontend (il nostro componente `HelloWorld.js`).

👆🏽Questo è esattamente lo scopo del nostro file `interact.js`!

Vai alla cartella `util` nella tua directory `src`, e noterai che abbiamo incluso un file chiamato `interact.js` che conterrà tutte le funzioni e le variabili per l'interazione con il nostro contratto intelligente e con il portafoglio.

```javascript
// interact.js

//esporta const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

Noterai che all'inizio del file abbiamo commentato l'oggetto `helloWorldContract`. Più avanti in questo tutorial, rimuoveremo il commento da questo oggetto e istanzieremo il nostro contratto intelligente in questa variabile, che esporteremo poi nel nostro componente `HelloWorld.js`.

Le quattro funzioni non implementate dopo il nostro oggetto `helloWorldContract` fanno quanto segue:

- `loadCurrentMessage` - questa funzione gestisce la logica di caricamento del messaggio corrente salvato nel contratto intelligente. Effettuerà una chiamata di _lettura_ al contratto intelligente Hello World usando l'[API di Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).
- `connectWallet` - questa funzione connetterà il MetaMask dell'utente alla nostra dApp.
- `getCurrentWalletConnected` - questa funzione verificherà se un account Ethereum è già connesso alla nostra dApp al caricamento della pagina e aggiornerà l'interfaccia utente di conseguenza.
- `updateMessage` - questa funzione aggiornerà il messaggio memorizzato nel contratto intelligente. Effettuerà una chiamata di _scrittura_ al contratto intelligente Hello World, quindi il portafoglio MetaMask dell'utente dovrà firmare una transazione Ethereum per aggiornare il messaggio.

Ora che abbiamo capito con cosa stiamo lavorando, scopriamo come leggere dal nostro contratto intelligente!

### Passaggio 3: Leggi dal tuo contratto intelligente {#step-3-read-from-your-smart-contract}

Per leggere dal tuo contratto intelligente, dovrai configurare con successo:

- Una connessione API alla chain di Ethereum
- Un'istanza caricata del tuo contratto intelligente
- Una funzione per chiamare la funzione del tuo contratto intelligente
- Un listener per rilevare gli aggiornamenti quando i dati che stai leggendo dal contratto intelligente cambiano

Potrebbero sembrare tanti passaggi, ma non preoccuparti! Ti guideremo passo dopo passo! :\)

#### Stabilisci una connessione API alla chain di Ethereum {#establish-an-api-connection-to-the-ethereum-chain}

Ricordi come nella Parte 2 di questo tutorial abbiamo usato la nostra [chiave Alchemy Web3 per leggere dal nostro contratto intelligente](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library)? Avrai bisogno di una chiave Alchemy Web3 anche nella tua dApp per leggere dalla chain.

Se non l'hai già fatto, installa prima [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) navigando nella directory principale dei tuoi `starter-files` ed eseguendo quanto segue nel tuo terminale:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) è un wrapper di [Web3.js](https://docs.web3js.org/) che fornisce metodi API migliorati e altri benefici fondamentali per semplificare la vita agli sviluppatori web3. È progettato per richiedere una configurazione minima, così da poter iniziare a usarlo immediatamente nella tua app!

Quindi, installa il pacchetto [dotenv](https://www.npmjs.com/package/dotenv) nella directory del tuo progetto, in modo da avere un posto sicuro per memorizzare la nostra chiave API dopo averla recuperata.

```text
npm install dotenv --save
```

Per la nostra dApp, **useremo la nostra chiave API Websockets** invece della nostra chiave API HTTP, poiché ci permetterà di impostare un listener che rileva quando il messaggio memorizzato nel contratto intelligente cambia.

Una volta ottenuta la tua chiave API, crea un file `.env` nella tua directory principale e aggiungi il tuo URL Alchemy Websockets. Successivamente, il tuo file `.env` dovrebbe avere il seguente aspetto:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<chiave>
```

Ora siamo pronti a configurare il nostro endpoint Alchemy Web3 nella nostra dApp! Torniamo al nostro `interact.js`, che è annidato nella nostra cartella `util`, e aggiungiamo il seguente codice all'inizio del file:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//esporta const helloWorldContract;
```

Sopra, abbiamo prima importato la chiave Alchemy dal nostro file `.env` e poi passato la nostra `alchemyKey` a `createAlchemyWeb3` per stabilire il nostro endpoint Alchemy Web3.

Con questo endpoint pronto, è il momento di caricare il nostro contratto intelligente!

#### Caricamento del tuo contratto intelligente Hello World {#loading-your-hello-world-smart-contract}

Per caricare il tuo contratto intelligente Hello World, avrai bisogno del suo indirizzo e della sua ABI, entrambi reperibili su Etherscan se hai completato la [Parte 3 di questo tutorial](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan).

#### Come ottenere l'ABI del tuo contratto da Etherscan {#how-to-get-your-contract-abi-from-etherscan}

Se hai saltato la Parte 3 di questo tutorial, puoi usare il contratto HelloWorld con l'indirizzo [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code). La sua ABI può essere trovata [qui](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).

L'ABI di un contratto è necessaria per specificare quale funzione un contratto invocherà, oltre a garantire che la funzione restituirà i dati nel formato previsto. Una volta copiata l'ABI del nostro contratto, salviamola come file JSON chiamato `contract-abi.json` nella tua directory `src`.

Il tuo contract-abi.json dovrebbe essere salvato nella tua cartella src.

Armati dell'indirizzo del nostro contratto, dell'ABI e dell'endpoint di Alchemy Web3, possiamo usare il [metodo `contract`](https://docs.web3js.org/api/web3-eth-contract/class/Contract) per caricare un'istanza del nostro contratto intelligente. Importa l'ABI del tuo contratto nel file `interact.js` e aggiungi l'indirizzo del tuo contratto.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

Possiamo ora finalmente rimuovere il commento dalla nostra variabile `helloWorldContract` e caricare il contratto intelligente usando il nostro endpoint AlchemyWeb3:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Per ricapitolare, le prime 12 righe del tuo `interact.js` dovrebbero ora avere questo aspetto:

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

Ora che il nostro contratto è caricato, possiamo implementare la nostra funzione `loadCurrentMessage`!

#### Implementazione di `loadCurrentMessage` nel tuo file `interact.js` {#implementing-loadCurrentMessage-in-your-interact-js-file}

Questa funzione è semplicissima. Faremo una semplice chiamata asincrona web3 per leggere dal nostro contratto. La nostra funzione restituirà il messaggio memorizzato nel contratto intelligente:

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

//chiamato solo una volta
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

Nota che vogliamo che il nostro `loadCurrentMessage` sia chiamato solo una volta durante il primo rendering del componente. Presto implementeremo `addSmartContractListener` per aggiornare automaticamente l'interfaccia utente dopo che il messaggio del contratto intelligente cambia.

Prima di addentrarci nel nostro listener, diamo un'occhiata a ciò che abbiamo finora! Salva i tuoi file `HelloWorld.js` e `interact.js`, e poi vai su [http://localhost:3000/](http://localhost:3000/)

Noterai che il messaggio corrente non dice più "Nessuna connessione alla rete". Riflette invece il messaggio memorizzato nel contratto intelligente. Pazzesco!

#### La tua UI dovrebbe ora riflettere il messaggio memorizzato nel contratto intelligente {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

Ora, parlando di quel listener...

#### Implementa `addSmartContractListener` {#implement-addsmartcontractlistener}

Se ripensi al file `HelloWorld.sol` che abbiamo scritto nella [Parte 1 di questa serie di tutorial](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract), ricorderai che c'è un evento del contratto intelligente chiamato `UpdatedMessages` che viene emesso dopo aver invocato la funzione `update` del nostro contratto intelligente (vedi righe 9 e 27):

```javascript
// HelloWorld.sol

// Specifica la versione di Solidity, usando il versioning semantico.
// Per saperne di più: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// Definisce un contratto chiamato `HelloWorld`.
// Un contratto è una raccolta di funzioni e dati (il suo stato). Una volta distribuito, un contratto risiede a un indirizzo specifico sulla blockchain di Ethereum. Per saperne di più: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emesso quando viene chiamata la funzione di aggiornamento
   //Gli eventi dei contratti intelligenti sono un modo per il tuo contratto di comunicare che qualcosa è accaduto sulla blockchain alla tua app front-end, che può essere 'in ascolto' di determinati eventi e agire di conseguenza.
   event UpdatedMessages(string oldStr, string newStr);

   // Dichiara una variabile di stato `message` di tipo `string`.
   // Le variabili di stato sono variabili i cui valori sono memorizzati in modo permanente nella memoria del contratto. La parola chiave `public` rende le variabili accessibili dall'esterno di un contratto e crea una funzione che altri contratti o client possono chiamare per accedere al valore.
   string public message;

   // Simile a molti linguaggi orientati agli oggetti basati su classi, un costruttore è una funzione speciale che viene eseguita solo alla creazione del contratto.
   // I costruttori sono usati per inizializzare i dati del contratto. Per saperne di più:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
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

Gli eventi del contratto intelligente sono un modo per il contratto di comunicare che è successo qualcosa (cioè che c'è stato un _evento_) sulla blockchain alla tua applicazione front-end, che può essere 'in ascolto' di eventi specifici e agire quando si verificano.

La funzione `addSmartContractListener` sarà specificamente in ascolto dell'evento `UpdatedMessages` del nostro contratto intelligente Hello World, e aggiornerà la nostra interfaccia utente per visualizzare il nuovo messaggio.

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
      setStatus("🎉 Il tuo messaggio è stato aggiornato!")
    }
  })
}
```

Analizziamo cosa succede quando il listener rileva un evento:

- Se si verifica un errore quando viene emesso l'evento, questo si rifletterà nell'interfaccia utente tramite la nostra variabile di stato `status`.
- Altrimenti, useremo l'oggetto `data` restituito. `data.returnValues` è un array indicizzato a zero in cui il primo elemento dell'array memorizza il messaggio precedente e il secondo elemento quello aggiornato. Complessivamente, in caso di evento concluso con successo, imposteremo la nostra stringa `message` con il messaggio aggiornato, cancelleremo la stringa `newMessage` e aggiorneremo la nostra variabile di stato `status` per riflettere il fatto che un nuovo messaggio è stato pubblicato sul nostro contratto intelligente.

Infine, chiamiamo il nostro listener nella nostra funzione `useEffect` in modo che sia inizializzato al primo rendering del componente `HelloWorld.js`. Complessivamente, la tua funzione `useEffect` dovrebbe avere questo aspetto:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

Ora che siamo in grado di leggere dal nostro contratto intelligente, sarebbe bello capire anche come scrivergli! Tuttavia, per scrivere sulla nostra dApp, dobbiamo prima avere un portafoglio Ethereum collegato ad essa.

Quindi, ora ci occuperemo di configurare il nostro portafoglio Ethereum (MetaMask) e di collegarlo alla nostra dApp!

### Passaggio 4: Configura il tuo portafoglio Ethereum {#step-4-set-up-your-ethereum-wallet}

Per scrivere qualsiasi cosa sulla chain di Ethereum, gli utenti devono firmare le transazioni utilizzando le chiavi private del proprio portafoglio virtuale. Per questo tutorial, utilizzeremo [MetaMask](https://metamask.io/), un portafoglio virtuale nel browser utilizzato per gestire l'indirizzo del tuo account Ethereum, poiché rende la firma delle transazioni estremamente semplice per l'utente finale.

Se vuoi saperne di più su come funzionano le transazioni su Ethereum, consulta [questa pagina](/developers/docs/transactions/) della Ethereum Foundation.

#### Scarica MetaMask {#download-metamask}

Puoi scaricare e creare un account MetaMask gratuitamente [qui](https://metamask.io/download). Quando crei un account, o se ne hai già uno, assicurati di passare alla “Rete di test Goerli” in alto a destra (in modo da non usare soldi veri).

#### Aggiungi ether da un Faucet {#add-ether-from-a-faucet}

Per firmare una transazione sulla blockchain di Ethereum, avremo bisogno di Eth finti. Per ottenere Eth puoi andare su [FaucETH](https://fauceth.komputing.org) e inserire l'indirizzo del tuo account Goerli, fare clic su “Richiedi fondi”, quindi selezionare “Rete di test Goerli di Ethereum” nel menu a tendina e infine fare clic di nuovo sul pulsante “Richiedi fondi”. Poco dopo, dovresti vedere gli Eth nel tuo conto di MetaMask!

#### Controlla il tuo saldo {#check-your-balance}

Per verificare che il nostro saldo sia presente, effettuiamo una richiesta [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) usando lo [strumento compositore di Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Questo restituirà l'importo di Eth nel tuo portafoglio. Dopo aver inserito l'indirizzo del tuo conto di MetaMask e aver cliccato "Invia Richiesta", dovresti visualizzare una risposta simile alla seguente:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**NOTA:** questo risultato è in wei, non in eth. Wei è usato come taglio più piccolo dell'ether. La conversione da wei a eth è: 1 eth = 10¹⁸ wei. Quindi se convertiamo 0xde0b6b3a7640000 in decimali, otteniamo 1\*10¹⁸, pari a 1 eth.

Meno male! I nostri soldi finti ci sono tutti! 🤑

### Passaggio 5: Collega MetaMask alla tua UI {#step-5-connect-metamask-to-your-UI}

Ora che il nostro portafoglio di MetaMask è configurato, connettiamo la nostra dapp!

#### La funzione `connectWallet` {#the-connectWallet-function}

Nel nostro file `interact.js`, implementiamo la funzione `connectWallet`, che potremo poi chiamare nel nostro componente `HelloWorld.js`.

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
        status: "👆🏽 Scrivi un messaggio nel campo di testo qui sopra.",
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
              Devi installare MetaMask, un portafoglio Ethereum virtuale, nel tuo
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Quindi, cosa fa esattamente questo enorme blocco di codice?

Beh, per prima cosa, controlla se `window.ethereum` è abilitato nel tuo browser.

`window.ethereum` è un'API globale iniettata da MetaMask e da altri provider di portafogli che consente ai siti web di richiedere gli account Ethereum degli utenti. Se approvato, può leggere i dati dalle blockchain a cui l'utente è connesso e suggerire all'utente di firmare messaggi e transazioni. Consulta la [documentazione di MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) per maggiori informazioni!

Se `window.ethereum` _non è_ presente, significa che MetaMask non è installato. Questo restituisce un oggetto JSON, in cui l'`address` restituito è una stringa vuota e l'oggetto JSX `status` comunica che l'utente deve installare MetaMask.

Ora, se `window.ethereum` _è_ presente, è qui che le cose si fanno interessanti.

Usando un ciclo try/catch, proveremo a connetterci a MetaMask chiamando [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Chiamare questa funzione aprirà MetaMask nel browser, dove sarà richiesto all'utente di connettere il proprio portafoglio alla tua dapp.

- Se l'utente sceglie di connettersi, `method: "eth_requestAccounts"` restituirà un array contenente gli indirizzi di tutti gli account dell'utente connessi alla dApp. Complessivamente, la nostra funzione `connectWallet` restituirà un oggetto JSON che contiene il _primo_ `address` in questo array (vedi riga 9) e un messaggio di `status` che chiede all'utente di scrivere un messaggio allo smart contract.
- Se l'utente rifiuta la connessione, l'oggetto JSON conterrà una stringa vuota per l'`address` restituito e un messaggio `status` che riflette il rifiuto della connessione da parte dell'utente.

Ora che abbiamo scritto questa funzione `connectWallet`, il passo successivo è chiamarla nel nostro componente `HelloWorld.js`.

#### Aggiungi la funzione `connectWallet` al tuo componente UI `HelloWorld.js` {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

Vai alla funzione `connectWalletPressed` in `HelloWorld.js` e aggiornala come segue:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Noti come la maggior parte della nostra funzionalità sia astratta dal nostro componente `HelloWorld.js` e si trovi nel file `interact.js`? Questo perché stiamo seguendo il modello M-V-C!

In `connectWalletPressed`, creiamo semplicemente una chiamata `await` alla nostra funzione `connectWallet` importata e, usando la sua risposta, aggiorniamo le nostre variabili `status` e `walletAddress` tramite i loro hook di stato.

Ora, salviamo entrambi i file (`HelloWorld.js` e `interact.js`) e testiamo la nostra interfaccia utente finora.

Apri il browser sulla pagina [http://localhost:3000/](http://localhost:3000/) e premi il pulsante "Connetti portafoglio" in alto a destra della pagina.

Se hai MetaMask installato, ti dovrebbe essere richiesto di connettere il tuo portafoglio alla tua dapp. Accetta l'invito a connetterti.

Dovresti vedere che il pulsante del portafoglio ora riflette che il tuo indirizzo è connesso! Fantasticooo 🔥

Prova quindi a ricaricare la pagina... strano. Il nostro pulsante del portafoglio ci sta richiedendo di connetterci a MetaMask, anche se è già connesso...

Tuttavia, non temere! Possiamo facilmente risolvere questo problema! Implementando `getCurrentWalletConnected`, che verificherà se un indirizzo è già connesso alla nostra dApp e aggiornerà l'interfaccia utente di conseguenza!

#### La funzione `getCurrentWalletConnected` {#the-getcurrentwalletconnected-function}

Aggiorna la tua funzione `getCurrentWalletConnected` nel file `interact.js` come segue:

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
          status: "👆🏽 Scrivi un messaggio nel campo di testo qui sopra.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connettiti a MetaMask usando il pulsante in alto a destra.",
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
              Devi installare MetaMask, un portafoglio Ethereum virtuale, nel tuo
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

La differenza principale è che, invece di chiamare il metodo `eth_requestAccounts`, che apre MetaMask perché l'utente connetta il proprio portafoglio, qui chiamiamo il metodo `eth_accounts` che, semplicemente, restituisce un array contenente gli indirizzi di MetaMask correntemente connessi alla nostra dApp.

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

Nota che stiamo usando la risposta alla nostra chiamata a `getCurrentWalletConnected` per aggiornare le nostre variabili di stato `walletAddress` e `status`.

Ora che hai aggiunto questo codice, proviamo ad aggiornare la finestra del browser.

Benissimoooo! Il pulsante dovrebbe dire che sei connesso e mostrare un'anteprima dell'indirizzo del tuo portafoglio connesso, anche dopo un refresh!

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
        setStatus("👆🏽 Scrivi un messaggio nel campo di testo qui sopra.")
      } else {
        setWallet("")
        setStatus("🦊 Connettiti a MetaMask usando il pulsante in alto a destra.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          Devi installare MetaMask, un portafoglio Ethereum virtuale, nel tuo browser.
        </a>
      </p>
    )
  }
}
```

Scommetto che a questo punto non hai nemmeno bisogno del nostro aiuto per capire cosa sta succedendo, ma per completezza, analizziamolo rapidamente:

- Innanzitutto, la nostra funzione controlla se `window.ethereum` è abilitato (cioè se MetaMask è installato).
  - In caso contrario, impostiamo semplicemente la nostra variabile di stato `status` su una stringa JSX che richiede all'utente di installare MetaMask.
  - Se è abilitato, configuriamo l'ascoltatore `window.ethereum.on("accountsChanged")` alla riga 3, affinché ascolti i cambiamenti di stato nel portafoglio di MetaMask, tra cui, quando l'utente connette un ulteriore account alla dApp, cambia account, o ne disconnette uno. Se è connesso almeno un account, la variabile di stato `walletAddress` è aggiornata come primo account nell'array `accounts`, restituito dall'ascoltatore. Altrimenti, `walletAddress` è impostato come una stringa vuota.

Infine, ma non meno importante, dobbiamo chiamarla nella nostra funzione `useEffect`:

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

### Passaggio 6: Implementa la funzione `updateMessage` {#step-6-implement-the-updateMessage-function}

Bene, siamo in dirittura d'arrivo! In `updateMessage` del tuo file `interact.js`, faremo quanto segue:

1. Assicurarci che il messaggio che vogliamo pubblicare nel nostro contratto intelligente sia valido
2. Firmare la transazione usando MetaMask
3. Chiamare questa funzione dal nostro componente frontend `HelloWorld.js`

Non ci vorrà molto; finiamo questa dApp!

#### Gestione degli errori di input {#input-error-handling}

Naturalmente, ha senso avere una qualche forma di gestione degli errori di input all'inizio della funzione.

Vorremo che la nostra funzione termini presto se non è installata alcuna estensione MetaMask, non c'è un portafoglio connesso (cioè, l'`address` passato è una stringa vuota), o il `message` è una stringa vuota. Aggiungiamo la seguente gestione degli errori a `updateMessage`:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connetti il tuo portafoglio MetaMask per aggiornare il messaggio sulla blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Il tuo messaggio non può essere una stringa vuota.",
    }
  }
}
```

Ora che abbiamo una corretta gestione degli errori di input, è il momento di firmare la transazione tramite MetaMask!

#### Firma della nostra transazione {#signing-our-transaction}

Se hai già familiarità con le transazioni Ethereum web3 tradizionali, il codice che scriveremo di seguito ti sarà molto familiare. Sotto il codice di gestione degli errori di input, aggiungi quanto segue a `updateMessage`:

```javascript
// interact.js

//imposta i parametri della transazione
const transactionParameters = {
  to: contractAddress, // Richiesto tranne durante le pubblicazioni di contratti.
  from: address, // deve corrispondere all'indirizzo attivo dell'utente.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//firma la transazione
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
          Visualizza lo stato della tua transazione su Etherscan!
        </a>
        <br />
        ℹ️ Una volta che la transazione sarà verificata dalla rete, il messaggio verrà
        aggiornato automaticamente.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

Analizziamo cosa sta accadendo. Per prima cosa, impostiamo i parametri delle nostre transazioni, dove:

- `to` specifica l'indirizzo del destinatario (il nostro smart contract)
- `from` specifica il firmatario della transazione, la variabile `address` che abbiamo passato alla nostra funzione
- `data` contiene la chiamata al metodo `update` del nostro contratto intelligente Hello World, ricevendo la nostra variabile stringa `message` come input

Quindi, facciamo una chiamata `await`, `window.ethereum.request`, in cui chiediamo a MetaMask di firmare la transazione. Nota che, alle righe 11 e 12, stiamo specificando il nostro metodo eth, `eth_sendTransaction`, e passando i nostri `transactionParameters`.

A questo punto, MetaMask si aprirà nel browser e richiederà all'utente di firmare o rifiutare la transazione.

- Se la transazione va a buon fine, la funzione restituirà un oggetto JSON in cui la stringa JSX `status` richiede all'utente di controllare Etherscan per ulteriori informazioni sulla sua transazione.
- Se la transazione non va a buon fine, la funzione restituirà un oggetto JSON in cui la stringa `status` trasmette il messaggio di errore.

Complessivamente, la nostra funzione `updateMessage` dovrebbe avere questo aspetto:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //gestione degli errori di input
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connetti il tuo portafoglio MetaMask per aggiornare il messaggio sulla blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Il tuo messaggio non può essere una stringa vuota.",
    }
  }

  //imposta i parametri della transazione
  const transactionParameters = {
    to: contractAddress, // Richiesto tranne durante le pubblicazioni di contratti.
    from: address, // deve corrispondere all'indirizzo attivo dell'utente.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //firma la transazione
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
            Visualizza lo stato della tua transazione su Etherscan!
          </a>
          <br />
          ℹ️ Una volta che la transazione sarà verificata dalla rete, il messaggio
          verrà aggiornato automaticamente.
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

Infine, ma non meno importante, dobbiamo connettere la nostra funzione `updateMessage` al nostro componente `HelloWorld.js`.

#### Connetti `updateMessage` al frontend `HelloWorld.js` {#connect-updatemessage-to-the-helloworld-js-frontend}

La nostra funzione `onUpdatePressed` dovrebbe effettuare una chiamata `await` alla funzione importata `updateMessage` e modificare la variabile di stato `status` per riflettere se la nostra transazione è andata a buon fine o meno:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

È super pulito e semplice. E indovina un po'... LA TUA DAPP È COMPLETA!!!

Vai avanti e prova il pulsante **Aggiorna**!

### Crea la tua dApp personalizzata {#make-your-own-custom-dapp}

Fantastico, sei arrivato alla fine del tutorial! Per ricapitolare, hai imparato a:

- Collegare un portafoglio MetaMask al tuo progetto dApp
- Leggere i dati dal tuo contratto intelligente usando l'API [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Firmare le transazioni di Ethereum usando MetaMask

Ora hai tutti gli strumenti per applicare le competenze apprese in questo tutorial per costruire il tuo progetto dApp personalizzato! Come sempre, se hai domande, non esitare a contattarci per chiedere aiuto sul [Discord di Alchemy](https://discord.gg/gWuC7zB). 🧙‍♂️

Una volta completato questo tutorial, facci sapere com'è stata la tua esperienza o se hai qualche feedback taggandoci su Twitter [@alchemyplatform](https://twitter.com/AlchemyPlatform)!
