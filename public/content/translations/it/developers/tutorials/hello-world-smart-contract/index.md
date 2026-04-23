---
title: Contratto intelligente Hello World per principianti
description: Tutorial introduttivo sulla scrittura e la distribuzione di un semplice contratto intelligente su Ethereum.
author: "elanh"
tags: ["Solidity", "Hardhat", "Alchemy", "contratti intelligenti", "distribuzione"]
skill: beginner
breadcrumb: Contratto Hello World
lang: it
published: 2021-03-31
---

Se sei nuovo nello sviluppo su blockchain e non sai da dove iniziare, o se vuoi semplicemente capire come distribuire e interagire con i contratti intelligenti, questa guida fa per te. Ti guideremo attraverso la creazione e la distribuzione di un semplice contratto intelligente sulla rete di test Sepolia utilizzando un portafoglio virtuale [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/) e [Alchemy](https://www.alchemy.com/eth) (non preoccuparti se non capisci ancora cosa significhi tutto questo, lo spiegheremo).

Nella [parte 2](https://docs.alchemy.com/docs/interacting-with-a-smart-contract) di questo tutorial vedremo come interagire con il nostro contratto intelligente una volta distribuito qui, e nella [parte 3](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) spiegheremo come pubblicarlo su Etherscan.

Se hai domande in qualsiasi momento, sentiti libero di contattarci nel [Discord di Alchemy](https://discord.gg/gWuC7zB)!

## Passaggio 1: Connettiti alla rete Ethereum {#step-1}

Ci sono molti modi per fare richieste alla catena di Ethereum. Per semplicità, useremo un account gratuito su Alchemy, una piattaforma per sviluppatori blockchain e API che ci consente di comunicare con la catena di Ethereum senza dover eseguire i nostri nodi. La piattaforma dispone anche di strumenti per sviluppatori per il monitoraggio e l'analisi che sfrutteremo in questo tutorial per capire cosa succede dietro le quinte nella distribuzione del nostro contratto intelligente. Se non hai già un account Alchemy, [puoi registrarti gratuitamente qui](https://dashboard.alchemy.com/signup).

## Passaggio 2: Crea la tua app (e la chiave API) {#step-2}

Una volta creato un account Alchemy, puoi generare una chiave API creando un'app. Questo ci consentirà di fare richieste alla rete di test Sepolia. Se non hai familiarità con le reti di test, dai un'occhiata a [questa pagina](/developers/docs/networks/).

1.  Naviga alla pagina "Create new app" (Crea nuova app) nella tua Dashboard di Alchemy selezionando "Select an app" (Seleziona un'app) nella barra di navigazione e cliccando su "Create new app"

![Hello world create app](./hello-world-create-app.png)

2. Dai un nome alla tua app "Hello World", offri una breve descrizione e scegli un caso d'uso, ad es. "Infra & Tooling". Successivamente, cerca "Ethereum" e seleziona la rete.

![create app view hello world](./create-app-view-hello-world.png)

3. Clicca su "Next" (Avanti) per procedere, poi su "Create app" (Crea app) e il gioco è fatto! La tua app dovrebbe apparire nel menu a discesa della barra di navigazione, con una chiave API disponibile per essere copiata.

## Passaggio 3: Crea un account Ethereum (indirizzo) {#step-3}

Abbiamo bisogno di un account Ethereum per inviare e ricevere transazioni. Per questo tutorial, useremo MetaMask, un portafoglio virtuale nel browser utilizzato per gestire l'indirizzo del tuo account Ethereum. Maggiori informazioni sulle [transazioni](/developers/docs/transactions/).

Puoi scaricare MetaMask e creare un account Ethereum gratuitamente [qui](https://metamask.io/download). Quando crei un account, o se ne hai già uno, assicurati di passare alla rete di test "Sepolia" utilizzando il menu a discesa della rete (in modo da non avere a che fare con denaro reale).

Se non vedi Sepolia nell'elenco, vai nel menu, poi su Advanced (Avanzate) e scorri verso il basso per attivare "Show test networks" (Mostra reti di test). Nel menu di selezione della rete, scegli la scheda "Custom" (Personalizzata) per trovare un elenco di reti di test e seleziona "Sepolia".

![metamask sepolia example](./metamask-sepolia-example.png)

## Passaggio 4: Aggiungi ether da un rubinetto {#step-4}

Per distribuire il nostro contratto intelligente sulla rete di test, avremo bisogno di alcuni finti ETH. Per ottenere ETH di Sepolia puoi andare ai [dettagli della rete Sepolia](/developers/docs/networks/#sepolia) per visualizzare un elenco di vari rubinetti. Se uno non funziona, provane un altro poiché a volte possono esaurirsi. Potrebbe volerci del tempo per ricevere i tuoi finti ETH a causa del traffico di rete. Dovresti vedere gli ETH nel tuo account MetaMask subito dopo!

## Passaggio 5: Controlla il tuo saldo {#step-5}

Per verificare che il nostro saldo sia presente, facciamo una richiesta [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) utilizzando lo [strumento composer di Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Questo restituirà la quantità di ETH nel nostro portafoglio. Dopo aver inserito l'indirizzo del tuo account MetaMask e cliccato su "Send Request" (Invia richiesta), dovresti vedere una risposta come questa:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **NOTA:** Questo risultato è in wei, non in ETH. Il wei è utilizzato come la più piccola denominazione di ether. La conversione da wei a ETH è: 1 eth = 10<sup>18</sup> wei. Quindi, se convertiamo 0x2B5E3AF16B1880000 in decimale otteniamo 5\*10¹⁸ che equivale a 5 ETH.
>
> Fiuu! I nostri soldi finti ci sono tutti <Emoji text=":money_mouth_face:" size={1} />.

## Passaggio 6: Inizializza il nostro progetto {#step-6}

Per prima cosa, dovremo creare una cartella per il nostro progetto. Naviga nella tua riga di comando e digita:

```
mkdir hello-world
cd hello-world
```

Ora che siamo all'interno della cartella del nostro progetto, useremo `npm init` per inizializzare il progetto. Se non hai già installato npm, segui [queste istruzioni](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (avremo bisogno anche di Node.js, quindi scarica anche quello!).

```
npm init
```

Non importa molto come rispondi alle domande di installazione, ecco come abbiamo fatto noi come riferimento:

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
     "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Approva il package.json e siamo pronti a partire!

## Passaggio 7: Scarica [Hardhat](https://hardhat.org/getting-started/#overview) {#step-7}

Hardhat è un ambiente di sviluppo per compilare, distribuire, testare ed eseguire il debug del tuo software Ethereum. Aiuta gli sviluppatori nella creazione di contratti intelligenti e dApp localmente prima della distribuzione sulla catena live.

All'interno del nostro progetto `hello-world` esegui:

```
npm install --save-dev hardhat
```

Dai un'occhiata a questa pagina per maggiori dettagli sulle [istruzioni di installazione](https://hardhat.org/getting-started/#overview).

## Passaggio 8: Crea il progetto Hardhat {#step-8}

All'interno della cartella del nostro progetto esegui:

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

👷 Welcome to Hardhat v2.0.11 👷‍?

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Questo genererà un file `hardhat.config.js` per noi, che è dove specificheremo tutta la configurazione per il nostro progetto (nel passaggio 13).

## Passaggio 9: Aggiungi le cartelle del progetto {#step-9}

Per mantenere organizzato il nostro progetto creeremo due nuove cartelle. Naviga nella directory principale del tuo progetto nella riga di comando e digita:

```
mkdir contracts
mkdir scripts
```

- `contracts/` è dove conserveremo il file di codice del nostro contratto intelligente hello world
- `scripts/` è dove conserveremo gli script per distribuire e interagire con il nostro contratto

## Passaggio 10: Scrivi il nostro contratto {#step-10}

Ti starai chiedendo, quando diavolo scriveremo il codice?? Bene, eccoci qui, al passaggio 10.

Apri il progetto hello-world nel tuo editor preferito (a noi piace [VSCode](https://code.visualstudio.com/)). I contratti intelligenti sono scritti in un linguaggio chiamato Solidity, che è quello che useremo per scrivere il nostro contratto intelligente HelloWorld.sol.‌

1.  Naviga nella cartella "contracts" e crea un nuovo file chiamato HelloWorld.sol
2.  Di seguito è riportato un esempio di contratto intelligente Hello World della Ethereum Foundation che useremo per questo tutorial. Copia e incolla i contenuti sottostanti nel tuo file HelloWorld.sol e assicurati di leggere i commenti per capire cosa fa questo contratto:

```solidity
// Specifica la versione di Solidity, utilizzando il versionamento semantico.
// Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// Definisce un contratto chiamato `HelloWorld`.
// Un contratto è una raccolta di funzioni e dati (il suo stato). Una volta distribuito, un contratto risiede a un indirizzo specifico sulla blockchain di Ethereum. Scopri di più: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Dichiara una variabile di stato `message` di tipo `string`.
   // Le variabili di stato sono variabili i cui valori sono memorizzati in modo permanente nell'archiviazione del contratto. La parola chiave `public` rende le variabili accessibili dall'esterno di un contratto e crea una funzione che altri contratti o client possono chiamare per accedere al valore.
   string public message;

   // Similmente a molti linguaggi orientati agli oggetti basati su classi, un costruttore è una funzione speciale che viene eseguita solo alla creazione del contratto.
   // I costruttori sono usati per inizializzare i dati del contratto. Scopri di più:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
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

Questo è un contratto intelligente semplicissimo che memorizza un messaggio al momento della creazione e può essere aggiornato chiamando la funzione `update`.

## Passaggio 11: Connetti MetaMask e Alchemy al tuo progetto {#step-11}

Abbiamo creato un portafoglio MetaMask, un account Alchemy e scritto il nostro contratto intelligente, ora è il momento di connettere i tre.

Ogni transazione inviata dal tuo portafoglio virtuale richiede una firma utilizzando la tua chiave privata univoca. Per fornire al nostro programma questa autorizzazione, possiamo archiviare in modo sicuro la nostra chiave privata (e la chiave API di Alchemy) in un file di ambiente.

> Per saperne di più sull'invio di transazioni, dai un'occhiata a [questo tutorial](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) sull'invio di transazioni utilizzando web3.

Per prima cosa, installa il pacchetto dotenv nella directory del tuo progetto:

```
npm install dotenv --save
```

Quindi, crea un file `.env` nella directory principale del nostro progetto e aggiungi la tua chiave privata MetaMask e l'URL dell'API HTTP di Alchemy.

- Segui [queste istruzioni](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) per esportare la tua chiave privata
- Vedi sotto per ottenere l'URL dell'API HTTP di Alchemy

![get alchemy api key](./get-alchemy-api-key.png)

Copia l'URL dell'API di Alchemy

Il tuo `.env` dovrebbe apparire così:

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Per connetterli effettivamente al nostro codice, faremo riferimento a queste variabili nel nostro file `hardhat.config.js` nel passaggio 13.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Non committare <code>.env</code>! Assicurati di non condividere o esporre mai il tuo file <code>.env</code> a nessuno, poiché così facendo comprometti i tuoi segreti. Se stai utilizzando il controllo di versione, aggiungi il tuo <code>.env</code> a un file <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Passaggio 12: Installa Ethers.js {#step-12-install-ethersjs}

Ethers.js è una libreria che semplifica l'interazione e l'esecuzione di richieste a Ethereum avvolgendo i [metodi JSON-RPC standard](/developers/docs/apis/json-rpc/) con metodi più intuitivi.

Hardhat rende facilissimo integrare i [Plugin](https://hardhat.org/plugins/) per strumenti aggiuntivi e funzionalità estese. Sfrutteremo il [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) per la distribuzione dei contratti ([Ethers.js](https://github.com/ethers-io/ethers.js/) ha alcuni metodi di distribuzione dei contratti estremamente puliti).

Nella directory del tuo progetto digita:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

Richiederemo anche ethers nel nostro `hardhat.config.js` nel passaggio successivo.

## Passaggio 13: Aggiorna hardhat.config.js {#step-13-update-hardhatconfigjs}

Finora abbiamo aggiunto diverse dipendenze e plugin, ora dobbiamo aggiornare `hardhat.config.js` in modo che il nostro progetto li conosca tutti.

Aggiorna il tuo `hardhat.config.js` in modo che appaia così:

```
require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
   solidity: "0.7.3",
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

## Passaggio 14: Compila il nostro contratto {#step-14-compile-our-contracts}

Per assicurarci che tutto funzioni finora, compiliamo il nostro contratto. L'attività `compile` è una delle attività integrate di hardhat.

Dalla riga di comando esegui:

```
npx hardhat compile
```

Potresti ricevere un avviso su `SPDX license identifier not provided in source file`, ma non c'è bisogno di preoccuparsi: si spera che tutto il resto vada bene! In caso contrario, puoi sempre inviare un messaggio nel [Discord di Alchemy](https://discord.gg/u72VCg3).

## Passaggio 15: Scrivi il nostro script di distribuzione {#step-15-write-our-deploy-scripts}

Ora che il nostro contratto è scritto e il nostro file di configurazione è pronto, è il momento di scrivere il nostro script di distribuzione del contratto.

Naviga nella cartella `scripts/` e crea un nuovo file chiamato `deploy.js`, aggiungendovi i seguenti contenuti:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Start deployment, returning a promise that resolves to a contract object
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contract deployed to address:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat fa un lavoro straordinario nello spiegare cosa fa ciascuna di queste righe di codice nel loro [tutorial sui Contratti](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), abbiamo adottato le loro spiegazioni qui.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

Una `ContractFactory` in ethers.js è un'astrazione utilizzata per distribuire nuovi contratti intelligenti, quindi `HelloWorld` qui è una fabbrica per le istanze del nostro contratto hello world. Quando si utilizza il plugin `hardhat-ethers`, le istanze `ContractFactory` e `Contract` sono connesse al primo firmatario per impostazione predefinita.

```
const hello_world = await HelloWorld.deploy();
```

Chiamare `deploy()` su una `ContractFactory` avvierà la distribuzione e restituirà una `Promise` che si risolve in un `Contract`. Questo è l'oggetto che ha un metodo per ciascuna delle funzioni del nostro contratto intelligente.

## Passaggio 16: Distribuisci il nostro contratto {#step-16-deploy-our-contract}

Siamo finalmente pronti per distribuire il nostro contratto intelligente! Naviga nella riga di comando ed esegui:

```
npx hardhat run scripts/deploy.js --network sepolia
```

Dovresti quindi vedere qualcosa del genere:

```
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Se andiamo su [Sepolia etherscan](https://sepolia.etherscan.io/) e cerchiamo l'indirizzo del nostro contratto, dovremmo essere in grado di vedere che è stato distribuito con successo. La transazione apparirà più o meno così:

![etherscan contract](./etherscan-contract.png)

L'indirizzo `From` dovrebbe corrispondere all'indirizzo del tuo account MetaMask e l'indirizzo To dirà "Contract Creation" (Creazione del contratto), ma se clicchiamo sulla transazione vedremo l'indirizzo del nostro contratto nel campo `To`:

![etherscan transaction](./etherscan-transaction.png)

Congratulazioni! Hai appena distribuito un contratto intelligente sulla catena di Ethereum 🎉

Per capire cosa succede dietro le quinte, navighiamo nella scheda Explorer nella nostra [dashboard di Alchemy](https://dashboard.alchemyapi.io/explorer). Se hai più app Alchemy, assicurati di filtrare per app e seleziona "Hello World".
![hello world explorer](./hello-world-explorer.png)

Qui vedrai una manciata di chiamate JSON-RPC che Hardhat/Ethers ha effettuato dietro le quinte per noi quando abbiamo chiamato la funzione `.deploy()`. Due importanti da segnalare qui sono [`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction), che è la richiesta per scrivere effettivamente il nostro contratto sulla catena Sepolia, e [`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash) che è una richiesta per leggere informazioni sulla nostra transazione dato l'hash (un modello tipico quando si effettuano transazioni). Per saperne di più sull'invio di transazioni, dai un'occhiata a questo tutorial sull'[invio di transazioni utilizzando Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)

Questo è tutto per la parte 1 di questo tutorial, nella parte 2 [interagiremo effettivamente con il nostro contratto intelligente](https://www.alchemy.com/docs/interacting-with-a-smart-contract) aggiornando il nostro messaggio iniziale, e nella parte 3 [pubblicheremo il nostro contratto intelligente su Etherscan](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) in modo che tutti sappiano come interagire con esso.

**Vuoi saperne di più su Alchemy? Dai un'occhiata al nostro [sito web](https://www.alchemy.com/eth). Non vuoi mai perderti un aggiornamento? Iscriviti alla nostra newsletter [qui](https://www.alchemy.com/newsletter)! Assicurati anche di unirti al nostro [Discord](https://discord.gg/u72VCg3).**