---
title: WebSockets verwenden
description: Leitfaden zur Verwendung von WebSockets und Alchemy, um JSON-RPC-Anfragen zu stellen und Events zu abonnieren.
author: "Elan Halpern"
lang: de
tags: ["alchemy", "websockets", "querying", "javascript"]
skill: beginner
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

Dies ist ein Einstiegsleitfaden zur Verwendung von WebSockets und Alchemy, um Anfragen an die Ethereum Blockchain zu stellen.

## WebSockets vs. HTTP {#websockets-vs-http}

Im Gegensatz zu HTTP, müssen Sie mit WebSockets, nicht immer Anfragen stellen um Bestimmte Informationen zubekommen. WebSockets unterhaltet eine Netzwerkverbindung für Sie (bei bedarf) und beobachtet die veränderungen.

Wie bei jeder Netzwerkverbindung sollten Sie nicht davon ausgehen, dass ein WebSocket Verbindung ununterbrochen geöffnet bleibt, aber die korrekte Handhabung der abgesetzten Verbindungen und die Wiederverbindung von Hand kann eine Herausforderung sein, um es richtig zu machen. Ein weiterer Nachteil von WebSockets ist, dass Sie keine HTTP-Statuscodes in der Antwort erhalten, sondern nur die Fehlermeldung.

