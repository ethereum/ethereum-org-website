---
title: "Создание пользовательского интерфейса для вашего контракта"
description: "Используя современные компоненты, такие как TypeScript, React, Vite и Wagmi, мы рассмотрим современный, но минималистичный пользовательский интерфейс и узнаем, как подключить кошелек к пользовательскому интерфейсу, вызвать смарт-контракт для чтения информации, отправить транзакцию в смарт-контракт и отслеживать события из смарт-контракта для выявления изменений."
author: Ори Померанц
tags: ["typescript", "react", "vite", "wagmi", "фронтенд"]
skill: beginner
breadcrumb: Пользовательский интерфейс с WAGMI
published: 2023-11-01
lang: ru
sidebarDepth: 3
---

Вы нашли функцию, которая нужна в экосистеме Эфириума. Вы написали смарт-контракты для ее реализации и, возможно, даже некоторый связанный код, который работает офчейн. Это здорово! К сожалению, без пользовательского интерфейса у вас не будет пользователей, а в последний раз, когда вы писали веб-сайт, люди использовали dial-up модемы, и JavaScript был в новинку.

Эта статья для вас. Я предполагаю, что вы умеете программировать и, возможно, немного знаете JavaScript и HTML, но ваши навыки создания пользовательских интерфейсов заржавели и устарели. Вместе мы рассмотрим простое современное приложение, чтобы вы увидели, как это делается в наши дни.

## Почему это важно {#why-important}

