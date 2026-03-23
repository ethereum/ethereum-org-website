---
title: "秘密のステートにゼロ知識を使用する"
description: "オンチェーンゲームは隠された情報を保持できないため、制限があります。 このチュートリアルを読むと、読者はゼロ知識証明とサーバーコンポーネントを組み合わせて、オフチェーンコンポーネントで秘密のステートを持つ検証可能なゲームを作成できるようになります。 これを行うための手法は、マインスイーパゲームを作成することで実証されます。"
author: Ori Pomerantz
tags:
  [
    "サーバー",
    "オフチェーン",
    "中央集権型",
    "ゼロ知識",
    "zokrates",
    "mud"
  ]
skill: advanced
lang: ja
published: 2025-03-15
---

ブロックチェーンには秘密はありません。 ブロックチェーンに投稿されたものはすべて、誰でも読むことができます。 ブロックチェーンは誰でも検証できることに基づいているため、これが必要です。 しかし、ゲームはしばしば秘密のステートに依存します。 例えば、[マインスイーパ](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\))というゲームは、ブロックチェーンエクスプローラーでマップを見ることができれば、まったく意味がありません。

最も簡単な解決策は、[サーバーコンポーネント](/developers/tutorials/server-components/)を使用して秘密のステートを保持することです。 しかし、私たちがブロックチェーンを使用する理由は、ゲームデベロッパーによる不正行為を防ぐためです。 サーバーコンポーネントの誠実性を確保する必要があります。 サーバーはステートのハッシュを提供し、[ゼロ知識証明](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important)を使用して、動きの結果を計算するために使用されたステートが正しいものであることを証明できます。

この記事を読んだ後、あなたはこの種の秘密のステートを保持するサーバー、ステートを表示するためのクライアント、そして両者間の通信のためのオンチェーンコンポーネントを作成する方法を知るでしょう。 使用する主なツールは次のとおりです。

