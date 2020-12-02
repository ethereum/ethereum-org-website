---
title: 開発者
description: イーサリアム上でアプリケーションを開発するためのガイドやリソース、開発ツールなどを紹介します。
lang: ja
sidebar: true
sidebarDepth: 2
---

# デベロッパー向けリソース {#developer-resources}

<div class="featured">イーサリアム上でアプリケーションを開発するためのガイドやリソース、開発ツールなどを紹介します。</div>

## はじめに {#getting-started}

**イーサリアムの開発について知りたければ、このページは最適な場所です。** イーサリアムコミュニティによって書かれた以下のガイドを通してイーサリアムのスタックの基礎に触れ、おそらく他の馴染みあるアプリケーション開発とは異なるコアコンセプトを知りましょう。

すぐにでもコーディングを始めたいですか？ [ここで開発を始めましょう](/ja/build/)。

先により基礎的なことを学びたい人は [学習リソース](/ja/learn/)をチェックしてください。

**役に立つリソース**

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

**Solidity -** **_C++、Python、JavaScript にインスパイアされた、イーサリアムで最もポピュラーな言語。_**

- [ドキュメント](https://solidity.readthedocs.io)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitter チャットルーム](https://gitter.im/ethereum/solidity/)

**Vyper -** **_Python をベースにしたイーサリアム用のセキュリティ重視の言語。_**

- [ドキュメント](https://vyper.readthedocs.io)
- [GitHub](https://github.com/ethereum/vyper)
- [Vyper Gitter チャットルーム](https://gitter.im/ethereum/vyper)

**その他の選択肢をお探しですか？**

- [イーサリアムの開発者ツールリスト #SmartContractLanguages](https://github.com/ConsenSys/ethereum-developer-tools-list#smart-contract-languages)

## 言語別のリソース {#language-specific-resources}

開発者が好みのプログラミング言語でイーサリアムについて学ぶための言語別のランディングページを構築しています。

- [Java 開発者のためのイーサリアム](/ja/java/)
- [Python 開発者のためのイーサリアム](/ja/python/)
- [JavaScript 開発者のためのイーサリアム](/ja/javascript/)
- [Go 開発者のためのイーサリアム](/ja/golang/)
- [Rust 開発者のためのイーサリアム](/ja/rust/)
- [.NET 開発者のためのイーサリアム](/ja/dot-net/)
- 今後さらに追加する予定です！ ここにあなたの言語がありませんか？ [イシューを立ててください](https://github.com/ethereum/ethereum-org-website/issues/new/choose)！

## 開発者ツール {#developer-tools}

開発者によるアプリケーションの開発、テスト、デプロイを支援するツールがイーサリアムにはすでに多くあり、今も増え続けています。 以下は最も人気のあるツールです。 より深く知りたければ[こちらの全リスト](https://github.com/ConsenSys/ethereum-developer-tools-list)を参照してください。

### フレームワーク {#frameworks}

**Truffle -** **_開発環境、テストフレームワーク、ビルドパイプラインなどのツール群。_**

- [trufflesuite.com](https://www.trufflesuite.com/)
- [GitHub](https://github.com/trufflesuite/truffle)

**Embark -** **_イーサリアム、IPFS、Whisper と統合された開発環境、テストフレームワークなどのツール群。_**

- [ドキュメント](https://embark.status.im/docs/)
- [GitHub](https://github.com/embark-framework/embark)

**Waffle -** **_高度なスマートコントラクトの開発とテストのためのフレームワーク (ethers.js ベース)。_**

- [getwaffle.io](https://getwaffle.io/)
- [GitHub](https://github.com/EthWorks/Waffle)

**Etherlime -** **_Ethers.js ベースの dapp 開発 (Solidity & Vyper)、デプロイ、デバッグ、テストなどのためのフレームワーク。_**

- [ドキュメント](https://etherlime.readthedocs.io/en/latest/)
- [GitHub](https://github.com/LimeChain/etherlime)

### 他のツール {#other-tools}

**Ethereum Grid -** **_イーサリアムクライアントやツールをダウンロード、設定、実行するためのデスクトップアプリケーション。_**

- [grid.ethereum.org](https://grid.ethereum.org)
- [GitHub](https://github.com/ethereum/grid)

**Hardhat -** **_イーサリアムスマートコントラクト開発者のためのタスクランナー。_**

- [hardhat.org](https://hardhat.org)
- [GitHub](https://github.com/nomiclabs/hardhat)

**OpenZeppelin SDK -** **_究極のスマートコントラクトツールキット。スマートコントラクトの開発、コンパイル、アップグレード、デプロイ、およびインタラクションを支援するツール群。._**

- [OpenZeppelin SDK](https://openzeppelin.com/sdk/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-sdk)
- [コミュニティフォーラム](https://forum.openzeppelin.com/c/sdk)

**The Graph -** **_イーサリアムと IPFS のデータをインデックス化し、GraphQL を使用してクエリを作成するためのプロトコル。_**

- [The Graph](https://thegraph.com/)
- [Graph Explorer](https://thegraph.com/explorer/)
- [ドキュメント](https://thegraph.com/docs/)
- [GitHub](https://github.com/graphprotocol/)
- [Discord](https://thegraph.com/discord)

**Tenderly -** **_エラートラッキング、アラート、パフォーマンス測定、詳細なコントラクト分析ができる、スマートコントラクトを簡単に監視するためのプラットフォーム。_**

- [tenderly.dev](https://tenderly.dev/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Python Tooling -** **_Python によるイーサリアムインタラクションのための各種ライブラリ。_**

- [py.ethereum.org](http://python.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py Chat](https://gitter.im/ethereum/web3.py)

**Brownie -** **_Python ベースの開発環境とテストフレームワーク。_**

- [ドキュメント](https://eth-brownie.readthedocs.io/en/latest/)
- [GitHub](https://github.com/iamdefinitelyahuman/brownie)

**web3j -** **_イーサリアム用の Java/Android/Kotlin/Scala の統合ライブラリ。_**

- [web3j.io](https://web3j.io)
- [GitHub](https://github.com/web3j/web3j)
- [ドキュメント](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

**One Click Dapp -** **_迅速な開発とテストのために、ABI から直接フロントエンドを生成する。_**

- [OneClickDapp.com](https://oneclickdapp.com)
- [Truffle プラグイン](https://npmjs.org/package/oneclick)
- [Remix プラグイン](https://github.com/pi0neerpat/remix-plugin-one-click-dapp)
- [GitHub](https://github.com/pi0neerpat/one-click-dapp)

**その他の選択肢をお探しですか？**

- [イーサリアム開発者ツールリスト #Frameworks](https://github.com/ConsenSys/ethereum-developer-tools-list#frameworks)

## 統合開発環境 (IDE) {#integrated-development-environments-ides}

**Ethereum Studio -** **_スマートコントラクトを試したい新規開発者に最適な Web ベースの IDE です。 Ethereum Studio は、複数のテンプレート、MetaMask の統合、トランザクションロガー、ビルトインブラウザの Ethereum Virtual Machine (EVM) を備えており、イーサリアム上での開発を可能な限り早く始めれます。_**

- [studio.ethereum.org](/en/studio/)
- [superblocks.com/ethereum-studio](https://superblocks.com/ethereum-studio)
- [GitHub](https://github.com/SuperblocksHQ/ethereum-studio)

**Visual Studio Code -** **_イーサリアムを公式にサポートするプロフェッショナルなクロスプラットフォーム IDE。_**

- [Visual Studio Code](https://code.visualstudio.com/)
- [Azure Blockchain Development Kit for Ethereum](https://marketplace.visualstudio.com/items?itemName=AzBlockchain.azure-blockchain)
- [Azure Blockchain Workbench プラグイン](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/microsoft-azure-blockchain.azure-blockchain-workbench?tab=Overview)
- [サンプルコード](https://github.com/Azure-Samples/blockchain/blob/master/blockchain-workbench/application-and-smart-contract-samples/readme.md)
- [GitHub](https://github.com/microsoft/vscode)

**Remix -** **_静的分析とテスト用のブロックチェーンバーチャルマシンを備えた Web ベースの IDE。_**

- [remix.ethereum.org](https://remix.ethereum.org/)

**EthFiddle -** **_スマートコントラクトの書き込み、コンパイル、デバッグができる Web ベースの IDE。_**

- [ethfiddle.com](https://ethfiddle.com/)
- [Gitter](https://gitter.im/loomnetwork/ethfiddle)

**その他の選択肢をお探しですか？**

- [イーサリアム開発者ツールリスト #IDEs](https://github.com/ConsenSys/ethereum-developer-tools-list#ides)

## フロントエンドの JavaScript API {#frontend-javascript-apis}

**Web3.js -** **_イーサリアムの JavaScript API。_**

- [ドキュメント](https://web3js.readthedocs.io/en/1.0/)
- [GitHub](https://github.com/ethereum/web3.js/)

**Ethers.js -** **_JavaScript と TypeScript による完全なイーサリアムウォレットの実装とユーティリティ。_**

- [ドキュメント](https://docs.ethers.io/ethers.js/html/)
- [GitHub](https://github.com/ethers-io/ethers.js/)

**light.js -** **_ライトクライアントに最適化されたハイレベルのリアクティブ JS ライブラリ。_**

- [ドキュメント](https://paritytech.github.io/js-libs/light.js/)
- [GitHub](https://github.com/paritytech/js-libs/tree/master/packages/light.js)

**Web3-wrapper -** **_Web3.js に代わる Typescript。_**

- [ドキュメント](https://0x.org/docs/web3-wrapper#introduction)
- [GitHub](https://github.com/0xProject/0x-monorepo/tree/development/packages/web3-wrapper)

**その他の選択肢をお探しですか？**

- [イーサリアム開発者ツールリスト #Frontend-Ethereum-APIs](https://github.com/ConsenSys/ethereum-developer-tools-list#frontend-ethereum-apis)

## バックエンド API {#backend-apis}

**Infura -** **_サービスとしてのイーサリアム API。_**

- [infura.io](https://infura.io)
- [ドキュメント](https://infura.io/docs)
- [GitHub](https://github.com/INFURA)

**Cloudflare のイーサリアムゲートウェイ。**

- [cloudflare-eth.com](https://cloudflare-eth.com)

**Nodesmith -** **_イーサリアムのメインネットとテストネットへの JSON-RPC API アクセス。_**

- [nodesmith.io](https://nodesmith.io/network/ethereum/)
- [ドキュメント](https://nodesmith.io/docs/#/ethereum/apiRef)

**Chainstack -** **_サービスとしての共有および専用のイーサリアムノード。_**

- [chainstack.com](https://chainstack.com)
- [ドキュメント](https://docs.chainstack.com)

## ストレージ {#storage}

**IPFS -** **_InterPlanetary File System は、イーサリアムの分散型ストレージとファイル参照システムです。_**

- [ipfs.io](https://ipfs.io/)
- [ドキュメント](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Swarm -** **_イーサリアム web3 スタックのための分散型ストレージプラットフォームとコンテンツ配信サービス。_**

- [Swarm](https://ethersphere.github.io/swarm-home/)
- [GitHub](https://github.com/ethersphere/swarm)

**OrbitDB -** **_IPFS 上の分散型ピアツーピアデータベース。_**

- [ドキュメント](https://github.com/orbitdb/field-manual)
- [GitHub](https://github.com/orbitdb/orbit-db)

## セキュリティツール {#security-tools}

### スマートコントラクトセキュリティ {#smart-contract-security}

**Slither -** **_Python 3 で書かれた Solidity 静的分析フレームワーク。_**

- [GitHub](https://github.com/crytic/slither)

**MythX -** **_イーサリアムスマートコントラクトのためのセキュリティ分析 API。_**

- [mythx.io](https://mythx.io/)
- [ドキュメント](https://docs.mythx.io/en/latest/)

**Mythril -** **_EVM バイトコードのためのセキュリティ分析ツール。_**

- [mythril](https://github.com/ConsenSys/mythril)
- [ドキュメント](https://mythril-classic.readthedocs.io/en/master/about.html)

**SmartContract.Codes -** **_検証済みの Solidity ソースコードの検索エンジン。_**

- [smartcontract.codes (alpha)](https://smartcontract.codes/)
- [ドキュメント](https://github.com/ethereum-play/smartcontract.codes/blob/master/README.md)

**Manticore -** **_スマートコントラクトやバイナリ上でシンボリック実行ツールを使えるコマンドラインインターフェース。_**

- [GitHub](https://github.com/trailofbits/manticore)
- [ドキュメント](https://github.com/trailofbits/manticore/wiki)

**Securify -** **_イーサリアムスマートコントラクトのためのセキュリティスキャナ。_**

- [securify.chainsecurity.com](https://securify.chainsecurity.com/)
- [Discord](https://discordapp.com/invite/nN77ckb)

**ERC20 Verifier -** **_コントラクトが ERC20 規格に適合しているかどうかを確認する検証ツール。_**

- [erc20-verifier.openzeppelin.com](https://erc20-verifier.openzeppelin.com)
- [Forum](https://forum.openzeppelin.com/t/online-erc20-contract-verifier/1575)

### 形式検証 {#formal-verification}

**形式検証について**

- [How formal verification of smart-contacts works](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/) _2018 年 7 月 20 日 - Brian Marick_
- [How Formal Verification Can Ensure Flawless Smart Contracts](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1) _2018 年 1 月 29 日 - Bernard Mueller_

**その他の選択肢をお探しですか？**

- [イーサリアム開発者ツールリスト #Security-Tools](https://github.com/ConsenSys/ethereum-developer-tools-list#security-tools)

## テストツール {#testing-tools}

**Solidity-Coverage -** **_Solidity コードのカバレッジツールの代替版。_**

- [GitHub](https://github.com/sc-forks/solidity-coverage)

**hevm -** **_ユニットテストとスマートコントラクトのデバッグに特化して作られた EVM の実装。_**

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)
- [DappHub チャット](https://dapphub.chat/)

**Whiteblock Genesis -** **_ブロックチェーンのためのエンドツーエンドの開発サンドボックスとテストプラットフォーム。_**

- [Whiteblock.io](https://whiteblock.io)
- [ドキュメント](https://docs.whiteblock.io)
- [GitHub](https://github.com/whiteblock/genesis)

**その他の選択肢をお探しですか？**

- [イーサリアム開発者ツールリスト #Testing-Tools](https://github.com/ConsenSys/ethereum-developer-tools-list#testing-tools)

## ブロックエクスプローラー {#block-explorers}

ブロックエクスプローラーはイーサリアムブロックチェーン (およびテストネット) をブラウズできます。つまり特定のトランザクションやブロック、コントラクトなどのオンチェーンアクティビティを監視できるサービスです。

- [Etherscan](https://etherscan.io/)
- [Blockscout](https://blockscout.com/)
- [Etherchain](https://www.etherchain.org/)

## テストネットとフォーセット {#testnets-and-faucets}

イーサリアムコミュニティは複数のテストネットを運営しています。 これは開発者がイーサリアムのメインネットにアプリケーションをデプロイする前に別の環境で行うアプリケーションのテストのために使われています。

**Ropsten -** **_Proof of Work ブロックチェーン、テストイーサをマイニングできます。_**

- [Test-ether フォーセット](https://faucet.ropsten.be/)

**Rinkeby -** **_Proof of Authority ブロックチェーン、Geth 開発チームによって維持されています。_**

- [Test-ether フォーセット](https://faucet.rinkeby.io/)
- [ユニバーサルフォーセット](https://faucets.blockxlabs.com)

**Goerli -** **_クロスクライアントの Proof of Authority ブロックチェーン、Goerli コミュニティによって構築・管理されています。_**

- [Test-ether フォーセット](https://faucet.goerli.mudit.blog/)
- [goerli.net](https://goerli.net/)
- [ユニバーサルフォーセット](https://faucets.blockxlabs.com)

## クライアントと、ノードの運用 {#clients--running-your-own-node}

イーサリアムネットワークは互換性のあるクライアントソフトウェアが実行されている多くのノードによって構成されています。 ノードの大多数は[Geth](https://geth.ethereum.org/) または [Parity](https://www.parity.io/ethereum/)というクライアントを使用しており必要に応じて設定を行うことができます。

### クライアント {#clients}

**Geth -** **_Go で書かれたイーサリアムクライアント。_**

- [GitHub](https://github.com/ethereum/go-ethereum)
- [Discord チャット](https://discordapp.com/invite/nthXNEv)

**Parity -** **_Rust で書かれたイーサリアムクライアント。_**

- [parity.io](https://www.parity.io/)
- [GitHub](https://github.com/paritytech/parity-ethereum)

**Pantheon -** **_Java で書かれたイーサリアムクライアント。_**

- [pegasys.tech](http://pegasys.tech)
- [GitHub](https://github.com/PegaSysEng/pantheon/)

**Nethermind -** **_C# .NET Core で書かれたイーサリアムクライアント。_**

- [Nethermind.io](http://nethermind.io/)
- [GitHub](https://github.com/NethermindEth/nethermind)
- [Gitter](https://gitter.im/nethermindeth/nethermind)

### 自分のノードを実行中 {#running-your-own-node}

**Ethnode -** **_ローカルでの開発のためにイーサリアムノード (Geth または Parity) を実行します。_**

- [GitHub](https://github.com/vrde/ethnode)

**イーサリアムノードのリソース**

- [ノード設定用チートシート](https://dev.to/5chdn/ethereum-node-configuration-modes-cheat-sheet-25l8) _2019 年 1 月 5 日 - Afri Schoeden_

**その他の選択肢をお探しですか？**

- [イーサリアム開発者ツールリスト #Ethereum-clients](https://github.com/ConsenSys/ethereum-developer-tools-list#ethereum-clients)

## ベストプラクティスとパターン、アンチパターン {#best-practices-patterns-and-anti-patterns}

### スマートコントラクト {#smart-contracts}

**DappSys -** **_スマートコントラクトのための安全でシンプルで柔軟なビルディングブロック。_**

- [dapp.tools/dappsys](https://dapp.tools/dappsys/)
- [GitHub](https://github.com/dapphub/dappsys)

**OpenZeppelin Contracts -** **_安全なスマートコントラクト開発のためのライブラリ。_**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [コミュニティフォーラム](https://forum.openzeppelin.com/c/contracts)

**aragonOS -** **_アップグレードとパーミッションコントロールのパターン。_**

- [hack.aragon.org](https://hack.aragon.org/docs/aragonos-intro.html#aragonos-provides-the-following-functionality)
- [ドキュメント](https://wiki.aragon.org/)

**Smart Contract Weakness Registry**

- [SWC registry](https://smartcontractsecurity.github.io/SWC-registry/)
- [GitHub](https://github.com/SmartContractSecurity/SWC-registry)

### セキュリティ {#security}

**スマートコントラクトセキュリティのベストプラクティスガイド**

- [consensys.github.io/smart-contract-best-practices/](https://consensys.github.io/smart-contract-best-practices/)
- [GitHub](https://github.com/ConsenSys/smart-contract-best-practices/)
- [セキュリティの推奨事項とベストプラクティスの集計されたコレクション](https://github.com/guylando/KnowledgeLists/blob/master/EthereumSmartContracts.md)

**Smart Contract Security Verification Standard (SCSVS)**

- [securing.github.io/SCSVS/](https://securing.github.io/SCSVS/)

**その他の選択肢をお探しですか？**

- [イーサリアム開発者ツールリスト #Patterns—best-practices](https://github.com/ConsenSys/ethereum-developer-tools-list#patterns--best-practices)

## 開発者サポートとトレーニング {#developer-support--training}

### 一般的な学習 {#general-learning}

**イーサリアム Stackexchange**

- [ethereum.stackexchange.com](https://ethereum.stackexchange.com/)

**ConsenSys Academy -** **_セルフペースで通年開講されているエンドツーエンドのイーサリアム開発者向けコース。_**

- [consensys.academy](https://consensys.net/academy/ondemand/)

**Solidity Gitter チャットルーム**

- [gitter.im/ethereum/solidity](https://gitter.im/ethereum/solidity/)

**全てのイーサリアム Gitter チャットルーム**

- [gitter.im/ethereum/home](https://gitter.im/ethereum/home)

**Chainshot -** **_Web ベースの dapp コーディングチュートリアル。_**

- [chainshot.com](https://www.chainshot.com/)

**Blockgeeks -** **_ブロックチェーン技術に関するオンラインコース。_**

- [courses.blockgeeks.com](https://courses.blockgeeks.com/)

**DappUniversity -** **_イーサリアムブロックチェーン上での分散型アプリケーションの構築を学ぶ。_**

- [DappUniversity.com](http://www.dappuniversity.com/)

**B9lab Academy -** **_最も古いプロ向けイーサリアム dapp 開発者コース、および監査人と QA 向けの学習リソースを提供。 これは次を含みます: メンタリングとコードレビュー。_**

- [academy.b9lab.com](https://academy.b9lab.com)

### ゲームベースの学習 {#game-based-learning}

**Cryptozombies -** **_イーサリアムでゲームのコーディングを学ぶ。_**

- [Cryptozombies.io](https://cryptozombies.io/)

**Ethernaut -** **_各レベルにハッキングするコントラクトが用意されている Solidity ベースのウォーゲーム。_**

- [ethernaut.openzeppelin.com](https://ethernaut.openzeppelin.com/)

**Capture the Ether -** **_イーサリアムのスマートコントラクトセキュリティのゲーム。_**

- [capturetheether.com](https://capturetheether.com/)

## UI/UX デザイン {#uiux-design}

- [Challenge of UX in Ethereum](https://medium.com/ecf-review/challenge-of-ux-in-ethereum-122e1a33688d) _2018 年 6 月 25 日 - Anna Rose_
- [Designing for blockchain: what’s different and what’s at stake](https://media.consensys.net/designing-for-blockchain-whats-different-and-what-s-at-stake-b867eeade1c9) _2018 年 3 月 22 日 - Sarah Baker Mills_

**Rimble UI** **_- 分散型アプリケーションのためのコンポーネントと設計標準。_**

- [rimble.consensys.design](https://rimble.consensys.design)
- [GitHub](https://github.com/ConsenSys/rimble-ui)

## スタンダード {#standards}

イーサリアムコミュニティはこれまで数多くのスタンダードを採用し、開発者をサポートしてきました。 基本的にスタンダードは[Ethereum Improvement Proposals](http://eips.ethereum.org/) (EIPs) として、コミュニティによる議論の[プロセス](http://eips.ethereum.org/EIPS/eip-1)を経て導入されます。

- [EIP リスト](http://eips.ethereum.org/)
- [EIP GitHub レポジトリ](https://github.com/ethereum/EIPs)
- [EIP ディスカッションボード](https://ethereum-magicians.org/c/eips)
- [イーサリアムのガバナンス概要](https://blog.bmannconsulting.com/ethereum-governance/) _2019 年 3 月 31 日 - Boris Mann_
- [コア開発者ミーティングのプレイリスト](https://www.youtube.com/playlist?list=PLaM7G4Llrb7zfMXCZVEXEABT8OSnd4-7w) _(YouTube プレイリスト)_

スマートコントラクトの標準フォーマットなど、アプリケーションレベルのスタンダードに関わる EIP は[Ethereum Requests for Comment (ERC)](https://eips.ethereum.org/erc) として導入されます。 ERC にはイーサリアムエコシステム全体で広く使われているような必要不可欠なものも多くあります。

- [ERC リスト](http://eips.ethereum.org/erc)
- [ERC20 - トークンインターフェースのスタンダード](https://eips.ethereum.org/EIPS/eip-20)
- [ERC721 - ノンファンジブルトークンインターフェースのスタンダード](https://eips.ethereum.org/EIPS/eip-721)
