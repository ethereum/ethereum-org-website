---
title: "Налаштуйте web3.js для використання блокчейну Ethereum у JavaScript"
description: "Дізнайтеся, як налаштувати та сконфігурувати бібліотеку web3.js для взаємодії з блокчейном Ethereum із JavaScript-застосунків."
author: "jdourlens"
tags: [ "web3.js", "javaScript" ]
skill: beginner
lang: uk
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

У цьому посібнику ми розглянемо, як почати роботу з [web3.js](https://web3js.readthedocs.io/) для взаємодії з блокчейном Ethereum. Web3.js можна використовувати як у фронтенді, так і в бекенді, щоб читати дані з блокчейну, здійснювати транзакції та навіть розгортати смарт-контракти.

Перший крок — додати web3.js у ваш проєкт. Щоб використовувати його на вебсторінці, ви можете імпортувати бібліотеку безпосередньо за допомогою CDN, наприклад JSDeliver.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

Якщо ви віддаєте перевагу встановленню бібліотеки для використання у вашому бекенді або фронтенд-проєкті, який використовує збірку, ви можете встановити її за допомогою npm:

```bash
npm install web3 --save
```

Потім, щоб імпортувати Web3.js у скрипт Node.js або фронтенд-проєкт Browserify, ви можете використати наступний рядок JavaScript:

```js
const Web3 = require("web3")
```

Тепер, коли ми додали бібліотеку до проєкту, нам потрібно її ініціалізувати. Ваш проєкт повинен мати можливість взаємодіяти з блокчейном. Більшість бібліотек Ethereum взаємодіють з [вузлом](/developers/docs/nodes-and-clients/) через RPC-виклики. Щоб ініціювати нашого провайдера Web3, ми створимо екземпляр Web3, передавши URL-адресу провайдера як конструктор. Якщо у вас на комп’ютері запущено вузол або [екземпляр ganache](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/), це матиме такий вигляд:

```js
const web3 = new Web3("http://localhost:8545")
```

Якщо ви бажаєте отримати прямий доступ до розміщеного вузла, ви можете знайти варіанти на сторінці [«Вузли як послуга»](/developers/docs/nodes-and-clients/nodes-as-a-service).

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

Щоб перевірити, чи правильно ми налаштували наш екземпляр Web3, ми спробуємо отримати номер останнього блоку за допомогою функції `getBlockNumber`. Ця функція приймає функцію зворотного виклику як параметр і повертає номер блоку як ціле число.

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

Якщо ви виконаєте цю програму, вона просто виведе номер останнього блоку: верхівку блокчейну. Ви також можете використовувати виклики функцій `async/await`, щоб уникнути вкладеності функцій зворотного виклику у вашому коді:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

Ви можете переглянути всі функції, доступні в екземплярі Web3, в [офіційній документації web3.js](https://docs.web3js.org/).

Більшість бібліотек Web3 є асинхронними, тому що у фоновому режимі бібліотека робить JSON-RPC-виклики до вузла, який надсилає результат у відповідь.

<Divider />

Якщо ви працюєте в браузері, деякі гаманці безпосередньо впроваджують екземпляр Web3, і вам слід намагатися використовувати його за будь-якої можливості, особливо якщо ви плануєте взаємодіяти з Ethereum-адресою користувача для здійснення транзакцій.

Ось фрагмент коду для виявлення доступності гаманця MetaMask і спроби його ввімкнення. Пізніше це дозволить вам зчитувати баланс користувача та дасть йому змогу підтверджувати транзакції, які ви хочете, щоб він виконав у блокчейні Ethereum:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // Запит на доступ до облікового запису, якщо потрібно
    await window.ethereum.enable()
    // Тепер облікові записи доступні
  } catch (error) {
    // Користувач відхилив доступ до облікового запису...
  }
}
```

Існують також альтернативи web3.js, які теж часто використовуються, наприклад [Ethers.js](https://docs.ethers.io/). У наступному посібнику ми розглянемо, [як легко відстежувати нові вхідні блоки в блокчейні та переглядати їхній вміст](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/).
