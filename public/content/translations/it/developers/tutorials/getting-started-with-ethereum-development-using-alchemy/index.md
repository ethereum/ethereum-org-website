---
title: Primi passi con lo sviluppo di Ethereum
description: "Questa è una guida per principianti per iniziare con lo sviluppo di Ethereum. Ti guideremo dal lancio di un endpoint API alla formulazione di una richiesta da riga di comando, fino alla scrittura del tuo primo script web3! Non è necessaria alcuna esperienza di sviluppo con la blockchain."
author: "Elan Halpern"
tags:
  [
    "javascript",
    "ethers.js",
    "nodi",
    "query",
    "alchemy"
  ]
skill: beginner
lang: it
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Loghi di Ethereum e Alchemy](./ethereum-alchemy.png)

Questa è una guida per principianti per muovere i primi passi con lo sviluppo di Ethereum. Per questo tutorial useremo [Alchemy](https://alchemyapi.io/), la piattaforma di sviluppo blockchain leader che alimenta milioni di utenti dal 70% delle migliori app blockchain, tra cui Maker, 0x, MyEtherWallet, Dharma e Kyber. Alchemy ci darà accesso all'endpoint di un'API sulla catena di Ethereum, così da permetterci di leggere e scrivere le transazioni.

Inizieremo dalla registrazione ad Alchemy e passeremo alla scrittura del tuo primo script web3! Non è necessaria alcuna esperienza di sviluppo con la blockchain.

## 1. Registrati per un account Alchemy gratuito {#sign-up-for-a-free-alchemy-account}

Creare un account con Alchemy è facile, [registrati gratuitamente qui](https://auth.alchemy.com/).

## 2. Crea un'app Alchemy {#create-an-alchemy-app}

Per comunicare con la catena di Ethereum e per utilizzare i prodotti di Alchemy, è necessaria una chiave API per autenticare le richieste.

Puoi [creare chiavi API dalla dashboard](https://dashboard.alchemy.com/). Per creare una nuova chiave, vai a "Crea App" come mostrato sotto:

Un ringraziamento speciale a [_ShapeShift_](https://shapeshift.com/) _per averci permesso di mostrare la loro dashboard!_

![Dashboard di Alchemy](./alchemy-dashboard.png)

Compila i dettagli sotto "Crea App" per ottenere la tua nuova chiave. Qui puoi anche vedere le app create in precedenza e quelle create dal tuo team. Recupera le chiavi esistenti facendo clic su "View Key" per qualsiasi app.

![Screenshot della creazione di un'app con Alchemy](./create-app.png)

Puoi anche recuperare chiavi API esistenti passando il mouse su "App" e selezionandone una. Qui puoi usare "View Key" e "Edit App" per aggiungere domini specifici alla whitelist, vedere diversi strumenti per sviluppatori e visualizzare i dati analitici.

![GIF che mostra a un utente come recuperare le chiavi API](./pull-api-keys.gif)

## 3. Effettua una richiesta dalla riga di comando {#make-a-request-from-the-command-line}

Interagisci con la blockchain di Ethereum tramite Alchemy usando JSON-RPC e curl.

Per le richieste manuali, consigliamo di interagire con il `JSON-RPC` tramite richieste `POST`. Basta passare l'header `Content-Type: application/json` e la query come corpo `POST` con i seguenti campi:

- `jsonrpc`: la versione di JSON-RPC; attualmente, è supportato solo `2.0`.
- `method`: il metodo dell'API ETH. [Vedi il riferimento API.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: un elenco di parametri da passare al metodo.
- `id`: l'ID della tua richiesta. Sarà restituito dalla risposta, così potrai tenere traccia a quale richiesta corrisponde una risposta.

Ecco un esempio che puoi eseguire dalla riga di comando per recuperare il prezzo corrente del gas:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**NOTA:** Sostituisci [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) con la tua chiave API: `https://eth-mainnet.alchemyapi.io/v2/**your-api-key`._

**Risultati:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. Configura il tuo client Web3 {#set-up-your-web3-client}

**Se hai già un client,** cambia l'URL del provider del tuo nodo corrente con un URL di Alchemy con la tua chiave API: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_NOTA:_** Gli script qui sotto devono essere eseguiti in un **contesto node** o **salvati in un file**, non eseguiti dalla riga di comando. Se non hai già installato Node o npm, consulta questa rapida [guida alla configurazione per Mac](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs).

Esistono tantissime [librerie Web3](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) che puoi integrare con Alchemy, tuttavia, ti consigliamo di usare [Alchemy Web3](https://docs.alchemy.com/reference/api-overview), un sostituto pronto all'uso per web3.js, creato e configurato per funzionare senza problemi con Alchemy. Ciò fornisce diversi vantaggi, come tentativi automatici e un solido supporto WebSocket.

Per installare AlchemyWeb3.js, **passa alla directory del tuo progetto** ed esegui:

**Con Yarn:**

```
yarn add @alch/alchemy-web3
```

**Con NPM:**

```
npm install @alch/alchemy-web3
```

Per interagire con l'infrastruttura dei nodi di Alchemy, esegui il codice in NodeJS o aggiungilo a un file JavaScript:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. Scrivi il tuo primo script Web3! {#write-your-first-web3-script}

Ora per sporcarci un po' le mani con la programmazione web3 scriveremo uno script semplice che stampa il numero dell'ultimo blocco della Rete Principale di Ethereum.

**1. Se non l'hai già fatto, nel terminale crea una nuova directory di progetto e accedi con cd:**

```
mkdir web3-example
cd web3-example
```

**2. Installa la dipendenza Alchemy web3 (o qualsiasi web3) nel tuo progetto se non l'hai già fatto:**

```
npm install @alch/alchemy-web3
```

**3. Crea un file di nome `index.js` e aggiungi i seguenti contenuti:**

> Infine, dovrai sostituire `demo` con la tua chiave API HTTP di Alchemy.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("Il numero di blocco più recente è " + blockNumber)
}
main()
```

Non hai famigliarità con la programmazione asincrona? Dai un'occhiata a questo [post su Medium](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c).

**4. Eseguilo nel terminale usando node**

```
node index.js
```

**5. A questo punto dovresti vedere il numero di blocco più recente nella tua console!**

```
Il numero di blocco più recente è 11043912
```

**Woo!** Congratulazioni! Hai appena scritto il tuo primo script web3 usando Alchemy 🎉\*\*

Non sai come proseguire? Prova a distribuire il tuo primo contratto intelligente e cimentati con un po' di programmazione in Solidity nella nostra [Guida al contratto intelligente Hello World](https://www.alchemy.com/docs/hello-world-smart-contract), o metti alla prova la tua conoscenza della dashboard con la [App Demo della Dashboard](https://docs.alchemyapi.io/tutorials/demo-app)!

_[Registrati gratuitamente su Alchemy](https://auth.alchemy.com/), consulta la nostra [documentazione](https://www.alchemy.com/docs/) e, per le ultime notizie, seguici su [Twitter](https://twitter.com/AlchemyPlatform)_.