В теории, вы могли бы просто предложить людям использовать [Etherscan](https://sepolia.etherscan.io/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA#readContract) или [Blockscout](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_write_contract) для взаимодействия с вашими контрактами. Это отлично подходит для опытных пользователей Эфириума. Но мы пытаемся охватить [еще один миллиард человек](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion). Этого не произойдет без отличного пользовательского опыта, и дружелюбный пользовательский интерфейс — большая часть этого.

## Приложение Greeter {#greeter-app}

Существует много теории о том, как работает современный пользовательский интерфейс, и [множество хороших сайтов](https://react.dev/learn/thinking-in-react), [которые это объясняют](https://wagmi.sh/core/getting-started). Вместо того чтобы повторять прекрасную работу, проделанную этими сайтами, я предполагаю, что вы предпочитаете учиться на практике и начать с приложения, с которым можно поэкспериментировать. Вам все еще нужна теория, чтобы доводить дело до конца, и мы к ней перейдем — мы просто будем разбирать исходный файл за исходным файлом и обсуждать все по мере поступления.

### Установка {#installation}

1. Приложение использует тестовую сеть [Sepolia](https://sepolia.dev/). При необходимости [получите тестовые ETH в Sepolia](/developers/docs/networks/#sepolia) и [добавьте Sepolia в свой кошелек](https://chainlist.org/chain/11155111).

2. Клонируйте репозиторий GitHub и установите необходимые пакеты.

   ```sh
   git clone https://github.com/qbzzt/260301-modern-ui-web3.git
   cd 260301-modern-ui-web3
   npm install
   ```

3. Приложение использует бесплатные точки доступа, которые имеют ограничения по производительности. Если вы хотите использовать провайдера [узлов как услугу (Node as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service/), замените URL-адреса в [`src/wagmi.ts`](#wagmi-ts).

4. Запустите приложение.

   ```sh
   npm run dev
   ```

5. Перейдите по URL-адресу, показанному приложением. В большинстве случаев это [http://localhost:5173/](http://localhost:5173/).

6. Вы можете посмотреть исходный код контракта, модифицированную версию Greeter от Hardhat, [в обозревателе блокчейна](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code).

### Обзор файлов {#file-walk-through}

#### `index.html` {#index-html}

Этот файл представляет собой стандартный шаблон HTML, за исключением этой строки, которая импортирует файл скрипта.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

Расширение файла указывает на то, что это [компонент React](https://www.w3schools.com/react/react_components.asp), написанный на [TypeScript](https://www.typescriptlang.org/), расширении JavaScript, которое поддерживает [проверку типов](https://en.wikipedia.org/wiki/Type_system#Type_checking). TypeScript компилируется в JavaScript, поэтому мы можем использовать его на стороне клиента.

Этот файл в основном объясняется на случай, если вам интересно. Обычно вы не изменяете этот файл, а работаете с [`src/App.tsx`](#app-tsx) и файлами, которые он импортирует.

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
```

Импортируем необходимый код библиотеки.

```tsx
import App from './App.tsx'
```

Импортируем компонент React, который реализует приложение (см. ниже).

```tsx
import { config } from './wagmi.ts'
```

Импортируем конфигурацию [Wagmi](https://wagmi.sh/), которая включает конфигурацию блокчейна.

```tsx
const queryClient = new QueryClient()
```

Создает новый экземпляр менеджера кэша [React Query](https://tanstack.com/query/latest/docs/framework/react/overview). Этот объект будет хранить:

- Кэшированные вызовы RPC
- Чтения контрактов
- Состояние фонового повторного запроса данных

Нам нужен менеджер кэша, потому что Wagmi v3 использует React Query внутри.

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

Создаем корневой компонент React. Параметром для `render` является [JSX](https://www.w3schools.com/react/react_jsx.asp), язык расширения, который использует как HTML, так и JavaScript/TypeScript. Восклицательный знак здесь говорит компоненту TypeScript: «ты не знаешь, что `document.getElementById('root')` будет допустимым параметром для `ReactDOM.createRoot`, но не волнуйся — я разработчик, и я говорю тебе, что так и будет».

```tsx
  <React.StrictMode>
```

Приложение помещается внутрь [компонента `React.StrictMode`](https://react.dev/reference/react/StrictMode). Этот компонент указывает библиотеке React вставлять дополнительные проверки отладки, что полезно во время разработки.

```tsx
    <WagmiProvider config={config}>
```

Приложение также находится внутри [компонента `WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider). [Библиотека Wagmi (мы собираемся ее создать)](https://wagmi.sh/) связывает определения пользовательского интерфейса React с [библиотекой Viem](https://viem.sh/) для написания децентрализованного приложения (dapp) Эфириума.

```tsx
      <QueryClientProvider client={queryClient}>
```

И, наконец, добавляем провайдер React Query, чтобы любой компонент приложения мог использовать кэшированные запросы.

```tsx
        <App />
```

Теперь мы можем добавить компонент для приложения, который фактически реализует пользовательский интерфейс. `/>` в конце компонента сообщает React, что внутри этого компонента нет никаких определений, согласно стандарту XML.

```tsx
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
```

Конечно, мы должны закрыть остальные компоненты.

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

Импортируем необходимые библиотеки, а также [компонент `Greeter`](#greeter-tsx).

```tsx
const SEPOLIA_CHAIN_ID = 11155111
```

Идентификатор цепи Sepolia.

```
function App() {
```

Это стандартный способ создания компонента React: определить функцию, которая вызывается всякий раз, когда ее нужно отрендерить. Эта функция обычно содержит код TypeScript или JavaScript, за которым следует оператор `return`, возвращающий код JSX.

```tsx
  const connection = useConnection()
```

Используйте [`useConnection`](https://wagmi.sh/react/api/hooks/useConnection) для получения информации, связанной с текущим подключением, такой как адрес и `chainId`.

По соглашению, в React функции, начинающиеся с `use...`, называются [хуками](https://www.w3schools.com/react/react_hooks.asp). Эти функции не просто возвращают данные компоненту; они также гарантируют его повторный рендеринг (функция компонента выполняется снова, и ее вывод заменяет предыдущий в HTML) при изменении этих данных.

```tsx
  const { connectors, connect, status, error } = useConnect()
```

Используйте [`useConnect`](https://wagmi.sh/react/api/hooks/useConnect) для получения информации о подключении кошелька.

```tsx
  const { disconnect } = useDisconnect()
```

[Этот хук](https://wagmi.sh/react/api/hooks/useDisconnect) предоставляет нам функцию для отключения от кошелька.

```tsx
  const { switchChain } = useSwitchChain()
```

[Этот хук](https://wagmi.sh/react/api/hooks/useSwitchChain) позволяет нам переключать цепи.

```tsx
  useEffect(() => {
```

Хук React [`useEffect`](https://react.dev/reference/react/useEffect) позволяет запускать функцию всякий раз, когда изменяется значение переменной, для синхронизации внешней системы.

```tsx
    if (connection.status === 'connected' &&
        connection.chainId !== SEPOLIA_CHAIN_ID
    ) {
      switchChain({ chainId: SEPOLIA_CHAIN_ID })
    }
```

Если мы подключены, но не к блокчейну Sepolia, переключаемся на Sepolia.

```tsx
  }, [connection.status, connection.chainId])
```

Перезапускаем функцию каждый раз, когда изменяется статус подключения или chainId подключения.

```tsx
  return (
    <>
```

JSX компонента React _должен_ возвращать один HTML-компонент. Когда у нас есть несколько компонентов и нам не нужен контейнер для их обертывания, мы используем пустой компонент (`<> ... </>`), чтобы объединить их в один компонент.

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

Предоставляем информацию о текущем подключении. Внутри JSX `{<expression>}` означает вычисление выражения как JavaScript.

```tsx
      {connection.status === 'connected' && (
```

Синтаксис `{<condition> && <value>} means "if the condition is `true`, evaluate to the value; if it isn't, evaluate to `false`».

Это стандартный способ вставки операторов if внутрь JSX.

```tsx
        <div>
          <Greeter />
          <hr />
```

JSX следует стандарту XML, который строже HTML. Если у тега нет соответствующего закрывающего тега, он _должен_ иметь косую черту (`/`) в конце для его закрытия.

Здесь у нас есть два таких тега: `<Greeter />` (который фактически содержит HTML-код, взаимодействующий с контрактом) и [`<HTML-PLACEHOLDER-HTMLTAG-8d9513 />` для горизонтальной линии](https://www.w3schools.com/tags/tag_hr.asp).

```tsx
          <button type="button" onClick={disconnect}>
            Disconnect
          </button>
        </div>
      )}
```

Если пользователь нажимает эту кнопку, вызывается функция `disconnect`.

```tsx
      {connection.status !== 'connected' && (
```

Если мы _не_ подключены, показываем необходимые параметры для подключения к кошельку.

```tsx
        <div>
          <h2>Connect</h2>
          {connectors.map((connector) => (
```

В `connectors` у нас есть список коннекторов. Мы используем [`map`](https://www.w3schools.com/jsref/jsref_map.asp), чтобы превратить его в список кнопок JSX для отображения.

```tsx
            <button
              key={connector.uid}
```

В JSX необходимо, чтобы «родственные» теги (теги, происходящие от одного родителя) имели разные идентификаторы.

```tsx
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
```

Кнопки коннекторов.

```tsx
          <div>{status}</div>
          <div>{error?.message}</div>
        </div>
      )}
```

Предоставляем дополнительную информацию. Синтаксис выражения `<variable>?.<field>` сообщает JavaScript, что если переменная определена, нужно вычислить это поле. Если переменная не определена, то это выражение вычисляется как `undefined`.

Выражение `error.message`, когда нет ошибки, вызвало бы исключение. Использование `error?.message` позволяет нам избежать этой проблемы.

#### `src/Greeter.tsx` {#greeter-tsx}

Этот файл содержит большую часть функциональности пользовательского интерфейса. Он включает определения, которые обычно находятся в нескольких файлах, но поскольку это руководство, программа оптимизирована для простоты понимания с первого раза, а не для производительности или простоты обслуживания.

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

Мы используем эти библиотечные функции. Опять же, они объясняются ниже, там, где они используются.

```tsx
import { AddressType } from 'abitype'
```

[Библиотека `abitype`](https://abitype.dev/) предоставляет нам определения TypeScript для различных типов данных Эфириума, таких как [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  { "type": "function", "name": "greet", ... },
  { "type": "function", "name": "setGreeting", ... },
  { "type": "event", "name": "SetGreeting", ... },
] as const   // greeterABI
```

ABI для контракта `Greeter`.
Если вы разрабатываете контракты и пользовательский интерфейс одновременно, вы обычно помещаете их в один репозиторий и используете ABI, сгенерированный компилятором Solidity, в качестве файла в вашем приложении. Однако здесь это не обязательно, поскольку контракт уже разработан и не изменится.

Мы используем [`as const`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions), чтобы сообщить TypeScript, что это _настоящая_ константа. Обычно, когда вы указываете в JavaScript `const x = {"a": 1}`, вы можете изменить значение в `x`, вы просто не можете присвоить ему новое значение.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript строго типизирован. Мы используем это определение, чтобы указать адрес, по которому развернут контракт `Greeter` в различных цепях. Ключом является число (chainId), а значением — `AddressType` (адрес).

```tsx
const contractAddrs : AddressPerBlockchainType = {
  // Sepolia
    11155111: '0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA'
}
```

Адрес контракта в [Sepolia](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract).

##### Компонент `Timer` {#timer-component}

Компонент `Timer` показывает количество секунд, прошедших с заданного времени. Это важно для удобства использования. Когда пользователи что-то делают, они ожидают немедленной реакции. В блокчейнах это часто невозможно, потому что ничего не происходит до тех пор, пока транзакция не будет помещена в блок. Одно из решений — показать, сколько времени прошло с тех пор, как пользователь выполнил действие, чтобы он мог решить, является ли требуемое время разумным.

```tsx
type TimerProps = {
  lastUpdate: Date
}
```

Компонент `Timer` принимает один параметр, `lastUpdate`, который является временем последнего действия.

```tsx
const Timer = ({ lastUpdate }: TimerProps) => {
  const [_, setNow] = useState(new Date())
```

Нам нужно иметь состояние (переменную, привязанную к компоненту) и обновлять его для правильной работы компонента. Но нам никогда не нужно его читать, поэтому не утруждайте себя созданием переменной.

```tsx
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
```

Функция [`setInterval`](https://www.w3schools.com/jsref/met_win_setinterval.asp) позволяет нам запланировать периодическое выполнение функции. В данном случае — каждую секунду. Функция вызывает `setNow` для обновления состояния, поэтому компонент `Timer` будет отрендерен повторно. Мы оборачиваем это в [`useEffect`](https://react.dev/reference/react/useEffect) с пустым списком зависимостей, чтобы это произошло только один раз, а не каждый раз при рендеринге компонента.

```tsx
  const secondsSinceUpdate = Math.floor(
    (Date.now() - lastUpdate.getTime()) / 1000
  )

  return (
    <span>{secondsSinceUpdate} seconds ago</span>
  )
}
```

Вычисляем количество секунд с момента последнего обновления и возвращаем его.

##### Компонент `Greeter` {#greeter-component}

```tsx
const Greeter = () => {
```

Наконец, мы переходим к определению компонента.

```tsx
  const chainId = useChainId()
  const account = useAccount()
```

Информация об используемой нами цепи и аккаунте, любезно предоставленная [Wagmi](https://wagmi.sh/). Поскольку это хук (`use...`), компонент рендерится повторно всякий раз, когда эта информация изменяется.

```tsx
  const greeterAddr = chainId && contractAddrs[chainId] 
```

Адрес контракта Greeter, который равен `undefined`, если у нас нет информации о цепи или мы находимся в цепи без этого контракта.

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet", // Без аргументов
  })
```

[Хук `useReadContract`](https://wagmi.sh/react/api/hooks/useReadContract) вызывает функцию `greet` [контракта](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract).

```tsx
  const [ currentGreeting, setCurrentGreeting ] = 
    useState("Please wait while we fetch the greeting from the blockchain...")
  const [ newGreeting, setNewGreeting ] = useState("")
```

[Хук `useState`](https://www.w3schools.com/react/react_usestate.asp) в React позволяет нам указать переменную состояния, значение которой сохраняется от одного рендеринга компонента к другому. Начальным значением является параметр, в данном случае пустая строка.

Хук `useState` возвращает список с двумя значениями:

1. Текущее значение переменной состояния.
2. Функция для изменения переменной состояния при необходимости. Поскольку это хук, каждый раз при его вызове компонент рендерится снова.

В данном случае мы используем переменную состояния для нового приветствия, которое пользователь хочет установить.

```tsx
  const [ lastSetterAddress, setLastSetterAddress ] = useState("")
```

Если несколько пользователей используют один и тот же контракт одновременно, они могут перезаписать приветствия друг друга. Пользователям это может показаться неисправностью приложения. Если приложение показывает, кто последним установил приветствие, пользователь будет знать, что это был кто-то другой, и что приложение работает правильно.

```tsx
  const [ status, setStatus ] = useState("")
  const [ statusTime, setStatusTime ] = useState(new Date())
```

Пользователям нравится видеть, что их действия имеют немедленный эффект. Однако в блокчейне это не так. Эти переменные состояния позволяют нам по крайней мере отображать что-то пользователям, чтобы они знали, что их действие выполняется.

```tsx
  useEffect(() => {
    if (readResults.data) {
      setCurrentGreeting(readResults.data)
      setStatus("Greeting fetched from blockchain")
    }
  }, [readResults.data])
```

Если `readResults` выше изменяет данные и они не установлены в ложное значение (например, `undefined`), обновляем текущее приветствие на то, которое прочитано из блокчейна. Также обновляем статус.

```tsx
  useWatchContractEvent({
    address: greeterAddr,
    abi: greeterABI,
    eventName: 'SetGreeting',
    chainId,
```

Слушаем события `SetGreeting`.

```tsx
    enabled: !!greeterAddr,
```

`!!<value>` означает, что если значение равно `false` или значению, которое вычисляется как ложное, например `undefined`, `0` или пустая строка, выражение в целом равно `false`. Для любого другого значения оно равно `true`. Это способ преобразования значений в логические, потому что если нет `greeterAddr`, мы не хотим слушать события.

```tsx
    onLogs: logs => {
      const greetingFromContract = logs[0].args.greeting
      setCurrentGreeting(greetingFromContract)
      setLastSetterAddress(logs[0].args.sender)
      updateStatus("Greeting updated by event")
    },
  })
```

Когда мы видим логи (что происходит, когда мы видим новое событие), это означает, что приветствие было изменено. В этом случае мы можем обновить `currentGreeting` и `lastSetterAddress` до новых значений. Также мы хотим обновить отображение статуса.

```tsx
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus)
    setStatusTime(new Date())
  }
```

Когда мы обновляем статус, мы хотим сделать две вещи:

1. Обновить строку статуса (`status`)
2. Обновить время последнего обновления статуса (`statusTime`) на текущее.

```tsx
  const greetingChange = (evt) =>
    setNewGreeting(evt.target.value)
```

Это обработчик событий для изменений в поле ввода нового приветствия. Мы могли бы указать тип параметра `evt`, но TypeScript — это язык с опциональной типизацией. Поскольку эта функция вызывается только один раз, в обработчике событий HTML, я не думаю, что это необходимо.

```tsx
  const { writeContractAsync } = useWriteContract()
```

Функция для записи в контракт. Она похожа на [`writeContracts`](https://wagmi.sh/core/api/actions/writeContracts#writecontracts), но обеспечивает лучшее обновление статуса.

```tsx
  const simulation = useSimulateContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [newGreeting],
    account: account.address    
  })
```

Вот процесс отправки транзакции в блокчейн с точки зрения клиента:

1. Отправить транзакцию на узел в блокчейне с помощью [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas).
2. Дождаться ответа от узла.
3. Когда ответ получен, попросить пользователя подписать транзакцию через кошелек. Этот шаг _должен_ произойти после получения ответа от узла, потому что пользователю показывается стоимость газа для транзакции перед ее подписанием.
4. Дождаться одобрения пользователя.
5. Отправить транзакцию снова, на этот раз используя [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction).

Шаг 2, вероятно, займет ощутимое количество времени, в течение которого пользователи могут задаваться вопросом, была ли их команда получена пользовательским интерфейсом и почему их еще не просят подписать транзакцию. Это создает плохой пользовательский опыт (UX).

Одно из решений — отправлять `eth_estimateGas` каждый раз при изменении параметра. Тогда, когда пользователь действительно захочет отправить транзакцию (в данном случае нажав **Update greeting**), стоимость газа будет известна, и пользователь сможет сразу увидеть страницу кошелька.

```tsx
  return (
```

Теперь мы наконец можем создать фактический HTML для возврата.

```tsx
    <>
      <h2>Greeter</h2>
      {currentGreeting}
```

Показываем текущее приветствие.

```tsx
      {lastSetterAddress && (
        <p>Last updated by {
          lastSetterAddress === account.address ? "you" : lastSetterAddress
        }</p>
      )}
```

Если мы знаем, кто последним установил приветствие, отображаем эту информацию. `Greeter` не отслеживает эту информацию, и мы не хотим искать прошлые события `SetGreeting`, поэтому мы получаем ее только после того, как приветствие будет изменено во время нашей работы.

```tsx
      <hr />      
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />      
      <br />
```

Это текстовое поле ввода, где пользователь может установить новое приветствие. Каждый раз, когда пользователь нажимает клавишу, мы вызываем `greetingChange`, который вызывает `setNewGreeting`. Поскольку `setNewGreeting` исходит из `useState`, это вызывает повторный рендеринг компонента `Greeter`. Это означает, что:

- Нам нужно указать `value`, чтобы сохранить значение нового приветствия, потому что в противном случае оно вернется к значению по умолчанию — пустой строке.
- `simulation` также обновляется каждый раз при изменении `newGreeting`, что означает, что мы получим симуляцию с правильным приветствием. Это может быть важно, поскольку стоимость газа зависит от размера данных вызова, который зависит от длины строки.

```tsx
      <button disabled={!simulation.data}
```

Включаем кнопку только тогда, когда у нас есть информация, необходимая для отправки транзакции.

```tsx
        onClick={async () => {
          updateStatus("Please confirm in wallet...")
```

Обновляем статус. На этом этапе пользователю необходимо подтвердить действие в кошельке.

```tsx
          await writeContractAsync(simulation.data.request)
          updateStatus("Transaction sent, waiting for greeting to change...")
        }}
      >
        Update greeting
      </button>

```

`writeContractAsync` возвращается только после фактической отправки транзакции. Это позволяет нам показать пользователю, как долго транзакция ожидала включения в блокчейн.

```tsx
      <h4>Status: {status}</h4>
      <p>Updated <Timer lastUpdate={statusTime} /> </p>
    </>
  )
}
```

Показываем статус и сколько времени прошло с момента его обновления.

```
export {Greeter}
```

Экспортируем компонент.

#### `src/wagmi.ts` {#wagmi-ts}

Наконец, различные определения, связанные с Wagmi, находятся в `src/wagmi.ts`. Я не буду объяснять здесь все, потому что большая часть этого — шаблонный код, который вам вряд ли понадобится менять.

```ts
import { http, webSocket, createConfig, fallback } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
```

Конфигурация Wagmi включает цепи, поддерживаемые этим приложением. Вы можете посмотреть [список доступных цепей](https://wagmi.sh/core/api/chains).

```ts
  connectors: [
    injected(),
  ],
```

[Этот коннектор](https://wagmi.sh/core/api/connectors/injected) позволяет нам взаимодействовать с кошельком, установленным в браузере.

```ts
  transports: {
    [sepolia.id]: http()
```

Конечной точки HTTP по умолчанию, которая поставляется с Viem, вполне достаточно. Если мы хотим использовать другой URL-адрес, мы можем использовать `http("https:// hostname ")` или `webSocket("wss:// hostname ")`.

```ts
  },
  multiInjectedProviderDiscovery: false,
})
```

## Добавление другого блокчейна {#add-blockchain}

В наши дни существует множество [решений для масштабирования второго уровня (L2)](https://ethereum.org/layer-2/), и вы, возможно, захотите поддерживать некоторые из них, которые Viem еще не поддерживает. Для этого вы изменяете `src/wagmi.ts`. Эти инструкции объясняют, как добавить [Optimism Sepolia](https://chainlist.org/chain/11155420).

1.  Отредактируйте `src/wagmi.ts`

    A. Импортируйте тип `defineChain` из Viem.

          ```ts
          import { defineChain } from 'viem'
          ```

    B. Добавьте определение сети. На самом деле вам не нужно делать это для Optimism Sepolia, [она уже есть в `viem`](https://github.com/wevm/viem/blob/main/src/chains/definitions/optimismSepolia.ts), но таким образом вы узнаете, как добавить блокчейн, которого нет в `viem`.

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

    C. Добавьте новую цепь в вызов `createConfig`.

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

2.  Отредактируйте `src/App.tsx`, чтобы закомментировать автоматическое переключение на Sepolia. В рабочей системе вы, вероятно, показали бы кнопки со ссылками на каждый из поддерживаемых вами блокчейнов.

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

3.  Отредактируйте `src/Greeter.tsx`, чтобы убедиться, что приложение знает адрес ваших контрактов в новой сети.

    ```ts
    const contractAddrs: AddressPerBlockchainType = {
      // Optimism Sepolia
      11155420: "0x4dd85791923E9294E934271522f63875EAe5806f",

      // Sepolia
      11155111: "0x7143d5c190F048C8d19fe325b748b081903E3BF0",
    }
    ```

4.  В вашем браузере.

    A. Перейдите на [ChainList](https://chainlist.org/chain/11155420?testnets=true) и нажмите одну из кнопок в правой части таблицы, чтобы добавить цепь в свой кошелек.

    B. В приложении нажмите **Disconnect** (Отключиться), а затем снова подключитесь, чтобы изменить блокчейн. Есть более изящные способы справиться с этим, но они потребуют изменений в приложении.

## Заключение {#conclusion}

Конечно, вас не особо волнует предоставление пользовательского интерфейса для `Greeter`. Вы хотите создать пользовательский интерфейс для своих собственных контрактов. Чтобы создать собственное приложение, выполните следующие действия:

1. Укажите создание приложения Wagmi.

   ```sh copy
   npm create wagmi
   ```

2. Введите `y`, чтобы продолжить.

3. Назовите приложение.

4. Выберите фреймворк **React**.

5. Выберите вариант **Vite**.

Теперь идите и сделайте свои контракты пригодными для использования во всем мире.

[Смотрите здесь больше моих работ](https://cryptodocguy.pro/).