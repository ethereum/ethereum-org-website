---
title: "コントラクトのユーザーインターフェースの構築"
description: "TypeScript、React、Vite、Wagmiなどの最新のコンポーネントを使用して、モダンでありながら最小限のユーザーインターフェースについて説明します。また、ウォレットをユーザーインターフェースに接続する方法、スマートコントラクトを呼び出して情報を読み取る方法、スマートコントラクトにトランザクションを送信する方法、スマートコントラクトからのイベントを監視して変更を特定する方法を学びます。"
author: "オリ・ポメランツ"
tags:
  - "typescript"
  - "react"
  - "vite"
  - "wagmi"
  - "フロントエンド"
skill: beginner
breadcrumb: "WAGMIを使用したUI"
published: 2023-11-01
lang: ja
sidebarDepth: 3
---

イーサリアムエコシステムで必要な機能を見つけました。それを実装するためのスマートコントラクトを書き、おそらくオフチェーンで実行される関連コードも書いたことでしょう。これは素晴らしいことです！しかし残念ながら、ユーザーインターフェースがなければユーザーを獲得することはできません。そして、あなたが最後にウェブサイトを書いたのは、人々がダイヤルアップモデムを使用し、JavaScriptがまだ新しかった頃かもしれません。

この記事はそんなあなたのためのものです。プログラミングの知識があり、JavaScriptやHTMLについても少しは知っているものの、ユーザーインターフェースのスキルが錆びついて時代遅れになっていることを前提としています。一緒にシンプルな最新のアプリケーションを見ていき、最近の開発手法を学びましょう。

## なぜこれが重要なのか {#why-important}

