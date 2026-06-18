---
title: Смарт-контракт Hello World для начинающих — Fullstack
description: Вводное руководство по написанию и развертыванию простого смарт-контракта в Эфириуме.
author: "nstrike2"
breadcrumb: Hello World fullstack
tags:
  [
    "solidity",
    "hardhat",
    "alchemy",
    "смарт-контракты",
    "развертывание",
    "обозреватель блоков",
    "фронтенд",
    "транзакции",
    "фреймворк",
  ]
skill: beginner
lang: ru
published: 2021-10-25
---

Это руководство для вас, если вы новичок в разработке на блокчейне и не знаете, с чего начать или как развертывать смарт-контракты и взаимодействовать с ними. Мы шаг за шагом рассмотрим создание и развертывание простого смарт-контракта в тестовой сети Гёрли с использованием [МетаМаск](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org) и [Alchemy](https://alchemy.com/eth).

Для прохождения этого руководства вам понадобится аккаунт Alchemy. [Зарегистрируйте бесплатный аккаунт](https://www.alchemy.com/).

Если у вас возникнут вопросы на любом этапе, не стесняйтесь обращаться в [Дискорд Alchemy](https://discord.gg/gWuC7zB)!

## Часть 1. Создание и развертывание смарт-контракта с помощью Hardhat {#part-1}

### Подключение к сети Эфириум {#connect-to-the-ethereum-network}

Существует множество способов делать запросы к цепи Эфириум. Для простоты мы будем использовать бесплатный аккаунт на Alchemy — платформе для разработчиков блокчейна и API, которая позволяет нам взаимодействовать с цепью Эфириум без необходимости самостоятельно запускать узел. Alchemy также предоставляет инструменты разработчика для мониторинга и аналитики; мы воспользуемся ими в этом руководстве, чтобы понять, как технически устроено развертывание нашего смарт-контракта.

### Создание приложения и ключа API {#create-your-app-and-api-key}

После создания аккаунта Alchemy вы можете сгенерировать ключ API, создав приложение. Это позволит вам делать запросы к тестовой сети Гёрли. Если вы не знакомы с тестовыми сетями, вы можете [прочитать руководство Alchemy по выбору сети](https://www.alchemy.com/docs/choosing-a-web3-network).

На панели управления Alchemy найдите выпадающее меню **Apps** (Приложения) в панели навигации и нажмите **Create App** (Создать приложение).

![Hello world create app](./hello-world-create-app.png)

Дайте вашему приложению имя «_Hello World_» и напишите краткое описание. Выберите **Staging** в качестве среды и **Goerli** в качестве сети.

![create app view hello world](./create-app-view-hello-world.png)

_Примечание: обязательно выберите **Гёрли**, иначе это руководство не сработает._

Нажмите **Create app**. Ваше приложение появится в таблице ниже.

### Создание аккаунта Эфириум {#create-an-ethereum-account}

Вам нужен аккаунт Эфириум для отправки и получения транзакций. Мы будем использовать МетаМаск — виртуальный кошелек в браузере, который позволяет пользователям управлять адресом своего аккаунта Эфириум.

Вы можете бесплатно скачать и создать аккаунт МетаМаск [здесь](https://metamask.io/download). При создании аккаунта, или если он у вас уже есть, обязательно переключитесь на «Goerli Test Network» (Тестовая сеть Гёрли) в правом верхнем углу (чтобы мы не имели дело с реальными деньгами).

### Шаг 4. Добавление эфира из крана {#step-4-add-ether-from-a-faucet}

Чтобы развернуть ваш смарт-контракт в тестовой сети, вам понадобится немного тестовых ETH. Чтобы получить ETH в сети Гёрли, перейдите к крану Гёрли и введите адрес вашего аккаунта Гёрли. Обратите внимание, что в последнее время краны Гёрли могут работать нестабильно — посмотрите [страницу тестовых сетей](/developers/docs/networks/#goerli) для списка доступных вариантов:

_Примечание: из-за перегруженности сети это может занять некоторое время._
``

### Шаг 5. Проверка баланса {#step-5-check-your-balance}

Чтобы убедиться, что ETH поступили на ваш кошелек, давайте сделаем запрос [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) с помощью [инструмента composer от Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Это вернет количество ETH в нашем кошельке. Чтобы узнать больше, посмотрите [краткое руководство Alchemy по использованию инструмента composer](https://youtu.be/r6sjRxBZJuU).

Введите адрес вашего аккаунта МетаМаск и нажмите **Send Request** (Отправить запрос). Вы увидите ответ, похожий на фрагмент кода ниже.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _Примечание: этот результат указан в wei, а не в ETH. Wei используется как наименьшая единица измерения эфира._

Фух! Наши тестовые деньги на месте.

### Шаг 6. Инициализация проекта {#step-6-initialize-our-project}

Сначала нам нужно создать папку для нашего проекта. Перейдите в командную строку и введите следующее:

```
mkdir hello-world
cd hello-world
```

Теперь, когда мы находимся внутри папки нашего проекта, мы используем `npm init` для инициализации проекта.

> Если у вас еще не установлен npm, следуйте [этим инструкциям по установке Node.js и npm](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm).

В рамках этого руководства не имеет значения, как вы ответите на вопросы при инициализации. Вот как это сделали мы для примера:

```
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)

About to write to /Users/.../.../.../hello-world/package.json:

{
   "name": "hello-world",
   "version": "1.0.0",
   "description": "hello world smart contract",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

Подтвердите создание package.json, и мы готовы продолжать!

### Шаг 7. Загрузка Hardhat {#step-7-download-hardhat}

Hardhat — это среда разработки для компиляции, развертывания, тестирования и отладки вашего программного обеспечения для Эфириума. Она помогает разработчикам при локальном создании смарт-контрактов и децентрализованных приложений (dapp) перед их развертыванием в рабочей цепи.

Внутри нашего проекта `hello-world` выполните:

```
npm install --save-dev hardhat
```

Посетите эту страницу для получения более подробных [инструкций по установке](https://hardhat.org/getting-started/#overview).

### Шаг 8. Создание проекта Hardhat {#step-8-create-hardhat-project}

Внутри папки нашего проекта `hello-world` выполните:

```
npx hardhat
```

После этого вы должны увидеть приветственное сообщение и возможность выбрать, что вы хотите сделать. Выберите «create an empty hardhat.config.js»:

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Это создаст файл `hardhat.config.js` в проекте. Мы будем использовать его позже в этом руководстве для указания настроек нашего проекта.

### Шаг 9. Добавление папок проекта {#step-9-add-project-folders}

Чтобы поддерживать порядок в проекте, давайте создадим две новые папки. В командной строке перейдите в корневой каталог вашего проекта `hello-world` и введите:

```
mkdir contracts
mkdir scripts
```

- `contracts/` — здесь мы будем хранить файл с кодом нашего смарт-контракта hello world
- `scripts/` — здесь мы будем хранить скрипты для развертывания и взаимодействия с нашим контрактом

### Шаг 10. Написание контракта {#step-10-write-our-contract}

Вы можете спросить себя: когда же мы начнем писать код? Время пришло!

Откройте проект hello-world в вашем любимом редакторе. Смарт-контракты чаще всего пишутся на Solidity, который мы и будем использовать для написания нашего смарт-контракта.‌

1. Перейдите в папку `contracts` и создайте новый файл с именем `HelloWorld.sol`
2. Ниже приведен пример смарт-контракта Hello World, который мы будем использовать в этом руководстве. Скопируйте содержимое ниже в файл `HelloWorld.sol`.

_Примечание: обязательно прочитайте комментарии, чтобы понять, что делает этот контракт._

```
// Указывает версию Solidity, используя семантическое версионирование.
// Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Определяет контракт с именем `HelloWorld`.
// Контракт — это набор функций и данных (его состояние). После развертывания контракт находится по определенному адресу в блокчейне Эфириум. Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Вызывается при вызове функции update
   // События смарт-контракта — это способ для вашего контракта сообщить фронтенду вашего приложения о том, что что-то произошло в блокчейне. Фронтенд может «слушать» определенные события и выполнять действия при их возникновении.
   event UpdatedMessages(string oldStr, string newStr);

   // Объявляет переменную состояния `message` типа `string`.
   // Переменные состояния — это переменные, значения которых постоянно хранятся в хранилище контракта. Ключевое слово `public` делает переменные доступными извне контракта и создает функцию, которую другие контракты или клиенты могут вызывать для доступа к значению.
   string public message;

   // Как и во многих классовых объектно-ориентированных языках, конструктор — это специальная функция, которая выполняется только при создании контракта.
   // Конструкторы используются для инициализации данных контракта. Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Принимает строковый аргумент `initMessage` и устанавливает значение в переменную хранилища контракта `message`.
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

Это базовый смарт-контракт, который сохраняет сообщение при создании. Его можно обновить, вызвав функцию `update`.

### Шаг 11. Подключение МетаМаск и Alchemy к вашему проекту {#step-11-connect-metamask-alchemy-to-your-project}

Мы создали кошелек МетаМаск, аккаунт Alchemy и написали наш смарт-контракт, теперь пришло время соединить их вместе.

Каждая транзакция, отправленная с вашего кошелька, требует подписи с использованием вашего уникального закрытого ключа. Чтобы предоставить нашей программе это разрешение, мы можем безопасно сохранить наш закрытый ключ в файле окружения. Здесь же мы сохраним ключ API для Alchemy.

> Чтобы узнать больше об отправке транзакций, ознакомьтесь с [этим руководством](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project) по отправке транзакций с использованием Web3.

Сначала установите пакет dotenv в каталоге вашего проекта:

```
npm install dotenv --save
```

Затем создайте файл `.env` в корневом каталоге проекта. Добавьте в него ваш закрытый ключ МетаМаск и HTTP URL API Alchemy.

Ваш файл окружения должен называться `.env`, иначе он не будет распознан как файл окружения.

Не называйте его `process.env`, `.env-custom` или как-либо еще.

- Следуйте [этим инструкциям](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key), чтобы экспортировать ваш закрытый ключ
- См. ниже, чтобы получить HTTP URL API Alchemy

![Animated walkthrough of getting an Alchemy API key](./get-alchemy-api-key.gif)

Ваш `.env` должен выглядеть так:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Чтобы фактически подключить их к нашему коду, мы сошлемся на эти переменные в нашем файле `hardhat.config.js` на шаге 13.

### Шаг 12. Установка Ethers.js {#step-12-install-ethersjs}

Ethers.js — это библиотека, которая упрощает взаимодействие и выполнение запросов к Эфириуму, оборачивая [стандартные методы JSON-RPC](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) в более удобные для пользователя методы.

Hardhat позволяет нам интегрировать [плагины](https://hardhat.org/plugins/) для дополнительных инструментов и расширенной функциональности. Мы воспользуемся [плагином Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) для развертывания контракта.

В каталоге вашего проекта введите:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### Шаг 13. Обновление hardhat.config.js {#step-13-update-hardhat-configjs}

К этому моменту мы добавили несколько зависимостей и плагинов, теперь нам нужно обновить `hardhat.config.js`, чтобы наш проект знал о них всех.

Обновите ваш `hardhat.config.js`, чтобы он выглядел так:

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

### Шаг 14. Компиляция контракта {#step-14-compile-our-contract}

Чтобы убедиться, что все работает, давайте скомпилируем наш контракт. Задача `compile` — одна из встроенных задач Hardhat.

Из командной строки выполните:

```bash
npx hardhat compile
```

Вы можете получить предупреждение о `SPDX license identifier not provided in source file`, но не стоит об этом беспокоиться — надеемся, что все остальное выглядит хорошо! Если нет, вы всегда можете написать в [Дискорд Alchemy](https://discord.gg/u72VCg3).

### Шаг 15. Написание скрипта развертывания {#step-15-write-our-deploy-script}

Теперь, когда наш контракт написан, а конфигурационный файл готов к работе, пришло время написать скрипт развертывания контракта.

Перейдите в папку `scripts/` и создайте новый файл с именем `deploy.js`, добавив в него следующее содержимое:

```javascript
async function main() {
  const HelloWorld = await ethers.getКонтрактFactory("HelloWorld")

  // Начать развертывание, возвращая промис, который разрешается в объект контракта
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Contract deployed to address:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat отлично объясняет, что делает каждая из этих строк кода, в своем [руководстве по контрактам](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), и мы позаимствовали их объяснения здесь.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

`ContractFactory` в ethers.js — это абстракция, используемая для развертывания новых смарт-контрактов, поэтому `HelloWorld` здесь является [фабрикой](<https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)>) для экземпляров нашего контракта hello world. При использовании плагина `hardhat-ethers` экземпляры `ContractFactory` и `Contract` по умолчанию подключаются к первому подписанту (владельцу).

```javascript
const hello_world = await HelloWorld.deploy()
```

Вызов `deploy()` на `ContractFactory` запустит развертывание и вернет `Promise`, который разрешается в объект `Contract`. Это объект, который имеет метод для каждой из функций нашего смарт-контракта.

### Шаг 16. Развертывание контракта {#step-16-deploy-our-contract}

Мы наконец-то готовы развернуть наш смарт-контракт! Перейдите в командную строку и выполните:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

После этого вы должны увидеть что-то вроде:

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**Пожалуйста, сохраните этот адрес**. Мы будем использовать его позже в этом руководстве.

Если мы перейдем в [Etherscan Гёрли](https://goerli.etherscan.io) и выполним поиск по адресу нашего контракта, мы должны увидеть, что он был успешно развернут. Транзакция будет выглядеть примерно так:

![](./etherscan-contract.png)

Адрес `From` должен совпадать с адресом вашего аккаунта МетаМаск, а в адресе `To` будет указано **Contract Creation** (Создание контракта). Если мы нажмем на транзакцию, мы увидим адрес нашего контракта в поле `To`.

![](./etherscan-transaction.png)

Поздравляем! Вы только что развернули смарт-контракт в тестовой сети Эфириума.

Чтобы понять, как это технически устроено, давайте перейдем на вкладку Explorer (Обозреватель) на нашей [панели управления Alchemy](https://dashboard.alchemy.com/explorer). Если у вас несколько приложений Alchemy, обязательно отфильтруйте их по приложению и выберите **Hello World**.

![](./hello-world-explorer.png)

Здесь вы увидите несколько методов JSON-RPC, которые Hardhat/Ethers выполнили для нас в фоновом режиме, когда мы вызвали функцию `.deploy()`. Два важных метода здесь — это [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), который является запросом на запись нашего контракта в цепь Гёрли, и [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash), который является запросом на чтение информации о нашей транзакции по заданному хешу. Чтобы узнать больше об отправке транзакций, ознакомьтесь с [нашим руководством по отправке транзакций с использованием Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

## Часть 2: Взаимодействие с вашим смарт-контрактом {#part-2-interact-with-your-smart-contract}

Теперь, когда мы успешно развернули смарт-контракт в сети Гёрли, давайте узнаем, как с ним взаимодействовать.

### Создайте файл interact.js {#create-a-interactjs-file}

В этом файле мы напишем наш скрипт взаимодействия. Мы будем использовать библиотеку Ethers.js, которую вы установили ранее в Части 1.

Внутри папки `scripts/` создайте новый файл с именем `interact.js` и добавьте следующий код:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### Обновите ваш файл .env {#update-your-env-file}

Мы будем использовать новые переменные окружения, поэтому нам нужно определить их в файле `.env`, который [мы создали ранее](#step-11-connect-metamask-alchemy-to-your-project).

Нам нужно будет добавить определение для нашего `API_KEY` Alchemy и `CONTRACT_ADDRESS`, по которому был развернут ваш смарт-контракт.

Ваш файл `.env` должен выглядеть примерно так:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### Получите ABI вашего контракта {#grab-your-contract-abi}

[ABI (двоичный интерфейс приложения)](/glossary/#abi) нашего контракта — это интерфейс для взаимодействия с нашим смарт-контрактом. Hardhat автоматически генерирует ABI и сохраняет его в `HelloWorld.json`. Чтобы использовать ABI, нам нужно будет извлечь его содержимое, добавив следующие строки кода в наш файл `interact.js`:

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

Для взаимодействия с нашим контрактом нам нужно создать экземпляр контракта в нашем коде. Чтобы сделать это с помощью Ethers.js, нам нужно будет поработать с тремя концепциями:

1. Провайдер (Провайдер) — провайдер узла, который дает вам доступ на чтение и запись в блокчейн
2. Подписант (Подписант) — представляет аккаунт Эфириума, который может подписывать транзакции
3. Контракт (Contract) — объект Ethers.js, представляющий конкретный контракт, развернутый в сети

Мы будем использовать ABI контракта из предыдущего шага для создания нашего экземпляра контракта:

```javascript
// interact.js

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Contract
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

Узнайте больше о провайдерах, подписантах и контрактах в [документации ethers.js](https://docs.ethers.io/v5/).

### Прочитайте начальное сообщение {#read-the-init-message}

Помните, когда мы развернули наш контракт с `initMessage = "Hello world!"`? Теперь мы собираемся прочитать это сообщение, сохраненное в нашем смарт-контракте, и вывести его в консоль.

В JavaScript асинхронные функции используются при взаимодействии с сетями. Чтобы узнать больше об асинхронных функциях, [прочитайте эту статью на Medium](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

Используйте приведенный ниже код, чтобы вызвать функцию `message` в нашем смарт-контракте и прочитать начальное сообщение:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```

После запуска файла с помощью `npx hardhat run scripts/interact.js` в терминале мы должны увидеть этот ответ:

```
Сообщение: Hello world!
```

Поздравляем! Вы только что успешно прочитали данные смарт-контракта из блокчейна Эфириума, так держать!

### Обновите сообщение {#update-the-message}

Вместо того чтобы просто читать сообщение, мы также можем обновить сообщение, сохраненное в нашем смарт-контракте, используя функцию `update`! Довольно круто, правда?

Чтобы обновить сообщение, мы можем напрямую вызвать функцию `update` в нашем созданном объекте Contract:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("This is the new message.")
  await tx.wait()
}
main()
```

Обратите внимание, что в строке 11 мы вызываем `.wait()` для возвращенного объекта транзакции. Это гарантирует, что наш скрипт дождется майнинга транзакции в блокчейне перед выходом из функции. Если вызов `.wait()` не включен, скрипт может не увидеть обновленное значение `message` в контракте.

### Прочитайте новое сообщение {#read-the-new-message}

Вы должны иметь возможность повторить [предыдущий шаг](#read-the-init-message), чтобы прочитать обновленное значение `message`. Потратьте минутку и посмотрите, сможете ли вы внести необходимые изменения, чтобы вывести это новое значение!

Если вам нужна подсказка, вот как должен выглядеть ваш файл `interact.js` на данный момент:

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
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("this is the new message")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("The new message is: " + newMessage)
}

main()
```

Теперь просто запустите скрипт, и вы должны увидеть старое сообщение, статус обновления и новое сообщение, выведенные в ваш терминал!

`npx hardhat run scripts/interact.js --network goerli`

```
Сообщение: Hello World!
Обновление сообщения...
Новое сообщение: This is the new message.
```

Во время выполнения этого скрипта вы можете заметить, что шаг `Updating the message...` занимает некоторое время перед загрузкой нового сообщения. Это связано с процессом майнинга; если вам интересно отслеживать транзакции во время их майнинга, посетите [мемпул Alchemy](https://dashboard.alchemyapi.io/mempool), чтобы увидеть статус транзакции. Если транзакция отклонена, также полезно проверить [Etherscan для Гёрли](https://goerli.etherscan.io) и найти хеш вашей транзакции.

## Часть 3: Публикация вашего смарт-контракта на Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

Вы проделали всю тяжелую работу по воплощению вашего смарт-контракта в жизнь; теперь пришло время поделиться им со всем миром!

Верифицировав ваш смарт-контракт на Etherscan, любой желающий сможет просмотреть ваш исходный код и взаимодействовать с вашим смарт-контрактом. Давайте начнем!

### Шаг 1: Создайте ключ API в вашем аккаунте Etherscan {#step-1-generate-an-api-key-on-your-etherscan-account}

Ключ API Etherscan необходим для подтверждения того, что вы являетесь владельцем смарт-контракта, который пытаетесь опубликовать.

Если у вас еще нет аккаунта на Etherscan, [зарегистрируйтесь](https://etherscan.io/register).

После входа в систему найдите свое имя пользователя на панели навигации, наведите на него курсор и выберите кнопку **My profile**.

На странице вашего профиля вы должны увидеть боковую панель навигации. На боковой панели навигации выберите **API Keys**. Затем нажмите кнопку "Add", чтобы создать новый ключ API, назовите ваше приложение **hello-world** и нажмите кнопку **Create New API Key**.

Ваш новый ключ API должен появиться в таблице ключей API. Скопируйте ключ API в буфер обмена.

Далее нам нужно добавить ключ API Etherscan в наш файл `.env`.

После его добавления ваш файл `.env` должен выглядеть так:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Смарт-контракты, развернутые с помощью Hardhat {#hardhat-deployed-smart-contracts}

#### Установка hardhat-etherscan {#install-hardhat-etherscan}

Опубликовать ваш контракт на Etherscan с помощью Hardhat очень просто. Для начала вам нужно будет установить плагин `hardhat-etherscan`. `hardhat-etherscan` автоматически верифицирует исходный код смарт-контракта и ABI на Etherscan. Чтобы добавить его, в каталоге `hello-world` выполните:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

После установки включите следующее выражение в начало вашего файла `hardhat.config.js` и добавьте параметры конфигурации Etherscan:

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

#### Верификация вашего смарт-контракта на Etherscan {#verify-your-smart-contract-on-etherscan}

Убедитесь, что все файлы сохранены, а все переменные `.env` настроены правильно.

Запустите задачу `verify`, передав адрес контракта и сеть, в которой он развернут:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

Убедитесь, что `DEPLOYED_CONTRACT_ADDRESS` — это адрес вашего развернутого смарт-контракта в тестовой сети Гёрли. Кроме того, последний аргумент (`'Hello World!'`) должен быть тем же строковым значением, которое использовалось [на этапе развертывания в части 1](#step-15-write-our-deploy-script).

Если все пройдет хорошо, вы увидите следующее сообщение в вашем терминале:

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

Поздравляем! Код вашего смарт-контракта теперь на Etherscan!

### Посмотрите ваш смарт-контракт на Etherscan! {#check-out-your-smart-contract-on-etherscan}

Перейдя по ссылке, указанной в вашем терминале, вы сможете увидеть код вашего смарт-контракта и ABI, опубликованные на Etherscan!

**Ура — вы сделали это, чемпион! Теперь любой может вызывать ваш смарт-контракт или записывать в него данные! Нам не терпится увидеть, что вы создадите дальше!**

## Часть 4. Интеграция смарт-контракта с фронтендом {#part-4-integrating-your-smart-contract-with-the-frontend}

К концу этого руководства вы узнаете, как:

- Подключить кошелек МетаМаск к вашему децентрализованному приложению (dapp)
- Читать данные из вашего смарт-контракта с помощью API [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Подписывать транзакции Эфириума с помощью МетаМаск

Для этого dapp мы будем использовать [React](https://react.dev/) в качестве фронтенд-фреймворка. Однако важно отметить, что мы не будем тратить много времени на разбор его основ, так как в основном сосредоточимся на добавлении функциональности Web3 в наш проект.

В качестве предварительного условия вы должны понимать React на начальном уровне. Если это не так, мы рекомендуем пройти официальное [Введение в React](https://react.dev/learn).

### Клонирование стартовых файлов {#clone-the-starter-files}

Сначала перейдите в [репозиторий hello-world-part-four на GitHub](https://github.com/alchemyplatform/hello-world-part-four-tutorial), чтобы получить стартовые файлы для этого проекта, и клонируйте этот репозиторий на свой локальный компьютер.

Откройте клонированный репозиторий локально. Обратите внимание, что он содержит две папки: `starter-files` и `completed`.

- `starter-files` — **мы будем работать в этом каталоге**, мы подключим пользовательский интерфейс к вашему кошельку Эфириума и смарт-контракту, который мы опубликовали на Etherscan в [Части 3](#part-3-publish-your-smart-contract-to-etherscan).
- `completed` содержит полностью завершенное руководство и должна использоваться только в качестве справочника, если вы застрянете.

Затем откройте вашу копию `starter-files` в вашем любимом редакторе кода и перейдите в папку `src`.

Весь код, который мы напишем, будет находиться в папке `src`. Мы будем редактировать компонент `HelloWorld.js` и JavaScript-файлы `util/interact.js`, чтобы добавить в наш проект функциональность Web3.

### Изучение стартовых файлов {#check-out-the-starter-files}

Прежде чем мы начнем писать код, давайте изучим, что предоставляется нам в стартовых файлах.

#### Запуск вашего проекта на React {#get-your-react-project-running}

Давайте начнем с запуска проекта на React в нашем браузере. Прелесть React в том, что как только наш проект запущен в браузере, любые сохраняемые нами изменения будут обновляться в браузере в реальном времени.

Чтобы запустить проект, перейдите в корневой каталог папки `starter-files` и выполните `npm install` в вашем терминале для установки зависимостей проекта:

```bash
cd starter-files
npm install
```

Как только их установка завершится, выполните `npm start` в вашем терминале:

```bash
npm start
```

После этого в вашем браузере должна открыться страница [http://localhost:3000/](http://localhost:3000/), где вы увидите фронтенд нашего проекта. Он должен состоять из одного поля (места для обновления сообщения, хранящегося в вашем смарт-контракте), кнопки «Connect Wallet» (Подключить кошелек) и кнопки «Update» (Обновить).

Если вы попробуете нажать на любую из кнопок, вы заметите, что они не работают — это потому, что нам еще нужно запрограммировать их функциональность.

#### Компонент `HelloWorld.js` {#the-helloworld-js-component}

Давайте вернемся в папку `src` в нашем редакторе и откроем файл `HelloWorld.js`. Очень важно, чтобы мы понимали все в этом файле, так как это основной компонент React, с которым мы будем работать.

В верхней части этого файла вы заметите несколько инструкций импорта, которые необходимы для запуска нашего проекта, включая библиотеку React, хуки useEffect и useState, некоторые элементы из `./util/interact.js` (мы подробно опишем их в ближайшее время!) и логотип Alchemy.

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
const [message, setMessage] = useState("No connection to the network.")
const [newMessage, setNewMessage] = useState("")
```

Вот что представляет собой каждая из переменных:

- `walletAddress` — строка, в которой хранится адрес кошелька пользователя
- `status` — строка, в которой хранится полезное сообщение, подсказывающее пользователю, как взаимодействовать с dapp
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

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) — это хук React, который вызывается после рендеринга вашего компонента. Поскольку в него передается пустой массив `[]` (см. строку 4), он будет вызван только при _первом_ рендеринге компонента. Здесь мы загрузим текущее сообщение, хранящееся в нашем смарт-контракте, вызовем слушатели нашего смарт-контракта и кошелька, а также обновим наш пользовательский интерфейс, чтобы отразить, подключен ли уже кошелек.
- `addSmartContractListener` — эта функция настраивает слушатель, который будет следить за событием `UpdatedMessages` нашего контракта HelloWorld и обновлять наш пользовательский интерфейс при изменении сообщения в нашем смарт-контракте.
- `addWalletListener` — эта функция настраивает слушатель, который обнаруживает изменения в состоянии кошелька МетаМаск пользователя, например, когда пользователь отключает свой кошелек или переключает адреса.
- `connectWalletPressed` — эта функция будет вызываться для подключения кошелька МетаМаск пользователя к нашему dapp.
- `onUpdatePressed` — эта функция будет вызываться, когда пользователь захочет обновить сообщение, хранящееся в смарт-контракте.

Ближе к концу этого файла находится пользовательский интерфейс нашего компонента.

```javascript
// HelloWorld.js

//пользовательский интерфейс нашего компонента
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Current Message:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>New Message:</h2>

    <div>
      <input
        type="text"
        placeholder="Update the message in your smart contract."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Update
      </button>
    </div>
  </div>
)
```

Если вы внимательно изучите этот код, то заметите, где мы используем наши различные переменные состояния в пользовательском интерфейсе:

- В строках 6-12, если кошелек пользователя подключен (т. е. `walletAddress.length > 0`), мы отображаем усеченную версию `walletAddress` пользователя на кнопке с ID «walletButton»; в противном случае на ней просто написано «Connect Wallet».
- В строке 17 мы отображаем текущее сообщение, хранящееся в смарт-контракте, которое записано в строке `message`.
- В строках 23-26 мы используем [управляемый компонент](https://legacy.reactjs.org/docs/forms.html#controlled-components) для обновления нашей переменной состояния `newMessage` при изменении ввода в текстовом поле.

В дополнение к нашим переменным состояния вы также увидите, что функции `connectWalletPressed` и `onUpdatePressed` вызываются при нажатии кнопок с ID `publishButton` и `walletButton` соответственно.

Наконец, давайте разберемся, куда добавляется этот компонент `HelloWorld.js`.

Если вы перейдете к файлу `App.js`, который является основным компонентом в React и действует как контейнер для всех остальных компонентов, вы увидите, что наш компонент `HelloWorld.js` внедряется в строке 7.

И последнее, но не менее важное: давайте проверим еще один предоставленный вам файл — `interact.js`.

#### Файл `interact.js` {#the-interact-js-file}

Поскольку мы хотим следовать парадигме [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), нам понадобится отдельный файл, содержащий все наши функции для управления логикой, данными и правилами нашего dapp, чтобы затем иметь возможность экспортировать эти функции в наш фронтенд (наш компонент `HelloWorld.js`).

👆🏽Именно для этого и предназначен наш файл `interact.js`!

Перейдите в папку `util` в вашем каталоге `src`, и вы заметите, что мы включили файл с именем `interact.js`, который будет содержать все наши функции и переменные для взаимодействия со смарт-контрактом и кошельком.

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

В верхней части файла вы заметите, что мы закомментировали объект `helloWorldContract`. Позже в этом руководстве мы раскомментируем этот объект и создадим экземпляр нашего смарт-контракта в этой переменной, которую затем экспортируем в наш компонент `HelloWorld.js`.

Четыре нереализованные функции после нашего объекта `helloWorldContract` делают следующее:

- `loadCurrentMessage` — эта функция обрабатывает логику загрузки текущего сообщения, хранящегося в смарт-контракте. Она выполнит вызов _чтения_ к смарт-контракту Hello World с использованием [API Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).
- `connectWallet` — эта функция подключит МетаМаск пользователя к нашему dapp.
- `getCurrentWalletConnected` — эта функция проверит, подключен ли уже аккаунт Эфириума к нашему dapp при загрузке страницы, и соответствующим образом обновит наш пользовательский интерфейс.
- `updateMessage` — эта функция обновит сообщение, хранящееся в смарт-контракте. Она выполнит вызов _записи_ к смарт-контракту Hello World, поэтому кошельку МетаМаск пользователя придется подписать транзакцию Эфириума, чтобы обновить сообщение.

Теперь, когда мы понимаем, с чем работаем, давайте выясним, как читать данные из нашего смарт-контракта!

### Шаг 3. Чтение из вашего смарт-контракта {#step-3-read-from-your-smart-contract}

Чтобы читать данные из вашего смарт-контракта, вам нужно будет успешно настроить:

- API-подключение к цепи Эфириума
- Загруженный экземпляр вашего смарт-контракта
- Функцию для вызова функции вашего смарт-контракта
- Слушатель для отслеживания обновлений при изменении данных, которые вы читаете из смарт-контракта

Может показаться, что это много шагов, но не волнуйтесь! Мы шаг за шагом покажем вам, как выполнить каждый из них! :)

#### Установка API-подключения к цепи Эфириума {#establish-an-api-connection-to-the-ethereum-chain}

Помните, как в Части 2 этого руководства мы использовали наш [ключ Alchemy Web3 для чтения из нашего смарт-контракта](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library)? Вам также понадобится ключ Alchemy Web3 в вашем dapp для чтения из цепи.

Если у вас его еще нет, сначала установите [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), перейдя в корневой каталог вашего `starter-files` и выполнив следующее в вашем терминале:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) — это обертка вокруг [Web3.js](https://docs.web3js.org/), предоставляющая расширенные методы API и другие важные преимущества, чтобы облегчить вашу жизнь как разработчика Web3. Она разработана так, чтобы требовать минимальной настройки, поэтому вы можете сразу начать использовать ее в своем приложении!

Затем установите пакет [dotenv](https://www.npmjs.com/package/dotenv) в каталог вашего проекта, чтобы у нас было безопасное место для хранения нашего API-ключа после его получения.

```text
npm install dotenv --save
```

Для нашего dapp **мы будем использовать наш API-ключ Websockets** вместо нашего API-ключа HTTP, так как это позволит нам настроить слушатель, который обнаруживает изменение сообщения, хранящегося в смарт-контракте.

Как только вы получите свой API-ключ, создайте файл `.env` в вашем корневом каталоге и добавьте в него ваш URL-адрес Alchemy Websockets. После этого ваш файл `.env` должен выглядеть так:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<ключ>
```

Теперь мы готовы настроить нашу конечную точку Alchemy Web3 в нашем dapp! Давайте вернемся к нашему `interact.js`, который вложен в папку `util`, и добавим следующий код в начало файла:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

Выше мы сначала импортировали ключ Alchemy из нашего файла `.env`, а затем передали наш `alchemyKey` в `createAlchemyWeb3` для установки нашей конечной точки Alchemy Web3.

С готовой конечной точкой пришло время загрузить наш смарт-контракт!

#### Загрузка вашего смарт-контракта Hello World {#loading-your-hello-world-smart-contract}

Чтобы загрузить ваш смарт-контракт Hello World, вам понадобятся адрес его контракта и ABI, которые можно найти на Etherscan, если вы завершили [Часть 3 этого руководства.](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)

#### Как получить ABI вашего контракта из Etherscan {#how-to-get-your-contract-abi-from-etherscan}

Если вы пропустили Часть 3 этого руководства, вы можете использовать контракт HelloWorld с адресом [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code). Его ABI можно найти [здесь](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).

ABI контракта необходим для указания того, какую функцию будет вызывать контракт, а также для обеспечения того, что функция вернет данные в ожидаемом вами формате. Как только мы скопируем ABI нашего контракта, давайте сохраним его как JSON-файл с именем `contract-abi.json` в вашем каталоге `src`.

Ваш contract-abi.json должен храниться в папке src.

Вооружившись адресом нашего контракта, ABI и конечной точкой Alchemy Web3, мы можем использовать [метод contract](https://docs.web3js.org/api/web3-eth-contract/class/Contract) для загрузки экземпляра нашего смарт-контракта. Импортируйте ABI вашего контракта в файл `interact.js` и добавьте адрес вашего контракта.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

Теперь мы наконец можем раскомментировать нашу переменную `helloWorldContract` и загрузить смарт-контракт, используя нашу конечную точку AlchemyWeb3:

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

Теперь, когда наш контракт загружен, мы можем реализовать нашу функцию `loadCurrentMessage`!

#### Реализация `loadCurrentMessage` в вашем файле `interact.js` {#implementing-loadcurrentmessage-in-your-interact-js-file}

Эта функция очень проста. Мы собираемся сделать простой асинхронный вызов web3 для чтения из нашего контракта. Наша функция вернет сообщение, хранящееся в смарт-контракте:

Обновите `loadCurrentMessage` в вашем файле `interact.js` следующим образом:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

Поскольку мы хотим отобразить этот смарт-контракт в нашем пользовательском интерфейсе, давайте обновим функцию `useEffect` в нашем компоненте `HelloWorld.js` следующим образом:

```javascript
// HelloWorld.js

//вызывается только один раз
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

Обратите внимание, мы хотим, чтобы наша `loadCurrentMessage` вызывалась только один раз во время первого рендеринга компонента. Вскоре мы реализуем `addSmartContractListener` для автоматического обновления пользовательского интерфейса после изменения сообщения в смарт-контракте.

Прежде чем мы погрузимся в наш слушатель, давайте проверим, что у нас есть на данный момент! Сохраните ваши файлы `HelloWorld.js` и `interact.js`, а затем перейдите на [http://localhost:3000/](http://localhost:3000/)

Вы заметите, что текущее сообщение больше не гласит «No connection to the network» (Нет подключения к сети). Вместо этого оно отражает сообщение, хранящееся в смарт-контракте. Круто!

#### Ваш пользовательский интерфейс теперь должен отражать сообщение, хранящееся в смарт-контракте {#your-ui-should-now-reflect-the-message-stored-in-the-smart-contract}

А теперь поговорим об этом слушателе...

#### Реализация `addSmartContractListener` {#implement-addsmartcontractlistener}

Если вы вспомните файл `HelloWorld.sol`, который мы написали в [Части 1 этой серии руководств](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract), то вспомните, что существует событие смарт-контракта под названием `UpdatedMessages`, которое генерируется после вызова функции `update` нашего смарт-контракта (см. строки 9 и 27):

```javascript
// HelloWorld.sol

// Указывает версию Solidity, используя семантическое версионирование.
// Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// Определяет контракт с именем `HelloWorld`.
// Контракт — это набор функций и данных (его состояние). После развертывания контракт находится по определенному адресу в блокчейне Эфириум. Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Генерируется при вызове функции update
   //События смарт-контракта — это способ для вашего контракта сообщить о том, что что-то произошло в блокчейне, фронтенду вашего приложения, который может «слушать» определенные события и предпринимать действия, когда они происходят.
   event UpdatedMessages(string oldStr, string newStr);

   // Объявляет переменную состояния `message` типа `string`.
   // Переменные состояния — это переменные, значения которых постоянно хранятся в хранилище контракта. Ключевое слово `public` делает переменные доступными извне контракта и создает функцию, которую другие контракты или клиенты могут вызывать для доступа к значению.
   string public message;

   // Подобно многим объектно-ориентированным языкам на основе классов, конструктор — это специальная функция, которая выполняется только при создании контракта.
   // Конструкторы используются для инициализации данных контракта. Узнать больше: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
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

События смарт-контракта — это способ для вашего контракта сообщить вашему фронтенд-приложению о том, что что-то произошло (т. е. произошло _событие_) в блокчейне. Приложение может «слушать» определенные события и предпринимать действия, когда они происходят.

Функция `addSmartContractListener` будет специально слушать событие `UpdatedMessages` нашего смарт-контракта Hello World и обновлять наш пользовательский интерфейс для отображения нового сообщения.

Измените `addSmartContractListener` следующим образом:

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 Your message has been updated!")
    }
  })
}
```

Давайте разберем, что происходит, когда слушатель обнаруживает событие:

- Если при генерации события возникает ошибка, она будет отражена в пользовательском интерфейсе через нашу переменную состояния `status`.
- В противном случае мы будем использовать возвращенный объект `data`. `data.returnValues` — это массив с нулевым индексом, где первый элемент в массиве хранит предыдущее сообщение, а второй элемент хранит обновленное. В целом, при успешном событии мы установим нашу строку `message` на обновленное сообщение, очистим строку `newMessage` и обновим нашу переменную состояния `status`, чтобы отразить, что в нашем смарт-контракте было опубликовано новое сообщение.

Наконец, давайте вызовем наш слушатель в нашей функции `useEffect`, чтобы он инициализировался при первом рендеринге компонента `HelloWorld.js`. В целом, ваша функция `useEffect` должна выглядеть так:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

Теперь, когда мы можем читать из нашего смарт-контракта, было бы здорово выяснить, как в него писать! Однако, чтобы писать в наш dapp, мы должны сначала подключить к нему кошелек Эфириума.

Итак, далее мы займемся настройкой нашего кошелька Эфириума (МетаМаск), а затем подключением его к нашему dapp!

### Шаг 4. Настройка вашего кошелька Эфириума {#step-4-set-up-your-ethereum-wallet}

Чтобы записать что-либо в цепь Эфириума, пользователи должны подписывать транзакции, используя закрытые ключи своего виртуального кошелька. В этом руководстве мы будем использовать [МетаМаск](https://metamask.io/) — виртуальный кошелек в браузере, используемый для управления адресом вашего аккаунта Эфириума, так как он делает подписание транзакций очень простым для конечного пользователя.

Если вы хотите больше узнать о том, как работают транзакции в Эфириуме, ознакомьтесь с [этой страницей](/developers/docs/transactions/) от Ethereum Foundation.

#### Скачивание МетаМаск {#download-metamask}

Вы можете бесплатно скачать и создать аккаунт МетаМаск [здесь](https://metamask.io/download). При создании аккаунта или если у вас уже есть аккаунт, обязательно переключитесь на «Goerli Test Network» (Тестовая сеть Гёрли) в правом верхнем углу (чтобы мы не имели дело с реальными деньгами).

#### Добавление эфира из крана {#add-ether-from-a-faucet}

Чтобы подписать транзакцию в блокчейне Эфириума, нам понадобится немного тестового ETH. Чтобы получить ETH, вы можете перейти на [FaucETH](https://fauceth.komputing.org) и ввести адрес вашего аккаунта Гёрли, нажать «Request funds» (Запросить средства), затем выбрать «Ethereum Testnet Goerli» в выпадающем списке и, наконец, снова нажать кнопку «Request funds». Вскоре после этого вы должны увидеть ETH на своем аккаунте МетаМаск!

#### Проверка вашего баланса {#check-your-balance}

Чтобы дважды проверить наличие нашего баланса, давайте сделаем запрос [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) с помощью [инструмента composer от Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Это вернет количество ETH в нашем кошельке. После того как вы введете адрес своего аккаунта МетаМаск и нажмете «Send Request» (Отправить запрос), вы должны увидеть ответ вроде этого:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**ПРИМЕЧАНИЕ:** Этот результат указан в wei, а не в ETH. Wei используется как наименьший номинал эфира. Конвертация из wei в ETH: 1 ETH = 10¹⁸ wei. Поэтому, если мы переведем 0xde0b6b3a7640000 в десятичную систему, мы получим 1\*10¹⁸, что равно 1 ETH.

Фух! Наши тестовые деньги на месте! 🤑

### Шаг 5. Подключение МетаМаск к вашему пользовательскому интерфейсу {#step-5-connect-metamask-to-your-ui}

Теперь, когда наш кошелек МетаМаск настроен, давайте подключим к нему наш dapp!

#### Функция `connectWallet` {#the-connectwallet-function}

В нашем файле `interact.js` давайте реализуем функцию `connectWallet`, которую мы затем сможем вызвать в нашем компоненте `HelloWorld.js`.

Давайте изменим `connectWallet` следующим образом:

```javascript
// interact.js

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
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
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Итак, что именно делает этот гигантский блок кода?

Ну, во-первых, он проверяет, включен ли `window.ethereum` в вашем браузере.

`window.ethereum` — это глобальный API, внедряемый МетаМаск и другими провайдерами кошельков, который позволяет веб-сайтам запрашивать аккаунты Эфириума пользователей. В случае одобрения он может читать данные из блокчейнов, к которым подключен пользователь, и предлагать пользователю подписывать сообщения и транзакции. Ознакомьтесь с [документацией МетаМаск](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) для получения дополнительной информации!

Если `window.ethereum` _отсутствует_, это означает, что МетаМаск не установлен. В результате возвращается JSON-объект, где возвращаемый `address` является пустой строкой, а JSX-объект `status` сообщает, что пользователь должен установить МетаМаск.

Теперь, если `window.ethereum` _присутствует_, вот тут-то и начинается самое интересное.

Используя блок try/catch, мы попытаемся подключиться к МетаМаск, вызвав [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Вызов этой функции откроет МетаМаск в браузере, после чего пользователю будет предложено подключить свой кошелек к вашему dapp.

- Если пользователь решит подключиться, `method: "eth_requestAccounts"` вернет массив, содержащий все адреса аккаунтов пользователя, которые подключились к dapp. В целом, наша функция `connectWallet` вернет JSON-объект, который содержит _первый_ `address` в этом массиве (см. строку 9) и сообщение `status`, которое предлагает пользователю написать сообщение в смарт-контракт.
- Если пользователь отклоняет подключение, то JSON-объект будет содержать пустую строку для возвращаемого `address` и сообщение `status`, которое отражает, что пользователь отклонил подключение.

Теперь, когда мы написали эту функцию `connectWallet`, следующий шаг — вызвать ее в нашем компоненте `HelloWorld.js`.

#### Добавление функции `connectWallet` в ваш UI-компонент `HelloWorld.js` {#add-the-connectwallet-function-to-your-helloworld-js-ui-component}

Перейдите к функции `connectWalletPressed` в `HelloWorld.js` и обновите ее следующим образом:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Заметили, как большая часть нашей функциональности абстрагирована от нашего компонента `HelloWorld.js` в файле `interact.js`? Это сделано для того, чтобы мы соответствовали парадигме M-V-C!

В `connectWalletPressed` мы просто делаем вызов await к нашей импортированной функции `connectWallet` и, используя ее ответ, обновляем наши переменные `status` и `walletAddress` через их хуки состояния.

Теперь давайте сохраним оба файла (`HelloWorld.js` и `interact.js`) и протестируем наш пользовательский интерфейс на данный момент.

Откройте браузер на странице [http://localhost:3000/](http://localhost:3000/) и нажмите кнопку «Connect Wallet» в правом верхнем углу страницы.

Если у вас установлен МетаМаск, вам будет предложено подключить ваш кошелек к вашему dapp. Примите приглашение на подключение.

Вы должны увидеть, что кнопка кошелька теперь отражает, что ваш адрес подключен! Дааааа 🔥

Далее попробуйте обновить страницу... это странно. Наша кнопка кошелька предлагает нам подключить МетаМаск, хотя он уже подключен...

Однако не бойтесь! Мы легко можем решить эту проблему, реализовав `getCurrentWalletConnected`, который проверит, подключен ли уже адрес к нашему dapp, и соответствующим образом обновит наш пользовательский интерфейс!

#### Функция `getCurrentWalletConnected` {#the-getcurrentwalletconnected-function}

Обновите вашу функцию `getCurrentWalletConnected` в файле `interact.js` следующим образом:

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
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
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
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Этот код _очень_ похож на функцию `connectWallet`, которую мы только что написали на предыдущем шаге.

Главное отличие заключается в том, что вместо вызова метода `eth_requestAccounts`, который открывает МетаМаск для подключения кошелька пользователем, здесь мы вызываем метод `eth_accounts`, который просто возвращает массив, содержащий адреса МетаМаск, подключенные к нашему dapp в данный момент.

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

Обратите внимание, мы используем ответ нашего вызова `getCurrentWalletConnected` для обновления наших переменных состояния `walletAddress` и `status`.

Теперь, когда вы добавили этот код, давайте попробуем обновить окно нашего браузера.

Отличноооо! Кнопка должна говорить, что вы подключены, и показывать предварительный просмотр адреса вашего подключенного кошелька — даже после обновления!

#### Реализация `addWalletListener` {#implement-addwalletlistener}

Последним шагом в настройке кошелька нашего dapp является реализация слушателя кошелька, чтобы наш пользовательский интерфейс обновлялся при изменении состояния нашего кошелька, например, когда пользователь отключается или переключает аккаунты.

В вашем файле `HelloWorld.js` измените вашу функцию `addWalletListener` следующим образом:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

Держу пари, вам даже не нужна наша помощь, чтобы понять, что здесь происходит на данном этапе, но для полноты картины давайте быстро разберем это:

- Во-первых, наша функция проверяет, включен ли `window.ethereum` (т. е. установлен ли МетаМаск).
  - Если нет, мы просто устанавливаем нашу переменную состояния `status` в JSX-строку, которая предлагает пользователю установить МетаМаск.
  - Если он включен, мы настраиваем слушатель `window.ethereum.on("accountsChanged")` в строке 3, который отслеживает изменения состояния в кошельке МетаМаск, включая случаи, когда пользователь подключает дополнительный аккаунт к dapp, переключает аккаунты или отключает аккаунт. Если подключен хотя бы один аккаунт, переменная состояния `walletAddress` обновляется как первый аккаунт в массиве `accounts`, возвращаемом слушателем. В противном случае `walletAddress` устанавливается как пустая строка.

И последнее, но не менее важное: мы должны вызвать его в нашей функции `useEffect`:

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

И на этом все! Мы успешно завершили программирование всей функциональности нашего кошелька! Теперь перейдем к нашей последней задаче: обновлению сообщения, хранящегося в нашем смарт-контракте!

### Шаг 6. Реализация функции `updateMessage` {#step-6-implement-the-updatemessage-function}

Ну что ж, друзья, мы вышли на финишную прямую! В `updateMessage` вашего файла `interact.js` мы собираемся сделать следующее:

1. Убедиться, что сообщение, которое мы хотим опубликовать в нашем смарт-контракте, является действительным
2. Подписать нашу транзакцию с помощью МетаМаск
3. Вызвать эту функцию из нашего фронтенд-компонента `HelloWorld.js`

Это не займет много времени; давайте закончим этот dapp!

#### Обработка ошибок ввода {#input-error-handling}

Естественно, имеет смысл иметь какую-то обработку ошибок ввода в начале функции.

Мы хотим, чтобы наша функция возвращала результат досрочно, если не установлено расширение МетаМаск, не подключен кошелек (т. е. переданный `address` является пустой строкой) или `message` является пустой строкой. Давайте добавим следующую обработку ошибок в `updateMessage`:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }
}
```

Теперь, когда у нас есть надлежащая обработка ошибок ввода, пришло время подписать транзакцию через МетаМаск!

#### Подписание нашей транзакции {#signing-our-transaction}

Если вы уже знакомы с традиционными транзакциями Эфириума в Web3, код, который мы напишем дальше, будет вам очень знаком. Ниже вашего кода обработки ошибок ввода добавьте следующее в `updateMessage`:

```javascript
// interact.js

//настроить параметры транзакции
const transactionParameters = {
  to: contractAddress, // Обязательно, за исключением публикаций контракта.
  from: address, // должен совпадать с активным адресом пользователя.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//подписать транзакцию
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
          View the status of your transaction on Etherscan!
        </a>
        <br />
        ℹ️ Once the transaction is verified by the network, the message will be
        updated automatically.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

Давайте разберем, что происходит. Сначала мы настраиваем параметры нашей транзакции, где:

- `to` указывает адрес получателя (наш смарт-контракт)
- `from` указывает подписанта транзакции, переменную `address`, которую мы передали в нашу функцию
- `data` содержит вызов метода `update` нашего смарт-контракта Hello World, получая нашу строковую переменную `message` в качестве входных данных

Затем мы делаем вызов await, `window.ethereum.request`, где мы просим МетаМаск подписать транзакцию. Обратите внимание, в строках 11 и 12 мы указываем наш метод eth, `eth_sendTransaction`, и передаем наш `transactionParameters`.

На этом этапе МетаМаск откроется в браузере и предложит пользователю подписать или отклонить транзакцию.

- Если транзакция успешна, функция вернет JSON-объект, где JSX-строка `status` предлагает пользователю проверить Etherscan для получения дополнительной информации о своей транзакции.
- Если транзакция не удалась, функция вернет JSON-объект, где строка `status` передает сообщение об ошибке.

В целом, наша функция `updateMessage` должна выглядеть так:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //обработка ошибок ввода
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }

  //настроить параметры транзакции
  const transactionParameters = {
    to: contractAddress, // Обязательно, за исключением публикаций контракта.
    from: address, // должен совпадать с активным адресом пользователя.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //подписать транзакцию
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
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
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

#### Подключение `updateMessage` к фронтенду `HelloWorld.js` {#connect-updatemessage-to-the-helloworld-js-frontend}

Наша функция `onUpdatePressed` должна сделать вызов await к импортированной функции `updateMessage` и изменить переменную состояния `status`, чтобы отразить, была ли наша транзакция успешной или неудачной:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

Все очень чисто и просто. И угадайте что... ВАШ DAPP ГОТОВ!!!

Давай, протестируй кнопку **Update**!

### Создание собственного пользовательского dapp {#make-your-own-custom-dapp}

Ууууу, вы дошли до конца руководства! Подводя итог, вы узнали, как:

- Подключить кошелек МетаМаск к вашему проекту dapp
- Читать данные из вашего смарт-контракта с помощью API [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Подписывать транзакции Эфириума с помощью МетаМаск

Теперь вы полностью готовы применить навыки из этого руководства для создания собственного пользовательского проекта dapp! Как всегда, если у вас есть какие-либо вопросы, не стесняйтесь обращаться к нам за помощью в [Дискорд Alchemy](https://discord.gg/gWuC7zB). 🧙‍♂️

Как только вы завершите это руководство, дайте нам знать, как прошел ваш опыт, или оставьте отзыв, отметив нас в Твиттере [@alchemyplatform](https://twitter.com/AlchemyPlatform)!