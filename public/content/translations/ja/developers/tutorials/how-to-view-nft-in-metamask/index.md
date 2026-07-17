---
title: "ウォレットでNFTを表示する方法（NFTチュートリアルシリーズ パート3/3）"
description: "このチュートリアルでは、メタマスクで既存のNFTを表示する方法を説明します！"
author: "スミ・ムドギル"
tags: ["ERC-721", "Alchemy", "Solidity"]
skill: beginner
breadcrumb: "ウォレットでNFTを表示する"
lang: ja
published: 2021-04-22
---

このチュートリアルは、新しくミントしたNFTを表示するNFTチュートリアルシリーズのパート3/3です。ただし、メインネットや任意のテストネットを含め、メタマスクを使用する任意のERC-721トークンに対して、この一般的なチュートリアルを使用できます。イーサリアムで独自のNFTをミントする方法を学びたい場合は、[NFTスマート・コントラクトの作成とデプロイ方法に関するパート1](/developers/tutorials/how-to-write-and-deploy-an-nft)をチェックしてください！

おめでとうございます！NFTチュートリアルシリーズの中で最も短く、最も簡単なパートに到達しました。ここでは、新しくミントしたNFTを仮想ウォレットで表示する方法を説明します。前の2つのパートで使用したため、この例ではメタマスクを使用します。

前提条件として、モバイル版のメタマスクがすでにインストールされており、NFTをミントしたアカウントが含まれている必要があります。アプリは[iOS](https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202)または[Android](https://play.google.com/store/apps/details?id=io.metamask&hl=en_US&gl=US)で無料で入手できます。

## ステップ1：ネットワークをSepoliaに設定する {#set-network-to-sepolia}

アプリの上部にある「ウォレット」ボタンを押すと、ネットワークを選択するように求められます。私たちのNFTはSepoliaネットワークでミントされたため、ネットワークとしてSepoliaを選択します。

![How to set Sepolia as your network on MetaMask Mobile](./goerliMetamask.gif)

## ステップ2：コレクティブルをメタマスクに追加する {#add-nft-to-metamask}

Sepoliaネットワークに接続したら、右側の「コレクティブル（Collectibles）」タブを選択し、NFTのスマート・コントラクトのアドレスとERC-721トークンIDを追加します。これらは、チュートリアルのパート2でデプロイしたNFTのトランザクション・ハッシュをもとに、Etherscanで見つけることができます。

![How to find your transaction hash and ERC-721 token ID](./findNFTEtherscan.png)

NFTを表示するには数回更新する必要があるかもしれませんが、そこに表示されるはずです <Emoji text="😄" size={1} />！

![How to upload your NFT to MetaMask](./findNFTMetamask.gif)

おめでとうございます！NFTのミントに成功し、表示できるようになりました！あなたがNFTの世界でどのように旋風を巻き起こすのか、楽しみにしています！