理論的には、ユーザーに[Etherscan](https://sepolia.etherscan.io/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA#readContract)や[Blockscout](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_write_contract)を使ってコントラクトとやり取りしてもらうことも可能です。これは経験豊富なイーサリアムユーザーにとっては素晴らしいことです。しかし、私たちは[さらに10億人の人々](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion)にサービスを提供しようとしています。優れたユーザーエクスペリエンスなしにはこれは実現しませんし、使いやすいユーザーインターフェースはその大きな部分を占めています。

## Greeterアプリケーション {#greeter-app}

最新のUIがどのように機能するかについては多くの理論があり、[それを説明している](https://wagmi.sh/core/getting-started)[優れたサイトがたくさんあります](https://react.dev/learn/thinking-in-react)。それらのサイトが行った素晴らしい仕事を繰り返す代わりに、あなたが実践から学ぶことを好むと仮定し、実際に触って遊べるアプリケーションから始めます。物事を成し遂げるためには依然として理論が必要であり、それについても触れていきます。ソースファイルを一つずつ見ていき、必要になった時点で議論を進めます。

### インストール {#installation}

1. このアプリケーションは[Sepolia](https://sepolia.dev/)テストネットワークを使用します。必要に応じて、[SepoliaのテストETHを取得](/developers/docs/networks/#sepolia)し、[ウォレットにSepoliaを追加](https://chainlist.org/chain/11155111)してください。

2. GitHubリポジトリをクローンし、必要なパッケージをインストールします。

   ```sh
   git clone https://github.com/qbzzt/260301-modern-ui-web3.git
   cd 260301-modern-ui-web3
   npm install
   ```

3. このアプリケーションは無料のアクセスポイントを使用しているため、パフォーマンスに制限があります。[Node as a service](/developers/docs/nodes-and-clients/nodes-as-a-service/)プロバイダーを使用したい場合は、[`src/wagmi.ts`](#wagmi-ts)内のURLを置き換えてください。

4. アプリケーションを起動します。

   ```sh
   npm run dev
   ```

5. アプリケーションに表示されたURLにブラウザでアクセスします。ほとんどの場合、それは[http://localhost:5173/](http://localhost:5173/)です。

6. HardhatのGreeterを変更したコントラクトのソースコードは、[ブロックチェーンエクスプローラーで](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code)確認できます。

### ファイルのウォークスルー {#file-walk-through}

#### `index.html` {#index-html}

このファイルは、スクリプトファイルをインポートするこの行を除いて、標準的なHTMLのボイラープレートです。

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

ファイル拡張子は、これが[型チェック](https://en.wikipedia.org/wiki/Type_system#Type_checking)をサポートするJavaScriptの拡張言語である[TypeScript](https://www.typescriptlang.org/)で書かれた[Reactコンポーネント](https://www.w3schools.com/react/react_components.asp)であることを示しています。TypeScriptはJavaScriptにコンパイルされるため、クライアント側で使用できます。

このファイルは、興味がある方のために主に説明されています。通常、このファイルを変更することはなく、[`src/App.tsx`](#app-tsx)とそれがインポートするファイルを変更します。

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
```

必要なライブラリコードをインポートします。

```tsx
import App from './App.tsx'
```

アプリケーションを実装するReactコンポーネントをインポートします（下記参照）。

```tsx
import { config } from './wagmi.ts'
```

ブロックチェーンの設定を含む[Wagmi](https://wagmi.sh/)の設定をインポートします。

```tsx
const queryClient = new QueryClient()
```

[React Queryの](https://tanstack.com/query/latest/docs/framework/react/overview)キャッシュマネージャーの新しいインスタンスを作成します。このオブジェクトには以下が保存されます：

- キャッシュされたRPC呼び出し
- コントラクトの読み取り
- バックグラウンドでの再フェッチ状態

Wagmi v3は内部でReact Queryを使用しているため、キャッシュマネージャーが必要です。

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

ルートのReactコンポーネントを作成します。`render`へのパラメーターは、HTMLとJavaScript/TypeScriptの両方を使用する拡張言語である[JSX](https://www.w3schools.com/react/react_jsx.asp)です。ここでの感嘆符は、TypeScriptコンポーネントに対して「`document.getElementById('root')`が`ReactDOM.createRoot`への有効なパラメーターになるかどうかはわからないかもしれないが、心配しないでほしい。私は開発者であり、有効なパラメーターになると伝えているのだから」と伝えています。

```tsx
  <React.StrictMode>
```

アプリケーションは[`React.StrictMode`コンポーネント](https://react.dev/reference/react/StrictMode)の中に入ります。このコンポーネントは、Reactライブラリに追加のデバッグチェックを挿入するように指示し、開発中に役立ちます。

```tsx
    <WagmiProvider config={config}>
```

アプリケーションは[`WagmiProvider`コンポーネント](https://wagmi.sh/react/api/WagmiProvider)の中にも入ります。[Wagmi（これから作成します）ライブラリ](https://wagmi.sh/)は、ReactのUI定義と、イーサリアムの分散型アプリケーション (dapp) を書くための[Viemライブラリ](https://viem.sh/)を接続します。

```tsx
      <QueryClientProvider client={queryClient}>
```

そして最後に、任意のアプリケーションコンポーネントがキャッシュされたクエリを使用できるように、React Queryプロバイダーを追加します。

```tsx
        <App />
```

これで、実際にUIを実装するアプリケーションのコンポーネントを配置できます。コンポーネントの最後にある`/>`は、XML標準に従って、このコンポーネントの内部に定義がないことをReactに伝えます。

```tsx
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
```

もちろん、他のコンポーネントも閉じる必要があります。

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

必要なライブラリと、[`Greeter`コンポーネント](#greeter-tsx)をインポートします。

```tsx
const SEPOLIA_CHAIN_ID = 11155111
```

SepoliaのチェーンIDです。

```
function App() {
```

これはReactコンポーネントを作成する標準的な方法です。レンダリングが必要になるたびに呼び出される関数を定義します。この関数には通常、TypeScriptまたはJavaScriptのコードが含まれ、その後にJSXコードを返す`return`ステートメントが続きます。

```tsx
  const connection = useConnection()
```

[`useConnection`](https://wagmi.sh/react/api/hooks/useConnection)を使用して、アドレスや`chainId`など、現在の接続に関連する情報を取得します。

慣例として、Reactでは`use...`と呼ばれる関数は[フック](https://www.w3schools.com/react/react_hooks.asp)です。これらの関数はコンポーネントにデータを返すだけでなく、そのデータが変更されたときにコンポーネントが再レンダリングされる（コンポーネント関数が再度実行され、その出力がHTML内の前の出力を置き換える）ことを保証します。

```tsx
  const { connectors, connect, status, error } = useConnect()
```

[`useConnect`](https://wagmi.sh/react/api/hooks/useConnect)を使用して、ウォレット接続に関する情報を取得します。

```tsx
  const { disconnect } = useDisconnect()
```

[このフック](https://wagmi.sh/react/api/hooks/useDisconnect)は、ウォレットから切断するための関数を提供します。

```tsx
  const { switchChain } = useSwitchChain()
```

[このフック](https://wagmi.sh/react/api/hooks/useSwitchChain)を使用すると、チェーンを切り替えることができます。

```tsx
  useEffect(() => {
```

Reactフックの[`useEffect`](https://react.dev/reference/react/useEffect)を使用すると、変数の値が変更されるたびに関数を実行して、外部システムを同期させることができます。

```tsx
    if (connection.status === 'connected' &&
        connection.chainId !== SEPOLIA_CHAIN_ID
    ) {
      switchChain({ chainId: SEPOLIA_CHAIN_ID })
    }
```

接続されているが、Sepoliaブロックチェーンに接続されていない場合は、Sepoliaに切り替えます。

```tsx
  }, [connection.status, connection.chainId])
```

接続ステータスまたは接続のchainIdのいずれかが変更されるたびに、関数を再実行します。

```tsx
  return (
    <>
```

ReactコンポーネントのJSXは、単一のHTMLコンポーネントを返す_必要があります_。複数のコンポーネントがあり、それらすべてをラップするコンテナが必要ない場合は、空のコンポーネント（`<> ... </>`）を使用してそれらを単一のコンポーネントに結合します。

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

現在の接続に関する情報を提供します。JSX内では、`{<expression>}`は式をJavaScriptとして評価することを意味します。

```tsx
      {connection.status === 'connected' && (
```

構文`{<condition> && <value>} means "if the condition is `true`, evaluate to the value; if it isn't, evaluate to `false`"です。

これは、JSX内にif文を記述する標準的な方法です。

```tsx
        <div>
          <Greeter />
          <hr />
```

JSXはHTMLよりも厳密なXML標準に従います。タグに対応する終了タグがない場合は、終了させるために末尾にスラッシュ（`/`）を付ける_必要があります_。

ここにはそのようなタグが2つあります。`<Greeter />`（実際にはコントラクトと通信するHTMLコードが含まれています）と、[水平線用の`<hr />`](https://www.w3schools.com/tags/tag_hr.asp)です。

```tsx
          <button type="button" onClick={disconnect}>
            Disconnect
          </button>
 
</div>
      )}
```

ユーザーがこのボタンをクリックした場合は、`disconnect`関数を呼び出します。

```tsx
      {connection.status !== 'connected' && (
```

接続されて_いない_場合は、ウォレットに接続するために必要なオプションを表示します。

```tsx
        <div>
          <h2>Connect</h2>
          {connectors.map((connector) => (
```

`connectors`にはコネクタのリストがあります。[`map`](https://www.w3schools.com/jsref/jsref_map.asp)を使用して、これを表示用のJSXボタンのリストに変換します。

```tsx
            <button
              key={connector.uid}
```

JSXでは、「兄弟」タグ（同じ親から派生したタグ）が異なる識別子を持つ必要があります。

```tsx
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
```

コネクタボタンです。

```tsx
          <div>{status}</div>
          <div>{error?.message}</div>
 
</div>
      )}
```

追加情報を提供します。式構文`<variable>?.<field>`は、変数が定義されている場合はそのフィールドを評価するようにJavaScriptに指示します。変数が定義されていない場合、この式は`undefined`と評価されます。

式`error.message`は、エラーがない場合に例外を発生させます。`error?.message`を使用すると、この問題を回避できます。

#### `src/Greeter.tsx` {#greeter-tsx}

このファイルには、UI機能の大部分が含まれています。通常は複数のファイルに分かれる定義が含まれていますが、これはチュートリアルであるため、プログラムはパフォーマンスやメンテナンスのしやすさよりも、初めて理解しやすいように最適化されています。

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

これらのライブラリ関数を使用します。繰り返しになりますが、これらは使用される箇所で後述します。

```tsx
import { AddressType } from 'abitype'
```

[`abitype`ライブラリ](https://abitype.dev/)は、[`AddressType`](https://abitype.dev/config#addresstype)など、さまざまなイーサリアムのデータ型のTypeScript定義を提供します。

```tsx
let greeterABI = [
  { "type": "function", "name": "greet", ... },
  { "type": "function", "name": "setGreeting", ... },
  { "type": "event", "name": "SetGreeting", ... },
] as const   // greeterABI
```

`Greeter`コントラクトのABIです。
コントラクトとUIを同時に開発している場合、通常はそれらを同じリポジトリに配置し、Solidityコンパイラによって生成されたABIをアプリケーション内のファイルとして使用します。ただし、ここではコントラクトがすでに開発されており変更されないため、その必要はありません。

[`as const`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)を使用して、これが_真の_定数であることをTypeScriptに伝えます。通常、JavaScriptで`const x = {"a": 1}`と指定した場合、`x`の値を変更することはできますが、代入することはできません。

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScriptは静的型付け言語です。この定義を使用して、`Greeter`コントラクトが異なるチェーンにデプロイされているアドレスを指定します。キーは数値（chainId）であり、値は`AddressType`（アドレス）です。

```tsx
const contractAddrs : AddressPerBlockchainType = {
  // Sepolia
    11155111: '0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA'
}
```

[Sepolia](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract)上のコントラクトのアドレスです。

##### `Timer`コンポーネント {#timer-component}

`Timer`コンポーネントは、指定された時間からの経過秒数を表示します。これはユーザビリティの観点から重要です。ユーザーが何かアクションを起こしたとき、即座の反応を期待します。ブロックチェーンでは、トランザクションがブロックに配置されるまで何も起こらないため、これは多くの場合不可能です。1つの解決策は、ユーザーがアクションを実行してからどれくらいの時間が経過したかを表示し、ユーザーが必要な時間が妥当かどうかを判断できるようにすることです。

```tsx
type TimerProps = {
  lastUpdate: Date
}
```

`Timer`コンポーネントは、最後のアクションの時刻である1つのパラメーター`lastUpdate`を受け取ります。

```tsx
const Timer = ({ lastUpdate }: TimerProps) => {
  const [_, setNow] = useState(new Date())
```

コンポーネントが正しく機能するためには、状態（コンポーネントに結び付けられた変数）を持ち、それを更新する必要があります。しかし、それを読み取る必要は決してないため、わざわざ変数にする必要はありません。

```tsx
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
```

[`setInterval`](https://www.w3schools.com/jsref/met_win_setinterval.asp)関数を使用すると、関数を定期的に実行するようにスケジュールできます。この場合は1秒ごとです。この関数は`setNow`を呼び出して状態を更新するため、`Timer`コンポーネントが再レンダリングされます。これを空の依存関係リストを持つ[`useEffect`](https://react.dev/reference/react/useEffect)内にラップすることで、コンポーネントがレンダリングされるたびではなく、1回だけ実行されるようにします。

```tsx
  const secondsSinceUpdate = Math.floor(
    (Date.now() - lastUpdate.getTime()) / 1000
  )

  return (
    <span>{secondsSinceUpdate} seconds ago</span>
  )
}
```

最後の更新からの秒数を計算して返します。

##### `Greeter`コンポーネント {#greeter-component}

```tsx
const Greeter = () => {
```

最後に、コンポーネントを定義します。

```tsx
  const chainId = useChainId()
  const account = useAccount()
```

[Wagmi](https://wagmi.sh/)が提供する、使用しているチェーンとアカウントに関する情報です。これはフック（`use...`）であるため、この情報が変更されるたびにコンポーネントが再レンダリングされます。

```tsx
  const greeterAddr = chainId && contractAddrs[chainId] 
```

Greeterコントラクトのアドレスです。チェーン情報がない場合、またはそのコントラクトがないチェーンにいる場合は`undefined`になります。

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet", // 引数なし
  })
```

[`useReadContract`フック](https://wagmi.sh/react/api/hooks/useReadContract)は、[コントラクト](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract)の`greet`関数を呼び出します。

```tsx
  const [ currentGreeting, setCurrentGreeting ] = 
    useState("Please wait while we fetch the greeting from the blockchain...")
  const [ newGreeting, setNewGreeting ] = useState("")
```

Reactの[`useState`フック](https://www.w3schools.com/react/react_usestate.asp)を使用すると、コンポーネントのレンダリング間で値が保持される状態変数を指定できます。初期値はパラメーターであり、この場合は空の文字列です。

`useState`フックは、2つの値を持つリストを返します。

1. 状態変数の現在の値。
2. 必要に応じて状態変数を変更するための関数。これはフックであるため、呼び出されるたびにコンポーネントが再度レンダリングされます。

この場合、ユーザーが設定したい新しい挨拶のために状態変数を使用しています。

```tsx
  const [ lastSetterAddress, setLastSetterAddress ] = useState("")
```

複数のユーザーが同時に同じコントラクトを使用している場合、お互いの挨拶を上書きしてしまう可能性があります。これはユーザーにとって、アプリケーションが誤動作しているように見えるでしょう。アプリケーションが最後に挨拶を設定した人を表示すれば、ユーザーはそれが他の誰かであり、アプリケーションが正しく機能していることがわかります。

```tsx
  const [ status, setStatus ] = useState("")
  const [ statusTime, setStatusTime ] = useState(new Date())
```

ユーザーは自分のアクションが即座に効果を発揮することを見たいと思っています。しかし、ブロックチェーンではそうはいきません。これらの状態変数を使用すると、少なくともユーザーに何かを表示して、アクションが進行中であることを知らせることができます。

```tsx
  useEffect(() => {
    if (readResults.data) {
      setCurrentGreeting(readResults.data)
      setStatus("Greeting fetched from blockchain")
    }
  }, [readResults.data])
```

上記の`readResults`がデータを変更し、それが偽の値（たとえば`undefined`）に設定されていない場合は、現在の挨拶をブロックチェーンから読み取ったものに更新します。また、ステータスも更新します。

```tsx
  useWatchContractEvent({
    address: greeterAddr,
    abi: greeterABI,
    eventName: 'SetGreeting',
    chainId,
```

`SetGreeting`イベントをリッスンします。

```tsx
    enabled: !!greeterAddr,
```

`!!<value>`は、値が`false`であるか、`undefined`、`0`、空の文字列など、偽として評価される値である場合、式全体が`false`になることを意味します。その他の値の場合は`true`になります。これは値をブール値に変換する方法です。なぜなら、`greeterAddr`がない場合はイベントをリッスンしたくないからです。

```tsx
    onLogs: logs => {
      const greetingFromContract = logs[0].args.greeting
      setCurrentGreeting(greetingFromContract)
      setLastSetterAddress(logs[0].args.sender)
      updateStatus("Greeting updated by event")
    },
  })
```

ログが表示された場合（新しいイベントが表示された場合に発生します）、挨拶が変更されたことを意味します。その場合、`currentGreeting`と`lastSetterAddress`を新しい値に更新できます。また、ステータス表示も更新したいと考えます。

```tsx
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus)
    setStatusTime(new Date())
  }
```

ステータスを更新するときに、2つのことを行いたいと考えます。

1. ステータス文字列（`status`）を更新する
2. 最後のステータス更新時刻（`statusTime`）を現在に更新する。

```tsx
  const greetingChange = (evt) =>
    setNewGreeting(evt.target.value)
```

これは、新しい挨拶の入力フィールドの変更に対するイベントハンドラーです。`evt`パラメーターの型を指定することもできますが、TypeScriptは型の指定がオプションの言語です。この関数はHTMLイベントハンドラーで1回だけ呼び出されるため、必要ないと思います。

```tsx
  const { writeContractAsync } = useWriteContract()
```

コントラクトに書き込むための関数です。[`writeContracts`](https://wagmi.sh/core/api/actions/writeContracts#writecontracts)に似ていますが、より優れたステータス更新を可能にします。

```tsx
  const simulation = useSimulateContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [newGreeting],
    account: account.address    
  })
```

クライアントの観点からブロックチェーンのトランザクションを送信するプロセスは次のとおりです。

1. [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas)を使用して、ブロックチェーン内のノードにトランザクションを送信します。
2. ノードからの応答を待ちます。
3. 応答を受信したら、ウォレットを通じてトランザクションに署名するようにユーザーに求めます。ユーザーは署名する前にトランザクションのガス代を提示されるため、このステップはノードの応答を受信した後に実行する_必要があります_。
4. ユーザーの承認を待ちます。
5. 今度は[`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction)を使用して、トランザクションを再度送信します。

ステップ2は知覚できるほどの時間がかかる可能性が高く、その間、ユーザーは自分のコマンドがユーザーインターフェースに受信されたかどうか、なぜまだトランザクションへの署名を求められないのか疑問に思うかもしれません。これは貧弱なユーザーエクスペリエンス（UX）を生み出します。

1つの解決策は、パラメーターが変更されるたびに`eth_estimateGas`を送信することです。そうすれば、ユーザーが実際にトランザクションを送信したいとき（この場合は**Update greeting**を押すことによって）、ガス代がわかっており、ユーザーはすぐにウォレットページを見ることができます。

```tsx
  return (
```

これでようやく、返す実際のHTMLを作成できます。

```tsx
    <>
      <h2>Greeter</h2>
      {currentGreeting}
```

現在の挨拶を表示します。

```tsx
      {lastSetterAddress && (
        <p>Last updated by {
          lastSetterAddress === account.address ? "you" : lastSetterAddress
        }</p>
      )}
```

最後に挨拶を設定した人がわかっている場合は、その情報を表示します。`Greeter`はこの情報を追跡しておらず、`SetGreeting`イベントを遡って探したくないため、実行中に挨拶が変更された場合にのみ取得します。

```tsx
      <hr />      
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />      
      <br />
```

これは、ユーザーが新しい挨拶を設定できる入力テキストフィールドです。ユーザーがキーを押すたびに、`greetingChange`を呼び出し、それが`setNewGreeting`を呼び出します。`setNewGreeting`は`useState`から来ているため、`Greeter`コンポーネントが再レンダリングされます。これは次のことを意味します。

- 新しい挨拶の値を保持するために`value`を指定する必要があります。そうしないと、デフォルトの空の文字列に戻ってしまうからです。
- `simulation`も`newGreeting`が変更されるたびに更新されます。つまり、正しい挨拶でシミュレーションを取得できます。ガス代はコールデータのサイズに依存し、コールデータのサイズは文字列の長さに依存するため、これは関連する可能性があります。

```tsx
      <button disabled={!simulation.data}
```

トランザクションを送信するために必要な情報が得られた場合にのみ、ボタンを有効にします。

```tsx
        onClick={async () => {
          updateStatus("Please confirm in wallet...")
```

ステータスを更新します。この時点で、ユーザーはウォレットで確認する必要があります。

```tsx
          await writeContractAsync(simulation.data.request)
          updateStatus("Transaction sent, waiting for greeting to change...")
        }}
      >
        Update greeting
      </button>

```

`writeContractAsync`は、トランザクションが実際に送信された後にのみ戻ります。これにより、トランザクションがブロックチェーンに含まれるのをどれくらい待っているかをユーザーに示すことができます。

```tsx
      <h4>Status: {status}</h4>
      <p>Updated <Timer lastUpdate={statusTime} /> </p>
    </>
  )
}
```

ステータスと、更新されてからの経過時間を表示します。

```
export {Greeter}
```

コンポーネントをエクスポートします。

#### `src/wagmi.ts` {#wagmi-ts}

最後に、Wagmiに関連するさまざまな定義が`src/wagmi.ts`にあります。そのほとんどは変更する必要のないボイラープレートであるため、ここではすべてを説明するつもりはありません。

```ts
import { http, webSocket, createConfig, fallback } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
```

Wagmiの設定には、このアプリケーションでサポートされているチェーンが含まれています。[利用可能なチェーンのリスト](https://wagmi.sh/core/api/chains)を確認できます。

```ts
  connectors: [
    injected(),
  ],
```

[このコネクタ](https://wagmi.sh/core/api/connectors/injected)を使用すると、ブラウザにインストールされているウォレットと通信できます。

```ts
  transports: {
    [sepolia.id]: http()
```

Viemに付属しているデフォルトのHTTPエンドポイントで十分です。別のURLが必要な場合は、`http("https:// hostname ")`または`webSocket("wss:// hostname ")`を使用できます。

```ts
  },
  multiInjectedProviderDiscovery: false,
})
```

## 別のブロックチェーンの追加 {#add-blockchain}

最近では多くの[L2スケーリングソリューション](https://ethereum.org/layer-2/)があり、Viemがまだサポートしていないものをサポートしたいと思うかもしれません。それを行うには、`src/wagmi.ts`を変更します。これらの手順では、[Optimism Sepolia](https://chainlist.org/chain/11155420)を追加する方法を説明します。

1.  `src/wagmi.ts`を編集します

    A. Viemから`defineChain`型をインポートします。

          ```ts
          import { defineChain } from 'viem'
          ```

    B. ネットワーク定義を追加します。Optimism Sepoliaについては、[すでに`viem`に含まれている](https://github.com/wevm/viem/blob/main/src/chains/definitions/optimismSepolia.ts)ため、実際にはこれを行う必要はありませんが、この方法で`viem`に含まれていないブロックチェーンを追加する方法を学ぶことができます。

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

    C. `createConfig`呼び出しに新しいチェーンを追加します。

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

2.  `src/App.tsx`を編集して、Sepoliaへの自動切り替えをコメントアウトします。本番システムでは、おそらくサポートする各ブロックチェーンへのリンクを持つボタンを表示するでしょう。

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

3.  `src/Greeter.tsx`を編集して、アプリケーションが新しいネットワーク上のコントラクトのアドレスを確実に認識できるようにします。

    ```ts
    const contractAddrs: AddressPerBlockchainType = {
      // Optimism Sepolia
      11155420: "0x4dd85791923E9294E934271522f63875EAe5806f",

      // Sepolia
      11155111: "0x7143d5c190F048C8d19fe325b748b081903E3BF0",
    }
    ```

4.  ブラウザでの操作。

    A. [ChainList](https://chainlist.org/chain/11155420?testnets=true)にアクセスし、表の右側にあるボタンのいずれかをクリックして、チェーンをウォレットに追加します。

    B. アプリケーションで、**Disconnect**（切断）してから再接続して、ブロックチェーンを変更します。これを処理するより良い方法はありますが、それにはアプリケーションの変更が必要になります。

## まとめ {#conclusion}

もちろん、あなたは`Greeter`のユーザーインターフェースを提供することにはあまり関心がないでしょう。あなた自身のコントラクトのためのユーザーインターフェースを作成したいはずです。独自のアプリケーションを作成するには、次の手順を実行します。

1. Wagmiアプリケーションを作成するように指定します。

   ```sh copy
   npm create wagmi
   ```

2. `y`と入力して続行します。

3. アプリケーションに名前を付けます。

4. <strong>React</strong>フレームワークを選択します。

5. <strong>Vite</strong>バリアントを選択します。

さあ、あなたのコントラクトを世界中で使えるようにしましょう。

[私の他の作品はこちらをご覧ください](https://cryptodocguy.pro/)。