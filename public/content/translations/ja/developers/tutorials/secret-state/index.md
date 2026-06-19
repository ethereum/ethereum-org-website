---
title: "シークレット状態にゼロ知識を使用する"
description: "オンチェーンゲームは隠し情報を保持できないため、制限があります。このチュートリアルを読むと、ゼロ知識証明とサーバーコンポーネントを組み合わせて、オフチェーンのシークレット状態コンポーネントを持つ検証可能なゲームを作成できるようになります。この手法は、マインスイーパーゲームを作成することで実演されます。"
author: "オリ・ポメランツ"
tags: ["サーバー", "オフチェーン", "中央集権型", "ゼロ知識", "zokrates", "mud", "プライバシー"]
skill: advanced
breadcrumb: "ZKシークレット状態"
lang: ja
published: 2025-03-15
---

_ブロックチェーン上に秘密はありません_。ブロックチェーンに投稿されたすべての情報は、誰でも読むことができます。ブロックチェーンは誰でも検証できることに基づいているため、これは不可欠です。しかし、ゲームはしばしば秘密の状態（シークレット状態）に依存します。たとえば、[マインスイーパー](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>)のゲームは、ブロック・エクスプローラーにアクセスしてマップを見るだけであれば、まったく意味を成しません。

最も簡単な解決策は、秘密の状態を保持するために[サーバーコンポーネント](/developers/tutorials/server-components/)を使用することです。しかし、私たちがブロックチェーンを使用する理由は、ゲーム開発者による不正を防ぐためです。サーバーコンポーネントが誠実であることを保証する必要があります。サーバーは状態のハッシュを提供し、[ゼロ知識証明](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important)を使用して、手の結果を計算するために使用された状態が正しいことを証明できます。

この記事を読むと、この種の秘密の状態を保持するサーバー、状態を表示するためのクライアント、およびその2つ間の通信のためのオンチェーンコンポーネントを作成する方法がわかります。主に使用するツールは以下の通りです：

