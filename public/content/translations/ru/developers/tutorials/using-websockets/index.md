---
title: "Использование WebSockets"
description: "Руководство по использованию WebSockets для выполнения запросов JSON-RPC и подписки на события с любым провайдером узлов Эфириума."
author: "Элан Халперн"
lang: ru
tags:
  - alchemy
  - websockets
  - запросы
  - javascript
skill: beginner
breadcrumb: WebSockets
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

Это руководство начального уровня по использованию WebSockets для выполнения запросов к блокчейну Эфириума. В примерах используются стандартные методы JSON-RPC, поэтому они работают с любым узлом или провайдером узлов, который предлагает конечную точку WebSocket, включая Alchemy.

## WebSockets против HTTP {#websockets-vs-http}

В отличие от HTTP, при использовании WebSockets вам не нужно постоянно делать запросы, когда вы хотите получить определенную информацию. WebSockets поддерживают сетевое подключение для вас (если все сделано правильно) и прослушивают изменения.

Как и в случае с любым сетевым подключением, не следует предполагать, что WebSocket будет оставаться открытым вечно без прерываний, но правильная обработка разорванных соединений и переподключение вручную могут быть сложной задачей. Еще одним недостатком WebSockets является то, что вы не получаете коды состояния HTTP в ответе, а только сообщение об ошибке.

