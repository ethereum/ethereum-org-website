---
title: Smart contract Hello World per principianti
description: Tutorial introduttivo sulla scrittura e la distribuzione di un semplice smart contract su Ethereum.
author: "elanh"
tags: ["Solidity", "Hardhat", "Alchemy", "smart contract", "distribuzione"]
skill: beginner
breadcrumb: Contratto Hello World
lang: it
published: 2021-03-31
---

Se sei nuovo nello sviluppo su blockchain e non sai da dove iniziare, o se vuoi semplicemente capire come distribuire e interagire con gli smart contract, questa guida fa per te. Esamineremo la creazione e la distribuzione di un semplice smart contract sulla rete di test di Sepolia utilizzando un portafoglio virtuale [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/), [Hardhat](https://hardhat.org/) e [Alchemy](https://www.alchemy.com/eth) (non preoccuparti se non capisci ancora cosa significhi tutto questo, lo spiegheremo).

Una volta distribuito il tuo contratto, puoi [creare un'interfaccia utente per esso](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Se hai domande in qualsiasi momento, non esitare a contattarci nel [Discord di Alchemy](https://discord.gg/gWuC7zB)!

## Passaggio 1: Connettersi alla rete Ethereum {#step-1}

Ci sono molti modi per effettuare richieste alla catena di Ethereum. Per semplicità, utilizzeremo un account gratuito su Alchemy, una piattaforma per sviluppatori blockchain e un'API che ci consente di comunicare con la catena di Ethereum senza dover eseguire i nostri nodi. La piattaforma dispone anche di strumenti per sviluppatori per il monitoraggio e l'analisi che sfrutteremo in questo tutorial per capire cosa succede internamente nella distribuzione del nostro smart contract. Se non hai già un account Alchemy, [puoi registrarti gratuitamente qui](https://dashboard.alchemy.com/signup).

## Passaggio 2: Creare la tua app (e la chiave API) {#step-2}

Una volta creato un account Alchemy, puoi generare una chiave API creando un'app. Questo ci consentirà di effettuare richieste alla rete di test di Sepolia. Se non hai familiarità con le reti di test, dai un'occhiata a [questa pagina](/developers/docs/networks/).

1.  Vai alla pagina "Create new app" (Crea nuova app) nella tua Dashboard di Alchemy selezionando "Select an app" (Seleziona un'app) nella barra di navigazione e cliccando su "Create new app"

![Hello world create app](./hello-world-create-app.png)

2. Dai un nome alla tua app "Hello World", offri una breve descrizione e scegli un caso d'uso, ad es. "Infra & Tooling". Successivamente, cerca "Ethereum" e seleziona la rete.

![create app view hello world](./create-app-view-hello-world.png)

3. Clicca su "Next" (Avanti) per procedere, poi su "Create app" (Crea app) e il gioco è fatto! La tua app dovrebbe apparire nel menu a discesa della barra di navigazione, con una chiave API disponibile per essere copiata.

## Passaggio 3: Creare un account Ethereum (indirizzo) {#step-3}

Abbiamo bisogno di un account Ethereum per inviare e ricevere transazioni. Per questo tutorial, utilizzeremo MetaMask, un portafoglio virtuale nel browser utilizzato per gestire l'indirizzo del tuo account Ethereum. Maggiori informazioni sulle [transazioni](/developers/docs/transactions/).

Puoi scaricare MetaMask e creare un account Ethereum gratuitamente [qui](https://metamask.io/download). Quando crei un account, o se ne hai già uno, assicurati di passare alla rete di test "Sepolia" utilizzando il menu a discesa della rete (in modo da non avere a che fare con denaro reale).

Se non vedi Sepolia nell'elenco, apri il menu nell'angolo in alto a destra, seleziona "Networks" (Reti) e attiva "Show test networks" (Mostra reti di test) in fondo all'elenco delle reti (consulta la [guida di MetaMask per visualizzare le reti di test](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)). Quindi seleziona "Sepolia" nel menu di selezione della rete.

![metamask sepolia example](./metamask-sepolia-example.png)

## Passaggio 4: Aggiungere ether da un faucet {#step-4}

Per distribuire il nostro smart contract sulla rete di test, avremo bisogno di alcuni ETH finti. Per ottenere ETH di Sepolia puoi andare ai [dettagli della rete Sepolia](/developers/docs/networks/#sepolia) per visualizzare un elenco di vari faucet. Se uno non funziona, provane un altro poiché a volte possono esaurirsi. Alcuni faucet hanno regole di idoneità; ad esempio, il faucet Sepolia di Alchemy richiede che l'indirizzo di ricezione contenga almeno 0,001 ETH sulla Mainnet di Ethereum. Potrebbe volerci del tempo per ricevere i tuoi ETH finti a causa del traffico di rete. Dovresti vedere gli ETH nel tuo account MetaMask poco dopo!

## Passaggio 5: Controllare il tuo saldo {#step-5}

Per verificare che il nostro saldo sia presente, facciamo una richiesta [eth_getBalance](/developers/docs/apis/json-rpc/#eth-getbalance) utilizzando lo [strumento composer di Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Questo restituirà la quantità di ETH nel nostro portafoglio. Dopo aver inserito l'indirizzo del tuo account MetaMask e cliccato su "Send Request" (Invia richiesta), dovresti vedere una risposta come questa:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **NOTA:** Questo risultato è in Wei, non in ETH. Il Wei è utilizzato come la più piccola denominazione di ether. La conversione da Wei a ETH è: 1 eth = 10<sup>18</sup> Wei. Quindi, se convertiamo 0x2B5E3AF16B1880000 in decimale otteniamo 5\*10¹⁸ che equivale a 5 ETH.
>
> Fiuu! I nostri soldi finti ci sono tutti <Emoji text=":money_mouth_face:" size={1} />.

## Passaggio 6: Inizializzare il nostro progetto {#step-6}

Per prima cosa, dovremo creare una cartella per il nostro progetto. Vai alla riga di comando e digita:

```sh
mkdir hello-world
cd hello-world
```

Ora che siamo all'interno della cartella del nostro progetto, utilizzeremo `npm init` per inizializzare il progetto. Se non hai già installato npm, segui [le istruzioni di installazione di Node.js](https://nodejs.org/en/download/) (avremo bisogno di Node.js e npm per questo tutorial).

```sh
npm init
```

Non importa molto come rispondi alle domande di installazione, ecco come l'abbiamo fatto noi come riferimento:

```text
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

Approva il package.json. Hardhat 3, che installeremo in seguito, supporta solo i progetti di moduli ES, quindi contrassegna il progetto come tale:

```sh
npm pkg set type=module
```

E siamo pronti per partire!

## Passaggio 7: Scaricare [Hardhat](https://hardhat.org/docs/getting-started) {#step-7}

Hardhat è un ambiente di sviluppo per compilare, distribuire, testare ed eseguire il debug del tuo software Ethereum. Aiuta gli sviluppatori a creare smart contract e applicazioni decentralizzate (dapp) localmente prima di distribuirle sulla catena attiva.

Hardhat 3 richiede Node.js v22.13.0 o versioni successive. All'interno del nostro progetto `hello-world` esegui:

```sh
npm install --save-dev hardhat
```

Dai un'occhiata a questa pagina per maggiori dettagli sulle [istruzioni di installazione](https://hardhat.org/docs/getting-started).

## Passaggio 8: Creare il progetto Hardhat {#step-8}

L'esecuzione di `npx hardhat --init` genererebbe un progetto di esempio completo, ma per questo tutorial imposteremo le cose manualmente in modo che tu possa vedere ogni pezzo. Nella radice della cartella del tuo progetto, crea un file chiamato `hardhat.config.js` con i seguenti contenuti:

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

Qui è dove specificheremo tutta la configurazione per il nostro progetto (nel passaggio 13). Per ora, dice semplicemente ad Hardhat quale versione del compilatore Solidity utilizzare.

## Passaggio 9: Aggiungere le cartelle del progetto {#step-9}

Per mantenere organizzato il nostro progetto creeremo due nuove cartelle. Vai alla directory principale del tuo progetto nella riga di comando e digita:

```sh
mkdir contracts
mkdir scripts
```

- `contracts/` è dove conserveremo il file di codice del nostro smart contract hello world
- `scripts/` è dove conserveremo gli script per distribuire e interagire con il nostro contratto

## Passaggio 10: Scrivere il nostro contratto {#step-10}

Potresti chiederti: quando diavolo scriveremo il codice?? Bene, eccoci qui, al passaggio 10.

Apri il progetto hello-world nel tuo editor preferito (a noi piace [VSCode](https://code.visualstudio.com/)). Gli smart contract sono scritti in un linguaggio chiamato Solidity, che è quello che useremo per scrivere il nostro smart contract HelloWorld.sol.‌

1.  Vai alla cartella "contracts" e crea un nuovo file chiamato HelloWorld.sol
2.  Di seguito è riportato uno smart contract Hello World di esempio della Fondazione Ethereum che utilizzeremo per questo tutorial. Copia e incolla i contenuti sottostanti nel tuo file HelloWorld.sol e assicurati di leggere i commenti per capire cosa fa questo contratto:

```solidity
// SPDX-License-Identifier: MIT
// Specifica la versione di Solidity, utilizzando il versionamento semantico.
// Scopri di più: https://docs.soliditylang.org/en/latest/layout-of-source-files.html#pragma
pragma solidity ^0.8.24;

// Definisce un contratto chiamato `HelloWorld`.
// Un contratto è una raccolta di funzioni e dati (il suo stato). Una volta distribuito, un contratto risiede a un indirizzo specifico sulla blockchain di Ethereum. Scopri di più: https://docs.soliditylang.org/en/latest/structure-of-a-contract.html
contract HelloWorld {

   // Dichiara una variabile di stato `message` di tipo `string`.
   // Le variabili di stato sono variabili i cui valori sono memorizzati in modo permanente nell'archiviazione del contratto. La parola chiave `public` rende le variabili accessibili dall'esterno di un contratto e crea una funzione che altri contratti o client possono chiamare per accedere al valore.
   string public message;

   // Similmente a molti linguaggi orientati agli oggetti basati su classi, un costruttore è una funzione speciale che viene eseguita solo alla creazione del contratto.
   // I costruttori sono usati per inizializzare i dati del contratto. Scopri di più: https://docs.soliditylang.org/en/latest/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accetta un argomento stringa `initMessage` e imposta il valore nella variabile di archiviazione `message` del contratto).
      message = initMessage;
   }

   // Una funzione pubblica che accetta un argomento stringa e aggiorna la variabile di archiviazione `message`.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

Questo è uno smart contract semplicissimo che memorizza un messaggio al momento della creazione e può essere aggiornato chiamando la funzione `update`.

## Passaggio 11: Connettere MetaMask e Alchemy al tuo progetto {#step-11}

Abbiamo creato un portafoglio MetaMask, un account Alchemy e scritto il nostro smart contract, ora è il momento di connettere i tre.

Ogni transazione inviata dal tuo portafoglio virtuale richiede una firma utilizzando la tua chiave privata univoca. Per fornire al nostro programma questa autorizzazione, possiamo archiviare in modo sicuro la nostra chiave privata (e la chiave API di Alchemy) in un file di ambiente.

> Per saperne di più sull'invio di transazioni, dai un'occhiata alla [documentazione sulle transazioni](/developers/docs/transactions/).

Crea un file `.env` nella directory principale del nostro progetto e aggiungi la tua chiave privata di MetaMask e l'URL dell'API HTTP di Alchemy.

- Segui [queste istruzioni](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) per esportare la tua chiave privata
- Vedi sotto per ottenere l'URL dell'API HTTP di Alchemy

![get alchemy api key](./get-alchemy-api-key.png)

Copia l'URL dell'API di Alchemy

Il tuo `.env` dovrebbe assomigliare a questo:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Per connetterli effettivamente al nostro codice, faremo riferimento a queste variabili nel nostro file `hardhat.config.js` al passaggio 13. Node.js può leggere i file `.env` da solo, quindi non c'è nessun pacchetto aggiuntivo da installare.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Non committare <code>.env</code>! Assicurati di non condividere o esporre mai il tuo file <code>.env</code> a nessuno, poiché così facendo comprometti i tuoi segreti. Se stai utilizzando il controllo della versione, aggiungi il tuo <code>.env</code> a un file <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Passaggio 12: Installare Ethers.js {#step-12-install-ethersjs}

Ethers.js è una libreria che semplifica l'interazione e l'effettuazione di richieste a Ethereum avvolgendo i [metodi JSON-RPC standard](/developers/docs/apis/json-rpc/) con metodi più intuitivi.

Hardhat rende semplicissimo integrare i [Plugin](https://hardhat.org/docs/plugins/official-plugins) per strumenti aggiuntivi e funzionalità estese. Sfrutteremo il [plugin Ethers](https://hardhat.org/docs/plugins/hardhat-ethers) per la distribuzione del contratto ([Ethers.js](https://docs.ethers.org/v6/) ha alcuni metodi di distribuzione del contratto molto puliti).

Nella directory del tuo progetto digita:

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

Aggiungeremo anche il plugin al nostro `hardhat.config.js` nel passaggio successivo.

## Passaggio 13: Aggiornare hardhat.config.js {#step-13-update-hardhatconfigjs}

Finora abbiamo aggiunto diverse dipendenze e plugin, ora dobbiamo aggiornare `hardhat.config.js` in modo che il nostro progetto li conosca tutti.

Aggiorna il tuo `hardhat.config.js` in modo che assomigli a questo:

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

## Passaggio 14: Compilare il nostro contratto {#step-14-compile-our-contracts}

Per assicurarci che tutto funzioni finora, compiliamo il nostro contratto. L'attività `compile` è una delle attività integrate di Hardhat.

Dalla riga di comando esegui:

```sh
npx hardhat compile
```

La prima volta che compili, Hardhat scarica il compilatore Solidity. Dovresti quindi vedere qualcosa come `Compiled 1 Solidity file with solc 0.8.34`. In caso contrario, puoi sempre inviare un messaggio nel [Discord di Alchemy](https://discord.gg/gWuC7zB).

## Passaggio 15: Scrivere il nostro script di distribuzione {#step-15-write-our-deploy-scripts}

Ora che il nostro contratto è stato scritto e il nostro file di configurazione è pronto, è il momento di scrivere il nostro script di distribuzione del contratto.

Vai alla cartella `scripts/` e crea un nuovo file chiamato `deploy.js`, aggiungendovi i seguenti contenuti:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const HelloWorld = await ethers.getContractFactory("HelloWorld")

// Avvia la distribuzione, restituendo una promise che si risolve in un oggetto contratto
const hello_world = await HelloWorld.deploy("Hello World!")
await hello_world.waitForDeployment()
console.log("Contract deployed to address:", await hello_world.getAddress())
```

Esaminiamo cosa fa ciascuna di queste righe di codice.

```js
const { ethers } = await network.create()
```

In Hardhat 3, uno script apre esplicitamente una connessione a una rete. `network.create()` si connette alla rete che scegli con l'opzione `--network` quando esegui lo script, e il plugin `hardhat-ethers` aggiunge un oggetto `ethers` a quella connessione.

```js
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

Una `ContractFactory` in Ethers.js è un'astrazione utilizzata per distribuire nuovi smart contract, quindi `HelloWorld` qui è una fabbrica per le istanze del nostro contratto hello world. Quando si utilizza il plugin `hardhat-ethers`, le istanze `ContractFactory` e `Contract` sono connesse al primo firmatario per impostazione predefinita.

```js
const hello_world = await HelloWorld.deploy("Hello World!")
```

Chiamare `deploy()` su una `ContractFactory` avvierà la distribuzione e restituirà una `Promise` che si risolve in un `Contract`. Questo è l'oggetto che ha un metodo per ciascuna delle funzioni del nostro smart contract. Gli argomenti che passi a `deploy()` vanno al costruttore del contratto, qui il messaggio iniziale.

`waitForDeployment()` attende finché la transazione di distribuzione non viene inclusa in un blocco e `getAddress()` restituisce l'indirizzo del nuovo contratto. Consulta la [documentazione del contratto di Ethers.js](https://docs.ethers.org/v6/api/contract/) per maggiori dettagli.

## Passaggio 16: Distribuire il nostro contratto {#step-16-deploy-our-contract}

Siamo finalmente pronti per distribuire il nostro smart contract! Vai alla riga di comando ed esegui:

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

Dovresti quindi vedere qualcosa del genere:

```text
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Se andiamo su [Etherscan di Sepolia](https://sepolia.etherscan.io/) e cerchiamo l'indirizzo del nostro contratto, dovremmo essere in grado di vedere che è stato distribuito con successo. La transazione assomiglierà a questa:

![etherscan contract](./etherscan-contract.png)

L'indirizzo `From` dovrebbe corrispondere all'indirizzo del tuo account MetaMask e l'indirizzo `To` dirà "Contract Creation", ma se clicchiamo sulla transazione vedremo l'indirizzo del nostro contratto nel campo `To`:

![etherscan transaction](./etherscan-transaction.png)

Congratulazioni! Hai appena distribuito uno smart contract sulla catena di Ethereum 🎉

Per capire cosa sta succedendo internamente, puoi guardare le richieste che la tua app "Hello World" ha ricevuto nella tua [dashboard di Alchemy](https://dashboard.alchemy.com/).

Lì vedrai una manciata di chiamate JSON-RPC che Hardhat/Ethers ha effettuato dietro le quinte per noi quando abbiamo chiamato la funzione `.deploy()`. Due importanti da segnalare qui sono [`eth_sendRawTransaction`](/developers/docs/apis/json-rpc/#eth-sendrawtransaction), che è la richiesta per scrivere effettivamente il nostro contratto sulla catena di Sepolia, ed [`eth_getTransactionByHash`](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash) che è una richiesta per leggere informazioni sulla nostra transazione dato l'hash (un modello tipico quando si inviano transazioni). Per saperne di più sull'invio di transazioni, dai un'occhiata alla [documentazione sulle transazioni](/developers/docs/transactions/).

Questo è tutto per questo tutorial. Successivamente, puoi [creare un'interfaccia utente per il tuo contratto](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).
