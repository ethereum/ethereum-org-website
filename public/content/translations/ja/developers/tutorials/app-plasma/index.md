---
title: プライバシーを保護するアプリ固有のプラズマを作成する
description: このチュートリアルでは、預金用の半秘密の銀行を構築します。銀行は中央集権的なコンポーネントであり、各ユーザーの残高を把握しています。しかし、この情報はオンチェーンには保存されません。代わりに、銀行は状態のハッシュを投稿します。トランザクションが発生するたびに、銀行は新しいハッシュと、ハッシュの状態を新しいものに変更する署名付きトランザクションを持っているというゼロ知識証明を投稿します。このチュートリアルを読むことで、ゼロ知識証明の使用方法だけでなく、なぜそれを使用するのか、そしてどのように安全に行うのかを理解できるでしょう。
author: オリ・ポメランツ
tags:
  - ゼロ知識
  - サーバー
  - オフチェーン
  - プライバシー
skill: advanced
breadcrumb: アプリ固有のプラズマ
lang: ja
published: 2025-10-15
---
## はじめに {#introduction}

[ロールアップ](/developers/docs/scaling/zk-rollups/)とは対照的に、[プラズマ](/developers/docs/scaling/plasma)は整合性のためにイーサリアム・メインネットを使用しますが、可用性のためには使用しません。この記事では、プラズマのように振る舞うアプリケーションを作成します。イーサリアムは整合性（不正な変更がないこと）を保証しますが、可用性（中央集権的なコンポーネントがダウンしてシステム全体が機能しなくなる可能性があること）は保証しません。

ここで作成するアプリケーションは、プライバシーを保護する銀行です。異なるアドレスが残高を持つアカウントを所有しており、他のアカウントに資金（ETH）を送金することができます。銀行は状態（アカウントとその残高）とトランザクションのハッシュを投稿しますが、実際の残高はプライバシーを保つことができるオフチェーンに保持します。

## 設計 {#design}

これは本番環境に対応したシステムではなく、教育用のツールです。そのため、いくつかの単純化された前提条件に基づいて書かれています。

- 固定のアカウントプール。特定数のアカウントが存在し、各アカウントはあらかじめ決められたアドレスに属します。ゼロ知識証明において可変サイズのデータ構造を扱うのは難しいため、これによりシステムがはるかにシンプルになります。本番環境に対応したシステムでは、状態ハッシュとして[マークル・ルート](/developers/tutorials/merkle-proofs-for-offline-data-integrity/)を使用し、必要な残高に対するマークル証明を提供することができます。

- メモリストレージ。本番システムでは、再起動時に備えてすべてのアカウント残高をディスクに書き込んで保存する必要があります。ここでは、情報が単に失われても問題ありません。

- 送金のみ。本番システムでは、銀行に資産を入金したり引き出したりする方法が必要になります。しかし、ここでの目的は概念を説明することだけなので、この銀行は送金に限定されています。

### ゼロ知識証明 {#zero-knowledge-proofs}

基本的なレベルでは、ゼロ知識証明は、公開データ _Data<sub>public</sub>_ と _Data<sub>private</sub>_ の間に _Relationship_ という関係が存在するような、あるデータ _Data<sub>private</sub>_ をプルーバーが知っていることを示します。検証者は _Relationship_ と _Data<sub>public</sub>_ を知っています。

