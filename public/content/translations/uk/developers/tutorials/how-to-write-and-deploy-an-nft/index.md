---
title: "Як написати та розгорнути NFT (Частина 1/3 серії посібників про NFT)"
description: "Цей посібник є першою частиною серії про NFT, яка крок за кроком покаже вам, як написати та розгорнути смарт-контракт невзаємозамінного токена (токен ERC-721), використовуючи Етеріум та InterPlanetary File System (IPFS)."
author: "Сумі Мудгіл"
tags:
  - ERC-721
  - Alchemy
  - Solidity
  - смарт-контракти
skill: beginner
breadcrumb: "Написання та розгортання NFT"
lang: uk
published: 2021-04-22
---

Оскільки NFT привертають увагу громадськості до блокчейну, зараз чудова нагода самостійно зрозуміти цей ажіотаж, опублікувавши власний контракт NFT (токен ERC-721) у блокчейні Етеріум!

Alchemy надзвичайно пишається тим, що підтримує найвідоміші імена у просторі NFT, зокрема Makersplace (нещодавно встановили рекорд із продажу цифрового мистецтва на Christie’s за 69 мільйонів доларів), Dapper Labs (творці NBA Top Shot та Crypto Kitties), OpenSea (найбільший у світі маркетплейс NFT), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable та інші.

