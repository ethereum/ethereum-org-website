---
title: "プライバシーを保護するアプリ固有のPlasmaを作成する"
description: "このチュートリアルでは、預金用の半秘密の銀行を構築します。 銀行は中央集権的なコンポーネントであり、各ユーザーの残高を把握しています。 しかし、この情報はオンチェーンには保存されません。 代わりに、銀行は状態のハッシュをポストします。 トランザクションが発生するたびに、銀行は新しいハッシュと、ハッシュの状態を新しいものに変更する署名済みトランザクションを持っているというゼロ知識証明をポストします。 このチュートリアルを読むと、ゼロ知識証明の使用方法だけでなく、なぜそれを使用するのか、そしてどのように安全に使用するのかを理解できるようになります。"
author: Ori Pomerantz
tags: [ "ゼロ知識", "サーバー", "オフチェーン", "プライバシー" ]
skill: advanced
lang: ja
published: 2025-10-15
---

## はじめに {#introduction}

[ロールアップ](/developers/docs/scaling/zk-rollups/)とは対照的に、[Plasma](/developers/docs/scaling/plasma)は完全性のためにイーサリアムメインネットを使用しますが、可用性のためには使用しません。 この記事では、Plasmaのように動作するアプリケーションを作成します。イーサリアムは完全性(不正な変更がないこと)を保証しますが、可用性(中央集権的なコンポーネントがダウンしてシステム全体が無効になる可能性があること)は保証しません。

ここで作成するアプリケーションは、プライバシーを保護する銀行です。 異なるアドレスは残高を持つアカウントを所有し、他のアカウントにお金(ETH)を送ることができます。 銀行は状態(アカウントとその残高)とトランザクションのハッシュをポストしますが、実際の残高はプライベートに保つことができるオフチェーンに保持します。

## 設計 {#design}

これは本番環境対応のシステムではなく、教育用ツールです。 そのため、いくつかの単純化された仮定のもとに書かれています。

- 固定アカウントプール。 特定のアカウント数があり、各アカウントはあらかじめ決められたアドレスに属します。 ゼロ知識証明では可変サイズのデータ構造を扱うのが難しいため、これによりシステムが大幅に簡素化されます。 本番環境対応のシステムでは、状態ハッシュとして[Merkleルート](/developers/tutorials/merkle-proofs-for-offline-data-integrity/)を使用し、必要な残高のためにMerkle証明を提供できます。

- メモリストレージ。 本番システムでは、再起動に備えてすべてのアカウント残高をディスクに書き込む必要があります。 ここでは、情報が単に失われても問題ありません。

- 送金のみ。 本番システムでは、資産を銀行に預け入れたり引き出したりする方法が必要になります。 しかし、ここでの目的は概念を説明することだけなので、この銀行は送金に限定されています。

### ゼロ知識証明 {#zero-knowledge-proofs}

根本的なレベルでは、ゼロ知識証明は、証明者が何らかの公開データ_Data<sub>public</sub>_と_Data<sub>private</sub>_の間に_Relationship_という関係が存在するような、何らかのデータ_Data<sub>private</sub>_を知っていることを示します。 検証者は、_Relationship_と_Data<sub>public</sub>_を知っています。

