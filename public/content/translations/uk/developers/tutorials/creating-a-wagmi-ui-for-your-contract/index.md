---
title: "Створення інтерфейсу користувача для вашого контракту"
description: "Використовуючи сучасні компоненти, як-от TypeScript, React, Vite та Wagmi, ми розглянемо сучасний, але мінімальний, інтерфейс користувача та навчимося підключати гаманець до інтерфейсу користувача, викликати смарт-контракт для зчитування інформації, надсилати транзакцію до смарт-контракту та відстежувати події зі смарт-контракту для виявлення змін."
author: "Орі Померанц"
tags:
  [
    "typescript",
    "реагування",
    "vite",
    "wagmi",
    "використання"
  ]
skill: beginner
published: 2023-01-11
lang: uk
sidebarDepth: 3
---

Ви знайшли функцію, яка потрібна нам в екосистемі Ethereum. Ви написали смарт-контракти для її реалізації, а можливо, навіть якийсь пов'язаний код, що працює offchain. Це чудово! На жаль, без інтерфейсу користувача у вас не буде користувачів, а останній раз, коли ви писали вебсайт, люди використовували модеми з комутованим доступом, а JavaScript був новинкою.

Ця стаття для вас. Я припускаю, що ви знаєте програмування, і, можливо, трохи JavaScript та HTML, але ваші навички роботи з інтерфейсом користувача застаріли. Разом ми розглянемо простий сучасний додаток, щоб ви побачили, як це робиться в наші дні.

## Чому це важливо {#why-important}

