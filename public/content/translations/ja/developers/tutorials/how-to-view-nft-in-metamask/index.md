---
title: ウォレットでNFTを表示する方法(NFTチュートリアルシリーズのパート3/3)
description: このチュートリアルでは、既存のMetaMask上にNFTを表示する方法について説明します。
author: "Sumi Mudgil"
tags:
  - "ERC-721"
  - "Alchemy"
  - "MetaMask"
  - "Solidity"
skill: beginner
lang: ja
published: 2021-04-22
---

このチュートリアルは、NFT チュートリアルシリーズのパート 3/3 です。ここでは、新しくミントされた NFT を見ていきますが、 MetaMask を使用して、メインネットや任意のテストネットなど、ERC-721 トークンの一般的なチュートリアルを使用することができます。 イーサリアム上で NFT をミントする方法については、[パート 1 の NFT スマートコントラクトの作成&デプロイ方法](/developers/tutorials/how-to-write-and-deploy-an-nft)をご覧ください。

朗報です。 これからご説明する仮想ウォレットで新しくミントされた NFT を表示する方法は、NFT チュートリアルシリーズの中で最短かつ最も簡単なパートです。 この例では、前の 2 つのパートで使用していた MetaMask を使用します。

前提条件として、モバイルに MetaMask をインストールしておく必要があり、NFT を割り当てたアカウントも必要となります。[iOS](https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202)または[Android](https://play.google.com/store/apps/details?id=io.metamask&hl=en_US&gl=US)から無料でアプリを入手できます。

## ステップ 1: ネットワークを Goerli に設定する {#set-network-to-goerli}

アプリの上部にある「Wallet」ボタンを押すと、ネットワークを選択するよう指示されます。 Goerli ネットワーク上で NFT をミントしたので、ネットワークとして Goerli を選択します。

![MetaMaskモバイルでGoerliをネットワークとして設定する方法](./goerliMetamask.gif)

## ステップ 2: 収集品を MetaMask に追加する {#add-nft-to-metamask}

Goerli ネットワークに接続後、右側の「Collectibles」タブを選択し、NFT スマートコントラクトアドレスと NFT の ERC-721 トークン ID を追加します。そうすることで、チュートリアルのパート II でデプロイした NFT からのトランザクションハッシュに基づいて Etherscan で見つけることができます。

![トランザクションハッシュとERC-721トークンIDを見つける方法](./findNFTEtherscan.png)

何度か再読込をしないと表示されないこともありますが、NFT はそこに存在しています <Emoji text="😄" size={1} />。

![NFTをMetaMaskにアップロードする方法](./findNFTMetamask.gif)

おめでとうございます。 NFT のミントに成功しました。NFT を表示することもできます。 あなたが NFT の世界で新たな旋風を巻き起こすのを楽しみにしています。
