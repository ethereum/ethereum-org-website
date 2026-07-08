---
title: "Как чеканить NFT (Часть 2/3 серии руководств по NFT)"
description: "В этом руководстве описывается, как чеканить NFT в блокчейне Эфириума с использованием нашего смарт-контракта и Web3."
author: "Суми Мудгил"
tags:
  - ERC-721
  - alchemy
  - solidity
  - смарт-контракты
skill: beginner
breadcrumb: "Чеканка NFT"
lang: ru
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): $69 млн
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): $11 млн
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): $6 млн

Все они чеканили свои NFT, используя мощный API Alchemy. В этом руководстве мы научим вас делать то же самое менее чем за 10 минут.

«Чеканка NFT» — это процесс публикации уникального экземпляра вашего токена ERC-721 в блокчейне. Используя наш смарт-контракт из [Части 1 этой серии руководств по NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/), давайте применим наши навыки работы с Web3 и отчеканим NFT. В конце этого руководства вы сможете чеканить столько NFT, сколько пожелает ваша душа (и кошелек)!

Давайте начнем!

## Шаг 1: Установите Web3 {#install-web3}

Если вы следовали первому руководству по созданию смарт-контракта NFT, у вас уже есть опыт использования Ethers.js. Web3 похож на Ethers, так как это библиотека, используемая для упрощения создания запросов к блокчейну [Эфириума](/). В этом руководстве мы будем использовать [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) — расширенную библиотеку Web3, которая предлагает автоматические повторные попытки и надежную поддержку WebSocket.

В домашнем каталоге вашего проекта выполните:

```
npm install @alch/alchemy-web3
```

## Шаг 2: Создайте файл `mint-nft.js` {#create-mintnftjs}

