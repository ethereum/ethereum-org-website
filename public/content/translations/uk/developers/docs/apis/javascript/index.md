---
title: Бібліотеки JavaScript API
description: An introduction to the JavaScript client libraries that let you interact with the blockchain from your application.
lang: uk
---

Щоб вебдодаток міг взаємодіяти з блокчейном Ethereum (тобто зчитувати дані блокчейну та/або надсилати транзакції до мережі), він має під’єднатися до вузла Ethereum.

З цією метою кожен клієнт Ethereum реалізує специфікацію [JSON-RPC](/developers/docs/apis/json-rpc/), тому існує єдиний набір [методів](/developers/docs/apis/json-rpc/#json-rpc-methods), на які можуть покладатися додатки.

If you want to use JavaScript to connect with an Ethereum node, it's possible to use vanilla JavaScript but several convenience libraries exist within the ecosystem that make this much easier. За допомогою цих бібліотек розробники можуть писати інтуїтивно зрозумілі однорядкові методи для ініціалізації запитів JSON-RPC (під капотом), що взаємодіють з Ethereum.

Зауважте, що після [Злиття](/roadmap/merge/) для запуску вузла потрібні дві пов’язані частини програмного забезпечення Ethereum: клієнт виконання та клієнт консенсусу. Будь ласка, переконайтеся, що ваш вузол включає клієнт виконання та клієнт консенсусу. Якщо ваш вузол не на вашому локальному комп’ютері (наприклад, ваш вузол працює на екземплярі AWS), відповідно оновіть IP-адреси в посібнику. Щоб отримати докладнішу інформацію, перегляньте нашу сторінку про [запуск вузла](/developers/docs/nodes-and-clients/run-a-node/).

## Передумови {#prerequisites}

Окрім розуміння JavaScript, може бути корисно розібратися зі [стеком Ethereum](/developers/docs/ethereum-stack/) та [клієнтами Ethereum](/developers/docs/nodes-and-clients/).

## Why use a library? {#why-use-a-library}

These libraries abstract away much of the complexity of interacting directly with an Ethereum node. Вони також надають корисні функції (наприклад, перетворення ETH на Gwei), тому як розробник ви можете витрачати менше часу на тонкощі клієнтів Ethereum і більше часу зосереджуватися на унікальній функціональності вашого застосунку.

## Можливості бібліотеки {#library-features}

### Підключення до вузлів Ethereum {#connect-to-ethereum-nodes}

Using providers, these libraries allow you to connect to Ethereum and read its data, whether that's over JSON-RPC, INFURA, Etherscan, Alchemy or MetaMask.

> **Увага:** Web3.js було заархівовано 4 березня 2025 року. [Прочитати оголошення](https://blog.chainsafe.io/web3-js-sunset/). Для нових проєктів радимо використовувати альтернативні бібліотеки, як-от [ethers.js](https://ethers.org) або [viem](https://viem.sh).

**Ethers example**

```js
// BrowserProvider є оболонкою стандартного постачальника Web3, який
// MetaMask вставляє як window.ethereum на кожну сторінку
const provider = new ethers.BrowserProvider(window.ethereum)

// Плагін MetaMask також дозволяє підписувати транзакції
// для надсилання ether і оплати зміни стану в блокчейні.
// Для цього нам потрібен підписувач облікового запису...
const signer = provider.getSigner()
```

**Web3js example**

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

Once set up you'll be able to query the blockchain for:

- block numbers
- gas estimates
- smart contract events
- network id
- та багато іншого…

### Функціональність гаманця {#wallet-functionality}

These libraries give you functionality to create wallets, manage keys and sign transactions.

Here's an examples from Ethers

```js
// Створення екземпляра гаманця з мнемонічної фрази...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...або з приватного ключа
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// Адреса як Promise відповідно до Signer API
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

// Примітка: гаманець, створений за допомогою приватного ключа, не має
//       мнемонічної фрази (це неможливо через спосіб виведення)
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
// гаманця, підключеного до постачальника
wallet = walletMnemonic.connect(provider)

// Запит до мережі
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// Надсилання Ether
wallet.sendTransaction(tx)
```

[Читати повну документацію](https://docs.ethers.io/v5/api/signer/#Wallet)

Once set up you'll be able to:

- create accounts
- send transactions
- sign transactions
- та багато іншого…

### Взаємодія з функціями смарт-контрактів {#interact-with-smart-contract-functions}

Клієнтські бібліотеки JavaScript дозволяють вашій програмі викликати функції смарт-контракту, читаючи бінарний інтерфейс програми (ABI) скомпільованого контракту.

The ABI essentially explains the contract's functions in a JSON format and allows you to use it like a normal JavaScript object.

So the following Solidity contract:

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

Would result in the following JSON:

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

This means you can:

- Send a transaction to the smart contract and execute its method
- Call to estimate the gas a method execution will take when executed in the EVM
- Deploy a contract
- Та багато іншого…

### Корисні функції {#utility-functions}

Utility functions give you handy shortcuts that make building with Ethereum a little easier.

ETH values are in Wei by default. 1 ETH = 1,000,000,000,000,000,000 WEI – this means you're dealing with a lot of numbers! `web3.utils.toWei` конвертує Ether у Wei.

And in ethers it looks like this:

```js
// Get the balance of an account (by address or ENS name)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// Often you will need to format the output for the user
// which prefer to see values in ether (instead of wei)
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Корисні функції Web3.js](https://docs.web3js.org/api/web3-utils)
- [Корисні функції Ethers](https://docs.ethers.org/v6/api/utils/)

## Доступні бібліотеки {#available-libraries}

**Web3.js —** **_API JavaScript для Ethereum._**

- [Документація](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js —** **_повна реалізація гаманця Ethereum й утиліт на JavaScript і TypeScript._**

- [Головна сторінка Ethers.js](https://ethers.org/)
- [Документація](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph —** **_протокол для індексації даних Ethereum та IPFS і виконання запитів до них за допомогою GraphQL._**

- [The Graph](https://thegraph.com)
- [Оглядач Graph](https://thegraph.com/explorer)
- [Документація](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**Alchemy SDK —** **_обгортка для Ethers.js з розширеними API._**

- [Документація](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem —** **_інтерфейс TypeScript для Ethereum._**

- [Документація](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Drift —** **_метабібліотека TypeScript із вбудованим кешуванням, хуками та тестовими моками._**

- [Документація](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## Для подальшого читання {#further-reading}

_Знайшли ресурс, який допоміг з цією темою? Відредагуйте цю сторінку і додайте його!_

## Пов'язані теми {#related-topics}

- [Вузли та клієнти](/developers/docs/nodes-and-clients/)
- [Фреймворки для розробки](/developers/docs/frameworks/)

## Пов'язані посібники {#related-tutorials}

- [Налаштування Web3.js для використання блокчейну Ethereum у JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– інструкції з налаштування Web3.js у вашому проєкті._
- [Виклик смарт-контракту з JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– використання токена DAI, щоб побачити, як викликати функцію контракту за допомогою JavaScript._
- [Надсилання транзакцій за допомогою Web3 та Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _— покрокове керівництво з надсилання транзакцій із серверної частини._
