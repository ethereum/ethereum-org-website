---
title: "Web3アプリ用のサーバーコンポーネントとエージェント"
description: "このチュートリアルを読むと、ブロックチェーン上のイベントをリッスンし、それに応じて独自のトランザクションで応答するTypeScriptサーバーを作成できるようになります。 これにより、(サーバーが単一障害点であるため) 集中型アプリケーションを作成できますが、Web3エンティティと対話できます。 同じ技術は、人間が介在することなくオンチェーンイベントに応答するエージェントを作成するためにも使用できます。"

author: Ori Pomerantz
lang: ja
tags: [ "エージェント", "サーバー", "オフチェーン" ]
skill: beginner
published: 2024-07-15
---

## はじめに {#introduction}

ほとんどの場合、分散型アプリはソフトウェアを配布するためにサーバーを使用しますが、実際のインタラクションはすべてクライアント(通常はWebブラウザ)とブロックチェーンの間で行われます。

![Webサーバー、クライアント、ブロックチェーン間の通常のインタラクション](./fig-1.svg)

ただし、アプリケーションが独立して実行されるサーバーコンポーネントを持つことでメリットが得られるケースもあります。 このようなサーバーは、トランザクションを発行することで、イベントやAPIなどの他のソースからのリクエストに応答できます。

![サーバーを追加した場合のインタラクション](./fig-2.svg)

このようなサーバーが果たすことのできるタスクには、いくつか考えられます。

- 秘密の状態の保持者。 ゲームでは、ゲームが知っているすべての情報をプレイヤーが利用できるようにしない方が便利なことがよくあります。 しかし、_ブロックチェーン上に秘密はありません_。ブロックチェーンにある情報は誰でも簡単に見つけ出すことができます。 したがって、ゲームの状態の一部を秘密にしておく必要がある場合は、それを別の場所に保存する必要があります(そして、おそらくその状態の効果を[ゼロ知識証明](/zero-knowledge-proofs)を使用して検証する必要があります)。

- 集中型オラクル。 ステークが十分に低い場合、オンラインで情報を読み取ってからチェーンに投稿する外部サーバーは、[オラクル](/developers/docs/oracles/)として使用するのに十分な場合があります。

