---
title: Primi passi con lo sviluppo di Ethereum
description: "Questa è una guida per principianti per iniziare con lo sviluppo di Ethereum. Ti guideremo dal lancio di un endpoint API alla formulazione di una richiesta da riga di comando, fino alla scrittura del tuo primo script web3! Non è necessaria alcuna esperienza di sviluppo con le blockchain!"
author: "Elan Halpern"
tags:
  - "primi passi"
  - "javascript"
  - "ethers.js"
  - "nodi"
  - "interrogazione"
  - "alchemy"
skill: beginner
lang: it
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Loghi Ethereum e Alchemy](./ethereum-alchemy.png)

Questa è una guida per principianti per muovere i primi passi con lo sviluppo di Ethereum. Per questo tutorial useremo [Alchemy](https://alchemyapi.io/), la piattaforma principale per sviluppatori della blockchain con milioni di utenti dal 70% delle migliori app della blockchain, tra cui Maker, 0x, MyEtherWallet, Dharma e Kyber. Alchemy ci darà accesso all'endpoint di un'API sulla catena di Ethereum, così da permetterci di leggere e scrivere le transazioni.

Inizieremo dalla registrazione ad Alchemy e passeremo alla scrittura del tuo primo script web3! Non è necessaria alcuna esperienza di sviluppo con blockchain.

## 1. Crea un profilo Alchemy gratuito {#sign-up-for-a-free-alchemy-account}

Creare un account Alchemy è facile. [Registrati gratuitamente qui](https://auth.alchemyapi.io/signup).

## 2. Crea un'app con Alchemy {#create-an-alchemy-app}

Per comunicare con la catena Ethereum e per utilizzare i prodotti di Alchemy, è necessaria una chiave API per autenticare le richieste.

Puoi [creare chiavi API dalla dashboard](http://dashboard.alchemyapi.io/). Per creare una nuova chiave, vai a "Create App" come mostrato sotto:

Ringraziamenti speciali a [_ShapeShift_](https://shapeshift.com/) _per averci permesso di mostrare la sua dashboard!_

![Dashboard di Alchemy](./alchemy-dashboard.png)

Compila i dettagli sotto "Create App" per ottenere la tua nuova chiave. Qui puoi anche vedere le app create in precedenza e quelle create dal tuo team. Preleva le chiavi esistenti facendo clic su "View Key" per qualsiasi app.

![Crea l'app con gli screenshot di Alchemy](./create-app.png)

Puoi anche prelevare chiavi API esistenti passando con il mouse su "Apps" e selezionandone una. Puoi scegliere "View Key" o "Edit App" per consentire domini specifici, vedere diversi strumenti da sviluppatore e visualizzare i dati analitici.

![Gif che mostra a un utente come estrarre le chiavi API](./pull-api-keys.gif)

## 3. Effettua una richiesta dalla riga di comando {#make-a-request-from-the-command-line}

Interagisci con la blockchain Ethereum tramite Alchemy usando JSON-RPC e curl.

Per le richieste manuali, consigliamo di interagire con `JSON-RPC` tramite richieste `POST`. Passa semplicemente nell'intestazione `Content-Type: application/json` la tua query sotto forma di corpo `POST` con i seguenti campi:

- `jsonrpc`: versione JSON-RPC. Attualmente è supportata solo la `2.0`.
- `method`: metodo dell'API ETH. [Vedi il riferimento all'API.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: elenco di parametri da passare al metodo.
- `id`: ID della richiesta. Sarà restituita dalla risposta, e potrai controllare sempre a quale richiesta appartiene la risposta.

Ecco un'esempio che puoi eseguire dalla riga di comando per recuperare il prezzo corrente del carburante:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**NOTA:** Sostituisci [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) con la tua chiave API `https://eth-mainnet.alchemyapi.io/v2/**your-api-key`\*\*._

**Risultati:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. Configura il client Web3 {#set-up-your-web3-client}

**Se hai già un client,** cambia l'URL del provider del nodo corrente inserendo un URL Alchemy con la tua chiave API: `"https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_NOTA:_** gli script qui sotto devono essere eseguiti in un **contesto node** o **salvati in un file**, non devono essere eseguiti dalla riga di comando. Se non hai installato Node o npm, dai un'occhiata a questa [guida di configurazione per Mac](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs).

Ci sono tantissime [librerie Web3](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) che possono essere integrate con Alchemy, ma consigliamo di usare [Alchemy Web3](https://docs.alchemy.com/reference/api-overview), un sostituto di web3.js, creato e configurato per funzionare perfettamente con Alchemy. Fornisce diversi vantaggi, come tentativi automatici e supporto affidabile per WebSocket.

Per installare AlchemyWeb3.js, **passa alla directory del tuo progetto** ed esegui:

**Con Yarn:**

```
yarn add @alch/alchemy-web3
```

**Con NPM:**

```
npm install @alch/alchemy-web3
```

Per interagire con l'infrastruttura del nodo di Alchemy, esegui NodeJS o aggiungi il codice seguente a un file JavaScript:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. Scrivi il tuo primo script Web3! {#write-your-first-web3-script}

Ora per sporcarci un po' le mani con la programmazione web3 scriveremo uno script semplice che riporta il numero dell'ultimo blocco della rete principale Ethereum.

**1. Se non lo hai già fatto, nel terminale crea una nuova directory del progetto passa ad essa (cd):**

```
mkdir web3-example
cd web3-example
```

**2. Se non lo hai già fatto, installa la dipendenza Alchemy Web3 (o web3 di altro tipo) nel progetto:**

```
npm install @alch/alchemy-web3
```

**3. Crea un file denominato `index.js` e aggiungi i seguenti contenuti:**

> Devi sostituire `demo` con la tua chiave API HTTP di Alchemy.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

Non hai famigliarità con la programmazione asincrona? Dai un'occhiata a questo [post di Medium](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c).

**4. Eseguilo nel terminale usando node**

```
node index.js
```

**5. A questo punto dovresti vedere l'output con il numero dell'ultimo blocco nella console!**

```
The latest block number is 11043912
```

**Wow! Congratulazioni! Hai appena scritto il tuo primo script web3 usando Alchemy**

Non sai come proseguire? Prova a distribuire il tuo primo smart contract e fai qualche prova pratica di programmazione in Solidity nella nostra [Guida agli smart contract Hello World](https://docs.alchemyapi.io/tutorials/hello-world-smart-contract) o testa la tua conoscenza della Dashboard con l'[_App Demo della Dashboard_](https://docs.alchemyapi.io/tutorials/demo-app)!

_[Iscriviti gratis ad Alchemy](https://auth.alchemyapi.io/signup), dai un'occhiata alla nostra [documentazione](https://docs.alchemyapi.io/) e, per le ultime notizie, seguici su [Twitter](https://twitter.com/AlchemyPlatform)_.
