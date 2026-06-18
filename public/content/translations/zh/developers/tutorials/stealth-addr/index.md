---
title: "使用隐形地址"
description: "隐形地址允许用户匿名转账资产。阅读本文后，你将能够：解释什么是隐形地址及其工作原理，了解如何以保护隐私的方式使用隐形地址，并编写一个使用隐形地址的基于 Web 的应用程序。"
author: 奥里·波梅兰茨
tags:
  - 隐形地址
  - 隐私
  - 密码学
  - Rust
  - Wasm
skill: intermediate
breadcrumb: 隐形地址
published: 2025-11-30
lang: zh
sidebarDepth: 3
---

你是比尔（Bill）。出于某些我们不深究的原因，你想向“爱丽丝（Alice）竞选世界女王”的活动捐款，并希望爱丽丝知道你捐了款，这样如果她赢了就会奖励你。不幸的是，她并不能保证获胜。还有一个竞争活动：“卡罗尔（Carol）竞选太阳系女皇”。如果卡罗尔赢了，并且她发现你给爱丽丝捐了款，你就会有麻烦。所以你不能直接从你的账户向爱丽丝转账 200 ETH。

[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) 提供了解决方案。该 ERC 解释了如何使用[隐形地址](https://nerolation.github.io/stealth-utils)进行匿名转账。

**警告**：据我们所知，隐形地址背后的密码学是可靠的。然而，存在潜在的侧信道攻击。[在下文](#go-wrong)中，你将了解可以采取哪些措施来降低这种风险。

## 隐形地址的工作原理 {#how}

本文将尝试通过两种方式解释隐形地址。第一种是[如何使用它们](#how-use)。这部分足以让你理解本文的其余内容。然后是[对其背后数学原理的解释](#how-math)。如果你对密码学感兴趣，也可以阅读这部分。

### 简单版本（如何使用隐形地址） {#how-use}

爱丽丝创建两个私钥并发布相应的公钥（可以组合成一个双倍长度的元地址）。比尔也创建一个私钥并发布相应的公钥。

使用一方的公钥和另一方的私钥，你可以推导出一个只有爱丽丝和比尔知道的共享秘密（它不能仅从公钥推导出来）。使用这个共享秘密，比尔获得了隐形地址并可以向其发送资产。

爱丽丝也从共享秘密中获得了该地址，但因为她知道她发布的公钥对应的私钥，她也可以获得允许她从该地址提取资产的私钥。

### 数学原理（为什么隐形地址是这样工作的） {#how-math}

标准的隐形地址使用[椭圆曲线密码学（ECC）](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor)，以更少的密钥位数获得更好的性能，同时保持相同的安全级别。但在很大程度上，我们可以忽略这一点，假装我们使用的是常规算术。

有一个大家都知道的数字 *G*。你可以乘以 *G*。但由于 ECC 的性质，除以 *G* 实际上是不可能的。公钥密码学在以太坊中通常的工作方式是，你可以使用私钥 *P<sub>priv</sub>* 对交易进行签名，然后由公钥 *P<sub>pub</sub> = GP<sub>priv</sub>* 进行验证。

爱丽丝创建两个私钥，*K<sub>priv</sub>* 和 *V<sub>priv</sub>*。*K<sub>priv</sub>* 将用于从隐形地址中花费资金，而 *V<sub>priv</sub>* 用于查看属于爱丽丝的地址。然后爱丽丝发布公钥：*K<sub>pub</sub> = GK<sub>priv</sub>* 和 *V<sub>pub</sub> = GV<sub>priv</sub>*

比尔创建第三个私钥 *R<sub>priv</sub>*，并将 *R<sub>pub</sub> = GR<sub>priv</sub>* 发布到一个中央注册表（比尔也可以将其发送给爱丽丝，但我们假设卡罗尔在监听）。

比尔计算 *R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>*，他期望爱丽丝也知道这个值（下文解释）。这个值被称为 *S*，即共享秘密。这给了比尔一个公钥，*P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*。从这个公钥中，他可以计算出一个地址，并向其发送他想要的任何资源。在未来，如果爱丽丝赢了，比尔可以告诉她 *R<sub>priv</sub>*，以证明资源来自他。

爱丽丝计算 *R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>*。这给了她相同的共享秘密 *S*。因为她知道私钥 *K<sub>priv</sub>*，她可以计算出 *P<sub>priv</sub> = K<sub>priv</sub>+hash(S)*。这个密钥让她能够访问由 *P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)* 生成的地址中的资产。

我们有一个单独的查看密钥，以允许爱丽丝将工作分包给戴夫（Dave）的世界统治竞选服务公司。爱丽丝愿意让戴夫知道公共地址，并在有更多资金可用时通知她，但她不想让他花掉她的竞选资金。

因为查看和花费使用不同的密钥，爱丽丝可以把 *V<sub>priv</sub>* 给戴夫。然后戴夫可以计算 *S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>*，从而获得公钥（*P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*）。但如果没有 *K<sub>priv</sub>*，戴夫就无法获得私钥。

总结一下，以下是不同参与者所知道的值。

| 爱丽丝 | 已发布 | 比尔 | 戴夫 |
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

## 当隐形地址出现问题时 {#go-wrong}

*区块链上没有秘密*。虽然隐形地址可以为你提供隐私，但这种隐私容易受到流量分析的影响。举个简单的例子，想象一下比尔为一个地址提供资金，并立即发送一笔交易来发布一个 *R<sub>pub</sub>* 值。如果没有爱丽丝的 *V<sub>priv</sub>*，我们无法确定这是一个隐形地址，但很有可能就是。然后，我们看到另一笔交易将该地址的所有 ETH 转账到爱丽丝的竞选资金地址。我们可能无法证明这一点，但很可能比尔刚刚向爱丽丝的竞选活动捐了款。卡罗尔肯定会这么想。

比尔很容易将 *R<sub>pub</sub>* 的发布与隐形地址的资金注入分开（在不同的时间、从不同的地址进行）。然而，这还不够。卡罗尔寻找的模式是比尔为一个地址提供资金，然后爱丽丝的竞选基金从中提取资金。

一种解决方案是爱丽丝的竞选团队不直接提取资金，而是用它来支付给第三方。如果爱丽丝的竞选团队向戴夫的世界统治竞选服务公司发送 10 ETH，卡罗尔只知道比尔向戴夫的一个客户捐了款。如果戴夫有足够的客户，卡罗尔将无法知道比尔是捐给了与她竞争的爱丽丝，还是捐给了卡罗尔不关心的亚当（Adam）、阿尔伯特（Albert）或阿比盖尔（Abigail）。爱丽丝可以在付款中包含一个哈希值，然后向戴夫提供原像，以证明这是她的捐款。或者，如上所述，如果爱丽丝把她的 *V<sub>priv</sub>* 给戴夫，他就已经知道付款来自谁了。

这个解决方案的主要问题是，它要求爱丽丝在保密对比尔有利时关心保密性。爱丽丝可能想维护自己的声誉，这样比尔的朋友鲍勃（Bob）也会向她捐款。但她也有可能不介意暴露比尔，因为那样他就会害怕如果卡罗尔赢了会发生什么。比尔最终可能会为爱丽丝提供更多的支持。

### 使用多个隐形层 {#multi-layer}

比尔可以自己保护隐私，而不是依赖爱丽丝。他可以为虚构的人物鲍勃和贝拉（Bella）生成多个元地址。然后比尔将 ETH 发送给鲍勃，而“鲍勃”（实际上是比尔）将其发送给贝拉。“贝拉”（也是比尔）将其发送给爱丽丝。

卡罗尔仍然可以进行流量分析，并看到比尔到鲍勃到贝拉再到爱丽丝的管道。然而，如果“鲍勃”和“贝拉”也将 ETH 用于其他目的，那么即使爱丽丝立即从隐形地址提取资金到她已知的竞选地址，看起来也不像是比尔向爱丽丝转账了任何东西。

## 编写隐形地址应用程序 {#write-app}

本文解释了一个[在 GitHub 上可用的](https://github.com/qbzzt/251022-stealth-addresses.git)隐形地址应用程序。

### 工具 {#tools}

我们可以使用[一个 TypeScript 隐形地址库](https://github.com/ScopeLift/stealth-address-sdk)。然而，密码学操作可能是 CPU 密集型的。我更喜欢用编译语言（如 [Rust](https://rust-lang.org/)）来实现它们，并使用 [Wasm](https://webassembly.org/) 在浏览器中运行代码。

我们将使用 [Vite](https://vite.dev/) 和 [React](https://react.dev/)。这些是行业标准工具；如果你不熟悉它们，可以使用[本教程](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)。要使用 Vite，我们需要 Node。

### 查看隐形地址的实际应用 {#in-action}

1. 安装必要的工具：[Rust](https://rust-lang.org/tools/install/) 和 [Node](https://nodejs.org/en/download)。

2. 克隆 GitHub 仓库。

   ```sh
   git clone https://github.com/qbzzt/251022-stealth-addresses.git
   cd 251022-stealth-addresses
   ```

3. 安装前置依赖并编译 Rust 代码。

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

5. 浏览[该应用程序](http://localhost:5173/)。此应用程序页面有两个框架：一个用于爱丽丝的用户界面，另一个用于比尔的。这两个框架不进行通信；它们只是为了方便而放在同一个页面上。

6. 作为爱丽丝，点击 **Generate a Stealth Meta-Address**（生成隐形元地址）。这将显示新的隐形地址和相应的私钥。将隐形元地址复制到剪贴板。

7. 作为比尔，粘贴新的隐形元地址并点击 **Generate an address**（生成地址）。这为你提供了为爱丽丝提供资金的地址。

8. 复制该地址和比尔的公钥，并将它们粘贴到爱丽丝用户界面的“Private key for address generated by Bill”（比尔生成的地址的私钥）区域。填写这些字段后，你将看到访问该地址资产的私钥。

9. 你可以使用[在线计算器](https://iancoleman.net/ethereum-private-key-to-address/)来确保私钥与地址相对应。

### 程序是如何工作的 {#how-the-program-works}

#### WASM 组件 {#wasm}

编译成 WASM 的源代码是用 [Rust](https://rust-lang.org/) 编写的。你可以在 [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs) 中看到它。这段代码主要是 JavaScript 代码和 [`eth-stealth-addresses` 库](https://github.com/kassandraoftroy/eth-stealth-addresses)之间的接口。

**`Cargo.toml`**

Rust 中的 [`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html) 类似于 JavaScript 中的 [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)。它包含包信息、依赖声明等。

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

[`getrandom`](https://docs.rs/getrandom/latest/getrandom/) 包需要生成随机值。这不能通过纯算法手段完成；它需要访问物理过程作为熵源。此定义指定我们将通过询问我们正在运行的浏览器来获取该熵。

```toml
console_error_panic_hook = "0.1.7"
```

当 WASM 代码发生 panic 且无法继续时，[这个库](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/)会为我们提供更有意义的错误消息。

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

生成 WASM 代码所需的输出类型。

**`lib.rs`**

这是实际的 Rust 代码。

```rust
use wasm_bindgen::prelude::*;
```

从 Rust 创建 WASM 包的定义。它们在[此处](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/index.html)有记录。

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

Rust 通常使用字节[数组](https://doc.rust-lang.org/std/primitive.array.html)（`[u8; <size>]`）来表示值。但在 JavaScript 中，我们通常使用十六进制字符串。[`hex` 库](https://docs.rs/hex/latest/hex/)为我们在一种表示形式和另一种表示形式之间进行转换。

```rust
#[wasm_bindgen]
```

生成 WASM 绑定，以便能够从 JavaScript 调用此函数。

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

返回具有多个字段的对象的最佳方法是返回一个 JSON 字符串。

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

[`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) 返回三个字段：

- 元地址（*K<sub>pub</sub>* 和 *V<sub>pub</sub>*）
- 查看私钥（*V<sub>priv</sub>*）
- 花费私钥（*K<sub>priv</sub>*）

[元组](https://doc.rust-lang.org/std/primitive.tuple.html)语法让我们再次分离这些值。

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

使用 [`format!`](https://doc.rust-lang.org/std/fmt/index.html) 宏生成 JSON 编码的字符串。使用 [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html) 将数组更改为十六进制字符串。

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

此函数将十六进制字符串（由 JavaScript 提供）转换为字节数组。我们使用它来解析 JavaScript 代码提供的值。由于 Rust 处理数组和向量的方式，这个函数很复杂。

`<const N: usize>` 表达式被称为[泛型](https://doc.rust-lang.org/book/ch10-01-syntax.html)。`N` 是一个控制返回数组长度的参数。该函数实际上被称为 `str_to_array::<n>`，其中 `n` 是数组长度。

返回值为 `Option<[u8; N]>`，这意味着返回的数组是[可选的](https://doc.rust-lang.org/std/option/)。这是 Rust 中可能失败的函数的典型模式。

例如，如果我们调用 `str_to_array::10("bad060a7")`，该函数应该返回一个包含十个值的数组，但输入只有四个字节。该函数需要失败，它通过返回 `None` 来实现。对于 `str_to_array::4("bad060a7")` 的返回值将是 `Some<[0xba, 0xd0, 0x60, 0xa7]>`。

```rust
    // decode 返回 Result<Vec<u8>, _>
    let vec = decode(s).ok()?;
```

[`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) 函数返回一个 `Result<Vec<u8>, FromHexError>`。[`Result`](https://doc.rust-lang.org/std/result/) 类型可以包含成功的结果（`Ok(value)`）或错误（`Err(error)`）。

`.ok()` 方法将 `Result` 转换为 `Option`，如果成功，其值为 `Ok()` 值，如果不成功，则为 `None`。最后，如果 `Option` 为空，[问号运算符](https://doc.rust-lang.org/std/option/#the-question-mark-operator-)将中止当前函数并返回 `None`。否则，它会解包该值并返回它（在这种情况下，是为了给 `vec` 赋值）。

这看起来像是一种处理错误的奇怪而复杂的方法，但 `Result` 和 `Option` 确保所有错误都能以某种方式得到处理。

```rust
    if vec.len() != N { return None; }
```

如果字节数不正确，那就是失败，我们返回 `None`。

```rust
    // try_into 消耗 vec 并尝试转换为 [u8; N]
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust 有两种数组类型。[数组（Array）](https://doc.rust-lang.org/std/primitive.array.html)具有固定大小。[向量（Vector）](https://doc.rust-lang.org/std/vec/index.html)可以增长和缩小。`hex::decode` 返回一个向量，但 `eth_stealth_addresses` 库希望接收数组。[`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods) 将一个值转换为另一种类型，例如，将向量转换为数组。

```rust
    Some(array)
}
```

在函数末尾返回值时，Rust 不要求你使用 [`return`](https://doc.rust-lang.org/std/keyword.return.html) 关键字。

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

此函数接收一个公共元地址，其中包括 *V<sub>pub</sub>* 和 *K<sub>pub</sub>*。它返回隐形地址、要发布的公钥（*R<sub>pub</sub>*）以及一个单字节的扫描值，该扫描值可加速识别哪些已发布的地址可能属于爱丽丝。

扫描值是共享秘密（*S = GR<sub>priv</sub>V<sub>priv</sub>*）的一部分。这个值对爱丽丝可用，并且检查它比检查 *f(K<sub>pub</sub>+G\*hash(S))* 是否等于已发布的地址要快得多。

```rust
    let (address, r_pub, scan) = 
        generate_stealth_address(&str_to_array::<66>(stealth_address)?);
```

我们使用该库的 [`generate_stealth_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_address.html)。

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

此函数使用该库的 [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) 来计算从该地址提取资金的私钥（*R<sub>priv</sub>*）。此计算需要以下值：

- 地址（*Address=f(P<sub>pub</sub>)*）
- 比尔生成的公钥（*R<sub>pub</sub>*）
- 查看私钥（*V<sub>priv</sub>*）
- 花费私钥（*K<sub>priv</sub>*）

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html) 指定在初始化 WASM 代码时执行该函数。

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

此代码指定将 panic 输出发送到 JavaScript 控制台。要查看其实际效果，请使用该应用程序并给比尔一个无效的元地址（只需更改一个十六进制数字）。你将在 JavaScript 控制台中看到此错误：

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

随后是堆栈跟踪。然后给比尔有效的元地址，并给爱丽丝一个无效的地址或无效的公钥。你将看到此错误：

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

同样，随后是堆栈跟踪。

#### 用户界面 {#ui}

用户界面使用 [React](https://react.dev/) 编写，并由 [Vite](https://vite.dev/) 提供服务。你可以通过[本教程](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)了解它们。这里不需要 [Wagmi](https://wagmi.sh/)，因为我们不直接与区块链或钱包交互。

用户界面中唯一不明显的部分是 WASM 连接。以下是它的工作原理。

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

此文件是应用程序的主要组件。它是一个包含两个组件的容器：`Alice` 和 `Bill`，即这些用户的用户界面。与 WASM 相关的部分是初始化代码。

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

当我们使用 [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/) 时，它会创建我们在这里使用的两个文件：一个包含实际代码的 wasm 文件（这里是 `src/rust-wasm/pkg/rust_wasm_bg.wasm`）和一个包含使用定义的 JavaScript 文件（这里是 `src/rust_wasm/pkg/rust_wasm.js`）。该 JavaScript 文件的默认导出是启动 WASM 需要运行的代码。

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

[`useEffect` 钩子](https://react.dev/reference/react/useEffect)允许你指定一个在状态变量更改时执行的函数。在这里，状态变量列表为空（`[]`），因此该函数仅在页面加载时执行一次。

effect 函数必须立即返回。要使用异步代码，例如 WASM `init`（它必须加载 `.wasm` 文件，因此需要时间），我们定义一个内部的 [`async`](https://en.wikipedia.org/wiki/Async/await) 函数，并在没有 `await` 的情况下运行它。

**`Bill.jsx`**

这是比尔的用户界面。它只有一个操作，即根据爱丽丝提供的隐形元地址创建一个地址。

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

除了默认导出之外，由 `wasm-pack` 生成的 JavaScript 代码还为 WASM 代码中的每个函数导出一个函数。

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

要调用 WASM 函数，我们只需调用由 `wasm-pack` 创建的 JavaScript 文件导出的函数。

**`Alice.jsx`**

`Alice.jsx` 中的代码类似，除了爱丽丝有两个操作：

- 生成元地址
- 获取比尔发布的地址的私钥

## 结论 {#conclusion}

隐形地址不是万能药；它们必须被[正确使用](#go-wrong)。但如果使用得当，它们可以在公共区块链上实现隐私。

[点击此处查看我的更多作品](https://cryptodocguy.pro/)。