---
title: Smart Contract "Hello World" per principianti
description: Tutorial introduttivo su come scrivere e distribuire un semplice smart contract su Ethereum.
author: "elanh"
tags:
  [
    "Solidity",
    "hardhat",
    "alchemy",
    "smart contract",
    "distribuzione"
  ]
skill: beginner
lang: it
published: 2021-03-31
---

Se hai appena iniziato con lo sviluppo blockchain e non sai da dove cominciare, oppure se sei solo interessato a capire come distribuire e interagire con gli smart contract, questa è la guida che fa al caso tuo. Esamineremo la creazione e la distribuzione di un semplice contratto intelligente sulla rete di test Sepolia, utilizzando un portafoglio virtuale [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/) e [Alchemy](https://www.alchemy.com/eth) (non preoccuparti se non capisci ancora cosa significhi, lo spiegheremo).

Nella [parte 2](https://docs.alchemy.com/docs/interacting-with-a-smart-contract) di questo tutorial vedremo come interagire con il nostro smart contract una volta distribuito, e nella [parte 3](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) tratteremo come pubblicarlo su Etherscan.

Se in qualsiasi momento hai domande, non esitare a contattarci nel [Discord di Alchemy](https://discord.gg/gWuC7zB)!

## Fase 1: Connettersi alla rete di Ethereum {#step-1}

Esistono molti modi per effettuare richieste alla catena di Ethereum. Per semplicità, ci serviremo di un conto gratuito su Alchemy, una piattaforma per sviluppatori di blockchain e API che ci consentirà di comunicare con la catena di Ethereum senza dover operare i nostri nodi. La piattaforma offre anche strumenti per sviluppatori per il monitoraggio e l'analisi di cui ci serviremo in questo tutorial per comprendere cosa succede dietro le quinte durante la distribuzione del nostro smart contract. Se non possiedi già un conto di Alchemy, [puoi iscriverti gratuitamente qui](https://dashboard.alchemy.com/signup).

## Fase 2: Crea la tua app (e chiave API) {#step-2}

Una volta creato un conto di Alchemy, puoi generare una chiave API creando un'app. Questo ci consentirà di effettuare richieste alla rete di prova di Sepolia. Se non hai familiarità con le reti di test, dai un'occhiata a [questa pagina](/developers/docs/networks/).

1. Vai alla pagina "Crea nuova app" nella tua dashboard di Alchemy selezionando "Seleziona un'app" nella barra di navigazione e cliccando "Crea nuova app"

![Crea app Hello world](./hello-world-create-app.png)

2. Dai un nome alla tua app, "Hello World", fornisci una breve descrizione e scegli un caso d'uso, ad esempio, "Infrastruttura e strumenti." Successivamente, cerca "Ethereum" e seleziona la rete.

![visualizzazione crea app hello world](./create-app-view-hello-world.png)

3. Fai clic su "Next" per procedere, quindi su "Create app" e il gioco è fatto! La tua app dovrebbe apparire nel menu a tendina della barra di navigazione, con una Chiave API disponibile per la copia.

## Fase 3: Crea un conto Ethereum (indirizzo) {#step-3}

Per inviare e ricevere le transazioni, necessitiamo di un conto di Ethereum. Per questo tutorial, utilizzeremo MetaMask, un portafoglio virtuale nel browser, utilizzato per gestire l'indirizzo del tuo conto di Ethereum. Maggiori informazioni sulle [transazioni](/developers/docs/transactions/).

Puoi scaricare MetaMask e creare un conto Ethereum gratuito [qui](https://metamask.io/download). Quando crei un conto, o se ne hai già uno, assicurati di passare alla rete di test "Sepolia" utilizzando il menu a tendina della rete (in modo da non avere a che fare con denaro reale).

Se non vedi Sepolia nell'elenco, vai nel menu, quindi su Avanzate e scorri verso il basso per attivare l'opzione "Mostra reti di test". Nel menu di selezione della rete, scegli la scheda "Personalizzata" per trovare un elenco di reti di test e seleziona "Sepolia."

![esempio metamask sepolia](./metamask-sepolia-example.png)

## Fase 4: Aggiungi ether da un faucet {#step-4}

Per distribuire il nostro smart contract sulla rete di test, avremo bisogno di Eth finti. Per ottenere ETH di Sepolia, puoi andare ai [dettagli della rete Sepolia](/developers/docs/networks/#sepolia) per visualizzare un elenco di vari faucet. Se uno non funziona, provane un altro perché a volte possono esaurirsi. Potrebbe essere necessario un po' di tempo per ricevere i tuoi ETH finti a causa del traffico di rete. Dovresti vedere gli ETH nel tuo conto MetaMask poco dopo!

## Fase 5: Controlla il tuo saldo {#step-5}

Per verificare che il nostro saldo sia presente, effettuiamo una richiesta [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) utilizzando lo [strumento composer di Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Questo restituirà l'importo di ETH nel nostro portafoglio. Dopo aver inserito l'indirizzo del tuo conto di MetaMask e aver cliccato "Invia Richiesta", dovresti visualizzare una risposta simile alla seguente:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **NOTA:** questo risultato è in wei, non in ETH. Wei è usato come taglio più piccolo dell'ether. La conversione da wei a ETH è: 1 eth = 10<sup>18</sup> wei. Quindi, se convertiamo 0x2B5E3AF16B1880000 in decimale, otteniamo 5\*10¹⁸, che equivale a 5 ETH.
>
> Meno male! I nostri soldi finti ci sono tutti <Emoji text=":money_mouth_face:" size={1} />.

## Fase 6: Inizializza il nostro progetto {#step-6}

Prima, dovremo creare una cartella per il nostro progetto. Vai alla riga di comando e digita:

```
mkdir hello-world
cd hello-world
```

Ora che siamo all'interno della nostra cartella del progetto, useremo `npm init` per inizializzare il progetto. Se non hai già installato npm, segui [queste istruzioni](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (avremo bisogno anche di Node.js, quindi scarica anche quello!).

```
npm init
```

Non è molto importante come rispondi alle domande di installazione, ecco come abbiamo fatto noi come riferimento:

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
     "test": "echo \"Errore: nessun test specificato\\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Approva il file package.json e siamo pronti a partire!

## Fase 7: Scarica [Hardhat](https://hardhat.org/getting-started/#overview) {#step-7}

Hardhat è un ambiente di sviluppo per compilare, distribuire, testare ed effettuare il debug del tuo software di Ethereum. Aiuta gli sviluppatori nella costruzione di contratti intelligenti e dapp localmente, prima di distribuirli alla catena.

All'interno del nostro progetto `hello-world`, esegui:

```
npm install --save-dev hardhat
```

Consulta questa pagina per maggiori dettagli sulle [istruzioni di installazione](https://hardhat.org/getting-started/#overview).

## Fase 8: Crea un progetto Hardhat {#step-8}

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

👷 Benvenuto in Hardhat v2.0.11 👷‍?

Cosa vuoi fare? …
Crea un progetto di esempio
❯ Crea un hardhat.config.js vuoto
Esci
```

Questo genererà per noi un file `hardhat.config.js`, in cui specificheremo tutta la configurazione del nostro progetto (nella fase 13).

## Fase 9: Aggiungi le cartelle del progetto {#step-9}

Per mantenere organizzato il nostro progetto creeremo due nuove cartelle. Vai alla cartella di root del tuo progetto nella tua riga di comando e digita:

```
mkdir contracts
mkdir scripts
```

- `contracts/` è dove conserveremo il file del codice del nostro smart contract hello world
- `scripts/` è dove conserveremo gli script per distribuire e interagire con il nostro contratto

## Fase 10: Scrivi il nostro contratto {#step-10}

Ti starai chiedendo, ma quando diavolo scriviamo il codice?? Beh, eccoci qui, alla fase 10.

Apri il progetto hello-world nel tuo editor preferito (a noi piace [VSCode](https://code.visualstudio.com/)). Gli smart contract sono scritti in un linguaggio chiamato Solidity, che useremo per scrivere il nostro smart contract HelloWorld.sol.‌

1. Vai alla cartella "contracts" e crea un nuovo file chiamato HelloWorld.sol
2. Di seguito è riportato un esempio di smart contract Hello World della Ethereum Foundation che useremo per questo tutorial. Copia e incolla i contenuti sottostanti nel tuo file HelloWorld.sol e assicurati di leggere i commenti per capire cosa fa questo contratto:

```solidity
// Specifica la versione di Solidity, utilizzando il versioning semantico.
// Per saperne di più: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// Definisce un contratto chiamato `HelloWorld`.
// Un contratto è una raccolta di funzioni e dati (il suo stato). Una volta distribuito, un contratto risiede a un indirizzo specifico sulla blockchain di Ethereum. Per saperne di più: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Dichiara una variabile di stato `message` di tipo `string`.
   // Le variabili di stato sono variabili i cui valori sono memorizzati in modo permanente nella memoria del contratto. La parola chiave `public` rende le variabili accessibili dall'esterno di un contratto e crea una funzione che altri contratti o client possono chiamare per accedere al valore.
   string public message;

   // Simile a molti linguaggi orientati agli oggetti basati su classi, un costruttore è una funzione speciale che viene eseguita solo alla creazione del contratto.
   // I costruttori sono usati per inizializzare i dati del contratto. Per saperne di più:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accetta un argomento di tipo stringa `initMessage` e imposta il valore nella variabile di archiviazione `message` del contratto).
      message = initMessage;
   }

   // Una funzione pubblica che accetta un argomento di tipo stringa e aggiorna la variabile di archiviazione `message`.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

Questo è uno smart contract molto semplice che memorizza un messaggio alla sua creazione e può essere aggiornato chiamando la funzione `update`.

## Fase 11: Connetti MetaMask e Alchemy al tuo progetto {#step-11}

Abbiamo creato un portafoglio MetaMask, un conto Alchemy e scritto il nostro smart contract, ora è il momento di collegare i tre.

Ogni transazione inviata dal tuo portafoglio virtuale richiede una firma tramite la tua chiave privata unica. Per fornire al nostro programma quest'autorizzazione, possiamo memorizzare in sicurezza la nostra chiave privata (e la chiave API di Alchemy) in un file ambientale.

> Per saperne di più sull'invio di transazioni, consulta [questa guida](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) sull'invio di transazioni tramite web3.

Prima, installa il pacchetto dotenv nella cartella del tuo progetto:

```
npm install dotenv --save
```

Quindi, crea un file `.env` nella directory principale del nostro progetto e aggiungici la tua chiave privata di MetaMask e l'URL dell'API HTTP di Alchemy.

- Segui [queste istruzioni](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) per esportare la tua chiave privata
- Vedi di seguito per ottenere l'URL dell'API HTTP di Alchemy

![ottenere la chiave api di alchemy](./get-alchemy-api-key.png)

Copia l'URL dell'API di Alchemy

Il tuo file `.env` dovrebbe avere questo aspetto:

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Per collegarli effettivamente al nostro codice, faremo riferimento a queste variabili nel nostro file `hardhat.config.js` nella fase 13.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Non eseguire il commit di <code>.env</code>! Assicurati di non condividere o esporre mai il tuo file <code>.env</code> a nessuno, poiché così facendo comprometteresti i tuoi segreti. Se stai usando un sistema di controllo di versione, aggiungi il tuo file <code>.env</code> a un file <a href="https://git-scm.com/docs/gitignore">.gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Fase 12: Installa Ethers.js {#step-12-install-ethersjs}

Ethers.js è una libreria che semplifica l'interazione e l'invio di richieste a Ethereum, eseguendo il wrapping dei [metodi JSON-RPC standard](/developers/docs/apis/json-rpc/) con metodi più intuitivi.

Hardhat rende semplicissima l'integrazione di [Plugin](https://hardhat.org/plugins/) per strumenti aggiuntivi e funzionalità estese. Approfitteremo del [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) per la distribuzione dei contratti ([Ethers.js](https://github.com/ethers-io/ethers.js/) ha dei metodi di distribuzione dei contratti molto puliti).

Nella cartella del tuo progetto digita:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

Richiederemo anche ethers nel nostro `hardhat.config.js` nel prossimo passo.

## Fase 13: Aggiorna hardhat.config.js {#step-13-update-hardhatconfigjs}

Finora abbiamo aggiunto diverse dipendenze e plugin, ora dobbiamo aggiornare `hardhat.config.js` in modo che il nostro progetto li riconosca tutti.

Aggiorna il tuo `hardhat.config.js` perché abbia questo aspetto:

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

## Fase 14: Compila il nostro contratto {#step-14-compile-our-contracts}

Per assicurarti che tutto funzioni fino a questo punto, compila il contratto. L'attività `compile` è una delle attività integrate di hardhat.

Dalla riga di comando esegui:

```
npx hardhat compile
```

Potresti ricevere un avviso `SPDX license identifier not provided in source file`, ma non c'è da preoccuparsi — si spera che tutto il resto vada bene! In caso contrario, puoi sempre inviare un messaggio nel [discord di Alchemy](https://discord.gg/u72VCg3).

## Fase 15: Scrivi il nostro script di distribuzione {#step-15-write-our-deploy-scripts}

Ora che il nostro contratto è scritto e il nostro file di configurazione è pronto, è il momento di scrivere lo script di distribuzione del contratto.

Vai alla cartella `scripts/` e crea un nuovo file chiamato `deploy.js`, aggiungendovi i seguenti contenuti:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Inizia la distribuzione, restituendo una promessa che si risolve in un oggetto contratto
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contratto distribuito all'indirizzo:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat spiega molto bene cosa fa ciascuna di queste righe di codice nella sua [Guida ai contratti](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), e qui abbiamo adottato le sue spiegazioni.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

Una `ContractFactory` in ethers.js è un'astrazione usata per distribuire nuovi smart contract, quindi `HelloWorld` qui è una factory per le istanze del nostro contratto hello world. Quando si utilizza il plugin `hardhat-ethers`, le istanze di `ContractFactory` e `Contract` sono collegate di default al primo firmatario.

```
const hello_world = await HelloWorld.deploy();
```

Chiamare `deploy()` su una `ContractFactory` avvierà la distribuzione e restituirà una `Promise` che si risolve in un `Contract`. Questo è l'oggetto che ha un metodo per ciascuna delle funzioni del nostro smart contract.

## Fase 16: Distribuisci il nostro contratto {#step-16-deploy-our-contract}

Siamo finalmente pronti a distribuire il nostro smart contract! Vai alla riga di comando ed esegui:

```
npx hardhat run scripts/deploy.js --network sepolia
```

Vorrai poi vedere qualcosa del genere:

```
Contratto distribuito all'indirizzo: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Se andiamo su [Etherscan di Sepolia](https://sepolia.etherscan.io/) e cerchiamo l'indirizzo del nostro contratto, dovremmo essere in grado di vedere che è stato distribuito con successo. La transazione somiglierà a questa:

![contratto etherscan](./etherscan-contract.png)

L'indirizzo `From` dovrebbe corrispondere all'indirizzo del tuo conto MetaMask e l'indirizzo To indicherà “Creazione del Contratto”, ma se facciamo clic sulla transazione vedremo l'indirizzo del nostro contratto nel campo `To`:

![transazione etherscan](./etherscan-transaction.png)

Congratulazioni! Hai appena distribuito uno smart contract sulla chain di Ethereum 🎉

Per capire cosa sta succedendo dietro le quinte, vai alla scheda Explorer nella nostra [dashboard di Alchemy](https://dashboard.alchemyapi.io/explorer). Se hai più app di Alchemy, assicurati di filtrare per app e selezionare “Hello World”.
![explorer hello world](./hello-world-explorer.png)

Qui vedrai una manciata di chiamate JSON-RPC che Hardhat/Ethers hanno fatto per noi dietro le quinte quando abbiamo chiamato la funzione `.deploy()`. Due importanti da segnalare qui sono [`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction), che è la richiesta per scrivere effettivamente il nostro contratto sulla catena di Sepolia, e [`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash), che è una richiesta per leggere informazioni sulla nostra transazione dato l'hash (un modello tipico quando si effettuano
transazioni). Per saperne di più sull'invio di transazioni, consulta questo tutorial su [come inviare transazioni usando Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)

Questo è tutto per la parte 1 di questo tutorial, nella [parte 2](https://www.alchemy.com/docs/interacting-with-a-smart-contract) interagiremo effettivamente con il nostro smart contract aggiornando il nostro messaggio iniziale, e nella [parte 3](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) pubblicheremo il nostro smart contract su Etherscan in modo che tutti sappiano come interagire con esso.

**Vuoi saperne di più su Alchemy?** Visita il nostro [sito web](https://www.alchemy.com/eth). Non vuoi perderti nessun aggiornamento? Iscriviti alla nostra newsletter [qui](https://www.alchemy.com/newsletter)! Assicurati di unirti anche al nostro [Discord](https://discord.gg/u72VCg3).\*\*.
