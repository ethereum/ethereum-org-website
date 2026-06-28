---
title: "Введение в разработку на Эфириуме"
description: "Это руководство для начинающих по разработке на Эфириуме. Мы пройдем путь от запуска конечной точки API и выполнения запроса из командной строки до написания вашего первого скрипта Web3! Опыт разработки на блокчейне не требуется!"
author: "Элан Халперн"
tags: ["JavaScript", "ethers.js", "узлы", "запросы", "Alchemy"]
skill: beginner
breadcrumb: "С чего начать"
lang: ru
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Ethereum and Alchemy logos](./ethereum-alchemy.png)

Это руководство для начинающих по разработке на Эфириуме. В этом руководстве мы будем использовать [Alchemy](https://alchemyapi.io/) — ведущую платформу для блокчейн-разработчиков, которая обслуживает миллионы пользователей из 70% лучших блокчейн-приложений, включая Maker, 0x, MyEtherWallet, Dharma и Kyber. Alchemy предоставит нам доступ к конечной точке API в цепи Эфириума, чтобы мы могли читать и записывать транзакции.

Мы пройдем путь от регистрации в Alchemy до написания вашего первого скрипта Web3! Опыт разработки на блокчейне не требуется!

## 1. Зарегистрируйте бесплатный аккаунт Alchemy {#sign-up-for-a-free-alchemy-account}

Создать аккаунт в Alchemy очень просто, [зарегистрируйтесь бесплатно здесь](https://auth.alchemy.com/).

## 2. Создайте приложение Alchemy {#create-an-alchemy-app}

Для взаимодействия с цепью Эфириума и использования продуктов Alchemy вам понадобится ключ API для аутентификации ваших запросов.

Вы можете [создать ключи API на панели управления](https://dashboard.alchemy.com/). Чтобы создать новый ключ, перейдите в раздел «Create App» (Создать приложение), как показано ниже:

Особая благодарность [_ShapeShift_](https://shapeshift.com/) _за то, что позволили нам показать их панель управления!_

![Alchemy dashboard](./alchemy-dashboard.png)

Заполните данные в разделе «Create App», чтобы получить новый ключ. Здесь вы также можете увидеть приложения, созданные вами ранее, и те, что создала ваша команда. Получите существующие ключи, нажав «View Key» (Посмотреть ключ) для любого приложения.

![Create app with Alchemy screenshot](./create-app.png)

Вы также можете получить существующие ключи API, наведя курсор на «Apps» (Приложения) и выбрав одно из них. Здесь вы можете нажать «View Key», а также «Edit App» (Редактировать приложение), чтобы добавить определенные домены в белый список, ознакомиться с инструментами разработчика и просмотреть аналитику.

![Gif showing a user how to pull API keys](./pull-api-keys.gif)

## 3. Выполните запрос из командной строки {#make-a-request-from-the-command-line}

Взаимодействуйте с блокчейном Эфириума через Alchemy, используя JSON-RPC и curl.

Для ручных запросов мы рекомендуем взаимодействовать с `JSON-RPC` через запросы `POST`. Просто передайте заголовок `Content-Type: application/json` и ваш запрос в теле `POST` со следующими полями:

- `jsonrpc`: версия JSON-RPC — в настоящее время поддерживается только `2.0`.
- `method`: метод API ETH. [См. справочник по API.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: список параметров для передачи в метод.
- `id`: ID вашего запроса. Будет возвращен в ответе, чтобы вы могли отслеживать, к какому запросу относится ответ.

Вот пример, который вы можете запустить из командной строки, чтобы получить текущую цену газа:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**ПРИМЕЧАНИЕ:** Замените [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) на ваш собственный ключ API `https://eth-mainnet.alchemyapi.io/v2/**your-api-key`._

**Результаты:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. Настройте ваш клиент Web3 {#set-up-your-web3-client}

**Если у вас уже есть клиент,** измените текущий URL-адрес провайдера узла на URL-адрес Alchemy с вашим ключом API: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_ПРИМЕЧАНИЕ:_** Приведенные ниже скрипты должны выполняться в **среде Node** или быть **сохранены в файл**, а не запускаться из командной строки. Если у вас еще не установлены Node или npm, ознакомьтесь с этим кратким [руководством по настройке для Mac](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs).

Существует множество [библиотек Web3](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries), которые можно интегрировать с Alchemy, однако мы рекомендуем использовать [Alchemy Web3](https://docs.alchemy.com/reference/api-overview) — готовую замену для Web3.js, созданную и настроенную для бесперебойной работы с Alchemy. Это дает множество преимуществ, таких как автоматические повторные попытки и надежная поддержка WebSocket.

Чтобы установить AlchemyWeb3.js, **перейдите в каталог вашего проекта** и выполните:

**С помощью Yarn:**

```
yarn add @alch/alchemy-web3
```

**С помощью NPM:**

```
npm install @alch/alchemy-web3
```

Для взаимодействия с инфраструктурой узлов Alchemy запустите в NodeJS или добавьте это в файл JavaScript:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. Напишите ваш первый скрипт Web3! {#write-your-first-web3-script}

Теперь, чтобы перейти к практике программирования на Web3, мы напишем простой скрипт, который выводит номер последнего блока из основной сети Ethereum.

**1. Если вы еще этого не сделали, создайте в терминале новый каталог проекта и перейдите в него:**

```
mkdir web3-example
cd web3-example
```

**2. Установите зависимость Alchemy Web3 (или любую другую Web3) в ваш проект, если вы еще этого не сделали:**

```
npm install @alch/alchemy-web3
```

**3. Создайте файл с именем `index.js` и добавьте следующее содержимое:**

> В конечном итоге вам следует заменить `demo` на ваш ключ HTTP API от Alchemy.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

Не знакомы с асинхронным программированием? Ознакомьтесь с этой [статьей на Medium](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c).

**4. Запустите его в терминале с помощью node**

```
node index.js
```

**5. Теперь вы должны увидеть вывод номера последнего блока в вашей консоли!**

```
The latest block number is 11043912
```

**Ура! Поздравляем! Вы только что написали свой первый скрипт Web3 с использованием Alchemy 🎉**

Не знаете, что делать дальше? Попробуйте развернуть свой первый смарт-контракт и попрактиковаться в программировании на Solidity в нашем [руководстве по смарт-контракту Hello World](https://www.alchemy.com/docs/hello-world-smart-contract) или проверьте свои знания панели управления с помощью [демо-приложения Dashboard](https://docs.alchemyapi.io/tutorials/demo-app)!

_[Зарегистрируйтесь в Alchemy бесплатно](https://auth.alchemy.com/), ознакомьтесь с нашей [документацией](https://www.alchemy.com/docs/) и следите за последними новостями в [Twitter](https://twitter.com/AlchemyPlatform)_.