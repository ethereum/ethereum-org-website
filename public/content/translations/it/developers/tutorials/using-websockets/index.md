---
title: Usare i WebSocket
description: Guida all'uso dei WebSocket per effettuare richieste JSON-RPC e iscriversi agli eventi, con qualsiasi fornitore di nodi di Ethereum.
author: "Elan Halpern"
lang: it
tags: ["Alchemy", "websocket", "interrogazione", "JavaScript"]
skill: beginner
breadcrumb: WebSocket
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

Questa è una guida di base all'uso dei WebSocket per effettuare richieste alla blockchain di Ethereum. Gli esempi usano metodi JSON-RPC standard, quindi funzionano con qualsiasi nodo o fornitore di nodi che offra un endpoint WebSocket, incluso Alchemy.

## WebSocket vs HTTP {#websockets-vs-http}

A differenza dell'HTTP, con i WebSocket non è necessario effettuare continuamente richieste quando si desiderano informazioni specifiche. I WebSocket mantengono una connessione di rete per te (se implementati correttamente) e restano in ascolto dei cambiamenti.

Come per qualsiasi connessione di rete, non si dovrebbe presumere che un WebSocket rimanga aperto per sempre senza interruzioni, ma gestire correttamente le connessioni interrotte e la riconnessione manualmente può essere difficile da implementare in modo corretto. Un altro svantaggio dei WebSocket è che non si ottengono i codici di stato HTTP nella risposta, ma solo il messaggio di errore.

