---
title: "Смарт-контракт Hello World для початківців — Fullstack"
description: "Вступний посібник із написання та розгортання простого смарт-контракту в Етеріумі."
author: "nstrike2"
breadcrumb: Hello World fullstack
tags:
  [
    "Solidity",
    "Hardhat",
    "Alchemy",
    "смарт-контракти",
    "розгортання",
    "оглядач блоків",
    "фронтенд",
    "транзакції",
    "фреймворк",
  ]
skill: beginner
lang: uk
published: 2021-10-25
---

Цей посібник для вас, якщо ви новачок у розробці на блокчейні й не знаєте, з чого почати або як розгортати смарт-контракти та взаємодіяти з ними. Ми крок за кроком розглянемо створення та розгортання простого смарт-контракту в тестовій мережі Ґерлі за допомогою [МетаМаск](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org) та [Alchemy](https://alchemy.com/eth).

Для проходження цього посібника вам знадобиться акаунт Alchemy. [Зареєструйте безкоштовний акаунт](https://www.alchemy.com/).

Якщо на будь-якому етапі у вас виникнуть запитання, не соромтеся звертатися до [Discord Alchemy](https://discord.gg/gWuC7zB)!

## Частина 1 — Створення та розгортання вашого смарт-контракту за допомогою Hardhat {#part-1}

### Підключення до мережі Етеріум {#connect-to-the-ethereum-network}

Існує багато способів робити запити до ланцюга Етеріум. Для простоти ми використаємо безкоштовний акаунт на Alchemy — платформі для розробників блокчейну та API, яка дозволяє нам взаємодіяти з ланцюгом Етеріум без необхідності самостійно запускати вузол. Alchemy також має інструменти розробника для моніторингу та аналітики; ми скористаємося ними в цьому посібнику, щоб зрозуміти, як технічно відбувається розгортання нашого смарт-контракту.

### Створення вашого застосунку та ключа API {#create-your-app-and-api-key}

Після створення акаунту Alchemy ви можете згенерувати ключ API, створивши застосунок. Це дозволить вам робити запити до тестової мережі Ґерлі. Якщо ви не знайомі з тестовими мережами, ви можете [прочитати посібник Alchemy щодо вибору мережі](https://www.alchemy.com/docs/choosing-a-web3-network).

На панелі керування Alchemy знайдіть випадне меню **Apps** (Застосунки) на навігаційній панелі та натисніть **Create App** (Створити застосунок).

![Hello world create app](./hello-world-create-app.png)

Дайте своєму застосунку назву «_Hello World_» і напишіть короткий опис. Виберіть **Staging** як середовище та **Goerli** як мережу.

![create app view hello world](./create-app-view-hello-world.png)

_Примітка: обов'язково виберіть **Ґерлі**, інакше цей посібник не спрацює._

Натисніть **Create app** (Створити застосунок). Ваш застосунок з'явиться в таблиці нижче.

### Створення акаунту Етеріум {#create-an-ethereum-account}

Вам потрібен акаунт Етеріум, щоб надсилати та отримувати транзакції. Ми використаємо МетаМаск — віртуальний гаманець у браузері, який дозволяє користувачам керувати адресою свого акаунту Етеріум.

Ви можете безкоштовно завантажити та створити акаунт МетаМаск [тут](https://metamask.io/download). Під час створення акаунту, або якщо він у вас уже є, обов'язково перемкніться на «Goerli Test Network» (Тестова мережа Ґерлі) у верхньому правому куті (щоб ми не мали справи з реальними грошима).

### Крок 4: Додавання етеру з крана {#step-4-add-ether-from-a-faucet}

Щоб розгорнути ваш смарт-контракт у тестовій мережі, вам знадобиться трохи тестового ETH. Щоб отримати ETH у мережі Ґерлі, перейдіть до крана Ґерлі та введіть адресу свого акаунту Ґерлі. Зверніть увагу, що останнім часом крани Ґерлі можуть працювати нестабільно — перегляньте [сторінку тестових мереж](/developers/docs/networks/#goerli), щоб знайти список варіантів для спроби:

_Примітка: через перевантаження мережі це може зайняти деякий час._
``

### Крок 5: Перевірка вашого балансу {#step-5-check-your-balance}

Щоб ще раз переконатися, що ETH є у вашому гаманці, давайте зробимо запит [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) за допомогою [інструменту пісочниці Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Це поверне кількість ETH у нашому гаманці. Щоб дізнатися більше, перегляньте [короткий посібник Alchemy про те, як користуватися інструментом composer](https://youtu.be/r6sjRxBZJuU).

Введіть адресу вашого акаунту МетаМаск і натисніть **Send Request**. Ви побачите відповідь, схожу на фрагмент коду нижче.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _Примітка: Цей результат вказано у wei, а не в ETH. Wei використовується як найменша одиниця етеру._

Хух! Усі наші несправжні гроші на місці.
### Крок 6: Ініціалізація нашого проєкту {#step-6-initialize-our-project}

Спочатку нам потрібно буде створити папку для нашого проєкту. Перейдіть до командного рядка та введіть наступне.

```
mkdir hello-world
cd hello-world
```

Тепер, коли ми знаходимося всередині папки нашого проєкту, ми використаємо `npm init` для ініціалізації проєкту.

> Якщо у вас ще не встановлено npm, дотримуйтесь [інструкцій зі встановлення Node.js](https://nodejs.org/en/download/), щоб встановити Node.js та npm.

Для цілей цього посібника не має значення, як ви відповідатимете на запитання щодо ініціалізації. Ось як ми це зробили для довідки:

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

Затвердьте package.json, і ми готові до роботи!
### Крок 7: Завантаження Hardhat {#step-7-download-hardhat}

Hardhat — це середовище розробки для компіляції, розгортання, тестування та налагодження вашого програмного забезпечення для Етеріум. Воно допомагає розробникам створювати смарт-контракти та децентралізовані застосунки (dapp) локально перед розгортанням у робочому ланцюзі.

Усередині нашого проєкту `hello-world` виконайте:

```
npm install --save-dev hardhat
```

Перегляньте цю сторінку для отримання додаткової інформації щодо [інструкцій зі встановлення](https://hardhat.org/getting-started/#overview).

### Крок 8: Створення проєкту Hardhat {#step-8-create-hardhat-project}

Усередині папки нашого проєкту `hello-world` виконайте:

```
npx hardhat
```

Після цього ви побачите вітальне повідомлення та можливість вибрати, що ви хочете зробити. Виберіть «create an empty hardhat.config.js»:

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

Це згенерує файл `hardhat.config.js` у проєкті. Ми використаємо його пізніше в посібнику, щоб вказати налаштування для нашого проєкту.

### Крок 9: Додавання папок проєкту {#step-9-add-project-folders}

Щоб підтримувати порядок у проєкті, давайте створимо дві нові папки. У командному рядку перейдіть до кореневого каталогу вашого проєкту `hello-world` і введіть:

```
mkdir contracts
mkdir scripts
```

- `contracts/` — тут ми зберігатимемо файл коду нашого смарт-контракту hello world
- `scripts/` — тут ми зберігатимемо скрипти для розгортання та взаємодії з нашим контрактом

### Крок 10: Написання нашого контракту {#step-10-write-our-contract}

Ви можете запитати себе: коли ж ми будемо писати код? Час настав!

Відкрийте проєкт hello-world у вашому улюбленому редакторі. Смарт-контракти найчастіше пишуться мовою Solidity, яку ми й використаємо для написання нашого смарт-контракту.‌

1. Перейдіть до папки `contracts` і створіть новий файл під назвою `HelloWorld.sol`
2. Нижче наведено приклад смарт-контракту Hello World, який ми будемо використовувати для цього посібника. Скопіюйте вміст нижче у файл `HelloWorld.sol`.

_Примітка: Обов'язково прочитайте коментарі, щоб зрозуміти, що робить цей контракт._

```
// Вказує версію Solidity, використовуючи семантичне версіонування.
// Дізнатися більше: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Визначає контракт з назвою `HelloWorld`.
// Контракт — це набір функцій та даних (його стан). Після розгортання контракт знаходиться за певною адресою в блокчейні Етеріум. Дізнатися більше: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Викликається під час виклику функції update
   // Події смарт-контракту — це спосіб для вашого контракту повідомити фронтенду вашого застосунку про те, що щось сталося в блокчейні. Фронтенд може «прослуховувати» певні події та реагувати на них.
   event UpdatedMessages(string oldStr, string newStr);

   // Оголошує змінну стану `message` типу `string`.
   // Змінні стану — це змінні, значення яких постійно зберігаються у сховищі контракту. Ключове слово `public` робить змінні доступними ззовні контракту та створює функцію, яку інші контракти або клієнти можуть викликати для доступу до значення.
   string public message;

   // Подібно до багатьох об'єктно-орієнтованих мов на основі класів, конструктор — це спеціальна функція, яка виконується лише під час створення контракту.
   // Конструктори використовуються для ініціалізації даних контракту. Дізнатися більше: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Приймає рядковий аргумент `initMessage` і встановлює значення у змінну сховища `message` контракту).
      message = initMessage;
   }

   // Публічна функція, яка приймає рядковий аргумент і оновлює змінну сховища `message`.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Це базовий смарт-контракт, який зберігає повідомлення під час створення. Його можна оновити, викликавши функцію `update`.

### Крок 11: Підключення МетаМаск та Alchemy до вашого проєкту {#step-11-connect-metamask-alchemy-to-your-project}

Ми створили гаманець МетаМаск, акаунт Alchemy та написали наш смарт-контракт, тепер настав час об'єднати їх.

Кожна транзакція, надіслана з вашого гаманця, потребує підпису за допомогою вашого унікального приватного ключа. Щоб надати нашій програмі цей дозвіл, ми можемо безпечно зберегти наш приватний ключ у файлі середовища. Тут ми також збережемо ключ API для Alchemy.

> Щоб дізнатися більше про надсилання транзакцій, перегляньте [цей посібник](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) з надсилання транзакцій за допомогою Web3.

Спочатку встановіть пакет dotenv у каталозі вашого проєкту:

```
npm install dotenv --save
```

Потім створіть файл `.env` у кореневому каталозі проєкту. Додайте до нього свій приватний ключ МетаМаск та URL-адресу HTTP API Alchemy.

Ваш файл середовища має називатися `.env`, інакше він не буде розпізнаний як файл середовища.

Не називайте його `process.env`, `.env-custom` або якось інакше.

- Дотримуйтесь [цих інструкцій](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key), щоб експортувати свій приватний ключ
- Дивіться нижче, щоб отримати URL-адресу HTTP API Alchemy

![Animated walkthrough of getting an Alchemy API key](./get-alchemy-api-key.gif)

Ваш `.env` має виглядати так:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Щоб фактично підключити їх до нашого коду, ми пошлемося на ці змінні в нашому файлі `hardhat.config.js` на кроці 13.

### Крок 12: Встановлення Ethers.js {#step-12-install-ethersjs}

Ethers.js — це бібліотека, яка полегшує взаємодію та виконання запитів до Етеріум, обгортаючи [стандартні методи JSON-RPC](/developers/docs/apis/json-rpc/) більш зручними для користувача методами.

Hardhat дозволяє нам інтегрувати [плагіни](https://hardhat.org/plugins/) для додаткових інструментів та розширеної функціональності. Ми скористаємося [плагіном Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) для розгортання контракту.

У каталозі вашого проєкту введіть:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### Крок 13: Оновлення hardhat.config.js {#step-13-update-hardhat-configjs}

Наразі ми додали кілька залежностей та плагінів, тепер нам потрібно оновити `hardhat.config.js`, щоб наш проєкт знав про них усі.

Оновіть ваш `hardhat.config.js`, щоб він виглядав так:

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

### Крок 14: Компіляція нашого контракту {#step-14-compile-our-contract}

Щоб переконатися, що все працює, давайте скомпілюємо наш контракт. Завдання `compile` є одним із вбудованих завдань Hardhat.

З командного рядка виконайте:

```bash
npx hardhat compile
```

Ви можете отримати попередження про `SPDX license identifier not provided in source file`, але не варто про це турбуватися — сподіваємося, все інше виглядає добре! Якщо ні, ви завжди можете написати в [Discord Alchemy](https://discord.gg/u72VCg3).

### Крок 15: Написання нашого скрипта розгортання {#step-15-write-our-deploy-script}

Тепер, коли наш контракт написано, а файл конфігурації готовий до роботи, настав час написати скрипт розгортання нашого контракту.

Перейдіть до папки `scripts/` і створіть новий файл під назвою `deploy.js`, додавши до нього такий вміст:

```javascript
async function main() {
  const HelloWorld = await ethers.getКонтрактFactory("HelloWorld")

  // Почати розгортання, повертаючи проміс, який вирішується в об'єкт контракту
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

Hardhat чудово пояснює, що робить кожен із цих рядків коду, у своєму [посібнику з контрактів](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), ми запозичили їхні пояснення тут.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

`ContractFactory` в ethers.js — це абстракція, яка використовується для розгортання нових смарт-контрактів, тому `HelloWorld` тут є [фабрикою](<https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)>) для екземплярів нашого контракту hello world. Під час використання плагіна `hardhat-ethers` `ContractFactory` та `Contract` екземпляри за замовчуванням підключаються до першого підписанта (власника).

```javascript
const hello_world = await HelloWorld.deploy()
```

Виклик `deploy()` на `ContractFactory` розпочне розгортання та поверне `Promise`, який перетворюється на об'єкт `Contract`. Це об'єкт, який має метод для кожної з функцій нашого смарт-контракту.

### Крок 16: Розгортання нашого контракту {#step-16-deploy-our-contract}

Ми нарешті готові розгорнути наш смарт-контракт! Перейдіть до командного рядка та виконайте:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

Після цього ви побачите щось на зразок:

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**Будь ласка, збережіть цю адресу**. Ми будемо використовувати її пізніше в посібнику.

Якщо ми перейдемо до [Etherscan Ґерлі](https://goerli.etherscan.io) і знайдемо адресу нашого контракту, ми зможемо побачити, що його було успішно розгорнуто. Транзакція виглядатиме приблизно так:

![](./etherscan-contract.png)

Адреса `From` має збігатися з адресою вашого акаунту МетаМаск, а адреса `To` міститиме напис **Contract Creation** (Створення контракту). Якщо ми натиснемо на транзакцію, то побачимо адресу нашого контракту в полі `To`.

![](./etherscan-transaction.png)

Вітаємо! Ви щойно розгорнули смарт-контракт у тестовій мережі Етеріум.

Щоб зрозуміти, як технічно це працює, давайте перейдемо на вкладку Explorer (Провідник) на нашій [панелі керування Alchemy](https://dashboard.alchemy.com/explorer). Якщо у вас є кілька застосунків Alchemy, обов'язково відфільтруйте за застосунком і виберіть **Hello World**.

![](./hello-world-explorer.png)

Тут ви побачите кілька методів JSON-RPC, які Hardhat/Ethers виконали для нас у фоновому режимі, коли ми викликали функцію `.deploy()`. Два важливі методи тут — це [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction), який є запитом на запис нашого контракту в ланцюг Ґерлі, та [`eth_getTransactionByHash`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-by-hash), який є запитом на читання інформації про нашу транзакцію за заданим хешем. Щоб дізнатися більше про надсилання транзакцій, перегляньте [наш посібник із надсилання транзакцій за допомогою Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

## Частина 2: Взаємодія з вашим смарт-контрактом {#part-2-interact-with-your-smart-contract}

Тепер, коли ми успішно розгорнули смарт-контракт у мережі Ґерлі, давайте дізнаємося, як з ним взаємодіяти.

### Створення файлу interact.js {#create-a-interactjs-file}

Це файл, у якому ми напишемо наш скрипт для взаємодії. Ми будемо використовувати бібліотеку Ethers.js, яку ви раніше встановили в Частині 1.

У папці `scripts/` створіть новий файл з назвою `interact.js` та додайте наступний код:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### Оновлення вашого файлу .env {#update-your-env-file}

Ми будемо використовувати нові змінні середовища, тому нам потрібно визначити їх у файлі `.env`, який [ми створили раніше](#step-11-connect-metamask-alchemy-to-your-project).

Нам потрібно буде додати визначення для нашого `API_KEY` від Alchemy та `CONTRACT_ADDRESS`, за якою був розгорнутий ваш смарт-контракт.

Ваш файл `.env` має виглядати приблизно так:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### Отримання ABI вашого контракту {#grab-your-contract-abi}

[ABI (двійковий інтерфейс застосунку)](/glossary/#abi) нашого контракту — це інтерфейс для взаємодії з нашим смарт-контрактом. Hardhat автоматично генерує ABI та зберігає його в `HelloWorld.json`. Щоб використовувати ABI, нам потрібно буде проаналізувати його вміст, додавши наступні рядки коду до нашого файлу `interact.js`:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

Якщо ви хочете побачити ABI, ви можете вивести його в консоль:

```javascript
console.log(JSON.stringify(contract.abi))
```

Щоб побачити ваш ABI, виведений у консоль, перейдіть до термінала та виконайте:

```bash
npx hardhat run scripts/interact.js
```

### Створення екземпляра вашого контракту {#create-an-instance-of-your-contract}

Щоб взаємодіяти з нашим контрактом, нам потрібно створити екземпляр контракту в нашому коді. Щоб зробити це за допомогою Ethers.js, нам потрібно буде працювати з трьома концепціями:

1. Провайдер (Провайдер) — провайдер вузла, який надає вам доступ для читання та запису до блокчейну
2. Підписант (Підписант) — представляє акаунт Етеріуму, який може підписувати транзакції
3. Контракт (Contract) — об'єкт Ethers.js, що представляє конкретний контракт, розгорнутий ончейн

Ми використаємо ABI контракту з попереднього кроку, щоб створити наш екземпляр контракту:

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

Дізнайтеся більше про провайдерів, підписантів та контракти в [документації ethers.js](https://docs.ethers.io/v5/).

### Читання початкового повідомлення {#read-the-init-message}

Пам'ятаєте, коли ми розгортали наш контракт за допомогою `initMessage = "Hello world!"`? Тепер ми збираємося прочитати це повідомлення, збережене в нашому смарт-контракті, і вивести його в консоль.

У JavaScript асинхронні функції використовуються під час взаємодії з мережами. Щоб дізнатися більше про асинхронні функції, [прочитайте цю статтю на Medium](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

Використовуйте наведений нижче код, щоб викликати функцію `message` у нашому смарт-контракті та прочитати початкове повідомлення:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```

Після запуску файлу за допомогою `npx hardhat run scripts/interact.js` у терміналі ми повинні побачити таку відповідь:

```
Повідомлення: Hello world!
```

Вітаємо! Ви щойно успішно прочитали дані смарт-контракту з блокчейну Етеріуму, так тримати!

### Оновлення повідомлення {#update-the-message}

Замість того, щоб просто читати повідомлення, ми також можемо оновити повідомлення, збережене в нашому смарт-контракті, використовуючи функцію `update`! Досить круто, чи не так?

Щоб оновити повідомлення, ми можемо безпосередньо викликати функцію `update` на нашому створеному об'єкті Contract:

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

Зверніть увагу, що в рядку 11 ми викликаємо `.wait()` для повернутого об'єкта транзакції. Це гарантує, що наш скрипт дочекається, поки транзакція буде видобута в блокчейні, перш ніж вийти з функції. Якщо виклик `.wait()` не включено, скрипт може не побачити оновлене значення `message` у контракті.

### Читання нового повідомлення {#read-the-new-message}

Ви маєте змогу повторити [попередній крок](#read-the-init-message), щоб прочитати оновлене значення `message`. Знайдіть хвилинку і подивіться, чи зможете ви внести необхідні зміни, щоб вивести це нове значення!

Якщо вам потрібна підказка, ось як має виглядати ваш файл `interact.js` на цьому етапі:

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

// підписант - ви
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// екземпляр контракту
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

Тепер просто запустіть скрипт, і ви побачите старе повідомлення, статус оновлення та нове повідомлення, виведені у ваш термінал!

`npx hardhat run scripts/interact.js --network goerli`

```
Повідомлення: Hello World!
Оновлення повідомлення...
Нове повідомлення: This is the new message.
```

Під час виконання цього скрипта ви можете помітити, що крок `Updating the message...` займає деякий час перед завантаженням нового повідомлення. Це пов'язано з процесом майнінгу; якщо вам цікаво відстежувати транзакції під час їх видобування, відвідайте [мемпул Alchemy](https://dashboard.alchemy.com/mempool), щоб побачити статус транзакції. Якщо транзакцію відхилено, також корисно перевірити [Etherscan для Ґерлі](https://goerli.etherscan.io) та знайти хеш вашої транзакції.

## Частина 3: Опублікуйте свій смарт-контракт на Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

Ви виконали всю важку роботу, щоб втілити свій смарт-контракт у життя; тепер настав час поділитися ним зі світом!

Верифікувавши свій смарт-контракт на Etherscan, будь-хто зможе переглядати ваш вихідний код і взаємодіяти з вашим смарт-контрактом. Почнімо!

### Крок 1: Згенеруйте ключ API у своєму акаунті Etherscan {#step-1-generate-an-api-key-on-your-etherscan-account}

Ключ API Etherscan необхідний для підтвердження того, що ви є власником смарт-контракту, який намагаєтеся опублікувати.

Якщо у вас ще немає акаунта Etherscan, [зареєструйтеся](https://etherscan.io/register).

Після входу знайдіть своє ім'я користувача на панелі навігації, наведіть на нього курсор і виберіть кнопку **My profile**.

На сторінці вашого профілю ви побачите бічну панель навігації. На бічній панелі навігації виберіть **API Keys**. Далі натисніть кнопку «Add», щоб створити новий ключ API, назвіть свій застосунок **hello-world** і натисніть кнопку **Create New API Key**.

Ваш новий ключ API має з'явитися в таблиці ключів API. Скопіюйте ключ API в буфер обміну.

Далі нам потрібно додати ключ API Etherscan до нашого файлу `.env`.

Після його додавання ваш файл `.env` має виглядати так:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Смарт-контракти, розгорнуті за допомогою Hardhat {#hardhat-deployed-smart-contracts}

#### Встановіть hardhat-etherscan {#install-hardhat-etherscan}

Опублікувати ваш контракт на Etherscan за допомогою Hardhat дуже просто. Для початку вам потрібно буде встановити плагін `hardhat-etherscan`. `hardhat-etherscan` автоматично верифікує вихідний код смарт-контракту та ABI на Etherscan. Щоб додати його, у каталозі `hello-world` виконайте:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

Після встановлення додайте наступний вираз у верхній частині вашого `hardhat.config.js` та додайте параметри конфігурації Etherscan:

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
    // Ваш API ключ для Etherscan
    // Отримайте його на https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Верифікуйте свій смарт-контракт на Etherscan {#verify-your-smart-contract-on-etherscan}

Переконайтеся, що всі файли збережено, а всі змінні `.env` налаштовано правильно.

Запустіть завдання `verify`, передавши адресу контракту та мережу, у якій його розгорнуто:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

Переконайтеся, що `DEPLOYED_CONTRACT_ADDRESS` — це адреса вашого розгорнутого смарт-контракту в тестовій мережі Ґерлі. Крім того, останній аргумент (`'Hello World!'`) має бути тим самим рядковим значенням, яке використовувалося [під час кроку розгортання в частині 1](#step-15-write-our-deploy-script).

Якщо все пройде добре, ви побачите наступне повідомлення у своєму терміналі:

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

Вітаємо! Код вашого смарт-контракту тепер на Etherscan!

### Перегляньте свій смарт-контракт на Etherscan! {#check-out-your-smart-contract-on-etherscan}

Перейшовши за посиланням, наданим у вашому терміналі, ви зможете побачити код свого смарт-контракту та ABI, опубліковані на Etherscan!

**Ура — ви зробили це, чемпіоне! Тепер будь-хто може викликати ваш смарт-контракт або записувати в нього дані! З нетерпінням чекаємо на те, що ви створите далі!**

## Частина 4 — Інтеграція вашого смарт-контракту з фронтендом {#part-4-integrating-your-smart-contract-with-the-frontend}

До кінця цього посібника ви дізнаєтеся, як:

- Підключити гаманець МетаМаск до вашого децентралізованого застосунку (dapp)
- Зчитувати дані з вашого смарт-контракту за допомогою API [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)
- Підписувати транзакції Етеріуму за допомогою МетаМаск

Для цього dapp ми будемо використовувати [React](https://react.dev/) як наш фронтенд-фреймворк; однак важливо зазначити, що ми не будемо витрачати багато часу на розбір його основ, оскільки здебільшого зосередимося на додаванні функціональності Web3 до нашого проєкту.

Як передумова, ви повинні мати розуміння React на рівні початківця. Якщо ні, ми рекомендуємо пройти офіційний [посібник Вступ до React](https://react.dev/learn).

### Клонування початкових файлів {#clone-the-starter-files}

Спочатку перейдіть до [репозиторію hello-world-part-four на GitHub](https://github.com/alchemyplatform/hello-world-part-four-tutorial), щоб отримати початкові файли для цього проєкту, і клонуйте цей репозиторій на свій локальний комп'ютер.

Відкрийте клонований репозиторій локально. Зверніть увагу, що він містить дві папки: `starter-files` та `completed`.

- `starter-files` — **ми будемо працювати в цій директорії**, ми підключимо інтерфейс користувача до вашого гаманця Етеріуму та смарт-контракту, який ми опублікували на Etherscan у [Частині 3](#part-3-publish-your-smart-contract-to-etherscan).
- `completed` містить повністю завершений посібник і має використовуватися лише як довідник, якщо ви застрягнете.

Далі відкрийте вашу копію `starter-files` у вашому улюбленому редакторі коду, а потім перейдіть до папки `src`.

Увесь код, який ми напишемо, буде знаходитися в папці `src`. Ми будемо редагувати компонент `HelloWorld.js` та файли JavaScript `util/interact.js`, щоб надати нашому проєкту функціональність Web3.

### Огляд початкових файлів {#check-out-the-starter-files}

Перш ніж почати писати код, давайте розглянемо, що надається нам у початкових файлах.

#### Запуск вашого проєкту React {#get-your-react-project-running}

Давайте почнемо із запуску проєкту React у нашому браузері. Краса React полягає в тому, що як тільки наш проєкт буде запущено в браузері, будь-які збережені нами зміни будуть оновлюватися в браузері в реальному часі.

Щоб запустити проєкт, перейдіть до кореневої директорії папки `starter-files` і виконайте `npm install` у вашому терміналі, щоб встановити залежності проєкту:

```bash
cd starter-files
npm install
```

Після завершення їх встановлення виконайте `npm start` у вашому терміналі:

```bash
npm start
```

Це має відкрити [http://localhost:3000/](http://localhost:3000/) у вашому браузері, де ви побачите фронтенд нашого проєкту. Він має складатися з одного поля \(місце для оновлення повідомлення, що зберігається у вашому смарт-контракті\), кнопки «Connect Wallet» (Підключити гаманець) та кнопки «Update» (Оновити).

Якщо ви спробуєте натиснути будь-яку з кнопок, ви помітите, що вони не працюють — це тому, що нам ще потрібно запрограмувати їхню функціональність.

#### Компонент `HelloWorld.js` {#the-helloworld-js-component}

Давайте повернемося до папки `src` у нашому редакторі та відкриємо файл `HelloWorld.js`. Надзвичайно важливо, щоб ми розуміли все в цьому файлі, оскільки це основний компонент React, з яким ми будемо працювати.

У верхній частині цього файлу ви помітите кілька інструкцій імпорту, які необхідні для запуску нашого проєкту, включаючи бібліотеку React, хуки useEffect та useState, деякі елементи з `./util/interact.js` (ми опишемо їх детальніше незабаром!) та логотип Alchemy.

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

Далі у нас є змінні стану, які ми будемо оновлювати після певних подій.

```javascript
// HelloWorld.js

//Змінні стану
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("No connection to the network.")
const [newMessage, setNewMessage] = useState("")
```

Ось що представляє кожна зі змінних:

- `walletAddress` — рядок, який зберігає адресу гаманця користувача
- `status` — рядок, який зберігає корисне повідомлення, що підказує користувачеві, як взаємодіяти з dapp
- `message` — рядок, який зберігає поточне повідомлення в смарт-контракті
- `newMessage` — рядок, який зберігає нове повідомлення, що буде записано в смарт-контракт

Після змінних стану ви побачите п'ять нереалізованих функцій: `useEffect`, `addSmartContractListener`, `addWalletListener`, `connectWalletPressed` та `onUpdatePressed`. Нижче ми пояснимо, що вони роблять:

```javascript
// HelloWorld.js

//викликається лише один раз
useEffect(async () => {
  //TODO: реалізувати
}, [])

function addSmartContractListener() {
  //TODO: реалізувати
}

function addWalletListener() {
  //TODO: реалізувати
}

const connectWalletPressed = async () => {
  //TODO: реалізувати
}

const onUpdatePressed = async () => {
  //TODO: реалізувати
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) — це хук React, який викликається після рендерингу вашого компонента. Оскільки в нього передається порожній масив `[]` \(див. рядок 4\), він буде викликаний лише під час _першого_ рендерингу компонента. Тут ми завантажимо поточне повідомлення, що зберігається в нашому смарт-контракті, викличемо слухачів нашого смарт-контракту та гаманця, а також оновимо наш інтерфейс користувача, щоб відобразити, чи вже підключено гаманець.
- `addSmartContractListener` — ця функція налаштовує слухача, який буде стежити за подією `UpdatedMessages` нашого контракту HelloWorld і оновлювати наш інтерфейс користувача, коли повідомлення в нашому смарт-контракті змінюється.
- `addWalletListener` — ця функція налаштовує слухача, який виявляє зміни в стані гаманця МетаМаск користувача, наприклад, коли користувач відключає свій гаманець або змінює адреси.
- `connectWalletPressed` — ця функція буде викликана для підключення гаманця МетаМаск користувача до нашого dapp.
- `onUpdatePressed` — ця функція буде викликана, коли користувач захоче оновити повідомлення, що зберігається в смарт-контракті.

Ближче до кінця цього файлу у нас є інтерфейс користувача нашого компонента.

```javascript
// HelloWorld.js

//UI нашого компонента
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

Якщо ви уважно переглянете цей код, то помітите, де ми використовуємо наші різні змінні стану в нашому інтерфейсі користувача:

- У рядках 6-12, якщо гаманець користувача підключено \(тобто `walletAddress.length > 0`\), ми відображаємо скорочену версію `walletAddress` користувача на кнопці з ідентифікатором "walletButton"; інакше там просто написано "Connect Wallet".
- У рядку 17 ми відображаємо поточне повідомлення, що зберігається в смарт-контракті, яке зафіксовано в рядку `message`.
- У рядках 23-26 ми використовуємо [керований компонент](https://legacy.reactjs.org/docs/forms.html#controlled-components) для оновлення нашої змінної стану `newMessage`, коли змінюється введення в текстовому полі.

Окрім наших змінних стану, ви також побачите, що функції `connectWalletPressed` та `onUpdatePressed` викликаються при натисканні кнопок з ідентифікаторами `publishButton` та `walletButton` відповідно.

Нарешті, давайте з'ясуємо, куди додається цей компонент `HelloWorld.js`.

Якщо ви перейдете до файлу `App.js`, який є основним компонентом у React і діє як контейнер для всіх інших компонентів, ви побачите, що наш компонент `HelloWorld.js` впроваджується в рядку 7.

І останнє, але не менш важливе: давайте перевіримо ще один наданий вам файл — файл `interact.js`.

#### Файл `interact.js` {#the-interact-js-file}

Оскільки ми хочемо дотримуватися парадигми [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), нам знадобиться окремий файл, який містить усі наші функції для управління логікою, даними та правилами нашого dapp, щоб потім мати можливість експортувати ці функції до нашого фронтенду \(нашого компонента `HelloWorld.js`\).

👆🏽Саме для цього і призначений наш файл `interact.js`!

Перейдіть до папки `util` у вашій директорії `src`, і ви помітите, що ми включили файл під назвою `interact.js`, який міститиме всі наші функції та змінні для взаємодії зі смарт-контрактом і гаманцем.

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

Ви помітите у верхній частині файлу, що ми закоментували об'єкт `helloWorldContract`. Пізніше в цьому посібнику ми розкоментуємо цей об'єкт і створимо екземпляр нашого смарт-контракту в цій змінній, яку потім експортуємо в наш компонент `HelloWorld.js`.

Чотири нереалізовані функції після нашого об'єкта `helloWorldContract` виконують наступне:

- `loadCurrentMessage` — ця функція обробляє логіку завантаження поточного повідомлення, що зберігається в смарт-контракті. Вона зробить виклик _читання_ до смарт-контракту Hello World за допомогою [API Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).
- `connectWallet` — ця функція підключить МетаМаск користувача до нашого dapp.
- `getCurrentWalletConnected` — ця функція перевірить, чи вже підключено акаунт Етеріуму до нашого dapp під час завантаження сторінки, і відповідно оновить наш інтерфейс користувача.
- `updateMessage` — ця функція оновить повідомлення, що зберігається в смарт-контракті. Вона зробить виклик _запису_ до смарт-контракту Hello World, тому гаманцю МетаМаск користувача доведеться підписати транзакцію Етеріуму, щоб оновити повідомлення.

Тепер, коли ми розуміємо, з чим працюємо, давайте з'ясуємо, як зчитувати дані з нашого смарт-контракту!

### Крок 3: Зчитування з вашого смарт-контракту {#step-3-read-from-your-smart-contract}

Щоб зчитувати дані з вашого смарт-контракту, вам потрібно буде успішно налаштувати:

- Підключення API до ланцюга Етеріуму
- Завантажений екземпляр вашого смарт-контракту
- Функцію для виклику функції вашого смарт-контракту
- Слухача для відстеження оновлень, коли дані, які ви зчитуєте зі смарт-контракту, змінюються

Це може здатися великою кількістю кроків, але не хвилюйтеся! Ми крок за кроком покажемо вам, як виконати кожен із них! :\)

#### Встановлення підключення API до ланцюга Етеріум {#establish-an-api-connection-to-the-ethereum-chain}

Пам'ятаєте, як у Частині 2 цього посібника ми використовували наш ключ Alchemy Web3 для зчитування з нашого смарт-контракту? Вам також знадобиться ключ Alchemy Web3 у вашому децентралізованому застосунку (dapp), щоб зчитувати дані з ланцюга.

Якщо у вас його ще немає, спочатку встановіть [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), перейшовши до кореневого каталогу ваших `starter-files` і виконавши наступну команду у вашому терміналі:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) — це обгортка навколо [Web3.js](https://docs.web3js.org/), яка надає розширені методи API та інші важливі переваги, щоб полегшити ваше життя як розробника Web3. Вона розроблена так, щоб вимагати мінімальної конфігурації, тому ви можете почати використовувати її у своєму застосунку відразу!

Потім встановіть пакет [dotenv](https://www.npmjs.com/package/dotenv) у каталозі вашого проєкту, щоб ми мали безпечне місце для зберігання нашого ключа API після його отримання.

```text
npm install dotenv --save
```

Для нашого dapp **ми будемо використовувати наш ключ API Websockets** замість нашого ключа API HTTP, оскільки це дозволить нам налаштувати слухача, який виявляє, коли повідомлення, що зберігається в смарт-контракті, змінюється.

Отримавши ключ API, створіть файл `.env` у вашому кореневому каталозі та додайте до нього вашу URL-адресу Alchemy Websockets. Після цього ваш файл `.env` має виглядати так:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

Тепер ми готові налаштувати нашу кінцеву точку Alchemy Web3 у нашому dapp! Давайте повернемося до нашого `interact.js`, який знаходиться у папці `util`, і додамо наступний код у верхній частині файлу:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

Вище ми спочатку імпортували ключ Alchemy з нашого файлу `.env`, а потім передали наш `alchemyKey` до `createAlchemyWeb3`, щоб встановити нашу кінцеву точку Alchemy Web3.

Коли ця кінцева точка готова, настав час завантажити наш смарт-контракт!
#### Завантаження вашого смарт-контракту Hello World {#loading-your-hello-world-smart-contract}

Щоб завантажити ваш смарт-контракт Hello World, вам знадобиться адреса контракту та його ABI, які можна знайти на Etherscan, якщо ви завершили [Частину 3 цього посібника.](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)

#### Як отримати ABI вашого контракту з Etherscan {#how-to-get-your-contract-abi-from-etherscan}

Якщо ви пропустили Частину 3 цього посібника, ви можете використати контракт HelloWorld з адресою [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code). Його ABI можна знайти [тут](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).

ABI контракту необхідний для визначення того, яку функцію викличе контракт, а також для забезпечення того, що функція поверне дані в очікуваному вами форматі. Після того, як ми скопіювали ABI нашого контракту, давайте збережемо його як файл JSON під назвою `contract-abi.json` у вашій директорії `src`.

Ваш contract-abi.json має зберігатися у вашій папці src.

Озброївшись адресою нашого контракту, ABI та кінцевою точкою Alchemy Web3, ми можемо використати [метод contract](https://docs.web3js.org/api/web3-eth-contract/class/Contract) для завантаження екземпляра нашого смарт-контракту. Імпортуйте ABI вашого контракту у файл `interact.js` та додайте адресу вашого контракту.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

Тепер ми нарешті можемо розкоментувати нашу змінну `helloWorldContract` і завантажити смарт-контракт за допомогою нашої кінцевої точки AlchemyWeb3:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Підсумовуючи, перші 12 рядків вашого `interact.js` тепер мають виглядати так:

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

Тепер, коли наш контракт завантажено, ми можемо реалізувати нашу функцію `loadCurrentMessage`!

#### Реалізація `loadCurrentMessage` у вашому файлі `interact.js` {#implementing-loadcurrentmessage-in-your-interact-js-file}

Ця функція надзвичайно проста. Ми збираємося зробити простий асинхронний виклик Web3 для зчитування з нашого контракту. Наша функція поверне повідомлення, що зберігається в смарт-контракті:

Оновіть `loadCurrentMessage` у вашому файлі `interact.js` на наступне:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

Оскільки ми хочемо відобразити цей смарт-контракт у нашому інтерфейсі користувача, давайте оновимо функцію `useEffect` у нашому компоненті `HelloWorld.js` на наступне:

```javascript
// HelloWorld.js

//викликається лише один раз
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

Зверніть увагу, ми хочемо, щоб наша `loadCurrentMessage` викликалася лише один раз під час першого рендерингу компонента. Незабаром ми реалізуємо `addSmartContractListener` для автоматичного оновлення інтерфейсу користувача після зміни повідомлення в смарт-контракті.

Перш ніж ми зануримося в нашого слухача, давайте перевіримо, що ми маємо на даний момент! Збережіть ваші файли `HelloWorld.js` та `interact.js`, а потім перейдіть на [http://localhost:3000/](http://localhost:3000/)

Ви помітите, що поточне повідомлення більше не говорить «No connection to the network» (Немає підключення до мережі). Натомість воно відображає повідомлення, що зберігається в смарт-контракті. Круто!

#### Ваш інтерфейс користувача тепер має відображати повідомлення, що зберігається в смарт-контракті {#your-ui-should-now-reflect-the-message-stored-in-the-smart-contract}

Тепер, говорячи про цього слухача...

#### Реалізація `addSmartContractListener` {#implement-addsmartcontractlistener}

Якщо ви згадаєте файл `HelloWorld.sol`, який ми написали в [Частині 1 цієї серії посібників](#step-10-write-our-contract), ви пригадаєте, що існує подія смарт-контракту під назвою `UpdatedMessages`, яка генерується після виклику функції `update` нашого смарт-контракту \(див. рядки 9 і 27\):

```javascript
// HelloWorld.sol

// Вказує версію Solidity, використовуючи семантичне версіонування.
// Дізнайтеся більше: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// Визначає контракт з назвою `HelloWorld`.
// Контракт — це набір функцій та даних (його стан). Після розгортання контракт знаходиться за певною адресою в блокчейні Етеріум. Дізнайтеся більше: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Випромінюється, коли викликається функція update
   //Події смарт-контракту — це спосіб для вашого контракту повідомити фронтенду вашого застосунку про те, що щось сталося в блокчейні, який може «слухати» певні події та вживати заходів, коли вони відбуваються.
   event UpdatedMessages(string oldStr, string newStr);

   // Оголошує змінну стану `message` типу `string`.
   // Змінні стану — це змінні, значення яких постійно зберігаються у сховищі контракту. Ключове слово `public` робить змінні доступними з-поза меж контракту та створює функцію, яку інші контракти або клієнти можуть викликати для доступу до значення.
   string public message;

   // Подібно до багатьох класових об'єктно-орієнтованих мов, конструктор — це спеціальна функція, яка виконується лише під час створення контракту.
   // Конструктори використовуються для ініціалізації даних контракту. Дізнайтеся більше:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Приймає рядковий аргумент `initMessage` та встановлює значення у змінну сховища контракту `message`).
      message = initMessage;
   }

   // Публічна функція, яка приймає рядковий аргумент та оновлює змінну сховища `message`.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Події смарт-контракту — це спосіб для вашого контракту повідомити вашому фронтенд-застосунку, що щось сталося \(тобто відбулася _подія_\) у блокчейні, який може «слухати» певні події та вживати заходів, коли вони відбуваються.

Функція `addSmartContractListener` буде спеціально слухати подію `UpdatedMessages` нашого смарт-контракту Hello World і оновлювати наш інтерфейс користувача для відображення нового повідомлення.

Змініть `addSmartContractListener` на наступне:

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

Давайте розберемо, що відбувається, коли слухач виявляє подію:

- Якщо під час генерації події виникає помилка, це буде відображено в інтерфейсі користувача через нашу змінну стану `status`.
- В іншому випадку ми використаємо повернутий об'єкт `data`. `data.returnValues` — це масив з індексацією від нуля, де перший елемент у масиві зберігає попереднє повідомлення, а другий елемент зберігає оновлене. Загалом, у разі успішної події ми встановимо наш рядок `message` на оновлене повідомлення, очистимо рядок `newMessage` та оновимо нашу змінну стану `status`, щоб відобразити, що нове повідомлення було опубліковано в нашому смарт-контракті.

Нарешті, давайте викличемо нашого слухача в нашій функції `useEffect`, щоб він ініціалізувався під час першого рендерингу компонента `HelloWorld.js`. Загалом, ваша функція `useEffect` має виглядати так:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

Тепер, коли ми можемо зчитувати дані з нашого смарт-контракту, було б чудово з'ясувати, як також записувати в нього! Однак, щоб записувати в наш dapp, ми повинні спочатку підключити до нього гаманець Етеріуму.

Отже, далі ми займемося налаштуванням нашого гаманця Етеріуму \(МетаМаск\), а потім підключенням його до нашого dapp!

### Крок 4: Налаштування вашого гаманця Етеріуму {#step-4-set-up-your-ethereum-wallet}

Щоб записати будь-що в ланцюг Етеріуму, користувачі повинні підписувати транзакції за допомогою приватних ключів свого віртуального гаманця. Для цього посібника ми будемо використовувати [МетаМаск](https://metamask.io/), віртуальний гаманець у браузері, який використовується для управління адресою вашого акаунта Етеріуму, оскільки він робить підписання транзакцій надзвичайно простим для кінцевого користувача.

Якщо ви хочете дізнатися більше про те, як працюють транзакції в Етеріумі, перегляньте [цю сторінку](/developers/docs/transactions/) від Ethereum Foundation.

#### Завантаження МетаМаск {#download-metamask}

Ви можете безкоштовно завантажити та створити акаунт МетаМаск [тут](https://metamask.io/download). Коли ви створюєте акаунт, або якщо у вас вже є акаунт, переконайтеся, що ви переключилися на «Goerli Test Network» (Тестова мережа Ґерлі) у верхньому правому куті \(щоб ми не мали справи з реальними грошима\).

#### Додавання етеру з крана {#add-ether-from-a-faucet}

Щоб підписати транзакцію в блокчейні Етеріуму, нам знадобиться трохи тестового ETH. Щоб отримати ETH, ви можете перейти на [FaucETH](https://fauceth.komputing.org) і ввести адресу вашого акаунта Ґерлі, натиснути «Request funds» (Запитати кошти), потім вибрати «Ethereum Testnet Goerli» у випадаючому списку і, нарешті, знову натиснути кнопку «Request funds». Незабаром після цього ви побачите ETH у своєму акаунті МетаМаск!

#### Перевірте свій баланс {#check-your-balance}

Щоб ще раз переконатися, що наш баланс на місці, зробімо запит [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) за допомогою [інструмента пісочниці Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Це поверне кількість ETH у нашому гаманці. Після того, як ви введете адресу свого акаунту МетаМаск і натиснете «Send Request» (Надіслати запит), ви побачите таку відповідь:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**ПРИМІТКА:** Цей результат вказано у wei, а не в ETH. Wei використовується як найменша одиниця етеру. Конвертація з wei в ETH така: 1 ETH = 10¹⁸ wei. Отже, якщо ми переведемо 0xde0b6b3a7640000 у десяткову систему, ми отримаємо 1\*10¹⁸, що дорівнює 1 ETH.

Хух! Усі наші несправжні гроші на місці! 🤑
### Крок 5: Підключення МетаМаск до вашого інтерфейсу користувача {#step-5-connect-metamask-to-your-ui}

Тепер, коли наш гаманець МетаМаск налаштовано, давайте підключимо до нього наш dapp!

#### Функція `connectWallet` {#the-connectwallet-function}

У нашому файлі `interact.js` давайте реалізуємо функцію `connectWallet`, яку ми потім зможемо викликати в нашому компоненті `HelloWorld.js`.

Давайте змінимо `connectWallet` на наступне:

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

Отже, що саме робить цей гігантський блок коду?

Ну, по-перше, він перевіряє, чи увімкнено `window.ethereum` у вашому браузері.

`window.ethereum` — це глобальний API, який впроваджується МетаМаск та іншими провайдерами гаманців, що дозволяє вебсайтам запитувати акаунти Етеріуму користувачів. У разі схвалення він може зчитувати дані з блокчейнів, до яких підключений користувач, і пропонувати користувачеві підписувати повідомлення та транзакції. Перегляньте [документацію МетаМаск](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) для отримання додаткової інформації!

Якщо `window.ethereum` _не_ присутній, це означає, що МетаМаск не встановлено. Це призводить до повернення об'єкта JSON, де повернута `address` є порожнім рядком, а об'єкт JSX `status` повідомляє, що користувач повинен встановити МетаМаск.

Тепер, якщо `window.ethereum` _присутній_, тоді починається найцікавіше.

Використовуючи блок try/catch, ми спробуємо підключитися до МетаМаск, викликавши [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Виклик цієї функції відкриє МетаМаск у браузері, після чого користувачеві буде запропоновано підключити свій гаманець до вашого dapp.

- Якщо користувач вирішить підключитися, `method: "eth_requestAccounts"` поверне масив, який містить усі адреси акаунтів користувача, підключених до dapp. Загалом, наша функція `connectWallet` поверне об'єкт JSON, який містить _першу_ `address` у цьому масиві \(див. рядок 9\) та повідомлення `status`, яке пропонує користувачеві написати повідомлення до смарт-контракту.
- Якщо користувач відхиляє підключення, тоді об'єкт JSON міститиме порожній рядок для повернутої `address` та повідомлення `status`, яке відображає, що користувач відхилив підключення.

Тепер, коли ми написали цю функцію `connectWallet`, наступним кроком є її виклик у нашому компоненті `HelloWorld.js`.

#### Додавання функції `connectWallet` до вашого компонента інтерфейсу користувача `HelloWorld.js` {#add-the-connectwallet-function-to-your-helloworld-js-ui-component}

Перейдіть до функції `connectWalletPressed` у `HelloWorld.js` та оновіть її на наступне:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Помітили, як більша частина нашої функціональності абстрагована від нашого компонента `HelloWorld.js` у файлі `interact.js`? Це зроблено для того, щоб ми дотримувалися парадигми M-V-C!

У `connectWalletPressed` ми просто робимо виклик await до нашої імпортованої функції `connectWallet` і, використовуючи її відповідь, оновлюємо наші змінні `status` та `walletAddress` через їхні хуки стану.

Тепер давайте збережемо обидва файли \(`HelloWorld.js` та `interact.js`\) і протестуємо наш інтерфейс користувача на даний момент.

Відкрийте свій браузер на сторінці [http://localhost:3000/](http://localhost:3000/) і натисніть кнопку «Connect Wallet» у верхньому правому куті сторінки.

Якщо у вас встановлено МетаМаск, вам буде запропоновано підключити свій гаманець до вашого dapp. Прийміть запрошення на підключення.

Ви повинні побачити, що кнопка гаманця тепер відображає, що вашу адресу підключено! Такккк 🔥

Далі спробуйте оновити сторінку... це дивно. Наша кнопка гаманця пропонує нам підключити МетаМаск, хоча він уже підключений...

Однак не бійтеся! Ми легко можемо вирішити це, реалізувавши `getCurrentWalletConnected`, яка перевірить, чи адреса вже підключена до нашого dapp, і відповідно оновить наш інтерфейс користувача!

#### Функція `getCurrentWalletConnected` {#the-getcurrentwalletconnected-function}

Оновіть вашу функцію `getCurrentWalletConnected` у файлі `interact.js` на наступне:

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

Цей код _дуже_ схожий на функцію `connectWallet`, яку ми щойно написали на попередньому кроці.

Головна відмінність полягає в тому, що замість виклику методу `eth_requestAccounts`, який відкриває МетаМаск для підключення гаманця користувачем, тут ми викликаємо метод `eth_accounts`, який просто повертає масив, що містить адреси МетаМаск, наразі підключені до нашого dapp.

Щоб побачити цю функцію в дії, давайте викличемо її в нашій функції `useEffect` нашого компонента `HelloWorld.js`:

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

Зверніть увагу, ми використовуємо відповідь нашого виклику до `getCurrentWalletConnected` для оновлення наших змінних стану `walletAddress` та `status`.

Тепер, коли ви додали цей код, давайте спробуємо оновити вікно нашого браузера.

Чудовоооо! Кнопка має повідомляти, що ви підключені, і показувати попередній перегляд адреси вашого підключеного гаманця — навіть після оновлення!

#### Реалізація `addWalletListener` {#implement-addwalletlistener}

Останнім кроком у налаштуванні гаманця нашого dapp є реалізація слухача гаманця, щоб наш інтерфейс користувача оновлювався, коли стан нашого гаманця змінюється, наприклад, коли користувач відключається або змінює акаунти.

У вашому файлі `HelloWorld.js` змініть вашу функцію `addWalletListener` на наступне:

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

Б'юся об заклад, вам навіть не потрібна наша допомога, щоб зрозуміти, що тут відбувається на цьому етапі, але для повноти картини давайте швидко розберемо це:

- По-перше, наша функція перевіряє, чи увімкнено `window.ethereum` \(тобто чи встановлено МетаМаск\).
  - Якщо ні, ми просто встановлюємо нашу змінну стану `status` на рядок JSX, який пропонує користувачеві встановити МетаМаск.
  - Якщо він увімкнений, ми налаштовуємо слухача `window.ethereum.on("accountsChanged")` у рядку 3, який відстежує зміни стану в гаманці МетаМаск, що включають підключення користувачем додаткового акаунта до dapp, зміну акаунтів або відключення акаунта. Якщо підключено принаймні один акаунт, змінна стану `walletAddress` оновлюється як перший акаунт у масиві `accounts`, повернутому слухачем. Інакше `walletAddress` встановлюється як порожній рядок.

І останнє, але не менш важливе: ми повинні викликати її в нашій функції `useEffect`:

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

І це все! Ми успішно завершили програмування всієї функціональності нашого гаманця! Тепер переходимо до нашого останнього завдання: оновлення повідомлення, що зберігається в нашому смарт-контракті!

### Крок 6: Реалізація функції `updateMessage` {#step-6-implement-the-updatemessage-function}

Гаразд, друзі, ми вийшли на фінішну пряму! У `updateMessage` вашого файлу `interact.js` ми збираємося зробити наступне:

1. Переконатися, що повідомлення, яке ми хочемо опублікувати в нашому смарт-контракті, є дійсним
2. Підписати нашу транзакцію за допомогою МетаМаск
3. Викликати цю функцію з нашого фронтенд-компонента `HelloWorld.js`

Це не займе багато часу; давайте закінчимо цей dapp!

#### Обробка помилок введення {#input-error-handling}

Звісно, має сенс мати певну обробку помилок введення на початку функції.

Ми хочемо, щоб наша функція поверталася достроково, якщо розширення МетаМаск не встановлено, гаманець не підключено \(тобто передана `address` є порожнім рядком\) або `message` є порожнім рядком. Давайте додамо наступну обробку помилок до `updateMessage`:

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

Тепер, коли є належна обробка помилок введення, настав час підписати транзакцію через МетаМаск!

#### Підписання нашої транзакції {#signing-our-transaction}

Якщо ви вже знайомі з традиційними транзакціями Етеріуму у Web3, код, який ми напишемо далі, буде вам дуже знайомим. Нижче вашого коду обробки помилок введення додайте наступне до `updateMessage`:

```javascript
// interact.js

//налаштувати параметри транзакції
const transactionParameters = {
  to: contractAddress, // Обов'язково, за винятком публікацій контракту.
  from: address, // повинно збігатися з активною адресою користувача.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//підписати транзакцію
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

Давайте розберемо, що відбувається. Спочатку ми налаштовуємо параметри нашої транзакції, де:

- `to` вказує адресу одержувача \(наш смарт-контракт\)
- `from` вказує підписанта транзакції, змінну `address`, яку ми передали в нашу функцію
- `data` містить виклик методу `update` нашого смарт-контракту Hello World, отримуючи нашу рядкову змінну `message` як вхідні дані

Потім ми робимо виклик await, `window.ethereum.request`, де ми просимо МетаМаск підписати транзакцію. Зверніть увагу, у рядках 11 і 12 ми вказуємо наш метод eth, `eth_sendTransaction`, і передаємо наші `transactionParameters`.

На цьому етапі МетаМаск відкриється в браузері та запропонує користувачеві підписати або відхилити транзакцію.

- Якщо транзакція успішна, функція поверне об'єкт JSON, де рядок JSX `status` пропонує користувачеві перевірити Etherscan для отримання додаткової інформації про свою транзакцію.
- Якщо транзакція не вдається, функція поверне об'єкт JSON, де рядок `status` передає повідомлення про помилку.

Загалом, наша функція `updateMessage` має виглядати так:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //обробка помилок вводу
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

  //налаштувати параметри транзакції
  const transactionParameters = {
    to: contractAddress, // Обов'язково, за винятком публікацій контракту.
    from: address, // повинно збігатися з активною адресою користувача.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //підписати транзакцію
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

І останнє, але не менш важливе: нам потрібно підключити нашу функцію `updateMessage` до нашого компонента `HelloWorld.js`.

#### Підключення `updateMessage` до фронтенду `HelloWorld.js` {#connect-updatemessage-to-the-helloworld-js-frontend}

Наша функція `onUpdatePressed` має зробити виклик await до імпортованої функції `updateMessage` та змінити змінну стану `status`, щоб відобразити, чи була наша транзакція успішною, чи ні:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

Це надзвичайно чисто і просто. І знаєте що... ВАШ DAPP ЗАВЕРШЕНО!!!

Сміливо тестуйте кнопку **Update**!

### Створення власного кастомного dapp {#make-your-own-custom-dapp}

Ураааа, ви дійшли до кінця посібника! Підсумовуючи, ви дізналися, як:

- Підключити гаманець МетаМаск до вашого проєкту dapp
- Зчитувати дані з вашого смарт-контракту за допомогою API [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)
- Підписувати транзакції Етеріуму за допомогою МетаМаск

Тепер ви повністю готові застосувати навички з цього посібника для створення власного кастомного проєкту dapp! Як завжди, якщо у вас виникнуть запитання, не соромтеся звертатися до нас за допомогою в [Discord Alchemy](https://discord.gg/gWuC7zB). 🧙‍♂️

Після завершення цього посібника повідомте нам про свої враження або залиште відгук, позначивши нас у Twitter [@alchemyplatform](https://twitter.com/AlchemyPlatform)!