В каталоге scripts создайте файл `mint-nft.js` и добавьте следующие строки кода:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Шаг 3: Получите ABI вашего контракта {#contract-abi}

ABI (Application Binary Interface) нашего контракта — это интерфейс для взаимодействия с нашим смарт-контрактом. Вы можете узнать больше об [ABI контрактов](/glossary/#abi). Hardhat автоматически генерирует ABI для нас и сохраняет его в файле `MyNFT.json`. Чтобы использовать его, нам нужно будет извлечь содержимое, добавив следующие строки кода в наш файл `mint-nft.js`:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Если вы хотите увидеть ABI, вы можете вывести его в консоль:

```js
console.log(JSON.stringify(contract.abi))
```

Чтобы запустить `mint-nft.js` и увидеть ваш ABI, выведенный в консоль, перейдите в терминал и выполните:

```js
node scripts/mint-nft.js
```
## Шаг 4: Настройте метаданные для вашего NFT с помощью IPFS {#config-meta}

Если вы помните из нашего руководства в Части 1, функция нашего смарт-контракта `mintNFT` принимает параметр tokenURI, который должен указывать на JSON-документ, описывающий метаданные NFT — это именно то, что оживляет NFT, позволяя ему иметь настраиваемые свойства, такие как имя, описание, изображение и другие атрибуты.

> _Interplanetary File System (IPFS) — это децентрализованный протокол и одноранговая сеть для хранения и обмена данными в распределенной файловой системе._

Мы будем использовать Pinata, удобный API и набор инструментов IPFS, для хранения нашего актива NFT и метаданных, чтобы гарантировать, что наш NFT действительно децентрализованный. Если у вас нет аккаунта Pinata, зарегистрируйте бесплатный аккаунт [здесь](https://app.pinata.cloud) и выполните шаги для подтверждения вашей электронной почты.

После создания аккаунта:

- Перейдите на страницу «Files» (Файлы) и нажмите синюю кнопку «Upload» (Загрузить) в левом верхнем углу страницы.

- Загрузите изображение в Pinata — это будет файл изображения для вашего NFT. Можете назвать актив как угодно.

- После загрузки вы увидите информацию о файле в таблице на странице «Files». Вы также увидите столбец CID. Вы можете скопировать CID, нажав кнопку копирования рядом с ним. Вы можете просмотреть загруженный файл по адресу: `https://gateway.pinata.cloud/ipfs/<CID>`. Например, вы можете найти изображение, которое мы использовали в IPFS, [здесь](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5).

Для тех, кто лучше воспринимает визуальную информацию, описанные выше шаги обобщены здесь:

![How to upload your image to Pinata](./instructionsPinata.gif)

Теперь мы хотим загрузить еще один документ в Pinata. Но прежде чем мы это сделаем, нам нужно его создать!

В корневом каталоге создайте новый файл с именем `nft-metadata.json` и добавьте следующий JSON-код:

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

Не стесняйтесь изменять данные в JSON. Вы можете удалять или добавлять элементы в раздел атрибутов. Самое главное, убедитесь, что поле image указывает на расположение вашего изображения в IPFS — иначе ваш NFT будет включать фотографию (очень милой!) собаки.

Как только вы закончите редактирование JSON-файла, сохраните его и загрузите в Pinata, следуя тем же шагам, что и при загрузке изображения.

![How to upload your nft-metadata.json to Pinata](./uploadPinata.gif)

## Шаг 5: Создайте экземпляр вашего контракта {#instance-contract}

Теперь, чтобы взаимодействовать с нашим контрактом, нам нужно создать его экземпляр в нашем коде. Для этого нам понадобится адрес нашего контракта, который мы можем получить из развертывания или в [Blockscout](https://eth-sepolia.blockscout.com/), найдя адрес, который вы использовали для развертывания контракта.

![View your contract address on Etherscan](./view-contract-etherscan.png)

В приведенном выше примере адрес нашего контракта — 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Далее мы будем использовать [метод contract](https://docs.web3js.org/api/web3-eth-contract/class/Contract) Web3 для создания нашего контракта с использованием ABI и адреса. В ваш файл `mint-nft.js` добавьте следующее:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Шаг 6: Обновите файл `.env` {#update-env}

Теперь, чтобы создавать и отправлять транзакции в цепь Эфириума, мы будем использовать адрес вашего открытого аккаунта Эфириума для получения нонса аккаунта (объясним ниже).

Добавьте ваш открытый ключ в файл `.env` — если вы завершили часть 1 руководства, наш файл `.env` теперь должен выглядеть так:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Шаг 7: Создайте вашу транзакцию {#create-txn}

Сначала давайте определим функцию с именем `mintNFT(tokenData)` и создадим нашу транзакцию, выполнив следующее:

1. Получите ваши _PRIVATE_KEY_ и _PUBLIC_KEY_ из файла `.env`.

1. Далее нам нужно будет определить нонс аккаунта. Спецификация нонса используется для отслеживания количества транзакций, отправленных с вашего адреса, что необходимо нам в целях безопасности и для предотвращения атак повторного воспроизведения. Чтобы получить количество транзакций, отправленных с вашего адреса, мы используем [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count).

1. Наконец, мы настроим нашу транзакцию со следующей информацией:

- `'from': PUBLIC_KEY` — источник нашей транзакции, наш открытый адрес

- `'to': contractAddress` — контракт, с которым мы хотим взаимодействовать и которому отправляем транзакцию

- `'nonce': nonce` — нонс аккаунта с количеством транзакций, отправленных с нашего адреса

- `'gas': estimatedGas` — расчетный газ, необходимый для завершения транзакции

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — вычисление, которое мы хотим выполнить в этой транзакции — в данном случае это чеканка NFT

Ваш файл `mint-nft.js` теперь должен выглядеть так:

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
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //получить последний нонс

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
## Шаг 8: Подпишите транзакцию {#sign-txn}

Теперь, когда мы создали нашу транзакцию, нам нужно подписать ее, чтобы отправить. Именно здесь мы будем использовать наш приватный ключ.

`web3.eth.sendSignedTransaction` даст нам хеш транзакции, который мы можем использовать, чтобы убедиться, что наша транзакция была добыта и не была отброшена сетью. Вы заметите, что в разделе подписания транзакции мы добавили проверку ошибок, чтобы знать, успешно ли прошла наша транзакция.

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //получить последний нонс

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

## Шаг 9: Вызовите `mintNFT` и запустите node `mint-nft.js` {#call-mintnft-fn}

Помните `metadata.json`, который вы загрузили в Pinata? Получите его хеш-код из Pinata и передайте следующее в качестве параметра функции `mintNFT` `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

Вот как получить хеш-код:

![How to get your nft metadata hashcode on Pinata](./metadataPinata.gif)_Как получить хеш-код метаданных вашего NFT в Pinata_

> Дважды проверьте, что скопированный вами хеш-код ссылается на ваш **metadata.json**, загрузив `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` в отдельном окне. Страница должна выглядеть примерно так, как на скриншоте ниже:

![Your page should display the json metadata](./metadataJSON.png)_Ваша страница должна отображать метаданные в формате JSON_

В целом ваш код должен выглядеть примерно так:

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //получить последний нонс

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

Теперь запустите `node scripts/mint-nft.js`, чтобы развернуть ваш NFT. Через пару секунд вы должны увидеть в терминале ответ, подобный этому:

    The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8

    Check Alchemy's Mempool to view the status of your transaction!

Затем посетите ваш [мемпул Alchemy](https://dashboard.alchemy.com/mempool), чтобы увидеть статус вашей транзакции (находится ли она в ожидании, добыта или отброшена сетью). Если ваша транзакция была отброшена, также полезно проверить [Blockscout](https://eth-sepolia.blockscout.com/) и выполнить поиск по хешу транзакции.

![View your NFT transaction hash on Etherscan](./view-nft-etherscan.png)_Просмотр хеша транзакции вашего NFT в Etherscan_

И это все! Теперь вы развернули И отчеканили NFT в блокчейне Эфириума <Emoji text=":money_mouth_face:" size={1} />

Используя `mint-nft.js`, вы можете чеканить столько NFT, сколько пожелает ваша душа (и кошелек)! Просто убедитесь, что передаете новый tokenURI, описывающий метаданные NFT (иначе вы просто создадите кучу одинаковых NFT с разными ID).

Предположительно, вы хотели бы иметь возможность похвастаться своим NFT в кошельке — поэтому обязательно ознакомьтесь с [Частью 3: Как просмотреть ваш NFT в кошельке](/developers/tutorials/how-to-view-nft-in-metamask/)!
