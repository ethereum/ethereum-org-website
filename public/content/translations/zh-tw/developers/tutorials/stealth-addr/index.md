---
title: "使用隱匿地址"
description: "隱匿地址讓使用者能夠匿名轉移資產。 閱讀本文後，您將能夠：解釋什麼是隱匿地址及其運作方式、瞭解如何以維護匿名性的方式使用隱匿地址，以及編寫使用隱匿地址的網頁應用程式。"
author: Ori Pomerantz
tags: [ "隱匿地址", "隱私", "密碼學", "rust", "wasm" ]
skill: intermediate
published: 2025-11-30
lang: zh-tw
sidebarDepth: 3
---

您是 Bill。 我們不深入探討原因，假設您想捐款給「Alice 競選世界女王」活動，並希望 Alice 知道您捐了款，以便在她勝選後給予您酬勞。 可惜，她不保證會勝選。 有個競爭活動：「Carol 競選太陽系女皇」。 如果 Carol 勝選，而且她發現您捐款給 Alice，您就會有麻煩了。 所以您不能直接從您的帳戶轉 200 ETH 給 Alice。

[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) 提供了這個問題的解決辦法。 此 ERC 說明了如何使用 [隱匿地址](https://nerolation.github.io/stealth-utils) 進行匿名轉帳。

**警告**：據我們所知，隱匿地址背後的密碼學是健全的。 不過，仍有潛在的旁路攻擊。 您可以在[下方](#go-wrong)看到如何降低此風險。

## 隱匿地址的運作方式 {#how}

本文將會以兩種方式說明隱匿地址。 第一種是[如何使用](#how-use)。 這部分就足以理解本文的其餘內容。 接著會[說明其背後的數學原理](#how-math)。 如果您對密碼學感興趣，也請閱讀這部分。

### 簡易版本（如何使用隱匿地址） {#how-use}

Alice 建立了兩把私鑰，並發布了相應的公鑰（可合併成單一雙倍長度的中繼地址）。 Bill 也建立了一把私鑰，並發布了相應的公鑰。

使用其中一方的公鑰和另一方的私鑰，您可以推導出只有 Alice 和 Bill 知道的共享密鑰（無法僅從公鑰推導）。 Bill 可透過此共享密鑰取得隱匿地址，並將資產傳送至該地址。

Alice 也能從共享密鑰取得地址，但由於她知道自己所發布公鑰的私鑰，她也能取得讓她從該地址提款的私鑰。

### 數學原理（隱匿地址為何如此運作） {#how-math}

標準隱匿地址使用[橢圓曲線密碼學 (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor) 來以較少的金鑰位元達到更佳的效能，同時維持相同等級的安全性。 但在大多數情況下，我們可以忽略這點，假裝我們使用的是常規算術。

有一個大家都知道的數字 _G_。 您可以將其乘以 _G_。 但由於橢圓曲線密碼學 (ECC) 的性質，幾乎不可能將其除以 _G_。 以太坊中公鑰密碼學的一般運作方式是，您可以使用私鑰 _P<sub>priv</sub>_ 來簽署交易，然後由公鑰 _P<sub>pub</sub> = GP<sub>priv</sub>_ 進行驗證。

Alice 建立兩把私鑰：_K<sub>priv</sub>_ 和 _V<sub>priv</sub>_。 _K<sub>priv</sub>_ 將用來從隱匿地址花費金錢，而 _V<sub>priv</sub>_ 則用來檢視屬於 Alice 的地址。 Alice 接著發布公鑰：_K<sub>pub</sub> = GK<sub>priv</sub>_ 和 _V<sub>pub</sub> = GV<sub>priv</sub>_

Bill 建立了第三把私鑰 _R<sub>priv</sub>_，並將 _R<sub>pub</sub> = GR<sub>priv</sub>_ 發布到中央註冊處（Bill 也可以把它傳送給 Alice，但我們假設 Carol 正在竊聽）。

Bill 計算 _R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_，他預期 Alice 也會知道（如下文說明）。 此值稱為 _S_，也就是共享密鑰。 這給了 Bill 一把公鑰：_P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_。 他可以從這把公鑰計算出一個地址，並將任何他想要的資源傳送到該地址。 未來如果 Alice 勝選，Bill 可以告訴她 _R<sub>priv</sub>_ 以證明資源來自於他。

Alice 計算 _R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_。 這給了她相同的共享密鑰 _S_。 因為她知道私鑰 _K<sub>priv</sub>_，她可以計算出 _P<sub>priv</sub> = K<sub>priv</sub>+hash(S)_。 這把金鑰讓她能存取地址中的資產，而該地址是從 _P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)_ 產生的。

我們有一把獨立的檢視金鑰，讓 Alice 可以將工作分包給 Dave 的「世界統治競選服務」。 Alice 願意讓 Dave 知道公用地址，並在有更多資金時通知她，但她不希望 Dave 花費她的競選資金。

因為檢視和花費使用不同的金鑰，所以 Alice 可以把 _V<sub>priv</sub>_ 給 Dave。 然後 Dave 可以計算 _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_，並以此取得公鑰（_P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_）。 但如果沒有 _K<sub>priv</sub>_，Dave 就無法取得私鑰。

總而言之，以下是不同參與者所知道的值。

| Alice                                                                     | 已發布               | Bill                                                                      | Dave                                                                        |                                                 |
| ------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------- |
| G                                                                         | G                 | G                                                                         | G                                                                           |                                                 |
| _K<sub>priv</sub>_                                                        | －                 | －                                                                         | －                                                                           |                                                 |
| _V<sub>priv</sub>_                                                        | －                 | －                                                                         | _V<sub>priv</sub>_                                                          |                                                 |
| _K<sub>pub</sub> = GK<sub>priv</sub>_                                     | _K<sub>pub</sub>_ | _K<sub>pub</sub>_                                                         | _K<sub>pub</sub>_                                                           |                                                 |
| _V<sub>pub</sub> = GV<sub>priv</sub>_                                     | _V<sub>pub</sub>_ | _V<sub>pub</sub>_                                                         | _V<sub>pub</sub>_                                                           |                                                 |
| －                                                                         | －                 | _R<sub>priv</sub>_                                                        | －                                                                           |                                                 |
| _R<sub>pub</sub>_                                                         | _R<sub>pub</sub>_ | _R<sub>pub</sub> = GR<sub>priv</sub>_                                     | _R<sub>pub</sub>_                                                           |                                                 |
| _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | －                 | _S = R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | _S = _R<sub>pub</sub>V<sub>priv</sub>_ = GR<sub>priv</sub>V<sub>priv</sub>_ |                                                 |
| _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_         | －                 | _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_         | _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_           |                                                 |
| _Address=f(P<sub>pub</sub>)_                           | －                 | _Address=f(P<sub>pub</sub>)_                           | _Address=f(P<sub>pub</sub>)_                             | _Address=f(P<sub>pub</sub>)_ |
| _P<sub>priv</sub> = K<sub>priv</sub>+hash(S)_          | －                 | －                                                                         | －                                                                           |                                                 |

## 隱匿地址出錯時 {#go-wrong}

_區塊鏈上沒有祕密_。 雖然隱匿地址可以提供隱私，但這種隱私很容易受到流量分析的影響。 舉一個簡單的例子，假設 Bill 為一個地址提供資金，並立即傳送一筆交易來發布一個 _R<sub>pub</sub>_ 值。 如果沒有 Alice 的 _V<sub>priv</sub>_，我們無法確定這是一個隱匿地址，但可以這麼猜測。 然後，我們看到另一筆交易，將該地址的所有 ETH 轉移到 Alice 的競選基金地址。 我們可能無法證明，但很有可能 Bill 剛剛捐款給 Alice 的競選活動。 Carol 肯定會這麼想。

Bill 很容易將 _R<sub>pub</sub>_ 的發布與隱匿地址的資金分開（在不同時間，從不同地址進行）。 然而，這還不夠。 Carol 尋找的模式是 Bill 為一個地址提供資金，然後 Alice 的競選基金從中提款。

一個解決方案是 Alice 的競選活動不要直接提款，而是用它來支付給第三方。 如果 Alice 的競選活動將 10 ETH 傳送到 Dave 的「世界統治競選服務」，Carol 只知道 Bill 捐款給 Dave 的其中一個客戶。 如果 Dave 有足夠的客戶，Carol 就無法知道 Bill 是捐款給與她競爭的 Alice，還是捐給 Carol 不在乎的 Adam、Albert 或 Abigail。 Alice 可以在付款中包含一個哈希值，然後向 Dave 提供原像，以證明這是她的捐款。 或者，如上所述，如果 Alice 給了 Dave 她的 _V<sub>priv</sub>_，他就已經知道付款來自誰。

這個解決方案的主要問題是，它要求 Alice 在保密對 Bill 有利時，也要關心保密。 Alice 可能想要維持她的聲譽，這樣 Bill 的朋友 Bob 也會捐款給她。 但也有可能她不介意揭發 Bill，因為這樣 Bill 就會害怕如果 Carol 獲勝會發生什麼事。 Bill 最終可能會提供 Alice 更多的支持。

### 使用多個隱匿層 {#multi-layer}

Bill 可以自己保護自己的隱私，而不是依靠 Alice。 他可以為虛構的人物 Bob 和 Bella 產生多個中繼地址。 然後 Bill 將 ETH 傳送給 Bob，而「Bob」（實際上是 Bill）再將其傳送給 Bella。 「Bella」（也是 Bill）再將其傳送給 Alice。

Carol 仍然可以進行流量分析，並看到從 Bill 到 Bob 再到 Bella 再到 Alice 的管道。 然而，如果「Bob」和「Bella」也將 ETH 用於其他目的，那麼即使 Alice 立即從隱匿地址提款到她已知的競選地址，也不會顯示 Bill 將任何東西轉移給 Alice。

## 編寫隱匿地址應用程式 {#write-app}

本文說明了一個[在 GitHub 上可用的](https://github.com/qbzzt/251022-stealth-addresses.git)隱匿地址應用程式。

### 工具 {#tools}

我們可以使用[一個 typescript 隱匿地址程式庫](https://github.com/ScopeLift/stealth-address-sdk)。 然而，密碼學操作可能非常耗費 CPU。 我偏好以 [Rust](https://rust-lang.org/) 這類編譯語言實作，並使用 [WASM](https://webassembly.org/) 在瀏覽器中執行程式碼。

我們將使用 [Vite](https://vite.dev/) 和 [React](https://react.dev/)。 這些是業界標準的工具；如果您不熟悉，可以使用[此教學](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)。 要使用 Vite，我們需要 Node。

### 實際操作隱匿地址 {#in-action}

1. 安裝必要的工具：[Rust](https://rust-lang.org/tools/install/) 和 [Node](https://nodejs.org/en/download)。

2. 複製 GitHub 存放庫。

   ```sh
   git clone https://github.com/qbzzt/251022-stealth-addresses.git
   cd 251022-stealth-addresses
   ```

3. 安裝先決條件並編譯 Rust 程式碼。

   ```sh
   cd src/rust-wasm
   rustup target add wasm32-unknown-unknown   
   cargo install wasm-pack   
   wasm-pack build --target web
   ```

4. 啟動網頁伺服器。

   ```sh
   cd ../..
   npm install
   npm run dev
   ```

5. 瀏覽至[應用程式](http://localhost:5173/)。 此應用程式頁面有兩個框架：一個用於 Alice 的使用者介面，另一個用於 Bill 的使用者介面。 這兩個框架不互相通訊；它們僅為了方便而放在同一個頁面上。

6. 以 Alice 的身分，點擊 **Generate a Stealth Meta-Address**（產生隱匿中繼地址）。 這會顯示新的隱匿地址和相應的私鑰。 將隱匿中繼地址複製到剪貼簿。

7. 以 Bill 的身分，貼上新的隱匿中繼地址並點擊 **Generate an address**（產生地址）。 這會提供您要為 Alice 提供資金的地址。

8. 複製地址和 Bill 的公鑰，並將它們貼到 Alice 使用者介面的「Private key for address generated by Bill」（Bill 產生的地址之私鑰）區域中。 填寫完這些欄位後，您會看到存取該地址資產的私鑰。

9. 您可以使用[線上計算機](https://iancoleman.net/ethereum-private-key-to-address/)來確保私鑰與地址相符。

### 程式運作方式 {#how-the-program-works}

#### WASM 元件 {#wasm}

編譯成 WASM 的原始碼是以 [Rust](https://rust-lang.org/) 編寫的。 您可以在 [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs) 中看到它。 此程式碼主要是 JavaScript 程式碼與 [`eth-stealth-addresses` 程式庫](https://github.com/kassandraoftroy/eth-stealth-addresses)之間的介面。

**`Cargo.toml`**

Rust 中的 [`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html) 類似於 JavaScript 中的 [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)。 其中包含套件資訊、相依性宣告等。

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

[`getrandom`](https://docs.rs/getrandom/latest/getrandom/) 套件需要產生隨機值。 這無法單純透過演算法達成；它需要存取實體程序作為熵的來源。 此定義指定我們將透過詢問我們正在執行的瀏覽器來取得該熵。

```toml
console_error_panic_hook = "0.1.7"
```

[此程式庫](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/) 在 WASM 程式碼發生恐慌且無法繼續時，提供我們更有意義的錯誤訊息。

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

產生 WASM 程式碼所需的輸出類型。

**`lib.rs`**

這是實際的 Rust 程式碼。

```rust
use wasm_bindgen::prelude::*;
```

從 Rust 建立 WASM 套件的定義。 [此處](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/index.html)有其文件說明。

```rust
use eth_stealth_addresses::{
    generate_stealth_meta_address,
    generate_stealth_address,
    compute_stealth_key
};
```

我們需要從 [`eth-stealth-addresses` 程式庫](https://github.com/kassandraoftroy/eth-stealth-addresses) 取得的函式。

```rust
use hex::{decode,encode};
```

Rust 通常使用位元組[陣列](https://doc.rust-lang.org/std/primitive.array.html) (`[u8; <size>]`) 來表示值。 但在 JavaScript 中，我們通常使用十六進位字串。 [`hex` 程式庫](https://docs.rs/hex/latest/hex/) 為我們將一種表示法轉換為另一種。

```rust
#[wasm_bindgen]
```

產生 WASM 繫結，以便能從 JavaScript 呼叫此函式。

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

傳回具有多個欄位的物件最簡單的方式是傳回 JSON 字串。

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

[`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) 傳回三個欄位：

- 中繼地址（_K<sub>pub</sub>_ 和 _V<sub>pub</sub>_）
- 檢視私鑰（_V<sub>priv</sub>_）
- 花費私鑰（_K<sub>priv</sub>_）

[tuple](https://doc.rust-lang.org/std/primitive.tuple.html) 語法讓我們可以再次分離這些值。

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

使用 [`format!`](https://doc.rust-lang.org/std/fmt/index.html) 巨集來產生 JSON 編碼的字串。 使用 [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html) 將陣列變更為十六進位字串。

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

此函式將十六進位字串（由 JavaScript 提供）轉換為位元組陣列。 我們用它來剖析 JavaScript 程式碼提供的值。 此函式很複雜，因為 Rust 處理陣列和向量的方式。

`<const N: usize>` 運算式稱為[泛型](https://doc.rust-lang.org/book/ch10-01-syntax.html)。 `N` 是一個控制傳回陣列長度的參數。 此函式實際上稱為 `str_to_array::<n>`，其中 `n` 是陣列長度。

傳回值是 `Option<[u8; N]>`，表示傳回的陣列是[可選的](https://doc.rust-lang.org/std/option/)。 這是 Rust 中函式可能失敗的典型模式。

例如，如果我們呼叫 `str_to_array::10("bad060a7")`，函式應該傳回一個十值陣列，但輸入只有四個位元組。 此函式需要失敗，而它透過傳回 `None` 來達成。 `str_to_array::4("bad060a7")` 的傳回值會是 `Some<[0xba, 0xd0, 0x60, 0xa7]>`。

```rust
    // decode 傳回 Result<Vec<u8>, _>
    let vec = decode(s).ok()?;
```

[`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) 函式傳回 `Result<Vec<u8>, FromHexError>`。 [`Result`](https://doc.rust-lang.org/std/result/) 類型可以包含成功結果（`Ok(value)`）或錯誤（`Err(error)`）。

`.ok()` 方法會將 `Result` 轉換為 `Option`，其值若成功則為 `Ok()` 值，否則為 `None`。 最後，[問號運算子](https://doc.rust-lang.org/std/option/#the-question-mark-operator-) 會在 `Option` 為空時中止目前的函式並傳回 `None`。 否則，它會解開值並傳回它（在此情況下，是將值指派給 `vec`）。

這看起來像是一種處理錯誤的奇怪複雜方法，但 `Result` 和 `Option` 確保所有錯誤都以某種方式處理。

```rust
    if vec.len() != N { return None; }
```

如果位元組數不正確，那就是失敗，我們會傳回 `None`。

```rust
    // try_into 會耗用 vec 並嘗試建立 [u8; N]
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust 有兩種陣列類型。 [陣列](https://doc.rust-lang.org/std/primitive.array.html) 的大小固定。 [向量](https://doc.rust-lang.org/std/vec/index.html) 可以增長和縮小。 `hex::decode` 傳回一個向量，但 `eth_stealth_addresses` 程式庫想要接收陣列。 [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods) 會將一個值轉換成另一種型別，例如，將向量轉換成陣列。

```rust
    Some(array)
}
```

在函式結尾傳回值時，Rust 不要求您使用 [`return`](https://doc.rust-lang.org/std/keyword.return.html) 關鍵字。

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

此函式接收一個公用中繼地址，其中包含 _V<sub>pub</sub>_ 和 _K<sub>pub</sub>_。 它會傳回隱匿地址、要發布的公鑰（_R<sub>pub</sub>_），以及一個一位元組的掃描值，用於加速識別哪些已發布的地址可能屬於 Alice。

掃描值是共享密鑰（_S = GR<sub>priv</sub>V<sub>priv</sub>_）的一部分。 此值可供 Alice 使用，檢查此值比檢查 _f(K<sub>pub</sub>+G\*hash(S))_ 是否等於已發布地址快得多。

```rust
    let (address, r_pub, scan) = 
        generate_stealth_address(&str_to_array::<66>(stealth_address)?);
```

我們使用程式庫的 [`generate_stealth_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_address.html)。

```rust
    format!("{{\"address\":\"{}\",\"rPub\":\"{}\",\"scan\":\"{}\"}}",
        encode(address),
        encode(r_pub),
        encode(&[scan])
    ).into()
}
```

準備 JSON 編碼的輸出字串。

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

此函式使用程式庫的 [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) 來計算從地址提款的私鑰 (_R<sub>priv</sub>_)。 此計算需要以下值：

- 地址（_Address=f(P<sub>pub</sub>)_）
- Bill 產生的公鑰（_R<sub>pub</sub>_）
- 檢視私鑰（_V<sub>priv</sub>_）
- 花費私鑰（_K<sub>priv</sub>_）

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html) 指定函式在 WASM 程式碼初始化時執行。

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

此程式碼指定將恐慌輸出傳送到 JavaScript 主機。 要看它實際運作，請使用應用程式並給 Bill 一個無效的中繼地址（只要更改一個十六進位數字）。 您會在 JavaScript 主機中看到此錯誤：

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

後面跟著堆疊追蹤。 然後給 Bill 有效的中繼地址，並給 Alice 一個無效的地址或無效的公鑰。 您將會看到此錯誤：

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

同樣地，後面跟著堆疊追蹤。

#### 使用者介面 {#ui}

使用者介面是使用 [React](https://react.dev/) 編寫並由 [Vite](https://vite.dev/) 提供服務。 您可以使用[此教學](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)來瞭解它們。 這裡不需要 [WAGMI](https://wagmi.sh/)，因為我們不直接與區塊鏈或錢包互動。

使用者介面唯一不那麼明顯的部分是 WASM 的連線能力。 其運作方式如下。

**`vite.config.js`**

此檔案包含 [Vite 設定](https://vite.dev/config/)。

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
})
```

我們需要兩個 Vite 外掛程式：[react](https://www.npmjs.com/package/@vitejs/plugin-react) 和 [wasm](https://github.com/Menci/vite-plugin-wasm#readme)。

**`App.jsx`**

此檔案是應用程式的主要元件。 它是一個容器，包含兩個元件：`Alice` 和 `Bill`，也就是這些使用者的使用者介面。 與 WASM 相關的部分是初始化程式碼。

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

當我們使用 [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/) 時，它會建立我們在此處使用的兩個檔案：一個包含實際程式碼的 wasm 檔（此處為 `src/rust-wasm/pkg/rust_wasm_bg.wasm`），以及一個包含使用定義的 JavaScript 檔（此處為 `src/rust_wasm/pkg/rust_wasm.js`）。 該 JavaScript 檔案的預設匯出是啟動 WASM 所需執行的程式碼。

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

[`useEffect` 鉤子](https://react.dev/reference/react/useEffect) 可讓您指定一個函式，該函式會在狀態變數變更時執行。 在此，狀態變數清單是空的（`[]`），所以此函式只會在頁面載入時執行一次。

效果函式必須立即傳回。 要使用非同步程式碼，例如 WASM `init`（必須載入 `.wasm` 檔，因此需要時間），我們定義一個內部 [`async`](https://en.wikipedia.org/wiki/Async/await) 函式，並在沒有 `await` 的情況下執行它。

**`Bill.jsx`**

這是 Bill 的使用者介面。 它只有一個動作，就是根據 Alice 提供的隱匿中繼地址建立一個地址。

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

除了預設匯出之外，`wasm-pack` 產生的 JavaScript 程式碼還會為 WASM 程式碼中的每個函式匯出一個函式。

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

要呼叫 WASM 函式，我們只需呼叫由 `wasm-pack` 建立的 JavaScript 檔案所匯出的函式。

**`Alice.jsx`**

`Alice.jsx` 中的程式碼類似，只是 Alice 有兩個動作：

- 產生一個中繼地址
- 取得 Bill 發布的地址的私鑰

## 結論 {#conclusion}

隱匿地址並非萬靈丹；它們必須[正確使用](#go-wrong)。 但只要正確使用，它們就可以在公開區塊鏈上實現隱私。

[在此查看我的更多作品](https://cryptodocguy.pro/)。