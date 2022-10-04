---
title: Smart Contract "Hello World" per principianti
description: Tutorial introduttivo su come scrivere e distribuire un semplice smart contract su Ethereum.
author: "elanh"
tags:
  - "solidity"
  - "hardhat"
  - "alchemy"
  - "smart contract"
  - "primi passi"
  - "distribuzione"
skill: beginner
lang: it
published: 2021-03-31
---

Se hai appena iniziato con lo sviluppo blockchain e non sai da dove cominciare, oppure se sei solo interessato a capire come distribuire e interagire con gli smart contract, questa è la guida che fa al caso tuo. Ti mostreremo come creare e distribuire un semplice smart contract in una rete di prova Ropsten utilizzando un portafoglio virtuale ([MetaMask](https://metamask.io/)), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/) e [Alchemy](https://alchemyapi.io/eth). (Non aver paura se non capisci subito cosa vuole dire tutto questo, ti verrà spiegato a breve).

Nella seconda parte di questo tutorial vedremo come interagire con il nostro smart contract una volta distribuito, e nella terza parte vedremo come pubblicarlo su Etherscan.

Se in qualsiasi momento hai domande, non esitare a contattarci nel [Discord di Alchemy](https://discord.gg/gWuC7zB)!

## Fase 1: connettersi alla rete di Ethereum {#step-1}

Esistono molti modi per effettuare richieste alla catena di Ethereum. Per semplicità, ci serviremo di un account gratuito su Alchemy, una piattaforma per sviluppatori di blockchain e API che ci consentirà di comunicare con la catena di Ethereum senza aver bisogno di eseguire dei nostri nodi. La piattaforma offre anche strumenti di analisi e monitoraggio di cui ci serviremo in questo tutorial per comprendere al meglio l'andamento della distribuzione del nostro smart contract. Se non sei già in possesso di un account Alchemy gratuito, [puoi iscriverti gratuitamente qui](https://dashboard.alchemyapi.io/signup).

## Fase 2: crea la tua app (e chiave API) {#step-2}

Una volta creato un profilo di Alchemy, puoi generare una chiave API creando un'app. Questo ci consentirà di effettuare richieste alla rete di prova di Ropsten. Se non hai familiarità con le reti di prova, dai un'occhiata a [questa pagina](/developers/docs/networks/).

1.  Vai alla pagina “Crea App” nella tua dashboard di Alchemy passando su “App” nella barra di navigazione e cliccando “Crea App”

![Creare l'app Hello world](./hello-world-create-app.png)

2. Assegna alla tua app il nome "Hello world", aggiungi una breve descrizione, seleziona “Staging” come Ambiente (serve per la contabilità della tua app) e scegli "Ropsten" come rete.

![Vista della creazione dell'app Hello world](./create-app-view-hello-world.png)

3. Clicca “Create app” ed è tutto! La tua app dovrebbe apparire nella tabella seguente.

## Fase 3: crea un profilo di Ethereum (indirizzo) {#step-3}

Per inviare e ricevere transazioni serve un profilo Ethereum. Per questo tutorial, useremo MetaMask, un portafoglio virtuale nel browser per gestire l'indirizzo del tuo profilo Ethereum. Maggiori informazioni sulle [transazioni](/developers/docs/transactions/).

Puoi scaricare e creare gratuitamente un account MetaMask [qui](https://metamask.io/download.html). Quando crei un profilo, o se ne hai già uno, assicurati di passare alla "Rete di Prova Ropsten" in alto a destra (per non avere a che fare con soldi reali).

![esempio ropsten metamask](./metamask-ropsten-example.png)

## Fase 4: aggiungi ether da un Faucet {#step-4}

Per poter distribuire il nostro smart contract alla rete di prova, avremo bisogno di di ETH finti. Per ottenere ETH puoi andare al [faucet di Ropsten](https://faucet.dimensions.network/) e inserire l'indirizzo del tuo profilo di Ropsten, poi clicca su “Invia ETH a Ropsten. A causa del traffico in rete, potrebbe essere necessario un po' di tempo per ricevere i tuoi ETH fittizi. Subito dopo dovresti vedere gli ETH nel tuo account MetaMask!

## Fase 5: controlla il saldo {#step-5}

Per ricontrollare che ci sia il saldo, facciamo una richiesta [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) usando lo [strumento compositore di Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Questo restituirà l'importo di ETH nel nostro portafoglio. Dopo aver inserito l'indirizzo del tuo account di MetaMask e aver cliccato “Invia richiesta”, dovresti vedere una risposta come questa:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **NOTA:** Questo risultato è in wei non in ETH. Wei è usato come taglio più piccolo dell'ether. La conversione da wei a ETH è: 1 eth = 10<sup>18</sup> wei. Quindi se convertiamo 0x2B5E3AF16B1880000 in decimali, otteniamo 5\*10¹⁸, pari a 5 ETH.
>
> Menomale! I nostri soldi finti ci sono tutti <Emoji text=":money_mouth_face:" size={1} />.

## Fase 6: inizializza il progetto {#step-6}

Prima, dovremo creare una cartella per il nostro progetto. Vai alla riga di comando e digita:

```
mkdir hello-world
cd hello-world
```

Ora che siamo nella cartella del nostro progetto, useremo `npm init` per inizializzare il progetto. Se non hai già installato npm, segui [queste istruzioni](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (avremo bisogno anche di Node.js, quindi scarica anche questo!).

```
npm init
```

Non è rilevante come rispondi alle domande d'installazione, ecco le nostre risposte come esempio:

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
About to write to /Users/.../.../.../hello-world/package.json:

{
  "name": "hello-world",
  "version": "1.0.0",
  "description": "contratto intelligente hello world",
  "main": "index.js",
  "scripts": {
     "test": "echo \\"Errore: nessun test specificato\\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Approva il package.json e siamo pronti!

## Fase 7: scarica [Hardhat](https://hardhat.org/getting-started/#overview){#step-7}

Hardhat è un ambiente di sviluppo per compilare, distribuire, testare ed effettuare il debug del tuo software di Ethereum. Aiuta gli sviluppatori nella creazione di smart contract e di dApps localmente, prima di distribuirli alla catena dal vivo.

Nel nostro progetto `hello-world` esegui:

```
npm install --save-dev hardhat
```

Dai un'occhiata a questa pagina per ulteriori dettagli sulle [istruzioni d'installazione](https://hardhat.org/getting-started/#overview).

## Fase 8: crea un progetto Hardhat {#step-8}

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

👷 Welcome to Hardhat v2.0.11 👷‍?

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Questo genererà un file `hardhat.config.js`, in cui specificheremo tutta la configurazione per il nostro progetto (alla fase 13).

## Fase 9: aggiungi le cartelle del progetto {#step-9}

Per mantenere organizzato il nostro progetto creeremo due nuove cartelle. Vai alla cartella di root del tuo progetto nella tua riga di comando e digita:

```
mkdir contracts
mkdir scripts
```

- `contracts/` è dove manterremo il file del codice del nostro smart contract hello world
- `scripts/` è dove manterremo gli script per distribuire e interagire con il nostro contratto

## Fase 10: compila il nostro contratto {#step-10}

Potresti chiederti, quando diavolo scriviamo il codice? Beh, eccoci qui, alla fase 10.

Apri il progetto hello-world nel tuo editor preferito (a noi piace [VSCode](https://code.visualstudio.com/)). Gli smart contract sono scritti in un linguaggio detto Solidity, che useremo per scrivere il nostro smart contract HelloWorld.sol.

1.  Vai alla cartella "contracts" e crea un nuovo file chiamato HelloWorld.sol
2.  Di seguito, un esempio dello smart contract Hello World dalla Ethereum Foundation che useremo per questo tutorial. Copia e incolla i contenuti seguenti nel tuo file HelloWorld.sol e assicurati di leggere i commenti per comprendere cosa fa il contratto:

```solidity
// Specifica la versione di Solidity, utilizzando il controllo delle versioni semantico.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// Defines a contract named `HelloWorld`.
// Un contratto è una raccolta di funzioni e dati (il suo stato). Una volta distribuito, un contratto risiede in un indirizzo specifico della blockchain Ethereum. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Declares a state variable `message` of type `string`.
   // Le variabili di stato sono variabili con valori memorizzati in modo permanente nello spazio di archiviazione del contratto. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // I costruttori sono utilizzati per inizializzare i dati del contratto. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

Questo è uno smart contract semplicissimo che memorizza un messaggio alla creazione ed è aggiornabile chiamando la funzione `update`.

## Fase 11: connetti MetaMask e Alchemy al tuo progetto {#step-11}

Ora che abbiamo creato un portafoglio MetaMask, un profilo di Alchemy e scritto il nostro smart contract, è il momento di collegare questi tre elementi.

Ogni transazione inviata dal tuo portafoglio virtuale richiede una firma tramite la tua chiave privata unica. Per fornire al nostro programma quest'autorizzazione, possiamo memorizzare in sicurezza la nostra chiave privata (e la chiave API di Alchemy) in un file ambientale.

> Per saperne di più sull'invio delle transazioni, dai un'occhiata a [questo tutorial](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) sull'invio di transazioni usando web3.

Prima, installa il pacchetto dotenv nella cartella del tuo progetto:

```
npm install dotenv --save
```

Poi, crea un file `.env` nella cartella di root del nostro progetto e aggiungi la tua chiave privata di MetaMask e l'URL API di Alchemy HTTP.

- Segui [queste istruzioni](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) per esportare la tua chiave privata
- Vedi sotto per ottenere l'URL dell'API di Alchemy HTTP

![ottieni la chiave api di alchemy](./get-alchemy-api-key.gif)

Copia l'URL dell'API di Alchemy

Il tuo `.env` dovrebbe somigliare a questo:

```
API_URL = "https://eth-ropsten.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Per connetterli realmente al nostro codice, faremo riferimento a queste variabili nel nostro file `hardhat.config.js` nella fase 13.

<InfoBanner isWarning={true}>
Non eseguire il commit di <code>.env</code>! Assicurati di non condividere o esporre mai il tuo file <code>.env</code> con nessuno, poiché così facendo comprometteresti i tuoi segreti. Se stai usando il controllo di versione, aggiungi il tuo <code>.env</code> a un file <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</InfoBanner>

## Fase 12: installa Ethers.js {#step-12-install-ethersjs}

Ethers.js è una libreria che rende più facile interagire ed effettuare richieste a Ethereum tramite wrapping dei [metodi JSON-RPC standard](/developers/docs/apis/json-rpc/) con altri metodi più facili da usare.

Hardhat rende davvero facile integrare [Plugin](https://hardhat.org/plugins/) per strumenti e funzionalità aggiuntive. Sfrutteremo il [plugin di Ethers](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html) per la distribuzione del contratto ([Ethers.js](https://github.com/ethers-io/ethers.js/) ha dei metodi di distribuzione del contratto molto puliti).

Nella cartella del tuo progetto digita:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

Avremo bisogno di ethers anche nel nostro `hardhat.config.js` nella prossima fase.

## Fase 13: aggiorna hardhat.config.js {#step-13-update-hardhatconfigjs}

Finora abbiamo aggiunto diverse dipendenze e plugin, ora dobbiamo aggiornare `hardhat.config.js` in modo che il nostro progetto li riconosca tutti.

Aggiorna il tuo `hardhat.config.js` affinché somigli a questo:

```
require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
   solidity: "0.7.3",
   defaultNetwork: "ropsten",
   networks: {
      hardhat: {},
      ropsten: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

## Fase 14: compila il contratto {#step-14-compile-our-contracts}

Per assicurarti che tutto funzioni fino a questo punto, compila il contratto. L'attività di `compilazione` è una delle attività integrate di hardhat.

Dalla riga di comando esegui:

```
npx hardhat compile
```

Potresti ottenere un avviso sull'assenza `nel file sorgente dell'identificativo della licenza SPDX`, ma non preoccupartene, si spera che tutto il resto funzioni! Altrimenti, puoi sempre inviare un messaggio nel [Discord di Alchemy](https://discord.gg/u72VCg3).

## Fase 15: scrivi lo script di distribuzione {#step-15-write-our-deploy-scripts}

Ora che il nostro contratto è scritto e il nostro file di configurazione è pronto, è il momento di scrivere lo script di distribuzione del contratto.

Vai alla cartella `script/` e crea un nuovo file chiamato `deploy.js`, aggiungendo i seguenti contenuti:

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

Nel suo [tutorial sui Contratti](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) hardhat spiega in modo eccellente cosa fa ognuna di queste righe di codice nel loro, quindi riportiamo qui le loro spiegazioni.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

Un `ContractFactory` su ethers.js è un'astrazione usata per distribuire nuovi smart contract, quindi `HelloWorld` qui è una fabbrica di istanze del nostro contratto hello world. Usando il plugin `hardhat-ethers`, le istanze `ContractFactory` e `Contract` sono connesse di default al primo firmatario.

```
const hello_world = await HelloWorld.deploy();
```

Chiamare `deploy()` su un `ContractFactory` avvierà la distribuzione e restituirà un `Promise` che si risolve in un `Contract`. Questo è l'oggetto che ha un metodo per ciascuna delle funzioni del nostro smart contract.

## Fase 16: distribuisci il contratto {#step-16-deploy-our-contract}

Siamo finalmente pronti a distribuire il nostro smart contract! Vai alla riga di comando ed esegui:

```
npx hardhat run scripts/deploy.js --network ropsten
```

Vorrai poi vedere qualcosa del genere:

```
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Se andiamo a [Ropsten etherscan](https://ropsten.etherscan.io/) e cerchiamo l'indirizzo del nostro contratto, dovremmo poter vedere che è stato distribuito correttamente. La transazione somiglierà a questa:

![contratto etherscan](./etherscan-contract.png)

L'indirizzo `Da` dovrebbe corrispondere all'indirizzo del tuo account di MetaMask mentre l'indirizzo "A" indichrà "Creazione del Contratto", ma se clicchiamo nella transazione vedremo l'indirizzo del nostro contratto nel campo `A`:

![transazione etherscan](./etherscan-transaction.png)

Congratulazioni! Hai appena distribuito uno smart contract nella chain di Ethereum

Per capire cosa sta succedendo, andiamo alla scheda Explorer nel nostro [dashboard di Alchemy](https://dashboard.alchemyapi.io/explorer). Se hai diverse app di Alchemy, assicurati di filtrare per app e selezionare "Hello World". ![explorer hello world](./hello-world-explorer.png)

Qui vedrai numerose chiamate a JSON-RPC che Hardhat/Ethers ha effettuato per noi quando abbiamo chiamato la funzione `.deploy()`. Due chiamate importanti sono [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), che è la richiesta per scrivere realmente il nostro contratto sulla catena di Ropsten e [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash), che è la richiesta per leggere le informazioni sulla nostra transazione dato l'hash ((sistema tipico quando si inviano delle transazioni). Per saperne di più sull'invio delle transazioni, dai un'occhiata a questo tutorial [ sull'invio di transazioni usando web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)

Questo è tutto per la parte 1 di questo tutorial, nella parte 2, [interagiremo realmente con il nostro smart contract](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#part-2-interact-with-your-smart-contract) aggiornando il nostro messaggio iniziale e nella parte 3 [pubblicheremo il nostro smart contract su Etherscan](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#optional-part-3-publish-your-smart-contract-to-etherscan), così che tutti sapranno come interagire con esso.

**Vuoi saperne di più su Alchemy? Dai un'occhiata al nostro [sito web](https://alchemyapi.io/eth). Non vuoi mai perderti un aggiornamento? Iscriviti alla nostra newsletter [qui](https://www.alchemyapi.io/newsletter)! Assicurati anche di seguire il nostro [Twitter](https://twitter.com/alchemyplatform) e di unirti al nostro [Discord](https://discord.com/invite/u72VCg3)**.
