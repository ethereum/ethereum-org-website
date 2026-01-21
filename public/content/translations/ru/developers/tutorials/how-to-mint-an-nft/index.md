---
title: "Как создать NFT (часть 2 из 3 серии руководств по NFT)"
description: "Это руководство описывает, как создать NFT в блокчейне Ethereum, используя наш смарт-контракт и Web3."
author: "Sumi Mudgil"
tags: [ "ERC-721", "alchemy", "твердость", "Умные контракты" ]
skill: beginner
lang: ru
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): 69 миллионов долларов
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): 11 миллионов долларов
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): 6 миллионов долларов

Все они создали свои NFT, используя мощный API Alchemy. В этом руководстве мы научим вас, как сделать то же самое менее чем за 10 минут.

«Создание NFT» — это акт публикации уникального экземпляра вашего токена ERC-721 в блокчейне. Используя наш смарт-контракт из [части 1 этой серии руководств по NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/), давайте продемонстрируем наши навыки в Web3 и создадим NFT. В конце этого руководства вы сможете создать столько NFT, сколько душе (и кошельку) будет угодно!

Приступим!

## Шаг 1. Установите Web3 {#install-web3}

Если вы следовали первому руководству по созданию смарт-контракта NFT, у вас уже есть опыт использования Ethers.js. Web3 похож на Ethers, так как это библиотека, используемая для упрощения создания запросов в блокчейн Ethereum. В этом руководстве мы будем использовать [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3), которая является усовершенствованной библиотекой Web3, предлагающей автоматические повторные попытки и надежную поддержку WebSocket.

В домашнем каталоге вашего проекта выполните:

```
npm install @alch/alchemy-web3
```

## Шаг 2. Создайте файл `mint-nft.js` {#create-mintnftjs}

