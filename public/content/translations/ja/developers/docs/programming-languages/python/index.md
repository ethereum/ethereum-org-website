---
title: Pythonデベロッパーのためのイーサリアム
description: Pythonベースのプロジェクトとツールを使ってイーサリアムの開発方法を学ぶ
lang: ja
incomplete: true
---

<div class="featured">Pythonベースのプロジェクトとツールを使用してイーサリアムを開発する方法を学ぶ</div>

イーサリアムを使用して、仮想通貨とブロックチェーン技術の利点を活用した分散型アプリケーション (「dapp」) を作成します。 dapp は、信頼性の高いアプリケーションです。つまり、イーサリアムにデプロイした後は、常にプログラムしたとおりに動作します。 デジタル資産を制御して、新たなタイプの金融アプリケーションを作成できます。 また、分散化できるため、単一のエンティティや個人は制御できず、検閲はほぼ不可能であることを意味します。

## スマートコントラクトと Solidity を使い始める {#getting-started-with-smart-contracts-and-solidity}

**Python をイーサリアムに統合するための最初のステップを踏み出してみましょう。**

先に基礎を学習したい場合は、 [ethereum.org/learn](/learn/)または[ethereum.org/developers](/developers/)をご確認ください。

- [ブロックチェーンの説明](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [スマートコントラクトを理解する](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [初めてのスマートコントラクトを記述する](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity のコンパイルとデプロイの方法を学ぶ](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## 初心者向けの記事 {#beginner-articles}

- [Python デベロッパー向けのイーサリアムガイド](https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/)
- [ブロックチェーン 2023 レポートにおける Python の状態](https://tradingstrategy.ai/blog/the-state-of-python-in-blockchain-in-2023)
- [Vyper を使ったスマートコントラクト入門](https://kauri.io/#collections/Getting%20Started/an-introduction-to-smart-contracts-with-vyper/)
- [Python と Brownie を使用して独自の ERC20 トークンをデプロイする](https://betterprogramming.pub/python-blockchain-token-deployment-tutorial-create-an-erc20-77a5fd2e1a58)
- [Python の Flask を使ってイーサリアムコントラクトを開発するには？](https://medium.com/coinmonks/how-to-develop-ethereum-contract-using-python-flask-9758fe65976e)
- [Web3.py 入門 - Python 開発者のためのイーサリアム](https://www.dappuniversity.com/articles/web3-py-intro)
- [Python と web3.py を使ったスマートコントラクト関数の呼び出し方](https://stackoverflow.com/questions/57580702/how-to-call-a-smart-contract-function-using-python-and-web3-py)

## 中級者向けの記事 {#intermediate-articles}

- [Python プログラマーのための dapp 開発](https://levelup.gitconnected.com/dapps-development-for-python-developers-f52b32b54f28)
- [Python のイーサリアムインターフェースを作成する: その 1](https://hackernoon.com/creating-a-python-ethereum-interface-part-1-4d2e47ea0f4d)
- [Python でのイーサリアムスマートコントラクト: 包括的ガイド](https://hackernoon.com/ethereum-smart-contracts-in-python-a-comprehensive-ish-guide-771b03990988)
- [Brownie と Python を使用してスマートコントラクトをデプロイする](https://dev.to/patrickalphac/using-brownie-for-to-deploy-smart-contracts-1kkp)
- [Brownie を使用して OpenSea で NFT を作成する](https://www.freecodecamp.org/news/how-to-make-an-nft-and-render-on-opensea-marketplace/)

## 発展的なユースケース {#advanced-use-patterns}

- [Python を使用したイーサリアムスマートコントラクトのコンパイル、デプロイ、呼び出し](https://yohanes.gultom.id/2018/11/28/compiling-deploying-and-calling-ethereum-smartcontract-using-python/)
- [Slither を使用した Solidity スマートコントラクトの分析](https://kauri.io/#collections/DevOps/analyze-solidity-smart-contracts-with-slither/#analyze-solidity-smart-contracts-with-slither)
- [ブロックチェーンのフィンテックチュートリアル: Python を使用した貸出と借入](https://blog.chain.link/blockchain-fintech-defi-tutorial-lending-borrowing-python/)

## Python のプロジェクトとツール {#python-projects-and-tools}

### 現在でもメンテナンスされているもの {#active}

- [Web3.py](https://github.com/ethereum/web3.py) - _イーサリアムとやり取りするための Python ライブラリ_
- [Vyper](https://github.com/ethereum/vyper/) - _EVM のための Python ライクなスマートコントラクト言語_
- [Ape](https://github.com/ApeWorX/ape) - _パイソニスタ、データサイエンティスト、セキュリティプロフェッショナル向けのスマートコントラクト開発ツール_
- [Brownie](https://github.com/eth-brownie/brownie) - _イーサリアムスマートコントラクトのデプロイ、テスト、やり取りを行うための Python フレームワーク_
- [py-evm](https://github.com/ethereum/py-evm) - _イーサリアム仮想マシンの実装_
- [eth-tester](https://github.com/ethereum/eth-tester) - _イーサリアムベースのアプリケーションをテストするためのツール_
- [eth-utils](https://github.com/ethereum/eth-utils/) - _イーサリアム関連のコードベースを操作するためのユーティリティ関数_
- [py-solc-x](https://pypi.org/project/py-solc-x/) - _solc Solidity コンパイラの Python ラッパー (Solidity 0.5x をサポート)_
- [py-wasm](https://github.com/ethereum/py-wasm) - _WebAssembly インタプリタの Python 実装_
- [pydevp2p](https://github.com/ethereum/pydevp2p) - _イーサリアムの P2P スタックの実装_
- [pymaker](https://github.com/makerdao/pymaker) - _Maker コントラクトのための Python API_
- [siwe](https://github.com/spruceid/siwe-py) - _Python のためのイーサリアムによるサインイン (siwe)_
- [イーサリアムの統合のための Web3 DeFi](https://github.com/tradingstrategy-ai/web3-ethereum-defi) - _ERC-20、Uniswap、その他の一般的なプロジェクトのための、すぐに統合を行える Python パッケージ_

### アーカイブ済み・メンテナンスされていないもの {#archived--no-longer-maintained}

- [Trinity](https://github.com/ethereum/trinity) - _イーサリアム Python クライアント_
- [Mamba](https://github.com/arjunaskykok/mamba) - _Vyper 言語で記述された、スマートコントラクトの記述、コンパイル、デプロイのためのフレームワーク_

もっとリソースをお探しですか？ [ethereum.org/developers](/developers/)をご確認ください。

## Python ツールを使用したプロジェクト {#projects-using-python-tooling}

以下のイーサリアムベースのプロジェクトでは、このページに記載されているツールを使用しています。 関連するオープンソースのリポジトリは、コード例や最善の方法として参照でき、役立ちます。

- [Yearn Finance](https://yearn.finance/)と[Yearn Vault Contracts リポジトリ](https://github.com/yearn/yearn-vaults)
- [Curve](https://curve.fi/)と[Curve のスマートコントラクトリポジトリ](https://github.com/curvefi/curve-contract)
- [BadgerDAO](https://badger.com/)と[Brownie ツールチェーンを使用したスマートコントラクト](https://github.com/Badger-Finance/badger-system)
- [Sushi](https://sushi.com/)による[Python を使用したべスティングコントラクトの管理とデプロイ](https://github.com/sushiswap/sushi-vesting-protocols)
- Alpha Homora で有名な[Alpha Finance](https://alphafinance.io/)による[Brownie を使用したスマートコントラクトのテストとデプロイ](https://github.com/AlphaFinanceLab/alpha-staking-contract)

## Python コミュニティディスカッション {#python-community-contributors}

- [イーサリアム Python コミュニティの Discord](https://discord.gg/9zk7snTfWe) Web3.py やその他の Python フレームワークについてのディスカッションを行う場所
- [Vyper Discord](https://discord.gg/SdvKC79cJk) Vyper スマートコントラクトのプログラミングについてのディスカッションを行う場所

## その他のリスト {#other-aggregated-lists}

Vyper wiki には、[Vyper のための充実したリソースのリスト](https://github.com/ethereum/vyper/wiki/Vyper-tools-and-resources)があります。