プライバシーを保護するためには、状態とトランザクションを非公開にする必要があります。しかし、整合性を確保するためには、状態の[暗号学的ハッシュ](https://en.wikipedia.org/wiki/Cryptographic_hash_function)を公開する必要があります。トランザクションを送信した人々に、それらのトランザクションが実際に発生したことを証明するために、トランザクション・ハッシュも公開する必要があります。

ほとんどの場合、_Data<sub>private</sub>_ はゼロ知識証明プログラムへの入力であり、_Data<sub>public</sub>_ は出力です。

_Data<sub>private</sub>_ のフィールドは以下の通りです。

- _State<sub>n</sub>_、古い状態
- _State<sub>n+1</sub>_、新しい状態
- _Transaction_、古い状態から新しい状態へ変更するトランザクション。このトランザクションには以下のフィールドを含める必要があります。
  - 送金を受け取る _Destination address_ (宛先アドレス)
  - 送金される _Amount_ (金額)
  - 各トランザクションが1回だけ処理されることを保証するための _Nonce_ (ナンス)。
    送信元アドレスは署名から復元できるため、トランザクションに含める必要はありません。
- _Signature_、トランザクションの実行を許可された署名。今回のケースでは、トランザクションの実行を許可されているアドレスは送信元アドレスのみです。私たちのゼロ知識システムはそのような仕組みで動作するため、イーサリアムの署名に加えて、アカウントの公開鍵も必要になります。

_Data<sub>public</sub>_ のフィールドは以下の通りです。

- _Hash(State<sub>n</sub>)_、古い状態のハッシュ
- _Hash(State<sub>n+1</sub>)_、新しい状態のハッシュ
- _Hash(Transaction)_、状態を _State<sub>n</sub>_ から _State<sub>n+1</sub>_ に変更するトランザクションのハッシュ。

この関係では、いくつかの条件をチェックします。

- 公開ハッシュが、非公開フィールドの正しいハッシュであること。
- トランザクションを古い状態に適用すると、新しい状態になること。
- 署名がトランザクションの送信元アドレスからのものであること。

暗号学的ハッシュ関数の特性により、これらの条件を証明するだけで整合性を確保するのに十分です。

### データ構造 {#data-structures}

主要なデータ構造は、サーバーが保持する状態です。すべてのアカウントについて、サーバーはアカウント残高と、[リプレイ攻撃](https://en.wikipedia.org/wiki/Replay_attack)を防ぐために使用される[ナンス](https://en.wikipedia.org/wiki/Cryptographic_nonce)を追跡します。

### コンポーネント {#components}

このシステムには2つのコンポーネントが必要です。

- トランザクションを受信して処理し、ゼロ知識証明とともにハッシュをチェーンに投稿する _サーバー_。
- ハッシュを保存し、ゼロ知識証明を検証して状態遷移が正当であることを保証する _スマート・コントラクト_。

### データと制御のフロー {#flows}

以下は、あるアカウントから別のアカウントへ送金するために、さまざまなコンポーネントが通信する方法です。

1. Webブラウザは、署名者のアカウントから別のアカウントへの送金を要求する署名付きトランザクションを送信します。

2. サーバーは、トランザクションが有効であることを検証します。

   - 署名者が銀行に十分な残高のあるアカウントを持っていること。
   - 受取人が銀行にアカウントを持っていること。

3. サーバーは、署名者の残高から送金額を差し引き、受取人の残高に加算することで、新しい状態を計算します。

4. サーバーは、状態の変更が有効であることを示すゼロ知識証明を計算します。

5. サーバーは、以下を含むトランザクションをイーサリアムに送信します。

   - 新しい状態ハッシュ
   - トランザクション・ハッシュ (トランザクションの送信者が処理されたことを知ることができるようにするため)
   - 新しい状態への遷移が有効であることを証明するゼロ知識証明

6. スマート・コントラクトはゼロ知識証明を検証します。

7. ゼロ知識証明が確認された場合、スマート・コントラクトは以下のアクションを実行します。
   - 現在の状態ハッシュを新しい状態ハッシュに更新する
   - 新しい状態ハッシュとトランザクション・ハッシュを含むログエントリを発行する

### ツール {#tools}

クライアント側のコードには、[Vite](https://vite.dev/)、[React](https://react.dev/)、[Viem](https://viem.sh/)、および[Wagmi](https://wagmi.sh/)を使用します。これらは業界標準のツールです。使い慣れていない場合は、[こちらのチュートリアル](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)を利用できます。

サーバーの大部分は、[Node](https://nodejs.org/en)を使用してJavaScriptで書かれています。ゼロ知識の部分は[Noir](https://noir-lang.org/)で書かれています。バージョン `1.0.0-beta.10` が必要なので、[指示に従ってNoirをインストール](https://noir-lang.org/docs/getting_started/quick_start)した後、以下を実行してください。

```
noirup -v 1.0.0-beta.10
```

使用するブロックチェーンは `anvil` であり、これは[Foundry](https://getfoundry.sh/introduction/installation)の一部であるローカルテスト用ブロックチェーンです。

## 実装 {#implementation}

これは複雑なシステムであるため、段階的に実装します。

### ステージ1 - 手動でのゼロ知識 {#stage-1}

最初のステージでは、ブラウザでトランザクションに署名し、その情報を手動でゼロ知識証明に提供します。ゼロ知識コードは、その情報を `server/noir/Prover.toml` で受け取ることを想定しています（ドキュメントは[こちら](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1)）。

実際の動作を確認するには：

1. [Node](https://nodejs.org/en/download) と [Noir](https://noir-lang.org/install) がインストールされていることを確認してください。できれば、macOS、Linux、または [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) などのUNIXシステムにインストールしてください。

2. ステージ1のコードをダウンロードし、クライアントコードを提供するためのウェブサーバーを起動します。

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   ここでウェブサーバーが必要な理由は、特定の種類の不正を防ぐために、多くのウォレット（メタマスクなど）がディスクから直接提供されるファイルを受け付けないためです。

3. ウォレットがインストールされたブラウザを開きます。

4. ウォレットで新しいパスフレーズを入力します。これにより既存のパスフレーズが削除されるため、_必ずバックアップを取っておいてください_。

   パスフレーズは `test test test test test test test test test test test junk` で、これは anvil のデフォルトのテスト用パスフレーズです。

5. [クライアント側のコード](http://localhost:5173/)にアクセスします。

6. ウォレットに接続し、宛先アカウントと金額を選択します。

7. **Sign** をクリックし、トランザクションに署名します。

8. **Prover.toml** の見出しの下にテキストが表示されます。`server/noir/Prover.toml` をそのテキストに置き換えます。

9. ゼロ知識証明を実行します。

   ```sh
   cd ../server/noir
   nargo execute
   ```

   出力は以下のようになるはずです。

      ```
ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. 最後の2つの値をウェブブラウザに表示されているハッシュと比較し、メッセージが正しくハッシュ化されているか確認します。

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[このファイル](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml)は、Noir が想定する情報のフォーマットを示しています。

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

メッセージはテキスト形式であり、ユーザーが理解しやすく（署名時に必要）、Noir コードが解析しやすくなっています。金額はフィニー単位で記載されており、これにより端数の送金が可能になる一方で、読みやすさも保たれています。最後の数字は[ナンス](https://en.wikipedia.org/wiki/Cryptographic_nonce)です。

文字列の長さは100文字です。ゼロ知識証明は可変長データの処理が苦手なため、データをパディング（埋め草）することがよく必要になります。

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

これら3つのパラメータは固定長のバイト配列です。

```toml
[[accounts]]
address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
balance=100_000
nonce=0

[[accounts]]
address="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
balance=100_000
nonce=0
```

これは構造体の配列を指定する方法です。各エントリについて、アドレス、残高（milliETH、別名[フィニー](https://cryptovalleyjournal.com/glossary/finney/)）、および次のナンス値を指定します。

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[このファイル](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx)はクライアント側の処理を実装し、`server/noir/Prover.toml` ファイル（ゼロ知識パラメータを含むファイル）を生成します。

以下は、より興味深い部分の説明です。

```tsx
export default attrs =>  {
```

この関数は、他のファイルがインポートできる `Transfer` React コンポーネントを作成します。

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

これらはアカウントのアドレスであり、`test ... test junk` パスフレーズによって作成されたアドレスです。独自のアドレスを使用したい場合は、この定義を変更するだけです。

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

これらの [Wagmi フック](https://wagmi.sh/react/api/hooks)を使用すると、[Viem](https://viem.sh/) ライブラリとウォレットにアクセスできます。

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

これはスペースでパディングされたメッセージです。[`useState`](https://react.dev/reference/react/useState) 変数のいずれかが変更されるたびに、コンポーネントが再描画され、`message` が更新されます。

```tsx
  const sign = async () => {
```

この関数は、ユーザーが **Sign** ボタンをクリックしたときに呼び出されます。メッセージは自動的に更新されますが、署名にはウォレットでのユーザーの承認が必要であり、必要な場合以外は要求したくありません。

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

ウォレットに[メッセージへの署名](https://viem.sh/docs/accounts/local/signMessage)を要求します。 

```tsx
    const hash = hashMessage(message)
```

メッセージのハッシュを取得します。これをユーザーに提供することは、（Noir コードの）デバッグに役立ちます。 

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[公開鍵を取得します](https://viem.sh/docs/utilities/recoverPublicKey)。これは [Noir の `ecrecover`](https://github.com/colinnielsen/ecrecover-noir) 関数に必要です。

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

状態変数を設定します。これにより、（`sign` 関数が終了した後に）コンポーネントが再描画され、更新された値がユーザーに表示されます。

```tsx
    let proverToml = `
```

`Prover.toml` 用のテキストです。

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem は公開鍵を65バイトの16進数文字列として提供します。最初のバイトはバージョンマーカーである `0x04` です。これに続いて、公開鍵の `x` 用の32バイト、そして公開鍵の `y` 用の32バイトが続きます。

しかし、Noir はこの情報を `x` 用と `y` 用の2つのバイト配列として受け取ることを想定しています。ゼロ知識証明の一部として解析するよりも、ここでクライアント側で解析する方が簡単です。

これはゼロ知識全般における良い実践であることに注意してください。ゼロ知識証明内のコードはコストが高いため、ゼロ知識証明の外部で実行できる処理は、ゼロ知識証明の外部で実行_すべき_です。

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

署名も65バイトの16進数文字列として提供されます。ただし、最後のバイトは公開鍵を復元するためにのみ必要です。公開鍵はすでに Noir コードに提供されるため、署名を検証するために最後のバイトは必要なく、Noir コードもそれを要求しません。

```tsx
${accounts.map(accountInProverToml).reduce((a,b) => a+b, "")}
`
```

アカウントを提供します。

```tsx
    setProverToml(proverToml)
  }

  return (
    <>
        <h2>Transfer</h2>
```

これはコンポーネントの HTML（より正確には [JSX](https://react.dev/learn/writing-markup-with-jsx)）フォーマットです。

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[このファイル](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr)は実際のゼロ知識コードです。

```
use std::hash::pedersen_hash;
```

[ペダーセン・ハッシュ](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/)は [Noir 標準ライブラリ](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash)で提供されています。ゼロ知識証明では一般的にこのハッシュ関数が使用されます。標準的なハッシュ関数と比較して、[算術回路](https://rareskills.io/post/arithmetic-circuit)内で計算するのがはるかに簡単です。

```
use keccak256::keccak256;
use dep::ecrecover;
```

これら2つの関数は外部ライブラリであり、[`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml) で定義されています。これらはまさにその名前の通り、[keccak256 ハッシュ](https://emn178.github.io/online-tools/keccak_256.html)を計算する関数と、イーサリアムの署名を検証して署名者のイーサリアム・アドレスを復元する関数です。

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir は [Rust](https://www.rust-lang.org/) にインスパイアされています。変数はデフォルトで定数です。このようにしてグローバルな設定定数を定義します。具体的には、`ACCOUNT_NUMBER` は保存するアカウントの数です。

`u<number>` という名前のデータ型は、そのビット数の符号なし整数です。サポートされている型は `u8`、`u16`、`u32`、`u64`、および `u128` のみです。

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

この変数は、後述するようにアカウントのペダーセン・ハッシュに使用されます。

```
global MESSAGE_LENGTH : u32 = 100;
```

前述の通り、メッセージの長さは固定です。ここで指定されます。

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[EIP-191 署名](https://eips.ethereum.org/EIPS/eip-191)では、26バイトのプレフィックス、ASCIIでのメッセージ長、そして最後にメッセージ自体を含むバッファが必要です。

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

アカウントについて保存する情報です。[`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) は通常最大253ビットの数値であり、ゼロ知識証明を実装する[算術回路](https://rareskills.io/post/arithmetic-circuit)で直接使用できます。ここでは、160ビットのイーサリアム・アドレスを保存するために `Field` を使用します。

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

送金トランザクションのために保存する情報です。

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

関数の定義です。パラメータは `Account` 情報です。結果は `Field` 変数の配列であり、その長さは `FLAT_ACCOUNT_FIELDS` です。

```
let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

配列の最初の値はアカウントのアドレスです。2番目の値には残高とナンスの両方が含まれます。`.into()` の呼び出しは、数値を必要なデータ型に変更します。`account.nonce` は `u32` の値ですが、それを `u128` の値である `account.balance << 32` に追加するには、`u128` にする必要があります。これが最初の `.into()` です。2番目のものは、配列に収まるように `u128` の結果を `Field` に変換します。

```
flat
}
```

Noir では、関数は最後にのみ値を返すことができます（早期リターンはありません）。戻り値を指定するには、関数の閉じ括弧の直前でそれを評価します。

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

この関数は、アカウントの配列を `Field` の配列に変換し、ペダーセン・ハッシュの入力として使用できるようにします。

```
let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

これはミュータブル（可変）な変数、つまり定数では_ない_変数を指定する方法です。Noir の変数は常に値を持つ必要があるため、この変数をすべてゼロで初期化します。

```
for i in 0..ACCOUNT_NUMBER {
```

これは `for` ループです。境界が定数であることに注意してください。Noir のループは、コンパイル時に境界がわかっている必要があります。その理由は、算術回路がフロー制御をサポートしていないためです。`for` ループを処理する際、コンパイラは単にその中のコードを各反復ごとに複数回配置します。

```
let fields = flatten_account(accounts[i]);
        for j in 0..FLAT_ACCOUNT_FIELDS {
            flat[i*FLAT_ACCOUNT_FIELDS + j] = fields[j];
        }
    }

    flat
}

fn hash_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> Field {
    pedersen_hash(flatten_accounts(accounts))
}
```

最後に、アカウントの配列をハッシュ化する関数に到達しました。

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

この関数は、特定のアドレスを持つアカウントを見つけます。この関数は、アドレスを見つけた後でもすべてのアカウントを反復処理するため、標準的なコードでは非常に非効率的です。

しかし、ゼロ知識証明にはフロー制御がありません。条件をチェックする必要がある場合は、毎回チェックする必要があります。

`if` 文でも同様のことが起こります。上記のループ内の `if` 文は、以下の数学的ステートメントに変換されます。

_condition<sub>result</sub> = accounts[i].address == address_ // 等しい場合は1、それ以外は0

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

[`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert) 関数は、アサーションが偽の場合にゼロ知識証明をクラッシュさせます。この場合、該当するアドレスを持つアカウントが見つからない場合です。アドレスを報告するために、[フォーマット文字列](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings)を使用します。

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

この関数は送金トランザクションを適用し、新しいアカウントの配列を返します。

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

Noir ではフォーマット文字列内の構造体要素にアクセスできないため、使用可能なコピーを作成します。

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} does not have {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transaction has nonce {txnNonce}, but the account is expected to use {accountNonce}");
```

これらは、トランザクションを無効にする可能性のある2つの条件です。

```rust
    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
}
```

新しいアカウントの配列を作成し、それを返します。

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

この関数はメッセージからアドレスを読み取ります。 

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

アドレスは常に20バイト（つまり40桁の16進数）の長さであり、7文字目から始まります。

```rust
        result *= 0x10;
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            result += (messageBytes[i]-48).into();
        }
        if messageBytes[i] >= 65 & messageBytes[i] <= 70 {    // A-F
            result += (messageBytes[i]-65+10).into()
        }
        if messageBytes[i] >= 97 & messageBytes[i] <= 102 {   // a-f
            result += (messageBytes[i]-97+10).into()
        }        
    }    

    result
}

fn readAmountAndNonce(messageBytes: [u8; MESSAGE_LENGTH]) -> (u128, u32)
```

メッセージから金額とナンスを読み取ります。 

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

メッセージ内で、アドレスの後の最初の数字は送金するフィニー（ETHの1000分の1）の金額です。2番目の数字はナンスです。それらの間のテキストは無視されます。

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // 見つかりました
                stillReadingNonce = true;
                lookingForNonce = false;
            }

            if stillReadingNonce {
                nonce = nonce*10 + digit.into();
            }
        } else {
            if stillReadingAmount {
                stillReadingAmount = false;
                lookingForNonce = true;
            }
            if stillReadingNonce {
                stillReadingNonce = false;
            }
        }
    }

    (amount, nonce)
}
```

[タプル](https://noir-lang.org/docs/noir/concepts/data_types/tuples)を返すことは、Noir で関数から複数の値を返す方法です。

```rust
fn readTransferTxn(message: str<MESSAGE_LENGTH>) -> TransferTxn 
{
    let mut txn: TransferTxn = TransferTxn { from: 0, to: 0, amount:0, nonce:0 };
    let messageBytes = message.as_bytes();

    txn.to = readAddress(messageBytes);
    let (amount, nonce) = readAmountAndNonce(messageBytes);
    txn.amount = amount;
    txn.nonce = nonce;

    txn
}
```

この関数はメッセージをバイトに変換し、次に金額を `TransferTxn` に変換します。

```rust
// ViemのhashMessageと同等のもの
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

アカウントはゼロ知識証明の内部でのみハッシュ化されるため、ペダーセン・ハッシュを使用できました。しかし、このコードではブラウザによって生成されたメッセージの署名をチェックする必要があります。そのためには、[EIP-191](https://eips.ethereum.org/EIPS/eip-191) のイーサリアム署名フォーマットに従う必要があります。つまり、標準のプレフィックス、ASCIIでのメッセージ長、およびメッセージ自体を組み合わせたバッファを作成し、イーサリアム標準の keccak256 を使用してハッシュ化する必要があります。

```rust
    // ASCIIプレフィックス
    let prefix_bytes = [
        0x19, // \x19
        0x45, // 'E'
        0x74, // 't'
        0x68, // 'h'
        0x65, // 'e'
        0x72, // 'r'
        0x65, // 'e'
        0x75, // 'u'
        0x6D, // 'm'
        0x20, // ' '
        0x53, // 'S'
        0x69, // 'i'
        0x67, // 'g'
        0x6E, // 'n'
        0x65, // 'e'
        0x64, // 'd'
        0x20, // ' '
        0x4D, // 'M'
        0x65, // 'e'
        0x73, // 's'
        0x73, // 's'
        0x61, // 'a'
        0x67, // 'g'
        0x65, // 'e'
        0x3A, // ':'
        0x0A  // '\n'
    ];
```

アプリケーションがユーザーに、トランザクションやその他の目的に使用できるメッセージへの署名を求めるケースを避けるため、EIP-191 では、すべての署名付きメッセージが文字 0x19（有効な ASCII 文字ではない）で始まり、その後に `Ethereum Signed Message:` と改行が続くように指定しています。

```rust
    let mut buffer: [u8; HASH_BUFFER_SIZE] = [0u8; HASH_BUFFER_SIZE];
    for i in 0..26 {
        buffer[i] = prefix_bytes[i];
    }

    let messageBytes : [u8; MESSAGE_LENGTH] = message.as_bytes();

    if MESSAGE_LENGTH <= 9 {
        for i in 0..1 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+1] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 10 & MESSAGE_LENGTH <= 99 {
        for i in 0..2 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+2] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 100 {
        for i in 0..3 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+3] = messageBytes[i];
        }
    }

    assert(MESSAGE_LENGTH < 1000, "Messages whose length is over three digits are not supported");
```

メッセージ長を最大999まで処理し、それより大きい場合は失敗させます。メッセージ長は定数ですが、変更しやすくするためにこのコードを追加しました。本番システムでは、パフォーマンス向上のために `MESSAGE_LENGTH` が変更されないと単に仮定するでしょう。

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

イーサリアム標準の `keccak256` 関数を使用します。

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // アドレス、ハッシュの最初の16バイト、ハッシュの最後の16バイト        
{
```

この関数は署名を検証しますが、それにはメッセージのハッシュが必要です。その後、署名したアドレスとメッセージのハッシュを提供します。メッセージのハッシュは2つの `Field` 値で提供されます。これは、プログラムの残りの部分でバイト配列よりも使いやすいためです。

フィールドの計算は大きな数の[モジュロ](https://en.wikipedia.org/wiki/Modulo)（剰余）で行われますが、その数は通常256ビット未満であるため（そうでないと EVM での計算が困難になります）、2つの `Field` 値を使用する必要があります。

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

`hash1` と `hash2` をミュータブルな変数として指定し、ハッシュを1バイトずつ書き込みます。

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```
    
これは [Solidity の `ecrecover`](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions) に似ていますが、2つの重要な違いがあります。

- 署名が無効な場合、呼び出しは `assert` で失敗し、プログラムは中止されます。
- 公開鍵は署名とハッシュから復元できますが、これは外部で実行できる処理であるため、ゼロ知識証明の内部で行う価値はありません。ここで誰かが不正を働こうとしても、署名の検証は失敗します。

```rust
        hash1,
        hash2
    )
}

fn main(
        accounts: [Account; ACCOUNT_NUMBER],
        message: str<MESSAGE_LENGTH>,
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64],
    ) -> pub (
        Field,  // 古いアカウント配列のハッシュ
        Field,  // 新しいアカウント配列のハッシュ
        Field,  // メッセージハッシュの最初の16バイト
        Field,  // メッセージハッシュの最後の16バイト
    )
```

最後に、`main` 関数に到達します。アカウントのハッシュを古い値から新しい値へ有効に変更するトランザクションがあることを証明する必要があります。また、送信者が自分のトランザクションが処理されたことを知ることができるように、それがこの特定のトランザクション・ハッシュを持っていることも証明する必要があります。

```rust
{
    let mut txn = readTransferTxn(message);
```

送信元アドレスはメッセージからではなく署名から読み取るため、`txn` をミュータブルにする必要があります。 

```rust
    let (fromAddress, txnHash1, txnHash2) = signatureToAddressAndHash(
        message,
        pubKeyX,
        pubKeyY,
        signature);

    txn.from = fromAddress;

    let newAccounts = apply_transfer_txn(accounts, txn);

    (
        hash_accounts(accounts),
        hash_accounts(newAccounts),
        txnHash1,
        txnHash2
    )
}
```

### ステージ2 - サーバーの追加 {#stage-2}

第2ステージでは、ブラウザから送金トランザクションを受信して実装するサーバーを追加します。

実際の動作を確認するには：

1. Vite が実行中の場合は停止します。

2. サーバーを含むブランチをダウンロードし、必要なすべてのモジュールがあることを確認します。

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Noir コードをコンパイルする必要はありません。ステージ1で使用したコードと同じです。

3. サーバーを起動します。

   ```sh
   npm run start
   ```

4. 別のコマンドラインウィンドウで Vite を実行し、ブラウザコードを提供します。

   ```sh
   cd client
   npm run dev
   ```

5. [http://localhost:5173](http://localhost:5173) のクライアントコードにアクセスします。

6. トランザクションを発行する前に、ナンスと送金可能な金額を知る必要があります。この情報を取得するには、**Update account data** をクリックしてメッセージに署名します。

   ここでジレンマがあります。一方で、再利用可能なメッセージ（[リプレイ攻撃](https://en.wikipedia.org/wiki/Replay_attack)）に署名したくないため、そもそもナンスが必要なのです。しかし、まだナンスを持っていません。解決策は、一度しか使用できず、現在の時刻など、すでに両側で持っているナンスを選択することです。

   この解決策の問題は、時刻が完全に同期されていない可能性があることです。そのため代わりに、1分ごとに変化する値に署名します。これは、リプレイ攻撃に対する脆弱性のウィンドウが最大でも1分であることを意味します。本番環境では署名されたリクエストが TLS によって保護されること、そしてトンネルの反対側であるサーバーがすでに残高とナンスを開示できる（機能するためにはそれらを知っている必要がある）ことを考慮すると、これは許容できるリスクです。

7. ブラウザが残高とナンスを受け取ると、送金フォームが表示されます。宛先アドレスと金額を選択し、**Transfer** をクリックします。このリクエストに署名します。

8. 送金を確認するには、**Update account data** を実行するか、サーバーを実行しているウィンドウを確認します。サーバーは状態が変化するたびに状態をログに記録します。

        ```
ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 36000 finney (milliEth) 0 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 64000 (1)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 100000 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 7200 finney (milliEth) 1 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 56800 (2)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 3000 finney (milliEth) 2 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 53800 (3)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 139000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    ```

#### `server/index.mjs` {#server-index-mjs-1}

[このファイル](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs)にはサーバープロセスが含まれており、[`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr) の Noir コードと対話します。以下は興味深い部分の説明です。

```js
import { Noir } from '@noir-lang/noir_js'
```

[noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) ライブラリは、JavaScript コードと Noir コードの間のインターフェースとして機能します。

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

算術回路（前のステージで作成したコンパイル済みの Noir プログラム）をロードし、実行の準備をします。

```js
// 署名されたリクエストに対する応答としてのみ、アカウント情報を提供します
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

アカウント情報を提供するには、署名のみが必要です。その理由は、メッセージが何になるか、したがってメッセージのハッシュが何になるかをすでに知っているからです。

```js
const processMessage = async (message, signature) => {
```

メッセージを処理し、それがエンコードするトランザクションを実行します。

```js
    // 公開鍵を取得する
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

サーバー上で JavaScript を実行するようになったため、クライアントではなくサーバーで公開鍵を取得できます。

```js
    let noirResult
    try {
        noirResult = await noir.execute({
            message,
            signature: signature.slice(2,-2).match(/.{2}/g).map(x => `0x${x}`),
            pubKeyX,
            pubKeyY,
            accounts: Accounts
        })
```

`noir.execute` は Noir プログラムを実行します。パラメータは [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) で提供されるものと同等です。長い値は、Viem のように単一の16進数値（`0x60A7`）としてではなく、16進数文字列の配列（`["0x60", "0xA7"]`）として提供されることに注意してください。

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

エラーが発生した場合はそれをキャッチし、簡略化されたバージョンをクライアントに中継します。

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

トランザクションを適用します。Noir コードですでに実行しましたが、そこから結果を抽出するよりも、ここでもう一度実行する方が簡単です。

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

初期の `Accounts` 構造体です。

### ステージ3 - イーサリアムのスマート・コントラクト {#stage-3}

1. サーバーとクライアントのプロセスを停止します。

2. スマート・コントラクトを含むブランチをダウンロードし、必要なすべてのモジュールがあることを確認します。

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. 別のコマンドラインウィンドウで `anvil` を実行します。

4. 検証キーと Solidity の検証者を生成し、検証者のコードを Solidity プロジェクトにコピーします。

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. スマート・コントラクトに移動し、`anvil` ブロックチェーンを使用するように環境変数を設定します。

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. `Verifier.sol` をデプロイし、アドレスを環境変数に保存します。

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. `ZkBank` コントラクトをデプロイします。

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   `0x199..67b` の値は、`Accounts` の初期状態のペダーセン・ハッシュです。`server/index.mjs` でこの初期状態を変更した場合、トランザクションを実行して、ゼロ知識証明によって報告される初期ハッシュを確認できます。

8. サーバーを実行します。

   ```sh
   cd ../server
   npm run start
   ```

9. 別のコマンドラインウィンドウでクライアントを実行します。

   ```sh
   cd client
   npm run dev
   ```

10. いくつかのトランザクションを実行します。

11. 状態がオンチェーンで変更されたことを確認するには、サーバープロセスを再起動します。トランザクション内の元のハッシュ値がオンチェーンに保存されているハッシュ値と異なるため、`ZkBank` がトランザクションを受け付けなくなったことを確認します。

    これは想定される種類のエラーです。

        ```
ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Verification error: ContractFunctionExecutionError: The contract function "processTransaction" reverted with the following reason:
    Wrong old state hash

    Contract Call:
        address:   0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
        function:  processTransaction(bytes _proof, bytes32[] _publicInputs)
        args:                        (0x0000000000000000000000000000000000000000000000042ab5d6d1986846cf00000000000000000000000000000000000000000000000b75c020998797da7800000000000000000000000000000000000000000000000
    ```

#### `server/index.mjs` {#server-index-mjs-2}

このファイルの変更は、主に実際の証明の作成とオンチェーンへの送信に関連しています。

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

オンチェーンに送信する実際の証明を作成するには、[Barretenberg パッケージ](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg)を使用する必要があります。このパッケージは、コマンドラインインターフェース（`bb`）を実行するか、[JavaScript ライブラリである `bb.js`](https://www.npmjs.com/package/@aztec/bb.js) を使用して利用できます。JavaScript ライブラリはコードをネイティブに実行するよりもはるかに遅いため、ここではコマンドラインを使用するために [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) を使用します。

`bb.js` を使用することにした場合、使用している Noir のバージョンと互換性のあるバージョンを使用する必要があることに注意してください。執筆時点では、現在の Noir バージョン（1.0.0-beta.11）は `bb.js` バージョン 0.87 を使用しています。

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

ここのアドレスは、クリーンな `anvil` で開始し、上記の指示に従ったときに取得できるアドレスです。

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

この秘密鍵は、`anvil` のデフォルトの事前資金提供済みアカウントの1つです。 

```js
const generateProof = async (witness, fileID) => {
```

`bb` 実行可能ファイルを使用して証明を生成します。

```js 
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

ウィットネスをファイルに書き込みます。

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

実際に証明を作成します。このステップでは公開変数を含むファイルも作成されますが、それは必要ありません。それらの変数はすでに `noir.execute` から取得しています。

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

証明は `Field` 値の JSON 配列であり、それぞれが16進数値として表されます。しかし、トランザクションではこれを単一の `bytes` 値として送信する必要があり、Viem はこれを大きな16進数文字列で表します。ここでは、すべての値を連結し、すべての `0x` を削除してから、最後に1つ追加することでフォーマットを変更します。

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

クリーンアップして証明を返します。

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

公開フィールドは32バイト値の配列である必要があります。しかし、トランザクション・ハッシュを2つの `Field` 値に分割する必要があったため、16バイト値として表示されます。ここでは、Viem が実際には32バイトであることを理解できるようにゼロを追加します。

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

各アドレスは各ナンスを一度しか使用しないため、`fromAddress` と `nonce` の組み合わせをウィットネスファイルと出力ディレクトリの一意の識別子として使用できます。

```js
    try {
        await zkBank.write.processTransaction([
            proof, publicFields])
    } catch (err) {
        console.log(`Verification error: ${err}`)
        throw Error("Can't verify the transaction onchain")
    }
    .
    .
    .
}
```

トランザクションをチェーンに送信します。

#### `smart-contracts/src/ZkBank.sol` {#smart-contracts-src-zkbank-sol}

これはトランザクションを受信するオンチェーンのコードです。

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.21;

import {HonkVerifier} from "./Verifier.sol";

contract ZkBank {
    HonkVerifier immutable myVerifier;
    bytes32 currentStateHash;

    constructor(address _verifierAddress, bytes32 _initialStateHash) {
        currentStateHash = _initialStateHash;
        myVerifier = HonkVerifier(_verifierAddress);
    }
```

オンチェーンのコードは、検証者（`nargo` によって作成される別のコントラクト）と現在の状態ハッシュの2つの変数を追跡する必要があります。

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

状態が変化するたびに、`TransactionProcessed` イベントを発行します。

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

この関数はトランザクションを処理します。証明（`bytes` として）と公開入力（`bytes32` 配列として）を、検証者が必要とするフォーマットで取得します（オンチェーンの処理を最小限に抑え、したがってガス・コストを最小限に抑えるため）。

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Wrong old state hash");
```

ゼロ知識証明は、トランザクションが現在のハッシュから新しいハッシュに変更されることを証明するものである必要があります。

```solidity
        myVerifier.verify(_proof, _publicFields);
```

検証者コントラクトを呼び出してゼロ知識証明を検証します。このステップでは、ゼロ知識証明が間違っている場合、トランザクションをリバートします。

```solidity
        currentStateHash = _publicFields[1];

        emit TransactionProcessed(
            _publicFields[2]<<128 | _publicFields[3],
            _publicFields[0],
            _publicFields[1]
        );
    }
}
```

すべてが確認されたら、状態ハッシュを新しい値に更新し、`TransactionProcessed` イベントを発行します。

## 中央集権的コンポーネントによる不正利用 {#abuses}

情報セキュリティは3つの属性で構成されています。

- _機密性_：ユーザーは、閲覧権限のない情報を読むことができません。
- _完全性_：情報は、権限を持つユーザーによって承認された方法でしか変更できません。
- _可用性_：権限を持つユーザーはシステムを使用できます。

このシステムでは、完全性はゼロ知識証明を通じて提供されます。可用性を保証するのははるかに難しく、機密性は不可能です。なぜなら、銀行は各アカウントの残高とすべてのトランザクションを知る必要があるからです。情報を持つエンティティがその情報を共有するのを防ぐ方法はありません。

[ステルス・アドレス](https://vitalik.eth.limo/general/2023/01/20/stealth.html)を使用して真に機密性の高い銀行を作成することは可能かもしれませんが、それはこの記事の範囲外です。

### 誤った情報 {#false-info}

サーバーが完全性を侵害する1つの方法は、[データが要求された](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291)ときに誤った情報を提供することです。

これを解決するために、アカウントをプライベート入力として受け取り、情報が要求されたアドレスをパブリック入力として受け取る2つ目のNoirプログラムを作成できます。出力は、そのアドレスの残高とナンス、およびアカウントのハッシュです。

もちろん、ナンスや残高をオンチェーンに公開したくないため、この証明をオンチェーンで検証することはできません。ただし、ブラウザで実行されているクライアント・コードによって検証することは可能です。

### 強制トランザクション {#forced-txns}

L2で可用性を確保し、検閲を防ぐための通常のメカニズムは、[強制トランザクション](https://docs.optimism.io/stack/transactions/forced-transaction)です。しかし、強制トランザクションはゼロ知識証明と組み合わせることができません。サーバーは、トランザクションを検証できる唯一のエンティティです。

`smart-contracts/src/ZkBank.sol` を変更して強制トランザクションを受け入れ、それらが処理されるまでサーバーが状態を変更できないようにすることができます。しかし、これでは単純なサービス拒否（DoS）攻撃に対して脆弱になります。強制トランザクションが無効であり、処理が不可能な場合はどうなるでしょうか？

解決策は、強制トランザクションが無効であることを示すゼロ知識証明を用意することです。これにより、サーバーには3つの選択肢が与えられます。

- 強制トランザクションを処理し、それが処理されたことのゼロ知識証明と新しい状態のハッシュを提供する。
- 強制トランザクションを拒否し、トランザクションが無効である（未知のアドレス、不正なナンス、または残高不足）ことを示すゼロ知識証明をコントラクトに提供する。
- 強制トランザクションを無視する。サーバーにトランザクションを実際に処理させる方法はありませんが、これはシステム全体が利用できなくなることを意味します。

#### 可用性ボンド {#avail-bonds}

実際のシステム実装では、サーバーを稼働させ続けるための何らかの利益動機がおそらく存在するでしょう。サーバーに可用性ボンドを預けさせ、強制トランザクションが一定期間内に処理されない場合に誰でもそれをバーンできるようにすることで、このインセンティブを強化できます。

### 不正なNoirコード {#bad-noir-code}

通常、スマート・コントラクトを信頼してもらうために、ソースコードを[ブロック・エクスプローラー](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract)にアップロードします。しかし、ゼロ知識証明の場合、それだけでは不十分です。

`Verifier.sol` には、Noirプログラムの関数である検証キーが含まれています。しかし、そのキーはNoirプログラムが何であったかを教えてくれません。実際に信頼できるソリューションを得るには、Noirプログラム（およびそれを作成したバージョン）をアップロードする必要があります。そうしないと、ゼロ知識証明がバックドアを持つ別のプログラムを反映している可能性があります。

ブロック・エクスプローラーがNoirプログラムのアップロードと検証を許可し始めるまでは、自分自身で（できれば[IPFS](/developers/tutorials/ipfs-decentralized-ui/)に）行う必要があります。そうすれば、高度な知識を持つユーザーはソースコードをダウンロードし、自分でコンパイルして `Verifier.sol` を作成し、それがオンチェーンのものと同一であることを検証できるようになります。

## 結論 {#conclusion}

プラズマ型のアプリケーションは、情報ストレージとして中央集権的なコンポーネントを必要とします。これにより潜在的な脆弱性が生じる可能性がありますが、その代わりに、ブロックチェーン自体では利用できない方法でプライバシーを保護することができます。ゼロ知識証明を用いることで、整合性を確保し、中央集権的なコンポーネントを運営する者が可用性を維持することを経済的に有利にすることが可能になります。

[私の他の記事についてはこちらをご覧ください](https://cryptodocguy.pro/)。

## 謝辞 {#acknowledgements}

- Josh Crites はこの記事の草稿を読み、厄介な Noir の問題について助けてくれました。

残っている誤りはすべて私の責任です。