Теоретично, ви могли б просто дозволити людям використовувати [Etherscan](https://holesky.etherscan.io/address/0x432d810484add7454ddb3b5311f0ac2e95cecea8#writeContract) або [Blockscout](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=write_contract) для взаємодії з вашими контрактами. Це буде чудово для досвідчених етеріанців. Але ми намагаємося залучити [ще один мільярд людей](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion). Цього не станеться без чудового досвіду користувача, і дружній інтерфейс користувача є великою частиною цього.

## Додаток Greeter {#greeter-app}

Існує багато теорії про те, як працює сучасний UI, і [багато хороших сайтів](https://react.dev/learn/thinking-in-react), [які це пояснюють](https://wagmi.sh/core/getting-started). Замість того, щоб повторювати чудову роботу, виконану цими сайтами, я припущу, що ви віддаєте перевагу навчанню на практиці, і почну з додатка, з яким ви можете погратися. Вам все ще потрібна теорія, щоб виконати роботу, і ми до неї дійдемо — ми просто розглянемо вихідний файл за вихідним файлом і обговоримо речі, коли дійдемо до них.

### Встановлення {#installation}

1. За необхідності додайте [блокчейн Holesky](https://chainlist.org/?search=holesky&testnets=true) до свого гаманця та [отримайте тестовий ETH](https://www.holeskyfaucet.io/).

2. Клонуйте репозиторій github.

   ```sh
   git clone https://github.com/qbzzt/20230801-modern-ui.git
   ```

3. Встановіть необхідні пакети.

   ```sh
   cd 20230801-modern-ui
   pnpm install
   ```

4. Запустіть додаток.

   ```sh
   pnpm dev
   ```

5. Перейдіть за URL-адресою, що відображається додатком. У більшості випадків це [http://localhost:5173/](http://localhost:5173/).

6. Ви можете переглянути вихідний код контракту, трохи змінену версію Greeter від Hardhat, [у оглядачі блокчейну](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contract).

### Огляд файлів {#file-walk-through}

#### `index.html` {#index-html}

Цей файл є стандартним шаблоном HTML, за винятком цього рядка, який імпортує файл скрипту.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

Розширення файлу говорить нам про те, що цей файл є [компонентом React](https://www.w3schools.com/react/react_components.asp), написаним на [TypeScript](https://www.typescriptlang.org/), розширенні JavaScript, яке підтримує [перевірку типів](https://en.wikipedia.org/wiki/Type_system#Type_checking). TypeScript компілюється в JavaScript, тому ми можемо використовувати його для виконання на стороні клієнта.

```tsx
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { chains, config } from './wagmi'
```

Імпортуємо код бібліотек, який нам потрібен.

```tsx
import { App } from './App'
```

Імпортуємо компонент React, який реалізує додаток (див. нижче).

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

Створюємо кореневий компонент React. Параметром для `render` є [JSX](https://www.w3schools.com/react/react_jsx.asp), мова розширення, що використовує як HTML, так і JavaScript/TypeScript. Знак оклику тут говорить компоненту TypeScript: "ви не знаєте, що `document.getElementById('root')` буде дійсним параметром для `ReactDOM.createRoot`, але не хвилюйтеся — я розробник, і я вам кажу, що він буде".

```tsx
  <React.StrictMode>
```

Додаток розміщується всередині [компонента `React.StrictMode`](https://react.dev/reference/react/StrictMode). Цей компонент наказує бібліотеці React вставляти додаткові перевірки для налагодження, що корисно під час розробки.

```tsx
    <WagmiConfig config={config}>
```

Додаток також знаходиться всередині [компонента `WagmiConfig`](https://wagmi.sh/react/api/WagmiProvider). [Бібліотека wagmi (we are going to make it)](https://wagmi.sh/) з'єднує визначення UI React з [бібліотекою viem](https://viem.sh/) для написання децентралізованого додатка Ethereum.

```tsx
      <RainbowKitProvider chains={chains}>
```

І, нарешті, [компонент `RainbowKitProvider`](https://www.rainbowkit.com/). Цей компонент обробляє вхід у систему та зв'язок між гаманцем і додатком.

```tsx
        <App />
```

Тепер ми можемо мати компонент для додатка, який фактично реалізує UI. `/>` в кінці компонента говорить React, що цей компонент не має жодних визначень всередині себе, відповідно до стандарту XML.

```tsx
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
```

Звичайно, ми повинні закрити інші компоненти.

#### `src/App.tsx` {#app-tsx}

```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Greeter } from './components/Greeter'

export function App() {
```

Це стандартний спосіб створення компонента React — визначити функцію, яка викликається щоразу, коли її потрібно відрендерити. Ця функція зазвичай має деякий код TypeScript або JavaScript на початку, за яким слідує оператор `return`, що повертає код JSX.

```tsx
  const { isConnected } = useAccount()
```

Тут ми використовуємо [`useAccount`](https://wagmi.sh/react/api/hooks/useAccount), щоб перевірити, чи підключені ми до блокчейну через гаманець.

За домовленістю, у React функції, що називаються `use...`, є [хуками](https://www.w3schools.com/react/react_hooks.asp), які повертають певні дані. Коли ви використовуєте такі хуки, ваш компонент не тільки отримує дані, але й коли ці дані змінюються, компонент перемальовується з оновленою інформацією.

```tsx
  return (
    <>
```

JSX компонента React _повинен_ повертати один компонент. Коли ми маємо кілька компонентів і не маємо нічого, що обгортає їх "природно", ми використовуємо порожній компонент (`<> ... </>`) to make them into a single component.

```tsx
      <h1>Greeter</h1>
      <ConnectButton />
```

Ми отримуємо [компонент `ConnectButton`](https://www.rainbowkit.com/docs/connect-button) з RainbowKit. Коли ми не підключені, він надає нам кнопку `Connect Wallet`, яка відкриває модальне вікно, що пояснює що таке гаманці та дозволяє вибрати, який з них ви використовуєте. Коли ми підключені, він відображає блокчейн, який ми використовуємо, адресу нашого облікового запису та наш баланс ETH. Ми можемо використовувати ці дисплеї для перемикання мережі або для відключення.

```tsx
      {isConnected && (
```

Коли нам потрібно вставити справжній JavaScript (або TypeScript, який буде компілюватися в JavaScript) в JSX, ми використовуємо дужки (`{}`).

Синтаксис `a && b` є скороченням для [`a ?` b : a`](https://www.w3schools.com/react/react_es6_ternary.asp). Тобто, якщо `a`істинне, вираз обчислюється як`b`, а в іншому випадку — як `a`(яке може бути`false`, `0` тощо). Це простий спосіб повідомити React, що компонент має відображатися лише за виконання певної умови.

У цьому випадку ми хочемо показувати користувачу `Greeter` лише тоді, коли користувач підключений до блокчейну.

```tsx
          <Greeter />
      )}
    </>
  )
}
```

#### `src/components/Greeter.tsx` {#greeter-tsx}

Цей файл містить більшу частину функціональності UI. Він містить визначення, які зазвичай знаходяться в кількох файлах, але оскільки це посібник, програма оптимізована для легкого розуміння з першого разу, а не для продуктивності чи простоти обслуговування.

```tsx
import { useState, ChangeEventHandler } from 'react'
import {  useNetwork,
          useReadContract,
          usePrepareContractWrite,
          useContractWrite,
          useContractEvent
        } from 'wagmi'
```

Ми використовуємо ці бібліотечні функції. Знову ж таки, вони пояснюються нижче, там, де вони використовуються.

```tsx
import { AddressType } from 'abitype'
```

[Бібліотека `abitype`](https://abitype.dev/) надає нам визначення TypeScript для різних типів даних Ethereum, таких як [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  .
  .
  .
] as const   // greeterABI
```

ABI для контракту `Greeter`.
Якщо ви розробляєте контракти та UI одночасно, ви зазвичай розміщуєте їх в одному репозиторії та використовуєте ABI, згенерований компілятором Solidity, як файл у вашому додатку. Однак тут це не потрібно, оскільки контракт уже розроблено і він не буде змінюватися.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript є строго типізованою мовою. Ми використовуємо це визначення, щоб вказати адресу, за якою контракт `Greeter` розгорнуто в різних мережах. Ключем є число (chainId), а значенням — `AddressType` (адреса).

```tsx
const contractAddrs: AddressPerBlockchainType = {
  // Holesky
  17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',

  // Sepolia
  11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
}
```

Адреса контракту на двох підтримуваних мережах: [Holesky](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contact_code) та [Sepolia](https://eth-sepolia.blockscout.com/address/0x7143d5c190F048C8d19fe325b748b081903E3BF0?tab=contact_code).

Примітка: насправді існує третє визначення для Redstone Holesky, яке буде пояснено нижче.

```tsx
type ShowObjectAttrsType = {
  name: string,
  object: any
}
```

Цей тип використовується як параметр для компонента `ShowObject` (пояснено пізніше). Він містить назву об'єкта та його значення, які відображаються для цілей налагодження.

```tsx
type ShowGreetingAttrsType = {
  greeting: string | undefined
}
```

У будь-який момент часу ми можемо або знати, що таке привітання (оскільки ми прочитали його з блокчейну), або не знати (оскільки ми його ще не отримали). Тому корисно мати тип, який може бути або рядком, або нічим.

##### Компонент `Greeter` {#greeter-component}

```tsx
const Greeter = () => {
```

Нарешті, ми можемо визначити компонент.

```tsx
  const { chain } = useNetwork()
```

Інформація про мережу, яку ми використовуємо, надається [wagmi](https://wagmi.sh/react/hooks/useNetwork).
Оскільки це хук (`use...`), щоразу, коли ця інформація змінюється, компонент перемальовується.

```tsx
  const greeterAddr = chain && contractAddrs[chain.id]
```

Адреса контракту Greeter, яка залежить від мережі (і яка є `undefined`, якщо у нас немає інформації про мережу або ми знаходимося в мережі без цього контракту).

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet" , // No arguments
    watch: true
  })
```

[Хук `useReadContract`](https://wagmi.sh/react/api/hooks/useReadContract) зчитує інформацію з контракту. Ви можете побачити, яку саме інформацію він повертає, розгорнувши `readResults` в UI. У цьому випадку ми хочемо, щоб він продовжував відстежувати, щоб ми були поінформовані, коли привітання зміниться.

**Примітка:** Ми могли б слухати [події `setGreeting`](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=logs), щоб знати, коли змінюється привітання, і оновлювати його таким чином. Однак, хоча це може бути ефективніше, це не застосовується в усіх випадках. Коли користувач перемикається на іншу мережу, привітання також змінюється, але ця зміна не супроводжується подією. Ми могли б мати одну частину коду, що слухає події, а іншу — для ідентифікації змін мережі, але це було б складніше, ніж просто встановити [параметр `watch`](https://wagmi.sh/react/api/hooks/useReadContract#watch-optional).

```tsx
  const [ newGreeting, setNewGreeting ] = useState("")
```

[Хук `useState`](https://www.w3schools.com/react/react_usestate.asp) від React дозволяє нам вказати змінну стану, значення якої зберігається від одного відтворення компонента до іншого. Початковим значенням є параметр, у цьому випадку — порожній рядок.

Хук `useState` повертає список з двох значень:

1. Поточне значення змінної стану.
2. Функція для зміни змінної стану за потреби. Оскільки це хук, щоразу, коли він викликається, компонент відтворюється знову.

У цьому випадку ми використовуємо змінну стану для нового привітання, яке хоче встановити користувач.

```tsx
  const greetingChange : ChangeEventHandler<HTMLInputElement> = (evt) =>
    setNewGreeting(evt.target.value)
```

Це обробник події, коли змінюється поле введення нового привітання. Тип, [`ChangeEventHandler<HTMLInputElement>`](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/), вказує, що це обробник зміни значення елемента вводу HTML. Частина `<HTMLInputElement>` використовується тому, що це [загальний тип](https://www.w3schools.com/typescript/typescript_basic_generics.php).

```tsx
  const preparedTx = usePrepareContractWrite({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [ newGreeting ]
  })
  const workingTx = useContractWrite(preparedTx.config)
```

Це процес надсилання транзакції блокчейну з точки зору клієнта:

1. Надішліть транзакцію на вузол у блокчейні за допомогою [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas).
2. Зачекайте на відповідь від вузла.
3. Коли відповідь отримано, попросіть користувача підписати транзакцію через гаманець. Цей крок _повинен_ відбутися після отримання відповіді від вузла, оскільки користувачеві показується вартість газу транзакції перед її підписанням.
4. Зачекайте на схвалення користувача.
5. Надішліть транзакцію ще раз, цього разу використовуючи [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction).

Крок 2, ймовірно, займе помітну кількість часу, протягом якого користувачі будуть дивуватися, чи дійсно їхня команда була отримана інтерфейсом користувача і чому їх ще не просять підписати транзакцію. Це створює поганий досвід користувача (UX).

Рішенням є використання [хуків підготовки](https://wagmi.sh/react/prepare-hooks). Кожного разу, коли параметр змінюється, негайно надсилайте запит `eth_estimateGas` на вузол. Потім, коли користувач дійсно хоче надіслати транзакцію (у цьому випадку, натиснувши **Оновити привітання**), вартість газу відома, і користувач може негайно побачити сторінку гаманця.

```tsx
  return (
```

Тепер ми нарешті можемо створити фактичний HTML для повернення.

```tsx
    <>
      <h2>Greeter</h2>
      {
        !readResults.isError && !readResults.isLoading &&
          <ShowGreeting greeting={readResults.data} />
      }
      <hr />
```

Створіть компонент `ShowGreeting` (пояснено нижче), але тільки якщо привітання було успішно прочитано з блокчейну.

```tsx
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />
```

Це поле для введення тексту, де користувач може встановити нове привітання. Щоразу, коли користувач натискає клавішу, ми викликаємо `greetingChange`, який викликає `setNewGreeting`. Оскільки `setNewGreeting` походить від хука `useState`, це призводить до повторного рендерингу компонента `Greeter`. Це означає, що:

- Нам потрібно вказати `value`, щоб зберегти значення нового привітання, оскільки інакше воно повернеться до значення за замовчуванням — порожнього рядка.
- `usePrepareContractWrite` викликається щоразу, коли змінюється `newGreeting`, що означає, що він завжди матиме останнє значення `newGreeting` у підготовленій транзакції.

```tsx
      <button disabled={!workingTx.write}
              onClick={workingTx.write}
      >
        Update greeting
      </button>
```

Якщо `workingTx.write` відсутній, то ми все ще чекаємо на інформацію, необхідну для надсилання оновлення привітання, тому кнопка вимкнена. Якщо є значення `workingTx.write`, то це функція, яку потрібно викликати для надсилання транзакції.

```tsx
      <hr />
      <ShowObject name="readResults" object={readResults} />
      <ShowObject name="preparedTx" object={preparedTx} />
      <ShowObject name="workingTx" object={workingTx} />
    </>
  )
}
```

Нарешті, щоб допомогти вам зрозуміти, що ми робимо, покажемо три об'єкти, які ми використовуємо:

- `readResults`
- `preparedTx`
- `workingTx`

##### Компонент `ShowGreeting` {#showgreeting-component}

Цей компонент показує

```tsx
const ShowGreeting = (attrs : ShowGreetingAttrsType) => {
```

Функція компонента отримує параметр з усіма атрибутами компонента.

```tsx
  return <b>{attrs.greeting}</b>
}
```

##### Компонент `ShowObject` {#showobject-component}

Для інформаційних цілей ми використовуємо компонент `ShowObject` для відображення важливих об'єктів (`readResults` для читання привітання та `preparedTx` і `workingTx` для транзакцій, які ми створюємо).

```tsx
const ShowObject = (attrs: ShowObjectAttrsType ) => {
  const keys = Object.keys(attrs.object)
  const funs = keys.filter(k => typeof attrs.object[k] == "function")
  return <>
    <details>
```

Ми не хочемо захаращувати UI всією інформацією, тому, щоб зробити її доступною для перегляду або закриття, ми використовуємо тег [`details`](https://www.w3schools.com/tags/tag_details.asp).

```tsx
      <summary>{attrs.name}</summary>
      <pre>
        {JSON.stringify(attrs.object, null, 2)}
```

Більшість полів відображаються за допомогою [`JSON.stringify`](https://www.w3schools.com/js/js_json_stringify.asp).

```tsx
      </pre>
      { funs.length > 0 &&
        <>
          Functions:
          <ul>
```

Винятком є функції, які не є частиною [стандарту JSON](https://www.json.org/json-en.html), тому їх потрібно відображати окремо.

```tsx
          {funs.map((f, i) =>
```

У JSX код всередині фігурних дужок `{` `}` інтерпретується як JavaScript. Потім код усередині круглих дужок `(` `)` знову інтерпретується як JSX.

```tsx
           (<li key={i}>{f}</li>)
                )}
```

React вимагає, щоб теги в [дереві DOM](https://www.w3schools.com/js/js_htmldom.asp) мали унікальні ідентифікатори. Це означає, що дочірні елементи одного тегу (у цьому випадку, [невпорядкований список](https://www.w3schools.com/tags/tag_ul.asp)) потребують різних атрибутів `key`.

```tsx
          </ul>
        </>
      }
    </details>
  </>
}
```

Закінчіть різні теги HTML.

##### Остаточний `експорт` {#the-final-export}

```tsx
export { Greeter }
```

Компонент `Greeter` є тим, який нам потрібно експортувати для додатка.

#### `src/wagmi.ts` {#wagmi-ts}

Нарешті, різні визначення, пов'язані з WAGMI, знаходяться в `src/wagmi.ts`. Я не буду пояснювати тут усе, оскільки більшість із цього є стандартним кодом, який вам навряд чи доведеться змінювати.

Код тут не зовсім такий, як [на github](https://github.com/qbzzt/20230801-modern-ui/blob/main/src/wagmi.ts), оскільки далі в статті ми додамо ще одну мережу ([Redstone Holesky](https://redstone.xyz/docs/network-info)).

```ts
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { holesky, sepolia } from 'wagmi/chains'
```

Імпортуйте блокчейни, які підтримує додаток. Ви можете переглянути список підтримуваних мереж [на github viem](https://github.com/wagmi-dev/viem/tree/main/src/chains/definitions).

```ts
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = 'c96e690bb92b6311e8e9b2a6a22df575'
```

Щоб мати можливість використовувати [WalletConnect](https://walletconnect.com/), вам потрібен ID проєкту для вашого додатка. Ви можете отримати його [на cloud.walletconnect.com](https://cloud.walletconnect.com/sign-in).

```ts
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ holesky, sepolia ],
  [
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'My wagmi + RainbowKit App',
  chains,
  projectId: walletConnectProjectId,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export { chains }
```

### Додавання ще одного блокчейну {#add-blockchain}

Сьогодні існує багато [рішень для масштабування L2](/layer-2/), і ви можете захотіти підтримати деякі, які viem ще не підтримує. Для цього вам потрібно змінити `src/wagmi.ts`. Ці інструкції пояснюють, як додати [Redstone Holesky](https://redstone.xyz/docs/network-info).

1. Імпортуйте тип `defineChain` з viem.

   ```ts
   import { defineChain } from 'viem'
   ```

2. Додайте визначення мережі.

   ```ts
   const redstoneHolesky = defineChain({
      id: 17_001,
      name: 'Redstone Holesky',
      network: 'redstone-holesky',
      nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
      },
      rpcUrls: {
        default: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
      },
      public: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
        },
      },
      blockExplorers: {
        default: { name: 'Explorer', url: 'https://explorer.holesky.redstone.xyz' },
      },
   })
   ```

3. Додайте нову мережу до виклику `configureChains`.

   ```ts
    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [ holesky, sepolia, redstoneHolesky ],
      [ publicProvider(), ],
    )
   ```

4. Переконайтеся, що додаток знає адресу для ваших контрактів у новій мережі. У цьому випадку ми змінюємо `src/components/Greeter.tsx`:

    ```ts
    const contractAddrs : AddressPerBlockchainType = {
      // Holesky
      17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',
    
      // Redstone Holesky
      17001: '0x4919517f82a1B89a32392E1BF72ec827ba9986D3',
    
      // Sepolia
      11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
    }
    ```

## Висновок {#conclusion}

Звичайно, ви не дуже дбаєте про надання інтерфейсу користувача для `Greeter`. Ви хочете створити інтерфейс користувача для своїх власних контрактів. Щоб створити власний додаток, виконайте ці кроки:

1. Вкажіть, щоб створити додаток wagmi.

   ```sh copy
   pnpm create wagmi
   ```

2. Назвіть додаток.

3. Виберіть фреймворк **React**.

4. Виберіть варіант **Vite**.

5. Ви можете [додати Rainbow kit](https://www.rainbowkit.com/docs/installation#manual-setup).

Тепер ідіть і зробіть свої контракти доступними для всього світу.

[Більше моїх робіт дивіться тут](https://cryptodocguy.pro/).

