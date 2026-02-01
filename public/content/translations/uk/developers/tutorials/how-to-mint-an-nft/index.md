---
title: Як викарбувати NFT (Частина 2/3 із серії підручників про NFT)
description: У цьому підручнику описано, як викарбувати NFT на блокчейні Ethereum за допомогою нашого смарт-контракту та Web3.
author: "Сумі Мудгіл"
tags:
  [
    "ERC-721",
    "alchemy",
    "мова програмування",
    "Смарт-контракти"
  ]
skill: beginner
lang: uk
published: 22 квітня 2021 року
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): 69 мільйонів доларів
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): 11 мільйонів доларів
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): 6 мільйонів доларів

Усі вони викарбували свої NFT за допомогою потужного API від Alchemy. У цьому підручнику ми навчимо вас, як зробити те саме за \<10 хвилин.

«Карбування NFT» — це публікація унікального екземпляра вашого токена ERC-721 у блокчейні. Використовуючи наш смарт-контракт із [частини 1 цієї серії підручників про NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/), продемонструймо наші навички Web3 та викарбуймо NFT. Наприкінці цього підручника ви зможете карбувати стільки NFT, скільки забажає ваше серце (і гаманець)!

Розпочнімо!

## Крок 1. Установлення Web3 {#install-web3}

Якщо ви дотримувалися вказівок першого підручника зі створення смарт-контракту NFT, у вас уже є досвід роботи з Ethers.js. Web3 схожа на Ethers, оскільки це бібліотека, яка використовується для полегшення створення запитів до блокчейну Ethereum. У цьому підручнику ми використовуватимемо [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3), розширену бібліотеку Web3, що пропонує автоматичні повторні спроби та надійну підтримку WebSocket.

У кореневому каталозі вашого проєкту виконайте команду:

```
npm install @alch/alchemy-web3
```

## Крок 2. Створення файлу `mint-nft.js` {#create-mintnftjs}

