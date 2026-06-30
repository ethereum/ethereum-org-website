---
title: "Посібник зі створення карбувальника NFT"
description: "У цьому посібнику ви створите карбувальник NFT і дізнаєтеся, як створити повностековий децентралізований застосунок (dapp), підключивши свій смарт-контракт до фронтенду на React за допомогою МетаМаск та інструментів Web3."
author: "smudgil"
tags: ["Solidity", "NFT", "Alchemy", "смарт-контракти", "фронтенд", "Pinata", "erc-721"]
skill: intermediate
breadcrumb: "Децентралізований застосунок (dapp) для карбування NFT"
lang: uk
published: 2021-10-06
---

Одним із найбільших викликів для розробників, які приходять із середовища Веб2, є розуміння того, як підключити свій смарт-контракт до фронтенд-проєкту та взаємодіяти з ним.

Створюючи карбувальник NFT — простий інтерфейс користувача, де ви можете ввести посилання на свій цифровий актив, назву та опис — ви дізнаєтеся, як:

- Підключатися до МетаМаск через ваш фронтенд-проєкт
- Викликати методи смарт-контракту з вашого фронтенду
- Підписувати транзакції за допомогою МетаМаск

У цьому посібнику ми будемо використовувати [React](https://react.dev/) як наш фронтенд-фреймворк. Оскільки цей посібник зосереджений переважно на розробці Web3, ми не будемо витрачати багато часу на розбір основ React. Натомість ми зосередимося на додаванні функціональності до нашого проєкту.

Як передумова, ви повинні мати розуміння React на рівні початківця — знати, як працюють компоненти, пропси (props), useState/useEffect та базовий виклик функцій. Якщо ви ніколи раніше не чули жодного з цих термінів, можливо, вам варто переглянути цей [посібник зі вступу до React](https://react.dev/learn/tutorial-tic-tac-toe). Для тих, хто краще сприймає візуальну інформацію, ми наполегливо рекомендуємо цю чудову серію відео [Full Modern React Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) від Net Ninja.

І якщо ви ще цього не зробили, вам обов'язково знадобиться акаунт Alchemy, щоб завершити цей посібник, а також створювати будь-що на блокчейні. Зареєструйте безкоштовний акаунт [тут](https://alchemy.com/).

Без зайвих слів, почнемо!

## Основи створення NFT {#making-nfts-101}

Перш ніж ми почнемо розглядати будь-який код, важливо зрозуміти, як працює створення NFT. Воно складається з двох кроків:

### Розгортання смарт-контракту NFT у блокчейні Етеріум {#publish-nft}

Найбільша різниця між двома стандартами смарт-контрактів NFT полягає в тому, що ERC-1155 є багатотокенним стандартом і включає функціональність пакетної обробки, тоді як ERC-721 є однотокенним стандартом і тому підтримує передачу лише одного токена за раз.

### Виклик функції карбування

Зазвичай ця функція карбування вимагає передачі двох змінних як параметрів: по-перше, `recipient`, яка вказує адресу, що отримає ваш щойно викарбуваний NFT, і по-друге, `tokenURI` NFT — рядок, який вказує на JSON-документ, що описує метадані NFT.

Метадані NFT — це те, що дійсно оживляє його, дозволяючи йому мати властивості, такі як назва, опис, зображення (або інший цифровий актив) та інші атрибути. Ось [приклад tokenURI](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2), який містить метадані NFT.

У цьому посібнику ми зосередимося на другій частині — виклику функції карбування смарт-контракту NFT за допомогою нашого інтерфейсу користувача на React.

Вам знадобиться смарт-контракт NFT стандарту ERC-721, розгорнутий у підтримуваній тестовій мережі, такій як Sepolia. Якщо ви хочете розгорнути його самостійно, ми рекомендуємо посібник Alchemy з [розгортання смарт-контракту в Sepolia](https://www.alchemy.com/docs/how-to-deploy-a-smart-contract-to-the-sepolia-testnet).

Чудово, тепер, коли ми розуміємо, як працює створення NFT, давайте клонуємо наші початкові файли!
## Клонування початкових файлів {#clone-the-starter-files}

Спочатку перейдіть до [репозиторію nft-minter-tutorial на GitHub](https://github.com/alchemyplatform/nft-minter-tutorial), щоб отримати початкові файли для цього проєкту. Клонуйте цей репозиторій у своє локальне середовище.

Коли ви відкриєте цей клонований репозиторій `nft-minter-tutorial`, ви помітите, що він містить дві папки: `minter-starter-files` та `nft-minter`.

- `minter-starter-files` містить початкові файли (по суті, інтерфейс користувача на React) для цього проєкту. У цьому посібнику **ми будемо працювати в цьому каталозі**, оскільки ви дізнаєтеся, як оживити цей інтерфейс, підключивши його до вашого гаманця Етеріум та смарт-контракту NFT.
- `nft-minter` містить повністю завершений посібник і слугує для вас **довідником**, **якщо ви застрягнете.**

Далі відкрийте вашу копію `minter-starter-files` у редакторі коду, а потім перейдіть до папки `src`.

Увесь код, який ми напишемо, буде знаходитися в папці `src`. Ми будемо редагувати компонент `Minter.js` та писати додаткові файли JavaScript, щоб надати нашому проєкту функціональність Web3.

## Крок 2: Огляд наших початкових файлів {#step-2-check-out-our-starter-files}

Перш ніж ми почнемо писати код, важливо перевірити, що вже надано нам у початкових файлах.

### Запуск вашого проєкту на React {#get-your-react-project-running}

Почнемо із запуску проєкту на React у нашому браузері. Краса React полягає в тому, що як тільки наш проєкт запущено в браузері, будь-які збережені нами зміни будуть оновлюватися в браузері в реальному часі.

Щоб запустити проєкт, перейдіть до кореневого каталогу папки `minter-starter-files` і виконайте `npm install` у вашому терміналі, щоб встановити залежності проєкту:

```bash
cd minter-starter-files
npm install
```

Після завершення їх встановлення виконайте `npm start` у вашому терміналі:

```bash
npm start
```

Це має відкрити http://localhost:3000/ у вашому браузері, де ви побачите фронтенд нашого проєкту. Він має складатися з 3 полів: місця для введення посилання на актив вашого NFT, введення назви вашого NFT та надання опису.

Якщо ви спробуєте натиснути кнопки «Connect Wallet» або «Mint NFT», ви помітите, що вони не працюють — це тому, що нам ще потрібно запрограмувати їхню функціональність! :\)

### Компонент Minter.js {#minter-js}

**ПРИМІТКА:** Переконайтеся, що ви знаходитесь у папці `minter-starter-files`, а не в папці `nft-minter`!

Повернімося до папки `src` у нашому редакторі та відкриємо файл `Minter.js`. Надзвичайно важливо, щоб ми розуміли все в цьому файлі, оскільки це основний компонент React, над яким ми будемо працювати.

У верхній частині цього файлу ми маємо наші змінні стану, які ми будемо оновлювати після певних подій.

```javascript
//Змінні стану
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

Ніколи не чули про змінні стану React або хуки стану? Перегляньте [цю](https://legacy.reactjs.org/docs/hooks-state.html) документацію.

Ось що представляє кожна зі змінних:

- `walletAddress` — рядок, який зберігає адресу гаманця користувача
- `status` — рядок, який містить повідомлення для відображення внизу інтерфейсу користувача
- `name` — рядок, який зберігає назву NFT
- `description` — рядок, який зберігає опис NFT
- `url` — рядок, який є посиланням на цифровий актив NFT

Після змінних стану ви побачите три нереалізовані функції: `useEffect`, `connectWalletPressed` та `onMintPressed`. Ви помітите, що всі ці функції є `async`, це тому, що ми будемо робити в них асинхронні виклики API! Їхні назви відповідають їхній функціональності:

```javascript
useEffect(async () => {
  //TODO: реалізувати
}, [])

const connectWalletPressed = async () => {
  //TODO: реалізувати
}

const onMintPressed = async () => {
  //TODO: реалізувати
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) — це хук React, який викликається після рендерингу вашого компонента. Оскільки в нього передається порожній масив `[]` (див. рядок 3), він буде викликаний лише під час _першого_ рендерингу компонента. Тут ми викличемо наш слухач гаманця та іншу функцію гаманця, щоб оновити наш інтерфейс користувача та відобразити, чи вже підключено гаманець.
- `connectWalletPressed` — ця функція буде викликана для підключення гаманця МетаМаск користувача до нашого децентралізованого застосунку (dapp).
- `onMintPressed` — ця функція буде викликана для карбування NFT користувача.

Ближче до кінця цього файлу ми маємо інтерфейс користувача нашого компонента. Якщо ви уважно переглянете цей код, то помітите, що ми оновлюємо наші змінні стану `url`, `name` та `description`, коли змінюється введення у відповідних текстових полях.

Ви також побачите, що `connectWalletPressed` та `onMintPressed` викликаються при натисканні кнопок з ідентифікаторами `mintButton` та `walletButton` відповідно.

```javascript
//UI нашого компонента
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
    <p>
      Simply add your asset's link, name, and description, then press "Mint."
    </p>
    <form>
      <h2>🖼 Link to asset: </h2>
      <input
        type="text"
        placeholder="e.g., https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Name: </h2>
      <input
        type="text"
        placeholder="e.g., My first NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Description: </h2>
      <input
        type="text"
        placeholder="e.g., Even cooler than cryptokitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      Mint NFT
    </button>
    <p id="status">{status}</p>
 
</div>
)
```

Нарешті, давайте розберемося, куди додається цей компонент Minter.

Якщо ви перейдете до файлу `App.js`, який є основним компонентом у React і діє як контейнер для всіх інших компонентів, ви побачите, що наш компонент Minter впроваджується в рядку 7.

**У цьому посібнику ми будемо редагувати лише `Minter.js file` та додавати файли в нашу папку `src`.**

Тепер, коли ми розуміємо, з чим працюємо, давайте налаштуємо наш гаманець Етеріум!

## Налаштування вашого гаманця Етеріум {#set-up-your-ethereum-wallet}

Щоб користувачі могли взаємодіяти з вашим смарт-контрактом, їм потрібно буде підключити свій гаманець Етеріум до вашого децентралізованого застосунку (dapp).

### Завантаження МетаМаск

Для цього посібника ми будемо використовувати МетаМаск — віртуальний гаманець у браузері, який використовується для керування адресою вашого акаунта Етеріум. Якщо ви хочете дізнатися більше про те, як працюють транзакції в Етеріум, перегляньте [цю сторінку](/developers/docs/transactions/).

Ви можете безкоштовно завантажити та створити акаунт МетаМаск [тут](https://metamask.io/download). Коли ви створюєте акаунт, або якщо він у вас уже є, обов'язково перейдіть на підтримувану тестову мережу, таку як Sepolia \(щоб ми не мали справи з реальними грошима\).
### Додавання етеру з крана

Щоб карбувати наші NFT (або підписувати будь-які транзакції в блокчейні Етеріум), нам знадобиться трохи тестового ETH. Щоб отримати ETH тестової мережі, скористайтеся підтримуваним краном, таким як [кран Alchemy Sepolia](https://www.alchemy.com/faucets/ethereum-sepolia), і введіть адресу свого акаунта Sepolia. Незабаром після цього ви побачите ETH у своєму акаунті МетаМаск!
### Перевірка вашого балансу

Щоб ще раз переконатися, що наш баланс на місці, давайте зробимо запит [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) за допомогою [інструменту пісочниці Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Це поверне кількість ETH у нашому гаманці. Після того, як ви введете адресу свого акаунта МетаМаск і натиснете «Send Request», ви повинні побачити таку відповідь:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**ПРИМІТКА:** Цей результат вказано у Wei, а не в ETH. Wei використовується як найменша одиниця етеру. Конвертація з Wei в ETH виглядає так: 1 ETH = 10¹⁸ Wei. Отже, якщо ми переведемо 0xde0b6b3a7640000 у десяткову систему, ми отримаємо 1\*10¹⁸, що дорівнює 1 ETH.

Хух! Усі наші несправжні гроші на місці! <Emoji text=":money_mouth_face:" size={1} />
## Підключення МетаМаск до вашого інтерфейсу користувача {#connect-metamask-to-your-ui}

Тепер, коли наш гаманець МетаМаск налаштовано, давайте підключимо до нього наш децентралізований застосунок (dapp)!

Оскільки ми хочемо дотримуватися парадигми [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), ми створимо окремий файл, який міститиме наші функції для керування логікою, даними та правилами нашого децентралізованого застосунку (dapp), а потім передамо ці функції нашому фронтенду (нашому компоненту Minter.js).

### Функція `connectWallet` {#connect-wallet-function}

Для цього давайте створимо нову папку з назвою `utils` у вашому каталозі `src` і додамо в неї файл з назвою `interact.js`, який міститиме всі наші функції взаємодії з гаманцем та смарт-контрактом.

У нашому файлі `interact.js` ми напишемо функцію `connectWallet`, яку потім імпортуємо та викличемо в нашому компоненті `Minter.js`.

У ваш файл `interact.js` додайте наступне:

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Давайте розберемо, що робить цей код:

По-перше, наша функція перевіряє, чи увімкнено `window.ethereum` у вашому браузері.

`window.ethereum` — це глобальний API, який впроваджується МетаМаск та іншими провайдерами гаманців, що дозволяє вебсайтам запитувати акаунти Етеріум користувачів. У разі схвалення він може читати дані з блокчейнів, до яких підключений користувач, і пропонувати користувачеві підписувати повідомлення та транзакції. Перегляньте [документацію МетаМаск](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) для отримання додаткової інформації!

Якщо `window.ethereum` _не_ присутній, це означає, що МетаМаск не встановлено. Це призводить до повернення JSON-об'єкта, де повернута `address` є порожнім рядком, а JSX-об'єкт `status` повідомляє, що користувач повинен встановити МетаМаск.

**Більшість функцій, які ми напишемо, будуть повертати JSON-об'єкти, які ми можемо використовувати для оновлення наших змінних стану та інтерфейсу користувача.**

Тепер, якщо `window.ethereum` _присутній_, тоді починається найцікавіше.

Використовуючи блок try/catch, ми спробуємо підключитися до МетаМаск, викликавши [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Виклик цієї функції відкриє МетаМаск у браузері, після чого користувачеві буде запропоновано підключити свій гаманець до вашого децентралізованого застосунку (dapp).

- Якщо користувач вирішить підключитися, `method: "eth_requestAccounts"` поверне масив, який містить усі адреси акаунтів користувача, підключені до децентралізованого застосунку (dapp). Загалом, наша функція `connectWallet` поверне JSON-об'єкт, який містить _першу_ `address` у цьому масиві \(див. рядок 9\) та повідомлення `status`, яке пропонує користувачеві написати повідомлення до смарт-контракту.
- Якщо користувач відхиляє підключення, тоді JSON-об'єкт міститиме порожній рядок для повернутої `address` та повідомлення `status`, яке відображає, що користувач відхилив підключення.

### Додавання функції connectWallet до вашого компонента інтерфейсу Minter.js {#add-connect-wallet}

Тепер, коли ми написали цю функцію `connectWallet`, давайте підключимо її до нашого компонента `Minter.js.`.

Спочатку нам доведеться імпортувати нашу функцію у наш файл `Minter.js`, додавши `import { connectWallet } from "./utils/interact.js";` у верхній частині файлу `Minter.js`. Ваші перші 11 рядків `Minter.js` тепер повинні виглядати так:

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  //Змінні стану
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
```

Потім, всередині нашої функції `connectWalletPressed`, ми викличемо нашу імпортовану функцію `connectWallet` ось так:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Зверніть увагу, як більшість нашої функціональності абстраговано від нашого компонента `Minter.js` у файл `interact.js`? Це зроблено для того, щоб ми дотримувалися парадигми M-V-C!

У `connectWalletPressed` ми просто робимо виклик await до нашої імпортованої функції `connectWallet`, і використовуючи її відповідь, ми оновлюємо наші змінні `status` та `walletAddress` через їхні хуки стану.

Тепер давайте збережемо обидва файли `Minter.js` та `interact.js` і протестуємо наш інтерфейс користувача на даному етапі.

Відкрийте свій браузер на localhost:3000 і натисніть кнопку «Connect Wallet» у верхньому правому куті сторінки.

Якщо у вас встановлено МетаМаск, вам буде запропоновано підключити свій гаманець до вашого децентралізованого застосунку (dapp). Прийміть запрошення на підключення.

Ви повинні побачити, що кнопка гаманця тепер відображає, що вашу адресу підключено.

Далі спробуйте оновити сторінку... це дивно. Наша кнопка гаманця пропонує нам підключити МетаМаск, хоча він уже підключений...

Але не хвилюйтеся! Ми легко можемо це виправити, реалізувавши функцію під назвою `getCurrentWalletConnected`, яка перевірятиме, чи адреса вже підключена до нашого децентралізованого застосунку (dapp), і відповідно оновлюватиме наш інтерфейс користувача!

### Функція getCurrentWalletConnected {#get-current-wallet}

У ваш файл `interact.js` додайте наступну функцію `getCurrentWalletConnected`:

```javascript
export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Цей код _дуже_ схожий на функцію `connectWallet`, яку ми щойно написали раніше.

Головна відмінність полягає в тому, що замість виклику методу `eth_requestAccounts`, який відкриває МетаМаск для підключення гаманця користувачем, тут ми викликаємо метод `eth_accounts`, який просто повертає масив, що містить адреси МетаМаск, наразі підключені до нашого децентралізованого застосунку (dapp).

Щоб побачити цю функцію в дії, давайте викличемо її у функції `useEffect` нашого компонента `Minter.js`.

Як ми робили для `connectWallet`, ми повинні імпортувати цю функцію з нашого файлу `interact.js` у наш файл `Minter.js` ось так:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //імпортувати тут
} from "./utils/interact.js"
```

Тепер ми просто викликаємо її в нашій функції `useEffect`:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Зверніть увагу, ми використовуємо відповідь нашого виклику `getCurrentWalletConnected` для оновлення наших змінних стану `walletAddress` та `status`.

Після того, як ви додали цей код, спробуйте оновити вікно нашого браузера. Кнопка повинна повідомляти, що ви підключені, і показувати попередній перегляд адреси вашого підключеного гаманця — навіть після оновлення!

### Реалізація addWalletListener {#implement-add-wallet-listener}

Останнім кроком у налаштуванні гаманця нашого децентралізованого застосунку (dapp) є реалізація слухача гаманця, щоб наш інтерфейс користувача оновлювався, коли змінюється стан нашого гаманця, наприклад, коли користувач відключається або змінює акаунти.

У ваш файл `Minter.js` додайте функцію `addWalletListener`, яка виглядає наступним чином:

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

Давайте швидко розберемо, що тут відбувається:

- По-перше, наша функція перевіряє, чи увімкнено `window.ethereum` \(тобто чи встановлено МетаМаск\).
  - Якщо ні, ми просто встановлюємо нашу змінну стану `status` у рядок JSX, який пропонує користувачеві встановити МетаМаск.
  - Якщо він увімкнений, ми налаштовуємо слухач `window.ethereum.on("accountsChanged")` у рядку 3, який відстежує зміни стану в гаманці МетаМаск, що включають підключення користувачем додаткового акаунта до децентралізованого застосунку (dapp), зміну акаунтів або відключення акаунта. Якщо підключено принаймні один акаунт, змінна стану `walletAddress` оновлюється як перший акаунт у масиві `accounts`, повернутому слухачем. В іншому випадку `walletAddress` встановлюється як порожній рядок.

Нарешті, ми повинні викликати її в нашій функції `useEffect`:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

І вуаля! Ми завершили програмування всієї функціональності нашого гаманця! Тепер, коли наш гаманець налаштовано, давайте з'ясуємо, як викарбувати наш NFT!

## Основи метаданих NFT {#nft-metadata-101}

Отже, пам'ятаєте метадані NFT, про які ми щойно говорили на Кроці 0 цього посібника — вони оживляють NFT, дозволяючи йому мати властивості, такі як цифровий актив, назва, опис та інші атрибути.

Нам потрібно буде налаштувати ці метадані як JSON-об'єкт і зберегти їх, щоб ми могли передати їх як параметр `tokenURI` під час виклику функції `mintNFT` нашого смарт-контракту.

Текст у полях «Link to Asset», «Name», «Description» складатиме різні властивості метаданих нашого NFT. Ми відформатуємо ці метадані як JSON-об'єкт, але є кілька варіантів, де ми можемо зберегти цей JSON-об'єкт:

- Ми могли б зберегти його в блокчейні Етеріум; однак це було б дуже дорого.
- Ми могли б зберегти його на централізованому сервері, наприклад AWS або Firebase. Але це суперечило б нашому духу децентралізації.
- Ми могли б використовувати IPFS — децентралізований протокол та однорангову мережу для зберігання та обміну даними в розподіленій файловій системі. Оскільки цей протокол є децентралізованим і безкоштовним, це наш найкращий варіант!

Щоб зберегти наші метадані в IPFS, ми будемо використовувати [Pinata](https://pinata.cloud/) — зручний API та набір інструментів для IPFS. На наступному кроці ми пояснимо, як саме це зробити!

## Використання Pinata для закріплення ваших метаданих в IPFS {#use-pinata-to-pin-your-metadata-to-ipfs}

Якщо у вас немає акаунта [Pinata](https://pinata.cloud/), зареєструйте безкоштовний акаунт [тут](https://app.pinata.cloud/auth/signup) і виконайте кроки для підтвердження вашої електронної пошти та акаунта.

### Створення вашого ключа API Pinata {#create-pinata-api-key}

Перейдіть на сторінку [https://pinata.cloud/keys](https://pinata.cloud/keys), потім натисніть кнопку «New Key» угорі, увімкніть віджет Admin і назвіть свій ключ.

Після цього з'явиться спливаюче вікно з інформацією про ваш API. Обов'язково збережіть її в надійному місці.

Тепер, коли наш ключ налаштовано, давайте додамо його до нашого проєкту, щоб ми могли його використовувати.

### Створення файлу .env {#create-a-env}

Ми можемо безпечно зберігати наш ключ і секрет Pinata у файлі середовища. Давайте встановимо [пакет dotenv](https://www.npmjs.com/package/dotenv) у каталозі вашого проєкту.

Відкрийте нову вкладку у вашому терміналі \(окремо від тієї, де запущено локальний хост\) і переконайтеся, що ви знаходитесь у папці `minter-starter-files`, а потім виконайте наступну команду у вашому терміналі:

```text
npm install dotenv --save
```

Далі створіть файл `.env` у кореневому каталозі вашої папки `minter-starter-files`, ввівши наступне в командному рядку:

```javascript
vim.env
```

Це відкриє ваш файл `.env` у vim \(текстовому редакторі\). Щоб зберегти його, натисніть «esc» + «:» + «q» на клавіатурі в такому порядку.

Далі у VSCode перейдіть до вашого файлу `.env` і додайте до нього ваш ключ API Pinata та секрет API, ось так:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

Збережіть файл, і тоді ви будете готові почати писати функцію для завантаження ваших метаданих JSON в IPFS!

### Реалізація pinJSONToIPFS {#pin-json-to-ipfs}

На наше щастя, Pinata має [API спеціально для завантаження даних JSON в IPFS](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) та зручний приклад на JavaScript з axios, який ми можемо використати з деякими незначними змінами.

У вашій папці `utils` давайте створимо ще один файл з назвою `pinata.js`, а потім імпортуємо наш секрет і ключ Pinata з файлу .env ось так:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

Далі вставте додатковий код, наведений нижче, у ваш файл `pinata.js`. Не хвилюйтеся, ми розберемо, що все це означає!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //виконання POST-запиту axios до Pinata ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      }
    })
    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }
    })
}
```

Отже, що саме робить цей код?

По-перше, він імпортує [axios](https://www.npmjs.com/package/axios) — HTTP-клієнт на основі промісів (promises) для браузера та Node.js, який ми будемо використовувати для виконання запиту до Pinata.

Потім ми маємо нашу асинхронну функцію `pinJSONToIPFS`, яка приймає `JSONBody` як вхідні дані та ключ API і секрет Pinata у своєму заголовку, щоб зробити POST-запит до їхнього API `pinJSONToIPFS`.

- Якщо цей POST-запит успішний, тоді наша функція повертає JSON-об'єкт із логічним значенням `success` як true та `pinataUrl`, де були закріплені наші метадані. Ми будемо використовувати цей повернутий `pinataUrl` як вхідний параметр `tokenURI` для функції карбування нашого смарт-контракту.
- Якщо цей POST-запит не вдається, тоді наша функція повертає JSON-об'єкт із логічним значенням `success` як false та рядком `message`, який передає нашу помилку.

Як і з типами повернення нашої функції `connectWallet`, ми повертаємо JSON-об'єкти, щоб ми могли використовувати їхні параметри для оновлення наших змінних стану та інтерфейсу користувача.

## Завантаження вашого смарт-контракту {#load-your-smart-contract}

Тепер, коли ми маємо спосіб завантажити наші метадані NFT в IPFS за допомогою нашої функції `pinJSONToIPFS`, нам знадобиться спосіб завантажити екземпляр нашого смарт-контракту, щоб ми могли викликати його функцію `mintNFT`.

Як ми згадували раніше, у цьому посібнику ми будемо використовувати [цей існуючий смарт-контракт NFT](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE); однак, якщо ви хочете дізнатися, як ми його створили, або створити його самостійно, ми наполегливо рекомендуємо вам переглянути наш інший посібник [«Як створити NFT»](https://www.alchemy.com/docs/how-to-create-an-nft).

### ABI контракту {#contract-abi}

Якщо ви уважно вивчили наші файли, ви помітили, що в нашому каталозі `src` є файл `contract-abi.json`. ABI необхідний для вказівки того, яку функцію викличе контракт, а також для забезпечення того, що функція поверне дані у форматі, який ви очікуєте.

Нам також знадобиться ключ API Alchemy та API Alchemy Web3 для підключення до блокчейну Етеріум і завантаження нашого смарт-контракту.

### Створення вашого ключа API Alchemy

Якщо у вас ще немає акаунта Alchemy, [зареєструйтеся безкоштовно тут.](https://alchemy.com/?a=eth-org-nft-minter)

Після створення акаунта Alchemy ви можете згенерувати ключ API, створивши застосунок. Це дозволить нам робити запити до тестової мережі Sepolia.

Перейдіть на сторінку «Create App» у вашій панелі керування Alchemy, навівши курсор на «Apps» на навігаційній панелі та натиснувши «Create App».

Назвіть свій застосунок (ми вибрали «My First NFT!»), додайте короткий опис, виберіть «Staging» для середовища (Environment), що використовується для обліку вашого застосунку, і виберіть «Sepolia» для вашої мережі (Network).

Натисніть «Create app», і все готово! Ваш застосунок має з'явитися в таблиці нижче.

Чудово, тепер, коли ми створили наш HTTP URL для API Alchemy, скопіюйте його в буфер обміну...

…а потім додамо його до нашого файлу `.env`. Загалом ваш файл .env має виглядати так:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-sepolia.g.alchemy.com/v2/<alchemy-key>
```

Тепер, коли ми маємо ABI нашого контракту та ключ API Alchemy, ми готові завантажити наш смарт-контракт за допомогою [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).
### Налаштування вашої кінцевої точки Alchemy Web3 та контракту {#setup-alchemy-endpoint}

По-перше, якщо ви цього ще не зробили, вам потрібно буде встановити [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), перейшовши до домашнього каталогу: `nft-minter-tutorial` у терміналі:

```text
cd ..
npm install @alch/alchemy-web3
```

Далі повернімося до нашого файлу `interact.js`. У верхній частині файлу додайте наступний код, щоб імпортувати ваш ключ Alchemy з файлу .env і налаштувати кінцеву точку Alchemy Web3:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) — це обгортка навколо [Web3.js](https://docs.web3js.org/), яка надає розширені методи API та інші важливі переваги, щоб полегшити ваше життя як розробника Web3. Вона розроблена так, щоб вимагати мінімальної конфігурації, тому ви можете почати використовувати її у своєму застосунку відразу!

Далі давайте додамо наш ABI контракту та адресу контракту до нашого файлу.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

Як тільки ми матимемо і те, і інше, ми готові почати писати код нашої функції карбування!

## Реалізація функції mintNFT {#implement-the-mintnft-function}

У вашому файлі `interact.js` давайте визначимо нашу функцію `mintNFT`, яка, як випливає з назви, буде карбувати наш NFT.

Оскільки ми будемо робити численні асинхронні виклики \(до Pinata для закріплення наших метаданих в IPFS, до Alchemy Web3 для завантаження нашого смарт-контракту та до МетаМаск для підпису наших транзакцій\), наша функція також буде асинхронною.

Трьома вхідними параметрами нашої функції будуть `url` нашого цифрового активу, `name` та `description`. Додайте наступну сигнатуру функції під функцією `connectWallet`:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### Обробка помилок введення {#input-error-handling}

Природно, має сенс мати певну обробку помилок введення на початку функції, щоб ми вийшли з цієї функції, якщо наші вхідні параметри неправильні. Всередині нашої функції давайте додамо наступний код:

```javascript
export const mintNFT = async (url, name, description) => {
  //обробка помилок
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }
}
```

По суті, якщо будь-який із вхідних параметрів є порожнім рядком, тоді ми повертаємо JSON-об'єкт, де логічне значення `success` є false, а рядок `status` повідомляє, що всі поля в нашому інтерфейсі користувача мають бути заповнені.

### Завантаження метаданих в IPFS {#upload-metadata-to-ipfs}

Як тільки ми знаємо, що наші метадані відформатовані належним чином, наступним кроком є обгортання їх у JSON-об'єкт і завантаження в IPFS за допомогою написаної нами функції `pinJSONToIPFS`!

Для цього нам спочатку потрібно імпортувати функцію `pinJSONToIPFS` у наш файл `interact.js`. На самому початку `interact.js` давайте додамо:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

Нагадаємо, що `pinJSONToIPFS` приймає тіло JSON. Тому, перш ніж ми зробимо виклик до неї, нам потрібно буде відформатувати наші параметри `url`, `name` та `description` у JSON-об'єкт.

Давайте оновимо наш код, щоб створити JSON-об'єкт під назвою `metadata`, а потім зробимо виклик до `pinJSONToIPFS` з цим параметром `metadata`:

```javascript
export const mintNFT = async (url, name, description) => {
  //обробка помилок
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //створити метадані
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //виконати виклик до Pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

Зверніть увагу, ми зберігаємо відповідь нашого виклику `pinJSONToIPFS(metadata)` в об'єкті `pinataResponse`. Потім ми аналізуємо цей об'єкт на наявність будь-яких помилок.

Якщо є помилка, ми повертаємо JSON-об'єкт, де логічне значення `success` є false, а наш рядок `status` повідомляє, що наш виклик не вдався. В іншому випадку ми витягуємо `pinataURL` з `pinataResponse` і зберігаємо його як нашу змінну `tokenURI`.

Тепер настав час завантажити наш смарт-контракт за допомогою API Alchemy Web3, який ми ініціалізували у верхній частині нашого файлу. Додайте наступний рядок коду внизу функції `mintNFT`, щоб встановити контракт у глобальну змінну `window.contract`:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

Останнє, що потрібно додати в нашу функцію `mintNFT`, — це наша транзакція Етеріум:

```javascript
//налаштуйте вашу транзакцію в Етеріум
const transactionParameters = {
  to: contractAddress, // Обов'язково, за винятком публікацій контракту.
  from: window.ethereum.selectedAddress, // має збігатися з активною адресою користувача.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //виконати виклик до смарт-контракту NFT
}

//підписати транзакцію через МетаМаск
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Something went wrong: " + error.message,
  }
}
```

Якщо ви вже знайомі з транзакціями Етеріум, ви помітите, що структура досить схожа на те, що ви бачили.

- По-перше, ми налаштовуємо параметри нашої транзакції.
  - `to` вказує адресу одержувача \(наш смарт-контракт\)
  - `from` вказує підписанта транзакції \(підключена адреса користувача до МетаМаск: `window.ethereum.selectedAddress`\)
  - `data` містить виклик методу `mintNFT` нашого смарт-контракту, який отримує наш `tokenURI` та адресу гаманця користувача, `window.ethereum.selectedAddress`, як вхідні дані
- Потім ми робимо виклик await, `window.ethereum.request,`, де ми просимо МетаМаск підписати транзакцію. Зверніть увагу, у цьому запиті ми вказуємо наш метод eth \(eth_SentTransaction\) і передаємо наші `transactionParameters`. На цьому етапі МетаМаск відкриється в браузері та запропонує користувачеві підписати або відхилити транзакцію.
  - Якщо транзакція успішна, функція поверне JSON-об'єкт, де логічне значення `success` встановлено як true, а рядок `status` пропонує користувачеві перевірити Etherscan для отримання додаткової інформації про свою транзакцію.
  - Якщо транзакція не вдається, функція поверне JSON-об'єкт, де логічне значення `success` встановлено як false, а рядок `status` передає повідомлення про помилку.

Загалом наша функція `mintNFT` має виглядати так:

```javascript
export const mintNFT = async (url, name, description) => {
  //обробка помилок
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //створити метадані
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //запит на закріплення в Pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //завантажити смарт-контракт
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //налаштуйте вашу транзакцію в Етеріум
  const transactionParameters = {
    to: contractAddress, // Обов'язково, за винятком публікацій контракту.
    from: window.ethereum.selectedAddress, // має збігатися з активною адресою користувача.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //виконати виклик до смарт-контракту NFT
  }

  //підписати транзакцію через МетаМаск
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
}
```

Це одна гігантська функція! Тепер нам просто потрібно підключити нашу функцію `mintNFT` до нашого компонента `Minter.js`...

## Підключення mintNFT до нашого фронтенду Minter.js {#connect-our-frontend}

Відкрийте ваш файл `Minter.js` і оновіть рядок `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` угорі, щоб він виглядав так:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

Нарешті, реалізуйте функцію `onMintPressed`, щоб зробити виклик await до вашої імпортованої функції `mintNFT` та оновити змінну стану `status`, щоб відобразити, чи була наша транзакція успішною, чи ні:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## Розгортання вашого NFT на діючому вебсайті

Готові запустити свій проєкт, щоб користувачі могли з ним взаємодіяти? Ознайомтеся з [документацією щодо розгортання React](https://create-react-app.dev/docs/deployment/) для розгортання вашого карбувальника на діючому вебсайті.

Останній крок...
## Підкоріть світ блокчейну {#take-the-blockchain-world-by-storm}

Жартую, ви дійшли до кінця посібника!

Підсумовуючи, створивши карбувальник NFT, ви успішно дізналися, як:

- Підключатися до МетаМаск через ваш фронтенд-проєкт
- Викликати методи смарт-контракту з вашого фронтенду
- Підписувати транзакції за допомогою МетаМаск

Ймовірно, ви хотіли б мати можливість похизуватися NFT, викарбуваними через ваш децентралізований застосунок (dapp), у своєму гаманці — тому обов'язково перегляньте наш короткий посібник [«Як переглянути свій NFT у своєму гаманці»](/developers/tutorials/how-to-view-nft-in-metamask/)!

І, як завжди, якщо у вас є будь-які запитання, ми готові допомогти в [Discord Alchemy](https://discord.gg/gWuC7zB). Ми з нетерпінням чекаємо, щоб побачити, як ви застосуєте концепції з цього посібника у своїх майбутніх проєктах!
