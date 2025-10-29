---
title: "Using Stealth Addresses"
description: "Stealth addresses allow users to transfer assets anonymously. After reading this article, you will be able to: Explain what stealth addresses are and how they work, understand how to use stealth addresses in a way that preserves anonymity, and write a web-based application that uses stealth addresses."
author: Ori Pomerantz
tags: ["Stealth address", "privacy", "cryptography", "rust", "wasm"]
skill: intermediate
published: 2025-11-30
lang: en
sidebarDepth: 3
---

You're Bill. For reasons we won't go into, you want to donate to the "Alice for Queen of the World" campaign and have Alice know you donated so she'll reward you if she wins. Unfortunately, her victory is not guaranteed. There is a competing campaign, "Carol for Empress of the Solar System". If Carol wins, and she finds out you donated to Alice, you'll be in trouble. So you can't just transfer 200 ETH from your account to Alice's.

[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) has the solution. This ERC explains how to use [stealth addresses](https://nerolation.github.io/stealth-utils) for anonymous transfer.

**Warning**: The cryptography behind stealth addresses is, as far as we know, sound. However, there are potential side-channel attacks. [Below](#go-wrong), you will see what you can do to reduce this risk.

## How stealth addresses work {#how}

This article will attempt to explain stealth addresses in two ways. The first is [how to use them](#how-use). This part is sufficient to understand the rest of the article. Then, there is [an explanation of the mathematics behind it](#how-math). If you are interested in cryptography, read this part as well. 

### The simple version (how to use stealth addresses) {#how-use}

Alice creates two private keys and publishes the corresponding public keys (which can be combined into a single double-length meta-address). Bill also creates a private key and publishes the corresponding public key.

Using one party's public key and the other's private key, you can derive a shared secret known only to Alice and Bill (it can't be derived from the public keys alone). Using this shared secret, Bill obtains the stealth address and can send assets to it.

Alice also gets the address from the shared secret, but because she knows the private keys to the public keys she published, she can also get the private key that lets her withdraw from that address.

### The mathematics (why stealth addresses work like this) {#how-math}

Standard stealth addresses use [elliptic-curve cryptography (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor) to get better performance with fewer key bits, while still keeping the same level of security. But we can ignore that and pretend we are using regular arithmetic (modulo a prime number). The reason we use ECC is that it acts so similarly to regular arithmetic.

There is a number everybody knows, *G*. You can multiply by *G*. But because of the nature of ECC (or modular arithmetic), it is practically impossible to divide by *G* (or any other number).

The way public key cryptography generally works in Ethereum is that you can use a private key, *P<sub>priv</sub>*, to sign transactions that are then verified by a public key, *P<sub>pub</sub> = GP<sub>priv</sub>*. 

Alice creates two private keys, *K<sub>priv</sub>* and *V<sub>priv</sub>*. *K<sub>priv</sub>* will be used to spend money out of the steal address, and *V<sub>priv</sub>* to view the addresses that belong to Alice. Alice then publishes the public keys: *K<sub>pub</sub> = GK<sub>priv</sub>* and *V<sub>pub</sub> = GV<sub>priv</sub>*

Bill creates a third private key, *R<sub>priv</sub>*, and publishes *R<sub>pub</sub> = GR<sub>priv</sub>* to a central registry (Bill could also have sent it to Alice, but we assume Carol is listening).

Bill calculates *R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>*, which he expects Alice also to know (explained below). This value is called *S*, the shared secret. This gives Bill a public key, *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*. From this public key, he can calculate an address and send whatever resources he wants to it. In the future, if Alice wins, Bill can tell her *R<sub>priv</sub>* to prove the resources came from him.

Alice calculates *R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>*. This gives her the same shared secret, *S*. Because she knows the private key, *K<sub>priv</sub>*, she can calculate *P<sub>priv</sub> = K<sub>priv</sub>+hash(S)*. This key lets her access assets in the address that results from *P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)*.

We have a separate viewing key to allow Alice to subcontract to Dave's World Domination Campaign Services. Alice is willing to let Dave know the public addresses and inform her when more money is available, but she doesn't want him spending her campaign money.

Because viewing and spending use separate keys, Alice can give Dave *V<sub>priv</sub>*. Then Dave can calculate *S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>* and that way get the public keys (*P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*). But without *K<sub>priv</sub>* Dave cannot get the private key.

To summarize, these are the values known by the different participants.

| Alice | Published | Bill | Dave |
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

## When stealth addresses go wrong {#go-wrong}

*There are no secrets on the blockchain*. While stealth addresses can provide you with privacy, that privacy is susceptible to traffic analysis. To pick a trivial example, imagine that Bill funds an address and immediately sends a transaction to publish an *R<sub>pub</sub>* value. Without Alice's *V<sub>priv</sub>*, we can't be sure that this is a stealth address, but that is the way to bet. Then, we see another transaction that transfers all the ETH from that address to Alice's campaign fund address. We may not be able to prove it, but it's likely that Bill just donated to Alice's campaign. Carol would certainly think so.

It is easy for Bill to separate the publication of *R<sub>pub</sub>* from the funding of the stealth address (do them at different times, from different addresses). However, that is insufficient. The pattern Carol looks for is that Bill funds an address, and then Alice's campaign fund withdraws from it. 

One solution is for Alice's campaign not to withdraw the money directly, but use it to pay a third party. If Alice's campaign sends 10 ETH to Dave's World Domination Campaign Services, Carol only knows that Bill donated to one of Dave's customers. If Dave has enough customers, Carol would not be able to know if Bill donated to Alice who competes with her, or to Adam, Albert, or Abigail that Carol doesn't care about. Alice can include a hashed value with the payment, and then provide Dave the preimage, to prove that it was her donation. Alternatively, as noted above, if Alice gives Dave her *V<sub>priv</sub>*, he already knows who the payment came from.

The main problem with this solution is that it requires Alice to care about secrecy when that secrecy benefits Bill. Alice may want to maintain her reputation so Bill's friend Bob will also donate to her. But it's also possible that she wouldn't mind exposing Bill, because then he'll be afraid of what will happen if Carol wins. Bill might end up providing Alice even more support.

### Using multiple stealth layers {#multi-layer}

Instead of relying on Alice to preserve Bill's privacy, Bill can do it himself. He can generate multiple meta-addresses for fictional people, Bob and Bella. Bill then sends ETH to Bob, and "Bob" (who is actually Bill) sends it to Bella. "Bella" (also Bill) sends it to Alice.

Carol can still do traffic analysis and see the Bill-to-Bob-to-Bella-to-Alice pipeline. However, if "Bob" and "Bella" also use ETH for other purposes, it won't appear that Bill transferred anything to Alice, even if Alice immediately withdraws from the stealth address to her known campaign address.

## Writing a stealth-address application {#write-app}

This article explains a stealth-address application [available on GitHub](https://github.com/qbzzt/251022-stealth-addresses.git). 

### Tools {#tools}

There is [a typescript stealth address library](https://github.com/ScopeLift/stealth-address-sdk) we could use. However, cryptographic operations can be CPU-intensive. I prefer to implement them in a compiled language, such as [Rust](https://rust-lang.org/), and use [WASM](https://webassembly.org/) to run the code in the browser.

We are going to use [Vite](https://vite.dev/) and [React](https://react.dev/). These are industry-standard tools; if you are not familiar with them, you can use [this tutorial](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). To use Vite, we need Node.

### See stealth addresses in action {#in-action}

1. Install the necessary tools: [Rust](https://rust-lang.org/tools/install/) and [Node](https://nodejs.org/en/download).

2. Clone the GitHub repository.

   ```sh
   git clone https://github.com/qbzzt/251022-stealth-addresses.git
   cd 251022-stealth-addresses
   ```

3. Install prerequisites and compile the Rust code.

   ```sh
   cd src/rust-wasm
   rustup target add wasm32-unknown-unknown   
   cargo install wasm-pack   
   wasm-pack build --target web
   ```

4. Start the web server.

   ```sh
   cd ../..
   npm install
   npm run dev
   ```

5. Browse to [the application](http://localhost:5173/). This application page has two frames: one for Alice's user interface and the other for Bill's. The two frames do not communicate; they are only on the same page for convenience.

6. As Alice, click **Generate a Stealth Meta-Address**. This will display the new stealth address and the corresponding private keys. Copy the stealth meta-address to the clipboard.

7. As Bill, paste the new stealth meta-address and click **Generate an address**. This gives you the address to fund for Alice. 

8. Copy the address and Bill's public key and paste them in the "Private key for address generated by Bill" area of Alice's user interface. Once those fields are filled in, you will see the private key to access assets at that address.

9. You can use [an online calculator](https://iancoleman.net/ethereum-private-key-to-address/) to ensure the private key corresponds to the address.

### How the program works {#how-the-program-works}

#### The WASM component {#wasm}

The source code that compiles into WASM is written in [Rust](https://rust-lang.org/). You can see it in [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs). This code is primarily an interface between the JavaScript code and [the `eth-stealth-addresses` library](https://github.com/kassandraoftroy/eth-stealth-addresses).

**`Cargo.toml`**

[`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html) in Rust is analogous to [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) in JavaScript. It contains package information, dependency declarations, etc.

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

The [`getrandom`](https://docs.rs/getrandom/latest/getrandom/) package needs to generate random values. That cannot be done by pure algorithmic means; it requires access to a physical process as a source of entropy. This definition specifies that we'll get that entropy by asking the browser we're running in.

```toml
console_error_panic_hook = "0.1.7"
```

[This library](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/) gives us more meaningful error messages when the WASM code panics and cannot continue.

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

The output type required to produce WASM code.

**`lib.rs`**

This is the actual Rust code.

```rust
use wasm_bindgen::prelude::*;
```

The definitions to create a WASM package out of Rust. They are documented [here](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/index.html).

```rust 
use eth_stealth_addresses::{
    generate_stealth_meta_address,
    generate_stealth_address,
    compute_stealth_key
};
```

The functions we need from [the `eth-stealth-addresses` library](https://github.com/kassandraoftroy/eth-stealth-addresses).

```rust
use hex::{decode,encode};
```

Rust typically uses byte [arrays](https://doc.rust-lang.org/std/primitive.array.html) (`[u8; <size>]`) for values. But in JavaScript, we typically use hexadecimal strings. [The `hex` library](https://docs.rs/hex/latest/hex/) translates for us from one representation to the other.

```rust
#[wasm_bindgen]
```

Generate WASM bindings to be able to call this function from JavaScript.

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

The easiest way to return an object with multiple fields is to return a JSON string. 

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

The [`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) returns three fields:

- The meta-address (*K<sub>pub</sub>* and *V<sub>pub</sub>*)
- The viewing private key (*V<sub>priv</sub>*)
- The spending private key (*K<sub>priv</sub>*)

The [tuple](https://doc.rust-lang.org/std/primitive.tuple.html) syntax lets us separate those values again.

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

Use the [`format!`](https://doc.rust-lang.org/std/fmt/index.html) macro to generate the JSON-encoded string. Use [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html) to change the arrays to hex strings.

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

This function turns a hex string (provided by JavaScript) into a byte array. We use it to parse values provided by the JavaScript code. This function is complicated because of how Rust handles arrays and vectors.

The `<const N: usize>` expression is called a [generic](https://doc.rust-lang.org/book/ch10-01-syntax.html). `N` is a parameter that controls the length of the returned array. The function is actually called `str_to_array::<n>`, where `n` is the array length.

The return value is `Option<[u8; N]>`, which means the returned array is [optional](https://doc.rust-lang.org/std/option/). This is a typical pattern in Rust for functions that may fail.

For example, if we call `str_to_array::10("bad060a7")`, the function is supposed to return a ten-value array, but the input is only four bytes. The function needs to fail, and it does so by returning `None`. The return value for `str_to_array::4("bad060a7")` would be `Some<[0xba, 0xd0, 0x60, 0xa7]>`.

```rust
    // decode returns Result<Vec<u8>, _>
    let vec = decode(s).ok()?;
```

The [`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) function return a `Result<Vec<u8>, FromHexError>`. The [`Result`](https://doc.rust-lang.org/std/result/) type can contain either a successfult result (`Ok(value)`) or an error (`Err(error)`).

The `.ok()` method turns the `Result` into an `Option`, whose value is either the `Ok()` value if successful or `None` if not. Finally, the [question mark operator](https://doc.rust-lang.org/std/option/#the-question-mark-operator-) aborts the current functions and returns a `None` if the `Option` is empty. Otherwise, it unwraps the value and returns that (in this case, to assign a value to `vec`).

This looks like a strangely convoluted method to handle errors, but `Result` and `Option` ensure that all errors are handled, one way or another.

```rust
    if vec.len() != N { return None; }
```

If the number of bytes is incorrect, that's a failure, and we return `None`.

```rust
    // try_into consumes vec and attempts to make [u8; N]
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust has two array types. [Arrays](https://doc.rust-lang.org/std/primitive.array.html) have a fixed size. [Vectors](https://doc.rust-lang.org/std/vec/index.html) can grow and shrink. `hex::decode` returns a vector, but the `eth_stealth_addresses` library wants to receive arrays. [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods) converts a value into another type, for example, a vector into an array.

```rust
    Some(array)
}
```

Rust does not require you to use the [`return`](https://doc.rust-lang.org/std/keyword.return.html) keyword when returning a value at the end of a function.

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

This function receives a public meta-address, which includes both *V<sub>pub</sub>* and *K<sub>pub</sub>*. It returns the stealth address, the public key to publish (*R<sub>pub</sub>*), and a one-byte scan value that speeds up the identification of which published addresses may belong to Alice.

The scan value is part of the shared secret (*S = GR<sub>priv</sub>V<sub>priv</sub>*). This value is available to Alice, and checking it is much faster than checking whether *f(K<sub>pub</sub>+G\*hash(S))* equals the published address.

```rust
    let (address, r_pub, scan) = 
        generate_stealth_address(&str_to_array::<66>(stealth_address)?);
```

We use the library's [`generate_stealth_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_address.html).

```rust
    format!("{{\"address\":\"{}\",\"rPub\":\"{}\",\"scan\":\"{}\"}}",
        encode(address),
        encode(r_pub),
        encode(&[scan])
    ).into()
}
```

Prepare the JSON-encoded output string.

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

This function uses the library's [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) to calculate the private key to withdraw from the address (*R<sub>priv</sub>*). This calculation requires these values:

- The address (*Address=f(P<sub>pub</sub>)*)
- The public key generated by Bill (*R<sub>pub</sub>*)
- The view private key (*V<sub>priv</sub>*)
- The spend private key (*K<sub>priv</sub>*)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html) specifies that the function is executed when the WASM code is initialized.

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

This code specifies that panic output be sent to the JavaScript console. To see it in action, use the application and give Bill an invalid meta-address (just change one hexadecimal digit). You will see this error in the JavaScript console:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

Followed by a stack trace. Then give Bill the valid meta-address, and give Alice either an invalid address or an invalid public key. You will see this error:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

Again, followed by a stack trace.

#### The User interface {#ui}

The user interface is written using [React](https://react.dev/) and served by [Vite](https://vite.dev/). You can learn about them using [this tutorial](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). There is no need for [WAGMI](https://wagmi.sh/) here because we do not interact directly with a blockchain or a wallet.

The only non-obvious part of the user interface is WASM connectivity. Here is how it works.

**`vite.config.js`**

This fine contains [the Vite configuration](https://vite.dev/config/).

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
})
```

We need two Vite plugins: [react](https://www.npmjs.com/package/@vitejs/plugin-react) and [wasm](https://github.com/Menci/vite-plugin-wasm#readme).

**`App.jsx`**

This file is the main component of the application. It is a container that includes two components: `Alice` and `Bill`, the user interfaces for those users. The relevant part for WASM is the initialization code.

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

When we use [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/), it creaates two files we use here: a wasm file with the actual code (here, `src/rust-wasm/pkg/rust_wasm_bg.wasm`) and a JavaScript file with the definitions to use it (here, `src/rust_wasm/pkg/rust_wasm.js`). The default export of that JavaScript file is code that needs to run to initiate WASM.

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

The [`useEffect` hook](https://react.dev/reference/react/useEffect) lets you specify a function that gets executed when state variables change. Here, the list of state variables is empty (`[]`), so this function is executed only once when the page loads.

The effect function has to return immediately. To use asynchronous code, such as the WASM `init` (which has to load the `.wasm` file and therefore takes time) we define an internal [`async`](https://en.wikipedia.org/wiki/Async/await) function and run it without an `await`.

**`Bill.jsx`**

This is the user interface for Bill. It has a single action, creating an address based on the stealth meta-address provided by Alice.

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

In addition to the default export, the JavaScript code generated by `wasm-pack` exports a function for every function in the WASM code.

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

To call WASM functions, we just call the function exported by the JavaScript file created by `wasm-pack`.

**`Alice.jsx`**

The code in `Alice.jsx` is analogous, except that Alice has two actions:

- Generate a meta-address
- Get the private key for an address published by Bill

## Conclusion {#conclusion}

Stealth addresses are not panacea; they have to be [used correctly](#go-wrong). But when used correctly, they can enable privacy on a public blockchain.

[See here for more of my work](https://cryptodocguy.pro/).