- エージェント。 ブロックチェーン上では、それをアクティブにするトランザクションがなければ何も起こりません。 サーバーは、ユーザーに代わって、機会が生じたときに[アービトラージ](/developers/docs/mev/#mev-examples-dex-arbitrage)などのアクションを実行できます。

## サンプルプログラム {#sample-program}

サンプルサーバーは[github](https://github.com/qbzzt/20240715-server-component)でご覧いただけます。 このサーバーは、HardhatのGreeterの修正版である[このコントラクト](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code)からのイベントをリッスンします。 挨拶が変更されると、それを元に戻します。

実行方法：

1. リポジトリをクローンします。

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. 必要なパッケージをインストールします。 まだインストールしていない場合は、まず[Nodeをインストール](https://nodejs.org/en/download/package-manager)してください。

   ```sh copy
   npm install
   ```

3. `.env`を編集して、Holeskyテストネット上にETHを持つアカウントの秘密鍵を指定します。 Holesky上にETHをお持ちでない場合は、[このフォーセット](https://holesky-faucet.pk910.de/)を使用できます。

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <ここに秘密鍵を入力>
   ```

4. サーバーを起動します。

   ```sh copy
   npm start
   ```

5. [ブロックエクスプローラー](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract)にアクセスし、秘密鍵を持つアドレスとは異なるアドレスを使用して挨拶を変更します。 挨拶が自動的に元に戻されることを確認してください。

### 仕組み {#how-it-works}

サーバーコンポーネントの書き方を理解する最も簡単な方法は、サンプルを一行ずつ見ていくことです。

#### `src/app.ts` {#src-app-ts}

プログラムの大部分は[`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts)に含まれています。

##### 前提条件となるオブジェクトの作成

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

これらは、私たちが必要とする[Viem](https://viem.sh/)のエンティティ、関数、および[`Address` 型](https://viem.sh/docs/glossary/types#address)です。 このサーバーは[TypeScript](https://www.typescriptlang.org/)で書かれています。これは、JavaScriptを[強く型付け](https://en.wikipedia.org/wiki/Strong_and_weak_typing)されたものにする拡張機能です。

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[この関数](https://viem.sh/docs/accounts/privateKey)を使用すると、秘密鍵に対応するウォレット情報(アドレスを含む)を生成できます。

```typescript
import { holesky } from "viem/chains"
```

Viemでブロックチェーンを使用するには、その定義をインポートする必要があります。 このケースでは、[Holesky](https://github.com/eth-clients/holesky)テストブロックチェーンに接続します。

```typescript
// これは.envの定義をprocess.envに追加する方法です。
import * as dotenv from "dotenv"
dotenv.config()
```

これは、`.env`を環境に読み込む方法です。 これは後で説明する秘密鍵のために必要です。

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

コントラクトを使用するには、そのアドレスと[ABI](/glossary/#abi)が必要です。 ここでは両方を提供します。

JavaScript (したがってTypeScript) では、定数に新しい値を代入することはできませんが、その中に格納されているオブジェクトを_変更する_ことはできます。 `as const`という接尾辞を使用することで、リスト自体が定数であり、変更できないことをTypeScriptに伝えています。

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

Viemの[パブリッククライアント](https://viem.sh/docs/clients/public.html)を作成します。 パブリッククライアントには秘密鍵がアタッチされていないため、トランザクションを送信できません。 これらは[`view` 関数](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm)を呼び出したり、アカウント残高を読み取ったりすることができます。

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

環境変数は[`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env)で利用できます。 しかし、TypeScriptは強く型付けされています。 環境変数は任意の文字列または空にすることができるため、環境変数の型は`string | undefined`です。 しかし、Viemではキーは`0x${string}`(文字列が続く`0x`)として定義されています。 ここで、`PRIVATE_KEY`環境変数がその型になることをTypeScriptに伝えます。 そうでない場合は、ランタイムエラーが発生します。

[`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey)関数は、この秘密鍵を使用して完全なアカウントオブジェクトを作成します。

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

次に、アカウントオブジェクトを使用して[ウォレットクライアント](https://viem.sh/docs/clients/wallet)を作成します。 このクライアントは秘密鍵とアドレスを持っているため、トランザクションの送信に使用できます。

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

すべての前提条件が整ったので、ようやく[コントラクトインスタンス](https://viem.sh/docs/contract/getContract)を作成できます。 このコントラクトインスタンスを使用して、オンチェーンコントラクトと通信します。

##### ブロックチェーンからの読み取り

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

読み取り専用のコントラクト関数 ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) と [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)) は `read` で利用できます。 この場合、これを使用して[`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217)関数にアクセスし、挨拶を返します。

JavaScriptはシングルスレッドなので、時間のかかるプロセスを実行する場合は、[非同期で実行することを指定する](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE)必要があります。 ブロックチェーンを呼び出すには、読み取り専用の操作であっても、コンピュータとブロックチェーンノード間のラウンドトリップが必要です。 これが、ここでコードが結果を`await`する必要があると指定する理由です。

この仕組みに興味がある場合は、[こちら](https://www.w3schools.com/js/js_promise.asp)で読むことができますが、実際には、時間がかかる操作を開始する場合は結果を`await`すること、およびこれを行う関数は`async`として宣言する必要があることだけを知っていれば十分です。

##### トランザクションの発行

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

これは、挨拶を変更するトランザクションを発行するために呼び出す関数です。 これは時間のかかる操作なので、関数は`async`として宣言されています。 内部実装のため、`async`関数は`Promise`オブジェクトを返す必要があります。 この場合、`Promise<any>`は、`Promise`で何が返されるかを正確に指定しないことを意味します。

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

コントラクトインスタンスの`write`フィールドには、[`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862)など、ブロックチェーンの状態に書き込む(トランザクションの送信を必要とする)すべての関数が含まれています。 パラメータがある場合はリストとして提供され、関数はトランザクションのハッシュを返します。

```typescript
    console.log(`Working on a fix, see https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

トランザクションのハッシュを報告し(表示するためのブロックエクスプローラーへのURLの一部として)、それを返します。

##### イベントへの応答

```typescript
greeter.watchEvent.SetGreeting({
```

[`watchEvent` 関数](https://viem.sh/docs/actions/public/watchEvent)を使用すると、イベントが発行されたときに実行する関数を指定できます。 1種類のイベント(この場合は `SetGreeting`)のみに関心がある場合は、この構文を使用してそのイベントタイプに限定できます。

```typescript
    onLogs: logs => {
```

`onLogs`関数は、ログエントリがある場合に呼び出されます。 イーサリアムでは、「ログ」と「イベント」は通常、同じ意味で使われます。

```typescript
console.log(
  `Address ${logs[0].args.sender} changed the greeting to ${logs[0].args.greeting}`
)
```

複数のイベントが発生する可能性がありますが、簡単にするために最初のイベントのみを扱います。 `logs[0].args`はイベントの引数で、この場合は`sender`と`greeting`です。

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} insists on it being Hello!`)
    }
})
```

送信者がこのサーバーで_ない_場合は、`setGreeting`を使用して挨拶を変更します。

#### `package.json` {#package-json}

[このファイル](https://github.com/qbzzt/20240715-server-component/blob/main/package.json)は[Node.js](https://nodejs.org/en)の設定を制御します。 この記事では、重要な定義のみを説明します。

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

スクリプトは、さまざまなアプリケーションのアクションです。 この場合、私たちが持っているのは`start`だけで、これはサーバーをコンパイルしてから実行します。 `tsc`コマンドは`typescript`パッケージの一部で、TypeScriptをJavaScriptにコンパイルします。 手動で実行したい場合は、`node_modules/.bin`にあります。 2番目のコマンドはサーバーを実行します。

```json
  "type": "module",
```

JavaScriptノードアプリケーションには複数のタイプがあります。 `module`タイプを使用すると、トップレベルのコードで`await`を使用できます。これは、遅い(そして非同期の)操作を行う場合に重要です。

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

これらは開発にのみ必要なパッケージです。 ここでは`typescript`が必要で、Node.jsでそれを使用しているため、`process`などのノード変数やオブジェクトの型も取得しています。 [`^<version>`表記](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004)は、そのバージョンまたは破壊的変更のないそれ以降のバージョンを意味します。 バージョン番号の意味の詳細については、[こちら](https://semver.org)を参照してください。

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

これらは、`dist/app.js`を実行する際に、ランタイムで必要なパッケージです。

## 結論 {#conclusion}

ここで作成した集中型サーバーは、ユーザーのエージェントとして機能するという役割を果たします。 dappの機能を継続させたい、ガスを消費しても構わないという人なら誰でも、自分のアドレスでサーバーの新しいインスタンスを実行できます。

ただし、これは集中型サーバーのアクションが簡単に検証できる場合にのみ機能します。 集中型サーバーに秘密の状態情報があったり、難しい計算を実行したりする場合、それはアプリケーションを使用するために信頼する必要がある集中型エンティティであり、これはまさにブロックチェーンが避けようとしていることです。 今後の記事では、この問題を回避するために[ゼロ知識証明](/zero-knowledge-proofs)を使用する方法を紹介する予定です。

[私の他の作品はこちらでご覧いただけます](https://cryptodocguy.pro/).