У цьому посібнику ми розглянемо створення та розгортання смарт-контракту ERC-721 у тестовій мережі Sepolia за допомогою [МетаМаск](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) та [Alchemy](https://alchemy.com/signup/eth) (не хвилюйтеся, якщо ви ще не розумієте, що все це означає — ми все пояснимо!).

У другій частині цього посібника ми розглянемо, як можна використати наш смарт-контракт, щоб викарбувати NFT, а в третій частині пояснимо, як переглянути ваш NFT у МетаМаск.

І, звісно, якщо у вас виникнуть запитання на будь-якому етапі, не соромтеся звертатися до [Discord Alchemy](https://discord.gg/gWuC7zB) або відвідайте [документацію NFT API від Alchemy](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)!

## Крок 1: Підключення до мережі Етеріум {#connect-to-ethereum}

Існує багато способів робити запити до блокчейну Етеріум, але для спрощення ми використаємо безкоштовний акаунт на [Alchemy](https://alchemy.com/signup/eth) — платформі для розробників блокчейну та API, яка дозволяє нам взаємодіяти з ланцюгом Етеріум без необхідності запускати власні вузли.

У цьому посібнику ми також скористаємося інструментами розробника Alchemy для моніторингу та аналітики, щоб зрозуміти, як технічно відбувається розгортання нашого смарт-контракту. Якщо у вас ще немає акаунта Alchemy, ви можете безкоштовно зареєструватися [тут](https://alchemy.com/signup/eth).

## Крок 2: Створення застосунку (та ключа API) {#make-api-key}

Після створення акаунта Alchemy ви можете згенерувати ключ API, створивши застосунок. Це дозволить нам робити запити до тестової мережі Sepolia. Перегляньте [цей посібник](https://docs.alchemyapi.io/guides/choosing-a-network), якщо хочете дізнатися більше про тестові мережі.

1. Перейдіть на сторінку «Create App» (Створити застосунок) на панелі керування Alchemy, навівши курсор на «Apps» (Застосунки) на навігаційній панелі та натиснувши «Create App».

![Create your app](./create-your-app.png)

2. Назвіть свій застосунок (ми вибрали «My First NFT!»), додайте короткий опис, виберіть «Ethereum» для ланцюга (Chain) та «Sepolia» для вашої мережі (Network). Після Злиття інші тестові мережі були застарілими.

![Configure and publish your app](./alchemy-explorer-sepolia.png)

3. Натисніть «Create app» — і все! Ваш застосунок має з'явитися в таблиці нижче.

## Крок 3: Створення акаунта (адреси) Етеріум {#create-eth-address}

Нам потрібен акаунт Етеріум для надсилання та отримання транзакцій. Для цього посібника ми використаємо МетаМаск — віртуальний гаманець у браузері, який використовується для керування адресою вашого акаунта Етеріум. Якщо ви хочете дізнатися більше про те, як працюють транзакції в Етеріумі, перегляньте [цю сторінку](/developers/docs/transactions/) від Фундації Ethereum.

Ви можете безкоштовно завантажити та створити акаунт МетаМаск [тут](https://metamask.io/download). Під час створення акаунта, або якщо він у вас уже є, обов'язково перемкніться на «Sepolia Test Network» у верхньому правому куті (щоб ми не мали справи з реальними грошима).

![Set Sepolia as your network](./metamask-goerli.png)

## Крок 4: Отримання етеру з крана {#step-4-add-ether-from-a-faucet}

Щоб розгорнути наш смарт-контракт у тестовій мережі, нам знадобиться трохи тестового ETH. Щоб отримати ETH, ви можете перейти до [крана Sepolia](https://sepoliafaucet.com/), який підтримується Alchemy, увійти в систему, ввести адресу свого акаунта та натиснути «Send Me ETH». Незабаром після цього ви побачите ETH у своєму акаунті МетаМаск!

## Крок 5: Перевірка балансу {#check-balance}

Щоб переконатися, що наш баланс поповнено, зробимо запит [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) за допомогою [інструмента composer від Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Це поверне суму ETH у нашому гаманці. Після того, як ви введете адресу свого акаунта МетаМаск і натиснете «Send Request», ви побачите таку відповідь:

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **Примітка** Цей результат вказано у Wei, а не в ETH. Wei використовується як найменший номінал етеру. Конвертація з Wei в ETH становить 1 ETH = 10<sup>18</sup> Wei. Отже, якщо ми переведемо 0xde0b6b3a7640000 у десяткову систему, то отримаємо 1\*10<sup>18</sup> Wei, що дорівнює 1 ETH.

Хух! Наші тестові гроші на місці.

## Крок 6: Ініціалізація нашого проєкту {#initialize-project}

Спочатку нам потрібно створити папку для нашого проєкту. Перейдіть до командного рядка та введіть:

    mkdir my-nft
    cd my-nft

Тепер, коли ми знаходимося в папці нашого проєкту, ми використаємо npm init для ініціалізації проєкту. Якщо у вас ще не встановлено npm, дотримуйтесь [цих інструкцій](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (нам також знадобиться [Node.js](https://nodejs.org/en/download/), тому завантажте і його!).

    npm init

Не має великого значення, як ви відповідатимете на запитання під час встановлення; ось як ми це зробили для прикладу:

```json
    package name: (my-nft)
    version: (1.0.0)
    description: My first NFT!
    entry point: (index.js)
    test command:
    git repository:
    keywords:
    author:
    license: (ISC)
    About to write to /Users/thesuperb1/Desktop/my-nft/package.json:

    {
      "name": "my-nft",
      "version": "1.0.0",
      "description": "My first NFT!",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }
```

Підтвердьте package.json, і ми готові продовжувати!

## Крок 7: Встановлення [Hardhat](https://hardhat.org/getting-started/#overview) {#install-hardhat}

Hardhat — це середовище розробки для компіляції, розгортання, тестування та зневадження вашого програмного забезпечення для Етеріуму. Воно допомагає розробникам під час створення смарт-контрактів та децентралізованих застосунків (dapp) локально перед розгортанням у робочому ланцюзі.

Усередині нашого проєкту my-nft виконайте:

    npm install --save-dev hardhat

Перегляньте цю сторінку для отримання додаткової інформації щодо [інструкцій зі встановлення](https://hardhat.org/getting-started/#overview).

## Крок 8: Створення проєкту Hardhat {#create-hardhat-project}

Усередині папки нашого проєкту виконайте:

    npx hardhat

Після цього ви побачите вітальне повідомлення та можливість вибрати, що ви хочете зробити. Виберіть «create an empty hardhat.config.js»:

    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Welcome to Hardhat v2.0.11 👷‍
    ? What do you want to do? …
    Create a sample project
    ❯ Create an empty hardhat.config.js
    Quit

Це згенерує для нас файл hardhat.config.js, у якому ми вкажемо всі налаштування для нашого проєкту (на кроці 13).

## Крок 9: Додавання папок проєкту {#add-project-folders}

Щоб підтримувати порядок у нашому проєкті, ми створимо дві нові папки. Перейдіть до кореневого каталогу вашого проєкту в командному рядку та введіть:

    mkdir contracts
    mkdir scripts

- contracts/ — тут ми зберігатимемо код нашого смарт-контракту NFT

- scripts/ — тут ми зберігатимемо скрипти для розгортання та взаємодії з нашим смарт-контрактом

## Крок 10: Написання нашого контракту {#write-contract}

Тепер, коли наше середовище налаштовано, перейдемо до цікавішого: _написання коду нашого смарт-контракту!_

Відкрийте проєкт my-nft у вашому улюбленому редакторі (нам подобається [VSCode](https://code.visualstudio.com/)). Смарт-контракти пишуться мовою Solidity, яку ми й використаємо для написання нашого смарт-контракту MyNFT.sol.‌

1. Перейдіть до папки `contracts` та створіть новий файл із назвою MyNFT.sol

2. Нижче наведено код нашого смарт-контракту NFT, який ми базували на реалізації ERC-721 з бібліотеки [ОупенЗеппелін](https://docs.openzeppelin.com/contracts/3.x/erc721). Скопіюйте та вставте наведений нижче вміст у ваш файл MyNFT.sol.

   ```solidity
   //Контракт базується на [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/utils/Counters.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       using Counters for Counters.Counter;
       Counters.Counter private _tokenIds;

       constructor() ERC721("MyNFT", "NFT") {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           _tokenIds.increment();

           uint256 newItemId = _tokenIds.current();
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. Оскільки ми успадковуємо класи з бібліотеки контрактів ОупенЗеппелін, у командному рядку виконайте `npm install @openzeppelin/contracts^4.0.0`, щоб встановити бібліотеку в нашу папку.

Отже, що саме _робить_ цей код? Давайте розберемо його рядок за рядком.

У верхній частині нашого смарт-контракту ми імпортуємо три класи смарт-контрактів [ОупенЗеппелін](https://openzeppelin.com/):

- @openzeppelin/contracts/token/ERC721/ERC721.sol містить реалізацію стандарту ERC-721, яку успадкує наш смарт-контракт NFT. (Щоб бути дійсним NFT, ваш смарт-контракт повинен реалізовувати всі методи стандарту ERC-721.) Щоб дізнатися більше про успадковані функції ERC-721, перегляньте визначення інтерфейсу [тут](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/utils/Counters.sol надає лічильники, які можна лише збільшувати або зменшувати на одиницю. Наш смарт-контракт використовує лічильник для відстеження загальної кількості викарбуваних NFT та встановлення унікального ідентифікатора для нашого нового NFT. (Кожному NFT, викарбуваному за допомогою смарт-контракту, має бути призначений унікальний ідентифікатор — тут наш унікальний ідентифікатор просто визначається загальною кількістю існуючих NFT. Наприклад, перший NFT, який ми карбуємо за допомогою нашого смарт-контракту, має ідентифікатор «1», наш другий NFT має ідентифікатор «2» тощо).

- @openzeppelin/contracts/access/Ownable.sol налаштовує [контроль доступу](https://docs.openzeppelin.com/contracts/3.x/access-control) до нашого смарт-контракту, тому лише власник смарт-контракту (ви) може карбувати NFT. (Зауважте, що включення контролю доступу є виключно питанням уподобань. Якщо ви хочете, щоб будь-хто міг викарбувати NFT за допомогою вашого смарт-контракту, видаліть слово Ownable у рядку 10 та onlyOwner у рядку 17).

Після наших інструкцій імпорту ми маємо наш власний смарт-контракт NFT, який напрочуд короткий — він містить лише лічильник, конструктор та одну функцію! Це завдяки нашим успадкованим контрактам ОупенЗеппелін, які реалізують більшість методів, необхідних для створення NFT, таких як `ownerOf`, що повертає власника NFT, та `transferFrom`, що передає право власності на NFT від одного акаунта до іншого.

У нашому конструкторі ERC-721 ви помітите, що ми передаємо 2 рядки: «MyNFT» та «NFT». Перша змінна — це назва смарт-контракту, а друга — його символ. Ви можете назвати кожну з цих змінних як забажаєте!

Нарешті, у нас є функція `mintNFT(address recipient, string memory tokenURI)`, яка дозволяє нам викарбувати NFT! Ви помітите, що ця функція приймає дві змінні:

- `address recipient` вказує адресу, яка отримає ваш щойно викарбуваний NFT

- `string memory tokenURI` — це рядок, який має вказувати на JSON-документ, що описує метадані NFT. Метадані NFT — це те, що дійсно вдихає в нього життя, дозволяючи йому мати настроювані властивості, такі як назва, опис, зображення та інші атрибути. У другій частині цього посібника ми опишемо, як налаштувати ці метадані.

`mintNFT` викликає деякі методи з успадкованої бібліотеки ERC-721 і в кінцевому підсумку повертає число, яке представляє ідентифікатор щойно викарбуваного NFT.

## Крок 11: Підключення МетаМаск та Alchemy до вашого проєкту {#connect-metamask-and-alchemy}

Тепер, коли ми створили гаманець МетаМаск, акаунт Alchemy та написали наш смарт-контракт, настав час об'єднати їх.

Кожна транзакція, надіслана з вашого віртуального гаманця, вимагає підпису за допомогою вашого унікального приватного ключа. Щоб надати нашій програмі цей дозвіл, ми можемо безпечно зберігати наш приватний ключ (та ключ API Alchemy) у файлі середовища.

Щоб дізнатися більше про надсилання транзакцій, перегляньте [цей посібник](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) з надсилання транзакцій за допомогою Web3.

Спочатку встановіть пакет dotenv у каталозі вашого проєкту:

    npm install dotenv --save

Потім створіть файл `.env` у кореневому каталозі нашого проєкту та додайте до нього свій приватний ключ МетаМаск і URL-адресу HTTP API Alchemy.

- Дотримуйтесь [цих інструкцій](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key), щоб експортувати свій приватний ключ із МетаМаск

- Дивіться нижче, щоб отримати URL-адресу HTTP API Alchemy та скопіювати її в буфер обміну

![Copy your Alchemy API URL](./copy-alchemy-api-url.gif)

Ваш `.env` тепер має виглядати так:

    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"

Щоб фактично підключити їх до нашого коду, ми пошлемося на ці змінні у нашому файлі hardhat.config.js на кроці 13.

<EnvWarningBanner />

## Крок 12: Встановлення Ethers.js {#install-ethers}

Ethers.js — це бібліотека, яка полегшує взаємодію та виконання запитів до Етеріуму, обгортаючи [стандартні методи JSON-RPC](/developers/docs/apis/json-rpc/) більш зручними для користувача методами.

Hardhat дозволяє дуже легко інтегрувати [плагіни](https://hardhat.org/plugins/) для додаткових інструментів та розширеної функціональності. Ми скористаємося [плагіном Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) для розгортання контракту ([Ethers.js](https://github.com/ethers-io/ethers.js/) має кілька дуже зручних методів розгортання контрактів).

У каталозі вашого проєкту введіть:

    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0

Нам також знадобиться ethers у нашому hardhat.config.js на наступному кроці.

## Крок 13: Оновлення hardhat.config.js {#update-hardhat-config}

Наразі ми додали кілька залежностей та плагінів, тепер нам потрібно оновити hardhat.config.js, щоб наш проєкт знав про них усі.

Оновіть ваш hardhat.config.js, щоб він виглядав так:

```js
    /**
    * @type import('hardhat/config').HardhatUserConfig
    */
    require('dotenv').config();
    require("@nomiclabs/hardhat-ethers");
    const { API_URL, PRIVATE_KEY } = process.env;
    module.exports = {
       solidity: "0.8.1",
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

## Крок 14: Компіляція нашого контракту {#compile-contract}

Щоб переконатися, що все працює, давайте скомпілюємо наш контракт. Завдання компіляції є одним із вбудованих завдань Hardhat.

З командного рядка виконайте:

    npx hardhat compile

Ви можете отримати попередження про те, що ідентифікатор ліцензії SPDX не вказано у вихідному файлі, але не варто про це турбуватися — сподіваємося, все інше виглядає добре! Якщо ні, ви завжди можете написати в [Discord Alchemy](https://discord.gg/u72VCg3).

## Крок 15: Написання нашого скрипта розгортання {#write-deploy}

Тепер, коли наш контракт написано, а файл конфігурації готовий до роботи, настав час написати скрипт розгортання нашого контракту.

Перейдіть до папки `scripts/` та створіть новий файл із назвою `deploy.js`, додавши до нього такий вміст:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Почати розгортання, повертаючи проміс, що вирішується об'єктом контракту
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("Contract deployed to address:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat чудово пояснює, що робить кожен із цих рядків коду, у своєму [посібнику з контрактів](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), ми запозичили їхні пояснення тут.

    const MyNFT = await ethers.getContractFactory("MyNFT");

ContractFactory в Ethers.js — це абстракція, яка використовується для розгортання нових смарт-контрактів, тому MyNFT тут є фабрикою для екземплярів нашого контракту NFT. Під час використання плагіна hardhat-ethers екземпляри ContractFactory та Contract за замовчуванням підключаються до першого підписанта.

    const myNFT = await MyNFT.deploy();

Виклик deploy() у ContractFactory розпочне розгортання та поверне Promise, який вирішується в Contract. Це об'єкт, який має метод для кожної з функцій нашого смарт-контракту.

## Крок 16: Розгортання нашого контракту {#deploy-contract}

Ми нарешті готові розгорнути наш смарт-контракт! Поверніться до кореня каталогу вашого проєкту та в командному рядку виконайте:

    npx hardhat --network sepolia run scripts/deploy.js

Після цього ви побачите щось на зразок:

    Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650

Якщо ми перейдемо до [Etherscan для Sepolia](https://sepolia.etherscan.io/) та знайдемо адресу нашого контракту, ми зможемо побачити, що його було успішно розгорнуто. Якщо ви не бачите його відразу, зачекайте трохи, оскільки це може зайняти деякий час. Транзакція виглядатиме приблизно так:

![View your transaction address on Etherscan](./etherscan-sepoila-contract-creation.png)

Адреса «From» (Від) має збігатися з адресою вашого акаунта МетаМаск, а в адресі «To» (Кому) буде вказано «Contract Creation» (Створення контракту). Якщо ми натиснемо на транзакцію, ми побачимо адресу нашого контракту в полі «To»:

![View your contract address on Etherscan](./etherscan-sepolia-tx-details.png)

Ура! Ви щойно розгорнули свій смарт-контракт NFT у ланцюзі Етеріум (тестовій мережі)!

Щоб зрозуміти, як це працює технічно, перейдіть на вкладку «Explorer» (Провідник) на нашій [панелі керування Alchemy](https://dashboard.alchemyapi.io/explorer). Якщо у вас є кілька застосунків Alchemy, обов'язково відфільтруйте за застосунком і виберіть «MyNFT».

![View calls made “under the hood” with Alchemy’s Explorer Dashboard](./alchemy-explorer-goerli.png)

Тут ви побачите кілька викликів JSON-RPC, які Hardhat/Ethers зробили для нас у фоновому режимі, коли ми викликали функцію .deploy(). Два важливі виклики, на які слід звернути увагу, — це [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction), який є запитом на фактичний запис нашого смарт-контракту в ланцюг Sepolia, та [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash), який є запитом на читання інформації про нашу транзакцію за заданим хешем (типовий патерн під час надсилання транзакцій). Щоб дізнатися більше про надсилання транзакцій, перегляньте цей посібник із [надсилання транзакцій за допомогою Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

Це все для першої частини цього посібника. У [другій частині ми фактично взаємодіятимемо з нашим смарт-контрактом, карбуючи NFT](/developers/tutorials/how-to-mint-an-nft/), а в [третій частині ми покажемо вам, як переглянути ваш NFT у вашому гаманці Етеріум](/developers/tutorials/how-to-view-nft-in-metamask/)!