プライバシーを保護するためには、状態とトランザクションがプライベートである必要があります。 しかし、完全性を確保するためには、状態の[暗号論的ハッシュ](https://en.wikipedia.org/wiki/Cryptographic_hash_function)が公開されている必要があります。 トランザクションを送信する人々に、そのトランザクションが実際に発生したことを証明するために、トランザクションハッシュをポストする必要もあります。

ほとんどの場合、_Data<sub>private</sub>_はゼロ知識証明プログラムへの入力であり、_Data<sub>public</sub>_は出力です。

_Data<sub>private</sub>_のこれらのフィールド：

- _State<sub>n</sub>_、古い状態
- _State<sub>n+1</sub>_、新しい状態
- _Transaction_、古い状態から新しい状態へ変更するトランザクション。 このトランザクションには、以下のフィールドが含まれている必要があります。
  - 送金を受け取る_宛先アドレス_
  - 送金される_金額_
  - 各トランザクションが一度しか処理されないようにするための_ノンス (nonce)_。
    送信元アドレスは署名から復元できるため、トランザクションに含める必要はありません。
- トランザクションを実行する権限を持つ_署名_。 このケースでは、トランザクションを実行する権限を持つアドレスは送信元アドレスのみです。 ゼロ知識システムはこのように動作するため、イーサリアムの署名に加えて、アカウントの公開鍵も必要です。

_Data<sub>public</sub>_のフィールドは次のとおりです。

- _Hash(State<sub>n</sub>)_ 古い状態のハッシュ
- _Hash(State<sub>n+1</sub>)_ 新しい状態のハッシュ
- _Hash(Transaction)_ 状態を_State<sub>n</sub>_から_State<sub>n+1</sub>_へ変更するトランザクションのハッシュ。

この関係は、いくつかの条件をチェックします。

- 公開ハッシュが、実際にプライベートフィールドの正しいハッシュであること。
- トランザクションが古い状態に適用されると、新しい状態になること。
- 署名がトランザクションの送信元アドレスからのものであること。

暗号論的ハッシュ関数の特性により、これらの条件を証明するだけで完全性を確保できます。

### データ構造 {#data-structures}

主要なデータ構造は、サーバーが保持する状態です。 すべてのアカウントについて、サーバーはアカウントの残高と[ノンス (nonce)](https://en.wikipedia.org/wiki/Cryptographic_nonce)を追跡し、[リプレイ攻撃](https://en.wikipedia.org/wiki/Replay_attack)を防止するために使用します。

### コンポーネント {#components}

このシステムには2つのコンポーネントが必要です。

- トランザクションを受信し、処理し、ゼロ知識証明とともにハッシュをチェーンにポストする_サーバー_。
- ハッシュを保存し、ゼロ知識証明を検証して状態遷移が正当であることを保証する_スマートコントラクト_。

### データと制御フロー {#flows}

これらは、さまざまなコンポーネントが通信して、あるアカウントから別のアカウントに送金する方法です。

1. ウェブブラウザは、署名者のアカウントから別のアカウントへの送金を要求する署名済みトランザクションを送信します。

2. サーバーはトランザクションが有効であることを検証します。

   - 署名者は銀行に十分な残高のあるアカウントを持っている。
   - 受信者は銀行にアカウントを持っている。

3. サーバーは、送金された金額を署名者の残高から差し引き、受信者の残高に加算することで、新しい状態を計算します。

4. サーバーは、状態の変更が有効であることを示すゼロ知識証明を計算します。

5. サーバーは、以下を含むトランザクションをイーサリアムに送信します。

   - 新しい状態ハッシュ
   - トランザクションハッシュ (トランザクションの送信者が処理されたことを知るため)
   - 新しい状態への移行が有効であることを証明するゼロ知識証明

6. スマートコントラクトはゼロ知識証明を検証します。

7. ゼロ知識証明が確認された場合、スマートコントラクトは次のアクションを実行します。
   - 現在の状態ハッシュを新しい状態ハッシュに更新する
   - 新しい状態ハッシュとトランザクションハッシュを含むログエントリを出力する

### ツール {#tools}

クライアント側のコードには、[Vite](https://vite.dev/)、[React](https://react.dev/)、[Viem](https://viem.sh/)、[Wagmi](https://wagmi.sh/)を使用します。 これらは業界標準のツールです。もし馴染みがない場合は、[このチュートリアル](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)を使用できます。

サーバーの大部分は、[Node](https://nodejs.org/en)を使用したJavaScriptで書かれています。 ゼロ知識の部分は[Noir](https://noir-lang.org/)で書かれています。 バージョン`1.0.0-beta.10`が必要なので、[指示に従ってNoirをインストール](https://noir-lang.org/docs/getting_started/quick_start)した後、次を実行してください。

```
noirup -v 1.0.0-beta.10
```

使用するブロックチェーンは、[Foundry](https://getfoundry.sh/introduction/installation)の一部であるローカルテスト用ブロックチェーンの`anvil`です。

## 実装 {#implementation}

これは複雑なシステムなので、段階的に実装していきます。

### ステージ1 - 手動のゼロ知識 {#stage-1}

最初のステージでは、ブラウザでトランザクションに署名し、その情報を手動でゼロ知識証明に提供します。 ゼロ知識コードは、その情報を`server/noir/Prover.toml`で受け取ることを想定しています([こちら](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1)にドキュメントがあります)。

動作を確認するには：

1. [Node](https://nodejs.org/en/download)と[Noir](https://noir-lang.org/install)がインストールされていることを確認してください。 できれば、macOS、Linux、[WSL](https://learn.microsoft.com/en-us/windows/wsl/install)などのUNIXシステムにインストールしてください。

2. ステージ1のコードをダウンロードし、Webサーバーを起動してクライアントコードを提供します。

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   ここでWebサーバーが必要な理由は、特定の種類の不正行為を防ぐため、多くのウォレット(MetaMaskなど)がディスクから直接提供されるファイルを受け入れないためです。

3. ウォレットでブラウザを開きます。

4. ウォレットで新しいパスフレーズを入力します。 これにより既存のパスフレーズが削除されるため、_必ずバックアップを取っておいてください_。

   パスフレーズは`test test test test test test test test test test test junk`で、これは`anvil`のデフォルトのテスト用パスフレーズです。

5. [クライアント側のコード](http://localhost:5173/)にアクセスします。

6. ウォレットに接続し、宛先アカウントと金額を選択します。

7. **「Sign (署名)」** をクリックし、トランザクションに署名します。

8. **Prover.toml**の見出しの下にテキストがあります。 `server/noir/Prover.toml`をそのテキストに置き換えます。

9. ゼロ知識証明を実行します。

   ```sh
   cd ../server/noir
   nargo execute
   ```

   出力は以下のようになります

   ```
   ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. 最後の2つの値をウェブブラウザに表示されるハッシュと比較して、メッセージが正しくハッシュ化されているかを確認します。

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[このファイル](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml)は、Noirが期待する情報形式を示しています。

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

メッセージはテキスト形式であり、ユーザーが理解しやすく(署名時に必要)、Noirコードが解析しやすくなっています。 金額はfinneyで表記されており、一方では分割送金を可能にし、他方では読みやすくしています。 最後の数字は[ノンス (nonce)](https://en.wikipedia.org/wiki/Cryptographic_nonce)です。

文字列の長さは100文字です。 ゼロ知識証明は可変長データをうまく扱えないため、データをパディングすることがしばしば必要になります。

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

これら3つのパラメータは固定サイズのバイト配列です。

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

これは構造体の配列を指定する方法です。 各エントリについて、アドレス、残高(milliETH、別名)を指定します。 [finney](https://cryptovalleyjournal.com/glossary/finney/))、および次のノンス (nonce)値を指定します。

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[このファイル](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx)は、クライアント側の処理を実装し、`server/noir/Prover.toml`ファイル(ゼロ知識パラメータを含むファイル)を生成します。

ここでは、より興味深い部分について説明します。

```tsx
export default attrs =>  {
```

この関数は`Transfer` Reactコンポーネントを作成し、他のファイルからインポートできます。

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

これらはアカウントのアドレスで、`test ...`によって作成されたアドレスです。 test junk`パスフレーズです。 独自のアドレスを使用したい場合は、この定義を変更してください。

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

これらの[Wagmiフック](https://wagmi.sh/react/api/hooks)により、[viem](https://viem.sh/)ライブラリとウォレットにアクセスできます。

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

これは、スペースでパディングされたメッセージです。 [`useState`](https://react.dev/reference/react/useState)変数のいずれかが変更されるたびに、コンポーネントが再描画され、`message`が更新されます。

```tsx
  const sign = async () => {
```

この関数は、ユーザーが\*\*「Sign (署名)」\*\*ボタンをクリックしたときに呼び出されます。 メッセージは自動的に更新されますが、署名にはウォレットでのユーザーの承認が必要であり、必要でない限りは要求したくありません。

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

ウォレットに[メッセージへの署名](https://viem.sh/docs/accounts/local/signMessage)を依頼します。

```tsx
    const hash = hashMessage(message)
```

メッセージハッシュを取得します。 (Noirコードの)デバッグのためにユーザーに提供すると便利です。

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[公開鍵を取得](https://viem.sh/docs/utilities/recoverPublicKey)します。 これは[Noir `ecrecover`](https://github.com/colinnielsen/ecrecover-noir)関数に必要です。

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

状態変数を設定します。 これにより、コンポーネントが再描画され(`sign`関数が終了した後)、ユーザーに更新された値が表示されます。

```tsx
    let proverToml = `
```

`Prover.toml`のテキストです。

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viemは公開鍵を65バイトの16進数文字列として提供します。 最初のバイトはバージョンマーカーである`0x04`です。 これに続いて、公開鍵の`x`に32バイト、公開鍵の`y`に32バイトが続きます。

しかし、Noirはこの情報を`x`と`y`の2つのバイト配列として受け取ることを想定しています。 ゼロ知識証明の一部としてではなく、ここでクライアント上で解析する方が簡単です。

これは一般的にゼロ知識の良い実践であることに注意してください。 ゼロ知識証明内のコードは高価であるため、ゼロ知識証明の外で実行できる処理は、ゼロ知識証明の外で_実行されるべき_です。

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

署名も65バイトの16進数文字列として提供されます。 しかし、最後のバイトは公開鍵を復元するためにのみ必要です。 公開鍵はすでにNoirコードに提供されるため、署名を検証するために必要ではなく、Noirコードもそれを要求しません。

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

これはコンポーネントのHTML(より正確には、[JSX](https://react.dev/learn/writing-markup-with-jsx))形式です。

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[このファイル](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr)は、実際のゼロ知識コードです。

```
use std::hash::pedersen_hash;
```

[Pedersenハッシュ](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/)は、[Noir標準ライブラリ](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash)で提供されています。 ゼロ知識証明では、このハッシュ関数が一般的に使用されます。 標準のハッシュ関数と比較して、[算術回路](https://rareskills.io/post/arithmetic-circuit)内で計算するのがはるかに簡単です。

```
use keccak256::keccak256;
use dep::ecrecover;
```

これら2つの関数は外部ライブラリで、[`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml)で定義されています。 これらはその名の通り、[keccak256ハッシュ](https://emn178.github.io/online-tools/keccak_256.html)を計算する関数と、イーサリアム署名を検証して署名者のイーサリアムアドレスを復元する関数です。

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noirは[Rust](https://www.rust-lang.org/)に触発されています。 変数は、デフォルトで定数です。 これがグローバルな設定定数を定義する方法です。 具体的には、`ACCOUNT_NUMBER`は私たちが保存するアカウントの数です。

`u<number>`という名前のデータ型は、そのビット数の符号なし整数です。 サポートされている型は`u8`、`u16`、`u32`、`u64`、`u128`のみです。

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

この変数は、後述するように、アカウントのPedersenハッシュに使用されます。

```
global MESSAGE_LENGTH : u32 = 100;
```

上述のように、メッセージの長さは固定です。 ここで指定されています。

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[EIP-191署名](https://eips.ethereum.org/EIPS/eip-191)には、26バイトのプレフィックス、その後にASCIIでのメッセージ長、最後にメッセージ自体を含むバッファが必要です。

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

アカウントについて保存する情報。 [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields)は、通常最大253ビットの数値で、ゼロ知識証明を実装する[算術回路](https://rareskills.io/post/arithmetic-circuit)で直接使用できます。 ここでは`Field`を使用して160ビットのイーサリアムアドレスを保存します。

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

送金トランザクションで保存する情報です。

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

関数定義です。 パラメータは`Account`情報です。 結果は`Field`変数の配列で、その長さは`FLAT_ACCOUNT_FIELDS`です。

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

配列の最初の値はアカウントアドレスです。 2番目の値には、残高とノンス (nonce)の両方が含まれています。 `.into()`の呼び出しは、数値を必要なデータ型に変更します。 `account.nonce`は`u32`値ですが、`u128`値である`account.balance « 32`に加算するには、`u128`である必要があります。 それが最初の`.into()`です。 2番目のものは、`u128`の結果を`Field`に変換して、配列に収まるようにします。

```
    flat
}
```

Noirでは、関数は最後にのみ値を返すことができます(早期リターンはありません)。 戻り値を指定するには、関数の閉じ括弧の直前で評価します。

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

この関数は、アカウント配列を`Field`配列に変換し、Petersenハッシュの入力として使用できます。

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

これは、可変変数、つまり定数では_ない_変数を指定する方法です。 Noirの変数は常に値を持つ必要があるため、この変数をすべてゼロに初期化します。

```
    for i in 0..ACCOUNT_NUMBER {
```

`for`ループです。 境界が定数であることに注意してください。 Noirのループは、コンパイル時に境界がわかっている必要があります。 その理由は、算術回路がフロー制御をサポートしていないためです。 `for`ループを処理するとき、コンパイラは単にその中のコードを、各反復ごとに複数回配置します。

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

最後に、アカウント配列をハッシュ化する関数にたどり着きました。

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

この関数は、特定のアドレスを持つアカウントを検索します。 この関数は、アドレスを見つけた後でもすべてのアカウントを反復処理するため、標準的なコードでは非常に非効率的です。

しかし、ゼロ知識証明ではフロー制御はありません。 条件をチェックする必要がある場合は、毎回チェックする必要があります。

`if`文でも同様のことが起こります。 上記のループの`if`文は、これらの数式に変換されます。

_condition<sub>result</sub> = accounts[i].address == address_ // 等しい場合は1、そうでない場合は0

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

[`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert)関数は、アサーションが偽の場合にゼロ知識証明をクラッシュさせます。 この場合、関連するアドレスを持つアカウントが見つからない場合です。 アドレスを報告するには、[フォーマット文字列](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings)を使用します。

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

この関数は送金トランザクションを適用し、新しいアカウント配列を返します。

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

Noirのフォーマット文字列内で構造体要素にアクセスできないため、使用可能なコピーを作成します。

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

新しいアカウント配列を作成して返します。

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

この関数は、メッセージからアドレスを読み取ります。

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

アドレスは常に20バイト(別名 40桁の16進数)で、7文字目から始まります。

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

メッセージから金額とノンス (nonce)を読み取ります。

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

メッセージでは、アドレスの後の最初の数字は、送金するfinney(別名 ETHの1000分の1)の量です。 2番目の数字はノンス (nonce)です。 それらの間のテキストは無視されます。

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // We just found it
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

[タプル](https://noir-lang.org/docs/noir/concepts/data_types/tuples)を返すことは、Noirで関数から複数の値を返す方法です。

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

この関数はメッセージをバイトに変換し、次に金額を`TransferTxn`に変換します。

```rust
// ViemのhashMessageと同等
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

アカウントはゼロ知識証明の内部でのみハッシュ化されるため、Pedersenハッシュを使用することができました。 しかし、このコードでは、ブラウザによって生成されたメッセージの署名をチェックする必要があります。 そのためには、[EIP 191](https://eips.ethereum.org/EIPS/eip-191)のイーサリアム署名形式に従う必要があります。 これは、標準のプレフィックス、ASCIIでのメッセージ長、およびメッセージ自体を含む結合されたバッファを作成し、それをハッシュ化するためにイーサリアム標準のkeccak256を使用する必要があることを意味します。

```rust
    // ASCII prefix
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

アプリケーションがユーザーにトランザクションやその他の目的で使用できるメッセージへの署名を要求するケースを避けるため、EIP 191では、すべての署名済みメッセージは、文字0x19(有効なASCII文字ではない)で始まり、その後に`Ethereum Signed Message:`と改行が続くことを指定しています。

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

メッセージ長が999までを処理し、それより大きい場合は失敗させます。 メッセージの長さは定数ですが、変更しやすくするためにこのコードを追加しました。 本番システムでは、パフォーマンスを向上させるために`MESSAGE_LENGTH`は変更されないと仮定するでしょう。

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

イーサリアム標準の`keccak256`関数を使用します。

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // address, first 16 bytes of hash, last 16 bytes of hash        
{
```

この関数は署名を検証し、それにはメッセージハッシュが必要です。 そして、署名したアドレスとメッセージハッシュを提供してくれます。 メッセージハッシュは2つの`Field`値で提供されます。これは、バイト配列よりもプログラムの残りの部分で使いやすいためです。

フィールドの計算は大きな数を[法](https://en.wikipedia.org/wiki/Modulo)として行われますが、その数は通常256ビット未満であるため(そうでなければEVMでこれらの計算を実行するのが難しくなるため)、2つの`Field`値を使用する必要があります。

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

`hash1`と`hash2`を可変変数として指定し、ハッシュをバイトごとに書き込みます。

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```

これは[Solidityの`ecrecover`](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions)に似ていますが、2つの重要な違いがあります。

- 署名が有効でない場合、呼び出しは`assert`に失敗し、プログラムは中止されます。
- 公開鍵は署名とハッシュから復元できますが、これは外部で実行できる処理であり、したがってゼロ知識証明の内部で行う価値はありません。 ここで誰かが私たちをだまそうとすると、署名の検証は失敗します。

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
        Field,  // Hash of old accounts array
        Field,  // Hash of new accounts array
        Field,  // First 16 bytes of message hash
        Field,  // Last 16 bytes of message hash
    )
```

最後に、`main`関数に到達します。 アカウントのハッシュが古い値から新しい値に正当に変更されるトランザクションがあることを証明する必要があります。 また、特定のトランザクションハッシュを持っていることを証明する必要もあります。そうすることで、送信した人が自分のトランザクションが処理されたことを知ることができます。

```rust
{
    let mut txn = readTransferTxn(message);
```

`txn`は可変である必要があります。なぜなら、fromアドレスはメッセージからではなく、署名から読み取るからです。

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

第2ステージでは、ブラウザからの送金トランザクションを受信して実装するサーバーを追加します。

動作を確認するには：

1. Viteが実行中の場合は停止します。

2. サーバーを含むブランチをダウンロードし、必要なモジュールがすべて揃っていることを確認します。

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Noirコードをコンパイルする必要はありません。ステージ1で使用したコードと同じです。

3. サーバーを起動します。

   ```sh
   npm run start
   ```

4. 別のコマンドラインウィンドウでViteを実行して、ブラウザコードを提供します。

   ```sh
   cd client
   npm run dev
   ```

5. クライアントコード([http://localhost:5173](http://localhost:5173))にアクセスします

6. トランザクションを発行する前に、ノンス (nonce)と送信できる金額を知る必要があります。 この情報を取得するには、\*\*「Update account data (アカウントデータを更新)」\*\*をクリックしてメッセージに署名します。

   ここでジレンマがあります。 一方で、再利用可能なメッセージ([リプレイ攻撃](https://en.wikipedia.org/wiki/Replay_attack))に署名したくないため、そもそもノンス (nonce)が必要です。 しかし、まだノンス (nonce)がありません。 解決策は、一度しか使用できず、両側で既に持っているノンス (nonce)、例えば現在時刻などを選択することです。

   この解決策の問題は、時刻が完全に同期していない可能性があることです。 そこで代わりに、毎分変わる値に署名します。 これは、リプレイ攻撃に対する脆弱性のウィンドウが最大1分であることを意味します。 本番環境では署名されたリクエストがTLSで保護されること、またトンネルの反対側であるサーバーは既に残高とノンス (nonce)を開示できる(動作するためにそれらを知る必要がある)ことを考えると、これは許容できるリスクです。

7. ブラウザが残高とノンス (nonce)を取得すると、送金フォームが表示されます。 宛先アドレスと金額を選択し、\*\*「Transfer (送金)」\*\*をクリックします。 このリクエストに署名します。

8. 送金を確認するには、\*\*「Update account data (アカウントデータを更新)」\*\*するか、サーバーを実行しているウィンドウを確認します。 サーバーは状態が変更されるたびにログを記録します。

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

[このファイル](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs)はサーバープロセスを含み、[`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr)のNoirコードと相互作用します。 興味深い部分を説明します。

```js
import { Noir } from '@noir-lang/noir_js'
```

[noir.js](https://www.npmjs.com/package/@noir-lang/noir_js)ライブラリは、JavaScriptコードとNoirコードの間のインターフェースです。

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

算術回路(前の段階で作成したコンパイル済みのNoirプログラム)をロードし、実行準備をします。

```js
// We only provide account information in return to a signed request
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

アカウント情報を提供するには、署名のみが必要です。 その理由は、メッセージがどうなるかを既に知っており、したがってメッセージハッシュも知っているからです。

```js
const processMessage = async (message, signature) => {
```

メッセージを処理し、エンコードされたトランザクションを実行します。

```js
    // Get the public key
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

サーバーでJavaScriptを実行するようになったので、クライアントではなくサーバーで公開鍵を取得できます。

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

`noir.execute`はNoirプログラムを実行します。 パラメータは、[`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml)で提供されるものと同等です。 Viemが行うように、長い値は単一の16進数値(`0x60A7`)ではなく、16進文字列の配列(`["0x60", "0xA7"]`)として提供されることに注意してください。

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

エラーが発生した場合は、それをキャッチし、簡略化されたバージョンをクライアントにリレーします。

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

トランザクションを適用します。 Noirコードでは既に実行しましたが、そこから結果を抽出するよりもここで再度実行する方が簡単です。

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

初期の`Accounts`構造体。

### ステージ3 - イーサリアムスマートコントラクト {#stage-3}

1. サーバーとクライアントプロセスを停止します。

2. スマートコントラクトを含むブランチをダウンロードし、必要なモジュールがすべて揃っていることを確認します。

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. 別のコマンドラインウィンドウで`anvil`を実行します。

4. 検証キーとSolidityベリファイアを生成し、ベリファイアコードをSolidityプロジェクトにコピーします。

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. スマートコントラクトに移動し、`anvil`ブロックチェーンを使用するように環境変数を設定します。

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. `Verifier.sol`をデプロイし、アドレスを環境変数に保存します。

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. `ZkBank`コントラクトをデプロイします。

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   `0x199..67b`の値は、`Accounts`の初期状態のPedersonハッシュです。 `server/index.mjs`でこの初期状態を変更した場合、トランザクションを実行してゼロ知識証明によって報告される初期ハッシュを確認できます。

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

11. 状態がオンチェーンで変更されたことを確認するには、サーバープロセスを再起動します。 トランザクションの元のハッシュ値がオンチェーンに保存されているハッシュ値と異なるため、`ZkBank`がトランザクションを受け入れなくなったことを確認してください。

    これは予想されるエラーの種類です。

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
        args:                        (0x0000000000000000000000000000000000000000000000042ab5d6d1986846cf00000000000000000000000000000000000000000000000b75c020998797da7800000000000000000000000000000000000000000000000)
    ```

#### `server/index.mjs` {#server-index-mjs-2}

このファイルの変更点は、主に実際の証明を作成し、オンチェーンで送信することに関連しています。

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

オンチェーンで送信する実際の証明を作成するには、[Barretenbergパッケージ](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg)を使用する必要があります。 このパッケージは、コマンドラインインターフェイス(`bb`)を実行するか、[JavaScriptライブラリ、`bb.js`](https://www.npmjs.com/package/@aztec/bb.js)を使用して使用できます。 JavaScriptライブラリはネイティブでコードを実行するよりもはるかに遅いため、ここではコマンドラインを使用するために[`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback)を使用します。

`bb.js`を使用することにした場合、使用しているNoirのバージョンと互換性のあるバージョンを使用する必要があることに注意してください。 執筆時点では、現在のNoirバージョン(1.0.0-beta.11)は`bb.js`バージョン0.87を使用しています。

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

ここでのアドレスは、クリーンな`anvil`で開始し、上記の手順に従ったときに取得するものです。

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

この秘密鍵は、`anvil`のデフォルトの事前資金提供アカウントの1つです。

```js
const generateProof = async (witness, fileID) => {
```

`bb`実行可能ファイルを使用して証明を生成します。

```js
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

ウィットネスをファイルに書き込みます。

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

実際に証明を作成します。 このステップでは、公開変数を持つファイルも作成しますが、それは必要ありません。 これらの変数は既に`noir.execute`から取得しています。

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

証明は`Field`値のJSON配列であり、それぞれが16進数値として表されます。 ただし、トランザクションでは単一の`bytes`値として送信する必要があり、Viemはこれを大きな16進数文字列で表します。 ここでは、すべての値を連結し、すべての`0x`を削除し、最後に1つ追加することで形式を変更します。

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

公開フィールドは32バイト値の配列である必要があります。 ただし、トランザクションハッシュを2つの`Field`値に分割する必要があったため、16バイト値として表示されます。 ここでは、Viemが実際には32バイトであることを理解できるようにゼロを追加します。

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

各アドレスは各ノンス (nonce)を一度しか使用しないため、`fromAddress`と`nonce`の組み合わせをウィットネスファイルと出力ディレクトリの一意の識別子として使用できます。

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

これは、トランザクションを受け取るオンチェーンコードです。

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

オンチェーンコードは、2つの変数を追跡する必要があります。ベリファイア(`nargo`によって作成される別のコントラクト)と現在の状態ハッシュです。

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

状態が変更されるたびに、`TransactionProcessed`イベントを発行します。

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

この関数はトランザクションを処理します。 証明(`bytes`として)と公開入力(`bytes32`配列として)を、ベリファイアが必要とする形式で取得します(オンチェーン処理を最小限に抑え、したがってガスコストを削減するため)。

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Wrong old state hash");
```

ゼロ知識証明は、トランザクションが現在のハッシュから新しいハッシュに変更されることである必要があります。

```solidity
        myVerifier.verify(_proof, _publicFields);
```

ベリファイアコントラクトを呼び出して、ゼロ知識証明を検証します。 このステップは、ゼロ知識証明が間違っている場合にトランザクションをリバートします。

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

すべてが問題なければ、状態ハッシュを新しい値に更新し、`TransactionProcessed`イベントを発行します。

## 中央集権型コンポーネントによる悪用 {#abuses}

情報セキュリティは、3つの属性で構成されます。

- _機密性_、ユーザーは読む権限のない情報を読むことができません。
- _完全性_、情報は、許可されたユーザーによって、許可された方法でのみ変更できます。
- _可用性_、承認されたユーザーはシステムを使用できます。

このシステムでは、ゼロ知識証明を通じて完全性が提供されます。 可用性の保証ははるかに困難であり、銀行は各アカウントの残高とすべてのトランザクションを知る必要があるため、機密性は不可能です。 情報を持っているエンティティがその情報を共有するのを防ぐ方法はありません。

[ステルスアドレス](https://vitalik.eth.limo/general/2023/01/20/stealth.html)を使用して真に機密性の高い銀行を作成することは可能かもしれませんが、それはこの記事の範囲を超えています。

### 偽情報 {#false-info}

サーバーが完全性を侵害する方法の1つは、[データが要求された](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291)ときに偽の情報を提供することです。

これを解決するために、アカウントをプライベート入力として受け取り、情報が要求されたアドレスをパブリック入力として受け取る2番目のNoirプログラムを作成できます。 出力は、そのアドレスの残高とノンス (nonce)、およびアカウントのハッシュです。

もちろん、ノンス (nonce)と残高をオンチェーンにポストしたくないため、この証明はオンチェーンで検証できません。 しかし、ブラウザで実行されているクライアントコードで検証することはできます。

### 強制トランザクション {#forced-txns}

L2での可用性を確保し、検閲を防ぐための通常のメカニズムは、[強制トランザクション](https://docs.optimism.io/stack/transactions/forced-transaction)です。 しかし、強制トランザクションはゼロ知識証明と組み合わせられません。 サーバーは、トランザクションを検証できる唯一のエンティティです。

`smart-contracts/src/ZkBank.sol`を変更して、強制トランザクションを受け入れ、処理されるまでサーバーが状態を変更するのを防ぐことができます。 しかし、これにより、単純なサービス拒否攻撃にさらされることになります。 強制トランザクションが無効で処理できない場合はどうなるでしょうか？

解決策は、強制トランザクションが無効であることを示すゼロ知識証明を持つことです。 これにより、サーバーには3つのオプションが与えられます。

- 強制トランザクションを処理し、処理されたことと新しい状態ハッシュを示すゼロ知識証明を提供する。
- 強制トランザクションを拒否し、トランザクションが無効であること(不明なアドレス、不正なノンス (nonce)、または不十分な残高)をコントラクトにゼロ知識証明で提供する。
- 強制トランザクションを無視する。 サーバーに実際にトランザクションを処理させる方法はありませんが、それはシステム全体が利用できなくなることを意味します。

#### 可用性ボンド {#avail-bonds}

実際の導入では、サーバーを稼働させ続けるための何らかの利益動機があるでしょう。 このインセンティブを強化するには、サーバーに可用性ボンドをポストさせ、強制トランザクションが一定期間内に処理されない場合に誰でもそれをバーンできるようにします。

### 不正なNoirコード {#bad-noir-code}

通常、人々にスマートコントラクトを信頼してもらうには、ソースコードを[ブロックエクスプローラー](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract)にアップロードします。 しかし、ゼロ知識証明の場合は、それだけでは不十分です。

`Verifier.sol`には検証キーが含まれており、これはNoirプログラムの関数です。 しかし、そのキーはNoirプログラムが何であったかを教えてくれません。 実際に信頼できるソリューションを持つには、Noirプログラム(とそれを作成したバージョン)をアップロードする必要があります。 そうしないと、ゼロ知識証明は、バックドアを持つ別のプログラムを反映する可能性があります。

ブロックエクスプローラーがNoirプログラムのアップロードと検証を許可するようになるまで、自分でそれを行う必要があります(できれば[IPFS](/developers/tutorials/ipfs-decentralized-ui/)に)。 そうすれば、高度なユーザーはソースコードをダウンロードし、自分でコンパイルし、`Verifier.sol`を作成し、それがオンチェーンのものと同一であることを検証できます。

## 結論 {#conclusion}

Plasmaタイプのアプリケーションには、情報ストレージとして中央集権的なコンポーネントが必要です。 これにより、潜在的な脆弱性が生じますが、その見返りとして、ブロックチェーン自体では利用できない方法でプライバシーを保護できます。 ゼロ知識証明を使用することで、完全性を確保し、中央集権型コンポーネントを運営している人が可用性を維持することが経済的に有利になる可能性があります。

[私の他の作品はこちらでご覧いただけます](https://cryptodocguy.pro/).

## 謝辞 {#acknowledgements}

- Josh Critesはこの記事の草稿を読み、厄介なNoirの問題を手伝ってくれました。

残りの誤りは私の責任です。
