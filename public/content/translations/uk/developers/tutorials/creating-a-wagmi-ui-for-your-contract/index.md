---
title: "Створення інтерфейсу користувача для вашого контракту"
description: "Використовуючи сучасні компоненти, такі як TypeScript, React, Vite та Wagmi, ми розглянемо сучасний, але мінімалістичний інтерфейс користувача та дізнаємося, як підключити гаманець до інтерфейсу, викликати смарт-контракт для зчитування інформації, надіслати транзакцію до смарт-контракту та відстежувати події зі смарт-контракту для виявлення змін."
author: "Орі Померанц"
tags: ["TypeScript", "React", "Vite", "Wagmi", "фронтенд"]
skill: beginner
breadcrumb: "Інтерфейс користувача з WAGMI"
published: 2023-11-01
lang: uk
sidebarDepth: 3
---

Ви знайшли функцію, яка потрібна в екосистемі Етеріум. Ви написали смарт-контракти для її реалізації, а можливо, навіть пов'язаний код, який працює позамережево. Це чудово! На жаль, без інтерфейсу користувача у вас не буде жодного користувача, а коли ви востаннє писали вебсайт, люди використовували комутовані модеми, а JavaScript був чимось новим.

Ця стаття для вас. Я припускаю, що ви знаєте програмування, а можливо, і трохи JavaScript та HTML, але ваші навички створення інтерфейсів користувача застаріли. Разом ми розглянемо простий сучасний застосунок, щоб ви побачили, як це робиться сьогодні.

## Чому це важливо {#why-important}

