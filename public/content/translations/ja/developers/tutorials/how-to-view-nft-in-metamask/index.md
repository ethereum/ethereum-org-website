---
title: ウォレットでNFTを表示する方法(NFTチュートリアルシリーズ パート3/3)
description: このチュートリアルでは、MetaMaskで既存のNFTを表示する方法について説明します。
author: "Sumi Mudgil"
tags: [ "ERC-721", "Alchemy", "Solidity" ]
skill: beginner
lang: ja
published: 2021-04-22
---

このチュートリアルは、NFTチュートリアルシリーズのパート3/3で、新しくミントしたNFTを表示します。 ただし、この一般的なチュートリアルは、メインネットや任意のテストネットを含め、MetaMaskを使用するあらゆるERC-721トークンに利用できます。 Ethereumで独自のNFTをミントする方法を学びたい場合は、[パート1「NFTスマートコントラクトの作成とデプロイ方法」](/developers/tutorials/how-to-write-and-deploy-an-nft)をご覧ください。

おめでとうございます！ NFTチュートリアルシリーズの中で最も短く、最も簡単なパートにたどり着きました。それは、仮想ウォレットで新しくミントしたNFTを表示する方法です。 この例では、前の2つのパートで使用したMetaMaskを使用します。

前提条件として、モバイル版MetaMaskをインストールし、NFTをミントしたアカウントを含めておく必要があります。アプリは[iOS](https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202)または[Android](https://play.google.com/store/apps/details?id=io.metamask&hl=en_US&gl=US)で無料で入手できます。

## ステップ1: ネットワークをSepoliaに設定する {#set-network-to-sepolia}

アプリの上部にある「ウォレット」ボタンを押すと、ネットワークを選択するよう促されます。 NFTはSepoliaネットワークでミントしたため、ネットワークとしてSepoliaを選択します。

![MetaMaskモバイルでSepoliaをネットワークとして設定する方法](./goerliMetamask.gif)

## ステップ2: コレクティブルをMetaMaskに追加する {#add-nft-to-metamask}

Sepoliaネットワークに接続したら、右側にある「コレクティブル」タブを選択し、NFTのスマートコントラクトアドレスとERC-721トークンIDを追加します。これらは、チュートリアルのパートIIでデプロイしたNFTのトランザクションハッシュを基に、Etherscanで確認できます。

![トランザクションハッシュとERC-721トークンIDを見つける方法](./findNFTEtherscan.png)

NFTを表示するために数回更新が必要な場合がありますが、最終的には表示されます<Emoji text="😄" size={1} />!

![NFTをMetaMaskにアップロードする方法](./findNFTMetamask.gif)

おめでとうございます！ NFTのミントに成功し、表示できるようになりました。 あなたがNFTの世界で新たな旋風を巻き起こすのを楽しみにしています。
