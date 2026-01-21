---
title: JSON-RPC API
description: "Облегченный stateless протокол удаленного вызова процедур (RPC) для клиентов Ethereum."
lang: ru
---

Для того чтобы программное приложение могло взаимодействовать с блокчейном Эфириум, считывая данные блокчейна или отправляя транзакции в сеть, оно должно подключиться к узлу Эфириум.

Для этой цели каждый [клиент Ethereum](/developers/docs/nodes-and-clients/#execution-clients) реализует [спецификацию JSON-RPC](https://github.com/ethereum/execution-apis), поэтому существует единый набор методов, на которые приложения могут полагаться независимо от конкретной реализации узла или клиента.

[JSON-RPC](https://www.jsonrpc.org/specification) — это легковесный протокол удаленного вызова процедур (RPC) без сохранения состояния. Он определяет несколько структур данных и правила их обработки. Это транспортная агностика, в которой понятия могут использоваться в рамках одного и того же процесса, через сокеты, через HTTP или во многих различных средах передачи сообщений. В качестве формата данных используется JSON (RFC 4627).

## Реализации клиентов {#client-implementations}

Каждый клиент Ethereum может использовать разные языки программирования при реализации спецификации JSON-RPC. Дополнительную информацию о конкретных языках программирования смотрите в [документации отдельных клиентов](/developers/docs/nodes-and-clients/#execution-clients). Мы рекомендуем проверять документацию каждого клиента для получения последней информации о поддержке API.

## Библиотеки для удобства {#convenience-libraries}

Хотя вы можете напрямую взаимодействовать с клиентами Ethereum через JSON-RPC API, для разработчиков децентрализованных приложений часто есть более простые варианты. Существует множество библиотек [JavaScript](/developers/docs/apis/javascript/#available-libraries) и [API для бэкенда](/developers/docs/apis/backend/#available-libraries), которые предоставляют оболочки поверх JSON-RPC API. С помощью этих библиотек разработчики могут писать интуитивно понятные однострочные методы на выбранном ими языке программирования для инициализации запросов JSON-RPC (под капотом), которые взаимодействуют с Ethereum.

## API клиентов консенсуса {#consensus-clients}

Эта страница посвящена в основном JSON-RPC API, используемому клиентами-исполнителями Эфириум. Однако консенсус-клиенты также имеют RPC API, который позволяет пользователям запрашивать информацию об узле, блоки Beacon, состояние Beacon и другую информацию, связанную с консенсусом, непосредственно с узла. Этот API документирован на [веб-странице Beacon API](https://ethereum.github.io/beacon-APIs/#/).

Внутренний API также используется для межклиентского взаимодействия внутри узла, то есть он позволяет консенсус-клиенту и клиенту-исполнителю обмениваться данными. Это называется «Engine API», а спецификации доступны на [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Спецификация клиента исполнения {#spec}

[Прочитайте полную спецификацию JSON-RPC API на GitHub](https://github.com/ethereum/execution-apis). Этот API документирован на [веб-странице Execution API](https://ethereum.github.io/execution-apis/) и включает в себя Inspector для тестирования всех доступных методов.

## Соглашения {#conventions}

### Кодирование шестнадцатеричных значений {#hex-encoding}

Два ключевых типа данных передаются через JSON: неформатированные массивы байтов и величины. Оба передаются с шестнадцатеричной кодировкой, но с различными требованиями к форматированию.

#### Величины {#quantities-encoding}

При кодировании величин (целых чисел, цифр): кодирование как шестнадцатеричный, префикс с "0x", самое компактное представление (небольшое исключение: ноль должен быть представлен как "0x0").

Вот несколько примеров:

- 0x41 (65 в десятичной системе)
- 0x400 (1024 в десятичной системе)
- НЕВЕРНО: 0x (всегда должна быть по крайней мере одна цифра - ноль равен "0x0")
- НЕВЕРНО: 0x0400 (нули в начале не допускаются)
- НЕВЕРНО: ff (должен быть префикс 0x)

### Неформатированные данные {#unformatted-data-encoding}

При кодировании неформатированных данных (массивов байтов, адресов аккаунтов, хэш, массивов байт-кодов): кодируйте как шестнадцатеричный, префикс с "0x", две шестнадцатеричные цифры на байт.

Вот несколько примеров:

- 0x41 (размер 1, "A")
- 0x004200 (размер 3, "0B0")
- 0x (размер 0, "")
- НЕВЕРНО: 0xf0f0f (должно быть четное количество цифр)
- НЕВЕРНО: 004200 (должен быть префикс 0x)

### Параметр блока {#block-parameter}

Следующие методы имеют параметр блока:

- [eth_getBalance](#eth_getbalance)
- [eth_getCode](#eth_getcode)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_call](#eth_call)

Когда делаются запросы, которые опрашивают состояние Ethereum, предоставленный параметр блока определяет высоту блока.

Для параметра блока возможны следующие опции:

- `HEX String` — целочисленный номер блока
- `String "earliest"` для самого раннего/генезис-блока
- `String "latest"` — для последнего предложенного блока
- `String "safe"` — для последнего безопасного головного блока
- `String "finalized"` — для последнего финализированного блока
- `String "pending"` — для состояния/транзакций в ожидании

## Примеры программ

На этой странице мы приводим примеры того, как использовать отдельные конечные точки JSON_RPC API с помощью инструмента командной строки [curl](https://curl.se). Эти отдельные примеры конечных точек находятся ниже в разделе [Примеры Curl](#curl-examples). Далее на странице мы также приводим [сквозной пример](#usage-example) для компиляции и развертывания смарт-контракта с использованием узла Geth, JSON_RPC API и curl.

## Примеры Curl {#curl-examples}

Ниже приведены примеры использования JSON_RPC API путем выполнения запросов [curl](https://curl.se) к узлу Ethereum. Каждый пример включает в себя описание конкретного эндпоинта, его параметров, возвращаемого типа и пример использованя.

Запросы curl могут возвращать сообщение об ошибке, относящееся к типу содержимого. Это связано с тем, что опция `--data` устанавливает тип содержимого на `application/x-www-form-urlencoded`. Если ваш узел жалуется на это, установите заголовок вручную, поместив `-H "Content-Type: application/json"` в начало вызова. Примеры также не включают комбинацию URL/IP и порта, которая должна быть последним аргументом, передаваемым в curl (например, `127.0.0.1:8545`). Полный запрос curl, включающий эти дополнительные данные, выглядит так:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## Gossip, Состояние, История {#gossip-state-history}

Несколько основных методов JSON-RPC требуют данных из сети Ethereum и четко делятся на три основные категории: _Gossip, Состояние и История_. Воспользуйтесь ссылками в этих разделах, чтобы перейти к каждому из методов, или воспользуйтесь оглавлением, чтобы посмотреть список всех методов.

### Gossip-методы {#gossip-methods}

> Эти методы отслеживают голову цепочки. С их помощью транзакции распространяются по сети, группируются в блоки и клиенты узнают о новых блоках.

- [eth_blockNumber](#eth_blocknumber)
- [eth_sendRawTransaction](#eth_sendrawtransaction)

### Методы состояния {#state_methods}

> Методы, которые сообщают о текущем состоянии всех сохраненных данных. "Состояние" похоже на один большой разделяемый фрагмент оперативной памяти и включает в себя балансы аккаунтов, данные контрактов и оценки расхода газа.

- [eth_getBalance](#eth_getbalance)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getCode](#eth_getcode)
- [eth_call](#eth_call)
- [eth_estimateGas](#eth_estimategas)

### Методы истории {#history_methods}

> Извлекает исторические записи о каждом блоке вплоть до генезис блока. Это похоже на большой файл, к которому можно лишь добавлять новую информацию, и включает в себя все заголовки блоков, тела блоков, блоков-дядей и результаты транзакций.

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

## Песочница JSON-RPC API

Вы можете использовать [инструмент-песочницу](https://ethereum-json-rpc.com), чтобы изучить и опробовать методы API. Он также показывает, какие методы и сети поддерживаются различными поставщиками узлов.

## Методы JSON-RPC API {#json-rpc-methods}

### web3_clientVersion {#web3_clientversion}

Возвращает текущую версию клиента.

**Параметры**

Нет

**Возвращает**

`String` — текущая версия клиента

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// Результат
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3_sha3}

Возвращает Keccak-256 (а _не_ стандартизированный SHA3-256) для предоставленных данных.

**Параметры**

1. `DATA` — данные для преобразования в хэш SHA3

```js
params: ["0x68656c6c6f20776f726c64"]
```

**Возвращает**

`DATA` — результат SHA3 для данной строки.

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// Результат
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net_version}

Возвращает идентификатор текущей сети.

**Параметры**

Нет

**Возвращает**

`String` — идентификатор текущей сети.

Полный список текущих идентификаторов сетей доступен на [chainlist.org](https://chainlist.org). Наиболее распространённые из них:

- `1`: основная сеть Ethereum
- `11155111`: тестовая сеть Sepolia
- `560048`: тестовая сеть Hoodi

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// Результат
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net_listening}

Возвращает `true`, если клиент активно прослушивает сетевые подключения.

**Параметры**

Нет

**Возвращает**

`Boolean` — `true` при прослушивании, в противном случае `false`.

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// Результат
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net_peercount}

Возвращает количество соседних узлов, подключённых к клиенту в текущий момент.

**Параметры**

Нет

**Возвращает**

`QUANTITY` — целочисленное количество подключенных пиров.

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// Результат
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth_protocolversion}

Возвращает текущую версию протокола Эфириум. Обратите внимание, что этот метод [недоступен в Geth](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924).

**Параметры**

Нет

**Возвращает**

`String` — текущая версия протокола Ethereum

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// Результат
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth_syncing}

Возвращает объект с данными о статусе синхронизации или `false`.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  Попробовать конечную точку в песочнице
</ButtonLink>

**Параметры**

Нет

**Возвращает**

Точные возвращаемые данные различаются в разных реализациях клиентов. Все клиенты возвращают `False`, когда узел не синхронизируется, и все клиенты возвращают следующие поля.

`Object|Boolean`, объект с данными о статусе синхронизации или `FALSE`, когда нет синхронизации:

- `startingBlock`: `QUANTITY` — блок, с которого начался импорт (будет сброшен только после того, как синхронизация достигнет его головы)
- `currentBlock`: `QUANTITY` — текущий блок, то же, что и eth_blockNumber
- `highestBlock`: `QUANTITY` — предполагаемый самый высокий блок

Однако отдельные клиенты могут также предоставлять дополнительные данные. Например, Geth возвращает следующее:

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

В то время как Besu возвращает:

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

За более подробной информацией обратитесь к документации вашего конкретного клиента.

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// Результат
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// Или когда не синхронизируется
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth_coinbase}

Возвращает текущий адрес coinbase.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  Попробовать конечную точку в песочнице
</ButtonLink>

> **Примечание:** этот метод был признан устаревшим в версии **v1.14.0** и больше не поддерживается. Попытка использовать этот метод приведет к ошибке «Method not supported».

**Параметры**

Нет

**Возвращает**

`DATA`, 20 байт — текущий адрес coinbase.

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// Результат
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth_chainId}

Возвращает идентификатор сети, используемый для подписи защищённых от повторения транзакций.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  Попробовать конечную точку в песочнице
</ButtonLink>

**Параметры**

Нет

**Возвращает**

`chainId`, шестнадцатеричное значение в виде строки, представляющее собой целое число — идентификатор текущей цепи.

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// Результат
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth_mining}

Возвращает `true`, если клиент активно майнит новые блоки. Этот метод может вернуть `true` только для сетей с доказательством работы и может быть недоступен в некоторых клиентах после [Слияния](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  Попробовать конечную точку в песочнице
</ButtonLink>

**Параметры**

Нет

**Возвращает**

`Boolean` — возвращает `true`, если клиент занимается майнингом, в противном случае `false`.

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth_hashrate}

Возвращает количество хешей в секунду, с которым узел майнит. Этот метод может вернуть `true` только для сетей с доказательством работы и может быть недоступен в некоторых клиентах после [Слияния](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  Попробовать конечную точку в песочнице
</ButtonLink>

**Параметры**

Нет

**Возвращает**

`QUANTITY` — количество хэшей в секунду.

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// Результат
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth_gasprice}

Возвращает оценку текущей цены за газ в wei. Например, клиент Besu по умолчанию проверяет последние 100 блоков и возвращает медианную цену за единицу газа.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  Попробовать конечную точку в песочнице
</ButtonLink>

**Параметры**

Нет

**Возвращает**

`QUANTITY` — целочисленное значение текущей цены на газ в wei.

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// Результат
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth_accounts}

Возвращает список адресов, принадлежащих клиенту.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  Попробовать конечную точку в песочнице
</ButtonLink>

**Параметры**

Нет

**Возвращает**

`Массив DATA`, 20 байт — адреса, принадлежащие клиенту.

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// Результат
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth_blocknumber}

Возвращает номер самого последнего блока.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  Попробовать конечную точку в песочнице
</ButtonLink>

**Параметры**

Нет

**Возвращает**

`QUANTITY` — целочисленное значение номера текущего блока, на котором находится клиент.

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// Результат
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth_getbalance}

Возвращает баланс счета по заданному адресу.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  Попробовать конечную точку в песочнице
</ButtonLink>

**Параметры**

1. `DATA`, 20 байт — адрес для проверки баланса.
2. `QUANTITY|TAG` — целочисленный номер блока или строка `"latest"`, `"earliest"`, `"pending"`, `"safe"` или `"finalized"`, см. [параметр блока](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**Возвращает**

`QUANTITY` — целочисленное значение текущего баланса в wei.

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// Результат
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth_getstorageat}

Возвращает значение из ячейки хранилища по указанному адресу.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  Попробовать конечную точку в песочнице
</ButtonLink>

**Параметры**

1. `DATA`, 20 байт — адрес хранилища.
2. `QUANTITY` — целое число, обозначающее позицию в хранилище.
3. `QUANTITY|TAG` — целочисленный номер блока или строка `"latest"`, `"earliest"`, `"pending"`, `"safe"` или `"finalized"`, см. [параметр блока](/developers/docs/apis/json-rpc/#block-parameter)

**Возвращает**

`DATA` — значение в этой позиции хранилища.

**Пример**
Вычисление правильной позиции зависит от извлекаемого хранилища. Рассмотрим следующий контракт, развернутый по адресу `0x295a70b2de5e3953354a6a8344e616ed314d7251` с адреса `0x391694e7e0b0cce554cb130d723a9d27458f9298`.

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

Получить значение pos0 просто:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

Извлечь элемент из хеш-таблицы (mapping) сложнее. Позиция элемента в mapping вычисляется так:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

Это означает, что, чтобы извлечь значение хранилища pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"], нам необходимо посчитать позицию при помощи:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

Консоль geth, идущая с библиотекой web3, может быть использована для вычисления:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Теперь, чтобы извлечь значение из хранилища:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth_gettransactioncount}

Возвращает количество транзакций, _отправленных_ с адреса.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  Попробовать конечную точку в песочнице
</ButtonLink>

**Параметры**

1. `DATA`, 20 байт — адрес.
2. `QUANTITY|TAG` — целочисленный номер блока или строка `"latest"`, `"earliest"`, `"pending"`, `"safe"` или `"finalized"`, см. [параметр блока](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // состояние на последнем блоке
]
```

**Возвращает**

`QUANTITY` — целочисленное значение количества транзакций, отправленных с этого адреса.

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// Результат
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth_getblocktransactioncountbyhash}

Возвращает количество транзакций в блоке из блока с заданным хешем.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  Попробовать конечную точку в песочнице
</ButtonLink>

**Параметры**

1. `DATA`, 32 байта — хэш блока

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**Возвращает**

`QUANTITY` — целое число, обозначающее количество транзакций в этом блоке.

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// Результат
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth_getblocktransactioncountbynumber}

Возвращает количество транзакций в блоке с заданным номером блока.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  Попробовать конечную точку в песочнице
</ButtonLink>

**Параметры**

1. `QUANTITY|TAG` — целое число, номер блока или строка `"earliest"`, `"latest"`, `"pending"`, `"safe"` или `"finalized"`, как в [параметре блока](/developers/docs/apis/json-rpc/#block-parameter).

```js
params: [
  "0x13738ca", // 20396234
]
```

**Возвращает**

`QUANTITY` — целое число, обозначающее количество транзакций в этом блоке.

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// Результат
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth_getunclecountbyblockhash}

Возвращает количество блоков-дядей для блока с данным хешем.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  Попробовать конечную точку в песочнице
</ButtonLink>

**Параметры**

1. `DATA`, 32 байта — хэш блока

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**Возвращает**

`QUANTITY` — количество дядей в этом блоке.

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// Результат
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth_getunclecountbyblocknumber}

Возвращает количество блоков-дядей для блока с данным номером.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  Попробовать конечную точку в песочнице
</ButtonLink>

**Параметры**

1. `QUANTITY|TAG` — целочисленный номер блока или строка `"latest"`, `"earliest"`, `"pending"`, `"safe"` или `"finalized"`, см. [параметр блока](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xe8", // 232
]
```

**Возвращает**

`QUANTITY` — количество дядей в этом блоке.

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// Результат
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth_getcode}

Возвращает код по заданному адресу.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  Попробовать конечную точку в песочнице
</ButtonLink>

**Параметры**

1. `DATA`, 20 байт — адрес
2. `QUANTITY|TAG` — целочисленный номер блока или строка `"latest"`, `"earliest"`, `"pending"`, `"safe"` или `"finalized"`, см. [параметр блока](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**Возвращает**

`DATA` — код по заданному адресу.

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// Результат
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth_sign}

Метод sign вычисляет специфичную для Ethereum подпись с помощью: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

Добавление префикса к сообщению позволяет распознать подпись как специфичную для Эфириум. Это предотвращает неправомерное использование, когда вредоносное децентрализованное приложение может подписывать произвольные данные (например, транзакцию) и использовать подпись для выдачи себя за жертву.

Примечание: адрес для подписи должен быть разблокирован.

**Параметры**

1. `DATA`, 20 байт — адрес
2. `DATA`, N байт — сообщение для подписи

**Возвращает**

`DATA`: подпись

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// Результат
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth_signtransaction}

Подписывает транзакцию, которая может быть позже отправлена в сеть с помощью [eth_sendRawTransaction](#eth_sendrawtransaction).

**Параметры**

1. `Object` — объект транзакции

- `type`:
- `from`: `DATA`, 20 байт — адрес, с которого отправляется транзакция.
- `to`: `DATA`, 20 байт — (необязательно при создании нового контракта) адрес, на который направлена транзакция.
- `gas`: `QUANTITY` — (необязательно, по умолчанию: 90000) целое число, обозначающее количество газа, предоставленного на выполнение транзакции. Неиспользованный газ будет возвращён.
- `gasPrice`: `QUANTITY` — (необязательно, по умолчанию: будет определено) целое число, обозначающее gasPrice для каждой затраченной единицы газа, в Wei.
- `value`: `QUANTITY` — (необязательно) целое число, обозначающее значение, отправленное вместе с этой транзакцией, в Wei.
- `data`: `DATA` — скомпилированный код контракта ИЛИ хэш сигнатуры вызываемой функции и закодированные параметры.
- `nonce`: `QUANTITY` — (необязательно) целое число одноразового номера. Это позволяет перезаписать ваши незавершённые транзакции, использовав один и тот же одноразовый номер.

**Возвращает**

`DATA`, объект транзакции, закодированный в RLP и подписанный указанным аккаунтом.

**Пример**

```js
// Запрос
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// Результат
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth_sendtransaction}

Создает новую транзакцию с вызовом сообщения или созданием контракта, если поле data содержит код, и подписывает ее с помощью аккаунта, указанного в `from`.

**Параметры**

1. `Object` — объект транзакции

- `from`: `DATA`, 20 байт — адрес, с которого отправляется транзакция.
- `to`: `DATA`, 20 байт — (необязательно при создании нового контракта) адрес, на который направлена транзакция.
- `gas`: `QUANTITY` — (необязательно, по умолчанию: 90000) целое число, обозначающее количество газа, предоставленного на выполнение транзакции. Неиспользованный газ будет возвращён.
- `gasPrice`: `QUANTITY` — (необязательно, по умолчанию: будет определено) целое число, обозначающее gasPrice для каждой затраченной единицы газа.
- `value`: `QUANTITY` — (необязательно) целое число, обозначающее значение, отправленное вместе с этой транзакцией.
- `input`: `DATA` — скомпилированный код контракта ИЛИ хэш сигнатуры вызываемой функции и закодированные параметры.
- `nonce`: `QUANTITY` — (необязательно) целое число одноразового номера. Это позволяет перезаписать ваши незавершённые транзакции, использовав один и тот же одноразовый номер.

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

**Возвращает**

`DATA`, 32 байта — хэш транзакции или нулевой хэш, если транзакция еще недоступна.

Используйте [eth_getTransactionReceipt](#eth_gettransactionreceipt), чтобы получить адрес контракта после того, как транзакция была предложена в блоке, когда вы создавали контракт.

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// Результат
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth_sendrawtransaction}

Создаёт новую транзакцию с вызовом или развертывает контракт, используя подписанную транзакцию.

**Параметры**

1. `DATA`, подписанные данные транзакции.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**Возвращает**

`DATA`, 32 байта — хэш транзакции или нулевой хэш, если транзакция еще недоступна.

Используйте [eth_getTransactionReceipt](#eth_gettransactionreceipt), чтобы получить адрес контракта после того, как транзакция была предложена в блоке, когда вы создавали контракт.

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// Результат
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth_call}

Немедленно выполняет новый вызов сообщения без создания транзакции в блокчейне. Часто используется для выполнения функций смарт-контрактов, доступных только для чтения, например, `balanceOf` для контракта ERC-20.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  Попробовать конечную точку в песочнице
</ButtonLink>

**Параметры**

1. `Object` — объект вызова транзакции

- `from`: `DATA`, 20 байт — (необязательно) адрес, с которого отправляется транзакция.
- `to`: `DATA`, 20 байт — адрес, на который направлена транзакция.
- `gas`: `QUANTITY` — (необязательно) целое число, обозначающее количество газа, предоставленного на выполнение транзакции. eth_call не потребляет газ, но этот параметр может быть необходим некоторым контрактам.
- `gasPrice`: `QUANTITY` — (необязательно) целое число, обозначающее gasPrice для каждой затраченной единицы газа
- `value`: `QUANTITY` — (необязательно) целое число, обозначающее значение, отправленное вместе с этой транзакцией
- `input`: `DATA` — (необязательно) хэш сигнатуры метода и закодированные параметры. Для получения подробной информации см. [ABI контракта Ethereum в документации Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html).

2. `QUANTITY|TAG` — целочисленный номер блока или строка `"latest"`, `"earliest"`, `"pending"`, `"safe"` или `"finalized"`, см. [параметр блока](/developers/docs/apis/json-rpc/#block-parameter)

**Возвращает**

`DATA` — возвращаемое значение исполненного контракта.

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// Результат
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth_estimategas}

Генерирует и возвращает оценку того, сколько газа необходимо для выполнения транзакции. Транзакция не будет добавлена в блокчейн. Обратите внимание, что оценочное значение может быть значительно больше, чем количество газа, фактически использованного транзакцией, по целому ряду причин, включая особенности EVM и производительность узла.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  Попробовать конечную точку в песочнице
</ButtonLink>

**Параметры**

См. параметры [eth_call](#eth_call), за исключением того, что все свойства являются необязательными. Если лимит газа не указан, geth использует лимит газа блока из ожидающего рассмотрения блока в качестве верхней границы. В результате возвращенной оценки может оказаться недостаточно для выполнения вызова/транзакции, когда количество газа превышает лимит газа в ожидающем блоке.

**Возвращает**

`QUANTITY` — количество использованного газа.

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// Результат
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth_getblockbyhash}

Возвращает информацию о блоке по хэшу.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  Попробовать конечную точку в песочнице
</ButtonLink>

**Параметры**

1. `DATA`, 32 байта — хэш блока.
2. `Boolean` — если `true`, возвращает полные объекты транзакций, если `false` — только хэши транзакций.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**Возвращает**

`Object` — объект блока или `null`, если блок не найден:

- `number`: `QUANTITY` — номер блока. `null`, когда блок находится в состоянии ожидания.
- `hash`: `DATA`, 32 байта — хэш блока. `null`, когда блок находится в состоянии ожидания.
- `parentHash`: `DATA`, 32 байта — хэш родительского блока.
- `nonce`: `DATA`, 8 байт — хэш сгенерированного доказательства выполнения работы. `null`, когда блок находится в состоянии ожидания, `0x0` для блоков с доказательством доли владения (после Слияния).
- `sha3Uncles`: `DATA`, 32 байта — SHA3 данных о блоках-дядях в этом блоке.
- `logsBloom`: `DATA`, 256 байт — фильтр Блума для журналов блока. `null`, когда блок находится в состоянии ожидания.
- `transactionsRoot`: `DATA`, 32 байта — корень дерева транзакций блока.
- `stateRoot`: `DATA`, 32 байта — корень конечного дерева состояний блока.
- `receiptsRoot`: `DATA`, 32 байта — корень дерева квитанций блока.
- `miner`: `DATA`, 20 байт — адрес получателя, которому были переданы вознаграждения за блок.
- `difficulty`: `QUANTITY` — целое число, обозначающее сложность этого блока.
- `totalDifficulty`: `QUANTITY` — целое число, обозначающее общую сложность цепи до этого блока.
- `extraData`: `DATA` — поле «дополнительные данные» этого блока.
- `size`: `QUANTITY` — целое число, размер этого блока в байтах.
- `gasLimit`: `QUANTITY` — максимальное количество газа, разрешенное в этом блоке.
- `gasUsed`: `QUANTITY` — общее количество газа, использованное всеми транзакциями в этом блоке.
- `timestamp`: `QUANTITY` — временная метка unix, когда блок был сопоставлен.
- `transactions`: `Массив` — массив объектов транзакций или 32-байтных хэшей транзакций в зависимости от последнего заданного параметра.
- `uncles`: `Массив` — массив хэшей дядей.

**Пример**

```js
// Запрос
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

Возвращает информацию о блоке по его номеру.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  Попробовать конечную точку в песочнице
</ButtonLink>

**Параметры**

1. `QUANTITY|TAG` — целое число, номер блока или строка `"earliest"`, `"latest"`, `"pending"`, `"safe"` или `"finalized"`, как в [параметре блока](/developers/docs/apis/json-rpc/#block-parameter).
2. `Boolean` — если `true`, возвращает полные объекты транзакций, если `false` — только хэши транзакций.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**Возвращает**
См. [eth_getBlockByHash](#eth_getblockbyhash)

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

Результат см. в [eth_getBlockByHash](#eth_getblockbyhash)

### eth_getTransactionByHash {#eth_gettransactionbyhash}

Возвращает информацию о транзакции по её хешу.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  Попробовать конечную точку в песочнице
</ButtonLink>

**Параметры**

1. `DATA`, 32 байта — хэш транзакции

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**Возвращает**

`Object` — объект транзакции или `null`, если транзакция не найдена:

- `blockHash`: `DATA`, 32 байта — хэш блока, в котором находилась эта транзакция. `null`, когда она находится в состоянии ожидания.
- `blockNumber`: `QUANTITY` — номер блока, в котором находилась эта транзакция. `null`, когда она находится в состоянии ожидания.
- `from`: `DATA`, 20 байт — адрес отправителя.
- `gas`: `QUANTITY` — газ, предоставленный отправителем.
- `gasPrice`: `QUANTITY` — цена на газ, предоставленная отправителем в Wei.
- `hash`: `DATA`, 32 байта — хэш транзакции.
- `input`: `DATA` — данные, отправленные вместе с транзакцией.
- `nonce`: `QUANTITY` — количество транзакций, совершенных отправителем до этой.
- `to`: `DATA`, 20 байт — адрес получателя. `null`, когда это транзакция создания контракта.
- `transactionIndex`: `QUANTITY` — целое число, обозначающее позицию индекса транзакций в блоке. `null`, когда она находится в состоянии ожидания.
- `value`: `QUANTITY` — переданное значение в Wei.
- `v`: `QUANTITY` — идентификатор восстановления ECDSA
- `r`: `QUANTITY` — подпись ECDSA r
- `s`: `QUANTITY` — подпись ECDSA s

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// Результат
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

Возвращает информацию о транзакции по хешу блока и индексу транзакции в блоке.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  Попробовать конечную точку в песочнице
</ButtonLink>

**Параметры**

1. `DATA`, 32 байта — хэш блока.
2. `QUANTITY` — целое число, обозначающее позицию индекса транзакции.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Возвращает**
См. [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Результат см. в [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth_gettransactionbyblocknumberandindex}

Возвращает информацию о транзакции по номеру блока и индексу транзакции в блоке.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  Попробовать конечную точку в песочнице
</ButtonLink>

**Параметры**

1. `QUANTITY|TAG` — номер блока или строка `"earliest"`, `"latest"`, `"pending"`, `"safe"` или `"finalized"`, как в [параметре блока](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` — целочисленное значение индекса транзакции.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**Возвращает**
См. [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

Результат см. в [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionReceipt {#eth_gettransactionreceipt}

Возвращает квитанцию транзакции по хешу транзакции.

**Примечание:** квитанция недоступна для транзакций, находящихся в состоянии ожидания.

**Параметры**

1. `DATA`, 32 байта — хэш транзакции

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**Возвращает**
`Object` — объект квитанции транзакции или `null`, если квитанция не найдена:

- `transactionHash `: `DATA`, 32 байта — хэш транзакции.
- `transactionIndex`: `QUANTITY` — целое число, обозначающее позицию индекса транзакций в блоке.
- `blockHash`: `DATA`, 32 байта — хэш блока, в котором находилась эта транзакция.
- `blockNumber`: `QUANTITY` — номер блока, в котором находилась эта транзакция.
- `from`: `DATA`, 20 байт — адрес отправителя.
- `to`: `DATA`, 20 байт — адрес получателя. null, когда это транзакция развёртывания контракта.
- `cumulativeGasUsed` : `QUANTITY ` — общее количество газа, использованного при выполнении этой транзакции в блоке.
- `effectiveGasPrice` : `QUANTITY` — сумма базовой комиссии и чаевых, уплаченных за единицу газа.
- `gasUsed `: `QUANTITY ` — количество газа, использованное только этой конкретной транзакцией.
- `contractAddress `: `DATA`, 20 байт — созданный адрес контракта, если транзакция была созданием контракта, в противном случае `null`.
- `logs`: `Массив` — массив объектов журнала, которые сгенерировала эта транзакция.
- `logsBloom`: `DATA`, 256 байт — фильтр Блума для легких клиентов для быстрого извлечения связанных журналов.
- `type`: `QUANTITY` — целое число, тип транзакции, `0x0` для устаревших транзакций, `0x1` для типов списков доступа, `0x2` для динамических комиссий.

Он также возвращает _один из_ :

- `root` : `DATA` 32 байта корня состояния после транзакции (до Византии)
- `status`: `QUANTITY` либо `1` (успех), либо `0` (неудача)

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// Результат
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // строка адреса, если он был создан
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // журналы, возвращаемые getFilterLogs и т. д.
    }],
    "logsBloom": "0x00...0", // 256-байтовый фильтр блума
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

Возвращает информацию о дяде блока по хэшу и позиции индекса дяди.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  Попробовать конечную точку в песочнице
</ButtonLink>

**Параметры**

1. `DATA`, 32 байта — хэш блока.
2. `QUANTITY` — позиция индекса дяди.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Возвращает**
См. [eth_getBlockByHash](#eth_getblockbyhash)

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Результат см. в [eth_getBlockByHash](#eth_getblockbyhash)

**Примечание**: дядя не содержит отдельных транзакций.

### eth_getUncleByBlockNumberAndIndex {#eth_getunclebyblocknumberandindex}

Возвращает информацию о дяде блока по номеру и позиции индекса дяди.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  Попробовать конечную точку в песочнице
</ButtonLink>

**Параметры**

1. `QUANTITY|TAG` — номер блока или строка `"earliest"`, `"latest"`, `"pending"`, `"safe"` или `"finalized"`, как в [параметре блока](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` — индекс блока-дяди.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**Возвращает**
См. [eth_getBlockByHash](#eth_getblockbyhash)

**Примечание**: дядя не содержит отдельных транзакций.

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

Результат см. в [eth_getBlockByHash](#eth_getblockbyhash)

### eth_newFilter {#eth_newfilter}

Создает объект фильтра на основе параметров фильтра для уведомления об изменении состояния (логи).
Чтобы проверить, изменилось ли состояние, вызовите [eth_getFilterChanges](#eth_getfilterchanges).

**Примечание по указанию фильтров тем:**
Темы зависят от порядка. Транзакция с логом с темами [A, B] будет подходить под следующие фильтры тем:

- `[]` «что угодно»
- `[A]` «A на первой позиции (и что угодно после)»
- `[null, B]` «что угодно на первой позиции И B на второй позиции (и что угодно после)»
- `[A, B]` «A на первой позиции И B на второй позиции (и что угодно после)»
- `[[A, B], [A, B]]` «(A ИЛИ B) на первой позиции И (A ИЛИ B) на второй позиции (и что угодно после)»
- **Параметры**

1. `Object` — параметры фильтра:

- `fromBlock`: `QUANTITY|TAG` — (необязательно, по умолчанию: `"latest"`) целочисленный номер блока или `"latest"` для последнего предложенного блока, `"safe"` для последнего безопасного блока, `"finalized"` для последнего финализированного блока, или `"pending"`, `"earliest"` для транзакций, еще не включенных в блок.
- `toBlock`: `QUANTITY|TAG` — (необязательно, по умолчанию: `"latest"`) целочисленный номер блока или `"latest"` для последнего предложенного блока, `"safe"` для последнего безопасного блока, `"finalized"` для последнего финализированного блока, или `"pending"`, `"earliest"` для транзакций, еще не включенных в блок.
- `address`: `DATA|Массив`, 20 байт — (необязательно) адрес контракта или список адресов, из которых должны исходить журналы.
- `topics`: `Массив DATA` — (необязательно) массив 32-байтных `DATA` тем. Темы зависят от порядка. Каждая тема может также быть массивом данных с параметрами "or".

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

**Возвращает**
`QUANTITY` — идентификатор фильтра.

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// Результат
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth_newblockfilter}

Создает фильтр в узле, который уведомляет о достижении нового блока.
Чтобы проверить, изменилось ли состояние, вызовите [eth_getFilterChanges](#eth_getfilterchanges).

**Параметры**
Нет

**Возвращает**
`QUANTITY` — идентификатор фильтра.

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// Результат
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth_newpendingtransactionfilter}

Создает фильтр в узле, который уведомляет о поступлении новых ожидающих подтверждения транзакций.
Чтобы проверить, изменилось ли состояние, вызовите [eth_getFilterChanges](#eth_getfilterchanges).

**Параметры**
Нет

**Возвращает**
`QUANTITY` — идентификатор фильтра.

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// Результат
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth_uninstallfilter}

Удаляет фильтр с заданным идентификатором. Всегда следует вызывать, когда наблюдение больше не нужно.
Кроме того, время ожидания фильтров истекает, если они не запрашиваются с помощью [eth_getFilterChanges](#eth_getfilterchanges) в течение определенного периода времени.

**Параметры**

1. `QUANTITY` — идентификатор фильтра.

```js
params: [
  "0xb", // 11
]
```

**Возвращает**
`Boolean` — `true`, если фильтр был успешно удален, в противном случае `false`.

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// Результат
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth_getfilterchanges}

Метод опроса фильтра, возвращающий массив логов, которые произошли с момента последнего опроса.

**Параметры**

1. `QUANTITY` — идентификатор фильтра.

```js
params: [
  "0x16", // 22
]
```

**Возвращает**
`Массив` — массив объектов журнала или пустой массив, если с момента последнего опроса ничего не изменилось.

- Для фильтров, созданных с помощью `eth_newBlockFilter`, возвращаются хэши блоков (`DATA`, 32 байта), например, `["0x3454645634534..."]`.

- Для фильтров, созданных с помощью `eth_newPendingTransactionFilter `, возвращаются хэши транзакций (`DATA`, 32 байта), например, `["0x6345343454645..."]`.

- Для фильтров, созданных с помощью `eth_newFilter`, журналы являются объектами со следующими параметрами:
  - `removed`: `TAG` — `true`, когда журнал был удален из-за реорганизации цепи. `false`, если это действительный журнал.
  - `logIndex`: `QUANTITY` — целое число, обозначающее позицию индекса журнала в блоке. `null`, когда журнал находится в состоянии ожидания.
  - `transactionIndex`: `QUANTITY` — целое число, обозначающее позицию индекса транзакций, из которой был создан журнал. `null`, когда журнал находится в состоянии ожидания.
  - `transactionHash`: `DATA`, 32 байта — хэш транзакций, из которых был создан этот журнал. `null`, когда журнал находится в состоянии ожидания.
  - `blockHash`: `DATA`, 32 байта — хэш блока, в котором находился этот журнал. `null`, когда она находится в состоянии ожидания. `null`, когда журнал находится в состоянии ожидания.
  - `blockNumber`: `QUANTITY` — номер блока, в котором находился этот журнал. `null`, когда она находится в состоянии ожидания. `null`, когда журнал находится в состоянии ожидания.
  - `address`: `DATA`, 20 байт — адрес, из которого возник этот журнал.
  - `data`: `DATA` — неиндексированные данные журнала переменной длины. (В _solidity_: ноль или более 32-байтных неиндексированных аргументов журнала.)
  - `topics`: `Массив DATA` — массив от 0 до 4 32-байтных `DATA` индексированных аргументов журнала. (В _solidity_: первая тема — это _хэш_ подписи события (например, `Deposit(address,bytes32,uint256)`), за исключением случаев, когда вы объявили событие с помощью спецификатора `anonymous`.)

- **Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// Результат
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

Возвращает массив всех логов, соответствующих фильтру с заданным идентификатором.

**Параметры**

1. `QUANTITY` — идентификатор фильтра.

```js
params: [
  "0x16", // 22
]
```

**Возвращает**
См. [eth_getFilterChanges](#eth_getfilterchanges)

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

Результат см. в [eth_getFilterChanges](#eth_getfilterchanges)

### eth_getLogs {#eth_getlogs}

Возвращает массив всех логов, соответствующих заданному объекту фильтра.

**Параметры**

1. `Object` — параметры фильтра:

- `fromBlock`: `QUANTITY|TAG` — (необязательно, по умолчанию: `"latest"`) целочисленный номер блока или `"latest"` для последнего предложенного блока, `"safe"` для последнего безопасного блока, `"finalized"` для последнего финализированного блока, или `"pending"`, `"earliest"` для транзакций, еще не включенных в блок.
- `toBlock`: `QUANTITY|TAG` — (необязательно, по умолчанию: `"latest"`) целочисленный номер блока или `"latest"` для последнего предложенного блока, `"safe"` для последнего безопасного блока, `"finalized"` для последнего финализированного блока, или `"pending"`, `"earliest"` для транзакций, еще не включенных в блок.
- `address`: `DATA|Массив`, 20 байт — (необязательно) адрес контракта или список адресов, из которых должны исходить журналы.
- `topics`: `Массив DATA` — (необязательно) массив 32-байтных `DATA` тем. Темы зависят от порядка. Каждая тема может также быть массивом данных с параметрами "or".
- `blockHash`: `DATA`, 32 байта — (необязательно, **будет в будущем**) с добавлением EIP-234, `blockHash` станет новым параметром фильтра, который ограничивает возвращаемые журналы одним блоком с 32-байтным хэшем `blockHash`. Использование `blockHash` эквивалентно `fromBlock` = `toBlock` = номеру блока с хэшем `blockHash`. Если `blockHash` присутствует в критериях фильтра, то ни `fromBlock`, ни `toBlock` не допускаются.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**Возвращает**
См. [eth_getFilterChanges](#eth_getfilterchanges)

**Пример**

```js
// Запрос
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

Результат см. в [eth_getFilterChanges](#eth_getfilterchanges)

## Пример использования {#usage-example}

### Развертывание контракта с использованием JSON_RPC {#deploying-contract}

Этот раздел включает демонстрацию того, как развернуть контракт, используя только RPC интерфейс. Существуют альтернативные способы развертывания контрактов, где эта сложность абстрагирована, — например, с использованием библиотек, построенных поверх интерфейса RPC, таких как [web3.js](https://web3js.readthedocs.io/) и [web3.py](https://github.com/ethereum/web3.py). Эти абстракции, как правило, более легкие для понимания и менее подвержены ошибкам, но все равно полезно понимать, что происходит под капотом.

Ниже приведен простой смарт-контракт под названием `Multiply7`, который будет развернут с использованием интерфейса JSON-RPC на узле Ethereum. Это руководство предполагает, что читатель уже использует узел Geth. Дополнительную информацию об узлах и клиентах можно найти [здесь](/developers/docs/nodes-and-clients/run-a-node). Пожалуйста, обратитесь к документации отдельного [клиента](/developers/docs/nodes-and-clients/), чтобы узнать, как запустить HTTP JSON-RPC для клиентов, отличных от Geth. Большинство клиентов по умолчанию обслуживают на `localhost:8545`.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

Первое, что нужно сделать, это убедиться, что HTTP RPC интерфейс включен. Это означает, что мы предоставляем Geth флаг `--http` при запуске. В этом примере мы используем узел Geth в закрытой цепочке разработки. Используя этот подход, мы не нуждаемся в эфире, как в реальной сети.

```bash
geth --http --dev console 2>>geth.log
```

Это запустит интерфейс HTTP RPC на `http://localhost:8545`.

Мы можем убедиться, что интерфейс работает, получив адрес coinbase (получив первый адрес из массива аккаунтов) и баланс с помощью [curl](https://curl.se). Пожалуйста, обратите внимание, что данные в этих примерах будут отличаться на Вашем локальном узле. Если Вы хотите попробовать эти команды, замените параметры во втором curl запросе на результат, возвращенный из первого.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

Поскольку цифры закодированы в шестнадцатеричном формате, баланс будет возвращен в wei, как шестнадцатеричная строка. Если мы хотим иметь баланс в эфире, как число, мы можем использоватьWeb3 из консоли Geth.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

Теперь, когда на нашей приватной цепочке развития есть немного эфира, мы можем развернуть контракт. Первый шаг - компиляция контракта Multiply7 в байт-код, который может быть отправлен на EVM. Чтобы установить solc, компилятор Solidity, следуйте [документации Solidity](https://docs.soliditylang.org/en/latest/installing-solidity.html). (Возможно, вы захотите использовать более старый выпуск `solc`, чтобы соответствовать [версии компилятора, используемой в нашем примере](https://github.com/ethereum/solidity/releases/tag/v0.4.20).)

Следующий шаг — скомпилировать контракт Multiply7 в байт-код, который можно отправить в EVM.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

Теперь, когда мы имеем скомпилированный код, нам нужно определить, сколько газа стоит его развертывание. Интерфейс RPC имеет метод `eth_estimateGas`, который даст нам оценку.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

И, наконец, развернем контракт.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

Транзакция принимается узлом, и хэш транзакции возвращается. Этот хэш может быть использован для отслеживания транзакции. Следующий шаг - определение адреса, где наш контракт развернут. Каждая выполненная транзакция создаст квитанцию. Эта квитанция содержит различную информацию о транзакции, например, в какой блок транзакция была включена и сколько газа было использовано EVM. Если транзакция создает контракт, она также будет содержать адрес контракта. Мы можем получить квитанцию с помощью метода RPC `eth_getTransactionReceipt`.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

Наш контракт был создан по адресу `0x4d03d617d700cf81935d7f797f4e2ae719648262`. Результат null вместо квитанции означает, что транзакция еще не была включена в блок. Подождите немного, проверьте, запущен ли ваш клиент консенсуса, и повторите попытку.

#### Взаимодействие со смарт-контрактами {#interacting-with-smart-contract}

В этом примере мы отправим транзакцию с помощью `eth_sendTransaction` в метод `multiply` контракта.

`eth_sendTransaction` требует несколько аргументов, в частности `from`, `to` и `data`. `From` — это публичный адрес нашего аккаунта, а `to` — это адрес контракта. Аргумент `data` содержит полезную нагрузку, которая определяет, какой метод должен быть вызван и с какими аргументами. Именно здесь в игру вступает [ABI (двоичный интерфейс приложения)](https://docs.soliditylang.org/en/latest/abi-spec.html). ABI - это JSON файл, который устанавливает, как определять и кодировать данные для EVM.

Байты полезной нагрузки определяют, какой метод в контракте вызван. Это первые 4 байта из хэша Keccak от имени функции и ее типов аргументов, закодированные в шестнадцатеричной форме. Функция multiply принимает значение uint, которое является псевдонимом uint256. Это оставляет нам:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

Следующим шагом является кодирование аргументов. Существует только один uint256, скажем, значение 6. ABI имеет раздел, который определяет, как кодировать типы uint256.

`int<M>: enc(X)` — это кодирование X в прямом порядке байтов с дополнением до двух, дополненное со стороны старшего разряда (слева) значением 0xff для отрицательных X и нулевыми байтами для положительных X, так что длина становится кратной 32 байтам.

Это кодируется в `0000000000000000000000000000000000000000000000000000000000000006`.

Объединив селектор функции и закодированный аргумент, мы получим данные `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`.

Теперь это может быть отправлено на узел:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

Так как транзакция была отправлена, был возвращен хэш транзакции. Получение квитанции дает:

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

Квитанция содержит журнал регистрации. Этот журнал был сгенерирован EVM при выполнении транзакции и включен в квитанцию. Функция `multiply` показывает, что событие `Print` было вызвано с входным значением, умноженным на 7. Поскольку аргументом для события `Print` был uint256, мы можем декодировать его в соответствии с правилами ABI, что даст нам ожидаемое десятичное число 42. Помимо данных, стоит отметить, что темы могут быть использованы для определения того, какое событие создало журнал:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

Это было всего лишь краткое введение в некоторые наиболее распространенные задачи, демонстрирующее непосредственное использование JSON-RPC.

## Смежные темы {#related-topics}

- [Спецификация JSON-RPC](http://www.jsonrpc.org/specification)
- [Узлы и клиенты](/developers/docs/nodes-and-clients/)
- [API JavaScript](/developers/docs/apis/javascript/)
- [API для бэкенда](/developers/docs/apis/backend/)
- [Клиенты исполнения](/developers/docs/nodes-and-clients/#execution-clients)