Клиентские библиотеки могут справиться с этим за вас. Например, [транспорт WebSocket в Viem](https://viem.sh/docs/clients/transports/websocket) по умолчанию переподключается при сбое сокета и отправляет пинги для поддержания активности (keep-alive).

## Попробуйте {#try-it-out}

Вам нужен URL-адрес WebSocket для узла Эфириума. Провайдеры узлов предоставляют его при создании ключа программного интерфейса приложения (API), обычно в формате `wss://<provider-host>/<your-api-key>`. Например, URL-адрес основной сети Ethereum в Alchemy выглядит как `wss://eth-mainnet.g.alchemy.com/v2/<your-api-key>` ([зарегистрируйте бесплатный аккаунт Alchemy](https://auth.alchemy.com/signup)). Информацию о других провайдерах см. в разделе [узлы как услуга](/developers/docs/nodes-and-clients/nodes-as-a-service/), или используйте конечную точку WebSocket [вашего собственного узла](/developers/docs/nodes-and-clients/run-a-node/). Публичные конечные точки, такие как `wss://ethereum-rpc.publicnode.com`, также подходят для быстрых экспериментов, но они имеют ограничения по частоте запросов и могут не поддерживать все типы подписок.

Самый простой способ протестировать WebSockets — установить инструмент командной строки для выполнения запросов WebSocket, такой как [wscat](https://github.com/websockets/wscat). Используя wscat, вы можете отправлять запросы следующим образом:

```sh
npx wscat -c wss://<provider-host>/<your-api-key>

> {"jsonrpc": "2.0", "id": 0, "method": "eth_gasPrice"}

< {"jsonrpc": "2.0", "result": "0x41f9de2", "id": 0}
```

Строки, начинающиеся с `>`, — это то, что вы вводите, а строки, начинающиеся с `<`, — это то, что узел отправляет в ответ.

## Как использовать WebSockets {#how-to-use-websockets}

Для начала откройте WebSocket, используя URL-адрес WebSocket вашего провайдера. В Alchemy вы можете найти его, открыв свое приложение на [панели управления](https://dashboard.alchemy.com/) и просмотрев его ключ программного интерфейса приложения (API). Обратите внимание, что URL-адрес для WebSockets (`wss://`) отличается от URL-адреса для HTTP-запросов (`https://`), хотя большинство провайдеров используют один и тот же ключ API для обоих.

![Где найти URL-адрес WebSocket на панели управления Alchemy](./use-websockets.mp4#602x280)

Любой из [методов JSON-RPC](/developers/docs/apis/json-rpc/), поддерживаемых вашим провайдером, можно использовать через WebSocket. Для этого используйте ту же полезную нагрузку, которая была бы отправлена в теле HTTP-запроса POST, но вместо этого отправьте эту полезную нагрузку через WebSocket.

## С Web3 {#with-web3}

Переход на WebSockets при использовании клиентской библиотеки, такой как [Viem](https://viem.sh/), прост. Используйте транспорт `webSocket` с вашим URL-адресом WebSocket вместо транспорта `http`. Например, после `npm install viem` сохраните это как `index.mjs` и запустите `node index.mjs`:

```js
import { createPublicClient, webSocket } from "viem"
import { mainnet } from "viem/chains"

const client = createPublicClient({
  chain: mainnet,
  transport: webSocket("wss://<provider-host>/<your-api-key>"),
})

console.log(await client.getBlockNumber()) // -> 26243602n

// Подписаться на новые блоки через тот же WebSocket
const unwatch = client.watchBlocks({
  onBlock: (block) => {
    console.log(block.number, block.hash)
    unwatch()
    process.exit(0)
  },
})
```

## API подписок {#subscription-api}

При подключении через WebSocket вы можете использовать два дополнительных метода: `eth_subscribe` и `eth_unsubscribe`. Эти методы позволят вам прослушивать определенные события и немедленно получать уведомления.

### `eth_subscribe` {#eth-subscribe}

Создает новую подписку на указанные события. [Узнайте больше о `eth_subscribe`](https://geth.ethereum.org/docs/interacting-with-geth/rpc/pubsub).

#### Параметры {#parameters}

1. Типы подписок
2. Необязательные параметры

Первый аргумент указывает тип события для прослушивания. Второй аргумент содержит дополнительные параметры, которые зависят от первого аргумента. Различные типы описаний, их параметры и полезные нагрузки событий описаны ниже.

#### Возвращает {#returns}

ID подписки: этот идентификатор будет прикреплен к любым полученным событиям, а также может быть использован для отмены подписки с помощью `eth_unsubscribe`.

#### События подписки {#subscription-events}

Пока подписка активна, вы будете получать события, которые представляют собой объекты со следующими полями:

- `jsonrpc`: всегда «2.0»
- `method`: всегда «eth_subscription»
- `params`: объект со следующими полями:
  - `subscription`: ID подписки, возвращенный вызовом `eth_subscribe`, который создал эту подписку.
  - `result`: объект, содержимое которого зависит от типа подписки.

#### Типы подписок {#subscription-types}

1. `newHeads`

Генерирует событие каждый раз, когда в цепь добавляется новый заголовок, в том числе во время реорганизации цепи.

Когда происходит реорганизация цепи, эта подписка генерирует событие, содержащее все новые заголовки для новой цепи. В частности, это означает, что вы можете увидеть несколько сгенерированных заголовков с одинаковой высотой, и когда это происходит, более поздний заголовок следует считать правильным после реорганизации.

Пример:

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

Генерирует журналы, которые являются частью недавно добавленных блоков и соответствуют указанным критериям фильтрации.

Когда происходит реорганизация цепи, журналы, которые являются частью блоков в старой цепи, будут сгенерированы снова со свойством `removed`, установленным в `true`. Кроме того, генерируются журналы, которые являются частью блоков в новой цепи, что означает, что в случае реорганизации можно увидеть журналы для одной и той же транзакции несколько раз.

Параметры

1. Объект со следующими полями:
   - `address` (необязательно): либо строка, представляющая адрес, либо массив таких строк.
     - Будут генерироваться только журналы, созданные с одного из этих адресов.
   - `topics`: массив спецификаторов тем.
     - Каждый спецификатор темы — это либо `null`, либо строка, представляющая тему, либо массив строк.
     - Каждая позиция в массиве, которая не равна `null`, ограничивает генерируемые журналы только теми, у которых есть одна из заданных тем в этой позиции.

Некоторые примеры спецификаций тем:

- `[]`: разрешены любые темы.
- `[A]`: A на первой позиции (и что угодно после).
- `[null, B]`: что угодно на первой позиции и B на второй позиции (и что угодно после).
- `[A, B]`: A на первой позиции и B на второй позиции (и что угодно после).
- `[[A, B], [A, B]]`: (A или B) на первой позиции и (A или B) на второй позиции (и что угодно после).

Пример:

В этом примере прослушиваются события `Deposit` из [контракта обернутого эфира (WETH)](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2) в основной сети Ethereum:

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

Генерирует хеш каждой транзакции, которая добавляется в состояние ожидания узла (его мемпул).

Пример:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}

< {"jsonrpc":"2.0","result":"0x1c2365b029179adf1e84b9e327315249","id":1}
< {"jsonrpc":"2.0","method":"eth_subscription","params":{"result":"0x4a62d0ad7c8868fbbfa10604e68638e637c6fc6f64fd1fb4ca042dcd0158c992","subscription":"0x1c2365b029179adf1e84b9e327315249"}}
```

Некоторые провайдеры также предлагают свои собственные типы подписок. Например, [`alchemy_pendingTransactions`](https://www.alchemy.com/docs/reference/alchemy-pendingtransactions) от Alchemy генерирует _полные объекты транзакций_ вместо просто хешей и принимает необязательные фильтры `fromAddress`, `toAddress` и `hashesOnly`. Они не являются частью стандартного программного интерфейса приложения (API) JSON-RPC, поэтому работают только с этим провайдером.

### `eth_unsubscribe` {#eth-unsubscribe}

Отменяет существующую подписку, чтобы больше не отправлялись события.

Параметры

1. ID подписки, ранее возвращенный вызовом `eth_subscribe`.

Возвращает

`true`, если подписка была успешно отменена, или `false`, если подписки с заданным ID не существовало.

Подписка существует только в том WebSocket-соединении, которое ее создало, поэтому `eth_unsubscribe` должен быть отправлен через то же самое соединение. Его нельзя отправить как отдельный HTTP-запрос. Закрытие соединения также отменяет все его подписки.

Пример:

```json
> {"jsonrpc": "2.0", "id": 2, "method": "eth_unsubscribe", "params": ["0xe0d4abf5caf333fbf94c5f02182e6469"]}

< {"jsonrpc":"2.0","result":true,"id":2}
```

---

[Зарегистрируйтесь в Alchemy](https://auth.alchemy.com) бесплатно, ознакомьтесь с [документацией Alchemy](https://www.alchemy.com/docs/) и следите за последними новостями Alchemy в [Твиттере](https://x.com/Alchemy).