| ツール                                          | 目的                                                 | 検証済みバージョン |
| --------------------------------------------- | ------------------------------------------------------- | ------------------: |
| [Zokrates](https://zokrates.github.io/)       | ゼロ知識証明とその検証            |               1.1.9 |
| [TypeScript](https://www.typescriptlang.org/) | サーバーとクライアント両方のプログラミング言語 |               5.4.2 |
| [Node](https://nodejs.org/en)                 | サーバーの実行                                      |             20.18.2 |
| [Viem](https://viem.sh/)                      | ブロックチェーンとの通信                       |              2.9.20 |
| [MUD](https://mud.dev/)                       | オンチェーンデータ管理                                 |              2.0.12 |
| [React](https://react.dev/)                   | クライアントのユーザーインターフェース                                   |              18.2.0 |
| [Vite](https://vitejs.dev/)                   | クライアントコードの提供                                 |               4.2.1 |

## マインスイーパーの例 {#minesweeper}

[マインスイーパー](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>)は、地雷原のある秘密のマップを含むゲームです。プレイヤーは特定の場所を掘ることを選択します。その場所に地雷があればゲームオーバーです。そうでない場合、プレイヤーはその場所の周囲8マスにある地雷の数を知ることができます。

このアプリケーションは、[キーバリュー型データベース](https://aws.amazon.com/nosql/key-value/)を使用してデータをオンチェーンに保存し、そのデータをオフチェーンのコンポーネントと自動的に同期できるフレームワークである[MUD](https://mud.dev/)を使用して書かれています。同期に加えて、MUDを使用すると、アクセス制御を提供したり、他のユーザーがパーミッションレスでアプリケーションを[拡張](https://mud.dev/guides/extending-a-world)したりすることが容易になります。

### マインスイーパーの例を実行する {#running-minesweeper-example}

マインスイーパーの例を実行するには：

1. [前提条件がインストールされている](https://mud.dev/quickstart#prerequisites)ことを確認します：[Node](https://mud.dev/quickstart#prerequisites)、[Foundry](https://book.getfoundry.sh/getting-started/installation)、[`git`](https://git-scm.com/downloads)、[`pnpm`](https://git-scm.com/downloads)、および[`mprocs`](https://github.com/pvolok/mprocs)。

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

   Foundryが`pnpm install`の一部としてインストールされた場合は、コマンドラインシェルを再起動する必要があります。

4. コントラクトをコンパイルします。

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```


5. プログラム（[anvil](https://book.getfoundry.sh/anvil/)ブロックチェーンを含む）を起動して待機します。

   ```sh copy
   mprocs
   ```

   起動には時間がかかることに注意してください。進行状況を確認するには、まず下矢印を使用して_contracts_タブにスクロールし、MUDコントラクトがデプロイされていることを確認します。_Waiting for file changes…_というメッセージが表示されたら、コントラクトのデプロイは完了しており、その後の進行は_server_タブで行われます。そこで、_Verifier address: 0x...._というメッセージが表示されるまで待機します。

   このステップが成功すると、`mprocs`画面が表示され、左側にさまざまなプロセス、右側に現在選択されているプロセスのコンソール出力が表示されます。

   ![The mprocs screen](./mprocs.png)

   `mprocs`に問題がある場合は、4つのプロセスをそれぞれ独自のコマンドラインウィンドウで手動で実行できます。

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

6. これで、[クライアント](http://localhost:3000)にアクセスし、**New Game**をクリックしてプレイを開始できます。

### テーブル {#tables}

オンチェーンには[いくつかのテーブル](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts)が必要です。

- `Configuration`: このテーブルはシングルトンであり、キーを持たず、単一のレコードを持ちます。ゲームの設定情報を保持するために使用されます。
  - `height`: 地雷原の高さ
  - `width`: 地雷原の幅
  - `numberOfBombs`: 各地雷原の爆弾の数
- `VerifierAddress`: このテーブルもシングルトンです。設定の一部である、検証者コントラクト（`verifier`）のアドレスを保持するために使用されます。この情報を`Configuration`テーブルに入れることもできましたが、サーバーという別のコンポーネントによって設定されるため、別のテーブルに入れる方が簡単です。

- `PlayerGame`: キーはプレイヤーのアドレスです。データは以下の通りです。

  - `gameId`: プレイヤーがプレイしているマップのハッシュ（ゲーム識別子）である32バイトの値。
  - `win`: プレイヤーがゲームに勝ったかどうかを示すブール値。
  - `lose`: プレイヤーがゲームに負けたかどうかを示すブール値。
  - `digNumber`: ゲーム内で成功した掘削の数。

- `GamePlayer`: このテーブルは、`gameId`からプレイヤーのアドレスへの逆マッピングを保持します。

- `Map`: キーは3つの値のタプルです。

  - `gameId`: プレイヤーがプレイしているマップのハッシュ（ゲーム識別子）である32バイトの値。
  - `x` 座標
  - `y` 座標

  値は単一の数値です。爆弾が検出された場合は255になります。そうでない場合は、その場所の周囲にある爆弾の数に1を足した値になります。EVMのすべてのストレージとMUDのすべての行の値はデフォルトでゼロであるため、単に爆弾の数を使用することはできません。「プレイヤーはまだここを掘っていない」と「プレイヤーはここを掘り、周囲に爆弾がゼロであることを発見した」を区別する必要があります。

さらに、クライアントとサーバー間の通信はオンチェーンコンポーネントを通じて行われます。これもテーブルを使用して実装されています。

- `PendingGame`: 新しいゲームを開始するための未処理のリクエスト。
- `PendingDig`: 特定のゲームの特定の場所を掘るための未処理のリクエスト。これは[オフチェーンテーブル](https://mud.dev/store/tables#types-of-tables)であり、EVMストレージには書き込まれず、イベントを使用してオフチェーンでのみ読み取り可能であることを意味します。

### 実行とデータフロー {#execution-data-flows}

これらのフローは、クライアント、オンチェーンコンポーネント、およびサーバー間の実行を調整します。

#### 初期化 {#initialization-flow}

`mprocs`を実行すると、以下のステップが発生します。

1. [`mprocs`](https://github.com/pvolok/mprocs)は4つのコンポーネントを実行します。

   - ローカルブロックチェーンを実行する[Anvil](https://book.getfoundry.sh/anvil/)
   - MUDのコントラクトをコンパイル（必要に応じて）およびデプロイする[コントラクト](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts)
   - [Vite](https://vitejs.dev/)を実行してUIとクライアントコードをWebブラウザに提供する[クライアント](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client)
   - サーバーアクションを実行する[サーバー](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server)

2. `contracts`パッケージはMUDコントラクトをデプロイし、その後[`PostDeploy.s.sol`スクリプト](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol)を実行します。このスクリプトは設定を行います。GitHubのコードは、[8つの地雷が含まれる10x5の地雷原](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23)を指定しています。

3. [サーバー](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts)は[MUDのセットアップ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6)から開始します。とりわけ、これによりデータ同期がアクティブになり、関連するテーブルのコピーがサーバーのメモリ内に存在することになります。

4. サーバーは、[`Configuration`テーブルが変更されたとき](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23)に実行される関数をサブスクライブします。[この関数](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168)は、`PostDeploy.s.sol`が実行されてテーブルが変更された後に呼び出されます。

5. サーバーの初期化関数が設定を取得すると、[`zkFunctions`を呼び出して](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35)、[サーバーのゼロ知識部分](#using-zokrates-from-typescript)を初期化します。ゼロ知識関数は地雷原の幅と高さを定数として持つ必要があるため、設定を取得するまでこれは実行できません。

6. サーバーのゼロ知識部分が初期化された後、次のステップは[ゼロ知識検証コントラクトをブロックチェーンにデプロイ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53)し、MUDで検証者のアドレスを設定することです。

7. 最後に、プレイヤーが[新しいゲームの開始](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71)または[既存のゲームでの掘削](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108)をリクエストしたときにわかるように、更新をサブスクライブします。

#### 新しいゲーム {#new-game-flow}

プレイヤーが新しいゲームをリクエストしたときに起こることは以下の通りです。

1. このプレイヤーの進行中のゲームがない場合、または進行中のゲームがあってもgameIdがゼロの場合、クライアントは[新しいゲームボタン](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175)を表示します。ユーザーがこのボタンを押すと、[Reactは`newGame`関数を実行します](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96)。

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46)は`System`呼び出しです。MUDでは、すべての呼び出しは`World`コントラクトを経由してルーティングされ、ほとんどの場合`<namespace>__<function name>`を呼び出します。この場合、呼び出しは`app__newGame`に対して行われ、MUDはそれを[`GameSystem`内の`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22)にルーティングします。

3. オンチェーン関数は、プレイヤーが進行中のゲームを持っていないことを確認し、ない場合は[リクエストを`PendingGame`テーブルに追加します](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21)。

4. サーバーは`PendingGame`の変更を検出し、[サブスクライブされた関数を実行します](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71)。この関数は[`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114)を呼び出し、それがさらに[`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144)を呼び出します。

5. `createGame`が最初に行うことは、[適切な数の地雷を持つランダムなマップを作成する](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135)ことです。次に、[`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166)を呼び出して、Zokratesに必要な空白の境界線を持つマップを作成します。最後に、`createGame`は[`calculateMapHash`](#calculatemaphash)を呼び出してマップのハッシュを取得し、これをゲームIDとして使用します。

6. `newGame`関数は、新しいゲームを`gamesInProgress`に追加します。

7. サーバーが最後に行うことは、オンチェーンの[`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43)を呼び出すことです。この関数は、アクセス制御を有効にするために、別の`System`である[`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol)にあります。アクセス制御は[MUD設定ファイル](https://mud.dev/config)の[`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72)で定義されています。

   アクセスリストは、単一のアドレスのみが`System`を呼び出すことを許可します。これにより、サーバー関数へのアクセスが単一のアドレスに制限されるため、誰もサーバーになりすますことはできません。

8. オンチェーンコンポーネントは関連するテーブルを更新します。

   - `PlayerGame`にゲームを作成します。
   - `GamePlayer`に逆マッピングを設定します。
   - `PendingGame`からリクエストを削除します。

9. サーバーは`PendingGame`の変更を識別しますが、[`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60)がfalseであるため、何も行いません。

10. クライアントでは、[`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148)がプレイヤーのアドレスの`PlayerGame`エントリに設定されます。`PlayerGame`が変更されると、`gameRecord`も変更されます。

11. `gameRecord`に値があり、ゲームの勝敗がまだ決まっていない場合、クライアントは[マップを表示します](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190)。

#### 掘る {#dig-flow}

1. プレイヤーが[マップセルのボタンをクリックする](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188)と、[`dig`関数](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36)が呼び出されます。この関数は[オンチェーンの`dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32)を呼び出します。

2. オンチェーンコンポーネントは[いくつかの健全性チェックを実行し](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30)、成功した場合は掘削リクエストを[`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31)に追加します。

3. サーバーは[`PendingDig`の変更を検出します](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73)。[それが有効な場合](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84)、[ゼロ知識コードを呼び出して](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95)（後述）、結果とそれが有効であることの証明の両方を生成します。

4. [サーバー](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107)はオンチェーンの[`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64)を呼び出します。

5. `digResponse`は2つのことを行います。まず、[ゼロ知識証明](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61)をチェックします。次に、証明が確認された場合、[`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86)を呼び出して実際に結果を処理します。

6. `processDigResult`はゲームに[負けた](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78)か[勝った](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86)かを確認し、[オンチェーンマップである`Map`を更新します](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80)。

7. クライアントは自動的に更新を取得し、[プレイヤーに表示されるマップを更新し](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190)、該当する場合はプレイヤーに勝敗を伝えます。

```yaml
title: ゼロ知識dappにおける秘密の状態
description: Zokratesを使用して状態を秘密に保つ方法
lang: ja
```

## Zokratesの使用 {#using-zokrates}

上で説明したフローでは、ゼロ知識の部分をブラックボックスとして扱い、スキップしました。ここでは、それを開いて、そのコードがどのように書かれているかを見てみましょう。

### マップのハッシュ化 {#hashing-map}

[このJavaScriptコード](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise)を使用して、私たちが使用するZokratesのハッシュ関数である[Poseidon](https://www.poseidon-hash.info)を実装することができます。しかし、これは高速ですが、単にZokratesのハッシュ関数を使用するよりも複雑になります。これはチュートリアルであるため、コードはパフォーマンスではなくシンプルさを重視して最適化されています。したがって、マップのハッシュを計算するだけのプログラム（`hash`）と、マップ上の場所を掘った結果のゼロ知識証明を実際に作成するプログラム（`dig`）の2つの異なるZokratesプログラムが必要です。

### ハッシュ関数 {#hash-function}

これはマップのハッシュを計算する関数です。このコードを1行ずつ見ていきましょう。

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

これら2行は、[Zokrates標準ライブラリ](https://zokrates.github.io/toolbox/stdlib.html)から2つの関数をインポートします。[最初の関数](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok)は[Poseidonハッシュ](https://www.poseidon-hash.info/)です。これは[`field`要素](https://zokrates.github.io/language/types.html#field)の配列を受け取り、`field`を返します。

Zokratesのフィールド要素は通常256ビット未満ですが、それほど小さくはありません。コードを簡素化するために、マップを最大512ビットに制限し、4つのフィールドの配列をハッシュ化し、各フィールドでは128ビットのみを使用します。[`pack128`関数](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok)は、この目的のために128ビットの配列を`field`に変換します。

```
def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

この行は関数定義の開始です。`hashMap`は、`map`という単一のパラメータ（2次元の`bool`(ean)配列）を受け取ります。マップのサイズが`width+2`×`height+2`である理由は、[後述します](#why-map-border)。

Zokratesプログラムはこのアプリケーション内で[テンプレート文字列](https://www.w3schools.com/js/js_string_templates.asp)として保存されているため、`${width+2}`と`${height+2}`を使用できます。`${`と`}`の間のコードはJavaScriptによって評価され、この方法でプログラムを異なるマップサイズに使用できます。マップパラメータの周囲には爆弾のない1マス分の境界線があるため、幅と高さに2を足す必要があります。

戻り値は、ハッシュを含む`field`です。

```
bool[512] mut map1d = [false; 512];
```

マップは2次元です。しかし、`pack128`関数は2次元配列では機能しません。そのため、まず`map1d`を使用してマップを512バイトの配列に平坦化します。デフォルトではZokratesの変数は定数ですが、ループ内でこの配列に値を代入する必要があるため、[`mut`](https://zokrates.github.io/language/variables.html#mutability)として定義します。

Zokratesには`undefined`がないため、配列を初期化する必要があります。`[false; 512]`という式は、[512個の`false`値の配列](https://zokrates.github.io/language/types.html#declaration-and-initialization)を意味します。

```
u32 mut counter = 0;
```

また、`map1d`にすでに入力したビットとまだ入力していないビットを区別するためのカウンターも必要です。

```
for u32 x in 0..${width+2} {
```

これがZokratesで[`for`ループ](https://zokrates.github.io/language/control_flow.html#for-loops)を宣言する方法です。Zokratesの`for`ループは固定の境界を持つ必要があります。なぜなら、ループのように見えても、コンパイラは実際にはそれを「展開（アンロール）」するからです。`width`はコンパイラを呼び出す前にTypeScriptコードによって設定されるため、`${width+2}`という式はコンパイル時の定数になります。

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

`map1d`から4つの`field`値の配列を作成するための`pack128`です。Zokratesでは、`array[a..b]`は`a`から始まり`b-1`で終わる配列のスライスを意味します。

```
return poseidon(hashMe);
}
```

`poseidon`を使用して、この配列をハッシュに変換します。

### ハッシュプログラム {#hash-program}

サーバーはゲーム識別子を作成するために`hashMap`を直接呼び出す必要があります。しかし、Zokratesはプログラムを開始するために`main`関数しか呼び出せないため、ハッシュ関数を呼び出す`main`を持つプログラムを作成します。

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### 掘削プログラム {#dig-program}

これはアプリケーションのゼロ知識部分の心臓部であり、掘削結果を検証するために使用される証明を生成する場所です。

```
${hashFragment}

// 位置(x,y)にある地雷の数
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### なぜマップの境界線が必要なのか {#why-map-border}

ゼロ知識証明は[算術回路](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)を使用しますが、これには`if`文に相当する簡単なものがありません。代わりに、[条件演算子](https://en.wikipedia.org/wiki/Ternary_conditional_operator)に相当するものを使用します。`a`が0または1のいずれかである場合、`if a { b } else { c }`を`ab+(1-a)c`として計算できます。

このため、Zokratesの`if`文は常に両方の分岐を評価します。たとえば、次のようなコードがあるとします。

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

このコードはエラーになります。なぜなら、その値が後でゼロと掛け合わされるとしても、`arr[10]`を計算する必要があるからです。

これが、マップの周囲に1マス分の境界線が必要な理由です。ある場所の周囲にある地雷の総数を計算する必要があります。つまり、掘っている場所の上下左右の場所を見る必要があります。これは、Zokratesに提供されるマップ配列にそれらの場所が存在していなければならないことを意味します。

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

デフォルトでは、Zokratesの証明にはその入力が含まれます。実際にどの場所であるかを知らなければ、ある場所の周囲に5つの地雷があることを知っても意味がありません（そして、プルーバーが異なる値を使用してそれを伝えない可能性があるため、単にリクエストと照合することはできません）。しかし、マップをZokratesに提供しつつ、秘密にしておく必要があります。解決策は、証明によって明らかに_されない_パラメータである`private`パラメータを使用することです。

これは別の悪用の道を開きます。プルーバーは正しい座標を使用しつつ、その場所の周囲、あるいはその場所自体に任意の数の地雷があるマップを作成する可能性があります。この悪用を防ぐために、ゼロ知識証明にゲーム識別子であるマップのハッシュを含めるようにします。

```
return (hashMap(map),
```

ここでの戻り値は、マップのハッシュ配列と掘削結果を含むタプルです。

```
if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

その場所自体に爆弾がある場合の特別な値として255を使用します。

```
map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

プレイヤーが地雷を踏んでいない場合は、その場所の周囲の地雷の数を足して返します。

### TypeScriptからのZokratesの使用 {#using-zokrates-from-typescript}

Zokratesにはコマンドラインインターフェースがありますが、このプログラムでは[TypeScriptコード](https://zokrates.github.io/toolbox/zokrates_js.html)内で使用します。

Zokratesの定義を含むライブラリは[`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts)と呼ばれます。

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

[ZokratesのJavaScriptバインディング](https://zokrates.github.io/toolbox/zokrates_js.html)をインポートします。すべてのZokrates定義に解決されるプロミスを返すため、[`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize)関数のみが必要です。

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Zokrates自体と同様に、ここでも1つの関数のみをエクスポートし、それも[非同期](https://www.w3schools.com/js/js_async.asp)です。最終的に戻るときに、後述するいくつかの関数を提供します。

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

次に、上で見たハッシュ関数と2つのZokratesプログラムがあります。

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

ここでそれらのプログラムをコンパイルします。

```typescript
// ゼロ知識検証用の鍵を作成します。
// 本番システムでは、セットアップセレモニーを使用するとよいでしょう。
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

本番システムでは、より複雑な[セットアップ・セレモニー](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony)を使用するかもしれませんが、デモンストレーションとしてはこれで十分です。ユーザーがプルーバーの鍵を知ることができるのは問題ではありません。真実でない限り、それを使用して証明することはできないからです。エントロピー（2番目のパラメータ、`""`）を指定するため、結果は常に同じになります。

**注:** Zokratesプログラムのコンパイルと鍵の作成は時間のかかるプロセスです。毎回繰り返す必要はなく、マップのサイズが変更されたときだけで十分です。本番システムでは、これらを1回実行し、その出力を保存します。ここでそうしていない唯一の理由は、シンプルにするためです。

#### `calculateMapHash` {#calculatemaphash}

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

[`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options)関数は実際にZokratesプログラムを実行します。これは2つのフィールドを持つ構造体を返します。JSON文字列としてのプログラムの出力である`output`と、結果のゼロ知識証明を作成するために必要な情報である`witness`です。ここでは出力のみが必要です。

出力は`"31337"`の形式の文字列、つまり引用符で囲まれた10進数です。しかし、`viem`に必要な出力は`0x60A7`の形式の16進数です。そのため、`.slice(1,-1)`を使用して引用符を削除し、次に`BigInt`を使用して残りの文字列（10進数）を[`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)に変換します。`.toString(16)`はこの`BigInt`を16進数の文字列に変換し、`"0x"+`は16進数のマーカーを追加します。

```typescript
// 採掘し、結果のゼロ知識証明を返します。
// (サーバーサイドコード)
```

ゼロ知識証明には、公開入力（`x`と`y`）と結果（マップのハッシュと爆弾の数）が含まれます。

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

Zokratesでインデックスが範囲外かどうかを確認するのは問題があるため、ここで行います。

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

掘削プログラムを実行します。

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

[`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy)を使用して証明を返します。

```typescript
const solidityVerifier = `
        // Map size: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

Solidityの検証者。ブロックチェーンにデプロイし、`digCompiled.program`によって生成された証明を検証するために使用できるスマート・コントラクトです。

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

最後に、他のコードが必要とする可能性のあるすべてのものを返します。
```

## セキュリティ・テスト

機能のバグはいずれ明らかになるため、セキュリティ・テストは重要です。しかし、アプリケーションが安全でない場合、誰かが不正行為を行い、他人のリソースを奪って逃げることで発覚するまで、長期間隠れたままになる可能性が高いです。

### パーミッション

このゲームには、サーバーという1つの特権エンティティが存在します。これは、[`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol)内の関数を呼び出すことが許可されている唯一のユーザーです。[`cast`](https://book.getfoundry.sh/cast/)を使用して、パーミッションドな関数への呼び出しがサーバーのアカウントとしてのみ許可されていることを検証できます。

[サーバーの秘密鍵は`setupNetwork.ts`にあります](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52)。

1. `anvil`（ブロックチェーン）を実行しているコンピュータで、これらの環境変数を設定します。

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. `cast`を使用して、検証者のアドレスを未承認のアドレスとして設定しようと試みます。

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   `cast`が失敗を報告するだけでなく、ブラウザ上のゲームで**MUD Dev Tools**を開き、**Tables**をクリックして**app\_\_VerifierAddress**を選択することもできます。アドレスがゼロではないことを確認してください。

3. 検証者のアドレスをサーバーのアドレスとして設定します。

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   これで、**app\_\_VerifiedAddress**のアドレスはゼロになるはずです。

同じ`System`内のすべてのMUD関数は同じアクセス制御を経由するため、このテストで十分だと考えられます。そう思わない場合は、[`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol)内の他の関数を確認できます。

### ゼロ知識の悪用

Zokratesを検証するための数学は、このチュートリアルの範囲（および私の能力）を超えています。しかし、ゼロ知識のコードに対してさまざまなチェックを実行し、正しく行われない場合に失敗することを検証できます。これらのテストはすべて、[`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts)を変更し、アプリケーション全体を再起動する必要があります。サーバープロセスを再起動するだけでは不十分です。なぜなら、アプリケーションが不可能な状態（プレイヤーはゲームを進行中だが、サーバーからはそのゲームが利用できなくなる）に陥るからです。

#### 間違った答え

最も単純な可能性は、ゼロ知識証明で間違った答えを提供することです。これを行うには、`zkDig`の中に入り、[91行目を変更します](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91)。

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

これは、正解に関係なく、常に爆弾が1つあると請求することを意味します。このバージョンでプレイしてみると、`pnpm dev`画面の**server**タブに次のエラーが表示されます。

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

#### 間違った証明

正しい情報を提供しつつ、証明データだけが間違っている場合はどうなるでしょうか？次に、91行目を次のように置き換えます。

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

やはり失敗しますが、今回は検証者の呼び出し中に発生するため、理由なしで失敗します。

### ユーザーはどのようにしてゼロトラストコードを検証できるか？

スマート・コントラクトの検証は比較的簡単です。通常、開発者はソースコードをブロック・エクスプローラーに公開し、ブロック・エクスプローラーはソースコードが[コントラクトのデプロイのトランザクション](/developers/docs/smart-contracts/deploying/)内のコードにコンパイルされることを検証します。MUDの`System`の場合、これは[少し複雑になります](https://mud.dev/cli/verify)が、それほどではありません。

ゼロ知識の場合、これはより困難になります。検証者にはいくつかの定数が含まれており、それらに対して計算を実行します。これでは、何が証明されているのかわかりません。

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

解決策としては、少なくともブロック・エクスプローラーがユーザーインターフェースにZokratesの検証を追加するまでは、アプリケーション開発者がZokratesプログラムを利用可能にし、少なくとも一部のユーザーが適切な検証鍵を使用して自分でコンパイルすることです。

これを行うには：

1. [Zokratesをインストールします](https://zokrates.github.io/gettingstarted.html)。
2. Zokratesプログラムを含むファイル`dig.zok`を作成します。以下のコードは、元のマップサイズである10x5を維持していることを前提としています。

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


    // 位置(x,y)にある地雷の数
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

3. Zokratesコードをコンパイルし、検証鍵を作成します。検証鍵は、元のサーバーで使用されたのと同じエントロピー（[この場合は空の文字列](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67)）を使用して作成する必要があります。

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. 自分でSolidityの検証者を作成し、ブロックチェーン上のものと機能的に同一であることを検証します（サーバーはコメントを追加しますが、それは重要ではありません）。

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## 設計上の決定事項

十分に複雑なアプリケーションでは、トレードオフを必要とする競合する設計目標が存在します。いくつかのトレードオフと、現在のソリューションが他の選択肢よりも好ましい理由を見てみましょう。

### なぜゼロ知識なのか

マインスイーパーの場合、実際にはゼロ知識は必要ありません。サーバーは常にマップを保持し、ゲームが終了したときにすべてを公開するだけで済みます。そして、ゲームの終了時に、スマート・コントラクトがマップのハッシュを計算し、それが一致するかどうかを検証し、一致しない場合はサーバーにペナルティを科すか、ゲームを完全に無効にすることができます。

このよりシンプルなソリューションを使用しなかった理由は、明確に定義された終了状態を持つ短いゲームでしか機能しないためです。ゲームが無限に続く可能性がある場合（[自律型世界（autonomous worlds）](https://0xparc.org/blog/autonomous-worlds)の場合など）、状態を明らかにすること_なく_証明するソリューションが必要です。

チュートリアルとして、この記事には理解しやすい短いゲームが必要でしたが、この手法はより長いゲームで最も役立ちます。

### なぜZokratesなのか？

利用可能なゼロ知識ライブラリは[Zokrates](https://zokrates.github.io/)だけではありませんが、通常の[命令型](https://en.wikipedia.org/wiki/Imperative_programming)プログラミング言語に似ており、ブール変数をサポートしています。

要件が異なるアプリケーションの場合は、[Circum](https://docs.circom.io/getting-started/installation/)や[Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/)を使用する方が適しているかもしれません。

### Zokratesをコンパイルするタイミング

このプログラムでは、[サーバーが起動するたびに](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61)Zokratesプログラムをコンパイルします。これは明らかにリソースの無駄ですが、これはシンプルさを最適化したチュートリアルです。

本番レベルのアプリケーションを作成する場合、この地雷原のサイズでコンパイルされたZokratesプログラムのファイルがあるかどうかを確認し、あればそれを使用します。検証者コントラクトをオンチェーンにデプロイする場合も同様です。

### 検証者とプルーバーの鍵の作成

[鍵の作成](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69)も純粋な計算であり、特定の地雷原のサイズに対して複数回行う必要はありません。ここでも、シンプルにするために1回だけ行われます。

さらに、[セットアップセレモニー](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony)を使用することもできます。セットアップセレモニーの利点は、ゼロ知識証明で不正を行うには、各参加者からのエントロピーまたは何らかの中間結果が必要になることです。少なくとも1人のセレモニー参加者が誠実であり、その情報を削除すれば、ゼロ知識証明は特定の攻撃から安全になります。ただし、情報がすべての場所から削除されたことを検証するメカニズムは_ありません_。ゼロ知識証明が極めて重要な場合は、セットアップセレモニーに参加することをお勧めします。

ここでは、数十人が参加した[perpetual powers of tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau)に依存しています。これはおそらく十分に安全であり、はるかにシンプルです。また、鍵の作成中にエントロピーを追加しないため、ユーザーが[ゼロ知識の設定を検証する](#user-verify-zero-trust)のが容易になります。

### どこで検証するか

ゼロ知識証明は、オンチェーン（ガスがかかります）またはクライアント内（[`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof)を使用）のいずれかで検証できます。私は前者を選びました。なぜなら、これにより[検証者を検証する](#user-verify-zero-trust)ことが一度で済み、その後はコントラクトのアドレスが同じである限り変更されないと信頼できるからです。クライアントで検証が行われる場合、クライアントをダウンロードするたびに受け取るコードを検証する必要があります。

また、このゲームはシングルプレイヤーですが、多くのブロックチェーンゲームはマルチプレイヤーです。オンチェーンでの検証は、ゼロ知識証明を一度だけ検証することを意味します。クライアントでこれを行うと、各クライアントが独立して検証する必要があります。

### TypeScriptとZokratesのどちらでマップをフラット化するか？

一般的に、処理をTypeScriptまたはZokratesのどちらでも実行できる場合は、はるかに高速でゼロ知識証明を必要としないTypeScriptで実行する方が適しています。これが、たとえば、Zokratesにハッシュを提供してそれが正しいことを検証させない理由です。ハッシュ化はZokrates内で行う必要がありますが、返されたハッシュとオンチェーンのハッシュの一致確認は外部で行うことができます。

しかし、TypeScriptで実行できたにもかかわらず、依然として[Zokratesでマップをフラット化](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20)しています。その理由は、私の意見では、他の選択肢の方が悪いからです。

- Zokratesコードにブール値の1次元配列を提供し、`x*(height+2)
+y` のような式を使用して2次元マップを取得する。これにより[コード](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47)がやや複雑になるため、チュートリアルとしてはパフォーマンスの向上に見合わないと判断しました。

- 1次元配列と2次元配列の両方をZokratesに送信する。しかし、このソリューションでは何も得られません。Zokratesコードは、提供された1次元配列が本当に2次元配列の正しい表現であることを検証する必要があります。そのため、パフォーマンスの向上はありません。

- Zokratesで2次元配列をフラット化する。これが最もシンプルな選択肢であるため、これを選びました。

### マップをどこに保存するか

このアプリケーションでは、[`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20)は単なるメモリ上の変数です。これは、サーバーがダウンして再起動する必要がある場合、保存されていたすべての情報が失われることを意味します。プレイヤーはゲームを続行できないだけでなく、オンチェーンのコンポーネントがまだゲームが進行中であると認識しているため、新しいゲームを開始することすらできません。

これは、この情報をデータベースに保存する本番システムにとっては明らかに悪い設計です。ここで変数を使用した唯一の理由は、これがチュートリアルであり、シンプルさを主な考慮事項としているためです。

## 結論：どのような条件でこの手法が適切か？

これで、オンチェーンに置くべきではない秘密の状態を保存するサーバーを使ったゲームの書き方がわかりました。しかし、どのような場合にこれを行うべきでしょうか？主に2つの考慮事項があります。

- _長期実行ゲーム_: [前述の通り](#why-zero-knowledge)、短いゲームであれば、ゲーム終了後に状態を公開し、その時点ですべてを検証させることができます。しかし、ゲームに長い時間や無期限の時間がかかり、状態を秘密にしておく必要がある場合、それは選択肢にはなりません。

- _ある程度の中央集権化が許容される場合_: ゼロ知識証明は、エンティティが結果を偽造していないという完全性を検証できます。しかし、そのエンティティが引き続き利用可能であり、メッセージに応答することを保証することはできません。可用性も分散型である必要がある状況では、ゼロ知識証明は十分な解決策ではなく、[マルチパーティ計算](https://en.wikipedia.org/wiki/Secure_multi-party_computation)が必要になります。

[私の他の作品についてはこちらをご覧ください](https://cryptodocguy.pro/)。

### 謝辞

- Alvaro Alonso氏はこの記事の草稿を読み、Zokratesに関する私の誤解のいくつかを解いてくれました。

残っている誤りはすべて私の責任です。