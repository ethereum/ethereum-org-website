---
title: "ステルスアドレスの使用"
description: "ステルスアドレスを使用すると、ユーザーは匿名で資産を送金できます。 この記事を読むと、ステルスアドレスとは何か、またその仕組みを説明し、匿名性を保つ方法でステルスアドレスを使用する方法を理解し、ステルスアドレスを使用するウェブベースのアプリケーションを作成できるようになります。"
author: Ori Pomerantz
tags: ["Stealth address", "privacy", "cryptography", "rust", "wasm"]
skill: intermediate
published: 2025-11-30
lang: ja
sidebarDepth: 3
---

あなたはBillです。 理由は省きますが、あなたは「世界女王アリス」キャンペーンに寄付をして、アリスに寄付したことを知らせ、彼女が勝った場合に報酬を得たいと考えています。 残念ながら、彼女の勝利は保証されていません。 「太陽系女帝キャロル」という競合キャンペーンがあります。 もしキャロルが勝ち、あなたがアリスに寄付したことを彼女が知ったら、あなたは面倒なことになります。 そのため、自分のアカウントからアリスのアカウントに200 ETHを単純に送金することはできません。

[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564)がその解決策です。 このERCは、匿名での送金に[ステルスアドレス](https://nerolation.github.io/stealth-utils)を使用する方法を説明しています。

**警告**: ステルスアドレスの背後にある暗号技術は、私たちが知る限り、健全です。 しかし、潜在的なサイドチャネル攻撃が存在します。 [以下](#go-wrong)では、このリスクを軽減するために何ができるかを見ていきます。

## ステルスアドレスの仕組み {#how}

この記事では、ステルスアドレスを2つの方法で説明します。 1つ目は[その使用方法](#how-use)です。 この記事の残りの部分を理解するには、このパートで十分です。 次に、[その背後にある数学的な説明](#how-math)があります。 暗号技術に興味がある場合は、この部分もお読みください。

### 簡易版 (ステルスアドレスの使い方) {#how-use}

アリスは2つの秘密鍵を作成し、対応する公開鍵を公開します (これらを組み合わせて単一の倍長のメタアドレスにすることができます)。 ビルも秘密鍵を作成し、対応する公開鍵を公開します。

一方の当事者の公開鍵と他方の秘密鍵を使用することで、アリスとビルだけが知っている共有シークレットを導き出すことができます (公開鍵だけからは導き出すことはできません)。 この共有シークレットを使用して、ビルはステルスアドレスを取得し、そこに資産を送ることができます。

アリスも共有シークレットからアドレスを取得しますが、公開した公開鍵の秘密鍵を知っているため、そのアドレスから引き出すことができる秘密鍵も取得できます。

### 数学的な仕組み (なぜステルスアドレスがこのように機能するのか) {#how-math}

標準的なステルスアドレスでは、[楕円曲線暗号 (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor) を使用して、より少ない鍵ビットでより優れたパフォーマンスを得ながら、同じレベルのセキュリティを維持します。 しかし、ほとんどの場合、それを無視して通常の算術を使用していると見なすことができます。

誰もが知っている数字、_G_ があります。 _G_ を掛けることができます。 しかし、ECCの性質上、_G_ で割ることは事実上不可能です。 イーサリアムにおける公開鍵暗号技術の一般的な仕組みは、秘密鍵 _P<sub>priv</sub>_ を使用してトランザクションに署名し、それが公開鍵 _P<sub>pub</sub> = GP<sub>priv</sub>_ によって検証されるというものです。

アリスは2つの秘密鍵、_K<sub>priv</sub>_ と _V<sub>priv</sub>_ を作成します。 _K<sub>priv</sub>_ はステルスアドレスから資金を使用するために、_V<sub>priv</sub>_ はアリスに属するアドレスを表示するために使用されます。 アリスは次に公開鍵 _K<sub>pub</sub> = GK<sub>priv</sub>_ と _V<sub>pub</sub> = GV<sub>priv</sub>_ を公開します。

ビルは3番目の秘密鍵 _R<sub>priv</sub>_ を作成し、_R<sub>pub</sub> = GR<sub>priv</sub>_ を中央レジストリに公開します (ビルはアリスに送ることもできましたが、ここではキャロルが聞き耳を立てていると仮定します)。

ビルは _R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ を計算し、アリスもこれを知っていると期待します (下記で説明)。 この値は _S_ (共有シークレット) と呼ばれます。 これにより、ビルは公開鍵 _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_ を得ます。 この公開鍵から、彼はアドレスを計算し、好きなリソースをそこに送ることができます。 将来、アリスが勝った場合、ビルは彼女に _R<sub>priv</sub>_ を伝えて、リソースが自分からのものであることを証明できます。

アリスは _R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ を計算します。 これにより、彼女も同じ共有シークレット _S_ を得ます。 彼女は秘密鍵 _K<sub>priv</sub>_ を知っているので、_P<sub>priv</sub> = K<sub>priv</sub>+hash(S)_ を計算できます。 この鍵により、彼女は _P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)_ から得られるアドレスの資産にアクセスできます。

アリスがDaveの「世界征服キャンペーンサービス」に業務を委託できるように、別の閲覧用鍵があります。 アリスは、デイブに公開アドレスを知らせて、より多くの資金が利用可能になったときに通知してもらうことには前向きですが、デイブにキャンペーン資金を使われることは望んでいません。

閲覧と使用は別の鍵を使うため、アリスはデイブに _V<sub>priv</sub>_ を渡すことができます。 するとデイブは _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ を計算でき、それによって公開鍵 (_P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_) を得ることができます。 しかし、_K<sub>priv</sub>_ がなければ、デイブは秘密鍵を取得できません。

まとめると、これらが異なる参加者によって知られている値です。

| アリス                                                                       | 公開済み              | ビル                                                                        | デイブ                                                                         |                                                 |
| ------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------- |
| G                                                                         | G                 | G                                                                         | G                                                                           |                                                 |
| _K<sub>priv</sub>_                                                        | -                 | -                                                                         | -                                                                           |                                                 |
| _V<sub>priv</sub>_                                                        | -                 | -                                                                         | _V<sub>priv</sub>_                                                          |                                                 |
| _K<sub>pub</sub> = GK<sub>priv</sub>_                                     | _K<sub>pub</sub>_ | _K<sub>pub</sub>_                                                         | _K<sub>pub</sub>_                                                           |                                                 |
| _V<sub>pub</sub> = GV<sub>priv</sub>_                                     | _V<sub>pub</sub>_ | _V<sub>pub</sub>_                                                         | _V<sub>pub</sub>_                                                           |                                                 |
| -                                                                         | -                 | _R<sub>priv</sub>_                                                        | -                                                                           |                                                 |
| _R<sub>pub</sub>_                                                         | _R<sub>pub</sub>_ | _R<sub>pub</sub> = GR<sub>priv</sub>_                                     | _R<sub>pub</sub>_                                                           |                                                 |
| _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | -                 | _S = R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | _S = _R<sub>pub</sub>V<sub>priv</sub>_ = GR<sub>priv</sub>V<sub>priv</sub>_ |                                                 |
| _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_         | -                 | _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_         | _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_           |                                                 |
| _Address=f(P<sub>pub</sub>)_                           | -                 | _Address=f(P<sub>pub</sub>)_                           | _Address=f(P<sub>pub</sub>)_                             | _Address=f(P<sub>pub</sub>)_ |
| _P<sub>priv</sub> = K<sub>priv</sub>+hash(S)_          | -                 | -                                                                         | -                                                                           |                                                 |

## ステルスアドレスがうまくいかない場合 {#go-wrong}

_ブロックチェーン上に秘密はありません_。 ステルスアドレスはプライバシーを提供できますが、そのプライバシーはトラフィック分析に対して脆弱です。 簡単な例を挙げると、ビルがあるアドレスに資金を供給し、すぐにトランザクションを送信して _R<sub>pub</sub>_ 値を公開するとします。 アリスの _V<sub>priv</sub>_ がなければ、これがステルスアドレスであると確信することはできませんが、そうである可能性が高いです。 次に、そのアドレスからアリスのキャンペーン資金アドレスにすべてのETHを送金する別のトランザクションが見られます。 証明はできないかもしれませんが、ビルがアリスのキャンペーンに寄付した可能性が高いです。 キャロルは間違いなくそう思うでしょう。

ビルにとって、_R<sub>pub</sub>_ の公開とステルスアドレスへの資金供給を分離することは簡単です (異なる時間に、異なるアドレスから行います)。 しかし、それだけでは不十分です。 キャロルが探すパターンは、ビルがあるアドレスに資金を提供し、その後アリスのキャンペーン資金がそこから引き出すというものです。

1つの解決策は、アリスのキャンペーンが直接資金を引き出すのではなく、第三者への支払いに使用することです。 アリスのキャンペーンがデイブの世界征服キャンペーンサービスに10 ETHを送金した場合、キャロルはビルがデイブの顧客の1人に寄付したことしか知りません。 デイブに十分な顧客がいれば、キャロルはビルが彼女と競合するアリスに寄付したのか、それともキャロルが気にしていないアダム、アルバート、アビゲイルに寄付したのかを知ることはできません。 アリスは支払いにハッシュ化された値を含め、その後デイブにプリイメージを提供することで、それが自分の寄付であることを証明できます。 あるいは、前述のように、アリスがデイブに彼女の _V<sub>priv</sub>_ を渡せば、彼はすでに支払いが誰からのものかを知っています。

この解決策の主な問題は、その秘密がビルに利益をもたらす場合に、アリスが秘密を守ることを気にしなければならないという点です。 アリスは、ビルの友人であるボブも彼女に寄付するように、自分の評判を維持したいかもしれません。 しかし、彼女がビルを暴露することを気にしない可能性もあります。なぜなら、そうすれば彼はキャロルが勝った場合に何が起こるかを恐れるからです。 ビルは結果的にアリスをさらに支援することになるかもしれません。

### 複数のステルスレイヤーの使用 {#multi-layer}

ビルのプライバシーを保護するためにアリスに頼る代わりに、ビル自身がそれを行うことができます。 彼は架空の人物、ボブとベラのために複数のメタアドレスを生成できます。 ビルは次にETHをボブに送り、「ボブ」(実際にはビル) がそれをベラに送ります。 「ベラ」(これもビル) がそれをアリスに送ります。

キャロルは依然としてトラフィック分析を行い、ビルからボブ、ベラ、アリスへのパイプラインを見ることができます。 しかし、「ボブ」と「ベラ」が他の目的でETHを使用している場合、アリスがステルスアドレスから既知のキャンペーンアドレスにすぐに引き出したとしても、ビルがアリスに何かを転送したようには見えません。

## ステルスアドレスアプリケーションの作成 {#write-app}

この記事では、[GitHub](https://github.com/qbzzt/251022-stealth-addresses.git) で入手可能なステルスアドレスアプリケーションについて説明します。

### ツール {#tools}

使用できる[TypeScriptのステルスアドレスライブラリ](https://github.com/ScopeLift/stealth-address-sdk)があります。 しかし、暗号操作はCPUを集中的に使用することがあります。 私はそれらを[Rust](https://rust-lang.org/)のようなコンパイル言語で実装し、[WASM](https://webassembly.org/)を使用してブラウザでコードを実行することを好みます。

[Vite](https://vite.dev/)と[React](https://react.dev/)を使用します。 これらは業界標準のツールです。もし馴染みがない場合は、[このチュートリアル](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)を使用できます。 Viteを使用するには、Nodeが必要です。

### ステルスアドレスの動作を見る {#in-action}

1. 必要なツールをインストールします: [Rust](https://rust-lang.org/tools/install/) と [Node](https://nodejs.org/en/download)。

2. GitHubリポジトリをクローンします。

   ```sh
   git clone https://github.com/qbzzt/251022-stealth-addresses.git
   cd 251022-stealth-addresses
   ```

3. 前提条件をインストールし、Rustコードをコンパイルします。

   ```sh
   cd src/rust-wasm
   rustup target add wasm32-unknown-unknown   
   cargo install wasm-pack   
   wasm-pack build --target web
   ```

4. Webサーバーを起動します。

   ```sh
   cd ../..
   npm install
   npm run dev
   ```

5. [アプリケーション](http://localhost:5173/)にアクセスします。 このアプリケーションページには2つのフレームがあります。1つはアリスのユーザーインターフェース用、もう1つはビルのユーザーインターフェース用です。 2つのフレームは通信しません。便宜上、同じページにあるだけです。

6. アリスとして、**ステルス・メタアドレスを生成**をクリックします。 これにより、新しいステルスアドレスと対応する秘密鍵が表示されます。 ステルス・メタアドレスをクリップボードにコピーします。

7. ビルとして、新しいステルス・メタアドレスを貼り付け、**アドレスを生成**をクリックします。 これにより、アリスに資金を送るためのアドレスが表示されます。

8. アドレスとビルの公開鍵をコピーし、アリスのユーザーインターフェースの「ビルによって生成されたアドレスの秘密鍵」エリアに貼り付けます。 これらのフィールドに入力すると、そのアドレスの資産にアクセスするための秘密鍵が表示されます。

9. [オンライン計算機](https://iancoleman.net/ethereum-private-key-to-address/)を使用して、秘密鍵がアドレスに対応していることを確認できます。

### プログラムの仕組み {#how-the-program-works}

#### WASMコンポーネント {#wasm}

WASMにコンパイルされるソースコードは[Rust](https://rust-lang.org/)で書かれています。 [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs)で確認できます。 このコードは主に、JavaScriptコードと[`eth-stealth-addresses`ライブラリ](https://github.com/kassandraoftroy/eth-stealth-addresses)間のインターフェースです。

**`Cargo.toml`**

Rustにおける[`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html)は、JavaScriptの[`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)に類似しています。 パッケージ情報、依存関係の宣言などが含まれています。

```toml
[package]
name = "rust-wasm"
version = "0.1.0"
edition = "2024"

[dependencies]
eth-stealth-addresses = "0.1.0"
hex = "0.4.3"
wasm-bindgen = "0.2.104"
getrandom = { version = "0.2", features = ["js"] }
```

[`getrandom`](https://docs.rs/getrandom/latest/getrandom/)パッケージは、乱数を生成する必要があります。 それは純粋なアルゴリズム的手法では実行できません。エントロピーの源として物理的なプロセスへのアクセスが必要です。 この定義は、実行中のブラウザに問い合わせることで、そのエントロピーを取得することを指定します。

```toml
console_error_panic_hook = "0.1.7"
```

[このライブラリ](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/)は、WASMコードがパニックを起こして続行できなくなったときに、より意味のあるエラーメッセージを提供します。

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

WASMコードを生成するために必要な出力タイプです。

**`lib.rs`**

これが実際のRustコードです。

```rust
use wasm_bindgen::prelude::*;
```

RustからWASMパッケージを作成するための定義です。 それらは[ここ](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/index.html)で文書化されています。

```rust
use eth_stealth_addresses::{
    generate_stealth_meta_address,
    generate_stealth_address,
    compute_stealth_key
};
```

[`eth-stealth-addresses` ライブラリ](https://github.com/kassandraoftroy/eth-stealth-addresses)から必要な関数です。

```rust
use hex::{decode,encode};
```

Rustは通常、値にバイト[配列](https://doc.rust-lang.org/std/primitive.array.html) (`[u8; <size>]`) を使用します。 しかし、JavaScriptでは、通常16進数文字列を使用します。 [`hex`ライブラリ](https://docs.rs/hex/latest/hex/)は、ある表現から別の表現へと変換してくれます。

```rust
#[wasm_bindgen]
```

JavaScriptからこの関数を呼び出すことができるように、WASMバインディングを生成します。

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

複数のフィールドを持つオブジェクトを返す最も簡単な方法は、JSON文字列を返すことです。

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

[`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html)は3つのフィールドを返します：

- メタアドレス(_K<sub>pub</sub>_ と _V<sub>pub</sub>_)
- 閲覧用秘密鍵(_V<sub>priv</sub>_)
- 支払い用秘密鍵(_K<sub>priv</sub>_)

[タプル](https://doc.rust-lang.org/std/primitive.tuple.html)構文を使用すると、これらの値を再度分離できます。

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

[`format!`](https://doc.rust-lang.org/std/fmt/index.html)マクロを使用して、JSONエンコードされた文字列を生成します。 [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html)を使用して、配列を16進数文字列に変更します。

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

この関数は、(JavaScriptから提供された) 16進数文字列をバイト配列に変換します。 JavaScriptコードから提供された値を解析するために使用します。 この関数は、Rustが配列とベクターをどのように扱うかによって複雑になっています。

`<const N: usize>`という式は[ジェネリック](https://doc.rust-lang.org/book/ch10-01-syntax.html)と呼ばれます。 `N` は返される配列の長さを制御するパラメータです。 この関数は実際には`str_to_array::<n>`として呼び出され、`n`は配列の長さです。

戻り値は `Option<[u8; N]>` であり、これは返される配列が[オプショナル](https://doc.rust-lang.org/std/option/)であることを意味します。 これは、失敗する可能性のある関数に対するRustの典型的なパターンです。

例えば、`str_to_array::10("bad060a7")`を呼び出すと、関数は10個の値を持つ配列を返すはずですが、入力は4バイトしかありません。 関数は失敗する必要があり、`None`を返すことでそれを行います。 `str_to_array::4("bad060a7")`の戻り値は `Some<[0xba, 0xd0, 0x60, 0xa7]>` になります。

```rust
    // decodeはResult<Vec<u8>, _>を返す
    let vec = decode(s).ok()?;
```

[`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html)関数は`Result<Vec<u8>, FromHexError>`を返します。 [`Result`](https://doc.rust-lang.org/std/result/)型には、成功した結果 (`Ok(value)`) またはエラー (`Err(error)`) のいずれかが含まれます。

`.ok()`メソッドは`Result`を`Option`に変換し、その値は成功した場合は`Ok()`の値、そうでなければ`None`になります。 最後に、[疑問符演算子](https://doc.rust-lang.org/std/option/#the-question-mark-operator-)は、`Option`が空の場合に現在の関数を中止し、`None`を返します。 そうでなければ、値をアンラップしてそれを返します (この場合、`vec`に値を割り当てます)。

これは奇妙で複雑なエラー処理方法に見えるかもしれませんが、`Result`と`Option`は、すべてのエラーが何らかの方法で処理されることを保証します。

```rust
    if vec.len() != N { return None; }
```

バイト数が正しくない場合は失敗であり、`None`を返します。

```rust
    // try_intoはvecを消費し、[u8; N]を作成しようと試みる
    let array: [u8; N] = vec.try_into().ok()?;
```

Rustには2つの配列型があります。 [配列](https://doc.rust-lang.org/std/primitive.array.html)は固定サイズです。 [ベクター](https://doc.rust-lang.org/std/vec/index.html)は大きくなったり小さくなったりできます。 `hex::decode`はベクターを返しますが、`eth_stealth_addresses`ライブラリは配列を受け取ることを期待しています。 [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods)は、値を別の型、たとえばベクターを配列に変換します。

```rust
    Some(array)
}
```

Rustでは、関数の最後で値を返す際に[`return`](https://doc.rust-lang.org/std/keyword.return.html)キーワードを使用する必要はありません。

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

この関数は、_V<sub>pub</sub>_ と _K<sub>pub</sub>_ の両方を含む公開メタアドレスを受け取ります。 これは、ステルスアドレス、公開する公開鍵 (_R<sub>pub</sub>_)、および公開されたアドレスのうちどれがアリスに属する可能性があるかを特定する速度を上げる1バイトのスキャン値を返します。

スキャン値は共有シークレット (_S = GR<sub>priv</sub>V<sub>priv</sub>_) の一部です。 この値はアリスが利用でき、これを確認する方が _f(K<sub>pub</sub>+G\*hash(S))_ が公開されたアドレスと等しいかどうかを確認するよりもはるかに高速です。

```rust
    let (address, r_pub, scan) = 
        generate_stealth_address(&str_to_array::<66>(stealth_address)?);
```

ライブラリの[`generate_stealth_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_address.html)を使用します。

```rust
    format!("{{\"address\":\"{}\",\"rPub\":\"{}\",\"scan\":\"{}\"}}",
        encode(address),
        encode(r_pub),
        encode(&[scan])
    ).into()
}
```

JSONエンコードされた出力文字列を準備します。

```rust
#[wasm_bindgen]
pub fn wasm_compute_stealth_key(
    address: &str, 
    bill_pub_key: &str, 
    view_private_key: &str,
    spend_private_key: &str    
) -> Option<String> {
    .
    .
    .
}
```

この関数は、ライブラリの[`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html)を使用して、アドレスから引き出すための秘密鍵(_R<sub>priv</sub>_)を計算します。 この計算には以下の値が必要です：

- アドレス (_Address=f(P<sub>pub</sub>)_)
- ビルによって生成された公開鍵(_R<sub>pub</sub>_)
- 閲覧用秘密鍵(_V<sub>priv</sub>_)
- 支払い用秘密鍵(_K<sub>priv</sub>_)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html)は、WASMコードが初期化されるときに関数が実行されることを指定します。

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

このコードは、パニック出力をJavaScriptコンソールに送信することを指定します。 動作を確認するには、アプリケーションを使用し、ビルに無効なメタアドレスを与えます (16進数の1桁を変更するだけ)。 JavaScriptコンソールに次のエラーが表示されます：

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

続いてスタックトレースが表示されます。 次に、ビルに有効なメタアドレスを与え、アリスには無効なアドレスまたは無効な公開鍵のいずれかを与えます。 次のエラーが表示されます：

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

再び、スタックトレースが続きます。

#### ユーザーインターフェース {#ui}

ユーザーインターフェースは[React](https://react.dev/)を使用して書かれ、[Vite](https://vite.dev/)によって提供されます。 これらについては、[このチュートリアル](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)で学ぶことができます。 ここでは、ブロックチェーンやウォレットと直接対話しないため、[WAGMI](https://wagmi.sh/)は必要ありません。

ユーザーインターフェースで唯一自明でない部分は、WASMの接続性です。 その仕組みは次のとおりです。

**`vite.config.js`**

このファイルには[Viteの設定](https://vite.dev/config/)が含まれています。

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
})
```

2つのViteプラグインが必要です: [react](https://www.npmjs.com/package/@vitejs/plugin-react)と[wasm](https://github.com/Menci/vite-plugin-wasm#readme)。

**`App.jsx`**

このファイルは、アプリケーションのメインコンポーネントです。 これは、`Alice`と`Bill`という2つのコンポーネントを含むコンテナで、これらのユーザーのユーザーインターフェースです。 WASMに関連する部分は初期化コードです。

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

[`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/)を使用すると、ここで使用する2つのファイルが作成されます。1つは実際のコードを含むwasmファイル (ここでは`src/rust-wasm/pkg/rust_wasm_bg.wasm`)、もう1つはそれを使用するための定義を含むJavaScriptファイル (ここでは`src/rust_wasm/pkg/rust_wasm.js`)です。 そのJavaScriptファイルのデフォルトエクスポートは、WASMを初期化するために実行する必要があるコードです。

```jsx
function App() {
    .
    .
    .
  useEffect(() => {
    const loadWasm = async () => {
      try {
        await init();
        setWasmReady(true)
      } catch (err) {
        console.error('Error loading wasm:', err)
        alert("Wasm error: " + err)
      }
    }

    loadWasm()
    }, []
  )
```

[`useEffect`フック](https://react.dev/reference/react/useEffect)を使用すると、状態変数が変更されたときに実行される関数を指定できます。 ここでは、状態変数のリストが空 (`[]`) なので、この関数はページが読み込まれたときに一度だけ実行されます。

エフェクト関数はすぐに戻る必要があります。 WASM `init` (これは`.wasm`ファイルをロードする必要があるため時間がかかります) のような非同期コードを使用するために、内部で[`async`](https://en.wikipedia.org/wiki/Async/await)関数を定義し、`await`なしで実行します。

**`Bill.jsx`**

これはビルのユーザーインターフェースです。 アリスから提供されたステルス・メタアドレスに基づいてアドレスを作成するという単一のアクションがあります。

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

デフォルトのエクスポートに加えて、`wasm-pack`によって生成されたJavaScriptコードは、WASMコードのすべての関数に対応する関数をエクスポートします。

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

`wasm-pack`によって作成されたJavaScriptファイルからエクスポートされた関数を呼び出すだけで、WASM関数を呼び出すことができます。

**`Alice.jsx`**

`Alice.jsx`のコードも同様ですが、アリスには2つのアクションがあります。

- メタアドレスを生成する
- ビルによって公開されたアドレスの秘密鍵を取得する

## 結論 {#conclusion}

ステルスアドレスは万能薬ではありません。[正しく使用する](#go-wrong)必要があります。 しかし、正しく使用すれば、公開ブロックチェーン上でプライバシーを確保することができます。

[私の他の作品はこちらでご覧いただけます](https://cryptodocguy.pro/).