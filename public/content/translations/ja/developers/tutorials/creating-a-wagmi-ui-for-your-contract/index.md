---
title: "コントラクトのユーザーインターフェースを構築する"
description: TypeScript、React、Vite、Wagmiといった最新のコンポーネントを使用して、モダンでありながら最小限のユーザーインターフェースをレビューし、ウォレットをユーザーインターフェースに接続する方法、スマートコントラクトを呼び出して情報を読み取る方法、スマートコントラクトにトランザクションを送信する方法、スマートコントラクトからのイベントを監視して変更を特定する方法を学びます。
author: Ori Pomerantz
tags: [ "typescript", "react", "vite", "wagmi", "フロントエンド" ]
skill: beginner
published: 2023-11-01
lang: ja
sidebarDepth: 3
---

Ethereumエコシステムに必要な機能を見つけました。 それを実装するためにスマートコントラクトを作成し、オフチェーンで実行される関連コードもいくつか作成したかもしれません。 素晴らしいことです！ 残念ながら、ユーザーインターフェースがなければユーザーはつきませんし、前回ウェブサイトを作成したときは、人々はダイヤルアップモデムを使い、JavaScriptはまだ新しいものでした。

この記事は、そんなあなたのためのものです。 プログラミングの知識があり、JavaScriptやHTMLについても少しは知っているけれど、ユーザーインターフェースのスキルは錆びついて時代遅れだと想定しています。 一緒にシンプルな最新のアプリケーションをレビューし、最近ではどのように行われているかを見ていきましょう。

## なぜこれが重要なのか {#why-important}

