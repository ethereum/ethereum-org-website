---
title: "使用隱形地址"
description: "隱形地址允許使用者匿名轉帳資產。閱讀本文後，您將能夠：解釋什麼是隱形地址及其運作方式，了解如何以保護隱私的方式使用隱形地址，並編寫一個使用隱形地址的網頁應用程式。"
author: "奧里·波梅蘭茨"
tags:
  - 隱形地址
  - 隱私
  - 密碼學
  - rust
  - wasm
skill: intermediate
breadcrumb: "隱形地址"
published: 2025-11-30
lang: zh-tw
sidebarDepth: 3
---

你是比爾 (Bill)。基於某些我們不深究的原因，你想捐款給「支持愛麗絲 (Alice) 成為世界女王」的競選活動，並希望愛麗絲知道你捐了款，這樣如果她贏了就會獎勵你。不幸的是，她並非穩操勝券。還有一個競爭對手的競選活動：「支持卡蘿 (Carol) 成為太陽系女皇」。如果卡蘿贏了，而且她發現你捐款給愛麗絲，你就會有麻煩。因此，你不能直接從你的帳戶轉帳 200 ETH 到愛麗絲的帳戶。

[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) 提供了解決方案。這個 ERC 解釋了如何使用[隱形地址](https://nerolation.github.io/stealth-utils)進行匿名轉帳。

**警告**：就我們所知，隱形地址背後的密碼學是可靠的。然而，仍存在潛在的側信道攻擊 (side-channel attacks)。在[下文](#go-wrong)中，你將了解可以採取哪些措施來降低這種風險。

## 隱形地址的運作方式 {#how}

本文將嘗試以兩種方式解釋隱形地址。第一種是[如何使用它們](#how-use)。這部分足以讓你理解文章的其餘內容。接著是[其背後數學原理的解釋](#how-math)。如果你對密碼學感興趣，也可以閱讀這部分。 

### 簡易版（如何使用隱形地址） {#how-use}

愛麗絲建立兩個私鑰，並發布對應的公鑰（這兩個公鑰可以組合成一個雙倍長度的元地址 (meta-address)）。比爾也建立一個私鑰，並發布對應的公鑰。

使用一方的公鑰和另一方的私鑰，你可以推導出一個只有愛麗絲和比爾知道的共享秘密 (shared secret)（它無法僅從公鑰推導出來）。使用這個共享秘密，比爾可以獲得隱形地址並將資產發送到該地址。

愛麗絲也從共享秘密中獲得該地址，但因為她知道自己發布的公鑰所對應的私鑰，所以她也能獲得讓她從該地址提取資產的私鑰。

### 數學原理（為什麼隱形地址會這樣運作） {#how-math}

標準的隱形地址使用[橢圓曲線密碼學 (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor)，以較少的金鑰位元獲得更好的效能，同時保持相同的安全級別。但在大多數情況下，我們可以忽略這一點，並假設我們使用的是常規算術。

有一個大家都知道的數字 *G*。你可以乘以 *G*。但由於 ECC 的特性，除以 *G* 實際上是不可能的。在以太坊中，公鑰密碼學的普遍運作方式是，你可以使用私鑰 *P<sub>priv</sub>* 來簽署交易，然後由公鑰 *P<sub>pub</sub> = GP<sub>priv</sub>* 進行驗證。 

愛麗絲建立兩個私鑰：*K<sub>priv</sub>* 和 *V<sub>priv</sub>*。*K<sub>priv</sub>* 將用於花費隱形地址中的資金，而 *V<sub>priv</sub>* 則用於查看屬於愛麗絲的地址。然後愛麗絲發布公鑰：*K<sub>pub</sub> = GK<sub>priv</sub>* 和 *V<sub>pub</sub> = GV<sub>priv</sub>*

比爾建立第三個私鑰 *R<sub>priv</sub>*，並將 *R<sub>pub</sub> = GR<sub>priv</sub>* 發布到一個中央註冊表（比爾也可以將其發送給愛麗絲，但我們假設卡蘿正在監聽）。

比爾計算 *R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>*，他預期愛麗絲也會知道這個值（見下文解釋）。這個值被稱為 *S*，即共享秘密。這給了比爾一個公鑰 *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*。從這個公鑰中，他可以計算出一個地址，並將他想要的任何資源發送到該地址。未來，如果愛麗絲贏了，比爾可以告訴她 *R<sub>priv</sub>*，以證明這些資源來自他。

愛麗絲計算 *R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>*。這讓她獲得相同的共享秘密 *S*。因為她知道私鑰 *K<sub>priv</sub>*，所以她可以計算 *P<sub>priv</sub> = K<sub>priv</sub>+hash(S)*。這把金鑰讓她能夠存取由 *P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)* 產生的地址中的資產。

我們有一個獨立的查看金鑰 (viewing key)，以允許愛麗絲將工作外包給戴夫 (Dave) 的「世界統治競選服務公司」。愛麗絲願意讓戴夫知道公開地址，並在有更多資金可用時通知她，但她不希望他花費她的競選資金。

因為查看和花費使用不同的金鑰，愛麗絲可以將 *V<sub>priv</sub>* 交給戴夫。然後戴夫可以計算 *S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>*，並藉此獲得公鑰 (*P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*)。但如果沒有 *K<sub>priv</sub>*，戴夫就無法獲得私鑰。

總結來說，以下是不同參與者所知道的值。

| 愛麗絲 | 已發布 | 比爾 | 戴夫 |
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

## 當隱形地址出錯時 {#go-wrong}

*區塊鏈上沒有秘密*。雖然隱形地址可以為你提供隱私，但這種隱私容易受到流量分析的影響。舉個簡單的例子，想像比爾為一個地址提供資金，並立即發送一筆交易來發布一個 *R<sub>pub</sub>* 值。如果沒有愛麗絲的 *V<sub>priv</sub>*，我們無法確定這是一個隱形地址，但這很有可能。然後，我們看到另一筆交易將該地址的所有 ETH 轉帳到愛麗絲的競選資金地址。我們可能無法證明這一點，但比爾很可能剛剛捐款給了愛麗絲的競選活動。卡蘿肯定會這麼想。

比爾很容易將發布 *R<sub>pub</sub>* 與為隱形地址提供資金分開（在不同時間、從不同地址進行）。然而，這還不夠。卡蘿尋找的模式是比爾為一個地址提供資金，然後愛麗絲的競選基金從中提取資金。 

一個解決方案是愛麗絲的競選團隊不直接提取資金，而是用它來支付給第三方。如果愛麗絲的競選團隊發送 10 ETH 給戴夫的世界統治競選服務公司，卡蘿只會知道比爾捐款給了戴夫的其中一個客戶。如果戴夫有足夠多的客戶，卡蘿就無法知道比爾是捐給了與她競爭的愛麗絲，還是捐給了卡蘿不在乎的亞當 (Adam)、阿爾伯特 (Albert) 或艾碧蓋兒 (Abigail)。愛麗絲可以在付款中包含一個雜湊值，然後向戴夫提供原像 (preimage)，以證明這是她的捐款。或者，如上所述，如果愛麗絲將她的 *V<sub>priv</sub>* 交給戴夫，他就已經知道付款來自誰了。

這個解決方案的主要問題是，它要求愛麗絲在保密對比爾有利時關心保密性。愛麗絲可能想維持她的聲譽，這樣比爾的朋友鮑伯 (Bob) 也會捐款給她。但也有一種可能是她不介意暴露比爾，因為這樣他就會害怕如果卡蘿贏了會發生什麼事。比爾最終可能會為愛麗絲提供更多的支持。

### 使用多重隱形層 {#multi-layer}

與其依賴愛麗絲來保護比爾的隱私，比爾可以自己來做。他可以為虛構人物鮑伯和貝拉 (Bella) 產生多個元地址。然後比爾將 ETH 發送給鮑伯，而「鮑伯」（實際上是比爾）將其發送給貝拉。「貝拉」（也是比爾）再將其發送給愛麗絲。

卡蘿仍然可以進行流量分析，並看到比爾到鮑伯到貝拉再到愛麗絲的傳輸管道。然而，如果「鮑伯」和「貝拉」也將 ETH 用於其他目的，那麼即使愛麗絲立即從隱形地址提取資金到她已知的競選地址，看起來也不像是比爾轉帳給了愛麗絲。

## 編寫隱形地址應用程式 {#write-app}

本文解釋了一個[在 GitHub 上可用](https://github.com/qbzzt/251022-stealth-addresses.git)的隱形地址應用程式。 

### 工具 {#tools}

我們可以使用[一個 TypeScript 隱形地址函式庫](https://github.com/ScopeLift/stealth-address-sdk)。然而，密碼學操作可能會非常消耗 CPU 資源。我傾向於使用編譯語言（例如 [Rust](https://rust-lang.org/)）來實作它們，並使用 [WASM](https://webassembly.org/) 在瀏覽器中執行程式碼。

我們將使用 [Vite](https://vite.dev/) 和 [React](https://react.dev/)。這些是業界標準的工具；如果你對它們不熟悉，可以使用[本教學](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)。要使用 Vite，我們需要 Node。

### 查看隱形地址的實際運作 {#in-action}

1. 安裝必要的工具：[Rust](https://rust-lang.org/tools/install/) 和 [Node](https://nodejs.org/en/download)。

2. 複製 GitHub 儲存庫。

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

5. 瀏覽至[該應用程式](http://localhost:5173/)。這個應用程式頁面有兩個框架：一個是愛麗絲的使用者介面，另一個是比爾的。這兩個框架不會互相通訊；它們只是為了方便而放在同一個頁面上。

6. 扮演愛麗絲，點擊 **Generate a Stealth Meta-Address**（產生隱形元地址）。這將顯示新的隱形地址和對應的私鑰。將隱形元地址複製到剪貼簿。

7. 扮演比爾，貼上新的隱形元地址並點擊 **Generate an address**（產生地址）。這會為你提供要為愛麗絲提供資金的地址。 

8. 複製該地址和比爾的公鑰，並將它們貼到愛麗絲使用者介面的「Private key for address generated by Bill」（比爾產生的地址的私鑰）區域。填寫這些欄位後，你將看到用於存取該地址資產的私鑰。

9. 你可以使用[線上計算機](https://iancoleman.net/ethereum-private-key-to-address/)來確保私鑰與地址相對應。

### 程式的運作方式 {#how-the-program-works}

#### WASM 元件 {#wasm}

編譯成 WASM 的原始碼是用 [Rust](https://rust-lang.org/) 編寫的。你可以在 [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs) 中看到它。這段程式碼主要作為 JavaScript 程式碼與 [`eth-stealth-addresses` 函式庫](https://github.com/kassandraoftroy/eth-stealth-addresses)之間的介面。

**`Cargo.toml`**

Rust 中的 [`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html) 類似於 JavaScript 中的 [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)。它包含套件資訊、相依性宣告等。

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

[`getrandom`](https://docs.rs/getrandom/latest/getrandom/) 套件需要產生隨機值。這無法透過純演算法的方式完成；它需要存取物理過程作為熵 (entropy) 的來源。這個定義指定我們將透過詢問我們正在執行的瀏覽器來獲取該熵。

```toml
console_error_panic_hook = "0.1.7"
```

當 WASM 程式碼發生恐慌 (panic) 且無法繼續執行時，[這個函式庫](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/)會為我們提供更有意義的錯誤訊息。

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

從 Rust 建立 WASM 套件的定義。它們記錄在[這裡](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/index.html)。

```rust 
use eth_stealth_addresses::{
    generate_stealth_meta_address,
    generate_stealth_address,
    compute_stealth_key
};
```

我們需要從 [`eth-stealth-addresses` 函式庫](https://github.com/kassandraoftroy/eth-stealth-addresses)中使用的函式。

```rust
use hex::{decode,encode};
```

Rust 通常使用位元組[陣列](https://doc.rust-lang.org/std/primitive.array.html) (`[u8; <size>]`) 來表示值。但在 JavaScript 中，我們通常使用十六進位字串。[`hex` 函式庫](https://docs.rs/hex/latest/hex/)為我們將一種表示形式轉換為另一種表示形式。

```rust
#[wasm_bindgen]
```

產生 WASM 綁定，以便能夠從 JavaScript 呼叫此函式。

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

傳回具有多個欄位的物件最簡單的方法是傳回一個 JSON 字串。 

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

[`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) 傳回三個欄位：

- 元地址（*K<sub>pub</sub>* 和 *V<sub>pub</sub>*）
- 查看私鑰（*V<sub>priv</sub>*）
- 花費私鑰（*K<sub>priv</sub>*）

[元組 (tuple)](https://doc.rust-lang.org/std/primitive.tuple.html) 語法讓我們可以再次分離這些值。

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

使用 [`format!`](https://doc.rust-lang.org/std/fmt/index.html) 巨集來產生 JSON 編碼的字串。使用 [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html) 將陣列轉換為十六進位字串。

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

此函式將十六進位字串（由 JavaScript 提供）轉換為位元組陣列。我們使用它來解析 JavaScript 程式碼提供的值。由於 Rust 處理陣列和向量 (vectors) 的方式，這個函式比較複雜。

`<const N: usize>` 表達式被稱為[泛型 (generic)](https://doc.rust-lang.org/book/ch10-01-syntax.html)。`N` 是一個控制傳回陣列長度的參數。該函式實際上被稱為 `str_to_array::<n>`，其中 `n` 是陣列長度。

傳回值是 `Option<[u8; N]>`，這意味著傳回的陣列是[可選的 (optional)](https://doc.rust-lang.org/std/option/)。這是 Rust 中可能失敗的函式的典型模式。

例如，如果我們呼叫 `str_to_array::10("bad060a7")`，該函式應該傳回一個包含十個值的陣列，但輸入只有四個位元組。該函式需要失敗，而它透過傳回 `None` 來實現這一點。`str_to_array::4("bad060a7")` 的傳回值將會是 `Some<[0xba, 0xd0, 0x60, 0xa7]>`。

```rust
    // decode 回傳 Result<Vec<u8>, _>
    let vec = decode(s).ok()?;
```

[`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) 函式傳回一個 `Result<Vec<u8>, FromHexError>`。[`Result`](https://doc.rust-lang.org/std/result/) 類型可以包含成功的結果 (`Ok(value)`) 或錯誤 (`Err(error)`)。

`.ok()` 方法將 `Result` 轉換為 `Option`，如果成功，其值為 `Ok()` 的值，否則為 `None`。最後，如果 `Option` 為空，[問號運算子](https://doc.rust-lang.org/std/option/#the-question-mark-operator-)會中止目前的函式並傳回 `None`。否則，它會解開 (unwrap) 該值並將其傳回（在這種情況下，是為了將值指派給 `vec`）。

這看起來像是一種處理錯誤的奇怪且複雜的方法，但 `Result` 和 `Option` 確保了所有錯誤都能以某種方式被處理。

```rust
    if vec.len() != N { return None; }
```

如果位元組數不正確，那就是失敗，我們傳回 `None`。

```rust
    // try_into 消耗 vec 並嘗試建立 [u8; N]
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust 有兩種陣列類型。[陣列 (Arrays)](https://doc.rust-lang.org/std/primitive.array.html) 具有固定大小。[向量 (Vectors)](https://doc.rust-lang.org/std/vec/index.html) 可以增長和縮小。`hex::decode` 傳回一個向量，但 `eth_stealth_addresses` 函式庫希望接收陣列。[`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods) 將一個值轉換為另一種類型，例如，將向量轉換為陣列。

```rust
    Some(array)
}
```

在函式結尾傳回值時，Rust 不要求你使用 [`return`](https://doc.rust-lang.org/std/keyword.return.html) 關鍵字。

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

此函式接收一個公開的元地址，其中包含 *V<sub>pub</sub>* 和 *K<sub>pub</sub>*。它傳回隱形地址、要發布的公鑰 (*R<sub>pub</sub>*)，以及一個單字節的掃描值，該值可加速識別哪些已發布的地址可能屬於愛麗絲。

掃描值是共享秘密 (*S = GR<sub>priv</sub>V<sub>priv</sub>*) 的一部分。這個值對愛麗絲是可用的，而且檢查它比檢查 *f(K<sub>pub</sub>+G\*hash(S))* 是否等於已發布的地址要快得多。

```rust
    let (address, r_pub, scan) = 
        generate_stealth_address(&str_to_array::<66>(stealth_address)?);
```

我們使用該函式庫的 [`generate_stealth_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_address.html)。

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

此函式使用該函式庫的 [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) 來計算從該地址提取資金的私鑰 (*R<sub>priv</sub>*)。此計算需要以下值：

- 地址 (*Address=f(P<sub>pub</sub>)*)
- 比爾產生的公鑰 (*R<sub>pub</sub>*)
- 查看私鑰 (*V<sub>priv</sub>*)
- 花費私鑰 (*K<sub>priv</sub>*)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html) 指定在初始化 WASM 程式碼時執行該函式。

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

此程式碼指定將恐慌 (panic) 輸出發送到 JavaScript 主控台。要查看其實際運作，請使用該應用程式並給比爾一個無效的元地址（只需更改一個十六進位數字）。你將在 JavaScript 主控台中看到此錯誤：

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

接著是堆疊追蹤 (stack trace)。然後給比爾有效的元地址，並給愛麗絲一個無效的地址或無效的公鑰。你將看到此錯誤：

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

同樣，接著是堆疊追蹤。

#### 使用者介面 {#ui}

使用者介面是使用 [React](https://react.dev/) 編寫的，並由 [Vite](https://vite.dev/) 提供服務。你可以透過[本教學](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)來了解它們。這裡不需要 [Wagmi](https://wagmi.sh/)，因為我們不直接與區塊鏈或錢包互動。

使用者介面中唯一不直觀的部分是 WASM 連線。以下是它的運作方式。

**`vite.config.js`**

這個檔案包含 [Vite 設定](https://vite.dev/config/)。

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

這個檔案是應用程式的主要元件。它是一個包含兩個元件的容器：`Alice` 和 `Bill`，即這些使用者的使用者介面。與 WASM 相關的部分是初始化程式碼。

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

當我們使用 [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/) 時，它會建立我們在這裡使用的兩個檔案：一個包含實際程式碼的 wasm 檔案（此處為 `src/rust-wasm/pkg/rust_wasm_bg.wasm`），以及一個包含使用定義的 JavaScript 檔案（此處為 `src/rust_wasm/pkg/rust_wasm.js`）。該 JavaScript 檔案的預設匯出是啟動 WASM 所需執行的程式碼。

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

[`useEffect` 鉤子 (hook)](https://react.dev/reference/react/useEffect) 讓你指定一個在狀態變數改變時執行的函式。在這裡，狀態變數列表是空的 (`[]`)，因此這個函式只會在頁面載入時執行一次。

effect 函式必須立即傳回。要使用非同步程式碼，例如 WASM 的 `init`（它必須載入 `.wasm` 檔案，因此需要時間），我們定義一個內部的 [`async`](https://en.wikipedia.org/wiki/Async/await) 函式，並在沒有 `await` 的情況下執行它。

**`Bill.jsx`**

這是比爾的使用者介面。它只有一個動作，即根據愛麗絲提供的隱形元地址建立一個地址。

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

除了預設匯出之外，由 `wasm-pack` 產生的 JavaScript 程式碼還會為 WASM 程式碼中的每個函式匯出一個函式。

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

要呼叫 WASM 函式，我們只需呼叫由 `wasm-pack` 建立的 JavaScript 檔案所匯出的函式。

**`Alice.jsx`**

`Alice.jsx` 中的程式碼是類似的，差別在於愛麗絲有兩個動作：

- 產生一個元地址
- 獲取比爾發布的地址的私鑰

## 結論 {#conclusion}

隱形地址並非萬靈丹；它們必須被[正確使用](#go-wrong)。但如果使用得當，它們可以在公共區塊鏈上實現隱私。

[點擊此處查看我的更多作品](https://cryptodocguy.pro/)。