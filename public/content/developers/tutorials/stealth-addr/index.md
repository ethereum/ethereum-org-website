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

You're Bill. For reasons we won't go into, you want to donate money to the "Alice for Queen of the World" campaign, and you want Alice to know you donated so if she wins she'll reward you. Unfortunately, her victory is not guaranteed. There is a competing campaign, "Carol for Empress of the Solar System". If Carol wins, and she finds out you donated to Alice, you'll be in trouble. So you can't just transfer 200 ETH from your account to Alice's.

[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) has the solution. This ERC explains how to use [stealth addresses](https://nerolation.github.io/stealth-utils) for anonymous transfer.

**Warning**: The cryptography behind stealth addresses is, as far as we know, sound. However, there are possible side channel attacks. [Below](#go-wrong) you will see what you can do to reduce this risk.

## How stealth addresses work {#how}

This article will attempt to explain stealth addresses in two ways. The first is [how to use them](#how-use). This part is sufficient to understand the rest of the article. Then, there is [an explanation of the mathematics behind it](#how-math). If you are interested in cryptography, read this part as well. 

### The simple version (how to use stealth addresses) {#how-use}

Alice creates two private keys, and then publishes the two corresponding public keys (which can appear as a double-length public key). Bill also creates a private key and publishes the corresponding public key.

Using one party's public key and the other's private key, you can figure out a shared secret, which only Alice and Bill know (it can't be derived from the public keys alone). Using this shared secret, Bill gets the stealth address, and is able to send assets to it.

Alice also gets the address from the shared secret, but because she knows the private keys to the public keys she published, she can also get the private key that lets her withdraw from that address.

### The mathematics (why stealth addresses work like this) {#how-math}

Standard stealth addresses use [elliptic-curve cryptography (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor) to get better performance with less key bits, while still keeping the same level of security. But we can ignore that and pretend we are using regular arithmetic (modulu a prime number). The reason we use ECC is because it acts so similarly to regular arithmetic.

There is a number everybody knows, *G*. You can multiply by *G*. But because of the nature of ECC (or modular arithmetic), it is practically impossible to divide by *G* (or any other number).

The way public key cryptography generally works in Ethereum is that you can use a private key, *P<sub>priv</sub>*, to sign transactions that are then verified by a public key, *P<sub>pub</sub> = GP<sub>priv</sub>*. 

Alice creates two private keys, *K<sub>priv</sub>* and *V<sub>priv</sub>*. *K<sub>priv</sub>* will be used to spend money out of the steal address, and *V<sub>priv</sub>* to view the addresses that belong to Alice. Alice then publishes the public keys: *K<sub>pub</sub> = GK<sub>priv</sub>* and *V<sub>pub</sub> = GV<sub>priv</sub>*

Bill creates a third private key, *R<sub>priv</sub>*, and publishes *R<sub>pub</sub> = GR<sub>priv</sub>* to a central registry (Bill could also have sent it to Alice, but we assume Carol is listening).

Bill calculates *R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>*, which he expects Alice to also know (explained below). This value is called *S*, the shared secret. This gives Bill a public key, *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*. From this public key he can calculate an address and send it whatever resources he wants. In the future, if Alice wins, Bill can tell her *R<sub>priv</sub>* to prove he was the one who sent that money.

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
| *S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>* | - | *S =  R<sub>priv</sub>V<sub>puv</sub> - GR<sub>priv</sub>V<sub>priv</sub>* | *S =  *R<sub>pub</sub>V<sub>priv</sub>* = GR<sub>priv</sub>V<sub>priv</sub>* |
| *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* | - | *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* | *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* |
| *Address=f(P<sub>pub</sub>)* | - | *Address=f(P<sub>pub</sub>)* | *Address=f(P<sub>pub</sub>)* | *Address=f(P<sub>pub</sub>)*
| *P<sub>priv</sub> = K<sub>priv</sub>+hash(S)* | - | - | - |

## When stealth addresses go wrong {#go-wrong}

*There are no secrets on the blockchain*. While stealth addresses can provide you with privacy, that privacy is susceptible to traffic analysis. To pick a trivial example, imagine that Bill funds an address and immediately sends a transation to publish an *R<sub>pub</sub>* value. Without Alice's *V<sub>priv</sub>*, we can't be sure that this is a stealth address, but that is the way to bet. Then, we see another transaction that transfers all the ETH from that address to Alice's campaign fund address. We may not be able to prove it, but it's likely that Bill just donated to Alice's campaign. Carol would certainly think so.

It is easy for Bill to separate the publication of *R<sub>pub</sub>* from the funding of the stealth address (do them at different times, from different addresses). However, that is insufficient. The pattern Carol looks for is that Bill funds an address, and then Alice's campaign fund withdraws from it. 

One solution is for Alice's campaign not to withdraw the money directly, but use it to pay a third party. If Alice's campaign sends 10 ETH to Dave's World Domination Campaign Services, Carol only knows that Bill donated to one of Dave's customers. If Dave has enough customers, Carol would not be able to know if Bill donated to Alice who competes with her, or to Adam, Albert, or Abigail that Carol doesn't care about. Alice can include a hashed value with the payment, and then provide Dave the preimage, to prove that it was her donation. Alternatively, as noted above, if Alice gives Dave her *V<sub>priv</sub>*, he already knows who the payment came from.

The main problem with this solution is that it requires Alice to care about secrecy, when the secrecy is to Bill's benefit. Alice may want to maintain her reputation so Bill's friend Bob will also donate to her. But it's also possible that she wouldn't mind exposing Bill, because then he'll be afraid of what will happen if Carol wins and support Alice even more.

Another solution is to layer [privacy solutions](/privacy). This way, Carol would need to break multiple forms of privacy to figure out who donated to Alice.

## Writing a stealth-address application {#write-app}

### Tools {#tools}

There is [a typescript stealth address library](https://github.com/ScopeLift/stealth-address-sdk) we could use. However, cryptographic operations can be CPU intensive. I prefer to do them in a compiled language, such as [Rust](https://rust-lang.org/), using [WASM](https://webassembly.org/) to run the code in the browser.

We are going to use [Vite](https://vite.dev/) and [React](https://react.dev/). These are industry standard tools, if you are not familiar with them, you can use [this tutorial](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). To use Vite we need Node.

### See stealth addresses in action {#in-action}

1. Install the necessary tools: [Rust](https://rust-lang.org/tools/install/) and [Node](https://nodejs.org/en/download).

2. Clone the github repository.

   ```sh
   git clone  https://github.com/qbzzt/251022-stealth-addresses.git
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

5. Browse to [the application](http://localhost:5173/). This application page has two frames, one is Alice's user interface and the other is Bill's. The two frames do not communicate, they are only on the same page for convenience.

6. As Alice, click **Generate a Stealth Meta Address**. This will display the new stealth address and the corresponding private keys. Copy the stealth meta address to the clipboard.

7. As Bill, paste the new stealth meta address and click **Generate an address**. This gives you the address to fund for Alice. 

8. Copy the address and Bill's public key and paste them in the "Private key for address generated by Bill" area of Alice's user interface. Once those fields are filled, you will see the private key to access assets on the address.

9. You can use [an online calculator](https://iancoleman.net/ethereum-private-key-to-address/) to ensure the private key corresponds to the address.

### How it works {#how-it-works}

#### The WASM component {#wasm}

#### The User interface {#ui}

The user interface is written using [React](https://react.dev/) and served by [Vite](https://vite.dev/). You can learn about them using [this tutorial](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). There is no need for [WAGMI](https://wagmi.sh/) here because we do not interact directly with a blockchain or a wallet.

The only non-obvious part of the user interface is WASM connectivity. Here is the explanation of how it works.

**`vite.config.js`**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
})
```

We need two plugins into vite, for [react](https://www.npmjs.com/package/@vitejs/plugin-react) and [wasm](https://github.com/Menci/vite-plugin-wasm#readme).

**`App.jsx`**

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

The [`useEffect` hook](https://react.dev/reference/react/useEffect) lets you specify a function that gets executed when state variables change. Here the list of state variables is empty (`[]`), so this function is only executed once when the page is loaded.

The effect function has to return immediately. To use asynchronous code, such as the WASM `init` (which has to load the `.wasm` file and therefore takes time) we define an internal [`async`](https://en.wikipedia.org/wiki/Async/await) function and run it without an `await`.

**`Bill.jsx`**

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

In addition to the default export, the JavaScript code generated by `wasm-pack` exports a function for every function in the WASM code.

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthAddress)))
            }}>
```

To call WASM functions we just call he 


The code in `Alice.jsx` is very similar.

## Conclusion {#conclusion}

