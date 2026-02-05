---
title: Rust 開發者適用的以太坊資源
description: 學習如何使用 Rust 型專案和工具進行以太坊開發
lang: zh-tw
incomplete: true
---

<FeaturedText>學習如何使用 Rust 專案與工具進行以太坊開發</FeaturedText>

使用以太坊建立去中心化應用程式（或稱「dapp」)，發揮加密貨幣和區塊鏈技術的優勢。 這些去中心化應用程式是可信的，這意味著一旦部署到以太坊後，它們就會始終按照設定執行。 這些應用程式可以控制數位資產，以便建立新型金融應用程式。 這些應用程式是去中心化的，這意味著任何單一實體或個人都無法控制它們，並且應用程式幾乎不可能被審查。

## 智慧型合約及 Solidity 程式語言入門 {#getting-started-with-smart-contracts-and-solidity}

**邁出第一步，整合 Rust 與以太坊**

需要先看看更基礎的入門指南？ 請查看 [ethereum.org/learn](/learn/) 或 [ethereum.org/developers](/developers/)。

- [詳解區塊鏈](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [了解智慧型合約](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [撰寫你的第一個智慧型合約](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [學習如何編譯及部署 Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## 初學者文章 {#beginner-articles}

- [Rust 以太坊用戶端](https://openethereum.github.io/) \* **請注意，OpenEthereum [已被棄用](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) 且不再維護。** 請謹慎使用，最好改用其他用戶端實作。
- [使用 Rust 將交易傳送到以太坊](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [在 Kovan 上使用 Rust Wasm 編寫合約的逐步教學](https://github.com/paritytech/pwasm-tutorial)

## 中階文章 {#intermediate-articles}

## 進階使用模式 {#advanced-use-patterns}

- [pwasm_ethereum 外部函式庫，用於與類以太坊網路互動](https://github.com/openethereum/pwasm-ethereum)

- [使用 JavaScript 和 Rust 建立去中心化聊天室](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)

- [使用 Vue.js 和 Rust 建立去中心化待辦事項應用程式](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)

- [使用 Rust 建立區塊鏈](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/)

## Rust 專案與工具 {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) - _用於與類以太坊網路互動的外部函式集合_
- [Lighthouse](https://github.com/sigp/lighthouse) - _快速的以太坊共識層用戶端_
- [Ethereum WebAssembly](https://ewasm.readthedocs.io/en/mkdocs/) - _對以太坊智能合約執行層提議的重新設計，使用了 WebAssembly 的確定性子集_
- [oasis_std](https://docs.rs/oasis-std/latest/oasis_std/index.html) - _OASIS API 參考_
- [Solaris](https://github.com/paritytech/sol-rs) - _使用原生 Parity 用戶端以太坊虛擬機的 Solidity 智能合約單元測試框架。_
- [SputnikVM](https://github.com/rust-blockchain/evm) - _Rust 以太坊虛擬機實作_
- [Wavelet](https://wavelet.perlin.net/docs/smart-contracts) - _使用 Rust 編寫的 Wavelet 智能合約_
- [Foundry](https://github.com/foundry-rs/foundry) - _以太坊應用程式開發工具組_
- [Alloy](https://alloy.rs) - _用於與以太坊及其他基於 EVM 的鏈互動的高效能、經過充分測試且文件齊全的程式庫。_
- [Ethers_rs](https://github.com/gakonst/ethers-rs) - _以太坊程式庫與錢包實作_
- [SewUp](https://github.com/second-state/SewUp) - _一個程式庫，可協助您使用 Rust 建構以太坊 WebAssembly 合約，就像開發一般後端一樣_
- [Substreams](https://github.com/streamingfast/substreams) - _平行化區塊鏈資料索引技術_
- [Reth](https://github.com/paradigmxyz/reth) Reth（Rust Ethereum 的縮寫）是新的以太坊全節點實作
- [Awesome Ethereum Rust](https://github.com/Vid201/awesome-ethereum-rust) - _在以太坊生態系中以 Rust 編寫的專案精選集合_

想取得更多資源？ 請參閱 [ethereum.org/developers.](/developers/)

## Rust 社群貢獻者 {#rust-community-contributors}

- [Ethereum WebAssembly](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)
