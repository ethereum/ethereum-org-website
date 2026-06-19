---
title: "Як карбувати NFT (Частина 2/3 серії посібників про NFT)"
description: "Цей посібник описує, як карбувати NFT у блокчейні Етеріум за допомогою нашого смарт-контракту та Web3."
author: "Сумі Мудгіл"
tags:
  - ERC-721
  - alchemy
  - solidity
  - смарт-контракти
skill: beginner
breadcrumb: "Карбування NFT"
lang: uk
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): 69 мільйонів доларів
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): 11 мільйонів доларів
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): 6 мільйонів доларів

Усі вони карбували свої NFT за допомогою потужного API Alchemy. У цьому посібнику ми навчимо вас робити те саме менш ніж за 10 хвилин.

«Карбування NFT» — це процес публікації унікального екземпляра вашого токена ERC-721 у блокчейні. Використовуючи наш смарт-контракт із [Частини 1 цієї серії посібників про NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/), давайте застосуємо наші навички роботи з Web3 та викарбуємо NFT. Наприкінці цього посібника ви зможете карбувати стільки NFT, скільки забажає ваша душа (і гаманець)!

Почнімо!

## Крок 1: Встановіть Web3 {#install-web3}

Якщо ви дотримувалися першого посібника зі створення смарт-контракту для NFT, ви вже маєте досвід використання Ethers.js. Web3 схожий на Ethers, оскільки це бібліотека, яка використовується для спрощення створення запитів до блокчейну [Етеріум](/). У цьому посібнику ми будемо використовувати [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3) — розширену бібліотеку Web3, яка пропонує автоматичні повторні спроби та надійну підтримку WebSocket.

У головному каталозі вашого проєкту виконайте:

```
npm install @alch/alchemy-web3
```

## Крок 2: Створіть файл `mint-nft.js` {#create-mintnftjs}

