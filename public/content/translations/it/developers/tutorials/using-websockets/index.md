---
title: Utilizzare i WebSocket
description: Guida all'uso dei WebSocket e di Alchemy per effettuare richieste JSON-RPC e iscriversi agli eventi.
author: "Elan Halpern"
lang: it
tags: ["Alchemy", "websockets", "interrogazione", "JavaScript"]
skill: beginner
breadcrumb: WebSocket
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

Questa è una guida di base per utilizzare i WebSocket e Alchemy per effettuare richieste alla blockchain di Ethereum.

## WebSocket contro HTTP {#websockets-vs-http}

A differenza dell'HTTP, con i WebSocket non è necessario effettuare continuamente richieste quando si desiderano informazioni specifiche. I WebSocket mantengono una connessione di rete per te (se eseguiti correttamente) e restano in ascolto dei cambiamenti.

Come per qualsiasi connessione di rete, non si dovrebbe presumere che un WebSocket rimanga aperto per sempre senza interruzioni, ma gestire correttamente le connessioni interrotte e la riconnessione manuale può essere difficile da eseguire nel modo giusto. Un altro svantaggio dei WebSocket è che non si ottengono i codici di stato HTTP nella risposta, ma solo il messaggio di errore.

​[Alchemy Web3](https://docs.alchemy.com/reference/api-overview) aggiunge automaticamente la gestione dei guasti e dei tentativi dei WebSocket senza alcuna configurazione necessaria.

## Provalo {#try-it-out}

Il modo più semplice per testare i WebSocket è installare uno strumento a riga di comando per effettuare richieste WebSocket come [wscat](https://github.com/websockets/wscat). Usando wscat, puoi inviare richieste come segue:

_Nota: se hai un account Alchemy puoi sostituire `demo` con la tua chiave API. [Registrati qui per un account Alchemy gratuito!](https://auth.alchemy.com/signup)_

```
wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo

>  {"jsonrpc":  "2.0", "id": 0, "method":  "eth_gasPrice"}

<  {"jsonrpc":  "2.0", "result":  "0xb2d05e00", "id": 0}

```

## Come usare i WebSocket {#how-to-use-websockets}

Per iniziare, apri un WebSocket utilizzando l'URL WebSocket per la tua app. Puoi trovare l'URL WebSocket della tua app aprendo la pagina dell'app nella [tua dashboard](https://dashboard.alchemy.com/) e cliccando su "View Key" (Visualizza chiave). Nota che l'URL della tua app per i WebSocket è diverso dal suo URL per le richieste HTTP, ma entrambi possono essere trovati cliccando su "View Key".

![Dove trovare il tuo URL WebSocket nella tua dashboard di Alchemy](./use-websockets.gif)

Qualsiasi API elencata nel [Riferimento API di Alchemy](https://www.alchemy.com/docs/reference/api-overview) può essere utilizzata tramite WebSocket. Per farlo, usa lo stesso payload che verrebbe inviato come corpo di una richiesta HTTP POST, ma invialo invece attraverso il WebSocket.

## Con Web3 {#with-web3}

Passare ai WebSocket mentre si utilizza una libreria client come Web3 è semplice. Basta passare l'URL WebSocket invece di quello HTTP quando si istanzia il proprio client Web3. Ad esempio:

```js
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/your-api-key")

web3.eth.getBlockNumber().then(console.log) // -> 7946893
```

## API di iscrizione {#subscription-api}

Quando si è connessi tramite un WebSocket, è possibile utilizzare due metodi aggiuntivi: `eth_subscribe` ed `eth_unsubscribe`. Questi metodi ti permetteranno di ascoltare eventi particolari e di essere avvisato immediatamente.

### `eth_subscribe` {#eth-subscribe}

Crea una nuova iscrizione per gli eventi specificati. [Scopri di più su `eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe).

#### Parametri {#parameters}

1. Tipi di iscrizione
2. Parametri opzionali

Il primo argomento specifica il tipo di evento da ascoltare. Il secondo argomento contiene opzioni aggiuntive che dipendono dal primo argomento. I diversi tipi di descrizione, le loro opzioni e i payload dei loro eventi sono descritti di seguito.

#### Restituisce {#returns}

L'ID dell'iscrizione: questo ID sarà allegato a qualsiasi evento ricevuto e può anche essere utilizzato per annullare l'iscrizione utilizzando `eth_unsubscribe`.

#### Eventi di iscrizione {#subscription-events}

Mentre l'iscrizione è attiva, riceverai eventi che sono oggetti con i seguenti campi:

- `jsonrpc`: Sempre "2.0"
- `method`: Sempre "eth_subscription"
- `params`: Un oggetto con i seguenti campi:
  - `subscription`: L'ID dell'iscrizione restituito dalla chiamata `eth_subscribe` che ha creato questa iscrizione.
  - `result`: Un oggetto il cui contenuto varia a seconda del tipo di iscrizione.

#### Tipi di iscrizione {#subscription-types}

1. `alchemy_newFullPendingTransactions`

Restituisce le informazioni della transazione per tutte le transazioni che vengono aggiunte allo stato in sospeso. Questo tipo di iscrizione si iscrive alle transazioni in sospeso, in modo simile alla chiamata standard di Web3 `web3.eth.subscribe("pendingTransactions")`, ma differisce in quanto emette _informazioni complete sulla transazione_ piuttosto che solo gli hash della transazione.

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

Quando si verifica una riorganizzazione della catena, questa iscrizione emetterà un evento contenente tutte le nuove intestazioni per la nuova catena. In particolare, questo significa che potresti vedere più intestazioni emesse con la stessa altezza, e quando ciò accade l'intestazione successiva dovrebbe essere considerata come quella corretta dopo una riorganizzazione.

Esempio:

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["newHeads"]}

<  {"jsonrpc":"2.0","id":2,"result":"0x9ce59a13059e417087c02d3236a0b1cc"}
<  {
  "jsonrpc":  "2.0",
  "method":  "eth_subscription",
  "params":  {
      "result":  {
          "extraData":  "0xd983010305844765746887676f312e342e328777696e646f7773",
          "gasLimit":  "0x47e7c4",
          "gasUsed":  "0x38658",
          "logsBloom":
"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
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

Emette log che fanno parte di blocchi appena aggiunti che corrispondono ai criteri di filtro specificati.

Quando si verifica una riorganizzazione della catena, i log che fanno parte dei blocchi sulla vecchia catena verranno emessi di nuovo con la proprietà `removed` impostata su `true`. Inoltre, vengono emessi i log che fanno parte dei blocchi sulla nuova catena, il che significa che è possibile vedere i log per la stessa transazione più volte in caso di riorganizzazione.

Parametri

1. Un oggetto con i seguenti campi:
   - `address` (opzionale): una stringa che rappresenta un indirizzo o un array di tali stringhe.
     - Verranno emessi solo i log creati da uno di questi indirizzi.
   - `topics`: un array di specificatori di argomenti.
     - Ogni specificatore di argomento è `null`, una stringa che rappresenta un argomento o un array di stringhe.
     - Ogni posizione nell'array che non è `null` limita i log emessi solo a quelli che hanno uno degli argomenti dati in quella posizione.

Alcuni esempi di specifiche degli argomenti:

- `[]`: Qualsiasi argomento consentito.
- `[A]`: A in prima posizione (e qualsiasi cosa dopo).
- `[null, B]`: Qualsiasi cosa in prima posizione e B in seconda posizione (e qualsiasi cosa dopo).
- `[A, B]`: A in prima posizione e B in seconda posizione (e qualsiasi cosa dopo).
- `[[A, B], [A, B]]`: (A o B) in prima posizione e (A o B) in seconda posizione (e qualsiasi cosa dopo).

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

Annulla un'iscrizione esistente in modo che non vengano inviati ulteriori eventi.

Parametri

1. ID dell'iscrizione, come precedentemente restituito da una chiamata `eth_subscribe`.

Restituisce

`true` se un'iscrizione è stata annullata con successo, o `false` se non esisteva alcuna iscrizione con l'ID fornito.

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

[Registrati su Alchemy](https://auth.alchemy.com) gratuitamente, dai un'occhiata alla [nostra documentazione](https://www.alchemy.com/docs/) e, per le ultime notizie, seguici su [Twitter](https://x.com/AlchemyPlatform).