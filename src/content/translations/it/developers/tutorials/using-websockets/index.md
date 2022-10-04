---
title: Uso dei WebSocket
description: Guida all'uso di WebSocket e Alchemy per creare richieste JSON-RPC e iscriversi a eventi.
author: "Elan Halpern"
lang: it
tags:
  - "alchemy"
  - "websocket"
  - "query"
  - "primi passi"
  - "iscrizione"
  - "javascript"
skill: beginner
source: documentazione Alchemy
sourceUrl: https://docs.alchemyapi.io/guides/using-websockets
published: 2020-12-01
---

Questa è una guida entry level su come utilizzare Websocket e Alchemy per fare richieste alla blockchain Ethereum.

## WebSocket e HTTP {#websockets-vs-http}

A differenza di HTTP, con i WebSocket non serve fare continuamente richieste quando si desiderano informazioni specifiche. I WebSocket mantengono una connessione con la rete (se configurati correttamente) e monitorano le modifiche.

Come avviene con ogni connessione di rete, non presupporre che un WebSocket rimanga aperto per sempre senza interruzioni; gestire correttamente a mano la caduta di connessione e la riconnessione può essere complicato. Un altro lato negativo dei WebSocket è che non si ottengono codici di stato HTTP come risposta ma solo il messaggio di errore.