| ツール                                           | 目的                          |                               検証済みバージョン |
| --------------------------------------------- | --------------------------- | --------------------------------------: |
| [Zokrates](https://zokrates.github.io/)       | ゼロ知識証明とその検証                 |   1.1.9 |
| [Typescript](https://www.typescriptlang.org/) | サーバーとクライアントの両方のためのプログラミング言語 |   5.4.2 |
| [Node](https://nodejs.org/en)                 | サーバーの実行                     | 20.18.2 |
| [Viem](https://viem.sh/)                      | ブロックチェーンとの通信                |  2.9.20 |
| [MUD](https://mud.dev/)                       | オンチェーンデータ管理                 |  2.0.12 |
| [React](https://react.dev/)                   | クライアントのユーザーインターフェース         |  18.2.0 |
| [Vite](https://vitejs.dev/)                   | クライアントコードの提供                |   4.2.1 |

## マインスイーパの例 {#minesweeper}

[マインスイーパ](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\))は、地雷原のある秘密のマップを含むゲームです。 プレイヤーは特定の場所を掘ることを選択します。 その場所に地雷があれば、ゲームオーバーです。 そうでなければ、プレイヤーはその場所を囲む8つのマスにある地雷の数を取得します。

このアプリケーションは、[key-valueデータベース](https://aws.amazon.com/nosql/key-value/)を使用してデータをオンチェーンに保存し、そのデータをオフチェーンコンポーネントと自動的に同期させるフレームワークである[MUD](https://mud.dev/)を使用して書かれています。 同期に加えて、MUDはアクセス制御を容易にし、他のユーザーが私たちのアプリケーションをパーミッションレスで[拡張](https://mud.dev/guides/extending-a-world)できるようにします。

### マインスイーパの例の実行 {#running-minesweeper-example}

マインスイーパの例を実行するには：

1. [前提条件がインストールされている](https://mud.dev/quickstart#prerequisites)ことを確認してください：[Node](https://mud.dev/quickstart#prerequisites)、[Foundry](https://book.getfoundry.sh/getting-started/installation)、[`git`](https://git-scm.com/downloads)、[`pnpm`](https://git-scm.com/downloads)、そして[`mprocs`](https://github.com/pvolok/mprocs)。

2. リポジトリをクローンします。

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. パッケージをインストールします。

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   npm install -g mprocs
   ```

   `pnpm install`の一部としてFoundryがインストールされた場合は、コマンドラインシェルを再起動する必要があります。

4. コントラクトをコンパイルする

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```

5. プログラム（[anvil](https://book.getfoundry.sh/anvil/)ブロックチェーンを含む）を起動し、待ちます。

   ```sh copy
   mprocs
   ```

   起動には時間がかかることに注意してください。 進捗を確認するには、まず下矢印を使用して _contracts_ タブまでスクロールし、MUDコントラクトがデプロイされていることを確認します。 「_Waiting for file changes…_」というメッセージが表示されたら、コントラクトはデプロイされ、さらなる進捗は _server_ タブで行われます。 そこで、「_Verifier address: 0x...._」というメッセージが表示されるまで待ちます。

   このステップが成功すると、`mprocs`画面が表示され、左側に異なるプロセス、右側に現在選択されているプロセスのコンソール出力が表示されます。

   ![mprocs画面](./mprocs.png)

   `mprocs`に問題がある場合は、4つのプロセスをそれぞれ独自のコマンドラインウィンドウで手動で実行できます：

   - **Anvil**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **コントラクト**

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **サーバー**

     ```sh
     cd packages/server
     pnpm start
     ```

   - **クライアント**

     ```sh
     cd packages/client
     pnpm run dev
     ```

6. これで[クライアント](http://localhost:3000)にアクセスし、**New Game**をクリックしてプレイを開始できます。

### テーブル {#tables}

オンチェーンには[いくつかのテーブル](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts)が必要です。

- `Configuration`: このテーブルはシングルトンであり、キーはなく、単一のレコードを持ちます。 ゲームの構成情報を保持するために使用されます：
  - `height`：地雷原の高さ
  - `width`：地雷原の幅
  - `numberOfBombs`：各地雷原の爆弾の数

- `VerifierAddress`: このテーブルもシングルトンです。 構成の一部である、検証者コントラクトのアドレス(`verifier`)を保持するために使用されます。 この情報を`Configuration`テーブルに入れることもできましたが、サーバーという別のコンポーネントによって設定されるため、別のテーブルに入れる方が簡単です。

- `PlayerGame`: キーはプレイヤーのアドレスです。 データは次のとおりです：

  - `gameId`：プレイヤーがプレイしているマップのハッシュである32バイトの値（ゲーム識別子）。
  - `win`：プレイヤーがゲームに勝ったかどうかを示すブール値。
  - `lose`：プレイヤーがゲームに負けたかどうかを示すブール値。
  - `digNumber`：ゲームでの成功した採掘の数。

- `GamePlayer`: このテーブルは、`gameId`からプレイヤーアドレスへの逆マッピングを保持します。

- `Map`: キーは3つの値のタプルです：

  - `gameId`：プレイヤーがプレイしているマップのハッシュである32バイトの値（ゲーム識別子）。
  - `x` 座標
  - `y` 座標

  値は単一の数値です。 爆弾が検出された場合は255です。 それ以外の場合は、その場所の周りの爆弾の数に1を加えたものです。 爆弾の数だけを使用することはできません。なぜなら、デフォルトではEVM内のすべてのストレージとMUD内のすべての行の値がゼロだからです。 「プレイヤーはまだここを掘っていない」と「プレイヤーはここを掘って、周りに爆弾がゼロであることを見つけた」とを区別する必要があります。

さらに、クライアントとサーバー間の通信はオンチェーンコンポーネントを介して行われます。 これもテーブルを使用して実装されています。

- `PendingGame`: 新しいゲームを開始するための未処理のリクエスト。
- `PendingDig`: 特定のゲームの特定の場所で掘るための未処理のリクエスト。 これは[オフチェーンテーブル](https://mud.dev/store/tables#types-of-tables)であり、EVMストレージには書き込まれず、イベントを使用してオフチェーンでのみ読み取り可能です。

### 実行とデータフロー {#execution-data-flows}

これらのフローは、クライアント、オンチェーンコンポーネント、サーバー間の実行を調整します。

#### 初期化 {#initialization-flow}

`mprocs`を実行すると、次のステップが実行されます：

1. [`mprocs`](https://github.com/pvolok/mprocs)は4つのコンポーネントを実行します：

   - [Anvil](https://book.getfoundry.sh/anvil/)、ローカルブロックチェーンを実行します
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts)、MUDのコントラクトをコンパイル(必要に応じて)し、デプロイします
   - [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client)、UIとクライアントコードをWebブラウザに提供するために[Vite](https://vitejs.dev/)を実行します。
   - [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server)、サーバーアクションを実行します

2. `contracts`パッケージはMUDコントラクトをデプロイし、その後[ `PostDeploy.s.sol` スクリプト](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol)を実行します。 このスクリプトは構成を設定します。 githubのコードは[10x5の地雷原に8つの地雷があること](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23)を指定しています。

3. [サーバー](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts)は[MUDの設定](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6)から始まります。 とりわけ、これによりデータ同期が有効になり、関連するテーブルのコピーがサーバーのメモリに存在することになります。

4. サーバーは、[`Configuration`テーブルが変更されたときに](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23)実行される関数をサブスクライブします。 [この関数](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168)は、`PostDeploy.s.sol`が実行されてテーブルを変更した後に呼び出されます。

5. サーバーの初期化関数が構成を取得すると、[サーバーのゼロ知識部分](#using-zokrates-from-typescript)を初期化するために[`zkFunctions`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35)を呼び出します。 ゼロ知識関数は地雷原の幅と高さを定数として持つ必要があるため、構成を取得するまでこれは実行できません。

6. サーバーのゼロ知識部分が初期化された後、次のステップは[ゼロ知識検証コントラクトをブロックチェーンにデプロイ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53)し、MUDで検証対象のアドレスを設定することです。

7. 最後に、プレイヤーが[新しいゲームの開始](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71)または[既存のゲームでの採掘](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108)をリクエストしたときに表示されるように、アップデートをサブスクライブします。

#### 新しいゲーム {#new-game-flow}

これはプレイヤーが新しいゲームをリクエストしたときに起こることです。

1. このプレイヤーに進行中のゲームがない場合、またはゲームIDがゼロのゲームがある場合、クライアントは[新しいゲームボタン](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175)を表示します。 ユーザーがこのボタンを押すと、[Reactは`newGame`関数を実行します](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96)。

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46)は`System`コールです。 MUDでは、すべての呼び出しは`World`コントラクトを経由し、ほとんどの場合、`<namespace>__<function name>`を呼び出します。 この場合、呼び出しは`app__newGame`であり、MUDはそれを[`GameSystem`の`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22)にルーティングします。

3. オンチェーン関数は、プレイヤーが進行中のゲームを持っていないことを確認し、持っていない場合は[`PendingGame`テーブルにリクエストを追加します](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21)。

4. サーバーは`PendingGame`の変更を検出し、[サブスクライブされた関数を実行します](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71)。 この関数は[`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114)を呼び出し、それがさらに[`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144)を呼び出します。

5. `createGame`が最初に行うことは、[適切な数の地雷を持つランダムなマップを作成することです](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135)。 次に、Zokratesに必要な、空白の境界線を持つマップを作成するために[`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166)を呼び出します。 最後に、`createGame`は[`calculateMapHash`](#calculateMapHash)を呼び出して、ゲームIDとして使用されるマップのハッシュを取得します。

6. `newGame`関数は新しいゲームを`gamesInProgress`に追加します。

7. サーバーが最後に行うことは、オンチェーンにある[`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43)を呼び出すことです。 この関数は、アクセス制御を有効にするために、別の`System`、[`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol)にあります。 アクセス制御は、[MUD構成ファイル](https://mud.dev/config)、[`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72)で定義されています。

   アクセスリストは、単一のアドレスのみが`System`を呼び出すことを許可します。 これにより、サーバー関数へのアクセスが単一のアドレスに制限されるため、誰もサーバーになりすますことはできません。

8. オンチェーンコンポーネントは関連するテーブルを更新します：

   - `PlayerGame`でゲームを作成します。
   - `GamePlayer`で逆マッピングを設定します。
   - `PendingGame`からリクエストを削除します。

9. サーバーは`PendingGame`の変更を識別しますが、[`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60)がfalseであるため、何もしません。

10. クライアントでは、[`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148)はプレイヤーのアドレスの`PlayerGame`エントリに設定されます。 `PlayerGame`が変更されると、`gameRecord`も変更されます。

11. `gameRecord`に値があり、ゲームが勝利または敗北していない場合、クライアントは[マップを表示します](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190)。

#### 採掘 {#dig-flow}

1. プレイヤーは[マップセルのボタンをクリックし](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188)、[ `dig` 関数](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36)を呼び出します。 この関数は[オンチェーンで `dig` を呼び出します](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32)。

2. オンチェーンコンポーネントは[いくつかのサニティチェックを実行し](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30)、成功した場合、採掘リクエストを[`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31)に追加します。

3. サーバーは[`PendingDig`の変更を検出します](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73)。 [それが有効な場合](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84)、結果とそれが有効であることの証明の両方を生成するために[ゼロ知識コードを呼び出します](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95)（後述）。

4. [サーバー](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107)はオンチェーンで[`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64)を呼び出します。

5. `digResponse`は2つのことを行います。 まず、[ゼロ知識証明をチェックします](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61)。 次に、証明がチェックアウトされた場合、実際に結果を処理するために[`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86)を呼び出します。

6. `processDigResult`は、ゲームが[負けた](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78)か[勝った](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86)かを確認し、[オンチェーンマップである`Map`を更新します](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80)。

7. クライアントはアップデートを自動的に取得し、[プレイヤーに表示されるマップを更新し](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190)、該当する場合は勝ちか負けかをプレイヤーに伝えます。

## Zokratesの使用 {#using-zokrates}

上記で説明したフローでは、ゼロ知識の部分をブラックボックスとして扱い、スキップしました。 では、それを開いて、そのコードがどのように書かれているかを見てみましょう。

### マップのハッシュ化 {#hashing-map}

使用するZokratesハッシュ関数である[Poseidon](https://www.poseidon-hash.info)を実装するために、[このJavaScriptコード](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise)を使用できます。 しかし、これは高速ですが、Zokratesハッシュ関数を使用して行うよりも複雑になります。 これはチュートリアルなので、コードはパフォーマンスではなく、シンプルさのために最適化されています。 したがって、2つの異なるZokratesプログラムが必要です。1つはマップのハッシュを計算するためだけのもので（`hash`）、もう1つは実際にマップ上の場所での採掘結果のゼロ知識証明を作成するためのものです（`dig`）。

### ハッシュ関数 {#hash-function}

これはマップのハッシュを計算する関数です。 このコードを一行ずつ見ていきましょう。

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

これら2行は、[Zokrates標準ライブラリ](https://zokrates.github.io/toolbox/stdlib.html)から2つの関数をインポートします。 [最初の関数](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok)は[Poseidonハッシュ](https://www.poseidon-hash.info/)です。 これは[`field`要素](https://zokrates.github.io/language/types.html#field)の配列を受け取り、`field`を返します。

Zokratesのフィールド要素は通常256ビット未満ですが、それほど短くはありません。 コードを簡略化するために、マップを最大512ビットに制限し、4つのフィールドの配列をハッシュ化し、各フィールドでは128ビットのみを使用します。 [`pack128`関数](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok)は、この目的のために128ビットの配列を`field`に変更します。

```
        def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

この行は関数定義を開始します。 `hashMap`は、`map`という単一のパラメータ、2次元の`bool`(ean)配列を取得します。 マップのサイズは、[後で説明する](#why-map-border)理由により、`width+2` x `height+2`です。

Zokratesプログラムはこのアプリケーションで[テンプレート文字列](https://www.w3schools.com/js/js_string_templates.asp)として保存されているため、`${width+2}`と`${height+2}`を使用できます。 `${`と`}`の間のコードはJavaScriptによって評価され、この方法でプログラムは異なるマップサイズに使用できます。 マップパラメータには、爆弾のない1つの場所幅の境界線が周囲にあり、これが幅と高さに2を加える必要がある理由です。

戻り値はハッシュを含む`field`です。

```
   bool[512] mut map1d = [false; 512];
```

マップは2次元です。 しかし、`pack128`関数は2次元配列では機能しません。 そこで、まず`map1d`を使用してマップを512バイトの配列にフラット化します。 デフォルトではZokratesの変数は定数ですが、ループ内でこの配列に値を代入する必要があるため、[`mut`](https://zokrates.github.io/language/variables.html#mutability)として定義します。

Zokratesには`undefined`がないため、配列を初期化する必要があります。 `[false; 512]`という式は、[512個の`false`値の配列](https://zokrates.github.io/language/types.html#declaration-and-initialization)を意味します。

```
   u32 mut counter = 0;
```

また、`map1d`に既に埋め込まれたビットとそうでないビットを区別するためにカウンターも必要です。

```
   for u32 x in 0..${width+2} {
```

これはZokratesで[`for`ループ](https://zokrates.github.io/language/control_flow.html#for-loops)を宣言する方法です。 Zokratesの`for`ループは固定の境界を持つ必要があります。なぜなら、ループのように見えますが、コンパイラは実際にはそれを「展開」するからです。 `width`はTypeScriptコードがコンパイラを呼び出す前に設定されるため、式`${width+2}`はコンパイル時定数です。

```
      for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

マップ内のすべての場所について、その値を`map1d`配列に入れ、カウンターをインクリメントします。

```
    field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

`pack128`は`map1d`から4つの`field`値の配列を作成します。 Zokratesでは`array[a..b]`は`a`で始まり`b-1`で終わる配列のスライスを意味します。

```
    return poseidon(hashMe);
}
```

`poseidon`を使用してこの配列をハッシュに変換します。

### ハッシュプログラム {#hash-program}

サーバーはゲーム識別子を作成するために`hashMap`を直接呼び出す必要があります。 しかし、Zokratesはプログラムを開始するために`main`関数しか呼び出せないため、ハッシュ関数を呼び出す`main`を持つプログラムを作成します。

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### digプログラム {#dig-program}

これはアプリケーションのゼロ知識部分の中心であり、採掘結果を検証するために使用される証明を生成します。

```
${hashFragment}

// (x,y)の位置にある地雷の数
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### なぜマップの境界線が必要なのか {#why-map-border}

ゼロ知識証明は、`if`文に簡単な同等のものがない[算術回路](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)を使用します。 代わりに、[条件演算子](https://en.wikipedia.org/wiki/Ternary_conditional_operator)の同等のものを使用します。 `a`がゼロか1のいずれかである場合、`if a { b } else { c }`は`ab+(1-a)c`として計算できます。

このため、Zokratesの`if`文は常に両方の分岐を評価します。 たとえば、次のコードがあるとします。

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

後でその値がゼロで乗算されるにもかかわらず、`arr[10]`を計算する必要があるため、エラーが発生します。

これが、マップの周囲に1つの場所幅の境界線が必要な理由です。 場所の周りの地雷の総数を計算する必要があり、それは、採掘している場所の上下、左右の場所を見る必要があることを意味します。 つまり、これらの場所はZokratesに提供されるマップ配列に存在する必要があります。

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

デフォルトでは、Zokratesの証明にはその入力が含まれています。 あるスポットの周りに5つの地雷があると知っていても、実際にどのスポットかがわからなければ意味がありません（また、自分のリクエストと照合するだけではダメです。なぜなら、証明者は異なる値を使用して、それについて教えない可能性があるからです）。 しかし、マップを秘密にしておく必要がありますが、Zokratesに提供する必要もあります。 解決策は、証明によって_明らかにされない_`private`パラメータを使用することです。

これにより、別の悪用の機会が開かれます。 証明者は正しい座標を使用するかもしれませんが、場所の周りや場所自体に任意の数の地雷を持つマップを作成する可能性があります。 この悪用を防ぐために、ゼロ知識証明にゲーム識別子であるマップのハッシュを含めます。

```
   return (hashMap(map),
```

ここでの戻り値は、採掘結果だけでなく、マップのハッシュ配列も含むタプルです。

```
         if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

場所自体に爆弾がある場合、特別な値として255を使用します。

```
            map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

プレイヤーが地雷を踏んでいない場合、その場所の周りの地雷の数を合計して返します。

### TypeScriptからZokratesを使用する {#using-zokrates-from-typescript}

Zokratesにはコマンドラインインターフェースがありますが、このプログラムでは[TypeScriptコード](https://zokrates.github.io/toolbox/zokrates_js.html)で使用します。

Zokratesの定義を含むライブラリは[`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts)と呼ばれます。

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

[Zokrates JavaScriptバインディング](https://zokrates.github.io/toolbox/zokrates_js.html)をインポートします。 Zokratesのすべての定義に解決されるプロミスを返すため、[`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize)関数のみが必要です。

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Zokrates自体と同様に、1つの関数のみをエクスポートします。これも[非同期](https://www.w3schools.com/js/js_async.asp)です。 最終的に返されるとき、以下で見るようにいくつかの関数を提供します。

```typescript
const zokrates = await zokratesInitialize()
```

Zokratesを初期化し、ライブラリから必要なものをすべて取得します。

```typescript
const hashFragment = `
        import "utils/pack/bool/pack128.zok" as pack128;
        import "hashes/poseidon/poseidon.zok" as poseidon;
            .
            .
            .
        }
    `

const hashProgram = `
        ${hashFragment}
            .
            .
            .
    `

const digProgram = `
        ${hashFragment}
            .
            .
            .
    `
```

次に、上記で見たハッシュ関数と2つのZokratesプログラムがあります。

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

ここでこれらのプログラムをコンパイルします。

```typescript
// ゼロ知識検証用のキーを作成します。
// 本番システムでは、セットアップセレモニーを使用することをお勧めします。
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony)。
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

本番システムでは、より複雑な[セットアップセレモニー](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony)を使用するかもしれませんが、デモンストレーションにはこれで十分です。 ユーザーが証明者キーを知っていても問題ありません。それが真実でない限り、それを使って物事を証明することはできません。 エントロピー（2番目のパラメータ、`""`）を指定しているため、結果は常に同じになります。

**注：** Zokratesプログラムのコンパイルとキーの作成は遅いプロセスです。 毎回繰り返す必要はなく、マップサイズが変更されたときだけです。 本番システムでは、一度実行し、出力を保存します。 ここでそれをしていない唯一の理由は、単純さのためです。

#### `calculateMapHash` {#calculateMapHash}

```typescript
const calculateMapHash = function (hashMe: boolean[][]): string {
  return (
    "0x" +
    BigInt(zokrates.computeWitness(hashCompiled, [hashMe]).output.slice(1, -1))
      .toString(16)
      .padStart(64, "0")
  )
}
```

`computeWitness`関数(https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options)は実際にZokratesプログラムを実行します。 これは2つのフィールドを持つ構造体を返します：JSON文字列としてのプログラムの出力である`output`、および結果のゼロ知識証明を作成するために必要な情報である`witness`です。 ここでは出力のみが必要です。

出力は`"31337"`の形式の文字列で、引用符で囲まれた10進数です。 しかし、`viem`に必要な出力は`0x60A7`の形式の16進数です。 そこで、`.slice(1,-1)`を使用して引用符を削除し、次に`BigInt`を使用して残りの文字列（10進数）を[`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)に変換します。 `.toString(16)`はこの`BigInt`を16進文字列に変換し、`"0x"+`は16進数のマーカーを追加します。

```typescript
// 採掘し、結果のゼロ知識証明を返します
// (サーバーサイドコード)
```

ゼロ知識証明には、公開入力（`x`と`y`）と結果（マップのハッシュと爆弾の数）が含まれます。

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

Zokratesでインデックスが範囲外かどうかを確認するのは問題なので、ここで行います。

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

digプログラムを実行します。

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

[`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy)を使用して証明を返し、それを返します。

```typescript
const solidityVerifier = `
        // マップサイズ: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

Solidity検証者、ブロックチェーンにデプロイして`digCompiled.program`によって生成された証明を検証するために使用できるスマートコントラクト。

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

最後に、他のコードが必要とする可能性のあるすべてを返します。

## セキュリティテスト {#security-tests}

機能のバグはいずれ明らかになるため、セキュリティテストは重要です。 しかし、アプリケーションが安全でない場合、誰かが不正行為をして他人のリソースを手に入れてしまうまで、それが長期間隠されたままである可能性が高いです。

### パーミッション {#permissions}

このゲームには特権を持つエンティティが1つ、サーバーがあります。 これは、[`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol)の関数を呼び出すことを許可された唯一のユーザーです。 [`cast`](https://book.getfoundry.sh/cast/)を使用して、許可された関数への呼び出しがサーバーアカウントとしてのみ許可されていることを確認できます。

[サーバーの秘密鍵は`setupNetwork.ts`にあります](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52)。

1. `anvil`（ブロックチェーン）を実行するコンピュータで、これらの環境変数を設定します。

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. `cast`を使用して、検証者アドレスを未承認のアドレスとして設定しようとします。

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   `cast`が失敗を報告するだけでなく、ブラウザのゲームで**MUD Dev Tools**を開き、**Tables**をクリックして、**app\_\_VerifierAddress**を選択することもできます。 アドレスがゼロでないことを確認してください。

3. 検証者アドレスをサーバーのアドレスとして設定します。

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   **app\_\_VerifiedAddress**のアドレスはゼロになるはずです。

同じ`System`内のすべてのMUD関数は同じアクセス制御を通過するため、このテストで十分だと考えます。 そうでない場合は、[`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol)の他の関数を確認できます。

### ゼロ知識の悪用 {#zero-knowledge-abuses}

Zokratesを検証するための数学は、このチュートリアル（そして私の能力）の範囲を超えています。 しかし、ゼロ知識コードに対してさまざまなチェックを実行して、正しく行われていない場合に失敗することを確認できます。 これらのテストはすべて、[`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts)を変更し、アプリケーション全体を再起動する必要があります。 サーバープロセスを再起動するだけでは不十分です。なぜなら、アプリケーションが不可能な状態になるからです（プレイヤーは進行中のゲームを持っていますが、そのゲームはサーバーにとって利用できなくなっています）。

#### 間違った答え {#wrong-answer}

最も単純な可能性は、ゼロ知識証明で間違った答えを提供することです。 そのためには、`zkDig`の内部に入り、[91行目を変更します](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91)：

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

これは、正しい答えに関係なく、常に1つの爆弾があると主張することを意味します。 このバージョンでプレイしてみてください。`pnpm dev`画面の**server**タブに次のエラーが表示されます：

```
      cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

したがって、この種の不正行為は失敗します。

#### 間違った証明 {#wrong-proof}

正しい情報を提供するが、証明データが間違っている場合はどうなりますか？ では、91行目を次のように置き換えます。

```ts
proof.proof = {
  a: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  b: [
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  ],
  c: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
}
```

それでも失敗しますが、今回は検証者呼び出し中に発生するため、理由なしで失敗します。

### ユーザーはどのようにしてゼロトラストコードを検証できますか？ {#user-verify-zero-trust}

スマートコントラクトは比較的簡単に検証できます。 通常、デベロッパーはソースコードをブロックエクスプローラーに公開し、ブロックエクスプローラーはソースコードが[コントラクトデプロイメントトランザクション](/developers/docs/smart-contracts/deploying/)のコードにコンパイルされることを確認します。 MUD `System`sの場合、これは[少し複雑です](https://mud.dev/cli/verify)が、それほどではありません。

ゼロ知識ではこれはより困難です。 検証者はいくつかの定数を含み、それらに対していくつかの計算を実行します。 これは、何が証明されているかを教えてくれません。

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

解決策は、少なくともブロックエクスプローラーがユーザーインターフェースにZokrates検証を追加するまでは、アプリケーション開発者がZokratesプログラムを利用可能にし、少なくとも一部のユーザーが適切な検証キーを使用して自分でコンパイルすることです。

そのためには：

1. [Zokratesをインストールします](https://zokrates.github.io/gettingstarted.html)。

2. Zokratesプログラムを含む`dig.zok`というファイルを作成します。 以下のコードは、元のマップサイズ10x5を維持していることを前提としています。

   ```zokrates
    import "utils/pack/bool/pack128.zok" as pack128;
    import "hashes/poseidon/poseidon.zok" as poseidon;

    def hashMap(bool[12][7] map) -> field {
        bool[512] mut map1d = [false; 512];
        u32 mut counter = 0;

        for u32 x in 0..12 {
            for u32 y in 0..7 {
                map1d[counter] = map[x][y];
                counter = counter+1;
            }
        }

        field[4] hashMe = [
            pack128(map1d[0..128]),
            pack128(map1d[128..256]),
            pack128(map1d[256..384]),
            pack128(map1d[384..512])
        ];

        return poseidon(hashMe);
    }


    // (x,y)の位置にある地雷の数
    def map2mineCount(bool[12][7] map, u32 x, u32 y) -> u8 {
        return if map[x+1][y+1] { 1 } else { 0 };
    }

    def main(private bool[12][7] map, u32 x, u32 y) -> (field, u8) {
        return (hashMap(map) ,
            if map2mineCount(map, x, y) > 0 { 0xFF } else {
                map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
                map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
                map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
            }
        );
    }
   ```

3. Zokratesコードをコンパイルし、検証キーを作成します。 検証キーは、元のサーバーで使用されたのと同じエントロピーで作成する必要があります。[この場合は空の文字列です](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67)。

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. 自分でSolidity検証者を作成し、ブロックチェーン上のものと機能的に同一であることを確認します（サーバーはコメントを追加しますが、それは重要ではありません）。

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## 設計上の決定 {#design}

十分に複雑なアプリケーションでは、トレードオフを必要とする競合する設計目標があります。 いくつかのトレードオフと、現在の解決策が他の選択肢よりも好ましい理由を見てみましょう。

### なぜゼロ知識なのか {#why-zero-knowledge}

マインスイーパには、実際にはゼロ知識は必要ありません。 サーバーは常にマップを保持し、ゲームが終了したときにすべてを明らかにすることができます。 その後、ゲームの終わりに、スマートコントラクトはマップのハッシュを計算し、それが一致することを確認し、一致しない場合はサーバーにペナルティを課すか、ゲームを完全に無視することができます。

このより単純な解決策を使用しなかったのは、明確な終了ステートを持つ短いゲームでのみ機能するためです。 ゲームが潜在的に無限である場合（[自律的な世界](https://0xparc.org/blog/autonomous-worlds)の場合など）、ステートを明らかに_せずに_証明する解決策が必要です。

チュートリアルとして、この記事は理解しやすい短いゲームを必要としていましたが、このテクニックはより長いゲームに最も役立ちます。

### なぜZokratesなのか？ {#why-zokrates}

[Zokrates](https://zokrates.github.io/)は利用可能な唯一のゼロ知識ライブラリではありませんが、通常の[命令型](https://en.wikipedia.org/wiki/Imperative_programming)プログラミング言語に類似しており、ブール変数をサポートしています。

あなたのアプリケーションでは、要件が異なるため、[Circum](https://docs.circom.io/getting-started/installation/)または[Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/)を使用することを好むかもしれません。

### Zokratesをいつコンパイルするか {#when-compile-zokrates}

このプログラムでは、[サーバーが起動するたびに](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61)Zokratesプログラムをコンパイルします。 これは明らかにリソースの無駄ですが、これはチュートリアルであり、単純さのために最適化されています。

本番レベルのアプリケーションを書いていたとしたら、この地雷原サイズのコンパイル済みZokratesプログラムのファイルがあるかどうかを確認し、もしあればそれを使用するでしょう。 オンチェーンで検証者コントラクトをデプロイする場合も同様です。

### 検証者キーと証明者キーの作成 {#key-creation}

[キーの作成](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69)は、特定の地雷原サイズに対して一度以上行う必要のない純粋な計算です。 繰り返しますが、単純さのために一度だけ行われます。

さらに、[セットアップセレモニー](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony)を使用することもできます。 セットアップセレモニーの利点は、ゼロ知識証明で不正行為をするためには、各参加者からのエントロピーまたはいくつかの中間結果が必要であることです。 少なくとも1人のセレモニー参加者が正直で、その情報を削除すれば、ゼロ知識証明は特定の攻撃から安全です。 しかし、情報がどこからでも削除されたことを確認する_メカニズムはありません_。 ゼロ知識証明が非常に重要な場合は、セットアップセレモニーに参加することをお勧めします。

ここでは、数十人の参加者がいた[perpetual powers of tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau)に依存しています。 おそらく十分に安全で、はるかに単純です。 また、キー作成中にエントロピーを追加しないため、ユーザーが[ゼロ知識構成を検証](#user-verify-zero-trust)しやすくなります。

### どこで検証するか {#where-verification}

ゼロ知識証明はオンチェーン（ガスがかかる）またはクライアント（[`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof)を使用）で検証できます。 私が前者を選んだのは、これにより[検証者を一度検証](#user-verify-zero-trust)し、コントラクトアドレスが同じままである限り変更されないと信頼できるからです。 検証がクライアントで行われた場合、クライアントをダウンロードするたびに受け取るコードを検証する必要があります。

また、このゲームはシングルプレイヤーですが、多くのブロックチェーンゲームはマルチプレイヤーです。 オンチェーン検証は、ゼロ知識証明を一度だけ検証することを意味します。 クライアントでそれを行うには、各クライアントが独立して検証する必要があります。

### マップをTypeScriptまたはZokratesでフラット化するか？ {#where-flatten}

一般に、処理がTypeScriptまたはZokratesのいずれかで行える場合、はるかに高速で、ゼロ知識証明を必要としないTypeScriptで行う方が優れています。 これが、例えば、Zokratesにハッシュを提供して、それが正しいことを検証させない理由です。 ハッシュ化はZokrates内部で行う必要がありますが、返されたハッシュとオンチェーンのハッシュとの照合は外部で行うことができます。

しかし、TypeScriptでできたにもかかわらず、私たちはまだ[Zokratesでマップをフラット化しています](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20)。 その理由は、私の意見では、他の選択肢がもっと悪いからです。

- Zokratesコードに1次元のブール値配列を提供し、`x*(height+2)
  +y`のような式を使用して2次元マップを取得します。 これにより[コード](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47)が多少複雑になるため、チュートリアルにはパフォーマンスの向上が価値がないと判断しました。

- Zokratesに1次元配列と2次元配列の両方を送信します。 しかし、この解決策では何も得られません。 Zokratesコードは、提供された1次元配列が本当に2次元配列の正しい表現であることを検証する必要があります。 したがって、パフォーマンスの向上はありません。

- Zokratesで2次元配列をフラット化します。 これが最も簡単な選択肢なので、私はそれを選びました。

### マップの保存場所 {#where-store-maps}

このアプリケーションでは、[`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20)は単にメモリ内の変数です。 これは、サーバーがダウンして再起動する必要がある場合、保存されていたすべての情報が失われることを意味します。 プレイヤーはゲームを続行できないだけでなく、オンチェーンコンポーネントがまだゲームが進行中であると考えているため、新しいゲームを開始することさえできません。

これは、この情報をデータベースに保存する本番システムにとっては明らかに悪い設計です。 ここで変数を使用した唯一の理由は、これがチュートリアルであり、単純さが主な考慮事項であるためです。

## 結論：どのような条件下でこれが適切なテクニックですか？ {#conclusion}

これで、オンチェーンに属さない秘密のステートを保存するサーバーでゲームを書く方法がわかりました。 しかし、どのような場合にそれを行うべきでしょうか？ 主な考慮事項は2つあります。

- _長期間実行されるゲーム_：[上で述べたように](#why-zero-knowledge)、短いゲームでは、ゲームが終了したらステートを公開し、すべてを検証させることができます。 しかし、ゲームが長い時間または無期限にかかり、ステートを秘密にしておく必要がある場合、それは選択肢ではありません。

- _ある程度の中央集権化が許容される_：ゼロ知識証明は、エンティティが結果を偽造していないという整合性を検証できます。 彼らができないことは、エンティティがまだ利用可能であり、メッセージに応答することを保証することです。 可用性も分散化する必要がある状況では、ゼロ知識証明は十分な解決策ではなく、[マルチパーティ計算](https://en.wikipedia.org/wiki/Secure_multi-party_computation)が必要です。

[私の他の作品はこちらでご覧いただけます](https://cryptodocguy.pro/).

### 謝辞 {#acknowledgements}

- Alvaro Alonsoがこの記事の草稿を読み、Zokratesに関する私の誤解のいくつかを明らかにしてくれました。

残りの誤りは私の責任です。
