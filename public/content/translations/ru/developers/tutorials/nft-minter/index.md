---
title: "Руководство по созданию приложения для чеканки NFT"
description: "В этом руководстве вы создадите приложение для чеканки NFT и узнаете, как создать полнофункциональное децентрализованное приложение (dapp), подключив свой смарт-контракт к фронтенду на React с помощью МетаМаск и инструментов Web3."
author: "smudgil"
tags: ["Solidity", "NFT", "Alchemy", "смарт-контракты", "фронтенд", "Pinata", "erc-721"]
skill: intermediate
breadcrumb: "Децентрализованное приложение (dapp) для чеканки NFT"
lang: ru
published: 2021-10-06
---

Одной из самых больших проблем для разработчиков, приходящих из Веб2, является понимание того, как подключить смарт-контракт к фронтенд-проекту и взаимодействовать с ним.

Создав приложение для чеканки NFT — простой пользовательский интерфейс, в котором можно ввести ссылку на ваш цифровой актив, название и описание, — вы узнаете, как:

- Подключаться к МетаМаск через ваш фронтенд-проект
- Вызывать методы смарт-контракта из вашего фронтенда
- Подписывать транзакции с помощью МетаМаск

В этом руководстве мы будем использовать [React](https://react.dev/) в качестве нашего фронтенд-фреймворка. Поскольку это руководство в первую очередь посвящено разработке Web3, мы не будем тратить много времени на разбор основ React. Вместо этого мы сосредоточимся на добавлении функциональности в наш проект.

В качестве предварительного условия вы должны понимать React на начальном уровне: знать, как работают компоненты, пропсы, useState/useEffect и базовый вызов функций. Если вы никогда раньше не слышали ни об одном из этих терминов, возможно, вам стоит ознакомиться с этим [введением в React](https://react.dev/learn/tutorial-tic-tac-toe). Для тех, кто лучше воспринимает визуальную информацию, мы настоятельно рекомендуем отличную серию видеороликов [Full Modern React Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) от Net Ninja.

И если вы еще этого не сделали, вам обязательно понадобится аккаунт Alchemy для прохождения этого руководства, а также для создания чего-либо на блокчейне. Зарегистрируйте бесплатный аккаунт [здесь](https://alchemy.com/).

Без лишних слов, давайте начнем!

## Основы создания NFT {#making-nfts-101}

Прежде чем мы начнем рассматривать какой-либо код, важно понять, как работает создание NFT. Оно включает в себя два шага:

### Публикация смарт-контракта NFT в блокчейне Эфириума {#publish-nft}

Самое большое различие между двумя стандартами смарт-контрактов NFT заключается в том, что ERC-1155 является многотокеновым стандартом и включает функцию пакетной обработки, тогда как ERC-721 является однотокеновым стандартом и, следовательно, поддерживает передачу только одного токена за раз.

### Вызов функции чеканки {#minting-function}

Обычно эта функция чеканки требует передачи двух переменных в качестве параметров: во-первых, `recipient`, который указывает адрес, на который будет получен ваш свежеотчеканенный NFT, и, во-вторых, `tokenURI` NFT — строку, которая разрешается в JSON-документ, описывающий метаданные NFT.

Метаданные NFT — это то, что действительно оживляет его, позволяя ему иметь такие свойства, как имя, описание, изображение (или другой цифровой актив) и другие атрибуты. Вот [пример tokenURI](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2), который содержит метаданные NFT.

В этом руководстве мы сосредоточимся на второй части — вызове функции чеканки существующего смарт-контракта NFT с использованием нашего пользовательского интерфейса на React.

[Вот ссылка](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) на смарт-контракт NFT стандарта ERC-721, который мы будем вызывать в этом руководстве. Если вы хотите узнать, как мы его создали, мы настоятельно рекомендуем вам ознакомиться с нашим другим руководством [«Как создать NFT»](https://www.alchemy.com/docs/how-to-create-an-nft).

Отлично, теперь, когда мы понимаем, как работает создание NFT, давайте клонируем наши стартовые файлы!

## Клонирование стартовых файлов {#clone-the-starter-files}

Сначала перейдите в [репозиторий nft-minter-tutorial на GitHub](https://github.com/alchemyplatform/nft-minter-tutorial), чтобы получить стартовые файлы для этого проекта. Клонируйте этот репозиторий в вашу локальную среду.

Когда вы откроете этот клонированный репозиторий `nft-minter-tutorial`, вы заметите, что он содержит две папки: `minter-starter-files` и `nft-minter`.

- `minter-starter-files` содержит стартовые файлы (по сути, пользовательский интерфейс на React) для этого проекта. В этом руководстве **мы будем работать в этом каталоге**, пока вы будете учиться оживлять этот пользовательский интерфейс, подключая его к вашему кошельку Эфириума и смарт-контракту NFT.
- `nft-minter` содержит полностью завершенное руководство и служит для вас **справочником**, **если вы застрянете.**

Затем откройте вашу копию `minter-starter-files` в редакторе кода и перейдите в папку `src`.

Весь код, который мы напишем, будет находиться в папке `src`. Мы будем редактировать компонент `Minter.js` и писать дополнительные файлы JavaScript, чтобы добавить в наш проект функциональность Web3.

## Шаг 2: Изучение стартовых файлов {#step-2-check-out-our-starter-files}

Прежде чем мы начнем программировать, важно проверить, что уже предоставлено нам в стартовых файлах.

### Запуск проекта на React {#get-your-react-project-running}

Давайте начнем с запуска проекта на React в нашем браузере. Прелесть React в том, что как только наш проект будет запущен в браузере, любые сохраняемые нами изменения будут обновляться в браузере в реальном времени.

Чтобы запустить проект, перейдите в корневой каталог папки `minter-starter-files` и выполните команду `npm install` в терминале, чтобы установить зависимости проекта:

```bash
cd minter-starter-files
npm install
```

После завершения их установки выполните команду `npm start` в терминале:

```bash
npm start
```

После этого в вашем браузере должен открыться адрес http://localhost:3000/, где вы увидите фронтенд нашего проекта. Он должен состоять из 3 полей: места для ввода ссылки на актив вашего NFT, ввода названия вашего NFT и предоставления описания.

Если вы попробуете нажать кнопки «Connect Wallet» (Подключить кошелек) или «Mint NFT» (Отчеканить NFT), вы заметите, что они не работают — это потому, что нам еще нужно запрограммировать их функциональность! :\)

### Компонент Minter.js {#minter-js}

**ПРИМЕЧАНИЕ:** Убедитесь, что вы находитесь в папке `minter-starter-files`, а не в папке `nft-minter`!

Давайте вернемся в папку `src` в нашем редакторе и откроем файл `Minter.js`. Очень важно, чтобы мы понимали все в этом файле, так как это основной компонент React, над которым мы будем работать.

В верхней части этого файла у нас есть переменные состояния, которые мы будем обновлять после определенных событий.

```javascript
//Переменные состояния
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

Никогда не слышали о переменных состояния React или хуках состояния? Ознакомьтесь с [этой](https://legacy.reactjs.org/docs/hooks-state.html) документацией.

Вот что представляет собой каждая из переменных:

- `walletAddress` — строка, в которой хранится адрес кошелька пользователя
- `status` — строка, содержащая сообщение для отображения в нижней части пользовательского интерфейса
- `name` — строка, в которой хранится название NFT
- `description` — строка, в которой хранится описание NFT
- `url` — строка, представляющая собой ссылку на цифровой актив NFT

После переменных состояния вы увидите три нереализованные функции: `useEffect`, `connectWalletPressed` и `onMintPressed`. Вы заметите, что все эти функции являются `async`, потому что мы будем делать в них асинхронные вызовы API! Их названия говорят сами за себя:

```javascript
useEffect(async () => {
  //TODO: реализовать
}, [])

const connectWalletPressed = async () => {
  //TODO: реализовать
}

const onMintPressed = async () => {
  //TODO: реализовать
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) — это хук React, который вызывается после рендеринга вашего компонента. Поскольку в него передан пустой массив `[]` (см. строку 3), он будет вызван только при _первом_ рендеринге компонента. Здесь мы вызовем наш слушатель кошелька и еще одну функцию кошелька, чтобы обновить наш пользовательский интерфейс и отразить, подключен ли уже кошелек.
- `connectWalletPressed` — эта функция будет вызываться для подключения кошелька МетаМаск пользователя к нашему децентрализованному приложению (dapp).
- `onMintPressed` — эта функция будет вызываться для чеканки NFT пользователя.

Ближе к концу этого файла находится пользовательский интерфейс нашего компонента. Если вы внимательно изучите этот код, то заметите, что мы обновляем наши переменные состояния `url`, `name` и `description` при изменении ввода в соответствующих текстовых полях.

Вы также увидите, что `connectWalletPressed` и `onMintPressed` вызываются при нажатии кнопок с идентификаторами `mintButton` и `walletButton` соответственно.

```javascript
//UI нашего компонента
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

Наконец, давайте разберемся, куда добавляется этот компонент Minter.

Если вы перейдете к файлу `App.js`, который является основным компонентом в React и действует как контейнер для всех остальных компонентов, вы увидите, что наш компонент Minter внедряется в строке 7.

**В этом руководстве мы будем редактировать только `Minter.js file` и добавлять файлы в нашу папку `src`.**

Теперь, когда мы понимаем, с чем работаем, давайте настроим наш кошелек Эфириума!

## Настройка кошелька Эфириума {#set-up-your-ethereum-wallet}

Чтобы пользователи могли взаимодействовать с вашим смарт-контрактом, им нужно будет подключить свой кошелек Эфириума к вашему dapp.

### Скачивание МетаМаск {#download-metamask}

В этом руководстве мы будем использовать МетаМаск — виртуальный кошелек в браузере, используемый для управления адресом вашего аккаунта Эфириума. Если вы хотите больше узнать о том, как работают транзакции в Эфириуме, ознакомьтесь с [этой страницей](/developers/docs/transactions/).

Вы можете бесплатно скачать и создать аккаунт МетаМаск [здесь](https://metamask.io/download). При создании аккаунта или если он у вас уже есть, обязательно переключитесь на «Ropsten Test Network» (Тестовая сеть Ропстен) в правом верхнем углу (чтобы мы не имели дела с реальными деньгами).

### Добавление эфира из крана {#add-ether-from-faucet}

Чтобы чеканить наши NFT (или подписывать любые транзакции в блокчейне Эфириума), нам понадобится немного тестового ETH. Чтобы получить ETH, вы можете перейти к [крану Ропстен](https://faucet.ropsten.be/) и ввести адрес вашего аккаунта в сети Ропстен, а затем нажать «Send Ropsten Eth» (Отправить ETH в Ропстен). Вскоре после этого вы должны увидеть ETH в своем аккаунте МетаМаск!

### Проверка баланса {#check-your-balance}

Чтобы дважды проверить наличие баланса, давайте сделаем запрос [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) с помощью [инструмента composer от Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Это вернет количество ETH в нашем кошельке. После того как вы введете адрес своего аккаунта МетаМаск и нажмете «Send Request» (Отправить запрос), вы должны увидеть примерно такой ответ:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**ПРИМЕЧАНИЕ:** Этот результат указан в Wei, а не в ETH. Wei используется как наименьший номинал эфира. Конвертация из Wei в ETH: 1 ETH = 10¹⁸ Wei. Поэтому, если мы переведем 0xde0b6b3a7640000 в десятичную систему, мы получим 1\*10¹⁸, что равно 1 ETH.

Фух! Наши тестовые деньги на месте! <Emoji text=":money_mouth_face:" size={1} />

## Подключение МетаМаск к вашему пользовательскому интерфейсу {#connect-metamask-to-your-ui}

Теперь, когда наш кошелек МетаМаск настроен, давайте подключим к нему наше dapp!

Поскольку мы хотим следовать парадигме [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), мы создадим отдельный файл, содержащий наши функции для управления логикой, данными и правилами нашего dapp, а затем передадим эти функции нашему фронтенду (нашему компоненту Minter.js).

### Функция `connectWallet` {#connect-wallet-function}

Для этого давайте создадим новую папку с названием `utils` в вашем каталоге `src` и добавим в нее файл `interact.js`, который будет содержать все наши функции взаимодействия с кошельком и смарт-контрактом.

В нашем файле `interact.js` мы напишем функцию `connectWallet`, которую затем импортируем и вызовем в нашем компоненте `Minter.js`.

В ваш файл `interact.js` добавьте следующее:

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

Давайте разберем, что делает этот код:

Сначала наша функция проверяет, включен ли `window.ethereum` в вашем браузере.

`window.ethereum` — это глобальный API, внедряемый МетаМаск и другими провайдерами кошельков, который позволяет веб-сайтам запрашивать аккаунты Эфириума пользователей. В случае одобрения он может считывать данные из блокчейнов, к которым подключен пользователь, и предлагать пользователю подписывать сообщения и транзакции. Ознакомьтесь с [документацией МетаМаск](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) для получения дополнительной информации!

Если `window.ethereum` _отсутствует_, это означает, что МетаМаск не установлен. В результате возвращается объект JSON, где возвращаемый `address` является пустой строкой, а объект JSX `status` сообщает, что пользователь должен установить МетаМаск.

**Большинство функций, которые мы напишем, будут возвращать объекты JSON, которые мы сможем использовать для обновления наших переменных состояния и пользовательского интерфейса.**

Теперь, если `window.ethereum` _присутствует_, начинается самое интересное.

Используя блок try/catch, мы попытаемся подключиться к МетаМаск, вызвав [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Вызов этой функции откроет МетаМаск в браузере, после чего пользователю будет предложено подключить свой кошелек к вашему dapp.

- Если пользователь решит подключиться, `method: "eth_requestAccounts"` вернет массив, содержащий все адреса аккаунтов пользователя, подключенных к dapp. В целом, наша функция `connectWallet` вернет объект JSON, который содержит _первый_ `address` в этом массиве (см. строку 9) и сообщение `status`, предлагающее пользователю написать сообщение в смарт-контракт.
- Если пользователь отклонит подключение, то объект JSON будет содержать пустую строку для возвращаемого `address` и сообщение `status`, отражающее, что пользователь отклонил подключение.

### Добавление функции connectWallet в ваш компонент пользовательского интерфейса Minter.js {#add-connect-wallet}

Теперь, когда мы написали эту функцию `connectWallet`, давайте подключим ее к нашему компоненту `Minter.js.`.

Сначала нам нужно будет импортировать нашу функцию в наш файл `Minter.js`, добавив `import { connectWallet } from "./utils/interact.js";` в начало файла `Minter.js`. Ваши первые 11 строк `Minter.js` теперь должны выглядеть так:

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  //Переменные состояния
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
```

Затем внутри нашей функции `connectWalletPressed` мы вызовем нашу импортированную функцию `connectWallet` следующим образом:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Заметили, как большая часть нашей функциональности абстрагирована от нашего компонента `Minter.js` в файл `interact.js`? Это сделано для того, чтобы мы соответствовали парадигме M-V-C!

В `connectWalletPressed` мы просто делаем вызов await к нашей импортированной функции `connectWallet` и, используя ее ответ, обновляем наши переменные `status` и `walletAddress` через их хуки состояния.

Теперь давайте сохраним оба файла `Minter.js` и `interact.js` и протестируем наш пользовательский интерфейс на данный момент.

Откройте браузер по адресу localhost:3000 и нажмите кнопку «Connect Wallet» (Подключить кошелек) в правом верхнем углу страницы.

Если у вас установлен МетаМаск, вам будет предложено подключить ваш кошелек к вашему dapp. Примите приглашение на подключение.

Вы должны увидеть, что кнопка кошелька теперь отражает, что ваш адрес подключен.

Затем попробуйте обновить страницу... это странно. Наша кнопка кошелька предлагает нам подключить МетаМаск, хотя он уже подключен...

Но не волнуйтесь! Мы легко можем это исправить, реализовав функцию под названием `getCurrentWalletConnected`, которая будет проверять, подключен ли уже адрес к нашему dapp, и соответствующим образом обновлять наш пользовательский интерфейс!

### Функция getCurrentWalletConnected {#get-current-wallet}

В ваш файл `interact.js` добавьте следующую функцию `getCurrentWalletConnected`:

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

Этот код _очень_ похож на функцию `connectWallet`, которую мы только что написали ранее.

Главное отличие заключается в том, что вместо вызова метода `eth_requestAccounts`, который открывает МетаМаск для подключения пользователем своего кошелька, здесь мы вызываем метод `eth_accounts`, который просто возвращает массив, содержащий адреса МетаМаск, подключенные в данный момент к нашему dapp.

Чтобы увидеть эту функцию в действии, давайте вызовем ее в функции `useEffect` нашего компонента `Minter.js`.

Как мы делали для `connectWallet`, мы должны импортировать эту функцию из нашего файла `interact.js` в наш файл `Minter.js` следующим образом:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //импорт здесь
} from "./utils/interact.js"
```

Теперь мы просто вызываем ее в нашей функции `useEffect`:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Обратите внимание, мы используем ответ нашего вызова `getCurrentWalletConnected` для обновления наших переменных состояния `walletAddress` и `status`.

После добавления этого кода попробуйте обновить окно браузера. Кнопка должна сообщать, что вы подключены, и показывать предварительный просмотр адреса вашего подключенного кошелька — даже после обновления!

### Реализация addWalletListener {#implement-add-wallet-listener}

Последним шагом в настройке кошелька нашего dapp является реализация слушателя кошелька, чтобы наш пользовательский интерфейс обновлялся при изменении состояния нашего кошелька, например, когда пользователь отключается или переключает аккаунты.

В ваш файл `Minter.js` добавьте функцию `addWalletListener`, которая выглядит следующим образом:

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

Давайте быстро разберем, что здесь происходит:

- Сначала наша функция проверяет, включен ли `window.ethereum` (т. е. установлен ли МетаМаск).
  - Если нет, мы просто устанавливаем нашу переменную состояния `status` в строку JSX, которая предлагает пользователю установить МетаМаск.
  - Если он включен, мы настраиваем слушатель `window.ethereum.on("accountsChanged")` в строке 3, который прослушивает изменения состояния в кошельке МетаМаск, включая случаи, когда пользователь подключает дополнительный аккаунт к dapp, переключает аккаунты или отключает аккаунт. Если подключен хотя бы один аккаунт, переменная состояния `walletAddress` обновляется как первый аккаунт в массиве `accounts`, возвращаемом слушателем. В противном случае `walletAddress` устанавливается как пустая строка.

Наконец, мы должны вызвать ее в нашей функции `useEffect`:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

И вуаля! Мы завершили программирование всей функциональности нашего кошелька! Теперь, когда наш кошелек настроен, давайте разберемся, как отчеканить наш NFT!

## Основы метаданных NFT {#nft-metadata-101}

Итак, помните метаданные NFT, о которых мы только что говорили на шаге 0 этого руководства — они оживляют NFT, позволяя ему иметь такие свойства, как цифровой актив, название, описание и другие атрибуты.

Нам нужно будет настроить эти метаданные как объект JSON и сохранить их, чтобы мы могли передать их в качестве параметра `tokenURI` при вызове функции `mintNFT` нашего смарт-контракта.

Текст в полях «Link to Asset» (Ссылка на актив), «Name» (Название), «Description» (Описание) будет составлять различные свойства метаданных нашего NFT. Мы отформатируем эти метаданные как объект JSON, но есть пара вариантов того, где мы можем хранить этот объект JSON:

- Мы могли бы хранить его в блокчейне Эфириума; однако это было бы очень дорого.
- Мы могли бы хранить его на централизованном сервере, таком как AWS или Firebase. Но это противоречило бы нашему духу децентрализации.
- Мы могли бы использовать IPFS — децентрализованный протокол и одноранговую сеть для хранения и обмена данными в распределенной файловой системе. Поскольку этот протокол децентрализован и бесплатен, это наш лучший вариант!

Для хранения наших метаданных в IPFS мы будем использовать [Pinata](https://pinata.cloud/) — удобный API и набор инструментов для IPFS. На следующем шаге мы объясним, как именно это сделать!

## Использование Pinata для закрепления ваших метаданных в IPFS {#use-pinata-to-pin-your-metadata-to-ipfs}

Если у вас нет аккаунта [Pinata](https://pinata.cloud/), зарегистрируйте бесплатный аккаунт [здесь](https://app.pinata.cloud/auth/signup) и выполните шаги для подтверждения вашей электронной почты и аккаунта.

### Создание вашего ключа API Pinata {#create-pinata-api-key}

Перейдите на страницу [https://pinata.cloud/keys](https://pinata.cloud/keys), затем нажмите кнопку «New Key» (Новый ключ) вверху, включите виджет Admin и назовите свой ключ.

Затем вам будет показано всплывающее окно с информацией о вашем API. Обязательно сохраните ее в надежном месте.

Теперь, когда наш ключ настроен, давайте добавим его в наш проект, чтобы мы могли его использовать.

### Создание файла .env {#create-a-env}

Мы можем безопасно хранить наш ключ и секрет Pinata в файле среды. Давайте установим [пакет dotenv](https://www.npmjs.com/package/dotenv) в каталог вашего проекта.

Откройте новую вкладку в вашем терминале (отдельно от той, где запущен локальный хост) и убедитесь, что вы находитесь в папке `minter-starter-files`, затем выполните следующую команду в вашем терминале:

```text
npm install dotenv --save
```

Затем создайте файл `.env` в корневом каталоге вашей папки `minter-starter-files`, введя следующее в командной строке:

```javascript
vim.env
```

Это откроет ваш файл `.env` в vim (текстовом редакторе). Чтобы сохранить его, нажмите «esc» + «:» + «q» на клавиатуре в указанном порядке.

Затем в VSCode перейдите к вашему файлу `.env` и добавьте в него ваш ключ API Pinata и секрет API следующим образом:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

Сохраните файл, и тогда вы будете готовы начать писать функцию для загрузки ваших метаданных JSON в IPFS!

### Реализация pinJSONToIPFS {#pin-json-to-ipfs}

К счастью для нас, у Pinata есть [API специально для загрузки данных JSON в IPFS](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) и удобный пример на JavaScript с axios, который мы можем использовать с небольшими изменениями.

В вашей папке `utils` давайте создадим еще один файл с названием `pinata.js`, а затем импортируем наш секрет и ключ Pinata из файла .env следующим образом:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

Затем вставьте дополнительный код, приведенный ниже, в ваш файл `pinata.js`. Не волнуйтесь, мы разберем, что все это значит!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //выполнение POST-запроса axios к Pinata ⬇️
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

Итак, что именно делает этот код?

Сначала он импортирует [axios](https://www.npmjs.com/package/axios) — HTTP-клиент на основе промисов для браузера и Node.js, который мы будем использовать для выполнения запроса к Pinata.

Затем у нас есть наша асинхронная функция `pinJSONToIPFS`, которая принимает `JSONBody` в качестве входных данных, а также ключ API и секрет Pinata в своем заголовке, чтобы сделать POST-запрос к их API `pinJSONToIPFS`.

- Если этот POST-запрос успешен, то наша функция возвращает объект JSON с логическим значением `success` равным true и `pinataUrl`, где были закреплены наши метаданные. Мы будем использовать этот возвращенный `pinataUrl` в качестве входного параметра `tokenURI` для функции чеканки нашего смарт-контракта.
- Если этот POST-запрос завершается неудачно, то наша функция возвращает объект JSON с логическим значением `success` равным false и строкой `message`, которая передает нашу ошибку.

Как и в случае с типами возвращаемых значений нашей функции `connectWallet`, мы возвращаем объекты JSON, чтобы мы могли использовать их параметры для обновления наших переменных состояния и пользовательского интерфейса.

## Загрузка вашего смарт-контракта {#load-your-smart-contract}

Теперь, когда у нас есть способ загрузить наши метаданные NFT в IPFS с помощью нашей функции `pinJSONToIPFS`, нам понадобится способ загрузить экземпляр нашего смарт-контракта, чтобы мы могли вызвать его функцию `mintNFT`.

Как мы упоминали ранее, в этом руководстве мы будем использовать [этот существующий смарт-контракт NFT](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE); однако, если вы хотите узнать, как мы его создали, или создать его самостоятельно, мы настоятельно рекомендуем вам ознакомиться с нашим другим руководством [«Как создать NFT»](https://www.alchemy.com/docs/how-to-create-an-nft).

### ABI контракта {#contract-abi}

Если вы внимательно изучили наши файлы, вы заметили, что в нашем каталоге `src` есть файл `contract-abi.json`. ABI необходим для указания того, какую функцию будет вызывать контракт, а также для обеспечения того, что функция вернет данные в ожидаемом вами формате.

Нам также понадобится ключ API Alchemy и API Alchemy Web3 для подключения к блокчейну Эфириума и загрузки нашего смарт-контракта.

### Создание вашего ключа API Alchemy {#create-alchemy-api}

Если у вас еще нет аккаунта Alchemy, [зарегистрируйтесь бесплатно здесь.](https://alchemy.com/?a=eth-org-nft-minter)

После создания аккаунта Alchemy вы можете сгенерировать ключ API, создав приложение. Это позволит нам делать запросы к тестовой сети Ропстен.

Перейдите на страницу «Create App» (Создать приложение) на панели управления Alchemy, наведя курсор на «Apps» (Приложения) на панели навигации и нажав «Create App».

Назовите свое приложение (мы выбрали «My First NFT!»), предложите краткое описание, выберите «Staging» для среды (Environment), используемой для учета вашего приложения, и выберите «Ropsten» для вашей сети (Network).

Нажмите «Create app» (Создать приложение), и все готово! Ваше приложение должно появиться в таблице ниже.

Потрясающе, теперь, когда мы создали наш URL-адрес HTTP API Alchemy, скопируйте его в буфер обмена...

…а затем давайте добавим его в наш файл `.env`. В целом, ваш файл .env должен выглядеть так:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

Теперь, когда у нас есть ABI нашего контракта и наш ключ API Alchemy, мы готовы загрузить наш смарт-контракт с помощью [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).

### Настройка конечной точки Alchemy Web3 и контракта {#setup-alchemy-endpoint}

Сначала, если у вас его еще нет, вам нужно будет установить [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), перейдя в домашний каталог `nft-minter-tutorial` в терминале:

```text
cd ..
npm install @alch/alchemy-web3
```

Затем давайте вернемся к нашему файлу `interact.js`. В начале файла добавьте следующий код, чтобы импортировать ваш ключ Alchemy из файла .env и настроить конечную точку Alchemy Web3:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) — это оболочка вокруг [Web3.js](https://docs.web3js.org/), предоставляющая расширенные методы API и другие важные преимущества, чтобы облегчить вашу жизнь как разработчика Web3. Она разработана так, чтобы требовать минимальной настройки, поэтому вы можете сразу начать использовать ее в своем приложении!

Затем давайте добавим ABI нашего контракта и адрес контракта в наш файл.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

Как только у нас будут оба этих элемента, мы готовы начать писать код нашей функции чеканки!

## Реализация функции mintNFT {#implement-the-mintnft-function}

Внутри вашего файла `interact.js` давайте определим нашу функцию `mintNFT`, которая, как следует из названия, будет чеканить наш NFT.

Поскольку мы будем делать множество асинхронных вызовов (к Pinata для закрепления наших метаданных в IPFS, к Alchemy Web3 для загрузки нашего смарт-контракта и к МетаМаск для подписания наших транзакций), наша функция также будет асинхронной.

Тремя входными параметрами нашей функции будут `url` нашего цифрового актива, `name` и `description`. Добавьте следующую сигнатуру функции под функцией `connectWallet`:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### Обработка ошибок ввода {#input-error-handling}

Естественно, имеет смысл иметь какую-то обработку ошибок ввода в начале функции, чтобы мы выходили из этой функции, если наши входные параметры неверны. Внутри нашей функции давайте добавим следующий код:

```javascript
export const mintNFT = async (url, name, description) => {
  //обработка ошибок
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }
}
```

По сути, если какой-либо из входных параметров является пустой строкой, то мы возвращаем объект JSON, где логическое значение `success` равно false, а строка `status` сообщает, что все поля в нашем пользовательском интерфейсе должны быть заполнены.

### Загрузка метаданных в IPFS {#upload-metadata-to-ipfs}

Как только мы убедимся, что наши метаданные отформатированы правильно, следующим шагом будет обернуть их в объект JSON и загрузить в IPFS с помощью написанной нами функции `pinJSONToIPFS`!

Для этого нам сначала нужно импортировать функцию `pinJSONToIPFS` в наш файл `interact.js`. В самом начале файла `interact.js` давайте добавим:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

Напомним, что `pinJSONToIPFS` принимает тело JSON. Поэтому, прежде чем мы вызовем ее, нам нужно будет отформатировать наши параметры `url`, `name` и `description` в объект JSON.

Давайте обновим наш код, чтобы создать объект JSON под названием `metadata`, а затем сделаем вызов `pinJSONToIPFS` с этим параметром `metadata`:

```javascript
export const mintNFT = async (url, name, description) => {
  //обработка ошибок
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //создать метаданные
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //выполнить вызов к Pinata
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

Обратите внимание, мы сохраняем ответ нашего вызова `pinJSONToIPFS(metadata)` в объекте `pinataResponse`. Затем мы анализируем этот объект на наличие ошибок.

Если есть ошибка, мы возвращаем объект JSON, где логическое значение `success` равно false, а наша строка `status` сообщает, что наш вызов не удался. В противном случае мы извлекаем `pinataURL` из `pinataResponse` и сохраняем его как нашу переменную `tokenURI`.

Теперь пришло время загрузить наш смарт-контракт с помощью API Alchemy Web3, который мы инициализировали в начале нашего файла. Добавьте следующую строку кода в конец функции `mintNFT`, чтобы установить контракт в глобальную переменную `window.contract`:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

Последнее, что нужно добавить в нашу функцию `mintNFT`, — это наша транзакция Эфириума:

```javascript
//настроить вашу транзакцию Эфириум
const transactionParameters = {
  to: contractAddress, // Обязательно, за исключением публикаций контракта.
  from: window.ethereum.selectedAddress, // должен совпадать с активным Адресом пользователя.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //выполнить вызов к смарт-контракту NFT
}

//подписать транзакцию через МетаМаск
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

Если вы уже знакомы с транзакциями Эфириума, вы заметите, что структура довольно похожа на то, что вы видели.

- Сначала мы настраиваем параметры нашей транзакции.
  - `to` указывает адрес получателя (наш смарт-контракт)
  - `from` указывает подписанта транзакции (подключенный адрес пользователя к МетаМаск: `window.ethereum.selectedAddress`)
  - `data` содержит вызов метода `mintNFT` нашего смарт-контракта, который получает наш `tokenURI` и адрес кошелька пользователя, `window.ethereum.selectedAddress`, в качестве входных данных
- Затем мы делаем вызов await `window.ethereum.request,`, где мы просим МетаМаск подписать транзакцию. Обратите внимание, в этом запросе мы указываем наш метод eth (eth_SentTransaction) и передаем наши `transactionParameters`. На этом этапе МетаМаск откроется в браузере и предложит пользователю подписать или отклонить транзакцию.
  - Если транзакция успешна, функция вернет объект JSON, где логическое значение `success` установлено в true, а строка `status` предлагает пользователю проверить Etherscan для получения дополнительной информации о своей транзакции.
  - Если транзакция завершается неудачно, функция вернет объект JSON, где логическое значение `success` установлено в false, а строка `status` передает сообщение об ошибке.

В целом, наша функция `mintNFT` должна выглядеть так:

```javascript
export const mintNFT = async (url, name, description) => {
  //обработка ошибок
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //создать метаданные
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //запрос на закрепление в Pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //загрузить смарт-контракт
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //настроить вашу транзакцию Эфириум
  const transactionParameters = {
    to: contractAddress, // Обязательно, за исключением публикаций контракта.
    from: window.ethereum.selectedAddress, // должен совпадать с активным Адресом пользователя.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //выполнить вызов к смарт-контракту NFT
  }

  //подписать транзакцию через МетаМаск
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

Это одна гигантская функция! Теперь нам просто нужно подключить нашу функцию `mintNFT` к нашему компоненту `Minter.js`...

## Подключение mintNFT к нашему фронтенду Minter.js {#connect-our-frontend}

Откройте ваш файл `Minter.js` и обновите строку `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` вверху, чтобы она выглядела так:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

Наконец, реализуйте функцию `onMintPressed`, чтобы сделать вызов await к вашей импортированной функции `mintNFT` и обновить переменную состояния `status`, чтобы отразить, была ли наша транзакция успешной или неудачной:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## Развертывание вашего NFT на работающем веб-сайте {#deploy-your-nft}

Готовы запустить свой проект для взаимодействия с пользователями? Ознакомьтесь с [этим руководством](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) по развертыванию вашего приложения для чеканки на работающем веб-сайте.

Один последний шаг...

## Покорите мир блокчейна {#take-the-blockchain-world-by-storm}

Шучу, вы дошли до конца руководства!

Подводя итог, создав приложение для чеканки NFT, вы успешно научились:

- Подключаться к МетаМаск через ваш фронтенд-проект
- Вызывать методы смарт-контракта из вашего фронтенда
- Подписывать транзакции с помощью МетаМаск

Предположительно, вы хотели бы иметь возможность похвастаться NFT, отчеканенными через ваше dapp, в своем кошельке — поэтому обязательно ознакомьтесь с нашим кратким руководством [«Как просмотреть свой NFT в кошельке»](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet)!

И, как всегда, если у вас есть какие-либо вопросы, мы готовы помочь в [Дискорде Alchemy](https://discord.gg/gWuC7zB). Нам не терпится увидеть, как вы примените концепции из этого руководства в своих будущих проектах!