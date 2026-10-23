---
title: "Використання WebSockets"
description: "Посібник із використання WebSockets для виконання запитів JSON-RPC та підписки на події за допомогою будь-якого провайдера вузлів Етеріуму."
author: "Елан Гальперн"
lang: uk
tags: ["Alchemy", "websockets", "запити", "JavaScript"]
skill: beginner
breadcrumb: WebSockets
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

Це посібник початкового рівня з використання WebSockets для виконання запитів до блокчейну Етеріуму. У прикладах використовуються стандартні методи JSON-RPC, тому вони працюють з будь-яким вузлом або провайдером вузлів, який пропонує кінцеву точку WebSocket, включно з Alchemy.

## WebSockets проти HTTP {#websockets-vs-http}

На відміну від HTTP, з WebSockets вам не потрібно постійно робити запити, коли ви хочете отримати певну інформацію. WebSockets підтримують мережеве з'єднання для вас (якщо все зроблено правильно) і відстежують зміни.

Як і з будь-яким мережевим з'єднанням, не варто припускати, що WebSocket залишатиметься відкритим вічно без переривань, але правильна обробка розірваних з'єднань і повторне підключення вручну може бути складним завданням. Ще одним недоліком WebSockets є те, що ви не отримуєте коди стану HTTP у відповіді, а лише повідомлення про помилку.

