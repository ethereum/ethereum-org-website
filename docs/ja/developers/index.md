---
title: デベロッパー
meta:
  - property: og:title
    content: デベロッパー | イーサリアム
lang: ja-JP
sidebar: auto
sidebarDepth: 0
---

# 開発者リソース

<div class="featured">イーサリアム上でアプリケーションを開発するためのガイドやリソース、開発ツールなどを紹介します。</div>

## はじめに

**イーサリアムの開発について知りたければ、このページは最適な場所です。** イーサリアムコミュニティによって書かれた以下のガイドを通してイーサリアムのスタックの基礎に触れ、おそらく他の馴染みあるアプリケーション開発とは異なるコアコンセプトを知りましょう。

先により基礎的なことを学びたい人は こちらをチェックしてください。[ethereum.org/ja/learn.](/ja/learn/)

- [Getting up to speed on Ethereum](https://medium.com/@mattcondon/getting-up-to-speed-on-ethereum-63ed28821bbe) *2017年8月7日 - Matt Condon*
- [Ethereum In Depth, Part 1](https://blog.zeppelin.solutions/ethereum-in-depth-part-1-968981e6f833) *2018年5月11日 - Facu Spagnuolo*
- [Ethereum In Depth, Part 2 ](https://blog.zeppelin.solutions/ethereum-in-depth-part-2-6339cf6bddb9) *2018年7月24日 - Facu Spagnuolo*
- [Ethereum Development Walkthrough, Parts 1-5](https://hackernoon.com/ethereum-development-walkthrough-part-1-smart-contracts-b3979e6e573e) *2018年1月14日 - dev_zl*
- [Ethereum 101, Parts 1-7](https://kauri.io/collection/5bb65f0f4f34080001731dc2/ethereum-101) *2019年2月13日 - Wil Barnes*
- [Full Stack Hello World Voting Ethereum Dapp Tutorial ](https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2) *2017年1月18日 - Mahesh Murthy*
- [Mastering Ethereum - A comprehensive textbook available for free online](https://github.com/ethereumbook/ethereumbook) *2018年12月1日 - Andreas Antonopoulos & Gavin Wood*
- [Ethereum Developer Portal - Everything you need to get started building on Ethereum](https://ethereum.consensys.net/ethereum-dev-portal) *頻繁にアップデートあり - ConsenSys*
- [Deconstructing a Solidity Contract](https://blog.zeppelin.solutions/deconstructing-a-solidity-contract-part-i-introduction-832efd2d7737) *2018年8月13日 - Alejandro Santander & Leo Arias*
- [Full Stack Dapp Tutorial Series ](https://kauri.io/collection/5b8e401ee727370001c942e3) *頻繁にアップデートあり - Joshua Cassidy*

## スマートコントラクト言語

イーサリアムバーチャルマシン (EVM) で動作するあらゆるプログラムは一般的に「スマートコントラクト」と呼ばれます。 スマートコントラクトを記述するための言語として最も人気なのは **Solidity** と **Vyper**です。その他の言語は現在[開発中](https://github.com/ConsenSys/ethereum-developer-tools-list#smart-contract-languages)です。

### Solidity *イーサリアムで最も人気の言語であり、C++、Python、JavaScriptに影響されています。*

- [ドキュメント](https://solidity.readthedocs.io)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitter チャットルーム](https://gitter.im/ethereum/solidity/)

### Vyper *Pythonベースのセキュリティにフォーカスしたイーサリアムのための言語*

- [ドキュメント](https://vyper.readthedocs.io)
- [GitHub](https://github.com/ethereum/vyper)
- [Vyper Gitter チャットルーム](https://gitter.im/ethereum/vyper)

### その他の選択肢をお探しですか？

- [イーサリアムの開発者ツールリスト #SmartContractLanguages](https://github.com/ConsenSys/ethereum-developer-tools-list#smart-contract-languages)

## 開発者ツール

開発者によるアプリケーションの開発、テスト、デプロイを支援するツールがイーサリアムにはすでに多くあり、今も増え続けています。 以下は最も人気なツールです。 より深く知りたければ[こちらの全リスト](https://github.com/ConsenSys/ethereum-developer-tools-list)を参照してください。

### Truffle *開発環境、テスト用フレームワーク、ビルド用パイプラインなどのツール*

- [truffleframework.com](https://truffleframework.com/)
- [GitHub](https://github.com/trufflesuite/truffle)

### Embark *イーサリアム、IPFS、Whisperに対応した開発環境、テスト用フレームワークなどのツール*

- [GitHub](https://github.com/embark-framework/embark)
- [ドキュメント](https://embark.status.im/docs/)

### Waffle *高度なスマートコントラクト開発とテストのためのフレームワーク (ethers.jsベース)*

- [getwaffle.io](https://getwaffle.io/)
- [GitHub](https://github.com/EthWorks/Waffle)

### Etherlime *Ethers.jsベースのdapp開発 (Solidity & Vyper) デプロイ、デバッグ、テストなどのためのフレームワーク*

- [ドキュメント](https://etherlime.readthedocs.io/en/latest/)
- [GitHub](https://github.com/LimeChain/etherlime)

### Buidler *イーサリアムのスマートコントラクト開発者向けタスクランナー*

- [buidler.dev](https://buidler.dev)
- [GitHub](https://github.com/nomiclabs/buidler)

### ZeppelinOS *アップグレード可能なスマートコントラクトの構築やスマートコントラクトアプリケーションのセキュアなマネジメントフレームワーク*

- [zeppelinos.org](https://zeppelinos.org)
- [GitHub](https://github.com/zeppelinos)
- [コミュニティフォーラム](https://forum.zeppelin.solutions/c/zeppelinos)

### その他の選択肢をお探しですか？

- [イーサリアム開発者ツールリスト #Frameworks](https://github.com/ConsenSys/ethereum-developer-tools-list#frameworks)

## 統合開発環境 (IDE)

### Visual Studio Code *イーサリアム公式サポートプロフェッショナルクロスプラットフォームIDE*

- [Visual Studio Code](https://code.visualstudio.com/)
- [Azure Blockchain Workbench プラグイン](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/microsoft-azure-blockchain.azure-blockchain-workbench?tab=Overview)
- [サンプルコード](https://github.com/Azure-Samples/blockchain/blob/master/blockchain-workbench/application-and-smart-contract-samples/readme.md)

### Remix *静的解析とテスト用ブロックチェーンVM搭載のウェブベースIDE*

- [remix.ethereum.org](https://remix.ethereum.org/)

### Superblocks *ブラウザブロックチェーンVM搭載、MetaMask連携トランザクションログなどの機能を持つウェブベースIDE*

- [superblocks.com/lab](https://superblocks.com/lab/)

### EthFiddle *スマートコントラクトの記述・コンパイル・デバッグが可能なウェブベースIDE*

- [ethfiddle.com](https://ethfiddle.com/)

### その他の選択肢をお探しですか？

- [イーサリアム開発者ツールリスト #IDEs](https://github.com/ConsenSys/ethereum-developer-tools-list#ides)

## フロントエンドJavaScript API

### Web3.js *イーサリアムJavaScript API*

- [GitHub](https://github.com/ethereum/web3.js/)
- [ドキュメント](https://web3js.readthedocs.io/en/1.0/)

### Ethers.js *JavaScriptとTypescriptでのイーサリアムウォレット実装*

- [GitHub](https://github.com/ethers-io/ethers.js/)
- [ドキュメント](https://docs.ethers.io/ethers.js/html/)

### light.js *ライトクライアントのための高レベルリアクティブJSライブラリ*

- [GitHub](https://github.com/paritytech/js-libs/tree/master/packages/light.js)
- [ドキュメント](https://paritytech.github.io/js-libs/light.js/)

### Web3-wrapper *Web3.jsのTypescript版*

- [GitHub](https://github.com/0xProject/0x-monorepo/tree/v2-prototype/packages/web3-wrapper)
- [ドキュメント](https://0x.org/docs/web3-wrapper#introduction)

### その他の選択肢をお探しですか？

- [イーサリアム開発者ツールリスト #Frontend-Ethereum-APIs](https://github.com/ConsenSys/ethereum-developer-tools-list#frontend-ethereum-apis)

## バックエンドAPI

### Infura *イーサリアムAPI as a Service*

- [infura.io](https://infura.io)

## セキュリティツール

### Slither *Python3で書かれたSolidity静的解析フレームワーク*

- [GitHub](https://github.com/crytic/slither)

### MythX *イーサリアムのスマートコントラクトセキュリティ分析API*

- [mythx.io](https://mythx.io/)

### Manticore *スマートコントラクトとバイナリにシンボリック実行を使ったコマンドラインインターフェース*

- [GitHub](https://github.com/trailofbits/manticore)

### Securify *イーサリアムスマートコントラクトのためのセキュリティスキャナー*

- [securify.chainsecurity.com](https://securify.chainsecurity.com/)

### 形式検証

- [How formal verification of smart-contacts works](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/) *2018年7月20日 - Brian Marick*
- [How Formal Verification Can Ensure Flawless Smart Contracts](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1) *2018年1月29日 - Bernard Mueller*

### その他の選択肢をお探しですか？

- [イーサリアム開発者ツールリスト #Security-Tools](https://github.com/ConsenSys/ethereum-developer-tools-list#security-tools)

## テストツール

### Solidity-Coverage *Solidityのコードカバレッジツール*

- [GitHub](https://github.com/sc-forks/solidity-coverage)

### hevm *スマートコントラクトのユニットテストとデバッグのためのEVM実装*

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)

### Whiteblock Genesis *E2E開発サンドボックスとブロックチェーン用テストプラットフォーム*

- [Whiteblock.io](https://whiteblock.io)
- [GitHub](https://github.com/whiteblock/genesis)
- [ドキュメント](https://docs.whiteblock.io)

### その他の選択肢をお探しですか？

- [イーサリアム開発者ツールリスト #Testing-Tools](https://github.com/ConsenSys/ethereum-developer-tools-list#testing-tools)

## ブロックエクスプローラー

ブロックエクスプローラーはイーサリアムブロックチェーン (とテストネット) をブラウズできます。つまり特定のトランザクションやブロック、コントラクトなどのオンチェーンアクティビティを監視できるサービスです。

- [Etherscan](https://etherscan.io/)
- [Blockscout](https://blockscout.com/)
- [Etherchain](https://www.etherchain.org/)

## テストネットとフォーセット

イーサリアムコミュニティは複数のテストネットを運営しています。 これは開発者がイーサリアムのメインネットにアプリケーションをデプロイする前に別の環境で行うアプリケーションのテストのために使われています。

### Ropsten *Proof of Workブロックチェーン、test-etherがマイニング可能*

- [Test-etherフォーセット](https://faucet.ropsten.be/)

### Rinkeby *Proof of Authorityブロックチェーン、Geth開発チームによる運営*

- [Test-etherフォーセット](https://faucet.rinkeby.io/)

### Goerli *クロスクライアントProof of Authorityブロックチェーン、Goerliコミュニティによる開発・運営*

- [Test-etherフォーセット](https://faucet.goerli.mudit.blog/)
- [goerli.net](https://goerli.net/)

## クライアントとノードの運用

イーサリアムネットワークは互換性のあるクライアントソフトウェアを稼働させている多くのノードによって構成されています。 ノードの大多数は[Geth](https://geth.ethereum.org/) または [Parity](https://www.parity.io/ethereum/)というクライアントを使用しており必要に応じて設定を行うことができます。

### Geth *Go言語で書かれたイーサリアムクライアント*

- [GitHub](https://github.com/ethereum/go-ethereum)
- [Discordチャット](https://discordapp.com/invite/nthXNEv)

### Parity *Rustで書かれたイーサリアムクライアント*

- [parity.io](https://www.parity.io/)
- [GitHub](https://github.com/paritytech/parity-ethereum)

### Ethnode *ローカル環境で実行するGeth または Parityクライアント*

- [GitHub](https://github.com/vrde/ethnode)

### イーサリアムノードのリソース

- [ノード設定用チートシート](https://dev.to/5chdn/ethereum-node-configuration-modes-cheat-sheet-25l8) *2019年1月5日 - Afri Schoeden*

### その他の選択肢をお探しですか？

- [イーサリアム開発者ツールリスト #Ethereum-clients](https://github.com/ConsenSys/ethereum-developer-tools-list#ethereum-clients)

## ベストプラクティスとパターン、アンチパターン

### DappSys *安全でシンプルでフレキシブルなスマートコントラクトのためのビルディング・ブロック*

- [dapp.tools/dappsys](https://dapp.tools/dappsys/)
- [GitHub](https://github.com/dapphub/dappsys)

### OpenZeppelin *セキュアなスマートコントラクト開発のためのライブラリ*

- [openzeppelin.org](https://openzeppelin.org/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-solidity)

### aragonOS *アップグレードとパーミッション管理のためのパターン*

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

## 開発者サポートとトレーニング

### イーサリアム Stackexchange

- [ethereum.stackexchange.com](https://ethereum.stackexchange.com/)

### Solidity Gitter チャットルーム

- [gitter.im/ethereum/solidity](https://gitter.im/ethereum/solidity/)

### 全てのイーサリアム Gitter チャットルーム

- [gitter.im/ethereum/home](https://gitter.im/ethereum/home)

### Cryptozombies *イーサリアムゲームで学ぶコード*

- [Cryptozombies.io](https://cryptozombies.io/)

### Chainshot *ウェブベースdappコーディングチュートリアル*

- [chainshot.com](https://www.chainshot.com/)

### Blockgeeks *ブロックチェーン技術に関するオンラインコース*

- [courses.blockgeeks.com](https://courses.blockgeeks.com/)

### DappUniversity *イーサリアムブロックチェーンでの分散型アプリケーションの構築を学ぶ*

- [DappUniversity.com](http://www.dappuniversity.com/)

### Ethernaut *Solidityベースで各レベルのコントラクトをハックする演習*

- [ethernaut.zeppelin.solutions](https://ethernaut.zeppelin.solutions/)

## UI/UX

- [Challenge of UX in Ethereum](https://medium.com/ecf-review/challenge-of-ux-in-ethereum-122e1a33688d) *2018年6月25日 - Anna Rose*
- [Designing for blockchain: what’s different and what’s at stake](https://media.consensys.net/designing-for-blockchain-whats-different-and-what-s-at-stake-b867eeade1c9) *2018年3月22日 - Sarah Baker Mills*

## スタンダード

イーサリアムコミュニティはこれまで数多くのスタンダードを採択し、開発者をサポートしてきました。 基本的にスタンダードは[Ethereum Improvement Proposals](http://eips.ethereum.org/) (EIPs) として、コミュニティによる議論の[プロセス](http://eips.ethereum.org/EIPS/eip-1)を経て導入されます。

- [EIPリスト](http://eips.ethereum.org/)
- [EIP GitHubレポジトリ](https://github.com/ethereum/EIPs)
- [EIPディスカッションボード](https://ethereum-magicians.org/c/eips)
- [イーサリアムのガバナンス概要](https://blog.bmannconsulting.com/ethereum-governance/) *2019年3月31日 - Boris Mann*
- [コア開発者ミーティングのプレイリスト](https://www.youtube.com/playlist?list=PLaM7G4Llrb7zfMXCZVEXEABT8OSnd4-7w) *(YouTubeプレイリスト)*

スマートコントラクトの標準フォーマットなど、アプリケーションレベルのスタンダードに関わるEIPは[Ethereum Requests for Comment (ERC)](https://eips.ethereum.org/erc) として導入されます。 ERCにはイーサリアムエコシステム全体で広く使われているような必要不可欠なものも多くあります。

- [ERCリスト](http://eips.ethereum.org/erc)
- [ERC20 - トークンインターフェースのスタンダード](https://eips.ethereum.org/EIPS/eip-20)
- [ERC721 - ノンファンジブルトークンインターフェースのスタンダード](https://eips.ethereum.org/EIPS/eip-721)