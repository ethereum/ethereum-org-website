---
title: WebSockets verwenden
description: Leitfaden zur Verwendung von WebSockets, um JSON-RPC-Anfragen zu stellen und Ereignisse zu abonnieren, mit jedem Ethereum-Knoten-Anbieter.
author: "Elan Halpern"
lang: de
tags: ["Alchemy", "websockets", "abfragen", "JavaScript"]
skill: beginner
breadcrumb: WebSockets
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

Dies ist ein Einstiegsleitfaden zur Verwendung von WebSockets, um Anfragen an die Ethereum-Blockchain zu stellen. Die Beispiele verwenden Standard-JSON-RPC-Methoden, sodass sie mit jedem Knoten oder Knoten-Anbieter funktionieren, der einen WebSocket-Endpunkt anbietet, einschließlich Alchemy.

## WebSockets vs. HTTP {#websockets-vs-http}

Im Gegensatz zu HTTP müssen Sie bei WebSockets nicht ständig Anfragen stellen, wenn Sie bestimmte Informationen wünschen. WebSockets halten eine Netzwerkverbindung für Sie aufrecht (wenn es richtig gemacht wird) und lauschen auf Änderungen.

Wie bei jeder Netzwerkverbindung sollten Sie nicht davon ausgehen, dass ein WebSocket für immer ohne Unterbrechung geöffnet bleibt. Das korrekte manuelle Behandeln von abgebrochenen Verbindungen und Wiederverbindungen kann jedoch eine Herausforderung sein. Ein weiterer Nachteil von WebSockets ist, dass Sie in der Antwort keine HTTP-Statuscodes erhalten, sondern nur die Fehlernachricht.