Клієнтські бібліотеки можуть впоратися з цим за вас. Наприклад, [транспорт WebSocket у Viem](https://viem.sh/docs/clients/transports/websocket) за замовчуванням відновлює з'єднання у разі збою сокета та надсилає пінги для підтримки активності (keep-alive).

## Спробуйте {#try-it-out}

Вам потрібна URL-адреса WebSocket для вузла Етеріуму. Провайдери вузлів надають її під час створення ключа інтерфейсу прикладного програмування (API), зазвичай у форматі `wss://<provider-host>/<your-api-key>`. Наприклад, URL-адреса головної мережі Ethereum від Alchemy виглядає як `wss://eth-mainnet.g.alchemy.com/v2/<your-api-key>` ([зареєструйте безкоштовний акаунт Alchemy](https://auth.alchemy.com/signup)). Перегляньте [вузли як послугу](/developers/docs/nodes-and-clients/nodes-as-a-service/) для інших провайдерів або використовуйте кінцеву точку WebSocket [власного вузла](/developers/docs/nodes-and-clients/run-a-node/). Публічні кінцеві точки, такі як `wss://ethereum-rpc.publicnode.com`, також працюють для швидких експериментів, але вони мають обмеження швидкості та можуть не підтримувати всі типи підписок.

Найпростіший спосіб протестувати WebSockets — встановити інструмент командного рядка для виконання запитів WebSocket, наприклад [wscat](https://github.com/websockets/wscat). Використовуючи wscat, ви можете надсилати запити таким чином:

```sh
npx wscat -c wss://<provider-host>/<your-api-key>

> {"jsonrpc": "2.0", "id": 0, "method": "eth_gasPrice"}

< {"jsonrpc": "2.0", "result": "0x41f9de2", "id": 0}
```

Рядки, що починаються з `>`, — це те, що ви вводите, а рядки, що починаються з `<`, — це те, що вузол надсилає у відповідь.

## Як використовувати WebSockets {#how-to-use-websockets}

Для початку відкрийте WebSocket, використовуючи URL-адресу WebSocket вашого провайдера. В Alchemy ви можете знайти її, відкривши свій застосунок на [панелі керування](https://dashboard.alchemy.com/) та переглянувши його ключ інтерфейсу прикладного програмування (API). Зверніть увагу, що URL-адреса для WebSockets (`wss://`) відрізняється від URL-адреси для HTTP-запитів (`https://`), хоча більшість провайдерів використовують однаковий ключ API для обох.

![Де знайти URL-адресу WebSocket на панелі керування Alchemy](./use-websockets.mp4#602x280)

Будь-який із [методів JSON-RPC](/developers/docs/apis/json-rpc/), які підтримує ваш провайдер, можна використовувати через WebSocket. Для цього використовуйте те саме корисне навантаження, яке було б надіслано як тіло HTTP-запиту POST, але замість цього надішліть це корисне навантаження через WebSocket.

## З Web3 {#with-web3}

Перехід на WebSockets під час використання клієнтської бібліотеки, такої як [Viem](https://viem.sh/), є простим. Використовуйте транспорт `webSocket` з вашою URL-адресою WebSocket замість транспорту `http`. Наприклад, після `npm install viem` збережіть це як `index.mjs` і запустіть `node index.mjs`:

```js
import { createPublicClient, webSocket } from "viem"
import { mainnet } from "viem/chains"

const client = createPublicClient({
  chain: mainnet,
  transport: webSocket("wss://<provider-host>/<your-api-key>"),
})

console.log(await client.getBlockNumber()) // -> 26243602n

// Підписатися на нові блоки через той самий WebSocket
const unwatch = client.watchBlocks({
  onBlock: (block) => {
    console.log(block.number, block.hash)
    unwatch()
    process.exit(0)
  },
})
```

## API підписок {#subscription-api}

Під час підключення через WebSocket ви можете використовувати два додаткові методи: `eth_subscribe` та `eth_unsubscribe`. Ці методи дозволять вам прослуховувати певні події та негайно отримувати сповіщення.

### `eth_subscribe` {#eth-subscribe}

Створює нову підписку на вказані події. [Дізнайтеся більше про `eth_subscribe`](https://geth.ethereum.org/docs/interacting-with-geth/rpc/pubsub).

#### Параметри {#parameters}

1. Типи підписок
2. Необов'язкові параметри

Перший аргумент визначає тип події для прослуховування. Другий аргумент містить додаткові параметри, які залежать від першого аргументу. Різні типи підписок, їхні параметри та корисні навантаження подій описані нижче.

#### Повертає {#returns}

ID підписки: Цей ідентифікатор буде додано до будь-яких отриманих подій, і його також можна використовувати для скасування підписки за допомогою `eth_unsubscribe`.

#### Події підписки {#subscription-events}

Поки підписка активна, ви отримуватимете події, які є об'єктами з такими полями:

- `jsonrpc`: Завжди "2.0"
- `method`: Завжди "eth_subscription"
- `params`: Об'єкт із такими полями:
  - `subscription`: ID підписки, повернутий викликом `eth_subscribe`, який створив цю підписку.
  - `result`: Об'єкт, вміст якого змінюється залежно від типу підписки.

#### Типи підписок {#subscription-types}

1. `newHeads`

Генерує подію щоразу, коли до ланцюга додається новий заголовок, зокрема під час реорганізації ланцюга.

Коли відбувається реорганізація ланцюга, ця підписка згенерує подію, що містить усі нові заголовки для нового ланцюга. Зокрема, це означає, що ви можете побачити кілька згенерованих заголовків з однаковою висотою, і коли це трапляється, пізніший заголовок слід вважати правильним після реорганізації.

Приклад:

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

Генерує журнали, які є частиною щойно доданих блоків, що відповідають заданим критеріям фільтрації.

Коли відбувається реорганізація ланцюга, журнали, які є частиною блоків у старому ланцюзі, будуть згенеровані знову з властивістю `removed`, встановленою на `true`. Крім того, генеруються журнали, які є частиною блоків у новому ланцюзі, що означає, що у разі реорганізації можна побачити журнали для однієї й тієї ж транзакції кілька разів.

Параметри

1. Об'єкт із такими полями:
   - `address` (необов'язково): рядок, що представляє адресу, або масив таких рядків.
     - Будуть згенеровані лише журнали, створені з однієї з цих адрес.
   - `topics`: масив специфікаторів тем.
     - Кожен специфікатор теми — це або `null`, або рядок, що представляє тему, або масив рядків.
     - Кожна позиція в масиві, яка не є `null`, обмежує згенеровані журнали лише тими, які мають одну із заданих тем на цій позиції.

Деякі приклади специфікацій тем:

- `[]`: Дозволені будь-які теми.
- `[A]`: A на першій позиції (і будь-що після).
- `[null, B]`: Будь-що на першій позиції та B на другій позиції (і будь-що після).
- `[A, B]`: A на першій позиції та B на другій позиції (і будь-що після).
- `[[A, B], [A, B]]`: (A або B) на першій позиції та (A або B) на другій позиції (і будь-що після).

Приклад:

Цей приклад відстежує події `Deposit` з [контракту обгорнутого ефіру (WETH)](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2) у головній мережі Ethereum:

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

Генерує хеш кожної транзакції, яка додається до стану очікування вузла (його мемпулу).

Приклад:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}

< {"jsonrpc":"2.0","result":"0x1c2365b029179adf1e84b9e327315249","id":1}
< {"jsonrpc":"2.0","method":"eth_subscription","params":{"result":"0x4a62d0ad7c8868fbbfa10604e68638e637c6fc6f64fd1fb4ca042dcd0158c992","subscription":"0x1c2365b029179adf1e84b9e327315249"}}
```

Деякі провайдери також пропонують власні типи підписок. Наприклад, [`alchemy_pendingTransactions`](https://www.alchemy.com/docs/reference/alchemy-pendingtransactions) від Alchemy генерує _повні об'єкти транзакцій_ замість лише хешів і приймає необов'язкові фільтри `fromAddress`, `toAddress` та `hashesOnly`. Вони не є частиною стандартного інтерфейсу прикладного програмування (API) JSON-RPC, тому працюють лише з цим провайдером.

### `eth_unsubscribe` {#eth-unsubscribe}

Скасовує наявну підписку, щоб більше не надсилалися події.

Параметри

1. ID підписки, який раніше було повернуто з виклику `eth_subscribe`.

Повертає

`true`, якщо підписку було успішно скасовано, або `false`, якщо підписки із заданим ID не існувало.

Підписка існує лише в тому з'єднанні WebSocket, яке її створило, тому `eth_unsubscribe` має бути надіслано через те саме з'єднання. Його не можна надіслати як окремий HTTP-запит. Закриття з'єднання також скасовує всі його підписки.

Приклад:

```json
> {"jsonrpc": "2.0", "id": 2, "method": "eth_unsubscribe", "params": ["0xe0d4abf5caf333fbf94c5f02182e6469"]}

< {"jsonrpc":"2.0","result":true,"id":2}
```

---

[Зареєструйтеся в Alchemy](https://auth.alchemy.com) безкоштовно, перегляньте [документацію Alchemy](https://www.alchemy.com/docs/) та слідкуйте за останніми новинами Alchemy у [Twitter](https://x.com/Alchemy).