Теоретично, ви могли б просто запропонувати людям використовувати [Etherscan](https://sepolia.etherscan.io/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA#readContract) або [Blockscout](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_write_contract) для взаємодії з вашими контрактами. Це чудово для досвідчених користувачів Етеріуму. Але ми намагаємося залучити [ще мільярд людей](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion). Цього не станеться без чудового користувацького досвіду, і зручний інтерфейс користувача є важливою його частиною.

## Застосунок Greeter {#greeter-app}

Існує багато теорії про те, як працюють сучасні інтерфейси користувача, і [багато хороших сайтів](https://react.dev/learn/thinking-in-react), [які це пояснюють](https://wagmi.sh/core/getting-started). Замість того, щоб повторювати чудову роботу, виконану цими сайтами, я припускаю, що ви віддаєте перевагу навчанню на практиці, і почну із застосунку, з яким ви можете поекспериментувати. Вам все ще потрібна теорія, щоб досягти результату, і ми до неї дійдемо — ми просто будемо розглядати вихідні файли один за одним і обговорювати все по мірі надходження.

### Встановлення {#installation}

1. Застосунок використовує тестову мережу [Sepolia](https://sepolia.dev/). За необхідності [отримайте тестові ETH у Sepolia](/developers/docs/networks/#sepolia) та [додайте Sepolia до свого гаманця](https://chainlist.org/chain/11155111).

2. Клонуйте репозиторій GitHub та встановіть необхідні пакети.

   ```sh
   git clone https://github.com/qbzzt/260301-modern-ui-web3.git
   cd 260301-modern-ui-web3
   npm install
   ```

3. Застосунок використовує безкоштовні точки доступу, які мають обмеження продуктивності. Якщо ви хочете використовувати провайдера [вузлів як послуги](/developers/docs/nodes-and-clients/nodes-as-a-service/), замініть URL-адреси у [`src/wagmi.ts`](#wagmi-ts).

4. Запустіть застосунок.

   ```sh
   npm run dev
   ```

5. Перейдіть за URL-адресою, яку показує застосунок. У більшості випадків це [http://localhost:5173/](http://localhost:5173/).

6. Ви можете переглянути вихідний код контракту, модифіковану версію Greeter від Hardhat, [в оглядачі блокчейну](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code).

### Огляд файлів {#file-walk-through}

#### `index.html` {#index-html}

Цей файл є стандартним шаблоном HTML, за винятком цього рядка, який імпортує файл скрипта.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

Розширення файлу вказує на те, що це [компонент React](https://www.w3schools.com/react/react_components.asp), написаний на [TypeScript](https://www.typescriptlang.org/), розширенні JavaScript, яке підтримує [перевірку типів](https://en.wikipedia.org/wiki/Type_system#Type_checking). TypeScript компілюється в JavaScript, тому ми можемо використовувати його на стороні клієнта.

Цей файл здебільшого пояснюється на випадок, якщо вам цікаво. Зазвичай ви не змінюєте цей файл, а лише [`src/App.tsx`](#app-tsx) та файли, які він імпортує.

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
```

Імпортуємо необхідний код бібліотеки.

```tsx
import App from './App.tsx'
```

Імпортуємо компонент React, який реалізує застосунок (див. нижче).

```tsx
import { config } from './wagmi.ts'
```

Імпортуємо конфігурацію [Wagmi](https://wagmi.sh/), яка включає конфігурацію блокчейну.

```tsx
const queryClient = new QueryClient()
```

Створює новий екземпляр менеджера кешу [React Query](https://tanstack.com/query/latest/docs/framework/react/overview). Цей об'єкт зберігатиме:

- Кешовані виклики RPC
- Зчитування з контрактів
- Стан фонового повторного отримання даних

Нам потрібен менеджер кешу, оскільки Wagmi v3 використовує React Query внутрішньо.

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

Створюємо кореневий компонент React. Параметром для `render` є [JSX](https://www.w3schools.com/react/react_jsx.asp), мова розширення, яка використовує як HTML, так і JavaScript/TypeScript. Знак оклику тут каже компоненту TypeScript: «ти не знаєш, що `document.getElementById('root')` буде дійсним параметром для `ReactDOM.createRoot`, але не хвилюйся — я розробник і кажу тобі, що так і буде».

```tsx
  <React.StrictMode>
```

Застосунок розміщується всередині [компонента `React.StrictMode`](https://react.dev/reference/react/StrictMode). Цей компонент вказує бібліотеці React вставити додаткові перевірки для налагодження, що корисно під час розробки.

```tsx
    <WagmiProvider config={config}>
```

Застосунок також знаходиться всередині [компонента `WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider). [Бібліотека Wagmi (яку ми збираємося створити)](https://wagmi.sh/) з'єднує визначення інтерфейсу користувача React з [бібліотекою Viem](https://viem.sh/) для написання децентралізованого застосунку (dapp) Етеріуму.

```tsx
      <QueryClientProvider client={queryClient}>
```

І нарешті, додаємо провайдер React Query, щоб будь-який компонент застосунку міг використовувати кешовані запити.

```tsx
        <App />
```

Тепер ми можемо додати компонент для застосунку, який фактично реалізує інтерфейс користувача. `/>` в кінці компонента повідомляє React, що цей компонент не має жодних визначень всередині, відповідно до стандарту XML.

```tsx
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
```

Звісно, ми повинні закрити інші компоненти.

#### `src/App.tsx` {#app-tsx}

```tsx
import {
  useConnect,
  useConnection,
  useDisconnect,
  useSwitchChain
} from 'wagmi'

import { useEffect } from 'react'
import { Greeter } from './Greeter'
```

Імпортуємо необхідні бібліотеки, а також [компонент `Greeter`](#greeter-tsx).

```tsx
const SEPOLIA_CHAIN_ID = 11155111
```

Ідентифікатор ланцюга Sepolia.

```
function App() {
```

Це стандартний спосіб створення компонента React: визначити функцію, яка викликається щоразу, коли її потрібно відрендерити. Ця функція зазвичай містить код TypeScript або JavaScript, за яким слідує оператор `return`, що повертає код JSX.

```tsx
  const connection = useConnection()
```

Використовуйте [`useConnection`](https://wagmi.sh/react/api/hooks/useConnection), щоб отримати інформацію, пов'язану з поточним підключенням, таку як адреса та `chainId`.

За домовленістю, у React функції, що починаються з `use...`, є [хуками](https://www.w3schools.com/react/react_hooks.asp). Ці функції не просто повертають дані компоненту; вони також забезпечують його повторний рендеринг (функція компонента виконується знову, і її результат замінює попередній у HTML), коли ці дані змінюються.

```tsx
  const { connectors, connect, status, error } = useConnect()
```

Використовуйте [`useConnect`](https://wagmi.sh/react/api/hooks/useConnect), щоб отримати інформацію про підключення гаманця.

```tsx
  const { disconnect } = useDisconnect()
```

[Цей хук](https://wagmi.sh/react/api/hooks/useDisconnect) надає нам функцію для відключення від гаманця.

```tsx
  const { switchChain } = useSwitchChain()
```

[Цей хук](https://wagmi.sh/react/api/hooks/useSwitchChain) дозволяє нам перемикати ланцюги.

```tsx
  useEffect(() => {
```

Хук React [`useEffect`](https://react.dev/reference/react/useEffect) дозволяє запускати функцію щоразу, коли змінюється значення змінної, для синхронізації зовнішньої системи.

```tsx
    if (connection.status === 'connected' &&
        connection.chainId !== SEPOLIA_CHAIN_ID
    ) {
      switchChain({ chainId: SEPOLIA_CHAIN_ID })
    }
```

Якщо ми підключені, але не до блокчейну Sepolia, перемикаємося на Sepolia.

```tsx
  }, [connection.status, connection.chainId])
```

Повторно запускаємо функцію щоразу, коли змінюється статус підключення або chainId підключення.

```tsx
  return (
    <>
```

JSX компонента React _повинен_ повертати один HTML-компонент. Коли у нас є кілька компонентів і нам не потрібен контейнер, щоб обгорнути їх усі, ми використовуємо порожній компонент (`<> ... </>`), щоб об'єднати їх в один компонент.

```tsx
      <h2>Connection</h2>
      <div>
        status: {connection.status}
        <br />
        addresses: {JSON.stringify(connection.addresses)}
        <br />
        chainId: {connection.chainId}
 
</div>
```

Надаємо інформацію про поточне підключення. У JSX `{<expression>}` означає обчислення виразу як JavaScript.

```tsx
      {connection.status === 'connected' && (
```

Синтаксис `{<condition> && <value>} means "if the condition is `true`, evaluate to the value; if it isn't, evaluate to `false`».

Це стандартний спосіб вставлення операторів if всередині JSX.

```tsx
        <div>
          <Greeter />
          <hr />
```

JSX дотримується стандарту XML, який є суворішим за HTML. Якщо тег не має відповідного кінцевого тегу, він _повинен_ мати скісну риску (`/`) в кінці для його закриття.

Тут ми маємо два таких теги: `<Greeter />` (який фактично містить HTML-код, що взаємодіє з контрактом) та [`<hr />` для горизонтальної лінії](https://www.w3schools.com/tags/tag_hr.asp).

```tsx
          <button type="button" onClick={disconnect}>
            Disconnect
          </button>
 
</div>
      )}
```

Якщо користувач натискає цю кнопку, викликається функція `disconnect`.

```tsx
      {connection.status !== 'connected' && (
```

Якщо ми _не_ підключені, показуємо необхідні опції для підключення до гаманця.

```tsx
        <div>
          <h2>Connect</h2>
          {connectors.map((connector) => (
```

У `connectors` ми маємо список конекторів. Ми використовуємо [`map`](https://www.w3schools.com/jsref/jsref_map.asp), щоб перетворити його на список кнопок JSX для відображення.

```tsx
            <button
              key={connector.uid}
```

У JSX необхідно, щоб «сестринські» теги (теги, що походять від одного батьківського елемента) мали різні ідентифікатори.

```tsx
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
```

Кнопки конекторів.

```tsx
          <div>{status}</div>
          <div>{error?.message}</div>
 
</div>
      )}
```

Надаємо додаткову інформацію. Синтаксис виразу `<variable>?.<field>` вказує JavaScript, що якщо змінна визначена, слід обчислити це поле. Якщо змінна не визначена, то цей вираз обчислюється як `undefined`.

Вираз `error.message`, коли немає помилки, викликав би виняток. Використання `error?.message` дозволяє нам уникнути цієї проблеми.

#### `src/Greeter.tsx` {#greeter-tsx}

Цей файл містить більшу частину функціональності інтерфейсу користувача. Він включає визначення, які зазвичай знаходилися б у кількох файлах, але оскільки це посібник, програма оптимізована для легкого розуміння з першого разу, а не для продуктивності чи простоти обслуговування.

```tsx
import {
          useState,
          useEffect,
       } from 'react'
import {  useChainId,
          useAccount,
          useReadContract,
          useWriteContract,
          useWatchContractEvent,
          useSimulateContract
       } from 'wagmi'
```

Ми використовуємо ці бібліотечні функції. Знову ж таки, вони пояснюються нижче, там, де вони використовуються.

```tsx
import { AddressType } from 'abitype'
```

[Бібліотека `abitype`](https://abitype.dev/) надає нам визначення TypeScript для різних типів даних Етеріуму, таких як [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  { "type": "function", "name": "greet", ... },
  { "type": "function", "name": "setGreeting", ... },
  { "type": "event", "name": "SetGreeting", ... },
] as const   // greeterABI
```

ABI для контракту `Greeter`.
Якщо ви розробляєте контракти та інтерфейс користувача одночасно, ви зазвичай розміщуєте їх в одному репозиторії та використовуєте ABI, згенерований компілятором Solidity, як файл у вашому застосунку. Однак тут це не обов'язково, оскільки контракт вже розроблено і він не зміниться.

Ми використовуємо [`as const`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions), щоб вказати TypeScript, що це _справжня_ константа. Зазвичай, коли ви вказуєте в JavaScript `const x = {"a": 1}`, ви можете змінити значення в `x`, ви просто не можете присвоїти йому нове значення.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript є строго типізованим. Ми використовуємо це визначення, щоб вказати адресу, за якою розгорнуто контракт `Greeter` у різних ланцюгах. Ключем є число (chainId), а значенням — `AddressType` (адреса).

```tsx
const contractAddrs : AddressPerBlockchainType = {
  // Sepolia
    11155111: '0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA'
}
```

Адреса контракту в [Sepolia](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract).

##### Компонент `Timer` {#timer-component}

Компонент `Timer` показує кількість секунд, що минули з певного часу. Це важливо для зручності використання. Коли користувачі щось роблять, вони очікують негайної реакції. У блокчейнах це часто неможливо, оскільки нічого не відбувається, поки транзакція не буде розміщена в блоці. Одне з рішень — показати, скільки часу минуло з моменту виконання дії користувачем, щоб він міг вирішити, чи є необхідний час прийнятним.

```tsx
type TimerProps = {
  lastUpdate: Date
}
```

Компонент `Timer` приймає один параметр, `lastUpdate`, який є часом останньої дії.

```tsx
const Timer = ({ lastUpdate }: TimerProps) => {
  const [_, setNow] = useState(new Date())
```

Нам потрібно мати стан (змінну, прив'язану до компонента) і оновлювати його для правильної роботи компонента. Але нам ніколи не потрібно його зчитувати, тому не варто створювати змінну.

```tsx
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
```

Функція [`setInterval`](https://www.w3schools.com/jsref/met_win_setinterval.asp) дозволяє нам запланувати періодичне виконання функції. У цьому випадку — щосекунди. Функція викликає `setNow` для оновлення стану, тому компонент `Timer` буде відрендерено повторно. Ми обгортаємо це всередині [`useEffect`](https://react.dev/reference/react/useEffect) з порожнім списком залежностей, щоб це відбулося лише один раз, а не щоразу під час рендерингу компонента.

```tsx
  const secondsSinceUpdate = Math.floor(
    (Date.now() - lastUpdate.getTime()) / 1000
  )

  return (
    <span>{secondsSinceUpdate} seconds ago</span>
  )
}
```

Обчислюємо кількість секунд з моменту останнього оновлення та повертаємо її.

##### Компонент `Greeter` {#greeter-component}

```tsx
const Greeter = () => {
```

Нарешті, ми переходимо до визначення компонента.

```tsx
  const chainId = useChainId()
  const account = useAccount()
```

Інформація про ланцюг та обліковий запис, які ми використовуємо, надана [Wagmi](https://wagmi.sh/). Оскільки це хук (`use...`), компонент рендериться повторно щоразу, коли ця інформація змінюється.

```tsx
  const greeterAddr = chainId && contractAddrs[chainId] 
```

Адреса контракту Greeter, яка дорівнює `undefined`, якщо у нас немає інформації про ланцюг, або ми знаходимося в ланцюзі без цього контракту.

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet", // Без аргументів
  })
```

[Хук `useReadContract`](https://wagmi.sh/react/api/hooks/useReadContract) викликає функцію `greet` [контракту](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract).

```tsx
  const [ currentGreeting, setCurrentGreeting ] = 
    useState("Please wait while we fetch the greeting from the blockchain...")
  const [ newGreeting, setNewGreeting ] = useState("")
```

[Хук `useState`](https://www.w3schools.com/react/react_usestate.asp) у React дозволяє нам вказати змінну стану, значення якої зберігається від одного рендерингу компонента до іншого. Початковим значенням є параметр, у цьому випадку — порожній рядок.

Хук `useState` повертає список із двома значеннями:

1. Поточне значення змінної стану.
2. Функція для зміни змінної стану за потреби. Оскільки це хук, щоразу при його виклику компонент рендериться знову.

У цьому випадку ми використовуємо змінну стану для нового привітання, яке користувач хоче встановити.

```tsx
  const [ lastSetterAddress, setLastSetterAddress ] = useState("")
```

Якщо кілька користувачів використовують один і той самий контракт одночасно, вони можуть перезаписати привітання одне одного. Для користувачів це виглядало б так, ніби застосунок працює несправно. Якщо застосунок показує, хто останнім встановив привітання, користувач знатиме, що це був хтось інший, і що застосунок працює правильно.

```tsx
  const [ status, setStatus ] = useState("")
  const [ statusTime, setStatusTime ] = useState(new Date())
```

Користувачам подобається бачити, що їхні дії мають негайний ефект. Однак у блокчейні це не так. Ці змінні стану дозволяють нам принаймні щось відобразити користувачам, щоб вони знали, що їхня дія виконується.

```tsx
  useEffect(() => {
    if (readResults.data) {
      setCurrentGreeting(readResults.data)
      setStatus("Greeting fetched from blockchain")
    }
  }, [readResults.data])
```

Якщо `readResults` вище змінює дані і вони не встановлені на хибне значення (наприклад, `undefined`), оновлюємо поточне привітання на те, що зчитано з блокчейну. Також оновлюємо статус.

```tsx
  useWatchContractEvent({
    address: greeterAddr,
    abi: greeterABI,
    eventName: 'SetGreeting',
    chainId,
```

Слухаємо події `SetGreeting`.

```tsx
    enabled: !!greeterAddr,
```

`!!<value>` означає, що якщо значення дорівнює `false` або значенню, яке обчислюється як хибне, наприклад `undefined`, `0` або порожній рядок, вираз загалом дорівнює `false`. Для будь-якого іншого значення він дорівнює `true`. Це спосіб перетворення значень на логічні, оскільки якщо немає `greeterAddr`, ми не хочемо слухати події.

```tsx
    onLogs: logs => {
      const greetingFromContract = logs[0].args.greeting
      setCurrentGreeting(greetingFromContract)
      setLastSetterAddress(logs[0].args.sender)
      updateStatus("Greeting updated by event")
    },
  })
```

Коли ми бачимо журнали (що відбувається, коли ми бачимо нову подію), це означає, що привітання було змінено. У цьому випадку ми можемо оновити `currentGreeting` та `lastSetterAddress` на нові значення. Також ми хочемо оновити відображення статусу.

```tsx
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus)
    setStatusTime(new Date())
  }
```

Коли ми оновлюємо статус, ми хочемо зробити дві речі:

1. Оновити рядок статусу (`status`)
2. Оновити час останнього оновлення статусу (`statusTime`) на поточний.

```tsx
  const greetingChange = (evt) =>
    setNewGreeting(evt.target.value)
```

Це обробник подій для змін у полі введення нового привітання. Ми могли б вказати тип параметра `evt`, але TypeScript — це мова з необов'язковою типізацією. Оскільки ця функція викликається лише один раз, в обробнику подій HTML, я не думаю, що це необхідно.

```tsx
  const { writeContractAsync } = useWriteContract()
```

Функція для запису в контракт. Вона схожа на [`writeContracts`](https://wagmi.sh/core/api/actions/writeContracts#writecontracts), але забезпечує краще оновлення статусу.

```tsx
  const simulation = useSimulateContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [newGreeting],
    account: account.address    
  })
```

Ось процес надсилання транзакції в блокчейн з точки зору клієнта:

1. Надіслати транзакцію до вузла в блокчейні за допомогою [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas).
2. Дочекатися відповіді від вузла.
3. Коли відповідь отримано, попросити користувача підписати транзакцію через гаманець. Цей крок _повинен_ відбутися після отримання відповіді від вузла, оскільки користувачеві показується вартість газу для транзакції перед її підписанням.
4. Дочекатися схвалення користувача.
5. Надіслати транзакцію знову, цього разу використовуючи [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction).

Крок 2, ймовірно, займе відчутну кількість часу, протягом якого користувачі можуть задаватися питанням, чи була їхня команда отримана інтерфейсом користувача і чому їх ще не просять підписати транзакцію. Це створює поганий користувацький досвід (UX).

Одне з рішень — надсилати `eth_estimateGas` щоразу, коли змінюється параметр. Тоді, коли користувач дійсно захоче надіслати транзакцію (у цьому випадку натиснувши **Update greeting**), вартість газу буде відома, і користувач зможе негайно побачити сторінку гаманця.

```tsx
  return (
```

Тепер ми нарешті можемо створити фактичний HTML для повернення.

```tsx
    <>
      <h2>Greeter</h2>
      {currentGreeting}
```

Показуємо поточне привітання.

```tsx
      {lastSetterAddress && (
        <p>Last updated by {
          lastSetterAddress === account.address ? "you" : lastSetterAddress
        }</p>
      )}
```

Якщо ми знаємо, хто останнім встановив привітання, відображаємо цю інформацію. `Greeter` не відстежує цю інформацію, і ми не хочемо шукати попередні події `SetGreeting`, тому ми отримуємо її лише тоді, коли привітання змінюється під час нашої роботи.

```tsx
      <hr />      
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />      
      <br />
```

Це текстове поле введення, де користувач може встановити нове привітання. Щоразу, коли користувач натискає клавішу, ми викликаємо `greetingChange`, який викликає `setNewGreeting`. Оскільки `setNewGreeting` походить від `useState`, це спричиняє повторний рендеринг компонента `Greeter`. Це означає, що:

- Нам потрібно вказати `value`, щоб зберегти значення нового привітання, оскільки інакше воно повернулося б до значення за замовчуванням — порожнього рядка.
- `simulation` також оновлюється щоразу, коли змінюється `newGreeting`, що означає, що ми отримаємо симуляцію з правильним привітанням. Це може бути важливим, оскільки вартість газу залежить від розміру даних виклику, який залежить від довжини рядка.

```tsx
      <button disabled={!simulation.data}
```

Вмикаємо кнопку лише тоді, коли у нас є інформація, необхідна для надсилання транзакції.

```tsx
        onClick={async () => {
          updateStatus("Please confirm in wallet...")
```

Оновлюємо статус. На цьому етапі користувачеві потрібно підтвердити дію в гаманці.

```tsx
          await writeContractAsync(simulation.data.request)
          updateStatus("Transaction sent, waiting for greeting to change...")
        }}
      >
        Update greeting
      </button>

```

`writeContractAsync` повертає значення лише після того, як транзакція фактично надіслана. Це дозволяє нам показати користувачеві, як довго транзакція очікує на включення в блокчейн.

```tsx
      <h4>Status: {status}</h4>
      <p>Updated <Timer lastUpdate={statusTime} /> </p>
    </>
  )
}
```

Показуємо статус і скільки часу минуло з моменту його оновлення.

```
export {Greeter}
```

Експортуємо компонент.

#### `src/wagmi.ts` {#wagmi-ts}

Нарешті, різні визначення, пов'язані з Wagmi, знаходяться в `src/wagmi.ts`. Я не буду пояснювати тут усе, оскільки більшість із цього — шаблонний код, який вам навряд чи доведеться змінювати.

```ts
import { http, webSocket, createConfig, fallback } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
```

Конфігурація Wagmi включає ланцюги, які підтримуються цим застосунком. Ви можете переглянути [список доступних ланцюгів](https://wagmi.sh/core/api/chains).

```ts
  connectors: [
    injected(),
  ],
```

[Цей конектор](https://wagmi.sh/core/api/connectors/injected) дозволяє нам взаємодіяти з гаманцем, встановленим у браузері.

```ts
  transports: {
    [sepolia.id]: http()
```

Кінцевої точки HTTP за замовчуванням, яка постачається з Viem, цілком достатньо. Якщо ми хочемо іншу URL-адресу, ми можемо використовувати `http("https:// hostname ")` або `webSocket("wss:// hostname ")`.

```ts
  },
  multiInjectedProviderDiscovery: false,
})
```

## Додавання іншого блокчейну {#add-blockchain}

Сьогодні існує багато [рішень для масштабування 2-го рівня (L2)](https://ethereum.org/layer-2/), і ви можете захотіти підтримувати деякі з них, які Viem ще не підтримує. Щоб зробити це, ви змінюєте `src/wagmi.ts`. Ці інструкції пояснюють, як додати [Optimism Sepolia](https://chainlist.org/chain/11155420).

1.  Відредагуйте `src/wagmi.ts`

    A. Імпортуйте тип `defineChain` з Viem.

          ```ts
          import { defineChain } from 'viem'
          ```

    B. Додайте визначення мережі. Насправді вам не потрібно робити це для Optimism Sepolia, [вона вже є в `viem`](https://github.com/wevm/viem/blob/main/src/chains/definitions/optimismSepolia.ts), але таким чином ви дізнаєтеся, як додати блокчейн, якого немає в `viem`.

          ```ts
          const optimismSepolia = defineChain({
              id: 11_155_420,
              name: 'OP Sepolia',
              nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
              rpcUrls: {
                default: {
                  http: ['https://sepolia.optimism.io'],
                  webSocket: ['wss://optimism-sepolia.drpc.org'],
                },
              },
              blockExplorers: {
                default: {
                  name: 'Blockscout',
                  url: 'https://optimism-sepolia.blockscout.com',
                  apiUrl: 'https://optimism-sepolia.blockscout.com/api',
                }
              },
          })
          ```

    C. Додайте новий ланцюг до виклику `createConfig`.

          ```ts
          export const config = createConfig({
            chains: [sepolia, optimismSepolia],
            connectors: [
              injected(),
            ],
            transports: {
              [optimismSepolia.id]: http(),
              [sepolia.id]: http()
            },
            multiInjectedProviderDiscovery: false,
          })
          ```

2.  Відредагуйте `src/App.tsx`, щоб закоментувати автоматичне перемикання на Sepolia. У виробничій системі ви, ймовірно, показали б кнопки з посиланнями на кожен із блокчейнів, які ви підтримуєте.

    ```ts
    /*
    useEffect(() => {
      if (connection.status === 'connected' &&
          connection.chainId !== SEPOLIA_CHAIN_ID
      ) {
        switchChain({ chainId: SEPOLIA_CHAIN_ID })
      }
    }, [connection.status, connection.chainId])
    */
    ```

3.  Відредагуйте `src/Greeter.tsx`, щоб переконатися, що застосунок знає адресу ваших контрактів у новій мережі.

    ```ts
    const contractAddrs: AddressPerBlockchainType = {
      // Optimism Sepolia
      11155420: "0x4dd85791923E9294E934271522f63875EAe5806f",

      // Sepolia
      11155111: "0x7143d5c190F048C8d19fe325b748b081903E3BF0",
    }
    ```

4.  У вашому браузері.

    A. Перейдіть до [ChainList](https://chainlist.org/chain/11155420?testnets=true) і натисніть одну з кнопок у правій частині таблиці, щоб додати ланцюг до свого гаманця.

    B. У застосунку натисніть **Disconnect** (Відключитися), а потім підключіться знову, щоб змінити блокчейн. Існують кращі способи обробки цього, але вони вимагатимуть змін у застосунку.

## Висновок {#conclusion}

Звісно, вас не дуже цікавить надання інтерфейсу користувача для `Greeter`. Ви хочете створити інтерфейс користувача для власних контрактів. Щоб створити власний застосунок, виконайте ці кроки:

1. Вкажіть створення застосунку Wagmi.

   ```sh copy
   npm create wagmi
   ```

2. Введіть `y`, щоб продовжити.

3. Назвіть застосунок.

4. Виберіть фреймворк **React**.

5. Виберіть варіант **Vite**.

Тепер ідіть і зробіть свої контракти зручними для використання у всьому світі.

[Більше моїх робіт дивіться тут](https://cryptodocguy.pro/).