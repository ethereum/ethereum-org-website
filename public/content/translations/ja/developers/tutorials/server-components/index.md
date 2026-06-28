---
title: "web3アプリのサーバーコンポーネントとエージェント"
description: "このチュートリアルを読むと、ブロックチェーン上のイベントをリッスンし、それに応じて独自のトランザクションで応答するTypeScriptサーバーを作成できるようになります。これにより、中央集権型アプリケーション（サーバーが単一障害点となるため）でありながら、web3エンティティと対話できるアプリケーションを作成できます。同じ手法を使用して、人間が介入することなくオンチェーンイベントに応答するエージェントを作成することもできます。"
author: "オリ・ポメランツ"
lang: ja
tags: ["エージェント", "サーバー", "オフチェーン", "dapps"]
skill: beginner
breadcrumb: "サーバーコンポーネント"
published: 2024-07-15
---

## はじめに {#introduction}

ほとんどの場合、分散型アプリケーション (dapp) はソフトウェアを配布するためにサーバーを使用しますが、実際の対話はすべてクライアント（通常はウェブブラウザ）とブロックチェーンの間で行われます。

![Normal interaction between web server, client, and blockchain](./fig-1.svg)

しかし、アプリケーションが独立して実行されるサーバーコンポーネントを持つことでメリットを得られるケースもあります。そのようなサーバーは、トランザクションを発行することで、イベントやAPIなどの他のソースからのリクエストに応答できるようになります。

![The interaction with the addition of a server](./fig-2.svg)

そのようなサーバーが実行できるタスクには、いくつかの可能性があります。

- 秘密の状態の保持者。ゲームでは、ゲームが知っているすべての情報をプレイヤーに公開しないことが役立つことがよくあります。しかし、_ブロックチェーン上に秘密はありません_。ブロックチェーン上にある情報は、誰でも簡単に把握できます。したがって、ゲームの状態の一部を秘密にしておく必要がある場合は、別の場所に保存する必要があります（そして、おそらく[ゼロ知識証明](/zero-knowledge-proofs)を使用してその状態の影響を検証します）。

- 中央集権型オラクル。リスクが十分に低い場合、オンラインで情報を読み取り、それをチェーンに投稿する外部サーバーは、[オラクル](/developers/docs/oracles/)として使用するのに十分な場合があります。