У каталозі `scripts` створіть файл `mint-nft.js` і додайте до нього такі рядки коду:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Крок 3. Отримання ABI вашого контракту {#contract-abi}

ABI нашого контракту (Application Binary Interface) — це інтерфейс для взаємодії з нашим смарт-контрактом. Дізнатися більше про ABI контрактів можна [тут](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is). Hardhat автоматично генерує для нас ABI і зберігає його у файлі `MyNFT.json`. Щоб використати це, нам потрібно буде проаналізувати вміст, додавши такі рядки коду до нашого файлу `mint-nft.js`:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Якщо ви хочете побачити ABI, ви можете вивести його в консоль:

```js
console.log(JSON.stringify(contract.abi))
```

Щоб запустити `mint-nft.js` і побачити свій ABI, виведений у консоль, перейдіть до термінала та виконайте:

```js
node scripts/mint-nft.js
```

## Крок 4. Налаштування метаданих для вашого NFT за допомогою IPFS {#config-meta}

Якщо ви пам’ятаєте з нашого підручника в частині 1, функція нашого смарт-контракту `mintNFT` приймає параметр tokenURI, який має вказувати на документ JSON, що описує метадані NFT. Саме ці метадані вдихають життя в NFT, дозволяючи йому мати такі властивості, що налаштовуються: назву, опис, зображення та інші атрибути.

> _Міжпланетна файлова система (IPFS) — це децентралізований протокол і однорангова мережа для зберігання та обміну даними в розподіленій файловій системі._

Ми будемо використовувати Pinata, зручний API для IPFS та набір інструментів, для зберігання нашого активу NFT і метаданих, щоб переконатися, що наш NFT справді децентралізований. Якщо у вас немає облікового запису Pinata, зареєструйте безплатний обліковий запис [тут](https://app.pinata.cloud) і виконайте кроки для підтвердження своєї електронної пошти.

Після того, як ви створили обліковий запис:

- Перейдіть на сторінку «Файли» й натисніть синю кнопку «Завантажити» у верхньому лівому куті сторінки.

- Завантажте зображення в Pinata — це буде графічний актив для вашого NFT. Називайте активи як забажаєте

- Після завантаження ви побачите інформацію про файл у таблиці на сторінці «Файли». Ви також побачите стовпець CID. Ви можете скопіювати CID, натиснувши кнопку копіювання поруч із ним. Переглянути завантаження можна за адресою: `https://gateway.pinata.cloud/ipfs/<CID>`. Наприклад, зображення, яке ми використовували, можна знайти в IPFS [тут](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5).

Для тих, хто краще сприймає візуальну інформацію, кроки вище підсумовано тут:

![Як завантажити зображення в Pinata](./instructionsPinata.gif)

Тепер нам потрібно завантажити ще один документ у Pinata. Але перш ніж зробити це, нам потрібно його створити!

У кореневому каталозі створіть новий файл `nft-metadata.json` і додайте такий код JSON:

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

Можете змінювати дані в JSON. Ви можете видаляти атрибути або додавати нові. Найголовніше, переконайтеся, що поле зображення вказує на розташування вашого зображення в IPFS, інакше у ваш NFT потрапить фото (дуже милого!) собаки.

Закінчивши редагувати файл JSON, збережіть його та завантажте в Pinata, виконавши ті самі кроки, що й під час завантаження зображення.

![Як завантажити nft-metadata.json у Pinata](./uploadPinata.gif)

## Крок 5. Створення екземпляра вашого контракту {#instance-contract}

Тепер, щоб взаємодіяти з нашим контрактом, нам потрібно створити його екземпляр у нашому коді. Для цього нам знадобиться адреса нашого контракту, яку ми можемо отримати з даних розгортання або в [Blockscout](https://eth-sepolia.blockscout.com/), знайшовши адресу, яку ви використовували для розгортання контракту.

![Перегляд адреси вашого контракту на Etherscan](./view-contract-etherscan.png)

У наведеному вище прикладі адреса нашого контракту — 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Далі ми використаємо [метод contract](https://docs.web3js.org/api/web3-eth-contract/class/Contract) Web3, щоб створити наш контракт за допомогою ABI та адреси. У файл `mint-nft.js` додайте таке:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Крок 6. Оновлення файлу `.env` {#update-env}

Тепер, щоб створювати та надсилати транзакції в мережу Ethereum, ми будемо використовувати адресу вашого публічного облікового запису Ethereum, щоб отримати nonce облікового запису (це ми пояснимо нижче).

Додайте свій публічний ключ у файл `.env` — якщо ви виконали частину 1 підручника, ваш файл `.env` тепер має виглядати так:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Крок 7. Створення транзакції {#create-txn}

Спочатку визначимо функцію `mintNFT(tokenData)` і створимо нашу транзакцію, виконавши такі дії:

1. Візьміть _PRIVATE_KEY_ та _PUBLIC_KEY_ з файлу `.env`.

2. Далі нам потрібно визначити nonce облікового запису. Специфікація nonce використовується для відстеження кількості транзакцій, надісланих із вашої адреси, що необхідно для безпеки та запобігання [атакам повторного відтворення](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Щоб отримати кількість транзакцій, надісланих із вашої адреси, ми використовуємо [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).

3. Нарешті, ми налаштуємо транзакцію з такою інформацією:

- `'from': PUBLIC_KEY` — джерело нашої транзакції, наша публічна адреса

- `'to': contractAddress` — контракт, з яким ми хочемо взаємодіяти та якому надсилаємо транзакцію

- `'nonce': nonce` — nonce облікового запису з кількістю транзакцій, надісланих з нашої адреси

- `'gas': estimatedGas` — приблизна кількість газу, необхідна для завершення транзакції

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — обчислення, яке ми хочемо виконати в цій транзакції, у нашому випадку це карбування NFT

Тепер ваш файл `mint-nft.js` має виглядати так:

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
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //отримати останній nonce

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

## Крок 8. Підписання транзакції {#sign-txn}

Тепер, коли ми створили транзакцію, нам потрібно її підписати, щоб відправити. Саме тут ми будемо використовувати наш приватний ключ.

`web3.eth.sendSignedTransaction` надасть нам хеш транзакції, за допомогою якого ми можемо переконатися, що нашу транзакцію було видобуто, а не відхилено мережею. Ви помітите, що в розділі підписання транзакцій ми додали перевірку помилок, щоб знати, чи успішно пройшла наша транзакція.

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //отримати останній nonce

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
              "Хеш вашої транзакції: ",
              hash,
              "\nПеревірте Mempool в Alchemy, щоб переглянути статус вашої транзакції!"
            )
          } else {
            console.log(
              "Щось пішло не так під час надсилання транзакції:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Помилка Promise:", err)
    })
}
```

## Крок 9. Виклик `mintNFT` і запуск `node mint-nft.js` {#call-mintnft-fn}

Пам'ятаєте файл `metadata.json`, який ви завантажили в Pinata? Отримайте його хеш-код з Pinata та передайте у функцію `mintNFT` такий параметр: `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

Ось як отримати хеш-код:

![Як отримати хеш-код метаданих вашого NFT на Pinata](./metadataPinata.gif)_Як отримати хеш-код метаданих вашого NFT на Pinata_

> Ще раз перевірте, чи скопійований хеш-код веде на ваш **metadata.json**, завантаживши `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` в окремому вікні. Сторінка має виглядати приблизно так, як на знімку екрана нижче:

![На вашій сторінці мають відображатися метадані JSON](./metadataJSON.png)_На вашій сторінці мають відображатися метадані JSON_

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //отримати останній nonce

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
              "Хеш вашої транзакції: ",
              hash,
              "\nПеревірте Mempool в Alchemy, щоб переглянути статус вашої транзакції!"
            )
          } else {
            console.log(
              "Щось пішло не так під час надсилання транзакції:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Помилка Promise:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Тепер запустіть `node scripts/mint-nft.js`, щоб розгорнути свій NFT. Через кілька секунд ви маєте побачити в терміналі таку відповідь:

    ```
    Хеш вашої транзакції: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
    
    Перевірте Mempool в Alchemy, щоб переглянути статус вашої транзакції!
    ```

Далі перейдіть до [mempool Alchemy](https://dashboard.alchemyapi.io/mempool), щоб побачити статус вашої транзакції (чи вона очікує на розгляд, чи її видобуто, чи відхилено мережею). Якщо вашу транзакцію було відхилено, також корисно перевірити [Blockscout](https://eth-sepolia.blockscout.com/) і знайти хеш вашої транзакції.

![Перегляд хешу транзакції вашого NFT на Etherscan](./view-nft-etherscan.png)_Перегляд хешу транзакції вашого NFT на Etherscan_

Ось і все! Ви щойно розгорнули ТА викарбували NFT на блокчейні Ethereum <Emoji text=":money_mouth_face:" size={1} />

За допомогою `mint-nft.js` ви можете карбувати стільки NFT, скільки забажає ваше серце (і гаманець)! Просто не забудьте передати новий tokenURI, що описує метадані NFT (інакше ви просто створите купу однакових токенів із різними ідентифікаторами).

Імовірно, ви хотіли б мати можливість показати свій NFT у гаманці — тож обов'язково перегляньте [Частину 3. Як переглянути свій NFT у гаманці](/developers/tutorials/how-to-view-nft-in-metamask/)!
