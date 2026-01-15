---
title: "使用匿名地址"
description: "匿名地址允许用户匿名转移资产。 阅读本文后，你将能够：解释什么是匿名地址及其工作原理，了解如何以保护匿名性的方式使用匿名地址，以及编写一个使用匿名地址的网页应用程序。"
author: Ori Pomerantz
tags: [ "匿名地址", "隐私", "加密", "rust", "wasm" ]
skill: intermediate
published: 2025-11-30
lang: zh
sidebarDepth: 3
---

你是比尔。 出于我们不打算深入探讨的原因，你想向“爱丽丝竞选世界女王”活动捐款，并希望爱丽丝知道你捐了款，以便在她获胜后奖励你。 不幸的是，她的胜利没有保障。 有一个竞争活动，“卡罗尔竞选太阳系女皇”。 如果卡罗尔获胜，而她发现你向爱丽丝捐了款，你就会有麻烦。 所以你不能直接从你的帐户向爱丽丝的帐户转移 200 ETH。

[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) 提供了解决方案。 该 ERC 解释了如何使用[匿名地址](https://nerolation.github.io/stealth-utils)进行匿名转账。

**警告**：据我们所知，匿名地址背后的加密技术是可靠的。 但是，存在潜在的侧信道攻击。 在[下文](#go-wrong)中，你将看到可以采取哪些措施来降低此风险。

## 匿名地址的工作原理 {#how}

本文将尝试通过两种方式解释匿名地址。 第一种是[如何使用它们](#how-use)。 理解这部分内容足以让你看懂本文的其余部分。 然后，是[其背后数学原理的解释](#how-math)。 如果你对加密技术感兴趣，也请阅读此部分。

### 简单版（如何使用匿名地址）{#how-use}

爱丽丝创建两个私钥并发布相应的公钥（可以组合成一个双倍长度的元地址）。 比尔也创建一个私钥并发布相应的公钥。

使用一方的公钥和另一方的私钥，可以派生出一个只有爱丽丝和比尔知道的共享密钥（它不能仅从公钥派生）。 利用此共享密钥，比尔获得匿名地址，并可以将资产发送到该地址。

爱丽丝也从共享密钥中获得地址，但因为她知道她发布的公钥所对应的私钥，所以她也可以获得能让她从该地址取款的私钥。

### 数学原理（为什么匿名地址会这样工作）{#how-math}

标准的匿名地址使用[椭圆曲线加密 (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor) 以更少的密钥位数获得更好的性能，同时保持相同的安全级别。 但在大多数情况下，我们可以忽略这一点，假装我们正在使用常规算术。

有一个大家都知道的数 _G_。 你可以乘以 _G_。 但由于 ECC 的性质，除以 _G_ 实际上是不可能的。 以太坊中公钥加密的工作方式通常是，你可以使用私钥 _P<sub>priv</sub>_ 来签署交易，然后由公钥 _P<sub>pub</sub> = GP<sub>priv</sub>_ 进行验证。

爱丽丝创建两个私钥 _K<sub>priv</sub>_ 和 _V<sub>priv</sub>_。 _K<sub>priv</sub>_ 将用于从匿名地址花钱，_V<sub>priv</sub>_ 用于查看属于爱丽丝的地址。 然后爱丽丝发布公钥：_K<sub>pub</sub> = GK<sub>priv</sub>_ 和 _V<sub>pub</sub> = GV<sub>priv</sub>_

比尔创建第三个私钥 _R<sub>priv</sub>_，并将 _R<sub>pub</sub> = GR<sub>priv</sub>_ 发布到中央注册表（比尔也可以把它发送给爱丽丝，但我们假设卡罗尔正在监听）。

比尔计算 _R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_，他希望爱丽丝也知道这个值（下文解释）。 这个值被称为 _S_，即共享密钥。 这给了比尔一个公钥，_P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_。 从这个公钥，他可以计算出一个地址，并向其发送任何他想要的资源。 未来，如果爱丽丝获胜，比尔可以告诉她 _R<sub>priv</sub>_，以证明资源来自他。

爱丽丝计算 _R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_。 这给了她相同的共享密钥 _S_。 因为她知道私钥 _K<sub>priv</sub>_，所以她可以计算 _P<sub>priv</sub> = K<sub>priv</sub>+hash(S)_。 这个密钥让她可以访问由 _P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)_ 产生的地址中的资产。

我们有一个单独的查看密钥，让爱丽丝可以分包给戴夫的世界统治竞选服务公司。 爱丽丝愿意让戴夫知道公开地址，并在有更多资金时通知她，但她不希望戴夫花掉她的竞选资金。

由于查看和花费使用不同的密钥，爱丽丝可以给戴夫 _V<sub>priv</sub>_。 然后戴夫可以计算 _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_，并以此方式获得公钥 (_P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_)。 但是没有 _K<sub>priv</sub>_，戴夫无法获得私钥。

总而言之，这些是不同参与者知道的值。

| 爱丽丝                                                                       | 已发布               | 比尔                                                                        | 戴夫                                                                          |                                            |
| ------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------ |
| G                                                                         | G                 | G                                                                         | G                                                                           |                                            |
| _K<sub>priv</sub>_                                                        | —                 | —                                                                         | —                                                                           |                                            |
| _V<sub>priv</sub>_                                                        | —                 | —                                                                         | _V<sub>priv</sub>_                                                          |                                            |
| _K<sub>pub</sub> = GK<sub>priv</sub>_                                     | _K<sub>pub</sub>_ | _K<sub>pub</sub>_                                                         | _K<sub>pub</sub>_                                                           |                                            |
| _V<sub>pub</sub> = GV<sub>priv</sub>_                                     | _V<sub>pub</sub>_ | _V<sub>pub</sub>_                                                         | _V<sub>pub</sub>_                                                           |                                            |
| —                                                                         | —                 | _R<sub>priv</sub>_                                                        | —                                                                           |                                            |
| _R<sub>pub</sub>_                                                         | _R<sub>pub</sub>_ | _R<sub>pub</sub> = GR<sub>priv</sub>_                                     | _R<sub>pub</sub>_                                                           |                                            |
| _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | —                 | _S = R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | _S = _R<sub>pub</sub>V<sub>priv</sub>_ = GR<sub>priv</sub>V<sub>priv</sub>_ |                                            |
| _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_         | —                 | _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_         | _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_           |                                            |
| _地址=f(P<sub>pub</sub>)_                                | —                 | _地址=f(P<sub>pub</sub>)_                                | _地址=f(P<sub>pub</sub>)_                                  | _地址=f(P<sub>pub</sub>)_ |
| _P<sub>priv</sub> = K<sub>priv</sub>+hash(S)_          | —                 | —                                                                         | —                                                                           |                                            |

## 匿名地址出错时 {#go-wrong}

_区块链上没有秘密_。 虽然匿名地址可以为你提供隐私，但这种隐私容易受到流量分析的影响。 举一个简单的例子，假设比尔为一个地址注资，并立即发送一笔交易来发布一个 _R<sub>pub</sub>_ 值。 没有爱丽丝的 _V<sub>priv</sub>_，我们无法确定这是一个匿名地址，但很有可能就是。 然后，我们看到另一笔交易，将所有 ETH 从该地址转移到爱丽丝的竞选基金地址。 我们可能无法证明，但很可能比尔刚刚向爱丽丝的竞选活动捐了款。 卡罗尔肯定会这么想。

比尔很容易将 _R<sub>pub</sub>_ 的发布与匿名地址的注资分离开来（在不同时间、从不同地址进行）。 然而，这还不够。 卡罗尔寻找的模式是，比尔为一个地址注资，然后爱丽丝的竞选基金从中取款。

一种解决方案是爱丽丝的竞选活动不直接取款，而是用它来支付给第三方。 如果爱丽丝的竞选活动向戴夫的世界统治竞选服务公司发送 10 ETH，卡罗尔只知道比尔向戴夫的一个客户捐了款。 如果戴夫有足够的客户，卡罗尔就无法知道比尔是捐给了与她竞争的爱丽丝，还是捐给了她不关心的亚当、艾伯特或阿比盖尔。 爱丽丝可以在付款中包含一个哈希值，然后向戴夫提供原像，以证明这是她的捐款。 或者，如上所述，如果爱丽丝把她的 _V<sub>priv</sub>_ 给戴夫，他已经知道这笔款项来自谁。

这个解决方案的主要问题在于，它要求爱丽丝在保密对比尔有利时也要关心保密问题。 爱丽丝可能想维护她的声誉，这样比尔的朋友鲍勃也会向她捐款。 但也有可能她不介意曝光比尔，因为那样他就会害怕卡罗尔获胜后会发生什么。 比尔最终可能会为爱丽丝提供更多支持。

### 使用多个匿名层 {#multi-layer}

比尔可以自己保护自己的隐私，而不用依赖爱丽丝。 他可以为虚构人物鲍勃和贝拉生成多个元地址。 然后比尔将 ETH 发送给鲍勃，“鲍勃”（实际上是比尔）再将其发送给贝拉。 “贝拉”（也是比尔）将其发送给爱丽丝。

卡罗尔仍然可以进行流量分析，并看到比尔-鲍勃-贝拉-爱丽丝的转账流程。 但是，如果“鲍勃”和“贝拉”也将 ETH 用于其他目的，即使爱丽丝立即从匿名地址取款到她已知的竞选地址，也不会显得比尔向爱丽丝转移了任何东西。

## 编写匿名地址应用程序 {#write-app}

本文讲解了一个[在 GitHub 上可用的](https://github.com/qbzzt/251022-stealth-addresses.git)匿名地址应用程序。

### 工具 {#tools}

我们可以使用一个[TypeScript 匿名地址库](https://github.com/ScopeLift/stealth-address-sdk)。 但是，加密操作可能占用大量 CPU。 我更喜欢用[Rust](https://rust-lang.org/)这样的编译语言来实现它们，并使用 [WASM](https://webassembly.org/) 在浏览器中运行代码。

我们将使用 [Vite](https://vite.dev/) 和 [React](https://react.dev/)。 这些是行业标准工具；如果你不熟悉它们，可以使用[本教程](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)。 要使用 Vite，我们需要 Node。

### 查看匿名地址的实际操作 {#in-action}

1. 安装必要的工具：[Rust](https://rust-lang.org/tools/install/) 和 [Node](https://nodejs.org/en/download)。

2. 克隆 GitHub 存储库。

   ```sh
   git clone https://github.com/qbzzt/251022-stealth-addresses.git
   cd 251022-stealth-addresses
   ```

3. 安装先决条件并编译 Rust 代码。

   ```sh
   cd src/rust-wasm
   rustup target add wasm32-unknown-unknown   
   cargo install wasm-pack   
   wasm-pack build --target web
   ```

4. 启动 Web 服务器。

   ```sh
   cd ../..
   npm install
   npm run dev
   ```

5. 浏览到[该应用程序](http://localhost:5173/)。 此应用程序页面有两个框架：一个是爱丽丝的用户界面，另一个是比尔的用户界面。 这两个框架不通信；它们仅为方便起见而位于同一页面上。

6. 作为爱丽丝，点击**生成匿名元地址**。 这将显示新的匿名地址和相应的私钥。 将匿名元地址复制到剪贴板。

7. 以比尔的身份，粘贴新的匿名元地址，然后点击**生成地址**。 这会给你为爱丽丝注资的地址。

8. 复制地址和比尔的公钥，并将它们粘贴到爱丽丝用户界面的“比尔生成的地址的私钥”区域。 填写完这些字段后，你将看到访问该地址资产的私钥。

9. 你可以使用[在线计算器](https://iancoleman.net/ethereum-private-key-to-address/)来确保私钥与地址对应。

### 程序工作原理 {#how-the-program-works}

#### WASM 组件 {#wasm}

编译成 WASM 的源代码是用 [Rust](https://rust-lang.org/) 编写的。 你可以在 [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs) 中看到它。 此代码主要是 JavaScript 代码和 [`eth-stealth-addresses` 库](https://github.com/kassandraoftroy/eth-stealth-addresses)之间的接口。

**`Cargo.toml`**

Rust 中的 [`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html) 类似于 JavaScript 中的 [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)。 它包含包信息、依赖项声明等。

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

[`getrandom`](https://docs.rs/getrandom/latest/getrandom/) 包需要生成随机值。 这不能通过纯算法方式完成；它需要访问物理过程作为熵的来源。 该定义指定我们将通过询问我们正在运行的浏览器来获得该熵。

```toml
console_error_panic_hook = "0.1.7"
```

当 WASM 代码发生 panic 且无法继续时，[此库](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/)会为我们提供更有意义的错误信息。

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

生成 WASM 代码所需的输出类型。

**`lib.rs`**

这是实际的 Rust 代码。

```rust
use wasm_bindgen::prelude::*；
```

用 Rust 创建 WASM 包的定义。 [这里](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/index.html)有相关文档。

```rust
use eth_stealth_addresses::{
    generate_stealth_meta_address,
    generate_stealth_address,
    compute_stealth_key
};
```

我们需要从 [`eth-stealth-addresses` 库](https://github.com/kassandraoftroy/eth-stealth-addresses)中获取的函数。

```rust
use hex::{decode,encode};
```

Rust 通常使用字节[数组](https://doc.rust-lang.org/std/primitive.array.html) (`[u8; <size>]`) 来表示值。 但在 JavaScript 中，我们通常使用十六进制字符串。 [`hex` 库](https://docs.rs/hex/latest/hex/)为我们翻译一种表示到另一种表示。

```rust
#[wasm_bindgen]
```

生成 WASM 绑定，以便能够从 JavaScript 调用此函数。

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

返回包含多个字段的对象的简单方法是返回一个 JSON 字符串。

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

[`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) 返回三个字段：

- 元地址（_K<sub>pub</sub>_ 和 _V<sub>pub</sub>_）
- 查看私钥 (_V<sub>priv</sub>_)
- 花费私钥 (_K<sub>priv</sub>_)

[元组](https://doc.rust-lang.org/std/primitive.tuple.html)语法让我们能够再次分离这些值。

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

使用 [`format!`](https://doc.rust-lang.org/std/fmt/index.html) 宏生成 JSON 编码的字符串。 使用 [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html) 将数组更改为十六进制字符串。

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

此函数将（由 JavaScript 提供的）十六进制字符串转换为字节数组。 我们用它来解析 JavaScript 代码提供的值。 由于 Rust 处理数组和向量的方式，此函数比较复杂。

`<const N: usize>` 表达式被称为[泛型](https://doc.rust-lang.org/book/ch10-01-syntax.html)。 `N` 是一个控制返回数组长度的参数。 该函数实际上被称为 `str_to_array::<n>`，其中 `n` 是数组长度。

返回值为 `Option<[u8; N]>`，这意味着返回的数组是[可选的](https://doc.rust-lang.org/std/option/)。 这在 Rust 中是可能失败的函数的典型模式。

例如，如果我们调用 `str_to_array::10("bad060a7")`，该函数应该返回一个十值数组，但输入只有四个字节。 该函数需要失败，它通过返回 `None` 来实现。 `str_to_array::4("bad060a7")` 的返回值将是 `Some<[0xba, 0xd0, 0x60, 0xa7]>`。

```rust
    // decode 返回 Result<Vec<u8>, _>
    let vec = decode(s).ok()?;
```

[`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) 函数返回一个 `Result<Vec<u8>, FromHexError>`。 [`Result`](https://doc.rust-lang.org/std/result/) 类型可以包含成功的结果（`Ok(value)`）或错误（`Err(error)`）。

`.ok()` 方法将 `Result` 转换为 `Option`，如果成功，其值为 `Ok()` 值，否则为 `None`。 最后，[问号运算符](https://doc.rust-lang.org/std/option/#the-question-mark-operator-)会中止当前函数，并在 `Option` 为空时返回 `None`。 否则，它会解包值并返回该值（在这种情况下，为 `vec` 赋值）。

这看起来像一个奇怪复杂的错误处理方法，但 `Result` 和 `Option` 确保所有错误都以某种方式处理。

```rust
    if vec.len() != N { return None; }
```

如果字节数不正确，那就是失败，我们返回 `None`。

```rust
    // try_into 消耗 vec 并尝试生成 [u8; N]
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust 有两种数组类型。 [数组](https://doc.rust-lang.org/std/primitive.array.html)具有固定大小。 [向量](https://doc.rust-lang.org/std/vec/index.html)可以增长和收缩。 `hex::decode` 返回一个向量，但 `eth_stealth_addresses` 库希望接收数组。 [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods) 将一个值转换为另一个类型，例如，将向量转换为数组。

```rust
    Some(array)
}
```

在函数末尾返回值时，Rust 不要求你使用 [`return`](https://doc.rust-lang.org/std/keyword.return.html) 关键字。

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

此函数接收一个公共元地址，其中包括 _V<sub>pub</sub>_ 和 _K<sub>pub</sub>_。 它返回匿名地址、要发布的公钥 (_R<sub>pub</sub>_) 和一个单字节扫描值，该值可加快识别哪些已发布的地址可能属于爱丽丝。

扫描值是共享密钥的一部分（_S = GR<sub>priv</sub>V<sub>priv</sub>_）。 爱丽丝可以使用此值，检查此值比检查 _f(K<sub>pub</sub>+G\*hash(S))_ 是否等于已发布地址要快得多。

```rust
    let (address, r_pub, scan) = 
        generate_stealth_address(&str_to_array::<66>(stealth_address)?);
```

我们使用库的 [`generate_stealth_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_address.html)。

```rust
    format!("{{\"address\":\"{}\",\"rPub\":\"{}\",\"scan\":\"{}\"}}",
        encode(address),
        encode(r_pub),
        encode(&[scan])
    ).into()
}
```

准备 JSON 编码的输出字符串。

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

该函数使用库的 [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) 来计算从该地址取款的私钥 (_R<sub>priv</sub>_)。 此计算需要以下值：

- 地址 (_Address=f(P<sub>pub</sub>)_)
- 比尔生成的公钥 (_R<sub>pub</sub>_)
- 查看私钥 (_V<sub>priv</sub>_)
- 花费私钥 (_K<sub>priv</sub>_)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html) 指定在初始化 WASM 代码时执行该函数。

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

此代码指定将 panic 输出发送到 JavaScript 控制台。 要查看其操作，请使用该应用程序并为比尔提供一个无效的元地址（只需更改一个十六进制数字）。 你将在 JavaScript 控制台中看到此错误：

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

后跟一个堆栈跟踪。 然后给比尔有效的元地址，并给爱丽丝一个无效的地址或无效的公钥。 你将看到此错误：

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

同样，后跟一个堆栈跟踪。

#### 用户界面 {#ui}

用户界面是使用 [React](https://react.dev/) 编写的，并由 [Vite](https://vite.dev/) 提供服务。 你可以使用[本教程](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)来学习它们。 这里不需要 [WAGMI](https://wagmi.sh/)，因为我们不直接与区块链或钱包交互。

用户界面中唯一不明显的部分是 WASM 连接。 下面是它的工作原理。

**`vite.config.js`**

此文件包含 [Vite 配置](https://vite.dev/config/)。

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
})
```

我们需要两个 Vite 插件：[react](https://www.npmjs.com/package/@vitejs/plugin-react) 和 [wasm](https://github.com/Menci/vite-plugin-wasm#readme)。

**`App.jsx`**

此文件是应用程序的主组件。 它是一个容器，包含两个组件：`Alice` 和 `Bill`，即这些用户的用户界面。 WASM 的相关部分是初始化代码。

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

当我们使用 [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/) 时，它会创建我们在这里使用的两个文件：一个包含实际代码的 wasm 文件（此处为 `src/rust-wasm/pkg/rust_wasm_bg.wasm`）和一个包含使用定义的 JavaScript 文件（此处为 `src/rust_wasm/pkg/rust_wasm.js`）。 该 JavaScript 文件的默认导出是需要运行以启动 WASM 的代码。

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

[`useEffect` 钩子](https://react.dev/reference/react/useEffect)允许你指定一个在状态变量更改时执行的函数。 这里，状态变量列表为空（`[]`），因此此函数仅在页面加载时执行一次。

效果函数必须立即返回。 要使用异步代码，例如 WASM `init`（它必须加载 `.wasm` 文件，因此需要时间），我们定义一个内部 [`async`](https://en.wikipedia.org/wiki/Async/await) 函数并在没有 `await` 的情况下运行它。

**`Bill.jsx`**

这是比尔的用户界面。 它只有一个操作，即根据爱丽丝提供的匿名元地址创建一个地址。

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

除了默认导出之外，`wasm-pack` 生成的 JavaScript 代码还为 WASM 代码中的每个函数导出一个函数。

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

要调用 WASM 函数，我们只需调用 `wasm-pack` 创建的 JavaScript 文件导出的函数。

**`Alice.jsx`**

`Alice.jsx` 中的代码是类似的，只是爱丽丝有两个操作：

- 生成元地址
- 获取比尔发布的地址的私钥

## 结论 {#conclusion}

匿名地址不是万能药；它们必须被[正确使用](#go-wrong)。 但如果使用得当，它们可以在公共区块链上实现隐私。

[点击此处查看我的更多作品](https://cryptodocguy.pro/)。