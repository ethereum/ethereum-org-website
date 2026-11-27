---
title: "Как чеканить NFT (Часть 2/3 серии руководств по NFT)"
description: "В этом руководстве описывается, как чеканить NFT в блокчейне Эфириум с использованием нашего смарт-контракта, Hardhat и ethers.js."
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

«Чеканка NFT» — это процесс публикации уникального экземпляра вашего токена ERC-721 в блокчейне. Используя наш смарт-контракт из [части 1 этой серии руководств по NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/), давайте применим наши навыки Web3 и отчеканим NFT. В конце этого руководства вы сможете чеканить столько NFT, сколько пожелает ваша душа (и кошелек)!

Давайте начнем!

## Шаг 1. Проверьте свои настройки {#install-web3}

Если вы следовали первому руководству по созданию смарт-контракта для NFT, у вас уже есть все необходимое: проект Hardhat 3 с [плагином Ethers](https://hardhat.org/docs/plugins/hardhat-ethers) и [ethers.js](https://docs.ethers.org/v6/) — библиотекой, используемой для упрощения создания запросов к блокчейну [Эфириум](/). Мы напишем наш код для чеканки в виде скрипта Hardhat, поэтому он будет повторно использовать настройки сети Sepolia, а также значения `API_URL` и `PRIVATE_KEY` из части 1 — ничего нового устанавливать не нужно.

## Шаг 2. Создайте файл `mint-nft.js` {#create-mintnftjs}

В каталоге scripts создайте файл `mint-nft.js` и добавьте следующие строки кода:

```js
import { network } from "hardhat"

const { ethers } = await network.create()
```

Как и в нашем скрипте для развертывания, `network.create()` подключается к сети, которую вы выбираете с помощью `--network` при запуске скрипта, и предоставляет нам объект `ethers` для нее.

## Шаг 3. Получите ABI вашего контракта {#contract-abi}

ABI (двоичный интерфейс приложения) нашего контракта — это интерфейс для взаимодействия с нашим смарт-контрактом. Вы можете узнать больше об [ABI контрактов](/glossary/#abi). Hardhat автоматически генерирует ABI для нас при компиляции контракта и сохраняет его в файле `artifacts/contracts/MyNFT.sol/MyNFT.json`. Плагин Hardhat Ethers считывает его оттуда для нас, когда мы создаем экземпляр нашего контракта на шаге 5, поэтому нам не нужно загружать его самостоятельно.

Если вы хотите увидеть ABI, вы можете вывести его в консоль. Из корневого каталога вашего проекта выполните:

```sh
node -p "JSON.stringify(require('./artifacts/contracts/MyNFT.sol/MyNFT.json').abi)"
```

## Шаг 4. Настройте метаданные для вашего NFT с помощью IPFS {#config-meta}

Если вы помните из нашего руководства в части 1, функция нашего смарт-контракта `mintNFT` принимает параметр tokenURI, который должен указывать на JSON-документ, описывающий метаданные NFT — это то, что действительно оживляет NFT, позволяя ему иметь настраиваемые свойства, такие как имя, описание, изображение и другие атрибуты.

> _Interplanetary File System (IPFS) — это децентрализованный протокол и одноранговая сеть для хранения и обмена данными в распределенной файловой системе._

Мы будем использовать Pinata, удобный программный интерфейс приложения (API) IPFS и набор инструментов, для хранения нашего актива NFT и метаданных, чтобы гарантировать, что наш NFT действительно децентрализованный. Если у вас нет аккаунта Pinata, зарегистрируйте бесплатный аккаунт [здесь](https://app.pinata.cloud) и выполните шаги для подтверждения электронной почты.

После создания аккаунта:

- Перейдите на [страницу файлов](https://app.pinata.cloud/ipfs/files) и нажмите кнопку «Add» (Добавить) в правом верхнем углу страницы.

- Загрузите изображение в Pinata — это будет файл изображения для вашего NFT. Можете назвать файл как угодно. Убедитесь, что вы загружаете его в публичную IPFS: файлы в [приватной IPFS](https://docs.pinata.cloud/files/private-ipfs) не могут быть получены кошельками и маркетплейсами, которые отображают ваш NFT.

- После загрузки вы увидите файл в списке на странице файлов вместе с его CID (идентификатором контента). Скопируйте CID. Вы можете просмотреть загруженный файл по адресу: `https://gateway.pinata.cloud/ipfs/<CID>` или через выделенный шлюз, указанный в разделе «Gateways» (Шлюзы) на боковой панели Pinata. Например, вы можете найти изображение, которое мы использовали в IPFS, [здесь](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5).

Теперь мы захотим загрузить еще один документ в Pinata. Но прежде чем мы это сделаем, нам нужно его создать!

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

Не стесняйтесь изменять данные в JSON. Вы можете удалять или добавлять элементы в раздел атрибутов. Самое главное, убедитесь, что поле изображения указывает на расположение вашего изображения в IPFS в формате `ipfs://<image-CID>` — иначе ваш NFT будет включать фотографию (очень милой!) собаки.

Закончив редактирование JSON-файла, сохраните его и загрузите в Pinata, следуя тем же шагам, что и при загрузке изображения. Также скопируйте CID файла `nft-metadata.json`; он понадобится нам на шаге 9.

## Шаг 5. Создайте экземпляр вашего контракта {#instance-contract}

Теперь, чтобы взаимодействовать с нашим контрактом, нам нужно создать его экземпляр в нашем коде. Для этого нам понадобится адрес нашего контракта, который наш скрипт для развертывания вывел в части 1. Вы также можете найти его на [Etherscan](https://sepolia.etherscan.io/) или [Blockscout](https://eth-sepolia.blockscout.com/), выполнив поиск по адресу, который вы использовали для развертывания контракта.

![Просмотр адреса вашего контракта на Etherscan](./view-contract-etherscan.png)

В приведенном выше примере адрес нашего контракта — 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Далее мы будем использовать метод `getContractAt` плагина Hardhat Ethers для создания нашего контракта, используя его имя (которое указывает, какой ABI использовать) и его адрес. В файл `mint-nft.js` добавьте следующее, заменив адрес на свой:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)
```

## Шаг 6. Проверьте файл `.env` {#update-env}

Каждая транзакция, которую мы отправляем, должна быть подписана приватным ключом вашего аккаунта. Если вы завершили часть 1 руководства, наш файл `.env` уже должен выглядеть так:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Нет необходимости добавлять ваш публичный адрес: ethers вычисляет его из приватного ключа.

## Шаг 7. Создайте вашу транзакцию {#create-txn}

Сначала давайте определим функцию с именем `mintNFT(tokenURI)` и создадим нашу транзакцию, выполнив следующее:

1. Получите аккаунт, с которого мы отправляем транзакцию. `ethers.getSigners()` возвращает аккаунты, настроенные для сети, что в Sepolia является аккаунтом, чей приватный ключ находится в `.env`. Поскольку `mintNFT` имеет модификатор `onlyOwner`, это должен быть тот же аккаунт, который развернул контракт.

1. Вызовите функцию `mintNFT` на экземпляре нашего контракта, указав наш собственный адрес в качестве получателя и URI метаданных. Это вычисление, которое мы хотим выполнить в этой транзакции — в данном случае это чеканка NFT.

Вам не нужно самостоятельно вычислять нонс (количество транзакций, отправленных с вашего адреса, что предотвращает атаки повторного воспроизведения), лимит газа или комиссии: ethers извлекает или оценивает их перед отправкой транзакции.

Теперь ваш файл `mint-nft.js` должен выглядеть так:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  // Отправьте транзакцию. ethers заполняет nonce, лимит газа и комиссии за нас.
  const tx = await nftContract.mintNFT(signer.address, tokenURI)
}
```

## Шаг 8. Подпишите транзакцию {#sign-txn}

Поскольку сеть настроена с нашим приватным ключом, ethers автоматически подписывает им транзакцию перед ее отправкой.

Вызов `mintNFT` возвращает результат после отправки транзакции и предоставляет нам хеш транзакции, который мы можем использовать, чтобы убедиться, что наша транзакция была добыта и не была отброшена сетью. Затем `tx.wait()` ожидает, пока транзакция не будет включена в блок. Мы также добавили некоторую проверку ошибок, чтобы знать, успешно ли прошла наша транзакция.

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // Отправьте транзакцию. ethers заполняет nonce, лимит газа и комиссии за нас.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // Дождитесь включения транзакции в блок
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}
```

## Шаг 9. Вызовите `mintNFT` и запустите `mint-nft.js` {#call-mintnft-fn}

Помните файл `nft-metadata.json`, который вы загрузили в Pinata? Получите его CID из Pinata и передайте `ipfs://<metadata-CID>` в качестве параметра функции `mintNFT`. Кошельки и маркетплейсы разрешают URI `ipfs://` через выбранный ими шлюз IPFS, поэтому ваш NFT не зависит от какого-либо одного шлюза.

> Дважды проверьте, что скопированный вами CID ссылается на ваш **nft-metadata.json**, загрузив `https://gateway.pinata.cloud/ipfs/<metadata-CID>` в отдельном окне. Страница должна выглядеть примерно так, как на скриншоте ниже:

![Ваша страница должна отображать метаданные json](./metadataJSON.png)_Ваша страница должна отображать метаданные json_

В целом ваш код должен выглядеть примерно так:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // Отправьте транзакцию. ethers заполняет nonce, лимит газа и комиссии за нас.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // Дождитесь включения транзакции в блок
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}

await mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Теперь запустите скрипт в сети Sepolia, чтобы отчеканить ваш NFT:

```sh
npx hardhat run scripts/mint-nft.js --network sepolia
```

Через несколько секунд вы должны увидеть в терминале ответ, подобный этому:

```text
The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
Your NFT was minted in block <block number>
```

Чтобы просмотреть детали вашей транзакции, найдите ее хеш на [Etherscan](https://sepolia.etherscan.io/) или [Blockscout](https://eth-sepolia.blockscout.com/).

![Просмотр хеша транзакции вашего NFT на Etherscan](./view-nft-etherscan.png)_Просмотр хеша транзакции вашего NFT на Etherscan_

И это все! Теперь вы развернули И отчеканили NFT в блокчейне Эфириум <Emoji text=":money_mouth_face:" size={1} />

Используя `mint-nft.js`, вы можете чеканить столько NFT, сколько пожелает ваша душа (и кошелек)! Просто не забудьте передать новый tokenURI, описывающий метаданные NFT (иначе вы просто создадите кучу одинаковых NFT с разными ID).

Вероятно, вы хотели бы иметь возможность похвастаться своим NFT в кошельке — поэтому обязательно ознакомьтесь с [Частью 3: Как просмотреть свой NFT в кошельке](/developers/tutorials/how-to-view-nft-in-metamask/)!
