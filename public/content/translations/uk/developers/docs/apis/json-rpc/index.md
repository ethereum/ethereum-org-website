---
title: JSON-RPC API
description: Легке та зрозуміле пояснення протоколу для користувачів Ethereum.
lang: uk
---

Щоб програмне забезпечення могло взаємодіяти з блокчейном Ethereum — зчитувати дані блокчейну або надсилати транзакції до мережі — воно повинно підключатися до вузла Ethereum.

Для цього кожен [клієнт Ethereum](/developers/docs/nodes-and-clients/#execution-clients) реалізує [специфікацію JSON-RPC](https://github.com/ethereum/execution-apis), тому існує єдиний набір методів, на які можуть покладатися застосунки, незалежно від конкретної реалізації вузла або клієнта.

[JSON-RPC](https://www.jsonrpc.org/specification) — це легковагий протокол віддаленого виклику процедур (RPC) без збереження стану. Він визначає декілька структур даних і правила їх обробки. Він є транспортно -агностичним, оскільки концепції можна використовувати в межах одного процесу, через сокети, по HTTP або у багатьох різних середовищах передачі повідомлень. Він використовує JSON (RFC 4627) як формат данних.

## Реалізації клієнтів {#client-implementations}

Користувачі Ethereum можуть користуватись різними мовами програмування при використанні JSON-RPC. Див. документацію окремих [клієнтів](/developers/docs/nodes-and-clients/#execution-clients) для отримання додаткової інформації щодо конкретних мов програмування. Ми рекомендуємо слідкувати за данними кожного користувача для підтримки API останньої версії.

## Допоміжні бібліотеки {#convenience-libraries}

Ви можете обрати взаємодію з клієнтами Ethereum на пряму, через JSON-RPC API, хоча для розрибників Dapp є легші варіанти. Існує багато бібліотек [JavaScript](/developers/docs/apis/javascript/#available-libraries) та [API для серверної частини](/developers/docs/apis/backend/#available-libraries), які надають оболонки для JSON-RPC API. З подібними бібліотеками, розробники можуть писати інтуїтивно, використовуючи однолінійний метод мови програмування, щоб розпізнати запити JSON-RPC, які взаємодіють з Ethereum.

## API консенсус-клієнтів {#consensus-clients}

На цій сторінці розглядається переважно JSON-RPC API, що використовується клієнтами-виконавцями Ethereum. Однак, консенсус-клієнти також мають RPC API, який дозволяє користувачам запитувати інформацію про вузол, запитувати блоки Beacon, стан Beacon та іншу інформацію, пов'язану з консенсусом, безпосередньо з вузла. Цей API задокументовано на [веб-сторінці Beacon API](https://ethereum.github.io/beacon-APIs/#/).

Внутрішній API також використовується для зв'язку між клієнтами в межах вузла, тобто він дає змогу консенсус-клієнту та клієнту-виконавцю обмінюватися даними. Він називається Engine API, а специфікації доступні на [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Специфікація клієнта-виконавця {#spec}

[Прочитайте повну специфікацію JSON-RPC API на GitHub](https://github.com/ethereum/execution-apis). Цей API задокументовано на [вебсторінці Execution API](https://ethereum.github.io/execution-apis/) і містить інспектор, щоб випробувати всі доступні методи.

## Умовності {#conventions}

### Кодування шістнадцяткових значень {#hex-encoding}

Через JSON передаються два ключові типи даних: неформатовані масиви байтів і кількісні значення. Обидва передаються в шістнадцятковому кодуванні, але з різними вимогами до форматування.

#### Кількісні значення {#quantities-encoding}

Під час кодування кількісних значень (цілих чисел, чисел): кодуйте як шістнадцяткове значення з префіксом «0x», у найкомпактнішому представленні (невеликий виняток: нуль слід представляти як «0x0»).

Ось кілька прикладів:

- 0x41 (65 у десятковій системі)
- 0x400 (1024 у десятковій системі)
- НЕПРАВИЛЬНО: 0x (завжди має бути принаймні одна цифра — нуль — це «0x0»)
- НЕПРАВИЛЬНО: 0x0400 (нулі на початку не допускаються)
- НЕПРАВИЛЬНО: ff (повинен мати префікс 0x)

### Неформатовані дані {#unformatted-data-encoding}

Під час кодування неформатованих даних (масивів байтів, адрес облікових записів, хешів, масивів байт-коду): кодуйте як шістнадцяткове значення, з префіксом «0x», дві шістнадцяткові цифри на байт.

Ось кілька прикладів:

- 0x41 (розмір 1, «A»)
- 0x004200 (розмір 3, «0B0»)
- 0x (розмір 0, «»)
- НЕПРАВИЛЬНО: 0xf0f0f (має бути парна кількість цифр)
- НЕПРАВИЛЬНО: 004200 (має бути префікс 0x)

### Параметр блоку {#block-parameter}

Наведені нижче методи мають параметр блоку:

- [eth_getBalance](#eth_getbalance)
- [eth_getCode](#eth_getcode)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_call](#eth_call)

Коли робляться запити, що опитують стан Ethereum, наданий параметр блоку визначає висоту блоку.

Для параметра блоку можливі наступні опції:

- `HEX String` — цілочисельний номер блоку
- `String "earliest"` — для найранішого/генезис-блоку
- `String "latest"` — для останнього запропонованого блоку
- `String "safe"` — для останнього безпечного головного блоку
- `String "finalized"` — для останнього фіналізованого блоку
- `String "pending"` — для стану/транзакцій, що очікують на розгляд

## Приклади

На цій сторінці ми наводимо приклади використання окремих кінцевих точок JSON-RPC API за допомогою інструменту командного рядка, [curl](https://curl.se). Ці приклади окремих кінцевих точок наведені нижче в розділі [Приклади Curl](#curl-examples). Далі на сторінці ми також наводимо [наскрізний приклад](#usage-example) компіляції та розгортання смарт-контракту за допомогою вузла Geth, JSON_RPC API та curl.

## Приклади Curl {#curl-examples}

Нижче наведено приклади використання JSON_RPC API шляхом виконання запитів [curl](https://curl.se) до вузла Ethereum. Кожен приклад
містить опис конкретної кінцевої точки, її параметрів, типу, що повертається, і робочий приклад її використання.

Запити curl можуть повертати повідомлення про помилку, пов'язане з типом вмісту. Це тому, що опція `--data` встановлює тип контенту на `application/x-www-form-urlencoded`. Якщо ваш вузол скаржиться на це, встановіть заголовок вручну, розмістивши `-H "Content-Type: application/json"` на початку виклику. Приклади також не містять комбінації URL-адреси/IP-адреси та порту, яка має бути останнім аргументом для curl (наприклад, `127.0.0.1:8545`). Повний запит curl, що включає ці додаткові дані, має такий вигляд:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## Передача даних, стан, історія {#gossip-state-history}

Декілька основних методів JSON-RPC вимагають даних з мережі Ethereum і чітко поділяються на три основні категорії: _передача даних, стан та історія_. Використовуйте посилання в цих розділах, щоб перейти до кожного методу, або скористайтеся змістом, щоб переглянути весь список методів.

### Методи передачі даних {#gossip-methods}

> Ці методи відстежують верхівку ланцюга. Саме так транзакції поширюються мережею, потрапляють у блоки, і так клієнти дізнаються про нові блоки.

- [eth_blockNumber](#eth_blocknumber)
- [eth_sendRawTransaction](#eth_sendrawtransaction)

### Методи стану {#state_methods}

> Методи, що повідомляють про поточний стан усіх збережених даних. «Стан» — це як один великий спільний фрагмент оперативної пам'яті, що містить баланси облікових записів, дані контрактів та оцінки газу.

- [eth_getBalance](#eth_getbalance)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getCode](#eth_getcode)
- [eth_call](#eth_call)
- [eth_estimateGas](#eth_estimategas)

### Методи історії {#history_methods}

> Отримує історичні записи кожного блоку аж до генезис-блоку. Це схоже на один великий файл, що допускає лише дозапис, і містить усі заголовки блоків, тіла блоків, блоки-дядьки та квитанції про транзакції.

- [eth_getBlockTransactionCountByHash](#eth_getblocktransactioncountbyhash)
- [eth_getBlockTransactionCountByNumber](#eth_getblocktransactioncountbynumber)
- [eth_getUncleCountByBlockHash](#eth_getunclecountbyblockhash)
- [eth_getUncleCountByBlockNumber](#eth_getunclecountbyblocknumber)
- [eth_getBlockByHash](#eth_getblockbyhash)
- [eth_getBlockByNumber](#eth_getblockbynumber)
- [eth_getTransactionByHash](#eth_gettransactionbyhash)
- [eth_getTransactionByBlockHashAndIndex](#eth_gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](#eth_gettransactionbyblocknumberandindex)
- [eth_getTransactionReceipt](#eth_gettransactionreceipt)
- [eth_getUncleByBlockHashAndIndex](#eth_getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](#eth_getunclebyblocknumberandindex)

## Ігровий майданчик JSON-RPC API

Ви можете використовувати [інструмент ігрового майданчика](https://ethereum-json-rpc.com), щоб знайти та випробувати методи API. Він також показує, які методи та мережі підтримуються різними постачальниками вузлів.

## Методи JSON-RPC API {#json-rpc-methods}

### web3_clientVersion {#web3_clientversion}

Повертає поточну версію клієнта.

**Параметри**

Немає

**Повертає**

`String` - поточна версія клієнта

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3_sha3}

Повертає Keccak-256 (а _не_ стандартизований SHA3-256) для наданих даних.

**Параметри**

1. `DATA` — дані для перетворення в хеш SHA3

```js
params: ["0x68656c6c6f20776f726c64"]
```

**Повертає**

`DATA` — результат SHA3 для наданого рядка.

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net_version}

Повертає ідентифікатор поточної мережі.

**Параметри**

Немає

**Повертає**

`String` — ідентифікатор поточної мережі.

Повний список поточних ідентифікаторів мереж доступний на [chainlist.org](https://chainlist.org). Деякі з найпоширеніших:

- `1`: основна мережа Ethereum
- `11155111`: тестова мережа Sepolia
- `560048`: тестова мережа Hoodi

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net_listening}

Повертає `true`, якщо клієнт активно слухає мережеві підключення.

**Параметри**

Немає

**Повертає**

`Boolean` — `true`, коли слухає, інакше — `false`.

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net_peercount}

Повертає кількість пірів, підключених до клієнта.

**Параметри**

Немає

**Повертає**

`QUANTITY` — ціле число, що позначає кількість підключених пірів.

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// Result
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth_protocolversion}

Повертає поточну версію протоколу Ethereum. Зверніть увагу, що цей метод [недоступний у Geth](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924).

**Параметри**

Немає

**Повертає**

`String` — поточна версія протоколу Ethereum

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth_syncing}

Повертає об'єкт з даними про стан синхронізації або `false`.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  Спробувати кінцеву точку на ігровому майданчику
</ButtonLink>

**Параметри**

Немає

**Повертає**

Точні дані, що повертаються, відрізняються залежно від реалізації клієнта. Усі клієнти повертають `False`, коли вузол не синхронізується, і всі клієнти повертають такі поля.

`Object|Boolean`, об’єкт із даними стану синхронізації або `FALSE`, якщо не синхронізується:

- `startingBlock`: `QUANTITY` — блок, з якого почався імпорт (буде скинуто лише після того, як синхронізація досягне своєї верхівки)
- `currentBlock`: `QUANTITY` — поточний блок, такий же, як eth_blockNumber
- `highestBlock`: `QUANTITY` — приблизний найвищий блок

Однак окремі клієнти можуть також надавати додаткові дані. Наприклад, Geth повертає наступне:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "currentBlock": "0x3cf522",
    "healedBytecodeBytes": "0x0",
    "healedBytecodes": "0x0",
    "healedTrienodes": "0x0",
    "healingBytecode": "0x0",
    "healingTrienodes": "0x0",
    "highestBlock": "0x3e0e41",
    "startingBlock": "0x3cbed5",
    "syncedAccountBytes": "0x0",
    "syncedAccounts": "0x0",
    "syncedBytecodeBytes": "0x0",
    "syncedBytecodes": "0x0",
    "syncedStorage": "0x0",
    "syncedStorageBytes": "0x0"
  }
}
```

Тоді як Besu повертає:

```json
{
  "jsonrpc": "2.0",
  "id": 51,
  "result": {
    "startingBlock": "0x0",
    "currentBlock": "0x1518",
    "highestBlock": "0x9567a3",
    "pulledStates": "0x203ca",
    "knownStates": "0x200636"
  }
}
```

Для отримання детальнішої інформації зверніться до документації вашого клієнта.

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// Or when not syncing
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth_coinbase}

Повертає адресу coinbase клієнта.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  Спробувати кінцеву точку на ігровому майданчику
</ButtonLink>

> **Примітка:** цей метод було визнано застарілим у версії **v1.14.0** і більше не підтримується. Спроба використати цей метод призведе до помилки «Метод не підтримується».

**Параметри**

Немає

**Повертає**

`DATA`, 20 байтів — поточна адреса coinbase.

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth_chainId}

Повертає ідентифікатор ланцюга, який використовується для підпису транзакцій, захищених від повторного відтворення.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  Спробувати кінцеву точку на ігровому майданчику
</ButtonLink>

**Параметри**

Немає

**Повертає**

`chainId`, шістнадцяткове значення у вигляді рядка, що представляє ціле число поточного ідентифікатора ланцюга.

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth_mining}

Повертає `true`, якщо клієнт активно майнить нові блоки. Це може повертати `true` лише для мереж із доказом виконання роботи, і може бути недоступним для деяких клієнтів після [The Merge](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  Спробувати кінцеву точку на ігровому майданчику
</ButtonLink>

**Параметри**

Немає

**Повертає**

`Boolean` - повертає `true`, якщо клієнт майнить, інакше `false`.

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth_hashrate}

Повертає кількість хешів за секунду, з якою вузол здійснює майнінг. Це може повертати `true` лише для мереж із доказом виконання роботи, і може бути недоступним для деяких клієнтів після [The Merge](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  Спробувати кінцеву точку на ігровому майданчику
</ButtonLink>

**Параметри**

Немає

**Повертає**

`QUANTITY` — кількість хешів за секунду.

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// Result
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth_gasprice}

Повертає оцінку поточної ціни за газ у wei. Наприклад, клієнт Besu перевіряє останні 100 блоків і за замовчуванням повертає медіанну ціну одиниці газу.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  Спробувати кінцеву точку на ігровому майданчику
</ButtonLink>

**Параметри**

Немає

**Повертає**

`QUANTITY` — ціле число поточної ціни газу у wei.

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// Result
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth_accounts}

Повертає список адрес, що належать клієнту.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  Спробувати кінцеву точку на ігровому майданчику
</ButtonLink>

**Параметри**

Немає

**Повертає**

`Array of DATA`, 20 байтів — адреси, що належать клієнту.

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth_blocknumber}

Повертає номер останнього блоку.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  Спробувати кінцеву точку на ігровому майданчику
</ButtonLink>

**Параметри**

Немає

**Повертає**

`QUANTITY` — ціле число, що позначає номер поточного блоку, на якому знаходиться клієнт.

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// Result
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth_getbalance}

Повертає баланс облікового запису за вказаною адресою.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  Спробувати кінцеву точку на ігровому майданчику
</ButtonLink>

**Параметри**

1. `DATA`, 20 байтів — адреса для перевірки балансу.
2. `QUANTITY|TAG` — цілочисельний номер блоку або рядок `"latest"`, `"earliest"`, `"pending"`, `"safe"` чи `"finalized"`, див. [параметр блоку](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**Повертає**

`QUANTITY` — ціле число поточного балансу у wei.

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth_getstorageat}

Повертає значення з позиції сховища за вказаною адресою.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  Спробувати кінцеву точку на ігровому майданчику
</ButtonLink>

**Параметри**

1. `DATA`, 20 байтів — адреса сховища.
2. `QUANTITY` — ціле число, що позначає позицію в сховищі.
3. `QUANTITY|TAG` — цілочисельний номер блоку або рядок `"latest"`, `"earliest"`, `"pending"`, `"safe"` чи `"finalized"`, див. [параметр блоку](/developers/docs/apis/json-rpc/#block-parameter)

**Повертає**

`DATA` — значення в цій позиції сховища.

**Приклад**
Обчислення правильної позиції залежить від сховища, яке потрібно отримати. Розглянемо наступний контракт, розгорнутий за адресою `0x295a70b2de5e3953354a6a8344e616ed314d7251` з адреси `0x391694e7e0b0cce554cb130d723a9d27458f9298`.

```
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;
    constructor() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

Отримати значення pos0 просто:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

Отримати елемент зіставлення складніше. Позиція елемента в зіставленні обчислюється за допомогою:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

Це означає, що для отримання сховища на pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] нам потрібно обчислити позицію за допомогою:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

Консоль geth, що постачається з бібліотекою web3, може бути використана для обчислення:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Тепер, щоб отримати сховище:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth_gettransactioncount}

Повертає кількість транзакцій, _надісланих_ з адреси.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  Спробувати кінцеву точку на ігровому майданчику
</ButtonLink>

**Параметри**

1. `DATA`, 20 байтів — адреса.
2. `QUANTITY|TAG` — цілочисельний номер блоку або рядок `"latest"`, `"earliest"`, `"pending"`, `"safe"` чи `"finalized"`, див. [параметр блоку](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // стан останнього блоку
]
```

**Повертає**

`QUANTITY` — ціле число, що позначає кількість транзакцій, надісланих із цієї адреси.

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth_getblocktransactioncountbyhash}

Повертає кількість транзакцій у блоці за заданим хешем блоку.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  Спробувати кінцеву точку на ігровому майданчику
</ButtonLink>

**Параметри**

1. `DATA`, 32 байти — хеш блоку

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**Повертає**

`QUANTITY` — ціле число, що позначає кількість транзакцій у цьому блоці.

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth_getblocktransactioncountbynumber}

Повертає кількість транзакцій у блоці за заданим номером блоку.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  Спробувати кінцеву точку на ігровому майданчику
</ButtonLink>

**Параметри**

1. `QUANTITY|TAG` — ціле число, що позначає номер блоку, або рядок `"earliest"`, `"latest"`, `"pending"`, `"safe"` чи `"finalized"`, як у [параметрі блоку](/developers/docs/apis/json-rpc/#block-parameter).

```js
params: [
  "0x13738ca", // 20396234
]
```

**Повертає**

`QUANTITY` — ціле число, що позначає кількість транзакцій у цьому блоці.

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth_getunclecountbyblockhash}

Повертає кількість блоків-дядьків у блоці за заданим хешем блоку.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  Спробувати кінцеву точку на ігровому майданчику
</ButtonLink>

**Параметри**

1. `DATA`, 32 байти — хеш блоку

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**Повертає**

`QUANTITY` — ціле число, що позначає кількість блоків-дядьків у цьому блоці.

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth_getunclecountbyblocknumber}

Повертає кількість блоків-дядьків у блоці за заданим номером блоку.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  Спробувати кінцеву точку на ігровому майданчику
</ButtonLink>

**Параметри**

1. `QUANTITY|TAG` — цілочисельний номер блоку або рядок `"latest"`, `"earliest"`, `"pending"`, `"safe"` чи `"finalized"`, див. [параметр блоку](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xe8", // 232
]
```

**Повертає**

`QUANTITY` — ціле число, що позначає кількість блоків-дядьків у цьому блоці.

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth_getcode}

Повертає код за вказаною адресою.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  Спробувати кінцеву точку на ігровому майданчику
</ButtonLink>

**Параметри**

1. `DATA`, 20 байтів — адреса
2. `QUANTITY|TAG` — цілочисельний номер блоку або рядок `"latest"`, `"earliest"`, `"pending"`, `"safe"` чи `"finalized"`, див. [параметр блоку](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**Повертає**

`DATA` — код із вказаної адреси.

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth_sign}

Метод sign обчислює специфічний для Ethereum підпис за допомогою: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

Додавання префікса до повідомлення робить обчислений підпис розпізнаваним як специфічний підпис Ethereum. Це запобігає зловживанню, коли зловмисний dapp може підписувати довільні дані (наприклад, транзакцію) і використовувати підпис, щоб видати себе за жертву.

Примітка: адреса для підпису має бути розблокована.

**Параметри**

1. `DATA`, 20 байтів — адреса
2. `DATA`, N байтів - повідомлення для підпису

**Повертає**

`DATA`: підпис

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth_signtransaction}

Підписує транзакцію, яку можна буде пізніше надіслати в мережу за допомогою [eth_sendRawTransaction](#eth_sendrawtransaction).

**Параметри**

1. `Object` — об'єкт транзакції

- `type`:
- `from`: `DATA`, 20 байтів — адреса, з якої надсилається транзакція.
- `to`: `DATA`, 20 байтів — (необов'язково при створенні нового контракту) адреса, на яку спрямована транзакція.
- `gas`: `QUANTITY` — (необов'язково, за замовчуванням: 90000) ціле число газу, наданого для виконання транзакції. Він поверне невикористаний газ.
- `gasPrice`: `QUANTITY` — (необов'язково, за замовчуванням: буде визначено) ціле число gasPrice, що використовується для кожного оплаченого газу, у Wei.
- `value`: `QUANTITY` — (необов'язково) ціле число значення, надісланого з цією транзакцією, у Wei.
- `data`: `DATA` — скомпільований код контракту АБО хеш підпису викликаного методу та закодованих параметрів.
- `nonce`: `QUANTITY` — (необов'язково) ціле число nonce. Це дає змогу перезаписувати власні транзакції, що очікують на розгляд, які використовують той самий nonce.

**Повертає**

`DATA`, об'єкт транзакції, закодований за RLP, підписаний зазначеним обліковим записом.

**Приклад**

```js
// Request
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// Result
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth_sendtransaction}

Створює нову транзакцію виклику повідомлення або створення контракту, якщо поле даних містить код, і підписує її за допомогою облікового запису, зазначеного у `from`.

**Параметри**

1. `Object` — об'єкт транзакції

- `from`: `DATA`, 20 байтів — адреса, з якої надсилається транзакція.
- `to`: `DATA`, 20 байтів — (необов'язково при створенні нового контракту) адреса, на яку спрямована транзакція.
- `gas`: `QUANTITY` — (необов'язково, за замовчуванням: 90000) ціле число газу, наданого для виконання транзакції. Він поверне невикористаний газ.
- `gasPrice`: `QUANTITY` - (необов'язково, за замовчуванням: буде визначено) Ціле число gasPrice, що використовується для кожного оплаченого газу.
- `value`: `QUANTITY` — (необов'язково) ціле число значення, надісланого з цією транзакцією.
- `input`: `DATA` — скомпільований код контракту АБО хеш підпису викликаного методу та закодованих параметрів.
- `nonce`: `QUANTITY` — (необов'язково) ціле число nonce. Це дає змогу перезаписувати власні транзакції, що очікують на розгляд, які використовують той самий nonce.

```js
params: [
  {
    from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
    to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
    gas: "0x76c0", // 30400
    gasPrice: "0x9184e72a000", // 10000000000000
    value: "0x9184e72a", // 2441406250
    input:
      "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  },
]
```

**Повертає**

`DATA`, 32 байти - хеш транзакції або нульовий хеш, якщо транзакція ще недоступна.

Використовуйте [eth_getTransactionReceipt](#eth_gettransactionreceipt), щоб отримати адресу контракту після того, як транзакція була запропонована в блоці, коли ви створили контракт.

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth_sendrawtransaction}

Створює нову транзакцію виклику повідомлення або створення контракту для підписаних транзакцій.

**Параметри**

1. `DATA`, дані підписаної транзакції.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**Повертає**

`DATA`, 32 байти - хеш транзакції або нульовий хеш, якщо транзакція ще недоступна.

Використовуйте [eth_getTransactionReceipt](#eth_gettransactionreceipt), щоб отримати адресу контракту після того, як транзакція була запропонована в блоці, коли ви створили контракт.

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth_call}

Виконує новий виклик повідомлення негайно, не створюючи транзакцію на блокчейні. Часто використовується для виконання функцій смарт-контрактів, доступних лише для читання, наприклад `balanceOf` для контракту ERC-20.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  Спробувати кінцеву точку на ігровому майданчику
</ButtonLink>

**Параметри**

1. `Object` — об'єкт виклику транзакції

- `from`: `DATA`, 20 байтів - (необов'язково) Адреса, з якої надсилається транзакція.
- `to`: `DATA`, 20 байтів — адреса, на яку спрямована транзакція.
- `gas`: `QUANTITY` — (необов'язково) ціле число газу, наданого для виконання транзакції. eth_call споживає нуль газу, але цей параметр може знадобитися для деяких виконань.
- `gasPrice`: `QUANTITY` - (необов'язково) Ціле число gasPrice, що використовується для кожного оплаченого газу
- `value`: `QUANTITY` — (необов'язково) ціле число значення, надісланого з цією транзакцією
- `input`: `DATA` - (необов'язково) Хеш підпису методу та закодованих параметрів. Для отримання докладної інформації див. [Ethereum Contract ABI в документації Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html).

2. `QUANTITY|TAG` — цілочисельний номер блоку або рядок `"latest"`, `"earliest"`, `"pending"`, `"safe"` чи `"finalized"`, див. [параметр блоку](/developers/docs/apis/json-rpc/#block-parameter)

**Повертає**

`DATA` — значення, що повертається виконаним контрактом.

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth_estimategas}

Генерує та повертає оцінку того, скільки газу необхідно для завершення транзакції. Транзакція не буде додана до блокчейну. Зверніть увагу, що оцінка може бути значно більшою, ніж кількість газу, фактично використаного транзакцією, з різних причин, включаючи механіку EVM та продуктивність вузла.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  Спробувати кінцеву точку на ігровому майданчику
</ButtonLink>

**Параметри**

Див. параметри [eth_call](#eth_call), за винятком того, що всі властивості є необов'язковими. Якщо ліміт газу не вказано, geth використовує ліміт газу блоку з блоку, що очікує на розгляд, як верхню межу. У результаті повернутої оцінки може бути недостатньо для виконання виклику/транзакції, коли кількість газу перевищує ліміт газу для блоку, що очікує на підтвердження.

**Повертає**

`QUANTITY` — кількість використаного газу.

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth_getblockbyhash}

Повертає інформацію про блок за хешем.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  Спробувати кінцеву точку на ігровому майданчику
</ButtonLink>

**Параметри**

1. `DATA`, 32 байти - Хеш блоку.
2. `Boolean` — якщо `true`, повертає повні об’єкти транзакцій, якщо `false` — лише хеші транзакцій.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**Повертає**

`Object` — об'єкт блоку або `null`, якщо блок не знайдено:

- `number`: `QUANTITY` — номер блоку. `null`, якщо це блок, що очікує на розгляд.
- `hash`: `DATA`, 32 байти — хеш блоку. `null`, якщо це блок, що очікує на розгляд.
- `parentHash`: `DATA`, 32 байти — хеш батьківського блоку.
- `nonce`: `DATA`, 8 байтів — хеш згенерованого доказу виконання роботи. `null`, коли це блок, що очікує на розгляд, `0x0` для блоків із доказом частки (після The Merge)
- `sha3Uncles`: `DATA`, 32 байти — SHA3 даних блоків-дядьків у блоці.
- `logsBloom`: `DATA`, 256 байтів — фільтр Блума для журналів блоку. `null`, якщо це блок, що очікує на розгляд.
- `transactionsRoot`: `DATA`, 32 байти — корінь дерева транзакцій блоку.
- `stateRoot`: `DATA`, 32 байти — корінь дерева кінцевого стану блоку.
- `receiptsRoot`: `DATA`, 32 байти — корінь дерева квитанцій блоку.
- `miner`: `DATA`, 20 байтів — адреса бенефіціара, якому були надані винагороди за блок.
- `difficulty`: `QUANTITY` — ціле число складності для цього блоку.
- `totalDifficulty`: `QUANTITY` — ціле число загальної складності ланцюга до цього блоку.
- `extraData`: `DATA` — поле «додаткові дані» цього блоку.
- `size`: `QUANTITY` — ціле число, розмір цього блоку в байтах.
- `gasLimit`: `QUANTITY` — максимальний обсяг газу, дозволений у цьому блоці.
- `gasUsed`: `QUANTITY` — загальний обсяг газу, використаний усіма транзакціями в цьому блоці.
- `timestamp`: `QUANTITY` — мітка часу Unix, коли блок був зібраний.
- `transactions`: `Array` — масив об'єктів транзакцій або 32-байтові хеші транзакцій залежно від останнього наданого параметра.
- `uncles`: `Array` — масив хешів блоків-дядьків.

**Приклад**

```js
// Запит
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}'
// Результат
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "difficulty": "0x4ea3f27bc",
    "extraData": "0x476574682f4c5649562f76312e302e302f6c696e75782f676f312e342e32",
    "gasLimit": "0x1388",
    "gasUsed": "0x0",
    "hash": "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "miner": "0xbb7b8287f3f0a933474a79eae42cbca977791171",
    "mixHash": "0x4fffe9ae21f1c9e15207b1f472d5bbdd68c9595d461666602f2be20daf5e7843",
    "nonce": "0x689056015818adbe",
    "number": "0x1b4",
    "parentHash": "0xe99e022112df268087ea7eafaf4790497fd21dbeeb6bd7a1721df161a6657a54",
    "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": "0x220",
    "stateRoot": "0xddc8b0234c2e0cad087c8b389aa7ef01f7d79b2570bccb77ce48648aa61c904d",
    "timestamp": "0x55ba467c",
    "totalDifficulty": "0x78ed983323d",
    "transactions": [
    ],
    "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "uncles": [
    ]
  }
}
```

### eth_getBlockByNumber {#eth_getblockbynumber}

Повертає інформацію про блок за номером блоку.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  Спробувати кінцеву точку на ігровому майданчику
</ButtonLink>

**Параметри**

1. `QUANTITY|TAG` — ціле число, що позначає номер блоку, або рядок `"earliest"`, `"latest"`, `"pending"`, `"safe"` чи `"finalized"`, як у [параметрі блоку](/developers/docs/apis/json-rpc/#block-parameter).
2. `Boolean` — якщо `true`, повертає повні об’єкти транзакцій, якщо `false` — лише хеші транзакцій.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**Повертає**
Див. [eth_getBlockByHash](#eth_getblockbyhash)

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

Результат див. у [eth_getBlockByHash](#eth_getblockbyhash)

### eth_getTransactionByHash {#eth_gettransactionbyhash}

Повертає інформацію про транзакцію за хешем транзакції.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  Спробувати кінцеву точку на ігровому майданчику
</ButtonLink>

**Параметри**

1. `DATA`, 32 байти - хеш транзакції

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**Повертає**

`Object` — об’єкт транзакції або `null`, якщо транзакція не знайдена:

- `blockHash`: `DATA`, 32 байти — хеш блоку, у якому була ця транзакція. `null`, якщо вона очікує на розгляд.
- `blockNumber`: `QUANTITY` — номер блоку, у якому була ця транзакція. `null`, якщо вона очікує на розгляд.
- `from`: `DATA`, 20 байтів — адреса відправника.
- `gas`: `QUANTITY` — газ, наданий відправником.
- `gasPrice`: `QUANTITY` — ціна газу, надана відправником, у Wei.
- `hash`: `DATA`, 32 байти — хеш транзакції.
- `input`: `DATA` — дані, надіслані разом із транзакцією.
- `nonce`: `QUANTITY` — кількість транзакцій, здійснених відправником до цієї.
- `to`: `DATA`, 20 байтів — адреса одержувача. `null`, якщо це транзакція створення контракту.
- `transactionIndex`: `QUANTITY` — ціле число, що позначає позицію індексу транзакцій у блоці. `null`, якщо вона очікує на розгляд.
- `value`: `QUANTITY` — передане значення у Wei.
- `v`: `QUANTITY` — ідентифікатор відновлення ECDSA
- `r`: `QUANTITY` — підпис ECDSA r
- `s`: `QUANTITY` — підпис ECDSA s

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
    "blockNumber":"0x5daf3b", // 6139707
    "from":"0xa7d9ddbe1f17865597fbd27ec712455208b6b76d",
    "gas":"0xc350", // 50000
    "gasPrice":"0x4a817c800", // 20000000000
    "hash":"0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b",
    "input":"0x68656c6c6f21",
    "nonce":"0x15", // 21
    "to":"0xf02c1c8e6114b1dbe8937a39260b5b0a374432bb",
    "transactionIndex":"0x41", // 65
    "value":"0xf3dbb76162000", // 4290000000000000
    "v":"0x25", // 37
    "r":"0x1b5e176d927f8e9ab405058b2d2457392da3e20f328b16ddabcebc33eaac5fea",
    "s":"0x4ba69724e8f69de52f0125ad8b3c5c2cef33019bac3249e2c0a2192766d1721c"
  }
}
```

### eth_getTransactionByBlockHashAndIndex {#eth_gettransactionbyblockhashandindex}

Повертає інформацію про транзакцію за хешем блоку та позицією індексу транзакції.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  Спробувати кінцеву точку на ігровому майданчику
</ButtonLink>

**Параметри**

1. `DATA`, 32 байти - хеш блоку.
2. `QUANTITY` — ціле число, що позначає позицію індексу транзакції.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Повертає**
Див. [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Результат див. у [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth_gettransactionbyblocknumberandindex}

Повертає інформацію про транзакцію за номером блоку та позицією індексу транзакції.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  Спробувати кінцеву точку на ігровому майданчику
</ButtonLink>

**Параметри**

1. `QUANTITY|TAG` — номер блоку або рядок `"earliest"`, `"latest"`, `"pending"`, `"safe"` чи `"finalized"`, як у [параметрі блоку](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` — позиція індексу транзакції.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**Повертає**
Див. [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

Результат див. у [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionReceipt {#eth_gettransactionreceipt}

Повертає квитанцію про транзакцію за хешем транзакції.

**Примітка** Квитанція недоступна для транзакцій, що очікують на розгляд.

**Параметри**

1. `DATA`, 32 байти - хеш транзакції

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**Повертає**
`Object` — об'єкт квитанції про транзакцію або `null`, якщо квитанцію не знайдено:

- `transactionHash `: `DATA`, 32 байти — хеш транзакції.
- `transactionIndex`: `QUANTITY` — ціле число, що позначає позицію індексу транзакцій у блоці.
- `blockHash`: `DATA`, 32 байти — хеш блоку, у якому була ця транзакція.
- `blockNumber`: `QUANTITY` — номер блоку, у якому була ця транзакція.
- `from`: `DATA`, 20 байтів — адреса відправника.
- `to`: `DATA`, 20 байтів — адреса одержувача. null, якщо це транзакція створення контракту.
- `cumulativeGasUsed` : `QUANTITY ` - загальна кількість газу, використана під час виконання цієї транзакції в блоці.
- `effectiveGasPrice`: `QUANTITY` — сума базової комісії та чайових, сплачених за одиницю газу.
- `gasUsed `: `QUANTITY ` - кількість газу, використана лише цією конкретною транзакцією.
- `contractAddress `: `DATA`, 20 байтів — створена адреса контракту, якщо транзакція була створенням контракту, інакше — `null`.
- `logs`: `Array` — масив об'єктів журналу, згенерованих цією транзакцією.
- `logsBloom`: `DATA`, 256 байтів — фільтр Блума для легких клієнтів, що дає змогу швидко отримувати пов'язані журнали.
- `type`: `QUANTITY` — ціле число, що позначає тип транзакції, `0x0` для застарілих транзакцій, `0x1` для типів списку доступу, `0x2` для динамічних комісій.

Він також повертає _одне з_:

- `root` : `DATA` 32 байти кореня стану після транзакції (до оновлення Byzantium)
- `status`: `QUANTITY` або `1` (успіх), або `0` (невдача)

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // рядок адреси, якщо він був створений
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // журнали, повернуті getFilterLogs тощо.
    }],
    "logsBloom": "0x00...0", // 256-байтовий фільтр Блума
    "status": "0x1",
    "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "transactionHash":
      "0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5",
    "transactionIndex": "0x66",
    "type": "0x2"
  }
}
```

### eth_getUncleByBlockHashAndIndex {#eth_getunclebyblockhashandindex}

Повертає інформацію про анкл-блок за хешем і позицією індексу анкл-блоку.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  Спробувати кінцеву точку на ігровому майданчику
</ButtonLink>

**Параметри**

1. `DATA`, 32 байти — хеш блоку.
2. `QUANTITY` — позиція індексу блоку-дядька.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Повертає**
Див. [eth_getBlockByHash](#eth_getblockbyhash)

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Результат див. у [eth_getBlockByHash](#eth_getblockbyhash)

**Примітка**: Блок-дядько не містить окремих транзакцій.

### eth_getUncleByBlockNumberAndIndex {#eth_getunclebyblocknumberandindex}

Повертає інформацію про анкл-блок за номером і позицією індексу анкл-блоку.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  Спробувати кінцеву точку на ігровому майданчику
</ButtonLink>

**Параметри**

1. `QUANTITY|TAG` — номер блоку або рядок `"earliest"`, `"latest"`, `"pending"`, `"safe"` чи `"finalized"`, як у [параметрі блоку](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` — позиція індексу блоку-дядька.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**Повертає**
Див. [eth_getBlockByHash](#eth_getblockbyhash)

**Примітка**: Блок-дядько не містить окремих транзакцій.

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

Результат див. у [eth_getBlockByHash](#eth_getblockbyhash)

### eth_newFilter {#eth_newfilter}

Створює об’єкт фільтра на основі параметрів фільтра для сповіщення про зміну стану (журналів).
Щоб перевірити, чи змінився стан, викличте [eth_getFilterChanges](#eth_getfilterchanges).

**Примітка щодо вказування фільтрів тем:**
Теми залежать від порядку. Транзакція з журналом з темами [A, B] буде відповідати наступним фільтрам тем:

- `[]` "будь-що"
- `[A]` "A на першій позиції (і будь-що після)"
- `[null, B]` "будь-що на першій позиції ТА B на другій позиції (і будь-що після)"
- `[A, B]` "A на першій позиції ТА B на другій позиції (і будь-що після)"
- `[[A, B], [A, B]]` "(A АБО B) на першій позиції ТА (A АБО B) на другій позиції (і будь-що після)"
- **Параметри**

1. `Object` — параметри фільтра:

- `fromBlock`: `QUANTITY|TAG` — (необов'язково, за замовчуванням: `"latest"`) цілочисельний номер блоку, або `"latest"` для останнього запропонованого блоку, `"safe"` для останнього безпечного блоку, `"finalized"` для останнього фіналізованого блоку, або `"pending"`, `"earliest"` для транзакцій, які ще не в блоці.
- `toBlock`: `QUANTITY|TAG` — (необов'язково, за замовчуванням: `"latest"`) цілочисельний номер блоку, або `"latest"` для останнього запропонованого блоку, `"safe"` для останнього безпечного блоку, `"finalized"` для останнього фіналізованого блоку, або `"pending"`, `"earliest"` для транзакцій, які ще не в блоці.
- `address`: `DATA|Array`, 20 байтів — (необов’язково) адреса контракту або список адрес, з яких мають походити журнали.
- `topics`: `Array of DATA`, - (необов'язково) масив 32-байтових `DATA` тем. Теми залежать від порядку. Кожна тема також може бути масивом DATA з опціями «або».

```js
params: [
  {
    fromBlock: "0x1",
    toBlock: "0x2",
    address: "0x8888f1f195afa192cfee860698584c030f4c9db1",
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
      null,
      [
        "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
        "0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc",
      ],
    ],
  },
]
```

**Повертає**
`QUANTITY` — ідентифікатор фільтра.

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth_newblockfilter}

Створює фільтр у вузлі, щоб сповіщати про надходження нового блоку.
Щоб перевірити, чи змінився стан, викличте [eth_getFilterChanges](#eth_getfilterchanges).

**Параметри**
Немає

**Повертає**
`QUANTITY` — ідентифікатор фільтра.

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth_newpendingtransactionfilter}

Створює фільтр у вузлі, щоб сповіщати про надходження нових транзакцій, що очікують на розгляд.
Щоб перевірити, чи змінився стан, викличте [eth_getFilterChanges](#eth_getfilterchanges).

**Параметри**
Немає

**Повертає**
`QUANTITY` — ідентифікатор фільтра.

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth_uninstallfilter}

Видаляє фільтр із вказаним ідентифікатором. Слід завжди викликати, коли спостереження більше не потрібне.
Крім того, час очікування фільтрів спливає, якщо їх не запитують за допомогою [eth_getFilterChanges](#eth_getfilterchanges) протягом певного періоду.

**Параметри**

1. `QUANTITY` — ідентифікатор фільтра.

```js
params: [
  "0xb", // 11
]
```

**Повертає**
`Boolean` — `true`, якщо фільтр успішно видалено, інакше `false`.

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth_getfilterchanges}

Метод опитування для фільтра, який повертає масив журналів, що з'явилися з моменту останнього опитування.

**Параметри**

1. `QUANTITY` — ідентифікатор фільтра.

```js
params: [
  "0x16", // 22
]
```

**Повертає**
`Array` — масив об'єктів журналу або порожній масив, якщо з моменту останнього опитування нічого не змінилося.

- Для фільтрів, створених за допомогою `eth_newBlockFilter`, повертаються хеші блоків (`DATA`, 32 байти), наприклад, `["0x3454645634534..."]`.

- Для фільтрів, створених за допомогою `eth_newPendingTransactionFilter`, повертаються хеші транзакцій (`DATA`, 32 байти), наприклад `["0x6345343454645..."]`.

- Для фільтрів, створених за допомогою `eth_newFilter`, журнали є об'єктами з такими параметрами:
  - `removed`: `TAG` — `true`, якщо журнал було видалено через реорганізацію ланцюга. `false`, якщо це дійсний журнал.
  - `logIndex`: `QUANTITY` — ціле число, що позначає позицію індексу журналу в блоці. `null`, якщо це журнал, що очікує на розгляд.
  - `transactionIndex`: `QUANTITY` — ціле число, що позначає позицію індексу транзакцій, з якого було створено журнал. `null`, якщо це журнал, що очікує на розгляд.
  - `transactionHash`: `DATA`, 32 байти — хеш транзакцій, з яких було створено цей журнал. `null`, якщо це журнал, що очікує на розгляд.
  - `blockHash`: `DATA`, 32 байти — хеш блоку, у якому був цей журнал. `null`, якщо вона очікує на розгляд. `null`, якщо це журнал, що очікує на розгляд.
  - `blockNumber`: `QUANTITY` — номер блоку, у якому був цей журнал. `null`, якщо вона очікує на розгляд. `null`, якщо це журнал, що очікує на розгляд.
  - `address`: `DATA`, 20 байтів — адреса, з якої походить цей журнал.
  - `data`: `DATA` — неіндексовані дані журналу змінної довжини. (У _solidity_: нуль або більше 32-байтових неіндексованих аргументів журналу.)
  - `topics`: `Array of DATA` — масив від 0 до 4 32-байтових `DATA` індексованих аргументів журналу. (У _solidity_: першою темою є _хеш_ підпису події (наприклад, `Deposit(address,bytes32,uint256)`), за винятком випадків, коли ви оголосили подію зі специфікатором `anonymous`.)

- **Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": [{
    "logIndex": "0x1", // 1
    "blockNumber":"0x1b4", // 436
    "blockHash": "0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "transactionHash":  "0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf",
    "transactionIndex": "0x0", // 0
    "address": "0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "data":"0x0000000000000000000000000000000000000000000000000000000000000000",
    "topics": ["0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5"]
    },{
      ...
    }]
}
```

### eth_getFilterLogs {#eth_getfilterlogs}

Повертає масив усіх журналів, що відповідають фільтру з вказаним ідентифікатором.

**Параметри**

1. `QUANTITY` — ідентифікатор фільтра.

```js
params: [
  "0x16", // 22
]
```

**Повертає**
Див. [eth_getFilterChanges](#eth_getfilterchanges)

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

Результат див. у [eth_getFilterChanges](#eth_getfilterchanges)

### eth_getLogs {#eth_getlogs}

Повертає масив усіх журналів, що відповідають заданому об'єкту фільтра.

**Параметри**

1. `Object` — параметри фільтра:

- `fromBlock`: `QUANTITY|TAG` — (необов'язково, за замовчуванням: `"latest"`) цілочисельний номер блоку, або `"latest"` для останнього запропонованого блоку, `"safe"` для останнього безпечного блоку, `"finalized"` для останнього фіналізованого блоку, або `"pending"`, `"earliest"` для транзакцій, які ще не в блоці.
- `toBlock`: `QUANTITY|TAG` — (необов'язково, за замовчуванням: `"latest"`) цілочисельний номер блоку, або `"latest"` для останнього запропонованого блоку, `"safe"` для останнього безпечного блоку, `"finalized"` для останнього фіналізованого блоку, або `"pending"`, `"earliest"` для транзакцій, які ще не в блоці.
- `address`: `DATA|Array`, 20 байтів — (необов’язково) адреса контракту або список адрес, з яких мають походити журнали.
- `topics`: `Array of DATA`, - (необов'язково) масив 32-байтових `DATA` тем. Теми залежать від порядку. Кожна тема також може бути масивом DATA з опціями «або».
- `blockHash`: `DATA`, 32 байти — (необов'язково, **майбутнє**) з додаванням EIP-234, `blockHash` стане новим параметром фільтра, який обмежує повернуті журнали одним блоком з 32-байтовим хешем `blockHash`. Використання `blockHash` еквівалентно `fromBlock` = `toBlock` = номер блоку з хешем `blockHash`. Якщо `blockHash` присутній у критеріях фільтра, то ні `fromBlock`, ні `toBlock` не дозволяються.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**Повертає**
Див. [eth_getFilterChanges](#eth_getfilterchanges)

**Приклад**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

Результат див. у [eth_getFilterChanges](#eth_getfilterchanges)

## Приклад використання {#usage-example}

### Розгортання контракту за допомогою JSON-RPC {#deploying-contract}

Цей розділ містить демонстрацію того, як розгорнути контракт, використовуючи лише інтерфейс RPC. Існують альтернативні способи розгортання контрактів, де ця складність абстрагована — наприклад, за допомогою бібліотек, побудованих на основі інтерфейсу RPC, таких як [web3.js](https://web3js.readthedocs.io/) та [web3.py](https://github.com/ethereum/web3.py). Ці абстракції, як правило, легші для розуміння та менш схильні до помилок, але все ж корисно розуміти, що відбувається «під капотом».

Нижче наведено простий смарт-контракт під назвою `Multiply7`, який буде розгорнуто за допомогою інтерфейсу JSON-RPC на вузлі Ethereum. Цей посібник передбачає, що читач уже має запущений вузол Geth. Більше інформації про вузли та клієнти доступно [тут](/developers/docs/nodes-and-clients/run-a-node). Будь ласка, зверніться до документації окремих [клієнтів](/developers/docs/nodes-and-clients/), щоб дізнатися, як запустити HTTP JSON-RPC для клієнтів, відмінних від Geth. Більшість клієнтів за замовчуванням обслуговують на `localhost:8545`.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

Перше, що потрібно зробити, це переконатися, що інтерфейс HTTP RPC увімкнено. Це означає, що ми надаємо Geth прапор `--http` під час запуску. У цьому прикладі ми використовуємо вузол Geth у приватному ланцюжку розробки. Використовуючи цей підхід, нам не потрібен етер у реальній мережі.

```bash
geth --http --dev console 2>>geth.log
```

Це запустить інтерфейс HTTP RPC на `http://localhost:8545`.

Ми можемо перевірити, що інтерфейс працює, отримавши адресу coinbase (отримавши першу адресу з масиву облікових записів) та баланс за допомогою [curl](https://curl.se). Зверніть увагу, що дані в цих прикладах будуть відрізнятися на вашому локальному вузлі. Якщо ви хочете спробувати ці команди, замініть параметри запиту в другому запиті curl на результат, повернутий першим.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

Оскільки числа закодовані в шістнадцятковому форматі, баланс повертається в wei у вигляді шістнадцяткового рядка. Якщо ми хочемо мати баланс в етерах як число, ми можемо використовувати web3 з консолі Geth.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

Тепер, коли в нашому приватному ланцюжку розробки є трохи етеру, ми можемо розгорнути контракт. Перший крок — скомпілювати контракт Multiply7 у байт-код, який можна надіслати в EVM. Щоб установити solc, компілятор Solidity, дотримуйтесь [документації Solidity](https://docs.soliditylang.org/en/latest/installing-solidity.html). (Можливо, ви захочете використати старішу версію `solc`, щоб вона відповідала [версії компілятора, використаній у нашому прикладі](https://github.com/ethereum/solidity/releases/tag/v0.4.20).)

Наступним кроком є компіляція контракту Multiply7 у байт-код, який можна надіслати до EVM.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

Тепер, коли у нас є скомпільований код, нам потрібно визначити, скільки газу коштує його розгортання. Інтерфейс RPC має метод `eth_estimateGas`, який дасть нам оцінку.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

І нарешті, розгорніть контракт.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

Транзакція приймається вузлом, і повертається хеш транзакції. Цей хеш можна використовувати для відстеження транзакції. Наступний крок — визначити адресу, за якою розгорнуто наш контракт. Кожна виконана транзакція створить квитанцію. Ця квитанція містить різну інформацію про транзакцію, наприклад, у якому блоці було включено транзакцію та скільки газу було використано EVM. Якщо транзакція
створює контракт, вона також міститиме адресу контракту. Ми можемо отримати квитанцію за допомогою методу `eth_getTransactionReceipt` RPC.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

Наш контракт було створено за адресою `0x4d03d617d700cf81935d7f797f4e2ae719648262`. Результат null замість квитанції означає, що транзакцію ще не включено до блоку. Зачекайте трохи, перевірте, чи запущений ваш клієнт консенсусу, і повторіть спробу.

#### Взаємодія зі смарт-контрактами {#interacting-with-smart-contract}

У цьому прикладі ми надішлемо транзакцію за допомогою `eth_sendTransaction` до методу `multiply` контракту.

`eth_sendTransaction` вимагає кілька аргументів, а саме `from`, `to` і `data`. `From` — це публічна адреса нашого облікового запису, а `to` — адреса контракту. Аргумент `data` містить корисне навантаження, яке визначає, який метод потрібно викликати і з якими аргументами. Саме тут у гру вступає [ABI (двійковий інтерфейс програми)](https://docs.soliditylang.org/en/latest/abi-spec.html). ABI — це JSON-файл, який визначає, як визначати та кодувати дані для EVM.

Байти корисного навантаження визначають, який метод у контракті викликається. Це перші 4 байти з хешу Keccak від імені функції та типів її аргументів, закодовані в шістнадцятковому форматі. Функція multiply приймає uint, що є псевдонімом для uint256. У результаті ми отримуємо:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

Наступним кроком є кодування аргументів. Існує лише один uint256, скажімо, значення 6. ABI має розділ, який визначає, як кодувати типи uint256.

`int<M>: enc(X)` — це кодування X у форматі доповняльного коду з порядком від старшого до молодшого (big-endian), доповнене з боку старшого розряду (ліворуч) 0xff для від’ємних X і нульовими байтами для додатних X, таким чином, щоб довжина була кратною 32 байтам.

Це кодується в `0000000000000000000000000000000000000000000000000000000000000006`.

Поєднавши селектор функції та закодований аргумент, наші дані матимуть вигляд `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`.

Тепер це можна надіслати на вузол:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

Оскільки транзакцію було надіслано, було повернуто хеш транзакції. Отримання квитанції дає:

```javascript
{
   blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
   blockNumber: 268,
   contractAddress: null,
   cumulativeGasUsed: 22631,
   gasUsed: 22631,
   logs: [{
      address: "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d",
      blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
      blockNumber: 268,
      data: "0x000000000000000000000000000000000000000000000000000000000000002a",
      logIndex: 0,
      topics: ["0x24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"],
      transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
      transactionIndex: 0
  }],
  transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
  transactionIndex: 0
}
```

Квитанція містить журнал. Цей журнал був згенерований EVM під час виконання транзакції та включений у квитанцію. Функція `multiply` показує, що подія `Print` була викликана з вхідним значенням, помноженим на 7. Оскільки аргументом для події `Print` було uint256, ми можемо розшифрувати його відповідно до правил ABI, що дасть нам очікуване десяткове значення 42. Крім даних, варто зазначити, що теми можна використовувати для визначення того, яка подія створила запис у журналі:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

Це був лише короткий вступ до деяких з найпоширеніших завдань, що демонструє пряме використання JSON-RPC.

## Пов'язані теми {#related-topics}

- [Специфікація JSON-RPC](http://www.jsonrpc.org/specification)
- [Вузли та клієнти](/developers/docs/nodes-and-clients/)
- [JavaScript API](/developers/docs/apis/javascript/)
- [Серверні API](/developers/docs/apis/backend/)
- [Клієнти виконання](/developers/docs/nodes-and-clients/#execution-clients)
