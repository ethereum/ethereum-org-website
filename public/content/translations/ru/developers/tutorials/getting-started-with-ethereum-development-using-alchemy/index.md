---
title: "Начало разработки Ethereum"
description: "Это руководство для начинающих по разработке на Ethereum. Мы проведем вас от развертывания конечной точки API и выполнения запроса в командной строке до написания вашего первого скрипта web3! Опыт разработки на блокчейне не требуется!"
author: "Elan Halpern"
tags:
  [
    "JavaScript",
    "ethers.js",
    "узлы",
    "запросы",
    "Alchemy"
  ]
skill: beginner
breadcrumb: "Начало работы"
lang: ru
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Логотипы Ethereum и Alchemy](./ethereum-alchemy.png)

Это руководство для начинающих по разработке на Ethereum. В этом руководстве мы будем использовать [Alchemy](https://alchemyapi.io/), ведущую платформу для разработчиков блокчейна, которая обслуживает миллионы пользователей из 70 % лучших блокчейн-приложений, включая Maker, 0x, MyEtherWallet, Dharma и Kyber. Alchemy предоставит нам доступ к конечной точке API в сети Ethereum, чтобы мы могли читать и записывать транзакции.

Мы проведем вас от регистрации в Alchemy до написания вашего первого скрипта web3! Опыт разработки на блокчейне не требуется!

## 1. Зарегистрируйте бесплатный аккаунт Alchemy {#sign-up-for-a-free-alchemy-account}

Создать аккаунт в Alchemy легко, [зарегистрируйтесь бесплатно здесь](https://auth.alchemy.com/).

## 2. Создайте приложение Alchemy {#create-an-alchemy-app}

Чтобы взаимодействовать с сетью Ethereum и использовать продукты Alchemy, вам понадобится ключ API для аутентификации ваших запросов.

Вы можете [создать ключи API на панели управления](https://dashboard.alchemy.com/). Чтобы создать новый ключ, перейдите в раздел «Create App» (Создать приложение), как показано ниже:

Отдельная благодарность [_ShapeShift_](https://shapeshift.com/) _за то, что позволили нам показать их панель управления!_

![Панель управления Alchemy](./alchemy-dashboard.png)

Заполните данные в разделе «Create App» (Создать приложение), чтобы получить новый ключ. Здесь вы также можете увидеть приложения, которые вы создали ранее, и те, которые создала ваша команда. Получите существующие ключи, нажав «View Key» (Просмотреть ключ) для любого приложения.

![Снимок экрана создания приложения в Alchemy](./create-app.png)

Вы также можете получить существующие ключи API, наведя курсор на «Apps» (Приложения) и выбрав одно из них. Здесь вы можете выбрать «View Key» (Просмотреть ключ), а также «Edit App» (Редактировать приложение), чтобы внести определенные домены в белый список, просмотреть несколько инструментов для разработчиков и аналитику.

![Gif-анимация, показывающая, как пользователь может получить ключи API](./pull-api-keys.gif)

## 3. Сделайте запрос из командной строки {#make-a-request-from-the-command-line}

Взаимодействуйте с блокчейном Ethereum через Alchemy, используя JSON-RPC и curl.

Для запросов вручную мы рекомендуем взаимодействовать с `JSON-RPC` через `POST`-запросы. Просто передайте заголовок `Content-Type: application/json` и ваш запрос в качестве тела `POST`-запроса со следующими полями:

- `jsonrpc`: версия JSON-RPC — в настоящее время поддерживается только `2.0`.
- `method`: метод ETH API. [См. справочник по API.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: список параметров для передачи в метод.
- `id`: идентификатор вашего запроса. Он будет возвращен в ответе, чтобы вы могли отслеживать, к какому запросу относится ответ.

Вот пример, который можно запустить из командной строки, чтобы получить текущую цену на газ:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**ПРИМЕЧАНИЕ.** Замените [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) на свой собственный ключ API `https://eth-mainnet.alchemyapi.io/v2/**your-api-key`._

**Результаты:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. Настройте свой клиент Web3 {#set-up-your-web3-client}

**Если у вас уже есть клиент,** измените URL-адрес текущего провайдера узла на URL-адрес Alchemy с вашим ключом API: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_ПРИМЕЧАНИЕ:_** Приведенные ниже скрипты необходимо запускать в **контексте node** или **сохранять в файл**, а не запускать из командной строки. Если у вас еще не установлены Node или npm, ознакомьтесь с этим кратким [руководством по настройке для Mac](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs).

Существует множество [библиотек Web3](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries), которые можно интегрировать с Alchemy, однако мы рекомендуем использовать [Alchemy Web3](https://docs.alchemy.com/reference/api-overview), прямую замену web3.js, созданную и настроенную для бесперебойной работы с Alchemy. Это дает множество преимуществ, таких как автоматические повторные попытки и надежная поддержка WebSocket.

Чтобы установить AlchemyWeb3.js, **перейдите в каталог вашего проекта** и выполните:

**С помощью Yarn:**

```
yarn add @alch/alchemy-web3
```

**С помощью NPM:**

```
npm install @alch/alchemy-web3
```

Чтобы взаимодействовать с инфраструктурой узлов Alchemy, запустите в NodeJS или добавьте это в файл JavaScript:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. Напишите свой первый скрипт Web3! {#write-your-first-web3-script}

Теперь, чтобы немного попрактиковаться в программировании на web3, мы напишем простой скрипт, который выводит номер последнего блока из основной сети Ethereum.

**1. Если вы еще этого не сделали, создайте в своем терминале новый каталог проекта и перейдите в него с помощью cd:**

```
mkdir web3-example
cd web3-example
```

**2. Установите зависимость Alchemy web3 (или любую другую web3) в свой проект, если вы еще этого не сделали:**

```
npm install @alch/alchemy-web3
```

**3. Создайте файл с именем `index.js` и добавьте в него следующее содержимое:**

> В конечном итоге вы должны заменить `demo` своим ключом HTTP API от Alchemy.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("Последний номер блока: " + blockNumber)
}
main()
```

Не знакомы с асинхронностью? Ознакомьтесь с этой [статьей на Medium](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c).

**4.** Запустите его в терминале с помощью node\*\*

```
node index.js
```

**5.** Теперь вы должны увидеть вывод последнего номера блока в вашей консоли!\*\*

```
Последний номер блока: 11043912
```

**Ура! Поздравляем! Вы только что написали свой первый скрипт web3 с помощью Alchemy 🎉**

Не знаете, что делать дальше? Попробуйте развернуть свой первый смарт-контракт и попрактиковаться в программировании на Solidity с помощью нашего [руководства по созданию смарт-контракта Hello World](https://www.alchemy.com/docs/hello-world-smart-contract) или проверьте свои знания о панели управления с помощью [демо-приложения Dashboard](https://docs.alchemyapi.io/tutorials/demo-app)!

_[Зарегистрируйтесь в Alchemy бесплатно](https://auth.alchemy.com/), ознакомьтесь с нашей [документацией](https://www.alchemy.com/docs/), а чтобы быть в курсе последних новостей, подписывайтесь на нас в [Twitter](https://twitter.com/AlchemyPlatform)_.
