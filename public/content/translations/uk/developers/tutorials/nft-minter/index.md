---
title: "Посібник із карбування NFT"
description: "У цьому посібнику ви створите інструмент для карбування NFT та навчитеся створювати повноцінний dapp, підключивши свій смарт-контракт до фронтенду на React за допомогою MetaMask та інструментів Web3."
author: "smudgil"
tags:
  [
    "мова програмування",
    "NFT",
    "alchemy",
    "Смарт-контракти",
    "використання",
    "Pinata"
  ]
skill: intermediate
breadcrumb: "Dapp NFT minter"
lang: uk
published: 2021-10-06
---

Однією з найбільших проблем для розробників, які працюють із Web2, є можливість підключення вашого смарт-контракту до фронтенду проєкту та взаємодія з ним.

Створюючи інструмент для карбування NFT — простий інтерфейс користувача, де ви можете ввести посилання на свій цифровий актив, назву та опис, — ви навчитеся:

- Підключатися до MetaMask через ваш фронтенд-проєкт
- Викликати методи смарт-контракту з вашого фронтенду
- Підписувати транзакції за допомогою MetaMask

У цьому посібнику ми будемо використовувати [React](https://react.dev/) як наш фронтенд-фреймворк. Оскільки цей посібник в основному зосереджений на розробці Web3, ми не будемо витрачати багато часу на розбір основ React. Натомість ми зосередимося на додаванні функціональності до нашого проєкту.

Як попередня умова, ви повинні мати базове розуміння React — знати, як працюють компоненти, пропси, useState/useEffect та виклик базових функцій. Якщо ви ніколи раніше не чули про ці терміни, можливо, ви захочете ознайомитися з цим [посібником «Вступ до React»](https://react.dev/learn/tutorial-tic-tac-toe). Для тих, хто краще сприймає інформацію візуально, ми наполегливо рекомендуємо цю чудову серію відео [«Повний сучасний посібник з React»](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) від Net Ninja.

І якщо ви ще цього не зробили, вам обов'язково знадобиться обліковий запис Alchemy, щоб завершити цей посібник, а також створювати що-небудь на блокчейні. Зареєструйте безкоштовний обліковий запис [тут](https://alchemy.com/).

Без зайвих слів, розпочнімо!

## Створення NFT 101 {#making-nfts-101}

Перш ніж ми почнемо розглядати будь-який код, важливо зрозуміти, як працює створення NFT. Це включає два кроки:

### Опублікуйте смарт-контракт NFT у блокчейні Ethereum {#publish-nft}

Найбільша відмінність між двома стандартами смарт-контрактів NFT полягає в тому, що ERC-1155 є стандартом з кількома токенами та включає пакетну функціональність, тоді як ERC-721 є стандартом з одним маркером і тому підтримує передачу лише одного токена за раз.

### Викличте функцію карбування {#minting-function}

Зазвичай ця функція карбування вимагає передачі двох змінних як параметрів: по-перше, `recipient` (одержувач), який вказує адресу, що отримає ваш щойно викарбуваний NFT, і, по-друге, `tokenURI` NFT — рядок, який вказує на JSON-документ, що описує метадані NFT.

Метадані NFT — це те, що по-справжньому вдихає в нього життя, дозволяючи йому мати такі властивості, як назва, опис, зображення (або інший цифровий актив) та інші атрибути. Ось [приклад tokenURI](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2), який містить метадані NFT.

У цьому посібнику ми зосередимося на частині 2: виклику функції карбування існуючого смарт-контракту NFT за допомогою нашого інтерфейсу користувача на React.

[Ось посилання](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) на смарт-контракт NFT ERC-721, який ми будемо викликати в цьому посібнику. Якщо ви хочете дізнатися, як ми його створили, ми наполегливо рекомендуємо вам ознайомитися з іншим нашим посібником [«Як створити NFT»](https://www.alchemy.com/docs/how-to-create-an-nft).

Чудово, тепер, коли ми розуміємо, як працює створення NFT, давайте клонуємо наші стартові файли!

## Клонуйте стартові файли {#clone-the-starter-files}

Спочатку перейдіть до [репозиторію nft-minter-tutorial на GitHub](https://github.com/alchemyplatform/nft-minter-tutorial), щоб отримати стартові файли для цього проєкту. Клонуйте цей репозиторій у своє локальне середовище.

Коли ви відкриєте цей клонований репозиторій `nft-minter-tutorial`, ви помітите, що він містить дві папки: `minter-starter-files` та `nft-minter`.

- `minter-starter-files` містить стартові файли (по суті, інтерфейс користувача на React) для цього проєкту. У цьому посібнику **ми будемо працювати в цьому каталозі**, вивчаючи, як оживити цей інтерфейс користувача, підключивши його до вашого гаманця Ethereum та смарт-контракту NFT.
- `nft-minter` містить повний завершений посібник і слугує для вас **довідковим матеріалом**, **якщо ви зіткнетеся з труднощами.**

Далі відкрийте свою копію `minter-starter-files` у вашому редакторі коду, а потім перейдіть до папки `src`.

Весь код, який ми будемо писати, буде знаходитися в папці `src`. Ми будемо редагувати компонент `Minter.js` і писати додаткові файли javascript, щоб надати нашому проєкту функціональність Web3.

## Крок 2: Ознайомтеся з нашими стартовими файлами {#step-2-check-out-our-starter-files}

Перш ніж ми почнемо кодувати, важливо перевірити, що вже надано нам у стартових файлах.

### Запустіть ваш проєкт на React {#get-your-react-project-running}

Давайте почнемо із запуску проєкту на React у нашому браузері. Перевага React полягає в тому, що коли наш проєкт запущений у браузері, будь-які збережені зміни будуть оновлюватися в браузері в реальному часі.

Щоб запустити проєкт, перейдіть до кореневого каталогу папки `minter-starter-files` і запустіть `npm install` у вашому терміналі, щоб встановити залежності проєкту:

```bash
cd minter-starter-files
npm install
```

Після завершення інсталяції запустіть `npm start` у вашому терміналі:

```bash
npm start
```

Це має відкрити http://localhost:3000/ у вашому браузері, де ви побачите фронтенд нашого проєкту. Він повинен складатися з 3 полів: місце для введення посилання на актив вашого NFT, введення назви вашого NFT та надання опису.

Якщо ви спробуєте натиснути кнопки «Підключити гаманець» або «Викарбувати NFT», ви помітите, що вони не працюють — це тому, що нам ще потрібно запрограмувати їхню функціональність! :\)

### Компонент Minter.js {#minter-js}

**ПРИМІТКА:** Переконайтеся, що ви перебуваєте в папці `minter-starter-files`, а не в папці `nft-minter`!

Давайте повернемося до папки `src` у нашому редакторі та відкриємо файл `Minter.js`. Дуже важливо, щоб ми розуміли все в цьому файлі, оскільки це основний компонент React, над яким ми будемо працювати.

У верхній частині цього файлу ми маємо змінні стану, які ми будемо оновлювати після певних подій.

```javascript
//Змінні стану
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

Ніколи не чули про змінні стану React або хуки стану? Ознайомтеся з [цією](https://legacy.reactjs.org/docs/hooks-state.html) документацією.

Ось що представляє кожна зі змінних:

- `walletAddress` — рядок, у якому зберігається адреса гаманця користувача
- `status` — рядок, що містить повідомлення для відображення в нижній частині інтерфейсу користувача
- `name` — рядок, у якому зберігається назва NFT
- `description` — рядок, у якому зберігається опис NFT
- `url` — рядок, що є посиланням на цифровий актив NFT

Після змінних стану ви побачите три нереалізовані функції: `useEffect`, `connectWalletPressed` та `onMintPressed`. Ви помітите, що всі ці функції є `async`, це тому, що ми будемо робити в них асинхронні виклики API! Їхні назви відповідають їхнім функціональним можливостям:

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

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) — це хук React, який викликається після візуалізації вашого компонента. Оскільки йому передається пропс у вигляді порожнього масиву `[]` (див. рядок 3), він буде викликаний лише під час _першої_ візуалізації компонента. Тут ми викличемо наш прослуховувач гаманця та іншу функцію гаманця, щоб оновити наш інтерфейс користувача та відобразити, чи гаманець уже підключено.
- `connectWalletPressed` — ця функція буде викликана для підключення гаманця MetaMask користувача до нашого dapp.
- `onMintPressed` — ця функція буде викликана для карбування NFT користувача.

Ближче до кінця цього файлу ми маємо інтерфейс користувача нашого компонента. Якщо ви уважно переглянете цей код, ви помітите, що ми оновлюємо наші змінні стану `url`, `name` та `description`, коли змінюється введення у відповідних текстових полях.

Ви також побачите, що `connectWalletPressed` та `onMintPressed` викликаються при натисканні кнопок з ідентифікаторами `mintButton` та `walletButton` відповідно.

```javascript
//інтерфейс нашого компонента
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Підключено: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Підключити гаманець</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Інструмент карбування NFT від Alchemy</h1>
    <p>
      Просто додайте посилання на ваш актив, назву та опис, а потім натисніть «Викарбувати».
    </p>
    <form>
      <h2>🖼 Посилання на актив: </h2>
      <input
        type="text"
        placeholder="напр., https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Назва: </h2>
      <input
        type="text"
        placeholder="напр., Мій перший NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Опис: </h2>
      <input
        type="text"
        placeholder="напр., Навіть крутіше, ніж cryptokitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      Викарбувати NFT
    </button>
    <p id="status">{status}</p>
</div>
)
```

Нарешті, давайте розглянемо, де додається цей компонент Minter.

Якщо ви перейдете до файлу `App.js`, який є основним компонентом у React, що діє як контейнер для всіх інших компонентів, ви побачите, що наш компонент Minter вставлено в рядку 7.

**У цьому посібнику ми будемо редагувати лише файл `Minter.js` та додавати файли до нашої папки `src`.**

Тепер, коли ми розуміємо, з чим працюємо, давайте налаштуємо наш гаманець Ethereum!

## Налаштуйте свій гаманець Ethereum {#set-up-your-ethereum-wallet}

Щоб користувачі могли взаємодіяти з вашим смарт-контрактом, їм потрібно буде підключити свій гаманець Ethereum до вашого dapp.

### Завантажте MetaMask {#download-metamask}

Для цього уроку ми будемо використовувати MetaMask, віртуальний гаманець в браузері, який використовується для керування адресою облікового запису Ethereum. Якщо ви хочете дізнатися більше про те, як працюють транзакції в Ethereum, перегляньте [цю сторінку](/developers/docs/transactions/).

Ви можете завантажити та створити обліковий запис MetaMask безкоштовно [тут](https://metamask.io/download). Під час створення облікового запису, або якщо у вас вже є обліковий запис, не забудьте переключитися на «Тестову мережу Ropsten» у верхньому правому куті (щоб ми не мали справу з реальними грошима).

### Додайте ефір із крана (Faucet) {#add-ether-from-faucet}

Щоб карбувати наші NFT (або підписувати будь-які транзакції в блокчейні Ethereum), нам знадобиться трохи тестового Eth. Щоб отримати Eth, ви можете перейти до [крана Ropsten](https://faucet.ropsten.be/), ввести адресу свого облікового запису Ropsten, а потім натиснути «Надіслати Ropsten Eth». Незабаром ви маєте побачити Eth у своєму обліковому записі MetaMask!

### Перевірте свій баланс {#check-your-balance}

Щоб перевірити наявність балансу, давайте зробимо запит [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) за допомогою [інструмента-композитора від Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Це поверне кількість Eth у нашому гаманці. Після введення вашої адреси облікового запису MetaMask і натисніть кнопку "Відправити запит", ви повинні побачити таку відповідь:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**ПРИМІТКА:** Цей результат у wei, а не в eth. Wei використовується в якості найменшого номіналу ether. Перетворення з wei в eth: 1 eth = 10¹⁸ wei. Отже, якщо ми перетворимо 0xde0b6b3a7640000 у десяткове число, ми отримаємо 1\*10¹⁸, що дорівнює 1 eth.

Фух! Наші підроблені гроші усі там! <Emoji text=":money_mouth_face:" size={1} />

## Підключіть MetaMask до свого інтерфейсу користувача {#connect-metamask-to-your-UI}

Тепер, коли наш гаманець MetaMask налаштовано, давайте підключимо до нього наш dapp!

Оскільки ми хочемо дотримуватися парадигми [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), ми створимо окремий файл, який міститиме наші функції для керування логікою, даними та правилами нашого dapp, а потім передамо ці функції нашому фронтенду (компоненту Minter.js).

### Функція `connectWallet` {#connect-wallet-function}

Для цього давайте створимо нову папку під назвою `utils` у вашому каталозі `src` і додамо до неї файл `interact.js`, який міститиме всі наші функції взаємодії з гаманцем та смарт-контрактом.

У нашому файлі `interact.js` ми напишемо функцію `connectWallet`, яку потім імпортуємо та викличемо в нашому компоненті `Minter.js`.

У вашому файлі `interact.js` додайте наступне

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Напишіть повідомлення в текстовому полі вище.",
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
              Ви повинні встановити MetaMask, віртуальний гаманець Ethereum, у вашому браузері.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Давайте розберемо, що робить цей код:

По-перше, наша функція перевіряє, чи ввімкнено `window.ethereum` у вашому браузері.

`window.ethereum` — це глобальний API, що впроваджується MetaMask та іншими постачальниками гаманців, який дозволяє веб-сайтам запитувати облікові записи Ethereum користувачів. Якщо схвалено, він може читати дані з блокчейнів, до яких підключений користувач, і пропонувати користувачеві підписувати повідомлення та транзакції. Для отримання додаткової інформації перегляньте [документацію MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents)!

Якщо `window.ethereum` _не_ присутній, це означає, що MetaMask не встановлено. Це призводить до повернення об'єкта JSON, де повернута `address` є порожнім рядком, а об'єкт JSX `status` повідомляє, що користувач повинен встановити MetaMask.

**Більшість функцій, які ми пишемо, повертатимуть об'єкти JSON, які ми можемо використовувати для оновлення наших змінних стану та інтерфейсу користувача.**

Тепер, якщо `window.ethereum` _присутній_, ось тут і починається найцікавіше.

Використовуючи цикл try/catch, ми спробуємо підключитися до MetaMask, викликавши [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Виклик цієї функції відкриє MetaMask у браузері, де користувачеві буде запропоновано підключити свій гаманець до вашого dapp.

- Якщо користувач вирішить підключитися, `method: "eth_requestAccounts"` поверне масив, що містить усі адреси облікових записів користувача, підключені до dapp. Загалом, наша функція `connectWallet` поверне об'єкт JSON, який містить _першу_ `address` у цьому масиві (див. рядок 9) та повідомлення `status`, яке пропонує користувачеві написати повідомлення для смарт-контракту.
- Якщо користувач відхиляє підключення, то об'єкт JSON міститиме порожній рядок для повернутої `address` та повідомлення `status`, що відображає відхилення підключення користувачем.

### Додайте функцію connectWallet до вашого компонента Minter.js UI {#add-connect-wallet}

Тепер, коли ми написали цю функцію `connectWallet`, давайте підключимо її до нашого компонента `Minter.js`.

Спочатку нам потрібно буде імпортувати нашу функцію у файл `Minter.js`, додавши `import { connectWallet } from "./utils/interact.js";` у верхню частину файлу `Minter.js`. Ваші перші 11 рядків файлу `Minter.js` тепер повинні виглядати так:

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

Потім усередині нашої функції `connectWalletPressed` ми викличемо нашу імпортовану функцію `connectWallet`, ось так:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Зверніть увагу, як більша частина нашої функціональності абстрагована від нашого компонента `Minter.js` у файл `interact.js`? Це для того, щоб ми дотримувалися парадигми M-V-C!

У `connectWalletPressed` ми просто робимо await-виклик нашої імпортованої функції `connectWallet` і, використовуючи її відповідь, оновлюємо наші змінні `status` та `walletAddress` за допомогою їхніх хуків стану.

Тепер збережімо обидва файли, `Minter.js` та `interact.js`, і протестуємо наш інтерфейс користувача.

Відкрийте свій браузер за адресою localhost:3000 і натисніть кнопку «Підключити гаманець» у верхньому правому куті сторінки.

Якщо у вас встановлено MetaMask, вам буде запропоновано підключити свій гаманець до вашого dapp. Прийміть запрошення на підключення.

Ви маєте побачити, що кнопка гаманця тепер відображає, що ваша адреса підключена.

Далі спробуйте оновити сторінку… це дивно. Наша кнопка гаманця пропонує нам підключити MetaMask, хоча він уже підключений…

Але не хвилюйтеся! Ми можемо легко це виправити, реалізувавши функцію під назвою `getCurrentWalletConnected`, яка перевірить, чи адреса вже підключена до нашого dapp, і відповідно оновить наш інтерфейс користувача!

### Функція getCurrentWalletConnected {#get-current-wallet}

У вашому файлі `interact.js` додайте наступну функцію `getCurrentWalletConnected`:

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
          status: "👆🏽 Напишіть повідомлення в текстовому полі вище.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Підключіться до MetaMask за допомогою кнопки у верхньому правому куті.",
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
              Ви повинні встановити MetaMask, віртуальний гаманець Ethereum, у вашому браузері.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Цей код _дуже_ схожий на функцію `connectWallet`, яку ми щойно написали.

Основна відмінність полягає в тому, що замість виклику методу `eth_requestAccounts`, який відкриває MetaMask для підключення гаманця користувача, тут ми викликаємо метод `eth_accounts`, який просто повертає масив, що містить адреси MetaMask, які зараз підключені до нашого dapp.

Щоб побачити цю функцію в дії, давайте викличемо її у функції `useEffect` нашого компонента `Minter.js`.

Як і у випадку з `connectWallet`, ми повинні імпортувати цю функцію з нашого файлу `interact.js` у наш файл `Minter.js` ось так:

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

Зверніть увагу, що ми використовуємо відповідь нашого виклику `getCurrentWalletConnected` для оновлення наших змінних стану `walletAddress` та `status`.

Після додавання цього коду спробуйте оновити вікно браузера. Кнопка має показувати, що ви підключені, і відображати попередній перегляд адреси вашого підключеного гаманця — навіть після оновлення!

### Реалізуйте addWalletListener {#implement-add-wallet-listener}

Останній крок у налаштуванні гаманця нашого dapp — це реалізація прослуховувача гаманця, щоб наш інтерфейс користувача оновлювався при зміні стану нашого гаманця, наприклад, коли користувач відключається або перемикає облікові записи.

У вашому файлі `Minter.js` додайте функцію `addWalletListener`, яка виглядає наступним чином:

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Напишіть повідомлення в текстовому полі вище.")
      } else {
        setWallet("")
        setStatus("🦊 Підключіться до MetaMask за допомогою кнопки у верхньому правому куті.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          Ви повинні встановити MetaMask, віртуальний гаманець Ethereum, у вашому браузері.
        </a>
      </p>
    )
  }
}
```

Давайте швидко розберемо, що тут відбувається:

- По-перше, наша функція перевіряє, чи ввімкнено `window.ethereum` (тобто, чи встановлено MetaMask).
  - Якщо ні, ми просто встановлюємо нашу змінну стану `status` на рядок JSX, який пропонує користувачеві встановити MetaMask.
  - Якщо він увімкнений, ми налаштовуємо прослуховувач `window.ethereum.on("accountsChanged")` у рядку 3, який прослуховує зміни стану в гаманці MetaMask, зокрема, коли користувач підключає додатковий обліковий запис до dapp, перемикає облікові записи або відключає обліковий запис. Якщо підключено хоча б один обліковий запис, змінна стану `walletAddress` оновлюється як перший обліковий запис у масиві `accounts`, що повертається прослуховувачем. В іншому випадку `walletAddress` встановлюється як порожній рядок.

Нарешті, ми повинні викликати її в нашій функції `useEffect`:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

І вуаля! Ми завершили програмування всієї функціональності нашого гаманця! Тепер, коли наш гаманець налаштовано, давайте розберемося, як викарбувати наш NFT!

## Метадані NFT 101 {#nft-metadata-101}

Отже, пам'ятаєте метадані NFT, про які ми говорили в кроці 0 цього посібника? Вони вдихають життя в NFT, дозволяючи йому мати такі властивості, як цифровий актив, назву, опис та інші атрибути.

Нам потрібно буде налаштувати ці метадані як об'єкт JSON і зберегти його, щоб ми могли передати його як параметр `tokenURI` при виклику функції `mintNFT` нашого смарт-контракту.

Текст у полях «Посилання на актив», «Назва», «Опис» складатиме різні властивості метаданих нашого NFT. Ми відформатуємо ці метадані як об'єкт JSON, але є кілька варіантів, де ми можемо зберігати цей об'єкт JSON:

- Ми могли б зберігати його в блокчейні Ethereum, однак це було б дуже дорого.
- Ми могли б зберігати його на централізованому сервері, такому як AWS або Firebase. Але це суперечило б нашому етосу децентралізації.
- Ми могли б використовувати IPFS, децентралізований протокол і однорангову мережу для зберігання та обміну даними в розподіленій файловій системі. Оскільки цей протокол децентралізований і безкоштовний, це наш найкращий варіант!

Для зберігання наших метаданих в IPFS ми будемо використовувати [Pinata](https://pinata.cloud/), зручний API та інструментарій для IPFS. У наступному кроці ми пояснимо, як саме це зробити!

## Використовуйте Pinata, щоб закріпити ваші метадані в IPFS {#use-pinata-to-pin-your-metadata-to-IPFS}

Якщо у вас немає облікового запису [Pinata](https://pinata.cloud/), зареєструйте безкоштовний обліковий запис [тут](https://app.pinata.cloud/auth/signup) і виконайте кроки для підтвердження вашої електронної пошти та облікового запису.

### Створіть свій ключ API Pinata {#create-pinata-api-key}

Перейдіть на сторінку [https://pinata.cloud/keys](https://pinata.cloud/keys), потім виберіть кнопку «New Key» (Новий ключ) вгорі, увімкніть віджет Admin і назвіть свій ключ.

Потім вам буде показано спливаюче вікно з інформацією про ваш API. Обов'язково збережіть це в надійному місці.

Тепер, коли наш ключ налаштовано, давайте додамо його до нашого проєкту, щоб ми могли його використовувати.

### Створіть файл .env {#create-a-env}

Ми можемо безпечно зберігати наш ключ і секрет Pinata у файлі середовища. Давайте встановимо пакет [dotenv](https://www.npmjs.com/package/dotenv) у вашому каталозі проєкту.

Відкрийте нову вкладку у вашому терміналі (окрему від тієї, де запущено localhost) і переконайтеся, що ви перебуваєте в папці `minter-starter-files`, а потім виконайте наступну команду у вашому терміналі:

```text
npm install dotenv --save
```

Далі створіть файл `.env` у кореневому каталозі вашого `minter-starter-files`, ввівши наступне в командному рядку:

```javascript
vim.env
```

Це відкриє ваш файл `.env` у vim (текстовому редакторі). Щоб зберегти його, натисніть «esc» + «:» + «q» на клавіатурі в такому порядку.

Далі у VSCode перейдіть до файлу `.env` і додайте до нього свій ключ API та секрет API Pinata, ось так:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

Збережіть файл, і тоді ви будете готові почати писати функцію для завантаження ваших метаданих JSON в IPFS!

### Реалізуйте pinJSONToIPFS {#pin-json-to-ipfs}

На щастя для нас, Pinata має [API спеціально для завантаження даних JSON в IPFS](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) і зручний приклад на JavaScript з axios, який ми можемо використовувати з деякими незначними змінами.

У вашій папці `utils` давайте створимо ще один файл під назвою `pinata.js`, а потім імпортуємо наш секрет і ключ Pinata з файлу .env ось так:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

Далі вставте додатковий код з нижчеподаного у ваш файл `pinata.js`. Не хвилюйтеся, ми розберемо, що все це означає!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //робимо POST-запит axios до Pinata ⬇️
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

По-перше, він імпортує [axios](https://www.npmjs.com/package/axios), HTTP-клієнт на основі промісів для браузера та node.js, який ми будемо використовувати для виконання запиту до Pinata.

Потім у нас є наша асинхронна функція `pinJSONToIPFS`, яка приймає `JSONBody` як вхідні дані та ключ і секрет API Pinata у своєму заголовку, все це для того, щоб зробити POST-запит до їхнього API `pinJSONToIPFS`.

- Якщо цей POST-запит успішний, то наша функція повертає об'єкт JSON з булевим значенням `success`, встановленим як true, і `pinataUrl`, де були закріплені наші метадані. Ми будемо використовувати цей повернутий `pinataUrl` як вхідні дані `tokenURI` для функції карбування нашого смарт-контракту.
- Якщо цей POST-запит не вдається, то наша функція повертає об'єкт JSON з булевим значенням `success` як false і рядком `message`, що передає нашу помилку.

Як і у випадку з типами повернення функції `connectWallet`, ми повертаємо об'єкти JSON, щоб ми могли використовувати їхні параметри для оновлення наших змінних стану та інтерфейсу користувача.

## Завантажте свій смарт-контракт {#load-your-smart-contract}

Тепер, коли ми маємо спосіб завантажувати наші метадані NFT в IPFS за допомогою нашої функції `pinJSONToIPFS`, нам знадобиться спосіб завантажити екземпляр нашого смарт-контракту, щоб ми могли викликати його функцію `mintNFT`.

Як ми вже згадували раніше, в цьому посібнику ми будемо використовувати [цей існуючий смарт-контракт NFT](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE); однак, якщо ви хочете дізнатися, як ми його створили, або створити свій власний, ми наполегливо рекомендуємо вам ознайомитися з іншим нашим посібником, [«Як створити NFT».](https://www.alchemy.com/docs/how-to-create-an-nft).

### ABI контракту {#contract-abi}

Якщо ви уважно вивчили наші файли, ви помітили, що в нашому каталозі `src` є файл `contract-abi.json`. ABI необхідний для того, щоб вказати, яку функцію викличе контракт, а також для того, щоб функція повертала дані в очікуваному вами форматі.

Нам також знадобиться ключ API Alchemy та API Alchemy Web3 для підключення до блокчейну Ethereum та завантаження нашого смарт-контракту.

### Створіть свій ключ API Alchemy {#create-alchemy-api}

Якщо у вас ще немає облікового запису Alchemy, [зареєструйтеся безкоштовно тут.](https://alchemy.com/?a=eth-org-nft-minter)

Після того, як ви створили обліковий запис у Alchemy, ви можете зробити ключ API, створивши додаток. Це дозволить нам робити запити до тестової мережі Ropsten.

Перейдіть на сторінку «Create App» (Створити додаток) на інформаційній панелі Alchemy, навівши курсор на «Apps» (Додатки) на панелі навігації та натиснувши «Create App» (Створити додаток).

Назвіть свій додаток (ми вибрали «My First NFT!»), надайте короткий опис, виберіть «Staging» (Проміжне середовище) для середовища, яке використовується для обліку вашого додатка, і виберіть «Ropsten» для вашої мережі.

Натисніть "Створити додаток", ось і все! Ваш додаток повинен з'явитися у таблиці нижче.

Чудово, тепер, коли ми створили нашу URL-адресу HTTP Alchemy API, скопіюйте її в буфер обміну...

…а потім додамо його до нашого файлу `.env`. Загалом, ваш файл .env має виглядати так:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

Тепер, коли у нас є ABI нашого контракту та ключ API Alchemy, ми готові завантажити наш смарт-контракт за допомогою [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).

### Налаштуйте кінцеву точку Alchemy Web3 та контракт {#setup-alchemy-endpoint}

По-перше, якщо у вас його ще немає, вам потрібно буде встановити [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), перейшовши до домашнього каталогу: `nft-minter-tutorial` в терміналі:

```text
cd ..
npm install @alch/alchemy-web3
```

Далі повернемося до нашого файлу `interact.js`. У верхній частині файлу додайте наступний код, щоб імпортувати ваш ключ Alchemy з файлу .env та налаштувати вашу кінцеву точку Alchemy Web3:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) — це оболонка для [Web3.js](https://docs.web3js.org/), що надає розширені методи API та інші важливі переваги, щоб полегшити ваше життя як розробника web3. Він розроблений так, щоб вимагати мінімальної конфігурації, щоб ви могли одразу почати використовувати його у своєму додатку!

Далі додамо ABI та адресу нашого контракту до нашого файлу.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

Коли ми маємо обидва, ми готові почати кодувати нашу функцію карбування!

## Реалізуйте функцію mintNFT {#implement-the-mintnft-function}

У вашому файлі `interact.js` давайте визначимо нашу функцію, `mintNFT`, яка, як випливає з назви, буде карбувати наш NFT.

Оскільки ми будемо робити численні асинхронні виклики (до Pinata для закріплення наших метаданих в IPFS, до Alchemy Web3 для завантаження нашого смарт-контракту, і до MetaMask для підписання наших транзакцій), наша функція також буде асинхронною.

Три вхідні дані для нашої функції будуть `url` нашого цифрового активу, `name` та `description`. Додайте наступний підпис функції під функцією `connectWallet`:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### Обробка помилок введення {#input-error-handling}

Звичайно, має сенс мати якусь обробку помилок введення на початку функції, щоб ми виходили з цієї функції, якщо наші вхідні параметри неправильні. Усередині нашої функції додамо наступний код:

```javascript
export const mintNFT = async (url, name, description) => {
  //обробка помилок
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Будь ласка, переконайтеся, що всі поля заповнені перед карбуванням.",
    }
  }
}
```

По суті, якщо будь-який з вхідних параметрів є порожнім рядком, то ми повертаємо об'єкт JSON, де булеве значення `success` є false, а рядок `status` повідомляє, що всі поля в нашому інтерфейсі користувача повинні бути заповнені.

### Завантажте метадані в IPFS {#upload-metadata-to-ipfs}

Коли ми знаємо, що наші метадані відформатовані належним чином, наступним кроком є їхнє загортання в об'єкт JSON і завантаження в IPFS за допомогою написаної нами функції `pinJSONToIPFS`!

Для цього нам спочатку потрібно імпортувати функцію `pinJSONToIPFS` до нашого файлу `interact.js`. У самому верху файлу `interact.js` додамо:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

Нагадаємо, що `pinJSONToIPFS` приймає тіло JSON. Отже, перш ніж викликати її, нам потрібно буде відформатувати наші параметри `url`, `name` та `description` в об'єкт JSON.

Давайте оновимо наш код, щоб створити об'єкт JSON під назвою `metadata`, а потім зробимо виклик `pinJSONToIPFS` з цим параметром `metadata`:

```javascript
export const mintNFT = async (url, name, description) => {
  //обробка помилок
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Будь ласка, переконайтеся, що всі поля заповнені перед карбуванням.",
    }
  }

  //створення метаданих
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //виклик pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Щось пішло не так під час завантаження вашого tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

Зверніть увагу, ми зберігаємо відповідь нашого виклику `pinJSONToIPFS(metadata)` в об'єкті `pinataResponse`. Потім ми аналізуємо цей об'єкт на наявність помилок.

Якщо є помилка, ми повертаємо об'єкт JSON, де булеве значення `success` є false, а наш рядок `status` повідомляє, що наш виклик не вдався. В іншому випадку ми витягуємо `pinataURL` з `pinataResponse` і зберігаємо його як нашу змінну `tokenURI`.

Тепер настав час завантажити наш смарт-контракт за допомогою API Alchemy Web3, який ми ініціалізували у верхній частині нашого файлу. Додайте наступний рядок коду в кінець функції `mintNFT`, щоб встановити контракт у глобальній змінній `window.contract`:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

Останнє, що потрібно додати до нашої функції `mintNFT`, це наша транзакція Ethereum:

```javascript
//налаштуйте свою транзакцію Ethereum
const transactionParameters = {
  to: contractAddress, // Обов'язково, крім випадків публікації контракту.
  from: window.ethereum.selectedAddress, // має збігатися з активною адресою користувача.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //зробити виклик до смарт-контракту NFT
}

//підпишіть транзакцію через MetaMask
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ Перегляньте свою транзакцію на Etherscan: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Щось пішло не так: " + error.message,
  }
}
```

Якщо ви вже знайомі з транзакціями Ethereum, ви помітите, що структура досить схожа на те, що ви бачили.

- Спочатку ми налаштовуємо параметри нашої транзакції.
  - `to` вказує адресу одержувача (наш смарт-контракт)
  - `from` вказує підписувача транзакції (підключену адресу користувача до MetaMask: `window.ethereum.selectedAddress`)
  - `data` містить виклик методу `mintNFT` нашого смарт-контракту, який отримує наш `tokenURI` та адресу гаманця користувача, `window.ethereum.selectedAddress`, як вхідні дані
- Потім ми робимо await-виклик, `window.ethereum.request`, де ми просимо MetaMask підписати транзакцію. Зверніть увагу, що в цьому запиті ми вказуємо наш метод eth (eth_SentTransaction) і передаємо наші `transactionParameters`. На цьому етапі MetaMask відкриється в браузері і запропонує користувачеві підписати або відхилити транзакцію.
  - Якщо транзакція буде успішною, функція поверне об'єкт JSON, де логічне значення `success` встановлено як true, а рядок `status` пропонує користувачеві перевірити Etherscan для отримання додаткової інформації про свою транзакцію.
  - Якщо транзакція не вдається, функція поверне об'єкт JSON, де логічне значення `success` встановлено як false, а рядок `status` передає повідомлення про помилку.

Загалом, наша функція `mintNFT` повинна виглядати так:

```javascript
export const mintNFT = async (url, name, description) => {
  //обробка помилок
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Будь ласка, переконайтеся, що всі поля заповнені перед карбуванням.",
    }
  }

  //створення метаданих
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //запит на закріплення pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Щось пішло не так під час завантаження вашого tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //завантаження смарт-контракту
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //налаштуйте свою транзакцію Ethereum
  const transactionParameters = {
    to: contractAddress, // Обов'язково, крім випадків публікації контракту.
    from: window.ethereum.selectedAddress, // має збігатися з активною адресою користувача.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //зробити виклик до смарт-контракту NFT
  }

  //підписати транзакцію через MetaMask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Перегляньте свою транзакцію на Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Щось пішло не так: " + error.message,
    }
  }
}
```

Це одна гігантська функція! Тепер нам просто потрібно підключити нашу функцію `mintNFT` до нашого компонента `Minter.js`...

## Підключіть mintNFT до нашого фронтенду Minter.js {#connect-our-frontend}

Відкрийте файл `Minter.js` і оновіть рядок `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` у верхній частині, щоб він виглядав так:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

Нарешті, реалізуйте функцію `onMintPressed`, щоб зробити await-виклик до вашої імпортованої функції `mintNFT` та оновити змінну стану `status`, щоб відобразити, чи вдалася наша транзакція, чи ні:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## Розгорніть свій NFT на живому вебсайті {#deploy-your-NFT}

Готові запустити свій проєкт, щоб користувачі могли з ним взаємодіяти? Ознайомтеся з [цим посібником](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) для розгортання вашого інструмента для карбування на живому вебсайті.

Останній крок...

## Підкоріть світ блокчейну {#take-the-blockchain-world-by-storm}

Жартую, ви дійшли до кінця посібника!

Підсумовуючи, створюючи інструмент для карбування NFT, ви успішно навчилися:

- Підключатися до MetaMask через ваш фронтенд-проєкт
- Викликати методи смарт-контракту з вашого фронтенду
- Підписувати транзакції за допомогою MetaMask

Імовірно, ви хотіли б мати можливість показувати NFT, викарбувані через ваш dapp, у своєму гаманці — тож обов'язково ознайомтеся з нашим коротким посібником [Як переглянути свій NFT у своєму гаманці](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet)!

І, як завжди, якщо у вас є які-небудь питання, ми тут, щоб допомогти в [Alchemy Discord](https://discord.gg/gWuC7zB). Ми з нетерпінням чекаємо, щоб побачити, як ви застосуєте концепції з цього посібника у своїх майбутніх проєктах!
