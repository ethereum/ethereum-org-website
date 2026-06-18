---
title: Библиотеки JavaScript API
description: Введение в клиентские библиотеки JavaScript, которые позволяют взаимодействовать с блокчейном из вашего приложения.
lang: ru
---

Чтобы веб-приложение могло взаимодействовать с блокчейном Эфириума (т. е. читать данные блокчейна и/или отправлять транзакции в сеть), оно должно подключиться к узлу Эфириума.

Для этой цели каждый клиент Эфириума реализует спецификацию [JSON-RPC](/developers/docs/apis/json-rpc/), поэтому существует единый набор [методов](/developers/docs/apis/json-rpc/#json-rpc-methods), на которые могут опираться приложения.

Если вы хотите использовать JavaScript для подключения к узлу Эфириума, можно использовать чистый JavaScript, но в экосистеме существует несколько удобных библиотек, которые значительно упрощают эту задачу. С помощью этих библиотек разработчики могут писать интуитивно понятные однострочные методы для инициализации запросов JSON-RPC (внутренне), которые взаимодействуют с Эфириумом.

Обратите внимание, что после [Слияния](/roadmap/merge/) для запуска узла требуются две связанные части программного обеспечения Эфириума — клиент исполнения и клиент консенсуса. Убедитесь, что ваш узел включает как клиент исполнения, так и клиент консенсуса. Если ваш узел находится не на локальном компьютере (например, ваш узел работает на экземпляре AWS), соответствующим образом обновите IP-адреса в руководстве. Для получения дополнительной информации посетите нашу страницу о [запуске узла](/developers/docs/nodes-and-clients/run-a-node/).

## Предварительные требования {#prerequisites}

Помимо понимания JavaScript, может быть полезно понимать [стек Эфириума](/developers/docs/ethereum-stack/) и [клиенты Эфириума](/developers/docs/nodes-and-clients/).

## Зачем использовать библиотеку? {#why-use-a-library}

Эти библиотеки скрывают большую часть сложности прямого взаимодействия с узлом Эфириума. Они также предоставляют служебные функции (например, преобразование ETH в Gwei), поэтому как разработчик вы можете тратить меньше времени на изучение тонкостей клиентов Эфириума и больше времени уделять уникальной функциональности вашего приложения.

## Особенности библиотек {#library-features}

### Подключение к узлам Эфириума {#connect-to-ethereum-nodes}

Используя провайдеров, эти библиотеки позволяют вам подключаться к Эфириуму и читать его данные, будь то через JSON-RPC, Infura, Etherscan, Alchemy или МетаМаск.

> **Предупреждение:** Web3.js был отправлен в архив 4 марта 2025 года. [Прочитайте объявление](https://blog.chainsafe.io/web3-js-sunset/). Рассмотрите возможность использования альтернативных библиотек, таких как [ethers.js](https://ethers.илиg) или [viem](https://viem.sh), для новых проектов.

**Пример Ethers**

```js
// BrowserProvider оборачивает стандартный провайдер Web3, который
// МетаМаск внедряет как window.ethereum на каждую страницу
const provider = new ethers.BrowserProvider(window.ethereum)

// Плагин МетаМаск также позволяет подписывать транзакции, чтобы
// отправлять эфир и платить за изменение состояния в Блокчейне.
// Для этого нам нужен подписант аккаунта...
const signer = provider.getSigner()
```

**Пример Web3js**

```js
var web3 = new Web3("http://localhost:8545")
// или
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// изменить провайдера
web3.setProvider("ws://localhost:8546")
// или
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// Использование IPC-провайдера в node.js
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // путь в mac os
// or
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // путь в mac os
// в windows путь: "\\\\.\\pipe\\geth.ipc"
// в linux путь: "/users/myuser/.ethereum/geth.ipc"
```

После настройки вы сможете запрашивать у блокчейна:

- номера блоков
- оценки Газа
- события смарт-контрактов
- идентификатор сети
- и многое другое...

### Функциональность кошелька {#wallet-functionality}

Эти библиотеки предоставляют вам функциональность для создания кошельков, управления ключами и подписания транзакций.

Пример из Ethers:

```js
// Создать экземпляр Кошелька из мнемонической фразы...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...или из приватного ключа
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// Адрес в виде Promise согласно API Signer
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// Адрес Кошелька также доступен синхронно
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// Внутренние криптографические компоненты
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// Мнемоническая фраза Кошелька
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// Примечание: Кошелек, созданный с помощью приватного ключа, не
//       имеет мнемонической фразы (деривация предотвращает это)
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
// Кошелька, подключенного к провайдеру
wallet = walletMnemonic.connect(provider)

// Запрос к сети
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// Отправка эфира
wallet.sendTransaction(tx)
```

[Прочитать полную документацию](https://docs.ethers.io/v5/api/signer/#Wallet)

После настройки вы сможете:

- создавать аккаунты
- отправлять транзакции
- подписывать транзакции
- и многое другое...

### Взаимодействие с функциями смарт-контрактов {#interact-with-smart-contract-functions}

Клиентские библиотеки JavaScript позволяют вашему приложению вызывать функции смарт-контрактов путем чтения двоичного интерфейса приложения (ABI) скомпилированного контракта.

ABI по сути описывает функции контракта в формате JSON и позволяет использовать его как обычный объект JavaScript.

Таким образом, следующий контракт на Solidity:

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

Это означает, что вы можете:

- Отправить транзакцию в смарт-контракт и выполнить его метод
- Вызвать оценку Газа, которая потребуется для выполнения метода в EVM
- Развернуть контракт
- И многое другое...

### Служебные функции {#utility-functions}

Служебные функции предоставляют удобные ярлыки, которые немного упрощают разработку на Эфириуме.

Значения ETH по умолчанию указываются в Wei. 1 ETH = 1 000 000 000 000 000 000 Wei — это означает, что вы имеете дело с огромными числами! `web3.utils.toWei` конвертирует эфир в Wei за вас.

А в Ethers это выглядит так:

```js
// Получить баланс аккаунта (по адресу или имени ENS)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// Часто вам нужно будет отформатировать вывод для пользователя,
// который предпочитает видеть значения в эфире (вместо Wei)
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Служебные функции Web3js](https://docs.web3js.org/api/web3-utils)
- [Служебные функции Ethers](https://docs.ethers.org/v6/api/utils/)

## Доступные библиотеки {#available-libraries}

**Web3.js —** **_JavaScript API для Эфириума._**

- [Документация](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js —** **_Полная реализация кошелька Эфириума и утилиты на JavaScript и TypeScript._**

- [Главная страница Ethers.js](https://ethers.org/)
- [Документация](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph —** **_Протокол для индексирования данных Эфириума и IPFS и их запроса с использованием GraphQL._**

- [The Graph](https://thegraph.com)
- [Обозреватель Graph](https://thegraph.com/explorer)
- [Документация](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Дискорд](https://thegraph.com/discord)

**Alchemy SDK —** **_Обертка вокруг Ethers.js с расширенными API._**

- [Документация](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**Viem —** **_Интерфейс TypeScript для Эфириума._**

- [Документация](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Codex —** **_API обогащенных данных блокчейна в реальном времени для десятков сетей._**

- [Документация](https://docs.codex.io)
- [Обозреватель](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Дискорд](https://discord.com/invite/mFpUhT3vAq)

**Drift —** **_Мета-библиотека TypeScript со встроенным кэшированием, хуками и тестовыми моками._**

- [Документация](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## Дополнительная литература {#further-reading}

_Знаете ресурс сообщества, который вам помог? Отредактируйте эту страницу и добавьте его!_

## Связанные темы {#related-topics}

- [Узлы и клиенты](/developers/docs/nodes-and-clients/)
- [Фреймворки для разработки](/developers/docs/frameworks/)

## Связанные руководства {#related-tutorials}

- [Настройка Web3js для использования блокчейна Эфириума в JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _— Инструкции по настройке Web3.js в вашем проекте._
- [Вызов смарт-контракта из JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _— На примере токена DAI узнайте, как вызывать функции контрактов с помощью JavaScript._
- [Отправка транзакций с использованием Web3 и Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _— Пошаговое руководство по отправке транзакций из бэкенда._

## Руководства: JavaScript API и WebSockets в Эфириуме {#tutorials}

- [Использование WebSockets](/developers/tutorials/using-websockets/) _— Как использовать WebSockets с Alchemy для подписки на события Эфириума и выполнения запросов JSON-RPC в реальном времени._