​[Alchemy Web3](https://docs.alchemy.com/reference/api-overview) aggiunge automaticamente la gestione degli errori WebSocket e i nuovi tentativi senza necessità di configurazione.

## Facciamo una prova {#try-it-out}

Il modo più facile per testare i WebSocket è installare uno strumento da riga di comando per eseguire richieste WebSocket come [wscat](https://github.com/websockets/wscat). Usando wscat, è possibile inviare richieste come di seguito:

_Nota: se hai un account Alchemy, puoi sostituire `demo` con la tua chiave API. [Registrati qui per avere un account Alchemy gratuito!](https://auth.alchemyapi.io/signup)_

```
$ wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo

>  {"jsonrpc":  "2.0", "id": 0, "method":  "eth_gasPrice"}

<  {"jsonrpc":  "2.0", "result":  "0xb2d05e00", "id": 0}

```

## Come usare i WebSocket {#how-to-use-websockets}

Per iniziare, apri un WebSocket usando l'URL WebSocket della tua app. Puoi trovare l'URL WebSocket della tua app aprendo la pagina dell'app [nel dashboard](https://dashboard.alchemyapi.io/) e facendo clic su "View Key". Tieni presente che l'URL della tua app per WebSocket è diverso dall'URL per le richieste HTTP, ma entrambi sono visualizzabili facendo clic su "View Key".

![Dove trovare l'URL WebSocket nella dashboard di Alchemy](./use-websockets.gif)

Tutte le API elencate in [Alchemy API Reference](https://docs.alchemyapi.io/documentation/alchemy-api-reference/) possono essere utilizzate tramite WebSocket. A questo scopo, usa lo stesso payload che verrebbe inviato come corpo di una richiesta HTTP POST, ma invialo tramite il WebSocket.

## Con Web3 {#with-web3}

Passare ai WebSocket usando una libreria client come Web3 è semplice. Basta passare l'URL WebSocket anziché quello HTTP quando crei un'istanza del client Web3. Per esempio:

```js
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/your-api-key")

web3.eth.getBlockNumber().then(console.log) // -> 7946893
```

## API per l'iscrizione {#subscription-api}

Se ti connetti tramite WebSocket, puoi usare altri due metodi: `eth_subscribe` e `eth_unsubscribe`. Ti consentiranno di attendere determinati eventi e di ricevere notifiche immediate.

### `eth_subscribe` {#eth-subscribe}

Crea una nuova iscrizione agli eventi specificati. [Scopri di più su `eth_subscribe`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_subscribe).

#### Parametri {#parameters}

1. Tipi di iscrizioni
2. Parametri opzionali

Il primo argomento specifica il tipo di evento da attendere. Il secondo argomento contiene opzioni aggiuntive che dipendono dal primo argomento. I diversi tipi di descrizione, le loro opzioni e i payload degli eventi sono descritti di seguito.

#### Restituisce {#returns}

L'ID dell'iscrizione: questo ID sarà allegato a ogni evento ricevuto e può anche essere usato per annullare l'iscrizione usando `eth_unsubscribe`.

#### Eventi di iscrizione {#subscription-events}

Mentre l'iscrizione è attiva, ricevi eventi che sono oggetti con i seguenti campi:

- `jsonrpc`: sempre "2.0"
- `method`: sempre "eth_subscription"
- `params`: un oggetto con i campi seguenti:
  - `subscription`: ID dell'iscrizione restituito dalla chiamata `eth_subscription` che ha creato questa iscrizione.
  - `result`: oggetto i cui contenuti variano in base al tipo di iscrizione.

#### Tipi di iscrizione {#subscription-types}

1. `alchemy_newFullPendingTransactions`

Restituisce le informazione della transazione per tutte le transazioni aggiunte allo stato in sospeso. Questo tipo esegue l'iscrizione alle transazioni in sospeso, analogamente alla chiamata Web3 standard di `web3.eth.subscribe("pendingTransactions")`, ma è diverso perché emette _informazioni complete sulla transazione_ anziché solo gli hash della transazione.

Esempio:

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["alchemy_newFullPendingTransactions"]}

<  {"id":1,"result":"0x9a52eeddc2b289f985c0e23a7d8427c8","jsonrpc":"2.0"}
<  {
      "jsonrpc":"2.0",
      "method":"eth_subscription",
      "params":{
          "result":{
          "blockHash":null,
          "blockNumber":null,
          "from":"0xa36452fc31f6f482ad823cd1cf5515177d57667f",
          "gas":"0x1adb0",
          "gasPrice":"0x7735c4d40",
          "hash":"0x50bff0736c713458c92dd1848d12f3354149be1363123dae35e94e0f2a9d56bf",
"input":"0xa9059cbb0000000000000000000000000d0707963952f2fba59dd06f2b425ace40b492fe0000000000000000000000000000000000000000000015b1111266cfca100000",
          "nonce":"0x0",
          "to":"0xea38eaa3c86c8f9b751533ba2e562deb9acded40",
          "transactionIndex":null,
          "value":"0x0",
          "v":"0x26",
          "r":"0x195c2c1ed126088e12d290aa93541677d3e3b1d10f137e11f86b1b9227f01e3b",
          "s":"0x60fc4edbf1527832a2a36dbc1e63ed6193a6eee654472fbebbf88ef1750b5344"},
          "subscription":"0x9a52eeddc2b289f985c0e23a7d8427c8"
      }
  }

```

2. `newHeads`

Emette un evento ogni volta che una nuova intestazione viene aggiunta alla catena, anche durante una riorganizzazione della catena.

Quando si verifica la riorganizzazione della catena, questa iscrizione emetterà un evento contenente tutte le nuove intestazioni della nuova catena. In particolare, significa che potresti vedere più intestazioni emesse con la stessa altezza e quando ciò si verifica l'ultima dovrebbe essere considerata quella corretta dopo una riorganizzazione.

Esempio:

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["newHeads"]}

<  {"jsonrpc":"2.0","id":2,"result":"0x9ce59a13059e417087c02d3236a0b1cc"}
<  {
  "jsonrpc":  "2.0",
  "method":  "eth_subscription",
  "params":  {
      "result":  {
          "difficulty":  "0x15d9223a23aa",
          "extraData":  "0xd983010305844765746887676f312e342e328777696e646f7773",
          "gasLimit":  "0x47e7c4",
          "gasUsed":  "0x38658",
          "logsBloom":
"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
          "miner":  "0xf8b483dba2c3b7176a3da549ad41a48bb3121069",
          "nonce":  "0x084149998194cc5f",
          "number":  "0x1348c9",
          "parentHash":  "0x7736fab79e05dc611604d22470dadad26f56fe494421b5b333de816ce1f25701",
          "receiptRoot":  "0x2fab35823ad00c7bb388595cb46652fe7886e00660a01e867824d3dceb1c8d36",
          "sha3Uncles":  "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
          "stateRoot":  "0xb3346685172db67de536d8765c43c31009d0eb3bd9c501c9be3229203f15f378",
          "timestamp":  "0x56ffeff8",
          "transactionsRoot":  "0x0167ffa60e3ebc0b080cdb95f7c0087dd6c0e61413140e39d94d3468d7c9689f"
      },
  "subscription":  "0x9ce59a13059e417087c02d3236a0b1cc"
  }
}

```

3. `logs`

Emette registri che fanno parte di blocchi appena aggiunti, corrispondenti ai criteri specificati per il filtro.

Quando avviene la riorganizzazione della catena, i registri che fanno parte dei blocchi sulla vecchia catena saranno emessi di nuovo con la proprietà `removed` impostata su `true`. Inoltre, vengono emessi i registri che fanno parte dei blocchi sulla nuova catena. Significa che sarà possibile trovare registri della stessa transazione diverse volte nel caso di una riorganizzazione.

Parametri

1. Un oggetto con i seguenti campi:
   - `address` (facoltativo): una stringa rappresentante un indirizzo o un array di stringhe analoghe.
     - Saranno emessi solo i registri creati da uno di questi indirizzi.
   - `topics`: array di specificatori di argomento.
     - Ogni specificatore di argomento è `null`, una stringa rappresentante un argomento o un array di stringhe.
     - Ogni posizione nell'array che non è `null` limita i registri emessi a quelli aventi uno degli argomenti indicati in quella posizione.

Alcuni esempi di specifiche di argomento:

- `[]`: ogni argomento è consentito.
- `[A]`: A in prima posizione (e tutto il resto segue).
- `[null, B]`: tutto nella prima posizione e B nella seconda (e tutto il resto segue).
- `[A, B]`: A in prima posizione e B in seconda (e tutto il resto segue).
- `[[A, B], [A, B]]`: (A o B) in prima posizione e (A o B) in seconda posizione (e tutto il resto segue).

Esempio:

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["logs",  {"address":  "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd",  "topics":  ["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"]}]}

<  {"jsonrpc":"2.0","id":2,"result":"0x4a8a4c0517381924f9838102c5a4dcb7"}
<  {
  "jsonrpc":  "2.0",
  "method":  "eth_subscription",
  "params":  {
      "subscription":  "0x4a8a4c0517381924f9838102c5a4dcb7",
      "result":  {
          "address":  "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd",
          "blockHash":  "0x61cdb2a09ab99abf791d474f20c2ea89bf8de2923a2d42bb49944c8c993cbf04",
          "blockNumber":  "0x29e87",
          "data": "0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003",
          "logIndex":"0x0",
          "topics":["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"],
          "transactionHash":  "0xe044554a0a55067caafd07f8020ab9f2af60bdfe337e395ecd84b4877a3d1ab4",
          "transactionIndex":  "0x0"
      }
  }
}

```

### `eth_unsubscribe` {#eth-unsubscribe}

Annulla un'iscrizione esistente in modo che non siano inviati altri eventi.

Parametri

1. ID di iscrizione, come precedentemente restituito da una chiamata `eth_subscribe`.

Restituisce

`true` se un'iscrizione è stata annullata o `false` se non esiste alcuna iscrizione con l'ID dato.

Esempio:

**Richiesta**

```
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key
-X POST
-H "Content-Type: application/json"
-d '{"id": 1, "method": "eth_unsubscribe", "params": ["0x9cef478923ff08bf67fde6c64013158d"]}'


```

**Risultato**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true
}
```

---

[Registrati ad Alchemy](https://auth.alchemyapi.io/signup) gratis, dai un'occhiata alla [nostra documentazione](https://docs.alchemyapi.io/) e, per le ultime novità, seguici su [Twitter](https://twitter.com/AlchemyPlatform).
