---
title: Iniziare con lo sviluppo su Ethereum
description: "Questa è una guida per principianti per iniziare con lo sviluppo su Ethereum. Ti accompagneremo dall'avvio di un endpoint API, all'esecuzione di una richiesta da riga di comando, fino alla scrittura del tuo primo script web3! Nessuna esperienza di sviluppo blockchain necessaria!"
author: "Elan Halpern"
tags: ["JavaScript", "ethers.js", "nodi", "query", "Alchemy"]
skill: beginner
breadcrumb: Per iniziare
lang: it
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Loghi di Ethereum e Alchemy](./ethereum-alchemy.png)

Questa è una guida per principianti per iniziare con lo sviluppo su Ethereum. Per questo tutorial utilizzeremo [Alchemy](https://alchemyapi.io/), la principale piattaforma di sviluppo blockchain che alimenta milioni di utenti dal 70% delle migliori app blockchain, tra cui Maker, 0x, MyEtherWallet, Dharma e Kyber. Alchemy ci darà accesso a un endpoint API sulla catena di Ethereum in modo da poter leggere e scrivere transazioni.

Ti accompagneremo dalla registrazione su Alchemy alla scrittura del tuo primo script web3! Nessuna esperienza di sviluppo blockchain necessaria!

## 1. Registrati per un account Alchemy gratuito {#sign-up-for-a-free-alchemy-account}

Creare un account con Alchemy è facile, [registrati gratuitamente qui](https://auth.alchemy.com/).

## 2. Crea un'app Alchemy {#create-an-alchemy-app}

Per comunicare con la catena di Ethereum e utilizzare i prodotti di Alchemy, hai bisogno di una chiave API per autenticare le tue richieste.

Puoi [creare chiavi API dalla dashboard](https://dashboard.alchemy.com/). Per creare una nuova chiave, vai su "Create App" (Crea App) come mostrato di seguito:

Un ringraziamento speciale a [_ShapeShift_](https://shapeshift.com/) _per averci permesso di mostrare la loro dashboard!_

![Dashboard di Alchemy](./alchemy-dashboard.png)

Compila i dettagli sotto "Create App" per ottenere la tua nuova chiave. Qui puoi anche vedere le app che hai creato in precedenza e quelle create dal tuo team. Recupera le chiavi esistenti cliccando su "View Key" (Visualizza Chiave) per qualsiasi app.

![Screenshot della creazione di un'app con Alchemy](./create-app.png)

Puoi anche recuperare le chiavi API esistenti passando il mouse su "Apps" e selezionandone una. Qui puoi cliccare su "View Key", così come su "Edit App" (Modifica App) per inserire nella whitelist domini specifici, vedere diversi strumenti per sviluppatori e visualizzare le analisi.

![Gif che mostra a un utente come recuperare le chiavi API](./pull-api-keys.gif)

## 3. Effettua una richiesta dalla riga di comando {#make-a-request-from-the-command-line}

Interagisci con la blockchain di Ethereum tramite Alchemy utilizzando JSON-RPC e curl.

Per le richieste manuali, consigliamo di interagire con `JSON-RPC` tramite richieste `POST`. Passa semplicemente l'intestazione `Content-Type: application/json` e la tua query come corpo della richiesta `POST` con i seguenti campi:

- `jsonrpc`: La versione JSON-RPC; attualmente è supportata solo la `2.0`.
- `method`: Il metodo dell'API ETH. [Vedi il riferimento API.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: Un elenco di parametri da passare al metodo.
- `id`: L'ID della tua richiesta. Verrà restituito dalla risposta in modo da poter tenere traccia a quale richiesta appartiene una risposta.

Ecco un esempio che puoi eseguire dalla riga di comando per recuperare l'attuale prezzo del gas:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**NOTA:** Sostituisci [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) con la tua chiave API `https://eth-mainnet.alchemyapi.io/v2/**la-tua-chiave-api`._

**Risultati:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. Configura il tuo client Web3 {#set-up-your-web3-client}

**Se hai un client esistente,** cambia l'URL del tuo attuale fornitore di nodi in un URL di Alchemy con la tua chiave API: `“https://eth-mainnet.alchemyapi.io/v2/la-tua-chiave-api"`

**_NOTA:_** Gli script sottostanti devono essere eseguiti in un **contesto nodo** o **salvati in un file**, non eseguiti dalla riga di comando. Se non hai già installato Node o npm, dai un'occhiata a questa rapida [guida alla configurazione per Mac](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs).

Ci sono tantissime [librerie Web3](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) che puoi integrare con Alchemy, tuttavia, ti consigliamo di utilizzare [Alchemy Web3](https://docs.alchemy.com/reference/api-overview), un sostituto diretto per web3.js, creato e configurato per funzionare perfettamente con Alchemy. Questo offre molteplici vantaggi come i tentativi automatici e un robusto supporto WebSocket.

Per installare AlchemyWeb3.js, **vai alla directory del tuo progetto** ed esegui:

**Con Yarn:**

```
yarn add @alch/alchemy-web3
```

**Con NPM:**

```
npm install @alch/alchemy-web3
```

Per interagire con l'infrastruttura del nodo di Alchemy, esegui in NodeJS o aggiungi questo a un file JavaScript:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. Scrivi il tuo primo script Web3! {#write-your-first-web3-script}

Ora, per sporcarci le mani con un po' di programmazione web3, scriveremo un semplice script che stampa l'ultimo numero di blocco dalla rete principale di Ethereum.

**1. Se non l'hai già fatto, nel tuo terminale crea una nuova directory di progetto ed entraci con cd:**

```
mkdir web3-example
cd web3-example
```

**2. Installa la dipendenza web3 di Alchemy (o qualsiasi web3) nel tuo progetto se non l'hai già fatto:**

```
npm install @alch/alchemy-web3
```

**3. Crea un file chiamato `index.js` e aggiungi i seguenti contenuti:**

> Alla fine dovresti sostituire `demo` con la tua chiave API HTTP di Alchemy.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

Non hai familiarità con la programmazione asincrona? Dai un'occhiata a questo [post su Medium](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c).

**4. Eseguilo nel tuo terminale usando node**

```
node index.js
```

**5. Ora dovresti vedere l'output dell'ultimo numero di blocco nella tua console!**

```
The latest block number is 11043912
```

**Evviva! Congratulazioni! Hai appena scritto il tuo primo script web3 usando Alchemy 🎉**

Non sai cosa fare dopo? Prova a distribuire il tuo primo contratto intelligente e sporcati le mani con un po' di programmazione in Solidity nella nostra [Guida al contratto intelligente Hello World](https://www.alchemy.com/docs/hello-world-smart-contract), oppure metti alla prova la tua conoscenza della dashboard con l'[App Demo della Dashboard](https://docs.alchemyapi.io/tutorials/demo-app)!

_[Registrati gratuitamente su Alchemy](https://auth.alchemy.com/), dai un'occhiata alla nostra [documentazione](https://www.alchemy.com/docs/) e, per le ultime notizie, seguici su [Twitter](https://twitter.com/AlchemyPlatform)_.