Le librerie client possono gestirlo al posto tuo. Ad esempio, il [trasporto WebSocket di Viem](https://viem.sh/docs/clients/transports/websocket) si riconnette in caso di guasto del socket e invia ping di keep-alive per impostazione predefinita.

## Provalo {#try-it-out}

Hai bisogno di un URL WebSocket per un nodo di Ethereum. I fornitori di nodi te ne forniscono uno quando crei una chiave per l'interfaccia di programmazione delle applicazioni (API), di solito nella forma `wss://<provider-host>/<your-api-key>`. Ad esempio, un URL della Mainnet di Ethereum di Alchemy ha questo aspetto: `wss://eth-mainnet.g.alchemy.com/v2/<your-api-key>` ([registrati per un account Alchemy gratuito](https://auth.alchemy.com/signup)). Consulta i [nodi come servizio](/developers/docs/nodes-and-clients/nodes-as-a-service/) per altri fornitori, oppure usa l'endpoint WebSocket del [tuo nodo](/developers/docs/nodes-and-clients/run-a-node/). Anche gli endpoint pubblici come `wss://ethereum-rpc.publicnode.com` funzionano per esperimenti rapidi, ma hanno limiti di frequenza e potrebbero non supportare ogni tipo di iscrizione.

Il modo più semplice per testare i WebSocket è installare uno strumento a riga di comando per effettuare richieste WebSocket come [wscat](https://github.com/websockets/wscat). Usando wscat, puoi inviare richieste nel modo seguente:

```sh
npx wscat -c wss://<provider-host>/<your-api-key>

> {"jsonrpc": "2.0", "id": 0, "method": "eth_gasPrice"}

< {"jsonrpc": "2.0", "result": "0x41f9de2", "id": 0}
```

Le righe che iniziano con `>` sono quelle che digiti, e le righe che iniziano con `<` sono quelle che il nodo restituisce.

## Come usare i WebSocket {#how-to-use-websockets}

Per iniziare, apri un WebSocket usando l'URL WebSocket del tuo fornitore. Con Alchemy, puoi trovarlo aprendo la tua app nella [dashboard](https://dashboard.alchemy.com/) e visualizzando la sua chiave per l'interfaccia di programmazione delle applicazioni (API). Nota che l'URL per i WebSocket (`wss://`) è diverso dall'URL per le richieste HTTP (`https://`), sebbene la maggior parte dei fornitori usi la stessa chiave API per entrambi.

![Dove trovare il tuo URL WebSocket nella dashboard di Alchemy](./use-websockets.mp4#602x280)

Qualsiasi dei [metodi JSON-RPC](/developers/docs/apis/json-rpc/) supportati dal tuo fornitore può essere usato tramite WebSocket. Per farlo, usa lo stesso payload che verrebbe inviato come corpo di una richiesta HTTP POST, ma invialo invece attraverso il WebSocket.

## Con il Web3 {#with-web3}

Passare ai WebSocket mentre si usa una libreria client come [Viem](https://viem.sh/) è semplice. Usa il trasporto `webSocket` con il tuo URL WebSocket invece del trasporto `http`. Ad esempio, dopo `npm install viem`, salvalo come `index.mjs` ed esegui `node index.mjs`:

```js
import { createPublicClient, webSocket } from "viem"
import { mainnet } from "viem/chains"

const client = createPublicClient({
  chain: mainnet,
  transport: webSocket("wss://<provider-host>/<your-api-key>"),
})

console.log(await client.getBlockNumber()) // -> 26243602n

// Iscriviti ai nuovi blocchi tramite lo stesso WebSocket
const unwatch = client.watchBlocks({
  onBlock: (block) => {
    console.log(block.number, block.hash)
    unwatch()
    process.exit(0)
  },
})
```

## API di iscrizione {#subscription-api}

Quando si è connessi tramite un WebSocket, è possibile usare due metodi aggiuntivi: `eth_subscribe` e `eth_unsubscribe`. Questi metodi ti permetteranno di restare in ascolto di eventi particolari e di essere notificato immediatamente.

### `eth_subscribe` {#eth-subscribe}

Crea una nuova iscrizione per gli eventi specificati. [Scopri di più su `eth_subscribe`](https://geth.ethereum.org/docs/interacting-with-geth/rpc/pubsub).

#### Parametri {#parameters}

1. Tipi di iscrizione
2. Parametri opzionali

Il primo argomento specifica il tipo di evento da ascoltare. Il secondo argomento contiene opzioni aggiuntive che dipendono dal primo argomento. I diversi tipi di descrizione, le loro opzioni e i payload dei loro eventi sono descritti di seguito.

#### Restituisce {#returns}

L'ID dell'iscrizione: questo ID sarà allegato a tutti gli eventi ricevuti e può anche essere usato per annullare l'iscrizione usando `eth_unsubscribe`.

#### Eventi di iscrizione {#subscription-events}

Mentre l'iscrizione è attiva, riceverai eventi che sono oggetti con i seguenti campi:

- `jsonrpc`: Sempre "2.0"
- `method`: Sempre "eth_subscription"
- `params`: Un oggetto con i seguenti campi:
  - `subscription`: L'ID dell'iscrizione restituito dalla chiamata `eth_subscribe` che ha creato questa iscrizione.
  - `result`: Un oggetto il cui contenuto varia a seconda del tipo di iscrizione.

#### Tipi di iscrizione {#subscription-types}

1. `newHeads`

Emette un evento ogni volta che un nuovo header viene aggiunto alla catena, anche durante una riorganizzazione della catena.

Quando si verifica una riorganizzazione della catena, questa iscrizione emetterà un evento contenente tutti i nuovi header per la nuova catena. In particolare, questo significa che potresti vedere più header emessi con la stessa altezza, e quando ciò accade l'header successivo dovrebbe essere considerato quello corretto dopo una riorganizzazione.

Esempio:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newHeads"]}

< {"jsonrpc":"2.0","result":"0xe0d4abf5caf333fbf94c5f02182e6469","id":1}
< {
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "result": {
      "baseFeePerGas": "0x41f9de2",
      "blobGasUsed": "0xc0000",
      "difficulty": "0x0",
      "excessBlobGas": "0xa88af38",
      "extraData": "0xe29ca82051756173617220287175617361722e77696e2920e29ca8",
      "gasLimit": "0x3938700",
      "gasUsed": "0x1a17224",
      "hash": "0xedc43a71b7ff13880bdbe7b748a225b91a11a91e79173fe28011363c10acaea5",
      "logsBloom": "0x4beaef4e7dbb1bfdb3df673fab6cdf1cf9fc0e7f743d672c761551767b7dad953d79cf86e56e6195ae1b57dff20a0fd46e57c545af166ff49394df3839e269a6ff877b6baf9d899fd9666c58b7dfa7add4febf78b466e7f71af2dcbad53fdcfa3f7277d2fbfffcff953f9ef37b3af8fffb296a3adb94dc463ff0d6d5173f1beda0fd662d77eaedb34ff99f3eeed38a77e7d0cd63e917d4efbdfcb7d0d19437f98ff60773d0effbfbdfdbef9ebbf6a2c35efedd677a795d3ccd777e127eeb657f6a8dffaf64f3b8d998b516c78e661ef77fded57fb66d687fab17739b3ef5aa2765777d8cce0ef59a9ceebeceabbb7f76ed7fc65df7e8bccf7938eb3fb7de57f7",
      "miner": "0x396343362be2a4da1ce0c1c210945346fb82aa49",
      "mixHash": "0xa72c9201f502df607d0d7551ccc171ce37a5146747f04c6c495b0aebecb045c7",
      "nonce": "0x0000000000000000",
      "number": "0x1907212",
      "parentBeaconBlockRoot": "0x34f3f289459913dd80ec9c20aa535866cd2bd310ac26e47570601e263d593735",
      "parentHash": "0xe62c150ffbbd04e95343f945b70fa53756aba6c0bf96c0440d1ae354fa007a7c",
      "receiptsRoot": "0x94951d882544da76e30b145b26a39b126e8acfba9db929351b84b2f4c847e3ed",
      "requestsHash": "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
      "size": "0x1f4bc",
      "stateRoot": "0x12771ea73858277034cf6604aee0abbf889c15091ab8ef9be81bf7258458a036",
      "timestamp": "0x6ad92b47",
      "transactionsRoot": "0xbd58ebe5c8c5519e458266a7db3ad049a7bffa106dc9a14f2fe6edb3f8ad5d70",
      "withdrawalsRoot": "0x56a083b6140663c9e98c30167ee90a1ffb157505ba89cb584583b71cba100d2a"
    },
    "subscription": "0xe0d4abf5caf333fbf94c5f02182e6469"
  }
}
```

2. `logs`

Emette i log che fanno parte dei blocchi appena aggiunti e che corrispondono ai criteri di filtro specificati.

Quando si verifica una riorganizzazione della catena, i log che fanno parte dei blocchi sulla vecchia catena verranno emessi di nuovo con la proprietà `removed` impostata su `true`. Inoltre, vengono emessi i log che fanno parte dei blocchi sulla nuova catena, il che significa che è possibile vedere i log per la stessa transazione più volte in caso di riorganizzazione.

Parametri

1. Un oggetto con i seguenti campi:
   - `address` (opzionale): una stringa che rappresenta un indirizzo o un array di tali stringhe.
     - Verranno emessi solo i log creatati da uno di questi indirizzi.
   - `topics`: un array di specificatori di topic.
     - Ogni specificatore di topic è `null`, una stringa che rappresenta un topic o un array di stringhe.
     - Ogni posizione nell'array che non è `null` limita i log emessi solo a quelli che hanno uno dei topic dati in quella posizione.

Alcuni esempi di specifiche dei topic:

- `[]`: Qualsiasi topic consentito.
- `[A]`: A in prima posizione (e qualsiasi cosa dopo).
- `[null, B]`: Qualsiasi cosa in prima posizione e B in seconda posizione (e qualsiasi cosa dopo).
- `[A, B]`: A in prima posizione e B in seconda posizione (e qualsiasi cosa dopo).
- `[[A, B], [A, B]]`: (A o B) in prima posizione e (A o B) in seconda posizione (e qualsiasi cosa dopo).

Esempio:

Questo esempio resta in ascolto degli eventi `Deposit` dal [contratto dell'ether incapsulato (weth)](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2) sulla Mainnet di Ethereum:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["logs", {"address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "topics": ["0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c"]}]}

< {"jsonrpc":"2.0","result":"0x69a0e61ae8e3d61a93479858e8f1b43a","id":1}
< {
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "result": {
      "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      "blockHash": "0x168e06e5733df993078bb635cb9925f80ff39d12a36bd301052c44d7bf6b6068",
      "blockNumber": "0x190720e",
      "blockTimestamp": "0x6ad92b17",
      "data": "0x000000000000000000000000000000000000000000000000039ed0c3d7848a1c",
      "logIndex": "0x11",
      "removed": false,
      "topics": [
        "0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c",
        "0x00000000000000000000000023617e59a5925b2a4bf75d73ff6711cd0b29de85"
      ],
      "transactionHash": "0xc956e7012c2af8ff87db88e059336842ee872bfc93de1eac9760510d0bd801be",
      "transactionIndex": "0xb"
    },
    "subscription": "0x69a0e61ae8e3d61a93479858e8f1b43a"
  }
}
```

3. `newPendingTransactions`

Emette l'hash di ogni transazione che viene aggiunta allo stato in sospeso del nodo (la sua mempool).

Esempio:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}

< {"jsonrpc":"2.0","result":"0x1c2365b029179adf1e84b9e327315249","id":1}
< {"jsonrpc":"2.0","method":"eth_subscription","params":{"result":"0x4a62d0ad7c8868fbbfa10604e68638e637c6fc6f64fd1fb4ca042dcd0158c992","subscription":"0x1c2365b029179adf1e84b9e327315249"}}
```

Alcuni fornitori offrono anche i propri tipi di iscrizione. Ad esempio, [`alchemy_pendingTransactions`](https://www.alchemy.com/docs/reference/alchemy-pendingtransactions) di Alchemy emette _oggetti di transazione completi_ invece di soli hash, e accetta i filtri opzionali `fromAddress`, `toAddress` e `hashesOnly`. Questi non fanno parte dell'interfaccia di programmazione delle applicazioni (API) JSON-RPC standard, quindi funzionano solo con quel fornitore.

### `eth_unsubscribe` {#eth-unsubscribe}

Annulla un'iscrizione esistente in modo che non vengano inviati ulteriori eventi.

Parametri

1. ID dell'iscrizione, come restituito in precedenza da una chiamata `eth_subscribe`.

Restituisce

`true` se un'iscrizione è stata annullata con successo, o `false` se non esisteva alcuna iscrizione con l'ID fornito.

Un'iscrizione esiste solo sulla connessione WebSocket che l'ha creata, quindi `eth_unsubscribe` deve essere inviato su quella stessa connessione. Non può essere inviato come richiesta HTTP separata. La chiusura della connessione annulla anche tutte le sue iscrizioni.

Esempio:

```json
> {"jsonrpc": "2.0", "id": 2, "method": "eth_unsubscribe", "params": ["0xe0d4abf5caf333fbf94c5f02182e6469"]}

< {"jsonrpc":"2.0","result":true,"id":2}
```

---

[Registrati su Alchemy](https://auth.alchemy.com) gratuitamente, dai un'occhiata alla [documentazione di Alchemy](https://www.alchemy.com/docs/) e, per le ultime notizie, segui Alchemy su [Twitter](https://x.com/Alchemy).
