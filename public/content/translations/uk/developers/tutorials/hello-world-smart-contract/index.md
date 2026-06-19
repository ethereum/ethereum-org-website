---
title: "Смарт-контракт Hello World для початківців"
description: "Вступний посібник із написання та розгортання простого смарт-контракту в мережі Етеріум."
author: elanh
tags:
  - solidity
  - hardhat
  - alchemy
  - смарт-контракти
  - розгортання
skill: beginner
breadcrumb: "Контракт Hello World"
lang: uk
published: 2021-03-31
---

Якщо ви новачок у розробці на блокчейні й не знаєте, з чого почати, або якщо ви просто хочете зрозуміти, як розгортати смарт-контракти та взаємодіяти з ними, цей посібник для вас. Ми розглянемо створення та розгортання простого смарт-контракту в тестовій мережі Sepolia за допомогою віртуального гаманця [МетаМаск](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/) та [Alchemy](https://www.alchemy.com/eth) (не хвилюйтеся, якщо ви ще не розумієте, що все це означає, ми все пояснимо).

У [частині 2](https://docs.alchemy.com/docs/interacting-with-a-smart-contract) цього посібника ми розглянемо, як можна взаємодіяти з нашим смарт-контрактом після його розгортання, а в [частині 3](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) ми розповімо, як опублікувати його на Etherscan.

Якщо у вас виникнуть запитання на будь-якому етапі, не соромтеся звертатися до [Discord Alchemy](https://discord.gg/gWuC7zB)!

## Крок 1: Підключення до мережі Етеріум {#step-1}

Існує багато способів робити запити до ланцюга Етеріум. Для простоти ми будемо використовувати безкоштовний акаунт на Alchemy — платформі для розробників блокчейнів та API, яка дозволяє нам взаємодіяти з ланцюгом Етеріум без необхідності запускати власні вузли. Платформа також має інструменти розробника для моніторингу та аналітики, якими ми скористаємося в цьому посібнику, щоб зрозуміти, як технічно працює розгортання нашого смарт-контракту. Якщо у вас ще немає акаунта Alchemy, [ви можете безкоштовно зареєструватися тут](https://dashboard.alchemy.com/signup).

## Крок 2: Створення застосунку (та ключа API) {#step-2}

Після створення акаунта Alchemy ви можете згенерувати ключ API, створивши застосунок. Це дозволить нам робити запити до тестової мережі Sepolia. Якщо ви не знайомі з тестовими мережами, перегляньте [цю сторінку](/developers/docs/networks/).

1.  Перейдіть на сторінку «Create new app» (Створити новий застосунок) на панелі керування Alchemy, вибравши «Select an app» (Вибрати застосунок) на панелі навігації та натиснувши «Create new app»

![Hello world create app](./hello-world-create-app.png)

2. Назвіть свій застосунок «Hello World», додайте короткий опис і виберіть варіант використання, наприклад, «Infra & Tooling» (Інфраструктура та інструменти). Далі знайдіть «Ethereum» і виберіть мережу.

![create app view hello world](./create-app-view-hello-world.png)

3. Натисніть «Next» (Далі), щоб продовжити, потім «Create app» (Створити застосунок), і все готово! Ваш застосунок має з'явитися у спадному меню панелі навігації, а ключ API буде доступний для копіювання.

## Крок 3: Створення акаунта (адреси) Етеріум {#step-3}

Нам потрібен акаунт Етеріум для надсилання та отримання транзакцій. У цьому посібнику ми будемо використовувати МетаМаск — віртуальний гаманець у браузері, який використовується для керування адресою вашого акаунта Етеріум. Детальніше про [транзакції](/developers/docs/transactions/).

Ви можете завантажити МетаМаск і безкоштовно створити акаунт Етеріум [тут](https://metamask.io/download). Під час створення акаунта, або якщо він у вас уже є, обов'язково перейдіть до тестової мережі «Sepolia» за допомогою спадного меню мереж (щоб ми не мали справи з реальними грошима).

Якщо ви не бачите Sepolia у списку, перейдіть у меню, потім у розділ «Advanced» (Додатково) і прокрутіть униз, щоб увімкнути «Show test networks» (Показувати тестові мережі). У меню вибору мережі перейдіть на вкладку «Custom» (Користувацькі), щоб знайти список тестових мереж, і виберіть «Sepolia».

![metamask sepolia example](./metamask-sepolia-example.png)

## Крок 4: Отримання етеру з крана {#step-4}

Щоб розгорнути наш смарт-контракт у тестовій мережі, нам знадобиться трохи тестового ETH. Щоб отримати Sepolia ETH, ви можете перейти до [деталей мережі Sepolia](/developers/docs/networks/#sepolia), щоб переглянути список різних кранів. Якщо один не працює, спробуйте інший, оскільки іноді вони можуть вичерпуватися. Отримання тестового ETH може зайняти деякий час через завантаженість мережі. Незабаром після цього ви побачите ETH у своєму акаунті МетаМаск!

## Крок 5: Перевірка балансу {#step-5}

Щоб переконатися, що наш баланс поповнено, давайте зробимо запит [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) за допомогою [інструмента composer від Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Це поверне суму ETH у нашому гаманці. Після того, як ви введете адресу свого акаунта МетаМаск і натиснете «Send Request» (Надіслати запит), ви побачите таку відповідь:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **ПРИМІТКА:** Цей результат вказано у Wei, а не в ETH. Wei використовується як найменший номінал етеру. Конвертація з Wei в ETH: 1 ETH = 10<sup>18</sup> Wei. Отже, якщо ми переведемо 0x2B5E3AF16B1880000 у десяткову систему, ми отримаємо 5\*10¹⁸, що дорівнює 5 ETH.
>
> Хух! Наші тестові гроші на місці <Emoji text=":money_mouth_face:" size={1} />.

## Крок 6: Ініціалізація нашого проєкту {#step-6}

Спочатку нам потрібно створити папку для нашого проєкту. Перейдіть до командного рядка та введіть:

```
mkdir hello-world
cd hello-world
```

Тепер, коли ми знаходимося в папці нашого проєкту, ми використаємо `npm init` для ініціалізації проєкту. Якщо у вас ще не встановлено npm, дотримуйтесь [цих інструкцій](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (нам також знадобиться Node.js, тому завантажте і його!).

```
npm init
```

Не має великого значення, як ви відповідатимете на запитання під час встановлення, ось як ми це зробили для довідки:

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
     "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Схваліть package.json, і ми готові продовжувати!

## Крок 7: Завантаження [Hardhat](https://hardhat.org/getting-started/#overview) {#step-7}

Hardhat — це середовище розробки для компіляції, розгортання, тестування та налагодження вашого програмного забезпечення для Етеріум. Воно допомагає розробникам створювати смарт-контракти та децентралізовані застосунки (dapps) локально перед розгортанням у робочому ланцюзі.

У нашому проєкті `hello-world` виконайте:

```
npm install --save-dev hardhat
```

Перегляньте цю сторінку для отримання додаткової інформації щодо [інструкцій зі встановлення](https://hardhat.org/getting-started/#overview).

## Крок 8: Створення проєкту Hardhat {#step-8}

У папці нашого проєкту виконайте:

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

👷 Welcome to Hardhat v2.0.11 👷‍?

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Це згенерує для нас файл `hardhat.config.js`, у якому ми вкажемо всі налаштування для нашого проєкту (на кроці 13).

## Крок 9: Додавання папок проєкту {#step-9}

Щоб підтримувати порядок у нашому проєкті, ми створимо дві нові папки. Перейдіть до кореневого каталогу вашого проєкту в командному рядку та введіть:

```
mkdir contracts
mkdir scripts
```

- `contracts/` — тут ми будемо зберігати файл коду нашого смарт-контракту hello world
- `scripts/` — тут ми будемо зберігати скрипти для розгортання та взаємодії з нашим контрактом

## Крок 10: Написання нашого контракту {#step-10}

Ви можете запитати себе: коли ж ми нарешті будемо писати код?? Що ж, ось ми і дійшли до цього на кроці 10.

Відкрийте проєкт hello-world у вашому улюбленому редакторі (нам подобається [VSCode](https://code.visualstudio.com/)). Смарт-контракти пишуться мовою Solidity, яку ми й використаємо для написання нашого смарт-контракту HelloWorld.sol.‌

1.  Перейдіть до папки «contracts» і створіть новий файл під назвою HelloWorld.sol
2.  Нижче наведено приклад смарт-контракту Hello World від Фундації Ethereum, який ми будемо використовувати для цього посібника. Скопіюйте та вставте наведений нижче вміст у свій файл HelloWorld.sol і обов'язково прочитайте коментарі, щоб зрозуміти, що робить цей контракт:

```solidity
// Вказує версію Solidity, використовуючи семантичне версіонування.
// Дізнатися більше: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// Визначає контракт з іменем `HelloWorld`.
// Контракт — це набір функцій та даних (його стан). Після розгортання контракт знаходиться за певною адресою в блокчейні Етеріум. Дізнатися більше: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Оголошує змінну стану `message` типу `string`.
   // Змінні стану — це змінні, значення яких постійно зберігаються у сховищі контракту. Ключове слово `public` робить змінні доступними ззовні контракту та створює функцію, яку інші контракти або клієнти можуть викликати для отримання доступу до значення.
   string public message;

   // Подібно до багатьох об'єктно-орієнтованих мов на основі класів, конструктор — це спеціальна функція, яка виконується лише під час створення контракту.
   // Конструктори використовуються для ініціалізації даних контракту. Дізнатися більше:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Приймає рядковий аргумент `initMessage` та встановлює значення у змінну сховища контракту `message`).
      message = initMessage;
   }

   // Публічна функція, яка приймає рядковий аргумент та оновлює змінну сховища `message`.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

Це надзвичайно простий смарт-контракт, який зберігає повідомлення під час створення та може бути оновлений шляхом виклику функції `update`.

## Крок 11: Підключення МетаМаск та Alchemy до вашого проєкту {#step-11}

Ми створили гаманець МетаМаск, акаунт Alchemy та написали наш смарт-контракт, тепер настав час об'єднати їх.

Кожна транзакція, надіслана з вашого віртуального гаманця, потребує підпису за допомогою вашого унікального приватного ключа. Щоб надати нашій програмі цей дозвіл, ми можемо безпечно зберігати наш приватний ключ (і ключ API Alchemy) у файлі середовища.

> Щоб дізнатися більше про надсилання транзакцій, перегляньте [цей посібник](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) з надсилання транзакцій за допомогою Web3.

Спочатку встановіть пакет dotenv у каталозі вашого проєкту:

```
npm install dotenv --save
```

Потім створіть файл `.env` у кореневому каталозі нашого проєкту та додайте до нього свій приватний ключ МетаМаск і URL-адресу HTTP API Alchemy.

- Дотримуйтесь [цих інструкцій](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/), щоб експортувати свій приватний ключ
- Дивіться нижче, щоб отримати URL-адресу HTTP API Alchemy

![get alchemy api key](./get-alchemy-api-key.png)

Скопіюйте URL-адресу API Alchemy

Ваш `.env` має виглядати так:

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Щоб фактично підключити їх до нашого коду, ми пошлемося на ці змінні в нашому файлі `hardhat.config.js` на кроці 13.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Не робіть коміт файлу <code>.env</code>! Будь ласка, ніколи нікому не передавайте та не розкривайте свій файл <code>.env</code>, оскільки цим ви ставите під загрозу свої секретні дані. Якщо ви використовуєте систему контролю версій, додайте свій <code>.env</code> до файлу <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Крок 12: Встановлення Ethers.js {#step-12-install-ethersjs}

Ethers.js — це бібліотека, яка полегшує взаємодію та виконання запитів до Етеріум, обгортаючи [стандартні методи JSON-RPC](/developers/docs/apis/json-rpc/) більш зручними для користувача методами.

Hardhat дозволяє дуже легко інтегрувати [плагіни](https://hardhat.org/plugins/) для додаткових інструментів і розширеної функціональності. Ми скористаємося [плагіном Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) для розгортання контракту ([Ethers.js](https://github.com/ethers-io/ethers.js/) має дуже зручні методи розгортання контрактів).

У каталозі вашого проєкту введіть:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

Нам також знадобиться ethers у нашому `hardhat.config.js` на наступному кроці.

## Крок 13: Оновлення hardhat.config.js {#step-13-update-hardhatconfigjs}

Наразі ми додали кілька залежностей і плагінів, тепер нам потрібно оновити `hardhat.config.js`, щоб наш проєкт знав про них усі.

Оновіть свій `hardhat.config.js`, щоб він виглядав так:

```
require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
   solidity: "0.7.3",
   defaultNetwork: "sepolia",
   networks: {
      hardhat: {},
      sepolia: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

## Крок 14: Компіляція нашого контракту {#step-14-compile-our-contracts}

Щоб переконатися, що все працює належним чином, давайте скомпілюємо наш контракт. Завдання `compile` є одним із вбудованих завдань Hardhat.

З командного рядка виконайте:

```
npx hardhat compile
```

Ви можете отримати попередження про `SPDX license identifier not provided in source file`, але не варто про це турбуватися — сподіваємося, все інше виглядає добре! Якщо ні, ви завжди можете написати в [Discord Alchemy](https://discord.gg/u72VCg3).

## Крок 15: Написання нашого скрипта розгортання {#step-15-write-our-deploy-scripts}

Тепер, коли наш контракт написано, а файл конфігурації готовий до роботи, настав час написати скрипт розгортання нашого контракту.

Перейдіть до папки `scripts/` і створіть новий файл під назвою `deploy.js`, додавши до нього такий вміст:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Початок розгортання, повертає проміс, який вирішується в об'єкт контракту
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contract deployed to address:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat чудово пояснює, що робить кожен із цих рядків коду, у своєму [посібнику з контрактів](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), ми запозичили їхні пояснення тут.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

`ContractFactory` в Ethers.js — це абстракція, яка використовується для розгортання нових смарт-контрактів, тому `HelloWorld` тут є фабрикою для екземплярів нашого контракту hello world. Під час використання плагіна `hardhat-ethers` екземпляри `ContractFactory` та `Contract` за замовчуванням підключаються до першого підписанта.

```
const hello_world = await HelloWorld.deploy();
```

Виклик `deploy()` для `ContractFactory` розпочне розгортання та поверне `Promise`, який вирішується в `Contract`. Це об'єкт, який має метод для кожної з функцій нашого смарт-контракту.

## Крок 16: Розгортання нашого контракту {#step-16-deploy-our-contract}

Ми нарешті готові розгорнути наш смарт-контракт! Перейдіть до командного рядка та виконайте:

```
npx hardhat run scripts/deploy.js --network sepolia
```

Після цього ви побачите щось на зразок:

```
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Якщо ми перейдемо до [Etherscan мережі Sepolia](https://sepolia.etherscan.io/) і знайдемо адресу нашого контракту, ми зможемо побачити, що його було успішно розгорнуто. Транзакція виглядатиме приблизно так:

![etherscan contract](./etherscan-contract.png)

Адреса `From` має збігатися з адресою вашого акаунта МетаМаск, а в адресі «To» (Кому) буде вказано «Contract Creation» (Створення контракту), але якщо ми натиснемо на транзакцію, ми побачимо адресу нашого контракту в полі `To`:

![etherscan transaction](./etherscan-transaction.png)

Вітаємо! Ви щойно розгорнули смарт-контракт у ланцюзі Етеріум 🎉

Щоб зрозуміти, як це працює технічно, давайте перейдемо на вкладку «Explorer» (Провідник) на нашій [панелі керування Alchemy](https://dashboard.alchemyapi.io/explorer). Якщо у вас є кілька застосунків Alchemy, обов'язково відфільтруйте за застосунком і виберіть «Hello World».
![hello world explorer](./hello-world-explorer.png)

Тут ви побачите кілька викликів JSON-RPC, які Hardhat/Ethers зробили для нас внутрішньо, коли ми викликали функцію `.deploy()`. Два важливих виклики, на які варто звернути увагу, — це [`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction), який є запитом на фактичний запис нашого контракту в ланцюг Sepolia, і [`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash), який є запитом на читання інформації про нашу транзакцію за заданим хешем (типовий патерн під час транзакцій). Щоб дізнатися більше про надсилання транзакцій, перегляньте цей посібник із [надсилання транзакцій за допомогою Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)

Це все для частини 1 цього посібника, у частині 2 ми фактично [взаємодіятимемо з нашим смарт-контрактом](https://www.alchemy.com/docs/interacting-with-a-smart-contract), оновивши наше початкове повідомлення, а в частині 3 ми [опублікуємо наш смарт-контракт на Etherscan](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan), щоб усі знали, як із ним взаємодіяти.

**Хочете дізнатися більше про Alchemy? Відвідайте наш [вебсайт](https://www.alchemy.com/eth). Не хочете пропускати оновлення? Підпишіться на нашу розсилку [тут](https://www.alchemy.com/newsletter)! Також обов'язково приєднуйтесь до нашого [Discord](https://discord.gg/u72VCg3).**.