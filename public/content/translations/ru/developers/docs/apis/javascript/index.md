---
title: "Библиотеки JavaScript API"
description: "Введение в клиентские библиотеки JavaScript, позволяющие взаимодействовать с блокчейном из Вашего приложения."
lang: ru
---

Чтобы веб-приложение могло взаимодействовать с блокчейном Ethereum (т. е. читать данные блокчейна и/или отправлять транзакции в сеть), оно должно подключиться к узлу Ethereum.

Для этой цели каждый клиент Ethereum реализует спецификацию [JSON-RPC](/developers/docs/apis/json-rpc/), так что существует единый набор [методов](/developers/docs/apis/json-rpc/#json-rpc-methods), на которые могут полагаться приложения.

Если вы используете JavaScript для того чтобы подключиться к узлу Ethereum, можно воспользоваться vanilla JavaScript, но существует также несколько удобных библиотек внутри экосистемы которые упрощают эту задачу. С помощью этих библиотек разработчики могут писать интуитивные, однострочные методы для инициализации запросов JSON-RPC (под капотом), которые взаимодействуют с Ethereum.

Обратите внимание, что после [Слияния](/roadmap/merge/) для запуска узла требуются две связанные части программного обеспечения Ethereum — клиент исполнения и клиент консенсуса. Убедитесь, что у вашего узла есть как клиент исполнения, так и клиент консенсуса. Если ваш узел находится не на локальном компьютере (например, работает на инстансе AWS), соответственно обновите IP-адреса в руководстве. Для получения дополнительной информации см. нашу страницу о [запуске узла](/developers/docs/nodes-and-clients/run-a-node/).

## Предварительные условия {#prerequisites}

Помимо понимания JavaScript, может быть полезно разобраться в [стеке Ethereum](/developers/docs/ethereum-stack/) и [клиентах Ethereum](/developers/docs/nodes-and-clients/).

## Зачем использовать библиотеки? {#why-use-a-library}

Использование библиотеки помогает абстрагироваться от сложности при общении с узлом Ethereum напрямую. Они также предоставляют полезные функции (например, конвертирование ETH в Gwei), позволяя вам, как разработчику, тратить меньше времени на тонкости работы с клиентами Ethereum, и сосредоточиться на уникальных функциях своего приложения.

## Функции библиотеки {#library-features}

### Подключение к узлам Ethereum {#connect-to-ethereum-nodes}

Используя провайдеров, эти библиотеки позволяют вам подключаться к Ethereum и считывать его данные, будь то через JSON-RPC, INFURA, Etherscan, Alchemy или MetaMask.

> **Предупреждение:** Web3.js был заархивирован 4 марта 2025 г. [Прочтите объявление](https://blog.chainsafe.io/web3-js-sunset/). Для новых проектов рассмотрите возможность использования альтернативных библиотек, таких как [ethers.js](https://ethers.org) или [viem](https://viem.sh).

**Пример эфиров**

```js
// BrowserProvider является оболочкой для стандартного провайдера Web3, который
// MetaMask внедряет в каждую страницу как window.ethereum
const provider = new ethers.BrowserProvider(window.ethereum)

// Плагин MetaMask также позволяет подписывать транзакции для
// отправки эфира и оплаты для изменения состояния в блокчейне.
// Для этого нам нужен подписант аккаунта...
const signer = provider.getSigner()
```

**Web3js примеры**

```js
var web3 = new Web3("http://localhost:8545")
// or
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// change provider
web3.setProvider("ws://localhost:8546")
// or
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// Using the IPC provider in node.js
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // mac os path
// or
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // mac os path
// on windows the path is: "\\\\.\\pipe\\geth.ipc"
// on linux the path is: "/users/myuser/.ethereum/geth.ipc"
```

После настройки вы сможете запросить блокчейн для:

- номер блока
- прогноз газа
- события смарт-контракта
- идентификатор сети
- и многое другое...

### Функциональность кошелька {#wallet-functionality}

Эти библиотеки позволяют создавать кошельки, управлять ключами и подписывать транзакции.

Вот примеры с эфиров

```js
// Создание экземпляра кошелька из мнемонической фразы...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...или из приватного ключа
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// Адрес в виде Promise согласно API подписывающей стороны (Signer)
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// Адрес кошелька также доступен синхронно
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// Внутренние криптографические компоненты
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// Мнемоника кошелька
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// Примечание: кошелек, созданный с помощью приватного ключа, не
//       имеет мнемоники (это предотвращается выводом)
walletPrivateKey.mnemonic
// null

// Подписание сообщения
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// Подписание транзакции
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// Метод connect возвращает новый экземпляр
// кошелька, подключенного к провайдеру
wallet = walletMnemonic.connect(provider)

// Запрос к сети
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// Отправка эфира
wallet.sendTransaction(tx)
```

[Прочесть полную документацию](https://docs.ethers.io/v5/api/signer/#Wallet)

После настройки вы сможете:

- создать аккаунт
- отправить Транзакцию
- подписать транзакцию
- и многое другое...

### Взаимодействие с функциями смарт-контрактов {#interact-with-smart-contract-functions}

Клиентские библиотеки JavaScript позволяют Вашему приложению вызывать функции смарт-контрактов, считывая двоичный интерфейс приложения (ABI) скомпилированного контракта.

ABI, по сути, объясняет функции контракта в формате JSON и позволяет использовать его как обычный объект JavaScript.

Таким образом, выглядит Solidity контракт:

```solidity
contract Test {
    uint a;
    address d = 0x12345678901234567890123456789012;

    constructor(uint testInt)  { a = testInt;}

    event Event(uint indexed b, bytes32 c);

    event Event2(uint indexed b, bytes32 c);

    function foo(uint b, bytes32 c) returns(address) {
        Event(b, c);
        return d;
    }
}
```

Приведет к следующему JSON:

```json
[{
    "type":"constructor",
    "payable":false,
    "stateMutability":"nonpayable"
    "inputs":[{"name":"testInt","type":"uint256"}],
  },{
    "type":"function",
    "name":"foo",
    "constant":false,
    "payable":false,
    "stateMutability":"nonpayable",
    "inputs":[{"name":"b","type":"uint256"}, {"name":"c","type":"bytes32"}],
    "outputs":[{"name":"","type":"address"}]
  },{
    "type":"event",
    "name":"Event",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"}, {"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
  },{
    "type":"event",
    "name":"Event2",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"},{"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
}]
```

Вы сможете:

- Отправить транзакцию к умному контракту и выполнить его метод
- Сделать вызов для оценки газа, который будет выполняться при запуске в EVM
- Развернуть контракт
- И другое...

### Вспомогательные функции {#utility-functions}

Утилитные функции дают вам удобные shortcuts, которые делают строительство с Ethereum немного проще.

Значения ETH находятся в Wei по умолчанию. 1 ETH = 1,000,000,000,000,000,000 WEI – это означает, что вы имеете дело с большим количеством чисел! `web3.utils.toWei` конвертирует для вас эфир в Wei.

И в эфире он выглядит так:

```js
// Get the balance of an account (by address or ENS name)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// Often you will need to format the output for the user
// which prefer to see values in ether (instead of wei)
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Вспомогательные функции Web3js](https://docs.web3js.org/api/web3-utils)
- [Вспомогательные функции Ethers](https://docs.ethers.org/v6/api/utils/)

## Доступные библиотеки {#available-libraries}

**Web3.js -** **_API Ethereum для JavaScript._**

- [Документация](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_Полная реализация кошелька Ethereum и утилиты на JavaScript и TypeScript._**

- [Домашняя страница Ethers.js](https://ethers.org/)
- [Документация](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph -** **_Протокол для индексирования данных Ethereum и IPFS и их запроса с помощью GraphQL._**

- [The Graph](https://thegraph.com)
- [Обозреватель Graph](https://thegraph.com/explorer)
- [Документация](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**Alchemy SDK -** **_Оболочка для Ethers.js с расширенными API._**

- [Документация](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem -** **_Интерфейс TypeScript для Ethereum._**

- [Документация](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Drift -** **_Метабиблиотека TypeScript со встроенным кешированием, хуками и тестовыми заглушками._**

- [Документация](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## Дополнительные материалы {#further-reading}

_Знаете ресурс сообщества, который вам пригодился? Измените эту страницу и добавьте его!_

## Смежные темы {#related-topics}

- [Узлы и клиенты](/developers/docs/nodes-and-clients/)
- [Фреймворки для разработки](/developers/docs/frameworks/)

## Связанные руководства {#related-tutorials}

- [Настройка Web3js для использования блокчейна Ethereum в JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _— инструкции по настройке Web3js в вашем проекте._
- [Вызов умного контракта из JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _— на примере токена DAI вы увидите, как вызывать функции контрактов с помощью JavaScript._
- [Отправка транзакций с помощью web3 и Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– пошаговое руководство по отправке транзакций с бэкенда._
