---
title: "Смарт-контракт Hello World для начинающих — полный стек"
description: "Вводное руководство по написанию и развертыванию простого смарт-контракта на Ethereum."
author: "nstrike2"
tags:
  [
    "Solidity",
    "hardhat",
    "alchemy",
    "Умные контракты",
    "развертывание",
    "обозреватель блоков",
    "интерфейс",
    "транзакции"
  ]
skill: beginner
breadcrumb: "Hello World fullstack"
lang: ru
published: 2021-10-25
---

Это руководство для вас, если вы новичок в разработке блокчейна и не знаете, с чего начать или как развертывать смарт-контракты и взаимодействовать с ними. Мы рассмотрим создание и развертывание простого смарт-контракта в тестовой сети Goerli с использованием [MetaMask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org) и [Alchemy](https://alchemy.com/eth).

Для выполнения этого руководства вам понадобится аккаунт Alchemy. [Зарегистрируйте бесплатный аккаунт](https://www.alchemy.com/).

Если у вас возникнут вопросы, обращайтесь в [Discord Alchemy](https://discord.gg/gWuC7zB)!

## Часть 1. Создание и развертывание вашего смарт-контракта с помощью Hardhat {#part-1}

### Подключение к сети Ethereum {#connect-to-the-ethereum-network}

Существует много способов отправлять запросы в сеть Ethereum. Для простоты мы будем использовать бесплатный аккаунт на Alchemy, платформе для разработчиков блокчейна и API, которая позволяет нам взаимодействовать с блокчейном Ethereum без необходимости запускать собственный узел. Alchemy также имеет инструменты для разработчиков для мониторинга и аналитики; мы воспользуемся ими в этом руководстве, чтобы понять, что происходит «под капотом» при развертывании нашего смарт-контракта.

### Создайте свое приложение и ключ API {#create-your-app-and-api-key}

После создания аккаунта Alchemy вы можете сгенерировать ключ API, создав приложение. Это позволит вам делать запросы к тестовой сети Goerli. Если вы не знакомы с тестовыми сетями, вы можете [прочитать руководство Alchemy по выбору сети](https://www.alchemy.com/docs/choosing-a-web3-network).

На панели инструментов Alchemy найдите выпадающее меню **Приложения** на панели навигации и нажмите **Создать приложение**.

![Создание приложения Hello world](./hello-world-create-app.png)

Дайте вашему приложению имя «_Hello World_» и напишите краткое описание. Выберите **Staging** в качестве среды и **Goerli** в качестве сети.

![Вид создания приложения hello world](./create-app-view-hello-world.png)

_Примечание: обязательно выберите **Goerli**, иначе это руководство не будет работать._

Нажмите **Создать приложение**. Ваше приложение появится в таблице ниже.

### Создайте аккаунт Ethereum {#create-an-ethereum-account}

Вам нужен аккаунт Ethereum для отправки и получения транзакций. Мы будем использовать MetaMask, виртуальный кошелек в браузере, который позволяет пользователям управлять адресом своего аккаунта Ethereum.

Вы можете бесплатно скачать и создать аккаунт MetaMask [здесь](https://metamask.io/download). При создании аккаунта или если у вас уже есть аккаунт, убедитесь, что вы переключились на «тестовую сеть Goerli» в правом верхнем углу (чтобы мы не имели дело с реальными деньгами).

### Шаг 4. Добавьте эфир из крана (Faucet) {#step-4-add-ether-from-a-faucet}

Чтобы развернуть свой смарт-контракт в тестовой сети, вам понадобится немного тестовых ETH. Чтобы получить ETH в сети Goerli, перейдите в кран Goerli и введите адрес своего аккаунта Goerli. Обратите внимание, что краны Goerli в последнее время могут быть немного ненадежными — смотрите [страницу тестовых сетей](/developers/docs/networks/#goerli) для списка вариантов, которые можно попробовать:

_Примечание: из-за перегрузки сети это может занять некоторое время._
``

### Шаг 5: Проверьте свой баланс {#step-5-check-your-balance}

Чтобы перепроверить, что ETH находится в вашем кошельке, давайте сделаем запрос [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) с помощью [инструмента-компоновщика Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Результат будет содержать сумму ETH в нашем кошельке. Чтобы узнать больше, посмотрите [короткое руководство от Alchemy о том, как использовать инструмент-компоновщик](https://youtu.be/r6sjRxBZJuU).

Введите адрес своего аккаунта MetaMask и нажмите **Отправить запрос**. Вы увидите ответ, похожий на фрагмент кода ниже.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _Примечание: этот результат указан в wei, а не в ETH._ _Wei используется как наименьшая единица эфира._

Фух! Наши ненастоящие деньги уже все там.

### Шаг 6: Инициализация нашего проекта {#step-6-initialize-our-project}

Во-первых, нам нужно создать папку для нашего проекта. Перейдите в командную строку и введите следующее.

```
mkdir hello-world
cd hello-world
```

Теперь, когда мы находимся в папке нашего проекта, мы будем использовать `npm init` для его инициализации.

> Если у вас еще не установлен npm, следуйте [этим инструкциям по установке Node.js и npm](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm).

Для целей этого руководства не имеет значения, как вы ответите на вопросы инициализации. Вот как мы это сделали для примера:

```
имя пакета: (hello-world)
версия: (1.0.0)
описание: смарт-контракт hello world
точка входа: (index.js)
команда для тестирования:
репозиторий git:
ключевые слова:
автор:
лицензия: (ISC)

Будет записано в /Users/.../.../.../hello-world/package.json:

{
   "name": "hello-world",
   "version": "1.0.0",
   "description": "смарт-контракт hello world",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

Подтвердите `package.json`, и мы готовы!

### Шаг 7: Загрузка Hardhat {#step-7-download-hardhat}

Hardhat - это среда для сборки, развертывания, тестирования и отладки программного обеспечения Ethereum. Он помогает разработчикам создавать смарт-контракты и децентрализованные приложения локально перед их развертыванием в основной сети.

Внутри нашего проекта `hello-world` запустите:

```
npm install --save-dev hardhat
```

Более подробную информацию об [инструкциях по установке](https://hardhat.org/getting-started/#overview) можно найти на этой странице.

### Шаг 8: Создание проекта Hardhat {#step-8-create-hardhat-project}

В папке нашего проекта `hello-world` выполните:

```
npx hardhat
```

Вы увидите приветственное сообщение и интерфейс с вариантами того, что делать дальше. Выберите "create an empty hardhat.config.js":

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Добро пожаловать в Hardhat v2.0.11 👷‍

Что вы хотите сделать? …
Создать пример проекта
❯ Создать пустой hardhat.config.js
Выйти
```

Это создаст файл `hardhat.config.js` в проекте. Мы будем использовать его позже в этом руководстве, чтобы указать настройки для нашего проекта.

### Шаг 9: Добавление папок проекта {#step-9-add-project-folders}

Чтобы поддерживать порядок в проекте, давайте создадим две новые папки. В командной строке перейдите в корневой каталог вашего проекта `hello-world` и введите:

```
mkdir contracts
mkdir scripts
```

- `contracts/` — здесь мы будем хранить файл с кодом нашего смарт-контракта «hello world».
- `scripts/` — здесь мы будем хранить скрипты для развертывания нашего контракта и взаимодействия с ним.

### Шаг 10: Написание нашего контракта {#step-10-write-our-contract}

Вы можете спросить себя, когда мы собираемся писать код? Время пришло!

Откройте проект hello-world в своем любимом редакторе. Смарт-контракты чаще всего пишутся на Solidity, который мы и будем использовать для написания нашего смарт-контракта.

1. Перейдите в папку `contracts` и создайте новый файл с именем `HelloWorld.sol`
2. Ниже приведен пример смарт-контракта Hello World, который мы будем использовать в этом руководстве. Скопируйте содержимое ниже в файл `HelloWorld.sol`.

_Примечание: обязательно прочитайте комментарии, чтобы понять, что делает этот контракт._

```
// Указывает версию Solidity, используя семантическое версионирование.
// Узнайте больше: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Определяет контракт с именем `HelloWorld`.
// Контракт — это набор функций и данных (его состояние). После развертывания контракт находится по определенному адресу в блокчейне Ethereum. Узнайте больше: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Генерируется при вызове функции update
   //События смарт-контракта — это способ сообщить из вашего контракта во фронтенд вашего приложения о том, что что-то произошло в блокчейне. Фронтенд может «прослушивать» определенные события и предпринимать действия, когда они происходят.
   event UpdatedMessages(string oldStr, string newStr);

   // Объявляет переменную состояния `message` типа `string`.
   // Переменные состояния — это переменные, значения которых постоянно хранятся в хранилище контракта. Ключевое слово `public` делает переменные доступными извне контракта и создает функцию, которую другие контракты или клиенты могут вызывать для доступа к значению.
   string public message;

   // Подобно многим объектно-ориентированным языкам на основе классов, конструктор — это специальная функция, которая выполняется только при создании контракта.
   // Конструкторы используются для инициализации данных контракта. Узнайте больше:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Принимает строковый аргумент `initMessage` и устанавливает значение в переменную хранилища контракта `message`).
      message = initMessage;
   }

   // Публичная функция, которая принимает строковый аргумент и обновляет переменную хранилища `message`.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Это базовый смарт-контракт, который хранит сообщение при создании. Его можно обновить, вызвав функцию `update`.

### Шаг 11. Подключите MetaMask и Alchemy к вашему проекту {#step-11-connect-metamask-alchemy-to-your-project}

Мы создали кошелек MetaMask, учетную запись Alchemy и написали наш смарт-контракт, теперь пришло время их соединить.

Каждая транзакция, отправляемая из вашего кошелька, требует подписи с использованием вашего уникального приватного ключа. Чтобы предоставить нашей программе это разрешение, мы можем безопасно хранить наш приватный ключ в файле среды. Мы также будем хранить здесь ключ API для Alchemy.

> Чтобы узнать больше об отправке транзакций, ознакомьтесь с [этим руководством](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project) по отправке транзакций с помощью web3.

Во-первых, установите dotenv, находясь в директории проекта:

```
npm install dotenv --save
```

Затем создайте файл `.env` в корневом каталоге проекта. Добавьте в него свой приватный ключ MetaMask и URL-адрес HTTP API Alchemy.

Ваш файл среды должен называться `.env`, иначе он не будет распознан как файл среды.

Не называйте его `process.env`, `.env-custom` или как-либо еще.

- Следуйте [этим инструкциям](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key), чтобы экспортировать свой приватный ключ.
- Ниже показано, как получить URL-адрес HTTP API Alchemy

![](./get-alchemy-api-key.gif)

Ваш `.env` должен выглядеть следующим образом:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/ваш-api-ключ"
PRIVATE_KEY = "ваш-приватный-ключ-metamask"
```

Чтобы подключить их к нашему коду, мы будем ссылаться на эти переменные в нашем файле `hardhat.config.js` в шаге 13.

### Шаг 12: Установите Ethers.js {#step-12-install-ethersjs}

Ethers.js — это библиотека, которая упрощает взаимодействие и отправку запросов в Ethereum, оборачивая [стандартные методы JSON-RPC](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) в более удобные для пользователя методы.

Hardhat позволяет нам интегрировать [плагины](https://hardhat.org/plugins/) для дополнительных инструментов и расширенной функциональности. Мы воспользуемся [плагином Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) для развертывания контракта.

В директории проекта запустите:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### Шаг 13: Обновление hardhat.config.js {#step-13-update-hardhat-configjs}

Мы добавили несколько зависимостей и плагинов, и теперь нам нужно обновить `hardhat.config.js`, чтобы наш проект знал обо всех них.

Обновите ваш `hardhat.config.js`, чтобы он выглядел следующим образом:

```javascript
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")

const { API_URL, PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
}
```

### Шаг 14: Компиляция нашего контракта {#step-14-compile-our-contract}

Пора заставить это работать, давайте скомпилируем наш контракт. Задача `compile` — одна из встроенных задач hardhat.

Запустите в командной строке:

```bash
npx hardhat compile
```

Вы можете получить предупреждение `SPDX license identifier not provided in source file`, но не стоит об этом беспокоиться — надеемся, все остальное выглядит хорошо! Если нет, вы всегда можете написать в [Discord-канал Alchemy](https://discord.gg/u72VCg3).

### Шаг 15: Написание нашего скрипта развертывания {#step-15-write-our-deploy-script}

Контракт написан, файл конфигурации корректен, пора писать скрипт развертывания.

Перейдите в папку `scripts/`, создайте новый файл `deploy.js` и добавьте в него следующее содержимое:

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // Начинаем развертывание, возвращая promise, который разрешается в объект контракта
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Контракт развернут по адресу:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat отлично объясняет, что делает каждая из этих строк кода, в своем [руководстве по контрактам](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), мы использовали их объяснения здесь.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

`ContractFactory` в ethers.js — это абстракция, используемая для развертывания новых смарт-контрактов, поэтому `HelloWorld` здесь — это [фабрика](https://en.wikipedia.org/wiki/Factory_\(object-oriented_programming\)) для экземпляров нашего контракта hello world. При использовании плагина `hardhat-ethers` экземпляры `ContractFactory` и `Contract` по умолчанию подключаются к первому подписанту (владельцу).

```javascript
const hello_world = await HelloWorld.deploy()
```

Вызов `deploy()` на `ContractFactory` запустит развертывание и вернет `Promise`, который разрешается в объект `Contract`. Это объект, который имеет метод для каждой из функций нашего смарт контракта.

### Шаг 16: Разверните наш контракт {#step-16-deploy-our-contract}

Мы наконец-то готовы развернуть наш смарт контракт! Перейдите в командную строку и запустите:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

Вы должны увидеть что-то наподобие:

```bash
Контракт развернут по адресу: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**Пожалуйста, сохраните этот адрес**. Мы будем использовать его позже в этом руководстве.

Если мы перейдем на [Etherscan для Goerli](https://goerli.etherscan.io) и поищем адрес нашего контракта, мы должны увидеть, что он был успешно развернут. Транзакция будет выглядеть примерно так:

![](./etherscan-contract.png)

Адрес `From` должен совпадать с адресом вашего аккаунта MetaMask, а в адресе `To` будет указано **Создание контракта**. Если мы щелкнем по транзакции, то увидим адрес нашего контракта в поле `To`.

![](./etherscan-transaction.png)

Поздравляем! Вы только что развернули смарт-контракт в тестовой сети Ethereum.

Чтобы понять, что происходит «под капотом», давайте перейдем на вкладку Explorer на нашей [панели инструментов Alchemy](https://dashboard.alchemy.com/explorer). Если у вас несколько приложений Alchemy, убедитесь, что вы отфильтровали их по приложению и выбрали **Hello World**.

![](./hello-world-explorer.png)

Здесь вы увидите несколько методов JSON-RPC, которые Hardhat/Ethers сделали для нас «под капотом», когда мы вызвали функцию `.deploy()`. Два важных метода здесь — это [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), который является запросом на запись нашего контракта в сеть Goerli, и [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash), который является запросом на чтение информации о нашей транзакции по заданному хэшу. Чтобы узнать больше об отправке транзакций, ознакомьтесь с [нашим руководством по отправке транзакций с помощью Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

## Часть 2. Взаимодействие с вашим смарт-контрактом {#part-2-interact-with-your-smart-contract}

Теперь, когда мы успешно развернули смарт-контракт в сети Goerli, давайте научимся с ним взаимодействовать.

### Создайте файл interact.js {#create-a-interactjs-file}

Это файл, в котором мы напишем наш скрипт взаимодействия. Мы будем использовать библиотеку Ethers.js, которую вы ранее установили в Части 1.

В папке `scripts/` создайте новый файл с именем `interact.js` и добавьте следующий код:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### Обновите ваш файл .env {#update-your-env-file}

Мы будем использовать новые переменные среды, поэтому нам нужно определить их в файле `.env`, который [мы создали ранее](#step-11-connect-metamask-&-alchemy-to-your-project).

Нам нужно будет добавить определение для нашего `API_KEY` Alchemy и `CONTRACT_ADDRESS`, по которому был развернут ваш смарт-контракт.

Ваш файл `.env` должен выглядеть примерно так:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<ваш-api-ключ>"
API_KEY = "<ваш-api-ключ>"
PRIVATE_KEY = "<ваш-приватный-ключ-metamask>"
CONTRACT_ADDRESS = "0x<адрес_вашего_контракта>"
```

### Получите ABI вашего контракта {#grab-your-contract-ABI}

Наш [ABI (двоичный интерфейс приложения)](/glossary/#abi) контракта — это интерфейс для взаимодействия с нашим смарт-контрактом. Hardhat автоматически генерирует ABI и сохраняет его в `HelloWorld.json`. Чтобы использовать ABI, нам нужно будет разобрать его содержимое, добавив следующие строки кода в наш файл `interact.js`:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

Если вы хотите увидеть ABI, вы можете вывести его в консоль:

```javascript
console.log(JSON.stringify(contract.abi))
```

Чтобы увидеть ваш ABI, выведенный в консоль, перейдите в терминал и выполните:

```bash
npx hardhat run scripts/interact.js
```

### Создайте экземпляр вашего контракта {#create-an-instance-of-your-contract}

Для взаимодействия с нашим контрактом нам нужно создать экземпляр контракта в нашем коде. Чтобы сделать это с помощью Ethers.js, нам нужно будет работать с тремя концепциями:

1. Provider (провайдер) — поставщик узлов, который дает вам доступ на чтение и запись в блокчейн.
2. Signer (подписант) — представляет аккаунт Ethereum, который может подписывать транзакции.
3. Contract (контракт) — объект Ethers.js, представляющий конкретный контракт, развернутый в сети.

Мы будем использовать ABI контракта из предыдущего шага, чтобы создать наш экземпляр контракта:

```javascript
// interact.js

// Провайдер
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Подписант
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Контракт
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

Узнайте больше о провайдерах, подписантах и контрактах в [документации ethers.js](https://docs.ethers.io/v5/).

### Прочитайте начальное сообщение {#read-the-init-message}

Помните, как мы развертывали наш контракт с `initMessage = "Hello world!"`? Теперь мы собираемся прочитать это сообщение, хранящееся в нашем смарт-контракте, и вывести его в консоль.

В JavaScript асинхронные функции используются при взаимодействии с сетями. Чтобы узнать больше об асинхронных функциях, [прочитайте эту статью на Medium](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

Используйте приведенный ниже код, чтобы вызвать функцию `message` в нашем смарт-контракте и прочитать начальное сообщение:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("Сообщение: " + message)
}
main()
```

После запуска файла с помощью `npx hardhat run scripts/interact.js` в терминале мы должны увидеть следующий ответ:

```
Сообщение: Hello world!
```

Поздравляем! Вы только что успешно прочитали данные смарт-контракта из блокчейна Ethereum, так держать!

### Обновите сообщение {#update-the-message}

Вместо того, чтобы просто читать сообщение, мы также можем обновить сообщение, сохраненное в нашем смарт-контракте, с помощью функции `update`! Круто, не так ли?

Чтобы обновить сообщение, мы можем напрямую вызвать функцию `update` на нашем созданном объекте Contract:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("Сообщение: " + message)

  console.log("Обновление сообщения...")
  const tx = await helloWorldContract.update("Это новое сообщение.")
  await tx.wait()
}
main()
```

Обратите внимание, что в строке 11 мы вызываем `.wait()` для возвращенного объекта транзакции. Это гарантирует, что наш скрипт дождется майнинга транзакции в блокчейне перед выходом из функции. Если вызов `.wait()` не включен, скрипт может не увидеть обновленное значение `message` в контракте.

### Прочитайте новое сообщение {#read-the-new-message}

Вы должны быть в состоянии повторить [предыдущий шаг](#read-the-init-message), чтобы прочитать обновленное значение `message`. Потратьте немного времени и посмотрите, сможете ли вы внести необходимые изменения, чтобы вывести это новое значение!

Если вам нужна подсказка, вот как должен выглядеть ваш файл `interact.js` на данном этапе:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// провайдер - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// подписант - вы
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// экземпляр контракта
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("Сообщение: " + message)

  console.log("Обновление сообщения...")
  const tx = await helloWorldContract.update("это новое сообщение")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("Новое сообщение: " + newMessage)
}

main()
```

Теперь просто запустите скрипт, и вы сможете увидеть старое сообщение, статус обновления и новое сообщение, выведенные в ваш терминал!

`npx hardhat run scripts/interact.js --network goerli`

```
Сообщение: Hello World!
Обновление сообщения...
Новое сообщение: This is the new message.
```

Во время выполнения этого скрипта вы можете заметить, что шаг `Обновление сообщения...` занимает некоторое время перед загрузкой нового сообщения. Это связано с процессом майнинга; если вам интересно отслеживать транзакции во время их майнинга, посетите [мемпул Alchemy](https://dashboard.alchemyapi.io/mempool), чтобы увидеть статус транзакции. Если транзакция была отброшена, также полезно проверить [Etherscan для Goerli](https://goerli.etherscan.io) и найти хэш вашей транзакции.

## Часть 3: Публикация вашего смарт-контракта на Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

Вы проделали всю тяжелую работу по воплощению вашего смарт-контракта в жизнь; теперь пришло время поделиться им со всем миром!

Проверив свой смарт-контракт на Etherscan, любой сможет просмотреть ваш исходный код и взаимодействовать с вашим смарт-контрактом. Давайте начнем!

### Шаг 1: Создайте ключ API в своей учетной записи Etherscan {#step-1-generate-an-api-key-on-your-etherscan-account}

Ключ API Etherscan необходим для подтверждения того, что вы являетесь владельцем смарт-контракта, который пытаетесь опубликовать.

Если у вас еще нет аккаунта Etherscan, [зарегистрируйте аккаунт](https://etherscan.io/register).

После входа в систему найдите свое имя пользователя на панели навигации, наведите на него курсор и выберите кнопку **Мой профиль**.

На странице вашего профиля вы должны увидеть боковую панель навигации. На боковой панели навигации выберите **API Keys**. Затем нажмите кнопку «Add», чтобы создать новый ключ API, назовите свое приложение **hello-world** и нажмите кнопку **Create New API Key**.

Ваш новый ключ API должен появиться в таблице ключей API. Скопируйте ключ API в буфер обмена.

Далее нам нужно добавить ключ API Etherscan в наш файл `.env`.

После его добавления ваш файл `.env` должен выглядеть так:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/ваш-api-ключ"
PUBLIC_KEY = "ваш-публичный-адрес-аккаунта"
PRIVATE_KEY = "ваш-приватный-адрес-аккаунта"
CONTRACT_ADDRESS = "адрес-вашего-контракта"
ETHERSCAN_API_KEY = "ваш-ключ-etherscan"
```

### Смарт-контракты, развернутые с помощью Hardhat {#hardhat-deployed-smart-contracts}

#### Установите hardhat-etherscan {#install-hardhat-etherscan}

Публикация вашего контракта на Etherscan с помощью Hardhat очень проста. Сначала вам нужно будет установить плагин `hardhat-etherscan`. `hardhat-etherscan` автоматически проверит исходный код смарт-контракта и ABI на Etherscan. Чтобы добавить его, в каталоге `hello-world` выполните:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

После установки включите следующее выражение вверху вашего `hardhat.config.js` и добавьте параметры конфигурации Etherscan:

```javascript
// hardhat.config.js

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")

const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // Ваш ключ API для Etherscan
    // Получите его на https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Подтвердите свой смарт-контракт на Etherscan {#verify-your-smart-contract-on-etherscan}

Убедитесь, что все файлы сохранены и все переменные `.env` настроены правильно.

Запустите задачу `verify`, передав адрес контракта и сеть, в которой он развернут:

```text
npx hardhat verify --network goerli АДРЕС_РАЗВЕРНУТОГО_КОНТРАКТА 'Hello World!'
```

Убедитесь, что `DEPLOYED_CONTRACT_ADDRESS` — это адрес вашего развернутого смарт-контракта в тестовой сети Goerli. Кроме того, последний аргумент (`'Hello World!'`) должен быть той же строковой величиной, которая использовалась [на этапе развертывания в части 1](#write-our-deploy-script).

Если все пройдет хорошо, вы увидите следующее сообщение в своем терминале:

```text
Исходный код для контракта успешно отправлен
contracts/HelloWorld.sol:HelloWorld по адресу 0xdeployed-contract-address
для проверки на Etherscan. Ожидание результата проверки...


Контракт HelloWorld успешно проверен на Etherscan.
https://goerli.etherscan.io/address/<адрес-контракта>#contracts
```

Поздравляем! Код вашего смарт-контракта находится на Etherscan!

### Проверьте свой смарт-контракт на Etherscan! {#check-out-your-smart-contract-on-etherscan}

Когда вы перейдете по ссылке, указанной в вашем терминале, вы сможете увидеть код вашего смарт-контракта и ABI, опубликованные на Etherscan!

**Урааа — ты сделал это, чемпион! Теперь любой может вызывать или записывать данные в ваш смарт-контракт! Нам не терпится увидеть, что вы создадите дальше!**

## Часть 4 — Интеграция вашего смарт-контракта с фронтендом {#part-4-integrating-your-smart-contract-with-the-frontend}

К концу этого руководства вы узнаете, как:

- Подключить кошелек MetaMask к вашему децентрализованному приложению
- Считывать данные с вашего смарт-контракта с помощью API [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Подписывать транзакции Ethereum с помощью MetaMask

Для этого децентрализованного приложения мы будем использовать [React](https://react.dev/) в качестве нашего фронтенд-фреймворка; однако важно отметить, что мы не будем тратить много времени на разбор его основ, поскольку в основном мы сосредоточимся на внедрении функциональности Web3 в наш проект.

В качестве предварительного условия вы должны иметь начальный уровень понимания React. В противном случае мы рекомендуем пройти официальное [руководство по введению в React](https://react.dev/learn).

### Клонируйте стартовые файлы {#clone-the-starter-files}

Сначала перейдите в [репозиторий GitHub hello-world-part-four](https://github.com/alchemyplatform/hello-world-part-four-tutorial), чтобы получить стартовые файлы для этого проекта, и клонируйте этот репозиторий на свой локальный компьютер.

Откройте клонированный репозиторий локально. Обратите внимание, что он содержит две папки: `starter-files` и `completed`.

- `starter-files` - **мы будем работать в этом каталоге**, мы подключим пользовательский интерфейс к вашему кошельку Ethereum и смарт-контракту, который мы опубликовали на Etherscan в [Части 3](#part-3).
- `completed` содержит полностью завершенное руководство и должен использоваться только в качестве справочника, если вы застряли.

Далее откройте свою копию `starter-files` в вашем любимом редакторе кода, а затем перейдите в папку `src`.

Весь код, который мы напишем, будет находиться в папке `src`. Мы будем редактировать компонент `HelloWorld.js` и файлы JavaScript `util/interact.js`, чтобы придать нашему проекту функциональность Web3.

### Ознакомьтесь со стартовыми файлами {#check-out-the-starter-files}

Прежде чем мы начнем писать код, давайте рассмотрим, что нам предоставлено в стартовых файлах.

#### Запустите ваш React-проект {#get-your-react-project-running}

Начнем с запуска проекта React в нашем браузере. Прелесть React в том, что как только наш проект запускается в нашем браузере, любые сохраняемые нами изменения будут обновляться в реальном времени в нашем браузере.

Чтобы запустить проект, перейдите в корневой каталог папки `starter-files` и запустите `npm install` в своем терминале, чтобы установить зависимости проекта:

```bash
cd starter-files
npm install
```

После завершения установки выполните `npm start` в терминале:

```bash
npm start
```

Это должно открыть [http://localhost:3000/](http://localhost:3000/) в вашем браузере, где вы увидите интерфейс нашего проекта. Он должен состоять из одного поля (места для обновления сообщения, хранящегося в вашем смарт-контракте), кнопки «Подключить кошелек» и кнопки «Обновить».

Если вы попробуете нажать на любую из кнопок, вы заметите, что они не работают — это потому, что нам все еще нужно запрограммировать их функциональность.

#### Компонент `HelloWorld.js` {#the-helloworld-js-component}

Давайте вернемся в папку `src` в нашем редакторе и откроем файл `HelloWorld.js`. Очень важно, чтобы мы понимали все в этом файле, поскольку это основной компонент React, над которым мы будем работать.

В верхней части этого файла вы заметите, что у нас есть несколько операторов импорта, которые необходимы для запуска нашего проекта, включая библиотеку React, хуки useEffect и useState, некоторые элементы из `./util/interact.js` (мы опишем их более подробно в ближайшее время!) и логотип Alchemy.

```javascript
// HelloWorld.js

import React from "react"
import { useEffect, useState } from "react"
import {
  helloWorldContract,
  connectWallet,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
} from "./util/interact.js"

import alchemylogo from "./alchemylogo.svg"
```

Далее у нас есть переменные состояния, которые мы будем обновлять после определенных событий.

```javascript
// HelloWorld.js

//Переменные состояния
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("Нет подключения к сети.")
const [newMessage, setNewMessage] = useState("")
```

Вот что представляет собой каждая из переменных:

- `walletAddress` — строка, в которой хранится адрес кошелька пользователя
- `status` — строка, в которой хранится полезное сообщение, которое помогает пользователю взаимодействовать с децентрализованным приложением
- `message` — строка, в которой хранится текущее сообщение в смарт-контракте
- `newMessage` — строка, в которой хранится новое сообщение, которое будет записано в смарт-контракт

После переменных состояния вы увидите пять нереализованных функций: `useEffect`, `addSmartContractListener`, `addWalletListener`, `connectWalletPressed` и `onUpdatePressed`. Ниже мы объясним, что они делают:

```javascript
// HelloWorld.js

//вызывается только один раз
useEffect(async () => {
  //TODO: реализовать
}, [])

function addSmartContractListener() {
  //TODO: реализовать
}

function addWalletListener() {
  //TODO: реализовать
}

const connectWalletPressed = async () => {
  //TODO: реализовать
}

const onUpdatePressed = async () => {
  //TODO: реализовать
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) — это хук React, который вызывается после рендеринга вашего компонента. Поскольку в него передается пустой массив `[]` в качестве свойства (см. строку 4), он будет вызываться только при _первом_ рендеринге компонента. Здесь мы загрузим текущее сообщение, хранящееся в нашем смарт-контракте, вызовем наши прослушиватели смарт-контракта и кошелька и обновим наш пользовательский интерфейс, чтобы отразить, подключен ли уже кошелек.
- `addSmartContractListener` — эта функция настраивает прослушиватель, который будет отслеживать событие `UpdatedMessages` нашего контракта HelloWorld и обновлять наш пользовательский интерфейс при изменении сообщения в нашем смарт-контракте.
- `addWalletListener` — эта функция настраивает прослушиватель, который обнаруживает изменения в состоянии кошелька MetaMask пользователя, например, когда пользователь отключает свой кошелек или переключает адреса.
- `connectWalletPressed` — эта функция будет вызываться для подключения кошелька MetaMask пользователя к нашему децентрализованному приложению.
- `onUpdatePressed` — эта функция будет вызываться, когда пользователь захочет обновить сообщение, хранящееся в смарт-контракте.

Ближе к концу этого файла находится пользовательский интерфейс нашего компонента.

```javascript
// HelloWorld.js

//UI нашего компонента
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Подключено: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Подключить кошелек</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Текущее сообщение:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>Новое сообщение:</h2>

    <div>
      <input
        type="text"
        placeholder="Обновите сообщение в вашем смарт-контракте."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Обновить
      </button>
</div>
 
</div>
)
```

Если вы внимательно изучите этот код, вы заметите, где мы используем наши различные переменные состояния в нашем пользовательском интерфейсе:

- В строках 6–12, если кошелек пользователя подключен (т. е. `walletAddress.length > 0`), мы отображаем усеченную версию `walletAddress` пользователя на кнопке с идентификатором «walletButton»; в противном случае она просто гласит «Подключить кошелек».
- В строке 17 мы отображаем текущее сообщение, хранящееся в смарт-контракте, которое зафиксировано в строке `message`.
- В строках 23–26 мы используем [контролируемый компонент](https://legacy.reactjs.org/docs/forms.html#controlled-components) для обновления нашей переменной состояния `newMessage` при изменении ввода в текстовом поле.

В дополнение к нашим переменным состояния вы также увидите, что функции `connectWalletPressed` и `onUpdatePressed` вызываются при нажатии кнопок с идентификаторами `publishButton` и `walletButton` соответственно.

Наконец, давайте рассмотрим, куда добавляется этот компонент `HelloWorld.js`.

Если вы перейдете к файлу `App.js`, который является основным компонентом в React, выступающим в качестве контейнера для всех других компонентов, вы увидите, что наш компонент `HelloWorld.js` внедряется в строке 7.

И последнее, но не менее важное: давайте рассмотрим еще один предоставленный вам файл — `interact.js`.

#### Файл `interact.js` {#the-interact-js-file}

Поскольку мы хотим следовать парадигме [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), нам понадобится отдельный файл, который содержит все наши функции для управления логикой, данными и правилами нашего децентрализованного приложения, а затем мы сможем экспортировать эти функции в наш интерфейс (наш компонент `HelloWorld.js`).

👆🏽Именно в этом и заключается цель нашего файла `interact.js`!

Перейдите в папку `util` в вашем каталоге `src`, и вы заметите, что мы включили файл с именем `interact.js`, который будет содержать все наши функции и переменные для взаимодействия со смарт-контрактами и кошельками.

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

Вы заметите, что вверху файла мы закомментировали объект `helloWorldContract`. Позже в этом руководстве мы раскомментируем этот объект и создадим экземпляр нашего смарт-контракта в этой переменной, который затем экспортируем в наш компонент `HelloWorld.js`.

Четыре нереализованные функции после нашего объекта `helloWorldContract` делают следующее:

- `loadCurrentMessage` — эта функция обрабатывает логику загрузки текущего сообщения, хранящегося в смарт-контракте. Она сделает вызов для _чтения_ в смарт-контракт Hello World с помощью [API Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).
- `connectWallet` — эта функция подключит MetaMask пользователя к нашему децентрализованному приложению.
- `getCurrentWalletConnected` — эта функция проверит, подключен ли уже аккаунт Ethereum к нашему децентрализованному приложению при загрузке страницы, и соответствующим образом обновит наш пользовательский интерфейс.
- `updateMessage` — эта функция обновит сообщение, хранящееся в смарт-контракте. Она сделает вызов для _записи_ в смарт-контракт Hello World, поэтому кошелек MetaMask пользователя должен будет подписать транзакцию Ethereum для обновления сообщения.

Теперь, когда мы понимаем, с чем работаем, давайте разберемся, как читать из нашего смарт-контракта!

### Шаг 3: Чтение из вашего смарт-контракта {#step-3-read-from-your-smart-contract}

Чтобы читать из вашего смарт-контракта, вам нужно будет успешно настроить:

- API-соединение с блокчейном Ethereum
- Загруженный экземпляр вашего смарт-контракта
- Функция для вызова функции вашего смарт-контракта
- Прослушиватель для отслеживания обновлений, когда данные, которые вы читаете из смарт-контракта, изменяются

Это может показаться большим количеством шагов, но не волнуйтесь! Мы проведем вас через каждый из них шаг за шагом! :\)

#### Установите API-соединение с блокчейном Ethereum {#establish-an-api-connection-to-the-ethereum-chain}

Итак, помните, как во второй части этого руководства мы использовали наш ключ [Alchemy Web3 для чтения из нашего смарт-контракта](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library)? Вам также понадобится ключ Alchemy Web3 в вашем децентрализованном приложении для чтения из блокчейна.

Если у вас его еще нет, сначала установите [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), перейдя в корневой каталог ваших `starter-files` и выполнив в терминале следующую команду:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) — это оболочка для [Web3.js](https://docs.web3js.org/), предоставляющая расширенные методы API и другие важные преимущества, облегчающие жизнь веб-разработчика. Он разработан с требованием минимальной настройки, поэтому вы можете сразу начать использовать его в своем приложении!

Затем установите пакет [dotenv](https://www.npmjs.com/package/dotenv) в каталог вашего проекта, чтобы у нас было безопасное место для хранения нашего ключа API после того, как мы его получим.

```text
npm install dotenv --save
```

Для нашего децентрализованного приложения **мы будем использовать наш ключ API для Websockets**, а не наш ключ API для HTTP, так как это позволит нам настроить прослушиватель, который обнаруживает, когда меняется сообщение, хранящееся в смарт-контракте.

Как только у вас будет ключ API, создайте файл `.env` в вашем корневом каталоге и добавьте в него свой URL-адрес для Websockets Alchemy. После этого ваш файл `.env` должен выглядеть следующим образом:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<ключ>
```

Теперь мы готовы настроить нашу конечную точку Alchemy Web3 в нашем децентрализованном приложении! Давайте вернемся к нашему `interact.js`, который находится в нашей папке `util`, и добавим следующий код в начало файла:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

Выше мы сначала импортировали ключ Alchemy из нашего файла `.env`, а затем передали наш `alchemyKey` в `createAlchemyWeb3`, чтобы установить нашу конечную точку Alchemy Web3.

С этой готовой конечной точкой пришло время загрузить наш смарт-контракт!

#### Загрузка вашего смарт-контракта Hello World {#loading-your-hello-world-smart-contract}

Чтобы загрузить ваш смарт-контракт Hello World, вам понадобится его адрес контракта и ABI, оба из которых можно найти на Etherscan, если вы завершили [Часть 3 этого руководства.](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)

#### Как получить ABI вашего контракта с Etherscan {#how-to-get-your-contract-abi-from-etherscan}

Если вы пропустили часть 3 этого руководства, вы можете использовать контракт HelloWorld с адресом [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code). Его ABI можно найти [здесь](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).

ABI контракта необходим для указания, какую функцию будет вызывать контракт, а также для обеспечения того, чтобы функция возвращала данные в ожидаемом формате. После того, как мы скопировали ABI нашего контракта, давайте сохраним его в виде файла JSON с именем `contract-abi.json` в вашем каталоге `src`.

Ваш файл contract-abi.json должен храниться в вашей папке src.

Вооружившись адресом нашего контракта, ABI и конечной точкой Alchemy Web3, мы можем использовать [метод contract](https://docs.web3js.org/api/web3-eth-contract/class/Contract), чтобы загрузить экземпляр нашего смарт-контракта. Импортируйте ABI вашего контракта в файл `interact.js` и добавьте адрес вашего контракта.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

Теперь мы наконец-то можем раскомментировать нашу переменную `helloWorldContract` и загрузить смарт-контракт с помощью нашей конечной точки AlchemyWeb3:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Подводя итог, первые 12 строк вашего `interact.js` теперь должны выглядеть так:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"

export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Теперь, когда мы загрузили наш контракт, мы можем реализовать нашу функцию `loadCurrentMessage`!

#### Реализация `loadCurrentMessage` в вашем файле `interact.js` {#implementing-loadCurrentMessage-in-your-interact-js-file}

Эта функция очень проста. Мы сделаем простой асинхронный вызов web3 для чтения из нашего контракта. Наша функция вернет сообщение, хранящееся в смарт-контракте:

Обновите `loadCurrentMessage` в вашем файле `interact.js` до следующего:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

Поскольку мы хотим отображать этот смарт-контракт в нашем пользовательском интерфейсе, давайте обновим функцию `useEffect` в нашем компоненте `HelloWorld.js` до следующего:

```javascript
// HelloWorld.js

//вызывается только один раз
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

Обратите внимание, мы хотим, чтобы наша `loadCurrentMessage` вызывалась только один раз во время первого рендеринга компонента. Вскоре мы реализуем `addSmartContractListener` для автоматического обновления пользовательского интерфейса после изменения сообщения в смарт-контракте.

Прежде чем мы углубимся в наш прослушиватель, давайте посмотрим, что у нас есть на данный момент! Сохраните ваши файлы `HelloWorld.js` и `interact.js`, а затем перейдите по адресу [http://localhost:3000/](http://localhost:3000/)

Вы заметите, что текущее сообщение больше не гласит «Нет подключения к сети». Вместо этого оно отражает сообщение, хранящееся в смарт-контракте. Отлично!

#### Ваш пользовательский интерфейс теперь должен отражать сообщение, хранящееся в смарт-контракте {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

Теперь о прослушивателе...

#### Реализуйте `addSmartContractListener` {#implement-addsmartcontractlistener}

Если вы вернетесь к файлу `HelloWorld.sol`, который мы написали в [Части 1 этой серии руководств](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract), вы вспомните, что есть событие смарт-контракта под названием `UpdatedMessages`, которое генерируется после вызова функции `update` нашего смарт-контракта (см. строки 9 и 27):

```javascript
// HelloWorld.sol

// Указывает версию Solidity, используя семантическое версионирование.
// Узнайте больше: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// Определяет контракт с именем `HelloWorld`.
// Контракт — это набор функций и данных (его состояние). После развертывания контракт находится по определенному адресу в блокчейне Ethereum. Узнайте больше: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Генерируется при вызове функции update
   //События смарт-контракта — это способ сообщить из вашего контракта во фронтенд вашего приложения о том, что что-то произошло в блокчейне. Фронтенд может «прослушивать» определенные события и предпринимать действия, когда они происходят.
   event UpdatedMessages(string oldStr, string newStr);

   // Объявляет переменную состояния `message` типа `string`.
   // Переменные состояния — это переменные, значения которых постоянно хранятся в хранилище контракта. Ключевое слово `public` делает переменные доступными извне контракта и создает функцию, которую другие контракты или клиенты могут вызывать для доступа к значению.
   string public message;

   // Подобно многим объектно-ориентированным языкам на основе классов, конструктор — это специальная функция, которая выполняется только при создании контракта.
   // Конструкторы используются для инициализации данных контракта. Узнайте больше:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Принимает строковый аргумент `initMessage` и устанавливает значение в переменную хранилища контракта `message`).
      message = initMessage;
   }

   // Публичная функция, которая принимает строковый аргумент и обновляет переменную хранилища `message`.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

События смарт-контракта — это способ, которым ваш контракт сообщает вашему фронтенд-приложению о том, что что-то произошло (т. е. произошло _событие_) в блокчейне, которое может «прослушивать» определенные события и предпринимать действия, когда они происходят.

Функция `addSmartContractListener` будет специально прослушивать событие `UpdatedMessages` нашего смарт-контракта Hello World и обновлять наш пользовательский интерфейс для отображения нового сообщения.

Измените `addSmartContractListener` на следующее:

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 Ваше сообщение было обновлено!")
    }
  })
}
```

Давайте разберем, что происходит, когда прослушиватель обнаруживает событие:

- Если при генерации события произойдет ошибка, она будет отражена в пользовательском интерфейсе через нашу переменную состояния `status`.
- В противном случае мы будем использовать возвращенный объект `data`. `data.returnValues` — это массив, индексированный с нуля, где первый элемент массива хранит предыдущее сообщение, а второй — обновленное. В целом, при успешном событии мы установим нашу строку `message` на обновленное сообщение, очистим строку `newMessage` и обновим нашу переменную состояния `status`, чтобы отразить, что новое сообщение было опубликовано в нашем смарт-контракте.

Наконец, давайте вызовем наш прослушиватель в нашей функции `useEffect`, чтобы он был инициализирован при первом рендеринге компонента `HelloWorld.js`. В целом, ваша функция `useEffect` должна выглядеть так:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

Теперь, когда мы можем читать из нашего смарт-контракта, было бы здорово разобраться, как в него записывать! Однако, чтобы записывать в наше децентрализованное приложение, у нас сначала должен быть подключенный к нему кошелек Ethereum.

Итак, далее мы займемся настройкой нашего кошелька Ethereum (MetaMask), а затем подключим его к нашему децентрализованному приложению!

### Шаг 4: Настройте свой кошелек Ethereum {#step-4-set-up-your-ethereum-wallet}

Чтобы что-либо записать в блокчейн Ethereum, пользователи должны подписывать транзакции с помощью приватных ключей своего виртуального кошелька. В этом руководстве мы будем использовать [MetaMask](https://metamask.io/), виртуальный кошелек в браузере, используемый для управления адресом вашего аккаунта Ethereum, так как он делает подписание транзакций очень простым для конечного пользователя.

Если вы хотите больше узнать о том, как работают транзакции в Ethereum, ознакомьтесь с [этой страницей](/developers/docs/transactions/) от Ethereum Foundation.

#### Загрузите MetaMask {#download-metamask}

Вы можете бесплатно скачать и создать аккаунт MetaMask [здесь](https://metamask.io/download). При создании аккаунта или если у вас уже есть аккаунт, убедитесь, что вы переключились на «тестовую сеть Goerli» в правом верхнем углу (чтобы мы не имели дело с реальными деньгами).

#### Добавьте эфир из крана {#add-ether-from-a-faucet}

Чтобы подписать транзакцию в блокчейне Ethereum, нам понадобится немного тестового Eth. Чтобы получить Eth, вы можете перейти на [FaucETH](https://fauceth.komputing.org) и ввести адрес своего аккаунта Goerli, нажать «Запросить средства», затем выбрать «Ethereum Testnet Goerli» в выпадающем списке и, наконец, снова нажать кнопку «Запросить средства». Вскоре после этого вы должны увидеть Eth в своей учетной записи MetaMask!

#### Проверьте свой баланс {#check-your-balance}

Чтобы дважды проверить наш баланс, давайте сделаем запрос [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance), используя [инструмент для составления запросов от Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Так сумма Eth вернется в наш кошелек. После ввода адреса вашего аккаунта MetaMask и нажатия «Send Request» вы должны увидеть примерно такой ответ:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**ПРИМЕЧАНИЕ:** этот результат указан в wei, а не в ETH. Wei это наименьшая единица измерения эфира. Преобразование wei в eth: 1 eth = 10¹⁸ wei. Итак, если мы преобразуем 0xde0b6b3a7640000 в десятичное число, мы получим 1\*10¹⁸, что равно 1 eth.

Фух! Наши ненастоящие деньги уже все там! 🤑

### Шаг 5: Подключите MetaMask к вашему пользовательскому интерфейсу {#step-5-connect-metamask-to-your-UI}

Теперь, когда наш кошелек MetaMask настроен, давайте подключим к нему наше децентрализованное приложение!

#### Функция `connectWallet` {#the-connectWallet-function}

В нашем файле `interact.js` мы реализуем функцию `connectWallet`, которую затем сможем вызвать в нашем компоненте `HelloWorld.js`.

Давайте изменим `connectWallet` на следующее:

```javascript
// interact.js

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Напишите сообщение в текстовом поле выше.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              Вы должны установить MetaMask, виртуальный кошелек Ethereum, в свой
              браузер.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Так что же именно делает этот гигантский блок кода?

Ну, во-первых, он проверяет, включен ли `window.ethereum` в вашем браузере.

`window.ethereum` — это глобальный API, внедряемый MetaMask и другими поставщиками кошельков, который позволяет веб-сайтам запрашивать аккаунты пользователей Ethereum. В случае одобрения он может считывать данные из блокчейнов, к которым подключен пользователь, и предлагать пользователю подписывать сообщения и транзакции. Для получения дополнительной информации см. [документацию MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents)!

Если `window.ethereum` _отсутствует_, это означает, что MetaMask не установлен. В результате возвращается объект JSON, где возвращаемый `address` представляет собой пустую строку, а объект `status` JSX сообщает, что пользователь должен установить MetaMask.

Если же `window.ethereum` _присутствует_, то здесь начинается самое интересное.

Используя цикл try/catch, мы попытаемся подключиться к MetaMask, вызвав [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Вызов этой функции откроет MetaMask в браузере, и пользователю будет предложено подключить свой кошелек к вашему децентрализованному приложению.

- Если пользователь решит подключиться, `method: "eth_requestAccounts"` вернет массив, содержащий все адреса аккаунтов пользователя, подключенных к децентрализованному приложению. В целом, наша функция `connectWallet` вернет объект JSON, который содержит _первый_ `address` в этом массиве (см. строку 9) и сообщение `status`, предлагающее пользователю написать сообщение в смарт-контракт.
- Если пользователь отклоняет подключение, то объект JSON будет содержать пустую строку для возвращаемого `address` и сообщение `status`, которое отражает, что пользователь отклонил подключение.

Теперь, когда мы написали эту функцию `connectWallet`, следующим шагом является ее вызов в нашем компоненте `HelloWorld.js`.

#### Добавьте функцию `connectWallet` в ваш компонент пользовательского интерфейса `HelloWorld.js` {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

Перейдите к функции `connectWalletPressed` в `HelloWorld.js` и обновите ее до следующего:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Обратите внимание, как большая часть нашей функциональности абстрагирована от нашего компонента `HelloWorld.js` из файла `interact.js`? Это значит, что мы соответствуем парадигме M-V-С!

В `connectWalletPressed` мы просто делаем вызов `await` к нашей импортированной функции `connectWallet` и, используя ее ответ, обновляем наши переменные `status` и `walletAddress` через их хуки состояния.

Теперь давайте сохраним оба файла (`HelloWorld.js` и `interact.js`) и протестируем наш пользовательский интерфейс.

Откройте браузер на странице [http://localhost:3000/](http://localhost:3000/) и нажмите кнопку «Подключить кошелек» в правом верхнем углу страницы.

Если у вас установлен MetaMask, вам будет предложено подключить кошелек к вашему децентрализованному приложению. Примите приглашение на подключение.

Вы должны увидеть, что кнопка кошелька теперь показывает, что ваш адрес подключен! Даааааа 🔥

Далее попробуйте обновить страницу... это странно. Кнопка нашего кошелька предлагает нам подключить MetaMask, хотя он уже подключен...

Однако, не бойтесь! Мы легко можем решить эту проблему (поняли каламбур с адресом?). реализовав `getCurrentWalletConnected`, которая проверит, подключен ли уже адрес к нашему децентрализованному приложению, и соответствующим образом обновит наш пользовательский интерфейс!

#### Функция `getCurrentWalletConnected` {#the-getcurrentwalletconnected-function}

Обновите вашу функцию `getCurrentWalletConnected` в файле `interact.js` до следующего:

```javascript
// interact.js

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Напишите сообщение в текстовом поле выше.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Подключитесь к MetaMask, используя кнопку в правом верхнем углу.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              Вы должны установить MetaMask, виртуальный кошелек Ethereum, в свой
              браузер.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Этот код _очень_ похож на функцию `connectWallet`, которую мы только что написали в предыдущем шаге.

Основное отличие состоит в том, что вместо вызова метода `eth_requestAccounts`, который открывает MetaMask для подключения пользователя к кошельку, мы вызываем метод `eth_accounts`, который просто возвращает массив с адресами MetaMask, которые в данный момент подключены к нашему децентрализованному приложению.

Чтобы увидеть эту функцию в действии, давайте вызовем ее в нашей функции `useEffect` нашего компонента `HelloWorld.js`:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Обратите внимание: мы используем ответ на наш вызов `getCurrentWalletConnected` для обновления наших переменных состояния `walletAddress` и `status`.

Теперь, когда вы добавили этот код, давайте попробуем обновить окно нашего браузера.

Отличнооооо! На кнопке должно быть указано, что вы подключены, и показан предварительный просмотр адреса вашего подключенного кошелька — даже после обновления!

#### Реализуйте `addWalletListener` {#implement-addwalletlistener}

Последним шагом в настройке нашего кошелька в децентрализированном приложении является реализация прослушивателя кошелька, чтобы наш пользовательский интерфейс обновлялся при изменении состояния нашего кошелька, например, когда пользователь отключает или переключает учетные записи.

В вашем файле `HelloWorld.js` измените вашу функцию `addWalletListener` следующим образом:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Напишите сообщение в текстовом поле выше.")
      } else {
        setWallet("")
        setStatus("🦊 Подключитесь к MetaMask, используя кнопку в правом верхнем углу.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          Вы должны установить MetaMask, виртуальный кошелек Ethereum, в свой браузер.
        </a>
      </p>
    )
  }
}
```

Спорим, вам даже не нужна наша помощь, чтобы понять, что здесь происходит, но для полноты картины давайте быстро разберем это:

- Сначала наша функция проверяет, включен ли `window.ethereum` (т. е. установлен ли MetaMask).
  - Если нет, мы просто устанавливаем для нашей переменной состояния `status` строку JSX, которая предлагает пользователю установить MetaMask.
  - Если он включен, мы устанавливаем прослушиватель `window.ethereum.on("accountsChanged")` в строке 3, который прослушивает изменения состояния в кошельке MetaMask, включая подключение пользователем дополнительного аккаунта к децентрализованному приложению, переключение аккаунтов или отключение аккаунта. Если подключен хотя бы один аккаунт, переменная состояния `walletAddress` обновляется как первый аккаунт в массиве `accounts`, возвращаемом прослушивателем. В противном случае `walletAddress` устанавливается как пустая строка.

И последнее, но не менее важное: мы должны вызвать ее в нашей функции `useEffect`:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

Вот и все! Мы успешно завершили программирование всей функциональности нашего кошелька! Теперь перейдем к нашей последней задаче: обновлению сообщения, хранящегося в нашем смарт-контракте!

### Шаг 6: Реализуйте функцию `updateMessage` {#step-6-implement-the-updateMessage-function}

Итак, друзья, мы на финишной прямой! В `updateMessage` вашего файла `interact.js` мы сделаем следующее:

1. Убедитесь, что сообщение, которое мы хотим опубликовать в нашем смарт-контакте, является действительным
2. Подписать нашу транзакцию с помощью MetaMask
3. Вызвать эту функцию из нашего фронтенд-компонента `HelloWorld.js`

Это не займет много времени; давайте завершим это децентрализованное приложение!

#### Обработка ошибок ввода {#input-error-handling}

Естественно, имеет смысл иметь некоторую обработку ошибок ввода в начале функции.

Мы хотим, чтобы наша функция завершалась раньше, если не установлено расширение MetaMask, не подключен кошелек (т. е. переданный `address` является пустой строкой) или `message` является пустой строкой. Давайте добавим следующую обработку ошибок в `updateMessage`:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Подключите свой кошелек MetaMask, чтобы обновить сообщение в блокчейне.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Ваше сообщение не может быть пустой строкой.",
    }
  }
}
```

Теперь, когда у нас есть правильная обработка ошибок ввода, пришло время подписать транзакцию через MetaMask!

#### Подписание нашей транзакции {#signing-our-transaction}

Если вы уже знакомы с традиционными транзакциями Ethereum в web3, код, который мы напишем дальше, будет вам очень знаком. Ниже вашего кода обработки ошибок ввода добавьте следующее в `updateMessage`:

```javascript
// interact.js

//настройка параметров транзакции
const transactionParameters = {
  to: contractAddress, // Обязательно, кроме случаев публикации контракта.
  from: address, // должен совпадать с активным адресом пользователя.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//подписание транзакции
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    status: (
      <span>
        ✅{" "}
        <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
          Посмотрите статус вашей транзакции на Etherscan!
        </a>
        <br />
        ℹ️ Как только транзакция будет проверена сетью, сообщение будет
        обновлено автоматически.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

Давайте разберемся, что происходит. Сначала мы настраиваем параметры наших транзакций, где:

- `to` указывает адрес получателя (наш смарт-контракт)
- `from` указывает подписанта транзакции, переменную `address`, которую мы передали в нашу функцию
- `data` содержит вызов метода `update` нашего смарт-контракта Hello World, получая нашу строковую переменную `message` в качестве входных данных

Затем мы делаем вызов await, `window.ethereum.request`, где мы просим MetaMask подписать транзакцию. Обратите внимание, в строках 11 и 12 мы указываем наш метод eth, `eth_sendTransaction`, и передаем наши `transactionParameters`.

На этом этапе MetaMask откроется в браузере и предложит пользователю подписать или отклонить транзакцию.

- Если транзакция будет успешной, функция вернет объект JSON, где строковая JSX `status` предлагает пользователю проверить Etherscan для получения дополнительной информации о своей транзакции.
- Если транзакция не удастся, функция вернет объект JSON, где строковая `status` передает сообщение об ошибке.

В целом, наша функция `updateMessage` должна выглядеть так:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //обработка ошибок ввода
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Подключите свой кошелек MetaMask, чтобы обновить сообщение в блокчейне.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Ваше сообщение не может быть пустой строкой.",
    }
  }

  //настройка параметров транзакции
  const transactionParameters = {
    to: contractAddress, // Обязательно, кроме случаев публикации контракта.
    from: address, // должен совпадать с активным адресом пользователя.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //подписание транзакции
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
            Посмотрите статус вашей транзакции на Etherscan!
          </a>
          <br />
          ℹ️ Как только транзакция будет проверена сетью, сообщение будет
          обновлено автоматически.
        </span>
      ),
    }
  } catch (error) {
    return {
      status: "😥 " + error.message,
    }
  }
}
```

И последнее, но не менее важное: нам нужно подключить нашу функцию `updateMessage` к нашему компоненту `HelloWorld.js`.

#### Подключите `updateMessage` к фронтенду `HelloWorld.js` {#connect-updatemessage-to-the-helloworld-js-frontend}

Наша функция `onUpdatePressed` должна сделать вызов await к импортированной функции `updateMessage` и изменить переменную состояния `status`, чтобы отразить, удалась ли наша транзакция или нет:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

Это очень чисто и просто. И угадайте что... ВАШЕ ДЕЦЕНТРАЛИЗОВАННОЕ ПРИЛОЖЕНИЕ ГОТОВО!!!

Вперед, протестируйте кнопку **Обновить**!

### Создайте свое собственное децентрализованное приложение {#make-your-own-custom-dapp}

Ура, вы дошли до конца руководства! Подведем итоги, вы научились:

- Подключить кошелек MetaMask к вашему проекту децентрализованного приложения
- Считывать данные с вашего смарт-контракта с помощью API [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Подписывать транзакции Ethereum с помощью MetaMask

Теперь вы полностью готовы применить навыки из этого руководства для создания своего собственного проекта децентрализованного приложения! Как всегда, если у вас есть какие-либо вопросы, не стесняйтесь обращаться к нам за помощью в [Discord Alchemy](https://discord.gg/gWuC7zB). 🧙‍♂️

Как только вы завершите это руководство, дайте нам знать, как прошел ваш опыт или если у вас есть какие-либо отзывы, отметив нас в Twitter [@alchemyplatform](https://twitter.com/AlchemyPlatform)!