[Etherscan](https://holesky.etherscan.io/address/0x432d810484add7454ddb3b5311f0ac2e95cecea8#writeContract)や[Blockscout](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=write_contract)を使って、人々にコントラクトを操作してもらうことも理論上は可能です。 経験豊富なEthereanにとっては、それで十分でしょう。 しかし、私たちは[さらに10億人の人々](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion)にサービスを提供しようとしています。 これは優れたユーザーエクスペリエンスなしには実現できません。そして、フレンドリーなユーザーインターフェースはその大きな部分を占めています。

## Greeterアプリケーション {#greeter-app}

モダンなUIの仕組みの背景には多くの理論があり、[それを説明する](https://wagmi.sh/core/getting-started)[優れたサイトもたくさんあります](https://react.dev/learn/thinking-in-react)。 これらのサイトで行われている素晴らしい作業を繰り返す代わりに、実際に触って学べるアプリケーションから始めることを好むと仮定します。 物事を進めるにはまだ理論が必要で、それにも触れます。ただ、ソースファイルごとに進め、それらに到達するたびに物事を議論していきます。

### インストール {#installation}

1. 必要に応じて、[Holeskyブロックチェーン](https://chainlist.org/?search=holesky&testnets=true)をウォレットに追加し、[テストETHを入手](https://www.holeskyfaucet.io/)してください。

2. GitHubリポジトリをクローンします。

   ```sh
   git clone https://github.com/qbzzt/20230801-modern-ui.git
   ```

3. 必要なパッケージをインストールします。

   ```sh
   cd 20230801-modern-ui
   pnpm install
   ```

4. アプリケーションを起動します。

   ```sh
   pnpm dev
   ```

5. アプリケーションによって表示されたURLに移動します。 ほとんどの場合、それは[http://localhost:5173/](http://localhost:5173/)です。

6. HardhatのGreeterを少し修正したコントラクトのソースコードを、[ブロックチェーンエクスプローラー](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contract)で確認できます。

### ファイルのウォークスルー {#file-walk-through}

#### `index.html` {#index-html}

このファイルは、スクリプトファイルをインポートするこの行を除いて、標準的なHTMLの定型文です。

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

このファイル拡張子は、このファイルが[TypeScript](https://www.typescriptlang.org/)で書かれた[Reactコンポーネント](https://www.w3schools.com/react/react_components.asp)であることを示しています。TypeScriptは、[型チェック](https://en.wikipedia.org/wiki/Type_system#Type_checking)をサポートするJavaScriptの拡張機能です。 TypeScriptはJavaScriptにコンパイルされるため、クライアントサイドでの実行に使用できます。

```tsx
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { chains, config } from './wagmi'
```

必要なライブラリコードをインポートします。

```tsx
import { App } from './App'
```

アプリケーションを実装するReactコンポーネントをインポートします(下記参照)。

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

ルートのReactコンポーネントを作成します。 `render`のパラメータは[JSX](https://www.w3schools.com/react/react_jsx.asp)です。これはHTMLとJavaScript/TypeScriptの両方を使用する拡張言語です。 ここでの感嘆符は、TypeScriptコンポーネントに「`document.getElementById('root')`が`ReactDOM.createRoot`の有効なパラメータになるかどうかはわからないでしょうが、心配しないでください。私は開発者であり、そうなることを保証します」と伝えています。

```tsx
  <React.StrictMode>
```

アプリケーションは[`React.StrictMode`コンポーネント](https://react.dev/reference/react/StrictMode)の中に入ります。 このコンポーネントは、Reactライブラリに追加のデバッグチェックを挿入するように指示します。これは開発中に役立ちます。

```tsx
    <WagmiConfig config={config}>
```

アプリケーションは[`WagmiConfig`コンポーネント](https://wagmi.sh/react/api/WagmiProvider)の中にもあります。 [wagmi (we are going to make it) ライブラリ](https://wagmi.sh/)は、ReactのUI定義を[viemライブラリ](https://viem.sh/)に接続し、イーサリアムの分散型アプリケーションを作成します。

```tsx
      <RainbowKitProvider chains={chains}>
```

そして最後に、[`RainbowKitProvider`コンポーネント](https://www.rainbowkit.com/)です。 このコンポーネントは、ログインとウォレットとアプリケーション間の通信を処理します。

```tsx
        <App />
```

これで、実際にUIを実装するアプリケーション用のコンポーネントを持つことができます。 コンポーネントの最後にある`/>`は、XML標準に従い、このコンポーネント内に定義がないことをReactに伝えます。

```tsx
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
```

もちろん、他のコンポーネントも閉じる必要があります。

#### `src/App.tsx` {#app-tsx}

```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Greeter } from './components/Greeter'

export function App() {
```

これはReactコンポーネントを作成する標準的な方法です。レンダリングが必要になるたびに呼び出される関数を定義します。 この関数は通常、上部にTypeScriptまたはJavaScriptコードがあり、その後にJSXコードを返す`return`ステートメントが続きます。

```tsx
  const { isConnected } = useAccount()
```

ここで[`useAccount`](https://wagmi.sh/react/api/hooks/useAccount)を使用して、ウォレットを介してブロックチェーンに接続されているかどうかを確認します。

慣例として、Reactでは`use...`という名前の関数は、何らかのデータを返す[フック](https://www.w3schools.com/react/react_hooks.asp)です。 このようなフックを使用すると、コンポーネントがデータを取得するだけでなく、そのデータが変更されると、コンポーネントは更新された情報で再レンダリングされます。

```tsx
  return (
    <>
```

ReactコンポーネントのJSXは、1つのコンポーネントを返す_必要_があります。 複数のコンポーネントがあり、「自然に」まとめるものがない場合は、空のコンポーネント(`<> ...` )を使用して、それらを1つのコンポーネントにまとめます。 </>)を使用して、それらを1つのコンポーネントにまとめます。

```tsx
      <h1>Greeter</h1>
      <ConnectButton />
```

[`ConnectButton`コンポーネント](https://www.rainbowkit.com/docs/connect-button)はRainbowKitから取得します。 接続されていない場合は、`Connect Wallet`ボタンが表示され、ウォレットについて説明し、使用するウォレットを選択できるモーダルが開きます。 接続されると、使用しているブロックチェーン、アカウントアドレス、ETH残高が表示されます。 これらの表示を使用して、ネットワークを切り替えたり、切断したりできます。

```tsx
      {isConnected && (
```

実際のJavaScript(またはJavaScriptにコンパイルされるTypeScript)をJSXに挿入する必要がある場合は、括弧(`{}`)を使用します。

`a && b`という構文は、[`a ?`の短縮形です。 `b : a`](https://www.w3schools.com/react/react_es6_ternary.asp)。 つまり、`a`が真の場合、`b`に評価され、それ以外の場合は`a`(`false`、`0`など)に評価されます。 これは、特定の条件が満たされた場合にのみコンポーネントを表示するようにReactに指示する簡単な方法です。

この場合、ユーザーがブロックチェーンに接続されている場合にのみ、ユーザーに`Greeter`を表示したいと考えています。

```tsx
          <Greeter />
      )}
    </>
  )
}
```

#### `src/components/Greeter.tsx` {#greeter-tsx}

このファイルには、UI機能のほとんどが含まれています。 これには通常、複数のファイルに含まれる定義が含まれていますが、これはチュートリアルであるため、プログラムはパフォーマンスやメンテナンスの容易さよりも、初回で理解しやすいように最適化されています。

```tsx
import { useState, ChangeEventHandler } from 'react'
import {  useNetwork,
          useReadContract,
          usePrepareContractWrite,
          useContractWrite,
          useContractEvent
        } from 'wagmi'
```

これらのライブラリ関数を使用します。 繰り返しになりますが、これらは使用される場所で以下に説明されています。

```tsx
import { AddressType } from 'abitype'
```

[`abitype`ライブラリ](https://abitype.dev/)は、[`AddressType`](https://abitype.dev/config#addresstype)など、さまざまなイーサリアムのデータ型に対するTypeScriptの定義を提供します。

```tsx
let greeterABI = [
  .
  .
  .
] as const   // greeterABI
```

`Greeter`コントラクトのABIです。
コントラクトとUIを同時に開発している場合、通常はそれらを同じリポジトリに配置し、Solidityコンパイラによって生成されたABIをアプリケーション内のファイルとして使用します。 ただし、コントラクトはすでに開発済みで変更されないため、ここではその必要はありません。

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScriptは静的型付け言語です。 この定義を使用して、`Greeter`コントラクトが異なるチェーンにデプロイされているアドレスを指定します。 キーは数値(chainId)で、値は`AddressType`(アドレス)です。

```tsx
const contractAddrs: AddressPerBlockchainType = {
  // Holesky
  17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',

  // Sepolia
  11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
}
```

サポートされている2つのネットワーク、[Holesky](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contact_code)と[Sepolia](https://eth-sepolia.blockscout.com/address/0x7143d5c190F048C8d19fe325b748b081903E3BF0?tab=contact_code)上のコントラクトのアドレスです。

注意: 実際にはRedstone Holesky用に3番目の定義がありますが、これについては後ほど説明します。

```tsx
type ShowObjectAttrsType = {
  name: string,
  object: any
}
```

この型は、`ShowObject`コンポーネント(後述)へのパラメータとして使用されます。 これには、デバッグ目的で表示されるオブジェクトの名前とその値が含まれます。

```tsx
type ShowGreetingAttrsType = {
  greeting: string | undefined
}
```

どの時点でも、あいさつの内容を知っているか(ブロックチェーンから読み取ったため)、知らないか(まだ受信していないため)のどちらかです。 したがって、文字列または何もないかのどちらかになりうる型があると便利です。

##### `Greeter`コンポーネント {#greeter-component}

```tsx
const Greeter = () => {
```

最後に、コンポーネントを定義します。

```tsx
  const { chain } = useNetwork()
```

使用しているチェーンに関する情報は、[wagmi](https://wagmi.sh/react/hooks/useNetwork)から提供されます。
これはフック(`use...`)なので、この情報が変更されるたびにコンポーネントが再描画されます。

```tsx
  const greeterAddr = chain && contractAddrs[chain.id]
```

Greeterコントラクトのアドレスはチェーンによって異なり、チェーン情報がない場合や、そのコントラクトが存在しないチェーン上にある場合は`undefined`になります。

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet" , // No arguments
    watch: true
  })
```

[`useReadContract`フック](https://wagmi.sh/react/api/hooks/useReadContract)は、コントラクトから情報を読み取ります。 UIで`readResults`を展開すると、それが返す情報を正確に確認できます。 この場合、あいさつが変更されたときに通知されるように、監視を続けたいと考えています。

**注意:** [`setGreeting`イベント](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=logs)をリッスンして、あいさつが変更されたことを知り、そのように更新することもできます。 ただし、より効率的かもしれませんが、すべての場合に適用できるわけではありません。 ユーザーが異なるチェーンに切り替えると、あいさつも変更されますが、その変更にはイベントが伴いません。 イベントをリッスンするコード部分と、チェーンの変更を識別する部分を分けることもできますが、それは単に[`watch`パラメータ](https://wagmi.sh/react/api/hooks/useReadContract#watch-optional)を設定するよりも複雑になります。

```tsx
  const [ newGreeting, setNewGreeting ] = useState("")
```

Reactの[`useState`フック](https://www.w3schools.com/react/react_usestate.asp)を使用すると、コンポーネントのレンダリング間で値が持続する状態変数を指定できます。 初期値はパラメータであり、この場合は空の文字列です。

`useState`フックは、2つの値を持つリストを返します。

1. 状態変数の現在の値。
2. 必要に応じて状態変数を変更する関数。 これはフックなので、呼び出されるたびにコンポーネントが再レンダリングされます。

この場合、ユーザーが設定したい新しいあいさつのために状態変数を使用しています。

```tsx
  const greetingChange : ChangeEventHandler<HTMLInputElement> = (evt) =>
    setNewGreeting(evt.target.value)
```

これは、新しいあいさつ入力フィールドが変更されたときのイベントハンドラです。 型[`ChangeEventHandler<HTMLInputElement>`](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/)は、これがHTML入力要素の値の変更に対するハンドラであることを指定します。 この`<HTMLInputElement>`の部分は、これが[ジェネリック型](https://www.w3schools.com/typescript/typescript_basic_generics.php)であるために使用されます。

```tsx
  const preparedTx = usePrepareContractWrite({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [ newGreeting ]
  })
  const workingTx = useContractWrite(preparedTx.config)
```

これは、クライアント側からブロックチェーントランザクションを送信するプロセスです。

1. [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas)を使用して、ブロックチェーン上のノードにトランザクションを送信します。
2. ノードからの応答を待ちます。
3. 応答が受信されたら、ウォレットを介してユーザーにトランザクションへの署名を求めます。 このステップは、ノードの応答が受信された後に行う_必要_があります。なぜなら、ユーザーは署名する前にトランザクションのガス代を表示されるからです。
4. ユーザーが承認するのを待ちます。
5. 今度は[`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction)を使用して、トランザクションを再度送信します。

ステップ2は、体感できるほどの時間がかかる可能性があり、その間、ユーザーは自分のコマンドがユーザーインターフェースで本当に受信されたのか、なぜまだトランザクションへの署名を求められないのか、疑問に思うでしょう。 それは、悪いユーザーエクスペリエンス(UX)につながります。

解決策は、[prepareフック](https://wagmi.sh/react/prepare-hooks)を使用することです。 パラメータが変更されるたびに、すぐにノードに`eth_estimateGas`リクエストを送信します。 そして、ユーザーが実際にトランザクションを送信したいとき(この場合は**あいさつの更新**を押す)、ガス代が既知であるため、ユーザーはすぐにウォレットページを見ることができます。

```tsx
  return (
```

これで、ついに返す実際のHTMLを作成できます。

```tsx
    <>
      <h2>Greeter</h2>
      {
        !readResults.isError && !readResults.isLoading &&
          <ShowGreeting greeting={readResults.data} />
      }
      <hr />
```

`ShowGreeting`コンポーネント(後述)を作成しますが、あいさつがブロックチェーンから正常に読み取られた場合に限ります。

```tsx
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />
```

これは、ユーザーが新しいあいさつを設定できる入力テキストフィールドです。 ユーザーがキーを押すたびに、`greetingChange`が呼び出され、それが`setNewGreeting`を呼び出します。 `setNewGreeting`は`useState`フックから来ているので、これにより`Greeter`コンポーネントが再びレンダリングされます。 このことは、次のことを意味します。

- 新しいあいさつの値を保持するために`value`を指定する必要があります。そうしないと、デフォルトの空の文字列に戻ってしまいます。
- `usePrepareContractWrite`は`newGreeting`が変更されるたびに呼び出されるため、準備されたトランザクションには常に最新の`newGreeting`が含まれます。

```tsx
      <button disabled={!workingTx.write}
              onClick={workingTx.write}
      >
        あいさつの更新
      </button>
```

`workingTx.write`がない場合は、あいさつの更新を送信するために必要な情報をまだ待っているため、ボタンは無効になります。 `workingTx.write`の値がある場合、それがトランザクションを送信するために呼び出す関数です。

```tsx
      <hr />
      <ShowObject name="readResults" object={readResults} />
      <ShowObject name="preparedTx" object={preparedTx} />
      <ShowObject name="workingTx" object={workingTx} />
    </>
  )
}
```

最後に、何をしているかを確認しやすくするために、使用する3つのオブジェクトを表示します。

- `readResults`
- `preparedTx`
- `workingTx`

##### `ShowGreeting`コンポーネント {#showgreeting-component}

このコンポーネントは、

```tsx
const ShowGreeting = (attrs : ShowGreetingAttrsType) => {
```

コンポーネント関数は、コンポーネントのすべての属性を持つパラメータを受け取ります。

```tsx
  return <b>{attrs.greeting}</b>
}
```

##### `ShowObject`コンポーネント {#showobject-component}

情報提供を目的として、`ShowObject`コンポーネントを使用して、重要なオブジェクト(あいさつを読み取るための`readResults`と、作成するトランザクションのための`preparedTx`および`workingTx`)を表示します。

```tsx
const ShowObject = (attrs: ShowObjectAttrsType ) => {
  const keys = Object.keys(attrs.object)
  const funs = keys.filter(k => typeof attrs.object[k] == "function")
  return <>
    <details>
```

すべての情報でUIが乱雑にならないように、表示したり閉じたりできるようにするために、[`details`](https://www.w3schools.com/tags/tag_details.asp)タグを使用します。

```tsx
      <summary>{attrs.name}</summary>
      <pre>
        {JSON.stringify(attrs.object, null, 2)}
```

ほとんどのフィールドは、[`JSON.stringify`](https://www.w3schools.com/js/js_json_stringify.asp)を使用して表示されます。

```tsx
      </pre>
      { funs.length > 0 &&
        <>
          Functions:
          <ul>
```

例外は関数で、[JSON標準](https://www.json.org/json-en.html)の一部ではないため、別々に表示する必要があります。

```tsx
          {funs.map((f, i) =>
```

JSX内では、`{`中括弧`}`内のコードはJavaScriptとして解釈されます。 そして、`(`丸括弧`)`内のコードは、再びJSXとして解釈されます。

```tsx
           (<li key={i}>{f}</li>)
                )}
```

Reactは、[DOMツリー](https://www.w3schools.com/js/js_htmldom.asp)内のタグに一意の識別子を必要とします。 これは、同じタグの子(この場合は、[順序なしリスト](https://www.w3schools.com/tags/tag_ul.asp))が、異なる`key`属性を必要とすることを意味します。

```tsx
          </ul>
        </>
      }
    </details>
  </>
}
```

様々なHTMLタグを閉じます。

##### 最後の`export` {#the-final-export}

```tsx
export { Greeter }
```

`Greeter`コンポーネントは、アプリケーションにエクスポートする必要があるものです。

#### `src/wagmi.ts` {#wagmi-ts}

最後に、WAGMIに関連するさまざまな定義が`src/wagmi.ts`にあります。 ほとんどが変更する必要のない定型文であるため、ここではすべてを説明するつもりはありません。

ここでのコードは、記事の後半で別のチェーン([Redstone Holesky](https://redstone.xyz/docs/network-info))を追加するため、[GitHub上のもの](https://github.com/qbzzt/20230801-modern-ui/blob/main/src/wagmi.ts)と完全に同じではありません。

```ts
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { holesky, sepolia } from 'wagmi/chains'
```

アプリケーションがサポートするブロックチェーンをインポートします。 サポートされているチェーンのリストは、[viemのGitHub](https://github.com/wagmi-dev/viem/tree/main/src/chains/definitions)で確認できます。

```ts
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = 'c96e690bb92b6311e8e9b2a6a22df575'
```

[WalletConnect](https://walletconnect.com/)を使用するには、アプリケーションのプロジェクトIDが必要です。 これは[cloud.walletconnect.com](https://cloud.walletconnect.com/sign-in)で取得できます。

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

### 別のブロックチェーンの追加 {#add-blockchain}

最近では多くの[L2スケーリングソリューション](/layer-2/)があり、viemがまだサポートしていないものをサポートしたいと思うかもしれません。 そのためには、`src/wagmi.ts`を修正します。 これらの手順は、[Redstone Holesky](https://redstone.xyz/docs/network-info)を追加する方法を説明しています。

1. viemから`defineChain`型をインポートします。

   ```ts
   import { defineChain } from 'viem'
   ```

2. ネットワーク定義を追加します。

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

3. `configureChains`呼び出しに新しいチェーンを追加します。

   ```ts
    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [ holesky, sepolia, redstoneHolesky ],
      [ publicProvider(), ],
    )
   ```

4. アプリケーションが新しいネットワーク上のコントラクトのアドレスを認識していることを確認します。 この場合、`src/components/Greeter.tsx`を次のように変更します。

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

## 結論 {#conclusion}

もちろん、`Greeter`のユーザーインターフェースを提供することには、実際には関心がないでしょう。 独自のコントラクト用のユーザーインターフェースを作成したいはずです。 独自のアプリケーションを作成するには、次の手順を実行します。

1. wagmiアプリケーションを作成するよう指定します。

   ```sh copy
   pnpm create wagmi
   ```

2. アプリケーションに名前を付けます。

3. **React**フレームワークを選択します。

4. **Vite**バリアントを選択します。

5. [Rainbow kitを追加](https://www.rainbowkit.com/docs/installation#manual-setup)できます。

さあ、あなたのコントラクトを世界中の人々が使えるようにしましょう。

[私の他の作品はこちらでご覧いただけます](https://cryptodocguy.pro/).

