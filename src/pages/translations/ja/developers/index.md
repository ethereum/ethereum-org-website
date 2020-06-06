---
title: デベロッパー
meta:
  - property: og:title
    content: デベロッパー | イーサリアム
lang: ja
sidebar: auto
sidebarDepth: 0
---

# 開発者リソース {#developer-resources}

<div class="featured">イーサリアム上でアプリケーションを開発するためのガイドやリソース、開発ツールなどを紹介します。</div>

## はじめに {#getting-started}

**イーサリアムの開発について知りたければ、このページは最適な場所です。** イーサリアムコミュニティによって書かれた以下のガイドを通してイーサリアムのスタックの基礎に触れ、おそらく他の馴染みあるアプリケーション開発とは異なるコアコンセプトを知りましょう。

先により基礎的なことを学びたい人は こちらをチェックしてください。[ethereum.org/ja/learn.](/ja/learn/)

- [Getting up to speed on Ethereum](https://medium.com/@mattcondon/getting-up-to-speed-on-ethereum-63ed28821bbe) _2017 年 8 月 7 日 - Matt Condon_
- [Ethereum In Depth, Part 1](https://blog.zeppelin.solutions/ethereum-in-depth-part-1-968981e6f833) _2018 年 5 月 11 日 - Facu Spagnuolo_
- [Ethereum In Depth, Part 2 ](https://blog.zeppelin.solutions/ethereum-in-depth-part-2-6339cf6bddb9) _2018 年 7 月 24 日 - Facu Spagnuolo_
- [Ethereum Development Walkthrough, Parts 1-5](https://hackernoon.com/ethereum-development-walkthrough-part-1-smart-contracts-b3979e6e573e) _2018 年 1 月 14 日 - dev_zl_
- [Ethereum 101, Parts 1-7](https://kauri.io/collection/5bb65f0f4f34080001731dc2/ethereum-101) _2019 年 2 月 13 日 - Wil Barnes_
- [Full Stack Hello World Voting Ethereum Dapp Tutorial ](https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2) _2017 年 1 月 18 日 - Mahesh Murthy_
- [Mastering Ethereum - A comprehensive textbook available for free online](https://github.com/ethereumbook/ethereumbook) _2018 年 12 月 1 日 - Andreas Antonopoulos & Gavin Wood_
- [Ethereum Developer Portal - Everything you need to get started building on Ethereum](https://ethereum.consensys.net/ethereum-dev-portal) _頻繁にアップデートあり - ConsenSys_
- [Deconstructing a Solidity Contract](https://blog.zeppelin.solutions/deconstructing-a-solidity-contract-part-i-introduction-832efd2d7737) _2018 年 8 月 13 日 - Alejandro Santander & Leo Arias_
- [Full Stack Dapp Tutorial Series ](https://kauri.io/collection/5b8e401ee727370001c942e3) _頻繁にアップデートあり - Joshua Cassidy_

## スマートコントラクト言語 {#smart-contract-languages}

イーサリアムバーチャルマシン (EVM) で動作するあらゆるプログラムは一般的に「スマートコントラクト」と呼ばれます。 スマートコントラクトを記述するための言語として最も人気なのは **Solidity** と **Vyper**です。その他の言語は現在[開発中](https://github.com/ConsenSys/ethereum-developer-tools-list#smart-contract-languages)です。

### Solidity _イーサリアムで最も人気の言語であり、C++、Python、JavaScript に影響されています。_

- [ドキュメント](https://solidity.readthedocs.io)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitter チャットルーム](https://gitter.im/ethereum/solidity/)

### Vyper _Python ベースのセキュリティにフォーカスしたイーサリアムのための言語_

- [ドキュメント](https://vyper.readthedocs.io)
- [GitHub](https://github.com/ethereum/vyper)
- [Vyper Gitter チャットルーム](https://gitter.im/ethereum/vyper)

### その他の選択肢をお探しですか？

- [イーサリアムの開発者ツールリスト #SmartContractLanguages](https://github.com/ConsenSys/ethereum-developer-tools-list#smart-contract-languages)

## 開発者ツール {#developer-tools}

開発者によるアプリケーションの開発、テスト、デプロイを支援するツールがイーサリアムにはすでに多くあり、今も増え続けています。 以下は最も人気なツールです。 より深く知りたければ[こちらの全リスト](https://github.com/ConsenSys/ethereum-developer-tools-list)を参照してください。

### Truffle _開発環境、テスト用フレームワーク、ビルド用パイプラインなどのツール_ {#frameworks}

- [truffleframework.com](https://truffleframework.com/)
- [GitHub](https://github.com/trufflesuite/truffle)

### Embark _イーサリアム、IPFS、Whisper に対応した開発環境、テスト用フレームワークなどのツール_ {#other-tools}

- [GitHub](https://github.com/embark-framework/embark)
- [ドキュメント](https://embark.status.im/docs/)

### Waffle _高度なスマートコントラクト開発とテストのためのフレームワーク (ethers.js ベース)_

- [getwaffle.io](https://getwaffle.io/)
- [GitHub](https://github.com/EthWorks/Waffle)

### Etherlime _Ethers.js ベースの dapp 開発 (Solidity & Vyper) デプロイ、デバッグ、テストなどのためのフレームワーク_

- [ドキュメント](https://etherlime.readthedocs.io/en/latest/)
- [GitHub](https://github.com/LimeChain/etherlime)

### Buidler _イーサリアムのスマートコントラクト開発者向けタスクランナー_

- [buidler.dev](https://buidler.dev)
- [GitHub](https://github.com/nomiclabs/buidler)

### ZeppelinOS _アップグレード可能なスマートコントラクトの構築やスマートコントラクトアプリケーションのセキュアなマネジメントフレームワーク_

- [zeppelinos.org](https://zeppelinos.org)
- [GitHub](https://github.com/zeppelinos)
- [コミュニティフォーラム](https://forum.zeppelin.solutions/c/zeppelinos)

### その他の選択肢をお探しですか？

- [イーサリアム開発者ツールリスト #Frameworks](https://github.com/ConsenSys/ethereum-developer-tools-list#frameworks)

## 統合開発環境 (IDE) {#integrated-development-environments-ides}

### Visual Studio Code _イーサリアム公式サポートプロフェッショナルクロスプラットフォーム IDE_ {#frameworks}

- [Visual Studio Code](https://code.visualstudio.com/)
- [Azure Blockchain Workbench プラグイン](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/microsoft-azure-blockchain.azure-blockchain-workbench?tab=Overview)
- [サンプルコード](https://github.com/Azure-Samples/blockchain/blob/master/blockchain-workbench/application-and-smart-contract-samples/readme.md)

### Remix _静的解析とテスト用ブロックチェーン VM 搭載のウェブベース IDE_ {#other-tools}

- [remix.ethereum.org](https://remix.ethereum.org/)

### Superblocks _ブラウザブロックチェーン VM 搭載、MetaMask 連携トランザクションログなどの機能を持つウェブベース IDE_

- [superblocks.com/lab](https://superblocks.com/lab/)

### EthFiddle _スマートコントラクトの記述・コンパイル・デバッグが可能なウェブベース IDE_

- [ethfiddle.com](https://ethfiddle.com/)

### その他の選択肢をお探しですか？

- [イーサリアム開発者ツールリスト #IDEs](https://github.com/ConsenSys/ethereum-developer-tools-list#ides)

## フロントエンド JavaScript API {#frontend-javascript-apis}

### Web3.js _イーサリアム JavaScript API_

- [GitHub](https://github.com/ethereum/web3.js/)
- [ドキュメント](https://web3js.readthedocs.io/en/1.0/)

### Ethers.js _JavaScript と Typescript でのイーサリアムウォレット実装_

- [GitHub](https://github.com/ethers-io/ethers.js/)
- [ドキュメント](https://docs.ethers.io/ethers.js/html/)

### light.js _ライトクライアントのための高レベルリアクティブ JS ライブラリ_

- [GitHub](https://github.com/paritytech/js-libs/tree/master/packages/light.js)
- [ドキュメント](https://paritytech.github.io/js-libs/light.js/)

### Web3-wrapper _Web3.js の Typescript 版_

- [GitHub](https://github.com/0xProject/0x-monorepo/tree/development/packages/web3-wrapper)
- [ドキュメント](https://0x.org/docs/web3-wrapper#introduction)

### その他の選択肢をお探しですか？

- [イーサリアム開発者ツールリスト #Frontend-Ethereum-APIs](https://github.com/ConsenSys/ethereum-developer-tools-list#frontend-ethereum-apis)

## バックエンド API {#backend-apis}

### Infura _イーサリアム API as a Service_

- [infura.io](https://infura.io)

## セキュリティツール {#security-tools}

### Slither _Python3 で書かれた Solidity 静的解析フレームワーク_ {#smart-contract-security}

- [GitHub](https://github.com/crytic/slither)

### MythX _イーサリアムのスマートコントラクトセキュリティ分析 API_ {#formal-verification}

- [mythx.io](https://mythx.io/)

### Manticore _スマートコントラクトとバイナリにシンボリック実行を使ったコマンドラインインターフェース_

- [GitHub](https://github.com/trailofbits/manticore)

### Securify _イーサリアムスマートコントラクトのためのセキュリティスキャナー_

- [securify.chainsecurity.com](https://securify.chainsecurity.com/)

### 形式検証

- [How formal verification of smart-contacts works](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/) _2018 年 7 月 20 日 - Brian Marick_
- [How Formal Verification Can Ensure Flawless Smart Contracts](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1) _2018 年 1 月 29 日 - Bernard Mueller_

### その他の選択肢をお探しですか？

- [イーサリアム開発者ツールリスト #Security-Tools](https://github.com/ConsenSys/ethereum-developer-tools-list#security-tools)

## テストツール {#testing-tools}

### Solidity-Coverage _Solidity のコードカバレッジツール_

- [GitHub](https://github.com/sc-forks/solidity-coverage)

### hevm _スマートコントラクトのユニットテストとデバッグのための EVM 実装_

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)

### Whiteblock Genesis _E2E 開発サンドボックスとブロックチェーン用テストプラットフォーム_

- [Whiteblock.io](https://whiteblock.io)
- [GitHub](https://github.com/whiteblock/genesis)
- [ドキュメント](https://docs.whiteblock.io)

### その他の選択肢をお探しですか？

- [イーサリアム開発者ツールリスト #Testing-Tools](https://github.com/ConsenSys/ethereum-developer-tools-list#testing-tools)

## ブロックエクスプローラー {#block-explorers}

ブロックエクスプローラーはイーサリアムブロックチェーン (とテストネット) をブラウズできます。つまり特定のトランザクションやブロック、コントラクトなどのオンチェーンアクティビティを監視できるサービスです。

- [Etherscan](https://etherscan.io/)
- [Blockscout](https://blockscout.com/)
- [Etherchain](https://www.etherchain.org/)

## テストネットとフォーセット {#testnets-and-faucets}

イーサリアムコミュニティは複数のテストネットを運営しています。 これは開発者がイーサリアムのメインネットにアプリケーションをデプロイする前に別の環境で行うアプリケーションのテストのために使われています。

### Ropsten _Proof of Work ブロックチェーン、test-ether がマイニング可能_

- [Test-ether フォーセット](https://faucet.ropsten.be/)

### Rinkeby _Proof of Authority ブロックチェーン、Geth 開発チームによる運営_

- [Test-ether フォーセット](https://faucet.rinkeby.io/)

### Goerli _クロスクライアント Proof of Authority ブロックチェーン、Goerli コミュニティによる開発・運営_

- [Test-ether フォーセット](https://faucet.goerli.mudit.blog/)
- [goerli.net](https://goerli.net/)

## クライアントとノードの運用 {#clients--running-your-own-node}

イーサリアムネットワークは互換性のあるクライアントソフトウェアを稼働させている多くのノードによって構成されています。 ノードの大多数は[Geth](https://geth.ethereum.org/) または [Parity](https://www.parity.io/ethereum/)というクライアントを使用しており必要に応じて設定を行うことができます。

### Geth _Go 言語で書かれたイーサリアムクライアント_ {#clients}

- [GitHub](https://github.com/ethereum/go-ethereum)
- [Discord チャット](https://discordapp.com/invite/nthXNEv)

### Parity _Rust で書かれたイーサリアムクライアント_ {#running-your-own-node}

- [parity.io](https://www.parity.io/)
- [GitHub](https://github.com/paritytech/parity-ethereum)

### Ethnode _ローカル環境で実行する Geth または Parity クライアント_

- [GitHub](https://github.com/vrde/ethnode)

### イーサリアムノードのリソース

- [ノード設定用チートシート](https://dev.to/5chdn/ethereum-node-configuration-modes-cheat-sheet-25l8) _2019 年 1 月 5 日 - Afri Schoeden_

### その他の選択肢をお探しですか？

- [イーサリアム開発者ツールリスト #Ethereum-clients](https://github.com/ConsenSys/ethereum-developer-tools-list#ethereum-clients)

## ベストプラクティスとパターン、アンチパターン {#best-practices-patterns-and-anti-patterns}

### DappSys _安全でシンプルでフレキシブルなスマートコントラクトのためのビルディング・ブロック_ {#smart-contracts}

- [dapp.tools/dappsys](https://dapp.tools/dappsys/)
- [GitHub](https://github.com/dapphub/dappsys)

### OpenZeppelin _セキュアなスマートコントラクト開発のためのライブラリ_ {#security}

- [openzeppelin.org](https://openzeppelin.org/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-solidity)

### aragonOS _アップグレードとパーミッション管理のためのパターン_

- [hack.aragon.org](https://hack.aragon.org/docs/aragonos-intro.html)

### Smart Contract Weakness Registry

- [SWC registry](https://smartcontractsecurity.github.io/SWC-registry/)
- [GitHub](https://github.com/SmartContractSecurity/SWC-registry)

### スマートコントラクトセキュリティのベストプラクティスガイド

- [consensys.github.io/smart-contract-best-practices/](https://consensys.github.io/smart-contract-best-practices/)
- [GitHub](https://github.com/ConsenSys/smart-contract-best-practices/)
- [Aggregated collection of security recommendations and best practices](https://github.com/guylando/KnowledgeLists/blob/master/EthereumSmartContracts.md)

### その他の選択肢をお探しですか？

- [イーサリアム開発者ツールリスト #Patterns—best-practices](https://github.com/ConsenSys/ethereum-developer-tools-list#patterns--best-practices)

## 開発者サポートとトレーニング {#developer-support--training}

### イーサリアム Stackexchange {#general-learning}

- [ethereum.stackexchange.com](https://ethereum.stackexchange.com/)

### Solidity Gitter チャットルーム {#game-based-learning}

- [gitter.im/ethereum/solidity](https://gitter.im/ethereum/solidity/)

### 全てのイーサリアム Gitter チャットルーム

- [gitter.im/ethereum/home](https://gitter.im/ethereum/home)

### Cryptozombies _イーサリアムゲームで学ぶコード_

- [Cryptozombies.io](https://cryptozombies.io/)

### Chainshot _ウェブベース dapp コーディングチュートリアル_

- [chainshot.com](https://www.chainshot.com/)

### Blockgeeks _ブロックチェーン技術に関するオンラインコース_

- [courses.blockgeeks.com](https://courses.blockgeeks.com/)

### DappUniversity _イーサリアムブロックチェーンでの分散型アプリケーションの構築を学ぶ_

- [DappUniversity.com](http://www.dappuniversity.com/)

### Ethernaut _Solidity ベースで各レベルのコントラクトをハックする演習_

- [ethernaut.zeppelin.solutions](https://ethernaut.zeppelin.solutions/)

## UI/UX {#uiux-design}

- [Challenge of UX in Ethereum](https://medium.com/ecf-review/challenge-of-ux-in-ethereum-122e1a33688d) _2018 年 6 月 25 日 - Anna Rose_
- [Designing for blockchain: what’s different and what’s at stake](https://media.consensys.net/designing-for-blockchain-whats-different-and-what-s-at-stake-b867eeade1c9) _2018 年 3 月 22 日 - Sarah Baker Mills_

## スタンダード {#standards}

イーサリアムコミュニティはこれまで数多くのスタンダードを採択し、開発者をサポートしてきました。 基本的にスタンダードは[Ethereum Improvement Proposals](https://eips.ethereum.org/) (EIPs) として、コミュニティによる議論の[プロセス](https://eips.ethereum.org/EIPS/eip-1)を経て導入されます。

- [EIP リスト](https://eips.ethereum.org/)
- [EIP GitHub レポジトリ](https://github.com/ethereum/EIPs)
- [EIP ディスカッションボード](https://ethereum-magicians.org/c/eips)
- [イーサリアムのガバナンス概要](https://blog.bmannconsulting.com/ethereum-governance/) _2019 年 3 月 31 日 - Boris Mann_
- [コア開発者ミーティングのプレイリスト](https://www.youtube.com/playlist?list=PLaM7G4Llrb7zfMXCZVEXEABT8OSnd4-7w) _(YouTube プレイリスト)_

スマートコントラクトの標準フォーマットなど、アプリケーションレベルのスタンダードに関わる EIP は[Ethereum Requests for Comment (ERC)](https://eips.ethereum.org/erc) として導入されます。 ERC にはイーサリアムエコシステム全体で広く使われているような必要不可欠なものも多くあります。

- [ERC リスト](https://eips.ethereum.org/erc)
- [ERC20 - トークンインターフェースのスタンダード](https://eips.ethereum.org/EIPS/eip-20)
- [ERC721 - ノンファンジブルトークンインターフェースのスタンダード](https://eips.ethereum.org/EIPS/eip-721)
