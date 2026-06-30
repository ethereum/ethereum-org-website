---
title: "Rust開発者のためのイーサリアム"
description: "Rustベースのプロジェクトやツールを使用してイーサリアム向けに開発する方法を学びます"
lang: ja
incomplete: true
---

<FeaturedText>Rustベースのプロジェクトやツールを使用してイーサリアム向けに開発する方法を学びます</FeaturedText>

イーサリアムを使用して、暗号資産とブロックチェーン技術の利点を活用した分散型アプリケーション (dapp) を作成します。これらのdappは信頼性が高く、一度イーサリアムにデプロイされると、常にプログラムされた通りに実行されます。デジタル資産を制御して、新しい種類の金融アプリケーションを作成できます。また、分散型であるため、単一の組織や個人が制御することはなく、検閲することはほぼ不可能です。

## スマート・コントラクトとSolidity言語の基礎 {#getting-started-with-smart-contracts-and-solidity}

**Rustをイーサリアムに統合するための第一歩を踏み出しましょう**

まずは基本的な入門書が必要ですか？ [ethereum.org/learn](/learn/) または [ethereum.org/developers](/developers/) を確認してください。

- [ブロックチェーンの解説](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [スマート・コントラクトの理解](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [初めてのスマート・コントラクトを作成する](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidityのコンパイルとデプロイ方法を学ぶ](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## 初心者向けの記事 {#beginner-articles}

- [Rustイーサリアムクライアント](https://openethereum.github.io/) \* **OpenEthereumは[非推奨となり](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd)、現在はメンテナンスされていないことに注意してください。** 使用には注意し、できれば別のクライアント実装に切り替えてください。
- [Rustを使用してイーサリアムにトランザクションを送信する](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [Kovan向けにRust Wasmでコントラクトを作成する方法のステップバイステップチュートリアル](https://github.com/paritytech/pwasm-tutorial)

## 中級者向けの記事 {#intermediate-articles}

## 高度な使用パターン {#advanced-use-patterns}

- [イーサリアムのようなネットワークと対話するためのpwasm_ethereum externsライブラリ](https://github.com/openethereum/pwasm-ethereum)
- [JavaScriptとRustを使用して分散型チャットを構築する](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)
- [Vue.jsとRustを使用して分散型Todoアプリを構築する](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)

- [Rustでブロックチェーンを構築する](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/)

## Rustのプロジェクトとツール {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) - _イーサリアムのようなネットワークと対話するためのexternsのコレクション_
- [ライトハウス](https://github.com/sigp/lighthouse) - _高速なイーサリアムのコンセンサス・レイヤークライアント_
- [Ethereum WebAssembly](https://ewasm.readthedocs.io/en/mkdocs/) - _WebAssemblyの決定論的サブセットを使用した、イーサリアムのスマート・コントラクト実行レイヤーの再設計の提案_
- [oasis_std](https://docs.rs/oasis-std/latest/oasis_std/index.html) - _OASIS APIリファレンス_
- [Solaris](https://github.com/paritytech/sol-rs) - _ネイティブのParityクライアントEVMを使用したSolidityスマート・コントラクトの単体テストハーネス。_
- [SputnikVM](https://github.com/rust-blockchain/evm) - _Rustによるイーサリアム仮想マシンの実装_
- [Wavelet](https://github.com/perlin-network/smart-contract-rs) - _RustによるWaveletスマート・コントラクト_
- [Foundry](https://github.com/foundry-rs/foundry) - _イーサリアムアプリケーション開発のためのツールキット_
- [Alloy](https://alloy.rs) - _イーサリアムやその他のEVMベースのチェーンと対話するための、高性能で十分にテストされ文書化されたライブラリ。_
- [Ethers_rs](https://github.com/gakonst/ethers-rs) - _イーサリアムライブラリとウォレットの実装_
- [SewUp](https://github.com/second-state/SewUp) - _一般的なバックエンド開発のように、RustでイーサリアムのWebAssemblyコントラクトを構築するのに役立つライブラリ_
- [Substreams](https://github.com/streamingfast/substreams) - _並列化されたブロックチェーンデータインデックス技術_
- [レス](https://github.com/paradigmxyz/reth) レス (Rust Ethereumの略) は、新しいイーサリアムのフルノード実装です
- [Awesome Ethereum Rust](https://github.com/Vid201/awesome-ethereum-rust) - _Rustで書かれたイーサリアムエコシステムのプロジェクトの厳選されたコレクション_
- [Stylus](https://github.com/OffchainLabs/stylus) - _Arbitrum上でスマート・コントラクトを構築するためのRust SDK_

さらにリソースをお探しですか？ [ethereum.org/developers.](/developers/)

## Rustコミュニティの貢献者 {#rust-community-contributors}

- [Ethereum WebAssembly](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)
