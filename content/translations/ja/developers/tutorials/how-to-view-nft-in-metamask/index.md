---
title: ウォレットでNFTを表示する方法(NFTチュートリアルシリーズのパート3/3)
description: このチュートリアルでは、既存のMetaMask上にNFTを表示する方法について説明します。
author: "Sumi Mudgil"
tags:
  - "ERC-721"
  - "Alchemy"
  - "Solidity"
skill: beginner
lang: ja
published: 2021-04-22
---

このチュートリアルは、NFTチュートリアルシリーズのパート3/3です。ここでは、新しくミントされたNFTを見ていきますが、 MetaMaskを使用して、メインネットや任意のテストネットなど、ERC-721トークンの一般的なチュートリアルを使用することができます。 イーサリアム上でNFTをミントする方法については、[パート1のNFTスマートコントラクトの作成&デプロイ方法](/developers/tutorials/how-to-write-and-deploy-an-nft)をご覧ください。

朗報です。 これからご説明する仮想ウォレットで新しくミントされたNFTを表示する方法は、NFTチュートリアルシリーズの中で最短かつ最も簡単なパートです。 この例では、前の2つのパートで使用していたMetaMaskを使用します。

前提条件として、モバイルにMetaMaskをインストールしておく必要があり、NFTを割り当てたアカウントも必要となります。[iOS](https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202)または[Android](https://play.google.com/store/apps/details?id=io.metamask&hl=en_US&gl=US)から無料でアプリを入手できます。

## ステップ1: ネットワークをSepoliaに設定する {#set-network-to-sepolia}

アプリの上部にある「Wallet」ボタンを押すと、ネットワークを選択するよう指示されます。 Sepoliaネットワーク上でNFTをミントしたので、ネットワークとしてSepoliaを選択します。

![MetaMaskモバイルでSepoliaをネットワークとして設定する方法](./goerliMetamask.gif)

## ステップ2: 収集品をMetaMaskに追加する {#add-nft-to-metamask}

Sepoliaネットワークに接続後、右側の「Collectibles」タブを選択し、NFTスマートコントラクトアドレスとNFTのERC-721トークンIDを追加します。そうすることで、チュートリアルのパートIIでデプロイしたNFTからのトランザクションハッシュに基づいてEtherscanで見つけることができます。

![トランザクションハッシュとERC-721トークンIDを見つける方法](./findNFTEtherscan.png)

何度か再読込をしないと表示されないこともありますが、NFTはそこに存在しています <Emoji text="😄" size={1} />。

![NFTをMetaMaskにアップロードする方法](./findNFTMetamask.gif)

おめでとうございます。 NFTのミントに成功しました。NFTを表示することもできます。 あなたがNFTの世界で新たな旋風を巻き起こすのを楽しみにしています。
