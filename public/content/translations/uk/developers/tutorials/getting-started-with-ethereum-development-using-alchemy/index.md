---
title: "Початок розробки на Ethereum"
description: "Це посібник для початківців із початку розробки Ethereum. Ми проведемо вас від налаштування кінцевої точки API та створення запиту з командного рядка до написання вашого першого скрипту web3! Досвід розробки на блокчейні не є обов'язковим!"
author: "Elan Halpern"
tags:
  [
    "JavaScript",
    "ethers.js",
    "вузли",
    "запити",
    "Alchemy"
  ]
skill: beginner
lang: uk
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Логотипи Ethereum та Alchemy](./ethereum-alchemy.png)

Це посібник для початківців із початку розробки Ethereum. У цьому посібнику ми будемо використовувати [Alchemy](https://alchemyapi.io/), провідну платформу для розробників на блокчейні, яка підтримує мільйони користувачів із 70% провідних блокчейн-додатків, зокрема Maker, 0x, MyEtherWallet, Dharma та Kyber. Alchemy надасть нам доступ до кінцевої точки API в блокчейні Ethereum, щоб ми могли читати й записувати транзакції.

Ми проведемо вас від реєстрації в Alchemy до написання вашого першого скрипту web3! Досвід розробки на блокчейні не є обов'язковим!

## 1. Зареєструйте безкоштовний обліковий запис Alchemy {#sign-up-for-a-free-alchemy-account}

Створити обліковий запис в Alchemy легко, [зареєструйтеся безкоштовно тут](https://auth.alchemy.com/).

## 2. Створіть додаток Alchemy {#create-an-alchemy-app}

Щоб взаємодіяти з блокчейном Ethereum і використовувати продукти Alchemy, вам потрібен ключ API для автентифікації ваших запитів.

Ви можете [створити ключі API на інформаційній панелі](https://dashboard.alchemy.com/). Щоб створити новий ключ, перейдіть до розділу «Створити додаток», як показано нижче:

Особлива подяка [_ShapeShift_](https://shapeshift.com/) _за те, що дозволили нам показати їхню інформаційну панель!_

![Інформаційна панель Alchemy](./alchemy-dashboard.png)

Заповніть дані в розділі «Створити додаток», щоб отримати свій новий ключ. Тут ви також можете побачити додатки, створені вами раніше, і ті, що були створені вашою командою. Отримайте наявні ключі, натиснувши на кнопку «Переглянути ключ» для будь-якого додатка.

![Знімок екрана створення додатка в Alchemy](./create-app.png)

Ви також можете отримати наявні ключі API, навівши курсор на «Додатки» та вибравши один із них. Тут можна «Переглянути ключ», а також «Редагувати додаток», щоб додати певні домени до білого списку, переглянути кілька інструментів для розробників і переглянути аналітику.

![GIF-анімація, що показує, як користувач може отримати ключі API](./pull-api-keys.gif)

## 3. Створення запиту з командного рядка {#make-a-request-from-the-command-line}

Взаємодійте з блокчейном Ethereum через Alchemy за допомогою JSON-RPC і curl.

Для запитів вручну ми рекомендуємо взаємодіяти з `JSON-RPC` через `POST`-запити. Просто передайте заголовок `Content-Type: application/json` і ваш запит як тіло `POST`-запиту з такими полями:

- `jsonrpc`: версія JSON-RPC — наразі підтримується лише `2.0`.
- `method`: метод ETH API. [Див. довідник з API.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: список параметрів для передачі в метод.
- `id`: ідентифікатор вашого запиту. Він буде повернутий у відповіді, щоб ви могли відстежувати, до якого запиту належить відповідь.

Ось приклад, який можна запустити з командного рядка, щоб отримати поточну ціну на газ:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**ПРИМІТКА:** замініть [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) на власний ключ API `https://eth-mainnet.alchemyapi.io/v2/**your-api-key`._

**Результати:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. Налаштуйте свій клієнт Web3 {#set-up-your-web3-client}

**Якщо у вас уже є клієнт,** змініть URL-адресу вашого поточного постачальника вузлів на URL-адресу Alchemy з вашим ключем API: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key\"`

**_ПРИМІТКА:_** Наведені нижче скрипти потрібно запускати в **контексті вузла** або **зберігати у файлі**, а не запускати з командного рядка. Якщо у вас ще не встановлено Node або npm, перегляньте цей короткий [посібник із налаштування для Mac](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs).

Існує безліч [бібліотек Web3](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries), які можна інтегрувати з Alchemy, однак ми рекомендуємо використовувати [Alchemy Web3](https://docs.alchemy.com/reference/api-overview), пряму заміну для web3.js, створену та налаштовану для безперебійної роботи з Alchemy. Це надає численні переваги, як-от автоматичні повторні спроби та надійна підтримка WebSocket.

Щоб установити AlchemyWeb3.js, **перейдіть до каталогу вашого проєкту** та виконайте:

**За допомогою Yarn:**

```
yarn add @alch/alchemy-web3
```

**За допомогою NPM:**

```
npm install @alch/alchemy-web3
```

Щоб взаємодіяти з інфраструктурою вузлів Alchemy, запустіть у NodeJS або додайте це до файлу JavaScript:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. Напишіть свій перший скрипт Web3! {#write-your-first-web3-script}

Тепер, щоб попрактикуватися в програмуванні на web3, ми напишемо простий скрипт, який виводить номер останнього блоку з основної мережі Ethereum.

**1. Якщо ви ще цього не зробили, створіть у своєму терміналі новий каталог проєкту та перейдіть до нього:**

```
mkdir web3-example
cd web3-example
```

**2. Якщо ви ще цього не зробили, установіть залежність Alchemy web3 (або будь-яку іншу web3) у свій проєкт:**

```
npm install @alch/alchemy-web3
```

**3. Створіть файл з іменем `index.js` та додайте до нього такий вміст:**

> Зрештою, ви повинні замінити `demo` своїм ключем Alchemy HTTP API.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("Номер останнього блоку: " + blockNumber)
}
main()
```

Не знайомі з асинхронним програмуванням? Перегляньте цю [статтю на Medium](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c).

**4. Запустіть його у своєму терміналі за допомогою node**

```
node index.js
```

**5. Тепер ви побачите виведений в консолі номер останнього блоку!**

```
Номер останнього блоку: 11043912
```

**Чудово! Вітаємо! Ви щойно написали свій перший скрипт web3 за допомогою Alchemy 🎉**

Не знаєте, що робити далі? Спробуйте розгорнути свій перший смарт-контракт і попрактикуватися в програмуванні на Solidity в нашому [Посібнику зі створення смарт-контракту «Привіт, світе»](https://www.alchemy.com/docs/hello-world-smart-contract) або перевірте свої знання інформаційної панелі за допомогою [Демо-додатка панелі інструментів](https://docs.alchemyapi.io/tutorials/demo-app)!

_[Зареєструйтеся в Alchemy безкоштовно](https://auth.alchemy.com/), перегляньте нашу [документацію](https://www.alchemy.com/docs/) і, щоб дізнаватися останні новини, підписуйтеся на нас у [Twitter](https://twitter.com/AlchemyPlatform)_.
