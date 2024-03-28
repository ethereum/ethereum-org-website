---
title: Rustデベロッパーのためのイーサリアム
description: Rustベースのプロジェクトとツールを使ってイーサリアムの開発方法を学ぶ
lang: ja
incomplete: true
---

<FeaturedText>Rustベースのプロジェクトとツールを使ってイーサリアムの開発方法を学ぶ</FeaturedText>

イーサリアムを使用して、仮想通貨とブロックチェーン技術の利点を活用した分散型アプリケーション (「dapp」) を作成します。 dapp は、信頼性の高いアプリケーションです。つまり、イーサリアムにデプロイした後は、常にプログラムしたとおりに動作します。 デジタル資産を制御して、新たなタイプの金融アプリケーションを作成できます。 また、分散化できるため、単一のエンティティや個人は制御できず、検閲はほぼ不可能であることを意味します。

## スマートコントラクトと Solidity を使い始める {#getting-started-with-smart-contracts-and-solidity}

**Rust をイーサリアムに統合するための最初のステップを踏み出してみましょう。**

先に基礎を学習したい場合は、 [ethereum.org/learn](/learn/)または[ethereum.org/developers](/developers/)をご確認ください。

- [ブロックチェーンの説明](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [スマートコントラクトを理解する](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [初めてのスマートコントラクトを記述する](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity のコンパイルとデプロイの方法を学ぶ](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## 初心者向けの記事 {#beginner-articles}

- [イーサリアムクライアントの選択](https://www.trufflesuite.com/docs/truffle/reference/choosing-an-ethereum-client)
- [Rust イーサリアムクライアント](https://openethereum.github.io/) \* **OpenEthereum は[すでに廃止されており](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd)、現在は維持されていません。** ご利用には注意が必要です。できれば、他のクライアント実装に切り替えてください。
- [Rust を使用してイーサリアムにトランザクションを送信する](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [Kovan 向け Rust Wasm でのコントラクトの記述方法についての段階的なチュートリアル](https://github.com/paritytech/pwasm-tutorial)

## 中級者向けの記事 {#intermediate-articles}

## 発展的なユースケース {#advanced-use-patterns}

- [pwasm_ethereum イーサリアムライクなネットワークと対話するための extern ライブラリ](https://github.com/openethereum/pwasm-ethereum)
- [JavaScript と Rust を使用して分散型チャットを構築する](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)
- [Vue.js と Rust を使用して分散化 Todo アプリを構築する](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)

- [Secret Contract の概要](https://blog.enigma.co/getting-started-with-enigma-an-intro-to-secret-contracts-cdba4fe501c2)
- [Rust でブロックチェーンを構築する](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/)

## Rust のプロジェクトとツール {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) - _イーサリアムライクのネットワークとやり取りするための extern のコレクション_
- [Lighthouse](https://github.com/sigp/lighthouse) - _高速イーサリアムコンセンサスレイヤークライアント_
- [Ethereum WebAssembly](https://ewasm.readthedocs.io/en/mkdocs/) - _WebAssembly の決定論的サブセットを使用して、イーサリアムスマートコントラクト実行レイヤーを再設計する提案_
- [oasis_std](https://docs.rs/oasis-std/latest/oasis_std/index.html) - _OASIS API リファレンス_
- [Solaris](https://github.com/paritytech/sol-rs) - _ネイティブ Parity クライアント EVM を使用した Solidity スマートコントラクトのユニットテストハーネス_
- [SputnikVM](https://github.com/rust-blockchain/evm) - _Rust のイーサリアム仮想マシンの実装_
- [Wavelet](https://wavelet.perlin.net/docs/smart-contracts) - _Rust で書かれた Wavelet スマートコントラクト_
- [Foundry](https://github.com/gakonst/foundry)- _イーサリアムアプリケーション開発のためのツールキット_
- [Ethers_rs](https://github.com/gakonst/ethers-rs)- _イーサリアムライブラリとウォレットの実装_
- [SewUp](https://github.com/second-state/SewUp) - _Rust を使用したイーサリアム WebAssembly コントラクトの構築と、一般的なバックエンドと同様の開発をサポートするライブラリ_
- [Substreams](https://github.com/streamingfast/substreams) - _並列化ブロックチェーンデータインデックス技術_
- [Reth](https://github.com/paradigmxyz/reth)Reth(Rust Ethereum の略称)は、新しいイーサリアムのフルノード実装

もっとリソースをお探しですか？ [ethereum.org/developers](/developers/)をご確認ください。

## Rust コミュニティコントリビューター {#rust-community-contributors}

- [Ethereum WebAssembly](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)
