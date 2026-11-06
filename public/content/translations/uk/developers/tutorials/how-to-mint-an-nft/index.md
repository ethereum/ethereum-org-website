---
title: "Як карбувати NFT (Частина 2/3 серії посібників про NFT)"
description: "Цей посібник описує, як карбувати невзаємозамінний токен (NFT) на блокчейні Етеріум за допомогою нашого смарт-контракту, Hardhat та ethers.js."
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

«Карбування невзаємозамінного токена (NFT)» — це процес публікації унікального екземпляра вашого токена ERC-721 у блокчейні. Використовуючи наш смарт-контракт із [Частини 1 цієї серії посібників про NFT](/developers/tutorials/how-to-write-and-deploy-an-nft/), давайте застосуємо наші навички Web3 та викарбуємо NFT. Наприкінці цього посібника ви зможете карбувати стільки NFT, скільки забажає ваша душа (і гаманець)!

Почнімо!

## Крок 1: Перевірте свої налаштування {#install-web3}

Якщо ви дотримувалися першого посібника зі створення смарт-контракту для невзаємозамінного токена (NFT), у вас уже є все необхідне: проєкт Hardhat 3 із [плагіном Ethers](https://hardhat.org/docs/plugins/hardhat-ethers) та [ethers.js](https://docs.ethers.org/v6/) — бібліотекою, яка спрощує створення запитів до блокчейну [Етеріум](/). Ми напишемо наш код для карбування як скрипт Hardhat, тому він повторно використає налаштування мережі Sepolia та значення `API_URL` і `PRIVATE_KEY` з Частини 1 — нічого нового встановлювати не потрібно.

## Крок 2: Створіть файл `mint-nft.js` {#create-mintnftjs}

У каталозі скриптів створіть файл `mint-nft.js` і додайте такі рядки коду:

```js
import { network } from "hardhat"

const { ethers } = await network.create()
```

Як і в нашому скрипті для розгортання, `network.create()` підключається до мережі, яку ви вибираєте за допомогою `--network` під час запуску скрипта, і надає нам об'єкт `ethers` для неї.

## Крок 3: Отримайте ABI вашого контракту {#contract-abi}

ABI (двійковий інтерфейс програми) нашого контракту — це інтерфейс для взаємодії з нашим смарт-контрактом. Ви можете дізнатися більше про [ABI контрактів](/glossary/#abi). Hardhat автоматично генерує ABI для нас під час компіляції контракту та зберігає його у файлі `artifacts/contracts/MyNFT.sol/MyNFT.json`. Плагін Hardhat Ethers зчитує його звідти для нас, коли ми створюємо екземпляр нашого контракту на кроці 5, тому нам не потрібно завантажувати його самостійно.

Якщо ви хочете побачити ABI, ви можете вивести його в консоль. З кореневого каталогу вашого проєкту виконайте:

```sh
node -p "JSON.stringify(require('./artifacts/contracts/MyNFT.sol/MyNFT.json').abi)"
```

## Крок 4: Налаштуйте метадані для вашого NFT за допомогою IPFS {#config-meta}

Якщо ви пам'ятаєте з нашого посібника в Частині 1, функція нашого смарт-контракту `mintNFT` приймає параметр tokenURI, який має вказувати на JSON-документ з описом метаданих невзаємозамінного токена (NFT) — це саме те, що оживляє NFT, дозволяючи йому мати настроювані властивості, такі як ім'я, опис, зображення та інші атрибути.

> _Interplanetary File System (IPFS) — це децентралізований протокол та однорангова мережа для зберігання та обміну даними в розподіленій файловій системі._

Ми будемо використовувати Pinata, зручний інтерфейс прикладного програмування (API) та набір інструментів IPFS, щоб зберігати наш актив NFT та метадані, аби переконатися, що наш NFT є справді децентралізованим. Якщо у вас немає акаунта Pinata, зареєструйте безкоштовний акаунт [тут](https://app.pinata.cloud) і виконайте кроки для підтвердження електронної пошти.

Після створення акаунта:

- Перейдіть на [сторінку Files](https://app.pinata.cloud/ipfs/files) і натисніть кнопку «Add» у верхньому правому куті сторінки.

- Завантажте зображення в Pinata — це буде зображення для вашого NFT. Можете назвати актив як завгодно. Переконайтеся, що ви завантажуєте його в публічний IPFS: файли в [приватному IPFS](https://docs.pinata.cloud/files/private-ipfs) не можуть бути отримані гаманцями та маркетплейсами, які відображають ваш NFT.

- Після завантаження ви побачите файл у списку на сторінці Files разом із його CID (ідентифікатором вмісту). Скопіюйте CID. Ви можете переглянути завантажений файл за адресою: `https://gateway.pinata.cloud/ipfs/<CID>` або через виділений шлюз, указаний у розділі «Gateways» на бічній панелі Pinata. Наприклад, ви можете знайти зображення, яке ми використовували в IPFS, [тут](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5).

Тепер ми хочемо завантажити ще один документ у Pinata. Але перед цим нам потрібно його створити!

У вашому кореневому каталозі створіть новий файл із назвою `nft-metadata.json` і додайте такий JSON-код:

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

Не соромтеся змінювати дані в JSON. Ви можете видаляти або додавати атрибути в розділі attributes. Найголовніше, переконайтеся, що поле image вказує на розташування вашого зображення в IPFS у форматі `ipfs://<image-CID>` — інакше ваш NFT міститиме фотографію (дуже милого!) собаки.

Коли ви закінчите редагувати JSON-файл, збережіть його та завантажте в Pinata, дотримуючись тих самих кроків, що й для завантаження зображення. Також скопіюйте CID файлу `nft-metadata.json`; він знадобиться нам на кроці 9.

## Крок 5: Створіть екземпляр вашого контракту {#instance-contract}

Тепер, щоб взаємодіяти з нашим контрактом, нам потрібно створити його екземпляр у нашому коді. Для цього нам знадобиться адреса нашого контракту, яку наш скрипт для розгортання вивів у Частині 1. Ви також можете знайти її на [Etherscan](https://sepolia.etherscan.io/) або [Blockscout](https://eth-sepolia.blockscout.com/), здійснивши пошук за адресою, яку ви використовували для розгортання контракту.

![Перегляд адреси вашого контракту на Etherscan](./view-contract-etherscan.png)

У наведеному вище прикладі адреса нашого контракту — 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Далі ми використаємо метод `getContractAt` плагіна Hardhat Ethers, щоб створити наш контракт, використовуючи його ім'я (яке вказує, який ABI використовувати) та його адресу. У ваш файл `mint-nft.js` додайте наступне, замінивши адресу на власну:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)
```

## Крок 6: Перевірте файл `.env` {#update-env}

Кожна транзакція, яку ми надсилаємо, має бути підписана приватним ключем вашого акаунта. Якщо ви завершили частину 1 посібника, наш файл `.env` уже має виглядати так:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Немає потреби додавати вашу публічну адресу: ethers визначає її з приватного ключа.

## Крок 7: Створіть вашу транзакцію {#create-txn}

Спочатку давайте визначимо функцію з назвою `mintNFT(tokenURI)` і створимо нашу транзакцію, виконавши такі дії:

1. Отримайте акаунт, з якого ми надсилаємо транзакцію. `ethers.getSigners()` повертає акаунти, налаштовані для мережі, що в Sepolia є акаунтом, чий приватний ключ знаходиться в `.env`. Оскільки `mintNFT` має модифікатор `onlyOwner`, це має бути той самий акаунт, який розгорнув контракт.

1. Викличте функцію `mintNFT` на екземплярі нашого контракту, вказавши власну адресу як одержувача та URI метаданих. Це обчислення, яке ми хочемо виконати в цій транзакції — у цьому випадку це карбування невзаємозамінного токена (NFT).

Вам не потрібно самостійно обчислювати нонс (кількість транзакцій, надісланих з вашої адреси, що запобігає атакам повторного відтворення), ліміт газу або комісії: ethers отримує або оцінює їх перед надсиланням транзакції.

Тепер ваш файл `mint-nft.js` має виглядати так:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  // Надіслати транзакцію. ethers заповнює nonce, ліміт газу та комісії за нас.
  const tx = await nftContract.mintNFT(signer.address, tokenURI)
}
```

## Крок 8: Підпишіть транзакцію {#sign-txn}

Оскільки мережа налаштована з нашим приватним ключем, ethers автоматично підписує ним транзакцію перед її надсиланням.

Виклик `mintNFT` повертає результат після надсилання транзакції та надає нам хеш транзакції, який ми можемо використати, щоб переконатися, що наша транзакція була видобута і не була відхилена мережею. Потім `tx.wait()` чекає, поки транзакція буде включена в блок. Ми також додали перевірку помилок, щоб знати, чи успішно пройшла наша транзакція.

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // Надіслати транзакцію. ethers заповнює nonce, ліміт газу та комісії за нас.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // Зачекати, поки транзакція буде включена в блок
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}
```

## Крок 9: Викличте `mintNFT` та запустіть `mint-nft.js` {#call-mintnft-fn}

Пам'ятаєте файл `nft-metadata.json`, який ви завантажили в Pinata? Отримайте його CID з Pinata та передайте `ipfs://<metadata-CID>` як параметр у функцію `mintNFT`. Гаманці та маркетплейси розв'язують URI `ipfs://` через шлюз IPFS на свій вибір, тому ваш невзаємозамінний токен (NFT) не залежить від жодного окремого шлюзу.

> Ще раз перевірте, чи скопійований вами CID посилається на ваш **nft-metadata.json**, завантаживши `https://gateway.pinata.cloud/ipfs/<metadata-CID>` в окремому вікні. Сторінка має виглядати подібно до знімка екрана нижче:

![Ваша сторінка має відображати метадані json](./metadataJSON.png)_Ваша сторінка має відображати метадані json_

Загалом ваш код має виглядати приблизно так:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // Надіслати транзакцію. ethers заповнює nonce, ліміт газу та комісії за нас.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // Зачекати, поки транзакція буде включена в блок
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}

await mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Тепер запустіть скрипт у мережі Sepolia, щоб викарбувати ваш NFT:

```sh
npx hardhat run scripts/mint-nft.js --network sepolia
```

За кілька секунд ви побачите таку відповідь у своєму терміналі:

```text
The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
Your NFT was minted in block <block number>
```

Щоб побачити деталі вашої транзакції, знайдіть її хеш на [Etherscan](https://sepolia.etherscan.io/) або [Blockscout](https://eth-sepolia.blockscout.com/).

![Перегляд хешу транзакції вашого NFT на Etherscan](./view-nft-etherscan.png)_Перегляд хешу транзакції вашого NFT на Etherscan_

Ось і все! Тепер ви розгорнули ТА викарбували NFT на блокчейні Етеріум <Emoji text=":money_mouth_face:" size={1} />

Використовуючи `mint-nft.js`, ви можете карбувати стільки NFT, скільки забажає ваша душа (і гаманець)! Тільки не забудьте передати новий tokenURI, що описує метадані NFT (інакше ви просто створите купу однакових токенів із різними ідентифікаторами).

Ймовірно, ви хотіли б мати можливість похизуватися своїм NFT у своєму гаманці — тому обов'язково перегляньте [Частину 3: Як переглянути свій NFT у гаманці](/developers/tutorials/how-to-view-nft-in-metamask/)!
