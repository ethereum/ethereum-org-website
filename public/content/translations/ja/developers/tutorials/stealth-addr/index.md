---
title: "ステルス・アドレスの使用"
description: "ステルス・アドレスを使用すると、ユーザーは匿名で資産を送金できます。この記事を読むと、ステルス・アドレスとは何か、どのように機能するのかを説明し、匿名性を保ちながらステルス・アドレスを使用する方法を理解し、ステルス・アドレスを使用するウェブベースのアプリケーションを作成できるようになります。"
author: "オリ・ポメランツ"
tags:
  - ステルス・アドレス
  - プライバシー
  - 暗号技術
  - rust
  - wasm
skill: intermediate
breadcrumb: "ステルス・アドレス"
published: 2025-11-30
lang: ja
sidebarDepth: 3
---

あなたはビルだとします。理由はさておき、あなたは「世界女王アリス」のキャンペーンに寄付し、アリスが勝ったときに報酬をもらえるように、自分が寄付したことをアリスに知ってもらいたいと考えています。残念ながら、彼女の勝利は保証されていません。「太陽系女帝キャロル」という競合するキャンペーンがあります。もしキャロルが勝って、あなたがアリスに寄付したことを知ったら、あなたはトラブルに巻き込まれるでしょう。そのため、あなたのアカウントからアリスのアカウントへ単に200 ETHを送金することはできません。

