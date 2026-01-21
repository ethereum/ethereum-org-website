---
title: "Rustデベロッパーのためのイーサリアム"
description: "Rustベースのプロジェクトとツールを使ってイーサリアムの開発方法を学ぶ"
lang: ja
incomplete: true
---

<FeaturedText>Rustベースのプロジェクトとツールを使ってイーサリアムの開発方法を学ぶ</FeaturedText>

イーサリアムを使用して、暗号通貨とブロックチェーン技術の利点を活用した分散型アプリケーション (「dapp」) を作成します。 dappは、信頼性の高いアプリケーションです。つまり、イーサリアムにデプロイした後は、常にプログラムしたとおりに動作します。 デジタル資産を制御して、新たなタイプの金融アプリケーションを作成できます。 また、分散化できるため、単一のエンティティや個人は制御できず、検閲はほぼ不可能であることを意味します。

## スマートコントラクトとSolidity言語入門 {#getting-started-with-smart-contracts-and-solidity}

**Rustをイーサリアムに統合するための最初のステップを踏み出してみましょう**

先に基礎を学習したい場合は、 [ethereum.org/learn](/learn/)または[ethereum.org/developers](/developers/)をご覧ください。

- [ブロックチェーン解説](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [スマートコントラクトを理解する](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [初めてのスマートコントラクトを作成する](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidityのコンパイルとデプロイ方法を学ぶ](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## 初心者向けの記事 {#beginner-articles}

- [Rustイーサリアムクライアント](https://openethereum.github.io/) \* **注：OpenEthereumは[廃止された](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd)ため、現在はメンテナンスされていません。** 注意して使用し、できれば別のクライアント実装に切り替えてください。
- [Rustを使用してイーサリアムにトランザクションを送信する](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [Kovan向けのRust Wasmでコントラクトを作成する方法に関するステップバイステップチュートリアル](https://github.com/paritytech/pwasm-tutorial)

## 中級者向けの記事 {#intermediate-articles}

## 高度な使用パターン {#advanced-use-patterns}

- [イーサリアムのようなネットワークと対話するためのpwasm_ethereum externsライブラリ](https://github.com/openethereum/pwasm-ethereum)

- [JavaScriptとRustを使用して分散型チャットを構築する](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)

- [Vue.jsとRustを使用して分散型Todoアプリを構築する](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)

- [Rustでブロックチェーンを構築する](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/)

## Rustのプロジェクトとツール {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) - _イーサリアム系ネットワークとやり取りするためのexternのコレクション_
- [Lighthouse](https://github.com/sigp/lighthouse) - _高速なイーサリアムコンセンサスレイヤークライアント_
- [Ethereum WebAssembly](https://ewasm.readthedocs.io/en/mkdocs/) - _WebAssemblyの決定論的サブセットを使用して、イーサリアムスマートコントラクト実行レイヤーを再設計する提案_
- [oasis_std](https://docs.rs/oasis-std/latest/oasis_std/index.html) - _OASIS APIリファレンス_
- [Solaris](https://github.com/paritytech/sol-rs) - _ネイティブParityクライアントEVMを使用したSolidityスマートコントラクトのユニットテストハーネス。_
- [SputnikVM](https://github.com/rust-blockchain/evm) - _Rustによるイーサリアム仮想マシンの実装_
- [Wavelet](https://wavelet.perlin.net/docs/smart-contracts) - _RustでのWaveletスマートコントラクト_
- [Foundry](https://github.com/foundry-rs/foundry) - _イーサリアムアプリケーション開発用ツールキット_
- [Alloy](https://alloy.rs) - _イーサリアムおよび他のEVMベースのチェーンとやり取りするための、高性能で、十分にテストされ、文書化されたライブラリ。_
- [Ethers_rs](https://github.com/gakonst/ethers-rs) - _イーサリアムライブラリとウォレットの実装_
- [SewUp](https://github.com/second-state/SewUp) - _Rustを使用したイーサリアムWebAssemblyコントラクトの構築と、一般的なバックエンドと同様の開発をサポートするライブラリ_
- [Substreams](https://github.com/streamingfast/substreams) - _並列化ブロックチェーンデータインデックス作成技術_
- [Reth](https://github.com/paradigmxyz/reth) Reth（Rust Ethereumの略）は、イーサリアムの新しいフルノード実装です
- [Awesome Ethereum Rust](https://github.com/Vid201/awesome-ethereum-rust) - _Rustで書かれたイーサリアムエコシステムのプロジェクトの厳選コレクション_

もっとリソースをお探しですか？ [ethereum.org/developers](/developers/)をチェックしてください。

## Rustコミュニティのコントリビューター {#rust-community-contributors}

- [Ethereum WebAssembly](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)