[Alchemy Web3](https://docs.alchemy.com/reference/api-overview) fügt automatisch die Behandlung von WebSocket-Fehlern und Wiederholungsversuchen hinzu, ohne dass eine Konfiguration erforderlich ist.

## Probieren Sie es aus {#try-it-out}

Der einfachste Weg, WebSockets zu testen, ist die Installation eines Kommandozeilen-Tools zur Erstellung von WebSocket-Anfragen, wie zum Beispiel [wscat](https://github.com/websockets/wscat). Mit wscat kannst du Anfragen wie folgt senden:

_Hinweis: Wenn Sie ein Alchemy-Konto haben, können Sie `demo` durch Ihren eigenen API-Schlüssel ersetzen. [Melden Sie sich hier für ein kostenloses Alchemy-Konto an!](https://auth.alchemy.com/signup)_

```
wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo

>  {"jsonrpc":  "2.0", "id": 0, "method":  "eth_gasPrice"}

<  {"jsonrpc":  "2.0", "result":  "0xb2d05e00", "id": 0}

```

## Wie man WebSockets verwendet {#how-to-use-websockets}

Öffnen Sie zunächst einen WebSocket über die WebSocket-URL für Ihre App. Sie können die WebSocket-URL Ihrer App finden, indem Sie die Seite der App in [Ihrem Dashboard](https://dashboard.alchemy.com/) öffnen und auf „View Key“ klicken. Beachten Sie, dass die URL Ihrer App für WebSockets sich von der URL für HTTP-Anfragen unterscheidet, aber beide durch Klicken auf „View Key“ gefunden werden können.

![Wo Sie Ihre WebSocket-URL in Ihrem Alchemy-Dashboard finden](./use-websockets.gif)

Jede der in der [Alchemy-API-Referenz](https://www.alchemy.com/docs/reference/api-overview) aufgeführten APIs kann über WebSocket verwendet werden. Verwenden Sie dazu dieselbe Nutzlast, die als Körper einer HTTP-POST-Anfrage gesendet würde, aber senden Sie diese Nutzlast stattdessen über den WebSocket.

## Mit Web3 {#with-web3}

Der Übergang zu WebSockets bei der Verwendung einer Client-Bibliothek wie Web3 ist einfach. Übergeben Sie bei der Instanziierung Ihres Web3-Clients einfach die WebSocket-URL anstelle der HTTP-URL. Beispiel:

```js
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/your-api-key")

web3.eth.getBlockNumber().then(console.log) // -> 7946893
```

## Abonnement-API {#subscription-api}

Wenn Sie über einen WebSocket verbunden sind, können Sie zwei zusätzliche Methoden verwenden: `eth_subscribe` und `eth_unsubscribe`. Mit diesen Methoden können Sie auf bestimmte Ereignisse lauschen und werden sofort benachrichtigt.

### `eth_subscribe` {#eth-subscribe}

Erstellt ein neues Abonnement für bestimmte Ereignisse. [Erfahren Sie mehr über `eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe).

#### Parameter {#parameters}

1. Abonnementtypen
2. Optionale Parameter

Das erste Argument gibt die Art des Ereignisses an, auf das gelauscht werden soll. Das zweite Argument enthält zusätzliche Optionen, die vom ersten Argument abhängen. Die verschiedenen Beschreibungstypen, ihre Optionen und ihre Ereignis-Nutzlasten werden im Folgenden beschrieben.

#### Rückgabewerte {#returns}

Die Abonnement-ID: Diese ID wird an alle empfangenen Ereignisse angehängt und kann auch verwendet werden, um das Abonnement mit `eth_unsubscribe` zu kündigen.

#### Abonnement-Ereignisse {#subscription-events}

Während das Abonnement aktiv ist, erhalten Sie Ereignisse, bei denen es sich um Objekte mit den folgenden Feldern handelt:

- `jsonrpc`: Immer „2.0“
- `method`: Immer „eth_subscription“
- `params`: Ein Objekt mit den folgenden Feldern:
  - `subscription`: Die Abonnement-ID, die von dem `eth_subscribe`-Aufruf zurückgegeben wurde, der dieses Abonnement erstellt hat.
  - `result`: Ein Objekt, dessen Inhalt je nach Art des Abonnements variiert.

#### Abonnementtypen {#subscription-types}

1. `alchemy_newFullPendingTransactions`

Gibt die Transaktionsinformationen für alle Transaktionen zurück, die dem ausstehenden Zustand hinzugefügt werden. Dieser Abonnementtyp abonniert ausstehende Transaktionen, ähnlich dem Standard-Web3-Aufruf `web3.eth.subscribe("pendingTransactions")`, unterscheidet sich aber dadurch, dass er _vollständige Transaktionsinformationen_ und nicht nur Transaktions-Hashes ausgibt.

Beispiel:

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

Gibt jedes Mal ein Ereignis aus, wenn ein neuer Header zur Kette hinzugefügt wird, auch während einer Reorganisation der Kette.

Wenn eine Reorganisation der Kette stattfindet, gibt dieses Abonnement ein Ereignis aus, das alle neuen Header für die neue Kette enthält. Das bedeutet insbesondere, dass Sie möglicherweise mehrere Header mit der gleichen Höhe sehen, und wenn dies geschieht, sollte der spätere Header als der richtige nach einer Reorganisation angesehen werden.

Beispiel:

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

Gibt Protokolle aus, die Teil neu hinzugefügter Blöcke sind und den angegebenen Filterkriterien entsprechen.

Wenn eine Reorganisation der Kette auftritt, werden Protokolle, die Teil von Blöcken in der alten Kette sind, erneut ausgegeben, wobei die Eigenschaft `removed` auf `true` gesetzt ist. Darüber hinaus werden Protokolle, die Teil der Blöcke in der neuen Kette sind, ausgegeben, was bedeutet, dass es im Falle einer Reorganisation möglich ist, Protokolle für dieselbe Transaktion mehrmals zu sehen.

Parameter

1. Ein Objekt mit den folgenden Feldern:
   - `address` (optional): entweder eine Zeichenkette, die eine Adresse darstellt, oder ein Array von solchen Zeichenketten.
     - Nur Protokolle, die von einer dieser Adressen erstellt wurden, werden ausgegeben.
   - `topics`: ein Array von Topic-Spezifizierern.
     - Jeder Topic-Spezifizierer ist entweder `null`, eine Zeichenkette, die ein Topic darstellt, oder ein Array von Zeichenketten.
     - Jede Position im Array, die nicht `null` ist, schränkt die ausgegebenen Protokolle auf diejenigen ein, die an dieser Position eines der angegebenen Topics aufweisen.

Einige Beispiele für Topic-Spezifikationen:

- `[]`: Alle Topics sind erlaubt.
- `[A]`: A an erster Position (und alles danach).
- `[null, B]`: Beliebiges an erster Position und B an zweiter Position (und alles danach).
- `[A, B]`: A an erster Position und B an zweiter Position (und alles danach).
- `[[A, B], [A, B]]`: (A oder B) an erster Position und (A oder B) an zweiter Position (und alles danach).

Beispiel:

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

Bricht ein bestehendes Abonnement ab, sodass keine weiteren Ereignisse gesendet werden.

Parameter

1. Abonnement-ID, wie sie zuvor von einem `eth_subscribe`-Aufruf zurückgegeben wurde.

Rückgaben

`true`, wenn ein Abonnement erfolgreich gekündigt wurde, oder `false`, wenn kein Abonnement mit der angegebenen ID existierte.

Beispiel:

**Anfrage**

```
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key
-X POST
-H "Content-Type: application/json"
-d '{"id": 1, "method": "eth_unsubscribe", "params": ["0x9cef478923ff08bf67fde6c64013158d"]}'


```

**Ergebnis**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true
}
```

---

[Melden Sie sich kostenlos bei Alchemy an](https://auth.alchemy.com), sehen Sie sich [unsere Dokumentation](https://www.alchemy.com/docs/) an und für die neuesten Nachrichten folgen Sie uns auf [Twitter](https://x.com/AlchemyPlatform).