[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564)にその解決策があります。このERCでは、匿名での送金に[ステルス・アドレス](https://nerolation.github.io/stealth-utils)を使用する方法を説明しています。

**警告**: ステルス・アドレスの背後にある暗号技術は、私たちの知る限り健全です。しかし、潜在的なサイドチャネル攻撃が存在します。[以下](#go-wrong)で、このリスクを軽減するためにできることについて説明します。

## ステルス・アドレスの仕組み {#how}

この記事では、ステルス・アドレスについて2つの方法で説明を試みます。1つ目は[その使用方法](#how-use)です。この記事の残りの部分を理解するには、この部分だけで十分です。次に、[その背後にある数学的な説明](#how-math)があります。暗号技術に興味がある場合は、この部分も読んでください。

### シンプルなバージョン（ステルス・アドレスの使用方法） {#how-use}

アリスは2つの秘密鍵を作成し、対応する公開鍵（これらを組み合わせて1つの2倍の長さのメタアドレスにすることができます）を公開します。ビルも秘密鍵を作成し、対応する公開鍵を公開します。

一方の当事者の公開鍵ともう一方の当事者の秘密鍵を使用することで、アリスとビルだけが知っている共有シークレットを導出できます（公開鍵だけから導出することはできません）。この共有シークレットを使用して、ビルはステルス・アドレスを取得し、そこに資産を送金できます。

アリスも共有シークレットからアドレスを取得しますが、彼女は自分が公開した公開鍵に対応する秘密鍵を知っているため、そのアドレスから引き出すための秘密鍵も取得できます。

### 数学的な説明（なぜステルス・アドレスはこのように機能するのか） {#how-math}

標準的なステルス・アドレスは、同じレベルのセキュリティを維持しながら、より少ない鍵ビット数でより良いパフォーマンスを得るために[楕円曲線暗号（ECC）](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor)を使用します。しかし、ほとんどの場合、それを無視して通常の算術を使用していると見なすことができます。

誰もが知っている数字、*G*があります。*G*を掛けることはできます。しかし、ECCの性質上、*G*で割ることは事実上不可能です。イーサリアムにおける公開鍵暗号技術の一般的な仕組みは、秘密鍵*P<sub>priv</sub>*を使用してトランザクションに署名し、それが公開鍵*P<sub>pub</sub> = GP<sub>priv</sub>*によって検証されるというものです。

アリスは2つの秘密鍵、*K<sub>priv</sub>*と*V<sub>priv</sub>*を作成します。*K<sub>priv</sub>*はステルス・アドレスからお金を支払うために使用され、*V<sub>priv</sub>*はアリスに属するアドレスを表示するために使用されます。その後、アリスは公開鍵*K<sub>pub</sub> = GK<sub>priv</sub>*と*V<sub>pub</sub> = GV<sub>priv</sub>*を公開します。

ビルは3つ目の秘密鍵*R<sub>priv</sub>*を作成し、*R<sub>pub</sub> = GR<sub>priv</sub>*を中央レジストリに公開します（ビルはそれをアリスに送ることもできましたが、キャロルが盗聴していると仮定します）。

ビルは*R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>*を計算し、アリスもこれを知っていると期待します（後述）。この値は共有シークレット*S*と呼ばれます。これにより、ビルは公開鍵*P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*を取得します。この公開鍵から、彼はアドレスを計算し、そこに任意の資産を送金できます。将来、アリスが勝った場合、ビルは彼女に*R<sub>priv</sub>*を伝えることで、その資産が自分からのものであることを証明できます。

アリスは*R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>*を計算します。これにより、彼女は同じ共有シークレット*S*を取得します。彼女は秘密鍵*K<sub>priv</sub>*を知っているため、*P<sub>priv</sub> = K<sub>priv</sub>+hash(S)*を計算できます。この鍵により、彼女は*P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)*から得られるアドレス内の資産にアクセスできます。

アリスが「デイブの世界征服キャンペーンサービス」に下請けに出せるように、別々の表示鍵（viewing key）を用意しています。アリスはデイブに公開アドレスを知らせ、より多くのお金が利用可能になったときに彼女に知らせてもらうことには同意しますが、彼にキャンペーン資金を使わせたくはありません。

表示と支払いには別々の鍵が使用されるため、アリスはデイブに*V<sub>priv</sub>*を渡すことができます。そうすれば、デイブは*S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>*を計算し、その方法で公開鍵（*P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*）を取得できます。しかし、*K<sub>priv</sub>*がなければ、デイブは秘密鍵を取得できません。

要約すると、これらがさまざまな参加者によって知られている値です。

| アリス | 公開済み | ビル | デイブ |
| - | - | - | - |
| G | G | G | G |
| *K<sub>priv</sub>* | - | - | - | 
| *V<sub>priv</sub>* | - | - | *V<sub>priv</sub>* |
| *K<sub>pub</sub> = GK<sub>priv</sub>* | *K<sub>pub</sub>* | *K<sub>pub</sub>* | *K<sub>pub</sub>* |
| *V<sub>pub</sub> = GV<sub>priv</sub>* | *V<sub>pub</sub>* | *V<sub>pub</sub>* | *V<sub>pub</sub>* |
| - | - | *R<sub>priv</sub>* | - |
| *R<sub>pub</sub>* | *R<sub>pub</sub>* | *R<sub>pub</sub> = GR<sub>priv</sub>* | *R<sub>pub</sub>* |
| *S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>* | - | *S = R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>* | *S = *R<sub>pub</sub>V<sub>priv</sub>* = GR<sub>priv</sub>V<sub>priv</sub>* |
| *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* | - | *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* | *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* |
| *Address=f(P<sub>pub</sub>)* | - | *Address=f(P<sub>pub</sub>)* | *Address=f(P<sub>pub</sub>)* | *Address=f(P<sub>pub</sub>)*
| *P<sub>priv</sub> = K<sub>priv</sub>+hash(S)* | - | - | - |

## ステルス・アドレスがうまくいかない場合 {#go-wrong}

*ブロックチェーン上に秘密はありません*。ステルス・アドレスはプライバシーを提供できますが、そのプライバシーはトラフィック分析の影響を受けやすいです。些細な例を挙げると、ビルがあるアドレスに資金を提供し、直後に*R<sub>pub</sub>*値を公開するトランザクションを送信したと想像してください。アリスの*V<sub>priv</sub>*がなければ、これがステルス・アドレスであると確信することはできませんが、そう考えるのが自然です。その後、そのアドレスからアリスのキャンペーン資金アドレスへすべてのETHを送金する別のトランザクションが見られます。証明はできないかもしれませんが、ビルがアリスのキャンペーンに寄付した可能性が高いです。キャロルは間違いなくそう考えるでしょう。

ビルにとって、*R<sub>pub</sub>*の公開とステルス・アドレスへの資金提供を分けることは簡単です（異なる時間に、異なるアドレスから行う）。しかし、それだけでは不十分です。キャロルが探しているパターンは、ビルがアドレスに資金を提供し、その後アリスのキャンペーン資金がそこから引き出すというものです。

1つの解決策は、アリスのキャンペーンが直接お金を引き出すのではなく、それを使用して第三者に支払うことです。アリスのキャンペーンがデイブの世界征服キャンペーンサービスに10 ETHを送金した場合、キャロルはビルがデイブの顧客の1人に寄付したことしかわかりません。デイブに十分な顧客がいれば、キャロルはビルが自分と競合するアリスに寄付したのか、それともキャロルが気にしないアダム、アルバート、アビゲイルに寄付したのかを知ることはできません。アリスは支払いと一緒にハッシュ値を含め、後でデイブにプリイメージを提供することで、それが自分の寄付であることを証明できます。あるいは、上記のように、アリスがデイブに*V<sub>priv</sub>*を渡せば、彼はすでに誰からの支払いかを知っています。

この解決策の主な問題は、その秘密性がビルに利益をもたらす場合に、アリスが秘密性を気にかける必要があることです。アリスは、ビルの友人であるボブも彼女に寄付してくれるように、自分の評判を維持したいと思うかもしれません。しかし、彼女がビルを暴露することを気にしない可能性もあります。なぜなら、そうすればビルはキャロルが勝った場合に何が起こるかを恐れるようになるからです。ビルは最終的にアリスにさらに多くの支援を提供することになるかもしれません。

### 複数のステルスレイヤーの使用 {#multi-layer}

ビルのプライバシーを保護するためにアリスに頼る代わりに、ビルは自分自身でそれを行うことができます。彼は架空の人物、ボブとベラのために複数のメタアドレスを生成できます。その後、ビルはボブにETHを送金し、「ボブ」（実際にはビル）はそれをベラに送金します。「ベラ」（これもビル）はそれをアリスに送金します。

キャロルは依然としてトラフィック分析を行い、ビルからボブ、ベラ、アリスへのパイプラインを見ることができます。しかし、「ボブ」と「ベラ」が他の目的にもETHを使用している場合、アリスがステルス・アドレスから既知のキャンペーンアドレスへすぐに引き出したとしても、ビルがアリスに何かを送金したようには見えません。

## ステルス・アドレスアプリケーションの作成 {#write-app}

この記事では、[GitHubで利用可能な](https://github.com/qbzzt/251022-stealth-addresses.git)ステルス・アドレスアプリケーションについて説明します。

### ツール {#tools}

使用できる[TypeScriptのステルス・アドレスライブラリ](https://github.com/ScopeLift/stealth-address-sdk)があります。しかし、暗号化操作はCPUに負荷がかかる可能性があります。私はそれらを[Rust](https://rust-lang.org/)のようなコンパイル言語で実装し、ブラウザでコードを実行するために[WASM](https://webassembly.org/)を使用することを好みます。

[Vite](https://vite.dev/)と[React](https://react.dev/)を使用します。これらは業界標準のツールです。もし馴染みがない場合は、[このチュートリアル](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)を使用できます。Viteを使用するには、Nodeが必要です。

### ステルス・アドレスの動作を確認する {#in-action}

1. 必要なツールをインストールします: [Rust](https://rust-lang.org/tools/install/)と[Node](https://nodejs.org/en/download)。

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

4. ウェブサーバーを起動します。

   ```sh
   cd ../..
   npm install
   npm run dev
   ```

5. [アプリケーション](http://localhost:5173/)にアクセスします。このアプリケーションページには2つのフレームがあります。1つはアリスのユーザーインターフェース用で、もう1つはビル用です。2つのフレームは通信しません。便宜上同じページにあるだけです。

6. アリスとして、**Generate a Stealth Meta-Address**（ステルスメタアドレスの生成）をクリックします。これにより、新しいステルス・アドレスと対応する秘密鍵が表示されます。ステルスメタアドレスをクリップボードにコピーします。

7. ビルとして、新しいステルスメタアドレスを貼り付け、**Generate an address**（アドレスの生成）をクリックします。これにより、アリスのために資金を提供するアドレスが得られます。

8. アドレスとビルの公開鍵をコピーし、アリスのユーザーインターフェースの「Private key for address generated by Bill」（ビルによって生成されたアドレスの秘密鍵）エリアに貼り付けます。これらのフィールドに入力すると、そのアドレスの資産にアクセスするための秘密鍵が表示されます。

9. [オンライン計算機](https://iancoleman.net/ethereum-private-key-to-address/)を使用して、秘密鍵がアドレスに対応していることを確認できます。

### プログラムの仕組み {#how-the-program-works}

#### WASMコンポーネント {#wasm}

WASMにコンパイルされるソースコードは[Rust](https://rust-lang.org/)で書かれています。[`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs)で確認できます。このコードは主に、JavaScriptコードと[`eth-stealth-addresses`ライブラリ](https://github.com/kassandraoftroy/eth-stealth-addresses)の間のインターフェースです。

**`Cargo.toml`**

Rustの[`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html)は、JavaScriptの[`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)に似ています。パッケージ情報、依存関係の宣言などが含まれています。

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

[`getrandom`](https://docs.rs/getrandom/latest/getrandom/)パッケージはランダムな値を生成する必要があります。それは純粋なアルゴリズムの手段では実行できません。エントロピーの源として物理的プロセスへのアクセスが必要です。この定義は、実行中のブラウザに要求することでそのエントロピーを取得することを指定しています。

```toml
console_error_panic_hook = "0.1.7"
```

[このライブラリ](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/)は、WASMコードがパニックを起こして続行できない場合に、より意味のあるエラーメッセージを提供します。

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

RustからWASMパッケージを作成するための定義です。これらは[こちら](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/index.html)に文書化されています。

```rust 
use eth_stealth_addresses::{
    generate_stealth_meta_address,
    generate_stealth_address,
    compute_stealth_key
};
```

[`eth-stealth-addresses`ライブラリ](https://github.com/kassandraoftroy/eth-stealth-addresses)から必要な関数です。

```rust
use hex::{decode,encode};
```

Rustは通常、値にバイト[配列](https://doc.rust-lang.org/std/primitive.array.html)（`[u8; <size>]`）を使用します。しかし、JavaScriptでは通常、16進数の文字列を使用します。[`hex`ライブラリ](https://docs.rs/hex/latest/hex/)は、ある表現から別の表現への変換を行ってくれます。

```rust
#[wasm_bindgen]
```

JavaScriptからこの関数を呼び出せるようにWASMバインディングを生成します。

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

複数のフィールドを持つオブジェクトを返す最も簡単な方法は、JSON文字列を返すことです。

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

[`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html)は3つのフィールドを返します。

- メタアドレス（*K<sub>pub</sub>*と*V<sub>pub</sub>*）
- 表示用秘密鍵（*V<sub>priv</sub>*）
- 支払い用秘密鍵（*K<sub>priv</sub>*）

[タプル](https://doc.rust-lang.org/std/primitive.tuple.html)構文を使用すると、これらの値を再び分離できます。

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

[`format!`](https://doc.rust-lang.org/std/fmt/index.html)マクロを使用して、JSONエンコードされた文字列を生成します。[`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html)を使用して、配列を16進数の文字列に変更します。

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

この関数は、（JavaScriptによって提供された）16進数の文字列をバイト配列に変換します。JavaScriptコードによって提供された値を解析するために使用します。この関数は、Rustが配列とベクターを処理する方法のために複雑になっています。

`<const N: usize>`式は[ジェネリック](https://doc.rust-lang.org/book/ch10-01-syntax.html)と呼ばれます。`N`は、返される配列の長さを制御するパラメータです。この関数は実際には`str_to_array::<n>`と呼ばれ、ここで`n`は配列の長さです。

戻り値は`Option<[u8; N]>`であり、これは返される配列が[オプショナル](https://doc.rust-lang.org/std/option/)であることを意味します。これは、失敗する可能性のある関数に対するRustの典型的なパターンです。

たとえば、`str_to_array::10("bad060a7")`を呼び出した場合、関数は10個の値の配列を返すはずですが、入力は4バイトしかありません。関数は失敗する必要があり、`None`を返すことで失敗します。`str_to_array::4("bad060a7")`の戻り値は`Some<[0xba, 0xd0, 0x60, 0xa7]>`になります。

```rust
    // decodeはResult<Vec<u8>, _>を返す
    let vec = decode(s).ok()?;
```

[`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html)関数は`Result<Vec<u8>, FromHexError>`を返します。[`Result`](https://doc.rust-lang.org/std/result/)型は、成功した結果（`Ok(value)`）またはエラー（`Err(error)`）のいずれかを含めることができます。

`.ok()`メソッドは、`Result`を`Option`に変換します。その値は、成功した場合は`Ok()`の値、そうでない場合は`None`になります。最後に、[クエスチョンマーク演算子](https://doc.rust-lang.org/std/option/#the-question-mark-operator-)は、`Option`が空の場合、現在の関数を中止して`None`を返します。それ以外の場合は、値をアンラップしてそれを返します（この場合、`vec`に値を割り当てます）。

これはエラーを処理するための奇妙に複雑な方法のように見えますが、`Result`と`Option`は、すべてのエラーが何らかの形で確実に処理されるようにします。

```rust
    if vec.len() != N { return None; }
```

バイト数が正しくない場合は失敗であり、`None`を返します。

```rust
    // try_intoはvecを消費し、[u8; N]の作成を試みる
    let array: [u8; N] = vec.try_into().ok()?;
```

Rustには2つの配列タイプがあります。[配列](https://doc.rust-lang.org/std/primitive.array.html)は固定サイズです。[ベクター](https://doc.rust-lang.org/std/vec/index.html)は拡大および縮小できます。`hex::decode`はベクターを返しますが、`eth_stealth_addresses`ライブラリは配列を受け取ることを求めています。[`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods)は、値を別の型（たとえば、ベクターから配列）に変換します。

```rust
    Some(array)
}
```

Rustでは、関数の最後で値を返すときに[`return`](https://doc.rust-lang.org/std/keyword.return.html)キーワードを使用する必要はありません。

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

この関数は、*V<sub>pub</sub>*と*K<sub>pub</sub>*の両方を含む公開メタアドレスを受け取ります。ステルス・アドレス、公開する公開鍵（*R<sub>pub</sub>*）、および公開されたアドレスのどれがアリスに属している可能性があるかの識別を高速化する1バイトのスキャン値を返します。

スキャン値は共有シークレット（*S = GR<sub>priv</sub>V<sub>priv</sub>*）の一部です。この値はアリスが利用でき、これを確認することは、*f(K<sub>pub</sub>+G\*hash(S))*が公開されたアドレスと等しいかどうかを確認するよりもはるかに高速です。

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

この関数は、ライブラリの[`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html)を使用して、アドレスから引き出すための秘密鍵（*R<sub>priv</sub>*）を計算します。この計算には以下の値が必要です。

- アドレス（*Address=f(P<sub>pub</sub>)*）
- ビルによって生成された公開鍵（*R<sub>pub</sub>*）
- 表示用秘密鍵（*V<sub>priv</sub>*）
- 支払い用秘密鍵（*K<sub>priv</sub>*）

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html)は、WASMコードが初期化されるときにこの関数が実行されることを指定します。

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

このコードは、パニック出力がJavaScriptコンソールに送信されることを指定します。実際の動作を確認するには、アプリケーションを使用して、ビルに無効なメタアドレスを与えます（16進数の数字を1つ変更するだけです）。JavaScriptコンソールに次のエラーが表示されます。

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

その後にスタックトレースが続きます。次に、ビルに有効なメタアドレスを与え、アリスに無効なアドレスまたは無効な公開鍵のいずれかを与えます。次のエラーが表示されます。

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

ここでも、スタックトレースが続きます。

#### ユーザーインターフェース {#ui}

ユーザーインターフェースは[React](https://react.dev/)を使用して書かれており、[Vite](https://vite.dev/)によって提供されます。[このチュートリアル](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)を使用してそれらについて学ぶことができます。ここではブロックチェーンやウォレットと直接やり取りしないため、[Wagmi](https://wagmi.sh/)は必要ありません。

ユーザーインターフェースの唯一の自明ではない部分は、WASMの接続性です。その仕組みは次のとおりです。

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

このファイルはアプリケーションのメインコンポーネントです。これは、それらのユーザーのユーザーインターフェースである`Alice`と`Bill`の2つのコンポーネントを含むコンテナです。WASMに関連する部分は初期化コードです。

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

[`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/)を使用すると、ここで使用する2つのファイルが作成されます。実際のコードを含むwasmファイル（ここでは`src/rust-wasm/pkg/rust_wasm_bg.wasm`）と、それを使用するための定義を含むJavaScriptファイル（ここでは`src/rust_wasm/pkg/rust_wasm.js`）です。そのJavaScriptファイルのデフォルトエクスポートは、WASMを初期化するために実行する必要があるコードです。

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

[`useEffect`フック](https://react.dev/reference/react/useEffect)を使用すると、状態変数が変更されたときに実行される関数を指定できます。ここでは、状態変数のリストが空（`[]`）であるため、この関数はページが読み込まれたときに1回だけ実行されます。

エフェクト関数はすぐに戻る必要があります。WASMの`init`（`.wasm`ファイルを読み込む必要があるため時間がかかります）などの非同期コードを使用するには、内部の[`async`](https://en.wikipedia.org/wiki/Async/await)関数を定義し、`await`なしで実行します。

**`Bill.jsx`**

これはビルのユーザーインターフェースです。アリスによって提供されたステルスメタアドレスに基づいてアドレスを作成するという、単一のアクションがあります。

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

デフォルトエクスポートに加えて、`wasm-pack`によって生成されたJavaScriptコードは、WASMコード内のすべての関数に対して関数をエクスポートします。

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

WASM関数を呼び出すには、`wasm-pack`によって作成されたJavaScriptファイルによってエクスポートされた関数を呼び出すだけです。

**`Alice.jsx`**

`Alice.jsx`のコードも同様ですが、アリスには2つのアクションがある点が異なります。

- メタアドレスの生成
- ビルによって公開されたアドレスの秘密鍵の取得

## 結論 {#conclusion}

ステルス・アドレスは万能薬ではありません。[正しく使用する](#go-wrong)必要があります。しかし、正しく使用すれば、パブリックブロックチェーン上でプライバシーを実現できます。

[私の他の作品についてはこちらをご覧ください](https://cryptodocguy.pro/)。