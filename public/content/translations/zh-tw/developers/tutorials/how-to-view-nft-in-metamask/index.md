---
title: "如何在錢包中檢視您的 NFT（NFT 教學系列第 3/3 部分）"
description: "本教學說明如何在 MetaMask 上檢視現有的 NFT！"
author: "蘇米·穆吉爾"
tags: ["ERC-721", "Alchemy", "Solidity"]
skill: beginner
breadcrumb: "在錢包中檢視 NFT"
lang: zh-tw
published: 2021-04-22
---

本教學是 NFT 教學系列的第 3/3 部分，我們將在其中檢視新鑄造的非同質化代幣 (NFT)。不過，您可以將此一般教學用於任何使用 MetaMask 的 ERC-721 代幣，包含在主網或任何測試網上。如果您想學習如何在以太坊上鑄造自己的 NFT，您應該查看[第 1 部分：如何撰寫和部署 NFT 智能合約](/developers/tutorials/how-to-write-and-deploy-an-nft)！

恭喜！您已經來到了我們 NFT 教學系列中最簡短、最簡單的部分——如何在虛擬錢包上檢視您剛鑄造的 NFT。我們將在此範例中使用 MetaMask，因為這是我們在前兩部分中使用的錢包。

作為先決條件，您應該已經安裝了 MetaMask（瀏覽器擴充功能或行動應用程式），並且它應該包含您鑄造 NFT 的帳戶。您可以從 [MetaMask 下載頁面](https://metamask.io/download)免費取得 MetaMask。

## 第 1 步：將您的網路設定為 Sepolia {#set-network-to-sepolia}

由於我們的 NFT 是在 Sepolia 測試網路上鑄造的，因此您會想要選擇 Sepolia 作為您的網路。MetaMask 預設會隱藏測試網路，因此請先將其開啟：

1. 開啟右上角的選單並選擇「網路 (Networks)」。
2. 向下捲動到網路清單底部，並開啟「顯示測試網路 (Show test networks)」。
3. 從網路清單中選擇「Sepolia」。

如果您使用的 MetaMask 版本中選單看起來不同，請參閱 [MetaMask 的檢視測試網指南](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)。

## 第 2 步：將您的收藏品新增至 MetaMask {#add-nft-to-metamask}

MetaMask 僅在某些網路上自動偵測 NFT，其中不包含 Sepolia，因此您需要手動匯入您的 NFT。為此，您需要 NFT 智能合約地址和您 NFT 的 ERC-721 代幣 ID——您應該能夠根據我們教學第 2 部分中鑄造 NFT 的交易雜湊值，在 Etherscan 上找到這些資訊。如果您使用了第 1 部分的合約，您的第一個 NFT 的代幣 ID 為 1。

![如何尋找您的交易雜湊值與 ERC-721 代幣 ID](./findNFTEtherscan.png)

接著，在 MetaMask（擴充功能或行動版）中：

1. 前往主畫面的「NFT」部分，並選擇「匯入 NFT (Import NFT)」。
2. 選擇 Sepolia 作為網路，並將您的 NFT 智能合約地址貼到「地址 (Address)」方塊中。
3. 將您的代幣 ID 輸入「代幣 ID (Token ID)」方塊，然後選擇「匯入 (Import)」。

您可能需要重新整理幾次才能檢視您的 NFT——但它會在那裡的 <Emoji text="😄" size={1} />！如果 MetaMask 顯示您不是該 NFT 的擁有者，請檢查您是否選擇了鑄造該 NFT 的帳戶。如需更多協助，請參閱 [MetaMask 的 NFT 指南](https://support.metamask.io/manage-crypto/nfts/nft-tokens-in-your-metamask-wallet/)。

恭喜！您已成功鑄造了一個 NFT，而且現在可以檢視它了！我們迫不及待想看到您將如何在 NFT 世界掀起風潮！
