---
title: Початок роботи з розробкою на Етеріумі
description: "Це посібник для початківців щодо початку роботи з розробкою на Етеріумі. Ми проведемо вас від запуску кінцевої точки API до виконання запиту з командного рядка та написання вашого першого скрипта Web3! Досвід розробки на блокчейні не потрібен!"
author: "Елан Гальперн"
tags: ["javascript", "ethers.js", "вузли", "запити", "alchemy"]
skill: beginner
breadcrumb: Початок роботи
lang: uk
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Ethereum and Alchemy logos](./ethereum-alchemy.png)

Це посібник для початківців щодо початку роботи з розробкою на Етеріумі. У цьому посібнику ми будемо використовувати [Alchemy](https://alchemyapi.io/) — провідну платформу для розробників блокчейну, яка обслуговує мільйони користувачів із 70% найкращих блокчейн-застосунків, зокрема Maker, 0x, MyEtherWallet, Dharma та Kyber. Alchemy надасть нам доступ до кінцевої точки API в ланцюзі Етеріуму, щоб ми могли читати та записувати транзакції.

Ми проведемо вас від реєстрації в Alchemy до написання вашого першого скрипта Web3! Досвід розробки на блокчейні не потрібен!

## 1. Зареєструйте безкоштовний акаунт Alchemy {#sign-up-for-a-free-alchemy-account}

Створити акаунт в Alchemy легко, [зареєструйтеся безкоштовно тут](https://auth.alchemy.com/).

## 2. Створіть застосунок Alchemy {#create-an-alchemy-app}

Щоб взаємодіяти з ланцюгом Етеріуму та використовувати продукти Alchemy, вам потрібен ключ API для автентифікації ваших запитів.

Ви можете [створити ключі API на панелі керування](https://dashboard.alchemy.com/). Щоб створити новий ключ, перейдіть до «Create App» (Створити застосунок), як показано нижче:

Окрема подяка [_ShapeShift_](https://shapeshift.com/) _за те, що дозволили нам показати їхню панель керування!_

![Alchemy dashboard](./alchemy-dashboard.png)

Заповніть дані в розділі «Create App», щоб отримати новий ключ. Тут ви також можете побачити застосунки, які ви створили раніше, і ті, що створені вашою командою. Отримайте наявні ключі, натиснувши «View Key» (Переглянути ключ) для будь-якого застосунку.

![Create app with Alchemy screenshot](./create-app.png)

Ви також можете отримати наявні ключі API, навівши курсор на «Apps» (Застосунки) і вибравши один із них. Тут ви можете натиснути «View Key», а також «Edit App» (Редагувати застосунок), щоб додати певні домени до білого списку, переглянути кілька інструментів для розробників та аналітику.

![Gif showing a user how to pull API keys](./pull-api-keys.gif)

## 3. Зробіть запит із командного рядка {#make-a-request-from-the-command-line}

Взаємодійте з блокчейном Етеріуму через Alchemy за допомогою JSON-RPC та curl.

Для ручних запитів ми рекомендуємо взаємодіяти з `JSON-RPC` через запити `POST`. Просто передайте заголовок `Content-Type: application/json` та ваш запит як тіло `POST` з такими полями:

- `jsonrpc`: Версія JSON-RPC — наразі підтримується лише `2.0`.
- `method`: Метод API ETH. [Див. довідник API.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: Список параметрів для передачі в метод.
- `id`: Ідентифікатор вашого запиту. Буде повернутий у відповіді, щоб ви могли відстежувати, якому запиту належить відповідь.

Ось приклад, який ви можете запустити з командного рядка, щоб отримати поточну ціну газу:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**ПРИМІТКА:** Замініть [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) на ваш власний ключ API `https://eth-mainnet.alchemyapi.io/v2/**your-api-key`._

**Результати:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. Налаштуйте свій клієнт Web3 {#set-up-your-web3-client}

**Якщо у вас уже є клієнт,** змініть поточну URL-адресу провайдера вузла на URL-адресу Alchemy з вашим ключем API: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_ПРИМІТКА:_** Наведені нижче скрипти потрібно запускати в **середовищі Node** або **зберегти у файлі**, а не запускати з командного рядка. Якщо у вас ще не встановлено Node або npm, перегляньте цей короткий [посібник із налаштування для Mac](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs).

Існує безліч [бібліотек Web3](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries), які ви можете інтегрувати з Alchemy, однак ми рекомендуємо використовувати [Alchemy Web3](https://docs.alchemy.com/reference/api-overview) — повноцінну заміну для Web3.js, створену та налаштовану для безперебійної роботи з Alchemy. Це надає безліч переваг, таких як автоматичні повторні спроби та надійна підтримка WebSocket.

Щоб встановити AlchemyWeb3.js, **перейдіть до каталогу вашого проєкту** та виконайте:

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

Тепер, щоб перейти до практики з програмуванням Web3, ми напишемо простий скрипт, який виводить номер останнього блоку з головної мережі Ethereum.

**1. Якщо ви ще цього не зробили, у своєму терміналі створіть новий каталог проєкту та перейдіть до нього за допомогою cd:**

```
mkdir web3-example
cd web3-example
```

**2. Встановіть залежність Alchemy Web3 (або будь-яку іншу Web3) у свій проєкт, якщо ви ще цього не зробили:**

```
npm install @alch/alchemy-web3
```

**3. Створіть файл із назвою `index.js` та додайте такий вміст:**

> Зрештою, вам слід замінити `demo` на ваш ключ HTTP API від Alchemy.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

Не знайомі з асинхронністю? Перегляньте цю [статтю на Medium](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c).

**4. Запустіть його у своєму терміналі за допомогою node**

```
node index.js
```

**5. Тепер ви маєте побачити номер останнього блоку у своїй консолі!**

```
The latest block number is 11043912
```

**Ура! Вітаємо! Ви щойно написали свій перший скрипт Web3 за допомогою Alchemy 🎉**

Не знаєте, що робити далі? Спробуйте розгорнути свій перший смарт-контракт і попрактикуватися в програмуванні на Solidity в нашому [посібнику зі смарт-контракту «Hello World»](https://www.alchemy.com/docs/hello-world-smart-contract) або перевірте свої знання панелі керування за допомогою [демонстраційного застосунку панелі керування](https://docs.alchemyapi.io/tutorials/demo-app)!

_[Зареєструйтеся в Alchemy безкоштовно](https://auth.alchemy.com/), перегляньте нашу [документацію](https://www.alchemy.com/docs/) та слідкуйте за останніми новинами у [Twitter](https://twitter.com/AlchemyPlatform)_.