---
title: "Создание пользовательского интерфейса для вашего контракта"
description: "Используя современные компоненты, такие как TypeScript, React, Vite и Wagmi, мы рассмотрим современный, но минимальный пользовательский интерфейс и научимся подключать кошелек к пользовательскому интерфейсу, вызывать смарт-контракт для чтения информации, отправлять транзакцию в смарт-контракт и отслеживать события со смарт-контракта для выявления изменений."
author: "Ори Померанц"
tags: [ "typescript", "react", "vite", "wagmi", "интерфейс" ]
skill: beginner
published: 2023-11-01
lang: ru
sidebarDepth: 3
---

Вы нашли функцию, которая нам нужна в экосистеме Ethereum. Вы написали смарт-контракты для ее реализации и, возможно, даже какой-то связанный с этим код, который выполняется вне сети. Это здорово! К сожалению, без пользовательского интерфейса у вас не будет пользователей, а в последний раз, когда вы писали веб-сайт, люди пользовались модемами с коммутируемым доступом, а JavaScript был в новинку.

Эта статья для вас. Я предполагаю, что вы знаете программирование и, возможно, немного JavaScript и HTML, но ваши навыки работы с пользовательским интерфейсом устарели. Вместе мы рассмотрим простое современное приложение, чтобы вы увидели, как это делается в наши дни.

## Почему это важно {#why-important}

