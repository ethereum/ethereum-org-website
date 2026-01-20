---
title: Настройка web3.js для использования блокчейна Ethereum в JavaScript
description: Узнайте, как настраивать и конфигурировать библиотеку web3.js для взаимодействия с блокчейном Ethereum из JavaScript-приложений.
author: "jdourlens"
tags: [ "web3.js", "javascript" ]
skill: beginner
lang: ru
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

В этом руководстве мы рассмотрим, как начать работу с [web3.js](https://web3js.readthedocs.io/), чтобы взаимодействовать с блокчейном Ethereum. Web3.js можно использовать как во фронтенде, так и в бэкенде, чтобы считывать данные из блокчейна, совершать транзакции и даже развертывать смарт-контракты.

Первый шаг — это включить web3.js в ваш проект. Чтобы использовать его на веб-странице, вы можете импортировать библиотеку напрямую, используя CDN, например JSDeliver.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

Если вы предпочитаете установить библиотеку для использования в бэкенде или в проекте с фронтендом, использующим сборку, вы можете установить ее с помощью npm:

```bash
npm install web3 --save
```

Затем, чтобы импортировать Web3.js в скрипт Node.js или фронтенд-проект Browserify, вы можете использовать следующую строку JavaScript:

```js
const Web3 = require("web3")
```

Теперь, когда мы включили библиотеку в проект, нам нужно ее инициализировать. Ваш проект должен иметь возможность взаимодействовать с блокчейном. Большинство библиотек Ethereum взаимодействуют с [узлом](/developers/docs/nodes-and-clients/) через вызовы RPC. Чтобы инициализировать нашего провайдера Web3, мы создадим экземпляр Web3, передав в конструктор URL-адрес провайдера. Если у вас есть узел или [экземпляр ganache, запущенный на вашем компьютере](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/), это будет выглядеть так:

```js
const web3 = new Web3("http://localhost:8545")
```

Если вы хотите получить прямой доступ к размещенному узлу, вы можете найти варианты на странице [«Узлы как услуга»](/developers/docs/nodes-and-clients/nodes-as-a-service).

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

Чтобы проверить, правильно ли мы настроили наш экземпляр Web3, мы попытаемся получить номер последнего блока с помощью функции `getBlockNumber`. Эта функция принимает в качестве параметра обратный вызов и возвращает номер блока в виде целого числа.

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

Если вы выполните эту программу, она просто выведет номер последнего блока: вершину блокчейна. Вы также можете использовать вызовы функций `await/async`, чтобы избежать вложенных обратных вызовов в вашем коде:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

Вы можете увидеть все функции, доступные в экземпляре Web3, в [официальной документации web3.js](https://docs.web3js.org/).

Большинство библиотек Web3 асинхронны, потому что в фоновом режиме библиотека выполняет вызовы JSON-RPC к узлу, который отправляет обратно результат.

<Divider />

Если вы работаете в браузере, некоторые кошельки напрямую внедряют экземпляр Web3, и вам следует пытаться использовать его по возможности, особенно если вы планируете взаимодействовать с адресом Ethereum пользователя для совершения транзакций.

Вот фрагмент кода для обнаружения доступности кошелька MetaMask и попытки его включения. Это позволит вам в дальнейшем считывать баланс пользователя и дать ему возможность подтверждать транзакции, которые вы хотите, чтобы он совершал в блокчейне Ethereum:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // При необходимости запросить доступ к аккаунту
    await window.ethereum.enable()
    // Аккаунты теперь доступны
  } catch (error) {
    // Пользователь отказал в доступе к аккаунту...
  }
}
```

Существуют и широко используются альтернативы web3.js, такие как [Ethers.js](https://docs.ethers.io/). В следующем руководстве мы рассмотрим, [как легко отслеживать поступление новых блоков в блокчейне и видеть их содержимое](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/).