У каталозі скриптів створіть файл `mint-nft.js` і додайте такі рядки коду:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Крок 3: Отримайте ABI вашого контракту {#contract-abi}

ABI (Application Binary Interface) нашого контракту — це інтерфейс для взаємодії з нашим смарт-контрактом. Ви можете дізнатися більше про ABI контрактів [тут](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is). Hardhat автоматично генерує ABI для нас і зберігає його у файлі `MyNFT.json`. Щоб використати його, нам потрібно буде проаналізувати вміст, додавши такі рядки коду до нашого файлу `mint-nft.js`:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Якщо ви хочете побачити ABI, ви можете вивести його в консоль:

```js
console.log(JSON.stringify(contract.abi))
```

Щоб запустити `mint-nft.js` і побачити ваш ABI, виведений у консоль, перейдіть до термінала та виконайте:

```js
node scripts/mint-nft.js
```

## Крок 4: Налаштуйте метадані для вашого NFT за допомогою IPFS {#config-meta}

Якщо ви пам'ятаєте з нашого посібника в Частині 1, функція нашого смарт-контракту `mintNFT` приймає параметр tokenURI, який має вказувати на JSON-документ, що описує метадані NFT — саме це оживляє NFT, дозволяючи йому мати настроювані властивості, такі як назва, опис, зображення та інші атрибути.

> _Interplanetary File System (IPFS) — це децентралізований протокол та однорангова мережа для зберігання та обміну даними в розподіленій файловій системі._

Ми будемо використовувати Pinata, зручний API та набір інструментів IPFS, для зберігання нашого активу NFT та метаданих, щоб гарантувати, що наш NFT є дійсно децентралізованим. Якщо у вас немає акаунта Pinata, зареєструйте безкоштовний акаунт [тут](https://app.pinata.cloud) і виконайте кроки для підтвердження вашої електронної пошти.

Після створення акаунта:

- Перейдіть на сторінку «Files» і натисніть синю кнопку «Upload» у верхньому лівому куті сторінки.

- Завантажте зображення в Pinata — це буде зображення для вашого NFT. Можете назвати актив як завгодно.

- Після завантаження ви побачите інформацію про файл у таблиці на сторінці «Files». Ви також побачите стовпець CID. Ви можете скопіювати CID, натиснувши кнопку копіювання поруч із ним. Ви можете переглянути своє завантаження за адресою: `https://gateway.pinata.cloud/ipfs/<CID>`. Наприклад, ви можете знайти зображення, яке ми використовували в IPFS, [тут](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5).

Для тих, хто краще сприймає візуальну інформацію, наведені вище кроки підсумовані тут:

![How to upload your image to Pinata](./instructionsPinata.gif)

Тепер ми хочемо завантажити ще один документ у Pinata. Але перш ніж це зробити, нам потрібно його створити!

У вашому кореневому каталозі створіть новий файл під назвою `nft-metadata.json` і додайте такий JSON-код:

```json
{
  "attributes": [
    {
      "trait_type": "Breed",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Eye color",
      "value": "Mocha"
    }
  ],
  "description": "The world's most adorable and sensitive pup.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

Не соромтеся змінювати дані в JSON. Ви можете видаляти або додавати атрибути в розділі attributes. Найважливіше — переконайтеся, що поле image вказує на розташування вашого зображення в IPFS, інакше ваш NFT міститиме фотографію (дуже милого!) собаки.

Після завершення редагування файлу JSON збережіть його та завантажте в Pinata, дотримуючись тих самих кроків, що й для завантаження зображення.

![How to upload your nft-metadata.json to Pinata](./uploadPinata.gif)

## Крок 5: Створіть екземпляр вашого контракту {#instance-contract}

Тепер, щоб взаємодіяти з нашим контрактом, нам потрібно створити його екземпляр у нашому коді. Для цього нам знадобиться адреса нашого контракту, яку ми можемо отримати з розгортання або в [Blockscout](https://eth-sepolia.blockscout.com/), знайшовши адресу, яку ви використовували для розгортання контракту.

![View your contract address on Etherscan](./view-contract-etherscan.png)

У наведеному вище прикладі адреса нашого контракту — 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Далі ми використаємо [метод контракту](https://docs.web3js.org/api/web3-eth-contract/class/Contract) Web3, щоб створити наш контракт за допомогою ABI та адреси. У ваш файл `mint-nft.js` додайте таке:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Крок 6: Оновіть файл `.env` {#update-env}

Тепер, щоб створювати та надсилати транзакції в ланцюг Етеріум, ми використаємо адресу вашого відкритого акаунта Етеріум, щоб отримати нонс акаунта (пояснимо нижче).

Додайте свій відкритий ключ до файлу `.env` — якщо ви завершили частину 1 посібника, наш файл `.env` тепер має виглядати так:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Крок 7: Створіть вашу транзакцію {#create-txn}

Спочатку давайте визначимо функцію з назвою `mintNFT(tokenData)` і створимо нашу транзакцію, виконавши такі дії:

1. Отримайте ваші _PRIVATE_KEY_ та _PUBLIC_KEY_ з файлу `.env`.

1. Далі нам потрібно буде з'ясувати нонс акаунта. Специфікація нонсу використовується для відстеження кількості транзакцій, надісланих з вашої адреси, що нам потрібно з міркувань безпеки та для запобігання [атакам повторного відтворення](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Щоб отримати кількість транзакцій, надісланих з вашої адреси, ми використовуємо [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).

1. Нарешті, ми налаштуємо нашу транзакцію з такою інформацією:

- `'from': PUBLIC_KEY` — Джерелом нашої транзакції є наша відкрита адреса

- `'to': contractAddress` — Контракт, з яким ми хочемо взаємодіяти та надіслати транзакцію

- `'nonce': nonce` — Нонс акаунта з кількістю транзакцій, надісланих з нашої адреси

- `'gas': estimatedGas` — Орієнтовний газ, необхідний для завершення транзакції

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — Обчислення, яке ми хочемо виконати в цій транзакції — у цьому випадку це карбування NFT

Ваш файл `mint-nft.js` тепер має виглядати так:

```js
   require('dotenv').config();
   const API_URL = process.env.API_URL;
   const PUBLIC_KEY = process.env.PUBLIC_KEY;
   const PRIVATE_KEY = process.env.PRIVATE_KEY;

   const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
   const web3 = createAlchemyWeb3(API_URL);

   const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
   const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778";
   const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

   async function mintNFT(tokenURI) {
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //отримати останній нонс

   //транзакція
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```

## Крок 8: Підпишіть транзакцію {#sign-txn}

Тепер, коли ми створили нашу транзакцію, нам потрібно підписати її, щоб відправити. Саме тут ми використаємо наш приватний ключ.

`web3.eth.sendSignedTransaction` надасть нам хеш транзакції, який ми можемо використати, щоб переконатися, що наша транзакція була видобута і не була відхилена мережею. Ви помітите, що в розділі підписання транзакції ми додали перевірку помилок, щоб знати, чи успішно пройшла наша транзакція.

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //отримати останній нонс

  //транзакція
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}
```

## Крок 9: Викличте `mintNFT` та запустіть node `mint-nft.js` {#call-mintnft-fn}

Пам'ятаєте `metadata.json`, який ви завантажили в Pinata? Отримайте його хеш-код з Pinata і передайте наступне як параметр у функцію `mintNFT` `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

Ось як отримати хеш-код:

![How to get your nft metadata hashcode on Pinata](./metadataPinata.gif)_Як отримати хеш-код метаданих вашого NFT у Pinata_

> Двічі перевірте, чи скопійований вами хеш-код посилається на ваш **metadata.json**, завантаживши `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` в окремому вікні. Сторінка має виглядати подібно до знімка екрана нижче:

![Your page should display the json metadata](./metadataJSON.png)_Ваша сторінка має відображати метадані JSON_

Загалом ваш код має виглядати приблизно так:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //отримати останній нонс

  //транзакція
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise failed:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Тепер виконайте `node scripts/mint-nft.js`, щоб розгорнути ваш NFT. Через кілька секунд ви маєте побачити таку відповідь у своєму терміналі:

    The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8

    Check Alchemy's Mempool to view the status of your transaction!

Далі відвідайте ваш [мемпул Alchemy](https://dashboard.alchemyapi.io/mempool), щоб побачити статус вашої транзакції (чи вона очікує на обробку, видобута, чи відхилена мережею). Якщо вашу транзакцію було відхилено, також корисно перевірити [Blockscout](https://eth-sepolia.blockscout.com/) і знайти хеш вашої транзакції.

![View your NFT transaction hash on Etherscan](./view-nft-etherscan.png)_Перегляд хешу транзакції вашого NFT на Etherscan_

Ось і все! Тепер ви розгорнули ТА викарбували NFT у блокчейні Етеріум <Emoji text=":money_mouth_face:" size={1} />

Використовуючи `mint-nft.js`, ви можете карбувати стільки NFT, скільки забажає ваша душа (і гаманець)! Тільки не забудьте передати новий tokenURI, що описує метадані NFT (інакше ви просто створите купу однакових NFT з різними ідентифікаторами).

Ймовірно, ви хотіли б мати можливість похизуватися своїм NFT у гаманці — тому обов'язково перегляньте [Частину 3: Як переглянути свій NFT у гаманці](/developers/tutorials/how-to-view-nft-in-metamask/)!