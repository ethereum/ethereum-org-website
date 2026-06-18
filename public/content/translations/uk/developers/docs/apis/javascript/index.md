---
title: Бібліотеки JavaScript API
description: Вступ до клієнтських бібліотек JavaScript, які дозволяють взаємодіяти з блокчейном із вашого застосунку.
lang: uk
---

Щоб вебзастосунок міг взаємодіяти з блокчейном Етеріум (тобто читати дані блокчейну та/або надсилати транзакції в мережу), він має підключитися до вузла Етеріум.

Для цього кожен клієнт Етеріум реалізує специфікацію [JSON-RPC](/developers/docs/apis/json-rpc/), тому існує єдиний набір [методів](/developers/docs/apis/json-rpc/#json-rpc-methods), на які можуть покладатися застосунки.

Якщо ви хочете використовувати JavaScript для підключення до вузла Етеріум, можна використовувати чистий JavaScript, але в екосистемі існує кілька зручних бібліотек, які значно спрощують цей процес. За допомогою цих бібліотек розробники можуть писати інтуїтивно зрозумілі однорядкові методи для ініціалізації запитів JSON-RPC (внутрішньо), які взаємодіють з Етеріум.

Зверніть увагу, що після [Злиття](/roadmap/merge/) для запуску вузла потрібні дві пов'язані частини програмного забезпечення Етеріум — клієнт виконання та клієнт консенсусу. Переконайтеся, що ваш вузол містить як клієнт виконання, так і клієнт консенсусу. Якщо ваш вузол знаходиться не на локальній машині (наприклад, ваш вузол працює на екземплярі AWS), відповідно оновіть IP-адреси в посібнику. Для отримання додаткової інформації перегляньте нашу сторінку про [запуск вузла](/developers/docs/nodes-and-clients/run-a-node/).

## Передумови {#prerequisites}

Окрім розуміння JavaScript, може бути корисним розуміння [стека Етеріум](/developers/docs/ethereum-stack/) та [клієнтів Етеріум](/developers/docs/nodes-and-clients/).

## Навіщо використовувати бібліотеку? {#why-use-a-library}

Ці бібліотеки абстрагують значну частину складності прямої взаємодії з вузлом Етеріум. Вони також надають допоміжні функції (наприклад, конвертацію ETH у Gwei), щоб ви як розробник могли витрачати менше часу на розв'язання тонкощів клієнтів Етеріум і більше часу зосереджуватися на унікальній функціональності вашого застосунку.

## Можливості бібліотек {#library-features}

### Підключення до вузлів Етеріум {#connect-to-ethereum-nodes}

Використовуючи провайдерів, ці бібліотеки дозволяють підключатися до Етеріум і читати його дані, незалежно від того, чи це відбувається через JSON-RPC, Infura, Etherscan, Alchemy або МетаМаск.

> **Попередження:** Web3.js було архівовано 4 березня 2025 року. [Прочитайте анонс](https://blog.chainsafe.io/web3-js-sunset/). Розгляньте можливість використання альтернативних бібліотек, таких як [Ethers.js](https://ethers.абоg) або [Viem](https://viem.sh), для нових проєктів.

**Приклад Ethers**

```js
// BrowserProvider обгортає стандартний провайдер Web3, який
// те, що МетаМаск впроваджує як window.ethereum на кожну сторінку
const provider = new ethers.BrowserProvider(window.ethereum)

// Плагін МетаМаск також дозволяє підписувати транзакції, щоб
// відправляти етер та платити за зміну стану в блокчейні.
// Для цього нам потрібен підписант облікового запису...
const signer = provider.getSigner()
```

**Приклад Web3.js**

```js
var web3 = new Web3("http://localhost:8545")
// або
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// змінити провайдера
web3.setProvider("ws://localhost:8546")
// або
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// Використання IPC-провайдера в node.js
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // шлях у mac os
// or
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // шлях у mac os
// у windows шлях такий: "\\\\.\\pipe\\geth.ipc"
// у linux шлях такий: "/users/myuser/.ethereum/geth.ipc"
```

Після налаштування ви зможете запитувати в блокчейні:

- номери блоків
- оцінки газу
- події смарт-контрактів
- ідентифікатор мережі
- та багато іншого...

### Функціональність гаманця {#wallet-functionality}

Ці бібліотеки надають вам функціональність для створення гаманців, керування ключами та підписання транзакцій.

Ось приклад з Ethers

```js
// Створення екземпляра гаманця з мнемонічної фрази...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...або з приватного ключа
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// Адреса як Promise згідно з API підписанта
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// Адреса гаманця також доступна синхронно
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// Внутрішні криптографічні компоненти
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// Мнемонічна фраза гаманця
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// Примітка: гаманець, створений за допомогою приватного ключа, не
//       має мнемонічної фрази (деривація запобігає цьому)
walletPrivateKey.mnemonic
// null

// Підписання повідомлення
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// Підписання транзакції
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// Метод connect повертає новий екземпляр
// гаманця, підключеного до провайдера
wallet = walletMnemonic.connect(provider)

// Запит до мережі
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// Відправлення етеру
wallet.sendTransaction(tx)
```

[Прочитати повну документацію](https://docs.ethers.io/v5/api/signer/#Wallet)

Після налаштування ви зможете:

- створювати акаунти
- надсилати транзакції
- підписувати транзакції
- та багато іншого...

### Взаємодія з функціями смарт-контрактів {#interact-with-smart-contract-functions}

Клієнтські бібліотеки JavaScript дозволяють вашому застосунку викликати функції смарт-контрактів, зчитуючи двійковий інтерфейс застосунку (ABI) скомпільованого контракту.

ABI по суті пояснює функції контракту у форматі JSON і дозволяє використовувати його як звичайний об'єкт JavaScript.

Отже, наступний контракт Solidity:

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

Призведе до такого JSON:

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

Це означає, що ви можете:

- Надіслати транзакцію до смарт-контракту та виконати його метод
- Викликати оцінку газу, яку займе виконання методу під час виконання в EVM
- Розгорнути контракт
- Та багато іншого...

### Допоміжні функції {#utility-functions}

Допоміжні функції надають зручні скорочення, які роблять розробку з Етеріум трохи простішою.

Значення ETH за замовчуванням вказуються у Wei. 1 ETH = 1 000 000 000 000 000 000 Wei — це означає, що ви маєте справу з великою кількістю цифр! `web3.utils.toWei` конвертує етер у Wei для вас.

А в Ethers це виглядає так:

```js
// Отримання балансу облікового запису (за адресою або іменем ENS)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// Часто вам потрібно буде відформатувати вивід для користувача,
// який віддає перевагу бачити значення в етерах (замість Wei)
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Допоміжні функції Web3.js](https://docs.web3js.org/api/web3-utils)
- [Допоміжні функції Ethers](https://docs.ethers.org/v6/api/utils/)

## Доступні бібліотеки {#available-libraries}

**Web3.js —** **_JavaScript API для Етеріум._**

- [Документація](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js —** **_Повна реалізація гаманця Етеріум та утиліти на JavaScript і TypeScript._**

- [Головна сторінка Ethers.js](https://ethers.org/)
- [Документація](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph —** **_Протокол для індексування даних Етеріум та IPFS і виконання запитів до них за допомогою GraphQL._**

- [The Graph](https://thegraph.com)
- [Graph Explorer](https://thegraph.com/explorer)
- [Документація](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**Alchemy SDK —** **_Обгортка навколо Ethers.js із розширеними API._**

- [Документація](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**Viem —** **_Інтерфейс TypeScript для Етеріум._**

- [Документація](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Codex —** **_API збагачених даних блокчейну в реальному часі для десятків мереж._**

- [Документація](https://docs.codex.io)
- [Провідник](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Discord](https://discord.com/invite/mFpUhT3vAq)

**Drift —** **_Метабібліотека TypeScript із вбудованим кешуванням, хуками та тестовими моками._**

- [Документація](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## Додаткові матеріали {#further-reading}

_Знаєте ресурс спільноти, який вам допоміг? Відредагуйте цю сторінку та додайте його!_

## Пов'язані теми {#related-topics}

- [Вузли та клієнти](/developers/docs/nodes-and-clients/)
- [Фреймворки для розробки](/developers/docs/frameworks/)

## Пов'язані посібники {#related-tutorials}

- [Налаштування Web3.js для використання блокчейну Етеріум у JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _— Інструкції з налаштування Web3.js у вашому проєкті._
- [Виклик смарт-контракту з JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _— На прикладі токена DAI дізнайтеся, як викликати функції контрактів за допомогою JavaScript._
- [Надсилання транзакцій за допомогою Web3 та Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _— Покроковий посібник із надсилання транзакцій із бекенду._

## Посібники: JavaScript API та WebSockets в Етеріум {#tutorials}

- [Використання WebSockets](/developers/tutorials/using-websockets/) _— Як використовувати WebSockets з Alchemy для підписки на події Етеріум і виконання запитів JSON-RPC у реальному часі._