В каталоге `scripts` создайте файл `mint-nft.js` и добавьте следующие строки кода:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Шаг 3. Получите ABI вашего контракта {#contract-abi}

ABI (двоичный интерфейс приложения) нашего контракта — это интерфейс для взаимодействия с нашим смарт-контрактом. Подробнее об ABI контрактов можно узнать [здесь](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is). Hardhat автоматически генерирует для нас ABI и сохраняет его в файле `MyNFT.json`. Чтобы использовать его, нам нужно будет проанализировать содержимое, добавив следующие строки кода в наш файл `mint-nft.js`:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Если вы хотите увидеть ABI, вы можете вывести его в консоль:

```js
console.log(JSON.stringify(contract.abi))
```

Чтобы запустить `mint-nft.js` и увидеть свой ABI, выведенный в консоль, перейдите в терминал и выполните команду:

```js
node scripts/mint-nft.js
```

## Шаг 4. Настройте метаданные для вашего NFT с помощью IPFS {#config-meta}

Если вы помните из нашего руководства в части 1, наша функция смарт-контракта `mintNFT` принимает параметр tokenURI, который должен преобразовываться в JSON-документ, описывающий метаданные NFT, — это то, что действительно оживляет NFT, позволяя ему иметь настраиваемые свойства, такие как имя, описание, изображение и другие атрибуты.

> _Межпланетная файловая система (Interplanetary File System, IPFS) — это децентрализованный протокол и одноранговая сеть для хранения и обмена данными в распределенной файловой системе._

Мы будем использовать Pinata, удобный API и инструментарий для IPFS, для хранения нашего NFT-актива и метаданных, чтобы гарантировать, что наш NFT действительно децентрализован. Если у вас нет аккаунта Pinata, зарегистрируйте бесплатный аккаунт [здесь](https://app.pinata.cloud) и выполните шаги для подтверждения вашей электронной почты.

После создания аккаунта:

- Перейдите на страницу «Файлы» и нажмите синюю кнопку «Загрузить» в левом верхнем углу страницы.

- Загрузите изображение в Pinata — это будет графический актив для вашего NFT. Не стесняйтесь называть актив так, как вам хочется.

- После загрузки вы увидите информацию о файле в таблице на странице «Файлы». Вы также увидите столбец CID. Вы можете скопировать CID, нажав на кнопку копирования рядом с ним. Вы можете просмотреть загруженный файл по адресу: `https://gateway.pinata.cloud/ipfs/<CID>`. Например, изображение, которое мы использовали, можно найти на IPFS [здесь](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5).

Для тех, кто лучше воспринимает информацию визуально, вышеуказанные шаги кратко изложены здесь:

![Как загрузить изображение в Pinata](./instructionsPinata.gif)

Теперь нам нужно загрузить в Pinata еще один документ. Но прежде чем мы это сделаем, нам нужно его создать!

В корневом каталоге создайте новый файл с именем `nft-metadata.json` и добавьте в него следующий JSON-код:

```json
{
  "attributes": [
    {
      "trait_type": "Порода",
      "value": "Мальтипу"
    },
    {
      "trait_type": "Цвет глаз",
      "value": "Мокко"
    }
  ],
  "description": "Самый очаровательный и чувствительный щенок в мире.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Рамзес"
}
```

Вы можете изменять данные в JSON. Вы можете удалять или добавлять атрибуты в раздел `attributes`. Самое главное, убедитесь, что поле `image` указывает на местоположение вашего изображения в IPFS — в противном случае ваш NFT будет содержать фотографию (очень милой!) собаки.

Завершив редактирование файла JSON, сохраните его и загрузите в Pinata, выполнив те же действия, что и при загрузке изображения.

![Как загрузить ваш nft-metadata.json в Pinata](./uploadPinata.gif)

## Шаг 5. Создайте экземпляр вашего контракта {#instance-contract}

Теперь, чтобы взаимодействовать с нашим контрактом, нам нужно создать его экземпляр в нашем коде. Для этого нам понадобится адрес нашего контракта, который мы можем получить из развертывания или [Blockscout](https://eth-sepolia.blockscout.com/), найдя адрес, который вы использовали для развертывания контракта.

![Просмотр адреса вашего контракта в Etherscan](./view-contract-etherscan.png)

В приведенном выше примере адрес нашего контракта — 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Далее мы будем использовать [метод contract](https://docs.web3js.org/api/web3-eth-contract/class/Contract) из Web3 для создания нашего контракта, используя ABI и адрес. В свой файл `mint-nft.js` добавьте следующее:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Шаг 6. Обновите файл `.env` {#update-env}

Теперь для создания и отправки транзакций в сеть Ethereum мы будем использовать адрес вашего публичного аккаунта Ethereum, чтобы получить nonce аккаунта (объясним ниже).

Добавьте свой публичный ключ в файл `.env` — если вы выполнили часть 1 руководства, ваш файл `.env` теперь должен выглядеть так:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Шаг 7. Создайте свою транзакцию {#create-txn}

Сначала давайте определим функцию с именем `mintNFT(tokenData)` и создадим нашу транзакцию, выполнив следующие действия:

1. Возьмите _PRIVATE_KEY_ и _PUBLIC_KEY_ из файла `.env`.

2. Далее нам нужно определить nonce аккаунта. Спецификация nonce используется для отслеживания количества транзакций, отправленных с вашего адреса, что необходимо в целях безопасности и для предотвращения [атак повторного воспроизведения](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Чтобы получить количество транзакций, отправленных с вашего адреса, мы используем [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).

3. Наконец, мы настроим нашу транзакцию со следующей информацией:

- `'from': PUBLIC_KEY` — источник нашей транзакции — наш публичный адрес.

- `'to': contractAddress` — контракт, с которым мы хотим взаимодействовать и которому отправляем транзакцию.

- `'nonce': nonce` — nonce аккаунта с количеством транзакций, отправленных с нашего адреса.

- `'gas': estimatedGas` — расчетное количество газа, необходимое для завершения транзакции.

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — вычисление, которое мы хотим выполнить в этой транзакции, — в данном случае это создание NFT.

Теперь ваш файл `mint-nft.js` должен выглядеть следующим образом:

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
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //получаем последний nonce

   //транзакция
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```

## Шаг 8. Подпишите транзакцию {#sign-txn}

Теперь, когда мы создали нашу транзакцию, нам нужно подписать ее, чтобы отправить. Здесь мы будем использовать наш приватный ключ.

`web3.eth.sendSignedTransaction` предоставит нам хэш транзакции, который мы можем использовать, чтобы убедиться, что наша транзакция была обработана и не была отброшена сетью. Вы заметите, что в разделе подписи транзакции мы добавили проверку ошибок, чтобы знать, успешно ли прошла наша транзакция.

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //получаем последний nonce

  //транзакция
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
              "Хэш вашей транзакции: ",
              hash,
              "\nПроверьте Mempool в Alchemy, чтобы просмотреть статус вашей транзакции!"
            )
          } else {
            console.log(
              "Что-то пошло не так при отправке вашей транзакции:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Ошибка Promise:", err)
    })
}
```

## Шаг 9. Вызовите `mintNFT` и запустите `node mint-nft.js` {#call-mintnft-fn}

Помните файл `metadata.json`, который вы загрузили в Pinata? Получите его хэш-код из Pinata и передайте в качестве параметра функции `mintNFT` следующее: `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

Вот как получить хэш-код:

![Как получить хэш-код метаданных вашего NFT на Pinata](./metadataPinata.gif)_Как получить хэш-код метаданных вашего NFT на Pinata_

> Дважды проверьте, что скопированный вами хэш-код ссылается на ваш **metadata.json**, загрузив `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` в отдельном окне. Страница должна выглядеть примерно так же, как на скриншоте ниже:

![На вашей странице должны отображаться метаданные JSON](./metadataJSON.png)_На вашей странице должны отображаться метаданные JSON_

В итоге ваш код должен выглядеть примерно так:

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //получаем последний nonce

  //транзакция
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
              "Хэш вашей транзакции: ",
              hash,
              "\nПроверьте Mempool в Alchemy, чтобы просмотреть статус вашей транзакции!"
            )
          } else {
            console.log(
              "Что-то пошло не так при отправке вашей транзакции:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Ошибка Promise:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Теперь выполните `node scripts/mint-nft.js`, чтобы создать свой NFT. Через пару секунд вы должны увидеть в своем терминале примерно такой ответ:

    ```
    Хэш вашей транзакции: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
    
    Проверьте Mempool в Alchemy, чтобы просмотреть статус вашей транзакции!
    ```

Затем посетите [mempool в Alchemy](https://dashboard.alchemyapi.io/mempool), чтобы увидеть статус вашей транзакции (ожидает ли она, обработана или отклонена сетью). Если ваша транзакция была отклонена, также полезно проверить [Blockscout](https://eth-sepolia.blockscout.com/) и найти хэш вашей транзакции.

![Просмотр хэша транзакции вашего NFT на Etherscan](./view-nft-etherscan.png)_Просмотр хэша транзакции вашего NFT на Etherscan_

Вот и все! Вы развернули и создали NFT в блокчейне Ethereum <Emoji text=":money_mouth_face:" size={1} />

С помощью `mint-nft.js` вы можете создать столько NFT, сколько душе (и кошельку) угодно! Только не забудьте передать новый tokenURI, описывающий метаданные NFT (иначе вы просто создадите кучу одинаковых NFT с разными идентификаторами).

Предположительно, вы хотели бы иметь возможность похвастаться своим NFT в своем кошельке — так что обязательно ознакомьтесь с [Частью 3: Как просмотреть свой NFT в кошельке](/developers/tutorials/how-to-view-nft-in-metamask/)!