Client-Bibliotheken können dies für Sie übernehmen. Zum Beispiel stellt der [WebSocket-Transport von Viem](https://viem.sh/docs/clients/transports/websocket) bei einem Socket-Fehler standardmäßig die Verbindung wieder her und sendet Keep-Alive-Pings.

## Probieren Sie es aus {#try-it-out}

Sie benötigen eine WebSocket-URL für einen Ethereum-Knoten. Knoten-Anbieter geben Ihnen eine, wenn Sie einen Schlüssel für die Programmierschnittstelle (API) erstellen, normalerweise in der Form `wss://<provider-host>/<your-api-key>`. Zum Beispiel sieht eine Alchemy-URL für das Ethereum Mainnet wie folgt aus: `wss://eth-mainnet.g.alchemy.com/v2/<your-api-key>` ([melden Sie sich für ein kostenloses Alchemy-Konto an](https://auth.alchemy.com/signup)). Siehe [Knoten als Dienstleistung](/developers/docs/nodes-and-clients/nodes-as-a-service/) für andere Anbieter, oder verwenden Sie den WebSocket-Endpunkt [Ihres eigenen Knotens](/developers/docs/nodes-and-clients/run-a-node/). Öffentliche Endpunkte wie `wss://ethereum-rpc.publicnode.com` funktionieren auch für schnelle Experimente, sind jedoch ratenlimitiert und unterstützen möglicherweise nicht jeden Abonnementtyp.

Der einfachste Weg, WebSockets zu testen, ist die Installation eines Befehlszeilentools für WebSocket-Anfragen wie [wscat](https://github.com/websockets/wscat). Mit wscat können Sie Anfragen wie folgt senden:

```sh
npx wscat -c wss://<provider-host>/<your-api-key>

> {"jsonrpc": "2.0", "id": 0, "method": "eth_gasPrice"}

< {"jsonrpc": "2.0", "result": "0x41f9de2", "id": 0}
```

Zeilen, die mit `>` beginnen, sind das, was Sie eingeben, und Zeilen, die mit `<` beginnen, sind das, was der Knoten zurücksendet.

## Wie man WebSockets verwendet {#how-to-use-websockets}

Öffnen Sie zu Beginn einen WebSocket über die WebSocket-URL Ihres Anbieters. Bei Alchemy finden Sie diese, indem Sie Ihre App im [Dashboard](https://dashboard.alchemy.com/) öffnen und sich deren Schlüssel für die Programmierschnittstelle (API) ansehen. Beachten Sie, dass sich die URL für WebSockets (`wss://`) von der URL für HTTP-Anfragen (`https://`) unterscheidet, obwohl die meisten Anbieter denselben API-Schlüssel für beides verwenden.

![Wo Sie Ihre WebSocket-URL in Ihrem Alchemy-Dashboard finden](./use-websockets.mp4#602x280)

Jede der [JSON-RPC-Methoden](/developers/docs/apis/json-rpc/), die Ihr Anbieter unterstützt, kann über WebSocket verwendet werden. Verwenden Sie dazu dieselbe Payload, die als Textkörper einer HTTP-POST-Anfrage gesendet werden würde, senden Sie diese Payload jedoch stattdessen über den WebSocket.

## Mit Web3 {#with-web3}

Der Wechsel zu WebSockets bei der Verwendung einer Client-Bibliothek wie [Viem](https://viem.sh/) ist einfach. Verwenden Sie den `webSocket`-Transport mit Ihrer WebSocket-URL anstelle des `http`-Transports. Speichern Sie dies beispielsweise nach `npm install viem` als `index.mjs` und führen Sie `node index.mjs` aus:

```js
import { createPublicClient, webSocket } from "viem"
import { mainnet } from "viem/chains"

const client = createPublicClient({
  chain: mainnet,
  transport: webSocket("wss://<provider-host>/<your-api-key>"),
})

console.log(await client.getBlockNumber()) // -> 26243602n

// Abonniere neue Blöcke über denselben WebSocket
const unwatch = client.watchBlocks({
  onBlock: (block) => {
    console.log(block.number, block.hash)
    unwatch()
    process.exit(0)
  },
})
```

## Abonnement-API {#subscription-api}

Wenn Sie über einen WebSocket verbunden sind, können Sie zwei zusätzliche Methoden verwenden: `eth_subscribe` und `eth_unsubscribe`. Diese Methoden ermöglichen es Ihnen, auf bestimmte Ereignisse zu lauschen und sofort benachrichtigt zu werden.

### `eth_subscribe` {#eth-subscribe}

Erstellt ein neues Abonnement für bestimmte Ereignisse. [Erfahren Sie mehr über `eth_subscribe`](https://geth.ethereum.org/docs/interacting-with-geth/rpc/pubsub).

#### Parameter {#parameters}

1. Abonnementtypen
2. Optionale Parameter

Das erste Argument gibt die Art des Ereignisses an, auf das gelauscht werden soll. Das zweite Argument enthält zusätzliche Optionen, die vom ersten Argument abhängen. Die verschiedenen Beschreibungstypen, ihre Optionen und ihre Ereignis-Payloads werden unten beschrieben.

#### Rückgabewerte {#returns}

Die Abonnement-ID: Diese ID wird an alle empfangenen Ereignisse angehängt und kann auch verwendet werden, um das Abonnement mit `eth_unsubscribe` zu kündigen.

#### Abonnement-Ereignisse {#subscription-events}

Solange das Abonnement aktiv ist, erhalten Sie Ereignisse, die Objekte mit den folgenden Feldern sind:

- `jsonrpc`: Immer "2.0"
- `method`: Immer "eth_subscription"
- `params`: Ein Objekt mit den folgenden Feldern:
  - `subscription`: Die Abonnement-ID, die durch den Aufruf von `eth_subscribe` zurückgegeben wurde, der dieses Abonnement erstellt hat.
  - `result`: Ein Objekt, dessen Inhalt je nach Art des Abonnements variiert.

#### Abonnementtypen {#subscription-types}

1. `newHeads`

Gibt jedes Mal ein Ereignis aus, wenn der Chain ein neuer Header hinzugefügt wird, auch während eines Chain-Reorgs.

Wenn ein Chain-Reorg auftritt, gibt dieses Abonnement ein Ereignis aus, das alle neuen Header für die neue Chain enthält. Insbesondere bedeutet dies, dass Sie möglicherweise mehrere Header sehen, die mit derselben Höhe ausgegeben werden. Wenn dies geschieht, sollte der spätere Header nach einem Reorg als der korrekte angesehen werden.

Beispiel:

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

Gibt Protokolle (Logs) aus, die Teil neu hinzugefügter Blöcke sind und bestimmten Filterkriterien entsprechen.

Wenn ein Chain-Reorg auftritt, werden Protokolle, die Teil von Blöcken auf der alten Chain sind, erneut ausgegeben, wobei die Eigenschaft `removed` auf `true` gesetzt ist. Darüber hinaus werden Protokolle ausgegeben, die Teil der Blöcke auf der neuen Chain sind, was bedeutet, dass es möglich ist, im Falle eines Reorgs Protokolle für dieselbe Transaktion mehrmals zu sehen.

Parameter

1. Ein Objekt mit den folgenden Feldern:
   - `address` (optional): entweder ein String, der eine Adresse darstellt, oder ein Array solcher Strings.
     - Nur Protokolle, die von einer dieser Adressen erstellt wurden, werden ausgegeben.
   - `topics`: ein Array von Topic-Spezifikatoren.
     - Jeder Topic-Spezifikator ist entweder `null`, ein String, der ein Topic darstellt, oder ein Array von Strings.
     - Jede Position im Array, die nicht `null` ist, beschränkt die ausgegebenen Protokolle auf diejenigen, die eines der angegebenen Topics an dieser Position haben.

Einige Beispiele für Topic-Spezifikationen:

- `[]`: Alle Topics erlaubt.
- `[A]`: A an erster Position (und alles danach).
- `[null, B]`: Alles an erster Position und B an zweiter Position (und alles danach).
- `[A, B]`: A an erster Position und B an zweiter Position (und alles danach).
- `[[A, B], [A, B]]`: (A oder B) an erster Position und (A oder B) an zweiter Position (und alles danach).

Beispiel:

Dieses Beispiel lauscht auf `Deposit`-Ereignisse vom [WETH-Vertrag](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2) im Ethereum Mainnet:

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

Gibt den Hash jeder Transaktion aus, die dem ausstehenden Zustand (seinem Mempool) des Knotens hinzugefügt wird.

Beispiel:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}

< {"jsonrpc":"2.0","result":"0x1c2365b029179adf1e84b9e327315249","id":1}
< {"jsonrpc":"2.0","method":"eth_subscription","params":{"result":"0x4a62d0ad7c8868fbbfa10604e68638e637c6fc6f64fd1fb4ca042dcd0158c992","subscription":"0x1c2365b029179adf1e84b9e327315249"}}
```

Einige Anbieter bieten auch ihre eigenen Abonnementtypen an. Zum Beispiel gibt Alchemys [`alchemy_pendingTransactions`](https://www.alchemy.com/docs/reference/alchemy-pendingtransactions) _vollständige Transaktionsobjekte_ anstelle von nur Hashes aus und akzeptiert optionale Filter wie `fromAddress`, `toAddress` und `hashesOnly`. Diese sind nicht Teil der Standard-JSON-RPC-Programmierschnittstelle (API), sodass sie nur mit diesem Anbieter funktionieren.

### `eth_unsubscribe` {#eth-unsubscribe}

Kündigt ein bestehendes Abonnement, sodass keine weiteren Ereignisse gesendet werden.

Parameter

1. Abonnement-ID, wie zuvor von einem `eth_subscribe`-Aufruf zurückgegeben.

Rückgabewerte

`true`, wenn ein Abonnement erfolgreich gekündigt wurde, oder `false`, wenn kein Abonnement mit der angegebenen ID existierte.

Ein Abonnement existiert nur auf der WebSocket-Verbindung, die es erstellt hat, daher muss `eth_unsubscribe` über dieselbe Verbindung gesendet werden. Es kann nicht als separate HTTP-Anfrage gesendet werden. Das Schließen der Verbindung kündigt auch alle ihre Abonnements.

Beispiel:

```json
> {"jsonrpc": "2.0", "id": 2, "method": "eth_unsubscribe", "params": ["0xe0d4abf5caf333fbf94c5f02182e6469"]}

< {"jsonrpc":"2.0","result":true,"id":2}
```

---

[Melden Sie sich kostenlos bei Alchemy an](https://auth.alchemy.com), sehen Sie sich die [Dokumentation von Alchemy](https://www.alchemy.com/docs/) an und folgen Sie Alchemy auf [Twitter](https://x.com/Alchemy) für die neuesten Nachrichten.