- エージェント。ブロックチェーン上では、それをアクティブにするトランザクションなしには何も起こりません。サーバーはユーザーの代わりに行動し、機会が訪れたときに[アービトラージ](/developers/docs/mev/#mev-examples-dex-arbitrage)などのアクションを実行できます。

## サンプルプログラム {#sample-program}

サンプルサーバーは[GitHubで](https://github.com/qbzzt/20240715-server-component)確認できます。このサーバーは、HardhatのGreeterの修正版である[このコントラクト](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code)から来るイベントをリッスンします。挨拶（greeting）が変更されると、それを元に戻します。

実行するには：

1. リポジトリをクローンします。

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. 必要なパッケージをインストールします。まだインストールしていない場合は、[先にNode.jsをインストールしてください](https://nodejs.org/en/download/package-manager)。

   ```sh copy
   npm install
   ```

3. `.env` を編集して、ホルスキーテストネット上にETHを持つアカウントの秘密鍵を指定します。ホルスキー上にETHがない場合は、[このフォーセットを使用](https://holesky-faucet.pk910.de/)できます。

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <private key goes here>
   ```

4. サーバーを起動します。

   ```sh copy
   npm start
   ```

5. [ブロック・エクスプローラー](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract)にアクセスし、秘密鍵を持つアドレスとは別のアドレスを使用して挨拶を変更します。挨拶が自動的に元に戻ることを確認してください。

### どのような仕組みですか？ {#how-it-works}

サーバーコンポーネントの書き方を理解する最も簡単な方法は、サンプルを1行ずつ確認することです。

#### `src/app.ts` {#src-app-ts}

プログラムの大部分は [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts) に含まれています。

##### 前提となるオブジェクトの作成

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

これらは必要な[Viem](https://viem.sh/)のエンティティ、関数、および[`Address` 型](https://viem.sh/docs/glossary/types#address)です。このサーバーは[TypeScript](https://www.typescriptlang.org/)で書かれています。これはJavaScriptの拡張であり、[強い型付け](https://en.wikipedia.org/wiki/Strong_and_weak_typing)を可能にします。

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[この関数](https://viem.sh/docs/accounts/privateKey)を使用すると、秘密鍵に対応するアドレスを含むウォレット情報を生成できます。

```typescript
import { holesky } from "viem/chains"
```

Viemでブロックチェーンを使用するには、その定義をインポートする必要があります。この場合、[ホルスキー](https://github.com/eth-clients/holesky)テストブロックチェーンに接続します。

```typescript
// これが.envの定義をprocess.envに追加する方法です。
import * as dotenv from "dotenv"
dotenv.config()
```

これは `.env` を環境に読み込む方法です。秘密鍵のためにこれが必要です（後述）。

```typescript
const greeterAddress : Address = "0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6"
const greeterABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
         .
         .
         .
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "name": "setGreeting",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const
```

コントラクトを使用するには、そのアドレスと[ABI](/glossary/#abi)が必要です。ここでは両方を提供します。

JavaScript（およびTypeScript）では、定数に新しい値を割り当てることはできませんが、そこに保存されているオブジェクトを変更することは_可能_です。接尾辞 `as const` を使用することで、リスト自体が定数であり変更できないことをTypeScriptに伝えています。

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

Viemの[パブリッククライアント](https://viem.sh/docs/clients/public.html)を作成します。パブリッククライアントには秘密鍵が添付されていないため、トランザクションを送信することはできません。[`view` 関数](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm)の呼び出しや、アカウント残高の読み取りなどが可能です。

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

環境変数は [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env) で利用できます。しかし、TypeScriptは強い型付けを持っています。環境変数は任意の文字列または空になる可能性があるため、環境変数の型は `string | undefined` になります。しかし、Viemでは鍵は `0x${string}` （`0x` の後に文字列が続く）として定義されています。ここでは、`PRIVATE_KEY` 環境変数がその型になることをTypeScriptに伝えます。そうでない場合は、ランタイムエラーが発生します。

次に、[`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) 関数はこの秘密鍵を使用して完全なアカウントオブジェクトを作成します。

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

次に、アカウントオブジェクトを使用して[ウォレットクライアント](https://viem.sh/docs/clients/wallet)を作成します。このクライアントには秘密鍵とアドレスがあるため、トランザクションの送信に使用できます。

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

これですべての前提条件が整ったので、最後に[コントラクトインスタンス](https://viem.sh/docs/contract/getContract)を作成できます。このコントラクトインスタンスを使用して、オンチェーンのコントラクトと通信します。

##### ブロックチェーンからの読み取り

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

読み取り専用のコントラクト関数（[`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) および [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)）は `read` の下で利用できます。この場合、これを使用して挨拶を返す [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217) 関数にアクセスします。

JavaScriptはシングルスレッドであるため、時間のかかるプロセスを起動する場合は、[非同期で実行することを指定](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE)する必要があります。読み取り専用の操作であっても、ブロックチェーンを呼び出すには、コンピューターとブロックチェーンノード間の往復が必要です。これが、ここでコードが結果を `await` する必要があると指定する理由です。

これがどのように機能するかに興味がある場合は、[こちらをお読みください](https://www.w3schools.com/js/js_promise.asp)。しかし、実用的な観点から知っておくべきことは、時間のかかる操作を開始する場合は結果を `await` すること、そしてこれを行う関数は `async` として宣言する必要があるということだけです。

##### トランザクションの発行

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

これは、挨拶を変更するトランザクションを発行するために呼び出す関数です。これは時間のかかる操作であるため、関数は `async` として宣言されています。内部実装の都合上、すべての `async` 関数は `Promise` オブジェクトを返す必要があります。この場合、`Promise<any>` は `Promise` で正確に何が返されるかを指定しないことを意味します。

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

コントラクトインスタンスの `write` フィールドには、[`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862) など、ブロックチェーンの状態に書き込む（トランザクションの送信を必要とする）すべての関数が含まれています。パラメータがある場合はリストとして提供され、関数はトランザクションのハッシュを返します。

```typescript
    console.log(`Working on a fix, see https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

トランザクションのハッシュを（それを表示するためのブロック・エクスプローラーへのURLの一部として）報告し、それを返します。

##### イベントへの応答

```typescript
greeter.watchEvent.SetGreeting({
```

[`watchEvent` 関数](https://viem.sh/docs/actions/public/watchEvent)を使用すると、イベントが発行されたときに実行する関数を指定できます。1種類のイベント（この場合は `SetGreeting`）のみに関心がある場合は、この構文を使用してそのイベントタイプに限定できます。

```typescript
    onLogs: logs => {
```

ログエントリがある場合、`onLogs` 関数が呼び出されます。イーサリアムでは、「ログ」と「イベント」は通常、互換的に使用されます。

```typescript
console.log(
  `Address ${logs[0].args.sender} changed the greeting to ${logs[0].args.greeting}`
)
```

複数のイベントが存在する可能性がありますが、簡単にするために最初のイベントのみを考慮します。`logs[0].args` はイベントの引数であり、この場合は `sender` と `greeting` です。

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} insists on it being Hello!`)
    }
})
```

送信者がこのサーバーで_ない_場合は、`setGreeting` を使用して挨拶を変更します。

#### `package.json` {#package-json}

[このファイル](https://github.com/qbzzt/20240715-server-component/blob/main/package.json)は[Node.js](https://nodejs.org/en)の設定を制御します。この記事では重要な定義のみを説明します。

```json
{
  "main": "dist/index.js",
```

この定義は、実行するJavaScriptファイルを指定します。

```json
  "scripts": {
    "start": "tsc && node dist/app.js",
  },
```

スクリプトはさまざまなアプリケーションのアクションです。この場合、`start` のみが存在し、これはサーバーをコンパイルしてから実行します。`tsc` コマンドは `typescript` パッケージの一部であり、TypeScriptをJavaScriptにコンパイルします。手動で実行したい場合は、`node_modules/.bin` にあります。2番目のコマンドはサーバーを実行します。

```json
  "type": "module",
```

JavaScriptのノードアプリケーションには複数のタイプがあります。`module` タイプを使用すると、トップレベルのコードで `await` を使用できるようになります。これは、時間のかかる（そして非同期の）操作を行う場合に重要です。

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

これらは開発にのみ必要なパッケージです。ここでは `typescript` が必要であり、Node.jsと一緒に使用しているため、`process` などのノード変数やオブジェクトの型も取得しています。[`^<version>` という表記](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004)は、そのバージョン、または破壊的変更を含まないより高いバージョンを意味します。バージョン番号の意味について詳しくは、[こちら](https://semver.org)をご覧ください。

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

これらは、`dist/app.js` を実行する際のランタイムに必要なパッケージです。

## まとめ {#conclusion}

ここで作成した中央集権型サーバーは、ユーザーのエージェントとして機能するという役割を果たします。dappを機能させ続けたいと考え、ガスを消費しても構わない他の誰でも、自分のアドレスでサーバーの新しいインスタンスを実行できます。

しかし、これは中央集権型サーバーのアクションが簡単に検証できる場合にのみ機能します。中央集権型サーバーが秘密の状態情報を持っていたり、難しい計算を実行したりする場合、それはアプリケーションを使用するために信頼する必要がある中央集権的なエンティティとなり、これはまさにブロックチェーンが避けようとしていることです。今後の記事では、この問題を回避するために[ゼロ知識証明](/zero-knowledge-proofs)を使用する方法を紹介する予定です。

[私の他の作品についてはこちらをご覧ください](https://cryptodocguy.pro/)。