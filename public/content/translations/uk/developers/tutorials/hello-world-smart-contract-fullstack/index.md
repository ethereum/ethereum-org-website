---
title: "Смарт-контракт Hello World для початківців — повний стек"
description: "Вступний посібник із написання та розгортання простого смарт-контракту на Ethereum."
author: "nstrike2"
tags:
  [
    "Solidity",
    "Hardhat",
    "Alchemy",
    "Смарт-контракти",
    "розгортання",
    "провідник блоків",
    "використання",
    "транзакції"
  ]
skill: beginner
lang: uk
published: 2021-10-25
---

Цей посібник для вас, якщо ви новачок у розробці блокчейнів і не знаєте, з чого почати або як розгортати смарт-контракти та взаємодіяти з ними. Ми пройдемо процес створення та розгортання простого смарт-контракту в тестовій мережі Goerli за допомогою [MetaMask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org) та [Alchemy](https://alchemy.com/eth).

Щоб завершити цей посібник, вам знадобиться обліковий запис Alchemy. [Зареєструйте безкоштовний обліковий запис](https://www.alchemy.com/).

Якщо у вас виникнуть запитання, сміливо ставте їх у [Discord Alchemy](https://discord.gg/gWuC7zB)!

## Частина 1. Створення та розгортання смарт-контракту за допомогою Hardhat {#part-1}

### Підключення до мережі Ethereum {#connect-to-the-ethereum-network}

Існує багато способів робити запити до ланцюга Ethereum. Для простоти ми будемо використовувати безкоштовний обліковий запис на Alchemy, платформі для розробників блокчейну та API, яка дає змогу взаємодіяти з ланцюгом Ethereum без необхідності запускати власний вузол. Alchemy також має інструменти розробника для моніторингу та аналітики; ми скористаємося ними в цьому посібнику, щоб зрозуміти, що відбувається «під капотом» під час розгортання нашого смарт-контракту.

### Створення застосунку та ключа API {#create-your-app-and-api-key}

Створивши обліковий запис Alchemy, ви можете згенерувати ключ API, створивши застосунок. Це дасть вам змогу робити запити до тестової мережі Goerli. Якщо ви не знайомі з тестовими мережами, ви можете [прочитати посібник Alchemy щодо вибору мережі](https://www.alchemy.com/docs/choosing-a-web3-network).

На інформаційній панелі Alchemy знайдіть спадний список **Apps** на панелі навігації та натисніть **Create App**.

![Створення застосунку Hello World](./hello-world-create-app.png)

Дайте своєму застосунку назву «_Hello World_» і напишіть короткий опис. Виберіть **Staging** як своє середовище та **Goerli** як мережу.

![Створення застосунку Hello World](./create-app-view-hello-world.png)

_Примітка: обов’язково виберіть **Goerli**, інакше цей посібник не працюватиме._

Натисніть **Create app**. Ваш застосунок з’явиться в таблиці нижче.

### Створення облікового запису Ethereum {#create-an-ethereum-account}

Вам потрібен обліковий запис Ethereum для надсилання та отримання транзакцій. Ми будемо використовувати MetaMask, віртуальний гаманець у браузері, який дає змогу користувачам керувати адресою свого облікового запису Ethereum.

Ви можете завантажити та створити обліковий запис MetaMask безкоштовно [тут](https://metamask.io/download). Під час створення облікового запису, або якщо у вас вже є обліковий запис, обов’язково переключіться на «тестову мережу Goerli» у верхньому правому куті (щоб ми не мали справу з реальними грошима).

### Крок 4. Додайте ефір (ether) із крана (Faucet) {#step-4-add-ether-from-a-faucet}

Щоб розгорнути смарт-контракт у тестовій мережі, вам знадобляться несправжні ETH. Щоб отримати ETH у мережі Goerli, перейдіть до крана Goerli та введіть адресу свого облікового запису Goerli. Зауважте, що останнім часом крани Goerli можуть бути дещо ненадійними. Перегляньте [сторінку тестових мереж](/developers/docs/networks/#goerli), щоб побачити список варіантів, які можна спробувати:

_Примітка: через перевантаження мережі це може зайняти деякий час._
``

### Крок 5. Перевірка балансу {#step-5-check-your-balance}

Щоб ще раз перевірити, чи є ETH у вашому гаманці, зробімо запит [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) за допомогою [інструмента-композитора від Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Це поверне кількість ETH в ваш гаманець. Щоб дізнатися більше, перегляньте [короткий посібник від Alchemy про те, як використовувати інструмент-композитор](https://youtu.be/r6sjRxBZJuU).

Введіть адресу свого облікового запису MetaMask і натисніть **Send Request**. Ви побачите відповідь, схожу на фрагмент коду нижче.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _Примітка: цей результат у wei, а не в ETH. Wei використовується як найменша одиниця ефіру._

Фух! Наші "гроші" все ще там.

### Крок 6. Ініціалізація проєкту {#step-6-initialize-our-project}

Спочатку нам потрібно буде створити папку для нашого проєкту. Перейдіть до командного рядка та введіть наступне.

```
mkdir hello-world
cd hello-world
```

Тепер, коли ми всередині папки нашого проєкту, ми використаємо `npm init` для ініціалізації проєкту.

> Якщо у вас ще не встановлено npm, дотримуйтесь [цих інструкцій, щоб встановити Node.js та npm](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm).

Для цілей цього посібника не має значення, як ви відповісте на запитання щодо ініціалізації. Ось як ми це зробили для довідки:

```
назва пакета: (hello-world)
версія: (1.0.0)
опис: смарт-контракт hello world
точка входу: (index.js)
тестова команда:
репозиторій git:
ключові слова:
автор:
ліцензія: (ISC)

Збираюся записати в /Users/.../.../.../hello-world/package.json:

{
   "name": "hello-world",
   "version": "1.0.0",
   "description": "смарт-контракт hello world",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Помилка: тест не вказано\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

Підтвердіть package.json, і можемо продовжувати!

### Крок 7. Завантаження Hardhat {#step-7-download-hardhat}

Hardhat є середовищем розробки для компіляції, розгортання, тестування та налагодження вашого програмного забезпечення Ethereum. Це допомагає розробникам створювати смарт-контракти та dapp локально перед розгортанням у реальний ланцюжок.

Усередині нашого проєкту `hello-world` запустіть:

```
npm install --save-dev hardhat
```

Перегляньте цю сторінку, щоб дізнатися більше про [інструкції з установки](https://hardhat.org/getting-started/#overview).

### Крок 8. Створення проєкту Hardhat {#step-8-create-hardhat-project}

У папці нашого проєкту `hello-world` запустіть:

```
npx hardhat
```

Потім ви маєте побачити вітальне повідомлення та вибір подальших бажаних дій. Оберіть "Створити порожній hardhat.config.js":

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Ласкаво просимо до Hardhat v2.0.11 👷‍

Що ви хочете зробити? …
Створити зразок проєкту
❯ Створити порожній hardhat.config.js
Вийти
```

Це згенерує файл `hardhat.config.js` у проєкті. Ми використаємо це пізніше в посібнику, щоб вказати налаштування для нашого проєкту.

### Крок 9. Додавання папок проєкту {#step-9-add-project-folders}

Щоб проєкт був упорядкований, створимо дві нові папки. У командному рядку перейдіть до кореневого каталогу вашого проєкту `hello-world` і введіть:

```
mkdir contracts
mkdir scripts
```

- `contracts/` — тут ми будемо зберігати файл коду нашого смарт-контракту «hello world».
- `scripts/` — тут ми будемо зберігати скрипти для розгортання та взаємодії з нашим контрактом.

### Крок 10. Написання нашого контракту {#step-10-write-our-contract}

Ви, можливо, запитуєте себе, коли ми вже будемо писати код? Час настав!

Відкрийте проєкт hello-world у вашому улюбленому редакторі. Смарт-контракти найчастіше пишуться на Solidity, яку ми й будемо використовувати для написання нашого смарт-контракту.‌

1. Перейдіть до папки `contracts` і створіть новий файл під назвою `HelloWorld.sol`
2. Нижче наведено зразок смарт-контракту Hello World, який ми будемо використовувати для цього посібника. Скопіюйте вміст нижче у файл `HelloWorld.sol`.

_Примітка: обов’язково прочитайте коментарі, щоб зрозуміти, що робить цей контракт._

```
// Визначає версію Solidity, використовуючи семантичне версіонування.
// Дізнатися більше: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Визначає контракт з назвою `HelloWorld`.
// Контракт — це набір функцій і даних (його стан). Після розгортання контракт знаходиться за певною адресою в блокчейні Ethereum. Дізнатися більше: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Викликається, коли викликається функція оновлення
   // Події смарт-контракту — це спосіб, за допомогою якого ваш контракт повідомляє, що щось сталося в блокчейні, вашому зовнішньому застосунку, який може «слухати» певні події та реагувати на них, коли вони відбуваються.
   event UpdatedMessages(string oldStr, string newStr);

   // Оголошує змінну стану `message` типу `string`.
   // Змінні стану — це змінні, значення яких постійно зберігаються в сховищі контракту. Ключове слово `public` робить змінні доступними ззовні контракту та створює функцію, яку інші контракти або клієнти можуть викликати для доступу до значення.
   string public message;

   // Подібно до багатьох класових об'єктно-орієнтованих мов, конструктор — це спеціальна функція, яка виконується лише під час створення контракту.
   // Конструктори використовуються для ініціалізації даних контракту. Дізнатися більше:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Приймає строковий аргумент `initMessage` та встановлює значення у змінну сховища контракту `message`).
      message = initMessage;
   }

   // Публічна функція, яка приймає строковий аргумент і оновлює змінну сховища `message`.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Це базовий смарт-контракт, який зберігає повідомлення після створення. Його можна оновити, викликавши функцію `update`.

### Крок 11. Підключення MetaMask і Alchemy до вашого проєкту {#step-11-connect-metamask-alchemy-to-your-project}

Ми створили гаманець MetaMask, обліковий запис Alchemy і написали наш смарт-контракт, тепер час з’єднати всі три компоненти.

Кожна транзакція, надіслана з вашого гаманця, вимагає підпису з використанням вашого унікального приватного ключа. Щоб надати нашій програмі цей дозвіл, ми можемо безпечно зберігати наш приватний ключ у файлі середовища. Ми також будемо зберігати тут ключ API для Alchemy.

> Щоб дізнатися більше про надсилання транзакцій, перегляньте [цей посібник](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project) про надсилання транзакцій за допомогою web3.

Спочатку встановіть пакет dotenv у каталог вашого проєкту:

```
npm install dotenv --save
```

Потім створіть файл `.env` у кореневому каталозі проєкту. Додайте до нього свій приватний ключ MetaMask та URL-адресу HTTP API Alchemy.

Ваш файл середовища має називатися `.env`, інакше він не буде розпізнаний як файл середовища.

Не називайте його `process.env` або `.env-custom` чи якось інакше.

- Дотримуйтесь [цих інструкцій](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key), щоб експортувати свій приватний ключ
- Дивіться нижче, щоб отримати URL-адресу HTTP Alchemy API

![](./get-alchemy-api-key.gif)

Ваш `.env` повинен виглядати так:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/ваш-api-ключ"
PRIVATE_KEY = "ваш-приватний-ключ-metamask"
```

Щоб підключити їх до нашого коду, ми будемо посилатися на ці змінні в нашому файлі `hardhat.config.js` на кроці 13.

### Крок 12: Встановлення Ethers.js {#step-12-install-ethersjs}

Ethers.js — це бібліотека, яка спрощує взаємодію та надсилання запитів до Ethereum, огортаючи [стандартні методи JSON-RPC](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) більш зручними для користувача методами.

Hardhat дає змогу інтегрувати [плагіни](https://hardhat.org/plugins/) для додаткових інструментів і розширеної функціональності. Ми скористаємося [плагіном Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) для розгортання контракту.

У каталозі вашого проєкту надрукуйте:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### Крок 13. Оновлення hardhat.config.js {#step-13-update-hardhat-configjs}

Ми вже додали кілька залежностей і плагінів, тепер нам потрібно оновити `hardhat.config.js`, щоб наш проєкт знав про них усі.

Оновіть ваш `hardhat.config.js` так, щоб він виглядав наступним чином:

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

### Крок 14. Компіляція нашого контракту {#step-14-compile-our-contract}

Щоб переконатися, що все працює, скомпілюймо наш контракт. Завдання `compile` є одним із вбудованих завдань Hardhat.

З командного рядка запустіть:

```bash
npx hardhat compile
```

Ви можете отримати попередження про `SPDX license identifier not provided in source file`, але не варто про це турбуватися — сподіваємось, усе інше виглядає добре! Якщо ні, ви завжди можете написати повідомлення в [Discord-каналі Alchemy](https://discord.gg/u72VCg3).

### Крок 15. Написання нашого скрипта розгортання {#step-15-write-our-deploy-script}

Тепер, коли контракт написано, і файл конфігурації готовий до запуску, настав час написати скрипт розгортання контракту.

Перейдіть до папки `scripts/` і створіть новий файл `deploy.js`, додавши до нього такий вміст:

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // Почати розгортання, повертаючи проміс, який перетворюється на об'єкт контракту
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Контракт розгорнуто за адресою:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat чудово пояснює, що робить кожен із цих рядків коду, у своєму [посібнику з контрактів](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), ми використали їхні пояснення тут.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

`ContractFactory` в ethers.js — це абстракція, яка використовується для розгортання нових смарт-контрактів, тому `HelloWorld` тут — це [фабрика](https://en.wikipedia.org/wiki/Factory_\(object-oriented_programming\)) для екземплярів нашого контракту hello world. При використанні плагіна `hardhat-ethers` екземпляри `ContractFactory` та `Contract` за замовчуванням підключаються до першого підписанта (власника).

```javascript
const hello_world = await HelloWorld.deploy()
```

Виклик `deploy()` для `ContractFactory` запустить розгортання та поверне `Promise`, який перетвориться на об'єкт `Contract`. Це об'єкт, у якого є метод для кожної з наших функцій смартконтракту.

### Крок 16: Розгортання нашого контракту {#step-16-deploy-our-contract}

Ми нарешті готові розгорнути наш розумний контракт! Перейдіть до командного рядка та запустіть:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

Тоді ви повинні побачити щось на кшталт:

```bash
Контракт розгорнуто за адресою: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**Будь ласка, збережіть цю адресу**. Ми будемо використовувати її пізніше в цьому посібнику.

Якщо ми перейдемо на [Etherscan для Goerli](https://goerli.etherscan.io) і знайдемо адресу нашого контракту, ми повинні побачити, що він був успішно розгорнутий. Транзакція буде виглядати приблизно так:

![](./etherscan-contract.png)

Адреса `From` має збігатися з адресою вашого облікового запису MetaMask, а адреса `To` буде вказувати на **створення контракту**. Якщо ми клацнемо на транзакцію, ми побачимо адресу нашого контракту в полі `To`.

![](./etherscan-transaction.png)

Вітаємо! Ви щойно розгорнули смарт-контракт у тестовій мережі Ethereum.

Щоб зрозуміти, що відбувається «під капотом», перейдімо на вкладку «Провідник» на нашій [інформаційній панелі Alchemy](https://dashboard.alchemy.com/explorer). Якщо у вас є кілька застосунків Alchemy, обов’язково відфільтруйте їх за застосунком і виберіть **Hello World**.

![](./hello-world-explorer.png)

Тут ви побачите кілька методів JSON-RPC, які Hardhat/Ethers виконали для нас «під капотом», коли ми викликали функцію `.deploy()`. Два важливі методи тут — це [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), який є запитом на запис нашого контракту в ланцюг Goerli, та [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash), який є запитом на читання інформації про нашу транзакцію за заданим хешем. Щоб дізнатися більше про надсилання транзакцій, перегляньте [наш посібник про надсилання транзакцій за допомогою Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

## Частина 2. Взаємодія з вашим смарт-контрактом {#part-2-interact-with-your-smart-contract}

Тепер, коли ми успішно розгорнули смарт-контракт у мережі Goerli, давайте дізнаємося, як з ним взаємодіяти.

### Створення файлу interact.js {#create-a-interactjs-file}

Це файл, у якому ми напишемо наш скрипт взаємодії. Ми будемо використовувати бібліотеку Ethers.js, яку ви раніше встановили в Частині 1.

Усередині папки `scripts/` створіть новий файл з назвою `interact.js` та додайте наступний код:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### Оновіть свій файл .env {#update-your-env-file}

Ми будемо використовувати нові змінні середовища, тому нам потрібно визначити їх у файлі `.env`, який [ми створили раніше](#step-11-connect-metamask-&-alchemy-to-your-project).

Нам потрібно буде додати визначення для нашого Alchemy `API_KEY` та `CONTRACT_ADDRESS`, де був розгорнутий ваш смарт-контракт.

Ваш файл `.env` повинен виглядати приблизно так:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<ваш-api-ключ>"
API_KEY = "<ваш-api-ключ>"
PRIVATE_KEY = "<ваш-приватний-ключ-metamask>"
CONTRACT_ADDRESS = "0x<адреса вашого контракту>"
```

### Отримайте ABI вашого контракту {#grab-your-contract-ABI}

Наш [ABI (Application Binary Interface)](/glossary/#abi) контракту — це інтерфейс для взаємодії з нашим смарт-контрактом. Hardhat автоматично генерує ABI і зберігає його у `HelloWorld.json`. Щоб використовувати ABI, нам потрібно буде розібрати вміст, додавши наступні рядки коду до нашого файлу `interact.js`:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

Якщо ви хочете побачити ABI, ви можете вивести його в консоль:

```javascript
console.log(JSON.stringify(contract.abi))
```

Щоб побачити ваш ABI, надрукований у консолі, перейдіть до терміналу та запустіть:

```bash
npx hardhat run scripts/interact.js
```

### Створення екземпляру вашого контракту {#create-an-instance-of-your-contract}

Щоб взаємодіяти з нашим контрактом, нам потрібно створити екземпляр контракту в нашому коді. Для цього з Ethers.js нам потрібно буде працювати з трьома поняттями:

1. Provider (Постачальник) - постачальник вузлів, який дає вам доступ на читання та запис до блокчейну
2. Signer (Підписант) - представляє обліковий запис Ethereum, який може підписувати транзакції
3. Contract (Контракт) - об'єкт Ethers.js, що представляє конкретний контракт, розгорнутий в мережі

Ми використаємо ABI контракту з попереднього кроку для створення екземпляра нашого контракту:

```javascript
// interact.js

// Постачальник
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Підписант
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Контракт
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

Дізнайтеся більше про постачальників, підписантів та контракти в [документації ethers.js](https://docs.ethers.io/v5/).

### Читання початкового повідомлення {#read-the-init-message}

Пам'ятаєте, коли ми розгортали наш контракт з `initMessage = "Hello world!"`? Тепер ми прочитаємо це повідомлення, збережене в нашому смарт-контракті, і виведемо його в консоль.

У JavaScript асинхронні функції використовуються при взаємодії з мережами. Щоб дізнатися більше про асинхронні функції, [прочитайте цю статтю на Medium](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

Використовуйте код нижче, щоб викликати функцію `message` у нашому смарт-контракті та прочитати початкове повідомлення:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("Повідомлення: " + message)
}
main()
```

Після запуску файлу за допомогою `npx hardhat run scripts/interact.js` у терміналі ми повинні побачити таку відповідь:

```
Повідомлення: Hello world!
```

Вітаємо! Ви щойно успішно прочитали дані смарт-контракту з блокчейну Ethereum, так тримати!

### Оновлення повідомлення {#update-the-message}

Замість того, щоб просто читати повідомлення, ми також можемо оновити повідомлення, збережене в нашому смарт-контракті, за допомогою функції `update`! Круто, чи не так?

Щоб оновити повідомлення, ми можемо безпосередньо викликати функцію `update` на нашому екземплярі об'єкта Contract:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("Повідомлення: " + message)

  console.log("Оновлення повідомлення...")
  const tx = await helloWorldContract.update("Це нове повідомлення.")
  await tx.wait()
}
main()
```

Зверніть увагу, що в рядку 11 ми робимо виклик `.wait()` для повернутого об'єкта транзакції. Це гарантує, що наш скрипт чекає, поки транзакція буде видобута в блокчейні, перш ніж вийти з функції. Якщо виклик `.wait()` не буде включений, скрипт може не побачити оновлене значення `message` в контракті.

### Прочитати нове повідомлення {#read-the-new-message}

Ви повинні бути в змозі повторити [попередній крок](#read-the-init-message), щоб прочитати оновлене значення `message`. Приділіть хвилинку і подивіться, чи зможете ви внести необхідні зміни, щоб вивести це нове значення!

Якщо вам потрібна підказка, ось як на даний момент повинен виглядати ваш файл `interact.js`:

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
  console.log("Повідомлення: " + message)

  console.log("Оновлення повідомлення...")
  const tx = await helloWorldContract.update("це нове повідомлення")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("Нове повідомлення: " + newMessage)
}

main()
```

Тепер просто запустіть скрипт, і ви повинні побачити старе повідомлення, статус оновлення та нове повідомлення, виведені у вашому терміналі!

`npx hardhat run scripts/interact.js --network goerli`

```
Повідомлення: Hello World!
Оновлення повідомлення...
Нове повідомлення: Це нове повідомлення.
```

Під час виконання цього скрипта ви можете помітити, що крок `Оновлення повідомлення...` займає деякий час, перш ніж завантажиться нове повідомлення. Це пов'язано з процесом майнінгу; якщо вам цікаво відстежувати транзакції під час їхнього майнінгу, відвідайте [мемпул Alchemy](https://dashboard.alchemyapi.io/mempool), щоб побачити статус транзакції. Якщо транзакцію відхилено, корисно також перевірити [Goerli Etherscan](https://goerli.etherscan.io) і знайти хеш вашої транзакції.

## Частина 3. Публікація вашого смарт-контракту на Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

Ви виконали всю важку роботу, щоб втілити в життя свій смарт-контракт; тепер настав час поділитися ним зі світом!

Підтвердивши свій смарт-контракт на Etherscan, будь-хто зможе переглянути ваш вихідний код і взаємодіяти з вашим смарт-контрактом. Почнімо!

### Крок 1: Створіть ключ API у своєму акаунті Etherscan {#step-1-generate-an-api-key-on-your-etherscan-account}

Ключ API Etherscan необхідний для підтвердження того, що ви є власником смарт-контракту, який ви намагаєтеся опублікувати.

Якщо у вас ще немає акаунта Etherscan, [зареєструйтеся](https://etherscan.io/register).

Після входу в систему знайдіть своє ім'я користувача на панелі навігації, наведіть на нього курсор і виберіть кнопку **Мій профіль**.

На сторінці вашого профілю ви повинні побачити бічну панель навігації. На бічній панелі навігації виберіть **API Keys**. Далі натисніть кнопку «Додати», щоб створити новий ключ API, назвіть свій застосунок **hello-world** і натисніть кнопку **Створити новий ключ API**.

Ваш новий ключ API повинен з'явитися в таблиці ключів API. Скопіюйте ключ API до буфера обміну.

Далі, нам потрібно додати ключ API Etherscan до нашого файлу `.env`.

Після його додавання ваш файл `.env` повинен виглядати так:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/ваш-api-ключ"
PUBLIC_KEY = "ваша-публічна-адреса-акаунту"
PRIVATE_KEY = "ваша-приватна-адреса-акаунту"
CONTRACT_ADDRESS = "адреса-вашого-контракту"
ETHERSCAN_API_KEY = "ваш-ключ-etherscan"
```

### Смарт-контракти, розгорнуті за допомогою Hardhat {#hardhat-deployed-smart-contracts}

#### Встановіть hardhat-etherscan {#install-hardhat-etherscan}

Публікація вашого контракту на Etherscan за допомогою Hardhat є простою. Спочатку вам потрібно буде встановити плагін `hardhat-etherscan`, щоб почати. `hardhat-etherscan` автоматично перевірить вихідний код смарт-контракту та ABI на Etherscan. Щоб додати це, у каталозі `hello-world` запустіть:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

Після встановлення додайте наступний вираз на початку вашого файлу `hardhat.config.js` і додайте опції конфігурації Etherscan:

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
    // Отримайте його на https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Перевірте свій смарт-контракт на Etherscan {#verify-your-smart-contract-on-etherscan}

Переконайтеся, що всі файли збережені, а всі змінні `.env` налаштовані правильно.

Запустіть завдання `verify`, передавши адресу контракту та мережу, в якій він розгорнутий:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

Переконайтеся, що `DEPLOYED_CONTRACT_ADDRESS` — це адреса вашого розгорнутого смарт-контракту в тестовій мережі Goerli. Також останній аргумент (`'Hello World!'`) має бути таким самим рядковим значенням, яке використовувалося [на етапі розгортання в частині 1](#write-our-deploy-script).

Якщо все пройде добре, ви побачите наступне повідомлення у вашому терміналі:

```text
Джерельний код контракту успішно надіслано
contracts/HelloWorld.sol:HelloWorld за адресою 0xdeployed-contract-address
для перевірки на Etherscan. Очікування результату перевірки...


Контракт HelloWorld успішно перевірено на Etherscan.
https://goerli.etherscan.io/address/<адреса-контракту>#contracts
```

Вітаємо! Код вашого смарт-контракту є на Etherscan!

### Перегляньте свій смарт-контракт на Etherscan! {#check-out-your-smart-contract-on-etherscan}

Коли ви перейдете за посиланням, наданим у вашому терміналі, ви зможете побачити код свого смарт-контракту та ABI, опубліковані на Etherscan!

**Вау - ти це зробив, чемпіоне! Тепер будь-хто може викликати ваш смарт-контракт або писати в нього! Ми з нетерпінням чекаємо, що ви створите далі!**

## Частина 4 - Інтеграція вашого смарт-контракту з фронтендом {#part-4-integrating-your-smart-contract-with-the-frontend}

До кінця цього посібника ви дізнаєтеся, як:

- Підключити гаманець MetaMask до вашого dapp
- Читання даних з вашого смарт-контракту за допомогою [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) API
- Підписувати транзакції Ethereum за допомогою MetaMask

Для цього dapp ми будемо використовувати [React](https://react.dev/) як наш фронтенд-фреймворк; однак важливо зазначити, що ми не будемо витрачати багато часу на розбір його основ, оскільки ми переважно зосередимося на впровадженні функціональності Web3 у наш проєкт.

Як попередня умова, ви повинні мати початкове розуміння React. Якщо ні, ми рекомендуємо пройти офіційний [Вступ до React](https://react.dev/learn).

### Клонуйте стартові файли {#clone-the-starter-files}

Спочатку перейдіть до [репозиторію hello-world-part-four на GitHub](https://github.com/alchemyplatform/hello-world-part-four-tutorial), щоб отримати стартові файли для цього проєкту та клонувати цей репозиторій на свій локальний комп'ютер.

Відкрийте клонований репозиторій локально. Зверніть увагу, що він містить дві папки: `starter-files` та `completed`.

- `starter-files`- **ми будемо працювати в цьому каталозі**, ми підключимо інтерфейс користувача до вашого гаманця Ethereum та смарт-контракту, який ми опублікували на Etherscan у [Частині 3](#part-3).
- `completed` містить повністю завершений посібник і повинен використовуватися лише як довідник, якщо ви застрягли.

Далі, відкрийте свою копію `starter-files` у вашому улюбленому редакторі коду, а потім перейдіть до папки `src`.

Весь код, який ми будемо писати, буде знаходитися в папці `src`. Ми будемо редагувати компонент `HelloWorld.js` та файли JavaScript `util/interact.js`, щоб надати нашому проєкту функціональність Web3.

### Перевірте стартові файли {#check-out-the-starter-files}

Перш ніж ми почнемо кодувати, давайте розглянемо, що нам надано в стартових файлах.

#### Запустіть ваш проєкт на React {#get-your-react-project-running}

Давайте почнемо із запуску проєкту на React у нашому браузері. Перевага React полягає в тому, що коли наш проєкт запущений у браузері, будь-які збережені зміни будуть оновлюватися в браузері в реальному часі.

Щоб запустити проєкт, перейдіть до кореневого каталогу папки `starter-files` і запустіть `npm install` у вашому терміналі, щоб встановити залежності проєкту:

```bash
cd starter-files
npm install
```

Після завершення інсталяції запустіть `npm start` у вашому терміналі:

```bash
npm start
```

Це повинно відкрити [http://localhost:3000/](http://localhost:3000/) у вашому браузері, де ви побачите фронтенд для нашого проєкту. Він повинен складатися з одного поля (місця для оновлення повідомлення, що зберігається у вашому смарт-контракті), кнопки «Підключити гаманець» та кнопки «Оновити».

Якщо ви спробуєте натиснути будь-яку кнопку, ви помітите, що вони не працюють — це тому, що нам ще потрібно запрограмувати їх функціональність.

#### Компонент `HelloWorld.js` {#the-helloworld-js-component}

Давайте повернемося до папки `src` у нашому редакторі та відкриємо файл `HelloWorld.js`. Дуже важливо, щоб ми розуміли все в цьому файлі, оскільки це основний компонент React, над яким ми будемо працювати.

У верхній частині цього файлу ви помітите кілька операторів імпорту, які необхідні для запуску нашого проєкту, включаючи бібліотеку React, хуки useEffect та useState, деякі елементи з `./util/interact.js` (ми опишемо їх детальніше пізніше!), та логотип Alchemy.

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
const [message, setMessage] = useState("Немає з'єднання з мережею.")
const [newMessage, setNewMessage] = useState("")
```

Ось що представляє кожна зі змінних:

- `walletAddress` — рядок, у якому зберігається адреса гаманця користувача
- `status`- рядок, який зберігає корисне повідомлення, що направляє користувача, як взаємодіяти з dapp
- `message` - рядок, який зберігає поточне повідомлення у смарт-контракті
- `newMessage` - рядок, який зберігає нове повідомлення, яке буде записано в смарт-контракт

Після змінних стану ви побачите п'ять нереалізованих функцій: `useEffect` , `addSmartContractListener`, `addWalletListener`, `connectWalletPressed` та `onUpdatePressed`. Нижче ми пояснимо, що вони роблять:

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

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html)- це хук React, який викликається після рендерингу вашого компонента. Оскільки в нього передано порожній масив `[]` (див. рядок 4), він буде викликаний лише під час _першого_ рендерингу компонента. Тут ми завантажимо поточне повідомлення, що зберігається в нашому смарт-контракті, викличемо наші слухачі смарт-контракту та гаманця, і оновимо наш інтерфейс, щоб відобразити, чи вже підключений гаманець.
- `addSmartContractListener`- ця функція налаштовує слухача, який буде стежити за подією `UpdatedMessages` нашого контракту HelloWorld та оновлювати наш інтерфейс, коли повідомлення змінюється в нашому смарт-контракті.
- `addWalletListener`- ця функція налаштовує слухача, який виявляє зміни в стані гаманця MetaMask користувача, наприклад, коли користувач відключає свій гаманець або змінює адреси.
- `connectWalletPressed`- ця функція буде викликана для підключення гаманця MetaMask користувача до нашого dapp.
- `onUpdatePressed` - ця функція буде викликана, коли користувач захоче оновити повідомлення, що зберігається в смарт-контракті.

Ближче до кінця цього файлу ми маємо інтерфейс користувача нашого компонента.

```javascript
// HelloWorld.js

//інтерфейс нашого компонента
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Підключено: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Підключити гаманець</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Поточне повідомлення:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>Нове повідомлення:</h2>

    <div>
      <input
        type="text"
        placeholder="Оновіть повідомлення у вашому смарт-контракті."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Оновити
      </button>
</div>
 
</div>
)
```

Якщо ви уважно переглянете цей код, ви помітите, де ми використовуємо наші різні змінні стану в нашому інтерфейсі:

- У рядках 6-12, якщо гаманець користувача підключений (тобто `walletAddress.length > 0`), ми відображаємо скорочену версію `walletAddress` користувача в кнопці з ID "walletButton;" в іншому випадку вона просто говорить "Підключити гаманець".
- У рядку 17 ми відображаємо поточне повідомлення, що зберігається в смарт-контракті, яке міститься в рядку `message`.
- У рядках 23-26 ми використовуємо [контрольований компонент](https://legacy.reactjs.org/docs/forms.html#controlled-components) для оновлення нашої змінної стану `newMessage`, коли змінюється ввід у текстовому полі.

Крім наших змінних стану, ви також побачите, що функції `connectWalletPressed` та `onUpdatePressed` викликаються при натисканні кнопок з ID `publishButton` та `walletButton` відповідно.

Нарешті, давайте розберемося, куди додається цей компонент `HelloWorld.js`.

Якщо ви перейдете до файлу `App.js`, який є головним компонентом в React, що діє як контейнер для всіх інших компонентів, ви побачите, що наш компонент `HelloWorld.js` вставлено в рядку 7.

І останнє, але не менш важливе, давайте розглянемо ще один наданий вам файл, `interact.js`.

#### Файл `interact.js` {#the-interact-js-file}

Оскільки ми хочемо дотримуватися парадигми [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), нам знадобиться окремий файл, який містить усі наші функції для керування логікою, даними та правилами нашого dapp, а потім мати змогу експортувати ці функції до нашого фронтенду (наш компонент `HelloWorld.js`).

👆🏽Це і є точне призначення нашого файлу `interact.js`!

Перейдіть до папки `util` у вашому каталозі `src`, і ви помітите, що ми включили файл з назвою `interact.js`, який буде містити всі наші функції та змінні для взаємодії зі смарт-контрактом та гаманцем.

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

Ви помітите, що на початку файлу ми закоментували об'єкт `helloWorldContract`. Пізніше в цьому посібнику ми розкоментуємо цей об'єкт і створимо екземпляр нашого смарт-контракту в цій змінній, яку ми потім експортуємо в наш компонент `HelloWorld.js`.

Чотири нереалізовані функції після нашого об'єкта `helloWorldContract` роблять наступне:

- `loadCurrentMessage` - ця функція обробляє логіку завантаження поточного повідомлення, що зберігається в смарт-контракті. Вона зробить виклик _читання_ до смарт-контракту Hello World за допомогою [API Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).
- `connectWallet` - ця функція підключить MetaMask користувача до нашого dapp.
- `getCurrentWalletConnected` - ця функція перевірить, чи обліковий запис Ethereum вже підключено до нашого dapp під час завантаження сторінки, і відповідно оновить наш інтерфейс.
- `updateMessage` - ця функція оновить повідомлення, що зберігається в смарт-контракті. Вона зробить виклик _запису_ до смарт-контракту Hello World, тому гаманець MetaMask користувача повинен буде підписати транзакцію Ethereum, щоб оновити повідомлення.

Тепер, коли ми розуміємо, з чим маємо справу, давайте з'ясуємо, як читати з нашого смарт-контракту!

### Крок 3: Читання з вашого смарт-контракту {#step-3-read-from-your-smart-contract}

Щоб читати з вашого смарт-контракту, вам потрібно успішно налаштувати:

- API-з'єднання з ланцюгом Ethereum
- Завантажений екземпляр вашого смарт-контракту
- Функція для виклику функції вашого смарт-контракту
- Слухач для відстеження оновлень, коли дані, які ви читаєте зі смарт-контракту, змінюються

Це може здатися великою кількістю кроків, але не хвилюйтеся! Ми проведемо вас через кожен з них крок за кроком! :\)

#### Встановлення API-з'єднання з ланцюгом Ethereum {#establish-an-api-connection-to-the-ethereum-chain}

Отже, пам'ятаєте, як у частині 2 цього посібника ми використовували наш [ключ Alchemy Web3 для читання з нашого смарт-контракту](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library)? Вам також знадобиться ключ Alchemy Web3 у вашому dapp для читання з ланцюга.

Якщо у вас його ще немає, спочатку встановіть [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), перейшовши до кореневого каталогу вашого `starter-files` і запустивши наступне у вашому терміналі:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) — це оболонка для [Web3.js](https://docs.web3js.org/), що надає розширені методи API та інші важливі переваги, щоб полегшити ваше життя як розробника web3. Він розроблений так, щоб вимагати мінімальної конфігурації, щоб ви могли одразу почати використовувати його у своєму додатку!

Потім встановіть пакет [dotenv](https://www.npmjs.com/package/dotenv) у вашому каталозі проєкту, щоб у нас було безпечне місце для зберігання нашого ключа API після того, як ми його отримаємо.

```text
npm install dotenv --save
```

Для нашого dapp **ми будемо використовувати наш ключ API Websockets**, а не наш ключ API HTTP, оскільки це дозволить нам налаштувати слухача, який виявляє, коли змінюється повідомлення, що зберігається в смарт-контракті.

Коли у вас буде ключ API, створіть файл `.env` у вашому кореневому каталозі та додайте до нього URL-адресу Alchemy Websockets. Після цього ваш файл `.env` повинен виглядати так:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<ключ>
```

Тепер ми готові налаштувати нашу кінцеву точку Alchemy Web3 у нашому dapp! Давайте повернемося до нашого файлу `interact.js`, який знаходиться в папці `util`, і додамо наступний код на початку файлу:

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

Щоб завантажити ваш смарт-контракт Hello World, вам знадобляться його адреса контракту та ABI, обидва з яких можна знайти на Etherscan, якщо ви завершили [Частину 3 цього посібника.](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)

#### Як отримати ABI вашого контракту з Etherscan {#how-to-get-your-contract-abi-from-etherscan}

Якщо ви пропустили частину 3 цього посібника, ви можете використовувати контракт HelloWorld з адресою [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code). Його ABI можна знайти [тут](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).

ABI контракту необхідний для визначення, яку функцію буде викликати контракт, а також для гарантії, що функція поверне дані в очікуваному форматі. Після того, як ми скопіювали наш ABI контракту, давайте збережемо його як файл JSON з назвою `contract-abi.json` у вашому каталозі `src`.

Ваш файл contract-abi.json повинен зберігатися у вашій папці src.

Озброївшись адресою контракту, ABI та кінцевою точкою Alchemy Web3, ми можемо використовувати [метод контракту](https://docs.web3js.org/api/web3-eth-contract/class/Contract), щоб завантажити екземпляр нашого смарт-контракту. Імпортуйте ваш ABI контракту у файл `interact.js` та додайте адресу вашого контракту.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

Тепер ми можемо нарешті розкоментувати нашу змінну `helloWorldContract` і завантажити смарт-контракт, використовуючи нашу кінцеву точку AlchemyWeb3:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Отже, перші 12 рядків вашого файлу `interact.js` тепер повинні виглядати так:

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

Тепер, коли наш контракт завантажений, ми можемо реалізувати нашу функцію `loadCurrentMessage`!

#### Реалізація `loadCurrentMessage` у вашому файлі `interact.js` {#implementing-loadCurrentMessage-in-your-interact-js-file}

Ця функція надзвичайно проста. Ми зробимо простий асинхронний виклик web3 для читання з нашого контракту. Наша функція поверне повідомлення, що зберігається в смарт-контракті:

Оновіть `loadCurrentMessage` у вашому файлі `interact.js` до наступного:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

Оскільки ми хочемо відобразити цей смарт-контракт у нашому інтерфейсі, давайте оновимо функцію `useEffect` у нашому компоненті `HelloWorld.js` до наступного:

```javascript
// HelloWorld.js

//викликається лише один раз
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

Зауважте, ми хочемо, щоб наша функція `loadCurrentMessage` викликалася лише один раз під час першого рендерингу компонента. Незабаром ми реалізуємо `addSmartContractListener`, щоб автоматично оновлювати інтерфейс після зміни повідомлення в смарт-контракті.

Перш ніж зануритися в наш слухач, давайте перевіримо, що ми маємо на даний момент! Збережіть ваші файли `HelloWorld.js` та `interact.js`, а потім перейдіть на [http://localhost:3000/](http://localhost:3000/)

Ви помітите, що поточне повідомлення більше не говорить "Немає з'єднання з мережею." Натомість воно відображає повідомлення, що зберігається в смарт-контракті. Круто!

#### Ваш інтерфейс тепер повинен відображати повідомлення, що зберігається в смарт-контракті {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

Тепер щодо того слухача...

#### Реалізувати `addSmartContractListener` {#implement-addsmartcontractlistener}

Якщо ви згадаєте файл `HelloWorld.sol`, який ми написали в [Частині 1 цієї серії посібників](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract), ви згадаєте, що існує подія смарт-контракту під назвою `UpdatedMessages`, яка випромінюється після виклику функції `update` нашого смарт-контракту (див. рядки 9 та 27):

```javascript
// HelloWorld.sol

// Визначає версію Solidity, використовуючи семантичне версіонування.
// Дізнатися більше: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// Визначає контракт з назвою `HelloWorld`.
// Контракт — це набір функцій і даних (його стан). Після розгортання контракт знаходиться за певною адресою в блокчейні Ethereum. Дізнатися більше: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Викликається, коли викликається функція оновлення
   // Події смарт-контракту — це спосіб, за допомогою якого ваш контракт повідомляє, що щось сталося в блокчейні, вашому зовнішньому застосунку, який може «слухати» певні події та реагувати на них, коли вони відбуваються.
   event UpdatedMessages(string oldStr, string newStr);

   // Оголошує змінну стану `message` типу `string`.
   // Змінні стану — це змінні, значення яких постійно зберігаються в сховищі контракту. Ключове слово `public` робить змінні доступними ззовні контракту та створює функцію, яку інші контракти або клієнти можуть викликати для доступу до значення.
   string public message;

   // Подібно до багатьох класових об'єктно-орієнтованих мов, конструктор — це спеціальна функція, яка виконується лише під час створення контракту.
   // Конструктори використовуються для ініціалізації даних контракту. Дізнатися більше:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Приймає строковий аргумент `initMessage` та встановлює значення у змінну сховища контракту `message`).
      message = initMessage;
   }

   // Публічна функція, яка приймає строковий аргумент і оновлює змінну сховища `message`.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Події смарт-контракту — це спосіб, за допомогою якого ваш контракт повідомляє, що щось сталося (тобто, відбулася _подія_) в блокчейні, вашому фронтенд-застосунку, який може «слухати» певні події та реагувати на них, коли вони відбуваються.

Функція `addSmartContractListener` буде спеціально слухати подію `UpdatedMessages` нашого смарт-контракту Hello World і оновлювати наш інтерфейс для відображення нового повідомлення.

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
      setStatus("🎉 Ваше повідомлення оновлено!")
    }
  })
}
```

Давайте розберемо, що відбувається, коли слухач виявляє подію:

- Якщо під час випромінювання події виникає помилка, це буде відображено в інтерфейсі через нашу змінну стану `status`.
- В іншому випадку ми будемо використовувати повернутий об'єкт `data`. `data.returnValues` — це масив, індексований з нуля, де перший елемент масиву зберігає попереднє повідомлення, а другий — оновлене. Загалом, у разі успішної події ми встановимо наш рядок `message` на оновлене повідомлення, очистимо рядок `newMessage` і оновимо нашу змінну стану `status`, щоб відобразити, що нове повідомлення було опубліковано в нашому смарт-контракті.

Нарешті, давайте викличемо наш слухач у нашій функції `useEffect`, щоб він був ініціалізований під час першого рендерингу компонента `HelloWorld.js`. Загалом, ваша функція `useEffect` повинна виглядати так:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

Тепер, коли ми можемо читати з нашого смарт-контракту, було б чудово з'ясувати, як писати в нього! Однак, щоб писати в наш dapp, ми повинні спочатку підключити до нього гаманець Ethereum.

Отже, далі ми займемося налаштуванням нашого гаманця Ethereum (MetaMask), а потім підключимо його до нашого dapp!

### Крок 4: Налаштуйте свій гаманець Ethereum {#step-4-set-up-your-ethereum-wallet}

Щоб щось записати в ланцюг Ethereum, користувачі повинні підписувати транзакції, використовуючи приватні ключі свого віртуального гаманця. Для цього посібника ми будемо використовувати [MetaMask](https://metamask.io/), віртуальний гаманець у браузері, який використовується для керування адресою вашого облікового запису Ethereum, оскільки він робить підписання транзакцій надзвичайно простим для кінцевого користувача.

Якщо ви хочете дізнатися більше про те, як працюють транзакції в Ethereum, перегляньте [цю сторінку](/developers/docs/transactions/) від Ethereum Foundation.

#### Завантажте MetaMask {#download-metamask}

Ви можете завантажити та створити обліковий запис MetaMask безкоштовно [тут](https://metamask.io/download). Під час створення облікового запису, або якщо у вас вже є обліковий запис, обов’язково переключіться на «тестову мережу Goerli» у верхньому правому куті (щоб ми не мали справу з реальними грошима).

#### Додайте ефір з крана {#add-ether-from-a-faucet}

Щоб підписати транзакцію в блокчейні Ethereum, нам знадобиться трохи несправжнього Eth. Щоб отримати Eth, ви можете перейти до [FaucETH](https://fauceth.komputing.org) і ввести адресу свого облікового запису Goerli, натиснути «Запросити кошти», потім вибрати «Ethereum Testnet Goerli» у спадному меню і, нарешті, знову натиснути кнопку «Запросити кошти». Незабаром ви маєте побачити Eth у своєму обліковому записі MetaMask!

#### Перевірте свій баланс {#check-your-balance}

Щоб перевірити наявність балансу, давайте зробимо запит [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) за допомогою [інструмента-композитора від Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Це поверне кількість Eth у нашому гаманці. Після введення вашої адреси облікового запису MetaMask і натисніть кнопку "Відправити запит", ви повинні побачити таку відповідь:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**ПРИМІТКА:** Цей результат у wei, а не в eth. Wei використовується в якості найменшого номіналу ether. Перетворення з wei в eth: 1 eth = 10¹⁸ wei. Отже, якщо ми перетворимо 0xde0b6b3a7640000 у десяткове число, ми отримаємо 1\*10¹⁸, що дорівнює 1 eth.

Фух! Наші підроблені гроші усі там! 🤑

### Крок 5: Підключіть MetaMask до вашого інтерфейсу {#step-5-connect-metamask-to-your-UI}

Тепер, коли наш гаманець MetaMask налаштовано, давайте підключимо до нього наш dapp!

#### Функція `connectWallet` {#the-connectWallet-function}

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
        status: "👆🏽 Напишіть повідомлення в текстовому полі вище.",
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
              Ви повинні встановити MetaMask, віртуальний гаманець Ethereum, у своєму
              браузері.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Отже, що саме робить цей величезний блок коду?

Ну, по-перше, він перевіряє, чи увімкнено `window.ethereum` у вашому браузері.

`window.ethereum` — це глобальний API, що впроваджується MetaMask та іншими постачальниками гаманців, який дозволяє веб-сайтам запитувати облікові записи Ethereum користувачів. Якщо схвалено, він може читати дані з блокчейнів, до яких підключений користувач, і пропонувати користувачеві підписувати повідомлення та транзакції. Для отримання додаткової інформації перегляньте [документацію MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents)!

Якщо `window.ethereum` _не_ присутній, це означає, що MetaMask не встановлено. Це призводить до повернення об'єкта JSON, де повернута `address` є порожнім рядком, а об'єкт JSX `status` повідомляє, що користувач повинен встановити MetaMask.

Тепер, якщо `window.ethereum` _присутній_, ось тут і починається найцікавіше.

Використовуючи цикл try/catch, ми спробуємо підключитися до MetaMask, викликавши [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Виклик цієї функції відкриє MetaMask у браузері, де користувачеві буде запропоновано підключити свій гаманець до вашого dapp.

- Якщо користувач вирішить підключитися, `method: "eth_requestAccounts"` поверне масив, який містить усі адреси облікових записів користувача, підключені до dapp. Загалом, наша функція `connectWallet` поверне об'єкт JSON, який містить _першу_ `address` у цьому масиві (див. рядок 9) та повідомлення `status`, яке пропонує користувачеві написати повідомлення для смарт-контракту.
- Якщо користувач відхиляє підключення, то об'єкт JSON міститиме порожній рядок для повернутої `address` та повідомлення `status`, що відображає відхилення підключення користувачем.

Тепер, коли ми написали цю функцію `connectWallet`, наступним кроком буде її виклик у нашому компоненті `HelloWorld.js`.

#### Додайте функцію `connectWallet` до вашого компонента інтерфейсу `HelloWorld.js` {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

Перейдіть до функції `connectWalletPressed` у `HelloWorld.js` та оновіть її до наступного:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Помітили, як більша частина нашої функціональності абстрагована від нашого компонента `HelloWorld.js` у файлі `interact.js`? Це для того, щоб ми дотримувалися парадигми M-V-C!

У `connectWalletPressed` ми просто робимо await-виклик нашої імпортованої функції `connectWallet` і, використовуючи її відповідь, оновлюємо наші змінні `status` та `walletAddress` за допомогою їхніх хуків стану.

Тепер давайте збережемо обидва файли (`HelloWorld.js` та `interact.js`) і протестуємо наш інтерфейс.

Відкрийте браузер на сторінці [http://localhost:3000/](http://localhost:3000/) і натисніть кнопку «Підключити гаманець» у верхньому правому куті сторінки.

Якщо у вас встановлено MetaMask, вам буде запропоновано підключити свій гаманець до вашого dapp. Прийміть запрошення на підключення.

Ви повинні побачити, що кнопка гаманця тепер відображає, що ваша адреса підключена! Такссс 🔥

Далі спробуйте оновити сторінку… це дивно. Наша кнопка гаманця пропонує нам підключити MetaMask, хоча він уже підключений…

Але не бійтеся! Ми легко можемо вирішити цю проблему (зрозуміли каламбур з адресою?) реалізувавши `getCurrentWalletConnected`, який перевірить, чи адреса вже підключена до нашого dapp, і відповідно оновить наш інтерфейс!

#### Функція `getCurrentWalletConnected` {#the-getcurrentwalletconnected-function}

Оновіть вашу функцію `getCurrentWalletConnected` у файлі `interact.js` до наступного:

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
          status: "👆🏽 Напишіть повідомлення в текстовому полі вище.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Підключіться до MetaMask за допомогою кнопки вгорі праворуч.",
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
              Ви повинні встановити MetaMask, віртуальний гаманець Ethereum, у своєму
              браузері.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Цей код _дуже_ схожий на функцію `connectWallet`, яку ми щойно написали на попередньому кроці.

Основна відмінність полягає в тому, що замість виклику методу `eth_requestAccounts`, який відкриває MetaMask для підключення гаманця користувача, тут ми викликаємо метод `eth_accounts`, який просто повертає масив, що містить адреси MetaMask, які зараз підключені до нашого dapp.

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

Зверніть увагу, що ми використовуємо відповідь нашого виклику `getCurrentWalletConnected` для оновлення наших змінних стану `walletAddress` та `status`.

Тепер, коли ви додали цей код, давайте спробуємо оновити вікно нашого браузера.

Супер! Кнопка має показувати, що ви підключені, і відображати попередній перегляд адреси вашого підключеного гаманця — навіть після оновлення!

#### Реалізувати `addWalletListener` {#implement-addwalletlistener}

Останній крок у налаштуванні гаманця нашого dapp — це реалізація прослуховувача гаманця, щоб наш інтерфейс користувача оновлювався при зміні стану нашого гаманця, наприклад, коли користувач відключається або перемикає облікові записи.

У вашому файлі `HelloWorld.js` змініть вашу функцію `addWalletListener` на наступне:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Напишіть повідомлення в текстовому полі вище.")
      } else {
        setWallet("")
        setStatus("🦊 Підключіться до MetaMask за допомогою кнопки вгорі праворуч.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          Ви повинні встановити MetaMask, віртуальний гаманець Ethereum, у своєму браузері.
        </a>
      </p>
    )
  }
}
```

Я впевнений, що на даному етапі вам навіть не потрібна наша допомога, щоб зрозуміти, що тут відбувається, але для повноти картини давайте швидко розберемося:

- По-перше, наша функція перевіряє, чи ввімкнено `window.ethereum` (тобто, чи встановлено MetaMask).
  - Якщо ні, ми просто встановлюємо нашу змінну стану `status` на рядок JSX, який пропонує користувачеві встановити MetaMask.
  - Якщо він увімкнений, ми налаштовуємо прослуховувач `window.ethereum.on("accountsChanged")` у рядку 3, який прослуховує зміни стану в гаманці MetaMask, зокрема, коли користувач підключає додатковий обліковий запис до dapp, перемикає облікові записи або відключає обліковий запис. Якщо підключено хоча б один обліковий запис, змінна стану `walletAddress` оновлюється як перший обліковий запис у масиві `accounts`, що повертається прослуховувачем. В іншому випадку `walletAddress` встановлюється як порожній рядок.

І останнє, але не менш важливе, ми повинні викликати її в нашій функції `useEffect`:

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

І це все! Ми успішно завершили програмування всієї функціональності нашого гаманця! Тепер до нашого останнього завдання: оновлення повідомлення, що зберігається в нашому смарт-контракті!

### Крок 6: Реалізація функції `updateMessage` {#step-6-implement-the-updateMessage-function}

Добре, друзі, ми на фінішній прямій! У `updateMessage` вашого файлу `interact.js` ми зробимо наступне:

1. Переконатися, що повідомлення, яке ми хочемо опублікувати в нашому смарт-контракті, є дійсним
2. Підписати нашу транзакцію за допомогою MetaMask
3. Викликати цю функцію з нашого фронтенд-компонента `HelloWorld.js`

Це не займе багато часу; давайте завершимо цей dapp!

#### Обробка помилок введення {#input-error-handling}

Природно, має сенс мати якусь обробку помилок введення на початку функції.

Ми захочемо, щоб наша функція завершувалася раніше, якщо не встановлено розширення MetaMask, не підключено гаманець (тобто `address`, що передається, є порожнім рядком), або `message` є порожнім рядком. Давайте додамо наступну обробку помилок до `updateMessage`:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Підключіть свій гаманець MetaMask, щоб оновити повідомлення в блокчейні.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Ваше повідомлення не може бути порожнім рядком.",
    }
  }
}
```

Тепер, коли є належна обробка помилок введення, настав час підписати транзакцію через MetaMask!

#### Підписання нашої транзакції {#signing-our-transaction}

Якщо ви вже знайомі з традиційними транзакціями web3 Ethereum, код, який ми напишемо далі, буде вам дуже знайомий. Нижче вашого коду обробки помилок введення додайте наступне до `updateMessage`:

```javascript
// interact.js

//налаштування параметрів транзакції
const transactionParameters = {
  to: contractAddress, // Обов'язково, крім випадків публікації контракту.
  from: address, // повинен збігатися з активною адресою користувача.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//підписання транзакції
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
          Перегляньте статус вашої транзакції на Etherscan!
        </a>
        <br />
        ℹ️ Як тільки транзакція буде підтверджена мережею, повідомлення
        буде оновлено автоматично.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

Давайте розберемо, що відбувається. Спочатку ми налаштовуємо наші параметри транзакцій, де:

- `to` вказує адресу одержувача (наш смарт-контракт)
- `from` вказує підписанта транзакції, змінну `address`, яку ми передали в нашу функцію
- `data` містить виклик методу `update` нашого смарт-контракту Hello World, отримуючи наш рядок `message` як вхідні дані

Потім ми робимо await виклик, `window.ethereum.request`, де ми просимо MetaMask підписати транзакцію. Зверніть увагу, що в рядках 11 і 12 ми вказуємо наш метод eth, `eth_sendTransaction` і передаємо наші `transactionParameters`.

На цьому етапі MetaMask відкриється в браузері і запропонує користувачеві підписати або відхилити транзакцію.

- Якщо транзакція буде успішною, функція поверне об'єкт JSON, де рядок JSX `status` пропонує користувачеві перевірити Etherscan для отримання додаткової інформації про свою транзакцію.
- Якщо транзакція не вдасться, функція поверне об'єкт JSON, де рядок `status` передає повідомлення про помилку.

Загалом, наша функція `updateMessage` повинна виглядати так:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //обробка помилок введення
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Підключіть свій гаманець MetaMask, щоб оновити повідомлення в блокчейні.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Ваше повідомлення не може бути порожнім рядком.",
    }
  }

  //налаштування параметрів транзакції
  const transactionParameters = {
    to: contractAddress, // Обов'язково, крім випадків публікації контракту.
    from: address, // повинен збігатися з активною адресою користувача.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //підписання транзакції
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
            Перегляньте статус вашої транзакції на Etherscan!
          </a>
          <br />
          ℹ️ Як тільки транзакція буде підтверджена мережею, повідомлення
          буде оновлено автоматично.
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

І останнє, але не менш важливе, нам потрібно підключити нашу функцію `updateMessage` до нашого компонента `HelloWorld.js`.

#### Підключення `updateMessage` до фронтенду `HelloWorld.js` {#connect-updatemessage-to-the-helloworld-js-frontend}

Наша функція `onUpdatePressed` повинна зробити await виклик до імпортованої функції `updateMessage` і змінити змінну стану `status`, щоб відобразити, чи наша транзакція пройшла успішно чи ні:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

Це надзвичайно чисто та просто. І вгадайте що... ВАШ DAPP ГОТОВИЙ!!!

Спробуйте натиснути кнопку **Оновити**!

### Створіть свій власний dapp {#make-your-own-custom-dapp}

Вуууу, ви дійшли до кінця посібника! Підсумовуючи, ви навчилися:

- Підключати гаманець MetaMask до вашого dapp проєкту
- Читання даних з вашого смарт-контракту за допомогою [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) API
- Підписувати транзакції Ethereum за допомогою MetaMask

Тепер ви повністю готові застосувати навички з цього посібника для створення власного dapp проєкту! Як завжди, якщо у вас виникнуть запитання, не соромтеся звертатися до нас за допомогою в [Discord Alchemy](https://discord.gg/gWuC7zB). 🧙‍♂️

Після завершення цього посібника, повідомте нам про свій досвід або якщо у вас є відгуки, позначивши нас у Twitter [@alchemyplatform](https://twitter.com/AlchemyPlatform)!