Теоретически вы могли бы просто позволить людям использовать [Etherscan](https://holesky.etherscan.io/address/0x432d810484add7454ddb3b5311f0ac2e95cecea8#writeContract) или [Blockscout](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=write_contract) для взаимодействия с вашими контрактами. Это будет отлично для опытных пользователей Ethereum. Но мы пытаемся обслужить [еще миллиард человек](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion). Этого не произойдет без отличного пользовательского опыта, а дружественный пользовательский интерфейс — большая его часть.

## Приложение Greeter {#greeter-app}

Существует много теории о том, как работает современный пользовательский интерфейс, и [много хороших сайтов](https://react.dev/learn/thinking-in-react), [которые это объясняют](https://wagmi.sh/core/getting-started). Вместо того чтобы повторять прекрасную работу, проделанную на этих сайтах, я предположу, что вы предпочитаете учиться на практике и начнете с приложения, с которым можно поиграть. Вам все еще нужна теория, чтобы все сделать, и мы до нее доберемся — мы просто будем разбирать исходный файл за исходным файлом и обсуждать все по мере их появления.

### Установка {#installation}

1. При необходимости добавьте [блокчейн Holesky](https://chainlist.org/?search=holesky&testnets=true) в свой кошелек и [получите тестовые ETH](https://www.holeskyfaucet.io/).

2. Клонируйте репозиторий github.

   ```sh
   git clone https://github.com/qbzzt/20230801-modern-ui.git
   ```

3. Установить нужные пакеты.

   ```sh
   cd 20230801-modern-ui
   pnpm install
   ```

4. Запустите приложение.

   ```sh
   pnpm dev
   ```

5. Перейдите по URL-адресу, указанному в приложении. В большинстве случаев это [http://localhost:5173/](http://localhost:5173/).

6. Вы можете увидеть исходный код контракта, немного измененную версию Greeter от Hardhat, [в обозревателе блокчейна](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contract).

### Обзор файлов {#file-walk-through}

#### `index.html` {#index-html}

Этот файл является стандартным шаблоном HTML, за исключением этой строки, которая импортирует файл скрипта.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

Расширение файла говорит нам, что этот файл является [компонентом React](https://www.w3schools.com/react/react_components.asp), написанным на [TypeScript](https://www.typescriptlang.org/), расширении JavaScript, которое поддерживает [проверку типов](https://en.wikipedia.org/wiki/Type_system#Type_checking). TypeScript компилируется в JavaScript, поэтому мы можем использовать его для выполнения на стороне клиента.

```tsx
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { chains, config } from './wagmi'
```

Импортируйте необходимый код библиотеки.

```tsx
import { App } from './App'
```

Импортируйте компонент React, который реализует приложение (см. ниже).

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

Создайте корневой компонент React. Параметр `render` — это [JSX](https://www.w3schools.com/react/react_jsx.asp), язык-расширение, который использует как HTML, так и JavaScript/TypeScript. Восклицательный знак здесь говорит компоненту TypeScript: "вы не знаете, что `document.getElementById('root')` будет допустимым параметром для `ReactDOM.createRoot`, но не волнуйтесь - я разработчик и я говорю вам, что он будет".

```tsx
  <React.StrictMode>
```

Приложение находится внутри [компонента `React.StrictMode`](https://react.dev/reference/react/StrictMode). Этот компонент указывает библиотеке React вставлять дополнительные проверки для отладки, что полезно во время разработки.

```tsx
    <WagmiConfig config={config}>
```

Приложение также находится внутри [компонента `WagmiConfig`](https://wagmi.sh/react/api/WagmiProvider). [Библиотека wagmi (we are going to make it)](https://wagmi.sh/) соединяет определения пользовательского интерфейса React с [библиотекой viem](https://viem.sh/) для написания децентрализованного приложения Ethereum.

```tsx
      <RainbowKitProvider chains={chains}>
```

И, наконец, [компонент `RainbowKitProvider`](https://www.rainbowkit.com/). Этот компонент обрабатывает вход в систему и связь между кошельком и приложением.

```tsx
        <App />
```

Теперь у нас может быть компонент для приложения, который фактически реализует пользовательский интерфейс. Символ `/>` в конце компонента говорит React, что этот компонент не содержит никаких определений внутри себя, согласно стандарту XML.

```tsx
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
```

Конечно, мы должны закрыть другие компоненты.

#### `src/App.tsx` {#app-tsx}

```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Greeter } from './components/Greeter'

export function App() {
```

Это стандартный способ создания компонента React — определить функцию, которая вызывается каждый раз, когда ее нужно отрисовать. Эта функция обычно содержит в начале некоторый код TypeScript или JavaScript, за которым следует оператор `return`, возвращающий код JSX.

```tsx
  const { isConnected } = useAccount()
```

Здесь мы используем [`useAccount`](https://wagmi.sh/react/api/hooks/useAccount), чтобы проверить, подключены ли мы к блокчейну через кошелек или нет.

По соглашению, в React функции, называемые `use...`, являются [хуками](https://www.w3schools.com/react/react_hooks.asp), которые возвращают какие-либо данные. Когда вы используете такие хуки, ваш компонент не только получает данные, но и при изменении этих данных компонент повторно отрисовывается с обновленной информацией.

```tsx
  return (
    <>
```

JSX компонента React _должен_ возвращать один компонент. Когда у нас несколько компонентов, и нет ничего, что оборачивает их "естественным образом", мы используем пустой компонент (`<> ...` </>`) чтобы сделать из них один компонент.

```tsx
      <h1>Greeter</h1>
      <ConnectButton />
```

Мы получаем [компонент `ConnectButton`](https://www.rainbowkit.com/docs/connect-button) из RainbowKit. Когда мы не подключены, он предоставляет нам кнопку `Connect Wallet`, которая открывает модальное окно, объясняющее, что такое кошельки, и позволяющее выбрать, какой из них использовать. Когда мы подключены, он отображает используемый нами блокчейн, адрес нашего аккаунта и баланс ETH. Мы можем использовать эти дисплеи для переключения сети или для отключения.

```tsx
      {isConnected && (
```

Когда нам нужно вставить фактический JavaScript (или TypeScript, который будет скомпилирован в JavaScript) в JSX, мы используем скобки (`{}`).

Синтаксис `a && b` является сокращением для [`a ?` b : a`](https://www.w3schools.com/react/react_es6_ternary.asp). То есть, если `a`истинно, оно вычисляется как`b`, а в противном случае — как `a`(которое может быть`false`, `0` и т.д.). Это простой способ сообщить React, что компонент должен отображаться только при выполнении определенного условия.

В этом случае мы хотим показывать пользователю `Greeter` только если пользователь подключен к блокчейну.

```tsx
          <Greeter />
      )}
    </>
  )
}
```

#### `src/components/Greeter.tsx` {#greeter-tsx}

Этот файл содержит большую часть функциональности пользовательского интерфейса. Он включает определения, которые обычно находятся в нескольких файлах, но поскольку это учебное пособие, программа оптимизирована для простоты понимания с первого раза, а не для производительности или простоты обслуживания.

```tsx
import { useState, ChangeEventHandler } from 'react'
import {  useNetwork,
          useReadContract,
          usePrepareContractWrite,
          useContractWrite,
          useContractEvent
        } from 'wagmi'
```

Мы используем эти функции библиотеки. Опять же, они объясняются ниже, там, где они используются.

```tsx
import { AddressType } from 'abitype'
```

[Библиотека `abitype`](https://abitype.dev/) предоставляет нам определения TypeScript для различных типов данных Ethereum, таких как [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  .
  .
  .
] as const   // greeterABI
```

ABI для контракта `Greeter`.
Если вы разрабатываете контракты и пользовательский интерфейс одновременно, вы обычно помещаете их в один репозиторий и используете ABI, сгенерированный компилятором Solidity, как файл в вашем приложении. Однако здесь это не обязательно, потому что контракт уже разработан и меняться не будет.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript строго типизирован. Мы используем это определение, чтобы указать адрес, по которому контракт `Greeter` развернут в разных сетях. Ключ — это число (chainId), а значение — `AddressType` (адрес).

```tsx
const contractAddrs: AddressPerBlockchainType = {
  // Holesky
  17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',

  // Sepolia
  11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
}
```

Адрес контракта в двух поддерживаемых сетях: [Holesky](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contact_code) и [Sepolia](https://eth-sepolia.blockscout.com/address/0x7143d5c190F048C8d19fe325b748b081903E3BF0?tab=contact_code).

Примечание: на самом деле есть третье определение, для Redstone Holesky, оно будет объяснено ниже.

```tsx
type ShowObjectAttrsType = {
  name: string,
  object: any
}
```

Этот тип используется в качестве параметра для компонента `ShowObject` (объяснение будет позже). Он включает имя объекта и его значение, которые отображаются в целях отладки.

```tsx
type ShowGreetingAttrsType = {
  greeting: string | undefined
}
```

В любой момент времени мы можем либо знать, что такое приветствие (потому что мы прочитали его из блокчейна), либо не знать (потому что мы его еще не получили). Поэтому полезно иметь тип, который может быть либо строкой, либо ничем.

##### Компонент `Greeter` {#greeter-component}

```tsx
const Greeter = () => {
```

Наконец, мы переходим к определению компонента.

```tsx
  const { chain } = useNetwork()
```

Информация о сети, которую мы используем, предоставленная [wagmi](https://wagmi.sh/react/hooks/useNetwork).
Поскольку это хук (`use...`), каждый раз, когда эта информация меняется, компонент перерисовывается.

```tsx
  const greeterAddr = chain && contractAddrs[chain.id]
```

Адрес контракта Greeter, который зависит от сети (и который равен `undefined`, если у нас нет информации о сети или мы находимся в сети без этого контракта).

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet" , // Нет аргументов
    watch: true
  })
```

[Хук `useReadContract`](https://wagmi.sh/react/api/hooks/useReadContract) читает информацию из контракта. Вы можете точно увидеть, какую информацию он возвращает, раскрыв `readResults` в пользовательском интерфейсе. В этом случае мы хотим, чтобы он продолжал отслеживать, чтобы мы были проинформированы, когда приветствие изменится.

**Примечание:** Мы могли бы прослушивать [события `setGreeting`](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=logs), чтобы знать, когда меняется приветствие, и обновлять его таким образом. Однако, хотя это может быть более эффективно, это применимо не во всех случаях. Когда пользователь переключается на другую сеть, приветствие также меняется, но это изменение не сопровождается событием. Мы могли бы иметь одну часть кода, прослушивающую события, и другую для определения изменений сети, но это было бы сложнее, чем просто установить [параметр `watch`](https://wagmi.sh/react/api/hooks/useReadContract#watch-optional).

```tsx
  const [ newGreeting, setNewGreeting ] = useState("")
```

[Хук `useState` из React](https://www.w3schools.com/react/react_usestate.asp) позволяет нам указать переменную состояния, значение которой сохраняется от одной отрисовки компонента к другой. Начальное значение — это параметр, в данном случае пустая строка.

Хук `useState` возвращает список с двумя значениями:

1. Текущее значение переменной состояния.
2. Функция для изменения переменной состояния при необходимости. Поскольку это хук, каждый раз при его вызове компонент отрисовывается заново.

В этом случае мы используем переменную состояния для нового приветствия, которое хочет установить пользователь.

```tsx
  const greetingChange : ChangeEventHandler<HTMLInputElement> = (evt) =>
    setNewGreeting(evt.target.value)
```

Это обработчик события изменения поля ввода нового приветствия. Тип [`ChangeEventHandler<HTMLInputElement>`](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/) указывает, что это обработчик изменения значения элемента ввода HTML. Часть `<HTMLInputElement>` используется, потому что это [обобщенный тип](https://www.w3schools.com/typescript/typescript_basic_generics.php).

```tsx
  const preparedTx = usePrepareContractWrite({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [ newGreeting ]
  })
  const workingTx = useContractWrite(preparedTx.config)
```

Это процесс отправки транзакции в блокчейн с точки зрения клиента:

1. Отправьте транзакцию узлу в блокчейне с помощью [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas).
2. Дождитесь ответа от узла.
3. Когда ответ получен, попросите пользователя подписать транзакцию через кошелек. Этот шаг _должен_ произойти после получения ответа от узла, потому что пользователю показывается стоимость газа транзакции перед ее подписанием.
4. Дождитесь одобрения пользователя.
5. Отправьте транзакцию еще раз, на этот раз используя [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction).

Шаг 2, скорее всего, займет ощутимое количество времени, в течение которого пользователи будут задаваться вопросом, действительно ли их команда была получена пользовательским интерфейсом и почему им еще не предлагают подписать транзакцию. Это приводит к плохому пользовательскому опыту (UX).

Решение — использовать [хуки подготовки](https://wagmi.sh/react/prepare-hooks). Каждый раз, когда меняется параметр, немедленно отправляйте узлу запрос `eth_estimateGas`. Затем, когда пользователь действительно хочет отправить транзакцию (в данном случае, нажав **Обновить приветствие**), стоимость газа известна, и пользователь может сразу увидеть страницу кошелька.

```tsx
  return (
```

Теперь мы наконец можем создать фактический HTML для возврата.

```tsx
    <>
      <h2>Greeter</h2>
      {
        !readResults.isError && !readResults.isLoading &&
          <ShowGreeting greeting={readResults.data} />
      }
      <hr />
```

Создайте компонент `ShowGreeting` (описан ниже), но только если приветствие было успешно прочитано из блокчейна.

```tsx
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />
```

Это поле для ввода текста, где пользователь может установить новое приветствие. Каждый раз, когда пользователь нажимает клавишу, мы вызываем `greetingChange`, который вызывает `setNewGreeting`. Поскольку `setNewGreeting` происходит из хука `useState`, это заставляет компонент `Greeter` отрисовываться снова. Это означает, что:

- Нам нужно указать `value`, чтобы сохранить значение нового приветствия, иначе оно вернется к значению по умолчанию — пустой строке.
- `usePrepareContractWrite` вызывается каждый раз, когда `newGreeting` меняется, что означает, что в подготовленной транзакции всегда будет самое последнее `newGreeting`.

```tsx
      <button disabled={!workingTx.write}
              onClick={workingTx.write}
      >
        Обновить приветствие
      </button>
```

Если `workingTx.write` отсутствует, значит, мы все еще ждем информацию, необходимую для отправки обновления приветствия, поэтому кнопка отключена. Если значение `workingTx.write` есть, то это функция, которую нужно вызвать для отправки транзакции.

```tsx
      <hr />
      <ShowObject name="readResults" object={readResults} />
      <ShowObject name="preparedTx" object={preparedTx} />
      <ShowObject name="workingTx" object={workingTx} />
    </>
  )
}
```

Наконец, чтобы помочь вам увидеть, что мы делаем, покажем три объекта, которые мы используем:

- `readResults`
- `preparedTx`
- `workingTx`

##### Компонент `ShowGreeting` {#showgreeting-component}

Этот компонент показывает

```tsx
const ShowGreeting = (attrs : ShowGreetingAttrsType) => {
```

Функция компонента получает параметр со всеми атрибутами компонента.

```tsx
  return <b>{attrs.greeting}</b>
}
```

##### Компонент `ShowObject` {#showobject-component}

В информационных целях мы используем компонент `ShowObject` для отображения важных объектов (`readResults` для чтения приветствия и `preparedTx` и `workingTx` для создаваемых нами транзакций).

```tsx
const ShowObject = (attrs: ShowObjectAttrsType ) => {
  const keys = Object.keys(attrs.object)
  const funs = keys.filter(k => typeof attrs.object[k] == "function")
  return <>
    <details>
```

Мы не хотим загромождать пользовательский интерфейс всей информацией, поэтому, чтобы можно было просматривать или скрывать ее, мы используем тег [`details`](https://www.w3schools.com/tags/tag_details.asp).

```tsx
      <summary>{attrs.name}</summary>
      <pre>
        {JSON.stringify(attrs.object, null, 2)}
```

Большинство полей отображаются с помощью [`JSON.stringify`](https://www.w3schools.com/js/js_json_stringify.asp).

```tsx
      </pre>
      { funs.length > 0 &&
        <>
          Функции:
          <ul>
```

Исключение составляют функции, которые не являются частью [стандарта JSON](https://www.json.org/json-en.html), поэтому их нужно отображать отдельно.

```tsx
          {funs.map((f, i) =>
```

Внутри JSX код внутри `{` фигурных скобок `}` интерпретируется как JavaScript. Затем код внутри `(` круглых скобок `)` снова интерпретируется как JSX.

```tsx
           (<li key={i}>{f}</li>)
                )}
```

React требует, чтобы теги в [дереве DOM](https://www.w3schools.com/js/js_htmldom.asp) имели уникальные идентификаторы. Это означает, что дочерние элементы одного и того же тега (в данном случае [неупорядоченного списка](https://www.w3schools.com/tags/tag_ul.asp)) должны иметь разные атрибуты `key`.

```tsx
          </ul>
        </>
      }
    </details>
  </>
}
```

Закройте различные HTML-теги.

##### Финальный `export` {#the-final-export}

```tsx
export { Greeter }
```

Компонент `Greeter` — это тот, который нам нужно экспортировать для приложения.

#### `src/wagmi.ts` {#wagmi-ts}

Наконец, различные определения, связанные с WAGMI, находятся в `src/wagmi.ts`. Я не буду здесь все объяснять, потому что большая часть — это шаблонный код, который вам вряд ли понадобится менять.

Код здесь не совсем такой же, как [на github](https://github.com/qbzzt/20230801-modern-ui/blob/main/src/wagmi.ts), потому что позже в статье мы добавляем еще одну сеть ([Redstone Holesky](https://redstone.xyz/docs/network-info)).

```ts
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { holesky, sepolia } from 'wagmi/chains'
```

Импортируйте блокчейны, которые поддерживает приложение. Вы можете увидеть список поддерживаемых сетей [на GitHub viem](https://github.com/wagmi-dev/viem/tree/main/src/chains/definitions).

```ts
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = 'c96e690bb92b6311e8e9b2a6a22df575'
```

Чтобы использовать [WalletConnect](https://walletconnect.com/), вам нужен идентификатор проекта для вашего приложения. Вы можете получить его на [cloud.walletconnect.com](https://cloud.walletconnect.com/sign-in).

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

### Добавление другого блокчейна {#add-blockchain}

В наши дни существует множество [решений для масштабирования L2](/layer-2/), и вы, возможно, захотите поддержать некоторые, которые viem еще не поддерживает. Для этого вы изменяете `src/wagmi.ts`. Эти инструкции объясняют, как добавить [Redstone Holesky](https://redstone.xyz/docs/network-info).

1. Импортируйте тип `defineChain` из viem.

   ```ts
   import { defineChain } from 'viem'
   ```

2. Добавьте определение сети.

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

3. Добавьте новую сеть в вызов `configureChains`.

   ```ts
    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [ holesky, sepolia, redstoneHolesky ],
      [ publicProvider(), ],
    )
   ```

4. Убедитесь, что приложение знает адрес ваших контрактов в новой сети. В этом случае мы изменяем `src/components/Greeter.tsx`:

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

## Заключение {#conclusion}

Конечно, вас не особо волнует предоставление пользовательского интерфейса для `Greeter`. Вы хотите создать пользовательский интерфейс для своих собственных контрактов. Чтобы создать собственное приложение, выполните следующие шаги:

1. Укажите, что нужно создать приложение wagmi.

   ```sh copy
   pnpm create wagmi
   ```

2. Назовите приложение.

3. Выберите фреймворк **React**.

4. Выберите вариант **Vite**.

5. Вы можете [добавить Rainbow kit](https://www.rainbowkit.com/docs/installation#manual-setup).

Теперь идите и сделайте свои контракты пригодными для использования во всем мире.

[Больше моих работ смотрите здесь](https://cryptodocguy.pro/).

